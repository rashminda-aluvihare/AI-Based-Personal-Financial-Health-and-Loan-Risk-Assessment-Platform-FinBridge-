"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { chatbotKnowledge } from '@/lib/mock-data';
import { MessageSquare, X, Send, Sparkles, User, Bot } from 'lucide-react';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export default function ChatBubble() {
  const { language } = useAppStore();
  const t = translations[language];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize with intro message
  useEffect(() => {
    setMessages([
      {
        sender: 'ai',
        text: t.chatIntro
      }
    ]);
  }, [language, t.chatIntro]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputValue('');
    setIsTyping(true);

    // AI simulation delay
    setTimeout(() => {
      let aiText = "";
      const lowerText = userText.toLowerCase();

      // Find keywords
      const matched = chatbotKnowledge.find(item => 
        item.keywords.some(keyword => lowerText.includes(keyword.toLowerCase()))
      );

      if (matched) {
        aiText = language === 'si' ? matched.responseSi : language === 'ta' ? matched.responseTa : matched.responseEn;
      } else {
        aiText = language === 'si' 
          ? "මම සමාවෙන්නෙමි. මට ණය, ඩිජිටල් පසුම්බි සහ ණය අවදානම් තක්සේරුව ගැන සරල ප්‍රශ්න ඇසීමට හැකිය." 
          : language === 'ta' 
          ? "மன்னிக்கவும், நுண்கடன்கள், டிஜிட்டல் வாலட் மற்றும் கடன் அபாய மதிப்பீடு பற்றிய எளிய கேள்விகளை என்னிடம் கேட்கலாம்." 
          : "I'm sorry, I couldn't quite find that. Ask me about credit scores, wallet balances, loan rates, or how to apply.";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiText }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestion = (question: string) => {
    setInputValue(question);
  };

  const suggestions = [
    language === 'si' ? "ණය ලකුණු වැඩි කරන්නේ කෙසේද?" : language === 'ta' ? "கடன் மதிப்பெண்ணை எவ்வாறு அதிகரிப்பது?" : "How to improve credit score?",
    language === 'si' ? "පොලී අනුපාත කීයද?" : language === 'ta' ? "வட்டி விகிதங்கள் என்ன?" : "What are the interest rates?",
    language === 'si' ? "පසුම්බිය ක්‍රියා කරන්නේ කෙසේද?" : language === 'ta' ? "வாலட் எவ்வாறு வேலை செய்கிறது?" : "How does the wallet work?"
  ];

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50">
      {/* Bubble Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#6C63FF] to-[#00D4AA] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(108,99,255,0.4)] hover:scale-105 transition-transform duration-200"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] rounded-2xl border border-white/10 bg-[#111827]/95 backdrop-blur-lg flex flex-col justify-between shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#6C63FF] to-[#00D4AA] flex items-center justify-between">
            <div className="flex items-center space-x-2 text-white">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <div>
                <h3 className="font-semibold text-sm">{t.chatWithAI}</h3>
                <span className="text-[10px] text-white/80 font-mono">Powered by FinBridge AI</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/85 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[340px]"
          >
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex items-start space-x-2.5 ${msg.sender === 'user' ? 'justify-end' : ''}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-[#6C63FF] text-white rounded-tr-none' 
                    : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none text-xs text-slate-400 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions & Input */}
          <div className="p-4 border-t border-white/10 bg-[#0A0E1A] space-y-3">
            {/* Suggestions Chips */}
            {messages.length === 1 && !isTyping && (
              <div className="flex flex-wrap gap-1.5">
                {suggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestion(s)}
                    className="text-[10px] px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder={t.chatPlaceholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#6C63FF]"
              />
              <button
                onClick={handleSend}
                className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#6C63FF] to-[#00D4AA] flex items-center justify-center text-white hover:scale-105 transition"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
