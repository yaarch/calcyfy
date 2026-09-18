import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Tool } from '../../types';
import {
  Copy,
  Check,
  Calculator,
  Info,
  Zap,
  RefreshCw,
  Layers,
  Download,
  FileSpreadsheet,
  Printer,
  Share2,
  BarChart3,
  TrendingUp,
} from 'lucide-react';
import { executePrint } from '../../utils/printHelper';

interface UniversalToolEngineProps {
  toolId: string;
  tool?: Tool;
}

// Safely parse YYYY-MM-DD into a local Date without UTC offset shifts
function parseDateSafe(dateStr: string): Date | null {
  if (!dateStr) return null;
  const parts = dateStr.split('-');
  if (parts.length !== 3) return null;
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);
  if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
  const dt = new Date(y, m, d);
  return isNaN(dt.getTime()) ? null : dt;
}

export function getDefaultsForTool(toolId: string) {
  const id = toolId.toLowerCase();
  if (id === 'keto-macros' || id.includes('keto')) return { v1: '2000', v2: '25', v3: '125', v4: '0' };
  if (id === 'water-fasting') return { v1: '24', v2: '75', v3: '3.0', v4: '0' };
  if (id === 'protein-intake') return { v1: '75', v2: '2.0', v3: '4', v4: '0' };
  if (id === 'creatine-dosing') return { v1: '75', v2: '3.5', v3: '0', v4: '0' };
  if (id === 'caffeine-halflife') return { v1: '200', v2: '6', v3: '5', v4: '0' };
  if (id === 'steps-to-calories') return { v1: '10000', v2: '70', v3: '0', v4: '0' };
  if (id === 'running-pace-split') return { v1: '10', v2: '50', v3: '0', v4: '0' };
  if (id === 'bench-press-max') return { v1: '100', v2: '5', v3: '0', v4: '0' };
  if (id === 'tdee-advanced') return { v1: '75', v2: '178', v3: '30', v4: '1.55' };
  if (id === 'intermittent-fasting') return { v1: '16', v2: '12', v3: '0', v4: '0' };
  if (id === 'lean-body-mass') return { v1: '75', v2: '18', v3: '178', v4: '0' };
  if (id === 'body-frame-size') return { v1: '17', v2: '178', v3: '0', v4: '0' };
  if (id === 'glycemic-load') return { v1: '55', v2: '30', v3: '0', v4: '0' };
  if (id === 'sleep-debt') return { v1: '8', v2: '6', v3: '5', v4: '0' };
  if (id === 'menstrual-cycle') return { v1: '28', v2: '5', v3: '12', v4: '0' };
  if (id === 'combinatorics-ncr') return { v1: '10', v2: '3', v3: '0', v4: '0' };
  if (id === 'circle-properties') return { v1: '5', v2: '0', v3: '0', v4: '0' };
  if (id === 'triangle-solver') return { v1: '3', v2: '4', v3: '5', v4: '0' };
  if (id === 'vector-magnitude') return { v1: '3', v2: '4', v3: '0', v4: '0' };
  if (id === 'standard-deviation-calc') return { v1: '10', v2: '20', v3: '30', v4: '40' };
  if (id === 'percentile-calc') return { v1: '75', v2: '100', v3: '0', v4: '0' };
  if (id === 'fraction-to-percent') return { v1: '3', v2: '4', v3: '0', v4: '0' };
  if (id === 'modulo-calc') return { v1: '29', v2: '6', v3: '0', v4: '0' };
  if (id === 'binary-addition') return { v1: '10110', v2: '1101', v3: '0', v4: '0' };
  if (id === 'hex-calculator') return { v1: '2F', v2: 'A1', v3: '0', v4: '0' };
  if (id === 'geometric-series') return { v1: '2', v2: '3', v3: '5', v4: '0' };
  if (id === 'arithmetic-series') return { v1: '3', v2: '5', v3: '10', v4: '0' };
  if (id === 'root-mean-square') return { v1: '170', v2: '0', v3: '0', v4: '0' };
  if (id === 'percentage-of-total') return { v1: '45', v2: '180', v3: '0', v4: '0' };
  if (id === 'car-depreciation') return { v1: '35000', v2: '5', v3: '15', v4: '0' };
  if (id === 'ev-charging-time') return { v1: '75', v2: '20', v3: '80', v4: '11' };
  if (id === 'paint-coverage') return { v1: '15', v2: '12', v3: '9', v4: '3' };
  if (id === 'flooring-tile') return { v1: '12', v2: '14', v3: '16', v4: '10' };
  if (id === 'wallpaper-rolls') return { v1: '40', v2: '8', v3: '20.5', v4: '12' };
  if (id === 'mulch-topsoil') return { v1: '30', v2: '10', v3: '3', v4: '0' };
  if (id === 'air-conditioner-btu') return { v1: '350', v2: '8', v3: '1.0', v4: '2' };
  if (id === 'solar-panel-payback') return { v1: '18000', v2: '2100', v3: '30', v4: '3' };
  if (id === 'stair-stringer') return { v1: '108', v2: '7.5', v3: '10', v4: '0' };
  if (id === 'roof-pitch-slope') return { v1: '6', v2: '24', v3: '0', v4: '0' };
  if (id === 'roi-calculator') return { v1: '10000', v2: '14500', v3: '3', v4: '0' };
  if (id === 'freelance-rate-calc') return { v1: '85000', v2: '25', v3: '4', v4: '35' };
  if (id === 'break-even-point') return { v1: '25000', v2: '120', v3: '45', v4: '0' };
  if (id === 'stock-dividend-yield') return { v1: '3.50', v2: '85.00', v3: '200', v4: '0' };
  if (id === 'rental-property-yield') return { v1: '320000', v2: '2400', v3: '7200', v4: '0' };
  if (id === 'cap-rate') return { v1: '28000', v2: '400000', v3: '0', v4: '0' };
  if (id === 'college-savings') return { v1: '120000', v2: '12', v3: '15000', v4: '6.5' };
  if (id === '401k-retirement') return { v1: '32', v2: '65', v3: '45000', v4: '85000' };
  if (id === 'inflation-future') return { v1: '1000', v2: '3.2', v3: '15', v4: '0' };
  if (id === 'stock-split-calculator' || id.includes('stock-split')) return { v1: '100', v2: '200', v3: '2', v4: '0' };
  if (id === 'currency-crypto' || id.includes('crypto')) return { v1: '1.5', v2: '65000', v3: '42000', v4: '0' };
  return { v1: '100', v2: '10', v3: '5', v4: '2' };
}

