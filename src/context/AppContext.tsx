import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { HistoryItem, Language, ToolId, CategoryId, ToolDef, CategoryDef, RouteInfo } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';
import {
  parseRoute,
  getToolPath,
  getCategoryPath,
  getToolsDirectoryPath,
  getStaticPagePath,
  getHomePath,
  findTool,
  findCategory,
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
} from '../utils/seoEngine';
import { formatSlugToName } from '../utils/toolMetadata';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  isDark: boolean;
  toggleTheme: () => void;
  t: (key: string, defaultText?: string) => string;
  currentView: string;
  route: RouteInfo;
  navigateTo: (target: string) => void;
  getToolUrl: (tool: ToolDef | string, targetLang?: Language) => string;
  getCategoryUrl: (category: CategoryDef | CategoryId, targetLang?: Language) => string;
  getPageUrl: (page: string, targetLang?: Language) => string;
  getHomeUrl: (targetLang?: Language) => string;
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
  // Initialize route from current window.location
  const [route, setRoute] = useState<RouteInfo>(() => {
    if (typeof window === 'undefined') {
      return { view: 'home', lang: DEFAULT_LANGUAGE, path: `/${DEFAULT_LANGUAGE}/` };
    }
    return parseRoute(window.location.pathname, window.location.hash);
  });

  const [lang, setLangState] = useState<Language>(() => {
    // 1. Language from URL path has highest authority for SEO
    if (typeof window !== 'undefined') {
      const initialRoute = parseRoute(window.location.pathname, window.location.hash);
      if (initialRoute.lang && SUPPORTED_LANGUAGES.includes(initialRoute.lang)) {
        return initialRoute.lang;
      }
    }
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('calcyfy_lang') : null;
    if (saved && SUPPORTED_LANGUAGES.includes(saved as Language)) {
      return saved as Language;
    }
    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language?.slice(0, 2);
      if (SUPPORTED_LANGUAGES.includes(browserLang as Language)) {
        return browserLang as Language;
      }
    }
    return DEFAULT_LANGUAGE;
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('calcyfy_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Calculate currentView from route for backward-compatibility with existing component logic
  const currentView = useMemo(() => {
    if (route.view === 'home') return 'home';
    if (route.view === 'tools') return 'tools';
    if (route.view === 'category') {
      return `category:${route.categoryId || route.categorySlug}`;
    }
    if (route.view === 'tool') {
      return `tool:${route.toolId || route.toolSlug}`;
    }
    if (route.view === 'not-found') return 'not-found';
    return route.staticPage || route.view;
  }, [route]);

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

  // Helper URL generators
  const getToolUrl = useCallback(
    (toolInput: ToolDef | string, targetLang?: Language): string => {
      const target = typeof toolInput === 'string' ? findTool(toolInput) : toolInput;
      const slug = target?.slug || (typeof toolInput === 'string' ? toolInput : toolInput.id);
      return getToolPath(slug, targetLang || lang);
    },
    [lang]
  );

  const getCategoryUrl = useCallback(
    (catInput: CategoryDef | CategoryId, targetLang?: Language): string => {
      const target = typeof catInput === 'string' ? findCategory(catInput) : catInput;
      const slug = target?.slug || (typeof catInput === 'string' ? catInput : catInput.id);
      return getCategoryPath(slug, targetLang || lang);
    },
    [lang]
  );

  const getPageUrl = useCallback(
    (page: string, targetLang?: Language): string => {
      return getStaticPagePath(page, targetLang || lang);
    },
    [lang]
  );

  const getHomeUrl = useCallback(
    (targetLang?: Language): string => {
      return getHomePath(targetLang || lang);
    },
    [lang]
  );

  // Core navigation function
  const navigateTo = useCallback(
    (target: string) => {
      let resolvedUrl = target;

      // Handle legacy view strings (e.g. 'home', 'tools', 'tool:mortgage', 'category:finance')
      if (target === 'home' || target === '') {
        resolvedUrl = getHomePath(lang);
      } else if (target === 'tools') {
        resolvedUrl = getToolsDirectoryPath(lang);
      } else if (target.startsWith('category:')) {
        const catId = target.replace('category:', '');
        const cat = findCategory(catId);
        resolvedUrl = getCategoryPath(cat ? cat.slug : catId, lang);
      } else if (target.startsWith('tool:')) {
        const tId = target.replace('tool:', '');
        const tObj = findTool(tId);
        resolvedUrl = getToolPath(tObj ? tObj.slug : tId, lang);
      } else if (['about', 'privacy', 'terms', 'contact', 'sitemap'].includes(target)) {
        resolvedUrl = getStaticPagePath(target, lang);
      }

      // If URL does not start with '/', normalize it with current language
      if (!resolvedUrl.startsWith('/')) {
        resolvedUrl = `/${lang}/${resolvedUrl}`;
      }

      // Push state to browser history
      if (typeof window !== 'undefined') {
        window.history.pushState(null, '', resolvedUrl);
        const newRoute = parseRoute(resolvedUrl, '');
        setRoute(newRoute);
        if (newRoute.lang && newRoute.lang !== lang) {
          setLangState(newRoute.lang);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [lang]
  );

  // Language switcher that updates URL accordingly
  const setLang = useCallback(
    (newLang: Language) => {
      if (newLang === lang) return;
      setLangState(newLang);

      // Determine corresponding URL in the new language
      let targetPath = getHomePath(newLang);

      if (route.view === 'tool' && route.toolSlug) {
        targetPath = getToolPath(route.toolSlug, newLang);
      } else if (route.view === 'category' && route.categorySlug) {
        targetPath = getCategoryPath(route.categorySlug, newLang);
      } else if (route.view === 'tools') {
        targetPath = getToolsDirectoryPath(newLang);
      } else if (route.staticPage) {
        targetPath = getStaticPagePath(route.staticPage, newLang);
      }

      if (typeof window !== 'undefined') {
        window.history.pushState(null, '', targetPath);
        const updatedRoute = parseRoute(targetPath, '');
        setRoute(updatedRoute);
      }
    },
    [lang, route]
  );

  // Handle browser back/forward and initial URL / legacy hash normalization
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseRoute(window.location.pathname, window.location.hash);
      setRoute(parsed);
      if (parsed.lang && parsed.lang !== lang) {
        setLangState(parsed.lang);
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Initial check: if there is a hash (e.g. #tool:mortgage), seamlessly replace with clean URL
    if (window.location.hash && window.location.hash.length > 1) {
      const legacyRoute = parseRoute(window.location.pathname, window.location.hash);
      if (legacyRoute.view !== 'not-found') {
        let cleanPath = getHomePath(lang);
        if (legacyRoute.view === 'tool' && legacyRoute.toolSlug) {
          cleanPath = getToolPath(legacyRoute.toolSlug, lang);
        } else if (legacyRoute.view === 'category' && legacyRoute.categorySlug) {
          cleanPath = getCategoryPath(legacyRoute.categorySlug, lang);
        } else if (legacyRoute.view === 'tools') {
          cleanPath = getToolsDirectoryPath(lang);
        } else if (legacyRoute.staticPage) {
          cleanPath = getStaticPagePath(legacyRoute.staticPage, lang);
        }

        window.history.replaceState(null, '', cleanPath);
        setRoute(parseRoute(cleanPath, ''));
      }
    } else if (window.location.pathname === '/' || window.location.pathname === '') {
      // Normalize root '/' to current language home '/en/' or '/ar/'
      const cleanPath = getHomePath(lang);
      window.history.replaceState(null, '', cleanPath);
      setRoute(parseRoute(cleanPath, ''));
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, [lang]);

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

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const t = useCallback(
    (key: string, defaultText?: string): string => {
      if (!key) return defaultText || '';
      const normalizedKey = key.replace(/-/g, '_');
      const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;

      // Check in current language
      if (dict[key]) return dict[key];
      if (dict[normalizedKey]) return dict[normalizedKey];

      // Fallback to English
      if (TRANSLATIONS.en[key]) return TRANSLATIONS.en[key];
      if (TRANSLATIONS.en[normalizedKey]) return TRANSLATIONS.en[normalizedKey];

      // Return defaultText if provided
      if (defaultText) return defaultText;

      // Automatic fallback for missing tool translation keys to avoid showing raw keys
      if (key.startsWith('tool_') && key.endsWith('_name')) {
        const rawSlug = key.replace(/^tool_/, '').replace(/_name$/, '').replace(/_/g, '-');
        const formatted = formatSlugToName(rawSlug);
        const clean = formatted.replace(/\s+Calculator$/i, '');
        if (lang === 'ar') return `حاسبة ${clean}`;
        if (lang === 'es') return `Calculadora de ${clean}`;
        if (lang === 'fr') return `Calculateur de ${clean}`;
        if (lang === 'de') return `${clean} Rechner`;
        return formatted;
      }
      if (key.startsWith('tool_') && key.endsWith('_desc')) {
        const rawSlug = key.replace(/^tool_/, '').replace(/_desc$/, '').replace(/_/g, '-');
        const formatted = formatSlugToName(rawSlug);
        if (lang === 'ar') return `احسب ${formatted} بسرعة ودقة عبر الإنترنت مع نتائج فورية وخطوات تفصيلية مجاناً.`;
        if (lang === 'es') return `Calcula ${formatted.toLowerCase()} de forma rápida y precisa con nuestra herramienta gratuita en línea.`;
        if (lang === 'fr') return `Calculez ${formatted.toLowerCase()} rapidement et précisément avec notre calculateur en ligne gratuit.`;
        if (lang === 'de') return `Berechnen Sie ${formatted} schnell und präzise mit unserem kostenlosen Online-Rechner.`;
        return `Calculate ${formatted.toLowerCase()} quickly and accurately with our free online calculator. Get instant results and step-by-step formulas.`;
      }
      if (key.startsWith('cat_')) {
        const rawSlug = key.replace(/^cat_/, '').replace(/_/g, '-');
        return formatSlugToName(rawSlug).replace(/ Calculator$/, '');
      }

      return key;
    },
    [lang]
  );

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

    const toolKey = tool.id.replace(/-/g, '_');
    const catKey = tool.categoryId.replace(/-/g, '_');
    const name = t(`tool_${toolKey}_name`).toLowerCase();
    const desc = t(`tool_${toolKey}_desc`).toLowerCase();
    const catName = t(`cat_${catKey}`).toLowerCase();

    if (tool.id.toLowerCase().includes(q) || tool.slug.toLowerCase().includes(q)) return true;
    if (name.includes(q) || desc.includes(q) || catName.includes(q)) return true;

    const enName = (TRANSLATIONS.en[`tool_${toolKey}_name`] || '').toLowerCase();
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
        route,
        navigateTo,
        getToolUrl,
        getCategoryUrl,
        getPageUrl,
        getHomeUrl,
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
