import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Phone, User as UserIcon, LogOut, Facebook, Instagram, Twitter } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cart, isCartOpen, toggleCart, user, logout } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Top Bar */}
      <div className="bg-primary-dark text-white text-xs py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Phone size={12} /> +91 98911 72140</span>
          <span className="hidden md:inline">Govindpuri, Delhi 110019</span>
        </div>
        <div className="flex gap-3">
          {user ? (
             <div className="flex items-center gap-2 cursor-pointer hover:text-secondary" onClick={logout}>
               <span className="hidden md:inline">Admin</span>
               <LogOut size={12} />
             </div>
          ) : (
            <Link to="/admin" className="hover:text-secondary">Admin Login</Link>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-surface shadow-sm sticky top-0 z-40 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-secondary font-bold text-xl">
              A
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary font-poppins leading-none">ANJEET</h1>
              <p className="text-xs text-gray-500 tracking-wider">BOOK DEALER</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.path ? 'text-primary font-bold' : 'text-gray-600'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button 
              className="relative p-2 text-gray-700 hover:text-primary transition-transform hover:scale-105"
              onClick={toggleCart}
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-secondary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-4 flex flex-col gap-4 shadow-lg absolute w-full z-50">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-gray-700 font-medium py-2 border-b border-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white pt-12 pb-6">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary">Anjeet Book Dealer</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Your trusted partner for education. We provide a wide range of academic and non-academic books at the best prices.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-300 hover:text-secondary"><Instagram size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-secondary"><Facebook size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-secondary"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/shop" className="hover:text-secondary">Shop All</Link></li>
              <li><Link to="/about" className="hover:text-secondary">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-secondary">Contact</Link></li>
              <li><Link to="/terms" className="hover:text-secondary">Terms & Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/shop" className="hover:text-secondary">NCERT Books</Link></li>
              <li><Link to="/shop" className="hover:text-secondary">Competitive Exams</Link></li>
              <li><Link to="/shop" className="hover:text-secondary">Novels</Link></li>
              <li><Link to="/shop" className="hover:text-secondary">Stationery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex gap-2">
                <div className="mt-1"><Phone size={14} className="text-secondary" /></div>
                <span>+91 98911 72140</span>
              </li>
              <li className="flex gap-2">
                 <div className="mt-1">📍</div>
                 <span>Khasra No 69, Galli 19, Govindpuri Ext, Delhi 110019</span>
              </li>
              <li className="flex gap-2">
                 <div className="mt-1">✉️</div>
                 <span>anjeetsingh390@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-800 mt-10 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Anjeet Book Dealer. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
