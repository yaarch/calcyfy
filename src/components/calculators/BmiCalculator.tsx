import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tool } from '../../types';
import { Copy, Check, Info } from 'lucide-react';

interface BmiCalculatorProps {
  tool?: Tool;
}

export const BmiCalculator: React.FC<BmiCalculatorProps> = () => {
  const { t, addHistory } = useApp();
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  // Metric state
  const [heightCm, setHeightCm] = useState<string>('175');
  const [weightKg, setWeightKg] = useState<string>('70');

  // Imperial state
  const [heightFt, setHeightFt] = useState<string>('5');
  const [heightIn, setHeightIn] = useState<string>('9');
  const [weightLbs, setWeightLbs] = useState<string>('154');

  const [copied, setCopied] = useState(false);

  // Compute BMI
  const calculateBmi = () => {
    let bmiValue = 0;
    let minHealthyWeight = 0;
    let maxHealthyWeight = 0;
    let weightUnit = 'kg';

    if (unitSystem === 'metric') {
      const hM = parseFloat(heightCm) / 100;
      const w = parseFloat(weightKg);
      if (isNaN(hM) || isNaN(w) || hM <= 0 || w <= 0) return null;
      bmiValue = w / (hM * hM);
      minHealthyWeight = 18.5 * (hM * hM);
      maxHealthyWeight = 24.9 * (hM * hM);
      weightUnit = 'kg';
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      const totalInches = ft * 12 + inches;
      const w = parseFloat(weightLbs);
      if (totalInches <= 0 || isNaN(w) || w <= 0) return null;
      bmiValue = 703 * (w / (totalInches * totalInches));
      minHealthyWeight = (18.5 * (totalInches * totalInches)) / 703;
      maxHealthyWeight = (24.9 * (totalInches * totalInches)) / 703;
      weightUnit = 'lbs';
    }

    let categoryKey = 'bmi_normal';
    let categoryColor =
      'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';
    let needlePercent = 50;

    if (bmiValue < 18.5) {
      categoryKey = 'bmi_underweight';
      categoryColor =
        'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800';
      needlePercent = Math.max(5, (bmiValue / 18.5) * 25);
    } else if (bmiValue <= 24.9) {
      categoryKey = 'bmi_normal';
      categoryColor =
        'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';
      needlePercent = 25 + ((bmiValue - 18.5) / 6.4) * 25;
    } else if (bmiValue <= 29.9) {
      categoryKey = 'bmi_overweight';
      categoryColor =
        'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800';
      needlePercent = 50 + ((bmiValue - 25) / 4.9) * 25;
    } else {
      categoryKey = 'bmi_obese';
      categoryColor =
        'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800';
      needlePercent = Math.min(95, 75 + ((bmiValue - 30) / 10) * 25);
    }

    return {
      bmi: bmiValue,
      categoryKey,
      categoryLabel: t(categoryKey),
      categoryColor,
      needlePercent,
      minHealthyWeight,
      maxHealthyWeight,
      weightUnit,
    };
  };

  const result = calculateBmi();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Unit Toggle */}
      <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 max-w-xs">
        <button
          id="bmi-tab-metric"
          onClick={() => setUnitSystem('metric')}
          className={`flex-1 py-1.5 px-3 text-xs md:text-sm font-medium rounded-lg transition-all ${
            unitSystem === 'metric'
              ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {t('lbl_metric', 'Metric (cm, kg)')}
        </button>
        <button
          id="bmi-tab-imperial"
          onClick={() => setUnitSystem('imperial')}
          className={`flex-1 py-1.5 px-3 text-xs md:text-sm font-medium rounded-lg transition-all ${
            unitSystem === 'imperial'
              ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {t('lbl_imperial', 'Imperial (ft, lbs)')}
        </button>
      </div>

      {/* Input Form */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        {unitSystem === 'metric' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('bmi_height', 'Height')} (cm)
              </label>
              <input
                id="bmi-metric-height"
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg"
                placeholder="175"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('bmi_weight', 'Weight')} (kg)
              </label>
              <input
                id="bmi-metric-weight"
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg"
                placeholder="70"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('bmi_height', 'Height')} (ft)
              </label>
              <input
                id="bmi-imperial-feet"
                type="number"
                value={heightFt}
                onChange={(e) => setHeightFt(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg"
                placeholder="5"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('bmi_height', 'Height')} (in)
              </label>
              <input
                id="bmi-imperial-inches"
                type="number"
                value={heightIn}
                onChange={(e) => setHeightIn(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg"
                placeholder="9"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('bmi_weight', 'Weight')} (lbs)
              </label>
              <input
                id="bmi-imperial-weight"
                type="number"
                value={weightLbs}
                onChange={(e) => setWeightLbs(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg"
                placeholder="154"
              />
            </div>
          </div>
        )}

        {/* Results Card */}
        {result && (
          <div className="space-y-4 pt-2">
            <div className={`p-6 rounded-2xl border ${result.categoryColor} flex flex-col md:flex-row md:items-center justify-between gap-6`}>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider">
                  {t('bmi_score', 'Your BMI Score')}
                </span>
                <div className="text-4xl font-extrabold font-mono mt-1">
                  {result.bmi.toFixed(1)} <span className="text-lg font-medium">kg/m²</span>
                </div>
                <div className="inline-block mt-2 px-3 py-1 bg-white/60 dark:bg-slate-900/60 rounded-lg text-sm font-bold">
                  {t('bmi_category', 'Category')}: {result.categoryLabel}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  id="bmi-copy-btn"
                  onClick={() => {
                    handleCopy(`BMI: ${result.bmi.toFixed(1)} (${result.categoryLabel})`);
                    addHistory('bmi', 'BMI Calculation', `${result.bmi.toFixed(1)} (${result.categoryLabel})`);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy Result')}
                </button>
              </div>
            </div>

            {/* Visual Gauge Bar */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span>{t('bmi_underweight', 'Underweight')} (&lt;18.5)</span>
                <span>{t('bmi_normal', 'Normal')} (18.5-24.9)</span>
                <span>{t('bmi_overweight', 'Overweight')} (25-29.9)</span>
                <span>{t('bmi_obese', 'Obese')} (≥30)</span>
              </div>
              <div className="relative h-4 rounded-full bg-gradient-to-r from-sky-400 via-emerald-400 via-amber-400 to-rose-500 overflow-hidden">
                <div
                  className="absolute top-0 bottom-0 w-1.5 bg-slate-900 dark:bg-white shadow-md transition-all duration-300 transform -translate-x-1/2"
                  style={{ left: `${result.needlePercent}%` }}
                />
              </div>
            </div>

            {/* Healthy Range Note */}
            <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong>{t('bmi_healthy_range', 'Healthy Weight Range')}:</strong>{' '}
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {result.minHealthyWeight.toFixed(1)} – {result.maxHealthyWeight.toFixed(1)} {result.weightUnit}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
