import React, { useState } from 'react';
import { PartnerOnboardingModal } from './PartnerOnboardingModal';
import type { Column } from '../../components/ui';
import { DataTable, Badge, Button } from '../../components/ui';
import { Users, UserPlus } from 'lucide-react';

interface PartnerTenant {
  id: string;
  name: string;
  adminEmail: string;
  seats: number;
  monthlyQuota: number;
  status: 'active' | 'suspended';
  createdAt: string;
}

const INITIAL_PARTNERS: PartnerTenant[] = [
  {
    id: 't-acme-99',
    name: 'Acme Corp',
    adminEmail: 'marcus@acme-inc.io',
    seats: 25,
    monthlyQuota: 1000,
    status: 'active',
    createdAt: '2026-01-15',
  },
  {
    id: 't-globex-01',
    name: 'Globex Inc',
    adminEmail: 'homer@globex.com',
    seats: 15,
    monthlyQuota: 500,
    status: 'active',
    createdAt: '2026-03-01',
  },
  {
    id: 't-stark-44',
    name: 'Stark Industries',
    adminEmail: 'pepper@stark.io',
    seats: 50,
    monthlyQuota: 2500,
    status: 'active',
    createdAt: '2026-05-10',
  },
];

export const PartnerListPage: React.FC = () => {
  const [partners, setPartners] = useState<PartnerTenant[]>(INITIAL_PARTNERS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPartner = (newP: { name: string; email: string; seats: number; quota: number }) => {
    const tenant: PartnerTenant = {
      id: `t-${newP.name.toLowerCase().replace(/[^a-z0-9]/g, '')}-${Math.floor(10 + Math.random() * 89)}`,
      name: newP.name,
      adminEmail: newP.email,
      seats: newP.seats,
      monthlyQuota: newP.quota,
      status: 'active',
      createdAt: new Date().toISOString().substring(0, 10),
    };
    setPartners([tenant, ...partners]);
  };

  const columns: Column<PartnerTenant>[] = [
    { key: 'id', header: 'TENANT ID', render: (p) => <span className="font-bold">{p.id}</span> },
    { key: 'name', header: 'COMPANY NAME', render: (p) => <span className="font-sans font-bold">{p.name}</span> },
    { key: 'adminEmail', header: 'ADMIN CONTACT' },
    { key: 'seats', header: 'SEATS', render: (p) => <span>{p.seats} seats</span> },
    { key: 'monthlyQuota', header: 'BUDGET', render: (p) => <span>${p.monthlyQuota}/mo</span> },
    {
      key: 'status',
      header: 'STATUS',
      render: (p) => <Badge variant={p.status === 'active' ? 'merged' : 'critical'}>{p.status}</Badge>,
    },
  ];

  return (
    <div className="space-y-6 font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-900 dark:border-stone-400 pb-4">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-stone-900 dark:text-stone-100" />
          <div>
            <h1 className="text-sm font-bold uppercase tracking-widest">PARTNER & TENANT MANAGEMENT</h1>
            <span className="text-[10px] text-stone-500">PROVISION & CONFIGURE B2B CLIENT ORGANIZATIONS</span>
          </div>
        </div>

        <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)} className="gap-1.5 text-[10px]">
          <UserPlus className="w-3.5 h-3.5" />
          ONBOARD NEW PARTNER
        </Button>
      </div>

      <DataTable<PartnerTenant>
        columns={columns}
        data={partners}
        keyExtractor={(p) => p.id}
      />

      <PartnerOnboardingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAddPartner}
      />
    </div>
  );
};
