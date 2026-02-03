
import React, { useState } from 'react';
import { AppView, Order, Product, ContactMessage } from '../types';
import { Icons } from '../constants';

interface AdminDashboardProps {
  setView: (view: AppView) => void;
  orders: Order[];
  products: Product[];
  contactMessages: ContactMessage[];
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  setView, 
  orders, 
  products, 
  contactMessages,
  updateOrderStatus
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'enquiries'>('orders');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const LOGO_URL = "https://img.icons8.com/color/96/leaf.png";
  const BACKGROUND_IMAGE = "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000&auto=format&fit=crop";

  const selectedOrder = orders.find(o => o.id === selectedOrderId);

  // Calculate real-time stats for today
  const todayDateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const todayOrders = orders.filter(o => o.date === todayDateStr);
  const todayRevenue = todayOrders.reduce((sum, order) => sum + order.total, 0);

  const stats = [
    { 
      label: "Today's Orders", 
      value: todayOrders.length.toString(), 
      trend: "Live", 
      trendType: "up", 
      icon: "🛍️", 
      color: "text-green-600 bg-green-100" 
    },
    { 
      label: "Revenue Today", 
      value: `₹${todayRevenue.toLocaleString()}`, 
      trend: todayRevenue > 0 ? "Active" : "Stable", 
      trendType: "up", 
      icon: "💰", 
      color: "text-emerald-600 bg-emerald-100" 
    },
    { 
      label: "Enquiries", 
      value: contactMessages.length.toString(), 
      trend: "Active", 
      trendType: "up", 
      icon: "📧", 
      color: "text-blue-600 bg-blue-100" 
    },
    { 
      label: "Catalog Items", 
      value: products.length.toString(), 
      trend: "Updated", 
      trendType: "up", 
      icon: "🥬", 
      color: "text-purple-600 bg-purple-100" 
    },
  ];

