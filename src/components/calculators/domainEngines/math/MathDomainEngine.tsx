import React, { useState } from 'react';
import { ToolDef } from '../../../../types';
import { Calculator, BookOpen, Check, Copy, Hash } from 'lucide-react';

interface MathDomainEngineProps {
  tool: ToolDef;
}

export const MathDomainEngine: React.FC<MathDomainEngineProps> = ({ tool }) => {
  const [copied, setCopied] = useState(false);

  // Matrix State
  const [matrixDim, setMatrixDim] = useState<2 | 3>(2);
  const [matrixA, setMatrixA] = useState<number[][]>([[1, 2, 0], [3, 4, 0], [0, 0, 1]]);
  const [matrixB, setMatrixB] = useState<number[][]>([[5, 6, 0], [7, 8, 0], [0, 0, 1]]);

  // Combinatorics State
  const [nVal, setNVal] = useState<number>(10);
  const [rVal, setRVal] = useState<number>(3);

  // Kinematics State
  const [initVelocity, setInitVelocity] = useState<number>(0);
  const [acceleration, setAcceleration] = useState<number>(9.81);
  const [timeSec, setTimeSec] = useState<number>(5);

  // Kinetic Energy State
  const [massKg, setMassKg] = useState<number>(70);
  const [velocityMs, setVelocityMs] = useState<number>(10);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 1. Matrix Multiplication Logic
  const calcMatrixMult = () => {
    const dim = matrixDim;
    const res: number[][] = Array(dim).fill(0).map(() => Array(dim).fill(0));
    const steps: string[] = [];

    for (let i = 0; i < dim; i++) {
      for (let j = 0; j < dim; j++) {
        let sum = 0;
        const rowTerms: string[] = [];
        for (let k = 0; k < dim; k++) {
          const prod = matrixA[i][k] * matrixB[k][j];
          sum += prod;
          rowTerms.push(`(${matrixA[i][k]} × ${matrixB[k][j]})`);
        }
        res[i][j] = sum;
        steps.push(`C[${i+1},${j+1}] = ${rowTerms.join(' + ')} = ${sum}`);
      }
    }
    return { res, steps };
  };

  // 2. Matrix Determinant Logic
  const calcMatrixDet = () => {
    const dim = matrixDim;
    let det = 0;
    let trace = 0;
    let formulaStr = '';

    for (let i = 0; i < dim; i++) trace += matrixA[i][i];

    if (dim === 2) {
      const a = matrixA[0][0], b = matrixA[0][1];
      const c = matrixA[1][0], d = matrixA[1][1];
      det = (a * d) - (b * c);
      formulaStr = `det(A) = (${a} × ${d}) - (${b} × ${c}) = ${det}`;
    } else {
      const a = matrixA[0][0], b = matrixA[0][1], c = matrixA[0][2];
      const d = matrixA[1][0], e = matrixA[1][1], f = matrixA[1][2];
      const g = matrixA[2][0], h = matrixA[2][1], i = matrixA[2][2];
      det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
      formulaStr = `det(A) = ${a}(${e}·${i} - ${f}·${h}) - ${b}(${d}·${i} - ${f}·${g}) + ${c}(${d}·${h} - ${e}·${g}) = ${det}`;
    }
    return { det, trace, formulaStr };
  };

  // 3. Combinatorics Logic
  const calcFactorial = (n: number): number => {
    if (n < 0) return 0;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  };

  const calcCombinatorics = () => {
    const n = Math.max(0, Math.floor(nVal));
    const r = Math.max(0, Math.floor(rVal));

    if (r > n) {
      return { nCr: 0, nPr: 0, nRep: Math.pow(n, r), nCrRep: 0, error: 'r cannot be greater than n for simple combinations' };
    }

    const nFact = calcFactorial(n);
    const rFact = calcFactorial(r);
    const nMinusRFact = calcFactorial(n - r);

    const nPr = nMinusRFact > 0 ? nFact / nMinusRFact : 0;
    const nCr = (rFact * nMinusRFact) > 0 ? nFact / (rFact * nMinusRFact) : 0;
    const nPrRep = Math.pow(n, r);
    const nCrRep = calcFactorial(n + r - 1) / (rFact * calcFactorial(n - 1));

    return { nCr, nPr, nPrRep, nCrRep, error: null };
  };

  // 4. Kinematics Logic
  const calcKinematics = () => {
    const v = initVelocity + acceleration * timeSec;
    const s = initVelocity * timeSec + 0.5 * acceleration * Math.pow(timeSec, 2);
    const avgVelocity = (initVelocity + v) / 2;
    return { v, s, avgVelocity };
  };

  // 5. Kinetic Energy Logic
  const calcKineticEnergy = () => {
    const ke = 0.5 * massKg * Math.pow(velocityMs, 2);
    const momentum = massKg * velocityMs;
    const kmh = velocityMs * 3.6;
    return { ke, momentum, kmh };
  };

  const updateMatrixA = (r: number, c: number, val: number) => {
    const newM = matrixA.map(row => [...row]);
    newM[r][c] = val;
    setMatrixA(newM);
  };

  const updateMatrixB = (r: number, c: number, val: number) => {
    const newM = matrixB.map(row => [...row]);
    newM[r][c] = val;
    setMatrixB(newM);
  };

  return (
    <div id={`math-domain-engine-${tool.id}`} className="max-w-4xl mx-auto space-y-6">
      {/* Tool Header Card */}
      <div id="math-header-card" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-md">
            Mathematical Analysis Engine
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{tool.name}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{tool.description}</p>
      </div>

      {/* MATRIX MULTIPLICATION TOOL */}
      {tool.id === 'matrix-mult' && (() => {
        const { res, steps } = calcMatrixMult();
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 dark:text-white text-base">Select Matrix Dimensions</h3>
                <div className="flex gap-2">
                  {[2, 3].map((d) => (
                    <button
                      key={d}
                      onClick={() => setMatrixDim(d as 2 | 3)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                        matrixDim === d
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {d} × {d} Matrix
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Matrix A Inputs */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase text-slate-500">Matrix A</h4>
                  <div className={`grid gap-2 ${matrixDim === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                    {Array(matrixDim).fill(0).map((_, r) =>
                      Array(matrixDim).fill(0).map((_, c) => (
                        <input
                          key={`a-${r}-${c}`}
                          type="number"
                          value={matrixA[r][c]}
                          onChange={(e) => updateMatrixA(r, c, parseFloat(e.target.value) || 0)}
                          className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-center font-mono focus:ring-2 focus:ring-indigo-500"
                        />
                      ))
                    )}
                  </div>
                </div>

                {/* Matrix B Inputs */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase text-slate-500">Matrix B</h4>
                  <div className={`grid gap-2 ${matrixDim === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                    {Array(matrixDim).fill(0).map((_, r) =>
                      Array(matrixDim).fill(0).map((_, c) => (
                        <input
                          key={`b-${r}-${c}`}
                          type="number"
                          value={matrixB[r][c]}
                          onChange={(e) => updateMatrixB(r, c, parseFloat(e.target.value) || 0)}
                          className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-center font-mono focus:ring-2 focus:ring-indigo-500"
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Product Matrix Result C */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Result Product Matrix C = A × B</h4>
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(res))}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-indigo-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy Matrix'}
                  </button>
                </div>
                <div className={`grid gap-2 max-w-sm ${matrixDim === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {res.map((row, r) =>
                    row.map((val, c) => (
                      <div key={`res-${r}-${c}`} className="p-3 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-lg text-center font-mono font-bold text-indigo-900 dark:text-indigo-200 text-lg">
                        {val}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Step-by-Step Dot Products */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold text-sm">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                <span>Step-by-Step Dot Product Operations</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg space-y-1 font-mono text-xs text-slate-800 dark:text-slate-200">
                {steps.map((st, i) => (
                  <div key={i}>{st}</div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* MATRIX DETERMINANT TOOL */}
      {tool.id === 'matrix-determinant' && (() => {
        const { det, trace, formulaStr } = calcMatrixDet();
        const isInvertible = det !== 0;
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 dark:text-white text-base">Select Matrix Size</h3>
                <div className="flex gap-2">
                  {[2, 3].map((d) => (
                    <button
                      key={d}
                      onClick={() => setMatrixDim(d as 2 | 3)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                        matrixDim === d
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {d} × {d} Matrix
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 max-w-sm">
                <h4 className="text-xs font-semibold uppercase text-slate-500">Matrix A Values</h4>
                <div className={`grid gap-2 ${matrixDim === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {Array(matrixDim).fill(0).map((_, r) =>
                    Array(matrixDim).fill(0).map((_, c) => (
                      <input
                        key={`det-a-${r}-${c}`}
                        type="number"
                        value={matrixA[r][c]}
                        onChange={(e) => updateMatrixA(r, c, parseFloat(e.target.value) || 0)}
                        className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-center font-mono focus:ring-2 focus:ring-indigo-500"
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Outputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Determinant det(A)</span>
                  <span className="text-2xl font-mono font-bold text-indigo-900 dark:text-indigo-200 mt-1 block">{det}</span>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Matrix Trace tr(A)</span>
                  <span className="text-2xl font-mono font-bold text-slate-900 dark:text-white mt-1 block">{trace}</span>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Invertibility Status</span>
                  <span className={`text-base font-semibold mt-2 block ${isInvertible ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                    {isInvertible ? 'Invertible (Non-singular)' : 'Singular (det = 0)'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold text-sm">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                <span>Calculation Formula Expansion</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg font-mono text-xs text-slate-800 dark:text-slate-200">
                {formulaStr}
              </div>
            </div>
          </div>
        );
      })()}

      {/* COMBINATIONS & PERMUTATIONS TOOL */}
      {tool.id === 'combination-permutation' && (() => {
        const { nCr, nPr, nPrRep, nCrRep, error } = calcCombinatorics();
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Total Items (n)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={nVal}
                    onChange={(e) => setNVal(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Selected Items (r)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={rVal}
                    onChange={(e) => setRVal(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded-lg text-xs font-medium">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Combinations nCr (Order Ignored)</span>
                  <span className="text-2xl font-mono font-bold text-indigo-900 dark:text-indigo-200 mt-1 block">
                    {nCr.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-indigo-700 dark:text-indigo-400 mt-1 block font-mono">
                    n! / (r! × (n - r)!)
                  </span>
                </div>

                <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Permutations nPr (Order Matters)</span>
                  <span className="text-2xl font-mono font-bold text-indigo-900 dark:text-indigo-200 mt-1 block">
                    {nPr.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-indigo-700 dark:text-indigo-400 mt-1 block font-mono">
                    n! / (n - r)!
                  </span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Permutations with Replacement (n^r)</span>
                  <span className="text-xl font-mono font-semibold text-slate-900 dark:text-white mt-1 block">
                    {nPrRep.toLocaleString()}
                  </span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Combinations with Replacement</span>
                  <span className="text-xl font-mono font-semibold text-slate-900 dark:text-white mt-1 block">
                    {nCrRep.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold text-sm">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                <span>Worked Permutation Example</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Selecting r = 3 items from n = 10 total items: 10! / (3! × 7!) = 120 unique combinations vs. 10! / 7! = 720 ordered permutations.
              </p>
            </div>
          </div>
        );
      })()}

      {/* KINEMATICS VELOCITY & ACCELERATION TOOL */}
      {tool.id === 'velocity-acceleration' && (() => {
        const { v, s, avgVelocity } = calcKinematics();
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Initial Velocity u (m/s)</label>
                  <input
                    type="number"
                    value={initVelocity}
                    onChange={(e) => setInitVelocity(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Acceleration a (m/s²)</label>
                  <input
                    type="number"
                    value={acceleration}
                    onChange={(e) => setAcceleration(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Time Elapsed t (seconds)</label>
                  <input
                    type="number"
                    min="0"
                    value={timeSec}
                    onChange={(e) => setTimeSec(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Final Velocity v = u + at</span>
                  <span className="text-2xl font-mono font-bold text-indigo-900 dark:text-indigo-200 mt-1 block">
                    {v.toLocaleString(undefined, { maximumFractionDigits: 4 })} m/s
                  </span>
                  <span className="text-xs text-indigo-700 dark:text-indigo-400 font-mono mt-0.5 block">
                    {(v * 3.6).toLocaleString(undefined, { maximumFractionDigits: 2 })} km/h
                  </span>
                </div>

                <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Displacement s = ut + ½at²</span>
                  <span className="text-2xl font-mono font-bold text-indigo-900 dark:text-indigo-200 mt-1 block">
                    {s.toLocaleString(undefined, { maximumFractionDigits: 4 })} m
                  </span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Average Velocity v_avg</span>
                  <span className="text-xl font-mono font-semibold text-slate-900 dark:text-white mt-1 block">
                    {avgVelocity.toLocaleString(undefined, { maximumFractionDigits: 4 })} m/s
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* KINETIC ENERGY TOOL */}
      {tool.id === 'kinetic-energy' && (() => {
        const { ke, momentum, kmh } = calcKineticEnergy();
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Object Mass m (kg)</label>
                  <input
                    type="number"
                    min="0"
                    value={massKg}
                    onChange={(e) => setMassKg(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Velocity v (m/s)</label>
                  <input
                    type="number"
                    value={velocityMs}
                    onChange={(e) => setVelocityMs(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono">
                    Equates to {kmh.toFixed(2)} km/h ({(velocityMs * 2.23694).toFixed(2)} mph)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Kinetic Energy KE = ½mv²</span>
                  <span className="text-2xl font-mono font-bold text-indigo-900 dark:text-indigo-200 mt-1 block">
                    {ke.toLocaleString(undefined, { maximumFractionDigits: 2 })} Joules
                  </span>
                  <span className="text-xs text-indigo-700 dark:text-indigo-400 font-mono mt-0.5 block">
                    {(ke / 1000).toFixed(3)} kJ
                  </span>
                </div>

                <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Linear Momentum p = mv</span>
                  <span className="text-2xl font-mono font-bold text-indigo-900 dark:text-indigo-200 mt-1 block">
                    {momentum.toLocaleString(undefined, { maximumFractionDigits: 2 })} kg·m/s
                  </span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Food Calorie Equivalent</span>
                  <span className="text-xl font-mono font-semibold text-slate-900 dark:text-white mt-1 block">
                    {(ke / 4184).toFixed(3)} kcal
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
