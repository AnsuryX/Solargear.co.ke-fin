
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Loader2, Database, MessageCircle, Calendar, ExternalLink, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { trackLeadSubmission, trackWhatsAppClick, trackEvent } from '../lib/analytics';
import { motion } from 'framer-motion';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillMessage?: string | null;
}

const CALENDLY_URL = "https://calendly.com/solargearlrd/30min";
const WHATSAPP_FALLBACK = "I'm having a temporary connection issue. Please try again in a moment or use the WhatsApp option to connect directly with our engineers.";

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, prefillMessage }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi 👋 Welcome to Solar Gear. Are you looking for a solar solution for your Home, Business, or an Apartment here in Nairobi? 😊' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasPrefilled = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && prefillMessage && !hasPrefilled.current) {
      hasPrefilled.current = true;
      handleSend(prefillMessage);
    }
  }, [isOpen, prefillMessage]);

  const handleSend = async (textToOverride?: string) => {
    const textToSend = textToOverride || inputValue;
    if (!textToSend.trim() || isLoading) return;

    if (!textToOverride) setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(textToSend);
      const isSystemError = responseText.includes("temporary connection issue") || responseText.includes("WhatsApp option");
      const isBookingReady = responseText.includes("calendly.com") || responseText.includes("book your slot");
      
      if (responseText.toLowerCase().includes("notified our engineering") || responseText.toLowerCase().includes("details received")) {
        trackLeadSubmission('chat'); 
      }

      setMessages(prev => [...prev, { 
        role: 'model', 
        text: responseText, 
        isError: isSystemError,
        isBooking: isBookingReady
      }]);
    } catch (error) {
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: WHATSAPP_FALLBACK, 
          isError: true 
        }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleWhatsAppEscalation = () => {
    trackWhatsAppClick('chat_modal');
    window.open("https://wa.me/254722371250?text=Hi%20Solar%20Gear%2C%20I'm%20chatting%20with%20your%20AI%20but%20want%20to%20speak%20with%20a%20human%20engineer%20now.", "_blank");
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ y: 100, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 100, scale: 0.95 }}
        className="bg-[#1A1A1A] w-full max-w-lg rounded-t-[2rem] md:rounded-3xl border border-white/10 shadow-2xl flex flex-col h-[85vh] md:h-[650px] overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-white/10 flex justify-between items-center bg-[#222]">
          <div className="flex items-center gap-3">
            <div className="bg-gold/20 p-2.5 rounded-xl text-gold">
                <Sparkles size={20} />
            </div>
            <div>
                <h3 className="text-white font-bold text-sm">Engineer AI Hub</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Live in Nairobi</p>
                </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleWhatsAppEscalation}
              className="bg-[#25D366]/10 text-[#25D366] px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-[#25D366]/20 hover:bg-[#25D366] hover:text-white transition-all hidden sm:flex items-center gap-2"
            >
              <MessageCircle size={14} /> WhatsApp
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-charcoal custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[90%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-gold text-charcoal font-bold rounded-tr-none' 
                    : msg.isError 
                      ? 'bg-red-500/10 text-red-200 border border-red-500/20 rounded-tl-none shadow-lg'
                      : 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-none shadow-lg'
                }`}
              >
                {msg.text}
                
                {(msg.isError || msg.isBooking || msg.text.includes(CALENDLY_URL)) && (
                  <div className="mt-4 flex flex-col gap-2">
                    <a 
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-gold text-charcoal py-3 px-4 rounded-xl font-black text-xs hover:bg-gold-light transition-all shadow-lg shadow-gold/20"
                    >
                      <Calendar size={14} /> Book Site Visit <ExternalLink size={12} />
                    </a>
                    {msg.isError && (
                      <button 
                        onClick={handleWhatsAppEscalation}
                        className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-4 rounded-xl font-bold text-xs hover:bg-[#1ebc57] transition-colors"
                      >
                        <MessageCircle size={14} /> Talk to Human Engineer
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex justify-start">
               <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10 flex flex-col gap-2">
                 <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                 </div>
                 <div className="text-[10px] text-gray-500 uppercase tracking-tighter flex items-center gap-1 font-bold">
                   <Database size={10} className="animate-pulse" /> Engineering Link Active...
                 </div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 md:p-6 border-t border-white/10 bg-[#222]">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your solar question..." 
              className="flex-1 bg-[#111] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-gold transition-colors text-[15px]"
              autoFocus
            />
            <button 
              onClick={() => handleSend()}
              disabled={isLoading || !inputValue.trim()}
              className="bg-gold hover:bg-gold-light text-charcoal p-4 rounded-2xl disabled:opacity-50 transition-all shadow-lg shadow-gold/10 active:scale-95 shrink-0"
            >
              <Send size={24} />
            </button>
          </div>
          <p className="text-center text-[9px] text-gray-600 uppercase tracking-widest font-black mt-4">
            AI can make errors. For critical specs, always talk to a human engineer.
          </p>
        </div>
      </motion.div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </motion.div>
  );
};
