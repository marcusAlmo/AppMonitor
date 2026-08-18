import type { KBArticle } from './types';

export const MOCK_KB_ARTICLES: KBArticle[] = [
  {
    id: 'KB-104',
    title: 'Resolving React 19 Hydration & State Batching Mismatches',
    category: 'React 19 Hooks',
    description: 'Guidelines for non-blocking Zustand hydrators and async transitions.',
    readTime: '4 min read',
    lastUpdated: '2026-08-15',
    content: `
# React 19 Hydration Guide

When using **React 19** with Zustand or state hydrators, non-atomic updates during render will trigger UI flicker or state mismatches.

## Common Root Causes
1. Directly mutating global state arrays in render callbacks.
2. Using legacy \`useEffect\` logic to calculate derived values.

## Recommended Fix
Extract derived state into pure functions or \`useMemo\`:

\`\`\`tsx
// GOOD: Derived during render
const totalRequests = useMemo(() => logs.reduce((acc, l) => acc + l.count, 0), [logs]);
\`\`\`

## Devin Auto-Fix Trigger
If your issue matches this pattern, the AppMonitor AI Chatbot can automatically delegate to **Devin** to generate an atomic patch.
`,
  },
  {
    id: 'KB-201',
    title: 'Configuring Devin AI Sandbox Permissions & GitHub Webhooks',
    category: 'Devin Workflows',
    description: 'How to grant Devin read/write permissions for automated PR creation.',
    readTime: '6 min read',
    lastUpdated: '2026-08-10',
    content: `
# Devin AI GitHub Integration

AppMonitor integrates with Devin via secure scoped webhooks to automatically submit Pull Requests when technical issues are confirmed by the AI Triage phase.

## Requirements
- GitHub App installed with \`contents:write\` and \`pull_requests:write\`.
- Dedicated staging or \`develop\` branch.

## Status Flow
1. **Phase D**: Ticket transferred to Devin.
2. **Phase E**: Devin pushes branch \`devin/fix-*\` and opens PR.
3. **Phase F**: Continuous integration checks validated.
`,
  },
  {
    id: 'KB-305',
    title: 'Tenant API Rate Limiting & Token Consumption Caps',
    category: 'API & Auth',
    description: 'Understanding partner quotas, sliding window rate limits, and token budgets.',
    readTime: '3 min read',
    lastUpdated: '2026-08-01',
    content: `
# Rate Limits & API Quotas

AppMonitor enforces a 1,000 requests/minute sliding window limit per tenant.

## Headers Returned
- \`X-RateLimit-Limit\`: Maximum requests allowed per window.
- \`X-RateLimit-Remaining\`: Requests remaining in active window.
- \`X-RateLimit-Reset\`: UTC epoch timestamp when limit resets.
`,
  },
];
