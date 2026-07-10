export interface MenuItem {
  id: string;
  name: string;
  tamilName?: string; // traditional sub-label for authenticity (vintage aesthetic)
  description: string;
  price: number;
  category: "all" | "beverages" | "small-plates" | "grills" | "curries" | "breads-rice" | "desserts";
  isVegetarian: boolean;
  isVegan: boolean;
  isSpicy: boolean;
  isPopular: boolean;
  isChefRecommendation: boolean;
  spiceLevel: 0 | 1 | 2 | 3; // 0=none, 1=mild, 2=medium, 3=hot
}

export interface RestaurantLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
  directionsUrl: string;
  mapEmbedUrl?: string;
  description: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "interior" | "dishes" | "historical" | "behind-the-scenes";
  caption: string;
  date?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  isCustom?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "reservations" | "menu" | "events" | "general";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface RecommendationResult {
  dishName: string;
  reason: string;
  beverage: string;
}

export interface MealPlanResult {
  theme: string;
  starters: string[];
  mains: string[];
  dessert: string;
  notes: string;
}
