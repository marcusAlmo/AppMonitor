import React from 'react';
import clsx from 'clsx';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  isLoading = false,
  emptyMessage = 'No records found.',
  className,
}: DataTableProps<T>) {
  return (
    <div className={clsx('w-full border border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-950 overflow-x-auto', className)}>
      <table className="w-full text-left border-collapse font-sans text-xs">
        <thead>
          <tr className="border-b border-stone-900 dark:border-stone-400 bg-stone-100 dark:bg-stone-900 font-mono uppercase text-[10px] text-stone-600 dark:text-stone-400 tracking-wider">
            {columns.map((col) => (
              <th key={col.key} className={clsx('p-3 font-semibold border-r border-stone-300 dark:border-stone-800 last:border-r-0', col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="p-8 text-center font-mono text-stone-500">
                <span className="inline-flex items-center gap-2">
                  <span className="w-3 h-3 border-2 border-stone-900 dark:border-stone-100 border-t-transparent animate-spin rounded-full" />
                  LOADING DATA...
                </span>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-8 text-center font-mono text-stone-500 dark:text-stone-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={keyExtractor(item)}
                onClick={() => onRowClick?.(item)}
                className={clsx(
                  'transition-colors duration-150',
                  onRowClick
                    ? 'cursor-pointer hover:bg-stone-200/50 dark:hover:bg-stone-900/60'
                    : 'hover:bg-stone-100/50 dark:hover:bg-stone-900/30'
                )}
              >
                {columns.map((col) => (
                  <td key={col.key} className={clsx('p-3 border-r border-stone-200 dark:border-stone-800 last:border-r-0 font-mono text-stone-800 dark:text-stone-200', col.className)}>
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
