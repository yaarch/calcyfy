import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TOOLS } from '../src/data/tools';
import { CATEGORIES } from '../src/data/categories';
import { SUPPORTED_LANGUAGES, getToolPath, getCategoryPath } from '../src/utils/seoEngine';
import { prerenderRouteHtml } from '../src/utils/htmlPrerender';
import { Language, RouteInfo } from '../src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');

async function prerenderAll() {
  console.log('🚀 Starting Build-Time Static Prerendering (SSG)...');
  const startTime = Date.now();

  const baseIndexPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(baseIndexPath)) {
    console.error('❌ dist/index.html not found! Run vite build first.');
    process.exit(1);
  }

  const baseTemplate = fs.readFileSync(baseIndexPath, 'utf-8');
  let generatedCount = 0;

  // Helper to safely write index.html to nested directory
  const writePrerenderedRoute = (routePath: string, route: RouteInfo, lang: Language) => {
    // Strip leading and trailing slashes
    const cleanPath = routePath.replace(/^\/+/, '').replace(/\/+$/, '');
    const outDir = path.join(DIST_DIR, cleanPath);
    fs.mkdirSync(outDir, { recursive: true });
    const outFilePath = path.join(outDir, 'index.html');
    const prerenderedHtml = prerenderRouteHtml(baseTemplate, route, lang);
    fs.writeFileSync(outFilePath, prerenderedHtml, 'utf-8');
    generatedCount++;
  };

  for (const lang of SUPPORTED_LANGUAGES) {
    // 1. Home page: /{lang}
    writePrerenderedRoute(`/${lang}`, { view: 'home', lang, path: `/${lang}` }, lang);

    // 2. Tools directory: /{lang}/tools
    writePrerenderedRoute(`/${lang}/tools`, { view: 'tools', lang, path: `/${lang}/tools` }, lang);

    // 3. Static pages: about, privacy, terms, contact, sitemap
    for (const page of ['about', 'privacy', 'terms', 'contact', 'sitemap']) {
      writePrerenderedRoute(`/${lang}/${page}`, { view: page as any, lang, path: `/${lang}/${page}` }, lang);
    }

    // 4. Categories: /{lang}/category/{catSlug}
    for (const cat of CATEGORIES) {
      const catPath = getCategoryPath(cat.slug, lang);
      writePrerenderedRoute(
        catPath,
        { view: 'category', lang, categoryId: cat.id, categorySlug: cat.slug, path: catPath },
        lang
      );
    }

    // 5. Calculators: /{lang}/{toolSlug} (all 525 tools!)
    for (const tool of TOOLS) {
      const toolPath = getToolPath(tool.slug, lang);
      writePrerenderedRoute(
        toolPath,
        { view: 'tool', lang, toolId: tool.id, toolSlug: tool.slug, path: toolPath },
        lang
      );
    }
  }

  const durationMs = Date.now() - startTime;
  console.log(`✅ Static Prerendering Complete!`);
  console.log(`   Generated: ${generatedCount.toLocaleString()} route-specific index.html files`);
  console.log(`   Languages: ${SUPPORTED_LANGUAGES.join(', ')}`);
  console.log(`   Time Taken: ${durationMs}ms`);
}

prerenderAll().catch((err) => {
  console.error('❌ Prerendering failed:', err);
  process.exit(1);
});
