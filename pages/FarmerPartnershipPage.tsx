
import React, { useState } from 'react';
import { AppView, FarmerApplication } from '../types';

interface FarmerPartnershipPageProps {
  setView: (view: AppView) => void;
  onApply: (app: FarmerApplication) => void;
}

const FarmerPartnershipPage: React.FC<FarmerPartnershipPageProps> = ({ setView, onApply }) => {
  const [formData, setFormData] = useState({
    farmName: '',
    location: '',
    produce: '',
    contactName: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApp: FarmerApplication = {
      id: Date.now().toString(),
      ...formData,
      date: new Date().toLocaleDateString(),
    };
    onApply(newApp);
    setSubmitted(true);
    setTimeout(() => setView(AppView.LANDING), 2500);
  };

  if (submitted) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-8 animate-bounce">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tighter">Application Sent!</h1>
        <p className="text-slate-500 font-medium">Our team will contact you shortly to verify your farm.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
       <nav className="flex items-center justify-between px-8 py-4 border-b sticky top-0 bg-white z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView(AppView.LANDING)}>
          <span className="text-xl font-bold text-slate-900">Madurai<span className="text-green-600">Organic</span></span>
        </div>
        <button onClick={() => setView(AppView.ABOUT)} className="text-slate-500 font-bold hover:text-slate-900 transition">Back to About</button>
      </nav>

      <div className="max-w-4xl mx-auto py-20 px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Join the Collective</h1>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">
            We are looking for dedicated farmers in the Madurai region who practice zero-chemical or organic agriculture. Fill out the details below, and let's grow together.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1">Farm / Business Name</label>
              <input
                required
                type="text"
                placeholder="e.g. Green Valley Organic Estate"
                className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-5 text-slate-950 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:border-green-600 transition-all"
                value={formData.farmName}
                onChange={(e) => setFormData({...formData, farmName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1">Location (Village / City)</label>
              <input
                required
                type="text"
                placeholder="e.g. Alagar Kovil, Madurai"
                className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-5 text-slate-950 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:border-green-600 transition-all"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1">Primary Produce</label>
              <input
                required
                type="text"
                placeholder="e.g. Rice, Mangoes, Milk"
                className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-5 text-slate-950 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:border-green-600 transition-all"
                value={formData.produce}
                onChange={(e) => setFormData({...formData, produce: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1">Contact Person Name</label>
              <input
                required
                type="text"
                placeholder="Full Name"
                className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-5 text-slate-950 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:border-green-600 transition-all"
                value={formData.contactName}
                onChange={(e) => setFormData({...formData, contactName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1">Mobile Number</label>
              <input
                required
                type="tel"
                placeholder="+91 00000 00000"
                className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-5 text-slate-950 font-black placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:border-green-600 transition-all"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-6 rounded-3xl font-black text-xl hover:bg-green-700 transition shadow-2xl shadow-green-600/20 active:scale-[0.98]"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FarmerPartnershipPage;
