import { Product, Review, Order } from '../types';

export const CATEGORIES = ['Novels', 'Motivational', 'Spiritual', 'NCERT', 'Competitive', 'Stationery'];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Motivational',
    price: 650,
    discount: 10,
    stock: 50,
    image: 'https://picsum.photos/seed/atomic/400/600',
    description: 'An easy & proven way to build good habits & break bad ones.',
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 120
  },
  {
    id: '2',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    category: 'Novels',
    price: 399,
    discount: 5,
    stock: 25,
    image: 'https://picsum.photos/seed/alchemist/400/600',
    description: 'A fable about following your dream.',
    isFeatured: true,
    rating: 4.5,
    reviewsCount: 85
  },
  {
    id: '3',
    title: 'NCERT Mathematics Class 10',
    author: 'NCERT',
    category: 'NCERT',
    price: 160,
    discount: 0,
    stock: 100,
    image: 'https://picsum.photos/seed/math10/400/600',
    description: 'Official textbook for Class 10 Mathematics.',
    rating: 4.2,
    reviewsCount: 40
  },
  {
    id: '4',
    title: 'General Knowledge 2024',
    author: 'Manohar Pandey',
    category: 'Competitive',
    price: 285,
    discount: 15,
    stock: 12,
    image: 'https://picsum.photos/seed/gk/400/600',
    description: 'Essential for all competitive exams.',
    isFeatured: false,
    rating: 4.0,
    reviewsCount: 15
  },
  {
    id: '5',
    title: 'Bhagavad Gita',
    author: 'Vyasa',
    category: 'Spiritual',
    price: 450,
    discount: 0,
    stock: 40,
    image: 'https://picsum.photos/seed/gita/400/600',
    description: 'The divine song of God.',
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 200
  },
  {
    id: '6',
    title: 'Classmate Notebook Pack',
    author: 'ITC',
    category: 'Stationery',
    price: 300,
    discount: 5,
    stock: 200,
    image: 'https://picsum.photos/seed/nb/400/600',
    description: 'Pack of 6 premium notebooks.',
    rating: 4.7,
    reviewsCount: 50
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Rahul Kumar',
    customerEmail: 'rahul@example.com',
    customerPhone: '9876543210',
    address: '123, Delhi Street',
    items: [
      { ...MOCK_PRODUCTS[0], quantity: 1 }
    ],
    totalAmount: 585,
    status: 'Delivered',
    date: '2023-10-15',
    paymentMethod: 'Online'
  },
  {
    id: 'ORD-002',
    customerName: 'Priya Singh',
    customerEmail: 'priya@example.com',
    customerPhone: '9123456789',
    address: '45, Noida Sector 18',
    items: [
      { ...MOCK_PRODUCTS[2], quantity: 2 }
    ],
    totalAmount: 320,
    status: 'Pending',
    date: '2023-10-26',
    paymentMethod: 'COD'
  }
];
