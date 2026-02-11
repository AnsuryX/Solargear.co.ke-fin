import React from 'react';
import { Settings, ShieldCheck, Wrench, LifeBuoy } from 'lucide-react';

export const ProductSpotlight: React.FC = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#141414]">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-blue-900/10 blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">What You Get With Solar Gear</h2>
          <p className="text-gray-400">Real value. No cheap shortcuts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="glass-panel p-6 rounded-lg hover:border-gold/50 transition-colors duration-300 group">
            <div className="h-14 w-14 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
              <Settings className="text-blue-400" size={28} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Custom Solar System</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Not One-Size-Fits-All. We design your system based on your actual power usage, not guesswork.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-6 rounded-lg hover:border-gold/50 transition-colors duration-300 group">
             <div className="h-14 w-14 bg-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
              <ShieldCheck className="text-gold" size={28} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Quality Components Only</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tier-1 panels, reliable inverters. Built to last — not to fail after 6 months.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-6 rounded-lg hover:border-gold/50 transition-colors duration-300 group">
            <div className="h-14 w-14 bg-green-500/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors">
              <Wrench className="text-green-400" size={28} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Professional Installation</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Done by experienced technicians. Neat, safe, and fully compliant with regulations.
            </p>
          </div>

          {/* Card 4 */}
          <div className="glass-panel p-6 rounded-lg hover:border-gold/50 transition-colors duration-300 group">
            <div className="h-14 w-14 bg-purple-500/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
              <LifeBuoy className="text-purple-400" size={28} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Ongoing Support</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We don’t disappear after installation. You get guidance, check-ins, and support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};