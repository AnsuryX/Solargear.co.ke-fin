
import React from 'react';
import { motion as motionImport } from 'framer-motion';
import { Rocket, Zap, Brain, Shield, Lock, CheckCircle, Timer, Globe } from 'lucide-react';

// Fix for framer-motion type mismatch in the current environment
const motion = motionImport as any;

export const OfferSection: React.FC = () => {
  const perks = [
    { 
      icon: <Rocket size={32} />, 
      title: "Founding Pricing", 
      desc: "Locked-in rates before 2024 tariff hikes", 
      color: "text-red-500", 
      bg: "bg-red-500/10" 
    },
    { 
      icon: <Zap size={32} />, 
      title: "7-Day Install", 
      desc: "Priority engineering for first-movers", 
      color: "text-yellow-500", 
      bg: "bg-yellow-500/10" 
    },
    { 
      icon: <Brain size={32} />, 
      title: "Remote Audit", 
      desc: "Satellite-based roof & power audit", 
      color: "text-blue-500", 
      bg: "bg-blue-500/10" 
    },
    { 
      icon: <Shield size={32} />, 
      title: "Platinum Care", 
      desc: "2-year onsite maintenance bonus", 
      color: "text-green-500", 
      bg: "bg-green-500/10" 
    },
  ];

  return (
    <section id="how-it-works" className="py-32 bg-gradient-to-b from-[#111] to-charcoal relative">
      <div className="container mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel border-gold/20 rounded-[2.5rem] p-10 md:p-20 max-w-6xl mx-auto relative overflow-hidden mb-32"
        >
          {/* Urgency Badge */}
          <div className="absolute top-0 right-0 bg-gold text-charcoal text-[10px] font-black px-6 py-3 rounded-bl-2xl uppercase tracking-[0.2em] shadow-lg flex items-center gap-2">
            <Timer size={14} /> Only 14 Slots Left
          </div>
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-gold text-xs font-black uppercase tracking-widest mb-4">
              <Lock size={14} /> Price Protection Guarantee
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">The Founding Member Offer 🚀</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
              We aren't just selling panels. We're building <span className="text-white font-bold">Kenya's most reliable energy circle.</span> Join the first 50 families for these exclusive engineering bonuses.
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
                <div className={`w-20 h-20 mx-auto ${perk.bg} ${perk.color} rounded-[2rem] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl`}>
                  {perk.icon}
                </div>
                <h3 className="text-white font-bold text-xl mb-2 leading-tight">{perk.title}</h3>
                <p className="text-sm text-gray-500 font-medium px-4">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
          
          {/* ROI Proof Line */}
          <div className="mt-20 pt-10 border-t border-white/5 text-center">
            <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest">
                <CheckCircle size={14} className="text-gold" /> Payback in 48 Months
              </div>
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest">
                <CheckCircle size={14} className="text-gold" /> KPLC Price Protection
              </div>
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest">
                <CheckCircle size={14} className="text-gold" /> 25-Year Panel Warranty
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white uppercase tracking-[0.3em] opacity-50 mb-4">The Scalable Blueprint</h2>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Remote First • Site Verified • Expert Built</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-0"></div>

            {[
              { 
                step: "1", 
                title: "Remote 3D Audit", 
                desc: "Send us your location and photos. Our engineers use satellite data to map your roof and ROI (FREE)." 
              },
              { 
                step: "2", 
                title: "Digital Proposal", 
                desc: "Receive a 90% accurate custom quote via WhatsApp. No time wasted on unnecessary site visits." 
              },
              { 
                step: "3", 
                title: "Switch On", 
                desc: "Final validation & install. Most systems are live in 48 hours. Start living blackout-free." 
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 font-black text-3xl transition-all duration-500 ${i === 2 ? 'bg-gold text-charcoal shadow-2xl shadow-gold/30 ring-8 ring-gold/10' : 'bg-charcoal border border-white/10 text-white/50'}`}>
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
