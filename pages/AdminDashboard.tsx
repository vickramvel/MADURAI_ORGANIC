
import React from 'react';
import { AppView, Order, Product } from '../types';
import { Icons } from '../constants';

interface AdminDashboardProps {
  setView: (view: AppView) => void;
  orders: Order[];
  products: Product[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setView, orders, products }) => {
  const stats = [
    { label: "Today's Orders", value: "42", trend: "+12%", trendType: "up", icon: "🛍️", color: "text-green-600 bg-green-100" },
    { label: "Revenue Today", value: "₹12,250", trend: "+8%", trendType: "up", icon: "💰", color: "text-emerald-600 bg-emerald-100" },
    { label: "Low Stock Items", value: "5 items", trend: "-2 items", trendType: "down", icon: "📦", color: "text-red-600 bg-red-100" },
    { label: "Pending Payments", value: "12", trend: "+1%", trendType: "up", icon: "💳", color: "text-orange-600 bg-orange-100" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r flex flex-col fixed inset-y-0">
        <div className="p-8 flex items-center gap-3 mb-8">
          <div>
            <h1 className="text-lg font-black text-slate-900 tracking-tighter uppercase leading-none">Madurai Organic</h1>
            <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider">Admin Portal</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {[
            { id: AppView.ADMIN_DASHBOARD, label: 'Dashboard', icon: <Icons.Dashboard /> },
            { id: AppView.ADMIN_INVENTORY, label: 'Daily Availability', icon: <Icons.Inventory /> },
            { id: AppView.SHOP, label: 'Consumer View', icon: <Icons.Cart /> },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold transition ${
                item.id === AppView.ADMIN_DASHBOARD ? 'bg-green-50 text-green-600' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          <div className="pt-8 px-4 pb-4">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Management</p>
             <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
               Orders
             </button>
             <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
               Customers
             </button>
          </div>
        </nav>

        <div className="p-6 border-t">
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl">
            <img src="https://i.pravatar.cc/150?u=ashok" className="w-10 h-10 rounded-full" alt="" />
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">Ashok Admin</p>
              <p className="text-[10px] text-slate-400 font-medium truncate">admin@madurai.com</p>
            </div>
          </div>
          <button onClick={() => setView(AppView.LANDING)} className="w-full mt-4 text-xs font-bold text-red-500 flex items-center justify-center gap-2">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 ml-72 p-12">
        <header className="flex items-center justify-between mb-12">
          <div className="relative w-96">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
              <Icons.Search />
            </div>
            <input type="text" placeholder="Search orders, products, analytics..." className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/10 focus:border-green-600 transition-all shadow-sm" />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white border rounded-xl flex items-center justify-center text-slate-400 hover:text-green-600 transition cursor-pointer relative">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            <button className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-green-700 transition flex items-center gap-2 shadow-lg shadow-green-600/20">
              <span className="text-lg">+</span> New Order
            </button>
          </div>
        </header>

        <section className="mb-12">
          <h2 className="text-4xl font-black text-slate-900 mb-2">Dashboard Overview</h2>
          <p className="text-slate-500 mb-10">Welcome back, Admin. Here's what's happening at the farm today.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${s.color}`}>
                    {s.icon}
                  </div>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${s.trendType === 'up' ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>
                    {s.trend}
                  </span>
                </div>
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-2">{s.label}</p>
                <p className="text-4xl font-black text-slate-900 tracking-tighter">{s.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
          <div className="p-8 border-b flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Recent Orders</h3>
            <button className="text-green-600 font-bold text-sm hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-8 py-4">Order ID</th>
                  <th className="px-8 py-4">Customer</th>
                  <th className="px-8 py-4">Items</th>
                  <th className="px-8 py-4">Total</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/50 transition">
                    <td className="px-8 py-6 font-bold text-slate-900 text-sm">{o.id}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <img src={o.customerAvatar} className="w-8 h-8 rounded-full" alt="" />
                        <span className="text-sm font-semibold text-slate-700">{o.customerName}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-slate-500">{o.items}</td>
                    <td className="px-8 py-6 font-bold text-slate-900 text-sm">₹{o.total}</td>
                    <td className="px-8 py-6">
                      <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider ${
                        o.status === 'Paid' ? 'bg-green-100 text-green-700' :
                        o.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-slate-400 hover:text-slate-900">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-8 border-t bg-slate-50/30 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Showing {orders.length} of 24 orders</span>
            <div className="flex gap-2">
              <button className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-400 hover:bg-white hover:text-slate-900 transition">Previous</button>
              <button className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-600 hover:bg-white hover:text-green-600 transition">Next</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
