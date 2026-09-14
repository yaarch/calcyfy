import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarDays,
  Clock,
  Gift,
  Copy,
  Check,
  Calendar,
  Sparkles,
  Award,
  ChevronDown,
  RotateCcw,
  Moon,
} from 'lucide-react';

interface AccurateAgeResult {
  years: number;
  months: number;
  days: number;
  decimalYears: string;
  totalMonths: number;
  totalWeeks: number;
  remainingDaysInWeek: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  daysToNextBday: number;
  monthsToNextBday: number;
  daysToNextBdayRemainder: number;
  nextAge: number;
  nextBirthdayDateStr: string;
  birthDayOfWeek: string;
  nextBirthdayDayOfWeek: string;
  hijriYears: string;
  zodiac: { en: string; ar: string; symbol: string };
  chineseZodiac: { en: string; ar: string };
  generation: { en: string; ar: string };
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

// Format a Date object to YYYY-MM-DD in local time
function formatLocalDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const AgeCalculator: React.FC = () => {
  const { t, addHistory, isRTL, lang } = useApp();

  const todayStr = useMemo(() => formatLocalDate(new Date()), []);
  const [birthDateStr, setBirthDateStr] = useState<string>('1998-05-15');
  const [targetDateStr, setTargetDateStr] = useState<string>(todayStr);
  const [copied, setCopied] = useState(false);
  const [inputMode, setInputMode] = useState<'picker' | 'manual'>('picker');

  // Manual component state (for quick dropdown selection)
  const [birthYear, setBirthYear] = useState<number>(1998);
  const [birthMonth, setBirthMonth] = useState<number>(5);
  const [birthDay, setBirthDay] = useState<number>(15);

  // Sync manual state when picker changes
  const handlePickerBirthChange = (val: string) => {
    setBirthDateStr(val);
    const parsed = parseLocalDate(val);
    if (parsed) {
      setBirthYear(parsed.getFullYear());
      setBirthMonth(parsed.getMonth() + 1);
      setBirthDay(parsed.getDate());
    }
  };

  // Sync picker state when manual selectors change
  const handleManualChange = (y: number, m: number, d: number) => {
    setBirthYear(y);
    setBirthMonth(m);
    // Adjust day if month has fewer days
    const maxDays = new Date(y, m, 0).getDate();
    const safeDay = Math.min(d, maxDays);
    setBirthDay(safeDay);
    const dateFormatted = `${y}-${String(m).padStart(2, '0')}-${String(safeDay).padStart(2, '0')}`;
    setBirthDateStr(dateFormatted);
  };

  // Preset target date helpers
  const setPresetTarget = (type: 'today' | 'eoy' | 'age30' | 'age50' | 'age60') => {
    const bDate = parseLocalDate(birthDateStr);
    if (!bDate && type !== 'today' && type !== 'eoy') return;

    if (type === 'today') {
      setTargetDateStr(formatLocalDate(new Date()));
    } else if (type === 'eoy') {
      const now = new Date();
      setTargetDateStr(`${now.getFullYear()}-12-31`);
    } else if (bDate) {
      const targetAge = type === 'age30' ? 30 : type === 'age50' ? 50 : 60;
      const milestoneDate = new Date(bDate.getFullYear() + targetAge, bDate.getMonth(), bDate.getDate());
      setTargetDateStr(formatLocalDate(milestoneDate));
    }
  };

  // Core exact age computation
  const calculateAge = useMemo((): AccurateAgeResult | { error: string } | null => {
    const birthDate = parseLocalDate(birthDateStr);
    const targetDate = parseLocalDate(targetDateStr);

    if (!birthDate || !targetDate) return null;
    if (targetDate < birthDate) {
      return {
        error:
          lang === 'ar'
            ? 'يجب أن يكون تاريخ الحساب بعد تاريخ الميلاد.'
            : 'Target date must be on or after birth date.',
      };
    }

    let years = targetDate.getFullYear() - birthDate.getFullYear();
    let months = targetDate.getMonth() - birthDate.getMonth();
    let days = targetDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      // Get exact last day of previous month relative to target date
      const prevMonthLastDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // High accuracy totals
    const diffMs = targetDate.getTime() - birthDate.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = Math.floor(diffMs / 1000);
    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDaysInWeek = totalDays % 7;
    const totalMonths = years * 12 + months;
    const decimalYears = (years + months / 12 + days / 365.2425).toFixed(2);
    const hijriYears = (totalDays / 354.367).toFixed(1);

    // Next Birthday calculation
    let nextBdayYear = targetDate.getFullYear();
    let nextBday = new Date(nextBdayYear, birthDate.getMonth(), birthDate.getDate());

    // If target date is past this year's birthday, next birthday is next year
    if (nextBday < targetDate) {
      nextBdayYear += 1;
      nextBday = new Date(nextBdayYear, birthDate.getMonth(), birthDate.getDate());
    }

    const bdayDiffMs = nextBday.getTime() - targetDate.getTime();
    const daysToNextBday = Math.ceil(bdayDiffMs / (1000 * 60 * 60 * 24));
    const nextAge = nextBdayYear - birthDate.getFullYear();
    const nextBirthdayDateStr = formatLocalDate(nextBday);

    let monthsToNextBday = nextBday.getMonth() - targetDate.getMonth();
    let daysToNextBdayRemainder = nextBday.getDate() - targetDate.getDate();
    if (daysToNextBdayRemainder < 0) {
      monthsToNextBday -= 1;
      const prevMonthDays = new Date(nextBday.getFullYear(), nextBday.getMonth(), 0).getDate();
      daysToNextBdayRemainder += prevMonthDays;
    }
    if (monthsToNextBday < 0) {
      monthsToNextBday += 12;
    }

    // Days of week
    const daysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const daysAr = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const bDayIdx = birthDate.getDay();
    const nextBDayIdx = nextBday.getDay();
    const birthDayOfWeek = lang === 'ar' ? daysAr[bDayIdx] : daysEn[bDayIdx];
    const nextBirthdayDayOfWeek = lang === 'ar' ? daysAr[nextBDayIdx] : daysEn[nextBDayIdx];

    // Western Zodiac
    const m = birthDate.getMonth() + 1;
    const d = birthDate.getDate();
    let zodiac = { en: 'Capricorn', ar: 'الجدي', symbol: '♑' };
    if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) zodiac = { en: 'Aquarius', ar: 'الدلو', symbol: '♒' };
    else if ((m === 2 && d >= 19) || (m === 3 && d <= 20)) zodiac = { en: 'Pisces', ar: 'الحوت', symbol: '♓' };
    else if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) zodiac = { en: 'Aries', ar: 'الحمل', symbol: '♈' };
    else if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) zodiac = { en: 'Taurus', ar: 'الثور', symbol: '♉' };
    else if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) zodiac = { en: 'Gemini', ar: 'الجوزاء', symbol: '♊' };
    else if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) zodiac = { en: 'Cancer', ar: 'السرطان', symbol: '♋' };
    else if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) zodiac = { en: 'Leo', ar: 'الأسد', symbol: '♌' };
    else if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) zodiac = { en: 'Virgo', ar: 'العذراء', symbol: '♍' };
    else if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) zodiac = { en: 'Libra', ar: 'الميزان', symbol: '♎' };
    else if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) zodiac = { en: 'Scorpio', ar: 'العقرب', symbol: '♏' };
    else if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) zodiac = { en: 'Sagittarius', ar: 'القوس', symbol: '♐' };

    // Chinese Zodiac
    const chineseAnimals = [
      { en: 'Rat', ar: 'الفأر' },
      { en: 'Ox', ar: 'الثور' },
      { en: 'Tiger', ar: 'النمر' },
      { en: 'Rabbit', ar: 'الأرنب' },
      { en: 'Dragon', ar: 'التنين' },
      { en: 'Snake', ar: 'الأفعى' },
      { en: 'Horse', ar: 'الحصان' },
      { en: 'Goat', ar: 'الماعز' },
      { en: 'Monkey', ar: 'القرد' },
      { en: 'Rooster', ar: 'الديك' },
      { en: 'Dog', ar: 'الكلب' },
      { en: 'Pig', ar: 'الخنزير' },
    ];
    const bYear = birthDate.getFullYear();
    const chineseZodiac = chineseAnimals[(bYear - 4) % 12] || chineseAnimals[0];

    // Generation
    let generation = { en: 'Generation Alpha (2013-Present)', ar: 'جيل ألفا (2013 - الآن)' };
    if (bYear < 1928) generation = { en: 'Greatest Generation (Before 1928)', ar: 'الجيل الأعظم (قبل 1928)' };
    else if (bYear <= 1945) generation = { en: 'Silent Generation (1928-1945)', ar: 'الجيل الصامت (1928 - 1945)' };
    else if (bYear <= 1964) generation = { en: 'Baby Boomers (1946-1964)', ar: 'جيل طفرة المواليد (1946 - 1964)' };
    else if (bYear <= 1980) generation = { en: 'Generation X (1965-1980)', ar: 'جيل إكس (1965 - 1980)' };
    else if (bYear <= 1996) generation = { en: 'Millennials / Gen Y (1981-1996)', ar: 'جيل الألفية (1981 - 1996)' };
    else if (bYear <= 2012) generation = { en: 'Generation Z (1997-2012)', ar: 'جيل زد (1997 - 2012)' };

    return {
      years,
      months,
      days,
      decimalYears,
      totalMonths,
      totalWeeks,
      remainingDaysInWeek,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      daysToNextBday,
      monthsToNextBday,
      daysToNextBdayRemainder,
      nextAge,
      nextBirthdayDateStr,
      birthDayOfWeek,
      nextBirthdayDayOfWeek,
      hijriYears,
      zodiac,
      chineseZodiac,
      generation,
    };
  }, [birthDateStr, targetDateStr, lang]);

  const handleCopy = (summary: string) => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    addHistory('age', lang === 'ar' ? 'حساب العمر الزمني' : 'Age Calculation', summary);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 120 }, (_, i) => currentYear - i);
  const monthOptions = [
    { num: 1, en: '01 - January', ar: '01 - يناير (كانون 2)' },
    { num: 2, en: '02 - February', ar: '02 - فبراير (شباط)' },
    { num: 3, en: '03 - March', ar: '03 - مارس (آذار)' },
    { num: 4, en: '04 - April', ar: '04 - أبريل (نيسان)' },
    { num: 5, en: '05 - May', ar: '05 - مايو (أيار)' },
    { num: 6, en: '06 - June', ar: '06 - يونيو (حزيران)' },
    { num: 7, en: '07 - July', ar: '07 - يوليو (تموز)' },
    { num: 8, en: '08 - August', ar: '08 - أغسطس (آب)' },
    { num: 9, en: '09 - September', ar: '09 - سبتمبر (أيلول)' },
    { num: 10, en: '10 - October', ar: '10 - أكتوبر (تشرين 1)' },
    { num: 11, en: '11 - November', ar: '11 - نوفمبر (تشرين 2)' },
    { num: 12, en: '12 - December', ar: '12 - ديسمبر (كانون 1)' },
  ];
  const maxDaysInSelectedMonth = new Date(birthYear, birthMonth, 0).getDate();
  const dayOptions = Array.from({ length: maxDaysInSelectedMonth }, (_, i) => i + 1);

  const res = calculateAge && !('error' in calculateAge) ? calculateAge : null;
  const err = calculateAge && 'error' in calculateAge ? calculateAge.error : null;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        {/* Header and Input Mode Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              {lang === 'ar' ? 'حاسبة العمر الدقيقة بالتفصيل' : 'Precise Age Calculator'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {lang === 'ar'
                ? 'احسب عمرك الدقيق بالسنوات والأشهر والأيام والساعات مع موعد يوم ميلادك القادم'
                : 'Calculate your exact age in years, months, days, hours, and countdown to your next birthday.'}
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setInputMode('picker')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                inputMode === 'picker'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {lang === 'ar' ? 'تقويم التاريخ' : 'Date Picker'}
            </button>
            <button
              onClick={() => setInputMode('manual')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                inputMode === 'manual'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {lang === 'ar' ? 'قوائم الاختيار (يوم/شهر/سنة)' : 'Day / Month / Year Dropdowns'}
            </button>
          </div>
        </div>

        {/* Input Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Birth Date Section */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              {lang === 'ar' ? '1. تاريخ الميلاد (Date of Birth)' : '1. Date of Birth'}
            </label>

            {inputMode === 'picker' ? (
              <input
                id="age-birth-date"
                type="date"
                value={birthDateStr}
                onChange={(e) => handlePickerBirthChange(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            ) : (
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] text-slate-500 font-medium mb-1">
                    {lang === 'ar' ? 'اليوم' : 'Day'}
                  </label>
                  <select
                    value={birthDay}
                    onChange={(e) => handleManualChange(birthYear, birthMonth, parseInt(e.target.value, 10))}
                    className="w-full px-2.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm focus:ring-2 focus:ring-emerald-500"
                  >
                    {dayOptions.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 font-medium mb-1">
                    {lang === 'ar' ? 'الشهر' : 'Month'}
                  </label>
                  <select
                    value={birthMonth}
                    onChange={(e) => handleManualChange(birthYear, parseInt(e.target.value, 10), birthDay)}
                    className="w-full px-2.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm focus:ring-2 focus:ring-emerald-500"
                  >
                    {monthOptions.map((m) => (
                      <option key={m.num} value={m.num}>
                        {lang === 'ar' ? m.ar : m.en}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 font-medium mb-1">
                    {lang === 'ar' ? 'السنة' : 'Year'}
                  </label>
                  <select
                    value={birthYear}
                    onChange={(e) => handleManualChange(parseInt(e.target.value, 10), birthMonth, birthDay)}
                    className="w-full px-2.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm focus:ring-2 focus:ring-emerald-500"
                  >
                    {yearOptions.map((yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {lang === 'ar' ? 'حدد يوم وشهر وسنة ميلادك بدقة.' : 'Select your birth day, month, and year.'}
            </p>
          </div>

          {/* Target Date Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {lang === 'ar' ? '2. حساب العمر في تاريخ (Age As Of)' : '2. Calculate Age As Of'}
              </label>
              <button
                type="button"
                onClick={() => setTargetDateStr(todayStr)}
                className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> {lang === 'ar' ? 'اليوم' : 'Today'}
              </button>
            </div>

            <input
              id="age-target-date"
              type="date"
              value={targetDateStr}
              onChange={(e) => setTargetDateStr(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base focus:ring-2 focus:ring-emerald-500 transition-all"
            />

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => setPresetTarget('today')}
                className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-all"
              >
                {lang === 'ar' ? 'تاريخ اليوم' : 'Today'}
              </button>
              <button
                type="button"
                onClick={() => setPresetTarget('eoy')}
                className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-all"
              >
                {lang === 'ar' ? 'نهاية العام الحالي' : 'End of Year'}
              </button>
              <button
                type="button"
                onClick={() => setPresetTarget('age30')}
                className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-all"
              >
                {lang === 'ar' ? 'عند بلوغ 30' : 'Turning 30'}
              </button>
              <button
                type="button"
                onClick={() => setPresetTarget('age50')}
                className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-all"
              >
                {lang === 'ar' ? 'عند بلوغ 50' : 'Turning 50'}
              </button>
              <button
                type="button"
                onClick={() => setPresetTarget('age60')}
                className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-all"
              >
                {lang === 'ar' ? 'سن التقاعد 60' : 'Retirement 60'}
              </button>
            </div>
          </div>
        </div>

        {/* Error message */}
        {err && (
          <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-700 dark:text-rose-400 text-sm font-medium">
            {err}
          </div>
        )}

        {/* Main Result Presentation */}
        {res && (
          <div className="space-y-6 pt-2">
            {/* Primary Hero Result Card */}
            <div className="p-6 md:p-8 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white dark:from-emerald-950/40 dark:via-teal-950/20 dark:to-slate-900 border border-emerald-200 dark:border-emerald-800/70 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-xs">
                    <Award className="w-3.5 h-3.5" />
                    {lang === 'ar' ? 'العمر الزمني الدقيق' : 'Chronological Age'}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    ≈ {res.decimalYears} {lang === 'ar' ? 'سنة' : 'years'}
                  </span>
                </div>

                <div className="text-3xl md:text-5xl font-black text-emerald-950 dark:text-emerald-100 font-mono tracking-tight">
                  {lang === 'ar' ? (
                    <>
                      <span className="text-emerald-700 dark:text-emerald-400">{res.years}</span> سنة و{' '}
                      <span className="text-emerald-700 dark:text-emerald-400">{res.months}</span> أشهر و{' '}
                      <span className="text-emerald-700 dark:text-emerald-400">{res.days}</span> يوماً
                    </>
                  ) : (
                    <>
                      <span className="text-emerald-700 dark:text-emerald-400">{res.years}</span> years,{' '}
                      <span className="text-emerald-700 dark:text-emerald-400">{res.months}</span> months,{' '}
                      <span className="text-emerald-700 dark:text-emerald-400">{res.days}</span> days
                    </>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-300 font-medium">
                  <span>
                    {lang === 'ar' ? 'ولدت في يوم:' : 'Born on:'}{' '}
                    <strong className="text-slate-900 dark:text-white font-bold">{res.birthDayOfWeek}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    {lang === 'ar' ? 'العمر بالتقويم الهجري:' : 'Hijri Age:'}{' '}
                    <strong className="text-slate-900 dark:text-white font-mono font-bold">{res.hijriYears}</strong>{' '}
                    {lang === 'ar' ? 'سنة هجرية' : 'years'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-2 self-start md:self-auto">
                <button
                  id="age-copy-btn"
                  onClick={() => {
                    const text =
                      lang === 'ar'
                        ? `العمر: ${res.years} سنة و ${res.months} أشهر و ${res.days} يوماً (إجمالي ${res.totalDays.toLocaleString()} يوماً)`
                        : `Age: ${res.years} years, ${res.months} months, ${res.days} days (Total: ${res.totalDays.toLocaleString()} days)`;
                    handleCopy(text);
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? (lang === 'ar' ? 'تم النسخ!' : 'Copied!') : lang === 'ar' ? 'نسخ النتيجة' : 'Copy Result'}
                </button>
              </div>
            </div>

            {/* Next Birthday Card */}
            <div className="p-5 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl mt-0.5">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                    {lang === 'ar' ? 'موعد يوم ميلادك القادم' : 'Next Birthday Countdown'}
                  </h3>
                  <div className="text-xl md:text-2xl font-black font-mono text-amber-950 dark:text-amber-100 mt-0.5">
                    {res.daysToNextBday === 0 ? (
                      <span className="text-emerald-600 font-bold">
                        🎉 {lang === 'ar' ? 'يوم ميلادك هو اليوم! كل عام وأنت بخير!' : 'Happy Birthday Today! 🎉'}
                      </span>
                    ) : lang === 'ar' ? (
                      <>
                        متبقي <span className="text-amber-600 font-extrabold">{res.daysToNextBday}</span> يوماً{' '}
                        <span className="text-sm font-normal text-amber-800/80">
                          ({res.monthsToNextBday} أشهر و {res.daysToNextBdayRemainder} يوماً)
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-amber-600 font-extrabold">{res.daysToNextBday}</span> days remaining{' '}
                        <span className="text-sm font-normal text-amber-800/80">
                          ({res.monthsToNextBday} months, {res.daysToNextBdayRemainder} days)
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-amber-800/80 dark:text-amber-300/80 mt-1">
                    {lang === 'ar' ? (
                      <>
                        ستبلغ سن <strong>{res.nextAge} سنة</strong> بتاريخ{' '}
                        <span className="font-mono">{res.nextBirthdayDateStr}</span> (يوم {res.nextBirthdayDayOfWeek}).
                      </>
                    ) : (
                      <>
                        Turning <strong>{res.nextAge} years old</strong> on{' '}
                        <span className="font-mono">{res.nextBirthdayDateStr}</span> ({res.nextBirthdayDayOfWeek}).
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Complete Age Breakdown Units (Like Calculator.net) */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {lang === 'ar' ? 'تفصيل العمر بجميع الوحدات الزمنية' : 'Age Expressed in All Time Units'}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase block">
                    {lang === 'ar' ? 'بالسنوات العشرية' : 'In Decimal Years'}
                  </span>
                  <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-100 mt-1">
                    {res.decimalYears}{' '}
                    <span className="text-xs font-normal text-slate-500">{lang === 'ar' ? 'سنة' : 'years'}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase block">
                    {lang === 'ar' ? 'بالأشهر والأيام' : 'In Months & Days'}
                  </span>
                  <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-100 mt-1">
                    {res.totalMonths}{' '}
                    <span className="text-xs font-normal text-slate-500">{lang === 'ar' ? 'شهر و' : 'm,'}</span>{' '}
                    {res.days} <span className="text-xs font-normal text-slate-500">{lang === 'ar' ? 'يوم' : 'd'}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase block">
                    {lang === 'ar' ? 'بالأسابيع والأيام' : 'In Weeks & Days'}
                  </span>
                  <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-100 mt-1">
                    {res.totalWeeks.toLocaleString()}{' '}
                    <span className="text-xs font-normal text-slate-500">{lang === 'ar' ? 'أسبوع و' : 'w,'}</span>{' '}
                    {res.remainingDaysInWeek}{' '}
                    <span className="text-xs font-normal text-slate-500">{lang === 'ar' ? 'يوم' : 'd'}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase block">
                    {lang === 'ar' ? 'إجمالي الأيام المعاشة' : 'Total Days Lived'}
                  </span>
                  <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-100 mt-1">
                    {res.totalDays.toLocaleString()}{' '}
                    <span className="text-xs font-normal text-slate-500">{lang === 'ar' ? 'يوم' : 'days'}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase block">
                    {lang === 'ar' ? 'إجمالي الساعات' : 'Total Hours Lived'}
                  </span>
                  <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-100 mt-1">
                    {res.totalHours.toLocaleString()}{' '}
                    <span className="text-xs font-normal text-slate-500">{lang === 'ar' ? 'ساعة' : 'hrs'}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase block">
                    {lang === 'ar' ? 'إجمالي الدقائق' : 'Total Minutes Lived'}
                  </span>
                  <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-100 mt-1">
                    {res.totalMinutes.toLocaleString()}{' '}
                    <span className="text-xs font-normal text-slate-500">{lang === 'ar' ? 'دقيقة' : 'min'}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 sm:col-span-2">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase block">
                    {lang === 'ar' ? 'إجمالي الثواني المعاشة' : 'Total Seconds Lived'}
                  </span>
                  <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-100 mt-1">
                    {res.totalSeconds.toLocaleString()}{' '}
                    <span className="text-xs font-normal text-slate-500">{lang === 'ar' ? 'ثانية' : 'sec'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cultural, Astrology & Generation Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 bg-indigo-50/60 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                  {lang === 'ar' ? 'البرج الفلكي الغربي' : 'Western Zodiac Sign'}
                </span>
                <div className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="text-lg">{res.zodiac.symbol}</span>
                  {lang === 'ar' ? res.zodiac.ar : res.zodiac.en}
                </div>
              </div>

              <div className="p-4 bg-purple-50/60 dark:bg-purple-950/30 rounded-xl border border-purple-100 dark:border-purple-900/50">
                <span className="text-[10px] font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider block mb-1">
                  {lang === 'ar' ? 'البرج الصيني' : 'Chinese Zodiac'}
                </span>
                <div className="text-base font-bold text-slate-900 dark:text-white">
                  {lang === 'ar' ? res.chineseZodiac.ar : res.chineseZodiac.en}
                </div>
              </div>

              <div className="p-4 bg-teal-50/60 dark:bg-teal-950/30 rounded-xl border border-teal-100 dark:border-teal-900/50">
                <span className="text-[10px] font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider block mb-1">
                  {lang === 'ar' ? 'الفئة والجيل' : 'Generation'}
                </span>
                <div className="text-base font-bold text-slate-900 dark:text-white">
                  {lang === 'ar' ? res.generation.ar : res.generation.en}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
