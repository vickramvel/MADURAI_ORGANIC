
import React from 'react';
import { AppView } from '../types';
import { Icons } from '../constants';

interface LoginPageProps {
  setView: (view: AppView) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setView }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-100 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-200 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-30 animate-pulse"></div>

      <div className="relative z-10 w-full max-w-lg bg-white rounded-[40px] p-12 shadow-2xl shadow-green-900/10 border border-green-50/50">
        <div className="flex flex-col items-center mb-10 text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tighter">Madurai Organic</h1>
          <p className="text-green-600 font-bold text-sm tracking-wide">Fresh organic harvest daily</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">Mobile Number</label>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 border rounded-2xl px-4 py-4 bg-slate-50/50 w-28">
                <span className="text-lg">🇮🇳</span>
                <span className="font-bold text-slate-900">+91</span>
              </div>
              <input
                type="tel"
                placeholder="98765 43210"
                className="flex-1 border rounded-2xl px-6 py-4 bg-slate-50/50 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          <button
            onClick={() => setView(AppView.SHOP)}
            className="w-full bg-green-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-green-700 transition flex items-center justify-center gap-3 shadow-xl shadow-green-600/30 active:scale-[0.98]"
          >
            Continue <span className="text-xl">→</span>
          </button>

          <div className="relative flex items-center justify-center py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <span className="relative z-10 bg-white px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">or</span>
          </div>

          <button className="w-full border-2 border-slate-100 text-slate-600 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 hover:bg-slate-50 transition active:scale-[0.98]">
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5" alt="" />
            Continue with Google
          </button>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400 font-medium text-sm">
            Partner access?{' '}
            <button
              onClick={() => setView(AppView.ADMIN_DASHBOARD)}
              className="text-green-600 font-bold hover:underline"
            >
              Admin Login →
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
