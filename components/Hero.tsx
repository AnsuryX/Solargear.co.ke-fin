
import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageCircle, Star, ShieldCheck, Zap, Globe } from 'lucide-react';
import { motion as motionImport, useScroll, useTransform } from 'framer-motion';
import { SplineScene } from "./ui/spline";
import { Card } from "./ui/card";
import { Spotlight } from "./ui/spotlight";

// Fix for framer-motion type mismatch in the current environment
const motion = motionImport as any;

interface HeroProps {
  onChatClick: () => void;
  onProductClick: () => void;
}

const FloatingBadge = ({ icon, text, delay }: { icon: React.ReactNode, text: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8, ease: "easeOut" }}
    className="hidden lg:flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl"
    style={{
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    }}
  >
    <div className="text-gold">{icon}</div>
    <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">{text}</span>
  </motion.div>
);

export const Hero: React.FC<HeroProps> = ({ onChatClick, onProductClick }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    const checkScreenSize = () => setIsLargeScreen(window.innerWidth >= 1024);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-charcoal flex items-center overflow-hidden">
      {/* Background Layer: 3D or Fallback */}
      <div className="absolute inset-0 z-0">
        {isLargeScreen ? (
          <div className="w-full h-full opacity-60 lg:opacity-100">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-[#121212]">
            <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-gold/10 blur-[120px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-charcoal via-transparent to-transparent"></div>
          </div>
        )}
      </div>

      {/* Decorative Spotlight */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20 z-10 opacity-30 md:opacity-60"
        fill="#D4AF37"
      />

      <div className="container mx-auto px-6 relative z-20 pt-20 lg:pt-0">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
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

            {/* Dynamic Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onProductClick}
                className="relative group overflow-hidden bg-gold text-charcoal font-black py-5 px-12 rounded-sm transition-all duration-500 flex items-center justify-center gap-3"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                EXPLORE PACKAGES
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button 
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                onClick={onChatClick}
                className="bg-transparent border-2 border-white/20 hover:border-gold/50 text-white py-5 px-12 rounded-sm font-bold transition-all flex items-center justify-center gap-3 group"
              >
                <MessageCircle size={20} className="group-hover:text-gold transition-colors" />
                CHAT WITH ENGINEER
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements for visual depth */}
      <div className="absolute top-1/4 right-20 space-y-4 z-10 pointer-events-none hidden xl:block">
        <FloatingBadge icon={<ShieldCheck size={18} />} text="Tier 1 Tech Only" delay={1.2} />
        <FloatingBadge icon={<Zap size={18} />} text="Instant Switching" delay={1.4} />
        <FloatingBadge icon={<Globe size={18} />} text="Nationwide Support" delay={1.6} />
      </div>

      {/* Trust Pilot Style Ribbon */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-6 flex items-center gap-4 text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]"
      >
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-gold text-gold" />)}
        </div>
        5.0 Average Customer Rating Across Kenya
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 right-10 hidden md:flex flex-col items-center gap-2 text-white/20"
      >
        <span className="text-[10px] uppercase font-bold tracking-widest vertical-text">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent"></div>
      </motion.div>

      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </section>
  );
};
