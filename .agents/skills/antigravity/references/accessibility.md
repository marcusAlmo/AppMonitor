# Accessibility Checklist

Apply this to every interactive component, not just when a11y is explicitly
requested — it's part of "production-ready," not an add-on.

## Semantic HTML first

- Use `<button>` for anything clickable that triggers an action,
  `<a href>` for anything that navigates. Never `<div onClick>` for
  interactive elements — you lose keyboard focus, `Enter`/`Space` activation,
  and screen-reader semantics for free by using the real element.
- Use real form elements (`<input>`, `<select>`, `<textarea>`) with
  associated `<label>` (via `htmlFor`/`id`, or wrapping), not styled `<div>`s
  simulating form controls.
- Use heading levels (`h1`–`h6`) in document order — don't skip levels for
  visual sizing (style a heading to look smaller with CSS instead).

## Keyboard

- Everything clickable with a mouse must be reachable and operable via
  keyboard alone (`Tab` to focus, `Enter`/`Space` to activate).
- Custom interactive components (custom dropdowns, modals, tabs) need
  explicit `onKeyDown` handling and correct `tabIndex` — or better, use a
  headless accessible library (Radix, React Aria, MUI's unstyled base
  components) instead of hand-rolling keyboard behavior for complex widgets
  like comboboxes/date pickers.
- Focus is trapped inside modals/dialogs while open, and returns to the
  triggering element on close.
- Visible focus indicators are never removed (`outline: none` without a
  replacement) — if restyling focus for design reasons, provide a clearly
  visible custom focus style.

## ARIA — use only when semantic HTML can't express it

- Don't add ARIA roles to elements that already have the right implicit role
  (`<button role="button">` is redundant).
- `aria-label`/`aria-labelledby` for icon-only buttons (a trash icon button
  needs `aria-label="Delete invoice"`).
- `aria-live="polite"` regions for async status messages (form submission
  success/error, toast notifications) so screen readers announce them
  without requiring focus to move.
- `aria-expanded`, `aria-controls` for disclosure widgets (accordions,
  dropdowns) reflecting actual open/closed state.
- `aria-invalid` + `aria-describedby` linking a form field to its error
  message.

## Images & media

- Every `<img>` has `alt`. Decorative images get `alt=""` (empty, not
  omitted) so screen readers skip them.
- Icon-only buttons/links need an accessible name via `aria-label` or
  visually-hidden text, not just a tooltip (tooltips aren't reliably
  announced and don't help keyboard-only or touch users).

## Color & contrast

- Text meets WCAG AA contrast (4.5:1 for normal text, 3:1 for large
  text/UI components) against its background — check when using custom
  Tailwind colors or MUI theme overrides, not just default palette values.
- Never convey information (error state, required field, status) by color
  alone — pair with an icon, text label, or pattern.

## Forms

- Every input has a programmatically associated label.
- Required fields are marked both visually and with `required`/
  `aria-required`, not visual-only (e.g., a lone red asterisk with no text
  equivalent).
- Validation errors are associated with their field (`aria-describedby`) and
  announced (`aria-live` region or focus moved to the first error on submit
  failure), not just shown as floating text near the field.

## Quick self-check before shipping a component

1. Can I complete this flow using only the keyboard?
2. Does every icon-only control have an accessible name?
3. Do form errors get announced, not just displayed?
4. Would this pass if I ran `axe` DevTools on it?
