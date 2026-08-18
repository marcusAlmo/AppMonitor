import { create } from 'zustand';

interface AppState {
  count: number;
  isDark: boolean;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  toggleDark: () => void;
}

const getInitialDarkState = (): boolean => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem('appmonitor_theme');
      return saved ? saved === 'dark' : false;
    }
  } catch {
    // Fallback if storage access is restricted or undefined in test runner
  }
  return false;
};

export const useAppStore = create<AppState>((set) => ({
  count: 0,
  isDark: getInitialDarkState(),
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  toggleDark: () =>
    set((state) => {
      const next = !state.isDark;
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem('appmonitor_theme', next ? 'dark' : 'light');
        }
      } catch {
        // Storage write safeguard
      }
      return { isDark: next };
    }),
}));
