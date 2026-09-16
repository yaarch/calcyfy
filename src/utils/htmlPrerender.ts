import { RouteInfo, Language, ToolDef, CategoryDef } from '../types';
import { TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';
import {
  generateSeoForRoute,
  getHomePath,
  getCategoryPath,
  getToolPath,
  getToolsDirectoryPath,
  getCanonicalUrl,
  findTool,
  findCategory,
  SUPPORTED_LANGUAGES,
} from './seoEngine';
import { getToolName, getToolDescription } from './toolMetadata';
import { getToolContentDetails } from './toolContentEngine';
import { TRANSLATIONS } from '../i18n/translations';

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generates semantic, route-specific HTML to place inside `<div id="root">`
 * before React client-side execution mounts.
 */
export function renderSemanticBodyHtml(route: RouteInfo, lang: Language): string {
  const isRtl = lang === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const t = (k: string, def = '') => dict[k] || TRANSLATIONS.en[k] || def;

  // 1. TOOL ROUTE
  if (route.view === 'tool' && (route.toolId || route.toolSlug)) {
    const tool = findTool(route.toolId || route.toolSlug || '');
    if (tool) {
      const toolName = getToolName(tool, lang, t);
      const toolDesc = getToolDescription(tool, lang, t);
      const category = CATEGORIES.find((c) => c.id === tool.categoryId);
      const catKey = category ? `cat_${category.id.replace(/-/g, '_')}` : '';
      const categoryName = category ? t(catKey, category.id) : 'Calculator';
      const categoryUrl = category ? getCategoryPath(category.slug, lang) : getToolsDirectoryPath(lang);
      const homeUrl = getHomePath(lang);
      const details = getToolContentDetails(tool, lang);

      return `
      <div class="calcyfy-ssr-container max-w-5xl mx-auto px-4 py-8" dir="${dir}">
        <!-- Semantic Breadcrumbs -->
        <nav aria-label="Breadcrumb" class="mb-6">
          <ol class="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
            <li><a href="${homeUrl}" class="hover:underline text-emerald-600">${escapeHtml(t('nav_home', 'Home'))}</a></li>
            <li>/</li>
            <li><a href="${categoryUrl}" class="hover:underline text-emerald-600">${escapeHtml(categoryName)}</a></li>
            <li>/</li>
            <li aria-current="page" class="font-medium text-slate-700">${escapeHtml(toolName)}</li>
          </ol>
        </nav>

        <!-- Tool Header -->
        <header class="mb-8 space-y-3">
          <div class="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
            ${escapeHtml(categoryName)}
          </div>
          <h1 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ${escapeHtml(toolName)}
          </h1>
          <p class="text-base text-slate-600 max-w-3xl leading-relaxed">
            ${escapeHtml(toolDesc)}
          </p>
        </header>

        <!-- Interactive Calculator Placeholder Container -->
        <section aria-label="Calculator Interface" class="mb-12 p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-sm min-h-[280px]">
          <div class="animate-pulse space-y-4">
            <div class="h-4 bg-slate-100 rounded w-1/4"></div>
            <div class="h-10 bg-slate-100 rounded"></div>
            <div class="h-4 bg-slate-100 rounded w-1/3"></div>
            <div class="h-10 bg-slate-100 rounded"></div>
            <div class="h-12 bg-emerald-100 rounded mt-6"></div>
          </div>
        </section>

        <!-- Comprehensive Educational Content Section -->
        <article class="space-y-8 pt-8 border-t border-slate-200">
          <div class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <h2 class="text-xl sm:text-2xl font-bold text-slate-900">
              About the ${escapeHtml(toolName)}
            </h2>
            <p class="text-sm text-slate-700 leading-relaxed">
              ${escapeHtml(details.intro)}
            </p>

            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-900">
                What This Calculator Calculates
              </h3>
              <p class="text-xs sm:text-sm text-slate-600">
                ${escapeHtml(details.whatItCalculates)}
              </p>
            </div>

            ${
              details.formula
                ? `
            <div class="space-y-2">
              <h3 class="text-base font-bold text-slate-900">Formula & Methodology</h3>
              <pre class="p-3 bg-slate-50 rounded-lg text-xs font-mono text-emerald-800 overflow-x-auto"><code>${escapeHtml(details.formula)}</code></pre>
              ${
                details.unitsAndConversions
                  ? `<p class="text-xs text-slate-500"><strong>Units & Standards:</strong> ${escapeHtml(details.unitsAndConversions)}</p>`
                  : ''
              }
            </div>`
                : ''
            }

            ${
              details.inputs && details.inputs.length > 0
                ? `
            <div class="space-y-3">
              <h3 class="text-base font-bold text-slate-900">Key Inputs Explained</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                ${details.inputs
                  .map(
                    (inp) => `
                <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <div class="font-bold text-slate-900 mb-1">${escapeHtml(inp.name)} ${inp.unit ? `<span class="font-normal text-slate-500">(${escapeHtml(inp.unit)})</span>` : ''}</div>
                  <div class="text-slate-600">${escapeHtml(inp.description)}</div>
                </div>`
                  )
                  .join('')}
              </div>
            </div>`
                : ''
            }

            ${
              details.workedExample
                ? `
            <div class="space-y-2">
              <h3 class="text-base font-bold text-slate-900">Worked Calculation Example</h3>
              <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <div class="font-semibold text-slate-800">${escapeHtml(details.workedExample.scenario)}</div>
                <ol class="list-decimal ps-4 space-y-1 text-slate-600">
                  ${details.workedExample.stepByStep.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}
                </ol>
                <div class="font-bold text-emerald-700 pt-1">Result: ${escapeHtml(details.workedExample.result)}</div>
              </div>
            </div>`
                : ''
            }

            ${
              details.limitations
                ? `
            <div class="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
              <strong>Assumptions & Limitations:</strong> ${escapeHtml(details.limitations)}
            </div>`
                : ''
            }

            ${
              details.faqs && details.faqs.length > 0
                ? `
            <div class="space-y-4 pt-4 border-t border-slate-100">
              <h3 class="text-lg font-bold text-slate-900">Frequently Asked Questions</h3>
              <dl class="space-y-3">
                ${details.faqs
                  .map(
                    (faq) => `
                <div class="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                  <dt class="text-xs sm:text-sm font-bold text-slate-900 mb-1">${escapeHtml(faq.question)}</dt>
                  <dd class="text-xs text-slate-600 leading-relaxed">${escapeHtml(faq.answer)}</dd>
                </div>`
                  )
                  .join('')}
              </dl>
            </div>`
                : ''
            }
          </div>

          <!-- Related Calculators Internal Links -->
          ${
            details.relatedTools && details.relatedTools.length > 0
              ? `
          <div class="space-y-4 pt-4">
            <h3 class="text-lg font-bold text-slate-900">Related ${escapeHtml(categoryName)} Calculators</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              ${details.relatedTools
                .map(
                  (relTool) => `
              <a href="${getToolPath(relTool.slug, lang)}" class="p-4 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-sm block transition-all">
                <div class="text-xs font-bold text-slate-900">${escapeHtml(getToolName(relTool, lang, t))}</div>
                <div class="text-[11px] text-slate-500 mt-1 line-clamp-2">${escapeHtml(getToolDescription(relTool, lang, t))}</div>
              </a>`
                )
                .join('')}
            </div>
          </div>`
              : ''
          }
        </article>
      </div>`;
    }
  }

  // 2. CATEGORY ROUTE
  if (route.view === 'category' && (route.categoryId || route.categorySlug)) {
    const category = findCategory(route.categoryId || route.categorySlug || '');
    if (category) {
      const catKey = `cat_${category.id.replace(/-/g, '_')}`;
      const categoryName = t(catKey, category.id);
      const catTools = TOOLS.filter((item) => item.categoryId === category.id);

      return `
      <div class="calcyfy-ssr-container max-w-6xl mx-auto px-4 py-8" dir="${dir}">
        <nav aria-label="Breadcrumb" class="mb-6">
          <ol class="flex items-center gap-2 text-xs text-slate-500">
            <li><a href="${getHomePath(lang)}" class="hover:underline text-emerald-600">${escapeHtml(t('nav_home', 'Home'))}</a></li>
            <li>/</li>
            <li aria-current="page" class="font-medium text-slate-700">${escapeHtml(categoryName)}</li>
          </ol>
        </nav>
        <header class="mb-8 space-y-2">
          <h1 class="text-3xl font-extrabold text-slate-900">${escapeHtml(categoryName)} Calculators & Tools</h1>
          <p class="text-slate-600 text-sm max-w-2xl">Explore all free online ${escapeHtml(categoryName)} calculators, converters, and calculation formulas.</p>
        </header>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          ${catTools
            .map(
              (item) => `
          <a href="${getToolPath(item.slug, lang)}" class="p-4 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 block transition-all">
            <h2 class="text-sm font-bold text-slate-900">${escapeHtml(getToolName(item, lang, t))}</h2>
            <p class="text-xs text-slate-500 mt-1 line-clamp-2">${escapeHtml(getToolDescription(item, lang, t))}</p>
          </a>`
            )
            .join('')}
        </div>
      </div>`;
    }
  }

  // 3. HOME ROUTE
  if (route.view === 'home') {
    const popularTools = TOOLS.filter((t) => t.popular).slice(0, 16);
    return `
    <div class="calcyfy-ssr-container max-w-6xl mx-auto px-4 py-8" dir="${dir}">
      <header class="text-center py-10 space-y-4">
        <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          ${escapeHtml(t('hero_title', 'Free Tools for Everyday Calculations'))}
        </h1>
        <p class="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          ${escapeHtml(t('hero_subtitle', 'Calculate, convert, and solve everyday problems with fast, simple, and accurate tools.'))}
        </p>
      </header>

      <section class="mb-12">
        <h2 class="text-xl font-bold text-slate-900 mb-4">${escapeHtml(t('popular_tools_title', 'Most Popular Calculators'))}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          ${popularTools
            .map(
              (item) => `
          <a href="${getToolPath(item.slug, lang)}" class="p-4 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 block transition-all">
            <h3 class="text-sm font-bold text-slate-900">${escapeHtml(getToolName(item, lang, t))}</h3>
            <p class="text-xs text-slate-500 mt-1 line-clamp-2">${escapeHtml(getToolDescription(item, lang, t))}</p>
          </a>`
            )
            .join('')}
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-xl font-bold text-slate-900 mb-4">${escapeHtml(t('categories_title', 'Explore by Category'))}</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          ${CATEGORIES.map(
            (cat) => `
          <a href="${getCategoryPath(cat.slug, lang)}" class="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 block text-center transition-all">
            <div class="text-xs font-bold text-slate-900">${escapeHtml(t(`cat_${cat.id.replace(/-/g, '_')}`, cat.id))}</div>
            <div class="text-[11px] text-slate-400 mt-0.5">${cat.toolCount} tools</div>
          </a>`
          ).join('')}
        </div>
      </section>
    </div>`;
  }

  // Default / static pages
  return `
  <div class="calcyfy-ssr-container max-w-4xl mx-auto px-4 py-8" dir="${dir}">
    <h1 class="text-2xl font-bold text-slate-900 mb-4">${escapeHtml(route.view.toUpperCase())}</h1>
    <p class="text-slate-600">Free, instant, and privacy-focused online tools and calculators at Calcyfy.</p>
  </div>`;
}

/**
 * Injects route-specific SEO tags (title, meta description, canonical, hreflangs, JSON-LD)
 * and semantic initial HTML body into a raw HTML template string.
 */
export function prerenderRouteHtml(
  templateHtml: string,
  route: RouteInfo,
  lang: Language
): string {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const t = (k: string, def = '') => dict[k] || TRANSLATIONS.en[k] || def;
  const seo = generateSeoForRoute(route, lang, t);

  let html = templateHtml;

  // 1. Update <html lang="..." dir="...">
  const isRtl = lang === 'ar';
  html = html.replace(/<html[^>]*>/i, `<html lang="${lang}" dir="${isRtl ? 'rtl' : 'ltr'}">`);

  // 2. Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);

  // 3. Replace or insert <meta name="description" ...>
  if (/<meta\s+name=["']description["'][^>]*>/i.test(html)) {
    html = html.replace(
      /<meta\s+name=["']description["'][^>]*>/i,
      `<meta name="description" content="${escapeHtml(seo.metaDescription)}" />`
    );
  } else {
    html = html.replace('</head>', `  <meta name="description" content="${escapeHtml(seo.metaDescription)}" />\n</head>`);
  }

  // 4. Update canonical link
  if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html)) {
    html = html.replace(
      /<link\s+rel=["']canonical["'][^>]*>/i,
      `<link rel="canonical" href="${seo.canonical}" />`
    );
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${seo.canonical}" />\n</head>`);
  }

  // 5. Update reciprocal hreflang links
  const hreflangTags = seo.hreflang
    .map((h) => `<link rel="alternate" hreflang="${h.lang}" href="${h.href}" />`)
    .join('\n    ');

  // Replace existing alternate hreflangs
  html = html.replace(/(?:<link\s+rel=["']alternate["']\s+hreflang=["'][^"']+["']\s+href=["'][^"']+["']\s*\/?>\s*)+/gi, '');
  html = html.replace('</head>', `  ${hreflangTags}\n</head>`);

  // 6. Update OpenGraph / Twitter tags
  html = html.replace(
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${escapeHtml(seo.ogTitle || seo.title)}" />`
  );
  html = html.replace(
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${escapeHtml(seo.ogDescription || seo.metaDescription)}" />`
  );
  html = html.replace(
    /<meta\s+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${seo.ogUrl || seo.canonical}" />`
  );
  html = html.replace(
    /<meta\s+name=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${escapeHtml(seo.twitterTitle || seo.title)}" />`
  );
  html = html.replace(
    /<meta\s+name=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${escapeHtml(seo.twitterDescription || seo.metaDescription)}" />`
  );

  // 7. Inject Structured Data JSON-LD
  if (seo.structuredData && seo.structuredData.length > 0) {
    const jsonLdBlock = `\n  <script type="application/ld+json">\n${JSON.stringify(seo.structuredData, null, 2)}\n  </script>\n`;
    html = html.replace('</head>', `${jsonLdBlock}</head>`);
  }

  // 8. Inject route-specific semantic body inside <div id="root">
  const bodyContent = renderSemanticBodyHtml(route, lang);
  html = html.replace('<div id="root"></div>', `<div id="root">${bodyContent}</div>`);

  return html;
}
