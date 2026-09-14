import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tool } from '../../types';
import { Copy, Check, Coins, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface CryptoProfitCalculatorProps {
  tool?: Tool;
}

export const CryptoProfitCalculator: React.FC<CryptoProfitCalculatorProps> = () => {
  const { t, addHistory } = useApp();
  const [buyPrice, setBuyPrice] = useState<string>('50000');
  const [sellPrice, setSellPrice] = useState<string>('68000');
  const [investment, setInvestment] = useState<string>('1000');
  const [tradingFeePercent, setTradingFeePercent] = useState<string>('0.1');
  const [copied, setCopied] = useState(false);

  const buy = parseFloat(buyPrice) || 0;
  const sell = parseFloat(sellPrice) || 0;
  const inv = parseFloat(investment) || 0;
  const feeRate = (parseFloat(tradingFeePercent) || 0) / 100;

  const cryptoUnits = buy > 0 ? inv / buy : 0;
  const grossSellValue = cryptoUnits * sell;
  
  const totalFees = (inv * feeRate) + (grossSellValue * feeRate);
  const netReturnValue = grossSellValue - totalFees;
  const netProfit = netReturnValue - inv;
  const profitMarginPercent = inv > 0 ? (netProfit / inv) * 100 : 0;

  const handleCopy = () => {
    const summary = `Profit: $${netProfit.toFixed(2)} (${profitMarginPercent.toFixed(2)}%) | Net Value: $${netReturnValue.toFixed(2)}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    addHistory('crypto-profit', `Buy $${buy} -> Sell $${sell}`, summary);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('crypto_investment', 'Investment Amount ($)')}
            </label>
            <input
              id="crypto-inv-input"
              type="number"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
              placeholder="1000"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('crypto_buy_price', 'Buy Price ($)')}
            </label>
            <input
              id="crypto-buy-input"
              type="number"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
              placeholder="50000"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('crypto_sell_price', 'Sell Price ($)')}
            </label>
            <input
              id="crypto-sell-input"
              type="number"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
              placeholder="68000"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('crypto_trading_fee', 'Trading Fee (%)')}
            </label>
            <input
              id="crypto-fee-input"
              type="number"
              value={tradingFeePercent}
              onChange={(e) => setTradingFeePercent(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
              placeholder="0.1"
            />
          </div>
        </div>

        {/* Results */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                {t('crypto_units', 'Coins Purchased')}
              </span>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                {cryptoUnits.toFixed(6)}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                {t('crypto_total_fees', 'Total Fees')}
              </span>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                ${totalFees.toFixed(2)}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase text-emerald-600 dark:text-emerald-400">
                {t('crypto_net_profit', 'Net Profit')}
              </span>
              <div className={`text-xl font-black font-mono mt-1 ${netProfit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
                {netProfit >= 0 ? '+' : ''}${netProfit.toFixed(2)}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                {t('crypto_total_return', 'Total Return Value')}
              </span>
              <div className="text-xl font-black font-mono text-slate-900 dark:text-white mt-1">
                ${netReturnValue.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-200 dark:border-slate-700">
            <button
              id="crypto-copy-btn"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy Trade Breakdown')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
