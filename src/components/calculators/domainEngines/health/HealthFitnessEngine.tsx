import React, { useState } from 'react';
import { ToolDef } from '../../../../types';
import { Activity, AlertTriangle, ShieldAlert, Heart, Flame, Dumbbell } from 'lucide-react';

interface HealthFitnessEngineProps {
  tool: ToolDef;
}

export const HealthFitnessEngine: React.FC<HealthFitnessEngineProps> = ({ tool }) => {
  // 1. One Rep Max State
  const [weightLifted, setWeightLifted] = useState<number>(225);
  const [repsCompleted, setRepsCompleted] = useState<number>(5);

  // 2. Running Pace State
  const [distanceKm, setDistanceKm] = useState<number>(10);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(50);
  const [seconds, setSeconds] = useState<number>(0);

  // 3. Macro Split State
  const [dailyCalories, setDailyCalories] = useState<number>(2200);
  const [macroRatioPreset, setMacroRatioPreset] = useState<'balanced' | 'lowcarb' | 'highprotein'>('balanced');

  // 4. BAC Blood Alcohol State
  const [drinksConsumed, setDrinksConsumed] = useState<number>(3);
  const [abvPercent, setAbvPercent] = useState<number>(5.0); // 5% beer
  const [drinkVolumeOz, setDrinkVolumeOz] = useState<number>(12); // 12 oz
  const [bodyWeightLbs, setBodyWeightLbs] = useState<number>(170);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [hoursSinceStart, setHoursSinceStart] = useState<number>(2);

  // 5. Protein Intake State
  const [proteinWeightKg, setProteinWeightKg] = useState<number>(75);
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'moderate' | 'athlete'>('moderate');

  // 1RM Calculation Logic
  const calcOneRepMax = () => {
    const w = weightLifted;
    const r = Math.max(1, Math.min(30, repsCompleted));

    const epley = Math.round(w * (1 + r / 30));
    const brzycki = Math.round(w * (36 / (37 - r)));
    const lander = Math.round((100 * w) / (101.3 - 2.67123 * r));
    const avg1rm = Math.round((epley + brzycki + lander) / 3);

    const percentages = [100, 95, 90, 85, 80, 75, 70].map(p => ({
      pct: p,
      weight: Math.round(avg1rm * (p / 100))
    }));

    return { epley, brzycki, lander, avg1rm, percentages };
  };

  // Running Pace Logic
  const calcPace = () => {
    const totalSec = hours * 3600 + minutes * 60 + seconds;
    if (totalSec <= 0 || distanceKm <= 0) return { paceKm: '0:00', paceMile: '0:00', speedKmh: '0.0' };

    const secPerKm = totalSec / distanceKm;
    const kmMin = Math.floor(secPerKm / 60);
    const kmSec = Math.round(secPerKm % 60);
    const paceKm = `${kmMin}:${kmSec < 10 ? '0' : ''}${kmSec}`;

    const distanceMiles = distanceKm * 0.621371;
    const secPerMile = totalSec / distanceMiles;
    const mileMin = Math.floor(secPerMile / 60);
    const mileSec = Math.round(secPerMile % 60);
    const paceMile = `${mileMin}:${mileSec < 10 ? '0' : ''}${mileSec}`;

    const speedKmh = ((distanceKm / totalSec) * 3600).toFixed(1);

    return { paceKm, paceMile, speedKmh };
  };

  // Macro Split Logic
  const calcMacros = () => {
    let pPct = 0.3, cPct = 0.4, fPct = 0.3;
    if (macroRatioPreset === 'lowcarb') { pPct = 0.4; cPct = 0.2; fPct = 0.4; }
    if (macroRatioPreset === 'highprotein') { pPct = 0.45; cPct = 0.35; fPct = 0.2; }

    const proteinGrams = Math.round((dailyCalories * pPct) / 4);
    const carbGrams = Math.round((dailyCalories * cPct) / 4);
    const fatGrams = Math.round((dailyCalories * fPct) / 9);

    return { proteinGrams, carbGrams, fatGrams, pPct: pPct*100, cPct: cPct*100, fPct: fPct*100 };
  };

  // BAC Blood Alcohol Logic (Widmark)
  const calcBac = () => {
    const totalOz = drinksConsumed * drinkVolumeOz;
    const alcoholGrams = totalOz * (abvPercent / 100) * 0.789 * 29.5735;
    const rFactor = gender === 'male' ? 0.68 : 0.55;
    const bodyWeightGrams = bodyWeightLbs * 453.592;

    const initialBac = (alcoholGrams / (bodyWeightGrams * rFactor)) * 100;
    const currentBac = Math.max(0, initialBac - 0.015 * hoursSinceStart);
    const hoursToSober = currentBac > 0 ? (currentBac / 0.015).toFixed(1) : '0.0';

    return { currentBac: currentBac.toFixed(3), hoursToSober };
  };

  // Protein Requirement Logic
  const calcProteinRequirement = () => {
    let multiplier = 1.2; // Moderate
    if (activityLevel === 'sedentary') multiplier = 0.8;
    if (activityLevel === 'athlete') multiplier = 2.0;

    const targetGrams = Math.round(proteinWeightKg * multiplier);
    const minGrams = Math.round(proteinWeightKg * (multiplier * 0.85));
    const maxGrams = Math.round(proteinWeightKg * (multiplier * 1.15));

    return { targetGrams, minGrams, maxGrams, multiplier };
  };

  return (
    <div id={`health-fitness-engine-${tool.id}`} className="max-w-4xl mx-auto space-y-6">
      {/* Header Card */}
      <div id="health-fitness-header" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2.5 py-1 rounded-md">
          Health & Physiology Analytics Engine
        </span>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{tool.name}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{tool.description}</p>
      </div>

      {/* Safety Disclaimer Banner */}
      <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl flex items-center gap-3 text-xs text-amber-900 dark:text-amber-200">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
        <span>
          <strong>Educational & Estimation Disclaimer:</strong> These physiological tools provide estimated mathematical outputs for informational use only. They do not constitute individualized medical or clinical advice.
        </span>
      </div>

      {/* ONE REP MAX TOOL */}
      {tool.id === 'one-rep-max' && (() => {
        const { epley, brzycki, lander, avg1rm, percentages } = calcOneRepMax();
        return (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Weight Lifted (lbs / kg)</label>
                <input
                  type="number"
                  min="1"
                  value={weightLifted}
                  onChange={(e) => setWeightLifted(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-base font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Reps Completed (1–30)</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={repsCompleted}
                  onChange={(e) => setRepsCompleted(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-base font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="p-4 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Estimated 1RM Average</span>
                <span className="text-2xl font-mono font-bold text-rose-900 dark:text-rose-200 mt-1 block">{avg1rm} lbs</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Epley Formula</span>
                <span className="text-xl font-mono font-bold text-slate-900 dark:text-white mt-1 block">{epley} lbs</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Brzycki Formula</span>
                <span className="text-xl font-mono font-bold text-slate-900 dark:text-white mt-1 block">{brzycki} lbs</span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* PACE RUNNER TOOL */}
      {tool.id === 'pace-runner' && (() => {
        const { paceKm, paceMile, speedKmh } = calcPace();
        return (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Distance (Kilometers)</label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-base font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Duration (Minutes)</label>
                <input
                  type="number"
                  min="1"
                  value={minutes}
                  onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-base font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="p-4 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Pace per Kilometer</span>
                <span className="text-2xl font-mono font-bold text-rose-900 dark:text-rose-200 mt-1 block">{paceKm} /km</span>
              </div>
              <div className="p-4 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Pace per Mile</span>
                <span className="text-2xl font-mono font-bold text-rose-900 dark:text-rose-200 mt-1 block">{paceMile} /mi</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Average Speed</span>
                <span className="text-xl font-mono font-bold text-slate-900 dark:text-white mt-1 block">{speedKmh} km/h</span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* MACRO SPLIT TOOL */}
      {tool.id === 'macro-split' && (() => {
        const { proteinGrams, carbGrams, fatGrams, pPct, cPct, fPct } = calcMacros();
        return (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Daily Calorie Target (kcal)</label>
                <input
                  type="number"
                  min="500"
                  step="50"
                  value={dailyCalories}
                  onChange={(e) => setDailyCalories(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-base font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Macro Ratio Preset</label>
                <select
                  value={macroRatioPreset}
                  onChange={(e) => setMacroRatioPreset(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
                >
                  <option value="balanced">Balanced (40% Carb / 30% Protein / 30% Fat)</option>
                  <option value="lowcarb">Low Carb (20% Carb / 40% Protein / 40% Fat)</option>
                  <option value="highprotein">High Protein (35% Carb / 45% Protein / 20% Fat)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="p-4 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Daily Protein ({pPct}%)</span>
                <span className="text-2xl font-mono font-bold text-rose-900 dark:text-rose-200 mt-1 block">{proteinGrams} g/day</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Daily Carbohydrates ({cPct}%)</span>
                <span className="text-2xl font-mono font-bold text-slate-900 dark:text-white mt-1 block">{carbGrams} g/day</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Daily Dietary Fats ({fPct}%)</span>
                <span className="text-2xl font-mono font-bold text-slate-900 dark:text-white mt-1 block">{fatGrams} g/day</span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* BLOOD ALCOHOL TOOL */}
      {tool.id === 'blood-alcohol' && (() => {
        const { currentBac, hoursToSober } = calcBac();
        return (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-slate-500">Standard Drinks</label>
                <input
                  type="number"
                  min="1"
                  value={drinksConsumed}
                  onChange={(e) => setDrinksConsumed(parseInt(e.target.value) || 0)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-slate-500">ABV Strength (%)</label>
                <input
                  type="number"
                  step="0.5"
                  value={abvPercent}
                  onChange={(e) => setAbvPercent(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-slate-500">Body Weight (lbs)</label>
                <input
                  type="number"
                  value={bodyWeightLbs}
                  onChange={(e) => setBodyWeightLbs(parseInt(e.target.value) || 0)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 font-mono">
              <div className="p-4 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Estimated BAC %</span>
                <span className="text-3xl font-bold text-rose-900 dark:text-rose-200 mt-1 block">{currentBac}%</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Hours to 0.00% Sober</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">{hoursToSober} Hours</span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* PROTEIN INTAKE TOOL */}
      {tool.id === 'protein-intake' && (() => {
        const { targetGrams, minGrams, maxGrams } = calcProteinRequirement();
        return (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Body Weight (kg)</label>
                <input
                  type="number"
                  value={proteinWeightKg}
                  onChange={(e) => setProteinWeightKg(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-base font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Physical Activity Intensity</label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
                >
                  <option value="sedentary">Sedentary / Light Activity (0.8 g/kg)</option>
                  <option value="moderate">Moderate Exercise / Active (1.2 g/kg)</option>
                  <option value="athlete">Athletic / Resistance Training (2.0 g/kg)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 font-mono">
              <div className="p-4 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Recommended Daily Protein</span>
                <span className="text-3xl font-bold text-rose-900 dark:text-rose-200 mt-1 block">{targetGrams} g/day</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Target Intake Range</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">{minGrams}g – {maxGrams}g / day</span>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
