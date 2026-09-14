import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Tool } from '../types';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import {
  ChevronRight,
  Share2,
  Printer,
  Check,
  BookOpen,
  Lightbulb,
  Star,
  Code,
  Copy,
  X,
  HelpCircle,
  FileText,
} from 'lucide-react';
import { NotFoundPage } from './StaticPages';
import { executePrint } from '../utils/printHelper';
import { ToolSeoContent } from './ToolSeoContent';

// Specific Calculators
import { PercentageCalculator } from './calculators/PercentageCalculator';
import { BmiCalculator } from './calculators/BmiCalculator';
import { AgeCalculator } from './calculators/AgeCalculator';
import { LoanCalculator } from './calculators/LoanCalculator';
import { MortgageCalculator } from './calculators/MortgageCalculator';
import { CompoundInterestCalculator } from './calculators/CompoundInterestCalculator';
import { TipCalculator } from './calculators/TipCalculator';
import { DiscountCalculator } from './calculators/DiscountCalculator';
import { UnitConverter } from './calculators/UnitConverter';
import { CurrencyConverter } from './calculators/CurrencyConverter';
import { GpaCalculator } from './calculators/GpaCalculator';
import { CalorieCalculator } from './calculators/CalorieCalculator';
import { TaxCalculator } from './calculators/TaxCalculator';
import { SalaryCalculator } from './calculators/SalaryCalculator';
import { ScientificCalculator } from './calculators/ScientificCalculator';
import { DateDiffCalculator } from './calculators/DateDiffCalculator';
import { WordCountCalculator } from './calculators/WordCountCalculator';
import { PasswordGenerator } from './calculators/PasswordGenerator';
import { RoiCagrCalculator } from './calculators/RoiCagrCalculator';
import { CryptoProfitCalculator } from './calculators/CryptoProfitCalculator';
import { TimeZoneCalculator } from './calculators/TimeZoneCalculator';
import { FuelCostCalculator } from './calculators/FuelCostCalculator';
import { BodyFatCalculator } from './calculators/BodyFatCalculator';
import { AspectRatioCalculator } from './calculators/AspectRatioCalculator';
import { CarbonFootprintCalculator } from './calculators/CarbonFootprintCalculator';
import { SuiteCalculators } from './calculators/SuiteCalculators';

interface ToolPageProps {
  tool?: Tool;
  toolId?: string;
}

