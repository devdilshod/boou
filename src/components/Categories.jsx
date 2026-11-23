import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Categories = ({ categories, onSelectCategory }) => {
  const { t, translateCategory } = useLanguage();

  return (
    <section id="categories" className="py-16 bg-boou-100/40 border-y border-boou-200/60">
      <div id="kategoriyalar"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold text-boou-600 uppercase tracking-widest mb-1.5">
            <i className="fas fa-th-large"></i> {t('categories.eyebrow')}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-boou-950 tracking-tight">
            {t('categories.title')}
          </h2>
          <p className="text-sm text-boou-600 mt-2">
            {t('categories.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map(cat => (
            <div
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group cursor-pointer bg-white rounded-2xl p-4 border border-boou-200/80 shadow-xs hover:shadow-md hover:border-boou-400 transition-all duration-200 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-boou-50 mb-3 border border-boou-100 flex items-center justify-center p-1">
                <img
                  src={cat.img}
                  alt={translateCategory(cat.id, cat.name)}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-boou-950 group-hover:text-boou-600 transition leading-snug line-clamp-2">
                {translateCategory(cat.id, cat.name)}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};