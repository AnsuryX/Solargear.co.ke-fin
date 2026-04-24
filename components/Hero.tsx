
import React, { useMemo, lazy, Suspense } from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, Zap, Globe, Calculator } from 'lucide-react';
import { motion as motionImport, useScroll, useTransform } from 'framer-motion';
import { trackEvent, getABVariant } from '../lib/analytics';

// Lazy load the heavy Spotlight component
const Spotlight = lazy(() => import('./ui/spotlight').then(m => ({ default: m.Spotlight })));

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
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);

  // A/B Test Variant Logic
  const variant = useMemo(() => getABVariant(), []);
  
  const copy = {
    headline: variant === 'A' ? (
      <>BEYOND <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold-dark">BACKUP.</span></>
    ) : variant === 'B' ? (
      <>POWER YOUR <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold-dark">FREEDOM.</span></>
    ) : (
      <>STOP KPLC <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold-dark">BILLS.</span></>
    ),
    subtext: variant === 'A' 
      ? 'Premium Solar Engineering for Kenya’s Finest Homes.' 
      : variant === 'B' 
        ? 'Engineered for Kenya\'s Most Exclusive Residences.'
        : 'Kenya\'s #1 Choice for Zero-Maintenance Solar.',
    description: variant === 'A' 
      ? 'From the capital city to rural retreats, we design energy independence. Stop KPLC reliance today with Kenya\'s most trusted residential solar partner.'
      : variant === 'B'
        ? 'Experience true energy independence. Our high-performance solar systems ensure your home stays powered 24/7, no matter the grid status.'
        : 'Stop paying for power you don\'t own. Lock in decades of free energy with Solar Gear\'s high-yield engineering. Join thousands of Kenyan families today.',
    ctaLabels: {
      primary: 'Get Quote on WhatsApp',
      secondary: 'Claim 30% Savings'
    }
  };

  const handleWhatsAppClick = () => {
    trackEvent('cta_click', { 
      button_name: 'whatsapp_quote', 
      location: 'hero'
    });
    onChatClick();
  };

  const handleMpesaClick = () => {
    trackEvent('cta_click', { 
      button_name: 'mpesa_order', 
      location: 'hero'
    });
    onProductClick();
  };

  return (
    <section className="relative min-h-screen w-full bg-white dark:bg-charcoal flex items-center overflow-hidden transition-colors duration-300">
      {/* High-Performance Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-charcoal dark:via-[#121212] dark:to-charcoal"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
             style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Animated Glow Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-gold/20 blur-[120px] rounded-full"
        ></motion.div>
        
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
            x: [0, -40, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold/10 blur-[100px] rounded-full"
        ></motion.div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white dark:from-charcoal to-transparent"></div>
      </div>

      {/* Decorative Spotlight - Loads after 1s to save initial TBT */}
      <div className="hidden md:block">
        <Suspense fallback={null}>
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20 z-10 opacity-30 md:opacity-60"
            fill="#D4AF37"
          />
        </Suspense>
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
            <h1 className="text-6xl md:text-8xl font-black text-charcoal dark:text-white mb-8 leading-[0.95] tracking-tighter">
              {copy.headline}
            </h1>

            {/* High-Impact Subtext */}
            <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
              <div className="max-w-md">
                <p className="text-xl md:text-2xl text-charcoal/90 dark:text-white/90 font-medium mb-4 leading-tight">
                  {copy.subtext.split('Kenya').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && <span className="text-gold italic">Kenya</span>}
                    </React.Fragment>
                  ))}
                </p>
                <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                  {copy.description}
                </p>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                <div className="p-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl backdrop-blur-sm">
                  <div className="text-gold font-black text-2xl">47</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Counties Served</div>
                </div>
                <div className="p-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl backdrop-blur-sm">
                  <div className="text-gold font-black text-2xl">0%</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Blackout Risk</div>
                </div>
              </div>
            </div>

            {/* Dynamic Buttons with A/B Testing Labels */}
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={handleWhatsAppClick}
                className="relative group bg-gold text-charcoal font-black py-5 px-12 rounded-sm transition-all flex items-center justify-center gap-3 shadow-xl shadow-gold/10 active:scale-95"
              >
                <MessageCircle size={20} />
                {copy.ctaLabels.primary}
              </button>
              
              <button 
                onClick={() => {
                  const el = document.getElementById('calculator');
                  el?.scrollIntoView({ behavior: 'smooth' });
                  trackEvent('cta_click', { button_name: 'hero_calculator', location: 'hero' });
                }}
                className="bg-transparent border-2 border-charcoal/20 dark:border-white/20 text-charcoal dark:text-white py-5 px-12 rounded-sm font-bold transition-all flex items-center justify-center gap-3 group active:scale-95"
              >
                <Calculator size={20} className="group-hover:text-gold transition-colors" />
                ROI Calculator
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
