import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tag, Percent, DollarSign, Copy, Check } from 'lucide-react';

export const DiscountCalculator: React.FC = () => {
  const { t, addHistory } = useApp();
  const [originalPrice, setOriginalPrice] = useState<string>('120');
  const [discountPercent, setDiscountPercent] = useState<string>('25');
  const [extraDiscountPercent, setExtraDiscountPercent] = useState<string>('0');
  const [salesTaxPercent, setSalesTaxPercent] = useState<string>('8');
  const [copied, setCopied] = useState(false);

  const calculateDiscount = () => {
    const original = parseFloat(originalPrice);
    const d1 = parseFloat(discountPercent) || 0;
    const d2 = parseFloat(extraDiscountPercent) || 0;
    const tax = parseFloat(salesTaxPercent) || 0;

    if (isNaN(original) || original <= 0) return null;

    // First discount
    const priceAfterD1 = original * (1 - d1 / 100);
    // Second extra discount (compounded on discounted price)
    const priceAfterD2 = priceAfterD1 * (1 - d2 / 100);

    const totalDiscountAmount = original - priceAfterD2;
    const effectiveDiscountPct = (totalDiscountAmount / original) * 100;

    // Sales tax
    const taxAmount = priceAfterD2 * (tax / 100);
    const finalPrice = priceAfterD2 + taxAmount;

    return {
      priceAfterDiscounts: priceAfterD2,
      totalDiscountAmount,
      effectiveDiscountPct,
      taxAmount,
      finalPrice,
    };
  };

  const res = calculateDiscount();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Original Price ($)
            </label>
            <input
              id="discount-original-price"
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="120"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Discount (%)
            </label>
            <div className="relative">
              <input
                id="discount-percent"
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg focus:ring-2 focus:ring-emerald-500"
                placeholder="25"
              />
              <span className="absolute inset-y-0 end-0 pe-4 flex items-center text-slate-400 font-bold">%</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Extra Coupon (%)
            </label>
            <div className="relative">
              <input
                id="discount-extra-percent"
                type="number"
                value={extraDiscountPercent}
                onChange={(e) => setExtraDiscountPercent(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg focus:ring-2 focus:ring-emerald-500"
                placeholder="0"
              />
              <span className="absolute inset-y-0 end-0 pe-4 flex items-center text-slate-400 font-bold">%</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Sales Tax (%)
            </label>
            <div className="relative">
              <input
                id="discount-tax-percent"
                type="number"
                value={salesTaxPercent}
                onChange={(e) => setSalesTaxPercent(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg focus:ring-2 focus:ring-emerald-500"
                placeholder="8"
              />
              <span className="absolute inset-y-0 end-0 pe-4 flex items-center text-slate-400 font-bold">%</span>
            </div>
          </div>
        </div>

        {res && (
          <div className="space-y-6 pt-2">
            {/* Primary Result */}
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  Final Price (with tax)
                </span>
                <div className="text-4xl font-extrabold text-emerald-950 dark:text-emerald-100 font-mono mt-1">
                  ${res.finalPrice.toFixed(2)}
                </div>
                <div className="text-xs text-emerald-700 dark:text-emerald-400 mt-1 font-semibold">
                  You save: ${res.totalDiscountAmount.toFixed(2)} ({res.effectiveDiscountPct.toFixed(1)}% off)
                </div>
              </div>

              <button
                id="discount-copy-btn"
                onClick={() => {
                  handleCopy(`Final Price: $${res.finalPrice.toFixed(2)}, Saved: $${res.totalDiscountAmount.toFixed(2)}`);
                  addHistory('discount', `$${originalPrice} with ${discountPercent}% off`, `$${res.finalPrice.toFixed(2)} (Save $${res.totalDiscountAmount.toFixed(2)})`);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? t('btn_copied') : t('btn_copy')}
              </button>
            </div>

            {/* Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Pre-Tax Price
                </span>
                <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-100 mt-1">
                  ${res.priceAfterDiscounts.toFixed(2)}
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Total Discount Savings
                </span>
                <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                  ${res.totalDiscountAmount.toFixed(2)}
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Sales Tax Added
                </span>
                <div className="text-xl font-bold font-mono text-slate-700 dark:text-slate-300 mt-1">
                  +${res.taxAmount.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
