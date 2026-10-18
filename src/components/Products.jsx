import React from 'react';
import { ProductCard } from './ProductCard';

export const Products = ({
  products,
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onAddToCart,
  onToggleLike,
  wishlist,
  onOpenModal
}) => {
  return (
    <section id="products" className="py-16 lg:py-20 bg-white">
      <div id="catalog"></div>
      <div id="mahsulotlar"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-boou-600 uppercase tracking-widest mb-1.5">
              <i className="fas fa-layer-group"></i> BOOU Original Katalogi
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-boou-950 tracking-tight">
              Top Mahsulotlar & Barcha Katalog
            </h2>
            <p className="text-sm text-boou-600 mt-1 max-w-2xl">
              Har bir model uchun 3-4 xil rang variantini bevosita kartadan tanlashingiz mumkin.
            </p>
          </div>
          <div className="text-xs text-boou-600 bg-boou-50 px-3 py-1.5 rounded-xl border border-boou-200">
            <span>Ko'rsatilmoqda:</span>
            <strong className="text-boou-900 font-bold ml-1">{products.length} ta model</strong>
          </div>
        </div>

        {/* Filtr paneli */}
        <div className="bg-boou-50/80 rounded-2xl p-4 sm:p-5 border border-boou-200/80 mb-8 space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs font-semibold">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-4 py-2 rounded-xl shadow-xs whitespace-nowrap transition ${
                selectedCategory === 'all'
                  ? 'bg-boou-600 text-white'
                  : 'bg-white text-boou-800 border border-boou-200 hover:bg-boou-100'
              }`}
            >
              Barchasi
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-boou-600 text-white shadow-xs'
                    : 'bg-white text-boou-800 border border-boou-200 hover:bg-boou-100'
                }`}
              >
                {cat.id === 'oshxona-smestitel' && <span className="w-2 h-2 rounded-full bg-brass-500"></span>}
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
            <div className="sm:col-span-7 relative">
              <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-boou-400 text-sm"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Model nomi, kodi (masalan, BOOU-5413), yoki xususiyati bo'yicha qidiring..."
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-boou-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-boou-600/40 text-boou-900 placeholder:text-boou-400"
              />
            </div>

            <div className="sm:col-span-5 flex items-center gap-2">
              <label className="text-xs font-medium text-boou-600 whitespace-nowrap">Saralash:</label>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-full bg-white border border-boou-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-boou-800 focus:outline-none focus:ring-2 focus:ring-boou-600/40"
              >
                <option value="popular">Tavsiya etilgan / Mashhur</option>
                <option value="price-asc">Narx: Arzondan qimmatga</option>
                <option value="price-desc">Narx: Qimmatdan arzonga</option>
                <option value="newest">Yangi qo'shilganlar</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mahsulotlar to'ri */}
        {products.length === 0 ? (
          <div className="text-center py-16 bg-boou-50 rounded-3xl border border-dashed border-boou-200 my-8">
            <i className="fas fa-search-minus text-4xl text-boou-400 mb-2"></i>
            <h3 className="text-lg font-bold text-boou-900">Ushbu so'rov bo'yicha mahsulot topilmadi</h3>
            <p className="text-xs text-boou-500 mt-1">Iltimos, boshqa kalit so'z kiriting yoki toifalardan birini tanlang.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={onAddToCart}
                onToggleLike={onToggleLike}
                isLiked={wishlist.includes(p.id)}
                onOpenModal={onOpenModal}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};