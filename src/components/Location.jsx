import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Location = () => {
  const { t } = useLanguage();

  useEffect(() => {
    let mapInstance = null; 
  
    if (window.L) {
      try {
        const container = document.getElementById('map-container');
        if (container && !container._leaflet_id) {
          mapInstance = window.L.map('map-container').setView([41.237743, 69.334652], 15);
          window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap'
          }).addTo(mapInstance);
  
          const customIcon = window.L.divIcon({
            className: 'custom-map-marker',
            html: `<div style="background-color: #695344; color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); font-weight: bold;"><i class="fas fa-shower"></i></div>`,
            iconSize: [36, 36],
            iconAnchor: [18, 36]
          });
  
          window.L.marker([41.237743, 69.334652], { icon: customIcon })
            .addTo(mapInstance)
            .bindPopup("<b>BOOU Showroom — 94-do'kon</b><br>Qo'yliq santexnika qatori, 2-pavilion.<br><a href='https://maps.google.com/maps?q=41.237743,69.334652&ll=41.237743,69.334652&z=16' target='_blank' style='color:#2563eb;font-weight:bold;'>Google Maps</a>")
            .openPopup();
        }
      } catch (err) {
        console.warn('Map load:', err);
      }
    }
  
    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, []);

  return (
    <section id="manzil" className="py-16 lg:py-24 bg-boou-50/70 border-t border-boou-200/80">
      <div id="contact"></div>
      <div id="aloqa"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-boou-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
            <i className="fas fa-store"></i> {t('loc.badge')}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-boou-950 tracking-tight">
            {t('loc.title')}
          </h2>
          <p className="text-sm sm:text-base text-boou-700 mt-2">
            {t('loc.subtitle1')}<strong>{t('loc.subtitleBold')}</strong>{t('loc.subtitle2')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-boou-200 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-boou-100 text-boou-700 flex items-center justify-center shrink-0 text-xl">
                <i className="fas fa-map-marked-alt text-boou-600"></i>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-boou-500 uppercase tracking-wider">{t('loc.exactLabel')}</div>
                <h4 className="font-extrabold text-base text-boou-900 leading-snug">{t('loc.marketTitle')}</h4>
                <p className="text-xs text-boou-700 font-medium">
                  {t('loc.marketDesc1')}<span className="bg-boou-100 text-boou-800 font-bold px-2 py-0.5 rounded">{t('loc.marketBadge')}</span>{t('loc.marketDesc2')}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-boou-200 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-boou-100 text-boou-700 flex items-center justify-center shrink-0 text-xl">
                <i className="far fa-clock text-boou-600"></i>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-boou-500 uppercase tracking-wider">{t('loc.hoursLabel')}</div>
                <h4 className="font-extrabold text-base text-boou-900">{t('loc.hoursTitle')}</h4>
                <p className="text-xs text-emerald-600 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> {t('loc.hoursSub')}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-boou-200 shadow-xs space-y-3">
              <div className="text-xs font-bold text-boou-500 uppercase tracking-wider">{t('loc.contactLabel')}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold">
                <a href="tel:+998947086300" className="p-3 rounded-xl bg-boou-50 hover:bg-boou-100 text-boou-900 transition flex items-center gap-2">
                  <i className="fas fa-phone-alt text-boou-600"></i> +998 (94) 708-63-00
                </a>
              </div>
              <a href="https://t.me/boou_tashkent" target="_blank" rel="noreferrer" className="w-full py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition">
                <i className="fab fa-telegram-plane text-sm"></i> {t('loc.tgBtn')}
              </a>
            </div>

            <div className="bg-boou-900 text-white rounded-2xl p-5 shadow-sm space-y-3">
              <div className="text-xs font-bold text-brass-400 uppercase tracking-wider">{t('loc.mapCardTitle')}</div>
              <p className="text-xs text-boou-300">{t('loc.mapCardSub')}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a href="https://maps.google.com/maps?q=41.237743,69.334652&ll=41.237743,69.334652&z=16" target="_blank" rel="noreferrer" className="py-2.5 px-3 rounded-xl bg-white text-boou-900 hover:bg-boou-100 font-bold text-xs flex items-center justify-center gap-2 transition text-center shadow-xs">
                  <i className="fab fa-google text-red-500"></i> Google Maps
                </a>
                <a href="https://yandex.uz/maps/?rtext=~41.237743%2C69.334652&rtt=auto" target="_blank" rel="noreferrer" className="py-2.5 px-3 rounded-xl bg-white text-boou-900 hover:bg-boou-100 font-bold text-xs flex items-center justify-center gap-2 transition text-center shadow-xs">
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
                  <strong>{t('loc.coords')}</strong> 41.2383° N, 69.3348° E
                </div>
                <a href="https://maps.google.com/maps?q=41.237743,69.334652&ll=41.237743,69.334652&z=16" target="_blank" rel="noreferrer" className="text-boou-700 font-bold hover:underline flex items-center gap-1">
                  {t('loc.openLargerMap')} <i className="fas fa-external-link-alt text-[10px]"></i>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};