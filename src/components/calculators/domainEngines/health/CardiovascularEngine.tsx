import React, { useState } from 'react';
import { useApp } from '../../../../context/AppContext';
import { Tool } from '../../../../types';
import { Copy, Check, Heart, Activity, AlertTriangle, ShieldCheck } from 'lucide-react';

interface CardiovascularEngineProps {
  tool: Tool;
}

export const CardiovascularEngine: React.FC<CardiovascularEngineProps> = ({ tool }) => {
  const { t, addHistory } = useApp();
  const [copied, setCopied] = useState(false);

  // States for cardiovascular inputs
  const [age, setAge] = useState<string>('30');
  const [restingHr, setRestingHr] = useState<string>('65');
  const [maxHrManual, setMaxHrManual] = useState<string>('190');
  const [systolic, setSystolic] = useState<string>('120');
  const [diastolic, setDiastolic] = useState<string>('80');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [targetIntensity, setTargetIntensity] = useState<string>('70');
  const [cooperDistanceMeters, setCooperDistanceMeters] = useState<string>('2400');

  const id = tool.id;

  const numAge = Math.max(1, Math.min(120, parseFloat(age) || 30));
  const numRhr = Math.max(30, Math.min(220, parseFloat(restingHr) || 65));
  const numSys = Math.max(50, Math.min(300, parseFloat(systolic) || 120));
  const numDia = Math.max(30, Math.min(200, parseFloat(diastolic) || 80));
  const numIntensity = Math.max(10, Math.min(100, parseFloat(targetIntensity) || 70));
  const numDistance = Math.max(100, parseFloat(cooperDistanceMeters) || 2400);

  // Standard Max HR models
  const tanakaMaxHr = Math.round(208 - (0.7 * numAge));
  const foxMaxHr = Math.round(220 - numAge);
  const hrr = Math.max(1, tanakaMaxHr - numRhr);

  let primaryLabel = 'Cardiovascular Metric';
  let primaryValue = '0';
  let secondaryMetrics: { label: string; value: string }[] = [];
  let formulaText = '';
  let clinicalNote = 'Estimations are for fitness and aerobic conditioning guidance. Not a substitute for clinical ECG or cardiology diagnosis.';

  // 1. VO2 Max Calculator (`vo2-max-calculator`)
  if (id === 'vo2-max-calculator') {
    // Uth-Sørensen-Overgaard-Pedersen formula: 15.3 × (HRmax / HRrest)
    const vo2MaxUth = 15.3 * (tanakaMaxHr / numRhr);
    // Cooper 12-min run test: (Distance in meters - 504.9) / 44.73
    const vo2MaxCooper = Math.max(10, (numDistance - 504.9) / 44.73);

    primaryLabel = 'Estimated VO2 Max (Aerobic Capacity)';
    primaryValue = `${vo2MaxUth.toFixed(1)} mL/kg/min`;

    let fitnessTier = 'Average / Good';
    if (vo2MaxUth > 52) fitnessTier = 'Superior / Elite (Top 5th Percentile)';
    else if (vo2MaxUth > 44) fitnessTier = 'Excellent';
    else if (vo2MaxUth < 35) fitnessTier = 'Below Average (Cardiorespiratory conditioning recommended)';

    secondaryMetrics = [
      { label: 'Uth-Pedersen Ratio Estimate', value: `${vo2MaxUth.toFixed(1)} mL/kg/min` },
      { label: 'Cooper 12-Min Test Estimate', value: `${vo2MaxCooper.toFixed(1)} mL/kg/min` },
      { label: 'Estimated Max Heart Rate (Tanaka)', value: `${tanakaMaxHr} bpm` },
      { label: 'Aerobic Fitness Rating', value: fitnessTier },
    ];
    formulaText = 'VO2 Max = 15.3 × (HR_max ÷ HR_rest) | Cooper VO2 = (Distance_m - 504.9) / 44.73';
  }
  // 2. Heart Rate Reserve Karvonen (`heart-rate-reserve`)
  else if (id === 'heart-rate-reserve') {
    const targetHr = Math.round(numRhr + (hrr * (numIntensity / 100)));
    const zone2Low = Math.round(numRhr + (hrr * 0.60));
    const zone2High = Math.round(numRhr + (hrr * 0.70));
    const zone4Low = Math.round(numRhr + (hrr * 0.80));
    const zone4High = Math.round(numRhr + (hrr * 0.90));

    primaryLabel = `Target Heart Rate (${numIntensity}% Karvonen)`;
    primaryValue = `${targetHr} bpm`;

    secondaryMetrics = [
      { label: 'Heart Rate Reserve (HRR)', value: `${hrr} bpm` },
      { label: 'Zone 2 (Aerobic Base / Fat Burn 60-70%)', value: `${zone2Low} – ${zone2High} bpm` },
      { label: 'Zone 3 (Aerobic Tempo 70-80%)', value: `${zone2High + 1} – ${zone4Low - 1} bpm` },
      { label: 'Zone 4 (Threshold / Performance 80-90%)', value: `${zone4Low} – ${zone4High} bpm` },
    ];
    formulaText = 'Target HR = HR_rest + [(HR_max - HR_rest) × Target_Intensity%]';
  }
  // 3. Maximum Heart Rate (`maximum-heart-rate`)
  else if (id === 'maximum-heart-rate') {
    // Gellish formula: 207 - (0.7 × Age), Gulati (women): 206 - (0.88 × Age)
    const gulatiMaxHr = Math.round(206 - (0.88 * numAge));

    primaryLabel = 'Max Heart Rate (Tanaka Model)';
    primaryValue = `${tanakaMaxHr} bpm`;

    secondaryMetrics = [
      { label: 'Tanaka Formula [208 - 0.7×Age]', value: `${tanakaMaxHr} bpm (Most reliable general population)` },
      { label: 'Fox Formula [220 - Age]', value: `${foxMaxHr} bpm (Classic baseline)` },
      { label: 'Gulati Female-Specific Model', value: `${gulatiMaxHr} bpm` },
      { label: 'Aerobic Zone 2 Ceiling (70%)', value: `${Math.round(tanakaMaxHr * 0.7)} bpm` },
    ];
    formulaText = 'HR_max (Tanaka) = 208 - (0.7 × Age) | HR_max (Fox) = 220 - Age';
  }
  // 4. Blood Pressure Category (`blood-pressure-cat`)
  else if (id === 'blood-pressure-cat') {
    let category = 'Normal';
    let badgeColor = 'text-emerald-600 dark:text-emerald-400';

    if (numSys > 180 || numDia > 120) {
      category = 'Hypertensive Crisis (Seek Immediate Medical Care)';
      badgeColor = 'text-red-600 dark:text-red-400';
    } else if (numSys >= 140 || numDia >= 90) {
      category = 'Stage 2 Hypertension';
      badgeColor = 'text-rose-600 dark:text-rose-400';
    } else if ((numSys >= 130 && numSys <= 139) || (numDia >= 80 && numDia <= 89)) {
      category = 'Stage 1 Hypertension';
      badgeColor = 'text-amber-600 dark:text-amber-400';
    } else if (numSys >= 120 && numSys <= 129 && numDia < 80) {
      category = 'Elevated Blood Pressure';
      badgeColor = 'text-yellow-600 dark:text-yellow-400';
    }

    const pulsePressure = numSys - numDia;

    primaryLabel = 'AHA/ACC Blood Pressure Category';
    primaryValue = category;

    secondaryMetrics = [
      { label: 'Systolic Reading (SBP)', value: `${numSys} mmHg` },
      { label: 'Diastolic Reading (DBP)', value: `${numDia} mmHg` },
      { label: 'Pulse Pressure (SBP - DBP)', value: `${pulsePressure} mmHg (Normal: 40-60 mmHg)` },
      { label: 'AHA 2017 Guidelines Standard', value: 'Normal: SBP < 120 and DBP < 80' },
    ];
    formulaText = 'Classification based on AHA/ACC 2017 Clinical Practice Guidelines';
  }
  // 5. Mean Arterial Pressure (`mean-arterial-pressure`)
  else if (id === 'mean-arterial-pressure') {
    const map = numDia + (1 / 3) * (numSys - numDia);
    const mapAlternative = (2 * numDia + numSys) / 3;

    let perfusionStatus = 'Adequate Tissue Perfusion (Normal: 70–100 mmHg)';
    if (map < 65) perfusionStatus = 'Low Perfusion Warning (< 65 mmHg: Risk of organ hypoperfusion)';
    else if (map > 105) perfusionStatus = 'Elevated MAP (> 105 mmHg: Increased cardiac workload)';

    primaryLabel = 'Mean Arterial Pressure (MAP)';
    primaryValue = `${map.toFixed(1)} mmHg`;

    secondaryMetrics = [
      { label: 'MAP Standard [DBP + 1/3(SBP - DBP)]', value: `${map.toFixed(1)} mmHg` },
      { label: 'Pulse Pressure Component', value: `${numSys - numDia} mmHg` },
      { label: 'Clinical Perfusion Baseline', value: perfusionStatus },
      { label: 'Target Critical Care Range', value: '65 – 100 mmHg' },
    ];
    formulaText = 'MAP = DBP + ⅓(SBP - DBP) = (2 × DBP + SBP) / 3';
  }
  // 6. Resting Heart Rate Fitness Level (`resting-heart-rate-norm`)
  else {
    let rhrRating = 'Normal Healthy Range';
    if (numRhr < 50) rhrRating = 'Excellent / Athlete (Bradycardia in non-athletes)';
    else if (numRhr <= 60) rhrRating = 'Great Cardiorespiratory Fitness';
    else if (numRhr <= 75) rhrRating = 'Good / Average';
    else if (numRhr <= 85) rhrRating = 'Fair';
    else rhrRating = 'Elevated (Resting Tachycardia > 100 bpm)';

    primaryLabel = 'Resting Heart Rate Classification';
    primaryValue = rhrRating;

    secondaryMetrics = [
      { label: 'Measured Resting Heart Rate', value: `${numRhr} bpm` },
      { label: 'Adult Standard Baseline', value: '60 – 100 bpm' },
      { label: 'Athletic Conditioned Baseline', value: '40 – 60 bpm' },
      { label: 'Recommended Measurement Window', value: 'Immediately upon waking before stimulants' },
    ];
    formulaText = 'Categorized per American Heart Association (AHA) adult resting standards';
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
        {/* Dynamic Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(id === 'vo2-max-calculator' || id === 'heart-rate-reserve' || id === 'maximum-heart-rate' || id === 'resting-heart-rate-norm') && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('health_age', 'Age (Years)')}
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                placeholder="30"
              />
            </div>
          )}

          {(id === 'vo2-max-calculator' || id === 'heart-rate-reserve' || id === 'resting-heart-rate-norm') && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('health_rhr', 'Resting Heart Rate (bpm)')}
              </label>
              <input
                type="number"
                value={restingHr}
                onChange={(e) => setRestingHr(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                placeholder="65"
              />
            </div>
          )}

          {id === 'heart-rate-reserve' && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('health_target_intensity', 'Target Training Intensity (%)')}
              </label>
              <input
                type="number"
                value={targetIntensity}
                onChange={(e) => setTargetIntensity(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                placeholder="70"
              />
            </div>
          )}

          {id === 'vo2-max-calculator' && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('health_cooper_meters', 'Cooper 12-Min Distance (Meters)')}
              </label>
              <input
                type="number"
                value={cooperDistanceMeters}
                onChange={(e) => setCooperDistanceMeters(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                placeholder="2400"
              />
            </div>
          )}

          {(id === 'blood-pressure-cat' || id === 'mean-arterial-pressure') && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('health_sys', 'Systolic Pressure (SBP, mmHg)')}
                </label>
                <input
                  type="number"
                  value={systolic}
                  onChange={(e) => setSystolic(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="120"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('health_dia', 'Diastolic Pressure (DBP, mmHg)')}
                </label>
                <input
                  type="number"
                  value={diastolic}
                  onChange={(e) => setDiastolic(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="80"
                />
              </div>
            </>
          )}
        </div>

        {/* Primary Cardiovascular Metric Banner */}
        <div className="p-6 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
              {primaryLabel}
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-rose-600 dark:text-rose-400 mt-1">
              {primaryValue}
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 self-start sm:self-center"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? t('copied', 'Copied!') : t('copy_summary', 'Copy Summary')}
          </button>
        </div>

        {/* Secondary Parameter Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {secondaryMetrics.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.label}</span>
              <span className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Clinical Note & Formula Verification */}
        <div className="p-4 bg-slate-100 dark:bg-slate-800/40 rounded-xl space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
          <div className="font-semibold text-slate-700 dark:text-slate-300">
            Formula: <code className="font-mono text-slate-800 dark:text-slate-200">{formulaText}</code>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 text-amber-500" />
            <span>{clinicalNote}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
