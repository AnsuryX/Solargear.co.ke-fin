
import React, { useState, useEffect } from 'react';
import { motion as motionImport } from 'framer-motion';
import { Calculator, Sun, Battery, Zap, ArrowRight, Lock, ShieldCheck, Mail, User, Phone } from 'lucide-react';

// Fix for framer-motion type mismatch in the current environment
const motion = motionImport as any;

export const CalculatorSection: React.FC = () => {
  const [bill, setBill] = useState<number>(15000);
  const [kwh, setKwh] = useState<number>(0);
  const [isKwhMode, setIsKwhMode] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', whatsapp: '' });

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

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadData.name || !leadData.whatsapp) return;
    
    setIsSubmitting(true);
    
    try {
      // Submit lead to Formspree
      await fetch('https://formspree.io/f/xrezgbrp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadData,
          bill,
          estimatedKwh: kwh,
          systemSize,
          subject: `CALCULATOR LEAD: ${leadData.name}`,
          source: 'Solar Sizer Gate'
        }),
      });
      
      setIsUnlocked(true);
    } catch (error) {
      console.error('Lead submission failed:', error);
      // Still unlock for UX sake if submission fails? Or show error? 
      // Let's unlock anyway to avoid frustrating the user.
      setIsUnlocked(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToReserve = () => {
    const section = document.getElementById('reserve');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="calculator" className="py-24 bg-gray-100 dark:bg-[#0A0A0A] relative overflow-hidden transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-4">
              <Calculator size={14} />
              System Sizer
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-charcoal dark:text-white mb-6">Estimate Your Solar Needs</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
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
              className="glass-panel p-8 md:p-10 rounded-3xl border-black/5 dark:border-white/5 bg-white dark:bg-white/5 shadow-xl dark:shadow-none space-y-8"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-charcoal dark:text-white">Your Current Usage</h3>
                <button 
                  onClick={() => setIsKwhMode(!isKwhMode)}
                  className="text-xs text-gold hover:text-gold-dark transition-colors underline underline-offset-4"
                >
                  {isKwhMode ? "Use Monthly Bill (KES)" : "I know my daily kWh"}
                </button>
              </div>

              <div className="space-y-6">
                {!isKwhMode ? (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Avg. Monthly Bill</label>
                      <span className="text-gold font-bold">KES {bill.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" 
                      min="2000" 
                      max="100000" 
                      step="500"
                      value={bill}
                      onChange={(e) => setBill(parseInt(e.target.value))}
                      className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-500 font-bold">
                      <span>KES 2k</span>
                      <span>KES 100k</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Daily Consumption (kWh)</label>
                      <span className="text-gold font-bold">{kwh} kWh</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      step="0.5"
                      value={kwh}
                      onChange={(e) => setKwh(parseFloat(e.target.value))}
                      className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-500 font-bold">
                      <span>1 kWh</span>
                      <span>100 kWh</span>
                    </div>
                  </div>
                )}

                <div className="p-4 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5 text-sm text-gray-600 dark:text-gray-400">
                  <p className="flex items-start gap-2 italic">
                    <Zap size={16} className="text-gold shrink-0 mt-0.5" />
                    Estimated daily use: <span className="text-charcoal dark:text-white font-bold ml-1">{kwh} kWh</span>. 
                    Based on current KPLC rates in Nairobi.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Results Side */}
            <div className="relative">
              {!isUnlocked && (
                <div className="absolute inset-0 z-20 backdrop-blur-md bg-white/30 dark:bg-black/30 rounded-3xl flex items-center justify-center p-6 border border-white/20">
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-sm w-full bg-charcoal p-8 rounded-2xl shadow-2xl border border-gold/30 text-center"
                  >
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
                      <Lock size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Unlock Your Estimation</h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                      Enter your details to receive your <span className="text-gold font-bold">Digital Solar ROI Blueprint</span> and see your recommended system size.
                    </p>
                    
                    <form onSubmit={handleUnlock} className="space-y-4 text-left">
                      <div>
                        <label className="block text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1.5 ml-1">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                          <input 
                            required
                            type="text" 
                            placeholder="e.g. John Kamau"
                            value={leadData.name}
                            onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-gold outline-none transition-all placeholder:text-gray-600"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1.5 ml-1">WhatsApp Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                          <input 
                            required
                            type="tel" 
                            placeholder="e.g. 0712 345 678"
                            value={leadData.whatsapp}
                            onChange={(e) => setLeadData({ ...leadData, whatsapp: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-gold outline-none transition-all placeholder:text-gray-600"
                          />
                        </div>
                      </div>

                      <button 
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-gold text-charcoal font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gold-light transition-all active:scale-95 disabled:opacity-50"
                      >
                        {isSubmitting ? 'GENERATING...' : 'SHOW MY RESULTS'}
                        {!isSubmitting && <ArrowRight size={18} />}
                      </button>
                      
                      <p className="text-[10px] text-center text-gray-500 flex items-center justify-center gap-1">
                        <ShieldCheck size={12} /> Privacy Guaranteed. No spam.
                      </p>
                    </form>
                  </motion.div>
                </div>
              )}

              <motion.div 
                initial={false}
                animate={isUnlocked ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0.5, filter: 'blur(2px)' }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Result Card 1 */}
                  <div className="bg-charcoal dark:bg-gradient-to-br dark:from-white/5 dark:to-transparent p-6 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Sun size={60} />
                    </div>
                    <Sun className="text-gold mb-4" size={24} />
                    <p className="text-gray-400 dark:text-gray-400 text-xs uppercase font-bold tracking-widest mb-1">Recommended Size</p>
                    <h4 className="text-3xl font-black text-white">{systemSize} <span className="text-lg font-normal text-gray-500">kWp</span></h4>
                    <p className="text-xs text-gray-400 mt-2 italic font-medium">Engineered for 100% Offset</p>
                  </div>

                  {/* Result Card 2 */}
                  <div className="bg-charcoal dark:bg-gradient-to-br dark:from-white/5 dark:to-transparent p-6 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-blue-400">
                      <Zap size={60} />
                    </div>
                    <Zap className="text-blue-400 mb-4" size={24} />
                    <p className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-1">Module Count</p>
                    <h4 className="text-3xl font-black text-white">{panelsCount} <span className="text-lg font-normal text-gray-500">Panels</span></h4>
                    <p className="text-xs text-gray-400 mt-2 font-medium">550W Bifacial Tier-1</p>
                  </div>

                  {/* Result Card 3 */}
                  <div className="bg-charcoal dark:bg-gradient-to-br dark:from-white/5 dark:to-transparent p-6 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-green-400">
                      <Battery size={60} />
                    </div>
                    <Battery className="text-green-400 mb-4" size={24} />
                    <p className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-1">Energy Storage</p>
                    <h4 className="text-3xl font-black text-white">{batterySize} <span className="text-lg font-normal text-gray-500">kWh</span></h4>
                    <p className="text-xs text-gray-400 mt-2 font-medium">LiFePO4 6,000+ Cycles</p>
                  </div>

                  {/* Result Card 4 */}
                  <div className="bg-gold p-6 rounded-2xl flex flex-col justify-center items-center text-center cursor-pointer hover:bg-gold-light transition-colors group shadow-xl active:scale-95" onClick={scrollToReserve}>
                    <p className="text-charcoal text-[10px] uppercase font-black tracking-[0.2em] mb-2">Final Step</p>
                    <h4 className="text-charcoal font-black mb-2">Get Exact ROI</h4>
                    <ArrowRight className="text-charcoal group-hover:translate-x-2 transition-transform" size={28} />
                  </div>
                </div>

                <div className="bg-white/5 border border-gold/30 dark:bg-gold/5 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 opacity-10">
                    <ShieldCheck size={100} className="text-gold" />
                  </div>
                  <h4 className="text-charcoal dark:text-white font-bold mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gold rounded-full"></span>
                    Professional Engineering Audit
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed relative z-10">
                    This is a digital estimate. To guarantee your savings, we recommend our <strong className="text-gold">Free Solar Readiness Assessment (Worth KES 5,000)</strong>. We'll map your roof's azimuth and specific appliance load.
                  </p>
                  <button 
                    onClick={scrollToReserve}
                    className="mt-4 text-gold text-sm font-bold flex items-center gap-2 hover:gap-4 transition-all group"
                  >
                    Confirm My Free Audit <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
