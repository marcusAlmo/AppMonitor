# TypeScript Conventions

## `tsconfig.json` baseline (strict mode, no exceptions)

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

If a project's existing `tsconfig` is looser than this, don't unilaterally
tighten it (may break the build) — but don't loosen new code to match old
laxity either; write new code as if strict mode were on.

## Typing props

```tsx
interface UserCardProps {
  user: User;
  onEdit?: (id: string) => void;   // optional handler, explicit signature
  variant?: 'compact' | 'full';    // string unions over loose `string`
}
```

- Use `interface` for props/object shapes that might be extended; `type` for
  unions, intersections, tuples, and mapped/utility types. Either is fine for
  a plain flat object — pick one and be consistent within a file.
- Never type an event handler prop as `Function` or `(...args: any[]) => any`
  — write the real signature.
- Avoid `React.FC` — it adds an implicit `children` prop even when the
  component doesn't accept one, and complicates generics. Type props
  directly and let return type inference handle the rest:

```tsx
// Avoid
const UserCard: React.FC<UserCardProps> = ({ user }) => { ... };

// Prefer
function UserCard({ user }: UserCardProps) { ... }
```

## Discriminated unions for state that has "modes"

This is the single highest-leverage TypeScript pattern for React apps. Use
it instead of multiple independent booleans, which allow impossible states.

```tsx
// Avoid — allows isLoading && isError && data all true simultaneously
interface State {
  isLoading: boolean;
  isError: boolean;
  data?: Invoice[];
  error?: string;
}

// Prefer — only one shape is ever valid at a time
type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };
```

Consuming it forces exhaustive handling (and the compiler flags unhandled
cases if you add a new one later):

```tsx
switch (state.status) {
  case 'idle': return null;
  case 'loading': return <Spinner />;
  case 'error': return <ErrorState message={state.error} />;
  case 'success': return <InvoiceTable invoices={state.data} />;
}
```

## API response typing

- Never type `fetch`/`axios` responses as `any`. Define the response shape,
  and if the API contract isn't guaranteed, validate at the boundary (zod,
  or a manual type guard) rather than trusting a type assertion (`as Invoice`)
  on untrusted network data.
- Keep API DTO types separate from your internal domain types when they
  diverge (e.g., API returns `snake_case` / different nesting) — map at the
  boundary, don't let backend shape leak through the whole app.

```ts
// api/types.ts — what the server actually sends
interface InvoiceDto { id: string; total_cents: number; due_date: string; }

// features/invoicing/types.ts — what the app works with
interface Invoice { id: string; total: number; dueDate: Date; }

function toInvoice(dto: InvoiceDto): Invoice {
  return { id: dto.id, total: dto.total_cents / 100, dueDate: new Date(dto.due_date) };
}
```

## Generics — use them for genuinely reusable utilities/components, not everywhere

Good candidates: a generic `<Select<T>>` component, a `usePaginatedList<T>`
hook, an API client wrapper. Don't add a generic to a component that will
only ever hold one concrete type — that's ceremony, not safety.

```tsx
interface SelectProps<T> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  getLabel: (option: T) => string;
}

function Select<T>({ options, value, onChange, getLabel }: SelectProps<T>) { ... }
```

## Utility types worth knowing (use over hand-rolling)

- `Pick<T, K>` / `Omit<T, K>` — deriving a narrower shape from an existing
  type instead of redefining fields.
- `Partial<T>` — form draft state, patch payloads.
- `Record<K, V>` — lookup maps, especially `Record<Status, Config>` instead
  of a switch statement for static per-status config.
- `ReturnType<typeof fn>` / `Parameters<typeof fn>` — deriving types from
  existing functions instead of duplicating a shape.

## Enums vs union literals

Prefer string union literals (`'draft' | 'sent' | 'paid'`) over TypeScript
`enum` in most React code — they're structurally typed, tree-shake cleanly,
and don't require an import just to reference a value. Use `enum`
(or `as const` object) only when the project already has an established enum
convention, or when you need reverse mapping / a namespaced value set.

```ts
// Prefer for most cases
type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';

// Acceptable alternative when you want a namespaced object of values
const InvoiceStatus = {
  Draft: 'draft',
  Sent: 'sent',
  Paid: 'paid',
  Overdue: 'overdue',
} as const;
type InvoiceStatus = (typeof InvoiceStatus)[keyof typeof InvoiceStatus];
```

## Never suppress, always narrow

```ts
// Avoid
// @ts-ignore
const total = invoice.total.toFixed(2);

// Prefer — narrow the actual union
if (invoice.total !== undefined) {
  const total = invoice.total.toFixed(2);
}
```

If a type error reveals a genuine runtime possibility (value could be
`undefined`), that's the type system doing its job — handle the case, don't
silence the check.
