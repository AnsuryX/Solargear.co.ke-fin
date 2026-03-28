
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { Phone, ArrowRight, Sun, Moon } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

interface HeaderProps {
  onLogoClick?: () => void;
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogoClick, isDarkMode, onThemeToggle }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // If not on home page, navigate home first
    if (window.location.hash === '#privacy') {
      if (onLogoClick) onLogoClick();
      // Small delay to allow home page to render
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      trackEvent('nav_click', { section_id: id });
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAssessmentClick = () => {
    trackEvent('cta_click', { button_name: 'get_free_assessment', location: 'header' });
    scrollToSection('reserve');
  };

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-[80] transition-all duration-500 ${
        scrolled 
          ? 'py-4 bg-white/80 dark:bg-charcoal/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5 shadow-2xl' 
          : 'py-8 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <button onClick={handleLogoClick} className="transition-transform active:scale-95">
          <Logo size={scrolled ? 32 : 40} />
        </button>

        <nav className="hidden lg:flex items-center gap-10">
          {['Packages', 'Calculator', 'FAQ'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-gold transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-full bg-black/5 dark:bg-white/10 text-charcoal dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-all"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a 
            href="tel:+254722371250" 
            onClick={() => trackEvent('phone_click', { location: 'header' })}
            className="hidden md:flex items-center gap-2 text-charcoal dark:text-white hover:text-gold transition-colors"
          >
            <Phone size={16} className="text-gold" />
            <span className="text-xs font-bold">+254 722 371 250</span>
          </a>
          
          <button
            onClick={handleAssessmentClick}
            className={`px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${
              scrolled 
                ? 'bg-gold text-charcoal hover:bg-gold-light' 
                : 'bg-charcoal dark:bg-white/10 text-white hover:bg-charcoal/90 dark:hover:bg-white/20'
            }`}
          >
            Get Free Assessment
          </button>
        </div>
      </div>
    </motion.header>
  );
};
