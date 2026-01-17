
import React from 'react';
import { Phone, MapPin, Mail, ChevronRight, Globe, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onPrivacyClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onPrivacyClick }) => {
  const currentYear = new Date().getFullYear();

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-20 border-t border-white/5 bg-[#050505] relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 items-start mb-20">
          
          {/* Brand & Mission */}
          <div className="space-y-6">
            <Logo />
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Specializing in premium <strong className="text-gray-300">Home Solar Engineering</strong> across Kenya. We empower families nationwide with reliable, clean, and quiet energy independence.
            </p>
            <div className="flex items-center gap-2 text-xs text-gold font-bold uppercase tracking-widest">
              <ShieldCheck size={14} /> Tier-1 Hardware Only
            </div>
          </div>

          {/* Site Navigation (Sitemap) */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
              <div className="w-1 h-4 bg-gold rounded-full"></div>
              Site Navigation
            </h4>
            <ul className="space-y-4">
              {[
                { label: "Home", id: "hero" },
                { label: "Our Story", id: "why-us" },
                { label: "System Sizer", id: "calculator" },
                { label: "Solar Packages", id: "packages" },
                { label: "How it Works", id: "how-it-works" },
                { label: "Engineering FAQ", id: "faq" }
              ].map((link, i) => (
                <li key={i}>
                  <button 
                    onClick={() => handleScroll(link.id)}
                    className="text-gray-500 hover:text-gold text-sm flex items-center gap-2 transition-all group"
                  >
                    <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Nationwide Coverage */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
              <div className="w-1 h-4 bg-gold rounded-full"></div>
              Nationwide Reach
            </h4>
            <div className="grid grid-cols-1 gap-y-3">
              {[
                "Nairobi & Environs", 
                "Coastal Region (Mombasa/Malindi)", 
                "Western & Lake Hub (Kisumu)", 
                "Rift Valley (Nakuru/Eldoret)", 
                "Mount Kenya Hub (Nanyuki)", 
                "Remote & Rural Specialists"
              ].map((loc, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <MapPin size={10} className="text-gold/50" /> {loc}
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-widest">
               <Globe size={14} className="text-gold" /> Covering All 47 Counties
            </div>
          </div>

          {/* Contact & Support */}
          <div className="flex flex-col">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
              <div className="w-1 h-4 bg-gold rounded-full"></div>
              Expert Support
            </h4>
            <div className="space-y-6">
              <a href="tel:+254722371250" className="flex items-center gap-4 group">
                <div className="p-3 bg-white/5 rounded-xl text-gold group-hover:bg-gold group-hover:text-charcoal transition-all">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Call Engineer</p>
                  <p className="text-sm text-white font-bold">+254 722 371 250</p>
                </div>
              </a>
              
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-white/5 rounded-xl text-gold">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Email Hub</p>
                  <p className="text-sm text-white font-bold">hello@solargear.co.ke</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
            &copy; {currentYear} Solar Gear Ltd. Serving All of Kenya. Professional Solar Installers.
          </div>
          
          <div className="flex gap-8 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <button 
              onClick={onPrivacyClick}
              className="hover:text-gold transition-colors"
            >
              Privacy
            </button>
            <a href="#" className="hover:text-gold transition-colors">Nationwide Engineering Standards</a>
            <a href="#" className="hover:text-gold transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
