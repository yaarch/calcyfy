import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Tool } from '../../types';
import { Copy, Check, Calendar, ArrowRightLeft, Clock, Award } from 'lucide-react';

interface DateDiffCalculatorProps {
  tool?: Tool;
}

// Parse 'YYYY-MM-DD' into local date safely without UTC timezone shift
function parseLocalDate(dateStr: string): Date | null {
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

function formatLocalDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const DateDiffCalculator: React.FC<DateDiffCalculatorProps> = () => {
  const { t, addHistory, lang } = useApp();
  const today = useMemo(() => formatLocalDate(new Date()), []);
  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>('2026-12-31');
  const [copied, setCopied] = useState<boolean>(false);
  const [includeEndDay, setIncludeEndDay] = useState<boolean>(false);

  const diffResult = useMemo(() => {
    const d1 = parseLocalDate(startDate);
    const d2 = parseLocalDate(endDate);

    if (!d1 || !d2) return null;

    const isDirect = d1 <= d2;
    const earlier = isDirect ? d1 : d2;
    const later = isDirect ? d2 : d1;

    // Exact calendar difference (Years, Months, Days)
    let years = later.getFullYear() - earlier.getFullYear();
    let months = later.getMonth() - earlier.getMonth();
    let days = later.getDate() - earlier.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(later.getFullYear(), later.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Total milliseconds and stats
    const diffMs = Math.abs(d2.getTime() - d1.getTime());
    let totalDays = Math.floor(diffMs / (1000 * 3600 * 24));
    if (includeEndDay) {
      totalDays += 1;
    }

    const totalWeeks = Math.floor(totalDays / 7);
    const remDaysInWeek = totalDays % 7;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalDays * 86400;
    const decimalYears = (totalDays / 365.2425).toFixed(2);
    const totalMonthsExact = years * 12 + months;

    // Working Business Days calculation
    let businessDays = 0;
    let weekendDays = 0;
    const cur = new Date(earlier);
    const limit = new Date(later);
    if (includeEndDay) {
      limit.setDate(limit.getDate() + 1);
    }
    while (cur < limit) {
      const dayOfWeek = cur.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekendDays++;
      } else {
        businessDays++;
      }
      cur.setDate(cur.getDate() + 1);
    }

    return {
      years,
      months,
      days,
      decimalYears,
      totalMonthsExact,
      totalWeeks,
      remDaysInWeek,
      totalDays,
      businessDays,
      weekendDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      isReversed: !isDirect,
    };
  }, [startDate, endDate, includeEndDay]);

  const handleSwap = () => {
    const temp = startDate;
    setStartDate(endDate);
    setEndDate(temp);
  };

  const handleCopy = () => {
    if (!diffResult) return;
    const summary =
      lang === 'ar'
        ? `الفرق بين التاريخين: ${diffResult.years} سنة و ${diffResult.months} أشهر و ${diffResult.days} يوماً (إجمالي ${diffResult.totalDays.toLocaleString()} يوماً)`
        : `Date Difference: ${diffResult.years} years, ${diffResult.months} months, ${diffResult.days} days (Total ${diffResult.totalDays.toLocaleString()} days)`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    addHistory('date-diff', `${startDate} → ${endDate}`, summary);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        {/* Date Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              {lang === 'ar' ? 'تاريخ البداية (Start Date)' : 'Start Date'}
            </label>
            <input
              id="date-start-input"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              {lang === 'ar' ? 'تاريخ النهاية (End Date)' : 'End Date'}
            </label>
            <input
              id="date-end-input"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          {/* Swap Button */}
          <button
            type="button"
            onClick={handleSwap}
            title={lang === 'ar' ? 'تبديل التاريخين' : 'Swap Dates'}
            className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full border border-slate-200 dark:border-slate-700 shadow-xs transition-all self-center"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Option: Include End Day */}
        <div className="flex items-center gap-2 pt-1">
          <input
            id="include-end-day"
            type="checkbox"
            checked={includeEndDay}
            onChange={(e) => setIncludeEndDay(e.target.checked)}
            className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
          />
          <label htmlFor="include-end-day" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
            {lang === 'ar'
              ? 'تضمين اليوم الأخير في الحساب (+1 يوم)'
              : 'Include end date in calculation (add 1 day)'}
          </label>
        </div>

        {/* Results Presentation */}
        {diffResult && (
          <div className="space-y-6 pt-2">
            {/* Primary Difference Highlight */}
            <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-slate-900 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  {lang === 'ar' ? 'الفرق الزمني الدقيق' : 'Exact Calendar Difference'}
                </span>
                <div className="text-3xl md:text-4xl font-black text-emerald-950 dark:text-emerald-100 font-mono mt-1">
                  {lang === 'ar' ? (
                    <>
                      <span className="text-emerald-700 dark:text-emerald-400">{diffResult.years}</span> سنة و{' '}
                      <span className="text-emerald-700 dark:text-emerald-400">{diffResult.months}</span> أشهر و{' '}
                      <span className="text-emerald-700 dark:text-emerald-400">{diffResult.days}</span> يوماً
                    </>
                  ) : (
                    <>
                      <span className="text-emerald-700 dark:text-emerald-400">{diffResult.years}</span> years,{' '}
                      <span className="text-emerald-700 dark:text-emerald-400">{diffResult.months}</span> months,{' '}
                      <span className="text-emerald-700 dark:text-emerald-400">{diffResult.days}</span> days
                    </>
                  )}
                </div>
                <div className="text-xs text-emerald-700 dark:text-emerald-400/90 mt-1 font-medium font-mono">
                  ≈ {diffResult.decimalYears} {lang === 'ar' ? 'سنة عشرية' : 'decimal years'}
                </div>
              </div>

              <button
                id="date-copy-btn"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all self-start md:self-auto cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? (lang === 'ar' ? 'تم النسخ!' : 'Copied!') : lang === 'ar' ? 'نسخ الفرق' : 'Copy Difference'}
              </button>
            </div>

            {/* Comprehensive Units Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                  {lang === 'ar' ? 'إجمالي الأيام' : 'Total Days'}
                </span>
                <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                  {diffResult.totalDays.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-500">{lang === 'ar' ? 'يوماً' : 'days'}</span>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">
                  {lang === 'ar' ? 'أيام العمل الرسمية' : 'Working Days'}
                </span>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
                  {diffResult.businessDays.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-500">{lang === 'ar' ? 'أيام عمل (الإثنين-الجمعة)' : 'Mon-Fri'}</span>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">
                  {lang === 'ar' ? 'الأسابيع والأيام' : 'Weeks & Days'}
                </span>
                <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                  {diffResult.totalWeeks} <span className="text-xs font-normal text-slate-500">{lang === 'ar' ? 'أسبوع' : 'w'}</span>{' '}
                  {diffResult.remDaysInWeek} <span className="text-xs font-normal text-slate-500">{lang === 'ar' ? 'يوم' : 'd'}</span>
                </div>
                <span className="text-[10px] text-slate-500">{lang === 'ar' ? 'أسابيع تقويمية' : 'calendar weeks'}</span>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">
                  {lang === 'ar' ? 'إجمالي الساعات' : 'Total Hours'}
                </span>
                <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                  {diffResult.totalHours.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-500">{lang === 'ar' ? 'ساعة' : 'hours'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
