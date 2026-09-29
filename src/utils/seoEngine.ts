import { Language, ToolDef, CategoryDef, CategoryId, SeoMetadata, RouteInfo, HreflangLink } from '../types';
import { TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';
import { getToolName, getToolDescription, isRawTranslationKey } from './toolMetadata';

export const SITE_BASE_URL = 'https://calcyfy.dpdns.org';
export const SUPPORTED_LANGUAGES: Language[] = ['en', 'ar', 'es', 'fr', 'de'];
export const DEFAULT_LANGUAGE: Language = 'en';

export const LOCALE_MAP: Record<Language, string> = {
  en: 'en_US',
  ar: 'ar_AR',
  es: 'es_ES',
  fr: 'fr_FR',
  de: 'de_DE',
};

// URL Builders
export const getHomePath = (lang: Language): string => `/${lang}/`;
export const getToolsDirectoryPath = (lang: Language): string => `/${lang}/tools`;
export const getCategoryPath = (catSlug: string, lang: Language): string => `/${lang}/category/${catSlug}`;
export const getToolPath = (toolSlug: string, lang: Language): string => `/${lang}/${toolSlug}`;
export const getStaticPagePath = (page: string, lang: Language): string => `/${lang}/${page}`;

export const getCanonicalUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_BASE_URL}${cleanPath}`;
};

// Find tool by ID or slug
export const findTool = (identifier: string): ToolDef | undefined => {
  if (!identifier) return undefined;
  const clean = identifier.toLowerCase().trim();
  return TOOLS.find((t) => t.id.toLowerCase() === clean || t.slug.toLowerCase() === clean);
};

// Find category by ID or slug
export const findCategory = (identifier: string): CategoryDef | undefined => {
  if (!identifier) return undefined;
  const clean = identifier.toLowerCase().trim();
  return CATEGORIES.find((c) => c.id.toLowerCase() === clean || c.slug.toLowerCase() === clean);
};

// Route Parser for Real URLs & Backward-Compatibility Hash
export const parseRoute = (pathname: string, hash: string = ''): RouteInfo => {
  // 1. Backward-compatibility: Check if URL fragment exists (e.g. #tool:mortgage or #category:finance)
  if (hash && hash.length > 1) {
    const rawHash = hash.replace(/^#/, '');
    if (rawHash.startsWith('tool:')) {
      const toolId = rawHash.replace('tool:', '');
      const tool = findTool(toolId);
      if (tool) {
        return {
          view: 'tool',
          lang: DEFAULT_LANGUAGE,
          toolId: tool.id,
          toolSlug: tool.slug,
          categoryId: tool.categoryId,
          path: getToolPath(tool.slug, DEFAULT_LANGUAGE),
        };
      }
    } else if (rawHash.startsWith('category:')) {
      const catId = rawHash.replace('category:', '');
      const category = findCategory(catId);
      if (category) {
        return {
          view: 'category',
          lang: DEFAULT_LANGUAGE,
          categoryId: category.id,
          categorySlug: category.slug,
          path: getCategoryPath(category.slug, DEFAULT_LANGUAGE),
        };
      }
    } else if (rawHash === 'tools') {
      return {
        view: 'tools',
        lang: DEFAULT_LANGUAGE,
        path: getToolsDirectoryPath(DEFAULT_LANGUAGE),
      };
    } else if (['about', 'privacy', 'terms', 'contact', 'sitemap'].includes(rawHash)) {
      return {
        view: rawHash as any,
        lang: DEFAULT_LANGUAGE,
        staticPage: rawHash,
        path: getStaticPagePath(rawHash, DEFAULT_LANGUAGE),
      };
    }
  }

  // 2. Normal Pathname parsing
  // Normalize pathname, stripping trailing slashes except for root
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const segments = cleanPath.split('/').filter(Boolean);

  let lang: Language = DEFAULT_LANGUAGE;
  let remainingSegments = [...segments];

  if (segments.length > 0 && SUPPORTED_LANGUAGES.includes(segments[0] as Language)) {
    lang = segments[0] as Language;
    remainingSegments = segments.slice(1);
  }

  // Root or language root: / or /en or /ar
  if (remainingSegments.length === 0) {
    return {
      view: 'home',
      lang,
      path: getHomePath(lang),
    };
  }

  const first = remainingSegments[0];

  if (first === 'tools') {
    return {
      view: 'tools',
      lang,
      path: getToolsDirectoryPath(lang),
    };
  }

  if (first === 'category' && remainingSegments[1]) {
    const category = findCategory(remainingSegments[1]);
    if (category) {
      return {
        view: 'category',
        lang,
        categoryId: category.id,
        categorySlug: category.slug,
        path: getCategoryPath(category.slug, lang),
      };
    }
  }

  if (['about', 'privacy', 'terms', 'contact', 'sitemap'].includes(first)) {
    return {
      view: first as any,
      lang,
      staticPage: first,
      path: getStaticPagePath(first, lang),
    };
  }

  // Check if first matches any tool slug or id
  const tool = findTool(first);
  if (tool) {
    return {
      view: 'tool',
      lang,
      toolId: tool.id,
      toolSlug: tool.slug,
      categoryId: tool.categoryId,
      path: getToolPath(tool.slug, lang),
    };
  }

  // Also support 2-segment category/tool URLs like /en/finance/mortgage-calculator
  if (remainingSegments.length === 2 && remainingSegments[1]) {
    const subTool = findTool(remainingSegments[1]);
    if (subTool) {
      return {
        view: 'tool',
        lang,
        toolId: subTool.id,
        toolSlug: subTool.slug,
        categoryId: subTool.categoryId,
        path: getToolPath(subTool.slug, lang),
      };
    }
  }

  return {
    view: 'not-found',
    lang,
    path: pathname,
  };
};

// Generate reciprocal hreflang links across all 5 languages + x-default
export const getHreflangLinks = (getPathForLang: (l: Language) => string): HreflangLink[] => {
  const links: HreflangLink[] = SUPPORTED_LANGUAGES.map((l) => ({
    lang: l,
    href: getCanonicalUrl(getPathForLang(l)),
  }));

  // x-default points to the English canonical equivalent
  links.push({
    lang: 'x-default',
    href: getCanonicalUrl(getPathForLang(DEFAULT_LANGUAGE)),
  });

  return links;
};

// SEO Metadata Generator: Tools
export const generateToolSeo = (
  tool: ToolDef,
  lang: Language,
  t: (key: string, def?: string) => string
): SeoMetadata => {
  const catKey = tool.categoryId.replace(/-/g, '_');
  const toolName = getToolName(tool, lang, t);
  const toolDesc = getToolDescription(tool, lang, t);
  const catRaw = t(`cat_${catKey}`, '');
  const categoryName = catRaw && !isRawTranslationKey(catRaw) ? catRaw : 'Calculator';

  let title = `${toolName} — Calcyfy`;
  if (tool.id === 'combinatorics-ncr' || tool.slug.includes('combinations-ncr-permutations-npr')) {
    if (lang === 'en') {
      title = 'Combinations (nCr) & Permutations (nPr) Calculator | Calcyfy';
    } else if (lang === 'es') {
      title = 'Calculadora de Combinaciones (nCr) y Permutaciones (nPr) | Calcyfy';
    } else if (lang === 'de') {
      title = 'Kombinationen (nCr) und Permutationen (nPr) Rechner | Calcyfy';
    } else if (lang === 'fr') {
      title = 'Calculateur de Combinaisons (nCr) et Permutations (nPr) | Calcyfy';
    } else if (lang === 'ar') {
      title = 'حاسبة التوافيق (nCr) والتباديل (nPr) | Calcyfy';
    }
  } else if (tool.id === 'keto-macros' || tool.id === 'macronutrient-keto-highcarb' || tool.slug.includes('keto')) {
    if (lang === 'en') {
      title = 'Keto Macro Calculator — Calculate Fat, Protein & Net Carbs | Calcyfy';
    } else if (lang === 'es') {
      title = 'Calculadora de Macros Keto — Grasas, Proteínas y Carbohidratos | Calcyfy';
    } else if (lang === 'de') {
      title = 'Keto Makro Rechner — Fett, Protein & Netto-Kohlenhydrate | Calcyfy';
    } else if (lang === 'fr') {
      title = 'Calculateur de Macros Céto — Lipides, Protéines et Glucides | Calcyfy';
    } else if (lang === 'ar') {
      title = 'حاسبة ماكروز الكيتو — حساب الدهون والبروتين والكارب الصافي | Calcyfy';
    }
  }
  const canonical = getCanonicalUrl(getToolPath(tool.slug, lang));
  const hreflang = getHreflangLinks((l) => getToolPath(tool.slug, l));

  const keywords = [
    toolName,
    `${toolName} calculator`,
    `free ${toolName}`,
    `online ${toolName}`,
    categoryName,
    tool.id.replace(/-/g, ' '),
    tool.slug.replace(/-/g, ' '),
  ].join(', ');

  // Structured Data Schema
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: toolName,
    description: toolDesc,
    url: canonical,
    applicationCategory: categoryName,
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('nav_home', 'Home'),
        item: getCanonicalUrl(getHomePath(lang)),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryName,
        item: getCanonicalUrl(getCategoryPath(tool.categoryId, lang)),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: toolName,
        item: canonical,
      },
    ],
  };

  return {
    title,
    metaDescription: toolDesc,
    keywords,
    canonical,
    hreflang,
    ogTitle: title,
    ogDescription: toolDesc,
    ogUrl: canonical,
    ogType: 'website',
    ogLocale: LOCALE_MAP[lang] || 'en_US',
    twitterTitle: title,
    twitterDescription: toolDesc,
    structuredData: [webAppSchema, breadcrumbsSchema],
  };
};

// SEO Metadata Generator: Categories
export const generateCategorySeo = (
  category: CategoryDef,
  lang: Language,
  t: (key: string, def?: string) => string
): SeoMetadata => {
  const catKey = category.id.replace(/-/g, '_');
  const catCandidate = t(`cat_${catKey}`, '');
  const catName = catCandidate && !isRawTranslationKey(catCandidate)
    ? catCandidate
    : category.id.charAt(0).toUpperCase() + category.id.slice(1);
  const catDescCandidate = t(`cat_${catKey}_desc`, '');
  const catDesc = catDescCandidate && !isRawTranslationKey(catDescCandidate)
    ? catDescCandidate
    : `Explore free online ${catName} calculators and conversion tools.`;

  const title = `${catName} Calculators & Tools — Calcyfy`;
  const canonical = getCanonicalUrl(getCategoryPath(category.slug, lang));
  const hreflang = getHreflangLinks((l) => getCategoryPath(category.slug, l));

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('nav_home', 'Home'),
        item: getCanonicalUrl(getHomePath(lang)),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: catName,
        item: canonical,
      },
    ],
  };

  return {
    title,
    metaDescription: catDesc,
    keywords: `${catName}, ${catName} calculators, free ${catName} tools, online calculations`,
    canonical,
    hreflang,
    ogTitle: title,
    ogDescription: catDesc,
    ogUrl: canonical,
    ogType: 'website',
    ogLocale: LOCALE_MAP[lang] || 'en_US',
    twitterTitle: title,
    twitterDescription: catDesc,
    structuredData: [breadcrumbsSchema],
  };
};

// SEO Metadata Generator: Home
export const generateHomeSeo = (
  lang: Language,
  t: (key: string, def?: string) => string
): SeoMetadata => {
  const title = t('site_title') || 'CALCYFY — Free Everyday Calculators & Tools';
  const metaDescription =
    t('hero_description') ||
    'Free, instant, and privacy-focused online calculators and unit converters for finance, health, math, and everyday decisions.';
  const canonical = getCanonicalUrl(getHomePath(lang));
  const hreflang = getHreflangLinks((l) => getHomePath(l));

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Calcyfy',
    url: getCanonicalUrl(getHomePath(lang)),
    description: metaDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${getCanonicalUrl(getToolsDirectoryPath(lang))}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return {
    title,
    metaDescription,
    keywords: 'calculators, converters, finance calculators, health calculators, math tools, free online tools',
    canonical,
    hreflang,
    ogTitle: title,
    ogDescription: metaDescription,
    ogUrl: canonical,
    ogType: 'website',
    ogLocale: LOCALE_MAP[lang] || 'en_US',
    twitterTitle: title,
    twitterDescription: metaDescription,
    structuredData: [websiteSchema],
  };
};

// SEO Metadata Generator: Tools Directory
export const generateToolsDirectorySeo = (
  lang: Language,
  t: (key: string, def?: string) => string
): SeoMetadata => {
  const title = `${t('nav_all_tools', 'All Tools & Calculators')} — Calcyfy`;
  const metaDescription =
    t('sitemap_desc') || 'Browse the complete directory of over 525 free online calculators and converters.';
  const canonical = getCanonicalUrl(getToolsDirectoryPath(lang));
  const hreflang = getHreflangLinks((l) => getToolsDirectoryPath(l));

  return {
    title,
    metaDescription,
    keywords: 'all calculators, directory, conversion tools, complete list of calculators',
    canonical,
    hreflang,
    ogTitle: title,
    ogDescription: metaDescription,
    ogUrl: canonical,
    ogType: 'website',
    ogLocale: LOCALE_MAP[lang] || 'en_US',
    twitterTitle: title,
    twitterDescription: metaDescription,
  };
};

// SEO Metadata Generator: Static Pages
export const generateStaticPageSeo = (
  page: string,
  lang: Language,
  t: (key: string, def?: string) => string
): SeoMetadata => {
  const pageTitles: Record<string, string> = {
    about: 'About Us',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    contact: 'Contact Us',
    sitemap: 'Sitemap',
  };

  const pageName = t(`nav_${page}`, pageTitles[page] || page);
  const title = `${pageName} — Calcyfy`;
  const metaDescription = `${pageName} on Calcyfy — Free tools. Simple answers.`;
  const canonical = getCanonicalUrl(getStaticPagePath(page, lang));
  const hreflang = getHreflangLinks((l) => getStaticPagePath(page, l));

  return {
    title,
    metaDescription,
    keywords: `${pageName}, Calcyfy ${pageName}, Calcyfy`,
    canonical,
    hreflang,
    ogTitle: title,
    ogDescription: metaDescription,
    ogUrl: canonical,
    ogType: 'website',
    ogLocale: LOCALE_MAP[lang] || 'en_US',
    twitterTitle: title,
    twitterDescription: metaDescription,
  };
};

// Unified SEO Generator for any RouteInfo
export const generateSeoForRoute = (
  route: RouteInfo,
  lang: Language,
  t: (key: string, def?: string) => string
): SeoMetadata => {
  if (route.view === 'home') {
    return generateHomeSeo(lang, t);
  }
  if (route.view === 'tools') {
    return generateToolsDirectorySeo(lang, t);
  }
  if (route.view === 'category' && (route.categoryId || route.categorySlug)) {
    const category = findCategory(route.categoryId || route.categorySlug || '');
    if (category) {
      return generateCategorySeo(category, lang, t);
    }
  }
  if (route.view === 'tool' && (route.toolId || route.toolSlug)) {
    const tool = findTool(route.toolId || route.toolSlug || '');
    if (tool) {
      return generateToolSeo(tool, lang, t);
    }
  }
  if (['about', 'privacy', 'terms', 'contact', 'sitemap'].includes(route.view)) {
    return generateStaticPageSeo(route.view, lang, t);
  }

  // Fallback / 404
  const title = `Page Not Found — Calcyfy`;
  const metaDescription = 'The requested calculator or page could not be found.';
  return {
    title,
    metaDescription,
    keywords: '404, not found, calcyfy',
    canonical: getCanonicalUrl(getHomePath(lang)),
    hreflang: getHreflangLinks((l) => getHomePath(l)),
    ogTitle: title,
    ogDescription: metaDescription,
    ogUrl: getCanonicalUrl(getHomePath(lang)),
    ogType: 'website',
    ogLocale: LOCALE_MAP[lang] || 'en_US',
    twitterTitle: title,
    twitterDescription: metaDescription,
  };
};

// Apply SEO Metadata to DOM
export const applySeoToDocument = (seo: SeoMetadata): void => {
  if (typeof document === 'undefined') return;

  // 1. Title
  document.title = seo.title;

  // 2. Helper for Meta elements
  const setMeta = (attrName: 'name' | 'property', attrValue: string, content: string) => {
    let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMeta('name', 'description', seo.metaDescription);
  setMeta('name', 'keywords', seo.keywords);
  setMeta('name', 'robots', 'index, follow');

  // Open Graph
  setMeta('property', 'og:title', seo.ogTitle);
  setMeta('property', 'og:description', seo.ogDescription);
  setMeta('property', 'og:url', seo.ogUrl);
  setMeta('property', 'og:type', seo.ogType);
  setMeta('property', 'og:locale', seo.ogLocale);
  setMeta('property', 'og:site_name', 'Calcyfy');

  // Twitter
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', seo.twitterTitle);
  setMeta('name', 'twitter:description', seo.twitterDescription);

  // 3. Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', seo.canonical);

  // 4. Hreflang Alternate Links
  // Remove existing hreflang tags to prevent duplicate accummulation
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((node) => node.remove());

  seo.hreflang.forEach((link) => {
    const linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'alternate');
    linkEl.setAttribute('hreflang', link.lang);
    linkEl.setAttribute('href', link.href);
    document.head.appendChild(linkEl);
  });

  // 5. Structured Data JSON-LD
  const existingScript = document.getElementById('calcyfy-ldjson');
  if (existingScript) {
    existingScript.remove();
  }

  if (seo.structuredData && seo.structuredData.length > 0) {
    const script = document.createElement('script');
    script.id = 'calcyfy-ldjson';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(
      seo.structuredData.length === 1 ? seo.structuredData[0] : seo.structuredData
    );
    document.head.appendChild(script);
  }
};
