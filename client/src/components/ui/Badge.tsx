import React from 'react';
import clsx from 'clsx';

export type BadgeVariant = 'open' | 'in-progress' | 'pr-raised' | 'merged' | 'resolved' | 'critical' | 'neutral' | 'ai-active';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  pulse = false,
  className,
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider border rounded-none transition-all duration-150 hover:scale-[1.03] select-none';

  const variants: Record<BadgeVariant, string> = {
    open: 'bg-amber-500/10 text-amber-600 border-amber-500/30 dark:bg-amber-400/10 dark:text-amber-300 dark:border-amber-400/30',
    'in-progress': 'bg-cyan-500/10 text-cyan-600 border-cyan-500/30 dark:bg-cyan-400/10 dark:text-cyan-300 dark:border-cyan-400/30',
    'pr-raised': 'bg-violet-500/10 text-violet-600 border-violet-500/30 dark:bg-violet-400/10 dark:text-violet-300 dark:border-violet-400/30',
    merged: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:bg-emerald-400/10 dark:text-emerald-300 dark:border-emerald-400/30',
    resolved: 'bg-stone-500/10 text-stone-600 border-stone-500/30 dark:bg-stone-400/10 dark:text-stone-400 dark:border-stone-400/30',
    critical: 'bg-rose-500/10 text-rose-600 border-rose-500/30 dark:bg-rose-400/10 dark:text-rose-400 dark:border-rose-400/30',
    neutral: 'bg-stone-200/50 text-stone-700 border-stone-300 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700',
    'ai-active': 'bg-teal-500/10 text-teal-600 border-teal-500/40 dark:bg-teal-400/10 dark:text-teal-300 dark:border-teal-400/40',
  };

  const dotColors: Record<BadgeVariant, string> = {
    open: 'bg-amber-500 dark:bg-amber-400',
    'in-progress': 'bg-cyan-500 dark:bg-cyan-400',
    'pr-raised': 'bg-violet-500 dark:bg-violet-400',
    merged: 'bg-emerald-500 dark:bg-emerald-400',
    resolved: 'bg-stone-500 dark:bg-stone-400',
    critical: 'bg-rose-500 dark:bg-rose-400',
    neutral: 'bg-stone-500 dark:bg-stone-400',
    'ai-active': 'bg-teal-500 dark:bg-teal-400',
  };

  return (
    <span className={clsx(baseStyles, variants[variant], className)} {...props}>
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className={clsx('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', dotColors[variant])} />
          <span className={clsx('relative inline-flex rounded-full h-1.5 w-1.5', dotColors[variant])} />
        </span>
      )}
      {children}
    </span>
  );
};
