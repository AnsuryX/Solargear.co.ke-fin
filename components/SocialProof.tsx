
import React from 'react';
import { Home, Briefcase, TrendingUp, Sun, MapPin } from 'lucide-react';

export const SocialProof: React.FC = () => {
  return (
    <section className="py-24 border-y border-white/5 bg-charcoal">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 uppercase tracking-wider">
            Preferred Solar Installers in Kenya
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From Karen to Runda, we are the trusted choice for reliable solar backup in Nairobi. We serve clients who value long-term performance over cheap shortcuts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:border-gold/30 transition-colors">
            <div className="p-3 bg-gold/10 rounded-full text-gold shrink-0">
              <Home size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Nairobi Homeowners</h3>
              <p className="text-sm text-gray-400">Tired of high electricity bills and unreliable KPLC connections in the city.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:border-gold/30 transition-colors">
            <div className="p-3 bg-gold/10 rounded-full text-gold shrink-0">
              <Briefcase size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Kenya Small Businesses</h3>
              <p className="text-sm text-gray-400">Who need uninterruptible solar backup to keep operations running during blackouts.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:border-gold/30 transition-colors">
            <div className="p-3 bg-gold/10 rounded-full text-gold shrink-0">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Smart Nairobi Investors</h3>
              <p className="text-sm text-gray-400">Homeowners in Westlands, Lavington, and Syokimau increasing their property value.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:border-gold/30 transition-colors">
            <div className="p-3 bg-gold/10 rounded-full text-gold shrink-0">
              <Sun size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Energy Independence Kenya</h3>
              <p className="text-sm text-gray-400">Anyone looking for the best solar installers in Kenya for off-grid and hybrid setups.</p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
           <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest px-4 py-2 border border-white/10 rounded-full">
             <MapPin size={14} className="text-gold" /> Westlands
           </div>
           <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest px-4 py-2 border border-white/10 rounded-full">
             <MapPin size={14} className="text-gold" /> Karen
           </div>
           <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest px-4 py-2 border border-white/10 rounded-full">
             <MapPin size={14} className="text-gold" /> Runda
           </div>
           <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest px-4 py-2 border border-white/10 rounded-full">
             <MapPin size={14} className="text-gold" /> Kilimani
           </div>
           <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest px-4 py-2 border border-white/10 rounded-full">
             <MapPin size={14} className="text-gold" /> Syokimau
           </div>
        </div>
      </div>
    </section>
  );
};
