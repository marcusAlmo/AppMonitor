import React from 'react';
import { Button } from '../ui';
import { LogOut, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-xs flex items-center justify-center p-4 font-mono"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-md border border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-900 shadow-2xl space-y-4"
          >
            {/* Header */}
            <header className="p-4 border-b border-stone-900 dark:border-stone-400 bg-stone-100 dark:bg-stone-950 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h2 className="text-xs font-bold uppercase tracking-wider">CONFIRM SESSION EXIT</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-stone-200 dark:hover:bg-stone-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </header>

            {/* Content */}
            <div className="p-6 space-y-3">
              <p className="text-xs text-stone-700 dark:text-stone-300 font-sans leading-relaxed">
                Are you sure you want to terminate your current identity session and exit AppMonitor?
              </p>
              <div className="p-3 bg-stone-100 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-[10px] text-stone-500">
                NOTICE: Any active chat or unsaved sandbox state will remain persisted in local memory.
              </div>
            </div>

            {/* Footer Actions */}
            <footer className="p-4 border-t border-stone-900 dark:border-stone-400 bg-stone-100 dark:bg-stone-950 flex justify-end gap-2">
              <Button variant="dashed" size="sm" onClick={onClose}>
                CANCEL
              </Button>
              <Button variant="danger" size="sm" onClick={onConfirm} className="gap-1.5">
                <LogOut className="w-3.5 h-3.5" />
                TERMINATE SESSION
              </Button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
