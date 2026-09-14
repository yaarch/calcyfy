import React from 'react';
import { useApp } from '../context/AppContext';
import { Calculator } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, navigateTo } = useApp();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
                <Calculator className="w-4 h-4" />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                CALCYFY
              </span>
            </button>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('brand_tagline', 'Free tools. Simple answers.')}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {t('hero_description', 'Free, instant, and privacy-focused online calculators and converters.')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {t('lbl_popular_tools', 'Popular Calculators')}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('tool:percentage')}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('tool_percentage_name', 'Percentage Calculator')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('tool:bmi')}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('tool_bmi_name', 'BMI Calculator')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('tool:loan')}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('tool_loan_name', 'Loan Calculator')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('tool:age')}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('tool_age_name', 'Age Calculator')}
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {t('lbl_categories', 'Categories')}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('category:finance')}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('cat_finance', 'Finance & Investment')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('category:health')}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('cat_health', 'Health & Fitness')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('category:converters')}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('cat_converters', 'Unit Converters')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('category:math')}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('cat_math', 'Mathematics')}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & About */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {t('nav_about', 'About & Legal')}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('nav_about', 'About Calcyfy')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('privacy')}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('nav_privacy', 'Privacy Policy')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('terms')}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('nav_terms', 'Terms & Disclaimer')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('nav_contact', 'Contact & Suggest Tool')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('sitemap')}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {t('nav_sitemap', 'Sitemap')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} CALCYFY. All rights reserved.</p>
          <p>{t('lbl_disclaimer', 'For educational and informational purposes only.')}</p>
        </div>
      </div>
    </footer>
  );
};
