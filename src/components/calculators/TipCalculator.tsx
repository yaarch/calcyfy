import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Receipt, Users, Copy, Check, Plus, Minus } from 'lucide-react';

export const TipCalculator: React.FC = () => {
  const { t, addHistory } = useApp();
  const [billAmount, setBillAmount] = useState<string>('85.50');
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [customTip, setCustomTip] = useState<string>('');
  const [peopleCount, setPeopleCount] = useState<number>(2);
  const [roundUp, setRoundUp] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  const presets = [10, 15, 18, 20, 25];

  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    if (isNaN(bill) || bill <= 0) return null;

    const tipRate = customTip !== '' ? parseFloat(customTip) || 0 : tipPercent;
    let tipAmount = (bill * tipRate) / 100;
    let totalBill = bill + tipAmount;

    if (roundUp) {
      const roundedTotal = Math.ceil(totalBill);
      tipAmount += roundedTotal - totalBill;
      totalBill = roundedTotal;
    }

    const tipPerPerson = tipAmount / Math.max(1, peopleCount);
    const totalPerPerson = totalBill / Math.max(1, peopleCount);

    return {
      tipRate,
      tipAmount,
      totalBill,
      tipPerPerson,
      totalPerPerson,
    };
  };

  const res = calculateTip();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bill Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Bill Amount ($)
            </label>
            <input
              id="tip-bill"
              type="number"
              step="0.01"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xl focus:ring-2 focus:ring-emerald-500"
              placeholder="0.00"
            />
          </div>

          {/* People Splitter */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Split Between People
            </label>
            <div className="flex items-center gap-3">
              <button
                id="tip-split-minus"
                type="button"
                onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
                className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Decrease people count"
              >
                <Minus className="w-5 h-5" />
              </button>
              <div className="flex-1 py-3 text-center bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xl font-bold flex items-center justify-center gap-2">
                <Users className="w-5 h-5 text-emerald-500" />
                <span>{peopleCount} {peopleCount === 1 ? 'Person' : 'People'}</span>
              </div>
              <button
                id="tip-split-plus"
                type="button"
                onClick={() => setPeopleCount(peopleCount + 1)}
                className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Increase people count"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tip Percentage Selection */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Select Tip Percentage
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {presets.map((pct) => (
              <button
                key={pct}
                type="button"
                onClick={() => {
                  setTipPercent(pct);
                  setCustomTip('');
                }}
                className={`py-2.5 px-3 rounded-xl font-bold text-sm transition-all ${
                  customTip === '' && tipPercent === pct
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {pct}%
              </button>
            ))}
            <div className="relative">
              <input
                id="tip-custom"
                type="number"
                value={customTip}
                onChange={(e) => setCustomTip(e.target.value)}
                placeholder="Custom %"
                className={`w-full py-2 px-3 bg-slate-100 dark:bg-slate-800 border ${
                  customTip !== '' ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200 dark:border-slate-700'
                } rounded-xl text-xs font-bold text-center`}
              />
            </div>
          </div>
        </div>

        {/* Round Up Toggle */}
        <div className="flex items-center gap-2 pt-1">
          <input
            id="tip-round-up"
            type="checkbox"
            checked={roundUp}
            onChange={(e) => setRoundUp(e.target.checked)}
            className="w-4 h-4 text-emerald-600 rounded-sm border-slate-300 focus:ring-emerald-500"
          />
          <label htmlFor="tip-round-up" className="text-xs text-slate-600 dark:text-slate-300 font-medium cursor-pointer">
            Round up total bill to nearest whole dollar
          </label>
        </div>

        {res && (
          <div className="space-y-6 pt-2">
            {/* Primary Per Person Split */}
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  Total Per Person ({peopleCount} {peopleCount === 1 ? 'person' : 'people'})
                </span>
                <div className="text-4xl font-extrabold text-emerald-950 dark:text-emerald-100 font-mono mt-1">
                  ${res.totalPerPerson.toFixed(2)}
                </div>
                <div className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">
                  Includes ${res.tipPerPerson.toFixed(2)} tip per person
                </div>
              </div>

              <button
                id="tip-copy-btn"
                onClick={() => {
                  handleCopy(`Total: $${res.totalBill.toFixed(2)} ($${res.totalPerPerson.toFixed(2)}/person, Tip: $${res.tipAmount.toFixed(2)})`);
                  addHistory('tip', `Bill $${billAmount} (${res.tipRate}% tip)`, `$${res.totalPerPerson.toFixed(2)}/person`);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? t('btn_copied') : t('btn_copy')}
              </button>
            </div>

            {/* Total Breakdown */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Total Tip Amount
                </span>
                <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                  ${res.tipAmount.toFixed(2)}
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Total Final Bill
                </span>
                <div className="text-2xl font-bold font-mono text-slate-800 dark:text-slate-100 mt-1">
                  ${res.totalBill.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
