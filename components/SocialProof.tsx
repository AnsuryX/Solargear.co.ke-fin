
import React from 'react';
import { Home, Zap, TrendingUp, Sun, MapPin } from 'lucide-react';

export const SocialProof: React.FC = () => {
  return (
    <section className="py-24 border-y border-white/5 bg-charcoal">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 uppercase tracking-wider">
            Preferred Home Solar Installers in Kenya
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From the bustling streets of Nairobi to the serene coast of Mombasa and the rural heartlands, we are the trusted choice for families who refuse to compromise on energy quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:border-gold/30 transition-colors">
            <div className="p-3 bg-gold/10 rounded-full text-gold shrink-0">
              <Home size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Urban & Rural Homeowners</h3>
              <p className="text-sm text-gray-400">Stopping high KPLC bills and unpredictable blackouts for families in any location.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:border-gold/30 transition-colors">
            <div className="p-3 bg-gold/10 rounded-full text-gold shrink-0">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Nationwide Backup</h3>
              <p className="text-sm text-gray-400">Keeping home offices and essential farm equipment running 24/7 without interruption.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:border-gold/30 transition-colors">
            <div className="p-3 bg-gold/10 rounded-full text-gold shrink-0">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Property Appreciation</h3>
              <p className="text-sm text-gray-400">Increasing resale value for homes from Lamu to Kisumu and everywhere in between.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:border-gold/30 transition-colors">
            <div className="p-3 bg-gold/10 rounded-full text-gold shrink-0">
              <Sun size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Clean Energy for All</h3>
              <p className="text-sm text-gray-400">Transitioning to clean, quiet energy that doesn't rely on noisy generators, no matter how remote.</p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
           <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest px-4 py-2 border border-white/10 rounded-full">
             <MapPin size={14} className="text-gold" /> Nairobi
           </div>
           <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest px-4 py-2 border border-white/10 rounded-full">
             <MapPin size={14} className="text-gold" /> Mombasa
           </div>
           <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest px-4 py-2 border border-white/10 rounded-full">
             <MapPin size={14} className="text-gold" /> Kisumu
           </div>
           <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest px-4 py-2 border border-white/10 rounded-full">
             <MapPin size={14} className="text-gold" /> Nakuru
           </div>
           <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest px-4 py-2 border border-white/10 rounded-full">
             <MapPin size={14} className="text-gold" /> Eldoret
           </div>
           <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest px-4 py-2 border border-white/10 rounded-full">
             <MapPin size={14} className="text-gold" /> Rural Regions
           </div>
        </div>
      </div>
    </section>
  );
};
