import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle2, MessageCircle, AlertCircle, TrendingUp } from 'lucide-react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xrezgbrp';

export const LeadMagnet: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '' });
      } else {
        const errorData = await response.json();
        console.error("Formspree Error:", errorData);
        setStatus('error');
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
    }
  };

  return (
    <section id="reserve" className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-16 max-w-6xl mx-auto">
          
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-4 py-1 mb-6 border border-gold/40 rounded-full bg-gold/10 backdrop-blur-md">
                <span className="text-gold text-xs font-bold uppercase tracking-widest">Nairobi Early Access</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Claim Your <span className="text-gold">Solar Readiness Assessment</span> 🚀
              </h2>
              <div className="inline-flex items-center gap-3 bg-gold/20 text-gold px-5 py-2 rounded-lg font-bold text-lg md:text-xl mb-8 border border-gold/30">
                <TrendingUp size={20} />
                Worth KES 5,000 – Free for a Limited Time
              </div>
              
              <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-lg">
                Stop guessing. Get a professional engineer-led audit of your property and current bills. No strings attached.
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 shadow-inner">
                <h4 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold text-charcoal flex items-center justify-center text-sm font-black">?</div>
                  Assessment Outcomes:
                </h4>
                <ul className="space-y-4">
                  {[
                    { label: "Exact system size", sub: "Based on your actual consumption" },
                    { label: "Estimated cost", sub: "Complete hardware & labor breakdown" },
                    { label: "Backup coverage", sub: "Know exactly how long you stay powered" },
                    { label: "Clear next steps", sub: "A roadmap to energy independence" }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <CheckCircle2 className="text-gold shrink-0 mt-1" size={20} />
                      <div>
                        <span className="text-white font-bold block">{item.label}</span>
                        <span className="text-gray-500 text-sm">{item.sub}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          <div className="md:w-1/2 w-full max-w-md">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-charcoal border border-white/10 p-10 rounded-3xl shadow-[0_20px_50px_rgba(212,175,55,0.05)] backdrop-blur-sm"
            >
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-white font-bold text-3xl mb-4">Spot Reserved!</h3>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                      Your KES 5,000 Solar Readiness Assessment is now reserved. Our team will WhatsApp you within 24 hours to schedule the visit.
                    </p>
                    <button 
                      onClick={() => setStatus('idle')} 
                      className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all"
                    >
                      Assess another home
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" className="flex flex-col gap-8">
                    <div className="space-y-2 text-center md:text-left">
                      <h3 className="text-2xl font-bold text-white">Reserve My Slot Now</h3>
                      <p className="text-sm text-gray-500 font-medium italic">Save KES 5,000 Today.</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      <div className="flex flex-col gap-3">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                        <input 
                          type="text" 
                          name="name"
                          placeholder="Your Name" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-gold transition-all"
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-3">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">WhatsApp Number</label>
                        <input 
                          type="tel" 
                          name="phone"
                          placeholder="07XX XXX XXX" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-gold transition-all"
                          required
                        />
                      </div>

                      {status === 'error' && (
                        <div className="flex items-center gap-3 text-red-400 text-sm bg-red-400/5 p-4 rounded-xl border border-red-400/10">
                          <AlertCircle size={18} />
                          <span>Submission failed. Use WhatsApp instead.</span>
                        </div>
                      )}

                      <motion.button 
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        disabled={status === 'loading'}
                        type="submit" 
                        className="bg-gold hover:bg-gold-light text-charcoal font-black text-lg py-5 rounded-xl transition-all shadow-lg shadow-gold/20 flex items-center justify-center gap-3"
                      >
                        {status === 'loading' ? <Loader2 className="animate-spin" /> : <>Claim Free Assessment <Send size={20} /></>}
                      </motion.button>
                    </form>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                      <div className="relative flex justify-center text-xs uppercase"><span className="bg-charcoal px-4 text-gray-500 font-bold tracking-widest">or</span></div>
                    </div>

                    <a 
                      href="https://wa.me/254722371250?text=Hi%2C%20I'm%20interested%20in%20the%20Free%20Solar%20Readiness%20Assessment%20worth%20KES%205000."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] hover:bg-[#1ebc57] text-white font-bold text-lg py-5 rounded-xl transition-all flex items-center justify-center gap-3"
                    >
                      <MessageCircle size={22} />
                      WhatsApp Our Engineer
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};