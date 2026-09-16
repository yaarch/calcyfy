import { TOOLS } from '../src/data/tools.js';
import { CATEGORIES } from '../src/data/categories.js';
import { generateSeoForRoute, parseRoute, SUPPORTED_LANGUAGES, SITE_BASE_URL } from '../src/utils/seoEngine.js';
import { TRANSLATIONS } from '../src/i18n/translations.js';

// Pick 20 representative calculators spanning 10 categories, both popular and less common
const sampleToolIds = [
  'percentage',        // math, popular
  'bmi',               // health, popular
  'mortgage',          // finance, popular
  'age',               // datetime, popular
  'unit-converter',    // converters, popular
  'concrete',          // construction, popular
  'wire-gauge',        // developer, popular
  'case-converter',    // text, popular
  'cooking-measurement', // everyday, popular
  'loan-calculator',   // finance, popular
  'gas-density-molar-mass', // converters, less common
  'flesch-kincaid',    // text, less common
  'candle-power-lumens', // everyday, less common
  'bode-plot-cutoff',  // developer, less common
  'paint-calculator',  // construction, less common
  'binary-translator', // text, less common
  'boyles-law-calc',   // converters, less common
  'bmr',               // health, popular
  'time-zone',         // datetime, popular
  'tip-calculator'     // finance, popular
];

console.log(`=== TESTING SAMPLE URLS ACROSS 5 LANGUAGES & 10 CATEGORIES ===\n`);

const t = (lang: string) => (k: string, def?: string) => {
  const dict = (TRANSLATIONS as any)[lang] || {};
  return dict[k] || (TRANSLATIONS.en as any)[k] || def || k;
};

// 1. Homepage across 5 languages
console.log('--- HOMEPAGE ---');
for (const lang of SUPPORTED_LANGUAGES) {
  const route = parseRoute(`/${lang}`, '');
  const seo = generateSeoForRoute(route, lang, t(lang));
  console.log(`[${lang.toUpperCase()}] URL: ${SITE_BASE_URL}/${lang} | Title: "${seo.title}" | Canonical: ${seo.canonical} | Hreflang count: ${seo.hreflang.length}`);
}

// 2. All Tools Directory across 5 languages
console.log('\n--- ALL TOOLS DIRECTORY ---');
for (const lang of SUPPORTED_LANGUAGES) {
  const route = parseRoute(`/${lang}/tools`, '');
  const seo = generateSeoForRoute(route, lang, t(lang));
  console.log(`[${lang.toUpperCase()}] URL: ${SITE_BASE_URL}/${lang}/tools | Title: "${seo.title}" | Canonical: ${seo.canonical}`);
}

// 3. Category Pages across 10 categories
console.log('\n--- 10 CATEGORIES ---');
for (const cat of CATEGORIES) {
  const lang = 'en';
  const route = parseRoute(`/${lang}/category/${cat.slug}`, '');
  const seo = generateSeoForRoute(route, lang, t(lang));
  console.log(`Category: ${cat.id} (${cat.slug}) | Canonical: ${seo.canonical} | Title: "${seo.title}"`);
}

// 4. Sample 20 Calculators
console.log('\n--- 20 SAMPLE CALCULATORS ---');
for (const tid of sampleToolIds) {
  const tool = TOOLS.find(t => t.id === tid || t.id.includes(tid));
  if (!tool) {
    console.log(`Tool not found: ${tid}`);
    continue;
  }
  const lang = 'en';
  const route = parseRoute(`/${lang}/${tool.slug}`, '');
  const seo = generateSeoForRoute(route, lang, t(lang));
  console.log(`Tool: ${tool.id} [${tool.categoryId}] (${tool.popular ? 'Popular' : 'Less Common'}) | URL: /${lang}/${tool.slug} | Title: "${seo.title}" | Schema: ${seo.structuredData?.[0]?.['@type'] || 'None'}`);
}

