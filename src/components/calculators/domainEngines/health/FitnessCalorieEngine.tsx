import React, { useState } from 'react';
import { useApp } from '../../../../context/AppContext';
import { Tool } from '../../../../types';
import { Copy, Check, Flame, Trophy, Activity, Dumbbell } from 'lucide-react';

interface FitnessCalorieEngineProps {
  tool: Tool;
}

export const FitnessCalorieEngine: React.FC<FitnessCalorieEngineProps> = ({ tool }) => {
  const { t, addHistory } = useApp();
  const [copied, setCopied] = useState(false);

  // States for sports & exercise inputs
  const [weightKg, setWeightKg] = useState<string>('75');
  const [durationMinutes, setDurationMinutes] = useState<string>('45');
  const [bodyFatPercent, setBodyFatPercent] = useState<string>('15');
  const [heightCm, setHeightCm] = useState<string>('178');
  const [totalLiftedKg, setTotalLiftedKg] = useState<string>('500');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [intensityMet, setIntensityMet] = useState<string>('8.0');
  const [swimTimeSeconds, setSwimTimeSeconds] = useState<string>('32');
  const [swimStrokes, setSwimStrokes] = useState<string>('18');
  const [splitPaceSeconds, setSplitPaceSeconds] = useState<string>('115'); // 1:55 / 500m
  const [treadmillSpeedMph, setTreadmillSpeedMph] = useState<string>('6.0');
  const [treadmillInclinePct, setTreadmillInclinePct] = useState<string>('4.0');
  const [verticalJumpCm, setVerticalJumpCm] = useState<string>('55');
  const [gripStrengthKg, setGripStrengthKg] = useState<string>('48');
  const [sitReachCm, setSitReachCm] = useState<string>('32');
  const [knownRaceDistKm, setKnownRaceDistKm] = useState<string>('5');
  const [knownRaceTimeMin, setKnownRaceTimeMin] = useState<string>('24');
  const [targetRaceDistKm, setTargetRaceDistKm] = useState<string>('21.0975'); // Half marathon

  const id = tool.id;

  const numWeight = Math.max(20, parseFloat(weightKg) || 75);
  const numDuration = Math.max(1, parseFloat(durationMinutes) || 45);
  const numBf = Math.max(3, Math.min(60, parseFloat(bodyFatPercent) || 15));
  const numHeight = Math.max(100, Math.min(250, parseFloat(heightCm) || 178));
  const numLifted = Math.max(10, parseFloat(totalLiftedKg) || 500);
  const isFemale = gender === 'female';
  const numMet = Math.max(1, parseFloat(intensityMet) || 8.0);
  const numSwimSec = parseFloat(swimTimeSeconds) || 32;
  const numSwimStrokes = parseFloat(swimStrokes) || 18;
  const numSplitSec = parseFloat(splitPaceSeconds) || 115;
  const numSpeedMph = parseFloat(treadmillSpeedMph) || 6.0;
  const numIncline = parseFloat(treadmillInclinePct) || 4.0;
  const numJumpCm = parseFloat(verticalJumpCm) || 55;
  const numGrip = parseFloat(gripStrengthKg) || 48;
  const numSitReach = parseFloat(sitReachCm) || 32;
  const numD1 = parseFloat(knownRaceDistKm) || 5;
  const numT1 = parseFloat(knownRaceTimeMin) || 24;
  const numD2 = parseFloat(targetRaceDistKm) || 21.0975;

  let primaryLabel = 'Performance Metric';
  let primaryValue = '0';
  let secondaryMetrics: { label: string; value: string }[] = [];
  let formulaText = '';

  // Helper generic MET calorie formula: Calories = MET × Weight(kg) × Duration(hours)
  const calcMetCalories = (met: number, durationMin: number, bodyweightKg: number) => {
    return met * bodyweightKg * (durationMin / 60);
  };

  // 1. Specific Calorie Burners (Swimming, Cycling, Jump Rope, Walking, Weightlifting, MET)
  if (id === 'calories-burned-swimming') {
    const cals = calcMetCalories(8.3, numDuration, numWeight);
    primaryLabel = 'Calories Burned Swimming';
    primaryValue = `${Math.round(cals)} kcal`;
    secondaryMetrics = [
      { label: 'Activity Baseline MET', value: '8.3 METs (Moderate-Vigorous Freestyle)' },
      { label: 'Energy Burn Rate', value: `${(cals / (numDuration / 60)).toFixed(0)} kcal/hr` },
      { label: 'Session Duration', value: `${numDuration} minutes` },
      { label: 'Bodyweight Applied', value: `${numWeight} kg (${(numWeight * 2.20462).toFixed(1)} lbs)` },
    ];
    formulaText = 'Calories = 8.3 × Body Weight (kg) × (Duration / 60)';
  } else if (id === 'calories-burned-cycling') {
    const cals = calcMetCalories(8.0, numDuration, numWeight);
    primaryLabel = 'Calories Burned Cycling';
    primaryValue = `${Math.round(cals)} kcal`;
    secondaryMetrics = [
      { label: 'Speed / Effort Baseline', value: '8.0 METs (~12-14 mph / 19-22 km/h)' },
      { label: 'Hourly Calorie Burn', value: `${(cals / (numDuration / 60)).toFixed(0)} kcal/hr` },
      { label: 'Duration', value: `${numDuration} minutes` },
      { label: 'Equivalent Fat Loss Potential', value: `${(cals / 7700).toFixed(3)} kg fat` },
    ];
    formulaText = 'Calories = 8.0 × Body Weight (kg) × (Duration / 60)';
  } else if (id === 'calories-burned-jump-rope') {
    const cals = calcMetCalories(11.8, numDuration, numWeight);
    primaryLabel = 'Calories Burned Skipping Rope';
    primaryValue = `${Math.round(cals)} kcal`;
    secondaryMetrics = [
      { label: 'High Intensity Skipping MET', value: '11.8 METs (100-120 skips/min)' },
      { label: 'Caloric Burn Rate', value: `${(cals / (numDuration / 60)).toFixed(0)} kcal/hr` },
      { label: 'Duration', value: `${numDuration} minutes` },
      { label: 'Cardio Training Effect', value: 'High Aerobic & Anaerobic Threshold' },
    ];
    formulaText = 'Calories = 11.8 × Body Weight (kg) × (Duration / 60)';
  } else if (id === 'calories-burned-walking') {
    // ACSM Walking Equation: VO2 = (0.1 × speed_m_min) + (1.8 × speed_m_min × grade) + 3.5
    const speedMMin = (numSpeedMph * 1609.34) / 60;
    const vo2 = 0.1 * speedMMin + 1.8 * speedMMin * (numIncline / 100) + 3.5;
    const met = vo2 / 3.5;
    const cals = calcMetCalories(met, numDuration, numWeight);

    primaryLabel = 'Calories Burned (Incline Walking)';
    primaryValue = `${Math.round(cals)} kcal`;
    secondaryMetrics = [
      { label: 'Calculated ACSM METs', value: `${met.toFixed(2)} METs` },
      { label: 'Treadmill Incline / Grade', value: `${numIncline}% Grade` },
      { label: 'Walking Speed', value: `${numSpeedMph} mph (${(numSpeedMph * 1.60934).toFixed(1)} km/h)` },
      { label: 'Oxygen Consumption (VO2)', value: `${vo2.toFixed(1)} mL/kg/min` },
    ];
    formulaText = 'VO2 = (0.1 × Speed) + (1.8 × Speed × Incline) + 3.5 | MET = VO2 / 3.5';
  } else if (id === 'calories-burned-weightlifting') {
    const cals = calcMetCalories(5.5, numDuration, numWeight);
    primaryLabel = 'Strength Training Calories';
    primaryValue = `${Math.round(cals)} kcal`;
    secondaryMetrics = [
      { label: 'Resistance Training Baseline', value: '5.5 METs (Vigorous Weightlifting)' },
      { label: 'Hourly Calorie Burn', value: `${(cals / (numDuration / 60)).toFixed(0)} kcal/hr` },
      { label: 'Post-Exercise Oxygen (EPOC)', value: '+8-12% baseline metabolic elevation' },
      { label: 'Duration', value: `${numDuration} minutes` },
    ];
    formulaText = 'Calories = 5.5 × Body Weight (kg) × (Duration / 60)';
  } else if (id === 'metabolic-equivalent-met') {
    const cals = calcMetCalories(numMet, numDuration, numWeight);
    primaryLabel = 'MET Energy Expenditure';
    primaryValue = `${Math.round(cals)} kcal`;
    secondaryMetrics = [
      { label: 'Selected MET Level', value: `${numMet} METs` },
      { label: 'Hourly Expenditure', value: `${(cals / (numDuration / 60)).toFixed(0)} kcal/hr` },
      { label: 'Resting Baseline (1.0 MET)', value: `${Math.round(calcMetCalories(1.0, numDuration, numWeight))} kcal` },
      { label: 'Net Exercise Burn', value: `${Math.round(cals - calcMetCalories(1.0, numDuration, numWeight))} kcal` },
    ];
    formulaText = 'Calories = MET × Body Weight (kg) × Duration (hours)';
  }
  // 2. Fat Free Mass Index (`fat-free-mass-index`)
  else if (id === 'fat-free-mass-index') {
    const leanMassKg = numWeight * (1 - numBf / 100);
    const heightM = numHeight / 100;
    const rawFfmi = leanMassKg / (heightM * heightM);
    // Normalized FFMI for height (Kouri et al. 1995 standard baseline 1.8m)
    const normFfmi = rawFfmi + 6.1 * (1.8 - heightM);

    let naturalLimit = 'Typical / Untrained (< 19)';
    if (normFfmi >= 25.0) naturalLimit = 'Elite / Upper Natural Limit (≥ 25.0 Kouri et al.)';
    else if (normFfmi >= 22.0) naturalLimit = 'Excellent / Highly Advanced Natural (22.0 – 24.9)';
    else if (normFfmi >= 20.0) naturalLimit = 'Above Average / Trained (20.0 – 21.9)';

    primaryLabel = 'Normalized FFMI (Fat-Free Mass Index)';
    primaryValue = `${normFfmi.toFixed(1)} kg/m²`;
    secondaryMetrics = [
      { label: 'Total Lean Mass', value: `${leanMassKg.toFixed(1)} kg (${(leanMassKg * 2.20462).toFixed(1)} lbs)` },
      { label: 'Fat Mass', value: `${(numWeight - leanMassKg).toFixed(1)} kg (${numBf}% body fat)` },
      { label: 'Raw Unadjusted FFMI', value: `${rawFfmi.toFixed(2)} kg/m²` },
      { label: 'Muscularity Classification', value: naturalLimit },
    ];
    formulaText = 'FFMI = Lean_Mass(kg) / Height(m)² | Normalized = FFMI + 6.1 × (1.8 - Height)';
  }
  // 3. Wilks & IPF Points (`wilks-score-powerlifting`, `ipf-points-calculator`)
  else if (id === 'wilks-score-powerlifting') {
    // 2020 Wilks Coefficients
    const a = isFemale ? -125.4255398 : 47.46178854;
    const b = isFemale ? 13.71219419 : 8.472061379;
    const c = isFemale ? -0.03307250481 : 0.07369410346;
    const d = isFemale ? -0.001050400051 : -0.001395833811;
    const e = isFemale ? 9.387738814e-6 : 7.07665973070743e-6;
    const f = isFemale ? -2.333461388e-8 : -1.20804336482315e-8;

    const poly = a + b * numWeight + c * Math.pow(numWeight, 2) + d * Math.pow(numWeight, 3) + e * Math.pow(numWeight, 4) + f * Math.pow(numWeight, 5);
    const wilksCoeff = 500 / poly;
    const wilksScore = numLifted * wilksCoeff;

    primaryLabel = 'Wilks 2020 Strength Score';
    primaryValue = `${wilksScore.toFixed(2)} pts`;
    secondaryMetrics = [
      { label: 'Total Weight Lifted (S+B+D)', value: `${numLifted} kg (${(numLifted * 2.20462).toFixed(1)} lbs)` },
      { label: 'Bodyweight Coefficient', value: wilksCoeff.toFixed(4) },
      { label: 'Strength-to-Bodyweight Ratio', value: `${(numLifted / numWeight).toFixed(2)}x Bodyweight` },
      { label: 'Category Standard', value: isFemale ? 'Female Powerlifting' : 'Male Powerlifting' },
    ];
    formulaText = 'Wilks = Lifted_Total(kg) × [500 ÷ (a + b·w + c·w² + d·w³ + e·w⁴ + f·w⁵)]';
  } else if (id === 'ipf-points-calculator') {
    // IPF GL Points parameters
    const paramA = isFemale ? 610.32796 : 1199.72839;
    const paramB = isFemale ? 1045.59282 : 1025.18162;
    const paramC = isFemale ? 0.03048 : 0.00921;

    const glPoints = (100 * numLifted) / (paramA - paramB * Math.exp(-paramC * numWeight));

    primaryLabel = 'IPF GL Powerlifting Points';
    primaryValue = `${glPoints.toFixed(2)} pts`;
    secondaryMetrics = [
      { label: 'Official IPF GL Formula', value: `${glPoints.toFixed(2)} points` },
      { label: 'Lifted Total (Squat + Bench + Deadlift)', value: `${numLifted} kg` },
      { label: 'Lifter Bodyweight', value: `${numWeight} kg` },
      { label: 'Standard Rating', value: glPoints > 100 ? 'International Competitor Tier (100+)' : glPoints > 85 ? 'National Competitor Tier' : 'Regional / Club Tier' },
    ];
    formulaText = 'IPF GL = 100 × Total ÷ [A - B × e^(-C × Bodyweight)]';
  }
  // 4. Race Time Predictor Riegel (`run-race-time-predictor`)
  else if (id === 'run-race-time-predictor') {
    // Pete Riegel: T2 = T1 × (D2 / D1)^1.06
    const predictedTimeMin = numT1 * Math.pow(numD2 / numD1, 1.06);
    const predHours = Math.floor(predictedTimeMin / 60);
    const predMins = Math.floor(predictedTimeMin % 60);
    const predSecs = Math.round((predictedTimeMin * 60) % 60);

    const targetPacePerKm = predictedTimeMin / numD2;
    const paceMin = Math.floor(targetPacePerKm);
    const paceSec = Math.round((targetPacePerKm - paceMin) * 60);

    primaryLabel = 'Predicted Race Finish Time';
    primaryValue = `${predHours > 0 ? `${predHours}h ` : ''}${predMins}m ${predSecs.toString().padStart(2, '0')}s`;
    secondaryMetrics = [
      { label: 'Predicted Target Pace', value: `${paceMin}:${paceSec.toString().padStart(2, '0')} /km` },
      { label: 'Target Race Distance', value: `${numD2} km` },
      { label: 'Baseline Input Race', value: `${numD1} km in ${numT1} minutes` },
      { label: 'Riegel Fatigue Exponent', value: '1.06 (Standard endurance decay)' },
    ];
    formulaText = 'T2 = T1 × (D2 ÷ D1)^1.06 (Riegel Endurance Formula)';
  }
  // 5. Swimming SWOLF (`swim-pace-swolf`)
  else if (id === 'swim-pace-swolf') {
    const swolf = numSwimSec + numSwimStrokes;
    let rating = 'Average Swimming Efficiency (35-45 in 25m pool)';
    if (swolf < 30) rating = 'Elite / Competitive Swimmer Efficiency (< 30)';
    else if (swolf < 35) rating = 'Excellent Efficiency';

    primaryLabel = 'SWOLF Efficiency Score';
    primaryValue = `${swolf}`;
    secondaryMetrics = [
      { label: 'Lap Time', value: `${numSwimSec} seconds` },
      { label: 'Stroke Count', value: `${numSwimStrokes} strokes` },
      { label: 'Efficiency Interpretation', value: rating },
      { label: 'Goal', value: 'Lower score indicates greater distance per stroke and speed' },
    ];
    formulaText = 'SWOLF = Time (seconds) + Stroke Count (per length)';
  }
  // 6. Concept2 Ergometer (`ergometer-concept2-pace`)
  else if (id === 'ergometer-concept2-pace') {
    // Watts = 2.80 / (pace_seconds / 500)^3
    const paceFraction = numSplitSec / 500;
    const watts = 2.80 / Math.pow(paceFraction, 3);
    const splitMin = Math.floor(numSplitSec / 60);
    const splitSec = Math.round(numSplitSec % 60);

    primaryLabel = 'Concept2 Rowing Power Output';
    primaryValue = `${Math.round(watts)} Watts`;
    secondaryMetrics = [
      { label: 'Split Pace (500m)', value: `${splitMin}:${splitSec.toString().padStart(2, '0')} / 500m` },
      { label: 'Estimated 2,000m Time', value: `${Math.floor((numSplitSec * 4) / 60)}m ${Math.round((numSplitSec * 4) % 60)}s` },
      { label: 'Calorie Burn Equivalent', value: `${Math.round(watts * 4 + 300)} cal/hr (Concept2 standard)` },
      { label: 'Official PM5 Dynamic Model', value: 'Watts = 2.80 ÷ (Pace_sec / 500)³' },
    ];
    formulaText = 'Watts = 2.80 ÷ (Split_Pace_seconds / 500)³';
  }
  // 7. Treadmill Grade Equivalent (`treadmill-grade-equivalent`)
  else if (id === 'treadmill-grade-equivalent') {
    // 1% incline compensates for lack of air resistance outdoors (Jones & Doust 1996)
    // Extra incline pace factor
    const flatPaceMph = numSpeedMph * (1 + (numIncline * 0.05));
    primaryLabel = 'Equivalent Outdoor Flat Speed';
    primaryValue = `${flatPaceMph.toFixed(2)} mph`;
    secondaryMetrics = [
      { label: 'Treadmill Setting', value: `${numSpeedMph} mph @ ${numIncline}% Grade` },
      { label: 'Equivalent Flat Pace', value: `${(60 / flatPaceMph).toFixed(2)} min/mile` },
      { label: 'Air Resistance Compensation', value: '1.0% grade replicates outdoor wind resistance' },
      { label: 'Metabolic Workload Multiplier', value: `${(1 + numIncline * 0.05).toFixed(2)}x` },
    ];
    formulaText = 'Equivalent Flat Pace adjusted for grade oxygen cost (Minetti / Jones & Doust)';
  }
  // 8. Sayers Vertical Jump Peak Power (`vertical-jump-power`)
  else if (id === 'vertical-jump-power') {
    // Sayers et al. (1999) Peak Power (W) = 60.7 × Jump_Height_cm + 45.3 × Body_Mass_kg - 2055
    const peakPowerWatts = 60.7 * numJumpCm + 45.3 * numWeight - 2055;
    primaryLabel = 'Peak Anaerobic Jump Power';
    primaryValue = `${Math.round(peakPowerWatts)} Watts`;
    secondaryMetrics = [
      { label: 'Vertical Jump Height', value: `${numJumpCm} cm (${(numJumpCm / 2.54).toFixed(1)} inches)` },
      { label: 'Body Mass', value: `${numWeight} kg` },
      { label: 'Power-to-Weight Ratio', value: `${(peakPowerWatts / numWeight).toFixed(1)} W/kg` },
      { label: 'Sayers Peak Power Equation', value: 'Valid for counter-movement jump (CMJ)' },
    ];
    formulaText = 'Peak Power (Watts) = (60.7 × Jump_cm) + (45.3 × Weight_kg) - 2055';
  }
  // 9. Grip Strength Norms (`grip-strength-norm`)
  else if (id === 'grip-strength-norm') {
    let tier = 'Average Grip Strength';
    if (numGrip > 55) tier = 'High / Superior Grip (Top Quintile)';
    else if (numGrip < 35) tier = 'Low / Reduced Biomarker (Frailty threshold)';

    primaryLabel = 'Grip Strength Biomarker';
    primaryValue = tier;
    secondaryMetrics = [
      { label: 'Isometric Grip Force', value: `${numGrip} kg (${(numGrip * 2.20462).toFixed(1)} lbs)` },
      { label: 'Biological Sex', value: isFemale ? 'Female' : 'Male' },
      { label: 'Sarcopenia Warning Threshold', value: isFemale ? '< 16 kg' : '< 27 kg (EWGSOP2 consensus)' },
      { label: 'Clinical Significance', value: 'Predictor of all-cause longevity and neuromuscular vigor' },
    ];
    formulaText = 'Classified against Jamar Dynamometer population percentiles';
  }
  // 10. Sit and Reach Flexibility (`flexibility-sit-reach`)
  else {
    let flexRating = 'Average Flexibility (ACSM 50th percentile)';
    if (numSitReach > 38) flexRating = 'Excellent / Hamstring & Lower Back Range';
    else if (numSitReach < 25) flexRating = 'Poor / Tight Hamstrings & Lumbar';

    primaryLabel = 'Flexibility Test Score';
    primaryValue = flexRating;
    secondaryMetrics = [
      { label: 'Reach Distance Measured', value: `${numSitReach} cm (${(numSitReach / 2.54).toFixed(1)} inches)` },
      { label: 'Test Standard', value: 'Standard sit-and-reach box (23cm / 26cm baseline mark)' },
      { label: 'Target Muscle Group', value: 'Hamstring length and lumbar spine articulation' },
      { label: 'ACSM Adult Norm Tier', value: flexRating },
    ];
    formulaText = 'Ranked against ACSM Fitness Assessment Normative Percentiles';
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
        {/* Dynamic Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('fit_bodyweight', 'Body Weight (kg)')}
            </label>
            <input
              type="number"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
              placeholder="75"
            />
          </div>

          {(id.includes('calories') || id === 'metabolic-equivalent-met') && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('fit_duration', 'Duration (Minutes)')}
              </label>
              <input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                placeholder="45"
              />
            </div>
          )}

          {id === 'calories-burned-walking' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fit_speed_mph', 'Walking Speed (mph)')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={treadmillSpeedMph}
                  onChange={(e) => setTreadmillSpeedMph(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="3.5"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fit_incline_pct', 'Treadmill Incline (%)')}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={treadmillInclinePct}
                  onChange={(e) => setTreadmillInclinePct(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="4.0"
                />
              </div>
            </>
          )}

          {id === 'fat-free-mass-index' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fit_height_cm', 'Height (cm)')}
                </label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="178"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fit_bodyfat_pct', 'Body Fat Percentage (%)')}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={bodyFatPercent}
                  onChange={(e) => setBodyFatPercent(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="15"
                />
              </div>
            </>
          )}

          {(id === 'wilks-score-powerlifting' || id === 'ipf-points-calculator') && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fit_total_lifted', 'Total Lifted S+B+D (kg)')}
                </label>
                <input
                  type="number"
                  value={totalLiftedKg}
                  onChange={(e) => setTotalLiftedKg(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fit_gender', 'Lifter Category')}
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </>
          )}

          {id === 'run-race-time-predictor' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fit_known_dist', 'Known Race Distance (km)')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={knownRaceDistKm}
                  onChange={(e) => setKnownRaceDistKm(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="5"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fit_known_time', 'Known Race Time (Minutes)')}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={knownRaceTimeMin}
                  onChange={(e) => setKnownRaceTimeMin(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="24"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fit_target_dist', 'Target Race Distance (km)')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={targetRaceDistKm}
                  onChange={(e) => setTargetRaceDistKm(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="21.1"
                />
              </div>
            </>
          )}

          {id === 'swim-pace-swolf' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fit_swim_sec', 'Lap Time (Seconds)')}
                </label>
                <input
                  type="number"
                  value={swimTimeSeconds}
                  onChange={(e) => setSwimTimeSeconds(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="32"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fit_swim_strokes', 'Stroke Count (Single Lap)')}
                </label>
                <input
                  type="number"
                  value={swimStrokes}
                  onChange={(e) => setSwimStrokes(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="18"
                />
              </div>
            </>
          )}

          {id === 'ergometer-concept2-pace' && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('fit_split_sec', '500m Split Pace (Seconds, e.g. 115s = 1:55)')}
              </label>
              <input
                type="number"
                value={splitPaceSeconds}
                onChange={(e) => setSplitPaceSeconds(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                placeholder="115"
              />
            </div>
          )}

          {id === 'vertical-jump-power' && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('fit_jump_cm', 'Vertical Jump Height (cm)')}
              </label>
              <input
                type="number"
                value={verticalJumpCm}
                onChange={(e) => setVerticalJumpCm(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                placeholder="55"
              />
            </div>
          )}

          {id === 'grip-strength-norm' && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('fit_grip_kg', 'Dynamometer Grip Force (kg)')}
              </label>
              <input
                type="number"
                value={gripStrengthKg}
                onChange={(e) => setGripStrengthKg(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                placeholder="48"
              />
            </div>
          )}

          {id === 'flexibility-sit-reach' && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('fit_sit_reach_cm', 'Sit & Reach Distance (cm)')}
              </label>
              <input
                type="number"
                value={sitReachCm}
                onChange={(e) => setSitReachCm(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                placeholder="32"
              />
            </div>
          )}
        </div>

        {/* Primary Banner */}
        <div className="p-6 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-700 dark:text-orange-400">
              {primaryLabel}
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-orange-600 dark:text-orange-400 mt-1">
              {primaryValue}
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 self-start sm:self-center"
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

        {/* Methodology Verification */}
        <div className="p-4 bg-slate-100 dark:bg-slate-800/40 rounded-xl space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
          <div className="font-semibold text-slate-700 dark:text-slate-300">
            Formula: <code className="font-mono text-slate-800 dark:text-slate-200">{formulaText}</code>
          </div>
        </div>
      </div>
    </div>
  );
};
