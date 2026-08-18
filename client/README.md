# AppMonitor Client

The front-end client interface for AppMonitor, built with **React**, **TypeScript**, and **Vite**.

## 🛠️ Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4 (configured via Vite plugin)
- **State Management:** Zustand 5
- **Testing:** Vitest + React Testing Library (RTL) + jsdom
- **Linting:** Oxlint (high-performance linting)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** and **pnpm** installed. On macOS, you can quickly set these up using [Homebrew](https://brew.sh/):

```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Install pnpm globally
brew install pnpm
```

### Installation

Navigate to the client directory and install dependencies:

```bash
cd client
pnpm install
```

### Development Scripts

Within the `client` directory, you can run:

#### `pnpm run dev`
Runs the application in development mode with Hot Module Replacement (HMR). Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

#### `pnpm run build`
Compiles TypeScript types and builds the production bundle to the `dist` folder.

#### `pnpm run preview`
Locally previews the production build created by `pnpm run build`.

#### `pnpm run lint`
Runs Oxlint to check code quality.

---

## 🧪 Testing

We use **Vitest** + **React Testing Library** for unit and integration testing.

- **Run tests once:**
  ```bash
  pnpm test
  ```

- **Run in watch mode:**
  ```bash
  npx vitest
  ```

- **Run with Vitest UI:**
  ```bash
  npx vitest --ui
  ```

Testing configuration is located in [`vite.config.ts`](file:///Users/azerndo/Documents/software-dev/AppMonitor/client/vite.config.ts) and custom DOM matchers are loaded in [`src/test/setup.ts`](file:///Users/azerndo/Documents/software-dev/AppMonitor/client/src/test/setup.ts).

---

## 📦 State Management (Zustand)

Global state is managed via Zustand. You can find or add stores in `src/store/`.

Example store: [`src/store/useAppStore.ts`](file:///Users/azerndo/Documents/software-dev/AppMonitor/client/src/store/useAppStore.ts)
```typescript
import { create } from 'zustand'

interface AppState {
  count: number
  increment: () => void
}

export const useAppStore = create<AppState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))
```

Use it in components:
```tsx
import { useAppStore } from './store/useAppStore'

function MyComponent() {
  const { count, increment } = useAppStore()
  return <button onClick={increment}>Count is {count}</button>
}
```
