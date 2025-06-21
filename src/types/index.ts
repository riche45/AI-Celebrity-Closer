export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  audioUrl?: string;
  product?: Product;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  category: string;
  inStock: boolean;
  urgencyMessage?: string;
}

export interface ChatResponse {
  message: string;
  audioUrl?: string;
  product?: Product;
  shouldRecommendProduct: boolean;
}

export interface ApiError {
  error: string;
  details?: string;
}