
import React from 'react';
import { motion as motionImport } from 'framer-motion';
import { Check, Zap, Home, ShieldCheck, ArrowRight, Star, MessageSquare } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

// Fix for framer-motion type mismatch in the current environment
const motion = motionImport as any;

interface PackagesSectionProps {
  onPackageSelect: (name: string) => void;
  onChatWithPackage: (packageName: string) => void;
}

const packages = [
  {
    name: "SolarStart™ Backup",
    price: "KES 285,000",
    description: "The essential solution to stay powered during Nairobi blackouts. Perfect for apartments and small townhouses.",
    icon: <Zap className="text-gold" size={32} />,
    features: [
      "2.5kW Hybrid Inverter",
      "5.1kWh Lithium Battery",
      "Power for: Lights, Wi-Fi, Fridge, TV",
      "Full Professional Installation",
      "Real-time Mobile Monitoring"
    ],
    cta: "Secure Backup",
    highlight: false
  },
  {
    name: "SolarFamily™ Hybrid",
    price: "KES 595,000",
    description: "Our most popular choice for standard family homes in Nairobi. Significant bill reduction and total reliability.",
    icon: <Home className="text-gold" size={32} />,
    features: [
      "5kW Smart Hybrid Inverter",
      "10.2kWh LiFePO4 Storage",
      "Power for: All Lights, Fridge, TV, Water Pump",
      "Tier-1 High Efficiency Panels",
      "Extended 5-Year Workmanship Warranty"
    ],
    cta: "Most Popular Choice",
    highlight: true
  },
  {
    name: "SolarElite™ Independence",
    price: "KES 1,450,000",
    description: "Ultimate energy freedom for large villas. Run your entire home including heavy appliances with zero stress.",
    icon: <ShieldCheck className="text-gold" size={32} />,
    features: [
      "10kW Parallel Inverter Setup",
      "20kWh High-Density Storage",
      "Full Loads: Including ACs & Cookers",
      "Premium Glass-on-Glass Panels",
      "VIP Priority Support & Maintenance"
    ],
    cta: "Go Fully Off-Grid",
    highlight: false
  }
];

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onPackageSelect, onChatWithPackage }) => {
  const handleChatClick = (name: string) => {
    trackEvent('cta_click', { button_name: 'ask_expert_package', package: name });
    onChatWithPackage(name);
  };

  return (
    <section id="packages" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 border border-gold/30 rounded-full bg-gold/5 backdrop-blur-md">
            <span className="text-gold text-[10px] font-bold uppercase tracking-[0.2em]">Tier-1 Residential Engineering</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Home Solar Packages</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Transparent pricing. Professional engineering. No hidden costs. Choose the right level of energy independence for your Nairobi home.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex flex-col p-8 rounded-[2.5rem] border transition-all duration-500 ${
                pkg.highlight 
                  ? 'bg-gradient-to-b from-white/10 to-transparent border-gold/50 shadow-2xl shadow-gold/5' 
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-charcoal text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                  Nairobi Bestseller
                </div>
              )}

              <div className="mb-8">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                  {pkg.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{pkg.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-black text-white">{pkg.price}</span>
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Inclusive of Installation & VAT</p>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check size={18} className="text-gold shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => onPackageSelect(pkg.name)}
                  className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 group ${
                    pkg.highlight 
                      ? 'bg-gold text-charcoal hover:bg-gold-light' 
                      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {pkg.cta}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button 
                  onClick={() => handleChatClick(pkg.name)}
                  className="w-full py-3 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 border border-white/5 text-gray-400 hover:text-gold hover:border-gold/30 bg-white/0 hover:bg-gold/5"
                >
                  <MessageSquare size={14} />
                  Ask about this package
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-xs font-medium uppercase tracking-[0.2em] flex items-center justify-center gap-2">
            <Star size={12} className="text-gold fill-gold" />
            Flexible payment plans available for qualifying homeowners
            <Star size={12} className="text-gold fill-gold" />
          </p>
        </div>
      </div>
    </section>
  );
};
