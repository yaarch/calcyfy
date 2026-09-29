import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TOOLS } from '../src/data/tools.js';
import { CATEGORIES } from '../src/data/categories.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Allow configuring via environment variable during build, or default
const BASE_URL = process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://calyfy.dpdns.org';
const LANGUAGES = ['en', 'ar', 'es', 'fr', 'de'] as const;
const STATIC_PAGES = ['tools', 'about', 'privacy', 'terms', 'contact', 'sitemap'] as const;
const TODAY = new Date().toISOString().split('T')[0];

interface SitemapUrlEntry {
  loc: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: string;
  alternates: { lang: string; href: string }[];
}

function buildXmlUrlSet(entries: SitemapUrlEntry[]): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  for (const entry of entries) {
    xml += `  <url>\n`;
    xml += `    <loc>${entry.loc}</loc>\n`;
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    xml += `    <priority>${entry.priority}</priority>\n`;
    for (const alt of entry.alternates) {
      xml += `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.href}" />\n`;
    }
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}

// 1. Language-Specific Sitemaps (sitemap-en.xml, etc.)
function generateLanguageSitemap(targetLang: string): string {
  const entries: SitemapUrlEntry[] = [];

  // Homepage
  entries.push({
    loc: `${BASE_URL}/${targetLang}`,
    lastmod: TODAY,
    changefreq: 'daily',
    priority: '1.0',
    alternates: [
      ...LANGUAGES.map((l) => ({ lang: l, href: `${BASE_URL}/${l}` })),
      { lang: 'x-default', href: `${BASE_URL}/en` },
    ],
  });

  // Static Pages
  for (const page of STATIC_PAGES) {
    entries.push({
      loc: `${BASE_URL}/${targetLang}/${page}`,
      lastmod: TODAY,
      changefreq: page === 'tools' ? 'daily' : page === 'sitemap' ? 'weekly' : 'monthly',
      priority: page === 'tools' ? '0.9' : page === 'sitemap' ? '0.6' : '0.5',
      alternates: [
        ...LANGUAGES.map((l) => ({ lang: l, href: `${BASE_URL}/${l}/${page}` })),
        { lang: 'x-default', href: `${BASE_URL}/en/${page}` },
      ],
    });
  }

  // Category Pages
  for (const cat of CATEGORIES) {
    entries.push({
      loc: `${BASE_URL}/${targetLang}/category/${cat.slug}`,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.8',
      alternates: [
        ...LANGUAGES.map((l) => ({ lang: l, href: `${BASE_URL}/${l}/category/${cat.slug}` })),
        { lang: 'x-default', href: `${BASE_URL}/en/category/${cat.slug}` },
      ],
    });
  }

  // All 525+ Tool Pages
  for (const tool of TOOLS) {
    entries.push({
      loc: `${BASE_URL}/${targetLang}/${tool.slug}`,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: tool.popular ? '0.9' : '0.8',
      alternates: [
        ...LANGUAGES.map((l) => ({ lang: l, href: `${BASE_URL}/${l}/${tool.slug}` })),
        { lang: 'x-default', href: `${BASE_URL}/en/${tool.slug}` },
      ],
    });
  }

  return buildXmlUrlSet(entries);
}

// 2. Static / Pages Sitemap (sitemap-pages.xml)
function generatePagesSitemap(): string {
  const entries: SitemapUrlEntry[] = [];

  // Root / default redirects to default language
  entries.push({
    loc: `${BASE_URL}/`,
    lastmod: TODAY,
    changefreq: 'daily',
    priority: '1.0',
    alternates: [
      ...LANGUAGES.map((l) => ({ lang: l, href: `${BASE_URL}/${l}` })),
      { lang: 'x-default', href: `${BASE_URL}/en` },
    ],
  });

  // Language homepages
  for (const l of LANGUAGES) {
    entries.push({
      loc: `${BASE_URL}/${l}`,
      lastmod: TODAY,
      changefreq: 'daily',
      priority: '1.0',
      alternates: [
        ...LANGUAGES.map((otherLang) => ({ lang: otherLang, href: `${BASE_URL}/${otherLang}` })),
        { lang: 'x-default', href: `${BASE_URL}/en` },
      ],
    });
  }

  // Static pages across all languages
  for (const page of STATIC_PAGES) {
    for (const l of LANGUAGES) {
      entries.push({
        loc: `${BASE_URL}/${l}/${page}`,
        lastmod: TODAY,
        changefreq: page === 'tools' ? 'daily' : page === 'sitemap' ? 'weekly' : 'monthly',
        priority: page === 'tools' ? '0.9' : page === 'sitemap' ? '0.6' : '0.5',
        alternates: [
          ...LANGUAGES.map((otherLang) => ({ lang: otherLang, href: `${BASE_URL}/${otherLang}/${page}` })),
          { lang: 'x-default', href: `${BASE_URL}/en/${page}` },
        ],
      });
    }
  }

  return buildXmlUrlSet(entries);
}

