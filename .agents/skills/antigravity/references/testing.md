# Testing — Jest + React Testing Library

## Philosophy

Test behavior a user/consumer can observe, not implementation details. If a
test breaks because you refactored internals without changing behavior, the
test was testing the wrong thing.

## Query priority (RTL)

Prefer queries in this order — it mirrors how a real user finds elements:

1. `getByRole` (with accessible name) — `getByRole('button', { name: /submit/i })`
2. `getByLabelText` — form fields
3. `getByPlaceholderText`
4. `getByText`
5. `getByDisplayValue`
6. `getByTestId` — last resort, only when no semantic query works (e.g., a
   decorative element with no accessible role)

Using `getByRole` as the default also functions as a free accessibility
check — if you can't query by role, the markup probably isn't accessible.

## Structure: Arrange / Act / Assert

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ContactForm } from './ContactForm';

describe('ContactForm', () => {
  it('shows a validation error when submitting without an email', async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });

  it('calls onSubmit with form values when valid', async () => {
    const handleSubmit = jest.fn();
    const user = userEvent.setup();
    render(<ContactForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/email/i), 'dyan@example.com');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(handleSubmit).toHaveBeenCalledWith({ email: 'dyan@example.com' });
  });
});
```

## What to test, per layer

- **Pure functions/utils** (validators, formatters, reducers): plain Jest
  unit tests, no rendering needed. Highest value-per-effort tests in the
  suite — fast, and pin down exact business logic.
- **Custom hooks with logic worth isolating**: `renderHook` from RTL, assert
  on returned state/updater behavior.
- **Components**: render + interact via `userEvent`, assert on what's visible
  to the user (text, roles, form state) — never assert on internal state or
  call `.state()`-style implementation access.
- **Integration/feature tests**: render a feature with its real child
  components (mock only the network boundary — MSW is preferred over mocking
  individual fetch calls) to catch wiring bugs unit tests miss.

## Async

Use `findBy*` (returns a promise, waits + retries) for anything that appears
after an async action, not `getBy*` wrapped in `waitFor` unnecessarily.
Avoid arbitrary `setTimeout`-based waits entirely.

```tsx
// Avoid
await waitFor(() => expect(screen.getByText(/success/i)).toBeInTheDocument());

// Prefer (equivalent, more idiomatic)
expect(await screen.findByText(/success/i)).toBeInTheDocument();
```

## Mocking

- Mock at the network boundary (MSW — Mock Service Worker) for
  components/features that fetch data, so the test exercises real
  request/response handling code, not a hand-mocked hook.
- Mock modules (`jest.mock`) sparingly — mostly for genuinely external
  concerns (analytics calls, third-party SDKs, `window.matchMedia` in jsdom),
  not for the component's own dependencies.
- Don't mock what you're testing. If testing `useContactForm`, don't mock
  the validation function it calls internally — that's the behavior under
  test.

## Coverage as a signal, not a target

Coverage percentage is a smell detector (a feature at 20% coverage
definitely has gaps), not a goal to chase to 100% — tests written purely to
hit a coverage number tend to assert trivial things and add maintenance cost
without catching real bugs. Prioritize coverage on business logic and
error/edge-case paths over exhaustively testing every prop permutation of
simple presentational components.

## Snapshot tests

Use sparingly, and only for things that are genuinely meant to be stable and
reviewed on change (e.g., a design-system component's rendered output).
Avoid snapshotting large component trees — they become unreadable diffs that
get rubber-stamped (`--ci -u`) instead of actually reviewed, which defeats
the point.

## React Native differences

Use `@testing-library/react-native` instead of DOM-based RTL —
`fireEvent`/`userEvent` and query APIs are analogous but query by
`testID`/accessibility props more often, since there's no real DOM roles in
the same sense as web. See `references/react-native.md`.
