import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const LANG_OPTIONS = [
  { code: 'uz', short: "O'Z", label: "O'zbekcha" },
  { code: 'ru', short: 'RU', label: 'Русский' },
  { code: 'en', short: 'EN', label: 'English' },
];

export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = LANG_OPTIONS.find((item) => item.code === lang) || LANG_OPTIONS[0];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  const handleSelect = (code) => {
    setLang(code);
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Tilni tanlash"
        className="inline-flex items-center gap-1.5 rounded-xl border border-boou-200/90 bg-boou-50 px-2.5 sm:px-3 py-2 text-xs font-bold text-boou-800 hover:bg-boou-100 transition cursor-pointer"
      >
        <i className="fas fa-globe text-boou-600 text-sm"></i>
        <span className="hidden sm:inline">{currentLang.label}</span>
        <span className="sm:hidden">{currentLang.short}</span>
        <i className={`fas fa-chevron-down text-[10px] text-boou-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}></i>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 w-40 origin-top-right rounded-2xl border border-boou-200 bg-white p-1.5 shadow-xl z-50"
        >
          {LANG_OPTIONS.map((option) => {
            const isSelected = option.code === lang;
            return (
              <button
                key={option.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option.code)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition cursor-pointer ${
                  isSelected
                    ? 'bg-boou-700 text-white font-bold'
                    : 'text-boou-800 hover:bg-boou-100 font-medium'
                }`}
              >
                <span>{option.label}</span>
                <span
                  className={`text-[10px] uppercase tracking-wider font-bold ${
                    isSelected ? 'text-boou-200' : 'text-boou-400'
                  }`}
                >
                  {option.short}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}