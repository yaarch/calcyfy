import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tool } from '../../types';
import { Copy, Check, Receipt, RefreshCw } from 'lucide-react';

interface TaxCalculatorProps {
  tool?: Tool;
}

export const TaxCalculator: React.FC<TaxCalculatorProps> = () => {
  const { t, addHistory } = useApp();
  const [mode, setMode] = useState<'add' | 'remove'>('add');
  const [amount, setAmount] = useState<string>('100');
  const [taxRate, setTaxRate] = useState<string>('15');
  const [copied, setCopied] = useState(false);

  const numAmount = parseFloat(amount) || 0;
  const numRate = parseFloat(taxRate) || 0;

  let taxAmount = 0;
  let netAmount = 0;
  let totalAmount = 0;

  if (mode === 'add') {
    netAmount = numAmount;
    taxAmount = numAmount * (numRate / 100);
    totalAmount = netAmount + taxAmount;
  } else {
    totalAmount = numAmount;
    netAmount = numAmount / (1 + numRate / 100);
    taxAmount = totalAmount - netAmount;
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveResult = () => {
    addHistory(
      'tax',
      `Tax ${mode === 'add' ? 'Added' : 'Extracted'} (${numRate}%)`,
      `Total: ${totalAmount.toFixed(2)}, Tax: ${taxAmount.toFixed(2)}`
    );
  };

  return (
    <div className="space-y-6">
      {/* Mode Selector Tabs */}
      <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        <button
          id="tax-mode-add"
          onClick={() => setMode('add')}
          className={`flex-1 py-2 px-3 text-xs md:text-sm font-semibold rounded-lg transition-all ${
            mode === 'add'
              ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          {t('tax_mode_add', 'Add Sales Tax / VAT')}
        </button>
        <button
          id="tax-mode-remove"
          onClick={() => setMode('remove')}
          className={`flex-1 py-2 px-3 text-xs md:text-sm font-semibold rounded-lg transition-all ${
            mode === 'remove'
              ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          {t('tax_mode_remove', 'Extract / Remove Tax from Total')}
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {mode === 'add' ? t('tax_net_amount', 'Amount (Before Tax)') : t('tax_gross_amount', 'Total Amount (Includes Tax)')}
            </label>
            <input
              id="tax-amount-input"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('tax_rate', 'Tax / VAT Rate (%)')}
            </label>
            <div className="relative">
              <input
                id="tax-rate-input"
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg focus:ring-2 focus:ring-emerald-500"
                placeholder="15"
              />
              <span className="absolute inset-y-0 end-0 pe-4 flex items-center text-slate-400 font-bold">%</span>
            </div>
          </div>
        </div>

        {/* Popular Preset Rates */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-slate-400 font-medium me-1">{t('lbl_presets', 'Presets:')}</span>
          {['5', '10', '15', '18', '20', '21'].map((rate) => (
            <button
              key={rate}
              onClick={() => setTaxRate(rate)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                taxRate === rate
                  ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
              }`}
            >
              {rate}%
            </button>
          ))}
        </div>

        {/* Results Breakdown */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-start">
            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                {t('tax_label_net', 'Net Price')}
              </span>
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                {netAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase">
                {t('tax_label_tax', 'Tax Amount')} ({numRate}%)
              </span>
              <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                +{taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                {t('tax_label_total', 'Final Total')}
              </span>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
                {totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-200 dark:border-slate-700">
            <button
              id="tax-copy-btn"
              onClick={() => {
                handleCopy(`Net: ${netAmount.toFixed(2)} | Tax (${numRate}%): ${taxAmount.toFixed(2)} | Total: ${totalAmount.toFixed(2)}`);
                handleSaveResult();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy Summary')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
