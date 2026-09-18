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
import { AppLink } from './common/AppLink';
import { getToolName, getToolDescription } from '../utils/toolMetadata';

// Lazy Loaded Calculators for Peak Performance & Instant First Load
const PercentageCalculator = React.lazy(() =>
  import('./calculators/PercentageCalculator').then((m) => ({ default: m.PercentageCalculator }))
);
const BmiCalculator = React.lazy(() =>
  import('./calculators/BmiCalculator').then((m) => ({ default: m.BmiCalculator }))
);
const AgeCalculator = React.lazy(() =>
  import('./calculators/AgeCalculator').then((m) => ({ default: m.AgeCalculator }))
);
const LoanCalculator = React.lazy(() =>
  import('./calculators/LoanCalculator').then((m) => ({ default: m.LoanCalculator }))
);
const MortgageCalculator = React.lazy(() =>
  import('./calculators/MortgageCalculator').then((m) => ({ default: m.MortgageCalculator }))
);
const CompoundInterestCalculator = React.lazy(() =>
  import('./calculators/CompoundInterestCalculator').then((m) => ({ default: m.CompoundInterestCalculator }))
);
const TipCalculator = React.lazy(() =>
  import('./calculators/TipCalculator').then((m) => ({ default: m.TipCalculator }))
);
const DiscountCalculator = React.lazy(() =>
  import('./calculators/DiscountCalculator').then((m) => ({ default: m.DiscountCalculator }))
);
const UnitConverter = React.lazy(() =>
  import('./calculators/UnitConverter').then((m) => ({ default: m.UnitConverter }))
);
const CurrencyConverter = React.lazy(() =>
  import('./calculators/CurrencyConverter').then((m) => ({ default: m.CurrencyConverter }))
);
const GpaCalculator = React.lazy(() =>
  import('./calculators/GpaCalculator').then((m) => ({ default: m.GpaCalculator }))
);
const CalorieCalculator = React.lazy(() =>
  import('./calculators/CalorieCalculator').then((m) => ({ default: m.CalorieCalculator }))
);
const TaxCalculator = React.lazy(() =>
  import('./calculators/TaxCalculator').then((m) => ({ default: m.TaxCalculator }))
);
const SalaryCalculator = React.lazy(() =>
  import('./calculators/SalaryCalculator').then((m) => ({ default: m.SalaryCalculator }))
);
const ScientificCalculator = React.lazy(() =>
  import('./calculators/ScientificCalculator').then((m) => ({ default: m.ScientificCalculator }))
);
const DateDiffCalculator = React.lazy(() =>
  import('./calculators/DateDiffCalculator').then((m) => ({ default: m.DateDiffCalculator }))
);
const WordCountCalculator = React.lazy(() =>
  import('./calculators/WordCountCalculator').then((m) => ({ default: m.WordCountCalculator }))
);
const PasswordGenerator = React.lazy(() =>
  import('./calculators/PasswordGenerator').then((m) => ({ default: m.PasswordGenerator }))
);
const RoiCagrCalculator = React.lazy(() =>
  import('./calculators/RoiCagrCalculator').then((m) => ({ default: m.RoiCagrCalculator }))
);
const CryptoProfitCalculator = React.lazy(() =>
  import('./calculators/CryptoProfitCalculator').then((m) => ({ default: m.CryptoProfitCalculator }))
);
const TimeZoneCalculator = React.lazy(() =>
  import('./calculators/TimeZoneCalculator').then((m) => ({ default: m.TimeZoneCalculator }))
);
const FuelCostCalculator = React.lazy(() =>
  import('./calculators/FuelCostCalculator').then((m) => ({ default: m.FuelCostCalculator }))
);
const BodyFatCalculator = React.lazy(() =>
  import('./calculators/BodyFatCalculator').then((m) => ({ default: m.BodyFatCalculator }))
);
const AspectRatioCalculator = React.lazy(() =>
  import('./calculators/AspectRatioCalculator').then((m) => ({ default: m.AspectRatioCalculator }))
);
const CarbonFootprintCalculator = React.lazy(() =>
  import('./calculators/CarbonFootprintCalculator').then((m) => ({ default: m.CarbonFootprintCalculator }))
);
const SuiteCalculators = React.lazy(() =>
  import('./calculators/SuiteCalculators').then((m) => ({ default: m.SuiteCalculators }))
);

