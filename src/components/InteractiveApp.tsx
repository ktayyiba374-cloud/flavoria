import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Flame, 
  TrendingUp, 
  CheckCircle2, 
  Briefcase, 
  Gift, 
  Award, 
  ArrowRight, 
  Heart, 
  ShoppingCart, 
  ChevronRight, 
  Info, 
  User, 
  Star, 
  ShieldCheck, 
  AlertCircle,
  FileText,
  Utensils,
  ChevronDown
} from 'lucide-react';
import { MenuItem, CartItem, Reservation, BlogPost, Review, Order, UserProfile, GiftCard, Promotion, CareerOpportunity } from '../types';
import AdminPanel from './AdminPanel';
import spicyDishImg from '../assets/images/gourmet_spicy_dish_1783039535380.jpg';
import heroSpicyImg from '../assets/images/hero_spicy_gourmet_1783039736729.jpg';

interface InteractiveAppProps {
  currentView: string;
  setView: (view: string) => void;
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  wishlist: MenuItem[];
  setWishlist: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  reservations: Reservation[];
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  blogPosts: BlogPost[];
  reviews: Review[];
  careers: CareerOpportunity[];
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  language: 'EN' | 'UR';
  currency: 'USD' | 'PKR';
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  promotions: Promotion[];
  giftCards: GiftCard[];
  setNotificationsCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function InteractiveApp({
  currentView,
  setView,
  menuItems,
  setMenuItems,
  cart,
  setCart,
  wishlist,
  setWishlist,
  reservations,
  setReservations,
  orders,
  setOrders,
  blogPosts,
  reviews,
  careers,
  userProfile,
  setUserProfile,
  language,
  currency,
  searchQuery,
  setSearchQuery,
  promotions,
  giftCards,
  setNotificationsCount
}: InteractiveAppProps) {
  
  // Local states
  const [selectedDish, setSelectedDish] = useState<MenuItem>(menuItems[0]);
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingDate, setBookingDate] = useState('2026-07-03');
  const [bookingTime, setBookingTime] = useState('20:00');
  const [bookingGuests, setBookingGuests] = useState(2);
  const [bookingRequests, setBookingRequests] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Auth local states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Address add state
  const [newAddress, setNewAddress] = useState('');

  // Career application success
  const [appliedJobId, setAppliedJobId] = useState<string | null>(null);

  // Checkout billing state
  const [checkoutName, setCheckoutName] = useState('Admin User');
  const [checkoutEmail, setCheckoutEmail] = useState('admin@flavoria.com');
  const [checkoutAddress, setCheckoutAddress] = useState('123 Royal Castle Court, Gold Coast, CA');
  const [checkoutPhone, setCheckoutPhone] = useState('+1 555 777 888');
  const [checkoutPayment, setCheckoutPayment] = useState<'Credit Card' | 'PayPal' | 'Cash on Delivery'>('Credit Card');
  const [lastCreatedOrderId, setLastCreatedOrderId] = useState('1023');

  // Currency formatting
  const exchangeRate = currency === 'USD' ? 1 : 278;
  const currencySymbol = currency === 'USD' ? '$' : 'Rs';

  const formatPrice = (val: number) => {
    return `${currencySymbol}${(val * exchangeRate).toFixed(2)}`;
  };

