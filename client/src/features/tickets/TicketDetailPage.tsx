import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTicketsStore } from './useTicketsStore';
import { DevinStatusPanel } from './DevinStatusPanel';
import { Badge, Button } from '../../components/ui';
import { ArrowLeft, Ticket as TicketIcon, Building2, Calendar, GitBranch } from 'lucide-react';

export const TicketDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tickets, updateTicketStatus } = useTicketsStore();
  const ticket = tickets.find((t) => t.id === id);

  if (!ticket) {
    return (
      <div className="p-12 text-center border border-stone-900 dark:border-stone-400 font-mono">
        <h2 className="text-sm font-bold uppercase text-rose-500">404 // TICKET NOT FOUND</h2>
        <p className="text-xs text-stone-500 mt-2">The specified ticket record does not exist.</p>
        <Link to="/tickets" className="mt-4 inline-block text-xs underline">
          &larr; Return to Ticket Board
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-mono">
      {/* Back nav & status actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          to="/tickets"
          className="inline-flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white uppercase font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          BACK TO TICKET BOARD
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-stone-500 uppercase">UPDATE STATUS:</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => updateTicketStatus(ticket.id, 'in-progress')}
            disabled={ticket.status === 'in-progress'}
            className="text-[10px]"
          >
            IN PROGRESS
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => updateTicketStatus(ticket.id, 'resolved')}
            disabled={ticket.status === 'resolved'}
            className="text-[10px]"
          >
            RESOLVED
          </Button>
        </div>
      </div>

      {/* Main Ticket Header Card */}
      <div className="border border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-900 p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-900/20 dark:border-stone-100/20 pb-4">
          <div className="flex items-center gap-3">
            <TicketIcon className="w-5 h-5 text-stone-900 dark:text-stone-100" />
            <h1 className="text-sm font-bold uppercase tracking-wider">{ticket.id}</h1>
            <Badge variant={ticket.status as any} pulse={ticket.devinActive}>
              {ticket.status}
            </Badge>
            <Badge variant={ticket.priority === 'critical' ? 'critical' : 'neutral'}>
              PRIORITY: {ticket.priority}
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-[10px] text-stone-500">
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              {ticket.tenantName}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {ticket.createdAt}
            </span>
          </div>
        </div>

        <div>
          <h2 className="text-base font-bold font-sans text-stone-900 dark:text-stone-100 mb-2">{ticket.title}</h2>
          <p className="text-xs font-sans text-stone-600 dark:text-stone-300 leading-relaxed bg-stone-100 dark:bg-stone-950 p-4 border border-stone-300 dark:border-stone-800">
            {ticket.description}
          </p>
        </div>

        {ticket.branchName && (
          <div className="flex items-center gap-2 text-[10px] text-stone-500">
            <GitBranch className="w-3.5 h-3.5 text-violet-500" />
            <span>DEVIN GIT BRANCH:</span>
            <code className="bg-stone-200 dark:bg-stone-800 px-2 py-0.5 text-stone-900 dark:text-stone-100">
              {ticket.branchName}
            </code>
          </div>
        )}
      </div>

      {/* Marquee Devin Autonomous Worker Panel */}
      <DevinStatusPanel ticket={ticket} />
    </div>
  );
};
