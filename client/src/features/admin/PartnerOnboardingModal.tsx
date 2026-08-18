import React, { useState } from 'react';
import { Button } from '../../components/ui';
import { X, Building2 } from 'lucide-react';

export interface PartnerOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newPartner: { name: string; email: string; seats: number; quota: number }) => void;
}

export const PartnerOnboardingModal: React.FC<PartnerOnboardingModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    seats: 10,
    quota: 500,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-xs flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-lg border border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-900 shadow-2xl space-y-4">
        <header className="p-4 border-b border-stone-900 dark:border-stone-400 bg-stone-100 dark:bg-stone-950 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-teal-500" />
            <h2 className="text-xs font-bold uppercase">ONBOARD NEW TENANT PARTNER</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-stone-200 dark:hover:bg-stone-800 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex border-b border-stone-300 dark:border-stone-800 pb-2 text-[10px] text-stone-500 gap-4">
            <span className={step === 1 ? 'font-bold text-stone-900 dark:text-stone-100' : ''}>1. ORG DETAILS</span>
            <span className={step === 2 ? 'font-bold text-stone-900 dark:text-stone-100' : ''}>2. SEATS & BUDGET</span>
          </div>

          {step === 1 ? (
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase text-stone-600 dark:text-stone-400 mb-1">
                  PARTNER COMPANY NAME
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Cyberdyne Systems"
                  className="w-full p-2 bg-stone-100 dark:bg-stone-950 border border-stone-900 dark:border-stone-400 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-stone-600 dark:text-stone-400 mb-1">
                  ADMIN CONTACT EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@cyberdyne.io"
                  className="w-full p-2 bg-stone-100 dark:bg-stone-950 border border-stone-900 dark:border-stone-400 text-xs font-mono"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase text-stone-600 dark:text-stone-400 mb-1">
                  SEAT ALLOCATION
                </label>
                <input
                  type="number"
                  required
                  value={formData.seats}
                  onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
                  className="w-full p-2 bg-stone-100 dark:bg-stone-950 border border-stone-900 dark:border-stone-400 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-stone-600 dark:text-stone-400 mb-1">
                  MONTHLY LLM BUDGET ($ USD)
                </label>
                <input
                  type="number"
                  required
                  value={formData.quota}
                  onChange={(e) => setFormData({ ...formData, quota: parseInt(e.target.value) })}
                  className="w-full p-2 bg-stone-100 dark:bg-stone-950 border border-stone-900 dark:border-stone-400 text-xs font-mono"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-stone-300 dark:border-stone-800">
            {step === 2 ? (
              <Button type="button" variant="dashed" size="sm" onClick={() => setStep(1)}>
                &larr; BACK
              </Button>
            ) : (
              <span />
            )}

            {step === 1 ? (
              <Button type="button" variant="primary" size="sm" onClick={() => setStep(2)}>
                NEXT STEP &rarr;
              </Button>
            ) : (
              <Button type="submit" variant="primary" size="sm">
                PROVISION TENANT
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
