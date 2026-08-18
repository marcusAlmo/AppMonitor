import React from 'react';
import clsx from 'clsx';

export type AuroraPalette = 'warm' | 'cool' | 'ai-active' | 'danger';

export interface AuroraCageProps extends React.HTMLAttributes<HTMLDivElement> {
  palette?: AuroraPalette;
  active?: boolean;
  showGrid?: boolean;
}

export const AuroraCage: React.FC<AuroraCageProps> = ({
  palette = 'cool',
  active = true,
  showGrid = true,
  className,
  children,
  ...props
}) => {
  const paletteClasses = {
    warm: [
      'bg-aurora-orange/40 dark:bg-aurora-orange/50',
      'bg-aurora-rose/40 dark:bg-aurora-rose/50',
      'bg-aurora-amber/40 dark:bg-aurora-amber/50',
    ],
    cool: [
      'bg-aurora-teal/40 dark:bg-aurora-teal/50',
      'bg-aurora-cyan/40 dark:bg-aurora-cyan/50',
      'bg-aurora-indigo/40 dark:bg-aurora-indigo/50',
    ],
    'ai-active': [
      'bg-aurora-violet/40 dark:bg-aurora-violet/50',
      'bg-aurora-teal/40 dark:bg-aurora-teal/50',
      'bg-aurora-cyan/40 dark:bg-aurora-cyan/50',
    ],
    danger: [
      'bg-aurora-rose/50 dark:bg-aurora-rose/60',
      'bg-aurora-orange/40 dark:bg-aurora-orange/50',
      'bg-red-600/40 dark:bg-red-600/50',
    ],
  };

  const colors = paletteClasses[palette];

  return (
    <div
      className={clsx(
        'group relative overflow-hidden border border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-950 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-500 dark:hover:border-teal-400 hover:shadow-[4px_4px_0px_0px_rgba(13,148,136,0.35)] dark:hover:shadow-[4px_4px_0px_0px_rgba(13,148,136,0.5)]',
        className
      )}
      {...props}
    >
      {active && (
        <>
          {/* Blob 1 */}
          <div
            className={clsx(
              'absolute top-[-20%] left-[-10%] w-56 h-56 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob pointer-events-none transition-all duration-500 group-hover:scale-125 group-hover:opacity-90',
              colors[0]
            )}
          />
          {/* Blob 2 */}
          <div
            className={clsx(
              'absolute top-[-20%] right-[-10%] w-56 h-56 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob pointer-events-none transition-all duration-500 group-hover:scale-125 group-hover:opacity-90',
              colors[1]
            )}
            style={{ animationDelay: '2s' }}
          />
          {/* Blob 3 */}
          <div
            className={clsx(
              'absolute bottom-[-30%] left-[20%] w-56 h-56 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob pointer-events-none transition-all duration-500 group-hover:scale-125 group-hover:opacity-90',
              colors[2]
            )}
            style={{ animationDelay: '4s' }}
          />
        </>
      )}

      {/* Grid overlay for technical grid aesthetic */}
      {showGrid && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-60" />
      )}

      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
