import React, { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

export const Header = ({ cartCount, wishlistCount, onOpenCart, onOpenWishlist, onOpenSearch, currentPage, onNavigateHome, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (currentPage === 'wishlist') {
      onNavigateHome(id);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-boou-200/80 shadow-sm transition-all duration-200" id="main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-boou-700 to-boou-900 text-white flex items-center justify-center font-bold text-xl tracking-wider shadow-md group-hover:scale-105 transition-transform duration-200 border border-boou-600">
            B
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-2xl tracking-tight text-boou-900 group-hover:text-boou-700 transition">BOOU</span>
              <span className="hidden sm:inline-block text-[10px] text-center uppercase font-bold tracking-widest bg-boou-100 text-boou-700 px-1.5 py-0.5 rounded border border-boou-200">{t('header.shopBadge')}</span>
            </div>
            <p className="hidden sm:block text-[11px] font-medium text-boou-500 tracking-tight leading-none mt-0.5">{t('header.tagline')}</p>
          </div>
        </a>

        <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-boou-800">
          <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className="px-3 py-2 rounded-xl hover:text-boou-600 hover:bg-boou-100/70 transition font-semibold">{t('nav.home')}</a>
          <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="px-3 py-2 rounded-xl hover:text-boou-600 hover:bg-boou-100/70 transition">{t('nav.products')}</a>
          <a href="#categories" onClick={(e) => handleNavClick(e, 'categories')} className="px-3 py-2 rounded-xl hover:text-boou-600 hover:bg-boou-100/70 transition">{t('nav.categories')}</a>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="px-3 py-2 rounded-xl hover:text-boou-600 hover:bg-boou-100/70 transition">{t('nav.about')}</a>
          <a href="#manzil" onClick={(e) => handleNavClick(e, 'manzil')} className="px-3 py-2 rounded-xl hover:text-boou-600 hover:bg-boou-100/70 transition">{t('nav.location')}</a>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Til tanlash tugmasi (O'zbekcha / Русский / English) */}
          <LanguageSwitcher />

          <button onClick={onOpenWishlist} className="relative py-1 p-2.5 rounded-xl text-boou-700 hover:text-red-500 hover:bg-boou-100 border border-boou-200/80 transition" title={t('nav.wishlist')}>
            <i className="far fa-heart text-lg"></i>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <button onClick={onOpenCart} className="relative flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-boou-600 hover:bg-boou-700 text-white font-semibold text-sm shadow-sm transition">
            <i className="fas fa-shopping-bag"></i>
            <span className="hidden md:inline">{t('nav.cart')}</span>
            <span className="bg-white text-boou-700 text-[11px] font-extrabold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
              {cartCount}
            </span>
          </button>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2.5 rounded-xl text-boou-800 hover:bg-boou-100 transition">
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-boou-200 bg-white px-5 py-4 space-y-2 shadow-xl">
          <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className="block px-3 py-2 rounded-xl font-semibold text-boou-800 hover:bg-boou-100">{t('nav.home')}</a>
          <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="block px-3 py-2 rounded-xl font-medium text-boou-800 hover:bg-boou-100">{t('nav.products')}</a>
          <a href="#categories" onClick={(e) => handleNavClick(e, 'categories')} className="block px-3 py-2 rounded-xl font-medium text-boou-800 hover:bg-boou-100">{t('nav.categories')}</a>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="block px-3 py-2 rounded-xl font-medium text-boou-800 hover:bg-boou-100">{t('nav.about')}</a>
          <a href="#manzil" onClick={(e) => handleNavClick(e, 'manzil')} className="block px-3 py-2 rounded-xl font-medium text-boou-800 hover:bg-boou-100">{t('nav.locationFull')}</a>
        </div>
      )}
    </header>
  );
};