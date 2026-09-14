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
  const { currentView, t, lang } = useApp();
  const [historyOpen, setHistoryOpen] = useState(false);

  // SEO Optimization & Title/Meta tag synchronization
  useEffect(() => {
    let title = 'Calcyfy';
    let description = 'Free online calculators, converters, and tools.';
    let keywords = 'calculator, converter, percentage calculator, bmi calculator, mortgage calculator, loan calculator, unit converter, calorie calculator';

    if (currentView === '' || currentView === 'home') {
      title = t('site_title') || 'CALCYFY — Free Everyday Calculators & Tools';
      description = t('hero_description') || 'Free, instant, and privacy-focused online calculators and unit converters for finance, health, math, and everyday decisions.';
      keywords = 'calculator, converter, percentage calculator, bmi calculator, mortgage calculator, loan calculator, unit converter, calorie calculator, free online tools, حاسبة, محول, حاسبة النسبة المئوية, حاسبة كتلة الجسم';
    } else if (currentView === 'tools') {
      title = `${t('nav_all_tools', 'All Tools')} — Calcyfy`;
      description = t('sitemap_desc') || 'Explore all free online tools, converters, and calculators organized by category.';
      keywords = 'all tools, complete calculators directory, conversion tools, finance calculators, math tools, health converters, جميع الأدوات, حاسبات ومحولات';
    } else if (currentView.startsWith('category:')) {
      const catId = currentView.replace('category:', '');
      const category = CATEGORIES.find((c) => c.id === catId);
      if (category) {
        const catName = t(`cat_${category.id.replace('-', '_')}`);
        const catDesc = t(`cat_${category.id.replace('-', '_')}_desc`);
        title = `${catName} — Calcyfy`;
        description = `${catName} calculators and conversion tools. ${catDesc}`;
        keywords = `${catName}, ${catName} calculator, ${catName} tools, free ${catName} converters, حاسبة ${catName}, أدوات ${catName}`;
      }
    } else if (currentView.startsWith('tool:')) {
      const toolId = currentView.replace('tool:', '');
      const tool = TOOLS.find((item) => item.id === toolId || item.slug === toolId);
      if (tool) {
        const toolName = t(`tool_${tool.id.replace('-', '_')}_name`);
        const toolDesc = t(`tool_${tool.id.replace('-', '_')}_desc`);
        title = `${toolName} — Calcyfy`;
        description = toolDesc;

        // Generate extensive relevant keywords for the current tool dynamically in both languages
        const category = CATEGORIES.find((c) => c.id === tool.categoryId);
        const catName = category ? t(`cat_${category.id.replace('-', '_')}`) : '';
        const enName = (TOOLS.find((tItem) => tItem.id === tool.id)?.id || '').replace('-', ' ');

        const words = [
          toolName,
          `${toolName} calculator`,
          `online ${toolName}`,
          `free ${toolName}`,
          `calculate ${toolName}`,
          `how to calculate ${toolName}`,
          toolId,
          enName,
          catName,
          `حاسبة ${toolName}`,
          `طريقة حساب ${toolName}`,
          `حساب ${toolName} اون لاين`,
          `أداة ${toolName}`,
        ];
        keywords = words.filter(Boolean).join(', ');
      }
    } else if (['about', 'privacy', 'terms', 'contact', 'sitemap'].includes(currentView)) {
      const pageNames: Record<string, string> = {
        about: 'About Us',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        contact: 'Contact Us',
        sitemap: 'Sitemap',
      };
      const translatedName = t(`nav_${currentView}`, pageNames[currentView]);
      title = `${translatedName} — Calcyfy`;
      description = `${translatedName} page. Calcyfy - Free online tools. Simple answers.`;
      keywords = `${translatedName}, Calcyfy ${translatedName}, Calcyfy, about, contact, privacy, sitemap`;
    }

    // Apply title
    document.title = title;

    // Apply meta tags dynamically
    const applyMeta = (selector: string, attr: string, val: string) => {
      try {
        let el = document.querySelector(selector);
        if (!el) {
          el = document.createElement('meta');
          if (selector.startsWith('meta[property=')) {
            const prop = selector.match(/property="([^"]+)"/)?.[1];
            if (prop) el.setAttribute('property', prop);
          } else {
            const name = selector.match(/name="([^"]+)"/)?.[1];
            if (name) el.setAttribute('name', name);
          }
          document.head.appendChild(el);
        }
        el.setAttribute(attr, val);
      } catch (e) {
        console.error('SEO Dynamic Meta Error:', e);
      }
    };

    applyMeta('meta[name="description"]', 'content', description);
    applyMeta('meta[name="keywords"]', 'content', keywords);
    applyMeta('meta[property="og:title"]', 'content', title);
    applyMeta('meta[property="og:description"]', 'content', description);
    applyMeta('meta[name="twitter:title"]', 'content', title);
    applyMeta('meta[name="twitter:description"]', 'content', description);
  }, [currentView, lang, t]);

  // Parse view from routing
  const renderView = () => {
    if (currentView === '' || currentView === 'home') {
      return <HomeView />;
    }

    if (currentView === 'tools') {
      return <AllToolsView />;
    }

    if (currentView.startsWith('category:')) {
      const catId = currentView.replace('category:', '') as CategoryId;
      return <AllToolsView initialCategory={catId} />;
    }

    if (currentView.startsWith('tool:')) {
      const toolId = currentView.replace('tool:', '');
      return <ToolPage toolId={toolId} />;
    }

    if (currentView === 'about') {
      return <AboutPage />;
    }

    if (currentView === 'privacy') {
      return <PrivacyPage />;
    }

    if (currentView === 'terms') {
      return <TermsPage />;
    }

    if (currentView === 'contact') {
      return <ContactPage />;
    }

    if (currentView === 'sitemap') {
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
