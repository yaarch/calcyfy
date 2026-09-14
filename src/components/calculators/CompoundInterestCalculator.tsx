import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp, DollarSign, Calendar, Copy, Check } from 'lucide-react';

export const CompoundInterestCalculator: React.FC = () => {
  const { t, addHistory } = useApp();
  const [initialPrincipal, setInitialPrincipal] = useState<string>('10000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('500');
  const [annualInterestRate, setAnnualInterestRate] = useState<string>('8');
  const [investmentYears, setInvestmentYears] = useState<string>('15');
  const [compoundFrequency, setCompoundFrequency] = useState<string>('12'); // 12 = monthly
  const [copied, setCopied] = useState(false);

  const calculateCompound = () => {
    const P = parseFloat(initialPrincipal) || 0;
    const PMT = parseFloat(monthlyContribution) || 0;
    const r = (parseFloat(annualInterestRate) || 0) / 100;
    const tYears = parseFloat(investmentYears) || 0;
    const n = parseFloat(compoundFrequency) || 12;

    if (tYears <= 0 || (P <= 0 && PMT <= 0)) return null;

    const totalPeriods = n * tYears;
    const ratePerPeriod = r / n;

    // Future value of initial principal
    const fvPrincipal = P * Math.pow(1 + ratePerPeriod, totalPeriods);

    // Future value of regular contributions (converted to contribution per compounding period)
    const pmtPerPeriod = (PMT * 12) / n;
    let fvAnnuity = 0;
    if (ratePerPeriod > 0) {
      fvAnnuity = pmtPerPeriod * ((Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod);
    } else {
      fvAnnuity = pmtPerPeriod * totalPeriods;
    }

    const totalBalance = fvPrincipal + fvAnnuity;
    const totalPrincipalDeposited = P + PMT * 12 * tYears;
    const totalInterestEarned = Math.max(0, totalBalance - totalPrincipalDeposited);

    return {
      totalBalance,
      totalPrincipalDeposited,
      totalInterestEarned,
      principalPct: (totalPrincipalDeposited / totalBalance) * 100,
      interestPct: (totalInterestEarned / totalBalance) * 100,
    };
  };

  const res = calculateCompound();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Initial Principal ($)
            </label>
            <input
              id="ci-initial"
              type="number"
              value={initialPrincipal}
              onChange={(e) => setInitialPrincipal(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base focus:ring-2 focus:ring-emerald-500"
              placeholder="10000"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Monthly Contribution ($)
            </label>
            <input
              id="ci-monthly"
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base focus:ring-2 focus:ring-emerald-500"
              placeholder="500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Annual Return Rate (%)
            </label>
            <input
              id="ci-rate"
              type="number"
              step="0.1"
              value={annualInterestRate}
              onChange={(e) => setAnnualInterestRate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base focus:ring-2 focus:ring-emerald-500"
              placeholder="8"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Investment Period (Years)
            </label>
            <input
              id="ci-years"
              type="number"
              value={investmentYears}
              onChange={(e) => setInvestmentYears(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base focus:ring-2 focus:ring-emerald-500"
              placeholder="15"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Compound Frequency
            </label>
            <select
              id="ci-frequency"
              value={compoundFrequency}
              onChange={(e) => setCompoundFrequency(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base focus:ring-2 focus:ring-emerald-500"
            >
              <option value="12">Compounded Monthly (12/year)</option>
              <option value="4">Compounded Quarterly (4/year)</option>
              <option value="2">Compounded Semi-Annually (2/year)</option>
              <option value="1">Compounded Annually (1/year)</option>
              <option value="365">Compounded Daily (365/year)</option>
            </select>
          </div>
        </div>

        {res && (
          <div className="space-y-6 pt-2">
            {/* Primary Result */}
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  Total Future Balance
                </span>
                <div className="text-4xl font-extrabold text-emerald-950 dark:text-emerald-100 font-mono mt-1">
                  ${res.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  After {investmentYears} years at {annualInterestRate}% average annual return
                </div>
              </div>

              <button
                id="ci-copy-btn"
                onClick={() => {
                  handleCopy(`Future Balance: $${res.totalBalance.toFixed(2)}, Interest: $${res.totalInterestEarned.toFixed(2)}`);
                  addHistory('compound-interest', `${investmentYears}yr Growth @ ${annualInterestRate}%`, `$${res.totalBalance.toFixed(2)}`);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? t('btn_copied') : t('btn_copy')}
              </button>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Total Principal Deposited
                </span>
                <div className="text-2xl font-bold font-mono text-slate-800 dark:text-slate-100 mt-1">
                  ${res.totalPrincipalDeposited.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <span className="text-xs text-slate-400 font-medium">({res.principalPct.toFixed(1)}% of total)</span>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Total Compound Interest Earned
                </span>
                <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                  ${res.totalInterestEarned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <span className="text-xs text-emerald-500 font-medium">({res.interestPct.toFixed(1)}% of total)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
