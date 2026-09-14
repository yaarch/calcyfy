import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tool } from '../../types';
import { Copy, Check, Leaf } from 'lucide-react';

interface CarbonFootprintCalculatorProps {
  tool?: Tool;
}

export const CarbonFootprintCalculator: React.FC<CarbonFootprintCalculatorProps> = () => {
  const { t, addHistory } = useApp();
  const [kmDrivenPerWeek, setKmDrivenPerWeek] = useState<string>('250');
  const [flightHoursPerYear, setFlightHoursPerYear] = useState<string>('12');
  const [electricityKwhMonth, setElectricityKwhMonth] = useState<string>('400');
  const [copied, setCopied] = useState(false);

  const km = parseFloat(kmDrivenPerWeek) || 0;
  const flightHrs = parseFloat(flightHoursPerYear) || 0;
  const kwh = parseFloat(electricityKwhMonth) || 0;

  // Global EPA / IPCC Average Emissions Factor Estimates:
  // Car: ~0.12 kg CO2 / km -> annual = km * 52 * 0.12
  // Flights: ~90 kg CO2 / hr flight
  // Electricity: ~0.85 kg CO2 / kWh -> annual = kwh * 12 * 0.85
  const carEmissionsTonnes = (km * 52 * 0.12) / 1000;
  const flightEmissionsTonnes = (flightHrs * 90) / 1000;
  const electricEmissionsTonnes = (kwh * 12 * 0.85) / 1000;

  const totalCarbonTonnes = carEmissionsTonnes + flightEmissionsTonnes + electricEmissionsTonnes;

  // Average tree absorbs ~22 kg (0.022 tonnes) of CO2 per year
  const treesNeeded = Math.ceil(totalCarbonTonnes / 0.022);

  const handleCopy = () => {
    const summary = `Annual CO2 Footprint: ${totalCarbonTonnes.toFixed(2)} Tonnes (~${treesNeeded} trees needed to offset)`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    addHistory('carbon-footprint', 'Annual Emissions Calculation', summary);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('carbon_km_week', 'Car Driving (km / week)')}
            </label>
            <input
              id="carbon-km-input"
              type="number"
              value={kmDrivenPerWeek}
              onChange={(e) => setKmDrivenPerWeek(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
              placeholder="250"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('carbon_flights_yr', 'Flight Time (Hours / Year)')}
            </label>
            <input
              id="carbon-flights-input"
              type="number"
              value={flightHoursPerYear}
              onChange={(e) => setFlightHoursPerYear(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
              placeholder="12"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('carbon_kwh_month', 'Electricity Usage (kWh / Month)')}
            </label>
            <input
              id="carbon-kwh-input"
              type="number"
              value={electricityKwhMonth}
              onChange={(e) => setElectricityKwhMonth(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
              placeholder="400"
            />
          </div>
        </div>

        {/* Results */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center sm:text-start">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase text-emerald-600 dark:text-emerald-400">
                {t('carbon_total_co2', 'Annual Carbon Emissions (CO₂)')}
              </span>
              <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                {totalCarbonTonnes.toFixed(2)} Tonnes / year
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                {t('carbon_trees_offset', 'Trees Needed to Offset')}
              </span>
              <div className="text-3xl font-black font-mono text-slate-900 dark:text-white mt-1">
                🌳 ~{treesNeeded} Trees
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-200 dark:border-slate-700">
            <button
              id="carbon-copy-btn"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy Emissions Summary')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
