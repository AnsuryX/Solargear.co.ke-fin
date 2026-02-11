
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MessageCircle, Loader2, X, Sparkles } from 'lucide-react';
import { trackWhatsAppClick, trackEvent } from './lib/analytics';
import { motion, AnimatePresence } from 'framer-motion';

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
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const ChatModal = lazy(() => import('./components/ChatModal').then(m => ({ default: m.ChatModal })));
const PackagePurchaseModal = lazy(() => import('./components/PackagePurchaseModal').then(m => ({ default: m.PackagePurchaseModal })));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));

const SectionLoader = () => (
  <div className="w-full h-40 flex items-center justify-center bg-charcoal">
    <Loader2 className="text-gold/20 animate-spin" size={24} />
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy'>('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [prefillChatMessage, setPrefillChatMessage] = useState<string | null>(null);
  const [purchaseModal, setPurchaseModal] = useState<{ isOpen: boolean; packageName: string }>({
    isOpen: false,
    packageName: ''
  });

  useEffect(() => {
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

  const handlePackageSelect = (name: string) => {
    setPurchaseModal({ isOpen: true, packageName: name });
  };

  const handleChatWithPackage = (packageName: string) => {
    setPrefillChatMessage(`I'm interested in the ${packageName}. Could you explain the technical specs and how it handles blackouts?`);
    setIsChatOpen(true);
    setShowGreeting(false);
  };

  const handleGeneralChat = () => {
    setPrefillChatMessage(`Hi! I'd like to speak with a solar engineer about my home's energy needs in Nairobi.`);
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
      <div className="min-h-screen bg-charcoal text-white selection:bg-gold selection:text-charcoal font-sans">
        <Header onLogoClick={navigateToHome} />
        <Suspense fallback={<div className="h-screen bg-charcoal" />}>
          <PrivacyPolicy onBack={navigateToHome} />
          <Footer onPrivacyClick={navigateToPrivacy} />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal text-white selection:bg-gold selection:text-charcoal font-sans">
      <Header onLogoClick={navigateToHome} />
      
      <Hero 
        onChatClick={handleGeneralChat} 
        onProductClick={() => {
          const section = document.getElementById('packages');
          if (section) section.scrollIntoView({ behavior: 'smooth' });
        }}
      />
      
      <Suspense fallback={<SectionLoader />}>
        <ProblemSection />
        <CalculatorSection />
        <PackageSelectionGuide />
        <PackagesSection 
          onPackageSelect={handlePackageSelect} 
          onChatWithPackage={handleChatWithPackage}
        />
        <ProductSpotlight />
        <SocialProof />
        <TestimonialCarousel />
        <OfferSection />
        <RiskReversal />
        <LeadMagnet />
        <FAQ />
        <Footer onPrivacyClick={navigateToPrivacy} />
        
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
                   <Sparkles size={14} className="text-gold" />
                </div>
                <p className="text-[11px] text-charcoal font-bold leading-tight">
                  Hi! 👋 I'm your AI Solar Engineer. Want a quick estimate for your home?
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleGeneralChat}
          className="pointer-events-auto bg-gold text-charcoal p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group flex items-center gap-3 border-4 border-charcoal relative overflow-hidden"
          aria-label="Open AI Solar Hub"
        >
          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          <div className="relative">
            <MessageCircle size={32} strokeWidth={2.5} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-charcoal animate-pulse"></span>
          </div>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-black text-sm uppercase tracking-widest px-0 group-hover:pr-2">
            Ask Engineer
          </span>
        </button>
      </div>
    </div>
  );
}

export default App;
