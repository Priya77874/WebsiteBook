import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/mockData';
import { Product } from '../types';

const Shop: React.FC = () => {
  const { products } = useStore();
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState(1000);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Initial load from URL
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    
    const prodId = searchParams.get('product');
    if (prodId) {
      const found = products.find(p => p.id === prodId);
      if (found) setSelectedProduct(found);
    }
  }, [searchParams, products]);

  // Filtering Logic
  useEffect(() => {
    let result = products;

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(lower) || 
        p.author.toLowerCase().includes(lower)
      );
    }

    result = result.filter(p => p.price <= priceRange);

    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, priceRange, products]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search & Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold font-poppins">Shop Books</h2>
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by title or author..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-8 flex-shrink-0">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 font-bold mb-4 pb-2 border-b">
              <SlidersHorizontal size={18} /> Filters
            </div>
            
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-sm">Categories</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input 
                    type="radio" 
                    name="category" 
                    checked={selectedCategory === 'All'}
                    onChange={() => setSelectedCategory('All')}
                    className="text-primary focus:ring-primary"
                  />
                  All Books
                </label>
                {CATEGORIES.map(cat => (
                  <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input 
                      type="radio" 
                      name="category" 
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="text-primary focus:ring-primary"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm">Max Price: ₹{priceRange}</h4>
              <input 
                type="range" 
                min="0" 
                max="2000" 
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹0</span>
                <span>₹2000+</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-xl">
              <h3 className="text-xl text-gray-500">No books found matching your criteria.</h3>
              <button 
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setPriceRange(2000); }}
                className="mt-4 text-primary hover:underline"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default Shop;