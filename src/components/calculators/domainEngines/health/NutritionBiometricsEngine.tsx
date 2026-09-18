import React, { useState } from 'react';
import { useApp } from '../../../../context/AppContext';
import { Tool } from '../../../../types';
import { Copy, Check, Droplets, PieChart, Apple, Scale } from 'lucide-react';

interface NutritionBiometricsEngineProps {
  tool: Tool;
}

export const NutritionBiometricsEngine: React.FC<NutritionBiometricsEngineProps> = ({ tool }) => {
  const { t, addHistory } = useApp();
  const [copied, setCopied] = useState(false);

  // States for nutrition & biometrics
  const [dailyCalories, setDailyCalories] = useState<string>('2200');
  const [dietPlan, setDietPlan] = useState<'balanced' | 'keto' | 'highcarb' | 'zone'>('keto');
  const [glycemicIndex, setGlycemicIndex] = useState<string>('55');
  const [portionCarbsGrams, setPortionCarbsGrams] = useState<string>('30');
  const [weightKg, setWeightKg] = useState<string>('75');
  const [workoutMins, setWorkoutMins] = useState<string>('60');
  const [preWorkoutWtKg, setPreWorkoutWtKg] = useState<string>('75.4');
  const [postWorkoutWtKg, setPostWorkoutWtKg] = useState<string>('74.6');
  const [fluidConsumedLiters, setFluidConsumedLiters] = useState<string>('0.75');
  const [chestCircumferenceCm, setChestCircumferenceCm] = useState<string>('105');
  const [waistCircumferenceCm, setWaistCircumferenceCm] = useState<string>('82');

  const id = tool.id;

  const numCals = Math.max(500, parseFloat(dailyCalories) || 2200);
  const numGi = Math.max(0, Math.min(120, parseFloat(glycemicIndex) || 55));
  const numCarbs = Math.max(0, parseFloat(portionCarbsGrams) || 30);
  const numWeight = Math.max(20, parseFloat(weightKg) || 75);
  const numMins = Math.max(0, parseFloat(workoutMins) || 60);
  const numPreWt = parseFloat(preWorkoutWtKg) || 75.4;
  const numPostWt = parseFloat(postWorkoutWtKg) || 74.6;
  const numFluid = parseFloat(fluidConsumedLiters) || 0.75;
  const numChest = Math.max(30, parseFloat(chestCircumferenceCm) || 105);
  const numWaist = Math.max(30, parseFloat(waistCircumferenceCm) || 82);

  let primaryLabel = 'Nutritional Metric';
  let primaryValue = '0';
  let secondaryMetrics: { label: string; value: string }[] = [];
  let formulaText = '';

  // 1. Custom Macro Split / Keto / High Carb (`macronutrient-keto-highcarb`)
  if (id === 'macronutrient-keto-highcarb') {
    let carbPct = 5, proPct = 25, fatPct = 70;
    if (dietPlan === 'highcarb') { carbPct = 60; proPct = 20; fatPct = 20; }
    else if (dietPlan === 'balanced') { carbPct = 40; proPct = 30; fatPct = 30; }
    else if (dietPlan === 'zone') { carbPct = 40; proPct = 30; fatPct = 30; }

    const carbGrams = Math.round((numCals * (carbPct / 100)) / 4);
    const proGrams = Math.round((numCals * (proPct / 100)) / 4);
    const fatGrams = Math.round((numCals * (fatPct / 100)) / 9);

    primaryLabel = `${dietPlan.toUpperCase()} Macro Distribution`;
    primaryValue = `${fatGrams}g Fat | ${proGrams}g Pro | ${carbGrams}g Carb`;
    secondaryMetrics = [
      { label: 'Dietary Fat (9 kcal/g)', value: `${fatGrams}g (${fatPct}% / ${Math.round(fatGrams * 9)} kcal)` },
      { label: 'Protein (4 kcal/g)', value: `${proGrams}g (${proPct}% / ${Math.round(proGrams * 4)} kcal)` },
      { label: 'Net Carbohydrates (4 kcal/g)', value: `${carbGrams}g (${carbPct}% / ${Math.round(carbGrams * 4)} kcal)` },
      { label: 'Total Caloric Intake', value: `${numCals} kcal/day` },
    ];
    formulaText = 'Grams = (Total Calories × Macro %) ÷ (4 kcal/g for Protein/Carb, 9 kcal/g for Fat)';
  }
  // 2. Glycemic Index & Load (`glycemic-index-lookup`)
  else if (id === 'glycemic-index-lookup') {
    const gl = (numGi * numCarbs) / 100;
    let glRating = 'Low Glycemic Load (≤ 10: Minimal blood glucose surge)';
    if (gl >= 20) glRating = 'High Glycemic Load (≥ 20: Rapid blood glucose spike)';
    else if (gl >= 11) glRating = 'Medium Glycemic Load (11 – 19)';

    primaryLabel = 'Calculated Glycemic Load (GL)';
    primaryValue = `${gl.toFixed(1)}`;
    secondaryMetrics = [
      { label: 'Glycemic Index (GI)', value: `${numGi} (${numGi <= 55 ? 'Low GI' : numGi <= 69 ? 'Medium GI' : 'High GI'})` },
      { label: 'Available Carbohydrates in Serving', value: `${numCarbs} grams` },
      { label: 'Glycemic Impact Tier', value: glRating },
      { label: 'Insulin Response Indicator', value: gl < 10 ? 'Slow, sustained glucose release' : 'Rapid glycemic curve' },
    ];
    formulaText = 'Glycemic Load (GL) = (Glycemic Index × Available Carbs in grams) ÷ 100';
  }
  // 3. Water Intake by Activity (`water-intake-by-activity`)
  else if (id === 'water-intake-by-activity') {
    const baselineLiters = numWeight * 0.035; // 35 mL per kg baseline
    const exerciseFluidLiters = (numMins / 60) * 0.75; // 750 mL per hr workout
    const totalDailyLiters = baselineLiters + exerciseFluidLiters;

    primaryLabel = 'Recommended Daily Hydration';
    primaryValue = `${totalDailyLiters.toFixed(2)} Liters (${Math.round(totalDailyLiters * 33.814)} fl oz)`;
    secondaryMetrics = [
      { label: 'Sedentary Baseline (35 mL/kg)', value: `${baselineLiters.toFixed(2)} L` },
      { label: 'Exercise Sweat Replenishment', value: `+${exerciseFluidLiters.toFixed(2)} L (${numMins} mins)` },
      { label: 'Standard 8oz Glasses Equivalent', value: `${Math.round(totalDailyLiters * 4.22)} Glasses` },
      { label: 'Hourly Workout Hydration Guideline', value: '150–250 mL every 15–20 minutes' },
    ];
    formulaText = 'Hydration = [Weight(kg) × 0.035] + [(Workout_Minutes ÷ 60) × 0.75 Liters]';
  }
  // 4. Sweat Rate Planner (`sweat-rate-hydration`)
  else if (id === 'sweat-rate-hydration') {
    const weightLossKg = Math.max(0, numPreWt - numPostWt);
    const exerciseHours = Math.max(0.1, numMins / 60);
    // Sweat Rate (L/hr) = (Pre_wt_kg - Post_wt_kg + Fluid_consumed_L) / Hours
    const sweatRateLitersPerHour = (weightLossKg + numFluid) / exerciseHours;

    primaryLabel = 'Hourly Sweat Rate';
    primaryValue = `${sweatRateLitersPerHour.toFixed(2)} L/hr`;
    secondaryMetrics = [
      { label: 'Fluid Loss During Session', value: `${(sweatRateLitersPerHour * exerciseHours).toFixed(2)} Liters` },
      { label: 'Body Mass Deficit (Pre - Post)', value: `${weightLossKg.toFixed(2)} kg (${((weightLossKg / numPreWt) * 100).toFixed(1)}% body weight)` },
      { label: 'Fluid Drunk During Workout', value: `${numFluid.toFixed(2)} Liters` },
      { label: 'Optimal Post-Exercise Rehydration', value: `${((weightLossKg * 1.5)).toFixed(2)} L (150% of fluid deficit with electrolytes)` },
    ];
    formulaText = 'Sweat Rate (L/hr) = [Weight Deficit (kg) + Fluid Ingested (L)] ÷ Exercise Duration (hours)';
  }
  // 5. Chest to Waist Ratio (`chest-to-waist-ratio`)
  else {
    const ratio = numWaist > 0 ? numChest / numWaist : 0;
    let physiqueTier = 'Standard Athletic Proportion';
    if (ratio >= 1.618) physiqueTier = 'Golden Ratio / Adonis Index Peak (≥ 1.618)';
    else if (ratio >= 1.45) physiqueTier = 'V-Taper Muscularity (1.45 – 1.61)';

    primaryLabel = 'Chest / Shoulder to Waist Ratio';
    primaryValue = `${ratio.toFixed(3)}:1`;
    secondaryMetrics = [
      { label: 'Measured Chest Circumference', value: `${numChest} cm (${(numChest / 2.54).toFixed(1)} in)` },
      { label: 'Measured Waist Circumference', value: `${numWaist} cm (${(numWaist / 2.54).toFixed(1)} in)` },
      { label: 'Golden Ratio Baseline (Phi)', value: '1.618:1 (Classical Aesthetic Standard)' },
      { label: 'Waist-to-Chest Metric', value: physiqueTier },
    ];
    formulaText = 'Ratio = Chest Circumference ÷ Narrowest Natural Waist Circumference';
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
        {/* Input Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {id === 'macronutrient-keto-highcarb' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('nutri_calories', 'Target Daily Calories (kcal)')}
                </label>
                <input
                  type="number"
                  value={dailyCalories}
                  onChange={(e) => setDailyCalories(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="2200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('nutri_diet_type', 'Diet Strategy / Protocol')}
                </label>
                <select
                  value={dietPlan}
                  onChange={(e) => setDietPlan(e.target.value as any)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base"
                >
                  <option value="keto">Ketogenic (70% Fat / 25% Pro / 5% Carb)</option>
                  <option value="highcarb">High Carb Endurance (60% Carb / 20% Pro / 20% Fat)</option>
                  <option value="balanced">Balanced Fitness (40% Carb / 30% Pro / 30% Fat)</option>
                  <option value="zone">The Zone Diet (40% Carb / 30% Pro / 30% Fat)</option>
                </select>
              </div>
            </>
          )}

          {id === 'glycemic-index-lookup' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('nutri_gi', 'Food Glycemic Index (GI 0-100)')}
                </label>
                <input
                  type="number"
                  value={glycemicIndex}
                  onChange={(e) => setGlycemicIndex(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="55"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('nutri_portion_carbs', 'Available Carbs in Serving (Grams)')}
                </label>
                <input
                  type="number"
                  value={portionCarbsGrams}
                  onChange={(e) => setPortionCarbsGrams(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="30"
                />
              </div>
            </>
          )}

          {id === 'water-intake-by-activity' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('nutri_weight_kg', 'Body Weight (kg)')}
                </label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="75"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('nutri_workout_mins', 'Workout Duration (Minutes)')}
                </label>
                <input
                  type="number"
                  value={workoutMins}
                  onChange={(e) => setWorkoutMins(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="60"
                />
              </div>
            </>
          )}

          {id === 'sweat-rate-hydration' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('nutri_pre_wt', 'Pre-Exercise Weight (kg)')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={preWorkoutWtKg}
                  onChange={(e) => setPreWorkoutWtKg(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="75.4"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('nutri_post_wt', 'Post-Exercise Weight (kg)')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={postWorkoutWtKg}
                  onChange={(e) => setPostWorkoutWtKg(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="74.6"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('nutri_fluid_drunk', 'Fluid Ingested During Exercise (Liters)')}
                </label>
                <input
                  type="number"
                  step="0.05"
                  value={fluidConsumedLiters}
                  onChange={(e) => setFluidConsumedLiters(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="0.75"
                />
              </div>
            </>
          )}

          {id === 'chest-to-waist-ratio' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('nutri_chest_cm', 'Chest / Shoulder Circumference (cm)')}
                </label>
                <input
                  type="number"
                  value={chestCircumferenceCm}
                  onChange={(e) => setChestCircumferenceCm(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="105"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('nutri_waist_cm', 'Waist Circumference (cm)')}
                </label>
                <input
                  type="number"
                  value={waistCircumferenceCm}
                  onChange={(e) => setWaistCircumferenceCm(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="82"
                />
              </div>
            </>
          )}
        </div>

        {/* Primary Banner */}
        <div className="p-6 bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
              {primaryLabel}
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-teal-600 dark:text-teal-400 mt-1">
              {primaryValue}
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 self-start sm:self-center"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? t('copied', 'Copied!') : t('copy_summary', 'Copy Summary')}
          </button>
        </div>

        {/* Secondary Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {secondaryMetrics.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.label}</span>
              <span className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Formula & Verification */}
        <div className="p-4 bg-slate-100 dark:bg-slate-800/40 rounded-xl space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
          <div className="font-semibold text-slate-700 dark:text-slate-300">
            Formula: <code className="font-mono text-slate-800 dark:text-slate-200">{formulaText}</code>
          </div>
        </div>
      </div>
    </div>
  );
};
