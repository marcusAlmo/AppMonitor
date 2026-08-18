import React, { forwardRef } from 'react';
import clsx from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'dashed';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-mono uppercase tracking-wider transition-all duration-150 active:translate-y-0.5 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-none select-none';

    const variants = {
      primary:
        'bg-stone-900 text-stone-50 border border-stone-900 hover:bg-stone-800 hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(234,88,12,0.6)] dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100 dark:hover:bg-stone-200 dark:hover:shadow-[2px_2px_0px_0px_rgba(13,148,136,0.8)]',
      secondary:
        'bg-stone-100 text-stone-900 border border-stone-900 hover:bg-stone-200 hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)] dark:bg-stone-800 dark:text-stone-100 dark:border-stone-300 dark:hover:bg-stone-700 dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.7)]',
      ghost:
        'bg-transparent text-stone-700 hover:bg-stone-200/60 hover:text-stone-900 border border-transparent dark:text-stone-300 dark:hover:bg-stone-800/80 dark:hover:text-white',
      danger:
        'bg-rose-600 text-white border border-rose-700 hover:bg-rose-700 hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(159,18,57,0.8)] dark:bg-rose-700 dark:hover:bg-rose-600',
      dashed:
        'bg-transparent text-stone-600 border border-dashed border-stone-400 hover:bg-stone-200/50 hover:border-stone-900 hover:text-stone-900 dark:text-stone-400 dark:border-stone-600 dark:hover:bg-stone-800/60 dark:hover:border-stone-300 dark:hover:text-stone-100',
    };

    const sizes = {
      sm: 'px-2.5 py-1 text-[10px]',
      md: 'px-4 py-2 text-xs',
      lg: 'px-6 py-2.5 text-sm',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 border-2 border-current border-t-transparent animate-spin rounded-full" />
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
