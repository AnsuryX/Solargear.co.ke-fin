
import React from 'react';
import { Home, Zap, TrendingUp, Sun, MapPin } from 'lucide-react';

export const SocialProof: React.FC = () => {
  return (
    <section className="py-24 border-y border-white/5 bg-charcoal">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 uppercase tracking-wider">
            Preferred Home Solar Installers in Nairobi
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From Karen to Runda, we are the trusted choice for families who refuse to compromise on energy quality. We specialize exclusively in high-end residential installations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:border-gold/30 transition-colors">
            <div className="p-3 bg-gold/10 rounded-full text-gold shrink-0">
              <Home size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Suburban Homeowners</h3>
              <p className="text-sm text-gray-400">Stopping high KPLC bills and unpredictable blackouts for families across the city.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:border-gold/30 transition-colors">
            <div className="p-3 bg-gold/10 rounded-full text-gold shrink-0">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Reliable Backup</h3>
              <p className="text-sm text-gray-400">Keeping home offices and medical equipment running 24/7 without interruption.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:border-gold/30 transition-colors">
            <div className="p-3 bg-gold/10 rounded-full text-gold shrink-0">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Property Appreciation</h3>
              <p className="text-sm text-gray-400">Increasing resale value for homes in Lavington, Westlands, and Syokimau.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:border-gold/30 transition-colors">
            <div className="p-3 bg-gold/10 rounded-full text-gold shrink-0">
              <Sun size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">100% Green Families</h3>
              <p className="text-sm text-gray-400">Transitioning to clean, quiet energy that doesn't rely on noisy generators.</p>
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
