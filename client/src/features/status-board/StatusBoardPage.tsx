import React from 'react';
import { useStatusStore } from './useStatusStore';
import { Activity, CheckCircle2, AlertTriangle, Wrench, ShieldAlert } from 'lucide-react';
import { Badge } from '../../components/ui';
import clsx from 'clsx';

export const StatusBoardPage: React.FC = () => {
  const { events, metrics } = useStatusStore();

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'operational':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'degraded':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'maintenance':
        return <Wrench className="w-4 h-4 text-cyan-500" />;
      case 'outage':
        return <ShieldAlert className="w-4 h-4 text-rose-500" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-stone-900 dark:border-stone-400 pb-4">
        <Activity className="w-6 h-6 text-stone-900 dark:text-stone-100" />
        <div>
          <h1 className="text-sm font-bold uppercase tracking-widest">SYSTEM STATUS BOARD</h1>
          <span className="text-[10px] text-stone-500">LIVE PLATFORM HEALTH & RELEASE FEED</span>
        </div>
      </div>

      {/* KPI Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 border border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-900 flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500 dark:hover:border-emerald-400 hover:shadow-[3px_3px_0px_0px_rgba(16,185,129,0.3)]">
          <span className="text-[9px] text-stone-500 uppercase">PLATFORM UPTIME</span>
          <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
            {metrics.uptimePercent}%
          </span>
        </div>
        <div className="p-4 border border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-900 flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-500 dark:hover:border-teal-400 hover:shadow-[3px_3px_0px_0px_rgba(13,148,136,0.3)]">
          <span className="text-[9px] text-stone-500 uppercase">AVG API LATENCY</span>
          <span className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-2">
            {metrics.apiLatencyMs} ms
          </span>
        </div>
        <div className="p-4 border border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-900 flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-500 dark:hover:border-teal-400 hover:shadow-[3px_3px_0px_0px_rgba(13,148,136,0.3)]">
          <span className="text-[9px] text-stone-500 uppercase">ACTIVE DEVIN AGENTS</span>
          <span className="text-2xl font-bold text-teal-600 dark:text-teal-400 mt-2">
            {metrics.activeAgents}
          </span>
        </div>
        <div className="p-4 border border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-900 flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-500 dark:hover:border-teal-400 hover:shadow-[3px_3px_0px_0px_rgba(13,148,136,0.3)]">
          <span className="text-[9px] text-stone-500 uppercase">SYSTEM ERROR RATE</span>
          <span className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-2">
            {metrics.errorRatePercent}%
          </span>
        </div>
      </div>

      {/* Live Incident & Release Timeline Feed */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase text-stone-600 dark:text-stone-400 tracking-wider">
          INCIDENT & MAINTENANCE AUDIT LOG
        </h2>

        <div className="space-y-3">
          {events.map((evt) => (
            <div
              key={evt.id}
              className={clsx(
                'p-4 border border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-900 space-y-2 border-l-4 transition-all duration-200 hover:translate-x-1 hover:shadow-md',
                evt.type === 'operational' && 'border-l-emerald-500 hover:border-l-emerald-400',
                evt.type === 'degraded' && 'border-l-amber-500 hover:border-l-amber-400',
                evt.type === 'maintenance' && 'border-l-cyan-500 hover:border-l-cyan-400',
                evt.type === 'outage' && 'border-l-rose-500 hover:border-l-rose-400'
              )}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(evt.type)}
                  <h3 className="text-xs font-bold uppercase text-stone-900 dark:text-stone-100">{evt.title}</h3>
                </div>
                <span className="text-[10px] text-stone-500">{evt.timestamp}</span>
              </div>

              <p className="text-xs font-sans text-stone-600 dark:text-stone-300 pl-6 leading-relaxed">
                {evt.description}
              </p>

              <div className="flex flex-wrap gap-2 pl-6 pt-2">
                {evt.affectedServices.map((svc, i) => (
                  <Badge key={i} variant="neutral">
                    {svc}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
