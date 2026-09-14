import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CONVERSION_CATEGORIES, convertUnits } from '../../data/conversionData';
import { ArrowLeftRight, Copy, Check, Scale } from 'lucide-react';

export const UnitConverter: React.FC = () => {
  const { t, addHistory } = useApp();
  const [activeDimensionId, setActiveDimensionId] = useState<string>('length');

  const currentDimension =
    CONVERSION_CATEGORIES.find((d) => d.id === activeDimensionId) ||
    CONVERSION_CATEGORIES[0];

  const [fromValue, setFromValue] = useState<string>('1');
  const [fromUnitId, setFromUnitId] = useState<string>(currentDimension.units[0].id);
  const [toUnitId, setToUnitId] = useState<string>(
    currentDimension.units[1]?.id || currentDimension.units[0].id
  );
  const [copied, setCopied] = useState(false);

  const handleDimensionChange = (dimId: string) => {
    setActiveDimensionId(dimId);
    const dim = CONVERSION_CATEGORIES.find((d) => d.id === dimId);
    if (dim) {
      setFromUnitId(dim.units[0].id);
      setToUnitId(dim.units[1]?.id || dim.units[0].id);
    }
  };

  const handleSwap = () => {
    const temp = fromUnitId;
    setFromUnitId(toUnitId);
    setToUnitId(temp);
  };

  const numVal = parseFloat(fromValue);
  const resultValue = isNaN(numVal)
    ? null
    : convertUnits(numVal, activeDimensionId, fromUnitId, toUnitId);

  const fromUnitObj = currentDimension.units.find((u) => u.id === fromUnitId);
  const toUnitObj = currentDimension.units.find((u) => u.id === toUnitId);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Dimension Selector Bar */}
      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-none">
        {CONVERSION_CATEGORIES.map((dim) => (
          <button
            key={dim.id}
            id={`unit-dim-${dim.id}`}
            onClick={() => handleDimensionChange(dim.id)}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold whitespace-nowrap transition-all ${
              activeDimensionId === dim.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {t(dim.nameKey, dim.id)}
          </button>
        ))}
      </div>

      {/* Converter Input Interface */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-4">
          {/* From Input & Unit */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              From
            </label>
            <input
              id="unit-from-value"
              type="number"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xl focus:ring-2 focus:ring-emerald-500"
              placeholder="1"
            />
            <select
              id="unit-from-select"
              value={fromUnitId}
              onChange={(e) => setFromUnitId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium"
            >
              {currentDimension.units.map((u) => (
                <option key={u.id} value={u.id}>
                  {t(u.nameKey, u.id)} ({u.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center pt-2 md:pt-6">
            <button
              id="unit-swap-btn"
              type="button"
              onClick={handleSwap}
              className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 transition-all shadow-xs"
              title="Swap units"
              aria-label="Swap units"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>
          </div>

          {/* To Input & Unit */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              To
            </label>
            <div className="w-full px-4 py-3 bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-xl font-mono text-xl font-bold text-emerald-950 dark:text-emerald-200 truncate">
              {resultValue !== null
                ? resultValue.toLocaleString(undefined, { maximumFractionDigits: 6 })
                : '—'}
            </div>
            <select
              id="unit-to-select"
              value={toUnitId}
              onChange={(e) => setToUnitId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium"
            >
              {currentDimension.units.map((u) => (
                <option key={u.id} value={u.id}>
                  {t(u.nameKey, u.id)} ({u.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result Card */}
        {resultValue !== null && fromUnitObj && toUnitObj && (
          <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Direct Conversion
              </span>
              <div className="text-2xl md:text-3xl font-extrabold text-emerald-950 dark:text-emerald-100 font-mono mt-1">
                {fromValue} {fromUnitObj.symbol} = {resultValue.toLocaleString(undefined, { maximumFractionDigits: 6 })} {toUnitObj.symbol}
              </div>
            </div>

            <button
              id="unit-copy-btn"
              onClick={() => {
                const text = `${fromValue} ${fromUnitObj.symbol} = ${resultValue.toFixed(4)} ${toUnitObj.symbol}`;
                handleCopy(text);
                addHistory('unit-converter', `${t(currentDimension.nameKey)} Conversion`, text);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? t('btn_copied') : t('btn_copy')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
