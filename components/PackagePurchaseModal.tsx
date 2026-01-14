
import React, { useState } from 'react';
import { motion as motionImport, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, User, Phone, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { trackLeadSubmission, trackWhatsAppClick } from '../lib/analytics';

// Fix for framer-motion type mismatch in the current environment
const motion = motionImport as any;

interface PackagePurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xrezgbrp';

export const PackagePurchaseModal: React.FC<PackagePurchaseModalProps> = ({ isOpen, onClose, packageName }) => {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // 1. Send to Formspree for lead tracking
    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          package: packageName,
          source: 'Package Buy Button'
        }),
      });
    } catch (err) {
      console.error("Tracking failed, proceeding to WhatsApp anyway.");
    }

    // TRACKING: Lead form part of package purchase
    trackLeadSubmission('form', packageName);

    // 2. Set success state
    setStatus('success');

    // 3. Construct WhatsApp Message
    const message = encodeURIComponent(
      `Hi Solar Gear! I'm interested in the ${packageName}. My name is ${formData.name}. Let's discuss installation.`
    );
    const whatsappUrl = `https://wa.me/254722371250?text=${message}`;

    // 4. Redirect after a short delay to show success
    setTimeout(() => {
      trackWhatsAppClick('package_modal', packageName); // TRACKING: Final conversion to WhatsApp
      window.open(whatsappUrl, '_blank');
      onClose();
      setStatus('idle');
      setFormData({ name: '', phone: '' });
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-charcoal border border-white/10 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-10">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Details Recorded!</h3>
                <p className="text-gray-400 text-sm mb-6">Redirecting you to our engineering hub on WhatsApp...</p>
                <div className="loader"></div>
              </motion.div>
            ) : (
              <motion.div key="form" className="space-y-8">
                <div>
                  <div className="inline-block px-3 py-1 bg-gold/10 border border-gold/20 rounded-full text-gold text-[10px] font-black uppercase tracking-widest mb-4">
                    Direct Engineering Access
                  </div>
                  <h3 className="text-3xl font-black text-white leading-tight">
                    Secure Your <br/>
                    <span className="text-gold">{packageName}</span>
                  </h3>
                  <p className="text-gray-400 text-sm mt-4">
                    Leave your details to notify our team, then we'll chat on WhatsApp to finalize your site visit.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Your Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. David Maina"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-gold transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">WhatsApp Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input 
                        type="tel" 
                        required
                        placeholder="07XX XXX XXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-gold transition-all"
                      />
                    </div>
                  </div>

                  <button 
                    disabled={status === 'loading'}
                    className="w-full bg-[#25D366] hover:bg-[#1ebc57] text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#25D366]/10 group"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        CONFIRM & CHAT ON WHATSAPP
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                <p className="text-[10px] text-center text-gray-600 font-bold uppercase tracking-widest">
                  Secure 256-bit Encrypted Lead Portal
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
