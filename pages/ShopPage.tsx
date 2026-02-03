
import React, { useState } from 'react';
import { AppView, Product, CartItem } from '../types';
import { Icons } from '../constants';

interface ShopPageProps {
  products: Product[];
  cart: CartItem[];
  onAddToCart: (p: Product) => void;
  onUpdateCart: (id: string, delta: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  setView: (view: AppView) => void;
  userName?: string;
}

const ShopPage: React.FC<ShopPageProps> = ({
  products,
  cart,
  onAddToCart,
  onUpdateCart,
  isCartOpen,
  setIsCartOpen,
  setView,
  userName
}) => {
  const [filter, setFilter] = useState('All Items');
  const categories = ['All Items', 'Vegetables', 'Fruits', 'Dairy & Eggs', 'Leafy Greens', 'Root Veg'];
  const LOGO_URL = "https://img.icons8.com/color/96/leaf.png";

  const filteredProducts = products.filter(p => filter === 'All Items' || p.category === filter);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleAddToCartClick = (p: Product) => {
    if (!userName) {
      setView(AppView.LOGIN);
    } else {
      onAddToCart(p);
    }
  };

  const handleCheckoutClick = () => {
    if (!userName) {
      setView(AppView.LOGIN);
    } else {
      setView(AppView.CHECKOUT);
    }
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <nav className="sticky top-0 z-[60] bg-white border-b px-4 md:px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 md:gap-3 cursor-pointer group" onClick={() => setView(AppView.LANDING)}>
          <img src={LOGO_URL} alt="Logo" className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-base md:text-xl font-bold text-slate-900 uppercase tracking-tighter">Madurai <span className="text-green-600">Organic</span></span>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-slate-100 px-3 md:px-4 py-2 rounded-full text-slate-700 font-bold text-xs md:text-sm hover:bg-slate-200 transition"
          >
            <Icons.Cart /> <span className="hidden sm:inline">Cart</span> <span className="bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">{cart.reduce((a, b) => a + b.quantity, 0)}</span>
          </button>
          {userName ? (
            <button 
              onClick={() => setView(AppView.PROFILE)}
              className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 md:px-4 py-2 rounded-full text-slate-700 font-bold text-xs md:text-sm hover:border-green-600 transition"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="max-w-[80px] truncate">{userName.split(' ')[0]}</span>
            </button>
          ) : (
            <button onClick={() => setView(AppView.LOGIN)} className="bg-green-600 text-white px-4 py-2 rounded-lg text-xs md:text-sm font-semibold hover:bg-green-700 transition">
              Sign In
            </button>
          )}
        </div>
      </nav>

      <div className="flex flex-1 relative">
        {/* Main Content */}
        <main className={`flex-1 p-4 md:p-8 transition-all duration-300 ${isCartOpen ? 'lg:mr-[400px]' : ''}`}>
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-3">
            <span className="font-semibold text-slate-600 tracking-wide">📅 {formattedDate}</span>
          </div>
          
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-950 uppercase tracking-tighter mb-2">Today's Harvest</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] md:text-xs text-green-600 font-bold uppercase tracking-widest">Fresh Stock Updated</span>
            </div>
          </div>

          {/* Filters - Scrollable on Mobile */}
          <div className="mb-8 md:mb-10 space-y-4">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                <Icons.Search />
              </div>
              <input
                type="text"
                placeholder="Search vegetables, fruits..."
                className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:border-green-600"
              />
            </div>
            
            <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    filter === c ? 'bg-slate-900 text-white shadow-lg' : 'bg-white border text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map(p => (
              <div key={p.id} className="bg-white border rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-500 border-slate-100 flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt={p.name} />
                  {p.tag && (
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-800 shadow-sm">
                      {p.tag}
                    </span>
                  )}
                  {p.availableQty === 0 && (
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center">
                       <span className="bg-white px-5 py-2 rounded-xl font-bold text-sm text-slate-900 shadow-lg uppercase">Sold Out</span>
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">{p.name}</h3>
                    <span className="text-green-600 font-black text-base shrink-0">₹{p.price}<span className="text-slate-400 text-[10px] font-normal">/{p.unit}</span></span>
                  </div>
                  {p.description && (
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 mb-4 font-medium">{p.description}</p>
                  )}
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className={`text-[9px] font-black uppercase tracking-widest ${p.availableQty < p.lowStockThreshold ? 'text-red-500' : 'text-slate-400'}`}>
                        {p.availableQty < p.lowStockThreshold ? 'Low Stock' : 'Fresh Available'}
                      </span>
                      <span className="text-[9px] font-bold text-slate-500">{p.availableQty} {p.unit}s left</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-5">
                      <div
                        className={`h-full transition-all duration-700 ${p.availableQty < p.lowStockThreshold ? 'bg-orange-500' : 'bg-green-500/20'}`}
                        style={{ width: `${Math.min(100, (p.availableQty / p.maxQty) * 100)}%` }}
                      ></div>
                    </div>
                    {p.availableQty > 0 ? (
                      <button
                        onClick={() => handleAddToCartClick(p)}
                        className="w-full bg-slate-900 text-white py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-green-600 transition-all active:scale-[0.98] shadow-sm"
                      >
                        <Icons.Cart /> Add to Cart
                      </button>
                    ) : (
                      <button className="w-full bg-slate-100 text-slate-400 py-3.5 rounded-2xl font-bold text-xs cursor-not-allowed uppercase tracking-widest">
                        Notify Tomorrow
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Backdrop for mobile cart */}
        {isCartOpen && (
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[70] lg:hidden animate-in fade-in duration-300"
            onClick={() => setIsCartOpen(false)}
          />
        )}

        {/* Cart Sidebar / Drawer */}
        <aside
          className={`fixed right-0 top-0 lg:top-[73px] bottom-0 w-full md:w-[400px] bg-white border-l z-[80] transition-transform duration-500 flex flex-col shadow-2xl ${
            isCartOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-5 md:p-6 border-b flex items-center justify-between bg-white sticky top-0">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 uppercase tracking-tighter">Your Cart ({cart.reduce((a, b) => a + b.quantity, 0)})</h2>
            <button onClick={() => setIsCartOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 transition bg-slate-50 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <Icons.Cart />
                </div>
                <p className="font-bold uppercase text-[10px] tracking-widest">Your cart is empty.</p>
                <button onClick={() => setIsCartOpen(false)} className="text-green-600 font-black mt-4 uppercase text-xs">Start Shopping</button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex gap-4 animate-in slide-in-from-right-2 duration-300">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-bold text-slate-900 text-sm md:text-base">{item.name}</h4>
                      <span className="font-bold text-slate-900 text-sm">₹{item.price * item.quantity}</span>
                    </div>
                    <p className="text-[10px] md:text-xs text-slate-400 mb-3 font-medium">₹{item.price} / {item.unit}</p>
                    <div className="flex items-center gap-4 bg-slate-50 w-fit rounded-xl px-3 py-1.5 border border-slate-100">
                      <button onClick={() => onUpdateCart(item.id, -1)} className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-white transition font-black text-slate-400 hover:text-red-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4"/></svg>
                      </button>
                      <span className="text-sm font-bold w-4 text-center text-slate-900">{item.quantity}</span>
                      <button onClick={() => onUpdateCart(item.id, 1)} className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-white transition font-black text-slate-400 hover:text-green-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-5 md:p-6 border-t bg-slate-50/80 backdrop-blur-md sticky bottom-0">
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Total Due</span>
                <span className="text-2xl md:text-3xl font-black text-slate-950 tracking-tighter">₹{subtotal}</span>
              </div>
              <button
                onClick={handleCheckoutClick}
                className="w-full bg-green-600 text-white py-4 md:py-5 rounded-[20px] md:rounded-3xl font-black text-sm md:text-lg hover:bg-green-700 transition flex items-center justify-center gap-3 shadow-xl shadow-green-600/20 active:scale-[0.98]"
              >
                Checkout Now <span className="text-xl">→</span>
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default ShopPage;
