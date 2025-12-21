
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

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleReserveScroll = () => {
    const section = document.getElementById('reserve');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-charcoal text-white selection:bg-gold selection:text-charcoal font-sans">
      <Hero 
        onChatClick={() => setIsChatOpen(true)} 
        onProductClick={handleReserveScroll}
      />
      
      <ProblemSection />

      <CalculatorSection />
      
      <ProductSpotlight />
      
      <SocialProof />
      
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
