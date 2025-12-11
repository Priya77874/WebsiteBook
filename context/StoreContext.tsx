import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, User, Order } from '../types';
import { MOCK_PRODUCTS, MOCK_ORDERS } from '../data/mockData';

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  activeDiscount: number; // Percentage based on time
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeDiscount, setActiveDiscount] = useState(0);

  // Time-based discount logic
  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      // Morning: 6-12 (5-10%) -> Let's say 10%
      if (hour >= 6 && hour < 12) {
        setActiveDiscount(10);
      } 
      // Evening: 17-22 (10-15%) -> Let's say 15%
      else if (hour >= 17 && hour < 22) {
        setActiveDiscount(15);
      } else {
        setActiveDiscount(0);
      }
    };
    checkTime();
    const interval = setInterval(checkTime, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const addOrder = (order: Order) => {
    setOrders([order, ...orders]);
  };

  const login = (u: User) => setUser(u);
  const logout = () => setUser(null);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // Calculate total with simple product discount, ignoring time discount for simplicity in subtotal, 
  // normally would apply time discount at checkout
  const cartTotal = cart.reduce((sum, item) => {
    const price = item.price * (1 - item.discount / 100);
    return sum + price * item.quantity;
  }, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        products,
        setProducts,
        user,
        login,
        logout,
        orders,
        addOrder,
        isCartOpen,
        toggleCart,
        activeDiscount
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};