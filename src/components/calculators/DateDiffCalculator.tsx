import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tool } from '../../types';
import { Copy, Check, Calendar } from 'lucide-react';

interface DateDiffCalculatorProps {
  tool?: Tool;
}

export const DateDiffCalculator: React.FC<DateDiffCalculatorProps> = () => {
  const { t, addHistory } = useApp();
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>('2026-12-31');
  const [copied, setCopied] = useState<boolean>(false);

  const start = new Date(startDate);
  const end = new Date(endDate);

  const isValid = !isNaN(start.getTime()) && !isNaN(end.getTime());

  let diffDays = 0;
  let diffWeeks = 0;
  let diffMonths = 0;
  let diffYears = 0;

  if (isValid) {
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    diffWeeks = (diffDays / 7);
    
    // Rough month & year estimations
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    diffYears = Math.max(0, years);
    diffMonths = Math.max(0, months);
  }

  const handleCopy = () => {
    const summary = `${diffDays} days (${diffYears} years, ${diffMonths} months)`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    addHistory('date-diff', `${startDate} to ${endDate}`, summary);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('date_start', 'Start Date')}
            </label>
            <input
              id="date-start-input"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('date_end', 'End Date')}
            </label>
            <input
              id="date-end-input"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
            />
          </div>
        </div>

        {/* Results */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase">
                {t('date_total_days', 'Total Days')}
              </span>
              <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                {diffDays.toLocaleString()}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                {t('date_weeks', 'Weeks')}
              </span>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                {diffWeeks.toFixed(1)}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                {t('date_months', 'Months')}
              </span>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                {diffMonths}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                {t('date_years', 'Years')}
              </span>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                {diffYears}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-200 dark:border-slate-700">
            <button
              id="date-copy-btn"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy Difference')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
