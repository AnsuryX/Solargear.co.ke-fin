
import React, { useState } from 'react';
import { motion as motionImport, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Zap, Shield, Sparkles, HelpCircle, Star, X } from 'lucide-react';

// Fix for framer-motion type mismatch in the current environment
const motion = motionImport as any;

const comparisonData = [
  {
    feature: "Ideal For",
    start: "Apartments & 2-Bed Townhouses",
    family: "3-4 Bed Family Homes",
    elite: "Large Villas & Smart Homes"
  },
  {
    feature: "Primary Goal",
    start: "Blackout Backup",
    family: "Bill Reduction + Backup",
    elite: "Energy Independence"
  },
  {
    feature: "Daily Consumption",
    start: "Up to 5 kWh/day",
    family: "5 - 15 kWh/day",
    elite: "20+ kWh/day"
  },
  {
    feature: "Heavy Appliances",
    start: "Lights, Wi-Fi, Fridge Only",
    family: "Microwave, Iron, Small Pump",
    elite: "Cooker, ACs, Borehole Pump"
  },
  {
    feature: "Expandability",
    start: "Limited",
    family: "High",
    elite: "Maximum"
  },
  {
    feature: "System Price",
    start: "KES 285,000",
    family: "KES 595,000",
    elite: "KES 1,450,000"
  }
];

export const PackageSelectionGuide: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState<'backup' | 'savings' | 'independence' | null>(null);

  const getRecommendation = () => {
    if (selectedGoal === 'backup') return { 
      name: "SolarStart™ Backup", 
      desc: "Since your main concern is blackouts, SolarStart provides the best value to keep your essentials running without the higher cost of massive panel arrays." 
    };
    if (selectedGoal === 'savings') return { 
      name: "SolarFamily™ Hybrid", 
      desc: "To slash your KPLC bills significantly while maintaining reliable backup, the 5kW Hybrid system is the engineering sweet spot for Nairobi homes." 
    };
    if (selectedGoal === 'independence') return { 
      name: "SolarElite™ Independence", 
      desc: "For total peace of mind and luxury living with zero reliance on the grid, the Elite package is the only choice for high-consumption villas." 
    };
    return null;
  };

  const recommendation = getRecommendation();

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-charcoal relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Which Package Fits Your Home?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choosing the right system depends on your specific lifestyle and energy goals. Use our comparison guide below to find your perfect match.
          </p>
        </div>

        {/* Interactive Goal Finder */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full"></div>
            
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <HelpCircle className="text-gold" /> Step 1: What is your primary goal?
              </h3>
              {selectedGoal && (
                <button 
                  onClick={() => setSelectedGoal(null)}
                  className="text-xs text-gray-500 hover:text-white flex items-center gap-1"
                >
                  <X size={14} /> Clear
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {[
                { id: 'backup', label: 'Stop Blackouts', icon: <Shield size={20} />, sub: 'Keep essentials on' },
                { id: 'savings', label: 'Save Money', icon: <Zap size={20} />, sub: 'Slash bills by 70%+' },
                { id: 'independence', label: 'Total Freedom', icon: <Sparkles size={20} />, sub: 'Off-grid independence' }
              ].map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id as any)}
                  className={`p-6 rounded-2xl border transition-all text-left flex flex-col gap-2 group ${
                    selectedGoal === goal.id 
                      ? 'bg-gold border-gold text-charcoal' 
                      : 'bg-white/5 border-white/10 text-white hover:border-gold/50'
                  }`}
                >
                  <div className={`${selectedGoal === goal.id ? 'text-charcoal' : 'text-gold'} group-hover:scale-110 transition-transform`}>
                    {goal.icon}
                  </div>
                  <div className="font-bold">{goal.label}</div>
                  <div className={`text-[10px] uppercase tracking-wider font-bold opacity-60`}>
                    {goal.sub}
                  </div>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {recommendation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-gold/10 border border-gold/30 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6"
                >
                  <div className="bg-gold text-charcoal p-3 rounded-xl">
                    <Star className="fill-charcoal" size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gold font-bold text-lg mb-1">We recommend: {recommendation.name}</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">{recommendation.desc}</p>
                  </div>
                  <button 
                    onClick={() => scrollToSection('packages')}
                    className="whitespace-nowrap bg-gold text-charcoal px-6 py-3 rounded-xl font-bold text-sm hover:bg-gold-light transition-colors flex items-center gap-2"
                  >
                    View Details <ArrowRight size={16} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto overflow-x-auto pb-8">
          <div className="min-w-[800px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="py-6 px-4 text-gray-500 text-xs font-bold uppercase tracking-widest border-b border-white/10">Package Metrics</th>
                  <th className="py-6 px-4 text-white text-lg font-bold border-b border-white/10">SolarStart™</th>
                  <th className="py-6 px-4 text-gold text-lg font-bold border-b border-gold/20 bg-gold/5 rounded-t-2xl relative">
                    SolarFamily™
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-charcoal text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-tighter">Recommended</span>
                  </th>
                  <th className="py-6 px-4 text-white text-lg font-bold border-b border-white/10">SolarElite™</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className="group hover:bg-white/5 transition-colors">
                    <td className="py-6 px-4 text-gray-400 font-medium border-b border-white/5">{row.feature}</td>
                    <td className="py-6 px-4 text-gray-300 text-sm border-b border-white/5">{row.start}</td>
                    <td className="py-6 px-4 text-white text-sm border-b border-gold/20 bg-gold/5 font-bold">{row.family}</td>
                    <td className="py-6 px-4 text-gray-300 text-sm border-b border-white/5">{row.elite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
                Not sure about your kWh usage? No problem. Our engineers measure this during the <span className="text-gold font-bold">Free Solar Readiness Assessment</span>.
            </p>
        </div>
      </div>
    </section>
  );
};
