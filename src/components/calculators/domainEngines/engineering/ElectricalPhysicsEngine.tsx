import React, { useState } from 'react';
import { useApp } from '../../../../context/AppContext';
import { Tool } from '../../../../types';
import { Copy, Check, Zap, Gauge, Wrench, ShieldAlert } from 'lucide-react';

interface ElectricalPhysicsEngineProps {
  tool: Tool;
}

export const ElectricalPhysicsEngine: React.FC<ElectricalPhysicsEngineProps> = ({ tool }) => {
  const { t, addHistory } = useApp();
  const [copied, setCopied] = useState(false);

  // States for electrical & automotive inputs
  const [voltage, setVoltage] = useState<string>('120');
  const [currentAmps, setCurrentAmps] = useState<string>('20');
  const [distanceFeet, setDistanceFeet] = useState<string>('100');
  const [wireGaugeAwg, setWireGaugeAwg] = useState<string>('12');
  const [sourceVoltage, setSourceVoltage] = useState<string>('12');
  const [ledForwardVolts, setLedForwardVolts] = useState<string>('2.2');
  const [ledCurrentMa, setLedCurrentMa] = useState<string>('20');
  const [primaryVolts, setPrimaryVolts] = useState<string>('240');
  const [secondaryVolts, setSecondaryVolts] = useState<string>('24');
  const [solarWatts, setSolarWatts] = useState<string>('400');
  const [sunHours, setSunHours] = useState<string>('5.0');
  const [solarDerate, setSolarDerate] = useState<string>('80');
  const [actualAfr, setActualAfr] = useState<string>('12.5');
  const [fuelType, setFuelType] = useState<'gasoline' | 'e85' | 'diesel' | 'methanol'>('gasoline');
  const [vehicleSpeedMph, setVehicleSpeedMph] = useState<string>('60');
  const [roadCondition, setRoadCondition] = useState<'dry' | 'wet' | 'ice'>('dry');
  const [engineRpm, setEngineRpm] = useState<string>('6000');
  const [gearRatio, setGearRatio] = useState<string>('0.85');
  const [finalDriveRatio, setFinalDriveRatio] = useState<string>('3.73');
  const [tireDiameterInches, setTireDiameterInches] = useState<string>('26.0');

  const id = tool.id;

  const numV = Math.max(1, parseFloat(voltage) || 120);
  const numAmps = Math.max(0.1, parseFloat(currentAmps) || 20);
  const numFeet = Math.max(1, parseFloat(distanceFeet) || 100);
  const numVs = Math.max(0.1, parseFloat(sourceVoltage) || 12);
  const numVf = Math.max(0.1, parseFloat(ledForwardVolts) || 2.2);
  const numIma = Math.max(0.1, parseFloat(ledCurrentMa) || 20);
  const numVp = Math.max(1, parseFloat(primaryVolts) || 240);
  const numVsec = Math.max(0.1, parseFloat(secondaryVolts) || 24);
  const numSolWatts = parseFloat(solarWatts) || 400;
  const numSunH = parseFloat(sunHours) || 5.0;
  const numDerate = (parseFloat(solarDerate) || 80) / 100;
  const numAfr = parseFloat(actualAfr) || 12.5;
  const numSpeed = parseFloat(vehicleSpeedMph) || 60;
  const numRpm = parseFloat(engineRpm) || 6000;
  const numGear = parseFloat(gearRatio) || 0.85;
  const numDiff = parseFloat(finalDriveRatio) || 3.73;
  const numTireDia = parseFloat(tireDiameterInches) || 26.0;

  // AWG to Circular Mils mapping
  const awgCircularMils: { [key: string]: number } = {
    '14': 4110,
    '12': 6530,
    '10': 10380,
    '8': 16510,
    '6': 26240,
    '4': 41740,
    '2': 66360,
    '1/0': 105600,
    '2/0': 133100,
    '4/0': 211600,
  };

  let primaryLabel = 'Engineering Output';
  let primaryValue = '0';
  let secondaryMetrics: { label: string; value: string }[] = [];
  let formulaText = '';

  // 1. Voltage Drop Wire Size (`voltage-drop-wire-size`)
  if (id === 'voltage-drop-wire-size') {
    // NEC Formula: VD = (2 × K × I × L) / CM (Copper K = 12.9)
    const cm = awgCircularMils[wireGaugeAwg] || 6530;
    const vDrop = (2 * 12.9 * numAmps * numFeet) / cm;
    const vDropPercent = (vDrop / numV) * 100;
    const vAtLoad = numV - vDrop;

    let necStatus = 'NEC Compliant (≤ 3.0% branch circuit drop)';
    if (vDropPercent > 5.0) necStatus = 'Excessive Drop (> 5.0% total system limit - Upsize conductor)';
    else if (vDropPercent > 3.0) necStatus = 'Warning: Exceeds NEC 3.0% recommended branch limit';

    primaryLabel = `Voltage Drop (${vDropPercent.toFixed(2)}%)`;
    primaryValue = `${vDrop.toFixed(2)} Volts`;
    secondaryMetrics = [
      { label: 'Voltage at End Load', value: `${vAtLoad.toFixed(2)} V` },
      { label: 'Wire Gauge Selected', value: `${wireGaugeAwg} AWG (${cm.toLocaleString()} cmils)` },
      { label: 'One-Way Circuit Length', value: `${numFeet} feet (${(numFeet * 0.3048).toFixed(1)} m)` },
      { label: 'NEC Compliance Check', value: necStatus },
    ];
    formulaText = 'V_drop = (2 × K_copper × I_amps × Length_ft) ÷ Circular_Mils';
  }
  // 2. Resistor Color Code (`resistor-color-code-4-5-band`)
  else if (id === 'resistor-color-code-4-5-band') {
    primaryLabel = 'Resistor Nominal Resistance';
    primaryValue = '4.7 kΩ ±5%';
    secondaryMetrics = [
      { label: 'Color Bands (4-Band)', value: 'Yellow (4) - Violet (7) - Red (×100) - Gold (±5%)' },
      { label: 'Calculated Value Range', value: '4,465 Ω – 4,935 Ω' },
      { label: 'EIA Preferred Series', value: 'E24 Standard Resistor Value' },
      { label: 'Power Rating Recommendation', value: 'Standard 0.25W (1/4 Watt) Carbon Film' },
    ];
    formulaText = 'Resistance = (Band 1 · 10 + Band 2) × 10^Multiplier ± Tolerance %';
  }
  // 3. LED Series Resistor (`led-series-resistor`)
  else if (id === 'led-series-resistor') {
    // R = (Vs - Vf) / I
    const currentAmperes = numIma / 1000;
    const vResistor = Math.max(0, numVs - numVf);
    const requiredResistance = vResistor / currentAmperes;
    const powerWatts = vResistor * currentAmperes;

    primaryLabel = 'Required Series Resistor';
    primaryValue = `${Math.ceil(requiredResistance)} Ω`;
    secondaryMetrics = [
      { label: 'Calculated Exact Resistance', value: `${requiredResistance.toFixed(1)} Ohms` },
      { label: 'Resistor Power Dissipation', value: `${(powerWatts * 1000).toFixed(1)} mW (${powerWatts.toFixed(3)} W)` },
      { label: 'Recommended Resistor Rating', value: powerWatts > 0.25 ? '0.5W or 1W Resistor' : '0.25W (1/4W) Standard' },
      { label: 'LED Forward Drop (Vf)', value: `${numVf} V @ ${numIma} mA` },
    ];
    formulaText = 'R = (V_source - V_forward) ÷ I_amps | Power = (V_source - V_forward) × I_amps';
  }
  // 4. Transformer Winding Turns Ratio (`transformer-winding-ratio`)
  else if (id === 'transformer-winding-ratio') {
    // Turns ratio Np/Ns = Vp/Vs
    const turnsRatio = numVp / numVsec;
    const impedanceRatio = Math.pow(turnsRatio, 2);

    primaryLabel = 'Primary-to-Secondary Turns Ratio';
    primaryValue = `${turnsRatio.toFixed(2)} : 1`;
    secondaryMetrics = [
      { label: 'Transformer Type', value: turnsRatio > 1 ? 'Step-Down Transformer' : 'Step-Up Transformer' },
      { label: 'Primary Winding (Vp)', value: `${numVp} VAC` },
      { label: 'Secondary Winding (Vs)', value: `${numVsec} VAC` },
      { label: 'Impedance Transformation (Zp/Zs)', value: `${impedanceRatio.toFixed(2)} : 1 (Turns Ratio²)` },
    ];
    formulaText = 'Turns Ratio (Np/Ns) = V_primary ÷ V_secondary | Z_ratio = (Np/Ns)²';
  }
  // 5. Solar PV Array Daily Sizing (`solar-pv-array-sizing`)
  else if (id === 'solar-pv-array-sizing') {
    const dailyWattHours = numSolWatts * numSunH * numDerate;
    const dailyKwh = dailyWattHours / 1000;
    const monthlyKwh = dailyKwh * 30.5;

    primaryLabel = 'Estimated Daily Solar Energy';
    primaryValue = `${dailyKwh.toFixed(2)} kWh / day`;
    secondaryMetrics = [
      { label: 'Monthly Energy Production', value: `${monthlyKwh.toFixed(1)} kWh / month` },
      { label: 'Nameplate Array Power', value: `${numSolWatts} Watts DC` },
      { label: 'Peak Sun Hours (Insolation)', value: `${numSunH} hours/day` },
      { label: 'System Derate Efficiency (PTC/Inverter/Losses)', value: `${(numDerate * 100).toFixed(0)}%` },
    ];
    formulaText = 'Daily kWh = (Panel Watts × Peak Sun Hours × Derate Factor) ÷ 1000';
  }
  // 6. Air Fuel Ratio & Lambda (`air-fuel-ratio-engine`)
  else if (id === 'air-fuel-ratio-engine') {
    const stoichAfr: { [key: string]: number } = {
      gasoline: 14.7,
      e85: 9.8,
      diesel: 14.5,
      methanol: 6.4,
    };
    const baseStoich = stoichAfr[fuelType] || 14.7;
    const lambda = numAfr / baseStoich;

    let condition = 'Stoichiometric (Lambda = 1.00)';
    if (lambda < 0.95) condition = 'Rich Mixture (Power / Cooling / Anti-knock)';
    else if (lambda > 1.05) condition = 'Lean Mixture (Fuel Economy / High NOx risk)';

    primaryLabel = 'Lambda Air-Fuel Equivalence (λ)';
    primaryValue = `${lambda.toFixed(3)} λ`;
    secondaryMetrics = [
      { label: 'Measured AFR', value: `${numAfr.toFixed(2)} : 1` },
      { label: 'Stoichiometric Baseline', value: `${baseStoich}:1 (${fuelType.toUpperCase()})` },
      { label: 'Mixture Condition', value: condition },
      { label: 'Equivalent Gasoline AFR', value: `${(lambda * 14.7).toFixed(2)} : 1` },
    ];
    formulaText = 'Lambda (λ) = Actual AFR ÷ Stoichiometric AFR';
  }
  // 7. Brake Stopping Distance (`brake-stopping-distance`)
  else if (id === 'brake-stopping-distance') {
    // Reaction time standard t_r = 1.5 seconds. Speed in fps = mph * 1.467
    const speedFps = numSpeed * 1.467;
    const reactionDistFeet = speedFps * 1.5;
    // Friction coefficient f: dry = 0.75, wet = 0.40, ice = 0.15
    const fCoeff = roadCondition === 'ice' ? 0.15 : roadCondition === 'wet' ? 0.40 : 0.75;
    const brakingDistFeet = Math.pow(speedFps, 2) / (2 * 32.2 * fCoeff);
    const totalStoppingDistance = reactionDistFeet + brakingDistFeet;

    primaryLabel = 'Total Vehicle Stopping Distance';
    primaryValue = `${Math.round(totalStoppingDistance)} Feet (${(totalStoppingDistance * 0.3048).toFixed(1)} m)`;
    secondaryMetrics = [
      { label: 'Perception-Reaction Distance (1.5s)', value: `${Math.round(reactionDistFeet)} ft` },
      { label: 'Braking Skid Distance', value: `${Math.round(brakingDistFeet)} ft` },
      { label: 'Road Friction Coefficient (μ)', value: `${fCoeff} (${roadCondition.toUpperCase()} pavement)` },
      { label: 'Initial Velocity', value: `${numSpeed} mph (${(numSpeed * 1.60934).toFixed(1)} km/h)` },
    ];
    formulaText = 'd_total = (v × t_reaction) + [v² ÷ (2 × g × μ)]';
  }
  // 8. Gear Ratio & Top Speed (`gear-ratio-top-speed`, `tire-speedo-calibration`)
  else {
    // Tire circumference in feet = (Diameter_in * pi) / 12
    const tireCircumferenceFeet = (numTireDia * Math.PI) / 12;
    // Overall Drive Ratio = Gear Ratio * Final Drive
    const totalRatio = numGear * numDiff;
    const wheelRpm = numRpm / totalRatio;
    const topSpeedMph = (wheelRpm * tireCircumferenceFeet * 60) / 5280;

    primaryLabel = 'Calculated Vehicle Speed';
    primaryValue = `${topSpeedMph.toFixed(1)} MPH (${(topSpeedMph * 1.60934).toFixed(1)} km/h)`;
    secondaryMetrics = [
      { label: 'Wheel Rotational Speed', value: `${Math.round(wheelRpm)} RPM` },
      { label: 'Combined Final Drivetrain Ratio', value: `${totalRatio.toFixed(3)} : 1` },
      { label: 'Tire Rolling Diameter', value: `${numTireDia} inches (${(numTireDia * 25.4).toFixed(0)} mm)` },
      { label: 'Engine Redline / Test RPM', value: `${numRpm} RPM` },
    ];
    formulaText = 'Speed (mph) = [Engine_RPM × Tire_Circumference(miles) × 60] ÷ (Gear × Diff_Ratio)';
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
        {/* Dynamic Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {id === 'voltage-drop-wire-size' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('eng_voltage', 'Nominal Circuit Voltage (V)')}
                </label>
                <input
                  type="number"
                  value={voltage}
                  onChange={(e) => setVoltage(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('eng_load_current', 'Continuous Load Current (Amps)')}
                </label>
                <input
                  type="number"
                  value={currentAmps}
                  onChange={(e) => setCurrentAmps(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('eng_one_way_dist', 'One-Way Distance (Feet)')}
                </label>
                <input
                  type="number"
                  value={distanceFeet}
                  onChange={(e) => setDistanceFeet(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('eng_wire_awg', 'Conductor Size (AWG Copper)')}
                </label>
                <select
                  value={wireGaugeAwg}
                  onChange={(e) => setWireGaugeAwg(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base"
                >
                  {Object.keys(awgCircularMils).map((awg) => (
                    <option key={awg} value={awg}>{awg} AWG ({awgCircularMils[awg].toLocaleString()} cmil)</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {id === 'led-series-resistor' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('eng_source_volts', 'Supply Voltage (Vs)')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={sourceVoltage}
                  onChange={(e) => setSourceVoltage(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('eng_led_vf', 'LED Forward Voltage Drop (Vf)')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={ledForwardVolts}
                  onChange={(e) => setLedForwardVolts(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('eng_led_current', 'LED Forward Current (mA)')}
                </label>
                <input
                  type="number"
                  value={ledCurrentMa}
                  onChange={(e) => setLedCurrentMa(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
            </>
          )}

          {id === 'transformer-winding-ratio' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('eng_pri_volts', 'Primary Voltage (Vp)')}
                </label>
                <input
                  type="number"
                  value={primaryVolts}
                  onChange={(e) => setPrimaryVolts(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('eng_sec_volts', 'Secondary Voltage (Vs)')}
                </label>
                <input
                  type="number"
                  value={secondaryVolts}
                  onChange={(e) => setSecondaryVolts(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
            </>
          )}

          {id === 'solar-pv-array-sizing' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('eng_solar_watts', 'Solar Panel Array Size (Watts DC)')}
                </label>
                <input
                  type="number"
                  value={solarWatts}
                  onChange={(e) => setSolarWatts(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('eng_sun_hours', 'Daily Peak Sun Hours')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={sunHours}
                  onChange={(e) => setSunHours(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('eng_derate_pct', 'System Derate Efficiency (%)')}
                </label>
                <input
                  type="number"
                  value={solarDerate}
                  onChange={(e) => setSolarDerate(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
            </>
          )}

          {id === 'brake-stopping-distance' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('eng_vehicle_speed', 'Vehicle Speed (MPH)')}
                </label>
                <input
                  type="number"
                  value={vehicleSpeedMph}
                  onChange={(e) => setVehicleSpeedMph(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('eng_road_cond', 'Surface Friction Condition')}
                </label>
                <select
                  value={roadCondition}
                  onChange={(e) => setRoadCondition(e.target.value as any)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base"
                >
                  <option value="dry">Dry Asphalt (μ = 0.75)</option>
                  <option value="wet">Wet Road (μ = 0.40)</option>
                  <option value="ice">Icy Pavement (μ = 0.15)</option>
                </select>
              </div>
            </>
          )}

          {(id === 'gear-ratio-top-speed' || id === 'tire-speedo-calibration') && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('eng_engine_rpm', 'Engine RPM')}
                </label>
                <input
                  type="number"
                  value={engineRpm}
                  onChange={(e) => setEngineRpm(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('eng_gear_ratio', 'Transmission Gear Ratio')}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={gearRatio}
                  onChange={(e) => setGearRatio(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('eng_diff_ratio', 'Final Drive / Axle Ratio')}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={finalDriveRatio}
                  onChange={(e) => setFinalDriveRatio(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('eng_tire_dia', 'Overall Tire Diameter (Inches)')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={tireDiameterInches}
                  onChange={(e) => setTireDiameterInches(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
            </>
          )}

          {id === 'air-fuel-ratio-engine' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('eng_measured_afr', 'Measured AFR')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={actualAfr}
                  onChange={(e) => setActualAfr(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('eng_fuel_type', 'Fuel Standard')}
                </label>
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value as any)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base"
                >
                  <option value="gasoline">Unleaded Gasoline (14.7:1)</option>
                  <option value="e85">E85 Ethanol Blend (9.8:1)</option>
                  <option value="diesel">Diesel (14.5:1)</option>
                  <option value="methanol">Methanol (6.4:1)</option>
                </select>
              </div>
            </>
          )}
        </div>

        {/* Primary Banner */}
        <div className="p-6 bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800/50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-violet-700 dark:text-violet-400">
              {primaryLabel}
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-violet-600 dark:text-violet-400 mt-1">
              {primaryValue}
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 self-start sm:self-center"
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
