import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tool } from '../../types';
import { Copy, Check, Fuel, Navigation } from 'lucide-react';

interface FuelCostCalculatorProps {
  tool?: Tool;
}

export const FuelCostCalculator: React.FC<FuelCostCalculatorProps> = () => {
  const { t, addHistory } = useApp();
  const [distance, setDistance] = useState<string>('350');
  const [consumption, setConsumption] = useState<string>('8.5'); // L/100km or MPG
  const [fuelPrice, setFuelPrice] = useState<string>('2.33'); // price per L or Gal
  const [copied, setCopied] = useState(false);

  const numDist = parseFloat(distance) || 0;
  const numCons = parseFloat(consumption) || 0;
  const numPrice = parseFloat(fuelPrice) || 0;

  // L/100km formula: Total Fuel = (Distance / 100) * Consumption
  const totalFuelNeeded = (numDist / 100) * numCons;
  const totalCost = totalFuelNeeded * numPrice;
  const costPerKm = numDist > 0 ? totalCost / numDist : 0;

  const handleCopy = () => {
    const summary = `Fuel Needed: ${totalFuelNeeded.toFixed(2)} L | Total Cost: $${totalCost.toFixed(2)}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    addHistory('fuel-cost', `${numDist} km @ $${numPrice}/L`, summary);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('fuel_distance', 'Trip Distance (km)')}
            </label>
            <input
              id="fuel-dist-input"
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
              placeholder="350"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('fuel_consumption', 'Fuel Efficiency (L/100km)')}
            </label>
            <input
              id="fuel-cons-input"
              type="number"
              value={consumption}
              onChange={(e) => setConsumption(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
              placeholder="8.5"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('fuel_price', 'Fuel Price per Liter ($)')}
            </label>
            <input
              id="fuel-price-input"
              type="number"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
              placeholder="2.33"
            />
          </div>
        </div>

        {/* Results */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase text-emerald-600 dark:text-emerald-400">
                {t('fuel_total_cost', 'Estimated Fuel Cost')}
              </span>
              <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                ${totalCost.toFixed(2)}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                {t('fuel_total_volume', 'Fuel Volume Needed')}
              </span>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                {totalFuelNeeded.toFixed(2)} Liters
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                {t('fuel_cost_km', 'Cost per Kilometer')}
              </span>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                ${costPerKm.toFixed(3)}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-200 dark:border-slate-700">
            <button
              id="fuel-copy-btn"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy Fuel Summary')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
