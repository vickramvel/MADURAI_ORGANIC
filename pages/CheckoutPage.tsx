
import React, { useState } from 'react';
import { AppView, CartItem } from '../types';
import { Icons } from '../constants';

interface CheckoutPageProps {
  cart: CartItem[];
  setView: (view: AppView) => void;
  clearCart: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, setView, clearCart }) => {
  const [method, setMethod] = useState<'upi' | 'card' | 'net'>('upi');
  const [isOrdered, setIsOrdered] = useState(false);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + taxes;

  const handlePlaceOrder = () => {
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
      setView(AppView.SHOP);
    }, 2000);
  };

  if (isOrdered) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-8 animate-bounce">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Order Successful!</h1>
        <p className="text-slate-500">Your fresh harvest will arrive soon.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b px-8 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView(AppView.SHOP)}>
          <span className="text-xl font-bold text-slate-900 uppercase">Madurai Organic</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Secure Checkout
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Secure Checkout</h1>
            <p className="text-slate-500">Complete your purchase for daily fresh harvest.</p>
          </div>

          {/* Delivery Details */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <h3 className="text-xl font-bold">Delivery Details</h3>
            </div>
            <div className="space-y-4">
              <div className="border-2 border-green-600 rounded-2xl p-6 bg-green-50/30 flex gap-4 relative">
                <div className="w-6 h-6 rounded-full border-2 border-green-600 flex items-center justify-center flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-slate-900">Home - 123 Green Way</span>
                    <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Default</span>
                  </div>
                  <p className="text-slate-500 text-sm mb-1">Near Central Park, Anna Nagar, Madurai - 625020</p>
                  <p className="font-semibold text-slate-900">Rahul Sharma, +91 98765 43210</p>
                </div>
              </div>
              <div className="border border-slate-200 rounded-2xl p-6 flex gap-4 opacity-60">
                <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex-shrink-0"></div>
                <div className="flex-1">
                  <span className="font-bold text-slate-900">Office - 45 Tech Park</span>
                  <p className="text-slate-500 text-sm">KK Nagar, Madurai - 625020</p>
                </div>
              </div>
              <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold hover:border-green-600 hover:text-green-600 transition">
                + Add New Address
              </button>
            </div>
          </div>

          {/* Delivery Slot */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <h3 className="text-xl font-bold">Delivery Slot</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-green-600 bg-green-50/30 p-6 rounded-2xl flex items-start gap-4 cursor-pointer">
                <div className="text-2xl">☀️</div>
                <div>
                  <h4 className="font-bold text-green-800">Morning Harvest</h4>
                  <p className="text-sm text-green-700 font-bold mb-1">6:00 AM - 9:00 AM</p>
                  <p className="text-xs text-green-600">Freshly harvested before sunrise.</p>
                </div>
              </div>
              <div className="border border-slate-200 p-6 rounded-2xl flex items-start gap-4 cursor-pointer hover:bg-slate-50 transition">
                <div className="text-2xl">🌙</div>
                <div>
                  <h4 className="font-bold text-slate-900">Evening Harvest</h4>
                  <p className="text-sm text-slate-600 font-bold mb-1">5:00 PM - 8:00 PM</p>
                  <p className="text-xs text-slate-400">Freshly harvested in the afternoon.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
            <h3 className="text-xl font-bold mb-8">Order Summary</h3>
            <div className="space-y-6 mb-8">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <img src={item.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 text-sm leading-tight">{item.name}</h4>
                    <p className="text-xs text-slate-400">{item.quantity} x {item.unit}</p>
                  </div>
                  <span className="font-bold text-slate-900">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t pt-6 mb-8 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Delivery Fee</span>
                <span className={deliveryFee === 0 ? 'text-green-600 font-bold' : ''}>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Taxes</span>
                <span>₹{taxes}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-bold text-xl pt-2">
                <span>Total to Pay</span>
                <span>₹{total}</span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Payment Method</p>
              <div
                onClick={() => setMethod('upi')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition flex items-center justify-between ${method === 'upi' ? 'border-green-600 bg-green-50/30' : 'border-slate-100'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">📱</div>
                  <span className="font-bold text-sm">UPI / QR Code</span>
                </div>
                {method === 'upi' && <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center text-white text-[10px]">✓</div>}
              </div>
              {method === 'upi' && (
                <div className="py-6 flex flex-col items-center">
                  <div className="w-32 h-32 border-2 border-slate-100 rounded-2xl p-2 mb-4">
                     <div className="w-full h-full bg-slate-50 rounded-lg flex items-center justify-center text-xs text-slate-400">QR CODE</div>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold">SCAN WITH ANY UPI APP</p>
                </div>
              )}
              <div
                onClick={() => setMethod('card')}
                className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between ${method === 'card' ? 'border-green-600 bg-green-50/30' : 'border-slate-100'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">💳</div>
                  <span className="font-bold text-sm text-slate-600">Credit / Debit Card</span>
                </div>
                <span className="text-slate-300">→</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-green-600 text-white py-5 rounded-2xl font-bold text-lg mt-8 hover:bg-green-700 transition shadow-xl shadow-green-600/30 active:scale-[0.98]"
            >
              Place Order & Pay ₹{total}
            </button>
            <p className="text-center text-[10px] text-slate-400 font-medium mt-6 uppercase tracking-wider">
              🛡️ Payments processed securely by Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
