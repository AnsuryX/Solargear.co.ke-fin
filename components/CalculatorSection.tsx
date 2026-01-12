
import React, { useState, useEffect } from 'react';
import { motion as motionImport } from 'framer-motion';
import { Calculator, Sun, Battery, Zap, ArrowRight } from 'lucide-react';

// Fix for framer-motion type mismatch in the current environment
const motion = motionImport as any;

export const CalculatorSection: React.FC = () => {
  const [bill, setBill] = useState<number>(15000);
  const [kwh, setKwh] = useState<number>(0);
  const [isKwhMode, setIsKwhMode] = useState(false);

  // Constants for Nairobi/Kenya
  const KPLC_RATE = 32; // Average KES per kWh including taxes/levies
  const PEAK_SUN_HOURS = 5.2; // Average for Nairobi
  const SYSTEM_EFFICIENCY = 0.8;
  const PANEL_WATTAGE = 550; // Standard High-Efficiency Mono-PERC

  useEffect(() => {
    if (!isKwhMode) {
      setKwh(Math.round(bill / KPLC_RATE / 30 * 10) / 10);
    }
  }, [bill, isKwhMode]);

  const systemSize = Math.ceil((kwh * 30 / 30) / PEAK_SUN_HOURS / SYSTEM_EFFICIENCY * 10) / 10;
  const panelsCount = Math.ceil((systemSize * 1000) / PANEL_WATTAGE);
  const batterySize = Math.ceil(kwh * 0.7 * 1.2 * 10) / 10; // 70% of daily use for night, plus 20% safety margin

  const scrollToReserve = () => {
    const section = document.getElementById('reserve');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="calculator" className="py-24 bg-[#111] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-4">
              <Calculator size={14} />
              System Sizer
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Estimate Your Solar Needs</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Use our calculator to get a rough idea of the system size you need to wipe out your KPLC bill. 
              Nairobi homeowners typically see full ROI in 3-5 years.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Input Side */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 md:p-10 rounded-3xl border-white/5 space-y-8"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Your Current Usage</h3>
                <button 
                  onClick={() => setIsKwhMode(!isKwhMode)}
                  className="text-xs text-gold hover:text-white transition-colors underline underline-offset-4"
                >
                  {isKwhMode ? "Use Monthly Bill (KES)" : "I know my daily kWh"}
                </button>
              </div>

              <div className="space-y-6">
                {!isKwhMode ? (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Avg. Monthly Bill</label>
                      <span className="text-gold font-bold">KES {bill.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" 
                      min="2000" 
                      max="100000" 
                      step="500"
                      value={bill}
                      onChange={(e) => setBill(parseInt(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                    />
                    <div className="flex justify-between text-[10px] text-gray-500 font-bold">
                      <span>KES 2k</span>
                      <span>KES 100k</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Daily Consumption (kWh)</label>
                      <span className="text-gold font-bold">{kwh} kWh</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      step="0.5"
                      value={kwh}
                      onChange={(e) => setKwh(parseFloat(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                    />
                    <div className="flex justify-between text-[10px] text-gray-500 font-bold">
                      <span>1 kWh</span>
                      <span>100 kWh</span>
                    </div>
                  </div>
                )}

                <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-sm text-gray-400">
                  <p className="flex items-start gap-2 italic">
                    <Zap size={16} className="text-gold shrink-0 mt-0.5" />
                    Estimated daily use: <span className="text-white font-bold ml-1">{kwh} kWh</span>. 
                    Based on current KPLC rates in Nairobi.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Results Side */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Result Card 1 */}
                <div className="bg-gradient-to-br from-white/10 to-transparent p-6 rounded-2xl border border-white/10">
                  <Sun className="text-gold mb-4" size={24} />
                  <p className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-1">System Size</p>
                  <h4 className="text-3xl font-black text-white">{systemSize} <span className="text-lg font-normal text-gray-500">kWp</span></h4>
                  <p className="text-xs text-gray-500 mt-2">Optimal for your roof</p>
                </div>

                {/* Result Card 2 */}
                <div className="bg-gradient-to-br from-white/10 to-transparent p-6 rounded-2xl border border-white/10">
                  <Zap className="text-blue-400 mb-4" size={24} />
                  <p className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-1">Panels Required</p>
                  <h4 className="text-3xl font-black text-white">{panelsCount} <span className="text-lg font-normal text-gray-500">Units</span></h4>
                  <p className="text-xs text-gray-500 mt-2">550W Tier-1 Mono-PERC</p>
                </div>

                {/* Result Card 3 */}
                <div className="bg-gradient-to-br from-white/10 to-transparent p-6 rounded-2xl border border-white/10">
                  <Battery className="text-green-400 mb-4" size={24} />
                  <p className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-1">Storage Needed</p>
                  <h4 className="text-3xl font-black text-white">{batterySize} <span className="text-lg font-normal text-gray-500">kWh</span></h4>
                  <p className="text-xs text-gray-500 mt-2">LiFePO4 Safe Battery Tech</p>
                </div>

                {/* Result Card 4 */}
                <div className="bg-gold p-6 rounded-2xl flex flex-col justify-center items-center text-center cursor-pointer hover:bg-gold-light transition-colors group" onClick={scrollToReserve}>
                  <p className="text-charcoal text-xs uppercase font-black tracking-widest mb-2">Get Exact Quote</p>
                  <ArrowRight className="text-charcoal group-hover:translate-x-2 transition-transform" size={28} />
                </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl border-gold/30 bg-gold/5">
                <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-gold rounded-full"></span>
                  The "Solar Gear" Advantage
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  These figures are estimates. Our <strong>Free Solar Readiness Assessment (Worth KES 5,000)</strong> involves a physical site visit to measure roof angle, shading from nearby trees, and precise load profiling.
                </p>
                <button 
                  onClick={scrollToReserve}
                  className="mt-4 text-gold text-sm font-bold flex items-center gap-2 hover:gap-4 transition-all"
                >
                  Book My Free Assessment Now <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