// 3. Category Pages Sitemap (sitemap-categories.xml)
function generateCategoriesSitemap(): string {
  const entries: SitemapUrlEntry[] = [];

  for (const cat of CATEGORIES) {
    for (const l of LANGUAGES) {
      entries.push({
        loc: `${BASE_URL}/${l}/category/${cat.slug}`,
        lastmod: TODAY,
        changefreq: 'weekly',
        priority: '0.8',
        alternates: [
          ...LANGUAGES.map((otherLang) => ({ lang: otherLang, href: `${BASE_URL}/${otherLang}/category/${cat.slug}` })),
          { lang: 'x-default', href: `${BASE_URL}/en/category/${cat.slug}` },
        ],
      });
    }
  }

  return buildXmlUrlSet(entries);
}

// 4. Tools / Calculators Sitemap (sitemap-tools.xml & sitemap-calculators.xml)
function generateToolsSitemap(): string {
  const entries: SitemapUrlEntry[] = [];

  for (const tool of TOOLS) {
    for (const l of LANGUAGES) {
      entries.push({
        loc: `${BASE_URL}/${l}/${tool.slug}`,
        lastmod: TODAY,
        changefreq: 'weekly',
        priority: tool.popular ? '0.9' : '0.8',
        alternates: [
          ...LANGUAGES.map((otherLang) => ({ lang: otherLang, href: `${BASE_URL}/${otherLang}/${tool.slug}` })),
          { lang: 'x-default', href: `${BASE_URL}/en/${tool.slug}` },
        ],
      });
    }
  }

  return buildXmlUrlSet(entries);
}

// 5. Master Sitemap Index (sitemap.xml)
function generateSitemapIndex(): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Provide clean, language-partitioned sub-sitemaps in the master index
  for (const l of LANGUAGES) {
    xml += `  <sitemap>\n`;
    xml += `    <loc>${BASE_URL}/sitemap-${l}.xml</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `  </sitemap>\n`;
  }

  xml += `</sitemapindex>\n`;
  return xml;
}

function run() {
  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Write Master Sitemap Index & Standard Aliases
  const indexXml = generateSitemapIndex();
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), indexXml, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap_index.xml'), indexXml, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), indexXml, 'utf-8');
  console.log(`Generated: public/sitemap.xml, public/sitemap_index.xml, public/sitemap-index.xml`);

  // 2. Write Section Sitemaps (Pages, Categories, Tools/Calculators)
  const pagesXml = generatePagesSitemap();
  fs.writeFileSync(path.join(publicDir, 'sitemap-pages.xml'), pagesXml, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap_pages.xml'), pagesXml, 'utf-8');
  console.log(`Generated: public/sitemap-pages.xml & public/sitemap_pages.xml (${STATIC_PAGES.length * LANGUAGES.length + LANGUAGES.length + 1} static & hub page URLs)`);

  const categoriesXml = generateCategoriesSitemap();
  fs.writeFileSync(path.join(publicDir, 'sitemap-categories.xml'), categoriesXml, 'utf-8');
  console.log(`Generated: public/sitemap-categories.xml (${CATEGORIES.length * LANGUAGES.length} category URLs)`);

  const toolsXml = generateToolsSitemap();
  fs.writeFileSync(path.join(publicDir, 'sitemap-tools.xml'), toolsXml, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap-calculators.xml'), toolsXml, 'utf-8');
  console.log(`Generated: public/sitemap-tools.xml & public/sitemap-calculators.xml (${TOOLS.length * LANGUAGES.length} calculator URLs)`);

  // 3. Write Language-Specific Sitemaps
  for (const l of LANGUAGES) {
    const langXml = generateLanguageSitemap(l);
    const fileName = `sitemap-${l}.xml`;
    fs.writeFileSync(path.join(publicDir, fileName), langXml, 'utf-8');
    console.log(`Generated: public/${fileName} with full hreflang alternates`);
  }

  console.log(`\nSuccessfully generated comprehensive XML sitemaps for Calcyfy (${TOOLS.length} calculators across 5 languages)!`);
}

run();
