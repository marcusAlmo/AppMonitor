import React from 'react';
import { MonitorX, ShieldAlert } from 'lucide-react';
import { AuroraCage } from '../ui';

export const MobileGuard: React.FC = () => {
  return (
    <div className="md:hidden fixed inset-0 z-50 bg-stone-950 text-stone-100 p-6 flex flex-col justify-between font-mono select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-500" />
          <span className="text-xs font-semibold uppercase tracking-widest">APPMONITOR // OPERATIONAL GATEKEEPER</span>
        </div>
        <span className="text-[9px] px-2 py-0.5 border border-rose-500/40 bg-rose-950/40 text-rose-400">
          BREAKPOINT RESTRICTED
        </span>
      </div>

      {/* Main Alert Card with Caged Aurora Shimmer */}
      <AuroraCage palette="danger" className="p-6 border border-stone-700 bg-stone-900 space-y-4 my-auto">
        <div className="w-12 h-12 border border-rose-500/40 bg-rose-950/50 flex items-center justify-center">
          <MonitorX className="w-6 h-6 text-rose-400" />
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            DESKTOP VIEWPORT REQUIRED
          </h2>
          <p className="text-xs font-sans text-stone-300 mt-2 leading-relaxed">
            AppMonitor Enterprise Operations Console requires a minimum viewport width of <strong>768px (Tablet / Desktop)</strong> to render complex AI triage streams, terminal stdout monitors, and data-dense analytics.
          </p>
        </div>

        <div className="p-3 bg-stone-950 border border-stone-800 text-[10px] text-stone-400 space-y-1">
          <div>MINIMUM DISPLAY: 1024 × 768 PX</div>
          <div>CURRENT VIEWPORT: MOUNTED MOBILE SCREEN</div>
          <div className="text-amber-400 font-semibold pt-1">
            &rarr; Please rotate your device or switch to a desktop browser.
          </div>
        </div>
      </AuroraCage>

      {/* Footer */}
      <div className="border-t border-stone-800 pt-4 flex justify-between items-center text-[9px] text-stone-500">
        <span>SECURITY LEVEL: HIGH</span>
        <span>SYS_GATE_MOBILE_403</span>
      </div>
    </div>
  );
};
