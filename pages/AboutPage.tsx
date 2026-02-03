
import React from 'react';
import { AppView } from '../types';
import { Icons } from '../constants';

interface AboutPageProps {
  setView: (view: AppView) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ setView }) => {
  const HERO_IMAGE = "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2000&auto=format&fit=crop";

  const participatingFarms = [
    { name: "Ashok Organic Farm", certified: true },
    { name: "SMSN Organic Farms", certified: false },
    { name: "Nadhivanam Organic Farms", certified: false },
    { name: "JTP organic Farms", certified: true }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b sticky top-0 bg-white z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView(AppView.LANDING)}>
          <span className="text-xl font-bold text-slate-900">Madurai<span className="text-green-600">Organic</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button onClick={() => setView(AppView.LANDING)} className="hover:text-green-600 transition">Home</button>
          <button onClick={() => setView(AppView.SHOP)} className="hover:text-green-600 transition">Shop</button>
          <button className="text-green-600 font-bold border-b-2 border-green-600">About</button>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setView(AppView.SHOP)} className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition">
            Start Shopping
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[450px] flex items-center justify-center text-center overflow-hidden">
        <img
          src={HERO_IMAGE}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
          alt="Our Collective Farms"
        />
        <div className="relative z-10 max-w-3xl px-6">
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-6">Our Mission</h1>
          <p className="text-xl text-slate-200 font-medium italic">
            "Connecting families to the pulse of true, chemical-free agriculture."
          </p>
        </div>
      </section>

      {/* Objective Section */}
      <section className="py-24 px-8 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-6">Our Objective</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6 font-medium">
              MaduraiOrganic is a collective platform bringing together the finest chemical-free producers in the region. Our objective is to bridge the gap between conscientious local farmers and health-conscious families, ensuring fair trade for growers and nutrient-dense food for consumers.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              By consolidating produce from multiple verified farms, we provide a consistent supply of living, chemical-free food to every household in Madurai, supporting local biodiversity and rural livelihoods.
            </p>
          </div>
          <div className="w-full md:w-1/3 bg-slate-50 p-8 rounded-[40px] border border-slate-100 shadow-inner">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">100% Traceable</h3>
            <p className="text-sm text-slate-500 font-medium">Know exactly which farm your morning veggies came from.</p>
          </div>
        </div>
      </section>

      {/* Participating Farms Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Participating Farms</h2>
            <p className="text-slate-400 max-w-xl mx-auto font-medium">Meet the passionate hands and healthy soils behind your daily harvest.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {participatingFarms.map((farm, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-10 rounded-[40px] hover:bg-white/10 transition-all group flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 bg-green-600/20 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition duration-500">
                    🚜
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{farm.name}</h3>
                </div>
                {farm.certified && (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-green-400">India Organic Certified</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t text-center px-8">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">© 2023 Madurai Organic Farm - Purely From Our Fields</p>
      </footer>
    </div>
  );
};

export default AboutPage;
