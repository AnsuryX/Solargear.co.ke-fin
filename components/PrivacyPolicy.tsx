
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, ChevronLeft, Lock, Eye, FileText, Scale } from 'lucide-react';
import { Logo } from './Logo';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-charcoal pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gold font-bold text-sm uppercase tracking-widest mb-12 hover:gap-4 transition-all"
        >
          <ChevronLeft size={18} /> Back to Home
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 md:p-16 rounded-[2.5rem] border-white/5"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-gold/10 rounded-2xl text-gold">
              <Shield size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white">Privacy Policy</h1>
              <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px] mt-1">Last Updated: May 2025</p>
            </div>
          </div>

          <div className="space-y-12 text-gray-400 leading-relaxed">
            <section>
              <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-3">
                <Lock size={20} className="text-gold" /> 1. Commitment to Data Privacy
              </h2>
              <p>
                Solar Gear Ltd ("we", "us", "our") is committed to protecting the privacy of our Kenyan homeowners and clients. This policy explains how we collect, use, and safeguard your personal information in compliance with the Data Protection Act of Kenya.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-3">
                <Eye size={20} className="text-gold" /> 2. Information We Collect
              </h2>
              <p className="mb-4">We collect information that you provide directly to us through our website, AI Chatbot, and assessment forms, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-gray-200">Contact Data:</strong> Name, WhatsApp number, and email address.</li>
                <li><strong className="text-gray-200">Property Data:</strong> Home type, location, and estimated monthly electricity expenditure.</li>
                <li><strong className="text-gray-200">System Preferences:</strong> Package interest (SolarStart, SolarFamily, SolarElite).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-3">
                <FileText size={20} className="text-gold" /> 3. How We Use Your Data
              </h2>
              <p className="mb-4">Your information is used strictly for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To schedule your <strong className="text-white">Free Solar Readiness Assessment</strong>.</li>
                <li>To provide accurate engineering quotes based on your home's profile.</li>
                <li>To communicate via WhatsApp regarding installation timelines and support.</li>
                <li>To track the effectiveness of our advertising campaigns (Google Ads/Facebook).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-3">
                <Scale size={20} className="text-gold" /> 4. Third-Party Services
              </h2>
              <p>
                We use secure third-party processors to manage lead flow and analytics:
                <br /><br />
                <strong className="text-gray-200">Formspree:</strong> Secure transmission of form leads to our engineering hub.
                <br />
                <strong className="text-gray-200">Google Analytics/GTM:</strong> Tracking anonymized user behavior to improve site performance.
                <br />
                <strong className="text-gray-200">Gemini AI:</strong> Processing chat interactions to provide immediate expert guidance.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-3">
                <Shield size={20} className="text-gold" /> 5. Data Security & Your Rights
              </h2>
              <p>
                We implement 256-bit encryption for all data transfers. You have the right to request access to your data, request deletion of your information, or opt-out of marketing communications at any time by contacting our Nairobi hub.
              </p>
            </section>

            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
              <Logo size={32} />
              <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest text-center md:text-right">
                Solar Gear Ltd Hub <br /> Nairobi, Kenya • Professional Solar Engineering
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
