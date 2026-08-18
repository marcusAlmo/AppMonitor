import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTicketsStore } from './useTicketsStore';
import type { Ticket } from './types';
import type { Column } from '../../components/ui';
import { DataTable, Badge, Button } from '../../components/ui';
import { Ticket as TicketIcon, Cpu, Filter, Plus } from 'lucide-react';

export const TicketBoardPage: React.FC = () => {
  const { tickets } = useTicketsStore();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredTickets = tickets.filter((t) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'devin-active') return t.devinActive;
    return t.status === filterStatus;
  });

  const columns: Column<Ticket>[] = [
    {
      key: 'id',
      header: 'ID',
      render: (t) => <span className="font-bold text-stone-900 dark:text-stone-100">{t.id}</span>,
    },
    {
      key: 'title',
      header: 'TITLE / CATEGORY',
      render: (t) => (
        <div className="flex flex-col">
          <span className="font-sans font-medium text-stone-900 dark:text-stone-100 truncate max-w-xs">{t.title}</span>
          <span className="text-[9px] text-stone-500 uppercase">{t.category}</span>
        </div>
      ),
    },
    {
      key: 'tenantName',
      header: 'TENANT',
      render: (t) => <span className="text-[10px] uppercase text-stone-600 dark:text-stone-400">{t.tenantName}</span>,
    },
    {
      key: 'priority',
      header: 'PRIORITY',
      render: (t) => (
        <Badge variant={t.priority === 'critical' ? 'critical' : 'neutral'}>
          {t.priority}
        </Badge>
      ),
    },
    {
      key: 'status',
      header: 'STATUS / DEVIN',
      render: (t) => (
        <div className="flex items-center gap-2">
          <Badge variant={t.status as any} pulse={t.devinActive}>
            {t.status}
          </Badge>
          {t.devinActive && (
            <span className="inline-flex items-center gap-1 text-[9px] text-teal-600 dark:text-teal-400 font-bold">
              <Cpu className="w-3 h-3 animate-spin" />
              DEVIN ACTIVE
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'updatedAt',
      header: 'LAST UPDATED',
      render: (t) => <span className="text-[10px] text-stone-500">{t.updatedAt}</span>,
    },
  ];

  return (
    <div className="space-y-6 font-mono">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-900 dark:border-stone-400 pb-4">
        <div className="flex items-center gap-3">
          <TicketIcon className="w-6 h-6 text-stone-900 dark:text-stone-100" />
          <div>
            <h1 className="text-sm font-bold uppercase tracking-widest">TICKET OPERATIONS BOARD</h1>
            <span className="text-[10px] text-stone-500">REAL-TIME AUTOMATED RESOLUTION TRACKER</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" onClick={() => navigate('/chat')} className="gap-1.5 text-[10px]">
            <Plus className="w-3.5 h-3.5" />
            NEW AI CHAT TICKET
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex items-center gap-2 bg-stone-200/50 dark:bg-stone-900 p-2 border border-stone-300 dark:border-stone-800 text-[10px]">
        <Filter className="w-3.5 h-3.5 text-stone-500 ml-2" />
        <span className="text-stone-500 uppercase font-bold">FILTER:</span>
        {['all', 'open', 'in-progress', 'pr-raised', 'devin-active', 'resolved'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-2 py-1 uppercase border transition-colors cursor-pointer ${
              filterStatus === st
                ? 'bg-stone-900 text-stone-50 border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100 font-bold'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-300 dark:border-stone-700'
            }`}
          >
            {st.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Main Stark Data Table */}
      <DataTable<Ticket>
        columns={columns}
        data={filteredTickets}
        keyExtractor={(t) => t.id}
        onRowClick={(t) => navigate(`/tickets/${t.id}`)}
        emptyMessage="No tickets match the selected status filter."
      />
    </div>
  );
};
