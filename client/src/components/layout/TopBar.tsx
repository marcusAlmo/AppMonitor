import React, { useState } from 'react';
import { useAuthStore } from '../../features/auth/useAuthStore';
import { Button } from '../ui';
import { LogoutConfirmModal } from './LogoutConfirmModal';
import { Sun, Moon, LogOut, Cpu } from 'lucide-react';

export interface TopBarProps {
  isDark: boolean;
  onToggleDark: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ isDark, onToggleDark }) => {
  const { user, logout } = useAuthStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <header className="h-14 border-b border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-950 px-6 flex items-center justify-between font-mono shrink-0">
        {/* Left info / status indicator */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-2 py-1 border border-stone-900/20 dark:border-stone-100/20 bg-stone-200/40 dark:bg-stone-900 text-[10px]">
            <Cpu className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 animate-pulse" />
            <span>DEVIN AI ENGINE: ONLINE</span>
          </div>
        </div>

        {/* Right User info & theme toggle */}
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-3 pr-4 border-r border-stone-300 dark:border-stone-800">
              {user.avatarUrl && (
                <img src={user.avatarUrl} alt={user.name} className="w-7 h-7 border border-stone-900 dark:border-stone-300 object-cover rounded-none" />
              )}
              <div className="flex flex-col text-right text-[10px]">
                <span className="font-bold text-stone-900 dark:text-stone-100 leading-tight">{user.name}</span>
                <span className="text-stone-500 uppercase">ROLE: {user.role}</span>
              </div>
            </div>
          )}

          <button
            onClick={onToggleDark}
            className="p-1.5 border border-stone-900 dark:border-stone-400 text-stone-900 dark:text-stone-100 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            title="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <Button variant="ghost" size="sm" onClick={() => setShowLogoutModal(true)} className="gap-1.5 text-[10px]">
            <LogOut className="w-3.5 h-3.5" />
            EXIT
          </Button>
        </div>
      </header>

      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          setShowLogoutModal(false);
          logout();
        }}
      />
    </>
  );
};
