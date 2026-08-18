export type SystemStatusState = 'operational' | 'degraded' | 'maintenance' | 'outage';

export interface StatusEvent {
  id: string;
  title: string;
  type: SystemStatusState;
  timestamp: string;
  description: string;
  affectedServices: string[];
}

export interface SystemMetrics {
  uptimePercent: number;
  apiLatencyMs: number;
  activeAgents: number;
  errorRatePercent: number;
}
