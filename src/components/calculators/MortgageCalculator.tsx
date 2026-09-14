import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Percent, ShieldCheck, Copy, Check } from 'lucide-react';

export const MortgageCalculator: React.FC = () => {
  const { t, addHistory } = useApp();
  const [homePrice, setHomePrice] = useState<string>('400000');
  const [downPaymentPct, setDownPaymentPct] = useState<string>('20');
  const [interestRate, setInterestRate] = useState<string>('6.8');
  const [loanTermYears, setLoanTermYears] = useState<string>('30');
  const [propertyTaxAnnual, setPropertyTaxAnnual] = useState<string>('4800');
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState<string>('1200');
  const [hoaMonthly, setHoaMonthly] = useState<string>('0');
  const [copied, setCopied] = useState(false);

  const calculateMortgage = () => {
    const price = parseFloat(homePrice);
    const downPct = parseFloat(downPaymentPct);
    const rate = parseFloat(interestRate);
    const years = parseFloat(loanTermYears);
    const propTax = parseFloat(propertyTaxAnnual) || 0;
    const insurance = parseFloat(homeInsuranceAnnual) || 0;
    const hoa = parseFloat(hoaMonthly) || 0;

    if (isNaN(price) || isNaN(downPct) || isNaN(rate) || isNaN(years) || price <= 0 || years <= 0) {
      return null;
    }

    const downPaymentAmount = (price * downPct) / 100;
    const loanPrincipal = price - downPaymentAmount;

    const n = years * 12;
    const r = rate / 100 / 12;

    let monthlyPrincipalInterest = 0;
    if (r === 0) {
      monthlyPrincipalInterest = loanPrincipal / n;
    } else {
      monthlyPrincipalInterest =
        (loanPrincipal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    }

    const monthlyTax = propTax / 12;
    const monthlyInsurance = insurance / 12;
    const monthlyTotal = monthlyPrincipalInterest + monthlyTax + monthlyInsurance + hoa;

    const totalLoanPayments = monthlyPrincipalInterest * n;
    const totalInterestPaid = totalLoanPayments - loanPrincipal;

    // Percentages for bar
    const piPct = (monthlyPrincipalInterest / monthlyTotal) * 100;
    const taxPct = (monthlyTax / monthlyTotal) * 100;
    const insPct = (monthlyInsurance / monthlyTotal) * 100;
    const hoaPct = (hoa / monthlyTotal) * 100;

    return {
      downPaymentAmount,
      loanPrincipal,
      monthlyPrincipalInterest,
      monthlyTax,
      monthlyInsurance,
      monthlyTotal,
      totalInterestPaid,
      totalLoanPayments,
      piPct,
      taxPct,
      insPct,
      hoaPct,
    };
  };

  const res = calculateMortgage();

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
              Home Purchase Price ($)
            </label>
            <input
              id="mortgage-home-price"
              type="number"
              value={homePrice}
              onChange={(e) => setHomePrice(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base focus:ring-2 focus:ring-emerald-500"
              placeholder="400000"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Down Payment (%)
            </label>
            <div className="relative">
              <input
                id="mortgage-down-pct"
                type="number"
                value={downPaymentPct}
                onChange={(e) => setDownPaymentPct(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base focus:ring-2 focus:ring-emerald-500"
                placeholder="20"
              />
              <span className="absolute inset-y-0 end-0 pe-4 flex items-center text-slate-400 font-bold">%</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Interest Rate (%)
            </label>
            <input
              id="mortgage-interest-rate"
              type="number"
              step="0.05"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base focus:ring-2 focus:ring-emerald-500"
              placeholder="6.8"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Loan Term
            </label>
            <select
              id="mortgage-term"
              value={loanTermYears}
              onChange={(e) => setLoanTermYears(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base focus:ring-2 focus:ring-emerald-500"
            >
              <option value="30">30 Years Fixed</option>
              <option value="20">20 Years Fixed</option>
              <option value="15">15 Years Fixed</option>
              <option value="10">10 Years Fixed</option>
            </select>
          </div>
        </div>

        {/* Optional Expenses */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800/60">
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Annual Property Taxes ($/yr)
            </label>
            <input
              id="mortgage-prop-tax"
              type="number"
              value={propertyTaxAnnual}
              onChange={(e) => setPropertyTaxAnnual(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Annual Home Insurance ($/yr)
            </label>
            <input
              id="mortgage-home-ins"
              type="number"
              value={homeInsuranceAnnual}
              onChange={(e) => setHomeInsuranceAnnual(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Monthly HOA Fees ($/mo)
            </label>
            <input
              id="mortgage-hoa"
              type="number"
              value={hoaMonthly}
              onChange={(e) => setHoaMonthly(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-mono"
            />
          </div>
        </div>

        {res && (
          <div className="space-y-6 pt-2">
            {/* Primary Payment Card */}
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  Total Monthly Payment
                </span>
                <div className="text-4xl font-extrabold text-emerald-950 dark:text-emerald-100 font-mono mt-1">
                  ${res.monthlyTotal.toFixed(2)}
                  <span className="text-base font-normal text-slate-500"> / month</span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Loan Principal: ${res.loanPrincipal.toLocaleString()} • Down Payment: ${res.downPaymentAmount.toLocaleString()}
                </div>
              </div>

              <button
                id="mortgage-copy-btn"
                onClick={() => {
                  handleCopy(`Monthly Payment: $${res.monthlyTotal.toFixed(2)} (P&I: $${res.monthlyPrincipalInterest.toFixed(2)})`);
                  addHistory('mortgage', `Mortgage $${homePrice} @ ${interestRate}%`, `$${res.monthlyTotal.toFixed(2)}/mo`);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? t('btn_copied') : t('btn_copy')}
              </button>
            </div>

            {/* Visual Breakdown Bar */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Monthly Payment Distribution
              </div>
              <div className="h-4 rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800">
                <div style={{ width: `${res.piPct}%` }} className="bg-emerald-500" title={`P&I: ${res.piPct.toFixed(1)}%`} />
                <div style={{ width: `${res.taxPct}%` }} className="bg-sky-500" title={`Tax: ${res.taxPct.toFixed(1)}%`} />
                <div style={{ width: `${res.insPct}%` }} className="bg-amber-500" title={`Insurance: ${res.insPct.toFixed(1)}%`} />
                <div style={{ width: `${res.hoaPct}%` }} className="bg-purple-500" title={`HOA: ${res.hoaPct.toFixed(1)}%`} />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-emerald-500 shrink-0" />
                  <span>
                    <strong>P &amp; I:</strong> ${res.monthlyPrincipalInterest.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-sky-500 shrink-0" />
                  <span>
                    <strong>Taxes:</strong> ${res.monthlyTax.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-amber-500 shrink-0" />
                  <span>
                    <strong>Insurance:</strong> ${res.monthlyInsurance.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-purple-500 shrink-0" />
                  <span>
                    <strong>HOA:</strong> ${(parseFloat(hoaMonthly) || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
