
import React from 'react';
import { AppView, Order } from '../types';

interface CustomerOrdersPageProps {
  setView: (view: AppView) => void;
  orders: Order[];
  userName: string;
}

const CustomerOrdersPage: React.FC<CustomerOrdersPageProps> = ({ setView, orders, userName }) => {
  const LOGO_URL = "https://img.icons8.com/color/96/leaf.png";
  
  // Filter orders by current user name (simple matching for this implementation)
  const myOrders = orders.filter(o => o.customerName === userName);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-700';
      case 'Packed': return 'bg-blue-100 text-blue-700';
      case 'Shipped': return 'bg-purple-100 text-purple-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    if (status === 'Pending') return 'COD - Pending';
    return status;
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
           <button onClick={() => setView(AppView.PROFILE)} className="hover:text-green-600">Profile</button>
           <button onClick={() => setView(AppView.LANDING)} className="hover:text-green-600">Home</button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto py-16 px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tighter mb-2">My Harvest History</h1>
            <p className="text-slate-500 font-medium">Track your previous and upcoming organic deliveries.</p>
          </div>
          <button 
            onClick={() => setView(AppView.SHOP)}
            className="bg-green-600 text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-green-700 transition shadow-xl shadow-green-600/20"
          >
            Shop Today's Harvest
          </button>
        </div>

        {myOrders.length === 0 ? (
          <div className="bg-white rounded-[40px] p-20 text-center border border-slate-100 shadow-xl">
             <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">🛒</div>
             <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">No orders yet</h2>
             <p className="text-slate-500 max-w-sm mx-auto mb-10 font-medium">You haven't placed any orders with us yet. Start supporting local farmers today!</p>
             <button
               onClick={() => setView(AppView.SHOP)}
               className="bg-slate-950 text-white px-10 py-4 rounded-2xl font-bold hover:bg-green-600 transition"
             >
               Explore Fresh Produce
             </button>
          </div>
        ) : (
          <div className="space-y-6">
            {myOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{order.id}</span>
                      <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                      <span className="text-xs font-bold text-slate-400">{order.date}</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">{order.items}</h3>
                    <p className="text-sm text-slate-500 font-medium line-clamp-1">Deliver to: {order.address || "Main Address"}</p>
                  </div>
                  <div className="flex flex-col items-end justify-center border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-8 border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Due</p>
                    <p className="text-3xl font-black text-slate-950 tracking-tighter">₹{order.total}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="mt-auto py-12 text-center text-[10px] font-black uppercase tracking-widest text-slate-300">
        © 2023 Madurai Organic Farm - Fresh From Soil to Soul
      </footer>
    </div>
  );
};

export default CustomerOrdersPage;
