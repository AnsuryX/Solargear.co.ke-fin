
import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  { name: 'Victron Energy', logo: 'https://vignette.wikia.nocookie.net/logopedia/images/b/b8/Victron_Energy_logo.png' },
  { name: 'Jinko Solar', logo: 'https://logos-world.net/wp-content/uploads/2023/12/JinkoSolar-Logo.png' },
  { name: 'Longi Solar', logo: 'https://www.longi.com/en/favicon.ico' }, // Simple icon/logo
  { name: 'Pylontech', logo: 'https://www.pylontech.com.cn/style/images/logo.png' },
  { name: 'Huawei Solar', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Huawei-Logo.png' }
];

export const TechnologyBrands: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-charcoal/50 border-y border-charcoal/5 dark:border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-gold text-xs font-black uppercase tracking-[0.4em] mb-4">World-Class Hardware</p>
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal dark:text-white uppercase tracking-tight">
            We Engineer With The Best
          </h2>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {brands.map((brand, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="h-8 md:h-12 flex items-center"
            >
              <span className="text-xl md:text-2xl font-black text-charcoal dark:text-white tracking-tighter">
                {brand.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