// P0 Domain Engines
const LoanAmortizationEngine = React.lazy(() =>
  import('./calculators/domainEngines/finance/LoanAmortizationEngine').then((m) => ({ default: m.LoanAmortizationEngine }))
);
const ValuationMetricsEngine = React.lazy(() =>
  import('./calculators/domainEngines/finance/ValuationMetricsEngine').then((m) => ({ default: m.ValuationMetricsEngine }))
);
const InvestmentTaxEngine = React.lazy(() =>
  import('./calculators/domainEngines/finance/InvestmentTaxEngine').then((m) => ({ default: m.InvestmentTaxEngine }))
);
const CardiovascularEngine = React.lazy(() =>
  import('./calculators/domainEngines/health/CardiovascularEngine').then((m) => ({ default: m.CardiovascularEngine }))
);
const ClinicalMetabolicEngine = React.lazy(() =>
  import('./calculators/domainEngines/health/ClinicalMetabolicEngine').then((m) => ({ default: m.ClinicalMetabolicEngine }))
);
const FitnessCalorieEngine = React.lazy(() =>
  import('./calculators/domainEngines/health/FitnessCalorieEngine').then((m) => ({ default: m.FitnessCalorieEngine }))
);
const NutritionBiometricsEngine = React.lazy(() =>
  import('./calculators/domainEngines/health/NutritionBiometricsEngine').then((m) => ({ default: m.NutritionBiometricsEngine }))
);
const PregnancySleepEngine = React.lazy(() =>
  import('./calculators/domainEngines/health/PregnancySleepEngine').then((m) => ({ default: m.PregnancySleepEngine }))
);
const ElectricalPhysicsEngine = React.lazy(() =>
  import('./calculators/domainEngines/engineering/ElectricalPhysicsEngine').then((m) => ({ default: m.ElectricalPhysicsEngine }))
);
const StructuralTradeEngine = React.lazy(() =>
  import('./calculators/domainEngines/engineering/StructuralTradeEngine').then((m) => ({ default: m.StructuralTradeEngine }))
);

// P1 Wave 1 Domain Engines
const UnitConverterDomainEngine = React.lazy(() =>
  import('./calculators/domainEngines/converters/UnitConverterDomainEngine').then((m) => ({ default: m.UnitConverterDomainEngine }))
);
const MathDomainEngine = React.lazy(() =>
  import('./calculators/domainEngines/math/MathDomainEngine').then((m) => ({ default: m.MathDomainEngine }))
);
const FinanceDomainEngine = React.lazy(() =>
  import('./calculators/domainEngines/finance/FinanceDomainEngine').then((m) => ({ default: m.FinanceDomainEngine }))
);
const DeveloperDomainEngine = React.lazy(() =>
  import('./calculators/domainEngines/developer/DeveloperDomainEngine').then((m) => ({ default: m.DeveloperDomainEngine }))
);

// P1 Wave 2 Domain Engines
const DeveloperToolsEngine = React.lazy(() =>
  import('./calculators/domainEngines/developer/DeveloperToolsEngine').then((m) => ({ default: m.DeveloperToolsEngine }))
);
const TextAnalyticsEngine = React.lazy(() =>
  import('./calculators/domainEngines/text/TextAnalyticsEngine').then((m) => ({ default: m.TextAnalyticsEngine }))
);
const HealthFitnessEngine = React.lazy(() =>
  import('./calculators/domainEngines/health/HealthFitnessEngine').then((m) => ({ default: m.HealthFitnessEngine }))
);
const DateTimeEngine = React.lazy(() =>
  import('./calculators/domainEngines/date/DateTimeEngine').then((m) => ({ default: m.DateTimeEngine }))
);

