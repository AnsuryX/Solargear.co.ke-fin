
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Loader2, Database, MessageCircle, Calendar, ExternalLink } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CALENDLY_URL = "https://calendly.com/solargearlrd/30min";

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi 👋 Welcome to Solar Gear. Are you looking for a solar solution for your Home, Business, or an Apartment here in Nairobi? 😊' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userText);
      const isSystemError = responseText.includes("technical glitch") || responseText.includes("sync error");
      const isBookingReady = responseText.includes("calendly.com") || responseText.includes("book your slot");
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: responseText, 
        isError: isSystemError,
        isBooking: isBookingReady
      }]);
    } catch (error) {
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: "I'm having trouble connecting. Please book your Free 30-min Solar Assessment directly via our calendar.", 
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#1A1A1A] w-full max-w-lg rounded-xl border border-white/10 shadow-2xl flex flex-col h-[600px] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#222]">
          <div className="flex items-center gap-3">
            <div className="bg-gold/20 p-2 rounded-full text-gold">
                <Bot size={20} />
            </div>
            <div>
                <h3 className="text-white font-bold text-sm">Solar Expert AI</h3>
                <p className="text-xs text-gold flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse"></span>
                    Fast Track Engineering
                </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-charcoal">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-gold text-charcoal font-semibold rounded-tr-none' 
                    : msg.isError 
                      ? 'bg-red-500/10 text-red-200 border border-red-500/20 rounded-tl-none'
                      : 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-none'
                }`}
              >
                {msg.text}
                
                {(msg.isError || msg.isBooking || msg.text.includes(CALENDLY_URL)) && (
                  <div className="mt-4 flex flex-col gap-2">
                    <a 
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-gold text-charcoal py-3 px-4 rounded-lg font-black text-xs hover:bg-gold-light transition-all shadow-lg shadow-gold/20"
                    >
                      <Calendar size={14} /> Book Free 30-min Assessment <ExternalLink size={12} />
                    </a>
                    {msg.isError && (
                      <a 
                        href="https://wa.me/254722371250?text=Hi%2C%20I'm%20having%20trouble%20with%20the%20AI%20chat%20but%20want%20to%20book%20my%20solar%20assessment."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-2 px-4 rounded-lg font-bold text-xs hover:bg-[#1ebc57] transition-colors"
                      >
                        <MessageCircle size={14} /> Talk on WhatsApp
                      </a>
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
        <div className="p-4 border-t border-white/10 bg-[#222]">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer..." 
              className="flex-1 bg-[#111] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-gold transition-colors text-sm"
              autoFocus
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className="bg-gold hover:bg-gold-light text-charcoal p-4 rounded-xl disabled:opacity-50 transition-colors shadow-lg shadow-gold/10"
            >
              <Send size={20} />
            </button>
          </div>
          <div className="flex justify-center gap-4 mt-3">
             <p className="text-[9px] text-gray-600 uppercase tracking-widest font-bold">Verified Engineering Portal</p>
          </div>
        </div>
      </div>
    </div>
  );
};
