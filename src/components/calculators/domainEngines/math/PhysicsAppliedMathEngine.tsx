import React, { useState } from 'react';
import { ToolDef } from '../../../../types';
import { BookOpen, Copy, Check, Zap, Sparkles } from 'lucide-react';

interface PhysicsAppliedMathEngineProps {
  tool: ToolDef;
}

export const PhysicsAppliedMathEngine: React.FC<PhysicsAppliedMathEngineProps> = ({ tool }) => {
  const [copied, setCopied] = useState(false);

  // General Physics Inputs
  const [valM1, setValM1] = useState<number>(100);
  const [valM2, setValM2] = useState<number>(50);
  const [valDist, setValDist] = useState<number>(10);
  const [valForce, setValForce] = useState<number>(250);
  const [valRadius, setValRadius] = useState<number>(0.8);
  const [valAngle, setValAngle] = useState<number>(90);

  // Kinetic Energy Inputs & Units
  const [keMass, setKeMass] = useState<number>(1500);
  const [keMassUnit, setKeMassUnit] = useState<'kg' | 'g' | 'lb' | 'tonne'>('kg');
  const [keVelocity, setKeVelocity] = useState<number>(20);
  const [keVelocityUnit, setKeVelocityUnit] = useState<'m/s' | 'km/h' | 'mph' | 'ft/s'>('m/s');

  // Velocity & Acceleration Inputs
  const [vaInitV, setVaInitV] = useState<number>(0);
  const [vaFinalV, setVaFinalV] = useState<number>(20);
  const [vaTime, setVaTime] = useState<number>(5);

  // Ideal Gas Law
  const [pressureP, setPressureP] = useState<number>(101.325); // kPa
  const [volumeV, setVolumeV] = useState<number>(22.4); // L
  const [molesN, setMolesN] = useState<number>(1); // mol
  const [tempK, setTempK] = useState<number>(273.15); // Kelvin

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculate = () => {
    switch (tool.id) {
      case 'kinetic-energy': {
        // Normalize Mass to kg
        let massInKg = keMass;
        if (keMassUnit === 'g') massInKg = keMass / 1000;
        else if (keMassUnit === 'lb') massInKg = keMass * 0.45359237;
        else if (keMassUnit === 'tonne') massInKg = keMass * 1000;

        // Normalize Velocity to m/s
        let velInMs = keVelocity;
        if (keVelocityUnit === 'km/h') velInMs = keVelocity / 3.6;
        else if (keVelocityUnit === 'mph') velInMs = keVelocity * 0.44704;
        else if (keVelocityUnit === 'ft/s') velInMs = keVelocity * 0.3048;

        const energyJoules = 0.5 * massInKg * velInMs * velInMs;
        const energyKj = energyJoules / 1000;
        const energyMj = energyJoules / 1000000;
        const momentum = massInKg * velInMs;
        const calories = energyJoules / 4184; // kcal
        const wattHours = energyJoules / 3600;

        return {
          results: [
            { label: 'Kinetic Energy (E_k)', value: energyJoules.toLocaleString(undefined, { maximumFractionDigits: 2 }), unit: 'Joules (J)' },
            { label: 'Energy in Kilojoules', value: energyKj.toLocaleString(undefined, { maximumFractionDigits: 3 }), unit: 'kJ' },
            { label: 'Linear Momentum (p = mv)', value: momentum.toLocaleString(undefined, { maximumFractionDigits: 2 }), unit: 'kg·m/s' },
            { label: 'Megajoules (MJ)', value: energyMj.toFixed(4), unit: 'MJ' },
            { label: 'Electrical Energy Equiv.', value: wattHours.toFixed(2), unit: 'Watt-hours (Wh)' },
            { label: 'Nutritional Calorie Equiv.', value: calories.toFixed(3), unit: 'kcal' }
          ],
          formula: 'E_k = ½ × m × v²  |  p = m × v',
          steps: [
            `Mass in SI base units: m = ${keMass} ${keMassUnit} = ${massInKg.toLocaleString()} kg`,
            `Velocity in SI base units: v = ${keVelocity} ${keVelocityUnit} = ${velInMs.toFixed(3)} m/s (equivalent to ${(velInMs * 3.6).toFixed(2)} km/h or ${(velInMs * 2.23694).toFixed(2)} mph)`,
            `Velocity squared: v² = (${velInMs.toFixed(3)} m/s)² = ${(velInMs * velInMs).toFixed(3)} m²/s²`,
            `Kinetic Energy calculation: E_k = 0.5 × ${massInKg.toLocaleString()} kg × ${(velInMs * velInMs).toFixed(3)} m²/s² = ${energyJoules.toLocaleString(undefined, { maximumFractionDigits: 2 })} J (${energyKj.toFixed(2)} kJ)`,
            `Linear Momentum calculation: p = ${massInKg.toLocaleString()} kg × ${velInMs.toFixed(3)} m/s = ${momentum.toLocaleString(undefined, { maximumFractionDigits: 2 })} kg·m/s`
          ]
        };
      }

      case 'velocity-acceleration': {
        const deltaV = vaFinalV - vaInitV;
        const timeSec = Math.max(0.001, vaTime);
        const acceleration = deltaV / timeSec;
        const distance = vaInitV * timeSec + 0.5 * acceleration * timeSec * timeSec;

        return {
          results: [
            { label: 'Acceleration (a)', value: acceleration.toFixed(3), unit: 'm/s²' },
            { label: 'Distance Traveled (d)', value: distance.toFixed(2), unit: 'meters (m)' },
            { label: 'Velocity Change (Δv)', value: deltaV.toFixed(2), unit: 'm/s' },
            { label: 'Acceleration in G-Force', value: (acceleration / 9.80665).toFixed(3), unit: 'g' }
          ],
          formula: 'a = (v - v₀) / t  |  d = v₀·t + ½·a·t²',
          steps: [
            `Change in velocity: Δv = ${vaFinalV} - ${vaInitV} = ${deltaV.toFixed(2)} m/s`,
            `Acceleration: a = ${deltaV.toFixed(2)} m/s ÷ ${timeSec} s = ${acceleration.toFixed(3)} m/s²`,
            `Distance: d = (${vaInitV} × ${timeSec}) + (0.5 × ${acceleration.toFixed(3)} × ${timeSec}²) = ${distance.toFixed(2)} m`
          ]
        };
      }
      case 'gravitational-force': {
        const G = 6.6743e-11; // N·m²/kg²
        const m1 = valM1;
        const m2 = valM2;
        const r = Math.max(0.0001, valDist);
        const force = (G * m1 * m2) / (r * r);

        return {
          results: [
            { label: 'Gravitational Force F', value: force.toExponential(6) + ' N', unit: 'Scientific Notation' },
            { label: 'Force in Micro-Newtons', value: (force * 1e6).toFixed(4) + ' μN', unit: '' }
          ],
          formula: 'F = G × (m₁ × m₂) / r² where G = 6.67430 × 10⁻¹¹ N·m²/kg²',
          steps: [
            `Product of masses: ${m1} × ${m2} = ${m1 * m2} kg²`,
            `Distance squared: ${r}² = ${r * r} m²`,
            `Apply Newton's law: (6.6743e-11 × ${m1 * m2}) / ${r * r} = ${force.toExponential(6)} N`
          ]
        };
      }

      case 'torque-calculator': {
        const F = valForce;
        const r = valRadius;
        const rad = (valAngle * Math.PI) / 180;
        const torque = F * r * Math.sin(rad);

        return {
          results: [
            { label: 'Torque τ = r × F × sin(θ)', value: torque.toFixed(4), unit: 'N·m' },
            { label: 'Torque in Foot-Pounds', value: (torque * 0.737562).toFixed(4), unit: 'lbf·ft' }
          ],
          formula: 'τ = r × F × sin(θ)',
          steps: [
            `Angle sin(${valAngle}°) = ${Math.sin(rad).toFixed(4)}`,
            `Torque: ${r} m × ${F} N × ${Math.sin(rad).toFixed(4)} = ${torque.toFixed(4)} N·m`
          ]
        };
      }

      case 'ideal-gas-law': {
        const R = 8.314462; // L·kPa/(K·mol)
        const computedP = (molesN * R * tempK) / Math.max(0.001, volumeV);

        return {
          results: [
            { label: 'Calculated Pressure P', value: computedP.toFixed(4), unit: 'kPa' },
            { label: 'Atmospheres equivalent', value: (computedP / 101.325).toFixed(4), unit: 'atm' },
            { label: 'Temperature', value: `${tempK} K (${(tempK - 273.15).toFixed(2)} °C)`, unit: '' }
          ],
          formula: 'P × V = n × R × T => P = (nRT) / V',
          steps: [
            `Gas constant R = 8.314 L·kPa/(K·mol)`,
            `Numerator nRT = ${molesN} × 8.314 × ${tempK} = ${(molesN * R * tempK).toFixed(4)}`,
            `Divide by volume V (${volumeV} L) = ${computedP.toFixed(4)} kPa`
          ]
        };
      }

      case 'half-life-decay':
      case 'half-life-radioactive':
      case 'exponential-decay-growth': {
        const initialN0 = valM1;
        const halfLifeT = Math.max(0.0001, valM2);
        const timeT = valDist;
        const remaining = initialN0 * Math.pow(0.5, timeT / halfLifeT);
        const decayConstant = Math.LN2 / halfLifeT;

        return {
          results: [
            { label: 'Remaining Amount N(t)', value: remaining.toFixed(4), unit: 'units' },
            { label: 'Decay Constant λ', value: decayConstant.toFixed(6), unit: '1/time' },
            { label: 'Fraction Remaining', value: ((remaining / initialN0) * 100).toFixed(2) + '%', unit: '' }
          ],
          formula: 'N(t) = N₀ × (1/2)^(t / t_½) | λ = ln(2) / t_½',
          steps: [
            `Half-lives elapsed: ${timeT} / ${halfLifeT} = ${(timeT / halfLifeT).toFixed(4)}`,
            `Decay factor: (1/2)^${(timeT / halfLifeT).toFixed(4)} = ${Math.pow(0.5, timeT / halfLifeT).toFixed(6)}`,
            `Remaining: ${initialN0} × ${Math.pow(0.5, timeT / halfLifeT).toFixed(6)} = ${remaining.toFixed(4)}`
          ]
        };
      }

      case 'density-mass-volume': {
        const mass = valM1;
        const vol = Math.max(0.0001, valM2);
        const density = mass / vol;
        return {
          results: [
            { label: 'Density ρ = m / V', value: density.toFixed(4), unit: 'kg/m³ or g/cm³' },
            { label: 'Specific Gravity (relative to water)', value: (density / 1000).toFixed(4), unit: '' }
          ],
          formula: 'ρ = Mass / Volume',
          steps: [`Density = ${mass} kg / ${vol} m³ = ${density.toFixed(4)} kg/m³`]
        };
      }

      case 'molarity-calc': {
        const moles = valM1;
        const volL = Math.max(0.0001, valM2);
        const molarity = moles / volL;
        return {
          results: [
            { label: 'Molarity M', value: molarity.toFixed(4), unit: 'mol/L (M)' },
            { label: 'Concentration in mM', value: (molarity * 1000).toFixed(2), unit: 'mM' }
          ],
          formula: 'M = Moles of Solute / Liters of Solution',
          steps: [`Molarity = ${moles} mol / ${volL} L = ${molarity.toFixed(4)} M`]
        };
      }

      case 'fuel-consumption': {
        const distance = valM1; // km
        const fuel = valM2; // Liters
        const lPer100 = distance > 0 ? (fuel / distance) * 100 : 0;
        const mpg = lPer100 > 0 ? 235.215 / lPer100 : 0;
        return {
          results: [
            { label: 'Fuel Economy L/100km', value: lPer100.toFixed(2), unit: 'L/100km' },
            { label: 'Miles Per Gallon (US MPG)', value: mpg.toFixed(2), unit: 'MPG' }
          ],
          formula: 'Consumption = (Liters / Kilometers) × 100',
          steps: [`(${fuel} L / ${distance} km) × 100 = ${lPer100.toFixed(2)} L/100km`]
        };
      }

      case 'sound-db-distance': {
        const db1 = valM1;
        const d1 = Math.max(0.001, valM2);
        const d2 = Math.max(0.001, valDist);
        const db2 = db1 - 20 * Math.log10(d2 / d1);
        return {
          results: [
            { label: `Sound Level at Distance d₂ (${d2}m)`, value: db2.toFixed(2), unit: 'dB' },
            { label: 'Attenuation Loss', value: (db1 - db2).toFixed(2), unit: 'dB' }
          ],
          formula: 'L₂ = L₁ - 20 × log₁₀(d₂ / d₁)',
          steps: [
            `Distance ratio d₂/d₁ = ${d2} / ${d1} = ${(d2 / d1).toFixed(4)}`,
            `20 × log₁₀(${(d2 / d1).toFixed(4)}) = ${(20 * Math.log10(d2 / d1)).toFixed(2)} dB drop`,
            `L₂ = ${db1} - ${(20 * Math.log10(d2 / d1)).toFixed(2)} = ${db2.toFixed(2)} dB`
          ]
        };
      }

      default: {
        const ke = 0.5 * valM1 * valM2 * valM2;
        return {
          results: [
            { label: 'Kinetic Energy KE', value: ke.toFixed(4), unit: 'Joules' }
          ],
          formula: 'KE = ½ m v²',
          steps: [`½ × ${valM1} × ${valM2}² = ${ke.toFixed(4)} J`]
        };
      }
    }
  };

  const calc = calculate();

  return (
    <div id={`physics-engine-${tool.id}`} className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Physics & Applied Applied Science Math Engine
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{tool.name}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{tool.description}</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-semibold text-slate-900 dark:text-white text-base">
            {tool.id === 'kinetic-energy' ? 'Kinetic Energy Parameters' : 'Physical Parameters'}
          </h3>
          {tool.id === 'kinetic-energy' && (
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> E_k = ½mv²
            </span>
          )}
        </div>

        {/* Quick Presets for Kinetic Energy */}
        {tool.id === 'kinetic-energy' && (
          <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Quick Scenarios:</span>
            <button
              type="button"
              onClick={() => {
                setKeMass(1500);
                setKeMassUnit('kg');
                setKeVelocity(20);
                setKeVelocityUnit('m/s');
              }}
              className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-200 hover:text-indigo-600 font-medium border border-slate-200 dark:border-slate-600 transition"
            >
              Passenger Vehicle (1,500 kg @ 72 km/h)
            </button>
            <button
              type="button"
              onClick={() => {
                setKeMass(75);
                setKeMassUnit('kg');
                setKeVelocity(10);
                setKeVelocityUnit('m/s');
              }}
              className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-200 hover:text-indigo-600 font-medium border border-slate-200 dark:border-slate-600 transition"
            >
              Sprinter Athlete (75 kg @ 10 m/s)
            </button>
            <button
              type="button"
              onClick={() => {
                setKeMass(0.145);
                setKeMassUnit('kg');
                setKeVelocity(40);
                setKeVelocityUnit('m/s');
              }}
              className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-200 hover:text-indigo-600 font-medium border border-slate-200 dark:border-slate-600 transition"
            >
              Baseball Fastball (145 g @ 144 km/h)
            </button>
            <button
              type="button"
              onClick={() => {
                setKeMass(9);
                setKeMassUnit('g');
                setKeVelocity(380);
                setKeVelocityUnit('m/s');
              }}
              className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-200 hover:text-indigo-600 font-medium border border-slate-200 dark:border-slate-600 transition"
            >
              9mm Bullet (9 g @ 380 m/s)
            </button>
          </div>
        )}

        {/* Specialized Input Controls */}
        {tool.id === 'kinetic-energy' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Mass (m)
                </label>
                <span className="text-xs text-slate-400">Object mass or weight</span>
              </div>
              <div className="flex rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={keMass}
                  onChange={(e) => setKeMass(parseFloat(e.target.value) || 0)}
                  className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm focus:outline-hidden"
                />
                <select
                  value={keMassUnit}
                  onChange={(e) => setKeMassUnit(e.target.value as any)}
                  className="px-3 py-2.5 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs border-l border-slate-300 dark:border-slate-600 focus:outline-hidden"
                >
                  <option value="kg">Kilograms (kg)</option>
                  <option value="g">Grams (g)</option>
                  <option value="lb">Pounds (lb)</option>
                  <option value="tonne">Metric Ton (t)</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Velocity (v)
                </label>
                <span className="text-xs text-slate-400">Speed of motion</span>
              </div>
              <div className="flex rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={keVelocity}
                  onChange={(e) => setKeVelocity(parseFloat(e.target.value) || 0)}
                  className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm focus:outline-hidden"
                />
                <select
                  value={keVelocityUnit}
                  onChange={(e) => setKeVelocityUnit(e.target.value as any)}
                  className="px-3 py-2.5 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs border-l border-slate-300 dark:border-slate-600 focus:outline-hidden"
                >
                  <option value="m/s">Meters / sec (m/s)</option>
                  <option value="km/h">Kilometers / hr (km/h)</option>
                  <option value="mph">Miles / hr (mph)</option>
                  <option value="ft/s">Feet / sec (ft/s)</option>
                </select>
              </div>
            </div>
          </div>
        ) : tool.id === 'velocity-acceleration' ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Initial Velocity v₀ (m/s)</label>
              <input type="number" value={vaInitV} onChange={(e) => setVaInitV(parseFloat(e.target.value) || 0)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Final Velocity v (m/s)</label>
              <input type="number" value={vaFinalV} onChange={(e) => setVaFinalV(parseFloat(e.target.value) || 0)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Time Elapsed t (seconds)</label>
              <input type="number" min="0.001" step="any" value={vaTime} onChange={(e) => setVaTime(parseFloat(e.target.value) || 0.001)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm" />
            </div>
          </div>
        ) : tool.id === 'ideal-gas-law' ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Moles n (mol)</label>
              <input type="number" min="0" value={molesN} onChange={(e) => setMolesN(parseFloat(e.target.value) || 0)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Volume V (Liters)</label>
              <input type="number" min="0" value={volumeV} onChange={(e) => setVolumeV(parseFloat(e.target.value) || 0)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Temperature T (Kelvin)</label>
              <input type="number" min="0" value={tempK} onChange={(e) => setTempK(parseFloat(e.target.value) || 0)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                {tool.id.includes('half-life') ? 'Initial Quantity (N₀)' : 'Mass / Primary Parameter (m₁)'}
              </label>
              <input type="number" value={valM1} onChange={(e) => setValM1(parseFloat(e.target.value) || 0)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm" />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                {tool.id.includes('half-life') ? 'Half-Life Period (t_½)' : 'Secondary Parameter (m₂ / r)'}
              </label>
              <input type="number" value={valM2} onChange={(e) => setValM2(parseFloat(e.target.value) || 0)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm" />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                {tool.id.includes('half-life') ? 'Elapsed Time (t)' : 'Distance / Angle (r / θ)'}
              </label>
              <input type="number" value={valDist} onChange={(e) => setValDist(parseFloat(e.target.value) || 0)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm" />
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Physical Outputs</h4>
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
          <span>Physical Law & Formula Proof</span>
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
