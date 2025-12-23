
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, Zap } from 'lucide-react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    name: "David Maina",
    location: "Karen, Nairobi",
    system: "8kW Hybrid Backup",
    quote: "Solar Gear transformed how we live. No more KPLC blackouts in the middle of dinner. The engineering team was professional and the finish is neat.",
    rating: 5
  },
  {
    name: "Sarah Wanjiku",
    location: "Runda",
    system: "5kW Grid-Tie System",
    quote: "Our monthly bill dropped from KES 18,000 to KES 2,500. The ROI is clear, and the Solar Readiness Assessment gave us the confidence to start.",
    rating: 5
  },
  {
    name: "Dr. Omondi",
    location: "Syokimau",
    system: "10kW Commercial Setup",
    quote: "Reliability was my biggest concern for my clinic. Solar Gear delivered a robust system that powers all my medical equipment flawlessly.",
    rating: 5
  },
  {
    name: "Fatma Ahmed",
    location: "Kilimani",
    system: "3kW Apartment Backup",
    quote: "Even in an apartment, they found a way to install a backup system that keeps my home office running 24/7. Highly recommend their expertise!",
    rating: 5
  }
];

export const TestimonialCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden border-t border-white/5">
      {/* Abstract background light */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-gold/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Solar Success Stories</h2>
          <p className="text-gray-500 max-w-2xl mx-auto uppercase tracking-widest text-xs font-bold">Trusted by Nairobi's Elite Homeowners</p>
        </div>

        <div className="max-w-4xl mx-auto relative h-[400px] md:h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border-gold/10 bg-gradient-to-br from-white/5 to-transparent h-full flex flex-col justify-center relative">
                <Quote className="absolute top-8 right-12 text-gold/10 w-24 h-24 pointer-events-none" />
                
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[index].rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-gold text-gold" />
                  ))}
                </div>

                <p className="text-xl md:text-2xl text-white italic font-light leading-relaxed mb-8 relative z-10">
                  "{testimonials[index].quote}"
                </p>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-white/10 pt-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-xl">
                      {testimonials[index].name[0]}
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{testimonials[index].name}</h4>
                      <p className="text-gray-500 text-xs flex items-center gap-1">
                        <MapPin size={10} className="text-gold" /> {testimonials[index].location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                    <Zap size={14} className="text-gold" />
                    <span className="text-[10px] md:text-xs text-gray-300 font-bold uppercase tracking-wider">
                      {testimonials[index].system}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-8">
            <button 
              onClick={prev}
              className="p-3 rounded-full border border-white/10 text-gray-400 hover:text-gold hover:border-gold/50 transition-all bg-white/5"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-gold' : 'w-2 bg-white/20'}`}
                />
              ))}
            </div>
            <button 
              onClick={next}
              className="p-3 rounded-full border border-white/10 text-gray-400 hover:text-gold hover:border-gold/50 transition-all bg-white/5"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
