import React, { useState } from 'react';
import { 
  BarChart3, 
  ShoppingBag, 
  Calendar, 
  Users, 
  Tags, 
  Settings, 
  LogOut, 
  Search, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Briefcase, 
  ShieldAlert,
  Edit,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { MenuItem, Order, Reservation, BlogPost, Review, CareerOpportunity } from '../types';

interface AdminPanelProps {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  reservations: Reservation[];
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
  blogPosts: BlogPost[];
  reviews: Review[];
  careers: CareerOpportunity[];
  currency: 'USD' | 'PKR';
  language: 'EN' | 'UR';
}

export default function AdminPanel({
  menuItems,
  setMenuItems,
  orders,
  setOrders,
  reservations,
  setReservations,
  blogPosts,
  reviews,
  careers,
  currency,
  language
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'reservations' | 'reviews' | 'careers' | 'settings'>('overview');
  const [newDishName, setNewDishName] = useState('');
  const [newDishPrice, setNewDishPrice] = useState('');
  const [newDishCategory, setNewDishCategory] = useState('Main Course');
  const [newDishImage, setNewDishImage] = useState('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600');
  
  const currencySymbol = currency === 'USD' ? '$' : 'Rs';
  const exchangeRate = currency === 'USD' ? 1 : 278;

  const formatPrice = (val: number) => {
    return `${currencySymbol}${(val * exchangeRate).toFixed(2)}`;
  };

  const handleAddDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDishName || !newDishPrice) return;
    
    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: newDishName,
      price: parseFloat(newDishPrice),
      description: 'Chef\'s premium artisan secret recipe, freshly made and plated with gold leaf accents.',
      image: newDishImage,
      category: newDishCategory,
      ingredients: ['Premium Ingredients', 'Chef Secret Spices', 'Organic Herbs'],
      calories: 480,
      prepTime: '20 mins',
      spiceLevel: 1,
      rating: 5.0,
      reviewsCount: 1,
      isChefSpecial: true,
      isSignature: false,
      isVegetarian: false,
      isVegan: false,
      isHalal: true,
      isGlutenFree: true,
      availability: 'Available'
    };

    setMenuItems(prev => [newItem, ...prev]);
    setNewDishName('');
    setNewDishPrice('');
  };

  const handleDeleteDish = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const handleUpdateReservationStatus = (resId: string, status: Reservation['status']) => {
    setReservations(prev => prev.map(r => r.id === resId ? { ...r, status } : r));
  };

  // Total sales calc
  const totalSalesVal = orders.filter(o => o.status === 'Delivered').reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="bg-[#0D0D0D] border border-[#D4AF37]/30 rounded-3xl overflow-hidden min-h-[680px] flex flex-col md:flex-row font-sans text-gray-300">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-[#0A0A0A] border-r border-[#D4AF37]/20 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-[#D4AF37]/20 pb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0D0D0D] font-black flex items-center justify-center text-sm shadow-[0_0_10px_rgba(212,175,55,0.2)]">F</div>
            <div>
              <span className="font-bold text-white tracking-widest block uppercase text-xs">Flavoria Hub</span>
              <span className="text-[9px] uppercase tracking-wider text-[#D4AF37] font-mono block">Backoffice Operations</span>
            </div>
          </div>

          <nav className="space-y-1.5">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs uppercase tracking-widest transition-all ${activeTab === 'overview' ? 'bg-[#D4AF37] text-black font-bold shadow-md' : 'hover:bg-white/5 hover:text-[#D4AF37]'}`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard Overview</span>
            </button>
            <button 
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs uppercase tracking-widest transition-all ${activeTab === 'products' ? 'bg-[#D4AF37] text-black font-bold shadow-md' : 'hover:bg-white/5 hover:text-[#D4AF37]'}`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Products &amp; Stock</span>
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-[#D4AF37] text-black font-bold shadow-md' : 'hover:bg-white/5 hover:text-[#D4AF37]'}`}
            >
              <Clock className="h-4 w-4" />
              <span>Live Orders ({orders.length})</span>
            </button>
            <button 
              onClick={() => setActiveTab('reservations')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs uppercase tracking-widest transition-all ${activeTab === 'reservations' ? 'bg-[#D4AF37] text-black font-bold shadow-md' : 'hover:bg-white/5 hover:text-[#D4AF37]'}`}
            >
              <Calendar className="h-4 w-4" />
              <span>Bookings ({reservations.length})</span>
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs uppercase tracking-widest transition-all ${activeTab === 'reviews' ? 'bg-[#D4AF37] text-black font-bold shadow-md' : 'hover:bg-white/5 hover:text-[#D4AF37]'}`}
            >
              <Users className="h-4 w-4" />
              <span>Guest Reviews</span>
            </button>
            <button 
              onClick={() => setActiveTab('careers')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs uppercase tracking-widest transition-all ${activeTab === 'careers' ? 'bg-[#D4AF37] text-black font-bold shadow-md' : 'hover:bg-white/5 hover:text-[#D4AF37]'}`}
            >
              <Briefcase className="h-4 w-4" />
              <span>Careers &amp; Crew</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-[#D4AF37]/10 text-center">
          <span className="text-[10px] text-gray-500 font-mono">SYSTEM CLOUD LIVE</span>
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full mx-auto mt-1 animate-pulse" />
        </div>
      </div>

      {/* Main Panel Body */}
      <div className="flex-1 p-6 md:p-8 space-y-6 overflow-x-hidden bg-gradient-to-b from-black to-[#0A0A0A]">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xl font-bold uppercase tracking-widest text-white">Dashboard Overview</h4>
                <p className="text-xs text-gray-500 font-mono">Shopify-Powered Live Analytics Suite</p>
              </div>
              <span className="text-xs bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full border border-[#D4AF37]/30 font-mono">Auto Refreshing</span>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#121212] border border-[#D4AF37]/15 p-5 rounded-2xl">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Completed Revenue</span>
                <span className="text-2xl font-bold font-mono text-[#D4AF37] block mt-1">{formatPrice(totalSalesVal + 52456)}</span>
                <span className="text-[10px] text-emerald-400 font-mono block mt-1">↑ +23.5% vs Last Month</span>
              </div>
              <div className="bg-[#121212] border border-[#D4AF37]/15 p-5 rounded-2xl">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Gourmet Orders Queue</span>
                <span className="text-2xl font-bold font-mono text-white block mt-1">{orders.length + 1245}</span>
                <span className="text-[10px] text-emerald-400 font-mono block mt-1">↑ +18.2% vs Last Month</span>
              </div>
              <div className="bg-[#121212] border border-[#D4AF37]/15 p-5 rounded-2xl">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Table Reservations</span>
                <span className="text-2xl font-bold font-mono text-white block mt-1">{reservations.length + 84}</span>
                <span className="text-[10px] text-[#D4AF37] font-mono block mt-1">✓ 100% capacity reserved</span>
              </div>
            </div>

            {/* Growth chart & Peak times */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-[#121212] border border-white/5 p-5 rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-widest text-white font-bold">2026 Hourly Sales Curve</span>
                  <span className="text-[10px] font-mono text-[#D4AF37]">Lunch vs Dinner</span>
                </div>
                <div className="h-40 flex items-end gap-3 pt-4 border-b border-white/5 pb-2">
                  {[40, 55, 30, 85, 95, 110, 45, 90, 120, 140, 75, 50].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full bg-gradient-to-t from-[#AA7C11] to-[#D4AF37] rounded-t" style={{ height: `${(val/140)*100}%` }} />
                      <span className="text-[9px] font-mono text-gray-500">{idx+11}h</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-gray-500 text-center font-mono">Our peak service window starts at 08:00 PM (20h) corresponding to VIP bookings.</p>
              </div>

              <div className="bg-[#121212] border border-white/5 p-5 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-white font-bold block">Live Order Channels</span>
                  <p className="text-[9px] text-gray-500">Distribution of source bookings</p>
                </div>
                <div className="space-y-3 my-4">
                  <div>
                    <div className="flex justify-between text-[11px] font-mono mb-1">
                      <span>Online Web Portal</span>
                      <span>58%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#1C1A17] rounded-full overflow-hidden">
                      <div className="bg-[#D4AF37] h-full" style={{ width: '58%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-mono mb-1">
                      <span>Chef AI Chatbot (Mascot)</span>
                      <span>32%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#1C1A17] rounded-full overflow-hidden">
                      <div className="bg-white h-full" style={{ width: '32%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-mono mb-1">
                      <span>In-House Walkins</span>
                      <span>10%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#1C1A17] rounded-full overflow-hidden">
                      <div className="bg-gray-700 h-full" style={{ width: '10%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS STOCK & ADD */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-bold uppercase tracking-widest text-white">Gourmet Products &amp; Catalog</h4>
              <p className="text-xs text-gray-500">Manage fine-dining items, live descriptions, prices, and stock counts.</p>
            </div>

            {/* Quick Add Form */}
            <form onSubmit={handleAddDish} className="bg-[#121212] border border-[#D4AF37]/20 p-5 rounded-2xl grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="text-[10px] uppercase font-mono text-[#D4AF37] block mb-1">Dish Name</label>
                <input 
                  type="text" 
                  value={newDishName} 
                  onChange={(e) => setNewDishName(e.target.value)}
                  placeholder="e.g. Imperial Golden Lobster"
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-mono text-[#D4AF37] block mb-1">Price (USD)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={newDishPrice} 
                  onChange={(e) => setNewDishPrice(e.target.value)}
                  placeholder="29.99"
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-mono text-[#D4AF37] block mb-1">Category</label>
                <select 
                  value={newDishCategory}
                  onChange={(e) => setNewDishCategory(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
                >
                  <option value="Starters">Starters</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Beverages">Beverages</option>
                </select>
              </div>
              <button 
                type="submit"
                className="w-full py-1.5 bg-[#D4AF37] text-black font-extrabold uppercase text-xs tracking-wider rounded-xl flex items-center justify-center gap-1 hover:scale-102 transition-all"
              >
                <Plus className="h-4 w-4" /> Add Product
              </button>
            </form>

            {/* Live catalog list */}
            <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden">
              <div className="p-4 bg-black/40 border-b border-white/5 font-bold text-xs text-white uppercase tracking-widest flex justify-between">
                <span>Active Menu Items ({menuItems.length})</span>
                <span>Actions</span>
              </div>
              <div className="divide-y divide-white/5">
                {menuItems.map((item) => (
                  <div key={item.id} className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={item.image} className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0" alt="" />
                      <div>
                        <span className="font-bold text-white text-sm block">{item.name}</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-mono">Category: {item.category} • {item.calories} cal</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-mono text-[#D4AF37] font-bold">{formatPrice(item.price)}</span>
                      <button 
                        onClick={() => handleDeleteDish(item.id)}
                        className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                        title="Delete from stock"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LIVE CULINARY ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-bold uppercase tracking-widest text-white">Live Culinary Queue</h4>
              <p className="text-xs text-gray-500 font-mono">Real-time status tracking from Kitchen Prep to Out for Delivery.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-[#121212] border border-white/5 p-5 rounded-2xl space-y-4">
                  <div className="flex flex-wrap justify-between items-center gap-2 border-b border-white/5 pb-3">
                    <div>
                      <span className="text-[#D4AF37] font-mono font-bold text-sm block">Order ID: #{order.id}</span>
                      <span className="text-[10px] text-gray-500 font-mono">{order.date} • {order.paymentMethod}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-mono text-gray-400">Current Phase:</span>
                      <select 
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as any)}
                        className="bg-black text-xs text-white border border-[#D4AF37]/30 px-3 py-1 rounded-xl outline-none focus:border-[#D4AF37] font-mono"
                      >
                        <option value="Preparing">Preparing</option>
                        <option value="Cooking">Cooking</option>
                        <option value="Packed">Packed</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-xs text-gray-300">
                        <span>{item.menuItem.name} ({item.selectedSize}) x{item.quantity}</span>
                        <span className="font-mono text-white">{formatPrice(item.menuItem.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap justify-between items-center border-t border-white/5 pt-3 gap-2">
                    <div className="text-[10px] text-gray-500 leading-relaxed">
                      <span className="font-bold text-white block">Guest Address:</span>
                      <span>{order.customerName} ({order.phone}) • {order.address}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-500 block">Total Paid</span>
                      <span className="text-sm font-bold font-mono text-[#D4AF37]">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: RESERVATIONS BOOKINGS */}
        {activeTab === 'reservations' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-bold uppercase tracking-widest text-white">VIP Table Reservations</h4>
              <p className="text-xs text-gray-500">Live guest bookings, seating registers, and special dining requests.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {reservations.map((res) => (
                <div key={res.id} className="bg-[#121212] border border-white/5 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[#D4AF37] font-mono text-xs font-bold uppercase">Booking Ref: {res.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                        res.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400' : res.status === 'Cancelled' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>{res.status}</span>
                    </div>
                    <h5 className="font-bold text-white text-sm">{res.fullName}</h5>
                    <p className="text-xs text-gray-400">
                      📅 Date: {res.date} • ⏰ Time: {res.time} • 👥 Guests: {res.guests}
                    </p>
                    {res.specialRequests && (
                      <p className="text-[11px] text-[#D4AF37] italic">"Request: {res.specialRequests}"</p>
                    )}
                    <p className="text-[10px] text-gray-500 font-mono">📞 {res.phone} • ✉️ {res.email}</p>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <button 
                      onClick={() => handleUpdateReservationStatus(res.id, 'Confirmed')}
                      className="px-3.5 py-1.5 bg-emerald-600/25 hover:bg-emerald-600/40 text-emerald-400 font-bold uppercase text-[10px] tracking-wider rounded-xl transition-all"
                    >
                      Confirm Seating
                    </button>
                    <button 
                      onClick={() => handleUpdateReservationStatus(res.id, 'Cancelled')}
                      className="px-3.5 py-1.5 bg-red-600/25 hover:bg-red-600/40 text-red-400 font-bold uppercase text-[10px] tracking-wider rounded-xl transition-all"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: REVIEWS MODERATION */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-bold uppercase tracking-widest text-white">Guest Reviews &amp; Feedback</h4>
              <p className="text-xs text-gray-500">Live testimonials and food rating reviews from guests.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-[#121212] border border-white/5 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-3">
                    <img src={rev.avatar} className="w-8 h-8 rounded-full border border-[#D4AF37]/30" alt="" />
                    <div>
                      <span className="font-bold text-white block text-xs">{rev.userName}</span>
                      <span className="text-[9px] text-gray-500 font-mono">{rev.date}</span>
                    </div>
                  </div>
                  <div className="flex text-[#D4AF37] text-xs">
                    {'★'.repeat(Math.floor(rev.rating))}
                    {rev.rating % 1 !== 0 ? '½' : ''}
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-3 italic">"{rev.comment}"</p>
                  {rev.dishName && (
                    <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] font-mono text-[9px] px-2 py-0.5 rounded uppercase font-bold border border-[#D4AF37]/20">Ordered: {rev.dishName}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: CAREERS & APPLICATIONS */}
        {activeTab === 'careers' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-bold uppercase tracking-widest text-white">Careers &amp; Active Applications</h4>
              <p className="text-xs text-gray-500">Recruit top Michelin chefs, sommeliers, and hospitality ambassadors.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {careers.map((car) => (
                <div key={car.id} className="bg-[#121212] border border-white/5 p-5 rounded-2xl space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-bold text-white text-sm uppercase tracking-wider">{car.title}</h5>
                      <span className="text-[10px] text-[#D4AF37] font-mono uppercase tracking-widest">{car.department} • {car.location}</span>
                    </div>
                    <span className="px-2.5 py-1 bg-[#D4AF37]/15 text-[#D4AF37] text-[9px] font-mono rounded font-bold uppercase tracking-wider border border-[#D4AF37]/25">{car.type}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{car.description}</p>
                  <div className="pt-2">
                    <span className="text-[10px] text-white font-bold uppercase font-mono block">Compensation:</span>
                    <span className="text-xs text-[#D4AF37] font-mono font-bold">{car.salaryRange}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
