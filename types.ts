
export enum AppView {
  LANDING = 'landing',
  SHOP = 'shop',
  CHECKOUT = 'checkout',
  LOGIN = 'login',
  ADMIN_DASHBOARD = 'admin_dashboard',
  ADMIN_INVENTORY = 'admin_inventory',
  ADMIN_REVENUE = 'admin_revenue',
  ABOUT = 'about',
  CONTACT = 'contact',
  PROFILE = 'profile',
  CUSTOMER_ORDERS = 'customer_orders',
}

export interface CustomerProfile {
  name: string;
  phone: string;
  address: string;
  bio: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  price: number;
  availableQty: number;
  maxQty: number;
  image: string;
  inStock: boolean;
  lowStockThreshold: number;
  tag?: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  items: string;
  total: number;
  status: 'Paid' | 'Pending' | 'Packed' | 'Shipped';
  date: string;
  address?: string;
  phone?: string;
  detailedItems?: { name: string; qty: number; price: number }[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}

export interface Stat {
  label: string;
  value: string;
  trend: string;
  trendType: 'up' | 'down';
  icon: string;
}

// Added FarmerApplication interface to fix import error in FarmerPartnershipPage.tsx
export interface FarmerApplication {
  id: string;
  farmName: string;
  location: string;
  produce: string;
  contactName: string;
  phone: string;
  date: string;
}
