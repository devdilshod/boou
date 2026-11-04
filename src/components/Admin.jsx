import React, { useState } from 'react';
import { db } from '../firebase.js';
import { doc, setDoc } from 'firebase/firestore';

export const Admin = ({ products, onBack, onUpdateProducts }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [editableProducts, setEditableProducts] = useState(products || []);
  const [saving, setSaving] = useState(false);

  const ADMIN_PASSWORD = 'boou2026';

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Parol noto'g'ri! Qayta urinib ko'ring.");
      setPasswordInput('');
    }
  };

  // Narxlarni yangilash (field: 'price' yoki 'oldPrice')
  const handlePriceUpdate = (productId, colorCode, field, value) => {
    const numValue = Number(value) || 0;
    const updated = editableProducts.map((p) => {
      if (p.id === productId) {
        if (colorCode && Array.isArray(p.colors)) {
          const updatedColors = p.colors.map((c) =>
            c.code === colorCode ? { ...c, [field]: numValue } : c
          );
          return { ...p, colors: updatedColors };
        }
        return { ...p, [field]: numValue };
      }
      return p;
    });
    setEditableProducts(updated);
  };

  // Ombor holatini o'zgartirish (Mavjud / Tugagan)
  const handleStockToggle = (productId, colorCode) => {
    const updated = editableProducts.map((p) => {
      if (p.id === productId) {
        if (colorCode && Array.isArray(p.colors)) {
          const updatedColors = p.colors.map((c) =>
            c.code === colorCode ? { ...c, inStock: c.inStock === false ? true : false } : c
          );
          return { ...p, colors: updatedColors };
        }
        return { ...p, inStock: p.inStock === false ? true : false };
      }
      return p;
    });
    setEditableProducts(updated);
  };

  // Firebase qabul qilmaydigan barcha 'undefined' qiymatlarni tozalovchi funksiya
  const cleanUndefined = (data) => {
    if (data === undefined) return null;
    if (data === null || typeof data !== 'object') return data;
    if (Array.isArray(data)) return data.map(cleanUndefined);

    const result = {};
    for (const [key, val] of Object.entries(data)) {
      if (val !== undefined) {
        result[key] = cleanUndefined(val);
      }
    }
    return result;
  };

  // O'zgarishlarni xavfsiz holda Firebase Firestore bazasiga saqlash
  const handleSaveToFirebase = async () => {
    setSaving(true);
    try {
      for (const prod of editableProducts) {
        if (!prod.id) continue;
        const prodRef = doc(db, 'products', String(prod.id));

        // Bo'sh qolib ketgan yoki undefined bo'lgan maydonlarga xavfsiz standart qiymatlar berish
        const safeProduct = {
          ...prod,
          price: Number(prod.price) || 0,
          oldPrice: Number(prod.oldPrice) || 0,
          inStock: prod.inStock !== false,
          colors: Array.isArray(prod.colors)
            ? prod.colors.map((c) => ({
                ...c,
                price: Number(c.price) || 0,
                oldPrice: Number(c.oldPrice) || 0,
                inStock: c.inStock !== false,
              }))
            : [],
        };

        const cleanPayload = cleanUndefined(safeProduct);

        await setDoc(prodRef, cleanPayload, { merge: true });
      }

      // Asosiy sahifani darhol 1-urinishdayoq yangilash
      if (onUpdateProducts) {
        onUpdateProducts(editableProducts);
      }

      alert("Barcha o'zgarishlar muvaffaqiyatli saqlandi!");
      onBack();
    } catch (err) {
      console.error("Saqlashda xatolik:", err);
      alert("Xatolik: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // Parol oynasi
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-boou-950 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl space-y-6 border border-boou-200">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-boou-100 text-boou-800 rounded-2xl mx-auto flex items-center justify-center text-2xl font-bold">
              <i className="fas fa-lock"></i>
            </div>
            <h2 className="text-2xl font-extrabold text-boou-950">BOOU Admin Panel</h2>
            <p className="text-xs text-boou-500">Boshqaruv paneliga kirish uchun parolni kiriting</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Maxfiy parolni kiriting..."
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-boou-300 focus:outline-none focus:ring-2 focus:ring-boou-600 text-sm font-medium"
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-3.5 bg-boou-900 hover:bg-black text-white font-bold rounded-xl text-sm transition"
            >
              Kirish
            </button>
          </form>

          <button
            type="button"
            onClick={onBack}
            className="w-full text-center text-xs text-boou-500 hover:text-boou-800 font-bold transition"
          >
            &larr; Asosiy saytga qaytish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-boou-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Yuqori boshqaruv paneli */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-boou-200">
          <h1 className="text-xl font-extrabold text-boou-900 flex items-center gap-2">
            <i className="fas fa-tools text-boou-600"></i> Boshqaruv Paneli
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveToFirebase}
              disabled={saving}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow transition disabled:opacity-50"
            >
              {saving ? "Saqlanmoqda..." : "Bazaga saqlash"}
            </button>
            <button
              onClick={onBack}
              className="px-4 py-2.5 bg-boou-100 hover:bg-boou-200 text-boou-800 rounded-xl font-bold text-xs transition"
            >
              Orqaga
            </button>
          </div>
        </div>

        {/* Mahsulotlar ro'yxati */}
        <div className="bg-white rounded-2xl shadow-sm border border-boou-200 overflow-hidden">
          <div className="p-4 bg-boou-100 font-bold text-xs text-boou-700 uppercase tracking-wider flex justify-between items-center">
            <span>Mahsulot ma'lumotlari</span>
            <span className="hidden md:inline">Eski narx ($) | Yangi narx ($) | Holati</span>
          </div>

          <div className="divide-y divide-boou-100 max-h-[75vh] overflow-y-auto">
            {editableProducts.map((product) => {
              const displayImage =
                (product.colors && product.colors[0]?.image) || product.image || '';

              return (
                <div
                  key={product.id}
                  className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-boou-50/50"
                >
                  {/* Rasm va mahsulot nomi */}
                  <div className="flex items-center gap-3 md:w-1/3">
                    {displayImage ? (
                      <img
                        src={displayImage}
                        alt={product.name}
                        className="w-12 h-12 rounded-xl object-cover border border-boou-200 shrink-0 bg-white"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-boou-100 flex items-center justify-center text-boou-400 shrink-0">
                        <i className="fas fa-image text-xs"></i>
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-xs text-boou-950">{product.name}</h4>
                      <span className="text-[10px] text-boou-500 font-mono">
                        Kod: {product.code || product.id}
                      </span>
                    </div>
                  </div>

                  {/* Ranglar va narxlar boshqaruvi */}
                  <div className="flex-1 space-y-2">
                    {Array.isArray(product.colors) && product.colors.length > 0 ? (
                      product.colors.map((color) => (
                        <div
                          key={color.code}
                          className="flex flex-wrap items-center justify-between gap-2 bg-white p-2.5 rounded-xl border border-boou-200 text-xs"
                        >
                          <div className="flex items-center gap-2 min-w-[120px]">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-boou-300 shrink-0"
                              style={{ backgroundColor: color.hex || '#ccc' }}
                            ></span>
                            <span className="font-bold text-boou-800">{color.name}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <span className="text-[11px] text-boou-400 line-through">Eski: $</span>
                              <input
                                type="number"
                                placeholder="Eski"
                                value={color.oldPrice ?? ''}
                                onChange={(e) =>
                                  handlePriceUpdate(product.id, color.code, 'oldPrice', e.target.value)
                                }
                                className="w-16 px-2 py-1 border border-boou-200 rounded-lg text-boou-400 line-through font-semibold text-center text-xs focus:text-boou-900"
                              />
                            </div>

                            <div className="flex items-center gap-1">
                              <span className="text-emerald-600 font-bold">Yangi: $</span>
                              <input
                                type="number"
                                placeholder="Yangi"
                                value={color.price ?? ''}
                                onChange={(e) =>
                                  handlePriceUpdate(product.id, color.code, 'price', e.target.value)
                                }
                                className="w-16 px-2 py-1 border border-emerald-400 bg-emerald-50/30 rounded-lg font-bold text-center text-xs text-emerald-800"
                              />
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleStockToggle(product.id, color.code)}
                            className={`px-3 py-1 rounded-lg font-bold text-[10px] uppercase transition ${
                              color.inStock === false
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            }`}
                          >
                            {color.inStock === false ? 'Tugagan' : 'Mavjud'}
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-xl border border-boou-200">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <span className="text-[11px] text-boou-400 line-through">Eski: $</span>
                            <input
                              type="number"
                              value={product.oldPrice ?? ''}
                              onChange={(e) =>
                                handlePriceUpdate(product.id, null, 'oldPrice', e.target.value)
                              }
                              className="w-16 px-2 py-1 border border-boou-200 rounded-lg text-boou-400 line-through font-semibold text-center text-xs"
                            />
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-emerald-600 font-bold">Yangi: $</span>
                            <input
                              type="number"
                              value={product.price ?? ''}
                              onChange={(e) =>
                                handlePriceUpdate(product.id, null, 'price', e.target.value)
                              }
                              className="w-16 px-2 py-1 border border-emerald-400 bg-emerald-50/30 rounded-lg font-bold text-center text-xs text-emerald-800"
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleStockToggle(product.id, null)}
                          className={`px-3 py-1 rounded-lg font-bold text-[10px] uppercase ${
                            product.inStock === false
                              ? 'bg-red-100 text-red-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {product.inStock === false ? 'Tugagan' : 'Mavjud'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};