import React, { useState } from 'react';
import { useApp } from '../../../../context/AppContext';
import { Tool } from '../../../../types';
import { Copy, Check, DollarSign, TrendingUp, ShieldCheck, PieChart } from 'lucide-react';

interface InvestmentTaxEngineProps {
  tool: Tool;
}

export const InvestmentTaxEngine: React.FC<InvestmentTaxEngineProps> = ({ tool }) => {
  const { t, formatCurrency, addHistory } = useApp();
  const [copied, setCopied] = useState(false);

  // States
  const [initialInvestment, setInitialInvestment] = useState<string>('50000');
  const [annualContribution, setAnnualContribution] = useState<string>('6000');
  const [years, setYears] = useState<string>('15');
  const [priceGrowthRate, setPriceGrowthRate] = useState<string>('7');
  const [dividendYield, setDividendYield] = useState<string>('3.5');
  const [purchasePrice, setPurchasePrice] = useState<string>('20000');
  const [salePrice, setSalePrice] = useState<string>('45000');
  const [holdingPeriodMonths, setHoldingPeriodMonths] = useState<string>('24');
  const [annualIncome, setAnnualIncome] = useState<string>('95000');
  const [annualSpending, setAnnualSpending] = useState<string>('60000');
  const [swrPercent, setSwrPercent] = useState<string>('4.0');
  const [currentPortfolio, setCurrentPortfolio] = useState<string>('250000');
  const [savingsRatePercent, setSavingsRatePercent] = useState<string>('40');
  const [rsuSharesVested, setRsuSharesVested] = useState<string>('500');
  const [fmvAtVesting, setFmvAtVesting] = useState<string>('120');
  const [finalStockPrice, setFinalStockPrice] = useState<string>('160');
  const [spotPrice, setSpotPrice] = useState<string>('100');
  const [strikePrice, setStrikePrice] = useState<string>('105');
  const [timeToMaturityYears, setTimeToMaturityYears] = useState<string>('0.5');
  const [riskFreeRate, setRiskFreeRate] = useState<string>('4.5');
  const [volatilityPercent, setVolatilityPercent] = useState<string>('25');
  const [tBillPrice, setTBillPrice] = useState<string>('98.25');
  const [tBillDays, setTBillDays] = useState<string>('182');

  const id = tool.id;

  const numInit = Math.max(0, parseFloat(initialInvestment) || 50000);
  const numContrib = Math.max(0, parseFloat(annualContribution) || 6000);
  const numYears = Math.max(1, Math.min(50, parseFloat(years) || 15));
  const numPriceGrowth = parseFloat(priceGrowthRate) || 7;
  const numDivYield = parseFloat(dividendYield) || 3.5;
  const numBuy = parseFloat(purchasePrice) || 20000;
  const numSell = parseFloat(salePrice) || 45000;
  const numHolding = parseFloat(holdingPeriodMonths) || 24;
  const numIncome = parseFloat(annualIncome) || 95000;
  const numSpend = Math.max(1000, parseFloat(annualSpending) || 60000);
  const numSwr = Math.max(1, Math.min(10, parseFloat(swrPercent) || 4.0));
  const numPortfolio = parseFloat(currentPortfolio) || 250000;
  const numSaveRate = parseFloat(savingsRatePercent) || 40;
  const numRsuShares = parseFloat(rsuSharesVested) || 500;
  const numFmv = parseFloat(fmvAtVesting) || 120;
  const numFinalStock = parseFloat(finalStockPrice) || 160;
  const numSpot = parseFloat(spotPrice) || 100;
  const numStrike = parseFloat(strikePrice) || 105;
  const numT = Math.max(0.01, parseFloat(timeToMaturityYears) || 0.5);
  const numR = (parseFloat(riskFreeRate) || 4.5) / 100;
  const numSigma = (parseFloat(volatilityPercent) || 25) / 100;
  const numTbPrice = parseFloat(tBillPrice) || 98.25;
  const numTbDays = Math.max(1, parseFloat(tBillDays) || 182);

  let primaryLabel = 'Investment Metric';
  let primaryValue = '$0.00';
  let secondaryMetrics: { label: string; value: string }[] = [];
  let formulaText = '';

  // Standard normal cumulative distribution function approximation (Abramowitz & Stegun)
  const normCdf = (x: number) => {
    const b1 = 0.319381530;
    const b2 = -0.356563782;
    const b3 = 1.781477937;
    const b4 = -1.821255978;
    const b5 = 1.330274429;
    const p = 0.2316419;
    const c = 0.3989422804014327; // 1 / sqrt(2*pi)

    if (x >= 0.0) {
      const k = 1.0 / (1.0 + p * x);
      return 1.0 - c * Math.exp(-x * x / 2.0) * k * (b1 + k * (b2 + k * (b3 + k * (b4 + k * b5))));
    } else {
      const k = 1.0 / (1.0 - p * x);
      return c * Math.exp(-x * x / 2.0) * k * (b1 + k * (b2 + k * (b3 + k * (b4 + k * b5))));
    }
  };

  // 1. DRIP Dividend Reinvestment (`dividend-reinvestment-drip`)
  if (id === 'dividend-reinvestment-drip') {
    const totalReturnRate = (numPriceGrowth + numDivYield) / 100;
    let balanceDrip = numInit;
    let balanceNoDrip = numInit;
    let totalDividendsCollected = 0;

    for (let yr = 1; yr <= numYears; yr++) {
      // With DRIP: compounded together
      balanceDrip = (balanceDrip + numContrib) * (1 + totalReturnRate);
      // Without DRIP: only price appreciation compounded
      const divPayout = balanceNoDrip * (numDivYield / 100);
      totalDividendsCollected += divPayout;
      balanceNoDrip = (balanceNoDrip + numContrib) * (1 + numPriceGrowth / 100);
    }

    const dripAdvantage = balanceDrip - (balanceNoDrip + totalDividendsCollected);

    primaryLabel = `Portfolio Value after ${numYears} Years (with DRIP)`;
    primaryValue = formatCurrency(balanceDrip);
    secondaryMetrics = [
      { label: 'Without Reinvestment (Cash Payout)', value: formatCurrency(balanceNoDrip + totalDividendsCollected) },
      { label: 'DRIP Compounding Premium', value: `+${formatCurrency(dripAdvantage)}` },
      { label: 'Annual Total Return (Yield + Growth)', value: `${(numPriceGrowth + numDivYield).toFixed(2)}%` },
      { label: 'Total Invested Capital', value: formatCurrency(numInit + numContrib * numYears) },
    ];
    formulaText = 'FV_DRIP = P(1 + r_total)^n + PMT × [((1 + r_total)^n - 1) / r_total]';
  }
  // 2. Capital Gains Tax (`capital-gains-tax`, `crypto-tax-fifo-hifo`)
  else if (id === 'capital-gains-tax' || id === 'crypto-tax-fifo-hifo') {
    const gain = numSell - numBuy;
    const isLongTerm = numHolding >= 12;
    let taxRate = 0;

    if (!isLongTerm) {
      // Short term = Ordinary income tax rate bracket approximation
      if (numIncome > 190000) taxRate = 0.32;
      else if (numIncome > 100000) taxRate = 0.24;
      else taxRate = 0.22;
    } else {
      // Long term capital gains rate
      if (numIncome > 500000) taxRate = 0.20;
      else if (numIncome > 47000) taxRate = 0.15;
      else taxRate = 0.00;
    }

    // Net Investment Income Tax (NIIT 3.8% if income > $200k)
    const niitRate = numIncome > 200000 ? 0.038 : 0;
    const totalEffectiveTaxRate = taxRate + niitRate;
    const totalTaxDue = Math.max(0, gain * totalEffectiveTaxRate);
    const netProceeds = numSell - totalTaxDue;

    primaryLabel = 'Estimated Capital Gains Tax Due';
    primaryValue = formatCurrency(totalTaxDue);
    secondaryMetrics = [
      { label: 'Net Realized Capital Gain', value: formatCurrency(gain) },
      { label: 'Holding Classification', value: isLongTerm ? 'Long-Term (≥ 12 Months)' : 'Short-Term (< 12 Months, Ordinary Rate)' },
      { label: 'Statutory Federal Tax Rate', value: `${(taxRate * 100).toFixed(1)}%` },
      { label: 'Net After-Tax Take-Home Proceeds', value: formatCurrency(netProceeds) },
    ];
    formulaText = 'Tax = Realized Gain × (Federal Bracket + NIIT 3.8% if applicable)';
  }
  // 3. Safe Withdrawal Rate (`safe-withdrawal-rate`)
  else if (id === 'safe-withdrawal-rate') {
    const safeAnnualWithdrawal = numPortfolio * (numSwr / 100);
    const safeMonthlyIncome = safeAnnualWithdrawal / 12;
    const portfolioLifespan = numSwr <= 4.0 ? '30+ Years (95%+ Trinity Historical Success)' : numSwr <= 5.0 ? '20-25 Years' : 'High Depletion Risk (< 15 Years)';

    primaryLabel = `Safe Annual Retirement Withdrawal (${numSwr}%)`;
    primaryValue = formatCurrency(safeAnnualWithdrawal);
    secondaryMetrics = [
      { label: 'Safe Monthly Cash Flow', value: formatCurrency(safeMonthlyIncome) },
      { label: 'Required Nest Egg for $60k/yr', value: formatCurrency(60000 / (numSwr / 100)) },
      { label: 'Historical Trinity Study Survivability', value: portfolioLifespan },
      { label: 'Inflation Adjustment Baseline', value: 'Adjusted annually by CPI inflation' },
    ];
    formulaText = 'Annual Withdrawal = Portfolio Balance × SWR% (Bengen 4% Rule)';
  }
  // 4. FIRE Calculator (`fire-financial-independence`)
  else if (id === 'fire-financial-independence') {
    const fireNumber = numSpend * (100 / numSwr);
    const annualSavings = (numIncome * (numSaveRate / 100));
    const annualGrowthRate = 0.07; // 7% real real-return
    // Solve for years to reach fireNumber from currentPortfolio with annualSavings
    let simPortfolio = numPortfolio;
    let yearsToFire = 0;
    while (simPortfolio < fireNumber && yearsToFire < 60) {
      simPortfolio = simPortfolio * (1 + annualGrowthRate) + annualSavings;
      yearsToFire++;
    }

    primaryLabel = 'Your FIRE Target Nest Egg';
    primaryValue = formatCurrency(fireNumber);
    secondaryMetrics = [
      { label: 'Estimated Years to Financial Independence', value: `${yearsToFire} Years` },
      { label: 'Annual Living Expenses Covered', value: formatCurrency(numSpend) },
      { label: 'Current Savings Rate', value: `${numSaveRate}% (${formatCurrency(annualSavings)}/yr)` },
      { label: 'Current Portfolio Progress', value: `${((numPortfolio / fireNumber) * 100).toFixed(1)}%` },
    ];
    formulaText = 'FIRE Target = Annual Spending ÷ SWR% (Rule of 25 = 25 × Annual Spend)';
  }
  // 5. Social Security Break-Even (`social-security-break-even`)
  else if (id === 'social-security-break-even') {
    // Standard full retirement age 67 baseline benefit = $2,000/mo
    // Age 62 = 70% ($1,400), Age 70 = 124% ($2,480)
    // Break-even between age 62 and age 70:
    // Cumulative at age X: (X - 62) * 12 * 1400 vs (X - 70) * 12 * 2480
    // (X - 62) * 1400 = (X - 70) * 2480 -> 1400X - 86800 = 2480X - 173600 -> 1080X = 86800 -> X = 80.37
    const breakEvenAge = 80.4;

    primaryLabel = 'Claiming Break-Even Age (62 vs 70)';
    primaryValue = `${breakEvenAge.toFixed(1)} Years Old`;
    secondaryMetrics = [
      { label: 'Age 62 Early Benefit (70% of FRA)', value: '$1,400 / month (Immediate Cashflow)' },
      { label: 'Age 67 Full Retirement Benefit (100%)', value: '$2,000 / month (Baseline FRA)' },
      { label: 'Age 70 Delayed Credit Benefit (124%)', value: '$2,480 / month (+8%/yr Guaranteed Increase)' },
      { label: 'Strategy Recommendation', value: 'If life expectancy > 80.4 years, delaying to age 70 maximizes lifetime wealth' },
    ];
    formulaText = 'Break-Even: Cumulative Benefits(Age 62) = Cumulative Benefits(Age 70)';
  }
  // 6. RSU & Stock Option Tax (`rsu-stock-option-tax`)
  else if (id === 'rsu-stock-option-tax') {
    const vestingIncome = numRsuShares * numFmv;
    const withholdingTax = vestingIncome * 0.22; // Federal statutory supplemental 22%
    const subsequentGain = (numFinalStock - numFmv) * numRsuShares;
    const capitalGainsTax = Math.max(0, subsequentGain * 0.15); // Long term capital gain 15%
    const totalTax = withholdingTax + capitalGainsTax;

    primaryLabel = 'Ordinary Income at Vesting';
    primaryValue = formatCurrency(vestingIncome);
    secondaryMetrics = [
      { label: 'Vesting Federal Tax Withholding (22%)', value: formatCurrency(withholdingTax) },
      { label: 'Subsequent Capital Gain / Growth', value: formatCurrency(subsequentGain) },
      { label: 'Capital Gains Tax on Sale', value: formatCurrency(capitalGainsTax) },
      { label: 'Total Value at Liquidation', value: formatCurrency(numRsuShares * numFinalStock - totalTax) },
    ];
    formulaText = 'Vesting Income = Vested Shares × FMV | Gain = Shares × (Sale Price - FMV)';
  }
  // 7. HSA Triple Tax Advantage (`hsa-triple-tax-advantage`)
  else if (id === 'hsa-triple-tax-advantage') {
    // Triple tax advantage: Tax deductible contribution + Tax-free growth + Tax-free qualified withdrawals + FICA exemption (7.65%)
    const annualHsaContrib = 4300; // 2025 single limit
    const incomeTaxRate = 0.24;
    const ficaTaxRate = 0.0765;
    const annualTaxSavings = annualHsaContrib * (incomeTaxRate + ficaTaxRate);
    const fvHsa = annualHsaContrib * ((Math.pow(1 + 0.08, numYears) - 1) / 0.08);

    primaryLabel = `HSA Portfolio Value in ${numYears} Years`;
    primaryValue = formatCurrency(fvHsa);
    secondaryMetrics = [
      { label: 'Annual Income + FICA Tax Saved', value: formatCurrency(annualTaxSavings) },
      { label: 'Cumulative Tax Deductions Over Period', value: formatCurrency(annualTaxSavings * numYears) },
      { label: 'Triple Tax Advantage Elements', value: 'Pre-Tax In + Tax-Free Growth + Tax-Free Medical Out' },
      { label: 'Post-65 Rule', value: 'Can withdraw penalty-free for non-medical expenses (taxed as regular IRA)' },
    ];
    formulaText = 'HSA Compounding = Contrib × [((1 + r)^n - 1) / r] with 0% tax drag';
  }
  // 8. Options Black-Scholes Pricing (`options-black-scholes`)
  else if (id === 'options-black-scholes') {
    // d1 = [ln(S/K) + (r + sigma^2 / 2)T] / (sigma * sqrt(T))
    // d2 = d1 - sigma * sqrt(T)
    const d1 = (Math.log(numSpot / numStrike) + (numR + (numSigma * numSigma) / 2) * numT) / (numSigma * Math.sqrt(numT));
    const d2 = d1 - numSigma * Math.sqrt(numT);

    const callPrice = numSpot * normCdf(d1) - numStrike * Math.exp(-numR * numT) * normCdf(d2);
    const putPrice = numStrike * Math.exp(-numR * numT) * normCdf(-d2) - numSpot * normCdf(-d1);
    const callDelta = normCdf(d1);
    const putDelta = callDelta - 1;

    primaryLabel = 'Theoretical European Call Price';
    primaryValue = `$${callPrice.toFixed(2)}`;
    secondaryMetrics = [
      { label: 'European Put Option Price', value: `$${putPrice.toFixed(2)}` },
      { label: 'Call Delta (Δ)', value: callDelta.toFixed(3) },
      { label: 'Put Delta (Δ)', value: putDelta.toFixed(3) },
      { label: 'Option Moneyness', value: numSpot >= numStrike ? 'In-The-Money (ITM)' : 'Out-of-The-Money (OTM)' },
    ];
    formulaText = 'C = S·N(d1) - K·e^(-rT)·N(d2) | P = K·e^(-rT)·N(-d2) - S·N(-d1)';
  }
  // 9. Treasury Yield Curve (`treasury-yield-curve`)
  else {
    // Discount yield = (100 - Price) / 100 * (360 / Days)
    // Investment (Coupon equivalent) yield = (100 - Price) / Price * (365 / Days)
    const discountYield = ((100 - numTbPrice) / 100) * (360 / numTbDays) * 100;
    const investmentYield = ((100 - numTbPrice) / numTbPrice) * (365 / numTbDays) * 100;

    primaryLabel = 'Treasury Investment Yield (BEY)';
    primaryValue = `${investmentYield.toFixed(3)}%`;
    secondaryMetrics = [
      { label: 'Bank Discount Yield (360-day)', value: `${discountYield.toFixed(3)}%` },
      { label: 'T-Bill Purchase Price ($100 Par)', value: `$${numTbPrice.toFixed(2)}` },
      { label: 'Days to Maturity', value: `${numTbDays} days` },
      { label: 'State & Local Tax Status', value: '100% Exempt from State and Local Income Taxes' },
    ];
    formulaText = 'BEY = [(Par - Price) ÷ Price] × (365 ÷ Days) × 100';
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
        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {id === 'dividend-reinvestment-drip' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_init_invest', 'Initial Portfolio Balance ($)')}
                </label>
                <input
                  type="number"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_annual_contrib', 'Annual Additional Contribution ($)')}
                </label>
                <input
                  type="number"
                  value={annualContribution}
                  onChange={(e) => setAnnualContribution(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_div_yield', 'Dividend Yield (%)')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={dividendYield}
                  onChange={(e) => setDividendYield(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
            </>
          )}

          {(id === 'capital-gains-tax' || id === 'crypto-tax-fifo-hifo') && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_cost_basis', 'Purchase Cost Basis ($)')}
                </label>
                <input
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_sale_price', 'Sale / Proceeds Amount ($)')}
                </label>
                <input
                  type="number"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_holding_months', 'Holding Period (Months)')}
                </label>
                <input
                  type="number"
                  value={holdingPeriodMonths}
                  onChange={(e) => setHoldingPeriodMonths(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
            </>
          )}

          {(id === 'safe-withdrawal-rate' || id === 'fire-financial-independence') && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_annual_spend', 'Annual Retirement Spending ($)')}
                </label>
                <input
                  type="number"
                  value={annualSpending}
                  onChange={(e) => setAnnualSpending(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_swr_pct', 'Safe Withdrawal Rate (%)')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={swrPercent}
                  onChange={(e) => setSwrPercent(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_current_portfolio', 'Current Portfolio ($)')}
                </label>
                <input
                  type="number"
                  value={currentPortfolio}
                  onChange={(e) => setCurrentPortfolio(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
            </>
          )}

          {id === 'options-black-scholes' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_spot_price', 'Stock Spot Price ($)')}
                </label>
                <input
                  type="number"
                  value={spotPrice}
                  onChange={(e) => setSpotPrice(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_strike_price', 'Option Strike Price ($)')}
                </label>
                <input
                  type="number"
                  value={strikePrice}
                  onChange={(e) => setStrikePrice(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_time_exp', 'Time to Expiration (Years)')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={timeToMaturityYears}
                  onChange={(e) => setTimeToMaturityYears(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_volatility', 'Implied Volatility (IV %)')}
                </label>
                <input
                  type="number"
                  value={volatilityPercent}
                  onChange={(e) => setVolatilityPercent(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
            </>
          )}

          {id === 'treasury-yield-curve' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_tbill_price', 'T-Bill Price ($ per $100 par)')}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={tBillPrice}
                  onChange={(e) => setTBillPrice(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('fin_tbill_days', 'Days to Maturity')}
                </label>
                <input
                  type="number"
                  value={tBillDays}
                  onChange={(e) => setTBillDays(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
            </>
          )}
        </div>

        {/* Primary Banner */}
        <div className="p-6 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              {primaryLabel}
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">
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

        {/* Secondary Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {secondaryMetrics.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.label}</span>
              <span className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Formula Verification */}
        <div className="p-4 bg-slate-100 dark:bg-slate-800/40 rounded-xl space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
          <div className="font-semibold text-slate-700 dark:text-slate-300">
            Formula: <code className="font-mono text-slate-800 dark:text-slate-200">{formulaText}</code>
          </div>
        </div>
      </div>
    </div>
  );
};
