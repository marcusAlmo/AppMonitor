import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/useAuthStore';
import {
  MessageSquare,
  Ticket,
  BookOpen,
  Activity,
  History,
  DollarSign,
  Users,
  ShieldAlert,
} from 'lucide-react';
import clsx from 'clsx';

export const Sidebar: React.FC = () => {
  const { user } = useAuthStore();
  const role = user?.role || 'user';

  const navItems = [
    {
      section: 'CLIENT INTERFACE',
      items: [
        { label: 'AI Chatbot', path: '/chat', icon: MessageSquare, roles: ['admin', 'partner', 'user'] },
        { label: 'Ticket Board', path: '/tickets', icon: Ticket, roles: ['admin', 'partner', 'user'] },
        { label: 'Knowledge Base', path: '/kb', icon: BookOpen, roles: ['admin', 'partner', 'user'] },
        { label: 'System Status', path: '/status', icon: Activity, roles: ['admin', 'partner', 'user'] },
      ],
    },
    {
      section: 'ADMIN & OPERATIONS',
      items: [
        { label: 'Chat Review QA', path: '/admin/chat-review', icon: History, roles: ['admin', 'partner'] },
        { label: 'AI API Costs', path: '/admin/api-costs', icon: DollarSign, roles: ['admin'] },
        { label: 'Partner Management', path: '/admin/partners', icon: Users, roles: ['admin'] },
      ],
    },
  ];

  return (
    <aside className="w-64 border-r border-stone-900 dark:border-stone-400 bg-stone-100 dark:bg-stone-950 flex flex-col justify-between h-screen sticky top-0 shrink-0 font-mono">
      <div>
        {/* Brand / Logo (h-14 aligned with TopBar) */}
        <div className="h-14 px-4 border-b border-stone-900 dark:border-stone-400 flex items-center gap-2.5 bg-stone-200/50 dark:bg-stone-900 shrink-0">
          <ShieldAlert className="w-5 h-5 text-stone-900 dark:text-stone-100 shrink-0" />
          <div>
            <h1 className="text-xs font-semibold uppercase tracking-widest leading-none">APPMONITOR</h1>
            <span className="text-[9px] text-stone-500 uppercase tracking-tighter block mt-0.5">B2B AI Support OS</span>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="p-3 space-y-6">
          {navItems.map((group) => {
            const filteredItems = group.items.filter((item) => item.roles.includes(role));
            if (filteredItems.length === 0) return null;

            return (
              <div key={group.section}>
                <h2 className="px-3 text-[9px] font-bold text-stone-500 uppercase tracking-widest mb-2">
                  {group.section}
                </h2>
                <nav className="space-y-1">
                  {filteredItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        clsx(
                          'flex items-center gap-2.5 px-3 py-2 text-xs uppercase font-medium transition-colors border border-transparent',
                          isActive
                            ? 'bg-stone-900 text-stone-50 border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100 font-semibold'
                            : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-900 hover:border-stone-400 dark:hover:border-stone-700'
                        )
                      }
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </nav>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tenant Context Block */}
      <div className="p-4 border-t border-stone-900 dark:border-stone-400 bg-stone-200/50 dark:bg-stone-900 text-[10px]">
        <div className="flex justify-between items-center text-stone-500 dark:text-stone-400 font-mono mb-1">
          <span>TENANT SCOPE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
        </div>
        <div className="font-bold text-stone-900 dark:text-stone-100 truncate">
          {user?.tenantName || 'Global System (Admin)'}
        </div>
      </div>
    </aside>
  );
};
