import React, { useEffect } from 'react';

export const Location = () => {
  useEffect(() => {
    if (window.L) {
      try {
        const container = document.getElementById('map-container');
        if (container && !container._leaflet_id) {
          const map = window.L.map('map-container').setView([41.237743, 69.334652], 15);
          window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap'
          }).addTo(map);

          const customIcon = window.L.divIcon({
            className: 'custom-map-marker',
            html: `<div style="background-color: #695344; color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); font-weight: bold;"><i class="fas fa-shower"></i></div>`,
            iconSize: [36, 36],
            iconAnchor: [18, 36]
          });

          window.L.marker([41.237743, 69.334652], { icon: customIcon })
            .addTo(map)
            .bindPopup("<b>BOOU Showroom — 94-do'kon</b><br>Qo'yliq santexnika qatori, 2-pavilion.<br><a href='https://maps.google.com/maps?q=41.237743,69.334652&ll=41.237743,69.334652&z=16' target='_blank' style='color:#2563eb;font-weight:bold;'>Google Maps'da ochish</a>")
            .openPopup();
        }
      } catch (err) {
        console.warn('Map load:', err);
      }
    }
  }, []);

  return (
    <section id="manzil" className="py-16 lg:py-24 bg-boou-50/70 border-t border-boou-200/80">
      <div id="contact"></div>
      <div id="aloqa"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-boou-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
            <i className="fas fa-store"></i> BIZNING DO'KONIMIZ
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-boou-950 tracking-tight">
            Showroomimiz Manzili va Bog'lanish
          </h2>
          <p className="text-sm sm:text-base text-boou-700 mt-2">
            Do'konimiz Qo'yliq bozoridagi santexnika qatorida <strong>2-pavilion 94-do'kon</strong>. Bu yerda BOOU firmasining original jigarrang qadoqdagi barcha smestitellari, dush tizimlari, unitaz va boshqa sanuzelingiz uchun kerakli jihozlarini jonli ko'rishingiz mumkin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-boou-200 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-boou-100 text-boou-700 flex items-center justify-center shrink-0 text-xl">
                <i className="fas fa-map-marked-alt text-boou-600"></i>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-boou-500 uppercase tracking-wider">Aniq Manzil</div>
                <h4 className="font-extrabold text-base text-boou-900 leading-snug">Qo'yliq qurilish materiallari bozori</h4>
                <p className="text-xs text-boou-700 font-medium">
                  Santexnika qatori, <span className="bg-boou-100 text-boou-800 font-bold px-2 py-0.5 rounded">2-pavilion, 94-do'kon</span>. Toshkent shahar, Bektemir tumani, THAY.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-boou-200 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-boou-100 text-boou-700 flex items-center justify-center shrink-0 text-xl">
                <i className="far fa-clock text-boou-600"></i>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-boou-500 uppercase tracking-wider">Ish vaqti</div>
                <h4 className="font-extrabold text-base text-boou-900">Har kuni: 09:00 – 18:00</h4>
                <p className="text-xs text-emerald-600 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Dam olish kuni faqat Dushanba kuni.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-boou-200 shadow-xs space-y-3">
              <div className="text-xs font-bold text-boou-500 uppercase tracking-wider">Telefon va Bog'lanish</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold">
                <a href="tel:+998947086300" className="p-3 rounded-xl bg-boou-50 hover:bg-boou-100 text-boou-900 transition flex items-center gap-2">
                  <i className="fas fa-phone-alt text-boou-600"></i> +998 (94) 708-63-00
                </a>
                {/* <a href="tel:+998901234567" className="p-3 rounded-xl bg-boou-50 hover:bg-boou-100 text-boou-900 transition flex items-center gap-2">
                  <i className="fas fa-mobile-alt text-boou-600"></i> +998 (90) 123-45-67
                </a> */}
              </div>
              <a href="https://t.me/boou_tashkent" target="_blank" rel="noreferrer" className="w-full py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition">
                <i className="fab fa-telegram-plane text-sm"></i> Telegram orqali yozish (@boou_tashkent)
              </a>
            </div>

            <div className="bg-boou-900 text-white rounded-2xl p-5 shadow-sm space-y-3">
              <div className="text-xs font-bold text-brass-400 uppercase tracking-wider">Xaritalar orqali yo'nalish</div>
              <p className="text-xs text-boou-300">Qo'yliq bozoridagi do'konimizga bir bosishda marshrut chizing:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a href="https://maps.google.com/maps?q=41.237743,69.334652&ll=41.237743,69.334652&z=16" target="_blank" rel="noreferrer" className="py-2.5 px-3 rounded-xl bg-white text-boou-900 hover:bg-boou-100 font-bold text-xs flex items-center justify-center gap-2 transition text-center shadow-xs">
                  <i className="fab fa-google text-red-500"></i> Google Maps
                </a>
                <a href="https://yandex.com/maps/?pt=69.3348,41.2383&z=17&l=map" target="_blank" rel="noreferrer" className="py-2.5 px-3 rounded-xl bg-white text-boou-900 hover:bg-boou-100 font-bold text-xs flex items-center justify-center gap-2 transition text-center shadow-xs">
                  <i className="fas fa-location-arrow text-amber-500"></i> Yandex Xarita
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-3 border border-boou-200 shadow-md">
              <div className="relative w-full h-[460px] rounded-2xl overflow-hidden bg-boou-100" id="map-container"></div>
              <div className="p-3 bg-white flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-boou-600">
                <div className="flex items-center gap-2 font-medium">
                  <span className="w-3 h-3 rounded-full bg-boou-600 inline-block"></span>
                  <strong>Koordinatalar:</strong> 41.2383° N, 69.3348° E (Qo'yliq 94-do'kon)
                </div>
                <a href="https://maps.google.com/maps?q=41.237743,69.334652&ll=41.237743,69.334652&z=16" target="_blank" rel="noreferrer" className="text-boou-700 font-bold hover:underline flex items-center gap-1">
                  Kattaroq xaritada ko'rish <i className="fas fa-external-link-alt text-[10px]"></i>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};