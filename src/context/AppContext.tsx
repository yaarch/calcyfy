import React, { createContext, useContext, useEffect, useState } from 'react';
import { HistoryItem, Language, ToolId, CategoryId } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  isDark: boolean;
  toggleTheme: () => void;
  t: (key: string, defaultText?: string) => string;
  currentView: string;
  navigateTo: (view: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: typeof TOOLS;
  history: HistoryItem[];
  addHistory: (toolId: ToolId, summary: string, result: string) => void;
  clearHistory: () => void;
  favorites: ToolId[];
  toggleFavorite: (toolId: ToolId) => void;
  isFavorite: (toolId: ToolId) => boolean;
  isRTL: boolean;
  selectedCategory: CategoryId | null;
  setSelectedCategory: (cat: CategoryId | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('calcyfy_lang');
    if (saved && ['en', 'ar', 'es', 'fr', 'de'].includes(saved)) {
      return saved as Language;
    }
    // Auto-detect Arabic or fallback to en
    const browserLang = navigator.language?.slice(0, 2);
    if (['ar', 'es', 'fr', 'de'].includes(browserLang)) {
      return browserLang as Language;
    }
    return 'en';
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('calcyfy_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [currentView, setCurrentViewState] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('calcyfy_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<ToolId[]>(() => {
    try {
      const saved = localStorage.getItem('calcyfy_favorites');
      return saved ? JSON.parse(saved) : ['percentage', 'bmi', 'loan', 'currency'];
    } catch {
      return ['percentage', 'bmi', 'loan', 'currency'];
    }
  });

  const toggleFavorite = (toolId: ToolId) => {
    setFavorites((prev) => {
      const exists = prev.includes(toolId);
      const updated = exists ? prev.filter((id) => id !== toolId) : [...prev, toolId];
      try {
        localStorage.setItem('calcyfy_favorites', JSON.stringify(updated));
      } catch {
        // Storage error
      }
      return updated;
    });
  };

  const isFavorite = (toolId: ToolId) => favorites.includes(toolId);

  const isRTL = lang === 'ar';

  // Apply language, RTL direction and document metadata
  useEffect(() => {
    localStorage.setItem('calcyfy_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    if (isRTL) {
      document.body.classList.add('font-arabic');
    } else {
      document.body.classList.remove('font-arabic');
    }
  }, [lang, isRTL]);

  // Apply dark mode class
  useEffect(() => {
    localStorage.setItem('calcyfy_theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [isDark]);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentViewState(hash || 'home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: string) => {
    window.location.hash = view === 'home' ? '' : view;
    setCurrentViewState(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const t = (key: string, defaultText?: string): string => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    if (dict[key]) return dict[key];
    if (TRANSLATIONS.en[key]) return TRANSLATIONS.en[key];
    return defaultText || key;
  };

  const addHistory = (toolId: ToolId, summary: string, result: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      toolId,
      timestamp: Date.now(),
      summary,
      result,
    };
    const updated = [newItem, ...history.slice(0, 19)];
    setHistory(updated);
    try {
      localStorage.setItem('calcyfy_history', JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('calcyfy_history');
  };

  // Multilingual Search Engine
  const searchResults = TOOLS.filter((tool) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();

    // Search across tool name and description in current language
    const name = t(`tool_${tool.id.replace('-', '_')}_name`).toLowerCase();
    const desc = t(`tool_${tool.id.replace('-', '_')}_desc`).toLowerCase();
    const catName = t(`cat_${tool.categoryId.replace('-', '_')}`).toLowerCase();

    // Check slug and id
    if (tool.id.toLowerCase().includes(q) || tool.slug.toLowerCase().includes(q)) return true;
    if (name.includes(q) || desc.includes(q) || catName.includes(q)) return true;

    // Check english fallbacks for international keyword matches
    const enName = (TRANSLATIONS.en[`tool_${tool.id.replace('-', '_')}_name`] || '').toLowerCase();
    if (enName.includes(q)) return true;

    return false;
  });

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        isDark,
        toggleTheme,
        t,
        currentView,
        navigateTo,
        searchQuery,
        setSearchQuery,
        searchResults,
        history,
        addHistory,
        clearHistory,
        favorites,
        toggleFavorite,
        isFavorite,
        isRTL,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
