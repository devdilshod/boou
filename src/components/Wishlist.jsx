
import React from 'react';
import { ProductCard } from './ProductCard.jsx';

export const Wishlist = ({
  products,
  wishlist,
  onToggleLike,
  onAddToCart,
  onOpenModal,
  onBack
}) => {
  const likedProducts = products.filter(product =>
    wishlist.includes(product.id)
  );

  return (
    <section className="min-h-[60vh] bg-boou-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <button
          type="button"
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-boou-700 hover:text-boou-900 font-semibold"
        >
          <i className="fas fa-arrow-left"></i>
          Bosh sahifaga qaytish
        </button>

        <div className="flex items-center gap-3 mb-8">
          <i className="fas fa-heart text-red-500 text-2xl"></i>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-boou-950">
              Sevimlilar
            </h1>

            <p className="text-sm text-boou-500 mt-1">
              {likedProducts.length} ta mahsulot
            </p>
          </div>
        </div>

        {likedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-boou-200 p-10 text-center">
            <i className="far fa-heart text-5xl text-boou-300"></i>

            <h2 className="text-xl font-bold text-boou-900 mt-4">
              Sevimlilar hozircha bo‘sh
            </h2>

            <p className="text-boou-500 mt-2 mb-6">
              Yoqtirgan mahsulotlaringizni yurak tugmasi orqali saqlang.
            </p>

            <button
              type="button"
              onClick={onBack}
              className="px-5 py-3 rounded-xl bg-boou-600 hover:bg-boou-700 text-white font-bold"
            >
              Mahsulotlarni ko‘rish
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {likedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isLiked={true}
                onToggleLike={onToggleLike}
                onAddToCart={onAddToCart}
                onOpenModal={onOpenModal}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
