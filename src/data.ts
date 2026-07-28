import { MenuItem, BlogPost, Review, Order, UserProfile, GiftCard, Promotion, CareerOpportunity } from './types';

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Grilled Salmon with Lemon Butter',
    price: 24.99,
    description: 'Fresh salmon grilled to perfection served with lemon butter sauce and seasonal vegetables.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600',
    category: 'Main Course',
    ingredients: ['Salmon', 'Lemon Butter Sauce', 'Garlic', 'Herbs', 'Vegetables'],
    calories: 450,
    prepTime: '20 mins',
    spiceLevel: 0,
    rating: 4.9,
    reviewsCount: 142,
    isChefSpecial: true,
    isSignature: true,
    isVegetarian: false,
    isVegan: false,
    isHalal: true,
    isGlutenFree: true,
    availability: 'Available'
  },
  {
    id: '2',
    name: 'Beef Steak with Herbs',
    price: 28.99,
    description: 'Prime cut tenderloin cooked to order with fresh rosemary, thyme, and roasted gold potatoes.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    category: 'Main Course',
    ingredients: ['Prime Tenderloin', 'Rosemary', 'Garlic', 'Butter', 'Gold Potatoes'],
    calories: 680,
    prepTime: '25 mins',
    spiceLevel: 1,
    rating: 4.8,
    reviewsCount: 198,
    isChefSpecial: true,
    isSignature: true,
    isVegetarian: false,
    isVegan: false,
    isHalal: true,
    isGlutenFree: true,
    availability: 'Available'
  },
  {
    id: '3',
    name: 'Truffle Pasta Creamy Delight',
    price: 21.99,
    description: 'Handcrafted fettuccine tossed in a rich black truffle and white wine cream sauce with shaved parmesan.',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&q=80&w=600',
    category: 'Main Course',
    ingredients: ['Fettuccine', 'Black Truffle Paste', 'Heavy Cream', 'White Wine', 'Parmigiano-Reggiano'],
    calories: 550,
    prepTime: '15 mins',
    spiceLevel: 0,
    rating: 4.9,
    reviewsCount: 110,
    isChefSpecial: false,
    isSignature: true,
    isVegetarian: true,
    isVegan: false,
    isHalal: true,
    isGlutenFree: false,
    availability: 'Available'
  },
  {
    id: '4',
    name: 'Chocolate Lava Cake with Ice Cream',
    price: 9.99,
    description: 'Warm chocolate cake with a molten dark chocolate core, served with gourmet vanilla bean gelato.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
    category: 'Desserts',
    ingredients: ['Belgian Chocolate', 'Flour', 'Eggs', 'Butter', 'Vanilla Gelato'],
    calories: 380,
    prepTime: '10 mins',
    spiceLevel: 0,
    rating: 5.0,
    reviewsCount: 235,
    isChefSpecial: true,
    isSignature: false,
    isVegetarian: true,
    isVegan: false,
    isHalal: true,
    isGlutenFree: false,
    availability: 'Available'
  },
  {
    id: '5',
    name: 'Grilled Chicken with Herbs',
    price: 16.99,
    description: 'Juicy chicken breast marinated in wild herbs, garlic, and citrus juice, served with wild rice.',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=600',
    category: 'Starters',
    ingredients: ['Chicken Breast', 'Thyme', 'Rosemary', 'Garlic', 'Citrus Juice', 'Wild Rice'],
    calories: 410,
    prepTime: '18 mins',
    spiceLevel: 1,
    rating: 4.7,
    reviewsCount: 88,
    isChefSpecial: false,
    isSignature: false,
    isVegetarian: false,
    isVegan: false,
    isHalal: true,
    isGlutenFree: true,
    availability: 'Available'
  },
  {
    id: '6',
    name: 'Margherita Pizza with Fresh Basil',
    price: 13.99,
    description: 'Classic Neapolitan pizza with San Marzano tomatoes, fresh mozzarella di bufala, and fragrant basil.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=600',
    category: 'Pizza',
    ingredients: ['San Marzano Tomatoes', 'Mozzarella di Bufala', 'Fresh Basil', 'Extra Virgin Olive Oil'],
    calories: 520,
    prepTime: '12 mins',
    spiceLevel: 0,
    rating: 4.8,
    reviewsCount: 165,
    isChefSpecial: false,
    isSignature: false,
    isVegetarian: true,
    isVegan: false,
    isHalal: true,
    isGlutenFree: false,
    availability: 'Available'
  },
  {
    id: '7',
    name: 'Creamy Alfredo Pasta',
    price: 15.99,
    description: 'Traditional rich creamy Alfredo sauce with imported butter and parmesan, tossed with freshly made fettuccine.',
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&q=80&w=600',
    category: 'Main Course',
    ingredients: ['Fresh Fettuccine', 'Heavy Cream', 'Parmesan Cheese', 'Garlic', 'Butter'],
    calories: 590,
    prepTime: '15 mins',
    spiceLevel: 0,
    rating: 4.6,
    reviewsCount: 74,
    isChefSpecial: false,
    isSignature: false,
    isVegetarian: true,
    isVegan: false,
    isHalal: true,
    isGlutenFree: false,
    availability: 'Available'
  },
  {
    id: '8',
    name: 'Classic New York Cheesecake',
    price: 6.99,
    description: 'Rich, smooth and creamy cheesecake with a buttery graham cracker crust and mixed berry compote.',
    image: 'https://images.unsplash.com/photo-1508737027454-e6454ef45afd?auto=format&fit=crop&q=80&w=600',
    category: 'Desserts',
    ingredients: ['Cream Cheese', 'Sugar', 'Eggs', 'Graham Cracker', 'Mixed Berries'],
    calories: 340,
    prepTime: '5 mins',
    spiceLevel: 0,
    rating: 4.9,
    reviewsCount: 121,
    isChefSpecial: false,
    isSignature: false,
    isVegetarian: true,
    isVegan: false,
    isHalal: true,
    isGlutenFree: false,
    availability: 'Available'
  },
  {
    id: '9',
    name: 'Imperial Golden Mojito',
    price: 8.99,
    description: 'A refreshing mix of white rum, fresh lime, organic sugar, mint leaves, and a touch of edible 24k gold leaf.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
    category: 'Beverages',
    ingredients: ['Mint Leaves', 'Lime Juice', 'Organic Sugar', 'Soda Water', 'Edible Gold Leaf'],
    calories: 120,
    prepTime: '5 mins',
    spiceLevel: 0,
    rating: 4.9,
    reviewsCount: 54,
    isChefSpecial: true,
    isSignature: false,
    isVegetarian: true,
    isVegan: true,
    isHalal: true,
    isGlutenFree: true,
    availability: 'Available'
  },
  {
    id: '10',
    name: 'Golden Saffron Espresso Martini',
    price: 11.99,
    description: 'Premium vodka, fresh organic espresso, coffee liqueur, and a hint of Persian saffron syrup.',
    image: 'https://images.unsplash.com/photo-1545438102-799c3991ffb2?auto=format&fit=crop&q=80&w=600',
    category: 'Beverages',
    ingredients: ['Espresso', 'Vodka', 'Coffee Liqueur', 'Saffron Syrup'],
    calories: 180,
    prepTime: '7 mins',
    spiceLevel: 0,
    rating: 4.8,
    reviewsCount: 46,
    isChefSpecial: false,
    isSignature: true,
    isVegetarian: true,
    isVegan: true,
    isHalal: true,
    isGlutenFree: true,
    availability: 'Available'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Perfect Italian Pizza',
    excerpt: 'Discover the ancient secrets of San Marzano tomatoes, perfect flour hydration, and wood-fire oven control.',
    content: 'Making the perfect Italian Neapolitan pizza is a dance of timing, temperature, and premium ingredients. True San Marzano tomatoes must grow in the volcanic soil of Mount Vesuvius to develop their sweet, low-acid flavor. At Flavoria, our dough undergoes a strict 48-hour fermentation cycle, yielding a thin, airy, leopard-spotted crust that melts in your mouth.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600',
    date: 'May 21, 2026',
    readTime: '5 min read',
    author: 'Chef Alessandro Rossi',
    category: 'Culinary Secrets'
  },
  {
    id: '2',
    title: 'Healthy Eating Made Easy & Delicious',
    excerpt: 'Who says Michelin-star caliber food cannot be incredibly nutritious? Learn how we balance micro-nutrients.',
    content: 'Our philosophy at Flavoria is that luxury dining should nourish both the soul and the body. We work with local organic farms to source pesticide-free produce and wild-caught seafood. Through techniques like cold-pressing, vacuum sous-vide, and gentle light wood smoking, we preserve active enzymes, healthy vitamins, and beautiful natural flavors without relying on heavy saturated fats.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600',
    date: 'May 10, 2026',
    readTime: '4 min read',
    author: 'Nutritionist Elena Thorne',
    category: 'Wellness & Lifestyle'
  },
  {
    id: '3',
    title: 'Behind the Scenes in Our Kitchen',
    excerpt: 'A deep look into the adrenaline-pumping, passionate choreography of a modern fine-dining Michelin kitchen.',
    content: 'Before the first guest is seated at 6:00 PM, the kitchen is already alive with precise preparation. Every station—from larder to grill—is structured meticulously. Knives are sharpened, fresh herbs are picked, stocks are reduced, and the master chef performs flavor tastings of every single sauce. Experience the passion and focus that fuels our culinary crew.',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=600',
    date: 'May 03, 2026',
    readTime: '6 min read',
    author: 'Chef David Sterling',
    category: 'Behind the Scenes'
  }
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    userName: 'John Doe',
    rating: 5,
    comment: 'The Grilled Salmon is the best I have ever had! The lemon butter sauce is incredibly rich yet perfectly balanced. The luxury black & gold ambiance makes you feel like royalty.',
    date: 'June 18, 2026',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    dishName: 'Grilled Salmon with Lemon Butter'
  },
  {
    id: '2',
    userName: 'Emma Watson',
    rating: 5,
    comment: 'A true masterpiece of culinary arts. From the floating glass presentation cards to the animated master chef AI chatbot that recommended my wine pairing, everything was impeccable.',
    date: 'June 14, 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: '3',
    userName: 'Ali Khan',
    rating: 4.8,
    comment: 'Flavoria has set the standard for smart fine-dining in 2026. The saffron espresso martini is pure liquid gold. Highly recommend booking a table in advance via their reservation portal.',
    date: 'June 05, 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: '4',
    userName: 'Sarah Smith',
    rating: 5,
    comment: 'Their chocolate lava cake is an absolute dream! Perfectly gooey in the center with top-notch gelato. Will definitely be ordering delivery again soon.',
    date: 'May 28, 2026',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    dishName: 'Chocolate Lava Cake with Ice Cream'
  }
];

