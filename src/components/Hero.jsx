import React from 'react';

export const Hero = ({ onSelectCategory }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-6 pb-16 lg:py-20 bg-gradient-to-b from-boou-100/50 via-boou-50 to-white border-b border-boou-200/60">
      <div id="home"></div>
      <div id="bosh-sahifa"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-boou-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brass-400 animate-pulse"></span>
              BOOU RASMIY SHOWROOMI • QO'YLIQ 94-DO'KON
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-boou-950 tracking-tight leading-[1.15]">
              Sanuzel uchun sifatli va <span className="text-boou-600 relative">zamonaviy<span className="absolute left-0 bottom-1 w-full h-2 bg-brass-500/20 -z-10 rounded"></span></span> jihozlar
            </h1>

            <p className="text-base sm:text-lg text-boou-700 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Vanna xonangiz va oshxonangiz uchun original <strong className="text-boou-900 font-bold">BOOU</strong> smestitellari, umivalnik, oyna, dush tizimlari va barcha santexnika mahsulotlari. Original jigarrang qadoq va 5 yillik sifat kafolati.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="bg-white/80 border border-boou-200/80 rounded-xl p-3 shadow-xs">
                <i className="fas fa-gem text-boou-600 text-base mb-1"></i>
                <div className="text-xs font-bold text-boou-900">100% Latun</div>
                <div className="text-[10px] text-boou-500">Zanglamas mustahkam</div>
              </div>
              <div className="bg-white/80 border border-boou-200/80 rounded-xl p-3 shadow-xs">
                <i className="fas fa-palette text-brass-600 text-base mb-1"></i>
                <div className="text-xs font-bold text-boou-900">3-4 xil rang</div>
                <div className="text-[10px] text-boou-500">Qora, Grafit, Xrom, Oltin</div>
              </div>
              <div className="bg-white/80 border border-boou-200/80 rounded-xl p-3 shadow-xs">
                <i className="fas fa-shield-halved text-emerald-600 text-base mb-1"></i>
                <div className="text-xs font-bold text-boou-900">5 yil kafolat</div>
                <div className="text-[10px] text-boou-500">Zavod sifat nazorati</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a href="#products" className="px-6 py-3.5 rounded-xl bg-boou-600 hover:bg-boou-700 text-white font-bold text-sm shadow-md transition flex items-center gap-2">
                <span>Mahsulotlarni ko'rish</span>
                <i className="fas fa-arrow-down text-xs"></i>
              </a>
              <a href="#manzil" className="px-6 py-3.5 rounded-xl bg-white hover:bg-boou-100 text-boou-800 border border-boou-300 font-bold text-sm shadow-xs transition flex items-center gap-2">
                <i className="fas fa-map-marker-alt text-boou-600"></i>
                <span>Showroom manzili</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                <img src="/images/oshxona/B8093NG.jpg" alt="BOOU Oshxona Smestitellari" className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-boou-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="inline-block bg-brass-500 text-boou-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded w-max mb-1.5">Yangi kolleksiya</span>
                  <h3 className="text-xl font-bold leading-tight">BOOU Oshxona Smestitellari</h3>
                  <p className="text-xs text-boou-200 mt-1">4 xil premial rangda: Mat Qora, Grafit, Xrom, Brushed Gold</p>
                  <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-white/20">
                    <span className="font-bold text-brass-400">$26 dan boshlab</span>
                    <button onClick={() => onSelectCategory('oshxona-smestitel')} className="underline hover:text-brass-300">Modellarni ko'rish &rarr;</button>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-white rounded-2xl p-4 shadow-xl border border-boou-200/80 flex items-center gap-3.5 max-w-[240px]">
                <div className="w-10 h-10 rounded-xl bg-boou-100 text-boou-700 flex items-center justify-center text-lg font-bold">
                  <i className="fas fa-box-open"></i>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider font-extrabold text-boou-500">BOOU QADOG'I</div>
                  <div className="text-xs font-bold text-boou-900">Original Jigarrang Korobkada</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};