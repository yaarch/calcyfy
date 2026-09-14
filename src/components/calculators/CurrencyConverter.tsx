import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CURRENCY_DATABASE, LiveCurrencyProvider, CurrencyInfo } from '../../data/currencyData';
import {
  ArrowLeftRight,
  Coins,
  Info,
  Copy,
  Check,
  RefreshCw,
  Search,
  TrendingUp,
  Percent,
  Layers,
  Sparkles,
  Award,
} from 'lucide-react';

export const CurrencyConverter: React.FC = () => {
  const { addHistory, lang } = useApp();

  // Mode: 'single' | 'matrix' | 'fee-calculator' | 'gold-silver'
  const [activeTab, setActiveTab] = useState<'single' | 'matrix' | 'fee-calculator' | 'gold-silver'>('single');

  // Single converter state
  const [amount, setAmount] = useState<string>('100');
  const [fromCode, setFromCode] = useState<string>('USD');
  const [toCode, setToCode] = useState<string>('SAR');

  // Multi-rates state
  const [allRates, setAllRates] = useState<Record<string, number>>({});
  const [rateStatus, setRateStatus] = useState<{ isLive: boolean; lastUpdated: string; source: string }>({
    isLive: false,
    lastUpdated: '',
    source: 'Loading...',
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Bank Spread / Markup Fee State
  const [bankExchangeRate, setBankExchangeRate] = useState<string>('3.70');

  // Gold & Silver state
  const [goldWeightGrams, setGoldWeightGrams] = useState<string>('10');
  const [selectedGoldCurrency, setSelectedGoldCurrency] = useState<string>('SAR');

  // Search & Filter state for modal or select
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');

  const [copied, setCopied] = useState(false);

  // Load exchange rates
  const fetchRates = async () => {
    setIsRefreshing(true);
    try {
      const res = await LiveCurrencyProvider.getRatesAgainstUSD();
      setAllRates(res.rates);
      setRateStatus({
        isLive: res.isLive,
        lastUpdated: res.lastUpdated,
        source: res.source,
      });
    } catch {
      // Fallback
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const handleSwap = () => {
    const temp = fromCode;
    setFromCode(toCode);
    setToCode(temp);
  };

  const parsedAmount = parseFloat(amount) || 0;

  // Calculate rate between fromCode and toCode
  const currentRate = useMemo(() => {
    const fromToUSD = allRates[fromCode] || 1;
    const toToUSD = allRates[toCode] || 1;
    if (fromToUSD === 0) return 1;
    return (1 / fromToUSD) * toToUSD;
  }, [allRates, fromCode, toCode]);

  const convertedAmount = parsedAmount * currentRate;
  const inverseRate = currentRate > 0 ? 1 / currentRate : 0;

  const fromCurrency = CURRENCY_DATABASE.find((c) => c.code === fromCode) || CURRENCY_DATABASE[0];
  const toCurrency = CURRENCY_DATABASE.find((c) => c.code === toCode) || CURRENCY_DATABASE[8];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    addHistory('currency', lang === 'ar' ? 'تحويل العملات' : 'Currency Conversion', text);
    setTimeout(() => setCopied(false), 2000);
  };

  // Currencies list filtered by search
  const filterCurrencies = (query: string) => {
    if (!query.trim()) return CURRENCY_DATABASE;
    const q = query.toLowerCase();
    return CURRENCY_DATABASE.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.nameAr.includes(q) ||
        c.symbol.toLowerCase().includes(q)
    );
  };

  // Top comparison currencies for multi-matrix
  const matrixCurrencies = useMemo(() => {
    const defaultCodes = ['USD', 'EUR', 'GBP', 'SAR', 'AED', 'EGP', 'KWD', 'QAR', 'MAD', 'TRY', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY'];
    return defaultCodes.map((code) => CURRENCY_DATABASE.find((c) => c.code === code)).filter(Boolean) as CurrencyInfo[];
  }, []);

  // Bank Markup calculation
  const bankOfferedRateNum = parseFloat(bankExchangeRate) || currentRate;
  const officialResult = parsedAmount * currentRate;
  const bankResult = parsedAmount * bankOfferedRateNum;
  const spreadDiff = Math.abs(officialResult - bankResult);
  const spreadPercent = currentRate > 0 ? (Math.abs(currentRate - bankOfferedRateNum) / currentRate) * 100 : 0;

  // Gold calculations (USD base: ~ $2,450 per Troy Ounce = 31.1035 grams)
  // 1 Gram 24k Gold ≈ (2450 / 31.1035) USD ≈ 78.77 USD
  const goldGramUSD24k = 78.77;
  const goldCurrencyRateToUSD = allRates[selectedGoldCurrency] || 3.75;
  const goldGramPriceInSelected = goldGramUSD24k * goldCurrencyRateToUSD;
  const gramsNum = parseFloat(goldWeightGrams) || 1;

  const goldKarats = [
    { karat: '24K (99.9% خالص)', nameEn: '24K Pure Gold', purity: 1.0, gramPrice: goldGramPriceInSelected },
    { karat: '22K (91.6% عيار 22)', nameEn: '22K Standard', purity: 0.916, gramPrice: goldGramPriceInSelected * 0.916 },
    { karat: '21K (87.5% عيار 21 الأكثر تداولاً)', nameEn: '21K Popular Market', purity: 0.875, gramPrice: goldGramPriceInSelected * 0.875 },
    { karat: '18K (75.0% عيار 18)', nameEn: '18K Jewelry', purity: 0.75, gramPrice: goldGramPriceInSelected * 0.75 },
  ];

  return (
    <div className="space-y-6">
      {/* Live Feed Status Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                rateStatus.isLive ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                rateStatus.isLive ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            ></span>
          </span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {rateStatus.isLive
              ? lang === 'ar'
                ? 'أسعار الصرف المباشرة (سوق الفوركس العالمي)'
                : 'Live Interbank Forex Market Rates'
              : lang === 'ar'
              ? 'أسعار الصرف المعيارية المرجعية'
              : 'Benchmark Reference Exchange Rates'}
          </span>
          {rateStatus.lastUpdated && (
            <span className="text-slate-500 font-mono text-[11px]">({rateStatus.lastUpdated})</span>
          )}
        </div>

        <button
          type="button"
          onClick={fetchRates}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 rounded-xl font-medium shadow-2xs transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`} />
          <span>{lang === 'ar' ? 'تحديث الأسعار' : 'Refresh Feed'}</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
          <button
            type="button"
            onClick={() => setActiveTab('single')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'single'
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            💱 {lang === 'ar' ? 'محول العملات المباشر' : 'Live Converter'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('matrix')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            📊 {lang === 'ar' ? 'لوحة المقارنة المتعددة' : 'Multi-Currency Board'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('fee-calculator')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'fee-calculator'
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            🏦 {lang === 'ar' ? 'حاسبة عمولة الصرافة والفرق' : 'Spread & Fee Calculator'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('gold-silver')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'gold-silver'
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            🥇 {lang === 'ar' ? 'حاسبة أسعار الذهب والعيارات' : 'Gold & Silver Value'}
          </button>
        </div>

        {/* ================= TAB 1: SINGLE CONVERTER ================= */}
        {activeTab === 'single' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-4">
              {/* From Currency Input */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {lang === 'ar' ? 'المبلغ المراد تحويله' : 'Amount to Convert'}
                </label>
                <input
                  id="curr-from-amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xl font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  placeholder="100"
                />
                <select
                  id="curr-from-code"
                  value={fromCode}
                  onChange={(e) => setFromCode(e.target.value)}
                  className="w-full px-3 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white"
                >
                  {CURRENCY_DATABASE.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code} — {lang === 'ar' ? c.nameAr : c.name} ({c.symbol})
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center pt-2 md:pt-6">
                <button
                  id="curr-swap-btn"
                  type="button"
                  onClick={handleSwap}
                  className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-slate-700 rounded-2xl border border-slate-200 dark:border-slate-700 transition-all shadow-xs cursor-pointer"
                  title={lang === 'ar' ? 'تبديل العملات' : 'Swap currencies'}
                  aria-label="Swap currencies"
                >
                  <ArrowLeftRight className="w-5 h-5" />
                </button>
              </div>

              {/* To Currency Output */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {lang === 'ar' ? 'المبلغ المحوّل الناتج' : 'Converted Total'}
                </label>
                <div className="w-full px-4 py-3.5 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl font-mono text-xl font-black text-emerald-950 dark:text-emerald-200 truncate">
                  {toCurrency.symbol}{' '}
                  {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                </div>
                <select
                  id="curr-to-code"
                  value={toCode}
                  onChange={(e) => setToCode(e.target.value)}
                  className="w-full px-3 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white"
                >
                  {CURRENCY_DATABASE.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code} — {lang === 'ar' ? c.nameAr : c.name} ({c.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Main Conversion Result Hero Card */}
            <div className="p-6 md:p-8 bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white dark:from-emerald-950/40 dark:via-teal-950/20 dark:to-slate-900 border border-emerald-200 dark:border-emerald-800/70 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  {amount} {fromCode} ({lang === 'ar' ? fromCurrency.nameAr : fromCurrency.name}) {lang === 'ar' ? 'يعادل' : 'equals'}
                </span>
                <div className="text-3xl md:text-5xl font-black text-emerald-950 dark:text-emerald-100 font-mono">
                  {toCurrency.symbol}{' '}
                  {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}{' '}
                  <span className="text-lg font-bold text-slate-600 dark:text-slate-400">{toCode}</span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 font-medium flex flex-wrap items-center gap-3 pt-1">
                  <span>
                    1 {fromCode} = <strong>{currentRate.toFixed(4)}</strong> {toCode}
                  </span>
                  <span>•</span>
                  <span>
                    1 {toCode} = <strong>{inverseRate.toFixed(4)}</strong> {fromCode}
                  </span>
                </div>
              </div>

              <button
                id="curr-copy-btn"
                type="button"
                onClick={() => {
                  const text = `${amount} ${fromCode} = ${convertedAmount.toFixed(2)} ${toCode} (1 ${fromCode} = ${currentRate.toFixed(4)} ${toCode})`;
                  handleCopy(text);
                }}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer self-start md:self-auto shrink-0"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? (lang === 'ar' ? 'تم النسخ!' : 'Copied!') : lang === 'ar' ? 'نسخ النتيجة' : 'Copy Result'}</span>
              </button>
            </div>

            {/* Quick Multiplier Table */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                {lang === 'ar' ? 'جدول التحويل السريع للقيم الشائعة' : 'Quick Denomination Conversion Table'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-xs font-mono">
                {[1, 5, 10, 50, 100, 500, 1000, 5000].map((val) => (
                  <div
                    key={val}
                    className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col"
                  >
                    <span className="text-slate-500 font-normal">
                      {val} {fromCode}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white mt-0.5">
                      {(val * currentRate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
                      {toCode}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: MULTI-CURRENCY BOARD ================= */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  {lang === 'ar' ? 'تحويل مبلغ:' : 'Convert Base Amount:'}
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-32 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-bold text-slate-900 dark:text-white"
                />
                <select
                  value={fromCode}
                  onChange={(e) => setFromCode(e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-xs"
                >
                  {CURRENCY_DATABASE.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => {
                  const summary = matrixCurrencies
                    .map((c) => {
                      const r = ((allRates[c.code] || 1) / (allRates[fromCode] || 1)) * parsedAmount;
                      return `${c.code}: ${r.toFixed(2)}`;
                    })
                    .join(' | ');
                  handleCopy(`${amount} ${fromCode} = ${summary}`);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? (lang === 'ar' ? 'تم النسخ!' : 'Copied!') : lang === 'ar' ? 'نسخ اللوحة بالكامل' : 'Copy All'}</span>
              </button>
            </div>

            {/* Comparison Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {matrixCurrencies.map((cur) => {
                const rateToTarget = ((allRates[cur.code] || 1) / (allRates[fromCode] || 1));
                const totalInTarget = parsedAmount * rateToTarget;
                const isSelected = cur.code === fromCode;

                return (
                  <div
                    key={cur.code}
                    className={`p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 shadow-xs'
                        : 'bg-slate-50/60 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{cur.flag}</span>
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white block">
                            {cur.code}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {lang === 'ar' ? cur.nameAr : cur.name}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-semibold text-slate-400">
                        {cur.symbol}
                      </span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-baseline justify-between">
                      <span className="text-lg font-black font-mono text-slate-900 dark:text-white">
                        {totalInTarget.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        1 {fromCode} = {rateToTarget.toFixed(3)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 3: EXCHANGE SPREAD & FEE CALCULATOR ================= */}
        {activeTab === 'fee-calculator' && (
          <div className="space-y-6">
            <div className="p-4 bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-2xl text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <strong className="text-amber-900 dark:text-amber-200 block font-bold">
                {lang === 'ar' ? '💡 كاشف عمولة الصرافة والبنوك المخفية (Bank FX Spread Detector):' : '💡 Bank & Exchange Markup Fee Detector:'}
              </strong>
              <span>
                {lang === 'ar'
                  ? 'غالباً ما تدعي مكاتب الصرافة وبطاقات الائتمان "0% عمولة"، لكنها تخفي رسوماً ضخمة في فرق سعر الصرف. قارن هنا السعر الرسمي العالمي بالسعر الذي يعرضه البنك لتعرف بالضبط كم تخسر!'
                  : 'Exchanges often claim "0% Commission" while hiding a 2-5% markup spread. Enter the rate offered by your bank to uncover the exact hidden fees!'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'ar' ? 'المبلغ المراد تحويله' : 'Amount'}
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'ar' ? 'سعر السوق الرسمي العادل' : 'Official Market Rate'}
                </label>
                <div className="px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base font-bold text-emerald-700 dark:text-emerald-400">
                  1 {fromCode} = {currentRate.toFixed(4)} {toCode}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'ar' ? 'السعر المعروض من البنك / الصرافة' : 'Offered Exchange Rate'}
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={bankExchangeRate}
                  onChange={(e) => setBankExchangeRate(e.target.value)}
                  placeholder={currentRate.toFixed(4)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Spread Analysis Result */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500 block">
                  {lang === 'ar' ? 'المبلغ المستحق بسعر السوق العادل' : 'Official Market Value'}
                </span>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
                  {officialResult.toFixed(2)} <span className="text-sm font-normal text-slate-500">{toCode}</span>
                </div>
              </div>

              <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500 block">
                  {lang === 'ar' ? 'المبلغ الذي ستستلمه فعلياً' : 'What You Actually Receive'}
                </span>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
                  {bankResult.toFixed(2)} <span className="text-sm font-normal text-slate-500">{toCode}</span>
                </div>
              </div>

              <div className="p-5 bg-rose-50/70 dark:bg-rose-950/40 rounded-2xl border border-rose-200 dark:border-rose-800">
                <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase block">
                  {lang === 'ar' ? 'العمولة المخفية المفقودة' : 'Hidden Fee Loss'}
                </span>
                <div className="text-2xl font-black font-mono text-rose-600 dark:text-rose-400 mt-1">
                  {spreadDiff.toFixed(2)} {toCode}{' '}
                  <span className="text-xs font-bold bg-rose-200 dark:bg-rose-900/60 px-2 py-0.5 rounded-md">
                    ({spreadPercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: GOLD & SILVER VALUE ================= */}
        {activeTab === 'gold-silver' && (
          <div className="space-y-6">
            <div className="p-4 bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-2xl text-xs text-slate-700 dark:text-slate-300">
              {lang === 'ar'
                ? '🥇 حاسبة قيمة الذهب والفضة اللحظية بمختلف العيارات: احسب القيمة السوقية لجرامات الذهب عيار 24 و22 و21 و18 بأي عملة محلية أو عالمية.'
                : '🥇 Live Gold & Precious Metals Calculator: Calculate market value for 24K, 22K, 21K, and 18K gold in any world currency.'}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  {lang === 'ar' ? 'وزن الذهب بالجرام (Grams)' : 'Gold Weight (Grams)'}
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={goldWeightGrams}
                  onChange={(e) => setGoldWeightGrams(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  {lang === 'ar' ? 'عملة التسعير' : 'Currency to Price In'}
                </label>
                <select
                  value={selectedGoldCurrency}
                  onChange={(e) => setSelectedGoldCurrency(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white"
                >
                  {CURRENCY_DATABASE.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code} — {lang === 'ar' ? c.nameAr : c.name} ({c.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Karat Pricing Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {goldKarats.map((k, idx) => {
                const totalValue = k.gramPrice * gramsNum;
                return (
                  <div
                    key={idx}
                    className="p-5 bg-gradient-to-br from-amber-50/50 to-white dark:from-amber-950/20 dark:to-slate-900 border border-amber-200 dark:border-amber-800/60 rounded-2xl flex flex-col justify-between space-y-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase">
                        {k.karat}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {k.gramPrice.toFixed(2)} {selectedGoldCurrency} / g
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                        {lang === 'ar' ? `قيمة ${gramsNum} جرام:` : `Total Value for ${gramsNum}g:`}
                      </span>
                      <div className="text-2xl font-black font-mono text-amber-950 dark:text-amber-100 mt-0.5">
                        {totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
                        <span className="text-sm font-normal text-slate-500">{selectedGoldCurrency}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
