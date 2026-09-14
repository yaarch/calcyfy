import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Flame, Activity, Copy, Check, Info } from 'lucide-react';

export const CalorieCalculator: React.FC = () => {
  const { t, addHistory } = useApp();
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<string>('28');

  // Metric
  const [heightCm, setHeightCm] = useState<string>('178');
  const [weightKg, setWeightKg] = useState<string>('75');

  // Imperial
  const [heightFt, setHeightFt] = useState<string>('5');
  const [heightIn, setHeightIn] = useState<string>('10');
  const [weightLbs, setWeightLbs] = useState<string>('165');

  const [activityMultiplier, setActivityMultiplier] = useState<string>('1.55'); // Moderate
  const [copied, setCopied] = useState(false);

  const calculateCalories = () => {
    const a = parseFloat(age);
    let hCm = 0;
    let wKg = 0;

    if (unitSystem === 'metric') {
      hCm = parseFloat(heightCm);
      wKg = parseFloat(weightKg);
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      hCm = (ft * 12 + inches) * 2.54;
      wKg = (parseFloat(weightLbs) || 0) * 0.45359237;
    }

    if (isNaN(a) || isNaN(hCm) || isNaN(wKg) || a <= 0 || hCm <= 0 || wKg <= 0) {
      return null;
    }

    // Mifflin-St Jeor formula
    let bmr = 10 * wKg + 6.25 * hCm - 5 * a;
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    const mult = parseFloat(activityMultiplier) || 1.2;
    const maintenanceTDEE = Math.round(bmr * mult);

    const mildLoss = Math.round(maintenanceTDEE - 250);
    const weightLoss = Math.round(maintenanceTDEE - 500);
    const mildGain = Math.round(maintenanceTDEE + 250);

    // Macros for maintenance (30% Protein, 40% Carbs, 30% Fat)
    const proteinGrams = Math.round((maintenanceTDEE * 0.3) / 4);
    const carbsGrams = Math.round((maintenanceTDEE * 0.4) / 4);
    const fatGrams = Math.round((maintenanceTDEE * 0.3) / 9);

    return {
      bmr: Math.round(bmr),
      maintenanceTDEE,
      mildLoss,
      weightLoss,
      mildGain,
      proteinGrams,
      carbsGrams,
      fatGrams,
    };
  };

  const res = calculateCalories();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Unit & Gender Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <button
            id="cal-tab-metric"
            type="button"
            onClick={() => setUnitSystem('metric')}
            className={`py-1.5 px-3 text-xs md:text-sm font-medium rounded-lg transition-all ${
              unitSystem === 'metric'
                ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Metric (cm, kg)
          </button>
          <button
            id="cal-tab-imperial"
            type="button"
            onClick={() => setUnitSystem('imperial')}
            className={`py-1.5 px-3 text-xs md:text-sm font-medium rounded-lg transition-all ${
              unitSystem === 'imperial'
                ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Imperial (ft, lbs)
          </button>
        </div>

        <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <button
            id="cal-gender-male"
            type="button"
            onClick={() => setGender('male')}
            className={`py-1.5 px-4 text-xs md:text-sm font-semibold rounded-lg transition-all ${
              gender === 'male'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Male
          </button>
          <button
            id="cal-gender-female"
            type="button"
            onClick={() => setGender('female')}
            className={`py-1.5 px-4 text-xs md:text-sm font-semibold rounded-lg transition-all ${
              gender === 'female'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Female
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Age (Years)
            </label>
            <input
              id="cal-age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg"
              placeholder="28"
            />
          </div>

          {unitSystem === 'metric' ? (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Height (cm)
                </label>
                <input
                  id="cal-metric-h"
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg"
                  placeholder="178"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Weight (kg)
                </label>
                <input
                  id="cal-metric-w"
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg"
                  placeholder="75"
                />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Feet
                  </label>
                  <input
                    id="cal-imp-ft"
                    type="number"
                    value={heightFt}
                    onChange={(e) => setHeightFt(e.target.value)}
                    className="w-full px-3 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg"
                    placeholder="5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Inches
                  </label>
                  <input
                    id="cal-imp-in"
                    type="number"
                    value={heightIn}
                    onChange={(e) => setHeightIn(e.target.value)}
                    className="w-full px-3 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg"
                    placeholder="10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Weight (lbs)
                </label>
                <input
                  id="cal-imp-lbs"
                  type="number"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg"
                  placeholder="165"
                />
              </div>
            </>
          )}
        </div>

        {/* Activity Level Selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
            Daily Activity Level
          </label>
          <select
            id="cal-activity"
            value={activityMultiplier}
            onChange={(e) => setActivityMultiplier(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500"
          >
            <option value="1.2">Sedentary (Little or no exercise, desk job)</option>
            <option value="1.375">Lightly Active (Exercise 1-3 days/week)</option>
            <option value="1.55">Moderately Active (Exercise 3-5 days/week)</option>
            <option value="1.725">Very Active (Hard exercise 6-7 days/week)</option>
            <option value="1.9">Extra Active (Hard daily training / physical job)</option>
          </select>
        </div>

        {res && (
          <div className="space-y-6 pt-2">
            {/* Primary TDEE */}
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  Daily Maintenance Calorie Goal (TDEE)
                </span>
                <div className="text-4xl font-extrabold text-emerald-950 dark:text-emerald-100 font-mono mt-1">
                  {res.maintenanceTDEE.toLocaleString()}{' '}
                  <span className="text-lg font-normal text-slate-500">kcal / day</span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Basal Metabolic Rate (BMR): {res.bmr.toLocaleString()} kcal/day at rest
                </div>
              </div>

              <button
                id="cal-copy-btn"
                onClick={() => {
                  handleCopy(`Maintenance: ${res.maintenanceTDEE} kcal/day (BMR: ${res.bmr} kcal)`);
                  addHistory('calorie', 'Calorie Needs (TDEE)', `${res.maintenanceTDEE} kcal/day`);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? t('btn_copied') : t('btn_copy')}
              </button>
            </div>

            {/* Target Goals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 bg-sky-50 dark:bg-sky-950/30 rounded-xl border border-sky-200 dark:border-sky-800/50">
                <span className="text-xs font-bold text-sky-700 dark:text-sky-300">
                  Weight Loss (-1 lb/week)
                </span>
                <div className="text-2xl font-bold font-mono text-sky-950 dark:text-sky-100 mt-1">
                  {res.weightLoss.toLocaleString()} kcal
                </div>
                <span className="text-[11px] text-sky-600 dark:text-sky-400">-500 kcal deficit</span>
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800/50">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  Mild Weight Loss (-0.5 lb/week)
                </span>
                <div className="text-2xl font-bold font-mono text-emerald-950 dark:text-emerald-100 mt-1">
                  {res.mildLoss.toLocaleString()} kcal
                </div>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400">-250 kcal deficit</span>
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800/50">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
                  Mild Weight Gain (+0.5 lb/week)
                </span>
                <div className="text-2xl font-bold font-mono text-amber-950 dark:text-amber-100 mt-1">
                  {res.mildGain.toLocaleString()} kcal
                </div>
                <span className="text-[11px] text-amber-600 dark:text-amber-400">+250 kcal surplus</span>
              </div>
            </div>

            {/* Macronutrient Split */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                Recommended Balanced Macronutrients (30P / 40C / 30F)
              </span>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="text-xs text-slate-500">Protein (30%)</div>
                  <div className="text-base font-bold font-mono text-slate-800 dark:text-slate-100 mt-0.5">
                    {res.proteinGrams}g
                  </div>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="text-xs text-slate-500">Carbs (40%)</div>
                  <div className="text-base font-bold font-mono text-slate-800 dark:text-slate-100 mt-0.5">
                    {res.carbsGrams}g
                  </div>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="text-xs text-slate-500">Fats (30%)</div>
                  <div className="text-base font-bold font-mono text-slate-800 dark:text-slate-100 mt-0.5">
                    {res.fatGrams}g
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
