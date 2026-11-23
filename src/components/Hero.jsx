import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

const HERO_SLIDES = [
  {
    image: "/images/main-img/hero-1.jpg",
    key: "slide1",
    category: "all"
  },
  {
    image: "/images/main-img/hero-2.jpg",
    key: "slide2",
    category: "dush-smestitel"
  },
  {
    image: "/images/main-img/hero-3.jpg",
    key: "slide3",
    category: "oshxona-smestitel"
  },
  {
    image: "/images/main-img/hero-4.jpg",
    key: "slide4",
    category: "smestitel"
  }
];

export const Hero = ({ onSelectCategory }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const startXRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleSwipeEnd = (endX) => {
    if (startXRef.current === null || endX === null) return;
    const diff = startXRef.current - endX;

    if (diff > 40) {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    } else if (diff < -40) {
      setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    }

    startXRef.current = null;
  };

  const active = HERO_SLIDES[currentSlide];

  return (
    <section id="hero" className="relative overflow-hidden pt-6 pb-16 lg:py-20 bg-gradient-to-b from-boou-100/50 via-boou-50 to-white border-b border-boou-200/60">
      <div id="home"></div>
      <div id="bosh-sahifa"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-boou-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brass-400 animate-pulse"></span>
              {t('hero.showroomBadge')}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-boou-950 tracking-tight leading-[1.15]">
              {t('hero.title1')}<span className="text-boou-600 relative">{t('hero.titleHighlight')}<span className="absolute left-0 bottom-1 w-full h-2 bg-brass-500/20 -z-10 rounded"></span></span>{t('hero.title2')}
            </h1>

            <p className="text-base sm:text-lg text-boou-700 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {t('hero.subtitle1')}<strong className="text-boou-900 font-bold">BOOU</strong>{t('hero.subtitle2')}
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="bg-white/80 border border-boou-200/80 rounded-xl p-3 shadow-xs">
                <i className="fas fa-gem text-boou-600 text-base mb-1"></i>
                <div className="text-xs font-bold text-boou-900">{t('hero.feat1Title')}</div>
                <div className="text-[10px] text-boou-500">{t('hero.feat1Sub')}</div>
              </div>
              <div className="bg-white/80 border border-boou-200/80 rounded-xl p-3 shadow-xs">
                <i className="fas fa-palette text-brass-600 text-base mb-1"></i>
                <div className="text-xs font-bold text-boou-900">{t('hero.feat2Title')}</div>
                <div className="text-[10px] text-boou-500">{t('hero.feat2Sub')}</div>
              </div>
              <div className="bg-white/80 border border-boou-200/80 rounded-xl p-3 shadow-xs">
                <i className="fas fa-shield-halved text-emerald-600 text-base mb-1"></i>
                <div className="text-xs font-bold text-boou-900">{t('hero.feat3Title')}</div>
                <div className="text-[10px] text-boou-500">{t('hero.feat3Sub')}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a href="#products" className="px-6 py-3.5 rounded-xl bg-boou-600 hover:bg-boou-700 text-white font-bold text-sm shadow-md transition flex items-center gap-2">
                <span>{t('hero.ctaProducts')}</span>
                <i className="fas fa-arrow-down text-xs"></i>
              </a>
              <a href="#manzil" className="px-6 py-3.5 rounded-xl bg-white hover:bg-boou-100 text-boou-800 border border-boou-300 font-bold text-sm shadow-xs transition flex items-center gap-2">
                <i className="fas fa-map-marker-alt text-boou-600"></i>
                <span>{t('hero.ctaLocation')}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div
                onTouchStart={(e) => { startXRef.current = e.touches[0].clientX; }}
                onTouchEnd={(e) => handleSwipeEnd(e.changedTouches[0].clientX)}
                onMouseDown={(e) => { startXRef.current = e.clientX; }}
                onMouseUp={(e) => handleSwipeEnd(e.clientX)}
                className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group select-none touch-pan-y cursor-grab active:cursor-grabbing"
              >
                <div className="relative w-full h-[360px] sm:h-[420px]">
                  {HERO_SLIDES.map((slide, idx) => (
                    <img
                      key={slide.image}
                      src={slide.image}
                      alt={t(`hero.${slide.key}.title`)}
                      draggable="false"
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                        idx === currentSlide
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-105 pointer-events-none'
                      }`}
                    />
                  ))}
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-1.5 z-20 bg-black/30 px-2.5 py-1.5 rounded-full backdrop-blur-xs">
                  {HERO_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Slayd ${idx + 1}`}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentSlide ? 'w-5 bg-brass-400' : 'w-2 bg-white/60 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-boou-950/85 via-transparent to-transparent flex flex-col justify-end p-6 text-white z-10 pointer-events-none">
                  <span className="inline-block bg-brass-500 text-boou-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded w-max mb-1.5">
                    {t(`hero.${active.key}.badge`)}
                  </span>
                  <h3 className="text-xl font-bold leading-tight">{t(`hero.${active.key}.title`)}</h3>
                  <p className="text-xs text-boou-200 mt-1">{t(`hero.${active.key}.subtitle`)}</p>
                  <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-white/20">
                    <span className="font-bold text-brass-400">{t(`hero.${active.key}.footer`)}</span>
                    <span className="text-[11px] text-white/70">{currentSlide + 1} / {HERO_SLIDES.length}</span>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-7 -right-2 sm:-bottom-5 sm:-right-5 bg-white rounded-2xl p-4 shadow-xl border border-boou-200/80 flex items-center gap-3.5 max-w-[180px] m:max-w-[240px] z-20">
                <div className="w-10 h-10 rounded-xl bg-boou-100 text-boou-700 flex items-center justify-center text-lg font-bold">
                  <i className="fas fa-box-open"></i>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider font-extrabold text-boou-500">{t('hero.boxTitle')}</div>
                  <div className="text-xs font-bold text-boou-900">{t('hero.boxSub')}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};