
import React, { useState } from 'react';
import { AppView, CartItem, Order } from '../types';

interface CheckoutPageProps {
  cart: CartItem[];
  setView: (view: AppView) => void;
  clearCart: () => void;
  userName: string;
  addOrder: (order: Order) => void;
  initialAddress?: string;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, setView, clearCart, userName, addOrder, initialAddress }) => {
  const [address, setAddress] = useState(initialAddress || '');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi'>('cod');
  const [isOrdered, setIsOrdered] = useState(false);
  const [error, setError] = useState('');
  
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal;

  const UPI_ID = "ananth.s.kumar1@okhdfcbank";
  const PAYEE_NAME = "Ananth Kumar";
  
  const UPI_PAYMENT_URL = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&cu=INR&am=${total}`;
  const USER_QR_IMAGE = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(UPI_PAYMENT_URL)}`;
  
  const GPAY_LOGO = "https://img.icons8.com/color/48/google-pay.png";

  const handlePlaceOrder = () => {
    if (!address.trim()) {
      setError('Please provide a delivery address');
      return;
    }

    const newOrder: Order = {
      id: `#ORD-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      customerName: userName || 'Guest',
      items: cart.map(i => `${i.name} (${i.quantity}${i.unit})`).join(', '),
      total: total,
      status: paymentMethod === 'cod' ? 'Pending' : 'Paid',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      address: address,
      detailedItems: cart.map(i => ({ name: i.name, qty: i.quantity, price: i.price }))
    };

    addOrder(newOrder);
    setIsOrdered(true);
    clearCart();
    window.scrollTo(0,0);
  };

  if (isOrdered) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 md:p-8 text-center">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-8 animate-bounce">
          <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Order Success!</h1>
        <p className="text-sm md:text-base text-slate-500 max-w-md mx-auto mb-10 font-medium">Your harvest order has been placed and is being processed.</p>
        <button
          onClick={() => setView(AppView.LANDING)}
          className="w-full sm:w-auto bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-green-600 transition shadow-xl active:scale-95"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-6 md:py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 md:gap-12">
        <div className="flex-1 space-y-6 md:space-y-8">
          <div className="flex items-center gap-4 mb-2">
            <button onClick={() => setView(AppView.SHOP)} className="p-2 bg-white rounded-full shadow-sm text-slate-400 hover:text-slate-900 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter">Checkout</h1>
          </div>

          <section className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-10 border border-slate-100 shadow-sm">
            <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-6 md:mb-8 uppercase tracking-tight">1. Delivery Address</h2>
            <textarea
              placeholder="Enter your full street address, landmark and city..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 md:px-6 py-4 md:py-5 text-slate-950 text-sm md:text-base font-medium placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:border-green-600 transition-all resize-none min-h-[120px]"
              rows={4}
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setError('');
              }}
            />
            {error && <p className="text-red-500 text-[10px] md:text-xs font-bold mt-3 ml-2 uppercase tracking-widest">{error}</p>}
          </section>

          <section className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-10 border border-slate-100 shadow-sm">
            <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-6 md:mb-8 uppercase tracking-tight">2. Payment Method</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setPaymentMethod('cod')}
                className={`flex items-center justify-between p-5 md:p-6 rounded-3xl border-2 transition-all ${
                  paymentMethod === 'cod' ? 'border-green-600 bg-green-50/50' : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">💵</span>
                  <div className="text-left">
                    <p className="font-bold text-slate-900 uppercase text-[10px] md:text-xs tracking-widest">Cash on Delivery</p>
                    <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase">Pay at your door</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('upi')}
                className={`flex items-center justify-between p-5 md:p-6 rounded-3xl border-2 transition-all ${
                  paymentMethod === 'upi' ? 'border-green-600 bg-green-50/50' : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">📱</span>
                  <div className="text-left">
                    <p className="font-bold text-slate-900 uppercase text-[10px] md:text-xs tracking-widest">UPI Payment</p>
                    <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase">Scan & Pay Now</p>
                  </div>
                </div>
              </button>
            </div>

            {paymentMethod === 'upi' && (
              <div className="bg-slate-50 rounded-[28px] md:rounded-[32px] p-6 md:p-8 border border-slate-200 animate-in slide-in-from-top-4 duration-500">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center gap-2 mb-6 bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-full border shadow-sm">
                    <img src={GPAY_LOGO} alt="GPay" className="w-5 h-5 md:w-6 h-6" />
                    <span className="text-[9px] md:text-xs font-black text-slate-900 uppercase tracking-widest">Secure UPI Gateway</span>
                  </div>
                  
                  <div className="bg-white p-4 md:p-6 rounded-[28px] md:rounded-[32px] shadow-lg mb-6 border-4 border-white">
                    <img 
                      src={USER_QR_IMAGE} 
                      alt="Payment QR Code" 
                      className="w-40 h-40 md:w-64 md:h-64 object-contain"
                    />
                  </div>

                  <div className="space-y-3">
                    <p className="text-lg md:text-xl font-black text-slate-900 tracking-tight">Scan to pay ₹{total}</p>
                    <div className="bg-white/60 px-4 py-2 rounded-xl border border-dashed border-slate-300 inline-block">
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Payable To</p>
                      <p className="text-[11px] md:text-xs font-bold text-slate-900">{PAYEE_NAME}</p>
                      <p className="text-[9px] font-mono text-green-600">{UPI_ID}</p>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center gap-3 text-[9px] md:text-[10px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-5 md:px-6 py-2.5 md:py-3 rounded-2xl border border-green-100">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Waiting for payment...
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:w-96">
          <aside className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-8 border border-slate-100 shadow-xl sticky top-24">
            <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-6 uppercase tracking-tight">Your Order</h2>
            <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2 scrollbar-hide">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div>
                    <p className="font-bold text-slate-900">{item.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-slate-900">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t">
              <div className="flex justify-between items-center">
                <span className="font-black text-slate-400 uppercase text-[10px] tracking-widest">Grand Total</span>
                <span className="text-3xl font-black text-slate-950 tracking-tighter">₹{total}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={cart.length === 0}
              className="w-full bg-slate-900 text-white py-4 md:py-5 rounded-[20px] md:rounded-3xl font-black text-base md:text-lg hover:bg-green-600 transition shadow-2xl active:scale-95 mt-8 disabled:opacity-50"
            >
              {paymentMethod === 'upi' ? 'I Have Scanned & Paid' : 'Confirm Order'}
            </button>
            <p className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-4">
              Secure Delivery via MaduraiOrganic
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
