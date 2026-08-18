import { create } from 'zustand';
import type { ApiCostsState } from './types';

export const useApiCostsStore = create<ApiCostsState>(() => ({
  totalSpendMonth: 1428.50,
  totalTokensMonth: 48200000,
  avgCostPerTicket: 12.40,
  activeTenantsCount: 12,
  tenantCosts: [
    {
      tenantId: 't-acme-99',
      tenantName: 'Acme Corp',
      tokensUsed: 22400000,
      totalCostUsd: 672.00,
      devinRuns: 28,
      apiRequests: 14200,
      monthlyQuotaPercent: 78,
    },
    {
      tenantId: 't-globex-01',
      tenantName: 'Globex Inc',
      tokensUsed: 14100000,
      totalCostUsd: 423.00,
      devinRuns: 14,
      apiRequests: 9400,
      monthlyQuotaPercent: 52,
    },
    {
      tenantId: 't-stark-44',
      tenantName: 'Stark Industries',
      tokensUsed: 11700000,
      totalCostUsd: 333.50,
      devinRuns: 11,
      apiRequests: 8100,
      monthlyQuotaPercent: 41,
    },
  ],
}));
