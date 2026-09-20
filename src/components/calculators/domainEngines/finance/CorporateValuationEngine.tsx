import React, { useState } from 'react';
import { ToolDef } from '../../../../types';
import { DollarSign, Check, Copy, TrendingUp, ShieldAlert, Award, PieChart, BarChart3, Percent } from 'lucide-react';

interface CorporateValuationEngineProps {
  tool: ToolDef;
}

export const CorporateValuationEngine: React.FC<CorporateValuationEngineProps> = ({ tool }) => {
  const [copied, setCopied] = useState(false);

  // WACC State
  const [equityValue, setEquityValue] = useState<number>(700000);
  const [debtValue, setDebtValue] = useState<number>(300000);
  const [costOfEquity, setCostOfEquity] = useState<number>(10); // %
  const [costOfDebt, setCostOfDebt] = useState<number>(5);     // %
  const [taxRate, setTaxRate] = useState<number>(21);          // %

  // NPV & IRR State
  const [initialOutlay, setInitialOutlay] = useState<number>(100000);
  const [cashFlows, setCashFlows] = useState<number[]>([30000, 35000, 40000, 45000, 50000]);
  const [npvDiscountRate, setNpvDiscountRate] = useState<number>(8); // %

  // EBITDA State
  const [revenue, setRevenue] = useState<number>(5000000);
  const [cogs, setCogs] = useState<number>(2000000);
  const [opexExclDep, setOpexExclDep] = useState<number>(1500000);
  const [depreciation, setDepreciation] = useState<number>(300000);
  const [amortization, setAmortization] = useState<number>(100000);

  // Margins State
  const [operatingIncome, setOperatingIncome] = useState<number>(1100000);

  // EV / EBITDA State
  const [marketCap, setMarketCap] = useState<number>(10000000);
  const [totalDebt, setTotalDebt] = useState<number>(3000000);
  const [cashEquiv, setCashEquiv] = useState<number>(1500000);
  const [ebitdaMultipleVal, setEbitdaMultipleVal] = useState<number>(2300000);

  // Break-Even State
  const [fixedCosts, setFixedCosts] = useState<number>(50000);
  const [pricePerUnit, setPricePerUnit] = useState<number>(100);
  const [variableCostPerUnit, setVariableCostPerUnit] = useState<number>(60);

  // SaaS MRR/ARR & CAC/LTV State
  const [activeSubscribers, setActiveSubscribers] = useState<number>(500);
  const [arpu, setArpu] = useState<number>(100);
  const [monthlyChurnRate, setMonthlyChurnRate] = useState<number>(2.5);
  const [marketingCosts, setMarketingCosts] = useState<number>(20000);
  const [newCustomers, setNewCustomers] = useState<number>(100);

  // Burn Rate & Runway State
  const [cashBalance, setCashBalance] = useState<number>(500000);
  const [monthlyGrossBurn, setMonthlyGrossBurn] = useState<number>(60000);
  const [monthlyRev, setMonthlyRev] = useState<number>(20000);

  // Financial Ratios State
  const [avgInventory, setAvgInventory] = useState<number>(400000);
  const [cashAndEquiv, setCashAndEquiv] = useState<number>(150000);
  const [marketableSec, setMarketableSec] = useState<number>(50000);
  const [accountsReceivable, setAccountsReceivable] = useState<number>(200000);
  const [currentLiabilities, setCurrentLiabilities] = useState<number>(250000);
  const [ebit, setEbit] = useState<number>(800000);
  const [totalAssets, setTotalAssets] = useState<number>(4000000);
  const [netIncome, setNetIncome] = useState<number>(600000);
  const [shareholdersEquity, setShareholdersEquity] = useState<number>(2500000);
  const [prefDividends, setPrefDividends] = useState<number>(0);
  const [commonShares, setCommonShares] = useState<number>(1000000);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const id = tool.id;

  // 1. WACC Calculation
  const calcWacc = () => {
    const totalV = equityValue + debtValue;
    if (totalV <= 0) return { waccPct: 0, weightE: 0, weightD: 0 };
    const wE = equityValue / totalV;
    const wD = debtValue / totalV;
    const afterTaxCostDebt = costOfDebt * (1 - taxRate / 100);
    const waccPct = (wE * costOfEquity) + (wD * afterTaxCostDebt);
    return { waccPct, weightE: wE * 100, weightD: wD * 100, afterTaxCostDebt };
  };

  // 2. NPV Calculation
  const calcNpv = () => {
    const r = npvDiscountRate / 100;
    let presentValSum = 0;
    cashFlows.forEach((cf, idx) => {
      presentValSum += cf / Math.pow(1 + r, idx + 1);
    });
    const npv = presentValSum - initialOutlay;
    const irrApprox = calcIrrVal();
    return { npv, presentValSum, irrApprox };
  };

  // 3. IRR Newton-Raphson approximation
  const calcIrrVal = () => {
    let rate = 0.1; // initial guess
    for (let iter = 0; iter < 100; iter++) {
      let npvVal = -initialOutlay;
      let dNpv = 0;
      for (let t = 0; t < cashFlows.length; t++) {
        npvVal += cashFlows[t] / Math.pow(1 + rate, t + 1);
        dNpv -= ((t + 1) * cashFlows[t]) / Math.pow(1 + rate, t + 2);
      }
      if (Math.abs(npvVal) < 0.0001) break;
      if (Math.abs(dNpv) < 1e-10) break;
      const nextRate = rate - npvVal / dNpv;
      if (isNaN(nextRate) || nextRate < -0.99 || nextRate > 10) break;
      rate = nextRate;
    }
    return rate * 100;
  };

  // 4. EBITDA Calculation
  const calcEbitda = () => {
    const grossProfit = revenue - cogs;
    const ebitda = grossProfit - opexExclDep;
    const totalDA = depreciation + amortization;
    const ebitVal = ebitda - totalDA;
    const ebitdaMargin = revenue > 0 ? (ebitda / revenue) * 100 : 0;
    const grossMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
    return { grossProfit, ebitda, ebitVal, totalDA, ebitdaMargin, grossMargin };
  };

  // 5. Break-Even Calculation
  const calcBreakEven = () => {
    const cm = pricePerUnit - variableCostPerUnit;
    const cmRatio = pricePerUnit > 0 ? cm / pricePerUnit : 0;
    const breakEvenUnits = cm > 0 ? Math.ceil(fixedCosts / cm) : 0;
    const breakEvenRevenue = cmRatio > 0 ? fixedCosts / cmRatio : 0;
    return { cm, cmRatioPct: cmRatio * 100, breakEvenUnits, breakEvenRevenue };
  };

  // 6. SaaS MRR/ARR & CAC/LTV
  const calcSaasMetrics = () => {
    const mrr = activeSubscribers * arpu;
    const arr = mrr * 12;
    const cac = newCustomers > 0 ? marketingCosts / newCustomers : 0;
    const grossMarginPct = 0.8; // standard 80% SaaS margin
    const avgLifetimeMonths = monthlyChurnRate > 0 ? 100 / monthlyChurnRate : 0;
    const ltv = arpu * grossMarginPct * avgLifetimeMonths;
    const ltvCacRatio = cac > 0 ? ltv / cac : 0;
    return { mrr, arr, cac, ltv, ltvCacRatio, avgLifetimeMonths };
  };

  // 7. Burn Rate & Runway
  const calcBurnRunway = () => {
    const netBurn = monthlyGrossBurn - monthlyRev;
    const runwayMonths = netBurn > 0 ? cashBalance / netBurn : 999;
    return { netBurn, runwayMonths };
  };

  return (
    <div id={`corporate-valuation-engine-${id}`} className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-md">
            Corporate Finance & Investment Valuation
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{tool.name}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{tool.description}</p>
      </div>

      {/* 1. WACC CALCULATOR */}
      {id === 'wacc-calculator' && (() => {
        const { waccPct, weightE, weightD, afterTaxCostDebt } = calcWacc();
        return (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Market Value of Equity ($E)
                </label>
                <input
                  type="number"
                  value={equityValue}
                  onChange={(e) => setEquityValue(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Market Value of Debt ($D)
                </label>
                <input
                  type="number"
                  value={debtValue}
                  onChange={(e) => setDebtValue(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Cost of Equity (CAPM Re, %)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={costOfEquity}
                  onChange={(e) => setCostOfEquity(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Pre-Tax Cost of Debt (Rd, %)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={costOfDebt}
                  onChange={(e) => setCostOfDebt(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Corporate Tax Rate (Tc, %)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
            </div>

            <div className="p-5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">
                  Weighted Average Cost of Capital (WACC)
                </span>
                <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1">
                  {waccPct.toFixed(2)}%
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(`WACC = ${waccPct.toFixed(2)}% | Equity Weight: ${weightE.toFixed(1)}%, Debt Weight: ${weightD.toFixed(1)}%`)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Summary'}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 block">Total Capital (V)</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">${(equityValue + debtValue).toLocaleString()}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 block">Equity Weight (E/V)</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{weightE.toFixed(1)}%</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 block">Debt Weight (D/V)</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{weightD.toFixed(1)}%</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 block">After-Tax Rd</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{afterTaxCostDebt.toFixed(2)}%</span>
              </div>
            </div>

            <div className="p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg text-xs font-mono text-slate-600 dark:text-slate-400">
              Formula: WACC = (E/V × Re) + [D/V × Rd × (1 - Tc)]
            </div>
          </div>
        );
      })()}

      {/* 2. NPV & IRR CALCULATOR */}
      {(id === 'npv-calculator' || id === 'irr-calculator') && (() => {
        const { npv, presentValSum, irrApprox } = calcNpv();
        return (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Initial Cash Outlay ($)
                </label>
                <input
                  type="number"
                  value={initialOutlay}
                  onChange={(e) => setInitialOutlay(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Discount / Hurdle Rate (%)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={npvDiscountRate}
                  onChange={(e) => setNpvDiscountRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-2">
                Annual Cash Inflows (Years 1 to 5)
              </label>
              <div className="grid grid-cols-5 gap-2">
                {cashFlows.map((cf, idx) => (
                  <div key={idx}>
                    <span className="text-[10px] text-slate-400 block font-mono">Year {idx + 1}</span>
                    <input
                      type="number"
                      value={cf}
                      onChange={(e) => {
                        const newCF = [...cashFlows];
                        newCF[idx] = parseFloat(e.target.value) || 0;
                        setCashFlows(newCF);
                      }}
                      className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Net Present Value (NPV)</span>
                <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
                  ${npv.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-[11px] text-slate-500 block mt-1">
                  {npv >= 0 ? 'Positive Net Present Value (NPV ≥ $0)' : 'Negative Net Present Value (NPV < $0)'}
                </span>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Internal Rate of Return (IRR)</span>
                <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
                  {irrApprox.toFixed(2)}%
                </span>
                <span className="text-[11px] text-slate-500 block mt-1">
                  {irrApprox >= npvDiscountRate ? 'Exceeds Hurdle Rate' : 'Below Hurdle Rate'}
                </span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 3. EBITDA & MARGIN CALCULATOR */}
      {(id === 'ebitda-calculator' || id === 'gross-margin-calculator' || id === 'operating-margin-calculator') && (() => {
        const { grossProfit, ebitda, ebitVal, totalDA, ebitdaMargin, grossMargin } = calcEbitda();
        const opMargin = revenue > 0 ? (ebitVal / revenue) * 100 : 0;
        return (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Total Gross Revenue ($)</label>
                <input
                  type="number"
                  value={revenue}
                  onChange={(e) => setRevenue(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Cost of Goods Sold ($ COGS)</label>
                <input
                  type="number"
                  value={cogs}
                  onChange={(e) => setCogs(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">OpEx (Excl. D&A, $)</label>
                <input
                  type="number"
                  value={opexExclDep}
                  onChange={(e) => setOpexExclDep(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Depreciation Expense ($)</label>
                <input
                  type="number"
                  value={depreciation}
                  onChange={(e) => setDepreciation(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Amortization Expense ($)</label>
                <input
                  type="number"
                  value={amortization}
                  onChange={(e) => setAmortization(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Gross Margin</span>
                <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
                  {grossMargin.toFixed(1)}%
                </span>
                <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">${grossProfit.toLocaleString()} Profit</span>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">EBITDA & Margin</span>
                <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
                  {ebitdaMargin.toFixed(1)}%
                </span>
                <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">${ebitda.toLocaleString()} EBITDA</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-xs font-bold uppercase text-slate-500">Operating Margin (EBIT)</span>
                <span className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1 block">
                  {opMargin.toFixed(1)}%
                </span>
                <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">${ebitVal.toLocaleString()} EBIT</span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 4. EV / EBITDA MULTIPLE */}
      {id === 'ev-ebitda-multiple' && (() => {
        const netDebt = totalDebt - cashEquiv;
        const ev = marketCap + netDebt;
        const multiple = ebitdaMultipleVal > 0 ? ev / ebitdaMultipleVal : 0;

        const getMultipleBadge = (m: number) => {
          if (m <= 0) return { label: 'Negative / Unprofitable', color: 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400' };
          if (m < 6) return { label: 'Deep Value (< 6.0x)', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300' };
          if (m <= 10) return { label: 'Fair / Value Range (6x–10x)', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300' };
          if (m <= 15) return { label: 'Growth / Quality (10x–15x)', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300' };
          return { label: 'Premium / High Growth (> 15.0x)', color: 'bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300' };
        };

        const badge = getMultipleBadge(multiple);

        return (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Quick Scenarios:</span>
              <button
                type="button"
                onClick={() => {
                  setMarketCap(10000000);
                  setTotalDebt(3000000);
                  setCashEquiv(1500000);
                  setEbitdaMultipleVal(2300000);
                }}
                className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium transition"
              >
                Standard Example (5.0x)
              </button>
              <button
                type="button"
                onClick={() => {
                  setMarketCap(45000000);
                  setTotalDebt(6000000);
                  setCashEquiv(11000000);
                  setEbitdaMultipleVal(3200000);
                }}
                className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium transition"
              >
                Tech SaaS (12.5x)
              </button>
              <button
                type="button"
                onClick={() => {
                  setMarketCap(20000000);
                  setTotalDebt(8000000);
                  setCashEquiv(1000000);
                  setEbitdaMultipleVal(3600000);
                }}
                className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium transition"
              >
                Industrial Mid-Cap (7.5x)
              </button>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Market Capitalization ($)
                </label>
                <input
                  type="number"
                  value={marketCap}
                  onChange={(e) => setMarketCap(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">Equity value (shares × price)</span>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Total Debt ($)
                </label>
                <input
                  type="number"
                  value={totalDebt}
                  onChange={(e) => setTotalDebt(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">Short-term & long-term debt</span>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Cash & Equivalents ($)
                </label>
                <input
                  type="number"
                  value={cashEquiv}
                  onChange={(e) => setCashEquiv(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">Liquid cash & securities</span>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Annual EBITDA ($)
                </label>
                <input
                  type="number"
                  value={ebitdaMultipleVal}
                  onChange={(e) => setEbitdaMultipleVal(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">Operating cash earnings</span>
              </div>
            </div>

            {/* Results Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Enterprise Value (EV)
                </span>
                <span className="text-3xl font-black font-mono text-slate-900 dark:text-white mt-1 block">
                  ${ev.toLocaleString()}
                </span>
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 font-mono">
                  <span>Net Debt: ${netDebt.toLocaleString()}</span>
                  <span>•</span>
                  <span>EV = Market Cap + Debt - Cash</span>
                </div>
              </div>

              <div className="p-5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                    EV / EBITDA Multiple
                  </span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${badge.color}`}>
                    {badge.label}
                  </span>
                </div>
                <span className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
                  {multiple.toFixed(2)}x
                </span>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-mono mt-2 block">
                  Multiple = ${ev.toLocaleString()} EV ÷ ${ebitdaMultipleVal.toLocaleString()} EBITDA
                </span>
              </div>
            </div>

            {/* Step-by-Step Breakdown */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Mathematical Verification
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-slate-600 dark:text-slate-300">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-sans">1. Net Debt</div>
                  <div className="font-semibold text-slate-900 dark:text-white mt-0.5">${totalDebt.toLocaleString()} - ${cashEquiv.toLocaleString()} = ${netDebt.toLocaleString()}</div>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-sans">2. Enterprise Value</div>
                  <div className="font-semibold text-slate-900 dark:text-white mt-0.5">${marketCap.toLocaleString()} + ${netDebt.toLocaleString()} = ${ev.toLocaleString()}</div>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-sans">3. EV/EBITDA Multiple</div>
                  <div className="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">${ev.toLocaleString()} ÷ ${ebitdaMultipleVal.toLocaleString()} = {multiple.toFixed(2)}x</div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 5. BREAK-EVEN CALCULATOR */}
      {(id === 'break-even' || id === 'break-even-point') && (() => {
        const { cm, cmRatioPct, breakEvenUnits, breakEvenRevenue } = calcBreakEven();
        return (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Total Fixed Costs ($)</label>
                <input
                  type="number"
                  value={fixedCosts}
                  onChange={(e) => setFixedCosts(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Selling Price per Unit ($)</label>
                <input
                  type="number"
                  value={pricePerUnit}
                  onChange={(e) => setPricePerUnit(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Variable Cost per Unit ($)</label>
                <input
                  type="number"
                  value={variableCostPerUnit}
                  onChange={(e) => setVariableCostPerUnit(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Break-Even Point (Units)</span>
                <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
                  {breakEvenUnits.toLocaleString()} Units
                </span>
                <span className="text-[11px] text-slate-500 font-mono block mt-0.5">Contribution Margin: ${cm.toFixed(2)}/unit</span>
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Break-Even Sales Revenue ($)</span>
                <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
                  ${breakEvenRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-[11px] text-slate-500 font-mono block mt-0.5">Contribution Ratio: {cmRatioPct.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 6. SAAS & STARTUP METRICS */}
      {(id === 'saas-mrr-arr-calc' || id === 'cac-ltv-ratio' || id === 'burn-rate-runway') && (() => {
        const { mrr, arr, cac, ltv, ltvCacRatio, avgLifetimeMonths } = calcSaasMetrics();
        const { netBurn, runwayMonths } = calcBurnRunway();
        return (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Active Subscribers</label>
                <input
                  type="number"
                  value={activeSubscribers}
                  onChange={(e) => setActiveSubscribers(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Avg Revenue per User (ARPU, $)</label>
                <input
                  type="number"
                  value={arpu}
                  onChange={(e) => setArpu(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Monthly Churn Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={monthlyChurnRate}
                  onChange={(e) => setMonthlyChurnRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Marketing Cost ($)</label>
                <input
                  type="number"
                  value={marketingCosts}
                  onChange={(e) => setMarketingCosts(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">New Customers Acquired</label>
                <input
                  type="number"
                  value={newCustomers}
                  onChange={(e) => setNewCustomers(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Cash Balance ($)</label>
                <input
                  type="number"
                  value={cashBalance}
                  onChange={(e) => setCashBalance(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                <span className="text-[11px] font-bold text-emerald-700 uppercase block">MRR</span>
                <span className="text-xl font-mono font-bold text-emerald-600 dark:text-emerald-300">${mrr.toLocaleString()}</span>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                <span className="text-[11px] font-bold text-emerald-700 uppercase block">ARR</span>
                <span className="text-xl font-mono font-bold text-emerald-600 dark:text-emerald-300">${arr.toLocaleString()}</span>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                <span className="text-[11px] font-bold text-emerald-700 uppercase block">LTV : CAC Ratio</span>
                <span className="text-xl font-mono font-bold text-emerald-600 dark:text-emerald-300">{ltvCacRatio.toFixed(1)}x</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">Runway</span>
                <span className="text-xl font-mono font-bold text-slate-900 dark:text-white">{runwayMonths.toFixed(1)} Mo</span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 7. FINANCIAL RATIOS (ROCE, ROE, ROA, EPS, Quick Ratio, Inventory Turnover) */}
      {(id === 'inventory-turnover' || id === 'quick-ratio-acid-test' || id === 'roce-calculator' || id === 'roe-calculator' || id === 'roa-calculator' || id === 'per-share-earnings') && (() => {
        const quickRatio = currentLiabilities > 0 ? (cashAndEquiv + marketableSec + accountsReceivable) / currentLiabilities : 0;
        const invTurnover = avgInventory > 0 ? cogs / avgInventory : 0;
        const dsi = invTurnover > 0 ? 365 / invTurnover : 0;
        const capitalEmployed = totalAssets - currentLiabilities;
        const rocePct = capitalEmployed > 0 ? (ebit / capitalEmployed) * 100 : 0;
        const roePct = shareholdersEquity > 0 ? (netIncome / shareholdersEquity) * 100 : 0;
        const roaPct = totalAssets > 0 ? (netIncome / totalAssets) * 100 : 0;
        const epsVal = commonShares > 0 ? (netIncome - prefDividends) / commonShares : 0;

        return (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Net Income ($)</label>
                <input
                  type="number"
                  value={netIncome}
                  onChange={(e) => setNetIncome(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Total Assets ($)</label>
                <input
                  type="number"
                  value={totalAssets}
                  onChange={(e) => setTotalAssets(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Shareholders' Equity ($)</label>
                <input
                  type="number"
                  value={shareholdersEquity}
                  onChange={(e) => setShareholdersEquity(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                <span className="text-[11px] font-bold text-emerald-700 uppercase block">ROE</span>
                <span className="text-xl font-mono font-bold text-emerald-600 dark:text-emerald-300">{roePct.toFixed(2)}%</span>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                <span className="text-[11px] font-bold text-emerald-700 uppercase block">ROA</span>
                <span className="text-xl font-mono font-bold text-emerald-600 dark:text-emerald-300">{roaPct.toFixed(2)}%</span>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                <span className="text-[11px] font-bold text-emerald-700 uppercase block">ROCE</span>
                <span className="text-xl font-mono font-bold text-emerald-600 dark:text-emerald-300">{rocePct.toFixed(2)}%</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">EPS</span>
                <span className="text-xl font-mono font-bold text-slate-900 dark:text-white">${epsVal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