export const FAQS = [
  {
    question: 'How do I book a private dining experience?',
    answer: 'You can book our exclusive private dining rooms directly through our "Private Dining" tab or by chatting with our AI Chef Assistant. We offer space for 8 to 50 guests with customizable Michelin-star menus.'
  },
  {
    question: 'What is your refund policy for delivery orders?',
    answer: 'At Flavoria, customer satisfaction is paramount. If you are not completely satisfied with your gourmet meal or if it arrives cold, please contact support or initiate a refund claim in the "Refund Policy" section within 2 hours of delivery for a full refund or immediate replacement.'
  },
  {
    question: 'Are there gluten-free and vegan options available?',
    answer: 'Yes! We pride ourselves on accommodating all dietary preferences. Our full menu features detailed badges for Vegan, Vegetarian, Halal, and Gluten-Free. You can filter the menu instantly using these options.'
  },
  {
    question: 'What are the loyalty rewards & membership tiers?',
    answer: 'Every dollar spent earns 1 loyalty point. Points can be used to redeem free signature dishes, secret gourmet cocktails, or entry to our monthly chef tasting events. Tiers include Bronze, Silver, Gold, and Platinum, unlocking deeper luxury discounts.'
  },
  {
    question: 'Can I purchase digital Gift Cards?',
    answer: 'Absolutely! Digital luxury Gift Cards are available on our Gift Cards page starting from $25 to $500, with gold custom envelopes, and can be redeemed instantly online or in-house.'
  }
];

