import React, { useState, useEffect } from "react";

export const ProductModal = ({ product, initialColor, onClose, onAddToCart, onBuyNow }) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(
    initialColor || (product.colors && product.colors.length > 0 ? product.colors[0] : null)
  );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedColor(initialColor || (product.colors && product.colors.length > 0 ? product.colors[0] : null));
      setQuantity(1);
    }
  }, [product, initialColor]);

  const isOutOfStock = selectedColor?.inStock === false || product.inStock === false;

  const displayImage = selectedColor?.image || product.image;
  const displayPrice = selectedColor?.price || product.price;
  const displayOldPrice = selectedColor?.oldPrice || product.oldPrice;
  const colorName = selectedColor?.name || "Standart";

  const handleAdd = () => {
    if (isOutOfStock) return;
    if (onAddToCart) {
      onAddToCart(product, selectedColor, quantity);
    }
    onClose();
  };

  const handleBuy = () => {
    if (isOutOfStock) return;
    if (onBuyNow) {
      onBuyNow(product, selectedColor, quantity);
    } else if (onAddToCart) {
      onAddToCart(product, selectedColor, quantity);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-boou-200 overflow-hidden max-h-[92vh] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-boou-200 flex items-center justify-between bg-boou-50">
          <span className="text-xs font-bold text-boou-600 uppercase tracking-wider flex items-center gap-1.5">
            <i className="fas fa-info-circle"></i> BOOU Mahsulot Tafsilotlari
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-boou-400 hover:text-boou-700 transition"
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        <div className="p-5 sm:p-6 md:p-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

            <div className="md:col-span-6 space-y-3">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-boou-50 border border-boou-200 shadow-inner group">
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <span className="text-3xl font-black text-white/90 drop-shadow-md tracking-wider uppercase">
                    {colorName}
                  </span>
                </div>

                <img
                  src={displayImage}
                  alt={product.name}
                  className={`w-full h-full object-cover transition duration-300 ${isOutOfStock ? 'opacity-50 grayscale' : ''}`}
                />

                {isOutOfStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
                    <span className="bg-red-600 text-white font-extrabold px-4 py-2 rounded-xl text-sm uppercase tracking-widest shadow-lg border-2 border-white transform -rotate-6">
                      Vaqtincha tugagan
                    </span>
                  </div>
                )}
              </div>

              {product.colors && product.colors.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.colors.map((c) => {
                    const isActive = selectedColor?.code === c.code;
                    const isColorOut = c.inStock === false;
                    return (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => setSelectedColor(c)}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition ${isActive
                          ? "border-boou-600 scale-95 shadow-md ring-2 ring-boou-600/30"
                          : "border-boou-200 opacity-70 hover:opacity-100 hover:border-boou-400"
                          } ${isColorOut ? 'opacity-40 grayscale' : ''}`}
                      >
                        <img
                          src={c.image}
                          alt={c.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[9px] font-bold text-white py-0.5 text-center uppercase tracking-tighter truncate px-1">
                          {c.name} {isColorOut ? '(Yo\'q)' : ''}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="md:col-span-6 space-y-4 text-xs">

              <div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-boou-500 font-semibold mb-1">
                  <span>{product.categoryName || "Oshxona smestitellari"}</span>
                  <span>•</span>
                  <span className="font-mono bg-boou-100 text-boou-700 px-1.5 py-0.5 rounded">
                    Kod: {selectedColor?.code || product.code || "BOOU-8093"}
                  </span>
                  <span>•</span>

                  {isOutOfStock ? (
                    <span className="text-red-600 font-bold flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                      <i className="fas fa-times-circle"></i> Omborda mavjud emas
                    </span>
                  ) : (
                    <span className="text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <i className="fas fa-check-circle"></i> Omborda mavjud
                    </span>
                  )}
                </div>

                <h2 className="text-xl md:text-2xl font-extrabold text-boou-950 leading-snug">
                  {product.name}
                </h2>
              </div>

              <div className="p-3.5 bg-boou-50 rounded-xl border border-boou-200/80 flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-boou-950">${displayPrice}</span>
                  {displayOldPrice && (
                    <span className="text-sm text-boou-400 line-through">${displayOldPrice}</span>
                  )}
                </div>
                <span className="text-[11px] text-brass-700 font-bold bg-brass-100 border border-brass-200 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  5 YIL KAFOLAT
                </span>
              </div>

              <p className="text-boou-600 leading-relaxed text-xs">
                {product.description ||
                  "BOOU firmasining original korobkasidagi mashhur L-simon oshxona smestiteli. 100% zanglamaydigan latun korpus, 360° erkin aylanuvchi forma, suv sachratmaydigan tejamkor aerator. 4 xil premial rangda ishlab chiqariladi."}
              </p>

              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-bold text-boou-800">
                    Rangni tanlang: <span className="text-boou-600">{colorName}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => {
                      const isActive = selectedColor?.code === c.code;
                      const isColorOut = c.inStock === false;
                      return (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => setSelectedColor(c)}
                          className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-2 transition ${isActive
                            ? "border-boou-600 bg-boou-100/80 ring-2 ring-boou-600/30 font-bold text-boou-950"
                            : "border-boou-200 bg-white hover:bg-boou-50 text-boou-800"
                            } ${isColorOut ? 'opacity-50 bg-gray-50' : ''}`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-boou-300 shadow-xs shrink-0"
                            style={{ backgroundColor: c.hex }}
                          ></span>
                          <span>{c.name}</span>
                          <span className="text-[10px] text-boou-500 font-normal">
                            (${c.price}) {isColorOut ? '• Yo\'q' : ''}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center gap-3">
                <label className="font-bold text-boou-800">Miqdor:</label>
                <div className="flex items-center border border-boou-200 rounded-xl bg-white overflow-hidden text-sm shadow-xs">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={isOutOfStock}
                    className="px-3 py-1.5 hover:bg-boou-100 font-bold text-boou-700 transition disabled:opacity-30"
                  >
                    -
                  </button>
                  <span className="px-3.5 font-bold text-boou-900">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={isOutOfStock}
                    className="px-3 py-1.5 hover:bg-boou-100 font-bold text-boou-700 transition disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-boou-200">
                <button
                  type="button"
                  disabled={isOutOfStock}
                  onClick={handleAdd}
                  className={`py-3 px-4 rounded-xl font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 ${isOutOfStock
                    ? 'bg-boou-200 text-boou-400 cursor-not-allowed border border-boou-300'
                    : 'bg-boou-600 hover:bg-boou-700 text-white'
                    }`}
                >
                  <i className="fas fa-cart-plus"></i>
                  <span>{isOutOfStock ? 'Sotuvda yo\'q' : 'Savatchaga'}</span>
                </button>
                <button
                  type="button"
                  disabled={isOutOfStock}
                  onClick={handleBuy}
                  className={`py-3 px-4 rounded-xl font-bold text-xs transition flex items-center justify-center ${isOutOfStock
                    ? 'bg-boou-300 text-boou-100 cursor-not-allowed'
                    : 'bg-boou-900 hover:bg-black text-white'
                    }`}
                >
                  <span>{isOutOfStock ? 'Sotuvda yo\'q' : 'Hozir sotib olish'}</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;