import React, { useState } from 'react';
import Header from './components/Header';
import BehanceShowcase from './components/BehanceShowcase';
import InteractiveApp from './components/InteractiveApp';
import ChefMascotAssistant from './components/ChefMascotAssistant';
import { 
  INITIAL_MENU_ITEMS, 
  INITIAL_BLOG_POSTS, 
  REVIEWS, 
  CAREER_OPPORTUNITIES, 
  INITIAL_ORDERS, 
  USER_PROFILE, 
  INITIAL_PROMOTIONS, 
  INITIAL_GIFT_CARDS 
} from './data';
import { MenuItem, CartItem, Reservation, BlogPost, Review, Order, UserProfile } from './types';

export default function App() {
  // Global modes and views state
  const [viewMode, setViewMode] = useState<'interactive' | 'behance'>('interactive');
  const [currentView, setView] = useState<string>('Home');
  const [language, setLanguage] = useState<'EN' | 'UR'>('EN');
  const [currency, setCurrency] = useState<'USD' | 'PKR'>('USD');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [notificationsCount, setNotificationsCount] = useState<number>(2);

  // Core mutable state
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<MenuItem[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [userProfile, setUserProfile] = useState<UserProfile>(USER_PROFILE);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddToCartFromWidget = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.menuItem.id === item.id);
      if (existing) {
        return prev.map(i => i.menuItem.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { menuItem: item, quantity: 1, selectedSize: 'Regular' }];
    });
    setIsCartOpen(true);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#060606] text-white' : 'bg-gray-50 text-black'} select-none relative`}>
      {/* Header component */}
      <Header
        currentView={currentView}
        setView={setView}
        cart={cart}
        wishlist={wishlist}
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onSearch={handleSearch}
        setIsCartOpen={setIsCartOpen}
        notificationsCount={notificationsCount}
        setNotificationsOpen={() => {}}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Main switchable workspace */}
      {viewMode === 'behance' ? (
        <BehanceShowcase
          menuItems={menuItems}
          blogPosts={INITIAL_BLOG_POSTS}
          reviews={REVIEWS}
          currency={currency}
          language={language}
          onNavigateToInteractive={(view) => {
            setView(view);
            setViewMode('interactive');
          }}
        />
      ) : (
        <InteractiveApp
          currentView={currentView}
          setView={setView}
          menuItems={menuItems}
          setMenuItems={setMenuItems}
          cart={cart}
          setCart={setCart}
          wishlist={wishlist}
          setWishlist={setWishlist}
          reservations={reservations}
          setReservations={setReservations}
          orders={orders}
          setOrders={setOrders}
          blogPosts={INITIAL_BLOG_POSTS}
          reviews={REVIEWS}
          careers={CAREER_OPPORTUNITIES}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          language={language}
          currency={currency}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          promotions={INITIAL_PROMOTIONS}
          giftCards={INITIAL_GIFT_CARDS}
          setNotificationsCount={setNotificationsCount}
        />
      )}

      {/* Smart interactive 3D Chef mascot chatbot */}
      <ChefMascotAssistant
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        menuItems={menuItems}
        onNavigate={setView}
        onAddToCart={handleAddToCartFromWidget}
      />

      {/* Sliding Slide Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-[#0D0D0D] border-l border-[#D4AF37]/30 p-6 flex flex-col justify-between h-full shadow-[0_0_50px_rgba(212,175,55,0.15)] animate-slide-left font-sans">
            <div>
              <div className="flex justify-between items-center border-b border-[#D4AF37]/20 pb-4">
                <h4 className="font-extrabold uppercase tracking-widest text-[#D4AF37] text-sm">Gourmet Vault Cart</h4>
                <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white text-sm font-mono">CLOSE ✕</button>
              </div>

              {cart.length === 0 ? (
                <p className="text-xs text-gray-500 text-center py-12">Your cart is empty. Add fine delicacies to start!</p>
              ) : (
                <div className="space-y-4 max-h-[480px] overflow-y-auto mt-4 custom-scrollbar pr-1.5">
                  {cart.map((item) => (
                    <div key={`${item.menuItem.id}-${item.selectedSize}`} className="flex justify-between items-center gap-4 bg-[#121212] p-3 rounded-xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <img src={item.menuItem.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                        <div>
                          <span className="font-bold text-white text-xs block">{item.menuItem.name}</span>
                          <span className="text-[9px] text-gray-400 uppercase font-mono">{item.selectedSize} Size</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-[#D4AF37] font-mono">x{item.quantity}</span>
                        <span className="text-xs text-white font-mono">{(item.menuItem.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-[#D4AF37]/20 pt-4 space-y-4">
                <div className="flex justify-between items-baseline text-xs text-gray-400 font-mono">
                  <span>Vault Subtotal:</span>
                  <span className="text-lg font-bold text-[#D4AF37]">
                    {currency === 'USD' ? '$' : 'Rs'}{(cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0) * (currency === 'USD' ? 1 : 278)).toFixed(2)}
                  </span>
                </div>
                <button 
                  onClick={() => { setIsCartOpen(false); setView('Cart'); setViewMode('interactive'); }}
                  className="w-full py-2.5 bg-[#D4AF37] hover:scale-102 hover:shadow-lg text-black font-extrabold uppercase text-xs tracking-widest rounded-xl transition-all"
                >
                  Confirm Items list
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tailwind and animation injects */}
      <style>{`
        @keyframes slide-left {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-left {
          animation: slide-left 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #D4AF37;
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0D0D0D;
        }
      `}</style>
    </div>
  );
}
