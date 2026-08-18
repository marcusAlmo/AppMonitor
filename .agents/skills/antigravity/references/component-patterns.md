# Component Patterns & Architecture

## Folder structure (feature-based, not type-based)

Prefer grouping by feature/domain over grouping by file type. Type-based
folders (`/components`, `/hooks`, `/utils` at the root, all mixed together)
scale badly past a handful of features.

```
src/
├── app/                    # app shell: providers, router, layout
├── features/
│   └── invoicing/
│       ├── components/     # feature-scoped components
│       │   ├── InvoiceTable/
│       │   │   ├── InvoiceTable.tsx
│       │   │   ├── InvoiceTable.test.tsx
│       │   │   └── index.ts
│       ├── hooks/
│       │   └── useInvoices.ts
│       ├── api/            # API calls / react-query hooks for this feature
│       ├── types.ts
│       ├── constants.ts
│       └── index.ts        # public surface of the feature
├── components/              # truly shared/reused across features (Button, Modal, etc.)
├── hooks/                   # truly shared hooks (useDebounce, useMediaQuery)
├── lib/                     # framework-agnostic utilities, api client setup
├── constants/                # routes, breakpoints, config
├── types/                    # global/shared types
└── styles/
```

A feature's internals should not be imported directly by other features —
import from the feature's `index.ts` public surface. This keeps refactors
contained.

## Component file anatomy

Order within a component file, top to bottom:

1. Imports (external → internal → relative → styles)
2. Types/interfaces for this component
3. Constants local to this component (if not worth a separate file)
4. The component itself
5. Helper functions used only by this component (or extract to a hook/util
   if they're pure logic worth testing independently)

```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';
import { useInvoices } from '@/features/invoicing/hooks/useInvoices';
import type { Invoice } from '@/features/invoicing/types';

interface InvoiceTableProps {
  status: Invoice['status'];
  onRowSelect?: (invoice: Invoice) => void;
}

export function InvoiceTable({ status, onRowSelect }: InvoiceTableProps) {
  const { data: invoices, isLoading, error } = useInvoices({ status });

  if (isLoading) return <InvoiceTableSkeleton />;
  if (error) return <ErrorState message="Couldn't load invoices." />;
  if (!invoices?.length) return <EmptyState message="No invoices yet." />;

  return (
    <table>
      {invoices.map((invoice) => (
        <InvoiceRow key={invoice.id} invoice={invoice} onSelect={onRowSelect} />
      ))}
    </table>
  );
}
```

## Composition over configuration

When a component starts accepting many boolean/variant props to control its
rendering (`showHeader`, `showFooter`, `variant`, `size`, `hideIcon`...),
prefer composition:

```tsx
// Avoid: prop explosion
<Card showHeader showFooter headerTitle="..." footerActions={[...]} />

// Prefer: composition
<Card>
  <Card.Header>...</Card.Header>
  <Card.Body>...</Card.Body>
  <Card.Footer>...</Card.Footer>
</Card>
```

Use this pattern (compound components) for anything with a fixed visual
"shell" but variable content: cards, modals, tabs, accordions, form groups.

## Container/Presentational split (still useful, applied loosely)

Don't force a strict split everywhere, but for any component doing real data
fetching + non-trivial rendering, separate:
- **Data logic** → a hook (`useInvoices`, `useContactForm`)
- **Presentation** → a component that receives data/handlers as props and has
  no fetching logic of its own

This is what makes the presentational piece trivially testable and reusable
(e.g., reusable in Storybook, or swappable data sources later).

## Render props / children-as-function

Use sparingly — mostly superseded by hooks — but still correct for cases
where a component needs to hand back internal state to fully custom markup:

```tsx
<Tooltip content="Delete">
  {(triggerProps) => <IconButton {...triggerProps} icon={<TrashIcon />} />}
</Tooltip>
```

## Barrel files (`index.ts`)

Only re-export from a folder's `index.ts` if the project already does this.
Barrel files can hurt tree-shaking and cause circular-import footguns in
large apps — don't introduce the pattern unprompted into a codebase that
doesn't already use it.

## Error boundaries

Wrap route-level or feature-level subtrees in an `ErrorBoundary`, not the
whole app in one giant boundary. A crash in the invoicing table shouldn't
take down global navigation.

```tsx
<ErrorBoundary fallback={<FeatureErrorFallback />}>
  <InvoicingDashboard />
</ErrorBoundary>
```
