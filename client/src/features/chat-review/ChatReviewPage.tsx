import React, { useState } from 'react';
import type { ChatMessageItem } from '../chatbot/types';
import { ChatMessage } from '../chatbot/ChatMessage';
import type { Column } from '../../components/ui';
import { DataTable, Badge } from '../../components/ui';
import { History, Search, UserCheck } from 'lucide-react';

interface ConversationAuditSession {
  id: string;
  userName: string;
  tenantName: string;
  messageCount: number;
  phaseReached: string;
  resolutionStatus: 'auto-resolved' | 'escalated-to-devin' | 'pending';
  startedAt: string;
  messages: ChatMessageItem[];
}

const MOCK_AUDIT_SESSIONS: ConversationAuditSession[] = [
  {
    id: 'sess-8810',
    userName: 'Alex Rivera',
    tenantName: 'Acme Corp',
    messageCount: 4,
    phaseReached: 'Phase D - Devin Integration',
    resolutionStatus: 'escalated-to-devin',
    startedAt: '2026-08-18 11:45',
    messages: [
      { id: 'm1', sender: 'user', content: 'Zustand hydration flickering in React 19', timestamp: '11:45' },
      { id: 'm2', sender: 'ai', content: 'Categorized issue. Attempting KB-104 lookup.', timestamp: '11:45', phase: 'Phase B - Troubleshoot' },
      { id: 'm3', sender: 'ai', content: 'Escalated to Devin AI Engineer. Ticket TCK-8821 generated.', timestamp: '11:46', phase: 'Phase D - Devin Integration', ticketId: 'TCK-8821' },
    ],
  },
  {
    id: 'sess-7712',
    userName: 'Jordan Vance',
    tenantName: 'Globex Inc',
    messageCount: 2,
    phaseReached: 'Phase B - Troubleshoot',
    resolutionStatus: 'auto-resolved',
    startedAt: '2026-08-18 10:15',
    messages: [
      { id: 'm1', sender: 'user', content: 'How do I generate an API token for my tenant?', timestamp: '10:15' },
      { id: 'm2', sender: 'ai', content: 'Refer to Knowledge Base KB-305 for tenant security tokens.', timestamp: '10:15', phase: 'Phase B - Troubleshoot' },
    ],
  },
];

export const ChatReviewPage: React.FC = () => {
  const [selectedSession, setSelectedSession] = useState<ConversationAuditSession>(MOCK_AUDIT_SESSIONS[0]);
  const [searchFilter, setSearchFilter] = useState('');

  const filteredSessions = MOCK_AUDIT_SESSIONS.filter(
    (s) =>
      s.userName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.tenantName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.id.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const columns: Column<ConversationAuditSession>[] = [
    { key: 'id', header: 'SESSION ID', render: (s) => <span className="font-bold">{s.id}</span> },
    { key: 'userName', header: 'USER / TENANT', render: (s) => <span>{s.userName} ({s.tenantName})</span> },
    { key: 'phaseReached', header: 'PHASE REACHED', render: (s) => <Badge variant="ai-active">{s.phaseReached}</Badge> },
    {
      key: 'resolutionStatus',
      header: 'OUTCOME',
      render: (s) => (
        <Badge variant={s.resolutionStatus === 'escalated-to-devin' ? 'pr-raised' : 'resolved'}>
          {s.resolutionStatus}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6 font-mono">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-stone-900 dark:border-stone-400 pb-4">
        <History className="w-6 h-6 text-stone-900 dark:text-stone-100" />
        <div>
          <h1 className="text-sm font-bold uppercase tracking-widest">CHAT REVIEW & QA AUDIT LOG</h1>
          <span className="text-[10px] text-stone-500">SUPERVISOR AUDIT OF HUMAN-TO-AI CHATBOT CONVERSATIONS</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Sessions List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search by user or tenant..."
              className="w-full pl-9 pr-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-900 dark:border-stone-400 text-xs font-mono text-stone-900 dark:text-stone-100 focus:outline-none"
            />
          </div>

          <DataTable<ConversationAuditSession>
            columns={columns}
            data={filteredSessions}
            keyExtractor={(s) => s.id}
            onRowClick={(s) => setSelectedSession(s)}
          />
        </div>

        {/* Right Column: Replay Viewer */}
        <div className="lg:col-span-7 border border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-950 p-4 space-y-4">
          <div className="flex justify-between items-center border-b border-stone-900/20 dark:border-stone-100/20 pb-3">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-teal-500" />
              <span className="text-xs font-bold">REPLAYING SESSION: {selectedSession.id}</span>
            </div>
            <Badge variant="neutral">{selectedSession.startedAt}</Badge>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto p-2">
            {selectedSession.messages.map((m) => (
              <ChatMessage key={m.id} message={m} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
