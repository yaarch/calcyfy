import React, { useState } from 'react';
import { useApp } from '../../../../context/AppContext';
import { Tool } from '../../../../types';
import { Copy, Check, DollarSign, Calendar, Percent, ShieldAlert } from 'lucide-react';

interface LoanAmortizationEngineProps {
  tool: Tool;
}

export const LoanAmortizationEngine: React.FC<LoanAmortizationEngineProps> = ({ tool }) => {
  const { t, addHistory } = useApp();
  const [copied, setCopied] = useState(false);

  // General loan state parameters
  const [balance, setBalance] = useState<string>('300000');
  const [rate, setRate] = useState<string>('6.5');
  const [termYears, setTermYears] = useState<string>('30');
  const [extraPayment, setExtraPayment] = useState<string>('200');
  const [newRate, setNewRate] = useState<string>('5.25');
  const [closingCosts, setClosingCosts] = useState<string>('4500');
  const [balloonYears, setBalloonYears] = useState<string>('7');
  const [armInitialYears, setArmInitialYears] = useState<string>('5');
  const [armExpectedCap, setArmExpectedCap] = useState<string>('8.5');
  const [mipRate, setMipRate] = useState<string>('0.55');
  const [vaFundingFeePercent, setVaFundingFeePercent] = useState<string>('2.15');

  const id = tool.id;

  const numBalance = Math.max(0, parseFloat(balance) || 0);
  const numRate = Math.max(0, parseFloat(rate) || 0);
  const numYears = Math.max(0.1, parseFloat(termYears) || 30);
  const numExtra = Math.max(0, parseFloat(extraPayment) || 0);
  const numNewRate = Math.max(0, parseFloat(newRate) || 0);
  const numClosingCosts = Math.max(0, parseFloat(closingCosts) || 0);
  const numBalloonYears = Math.max(1, parseFloat(balloonYears) || 7);
  const numArmInitialYears = Math.max(1, parseFloat(armInitialYears) || 5);
  const numArmExpectedCap = Math.max(0, parseFloat(armExpectedCap) || 8.5);
  const numMipRate = Math.max(0, parseFloat(mipRate) || 0.55);
  const numVaFundingFeePercent = Math.max(0, parseFloat(vaFundingFeePercent) || 2.15);

  // Helper standard monthly payment formula: P * (r*(1+r)^n)/((1+r)^n - 1)
  const calcMonthlyPayment = (principal: number, annualRatePct: number, years: number) => {
    if (principal <= 0 || years <= 0) return 0;
    const monthlyR = annualRatePct / 100 / 12;
    const totalMonths = years * 12;
    if (monthlyR === 0) return principal / totalMonths;
    return (principal * (monthlyR * Math.pow(1 + monthlyR, totalMonths))) / (Math.pow(1 + monthlyR, totalMonths) - 1);
  };

  let primaryLabel = 'Monthly Payment';
  let primaryValue = '$0.00';
  let secondaryMetrics: { label: string; value: string }[] = [];
  let formulaText = '';
  let disclaimer = 'Estimations are for planning purposes. Actual loan terms, APR, taxes, and insurance escrow vary by lender.';

  // 1. Loan Refinance (`loan-refinance`)
  if (id === 'loan-refinance') {
    const currPmt = calcMonthlyPayment(numBalance, numRate, numYears);
    const newPmt = calcMonthlyPayment(numBalance + numClosingCosts, numNewRate, numYears);
    const monthlySavings = currPmt - newPmt;
    const breakEvenMonths = monthlySavings > 0 ? Math.ceil(numClosingCosts / monthlySavings) : 0;
    const lifetimeSavings = monthlySavings * (numYears * 12) - numClosingCosts;

    primaryLabel = 'Monthly Savings After Refinance';
    primaryValue = monthlySavings >= 0 ? `+$${monthlySavings.toFixed(2)}/mo` : `-$${Math.abs(monthlySavings).toFixed(2)}/mo`;
    secondaryMetrics = [
      { label: 'Current Monthly Payment', value: `$${currPmt.toFixed(2)}` },
      { label: 'New Refinanced Payment', value: `$${newPmt.toFixed(2)}` },
      { label: 'Estimated Break-Even Point', value: breakEvenMonths > 0 ? `${breakEvenMonths} Months (${(breakEvenMonths / 12).toFixed(1)} yrs)` : 'No monthly savings' },
      { label: 'Net Lifetime Savings', value: `$${lifetimeSavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    ];
    formulaText = 'Monthly Savings = Current_Pmt - New_Pmt | Break-Even = Closing_Costs / Monthly_Savings';
  }
  // 2. Mortgage Early Payoff (`mortgage-payoff`)
  else if (id === 'mortgage-payoff') {
    const basePmt = calcMonthlyPayment(numBalance, numRate, numYears);
    const acceleratedPmt = basePmt + numExtra;
    const monthlyR = numRate / 100 / 12;

    // Simulation of amortization with extra payment
    let bal = numBalance;
    let monthsElapsed = 0;
    let totalInterestPaid = 0;
    const maxMonths = numYears * 12;

    while (bal > 0 && monthsElapsed < maxMonths) {
      const interestPmt = bal * monthlyR;
      const principalPmt = Math.min(bal, acceleratedPmt - interestPmt);
      if (principalPmt <= 0) break;
      totalInterestPaid += interestPmt;
      bal -= principalPmt;
      monthsElapsed++;
    }

    const baselineTotalInterest = (basePmt * maxMonths) - numBalance;
    const interestSavings = Math.max(0, baselineTotalInterest - totalInterestPaid);
    const yearsSaved = Math.max(0, (maxMonths - monthsElapsed) / 12);

    primaryLabel = 'Total Interest Saved';
    primaryValue = `$${interestSavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    secondaryMetrics = [
      { label: 'New Payoff Timeline', value: `${(monthsElapsed / 12).toFixed(1)} Years (${monthsElapsed} mos)` },
      { label: 'Time Saved Off Mortgage', value: `${yearsSaved.toFixed(1)} Years earlier` },
      { label: 'Accelerated Monthly Payment', value: `$${acceleratedPmt.toFixed(2)}/mo` },
      { label: 'Baseline Total Interest', value: `$${baselineTotalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    ];
    formulaText = 'Balance(m+1) = Balance(m) × (1 + r) - (Payment + Extra)';
  }
  // 3. Balloon Payment Loan (`balloon-payment-loan`)
  else if (id === 'balloon-payment-loan') {
    const amortPmt = calcMonthlyPayment(numBalance, numRate, numYears);
    const monthlyR = numRate / 100 / 12;
    const balloonMonths = numBalloonYears * 12;

    let bal = numBalance;
    let totalInterestDuringBalloon = 0;
    for (let m = 0; m < balloonMonths; m++) {
      const intPmt = bal * monthlyR;
      const prinPmt = amortPmt - intPmt;
      totalInterestDuringBalloon += intPmt;
      bal -= prinPmt;
    }

    primaryLabel = 'Lump-Sum Balloon Due';
    primaryValue = `$${Math.max(0, bal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    secondaryMetrics = [
      { label: 'Monthly Amortized Payment', value: `$${amortPmt.toFixed(2)}/mo` },
      { label: 'Balloon Due Date', value: `After ${numBalloonYears} Years (${balloonMonths} mos)` },
      { label: 'Principal Paid Before Balloon', value: `$${(numBalance - bal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
      { label: 'Interest Paid Before Balloon', value: `$${totalInterestDuringBalloon.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    ];
    formulaText = 'Balloon = Principal × (1+r)^n - Payment × [((1+r)^n - 1) / r]';
  }
  // 4. ARM Mortgage (`arm-mortgage-calc`)
  else if (id === 'arm-mortgage-calc') {
    const initialPmt = calcMonthlyPayment(numBalance, numRate, numYears);
    const monthlyR = numRate / 100 / 12;
    const initialMonths = numArmInitialYears * 12;
    let bal = numBalance;

    for (let m = 0; m < initialMonths; m++) {
      const intPmt = bal * monthlyR;
      const prinPmt = initialPmt - intPmt;
      bal -= prinPmt;
    }

    const remainingYears = Math.max(1, numYears - numArmInitialYears);
    const maxAdjustedPmt = calcMonthlyPayment(bal, numArmExpectedCap, remainingYears);

    primaryLabel = 'Initial Fixed Monthly Payment';
    primaryValue = `$${initialPmt.toFixed(2)}/mo`;
    secondaryMetrics = [
      { label: 'Initial Fixed Period', value: `${numArmInitialYears} Years @ ${numRate}%` },
      { label: 'Remaining Balance at Adjustment', value: `$${bal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
      { label: 'Max Adjusted Payment (Cap Rate)', value: `$${maxAdjustedPmt.toFixed(2)}/mo (@ ${numArmExpectedCap}%)` },
      { label: 'Max Monthly Payment Increase', value: `+$${(maxAdjustedPmt - initialPmt).toFixed(2)}/mo` },
    ];
    formulaText = 'Pmt_init = Amortize(P, r_init, N) | Pmt_adj = Amortize(Balance, r_cap, N - n_init)';
  }
  // 5. Jumbo Mortgage (`jumbo-mortgage-calc`)
  else if (id === 'jumbo-mortgage-calc') {
    const pmt = calcMonthlyPayment(numBalance, numRate, numYears);
    const totalCost = pmt * (numYears * 12);
    const totalInterest = totalCost - numBalance;

    primaryLabel = 'Jumbo Monthly Payment (P&I)';
    primaryValue = `$${pmt.toFixed(2)}/mo`;
    secondaryMetrics = [
      { label: 'Total Principal Financed', value: `$${numBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
      { label: 'Total Interest Over Term', value: `$${totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
      { label: 'Total Lifecycle Outlay', value: `$${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
      { label: 'Loan Type Classification', value: numBalance > 766550 ? 'Conforming Jumbo Tier' : 'Standard Conforming' },
    ];
    formulaText = 'Payment = Principal × [r(1+r)^n / ((1+r)^n - 1)]';
  }
  // 6. FHA Loan (`fha-loan-calc`)
  else if (id === 'fha-loan-calc') {
    const upfrontMip = numBalance * 0.0175; // 1.75% standard upfront FHA MIP
    const financedTotal = numBalance + upfrontMip;
    const basePmt = calcMonthlyPayment(financedTotal, numRate, numYears);
    const monthlyMip = (numBalance * (numMipRate / 100)) / 12;
    const totalMonthlyOutlay = basePmt + monthlyMip;

    primaryLabel = 'Total Monthly FHA Payment';
    primaryValue = `$${totalMonthlyOutlay.toFixed(2)}/mo`;
    secondaryMetrics = [
      { label: 'Principal & Interest (P&I)', value: `$${basePmt.toFixed(2)}/mo` },
      { label: 'Monthly FHA MIP Premium', value: `$${monthlyMip.toFixed(2)}/mo` },
      { label: 'Upfront MIP Financed (1.75%)', value: `$${upfrontMip.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
      { label: 'Total Base Financed Amount', value: `$${financedTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    ];
    formulaText = 'Total Monthly = Pmt(P + UpfrontMIP, r, n) + (P × Annual_MIP_Rate / 12)';
  }
  // 7. VA Loan (`va-loan-calc`)
  else if (id === 'va-loan-calc') {
    const fundingFeeAmount = numBalance * (numVaFundingFeePercent / 100);
    const financedTotal = numBalance + fundingFeeAmount;
    const basePmt = calcMonthlyPayment(financedTotal, numRate, numYears);
    const totalCost = basePmt * (numYears * 12);

    primaryLabel = 'VA Monthly Mortgage Payment';
    primaryValue = `$${basePmt.toFixed(2)}/mo`;
    secondaryMetrics = [
      { label: 'VA Funding Fee Amount', value: `$${fundingFeeAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${numVaFundingFeePercent}%)` },
      { label: 'Total Financed Loan Amount', value: `$${financedTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
      { label: 'Monthly Private Mortgage Insurance (PMI)', value: '$0.00 (VA Exempt)' },
      { label: 'Total Lifetime Loan Outlay', value: `$${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    ];
    formulaText = 'Financed = Base_Loan + (Base_Loan × Funding_Fee_Rate) | Monthly = Amortize(Financed, r, n)';
  }
  // 8. Full Amortization Schedule (`loan-amortization-schedule`)
  else {
    const pmt = calcMonthlyPayment(numBalance, numRate, numYears);
    const totalInterest = (pmt * numYears * 12) - numBalance;

    primaryLabel = 'Monthly Amortized Payment';
    primaryValue = `$${pmt.toFixed(2)}/mo`;
    secondaryMetrics = [
      { label: 'Principal Amount', value: `$${numBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
      { label: 'Interest-to-Principal Ratio', value: `${((totalInterest / (numBalance || 1)) * 100).toFixed(1)}%` },
      { label: 'Total Cumulative Interest', value: `$${totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
      { label: 'Total Payments (P+I)', value: `$${(pmt * numYears * 12).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    ];
    formulaText = 'Payment = P × [r(1+r)^n] / [(1+r)^n - 1]';
  }

  const handleCopy = () => {
    const summary = `${tool.name}: ${primaryLabel} = ${primaryValue} | ${secondaryMetrics.map(s => `${s.label}: ${s.value}`).join(' | ')}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    addHistory(tool.id, primaryLabel, primaryValue);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        {/* Input Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('loan_balance', 'Loan Amount / Balance ($)')}
            </label>
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
              placeholder="300000"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('interest_rate', 'Interest Rate (% APR)')}
            </label>
            <input
              type="number"
              step="0.05"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
              placeholder="6.5"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('loan_term_years', 'Loan Term (Years)')}
            </label>
            <input
              type="number"
              value={termYears}
              onChange={(e) => setTermYears(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
              placeholder="30"
            />
          </div>

          {id === 'loan-refinance' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('new_interest_rate', 'New Refinanced Rate (% APR)')}
                </label>
                <input
                  type="number"
                  step="0.05"
                  value={newRate}
                  onChange={(e) => setNewRate(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="5.25"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('closing_costs', 'Estimated Closing Costs ($)')}
                </label>
                <input
                  type="number"
                  value={closingCosts}
                  onChange={(e) => setClosingCosts(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="4500"
                />
              </div>
            </>
          )}

          {id === 'mortgage-payoff' && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('extra_monthly_pmt', 'Extra Monthly Principal ($/mo)')}
              </label>
              <input
                type="number"
                value={extraPayment}
                onChange={(e) => setExtraPayment(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                placeholder="200"
              />
            </div>
          )}

          {id === 'balloon-payment-loan' && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('balloon_term_years', 'Balloon Due Horizon (Years)')}
              </label>
              <input
                type="number"
                value={balloonYears}
                onChange={(e) => setBalloonYears(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                placeholder="7"
              />
            </div>
          )}

          {id === 'arm-mortgage-calc' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('arm_fixed_years', 'Initial Fixed Period (Years)')}
                </label>
                <input
                  type="number"
                  value={armInitialYears}
                  onChange={(e) => setArmInitialYears(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="5"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('arm_cap_rate', 'Max Expected Cap Rate (%)')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={armExpectedCap}
                  onChange={(e) => setArmExpectedCap(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                  placeholder="8.5"
                />
              </div>
            </>
          )}

          {id === 'fha-loan-calc' && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('fha_annual_mip', 'Annual MIP Rate (%)')}
              </label>
              <input
                type="number"
                step="0.05"
                value={mipRate}
                onChange={(e) => setMipRate(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                placeholder="0.55"
              />
            </div>
          )}

          {id === 'va-loan-calc' && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {t('va_funding_fee', 'VA Funding Fee Rate (%)')}
              </label>
              <input
                type="number"
                step="0.05"
                value={vaFundingFeePercent}
                onChange={(e) => setVaFundingFeePercent(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                placeholder="2.15"
              />
            </div>
          )}
        </div>

        {/* Primary Result Banner */}
        <div className="p-6 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              {primaryLabel}
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">
              {primaryValue}
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 self-start sm:self-center"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? t('copied', 'Copied!') : t('copy_summary', 'Copy Summary')}
          </button>
        </div>

        {/* Secondary Metrics Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {secondaryMetrics.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.label}</span>
              <span className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Mathematical Methodology & Safety Disclaimer */}
        <div className="p-4 bg-slate-100 dark:bg-slate-800/40 rounded-xl space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
          <div className="font-semibold text-slate-700 dark:text-slate-300">
            Formula: <code className="font-mono text-slate-800 dark:text-slate-200">{formulaText}</code>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0 text-amber-500" />
            <span>{disclaimer}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
