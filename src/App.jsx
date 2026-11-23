import React, { useState, useEffect } from 'react';
import { supabase } from './supabase.js';

import { CATEGORIES, INITIAL_PRODUCTS } from './data/products.js';
import { uploadProducts } from './uploadProducts.js';

import { db } from './firebase.js';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

import { Preloader } from './components/Preloader.jsx';
import { TopBar } from './components/TopBar.jsx';
import { Header } from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import { Products } from './components/Products.jsx';
import { Categories } from './components/Categories.jsx';
import { About } from './components/About.jsx';
import { Location } from './components/Location.jsx';
import { Footer } from './components/Footer.jsx';
import { Cart } from './components/Cart.jsx';
import { ProductModal } from './components/ProductModal.jsx';
import { Wishlist } from './components/Wishlist.jsx';
import { Admin } from './components/Admin.jsx';

const mergeProductsWithDb = (baseList, dbDataMap) => {
  return baseList.map((localItem) => {
    const dbItem = dbDataMap[localItem.id];

    if (!dbItem) {
      return localItem;
    }

    return {
      ...localItem,
      price: dbItem.price ?? localItem.price,
      oldPrice: dbItem.oldPrice ?? localItem.oldPrice,
      inStock: dbItem.inStock ?? localItem.inStock,
      isNew: dbItem.isNew ?? localItem.isNew,
      isPopular: dbItem.isPopular ?? localItem.isPopular,

      colors: localItem.colors?.map((c) => {
        const dbColor = dbItem.colors?.find(
          (dc) => dc.code === c.code
        );

        return dbColor
          ? {
              ...c,
              price: dbColor.price ?? c.price,
              oldPrice: dbColor.oldPrice ?? c.oldPrice,
              inStock: dbColor.inStock ?? c.inStock
            }
          : c;
      })
    };
  });
};

