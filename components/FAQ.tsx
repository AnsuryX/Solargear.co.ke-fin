
import React, { useState } from 'react';
import { motion as motionImport, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

// Fix for framer-motion type mismatch in the current environment
const motion = motionImport as any;

const faqData = [
  {
    q: "Who are the best solar installers in Kenya?",
    a: "While there are many options, the 'best' installers prioritize engineering quality over speed. Solar Gear focuses on Tier-1 components (Jinko, Longi, Victron) and expert load profiling to ensure your system doesn't just work, but thrives for 25+ years, anywhere in the country."
  },
  {
    q: "Is the Solar Readiness Assessment really free across Kenya?",
    a: "Yes. Our founding member offer includes a comprehensive Solar Readiness Assessment (normally KES 5,000) for free across Kenya. Our engineers will visit your property, whether it's in a city hub or a remote rural area, with zero obligation."
  },
  {
    q: "How does solar backup handle Kenyan power blackouts?",
    a: "Our hybrid solar systems switch to battery power (LiFePO4) in milliseconds when a blackout occurs. Most Kenyan homeowners won't even notice the lights flicker. We calculate your battery capacity during the assessment to ensure you have enough 'bridge' power for your local grid conditions."
  },
  {
    q: "What is the ROI for solar panels in Kenya?",
    a: "With current KPLC tariffs, most residential solar installations in Kenya pay for themselves in 3.5 to 5 years. After that, your electricity is essentially free for the remaining 20+ years of the panel's lifespan."
  },
  {
    q: "Do you install solar outside of Nairobi?",
    a: "Absolutely. We are a nationwide engineering firm. We serve all 47 counties, from the capital to rural highlands and coastal towns. Our logistics team is specialized in deploying high-end hardware to even the most remote Kenyan locations."
  }
];

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 bg-charcoal border-t border-white/5">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Kenya Solar Guide & FAQ</h2>
          <p className="text-gray-500">Everything you need to know about professional solar installers in Kenya.</p>
        </motion.div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-white/10 rounded-2xl overflow-hidden bg-white/5"
            >
              <button 
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-bold text-white leading-snug">{faq.q}</span>
                <div className="text-gold shrink-0">
                  {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">Need a specialized quote?</p>
          <a 
            href="https://wa.me/254722371250" 
            className="text-gold font-bold hover:underline underline-offset-4"
          >
            Ask a Kenyan Solar Expert on WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
};
