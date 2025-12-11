import React, { useState } from 'react';
import { X, Star, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface Props {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<Props> = ({ product, onClose }) => {
  const { addToCart, activeDiscount } = useStore();
  const [quantity, setQuantity] = useState(1);

  const finalDiscount = Math.max(product.discount, activeDiscount);
  const finalPrice = Math.round(product.price * (1 - finalDiscount / 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 z-10 bg-white rounded-full p-1"
        >
          <X size={24} />
        </button>

        {/* Image Section */}
        <div className="md:w-1/2 bg-gray-50 p-8 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-80 object-contain shadow-lg" 
          />
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 p-8">
          <div className="mb-2 text-sm text-primary font-semibold uppercase tracking-wide">
            {product.category}
          </div>
          <h2 className="text-3xl font-bold font-poppins text-gray-900 mb-2">{product.title}</h2>
          <p className="text-gray-600 mb-4">by <span className="font-medium">{product.author}</span></p>

          <div className="flex items-center gap-2 mb-6">
             <div className="flex text-secondary">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
               ))}
             </div>
             <span className="text-sm text-gray-500">({product.reviewsCount} reviews)</span>
          </div>

          <div className="mb-6">
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-primary">₹{finalPrice}</span>
              {finalDiscount > 0 && (
                <>
                  <span className="text-lg text-gray-400 line-through">₹{product.price}</span>
                  <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded font-bold">
                    {finalDiscount}% OFF
                  </span>
                </>
              )}
            </div>
            {activeDiscount > 0 && (
               <p className="text-xs text-secondary mt-1">Time-based discount applied!</p>
            )}
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="flex gap-4 mb-8">
             <div className="flex items-center border border-gray-300 rounded-lg">
               <button 
                 className="px-3 py-2 hover:bg-gray-100"
                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
               >-</button>
               <span className="px-3 font-medium">{quantity}</span>
               <button 
                 className="px-3 py-2 hover:bg-gray-100"
                 onClick={() => setQuantity(quantity + 1)}
               >+</button>
             </div>
             <button 
               onClick={() => {
                 for(let i=0; i<quantity; i++) addToCart(product);
                 onClose();
               }}
               className="flex-1 bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
             >
               <ShoppingBag size={20} /> Add to Cart
             </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 border-t pt-6">
            <div className="flex items-center gap-2">
              <Truck size={18} className="text-primary" /> Fast Delivery
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-primary" /> Genuine Product
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;