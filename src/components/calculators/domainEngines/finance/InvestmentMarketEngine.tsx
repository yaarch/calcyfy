import React, { useState } from 'react';
import { ToolDef } from '../../../../types';
import { DollarSign, Check, Copy, TrendingUp, ShieldAlert, Award, PiggyBank, Briefcase } from 'lucide-react';

interface InvestmentMarketEngineProps {
  tool: ToolDef;
}

export const InvestmentMarketEngine: React.FC<InvestmentMarketEngineProps> = ({ tool }) => {
  const [copied, setCopied] = useState(false);

  // ROI State
  const [initialInv, setInitialInv] = useState<number>(10000);
  const [finalValue, setFinalValue] = useState<number>(15000);
  const [holdingPeriodYrs, setHoldingPeriodYrs] = useState<number>(3);

  // Rule of 72 State
  const [expectedReturnRate, setExpectedReturnRate] = useState<number>(7); // %

  // Bond YTM State
  const [faceValue, setFaceValue] = useState<number>(1000);
  const [couponRate, setCouponRate] = useState<number>(5); // %
  const [bondPrice, setBondPrice] = useState<number>(950);
  const [yearsToMaturity, setYearsToMaturity] = useState<number>(10);

  // T-Bill Yield State
  const [tbillFace, setTbillFace] = useState<number>(10000);
  const [tbillPurchase, setTbillPurchase] = useState<number>(9800);
  const [tbillDays, setTbillDays] = useState<number>(91);

  // CD Ladder State
  const [cdInvestment, setCdInvestment] = useState<number>(20000);
  const [cdApy, setCdApy] = useState<number>(4.5); // %

  // Stock Beta & Sharpe Ratio State
  const [portfolioReturn, setPortfolioReturn] = useState<number>(12); // %
  const [riskFreeRate, setRiskFreeRate] = useState<number>(4); // %
  const [stdDeviation, setStdDeviation] = useState<number>(15); // %
  const [marketReturn, setMarketReturn] = useState<number>(10); // %

  // Net Worth State
  const [realEstateAssets, setRealEstateAssets] = useState<number>(450000);
  const [liquidAssets, setLiquidAssets] = useState<number>(60000);
  const [investmentAssets, setInvestmentAssets] = useState<number>(120000);
  const [mortgageDebt, setMortgageDebt] = useState<number>(310000);
  const [otherDebt, setOtherDebt] = useState<number>(25000);

  // Dividend Yield & DRIP State
  const [sharePrice, setSharePrice] = useState<number>(100);
  const [annualDividend, setAnnualDividend] = useState<number>(3.5);
  const [dripYears, setDripYears] = useState<number>(10);

  // Inflation State
  const [currentAmount, setCurrentAmount] = useState<number>(100000);
  const [inflationRate, setInflationRate] = useState<number>(3); // %
  const [horizonYears, setHorizonYears] = useState<number>(15);

  // 401(k) / Retirement State
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retireAge, setRetireAge] = useState<number>(65);
  const [currentBalance, setCurrentBalance] = useState<number>(25000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const id = tool.id;

  // Calculations
  const totalGain = finalValue - initialInv;
  const totalRoiPct = initialInv > 0 ? (totalGain / initialInv) * 100 : 0;
  const annualizedRoiPct = holdingPeriodYrs > 0 && initialInv > 0
    ? (Math.pow(finalValue / initialInv, 1 / holdingPeriodYrs) - 1) * 100
    : 0;

  const doublingYears = expectedReturnRate > 0 ? 72 / expectedReturnRate : 0;

  // Approx Bond YTM
  const annualCoupon = faceValue * (couponRate / 100);
  const ytmApprox = bondPrice > 0 && yearsToMaturity > 0
    ? ((annualCoupon + (faceValue - bondPrice) / yearsToMaturity) / ((faceValue + bondPrice) / 2)) * 100
    : 0;

  // T-Bill Yields
  const discountYield = tbillFace > 0 ? ((tbillFace - tbillPurchase) / tbillFace) * (360 / tbillDays) * 100 : 0;
  const investmentYield = tbillPurchase > 0 ? ((tbillFace - tbillPurchase) / tbillPurchase) * (365 / tbillDays) * 100 : 0;

  // Sharpe Ratio
  const sharpeRatio = stdDeviation > 0 ? (portfolioReturn - riskFreeRate) / stdDeviation : 0;

  // Net Worth
  const totalAssetsSum = realEstateAssets + liquidAssets + investmentAssets;
  const totalLiabilitiesSum = mortgageDebt + otherDebt;
  const netWorthVal = totalAssetsSum - totalLiabilitiesSum;

  // Dividend Yield
  const divYieldPct = sharePrice > 0 ? (annualDividend / sharePrice) * 100 : 0;

  // Inflation Future Purchasing Power
  const futureInflatedCost = currentAmount * Math.pow(1 + inflationRate / 100, horizonYears);
  const purchasingPowerVal = currentAmount / Math.pow(1 + inflationRate / 100, horizonYears);

  return (
    <div id={`investment-market-engine-${id}`} className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-md">
          Investment & Portfolio Analytics Engine
        </span>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{tool.name}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{tool.description}</p>
      </div>

      {/* 1. ROI CALCULATOR */}
      {id === 'roi-calculator' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Initial Investment ($)</label>
              <input
                type="number"
                value={initialInv}
                onChange={(e) => setInitialInv(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Final Value / Revenue ($)</label>
              <input
                type="number"
                value={finalValue}
                onChange={(e) => setFinalValue(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Holding Period (Years)</label>
              <input
                type="number"
                min="0.1"
                step="0.5"
                value={holdingPeriodYrs}
                onChange={(e) => setHoldingPeriodYrs(parseFloat(e.target.value) || 1)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
              <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Total ROI</span>
              <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
                {totalRoiPct.toFixed(2)}%
              </span>
              <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">${totalGain.toLocaleString()} Total Gain</span>
            </div>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
              <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Annualized ROI (CAGR)</span>
              <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
                {annualizedRoiPct.toFixed(2)}% / yr
              </span>
              <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">{holdingPeriodYrs} Year Horizon</span>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
              <span className="text-xs font-bold uppercase text-slate-500">Net Return ($)</span>
              <span className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1 block">
                ${totalGain.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. RULE OF 72 */}
      {id === 'rule-of-72' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
          <div className="space-y-1.5 max-w-sm">
            <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Expected Annual Interest Rate (%)</label>
            <input
              type="number"
              step="0.5"
              value={expectedReturnRate}
              onChange={(e) => setExpectedReturnRate(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
            />
          </div>

          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
            <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Time Required to Double Capital</span>
            <span className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
              {doublingYears.toFixed(2)} Years
            </span>
            <span className="text-xs text-slate-500 mt-1 block font-mono">
              Formula: Doubling Time ≈ 72 ÷ Interest Rate ({expectedReturnRate}%)
            </span>
          </div>
        </div>
      )}

      {/* 3. BOND YIELD TO MATURITY */}
      {(id === 'bond-yield-to-maturity' || id === 'treasury-bill-yield') && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Face Value ($)</label>
              <input
                type="number"
                value={faceValue}
                onChange={(e) => setFaceValue(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Current Bond Price ($)</label>
              <input
                type="number"
                value={bondPrice}
                onChange={(e) => setBondPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Coupon Rate (%)</label>
              <input
                type="number"
                step="0.25"
                value={couponRate}
                onChange={(e) => setCouponRate(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Years to Maturity</label>
              <input
                type="number"
                value={yearsToMaturity}
                onChange={(e) => setYearsToMaturity(parseFloat(e.target.value) || 1)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
            <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Yield to Maturity (Approx. YTM)</span>
            <span className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
              {ytmApprox.toFixed(2)}%
            </span>
          </div>
        </div>
      )}

      {/* 4. NET WORTH ESTIMATOR */}
      {id === 'net-worth' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-emerald-600">Assets (+)</h4>
              <div>
                <label className="text-xs text-slate-500 block">Real Estate Assets ($)</label>
                <input
                  type="number"
                  value={realEstateAssets}
                  onChange={(e) => setRealEstateAssets(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 block">Cash & Savings ($)</label>
                <input
                  type="number"
                  value={liquidAssets}
                  onChange={(e) => setLiquidAssets(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 block">Investment & Retirement ($)</label>
                <input
                  type="number"
                  value={investmentAssets}
                  onChange={(e) => setInvestmentAssets(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-rose-600">Liabilities (-)</h4>
              <div>
                <label className="text-xs text-slate-500 block">Mortgages ($)</label>
                <input
                  type="number"
                  value={mortgageDebt}
                  onChange={(e) => setMortgageDebt(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 block">Auto, Student & Credit Debt ($)</label>
                <input
                  type="number"
                  value={otherDebt}
                  onChange={(e) => setOtherDebt(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
            <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Total Net Worth</span>
            <span className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
              ${netWorthVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-xs text-slate-500 block mt-1 font-mono">
              Total Assets (${totalAssetsSum.toLocaleString()}) - Total Liabilities (${totalLiabilitiesSum.toLocaleString()})
            </span>
          </div>
        </div>
      )}

      {/* 5. DIVIDEND YIELD */}
      {(id === 'dividend-yield' || id === 'stock-dividend-yield') && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Stock Price per Share ($)</label>
              <input
                type="number"
                value={sharePrice}
                onChange={(e) => setSharePrice(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Annual Dividend per Share ($)</label>
              <input
                type="number"
                step="0.1"
                value={annualDividend}
                onChange={(e) => setAnnualDividend(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
            <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Dividend Yield</span>
            <span className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
              {divYieldPct.toFixed(2)}%
            </span>
          </div>
        </div>
      )}

      {/* 6. SHARPE RATIO & STOCK BETA VOLATILITY */}
      {(id === 'sharpe-ratio-calc' || id === 'stock-beta-volatility') && (() => {
        const sharpe = stdDeviation > 0 ? (portfolioReturn - riskFreeRate) / stdDeviation : 0;
        const betaVal = 1.15; // default beta metric
        const capmExpReturn = riskFreeRate + betaVal * (marketReturn - riskFreeRate);
        return (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Portfolio Return (%)</label>
                <input
                  type="number"
                  step="0.5"
                  value={portfolioReturn}
                  onChange={(e) => setPortfolioReturn(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Risk-Free Rate (Rf, %)</label>
                <input
                  type="number"
                  step="0.25"
                  value={riskFreeRate}
                  onChange={(e) => setRiskFreeRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Std Dev / Volatility (%)</label>
                <input
                  type="number"
                  step="0.5"
                  value={stdDeviation}
                  onChange={(e) => setStdDeviation(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Market Benchmark Return (%)</label>
                <input
                  type="number"
                  step="0.5"
                  value={marketReturn}
                  onChange={(e) => setMarketReturn(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Sharpe Ratio</span>
                <span className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
                  {sharpe.toFixed(2)}
                </span>
                <span className="text-xs text-slate-500 font-mono mt-1 block">Formula: (Portfolio Return - Rf) ÷ Standard Deviation</span>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">CAPM Expected Return (Beta = {betaVal})</span>
                <span className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
                  {capmExpReturn.toFixed(2)}%
                </span>
                <span className="text-xs text-slate-500 font-mono mt-1 block">Formula: Re = Rf + Beta × (Rm - Rf)</span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 7. INFLATION PURCHASING POWER */}
      {(id === 'inflation-impact' || id === 'inflation-future') && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Current Purchasing Power ($)</label>
              <input
                type="number"
                value={currentAmount}
                onChange={(e) => setCurrentAmount(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Annual Inflation Rate (%)</label>
              <input
                type="number"
                step="0.5"
                value={inflationRate}
                onChange={(e) => setInflationRate(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Time Horizon (Years)</label>
              <input
                type="number"
                value={horizonYears}
                onChange={(e) => setHorizonYears(parseFloat(e.target.value) || 1)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
              <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Future Purchasing Value</span>
              <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
                ${purchasingPowerVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl">
              <span className="text-xs font-bold uppercase text-rose-700 dark:text-rose-400">Future Inflated Cost</span>
              <span className="text-2xl font-black font-mono text-rose-600 dark:text-rose-300 mt-1 block">
                ${futureInflatedCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
