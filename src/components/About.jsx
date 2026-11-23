import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const About = () => {
  const { t } = useLanguage();

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
                  <i className="fas fa-award"></i> {t('about.badge')}
                </div>
                <h3 className="text-xl font-bold">{t('about.boxTitle')}</h3>
                <p className="text-xs text-boou-200 mt-1">{t('about.boxSub')}</p>
              </div>
            </div>

            <div className="bg-boou-50 border border-boou-200 rounded-2xl p-4 flex items-center justify-between text-xs text-boou-800">
              <div className="flex items-center gap-2 font-semibold">
                <i className="fas fa-check-circle text-emerald-600 text-sm"></i> {t('about.check1')}
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <i className="fas fa-check-circle text-emerald-600 text-sm"></i> {t('about.check2')}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-boou-600 uppercase tracking-widest flex items-center gap-2">
                <i className="fas fa-shield-alt"></i> {t('about.eyebrow')}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-boou-950 tracking-tight leading-tight">
                {t('about.title')}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-boou-700 leading-relaxed">
              {t('about.p1_1')}<strong className="text-boou-900 font-bold">{t('about.p1_bold')}</strong>{t('about.p1_2')}
            </p>

            <p className="text-sm sm:text-base text-boou-700 leading-relaxed">
              {t('about.p2_1')}<span className="font-bold text-boou-900">{t('about.p2_brass')}</span>{t('about.p2_2')}<span className="font-bold text-boou-600">{t('about.p2_box')}</span>{t('about.p2_3')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-boou-50 border border-boou-200/80 space-y-1">
                <div className="w-9 h-9 rounded-xl bg-boou-600 text-white flex items-center justify-center font-bold text-sm mb-2 shadow-xs">
                  <i className="fas fa-check-double"></i>
                </div>
                <h4 className="font-bold text-sm text-boou-900">{t('about.card1Title')}</h4>
                <p className="text-xs text-boou-600">{t('about.card1Sub')}</p>
              </div>

              <div className="p-4 rounded-2xl bg-boou-50 border border-boou-200/80 space-y-1">
                <div className="w-9 h-9 rounded-xl bg-brass-600 text-white flex items-center justify-center font-bold text-sm mb-2 shadow-xs">
                  <i className="fas fa-tag"></i>
                </div>
                <h4 className="font-bold text-sm text-boou-900">{t('about.card2Title')}</h4>
                <p className="text-xs text-boou-600">{t('about.card2Sub')}</p>
              </div>

              <div className="p-4 rounded-2xl bg-boou-50 border border-boou-200/80 space-y-1">
                <div className="w-9 h-9 rounded-xl bg-boou-800 text-white flex items-center justify-center font-bold text-sm mb-2 shadow-xs">
                  <i className="fas fa-cubes"></i>
                </div>
                <h4 className="font-bold text-sm text-boou-900">{t('about.card3Title')}</h4>
                <p className="text-xs text-boou-600">{t('about.card3Sub')}</p>
              </div>

              <div className="p-4 rounded-2xl bg-boou-50 border border-boou-200/80 space-y-1">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm mb-2 shadow-xs">
                  <i className="fas fa-shipping-fast"></i>
                </div>
                <h4 className="font-bold text-sm text-boou-900">{t('about.card4Title')}</h4>
                <p className="text-xs text-boou-600">{t('about.card4Sub')}</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};