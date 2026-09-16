import React from 'react';
import { useApp } from '../context/AppContext';
import { AppLink } from './common/AppLink';
import { Calculator, ShieldCheck, Zap, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, lang, getHomeUrl, getPageUrl, getToolUrl, getCategoryUrl } = useApp();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <AppLink
              href={getHomeUrl()}
              className="flex items-center gap-2 group"
              title="Calcyfy"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <Calculator className="w-4 h-4" />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                CALCYFY
              </span>
            </AppLink>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('brand_tagline', 'Free tools. Simple answers.')}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {t('hero_description', 'Free, instant, and privacy-focused online calculators and converters.')}
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Private</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Client-Side</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              {t('lbl_popular_tools', 'Popular Calculators')}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <AppLink
                  href={getToolUrl('percentage')}
                  className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('tool_percentage_name', 'Percentage Calculator')}
                </AppLink>
              </li>
              <li>
                <AppLink
                  href={getToolUrl('bmi')}
                  className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('tool_bmi_name', 'BMI Calculator')}
                </AppLink>
              </li>
              <li>
                <AppLink
                  href={getToolUrl('loan')}
                  className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('tool_loan_name', 'Loan Calculator')}
                </AppLink>
              </li>
              <li>
                <AppLink
                  href={getToolUrl('age')}
                  className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('tool_age_name', 'Age Calculator')}
                </AppLink>
              </li>
              <li>
                <AppLink
                  href={getToolUrl('currency')}
                  className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('tool_currency_name', 'Currency Converter')}
                </AppLink>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              {t('lbl_categories', 'Categories')}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <AppLink
                  href={getCategoryUrl('finance')}
                  className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('cat_finance', 'Finance & Investment')}
                </AppLink>
              </li>
              <li>
                <AppLink
                  href={getCategoryUrl('health')}
                  className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('cat_health', 'Health & Fitness')}
                </AppLink>
              </li>
              <li>
                <AppLink
                  href={getCategoryUrl('converters')}
                  className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('cat_converters', 'Unit Converters')}
                </AppLink>
              </li>
              <li>
                <AppLink
                  href={getCategoryUrl('math')}
                  className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('cat_math', 'Mathematics')}
                </AppLink>
              </li>
              <li>
                <AppLink
                  href={getCategoryUrl('date')}
                  className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('cat_date', 'Date & Time')}
                </AppLink>
              </li>
            </ul>
          </div>

          {/* Legal & Directory */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              {t('lbl_company', 'Directory & Legal')}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <AppLink
                  href={`/${lang}/tools`}
                  className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold"
                >
                  {t('nav_all_tools', 'All 525+ Tools')}
                </AppLink>
              </li>
              <li>
                <AppLink
                  href={getPageUrl('about')}
                  className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('nav_about', 'About Us')}
                </AppLink>
              </li>
              <li>
                <AppLink
                  href={getPageUrl('privacy')}
                  className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('nav_privacy', 'Privacy Policy')}
                </AppLink>
              </li>
              <li>
                <AppLink
                  href={getPageUrl('terms')}
                  className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('nav_terms', 'Terms of Service')}
                </AppLink>
              </li>
              <li>
                <AppLink
                  href={getPageUrl('contact')}
                  className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('nav_contact', 'Contact Us')}
                </AppLink>
              </li>
              <li>
                <AppLink
                  href={getPageUrl('sitemap')}
                  className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('nav_sitemap', 'HTML Sitemap')}
                </AppLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Calcyfy. {t('footer_rights', 'All rights reserved.')}</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Engineered with care for global accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