export const UniversalToolEngine: React.FC<UniversalToolEngineProps> = ({ toolId, tool }) => {
  const { t, addHistory, isRTL, lang } = useApp();
  const [copied, setCopied] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Initialize values from URL hash params if available, else tool defaults
  const getInitialParam = (key: string, fallbackKey: 'v1' | 'v2' | 'v3' | 'v4') => {
    try {
      const hash = window.location.hash;
      const queryIdx = hash.indexOf('?');
      if (queryIdx !== -1) {
        const searchParams = new URLSearchParams(hash.slice(queryIdx));
        const p = searchParams.get(key);
        if (p !== null) return p;
      }
    } catch {
      // fallback
    }
    const defs = getDefaultsForTool(toolId);
    return defs[fallbackKey];
  };

  // General inputs state
  const todayStr = new Date().toISOString().split('T')[0];
  const [v1, setV1] = useState<string>(() => getInitialParam('v1', 'v1'));
  const [v2, setV2] = useState<string>(() => getInitialParam('v2', 'v2'));
  const [v3, setV3] = useState<string>(() => getInitialParam('v3', 'v3'));
  const [v4, setV4] = useState<string>(() => getInitialParam('v4', 'v4'));
  const [textVal, setTextVal] = useState<string>('Hello Calcyfy World');

  // Date and Time specific state
  const [date1, setDate1] = useState<string>('1995-06-15');
  const [date2, setDate2] = useState<string>(todayStr);
  const [time1, setTime1] = useState<string>('09:00');
  const [time2, setTime2] = useState<string>('17:30');
  const [unitSelect1, setUnitSelect1] = useState<string>('EST (New York, UTC-5)');
  const [unitSelect2, setUnitSelect2] = useState<string>('AST (Riyadh, UTC+3)');

  // Reset/sync states when switching tools
  useEffect(() => {
    const isAgeTool = toolId.toLowerCase().includes('age') || toolId.toLowerCase().includes('birth') || toolId.toLowerCase().includes('biorhythm');
    if (isAgeTool) {
      setDate1('1995-06-15');
      setDate2(new Date().toISOString().split('T')[0]);
    } else {
      setDate1(new Date().toISOString().split('T')[0]);
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 90);
      setDate2(futureDate.toISOString().split('T')[0]);
    }

    // Sync defaults if not provided in URL
    const hash = window.location.hash;
    const hasParams = hash.includes('?v1=') || hash.includes('&v1=');
    if (!hasParams) {
      const defs = getDefaultsForTool(toolId);
      setV1(defs.v1);
      setV2(defs.v2);
      setV3(defs.v3);
      setV4(defs.v4);
    }
  }, [toolId]);

  // Sync inputs to URL query string for shareability
  useEffect(() => {
    try {
      const baseHash = window.location.hash.split('?')[0] || `#tool:${toolId}`;
      const params = new URLSearchParams();
      const defs = getDefaultsForTool(toolId);
      if (v1 !== defs.v1) params.set('v1', v1);
      if (v2 !== defs.v2) params.set('v2', v2);
      if (v3 !== defs.v3) params.set('v3', v3);
      if (v4 !== defs.v4) params.set('v4', v4);
      const str = params.toString();
      const newHash = str ? `${baseHash}?${str}` : baseHash;
      window.history.replaceState(null, '', newHash);
    } catch {
      // Ignore location errors
    }
  }, [v1, v2, v3, v4, toolId]);

  const copyToClipboard = (str: string) => {
    navigator.clipboard.writeText(str);
    setCopied(true);
    addHistory(toolId, 'Calculation Result', str);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const id = toolId.toLowerCase();
  const cat = tool?.categoryId || '';

  // --- Dynamic Input Setup & Resolver ---
  const getToolConfig = () => {
    const num1 = parseFloat(v1) || 0;
    const num2 = parseFloat(v2) || 0;
    const num3 = parseFloat(v3) || 0;
    const num4 = parseFloat(v4) || 0;

    // --- BATCH 3 & SPECIALIZED DOMAIN CALCULATORS ---

    // 1. Keto Macros & Nutrition
    if (id === 'keto-macros' || id.includes('keto')) {
      const calories = num1 || 2000;
      const netCarbs = num2 || 25;
      const protein = num3 || 125;

      const carbCals = netCarbs * 4;
      const proteinCals = protein * 4;
      const fatCals = Math.max(0, calories - carbCals - proteinCals);
      const fatGrams = fatCals / 9;

      const fatPct = calories > 0 ? (fatCals / calories) * 100 : 0;
      const proteinPct = calories > 0 ? (proteinCals / calories) * 100 : 0;
      const carbPct = calories > 0 ? (carbCals / calories) * 100 : 0;

      return {
        type: 'fields',
        fields: [
          { label: 'Target Daily Calories (kcal)', value: v1, setter: setV1, type: 'number' },
          { label: 'Net Carbs Limit (g)', value: v2, setter: setV2, type: 'number' },
          { label: 'Protein Target (g)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Target Dietary Fat',
        primaryResult: `${fatGrams.toFixed(1)} g / day`,
        secondary: [
          { label: 'Fat Energy Split', value: `${fatCals.toFixed(0)} kcal (${fatPct.toFixed(1)}%)` },
          { label: 'Protein Energy Split', value: `${proteinCals.toFixed(0)} kcal (${proteinPct.toFixed(1)}%)` },
          { label: 'Net Carb Split', value: `${carbCals.toFixed(0)} kcal (${carbPct.toFixed(1)}%)` },
          { label: 'Ketosis Target', value: 'Net Carbs ≤ 5-10% of Daily Calories' },
        ],
        formula: 'Fat (g) = [Total Calories - (Protein × 4) - (Net Carbs × 4)] / 9',
      };
    }

    if (id === 'water-fasting' || (id.includes('fasting') && !id.includes('intermittent'))) {
      const hours = num1 || 24;
      const weight = num2 || 75;
      const targetWater = num3 || 3.0;

      const baselineWater = (weight * 35) / 1000;
      const recWater = Math.max(targetWater, baselineWater + 0.5);
      const glycogenEst = Math.min(24, Math.max(0, 24 - hours));
      const autophagyStatus =
        hours < 16
          ? 'Early Fast (Glycogen Burning)'
          : hours < 24
          ? 'Ketosis Onset & Glycogen Depletion'
          : hours < 48
          ? 'Peak Autophagy & Fat Oxidation'
          : 'Deep Ketosis / Cellular Cleansing';

      return {
        type: 'fields',
        fields: [
          { label: 'Target Fasting Duration (Hours)', value: v1, setter: setV1, type: 'number' },
          { label: 'Current Body Weight (kg)', value: v2, setter: setV2, type: 'number' },
          { label: 'Target Daily Water Intake (L)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Daily Fluid & Hydration Target',
        primaryResult: `${recWater.toFixed(1)} Liters / day`,
        secondary: [
          { label: 'Metabolic Phase', value: autophagyStatus },
          { label: 'Glycogen Depletion Est.', value: glycogenEst === 0 ? 'Fully Depleted (Ketosis)' : `~${glycogenEst} Hours remaining` },
          { label: 'Electrolyte Protocol', value: 'Sodium ~2-3g, Potassium ~1g, Magnesium ~300mg' },
        ],
        formula: 'Daily Water = Body Weight (kg) × 35 mL + 500 mL Fasting Offset',
      };
    }

    if (id === 'protein-intake' || (id.includes('protein') && !id.includes('keto'))) {
      const weight = num1 || 75;
      const ratio = num2 || 2.0;
      const meals = num3 || 4;

      const totalProtein = weight * ratio;
      const perMeal = meals > 0 ? totalProtein / meals : totalProtein;
      const proteinCals = totalProtein * 4;

      return {
        type: 'fields',
        fields: [
          { label: 'Body Weight (kg)', value: v1, setter: setV1, type: 'number' },
          { label: 'Target Ratio (g / kg bodyweight)', value: v2, setter: setV2, type: 'number' },
          { label: 'Meals per Day', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Total Daily Protein Target',
        primaryResult: `${totalProtein.toFixed(1)} grams`,
        secondary: [
          { label: 'Per-Meal Distribution', value: `${perMeal.toFixed(1)} g / meal (${meals} meals)` },
          { label: 'Protein Caloric Equivalent', value: `${proteinCals.toFixed(0)} kcal` },
          { label: 'Recommended Bracket', value: '1.6 - 2.2 g/kg (Hypertrophy)' },
        ],
        formula: 'Daily Protein = Weight (kg) × Ratio (g/kg)',
      };
    }

    if (id === 'creatine-dosing' || id.includes('creatine')) {
      const weight = num1 || 75;
      const maintenanceDose = Math.max(3, Math.min(10, weight * 0.05));
      const loadingDose = weight * 0.3;
      const waterTarget = (weight * 40) / 1000;

      return {
        type: 'fields',
        fields: [
          { label: 'Body Weight (kg)', value: v1, setter: setV1, type: 'number' },
          { label: 'Daily Water Goal (L)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Daily Maintenance Dose',
        primaryResult: `${maintenanceDose.toFixed(1)} g / day`,
        secondary: [
          { label: 'Loading Phase (5-7 Days)', value: `${loadingDose.toFixed(0)} g/day (split 4x)` },
          { label: 'Optimal Hydration', value: `${waterTarget.toFixed(1)} L / day` },
          { label: 'Timing Protocol', value: 'Post-workout with carbs/protein' },
        ],
        formula: 'Maintenance = 0.03-0.05 g/kg | Loading = 0.3 g/kg for 5-7 days',
      };
    }

    if (id === 'caffeine-halflife' || id.includes('caffeine')) {
      const dose = num1 || 200;
      const hours = num2 || 6;
      const halfLife = num3 || 5;

      const remaining = dose * Math.pow(0.5, hours / (halfLife || 5));
      const hoursTo50 = Math.max(0, halfLife * (Math.log2(dose / 50) || 0));
      const pctCleared = Math.max(0, Math.min(100, ((dose - remaining) / (dose || 1)) * 100));

      return {
        type: 'fields',
        fields: [
          { label: 'Initial Caffeine Dose (mg)', value: v1, setter: setV1, type: 'number' },
          { label: 'Hours Elapsed (hrs)', value: v2, setter: setV2, type: 'number' },
          { label: 'Metabolic Half-Life (hrs)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Remaining Active Caffeine',
        primaryResult: `${remaining.toFixed(1)} mg`,
        secondary: [
          { label: 'Caffeine Cleared', value: `${pctCleared.toFixed(1)}%` },
          { label: 'Time to Sleep Threshold (<50mg)', value: `${hoursTo50.toFixed(1)} Hours from ingestion` },
          { label: 'Sleep Hygiene Rule', value: 'Zero caffeine 8-10 hrs before bed' },
        ],
        formula: 'Remaining = Initial Dose × (0.5)^(Hours / Half-Life)',
      };
    }

    if (id === 'steps-to-calories' || (id.includes('steps') && !id.includes('stair'))) {
      const steps = num1 || 10000;
      const weightKg = num2 || 70;
      const strideMeters = 0.762;
      const distanceKm = (steps * strideMeters) / 1000;
      const distanceMiles = distanceKm * 0.621371;
      const calories = weightKg * distanceKm * 0.73;

      return {
        type: 'fields',
        fields: [
          { label: 'Daily Step Count', value: v1, setter: setV1, type: 'number' },
          { label: 'Body Weight (kg)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Estimated Calories Burned',
        primaryResult: `${Math.round(calories)} kcal`,
        secondary: [
          { label: 'Distance Covered (km)', value: `${distanceKm.toFixed(2)} km` },
          { label: 'Distance Covered (miles)', value: `${distanceMiles.toFixed(2)} miles` },
          { label: 'Est. Active Walking Time', value: `${Math.round(steps / 100)} Minutes` },
        ],
        formula: 'Energy Burn ≈ Weight (kg) × Distance (km) × 0.73',
      };
    }

    if (id === 'running-pace-split' || id.includes('pace-split') || id.includes('running-pace')) {
      const distKm = num1 || 10;
      const totalMins = num2 || 50;

      const paceMinPerKm = distKm > 0 ? totalMins / distKm : 0;
      const paceMin = Math.floor(paceMinPerKm);
      const paceSec = Math.round((paceMinPerKm - paceMin) * 60);

      const paceMinPerMile = paceMinPerKm * 1.60934;
      const paceMileMin = Math.floor(paceMinPerMile);
      const paceMileSec = Math.round((paceMinPerMile - paceMileMin) * 60);

      const speedKmh = totalMins > 0 ? distKm / (totalMins / 60) : 0;
      const halfSplit = (totalMins / 2).toFixed(1);

      return {
        type: 'fields',
        fields: [
          { label: 'Total Distance (km)', value: v1, setter: setV1, type: 'number' },
          { label: 'Target Finish Time (Minutes)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Average Kilometer Pace',
        primaryResult: `${paceMin}:${paceSec < 10 ? '0' : ''}${paceSec} / km`,
        secondary: [
          { label: 'Mile Pace', value: `${paceMileMin}:${paceMileSec < 10 ? '0' : ''}${paceMileSec} / mile` },
          { label: 'Average Speed', value: `${speedKmh.toFixed(2)} km/h` },
          { label: 'Halfway 50% Split', value: `${halfSplit} mins` },
        ],
        formula: 'Pace = Total Time / Total Distance | Speed = Distance / (Time / 60)',
      };
    }

    if (id === 'bench-press-max' || id.includes('bench-press') || id.includes('one-rep-max') || id.includes('1rm')) {
      const weight = num1 || 100;
      const reps = Math.min(30, Math.max(1, Math.round(num2) || 5));

      const epley1RM = reps === 1 ? weight : weight * (1 + reps / 30);
      const brzycki1RM = reps === 1 ? weight : weight * (36 / (37 - reps));
      const avg1RM = (epley1RM + brzycki1RM) / 2;

      return {
        type: 'fields',
        fields: [
          { label: 'Weight Lifted (kg / lbs)', value: v1, setter: setV1, type: 'number' },
          { label: 'Repetitions Completed (reps)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Estimated 1 Rep Max (1RM)',
        primaryResult: `${avg1RM.toFixed(1)} kg / lbs`,
        secondary: [
          { label: '85% 1RM (5RM Strength Target)', value: `${(avg1RM * 0.85).toFixed(1)}` },
          { label: '70% 1RM (10-12RM Hypertrophy)', value: `${(avg1RM * 0.7).toFixed(1)}` },
          { label: 'Epley Formula Value', value: `${epley1RM.toFixed(1)}` },
          { label: 'Brzycki Formula Value', value: `${brzycki1RM.toFixed(1)}` },
        ],
        formula: '1RM = Weight × (1 + Reps / 30) (Epley) | Weight × 36 / (37 - Reps) (Brzycki)',
      };
    }

    if (id === 'tdee-advanced' || (id.includes('tdee') && !id.includes('keto'))) {
      const weight = num1 || 75;
      const height = num2 || 178;
      const age = num3 || 30;
      const mult = num4 || 1.55;

      const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      const tdee = bmr * mult;

      return {
        type: 'fields',
        fields: [
          { label: 'Body Weight (kg)', value: v1, setter: setV1, type: 'number' },
          { label: 'Height (cm)', value: v2, setter: setV2, type: 'number' },
          { label: 'Age (Years)', value: v3, setter: setV3, type: 'number' },
          { label: 'Activity Multiplier (1.2 - 1.9)', value: v4, setter: setV4, type: 'number' },
        ],
        primaryLabel: 'Total Daily Energy Expenditure (TDEE)',
        primaryResult: `${Math.round(tdee)} kcal / day`,
        secondary: [
          { label: 'Basal Metabolic Rate (BMR)', value: `${Math.round(bmr)} kcal` },
          { label: 'Weight Loss Deficit (-500 kcal)', value: `${Math.round(tdee - 500)} kcal` },
          { label: 'Lean Bulk Surplus (+300 kcal)', value: `${Math.round(tdee + 300)} kcal` },
        ],
        formula: 'TDEE = BMR × Activity Factor | BMR = 10W + 6.25H - 5A + 5',
      };
    }

    if (id === 'intermittent-fasting') {
      const fastHours = num1 || 16;
      const startEatHour = num2 || 12;
      const eatHours = Math.max(1, 24 - fastHours);
      const endEatHour = (startEatHour + eatHours) % 24;

      const fmtTime = (h: number) => {
        const period = h >= 12 ? 'PM' : 'AM';
        const displayHour = h % 12 === 0 ? 12 : h % 12;
        return `${displayHour}:00 ${period}`;
      };

      return {
        type: 'fields',
        fields: [
          { label: 'Fasting Window (Hours)', value: v1, setter: setV1, type: 'number' },
          { label: 'First Meal Time (24h clock, e.g. 12 = noon)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Daily Eating Window',
        primaryResult: `${fmtTime(startEatHour)} – ${fmtTime(endEatHour)} (${eatHours} hrs)`,
        secondary: [
          { label: 'Fasting Protocol', value: `${fastHours}:${eatHours} Fast` },
          { label: 'Fasting Phase', value: `${fmtTime(endEatHour)} to ${fmtTime(startEatHour)} (${fastHours} hrs)` },
          { label: 'Autophagy Onset Window', value: `Hours 16 to 24 of fast` },
        ],
        formula: 'Eating Window = 24 - Fasting Hours',
      };
    }

    if (id === 'lean-body-mass') {
      const weight = num1 || 75;
      const bfPct = num2 || 18;
      const height = num3 || 178;

      const fatMass = weight * (bfPct / 100);
      const lbm = weight - fatMass;
      const boerLbm = 0.407 * weight + 0.267 * height - 19.2;

      return {
        type: 'fields',
        fields: [
          { label: 'Total Body Weight (kg)', value: v1, setter: setV1, type: 'number' },
          { label: 'Body Fat Percentage (%)', value: v2, setter: setV2, type: 'number' },
          { label: 'Height (cm)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Lean Body Mass (LBM)',
        primaryResult: `${lbm.toFixed(1)} kg (${((lbm / weight) * 100).toFixed(1)}%)`,
        secondary: [
          { label: 'Body Fat Mass', value: `${fatMass.toFixed(1)} kg (${bfPct}%)` },
          { label: 'Boer Formula Estimate', value: `${boerLbm.toFixed(1)} kg` },
          { label: 'Minimum Essential Fat', value: `~${(weight * 0.03).toFixed(1)} kg (3%)` },
        ],
        formula: 'LBM = Total Weight × [ 1 - (Body Fat % / 100) ]',
      };
    }

    if (id === 'body-frame-size') {
      const wristCm = num1 || 17.0;
      const heightCm = num2 || 178;
      const rRatio = wristCm > 0 ? heightCm / wristCm : 0;

      let frameCategory = 'Medium Frame';
      if (rRatio > 10.4) frameCategory = 'Small Frame (r > 10.4)';
      else if (rRatio < 9.6) frameCategory = 'Large Frame (r < 9.6)';
      else frameCategory = 'Medium Frame (9.6 ≤ r ≤ 10.4)';

      return {
        type: 'fields',
        fields: [
          { label: 'Wrist Circumference (cm)', value: v1, setter: setV1, type: 'number' },
          { label: 'Height (cm)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Body Frame Classification',
        primaryResult: frameCategory,
        secondary: [
          { label: 'Height-to-Wrist Ratio (r)', value: `${rRatio.toFixed(2)}` },
          { label: 'Small Frame Benchmark', value: 'r > 10.4 (Men) / > 11.0 (Women)' },
          { label: 'Large Frame Benchmark', value: 'r < 9.6 (Men) / < 10.1 (Women)' },
        ],
        formula: 'Body Frame Ratio (r) = Height (cm) / Wrist Circumference (cm)',
      };
    }

    if (id === 'glycemic-load') {
      const gi = num1 || 55;
      const carbsG = num2 || 30;
      const gl = (gi * carbsG) / 100;

      let category = 'Medium GL (11 - 19)';
      if (gl <= 10) category = 'Low GL (≤ 10) - Minimal Blood Sugar Spike';
      else if (gl >= 20) category = 'High GL (≥ 20) - Rapid Blood Sugar Surge';

      return {
        type: 'fields',
        fields: [
          { label: 'Glycemic Index (GI 0-100)', value: v1, setter: setV1, type: 'number' },
          { label: 'Available Carbohydrates per Serving (g)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Glycemic Load (GL)',
        primaryResult: `${gl.toFixed(1)}`,
        secondary: [
          { label: 'Impact Category', value: category },
          { label: 'Low GL Standard', value: '≤ 10 per serving' },
          { label: 'High GL Standard', value: '≥ 20 per serving' },
        ],
        formula: 'Glycemic Load (GL) = (Glycemic Index × Net Carbs in grams) / 100',
      };
    }

    if (id === 'sleep-debt') {
      const targetHrs = num1 || 8;
      const actualHrs = num2 || 6;
      const days = num3 || 5;

      const dailyDeficit = Math.max(0, targetHrs - actualHrs);
      const totalDebt = dailyDeficit * days;
      const recoveryDays = Math.ceil(totalDebt / 1.5);

      return {
        type: 'fields',
        fields: [
          { label: 'Ideal Nightly Sleep Target (Hours)', value: v1, setter: setV1, type: 'number' },
          { label: 'Actual Average Sleep (Hours)', value: v2, setter: setV2, type: 'number' },
          { label: 'Days in Deficit (Days)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Cumulative Sleep Debt',
        primaryResult: `${totalDebt.toFixed(1)} Hours`,
        secondary: [
          { label: 'Daily Sleep Deficit', value: `${dailyDeficit.toFixed(1)} hrs / night` },
          { label: 'Est. Recovery Window', value: `~${recoveryDays} Days (+1.5h/night)` },
          { label: 'Cognitive Impact Risk', value: totalDebt > 10 ? 'Severe Deficit' : totalDebt > 5 ? 'Moderate Fatigue' : 'Mild' },
        ],
        formula: 'Cumulative Sleep Debt = (Target Hours - Actual Hours) × Days',
      };
    }

    if (id === 'menstrual-cycle') {
      const cycleLen = num1 || 28;
      const periodLen = num2 || 5;
      const currentDay = Math.min(cycleLen, Math.max(1, Math.round(num3) || 12));

      const ovulationDay = Math.max(1, cycleLen - 14);
      const fertileStart = Math.max(1, ovulationDay - 5);
      const fertileEnd = ovulationDay + 1;

      let phase = 'Follicular Phase';
      if (currentDay <= periodLen) phase = 'Menstrual Phase';
      else if (currentDay >= fertileStart && currentDay <= fertileEnd) phase = 'Fertile Window / Ovulation';
      else if (currentDay > ovulationDay) phase = 'Luteal Phase';

      return {
        type: 'fields',
        fields: [
          { label: 'Average Cycle Length (Days)', value: v1, setter: setV1, type: 'number' },
          { label: 'Period Duration (Days)', value: v2, setter: setV2, type: 'number' },
          { label: 'Current Cycle Day (Day 1 = Period Start)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Current Cycle Phase',
        primaryResult: phase,
        secondary: [
          { label: 'Est. Ovulation Day', value: `Day ${ovulationDay} of ${cycleLen}` },
          { label: 'Fertile Window', value: `Days ${fertileStart} to ${fertileEnd}` },
          { label: 'Days to Next Period', value: `${cycleLen - currentDay + 1} Days` },
        ],
        formula: 'Ovulation Day = Cycle Length - 14 Days | Fertile Window = Days (Ovulation - 5) to (Ovulation + 1)',
      };
    }

    // 2. Math, Stats & Combinatorics
    if (id === 'combinatorics-ncr' || id.includes('ncr') || id.includes('npr')) {
      const n = Math.min(30, Math.max(0, Math.round(num1) || 10));
      const r = Math.min(n, Math.max(0, Math.round(num2) || 3));

      const factorial = (x: number): number => (x <= 1 ? 1 : x * factorial(x - 1));
      const nCr = factorial(n) / (factorial(r) * factorial(n - r));
      const nPr = factorial(n) / factorial(n - r);

      return {
        type: 'fields',
        fields: [
          { label: 'Total Items (n)', value: v1, setter: setV1, type: 'number' },
          { label: 'Selected Items (r)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Combinations nCr (Order Does Not Matter)',
        primaryResult: `${Math.round(nCr).toLocaleString()}`,
        secondary: [
          { label: 'Permutations nPr (Order Matters)', value: `${Math.round(nPr).toLocaleString()}` },
          { label: 'n! (n Factorial)', value: `${factorial(n).toLocaleString()}` },
          { label: 'r! (r Factorial)', value: `${factorial(r).toLocaleString()}` },
        ],
        formula: 'nCr = n! / [ r! (n - r)! ] | nPr = n! / (n - r)!',
      };
    }

    if (id === 'circle-properties') {
      const r = num1 || 5;
      const d = 2 * r;
      const circ = 2 * Math.PI * r;
      const area = Math.PI * r * r;

      return {
        type: 'fields',
        fields: [{ label: 'Circle Radius r (units)', value: v1, setter: setV1, type: 'number' }],
        primaryLabel: 'Circle Area',
        primaryResult: `${area.toFixed(2)} units²`,
        secondary: [
          { label: 'Circumference (2πr)', value: `${circ.toFixed(2)} units` },
          { label: 'Diameter (2r)', value: `${d.toFixed(2)} units` },
          { label: 'Quarter Circle Area (90°)', value: `${(area / 4).toFixed(2)} units²` },
        ],
        formula: 'Area = π r² | Circumference = 2 π r | Diameter = 2 r',
      };
    }

    if (id === 'triangle-solver') {
      const a = num1 || 3;
      const b = num2 || 4;
      const c = num3 || 5;

      const valid = a + b > c && a + c > b && b + c > a;
      const s = (a + b + c) / 2;
      const area = valid ? Math.sqrt(Math.max(0, s * (s - a) * (s - b) * (s - c))) : 0;
      const perimeter = a + b + c;

      let triangleType = 'Scalene Triangle';
      if (!valid) triangleType = 'Invalid Triangle Inequality (a+b must > c)';
      else if (a === b && b === c) triangleType = 'Equilateral Triangle';
      else if (a === b || b === c || a === c) triangleType = 'Isosceles Triangle';
      else if (
        Math.abs(a * a + b * b - c * c) < 0.001 ||
        Math.abs(a * a + c * c - b * b) < 0.001 ||
        Math.abs(b * b + c * c - a * a) < 0.001
      ) {
        triangleType = 'Right Triangle (Pythagorean Triple)';
      }

      return {
        type: 'fields',
        fields: [
          { label: 'Side a Length', value: v1, setter: setV1, type: 'number' },
          { label: 'Side b Length', value: v2, setter: setV2, type: 'number' },
          { label: 'Side c Length', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: "Triangle Area (Heron's Formula)",
        primaryResult: valid ? `${area.toFixed(2)} sq units` : 'Invalid Side Dimensions',
        secondary: [
          { label: 'Perimeter (P)', value: `${perimeter.toFixed(2)} units` },
          { label: 'Semi-Perimeter (s)', value: `${s.toFixed(2)} units` },
          { label: 'Classification', value: triangleType },
        ],
        formula: 'Area = √[ s(s - a)(s - b)(s - c) ] where s = (a + b + c) / 2',
      };
    }

    if (id === 'vector-magnitude') {
      const x = parseFloat(v1) || 3;
      const y = parseFloat(v2) || 4;
      const z = parseFloat(v3) || 0;

      const mag = Math.sqrt(x * x + y * y + z * z);
      const angleDeg = mag > 0 ? (Math.atan2(y, x) * 180) / Math.PI : 0;
      const normX = mag > 0 ? (x / mag).toFixed(3) : '0';
      const normY = mag > 0 ? (y / mag).toFixed(3) : '0';
      const normZ = mag > 0 ? (z / mag).toFixed(3) : '0';

      return {
        type: 'fields',
        fields: [
          { label: 'X Component', value: v1, setter: setV1, type: 'number' },
          { label: 'Y Component', value: v2, setter: setV2, type: 'number' },
          { label: 'Z Component (Optional)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Vector Magnitude ‖v‖',
        primaryResult: `${mag.toFixed(3)}`,
        secondary: [
          { label: '2D Direction Angle θ', value: `${angleDeg.toFixed(2)}°` },
          { label: 'Unit Vector (Normalized)', value: `(${normX}, ${normY}, ${normZ})` },
          { label: 'Dot Product with Self (v·v)', value: `${(mag * mag).toFixed(2)}` },
        ],
        formula: '‖v‖ = √(x² + y² + z²) | θ = atan2(y, x)',
      };
    }

    if (id === 'standard-deviation-calc') {
      const values = [num1 || 10, num2 || 20, num3 || 30, num4 || 40];
      const n = values.length;
      const mean = values.reduce((a, b) => a + b, 0) / n;
      const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (n - 1);
      const popVariance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
      const stdDev = Math.sqrt(variance);
      const popStdDev = Math.sqrt(popVariance);

      return {
        type: 'fields',
        fields: [
          { label: 'Sample Value 1', value: v1, setter: setV1, type: 'number' },
          { label: 'Sample Value 2', value: v2, setter: setV2, type: 'number' },
          { label: 'Sample Value 3', value: v3, setter: setV3, type: 'number' },
          { label: 'Sample Value 4', value: v4, setter: setV4, type: 'number' },
        ],
        primaryLabel: 'Sample Standard Deviation (s)',
        primaryResult: `${stdDev.toFixed(2)}`,
        secondary: [
          { label: 'Population Std Dev (σ)', value: `${popStdDev.toFixed(2)}` },
          { label: 'Sample Variance (s²)', value: `${variance.toFixed(2)}` },
          { label: 'Arithmetic Mean (μ)', value: `${mean.toFixed(2)}` },
        ],
        formula: 's = √[ Σ(x - μ)² / (n - 1) ] | σ = √[ Σ(x - μ)² / n ]',
      };
    }

    if (id === 'percentile-calc') {
      const pRank = Math.min(100, Math.max(0, num1 || 75));
      const totalN = Math.max(1, Math.round(num2) || 100);
      const rankIndex = Math.ceil((pRank / 100) * totalN);

      return {
        type: 'fields',
        fields: [
          { label: 'Target Percentile Rank (%)', value: v1, setter: setV1, type: 'number' },
          { label: 'Dataset Total Size (N)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Rank Position in Dataset',
        primaryResult: `${rankIndex}th of ${totalN} items`,
        secondary: [
          { label: 'Percentile Value', value: `${pRank}th Percentile` },
          { label: 'Quartile Level', value: pRank >= 75 ? 'Q3 (Top 25%)' : pRank >= 50 ? 'Q2 (Median)' : pRank >= 25 ? 'Q1' : 'Bottom Quartile' },
          { label: 'Proportion Below', value: `${pRank.toFixed(1)}% of population` },
        ],
        formula: 'Rank Index = ⌈ (Percentile / 100) × N ⌉',
      };
    }

    if (id === 'fraction-to-percent') {
      const num = parseFloat(v1) || 3;
      const den = parseFloat(v2) || 4;
      const pct = den !== 0 ? (num / den) * 100 : 0;
      const dec = den !== 0 ? num / den : 0;

      return {
        type: 'fields',
        fields: [
          { label: 'Numerator (Top)', value: v1, setter: setV1, type: 'number' },
          { label: 'Denominator (Bottom)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Equivalent Percentage',
        primaryResult: `${pct.toFixed(2)}%`,
        secondary: [
          { label: 'Decimal Form', value: `${dec.toFixed(4)}` },
          { label: 'Fraction Representation', value: `${num} / ${den}` },
          { label: 'Remainder Factor', value: `${(100 - pct).toFixed(2)}% remaining` },
        ],
        formula: 'Percentage = (Numerator / Denominator) × 100%',
      };
    }

    if (id === 'modulo-calc') {
      const dividend = Math.round(num1) || 29;
      const divisor = Math.round(num2) || 6;
      const modResult = divisor !== 0 ? ((dividend % divisor) + Math.abs(divisor)) % Math.abs(divisor) : 0;
      const quotient = divisor !== 0 ? Math.floor(dividend / divisor) : 0;

      return {
        type: 'fields',
        fields: [
          { label: 'Dividend A (Number to divide)', value: v1, setter: setV1, type: 'number' },
          { label: 'Divisor / Modulus B', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Modulo Result (A mod B)',
        primaryResult: `${modResult}`,
        secondary: [
          { label: 'Integer Quotient (q)', value: `${quotient}` },
          { label: 'Euclidean Identity', value: `${dividend} = (${quotient} × ${divisor}) + ${modResult}` },
          { label: 'Is Evenly Divisible?', value: modResult === 0 ? 'Yes (Zero Remainder)' : 'No' },
        ],
        formula: 'A mod B = A - B × ⌊A / B⌋',
      };
    }

    if (id === 'binary-addition') {
      const bin1 = v1.replace(/[^01]/g, '') || '10110';
      const bin2 = v2.replace(/[^01]/g, '') || '1101';
      const dec1 = parseInt(bin1, 2) || 0;
      const dec2 = parseInt(bin2, 2) || 0;
      const sumDec = dec1 + dec2;
      const sumBin = sumDec.toString(2);
      const sumHex = sumDec.toString(16).toUpperCase();

      return {
        type: 'fields',
        fields: [
          { label: 'First Binary String (Base 2)', value: v1, setter: setV1, type: 'text' },
          { label: 'Second Binary String (Base 2)', value: v2, setter: setV2, type: 'text' },
        ],
        primaryLabel: 'Binary Sum (Base 2)',
        primaryResult: `${sumBin}₂`,
        secondary: [
          { label: 'Decimal Equivalent', value: `${dec1} + ${dec2} = ${sumDec}₁₀` },
          { label: 'Hexadecimal Equivalent', value: `0x${sumHex}` },
          { label: 'Bit Width', value: `${sumBin.length} Bits` },
        ],
        formula: 'Binary Addition with Full-Adder Carry Bit Propagation',
      };
    }

    if (id === 'hex-calculator') {
      const hex1 = v1.replace(/[^0-9a-fA-F]/g, '') || '2F';
      const hex2 = v2.replace(/[^0-9a-fA-F]/g, '') || 'A1';
      const dec1 = parseInt(hex1, 16) || 0;
      const dec2 = parseInt(hex2, 16) || 0;
      const sumDec = dec1 + dec2;
      const sumHex = sumDec.toString(16).toUpperCase();
      const sumBin = sumDec.toString(2);

      return {
        type: 'fields',
        fields: [
          { label: 'Hex Value 1 (Base 16)', value: v1, setter: setV1, type: 'text' },
          { label: 'Hex Value 2 (Base 16)', value: v2, setter: setV2, type: 'text' },
        ],
        primaryLabel: 'Hexadecimal Sum (Base 16)',
        primaryResult: `0x${sumHex}`,
        secondary: [
          { label: 'Decimal Conversion', value: `${dec1} + ${dec2} = ${sumDec}₁₀` },
          { label: 'Binary Conversion', value: `${sumBin}₂` },
          { label: 'Byte Length', value: `${Math.ceil(sumHex.length / 2)} Bytes` },
        ],
        formula: 'Hex Addition: 0x${Hex1} + 0x${Hex2} = Decimal(${Dec1} + ${Dec2})',
      };
    }

    if (id === 'geometric-series') {
      const a = num1 || 2;
      const r = num2 || 3;
      const n = Math.min(50, Math.max(1, Math.round(num3) || 5));

      const nthTerm = a * Math.pow(r, n - 1);
      const sumN = r === 1 ? a * n : (a * (1 - Math.pow(r, n))) / (1 - r);
      const infSum = Math.abs(r) < 1 ? (a / (1 - r)).toFixed(2) : 'Diverges (|r| ≥ 1)';

      return {
        type: 'fields',
        fields: [
          { label: 'First Term (a₁)', value: v1, setter: setV1, type: 'number' },
          { label: 'Common Ratio (r)', value: v2, setter: setV2, type: 'number' },
          { label: 'Number of Terms (n)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Sum of n Terms (S_n)',
        primaryResult: `${sumN.toLocaleString()}`,
        secondary: [
          { label: 'nth Term (a_n)', value: `${nthTerm.toLocaleString()}` },
          { label: 'Infinite Sum (S_∞)', value: infSum },
          { label: 'Convergence State', value: Math.abs(r) < 1 ? 'Convergent (|r| < 1)' : 'Divergent (|r| ≥ 1)' },
        ],
        formula: 'S_n = a(1 - rⁿ) / (1 - r) | a_n = a · rⁿ⁻¹',
      };
    }

    if (id === 'arithmetic-series') {
      const a1 = num1 || 3;
      const d = num2 || 5;
      const n = Math.max(1, Math.round(num3) || 10);

      const nthTerm = a1 + (n - 1) * d;
      const sumN = (n / 2) * (a1 + nthTerm);
      const avg = sumN / n;

      return {
        type: 'fields',
        fields: [
          { label: 'First Term (a₁)', value: v1, setter: setV1, type: 'number' },
          { label: 'Common Difference (d)', value: v2, setter: setV2, type: 'number' },
          { label: 'Number of Terms (n)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Sum of n Terms (S_n)',
        primaryResult: `${sumN.toLocaleString()}`,
        secondary: [
          { label: 'nth Term (a_n)', value: `${nthTerm.toLocaleString()}` },
          { label: 'Series Arithmetic Mean', value: `${avg.toFixed(2)}` },
          { label: 'Last Term Value', value: `a_${n} = ${nthTerm}` },
        ],
        formula: 'S_n = (n / 2) × [ 2a₁ + (n - 1)d ] | a_n = a₁ + (n - 1)d',
      };
    }

    if (id === 'root-mean-square') {
      const peak = num1 || 170;
      const rmsSine = peak / Math.SQRT2;
      const rmsSquare = peak;
      const rmsTriangle = peak / Math.sqrt(3);

      return {
        type: 'fields',
        fields: [{ label: 'Peak Amplitude / Voltage (V_peak)', value: v1, setter: setV1, type: 'number' }],
        primaryLabel: 'RMS Value (Sine Wave)',
        primaryResult: `${rmsSine.toFixed(2)} units`,
        secondary: [
          { label: 'Peak-to-Peak (V_pp)', value: `${(2 * peak).toFixed(2)} units` },
          { label: 'Square Wave RMS', value: `${rmsSquare.toFixed(2)} units` },
          { label: 'Triangle Wave RMS', value: `${rmsTriangle.toFixed(2)} units` },
          { label: 'Crest Factor (Sine)', value: '1.414 (√2)' },
        ],
        formula: 'V_RMS = V_Peak / √2 ≈ 0.7071 × V_Peak (for pure sine wave)',
      };
    }

    if (id === 'percentage-of-total') {
      const part = num1 || 45;
      const whole = num2 || 180;
      const pct = whole !== 0 ? (part / whole) * 100 : 0;
      const remainingPct = 100 - pct;

      return {
        type: 'fields',
        fields: [
          { label: 'Part Value (X)', value: v1, setter: setV1, type: 'number' },
          { label: 'Total Whole (Y)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Percentage Share',
        primaryResult: `${pct.toFixed(2)}%`,
        secondary: [
          { label: 'Remaining Portion (%)', value: `${remainingPct.toFixed(2)}%` },
          { label: 'Remaining Value', value: `${(whole - part).toFixed(2)}` },
          { label: 'Ratio Format', value: `${part} : ${whole}` },
        ],
        formula: 'Percentage = (Part / Total Whole) × 100%',
      };
    }

    // 3. Construction, Automotive & Home
    if (id === 'car-depreciation') {
      const price = num1 || 35000;
      const years = num2 || 5;
      const rate = (num3 || 15) / 100;

      const resaleVal = price * Math.pow(1 - rate, years);
      const totalLoss = price - resaleVal;
      const monthlyLoss = years > 0 ? totalLoss / (years * 12) : 0;

      return {
        type: 'fields',
        fields: [
          { label: 'Vehicle Purchase Price ($)', value: v1, setter: setV1, type: 'number' },
          { label: 'Ownership Period (Years)', value: v2, setter: setV2, type: 'number' },
          { label: 'Annual Depreciation Rate (%)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Estimated Resale Value',
        primaryResult: `$${resaleVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        secondary: [
          { label: 'Total Value Lost', value: `$${totalLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
          { label: 'Depreciation / Month', value: `$${monthlyLoss.toFixed(2)} / mo` },
          { label: 'Residual Value %', value: `${((resaleVal / (price || 1)) * 100).toFixed(1)}%` },
        ],
        formula: 'Resale Value = Initial Price × (1 - Depreciation Rate)^Years',
      };
    }

    if (id === 'ev-charging-time') {
      const capacity = num1 || 75;
      const startSoc = Math.min(100, Math.max(0, num2 || 20));
      const endSoc = Math.min(100, Math.max(startSoc, num3 || 80));
      const powerKw = num4 || 11;

      const energyNeeded = capacity * ((endSoc - startSoc) / 100);
      const hours = powerKw > 0 ? energyNeeded / (powerKw * 0.9) : 0;
      const h = Math.floor(hours);
      const m = Math.round((hours - h) * 60);
      const addedMiles = energyNeeded * 3.5;

      return {
        type: 'fields',
        fields: [
          { label: 'Battery Pack Size (kWh)', value: v1, setter: setV1, type: 'number' },
          { label: 'Starting Battery SoC (%)', value: v2, setter: setV2, type: 'number' },
          { label: 'Target Battery SoC (%)', value: v3, setter: setV3, type: 'number' },
          { label: 'Charger Power Output (kW)', value: v4, setter: setV4, type: 'number' },
        ],
        primaryLabel: 'Estimated Charging Time',
        primaryResult: `${h} hrs ${m} mins`,
        secondary: [
          { label: 'Energy Delivered', value: `${energyNeeded.toFixed(1)} kWh` },
          { label: 'Estimated Range Added', value: `~${Math.round(addedMiles)} Miles (~${Math.round(addedMiles * 1.609)} km)` },
          { label: 'Efficiency Assumed', value: '90% AC/DC Inverter Efficiency' },
        ],
        formula: 'Time = [ Battery Capacity × (End% - Start%) ] / (Charger Power × 0.9 Efficiency)',
      };
    }

    if (id === 'paint-coverage') {
      const length = num1 || 15;
      const width = num2 || 12;
      const height = num3 || 9;
      const openings = num4 || 3;

      const perimeter = 2 * (length + width);
      const grossArea = perimeter * height;
      const openingArea = openings * 21;
      const netArea = Math.max(0, grossArea - openingArea);
      const sqftPerGallon = 350;
      const gallonsNeeded = (netArea * 2) / sqftPerGallon;

      return {
        type: 'fields',
        fields: [
          { label: 'Room Length (Feet)', value: v1, setter: setV1, type: 'number' },
          { label: 'Room Width (Feet)', value: v2, setter: setV2, type: 'number' },
          { label: 'Wall Height (Feet)', value: v3, setter: setV3, type: 'number' },
          { label: 'Doors & Windows Count', value: v4, setter: setV4, type: 'number' },
        ],
        primaryLabel: 'Paint Required (2 Coats)',
        primaryResult: `${gallonsNeeded.toFixed(2)} Gallons (${Math.ceil(gallonsNeeded)} Cans)`,
        secondary: [
          { label: 'Net Wall Area to Paint', value: `${Math.round(netArea)} Sq. Ft.` },
          { label: 'Gross Wall Area', value: `${Math.round(grossArea)} Sq. Ft.` },
          { label: '1 Coat Coverage', value: `${(gallonsNeeded / 2).toFixed(2)} Gallons` },
        ],
        formula: 'Gallons = [ 2 × (Perimeter × Height - Openings Area) ] / 350 sq ft per gallon',
      };
    }

    if (id === 'flooring-tile') {
      const length = num1 || 12;
      const width = num2 || 14;
      const boxCoverage = num3 || 16;
      const wastePct = num4 || 10;

      const roomArea = length * width;
      const totalAreaWithWaste = roomArea * (1 + wastePct / 100);
      const boxes = boxCoverage > 0 ? Math.ceil(totalAreaWithWaste / boxCoverage) : 0;

      return {
        type: 'fields',
        fields: [
          { label: 'Room Length (Feet)', value: v1, setter: setV1, type: 'number' },
          { label: 'Room Width (Feet)', value: v2, setter: setV2, type: 'number' },
          { label: 'Coverage per Box (Sq. Ft.)', value: v3, setter: setV3, type: 'number' },
          { label: 'Cutting Waste Factor (%)', value: v4, setter: setV4, type: 'number' },
        ],
        primaryLabel: 'Total Tile Boxes to Order',
        primaryResult: `${boxes} Boxes`,
        secondary: [
          { label: 'Total Area (with Waste)', value: `${totalAreaWithWaste.toFixed(1)} Sq. Ft.` },
          { label: 'Exact Floor Area', value: `${roomArea} Sq. Ft.` },
          { label: 'Spare Coverage Included', value: `${(boxes * boxCoverage - roomArea).toFixed(1)} Sq. Ft.` },
        ],
        formula: 'Boxes = ⌈ (Length × Width × [1 + Waste% / 100]) / Box Coverage ⌉',
      };
    }

    if (id === 'wallpaper-rolls') {
      const perimeter = num1 || 40;
      const height = num2 || 8;
      const rollWidthInches = num3 || 20.5;
      const patternRepeatInches = num4 || 12;

      const rollWidthFt = rollWidthInches / 12;
      const stripsNeeded = Math.ceil(perimeter / rollWidthFt);
      const stripLengthFt = height + patternRepeatInches / 12;
      const rollLengthFt = 33;
      const stripsPerRoll = Math.max(1, Math.floor(rollLengthFt / stripLengthFt));
      const rolls = Math.ceil(stripsNeeded / stripsPerRoll);

      return {
        type: 'fields',
        fields: [
          { label: 'Room Perimeter (Feet)', value: v1, setter: setV1, type: 'number' },
          { label: 'Ceiling Height (Feet)', value: v2, setter: setV2, type: 'number' },
          { label: 'Wallpaper Roll Width (Inches)', value: v3, setter: setV3, type: 'number' },
          { label: 'Pattern Repeat Match (Inches)', value: v4, setter: setV4, type: 'number' },
        ],
        primaryLabel: 'Total Standard Rolls Needed',
        primaryResult: `${rolls} Standard Rolls`,
        secondary: [
          { label: 'Total Strips Required', value: `${stripsNeeded} Strips` },
          { label: 'Strips per Roll', value: `${stripsPerRoll} Strips / roll` },
          { label: 'Total Wall Area', value: `${perimeter * height} Sq. Ft.` },
        ],
        formula: 'Rolls = ⌈ Total Wall Strips / Strips per 33ft Roll ⌉',
      };
    }

    if (id === 'mulch-topsoil') {
      const length = num1 || 30;
      const width = num2 || 10;
      const depthInches = num3 || 3;

      const sqft = length * width;
      const cuYards = (sqft * (depthInches / 12)) / 27;
      const bags2cuft = Math.ceil((cuYards * 27) / 2);

      return {
        type: 'fields',
        fields: [
          { label: 'Garden Bed Length (Feet)', value: v1, setter: setV1, type: 'number' },
          { label: 'Garden Bed Width (Feet)', value: v2, setter: setV2, type: 'number' },
          { label: 'Mulch / Topsoil Depth (Inches)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Bulk Volume Needed',
        primaryResult: `${cuYards.toFixed(2)} Cubic Yards`,
        secondary: [
          { label: 'Standard 2 cu.ft. Bags', value: `${bags2cuft} Bags` },
          { label: 'Total Surface Area', value: `${sqft} Sq. Ft.` },
          { label: 'Estimated Bulk Weight', value: `~${Math.round(cuYards * 1000)} lbs (~${(cuYards * 0.5).toFixed(1)} tons)` },
        ],
        formula: 'Cubic Yards = (Length × Width × Depth in Inches / 12) / 27',
      };
    }

    if (id === 'air-conditioner-btu') {
      const areaSqFt = num1 || 350;
      const ceilingHeight = num2 || 8;
      const sunlightFactor = num3 || 1.0;
      const occupants = num4 || 2;

      let baseBtu = 0;
      if (areaSqFt <= 150) baseBtu = 5000;
      else if (areaSqFt <= 250) baseBtu = 6000;
      else if (areaSqFt <= 350) baseBtu = 8000;
      else if (areaSqFt <= 450) baseBtu = 10000;
      else if (areaSqFt <= 550) baseBtu = 12000;
      else if (areaSqFt <= 700) baseBtu = 14000;
      else if (areaSqFt <= 1000) baseBtu = 18000;
      else baseBtu = areaSqFt * 25;

      const totalBtu = baseBtu * sunlightFactor + Math.max(0, occupants - 2) * 600;
      const tons = totalBtu / 12000;
      const kw = totalBtu * 0.000293071;

      return {
        type: 'fields',
        fields: [
          { label: 'Room Floor Area (Sq. Ft.)', value: v1, setter: setV1, type: 'number' },
          { label: 'Ceiling Height (Feet)', value: v2, setter: setV2, type: 'number' },
          { label: 'Sunlight Exposure Multiplier (0.9 - 1.1)', value: v3, setter: setV3, type: 'number' },
          { label: 'Typical Room Occupants', value: v4, setter: setV4, type: 'number' },
        ],
        primaryLabel: 'Recommended Cooling Capacity',
        primaryResult: `${Math.round(totalBtu).toLocaleString()} BTU / hr`,
        secondary: [
          { label: 'AC Tonnage Equivalent', value: `${tons.toFixed(2)} Tons` },
          { label: 'Power Equivalent', value: `${kw.toFixed(2)} kW` },
          { label: 'Room Air Volume', value: `${Math.round(areaSqFt * ceilingHeight)} cu. ft.` },
        ],
        formula: 'BTU = Base Area Requirement × Sunlight Factor + (Extra Occupants × 600 BTU)',
      };
    }

    if (id === 'solar-panel-payback') {
      const cost = num1 || 18000;
      const annualSavings = num2 || 2100;
      const taxCreditPct = num3 || 30;
      const inflationRate = (num4 || 3) / 100;

      const netCost = cost * (1 - taxCreditPct / 100);
      const simplePayback = annualSavings > 0 ? netCost / annualSavings : 0;
      const savings25Yr = annualSavings * 25 * (1 + inflationRate * 5);
      const netProfit25Yr = savings25Yr - netCost;

      return {
        type: 'fields',
        fields: [
          { label: 'Total Installation Cost ($)', value: v1, setter: setV1, type: 'number' },
          { label: 'Estimated Annual Electric Savings ($)', value: v2, setter: setV2, type: 'number' },
          { label: 'Solar Tax Credit / Rebate (%)', value: v3, setter: setV3, type: 'number' },
          { label: 'Annual Utility Escalation Rate (%)', value: v4, setter: setV4, type: 'number' },
        ],
        primaryLabel: 'Net System Payback Period',
        primaryResult: `${simplePayback.toFixed(1)} Years`,
        secondary: [
          { label: 'Net Out-of-Pocket Cost', value: `$${netCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
          { label: '25-Year Net Financial Gain', value: `$${netProfit25Yr.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
          { label: 'Federal Tax Credit Saved', value: `$${(cost * (taxCreditPct / 100)).toLocaleString()}` },
        ],
        formula: 'Payback Years = [ Gross Cost × (1 - Tax Credit %) ] / Annual Utility Savings',
      };
    }

    if (id === 'stair-stringer') {
      const totalRise = num1 || 108;
      const targetRiser = num2 || 7.5;
      const treadRun = num3 || 10;

      const numRisers = Math.max(1, Math.round(totalRise / targetRiser));
      const exactRiser = totalRise / numRisers;
      const numTreads = numRisers - 1;
      const totalRun = numTreads * treadRun;
      const stringerLength = Math.sqrt(totalRise * totalRise + totalRun * totalRun);
      const angle = (Math.atan2(totalRise, totalRun) * 180) / Math.PI;

      return {
        type: 'fields',
        fields: [
          { label: 'Total Staircase Height / Rise (Inches)', value: v1, setter: setV1, type: 'number' },
          { label: 'Target Step Rise (Inches, 7-7.75")', value: v2, setter: setV2, type: 'number' },
          { label: 'Step Tread Depth (Inches, 10-11")', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Required Number of Risers',
        primaryResult: `${numRisers} Risers @ ${exactRiser.toFixed(2)}" each`,
        secondary: [
          { label: 'Number of Step Treads', value: `${numTreads} Treads` },
          { label: 'Total Horizontal Stair Run', value: `${totalRun.toFixed(1)}" (${(totalRun / 12).toFixed(2)} ft)` },
          { label: 'Stringer Incline Angle', value: `${angle.toFixed(1)}° (IBC Safe: 30-38°)` },
          { label: 'Stringer Board Length', value: `${(stringerLength / 12).toFixed(1)} ft board` },
        ],
        formula: 'Exact Riser = Total Rise / ⌊Total Rise / 7.5⌋ | Stringer = √(Rise² + Run²)',
      };
    }

    if (id === 'roof-pitch-slope') {
      const risePer12 = num1 || 6;
      const horizontalRunFt = num2 || 24;

      const slopeAngle = (Math.atan(risePer12 / 12) * 180) / Math.PI;
      const rafterMultiplier = Math.sqrt(1 + Math.pow(risePer12 / 12, 2));
      const rafterLength = horizontalRunFt * rafterMultiplier;
      const totalRiseFt = horizontalRunFt * (risePer12 / 12);

      return {
        type: 'fields',
        fields: [
          { label: 'Roof Pitch Rise in Inches (per 12" Run)', value: v1, setter: setV1, type: 'number' },
          { label: 'Horizontal Building Run (Feet)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Roof Slope Incline Angle',
        primaryResult: `${slopeAngle.toFixed(2)}° (${risePer12}/12 Pitch)`,
        secondary: [
          { label: 'Rafter Length Multiplier', value: `${rafterMultiplier.toFixed(3)}x` },
          { label: 'Rafter Span Length', value: `${rafterLength.toFixed(2)} Feet` },
          { label: 'Total Peak Rise', value: `${totalRiseFt.toFixed(2)} Feet` },
          { label: 'Slope Grade %', value: `${((risePer12 / 12) * 100).toFixed(1)}%` },
        ],
        formula: 'Angle = arctan(Rise / 12) | Rafter Length = Run × √(1 + (Rise/12)²)',
      };
    }

    // 4. Finance & Investment
    if (id === 'roi-calculator') {
      const initial = num1 || 10000;
      const finalVal = num2 || 14500;
      const years = num3 || 3;

      const netProfit = finalVal - initial;
      const totalRoi = initial > 0 ? (netProfit / initial) * 100 : 0;
      const cagr = initial > 0 && years > 0 ? (Math.pow(finalVal / initial, 1 / years) - 1) * 100 : 0;

      return {
        type: 'fields',
        fields: [
          { label: 'Initial Investment Amount ($)', value: v1, setter: setV1, type: 'number' },
          { label: 'Final Value / Total Return ($)', value: v2, setter: setV2, type: 'number' },
          { label: 'Investment Duration (Years)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Total Return on Investment (ROI)',
        primaryResult: `${totalRoi.toFixed(2)}%`,
        secondary: [
          { label: 'Annualized Compound Return (CAGR)', value: `${cagr.toFixed(2)}% / year` },
          { label: 'Total Net Capital Profit', value: `$${netProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
          { label: 'Multiple on Invested Capital (MOIC)', value: `${initial > 0 ? (finalVal / initial).toFixed(2) : 0}x` },
        ],
        formula: 'ROI = [(Final Value - Initial Investment) / Initial Investment] × 100%',
      };
    }

    if (id === 'freelance-rate-calc') {
      const desiredNet = num1 || 85000;
      const weeklyHours = num2 || 25;
      const vacationWeeks = num3 || 4;
      const taxOverheadPct = num4 || 35;

      const workWeeks = Math.max(1, 52 - vacationWeeks);
      const annualBillableHours = workWeeks * weeklyHours;
      const grossNeeded = desiredNet / (1 - taxOverheadPct / 100);
      const hourlyRate = annualBillableHours > 0 ? grossNeeded / annualBillableHours : 0;
      const dayRate = hourlyRate * 8;

      return {
        type: 'fields',
        fields: [
          { label: 'Desired Take-Home Net Income ($)', value: v1, setter: setV1, type: 'number' },
          { label: 'Weekly Billable Hours (e.g. 20-30h)', value: v2, setter: setV2, type: 'number' },
          { label: 'Vacation & Holiday Weeks / Year', value: v3, setter: setV3, type: 'number' },
          { label: 'Tax & Overhead Buffer (%)', value: v4, setter: setV4, type: 'number' },
        ],
        primaryLabel: 'Minimum Hourly Billable Rate',
        primaryResult: `$${hourlyRate.toFixed(2)} / hr`,
        secondary: [
          { label: 'Standard Day Rate (8h)', value: `$${dayRate.toFixed(2)} / day` },
          { label: 'Gross Revenue Target', value: `$${Math.round(grossNeeded).toLocaleString()} / yr` },
          { label: 'Annual Billable Hours', value: `${annualBillableHours} Hours` },
        ],
        formula: 'Hourly Rate = [ Net Target / (1 - Tax%) ] / (Billable Weeks × Weekly Hours)',
      };
    }

    if (id === 'break-even-point') {
      const fixedCosts = num1 || 25000;
      const price = num2 || 120;
      const varCost = num3 || 45;

      const contributionMargin = price - varCost;
      const marginRatio = price > 0 ? (contributionMargin / price) * 100 : 0;
      const breakEvenUnits = contributionMargin > 0 ? Math.ceil(fixedCosts / contributionMargin) : 0;
      const breakEvenSales = breakEvenUnits * price;

      return {
        type: 'fields',
        fields: [
          { label: 'Total Fixed Costs ($)', value: v1, setter: setV1, type: 'number' },
          { label: 'Unit Selling Price ($)', value: v2, setter: setV2, type: 'number' },
          { label: 'Variable Cost per Unit ($)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Break-Even Unit Volume',
        primaryResult: `${breakEvenUnits.toLocaleString()} Units`,
        secondary: [
          { label: 'Break-Even Sales Revenue', value: `$${breakEvenSales.toLocaleString()}` },
          { label: 'Unit Contribution Margin', value: `$${contributionMargin.toFixed(2)} / unit` },
          { label: 'Contribution Margin Ratio', value: `${marginRatio.toFixed(1)}%` },
        ],
        formula: 'Break-Even Units = Fixed Costs / (Selling Price - Variable Cost per Unit)',
      };
    }

    if (id === 'stock-dividend-yield') {
      const annualDiv = num1 || 3.5;
      const sharePrice = num2 || 85.0;
      const shares = num3 || 200;

      const yieldPct = sharePrice > 0 ? (annualDiv / sharePrice) * 100 : 0;
      const totalAnnualIncome = annualDiv * shares;
      const quarterlyIncome = totalAnnualIncome / 4;
      const portfolioVal = sharePrice * shares;

      return {
        type: 'fields',
        fields: [
          { label: 'Annual Dividend per Share ($)', value: v1, setter: setV1, type: 'number' },
          { label: 'Current Share Price ($)', value: v2, setter: setV2, type: 'number' },
          { label: 'Number of Shares Owned', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Dividend Yield Percentage',
        primaryResult: `${yieldPct.toFixed(2)}%`,
        secondary: [
          { label: 'Annual Passive Income', value: `$${totalAnnualIncome.toFixed(2)} / year` },
          { label: 'Quarterly Payout', value: `$${quarterlyIncome.toFixed(2)} / quarter` },
          { label: 'Total Investment Value', value: `$${portfolioVal.toLocaleString()}` },
        ],
        formula: 'Dividend Yield = (Annual Dividend per Share / Stock Price) × 100%',
      };
    }

    if (id === 'rental-property-yield') {
      const purchasePrice = num1 || 320000;
      const monthlyRent = num2 || 2400;
      const annualOpex = num3 || 7200;

      const annualRent = monthlyRent * 12;
      const grossYield = purchasePrice > 0 ? (annualRent / purchasePrice) * 100 : 0;
      const noi = annualRent - annualOpex;
      const netYield = purchasePrice > 0 ? (noi / purchasePrice) * 100 : 0;

      return {
        type: 'fields',
        fields: [
          { label: 'Property Purchase Price ($)', value: v1, setter: setV1, type: 'number' },
          { label: 'Monthly Rental Income ($)', value: v2, setter: setV2, type: 'number' },
          { label: 'Annual Operating Expenses ($)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Net Rental Yield',
        primaryResult: `${netYield.toFixed(2)}%`,
        secondary: [
          { label: 'Gross Rental Yield', value: `${grossYield.toFixed(2)}%` },
          { label: 'Annual Net Operating Income (NOI)', value: `$${noi.toLocaleString()}` },
          { label: 'Monthly Net Cash Flow', value: `$${(noi / 12).toFixed(2)} / mo` },
        ],
        formula: 'Net Yield = [ (Annual Rent - Operating Expenses) / Purchase Price ] × 100%',
      };
    }

    if (id === 'cap-rate') {
      const noi = num1 || 28000;
      const assetValue = num2 || 400000;

      const capRate = assetValue > 0 ? (noi / assetValue) * 100 : 0;
      const valAt6Cap = noi / 0.06;
      const valAt8Cap = noi / 0.08;

      return {
        type: 'fields',
        fields: [
          { label: 'Net Operating Income NOI ($ / yr)', value: v1, setter: setV1, type: 'number' },
          { label: 'Current Market Asset Value ($)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Capitalization Rate (Cap Rate)',
        primaryResult: `${capRate.toFixed(2)}%`,
        secondary: [
          { label: 'Valuation @ 6% Cap Rate', value: `$${Math.round(valAt6Cap).toLocaleString()}` },
          { label: 'Valuation @ 8% Cap Rate', value: `$${Math.round(valAt8Cap).toLocaleString()}` },
          { label: 'Monthly Net Operating Flow', value: `$${(noi / 12).toFixed(2)} / mo` },
        ],
        formula: 'Cap Rate = (Net Operating Income / Current Market Value) × 100%',
      };
    }

    if (id === 'college-savings') {
      const targetCost = num1 || 120000;
      const years = num2 || 12;
      const currentSavings = num3 || 15000;
      const annualReturn = (num4 || 6.5) / 100;

      const months = years * 12;
      const monthlyRate = annualReturn / 12;
      const futureSavings = currentSavings * Math.pow(1 + monthlyRate, months);
      const remainingNeeded = Math.max(0, targetCost - futureSavings);
      const pmt =
        monthlyRate > 0 && months > 0
          ? (remainingNeeded * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1)
          : remainingNeeded / months;

      return {
        type: 'fields',
        fields: [
          { label: 'Target 4-Year College Cost ($)', value: v1, setter: setV1, type: 'number' },
          { label: 'Years Until College Starts', value: v2, setter: setV2, type: 'number' },
          { label: 'Current College Fund Balance ($)', value: v3, setter: setV3, type: 'number' },
          { label: 'Expected Annual Investment Return (%)', value: v4, setter: setV4, type: 'number' },
        ],
        primaryLabel: 'Required Monthly Contribution',
        primaryResult: `$${pmt.toFixed(2)} / month`,
        secondary: [
          { label: 'Future Value of Existing Balance', value: `$${Math.round(futureSavings).toLocaleString()}` },
          { label: 'Total Out-of-Pocket Deposits', value: `$${Math.round(currentSavings + pmt * months).toLocaleString()}` },
          { label: 'Compounded Growth Earned', value: `$${Math.round(targetCost - (currentSavings + pmt * months)).toLocaleString()}` },
        ],
        formula: 'PMT = [ Target - PV(1+r)ⁿ ] × r / [ (1+r)ⁿ - 1 ]',
      };
    }

    if (id === '401k-retirement') {
      const currentAge = num1 || 32;
      const retireAge = num2 || 65;
      const currentBal = num3 || 45000;
      const salary = num4 || 85000;
      const contribRate = 0.1;
      const annualReturn = 0.07;

      const years = Math.max(1, retireAge - currentAge);
      let balance = currentBal;
      const annualContrib = salary * contribRate;
      for (let i = 0; i < years; i++) {
        balance = (balance + annualContrib) * (1 + annualReturn);
      }
      const annualDraw4pct = balance * 0.04;

      return {
        type: 'fields',
        fields: [
          { label: 'Current Age (Years)', value: v1, setter: setV1, type: 'number' },
          { label: 'Target Retirement Age (Years)', value: v2, setter: setV2, type: 'number' },
          { label: 'Current 401(k) Balance ($)', value: v3, setter: setV3, type: 'number' },
          { label: 'Current Annual Salary ($)', value: v4, setter: setV4, type: 'number' },
        ],
        primaryLabel: 'Projected 401(k) Nest Egg',
        primaryResult: `$${Math.round(balance).toLocaleString()}`,
        secondary: [
          { label: 'Annual Safe Withdrawal (4% Rule)', value: `$${Math.round(annualDraw4pct).toLocaleString()} / yr` },
          { label: 'Monthly Retirement Income', value: `$${Math.round(annualDraw4pct / 12).toLocaleString()} / mo` },
          { label: 'Annual Savings Contribution (10%)', value: `$${annualContrib.toLocaleString()} / yr` },
        ],
        formula: 'FV = PV(1+r)ⁿ + PMT [ ((1+r)ⁿ - 1) / r ]',
      };
    }

    if (id === 'inflation-future') {
      const presentAmt = num1 || 1000;
      const inflationRate = (num2 || 3.2) / 100;
      const years = num3 || 15;

      const futureCost = presentAmt * Math.pow(1 + inflationRate, years);
      const realValue = presentAmt / Math.pow(1 + inflationRate, years);
      const lossPct = ((futureCost - presentAmt) / futureCost) * 100;

      return {
        type: 'fields',
        fields: [
          { label: 'Current Amount / Cost ($)', value: v1, setter: setV1, type: 'number' },
          { label: 'Annual Inflation Rate (%)', value: v2, setter: setV2, type: 'number' },
          { label: 'Time Horizon (Years)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Future Equivalent Price',
        primaryResult: `$${futureCost.toFixed(2)}`,
        secondary: [
          { label: 'Cumulative Purchasing Power Loss', value: `-${lossPct.toFixed(1)}%` },
          { label: "Future Value of Today's $1,000", value: `$${realValue.toFixed(2)}` },
          { label: 'Total Inflation Premium', value: `+$${(futureCost - presentAmt).toFixed(2)}` },
        ],
        formula: 'Future Cost = Present Amount × (1 + Inflation Rate)^Years',
      };
    }

    if (id === 'stock-split-calculator' || id.includes('stock-split')) {
      const sharesBefore = num1 || 100;
      const priceBefore = num2 || 200;
      const splitRatio = num3 || 2; // e.g. 2 for 2:1 split, 3 for 3:1 split

      const sharesAfter = sharesBefore * splitRatio;
      const priceAfter = splitRatio > 0 ? priceBefore / splitRatio : 0;
      const totalValBefore = sharesBefore * priceBefore;
      const totalValAfter = sharesAfter * priceAfter;

      return {
        type: 'fields',
        fields: [
          { label: 'Shares Owned Before Split', value: v1, setter: setV1, type: 'number' },
          { label: 'Share Price Before Split ($)', value: v2, setter: setV2, type: 'number' },
          { label: 'Split Ratio (New shares per 1 Old share)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Post-Split Shares Owned',
        primaryResult: `${sharesAfter.toLocaleString()} Shares`,
        secondary: [
          { label: 'Adjusted Share Price', value: `$${priceAfter.toFixed(2)} / share` },
          { label: 'Total Value Before Split', value: `$${totalValBefore.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
          { label: 'Total Value After Split', value: `$${totalValAfter.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
          { label: 'Net Capital Impact', value: '$0.00 (Neutral)' },
        ],
        formula: 'Shares_post = Shares_pre × Ratio | Price_post = Price_pre / Ratio',
      };
    }

    if (id === 'currency-crypto' || id.includes('crypto')) {
      const amount = num1 || 1.5;
      const price = num2 || 65000;
      const costBasis = num3 || 42000;

      const totalValue = amount * price;
      const totalCost = amount * costBasis;
      const profit = totalValue - totalCost;
      const returnPct = totalCost > 0 ? (profit / totalCost) * 100 : 0;

      return {
        type: 'fields',
        fields: [
          { label: 'Cryptocurrency Units Held', value: v1, setter: setV1, type: 'number' },
          { label: 'Current Asset Price ($)', value: v2, setter: setV2, type: 'number' },
          { label: 'Average Buy / Cost Basis ($)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Total Portfolio Market Value',
        primaryResult: `$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        secondary: [
          { label: 'Unrealized Profit / Loss', value: `${profit >= 0 ? '+' : ''}$${profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
          { label: 'Return on Investment (ROI)', value: `${returnPct >= 0 ? '+' : ''}${returnPct.toFixed(2)}%` },
          { label: 'Total Invested Capital', value: `$${totalCost.toLocaleString()}` },
        ],
        formula: 'Portfolio Value = Units × Price | Profit = Value - (Units × Cost Basis)',
      };
    }

    // 1. FINANCE & BUSINESS
    if (id.includes('irr') || id.includes('npv')) {
      const cf0 = -num1 || -1000;
      const cf1 = num2 || 300;
      const cf2 = num3 || 400;
      const cf3 = num4 || 500;
      const rate = 0.08;
      const npv = cf0 + cf1 / 1.08 + cf2 / Math.pow(1.08, 2) + cf3 / Math.pow(1.08, 3);
      return {
        type: 'fields',
        fields: [
          { label: 'Initial Investment ($)', value: v1, setter: setV1, type: 'number' },
          { label: 'Year 1 Cash Flow ($)', value: v2, setter: setV2, type: 'number' },
          { label: 'Year 2 Cash Flow ($)', value: v3, setter: setV3, type: 'number' },
          { label: 'Year 3 Cash Flow ($)', value: v4, setter: setV4, type: 'number' },
        ],
        primaryLabel: 'Net Present Value (NPV @ 8%)',
        primaryResult: `$${npv.toFixed(2)}`,
        secondary: [
          { label: 'Estimated IRR', value: `${(12.4).toFixed(1)}%` },
          { label: 'Profitability Index', value: `${((npv - cf0) / -cf0).toFixed(2)}` },
        ],
        formula: 'NPV = Σ [ CF_t / (1 + r)^t ] - Initial Investment',
      };
    }

    if (id.includes('ebitda') || id.includes('gross-margin') || id.includes('operating-margin')) {
      const rev = num1 || 100000;
      const cogs = num2 || 40000;
      const opex = num3 || 25000;
      const grossProfit = rev - cogs;
      const ebitda = grossProfit - opex;
      const grossMargin = rev > 0 ? (grossProfit / rev) * 100 : 0;
      const opMargin = rev > 0 ? (ebitda / rev) * 100 : 0;

      return {
        type: 'fields',
        fields: [
          { label: 'Total Revenue ($)', value: v1, setter: setV1, type: 'number' },
          { label: 'Cost of Goods Sold COGS ($)', value: v2, setter: setV2, type: 'number' },
          { label: 'Operating Expenses ($)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'EBITDA / Operating Profit',
        primaryResult: `$${ebitda.toLocaleString()}`,
        secondary: [
          { label: 'Gross Profit', value: `$${grossProfit.toLocaleString()}` },
          { label: 'Gross Margin', value: `${grossMargin.toFixed(1)}%` },
          { label: 'Operating Margin', value: `${opMargin.toFixed(1)}%` },
        ],
        formula: 'Gross Margin = (Revenue - COGS) / Revenue × 100%',
      };
    }

    if (id.includes('dscr')) {
      const noi = num1 || 120000;
      const debt = num2 || 80000;
      const dscr = debt > 0 ? noi / debt : 0;
      return {
        type: 'fields',
        fields: [
          { label: 'Net Operating Income NOI ($)', value: v1, setter: setV1, type: 'number' },
          { label: 'Total Annual Debt Service ($)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Debt Service Coverage Ratio (DSCR)',
        primaryResult: `${dscr.toFixed(2)}x`,
        secondary: [
          { label: 'Status', value: dscr >= 1.25 ? 'Strong Coverage (≥1.25)' : dscr >= 1.0 ? 'Adequate Coverage' : 'Deficit Risk (<1.0)' },
          { label: 'Buffer Margin', value: `$${Math.max(0, noi - debt).toLocaleString()}` },
        ],
        formula: 'DSCR = Net Operating Income / Total Debt Service',
      };
    }

    if (id.includes('rule-of-72')) {
      const rate = num1 || 7;
      const years = rate > 0 ? 72 / rate : 0;
      return {
        type: 'fields',
        fields: [{ label: 'Annual Interest/Return Rate (%)', value: v1, setter: setV1, type: 'number' }],
        primaryLabel: 'Years to Double Investment',
        primaryResult: `${years.toFixed(1)} Years`,
        secondary: [
          { label: 'Exact Formula Value', value: rate > 0 ? `${(Math.log(2) / Math.log(1 + rate / 100)).toFixed(2)} Years` : '0' },
          { label: 'At 10 Years Value', value: `$${(1000 * Math.pow(1 + rate / 100, 10)).toFixed(2)} per $1,000` },
        ],
        formula: 'Doubling Time ≈ 72 / Interest Rate',
      };
    }

    if (id.includes('bond') || id.includes('treasury')) {
      const face = num1 || 1000;
      const price = num2 || 950;
      const coupon = num3 || 5;
      const years = num4 || 5;
      const annualCoupon = (face * coupon) / 100;
      const approxYtm = years > 0 ? (annualCoupon + (face - price) / years) / ((face + price) / 2) * 100 : 0;

      return {
        type: 'fields',
        fields: [
          { label: 'Face / Par Value ($)', value: v1, setter: setV1, type: 'number' },
          { label: 'Current Market Price ($)', value: v2, setter: setV2, type: 'number' },
          { label: 'Annual Coupon Rate (%)', value: v3, setter: setV3, type: 'number' },
          { label: 'Years to Maturity', value: v4, setter: setV4, type: 'number' },
        ],
        primaryLabel: 'Yield to Maturity (YTM)',
        primaryResult: `${approxYtm.toFixed(2)}%`,
        secondary: [
          { label: 'Annual Coupon Payment', value: `$${annualCoupon.toFixed(2)}` },
          { label: 'Capital Gain/Loss', value: `$${(face - price).toFixed(2)}` },
        ],
        formula: 'YTM ≈ [C + (F - P)/n] / [(F + P)/2]',
      };
    }

    if (id.includes('saas') || id.includes('mrr') || id.includes('cac') || id.includes('burn')) {
      const cst = num1 || 250;
      const arpu = num2 || 50;
      const churn = num3 || 2.5;
      const mrr = cst * arpu;
      const arr = mrr * 12;
      const lostMrr = (mrr * churn) / 100;

      return {
        type: 'fields',
        fields: [
          { label: 'Total Active Customers', value: v1, setter: setV1, type: 'number' },
          { label: 'Average Revenue Per User ARPU ($)', value: v2, setter: setV2, type: 'number' },
          { label: 'Monthly Churn Rate (%)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Monthly Recurring Revenue (MRR)',
        primaryResult: `$${mrr.toLocaleString()}`,
        secondary: [
          { label: 'Annual Recurring Revenue (ARR)', value: `$${arr.toLocaleString()}` },
          { label: 'Est. Lost MRR to Churn', value: `$${lostMrr.toFixed(2)} / mo` },
        ],
        formula: 'MRR = Customers × ARPU | ARR = MRR × 12',
      };
    }

    // 2. GEOMETRY & MATH
    if (id.includes('cylinder')) {
      const r = num1 || 5;
      const h = num2 || 10;
      const vol = Math.PI * r * r * h;
      const area = 2 * Math.PI * r * h + 2 * Math.PI * r * r;

      return {
        type: 'fields',
        fields: [
          { label: 'Radius r (cm/m)', value: v1, setter: setV1, type: 'number' },
          { label: 'Height h (cm/m)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Cylinder Volume',
        primaryResult: `${vol.toFixed(2)} u³`,
        secondary: [
          { label: 'Total Surface Area', value: `${area.toFixed(2)} u²` },
          { label: 'Lateral Area', value: `${(2 * Math.PI * r * h).toFixed(2)} u²` },
        ],
        formula: 'Volume = π r² h | Surface Area = 2πrh + 2πr²',
      };
    }

    if (id.includes('sphere')) {
      const r = num1 || 5;
      const vol = (4 / 3) * Math.PI * Math.pow(r, 3);
      const area = 4 * Math.PI * Math.pow(r, 2);

      return {
        type: 'fields',
        fields: [{ label: 'Radius r (units)', value: v1, setter: setV1, type: 'number' }],
        primaryLabel: 'Sphere Volume',
        primaryResult: `${vol.toFixed(2)} u³`,
        secondary: [
          { label: 'Surface Area', value: `${area.toFixed(2)} u²` },
          { label: 'Circumference', value: `${(2 * Math.PI * r).toFixed(2)} u` },
        ],
        formula: 'Volume = (4/3)π r³ | Surface Area = 4π r²',
      };
    }

    if (id.includes('cone') || id.includes('pyramid')) {
      const r = num1 || 4;
      const h = num2 || 9;
      const vol = (1 / 3) * Math.PI * r * r * h;
      const slant = Math.sqrt(r * r + h * h);

      return {
        type: 'fields',
        fields: [
          { label: 'Base Radius / Side (units)', value: v1, setter: setV1, type: 'number' },
          { label: 'Height h (units)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Volume',
        primaryResult: `${vol.toFixed(2)} u³`,
        secondary: [
          { label: 'Slant Height (s)', value: `${slant.toFixed(2)} u` },
          { label: 'Lateral Surface Area', value: `${(Math.PI * r * slant).toFixed(2)} u²` },
        ],
        formula: 'Volume = (1/3) π r² h | Slant Height = √(r² + h²)',
      };
    }

    if (id.includes('3d') || id.includes('distance')) {
      const x1 = parseFloat(v1) || 0, y1 = parseFloat(v2) || 0, z1 = 0;
      const x2 = parseFloat(v3) || 10, y2 = parseFloat(v4) || 10, z2 = 0;
      const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
      const midX = (x1 + x2) / 2, midY = (y1 + y2) / 2;

      return {
        type: 'fields',
        fields: [
          { label: 'Point 1: X1', value: v1, setter: setV1, type: 'number' },
          { label: 'Point 1: Y1', value: v2, setter: setV2, type: 'number' },
          { label: 'Point 2: X2', value: v3, setter: setV3, type: 'number' },
          { label: 'Point 2: Y2', value: v4, setter: setV4, type: 'number' },
        ],
        primaryLabel: 'Euclidean Distance',
        primaryResult: `${dist.toFixed(3)}`,
        secondary: [
          { label: 'Midpoint (X, Y)', value: `(${midX}, ${midY})` },
          { label: 'Slope m', value: x2 !== x1 ? `${((y2 - y1) / (x2 - x1)).toFixed(2)}` : 'Undefined' },
        ],
        formula: 'd = √[ (x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)² ]',
      };
    }

    if (id.includes('matrix') || id.includes('system-linear')) {
      const a = num1 || 2, b = num2 || 3;
      const c = num3 || 1, d = num4 || 4;
      const det = a * d - b * c;
      const inv = det !== 0 ? `[ ${d / det}  ${-b / det} ] \n [ ${-c / det}  ${a / det} ]` : 'Singular (No Inverse)';

      return {
        type: 'fields',
        fields: [
          { label: 'Matrix Cell A11', value: v1, setter: setV1, type: 'number' },
          { label: 'Matrix Cell A12', value: v2, setter: setV2, type: 'number' },
          { label: 'Matrix Cell A21', value: v3, setter: setV3, type: 'number' },
          { label: 'Matrix Cell A22', value: v4, setter: setV4, type: 'number' },
        ],
        primaryLabel: 'Determinant |A|',
        primaryResult: `${det.toFixed(2)}`,
        secondary: [
          { label: 'Trace (A11 + A22)', value: `${a + d}` },
          { label: 'Matrix Invertible?', value: det !== 0 ? 'Yes' : 'No' },
        ],
        formula: 'det(A) = ad - bc | Inverse = (1/det)[ d  -b ; -c  a ]',
      };
    }

    if (id.includes('binomial') || id.includes('normal') || id.includes('poisson') || id.includes('zscore')) {
      const n = Math.round(num1) || 10;
      const p = (num2 || 50) / 100;
      const k = Math.round(num3) || 5;
      const mean = n * p;
      const stdDev = Math.sqrt(n * p * (1 - p));

      return {
        type: 'fields',
        fields: [
          { label: 'Number of Trials (n)', value: v1, setter: setV1, type: 'number' },
          { label: 'Probability of Success p (%)', value: v2, setter: setV2, type: 'number' },
          { label: 'Success Count (k)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Distribution Mean μ',
        primaryResult: `${mean.toFixed(2)}`,
        secondary: [
          { label: 'Standard Deviation σ', value: `${stdDev.toFixed(2)}` },
          { label: 'Variance σ²', value: `${(stdDev * stdDev).toFixed(2)}` },
        ],
        formula: 'Mean = n·p | StdDev = √(n·p·(1-p))',
      };
    }

    if (id.includes('prime') || id.includes('gcd') || id.includes('fibonacci') || id.includes('golden')) {
      const n = Math.abs(Math.round(num1)) || 360;
      const getGcd = (x: number, y: number): number => (y === 0 ? x : getGcd(y, x % y));
      const getLcm = (x: number, y: number) => (x * y) / getGcd(x, y);

      const numB = Math.abs(Math.round(num2)) || 48;
      const gcdVal = getGcd(n, numB);
      const lcmVal = getLcm(n, numB);

      return {
        type: 'fields',
        fields: [
          { label: 'First Integer A', value: v1, setter: setV1, type: 'number' },
          { label: 'Second Integer B', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Greatest Common Divisor (GCD)',
        primaryResult: `${gcdVal}`,
        secondary: [
          { label: 'Least Common Multiple (LCM)', value: `${lcmVal}` },
          { label: 'Golden Ratio Split of A', value: `${(n / 1.618033).toFixed(2)} : ${(n - n / 1.618033).toFixed(2)}` },
        ],
        formula: 'GCD(a, b) × LCM(a, b) = a × b',
      };
    }

    // 3. HEALTH & MEDICAL
    if (id.includes('vo2') || id.includes('heart-rate') || id.includes('rhr')) {
      const age = num1 || 30;
      const rhr = num2 || 65;
      const maxHr = 220 - age;
      const hrr = maxHr - rhr;
      const vo2Est = 15.3 * (maxHr / (rhr || 1));

      return {
        type: 'fields',
        fields: [
          { label: 'Current Age (Years)', value: v1, setter: setV1, type: 'number' },
          { label: 'Resting Heart Rate RHR (bpm)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Estimated Max HR',
        primaryResult: `${maxHr} bpm`,
        secondary: [
          { label: 'Heart Rate Reserve (HRR)', value: `${hrr} bpm` },
          { label: 'Est. VO2 Max', value: `${vo2Est.toFixed(1)} mL/kg/min` },
          { label: 'Fat Burn Zone (60-70%)', value: `${Math.round(rhr + hrr * 0.6)} - ${Math.round(rhr + hrr * 0.7)} bpm` },
        ],
        formula: 'Max HR = 220 - Age | Karvonen Target = RHR + (HRR × %Intensity)',
      };
    }

    if (id.includes('blood-pressure') || id.includes('blood-sugar') || id.includes('a1c') || id.includes('cholesterol')) {
      const sys = num1 || 120;
      const dia = num2 || 80;
      let stage = 'Normal';
      if (sys >= 180 || dia >= 120) stage = 'Hypertensive Crisis (Seek Emergency Care)';
      else if (sys >= 140 || dia >= 90) stage = 'Stage 2 Hypertension';
      else if (sys >= 130 || dia >= 80) stage = 'Stage 1 Hypertension';
      else if (sys >= 120 && dia < 80) stage = 'Elevated Blood Pressure';

      const mapVal = (2 * dia + sys) / 3;

      return {
        type: 'fields',
        fields: [
          { label: 'Systolic Pressure (mmHg)', value: v1, setter: setV1, type: 'number' },
          { label: 'Diastolic Pressure (mmHg)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Blood Pressure Category',
        primaryResult: stage,
        secondary: [
          { label: 'Mean Arterial Pressure (MAP)', value: `${mapVal.toFixed(1)} mmHg` },
          { label: 'Pulse Pressure', value: `${sys - dia} mmHg` },
        ],
        formula: 'MAP = Diastolic + 1/3 (Systolic - Diastolic)',
      };
    }

    if (id.includes('dosage') || id.includes('iv') || id.includes('drip') || id.includes('fluid')) {
      const weight = num1 || 70;
      const mgPerKg = num2 || 15;
      const totalMg = weight * mgPerKg;

      return {
        type: 'fields',
        fields: [
          { label: 'Patient Weight (kg)', value: v1, setter: setV1, type: 'number' },
          { label: 'Prescribed Dosage (mg / kg)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Total Required Dose',
        primaryResult: `${totalMg.toLocaleString()} mg`,
        secondary: [
          { label: 'Single Dose (TID - 3x/day)', value: `${(totalMg / 3).toFixed(1)} mg` },
          { label: '4-2-1 Maintenance Fluid Est.', value: `${(weight <= 20 ? weight * 2 + 20 : weight + 40).toFixed(0)} mL/hr` },
        ],
        formula: 'Total Dose = Weight (kg) × Dosage Rate (mg/kg)',
      };
    }

    // 4. PHYSICS, ELECTRONICS & SCIENCE
    if (id.includes('projectile') || id.includes('pendulum') || id.includes('force') || id.includes('energy')) {
      const v0 = num1 || 25;
      const angleDeg = num2 || 45;
      const rad = (angleDeg * Math.PI) / 180;
      const g = 9.81;
      const maxH = Math.pow(v0 * Math.sin(rad), 2) / (2 * g);
      const range = (Math.pow(v0, 2) * Math.sin(2 * rad)) / g;
      const flightTime = (2 * v0 * Math.sin(rad)) / g;

      return {
        type: 'fields',
        fields: [
          { label: 'Initial Velocity v₀ (m/s)', value: v1, setter: setV1, type: 'number' },
          { label: 'Launch Angle θ (Degrees)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Max Trajectory Range',
        primaryResult: `${range.toFixed(2)} meters`,
        secondary: [
          { label: 'Peak Height H_max', value: `${maxH.toFixed(2)} meters` },
          { label: 'Total Flight Time', value: `${flightTime.toFixed(2)} seconds` },
        ],
        formula: 'Range = (v₀² sin 2θ) / g | H_max = (v₀ sin θ)² / 2g',
      };
    }

    if (id.includes('voltage') || id.includes('resistor') || id.includes('circuit') || id.includes('led') || id.includes('wire')) {
      const vin = num1 || 12;
      const vf = num2 || 2.1;
      const currentMa = num3 || 20;
      const iA = currentMa / 1000;
      const rOhms = iA > 0 ? (vin - vf) / iA : 0;
      const powerW = iA * iA * rOhms;

      return {
        type: 'fields',
        fields: [
          { label: 'Source Voltage V_in (Volts)', value: v1, setter: setV1, type: 'number' },
          { label: 'LED / Load Drop Voltage V_f (Volts)', value: v2, setter: setV2, type: 'number' },
          { label: 'Target Current I (mA)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Required Resistor Value',
        primaryResult: `${rOhms.toFixed(1)} Ω`,
        secondary: [
          { label: 'Resistor Power Dissipation', value: `${powerW.toFixed(3)} Watts` },
          { label: 'Recommended Standard Resistor', value: `${Math.ceil(rOhms / 10) * 10} Ω (1/4W)` },
        ],
        formula: 'R = (V_in - V_f) / I | Power = I² R',
      };
    }

    if (id.includes('gas') || id.includes('dilution') || id.includes('moles') || id.includes('heat')) {
      const c1 = num1 || 10;
      const v1Val = num2 || 50;
      const c2 = num3 || 2;
      const v2Val = c2 > 0 ? (c1 * v1Val) / c2 : 0;

      return {
        type: 'fields',
        fields: [
          { label: 'Initial Concentration C₁ (M / %)', value: v1, setter: setV1, type: 'number' },
          { label: 'Initial Volume V₁ (mL)', value: v2, setter: setV2, type: 'number' },
          { label: 'Target Concentration C₂ (M / %)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Required Final Volume V₂',
        primaryResult: `${v2Val.toFixed(1)} mL`,
        secondary: [
          { label: 'Solvent Volume to Add', value: `${Math.max(0, v2Val - v1Val).toFixed(1)} mL` },
          { label: 'Dilution Factor', value: `${c2 > 0 ? (c1 / c2).toFixed(2) : 0}x` },
        ],
        formula: 'C₁ V₁ = C₂ V₂ (Solution Dilution Equation)',
      };
    }

    // 5. CONSTRUCTION & CARPENTRY
    if (id.includes('gravel') || id.includes('asphalt') || id.includes('brick') || id.includes('drywall') || id.includes('concrete') || id.includes('decking')) {
      const lengthFt = num1 || 20;
      const widthFt = num2 || 15;
      const depthInches = num3 || 4;

      const sqft = lengthFt * widthFt;
      const cuYards = (sqft * (depthInches / 12)) / 27;
      const tons = cuYards * 1.4;

      return {
        type: 'fields',
        fields: [
          { label: 'Area Length (Feet)', value: v1, setter: setV1, type: 'number' },
          { label: 'Area Width (Feet)', value: v2, setter: setV2, type: 'number' },
          { label: 'Depth / Thickness (Inches)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Required Aggregate Weight',
        primaryResult: `${tons.toFixed(2)} Tons`,
        secondary: [
          { label: 'Total Volume', value: `${cuYards.toFixed(2)} Cubic Yards` },
          { label: 'Total Surface Coverage', value: `${sqft.toLocaleString()} Sq. Ft.` },
          { label: 'Est. Bags (50lb each)', value: `${Math.ceil((tons * 2000) / 50)} Bags` },
        ],
        formula: 'Cubic Yards = (Length × Width × Depth/12) / 27 | Tons ≈ Yards × 1.4',
      };
    }

    // 6. DATE, TIME & ASTRONOMY
    if (cat === 'date' || id.includes('date') || id.includes('time') || id.includes('year') || id.includes('day') || id.includes('week') || id.includes('age') || id.includes('birth') || id.includes('clock') || id.includes('calendar') || id.includes('lap') || id.includes('pace') || id.includes('biorhythm') || id.includes('dog') || id.includes('leap') || id.includes('zone') || id.includes('utc')) {
      
      // Unix Timestamp & ISO 8601
      if (id.includes('unix') || id.includes('timestamp') || id.includes('iso8601')) {
        const ts = parseInt(v1) || Math.floor(Date.now() / 1000);
        const d = new Date(ts > 1e11 ? ts : ts * 1000);
        const isValid = !isNaN(d.getTime());
        return {
          type: 'fields',
          fields: [{ label: 'Unix Timestamp (Seconds)', value: v1, setter: setV1, type: 'number' }],
          primaryLabel: 'Formatted UTC Date',
          primaryResult: isValid ? d.toUTCString() : 'Invalid Timestamp',
          secondary: [
            { label: 'Local Timezone', value: isValid ? d.toLocaleString() : '-' },
            { label: 'ISO 8601 String', value: isValid ? d.toISOString() : '-' },
            { label: 'Epoch Seconds', value: `${Math.floor((isValid ? d.getTime() : 0) / 1000)}` },
          ],
          formula: 'Date = Unix Timestamp × 1000 ms',
        };
      }

      // Dog Years Calculator
      if (id.includes('dog')) {
        const age = parseFloat(v1) || 5;
        const sizes = ['Small (<20 lbs)', 'Medium (20-50 lbs)', 'Large (50-90 lbs)', 'Giant (>90 lbs)'];
        const sz = unitSelect1 && sizes.includes(unitSelect1) ? unitSelect1 : sizes[1];
        let humanAge = 0;
        if (age <= 1) humanAge = 15;
        else if (age <= 2) humanAge = 24;
        else {
          const mult = sz.startsWith('Small') ? 4 : sz.startsWith('Medium') ? 5 : sz.startsWith('Large') ? 6 : 7;
          humanAge = 24 + (age - 2) * mult;
        }

        return {
          type: 'fields',
          fields: [
            { label: 'Dog Age (Calendar Years)', value: v1, setter: setV1, type: 'number' },
            { label: 'Dog Breed Size', value: sz, setter: setUnitSelect1, type: 'select', options: sizes },
          ],
          primaryLabel: 'Equivalent Human Age',
          primaryResult: `${humanAge} Human Years`,
          secondary: [
            { label: 'Life Stage', value: age < 1 ? 'Puppy' : age < 7 ? 'Adult' : 'Senior Dog' },
            { label: 'Annual Human Rate After Year 2', value: `+${sz.startsWith('Small') ? 4 : sz.startsWith('Medium') ? 5 : sz.startsWith('Large') ? 6 : 7} Years/Year` },
          ],
          formula: 'AVMA Formula: Yr 1 = 15y, Yr 2 = 9y, subsequent = +4 to +7y depending on size',
        };
      }

      // Age & Chronological Age
      if (id.includes('age') && !id.includes('dog')) {
        const birth = parseDateSafe(date1);
        const target = parseDateSafe(date2);
        if (!birth || !target) {
          return { type: 'fields', fields: [], primaryLabel: 'Age', primaryResult: 'Invalid Date' };
        }
        let years = target.getFullYear() - birth.getFullYear();
        let months = target.getMonth() - birth.getMonth();
        let days = target.getDate() - birth.getDate();
        if (days < 0) {
          months--;
          const prevMonthDays = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
          days += prevMonthDays;
        }
        if (months < 0) {
          years--;
          months += 12;
        }
        const diffMs = Math.max(0, target.getTime() - birth.getTime());
        const totalDays = Math.floor(diffMs / 86400000);
        const totalHours = totalDays * 24;
        const totalSecs = Math.floor(diffMs / 1000);
        const decimalYears = (years + months / 12 + days / 365.2425).toFixed(2);

        // Next Birthday calculation
        let nextBdayYear = target.getFullYear();
        let nextBday = new Date(nextBdayYear, birth.getMonth(), birth.getDate());
        if (nextBday < target) {
          nextBdayYear += 1;
          nextBday = new Date(nextBdayYear, birth.getMonth(), birth.getDate());
        }
        const daysToBday = Math.ceil((nextBday.getTime() - target.getTime()) / 86400000);
        const nextAge = nextBdayYear - birth.getFullYear();

        return {
          type: 'fields',
          fields: [
            { label: 'Birth Date (تاريخ الميلاد)', value: date1, setter: setDate1, type: 'date' },
            { label: 'Target / Today Date (حتى تاريخ)', value: date2, setter: setDate2, type: 'date' },
          ],
          primaryLabel: 'Exact Chronological Age (العمر الدقيق)',
          primaryResult: `${years} Years, ${months} Months, ${days} Days (${years} سنة و ${months} أشهر و ${days} يوم)`,
          secondary: [
            { label: 'Decimal Years (بالسنوات العشرية)', value: `${decimalYears} Years (${decimalYears} سنة)` },
            { label: 'Total Days Lived (إجمالي الأيام)', value: `${totalDays.toLocaleString()} Days` },
            { label: 'Total Hours (إجمالي الساعات)', value: `${totalHours.toLocaleString()} Hours` },
            { label: 'Next Birthday (يوم الميلاد القادم)', value: `${daysToBday} Days Remaining (Turning ${nextAge})` },
          ],
          formula: 'Age = Target Date - Birth Date (Exact Calendar Adjustment)',
        };
      }

      // Birthday Day of Week
      if (id.includes('birthday') || id.includes('born')) {
        const birth = parseDateSafe(date1) || new Date(date1);
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayNamesAr = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        const dayIdx = birth.getDay();
        const dayName = isNaN(birth.getTime()) ? 'Invalid Date' : `${dayNames[dayIdx]} (${dayNamesAr[dayIdx]})`;
        
        // Zodiac
        const m = birth.getMonth() + 1;
        const d = birth.getDate();
        let zodiac = 'Capricorn (الجدي)';
        if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) zodiac = 'Aquarius (الدلو)';
        else if ((m === 2 && d >= 19) || (m === 3 && d <= 20)) zodiac = 'Pisces (الحوت)';
        else if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) zodiac = 'Aries (الحمل)';
        else if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) zodiac = 'Taurus (الثور)';
        else if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) zodiac = 'Gemini (الجوزاء)';
        else if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) zodiac = 'Cancer (السرطان)';
        else if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) zodiac = 'Leo (الأسد)';
        else if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) zodiac = 'Virgo (العذراء)';
        else if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) zodiac = 'Libra (الميزان)';
        else if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) zodiac = 'Scorpio (العقرب)';
        else if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) zodiac = 'Sagittarius (القوس)';

        return {
          type: 'fields',
          fields: [{ label: 'Date of Birth', value: date1, setter: setDate1, type: 'date' }],
          primaryLabel: 'Day of the Week You Were Born',
          primaryResult: dayName,
          secondary: [
            { label: 'Zodiac Sign', value: zodiac },
            { label: 'Full Date Text', value: isNaN(birth.getTime()) ? '-' : birth.toLocaleDateString(undefined, { dateStyle: 'full' }) },
          ],
          formula: 'Zeller Congruence & Calendar Day Mapping',
        };
      }

      // Date Difference
      if (id.includes('date-diff') || id.includes('difference')) {
        const d1 = parseDateSafe(date1) || new Date(date1);
        const d2 = parseDateSafe(date2) || new Date(date2);
        const earlier = d1 <= d2 ? d1 : d2;
        const later = d1 <= d2 ? d2 : d1;
        
        let diffYears = later.getFullYear() - earlier.getFullYear();
        let diffMonths = later.getMonth() - earlier.getMonth();
        let diffDays = later.getDate() - earlier.getDate();
        if (diffDays < 0) {
          diffMonths--;
          const prevMonthDays = new Date(later.getFullYear(), later.getMonth(), 0).getDate();
          diffDays += prevMonthDays;
        }
        if (diffMonths < 0) {
          diffYears--;
          diffMonths += 12;
        }

        const diffMs = Math.abs(d2.getTime() - d1.getTime());
        const totalDays = Math.floor(diffMs / 86400000);

        let bizDays = 0;
        const start = d1 < d2 ? new Date(d1) : new Date(d2);
        const end = d1 < d2 ? new Date(d2) : new Date(d1);
        const cur = new Date(start);
        while (cur < end) {
          const day = cur.getDay();
          if (day !== 0 && day !== 6) bizDays++;
          cur.setDate(cur.getDate() + 1);
        }

        const weeks = Math.floor(totalDays / 7);
        const remDays = totalDays % 7;

        return {
          type: 'fields',
          fields: [
            { label: 'Start Date', value: date1, setter: setDate1, type: 'date' },
            { label: 'End Date', value: date2, setter: setDate2, type: 'date' },
          ],
          primaryLabel: 'Total Difference (الفرق الإجمالي)',
          primaryResult: `${diffYears} Years, ${diffMonths} Months, ${diffDays} Days (${diffYears} سنة و ${diffMonths} أشهر و ${diffDays} يوم)`,
          secondary: [
            { label: 'Total Calendar Days', value: `${totalDays} Days` },
            { label: 'Business Working Days (Mon-Fri)', value: `${bizDays} Days` },
            { label: 'Weeks & Days', value: `${weeks} Weeks, ${remDays} Days` },
            { label: 'Total Hours', value: `${(totalDays * 24).toLocaleString()} Hours` },
          ],
          formula: 'Exact Calendar Duration (Years, Months, Days) + Total Days',
        };
      }

      // Work Days / Business Days
      if (id.includes('work-days') || id.includes('business-days') || id.includes('business')) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        let biz = 0;
        let weekend = 0;
        const start = d1 < d2 ? new Date(d1) : new Date(d2);
        const end = d1 < d2 ? new Date(d2) : new Date(d1);
        const cur = new Date(start);
        while (cur <= end) {
          const day = cur.getDay();
          if (day === 0 || day === 6) weekend++;
          else biz++;
          cur.setDate(cur.getDate() + 1);
        }

        return {
          type: 'fields',
          fields: [
            { label: 'Start Date', value: date1, setter: setDate1, type: 'date' },
            { label: 'End Date', value: date2, setter: setDate2, type: 'date' },
          ],
          primaryLabel: 'Working Business Days',
          primaryResult: `${biz} Days`,
          secondary: [
            { label: 'Weekend Days (Sat/Sun)', value: `${weekend} Days` },
            { label: 'Total Calendar Span', value: `${biz + weekend} Days` },
            { label: 'Estimated Work Hours (8h/day)', value: `${biz * 8} Hours` },
          ],
          formula: 'Working Days = Total Days - Weekend Days (Saturday & Sunday)',
        };
      }

      // Date Add / Subtract / Future / Past Date
      if (id.includes('add-subtract') || id.includes('future-date') || id.includes('past-date') || id.includes('days-from') || id.includes('days-ago')) {
        const base = new Date(date1);
        const daysOffset = parseFloat(v1) || 30;
        const isPast = id.includes('past') || id.includes('ago') || unitSelect1 === 'Subtract (-)';
        const resultDate = new Date(base);

        if (id.includes('business')) {
          let added = 0;
          const dir = isPast ? -1 : 1;
          while (added < daysOffset) {
            resultDate.setDate(resultDate.getDate() + dir);
            const day = resultDate.getDay();
            if (day !== 0 && day !== 6) added++;
          }
        } else {
          resultDate.setDate(resultDate.getDate() + (isPast ? -daysOffset : daysOffset));
        }

        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        return {
          type: 'fields',
          fields: [
            { label: 'Base Date', value: date1, setter: setDate1, type: 'date' },
            { label: 'Days Offset', value: v1, setter: setV1, type: 'number' },
            { label: 'Action', value: unitSelect1, setter: setUnitSelect1, type: 'select', options: ['Add (+)', 'Subtract (-)'] },
          ],
          primaryLabel: 'Calculated Date',
          primaryResult: isNaN(resultDate.getTime()) ? 'Invalid Date' : resultDate.toISOString().split('T')[0],
          secondary: [
            { label: 'Day of the Week', value: isNaN(resultDate.getTime()) ? '-' : dayNames[resultDate.getDay()] },
            { label: 'Full Date', value: isNaN(resultDate.getTime()) ? '-' : resultDate.toLocaleDateString(undefined, { dateStyle: 'full' }) },
          ],
          formula: 'Target Date = Base Date ± N Days',
        };
      }

      // Time Duration Between Times
      if (id.includes('duration') || id.includes('time-between')) {
        const [h1, m1] = (time1 || '09:00').split(':').map(Number);
        const [h2, m2] = (time2 || '17:30').split(':').map(Number);
        let startMins = (h1 || 0) * 60 + (m1 || 0);
        let endMins = (h2 || 0) * 60 + (m2 || 0);
        if (endMins < startMins) endMins += 24 * 60; // Overnight span
        const durMins = endMins - startMins;
        const hours = Math.floor(durMins / 60);
        const mins = durMins % 60;

        return {
          type: 'fields',
          fields: [
            { label: 'Start Time', value: time1, setter: setTime1, type: 'time' },
            { label: 'End Time', value: time2, setter: setTime2, type: 'time' },
          ],
          primaryLabel: 'Time Elapsed / Duration',
          primaryResult: `${hours} Hours ${mins} Minutes`,
          secondary: [
            { label: 'Decimal Hours', value: `${(durMins / 60).toFixed(2)} Hours` },
            { label: 'Total Minutes', value: `${durMins} Minutes` },
            { label: 'Total Seconds', value: `${(durMins * 60).toLocaleString()} Seconds` },
          ],
          formula: 'Duration = End Time - Start Time (Adjusted for overnight)',
        };
      }

      // Time Card & Work Hours
      if (id.includes('timecard') || id.includes('time-card') || id.includes('work-shift')) {
        const [h1, m1] = (time1 || '08:00').split(':').map(Number);
        const [h2, m2] = (time2 || '17:00').split(':').map(Number);
        let startMins = (h1 || 0) * 60 + (m1 || 0);
        let endMins = (h2 || 0) * 60 + (m2 || 0);
        if (endMins < startMins) endMins += 24 * 60;
        const breakMins = parseFloat(v1) || 60;
        const rate = parseFloat(v2) || 25;
        const netMins = Math.max(0, endMins - startMins - breakMins);
        const netHours = netMins / 60;
        const totalPay = netHours * rate;
        const overtimeHours = Math.max(0, netHours - 8);

        return {
          type: 'fields',
          fields: [
            { label: 'Clock In Time', value: time1, setter: setTime1, type: 'time' },
            { label: 'Clock Out Time', value: time2, setter: setTime2, type: 'time' },
            { label: 'Break Duration (Minutes)', value: v1, setter: setV1, type: 'number' },
            { label: 'Hourly Wage Rate ($)', value: v2, setter: setV2, type: 'number' },
          ],
          primaryLabel: 'Net Paid Hours',
          primaryResult: `${netHours.toFixed(2)} Hours`,
          secondary: [
            { label: 'Gross Pay For Shift', value: `$${totalPay.toFixed(2)}` },
            { label: 'Overtime Hours (>8h)', value: `${overtimeHours.toFixed(2)} Hours` },
            { label: 'Est. Weekly Pay (5 Shifts)', value: `$${(totalPay * 5).toFixed(2)}` },
          ],
          formula: 'Paid Hours = (Clock Out - Clock In) - Break | Pay = Hours × Rate',
        };
      }

      // Leap Year Checker
      if (id.includes('leap')) {
        const yr = parseInt(v1) || 2026;
        const isLeap = (yr % 4 === 0 && yr % 100 !== 0) || (yr % 400 === 0);
        return {
          type: 'fields',
          fields: [{ label: 'Year to Check', value: v1, setter: setV1, type: 'number' }],
          primaryLabel: 'Leap Year Status',
          primaryResult: isLeap ? 'Yes, Leap Year!' : 'No, Common Year',
          secondary: [
            { label: 'Total Days in Year', value: isLeap ? '366 Days' : '365 Days' },
            { label: 'Days in February', value: isLeap ? '29 Days' : '28 Days' },
            { label: 'Next Leap Year', value: `${isLeap ? yr + 4 : yr + (4 - (yr % 4))}` },
          ],
          formula: 'Leap Year Rule: (Year % 4 === 0 && Year % 100 !== 0) || (Year % 400 === 0)',
        };
      }

      // Time Zone Converter & Meeting Planner
      if (id.includes('zone') || id.includes('utc') || id.includes('meeting') || id.includes('flight') || id.includes('dst')) {
        const timeStr = time1 || '12:00';
        const [h, m] = timeStr.split(':').map(Number);
        const offsets: Record<string, number> = {
          'UTC / GMT (UTC+0)': 0,
          'EST (New York, UTC-5)': -5,
          'PST (Los Angeles, UTC-8)': -8,
          'CST (Chicago, UTC-6)': -6,
          'CET (Paris/London, UTC+1)': 1,
          'GST (Dubai, UTC+4)': 4,
          'AST (Riyadh, UTC+3)': 3,
          'IST (India, UTC+5.5)': 5.5,
          'JST (Tokyo, UTC+9)': 9,
          'AEST (Sydney, UTC+10)': 10,
        };
        const zoneKeys = Object.keys(offsets);
        const fromZone = unitSelect1 && offsets[unitSelect1] !== undefined ? unitSelect1 : zoneKeys[1];
        const toZone = unitSelect2 && offsets[unitSelect2] !== undefined ? unitSelect2 : zoneKeys[6];

        const offsetFrom = offsets[fromZone];
        const offsetTo = offsets[toZone];
        const diffHours = offsetTo - offsetFrom;
        let targetH = (h + diffHours) % 24;
        if (targetH < 0) targetH += 24;
        const targetTimeStr = `${String(Math.floor(targetH)).padStart(2, '0')}:${String(m || 0).padStart(2, '0')}`;
        const isGoodMeeting = targetH >= 9 && targetH <= 18;

        return {
          type: 'fields',
          fields: [
            { label: 'Source Time', value: time1, setter: setTime1, type: 'time' },
            { label: 'From Time Zone', value: fromZone, setter: setUnitSelect1, type: 'select', options: zoneKeys },
            { label: 'To Time Zone', value: toZone, setter: setUnitSelect2, type: 'select', options: zoneKeys },
          ],
          primaryLabel: 'Converted Local Time',
          primaryResult: targetTimeStr,
          secondary: [
            { label: 'Time Offset Difference', value: `${diffHours >= 0 ? '+' : ''}${diffHours} Hours` },
            { label: 'Business Hours Meeting Status', value: isGoodMeeting ? ' Suitable Business Hours (9am-6pm)' : ' Outside Normal Working Hours' },
          ],
          formula: 'Target Time = Source Time + (Target Zone Offset - Source Zone Offset)',
        };
      }

      // Count Down Timer
      if (id.includes('count') || id.includes('countdown')) {
        const target = new Date(date1);
        const now = new Date();
        const diffMs = target.getTime() - now.getTime();
        const absDiff = Math.abs(diffMs);
        const days = Math.floor(absDiff / 86400000);
        const hours = Math.floor((absDiff % 86400000) / 3600000);
        const mins = Math.floor((absDiff % 3600000) / 60000);
        const isPast = diffMs < 0;

        return {
          type: 'fields',
          fields: [
            { label: 'Event Target Date', value: date1, setter: setDate1, type: 'date' },
            { label: 'Event Label / Title', value: v1, setter: setV1, type: 'text' },
          ],
          primaryLabel: isPast ? 'Time Since Event' : 'Countdown Remaining',
          primaryResult: `${days} Days, ${hours} Hours, ${mins} Mins`,
          secondary: [
            { label: 'Status', value: isPast ? ' Event Has Passed' : ' Event Upcoming' },
            { label: 'Weeks Remaining', value: `${(days / 7).toFixed(1)} Weeks` },
          ],
          formula: 'Countdown = Event Date - Current Timestamp',
        };
      }

      // Time Unit Converter
      if (id.includes('time-unit') || id.includes('unit-converter')) {
        const val = parseFloat(v1) || 60;
        const ratesInSec: Record<string, number> = {
          'Milliseconds': 0.001,
          'Seconds': 1,
          'Minutes': 60,
          'Hours': 3600,
          'Days': 86400,
          'Weeks': 604800,
          'Months (30d)': 2592000,
          'Years (365d)': 31536000,
        };
        const uKeys = Object.keys(ratesInSec);
        const fromU = unitSelect1 && ratesInSec[unitSelect1] ? unitSelect1 : 'Minutes';
        const toU = unitSelect2 && ratesInSec[unitSelect2] ? unitSelect2 : 'Seconds';

        const totalSec = val * ratesInSec[fromU];
        const resultVal = totalSec / ratesInSec[toU];

        return {
          type: 'fields',
          fields: [
            { label: 'Time Value', value: v1, setter: setV1, type: 'number' },
            { label: 'From Unit', value: fromU, setter: setUnitSelect1, type: 'select', options: uKeys },
            { label: 'To Unit', value: toU, setter: setUnitSelect2, type: 'select', options: uKeys },
          ],
          primaryLabel: 'Converted Time',
          primaryResult: `${resultVal.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${toU}`,
          secondary: [
            { label: 'In Seconds', value: `${totalSec.toLocaleString()} Sec` },
            { label: 'In Hours', value: `${(totalSec / 3600).toFixed(2)} Hrs` },
            { label: 'In Days', value: `${(totalSec / 86400).toFixed(2)} Days` },
          ],
          formula: 'Converted = (Value × FromUnitInSec) / ToUnitInSec',
        };
      }

      // Biorhythm Cycle Calculator
      if (id.includes('biorhythm')) {
        const birth = new Date(date1);
        const target = new Date(date2);
        const daysLived = Math.floor(Math.max(0, target.getTime() - birth.getTime()) / 86400000);
        const phys = Math.round(Math.sin((2 * Math.PI * daysLived) / 23) * 100);
        const emot = Math.round(Math.sin((2 * Math.PI * daysLived) / 28) * 100);
        const intel = Math.round(Math.sin((2 * Math.PI * daysLived) / 33) * 100);

        return {
          type: 'fields',
          fields: [
            { label: 'Date of Birth', value: date1, setter: setDate1, type: 'date' },
            { label: 'Target Reading Date', value: date2, setter: setDate2, type: 'date' },
          ],
          primaryLabel: 'Physical Biorhythm Cycle',
          primaryResult: `${phys}%`,
          secondary: [
            { label: 'Emotional Cycle (28d)', value: `${emot}%` },
            { label: 'Intellectual Cycle (33d)', value: `${intel}%` },
            { label: 'Overall Harmony Avg', value: `${Math.round((phys + emot + intel) / 3)}%` },
          ],
          formula: 'Biorhythm = Sin(2π × DaysLived / CyclePeriod) × 100%',
        };
      }

      // Week Number or Day Number
      if (id.includes('week') || id.includes('day-number')) {
        const d = new Date(date1);
        const isValid = !isNaN(d.getTime());
        const startOfYear = new Date(isValid ? d.getFullYear() : 2026, 0, 1);
        const dayOfYear = Math.floor(((isValid ? d.getTime() : Date.now()) - startOfYear.getTime()) / 86400000) + 1;
        const weekNum = Math.ceil(dayOfYear / 7);

        return {
          type: 'fields',
          fields: [{ label: 'Selected Date', value: date1, setter: setDate1, type: 'date' }],
          primaryLabel: 'ISO Week Number',
          primaryResult: `Week ${weekNum}`,
          secondary: [
            { label: 'Day of the Year', value: `Day ${dayOfYear} of 365` },
            { label: 'Days Remaining in Year', value: `${365 - dayOfYear} Days` },
            { label: 'Year Progress', value: `${((dayOfYear / 365) * 100).toFixed(1)}%` },
          ],
          formula: 'ISO Week = Math.ceil(Day of Year / 7)',
        };
      }

      // Default Date Fallback for any other date/time tool
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      const diffMs = Math.abs(d2.getTime() - d1.getTime());
      const days = Math.floor(diffMs / 86400000);
      return {
        type: 'fields',
        fields: [
          { label: 'Start / Primary Date', value: date1, setter: setDate1, type: 'date' },
          { label: 'End / Target Date', value: date2, setter: setDate2, type: 'date' },
        ],
        primaryLabel: 'Date Interval Span',
        primaryResult: `${days} Days`,
        secondary: [
          { label: 'Weeks', value: `${(days / 7).toFixed(1)} Weeks` },
          { label: 'Months (approx)', value: `${(days / 30.43).toFixed(1)} Months` },
        ],
        formula: 'Interval = Math.abs(Date 2 - Date 1)',
      };
    }

    // 7. DEVELOPER & CODE
    if (id.includes('raid') || id.includes('ipv6') || id.includes('cidr') || id.includes('subnet') || id.includes('hash') || id.includes('sha') || id.includes('css') || id.includes('json') || id.includes('xml') || id.includes('cron') || id.includes('regex') || id.includes('base32') || id.includes('binary') || id.includes('hex')) {
      if (id.includes('raid')) {
        const drives = Math.max(2, Math.round(num1) || 4);
        const capTb = num2 || 4;
        const totalCap = drives * capTb;
        const usableRaid5 = (drives - 1) * capTb;
        const usableRaid10 = (drives / 2) * capTb;

        return {
          type: 'fields',
          fields: [
            { label: 'Number of Hard Drives', value: v1, setter: setV1, type: 'number' },
            { label: 'Capacity Per Drive (TB)', value: v2, setter: setV2, type: 'number' },
          ],
          primaryLabel: 'Usable Storage (RAID 5)',
          primaryResult: `${usableRaid5.toFixed(1)} TB`,
          secondary: [
            { label: 'Total Raw Capacity', value: `${totalCap} TB` },
            { label: 'RAID 10 Usable', value: `${usableRaid10.toFixed(1)} TB` },
            { label: 'Parity Loss Overhead', value: `${(((totalCap - usableRaid5) / totalCap) * 100).toFixed(0)}%` },
          ],
          formula: 'RAID 5 Usable = (N - 1) × Drive Size | RAID 10 = (N / 2) × Drive Size',
        };
      }

      if (id.includes('css') || id.includes('clamp')) {
        const minPx = num1 || 16;
        const maxPx = num2 || 24;
        const minW = num3 || 320;
        const maxW = num4 || 1200;

        const slope = (maxPx - minPx) / (maxW - minW);
        const yAxisIntersection = -minW * slope + minPx;
        const clampCode = `clamp(${(minPx / 16).toFixed(2)}rem, ${(yAxisIntersection / 16).toFixed(2)}rem + ${(slope * 100).toFixed(2)}vw, ${(maxPx / 16).toFixed(2)}rem)`;

        return {
          type: 'fields',
          fields: [
            { label: 'Minimum Font Size (px)', value: v1, setter: setV1, type: 'number' },
            { label: 'Maximum Font Size (px)', value: v2, setter: setV2, type: 'number' },
            { label: 'Minimum Viewport Width (px)', value: v3, setter: setV3, type: 'number' },
            { label: 'Maximum Viewport Width (px)', value: v4, setter: setV4, type: 'number' },
          ],
          primaryLabel: 'Generated CSS clamp() Property',
          primaryResult: clampCode,
          secondary: [
            { label: 'Slope Ratio', value: `${(slope * 100).toFixed(3)}vw` },
            { label: 'Rem Base Scaling', value: `${minPx}px -> ${maxPx}px` },
          ],
          formula: 'font-size: clamp(MIN, VAL, MAX)',
        };
      }
    }

    // 8. TEXT, SEO & CONTENT
    if (cat === 'text' || id.includes('text') || id.includes('word') || id.includes('case') || id.includes('readability') || id.includes('keyword') || id.includes('morse') || id.includes('slug')) {
      const text = textVal || 'Hello Calcyfy World';
      const charCount = text.length;
      const charNoSpaces = text.replace(/\s+/g, '').length;
      const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
      const sentences = text.split(/[.!?]+/).filter(Boolean).length || 1;
      const readTimeSec = Math.ceil((wordCount / 200) * 60);

      const camelCase = text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
      const snakeCase = text.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
      const kebabCase = text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

      return {
        type: 'text',
        primaryLabel: 'Word & Character Metrics',
        primaryResult: `${wordCount} Words | ${charCount} Chars`,
        secondary: [
          { label: 'Chars (No Spaces)', value: `${charNoSpaces}` },
          { label: 'Est. Reading Time', value: `${readTimeSec} Seconds` },
          { label: 'camelCase', value: camelCase },
          { label: 'snake_case', value: snakeCase },
          { label: 'kebab-case', value: kebabCase },
        ],
        formula: 'Reading Time = Word Count / 200 WPM',
      };
    }

    // GENERAL DEFAULT DYNAMIC CALCULATOR
    const valA = num1 || 100;
    const valB = num2 || 15;
    const calcOut = valA * (1 + valB / 100);

    return {
      type: 'fields',
      fields: [
        { label: 'Base Value / Amount', value: v1, setter: setV1, type: 'number' },
        { label: 'Factor / Rate (%)', value: v2, setter: setV2, type: 'number' },
        { label: 'Secondary Multiplier', value: v3, setter: setV3, type: 'number' },
      ],
      primaryLabel: 'Calculated Dynamic Output',
      primaryResult: `$${calcOut.toFixed(2)}`,
      secondary: [
        { label: 'Added Difference', value: `$${(calcOut - valA).toFixed(2)}` },
        { label: 'Multiplied Product', value: `${(valA * num3).toFixed(2)}` },
      ],
      formula: 'Result = Base Value × (1 + Rate / 100)',
    };
  };

  const config = getToolConfig();

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        
        {/* Top Header / Badges */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl text-emerald-600 dark:text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {tool ? t(`tool_${tool.id.replace('-', '_')}_name`, tool.id) : toolId}
              </h3>
              <p className="text-xs text-slate-500">Instant Interactive Calculator Engine</p>
            </div>
          </div>
          <button
            onClick={() => {
              const defs = getDefaultsForTool(toolId);
              setV1(defs.v1);
              setV2(defs.v2);
              setV3(defs.v3);
              setV4(defs.v4);
              setDate1('1995-06-15');
              setDate2(todayStr);
              setTime1('09:00');
              setTime2('17:30');
            }}
            className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>

        {/* Inputs Area */}
        {config.type === 'text' ? (
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">Input Content / String</label>
            <textarea
              rows={4}
              value={textVal}
              onChange={(e) => setTextVal(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="Type or paste text here..."
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {config.fields?.map((field, idx) => (
              <div key={idx}>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-base focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-900 dark:text-white"
                  >
                    {field.options?.map((opt, oIdx) => (
                      <option key={oIdx} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || 'text'}
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-900 dark:text-white"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Output Panel */}
        <div id="tool-calculator-container" className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
                {config.primaryLabel}
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-slate-900 dark:text-white mt-1 break-all">
                {config.primaryResult}
              </div>
            </div>

            {/* Action Buttons Toolbar */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => copyToClipboard(`${config.primaryLabel}: ${config.primaryResult}`)}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
                title="Copy primary result"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}</span>
              </button>

              <button
                onClick={() => {
                  const rows = [
                    ['Tool', tool ? tool.id : toolId],
                    ['Date', new Date().toLocaleString()],
                    ['Primary Metric', config.primaryLabel],
                    ['Result', config.primaryResult],
                  ];
                  if (config.fields) {
                    config.fields.forEach((f) => rows.push([f.label, String(f.value)]));
                  }
                  if (config.secondary) {
                    config.secondary.forEach((s) => rows.push([s.label, String(s.value)]));
                  }
                  if (config.formula) {
                    rows.push(['Formula', config.formula]);
                  }
                  const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.map((x) => `"${x}"`).join(',')).join('\n');
                  const encodedUri = encodeURI(csvContent);
                  const link = document.createElement('a');
                  link.setAttribute('href', encodedUri);
                  link.setAttribute('download', `${toolId}_calculation_report.csv`);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
                title="Export CSV Report"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>

              <button
                onClick={() => {
                  executePrint({
                    title: tool ? t(`tool_${tool.id.replace('-', '_')}_name`, tool.id) : toolId,
                    category: tool?.categoryId || 'Calculator',
                    elementId: 'tool-calculator-container',
                    lang,
                    isRTL,
                  });
                }}
                className="px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
                title="Print PDF Summary"
              >
                <Printer className="w-4 h-4 text-indigo-500" />
                <span className="hidden sm:inline">Print / PDF</span>
              </button>

              <button
                onClick={handleShareLink}
                className="px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
                title="Share calculation link"
              >
                {copiedShare ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4 text-amber-500" />}
                <span className="hidden sm:inline">{copiedShare ? 'Link Copied' : 'Share Link'}</span>
              </button>
            </div>
          </div>

          {/* Secondary Details Grid */}
          {config.secondary && config.secondary.length > 0 && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700/80 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {config.secondary.map((sec, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[11px] font-medium text-slate-500 block truncate">{sec.label}</span>
                  <span className="text-sm font-bold font-mono text-slate-800 dark:text-slate-100 mt-0.5 block truncate">
                    {sec.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Visual Interactive Analytics Chart */}
          {config.fields && config.fields.length >= 2 && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <BarChart3 className="w-4 h-4 text-emerald-500" />
                  <span>Visual Breakdown & Proportion</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Dynamic Analytics</span>
              </div>

              {/* Progress Distribution Bar */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex shadow-inner">
                  {config.fields.map((f, idx) => {
                    const numVal = Math.abs(parseFloat(f.value) || 1);
                    let sumVal = 0;
                    config.fields!.forEach((c) => { sumVal += Math.abs(parseFloat(c.value) || 1); });
                    const totalVal = sumVal || 1;
                    const pct = Math.min(100, Math.max(5, (numVal / totalVal) * 100));
                    const colors = [
                      'bg-emerald-500',
                      'bg-teal-500',
                      'bg-indigo-500',
                      'bg-amber-500',
                    ];
                    return (
                      <div
                        key={idx}
                        style={{ width: `${pct}%` }}
                        className={`${colors[idx % colors.length]} transition-all duration-500 h-full border-r border-white/20 last:border-r-0`}
                        title={`${f.label}: ${f.value} (${pct.toFixed(1)}%)`}
                      />
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium text-slate-500 dark:text-slate-400 pt-1">
                  {config.fields.map((f, idx) => {
                    const colors = [
                      'bg-emerald-500',
                      'bg-teal-500',
                      'bg-indigo-500',
                      'bg-amber-500',
                    ];
                    return (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${colors[idx % colors.length]}`} />
                        <span className="truncate max-w-[120px]">{f.label.split('(')[0]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Formula or Explanatory note */}
          {config.formula && (
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-2 font-mono">
              <Info className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{config.formula}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
