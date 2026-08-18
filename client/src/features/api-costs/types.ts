export interface TenantCostMetric {
  tenantId: string;
  tenantName: string;
  tokensUsed: number;
  totalCostUsd: number;
  devinRuns: number;
  apiRequests: number;
  monthlyQuotaPercent: number;
}

export interface ApiCostsState {
  totalSpendMonth: number;
  totalTokensMonth: number;
  avgCostPerTicket: number;
  activeTenantsCount: number;
  tenantCosts: TenantCostMetric[];
}