// Finance & Investment Domain Engines
const CorporateValuationEngine = React.lazy(() =>
  import('./calculators/domainEngines/finance/CorporateValuationEngine').then((m) => ({ default: m.CorporateValuationEngine }))
);
const InvestmentMarketEngine = React.lazy(() =>
  import('./calculators/domainEngines/finance/InvestmentMarketEngine').then((m) => ({ default: m.InvestmentMarketEngine }))
);
const RealEstatePersonalFinanceEngine = React.lazy(() =>
  import('./calculators/domainEngines/finance/RealEstatePersonalFinanceEngine').then((m) => ({ default: m.RealEstatePersonalFinanceEngine }))
);
const CryptoForexCurrencyEngine = React.lazy(() =>
  import('./calculators/domainEngines/finance/CryptoForexCurrencyEngine').then((m) => ({ default: m.CryptoForexCurrencyEngine }))
);

const CalculatorSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 animate-pulse space-y-6">
    <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/3"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="h-12 bg-slate-100 dark:bg-slate-800/60 rounded-xl"></div>
      <div className="h-12 bg-slate-100 dark:bg-slate-800/60 rounded-xl"></div>
    </div>
    <div className="h-28 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl"></div>
  </div>
);

interface ToolPageProps {
  tool?: Tool;
  toolId?: string;
}

