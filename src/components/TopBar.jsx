import React from 'react';

export const TopBar = () => {
  return (
    <div className="bg-boou-900 text-boou-200 text-xs py-2 px-4 border-b border-boou-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 bg-boou-700/60 text-brass-100 px-2 py-0.5 rounded-full font-medium text-[11px]">
            <i className="fas fa-certificate text-brass-500 text-[10px]"></i> 100% Original BOOU
          </span>
          <span className="hidden md:inline text-boou-300">|</span>
          <span className="text-boou-300">Qo'yliq bozori santexnika qatori, 2-pavilion 94-do'kon</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-boou-300">
          <a href="tel:+998712004488" className="hover:text-white transition flex items-center gap-1.5">
            <i className="fas fa-phone-alt text-brass-500"></i> +998 (94) 708 63 00
          </a>
          <span className="text-boou-700">•</span>
          <a href="https://t.me/boou_tashkent" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1 text-sky-400">
            <i className="fab fa-telegram-plane"></i> @boou_tashkent
          </a>
        </div>
      </div>
    </div>
  );
};