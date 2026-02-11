
import React, { useState, useEffect } from 'react';
import { motion as motionImport, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, Zap, ShieldCheck, TrendingDown } from 'lucide-react';
import { Testimonial } from '../types';

// Fix for framer-motion type mismatch in the current environment
const motion = motionImport as any;

const testimonials: (Testimonial & { result: string })[] = [
  {
    name: "David Maina",
    location: "Karen, Nairobi",
    system: "8kW Hybrid Backup",
    quote: "Solar Gear transformed how we live. No more KPLC blackouts in the middle of dinner. The engineering team was professional and the finish is neat.",
    rating: 5,
    result: "0 Blackouts in 6 Months"
  },
  {
    name: "Sarah Wanjiku",
    location: "Runda",
    system: "5kW Grid-Tie System",
    quote: "Our monthly bill dropped from KES 18,000 to KES 2,500. The ROI is clear, and the Solar Readiness Assessment gave us the confidence to start.",
    rating: 5,
    result: "85% Bill Reduction"
  },
  {
    name: "Dr. Peter Mwangi",
    location: "Syokimau",
    system: "10kW Elite Independence",
    quote: "Moving to full solar independence was the best decision for my family. Solar Gear's attention to detail during the residential audit was impressive.",
    rating: 5,
    result: "Full Energy Freedom"
  },
  {
    name: "Fatma Ahmed",
    location: "Nyali, Mombasa",
    system: "SolarFamily™ Hybrid",
    quote: "The heat in Nyali used to drive our AC bills through the roof. Now we run them guilt-free during the day thanks to the Solar Gear engineering setup.",
    rating: 5,
    result: "KES 15k Monthly Savings"
  },
  {
    name: "Joseph Kiptoo",
    location: "Nanyuki",
    system: "Off-Grid Farm Villa",
    quote: "We are quite remote, but the Solar Gear team deployed a Tier-1 system that handles our borehole pump and entire main house without a hitch.",
    rating: 5,
    result: "Reliable Remote Power"
  }
];

export const TestimonialCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-gold/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-black uppercase tracking-widest mb-4">
            <ShieldCheck size={12} />
            Verified Case Studies
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Kenya Success Stories</h2>
          <p className="text-gray-500 max-w-2xl mx-auto uppercase tracking-widest text-xs font-bold">Trusted by Kenya's Most Discerning Homeowners</p>
        </div>

        <div className="max-w-4xl mx-auto relative min-h-[500px] md:min-h-[400px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0"
            >
              <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border-gold/10 bg-gradient-to-br from-white/5 to-transparent h-full flex flex-col justify-center relative">
                <Quote className="absolute top-8 right-12 text-gold/5 w-24 h-24 pointer-events-none" />
                
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                  <div className="flex gap-1">
                    {[...Array(testimonials[index].rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-gold text-gold" />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/20">
                    <TrendingDown size={12} />
                    Outcome: {testimonials[index].result}
                  </div>
                </div>

                <p className="text-xl md:text-2xl text-white italic font-light leading-relaxed mb-10 relative z-10">
                  "{testimonials[index].quote}"
                </p>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-white/10 pt-8 mt-auto">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center text-gold font-bold text-2xl shadow-inner">
                      {testimonials[index].name[0]}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">{testimonials[index].name}</h4>
                      <p className="text-gray-500 text-xs flex items-center gap-1 mt-1 font-medium">
                        <MapPin size={10} className="text-gold" /> {testimonials[index].location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
                      <Zap size={14} className="text-gold" />
                      <span className="text-[10px] md:text-xs text-gray-300 font-bold uppercase tracking-widest">
                        {testimonials[index].system}
                      </span>
                    </div>
                    <span className="text-[9px] text-gray-600 font-bold uppercase tracking-tighter">Verified Engineering Project #SG-{2000 + index}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-8">
            <button 
              onClick={prev} 
              className="p-3 rounded-full border border-white/10 text-gray-400 hover:text-gold hover:border-gold/30 transition-all bg-white/5 active:scale-90"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-2.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-10 bg-gold' : 'w-2.5 bg-white/10 hover:bg-white/30'}`}
                />
              ))}
            </div>
            <button 
              onClick={next} 
              className="p-3 rounded-full border border-white/10 text-gray-400 hover:text-gold hover:border-gold/30 transition-all bg-white/5 active:scale-90"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
