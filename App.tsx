
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

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

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

      <PackagesSection />
      
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
    </div>
  );
}

export default App;
