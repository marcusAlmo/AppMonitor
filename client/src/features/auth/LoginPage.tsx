import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from './useAuthStore';
import type { UserRole } from './types';
import { AuroraCage } from '../../components/ui';
import { Shield, UserCheck, Building2, User as UserIcon } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleRoleLogin = (role: UserRole) => {
    login(role);
    navigate('/tickets');
  };

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-xl border border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-900 shadow-2xl overflow-hidden">
        {/* Stark Header */}
        <header className="border-b border-stone-900 dark:border-stone-400 px-6 py-4 bg-stone-100 dark:bg-stone-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-stone-900 dark:text-stone-100" />
            <h1 className="text-xs font-mono font-bold uppercase tracking-widest">AppMonitor // AUTH GATEWAY</h1>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 border border-stone-900 dark:border-stone-400 bg-stone-200 dark:bg-stone-800">
            RBAC v2.4
          </span>
        </header>

        {/* Hero Caged Aurora background container */}
        <AuroraCage palette="warm" className="h-36 w-full flex items-center justify-center p-6 text-center border-b border-stone-900 dark:border-stone-400">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-700 dark:text-stone-300 bg-stone-100/60 dark:bg-stone-900/60 backdrop-blur-xs px-2 py-1 border border-stone-900/20 dark:border-stone-100/20">
              SYSTEM SECURITY CONSOLE
            </span>
            <h2 className="text-xl font-mono font-bold uppercase mt-2 tracking-tight text-stone-900 dark:text-white">
              Select Demo Identity
            </h2>
          </div>
        </AuroraCage>

        {/* Roles Selection */}
        <div className="p-6 flex flex-col gap-4 font-mono">
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed border-l-2 border-stone-900 dark:border-stone-100 pl-3">
            Choose a role identity to enter the system and test tenant-scoped permissions, chat workflow, and operation dashboards.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
            <button
              onClick={() => handleRoleLogin('admin')}
              className="p-4 border border-stone-900 dark:border-stone-400 bg-stone-100 dark:bg-stone-800/80 hover:bg-stone-900 hover:text-stone-50 dark:hover:bg-stone-100 dark:hover:text-stone-900 transition-colors text-left flex flex-col justify-between group cursor-pointer"
            >
              <div className="flex justify-between items-center w-full">
                <UserCheck className="w-4 h-4" />
                <span className="text-[9px] uppercase border px-1 py-0.5 border-current">Full Access</span>
              </div>
              <div className="mt-4">
                <span className="text-xs font-bold block">ADMIN</span>
                <span className="text-[9px] opacity-75 block">System Ops & Cost</span>
              </div>
            </button>

            <button
              onClick={() => handleRoleLogin('partner')}
              className="p-4 border border-stone-900 dark:border-stone-400 bg-stone-100 dark:bg-stone-800/80 hover:bg-stone-900 hover:text-stone-50 dark:hover:bg-stone-100 dark:hover:text-stone-900 transition-colors text-left flex flex-col justify-between group cursor-pointer"
            >
              <div className="flex justify-between items-center w-full">
                <Building2 className="w-4 h-4" />
                <span className="text-[9px] uppercase border px-1 py-0.5 border-current">Tenant Admin</span>
              </div>
              <div className="mt-4">
                <span className="text-xs font-bold block">PARTNER</span>
                <span className="text-[9px] opacity-75 block">Acme Corp Account</span>
              </div>
            </button>

            <button
              onClick={() => handleRoleLogin('user')}
              className="p-4 border border-stone-900 dark:border-stone-400 bg-stone-100 dark:bg-stone-800/80 hover:bg-stone-900 hover:text-stone-50 dark:hover:bg-stone-100 dark:hover:text-stone-900 transition-colors text-left flex flex-col justify-between group cursor-pointer"
            >
              <div className="flex justify-between items-center w-full">
                <UserIcon className="w-4 h-4" />
                <span className="text-[9px] uppercase border px-1 py-0.5 border-current">Client User</span>
              </div>
              <div className="mt-4">
                <span className="text-xs font-bold block">END-USER</span>
                <span className="text-[9px] opacity-75 block">Chatbot & KB</span>
              </div>
            </button>
          </div>
        </div>

        <footer className="border-t border-stone-900 dark:border-stone-400 px-6 py-3 bg-stone-100 dark:bg-stone-950 font-mono text-[9px] text-stone-500 flex justify-between">
          <span>STATUS: ALL GATEWAYS ONLINE</span>
          <span>DEVIN INTEGRATION READY</span>
        </footer>
      </div>
    </div>
  );
};
