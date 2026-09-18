import React, { useState } from 'react';
import { ToolDef } from '../../../../types';
import { DollarSign, Check, Copy, Home, Percent, Clock, Calculator, ShieldCheck } from 'lucide-react';

interface RealEstatePersonalFinanceEngineProps {
  tool: ToolDef;
}

export const RealEstatePersonalFinanceEngine: React.FC<RealEstatePersonalFinanceEngineProps> = ({ tool }) => {
  const [copied, setCopied] = useState(false);

  // Real Estate Cap Rate & Yield State
  const [propertyPrice, setPropertyPrice] = useState<number>(350000);
  const [monthlyRent, setMonthlyRent] = useState<number>(2800);
  const [annualExpenses, setAnnualExpenses] = useState<number>(8000); // taxes, insurance, maintenance

  // HELOC Payment State
  const [helocDrawAmount, setHelocDrawAmount] = useState<number>(50000);
  const [drawRate, setDrawRate] = useState<number>(8.5); // %
  const [repayRate, setRepayRate] = useState<number>(9.0); // %
  const [drawYears, setDrawYears] = useState<number>(10);
  const [repayYears, setRepayYears] = useState<number>(15);

  // PMI Calculator State
  const [homeValue, setHomeValue] = useState<number>(400000);
  const [downPaymentPct, setDownPaymentPct] = useState<number>(10);
  const [pmiRatePct, setPmiRatePct] = useState<number>(0.75); // annual % of loan

  // Closing Costs State
  const [closingCostPct, setClosingCostPct] = useState<number>(3); // 2-5% average

  // Freelance Rate State
  const [targetAnnualIncome, setTargetAnnualIncome] = useState<number>(85000);
  const [annualOverhead, setAnnualOverhead] = useState<number>(12000);
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<number>(30);
  const [vacationWeeks, setVacationWeeks] = useState<number>(4);

  // VAT & Sales Tax State
  const [taxableAmount, setTaxableAmount] = useState<number>(100);
  const [vatRatePct, setVatRatePct] = useState<number>(20);

  // Salary Hourly State
  const [annualSalary, setAnnualSalary] = useState<number>(75000);
  const [weeklyHours, setWeeklyHours] = useState<number>(40);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const id = tool.id;

  // Real Estate Calculations
  const grossAnnualRent = monthlyRent * 12;
  const netOperatingIncome = grossAnnualRent - annualExpenses;
  const capRatePct = propertyPrice > 0 ? (netOperatingIncome / propertyPrice) * 100 : 0;
  const grossRentalYield = propertyPrice > 0 ? (grossAnnualRent / propertyPrice) * 100 : 0;
  const netRentalYield = propertyPrice > 0 ? (netOperatingIncome / propertyPrice) * 100 : 0;

  // HELOC Calculations
  const drawInterestOnlyMonthly = (helocDrawAmount * (drawRate / 100)) / 12;

  // PMI Calculations
  const loanAmount = homeValue * (1 - downPaymentPct / 100);
  const monthlyPmi = downPaymentPct < 20 ? (loanAmount * (pmiRatePct / 100)) / 12 : 0;

  // Closing Costs
  const estClosingCosts = propertyPrice * (closingCostPct / 100);

  // Freelance Rate
  const totalNeeded = targetAnnualIncome + annualOverhead;
  const workingWeeks = 52 - vacationWeeks;
  const totalBillableHours = workingWeeks * billableHoursPerWeek;
  const hourlyRateVal = totalBillableHours > 0 ? totalNeeded / totalBillableHours : 0;

  // VAT Tax
  const vatAmount = taxableAmount * (vatRatePct / 100);
  const totalWithVat = taxableAmount + vatAmount;

  // Salary Hourly
  const annualHours = weeklyHours * 52;
  const hourlyPayVal = annualHours > 0 ? annualSalary / annualHours : 0;

  return (
    <div id={`real-estate-personal-finance-engine-${id}`} className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-md">
          Real Estate, Tax & Credit Analytics Engine
        </span>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{tool.name}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{tool.description}</p>
      </div>

      {/* 1. CAP RATE & RENTAL YIELD */}
      {(id === 'cap-rate' || id === 'rental-yield' || id === 'rental-property-yield') && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Property Purchase Price ($)</label>
              <input
                type="number"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Monthly Rental Income ($)</label>
              <input
                type="number"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Annual Expenses (Taxes/Ins/Maint)</label>
              <input
                type="number"
                value={annualExpenses}
                onChange={(e) => setAnnualExpenses(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
              <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Cap Rate (NOI / Price)</span>
              <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
                {capRatePct.toFixed(2)}%
              </span>
              <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">${netOperatingIncome.toLocaleString()} NOI</span>
            </div>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
              <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Gross Rental Yield</span>
              <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
                {grossRentalYield.toFixed(2)}%
              </span>
              <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">${grossAnnualRent.toLocaleString()} Gross Rent</span>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
              <span className="text-xs font-bold uppercase text-slate-500">Net Rental Yield</span>
              <span className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1 block">
                {netRentalYield.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. FREELANCE HOURLY RATE */}
      {(id === 'freelance-rate' || id === 'freelance-rate-calc') && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Target Annual Take-Home ($)</label>
              <input
                type="number"
                value={targetAnnualIncome}
                onChange={(e) => setTargetAnnualIncome(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Annual Business Overhead ($)</label>
              <input
                type="number"
                value={annualOverhead}
                onChange={(e) => setAnnualOverhead(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Billable Hours / Week</label>
              <input
                type="number"
                value={billableHoursPerWeek}
                onChange={(e) => setBillableHoursPerWeek(parseFloat(e.target.value) || 1)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Vacation / Timeoff (Weeks)</label>
              <input
                type="number"
                value={vacationWeeks}
                onChange={(e) => setVacationWeeks(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
          </div>

          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
            <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Minimum Required Hourly Billable Rate</span>
            <span className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
              ${hourlyRateVal.toFixed(2)} / hour
            </span>
            <span className="text-xs text-slate-500 block mt-1 font-mono">
              Based on {totalBillableHours} billable hours/yr (${totalNeeded.toLocaleString()} total gross required)
            </span>
          </div>
        </div>
      )}

      {/* 3. SALARY TO HOURLY */}
      {id === 'salary-hourly' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Annual Salary ($)</label>
              <input
                type="number"
                value={annualSalary}
                onChange={(e) => setAnnualSalary(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Hours Worked per Week</label>
              <input
                type="number"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(parseFloat(e.target.value) || 1)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
            <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Equivalent Hourly Rate</span>
            <span className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
              ${hourlyPayVal.toFixed(2)} / hour
            </span>
          </div>
        </div>
      )}

      {/* 4. VAT TAX */}
      {id === 'vat-tax' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Net Amount ($)</label>
              <input
                type="number"
                value={taxableAmount}
                onChange={(e) => setTaxableAmount(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">VAT / Tax Rate (%)</label>
              <input
                type="number"
                step="0.5"
                value={vatRatePct}
                onChange={(e) => setVatRatePct(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
              <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">VAT / Sales Tax Amount</span>
              <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
                ${vatAmount.toFixed(2)}
              </span>
            </div>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
              <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Total Price (Gross)</span>
              <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
                ${totalWithVat.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
