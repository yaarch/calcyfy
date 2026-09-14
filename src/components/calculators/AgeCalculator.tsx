import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CalendarDays, Clock, Gift, Copy, Check } from 'lucide-react';

export const AgeCalculator: React.FC = () => {
  const { t, addHistory } = useApp();
  const [birthDateStr, setBirthDateStr] = useState<string>('1998-05-15');
  const [targetDateStr, setTargetDateStr] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [copied, setCopied] = useState(false);

  const calculateAge = () => {
    if (!birthDateStr || !targetDateStr) return null;

    const birthDate = new Date(birthDateStr + 'T00:00:00');
    const targetDate = new Date(targetDateStr + 'T00:00:00');

    if (isNaN(birthDate.getTime()) || isNaN(targetDate.getTime())) return null;
    if (targetDate < birthDate) return { error: 'Target date must be after birth date.' };

    let years = targetDate.getFullYear() - birthDate.getFullYear();
    let months = targetDate.getMonth() - birthDate.getMonth();
    let days = targetDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Total stats
    const diffMs = targetDate.getTime() - birthDate.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalWeeks = Math.floor(totalDays / 7);

    // Next Birthday Countdown
    const currentYear = targetDate.getFullYear();
    let nextBday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
    if (nextBday < targetDate) {
      nextBday = new Date(currentYear + 1, birthDate.getMonth(), birthDate.getDate());
    }
    const daysToNextBday = Math.ceil((nextBday.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24));

    // Day of the week
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const birthDayOfWeek = daysOfWeek[birthDate.getDay()];

    return {
      years,
      months,
      days,
      totalDays,
      totalHours,
      totalMinutes,
      totalWeeks,
      daysToNextBday,
      birthDayOfWeek,
    };
  };

  const res = calculateAge();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Date of Birth
            </label>
            <input
              id="age-birth-date"
              type="date"
              value={birthDateStr}
              onChange={(e) => setBirthDateStr(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Calculate Age As Of
            </label>
            <input
              id="age-target-date"
              type="date"
              value={targetDateStr}
              onChange={(e) => setTargetDateStr(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {res && 'error' in res && (
          <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-700 dark:text-rose-400 text-sm">
            {res.error}
          </div>
        )}

        {res && !('error' in res) && (
          <div className="space-y-6 pt-2">
            {/* Primary Age Card */}
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  Chronological Age
                </span>
                <div className="text-3xl md:text-4xl font-extrabold text-emerald-950 dark:text-emerald-100 font-mono mt-1">
                  {res.years} <span className="text-lg font-normal">years</span>, {res.months}{' '}
                  <span className="text-lg font-normal">months</span>, {res.days}{' '}
                  <span className="text-lg font-normal">days</span>
                </div>
                <div className="text-xs text-emerald-700 dark:text-emerald-400/90 mt-2 font-medium">
                  Born on a {res.birthDayOfWeek}
                </div>
              </div>

              <button
                id="age-copy-btn"
                onClick={() => {
                  handleCopy(`${res.years} years, ${res.months} months, ${res.days} days`);
                  addHistory('age', 'Age Calculation', `${res.years}y ${res.months}m ${res.days}d`);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all self-start md:self-auto"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? t('btn_copied') : t('btn_copy')}
              </button>
            </div>

            {/* Next Birthday & Life Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">
                  <Gift className="w-4 h-4" /> Next Birthday
                </div>
                <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-100">
                  {res.daysToNextBday} <span className="text-xs font-normal">days</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  <CalendarDays className="w-4 h-4" /> Total Days
                </div>
                <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-100">
                  {res.totalDays.toLocaleString()}
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  <Clock className="w-4 h-4" /> Total Hours
                </div>
                <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-100">
                  {res.totalHours.toLocaleString()}
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  <Clock className="w-4 h-4" /> Total Minutes
                </div>
                <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-100">
                  {res.totalMinutes.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
