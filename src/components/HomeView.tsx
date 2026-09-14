import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import {
  Search,
  Percent,
  Activity,
  Calendar,
  CreditCard,
  Building,
  TrendingUp,
  Receipt,
  Tag,
  ArrowLeftRight,
  Coins,
  GraduationCap,
  Flame,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe2,
  ChevronDown,
  Sparkles,
  Lock,
  Clock,
  Fuel,
  Monitor,
  Leaf,
  Key,
  Calculator,
  FileText,
  Scale,
  DollarSign,
  Home,
  CalendarDays,
  Car,
  PiggyBank,
  Droplet,
  HeartPulse,
  Square,
  Box,
  Dice5,
  Binary,
  Triangle,
  Thermometer,
  HardDrive,
  Timer,
  Briefcase,
  Type,
  Code,
  Globe,
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Percent,
  Activity,
  Calendar,
  CreditCard,
  Building,
  TrendingUp,
  Receipt,
  Tag,
  ArrowLeftRight,
  Coins,
  GraduationCap,
  Flame,
  Clock,
  Fuel,
  Monitor,
  Leaf,
  Key,
  Calculator,
  FileText,
  Scale,
  DollarSign,
  Home,
  CalendarDays,
  Car,
  PiggyBank,
  Droplet,
  HeartPulse,
  Square,
  Box,
  Dice5,
  Binary,
  Triangle,
  Thermometer,
  Zap,
  HardDrive,
  Timer,
  Briefcase,
  Type,
  Code,
  Globe,
};

