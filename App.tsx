
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MessageCircle, Loader2, X, Sparkles, Bot } from 'lucide-react';
import { trackWhatsAppClick, trackEvent } from './lib/analytics';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LazySection } from './components/LazySection';

// Lazy load heavy components
const ProblemSection = lazy(() => import('./components/ProblemSection').then(m => ({ default: m.ProblemSection })));
const CalculatorSection = lazy(() => import('./components/CalculatorSection').then(m => ({ default: m.CalculatorSection })));
const PackageSelectionGuide = lazy(() => import('./components/PackageSelectionGuide').then(m => ({ default: m.PackageSelectionGuide })));
const PackagesSection = lazy(() => import('./components/PackagesSection').then(m => ({ default: m.PackagesSection })));
const ProductSpotlight = lazy(() => import('./components/ProductSpotlight').then(m => ({ default: m.ProductSpotlight })));
const SocialProof = lazy(() => import('./components/SocialProof').then(m => ({ default: m.SocialProof })));
const TestimonialCarousel = lazy(() => import('./components/TestimonialCarousel').then(m => ({ default: m.TestimonialCarousel })));
const OfferSection = lazy(() => import('./components/OfferSection').then(m => ({ default: m.OfferSection })));
const RiskReversal = lazy(() => import('./components/RiskReversal').then(m => ({ default: m.RiskReversal })));
const LeadMagnet = lazy(() => import('./components/LeadMagnet').then(m => ({ default: m.LeadMagnet })));
const FAQ = lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })));
const TechnologyBrands = lazy(() => import('./components/TechnologyBrands').then(m => ({ default: m.TechnologyBrands })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const ChatModal = lazy(() => import('./components/ChatModal').then(m => ({ default: m.ChatModal })));
const PackagePurchaseModal = lazy(() => import('./components/PackagePurchaseModal').then(m => ({ default: m.PackagePurchaseModal })));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));

