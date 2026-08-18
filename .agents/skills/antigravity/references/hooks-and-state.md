# Hooks & State Management

## The state-location decision tree

Ask, in order:

1. **Is it derived from other state/props?** → Don't store it. Compute it
   during render (wrap in `useMemo` only if the computation is measurably
   expensive).
2. **Does only one component (and its direct children via props) need it?**
   → `useState` (or `useReducer` if it's several related values that change
   together / have complex transitions).
3. **Do several unrelated components deep in the tree need it, but it's
   scoped to one feature/page** (e.g., a multi-step form's current step,
   a theme toggle for one widget)? → `Context` + a custom hook wrapping
   `useContext` (never export the raw context — export `useFeatureContext()`).
4. **Is it app-wide, touched by many features, and does it need
   time-travel debugging, middleware, or complex async orchestration**
   (e.g., auth state, a shopping cart, normalized entity caches)? →
   **Redux Toolkit**.
5. **Is it app-wide/shared but simpler — no need for Redux's middleware/
   devtools ceremony** (e.g., UI state like a sidebar collapsed flag, a
   feature flag cache, simple cross-page filters)? → **Zustand**.
6. **Is it server data (fetched from an API)?** → Don't put it in Redux or
   plain `useState` at all if avoidable. Use a data-fetching library
   (React Query / RTK Query / SWR) so caching, refetching, and loading/error
   states aren't hand-rolled. If the project has no such library and adding
   one isn't in scope, at minimum model fetch state as a discriminated union
   (see `typescript.md`), not three separate booleans.

**Rule of thumb:** most bugs from "unnecessary re-renders" and "state out of
sync" trace back to state living higher in the tree than it needs to, or
server data being shoved into client state management. Colocate first,
lift only when actually shared.

## `useEffect` — when it's actually correct

Effects synchronize a component with something **outside React**:
subscriptions, DOM manipulation, timers, analytics, imperative third-party
widgets, or fetching (when not using a data library).

Effects are **not** for:
- Computing a value from props/state → do it during render.
- Resetting state when a prop changes → use `key` to remount the component
  instead, or compute during render.
- Chaining state updates ("when A changes, set B") → put both updates in the
  event handler that changed A, or compute B during render.
- Calling a function prop after a state change purely to notify a parent →
  call it directly in the event handler instead.

```tsx
// Avoid
useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);

// Prefer — no effect needed
const fullName = `${firstName} ${lastName}`;
```

```tsx
// Avoid — effect chasing a prop to reset local state
useEffect(() => {
  setSelectedId(null);
}, [items]);

// Prefer — key the component so it remounts naturally
<ItemList key={listId} items={items} />
```

When an effect IS correct, always:
- Include the full, honest dependency array (don't suppress the lint rule).
- Return a cleanup function for subscriptions/timers/listeners.
- Keep the effect's job singular — one effect per concern, not one effect
  doing three unrelated things.

## Custom hooks

Extract a custom hook when:
- The same stateful logic is used in 2+ components, OR
- A single component's logic (state + effects + handlers) is complex enough
  to obscure the JSX, even if used only once — extracting it clarifies intent
  and makes the logic independently testable.

```tsx
function useContactForm(initial?: Partial<ContactFormValues>) {
  const [values, setValues] = useState<ContactFormValues>({ ...defaults, ...initial });
  const [errors, setErrors] = useState<FormErrors<ContactFormValues>>({});

  const handleChange = (field: keyof ContactFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const nextErrors = validateContactForm(values); // pure function, unit-testable
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  return { values, errors, handleChange, validate };
}
```

Naming: always `useXxx`, always returns either a single value, an array
(tuple-like, à la `useState`) when order/positional destructuring makes
sense, or an object when there are 3+ return values (named destructuring is
clearer at the call site).

## Redux Toolkit conventions

- Always RTK (`createSlice`, `configureStore`), never legacy hand-written
  reducers/action creators/switch statements.
- One slice per domain concept (`authSlice`, `cartSlice`), not one giant
  slice.
- Use RTK Query for server state if the project needs a data layer and
  already has Redux — avoids a second async pattern living alongside thunks.
- Selectors are colocated with the slice and memoized with `createSelector`
  (reselect, bundled with RTK) when they derive/filter data — don't filter
  arrays inline inside `useSelector` on every render.
- Components read state via typed hooks (`useAppSelector`, `useAppDispatch`),
  not the raw `useSelector`/`useDispatch` — set these up once in a `hooks.ts`
  so selector/dispatch types are inferred everywhere.

```ts
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## Zustand conventions

- One store per concern, not a single mega-store — Zustand is cheap enough
  to have several small stores.
- Keep actions inside the store definition (colocated with the state they
  mutate), not scattered in components.
- Select narrowly to avoid unnecessary re-renders:

```ts
// Avoid — re-renders on ANY store change
const store = useCartStore();

// Prefer — re-renders only when itemCount changes
const itemCount = useCartStore((state) => state.itemCount);
```

- Use the `immer` middleware if updates involve nested objects/arrays, to
  avoid manual spread pyramids.

## Context — the correct way

- Never export the raw `Context` object for consumption — export a custom
  hook that calls `useContext` and throws a clear error if used outside the
  provider:

```tsx
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
```

- Split contexts that update at different frequencies (e.g., don't put
  rarely-changing "current user" and frequently-changing "mouse position" in
  the same context — every consumer re-renders on every change to either).
