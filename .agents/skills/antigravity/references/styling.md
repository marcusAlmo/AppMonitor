# Styling: Tailwind + MUI

Most React projects pick one primary styling approach and use the other
sparingly (e.g., MUI for complex components like DataGrid/DatePicker, Tailwind
for layout/spacing/one-off utility styling). Check which the project leans on
before introducing patterns — don't mix both heavily in the same component
unless that's the established convention.

## Tailwind conventions

- **Extract repeated utility clusters**, don't copy-paste a 15-class string
  across five components. Options, in order of preference:
  1. A small presentational component (`<Card>`, `<Badge>`) that owns the
     classes.
  2. `clsx`/`cn` helper + a `variants` object for conditional classes (see
     below) rather than long ternary chains inline in JSX.
  3. Only reach for `@apply` in a CSS file for truly global, rarely-touched
     primitives (e.g., a base button reset) — overusing `@apply` reintroduces
     the maintenance problems Tailwind avoids.

```tsx
import { clsx } from 'clsx';

const badgeVariants = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-amber-100 text-amber-800',
  error: 'bg-red-100 text-red-800',
} as const;

function Badge({ variant, children }: { variant: keyof typeof badgeVariants; children: React.ReactNode }) {
  return (
    <span className={clsx('rounded-full px-2 py-0.5 text-xs font-medium', badgeVariants[variant])}>
      {children}
    </span>
  );
}
```

- **Design tokens over raw values.** Use the theme's spacing/color scale
  (`px-4`, `text-primary-600`) rather than arbitrary values (`px-[17px]`,
  `text-[#3b82f6]`) unless matching a specific design spec value that
  genuinely isn't on the scale — and even then, consider adding it to
  `tailwind.config` as a named token if it'll be reused.
- **Responsive/state modifiers read left-to-right by breakpoint**, mobile
  first: base styles unprefixed, then `sm:`, `md:`, `lg:` overrides. Don't
  design desktop-first and retrofit `max-md:` overrides unless the project
  is genuinely desktop-only (e.g., an internal admin tool).
- Keep class strings scannable — for components with many conditional
  classes, consider `tailwind-variants` or `cva` (class-variance-authority)
  instead of a hand-rolled ternary tower.

## MUI conventions

- **Theme, don't override inline.** Colors, typography, spacing, and
  component defaults belong in the `createTheme()` config
  (`components.MuiButton.styleOverrides`, etc.), not scattered `sx` props
  reproducing the same values across the app. Reserve `sx` for one-off,
  truly local adjustments.
- **`sx` for one-offs, styled-components-style `styled()` for reused custom
  variants.** If you're writing the same `sx` object in 3+ places, that's a
  themed variant or a `styled()` component, not a copy-pasted `sx`.
- Use MUI's `Grid`/`Stack`/`Box` for layout rather than hand-rolled flex/grid
  CSS when already in an MUI-heavy codebase — consistency with the library's
  own layout primitives keeps spacing predictable across the app.
- Respect the theme's breakpoints (`useMediaQuery(theme.breakpoints.down('sm'))`)
  rather than hardcoding pixel values that drift from Tailwind's or the
  theme's own scale if both are present in the project.
- Don't fight MUI's component API with excessive `!important`-style
  overrides — if a component needs to look substantially different from
  MUI's defaults, it's often cheaper to use an unstyled/base component
  (Base UI) or a plain semantic element styled with Tailwind, matching
  whatever the rest of the app already does for similar cases.

## When both are in the same project

- Global layout/spacing/typography scale → pick one source of truth (usually
  Tailwind's config or the MUI theme) and have the other reference/import
  values from it rather than maintaining two independent scales that drift
  apart (e.g., generate Tailwind's `theme.spacing` from the MUI theme's
  spacing unit, or vice versa).
- Prefer MUI components as-is for complex interactive primitives (DataGrid,
  DatePicker, Autocomplete, Dialog) rather than rebuilding them in Tailwind.
- Prefer Tailwind utilities for page layout, one-off spacing, and simple
  presentational elements where pulling in a full MUI component would be
  overkill.

## Dark mode / theming

- Tailwind: use the `dark:` variant with `class` strategy
  (`darkMode: 'class'` in config) over the `media` strategy if the app offers
  a manual toggle — `media` alone can't be overridden by user preference.
- MUI: use `createTheme` with a `mode` in palette and a `ThemeProvider` at
  the root; toggle via context, don't fork styling logic per-component.
