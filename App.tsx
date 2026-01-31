
import React, { useState, useEffect, useMemo } from 'react';
import { AppView, Product, CartItem, Order } from './types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from './constants';
import LandingPage from './pages/LandingPage';
import ShopPage from './pages/ShopPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminInventory from './pages/AdminInventory';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // Persistence (Mock)
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const renderView = () => {
    switch (view) {
      case AppView.LANDING:
        return <LandingPage setView={setView} products={products.slice(0, 4)} onAddToCart={addToCart} />;
      case AppView.SHOP:
        return (
          <ShopPage
            products={products}
            cart={cart}
            onAddToCart={addToCart}
            onUpdateCart={updateCartQuantity}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
            setView={setView}
          />
        );
      case AppView.CHECKOUT:
        return <CheckoutPage cart={cart} setView={setView} clearCart={clearCart} />;
      case AppView.LOGIN:
        return <LoginPage setView={setView} />;
      case AppView.ADMIN_DASHBOARD:
        return <AdminDashboard setView={setView} orders={orders} products={products} />;
      case AppView.ADMIN_INVENTORY:
        return <AdminInventory setView={setView} products={products} setProducts={setProducts} />;
      default:
        return <LandingPage setView={setView} products={products.slice(0, 4)} onAddToCart={addToCart} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderView()}
    </div>
  );
};

export default App;
