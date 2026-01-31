
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
}

const ShopPage: React.FC<ShopPageProps> = ({
  products,
  cart,
  onAddToCart,
  onUpdateCart,
  isCartOpen,
  setIsCartOpen,
  setView
}) => {
  const [filter, setFilter] = useState('All Items');
  const categories = ['All Items', 'Vegetables', 'Fruits', 'Dairy & Eggs', 'Leafy Greens', 'Root Veg'];

  const filteredProducts = products.filter(p => filter === 'All Items' || p.category === filter);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <nav className="sticky top-0 z-40 bg-white border-b px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView(AppView.LANDING)}>
          <span className="text-xl font-bold text-slate-900 uppercase">Madurai Organic</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-500">
          <span>Shop</span>
          <span>Our Farm</span>
          <span>Wholesale</span>
          <span>Contact</span>
        </div>
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full text-slate-700 font-bold text-sm hover:bg-slate-200 transition"
        >
          <Icons.Cart /> Cart <span className="bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">{cart.length}</span>
        </button>
      </nav>

      <div className="flex flex-1 relative overflow-hidden">
        {/* Main Content */}
        <main className={`flex-1 p-8 transition-all duration-300 ${isCartOpen ? 'mr-[400px]' : ''}`}>
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
            <span>📅 October 24, 2023</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-5xl font-bold text-slate-900 mb-2">Today's Availability</h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">Inventory updated at 6:30 AM</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                <Icons.Search />
              </div>
              <input
                type="text"
                placeholder="Search fresh vegetables, fruits..."
                className="w-full bg-white border rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600"
              />
            </div>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-6 py-2.5 rounded-xl text-sm font-medium transition ${
                  filter === c ? 'bg-slate-900 text-white shadow-lg' : 'bg-white border text-slate-600 hover:bg-slate-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(p => (
              <div key={p.id} className="bg-white border rounded-3xl overflow-hidden group hover:shadow-2xl transition-all duration-500 border-slate-100 flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt={p.name} />
                  {p.tag && (
                    <span className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-800 shadow-sm">
                      {p.tag}
                    </span>
                  )}
                  {p.availableQty === 0 && (
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center">
                       <span className="bg-white px-6 py-2 rounded-lg font-bold text-slate-900 shadow-lg">Sold Out</span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xl font-bold text-slate-900">{p.name}</h3>
                    <span className="text-green-600 font-bold text-lg">₹{p.price}<span className="text-slate-400 text-xs font-normal">/{p.unit}</span></span>
                  </div>
                  {p.description && (
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 mb-4">{p.description}</p>
                  )}
                  <div className="mt-auto pt-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-[11px] font-bold uppercase tracking-widest ${p.availableQty < p.lowStockThreshold ? 'text-red-500' : 'text-slate-400'}`}>
                        {p.availableQty < p.lowStockThreshold ? 'Low Stock' : 'In Stock'}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500">{p.availableQty} {p.unit}s left</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-6">
                      <div
                        className={`h-full transition-all duration-700 ${p.availableQty < p.lowStockThreshold ? 'bg-orange-500' : 'bg-green-50'}`}
                        style={{ width: `${Math.min(100, (p.availableQty / p.maxQty) * 100)}%` }}
                      ></div>
                    </div>
                    {p.availableQty > 0 ? (
                      <button
                        onClick={() => onAddToCart(p)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-700 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all active:scale-[0.98]"
                      >
                        <Icons.Cart /> Add to Cart
                      </button>
                    ) : (
                      <button className="w-full bg-slate-100 text-slate-400 py-3 rounded-2xl font-bold cursor-not-allowed">
                        Notify Tomorrow
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Cart Sidebar */}
        <aside
          className={`fixed right-0 top-[73px] bottom-0 w-[400px] bg-white border-l z-30 transition-transform duration-500 flex flex-col shadow-2xl ${
            isCartOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Your Cart ({cart.length})</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-slate-900 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <Icons.Cart />
                </div>
                <p>Your cart is empty.</p>
                <button onClick={() => setIsCartOpen(false)} className="text-green-600 font-bold mt-4">Start Shopping</button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-bold text-slate-900">{item.name}</h4>
                      <span className="font-bold text-slate-900">₹{item.price * item.quantity}</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">₹{item.price} / {item.unit}</p>
                    <div className="flex items-center gap-3 bg-slate-50 w-fit rounded-lg px-2 py-1">
                      <button onClick={() => onUpdateCart(item.id, -1)} className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white transition">-</button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateCart(item.id, 1)} className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white transition">+</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t bg-slate-50/50">
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-500 font-medium">Subtotal</span>
                <span className="text-2xl font-bold text-slate-900">₹{subtotal}</span>
              </div>
              <div className="bg-yellow-50 text-yellow-800 text-[11px] p-3 rounded-xl mb-6 flex items-center gap-2">
                <span className="text-lg">🚚</span> Free delivery on orders over ₹500
              </div>
              <button
                onClick={() => setView(AppView.CHECKOUT)}
                className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-700 transition flex items-center justify-center gap-3 shadow-lg shadow-green-600/20"
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
