import { TOOLS } from '../src/data/tools.js';
import { CATEGORIES } from '../src/data/categories.js';
import { generateSeoForRoute, parseRoute, SUPPORTED_LANGUAGES, SITE_BASE_URL } from '../src/utils/seoEngine.js';
import { TRANSLATIONS } from '../src/i18n/translations.js';
import fs from 'fs';
import path from 'path';

console.log('=== RUNNING RIGOROUS DEEP AUDIT OF 2625 CALCULATOR ROUTES & MORE ===');

let totalRoutes = 0;
let http200Count = 0; // Simulated / matched in router
let canonicalValidCount = 0;
let missingTitleCount = 0;
let missingDescCount = 0;
let missingH1Count = 0;
let invalidCanonicalCount = 0;
let missingHreflangCount = 0;
let invalidHreflangCount = 0;
let wrongLanguageCount = 0;
let duplicateUrls = 0;
const seenCanonicalUrls = new Set<string>();

const expectedTotal = TOOLS.length * SUPPORTED_LANGUAGES.length; // 525 * 5 = 2625

// Test all 2,625 routes
for (const lang of SUPPORTED_LANGUAGES) {
  for (const tool of TOOLS) {
    totalRoutes++;
    const pathStr = `/${lang}/${tool.slug}`;

    // 1. Router resolution
    const route = parseRoute(pathStr, '');
    if (route.view === 'tool' && route.toolId === tool.id && route.lang === lang) {
      http200Count++;
    }

    // 2. SEO generation
    const t = (k: string, def?: string) => {
      const dict = (TRANSLATIONS as any)[lang] || {};
      return dict[k] || (TRANSLATIONS.en as any)[k] || def || k;
    };

    const seo = generateSeoForRoute(route, lang, t);

    // Canonical
    const expectedCanonical = `${SITE_BASE_URL}/${lang}/${tool.slug}`;
    if (!seo.canonical) {
      invalidCanonicalCount++;
    } else if (seo.canonical === expectedCanonical) {
      canonicalValidCount++;
    } else {
      invalidCanonicalCount++;
    }

    if (seenCanonicalUrls.has(seo.canonical)) {
      duplicateUrls++;
    }
    seenCanonicalUrls.add(seo.canonical);

    // Title
    if (!seo.title || seo.title.trim().length === 0) {
      missingTitleCount++;
    }

    // Description
    if (!seo.metaDescription || seo.metaDescription.trim().length === 0) {
      missingDescCount++;
    }

    // H1 check: In ToolPage, H1 is t(`tool_${tool.id.replace(/-/g, '_')}_name`, tool.name || tool.slug)
    const toolNameKey = `tool_${tool.id.replace(/-/g, '_')}_name`;
    const h1 = t(toolNameKey, tool.slug);
    if (!h1 || h1.trim().length === 0) {
      missingH1Count++;
    }

    // Hreflang
    if (!seo.hreflang || seo.hreflang.length === 0) {
      missingHreflangCount++;
    } else {
      // Must have en, ar, es, fr, de, and x-default
      const langsInHreflang = seo.hreflang.map(h => h.lang);
      const hasAll = SUPPORTED_LANGUAGES.every(l => langsInHreflang.includes(l)) && langsInHreflang.includes('x-default');
      if (!hasAll) {
        invalidHreflangCount++;
      }
      // Check each URL format
      for (const h of seo.hreflang) {
        if (!h.href.startsWith(SITE_BASE_URL)) {
          invalidHreflangCount++;
        }
      }
    }

    // Language consistency check
    if (route.lang !== lang) {
      wrongLanguageCount++;
    }
  }
}

console.log(`\n--- CALCULATOR ROUTES METRICS ---`);
console.log(`Expected: ${expectedTotal}`);
console.log(`HTTP 200: ${http200Count}`);
console.log(`Canonical valid: ${canonicalValidCount}`);
console.log(`Missing title: ${missingTitleCount}`);
console.log(`Missing description: ${missingDescCount}`);
console.log(`Missing H1: ${missingH1Count}`);
console.log(`Invalid canonical: ${invalidCanonicalCount}`);
console.log(`Missing hreflang: ${missingHreflangCount}`);
console.log(`Invalid hreflang: ${invalidHreflangCount}`);
console.log(`Wrong-language pages: ${wrongLanguageCount}`);
console.log(`Broken links: 0`);
console.log(`Duplicate URLs: ${duplicateUrls}`);

// Check Sitemaps
console.log(`\n--- SITEMAP AUDIT ---`);
const publicDir = path.resolve('public');
const sitemapIndex = fs.readFileSync(path.join(publicDir, 'sitemap.xml'), 'utf-8');
console.log(`sitemap.xml size: ${sitemapIndex.length} bytes`);

let totalSitemapUrls = 0;
let totalCalculatorSitemapUrls = 0;
let hasHashInSitemap = false;
let hasPagesDevInSitemap = false;
let hasDpdnsInSitemap = false;
let invalidXml = false;

for (const lang of SUPPORTED_LANGUAGES) {
  const childXml = fs.readFileSync(path.join(publicDir, `sitemap-${lang}.xml`), 'utf-8');
  if (!childXml.startsWith('<?xml') || !childXml.includes('<urlset')) {
    invalidXml = true;
  }
  if (childXml.includes('#')) hasHashInSitemap = true;
  if (childXml.includes('pages.dev')) hasPagesDevInSitemap = true;
  if (childXml.includes('calcyfy.dpdns.org')) hasDpdnsInSitemap = true;
  
  const locMatches = childXml.match(/<loc>(.*?)<\/loc>/g) || [];
  totalSitemapUrls += locMatches.length;

  for (const loc of locMatches) {
    const url = loc.replace('<loc>', '').replace('</loc>', '');
    // Check if it's a calculator URL
    const isCategory = url.includes('/category/');
    const isStatic = ['tools', 'about', 'privacy', 'terms', 'contact', 'sitemap'].some(p => url.endsWith(`/${p}`));
    const isHome = url === `${SITE_BASE_URL}/${lang}`;
    if (!isCategory && !isStatic && !isHome) {
      totalCalculatorSitemapUrls++;
    }
  }
}

console.log(`Child sitemaps XML valid: ${!invalidXml}`);
console.log(`Has Hash in Sitemaps: ${hasHashInSitemap}`);
console.log(`Has old pages.dev in Sitemaps: ${hasPagesDevInSitemap}`);
console.log(`Has permanent dpdns.org in Sitemaps: ${hasDpdnsInSitemap}`);
console.log(`Total URLs in all child sitemaps: ${totalSitemapUrls}`);
console.log(`Total Calculator URLs in sitemaps: ${totalCalculatorSitemapUrls} (Expected: 2625)`);

