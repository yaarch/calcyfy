import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tool } from '../../types';
import { Copy, Check, Clock, Globe } from 'lucide-react';

interface TimeZoneCalculatorProps {
  tool?: Tool;
}

interface CityZone {
  name: string;
  nameAr: string;
  offset: number; // UTC offset in hours
}

const CITIES: CityZone[] = [
  { name: 'London (UTC+0 / GMT)', nameAr: 'لندن (جرينتش)', offset: 0 },
  { name: 'Riyadh / Dubai / Makkah (UTC+3)', nameAr: 'الرياض / دبي / مكة (جرينتش +3)', offset: 3 },
  { name: 'Cairo / Istanbul (UTC+2 / UTC+3)', nameAr: 'القاهرة / إسطنبول (جرينتش +3)', offset: 3 },
  { name: 'New York / EST (UTC-5)', nameAr: 'نيويورك (جرينتش -5)', offset: -5 },
  { name: 'London / BST (UTC+1)', nameAr: 'لندن الصيفي (جرينتش +1)', offset: 1 },
  { name: 'Paris / Berlin (UTC+1)', nameAr: 'باريس / برلين (جرينتش +1)', offset: 1 },
  { name: 'Tokyo / Seoul (UTC+9)', nameAr: 'طوكيو / سيول (جرينتش +9)', offset: 9 },
  { name: 'Sydney / Melbourne (UTC+10)', nameAr: 'سيدني / ملبورن (جرينتش +10)', offset: 10 },
  { name: 'Los Angeles / PST (UTC-8)', nameAr: 'لوس أنجلوس (جرينتش -8)', offset: -8 },
];

export const TimeZoneCalculator: React.FC<TimeZoneCalculatorProps> = () => {
  const { t, lang } = useApp();
  const [baseTime, setBaseTime] = useState<string>('15:00');
  const [fromCityIdx, setFromCityIdx] = useState<number>(1); // Riyadh UTC+3
  const [toCityIdx, setToCityIdx] = useState<number>(3); // New York UTC-5
  const [copied, setCopied] = useState(false);

  const [hours, minutes] = baseTime.split(':').map(Number);
  const fromOffset = CITIES[fromCityIdx].offset;
  const toOffset = CITIES[toCityIdx].offset;

  const diffHours = toOffset - fromOffset;

  let resultHours = (hours + diffHours) % 24;
  if (resultHours < 0) resultHours += 24;

  const formattedResult = `${String(resultHours).padStart(2, '0')}:${String(minutes || 0).padStart(2, '0')}`;

  const fromCityName = lang === 'ar' ? CITIES[fromCityIdx].nameAr : CITIES[fromCityIdx].name;
  const toCityName = lang === 'ar' ? CITIES[toCityIdx].nameAr : CITIES[toCityIdx].name;

  const handleCopy = () => {
    const summary = `${baseTime} (${fromCityName}) = ${formattedResult} (${toCityName})`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('tz_meeting_time', 'Base Time (HH:MM)')}
            </label>
            <input
              id="tz-time-input"
              type="time"
              value={baseTime}
              onChange={(e) => setBaseTime(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('tz_from_city', 'From Time Zone')}
            </label>
            <select
              id="tz-from-select"
              value={fromCityIdx}
              onChange={(e) => setFromCityIdx(Number(e.target.value))}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
            >
              {CITIES.map((c, i) => (
                <option key={i} value={i}>
                  {lang === 'ar' ? c.nameAr : c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('tz_to_city', 'To Target Time Zone')}
            </label>
            <select
              id="tz-to-select"
              value={toCityIdx}
              onChange={(e) => setToCityIdx(Number(e.target.value))}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
            >
              {CITIES.map((c, i) => (
                <option key={i} value={i}>
                  {lang === 'ar' ? c.nameAr : c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                {t('tz_target_time', 'Converted Local Time')}
              </span>
              <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                {formattedResult}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {diffHours >= 0 ? `+${diffHours}` : diffHours} {t('tz_hours_diff', 'hours difference')}
              </p>
            </div>

            <button
              id="tz-copy-btn"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy Time Difference')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
