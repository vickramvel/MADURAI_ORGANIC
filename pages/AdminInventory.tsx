
import React, { useState, useRef, useEffect } from 'react';
import { AppView, Product } from '../types';
import { Icons } from '../constants';

interface AdminInventoryProps {
  setView: (view: AppView) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
}

const AdminInventory: React.FC<AdminInventoryProps> = ({ setView, products, setProducts }) => {
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const LOGO_URL = "https://img.icons8.com/color/96/leaf.png";
  const BACKGROUND_IMAGE = "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000&auto=format&fit=crop";
  
  useEffect(() => {
    setLocalProducts([...products]);
    setHasUnsavedChanges(false);
  }, [products]);

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: 'Vegetables',
    unit: 'kg',
    price: 0,
    availableQty: 0,
    maxQty: 100,
    image: '',
    description: '',
    inStock: true,
    lowStockThreshold: 10
  });

  const handleUpdate = (id: string, field: keyof Product, value: any) => {
    setLocalProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
    setHasUnsavedChanges(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product? This action will be finalized once you Sync Changes.')) {
      setLocalProducts(prev => prev.filter(p => p.id !== id));
      setHasUnsavedChanges(true);
    }
  };

  const saveChanges = () => {
    setIsSaving(true);
    // Mimic API call
    setTimeout(() => {
      setProducts(localProducts);
      setIsSaving(false);
      setHasUnsavedChanges(false);
      alert('Inventory synced successfully! Changes are now live in the shop.');
    }, 1000);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const productToAdd: Product = {
      ...newProduct as Product,
      id: `PROD-${Date.now()}`,
      inStock: (newProduct.availableQty || 0) > 0
    };
    setLocalProducts(prev => [...prev, productToAdd]);
    setShowAddModal(false);
    setHasUnsavedChanges(true);
    setNewProduct({ name: '', category: 'Vegetables', unit: 'kg', price: 0, availableQty: 0, maxQty: 100, image: '', description: '', inStock: true, lowStockThreshold: 10 });
  };

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
          <button onClick={() => setIsSidebarOpen(false)} className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold bg-green-600 text-white shadow-lg shadow-green-600/20 transition text-left">
            <Icons.Inventory /> Daily Availability
          </button>
          <button
            onClick={() => setView(AppView.ADMIN_REVENUE)}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition text-left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            Revenue Analytics
          </button>
        </nav>
      </aside>

      {/* Main Area */}
      <main className="flex-1 lg:ml-72 p-4 md:p-8 lg:p-12 pb-32 relative z-10 overflow-y-auto">
        <header className="flex items-center gap-4 mb-8 md:mb-12">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-3 bg-white/20 backdrop-blur-md rounded-xl text-white border border-white/10 shrink-0"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 w-full">
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-1 uppercase tracking-tighter drop-shadow-lg">Inventory Editor</h1>
              <p className="text-white/70 text-xs md:text-base font-medium drop-shadow-md tracking-tight">Manage daily stock and prices.</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold text-xs hover:bg-green-700 transition flex items-center gap-2 shadow-xl shrink-0"
            >
              + Add Product
            </button>
          </div>
        </header>

        <div className="bg-white/95 backdrop-blur-md rounded-[24px] md:rounded-[32px] border border-white/20 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-100">
                  <th className="px-6 md:px-8 py-5">Product Details</th>
                  <th className="px-6 md:px-8 py-5">Qty Left</th>
                  <th className="px-6 md:px-8 py-5">Price (₹)</th>
                  <th className="px-6 md:px-8 py-5 text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {localProducts.length === 0 ? (
                  <tr><td colSpan={4} className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">No items in catalog.</td></tr>
                ) : (
                  localProducts.map(p => (
                    <tr key={p.id} className="hover:bg-green-50/30 transition duration-200">
                      <td className="px-6 md:px-8 py-5">
                        <div className="flex items-center gap-4">
                          <img src={p.image} className="w-12 h-12 rounded-xl object-cover shadow-sm bg-slate-100" alt="" />
                          <div>
                            <p className="font-black text-slate-950 truncate max-w-[120px] md:max-w-none">{p.name}</p>
                            <p className="text-[9px] text-green-600 font-black uppercase tracking-widest">{p.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 md:px-8 py-5">
                        <div className="relative w-28 border border-slate-200 rounded-xl overflow-hidden focus-within:border-green-600 transition-colors">
                          <input
                            type="number"
                            value={p.availableQty}
                            onChange={(e) => handleUpdate(p.id, 'availableQty', parseInt(e.target.value) || 0)}
                            className="w-full py-2.5 px-3 text-xs font-black text-slate-950 bg-white/80 focus:outline-none"
                          />
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] font-black text-slate-400 uppercase pointer-events-none">{p.unit}</span>
                        </div>
                      </td>
                      <td className="px-6 md:px-8 py-5">
                        <div className="relative w-28 border border-slate-200 rounded-xl overflow-hidden focus-within:border-green-600 transition-colors">
                          <input
                            type="number"
                            value={p.price}
                            onChange={(e) => handleUpdate(p.id, 'price', parseInt(e.target.value) || 0)}
                            className="w-full py-2.5 px-3 text-xs font-black text-slate-950 bg-white/80 focus:outline-none"
                          />
                        </div>
                      </td>
                      <td className="px-6 md:px-8 py-5 text-right">
                        <button 
                          onClick={() => handleDelete(p.id)} 
                          title="Delete Product"
                          className="p-3 text-red-500 hover:bg-red-500 hover:text-white transition-all rounded-xl border border-transparent hover:border-red-600 group"
                        >
                          <svg className="w-5 h-5 group-active:scale-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 lg:left-72 bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 py-4 flex items-center justify-between z-50">
          <div className="flex items-center gap-2">
            {hasUnsavedChanges && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 border border-orange-100 rounded-full text-orange-600 text-[10px] font-bold uppercase animate-pulse">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                Unsaved Changes
              </div>
            )}
          </div>
          <div className="flex gap-3">
             <button onClick={() => { setLocalProducts([...products]); setHasUnsavedChanges(false); }} className="px-6 py-3 border border-slate-200 rounded-xl text-[10px] font-black uppercase text-slate-500 hover:bg-slate-50 transition">Discard</button>
             <button 
              onClick={saveChanges} 
              disabled={isSaving || !hasUnsavedChanges} 
              className={`px-8 py-3 rounded-xl font-bold text-xs transition-all shadow-xl ${
                !hasUnsavedChanges 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-slate-900 text-white hover:bg-green-600'
              }`}
             >
               {isSaving ? 'Syncing...' : 'Sync Changes'}
             </button>
          </div>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
            <div className="bg-white rounded-[32px] w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
              <div className="p-6 md:p-8 border-b flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">New Produce Item</h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-900">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              <form onSubmit={handleAddProduct} className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Name</label>
                    <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-950 focus:outline-none" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}/>
                  </div>
                  <div>
                    <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Category</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold" value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}>
                      <option>Vegetables</option><option>Fruits</option><option>Dairy & Eggs</option><option>Leafy Greens</option><option>Root Veg</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Unit</label>
                    <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold" value={newProduct.unit} onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}/>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Image URL</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold" placeholder="https://..." value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}/>
                  </div>
                </div>
                <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-green-700 transition">Add to Draft</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminInventory;
