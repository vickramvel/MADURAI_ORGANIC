
import React, { useState } from 'react';
import { AppView, ContactMessage } from '../types';

interface ContactPageProps {
  setView: (view: AppView) => void;
  onSubmitContact: (msg: ContactMessage) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ setView, onSubmitContact }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const CONTACT_DECOR_IMAGE = "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1000&auto=format&fit=crop";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMsg: ContactMessage = {
      id: Date.now().toString(),
      ...formData,
      date: new Date().toLocaleDateString(),
    };
    onSubmitContact(newMsg);
    setIsSubmitted(true);
    setTimeout(() => setView(AppView.LANDING), 3000);
  };

  if (isSubmitted) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white text-center px-4">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-2">Message Harvested!</h2>
        <p className="text-slate-500 font-medium">We've received your inquiry. Our team will reach out within 24 hours.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="flex items-center justify-between px-8 py-4 border-b sticky top-0 bg-white z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView(AppView.LANDING)}>
          <span className="text-xl font-bold text-slate-900 tracking-tight">Madurai<span className="text-green-600">Organic</span></span>
        </div>
        <button onClick={() => setView(AppView.LANDING)} className="text-slate-500 font-bold hover:text-green-600 transition">Back to Home</button>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <div className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Get in Touch</div>
          <h1 className="text-6xl font-black text-slate-900 mb-8 uppercase tracking-tighter leading-[0.9]">
            Let's Start a <span className="text-green-600 italic">Fresh</span> Conversation.
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed mb-12">
            Whether you're curious about our farming practices, want to place a bulk order, or just want to say hi—we're all ears.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner">📍</div>
              <div>
                <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Our Roots</h4>
                <p className="text-slate-500 font-medium whitespace-pre-line">
                  Ashok Organic Farms<br />
                  Andukondaan, Panaikudi Village,<br />
                  Virudhunagar Dt, Tamilnadu
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner">📞</div>
              <div>
                <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Phone Support</h4>
                <p className="text-slate-500 font-medium">+91 98866 23162</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-10 lg:p-14 rounded-[50px] border border-slate-100 relative">
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl rotate-6 group transition-transform hover:rotate-0">
            <img src={CONTACT_DECOR_IMAGE} alt="Fresh Harvest Decor" className="w-full h-full object-cover" />
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Your Name</label>
              <input
                required
                type="text"
                placeholder="How should we address you?"
                className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-5 text-slate-950 font-black placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:border-green-600 transition-all"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="hello@world.com"
                  className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-5 text-slate-950 font-black placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:border-green-600 transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Mobile Number</label>
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

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">How can we help?</label>
              <textarea
                required
                rows={4}
                placeholder="Tell us about your requirements..."
                className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-5 text-slate-950 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:border-green-600 transition-all resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-lg hover:bg-green-600 transition shadow-2xl active:scale-[0.98] mt-4"
            >
              Send Enquiry
            </button>
          </form>
        </div>
      </div>
      
      <footer className="py-12 text-center border-t">
         <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">© 2023 Madurai Organic Farm - Cultivating Trust</p>
      </footer>
    </div>
  );
};

export default ContactPage;
