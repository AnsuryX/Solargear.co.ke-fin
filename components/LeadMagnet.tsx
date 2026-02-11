
import React, { useState } from 'react';
import { motion as motionImport, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle2, MessageCircle, AlertCircle, Globe, Camera, Zap } from 'lucide-react';
import { trackLeadSubmission, trackWhatsAppClick } from '../lib/analytics';

// Fix for framer-motion type mismatch in the current environment
const motion = motionImport as any;

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xrezgbrp';

export const LeadMagnet: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', location: '' });
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
        body: JSON.stringify({ ...formData, lead_type: 'Satellite Audit' }),
      });

      if (response.ok) {
        setStatus('success');
        trackLeadSubmission('form');
        setFormData({ name: '', phone: '', location: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="reserve" className="py-32 bg-[#050505] relative overflow-hidden">
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
                <span className="text-gold text-xs font-bold uppercase tracking-widest">Scalable Engineering</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Get Your <span className="text-gold">3D Satellite Solar Blueprint</span> 🛰️
              </h2>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-lg">
                Why wait for a technician? Our engineers use high-resolution satellite data to map your roof and design your system remotely. <span className="text-white font-bold">Fast. Free. 90% Accurate.</span>
              </p>
              
              <div className="grid grid-cols-1 gap-4 mb-8">
                {[
                  { icon: <Globe size={20} className="text-blue-400" />, label: "Satellite Roof Analysis", sub: "We find your home via GPS" },
                  { icon: <Camera size={20} className="text-green-400" />, label: "WhatsApp Photo Audit", sub: "Snap a pic of your KPLC bill & board" },
                  { icon: <Zap size={20} className="text-gold" />, label: "Full ROI Forecast", sub: "See your savings before you pay KES 1" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="shrink-0 mt-1">{item.icon}</div>
                    <div>
                      <span className="text-white font-bold block text-sm">{item.label}</span>
                      <span className="text-gray-500 text-xs">{item.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="md:w-1/2 w-full max-w-md">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-charcoal border border-white/10 p-10 rounded-3xl shadow-2xl backdrop-blur-sm"
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
                    <h3 className="text-white font-bold text-2xl mb-4">Satellite Scan Initiated!</h3>
                    <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                      We've located your area. To finish the design, please WhatsApp a photo of your **KPLC Bill** and **DB Board** to our engineers now.
                    </p>
                    <a 
                      href="https://wa.me/254722371250?text=Hi%20Solar%20Gear%2C%20I%20just%20requested%20a%20Satellite%20Audit.%20Here%20are%20the%20photos%20of%20my%20KPLC%20bill%20and%20DB%20board."
                      className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold w-full justify-center"
                    >
                      <MessageCircle size={20} /> SEND PHOTOS NOW
                    </a>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="text-center md:text-left mb-2">
                      <h3 className="text-xl font-bold text-white">Start Remote Audit</h3>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Free Satellite Mapping Service</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Full Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Your Name" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-gold outline-none transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">WhatsApp Number</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="07XX XXX XXX" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-gold outline-none transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Home Location (Area/County)</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Syokimau or Nakuru" 
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-gold outline-none transition-all"
                        />
                      </div>
                    </div>

                    <button 
                      disabled={status === 'loading'}
                      type="submit" 
                      className="bg-gold hover:bg-gold-light text-charcoal font-black text-sm py-5 rounded-xl transition-all shadow-xl shadow-gold/20 flex items-center justify-center gap-3 uppercase tracking-widest"
                    >
                      {status === 'loading' ? <Loader2 className="animate-spin" /> : "Request Satellite Blueprint"}
                    </button>
                    
                    <p className="text-[9px] text-center text-gray-600 font-bold uppercase tracking-widest">
                      Satellite processing takes ~2 minutes
                    </p>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
