import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Truck, Award, Clock } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/mockData';
import { Product } from '../types';

const Home: React.FC = () => {
  const { products } = useStore();
  const navigate = useNavigate();
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] bg-primary flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          alt="Books" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="container mx-auto px-4 relative z-20 text-white">
          <div className="max-w-2xl">
            <span className="bg-secondary text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              Back to School Sale
            </span>
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6 leading-tight">
              Unlock Your Potential <br /> With The Right Books
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-lg">
              From NCERT textbooks to life-changing novels, find everything you need to succeed in your journey.
            </p>
            <Link 
              to="/shop" 
              className="bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all inline-flex items-center gap-2"
            >
              Shop Now <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-white py-8 shadow-sm">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, text: "Fast Delivery", sub: "Within Delhi NCR" },
            { icon: Award, text: "Best Quality", sub: "Original prints" },
            { icon: BookOpen, text: "Huge Collection", sub: "Academic & Fiction" },
            { icon: Clock, text: "24/7 Support", sub: "WhatsApp us anytime" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-4 border rounded-lg bg-gray-50">
              <item.icon className="text-secondary" size={32} />
              <div>
                <div className="font-bold text-gray-900">{item.text}</div>
                <div className="text-xs text-gray-500">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-poppins text-center mb-12">Explore Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <div 
                key={cat} 
                onClick={() => navigate(`/shop?category=${cat}`)}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition-all hover:-translate-y-1 text-center border border-gray-100 group"
              >
                <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <BookOpen size={20} />
                </div>
                <h3 className="font-semibold text-gray-800">{cat}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold font-poppins text-gray-900">Best Sellers</h2>
              <p className="text-gray-500 mt-2">Top rated books selected for you</p>
            </div>
            <Link to="/shop" className="text-primary font-semibold hover:underline flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onViewDetails={() => navigate(`/shop?product=${product.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-poppins mb-12">What Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rahul S.", text: "Found all my Class 12 NCERT books here at a great discount. Delivery was super fast within Govindpuri." },
              { name: "Sneha M.", text: "The collection of novels is amazing. I love the packaging and the little bookmarks they send." },
              { name: "Amit K.", text: "Anjeet Book Dealer is my go-to for competitive exam prep books. Authentic editions only." }
            ].map((t, i) => (
              <div key={i} className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <p className="italic mb-4">"{t.text}"</p>
                <div className="font-bold text-secondary">- {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;