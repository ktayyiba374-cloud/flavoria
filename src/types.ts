export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  ingredients: string[];
  calories: number;
  prepTime: string;
  spiceLevel: number; // 0 to 3
  rating: number;
  reviewsCount: number;
  isChefSpecial: boolean;
  isSignature: boolean;
  isVegetarian: boolean;
  isVegan: boolean;
  isHalal: boolean;
  isGlutenFree: boolean;
  availability: 'Available' | 'Sold Out' | 'Limited';
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedSize: 'Regular' | 'Large';
}

export interface Reservation {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  dishName?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'Preparing' | 'Cooking' | 'Packed' | 'Out for Delivery' | 'Delivered';
  customerName: string;
  email: string;
  address: string;
  phone: string;
  paymentMethod: 'Credit Card' | 'PayPal' | 'Cash on Delivery';
  date: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  addresses: string[];
  loyaltyPoints: number;
  membershipTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  joinedDate: string;
}

export interface GiftCard {
  id: string;
  code: string;
  balance: number;
  expiryDate: string;
  recipientName: string;
}

export interface Promotion {
  id: string;
  code: string;
  title: string;
  description: string;
  discountPercent: number;
  expiryDate: string;
}

export interface CareerOpportunity {
  id: string;
  title: string;
  department: string;
  type: string; // "Full Time" | "Part Time"
  location: string;
  salaryRange: string;
  description: string;
  requirements: string[];
}