  const handleUpdateStatus = () => {
    if (!selectedOrder) return;
    const statuses: Order['status'][] = ['Pending', 'Paid', 'Packed', 'Shipped'];
    const currentIndex = statuses.indexOf(selectedOrder.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    updateOrderStatus(selectedOrder.id, nextStatus);
  };

  return (
    <div className="min-h-screen relative flex font-sans overflow-x-hidden bg-slate-100">
      {/* Background Image Layer */}
      <div className="fixed inset-0 z-0">
        <img 
          src={BACKGROUND_IMAGE} 
          alt="Natural Organic Texture" 
          className="w-full h-full object-cover brightness-[0.4] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/40 via-transparent to-black/60"></div>
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
        <div className="p-6 flex items-center justify-between lg:p-8">
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
          <button
            onClick={() => { setActiveTab('orders'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold transition ${
              activeTab === 'orders' ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <Icons.Dashboard /> Dashboard
          </button>
          <button
            onClick={() => { setView(AppView.ADMIN_INVENTORY); setIsSidebarOpen(false); }}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition"
          >
            <Icons.Inventory /> Daily Availability
          </button>
          <button
            onClick={() => { setView(AppView.ADMIN_REVENUE); setIsSidebarOpen(false); }}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            Revenue Analytics
          </button>
          
          <div className="pt-6 px-4 pb-4">
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4">Management</p>
             <button
              onClick={() => { setActiveTab('enquiries'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold transition ${
                activeTab === 'enquiries' ? 'bg-blue-100 text-blue-700' : 'text-slate-500 hover:bg-slate-100'
              }`}
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
               Enquiries
             </button>
          </div>
        </nav>

        <div className="p-6 border-t border-slate-100">
          <div className="flex items-center gap-3 bg-slate-100/50 p-3 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center font-bold text-white uppercase shrink-0">AA</div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-900 truncate">Ashok Admin</p>
              <p className="text-[9px] text-slate-400 font-medium truncate">admin@madurai.com</p>
            </div>
          </div>
          <button onClick={() => setView(AppView.LANDING)} className="w-full mt-4 text-[10px] font-black uppercase tracking-widest text-red-500 flex items-center justify-center gap-2 hover:text-red-600 transition">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'blur-sm lg:blur-none' : ''} lg:ml-72 p-4 md:p-8 lg:p-12 relative z-10 overflow-y-auto w-full`}>
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 md:mb-12">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-3 bg-white/20 backdrop-blur-md rounded-xl text-white border border-white/10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <div className="relative flex-1 md:w-96">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                <Icons.Search />
              </div>
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-white/95 backdrop-blur-md border border-white/20 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/10 focus:border-green-600 transition-all shadow-sm text-slate-950 font-bold placeholder:text-slate-400" 
              />
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white self-end md:self-auto">
             <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
             <span className="text-[10px] font-black uppercase tracking-widest">Live: Online</span>
          </div>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 uppercase tracking-tighter drop-shadow-lg">
            {activeTab === 'orders' ? 'Dashboard Overview' : 'Enquiries'}
          </h2>
          <p className="text-sm md:text-base text-white/70 mb-8 font-medium drop-shadow-md">Madurai Organic Management Portal</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            {stats.map((s, i) => (
              <div key={i} className="bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-white/20 shadow-xl hover:translate-y-[-4px] transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-xl ${s.color}`}>
                    {s.icon}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${s.trendType === 'up' ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>
                    {s.trend}
                  </span>
                </div>
                <p className="text-slate-400 font-bold text-[9px] uppercase tracking-widest mb-1">{s.label}</p>
                <p className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter">{s.value}</p>
              </div>
            ))}
          </div>
        </section>

        {activeTab === 'orders' && (
          <section className="bg-white/95 backdrop-blur-md rounded-[24px] md:rounded-[32px] border border-white/20 overflow-hidden shadow-2xl w-full">
            <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 uppercase tracking-tight">Recent Harvest Orders</h3>
              <button className="text-green-600 font-bold text-xs hover:underline">History</button>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <th className="px-6 md:px-8 py-4">ID</th>
                    <th className="px-6 md:px-8 py-4">Customer</th>
                    <th className="px-6 md:px-8 py-4">Total</th>
                    <th className="px-6 md:px-8 py-4">Status</th>
                    <th className="px-6 md:px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-10 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                        No orders yet.
                      </td>
                    </tr>
                  ) : (
                    orders.map((o) => (
                      <tr key={o.id} className="hover:bg-green-50/30 transition duration-200">
                        <td className="px-6 md:px-8 py-5 font-black text-slate-950">{o.id}</td>
                        <td className="px-6 md:px-8 py-5">
                          <span className="font-bold text-slate-700">{o.customerName}</span>
                        </td>
                        <td className="px-6 md:px-8 py-5 font-black text-slate-950">₹{o.total}</td>
                        <td className="px-6 md:px-8 py-5">
                          <span className={`text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-wider ${
                            o.status === 'Paid' ? 'bg-green-100 text-green-700' : 
                            o.status === 'Packed' ? 'bg-blue-100 text-blue-700' :
                            o.status === 'Shipped' ? 'bg-purple-100 text-purple-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="px-6 md:px-8 py-5 text-right">
                          <button
                            onClick={() => setSelectedOrderId(o.id)}
                            className="bg-slate-100 text-slate-900 px-3 py-1.5 rounded-lg font-black text-[9px] uppercase hover:bg-slate-900 hover:text-white transition"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'enquiries' && (
          <section className="bg-white/95 backdrop-blur-md rounded-[24px] md:rounded-[32px] border border-white/20 overflow-hidden shadow-2xl w-full">
            <div className="p-6 md:p-8 border-b border-slate-100">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 uppercase tracking-tight">Customer Enquiries</h3>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <th className="px-8 py-4">Name</th>
                    <th className="px-8 py-4">Contact Info</th>
                    <th className="px-8 py-4">Inquiry / Message</th>
                    <th className="px-8 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm">
                  {contactMessages.length === 0 ? (
                    <tr><td colSpan={4} className="p-10 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">No pending enquiries</td></tr>
                  ) : (
                    contactMessages.map((msg) => (
                      <tr key={msg.id} className="hover:bg-blue-50/30 transition">
                        <td className="px-8 py-5 font-black text-slate-950">{msg.name}</td>
                        <td className="px-8 py-5">
                          <p className="text-xs font-bold text-slate-700">{msg.email}</p>
                          <p className="text-[9px] font-bold text-green-600 tracking-wider">{msg.phone}</p>
                        </td>
                        <td className="px-8 py-5">
                           <p className="text-xs text-slate-600 font-medium line-clamp-2 max-w-xs">{msg.message}</p>
                        </td>
                        <td className="px-8 py-5 text-[10px] text-slate-400 font-bold">{msg.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
            <div className="bg-white rounded-[32px] md:rounded-[40px] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in duration-300">
               <div className="p-6 md:p-8 border-b flex items-center justify-between">
                 <h3 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tighter">Order {selectedOrder.id}</h3>
                 <button onClick={() => setSelectedOrderId(null)} className="text-slate-400 hover:text-slate-950">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                 </button>
               </div>
               <div className="p-6 md:p-8 space-y-6 max-h-[60vh] md:max-h-[70vh] overflow-y-auto">
                 <div className="flex items-center gap-4 bg-slate-50 p-4 md:p-6 rounded-2xl md:rounded-3xl">
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-400 text-xl md:text-2xl uppercase shrink-0">
                     {selectedOrder.customerName.charAt(0)}
                   </div>
                   <div>
                     <p className="font-black text-slate-900 text-base md:text-lg">{selectedOrder.customerName}</p>
                     <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Premium Member</p>
                   </div>
                 </div>
                 <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="bg-slate-50 p-3 md:p-4 rounded-xl md:rounded-2xl">
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</label>
                      <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">{selectedOrder.status}</span>
                    </div>
                    <div className="bg-slate-50 p-3 md:p-4 rounded-xl md:rounded-2xl">
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</label>
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{selectedOrder.date}</span>
                    </div>
                 </div>

                 <div>
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Items</label>
                    <div className="space-y-2">
                       {selectedOrder.detailedItems ? (
                         <div className="space-y-2">
                           {selectedOrder.detailedItems.map((item, idx) => (
                             <div key={idx} className="bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-100 flex justify-between items-center text-xs md:text-sm">
                               <div>
                                  <p className="font-black text-slate-900">{item.name}</p>
                                  <p className="text-[9px] text-slate-400 font-bold uppercase">Qty: {item.qty}</p>
                               </div>
                               <p className="font-black text-slate-950">₹{item.price * item.qty}</p>
                             </div>
                           ))}
                         </div>
                       ) : (
                         <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                           <p className="text-xs font-bold text-slate-800">{selectedOrder.items}</p>
                         </div>
                       )}
                    </div>
                 </div>
               </div>
               <div className="p-6 md:p-8 bg-slate-50 border-t flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={handleUpdateStatus}
                    className="flex-1 bg-green-600 text-white py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-green-700 transition"
                  >
                    Next Stage
                  </button>
                  <button onClick={() => setSelectedOrderId(null)} className="px-6 py-3.5 border border-slate-200 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-950 transition">Close</button>
               </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
