import React, { useState } from 'react';
import { useApp } from '../../../../context/AppContext';
import { Tool } from '../../../../types';
import { Copy, Check, ShieldAlert, TrendingUp } from 'lucide-react';

interface ValuationMetricsEngineProps {
  tool: Tool;
}

export const ValuationMetricsEngine: React.FC<ValuationMetricsEngineProps> = ({ tool }) => {
  const { t, addHistory } = useApp();
  const [copied, setCopied] = useState(false);

  // States for commercial & valuation inputs
  const [noi, setNoi] = useState<string>('120000');
  const [debtService, setDebtService] = useState<string>('95000');
  const [currentAssets, setCurrentAssets] = useState<string>('250000');
  const [currentLiabilities, setCurrentLiabilities] = useState<string>('150000');
  const [sharePrice, setSharePrice] = useState<string>('150');
  const [eps, setEps] = useState<string>('6.50');
  const [bookValuePerShare, setBookValuePerShare] = useState<string>('45');
  const [salesPerShare, setSalesPerShare] = useState<string>('30');
  const [operatingCashFlow, setOperatingCashFlow] = useState<string>('5000000');
  const [capex, setCapex] = useState<string>('1200000');
  const [marketCap, setMarketCap] = useState<string>('75000000');

  const id = tool.id;

  const numNoi = parseFloat(noi) || 0;
  const numDebtService = parseFloat(debtService) || 0;
  const numAssets = parseFloat(currentAssets) || 0;
  const numLiabilities = parseFloat(currentLiabilities) || 0;
  const numPrice = parseFloat(sharePrice) || 0;
  const numEps = parseFloat(eps) || 0;
  const numBvps = parseFloat(bookValuePerShare) || 0;
  const numSps = parseFloat(salesPerShare) || 0;
  const numOcf = parseFloat(operatingCashFlow) || 0;
  const numCapex = parseFloat(capex) || 0;
  const numMarketCap = parseFloat(marketCap) || 0;

  let primaryLabel = 'Valuation Metric';
  let primaryValue = '0.00';
  let secondaryMetrics: { label: string; value: string }[] = [];
  let formulaText = '';
  let interpretation = '';

  // 1. DSCR Calculator (`dscr-calculator`)
  if (id === 'dscr-calculator') {
    const dscr = numDebtService > 0 ? numNoi / numDebtService : 0;
    primaryLabel = 'Debt Service Coverage Ratio (DSCR)';
    primaryValue = `${dscr.toFixed(2)}x`;
    
    let status = 'Weak Coverage (< 1.00x: Cash flow deficit)';
    if (dscr >= 1.35) status = 'Strong Coverage (≥ 1.35x: Commercial lender standard)';
    else if (dscr >= 1.15) status = 'Adequate Coverage (1.15x – 1.34x: Minimum bank covenants)';

    secondaryMetrics = [
      { label: 'Net Operating Income (NOI)', value: `$${numNoi.toLocaleString()}` },
      { label: 'Total Annual Debt Service', value: `$${numDebtService.toLocaleString()}` },
      { label: 'Net Cash Flow Cushion', value: `$${(numNoi - numDebtService).toLocaleString()}` },
      { label: 'Lending Health Tier', value: status },
    ];
    formulaText = 'DSCR = Net Operating Income (NOI) ÷ Total Debt Service';
    interpretation = 'A DSCR above 1.25x is typically required by commercial banks to qualify for debt financing.';
  }
  // 2. Working Capital Ratio (`working-capital-ratio`)
  else if (id === 'working-capital-ratio') {
    const netWorkingCapital = numAssets - numLiabilities;
    const currentRatio = numLiabilities > 0 ? numAssets / numLiabilities : 0;

    primaryLabel = 'Current Liquidity Ratio';
    primaryValue = `${currentRatio.toFixed(2)}:1`;

    let health = 'Caution (Current ratio below 1.0 indicates short-term insolvency risk)';
    if (currentRatio >= 2.0) health = 'Robust (Liquid buffer exceeds 2x short-term obligations)';
    else if (currentRatio >= 1.2) health = 'Healthy (Standard short-term liquidity)';

    secondaryMetrics = [
      { label: 'Net Working Capital (NWC)', value: `$${netWorkingCapital.toLocaleString()}` },
      { label: 'Total Current Assets', value: `$${numAssets.toLocaleString()}` },
      { label: 'Total Current Liabilities', value: `$${numLiabilities.toLocaleString()}` },
      { label: 'Working Capital Health', value: health },
    ];
    formulaText = 'Current Ratio = Current Assets ÷ Current Liabilities | NWC = Assets - Liabilities';
    interpretation = 'Working capital measures immediate operating liquidity and capacity to meet short-term obligations.';
  }
  // 3. P/E Ratio Valuation (`pe-ratio-valuation`)
  else if (id === 'pe-ratio-valuation') {
    const pe = numEps > 0 ? numPrice / numEps : 0;
    const earningsYield = numPrice > 0 ? (numEps / numPrice) * 100 : 0;

    primaryLabel = 'Price-to-Earnings (P/E) Multiple';
    primaryValue = `${pe.toFixed(2)}x`;

    secondaryMetrics = [
      { label: 'Stock Price per Share', value: `$${numPrice.toFixed(2)}` },
      { label: 'Earnings per Share (EPS)', value: `$${numEps.toFixed(2)}` },
      { label: 'Earnings Yield (E/P)', value: `${earningsYield.toFixed(2)}%` },
      { label: 'Cost per $1 of Earnings', value: `$${pe.toFixed(2)}` },
    ];
    formulaText = 'P/E = Market Share Price ÷ Earnings Per Share (EPS)';
    interpretation = 'P/E reflects market willingness to pay for current corporate net profits.';
  }
  // 4. P/B Ratio Valuation (`pb-ratio-valuation`)
  else if (id === 'pb-ratio-valuation') {
    const pb = numBvps > 0 ? numPrice / numBvps : 0;

    primaryLabel = 'Price-to-Book (P/B) Multiple';
    primaryValue = `${pb.toFixed(2)}x`;

    secondaryMetrics = [
      { label: 'Market Share Price', value: `$${numPrice.toFixed(2)}` },
      { label: 'Book Value per Share (BVPS)', value: `$${numBvps.toFixed(2)}` },
      { label: 'Premium / Discount to Book', value: `${((pb - 1) * 100).toFixed(1)}%` },
      { label: 'Valuation Baseline', value: pb < 1 ? 'Trading at discount to Net Asset Value' : 'Trading at premium to Net Asset Value' },
    ];
    formulaText = 'P/B = Market Share Price ÷ Book Value Per Share (Equity / Shares)';
    interpretation = 'P/B compares market equity capitalization with accounting balance-sheet net asset value.';
  }
  // 5. P/S Ratio Valuation (`ps-ratio-valuation`)
  else if (id === 'ps-ratio-valuation') {
    const ps = numSps > 0 ? numPrice / numSps : 0;

    primaryLabel = 'Price-to-Sales (P/S) Multiple';
    primaryValue = `${ps.toFixed(2)}x`;

    secondaryMetrics = [
      { label: 'Market Share Price', value: `$${numPrice.toFixed(2)}` },
      { label: 'Sales per Share (Revenue / Shares)', value: `$${numSps.toFixed(2)}` },
      { label: 'Revenue Yield (S/P)', value: `${numPrice > 0 ? ((numSps / numPrice) * 100).toFixed(2) : 0}%` },
      { label: 'Multiple Category', value: ps < 2 ? 'Low Multiple' : ps <= 10 ? 'Standard Growth Multiple' : 'High Growth Multiple' },
    ];
    formulaText = 'P/S = Market Share Price ÷ Revenue Per Share';
    interpretation = 'P/S values high-growth or pre-profit businesses relative to top-line gross revenue.';
  }
  // 6. Free Cash Flow & Yield (`free-cash-flow-fcf`)
  else {
    const fcf = numOcf - numCapex;
    const fcfYield = numMarketCap > 0 ? (fcf / numMarketCap) * 100 : 0;

    primaryLabel = 'Free Cash Flow (FCF)';
    primaryValue = `$${fcf.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

    secondaryMetrics = [
      { label: 'Operating Cash Flow (OCF)', value: `$${numOcf.toLocaleString()}` },
      { label: 'Capital Expenditures (CapEx)', value: `$${numCapex.toLocaleString()}` },
      { label: 'FCF Yield (FCF ÷ Market Cap)', value: `${fcfYield.toFixed(2)}%` },
      { label: 'FCF-to-Operating Cash Ratio', value: `${numOcf > 0 ? ((fcf / numOcf) * 100).toFixed(1) : 0}%` },
    ];
    formulaText = 'FCF = Operating Cash Flow - CapEx | FCF Yield = FCF ÷ Market Capitalization';
    interpretation = 'Free Cash Flow represents discretionary cash remaining after essential capital maintenance.';
  }

  const handleCopy = () => {
    const summary = `${tool.name}: ${primaryLabel} = ${primaryValue} | ${secondaryMetrics.map(s => `${s.label}: ${s.value}`).join(' | ')}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    addHistory(tool.id, primaryLabel, primaryValue);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        {/* Dynamic Field Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {id === 'dscr-calculator' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_noi', 'Net Operating Income (NOI, $)')}
                </label>
                <input
                  type="number"
                  value={noi}
                  onChange={(e) => setNoi(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="120000"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_debt_service', 'Annual Debt Service ($)')}
                </label>
                <input
                  type="number"
                  value={debtService}
                  onChange={(e) => setDebtService(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="95000"
                />
              </div>
            </>
          )}

          {id === 'working-capital-ratio' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_curr_assets', 'Current Assets ($)')}
                </label>
                <input
                  type="number"
                  value={currentAssets}
                  onChange={(e) => setCurrentAssets(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="250000"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_curr_liab', 'Current Liabilities ($)')}
                </label>
                <input
                  type="number"
                  value={currentLiabilities}
                  onChange={(e) => setCurrentLiabilities(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="150000"
                />
              </div>
            </>
          )}

          {id === 'pe-ratio-valuation' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_stock_price', 'Stock Price per Share ($)')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={sharePrice}
                  onChange={(e) => setSharePrice(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="150"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_eps', 'Earnings Per Share (EPS, $)')}
                </label>
                <input
                  type="number"
                  step="0.05"
                  value={eps}
                  onChange={(e) => setEps(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="6.50"
                />
              </div>
            </>
          )}

          {id === 'pb-ratio-valuation' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_stock_price', 'Stock Price per Share ($)')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={sharePrice}
                  onChange={(e) => setSharePrice(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="150"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_bvps', 'Book Value Per Share ($)')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={bookValuePerShare}
                  onChange={(e) => setBookValuePerShare(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="45"
                />
              </div>
            </>
          )}

          {id === 'ps-ratio-valuation' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_stock_price', 'Stock Price per Share ($)')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={sharePrice}
                  onChange={(e) => setSharePrice(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="150"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_sps', 'Sales / Revenue Per Share ($)')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={salesPerShare}
                  onChange={(e) => setSalesPerShare(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="30"
                />
              </div>
            </>
          )}

          {id === 'free-cash-flow-fcf' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_ocf', 'Operating Cash Flow ($)')}
                </label>
                <input
                  type="number"
                  value={operatingCashFlow}
                  onChange={(e) => setOperatingCashFlow(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="5000000"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_capex', 'Capital Expenditures (CapEx, $)')}
                </label>
                <input
                  type="number"
                  value={capex}
                  onChange={(e) => setCapex(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="1200000"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_mkt_cap', 'Market Capitalization ($)')}
                </label>
                <input
                  type="number"
                  value={marketCap}
                  onChange={(e) => setMarketCap(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="75000000"
                />
              </div>
            </>
          )}
        </div>

        {/* Primary Metric Banner */}
        <div className="p-6 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              {primaryLabel}
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">
              {primaryValue}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 font-medium">
              {interpretation}
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 self-start sm:self-center"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? t('copied', 'Copied!') : t('copy_summary', 'Copy Summary')}
          </button>
        </div>

        {/* Secondary Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {secondaryMetrics.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.label}</span>
              <span className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Math & Safety Notice */}
        <div className="p-4 bg-slate-100 dark:bg-slate-800/40 rounded-xl space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
          <div className="font-semibold text-slate-700 dark:text-slate-300">
            Formula: <code className="font-mono text-slate-800 dark:text-slate-200">{formulaText}</code>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0 text-amber-500" />
            <span>Valuation multiples reflect historical accounting estimates. Not personalized securities or investment advice.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
