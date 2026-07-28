import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Search, 
  Heart, 
  ShoppingBag, 
  Globe, 
  Bell, 
  User, 
  Menu, 
  X,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { CartItem, MenuItem } from '../types';

interface HeaderProps {
  currentView: string;
  setView: (view: string) => void;
  cart: CartItem[];
  wishlist: MenuItem[];
  language: 'EN' | 'UR';
  setLanguage: (lang: 'EN' | 'UR') => void;
  currency: 'USD' | 'PKR';
  setCurrency: (cur: 'USD' | 'PKR') => void;
  isDarkMode: boolean;
  setIsDarkMode: (mode: boolean) => void;
  onSearch: (query: string) => void;
  setIsCartOpen: (open: boolean) => void;
  notificationsCount: number;
  setNotificationsOpen: (open: boolean) => void;
  viewMode: 'interactive' | 'behance';
  setViewMode: (mode: 'interactive' | 'behance') => void;
}

export default function Header({
  currentView,
  setView,
  cart,
  wishlist,
  language,
  setLanguage,
  currency,
  setCurrency,
  isDarkMode,
  setIsDarkMode,
  onSearch,
  setIsCartOpen,
  notificationsCount,
  setNotificationsOpen,
  viewMode,
  setViewMode
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setView('Search Results');
      setSearchOpen(false);
    }
  };

  const menuLinks = [
    { name: language === 'EN' ? 'Home' : 'ہوم', view: 'Home' },
    { name: language === 'EN' ? 'Menu' : 'مینو', view: 'Full Menu' },
    { name: language === 'EN' ? 'About' : 'ہمارے بارے میں', view: 'About Restaurant' },
    { name: language === 'EN' ? 'Reservations' : 'ریزرویشن', view: 'Reservations' },
    { name: language === 'EN' ? 'Blog' : 'بلاگ', view: 'Blog' },
    { name: language === 'EN' ? 'Contact' : 'رابطہ', view: 'Contact' },
    { name: language === 'EN' ? 'Admin' : 'ایڈمن', view: 'Admin Dashboard', badge: 'Shopify' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0D0D0D]/95 border-b border-[#D4AF37]/20 transition-all duration-300">
      {/* Design Board Toggle Banner */}
      <div className="bg-gradient-to-r from-[#D4AF37]/10 via-[#0D0D0D] to-[#D4AF37]/10 text-center py-2 px-4 border-b border-[#D4AF37]/10 text-xs md:text-sm flex flex-wrap items-center justify-between gap-2 max-w-7xl mx-auto">
        <span className="flex items-center gap-1.5 text-gray-300">
          <Sparkles className="h-3.5 w-3.5 text-[#D4AF37] animate-pulse" />
          <span className="font-mono text-[11px] tracking-wider text-white">2026 FUTURE DESIGN LAB:</span>
          {language === 'EN' ? 'Michelin Fine Dining Showcase' : 'مچلین فائن ڈائننگ شوکیس'}
        </span>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('interactive')}
            className={`px-3 py-1 rounded-full font-medium transition-all duration-300 text-[11px] uppercase tracking-wider border ${
              viewMode === 'interactive'
                ? 'bg-[#D4AF37] text-[#0D0D0D] border-[#D4AF37]'
                : 'bg-transparent text-[#D4AF37] border-[#D4AF37]/30 hover:bg-[#D4AF37]/10'
            }`}
          >
            {language === 'EN' ? 'Live Interactive App' : 'لائیو ایپ'}
          </button>
          <button
            onClick={() => setViewMode('behance')}
            className={`px-3 py-1 rounded-full font-medium transition-all duration-300 text-[11px] uppercase tracking-wider border ${
              viewMode === 'behance'
                ? 'bg-[#D4AF37] text-[#0D0D0D] border-[#D4AF37]'
                : 'bg-transparent text-[#D4AF37] border-[#D4AF37]/30 hover:bg-[#D4AF37]/10'
            }`}
          >
            {language === 'EN' ? '8K Behance Showcase Board' : 'بہانس ڈیزائن بورڈ'}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          onClick={() => { setView('Home'); setViewMode('interactive'); }}
          className="flex items-center gap-2 text-left group"
        >
          <div className="relative w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-gradient-to-br from-[#1C1A17] to-[#0D0D0D] shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:border-[#D4AF37] transition-all duration-300">
            <UtensilsCrossed className="h-5 w-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <span className="font-sans text-xl font-bold tracking-widest text-white block uppercase">
              Flavor<span className="text-[#D4AF37]">ia</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-gray-500 block">Fine Dining 2026</span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 font-sans">
          {menuLinks.map((link) => (
            <button
              key={link.view}
              onClick={() => { setView(link.view); setViewMode('interactive'); }}
              className={`relative py-2 text-sm uppercase tracking-widest transition-colors duration-300 hover:text-[#D4AF37] ${
                currentView === link.view ? 'text-[#D4AF37] font-semibold' : 'text-gray-300'
              }`}
            >
              {link.name}
              {link.badge && (
                <span className="absolute -top-3 -right-6 px-1.5 py-0.5 bg-[#D4AF37] text-[#0D0D0D] text-[8px] font-bold rounded-full font-mono scale-90">
                  {link.badge}
                </span>
              )}
              {currentView === link.view && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
              )}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Search Toggle */}
          <div className="relative">
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-[#1C1A17] border border-[#D4AF37]/30 rounded-full px-3 py-1.5 w-64 animate-fade-in shadow-xl">
                <input
                  type="text"
                  placeholder={language === 'EN' ? "Search gold items..." : "کھانا تلاش کریں..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-white outline-none text-xs w-full placeholder-gray-500"
                  autoFocus
                />
                <button type="submit">
                  <Search className="h-4 w-4 text-[#D4AF37]" />
                </button>
                <button type="button" onClick={() => setSearchOpen(false)} className="ml-1 text-gray-400 hover:text-white">
                  <X className="h-3.5 w-3.5" />
                </button>
              </form>
            ) : (
              <button 
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-300 hover:text-[#D4AF37] hover:bg-[#1C1A17] rounded-full transition-all duration-300"
                title="Smart Search"
              >
                <Search className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'EN' ? 'UR' : 'EN')}
            className="p-2 text-gray-300 hover:text-[#D4AF37] hover:bg-[#1C1A17] rounded-full transition-all duration-300 flex items-center gap-1 text-xs font-mono border border-transparent hover:border-[#D4AF37]/20"
            title="Switch Language"
          >
            <Globe className="h-4 w-4" />
            <span>{language}</span>
          </button>

          {/* Currency Switcher */}
          <button
            onClick={() => setCurrency(currency === 'USD' ? 'PKR' : 'USD')}
            className="hidden sm:flex p-2 text-gray-300 hover:text-[#D4AF37] hover:bg-[#1C1A17] rounded-full transition-all duration-300 items-center gap-0.5 text-xs font-mono"
            title="Switch Currency"
          >
            <DollarSign className="h-4 w-4 text-[#D4AF37]" />
            <span>{currency === 'USD' ? '$' : 'Rs'}</span>
          </button>

          {/* Notifications */}
          <button 
            onClick={() => { setView('Notifications'); setViewMode('interactive'); }}
            className="relative p-2 text-gray-300 hover:text-[#D4AF37] hover:bg-[#1C1A17] rounded-full transition-all duration-300"
            title="Loyalty & Alerts"
          >
            <Bell className="h-5 w-5" />
            {notificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-4.5 h-4.5 bg-[#D4AF37] text-[#0D0D0D] font-bold text-[9px] rounded-full flex items-center justify-center border border-[#0D0D0D]">
                {notificationsCount}
              </span>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => { setView('Wishlist'); setViewMode('interactive'); }}
            className="relative p-2 text-gray-300 hover:text-red-400 hover:bg-[#1C1A17] rounded-full transition-all duration-300"
            title="Wishlist"
          >
            <Heart className={`h-5 w-5 ${wishlist.length > 0 ? 'fill-red-400 text-red-400' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
            )}
          </button>

          {/* Shopping Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-300 hover:text-[#D4AF37] hover:bg-[#1C1A17] rounded-full transition-all duration-300 border border-[#D4AF37]/20 bg-gradient-to-b from-[#1C1A17] to-[#0D0D0D] shadow-[0_0_10px_rgba(212,175,55,0.1)] hover:scale-105"
            title="Gourmet Cart"
          >
            <ShoppingBag className="h-5 w-5 text-[#D4AF37]" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-[#0D0D0D] font-bold text-[10px] rounded-full flex items-center justify-center border border-[#0D0D0D] animate-bounce">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* User Account / Dashboard Link */}
          <button
            onClick={() => { setView('User Dashboard'); setViewMode('interactive'); }}
            className="p-2 text-gray-300 hover:text-[#D4AF37] hover:bg-[#1C1A17] rounded-full transition-all duration-300"
            title="Loyalty Rewards & Profile"
          >
            <User className="h-5 w-5" />
          </button>

          {/* Book A Table Quick CTA button */}
          <button
            onClick={() => { setView('Reservations'); setViewMode('interactive'); }}
            className="hidden md:block px-4 py-2 bg-gradient-to-r from-[#D4AF37]/90 to-[#AA7C11] hover:from-[#D4AF37] hover:to-[#B8860B] text-[#0D0D0D] font-sans font-bold uppercase text-[11px] tracking-widest rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.25)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105 border border-[#D4AF37]/40"
          >
            {language === 'EN' ? 'Book a Table' : 'میز بک کریں'}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-[#D4AF37]"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-[#0D0D0D] border-t border-[#D4AF37]/20 p-6 flex flex-col gap-4 animate-slide-down">
          {menuLinks.map((link) => (
            <button
              key={link.view}
              onClick={() => {
                setView(link.view);
                setViewMode('interactive');
                setMobileMenuOpen(false);
              }}
              className={`py-2 text-left text-sm uppercase tracking-widest transition-colors duration-300 flex items-center justify-between ${
                currentView === link.view ? 'text-[#D4AF37]' : 'text-gray-300'
              }`}
            >
              <span>{link.name}</span>
              {link.badge && (
                <span className="px-1.5 py-0.5 bg-[#D4AF37] text-[#0D0D0D] text-[9px] font-bold rounded-full font-mono">
                  {link.badge}
                </span>
              )}
            </button>
          ))}
          <button
            onClick={() => {
              setView('Reservations');
              setViewMode('interactive');
              setMobileMenuOpen(false);
            }}
            className="w-full text-center py-3 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0D0D0D] font-bold uppercase text-xs tracking-widest rounded-full transition-all duration-300 shadow-md mt-2"
          >
            {language === 'EN' ? 'Book a Table' : 'میز بک کریں'}
          </button>
        </div>
      )}
    </header>
  );
}
