import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/useAuthStore';
import { useAppStore } from '../../store/useAppStore';
import {
  MessageSquare,
  Ticket,
  BookOpen,
  Activity,
  History,
  DollarSign,
  Users,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import clsx from 'clsx';

export const Sidebar: React.FC = () => {
  const { user } = useAuthStore();
  const { isSidebarCollapsed, toggleSidebar } = useAppStore();
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
    <aside
      className={clsx(
        'border-r border-stone-900 dark:border-stone-400 bg-stone-100 dark:bg-stone-950 flex flex-col justify-between h-screen sticky top-0 shrink-0 font-mono transition-all duration-200 z-30',
        isSidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div>
        {/* Brand / Logo + Collapse Toggle */}
        <div
          className={clsx(
            'h-14 border-b border-stone-900 dark:border-stone-400 flex items-center justify-between bg-stone-200/50 dark:bg-stone-900 shrink-0 transition-all',
            isSidebarCollapsed ? 'px-2 justify-center' : 'px-4'
          )}
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <ShieldAlert className="w-5 h-5 text-stone-900 dark:text-stone-100 shrink-0" />
            {!isSidebarCollapsed && (
              <div className="truncate">
                <h1 className="text-xs font-semibold uppercase tracking-widest leading-none">APPMONITOR</h1>
                <span className="text-[9px] text-stone-500 uppercase tracking-tighter block mt-0.5">B2B AI Support OS</span>
              </div>
            )}
          </div>

          <button
            onClick={toggleSidebar}
            className="p-1 border border-stone-900/20 dark:border-stone-100/20 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-900 hover:text-stone-50 dark:hover:bg-stone-100 dark:hover:text-stone-900 transition-colors cursor-pointer shrink-0"
            title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="p-2 space-y-5">
          {navItems.map((group) => {
            const filteredItems = group.items.filter((item) => item.roles.includes(role));
            if (filteredItems.length === 0) return null;

            return (
              <div key={group.section}>
                {!isSidebarCollapsed && (
                  <h2 className="px-3 text-[9px] font-bold text-stone-500 uppercase tracking-widest mb-2 truncate">
                    {group.section}
                  </h2>
                )}
                <nav className="space-y-1">
                  {filteredItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      title={isSidebarCollapsed ? item.label : undefined}
                      className={({ isActive }) =>
                        clsx(
                          'flex items-center gap-2.5 py-2 text-xs uppercase font-medium transition-colors border border-transparent',
                          isSidebarCollapsed ? 'justify-center px-0' : 'px-3',
                          isActive
                            ? 'bg-stone-900 text-stone-50 border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100 font-semibold'
                            : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-900 hover:border-stone-400 dark:hover:border-stone-700'
                        )
                      }
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                    </NavLink>
                  ))}
                </nav>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tenant Context Block */}
      <div
        className={clsx(
          'p-3 border-t border-stone-900 dark:border-stone-400 bg-stone-200/50 dark:bg-stone-900 text-[10px] transition-all',
          isSidebarCollapsed ? 'flex justify-center' : ''
        )}
      >
        {isSidebarCollapsed ? (
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" title={user?.tenantName || 'Global System'} />
        ) : (
          <div>
            <div className="flex justify-between items-center text-stone-500 dark:text-stone-400 font-mono mb-1">
              <span>TENANT SCOPE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            </div>
            <div className="font-semibold text-stone-900 dark:text-stone-100 truncate">
              {user?.tenantName || 'Global System (Admin)'}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
