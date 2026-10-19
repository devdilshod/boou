
import React, { useState, useEffect } from 'react';
import { CATEGORIES, INITIAL_PRODUCTS } from './data/products.js';
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
import { Wishlist } from './components/WishList.jsx';

export const App = () => {
  const [products] = useState(INITIAL_PRODUCTS);

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('boou_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('boou_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [scrollToSection, setScrollToSection] = useState(null);

  const [modalProduct, setModalProduct] = useState(null);
  const [modalColor, setModalColor] = useState(null);

  useEffect(() => {
    localStorage.setItem('boou_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('boou_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (currentPage === 'home' && scrollToSection) {
      const timer = setTimeout(() => {
        document.getElementById(scrollToSection)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setScrollToSection(null);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [currentPage, scrollToSection]);

  const handleAddToCart = (product, color = null, quantity = 1) => {
    const activeColor = color || (product.colors && product.colors[0]) || null;
    const cartItemId = activeColor ? `${product.id}-${activeColor.code}` : product.id;
    const price = activeColor ? activeColor.price : product.price;
    const image = activeColor ? activeColor.image : product.image;
    const qty = Number(quantity) || 1;

    setCart(prev => {
      const existing = prev.find(i => i.cartItemId === cartItemId);
      if (existing) {
        return prev.map(i => i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + qty } : i);
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

  const handleUpdateQuantity = (cartItemId, delta) => {
    setCart(prev => prev.map(i => {
      if (i.cartItemId === cartItemId) {
        const q = i.quantity + delta;
        return q > 0 ? { ...i, quantity: q } : null;
      }
      return i;
    }).filter(Boolean));
  };

  const handleRemoveFromCart = (cartItemId) => {
    setCart(prev => prev.filter(i => i.cartItemId !== cartItemId));
  };

  const handleToggleLike = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleOpenProductModal = (product, color = null) => {
    setModalProduct(product);
    setModalColor(color);
  };

  const handleCloseProductModal = () => {
    setModalProduct(null);
    setModalColor(null);
  };

  const handleNavigateHome = (id) => {
    setScrollToSection(id);
    setCurrentPage('home');
  };

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = !q || p.name.toLowerCase().includes(q) || (p.code && p.code.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
  });

  return (
    <div className="min-h-screen flex flex-col bg-boou-50 text-boou-900 font-sans">
      <TopBar />

      <Header
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setCurrentPage('wishlist')}
        onOpenSearch={() => setIsSearchOpen(true)}
        currentPage={currentPage}
        onNavigateHome={handleNavigateHome}
      />

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
            <Hero onSelectCategory={setSelectedCategory} />

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

            <Categories categories={CATEGORIES} onSelectCategory={setSelectedCategory} />
            <About />
            <Location />
          </main>

          <Footer onSelectCategory={setSelectedCategory} />
        </>
      )}

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={() => {
          const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
          const orderNum = 'BOOU-' + Math.floor(1000 + Math.random() * 9000);
          const itemsText = cart.map(i => `• ${i.name} (${i.color}) - ${i.quantity} x $${i.price} = $${i.price * i.quantity}`).join('\n');
          const tgMsg = encodeURIComponent(
            `Assalomu alaykum! BOOU showroomidan yangi buyurtma:\n` +
            `Buyurtma kodi: #${orderNum}\n\n` +
            `Tanlangan mahsulotlar:\n${itemsText}\n\n` +
            `Jami summa: $${total}\n` +
            `Do'kon: Qo'yliq bozori 2-pavilion 94-do'kon`
          );
          window.open(`https://t.me/boou_tashkent?text=${tgMsg}`, '_blank');
        }}
      />

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
    </div>
  );
};

export default App;
