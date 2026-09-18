import React, { useState } from 'react';
import { ToolDef } from '../../../../types';
import { Calendar, Clock, Globe, Award, Check, Copy } from 'lucide-react';

interface DateTimeEngineProps {
  tool: ToolDef;
}

export const DateTimeEngine: React.FC<DateTimeEngineProps> = ({ tool }) => {
  const [copied, setCopied] = useState(false);

  // Time Duration State
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('17:30');

  // Date Add/Subtract State
  const [baseDate, setBaseDate] = useState<string>('2026-01-01');
  const [amountUnits, setAmountUnits] = useState<number>(45);
  const [unitType, setUnitType] = useState<'days' | 'weeks' | 'months' | 'years'>('days');
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');

  // Unix Timestamp State
  const [unixInput, setUnixInput] = useState<string>('1767225600'); // Jan 1 2026 00:00:00 UTC

  // Business Days State
  const [workStart, setWorkStart] = useState<string>('2026-09-01');
  const [workEnd, setWorkEnd] = useState<string>('2026-09-30');

  // Leap Year State
  const [leapYear, setLeapYear] = useState<number>(2024);

  // Age Breakdown State
  const [birthDate, setBirthDate] = useState<string>('1995-06-15');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 1. Time Duration Logic
  const calcTimeDuration = () => {
    const [h1, m1] = startTime.split(':').map(Number);
    const [h2, m2] = endTime.split(':').map(Number);

    let startSec = h1 * 3600 + m1 * 60;
    let endSec = h2 * 3600 + m2 * 60;

    if (endSec < startSec) endSec += 24 * 3600; // Overnight shift

    const diffSec = endSec - startSec;
    const diffHours = Math.floor(diffSec / 3600);
    const diffMin = Math.floor((diffSec % 3600) / 60);
    const decimalHours = (diffSec / 3600).toFixed(2);

    return { diffHours, diffMin, decimalHours, totalMinutes: Math.floor(diffSec / 60) };
  };

  // 2. Date Add/Subtract Logic
  const calcDateAddSub = () => {
    const d = new Date(baseDate);
    if (isNaN(d.getTime())) return { resultDate: 'Invalid Date', dayOfWeek: '' };

    const sign = operation === 'add' ? 1 : -1;
    if (unitType === 'days') d.setDate(d.getDate() + sign * amountUnits);
    if (unitType === 'weeks') d.setDate(d.getDate() + sign * amountUnits * 7);
    if (unitType === 'months') d.setMonth(d.getMonth() + sign * amountUnits);
    if (unitType === 'years') d.setFullYear(d.getFullYear() + sign * amountUnits);

    const resultDate = d.toISOString().split('T')[0];
    const dayOfWeek = d.toLocaleDateString('en-US', { weekday: 'long' });

    return { resultDate, dayOfWeek };
  };

  // 3. Unix Timestamp Logic
  const calcUnixTimestamp = () => {
    const num = parseInt(unixInput, 10);
    if (isNaN(num)) return { valid: false, utc: '', local: '', iso: '' };

    const ms = num < 10000000000 ? num * 1000 : num; // Handle sec vs ms
    const d = new Date(ms);

    return {
      valid: true,
      utc: d.toUTCString(),
      local: d.toLocaleString(),
      iso: d.toISOString()
    };
  };

  // 4. Business Working Days Logic
  const calcWorkDays = () => {
    const d1 = new Date(workStart);
    const d2 = new Date(workEnd);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime()) || d2 < d1) {
      return { totalCalendarDays: 0, weekendDays: 0, businessDays: 0 };
    }

    let totalDays = 0;
    let weekendDays = 0;
    let businessDays = 0;

    const cur = new Date(d1);
    while (cur <= d2) {
      totalDays++;
      const day = cur.getDay();
      if (day === 0 || day === 6) {
        weekendDays++;
      } else {
        businessDays++;
      }
      cur.setDate(cur.getDate() + 1);
    }

    return { totalCalendarDays: totalDays, weekendDays, businessDays };
  };

  // 5. Leap Year Logic
  const calcLeapYear = () => {
    const y = leapYear;
    const isLeap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
    const rule = isLeap
      ? `${y} is divisible by 4 (and not 100, or is divisible by 400), making it a leap year with 366 days.`
      : `${y} is a standard year with 365 days.`;

    return { isLeap, rule };
  };

  // 6. Age Breakdown Logic
  const calcAgeBreakdown = () => {
    const birth = new Date(birthDate);
    const now = new Date();
    if (isNaN(birth.getTime()) || birth > now) {
      return { years: 0, months: 0, days: 0, totalDays: 0, totalHours: 0 };
    }

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const diffMs = now.getTime() - birth.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));

    return { years, months, days, totalDays, totalHours };
  };

  return (
    <div id={`date-time-engine-${tool.id}`} className="max-w-4xl mx-auto space-y-6">
      {/* Header Card */}
      <div id="date-time-header" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-md">
          Calendar & Temporal Analytics Engine
        </span>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{tool.name}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{tool.description}</p>
      </div>

      {/* TIME DURATION TOOL */}
      {tool.id === 'time-duration-between' && (() => {
        const { diffHours, diffMin, decimalHours, totalMinutes } = calcTimeDuration();
        return (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Start Time (HH:MM)</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-base font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">End Time (HH:MM)</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-base font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Duration Breakdown</span>
                <span className="text-2xl font-mono font-bold text-blue-900 dark:text-blue-200 mt-1 block">
                  {diffHours} hrs {diffMin} mins
                </span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Decimal Hours</span>
                <span className="text-xl font-mono font-bold text-slate-900 dark:text-white mt-1 block">{decimalHours} Hours</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Total Elapsed Minutes</span>
                <span className="text-xl font-mono font-bold text-slate-900 dark:text-white mt-1 block">{totalMinutes} Minutes</span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* DATE ADD SUBTRACT TOOL */}
      {tool.id === 'date-add-subtract' && (() => {
        const { resultDate, dayOfWeek } = calcDateAddSub();
        return (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Base Calendar Date</label>
                <input
                  type="date"
                  value={baseDate}
                  onChange={(e) => setBaseDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-sm font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Operation & Quantity</label>
                <div className="flex gap-2">
                  <select
                    value={operation}
                    onChange={(e) => setOperation(e.target.value as any)}
                    className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
                  >
                    <option value="add">Add (+)</option>
                    <option value="subtract">Subtract (-)</option>
                  </select>
                  <input
                    type="number"
                    min="1"
                    value={amountUnits}
                    onChange={(e) => setAmountUnits(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs font-bold"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Unit Type</label>
                <select
                  value={unitType}
                  onChange={(e) => setUnitType(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Calculated Resulting Date</span>
                <span className="text-2xl font-mono font-bold text-blue-900 dark:text-blue-200 mt-1 block">{resultDate}</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Day of the Week</span>
                <span className="text-xl font-mono font-bold text-slate-900 dark:text-white mt-1 block">{dayOfWeek}</span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* UNIX TIMESTAMP TOOL */}
      {tool.id === 'unix-timestamp-converter' && (() => {
        const { valid, utc, local, iso } = calcUnixTimestamp();
        return (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Unix Timestamp Integer (Seconds / Ms)</label>
              <input
                type="text"
                value={unixInput}
                onChange={(e) => setUnixInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-base font-bold"
              />
            </div>

            {valid && (
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 font-mono text-xs">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-[11px] text-slate-500 uppercase block font-semibold">UTC Date Time</span>
                  <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{utc}</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-[11px] text-slate-500 uppercase block font-semibold">Local Time Zone</span>
                  <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{local}</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-[11px] text-slate-500 uppercase block font-semibold">ISO 8601 Format</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 mt-0.5 block">{iso}</span>
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* WORK DAYS COUNT TOOL */}
      {tool.id === 'work-days-count' && (() => {
        const { totalCalendarDays, weekendDays, businessDays } = calcWorkDays();
        return (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Start Date</label>
                <input
                  type="date"
                  value={workStart}
                  onChange={(e) => setWorkStart(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-sm font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">End Date</label>
                <input
                  type="date"
                  value={workEnd}
                  onChange={(e) => setWorkEnd(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-sm font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 font-mono">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Net Working Business Days</span>
                <span className="text-2xl font-bold text-blue-900 dark:text-blue-200 mt-1 block">{businessDays} Days</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Total Calendar Days</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">{totalCalendarDays} Days</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Weekend Days</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">{weekendDays} Days</span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* LEAP YEAR CHECKER TOOL */}
      {tool.id === 'leap-year-checker' && (() => {
        const { isLeap, rule } = calcLeapYear();
        return (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Target Year Input</label>
              <input
                type="number"
                value={leapYear}
                onChange={(e) => setLeapYear(parseInt(e.target.value) || 2024)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-base font-bold"
              />
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
              <span className={`text-xl font-bold block ${isLeap ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
                {isLeap ? `✓ ${leapYear} IS a Leap Year` : `✕ ${leapYear} IS NOT a Leap Year`}
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-sans">{rule}</p>
            </div>
          </div>
        );
      })()}

      {/* AGE IN DAYS HOURS SECONDS TOOL */}
      {tool.id === 'age-in-days-hours-seconds' && (() => {
        const { years, months, days, totalDays, totalHours } = calcAgeBreakdown();
        return (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Date of Birth</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-sm font-bold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 font-mono">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Chronological Age</span>
                <span className="text-xl font-bold text-blue-900 dark:text-blue-200 mt-1 block">
                  {years} yrs {months} mos {days} days
                </span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Total Days Elapsed</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">{totalDays.toLocaleString()} Days</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Total Hours Elapsed</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">{totalHours.toLocaleString()} Hours</span>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
