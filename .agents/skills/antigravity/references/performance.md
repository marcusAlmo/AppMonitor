# Performance

Measure before optimizing (React DevTools Profiler, or `why-did-you-render`
in dev). Don't apply the tools below speculatively across a whole codebase —
apply them where a re-render or computation is demonstrably costly.

## Re-render control

- `React.memo` — wrap a component when it's a) rendered often with the same
  props, and b) expensive enough to render that skipping it matters (a
  complex chart, a large list row). Wrapping trivial components in `memo`
  adds comparison overhead for no benefit.
- `useCallback` — needed when a function is passed as a prop to a `memo`'d
  child (otherwise a new function reference defeats the memoization), or when
  it's a dependency of another hook's dependency array. Not needed for
  handlers used only inline in JSX (`onClick={() => ...}` on a plain `<button>`
  is fine).
- `useMemo` — needed for genuinely expensive computations (sorting/filtering
  large arrays, complex derived objects) or to preserve referential equality
  for a value passed to a `memo`'d child/effect dependency. Not needed for
  cheap computations like string concatenation.
- Move state down. If only a small subtree re-renders because of a piece of
  state, keep that state in the lowest component that needs it rather than
  the page root — this is usually a bigger win than any memoization.
- Pass `children` instead of re-rendering a subtree unnecessarily: a
  component that re-renders due to its own state doesn't force its
  `children` prop to re-render, since that JSX was created by the parent.

## Lists

- Always provide a stable `key` (entity id, not array index, unless the list
  is static).
- Virtualize long lists (100+ items) with `react-window` or
  `@tanstack/react-virtual` rather than rendering every row — huge DOM node
  counts are one of the most common real-world perf issues.
- Paginate or infinite-scroll server data rather than fetching/rendering
  everything at once.

## Bundle size

- Code-split by route at minimum (`React.lazy` + `Suspense` for route
  components), and split further for large, rarely-used features (a heavy
  chart library, a rich text editor) so they don't bloat the initial bundle.
- Check for duplicate/heavy dependencies before adding a new library —
  prefer a lighter alternative or a native solution if one already covers
  the need (e.g., don't add a whole date library for one format call if
  `Intl.DateTimeFormat` suffices).
- Import only what's used: `import { debounce } from 'lodash-es'` not
  `import _ from 'lodash'`, to keep tree-shaking effective.

## Images & assets

- Serve appropriately sized/responsive images (`srcset`, or a framework's
  image component if using Next.js/similar) rather than a single large asset
  scaled down by CSS.
- Lazy-load offscreen images (`loading="lazy"`).

## Data fetching

- Avoid waterfalls: fetch independent data in parallel (`Promise.all`, or
  parallel queries with React Query) rather than sequential `await`s that
  don't depend on each other.
- Cache and dedupe requests via a data-fetching library rather than
  re-fetching the same resource from multiple components independently.
- Debounce/throttle expensive handlers driven by fast-firing events (search
  input triggering an API call, scroll/resize handlers).

## Common anti-patterns to flag when reviewing code

- Creating a new object/array/function literal inline as a prop to a
  `memo`'d component every render (defeats the memoization) —
  `<MemoChild config={{ foo: 'bar' }} />` recreates `config` every render.
- Defining a component inside another component's body (recreates the
  component type every render, remounting the subtree and losing its state).
- `useEffect` that calls `setState` synchronously causing a second render
  when the value could've been computed during the first render instead.
- Fetching in `useEffect` on every keystroke without debouncing.