export const ToolPage: React.FC<ToolPageProps> = ({ tool: toolProp, toolId }) => {
  const {
    t,
    navigateTo,
    isRTL,
    lang,
    isFavorite,
    toggleFavorite,
    getHomeUrl,
    getCategoryUrl,
    getToolUrl,
  } = useApp();
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
  const toolName = getToolName(tool, lang, t);
  const toolDesc = getToolDescription(tool, lang, t);
  const categoryName = category ? t(`cat_${category.id.replace(/-/g, '_')}`) : 'Calculator';

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
      case 'currency-converter-live':
      case 'gold-price-per-gram-ounce':
      case 'silver-price-per-ounce':
      case 'platinum-metal-price':
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
      case 'cagr-calculator':
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
      
      // P0 Finance: Loan Amortization Sub-Engine
      case 'loan-refinance':
      case 'mortgage-payoff':
      case 'loan-amortization-schedule':
      case 'balloon-payment-loan':
      case 'arm-mortgage-calc':
      case 'jumbo-mortgage-calc':
      case 'fha-loan-calc':
      case 'va-loan-calc':
      case 'auto-loan-early-payoff':
      case 'extra-payment-mortgage':
      case 'arm-vs-fixed-rate':
      case 'biweekly-mortgage-savings':
      case 'fha-vs-conventional':
      case 'boat-rv-loan':
      case 'business-loan-dscr':
      case 'bridge-loan-interest':
      case 'commercial-mortgage-balloon':
      case 'heloc-interest-only':
      case 'interest-only-mortgage':
      case 'land-lot-loan':
      case 'manufactured-home-loan':
        return <LoanAmortizationEngine tool={tool} />;

      // P0 Finance: Valuation & Stock Metrics Sub-Engine
      case 'dscr-calculator':
      case 'working-capital-ratio':
      case 'pe-ratio-valuation':
      case 'pb-ratio-valuation':
      case 'ps-ratio-valuation':
      case 'free-cash-flow-fcf':
      case 'stock-split-calculator':
      case 'stock-split-ratio':
      case 'reverse-stock-split':
      case 'forward-stock-split':
      case 'ebitda-multiple-valuation':
      case 'dcf-terminal-value':
        return <ValuationMetricsEngine tool={tool} />;

      // P0 Finance: Investment & Tax Sub-Engine
      case 'cagr-calculator':
      case 'dividend-reinvestment-drip':
      case 'capital-gains-tax':
      case 'safe-withdrawal-rate':
      case 'social-security-break-even':
      case 'rsu-stock-option-tax':
      case 'fire-financial-independence':
      case 'hsa-triple-tax-advantage':
      case 'crypto-tax-fifo-hifo':
      case 'options-black-scholes':
      case 'treasury-yield-curve':
        return <InvestmentTaxEngine tool={tool} />;

      // P0 Health: Cardiovascular Sub-Engine
      case 'vo2-max-calculator':
      case 'heart-rate-reserve':
      case 'maximum-heart-rate':
      case 'blood-pressure-cat':
      case 'mean-arterial-pressure':
      case 'resting-heart-rate-norm':
        return <CardiovascularEngine tool={tool} />;

      // P0 Health: Clinical & Metabolic Sub-Engine
      case 'blood-sugar-a1c':
      case 'cholesterol-ratio':
      case 'kidney-gfr-calculator':
      case 'creatinine-clearance':
      case 'body-surface-area':
      case 'dosage-by-weight':
      case 'iv-drip-rate':
      case 'fluid-maintenance':
      case 'insulin-carb-ratio':
      case 'alcohol-elimination-time':
      case 'smoking-pack-years':
      case 'glycemic-index-lookup':
        return <ClinicalMetabolicEngine tool={tool} />;

      // P0 Health: Fitness & Calorie Sub-Engine
      case 'calories-burned-swimming':
      case 'calories-burned-cycling':
      case 'calories-burned-jump-rope':
      case 'calories-burned-walking':
      case 'calories-burned-weightlifting':
      case 'wilks-score-powerlifting':
      case 'ipf-points-calculator':
      case 'run-race-time-predictor':
      case 'swim-pace-swolf':
      case 'ergometer-concept2-pace':
      case 'treadmill-grade-equivalent':
      case 'vertical-jump-power':
      case 'grip-strength-norm':
      case 'flexibility-sit-reach':
      case 'metabolic-equivalent-met':
        return <FitnessCalorieEngine tool={tool} />;

      // P0 Health: Nutrition & Biometrics Sub-Engine
      case 'fat-free-mass-index':
      case 'macronutrient-keto-highcarb':
      case 'water-intake-by-activity':
      case 'sweat-rate-hydration':
      case 'chest-to-waist-ratio':
        return <NutritionBiometricsEngine tool={tool} />;

      // P0 Health: Pregnancy & Sleep Sub-Engine
      case 'pregnancy-due-date':
      case 'ovulation-fertility-window':
      case 'sleep-cycle-optimal':
      case 'pregnancy-weight-gain':
      case 'fetal-weight-percentile':
      case 'ovulation-luteal-phase':
      case 'breastfeeding-calorie-need':
      case 'baby-formula-feeding':
      case 'pediatric-growth-percentile':
      case 'target-height-midparental':
        return <PregnancySleepEngine tool={tool} />;

      // P0 Engineering: Electrical & Automotive Physics Sub-Engine
      case 'voltage-drop-wire-size':
      case 'resistor-color-code-4-5-band':
      case 'transformer-winding-ratio':
      case 'solar-pv-array-sizing':
      case 'led-series-resistor':
      case 'air-fuel-ratio-engine':
      case 'brake-stopping-distance':
      case 'gear-ratio-top-speed':
      case 'tire-speedo-calibration':
      case 'solar-inverter-sizing':
        return <ElectricalPhysicsEngine tool={tool} />;

      // P0 Engineering: Structural & Trade Sub-Engine
      case 'concrete-slab-volume-bags':
      case 'concrete-volume':
      case 'beam-deflection-load':
      case 'roof-pitch-slope-rafter':
      case 'hvac-btu-room-cooling':
      case 'retaining-wall-block-estimator':
      case 'stair-stringer-riser-tread':
      case 'rebar-calculator-concrete':
      case 'stair-baluster-spacing':
        return <StructuralTradeEngine tool={tool} />;

      // P1 Wave 1: Unit Converter Domain Engine
      case 'pressure-unit':
      case 'energy-power':
      case 'angle-unit':
      case 'force-unit':
      case 'torque-unit':
        return <UnitConverterDomainEngine tool={tool} />;

      // P1 Wave 1: Math Domain Engine
      case 'matrix-mult':
      case 'matrix-determinant':
      case 'combination-permutation':
      case 'velocity-acceleration':
      case 'kinetic-energy':
        return <MathDomainEngine tool={tool} />;

      // P1 Wave 1: Finance Domain Engine
      case 'payback-period':
      case 'vat-reverse':
      case 'commission-calc':
      case 'appreciation-calc':
      case 'depreciation-straight':
      case 'debt-snowball':
        return <FinanceDomainEngine tool={tool} />;

      // P1 Wave 1: Developer Domain Engine
      case 'hash-generator':
      case 'html-entity':
      case 'resistor-color':
      case 'ohms-law':
      case 'json-minify':
      case 'url-parser':
        return <DeveloperDomainEngine tool={tool} />;

      // P1 Wave 2: Developer & Network Tools Engine
      case 'uuid-generator':
      case 'chmod-permissions':
      case 'ip-subnet-calc':
      case 'color-contrast-ratio':
      case 'jwt-decoder':
      case 'csv-to-json':
        return <DeveloperToolsEngine tool={tool} />;

      // P1 Wave 2: Text & SEO Analytics Engine
      case 'reading-time':
      case 'keyword-density-checker':
      case 'meta-description-length':
      case 'case-converter-camel-snake':
      case 'flesch-kincaid-readability':
        return <TextAnalyticsEngine tool={tool} />;

      // P1 Wave 2: Health & Fitness Engine
      case 'one-rep-max':
      case 'pace-runner':
      case 'macro-split':
      case 'blood-alcohol':
      case 'protein-intake':
        return <HealthFitnessEngine tool={tool} />;

      // P1 Wave 2: Date & Time Engine
      case 'time-duration-between':
      case 'date-add-subtract':
      case 'unix-timestamp-converter':
      case 'work-days-count':
      case 'leap-year-checker':
      case 'age-in-days-hours-seconds':
        return <DateTimeEngine tool={tool} />;

      // Finance & Corporate Valuation Engine
      case 'wacc-calculator':
      case 'npv-calculator':
      case 'irr-calculator':
      case 'ebitda-calculator':
      case 'gross-margin-calculator':
      case 'operating-margin-calculator':
      case 'ev-ebitda-multiple':
      case 'break-even':
      case 'break-even-point':
      case 'saas-mrr-arr-calc':
      case 'cac-ltv-ratio':
      case 'burn-rate-runway':
      case 'inventory-turnover':
      case 'quick-ratio-acid-test':
      case 'roce-calculator':
      case 'roe-calculator':
      case 'roa-calculator':
      case 'per-share-earnings':
        return <CorporateValuationEngine tool={tool} />;

      // Finance & Investment Market Engine
      case 'roi-calculator':
      case 'rule-of-72':
      case 'bond-yield-to-maturity':
      case 'treasury-bill-yield':
      case 'cd-ladder-calculator':
      case 'stock-beta-volatility':
      case 'sharpe-ratio-calc':
      case 'net-worth':
      case 'dividend-yield':
      case 'stock-dividend-yield':
      case 'inflation-impact':
      case 'inflation-future':
      case 'college-savings':
      case '401k-retirement':
        return <InvestmentMarketEngine tool={tool} />;

      // Real Estate & Personal Finance Engine
      case 'cap-rate':
      case 'rental-yield':
      case 'rental-property-yield':
      case 'heloc-payment-calc':
      case 'pmi-calculator':
      case 'closing-costs-calc':
      case 'debt-payoff':
      case 'compound-monthly':
      case 'freelance-rate':
      case 'freelance-rate-calc':
      case 'vat-tax':
      case 'salary-hourly':
        return <RealEstatePersonalFinanceEngine tool={tool} />;

      // Crypto, Forex & Currency Engine
      case 'crypto-profit-loss-calc':
      case 'crypto-dca-calculator':
      case 'crypto-impermanent-loss':
      case 'bitcoin-mining-profit':
      case 'ethereum-gas-fee-converter':
      case 'sats-to-bitcoin-usd':
      case 'crypto-market-cap-rank':
      case 'crypto-staking-rewards':
      case 'currency-crypto':
      case 'forex-pip-value-calculator':
      case 'forex-position-size-risk':
      case 'forex-margin-calculator':
      case 'forex-pivot-points-calc':
      case 'zakat-calculator-islamic':
      case 'currency-inflation-purchasing':
      case 'salary-tax-take-home':
      case 'sales-tax-by-state-country':
      case 'travel-budget-daily-expense':
        return <CryptoForexCurrencyEngine tool={tool} />;

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
        <AppLink
          href={getHomeUrl()}
          className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          {t('nav_home', 'Home')}
        </AppLink>
        <ChevronRight className={`w-3 h-3 text-slate-400 ${isRTL ? 'rotate-180' : ''}`} />
        <AppLink
          href={`/${lang}/tools`}
          className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          {t('nav_all_tools', 'All Tools')}
        </AppLink>
        {category && (
          <>
            <ChevronRight className={`w-3 h-3 text-slate-400 ${isRTL ? 'rotate-180' : ''}`} />
            <AppLink
              href={getCategoryUrl(category.slug)}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              {categoryName}
            </AppLink>
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
      <div id="tool-calculator-container" className="space-y-4 min-h-[300px]">
        <React.Suspense fallback={<CalculatorSkeleton />}>
          {renderCalculator()}
        </React.Suspense>
      </div>

      {/* Explanatory Educational Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        {/* How to use */}
        <section className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
            <BookOpen className="w-4 h-4 text-emerald-500" />
            <h2 className="text-sm font-bold">{t('lbl_how_to_use', 'How to Use This Calculator')}</h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {t('why_simple_desc', 'Enter your known parameters into the labeled inputs. The calculation engine computes results in real-time as you type, offering instant feedback and copyable summary metrics.')}
          </p>
          <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc ps-4">
            <li>{t('why_fast_desc', 'Inputs update instantly with no page reloads.')}</li>
            <li>{t('why_global_desc', 'Use the unit toggle to switch between Metric and Imperial where applicable.')}</li>
            <li>{t('why_math_desc', 'Click the "Copy" button to copy formatted answers to your clipboard.')}</li>
          </ul>
        </section>

        {/* Mathematical Rigor */}
        <section className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
            <Lightbulb className="w-4 h-4 text-emerald-500" />
            <h2 className="text-sm font-bold">{t('lbl_accuracy_title', 'Accuracy & Mathematical Standard')}</h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {t('about_principle_1', 'All calculations are verified against official standards (such as the World Health Organization BMI thresholds and standard compound amortization formulas).')}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {t('why_privacy_desc', 'Calculations are executed client-side inside your browser for maximum privacy and zero data leakage.')}
          </p>
        </section>
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
        <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800 no-print">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            {t('lbl_more_in_category', 'More in this category')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedTools.map((rel) => (
              <AppLink
                key={rel.id}
                href={getToolUrl(rel)}
                className="p-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-800 text-start space-y-1 transition-all group cursor-pointer block"
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  {t(`tool_${rel.id.replace('-', '_')}_name`)}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {t(`tool_${rel.id.replace('-', '_')}_desc`)}
                </div>
              </AppLink>
            ))}
          </div>
        </section>
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
                value={`<iframe src="https://calcyfy.com/${lang}/${tool.slug}" width="100%" height="520" frameborder="0" style="border: 1px solid #e2e8f0; border-radius: 12px;" title="${toolName}"></iframe>`}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs text-slate-800 dark:text-slate-200 resize-none focus:outline-hidden"
              />
              <button
                onClick={() => {
                  const code = `<iframe src="https://calcyfy.com/${lang}/${tool.slug}" width="100%" height="520" frameborder="0" style="border: 1px solid #e2e8f0; border-radius: 12px;" title="${toolName}"></iframe>`;
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
