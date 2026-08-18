---
name: antigravity
description: Enforces industry-standard, production-grade practices for React + TypeScript (TSX) development — component architecture, hooks, state management (Redux/Zustand), styling (Tailwind/MUI), performance, accessibility, testing (Jest/RTL), and code quality harnesses (ESLint/Prettier/CI). Use this skill whenever writing, reviewing, refactoring, or scaffolding any .tsx/.ts React code, React Native code, or when the user mentions "antigravity", React best practices, component structure, hooks patterns, state management setup, or wants a professional/senior-level React codebase — even if they don't explicitly ask for "best practices."
---

# Antigravity — React + TypeScript Engineering Standard

A senior-frontend-engineer's ruleset for producing React/TSX code that reads as
professionally architected, not AI-generated boilerplate. Apply this whenever
writing or reviewing `.tsx`/`.ts` files, scaffolding a new React feature or app,
or when the user asks for "best practices," "clean code," "production-ready,"
or invokes "antigravity" by name.

This skill is opinionated. Where the user's existing codebase already has a
convention (see any project's `/areas/*.md` context or actual repo files),
**match the existing convention over this skill's default** — consistency
within a codebase beats any single "correct" style.

## How to use this skill

1. Read this file fully before writing/reviewing code.
2. For deep dives, open the relevant reference file (table below) — don't
   guess at patterns you're unsure of.
3. Apply the **Non-negotiables** (below) to every piece of code you write,
   regardless of how small the request seems.
4. For anything React Native-specific, see `references/react-native.md` —
   several rules here (styling, navigation, lists) differ on native.

| Reference file | Read it when... |
|---|---|
| `references/component-patterns.md` | Structuring components, props, composition, folder layout |
| `references/hooks-and-state.md` | Writing hooks, choosing Context vs Redux vs Zustand |
| `references/typescript.md` | Typing props/state/API responses, generics, discriminated unions |
| `references/styling.md` | Tailwind + MUI conventions, theming, responsive patterns |
| `references/performance.md` | Memoization, re-render issues, virtualization, bundle size |
| `references/testing.md` | Jest + React Testing Library test structure and patterns |
| `references/tooling-and-ci.md` | ESLint/Prettier config, git hooks, CI harness, folder scaffolding |
| `references/react-native.md` | React Native-specific deviations |
| `references/accessibility.md` | a11y checklist for interactive components |

---

## Non-negotiables (apply to every response)

These are the things that separate "AI slop" React code from senior-level
code. Check every generated component against this list before presenting it.

1. **Strict typing, no `any`.** Props, state, API responses, and event
   handlers are explicitly typed. Use `unknown` + narrowing over `any`. Never
   silence a type error with `// @ts-ignore` — fix the type.
2. **Function components + hooks only.** No class components unless the user
   is maintaining legacy code and explicitly asks.
3. **One component, one responsibility.** If a component's JSX return exceeds
   ~150 lines or mixes 2+ concerns (e.g., data-fetching + complex form logic +
   rendering), split it. Extract logic into hooks, extract JSX into
   subcomponents.
4. **Props interfaces are explicit and named**, not inlined for anything
   non-trivial: `interface ButtonProps { ... }` not
   `({ label, onClick }: { label: string; onClick: () => void })` once you
   have 2+ props.
5. **No prop drilling past 2 levels.** If a prop passes through a component
   that doesn't use it just to reach a grandchild, that's a signal for
   Context, composition (children/render props), or state colocation —
   see `references/hooks-and-state.md`.
6. **Derive, don't duplicate, state.** If a value can be computed from
   existing state/props during render, it is not `useState`. Reach for
   `useMemo` only after confirming the computation is actually expensive.
7. **Effects are a last resort.** Before writing `useEffect`, ask: is this
   synchronizing with an external system (subscription, DOM, network)? If the
   goal is "update state when other state changes," that's a render-time
   calculation or an event handler, not an effect. See
   `references/hooks-and-state.md` for the decision tree.
8. **Every list render has a stable, meaningful `key`.** Never use array
   index as a key unless the list is static and never reordered/filtered.
9. **Errors and loading states are handled, not assumed away.** Any
   data-fetching component accounts for loading, error, and empty states —
   don't render only the happy path.
10. **Accessibility is not optional.** Interactive elements are actual
    semantic elements (`<button>`, not `<div onClick>`), images have `alt`,
    forms have associated `<label>`s, focus order is logical. See
    `references/accessibility.md`.
11. **No inline magic values.** Repeated strings/numbers (routes, breakpoints,
    z-index scales, API endpoints) live in a constants file, not scattered
    literals — matches the user's existing convention of constants files.
12. **Imports are organized and absolute where the project supports it**
    (path aliases like `@/components/...`), grouped: external libs → internal
    modules → relative → styles.
13. **Naming is boring and predictable.** Components: `PascalCase`. Hooks:
    `useCamelCase`. Files match their default export's name. Booleans read as
    predicates (`isLoading`, `hasError`, `canSubmit`), not `loading` / `flag`.
14. **Side-effecting code is testable.** Business logic and data
    transformations live in plain functions/hooks separate from JSX, so they
    can be unit-tested without rendering.

## Quick decision aids

**"Should this be a separate component?"**
Yes if: it's reused, it has its own clear name a designer would use, it would
simplify the parent's JSX, or it needs its own state/effects that don't
belong in the parent.

**"useState, useReducer, Context, Redux, or Zustand?"**
See `references/hooks-and-state.md` — but as a rule of thumb: local UI state
→ `useState`; related state transitions → `useReducer`; state needed by a
subtree without prop drilling → `Context`; app-wide state touched by many
unrelated features, especially with async/middleware needs → Redux (Toolkit);
lightweight global/shared state without Redux's ceremony → Zustand.

**"Do I need `useCallback`/`useMemo` here?"**
Only if you've identified an actual re-render cost (measured or clearly
implied — e.g., passing a callback to a memoized child, or an expensive
computation). Wrapping everything "just in case" is a code smell, not
optimization — see `references/performance.md`.

## Default response shape when generating a new component

Unless the user asks for something quicker/scratch-only, a "real" component
should ship with:
- The component file (`ComponentName.tsx`)
- Its types (inline if trivial, or a colocated `types.ts` if the feature has
  several shared shapes)
- A colocated test file (`ComponentName.test.tsx`) using RTL — see
  `references/testing.md`
- Barrel export only if the project already uses one (check for `index.ts`
  patterns in sibling folders first)

Mention briefly what you generated and why (e.g., "split the form into
`ContactForm` + `useContactForm` hook to keep validation logic testable") —
don't silently make architectural decisions without a one-line rationale.
