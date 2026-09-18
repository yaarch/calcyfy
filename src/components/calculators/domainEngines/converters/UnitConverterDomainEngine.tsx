import React, { useState } from 'react';
import { ToolDef } from '../../../../types';
import { ArrowLeftRight, Check, Copy, Info, Calculator, BookOpen } from 'lucide-react';

interface UnitConverterDomainEngineProps {
  tool: ToolDef;
}

interface ConversionUnit {
  key: string;
  label: string;
  symbol: string;
  factorToBase: number; // multiplier to convert to base unit
}

interface ConverterSpec {
  title: string;
  description: string;
  baseUnit: string;
  category: string;
  units: ConversionUnit[];
  formulaDescription: string;
  example: {
    inputVal: number;
    fromUnitKey: string;
    toUnitKey: string;
    stepByStep: string;
  };
}

const CONVERTER_SPECS: Record<string, ConverterSpec> = {
  'pressure-unit': {
    title: 'Pressure Unit Converter',
    description: 'Convert between Pa, kPa, bar, psi, atm, and mmHg using exact fluid pressure scale factors.',
    baseUnit: 'Pa',
    category: 'Pressure',
    units: [
      { key: 'pa', label: 'Pascal', symbol: 'Pa', factorToBase: 1 },
      { key: 'kpa', label: 'Kilopascal', symbol: 'kPa', factorToBase: 1000 },
      { key: 'mpa', label: 'Megapascal', symbol: 'MPa', factorToBase: 1000000 },
      { key: 'bar', label: 'Bar', symbol: 'bar', factorToBase: 100000 },
      { key: 'psi', label: 'Pounds per Sq Inch', symbol: 'psi', factorToBase: 6894.75729 },
      { key: 'atm', label: 'Standard Atmosphere', symbol: 'atm', factorToBase: 101325 },
      { key: 'mmhg', label: 'Millimeters of Mercury (Torr)', symbol: 'mmHg', factorToBase: 133.322368 }
    ],
    formulaDescription: 'P_target = P_source × (Factor_source / Factor_target)',
    example: {
      inputVal: 1,
      fromUnitKey: 'atm',
      toUnitKey: 'psi',
      stepByStep: '1 atm = 101,325 Pa. 101,325 Pa ÷ 6,894.757 psi/Pa = 14.6959 psi.'
    }
  },
  'energy-power': {
    title: 'Energy & Power Unit Converter',
    description: 'Convert energy and power metrics across Joules, kWh, Calories, BTU, Watts, and Horsepower.',
    baseUnit: 'J',
    category: 'Energy & Power',
    units: [
      { key: 'j', label: 'Joule', symbol: 'J', factorToBase: 1 },
      { key: 'kj', label: 'Kilojoule', symbol: 'kJ', factorToBase: 1000 },
      { key: 'kwh', label: 'Kilowatt-hour', symbol: 'kWh', factorToBase: 3600000 },
      { key: 'cal', label: 'Calorie (thermochemical)', symbol: 'cal', factorToBase: 4.184 },
      { key: 'kcal', label: 'Kilocalorie (Food Cal)', symbol: 'kcal', factorToBase: 4184 },
      { key: 'btu', label: 'British Thermal Unit', symbol: 'BTU', factorToBase: 1055.06 },
      { key: 'w', label: 'Watt (J/s)', symbol: 'W', factorToBase: 1 },
      { key: 'kw', label: 'Kilowatt', symbol: 'kW', factorToBase: 1000 },
      { key: 'hp', label: 'Mechanical Horsepower', symbol: 'hp', factorToBase: 745.699872 }
    ],
    formulaDescription: 'Value_target = Value_source × (Factor_source / Factor_target)',
    example: {
      inputVal: 1,
      fromUnitKey: 'kwh',
      toUnitKey: 'btu',
      stepByStep: '1 kWh = 3,600,000 Joules. 3,600,000 J ÷ 1,055.06 J/BTU = 3,412.14 BTU.'
    }
  },
  'angle-unit': {
    title: 'Angle Degrees Radians Converter',
    description: 'Convert planar angle measurements across Degrees, Radians, Gradians, Arcminutes, and Revolutions.',
    baseUnit: 'rad',
    category: 'Angle',
    units: [
      { key: 'rad', label: 'Radian', symbol: 'rad', factorToBase: 1 },
      { key: 'deg', label: 'Degree', symbol: '°', factorToBase: Math.PI / 180 },
      { key: 'grad', label: 'Gradian (Goniometer)', symbol: 'grad', factorToBase: Math.PI / 200 },
      { key: 'arcmin', label: 'Arcminute', symbol: '′', factorToBase: Math.PI / 10800 },
      { key: 'arcsec', label: 'Arcsecond', symbol: '″', factorToBase: Math.PI / 648000 },
      { key: 'rev', label: 'Full Revolution (Turn)', symbol: 'tr', factorToBase: 2 * Math.PI }
    ],
    formulaDescription: 'Rad = Deg × (π / 180) | Target_Angle = Rad / Target_Factor',
    example: {
      inputVal: 180,
      fromUnitKey: 'deg',
      toUnitKey: 'rad',
      stepByStep: '180° × (π / 180) = π radians ≈ 3.14159 rad.'
    }
  },
  'force-unit': {
    title: 'Force Unit Converter',
    description: 'Convert physical forces between Newtons, Kilonewtons, Pound-force, Dynes, and Kilogram-force.',
    baseUnit: 'N',
    category: 'Force',
    units: [
      { key: 'n', label: 'Newton', symbol: 'N', factorToBase: 1 },
      { key: 'kn', label: 'Kilonewton', symbol: 'kN', factorToBase: 1000 },
      { key: 'lbf', label: 'Pound-force', symbol: 'lbf', factorToBase: 4.4482216152605 },
      { key: 'dyn', label: 'Dyne', symbol: 'dyn', factorToBase: 0.00001 },
      { key: 'kgf', label: 'Kilogram-force (Kilopond)', symbol: 'kgf', factorToBase: 9.80665 }
    ],
    formulaDescription: 'F_target = F_source × (Factor_source / Factor_target)',
    example: {
      inputVal: 100,
      fromUnitKey: 'lbf',
      toUnitKey: 'n',
      stepByStep: '100 lbf × 4.44822 N/lbf = 444.822 Newtons.'
    }
  },
  'torque-unit': {
    title: 'Torque Unit Converter',
    description: 'Convert rotational torque between Newton-meters, Foot-pounds, Inch-pounds, and kgf-meters.',
    baseUnit: 'N·m',
    category: 'Torque',
    units: [
      { key: 'nm', label: 'Newton-meter', symbol: 'N·m', factorToBase: 1 },
      { key: 'lbfft', label: 'Foot-pound force', symbol: 'lbf·ft', factorToBase: 1.3558179483314004 },
      { key: 'lbfin', label: 'Inch-pound force', symbol: 'lbf·in', factorToBase: 0.1129848290276167 },
      { key: 'kgfm', label: 'Kilogram-force meter', symbol: 'kgf·m', factorToBase: 9.80665 }
    ],
    formulaDescription: 'τ_target = τ_source × (Factor_source / Factor_target)',
    example: {
      inputVal: 50,
      fromUnitKey: 'lbfft',
      toUnitKey: 'nm',
      stepByStep: '50 lbf·ft × 1.355818 N·m/lbf·ft = 67.791 Newton-meters.'
    }
  }
};

