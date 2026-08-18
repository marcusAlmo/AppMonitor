import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileGuard } from './MobileGuard';
import { useAppStore } from '../../store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';

export const AppShell: React.FC = () => {
  const { isDark, toggleDark } = useAppStore();
  const location = useLocation();

  return (
    <div className={isDark ? 'dark' : ''}>
      <MobileGuard />
      <div className="min-h-screen bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex transition-colors duration-200">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
          <TopBar isDark={isDark} onToggleDark={toggleDark} />
          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="flex-1 p-6 overflow-y-auto"
            >
              <Outlet />
            </motion.main>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
