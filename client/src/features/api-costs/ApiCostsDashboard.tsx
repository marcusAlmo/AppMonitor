import React from 'react';
import { useApiCostsStore } from './useApiCostsStore';
import type { TenantCostMetric } from './types';
import type { Column } from '../../components/ui';
import { DataTable } from '../../components/ui';
import { DollarSign, Cpu, Database, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_TREND_DATA = [
  { day: 'Aug 01', cost: 35 },
  { day: 'Aug 04', cost: 52 },
  { day: 'Aug 08', cost: 48 },
  { day: 'Aug 12', cost: 89 },
  { day: 'Aug 16', cost: 110 },
  { day: 'Aug 18', cost: 94 },
];

export const ApiCostsDashboard: React.FC = () => {
  const { totalSpendMonth, totalTokensMonth, avgCostPerTicket, activeTenantsCount, tenantCosts } =
    useApiCostsStore();

  const columns: Column<TenantCostMetric>[] = [
    { key: 'tenantName', header: 'TENANT NAME', render: (t) => <span className="font-bold">{t.tenantName}</span> },
    { key: 'tokensUsed', header: 'TOKENS CONSUMED', render: (t) => <span>{(t.tokensUsed / 1000000).toFixed(1)}M tokens</span> },
    { key: 'devinRuns', header: 'DEVIN RUNS', render: (t) => <span>{t.devinRuns} sessions</span> },
    { key: 'totalCostUsd', header: 'ACCUMULATED COST', render: (t) => <span className="font-bold text-teal-600 dark:text-teal-400">${t.totalCostUsd.toFixed(2)}</span> },
    {
      key: 'monthlyQuotaPercent',
      header: 'QUOTA USAGE',
      render: (t) => (
        <div className="flex items-center gap-2">
          <div className="w-20 h-2 bg-stone-200 dark:bg-stone-800 border border-stone-400">
            <div
              className={`h-full ${t.monthlyQuotaPercent > 75 ? 'bg-rose-500' : 'bg-teal-500'}`}
              style={{ width: `${t.monthlyQuotaPercent}%` }}
            />
          </div>
          <span className="text-[10px]">{t.monthlyQuotaPercent}%</span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 font-mono">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-stone-900 dark:border-stone-400 pb-4">
        <DollarSign className="w-6 h-6 text-stone-900 dark:text-stone-100" />
        <div>
          <h1 className="text-sm font-bold uppercase tracking-widest">AI API COST & CONSUMPTION ANALYTICS</h1>
          <span className="text-[10px] text-stone-500">TENANT LLM TOKEN BUDGETS & DEVIN AGENT METERING</span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 border border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-900 space-y-1 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-500 dark:hover:border-teal-400 hover:shadow-[3px_3px_0px_0px_rgba(13,148,136,0.3)]">
          <span className="text-[9px] text-stone-500 uppercase flex items-center gap-1">
            <DollarSign className="w-3 h-3 text-teal-500" /> TOTAL MONTHLY SPEND
          </span>
          <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">${totalSpendMonth.toFixed(2)}</div>
        </div>

        <div className="p-4 border border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-900 space-y-1 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500 dark:hover:border-violet-400 hover:shadow-[3px_3px_0px_0px_rgba(124,58,237,0.3)]">
          <span className="text-[9px] text-stone-500 uppercase flex items-center gap-1">
            <Database className="w-3 h-3 text-violet-500" /> TOTAL TOKENS PROCESSED
          </span>
          <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            {(totalTokensMonth / 1000000).toFixed(1)}M
          </div>
        </div>

        <div className="p-4 border border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-900 space-y-1 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-500 dark:hover:border-amber-400 hover:shadow-[3px_3px_0px_0px_rgba(217,119,6,0.3)]">
          <span className="text-[9px] text-stone-500 uppercase flex items-center gap-1">
            <Cpu className="w-3 h-3 text-amber-500" /> AVG COST / TICKET
          </span>
          <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">${avgCostPerTicket.toFixed(2)}</div>
        </div>

        <div className="p-4 border border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-900 space-y-1 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500 dark:hover:border-cyan-400 hover:shadow-[3px_3px_0px_0px_rgba(8,145,178,0.3)]">
          <span className="text-[9px] text-stone-500 uppercase flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-cyan-500" /> METERED TENANTS
          </span>
          <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">{activeTenantsCount}</div>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="p-4 border border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-900 space-y-3 transition-all duration-300 hover:border-teal-500 dark:hover:border-teal-400 hover:shadow-[4px_4px_0px_0px_rgba(13,148,136,0.25)]">
        <h2 className="text-xs font-bold uppercase text-stone-600 dark:text-stone-300">
          DAILY COST VELOCITY (USD)
        </h2>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_TREND_DATA}>
              <XAxis dataKey="day" stroke="#888888" fontSize={10} tickLine={false} />
              <YAxis stroke="#888888" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={{ background: '#1c1917', borderColor: '#44403c', fontSize: '11px', color: '#fff' }} />
              <Area type="monotone" dataKey="cost" stroke="#0d9488" fill="#0d948820" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Partner Breakdown Table */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase text-stone-600 dark:text-stone-300">
          TENANT CONSUMPTION BREAKDOWN
        </h2>
        <DataTable<TenantCostMetric>
          columns={columns}
          data={tenantCosts}
          keyExtractor={(t) => t.tenantId}
        />
      </div>
    </div>
  );
};
