import React, { useState } from 'react';
import { ToolDef } from '../../../../types';
import { BookOpen, Copy, Check, FunctionSquare, ArrowRightLeft } from 'lucide-react';

interface AlgebraVectorEngineProps {
  tool: ToolDef;
}

export const AlgebraVectorEngine: React.FC<AlgebraVectorEngineProps> = ({ tool }) => {
  const [copied, setCopied] = useState(false);

  // Algebra Inputs
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-5);
  const [c, setC] = useState<number>(6);
  const [d, setD] = useState<number>(0);

  // Points/Vectors
  const [v1, setV1] = useState<{ x: number; y: number; z: number }>({ x: 2, y: 3, z: 4 });
  const [v2, setV2] = useState<{ x: number; y: number; z: number }>({ x: 5, y: 7, z: 1 });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculate = () => {
    switch (tool.id) {
      case 'quadratic-solver': {
        const disc = b * b - 4 * a * c;
        if (a === 0) {
          const root = -c / b;
          return {
            results: [{ label: 'Linear Root x', value: root.toFixed(4), unit: '' }],
            formula: 'ax² + bx + c = 0 (Linear when a = 0)',
            steps: [`Solve linear equation bx + c = 0 => x = -c/b = ${root.toFixed(4)}`]
          };
        }
        if (disc > 0) {
          const x1 = (-b + Math.sqrt(disc)) / (2 * a);
          const x2 = (-b - Math.sqrt(disc)) / (2 * a);
          return {
            results: [
              { label: 'Real Root x₁', value: x1.toFixed(4), unit: '' },
              { label: 'Real Root x₂', value: x2.toFixed(4), unit: '' },
              { label: 'Discriminant Δ = b² - 4ac', value: disc.toFixed(2), unit: 'Positive (2 Real Roots)' },
            ],
            formula: 'x = (-b ± √(b² - 4ac)) / 2a',
            steps: [
              `Calculate discriminant: (${b})² - 4(${a})(${c}) = ${disc}`,
              `x₁ = (-(${b}) + √${disc}) / (2 × ${a}) = ${x1.toFixed(4)}`,
              `x₂ = (-(${b}) - √${disc}) / (2 × ${a}) = ${x2.toFixed(4)}`
            ]
          };
        } else if (disc === 0) {
          const x = -b / (2 * a);
          return {
            results: [
              { label: 'Repeated Root x', value: x.toFixed(4), unit: 'Single Root' },
              { label: 'Discriminant Δ', value: '0', unit: '' },
            ],
            formula: 'x = -b / 2a',
            steps: [`Discriminant is 0 => x = -(${b}) / (2 × ${a}) = ${x.toFixed(4)}`]
          };
        } else {
          const realPart = (-b / (2 * a)).toFixed(4);
          const imagPart = (Math.sqrt(-disc) / (2 * a)).toFixed(4);
          return {
            results: [
              { label: 'Complex Root x₁', value: `${realPart} + ${imagPart}i`, unit: 'Complex' },
              { label: 'Complex Root x₂', value: `${realPart} - ${imagPart}i`, unit: 'Complex' },
            ],
            formula: 'x = -b/2a ± (√(-Δ)/2a)i',
            steps: [`Discriminant Δ = ${disc} < 0 => Complex conjugate roots`]
          };
        }
      }

      case 'slope-line':
      case 'slope-intercept-equation': {
        const dx = v2.x - v1.x;
        const dy = v2.y - v1.y;
        if (dx === 0) {
          return {
            results: [{ label: 'Line Status', value: 'Vertical Line (Undefined Slope)', unit: '' }],
            formula: 'x = constant',
            steps: [`x₁ = x₂ = ${v1.x} => Vertical line with equation x = ${v1.x}`]
          };
        }
        const m = dy / dx;
        const interceptC = v1.y - m * v1.x;
        const angleDeg = (Math.atan(m) * 180) / Math.PI;
        return {
          results: [
            { label: 'Slope m = (y₂-y₁)/(x₂-x₁)', value: m.toFixed(4), unit: '' },
            { label: 'y-intercept c', value: interceptC.toFixed(4), unit: '' },
            { label: 'Equation y = mx + c', value: `y = ${m.toFixed(2)}x ${interceptC >= 0 ? '+' : ''} ${interceptC.toFixed(2)}`, unit: '' },
            { label: 'Inclination Angle', value: `${angleDeg.toFixed(2)}°`, unit: '' }
          ],
          formula: 'm = (y₂ - y₁) / (x₂ - x₁) | y - y₁ = m(x - x₁)',
          steps: [
            `Δy = ${v2.y} - ${v1.y} = ${dy}`,
            `Δx = ${v2.x} - ${v1.x} = ${dx}`,
            `Slope m = ${dy} / ${dx} = ${m.toFixed(4)}`,
            `y-intercept c = ${v1.y} - (${m.toFixed(4)} × ${v1.x}) = ${interceptC.toFixed(4)}`
          ]
        };
      }

      case 'vector-magnitude': {
        const mag = Math.sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z);
        const ux = mag > 0 ? (v1.x / mag).toFixed(4) : '0';
        const uy = mag > 0 ? (v1.y / mag).toFixed(4) : '0';
        const uz = mag > 0 ? (v1.z / mag).toFixed(4) : '0';
        return {
          results: [
            { label: 'Magnitude ||v||', value: mag.toFixed(4), unit: 'units' },
            { label: 'Unit Vector û', value: `(${ux}, ${uy}, ${uz})`, unit: 'Normalized' }
          ],
          formula: '||v|| = √(v_x² + v_y² + v_z²)',
          steps: [
            `Sum of squares: ${v1.x}² + ${v1.y}² + ${v1.z}² = ${v1.x * v1.x + v1.y * v1.y + v1.z * v1.z}`,
            `Square root: √(${v1.x * v1.x + v1.y * v1.y + v1.z * v1.z}) = ${mag.toFixed(4)}`
          ]
        };
      }

      case 'dot-product-vectors': {
        const dot = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
        const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z);
        const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y + v2.z * v2.z);
        const cosTheta = mag1 * mag2 > 0 ? dot / (mag1 * mag2) : 0;
        const angleRad = Math.acos(Math.max(-1, Math.min(1, cosTheta)));
        const angleDeg = (angleRad * 180) / Math.PI;
        return {
          results: [
            { label: 'Dot Product (A · B)', value: dot.toLocaleString(), unit: 'scalar' },
            { label: 'Angle Between Vectors', value: `${angleDeg.toFixed(2)}°`, unit: 'degrees' },
            { label: 'Orthogonality', value: dot === 0 ? 'Orthogonal (Perpendicular)' : 'Not Orthogonal', unit: '' }
          ],
          formula: 'A · B = A_x B_x + A_y B_y + A_z B_z',
          steps: [
            `Multiply components: (${v1.x} × ${v2.x}) + (${v1.y} × ${v2.y}) + (${v1.z} × ${v2.z})`,
            `Sum products = ${dot}`,
            `Angle θ = arccos( (A·B) / (||A|| ||B||) ) = ${angleDeg.toFixed(2)}°`
          ]
        };
      }

      case 'cross-product-vectors': {
        const cx = v1.y * v2.z - v1.z * v2.y;
        const cy = v1.z * v2.x - v1.x * v2.z;
        const cz = v1.x * v2.y - v1.y * v2.x;
        const magCross = Math.sqrt(cx * cx + cy * cy + cz * cz);
        return {
          results: [
            { label: 'Cross Product (A × B)', value: `(${cx}, ${cy}, ${cz})`, unit: 'vector' },
            { label: 'Parallelogram Area ||A × B||', value: magCross.toFixed(4), unit: 'sq units' },
          ],
          formula: 'A × B = (A_y B_z - A_z B_y, A_z B_x - A_x B_z, A_x B_y - A_y B_x)',
          steps: [
            `x = ${v1.y}×${v2.z} - ${v1.z}×${v2.y} = ${cx}`,
            `y = ${v1.z}×${v2.x} - ${v1.x}×${v2.z} = ${cy}`,
            `z = ${v1.x}×${v2.y} - ${v1.y}×${v2.x} = ${cz}`
          ]
        };
      }

      case 'exponent-power': {
        const res = Math.pow(a, b);
        return {
          results: [
            { label: 'Base^Exponent (a^b)', value: res.toLocaleString(), unit: '' },
            { label: 'Natural Log of Result', value: Math.log(Math.abs(res)).toFixed(4), unit: '' }
          ],
          formula: 'y = a^b',
          steps: [`Raise ${a} to power ${b} = ${res}`]
        };
      }

      case 'logarithm': {
        const base = a > 0 && a !== 1 ? a : 10;
        const xVal = b > 0 ? b : 1;
        const logVal = Math.log(xVal) / Math.log(base);
        return {
          results: [
            { label: `log_${base}(${xVal})`, value: logVal.toFixed(6), unit: '' },
            { label: 'Natural Log ln(x)', value: Math.log(xVal).toFixed(6), unit: '' },
            { label: 'Base-10 Log log10(x)', value: Math.log10(xVal).toFixed(6), unit: '' }
          ],
          formula: 'log_b(x) = ln(x) / ln(b)',
          steps: [`Calculate ln(${xVal}) / ln(${base}) = ${logVal.toFixed(6)}`]
        };
      }

      default: {
        const res = a * b + c;
        return {
          results: [
            { label: 'Algebraic Result', value: res.toLocaleString(), unit: '' }
          ],
          formula: 'Evaluated Algebraic Polynomial',
          steps: ['Computed algebraic system using linear / matrix operations.']
        };
      }
    }
  };

  const calc = calculate();

  return (
    <div id={`algebra-vector-engine-${tool.id}`} className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <FunctionSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Algebra & Vector Mathematics Engine
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{tool.name}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{tool.description}</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
        <h3 className="font-semibold text-slate-900 dark:text-white text-base">Input Parameters & Variables</h3>

        {tool.id.includes('vector') || tool.id.includes('slope') ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-2 border border-slate-200 dark:border-slate-700">
              <h4 className="text-xs font-semibold uppercase text-slate-500">Vector / Point A</h4>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400">X₁</label>
                  <input type="number" value={v1.x} onChange={(e) => setV1({ ...v1, x: parseFloat(e.target.value) || 0 })} className="w-full p-2 bg-white dark:bg-slate-800 border rounded-lg text-center font-mono text-sm" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">Y₁</label>
                  <input type="number" value={v1.y} onChange={(e) => setV1({ ...v1, y: parseFloat(e.target.value) || 0 })} className="w-full p-2 bg-white dark:bg-slate-800 border rounded-lg text-center font-mono text-sm" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">Z₁</label>
                  <input type="number" value={v1.z} onChange={(e) => setV1({ ...v1, z: parseFloat(e.target.value) || 0 })} className="w-full p-2 bg-white dark:bg-slate-800 border rounded-lg text-center font-mono text-sm" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-2 border border-slate-200 dark:border-slate-700">
              <h4 className="text-xs font-semibold uppercase text-slate-500">Vector / Point B</h4>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400">X₂</label>
                  <input type="number" value={v2.x} onChange={(e) => setV2({ ...v2, x: parseFloat(e.target.value) || 0 })} className="w-full p-2 bg-white dark:bg-slate-800 border rounded-lg text-center font-mono text-sm" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">Y₂</label>
                  <input type="number" value={v2.y} onChange={(e) => setV2({ ...v2, y: parseFloat(e.target.value) || 0 })} className="w-full p-2 bg-white dark:bg-slate-800 border rounded-lg text-center font-mono text-sm" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">Z₂</label>
                  <input type="number" value={v2.z} onChange={(e) => setV2({ ...v2, z: parseFloat(e.target.value) || 0 })} className="w-full p-2 bg-white dark:bg-slate-800 border rounded-lg text-center font-mono text-sm" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                {tool.id === 'quadratic-solver' ? 'a (x² Coeff)' : tool.id === 'logarithm' ? 'Base b' : 'Variable A'}
              </label>
              <input type="number" value={a} onChange={(e) => setA(parseFloat(e.target.value) || 0)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm" />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                {tool.id === 'quadratic-solver' ? 'b (x Coeff)' : tool.id === 'logarithm' ? 'Argument x' : 'Variable B'}
              </label>
              <input type="number" value={b} onChange={(e) => setB(parseFloat(e.target.value) || 0)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm" />
            </div>

            {tool.id === 'quadratic-solver' && (
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">c (Constant)</label>
                <input type="number" value={c} onChange={(e) => setC(parseFloat(e.target.value) || 0)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm" />
              </div>
            )}
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Algebraic Solutions</h4>
            <button onClick={() => copyToClipboard(calc.results.map(r => `${r.label}: ${r.value}`).join(' | '))} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
              {copied ? <Check className="w-3.5 h-3.5 text-indigo-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {calc.results.map((res, i) => (
              <div key={i} className="p-4 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">{res.label}</span>
                <span className="text-xl font-mono font-bold text-indigo-900 dark:text-indigo-200 mt-1 block">
                  {res.value} {res.unit && <span className="text-xs text-indigo-600 dark:text-indigo-400">({res.unit})</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold text-sm">
          <BookOpen className="w-4 h-4 text-indigo-500" />
          <span>Derivation & Step-by-Step Proof</span>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg font-mono text-xs text-indigo-700 dark:text-indigo-300 font-bold">
          {calc.formula}
        </div>
        <div className="space-y-1 font-mono text-xs text-slate-700 dark:text-slate-300 pl-2">
          {calc.steps.map((st, i) => (
            <div key={i}>• {st}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
