import React, { useState, useEffect } from 'react';
import { db } from '../firebase.js';
import { doc, setDoc } from 'firebase/firestore';
import { supabase } from '../supabase.js';

export const Admin = ({
    products,
    onBack,
    onUpdateProducts,
    onUploadProducts,
    uploading
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const [loginLoading, setLoginLoading] = useState(false);
    const [editableProducts, setEditableProducts] = useState(products || []);
    const [searchQuery, setSearchQuery] = useState('');
    const [saving, setSaving] = useState(false);

    // Asosiy mahsulotlar bazadan yuklanganda admin ro'yxatini ham sinxronlash
    useEffect(() => {
        setEditableProducts(products || []);
    }, [products]);

    // Qidiruv bo'yicha filtrlash (nomi, kodi yoki rang kodi bo'yicha)
    const filteredProducts = editableProducts.filter((p) => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return true;

        const matchName = p.name?.toLowerCase().includes(q);
        const matchCode = p.code?.toLowerCase().includes(q);
        const matchColorCode = Array.isArray(p.colors) && p.colors.some(
            (c) => c.code?.toLowerCase().includes(q) || c.name?.toLowerCase().includes(q)
        );

        return matchName || matchCode || matchColorCode;
    });

    // Supabase orqali admin login
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!emailInput || !passwordInput) {
            alert("Email va parolni kiriting!");
            return;
        }

        setLoginLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: emailInput.trim(),
                password: passwordInput
            });

            if (error) {
                alert("Email yoki parol noto'g'ri!");
                return;
            }

            if (!data.user) {
                alert("Foydalanuvchi topilmadi!");
                return;
            }

            setIsAuthenticated(true);
            setPasswordInput('');

        } catch (error) {
            console.error("Login xatoligi:", error);
            alert("Kirishda xatolik yuz berdi!");
        } finally {
            setLoginLoading(false);
        }
    };

    // Admin hisobidan chiqish
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            alert("Chiqishda xatolik: " + error.message);
            return;
        }

        setIsAuthenticated(false);
        setEmailInput('');
        setPasswordInput('');
    };

    // Narxlarni yangilash
    const handlePriceUpdate = (productId, colorCode, field, value) => {
        const numValue = Number(value) || 0;

        const updated = editableProducts.map((p) => {
            if (p.id === productId) {
                if (colorCode && Array.isArray(p.colors)) {
                    const updatedColors = p.colors.map((c) =>
                        c.code === colorCode
                            ? { ...c, [field]: numValue }
                            : c
                    );

                    return { ...p, colors: updatedColors };
                }

                return { ...p, [field]: numValue };
            }

            return p;
        });

        setEditableProducts(updated);
    };

    // Ombor holatini o'zgartirish
    const handleStockToggle = (productId, colorCode) => {
        const updated = editableProducts.map((p) => {
            if (p.id === productId) {
                if (colorCode && Array.isArray(p.colors)) {
                    const updatedColors = p.colors.map((c) =>
                        c.code === colorCode
                            ? { ...c, inStock: c.inStock === false ? true : false }
                            : c
                    );

                    return { ...p, colors: updatedColors };
                }

                return {
                    ...p,
                    inStock: p.inStock === false ? true : false
                };
            }

            return p;
        });

        setEditableProducts(updated);
    };

    // Undefined qiymatlarni tozalash
    const cleanUndefined = (data) => {
        if (data === undefined) return null;

        if (data === null || typeof data !== 'object') {
            return data;
        }

        if (Array.isArray(data)) {
            return data.map(cleanUndefined);
        }

        const result = {};

        for (const [key, val] of Object.entries(data)) {
            if (val !== undefined) {
                result[key] = cleanUndefined(val);
            }
        }

        return result;
    };

    // Firebase va Supabase'ga saqlash
    const handleSaveToFirebase = async () => {
        setSaving(true);

        try {
            const supabaseProducts = [];

            // 1. Mahsulotlarni tayyorlash va Firebase'ga saqlash
            for (const prod of editableProducts) {
                if (!prod.id) continue;

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
                            inStock: c.inStock !== false
                        }))
                        : []
                };

                const prodRef = doc(db, 'products', String(prod.id));
                const cleanPayload = cleanUndefined(safeProduct);

                await setDoc(prodRef, cleanPayload, { merge: true });

                supabaseProducts.push({
                    product_id: prod.id,
                    code: prod.code,
                    name: prod.name,
                    category: prod.category,
                    category_name: prod.categoryName,
                    price: safeProduct.price,
                    old_price: safeProduct.oldPrice,
                    description: prod.description || "",
                    image: prod.image || "",
                    colors: safeProduct.colors,
                    is_popular: prod.isPopular ?? false,
                    is_new: prod.isNew ?? false,
                    in_stock: safeProduct.inStock
                });
            }

            // 2. Supabase'ga saqlash (xato bersa ham Firebase saqlanib qoladi)
            let supabaseWarning = null;
            try {
                const { error } = await supabase
                    .from('products')
                    .upsert(supabaseProducts, {
                        onConflict: 'product_id'
                    })
                    .select();

                if (error) {
                    supabaseWarning = error.message;
                    console.warn("Supabase saqlashda ogohlantirish:", error);
                }
            } catch (supaErr) {
                supabaseWarning = supaErr.message;
                console.warn("Supabase saqlashda xatolik:", supaErr);
            }

            // 3. Yangilangan mahsulotlarni App'ga yuborish
            if (onUpdateProducts) {
                onUpdateProducts(editableProducts);
            }

            if (supabaseWarning) {
                alert("Firebase'ga saqlandi (barcha qurilmalarda ko'rinadi), lekin Supabase'da ogohlantirish chiqdi: " + supabaseWarning);
            } else {
                alert("Firebase va Supabase'ga muvaffaqiyatli saqlandi!");
            }

            onBack();

        } catch (err) {
            console.error("Saqlashda xatolik:", err);
            alert("Xatolik: " + err.message);

        } finally {
            setSaving(false);
        }
    };

    // Login oynasi
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-boou-950 flex items-center justify-center p-4">
                <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl space-y-6 border border-boou-200">

                    <div className="text-center space-y-2">
                        <div className="w-14 h-14 bg-boou-100 text-boou-800 rounded-2xl mx-auto flex items-center justify-center text-2xl font-bold">
                            <i className="fas fa-lock"></i>
                        </div>

                        <h2 className="text-2xl font-extrabold text-boou-950">
                            BOOU Admin Panel
                        </h2>

                        <p className="text-xs text-boou-500">
                            Boshqaruv paneliga kirish uchun Gmail va parolingizni kiriting
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">

                        <input
                            type="email"
                            placeholder="Gmail manzilingiz"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-boou-300 focus:outline-none focus:ring-2 focus:ring-boou-600 text-sm font-medium"
                            autoComplete="username"
                            required
                        />

                        <input
                            type="password"
                            placeholder="Supabase parolingiz"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-boou-300 focus:outline-none focus:ring-2 focus:ring-boou-600 text-sm font-medium"
                            autoComplete="current-password"
                            required
                        />

                        <button
                            type="submit"
                            disabled={loginLoading}
                            className="w-full py-3.5 bg-boou-900 hover:bg-black text-white font-bold rounded-xl text-sm transition disabled:opacity-50"
                        >
                            {loginLoading ? "Tekshirilmoqda..." : "Kirish"}
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

    // Admin panel
    return (
        <div className="min-h-screen bg-boou-50 p-4 sm:p-6">

            <div className="max-w-6xl mx-auto space-y-6">

                {/* Yuqori boshqaruv paneli */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-boou-200">

                    <h1 className="text-xl font-extrabold text-boou-900 flex items-center gap-2">
                        <i className="fas fa-tools text-boou-600"></i>
                        Boshqaruv Paneli
                    </h1>

                    <div className="flex flex-wrap items-center gap-2">

                        <button
                            onClick={handleSaveToFirebase}
                            disabled={saving}
                            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow transition disabled:opacity-50"
                        >
                            {saving ? "Saqlanmoqda..." : "Bazaga saqlash"}
                        </button>

                        {/* Supabase yuklash tugmasi */}
                        {onUploadProducts && (
                            <button
                                onClick={onUploadProducts}
                                disabled={uploading}
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow transition disabled:opacity-50"
                            >
                                {uploading
                                    ? "Yuklanmoqda..."
                                    : "Supabase'ga yuklash"}
                            </button>
                        )}

                        <button
                            onClick={handleLogout}
                            className="px-4 py-2.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl font-bold text-xs transition"
                        >
                            Chiqish
                        </button>

                        <button
                            onClick={onBack}
                            className="px-4 py-2.5 bg-boou-100 hover:bg-boou-200 text-boou-800 rounded-xl font-bold text-xs transition"
                        >
                            Orqaga
                        </button>

                    </div>
                </div>

                {/* Qidiruv paneli */}
                <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-boou-200 flex items-center gap-3">
                    <i className="fas fa-search text-boou-400 text-sm ml-1"></i>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Mahsulot nomi, modeli yoki kodi bo'yicha qidiring (masalan: 8280, 9205, Ronas)..."
                        className="w-full text-sm text-boou-900 placeholder:text-boou-400 focus:outline-none"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="text-xs font-bold text-boou-500 hover:text-boou-800 px-2 py-1"
                        >
                            Tozalash
                        </button>
                    )}
                </div>

                {/* Mahsulotlar ro'yxati */}
                <div className="bg-white rounded-2xl shadow-sm border border-boou-200 overflow-hidden">

                    <div className="p-4 bg-boou-100 font-bold text-xs text-boou-700 uppercase tracking-wider flex justify-between items-center">
                        <span>Mahsulot ma'lumotlari ({filteredProducts.length} ta)</span>

                        <span className="hidden md:inline">
                            Eski narx ($) | Yangi narx ($) | Holati
                        </span>
                    </div>

                    <div className="divide-y divide-boou-100 max-h-[75vh] overflow-y-auto">

                        {filteredProducts.length === 0 ? (
                            <div className="p-8 text-center text-sm text-boou-500">
                                "{searchQuery}" bo'yicha mahsulot topilmadi.
                            </div>
                        ) : (
                            filteredProducts.map((product) => {
                                const displayImage =
                                    (product.colors && product.colors[0]?.image) ||
                                    product.image ||
                                    '';

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
                                                <h4 className="font-bold text-xs text-boou-950">
                                                    {product.name}
                                                </h4>

                                                <span className="text-[10px] text-boou-500 font-mono">
                                                    Kod: {product.code || product.id}
                                                </span>
                                            </div>

                                        </div>

                                        {/* Ranglar va narxlar */}
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
                                                                style={{
                                                                    backgroundColor: color.hex || '#ccc'
                                                                }}
                                                            ></span>

                                                            <span className="font-bold text-boou-800">
                                                                {color.name}
                                                            </span>

                                                        </div>

                                                        <div className="flex items-center gap-3">

                                                            <div className="flex items-center gap-1">
                                                                <span className="text-[11px] text-boou-400 line-through">
                                                                    Eski: $
                                                                </span>

                                                                <input
                                                                    type="number"
                                                                    placeholder="Eski"
                                                                    value={color.oldPrice ?? ''}
                                                                    onChange={(e) =>
                                                                        handlePriceUpdate(
                                                                            product.id,
                                                                            color.code,
                                                                            'oldPrice',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="w-16 px-2 py-1 border border-boou-200 rounded-lg text-boou-400 line-through font-semibold text-center text-xs focus:text-boou-900"
                                                                />
                                                            </div>

                                                            <div className="flex items-center gap-1">
                                                                <span className="text-emerald-600 font-bold">
                                                                    Yangi: $
                                                                </span>

                                                                <input
                                                                    type="number"
                                                                    placeholder="Yangi"
                                                                    value={color.price ?? ''}
                                                                    onChange={(e) =>
                                                                        handlePriceUpdate(
                                                                            product.id,
                                                                            color.code,
                                                                            'price',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="w-16 px-2 py-1 border border-emerald-400 bg-emerald-50/30 rounded-lg font-bold text-center text-xs text-emerald-800"
                                                                />
                                                            </div>

                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleStockToggle(product.id, color.code)
                                                            }
                                                            className={`px-3 py-1 rounded-lg font-bold text-[10px] uppercase transition ${color.inStock === false
                                                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                                                : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                                                }`}
                                                        >
                                                            {color.inStock === false
                                                                ? 'Tugagan'
                                                                : 'Mavjud'}
                                                        </button>

                                                    </div>
                                                ))

                                            ) : (

                                                <div className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-xl border border-boou-200">

                                                    <div className="flex items-center gap-3">

                                                        <div className="flex items-center gap-1">
                                                            <span className="text-[11px] text-boou-400 line-through">
                                                                Eski: $
                                                            </span>

                                                            <input
                                                                type="number"
                                                                value={product.oldPrice ?? ''}
                                                                onChange={(e) =>
                                                                    handlePriceUpdate(
                                                                        product.id,
                                                                        null,
                                                                        'oldPrice',
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="w-16 px-2 py-1 border border-boou-200 rounded-lg text-boou-400 line-through font-semibold text-center text-xs"
                                                            />
                                                        </div>

                                                        <div className="flex items-center gap-1">
                                                            <span className="text-emerald-600 font-bold">
                                                                Yangi: $
                                                            </span>

                                                            <input
                                                                type="number"
                                                                value={product.price ?? ''}
                                                                onChange={(e) =>
                                                                    handlePriceUpdate(
                                                                        product.id,
                                                                        null,
                                                                        'price',
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="w-16 px-2 py-1 border border-emerald-400 bg-emerald-50/30 rounded-lg font-bold text-center text-xs text-emerald-800"
                                                            />
                                                        </div>

                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleStockToggle(product.id, null)
                                                        }
                                                        className={`px-3 py-1 rounded-lg font-bold text-[10px] uppercase ${product.inStock === false
                                                            ? 'bg-red-100 text-red-700'
                                                            : 'bg-emerald-100 text-emerald-700'
                                                            }`}
                                                    >
                                                        {product.inStock === false
                                                            ? 'Tugagan'
                                                            : 'Mavjud'}
                                                    </button>

                                                </div>
                                            )}

                                        </div>

                                    </div>
                                );
                            })
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};