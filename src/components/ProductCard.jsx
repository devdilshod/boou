import React, { useState } from 'react';

export const ProductCard = ({ product, onAddToCart, onToggleLike, isLiked, onOpenModal }) => {
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );

  const displayImage = selectedColor ? selectedColor.image : product.image;
  const displayPrice = selectedColor ? selectedColor.price : product.price;
  const displayOldPrice = selectedColor && selectedColor.oldPrice ? selectedColor.oldPrice : product.oldPrice;

  return (
    <div className="bg-white rounded-2xl p-4 border border-boou-200/90 shadow-xs hover:shadow-lg hover:border-boou-400 transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div onClick={() => onOpenModal(product, selectedColor)} className="relative w-full aspect-square rounded-xl overflow-hidden bg-boou-50 mb-3 border border-boou-100 cursor-pointer">
          <img
            src={displayImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onToggleLike(product.id); }}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-boou-700 hover:text-red-500 flex items-center justify-center shadow-xs transition z-10"
            title="Sevimlilarga qo'shish"
          >
            <i className={`${isLiked ? 'fas fa-heart text-red-500' : 'far fa-heart'} text-sm`}></i>
          </button>

          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {product.isNew && (
              <span className="bg-boou-600 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">Yangi</span>
            )}
            {product.isPopular && (
              <span className="bg-brass-500 text-boou-950 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">Xaridorgir</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-boou-500 mb-1">
          <span>{product.categoryName || 'BOOU'}</span>
          <span className="font-mono text-[10px] bg-boou-100 text-boou-700 px-1.5 py-0.5 rounded">{product.code}</span>
        </div>

        <h3 onClick={() => onOpenModal(product, selectedColor)} className="font-bold text-sm text-boou-950 hover:text-boou-600 transition leading-snug cursor-pointer line-clamp-2 mb-2">
          {product.name}
        </h3>

        {/* Rang doirachalari */}
        {product.colors && product.colors.length > 0 && (
          <div className="pt-2 pb-1 border-t border-boou-100 flex items-center justify-between text-[11px]">
            <span className="text-boou-500 font-medium">Rang: <span className="font-bold text-boou-800">{selectedColor?.name}</span></span>
            <div className="flex items-center gap-1.5">
              {product.colors.map(c => (
                <button
                  key={c.code}
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setSelectedColor(c); }}
                  className={`w-4 h-4 rounded-full border border-boou-300 shadow-xs transition-transform ${
                    selectedColor?.code === c.code ? 'ring-2 ring-boou-600 scale-110' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={`${c.name} (${c.code})`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-3 mt-2 border-t border-boou-100 flex items-center justify-between gap-2">
        <div>
          <div className="text-[10px] text-boou-500 font-medium">Narx:</div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-extrabold text-boou-950">${displayPrice}</span>
            {displayOldPrice && <span className="text-xs text-boou-400 line-through">${displayOldPrice}</span>}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onOpenModal(product, selectedColor)}
            className="p-2 rounded-xl bg-boou-100 hover:bg-boou-200 text-boou-800 text-xs font-bold transition"
            title="Batafsil"
          >
            <i className="fas fa-eye"></i>
          </button>
          <button
            type="button"
            onClick={() => onAddToCart(product, selectedColor)}
            className="px-3 py-2 rounded-xl bg-boou-600 hover:bg-boou-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5"
          >
            <i className="fas fa-cart-plus"></i>
            <span className="hidden sm:inline">Qo'shish</span>
          </button>
        </div>
      </div>
    </div>
  );
};