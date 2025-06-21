import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Lavender Haze Hoodie',
    price: 65,
    originalPrice: 80,
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Cozy purple hoodie inspired by dreamy midnight vibes',
    category: 'apparel',
    inStock: true,
    urgencyMessage: 'Only 3 left in your size! 💜'
  },
  {
    id: '2',
    name: 'Midnights Vinyl Record',
    price: 34,
    image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Limited edition vinyl with exclusive bonus tracks',
    category: 'music',
    inStock: true,
    urgencyMessage: 'Limited edition - almost sold out! 🎵'
  },
  {
    id: '3',
    name: 'Anti-Hero Tote Bag',
    price: 28,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Stylish canvas tote perfect for everyday adventures',
    category: 'accessories',
    inStock: true,
    urgencyMessage: 'Perfect for carrying all your essentials! 👜'
  },
  {
    id: '4',
    name: 'Enchanted Forest Scarf',
    price: 42,
    originalPrice: 55,
    image: 'https://images.pexels.com/photos/7319070/pexels-photo-7319070.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Magical woodland-inspired soft scarf',
    category: 'accessories',
    inStock: true,
    urgencyMessage: 'Stay cozy and stylish! ✨'
  },
  {
    id: '5',
    name: 'Folklore Cardigan',
    price: 89,
    image: 'https://images.pexels.com/photos/7945645/pexels-photo-7945645.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Vintage-inspired cardigan for those cozy autumn days',
    category: 'apparel',
    inStock: true,
    urgencyMessage: 'This one always sells out fast! 🍂'
  },
  {
    id: '6',
    name: 'Golden Hour Phone Case',
    price: 25,
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Shimmery phone case that catches the light beautifully',
    category: 'accessories',
    inStock: true,
    urgencyMessage: 'Protect your phone in style! ✨'
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  return mockProducts.filter(product => product.category === category);
};

export const getRandomProduct = (): Product => {
  return mockProducts[Math.floor(Math.random() * mockProducts.length)];
};

export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return mockProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
};