import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';
import { Sparkles, Send, CheckCircle2, Zap, Lock, Heart } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { t, navigateTo } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('about_title', 'About Calcyfy')}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          {t('about_subtitle', 'Calculations made intuitive, instantaneous, and private.')}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
          {t('about_p1', 'CALCYFY is built on a simple conviction: the essential math tools humans use every day should be lightning fast, beautifully designed, and completely free of intrusive tracking.')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {t('why_fast_title', 'Instant Answers')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {t('why_fast_desc', 'All algorithms and conversion formulas execute in microseconds directly inside your browser without backend roundtrips.')}
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {t('why_privacy_title', 'Privacy First')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {t('why_privacy_desc', 'Your financial numbers, health stats, and personal dates are never uploaded or saved to remote cloud servers.')}
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {t('why_global_title', 'Truly Global')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {t('why_global_desc', 'Native internationalization for English, Arabic (with full bidirectional RTL layout), Spanish, French, and German.')}
          </p>
        </div>
      </div>

      <div className="p-8 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-3xl text-white text-center space-y-4 shadow-xl">
        <h2 className="text-2xl md:text-3xl font-black">{t('lbl_explore_all', 'Explore 100+ Free Tools')}</h2>
        <p className="text-emerald-100 text-sm max-w-lg mx-auto">
          {t('hero_subtitle', 'Start calculating loans, mortgages, BMI, unit measurements, and currency exchanges now.')}
        </p>
        <button
          onClick={() => navigateTo('tools')}
          className="px-6 py-3 bg-white text-emerald-800 font-bold text-sm rounded-xl hover:bg-emerald-50 transition-colors shadow-md"
        >
          {t('nav_all_tools', 'Browse All Calculators')}
        </button>
      </div>
    </div>
  );
};

export const PrivacyPage: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          {t('privacy_title', 'Privacy Policy')}
        </h1>
        <p className="text-xs text-slate-400">
          {t('privacy_subtitle', 'Last updated: September 2026')}
        </p>
      </div>

      <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl text-emerald-800 dark:text-emerald-300 font-medium">
          {t('privacy_summary', 'Summary: CALCYFY operates on a client-side architecture. We do NOT collect, store, sell, or transmit any inputs, numbers, or calculation results.')}
        </div>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Local Processing</h2>
          <p>{t('privacy_p1')}</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Local Storage Usage</h2>
          <p>{t('privacy_p2')}</p>
        </section>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          {t('terms_title', 'Terms of Service & Disclaimer')}
        </h1>
        <p className="text-xs text-slate-400">
          {t('terms_subtitle', 'Effective Date: September 2026')}
        </p>
      </div>

      <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-amber-800 dark:text-amber-300 font-medium">
          {t('terms_disclaimer', 'Educational Disclaimer: All tools, equations, estimates, and currency rates provided on Calcyfy are for general educational and informational purposes only.')}
        </div>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. No Professional Advice</h2>
          <p>{t('terms_p1')}</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Accuracy &amp; Warranties</h2>
          <p>{t('terms_p2')}</p>
        </section>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const { t } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          {t('contact_title', 'Contact & Tool Suggestions')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t('contact_subtitle', 'Have an idea for a new calculator or noticed an issue? We’d love to hear from you.')}
        </p>
      </div>

      {submitted ? (
        <div className="p-8 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
          <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-100">
            {t('contact_success_title', 'Thank you!')}
          </h3>
          <p className="text-xs text-emerald-700 dark:text-emerald-300">
            {t('contact_success_msg', 'Your message and suggestions have been received. We review every community proposal as we expand Calcyfy’s directory.')}
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg"
          >
            {t('contact_send_another', 'Send Another Message')}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              {t('contact_name_lbl', 'Your Name')}
            </label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
              placeholder="Alex Smith"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              {t('contact_email_lbl', 'Email Address')}
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
              placeholder="alex@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              {t('contact_msg_lbl', 'Tool Proposal or Message')}
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm resize-none"
              placeholder="Suggest a calculator or provide feedback..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <Send className="w-4 h-4" />
            <span>{t('contact_btn_send', 'Submit Proposal')}</span>
          </button>
        </form>
      )}
    </div>
  );
};

export const SitemapPage: React.FC = () => {
  const { t, navigateTo } = useApp();
  const [search, setSearch] = useState('');

  const filteredTools = TOOLS.filter((tool) => {
    const name = t(`tool_${tool.id.replace(/-/g, '_')}_name`, tool.slug).toLowerCase();
    return name.includes(search.toLowerCase()) || tool.id.includes(search.toLowerCase());
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
          {t('nav_sitemap', 'HTML Sitemap & All Calculators Index')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          {t('sitemap_desc', 'Explore all free online tools, converters, and calculators organized by category.')}
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('search_placeholder', 'Filter calculators...')}
          className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium shadow-xs"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => {
          const catTools = filteredTools.filter((tool) => tool.categoryId === cat.id);
          if (catTools.length === 0) return null;

          return (
            <div key={cat.id} className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white capitalize">
                  {t(`cat_${cat.id}`, cat.id)}
                </h3>
                <span className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full font-mono">
                  {catTools.length}
                </span>
              </div>
              <ul className="space-y-1.5 text-xs">
                {catTools.map((tool) => (
                  <li key={tool.id}>
                    <button
                      onClick={() => navigateTo(`tool:${tool.id}`)}
                      className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline transition-colors text-start"
                    >
                      • {t(`tool_${tool.id.replace(/-/g, '_')}_name`, tool.slug)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const NotFoundPage: React.FC = () => {
  const { t, navigateTo } = useApp();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
      <div className="text-7xl font-black text-slate-300 dark:text-slate-800">404</div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        {t('err_404_title', 'Page Not Found')}
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
        {t('err_404_desc', 'The tool or calculator you are looking for might have been relocated or is currently in development.')}
      </p>
      <button
        onClick={() => navigateTo('home')}
        className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
      >
        {t('err_404_btn', 'Return to Home Directory')}
      </button>
    </div>
  );
};
