import React, { useState } from 'react';
import { ToolDef } from '../../../../types';
import { DollarSign, Check, Copy, Coins, RefreshCw, Zap, Moon, ShieldCheck, Globe } from 'lucide-react';

interface CryptoForexCurrencyEngineProps {
  tool: ToolDef;
}

export const CryptoForexCurrencyEngine: React.FC<CryptoForexCurrencyEngineProps> = ({ tool }) => {
  const [copied, setCopied] = useState(false);

  // Crypto PnL State
  const [buyPrice, setBuyPrice] = useState<number>(60000);
  const [sellPrice, setSellPrice] = useState<number>(68000);
  const [cryptoQty, setCryptoQty] = useState<number>(0.5);
  const [tradingFeePct, setTradingFeePct] = useState<number>(0.1);

  // Ethereum Gas Fee State
  const [gasUnits, setGasUnits] = useState<number>(21000); // Standard ETH transfer
  const [gasGwei, setGasGwei] = useState<number>(25);
  const [ethUsdPrice, setEthUsdPrice] = useState<number>(2600);

  // Sats to BTC/USD State
  const [satoshis, setSatoshis] = useState<number>(1000000); // 1,000,000 sats = 0.01 BTC
  const [btcUsdPrice, setBtcUsdPrice] = useState<number>(65000);

  // Forex Pip Value State
  const [lotSizeUnits, setLotSizeUnits] = useState<number>(100000); // Standard lot
  const [pipSize, setPipSize] = useState<number>(0.0001);

  // Zakat Calculator State
  const [cashSavings, setCashSavings] = useState<number>(15000);
  const [goldVal, setGoldVal] = useState<number>(8000);
  const [businessAssets, setBusinessAssets] = useState<number>(10000);
  const [shortTermDebts, setShortTermDebts] = useState<number>(3000);

  // Travel Budget State
  const [tripBudgetTotal, setTripBudgetTotal] = useState<number>(3000);
  const [tripDays, setTripDays] = useState<number>(10);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const id = tool.id;

  // Crypto PnL
  const totalInvestmentCost = buyPrice * cryptoQty * (1 + tradingFeePct / 100);
  const totalGrossProceeds = sellPrice * cryptoQty * (1 - tradingFeePct / 100);
  const cryptoNetProfit = totalGrossProceeds - totalInvestmentCost;
  const cryptoRoiPct = totalInvestmentCost > 0 ? (cryptoNetProfit / totalInvestmentCost) * 100 : 0;

  // Eth Gas Fee
  const gasInEth = (gasUnits * gasGwei) / 1e9;
  const gasInUsd = gasInEth * ethUsdPrice;

  // Sats
  const btcVal = satoshis / 1e8;
  const usdValSats = btcVal * btcUsdPrice;

  // Forex Pip
  const pipValueUsd = lotSizeUnits * pipSize;

  // Zakat
  const zakatableNetWealth = cashSavings + goldVal + businessAssets - shortTermDebts;
  const nisabThresholdUsd = 6000; // ~85 grams of gold
  const isZakatEligible = zakatableNetWealth >= nisabThresholdUsd;
  const zakatDueAmount = isZakatEligible ? zakatableNetWealth * 0.025 : 0;

  // Travel Daily Budget
  const dailyBudget = tripDays > 0 ? tripBudgetTotal / tripDays : 0;

  return (
    <div id={`crypto-forex-currency-engine-${id}`} className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-md">
          Crypto, Forex & Global Currency Analytics Engine
        </span>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{tool.name}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{tool.description}</p>
      </div>

      {/* 1. CRYPTO PROFIT LOSS / DCA / STAKING */}
      {(id === 'crypto-profit-loss-calc' || id === 'crypto-dca-calculator' || id === 'crypto-staking-rewards' || id === 'crypto-impermanent-loss' || id === 'bitcoin-mining-profit' || id === 'crypto-market-cap-rank' || id === 'currency-crypto') && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Buy Price ($)</label>
              <input
                type="number"
                value={buyPrice}
                onChange={(e) => setBuyPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Sell Price ($)</label>
              <input
                type="number"
                value={sellPrice}
                onChange={(e) => setSellPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Quantity / Amount</label>
              <input
                type="number"
                step="0.01"
                value={cryptoQty}
                onChange={(e) => setCryptoQty(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Fee per Trade (%)</label>
              <input
                type="number"
                step="0.05"
                value={tradingFeePct}
                onChange={(e) => setTradingFeePct(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
              <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Net Profit / Loss</span>
              <span className={`text-2xl font-black font-mono mt-1 block ${cryptoNetProfit >= 0 ? 'text-emerald-600 dark:text-emerald-300' : 'text-rose-600 dark:text-rose-300'}`}>
                ${cryptoNetProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
              <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">ROI (%)</span>
              <span className={`text-2xl font-black font-mono mt-1 block ${cryptoRoiPct >= 0 ? 'text-emerald-600 dark:text-emerald-300' : 'text-rose-600 dark:text-rose-300'}`}>
                {cryptoRoiPct.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. ETH GAS FEE CONVERTER */}
      {id === 'ethereum-gas-fee-converter' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Gas Limit / Units</label>
              <input
                type="number"
                value={gasUnits}
                onChange={(e) => setGasUnits(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Gas Price (Gwei)</label>
              <input
                type="number"
                value={gasGwei}
                onChange={(e) => setGasGwei(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">ETH Price ($ USD)</label>
              <input
                type="number"
                value={ethUsdPrice}
                onChange={(e) => setEthUsdPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
              <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Gas Fee in ETH</span>
              <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
                {gasInEth.toFixed(6)} ETH
              </span>
            </div>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
              <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Gas Fee in USD</span>
              <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
                ${gasInUsd.toFixed(2)} USD
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 3. SATOSHIS TO BITCOIN / USD */}
      {id === 'sats-to-bitcoin-usd' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Satoshis (Sats)</label>
              <input
                type="number"
                value={satoshis}
                onChange={(e) => setSatoshis(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">BTC Price ($ USD)</label>
              <input
                type="number"
                value={btcUsdPrice}
                onChange={(e) => setBtcUsdPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
              <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Equivalent BTC</span>
              <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
                {btcVal.toFixed(8)} BTC
              </span>
            </div>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
              <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">USD Market Value</span>
              <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
                ${usdValSats.toFixed(2)} USD
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. ISLAMIC ZAKAT CALCULATOR */}
      {id === 'zakat-calculator-islamic' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Cash & Savings ($)</label>
              <input
                type="number"
                value={cashSavings}
                onChange={(e) => setCashSavings(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Gold & Silver Value ($)</label>
              <input
                type="number"
                value={goldVal}
                onChange={(e) => setGoldVal(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Investments & Business Assets ($)</label>
              <input
                type="number"
                value={businessAssets}
                onChange={(e) => setBusinessAssets(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Immediate Debts Due (- $)</label>
              <input
                type="number"
                value={shortTermDebts}
                onChange={(e) => setShortTermDebts(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
          </div>

          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
            <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Islamic Zakat Due (2.5%)</span>
            <span className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
              ${zakatDueAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-xs text-slate-500 block mt-1 font-mono">
              Net Zakatable Wealth: ${zakatableNetWealth.toLocaleString()} | Nisab Standard Met: {isZakatEligible ? 'Yes' : 'No (Below Nisab)'}
            </span>
          </div>
        </div>
      )}

      {/* 5. FOREX & TRAVEL BUDGET */}
      {(id === 'forex-pip-value-calculator' || id === 'forex-position-size-risk' || id === 'forex-margin-calculator' || id === 'forex-pivot-points-calc' || id === 'travel-budget-daily-expense' || id === 'salary-tax-take-home' || id === 'sales-tax-by-state-country' || id === 'currency-inflation-purchasing') && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Total Trip Budget ($)</label>
              <input
                type="number"
                value={tripBudgetTotal}
                onChange={(e) => setTripBudgetTotal(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">Duration (Days)</label>
              <input
                type="number"
                value={tripDays}
                onChange={(e) => setTripDays(parseFloat(e.target.value) || 1)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm"
              />
            </div>
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
            <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Daily Travel Expense Allocation</span>
            <span className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-300 mt-1 block">
              ${dailyBudget.toFixed(2)} / day
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
