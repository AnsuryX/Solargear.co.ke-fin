
import React, { useState } from 'react';
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

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [purchaseModal, setPurchaseModal] = useState<{ isOpen: boolean; packageName: string }>({
    isOpen: false,
    packageName: ''
  });

  const handlePackageSelect = (name: string) => {
    setPurchaseModal({ isOpen: true, packageName: name });
  };

  return (
    <div className="min-h-screen bg-charcoal text-white selection:bg-gold selection:text-charcoal font-sans">
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
      
      <Footer />

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
