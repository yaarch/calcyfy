import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tool } from '../../types';
import { Copy, Check, Activity, ShieldCheck } from 'lucide-react';

interface BodyFatCalculatorProps {
  tool?: Tool;
}

export const BodyFatCalculator: React.FC<BodyFatCalculatorProps> = () => {
  const { t, addHistory } = useApp();
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState<string>('178'); // cm
  const [neck, setNeck] = useState<string>('38'); // cm
  const [waist, setWaist] = useState<string>('85'); // cm
  const [hip, setHip] = useState<string>('95'); // cm (female)
  const [copied, setCopied] = useState(false);

  const h = parseFloat(height) || 178;
  const n = parseFloat(neck) || 38;
  const w = parseFloat(waist) || 85;
  const hp = parseFloat(hip) || 95;

  let bodyFat = 0;

  // US Navy Formula (Metric)
  // Men: %Fat = 86.010 * log10(waist - neck) - 70.041 * log10(height) + 36.76
  // Women: %Fat = 163.205 * log10(waist + hip - neck) - 97.684 * log10(height) - 78.387
  if (gender === 'male' && w > n && h > 0) {
    bodyFat = 86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
  } else if (gender === 'female' && (w + hp) > n && h > 0) {
    bodyFat = 163.205 * Math.log10(w + hp - n) - 97.684 * Math.log10(h) - 78.387;
  }

  bodyFat = Math.max(2, Math.min(60, bodyFat));

  const getCategory = (bf: number, g: 'male' | 'female') => {
    if (g === 'male') {
      if (bf < 6) return 'Essential Fat';
      if (bf < 14) return 'Athletes';
      if (bf < 18) return 'Fitness';
      if (bf < 25) return 'Average';
      return 'Obese';
    } else {
      if (bf < 14) return 'Essential Fat';
      if (bf < 21) return 'Athletes';
      if (bf < 25) return 'Fitness';
      if (bf < 32) return 'Average';
      return 'Obese';
    }
  };

  const category = getCategory(bodyFat, gender);

  const handleCopy = () => {
    const summary = `Body Fat: ${bodyFat.toFixed(1)}% (${category})`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    addHistory('body-fat', `US Navy Formula (${gender})`, summary);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 max-w-xs">
        <button
          id="bf-gender-male"
          onClick={() => setGender('male')}
          className={`flex-1 py-1.5 px-3 text-xs md:text-sm font-semibold rounded-lg transition-all ${
            gender === 'male'
              ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {t('bf_male', 'Male')}
        </button>
        <button
          id="bf-gender-female"
          onClick={() => setGender('female')}
          className={`flex-1 py-1.5 px-3 text-xs md:text-sm font-semibold rounded-lg transition-all ${
            gender === 'female'
              ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {t('bf_female', 'Female')}
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('bf_height', 'Height (cm)')}
            </label>
            <input
              id="bf-height-input"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
              placeholder="178"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('bf_neck', 'Neck Circumference (cm)')}
            </label>
            <input
              id="bf-neck-input"
              type="number"
              value={neck}
              onChange={(e) => setNeck(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
              placeholder="38"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('bf_waist', 'Waist Circumference (cm)')}
            </label>
            <input
              id="bf-waist-input"
              type="number"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
              placeholder="85"
            />
          </div>

          {gender === 'female' && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('bf_hip', 'Hip Circumference (cm)')}
              </label>
              <input
                id="bf-hip-input"
                type="number"
                value={hip}
                onChange={(e) => setHip(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                placeholder="95"
              />
            </div>
          )}
        </div>

        {/* Results */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase text-emerald-600 dark:text-emerald-400">
                {t('bf_estimated_bf', 'Body Fat Percentage (US Navy)')}
              </span>
              <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                {bodyFat.toFixed(1)}%
              </div>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">
                {t('bf_category', 'Fitness Category')}: <span className="font-bold text-slate-900 dark:text-white">{category}</span>
              </p>
            </div>

            <button
              id="bf-copy-btn"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy Body Fat Result')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
