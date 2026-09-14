import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CURRENCY_DATABASE, StaticCurrencyProvider } from '../../data/currencyData';
import { ArrowLeftRight, Coins, Info, Copy, Check, RefreshCw } from 'lucide-react';

export const CurrencyConverter: React.FC = () => {
  const { t, addHistory } = useApp();
  const [amount, setAmount] = useState<string>('100');
  const [fromCode, setFromCode] = useState<string>('USD');
  const [toCode, setToCode] = useState<string>('EUR');
  const [rateInfo, setRateInfo] = useState<{
    rate: number;
    isLive: boolean;
    lastUpdated: string;
    source: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;
    StaticCurrencyProvider.getRate(fromCode, toCode).then((info) => {
      if (mounted) setRateInfo(info);
    });
    return () => {
      mounted = false;
    };
  }, [fromCode, toCode]);

  const handleSwap = () => {
    const temp = fromCode;
    setFromCode(toCode);
    setToCode(temp);
  };

  const parsedAmount = parseFloat(amount) || 0;
  const convertedAmount = rateInfo ? parsedAmount * rateInfo.rate : 0;
  const inverseRate = rateInfo && rateInfo.rate > 0 ? 1 / rateInfo.rate : 0;

  const fromCurrency = CURRENCY_DATABASE.find((c) => c.code === fromCode);
  const toCurrency = CURRENCY_DATABASE.find((c) => c.code === toCode);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Real-time / Static Reference Disclaimer Badge */}
      <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs text-amber-800 dark:text-amber-300">
        <Info className="w-4 h-4 shrink-0" />
        <span>
          <strong>Data Notice:</strong> Displaying benchmark reference exchange rates. Live market feeds can be connected via API endpoints without changing frontend logic.
        </span>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-4">
          {/* From Currency */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Amount
            </label>
            <input
              id="curr-from-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xl focus:ring-2 focus:ring-emerald-500"
              placeholder="100"
            />
            <select
              id="curr-from-code"
              value={fromCode}
              onChange={(e) => setFromCode(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
            >
              {CURRENCY_DATABASE.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} — {c.name} ({c.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center pt-2 md:pt-6">
            <button
              id="curr-swap-btn"
              type="button"
              onClick={handleSwap}
              className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 transition-all shadow-xs"
              title="Swap currencies"
              aria-label="Swap currencies"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>
          </div>

          {/* To Currency */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Converted Total
            </label>
            <div className="w-full px-4 py-3 bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-xl font-mono text-xl font-bold text-emerald-950 dark:text-emerald-200 truncate">
              {toCurrency?.symbol}{' '}
              {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <select
              id="curr-to-code"
              value={toCode}
              onChange={(e) => setToCode(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
            >
              {CURRENCY_DATABASE.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} — {c.name} ({c.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Rate Conversion Summary Card */}
        {rateInfo && fromCurrency && toCurrency && (
          <div className="space-y-4 pt-2">
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  {amount} {fromCode} equals
                </span>
                <div className="text-3xl md:text-4xl font-extrabold text-emerald-950 dark:text-emerald-100 font-mono mt-1">
                  {toCurrency.symbol}{' '}
                  {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
                  <span className="text-lg font-normal text-slate-500">{toCode}</span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 mt-2 space-x-2">
                  <span>1 {fromCode} = {rateInfo.rate.toFixed(4)} {toCode}</span>
                  <span>•</span>
                  <span>1 {toCode} = {inverseRate.toFixed(4)} {fromCode}</span>
                </div>
              </div>

              <button
                id="curr-copy-btn"
                onClick={() => {
                  const text = `${amount} ${fromCode} = ${convertedAmount.toFixed(2)} ${toCode}`;
                  handleCopy(text);
                  addHistory('currency', `Currency Conversion`, text);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? t('btn_copied') : t('btn_copy')}
              </button>
            </div>

            {/* Quick Conversion Matrix */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Quick Denomination Multipliers
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                {[5, 10, 50, 100].map((unit) => (
                  <div key={unit} className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500">{unit} {fromCode} =</span>{' '}
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      {(unit * rateInfo.rate).toFixed(2)} {toCode}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
