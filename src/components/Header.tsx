import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import { AppLink } from './common/AppLink';
import {
  Calculator,
  Search,
  Moon,
  Sun,
  Globe,
  Menu,
  X,
  History,
} from 'lucide-react';

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

export const Header: React.FC<{ onOpenHistory?: () => void }> = ({ onOpenHistory }) => {
  const {
    lang,
    setLang,
    isDark,
    toggleTheme,
    t,
    getHomeUrl,
    getPageUrl,
    getToolUrl,
    getCategoryUrl,
    route,
    searchQuery,
    setSearchQuery,
    isRTL,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getLanguageUrl = (targetLang: Language): string => {
    if (route.view === 'tool' && route.toolSlug) {
      return getToolUrl(route.toolSlug, targetLang);
    }
    if (route.view === 'category' && route.categorySlug) {
      return getCategoryUrl(route.categorySlug, targetLang);
    }
    if (route.view === 'tools') {
      return `/${targetLang}/tools`;
    }
    if (route.staticPage) {
      return getPageUrl(route.staticPage, targetLang);
    }
    return getHomeUrl(targetLang);
  };

  const handleLanguageSelect = (code: Language) => {
    setLang(code);
    setLangDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <AppLink
              id="header-logo-btn"
              href={getHomeUrl()}
              className="flex items-center gap-2.5 text-left group focus:outline-hidden"
              title="Calcyfy Home"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white font-sans flex items-center gap-1">
                  CALCYFY
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                </span>
                <span className="hidden sm:block text-[10px] font-semibold text-slate-400 dark:text-slate-500 -mt-1 tracking-wider uppercase">
                  {t('brand_tagline', 'Free tools. Simple answers.')}
                </span>
              </div>
            </AppLink>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                id="header-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search_placeholder', 'Search 500+ calculators, converters...')}
                className="w-full ps-10 pe-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 end-0 pe-3 flex items-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 min-w-[36px] justify-center cursor-pointer"
                  aria-label={t('btn_clear', 'Clear search query')}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-2">
            <AppLink
              id="header-nav-all-tools"
              href={`/${lang}/tools`}
              className="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {t('nav_all_tools', 'All Tools')}
            </AppLink>

            <AppLink
              id="header-nav-about"
              href={getPageUrl('about')}
              className="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {t('nav_about', 'About')}
            </AppLink>
          </nav>

          {/* Utilities: History, Theme, Language */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Calculation History Button */}
            {onOpenHistory && (
              <button
                id="header-history-btn"
                onClick={onOpenHistory}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
                title={t('nav_history', 'Calculation History')}
                aria-label="View history"
              >
                <History className="w-5 h-5" />
              </button>
            )}

            {/* Dark Mode Toggle */}
            <button
              id="header-theme-toggle"
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                id="header-lang-btn"
                onClick={() => setLangDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800"
                aria-expanded={langDropdownOpen}
                aria-label="Change language"
              >
                <Globe className="w-4 h-4 text-emerald-600" />
                <span className="uppercase">{lang}</span>
              </button>

              {langDropdownOpen && (
                <div
                  className={`absolute mt-2 w-44 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 ${
                    isRTL ? 'left-0' : 'right-0'
                  }`}
                >
                  {LANGUAGES.map((item) => (
                    <AppLink
                      key={item.code}
                      href={getLanguageUrl(item.code)}
                      hrefLang={item.code}
                      onClick={() => handleLanguageSelect(item.code)}
                      className={`w-full flex items-center justify-between px-4 py-2 text-xs font-semibold transition-colors ${
                        lang === item.code
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{item.flag}</span>
                        <span>{item.label}</span>
                      </span>
                      {lang === item.code && <span className="text-emerald-500 font-bold">✓</span>}
                    </AppLink>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              id="header-mobile-menu-btn"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search & Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 py-4 space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search_placeholder', 'Search calculators...')}
                className="w-full ps-9 pe-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <nav className="flex flex-col space-y-1">
              <AppLink
                href={getHomeUrl()}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                {t('nav_home', 'Home')}
              </AppLink>
              <AppLink
                href={`/${lang}/tools`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                {t('nav_all_tools', 'All Tools')}
              </AppLink>
              <AppLink
                href={getPageUrl('about')}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                {t('nav_about', 'About')}
              </AppLink>
              <AppLink
                href={getPageUrl('contact')}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                {t('nav_contact', 'Contact')}
              </AppLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
