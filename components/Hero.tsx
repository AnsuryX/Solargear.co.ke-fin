
import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { SplineScene } from "./ui/spline";
import { Card } from "./ui/card";
import { Spotlight } from "./ui/spotlight";

interface HeroProps {
  onChatClick: () => void;
  onProductClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onChatClick, onProductClick }) => {
  return (
    <section className="h-screen min-h-[700px] w-full bg-charcoal relative overflow-hidden">
      <Card className="w-full h-full border-none bg-transparent rounded-none relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20 z-10"
          fill="#D4AF37"
        />
        
        <div className="flex flex-col-reverse lg:flex-row h-full relative z-20">
          <div className="flex-1 p-6 md:p-16 flex flex-col justify-center relative z-20 pointer-events-none lg:pointer-events-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl pointer-events-auto"
            >
              <div className="inline-block px-4 py-1.5 mb-6 border border-gold/30 rounded-full bg-gold/5 backdrop-blur-md">
                <span className="text-gold text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Top-Rated Solar Installers Kenya • Nairobi</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                Premium <br/>
                Solar Backup <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold-dark">
                  In Nairobi.
                </span>
              </h1>
              
              <h2 className="text-xl md:text-2xl text-white/90 font-medium mb-6">
                Clean Energy for Nairobi Homeowners — <span className="text-gold">Sustainable Living Kenya.</span>
              </h2>

              <p className="text-lg text-gray-400 mb-10 font-light leading-relaxed max-w-xl">
                Tired of rising KPLC bills and frequent power cuts? We provide the most reliable <strong>Solar Backup in Nairobi</strong>, helping you switch to clean energy without hidden costs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onProductClick}
                  className="bg-gold hover:bg-gold-light text-charcoal font-bold py-4 px-10 rounded-sm transition-all duration-300 shadow-xl shadow-gold/10 flex items-center justify-center gap-2"
                >
                  Reserve My Slot
                  <ArrowRight size={20} />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onChatClick}
                  className="bg-white/5 border border-white/10 hover:border-white/30 text-white py-4 px-10 rounded-sm transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 group"
                >
                  <MessageCircle size={20} className="group-hover:text-gold transition-colors" />
                  Chat with Engineer
                </motion.button>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 relative h-[45vh] lg:h-full w-full">
            <div className="absolute inset-0 z-0">
               <SplineScene 
                 scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                 className="w-full h-full"
               />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent lg:hidden pointer-events-none"></div>
            <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-charcoal via-charcoal/20 to-transparent hidden lg:block pointer-events-none"></div>
          </div>
        </div>
      </Card>
    </section>
  );
};
