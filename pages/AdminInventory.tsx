
import React, { useState, useRef } from 'react';
import { AppView, Product } from '../types';
import { Icons } from '../constants';

interface AdminInventoryProps {
  setView: (view: AppView) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
}

const AdminInventory: React.FC<AdminInventoryProps> = ({ setView, products, setProducts }) => {
  const [localProducts, setLocalProducts] = useState([...products]);
  const [highlightLow, setHighlightLow] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
      setProducts(localProducts);
      setIsSaving(false);
    }, 800);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const productToAdd: Product = {
      ...newProduct as Product,
      id: Date.now().toString(),
      inStock: (newProduct.availableQty || 0) > 0
    };
    const updatedList = [...localProducts, productToAdd];
    setLocalProducts(updatedList);
    setProducts(updatedList);
    setShowAddModal(false);
    setNewProduct({
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
  };

  const resetAllToZero = () => {
    setLocalProducts(prev => prev.map(p => ({ ...p, availableQty: 0, inStock: false })));
  };

  const copyYesterday = () => {
    setLocalProducts([...products]);
  };

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
          <button onClick={() => setView(AppView.ADMIN_DASHBOARD)} className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition">
            <Icons.Dashboard /> Dashboard
          </button>
          <button onClick={() => setView(AppView.ADMIN_INVENTORY)} className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold bg-green-50 text-green-600 transition">
            <Icons.Inventory /> Daily Availability
          </button>
        </nav>
        <div className="p-6 border-t mt-auto">
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl">
            <img src="https://i.pravatar.cc/150?u=ashok" className="w-10 h-10 rounded-full" alt="" />
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">Ashok Admin</p>
              <p className="text-[10px] text-slate-400 font-medium truncate">admin@madurai.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 ml-72 p-12">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
          <span>Dashboard</span>
          <span>/</span>
          <span>Inventory</span>
          <span>/</span>
          <span className="text-green-600">Daily Editor</span>
        </div>

        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-5xl font-black text-slate-900 mb-2">Daily Harvest Availability</h1>
            <p className="text-slate-500">Manage stock levels and prices for today's harvest.</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-green-700 transition flex items-center gap-2 shadow-lg shadow-green-600/20"
          >
            <span className="text-lg">+</span> Add New Product
          </button>
        </div>

        {/* Action Bar */}
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between mb-8">
           <div className="flex gap-4">
             <button onClick={copyYesterday} className="flex items-center gap-2 border border-slate-200 px-6 py-3 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/></svg>
               Copy Yesterday's Data
             </button>
             <button onClick={resetAllToZero} className="flex items-center gap-2 border border-slate-200 px-6 py-3 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
               Set all to 0
             </button>
           </div>
           <button
             onClick={() => setHighlightLow(!highlightLow)}
             className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition ${
               highlightLow ? 'bg-orange-600 text-white shadow-lg' : 'border border-orange-100 text-orange-600 hover:bg-orange-50'
             }`}
           >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77-1.333.192 3 1.732 3z"/></svg>
             Highlight Low Stock
           </button>
        </div>

        {/* Editor Table */}
        <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm mb-20">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b">
                <th className="px-8 py-5">Product</th>
                <th className="px-8 py-5">Unit</th>
                <th className="px-8 py-5">Available Qty</th>
                <th className="px-8 py-5">Price Override</th>
                <th className="px-8 py-5 text-right">In Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {localProducts.map(p => {
                const isLow = highlightLow && p.availableQty < p.lowStockThreshold;
                return (
                  <tr key={p.id} className={`transition duration-300 ${isLow ? 'bg-orange-50/50' : 'hover:bg-slate-50/30'}`}>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img src={p.image || 'https://via.placeholder.com/150'} className="w-12 h-12 rounded-xl object-cover" alt="" />
                        <div>
                          <p className="font-bold text-slate-900 leading-none mb-1">{p.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{p.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">{p.unit}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`relative w-32 border rounded-xl overflow-hidden transition-all ${isLow ? 'border-orange-200' : 'border-slate-200'}`}>
                        <input
                          type="number"
                          value={p.availableQty}
                          onChange={(e) => handleUpdate(p.id, 'availableQty', parseInt(e.target.value) || 0)}
                          className={`w-full py-3 pl-4 pr-10 text-sm font-bold bg-white focus:outline-none ${isLow ? 'text-orange-600' : 'text-slate-900'}`}
                        />
                        <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-widest ${isLow ? 'text-orange-500' : 'text-slate-400'}`}>
                          {isLow ? 'LOW' : 'qty'}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="relative w-40 border border-slate-200 rounded-xl overflow-hidden group">
                         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                         <input
                           type="number"
                           value={p.price}
                           onChange={(e) => handleUpdate(p.id, 'price', parseInt(e.target.value) || 0)}
                           className="w-full py-3 pl-8 pr-4 text-sm font-medium bg-white focus:outline-none"
                         />
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <label className="relative inline-flex items-center cursor-pointer">
                         <input type="checkbox" checked={p.inStock && p.availableQty > 0} onChange={() => handleUpdate(p.id, 'inStock', !p.inStock)} className="sr-only peer" />
                         <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                       </label>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Sticky Footer */}
        <div className="fixed bottom-0 left-72 right-0 bg-white border-t border-slate-100 px-12 py-6 flex items-center justify-between z-50">
          <div>
            <p className="text-sm font-bold text-slate-900">Changes Summary</p>
            <p className="text-xs text-slate-500">{localProducts.length} total products in catalog</p>
          </div>
          <div className="flex gap-4">
             <button onClick={() => setLocalProducts([...products])} className="px-8 py-3.5 border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition">
               Discard
             </button>
             <button
              onClick={saveChanges}
              className="bg-green-600 text-white px-10 py-3.5 rounded-2xl font-bold text-sm hover:bg-green-700 transition flex items-center gap-3 shadow-xl shadow-green-600/20 disabled:opacity-50"
              disabled={isSaving}
             >
               {isSaving ? 'Saving...' : (
                 <>
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                   Save All Changes
                 </>
               )}
             </button>
          </div>
        </div>

        {/* Add Product Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-[40px] w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
              <div className="p-8 border-b flex items-center justify-between">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Add New Harvest Item</h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-900 transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              <form onSubmit={handleAddProduct} className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Product Name</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-slate-50 border rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-600/10 focus:border-green-600 transition-all"
                      placeholder="e.g. Fresh Cilantro"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Category</label>
                    <select
                      className="w-full bg-slate-50 border rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    >
                      <option>Vegetables</option>
                      <option>Fruits</option>
                      <option>Dairy & Eggs</option>
                      <option>Leafy Greens</option>
                      <option>Root Veg</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Unit</label>
                    <select
                      className="w-full bg-slate-50 border rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none"
                      value={newProduct.unit}
                      onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                    >
                      <option value="kg">kilogram (kg)</option>
                      <option value="pc">piece (pc)</option>
                      <option value="box">box</option>
                      <option value="Bunch">Bunch</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Price (₹)</label>
                    <input
                      required
                      type="number"
                      className="w-full bg-slate-50 border rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none"
                      placeholder="80"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Available Qty</label>
                    <input
                      required
                      type="number"
                      className="w-full bg-slate-50 border rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none"
                      placeholder="50"
                      value={newProduct.availableQty}
                      onChange={(e) => setNewProduct({...newProduct, availableQty: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Product Image (Upload from device)</label>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl py-6 flex flex-col items-center justify-center hover:border-green-600 hover:bg-green-50/50 transition-all group"
                      >
                        {newProduct.image ? (
                          <div className="relative w-full h-32 px-4">
                             <img src={newProduct.image} className="w-full h-full object-contain rounded-lg" alt="Preview" />
                             <div className="absolute inset-0 flex items-center justify-center bg-slate-900/20 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity">
                               <span className="text-white text-xs font-bold">Change Image</span>
                             </div>
                          </div>
                        ) : (
                          <>
                            <svg className="w-8 h-8 text-slate-300 mb-2 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-slate-400 text-xs font-medium group-hover:text-green-600 transition-colors">Click to upload photo</span>
                          </>
                        )}
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Description</label>
                    <textarea
                      className="w-full bg-slate-50 border rounded-2xl px-6 py-4 text-sm font-medium focus:outline-none h-24"
                      placeholder="Tell customers about this fresh harvest..."
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-5 rounded-3xl font-bold text-lg hover:bg-green-700 transition shadow-xl shadow-green-600/30 active:scale-[0.98]"
                  >
                    Add to Catalog
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminInventory;
