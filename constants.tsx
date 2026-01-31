
import React from 'react';

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

export const INITIAL_PRODUCTS: any[] = [
  {
    id: '1',
    name: 'Organic Spinach',
    category: 'Leafy Greens',
    unit: 'Bunch',
    price: 60,
    availableQty: 50,
    maxQty: 60,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=400&h=400&fit=crop',
    inStock: true,
    lowStockThreshold: 10,
    tag: 'Fresh',
    description: 'Freshly cut organic spinach, rich in iron and vitamins.'
  },
  {
    id: '2',
    name: 'Country Eggs',
    category: 'Dairy & Eggs',
    unit: 'pc',
    price: 10,
    availableQty: 15,
    maxQty: 100,
    image: 'https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?q=80&w=400&h=400&fit=crop',
    inStock: true,
    lowStockThreshold: 20,
    tag: 'Low Stock',
    description: 'Nutritious country eggs from pasture-raised hens.'
  },
  {
    id: '3',
    name: 'Red Tomatoes',
    category: 'Vegetables',
    unit: 'kg',
    price: 80,
    availableQty: 120,
    maxQty: 200,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?q=80&w=400&h=400&fit=crop',
    inStock: true,
    lowStockThreshold: 30,
    description: 'Vine-ripened organic tomatoes, perfect for salads and sauces.'
  },
  {
    id: '4',
    name: 'Sweet Carrots',
    category: 'Root Veg',
    unit: 'kg',
    price: 55,
    availableQty: 40,
    maxQty: 100,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=400&h=400&fit=crop',
    inStock: true,
    lowStockThreshold: 10,
    description: 'Crunchy and sweet carrots, harvested fresh this morning.'
  },
  {
    id: '5',
    name: 'Cauliflower',
    category: 'Vegetables',
    unit: 'pc',
    price: 45,
    availableQty: 92,
    maxQty: 100,
    image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?q=80&w=400&h=400&fit=crop',
    inStock: true,
    lowStockThreshold: 5,
    description: 'Dense and creamy organic cauliflower heads.'
  },
  {
    id: '6',
    name: 'Strawberries',
    category: 'Fruits',
    unit: 'box',
    price: 180,
    availableQty: 8,
    maxQty: 100,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=400&h=400&fit=crop',
    inStock: true,
    lowStockThreshold: 10,
    tag: 'Last Batch',
    description: 'Juicy, sweet strawberries picked at the peak of ripeness.'
  }
];

export const INITIAL_ORDERS: any[] = [
  { id: '#ORD-001', customerName: 'Sarah Johnson', customerAvatar: 'https://i.pravatar.cc/150?u=sarah', items: 'Organic Kale, Tomatoes...', total: 45.00, status: 'Paid', date: 'Oct 25, 2023' },
  { id: '#ORD-002', customerName: 'Michael Chen', customerAvatar: 'https://i.pravatar.cc/150?u=michael', items: 'Fresh Carrots (5kg)', total: 32.50, status: 'Pending', date: 'Oct 25, 2023' },
  { id: '#ORD-003', customerName: 'Emma Wilson', customerAvatar: 'https://i.pravatar.cc/150?u=emma', items: 'Mixed Herbs Box', total: 28.00, status: 'Packed', date: 'Oct 24, 2023' },
  { id: '#ORD-004', customerName: 'Robert Fox', customerAvatar: 'https://i.pravatar.cc/150?u=robert', items: 'Spinach, Potatoes', total: 15.50, status: 'Paid', date: 'Oct 24, 2023' },
];
