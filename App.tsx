
import React, { useState, useEffect, useCallback } from 'react';
import { AppView, Product, CartItem, Order, ContactMessage, CustomerProfile } from './types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from './constants';
import LandingPage from './pages/LandingPage';
import ShopPage from './pages/ShopPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminInventory from './pages/AdminInventory';
import AdminRevenue from './pages/AdminRevenue';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';
import CustomerOrdersPage from './pages/CustomerOrdersPage';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [profile, setProfile] = useState<CustomerProfile>({
    name: '',
    phone: '',
    address: '',
    bio: ''
  });

  // History API Management for Back Button support
  const navigateTo = useCallback((newView: AppView) => {
    if (newView !== view) {
      window.history.pushState({ view: newView }, '', '');
      setView(newView);
      window.scrollTo(0, 0);
    }
  }, [view]);

  useEffect(() => {
    window.history.replaceState({ view: AppView.LANDING }, '', '');
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setView(event.state.view);
      } else {
        setView(AppView.LANDING);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Persistence
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
    
    const savedName = localStorage.getItem('userName');
    if (savedName) setUserName(savedName);

    const savedProfile = localStorage.getItem('customerProfile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile(parsed);
      if (!savedName && parsed.name) setUserName(parsed.name);
    }

    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (userName) {
      localStorage.setItem('userName', userName);
    } else {
      localStorage.removeItem('userName');
    }
  }, [userName]);

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

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const updateOrderStatus = (id: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const handleUpdateProfile = (newProfile: CustomerProfile) => {
    setProfile(newProfile);
    setUserName(newProfile.name);
    localStorage.setItem('customerProfile', JSON.stringify(newProfile));
    localStorage.setItem('userName', newProfile.name);
  };

  const handleLogout = () => {
    setUserName('');
    setProfile({ name: '', phone: '', address: '', bio: '' });
    localStorage.removeItem('userName');
    localStorage.removeItem('customerProfile');
    navigateTo(AppView.LANDING);
  };

  const renderView = () => {
    switch (view) {
      case AppView.LANDING:
        return <LandingPage setView={navigateTo} products={products.slice(0, 4)} onAddToCart={addToCart} userName={userName} />;
      case AppView.SHOP:
        return (
          <ShopPage
            products={products}
            cart={cart}
            onAddToCart={addToCart}
            onUpdateCart={updateCartQuantity}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
            setView={navigateTo}
            userName={userName}
          />
        );
      case AppView.CHECKOUT:
        return <CheckoutPage cart={cart} setView={navigateTo} clearCart={clearCart} userName={userName} addOrder={addOrder} initialAddress={profile.address} />;
      case AppView.LOGIN:
        return <LoginPage setView={navigateTo} setUserName={(name, phone) => {
          setUserName(name);
          setProfile(prev => ({ ...prev, name, phone }));
        }} />;
      case AppView.ADMIN_DASHBOARD:
        return (
          <AdminDashboard 
            setView={navigateTo} 
            orders={orders} 
            products={products} 
            contactMessages={contactMessages}
            updateOrderStatus={updateOrderStatus}
          />
        );
      case AppView.ADMIN_INVENTORY:
        return <AdminInventory setView={navigateTo} products={products} setProducts={setProducts} />;
      case AppView.ADMIN_REVENUE:
        return <AdminRevenue setView={navigateTo} orders={orders} />;
      case AppView.ABOUT:
        return <AboutPage setView={navigateTo} />;
      case AppView.CONTACT:
        return <ContactPage setView={navigateTo} onSubmitContact={(msg) => setContactMessages(prev => [msg, ...prev])} />;
      case AppView.PROFILE:
        return <ProfilePage setView={navigateTo} profile={profile} onUpdate={handleUpdateProfile} onLogout={handleLogout} />;
      case AppView.CUSTOMER_ORDERS:
        return <CustomerOrdersPage setView={navigateTo} orders={orders} userName={userName} />;
      default:
        return <LandingPage setView={navigateTo} products={products.slice(0, 4)} onAddToCart={addToCart} userName={userName} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderView()}
    </div>
  );
};

export default App;
