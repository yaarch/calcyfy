import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tool } from '../../types';
import { Copy, Check, DollarSign } from 'lucide-react';

interface SalaryCalculatorProps {
  tool?: Tool;
}

export const SalaryCalculator: React.FC<SalaryCalculatorProps> = () => {
  const { t, addHistory } = useApp();
  const [payType, setPayType] = useState<'hourly' | 'annual'>('annual');
  const [amount, setAmount] = useState<string>('60000');
  const [hoursPerWeek, setHoursPerWeek] = useState<string>('40');
  const [weeksPerYear, setWeeksPerYear] = useState<string>('52');
  const [copied, setCopied] = useState(false);

  const numAmount = parseFloat(amount) || 0;
  const numHours = parseFloat(hoursPerWeek) || 40;
  const numWeeks = parseFloat(weeksPerYear) || 52;

  let annualSalary = 0;
  let hourlyRate = 0;

  if (payType === 'annual') {
    annualSalary = numAmount;
    hourlyRate = numHours * numWeeks > 0 ? annualSalary / (numHours * numWeeks) : 0;
  } else {
    hourlyRate = numAmount;
    annualSalary = hourlyRate * numHours * numWeeks;
  }

  const monthlySalary = annualSalary / 12;
  const biweeklySalary = annualSalary / (numWeeks / 2);
  const weeklySalary = annualSalary / numWeeks;
  const dailySalary = weeklySalary / (numHours / 8 || 5);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 max-w-xs">
        <button
          id="salary-type-annual"
          onClick={() => {
            setPayType('annual');
            if (payType === 'hourly') setAmount('60000');
          }}
          className={`flex-1 py-1.5 px-3 text-xs md:text-sm font-semibold rounded-lg transition-all ${
            payType === 'annual'
              ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {t('salary_annual', 'Annual Salary')}
        </button>
        <button
          id="salary-type-hourly"
          onClick={() => {
            setPayType('hourly');
            if (payType === 'annual') setAmount('30');
          }}
          className={`flex-1 py-1.5 px-3 text-xs md:text-sm font-semibold rounded-lg transition-all ${
            payType === 'hourly'
              ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {t('salary_hourly', 'Hourly Rate')}
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {payType === 'annual' ? t('salary_input_annual', 'Annual Salary Amount') : t('salary_input_hourly', 'Hourly Pay Rate')}
            </label>
            <input
              id="salary-amount-input"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg"
              placeholder={payType === 'annual' ? '60000' : '30'}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('salary_hours_week', 'Hours / Week')}
            </label>
            <input
              id="salary-hours-input"
              type="number"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg"
              placeholder="40"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('salary_weeks_year', 'Weeks / Year')}
            </label>
            <input
              id="salary-weeks-input"
              type="number"
              value={weeksPerYear}
              onChange={(e) => setWeeksPerYear(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg"
              placeholder="52"
            />
          </div>
        </div>

        {/* Results Grid */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                {t('salary_label_hourly', 'Hourly')}
              </span>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                ${hourlyRate.toFixed(2)}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                {t('salary_label_daily', 'Daily')}
              </span>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                ${dailySalary.toFixed(2)}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                {t('salary_label_weekly', 'Weekly')}
              </span>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                ${weeklySalary.toFixed(2)}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                {t('salary_label_monthly', 'Monthly')}
              </span>
              <div className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                ${monthlySalary.toFixed(2)}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                {t('salary_label_annual', 'Annual')}
              </span>
              <div className="text-lg font-extrabold font-mono text-slate-900 dark:text-white mt-1">
                ${annualSalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-200 dark:border-slate-700">
            <button
              id="salary-copy-btn"
              onClick={() => {
                const summary = `Annual: $${annualSalary.toFixed(2)} | Monthly: $${monthlySalary.toFixed(2)} | Hourly: $${hourlyRate.toFixed(2)}`;
                handleCopy(summary);
                addHistory('salary', 'Salary Pay Conversion', summary);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy Pay Breakdown')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
