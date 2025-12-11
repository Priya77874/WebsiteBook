export interface Product {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  discount: number; // Percentage
  stock: number;
  image: string;
  description: string;
  isFeatured?: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  username: string;
  isAdmin: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  items: CartItem[];
  totalAmount: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  paymentMethod: 'COD' | 'Online';
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export type Category = 'Novels' | 'Motivational' | 'Spiritual' | 'NCERT' | 'Competitive' | 'Stationery';