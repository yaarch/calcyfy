import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tool } from '../../types';
import { Copy, Check } from 'lucide-react';

interface PercentageCalculatorProps {
  tool?: Tool;
}

export const PercentageCalculator: React.FC<PercentageCalculatorProps> = () => {
  const { t, addHistory } = useApp();
  const [mode, setMode] = useState<'calc1' | 'calc2' | 'calc3'>('calc1');

  // Mode 1: What is X% of Y?
  const [val1A, setVal1A] = useState<string>('15');
  const [val1B, setVal1B] = useState<string>('80');

  // Mode 2: X is what percent of Y?
  const [val2A, setVal2A] = useState<string>('24');
  const [val2B, setVal2B] = useState<string>('80');

  // Mode 3: Percentage Increase/Decrease from X to Y
  const [val3A, setVal3A] = useState<string>('50');
  const [val3B, setVal3B] = useState<string>('75');

  const [copied, setCopied] = useState(false);

  // Calculations
  const getResult1 = () => {
    const p = parseFloat(val1A);
    const total = parseFloat(val1B);
    if (isNaN(p) || isNaN(total)) return null;
    return (p / 100) * total;
  };

  const getResult2 = () => {
    const part = parseFloat(val2A);
    const whole = parseFloat(val2B);
    if (isNaN(part) || isNaN(whole) || whole === 0) return null;
    return (part / whole) * 100;
  };

  const getResult3 = () => {
    const from = parseFloat(val3A);
    const to = parseFloat(val3B);
    if (isNaN(from) || isNaN(to) || from === 0) return null;
    const diff = to - from;
    const pct = (diff / from) * 100;
    return { diff, pct };
  };

  const res1 = getResult1();
  const res2 = getResult2();
  const res3 = getResult3();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveResult = () => {
    if (mode === 'calc1' && res1 !== null) {
      addHistory('percentage', `${val1A}% of ${val1B}`, res1.toFixed(2));
    } else if (mode === 'calc2' && res2 !== null) {
      addHistory('percentage', `${val2A} of ${val2B}`, `${res2.toFixed(2)}%`);
    } else if (mode === 'calc3' && res3 !== null) {
      addHistory('percentage', `${val3A} → ${val3B}`, `${res3.pct >= 0 ? '+' : ''}${res3.pct.toFixed(2)}%`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        <button
          id="pct-tab-1"
          onClick={() => setMode('calc1')}
          className={`flex-1 min-w-[140px] py-2 px-3 text-xs md:text-sm font-medium rounded-lg transition-all ${
            mode === 'calc1'
              ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          {t('pct_mode_1', 'What is X% of Y?')}
        </button>
        <button
          id="pct-tab-2"
          onClick={() => setMode('calc2')}
          className={`flex-1 min-w-[140px] py-2 px-3 text-xs md:text-sm font-medium rounded-lg transition-all ${
            mode === 'calc2'
              ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          {t('pct_mode_2', 'X is what % of Y?')}
        </button>
        <button
          id="pct-tab-3"
          onClick={() => setMode('calc3')}
          className={`flex-1 min-w-[140px] py-2 px-3 text-xs md:text-sm font-medium rounded-lg transition-all ${
            mode === 'calc3'
              ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          {t('pct_mode_3', '% Change (From X to Y)')}
        </button>
      </div>

      {/* Mode 1: What is X% of Y? */}
      {mode === 'calc1' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('pct_percentage', 'Percentage (%)')}
              </label>
              <div className="relative">
                <input
                  id="pct1-val-a"
                  type="number"
                  value={val1A}
                  onChange={(e) => setVal1A(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono text-lg"
                  placeholder="15"
                />
                <span className="absolute inset-y-0 end-0 pe-4 flex items-center text-slate-400 font-bold">%</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('pct_total_value', 'Total Amount / Value')}
              </label>
              <input
                id="pct1-val-b"
                type="number"
                value={val1B}
                onChange={(e) => setVal1B(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono text-lg"
                placeholder="80"
              />
            </div>
          </div>

          {/* Result Block */}
          {res1 !== null && (
            <div className="p-5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  {val1A}% {t('pct_of_number', 'of')} {val1B} =
                </span>
                <div className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-200 font-mono mt-0.5">
                  {res1.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="pct1-btn-copy"
                  onClick={() => {
                    handleCopy(res1.toString());
                    handleSaveResult();
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-all"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy Result')}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: X is what percent of Y? */}
      {mode === 'calc2' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('pct_part_value', 'Partial Value (X)')}
              </label>
              <input
                id="pct2-val-a"
                type="number"
                value={val2A}
                onChange={(e) => setVal2A(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono text-lg"
                placeholder="24"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('pct_total_value', 'Total / Whole Value (Y)')}
              </label>
              <input
                id="pct2-val-b"
                type="number"
                value={val2B}
                onChange={(e) => setVal2B(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono text-lg"
                placeholder="80"
              />
            </div>
          </div>

          {res2 !== null && (
            <div className="p-5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  {val2A} / {val2B} =
                </span>
                <div className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-200 font-mono mt-0.5">
                  {res2.toFixed(2)}%
                </div>
              </div>

              <button
                id="pct2-btn-copy"
                onClick={() => {
                  handleCopy(`${res2.toFixed(2)}%`);
                  handleSaveResult();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy Result')}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mode 3: Percentage Increase / Decrease */}
      {mode === 'calc3' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('pct_initial_value', 'Initial / From Value')}
              </label>
              <input
                id="pct3-val-a"
                type="number"
                value={val3A}
                onChange={(e) => setVal3A(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono text-lg"
                placeholder="50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('pct_final_value', 'Final / To Value')}
              </label>
              <input
                id="pct3-val-b"
                type="number"
                value={val3B}
                onChange={(e) => setVal3B(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono text-lg"
                placeholder="75"
              />
            </div>
          </div>

          {res3 !== null && (
            <div
              className={`p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border ${
                res3.pct >= 0
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60'
              }`}
            >
              <div>
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    res3.pct >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
                  }`}
                >
                  {res3.pct >= 0 ? t('pct_increase', 'Percentage Increase') : t('pct_decrease', 'Percentage Decrease')}
                </span>
                <div
                  className={`text-3xl font-extrabold font-mono mt-0.5 ${
                    res3.pct >= 0 ? 'text-emerald-900 dark:text-emerald-200' : 'text-rose-900 dark:text-rose-200'
                  }`}
                >
                  {res3.pct >= 0 ? `+${res3.pct.toFixed(2)}%` : `${res3.pct.toFixed(2)}%`}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Difference: {res3.diff >= 0 ? `+${res3.diff}` : res3.diff}
                </div>
              </div>

              <button
                id="pct3-btn-copy"
                onClick={() => {
                  handleCopy(`${res3.pct >= 0 ? '+' : ''}${res3.pct.toFixed(2)}%`);
                  handleSaveResult();
                }}
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-white text-xs font-semibold rounded-lg shadow-xs transition-all ${
                  res3.pct >= 0 ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy Result')}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
