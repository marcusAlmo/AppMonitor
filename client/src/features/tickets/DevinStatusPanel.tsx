import React from 'react';
import type { Ticket } from './types';
import { AuroraCage, Badge } from '../../components/ui';
import { Cpu, GitPullRequest, Terminal, ExternalLink, Activity } from 'lucide-react';

export interface DevinStatusPanelProps {
  ticket: Ticket;
}

export const DevinStatusPanel: React.FC<DevinStatusPanelProps> = ({ ticket }) => {
  return (
    <AuroraCage palette="ai-active" active={ticket.devinActive} className="p-5 font-mono">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-900/30 dark:border-stone-100/30">
        <div className="flex items-center gap-2.5">
          <Cpu className="w-5 h-5 text-teal-600 dark:text-teal-400 animate-pulse" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white">
                DEVIN AI AUTONOMOUS AGENT
              </h3>
              <Badge variant={ticket.devinActive ? 'ai-active' : 'resolved'} pulse={ticket.devinActive}>
                {ticket.devinActive ? 'AGENT BUSY' : 'STANDBY'}
              </Badge>
            </div>
            <span className="text-[10px] text-stone-600 dark:text-stone-400">
              SESSION ID: {ticket.devinSessionId || 'N/A'}
            </span>
          </div>
        </div>

        {/* PR Button if raised */}
        {ticket.pullRequestUrl && (
          <a
            href={ticket.pullRequestUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white font-mono text-xs uppercase border border-violet-800 transition-colors shadow-sm"
          >
            <GitPullRequest className="w-4 h-4" />
            <span>VIEW AUTOMATED PR</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {/* Progress Bar */}
      {ticket.devinActive && (
        <div className="my-4">
          <div className="flex justify-between text-[10px] text-stone-600 dark:text-stone-300 font-bold mb-1 uppercase">
            <span className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-teal-500 animate-spin" />
              Code Fix & Test Generation Progress
            </span>
            <span>{ticket.devinProgressPercent || 0}%</span>
          </div>
          <div className="w-full h-2 bg-stone-200 dark:bg-stone-800 border border-stone-900 dark:border-stone-400 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 via-violet-500 to-amber-500 transition-all duration-500"
              style={{ width: `${ticket.devinProgressPercent || 0}%` }}
            />
          </div>
        </div>
      )}

      {/* Terminal Log Stream */}
      <div className="mt-4 bg-stone-950 text-stone-100 p-3 border border-stone-900 dark:border-stone-700 text-[10px]">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-800 text-stone-400">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-teal-400" />
            DEVIN CONTAINER LOG STREAM [STDOUT]
          </span>
          <span className="text-[9px]">BRANCH: {ticket.branchName || 'main'}</span>
        </div>

        <div className="space-y-1 max-h-40 overflow-y-auto font-mono">
          {ticket.logs.length === 0 ? (
            <div className="text-stone-500 italic">No activity logs recorded yet.</div>
          ) : (
            ticket.logs.map((log) => (
              <div key={log.id} className="flex gap-2 leading-tight">
                <span className="text-stone-500 shrink-0">[{log.timestamp}]</span>
                <span
                  className={
                    log.type === 'command'
                      ? 'text-amber-400 font-bold'
                      : log.type === 'success'
                      ? 'text-emerald-400'
                      : log.type === 'warning'
                      ? 'text-rose-400'
                      : 'text-stone-300'
                  }
                >
                  {log.type === 'command' ? '$ ' : ''}
                  {log.message}
                </span>
              </div>
            ))
          )}
          {ticket.devinActive && (
            <div className="flex items-center gap-1 text-teal-400 pt-1">
              <span className="w-1.5 h-3 bg-teal-400 animate-blink inline-block" />
              <span className="text-[9px]">Executing Devin reasoning loop...</span>
            </div>
          )}
        </div>
      </div>
    </AuroraCage>
  );
};
