/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HistoryDrawer } from './components/HistoryDrawer';
import { HomeView } from './components/HomeView';
import { CategoryId } from './types';
import { TOOLS } from './data/tools';
import { CATEGORIES } from './data/categories';
import {
  findTool,
  findCategory,
  generateHomeSeo,
  generateToolsDirectorySeo,
  generateCategorySeo,
  generateToolSeo,
  generateStaticPageSeo,
  applySeoToDocument,
} from './utils/seoEngine';

// Lazy load secondary views to minimize initial JavaScript payload
const AllToolsView = React.lazy(() =>
  import('./components/AllToolsView').then((m) => ({ default: m.AllToolsView }))
);
const ToolPage = React.lazy(() =>
  import('./components/ToolPage').then((m) => ({ default: m.ToolPage }))
);
const AboutPage = React.lazy(() =>
  import('./components/StaticPages').then((m) => ({ default: m.AboutPage }))
);
const PrivacyPage = React.lazy(() =>
  import('./components/StaticPages').then((m) => ({ default: m.PrivacyPage }))
);
const TermsPage = React.lazy(() =>
  import('./components/StaticPages').then((m) => ({ default: m.TermsPage }))
);
const ContactPage = React.lazy(() =>
  import('./components/StaticPages').then((m) => ({ default: m.ContactPage }))
);
const SitemapPage = React.lazy(() =>
  import('./components/StaticPages').then((m) => ({ default: m.SitemapPage }))
);
const NotFoundPage = React.lazy(() =>
  import('./components/StaticPages').then((m) => ({ default: m.NotFoundPage }))
);

const ViewLoadingSkeleton: React.FC = () => (
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse space-y-6">
    <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-1/4"></div>
    <div className="h-64 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800"></div>
  </div>
);

const MainRouter: React.FC = () => {
  const { route, lang, t } = useApp();
  const [historyOpen, setHistoryOpen] = useState(false);

  // SEO & Document Metadata Engine Synchronization
  useEffect(() => {
    try {
      if (route.view === 'home') {
        const seo = generateHomeSeo(lang, t);
        applySeoToDocument(seo);
      } else if (route.view === 'tools') {
        const seo = generateToolsDirectorySeo(lang, t);
        applySeoToDocument(seo);
      } else if (route.view === 'category' && (route.categoryId || route.categorySlug)) {
        const category = findCategory(route.categoryId || route.categorySlug || '');
        if (category) {
          const seo = generateCategorySeo(category, lang, t);
          applySeoToDocument(seo);
        }
      } else if (route.view === 'tool' && (route.toolId || route.toolSlug)) {
        const tool = findTool(route.toolId || route.toolSlug || '');
        if (tool) {
          const seo = generateToolSeo(tool, lang, t);
          applySeoToDocument(seo);
        }
      } else if (['about', 'privacy', 'terms', 'contact', 'sitemap'].includes(route.view) || route.staticPage) {
        const pageKey = route.staticPage || route.view;
        const seo = generateStaticPageSeo(pageKey, lang, t);
        applySeoToDocument(seo);
      } else if (route.view === 'not-found') {
        document.title = `404 — ${t('page_not_found', 'Page Not Found')} | Calcyfy`;
      }
    } catch (e) {
      console.error('SEO Generation Error:', e);
    }
  }, [route, lang, t]);

  // Parse view from routing state
  const renderView = () => {
    if (route.view === 'home') {
      return <HomeView />;
    }

    if (route.view === 'tools') {
      return <AllToolsView />;
    }

    if (route.view === 'category') {
      const category = findCategory(route.categoryId || route.categorySlug || '');
      const catId = (category ? category.id : route.categoryId) as CategoryId;
      return <AllToolsView initialCategory={catId} />;
    }

    if (route.view === 'tool') {
      const tool = findTool(route.toolId || route.toolSlug || '');
      const targetId = tool ? tool.id : (route.toolId || route.toolSlug || '');
      return <ToolPage toolId={targetId} />;
    }

    if (route.view === 'about' || route.staticPage === 'about') {
      return <AboutPage />;
    }

    if (route.view === 'privacy' || route.staticPage === 'privacy') {
      return <PrivacyPage />;
    }

    if (route.view === 'terms' || route.staticPage === 'terms') {
      return <TermsPage />;
    }

    if (route.view === 'contact' || route.staticPage === 'contact') {
      return <ContactPage />;
    }

    if (route.view === 'sitemap' || route.staticPage === 'sitemap') {
      return <SitemapPage />;
    }

    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-emerald-500 selection:text-white">
      <Header onOpenHistory={() => setHistoryOpen(true)} />
      <main className="flex-1">
        <Suspense fallback={<ViewLoadingSkeleton />}>
          {renderView()}
        </Suspense>
      </main>
      <Footer />
      <HistoryDrawer isOpen={historyOpen} onClose={() => setHistoryOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
