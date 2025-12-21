import React from 'react';
import { Shield, XCircle, UserCheck } from 'lucide-react';

export const RiskReversal: React.FC = () => {
  return (
    <section className="py-20 bg-[#1A1A1A] border-t border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="border border-gold/30 rounded-3xl p-8 md:p-16 bg-gradient-to-br from-gold/5 to-transparent text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-gold/10 rounded-full blur-[80px] pointer-events-none"></div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">The Risk‑Free Guarantee (Zero Fear)</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light relative z-10">
            Solar is a long-term decision. You deserve transparency, not sales tricks. We take the risk — not you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 relative z-10">
            <div className="bg-charcoal/80 p-6 rounded-xl border border-white/5">
              <XCircle className="text-red-400 mx-auto mb-4" size={32} />
              <h3 className="text-white font-bold mb-2">No Pressure</h3>
              <p className="text-sm text-gray-400">No obligation. No hard feelings.</p>
            </div>

            <div className="bg-charcoal/80 p-6 rounded-xl border border-white/5">
              <Shield className="text-gold mx-auto mb-4" size={32} />
              <h3 className="text-white font-bold mb-2">No Loss</h3>
              <p className="text-sm text-gray-400">You do NOT pay today. You only reserve.</p>
            </div>

            <div className="bg-charcoal/80 p-6 rounded-xl border border-white/5">
              <UserCheck className="text-green-400 mx-auto mb-4" size={32} />
              <h3 className="text-white font-bold mb-2">You Decide</h3>
              <p className="text-sm text-gray-400">If you don't like the proposal → you walk away.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};