export const UnitConverterDomainEngine: React.FC<UnitConverterDomainEngineProps> = ({ tool }) => {
  const spec = CONVERTER_SPECS[tool.id] || CONVERTER_SPECS['pressure-unit'];

  const [inputValue, setInputValue] = useState<number>(spec.example.inputVal);
  const [fromUnitKey, setFromUnitKey] = useState<string>(spec.units[0].key);
  const [toUnitKey, setToUnitKey] = useState<string>(spec.units[1] ? spec.units[1].key : spec.units[0].key);
  const [copied, setCopied] = useState(false);

  const fromUnit = spec.units.find(u => u.key === fromUnitKey) || spec.units[0];
  const toUnit = spec.units.find(u => u.key === toUnitKey) || spec.units[1] || spec.units[0];

  // Perform exact unit scale conversion
  const baseValue = inputValue * fromUnit.factorToBase;
  const resultValue = baseValue / toUnit.factorToBase;

  const handleSwap = () => {
    setFromUnitKey(toUnitKey);
    setToUnitKey(fromUnitKey);
  };

  const formattedResult = Number.isFinite(resultValue)
    ? (Math.abs(resultValue) < 0.0001 || Math.abs(resultValue) > 1000000
        ? resultValue.toExponential(6)
        : resultValue.toLocaleString(undefined, { maximumFractionDigits: 6 }))
    : '0';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${inputValue} ${fromUnit.symbol} = ${formattedResult} ${toUnit.symbol}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id={`unit-converter-engine-${tool.id}`} className="max-w-4xl mx-auto space-y-6">
      {/* Primary Header Card */}
      <div id="unit-converter-header" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-md">
              {spec.category} Unit Scale
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{tool.name || spec.title}</h2>
          </div>
          <button
            id="unit-converter-copy-btn"
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Conversion'}
          </button>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">{spec.description}</p>
      </div>

      {/* Interactive Conversion Grid */}
      <div id="unit-converter-controls" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
          {/* Source Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Source Value & Unit</label>
            <input
              id="unit-converter-input-val"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-lg font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <select
              id="unit-converter-from-select"
              value={fromUnitKey}
              onChange={(e) => setFromUnitKey(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {spec.units.map((u) => (
                <option key={u.key} value={u.key}>
                  {u.label} ({u.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center md:pt-6">
            <button
              id="unit-converter-swap-btn"
              onClick={handleSwap}
              title="Swap From and To units"
              className="p-3 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 transition-colors border border-emerald-200 dark:border-emerald-800"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>
          </div>

          {/* Target Output Display */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Target Result Unit</label>
            <div id="unit-converter-result-display" className="w-full px-4 py-2.5 rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 text-lg font-mono font-semibold truncate">
              {formattedResult} <span className="text-sm font-sans font-normal text-emerald-700 dark:text-emerald-400">{toUnit.symbol}</span>
            </div>
            <select
              id="unit-converter-to-select"
              value={toUnitKey}
              onChange={(e) => setToUnitKey(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {spec.units.map((u) => (
                <option key={u.key} value={u.key}>
                  {u.label} ({u.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Multi-Unit Quick Reference Table */}
        <div id="unit-converter-quick-ref" className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            Equivalent Scales for {inputValue} {fromUnit.symbol}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {spec.units.map((u) => {
              const val = (baseValue / u.factorToBase);
              const fmt = Math.abs(val) < 0.0001 || Math.abs(val) > 1000000
                ? val.toExponential(4)
                : val.toLocaleString(undefined, { maximumFractionDigits: 4 });
              return (
                <div key={u.key} className={`p-2.5 rounded-lg text-xs border ${u.key === toUnitKey ? 'bg-emerald-50 border-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-800' : 'bg-slate-50 border-slate-200 dark:bg-slate-800/50 dark:border-slate-700'}`}>
                  <span className="text-slate-500 dark:text-slate-400 block">{u.label}</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white mt-0.5 block truncate">
                    {fmt} {u.symbol}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Formula & Educational Worked Example Section */}
      <div id="unit-converter-methodology" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold text-sm">
            <Calculator className="w-4 h-4 text-emerald-500" />
            <span>Mathematical Model & Formula</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs font-mono text-slate-800 dark:text-slate-200">
            {spec.formulaDescription}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            All conversions normalize through SI base reference values ({spec.baseUnit}) to guarantee precision without cumulative rounding distortion.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold text-sm">
            <BookOpen className="w-4 h-4 text-emerald-500" />
            <span>Concrete Worked Example</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
            Converting {spec.example.inputVal} {spec.units.find(u => u.key === spec.example.fromUnitKey)?.symbol} to {spec.units.find(u => u.key === spec.example.toUnitKey)?.symbol}:
          </p>
          <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900 rounded-lg text-xs text-emerald-900 dark:text-emerald-200">
            {spec.example.stepByStep}
          </div>
        </div>
      </div>
    </div>
  );
};