export const HomeView: React.FC = () => {
  const { t, navigateTo, searchQuery, setSearchQuery, isRTL, favorites } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const favoritedTools = TOOLS.filter((item) => favorites.includes(item.id));
  const popularTools = TOOLS.filter((item) => item.popular).slice(0, 8);

  const faqs = [
    { q: t('faq_q1'), a: t('faq_a1') },
    { q: t('faq_q2'), a: t('faq_a2') },
    { q: t('faq_q3'), a: t('faq_a3') },
    { q: t('faq_q4'), a: t('faq_a4') },
    { q: t('faq_q5'), a: t('faq_a5') },
  ];

  const quickSearchTags = [
    { label: t('tool_bmi_name'), query: 'bmi' },
    { label: t('tool_loan_name'), query: 'loan' },
    { label: t('tool_percentage_name'), query: 'percentage' },
    { label: t('tool_age_name'), query: 'age' },
    { label: t('tool_mortgage_name'), query: 'mortgage' },
    { label: t('tool_tip_name'), query: 'tip' },
  ];

  return (
    <div className="space-y-16 py-8 md:py-12">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold shadow-xs animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          <span>{t('hero_badge', '100% Free • Fast • Zero Sign-Up Required')}</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {t('hero_title', 'Free tools for everyday calculations')}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t('hero_subtitle', 'Calculate, convert, and solve everyday problems with fast, simple, and accurate tools.')}
          </p>
        </div>

        {/* Hero Search Box */}
        <div className="max-w-2xl mx-auto pt-2">
          <div className="relative shadow-lg shadow-slate-200/50 dark:shadow-none rounded-2xl">
            <div className="absolute inset-y-0 start-0 ps-4 flex items-center pointer-events-none text-emerald-600">
              <Search className="w-5 h-5" />
            </div>
            <input
              id="hero-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('hero_search_placeholder', 'What would you like to calculate today?')}
              className="w-full ps-12 pe-4 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-2xl text-sm md:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden transition-all"
            />
          </div>

          {/* Quick Filter Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-semibold">{t('hero_search_hints', 'Try:')}</span>
            {quickSearchTags.map((tag, idx) => (
              <button
                key={idx}
                onClick={() => setSearchQuery(tag.query)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 rounded-lg transition-colors cursor-pointer"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pinned Favorites Section */}
      {favoritedTools.length > 0 && !searchQuery.trim() && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
            <Sparkles className="w-4 h-4 fill-amber-500 text-amber-500" />
            <h2 className="text-sm font-bold text-amber-900 dark:text-amber-300">{t('lbl_favorites', 'Your Pinned Calculators')}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {favoritedTools.map((tool) => {
              const IconComp = ICON_MAP[tool.iconName] || Calculator;
              return (
                <button
                  key={tool.id}
                  onClick={() => navigateTo(`tool:${tool.id}`)}
                  className="p-3 bg-amber-50/60 dark:bg-amber-950/20 hover:bg-amber-100/80 dark:hover:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 rounded-xl flex items-center gap-3 text-start transition-all cursor-pointer"
                >
                  <div className="p-2 bg-amber-500 text-white rounded-lg shadow-xs">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {t(`tool_${tool.id.replace(/-/g, '_')}_name`)}
                    </div>
                    <div className="text-[10px] text-amber-800 dark:text-amber-300 font-medium truncate">
                      ★ {t('btn_pinned', 'Pinned')}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Popular Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {t('lbl_popular_tools', 'Most Popular Calculators')}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              {t('popular_tools_desc', 'Everyday tools used by thousands of professionals, students, and families.')}
            </p>
          </div>
          <button
            onClick={() => navigateTo('tools')}
            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{t('lbl_view_all', 'View All')}</span>
            <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularTools.map((tool) => {
            const IconComponent = ICON_MAP[tool.iconName] || Percent;
            return (
              <button
                key={tool.id}
                id={`popular-card-${tool.id}`}
                onClick={() => navigateTo(`tool:${tool.id}`)}
                className="group p-5 bg-white dark:bg-slate-900 hover:bg-slate-50/80 dark:hover:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 text-start space-y-3 transition-all shadow-xs hover:shadow-md cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {t(`tool_${tool.id.replace(/-/g, '_')}_name`)}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                    {t(`tool_${tool.id.replace(/-/g, '_')}_desc`)}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('lbl_categories', 'Explore by Category')}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
            {t('categories_desc', 'Organized directories covering finances, health, conversion, and general math.')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => {
            const count = TOOLS.filter((toolItem) => toolItem.categoryId === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => navigateTo(`category:${cat.id}`)}
                className="p-5 bg-white dark:bg-slate-900 hover:bg-emerald-50/40 dark:hover:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 text-start space-y-2 transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                    {t(`cat_${cat.id.replace('-', '_')}`)}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md font-mono text-slate-700 dark:text-slate-300 font-semibold">
                    {count} {t('lbl_tools_count', 'tools')}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                  {t(`cat_${cat.id.replace('-', '_')}_desc`)}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Why Calcyfy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 bg-slate-100 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
              {t('why_title', 'Why Calcyfy?')}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
              {t('why_desc', 'Built from first principles for people who need exact answers without friction.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-emerald-600 flex items-center justify-center shadow-xs">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {t('why_fast_title', 'Instant Answers')}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('why_fast_desc', 'No loading spinners or sluggish calculations. Every number updates in real-time as you type.')}
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-emerald-600 flex items-center justify-center shadow-xs">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {t('why_privacy_title', 'Guaranteed Privacy')}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('why_privacy_desc', 'Zero server-side transmission. Your data stays entirely contained in your local browser session.')}
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-emerald-600 flex items-center justify-center shadow-xs">
                <Globe2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {t('why_global_title', 'Global i18n & RTL')}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('why_global_desc', 'Complete bidirectional RTL support for Arabic along with English, Spanish, French, and German.')}
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-emerald-600 flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {t('why_math_title', 'Mathematical Rigor')}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('why_math_desc', 'Grounded in recognized financial, medical, and scientific equations with explicit formulas shown.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-3xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {t('faq_title', 'Frequently Asked Questions')}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('faq_desc', 'Common questions regarding accuracy, privacy, and usage.')}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-4 flex items-center justify-between text-start text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    openFaqIndex === idx ? 'rotate-180 text-emerald-500' : ''
                  }`}
                />
              </button>
              {openFaqIndex === idx && (
                <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
