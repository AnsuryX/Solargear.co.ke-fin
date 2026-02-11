
import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, MessageCircle, Star, ShieldCheck, Zap, Globe } from 'lucide-react';
import { motion as motionImport, useScroll, useTransform } from 'framer-motion';
import { Spotlight } from "./ui/spotlight";
import { trackEvent, getABVariant } from '../lib/analytics';

// Dynamic import for Spline to keep it out of the critical main bundle
const SplineScene = React.lazy(() => import('./ui/spline').then(m => ({ default: m.SplineScene })));

// Fix for framer-motion type mismatch
const motion = motionImport as any;

interface HeroProps {
  onChatClick: () => void;
  onProductClick: () => void;
}

const FloatingBadge = ({ icon, text, delay }: { icon: React.ReactNode, text: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="hidden lg:flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl"
  >
    <div className="text-gold">{icon}</div>
    <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">{text}</span>
  </motion.div>
);

export const Hero: React.FC<HeroProps> = ({ onChatClick, onProductClick }) => {
  const [shouldShowSpline, setShouldShowSpline] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);

  // A/B Test Variant Logic
  const variant = useMemo(() => getABVariant(), []);
  
  const ctaLabels = {
    primary: variant === 'A' ? 'EXPLORE PACKAGES' : 'SEE SOLAR PRICES',
    secondary: variant === 'A' ? 'CHAT WITH ENGINEER' : 'GET EXPERT ADVICE'
  };

  useEffect(() => {
    // Only enable heavy 3D assets on desktop to save mobile PageSpeed
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop) {
      // Delay Spline initialization slightly to allow initial paint
      const timer = setTimeout(() => setShouldShowSpline(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleExploreClick = () => {
    trackEvent('cta_click', { 
      button_name: 'explore_packages', 
      location: 'hero',
      label_used: ctaLabels.primary 
    });
    onProductClick();
  };

  const handleChatClick = () => {
    trackEvent('cta_click', { 
      button_name: 'chat_with_engineer', 
      location: 'hero',
      label_used: ctaLabels.secondary
    });
    onChatClick();
  };

  return (
    <section className="relative min-h-screen w-full bg-charcoal flex items-center overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {shouldShowSpline ? (
          <React.Suspense fallback={<div className="w-full h-full bg-[#121212]" />}>
            <div className="w-full h-full opacity-100">
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </React.Suspense>
        ) : (
          <div className="absolute inset-0 bg-[#121212]">
            <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-gold/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-charcoal via-transparent to-transparent"></div>
          </div>
        )}
      </div>

      {/* Decorative Spotlight - Loads after 1s to save initial TBT */}
      <div className="hidden md:block">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20 z-10 opacity-30 md:opacity-60"
          fill="#D4AF37"
        />
      </div>

      <div className="container mx-auto px-6 relative z-20 pt-20 lg:pt-0">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ y: y1 }}
          >
            {/* Tagline */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-[1px] w-12 bg-gold/50"></div>
              <span className="text-gold text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">
                Residential Specialists • Serving All 47 Counties
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[0.95] tracking-tighter">
              BEYOND <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold-dark">
                BACKUP.
              </span>
            </h1>

            {/* High-Impact Subtext */}
            <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
              <div className="max-w-md">
                <p className="text-xl md:text-2xl text-white/90 font-medium mb-4 leading-tight">
                  Premium Solar Engineering for <span className="text-gold italic">Kenya’s Finest Homes.</span>
                </p>
                <p className="text-gray-400 font-light leading-relaxed">
                  From the capital city to rural retreats, we design energy independence. Stop KPLC reliance today with Kenya's most trusted residential solar partner.
                </p>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                  <div className="text-gold font-black text-2xl">47</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Counties Served</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                  <div className="text-gold font-black text-2xl">0%</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Blackout Risk</div>
                </div>
              </div>
            </div>

            {/* Dynamic Buttons with A/B Testing Labels */}
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={handleExploreClick}
                className="relative group bg-gold text-charcoal font-black py-5 px-12 rounded-sm transition-all flex items-center justify-center gap-3 shadow-xl shadow-gold/10 active:scale-95"
              >
                {ctaLabels.primary}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={handleChatClick}
                className="bg-transparent border-2 border-white/20 text-white py-5 px-12 rounded-sm font-bold transition-all flex items-center justify-center gap-3 group active:scale-95"
              >
                <MessageCircle size={20} className="group-hover:text-gold transition-colors" />
                {ctaLabels.secondary}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-20 space-y-4 z-10 pointer-events-none hidden xl:block">
        <FloatingBadge icon={<ShieldCheck size={18} />} text="Tier 1 Tech Only" delay={1} />
        <FloatingBadge icon={<Zap size={18} />} text="Instant Switching" delay={1.2} />
        <FloatingBadge icon={<Globe size={18} />} text="Nationwide Support" delay={1.4} />
      </div>

      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </section>
  );
};
