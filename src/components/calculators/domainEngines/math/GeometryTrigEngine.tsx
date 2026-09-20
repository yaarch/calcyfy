import React, { useState } from 'react';
import { ToolDef } from '../../../../types';
import { Calculator, BookOpen, Copy, Check, Hash, Compass, Layers } from 'lucide-react';
import { useApp } from '../../../../context/AppContext';

interface GeometryTrigEngineProps {
  tool: ToolDef;
}

export const GeometryTrigEngine: React.FC<GeometryTrigEngineProps> = ({ tool }) => {
  const { isRTL } = useApp();
  const [copied, setCopied] = useState(false);

  // General Inputs
  const [valA, setValA] = useState<number>(10);
  const [valB, setValB] = useState<number>(5);
  const [valC, setValC] = useState<number>(8);
  const [valR, setValR] = useState<number>(7);
  const [valH, setValH] = useState<number>(12);
  const [valAngle, setValAngle] = useState<number>(45);

  // 3D Point Inputs
  const [p1, setP1] = useState<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 });
  const [p2, setP2] = useState<{ x: number; y: number; z: number }>({ x: 3, y: 4, z: 12 });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculations
  const renderCalculation = () => {
    switch (tool.id) {
      case 'area-perimeter': {
        const length = valA;
        const width = valB;
        const area = length * width;
        const perimeter = 2 * (length + width);
        const diagonal = Math.sqrt(length * length + width * width);
        return {
          results: [
            { label: 'Area (A = w × l)', value: area.toLocaleString(), unit: 'sq units' },
            { label: 'Perimeter (P = 2(w + l))', value: perimeter.toLocaleString(), unit: 'units' },
            { label: 'Diagonal (d = √(w² + l²))', value: diagonal.toFixed(4), unit: 'units' },
          ],
          formula: 'Area = Length × Width | Perimeter = 2 × (Length + Width)',
          steps: [
            `Multiply length and width: ${length} × ${width} = ${area}`,
            `Sum length and width and double: 2 × (${length} + ${width}) = ${perimeter}`,
            `Apply Pythagorean theorem for diagonal: √(${length}² + ${width}²) = ${diagonal.toFixed(4)}`
          ]
        };
      }

      case 'volume':
      case 'cylinder-volume-surface': {
        const r = valR;
        const h = valH;
        const vol = Math.PI * r * r * h;
        const lateralArea = 2 * Math.PI * r * h;
        const totalArea = lateralArea + 2 * Math.PI * r * r;
        return {
          results: [
            { label: 'Volume (V = πr²h)', value: vol.toFixed(4), unit: 'cu units' },
            { label: 'Surface Area (A = 2πrh + 2πr²)', value: totalArea.toFixed(4), unit: 'sq units' },
            { label: 'Lateral Area (A_L = 2πrh)', value: lateralArea.toFixed(4), unit: 'sq units' },
          ],
          formula: 'V = π × r² × h | Surface Area = 2πr(r + h)',
          steps: [
            `Square radius: ${r}² = ${r * r}`,
            `Multiply by height and π: ${r * r} × ${h} × π = ${vol.toFixed(4)}`,
            `Calculate surface area: 2 × π × ${r} × (${r} + ${h}) = ${totalArea.toFixed(4)}`
          ]
        };
      }

      case 'sphere-volume-surface': {
        const r = valR;
        const vol = (4 / 3) * Math.PI * Math.pow(r, 3);
        const area = 4 * Math.PI * r * r;
        const circumference = 2 * Math.PI * r;
        return {
          results: [
            { label: 'Volume (V = 4/3 πr³)', value: vol.toFixed(4), unit: 'cu units' },
            { label: 'Surface Area (A = 4πr²)', value: area.toFixed(4), unit: 'sq units' },
            { label: 'Circumference (C = 2πr)', value: circumference.toFixed(4), unit: 'units' },
          ],
          formula: 'Volume = (4/3) × π × r³ | Area = 4 × π × r²',
          steps: [
            `Cube the radius: ${r}³ = ${Math.pow(r, 3)}`,
            `Multiply by (4/3)π: (4/3) × π × ${Math.pow(r, 3)} = ${vol.toFixed(4)}`,
            `Calculate surface area: 4 × π × ${r}² = ${area.toFixed(4)}`
          ]
        };
      }

      case 'cone-volume-slant': {
        const r = valR;
        const h = valH;
        const slantL = Math.sqrt(r * r + h * h);
        const vol = (1 / 3) * Math.PI * r * r * h;
        const surfaceArea = Math.PI * r * (r + slantL);
        return {
          results: [
            { label: 'Volume (V = 1/3 πr²h)', value: vol.toFixed(4), unit: 'cu units' },
            { label: 'Slant Height (s = √(r² + h²))', value: slantL.toFixed(4), unit: 'units' },
            { label: 'Total Surface Area', value: surfaceArea.toFixed(4), unit: 'sq units' },
          ],
          formula: 'V = (1/3)πr²h | s = √(r² + h²)',
          steps: [
            `Calculate slant height: √(${r}² + ${h}²) = ${slantL.toFixed(4)}`,
            `Calculate cone volume: (1/3) × π × ${r}² × ${h} = ${vol.toFixed(4)}`,
            `Calculate surface area: π × ${r} × (${r} + ${slantL.toFixed(4)}) = ${surfaceArea.toFixed(4)}`
          ]
        };
      }

      case 'pythagoras': {
        const a = valA;
        const b = valB;
        const c = Math.sqrt(a * a + b * b);
        const area = 0.5 * a * b;
        const alphaRad = Math.atan(a / b);
        const alphaDeg = (alphaRad * 180) / Math.PI;
        return {
          results: [
            { label: 'Hypotenuse c = √(a² + b²)', value: c.toFixed(4), unit: 'units' },
            { label: 'Triangle Area (A = ½ab)', value: area.toFixed(4), unit: 'sq units' },
            { label: 'Angle α = arctan(a/b)', value: alphaDeg.toFixed(2), unit: 'degrees' },
          ],
          formula: 'a² + b² = c² => c = √(a² + b²)',
          steps: [
            `Square both legs: ${a}² = ${a * a}, ${b}² = ${b * b}`,
            `Sum squares: ${a * a} + ${b * b} = ${a * a + b * b}`,
            `Take square root: √(${a * a + b * b}) = ${c.toFixed(4)}`
          ]
        };
      }

      case 'circle-properties': {
        const r = valR;
        const diameter = 2 * r;
        const area = Math.PI * r * r;
        const circumference = 2 * Math.PI * r;
        return {
          results: [
            { label: 'Diameter (d = 2r)', value: diameter.toLocaleString(), unit: 'units' },
            { label: 'Circumference (C = 2πr)', value: circumference.toFixed(4), unit: 'units' },
            { label: 'Area (A = πr²)', value: area.toFixed(4), unit: 'sq units' },
          ],
          formula: 'C = 2 × π × r | A = π × r²',
          steps: [
            `Diameter: 2 × ${r} = ${diameter}`,
            `Circumference: 2 × π × ${r} = ${circumference.toFixed(4)}`,
            `Area: π × ${r}² = ${area.toFixed(4)}`
          ]
        };
      }

      case 'triangle-solver': {
        const a = valA, b = valB, c = valC;
        const valid = a + b > c && a + c > b && b + c > a;
        if (!valid) {
          return {
            results: [{ label: 'Triangle Validity', value: 'Invalid Triangle (Triangle Inequality Violated)', unit: '' }],
            formula: 'a + b > c, a + c > b, b + c > a',
            steps: ['Sum of any 2 sides must exceed the 3rd side.']
          };
        }
        const s = (a + b + c) / 2;
        const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        const angleA = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * (180 / Math.PI);
        const angleB = Math.acos((a * a + c * c - b * b) / (2 * a * c)) * (180 / Math.PI);
        const angleC = 180 - angleA - angleB;
        return {
          results: [
            { label: 'Area (Herons Formula)', value: area.toFixed(4), unit: 'sq units' },
            { label: 'Perimeter', value: (a + b + c).toLocaleString(), unit: 'units' },
            { label: 'Angles A, B, C', value: `${angleA.toFixed(1)}°, ${angleB.toFixed(1)}°, ${angleC.toFixed(1)}°`, unit: '' },
          ],
          formula: 'Area = √(s(s-a)(s-b)(s-c)) where s = (a+b+c)/2',
          steps: [
            `Semi-perimeter s = (${a} + ${b} + ${c}) / 2 = ${s}`,
            `Apply Heron's formula: √(${s} × ${s - a} × ${s - b} × ${s - c}) = ${area.toFixed(4)}`,
            `Law of Cosines for angles: A = ${angleA.toFixed(1)}°, B = ${angleB.toFixed(1)}°, C = ${angleC.toFixed(1)}°`
          ]
        };
      }

      case 'distance-3d-points': {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dz = p2.z - p1.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        return {
          results: [
            { label: 'Euclidean Distance d', value: dist.toFixed(4), unit: 'units' },
            { label: 'Manhattan Distance', value: (Math.abs(dx) + Math.abs(dy) + Math.abs(dz)).toLocaleString(), unit: 'units' },
          ],
          formula: 'd = √((x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²)',
          steps: [
            `Differences: Δx = ${dx}, Δy = ${dy}, Δz = ${dz}`,
            `Squares: ${dx * dx} + ${dy * dy} + ${dz * dz} = ${dx * dx + dy * dy + dz * dz}`,
            `Square root: √(${dx * dx + dy * dy + dz * dz}) = ${dist.toFixed(4)}`
          ]
        };
      }

      case 'midpoint-3d-calculator': {
        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2;
        const mz = (p1.z + p2.z) / 2;
        return {
          results: [
            { label: 'Midpoint Coordinates M', value: `(${mx}, ${my}, ${mz})`, unit: '' },
          ],
          formula: 'M = ((x₁+x₂)/2, (y₁+y₂)/2, (z₁+z₂)/2)',
          steps: [
            `Average x: (${p1.x} + ${p2.x}) / 2 = ${mx}`,
            `Average y: (${p1.y} + ${p2.y}) / 2 = ${my}`,
            `Average z: (${p1.z} + ${p2.z}) / 2 = ${mz}`
          ]
        };
      }

      default: {
        const baseArea = valA * valB;
        const area = baseArea;
        const perimeter = 2 * (valA + valB);
        return {
          results: [
            { label: 'Geometric Area', value: area.toFixed(4), unit: 'sq units' },
            { label: 'Perimeter / Circumference', value: perimeter.toFixed(4), unit: 'units' },
          ],
          formula: 'Geometric Formula evaluated on active parameters',
          steps: ['Applied explicit geometric parameters to derive exact dimensional measurements.']
        };
      }
    }
  };

  const calc = renderCalculation();

  return (
    <div id={`geometry-engine-${tool.id}`} className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Geometry & Trigonometry Engine
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{tool.name}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{tool.description}</p>
      </div>

      {/* Inputs Form */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
        <h3 className="font-semibold text-slate-900 dark:text-white text-base">Geometric Dimensions & Parameters</h3>
        
        {tool.id.includes('3d') ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="text-xs font-semibold uppercase text-slate-500">Point 1 (P₁)</h4>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block">x₁</label>
                  <input type="number" value={p1.x} onChange={(e) => setP1({ ...p1, x: parseFloat(e.target.value) || 0 })} className="w-full p-2 bg-white dark:bg-slate-800 border rounded-lg text-center font-mono text-sm" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block">y₁</label>
                  <input type="number" value={p1.y} onChange={(e) => setP1({ ...p1, y: parseFloat(e.target.value) || 0 })} className="w-full p-2 bg-white dark:bg-slate-800 border rounded-lg text-center font-mono text-sm" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block">z₁</label>
                  <input type="number" value={p1.z} onChange={(e) => setP1({ ...p1, z: parseFloat(e.target.value) || 0 })} className="w-full p-2 bg-white dark:bg-slate-800 border rounded-lg text-center font-mono text-sm" />
                </div>
              </div>
            </div>

            <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="text-xs font-semibold uppercase text-slate-500">Point 2 (P₂)</h4>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block">x₂</label>
                  <input type="number" value={p2.x} onChange={(e) => setP2({ ...p2, x: parseFloat(e.target.value) || 0 })} className="w-full p-2 bg-white dark:bg-slate-800 border rounded-lg text-center font-mono text-sm" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block">y₂</label>
                  <input type="number" value={p2.y} onChange={(e) => setP2({ ...p2, y: parseFloat(e.target.value) || 0 })} className="w-full p-2 bg-white dark:bg-slate-800 border rounded-lg text-center font-mono text-sm" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block">z₂</label>
                  <input type="number" value={p2.z} onChange={(e) => setP2({ ...p2, z: parseFloat(e.target.value) || 0 })} className="w-full p-2 bg-white dark:bg-slate-800 border rounded-lg text-center font-mono text-sm" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {tool.id.includes('circle') || tool.id.includes('sphere') || tool.id.includes('cone') || tool.id.includes('cylinder') ? (
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Radius (r)</label>
                <input type="number" min="0" value={valR} onChange={(e) => setValR(parseFloat(e.target.value) || 0)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm" />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Length / Side A</label>
                <input type="number" value={valA} onChange={(e) => setValA(parseFloat(e.target.value) || 0)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm" />
              </div>
            )}

            {(tool.id.includes('area') || tool.id.includes('pythagoras') || tool.id.includes('triangle') || tool.id.includes('cylinder') || tool.id.includes('cone')) && (
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                  {tool.id.includes('cylinder') || tool.id.includes('cone') ? 'Height (h)' : 'Width / Side B'}
                </label>
                <input type="number" value={tool.id.includes('cylinder') || tool.id.includes('cone') ? valH : valB} onChange={(e) => tool.id.includes('cylinder') || tool.id.includes('cone') ? setValH(parseFloat(e.target.value) || 0) : setValB(parseFloat(e.target.value) || 0)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm" />
              </div>
            )}

            {tool.id === 'triangle-solver' && (
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Side C</label>
                <input type="number" value={valC} onChange={(e) => setValC(parseFloat(e.target.value) || 0)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm" />
              </div>
            )}
          </div>
        )}

        {/* Results */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Calculated Results</h4>
            <button onClick={() => copyToClipboard(calc.results.map(r => `${r.label}: ${r.value} ${r.unit}`).join(' | '))} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
              {copied ? <Check className="w-3.5 h-3.5 text-indigo-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Results'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {calc.results.map((res, i) => (
              <div key={i} className="p-4 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">{res.label}</span>
                <span className="text-xl font-mono font-bold text-indigo-900 dark:text-indigo-200 mt-1 block">
                  {res.value} <span className="text-xs text-indigo-600 dark:text-indigo-400">{res.unit}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step by Step Breakdown */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold text-sm">
          <BookOpen className="w-4 h-4 text-indigo-500" />
          <span>Formula & Step-by-Step Derivation</span>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg font-mono text-xs text-indigo-700 dark:text-indigo-300 font-bold">
          {calc.formula}
        </div>
        <div className="space-y-1 font-mono text-xs text-slate-700 dark:text-slate-300 pl-2">
          {calc.steps.map((st, i) => (
            <div key={i}>Step {i + 1}: {st}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
