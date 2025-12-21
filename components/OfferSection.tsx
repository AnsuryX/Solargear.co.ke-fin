import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Zap, Brain, Shield } from 'lucide-react';

export const OfferSection: React.FC = () => {
  const perks = [
    { icon: <Rocket size={32} />, title: "Special Early Pricing", desc: "Locked-in founding rates", color: "text-red-500", bg: "bg-red-500/10" },
    { icon: <Zap size={32} />, title: "Priority Installation", desc: "Skip the standard waitlist", color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { icon: <Brain size={32} />, title: "Solar Readiness Assessment", desc: "Professional Audit (Worth KES 5,000)", color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: <Shield size={32} />, title: "Extended Care", desc: "Bonus 2-year maintenance", color: "text-green-500", bg: "bg-green-500/10" },
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-[#111] to-charcoal relative">
      <div className="container mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel border-gold/20 rounded-[2.5rem] p-10 md:p-20 max-w-6xl mx-auto relative overflow-hidden mb-32"
        >
          <div className="absolute top-0 right-0 bg-gold text-charcoal text-[10px] font-bold px-6 py-2.5 rounded-bl-2xl uppercase tracking-[0.2em] shadow-lg">
            Founding Member Benefit
          </div>
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">Exclusive Founding Offer 🚀</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              We're building a community of energy-independent homeowners in Nairobi. Join the first group for high-value benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {perks.map((perk, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className={`w-20 h-20 mx-auto ${perk.bg} ${perk.color} rounded-[2rem] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  {perk.icon}
                </div>
                <h3 className="text-white font-bold text-xl mb-2 leading-tight">{perk.title}</h3>
                <p className="text-sm text-gray-500 font-medium">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <p className="text-gold animate-pulse text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full"></span>
              Remaining founding slots: 14
              <span className="w-2 h-2 bg-gold rounded-full"></span>
            </p>
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-20 uppercase tracking-[0.3em] opacity-50">Our 3-Step Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-0"></div>

            {[
              { step: "1", title: "Reserve Spot", desc: "Zero commitment. Fill the form to lock your founding price." },
              { step: "2", title: "Readiness Assessment", desc: "Worth KES 5,000. Our engineers visit to analyze roof, load & backup needs." },
              { step: "3", title: "You Decide", desc: "If the ROI doesn't make sense, walk away. No hard feelings." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 font-black text-3xl transition-all duration-500 ${i === 2 ? 'bg-gold text-charcoal shadow-2xl shadow-gold/30' : 'bg-charcoal border border-white/10 text-white/50'}`}>
                  {item.step}
                </div>
                <h3 className="text-white font-bold text-2xl mb-4 tracking-tight">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};