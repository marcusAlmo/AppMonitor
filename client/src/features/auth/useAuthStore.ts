import { create } from 'zustand';
import type { AuthState, UserRole, User } from './types';

const MOCK_USERS: Record<UserRole, User> = {
  admin: {
    id: 'usr-admin-01',
    name: 'Sarah Connor (Admin)',
    email: 'admin@appmonitor.ai',
    role: 'admin',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
  },
  partner: {
    id: 'usr-partner-01',
    name: 'Marcus Vance (Acme Corp)',
    email: 'marcus@acme-inc.io',
    role: 'partner',
    tenantId: 't-acme-99',
    tenantName: 'Acme Corp',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
  },
  user: {
    id: 'usr-client-01',
    name: 'Alex Rivera (Client User)',
    email: 'alex@acme-inc.io',
    role: 'user',
    tenantId: 't-acme-99',
    tenantName: 'Acme Corp',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
  },
  'ai-agent': {
    id: 'usr-devin-bot',
    name: 'Devin AI Agent',
    email: 'devin@ai.internal',
    role: 'ai-agent',
  },
};

export const useAuthStore = create<AuthState>((set) => ({
  user: MOCK_USERS.admin, // default logged in as admin for smooth preview
  isAuthenticated: true,

  login: (role: UserRole) => {
    set({
      user: MOCK_USERS[role],
      isAuthenticated: true,
    });
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));
