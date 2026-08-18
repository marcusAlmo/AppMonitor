# React Native Deviations

Most rules in the main SKILL.md and other references apply identically
(hooks discipline, TypeScript strictness, component structure, state
management decision tree). This file covers where React Native genuinely
differs.

## Styling

- No Tailwind/MUI by default — use `StyleSheet.create` (not inline style
  objects recreated every render) unless the project has adopted NativeWind
  (Tailwind-for-RN) or Tamagui, in which case follow that library's
  conventions instead.
- Keep style objects colocated at the bottom of the component file (or in a
  sibling `ComponentName.styles.ts`) — don't inline large style objects in
  JSX.
- Use theme constants (spacing, colors, typography scale) from a shared
  theme file, same principle as the Tailwind/MUI token guidance — no magic
  pixel values scattered across screens.

```tsx
const styles = StyleSheet.create({
  container: { flex: 1, padding: theme.spacing.md },
  title: { fontSize: theme.typography.lg, fontWeight: '600' },
});
```

## Lists

- Always use `FlatList`/`SectionList` (or `FlashList` from Shopify for
  large/complex lists) — never `.map()` inside a `ScrollView` for anything
  beyond a handful of static items. This is the single most common RN
  performance mistake.
- Provide `keyExtractor`, and `getItemLayout` when row heights are fixed
  (avoids expensive layout measurement).

## Navigation

- React Navigation is the de facto standard — type the navigator's param
  list explicitly and derive screen props from it, don't type navigation
  props as `any`:

```ts
type RootStackParamList = {
  Home: undefined;
  InvoiceDetail: { invoiceId: string };
};

type InvoiceDetailProps = NativeStackScreenProps<RootStackParamList, 'InvoiceDetail'>;
```

## Platform differences

- Use `Platform.select` / `.ios.tsx` / `.android.tsx` file suffixes for
  genuine platform divergence, not scattered `Platform.OS === 'ios'` checks
  throughout a component when the divergence is substantial.
- Always test safe-area handling (`react-native-safe-area-context`) — don't
  hardcode top/bottom padding.

## Performance specifics

- Avoid anonymous functions/objects as props to list row components even
  more strictly than on web — RN's bridge makes unnecessary re-renders
  costlier. Memoize row components with `React.memo` by default for any
  `FlatList` `renderItem`.
- Use `useNativeDriver: true` for animations (Reanimated/Animated) wherever
  the driven properties support it, to keep animations off the JS thread.
- Enable Hermes (usually default in modern RN/Expo) and check bundle size
  with `npx react-native-bundle-visualizer` if the app feels slow to start.

## Testing

- `@testing-library/react-native` instead of DOM RTL. Query by role/label
  where components expose accessible props (`accessibilityRole`,
  `accessibilityLabel`) — set these on custom components specifically so
  they're testable and accessible simultaneously, not just for the test's
  sake.
- Detox or Maestro for e2e, not Playwright/Cypress (those are web-only).

## Forms & keyboard

- Wrap forms in `KeyboardAvoidingView` (with platform-appropriate
  `behavior`) — a very common gap in AI-generated RN forms.
- Use a form library (`react-hook-form` works fine on RN) for anything with
  3+ fields rather than hand-rolled `useState` per field, same as web.