  // Cart operations
  const handleAddToCart = (item: MenuItem, size: 'Regular' | 'Large' = 'Regular') => {
    setCart(prev => {
      const existing = prev.find(i => i.menuItem.id === item.id && i.selectedSize === size);
      if (existing) {
        return prev.map(i => i.menuItem.id === item.id && i.selectedSize === size ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { menuItem: item, quantity: 1, selectedSize: size }];
    });
  };

  const handleUpdateCartQuantity = (itemId: string, size: 'Regular' | 'Large', delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.menuItem.id === itemId && item.selectedSize === size) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const handleToggleWishlist = (item: MenuItem) => {
    setWishlist(prev => {
      if (prev.find(i => i.id === item.id)) {
        return prev.filter(i => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  // Subtotal computations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const deliveryFee = 5.00;
  const cartTotal = cartSubtotal + deliveryFee;

  // Book reservation
  const handleBookReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRes: Reservation = {
      id: (Date.now() % 10000).toString(),
      fullName: bookingName || userProfile.name,
      email: bookingEmail || userProfile.email,
      phone: bookingPhone || userProfile.phone,
      date: bookingDate,
      time: bookingTime,
      guests: bookingGuests,
      specialRequests: bookingRequests,
      status: 'Confirmed'
    };
    setReservations(prev => [newRes, ...prev]);
    setBookingSuccess(true);
    setNotificationsCount(prev => prev + 1);
    setTimeout(() => {
      setView('Reservations');
      setBookingSuccess(false);
      setBookingName('');
      setBookingEmail('');
      setBookingPhone('');
      setBookingRequests('');
    }, 3000);
  };

  // Checkout submission
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrderId = (1026 + orders.length).toString();
    const newOrder: Order = {
      id: newOrderId,
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee: deliveryFee,
      total: cartTotal,
      status: 'Preparing',
      customerName: checkoutName,
      email: checkoutEmail,
      address: checkoutAddress,
      phone: checkoutPhone,
      paymentMethod: checkoutPayment,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastCreatedOrderId(newOrderId);
    setCart([]); // clear cart
    setView('Order Success');
    setNotificationsCount(prev => prev + 1);
  };

  const menuCategories = ['All', 'Starters', 'Main Course', 'Pizza', 'Desserts', 'Beverages'];
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('All');

  const filteredMenuItems = menuItems.filter(item => {
    if (selectedCategoryTab === 'All') return true;
    return item.category === selectedCategoryTab;
  });

  const searchFilteredItems = menuItems.filter(item => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // All 38 Pages List for the user to jump directly and preview
  const all38Pages = [
    'Home', 'About Restaurant', 'Full Menu', 'Categories', 'Food Details', 
    'Chef Specials', 'Signature Dishes', 'Reservations', 'Private Dining', 
    'Events & Catering', 'Blog', 'Gallery', 'Reviews', 'Contact', 'FAQ', 
    'Delivery Information', 'Refund Policy', 'Privacy Policy', 'Terms & Conditions', 
    'Wishlist', 'Search Results', 'Cart', 'Checkout', 'Order Success', 
    'Login', 'Signup', 'Forgot Password', 'User Dashboard', 'Order Tracking', 
    'My Orders', 'Profile Settings', 'Saved Addresses', 'Notifications', 
    'Loyalty Rewards', 'Gift Cards', 'Offers & Promotions', 'Careers', 'AI Assistant Page',
    'Admin Dashboard'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-8 min-h-screen">
      
      {/* Sidebar Selector for ALL 38 pages */}
      <div className="w-full lg:w-64 shrink-0 bg-[#0A0A0A] border border-[#D4AF37]/30 rounded-3xl p-5 h-fit space-y-4">
        <div className="flex items-center gap-1.5 border-b border-[#D4AF37]/20 pb-3">
          <Utensils className="h-4 w-4 text-[#D4AF37]" />
          <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-white">Interactive Pages Router</h4>
        </div>
        <p className="text-[10px] text-gray-400">Jump directly to any of the 38 screens specified in the premium brief:</p>
        
        <div className="space-y-1 max-h-[420px] overflow-y-auto pr-1.5 custom-scrollbar">
          {all38Pages.map((page) => (
            <button
              key={page}
              onClick={() => setView(page)}
              className={`w-full text-left px-3 py-2 rounded-xl text-[10.5px] uppercase tracking-wider font-mono transition-all flex items-center justify-between ${
                currentView === page 
                  ? 'bg-gradient-to-r from-[#D4AF37]/25 to-[#AA7C11]/10 text-[#D4AF37] border-l-2 border-[#D4AF37] font-bold' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span>{page}</span>
              <span className="text-[8px] opacity-40">→</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Content Frame */}
      <div className="flex-1 bg-[#0A0A0A] border border-white/5 rounded-3xl p-6 md:p-8 shadow-inner relative min-h-[600px]">
               {/* Render Page 1: Home */}
        {currentView === 'Home' && (
          <div className="space-y-12">
            {/* Cinematic Hero */}
            <div className="relative rounded-3xl overflow-hidden py-10 px-6 md:px-12 bg-gradient-to-r from-black via-black/95 to-[#1A1110] border border-[#D4AF37]/20 shadow-2xl">
              <div className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200")' }} />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Side: Content */}
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-[10px] tracking-widest uppercase text-[#D4AF37] font-mono bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30 inline-block animate-pulse">
                    ✨ {language === 'EN' ? 'Elite Fine Dining 2026' : 'اشرافیہ فائن ڈائننگ 2026'}
                  </span>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
                    Good Food<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-red-500">Good Mood</span>
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed max-w-lg">
                    {language === 'EN' 
                      ? 'Indulge in an extraordinary sensory experience. Savor our signature hot, fiery gourmet creations designed to ignite your tastebuds and elevate your mood.'
                      : 'ایک غیر معمولی حسی تجربے میں شامل ہو۔ اپنے حواس اور مزاج کو خوشگوار بنانے کے لیے تیکھے اور شاہی گرم پکوان۔'}
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <button onClick={() => setView('Full Menu')} className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-black font-extrabold uppercase text-xs tracking-widest rounded-full hover:scale-105 transition-all shadow-lg">
                      {language === 'EN' ? 'Explore Menu' : 'مینو دیکھیں'}
                    </button>
                    <button onClick={() => setView('Reservations')} className="px-6 py-3 bg-black/60 border border-red-500/40 text-red-400 font-bold uppercase text-xs tracking-widest rounded-full hover:bg-red-500/10 transition-all">
                      {language === 'EN' ? 'Reserve VIP Table' : 'میز بک کریں'}
                    </button>
                  </div>
                </div>

                {/* Right Side: Floating Spicy Image */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative group w-full max-w-[320px] lg:max-w-none">
                    {/* Glowing effect behind the image */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-[#D4AF37] rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse" />
                    <div className="relative bg-[#0d0d0d] border border-red-500/30 rounded-2xl overflow-hidden shadow-2xl">
                      <img 
                        src={heroSpicyImg} 
                        className="w-full h-64 lg:h-72 object-cover object-center transform group-hover:scale-105 transition-transform duration-500" 
                        alt="Signature Spicy Masterpiece"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-sm border border-[#D4AF37]/20 p-2.5 rounded-lg flex items-center justify-between">
                        <div>
                          <p className="text-[10px] uppercase font-mono tracking-wider text-red-400 font-bold flex items-center gap-1">
                            <Flame className="h-3 w-3 text-red-500 fill-red-500 animate-bounce" />
                            {language === 'EN' ? 'Now Trending' : 'ابھی رجحان ہے'}
                          </p>
                          <p className="text-xs font-bold text-white uppercase tracking-tight">
                            {language === 'EN' ? 'Sizzling Fiery Glaze' : 'تیکھا گرم گلیز'}
                          </p>
                        </div>
                        <span className="text-[10px] font-mono text-[#D4AF37] font-extrabold bg-[#D4AF37]/10 px-2 py-1 rounded border border-[#D4AF37]/30">
                          🔥 {language === 'EN' ? 'Extra Hot' : 'بہت تیکھا'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Plates */}
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-[#D4AF37]/15 pb-4">
                <div>
                  <h4 className="text-xl font-extrabold uppercase tracking-widest text-white">Our Signature Masterpieces</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">Curated by Chef Antonio</p>
                </div>
                <button onClick={() => setView('Full Menu')} className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-1">
                  View All Menu <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {menuItems.slice(0, 2).map((item) => (
                  <div key={item.id} className="bg-[#121212] border border-[#D4AF37]/20 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-center hover:border-[#D4AF37] transition-all duration-300 shadow-lg group">
                    <img src={item.image} className="w-32 h-32 rounded-xl object-cover border border-[#D4AF37]/20 shadow-md shrink-0 group-hover:scale-105 transition-transform" alt="" />
                    <div className="flex-1 space-y-1.5 text-center md:text-left">
                      <div className="flex justify-center md:justify-between items-center">
                        <span className="text-xs font-bold uppercase font-mono text-[#D4AF37] tracking-wider">{item.category}</span>
                        <span className="text-xs font-bold text-white font-mono bg-black/40 px-2.5 py-0.5 rounded border border-white/5">{formatPrice(item.price)}</span>
                      </div>
                      <h5 className="font-extrabold text-white text-base truncate uppercase">{item.name}</h5>
                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{item.description}</p>
                      <div className="pt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                        <button onClick={() => { setSelectedDish(item); setView('Food Details'); }} className="px-3 py-1 bg-[#1C1A17] hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg text-[10px] uppercase font-bold transition-all">
                          Details
                        </button>
                        <button onClick={() => handleAddToCart(item)} className="px-3 py-1 bg-[#D4AF37] text-black rounded-lg text-[10px] uppercase font-bold hover:scale-103 transition-all">
                          + Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sizzling & Spicy Specials */}
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-[#D4AF37]/15 pb-4">
                <div>
                  <h4 className="text-xl font-extrabold uppercase tracking-widest text-white flex items-center gap-2">
                    <Flame className="h-5 w-5 text-red-500 fill-red-500 animate-pulse" />
                    <span>{language === 'EN' ? 'Sizzling & Spicy Specials' : 'تیکھے اور سیزلنگ خاص پکوان'}</span>
                  </h4>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">
                    {language === 'EN' ? 'Ignite Your Senses' : 'اپنے حواس کو بیدار کریں'}
                  </p>
                </div>
                <span className="text-[10px] bg-red-500/10 text-red-400 px-2.5 py-1 rounded-full border border-red-500/20 font-mono flex items-center gap-1">
                  🌶️ {language === 'EN' ? 'Extra Hot' : 'بہت تیکھا'}
                </span>
              </div>

              <div className="bg-gradient-to-r from-[#121212] via-[#1a1212] to-[#121212] border border-red-500/20 hover:border-red-500/40 rounded-3xl p-6 flex flex-col lg:flex-row gap-6 items-center transition-all duration-300 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden border border-red-500/10 relative">
                  <img 
                    src={spicyDishImg} 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt="Spicy Gourmet Masterpiece"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm border border-red-500/20 px-3 py-1 rounded-lg">
                    <span className="text-xs font-mono font-bold text-red-400">🔥 {language === 'EN' ? 'Chef Recommended' : 'شیف کی تجویز'}</span>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase font-mono text-red-500 tracking-wider">
                      {language === 'EN' ? 'Limited Edition Gastronomy' : 'محدود ایڈیشن پکوان'}
                    </span>
                    <h5 className="font-extrabold text-white text-2xl uppercase tracking-tight">
                      {language === 'EN' ? 'Bespoke Schezuan Glazed Prawns' : 'شاہی تیکھے سچوان پرانز'}
                    </h5>
                    <div className="flex justify-center lg:justify-start items-center gap-3 text-xs font-mono text-gray-400">
                      <span>🌶️🌶️🌶️ Spice Level 3</span>
                      <span>⏱️ 15 mins</span>
                      <span className="text-[#D4AF37] font-bold">{formatPrice(23.99)}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed">
                    {language === 'EN' 
                      ? 'Succulent, wild-caught jumbo prawns glazed in a signature secret Schezuan sauce, infused with wild chili peppers, fresh garlic shoots, and micro-shaved ginger, served over a bed of crispy glass noodles with premium edible gold flakes.'
                      : 'سچوان چٹنی، جنگلی مرچوں، تازہ لہسن اور ادرک سے تیار کردہ شاہی جنگلی پرانز جو کرسپی نوڈلز اور سونے کے ورق کے ساتھ پیش کیے جاتے ہیں۔'}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-3 justify-center lg:justify-start">
                    <button 
                      onClick={() => {
                        const spicyMenuItem: MenuItem = {
                          id: 'spicy-special-prawns',
                          name: 'Bespoke Schezuan Glazed Prawns',
                          price: 23.99,
                          description: 'Succulent, wild-caught jumbo prawns glazed in a signature secret Schezuan sauce, infused with wild chili peppers.',
                          image: spicyDishImg,
                          category: 'Main Course',
                          ingredients: ['Jumbo Prawns', 'Schezuan Sauce', 'Wild Chili Peppers', 'Garlic', 'Gold Flakes'],
                          calories: 390,
                          prepTime: '15 mins',
                          spiceLevel: 3,
                          rating: 4.9,
                          reviewsCount: 88,
                          isChefSpecial: true,
                          isSignature: false,
                          isVegetarian: false,
                          isVegan: false,
                          isHalal: true,
                          isGlutenFree: true,
                          availability: 'Available'
                        };
                        handleAddToCart(spicyMenuItem);
                      }}
                      className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-extrabold uppercase text-xs tracking-widest rounded-xl hover:scale-105 transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                    >
                      {language === 'EN' ? 'Order Now' : 'ابھی آرڈر کریں'}
                    </button>
                    <button 
                      onClick={() => {
                        const spicyMenuItem: MenuItem = {
                          id: 'spicy-special-prawns',
                          name: 'Bespoke Schezuan Glazed Prawns',
                          price: 23.99,
                          description: 'Succulent, wild-caught jumbo prawns glazed in a signature secret Schezuan sauce, infused with wild chili peppers.',
                          image: spicyDishImg,
                          category: 'Main Course',
                          ingredients: ['Jumbo Prawns', 'Schezuan Sauce', 'Wild Chili Peppers', 'Garlic', 'Gold Flakes'],
                          calories: 390,
                          prepTime: '15 mins',
                          spiceLevel: 3,
                          rating: 4.9,
                          reviewsCount: 88,
                          isChefSpecial: true,
                          isSignature: false,
                          isVegetarian: false,
                          isVegan: false,
                          isHalal: true,
                          isGlutenFree: true,
                          availability: 'Available'
                        };
                        setSelectedDish(spicyMenuItem);
                        setView('Food Details');
                      }}
                      className="px-5 py-2.5 bg-black/60 hover:bg-[#1C1A17] border border-red-500/30 text-red-400 font-bold uppercase text-xs tracking-widest rounded-xl transition-all"
                    >
                      {language === 'EN' ? 'View Details' : 'تفصیلات دیکھیں'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Testimonials / Reviews */}
            <div className="bg-[#121212] border border-white/5 p-8 rounded-3xl space-y-4 text-center">
              <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-mono">The Gourmet Word</span>
              <p className="text-base text-gray-200 font-serif italic max-w-2xl mx-auto">
                "Flavoria provides an absolute masterclass of dining experience. The black and gold theme makes you feel like you are stepping into a golden sanctuary. Invaluable Chef AI recommendations!"
              </p>
              <div className="flex justify-center items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-600 border border-[#D4AF37]" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">Countess von Szeker, NY Times</span>
              </div>
            </div>
          </div>
        )}

        {/* Render Page 2: About Restaurant */}
        {currentView === 'About Restaurant' && (
          <div className="space-y-8">
            <div>
              <h4 className="text-2xl font-bold uppercase tracking-widest text-white">The Legacy of Flavoria</h4>
              <p className="text-xs text-[#D4AF37] uppercase tracking-widest font-mono">Michelin Culinary Artistry Since 2016</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-sm text-gray-300 leading-relaxed">
                  Flavoria was founded under a singular premise: to transcend standard ingredients and elevate every bite into a memory. Directed by world-renowned culinary masterminds, our kitchens operate as laboratories of sensory delight.
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  From sourcing 100% organic, wild-caught Norwegian salmon to utilizing imported Italian double-zero flour, our dedication to raw product perfection is absolute.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-[#121212] border border-white/5 rounded-2xl text-center">
                    <span className="text-2xl font-bold text-[#D4AF37] block font-mono">3</span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 block mt-1">Michelin Stars</span>
                  </div>
                  <div className="p-4 bg-[#121212] border border-white/5 rounded-2xl text-center">
                    <span className="text-2xl font-bold text-[#D4AF37] block font-mono">100%</span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 block mt-1">Organic Sourced</span>
                  </div>
                </div>
              </div>

              <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=600" className="w-full h-80 object-cover rounded-3xl border border-[#D4AF37]/20 shadow-xl" alt="" />
            </div>
          </div>
        )}

        {/* Render Page 3: Full Menu */}
        {currentView === 'Full Menu' && (
          <div className="space-y-8">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h4 className="text-2xl font-bold uppercase tracking-widest text-white">The Gold Trimmed Menu</h4>
                <p className="text-xs text-gray-500">Filter through our bespoke culinary selections below.</p>
              </div>

              {/* Grid or Categories switcher */}
              <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none max-w-full">
                {menuCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoryTab(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-mono border transition-all ${
                      selectedCategoryTab === cat 
                        ? 'bg-[#D4AF37] text-[#0D0D0D] border-[#D4AF37] font-bold' 
                        : 'bg-[#1C1A17] text-gray-400 border-[#D4AF37]/20 hover:border-[#D4AF37]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMenuItems.map((item) => (
                <div key={item.id} className="bg-[#121212] border border-white/5 hover:border-[#D4AF37]/40 rounded-3xl p-5 space-y-4 flex flex-col justify-between transition-all duration-300 shadow-lg relative group">
                  {item.isChefSpecial && (
                    <span className="absolute top-4 right-4 bg-[#D4AF37] text-black font-extrabold uppercase text-[8px] tracking-widest px-2.5 py-1 rounded-full font-mono shadow-md z-10">Chef Choice</span>
                  )}
                  
                  <div className="space-y-3">
                    <img src={item.image} className="w-full h-44 object-cover rounded-2xl border border-white/5" alt="" />
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-mono text-gray-500 uppercase">{item.category}</span>
                        <span className="text-xs font-mono text-[#D4AF37] font-bold">{formatPrice(item.price)}</span>
                      </div>
                      <h5 className="font-bold text-white text-sm uppercase truncate">{item.name}</h5>
                      <p className="text-[11px] text-gray-400 line-clamp-2 mt-1 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[9px] text-gray-500 font-mono">🕒 {item.prepTime}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => { setSelectedDish(item); setView('Food Details'); }}
                        className="px-3 py-1.5 rounded bg-black/40 border border-[#D4AF37]/30 text-xs font-bold uppercase text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
                      >
                        Details
                      </button>
                      <button 
                        onClick={() => handleAddToCart(item)}
                        className="px-3 py-1.5 rounded bg-[#D4AF37] text-black text-xs font-bold uppercase hover:scale-105 transition-all"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Render Page 4: Categories (Standalone view) */}
        {currentView === 'Categories' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold uppercase tracking-widest text-white">Cuisine Categories</h4>
              <p className="text-xs text-[#D4AF37] uppercase tracking-widest font-mono">Explore Specific Micro-Cuisines</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['Starters', 'Main Course', 'Pizza', 'Desserts', 'Beverages'].map((cat) => {
                const count = menuItems.filter(i => i.category === cat).length;
                return (
                  <div key={cat} className="bg-[#121212] border border-[#D4AF37]/20 p-6 rounded-3xl flex justify-between items-center hover:border-[#D4AF37] transition-all">
                    <div>
                      <h5 className="font-bold text-white text-lg uppercase tracking-wider">{cat}</h5>
                      <p className="text-xs text-gray-500 mt-1 font-mono">{count} Gourmet options available</p>
                    </div>
                    <button 
                      onClick={() => { setSelectedCategoryTab(cat); setView('Full Menu'); }}
                      className="w-10 h-10 rounded-full bg-black/60 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center hover:scale-105 transition-transform"
                    >
                      →
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Render Page 5: Food Details */}
        {currentView === 'Food Details' && selectedDish && (
          <div className="space-y-8">
            <button onClick={() => setView('Full Menu')} className="text-xs text-gray-400 hover:text-[#D4AF37] flex items-center gap-1 font-mono uppercase">
              ← Return to Catalog
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl">
                  <img src={selectedDish.image} className="w-full h-80 object-cover hover:scale-105 transition-all duration-500" alt="" />
                </div>
                
                {/* Micro Images Gallery */}
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square bg-cover bg-center rounded-xl border border-white/5 opacity-80 hover:opacity-100 cursor-pointer" style={{ backgroundImage: `url("${selectedDish.image}")` }} />
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">{selectedDish.category}</span>
                    <span className="text-sm font-mono text-emerald-400 font-bold">✓ Instock &amp; Fresh</span>
                  </div>
                  <h4 className="text-2xl font-extrabold uppercase text-white tracking-wider">{selectedDish.name}</h4>
                  <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
                    <span>🔥 {selectedDish.calories} Calories</span>
                    <span>⏱️ Prep: {selectedDish.prepTime}</span>
                    <span className="text-[#D4AF37]">★ {selectedDish.rating} ({selectedDish.reviewsCount} reviews)</span>
                  </div>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed">{selectedDish.description}</p>

                {/* Ingredients & Allergens */}
                <div className="p-4 bg-[#121212] border border-white/5 rounded-2xl space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-gray-400 block mb-1">Key Ingredients</span>
                    <div className="flex flex-wrap gap-1.5 text-xs text-gray-200 font-medium">
                      {selectedDish.ingredients.map((ing, i) => (
                        <span key={i} className="bg-black/40 px-2 py-0.5 rounded border border-[#D4AF37]/10">{ing}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-gray-400 uppercase tracking-wider pt-2 border-t border-white/5">
                    <span>Halal: {selectedDish.isHalal ? 'Yes' : 'No'}</span>
                    <span>Gluten Free: {selectedDish.isGlutenFree ? 'Yes' : 'No'}</span>
                  </div>
                </div>

                {/* Recommend Pairing */}
                <div className="p-4 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-2xl">
                  <span className="text-[10px] uppercase font-mono text-[#D4AF37] font-bold block mb-1">🍷 Recommended Sommelier Pairing</span>
                  <p className="text-xs text-gray-300">Perfect with our **Imperial Golden Mojito** containing authentic 24k gold flakes.</p>
                </div>

                {/* Add options */}
                <div className="flex gap-4">
                  <button 
                    onClick={() => { handleAddToCart(selectedDish); setView('Cart'); }} 
                    className="flex-1 py-3 bg-[#D4AF37] hover:scale-102 hover:shadow-lg transition-all text-black font-extrabold uppercase text-xs tracking-widest rounded-xl"
                  >
                    Add to Cart &amp; Order
                  </button>
                  <button 
                    onClick={() => handleToggleWishlist(selectedDish)}
                    className="p-3 bg-[#1C1A17] border border-white/10 text-white rounded-xl hover:text-red-400"
                  >
                    <Heart className={`h-5 w-5 ${wishlist.find(i => i.id === selectedDish.id) ? 'fill-red-400 text-red-400' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Render Page 6: Chef Specials */}
        {currentView === 'Chef Specials' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold uppercase tracking-widest text-white">Chef Antonio's Curated Specials</h4>
              <p className="text-xs text-[#D4AF37] uppercase tracking-widest font-mono">Bespoke Recipes Selected for Refined Connoisseurs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {menuItems.filter(i => i.isChefSpecial).map((item) => (
                <div key={item.id} className="bg-[#121212] border border-[#D4AF37]/30 rounded-3xl p-5 flex gap-4">
                  <img src={item.image} className="w-24 h-24 object-cover rounded-xl border border-[#D4AF37]/20 shrink-0" alt="" />
                  <div className="space-y-1.5 min-w-0">
                    <h5 className="font-bold text-white text-sm uppercase truncate">{item.name}</h5>
                    <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">{item.description}</p>
                    <span className="text-xs text-[#D4AF37] font-mono font-bold block">{formatPrice(item.price)}</span>
                    <button onClick={() => { setSelectedDish(item); setView('Food Details'); }} className="text-[10px] uppercase text-white hover:underline block pt-1 font-mono">View Details →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Render Page 7: Signature Dishes */}
        {currentView === 'Signature Dishes' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold uppercase tracking-widest text-white">Our Signature Masterpieces</h4>
              <p className="text-xs text-[#D4AF37] uppercase tracking-widest font-mono">Flagship Plated Delights Known Around the Globe</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {menuItems.filter(i => i.isSignature).map((item) => (
                <div key={item.id} className="bg-[#121212] border border-white/5 rounded-3xl p-5 flex gap-4">
                  <img src={item.image} className="w-24 h-24 object-cover rounded-xl border-white/5 shrink-0" alt="" />
                  <div className="space-y-1.5 min-w-0">
                    <h5 className="font-bold text-white text-sm uppercase truncate">{item.name}</h5>
                    <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">{item.description}</p>
                    <span className="text-xs text-[#D4AF37] font-mono font-bold block">{formatPrice(item.price)}</span>
                    <button onClick={() => { setSelectedDish(item); setView('Food Details'); }} className="text-[10px] uppercase text-white hover:underline block pt-1 font-mono">View Details →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Render Page 8: Reservations */}
        {currentView === 'Reservations' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold uppercase tracking-widest text-white">Bespoke Table Reservations</h4>
              <p className="text-xs text-gray-500">Specify details to claim your gold-trimmed Michelin-star table.</p>
            </div>

            {bookingSuccess ? (
              <div className="bg-[#121212] border border-[#D4AF37]/30 p-8 rounded-3xl text-center space-y-4 max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto text-3xl">✓</div>
                <h5 className="text-lg font-bold text-white uppercase tracking-wider">Reservation Confirmed</h5>
                <p className="text-xs text-gray-400">
                  Welcome to elite dining. Your seating reference has been sent to your inbox and logged on our dashboard.
                </p>
                <p className="text-xs text-[#D4AF37] font-mono font-bold">Chef Antonio is prepping your lounge...</p>
              </div>
            ) : (
              <form onSubmit={handleBookReservationSubmit} className="bg-[#121212] border border-[#D4AF37]/20 p-6 md:p-8 rounded-3xl space-y-4 max-w-xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-mono block mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={bookingName} 
                      onChange={(e) => setBookingName(e.target.value)} 
                      placeholder="e.g. Countess Emma Watson" 
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-xs text-white" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-mono block mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value={bookingEmail} 
                      onChange={(e) => setBookingEmail(e.target.value)} 
                      placeholder="e.g. emma@luxury.com" 
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-xs text-white" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-mono block mb-1">Contact Phone</label>
                    <input 
                      type="tel" 
                      value={bookingPhone} 
                      onChange={(e) => setBookingPhone(e.target.value)} 
                      placeholder="e.g. +1 234 567 890" 
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-xs text-white" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-mono block mb-1">Guests Seating</label>
                    <select 
                      value={bookingGuests} 
                      onChange={(e) => setBookingGuests(parseInt(e.target.value))} 
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10].map(n => (
                        <option key={n} value={n}>{n} Guests</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-mono block mb-1">Date</label>
                    <input 
                      type="date" 
                      value={bookingDate} 
                      onChange={(e) => setBookingDate(e.target.value)} 
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-xs text-white" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-mono block mb-1">Time Selection</label>
                    <input 
                      type="time" 
                      value={bookingTime} 
                      onChange={(e) => setBookingTime(e.target.value)} 
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-xs text-white" 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-mono block mb-1">Special Requests or Allergens</label>
                  <textarea 
                    value={bookingRequests} 
                    onChange={(e) => setBookingRequests(e.target.value)} 
                    placeholder="e.g. Birthday anniversary, wine pairing requested, no garlic..." 
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-xs text-white h-20"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black font-extrabold uppercase text-xs tracking-widest rounded-xl hover:scale-102 transition-all"
                >
                  Confirm Table Reservation
                </button>
              </form>
            )}
          </div>
        )}

        {/* Render Page 9: Private Dining */}
        {currentView === 'Private Dining' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold uppercase tracking-widest text-white">Exclusive Private Dining Suites</h4>
              <p className="text-xs text-[#D4AF37] uppercase tracking-widest font-mono">Bespoke Lounges Crafted for Intimate Culinary Gatherings</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <img src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600" className="w-full h-80 object-cover rounded-3xl border border-[#D4AF37]/20" alt="" />
              <div className="space-y-4">
                <h5 className="text-lg font-bold text-white uppercase tracking-wider">The Golden Conservatory Lounge</h5>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Accommodating between 8 to 50 guests, our golden conservatory lounges offer absolute privacy with custom temperature dials, bespoke acoustic acoustics, and private butler stations.
                </p>
                <div className="p-4 bg-[#121212] rounded-2xl border border-white/5 space-y-1 text-xs">
                  <span className="block font-bold text-white uppercase">Exclusive Features:</span>
                  <span className="block text-gray-400">• Dedicated Michelin-Star Custom Plated Menus</span>
                  <span className="block text-gray-400">• High-End Wine Pairings by Master Sommeliers</span>
                </div>
                <button onClick={() => setView('Reservations')} className="px-6 py-2.5 bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-widest rounded-xl">
                  Inquire Seating Availability
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Render Page 10: Events & Catering */}
        {currentView === 'Events & Catering' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold uppercase tracking-widest text-white">Elite Catering &amp; Gala Events</h4>
              <p className="text-xs text-[#D4AF37] uppercase tracking-widest font-mono">Grand Plated Orchestrations Worldwide</p>
            </div>

            <div className="bg-[#121212] border border-white/5 p-8 rounded-3xl space-y-4">
              <h5 className="text-lg font-bold text-white uppercase tracking-wider">Bring Flavoria to Your Venue</h5>
              <p className="text-sm text-gray-300 leading-relaxed">
                Whether you are hosting an upscale wedding gala, luxury corporate summit, or private estate banquet, Flavoria offers five-star Michelin plating on-site. We transport temperature-controlled culinary pods and configure fully equipped pop-up kitchens.
              </p>
              <div className="pt-2">
                <button onClick={() => setView('Contact')} className="px-6 py-3 bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-widest rounded-xl">
                  Contact Events Ambassador
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Render Page 11: Blog */}
        {currentView === 'Blog' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold uppercase tracking-widest text-white">The Culinary Gazette</h4>
              <p className="text-xs text-gray-500">Discover articles on gastronomy, micro-nutrients, and chef secrets.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-[#121212] border border-white/5 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-between">
                  <img src={post.image} className="w-full h-44 object-cover" alt="" />
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase">
                      <span>{post.category}</span>
                      <span>{post.date}</span>
                    </div>
                    <h5 className="font-bold text-white text-base leading-tight uppercase hover:text-[#D4AF37]">{post.title}</h5>
                    <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                    <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[11px] font-mono">
                      <span>By: {post.author}</span>
                      <span className="text-[#D4AF37]">{post.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Render Page 12: Gallery */}
        {currentView === 'Gallery' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold uppercase tracking-widest text-white">Visual Culinary Gallery</h4>
              <p className="text-xs text-[#D4AF37] uppercase tracking-widest font-mono">An Aesthetic Photographic Exploration</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {menuItems.concat(menuItems).slice(0, 6).map((item, i) => (
                <div key={i} className="aspect-square bg-cover bg-center rounded-2xl border border-white/5 relative group overflow-hidden cursor-zoom-in">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url("${item.image}")` }} />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity p-4 text-center">
                    <span className="text-xs font-bold font-sans uppercase tracking-widest text-white">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Render Page 13: Reviews */}
        {currentView === 'Reviews' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold uppercase tracking-widest text-white">Guest Testimonials</h4>
              <p className="text-xs text-[#D4AF37] uppercase tracking-widest font-mono">Unedited reviews from refined fine-dining enthusiasts.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-[#121212] border border-white/5 p-5 rounded-3xl space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={rev.avatar} className="w-10 h-10 rounded-full border border-[#D4AF37]/30" alt="" />
                    <div>
                      <span className="font-bold text-white text-xs block">{rev.userName}</span>
                      <span className="text-[9px] text-gray-500 font-mono block">{rev.date}</span>
                    </div>
                  </div>
                  <div className="flex text-[#D4AF37] text-xs">
                    {'★'.repeat(Math.floor(rev.rating))}
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed italic">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Render Page 14: Contact */}
        {currentView === 'Contact' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold uppercase tracking-widest text-white">The Embassy of Flavoria</h4>
              <p className="text-xs text-gray-500 font-mono">Flagship Headquarters and Support Channels</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#121212] border border-[#D4AF37]/20 p-6 rounded-3xl space-y-4">
                <h5 className="font-bold text-white text-base uppercase tracking-wider">Leave a Message</h5>
                <div className="space-y-3">
                  <input type="text" placeholder="Your Name" className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-xs" />
                  <input type="email" placeholder="Your Email" className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-xs" />
                  <textarea placeholder="Your Message..." className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-xs h-24" />
                  <button type="button" className="w-full py-2 bg-[#D4AF37] text-black font-bold uppercase text-xs rounded-xl hover:scale-102 transition-all">
                    Send Embassy Message
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-5 bg-[#121212] border border-white/5 rounded-3xl space-y-3">
                  <h5 className="font-bold text-[#D4AF37] text-sm uppercase tracking-wider">In-House Dining Headquarters</h5>
                  <div className="space-y-2 text-xs text-gray-400">
                    <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#D4AF37]" /> 123 Royal Forest Road, Flavor City, CA</p>
                    <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#D4AF37]" /> +1 (234) 567 890</p>
                    <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#D4AF37]" /> support@flavoria.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Render Page 15: FAQ */}
        {currentView === 'FAQ' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold uppercase tracking-widest text-white">Frequently Asked Inquiries</h4>
              <p className="text-xs text-[#D4AF37] uppercase tracking-widest font-mono">Bespoke Operating Answers</p>
            </div>

            <div className="space-y-3 max-w-2xl mx-auto">
              {[
                { q: "Do you have a strict dress code?", a: "To maintain the refined elegant atmosphere, we encourage smart casual or formal dining attire." },
                { q: "How are ingredients sourced?", a: "Every vegetable is harvested organically from local partner farms. Salmon is flown in chilled from Norwegian cold-waters daily." },
                { q: "Can I host corporate galas?", a: "Absolutely! We offer full bespoke conservatory dining and events catering with projection tools and sommelier bars." }
              ].map((faq, i) => (
                <div key={i} className="bg-[#121212] border border-white/5 p-4 rounded-2xl">
                  <span className="block font-bold text-white text-xs uppercase tracking-wider mb-1">{faq.q}</span>
                  <p className="text-xs text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Render Page 16: Delivery Information */}
        {currentView === 'Delivery Information' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold uppercase tracking-widest text-white">Gourmet Temperature Delivery</h4>
              <p className="text-xs text-[#D4AF37] uppercase tracking-widest font-mono">State-of-the-Art Thermal Logistics</p>
            </div>

            <div className="bg-[#121212] border border-white/5 p-6 md:p-8 rounded-3xl max-w-2xl mx-auto space-y-4 text-xs text-gray-300 leading-relaxed">
              <h5 className="text-base font-bold text-white uppercase">Temperature-Controlled Luxury</h5>
              <p>
                At Flavoria, delivery is treated with equivalent importance as table seating. Our vehicles are equipped with computerized thermal vaults maintaining heat or chill levels to within 0.5°C of original plating.
              </p>
              <p>
                Flat delivery fee of **$5.00** applies. Orders are sealed hermetically in food-grade glass canisters preventing micro-condensation.
              </p>
            </div>
          </div>
        )}

        {/* Render Page 17: Refund Policy */}
        {currentView === 'Refund Policy' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold uppercase tracking-widest text-white">Culinary Satisfaction &amp; Refund Guarantees</h4>
              <p className="text-xs text-gray-500 font-mono">Michelin-Caliber Integrity Policy</p>
            </div>

            <div className="bg-[#121212] border border-white/5 p-6 md:p-8 rounded-3xl max-w-2xl mx-auto space-y-4 text-xs text-gray-300 leading-relaxed">
              <h5 className="text-base font-bold text-white uppercase">The 2-Hour Gourmet Guarantee</h5>
              <p>
                If your dining selection is anything less than magnificent, you are fully covered. Refund requests or culinary exchanges must be submitted within **2 hours** of delivery or serving.
              </p>
              <p>
                We do not request returns; our master chefs will immediately cook and dispatch a superior replacement or execute a 100% financial credit to your account.
              </p>
            </div>
          </div>
        )}

        {/* Render Page 18: Privacy Policy */}
        {currentView === 'Privacy Policy' && (
          <div className="space-y-4 max-w-xl mx-auto text-xs text-gray-400 leading-relaxed">
            <h4 className="text-xl font-bold text-white uppercase tracking-wider">Privacy &amp; Secret Data</h4>
            <p>We handle guest dining logs, dietary profiles, and order history with absolute confidentiality. Data is encrypted using enterprise cryptographic keys and is never shared with external aggregators.</p>
          </div>
        )}

        {/* Render Page 19: Terms & Conditions */}
        {currentView === 'Terms & Conditions' && (
          <div className="space-y-4 max-w-xl mx-auto text-xs text-gray-400 leading-relaxed">
            <h4 className="text-xl font-bold text-white uppercase tracking-wider">Customer Agreements</h4>
            <p>Seating reservations are held strictly for a grace period of 20 minutes. Please advise our hosts of late arrival via chat. Abuse of refund policies or booking cancellation cycles may result in account termination.</p>
          </div>
        )}

        {/* Render Page 20: Wishlist */}
        {currentView === 'Wishlist' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold uppercase tracking-widest text-white">Your Saved Favorites</h4>
              <p className="text-xs text-gray-500">Gold-trimmed culinary selections bookmarked for later.</p>
            </div>

            {wishlist.length === 0 ? (
              <div className="p-8 bg-[#121212] border border-white/5 rounded-2xl text-center text-xs text-gray-500">
                <span>No saved delicacies. Try bookmarking from our Menu!</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wishlist.map((item) => (
                  <div key={item.id} className="bg-[#121212] border border-white/5 p-4 rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={item.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                      <div>
                        <span className="font-bold text-white text-xs block">{item.name}</span>
                        <span className="text-[10px] text-gray-500 font-mono">{formatPrice(item.price)}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className="px-3 py-1 bg-[#D4AF37] text-black rounded text-[10px] uppercase font-bold"
                    >
                      + Add Cart
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Render Page 21: Search Results */}
        {currentView === 'Search Results' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold uppercase tracking-widest text-white">Search Results</h4>
              <p className="text-xs text-gray-500 font-mono">Showing outputs matching: "{searchQuery}"</p>
            </div>

            {searchFilteredItems.length === 0 ? (
              <div className="p-8 bg-[#121212] text-center text-xs text-gray-500 rounded-2xl">
                <span>No delicacies match your inquiry. Try 'Salmon' or 'Steak'.</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchFilteredItems.map((item) => (
                  <div key={item.id} className="bg-[#121212] border border-white/5 p-4 rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={item.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                      <div>
                        <span className="font-bold text-white text-xs block">{item.name}</span>
                        <span className="text-[10px] text-[#D4AF37] font-mono">{formatPrice(item.price)}</span>
                      </div>
                    </div>
                    <button onClick={() => { setSelectedDish(item); setView('Food Details'); }} className="px-3 py-1 border border-[#D4AF37]/30 text-[#D4AF37] rounded text-[10px] uppercase font-bold">Details</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Render Page 22: Cart */}
        {currentView === 'Cart' && (
          <div className="space-y-6 font-sans">
            <div>
              <h4 className="text-2xl font-bold uppercase tracking-widest text-white">Gourmet Vault (Cart)</h4>
              <p className="text-xs text-gray-500">Review selected ingredients and size selections before dining.</p>
            </div>

            {cart.length === 0 ? (
              <div className="p-8 bg-[#121212] border border-white/5 rounded-2xl text-center text-xs text-gray-500">
                <span>Your gourmet vault is empty. Fill it with premium selections!</span>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="divide-y divide-white/5 bg-[#121212] border border-white/5 rounded-2xl p-4">
                  {cart.map((item) => (
                    <div key={`${item.menuItem.id}-${item.selectedSize}`} className="py-4 flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3">
                        <img src={item.menuItem.image} className="w-12 h-12 rounded-xl object-cover border border-white/10" alt="" />
                        <div>
                          <span className="font-bold text-white text-xs block">{item.menuItem.name}</span>
                          <span className="text-[9px] text-[#D4AF37] uppercase font-mono tracking-widest block">{item.selectedSize} Size</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 bg-black border border-white/10 px-2 py-1 rounded-lg text-xs font-mono text-white">
                          <button onClick={() => handleUpdateCartQuantity(item.menuItem.id, item.selectedSize, -1)} className="px-1 text-gray-400 hover:text-white">-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => handleUpdateCartQuantity(item.menuItem.id, item.selectedSize, 1)} className="px-1 text-gray-400 hover:text-white">+</button>
                        </div>
                        <span className="font-mono text-xs font-bold text-white shrink-0">{formatPrice(item.menuItem.price * item.quantity)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#121212] border border-white/5 rounded-2xl p-4 space-y-2">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Menu Subtotal</span>
                    <span className="font-mono text-white">{formatPrice(cartSubtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Gourmet Delivery Vault Fee</span>
                    <span className="font-mono text-white">{formatPrice(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#D4AF37] font-bold pt-2 border-t border-white/5">
                    <span>Total Bill</span>
                    <span className="font-mono text-lg">{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setView('Checkout')} 
                  className="w-full py-3 bg-[#D4AF37] text-black font-extrabold uppercase text-xs tracking-widest rounded-xl hover:scale-102 transition-all"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Render Page 23: Checkout */}
        {currentView === 'Checkout' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold uppercase tracking-widest text-white">Gourmet Checkout</h4>
              <p className="text-xs text-gray-500">Provide luxury delivery logistics and complete billing authorization.</p>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="bg-[#121212] border border-[#D4AF37]/20 p-6 md:p-8 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="space-y-4">
                <h5 className="font-bold text-white text-xs uppercase tracking-wider border-b border-white/5 pb-2">Billing &amp; Delivery</h5>
                <div>
                  <label className="text-[9px] uppercase font-mono text-gray-500 block mb-1">Recipient Name</label>
                  <input type="text" value={checkoutName} onChange={(e) => setCheckoutName(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white" required />
                </div>
                <div>
                  <label className="text-[9px] uppercase font-mono text-gray-500 block mb-1">Email Address</label>
                  <input type="email" value={checkoutEmail} onChange={(e) => setCheckoutEmail(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white" required />
                </div>
                <div>
                  <label className="text-[9px] uppercase font-mono text-gray-500 block mb-1">Contact Phone</label>
                  <input type="tel" value={checkoutPhone} onChange={(e) => setCheckoutPhone(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white" required />
                </div>
                <div>
                  <label className="text-[9px] uppercase font-mono text-gray-500 block mb-1">Address Location</label>
                  <input type="text" value={checkoutAddress} onChange={(e) => setCheckoutAddress(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white" required />
                </div>
              </div>

              <div className="space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <h5 className="font-bold text-white text-xs uppercase tracking-wider border-b border-white/5 pb-2">Payment Method</h5>
                  <div className="space-y-2 font-mono text-xs text-gray-300">
                    {['Credit Card', 'PayPal', 'Cash on Delivery'].map((method) => (
                      <label key={method} className="flex items-center gap-3 p-2 bg-black/40 border border-white/5 rounded-xl cursor-pointer hover:border-[#D4AF37]">
                        <input 
                          type="radio" 
                          name="payment" 
                          checked={checkoutPayment === method} 
                          onChange={() => setCheckoutPayment(method as any)}
                        />
                        <span>{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-2">
                  <div className="flex justify-between font-mono text-xs">
                    <span>Final Price:</span>
                    <span className="text-[#D4AF37] font-bold">{formatPrice(cartTotal)}</span>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full py-2.5 bg-[#D4AF37] text-black font-extrabold uppercase text-xs tracking-widest rounded-xl hover:scale-102 transition-all shadow-md"
                  >
                    Authorize Payment &amp; Plating
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Render Page 24: Order Success */}
        {currentView === 'Order Success' && (
          <div className="space-y-6 text-center max-w-md mx-auto py-12">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto text-3xl">✓</div>
            <h4 className="text-2xl font-bold uppercase tracking-widest text-white">Order Authenticated Successfully</h4>
            <p className="text-xs text-gray-400">
              Your gourmet culinary order has been dispatched into production. Our computerized thermal vehicle is being prepared.
            </p>
            <div className="p-4 bg-[#121212] border border-[#D4AF37]/20 rounded-2xl text-xs font-mono space-y-1">
              <span className="block text-gray-500 uppercase tracking-widest">Sealed ID:</span>
              <span className="block text-[#D4AF37] font-bold text-sm">#{lastCreatedOrderId}</span>
            </div>
            <button onClick={() => setView('Order Tracking')} className="px-6 py-2 bg-[#D4AF37] text-black font-bold uppercase text-[10px] tracking-widest rounded-xl">
              Track Thermal Location
            </button>
          </div>
        )}

        {/* Render Page 25: Login */}
        {currentView === 'Login' && (
          <div className="space-y-6 max-w-sm mx-auto py-12">
            <h4 className="text-xl font-bold text-center uppercase tracking-widest text-white">Guest Authorization</h4>
            <div className="bg-[#121212] border border-white/5 p-6 rounded-3xl space-y-3">
              <input type="email" placeholder="email@address.com" className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-xs text-white" />
              <input type="password" placeholder="••••••••" className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-xs text-white" />
              <button type="button" onClick={() => { setIsLoggedIn(true); setView('User Dashboard'); }} className="w-full py-2 bg-[#D4AF37] text-black font-bold uppercase text-xs rounded-xl">
                Login
              </button>
              <button onClick={() => setView('Forgot Password')} className="text-[10px] text-[#D4AF37] hover:underline text-center block w-full font-mono uppercase">Forgot Credentials?</button>
            </div>
          </div>
        )}

        {/* Render Page 26: Signup */}
        {currentView === 'Signup' && (
          <div className="space-y-6 max-w-sm mx-auto py-12">
            <h4 className="text-xl font-bold text-center uppercase tracking-widest text-white">Gourmet Registration</h4>
            <div className="bg-[#121212] border border-white/5 p-6 rounded-3xl space-y-3">
              <input type="text" placeholder="Your Name" className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-xs text-white" />
              <input type="email" placeholder="email@address.com" className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-xs text-white" />
              <input type="password" placeholder="Create Password" className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-xs text-white" />
              <button type="button" onClick={() => setView('Login')} className="w-full py-2 bg-[#D4AF37] text-black font-bold uppercase text-xs rounded-xl">
                Register Account
              </button>
            </div>
          </div>
        )}

        {/* Render Page 27: Forgot Password */}
        {currentView === 'Forgot Password' && (
          <div className="space-y-4 max-w-sm mx-auto py-12 text-center">
            <h4 className="text-xl font-bold uppercase tracking-wider text-white">Credential Retrieval</h4>
            <p className="text-xs text-gray-400">Enter your email below to receive a secure recovery code.</p>
            <div className="bg-[#121212] border border-white/5 p-6 rounded-3xl space-y-3">
              <input type="email" placeholder="email@address.com" className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-xs text-white" />
              <button type="button" onClick={() => setView('Login')} className="w-full py-2 bg-[#D4AF37] text-black font-bold uppercase text-xs rounded-xl">
                Send Retrieval Link
              </button>
            </div>
          </div>
        )}

        {/* Render Page 28: User Dashboard */}
        {currentView === 'User Dashboard' && (
          <div className="space-y-6 font-sans">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div>
                <h4 className="text-2xl font-bold uppercase tracking-widest text-white">{userProfile.name}</h4>
                <p className="text-xs text-gray-500 font-mono">Member Since: {userProfile.joinedDate}</p>
              </div>
              <span className="px-3 py-1 bg-[#D4AF37] text-black font-extrabold text-[10px] tracking-widest uppercase rounded-full font-mono shadow-md">
                👑 {userProfile.membershipTier} Member
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#121212] border border-white/5 rounded-3xl space-y-3 text-center">
                <span className="text-[10px] uppercase font-mono text-gray-400 tracking-wider block">Gourmet Loyalty Balance</span>
                <span className="text-3xl font-extrabold text-[#D4AF37] block font-mono">{userProfile.loyaltyPoints} Points</span>
                <p className="text-xs text-gray-400">Earned via dining orders. Redeem free desserts and chef pairings.</p>
                <button onClick={() => setView('Loyalty Rewards')} className="px-4 py-1.5 bg-black/40 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase font-bold tracking-wider rounded-xl hover:bg-[#D4AF37]/10 transition-colors">Tier Benefits</button>
              </div>

              <div className="p-6 bg-[#121212] border border-white/5 rounded-3xl space-y-3">
                <h5 className="font-bold text-white text-xs uppercase tracking-wider">Quick Account Links</h5>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                  <button onClick={() => setView('Profile Settings')} className="p-2.5 bg-black/40 border border-white/5 rounded-xl text-left hover:border-[#D4AF37]">Profile Settings</button>
                  <button onClick={() => setView('Saved Addresses')} className="p-2.5 bg-black/40 border border-white/5 rounded-xl text-left hover:border-[#D4AF37]">Saved Locations</button>
                  <button onClick={() => setView('My Orders')} className="p-2.5 bg-black/40 border border-white/5 rounded-xl text-left hover:border-[#D4AF37]">Order Records</button>
                  <button onClick={() => setView('Notifications')} className="p-2.5 bg-black/40 border border-white/5 rounded-xl text-left hover:border-[#D4AF37]">Alerts</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Render Page 29: Order Tracking */}
        {currentView === 'Order Tracking' && (
          <div className="space-y-8 max-w-xl mx-auto font-sans">
            <div className="text-center">
              <h4 className="text-2xl font-bold uppercase tracking-widest text-white">Live Thermal Tracking</h4>
              <p className="text-xs text-gray-500 font-mono">Current phase for Order ID: #{lastCreatedOrderId}</p>
            </div>

            {/* Custom animated progress bar */}
            <div className="relative pt-6">
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex">
                <div className="bg-gradient-to-r from-[#AA7C11] to-[#D4AF37] h-full" style={{ width: '60%' }} />
              </div>

              <div className="grid grid-cols-5 text-center text-[9px] uppercase tracking-wider font-mono text-gray-500 pt-3 gap-1">
                <div className="text-emerald-400 font-bold">1. Preparing</div>
                <div className="text-emerald-400 font-bold">2. Cooking</div>
                <div className="text-[#D4AF37] font-bold animate-pulse">3. Packed</div>
                <div>4. Out Delivery</div>
                <div>5. Plated</div>
              </div>
            </div>

            <div className="p-5 bg-[#121212] border border-[#D4AF37]/25 rounded-2xl flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-500 uppercase font-mono block">Delivery Ambassador</span>
                <span className="text-white text-xs font-bold block">Sommelier James (Thermal Rider #12)</span>
                <span className="text-[11px] text-emerald-400 font-mono block">🎯 Arriving in ~12 mins</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-black border border-[#D4AF37] flex items-center justify-center text-lg">🚴</div>
            </div>
          </div>
        )}

        {/* Render Page 30: My Orders */}
        {currentView === 'My Orders' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold uppercase tracking-widest text-white">Past Plated Orders</h4>
              <p className="text-xs text-gray-500">History of your Michelin fine-dining transactions.</p>
            </div>

            <div className="space-y-4">
              {orders.map((o) => (
                <div key={o.id} className="bg-[#121212] border border-white/5 p-4 rounded-2xl flex justify-between items-center gap-4 flex-wrap">
                  <div className="space-y-1">
                    <span className="text-[#D4AF37] font-mono font-bold text-xs">ID: #{o.id}</span>
                    <span className="text-[10px] text-gray-500 block">{o.date} • {o.items.length} delicacy items</span>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono rounded-full font-bold uppercase">{o.status}</span>
                  <span className="font-mono text-xs font-bold text-white shrink-0">{formatPrice(o.total)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Render Page 31: Profile Settings */}
        {currentView === 'Profile Settings' && (
          <div className="space-y-6 max-w-sm mx-auto">
            <h4 className="text-xl font-bold text-center uppercase tracking-wider text-white">Profile Settings</h4>
            <div className="bg-[#121212] border border-white/5 p-6 rounded-3xl space-y-4 text-xs text-gray-300">
              <div>
                <label className="text-[9px] uppercase font-mono text-gray-500 block mb-1">Display Name</label>
                <input type="text" value={userProfile.name} onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })} className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-white" />
              </div>
              <div>
                <label className="text-[9px] uppercase font-mono text-gray-500 block mb-1">Email Address</label>
                <input type="email" value={userProfile.email} className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-gray-400 cursor-not-allowed" disabled />
              </div>
              <div>
                <label className="text-[9px] uppercase font-mono text-gray-500 block mb-1">Contact Phone</label>
                <input type="tel" value={userProfile.phone} onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })} className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-white" />
              </div>
              <button onClick={() => setView('User Dashboard')} className="w-full py-2 bg-[#D4AF37] text-black font-bold uppercase text-xs rounded-xl hover:scale-102 transition-all">Save Profile</button>
            </div>
          </div>
        )}

        {/* Render Page 32: Saved Addresses */}
        {currentView === 'Saved Addresses' && (
          <div className="space-y-6 max-w-md mx-auto">
            <div>
              <h4 className="text-xl font-bold uppercase text-center tracking-wider text-white">Saved Delivery Locations</h4>
              <p className="text-xs text-gray-500 text-center">Add or remove frequent dining dispatch addresses.</p>
            </div>

            <div className="bg-[#121212] border border-white/5 p-6 rounded-3xl space-y-4">
              <div className="space-y-2 text-xs">
                {userProfile.addresses.map((addr, i) => (
                  <div key={i} className="p-3 bg-black/40 border border-white/5 rounded-xl flex justify-between items-center text-gray-300">
                    <span className="truncate flex-1 pr-4">{addr}</span>
                    <button 
                      onClick={() => setUserProfile({ ...userProfile, addresses: userProfile.addresses.filter(a => a !== addr) })}
                      className="text-red-400 hover:text-red-500 font-mono text-[9px] uppercase"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 border-t border-white/5 pt-4">
                <input 
                  type="text" 
                  placeholder="Add new address..." 
                  value={newAddress} 
                  onChange={(e) => setNewAddress(e.target.value)} 
                  className="flex-1 bg-black border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white" 
                />
                <button 
                  onClick={() => {
                    if (newAddress.trim()) {
                      setUserProfile({ ...userProfile, addresses: [...userProfile.addresses, newAddress] });
                      setNewAddress('');
                    }
                  }}
                  className="px-4 py-1.5 bg-[#D4AF37] text-black font-bold text-xs rounded-xl uppercase shrink-0"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Render Page 33: Notifications */}
        {currentView === 'Notifications' && (
          <div className="space-y-6 max-w-md mx-auto font-sans">
            <h4 className="text-2xl font-bold uppercase tracking-widest text-white">VIP Dining Notifications</h4>
            
            <div className="space-y-3">
              {[
                { title: "⭐ Secret Sommelier Tasting Invited", content: "Join us this Friday at 09:00 PM for the unveiling of vintage champagnes. Exclusive entry.", date: "2 hours ago" },
                { title: "👑 Loyalty Reward points Logged", content: "Your last order of Grilled Salmon has successfully credited 250 loyalty points to your Gold ledger.", date: "1 day ago" }
              ].map((notif, i) => (
                <div key={i} className="p-4 bg-[#121212] border border-white/5 rounded-2xl space-y-1 relative">
                  <span className="text-[10px] text-gray-500 font-mono absolute top-4 right-4">{notif.date}</span>
                  <span className="block font-bold text-[#D4AF37] text-xs uppercase tracking-wider">{notif.title}</span>
                  <p className="text-xs text-gray-400 leading-relaxed pr-8">{notif.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Render Page 34: Loyalty Rewards */}
        {currentView === 'Loyalty Rewards' && (
          <div className="space-y-6 font-sans">
            <div>
              <h4 className="text-2xl font-bold uppercase tracking-widest text-white">Loyalty Tiers &amp; Rewards</h4>
              <p className="text-xs text-[#D4AF37] uppercase tracking-widest font-mono">Collect points with every bite.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { name: "Bronze Tier", points: "0 pts", benefits: "Access standard digital chatbot recipes." },
                { name: "Silver Tier", points: "500 pts", benefits: "Complimentary signature desserts on birthday." },
                { name: "Gold Tier (Active)", points: "1000 pts", benefits: "Sommelier wine-pairings and secret chef invite events." },
                { name: "Platinum Tier", points: "2500 pts", benefits: "Private table reservations priority & 0% delivery fee." }
              ].map((tier, i) => (
                <div key={i} className={`p-5 bg-[#121212] border rounded-2xl text-center space-y-2 ${tier.name.includes('Active') ? 'border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.15)]' : 'border-white/5'}`}>
                  <span className="text-lg">👑</span>
                  <h5 className="font-bold text-white text-xs uppercase tracking-wider">{tier.name}</h5>
                  <span className="text-[10px] text-[#D4AF37] font-mono block">{tier.points}</span>
                  <p className="text-[11px] text-gray-400 leading-relaxed">{tier.benefits}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Render Page 35: Gift Cards */}
        {currentView === 'Gift Cards' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold uppercase tracking-widest text-white">Digital Luxury Gift Cards</h4>
              <p className="text-xs text-gray-500">Provide golden envelopes and credits instantly.</p>
            </div>

            <div className="bg-[#121212] border border-[#D4AF37]/25 max-w-md mx-auto p-8 rounded-3xl space-y-4 text-center">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] block">Flavoria Elite Credits</span>
              <div className="p-6 bg-gradient-to-br from-[#1C1A17] to-black rounded-2xl border border-[#D4AF37] flex flex-col items-center justify-center relative overflow-hidden h-40">
                <div className="absolute top-4 left-4 font-bold uppercase tracking-widest text-[11px] text-[#D4AF37]">FLAVORIA</div>
                <span className="text-3xl font-extrabold font-mono text-[#D4AF37]">{formatPrice(100.00)}</span>
                <span className="absolute bottom-4 right-4 text-[9px] text-gray-500 font-mono">CODE: FLAV-GOLD-100</span>
              </div>
              <p className="text-xs text-gray-400">Gift a michelin fine dining experience to colleagues and family.</p>
              <button className="w-full py-2.5 bg-[#D4AF37] text-black font-extrabold uppercase text-xs rounded-xl hover:scale-102 transition-all">Buy Gift Card</button>
            </div>
          </div>
        )}

        {/* Render Page 36: Offers & Promotions */}
        {currentView === 'Offers & Promotions' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold uppercase tracking-widest text-white">Exclusive Offers &amp; Promotions</h4>
              <p className="text-xs text-[#D4AF37] uppercase tracking-widest font-mono">Unlock Signature Discounts</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {promotions.map((p) => (
                <div key={p.id} className="bg-[#121212] border border-white/5 rounded-3xl p-6 space-y-3 relative overflow-hidden">
                  <span className="absolute top-4 right-4 bg-[#D4AF37]/15 text-[#D4AF37] font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded border border-[#D4AF37]/25">Active</span>
                  <h5 className="font-extrabold text-white text-sm uppercase tracking-wider">{p.title}</h5>
                  <p className="text-xs text-gray-400 leading-relaxed">{p.description}</p>
                  <div className="flex justify-between items-center border-t border-white/5 pt-3">
                    <span className="text-[10px] uppercase font-mono text-gray-500">Code:</span>
                    <span className="text-xs font-mono font-bold text-[#D4AF37] bg-black px-3 py-1 rounded border border-white/10">{p.code}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Render Page 37: Careers */}
        {currentView === 'Careers' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold uppercase tracking-widest text-white">Join Our Elite Culinary Crew</h4>
              <p className="text-xs text-gray-500">We recruit top Michelin chefs and sommelier ambassadors globally.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {careers.map((car) => (
                <div key={car.id} className="bg-[#121212] border border-white/5 p-6 rounded-3xl space-y-4">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <h5 className="font-bold text-white text-base uppercase tracking-wider">{car.title}</h5>
                      <span className="text-[10px] font-mono text-[#D4AF37] uppercase">{car.department} • {car.location}</span>
                    </div>
                    <span className="px-3 py-1 bg-[#D4AF37] text-black font-extrabold text-[9px] tracking-widest uppercase rounded font-mono">{car.type}</span>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">{car.description}</p>

                  <div className="space-y-1 text-xs">
                    <span className="block font-bold text-white uppercase font-mono text-[10px]">Candidate Requirements:</span>
                    {car.requirements.map((req, i) => (
                      <span key={i} className="block text-gray-400">• {req}</span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center border-t border-white/5 pt-4">
                    <span className="text-xs font-mono text-[#D4AF37] font-bold">{car.salaryRange}</span>
                    {appliedJobId === car.id ? (
                      <span className="text-xs text-emerald-400 font-bold font-mono">✓ Application Submitted</span>
                    ) : (
                      <button 
                        onClick={() => setAppliedJobId(car.id)}
                        className="px-5 py-2 bg-gradient-to-r from-black to-[#1C1A17] border border-[#D4AF37]/30 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:border-[#D4AF37]"
                      >
                        Submit Portfolio
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Render Page 38: Standalone AI Assistant Page */}
        {currentView === 'AI Assistant Page' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold uppercase tracking-widest text-white">The Sommelier &amp; Chef Terminal</h4>
              <p className="text-xs text-[#D4AF37] uppercase tracking-widest font-mono">A full standalone terminal communicating directly with Chef Antonio.</p>
            </div>

            <div className="bg-[#121212] border border-[#D4AF37]/30 rounded-3xl p-6 md:p-8 space-y-4 max-w-2xl mx-auto h-[480px] flex flex-col justify-between">
              <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                <div className="w-10 h-10 rounded-full bg-[#1C1A17] border border-[#D4AF37] flex items-center justify-center text-xl">👨‍🍳</div>
                <div>
                  <h5 className="font-bold text-white uppercase tracking-wider text-xs">Chef Antonio AI</h5>
                  <span className="text-[9px] text-emerald-400 uppercase font-mono tracking-wider block">Authorized Michelin-Star AI Assistant</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs bg-black/40 rounded-2xl border border-white/5">
                <p className="text-[#D4AF37] leading-relaxed">
                  *A warm golden light surrounds Chef Antonio as he pours a splash of clarified butter into the sizzling skillet...*
                </p>
                <p className="text-gray-300 leading-relaxed">
                  "Greetings, my dear culinary explorer! Ask me to recommend items, compare dishes (like Salmon vs. Steak), walk you through table bookings, or explain our thermal delivery and 2-hour refund policies!"
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 text-center">
                <p className="text-[10px] text-gray-500 font-mono uppercase mb-2">Use the Floating Chef Character in the bottom-right corner to talk in real-time!</p>
              </div>
            </div>
          </div>
        )}

        {/* Render Page 39: Admin Dashboard */}
        {currentView === 'Admin Dashboard' && (
          <AdminPanel 
            menuItems={menuItems}
            setMenuItems={setMenuItems}
            orders={orders}
            setOrders={setOrders}
            reservations={reservations}
            setReservations={setReservations}
            blogPosts={blogPosts}
            reviews={reviews}
            careers={careers}
            currency={currency}
            language={language}
          />
        )}

      </div>

    </div>
  );
}
