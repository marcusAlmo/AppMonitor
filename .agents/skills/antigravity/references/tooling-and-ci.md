# Tooling & CI Harness

## ESLint (flat config, `eslint.config.js`)

Baseline plugin set for a React + TypeScript + Vite project:

```js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    plugins: { react, 'react-hooks': reactHooks, 'react-refresh': reactRefresh, 'jsx-a11y': jsxA11y },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react-refresh/only-export-components': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
);
```

Key non-negotiable rules: `react-hooks/rules-of-hooks` and
`react-hooks/exhaustive-deps` at `error` (not `warn`) — these catch real
bugs, not style nits. `jsx-a11y` recommended set at minimum.

## Prettier

Keep it minimal and let it own formatting entirely (no formatting opinions in
ESLint — use `eslint-config-prettier` to disable overlap):

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2
}
```

## Git hooks (Husky + lint-staged)

Run fast checks pre-commit, save full test suite/type-check for CI (keeps
commits fast):

```json
// package.json
"lint-staged": {
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,css}": ["prettier --write"]
}
```

```bash
npx husky init
echo "npx lint-staged" > .husky/pre-commit
```

Commit messages: Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`,
`test:`) if the team wants changelogs/semantic-release; enforce with
`commitlint` if adopted, otherwise don't impose it unprompted.

## CI pipeline (GitHub Actions example)

Minimum stages, in order (fail fast — cheapest checks first):

```yaml
name: CI
on: [pull_request]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck   # tsc --noEmit
      - run: npm run test -- --coverage
      - run: npm run build
```

Add `npm run test:e2e` (Playwright/Cypress) as a separate job if the project
has e2e coverage — don't block every PR on a slow e2e suite; run it on a
schedule or on merge to main if it's flaky/slow.

## `package.json` scripts baseline

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "typecheck": "tsc --noEmit",
    "lint": "eslint . --max-warnings 0",
    "format": "prettier --write .",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

## Environment variables

- Never commit `.env` files with real secrets; commit `.env.example` with
  placeholder keys.
- Validate env vars at startup (a small zod schema parsing
  `import.meta.env`) so a missing/misconfigured var fails loudly at boot,
  not with a confusing runtime error deep in a component.

## Scaffolding a new feature (checklist)

When asked to scaffold a new feature end-to-end, create:

```
features/<name>/
├── components/
├── hooks/
├── api/            # or queries/ if using React Query
├── types.ts
├── constants.ts
└── index.ts        # public exports only
```

Plus: a route entry (if the app has routing), colocated tests for the main
component(s) and any non-trivial hook, and an update to any shared
navigation/constants file if the feature needs to be discoverable.
