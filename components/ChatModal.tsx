
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Loader2, Database } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi 👋 Welcome to Solar Gear. I’ll ask you a few quick questions to see if solar is a good fit for you (takes under 1 minute). Deal? 😊' }
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
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
        setMessages(prev => [...prev, { role: 'model', text: "Connection interrupted. Please try again or WhatsApp us.", isError: true }]);
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
                <h3 className="text-white font-bold text-sm">Solar Consultant</h3>
                <p className="text-xs text-green-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Lead Qualification Mode
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
                    : 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-none'
                }`}
              >
                {msg.text}
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
                   <Database size={10} className="animate-pulse" /> Analyzing Lead Quality...
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
          <p className="text-[10px] text-gray-600 mt-2 text-center uppercase tracking-widest font-bold flex items-center justify-center gap-2">
            SECURE LEAD TRANSFER ENCRYPTED
          </p>
        </div>
      </div>
    </div>
  );
};
