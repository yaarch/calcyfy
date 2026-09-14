import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Tool, ToolId } from '../../types';
import { Copy, Check, Play, Pause, RotateCcw } from 'lucide-react';
import { UniversalToolEngine } from './UniversalToolEngine';

interface SuiteCalculatorsProps {
  toolId: ToolId;
  tool?: Tool;
}

export const SuiteCalculators: React.FC<SuiteCalculatorsProps> = ({ toolId, tool }) => {
  const { t, addHistory } = useApp();
  const [copied, setCopied] = useState(false);

  // States for various tools
  const [val1, setVal1] = useState<string>('1000');
  const [val2, setVal2] = useState<string>('5');
  const [val3, setVal3] = useState<string>('3');
  const [val4, setVal4] = useState<string>('20');
  const [textInput, setTextInput] = useState<string>('Hello World! CALCYFY Web Platform.');
  const [optionSelect, setOptionSelect] = useState<string>('male');

  // Timer states
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [uuidStr, setUuidStr] = useState<string>('c0f121e0-7e3f-4e1b-9a91-92f7c0019283');
  const [randResult, setRandResult] = useState<number>(42);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const copyResult = (summary: string) => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    addHistory(toolId, 'Calculation Result', summary);
    setTimeout(() => setCopied(false), 2000);
  };

  // Switch renderer by toolId
  switch (toolId) {
    case 'simple-interest': {
      const p = parseFloat(val1) || 0;
      const r = parseFloat(val2) || 0;
      const tY = parseFloat(val3) || 0;
      const interest = (p * r * tY) / 100;
      const total = p + interest;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">{t('si_principal', 'Principal Amount ($)')}</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">{t('si_rate', 'Annual Interest Rate (%)')}</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">{t('si_time', 'Time Period (Years)')}</label>
                <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">{t('si_total_interest', 'Total Interest Earned')}</span>
                <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">${interest.toFixed(2)}</div>
                <div className="text-xs text-slate-500 mt-1">{t('si_total_pay', 'Total Balance')}: ${total.toFixed(2)}</div>
              </div>
              <button onClick={() => copyResult(`Interest: $${interest.toFixed(2)} | Total: $${total.toFixed(2)}`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'auto-loan': {
      const price = parseFloat(val1) || 25000;
      const down = parseFloat(val2) || 5000;
      const rate = (parseFloat(val3) || 5.5) / 100 / 12;
      const months = (parseFloat(val4) || 5) * 12;
      const principal = Math.max(0, price - down);
      
      const monthlyPayment = rate > 0 && months > 0
        ? (principal * (rate * Math.pow(1 + rate, months))) / (Math.pow(1 + rate, months) - 1)
        : principal / (months || 1);

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">{t('auto_price', 'Vehicle Price ($)')}</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">{t('auto_down', 'Down Payment ($)')}</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">{t('auto_rate', 'Interest Rate (%)')}</label>
                <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">{t('auto_years', 'Term (Years)')}</label>
                <input type="number" value={val4} onChange={(e) => setVal4(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">{t('auto_monthly', 'Monthly Auto Payment')}</span>
                <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">${monthlyPayment.toFixed(2)} / mo</div>
              </div>
              <button onClick={() => copyResult(`Auto Monthly Payment: $${monthlyPayment.toFixed(2)}`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'savings-goal': {
      const target = parseFloat(val1) || 10000;
      const current = parseFloat(val2) || 2000;
      const monthlySave = parseFloat(val3) || 500;
      const needed = Math.max(0, target - current);
      const monthsNeeded = monthlySave > 0 ? Math.ceil(needed / monthlySave) : 0;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">{t('save_target', 'Savings Target ($)')}</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">{t('save_current', 'Current Savings ($)')}</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">{t('save_monthly', 'Monthly Contribution ($)')}</label>
                <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">{t('save_time_needed', 'Estimated Time to Goal')}</span>
                <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{monthsNeeded} Months ({(monthsNeeded / 12).toFixed(1)} Yrs)</div>
              </div>
              <button onClick={() => copyResult(`Time to Savings Goal: ${monthsNeeded} Months`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'markup': {
      const cost = parseFloat(val1) || 50;
      const selling = parseFloat(val2) || 80;
      const profit = selling - cost;
      const margin = selling > 0 ? (profit / selling) * 100 : 0;
      const markupVal = cost > 0 ? (profit / cost) * 100 : 0;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">{t('mk_cost', 'Cost Price ($)')}</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">{t('mk_selling', 'Selling Price ($)')}</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl grid grid-cols-3 gap-2 text-center">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase">{t('mk_profit', 'Gross Profit')}</span>
                <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">${profit.toFixed(2)}</div>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase">{t('mk_margin', 'Profit Margin')}</span>
                <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">{margin.toFixed(2)}%</div>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase">{t('mk_markup_pct', 'Markup Percentage')}</span>
                <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">{markupVal.toFixed(2)}%</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'ideal-weight': {
      const hCm = parseFloat(val1) || 175;
      const hInches = hCm / 2.54;
      const inchesOver5Ft = Math.max(0, hInches - 60);
      
      // Devine Formula
      const devine = optionSelect === 'male' ? 50 + 2.3 * inchesOver5Ft : 45.5 + 2.3 * inchesOver5Ft;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex gap-2">
              <button onClick={() => setOptionSelect('male')} className={`px-4 py-2 text-xs font-bold rounded-xl ${optionSelect === 'male' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>{t('bf_male', 'Male')}</button>
              <button onClick={() => setOptionSelect('female')} className={`px-4 py-2 text-xs font-bold rounded-xl ${optionSelect === 'female' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>{t('bf_female', 'Female')}</button>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">{t('iw_height', 'Height (cm)')}</label>
              <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">{t('iw_ideal', 'Ideal Weight (Devine Formula)')}</span>
                <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{devine.toFixed(1)} kg ({(devine * 2.20462).toFixed(1)} lbs)</div>
              </div>
              <button onClick={() => copyResult(`Ideal Weight: ${devine.toFixed(1)} kg`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'water-intake': {
      const weightKg = parseFloat(val1) || 70;
      const activityMins = parseFloat(val2) || 30;
      const baseWaterL = (weightKg * 0.033) + (activityMins / 30) * 0.35;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">{t('wi_weight', 'Body Weight (kg)')}</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">{t('wi_activity', 'Daily Exercise (Minutes)')}</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">{t('wi_rec', 'Recommended Daily Water Intake')}</span>
                <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">💧 {baseWaterL.toFixed(2)} Liters / day</div>
                <div className="text-xs text-slate-500 mt-1">~{Math.round(baseWaterL * 4)} Glasses (250ml)</div>
              </div>
              <button onClick={() => copyResult(`Water Intake: ${baseWaterL.toFixed(2)} L`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'target-heart-rate': {
      const ageNum = parseFloat(val1) || 25;
      const maxHr = 220 - ageNum;
      const fatBurnMin = Math.round(maxHr * 0.6);
      const fatBurnMax = Math.round(maxHr * 0.7);
      const cardioMin = Math.round(maxHr * 0.7);
      const cardioMax = Math.round(maxHr * 0.85);

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">{t('hr_age', 'Your Age (Years)')}</label>
              <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-xs font-semibold uppercase text-slate-500">{t('hr_max', 'Max Heart Rate')}</span>
                <div className="text-2xl font-black font-mono text-rose-500 mt-1">{maxHr} BPM</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-xs font-semibold uppercase text-slate-500">{t('hr_fat_burn', 'Fat Burn Zone (60-70%)')}</span>
                <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">{fatBurnMin} - {fatBurnMax} BPM</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-xs font-semibold uppercase text-slate-500">{t('hr_cardio', 'Cardio / Aerobic (70-85%)')}</span>
                <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">{cardioMin} - {cardioMax} BPM</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'bmr': {
      const wKg = parseFloat(val1) || 75;
      const hCm = parseFloat(val2) || 178;
      const ageYears = parseFloat(val3) || 30;
      
      // Mifflin-St Jeor Equation
      const bmrVal = optionSelect === 'male'
        ? (10 * wKg) + (6.25 * hCm) - (5 * ageYears) + 5
        : (10 * wKg) + (6.25 * hCm) - (5 * ageYears) - 161;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex gap-2">
              <button onClick={() => setOptionSelect('male')} className={`px-4 py-2 text-xs font-bold rounded-xl ${optionSelect === 'male' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>{t('bf_male', 'Male')}</button>
              <button onClick={() => setOptionSelect('female')} className={`px-4 py-2 text-xs font-bold rounded-xl ${optionSelect === 'female' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>{t('bf_female', 'Female')}</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">{t('wi_weight', 'Weight (kg)')}</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">{t('iw_height', 'Height (cm)')}</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">{t('hr_age', 'Age (Years)')}</label>
                <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">{t('bmr_result', 'Basal Metabolic Rate (BMR)')}</span>
                <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{Math.round(bmrVal)} kcal / day</div>
              </div>
              <button onClick={() => copyResult(`BMR: ${Math.round(bmrVal)} kcal`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'fraction': {
      const num1 = parseFloat(val1) || 3;
      const den1 = parseFloat(val2) || 4;
      const num2 = parseFloat(val3) || 1;
      const den2 = parseFloat(val4) || 2;

      // Add fractions: (a/b) + (c/d) = (a*d + b*c) / (b*d)
      const resNum = (num1 * den2) + (num2 * den1);
      const resDen = den1 * den2;
      const decimalVal = resDen > 0 ? resNum / resDen : 0;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Numerator 1</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Denominator 1</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Numerator 2</label>
                <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Denominator 2</label>
                <input type="number" value={val4} onChange={(e) => setVal4(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Sum Fraction Result</span>
                <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{resNum}/{resDen} = {decimalVal.toFixed(3)}</div>
              </div>
              <button onClick={() => copyResult(`${resNum}/${resDen} (${decimalVal.toFixed(3)})`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'ratio': {
      const a = parseFloat(val1) || 16;
      const b = parseFloat(val2) || 9;
      const c = parseFloat(val3) || 1920;
      // Ratio A : B = C : D => D = (B * C) / A
      const d = a > 0 ? (b * c) / a : 0;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Ratio A</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Ratio B</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Value C</label>
                <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Calculated Value D</span>
                <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">D = {d.toFixed(2)}</div>
              </div>
              <button onClick={() => copyResult(`D = ${d.toFixed(2)}`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'area-perimeter': {
      const length = parseFloat(val1) || 12;
      const width = parseFloat(val2) || 8;
      const area = length * width;
      const perimeter = 2 * (length + width);

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Length (m)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Width (m)</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl grid grid-cols-2 gap-4 text-center">
              <div>
                <span className="text-xs font-semibold uppercase text-emerald-600">Area</span>
                <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{area.toFixed(2)} m²</div>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-slate-500">Perimeter</span>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">{perimeter.toFixed(2)} m</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'volume': {
      const l = parseFloat(val1) || 5;
      const w = parseFloat(val2) || 4;
      const h = parseFloat(val3) || 3;
      const vol = l * w * h;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Length (cm)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Width (cm)</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Height (cm)</label>
                <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Calculated 3D Volume</span>
                <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{vol.toFixed(2)} cm³</div>
              </div>
              <button onClick={() => copyResult(`Volume: ${vol.toFixed(2)} cm³`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'random-number': {
      const min = parseInt(val1) || 1;
      const max = parseInt(val2) || 100;

      const generateNew = () => {
        setRandResult(Math.floor(Math.random() * (max - min + 1)) + min);
      };

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Minimum Value</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Maximum Value</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center space-y-4">
              <div className="text-5xl font-black font-mono text-emerald-600 dark:text-emerald-400">{randResult}</div>
              <button onClick={generateNew} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-all">
                🎲 Generate Random Number
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'prime-checker': {
      const num = parseInt(val1) || 29;
      const isPrime = (n: number) => {
        if (n <= 1) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
          if (n % i === 0) return false;
        }
        return true;
      };
      const result = isPrime(num);

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Enter Integer</label>
              <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center">
              <span className="text-xs font-semibold uppercase text-slate-500">Prime Status</span>
              <div className={`text-2xl font-black mt-1 ${result ? 'text-emerald-600' : 'text-rose-500'}`}>
                {result ? `✅ ${num} is a PRIME Number!` : `❌ ${num} is NOT a Prime Number`}
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'pythagoras': {
      const a = parseFloat(val1) || 3;
      const b = parseFloat(val2) || 4;
      const c = Math.sqrt(a * a + b * b);

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Side A</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Side B</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Hypotenuse C (c = √(a² + b²))</span>
                <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">C = {c.toFixed(2)}</div>
              </div>
              <button onClick={() => copyResult(`C = ${c.toFixed(2)}`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'binary-hex': {
      const dec = parseInt(val1) || 255;
      const bin = dec.toString(2);
      const hex = dec.toString(16).toUpperCase();

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Decimal Number</label>
              <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-xs font-semibold uppercase text-slate-500">Binary (Base 2)</span>
                <div className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">{bin}</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-xs font-semibold uppercase text-slate-500">Hexadecimal (Base 16)</span>
                <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">0x{hex}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'temperature': {
      const c = parseFloat(val1) || 25;
      const f = (c * 9) / 5 + 32;
      const k = c + 273.15;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Celsius (°C)</label>
              <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-xs font-semibold uppercase text-slate-500">Fahrenheit (°F)</span>
                <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{f.toFixed(1)} °F</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-xs font-semibold uppercase text-slate-500">Kelvin (K)</span>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">{k.toFixed(2)} K</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'speed-distance': {
      const dKm = parseFloat(val1) || 120;
      const tHrs = parseFloat(val2) || 1.5;
      const speedKmh = tHrs > 0 ? dKm / tHrs : 0;
      const speedMph = speedKmh * 0.621371;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Distance (km)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Travel Time (Hours)</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Average Speed</span>
                <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{speedKmh.toFixed(1)} km/h ({speedMph.toFixed(1)} mph)</div>
              </div>
              <button onClick={() => copyResult(`${speedKmh.toFixed(1)} km/h`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'data-size': {
      const gb = parseFloat(val1) || 16;
      const mb = gb * 1024;
      const kb = mb * 1024;
      const tb = gb / 1024;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Gigabytes (GB)</label>
              <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-xs font-semibold uppercase text-slate-500">Megabytes (MB)</span>
                <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">{mb.toLocaleString()} MB</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-xs font-semibold uppercase text-slate-500">Kilobytes (KB)</span>
                <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">{kb.toLocaleString()} KB</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-xs font-semibold uppercase text-slate-500">Terabytes (TB)</span>
                <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">{tb.toFixed(3)} TB</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'chronometer-timer': {
      const hrs = Math.floor(timerSeconds / 3600);
      const mins = Math.floor((timerSeconds % 3600) / 60);
      const secs = timerSeconds % 60;
      const timeFormatted = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-6">
            <div className="text-6xl font-black font-mono text-emerald-600 dark:text-emerald-400">{timeFormatted}</div>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`px-6 py-2.5 rounded-xl font-bold text-white flex items-center gap-2 ${isTimerRunning ? 'bg-amber-600' : 'bg-emerald-600'}`}
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isTimerRunning ? 'Pause' : 'Start Timer'}
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(0);
                }}
                className="px-6 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'work-shift-hours': {
      const startTime = val1 || '09:00';
      const endTime = val2 || '17:00';
      const breakMins = parseFloat(val3) || 30;

      const [sH, sM] = startTime.split(':').map(Number);
      const [eH, eM] = endTime.split(':').map(Number);

      let totalMins = (eH * 60 + eM) - (sH * 60 + sM);
      if (totalMins < 0) totalMins += 24 * 60;
      const netMins = Math.max(0, totalMins - breakMins);
      const netHours = netMins / 60;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Shift Start</label>
                <input type="time" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Shift End</label>
                <input type="time" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Break Duration (Minutes)</label>
                <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Net Worked Hours</span>
                <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{netHours.toFixed(2)} Hours</div>
              </div>
              <button onClick={() => copyResult(`Worked Hours: ${netHours.toFixed(2)} Hrs`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'case-converter': {
      const upper = textInput.toUpperCase();
      const lower = textInput.toLowerCase();
      const title = textInput.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase());

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm"
              placeholder="Enter text..."
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button onClick={() => setTextInput(upper)} className="p-3 bg-slate-100 dark:bg-slate-800 font-bold text-xs rounded-xl">UPPERCASE</button>
              <button onClick={() => setTextInput(lower)} className="p-3 bg-slate-100 dark:bg-slate-800 font-bold text-xs rounded-xl">lowercase</button>
              <button onClick={() => setTextInput(title)} className="p-3 bg-slate-100 dark:bg-slate-800 font-bold text-xs rounded-xl">Title Case</button>
            </div>
          </div>
        </div>
      );
    }

    case 'json-formatter': {
      let formatted = '';
      let isValid = true;
      try {
        formatted = JSON.stringify(JSON.parse(textInput), null, 2);
      } catch (e) {
        isValid = false;
        formatted = 'Invalid JSON input';
      }

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full h-36 p-4 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-xs"
              placeholder='{"key": "value"}'
            />
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Formatted Output:</span>
                <span className={isValid ? 'text-emerald-600' : 'text-rose-500'}>{isValid ? '✅ Valid JSON' : '❌ Invalid JSON'}</span>
              </div>
              <pre className="p-3 bg-white dark:bg-slate-900 border rounded-xl text-xs font-mono overflow-auto max-h-48">{formatted}</pre>
            </div>
          </div>
        </div>
      );
    }

    case 'base64-encode': {
      let encoded = '';
      try {
        encoded = btoa(textInput);
      } catch (e) {
        encoded = 'Error encoding Base64';
      }

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full h-28 p-4 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm"
            />
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <span className="text-xs font-semibold uppercase text-slate-500">Base64 Output</span>
              <div className="text-sm font-mono font-bold break-all mt-1">{encoded}</div>
            </div>
          </div>
        </div>
      );
    }

    case 'url-encoder': {
      let encodedUrl = '';
      try {
        encodedUrl = encodeURIComponent(textInput);
      } catch (e) {
        encodedUrl = 'Error encoding URL';
      }

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full h-28 p-4 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm"
            />
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <span className="text-xs font-semibold uppercase text-slate-500">Encoded URL Component</span>
              <div className="text-sm font-mono font-bold break-all mt-1">{encodedUrl}</div>
            </div>
          </div>
        </div>
      );
    }

    case 'net-worth': {
      const assets = parseFloat(val1) || 250000;
      const debts = parseFloat(val2) || 80000;
      const netWorth = assets - debts;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Total Assets ($)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Total Liabilities & Debts ($)</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Calculated Net Worth</span>
                <div className={`text-3xl font-black font-mono mt-1 ${netWorth >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>${netWorth.toLocaleString()}</div>
              </div>
              <button onClick={() => copyResult(`Net Worth: $${netWorth.toLocaleString()}`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'debt-payoff': {
      const balance = parseFloat(val1) || 15000;
      const ratePct = parseFloat(val2) || 18;
      const minPayment = parseFloat(val3) || 400;
      const monthlyRate = ratePct / 100 / 12;
      let months = 0;
      let curr = balance;

      if (monthlyRate * curr < minPayment) {
        while (curr > 0 && months < 360) {
          curr += curr * monthlyRate - minPayment;
          months++;
        }
      }

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Total Debt Balance ($)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Interest Rate APR (%)</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Monthly Payment ($)</label>
                <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Estimated Debt Payoff Timeline</span>
                <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{months > 0 ? `${months} Months (${(months / 12).toFixed(1)} Yrs)` : 'Increase monthly payment above interest!'}</div>
              </div>
              <button onClick={() => copyResult(`Payoff Time: ${months} Months`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'break-even': {
      const fixedCosts = parseFloat(val1) || 20000;
      const unitPrice = parseFloat(val2) || 50;
      const unitCost = parseFloat(val3) || 20;
      const marginPerUnit = unitPrice - unitCost;
      const unitsNeeded = marginPerUnit > 0 ? Math.ceil(fixedCosts / marginPerUnit) : 0;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Fixed Operating Costs ($)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Price per Unit ($)</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Variable Cost per Unit ($)</label>
                <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Break-Even Sales Units</span>
                <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{unitsNeeded.toLocaleString()} Units (${(unitsNeeded * unitPrice).toLocaleString()} Revenue)</div>
              </div>
              <button onClick={() => copyResult(`Break-Even: ${unitsNeeded} Units`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'compound-monthly': {
      const initial = parseFloat(val1) || 5000;
      const monthlyAdd = parseFloat(val2) || 300;
      const rateAnnual = (parseFloat(val3) || 7) / 100;
      const yearsVal = parseFloat(val4) || 10;
      const monthsTotal = yearsVal * 12;
      const monthlyRate = rateAnnual / 12;

      let balance = initial;
      for (let i = 0; i < monthsTotal; i++) {
        balance = (balance + monthlyAdd) * (1 + monthlyRate);
      }

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Initial Principal ($)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Monthly Deposit ($)</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Annual Return (%)</label>
                <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Time (Years)</label>
                <input type="number" value={val4} onChange={(e) => setVal4(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Future Portfolio Value</span>
                <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">${balance.toFixed(2)}</div>
              </div>
              <button onClick={() => copyResult(`Portfolio Value: $${balance.toFixed(2)}`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'dividend-yield': {
      const sharePrice = parseFloat(val1) || 120;
      const annualDivPerShare = parseFloat(val2) || 4.8;
      const sharesCount = parseFloat(val3) || 100;
      const divYield = sharePrice > 0 ? (annualDivPerShare / sharePrice) * 100 : 0;
      const totalAnnualPayout = annualDivPerShare * sharesCount;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Stock Price ($)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Annual Dividend / Share ($)</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Number of Shares</label>
                <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl grid grid-cols-2 gap-4 text-center">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Dividend Yield</span>
                <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{divYield.toFixed(2)}%</div>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase">Annual Passive Income</span>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">${totalAnnualPayout.toFixed(2)} / yr</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'inflation-impact': {
      const initialAmt = parseFloat(val1) || 10000;
      const inflationRate = (parseFloat(val2) || 3.5) / 100;
      const yearsIn = parseFloat(val3) || 10;
      const futurePurchasingPower = initialAmt / Math.pow(1 + inflationRate, yearsIn);

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Current Cash Amount ($)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Inflation Rate (%)</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Years into Future</label>
                <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Future Equivalent Purchasing Power</span>
                <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">${futurePurchasingPower.toFixed(2)}</div>
              </div>
              <button onClick={() => copyResult(`Purchasing Power: $${futurePurchasingPower.toFixed(2)}`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'freelance-rate': {
      const targetIncome = parseFloat(val1) || 60000;
      const annualExpenses = parseFloat(val2) || 12000;
      const billableHoursPerWeek = parseFloat(val3) || 25;
      const weeksPerYear = 48;
      const totalHours = billableHoursPerWeek * weeksPerYear;
      const minHourlyRate = totalHours > 0 ? (targetIncome + annualExpenses) / totalHours : 0;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Target Annual Salary ($)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Business Overhead/Expenses ($)</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Billable Hours / Week</label>
                <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Target Freelance Hourly Rate</span>
                <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">${minHourlyRate.toFixed(2)} / hr</div>
              </div>
              <button onClick={() => copyResult(`Hourly Rate: $${minHourlyRate.toFixed(2)}/hr`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'rental-yield': {
      const propValue = parseFloat(val1) || 350000;
      const monthlyRent = parseFloat(val2) || 2200;
      const annualExpenses = parseFloat(val3) || 4500;
      const grossYield = propValue > 0 ? ((monthlyRent * 12) / propValue) * 100 : 0;
      const netYield = propValue > 0 ? (((monthlyRent * 12) - annualExpenses) / propValue) * 100 : 0;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Property Purchase Price ($)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Monthly Rent Income ($)</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Annual Maintenance/Taxes ($)</label>
                <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl grid grid-cols-2 gap-4 text-center">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Gross Rental Yield</span>
                <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{grossYield.toFixed(2)}%</div>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase">Net Rental Yield</span>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">{netYield.toFixed(2)}%</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'vat-tax': {
      const amount = parseFloat(val1) || 100;
      const vatRate = parseFloat(val2) || 15;
      const vatAmount = (amount * vatRate) / 100;
      const totalWithVat = amount + vatAmount;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Net Amount ($)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">VAT / Sales Tax Rate (%)</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl grid grid-cols-2 gap-4 text-center">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase">VAT Tax Amount</span>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">${vatAmount.toFixed(2)}</div>
              </div>
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Gross Total (Incl. VAT)</span>
                <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">${totalWithVat.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'tip-split': {
      const bill = parseFloat(val1) || 120;
      const tipPct = parseFloat(val2) || 18;
      const people = parseInt(val3) || 4;
      const totalTip = (bill * tipPct) / 100;
      const grandTotal = bill + totalTip;
      const perPerson = people > 0 ? grandTotal / people : grandTotal;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Bill Amount ($)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Tip Percentage (%)</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Split Between (People)</label>
                <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Amount Payable Per Person</span>
                <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">${perPerson.toFixed(2)} / person</div>
                <div className="text-xs text-slate-500 mt-1">Total Bill with Tip: ${grandTotal.toFixed(2)}</div>
              </div>
              <button onClick={() => copyResult(`Per person: $${perPerson.toFixed(2)}`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'calorie-deficit': {
      const maintenance = parseFloat(val1) || 2200;
      const deficitGoal = parseFloat(val2) || 500;
      const targetDailyCal = Math.max(1000, maintenance - deficitGoal);
      const weeklyWeightLossKg = (deficitGoal * 7) / 7700;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Maintenance Calories (kcal)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Target Calorie Deficit (kcal)</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl grid grid-cols-2 gap-4 text-center">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Target Intake</span>
                <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{Math.round(targetDailyCal)} kcal/day</div>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase">Est. Fat Loss</span>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">~{weeklyWeightLossKg.toFixed(2)} kg / week</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'macro-split': {
      const totalCalories = parseFloat(val1) || 2000;
      const proteinGrams = (totalCalories * 0.3) / 4;
      const carbGrams = (totalCalories * 0.4) / 4;
      const fatGrams = (totalCalories * 0.3) / 9;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Daily Calorie Target (kcal)</label>
              <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-xs font-semibold uppercase text-emerald-600">Protein (30%)</span>
                <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{Math.round(proteinGrams)}g</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-xs font-semibold uppercase text-slate-500">Carbs (40%)</span>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">{Math.round(carbGrams)}g</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-xs font-semibold uppercase text-slate-500">Fats (30%)</span>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">{Math.round(fatGrams)}g</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'one-rep-max': {
      const weightLifted = parseFloat(val1) || 100;
      const repsDone = parseFloat(val2) || 5;
      // Epley Formula: 1RM = w * (1 + r/30)
      const oneRm = weightLifted * (1 + repsDone / 30);

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Weight Lifted (kg / lbs)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Repetitions Completed</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Estimated 1-Rep Max (1RM)</span>
                <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{Math.round(oneRm)} kg / lbs</div>
              </div>
              <button onClick={() => copyResult(`1RM: ${Math.round(oneRm)}`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'pace-runner': {
      const distKm = parseFloat(val1) || 10;
      const durationMins = parseFloat(val2) || 50;
      const pacePerKm = distKm > 0 ? durationMins / distKm : 0;
      const paceMin = Math.floor(pacePerKm);
      const paceSec = Math.round((pacePerKm - paceMin) * 60);

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Distance (km)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Total Time (Minutes)</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Average Running Pace</span>
                <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{paceMin}:{String(paceSec).padStart(2, '0')} / km</div>
              </div>
              <button onClick={() => copyResult(`Pace: ${paceMin}:${String(paceSec).padStart(2, '0')}/km`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'percentage-change': {
      const orig = parseFloat(val1) || 80;
      const finalVal = parseFloat(val2) || 100;
      const diff = finalVal - orig;
      const pctChange = orig !== 0 ? (diff / orig) * 100 : 0;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Original Value</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">New / Final Value</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Percentage Change</span>
                <div className={`text-3xl font-black font-mono mt-1 ${pctChange >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
                  {pctChange >= 0 ? `+${pctChange.toFixed(2)}%` : `${pctChange.toFixed(2)}%`}
                </div>
              </div>
              <button onClick={() => copyResult(`Change: ${pctChange.toFixed(2)}%`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'quadratic-solver': {
      const a = parseFloat(val1) || 1;
      const b = parseFloat(val2) || -5;
      const c = parseFloat(val3) || 6;
      const discriminant = b * b - 4 * a * c;

      let root1 = '';
      let root2 = '';
      if (discriminant >= 0) {
        root1 = ((-b + Math.sqrt(discriminant)) / (2 * a)).toFixed(2);
        root2 = ((-b - Math.sqrt(discriminant)) / (2 * a)).toFixed(2);
      } else {
        root1 = 'Complex Root';
        root2 = 'Complex Root';
      }

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Coefficient A (x²)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Coefficient B (x)</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Constant C</label>
                <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl grid grid-cols-2 gap-4 text-center">
              <div>
                <span className="text-xs font-semibold uppercase text-emerald-600">Root X₁</span>
                <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{root1}</div>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-slate-500">Root X₂</span>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">{root2}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'px-rem': {
      const px = parseFloat(val1) || 16;
      const basePx = parseFloat(val2) || 16;
      const rem = px / basePx;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Pixels (px)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Base Size (Default 16px)</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">CSS REM Value</span>
                <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{rem.toFixed(4)} rem</div>
              </div>
              <button onClick={() => copyResult(`${rem.toFixed(4)}rem`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'lorem-ipsum': {
      const paragraphs = parseInt(val1) || 2;
      const dummy = Array(paragraphs).fill("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.").join("\n\n");

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Number of Paragraphs</label>
              <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2">
              <span className="text-xs font-semibold uppercase text-slate-500">Generated Dummy Text</span>
              <pre className="p-3 bg-white dark:bg-slate-900 border rounded-xl text-xs font-sans whitespace-pre-wrap max-h-48 overflow-auto">{dummy}</pre>
            </div>
          </div>
        </div>
      );
    }

    case 'slug-generator': {
      const slug = textInput.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full h-24 p-4 bg-slate-50 dark:bg-slate-800 border rounded-xl font-sans text-sm"
            />
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Generated SEO Slug</span>
                <div className="text-lg font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{slug}</div>
              </div>
              <button onClick={() => copyResult(slug)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'uuid-generator': {
      const genUuid = () => {
        setUuidStr(crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        }));
      };

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-center">
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <span className="text-xs font-semibold uppercase text-slate-500">UUID v4 String</span>
              <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">{uuidStr}</div>
            </div>
            <button onClick={genUuid} className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl">
              🔑 Generate New UUID
            </button>
          </div>
        </div>
      );
    }

    case 'ovulation-date': {
      const cycleLen = parseInt(val1) || 28;
      const lastPeriodStr = val2 || '2026-09-01';
      const lastDate = new Date(lastPeriodStr);
      const validDate = isNaN(lastDate.getTime()) ? new Date() : lastDate;
      
      const ovulationDate = new Date(validDate);
      ovulationDate.setDate(ovulationDate.getDate() + (cycleLen - 14));
      
      const fertileStart = new Date(ovulationDate);
      fertileStart.setDate(fertileStart.getDate() - 5);
      
      const fertileEnd = new Date(ovulationDate);
      fertileEnd.setDate(fertileEnd.getDate() + 1);

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">First Day of Last Period</label>
                <input type="date" value={val2 || '2026-09-01'} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Average Cycle Length (Days)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl grid grid-cols-2 gap-4 text-center">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Estimated Ovulation Date</span>
                <div className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{ovulationDate.toLocaleDateString()}</div>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase">Peak Fertile Window</span>
                <div className="text-sm font-bold font-mono text-slate-900 dark:text-white mt-1">{fertileStart.toLocaleDateString()} - {fertileEnd.toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'due-date': {
      const lastPeriodStr = val1 || '2026-09-01';
      const lastDate = new Date(lastPeriodStr);
      const validDate = isNaN(lastDate.getTime()) ? new Date() : lastDate;
      
      // Naegele's rule: +280 days
      const dueDate = new Date(validDate);
      dueDate.setDate(dueDate.getDate() + 280);

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">First Day of Last Menstrual Period</label>
              <input type="date" value={val1 || '2026-09-01'} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Estimated Delivery Due Date</span>
                <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">👶 {dueDate.toLocaleDateString(undefined, { dateStyle: 'full' })}</div>
              </div>
              <button onClick={() => copyResult(`Due Date: ${dueDate.toLocaleDateString()}`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'blood-alcohol': {
      const drinksCount = parseFloat(val1) || 2;
      const weightKg = parseFloat(val2) || 75;
      const hoursSince = parseFloat(val3) || 2;
      
      // Widmark formula: BAC = (A / (r * W)) * 100 - (beta * t)
      const gramsAlcohol = drinksCount * 14;
      const r = optionSelect === 'female' ? 0.55 : 0.68;
      const weightGrams = weightKg * 1000;
      const bac = Math.max(0, ((gramsAlcohol / (weightGrams * r)) * 100) - (0.015 * hoursSince));

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex gap-2 mb-2">
              <button onClick={() => setOptionSelect('male')} className={`px-4 py-2 text-xs font-bold rounded-xl ${optionSelect === 'male' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>Male</button>
              <button onClick={() => setOptionSelect('female')} className={`px-4 py-2 text-xs font-bold rounded-xl ${optionSelect === 'female' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>Female</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Standard Drinks (14g pure alcohol)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Body Weight (kg)</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Hours Since First Drink</label>
                <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Estimated BAC Level</span>
                <div className={`text-3xl font-black font-mono mt-1 ${bac > 0.08 ? 'text-rose-500' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {bac.toFixed(3)}% {bac >= 0.08 ? '(Above Driving Limit)' : '(Below Limit)'}
                </div>
              </div>
              <button onClick={() => copyResult(`BAC: ${bac.toFixed(3)}%`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'sleep-cycle': {
      const bedtimeHour = parseInt(val1) || 23;
      const bedtimeMin = parseInt(val2) || 0;
      
      const getAlarms = (h: number, m: number) => {
        const base = new Date();
        base.setHours(h, m, 0, 0);
        // 90 min cycles: 4 cycles = 6h, 5 cycles = 7.5h, 6 cycles = 9h (+14 min to fall asleep)
        const times = [4, 5, 6].map(cycles => {
          const d = new Date(base.getTime() + (cycles * 90 + 14) * 60 * 1000);
          return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        });
        return times;
      };

      const alarms = getAlarms(bedtimeHour, bedtimeMin);

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Target Bedtime Hour (0-23)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Target Bedtime Minute (0-59)</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2">
              <span className="text-xs font-semibold text-emerald-600 uppercase">Optimal Wake-up Times (90-Min Sleep Cycles)</span>
              <div className="grid grid-cols-3 gap-3 text-center mt-2">
                <div className="p-3 bg-white dark:bg-slate-900 border rounded-xl">
                  <div className="text-xs text-slate-500">4 Cycles (6 hrs)</div>
                  <div className="text-lg font-bold font-mono text-emerald-600 mt-1">{alarms[0]}</div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 border border-emerald-500 rounded-xl">
                  <div className="text-xs text-emerald-600 font-bold">5 Cycles (7.5 hrs) ⭐</div>
                  <div className="text-lg font-bold font-mono text-emerald-600 mt-1">{alarms[1]}</div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 border rounded-xl">
                  <div className="text-xs text-slate-500">6 Cycles (9 hrs)</div>
                  <div className="text-lg font-bold font-mono text-emerald-600 mt-1">{alarms[2]}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'roman-numeral': {
      const num = parseInt(val1) || 2026;
      const toRoman = (n: number) => {
        const lookup: Record<string, number> = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
        let roman = '';
        let i = n;
        for (const key in lookup) {
          while (i >= lookup[key]) {
            roman += key;
            i -= lookup[key];
          }
        }
        return roman || 'N/A';
      };

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Decimal Number</label>
              <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Roman Numeral</span>
                <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{toRoman(num)}</div>
              </div>
              <button onClick={() => copyResult(toRoman(num))} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'color-hex-rgb': {
      const hex = val1.startsWith('#') ? val1 : `#${val1}`;
      let rgbStr = 'rgb(16, 185, 129)';
      if (/^#[0-9A-F]{6}$/i.test(hex)) {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        rgbStr = `rgb(${r}, ${g}, ${b})`;
      }

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">HEX Color Code</label>
              <input type="text" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl border border-slate-200 shadow-inner" style={{ backgroundColor: hex }} />
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">RGB Output</span>
                <div className="text-xl font-black font-mono text-slate-900 dark:text-white mt-1">{rgbStr}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'word-frequency': {
      const words = textInput.trim().split(/\s+/).filter(Boolean);
      const wordCount = words.length;
      const charCount = textInput.length;
      const charNoSpace = textInput.replace(/\s+/g, '').length;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <textarea value={textInput} onChange={(e) => setTextInput(e.target.value)} className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-800 border rounded-xl font-sans text-sm" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-xs text-slate-500">Words</span>
                <div className="text-xl font-bold font-mono text-emerald-600 mt-1">{wordCount}</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-xs text-slate-500">Chars (With spaces)</span>
                <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">{charCount}</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-xs text-slate-500">Chars (No spaces)</span>
                <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">{charNoSpace}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'cron-parser': {
      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Cron Schedule Expression (e.g. */5 * * * *)</label>
              <input type="text" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
              <span className="text-xs font-semibold text-emerald-600 uppercase">Human Explanation</span>
              <div className="text-base font-medium text-slate-900 dark:text-white mt-1">
                {val1 === '*/5 * * * *' ? 'Runs every 5 minutes continuously.' : `Parses standard 5-part cron interval: "${val1}"`}
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'slope-line': {
      const x1 = parseFloat(val1) || 1;
      const y1 = parseFloat(val2) || 2;
      const x2 = parseFloat(val3) || 4;
      const y2 = parseFloat(val4) || 8;
      
      const slope = x2 !== x1 ? (y2 - y1) / (x2 - x1) : NaN;
      const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Point 1 (X₁)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Point 1 (Y₁)</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Point 2 (X₂)</label>
                <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Point 2 (Y₂)</label>
                <input type="number" value={val4} onChange={(e) => setVal4(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl grid grid-cols-2 gap-4 text-center">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Slope (m)</span>
                <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{isNaN(slope) ? 'Undefined' : slope.toFixed(3)}</div>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase">Euclidean Distance</span>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">{distance.toFixed(3)}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'exponent-power': {
      const base = parseFloat(val1) || 2;
      const exp = parseFloat(val2) || 8;
      const powerRes = Math.pow(base, exp);

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Base Number (x)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Exponent (y)</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Exponent Result (xʸ)</span>
                <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{powerRes.toLocaleString()}</div>
              </div>
              <button onClick={() => copyResult(`${base}^${exp} = ${powerRes}`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    case 'logarithm': {
      const x = parseFloat(val1) || 100;
      const log10 = Math.log10(x);
      const ln = Math.log(x);
      const log2 = Math.log2(x);

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Value (x &gt; 0)</label>
              <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-xs text-slate-500">Log₁₀(x)</span>
                <div className="text-lg font-bold font-mono text-emerald-600 mt-1">{log10.toFixed(4)}</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-xs text-slate-500">Natural Ln(x)</span>
                <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">{ln.toFixed(4)}</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-xs text-slate-500">Log₂(x)</span>
                <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">{log2.toFixed(4)}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'factorial': {
      const n = Math.min(100, Math.max(0, parseInt(val1) || 5));
      const calcFactorial = (num: number): bigint => {
        let res = BigInt(1);
        for (let i = 2; i <= num; i++) res *= BigInt(i);
        return res;
      };

      const factVal = calcFactorial(n).toString();

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Non-negative Integer (n)</label>
              <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
              <span className="text-xs font-semibold text-emerald-600 uppercase">Factorial Result ({n}!)</span>
              <div className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1 break-all max-h-36 overflow-auto">{factVal}</div>
            </div>
          </div>
        </div>
      );
    }

    case 'cooking-converter': {
      const cups = parseFloat(val1) || 1;
      const tbsp = cups * 16;
      const tsp = cups * 48;
      const ml = cups * 236.588;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">US Cups</label>
              <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-xs text-slate-500">Tablespoons (Tbsp)</span>
                <div className="text-lg font-bold font-mono text-emerald-600 mt-1">{tbsp.toFixed(1)}</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-xs text-slate-500">Teaspoons (Tsp)</span>
                <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">{tsp.toFixed(1)}</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-xs text-slate-500">Milliliters (mL)</span>
                <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">{ml.toFixed(1)} ml</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'age-dog-cat': {
      const petYears = parseFloat(val1) || 3;
      // Dog: 1st yr = 15, 2nd yr = +9, each add = +5
      const dogHumanAge = petYears <= 1 ? petYears * 15 : petYears <= 2 ? 15 + (petYears - 1) * 9 : 24 + (petYears - 2) * 5;
      // Cat: 1st yr = 15, 2nd yr = +9, each add = +4
      const catHumanAge = petYears <= 1 ? petYears * 15 : petYears <= 2 ? 15 + (petYears - 1) * 9 : 24 + (petYears - 2) * 4;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Pet Age (Years)</label>
              <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-xs font-semibold text-emerald-600 uppercase">🐶 Dog Equivalent</span>
                <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{Math.round(dogHumanAge)} Human Years</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 uppercase">🐱 Cat Equivalent</span>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">{Math.round(catHumanAge)} Human Years</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'electricity-cost': {
      const watts = parseFloat(val1) || 1500;
      const hoursPerDay = parseFloat(val2) || 8;
      const costPerKwh = parseFloat(val3) || 0.15;
      
      const dailyKwh = (watts * hoursPerDay) / 1000;
      const monthlyCost = dailyKwh * 30 * costPerKwh;
      const yearlyCost = dailyKwh * 365 * costPerKwh;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Power Rating (Watts)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Hours Used Per Day</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Electricity Price ($ / kWh)</label>
                <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl grid grid-cols-2 gap-4 text-center">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Estimated Monthly Cost</span>
                <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">${monthlyCost.toFixed(2)}</div>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase">Estimated Yearly Cost</span>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">${yearlyCost.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'roi-calculator': {
      const invCost = parseFloat(val1) || 10000;
      const invReturn = parseFloat(val2) || 13500;
      const netGain = invReturn - invCost;
      const roiPct = invCost > 0 ? (netGain / invCost) * 100 : 0;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Initial Investment Cost ($)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Final Investment Value ($)</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl grid grid-cols-2 gap-4 text-center">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Return on Investment (ROI)</span>
                <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{roiPct.toFixed(2)}%</div>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase">Net Profit / Gain</span>
                <div className={`text-2xl font-black font-mono mt-1 ${netGain >= 0 ? 'text-slate-900 dark:text-white' : 'text-rose-600'}`}>${netGain.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'salary-hourly': {
      const salary = parseFloat(val1) || 60000;
      const hoursPerWeek = parseFloat(val2) || 40;
      const weeksPerYear = 52;
      const totalHours = hoursPerWeek * weeksPerYear;
      const hourlyRate = totalHours > 0 ? salary / totalHours : 0;
      const monthlyRate = salary / 12;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Annual Salary ($)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Hours Per Week</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl grid grid-cols-2 gap-4 text-center">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Equivalent Hourly Rate</span>
                <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">${hourlyRate.toFixed(2)}/hr</div>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase">Monthly Income</span>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">${monthlyRate.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'fuel-consumption': {
      const distance = parseFloat(val1) || 350;
      const lPer100 = parseFloat(val2) || 8.5;
      const gasPrice = parseFloat(val3) || 1.85;

      const litersNeeded = (distance / 100) * lPer100;
      const tripCost = litersNeeded * gasPrice;

      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Trip Distance (Km)</label>
                <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Efficiency (L / 100km)</label>
                <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Fuel Price ($ / L)</label>
                <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-base" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl grid grid-cols-2 gap-4 text-center">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Estimated Gas Cost</span>
                <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">${tripCost.toFixed(2)}</div>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase">Fuel Needed</span>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">{litersNeeded.toFixed(1)} Liters</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    default:
      return <UniversalToolEngine toolId={toolId} tool={tool} />;
  }
};

