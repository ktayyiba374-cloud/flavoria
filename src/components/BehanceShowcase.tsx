import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Phone, 
  Mail, 
  Clock, 
  Flame, 
  TrendingUp, 
  User, 
  CreditCard,
  CheckCircle2,
  Lock,
  MessageSquare,
  ChevronRight,
  Shield,
  Briefcase,
  Gift,
  Award,
  ChevronDown
} from 'lucide-react';
import { MenuItem, Review, BlogPost, Order } from '../types';

interface BehanceShowcaseProps {
  menuItems: MenuItem[];
  blogPosts: BlogPost[];
  reviews: Review[];
  currency: 'USD' | 'PKR';
  language: 'EN' | 'UR';
  onNavigateToInteractive: (view: string) => void;
}

export default function BehanceShowcase({
  menuItems,
  blogPosts,
  reviews,
  currency,
  language,
  onNavigateToInteractive
}: BehanceShowcaseProps) {
  const [adminStats, setAdminStats] = useState({
    revenue: 52456,
    orders: 1248,
    customers: 2543,
    visitors: 23845
  });

  const currencySymbol = currency === 'USD' ? '$' : 'Rs';
  const exchangeRate = currency === 'USD' ? 1 : 278;

  const formatPrice = (val: number) => {
    return `${currencySymbol}${(val * exchangeRate).toFixed(2)}`;
  };

  return (
    <div className="bg-[#080808] text-white min-h-screen relative overflow-hidden font-sans p-4 md:p-8 selection:bg-[#D4AF37] selection:text-black">
      
      {/* Background radial soft gold gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#D4AF37]/5 to-transparent rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#D4AF37]/5 to-transparent rounded-full blur-[200px] pointer-events-none" />

      {/* Title Header */}
      <div className="text-center py-6 mb-12 relative z-10 border-b border-[#D4AF37]/10 pb-8">
        <div className="flex justify-center items-center gap-2 mb-3">
          <span className="h-[1.5px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <h2 className="text-[#D4AF37] font-mono uppercase tracking-[0.4em] text-xs font-semibold">Behance Quality Presentation</h2>
          <span className="h-[1.5px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-widest uppercase font-sans text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-100 to-[#D4AF37]/80">
          Flavoria Website &amp; Admin Board
        </h1>
        <p className="text-xs md:text-sm text-gray-400 mt-2 tracking-widest max-w-2xl mx-auto uppercase">
          A premium unified user experience &amp; enterprise operations suite for fine dining establishments.
        </p>
      </div>

      {/* Mockup Presentation Container */}
      <div className="max-w-[1600px] mx-auto space-y-16 relative z-10">
        
        {/* Row 1: The App screens mockup wall */}
        <div>
          <h3 className="text-lg font-bold tracking-widest text-center uppercase text-[#D4AF37] mb-8 flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-[#D4AF37] animate-pulse" />
            CUSTOMER-FACING DIGITAL TOUCHPOINTS (38 INTEGRATED EXPERIENCES)
            <Sparkles className="h-4 w-4 text-[#D4AF37] animate-pulse" />
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
            {/* Screen 1: Home Screen Hero */}
            <div className="bg-[#0D0D0D] border border-[#D4AF37]/30 rounded-3xl p-6 relative overflow-hidden group shadow-lg flex flex-col justify-between h-[520px]">
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#D4AF37]/10 to-transparent opacity-40" />
              <div className="flex justify-between items-center relative z-10 text-[9px] text-[#D4AF37] font-mono tracking-widest uppercase">
                <span>01. HOME HERO</span>
                <span>FLAVORIA</span>
              </div>

              <div className="my-auto space-y-4 relative z-10">
                <span className="text-[10px] tracking-widest uppercase text-[#D4AF37] font-mono bg-[#D4AF37]/10 px-2 py-0.5 rounded-full border border-[#D4AF37]/20 inline-block">Fine Dining 2026</span>
                <h4 className="text-3xl font-extrabold uppercase tracking-wide leading-tight">
                  Good Food<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-white">Good Mood</span>
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed max-w-[240px]">
                  Experience the perfect blend of taste, ambience, and Michelin-starred culinary artistry.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => onNavigateToInteractive('Reservations')}
                    className="px-5 py-2.5 bg-[#D4AF37] text-black font-bold uppercase text-[10px] tracking-widest rounded-full hover:scale-105 transition-all shadow-[0_4px_15px_rgba(212,175,55,0.3)]"
                  >
                    Book a Table
                  </button>
                </div>
              </div>

              <div className="relative border-t border-[#D4AF37]/10 pt-4 flex items-center justify-between">
                <div className="flex gap-4 text-[10px] text-gray-400">
                  <span className="flex items-center gap-1">⚡ Fast Delivery</span>
                  <span className="flex items-center gap-1">🌟 5-Star Quality</span>
                </div>
              </div>
            </div>

            {/* Screen 2: About Us */}
            <div className="bg-[#0D0D0D] border border-[#D4AF37]/20 rounded-3xl p-6 relative overflow-hidden group shadow-lg flex flex-col justify-between h-[520px]">
              <div className="flex justify-between items-center text-[9px] text-[#D4AF37] font-mono tracking-widest uppercase">
                <span>02. ABOUT RESTAURANT</span>
                <span>LEGACY</span>
              </div>

              <div className="my-auto space-y-4">
                <h4 className="text-2xl font-extrabold uppercase tracking-widest text-[#D4AF37]">Our Vision</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  "At Flavoria, we serve more than food; we compose orchestrations of culinary luxury."
                </p>
                <div className="grid grid-cols-3 gap-2 text-center pt-2">
                  <div className="p-2.5 bg-[#1C1A17] border border-[#D4AF37]/10 rounded-xl">
                    <span className="block text-sm font-bold text-[#D4AF37]">10+</span>
                    <span className="text-[9px] text-gray-400 uppercase tracking-widest">Years Experience</span>
                  </div>
                  <div className="p-2.5 bg-[#1C1A17] border border-[#D4AF37]/10 rounded-xl">
                    <span className="block text-sm font-bold text-[#D4AF37]">25+</span>
                    <span className="text-[9px] text-gray-400 uppercase tracking-widest">Master Chefs</span>
                  </div>
                  <div className="p-2.5 bg-[#1C1A17] border border-[#D4AF37]/10 rounded-xl">
                    <span className="block text-sm font-bold text-[#D4AF37]">50K+</span>
                    <span className="text-[9px] text-gray-400 uppercase tracking-widest">Happy Guests</span>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-gray-500 font-mono tracking-wider border-t border-[#D4AF37]/10 pt-4">
                MICHELIN STAR INSPIRED • FINE DINING
              </div>
            </div>

            {/* Screen 3: Interactive Menu Selection */}
            <div className="bg-[#0D0D0D] border border-[#D4AF37]/20 rounded-3xl p-6 relative overflow-hidden group shadow-lg flex flex-col justify-between h-[520px]">
              <div className="flex justify-between items-center text-[9px] text-[#D4AF37] font-mono tracking-widest uppercase">
                <span>03. FOOD CATEGORIES</span>
                <span>ELITE SELECTION</span>
              </div>

              <div className="my-auto space-y-3">
                <h4 className="text-xl font-bold text-white uppercase tracking-wider">Our Menu</h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['All', 'Starters', 'Main Course', 'Pizza', 'Desserts', 'Beverages'].map((cat, idx) => (
                    <span key={idx} className={`text-[9px] uppercase font-mono px-2 py-1 rounded-full border ${idx === 2 ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-[#1C1A17] text-gray-400 border-[#D4AF37]/10'}`}>
                      {cat}
                    </span>
                  ))}
                </div>

                <div className="space-y-2.5 pt-2">
                  {menuItems.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex gap-3 bg-[#131313] border border-[#D4AF37]/10 p-2 rounded-xl items-center">
                      <img src={item.image} className="w-10 h-10 rounded-lg object-cover border border-[#D4AF37]/20" alt="" />
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] font-bold block truncate text-white">{item.name}</span>
                        <span className="text-[10px] text-[#D4AF37] font-mono font-medium">{formatPrice(item.price)}</span>
                      </div>
                      <span className="w-5 h-5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 flex items-center justify-center text-xs font-bold">+</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => onNavigateToInteractive('Full Menu')}
                className="w-full py-2 bg-gradient-to-r from-[#1C1A17] to-[#0D0D0D] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[10px] text-[#D4AF37] uppercase tracking-widest rounded-xl transition-all"
              >
                Explore Full Menu
              </button>
            </div>

            {/* Screen 4: Food Details (3D presentation frame) */}
            <div className="bg-[#0D0D0D] border border-[#D4AF37]/30 rounded-3xl p-6 relative overflow-hidden group shadow-lg flex flex-col justify-between h-[520px]">
              <div className="flex justify-between items-center text-[9px] text-[#D4AF37] font-mono tracking-widest uppercase">
                <span>04. DETAILED SPECTACLE</span>
                <span>INGREDIENTS</span>
              </div>

              <div className="my-auto space-y-3">
                <img 
                  src={menuItems[0].image} 
                  className="w-full h-32 object-cover rounded-2xl border border-[#D4AF37]/30 shadow-[0_8px_20px_rgba(212,175,55,0.1)] hover:scale-105 transition-all" 
                  alt="" 
                />
                <h4 className="text-sm font-extrabold text-white truncate">{menuItems[0].name}</h4>
                <div className="flex justify-between items-center text-[11px] text-[#D4AF37] font-mono">
                  <span>PRICE: {formatPrice(menuItems[0].price)}</span>
                  <span className="bg-[#D4AF37]/10 px-2 py-0.5 rounded text-[9px]">🔥 {menuItems[0].calories} cal</span>
                </div>
                <div className="text-[10px] text-gray-400 space-y-1">
                  <p className="line-clamp-2">Fresh salmon fillet grilled and marinated in white butter herbs.</p>
                  <div className="flex flex-wrap gap-1 text-[8px] uppercase tracking-wider text-gray-300">
                    {menuItems[0].ingredients.map((ing, i) => (
                      <span key={i} className="bg-[#1C1A17] px-1.5 py-0.5 rounded border border-white/5">{ing}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => onNavigateToInteractive('Full Menu')}
                  className="py-2 bg-[#D4AF37] text-black font-bold uppercase text-[9px] tracking-wider rounded-xl hover:scale-102 transition-all"
                >
                  Order Now
                </button>
                <button 
                  onClick={() => onNavigateToInteractive('Wishlist')}
                  className="py-2 bg-[#1C1A17] border border-[#D4AF37]/30 text-white font-bold uppercase text-[9px] tracking-wider rounded-xl hover:text-[#D4AF37]"
                >
                  Add Wishlist
                </button>
              </div>
            </div>

            {/* Screen 5: Table Reservation */}
            <div className="bg-[#0D0D0D] border border-[#D4AF37]/20 rounded-3xl p-6 relative overflow-hidden group shadow-lg flex flex-col justify-between h-[520px]">
              <div className="flex justify-between items-center text-[9px] text-[#D4AF37] font-mono tracking-widest uppercase">
                <span>05. BOOK TABLE</span>
                <span>VIP GATEWAY</span>
              </div>

              <div className="my-auto space-y-3">
                <h4 className="text-xl font-bold uppercase text-[#D4AF37] tracking-wider">Book a Table</h4>
                <p className="text-[11px] text-gray-400">Secure your luxury gold-trimmed dining room instantly.</p>
                
                <div className="space-y-2">
                  <div className="bg-[#131313] border border-[#D4AF37]/10 p-2.5 rounded-xl flex items-center justify-between text-xs text-gray-300">
                    <span>Date:</span>
                    <span className="font-mono text-[#D4AF37] text-[11px]">July 03, 2026</span>
                  </div>
                  <div className="bg-[#131313] border border-[#D4AF37]/10 p-2.5 rounded-xl flex items-center justify-between text-xs text-gray-300">
                    <span>Time:</span>
                    <span className="font-mono text-[#D4AF37] text-[11px]">08:00 PM</span>
                  </div>
                  <div className="bg-[#131313] border border-[#D4AF37]/10 p-2.5 rounded-xl flex items-center justify-between text-xs text-gray-300">
                    <span>Guests:</span>
                    <span className="font-mono text-[#D4AF37] text-[11px]">4 Guests (VIP Lounge)</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => onNavigateToInteractive('Reservations')}
                className="w-full py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black font-bold uppercase text-[10px] tracking-widest rounded-xl hover:scale-102 transition-all"
              >
                Confirm Booking
              </button>
            </div>

            {/* Screen 6: Gourmet Contact */}
            <div className="bg-[#0D0D0D] border border-[#D4AF37]/20 rounded-3xl p-6 relative overflow-hidden group shadow-lg flex flex-col justify-between h-[520px]">
              <div className="flex justify-between items-center text-[9px] text-[#D4AF37] font-mono tracking-widest uppercase">
                <span>06. LUXURY CONTACT</span>
                <span>LOCATOR</span>
              </div>

              <div className="my-auto space-y-4">
                <h4 className="text-xl font-bold uppercase text-white tracking-widest">Connect</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-[#D4AF37] shrink-0" />
                    <span className="text-[11px] text-gray-400">123 Royal Forest, Flavor City, CA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-[#D4AF37] shrink-0" />
                    <span className="text-[11px] text-gray-400">+1 (234) 567 890</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-[#D4AF37] shrink-0" />
                    <span className="text-[11px] text-gray-400">ambassador@flavoria.com</span>
                  </div>
                </div>

                {/* Decorative gold mini map */}
                <div className="h-20 bg-gradient-to-br from-[#1C1A17] to-black rounded-xl border border-[#D4AF37]/20 flex items-center justify-center">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]">Interactive GPS Active</span>
                </div>
              </div>

              <div className="text-[9px] text-center text-gray-500 font-mono">
                FLAGSHIP BOUTIQUE OPEN 24/7
              </div>
            </div>

            {/* Screen 7: Gourmet Shopping Cart */}
            <div className="bg-[#0D0D0D] border border-[#D4AF37]/20 rounded-3xl p-6 relative overflow-hidden group shadow-lg flex flex-col justify-between h-[520px]">
              <div className="flex justify-between items-center text-[9px] text-[#D4AF37] font-mono tracking-widest uppercase">
                <span>07. GOURMET CART</span>
                <span>REAL-TIME BILL</span>
              </div>

              <div className="my-auto space-y-4">
                <h4 className="text-xl font-bold uppercase text-[#D4AF37] tracking-wider">Your Vault</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Grilled Salmon (x1)</span>
                    <span className="font-mono text-white">{formatPrice(24.99)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Truffle Pasta (x1)</span>
                    <span className="font-mono text-white">{formatPrice(21.99)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Lava Cake (x1)</span>
                    <span className="font-mono text-white">{formatPrice(9.99)}</span>
                  </div>
                </div>

                <div className="border-t border-[#D4AF37]/10 pt-3 space-y-1">
                  <div className="flex justify-between text-[11px] text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-mono">{formatPrice(56.97)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#D4AF37] font-bold">
                    <span>Total Bill</span>
                    <span className="font-mono">{formatPrice(61.97)}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => onNavigateToInteractive('Cart')}
                className="w-full py-2.5 bg-[#D4AF37] text-black font-bold uppercase text-[10px] tracking-widest rounded-xl hover:scale-102 transition-all"
              >
                Proceed to Checkout
              </button>
            </div>

            {/* Screen 8: Chef Antonio AI Chatbot */}
            <div className="bg-[#0C0C0C] border border-[#D4AF37]/40 rounded-3xl p-6 relative overflow-hidden group shadow-lg flex flex-col justify-between h-[520px]">
              {/* Golden neon corner glows */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex justify-between items-center text-[9px] text-[#D4AF37] font-mono tracking-widest uppercase">
                <span>08. AI RESTAURANT ASSISTANT</span>
                <span className="text-emerald-400 flex items-center gap-1">● ONLINE</span>
              </div>

              <div className="my-auto space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-black border border-[#D4AF37] flex items-center justify-center text-xs">👨‍🍳</div>
                  <div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-white">Chef Antonio</h5>
                    <p className="text-[8px] text-gray-500 font-mono">MICHELIN LEVEL ADVISOR</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="bg-[#1C1A17] p-2.5 rounded-xl border border-[#D4AF37]/15 text-[10px] text-gray-300 leading-relaxed rounded-tl-none">
                    "I highly recommend the **Beef Steak** paired with our signature **Saffron Espresso Martini** for an exceptional culinary harmony tonight!"
                  </div>
                </div>

                <div className="bg-black/30 p-2 rounded-xl border border-white/5 space-y-1.5">
                  <p className="text-[9px] text-gray-500 uppercase font-mono tracking-wider">AI Abilities:</p>
                  <ul className="text-[8.5px] text-gray-300 space-y-0.5">
                    <li>✓ Real-Time Smart Recommendation</li>
                    <li>✓ Complete Website Navigation Guidance</li>
                    <li>✓ Instant Urdu &amp; English Fluent Translation</li>
                    <li>✓ Nutrition &amp; Spice Customizer</li>
                  </ul>
                </div>
              </div>

              <button 
                onClick={() => onNavigateToInteractive('AI Assistant Page')}
                className="w-full py-2 bg-[#D4AF37] text-black font-bold uppercase text-[10px] tracking-widest rounded-xl hover:scale-102 transition-all"
              >
                Launch Chef Assistant
              </button>
            </div>

          </div>
        </div>

        {/* Core Value Proposition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-gradient-to-br from-[#121212] to-black border border-[#D4AF37]/20 p-8 rounded-3xl shadow-xl">
          <div className="space-y-2">
            <span className="text-2xl">🍽️</span>
            <h4 className="text-[#D4AF37] font-bold text-sm tracking-wider uppercase">38 Luxury Pages Included</h4>
            <p className="text-xs text-gray-400">Complete multi-page navigation encompassing Order Tracking, Loyalty Rewards, Chef Specials, and Careers.</p>
          </div>
          <div className="space-y-2">
            <span className="text-2xl">👨‍🍳</span>
            <h4 className="text-[#D4AF37] font-bold text-sm tracking-wider uppercase">Chef AI Assistant Widget</h4>
            <p className="text-xs text-gray-400">Floating chatbot in bottom-right corner with responsive 3D Vector mascot, blinking, waving, and fully trained database.</p>
          </div>
          <div className="space-y-2">
            <span className="text-2xl">🇵🇰 🇬🇧</span>
            <h4 className="text-[#D4AF37] font-bold text-sm tracking-wider uppercase">English / Urdu localization</h4>
            <p className="text-xs text-gray-400">Full linguistic integration with a single-click toggle. The AI responds naturally, adapting to user inputs.</p>
          </div>
          <div className="space-y-2">
            <span className="text-2xl">📈</span>
            <h4 className="text-[#D4AF37] font-bold text-sm tracking-wider uppercase">Shopify Admin Board</h4>
            <p className="text-xs text-gray-400">Robust backend control panel featuring sales growth, best-selling dishes, customer management and inventory settings.</p>
          </div>
        </div>

        {/* Row 2: Shopify-Inspired Luxury Admin Dashboard */}
        <div className="border border-[#D4AF37]/30 rounded-3xl bg-black/95 overflow-hidden shadow-2xl relative">
          
          {/* Dashboard Header Bar */}
          <div className="bg-[#0D0D0D] border-b border-[#D4AF37]/20 p-6 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#0D0D0D] border border-[#D4AF37]/50 flex items-center justify-center">
                <span className="text-white text-lg font-bold">F</span>
              </div>
              <div>
                <h4 className="font-extrabold uppercase text-white tracking-widest text-lg">FLAVORIA ADMIN PANEL</h4>
                <p className="text-[10px] text-gray-500 font-mono tracking-wider">SHOPIFY-INSPIRED ENTERPRISE ENGINE • YEAR 2026</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <span className="text-xs text-gray-400 block">Logged in as</span>
                <span className="text-xs text-[#D4AF37] font-bold font-mono">admin@flavoria.com (Owner)</span>
              </div>
              <div className="h-8 w-[1px] bg-[#D4AF37]/20 hidden sm:block" />
              <button 
                onClick={() => onNavigateToInteractive('Admin Dashboard')}
                className="px-4 py-2 bg-[#D4AF37] text-[#0D0D0D] font-extrabold uppercase text-xs tracking-widest rounded-lg hover:scale-105 transition-all"
              >
                Launch Admin Mode
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8 bg-[#0D0D0D]/60 backdrop-blur-md">
            
            {/* 4 Analytics Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-[#121212] border border-[#D4AF37]/15 p-5 rounded-2xl space-y-2 shadow-inner">
                <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest block">Total Sales (Revenue)</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl md:text-2xl font-bold font-mono text-[#D4AF37]">{formatPrice(adminStats.revenue)}</span>
                  <span className="text-[11px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full">+23.5%</span>
                </div>
                <div className="h-1.5 w-full bg-[#1C1A17] rounded-full overflow-hidden">
                  <div className="bg-[#D4AF37] h-full rounded-full" style={{ width: '80%' }} />
                </div>
              </div>

              <div className="bg-[#121212] border border-[#D4AF37]/15 p-5 rounded-2xl space-y-2 shadow-inner">
                <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest block">Gourmet Orders</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl md:text-2xl font-bold font-mono text-white">{adminStats.orders}</span>
                  <span className="text-[11px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full">+18.2%</span>
                </div>
                <div className="h-1.5 w-full bg-[#1C1A17] rounded-full overflow-hidden">
                  <div className="bg-white h-full rounded-full" style={{ width: '65%' }} />
                </div>
              </div>

              <div className="bg-[#121212] border border-[#D4AF37]/15 p-5 rounded-2xl space-y-2 shadow-inner">
                <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest block">Loyal Customers</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl md:text-2xl font-bold font-mono text-white">{adminStats.customers}</span>
                  <span className="text-[11px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full">+16.7%</span>
                </div>
                <div className="h-1.5 w-full bg-[#1C1A17] rounded-full overflow-hidden">
                  <div className="bg-[#D4AF37] h-full rounded-full" style={{ width: '75%' }} />
                </div>
              </div>

              <div className="bg-[#121212] border border-[#D4AF37]/15 p-5 rounded-2xl space-y-2 shadow-inner">
                <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest block">Platform Visitors</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl md:text-2xl font-bold font-mono text-white">{adminStats.visitors}</span>
                  <span className="text-[11px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full">+25.1%</span>
                </div>
                <div className="h-1.5 w-full bg-[#1C1A17] rounded-full overflow-hidden">
                  <div className="bg-white h-full rounded-full" style={{ width: '90%' }} />
                </div>
              </div>

            </div>

            {/* Middle Row: Sales Over Time Graph & Popular Categories Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Sales Graph Mock */}
              <div className="lg:col-span-2 bg-[#121212] border border-[#D4AF37]/15 p-6 rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-white text-sm uppercase tracking-wider">Revenue Growth Over Time</h5>
                    <p className="text-[10px] text-gray-500">May 20 - Jun 20, 2026</p>
                  </div>
                  <span className="text-xs text-[#D4AF37] font-mono border border-[#D4AF37]/30 px-3 py-1 rounded-full bg-black/40">Gourmet Sales Peak</span>
                </div>

                {/* Simulated SVG Graph */}
                <div className="h-44 w-full relative pt-2">
                  <svg viewBox="0 0 500 150" className="w-full h-full">
                    {/* Grid lines */}
                    <line x1="0" y1="30" x2="500" y2="30" stroke="#FFFFFF" strokeOpacity="0.05" strokeDasharray="5,5" />
                    <line x1="0" y1="75" x2="500" y2="75" stroke="#FFFFFF" strokeOpacity="0.05" strokeDasharray="5,5" />
                    <line x1="0" y1="120" x2="500" y2="120" stroke="#FFFFFF" strokeOpacity="0.05" strokeDasharray="5,5" />
                    
                    {/* Fill Area */}
                    <path
                      d="M 0 150 L 50 120 L 100 135 L 150 90 L 200 100 L 250 65 L 300 80 L 350 45 L 400 60 L 450 25 L 500 35 L 500 150 Z"
                      fill="url(#goldGradientFill)"
                      opacity="0.1"
                    />
                    
                    {/* Glowing Stroke line */}
                    <path
                      d="M 0 150 L 50 120 L 100 135 L 150 90 L 200 100 L 250 65 L 300 80 L 350 45 L 400 60 L 450 25 L 500 35"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="3.5"
                    />

                    {/* Dots */}
                    <circle cx="250" cy="65" r="5" fill="#D4AF37" stroke="#0D0D0D" strokeWidth="2" />
                    <circle cx="450" cy="25" r="5" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="2" />

                    <defs>
                      <linearGradient id="goldGradientFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D4AF37" />
                        <stop offset="100%" stopColor="#0D0D0D" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Tooltip on graph */}
                  <div className="absolute top-10 left-[48%] bg-[#0D0D0D] border border-[#D4AF37] px-2 py-1 rounded text-[9px] font-mono shadow-md text-center">
                    <span className="block text-[#D4AF37] font-bold">Peak Dinner Sale</span>
                    <span className="text-gray-400">{formatPrice(5430)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-[9px] text-gray-500 font-mono tracking-wider pt-2 border-t border-white/5">
                  <span>MAY 20</span>
                  <span>MAY 27</span>
                  <span>JUN 03</span>
                  <span>JUN 10</span>
                  <span>JUN 17</span>
                  <span>JUN 20</span>
                </div>
              </div>

              {/* Pie Chart / Best Selling categories */}
              <div className="bg-[#121212] border border-[#D4AF37]/15 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
                <div>
                  <h5 className="font-bold text-white text-sm uppercase tracking-wider">Top Categories</h5>
                  <p className="text-[10px] text-gray-500">Order Share by Cuisine</p>
                </div>

                <div className="flex justify-center py-2 relative">
                  {/* Beautiful SVG Donut Chart */}
                  <svg width="120" height="120" viewBox="0 0 42 42" className="transform -rotate-90">
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#1C1A17" strokeWidth="4.5" />
                    {/* Main Course Share (45%) */}
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#D4AF37" strokeWidth="4.5" strokeDasharray="45 55" strokeDashoffset="0" />
                    {/* Pizza Share (25%) */}
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#FFF" strokeWidth="4.5" strokeDasharray="25 75" strokeDashoffset="-45" />
                    {/* Desserts Share (15%) */}
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#888" strokeWidth="4.5" strokeDasharray="15 85" strokeDashoffset="-70" />
                    {/* Drinks (15%) */}
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#444" strokeWidth="4.5" strokeDasharray="15 85" strokeDashoffset="-85" />
                  </svg>
                  
                  {/* Overlay text inside Donut */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xs font-bold text-white font-mono">45%</span>
                    <span className="text-[7.5px] text-gray-500 uppercase tracking-widest">Main Course</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-400 font-mono border-t border-white/5 pt-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-[#D4AF37] rounded-sm" />
                    <span>Main Course (45%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-white rounded-sm" />
                    <span>Pizza (25%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-gray-400 rounded-sm" />
                    <span>Desserts (15%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-gray-700 rounded-sm" />
                    <span>Beverages (15%)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Row: Order Register, Products Inventory, Customer Base, Sales Channel Bar */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              
              {/* Order Register Table */}
              <div className="xl:col-span-2 bg-[#121212] border border-[#D4AF37]/15 p-6 rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <h5 className="font-bold text-white text-xs uppercase tracking-wider">Active Culinary Orders</h5>
                  <span className="text-[9px] text-gray-400 font-mono bg-[#1C1A17] px-2.5 py-1 rounded-full border border-white/5">Queue Monitor</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] font-mono">
                    <thead>
                      <tr className="border-b border-[#D4AF37]/20 text-gray-500 uppercase text-[9px] tracking-wider">
                        <th className="pb-2">Order</th>
                        <th className="pb-2">Customer</th>
                        <th className="pb-2">Total</th>
                        <th className="pb-2">Payment</th>
                        <th className="pb-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr>
                        <td className="py-3 text-[#D4AF37] font-bold">#1025</td>
                        <td className="py-3 text-white">John Doe</td>
                        <td className="py-3">{formatPrice(64.97)}</td>
                        <td className="py-3 text-gray-400">Card</td>
                        <td className="py-3 text-right">
                          <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase">Delivered</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 text-[#D4AF37] font-bold">#1024</td>
                        <td className="py-3 text-white">Emma Watson</td>
                        <td className="py-3">{formatPrice(40.98)}</td>
                        <td className="py-3 text-gray-400">PayPal</td>
                        <td className="py-3 text-right">
                          <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase">Delivered</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 text-[#D4AF37] font-bold">#1023</td>
                        <td className="py-3 text-white">Ali Khan</td>
                        <td className="py-3">{formatPrice(26.99)}</td>
                        <td className="py-3 text-gray-400">COD</td>
                        <td className="py-3 text-right">
                          <span className="bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase">Cooking</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 text-[#D4AF37] font-bold">#1022</td>
                        <td className="py-3 text-white">Sarah Smith</td>
                        <td className="py-3">{formatPrice(45.00)}</td>
                        <td className="py-3 text-gray-400">Card</td>
                        <td className="py-3 text-right">
                          <span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase">Out Delivery</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Products Inventory & Best Dishes */}
              <div className="bg-[#121212] border border-[#D4AF37]/15 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
                <div>
                  <h5 className="font-bold text-white text-xs uppercase tracking-wider">Dishes &amp; Live Stock</h5>
                  <p className="text-[9px] text-gray-500">Culinary Availability Status</p>
                </div>

                <div className="space-y-3 my-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img src={menuItems[0].image} className="w-8 h-8 rounded-lg object-cover" alt="" />
                      <span className="text-white truncate max-w-[100px]">{menuItems[0].name}</span>
                    </div>
                    <span className="text-emerald-400 font-mono text-[10px] uppercase font-bold bg-emerald-500/10 px-2 py-0.5 rounded">Instock</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img src={menuItems[2].image} className="w-8 h-8 rounded-lg object-cover" alt="" />
                      <span className="text-white truncate max-w-[100px]">{menuItems[2].name}</span>
                    </div>
                    <span className="text-emerald-400 font-mono text-[10px] uppercase font-bold bg-emerald-500/10 px-2 py-0.5 rounded">Instock</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img src={menuItems[1].image} className="w-8 h-8 rounded-lg object-cover" alt="" />
                      <span className="text-white truncate max-w-[100px]">{menuItems[1].name}</span>
                    </div>
                    <span className="text-amber-400 font-mono text-[10px] uppercase font-bold bg-amber-500/10 px-2 py-0.5 rounded">Limited</span>
                  </div>
                </div>

                <button 
                  onClick={() => onNavigateToInteractive('Admin Dashboard')}
                  className="w-full py-2 bg-gradient-to-r from-black to-[#1C1A17] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[10px] text-gray-300 uppercase tracking-widest rounded-xl transition-all"
                >
                  Manage Dishes
                </button>
              </div>

              {/* Customers & Loyalty register */}
              <div className="bg-[#121212] border border-[#D4AF37]/15 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
                <div>
                  <h5 className="font-bold text-white text-xs uppercase tracking-wider">Loyal Customers</h5>
                  <p className="text-[9px] text-gray-500">Registered Guest Base</p>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div className="flex items-center gap-2.5 p-1.5 bg-black/20 rounded-lg">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=80" className="w-6 h-6 rounded-full" alt="" />
                    <div className="flex-1 min-w-0">
                      <span className="block text-white font-bold truncate">John Doe</span>
                      <span className="block text-gray-500 text-[9px] truncate">john@example.com</span>
                    </div>
                    <span className="text-[#D4AF37] font-mono text-[10px] font-bold">120 pts</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-1.5 bg-black/20 rounded-lg">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=80" className="w-6 h-6 rounded-full" alt="" />
                    <div className="flex-1 min-w-0">
                      <span className="block text-white font-bold truncate">Emma Watson</span>
                      <span className="block text-gray-500 text-[9px] truncate">emma@example.com</span>
                    </div>
                    <span className="text-[#D4AF37] font-mono text-[10px] font-bold">340 pts</span>
                  </div>
                </div>

                <button 
                  onClick={() => onNavigateToInteractive('Admin Dashboard')}
                  className="w-full py-2 bg-gradient-to-r from-black to-[#1C1A17] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[10px] text-gray-300 uppercase tracking-widest rounded-xl transition-all"
                >
                  View All Guests
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
