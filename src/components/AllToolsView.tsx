import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import { CategoryId } from '../types';
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

interface AllToolsViewProps {
  initialCategory?: CategoryId | null;
}

export const AllToolsView: React.FC<AllToolsViewProps> = ({ initialCategory }) => {
  const { t, navigateTo, searchQuery, setSearchQuery, isRTL } = useApp();
  const [selectedCat, setSelectedCat] = useState<CategoryId | 'all'>(
    initialCategory || 'all'
  );

  const filteredTools = TOOLS.filter((tool) => {
    const matchesCategory = selectedCat === 'all' || tool.categoryId === selectedCat;

    if (!searchQuery.trim()) return matchesCategory;

    const q = searchQuery.toLowerCase().trim();
    const name = t(`tool_${tool.id.replace('-', '_')}_name`).toLowerCase();
    const desc = t(`tool_${tool.id.replace('-', '_')}_desc`).toLowerCase();

    const matchesSearch =
      name.includes(q) ||
      desc.includes(q) ||
      tool.id.includes(q) ||
      tool.slug.includes(q);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {t('nav_all_tools', 'Directory of All Calculators & Tools')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t('hero_description', 'Browse our collection of 100% free, fast, and privacy-focused calculators.')}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 scrollbar-none">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCat === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {t('lbl_all_tools_tab', 'All Tools')} ({TOOLS.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = TOOLS.filter((tItem) => tItem.categoryId === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCat === cat.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {t(`cat_${cat.id.replace('-', '_')}`)} ({count})
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative min-w-[260px]">
          <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('lbl_filter_tools', 'Filter calculators...')}
            className="w-full ps-9 pe-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="p-12 text-center bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p className="text-sm font-semibold text-slate-500">
            {t('lbl_no_tools_found', 'No calculators found matching your filter criteria.')}
          </p>
          <button
            onClick={() => {
              setSelectedCat('all');
              setSearchQuery('');
            }}
            className="mt-3 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg"
          >
            {t('lbl_reset_filters', 'Reset Filters')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => {
            const IconComponent = ICON_MAP[tool.iconName] || Percent;
            const cat = CATEGORIES.find((c) => c.id === tool.categoryId);
            return (
              <button
                key={tool.id}
                onClick={() => navigateTo(`tool:${tool.id}`)}
                className="group p-5 bg-white dark:bg-slate-900 hover:bg-slate-50/80 dark:hover:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 text-start flex flex-col justify-between transition-all shadow-xs hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    {cat && (
                      <span className="text-[11px] font-semibold text-slate-400 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md">
                        {t(`cat_${cat.id.replace('-', '_')}`)}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {t(`tool_${tool.id.replace('-', '_')}_name`)}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {t(`tool_${tool.id.replace('-', '_')}_desc`)}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>{t('lbl_open_tool', 'Open Calculator')}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
