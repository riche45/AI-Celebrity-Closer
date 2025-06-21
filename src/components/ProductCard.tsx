import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-32 object-cover rounded-lg"
        />
        {product.originalPrice && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            SALE
          </div>
        )}
      </div>
      
      <div className="mt-3">
        <h3 className="font-semibold text-gray-800 text-sm">{product.name}</h3>
        <p className="text-gray-600 text-xs mt-1 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <span className="font-bold text-purple-600">${product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Star size={12} className="text-yellow-400 fill-current" />
            <span className="text-xs text-gray-600">4.9</span>
          </div>
        </div>
        
        {product.urgencyMessage && (
          <p className="text-xs text-red-600 font-medium mt-1">{product.urgencyMessage}</p>
        )}
        
        <button
          onClick={() => onAddToCart?.(product.id)}
          className="w-full mt-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <ShoppingCart size={14} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;