import { create } from 'zustand';
import type { TicketsState, Ticket, TicketStatus } from './types';

const MOCK_INITIAL_TICKETS: Ticket[] = [
  {
    id: 'TCK-8821',
    title: 'Race condition in Zustand state hydrator causing screen flicker',
    description: 'When switching user seats rapidly, state hydration triggers non-atomic re-renders.',
    category: 'Frontend Bug',
    priority: 'critical',
    status: 'pr-raised',
    tenantId: 't-acme-99',
    tenantName: 'Acme Corp',
    createdAt: '2026-08-18 09:12:00',
    updatedAt: '2026-08-18 10:30:15',
    devinActive: true,
    devinSessionId: 'devin-sess-9941a',
    devinProgressPercent: 85,
    pullRequestUrl: 'https://github.com/acme-org/appmonitor/pull/142',
    branchName: 'devin/fix-zustand-race-condition',
    logs: [
      { id: 'l1', timestamp: '09:12:05', message: 'Cloned repository branch: develop', type: 'info' },
      { id: 'l2', timestamp: '09:13:20', message: 'Executing test harness: pnpm test src/store', type: 'command' },
      { id: 'l3', timestamp: '09:15:10', message: 'Reproduced failure: 2 flaky assertions in hydrator.test.ts', type: 'warning' },
      { id: 'l4', timestamp: '09:22:40', message: 'Applied atomic state batch patch to useAppStore.ts', type: 'info' },
      { id: 'l5', timestamp: '09:28:00', message: 'All unit tests passing cleanly. Pushed branch devin/fix-zustand-race-condition', type: 'success' },
      { id: 'l6', timestamp: '09:30:15', message: 'Opened Pull Request #142 targeting develop', type: 'success' },
    ],
  },
  {
    id: 'TCK-7410',
    title: 'API rate limiter throwing 500 error on tenant burst requests',
    description: 'Token bucket Redis script returns nil instead of expected integer TTL.',
    category: 'Backend / Infra',
    priority: 'high',
    status: 'in-progress',
    tenantId: 't-globex-01',
    tenantName: 'Globex Inc',
    createdAt: '2026-08-18 11:00:00',
    updatedAt: '2026-08-18 11:20:00',
    devinActive: true,
    devinSessionId: 'devin-sess-4412c',
    devinProgressPercent: 45,
    branchName: 'devin/fix-redis-rate-limiter-script',
    logs: [
      { id: 'l1', timestamp: '11:00:05', message: 'Session initialized via AI Triage pipeline.', type: 'info' },
      { id: 'l2', timestamp: '11:02:10', message: 'Inspecting lua scripts in /server/redis/rate_limit.lua', type: 'command' },
      { id: 'l3', timestamp: '11:15:30', message: 'Found missing return fallback on key expiry', type: 'warning' },
    ],
  },
  {
    id: 'TCK-5510',
    title: 'Request for custom SSO SAML configuration guide',
    description: 'Partner requested Okta integration manual updates.',
    category: 'Documentation',
    priority: 'low',
    status: 'resolved',
    tenantId: 't-acme-99',
    tenantName: 'Acme Corp',
    createdAt: '2026-08-17 14:00:00',
    updatedAt: '2026-08-17 15:30:00',
    devinActive: false,
    logs: [],
  },
];

export const useTicketsStore = create<TicketsState>((set, get) => ({
  tickets: MOCK_INITIAL_TICKETS,

  createTicketFromChat: (data: Partial<Ticket>) => {
    const newTicket: Ticket = {
      id: data.id || `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      title: data.title || 'Untitled Support Request',
      description: data.description || '',
      category: data.category || 'General Technical',
      priority: data.priority || 'medium',
      status: 'in-progress',
      tenantId: data.tenantId || 't-acme-99',
      tenantName: data.tenantName || 'Acme Corp',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      devinActive: true,
      devinSessionId: `devin-sess-${Math.random().toString(36).substring(2, 7)}`,
      devinProgressPercent: 15,
      branchName: `devin/fix-${(data.title || 'issue').toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      logs: [
        {
          id: `l-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          message: 'Ticket received. Devin AI Agent spawned workspace container.',
          type: 'info',
        },
      ],
    };

    set((state) => ({ tickets: [newTicket, ...state.tickets] }));

    // Start simulated Devin automated PR sequence
    get().triggerDevinResolution(newTicket.id);

    return newTicket;
  },

  updateTicketStatus: (id: string, status: TicketStatus) => {
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === id
          ? {
              ...t,
              status,
              updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
              devinActive: status === 'in-progress' || status === 'pr-raised',
            }
          : t
      ),
    }));
  },

  triggerDevinResolution: (id: string) => {
    // Step 1: Analyze & run tests
    setTimeout(() => {
      set((state) => ({
        tickets: state.tickets.map((t) => {
          if (t.id !== id) return t;
          return {
            ...t,
            devinProgressPercent: 50,
            logs: [
              ...t.logs,
              {
                id: `l-${Date.now()}`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                message: 'Analyzed AST and reproduced bug in sandbox environment.',
                type: 'info',
              },
            ],
          };
        }),
      }));

      // Step 2: Push PR
      setTimeout(() => {
        set((state) => ({
          tickets: state.tickets.map((t) => {
            if (t.id !== id) return t;
            return {
              ...t,
              status: 'pr-raised',
              devinProgressPercent: 90,
              pullRequestUrl: `https://github.com/acme-org/appmonitor/pull/${Math.floor(150 + Math.random() * 50)}`,
              logs: [
                ...t.logs,
                {
                  id: `l-${Date.now()}`,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                  message: `Auto-generated PR pushed to ${t.branchName}. Tests passed 100%.`,
                  type: 'success',
                },
              ],
            };
          }),
        }));
      }, 4000);
    }, 3000);
  },
}));
