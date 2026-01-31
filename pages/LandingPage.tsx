
import React from 'react';
import { AppView, Product } from '../types';
import { Icons } from '../constants';

interface LandingPageProps {
  setView: (view: AppView) => void;
  products: Product[];
  onAddToCart: (p: Product) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ setView, products, onAddToCart }) => {
  return (
    <div className="bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-slate-900">MaduraiOrganic</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button onClick={() => setView(AppView.SHOP)} className="hover:text-green-600 transition">Shop</button>
          <button className="hover:text-green-600 transition">How it Works</button>
          <button className="hover:text-green-600 transition">About</button>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setView(AppView.SHOP)} className="relative p-2 text-slate-600">
            <Icons.Cart />
            <span className="absolute top-0 right-0 bg-green-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
          </button>
          <button onClick={() => setView(AppView.LOGIN)} className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition">
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative h-[600px] flex items-center justify-center text-center px-4 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=2000&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
          alt="Organic Farm"
        />
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
            Fresh Organic Harvest <br /> <span className="italic">Order Today</span>
          </h1>
          <p className="text-lg text-slate-200 mb-10 max-w-2xl mx-auto">
            Straight from our chemical-free fields to your kitchen table. Experience the uncompromised taste of true nature, delivered daily by 10 AM.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setView(AppView.SHOP)}
              className="bg-green-600 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-green-700 transition w-full sm:w-auto"
            >
              View Daily Harvest
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-white/20 transition w-full sm:w-auto">
              How It Works
            </button>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-16 px-8 grid grid-cols-1 md:grid-cols-3 gap-8 border-b">
        {[
          { icon: '🌿', title: '100% Chemical Free', desc: 'Certified organic soil & methods' },
          { icon: '☀️', title: 'Freshly Harvested', desc: 'Picked at 6 AM every morning' },
          { icon: '🚚', title: 'Local Delivery', desc: 'At your doorstep by 10 AM' },
        ].map((f, i) => (
          <div key={i} className="flex items-center gap-4 p-6 rounded-2xl bg-slate-50">
            <span className="text-3xl">{f.icon}</span>
            <div>
              <h3 className="font-bold text-slate-900">{f.title}</h3>
              <p className="text-sm text-slate-500">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Today's Picks */}
      <section className="py-20 px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Today's Fresh Picks</h2>
            <p className="text-slate-500">Harvested this morning. Limited quantities available.</p>
          </div>
          <button onClick={() => setView(AppView.SHOP)} className="text-green-600 font-semibold flex items-center gap-1 hover:underline">
            View all produce →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.id} className="group border rounded-2xl p-4 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={p.name} />
                {p.tag && (
                  <span className={`absolute top-2 left-2 px-2 py-1 rounded text-[10px] font-bold uppercase ${
                    p.tag === 'Fresh' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
                  }`}>
                    {p.tag}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-900">{p.name}</h3>
                <span className="text-green-600 font-bold">₹{p.price}<span className="text-slate-400 text-xs font-normal">/{p.unit}</span></span>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                  <span>Stock Available</span>
                  <span>{Math.round((p.availableQty / p.maxQty) * 100)}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${(p.availableQty / p.maxQty) * 100}%` }}></div>
                </div>
              </div>
              <button
                onClick={() => onAddToCart(p)}
                className="w-full py-2 border border-green-600 text-green-600 rounded-lg text-sm font-semibold hover:bg-green-600 hover:text-white transition flex items-center justify-center gap-2"
              >
                <Icons.Cart /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 py-24 px-8 text-center">
        <h2 className="text-4xl font-serif text-slate-900 mb-4">How It Works</h2>
        <p className="text-slate-500 max-w-xl mx-auto mb-16">We've simplified the process to ensure you get the freshest produce with minimal effort.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {[
            { step: 1, title: 'We Harvest Daily', desc: 'Every morning at dawn, our farmers hand-pick the ripe organic produce.' },
            { step: 2, title: 'We Pack with Care', desc: 'Your order is packed in eco-friendly materials immediately to retain freshness.' },
            { step: 3, title: 'Local Delivery', desc: 'Our swift fleet ensures your veggies are at your door by 10 AM, fresh and crisp.' },
          ].map((s) => (
            <div key={s.step} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl mb-6">
                {s.step}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
              <p className="text-slate-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6 text-white">
              <span className="text-xl font-bold">MaduraiOrganic</span>
            </div>
            <p className="text-sm leading-relaxed mb-8">
              Connecting you directly to nature through sustainable farming and daily fresh harvests.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li>Our Story</li>
              <li className="cursor-pointer hover:text-white transition" onClick={() => setView(AppView.SHOP)}>Daily Harvest</li>
              <li>How It Works</li>
              <li>Sustainability</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li>FAQ</li>
              <li>Shipping & Returns</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Join our Newsletter</h4>
            <p className="text-sm mb-6">Get updates on seasonal harvests and special offers.</p>
            <div className="flex flex-col gap-2">
              <input type="email" placeholder="Your email address" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-600" />
              <button className="bg-green-600 text-white rounded-lg py-3 font-bold hover:bg-green-700 transition">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/10 mt-20 pt-8 flex justify-between text-xs">
          <span>© 2023 Madurai Organic Farm. All rights reserved.</span>
          <div className="flex gap-6">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Cookies</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