const SectionLoader = () => (
  <div className="w-full h-40 flex items-center justify-center bg-white dark:bg-charcoal">
    <Loader2 className="text-gold/20 animate-spin" size={24} />
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy'>('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [prefillChatMessage, setPrefillChatMessage] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark as per original design
  const [purchaseModal, setPurchaseModal] = useState<{ isOpen: boolean; packageName: string }>({
    isOpen: false,
    packageName: ''
  });

  useEffect(() => {
    // Initialize theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }

    // Show proactive greeting after 5 seconds
    const timer = setTimeout(() => setShowGreeting(true), 5000);
    
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#privacy') {
        setCurrentPage('privacy');
        window.scrollTo(0, 0);
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      clearTimeout(timer);
    };
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    trackEvent('theme_toggle', { mode: newMode ? 'dark' : 'light' });
  };

  const handlePackageSelect = (name: string) => {
    setPurchaseModal({ isOpen: true, packageName: name });
  };

  const handleChatWithPackage = (packageName: string) => {
    setPrefillChatMessage(`I'm interested in the ${packageName}. Could you explain the technical specs and how it handles blackouts?`);
    setIsChatOpen(true);
    setShowGreeting(false);
  };

  const handleGeneralChat = () => {
    // track event
    trackWhatsAppClick('general_cta');
    window.open("https://wa.me/254141153031?text=Hi%20Solar%20Gear!%20I'd%20like%20to%20get%20a%20solar%20quote%20for%20my%20home.", "_blank");
  };

  const handleAIChat = () => {
    setPrefillChatMessage(`Hi! I'd like to speak with a solar engineer about my home's energy needs.`);
    setIsChatOpen(true);
    setShowGreeting(false);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setPrefillChatMessage(null);
  };

  const navigateToHome = () => {
    window.location.hash = '';
    setCurrentPage('home');
  };

  const navigateToPrivacy = () => {
    window.location.hash = 'privacy';
    setCurrentPage('privacy');
  };

  if (currentPage === 'privacy') {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-white dark:bg-charcoal text-charcoal dark:text-white selection:bg-gold selection:text-charcoal font-sans transition-colors duration-300">
          <Header onLogoClick={navigateToHome} isDarkMode={isDarkMode} onThemeToggle={toggleTheme} />
          <Suspense fallback={<div className="h-screen bg-white dark:bg-charcoal" />}>
            <PrivacyPolicy onBack={navigateToHome} />
            <Footer onPrivacyClick={navigateToPrivacy} />
          </Suspense>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white dark:bg-charcoal text-charcoal dark:text-white selection:bg-gold selection:text-charcoal font-sans transition-colors duration-300">
        <Header onLogoClick={navigateToHome} isDarkMode={isDarkMode} onThemeToggle={toggleTheme} />
        
        <Hero 
          onChatClick={handleGeneralChat} 
          onProductClick={() => {
            const section = document.getElementById('packages');
            if (section) section.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        
        <LazySection threshold={0.05} rootMargin="300px">
          <ProblemSection />
        </LazySection>
        
        <LazySection threshold={0.05} rootMargin="300px">
          <CalculatorSection />
        </LazySection>
        
        <LazySection threshold={0.05} rootMargin="300px">
          <PackageSelectionGuide />
        </LazySection>
        
        <LazySection threshold={0.05} rootMargin="300px">
          <PackagesSection 
            onPackageSelect={handlePackageSelect} 
            onChatWithPackage={handleChatWithPackage}
          />
        </LazySection>
        
        <LazySection threshold={0.05} rootMargin="300px">
          <ProductSpotlight />
        </LazySection>
        
        <LazySection threshold={0.05} rootMargin="300px">
          <SocialProof />
        </LazySection>
        
        <LazySection threshold={0.05} rootMargin="300px">
          <TestimonialCarousel />
        </LazySection>
        
        <LazySection threshold={0.05} rootMargin="300px">
          <OfferSection />
        </LazySection>
        
        <LazySection threshold={0.05} rootMargin="300px">
          <RiskReversal />
        </LazySection>
        
        <LazySection threshold={0.05} rootMargin="300px">
          <LeadMagnet />
        </LazySection>
        
        <LazySection threshold={0.05} rootMargin="300px">
          <TechnologyBrands />
        </LazySection>
        
        <LazySection threshold={0.05} rootMargin="300px">
          <FAQ />
        </LazySection>
        
        <LazySection threshold={0.05} rootMargin="300px">
          <Footer onPrivacyClick={navigateToPrivacy} />
        </LazySection>
        
        <Suspense fallback={null}>
          <AnimatePresence>
            {isChatOpen && (
              <ChatModal 
                isOpen={isChatOpen} 
                prefillMessage={prefillChatMessage}
                onClose={closeChat} 
              />
            )}
          </AnimatePresence>
  
          {purchaseModal.isOpen && (
            <PackagePurchaseModal 
              isOpen={purchaseModal.isOpen}
              packageName={purchaseModal.packageName}
              onClose={() => setPurchaseModal({ ...purchaseModal, isOpen: false })}
            />
          )}
        </Suspense>
  
        {/* Persistent AI Chat Hub */}
        <div className="fixed bottom-6 right-6 z-[120] flex flex-col items-end gap-3 pointer-events-none">
          <AnimatePresence>
            {showGreeting && !isChatOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white p-4 rounded-2xl rounded-br-none shadow-2xl border border-gold/20 max-w-[240px] pointer-events-auto relative mb-2"
              >
                <button 
                  onClick={() => setShowGreeting(false)}
                  className="absolute -top-2 -left-2 bg-charcoal text-white rounded-full p-1 border border-white/10 hover:bg-gold hover:text-charcoal transition-colors"
                >
                  <X size={12} />
                </button>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                     <Bot size={14} className="text-gold" />
                  </div>
                  <p className="text-[11px] text-charcoal font-bold leading-tight">
                    Hi! 👋 I'm GearBot. Want a <span className="text-gold">Satellite Roof Audit</span> of your home? Let's start!
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
  
          <div className="flex flex-col gap-3 pointer-events-auto items-end">
            <button
              onClick={handleAIChat}
              className="bg-gold text-charcoal py-3 px-6 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all group flex items-center gap-3 border-2 border-charcoal/10 relative overflow-hidden ring-4 ring-black/5"
              aria-label="AI Consultation"
            >
              <Bot size={18} className="group-hover:rotate-12 transition-transform" />
              <span className="font-black text-[10px] uppercase tracking-widest whitespace-nowrap">AI Engineer</span>
              <span className="absolute top-1 right-2 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
            </button>

            <button
              onClick={handleGeneralChat}
              className="bg-[#25D366] text-white py-4 px-6 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all group flex items-center gap-3 border-2 border-charcoal/10 relative overflow-hidden"
              aria-label="WhatsApp"
            >
              <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
              <span className="font-black text-[10px] uppercase tracking-widest text-[#1A1A1A] whitespace-nowrap">WhatsApp Chat</span>
            </button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
