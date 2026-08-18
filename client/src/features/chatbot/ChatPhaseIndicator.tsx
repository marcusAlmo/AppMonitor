import React from 'react';
import type { ChatPhase } from './types';
import clsx from 'clsx';
import { Cpu, CheckCircle2, CircleDashed } from 'lucide-react';

export interface ChatPhaseIndicatorProps {
  currentPhase: ChatPhase;
}

const PHASES: ChatPhase[] = [
  'Phase A - Triage',
  'Phase B - Troubleshoot',
  'Phase C - Ticket Generation',
  'Phase D - Devin Integration',
  'Phase E - Automated PR',
  'Phase F - Monitor',
];

export const ChatPhaseIndicator: React.FC<ChatPhaseIndicatorProps> = ({ currentPhase }) => {
  const currentIndex = PHASES.indexOf(currentPhase);

  return (
    <div className="w-full border-b border-stone-900 dark:border-stone-400 bg-stone-100 dark:bg-stone-900 p-3 font-mono text-[10px]">
      <div className="flex items-center justify-between mb-2 text-stone-500 dark:text-stone-400">
        <span className="flex items-center gap-1.5 font-bold uppercase text-stone-900 dark:text-stone-100">
          <Cpu className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          AI WORKFLOW PIPELINE
        </span>
        <span>CURRENT: {currentPhase}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-6 gap-1.5">
        {PHASES.map((phase, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div
              key={phase}
              className={clsx(
                'px-2 py-1 border flex items-center gap-1 transition-colors uppercase font-mono text-[9px] truncate',
                isDone && 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-300 dark:border-stone-700',
                isCurrent && 'bg-stone-900 text-stone-50 border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100 font-bold',
                !isDone && !isCurrent && 'bg-stone-50 dark:bg-stone-950 text-stone-400 border-stone-200 dark:border-stone-800'
              )}
            >
              {isDone ? (
                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
              ) : isCurrent ? (
                <CircleDashed className="w-3 h-3 text-teal-400 animate-spin shrink-0" />
              ) : (
                <span className="w-3 text-center shrink-0">{idx + 1}</span>
              )}
              <span className="truncate">{phase.replace('Phase ', '')}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
