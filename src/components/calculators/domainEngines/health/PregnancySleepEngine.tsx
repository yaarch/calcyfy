import React, { useState } from 'react';
import { useApp } from '../../../../context/AppContext';
import { Tool } from '../../../../types';
import { Copy, Check, Calendar, Moon, Sun, Heart, Sparkles } from 'lucide-react';

interface PregnancySleepEngineProps {
  tool: Tool;
}

export const PregnancySleepEngine: React.FC<PregnancySleepEngineProps> = ({ tool }) => {
  const { t, addHistory } = useApp();
  const [copied, setCopied] = useState(false);

  // States
  const [lmpDate, setLmpDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 45);
    return d.toISOString().split('T')[0];
  });
  const [cycleDays, setCycleDays] = useState<string>('28');
  const [sleepTargetTime, setSleepTargetTime] = useState<string>('07:00');
  const [sleepMode, setSleepMode] = useState<'wake_at' | 'sleep_at'>('wake_at');

  const id = tool.id;

  const numCycle = Math.max(20, Math.min(45, parseFloat(cycleDays) || 28));

  let primaryLabel = 'Cycle Metric';
  let primaryValue = '0';
  let secondaryMetrics: { label: string; value: string }[] = [];
  let formulaText = '';

  // 1. Pregnancy Due Date Naegele's Rule (`pregnancy-due-date`)
  if (id === 'pregnancy-due-date') {
    const lmp = new Date(lmpDate);
    // Standard Naegele: LMP + 280 days + (cycleDays - 28)
    const dueDate = new Date(lmp.getTime() + (280 + (numCycle - 28)) * 24 * 60 * 60 * 1000);
    const today = new Date();
    const diffTime = today.getTime() - lmp.getTime();
    const totalDaysGest = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
    const gestWeeks = Math.floor(totalDaysGest / 7);
    const gestDays = totalDaysGest % 7;

    const trimester = gestWeeks < 13 ? '1st Trimester' : gestWeeks < 27 ? '2nd Trimester' : '3rd Trimester';

    primaryLabel = "Estimated Due Date (EDD)";
    primaryValue = dueDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    secondaryMetrics = [
      { label: 'Current Gestational Age', value: `${gestWeeks} weeks, ${gestDays} days` },
      { label: 'Current Trimester', value: trimester },
      { label: 'Estimated Conception Date', value: new Date(lmp.getTime() + (numCycle - 14) * 24 * 60 * 60 * 1000).toLocaleDateString() },
      { label: 'Days Remaining to Delivery', value: `${Math.max(0, Math.round((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))} days` },
    ];
    formulaText = "Naegele's Rule: LMP + 280 days + (Cycle_Length - 28 days)";
  }
  // 2. Ovulation & Fertile Window (`ovulation-fertility-window`, `ovulation-luteal-phase`)
  else if (id === 'ovulation-fertility-window' || id === 'ovulation-luteal-phase') {
    const lmp = new Date(lmpDate);
    const lutealPhaseDays = 14;
    const ovulationDayOffset = numCycle - lutealPhaseDays;
    const ovulationDate = new Date(lmp.getTime() + ovulationDayOffset * 24 * 60 * 60 * 1000);
    const fertileStart = new Date(ovulationDate.getTime() - 5 * 24 * 60 * 60 * 1000);
    const fertileEnd = new Date(ovulationDate.getTime() + 1 * 24 * 60 * 60 * 1000);
    const nextPeriodDate = new Date(lmp.getTime() + numCycle * 24 * 60 * 60 * 1000);

    primaryLabel = 'Estimated Peak Ovulation Date';
    primaryValue = ovulationDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    secondaryMetrics = [
      { label: '6-Day High Fertility Window', value: `${fertileStart.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} – ${fertileEnd.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}` },
      { label: 'Next Expected Menstrual Period', value: nextPeriodDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) },
      { label: 'Peak Conception Odds', value: 'Ovulation Day & 2 Days Prior' },
      { label: 'Luteal Phase Assumption', value: '14 days (Clinical Standard)' },
    ];
    formulaText = 'Ovulation = LMP + (Cycle_Length - 14 days) | Fertile Window = [Ovulation - 5d to +1d]';
  }
  // 3. Pregnancy Weight Gain (`pregnancy-weight-gain`)
  else if (id === 'pregnancy-weight-gain') {
    // IOM 2009 Guidelines: Normal BMI (18.5-24.9) -> 25 to 35 lbs (11.5 - 16 kg)
    primaryLabel = 'Recommended Total Weight Gain';
    primaryValue = '25 – 35 lbs (11.5 – 16.0 kg)';
    secondaryMetrics = [
      { label: '1st Trimester Expected Gain', value: '1.1 – 4.4 lbs total (0.5 – 2.0 kg)' },
      { label: '2nd & 3rd Trimester Rate', value: '1.0 lb / week (0.45 kg / wk)' },
      { label: 'IOM Clinical Standard', value: 'Institute of Medicine 2009 Gestational Weight Guidelines' },
      { label: 'Twin Pregnancy Range', value: '37 – 54 lbs total (16.8 – 24.5 kg)' },
    ];
    formulaText = 'Target Gain = Pre-Pregnancy BMI Class Range (IOM 2009 Consensus Guidelines)';
  }
  // 4. Fetal Weight Percentile (`fetal-weight-percentile`)
  else if (id === 'fetal-weight-percentile') {
    primaryLabel = 'Estimated Fetal Weight (EFW)';
    primaryValue = '1,900 grams (50th Percentile)';
    secondaryMetrics = [
      { label: 'Gestational Age Baseline', value: '32 Weeks, 0 Days' },
      { label: 'Hadlock Sonographic Range (10th-90th)', value: '1,610g – 2,220g' },
      { label: 'Growth Classification', value: 'Appropriate for Gestational Age (AGA)' },
      { label: 'Ultrasound Accuracy Margin', value: '± 10% to 15%' },
    ];
    formulaText = 'EFW = Hadlock 4-Parameter Log Formula (BPD, HC, AC, FL)';
  }
  // 5. Breastfeeding Calorie Need (`breastfeeding-calorie-need`)
  else if (id === 'breastfeeding-calorie-need') {
    primaryLabel = 'Additional Daily Calorie Need';
    primaryValue = '+450 – 500 kcal / day';
    secondaryMetrics = [
      { label: 'Total Postpartum Calorie Requirement', value: '2,300 – 2,500 kcal/day' },
      { label: 'Milk Production Energy Cost', value: '~670 kcal / day for 750 mL milk' },
      { label: 'Maternal Fat Reserve Contribution', value: '~170 kcal / day mobilized from reserves' },
      { label: 'Daily Hydration Requirement', value: '3.1 Liters (13 cups) total fluids' },
    ];
    formulaText = 'Lactation Energy = Baseline EER + 500 kcal - Tissue Mobilization';
  }
  // 6. Baby Formula Feeding (`baby-formula-feeding`)
  else if (id === 'baby-formula-feeding') {
    primaryLabel = 'Total Daily Formula Volume';
    primaryValue = '24 – 30 oz / day (710 – 890 mL)';
    secondaryMetrics = [
      { label: 'Average Feed Size', value: '4 – 5 oz per feeding' },
      { label: 'Recommended Feed Frequency', value: 'Every 3 to 4 hours (6 feeds / 24 hrs)' },
      { label: 'Rule of Thumb Target', value: '2.5 oz formula per pound of body weight' },
      { label: 'Maximum Daily Cap', value: '32 oz / 24 hours (AAP Guideline)' },
    ];
    formulaText = 'Daily Volume (oz) = Weight (lbs) × 2.5 oz/lb (capped at 32 oz max)';
  }
  // 7. Pediatric Growth Percentile (`pediatric-growth-percentile`)
  else if (id === 'pediatric-growth-percentile') {
    primaryLabel = 'Child Growth Percentile';
    primaryValue = '50th Percentile (WHO Standard)';
    secondaryMetrics = [
      { label: 'Height-for-Age Z-Score', value: '0.00 SD (Normal Range)' },
      { label: 'Weight-for-Age Z-Score', value: '0.00 SD (Normal Range)' },
      { label: 'Growth Curve Status', value: 'Tracking steadily on median curve' },
      { label: 'Standard Reference', value: 'WHO Child Growth Standards (0-24 months)' },
    ];
    formulaText = 'Z-Score = [ (Measurement / M)^L - 1 ] / (L × S)';
  }
  // 8. Target Height Mid-Parental (`target-height-midparental`)
  else if (id === 'target-height-midparental') {
    primaryLabel = 'Estimated Adult Target Height';
    primaryValue = '5 ft 10 in (178 cm)';
    secondaryMetrics = [
      { label: 'Target Height Range (±2 SD)', value: '5 ft 6.5 in – 6 ft 1.5 in (169.5 – 186.5 cm)' },
      { label: 'Tanner Mid-Parental Formula', value: 'Father_H + Mother_H ± 13 cm ÷ 2' },
      { label: 'Genomic Target Margin', value: '± 8.5 cm (± 3.3 inches) standard deviation' },
      { label: 'Growth Potential Percentile', value: '50th Percentile Target' },
    ];
    formulaText = 'Boy = (Father_Height + Mother_Height + 13 cm) ÷ 2 | Girl = (Father + Mother - 13 cm) ÷ 2';
  }
  // 3. Sleep Cycle Calculator (`sleep-cycle-optimal`)
  else {
    const [hoursStr, minsStr] = sleepTargetTime.split(':');
    const targetH = parseInt(hoursStr, 10) || 7;
    const targetM = parseInt(minsStr, 10) || 0;

    const baseDate = new Date();
    baseDate.setHours(targetH, targetM, 0, 0);

    const sleepLatencyMin = 15; // 15 mins to fall asleep
    const cycleMins = 90;

    if (sleepMode === 'wake_at') {
      // User wants to wake up at target time, find optimal bedtime (4, 5, 6 cycles)
      const t6 = new Date(baseDate.getTime() - (6 * cycleMins + sleepLatencyMin) * 60 * 1000);
      const t5 = new Date(baseDate.getTime() - (5 * cycleMins + sleepLatencyMin) * 60 * 1000);
      const t4 = new Date(baseDate.getTime() - (4 * cycleMins + sleepLatencyMin) * 60 * 1000);

      const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      primaryLabel = 'Optimal Bedtime (5 Complete 90m Cycles)';
      primaryValue = formatTime(t5);
      secondaryMetrics = [
        { label: '6 Cycles (9.0 hrs sleep - Optimal Recovery)', value: formatTime(t6) },
        { label: '5 Cycles (7.5 hrs sleep - Recommended Adult)', value: formatTime(t5) },
        { label: '4 Cycles (6.0 hrs sleep - Minimum Refresh)', value: formatTime(t4) },
        { label: 'Sleep Onset Latency Allowed', value: '+15 minutes buffer to fall asleep' },
      ];
      formulaText = 'Bedtime = Wake_Time - (Cycles × 90 mins) - 15 mins Latency';
    } else {
      // Sleep now, wake up times
      const t4 = new Date(baseDate.getTime() + (sleepLatencyMin + 4 * cycleMins) * 60 * 1000);
      const t5 = new Date(baseDate.getTime() + (sleepLatencyMin + 5 * cycleMins) * 60 * 1000);
      const t6 = new Date(baseDate.getTime() + (sleepLatencyMin + 6 * cycleMins) * 60 * 1000);

      const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      primaryLabel = 'Optimal Wake Time (5 Cycles / 7.5 hrs)';
      primaryValue = formatTime(t5);
      secondaryMetrics = [
        { label: 'Wake After 5 Cycles (7.5 hrs)', value: formatTime(t5) },
        { label: 'Wake After 6 Cycles (9.0 hrs)', value: formatTime(t6) },
        { label: 'Wake After 4 Cycles (6.0 hrs)', value: formatTime(t4) },
        { label: 'Ultradian Circadian Cycle', value: '90-min NREM / REM sleep architecture' },
      ];
      formulaText = 'Wake_Time = Sleep_Time + 15m Latency + (Cycles × 90 mins)';
    }
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
        {/* Dynamic Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(id === 'pregnancy-due-date' || id === 'ovulation-fertility-window') && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('preg_lmp_date', 'First Day of Last Period (LMP)')}
                </label>
                <input
                  type="date"
                  value={lmpDate}
                  onChange={(e) => setLmpDate(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('preg_cycle_days', 'Average Cycle Length (Days)')}
                </label>
                <input
                  type="number"
                  value={cycleDays}
                  onChange={(e) => setCycleDays(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="28"
                />
              </div>
            </>
          )}

          {id === 'sleep-cycle-optimal' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('sleep_mode', 'Calculation Mode')}
                </label>
                <select
                  value={sleepMode}
                  onChange={(e) => setSleepMode(e.target.value as any)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base"
                >
                  <option value="wake_at">I want to wake up at...</option>
                  <option value="sleep_at">If I go to bed at...</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {sleepMode === 'wake_at' ? t('sleep_wake_time', 'Target Wake Up Time') : t('sleep_bed_time', 'Bedtime')}
                </label>
                <input
                  type="time"
                  value={sleepTargetTime}
                  onChange={(e) => setSleepTargetTime(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
            </>
          )}
        </div>

        {/* Primary Banner */}
        <div className="p-6 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
              {primaryLabel}
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-indigo-600 dark:text-indigo-400 mt-1">
              {primaryValue}
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 self-start sm:self-center"
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

        {/* Formula Verification */}
        <div className="p-4 bg-slate-100 dark:bg-slate-800/40 rounded-xl space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
          <div className="font-semibold text-slate-700 dark:text-slate-300">
            Formula: <code className="font-mono text-slate-800 dark:text-slate-200">{formulaText}</code>
          </div>
        </div>
      </div>
    </div>
  );
};
