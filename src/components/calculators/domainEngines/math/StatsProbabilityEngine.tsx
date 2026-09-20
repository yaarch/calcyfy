import React, { useState } from 'react';
import { ToolDef } from '../../../../types';
import { BookOpen, Copy, Check, BarChart2, Hash, Layers } from 'lucide-react';

interface StatsProbabilityEngineProps {
  tool: ToolDef;
}

export const StatsProbabilityEngine: React.FC<StatsProbabilityEngineProps> = ({ tool }) => {
  const [copied, setCopied] = useState(false);

  // Data Set Input for Descriptive Stats
  const [dataStr, setDataStr] = useState<string>('12, 15, 18, 22, 25, 30, 35, 40');
  
  // Combinatorics inputs
  const [nVal, setNVal] = useState<number>(8);
  const [rVal, setRVal] = useState<number>(3);
  
  // Probability inputs
  const [nTrials, setNTrials] = useState<number>(10);
  const [pSuccess, setPSuccess] = useState<number>(0.5);
  const [kSuccesses, setKSuccesses] = useState<number>(5);
  const [zScore, setZScore] = useState<number>(1.96);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const parseDataSet = (): number[] => {
    return dataStr
      .split(/[\s,]+/)
      .map(v => parseFloat(v.trim()))
      .filter(v => !isNaN(v));
  };

  const factorial = (n: number): number => {
    if (n <= 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  };

  const bigFactorial = (num: number): bigint => {
    if (num < 0) return 0n;
    if (num <= 1) return 1n;
    let res = 1n;
    for (let i = 2n; i <= BigInt(num); i++) res *= i;
    return res;
  };

  const formatBig = (val: bigint): string => {
    const s = val.toString();
    if (s.length > 16) {
      const exp = s.length - 1;
      const leading = (Number(s.slice(0, 8)) / 1e7).toFixed(4);
      return `${leading} × 10^${exp}`;
    }
    return val.toLocaleString();
  };

  const nCr = (n: number, r: number): number => {
    if (r < 0 || r > n) return 0;
    return factorial(n) / (factorial(r) * factorial(n - r));
  };

  const erf = (x: number): number => {
    const sign = x < 0 ? -1 : 1;
    const absX = Math.abs(x);
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const t = 1.0 / (1.0 + p * absX);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);
    return sign * y;
  };

  const isCombinatorics = tool.id === 'combinatorics-ncr' || 
    tool.id === 'combination-permutation' || 
    tool.slug.includes('combinations-ncr-permutations-npr');

  const calculate = () => {
    const nums = parseDataSet();
    const count = nums.length;

    if (isCombinatorics) {
      const n = Math.max(0, Math.min(100, Math.floor(nVal || 0)));
      const r = Math.max(0, Math.min(100, Math.floor(rVal || 0)));

      const factN = bigFactorial(n);
      const factR = bigFactorial(r);
      const factNminusR = n >= r ? bigFactorial(n - r) : 0n;

      // Combinations without repetition: nCr = n! / (r! * (n-r)!)
      let nCrBig = 0n;
      if (r <= n) {
        nCrBig = factN / (factR * factNminusR);
      }

      // Permutations without repetition: nPr = n! / (n-r)!
      let nPrBig = 0n;
      if (r <= n) {
        nPrBig = factN / factNminusR;
      }

      // Permutations with repetition: n^r
      let nPrRepBig = 0n;
      try {
        nPrRepBig = BigInt(n) ** BigInt(r);
      } catch {
        nPrRepBig = 0n;
      }

      // Combinations with repetition: (n + r - 1)! / (r! * (n - 1)!)
      let nCrRepBig = 0n;
      if (n > 0) {
        const top = bigFactorial(n + r - 1);
        const bot = factR * bigFactorial(n - 1);
        nCrRepBig = top / bot;
      }

      const steps: string[] = [
        `Given Parameters: Total items (n) = ${n}, Selected items (r) = ${r}`,
        `Compute factorials: n! (${n}!) = ${formatBig(factN)}, r! (${r}!) = ${formatBig(factR)}, (n - r)! (${n - r}!) = ${formatBig(factNminusR)}`,
        `Combinations formula: C(${n}, ${r}) = ${n}! / (${r}! × (${n} - ${r})!) = ${formatBig(factN)} / (${formatBig(factR)} × ${formatBig(factNminusR)}) = ${formatBig(nCrBig)}`,
        `Permutations formula: P(${n}, ${r}) = ${n}! / (${n} - ${r})! = ${formatBig(factN)} / ${formatBig(factNminusR)} = ${formatBig(nPrBig)}`
      ];

      if (r > n) {
        steps.push(`Notice: Since r (${r}) > n (${n}), selecting without replacement produces 0 combinations.`);
      }

      return {
        engineTitle: 'Combinatorics & Permutations Engine',
        results: [
          { label: `Combinations C(${n}, ${r}) — nCr`, value: formatBig(nCrBig), unit: 'Order does NOT matter' },
          { label: `Permutations P(${n}, ${r}) — nPr`, value: formatBig(nPrBig), unit: 'Order DOES matter' },
          { label: `Factorial n! (${n}!)`, value: formatBig(factN), unit: 'Total arrangements' },
          { label: `Factorial r! (${r}!)`, value: formatBig(factR), unit: 'Subset arrangements' },
          { label: `Permutations with Replacement (n^r)`, value: formatBig(nPrRepBig), unit: 'Repeats allowed' },
          { label: `Combinations with Replacement`, value: formatBig(nCrRepBig), unit: '(n+r-1)Cr' }
        ],
        formula: 'C(n, r) = n! / (r! × (n - r)!)   |   P(n, r) = n! / (n - r)!',
        steps
      };
    }

    switch (tool.id) {
      case 'standard-deviation':
      case 'standard-deviation-calc':
      case 'root-mean-square': {
        if (count === 0) {
          return {
            engineTitle: 'Descriptive Statistics Engine',
            results: [{ label: 'Status', value: 'Please enter valid numerical data points', unit: '' }],
            formula: 'σ = √( Σ(x_i - μ)² / N )',
            steps: ['Waiting for comma-separated numerical inputs.']
          };
        }
        const mean = nums.reduce((a, b) => a + b, 0) / count;
        const variancePop = nums.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / count;
        const stdPop = Math.sqrt(variancePop);
        const varianceSample = count > 1 ? nums.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / (count - 1) : 0;
        const stdSample = count > 1 ? Math.sqrt(varianceSample) : 0;
        const rms = Math.sqrt(nums.reduce((sum, x) => sum + x * x, 0) / count);

        return {
          engineTitle: 'Descriptive Statistics Engine',
          results: [
            { label: 'Sample Std Dev (s)', value: stdSample.toFixed(4), unit: 'n-1 denominator' },
            { label: 'Population Std Dev (σ)', value: stdPop.toFixed(4), unit: 'N denominator' },
            { label: 'Mean (μ)', value: mean.toFixed(4), unit: `n = ${count}` },
            { label: 'Root Mean Square (RMS)', value: rms.toFixed(4), unit: '' }
          ],
          formula: 's = √( Σ(x_i - x̄)² / (n - 1) )',
          steps: [
            `Sample Size n = ${count}, Sum = ${nums.reduce((a, b) => a + b, 0)}`,
            `Mean x̄ = ${mean.toFixed(4)}`,
            `Sum of squared differences Σ(x - x̄)² = ${nums.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0).toFixed(4)}`,
            `Sample Variance s² = ${varianceSample.toFixed(4)} => s = ${stdSample.toFixed(4)}`
          ]
        };
      }

      case 'binomial-distribution-calc':
      case 'bernoulli-trials-calc': {
        const n = Math.max(1, nTrials);
        const p = Math.max(0, Math.min(1, pSuccess));
        const k = Math.max(0, Math.min(n, kSuccesses));

        const probK = nCr(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
        const mean = n * p;
        const stdDev = Math.sqrt(n * p * (1 - p));

        return {
          engineTitle: 'Binomial Probability Engine',
          results: [
            { label: `P(X = ${k}) Exact Probability`, value: (probK * 100).toFixed(4) + '%', unit: `p = ${probK.toFixed(6)}` },
            { label: 'Expected Mean μ = np', value: mean.toFixed(4), unit: 'successes' },
            { label: 'Standard Deviation σ', value: stdDev.toFixed(4), unit: '' }
          ],
          formula: 'P(X = k) = (n C k) × p^k × (1-p)^(n-k)',
          steps: [
            `Combinations (${n} C ${k}) = ${nCr(n, k)}`,
            `Success factor p^k = ${p}^${k} = ${Math.pow(p, k).toFixed(6)}`,
            `Failure factor (1-p)^(n-k) = (1-${p})^(${n}-${k}) = ${Math.pow(1 - p, n - k).toFixed(6)}`,
            `P(X = ${k}) = ${probK.toFixed(6)} (${(probK * 100).toFixed(4)}%)`
          ]
        };
      }

      case 'normal-distribution-zscore':
      case 'p-value-from-zscore': {
        const z = zScore;
        const cdf = 0.5 * (1 + erf(z / Math.SQRT2));
        const pTwoTailed = 2 * (1 - cdf);

        return {
          engineTitle: 'Normal Distribution & Z-Score Engine',
          results: [
            { label: 'Z-Score z', value: z.toFixed(4), unit: '' },
            { label: 'Cumulative Prob P(Z ≤ z)', value: (cdf * 100).toFixed(4) + '%', unit: `p = ${cdf.toFixed(6)}` },
            { label: 'Two-Tailed P-Value', value: pTwoTailed.toFixed(6), unit: '' }
          ],
          formula: 'z = (X - μ) / σ | Φ(z) = ∫_(-∞)^z (1/√(2π)) e^(-t²/2) dt',
          steps: [
            `Z-Score: ${z}`,
            `Cumulative Normal Distribution Φ(${z}) = ${cdf.toFixed(6)}`,
            `Upper tail P(Z > ${z}) = ${(1 - cdf).toFixed(6)}`
          ]
        };
      }

      default: {
        const mean = count > 0 ? nums.reduce((a, b) => a + b, 0) / count : 0;
        const sorted = [...nums].sort((a, b) => a - b);
        const median = count > 0 ? (count % 2 === 0 ? (sorted[count / 2 - 1] + sorted[count / 2]) / 2 : sorted[Math.floor(count / 2)]) : 0;
        return {
          engineTitle: 'Statistical Summary Engine',
          results: [
            { label: 'Sample Count n', value: count.toString(), unit: 'items' },
            { label: 'Sample Mean μ', value: mean.toFixed(4), unit: '' },
            { label: 'Sample Median', value: median.toFixed(4), unit: '' }
          ],
          formula: 'Statistical Summary Engine',
          steps: ['Computed dataset central tendency and dispersion metrics.']
        };
      }
    }
  };

  const calc = calculate();

  return (
    <div id={`stats-engine-${tool.id}`} className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          {isCombinatorics ? (
            <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          ) : (
            <BarChart2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          )}
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {calc.engineTitle}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{tool.name}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{tool.description}</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
        <h3 className="font-semibold text-slate-900 dark:text-white text-base">
          {isCombinatorics ? 'Combinatorial Set Parameters' : 'Statistical Inputs & Data Set'}
        </h3>

        {isCombinatorics ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
                  <span>Total Number of Items (n)</span>
                  <span className="text-[11px] text-slate-400 lowercase">set size (0–100)</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={nVal}
                  onChange={(e) => setNVal(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
                  <span>Items to Choose / Arrange (r)</span>
                  <span className="text-[11px] text-slate-400 lowercase">sample size</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={rVal}
                  onChange={(e) => setRVal(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Quick Presets for Combinatorics */}
            <div className="pt-2">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-2">Common Scenarios & Presets:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => { setNVal(8); setRVal(3); }}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  Committee of 3 from 8 (n=8, r=3)
                </button>
                <button
                  type="button"
                  onClick={() => { setNVal(49); setRVal(6); }}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  Lottery 6/49 (n=49, r=6)
                </button>
                <button
                  type="button"
                  onClick={() => { setNVal(52); setRVal(5); }}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  Poker 5-Card Hand (n=52, r=5)
                </button>
                <button
                  type="button"
                  onClick={() => { setNVal(10); setRVal(4); }}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  4-Digit PIN Code (n=10, r=4)
                </button>
              </div>
            </div>
          </div>
        ) : tool.id.includes('binomial') || tool.id.includes('bernoulli') ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Number of Trials (n)</label>
              <input type="number" min="1" value={nTrials} onChange={(e) => setNTrials(parseInt(e.target.value) || 1)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Success Probability (p)</label>
              <input type="number" min="0" max="1" step="0.01" value={pSuccess} onChange={(e) => setPSuccess(parseFloat(e.target.value) || 0)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Target Successes (k)</label>
              <input type="number" min="0" value={kSuccesses} onChange={(e) => setKSuccesses(parseInt(e.target.value) || 0)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm" />
            </div>
          </div>
        ) : tool.id.includes('normal') || tool.id.includes('zscore') ? (
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Z-Score Score (z)</label>
            <input type="number" step="0.01" value={zScore} onChange={(e) => setZScore(parseFloat(e.target.value) || 0)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm" />
          </div>
        ) : (
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Comma / Space Separated Data Values</label>
            <textarea
              rows={3}
              value={dataStr}
              onChange={(e) => setDataStr(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono text-sm"
              placeholder="e.g. 10, 20, 30, 40, 50"
            />
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {isCombinatorics ? 'Combinatorial Evaluation Results' : 'Statistical Analysis Output'}
            </h4>
            <button onClick={() => copyToClipboard(calc.results.map(r => `${r.label}: ${r.value}`).join(' | '))} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
              {copied ? <Check className="w-3.5 h-3.5 text-indigo-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Results'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {calc.results.map((res, i) => (
              <div key={i} className="p-4 bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 rounded-xl">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 block">{res.label}</span>
                <span className="text-lg sm:text-xl font-mono font-bold text-indigo-950 dark:text-indigo-100 mt-1 block break-all">
                  {res.value}
                </span>
                {res.unit && (
                  <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium block mt-0.5">
                    {res.unit}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold text-sm">
          <BookOpen className="w-4 h-4 text-indigo-500" />
          <span>Formula & Execution Step-by-Step</span>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg font-mono text-xs text-indigo-700 dark:text-indigo-300 font-bold overflow-x-auto">
          {calc.formula}
        </div>
        <div className="space-y-1.5 font-mono text-xs text-slate-700 dark:text-slate-300 pl-2">
          {calc.steps.map((st, i) => (
            <div key={i} className="leading-relaxed">• {st}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

