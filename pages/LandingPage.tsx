
import React, { useState } from 'react';
import { AppView, Product } from '../types';
import { Icons } from '../constants';

interface LandingPageProps {
  setView: (view: AppView) => void;
  products: Product[];
  onAddToCart: (p: Product) => void;
  userName?: string;
}

const LandingPage: React.FC<LandingPageProps> = ({ setView, products, onAddToCart, userName }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const HERO_IMAGE = "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2000&auto=format&fit=crop";
  const LOGO_URL = "https://img.icons8.com/color/96/leaf.png";

  const handleAddToCartClick = (p: Product) => {
    if (!userName) {
      setView(AppView.LOGIN);
    } else {
      onAddToCart(p);
    }
  };

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 md:px-8 py-4 border-b sticky top-0 bg-white z-[60]">
        <div className="flex items-center gap-2 md:gap-3 cursor-pointer group" onClick={() => setView(AppView.LANDING)}>
          <img src={LOGO_URL} alt="Logo" className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">Madurai<span className="text-green-600">Organic</span></span>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button onClick={() => setView(AppView.SHOP)} className="hover:text-green-600 transition">Shop</button>
          <button onClick={() => setView(AppView.ABOUT)} className="hover:text-green-600 transition">About</button>
          <button onClick={() => setView(AppView.CONTACT)} className="hover:text-green-600 transition">Contact</button>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={() => setView(AppView.SHOP)} className="relative p-2 text-slate-600">
            <Icons.Cart />
          </button>
          
          <div className="hidden sm:block">
            {userName ? (
              <button 
                onClick={() => setView(AppView.PROFILE)}
                className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-full text-slate-700 font-bold text-sm hover:border-green-600 transition"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Hi, {userName.split(' ')[0]}
              </button>
            ) : (
              <button onClick={() => setView(AppView.LOGIN)} className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition">
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] bg-white z-50 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col p-6 gap-6">
            <button onClick={() => { setView(AppView.SHOP); setIsMobileMenuOpen(false); }} className="text-xl font-bold text-slate-900 border-b pb-4 text-left">Shop Produce</button>
            <button onClick={() => { setView(AppView.ABOUT); setIsMobileMenuOpen(false); }} className="text-xl font-bold text-slate-900 border-b pb-4 text-left">Our Mission</button>
            <button onClick={() => { setView(AppView.CONTACT); setIsMobileMenuOpen(false); }} className="text-xl font-bold text-slate-900 border-b pb-4 text-left">Contact Us</button>
            {!userName && (
              <button onClick={() => { setView(AppView.LOGIN); setIsMobileMenuOpen(false); }} className="bg-green-600 text-white py-4 rounded-2xl font-bold">Sign In</button>
            )}
            {userName && (
              <button onClick={() => { setView(AppView.PROFILE); setIsMobileMenuOpen(false); }} className="bg-slate-100 text-slate-900 py-4 rounded-2xl font-bold">Your Profile</button>
            )}
          </div>
        </div>
      )}

      {/* Hero */}
      <header className="relative min-h-[500px] md:h-[700px] flex items-center justify-center text-center px-4 overflow-hidden">
        <img
          src={HERO_IMAGE}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.65]"
          alt="Lush Green Scenic Farm"
        />
        <div className="relative z-10 max-w-4xl px-4 py-20">
          <div className="inline-block bg-green-600/30 backdrop-blur-md px-3 md:px-4 py-1 rounded-full text-white text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 border border-white/20">
            Traditional Natural Farming
          </div>
          <h1 className="text-3xl md:text-7xl font-serif text-white mb-6 leading-tight drop-shadow-2xl">
            Purely From Our <br /> <span className="italic">Madurai Fields</span>
          </h1>
          <p className="text-sm md:text-lg text-slate-50 mb-10 max-w-2xl mx-auto font-medium drop-shadow-lg px-2">
            Experience the uncompromised taste of 100% organic, chemical-free produce. Harvested at dawn, delivered to your kitchen while still fresh.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setView(AppView.SHOP)}
              className="bg-green-600 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-green-700 transition w-full sm:w-auto shadow-xl shadow-green-900/40"
            >
              Order Today's Harvest
            </button>
            <button 
              onClick={() => setView(AppView.ABOUT)} 
              className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-slate-100 transition w-full sm:w-auto shadow-xl shadow-black/20"
            >
              Our Collective Farms
            </button>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-12 px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 border-b bg-slate-50/50">
        {[
          { icon: '🌿', title: '100% Chemical Free', desc: 'Certified organic soil & methods' },
          { icon: '☀️', title: 'Freshly Harvested', desc: 'Picked at 6 AM every morning' },
          { icon: '🚚', title: 'Local Delivery', desc: 'At your doorstep by 10 AM' },
        ].map((f, i) => (
          <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <span className="text-2xl md:text-3xl">{f.icon}</span>
            <div>
              <h3 className="font-bold text-slate-900 text-sm md:text-base">{f.title}</h3>
              <p className="text-xs text-slate-500">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Today's Picks */}
      <section className="py-12 md:py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-2 uppercase tracking-tighter">Today's Fresh Picks</h2>
            <p className="text-sm text-slate-500">Harvested this morning across our partner farms.</p>
          </div>
          <button onClick={() => setView(AppView.SHOP)} className="text-green-600 font-bold text-sm flex items-center gap-1 hover:underline">
            View all produce →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p) => (
            <div key={p.id} className="group border rounded-3xl p-3 md:p-4 hover:shadow-2xl transition-all duration-300 bg-white border-slate-100">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-100">
                <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={p.name} />
                {p.tag && (
                  <span className={`absolute top-2 left-2 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                    p.tag === 'Fresh' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
                  }`}>
                    {p.tag}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-start mb-2 px-1">
                <h3 className="font-bold text-slate-900 text-sm md:text-base">{p.name}</h3>
                <span className="text-green-600 font-black text-sm md:text-base">₹{p.price}<span className="text-slate-400 text-[10px] md:text-xs font-normal">/{p.unit}</span></span>
              </div>
              <div className="mb-4 px-1">
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${(p.availableQty / p.maxQty) * 100}%` }}></div>
                </div>
              </div>
              <button
                onClick={() => handleAddToCartClick(p)}
                className="w-full py-3 md:py-3.5 bg-slate-900 text-white rounded-2xl text-xs md:text-sm font-bold hover:bg-green-600 transition flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Icons.Cart /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 md:gap-12 justify-between">
          <div className="flex flex-col items-start max-w-sm">
            <div className="flex items-center gap-3 mb-6 text-white cursor-pointer" onClick={() => setView(AppView.LANDING)}>
              <img src={LOGO_URL} alt="Logo" className="w-8 h-8" />
              <span className="text-xl md:text-2xl font-black uppercase tracking-tighter">Madurai<span className="text-green-600">Organic</span></span>
            </div>
            <p className="text-xs md:text-sm leading-relaxed mb-8 font-medium">
              Empowering local farmers and bringing chemical-free nutrition to every kitchen in Madurai.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:gap-12">
            <div>
              <h4 className="text-white font-bold mb-5 text-[10px] md:text-xs uppercase tracking-widest">Explore</h4>
              <ul className="space-y-3 text-xs md:text-sm font-medium">
                <li className="hover:text-green-500 transition cursor-pointer" onClick={() => setView(AppView.ABOUT)}>About Us</li>
                <li className="cursor-pointer hover:text-green-500 transition" onClick={() => setView(AppView.SHOP)}>Daily Stock</li>
                <li className="hover:text-green-500 transition cursor-pointer" onClick={() => setView(AppView.CONTACT)}>Get in Touch</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-5 text-[10px] md:text-xs uppercase tracking-widest">Support</h4>
              <ul className="space-y-3 text-xs md:text-sm font-medium">
                <li className="hover:text-green-500 transition cursor-pointer">Shipping Info</li>
                <li className="hover:text-green-500 transition cursor-pointer" onClick={() => setView(AppView.CONTACT)}>Help Center</li>
                <li className="hover:text-green-500 transition cursor-pointer">Terms & Policy</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 md:mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
          <span>© 2023 Madurai Organic Collective</span>
          <div className="flex gap-6">
            <span className="hover:text-white transition cursor-pointer">Terms</span>
            <span className="hover:text-white transition cursor-pointer">Privacy</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
