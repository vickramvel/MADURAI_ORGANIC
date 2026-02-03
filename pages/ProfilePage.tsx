
import React, { useState } from 'react';
import { AppView, CustomerProfile } from '../types';

interface ProfilePageProps {
  setView: (view: AppView) => void;
  profile: CustomerProfile;
  onUpdate: (profile: CustomerProfile) => void;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ setView, profile, onUpdate, onLogout }) => {
  const [formData, setFormData] = useState<CustomerProfile>(profile);
  const [isSaved, setIsSaved] = useState(false);
  const LOGO_URL = "https://img.icons8.com/color/96/leaf.png";

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="flex items-center justify-between px-8 py-4 border-b sticky top-0 bg-white z-50">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView(AppView.LANDING)}>
          <img src={LOGO_URL} alt="Logo" className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-xl font-bold text-slate-900 tracking-tight">Madurai<span className="text-green-600">Organic</span></span>
        </div>
        <div className="flex items-center gap-6 text-sm font-bold text-slate-500">
           <button onClick={() => setView(AppView.SHOP)} className="hover:text-green-600">Shop</button>
           <button onClick={() => setView(AppView.LANDING)} className="hover:text-green-600">Home</button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-16 px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
           <div className="flex items-center gap-4">
             <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-3xl font-black text-green-600 uppercase">
               {profile.name.charAt(0) || 'U'}
             </div>
             <div>
               <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Your Profile</h1>
               <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Community Member Since Oct 2023</p>
             </div>
           </div>
           <button 
             onClick={() => setView(AppView.CUSTOMER_ORDERS)}
             className="bg-white border-2 border-slate-200 text-slate-900 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-green-600 hover:text-green-600 transition flex items-center gap-2 shadow-sm"
           >
             📦 My Orders History
           </button>
        </div>

        <form onSubmit={handleSave} className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-950 font-black focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:border-green-600 transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Mobile Number</label>
                <input
                  required
                  type="tel"
                  placeholder="98765 43210"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-950 font-black focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:border-green-600 transition-all"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Delivery Address</label>
                <textarea
                  rows={3}
                  placeholder="Your primary shipping address..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-950 font-black focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:border-green-600 transition-all resize-none"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Bio / Preferences</label>
                <textarea
                  rows={2}
                  placeholder="E.g. I prefer plastic-free packaging..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-950 font-black focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:border-green-600 transition-all resize-none"
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                />
              </div>
           </div>

           <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-5 rounded-3xl font-black text-lg hover:bg-green-700 transition shadow-2xl shadow-green-600/30 active:scale-[0.98]"
              >
                {isSaved ? 'Changes Harvested! ✓' : 'Sync Profile Changes'}
              </button>
              <button
                type="button"
                onClick={onLogout}
                className="px-10 py-5 bg-slate-950 text-white rounded-3xl font-black text-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
           </div>
        </form>
        
        <div className="mt-12 text-center">
           <button onClick={() => setView(AppView.SHOP)} className="text-slate-400 font-bold text-sm uppercase tracking-widest hover:text-green-600 transition">
             ← Back to Shopping
           </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
