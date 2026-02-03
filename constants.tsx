
import React from 'react';
import { Product } from './types';

export const COLORS = {
  primary: '#22c55e', // green-600
  primaryDark: '#16a34a', // green-700
  secondary: '#1e293b', // slate-800
};

export const Icons = {
  Leaf: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
  Cart: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  Dashboard: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Inventory: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  Search: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Organic Vine Tomatoes',
    category: 'Vegetables',
    unit: 'kg',
    price: 60,
    availableQty: 45,
    maxQty: 100,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    lowStockThreshold: 10,
    tag: 'Fresh',
    description: 'Juicy, sun-ripened tomatoes grown without any synthetic pesticides.'
  },
  {
    id: 'p2',
    name: 'Farm Fresh Country Eggs',
    category: 'Dairy & Eggs',
    unit: 'doz',
    price: 120,
    availableQty: 15,
    maxQty: 30,
    image: 'https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    lowStockThreshold: 5,
    tag: 'Popular',
    description: 'Free-range country chicken eggs, rich in flavor and nutrition.'
  },
  {
    id: 'p3',
    name: 'Madurai Spinach (Palak)',
    category: 'Leafy Greens',
    unit: 'bunch',
    price: 25,
    availableQty: 20,
    maxQty: 50,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    lowStockThreshold: 8,
    tag: 'Fresh',
    description: 'Crispy, vibrant green spinach leaves harvested at dawn.'
  },
  {
    id: 'p4',
    name: 'Organic Alphonso Mangoes',
    category: 'Fruits',
    unit: 'kg',
    price: 240,
    availableQty: 12,
    maxQty: 40,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    lowStockThreshold: 5,
    tag: 'Seasonal',
    description: 'The king of fruits. Naturally ripened and incredibly sweet.'
  },
  {
    id: 'p5',
    name: 'Native Baby Carrots',
    category: 'Root Veg',
    unit: 'kg',
    price: 85,
    availableQty: 30,
    maxQty: 60,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    lowStockThreshold: 10,
    description: 'Sweet and crunchy root vegetables, perfect for salads or cooking.'
  },
  {
    id: 'p6',
    name: 'Fresh Buffalo Milk',
    category: 'Dairy & Eggs',
    unit: 'L',
    price: 75,
    availableQty: 5,
    maxQty: 20,
    image: 'https://images.unsplash.com/photo-1550583724-12770d88a04b?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    lowStockThreshold: 5,
    tag: 'Limited',
    description: 'Pure, thick, and unadulterated milk from our farm-reared buffaloes.'
  },
  {
    id: 'p7',
    name: 'Green Bell Peppers',
    category: 'Vegetables',
    unit: 'kg',
    price: 90,
    availableQty: 25,
    maxQty: 50,
    image: 'https://images.unsplash.com/photo-1563565312-82ca213b3074?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    lowStockThreshold: 5,
    description: 'Shiny, firm capsicums with a mild and sweet flavor profile.'
  },
  {
    id: 'p8',
    name: 'Organic Red Onions',
    category: 'Root Veg',
    unit: 'kg',
    price: 45,
    availableQty: 100,
    maxQty: 200,
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    lowStockThreshold: 20,
    description: 'Strong-flavored native onions, essential for every kitchen.'
  }
];

export const INITIAL_ORDERS: any[] = [];
