import { create } from 'zustand';
import type { StatusEvent, SystemMetrics } from './types';

const INITIAL_EVENTS: StatusEvent[] = [
  {
    id: 'evt-901',
    title: 'Scheduled Maintenance: Devin Worker Pool Scaling',
    type: 'maintenance',
    timestamp: '2026-08-18 08:00 UTC',
    description: 'Upgrading sandbox containers from 4-core to 8-core compute instances for faster PR builds.',
    affectedServices: ['Devin Engine', 'Automated PR Generator'],
  },
  {
    id: 'evt-899',
    title: 'ALL SYSTEMS OPERATIONAL',
    type: 'operational',
    timestamp: '2026-08-18 00:00 UTC',
    description: 'Core AI chat inference, ticketing pipeline, and Devin API integrations operating nominally.',
    affectedServices: ['All Core Modules'],
  },
  {
    id: 'evt-882',
    title: 'Minor Latency Spike in LLM Triage Gateway',
    type: 'degraded',
    timestamp: '2026-08-17 19:40 UTC',
    description: 'Upstream provider experienced minor queue delays. Fallback model engaged automatically.',
    affectedServices: ['AI Triage Chatbot'],
  },
];

const INITIAL_METRICS: SystemMetrics = {
  uptimePercent: 99.98,
  apiLatencyMs: 42,
  activeAgents: 14,
  errorRatePercent: 0.02,
};

export const useStatusStore = create<{
  events: StatusEvent[];
  metrics: SystemMetrics;
}>(() => ({
  events: INITIAL_EVENTS,
  metrics: INITIAL_METRICS,
}));
