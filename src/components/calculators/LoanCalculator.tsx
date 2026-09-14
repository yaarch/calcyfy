import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, DollarSign, Calendar, Copy, Check, Table } from 'lucide-react';

export const LoanCalculator: React.FC = () => {
  const { t, addHistory } = useApp();
  const [loanAmount, setLoanAmount] = useState<string>('25000');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [termYears, setTermYears] = useState<string>('5');
  const [copied, setCopied] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const calculateLoan = () => {
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const years = parseFloat(termYears);

    if (isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || annualRate < 0 || years <= 0) {
      return null;
    }

    const n = years * 12;
    const r = annualRate / 100 / 12;

    let monthlyPayment = 0;
    if (r === 0) {
      monthlyPayment = P / n;
    } else {
      monthlyPayment = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    }

    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - P;

    // Amortization preview (yearly)
    let balance = P;
    const schedule: { year: number; principalPaid: number; interestPaid: number; remainingBalance: number }[] = [];

    for (let y = 1; y <= Math.min(years, 30); y++) {
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;

      for (let m = 1; m <= 12; m++) {
        const interestM = balance * r;
        const principalM = monthlyPayment - interestM;
        yearlyInterest += interestM;
        yearlyPrincipal += principalM;
        balance = Math.max(0, balance - principalM);
      }

      schedule.push({
        year: y,
        principalPaid: yearlyPrincipal,
        interestPaid: yearlyInterest,
        remainingBalance: balance,
      });
    }

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
      schedule,
    };
  };

  const res = calculateLoan();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Loan Amount ($)
            </label>
            <input
              id="loan-amount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="25000"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Interest Rate (% per year)
            </label>
            <input
              id="loan-rate"
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="6.5"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Loan Term (Years)
            </label>
            <input
              id="loan-term"
              type="number"
              value={termYears}
              onChange={(e) => setTermYears(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-lg focus:ring-2 focus:ring-emerald-500"
              placeholder="5"
            />
          </div>
        </div>

        {res && (
          <div className="space-y-6 pt-2">
            {/* Primary Payment Card */}
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  Monthly Payment (EMI)
                </span>
                <div className="text-4xl font-extrabold text-emerald-950 dark:text-emerald-100 font-mono mt-1">
                  ${res.monthlyPayment.toFixed(2)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="loan-copy-btn"
                  onClick={() => {
                    handleCopy(`Monthly Payment: $${res.monthlyPayment.toFixed(2)}, Total Interest: $${res.totalInterest.toFixed(2)}`);
                    addHistory('loan', `Loan $${loanAmount} @ ${interestRate}%`, `$${res.monthlyPayment.toFixed(2)}/mo`);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? t('btn_copied') : t('btn_copy')}
                </button>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Total Interest Paid
                </span>
                <div className="text-2xl font-bold font-mono text-rose-600 dark:text-rose-400 mt-1">
                  ${res.totalInterest.toFixed(2)}
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Total Payments (Principal + Interest)
                </span>
                <div className="text-2xl font-bold font-mono text-slate-800 dark:text-slate-100 mt-1">
                  ${res.totalPayment.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Amortization Schedule Accordion */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <button
                id="loan-toggle-schedule"
                onClick={() => setShowSchedule(!showSchedule)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <span className="flex items-center gap-2">
                  <Table className="w-4 h-4 text-emerald-500" />
                  Yearly Amortization Schedule
                </span>
                <span>{showSchedule ? '▲ Hide' : '▼ View Table'}</span>
              </button>

              {showSchedule && (
                <div className="p-4 overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                        <th className="pb-2 font-semibold">Year</th>
                        <th className="pb-2 font-semibold">Principal</th>
                        <th className="pb-2 font-semibold">Interest</th>
                        <th className="pb-2 font-semibold">Ending Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                      {res.schedule.map((row) => (
                        <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                          <td className="py-2.5 font-bold">Year {row.year}</td>
                          <td className="py-2.5 text-emerald-600 dark:text-emerald-400">
                            ${row.principalPaid.toFixed(2)}
                          </td>
                          <td className="py-2.5 text-rose-500">
                            ${row.interestPaid.toFixed(2)}
                          </td>
                          <td className="py-2.5 text-slate-700 dark:text-slate-300">
                            ${row.remainingBalance.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
