import React from 'react';

export const About = () => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-white">
      <div id="boou-haqida"></div>
      <div id="haqida"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-boou-100 bg-boou-900 group">
              <img
                src="/images/main-img/carton.jpg"
                alt="BOOU Mahsulotlari Showroomda"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-boou-950/90 via-boou-950/30 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="flex items-center gap-2 text-brass-400 font-bold text-xs uppercase tracking-wider mb-1">
                  <i className="fas fa-award"></i> Rasmiy Kafolatlangan
                </div>
                <h3 className="text-xl font-bold">Original BOOU Jigarrang Qutisi</h3>
                <p className="text-xs text-boou-200 mt-1">Har bir tovar maxsus shtrix-kod va firmaviy muhrlangan jigarrang korobkada topshiriladi.</p>
              </div>
            </div>

            <div className="bg-boou-50 border border-boou-200 rounded-2xl p-4 flex items-center justify-between text-xs text-boou-800">
              <div className="flex items-center gap-2 font-semibold">
                <i className="fas fa-check-circle text-emerald-600 text-sm"></i> Latun (Qalin mis qotishmasi)
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <i className="fas fa-check-circle text-emerald-600 text-sm"></i> 500,000 marta sinovdan o'tgan kartrij
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-boou-600 uppercase tracking-widest flex items-center gap-2">
                <i className="fas fa-shield-alt"></i> Sifat va Ishonch
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-boou-950 tracking-tight leading-tight">
                BOOU haqida — Sizning Sanuzelingiz Uchun Mukammal Tanlov
              </h2>
            </div>

            <p className="text-sm sm:text-base text-boou-700 leading-relaxed">
              Biz Toshkent shahrining eng yirik qurilish bozorlaridan biri bo'lgan <strong className="text-boou-900 font-bold">Qo'yliq bozorida (2-pavilion 94-do'kon)</strong> BOOU savdo belgisining original santexnika mahsulotlarini ulgurji va chakana narxlarda taqdim etamiz.
            </p>

            <p className="text-sm sm:text-base text-boou-700 leading-relaxed">
              BOOU brendining ajralib turuvchi xususiyati — bu uning yuqori sifatli <span className="font-bold text-boou-900">latun (brass)</span> korpusi, ko'p qatlamli PVD elektrostatik bo'yoqlari va tan olingan <span className="font-bold text-boou-600">jigarrang qadoqlanishidir</span>. Biz har bir xaridorga 5 yillik rasmiy kafolat va professional maslahat beramiz.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-boou-50 border border-boou-200/80 space-y-1">
                <div className="w-9 h-9 rounded-xl bg-boou-600 text-white flex items-center justify-center font-bold text-sm mb-2 shadow-xs">
                  <i className="fas fa-check-double"></i>
                </div>
                <h4 className="font-bold text-sm text-boou-900">1. Sifatli mahsulotlar</h4>
                <p className="text-xs text-boou-600">Original BOOU, qalin latun metall, zanglamaydigan va uzoq yillar xizmat qiladigan mexanizmlar.</p>
              </div>

              <div className="p-4 rounded-2xl bg-boou-50 border border-boou-200/80 space-y-1">
                <div className="w-9 h-9 rounded-xl bg-brass-600 text-white flex items-center justify-center font-bold text-sm mb-2 shadow-xs">
                  <i className="fas fa-tag"></i>
                </div>
                <h4 className="font-bold text-sm text-boou-900">2. Hamyonbop narxlar</h4>
                <p className="text-xs text-boou-600">To'g'ridan-to'g'ri birinchi qo'ldan ulgurji va chakana savdo. Ortiqcha vositachilarsiz adolatli narx.</p>
              </div>

              <div className="p-4 rounded-2xl bg-boou-50 border border-boou-200/80 space-y-1">
                <div className="w-9 h-9 rounded-xl bg-boou-800 text-white flex items-center justify-center font-bold text-sm mb-2 shadow-xs">
                  <i className="fas fa-cubes"></i>
                </div>
                <h4 className="font-bold text-sm text-boou-900">3. Katta assortiment</h4>
                <p className="text-xs text-boou-600">Har bir modelda 3-4 xil rang uyg'unligi (Mat Qora, Grafit, Xrom, Brushed Gold) va tayyor to'plamlar.</p>
              </div>

              <div className="p-4 rounded-2xl bg-boou-50 border border-boou-200/80 space-y-1">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm mb-2 shadow-xs">
                  <i className="fas fa-shipping-fast"></i>
                </div>
                <h4 className="font-bold text-sm text-boou-900">4. Tez va qulay xizmat</h4>
                <p className="text-xs text-boou-600">Toshkent bo'ylab tez yetkazib berish, jonli ko'rish imkoniyati va Telegram orqali operativ xizmat.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};