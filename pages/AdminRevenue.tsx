
import React, { useState } from 'react';
import { AppView, Order } from '../types';
import { Icons } from '../constants';

interface AdminRevenueProps {
  setView: (view: AppView) => void;
  orders: Order[];
}

const AdminRevenue: React.FC<AdminRevenueProps> = ({ setView, orders }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const LOGO_URL = "https://img.icons8.com/color/96/leaf.png";
  const BACKGROUND_IMAGE = "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000&auto=format&fit=crop";

  // Group orders by date
  const dailyRevenue = orders.reduce((acc, order) => {
    const date = order.date;
    if (!acc[date]) {
      acc[date] = { revenue: 0, count: 0 };
    }
    acc[date].revenue += order.total;
    acc[date].count += 1;
    return acc;
  }, {} as Record<string, { revenue: number; count: number }>);

  // Convert to array and sort by date (descending)
  const revenueHistory = Object.entries(dailyRevenue)
    .map(([date, data]) => ({ date, ...data }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalAllTimeRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="min-h-screen flex relative font-sans overflow-x-hidden">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <img 
          src={BACKGROUND_IMAGE} 
          alt="Natural Organic Texture" 
          className="w-full h-full object-cover brightness-[0.4] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-green-950/20 backdrop-blur-sm"></div>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-72 bg-white/95 backdrop-blur-2xl border-r border-white/20 flex flex-col fixed inset-y-0 z-[100] transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 lg:p-8 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <img src={LOGO_URL} alt="Logo" className="w-8 h-8 md:w-10 md:h-10" />
             <div>
               <h1 className="text-base md:text-lg font-black text-slate-900 tracking-tighter uppercase leading-none">Madurai <span className="text-green-600">Organic</span></h1>
               <p className="text-[9px] md:text-[10px] text-green-600 font-bold uppercase tracking-wider">Admin Portal</p>
             </div>
           </div>
           <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-slate-900 transition">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
           </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <button onClick={() => setView(AppView.ADMIN_DASHBOARD)} className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition text-left">
            <Icons.Dashboard /> Dashboard
          </button>
          <button onClick={() => setView(AppView.ADMIN_INVENTORY)} className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition text-left">
            <Icons.Inventory /> Daily Availability
          </button>
          <button onClick={() => setIsSidebarOpen(false)} className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold bg-green-600 text-white shadow-lg shadow-green-600/20 transition text-left">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            Revenue Analytics
          </button>
        </nav>

        <div className="p-6 border-t border-slate-100">
          <button onClick={() => setView(AppView.LANDING)} className="w-full text-xs font-black uppercase tracking-widest text-red-500 flex items-center justify-center gap-2 hover:text-red-600 transition">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 lg:ml-72 p-4 md:p-8 lg:p-12 relative z-10 overflow-y-auto">
        <header className="flex items-center gap-4 mb-8 md:mb-12">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-3 bg-white/20 backdrop-blur-md rounded-xl text-white border border-white/10 shrink-0"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <div className="w-full">
            <h1 className="text-3xl md:text-5xl font-black text-white mb-1 uppercase tracking-tighter drop-shadow-lg leading-tight">Harvest Analytics</h1>
            <p className="text-white/70 text-xs md:text-base font-medium drop-shadow-md tracking-tight">Financial performance overview.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
          <div className="bg-emerald-600/95 backdrop-blur-md p-8 md:p-10 rounded-[28px] md:rounded-[40px] text-white shadow-2xl relative overflow-hidden border border-emerald-500/20">
             <div className="relative z-10">
               <p className="text-[9px] font-black uppercase tracking-widest mb-2 opacity-80">Total Revenue</p>
               <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter">₹{totalAllTimeRevenue.toLocaleString()}</h3>
             </div>
             <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                <svg className="w-16 h-16 md:w-24 md:h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.82v-1.91c-1.74-.24-3.32-1.07-4.48-2.31l1.52-1.52c.88 1 2.06 1.62 3.42 1.8V12.7c-2.07-.48-4.14-1.32-4.14-3.84 0-1.8 1.4-3.13 3.36-3.62V4h2.82v1.94c1.47.24 2.82.88 3.86 1.76l-1.52 1.52c-.68-.61-1.55-1.01-2.48-1.18V10.3c2.07.48 4.14 1.44 4.14 3.84 0 2.22-1.68 3.56-3.71 3.95z"/></svg>
             </div>
          </div>
          <div className="bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-[28px] md:rounded-[40px] border border-white/20 shadow-xl flex flex-col justify-center">
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Harvests</p>
             <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 tracking-tighter">{orders.length} <span className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-2">Orders</span></h3>
          </div>
        </div>

        <section className="bg-white/95 backdrop-blur-md rounded-[28px] md:rounded-[40px] border border-white/20 overflow-hidden shadow-2xl">
          <div className="p-6 md:p-8 border-b border-slate-100">
            <h3 className="text-base md:text-lg font-bold text-slate-950 uppercase tracking-tight">Daily Transaction Log</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[500px]">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <th className="px-8 py-5">Date</th>
                  <th className="px-8 py-5">Volume</th>
                  <th className="px-8 py-5">Daily Sales</th>
                  <th className="px-8 py-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {revenueHistory.length === 0 ? (
                  <tr><td colSpan={4} className="px-8 py-20 text-center text-slate-300 font-black uppercase tracking-widest text-[10px]">History Clear</td></tr>
                ) : (
                  revenueHistory.map((day, idx) => (
                    <tr key={idx} className="hover:bg-green-50/30 transition duration-200">
                      <td className="px-8 py-5 font-bold text-slate-950">{day.date}</td>
                      <td className="px-8 py-5 text-slate-600 font-medium">{day.count} Orders</td>
                      <td className="px-8 py-5 font-black text-emerald-600">₹{day.revenue.toLocaleString()}</td>
                      <td className="px-8 py-5 text-right"><span className="text-[9px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-2 py-1 rounded-full">Audited</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminRevenue;
