# Caged Aurora Design System

The **"Caged Aurora"** design system marries the blur-heavy, organic, and fluid glowing gradients of Aurora UI with the harsh, strict, and data-dense boundaries of utilitarian design. It feels like glowing neon gas trapped inside a harsh glass and steel instrument panel.

## Core Design Rules

* **The "Caged" Aurora:** Gradients must be placed inside containers with `overflow-hidden` and stark 1px or 2px borders. Gradients are forcefully cut off, creating a sharp, utilitarian containment zone.
* **Structure over Shadows:** Utilitarian design relies on visible structure. Use hard 1px/2px borders (`border-stone-900` or `border-stone-400`) instead of soft drop shadows.
* **Warm Dark Mode:** Dark mode should never be pure black (`#000000`). It must use deep, earthy charcoals (like Tailwind's `stone-950` / `stone-900`) to keep contrast warm and readable.
* **Thematic Borders:** In Light mode, use `stone-300` or `stone-900` for harsh contrast. In Dark mode, use `stone-700` or `stone-400`.
* **Blend Modes:** Use `mix-blend-multiply` in light mode and `mix-blend-screen` in dark mode so the aurora gradients interact naturally with underlying warm stone colors.
* **Restrained Corners:** Keep border radii minimal. Use sharp corners or `rounded-none`.

## Tailwind v4 CSS Configuration

In Tailwind v4, we configure the theme variables directly in [`client/src/index.css`](file:///Users/azerndo/Documents/software-dev/AppMonitor/client/src/index.css):

```css
@import "tailwindcss";

@variant dark (&:where(.dark, .dark *));

@theme {
  /* Aurora Colors */
  --color-aurora-orange: #ea580c;
  --color-aurora-rose: #e11d48;
  --color-aurora-amber: #d97706;
  
  /* Blob Animation */
  --animate-blob: blob 7s infinite;

  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(20px, -30px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
}
```

## Interactive States (The "Accommodating" Feel)

* **Focus States are Mandatory:** Apply thick, warm focus rings for keyboard users: `focus:outline-none focus:ring-2 focus:ring-aurora-orange focus:ring-offset-2 dark:focus:ring-offset-stone-900`.
* **Snappy Transitions:** Keep hover/active transitions fast (`transition-colors duration-75`) to feel responsive.
