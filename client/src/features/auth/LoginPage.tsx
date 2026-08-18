import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from './useAuthStore';
import { useAppStore } from '../../store/useAppStore';
import { AuroraCage, Button } from '../../components/ui';
import { Shield, Lock, Mail, ArrowRight, Sun, Moon, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoginPage: React.FC = () => {
  const { login } = useAuthStore();
  const { isDark, toggleDark } = useAppStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@appmonitor.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login('admin');
      setIsLoading(false);
      navigate('/tickets');
    }, 600);
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col items-center justify-center p-4 sm:p-8 transition-colors duration-200">
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="w-full max-w-md border border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.15)] overflow-hidden font-mono"
        >
          {/* Header Bar */}
          <header className="border-b border-stone-900 dark:border-stone-400 px-6 py-4 bg-stone-100 dark:bg-stone-950 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-stone-900 dark:text-stone-100" />
              <div>
                <h1 className="text-xs font-semibold uppercase tracking-widest leading-none">APPMONITOR</h1>
                <span className="text-[9px] text-stone-500 uppercase tracking-tighter block mt-0.5">AUTHENTICATION GATEWAY</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleDark}
                className="p-1.5 border border-stone-900/30 dark:border-stone-400 text-stone-900 dark:text-stone-100 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                title="Toggle Theme"
              >
                {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
              <span className="text-[9px] font-semibold px-2 py-0.5 border border-stone-900 dark:border-stone-400 bg-stone-200 dark:bg-stone-800">
                RBAC v2.4
              </span>
            </div>
          </header>

          {/* Hero Caged Aurora Banner */}
          <AuroraCage palette="ai-active" className="h-32 w-full flex items-center justify-center p-6 text-center border-b border-stone-900 dark:border-stone-400">
            <div>
              <span className="text-[9px] font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-300 bg-stone-100/70 dark:bg-stone-900/70 backdrop-blur-xs px-2.5 py-1 border border-teal-500/30">
                SYSTEM SECURITY CONSOLE // AUTHENTICATION
              </span>
              <h2 className="text-lg font-semibold uppercase mt-2 tracking-tight text-stone-900 dark:text-white flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-500" />
                Sign In to Platform
              </h2>
            </div>
          </AuroraCage>

          {/* Form Body */}
          <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase text-stone-500 mb-1 flex items-center gap-1.5 font-semibold">
                  <Mail className="w-3.5 h-3.5 text-stone-500" />
                  WORK EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@appmonitor.ai"
                  className="w-full px-3 py-2 bg-stone-100 dark:bg-stone-950 border border-stone-900 dark:border-stone-400 text-xs font-mono text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[10px] uppercase text-stone-500 flex items-center gap-1.5 font-semibold">
                    <Lock className="w-3.5 h-3.5 text-stone-500" />
                    PASSWORD
                  </label>
                  <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[9px] text-teal-600 dark:text-teal-400 hover:underline uppercase">
                    FORGOT?
                  </a>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 bg-stone-100 dark:bg-stone-950 border border-stone-900 dark:border-stone-400 text-xs font-mono text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" size="md" isLoading={isLoading} className="w-full gap-2 mt-4">
              AUTHENTICATE & ENTER PLATFORM
              <ArrowRight className="w-4 h-4" />
            </Button>

            {/* Quick Sample Demo Accounts Section */}
            <div className="pt-4 border-t border-dashed border-stone-300 dark:border-stone-800 space-y-2">
              <div className="flex justify-between items-center text-[9px] text-stone-500 font-semibold uppercase">
                <span>SAMPLE DEMO ACCOUNTS (CLICK TO AUTOFILL):</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEmail('admin@appmonitor.ai');
                    setPassword('admin123');
                    login('admin');
                    navigate('/tickets');
                  }}
                  className="p-2 border border-stone-300 dark:border-stone-800 bg-stone-100 dark:bg-stone-950 hover:border-teal-500 dark:hover:border-teal-400 hover:bg-stone-200 dark:hover:bg-stone-900 transition-all text-left cursor-pointer"
                >
                  <span className="text-[9px] font-semibold text-teal-600 dark:text-teal-400 block">ADMIN</span>
                  <span className="text-[8px] text-stone-500 block truncate">Full System Ops</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEmail('marcus@acme-inc.io');
                    setPassword('partner123');
                    login('partner');
                    navigate('/tickets');
                  }}
                  className="p-2 border border-stone-300 dark:border-stone-800 bg-stone-100 dark:bg-stone-950 hover:border-amber-500 dark:hover:border-amber-400 hover:bg-stone-200 dark:hover:bg-stone-900 transition-all text-left cursor-pointer"
                >
                  <span className="text-[9px] font-semibold text-amber-600 dark:text-amber-400 block">PARTNER</span>
                  <span className="text-[8px] text-stone-500 block truncate">Acme Corp Admin</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEmail('alex@acme-inc.io');
                    setPassword('user123');
                    login('user');
                    navigate('/tickets');
                  }}
                  className="p-2 border border-stone-300 dark:border-stone-800 bg-stone-100 dark:bg-stone-950 hover:border-violet-500 dark:hover:border-violet-400 hover:bg-stone-200 dark:hover:bg-stone-900 transition-all text-left cursor-pointer"
                >
                  <span className="text-[9px] font-semibold text-violet-600 dark:text-violet-400 block">END-USER</span>
                  <span className="text-[8px] text-stone-500 block truncate">Client Support</span>
                </button>
              </div>
            </div>
          </form>

          {/* Footer */}
          <footer className="border-t border-stone-900 dark:border-stone-400 px-6 py-3 bg-stone-100 dark:bg-stone-950 font-mono text-[9px] text-stone-500 flex justify-between">
            <span>STATUS: AUTH GATEWAYS ONLINE</span>
            <span>DEVIN INTEGRATION ACTIVE</span>
          </footer>
        </motion.div>
      </div>
    </div>
  );
};
