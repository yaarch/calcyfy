import React, { useState } from 'react';
import { useApp } from '../../../../context/AppContext';
import { Tool } from '../../../../types';
import { Copy, Check, Activity, ShieldAlert, AlertTriangle } from 'lucide-react';

interface ClinicalMetabolicEngineProps {
  tool: Tool;
}

export const ClinicalMetabolicEngine: React.FC<ClinicalMetabolicEngineProps> = ({ tool }) => {
  const { t, addHistory } = useApp();
  const [copied, setCopied] = useState(false);

  // States for clinical inputs
  const [a1c, setA1c] = useState<string>('6.5');
  const [totalChol, setTotalChol] = useState<string>('200');
  const [hdl, setHdl] = useState<string>('50');
  const [ldl, setLdl] = useState<string>('120');
  const [triglycerides, setTriglycerides] = useState<string>('150');
  const [serumCreatinine, setSerumCreatinine] = useState<string>('1.0');
  const [age, setAge] = useState<string>('50');
  const [weightKg, setWeightKg] = useState<string>('70');
  const [heightCm, setHeightCm] = useState<string>('175');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [doseMgPerKg, setDoseMgPerKg] = useState<string>('15');
  const [ivVolumeMl, setIvVolumeMl] = useState<string>('1000');
  const [ivHours, setIvHours] = useState<string>('8');
  const [dropFactor, setDropFactor] = useState<string>('20');
  const [carbsGrams, setCarbsGrams] = useState<string>('60');
  const [icrRatio, setIcrRatio] = useState<string>('10');
  const [cigsPerDay, setCigsPerDay] = useState<string>('20');
  const [yearsSmoked, setYearsSmoked] = useState<string>('15');
  const [drinksCount, setDrinksCount] = useState<string>('3');

  const id = tool.id;

  const numA1c = Math.max(3, Math.min(20, parseFloat(a1c) || 6.5));
  const numTotalChol = parseFloat(totalChol) || 200;
  const numHdl = Math.max(1, parseFloat(hdl) || 50);
  const numLdl = parseFloat(ldl) || 120;
  const numTrig = parseFloat(triglycerides) || 150;
  const numScr = Math.max(0.1, parseFloat(serumCreatinine) || 1.0);
  const numAge = Math.max(1, Math.min(120, parseFloat(age) || 50));
  const numWeight = Math.max(1, parseFloat(weightKg) || 70);
  const numHeight = Math.max(20, parseFloat(heightCm) || 175);
  const isFemale = gender === 'female';
  const numDosePerKg = parseFloat(doseMgPerKg) || 15;
  const numIvVol = parseFloat(ivVolumeMl) || 1000;
  const numIvHours = Math.max(0.1, parseFloat(ivHours) || 8);
  const numDropFactor = parseFloat(dropFactor) || 20;
  const numCarbs = parseFloat(carbsGrams) || 60;
  const numIcr = Math.max(1, parseFloat(icrRatio) || 10);
  const numCigs = parseFloat(cigsPerDay) || 20;
  const numYearsSmoked = parseFloat(yearsSmoked) || 15;
  const numDrinks = parseFloat(drinksCount) || 3;

  let primaryLabel = 'Clinical Metric';
  let primaryValue = '0';
  let secondaryMetrics: { label: string; value: string }[] = [];
  let formulaText = '';
  let clinicalDisclaimer = 'Estimations are for physiological education and dosage checks. Prescribing and diagnostics must follow certified physician directives.';

  // 1. A1C to Estimated Average Glucose (`blood-sugar-a1c`)
  if (id === 'blood-sugar-a1c') {
    // ADAG Trial Formula: eAG (mg/dL) = 28.7 × A1C - 46.7 | eAG (mmol/L) = 1.59 × A1C - 2.59
    const eagMgDl = 28.7 * numA1c - 46.7;
    const eagMmol = 1.59 * numA1c - 2.59;
    let a1cTier = 'Normal (< 5.7%)';
    if (numA1c >= 6.5) a1cTier = 'Diabetes Range (≥ 6.5% ADA Standard)';
    else if (numA1c >= 5.7) a1cTier = 'Prediabetes Range (5.7% – 6.4%)';

    primaryLabel = 'Estimated Average Glucose (eAG)';
    primaryValue = `${Math.round(eagMgDl)} mg/dL`;
    secondaryMetrics = [
      { label: 'eAG in International Units', value: `${eagMmol.toFixed(1)} mmol/L` },
      { label: 'ADA Diagnostic Category', value: a1cTier },
      { label: 'Target Diabetic Control', value: '< 7.0% (< 154 mg/dL)' },
      { label: 'Glycated Hemoglobin Reference', value: 'Represents ~90-120 day RBC glucose average' },
    ];
    formulaText = 'eAG (mg/dL) = (28.7 × A1C) - 46.7 | eAG (mmol/L) = (1.59 × A1C) - 2.59';
  }
  // 2. Cholesterol Risk Ratio (`cholesterol-ratio`)
  else if (id === 'cholesterol-ratio') {
    const totalToHdl = numTotalChol / numHdl;
    const nonHdl = numTotalChol - numHdl;
    const trigToHdl = numTrig / numHdl;

    let riskLevel = 'Desirable / Low Risk (Total/HDL < 3.5)';
    if (totalToHdl > 5.0) riskLevel = 'High Cardiovascular Risk (Total/HDL > 5.0)';
    else if (totalToHdl > 3.5) riskLevel = 'Moderate / Average Risk (3.5 – 5.0)';

    primaryLabel = 'Total Cholesterol / HDL Ratio';
    primaryValue = `${totalToHdl.toFixed(2)}:1`;
    secondaryMetrics = [
      { label: 'Non-HDL Cholesterol', value: `${nonHdl} mg/dL (Goal < 130 mg/dL)` },
      { label: 'Triglyceride / HDL Ratio', value: `${trigToHdl.toFixed(2)} (Marker of Insulin Sensitivity, Goal < 2.0)` },
      { label: 'Calculated LDL Cholesterol', value: `${numLdl} mg/dL (Goal < 100 mg/dL)` },
      { label: 'Atherogenic Risk Tier', value: riskLevel },
    ];
    formulaText = 'Ratio = Total Cholesterol ÷ HDL | Non-HDL = Total - HDL';
  }
  // 3. Kidney eGFR CKD-EPI 2021 (`kidney-gfr-calculator`)
  else if (id === 'kidney-gfr-calculator') {
    // 2021 CKD-EPI Creatinine (Race-Free): 142 × min(Scr/κ, 1)^α × max(Scr/κ, 1)^(-1.200) × 0.9938^Age × (1.012 if female)
    const kappa = isFemale ? 0.7 : 0.9;
    const alpha = isFemale ? -0.241 : -0.302;
    const femaleMult = isFemale ? 1.012 : 1.0;
    const minVal = Math.min(numScr / kappa, 1);
    const maxVal = Math.max(numScr / kappa, 1);

    const egfr = 142 * Math.pow(minVal, alpha) * Math.pow(maxVal, -1.2) * Math.pow(0.9938, numAge) * femaleMult;

    let ckdStage = 'G1: Normal / High Function (≥ 90)';
    if (egfr < 15) ckdStage = 'G5: Kidney Failure (< 15 mL/min/1.73m²)';
    else if (egfr < 30) ckdStage = 'G4: Severely Decreased (15-29)';
    else if (egfr < 60) ckdStage = 'G3: Moderately Decreased (30-59)';
    else if (egfr < 90) ckdStage = 'G2: Mildly Decreased (60-89)';

    primaryLabel = 'eGFR (CKD-EPI 2021 Race-Free)';
    primaryValue = `${Math.round(egfr)} mL/min/1.73m²`;
    secondaryMetrics = [
      { label: 'KDIGO Chronic Kidney Disease Stage', value: ckdStage },
      { label: 'Serum Creatinine Used', value: `${numScr} mg/dL` },
      { label: 'Standard Normal Baseline', value: '≥ 90 mL/min/1.73m²' },
      { label: 'Equation Standard', value: '2021 CKD-EPI Race-Free Consensus' },
    ];
    formulaText = 'eGFR = 142 × min(Scr/κ, 1)^α × max(Scr/κ, 1)^(-1.2) × 0.9938^Age × (1.012 if F)';
  }
  // 4. Creatinine Clearance Cockcroft-Gault (`creatinine-clearance`)
  else if (id === 'creatinine-clearance') {
    const crcl = ((140 - numAge) * numWeight) / (72 * numScr) * (isFemale ? 0.85 : 1.0);

    primaryLabel = 'Estimated Creatinine Clearance (CrCl)';
    primaryValue = `${crcl.toFixed(1)} mL/min`;
    secondaryMetrics = [
      { label: 'Cockcroft-Gault Formulation', value: `${crcl.toFixed(1)} mL/min` },
      { label: 'Gender Multiplier Applied', value: isFemale ? '0.85 (Female correction)' : '1.00 (Male standard)' },
      { label: 'Renal Drug Dosing Utility', value: 'Standard formula used in FDA drug labeling adjustments' },
      { label: 'Patient Total Body Weight', value: `${numWeight} kg` },
    ];
    formulaText = 'CrCl = [(140 - Age) × Weight(kg)] ÷ [72 × Serum_Cr(mg/dL)] (× 0.85 if female)';
  }
  // 5. Body Surface Area Mosteller (`body-surface-area`)
  else if (id === 'body-surface-area') {
    // Mosteller formula: √[(Height_cm × Weight_kg) / 3600]
    const bsaMosteller = Math.sqrt((numHeight * numWeight) / 3600);
    // DuBois formula: 0.007184 × Height^0.725 × Weight^0.425
    const bsaDuBois = 0.007184 * Math.pow(numHeight, 0.725) * Math.pow(numWeight, 0.425);

    primaryLabel = 'Body Surface Area (Mosteller BSA)';
    primaryValue = `${bsaMosteller.toFixed(2)} m²`;
    secondaryMetrics = [
      { label: 'Mosteller Equation', value: `${bsaMosteller.toFixed(3)} m²` },
      { label: 'DuBois & DuBois Equation', value: `${bsaDuBois.toFixed(3)} m²` },
      { label: 'Adult Average Reference BSA', value: '1.73 m² (General Reference)' },
      { label: 'Clinical Application', value: 'Chemotherapy and index hemodynamic dosing' },
    ];
    formulaText = 'BSA (Mosteller) = √[(Height_cm × Weight_kg) ÷ 3600]';
  }
  // 6. Dosage by Weight (`dosage-by-weight`)
  else if (id === 'dosage-by-weight') {
    const totalDose = numWeight * numDosePerKg;

    primaryLabel = 'Calculated Single Dose';
    primaryValue = `${totalDose.toFixed(1)} mg`;
    secondaryMetrics = [
      { label: 'Prescribed Weight-Based Rate', value: `${numDosePerKg} mg/kg` },
      { label: 'Patient Body Weight', value: `${numWeight} kg (${(numWeight * 2.20462).toFixed(1)} lbs)` },
      { label: 'Daily Dose (if TID / 3x daily)', value: `${(totalDose * 3).toFixed(1)} mg/day` },
      { label: 'Safety Note', value: 'Always verify against max single-dose limits in official drug monograph.' },
    ];
    formulaText = 'Total Dose (mg) = Patient Weight (kg) × Dosage Rate (mg/kg)';
  }
  // 7. IV Drip Rate (`iv-drip-rate`)
  else if (id === 'iv-drip-rate') {
    const totalMinutes = numIvHours * 60;
    const dripRate = (numIvVol * numDropFactor) / totalMinutes;
    const flowRateMlHr = numIvVol / numIvHours;

    primaryLabel = 'Gravity IV Drip Rate';
    primaryValue = `${Math.round(dripRate)} gtt/min (drops/min)`;
    secondaryMetrics = [
      { label: 'Infusion Pump Flow Rate', value: `${flowRateMlHr.toFixed(1)} mL/hr` },
      { label: 'Total Infusion Volume', value: `${numIvVol} mL over ${numIvHours} hours` },
      { label: 'Tubing Drop Factor Used', value: `${numDropFactor} gtt/mL (Macro/Micro tubing)` },
      { label: 'Delivery Speed', value: `${(dripRate / 60).toFixed(2)} drops/second` },
    ];
    formulaText = 'Drip Rate (gtt/min) = [Total Volume (mL) × Drop Factor (gtt/mL)] ÷ Time (minutes)';
  }
  // 8. Fluid Maintenance Holliday-Segar 4-2-1 (`fluid-maintenance`)
  else if (id === 'fluid-maintenance') {
    let hourlyMl = 0;
    if (numWeight <= 10) hourlyMl = numWeight * 4;
    else if (numWeight <= 20) hourlyMl = 40 + (numWeight - 10) * 2;
    else hourlyMl = 60 + (numWeight - 20) * 1;

    const dailyMl = hourlyMl * 24;

    primaryLabel = 'Holliday-Segar Hourly Maintenance Rate';
    primaryValue = `${Math.round(hourlyMl)} mL/hr`;
    secondaryMetrics = [
      { label: 'Total 24-Hour Maintenance Volume', value: `${Math.round(dailyMl)} mL/day` },
      { label: 'First 10 kg (4 mL/kg/hr)', value: `${Math.min(numWeight, 10) * 4} mL/hr` },
      { label: 'Second 10-20 kg (2 mL/kg/hr)', value: `${Math.max(0, Math.min(numWeight - 10, 10)) * 2} mL/hr` },
      { label: 'Weight Above 20 kg (1 mL/kg/hr)', value: `${Math.max(0, numWeight - 20) * 1} mL/hr` },
    ];
    formulaText = '4-2-1 Rule: 4 mL/kg for 0-10kg + 2 mL/kg for 11-20kg + 1 mL/kg for >20kg';
  }
  // 9. Insulin-to-Carb Ratio (`insulin-carb-ratio`)
  else if (id === 'insulin-carb-ratio') {
    const bolusUnits = numCarbs / numIcr;

    primaryLabel = 'Mealtime Bolus Insulin Dose';
    primaryValue = `${bolusUnits.toFixed(1)} Units`;
    secondaryMetrics = [
      { label: 'Total Carbohydrates Consumed', value: `${numCarbs} grams` },
      { label: 'Insulin-to-Carb Ratio (ICR)', value: `1 Unit per ${numIcr}g carbs` },
      { label: 'Rule of 500 Estimate (Total Daily Dose)', value: `TDD ~ ${Math.round(500 / numIcr)} Units/day` },
      { label: 'Clinical Note', value: 'Does not include correction bolus for current hyperglycemia.' },
    ];
    formulaText = 'Mealtime Bolus (Units) = Carbohydrate Grams ÷ ICR';
  }
  // 10. Alcohol Elimination Time (`alcohol-elimination-time`)
  else if (id === 'alcohol-elimination-time') {
    // 1 standard drink ~ 14g pure ethanol. Widmark r: 0.68 male, 0.55 female. Metabolic rate: 0.015 g/dL per hr
    const rFactor = isFemale ? 0.55 : 0.68;
    const bodyWeightGrams = numWeight * 1000;
    const alcoholConsumedGrams = numDrinks * 14;
    const peakBac = (alcoholConsumedGrams / (bodyWeightGrams * rFactor)) * 100;
    const hoursToZero = peakBac / 0.015;

    primaryLabel = 'Estimated Time to 0.00% BAC';
    primaryValue = `${hoursToZero.toFixed(1)} Hours`;
    secondaryMetrics = [
      { label: 'Estimated Peak Blood Alcohol (BAC)', value: `${peakBac.toFixed(3)}% (${(peakBac * 10).toFixed(2)} g/L)` },
      { label: 'Average Metabolic Rate', value: '0.015% BAC reduction per hour' },
      { label: 'Standard Drinks Consumed (14g each)', value: `${numDrinks} drinks` },
      { label: 'Safety Warning', value: 'Metabolic rates vary by stomach fullness, genetics, and liver enzyme activity. Never drive under the influence.' },
    ];
    formulaText = 'Peak BAC = [Alcohol (g) ÷ (Weight(g) × r)] × 100 | Time (hrs) = BAC ÷ 0.015';
  }
  // 11. Smoking Pack-Years (`smoking-pack-years`)
  else {
    const packsPerDay = numCigs / 20;
    const packYears = packsPerDay * numYearsSmoked;

    let risk = 'Low Exposure (< 10 Pack-Years)';
    if (packYears >= 30) risk = 'High Risk (≥ 30 Pack-Years: Qualifies for annual low-dose CT lung cancer screening USPSTF guidelines)';
    else if (packYears >= 20) risk = 'Moderate-High Risk (20 – 29 Pack-Years)';

    primaryLabel = 'Total Cumulative Pack-Years';
    primaryValue = `${packYears.toFixed(1)} Pack-Years`;
    secondaryMetrics = [
      { label: 'Packs Smoked Per Day', value: `${packsPerDay.toFixed(2)} packs/day (${numCigs} cigs)` },
      { label: 'Duration of Smoking History', value: `${numYearsSmoked} years` },
      { label: 'Total Lifetime Cigarettes Smoked', value: `${(numCigs * numYearsSmoked * 365.25).toLocaleString()} cigarettes` },
      { label: 'USPSTF Clinical Screening Tier', value: risk },
    ];
    formulaText = 'Pack-Years = (Cigarettes per Day ÷ 20) × Years Smoked';
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
          {id === 'blood-sugar-a1c' && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('health_a1c', 'Hemoglobin A1c (%)')}
              </label>
              <input
                type="number"
                step="0.1"
                value={a1c}
                onChange={(e) => setA1c(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                placeholder="6.5"
              />
            </div>
          )}

          {id === 'cholesterol-ratio' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('health_total_chol', 'Total Cholesterol (mg/dL)')}
                </label>
                <input
                  type="number"
                  value={totalChol}
                  onChange={(e) => setTotalChol(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('health_hdl', 'HDL Good Cholesterol (mg/dL)')}
                </label>
                <input
                  type="number"
                  value={hdl}
                  onChange={(e) => setHdl(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('health_trig', 'Triglycerides (mg/dL)')}
                </label>
                <input
                  type="number"
                  value={triglycerides}
                  onChange={(e) => setTriglycerides(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="150"
                />
              </div>
            </>
          )}

          {(id === 'kidney-gfr-calculator' || id === 'creatinine-clearance') && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('health_scr', 'Serum Creatinine (mg/dL)')}
                </label>
                <input
                  type="number"
                  step="0.05"
                  value={serumCreatinine}
                  onChange={(e) => setSerumCreatinine(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="1.0"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('health_age', 'Age (Years)')}
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('health_gender', 'Biological Sex')}
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

          {(id === 'creatinine-clearance' || id === 'body-surface-area' || id === 'dosage-by-weight' || id === 'fluid-maintenance' || id === 'alcohol-elimination-time') && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('health_weight_kg', 'Body Weight (kg)')}
              </label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                placeholder="70"
              />
            </div>
          )}

          {id === 'body-surface-area' && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('health_height_cm', 'Height (cm)')}
              </label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                placeholder="175"
              />
            </div>
          )}

          {id === 'dosage-by-weight' && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('health_dose_rate', 'Dose Rate (mg/kg)')}
              </label>
              <input
                type="number"
                step="0.5"
                value={doseMgPerKg}
                onChange={(e) => setDoseMgPerKg(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                placeholder="15"
              />
            </div>
          )}

          {id === 'iv-drip-rate' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('health_iv_vol', 'Total Volume (mL)')}
                </label>
                <input
                  type="number"
                  value={ivVolumeMl}
                  onChange={(e) => setIvVolumeMl(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="1000"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('health_iv_time', 'Infusion Time (Hours)')}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={ivHours}
                  onChange={(e) => setIvHours(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="8"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('health_drop_factor', 'Drop Factor (gtt/mL)')}
                </label>
                <select
                  value={dropFactor}
                  onChange={(e) => setDropFactor(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base"
                >
                  <option value="10">10 gtt/mL (Blood / Macro)</option>
                  <option value="15">15 gtt/mL (Regular Macro)</option>
                  <option value="20">20 gtt/mL (Standard IV)</option>
                  <option value="60">60 gtt/mL (Microdrip)</option>
                </select>
              </div>
            </>
          )}

          {id === 'insulin-carb-ratio' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('health_meal_carbs', 'Meal Carbs (Grams)')}
                </label>
                <input
                  type="number"
                  value={carbsGrams}
                  onChange={(e) => setCarbsGrams(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="60"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('health_icr', 'Insulin-to-Carb Ratio (1 Unit per X grams)')}
                </label>
                <input
                  type="number"
                  value={icrRatio}
                  onChange={(e) => setIcrRatio(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="10"
                />
              </div>
            </>
          )}

          {id === 'alcohol-elimination-time' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('health_drinks', 'Number of Standard Drinks (14g ethanol)')}
                </label>
                <input
                  type="number"
                  value={drinksCount}
                  onChange={(e) => setDrinksCount(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="3"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('health_gender', 'Biological Sex')}
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base"
                >
                  <option value="male">Male (r = 0.68)</option>
                  <option value="female">Female (r = 0.55)</option>
                </select>
              </div>
            </>
          )}

          {id === 'smoking-pack-years' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('health_cigs_day', 'Cigarettes Smoked Per Day')}
                </label>
                <input
                  type="number"
                  value={cigsPerDay}
                  onChange={(e) => setCigsPerDay(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('health_years_smoked', 'Years as a Smoker')}
                </label>
                <input
                  type="number"
                  value={yearsSmoked}
                  onChange={(e) => setYearsSmoked(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="15"
                />
              </div>
            </>
          )}
        </div>

        {/* Primary Metric Card */}
        <div className="p-6 bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
              {primaryLabel}
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-600 dark:text-cyan-400 mt-1">
              {primaryValue}
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 self-start sm:self-center"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? t('copied', 'Copied!') : t('copy_summary', 'Copy Summary')}
          </button>
        </div>

        {/* Secondary Parameters Grid */}
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
            <span>{clinicalDisclaimer}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
