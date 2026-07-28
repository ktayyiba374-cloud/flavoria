import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, X, MessageSquare, Bot, HelpCircle, RefreshCw } from 'lucide-react';
import { MenuItem } from '../types';

interface ChefMascotAssistantProps {
  language: 'EN' | 'UR';
  setLanguage: (lang: 'EN' | 'UR') => void;
  currency: 'USD' | 'PKR';
  menuItems: MenuItem[];
  onNavigate: (view: string) => void;
  onAddToCart: (item: MenuItem) => void;
}

export default function ChefMascotAssistant({
  language,
  setLanguage,
  currency,
  menuItems,
  onNavigate,
  onAddToCart
}: ChefMascotAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting
  useEffect(() => {
    const greeting = language === 'EN' 
      ? "Welcome to Flavoria, my esteemed guest! I am Chef Antonio, your interactive AI guide. Allow me to recommend a fine vintage or book your gold-trimmed table. What is your desire today?"
      : "فلیوریا میں خوش آمدید، معزز مہمان! میں شیف انتونیو ہوں، آپ کا باہمی فعال AI گائیڈ۔ مجھے آپ کے لیے ایک بہترین ڈش تجویز کرنے یا ریزرویشن کرنے کی اجازت دیں۔";
    setMessages([{ role: 'assistant', content: greeting }]);
  }, [language]);

  // Scroll to bottom on message updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: messages
        })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch (err) {
      console.error(err);
      // Fallback
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: language === 'EN' 
            ? "I am reflecting on your request, my dear guest. Rest assured, our kitchen operates at Michelin-star level. Try asking me about Grilled Salmon or our 2-hour refund policy!"
            : "میں آپ کی درخواست پر غور کر رہا ہوں، میرے پیارے مہمان۔ ہماری کچن مچلین اسٹار سطح پر کام کرتی ہے۔"
        }]);
      }, 800);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestedAction = (text: string, sendNow = true) => {
    if (sendNow) {
      setInputValue(text);
      // We set a small timeout so the input value updates and sends
      setTimeout(() => {
        const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
        // Trigger send
        setInputValue(text);
        // We will call direct
        setMessages(prev => [...prev, { role: 'user', content: text }]);
        setIsTyping(true);
        fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, history: messages })
        })
        .then(res => res.json())
        .then(data => {
          setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
        })
        .catch(() => {
          setMessages(prev => [...prev, { role: 'assistant', content: "Our culinary databases are being polished. Try again!" }]);
        })
        .finally(() => setIsTyping(false));
      }, 50);
    } else {
      setInputValue(text);
    }
  };

  // Quick navigation helpers inside chatbot
  const handleNav = (view: string) => {
    onNavigate(view);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Interactive Floating Chat UI */}
      {isOpen && (
        <div className="pointer-events-auto mb-4 w-[360px] md:w-[400px] h-[520px] rounded-3xl bg-[#0D0D0D]/95 border border-[#D4AF37]/40 shadow-[0_10px_40px_rgba(212,175,55,0.15)] flex flex-col overflow-hidden backdrop-blur-xl animate-scale-up">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#1C1A17] to-[#0D0D0D] border-b border-[#D4AF37]/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full border border-[#D4AF37]/50 bg-black flex items-center justify-center overflow-hidden">
                  <div className="text-xl">👨‍🍳</div>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-black" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-white text-sm tracking-widest flex items-center gap-1">
                  CHEF ANTONIO
                  <Sparkles className="h-3 w-3 text-[#D4AF37]" />
                </h4>
                <p className="text-[10px] text-emerald-400 uppercase font-mono tracking-wider">Online • Michelin Chef AI</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setLanguage(language === 'EN' ? 'UR' : 'EN')} 
                className="px-2 py-0.5 rounded text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 hover:bg-[#D4AF37]/20 font-mono transition-all"
              >
                {language === 'EN' ? 'Urdu' : 'English'}
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs custom-scrollbar">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed shadow-md ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-[#D4AF37]/95 to-[#AA7C11] text-[#0D0D0D] font-medium rounded-tr-none'
                    : 'bg-[#1C1A17] text-gray-200 border border-[#D4AF37]/10 rounded-tl-none whitespace-pre-line'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start items-center gap-2 text-gray-400 animate-pulse">
                <div className="bg-[#1C1A17] rounded-2xl rounded-tl-none px-4 py-3 border border-[#D4AF37]/10 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Actions */}
          <div className="px-4 py-2 border-t border-[#D4AF37]/10 bg-black/40 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
            <button 
              onClick={() => handleSuggestedAction(language === 'EN' ? 'Recommend today specials' : 'آج کی خاص پیشکش بتائیں')}
              className="px-2.5 py-1 rounded-full bg-[#1C1A17] border border-[#D4AF37]/20 text-[10px] text-gray-300 hover:border-[#D4AF37] hover:text-white transition-all"
            >
              ⭐️ {language === 'EN' ? 'Today\'s Specials' : 'آج کی اسپیشل'}
            </button>
            <button 
              onClick={() => handleSuggestedAction(language === 'EN' ? 'What are calories in Grilled Salmon?' : 'سالمون فش کی کیلوریز کیا ہیں؟')}
              className="px-2.5 py-1 rounded-full bg-[#1C1A17] border border-[#D4AF37]/20 text-[10px] text-gray-300 hover:border-[#D4AF37] hover:text-white transition-all"
            >
              🔥 {language === 'EN' ? 'Calories & Ingredients' : 'کیلوریز اور اجزاء'}
            </button>
            <button 
              onClick={() => handleSuggestedAction(language === 'EN' ? 'What is your refund policy?' : 'رقم کی واپسی کی پالیسی کیا ہے؟')}
              className="px-2.5 py-1 rounded-full bg-[#1C1A17] border border-[#D4AF37]/20 text-[10px] text-gray-300 hover:border-[#D4AF37] hover:text-white transition-all"
            >
              🛡️ {language === 'EN' ? 'Refund Policy' : 'رقم واپسی پالیسی'}
            </button>
            <button 
              onClick={() => handleNav('Reservations')}
              className="px-2.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[10px] text-[#D4AF37] hover:bg-[#D4AF37]/30 transition-all font-medium"
            >
              📅 {language === 'EN' ? 'Book VIP Table' : 'میز بک کریں'}
            </button>
          </div>

          {/* Quick Page Jumps */}
          <div className="px-4 py-1.5 bg-[#0D0D0D] border-t border-[#D4AF37]/10 flex items-center justify-between text-[10px] text-gray-400 font-mono">
            <span>QUICK NAV:</span>
            <div className="flex gap-2.5">
              <button onClick={() => handleNav('Full Menu')} className="hover:text-[#D4AF37] uppercase transition-all">Menu</button>
              <button onClick={() => handleNav('About Restaurant')} className="hover:text-[#D4AF37] uppercase transition-all">About</button>
              <button onClick={() => handleNav('Admin Dashboard')} className="hover:text-[#D4AF37] uppercase transition-all text-[#D4AF37]">Admin</button>
              <button onClick={() => handleNav('Loyalty Rewards')} className="hover:text-[#D4AF37] uppercase transition-all">Loyalty</button>
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-[#131313] border-t border-[#D4AF37]/20 flex gap-2">
            <input
              type="text"
              placeholder={language === 'EN' ? "Whisper your culinary desires..." : "اپنا سوال لکھیں..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-black border border-[#D4AF37]/20 rounded-xl px-3.5 py-2 text-white outline-none focus:border-[#D4AF37] text-xs transition-colors"
            />
            <button 
              type="submit"
              className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0D0D0D] flex items-center justify-center hover:scale-105 transition-transform shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Mascot character & trigger button container */}
      <div className="pointer-events-auto flex items-end gap-3 select-none">
        
        {/* Smiling 3D-feeling Master Chef Mascot */}
        <div className="flex flex-col items-center">
          {/* Subtle speech bubble */}
          <div className="mb-2 bg-gradient-to-r from-[#1C1A17]/90 to-[#0D0D0D]/90 border border-[#D4AF37]/40 text-white rounded-2xl px-3 py-1.5 text-[10px] font-sans font-medium shadow-[0_4px_15px_rgba(212,175,55,0.1)] tracking-wide animate-bounce">
            {language === 'EN' ? 'Talk to Chef Antonio! ✨' : 'شیف سے بات کریں! ✨'}
          </div>

          {/* 3D Chef Character Vector Representation with CSS Animations */}
          <div 
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer relative group transition-transform duration-300 hover:scale-105"
            style={{
              animation: 'chef-floating 4s ease-in-out infinite'
            }}
          >
            <div className="w-20 h-20 relative flex items-center justify-center">
              {/* Outer Golden Glow Aura */}
              <div className="absolute inset-0 bg-[#D4AF37]/15 rounded-full blur-xl group-hover:bg-[#D4AF37]/25 transition-all duration-300" />
              
              {/* SVG Character */}
              <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
                {/* 1. Chef Uniform Collar (Gold/Black) */}
                <path d="M 30 75 Q 50 90 70 75 L 65 92 Q 50 98 35 92 Z" fill="#1C1A17" stroke="#D4AF37" strokeWidth="1.5" />
                <path d="M 40 78 L 50 88 L 60 78" fill="none" stroke="#D4AF37" strokeWidth="2" />
                
                {/* 2. Smiling Chef Face */}
                <circle cx="50" cy="55" r="22" fill="#FFE0BD" stroke="#3A2512" strokeWidth="1" />
                
                {/* Blush on Cheeks */}
                <circle cx="36" cy="58" r="3.5" fill="#FFB6C1" opacity="0.6" />
                <circle cx="64" cy="58" r="3.5" fill="#FFB6C1" opacity="0.6" />

                {/* Blinking Eyes */}
                <g style={{ animation: 'chef-blinking 4s infinite' }}>
                  <circle cx="42" cy="50" r="2.5" fill="#2E1C0C" />
                  <circle cx="58" cy="50" r="2.5" fill="#2E1C0C" />
                  {/* Eye Highlights */}
                  <circle cx="41.5" cy="49" r="0.8" fill="#FFFFFF" />
                  <circle cx="57.5" cy="49" r="0.8" fill="#FFFFFF" />
                </g>

                {/* Friendly Smile */}
                <path d="M 40 58 Q 50 68 60 58" fill="none" stroke="#2E1C0C" strokeWidth="2.5" strokeLinecap="round" />
                
                {/* Friendly Mustache (Michelin Style) */}
                <path d="M 38 58 Q 44 56 49 59 Q 44 62 38 58 Z" fill="#2E1C0C" />
                <path d="M 62 58 Q 56 56 51 59 Q 56 62 62 58 Z" fill="#2E1C0C" />

                {/* 3. Waving Arm / Pointing Arm towards Chat Box (Points Right and Up) */}
                <g style={{ animation: 'chef-waving 3s ease-in-out infinite' }}>
                  {/* Sleeve */}
                  <path d="M 68 66 L 82 58 L 86 64 L 70 73 Z" fill="#0D0D0D" stroke="#D4AF37" strokeWidth="1" />
                  {/* Golden Cuffs */}
                  <line x1="82" y1="58" x2="86" y2="64" stroke="#D4AF37" strokeWidth="2" />
                  {/* Pointing/Waving Hand */}
                  <circle cx="86" cy="59" r="4.5" fill="#FFE0BD" />
                  {/* Thumb pointing up */}
                  <path d="M 85 55 Q 89 50 91 53" fill="none" stroke="#FFE0BD" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* 4. Chef Hat (Tall, Pristine White with gold fold accents) */}
                <path d="M 32 38 Q 22 20 40 22 Q 50 14 60 22 Q 78 20 68 38 Z" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1.5" />
                {/* Hat Base Band */}
                <path d="M 31 38 C 31 36 69 36 69 38 L 68 41 C 68 41 32 41 32 41 Z" fill="#F3F0EC" stroke="#2E1C0C" strokeWidth="1" />
                {/* Gold Medallion on Hat */}
                <circle cx="50" cy="30" r="3" fill="#D4AF37" />
                <path d="M 49 29 L 51 31 M 51 29 L 49 31" stroke="#0D0D0D" strokeWidth="0.8" />
              </svg>

              {/* Little Floating Golden Star Particles */}
              <div className="absolute top-1 left-2 w-2 h-2 bg-[#D4AF37] rounded-full animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute bottom-2 left-1 w-1.5 h-1.5 bg-[#D4AF37] rounded-full opacity-60 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Floating Chat Circle button (Glassmorphism with golden ripple) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300 ${
            isOpen
              ? 'bg-[#D4AF37] text-[#0D0D0D] border-[#D4AF37] rotate-90 shadow-[0_0_20px_#D4AF37]'
              : 'bg-black/95 text-[#D4AF37] border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]'
          }`}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </button>
      </div>

      {/* Embedded CSS Animations */}
      <style>{`
        @keyframes chef-floating {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(1deg); }
        }
        @keyframes chef-blinking {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        @keyframes chef-waving {
          0%, 100% { transform: rotate(0deg); transform-origin: 65px 70px; }
          50% { transform: rotate(-8deg); transform-origin: 65px 70px; }
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0D0D0D;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #D4AF37;
          border-radius: 99px;
        }
      `}</style>

    </div>
  );
}