export const ToolPage: React.FC<ToolPageProps> = ({ tool: toolProp, toolId }) => {
  const { t, navigateTo, isRTL, lang, isFavorite, toggleFavorite } = useApp();
  const [copiedShare, setCopiedShare] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  // Resolve tool from prop or by toolId / slug lookup
  const tool =
    toolProp ||
    (toolId ? TOOLS.find((item) => item.id === toolId || item.slug === toolId) : undefined);

  if (!tool) {
    return <NotFoundPage />;
  }

  const category = CATEGORIES.find((c) => c.id === tool.categoryId);
  const toolName = t(`tool_${tool.id.replace('-', '_')}_name`);
  const toolDesc = t(`tool_${tool.id.replace('-', '_')}_desc`);
  const categoryName = category ? t(`cat_${category.id.replace('-', '_')}`) : 'Calculator';

  const relatedTools = TOOLS.filter(
    (tItem) => tItem.categoryId === tool.categoryId && tItem.id !== tool.id
  ).slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: toolName,
          text: toolDesc,
          url: window.location.href,
        });
      } catch {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2000);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handlePrint = () => {
    setIsPrinting(true);
    try {
      executePrint({
        title: toolName,
        category: categoryName,
        elementId: 'tool-calculator-container',
        lang,
        isRTL,
      });
    } finally {
      setTimeout(() => setIsPrinting(false), 1500);
    }
  };

  const renderCalculator = () => {
    switch (tool.id) {
      case 'percentage':
        return <PercentageCalculator tool={tool} />;
      case 'bmi':
        return <BmiCalculator tool={tool} />;
      case 'age':
        return <AgeCalculator tool={tool} />;
      case 'loan':
        return <LoanCalculator tool={tool} />;
      case 'mortgage':
        return <MortgageCalculator tool={tool} />;
      case 'compound-interest':
        return <CompoundInterestCalculator tool={tool} />;
      case 'tip':
        return <TipCalculator tool={tool} />;
      case 'discount':
        return <DiscountCalculator tool={tool} />;
      case 'unit-converter':
        return <UnitConverter tool={tool} />;
      case 'currency':
        return <CurrencyConverter tool={tool} />;
      case 'gpa':
        return <GpaCalculator tool={tool} />;
      case 'calorie':
        return <CalorieCalculator tool={tool} />;
      case 'tax':
        return <TaxCalculator tool={tool} />;
      case 'salary':
        return <SalaryCalculator tool={tool} />;
      case 'scientific':
        return <ScientificCalculator tool={tool} />;
      case 'date-diff':
        return <DateDiffCalculator tool={tool} />;
      case 'word-count':
        return <WordCountCalculator tool={tool} />;
      case 'password':
        return <PasswordGenerator tool={tool} />;
      case 'roi-cagr':
        return <RoiCagrCalculator tool={tool} />;
      case 'crypto-profit':
        return <CryptoProfitCalculator tool={tool} />;
      case 'time-zone':
        return <TimeZoneCalculator tool={tool} />;
      case 'fuel-cost':
        return <FuelCostCalculator tool={tool} />;
      case 'body-fat':
        return <BodyFatCalculator tool={tool} />;
      case 'aspect-ratio':
        return <AspectRatioCalculator tool={tool} />;
      case 'carbon-footprint':
        return <CarbonFootprintCalculator tool={tool} />;
      case 'simple-interest':
      case 'auto-loan':
      case 'savings-goal':
      case 'markup':
      case 'ideal-weight':
      case 'water-intake':
      case 'target-heart-rate':
      case 'bmr':
      case 'fraction':
      case 'ratio':
      case 'area-perimeter':
      case 'volume':
      case 'random-number':
      case 'prime-checker':
      case 'pythagoras':
      case 'binary-hex':
      case 'temperature':
      case 'speed-distance':
      case 'data-size':
      case 'chronometer-timer':
      case 'work-shift-hours':
      case 'case-converter':
      case 'json-formatter':
      case 'base64-encode':
      case 'url-encoder':
        return <SuiteCalculators toolId={tool.id} tool={tool} />;
      default:
        return <SuiteCalculators toolId={tool.id} tool={tool} />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 no-print">
        <button
          onClick={() => navigateTo('home')}
          className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          {t('nav_home', 'Home')}
        </button>
        <ChevronRight className={`w-3 h-3 text-slate-400 ${isRTL ? 'rotate-180' : ''}`} />
        <button
          onClick={() => navigateTo('tools')}
          className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          {t('nav_all_tools', 'All Tools')}
        </button>
        {category && (
          <>
            <ChevronRight className={`w-3 h-3 text-slate-400 ${isRTL ? 'rotate-180' : ''}`} />
            <button
              onClick={() => navigateTo(`category:${category.id}`)}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              {categoryName}
            </button>
          </>
        )}
        <ChevronRight className={`w-3 h-3 text-slate-400 ${isRTL ? 'rotate-180' : ''}`} />
        <span className="font-semibold text-slate-900 dark:text-white truncate">
          {toolName}
        </span>
      </nav>

      {/* Tool Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold rounded-md">
              {categoryName}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {toolName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            {toolDesc}
          </p>
        </div>

        {/* Share, Favorite, Embed & Print Utility Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto no-print">
          <button
            onClick={() => toggleFavorite(tool.id)}
            title={isFavorite(tool.id) ? "Remove from Favorites" : "Pin to Favorites"}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              isFavorite(tool.id)
                ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Star className={`w-4 h-4 ${isFavorite(tool.id) ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>{isFavorite(tool.id) ? t('btn_favorited', 'Pinned') : t('btn_favorite', 'Favorite')}</span>
          </button>

          <button
            onClick={() => setShowEmbedModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition-colors"
          >
            <Code className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{t('btn_embed', 'Embed Widget')}</span>
          </button>

          <button
            id="tool-share-btn"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition-colors"
          >
            {copiedShare ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            <span>{copiedShare ? t('btn_copied', 'Copied!') : t('btn_share', 'Share')}</span>
          </button>

          <button
            id="tool-print-btn"
            onClick={handlePrint}
            disabled={isPrinting}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition-colors disabled:opacity-50"
          >
            <Printer className="w-4 h-4" />
            <span>{isPrinting ? t('btn_print', 'Printing...') : t('btn_print', 'Print PDF')}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Tool Container */}
      <div id="tool-calculator-container" className="space-y-4">
        {renderCalculator()}
      </div>

      {/* Explanatory Educational Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        {/* How to use */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
            <BookOpen className="w-4 h-4 text-emerald-500" />
            <h3>{t('lbl_how_to_use', 'How to Use This Calculator')}</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {t('why_simple_desc', 'Enter your known parameters into the labeled inputs. The calculation engine computes results in real-time as you type, offering instant feedback and copyable summary metrics.')}
          </p>
          <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1.5 list-disc ps-4">
            <li>{t('why_fast_desc', 'Inputs update instantly with no page reloads.')}</li>
            <li>{t('why_global_desc', 'Use the unit toggle to switch between Metric and Imperial where applicable.')}</li>
            <li>{t('why_math_desc', 'Click the "Copy" button to copy formatted answers to your clipboard.')}</li>
          </ul>
        </div>

        {/* Mathematical Rigor */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
            <Lightbulb className="w-4 h-4 text-emerald-500" />
            <h3>{t('lbl_accuracy_title', 'Accuracy & Mathematical Standard')}</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {t('about_principle_1', 'All calculations are verified against official standards (such as the World Health Organization BMI thresholds and standard compound amortization formulas).')}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('why_privacy_desc', 'Calculations are executed client-side inside your browser for maximum privacy and zero data leakage.')}
          </p>
        </div>
      </div>

      {/* Professional SEO Editorial & FAQ Guide */}
      <ToolSeoContent
        tool={tool}
        toolName={toolName}
        toolDesc={toolDesc}
        categoryName={categoryName}
      />

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800 no-print">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {t('lbl_more_in_category', 'More in this category')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedTools.map((rel) => (
              <button
                key={rel.id}
                onClick={() => navigateTo(`tool:${rel.id}`)}
                className="p-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-800 text-start space-y-1 transition-all group"
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  {t(`tool_${rel.id.replace('-', '_')}_name`)}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {t(`tool_${rel.id.replace('-', '_')}_desc`)}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Embed Modal Popover */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowEmbedModal(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                <Code className="w-5 h-5" />
                <h3>{t('embed_title', 'Embed This Calculator on Your Website')}</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('embed_subtitle', 'Copy and paste the HTML snippet below into your blog, WordPress, or HTML website.')}
              </p>
            </div>

            <div className="relative">
              <textarea
                readOnly
                rows={4}
                value={`<iframe src="${window.location.origin}/#tool:${tool.id}" width="100%" height="520" frameborder="0" style="border: 1px solid #e2e8f0; border-radius: 12px;" title="${toolName}"></iframe>`}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs text-slate-800 dark:text-slate-200 resize-none focus:outline-hidden"
              />
              <button
                onClick={() => {
                  const code = `<iframe src="${window.location.origin}/#tool:${tool.id}" width="100%" height="520" frameborder="0" style="border: 1px solid #e2e8f0; border-radius: 12px;" title="${toolName}"></iframe>`;
                  navigator.clipboard.writeText(code);
                  setCopiedEmbed(true);
                  setTimeout(() => setCopiedEmbed(false), 2000);
                }}
                className="absolute top-2 right-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
              >
                {copiedEmbed ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedEmbed ? t('btn_copied', 'Copied!') : t('btn_copy_code', 'Copy HTML Code')}
              </button>
            </div>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 rounded-xl text-xs text-emerald-800 dark:text-emerald-300">
              ⚡ <strong>{t('embed_responsive', 'Fully Responsive & Light Weight')}:</strong> {t('embed_note', 'The widget automatically adjusts to your container width and stays updated with Calcyfy math engines.')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
