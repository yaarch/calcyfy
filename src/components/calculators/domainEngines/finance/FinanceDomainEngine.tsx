import React, { useState } from 'react';
import { ToolDef } from '../../../../types';
import { DollarSign, Check, Copy, TrendingUp, ShieldAlert, Award, Calendar } from 'lucide-react';

interface FinanceDomainEngineProps {
  tool: ToolDef;
}

export const FinanceDomainEngine: React.FC<FinanceDomainEngineProps> = ({ tool }) => {
  const [copied, setCopied] = useState(false);

  // Payback Period State
  const [initialInvestment, setInitialInvestment] = useState<number>(100000);
  const [annualCashInflow, setAnnualCashInflow] = useState<number>(25000);
  const [discountRate, setDiscountRate] = useState<number>(8);

  // Reverse VAT State
  const [grossPrice, setGrossPrice] = useState<number>(120);
  const [vatRate, setVatRate] = useState<number>(20);

  // Commission Calculator State
  const [salesVolume, setSalesVolume] = useState<number>(150000);
  const [baseSalary, setBaseSalary] = useState<number>(40000);
  const [commissionRate, setCommissionRate] = useState<number>(5);

  // Appreciation Calculator State
  const [currentAssetVal, setCurrentAssetVal] = useState<number>(250000);
  const [appreciationRate, setAppreciationRate] = useState<number>(4.5);
  const [appreciationYears, setAppreciationYears] = useState<number>(10);

  // Depreciation Straight Line State
  const [assetCost, setAssetCost] = useState<number>(50000);
  const [salvageVal, setSalvageVal] = useState<number>(5000);
  const [usefulLifeYrs, setUsefulLifeYrs] = useState<number>(5);

  // Debt Snowball State
  const [debts, setDebts] = useState<Array<{ id: number; name: string; balance: number; rate: number; minPayment: number }>>([
    { id: 1, name: 'Credit Card A', balance: 3000, rate: 18.9, minPayment: 90 },
    { id: 2, name: 'Auto Loan B', balance: 12000, rate: 5.5, minPayment: 250 },
    { id: 3, name: 'Personal Loan C', balance: 6000, rate: 9.2, minPayment: 150 }
  ]);
  const [extraMonthlyPmt, setExtraMonthlyPmt] = useState<number>(200);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 1. Payback Period Calculation
  const calcPaybackPeriod = () => {
    const simpleYears = annualCashInflow > 0 ? initialInvestment / annualCashInflow : 0;
    let discountedYears = 0;
    let cumulativeDiscounted = 0;
    const r = discountRate / 100;

    for (let yr = 1; yr <= 50; yr++) {
      const discountedInflow = annualCashInflow / Math.pow(1 + r, yr);
      if (cumulativeDiscounted + discountedInflow >= initialInvestment) {
        const remainingNeeded = initialInvestment - cumulativeDiscounted;
        discountedYears = (yr - 1) + (remainingNeeded / discountedInflow);
        break;
      }
      cumulativeDiscounted += discountedInflow;
    }

    return { simpleYears, discountedYears };
  };

  // 2. Reverse VAT Calculation
  const calcReverseVat = () => {
    const netAmount = grossPrice / (1 + vatRate / 100);
    const vatAmount = grossPrice - netAmount;
    return { netAmount, vatAmount };
  };

  // 3. Sales Commission Calculation
  const calcCommission = () => {
    const commissionEarnings = salesVolume * (commissionRate / 100);
    const totalEarnings = baseSalary + commissionEarnings;
    const effectiveCommissionPct = totalEarnings > 0 ? (commissionEarnings / totalEarnings) * 100 : 0;
    return { commissionEarnings, totalEarnings, effectiveCommissionPct };
  };

  // 4. Asset Appreciation Calculation
  const calcAppreciation = () => {
    const futureVal = currentAssetVal * Math.pow(1 + appreciationRate / 100, appreciationYears);
    const totalGain = futureVal - currentAssetVal;
    const pctGain = currentAssetVal > 0 ? (totalGain / currentAssetVal) * 100 : 0;
    return { futureVal, totalGain, pctGain };
  };

  // 5. Straight Line Depreciation Calculation
  const calcDepreciation = () => {
    const depreciableBase = Math.max(0, assetCost - salvageVal);
    const annualDepreciation = usefulLifeYrs > 0 ? depreciableBase / usefulLifeYrs : 0;
    const depreciationRatePct = usefulLifeYrs > 0 ? (1 / usefulLifeYrs) * 100 : 0;

    const schedule: Array<{ year: number; depExpense: number; accumDep: number; bookValue: number }> = [];
    let accum = 0;
    for (let y = 1; y <= usefulLifeYrs; y++) {
      accum += annualDepreciation;
      schedule.push({
        year: y,
        depExpense: annualDepreciation,
        accumDep: accum,
        bookValue: Math.max(salvageVal, assetCost - accum)
      });
    }

    return { depreciableBase, annualDepreciation, depreciationRatePct, schedule };
  };

  // 6. Debt Snowball Calculation
  const calcDebtSnowball = () => {
    // Sort debts by lowest balance first (snowball method)
    const sortedDebts = [...debts].sort((a, b) => a.balance - b.balance);
    let totalInitialBalance = debts.reduce((acc, d) => acc + d.balance, 0);
    let totalMinPayment = debts.reduce((acc, d) => acc + d.minPayment, 0);
    let availableBudget = totalMinPayment + extraMonthlyPmt;

    let months = 0;
    let totalInterestPaid = 0;
    const debtStates = sortedDebts.map(d => ({ ...d, currentBalance: d.balance }));

    while (months < 360) {
      const activeDebts = debtStates.filter(d => d.currentBalance > 0.01);
      if (activeDebts.length === 0) break;
      months++;

      let leftoverExtra = extraMonthlyPmt;

      // Accrue monthly interest and pay minimums
      for (const d of activeDebts) {
        const monthlyInterest = d.currentBalance * (d.rate / 100 / 12);
        totalInterestPaid += monthlyInterest;
        d.currentBalance += monthlyInterest;

        const pmt = Math.min(d.currentBalance, d.minPayment);
        d.currentBalance -= pmt;
      }

      // Roll remaining snowball budget into lowest active debt
      const lowestActive = activeDebts.find(d => d.currentBalance > 0.01);
      if (lowestActive) {
        const extraPmt = Math.min(lowestActive.currentBalance, leftoverExtra);
        lowestActive.currentBalance -= extraPmt;
      }
    }

    return { totalInitialBalance, totalMinPayment, availableBudget, months, totalInterestPaid, sortedDebts };
  };

  return (
    <div id={`finance-domain-engine-${tool.id}`} className="max-w-4xl mx-auto space-y-6">
      {/* Tool Header Card */}
      <div id="finance-header-card" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-md">
            Financial & Fiscal Analytics Engine
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{tool.name}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{tool.description}</p>
      </div>

      {/* PAYBACK PERIOD TOOL */}
      {tool.id === 'payback-period' && (() => {
        const { simpleYears, discountedYears } = calcPaybackPeriod();
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Initial Investment ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Annual Cash Inflow ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={annualCashInflow}
                    onChange={(e) => setAnnualCashInflow(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Discount Rate (%)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={discountRate}
                    onChange={(e) => setDiscountRate(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Simple Payback Period</span>
                  <span className="text-2xl font-mono font-bold text-emerald-900 dark:text-emerald-200 mt-1 block">
                    {simpleYears.toFixed(2)} Years
                  </span>
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 font-mono mt-0.5 block">
                    {(simpleYears * 12).toFixed(1)} Months
                  </span>
                </div>

                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Discounted Payback Period (@ {discountRate}%)</span>
                  <span className="text-2xl font-mono font-bold text-emerald-900 dark:text-emerald-200 mt-1 block">
                    {discountedYears > 0 ? `${discountedYears.toFixed(2)} Years` : 'Exceeds 50 Years'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* REVERSE VAT TOOL */}
      {tool.id === 'vat-reverse' && (() => {
        const { netAmount, vatAmount } = calcReverseVat();
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Gross Price (Tax Inclusive)</label>
                  <input
                    type="number"
                    min="0"
                    value={grossPrice}
                    onChange={(e) => setGrossPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">VAT / Tax Rate (%)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={vatRate}
                    onChange={(e) => setVatRate(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Net Price (Excluding Tax)</span>
                  <span className="text-2xl font-mono font-bold text-emerald-900 dark:text-emerald-200 mt-1 block">
                    ${netAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 font-mono mt-0.5 block">
                    Formula: Gross / (1 + Rate/100)
                  </span>
                </div>

                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Extracted Tax Amount</span>
                  <span className="text-2xl font-mono font-bold text-emerald-900 dark:text-emerald-200 mt-1 block">
                    ${vatAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 font-mono mt-0.5 block">
                    Formula: Gross - Net Amount
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* SALES COMMISSION TOOL */}
      {tool.id === 'commission-calc' && (() => {
        const { commissionEarnings, totalEarnings, effectiveCommissionPct } = calcCommission();
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Total Sales Volume ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={salesVolume}
                    onChange={(e) => setSalesVolume(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Base Salary ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={baseSalary}
                    onChange={(e) => setBaseSalary(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Commission Rate (%)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Commission Payout</span>
                  <span className="text-2xl font-mono font-bold text-emerald-900 dark:text-emerald-200 mt-1 block">
                    ${commissionEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Total Compensation</span>
                  <span className="text-2xl font-mono font-bold text-emerald-900 dark:text-emerald-200 mt-1 block">
                    ${totalEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Commission Share of Total</span>
                  <span className="text-xl font-mono font-semibold text-slate-900 dark:text-white mt-1 block">
                    {effectiveCommissionPct.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ASSET APPRECIATION TOOL */}
      {tool.id === 'appreciation-calc' && (() => {
        const { futureVal, totalGain, pctGain } = calcAppreciation();
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Initial Asset Value ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={currentAssetVal}
                    onChange={(e) => setCurrentAssetVal(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Annual Growth Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={appreciationRate}
                    onChange={(e) => setAppreciationRate(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Time Horizon (Years)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={appreciationYears}
                    onChange={(e) => setAppreciationYears(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Future Value (FV)</span>
                  <span className="text-2xl font-mono font-bold text-emerald-900 dark:text-emerald-200 mt-1 block">
                    ${futureVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Total Asset Appreciation</span>
                  <span className="text-2xl font-mono font-bold text-emerald-900 dark:text-emerald-200 mt-1 block">
                    ${totalGain.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Percentage Gain</span>
                  <span className="text-xl font-mono font-semibold text-slate-900 dark:text-white mt-1 block">
                    +{pctGain.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* STRAIGHT LINE DEPRECIATION TOOL */}
      {tool.id === 'depreciation-straight' && (() => {
        const { depreciableBase, annualDepreciation, schedule } = calcDepreciation();
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Initial Purchase Cost ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={assetCost}
                    onChange={(e) => setAssetCost(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Salvage Value ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={salvageVal}
                    onChange={(e) => setSalvageVal(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Useful Life (Years)</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={usefulLifeYrs}
                    onChange={(e) => setUsefulLifeYrs(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Annual Depreciation Expense</span>
                  <span className="text-2xl font-mono font-bold text-emerald-900 dark:text-emerald-200 mt-1 block">
                    ${annualDepreciation.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / year
                  </span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Total Depreciable Base</span>
                  <span className="text-2xl font-mono font-bold text-slate-900 dark:text-white mt-1 block">
                    ${depreciableBase.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Depreciation Schedule Table */}
              <div className="pt-2">
                <h4 className="text-xs font-semibold uppercase text-slate-500 mb-3">Straight-Line Depreciation Schedule</h4>
                <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase font-mono border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th className="p-2.5">Year</th>
                        <th className="p-2.5">Depreciation Expense</th>
                        <th className="p-2.5">Accumulated Dep.</th>
                        <th className="p-2.5">Ending Book Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-slate-900 dark:text-slate-200">
                      {schedule.map((row) => (
                        <tr key={row.year} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                          <td className="p-2.5 font-bold">Year {row.year}</td>
                          <td className="p-2.5">${row.depExpense.toFixed(2)}</td>
                          <td className="p-2.5">${row.accumDep.toFixed(2)}</td>
                          <td className="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">${row.bookValue.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* DEBT SNOWBALL TOOL */}
      {tool.id === 'debt-snowball' && (() => {
        const { totalInitialBalance, totalMinPayment, availableBudget, months, totalInterestPaid, sortedDebts } = calcDebtSnowball();
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 dark:text-white text-base">Debt Portfolio & Snowball Extra Monthly Payment</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Extra Monthly Snowball Payment ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={extraMonthlyPmt}
                    onChange={(e) => setExtraMonthlyPmt(parseFloat(e.target.value) || 0)}
                    className="w-48 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Debt Inventory List */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase text-slate-500">Debts (Sorted by Lowest Balance for Snowball Roll)</h4>
                <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                  {sortedDebts.map((d, idx) => (
                    <div key={d.id} className="p-3 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-white">{idx + 1}. {d.name}</span>
                        <span className="text-slate-500 block font-mono">APR: {d.rate}%</span>
                      </div>
                      <div className="text-right font-mono">
                        <span className="font-bold text-slate-900 dark:text-white block">${d.balance.toLocaleString()}</span>
                        <span className="text-slate-500 text-[11px]">Min Pmt: ${d.minPayment}/mo</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Debt Payoff Duration</span>
                  <span className="text-2xl font-mono font-bold text-emerald-900 dark:text-emerald-200 mt-1 block">
                    {months} Months
                  </span>
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 font-mono mt-0.5 block">
                    {(months / 12).toFixed(1)} Years
                  </span>
                </div>

                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Total Interest Paid</span>
                  <span className="text-2xl font-mono font-bold text-emerald-900 dark:text-emerald-200 mt-1 block">
                    ${totalInterestPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Total Monthly Outflow</span>
                  <span className="text-xl font-mono font-semibold text-slate-900 dark:text-white mt-1 block">
                    ${availableBudget.toLocaleString()}/mo
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
