
export enum AppView {
  LANDING = 'landing',
  SHOP = 'shop',
  CHECKOUT = 'checkout',
  LOGIN = 'login',
  ADMIN_DASHBOARD = 'admin_dashboard',
  ADMIN_INVENTORY = 'admin_inventory',
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
  customerAvatar: string;
  items: string;
  total: number;
  status: 'Paid' | 'Pending' | 'Packed' | 'Shipped';
  date: string;
}

export interface Stat {
  label: string;
  value: string;
  trend: string;
  trendType: 'up' | 'down';
  icon: string;
}
