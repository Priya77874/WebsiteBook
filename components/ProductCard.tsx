import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Star, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart, activeDiscount } = useStore();

  const finalDiscount = Math.max(product.discount, activeDiscount);
  const finalPrice = Math.round(product.price * (1 - finalDiscount / 100));

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="relative h-64 overflow-hidden bg-gray-50 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.title} 
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {finalDiscount > 0 && (
          <div className="absolute top-3 left-3 bg-secondary text-white text-xs font-bold px-2 py-1 rounded">
            -{finalDiscount}% OFF
          </div>
        )}
        <div className="absolute bottom-[-50px] group-hover:bottom-4 left-0 right-0 flex justify-center gap-2 transition-all duration-300">
          <button 
            onClick={() => onViewDetails(product)}
            className="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors"
            title="View Details"
          >
            <Eye size={20} />
          </button>
          <button 
            onClick={() => addToCart(product)}
            className="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors"
            title="Add to Cart"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-gray-500 mb-1">{product.category}</div>
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{product.title}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.author}</p>
        
        <div className="flex items-center gap-1 mb-3">
          <Star size={14} className="fill-secondary text-secondary" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviewsCount})</span>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div>
            <span className="text-lg font-bold text-primary">₹{finalPrice}</span>
            {finalDiscount > 0 && (
              <span className="text-sm text-gray-400 line-through ml-2">₹{product.price}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;