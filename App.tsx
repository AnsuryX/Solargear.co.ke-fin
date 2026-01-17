
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { ProductSpotlight } from './components/ProductSpotlight';
import { SocialProof } from './components/SocialProof';
import { OfferSection } from './components/OfferSection';
import { RiskReversal } from './components/RiskReversal';
import { LeadMagnet } from './components/LeadMagnet';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ChatModal } from './components/ChatModal';
import { CalculatorSection } from './components/CalculatorSection';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { PackagesSection } from './components/PackagesSection';
import { PackageSelectionGuide } from './components/PackageSelectionGuide';
import { PackagePurchaseModal } from './components/PackagePurchaseModal';
import { PrivacyPolicy } from './components/PrivacyPolicy';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy'>('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [purchaseModal, setPurchaseModal] = useState<{ isOpen: boolean; packageName: string }>({
    isOpen: false,
    packageName: ''
  });

  // Simple Hash Routing
  useEffect(() => {
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
    handleHashChange(); // Check on initial load

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePackageSelect = (name: string) => {
    setPurchaseModal({ isOpen: true, packageName: name });
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
        <PrivacyPolicy onBack={navigateToHome} />
        <Footer onPrivacyClick={navigateToPrivacy} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal text-white selection:bg-gold selection:text-charcoal font-sans">
      <Header onLogoClick={navigateToHome} />
      
      <Hero 
        onChatClick={() => setIsChatOpen(true)} 
        onProductClick={() => {
          const section = document.getElementById('packages');
          if (section) section.scrollIntoView({ behavior: 'smooth' });
        }}
      />
      
      <ProblemSection />

      <CalculatorSection />

      <PackageSelectionGuide />

      <PackagesSection onPackageSelect={handlePackageSelect} />
      
      <ProductSpotlight />
      
      <SocialProof />

      <TestimonialCarousel />
      
      <OfferSection />

      <RiskReversal />
      
      <LeadMagnet />

      <FAQ />
      
      <Footer onPrivacyClick={navigateToPrivacy} />

      <ChatModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />

      <PackagePurchaseModal 
        isOpen={purchaseModal.isOpen}
        packageName={purchaseModal.packageName}
        onClose={() => setPurchaseModal({ ...purchaseModal, isOpen: false })}
      />
    </div>
  );
}

export default App;
