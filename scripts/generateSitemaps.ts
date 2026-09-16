import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TOOLS } from '../src/data/tools.js';
import { CATEGORIES } from '../src/data/categories.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://calcyfy.com';
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

function generateLanguageSitemap(targetLang: string): string {
  const entries: SitemapUrlEntry[] = [];

  // 1. Homepage
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

  // 2. Static Pages
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

  // 3. Category Pages
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

  // 4. All 525+ Tool Pages
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

  // Build XML
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

function generateSitemapIndex(): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

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

  // Write Sitemap Index
  const indexXml = generateSitemapIndex();
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), indexXml, 'utf-8');
  console.log(`Generated: public/sitemap.xml (Sitemap Index for 5 languages)`);

  // Write Language Sitemaps
  for (const l of LANGUAGES) {
    const langXml = generateLanguageSitemap(l);
    const fileName = `sitemap-${l}.xml`;
    fs.writeFileSync(path.join(publicDir, fileName), langXml, 'utf-8');
    console.log(`Generated: public/${fileName} with full hreflang alternates`);
  }

  console.log(`\nSuccessfully generated full sitemap index and 5 language sitemaps for ${TOOLS.length} tools!`);
}

run();