export const App = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [promocodes, setPromocodes] = useState([]);

  const [uploading, setUploading] = useState(false);

  // Firebase'dan promokodlarni real-vaqtda yuklash
  useEffect(() => {
    const unsubPromos = onSnapshot(collection(db, 'promocodes'), (snapshot) => {
      const list = [];
      snapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      setPromocodes(list);
    });

    return () => unsubPromos();
  }, []);

  // Supabase'ga mahsulotlarni yuklash
  const handleUploadProducts = async () => {
    if (uploading) return;

    const confirmUpload = window.confirm(
      "Barcha mahsulotlarni Supabase'ga yuklamoqchimisiz?"
    );

    if (!confirmUpload) return;

    setUploading(true);

    try {
      await uploadProducts();
    } catch (error) {
      console.error("Yuklashda xatolik:", error);
      alert(error.message || "Mahsulotlarni yuklashda xatolik yuz berdi!");
    } finally {
      setUploading(false);
    }
  };

  // Supabase va Firebase'dan mahsulotlarni yuklash
  const loadProducts = async () => {
    let baseProducts = INITIAL_PRODUCTS;

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (!error && data && data.length > 0) {
        baseProducts = data.map((item) => ({
          id: item.product_id,
          code: item.code,
          name: item.name,
          category: item.category,
          categoryName: item.category_name,
          price: Number(item.price),
          oldPrice: item.old_price,
          description: item.description,
          image: item.image,
          colors: item.colors || [],
          isPopular: item.is_popular,
          isNew: item.is_new,
          inStock: item.in_stock
        }));
      }
    } catch (error) {
      console.warn("Supabase'dan yuklashda xatolik, lokal ro'yxat ishlatiladi:", error);
    }

    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const dbDataMap = {};

      querySnapshot.forEach((docSnap) => {
        dbDataMap[docSnap.id] = docSnap.data();
      });

      const mergedProducts = mergeProductsWithDb(baseProducts, dbDataMap);
      setProducts(mergedProducts);
    } catch (error) {
      console.error("Firebase'dan yuklashda xatolik:", error);
      setProducts(baseProducts);
    }
  };

  // Real-vaqtda barcha qurilmalarda yangilanish (Firebase onSnapshot)
  useEffect(() => {
    let baseProducts = INITIAL_PRODUCTS;
    let unsubscribe = () => {};

    const initRealtimeProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (!error && data && data.length > 0) {
          baseProducts = data.map((item) => ({
            id: item.product_id,
            code: item.code,
            name: item.name,
            category: item.category,
            categoryName: item.category_name,
            price: Number(item.price),
            oldPrice: item.old_price,
            description: item.description,
            image: item.image,
            colors: item.colors || [],
            isPopular: item.is_popular,
            isNew: item.is_new,
            inStock: item.in_stock
          }));
        }
      } catch (error) {
        console.warn("Supabase'dan yuklashda xatolik, lokal ro'yxat ishlatiladi:", error);
      }

      unsubscribe = onSnapshot(
        collection(db, 'products'),
        (snapshot) => {
          const dbDataMap = {};
          snapshot.forEach((docSnap) => {
            dbDataMap[docSnap.id] = docSnap.data();
          });

          const mergedProducts = mergeProductsWithDb(baseProducts, dbDataMap);
          setProducts(mergedProducts);
        },
        (error) => {
          console.error("Real-time sinxronizatsiya xatoligi:", error);
          setProducts(baseProducts);
        }
      );
    };

    initRealtimeProducts();

    return () => {
      unsubscribe();
    };
  }, []);

  // Savatcha
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('boou_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Sevimlilar
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('boou_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => {
    if (window.location.hash === '#admin' || window.location.search.includes('admin')) {
      return 'admin';
    }
    return 'home';
  });
  const [scrollToSection, setScrollToSection] = useState(null);

  const [modalProduct, setModalProduct] = useState(null);
  const [modalColor, setModalColor] = useState(null);

  // Yashirin kirish: URL da #admin bo'lsa yoki klaviaturada Ctrl+Shift+A bosilsa Admin ochiladi
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentPage('admin');
      }
    };

    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setCurrentPage('admin');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Savatchani saqlash
  useEffect(() => {
    localStorage.setItem('boou_cart', JSON.stringify(cart));
  }, [cart]);

  // Bazadagi narx o'zgarsa, savatchadagi mahsulot narxini ham avtomatik yangilash
  useEffect(() => {
    setCart((prevCart) => {
      if (!prevCart || prevCart.length === 0) return prevCart;

      let hasChanges = false;

      const updatedCart = prevCart.map((item) => {
        const prod = products.find((p) => p.id === item.productId);
        if (!prod) return item;

        const matchedColor = Array.isArray(prod.colors)
          ? prod.colors.find(
              (c) =>
                item.cartItemId === `${prod.id}-${c.code}` ||
                c.name === item.color
            )
          : null;

        const latestPrice = matchedColor ? matchedColor.price : prod.price;
        const latestImage = matchedColor ? matchedColor.image : prod.image;

        if (latestPrice !== item.price || latestImage !== item.image) {
          hasChanges = true;
          return {
            ...item,
            price: latestPrice,
            image: latestImage
          };
        }

        return item;
      });

      return hasChanges ? updatedCart : prevCart;
    });
  }, [products]);

  // Sevimlilarni saqlash
  useEffect(() => {
    localStorage.setItem('boou_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Savatchaga qo'shish
  const handleAddToCart = (product, color = null, quantity = 1) => {
    const activeColor =
      color || (product.colors && product.colors[0]) || null;

    if (activeColor?.inStock === false || product.inStock === false) {
      alert("Kechirasiz, ushbu rangdagi mahsulot omborda qolmagan!");
      return;
    }

    const cartItemId = activeColor
      ? `${product.id}-${activeColor.code}`
      : product.id;

    const price = activeColor ? activeColor.price : product.price;
    const image = activeColor ? activeColor.image : product.image;
    const qty = Number(quantity) || 1;

    setCart((prev) => {
      const existing = prev.find(
        (i) => i.cartItemId === cartItemId
      );

      if (existing) {
        return prev.map((i) =>
          i.cartItemId === cartItemId
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }

      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          name: product.name,
          color: activeColor ? activeColor.name : 'Standart',
          colorHex: activeColor ? activeColor.hex : '#695344',
          price,
          image,
          quantity: qty
        }
      ];
    });
  };

  // Mahsulot miqdorini o'zgartirish
  const handleUpdateQuantity = (cartItemId, delta) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.cartItemId === cartItemId) {
            const q = i.quantity + delta;
            return q > 0 ? { ...i, quantity: q } : null;
          }

          return i;
        })
        .filter(Boolean)
    );
  };

  // Savatchadan o'chirish
  const handleRemoveFromCart = (cartItemId) => {
    setCart((prev) =>
      prev.filter((i) => i.cartItemId !== cartItemId)
    );
  };

  // Sevimlilarga qo'shish yoki o'chirish
  const handleToggleLike = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // Mahsulot oynasini ochish
  const handleOpenProductModal = (product, color = null) => {
    setModalProduct(product);
    setModalColor(color);
  };

  // Mahsulot oynasini yopish
  const handleCloseProductModal = () => {
    setModalProduct(null);
    setModalColor(null);
  };

  // Asosiy sahifaga o'tish
  const handleNavigateHome = (id) => {
    setScrollToSection(id);
    setCurrentPage('home');
  };

  // Mahsulotlarni filtrlash va saralash
  const filteredProducts = products
    .filter((p) => {
      const matchesCat =
        selectedCategory === 'all' ||
        p.category === selectedCategory;

      const q = searchQuery.trim().toLowerCase();

      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.code && p.code.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;

      if (sortBy === 'newest') {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }

      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    });

  return (
    <div className="min-h-screen flex flex-col bg-boou-50 text-boou-900 font-sans">

      <Preloader />

      {/* ADMIN SAHIFASI */}
      {currentPage === 'admin' ? (

        <Admin
          products={products}

          onUpdateProducts={(updatedProducts) => {
            setProducts(updatedProducts);
          }}

          onUploadProducts={handleUploadProducts}
          uploading={uploading}

          onBack={() => {
            if (window.location.hash === '#admin') {
              window.history.replaceState(null, '', window.location.pathname);
            }
            setCurrentPage('home');
            loadProducts();
          }}
        />

      ) : (

        <>
          <TopBar />

          <Header
            cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
            wishlistCount={wishlist.length}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenWishlist={() => setCurrentPage('wishlist')}
            onOpenSearch={() => { }}
            currentPage={currentPage}
            onNavigateHome={handleNavigateHome}
            onOpenAdmin={() => setCurrentPage('admin')}
          />

          {/* SEVIMLILAR */}
          {currentPage === 'wishlist' ? (

            <Wishlist
              products={products}
              wishlist={wishlist}
              onToggleLike={handleToggleLike}
              onAddToCart={handleAddToCart}
              onOpenModal={handleOpenProductModal}
              onBack={() => setCurrentPage('home')}
            />

          ) : (

            <>
              <main className="flex-1">

                <Hero
                  onSelectCategory={setSelectedCategory}
                />

                <Products
                  products={filteredProducts}
                  categories={CATEGORIES}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  onAddToCart={handleAddToCart}
                  onToggleLike={handleToggleLike}
                  wishlist={wishlist}
                  onOpenModal={handleOpenProductModal}
                />

                <Categories
                  categories={CATEGORIES}
                  onSelectCategory={setSelectedCategory}
                />

                <About />
                <Location />

              </main>

              <Footer
                onSelectCategory={setSelectedCategory}
              />
            </>

          )}

          {/* SAVATCHA */}
          <Cart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            promocodes={promocodes}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemoveFromCart}
            onCheckout={async ({ name, phone, note, promo, subtotal, finalTotal }) => {
              const orderNum =
                'BOOU-' + Math.floor(1000 + Math.random() * 9000);

              const itemsText = cart
                .map(
                  (i, idx) =>
                    `${idx + 1}. ${i.name} (${i.color}) — ${i.quantity} x $${i.price} = $${i.price * i.quantity}`
                )
                .join('\n');

              const promoText = promo
                ? `\n🎟 Promokod: ${promo.code} (-$${promo.discountAmount})\n💵 Asl summa: $${subtotal}\n💰 Yakuniy summa: $${finalTotal}`
                : `\n💰 Jami summa: $${finalTotal}`;

              const text =
                `🆕 YANGI BUYURTMA #${orderNum}\n\n` +
                `👤 Mijoz: ${name}\n` +
                `📞 Telefon: ${phone}\n` +
                (note ? `📝 Izoh: ${note}\n` : '') +
                `\n📦 Tanlangan mahsulotlar:\n${itemsText}\n` +
                `${promoText}\n` +
                `📍 Do'kon: Qo'yliq bozori 2-pavilion 94-do'kon`;

              const BOT_TOKEN = '9204636841:AAEGxoFNQmur2xNFZvuXF6EBdl8wpw9kK1M';
              const CHAT_ID = '8036527130';

              const res = await fetch(
                `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text,
                  }),
                }
              );

              if (!res.ok) {
                throw new Error('Telegram API error');
              }

              setCart([]);
              return orderNum;
            }}
          />

          {/* MAHSULOT OYNASI */}
          <ProductModal
            product={modalProduct}
            initialColor={modalColor}
            onClose={handleCloseProductModal}
            onAddToCart={handleAddToCart}
            onBuyNow={(prod, col, qty) => {
              handleAddToCart(prod, col, qty);
              handleCloseProductModal();
              setIsCartOpen(true);
            }}
          />

        </>

      )}

    </div>
  );
};

export default App;