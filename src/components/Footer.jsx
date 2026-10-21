import React from 'react';

export const Footer = ({ onSelectCategory }) => {
  return (
    <footer className="bg-boou-950 text-white border-t border-boou-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-boou-700 text-white flex items-center justify-center font-black text-xl border border-boou-600">
                B
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-tight text-white">BOOU</span>
                <span className="block text-[10px] uppercase font-bold text-boou-400 tracking-wider">Sanuzel & Santexnika</span>
              </div>
            </div>
            <p className="text-xs text-boou-400 leading-relaxed max-w-sm">
              Toshkent Qo'yliq bozoridagi rasmiy BOOU do'koni. 100% original jigarrang qadoqdagi smestitellar, dush tizimlari va sanuzel jihozlari.
            </p>
            <div className="text-xs text-boou-300 space-y-1">
              <p><i className="fas fa-map-pin text-brass-500 mr-1.5"></i> Qo'yliq bozori, Santexnika qatori, 2-pavilion 94-do'kon</p>
              <p><i className="fas fa-clock text-brass-500 mr-1.5"></i> Har kuni 08:00 dan 18:00 gacha</p>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brass-400">Tezkor Havolalar</h4>
            <ul className="space-y-2 text-xs text-boou-300">
              <li><a href="#hero" className="hover:text-white transition">Bosh sahifa</a></li>
              <li><a href="#products" className="hover:text-white transition">Barcha mahsulotlar</a></li>
              <li><a href="#categories" className="hover:text-white transition">Kategoriyalar</a></li>
              <li><a href="#about" className="hover:text-white transition">BOOU haqida ma'lumot</a></li>
              <li><a href="#manzil" className="hover:text-white transition">Showroom manzili va xarita</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brass-400">Kategoriyalar</h4>
            <ul className="space-y-2 text-xs text-boou-300">
              <li><a href="#products" onClick={() => onSelectCategory('oshxona-smestitel')} className="hover:text-white transition">Oshxona smestitellari</a></li>
              <li><a href="#products" onClick={() => onSelectCategory('smestitel')} className="hover:text-white transition">Vanna smestitellari</a></li>
              <li><a href="#products" onClick={() => onSelectCategory('dush-smestitel')} className="hover:text-white transition">Dush smestitellari</a></li>
              <li><a href="#products" onClick={() => onSelectCategory('unitaz')} className="hover:text-white transition">Unitazlar</a></li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brass-400">Bog'lanish va Ijtimoiy Tarmoqlar</h4>
            <div className="space-y-2 text-xs text-boou-300">
              <a href="tel:+998947086300 " className="block hover:text-white transition">
                <i className="fas fa-phone text-brass-500 mr-2"></i> +998 (94)708 63 00 
              </a>
              <a href="tel:+998337086310" className="block hover:text-white transition">
                <i className="fas fa-mobile-alt text-brass-500 mr-2"></i> +998 (33) 708 63 10
              </a>
              <a href="https://t.me/boou_tashkent" target="_blank" rel="noreferrer" className="block hover:text-white transition text-sky-400">
                <i className="fab fa-telegram-plane mr-2"></i> Telegram: @boou_tashkent
              </a>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://t.me/boou_tashkent" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-boou-800 text-sky-400 hover:bg-sky-500 hover:text-white flex items-center justify-center transition">
                <i className="fab fa-telegram-plane text-sm"></i>
              </a>
              <a href="https://share.google/HQG5eaiUtO40VbYxe" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-boou-800 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition">
                <i className="fas fa-map-marker-alt text-sm"></i>
              </a>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-boou-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-boou-500">
          <p>© 2026 BOOU Original Sanuzel Showroom. Barcha huquqlar himoyalangan.</p>
          <a href="#hero" className="hover:text-boou-300">Bosh sahifaga qaytish &uarr;</a>
        </div>
      </div>
    </footer>
  );
};