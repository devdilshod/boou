import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '../data/translations';

const SUPPORTED_LANGS = ['uz', 'ru', 'en'];
const STORAGE_KEY = 'boou_lang';

const LanguageContext = createContext({
  lang: 'uz',
  setLang: () => {},
  t: (key) => key,
  translateColor: (color) => color,
  translateCategory: (id, fallback) => fallback,
  translateProductName: (product) => product?.name || '',
  translateProductDesc: (product) => product?.description || '',
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED_LANGS.includes(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'uz';
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = (nextLang) => {
    if (SUPPORTED_LANGS.includes(nextLang)) {
      setLangState(nextLang);
    }
  };

  const t = (key, fallback) => {
    const dict = translations[lang] || translations.uz;
    return dict[key] ?? translations.uz[key] ?? fallback ?? key;
  };

  const translateColor = (colorName) => {
    if (!colorName) return '';
    if (lang === 'uz') return colorName;
    const map = translations[lang]?.colorsMap || {};
    return map[colorName] || colorName;
  };

  const translateCategory = (catId, fallbackName) => {
    if (!catId) return fallbackName || '';
    if (lang === 'uz') return fallbackName || t(`cat.${catId}`, fallbackName);
    return t(`cat.${catId}`, fallbackName);
  };

  const translateProductName = (product) => {
    if (!product) return '';
    if (lang === 'uz') return product.name;
    if (product[`name_${lang}`]) return product[`name_${lang}`];

    let name = product.name || '';
    const replacements = translations[lang]?.nameReplacements || [];
    for (const [uzPart, translatedPart] of replacements) {
      if (name.includes(uzPart)) {
        name = name.replace(uzPart, translatedPart);
      }
    }
    return name;
  };

  const translateProductDesc = (product) => {
    if (!product) return '';
    if (lang === 'uz') return product.description || '';
    if (product[`description_${lang}`]) return product[`description_${lang}`];
    return t(`desc.${product.id}`, product.description || '');
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t,
        translateColor,
        translateCategory,
        translateProductName,
        translateProductDesc,
        supportedLangs: SUPPORTED_LANGS,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}