export const INITIAL_PROMOTIONS: Promotion[] = [
  {
    id: 'p1',
    code: 'GOLDEN2026',
    title: 'Imperial Dining Special',
    description: 'Enjoy 15% discount on all main course dishes and signature desserts.',
    discountPercent: 15,
    expiryDate: '2026-12-31'
  },
  {
    id: 'p2',
    code: 'CHEFSECRET',
    title: 'Secret Tasting Invitation',
    description: 'Get a complimentary Golden Mojito drink with any order above $50.',
    discountPercent: 10,
    expiryDate: '2026-08-15'
  }
];

export const INITIAL_GIFT_CARDS: GiftCard[] = [
  {
    id: 'g1',
    code: 'FLAV-GOLD-100',
    balance: 100.00,
    expiryDate: '2027-06-30',
    recipientName: 'Valued Guest'
  }
];

export const CAREER_OPPORTUNITIES: CareerOpportunity[] = [
  {
    id: 'c1',
    title: 'Chef de Cuisine',
    department: 'Kitchen Operations',
    type: 'Full Time',
    location: 'Flavoria Flagship, NY',
    salaryRange: '$85,000 - $110,000 / year',
    description: 'We are seeking an innovative, visionary Chef de Cuisine to direct our kitchen operations, oversee menu design, and maintain michelin-caliber precision.',
    requirements: [
      '5+ years experience in a Michelin-starred or high-end fine dining establishment.',
      'Exceptional leadership, culinary technique, and kitchen inventory knowledge.',
      'Deep passion for avant-garde food plating and high-end gastronomy.'
    ]
  },
  {
    id: 'c2',
    title: 'Sommelier & Wine Director',
    department: 'Beverage Operations',
    type: 'Full Time',
    location: 'Flavoria Flagship, NY',
    salaryRange: '$70,000 - $90,000 / year',
    description: 'Direct our award-winning wine pairing cellar, consult with guests on premium pairings, and curate our high-end champagne and cocktail list.',
    requirements: [
      'Certified or Master Sommelier credentials.',
      'Stellar verbal skills and deep knowledge of classic and organic world wines.',
      'Experience managing high-value inventory and developing signature cocktail menus.'
    ]
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: '1025',
    items: [
      {
        menuItem: INITIAL_MENU_ITEMS[0], // Salmon
        quantity: 2,
        selectedSize: 'Regular'
      },
      {
        menuItem: INITIAL_MENU_ITEMS[3], // Lava Cake
        quantity: 1,
        selectedSize: 'Regular'
      }
    ],
    subtotal: 59.97,
    deliveryFee: 5.00,
    total: 64.97,
    status: 'Delivered',
    customerName: 'John Doe',
    email: 'john@example.com',
    address: '123 Forest Street, Flavor City, CA',
    phone: '+1 234 567 890',
    paymentMethod: 'Credit Card',
    date: '2026-07-02 12:45'
  },
  {
    id: '1024',
    items: [
      {
        menuItem: INITIAL_MENU_ITEMS[1], // Steak
        quantity: 1,
        selectedSize: 'Large'
      },
      {
        menuItem: INITIAL_MENU_ITEMS[7], // Cheesecake
        quantity: 1,
        selectedSize: 'Regular'
      }
    ],
    subtotal: 35.98,
    deliveryFee: 5.00,
    total: 40.98,
    status: 'Delivered',
    customerName: 'Emma Watson',
    email: 'emma@example.com',
    address: '456 luxury Boulevard, NY',
    phone: '+1 987 654 321',
    paymentMethod: 'PayPal',
    date: '2026-07-02 14:15'
  },
  {
    id: '1023',
    items: [
      {
        menuItem: INITIAL_MENU_ITEMS[2], // Truffle Pasta
        quantity: 1,
        selectedSize: 'Regular'
      }
    ],
    subtotal: 21.99,
    deliveryFee: 5.00,
    total: 26.99,
    status: 'Preparing',
    customerName: 'Ali Khan',
    email: 'ali@example.com',
    address: '789 Gold Lane, Heights, TX',
    phone: '+1 456 789 123',
    paymentMethod: 'Cash on Delivery',
    date: '2026-07-02 16:50'
  }
];

export const USER_PROFILE: UserProfile = {
  name: 'Admin User',
  email: 'admin@flavoria.com',
  phone: '+1 555 777 888',
  addresses: ['123 Royal Castle Court, Gold Coast, CA', 'Flavoria Corporate HQ, NY'],
  loyaltyPoints: 1250,
  membershipTier: 'Gold',
  joinedDate: 'Jan 15, 2026'
};
