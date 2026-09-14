import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tool } from '../../types';
import { Copy, Check, TrendingUp, DollarSign } from 'lucide-react';

interface RoiCagrCalculatorProps {
  tool?: Tool;
}

export const RoiCagrCalculator: React.FC<RoiCagrCalculatorProps> = () => {
  const { t, addHistory } = useApp();
  const [initialInvestment, setInitialInvestment] = useState<string>('10000');
  const [finalValue, setFinalValue] = useState<string>('25000');
  const [years, setYears] = useState<string>('5');
  const [copied, setCopied] = useState(false);

  const initial = parseFloat(initialInvestment) || 0;
  const final = parseFloat(finalValue) || 0;
  const numYears = parseFloat(years) || 1;

  const totalGain = final - initial;
  const roiPercent = initial > 0 ? (totalGain / initial) * 100 : 0;
  
  // CAGR = (Final / Initial) ^ (1 / Years) - 1
  const cagrPercent =
    initial > 0 && final > 0 && numYears > 0
      ? (Math.pow(final / initial, 1 / numYears) - 1) * 100
      : 0;

  const handleCopy = () => {
    const summary = `ROI: ${roiPercent.toFixed(2)}% | CAGR: ${cagrPercent.toFixed(2)}% | Net Gain: $${totalGain.toFixed(2)}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    addHistory('roi-cagr', `$${initial} to $${final} in ${numYears} yrs`, summary);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('roi_initial', 'Initial Investment ($)')}
            </label>
            <input
              id="roi-initial-input"
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg"
              placeholder="10000"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('roi_final', 'Final Value ($)')}
            </label>
            <input
              id="roi-final-input"
              type="number"
              value={finalValue}
              onChange={(e) => setFinalValue(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg"
              placeholder="25000"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('roi_years', 'Investment Duration (Years)')}
            </label>
            <input
              id="roi-years-input"
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg"
              placeholder="5"
            />
          </div>
        </div>

        {/* Results */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-start">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase">
                {t('roi_total_roi', 'Total Return (ROI)')}
              </span>
              <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                {roiPercent >= 0 ? '+' : ''}{roiPercent.toFixed(2)}%
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                {t('roi_cagr_annual', 'Annual Growth (CAGR)')}
              </span>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
                {cagrPercent >= 0 ? '+' : ''}{cagrPercent.toFixed(2)}%
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                {t('roi_net_profit', 'Total Net Profit / Loss')}
              </span>
              <div className={`text-2xl font-black font-mono mt-1 ${totalGain >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
                ${totalGain.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-200 dark:border-slate-700">
            <button
              id="roi-copy-btn"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy Investment Summary')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
