import React, { useState } from 'react';
import { useApp } from '../../../../context/AppContext';
import { Tool } from '../../../../types';
import { Copy, Check, Hammer, Ruler, Box, HardHat } from 'lucide-react';

interface StructuralTradeEngineProps {
  tool: Tool;
}

export const StructuralTradeEngine: React.FC<StructuralTradeEngineProps> = ({ tool }) => {
  const { t, addHistory } = useApp();
  const [copied, setCopied] = useState(false);

  // States for trade and civil construction inputs
  const [lengthFeet, setLengthFeet] = useState<string>('20');
  const [widthFeet, setWidthFeet] = useState<string>('15');
  const [depthInches, setDepthInches] = useState<string>('4.0');
  const [pointLoadLbs, setPointLoadLbs] = useState<string>('1500');
  const [beamSpanFeet, setBeamSpanFeet] = useState<string>('12');
  const [modulusElasticityPsi, setModulusElasticityPsi] = useState<string>('1600000'); // Wood / Douglas Fir
  const [momentInertiaIn4, setMomentInertiaIn4] = useState<string>('98.9'); // 2x10 joist or steel
  const [roofSpanRunFeet, setRoofSpanRunFeet] = useState<string>('16');
  const [roofPitchInches, setRoofPitchInches] = useState<string>('6'); // 6/12 pitch
  const [roomAreaSqFt, setRoomAreaSqFt] = useState<string>('350');
  const [roomOccupants, setRoomOccupants] = useState<string>('2');
  const [sunExposure, setSunExposure] = useState<'normal' | 'sunny' | 'shaded'>('normal');
  const [wallLengthFeet, setWallLengthFeet] = useState<string>('30');
  const [wallHeightFeet, setWallHeightFeet] = useState<string>('3.5');
  const [totalStairRiseInches, setTotalStairRiseInches] = useState<string>('108'); // 9 ft ceiling
  const [targetRiserInches, setTargetRiserInches] = useState<string>('7.5');

  const id = tool.id;

  const numL = Math.max(0.1, parseFloat(lengthFeet) || 20);
  const numW = Math.max(0.1, parseFloat(widthFeet) || 15);
  const numD = Math.max(0.1, parseFloat(depthInches) || 4.0);
  const numP = parseFloat(pointLoadLbs) || 1500;
  const numSpanFt = Math.max(0.1, parseFloat(beamSpanFeet) || 12);
  const numE = Math.max(1000, parseFloat(modulusElasticityPsi) || 1600000);
  const numI = Math.max(0.1, parseFloat(momentInertiaIn4) || 98.9);
  const numRun = Math.max(0.1, parseFloat(roofSpanRunFeet) || 16);
  const numPitch = Math.max(0, parseFloat(roofPitchInches) || 6);
  const numSqFt = Math.max(1, parseFloat(roomAreaSqFt) || 350);
  const numPeople = Math.max(0, parseFloat(roomOccupants) || 2);
  const numWallL = Math.max(0.1, parseFloat(wallLengthFeet) || 30);
  const numWallH = Math.max(0.1, parseFloat(wallHeightFeet) || 3.5);
  const numRise = Math.max(1, parseFloat(totalStairRiseInches) || 108);
  const numTargetRiser = Math.max(4, Math.min(10, parseFloat(targetRiserInches) || 7.5));

  let primaryLabel = 'Material / Structural Metric';
  let primaryValue = '0';
  let secondaryMetrics: { label: string; value: string }[] = [];
  let formulaText = '';

  // 1. Concrete Slab Volume & Bags (`concrete-slab-volume-bags`)
  if (id === 'concrete-slab-volume-bags') {
    const volCuFt = numL * numW * (numD / 12);
    const volCuYds = volCuFt / 27;
    const volWithWaste = volCuYds * 1.10; // +10% standard margin
    const bags60 = Math.ceil(volCuFt / 0.45);
    const bags80 = Math.ceil(volCuFt / 0.60);

    primaryLabel = 'Total Ready-Mix Concrete Required';
    primaryValue = `${volWithWaste.toFixed(2)} Cubic Yards`;
    secondaryMetrics = [
      { label: 'Exact Net Volume', value: `${volCuYds.toFixed(2)} cu. yd (${volCuFt.toFixed(1)} cu. ft)` },
      { label: 'Recommended 10% Contingency Total', value: `${volWithWaste.toFixed(2)} cu. yd` },
      { label: 'Equivalent 80-lb Pre-Mix Bags', value: `${bags80} Bags` },
      { label: 'Equivalent 60-lb Pre-Mix Bags', value: `${bags60} Bags` },
    ];
    formulaText = 'Volume (cu yd) = [Length(ft) × Width(ft) × (Depth(in) ÷ 12)] ÷ 27 × 1.10 Waste';
  }
  // 2. Beam Deflection & Load (`beam-deflection-load`)
  if (id === 'beam-deflection-load') {
    // Center point load deflection: δ = (P × L^3) / (48 × E × I)
    const spanInches = numSpanFt * 12;
    const deflectionInches = (numP * Math.pow(spanInches, 3)) / (48 * numE * numI);
    const lOverDelta = spanInches / (deflectionInches || 0.0001);

    let codeRating = 'IBC L/360 Compliant (Floors)';
    if (lOverDelta < 240) codeRating = 'Excessive Deflection (< L/240 fails minimum structural code)';
    else if (lOverDelta < 360) codeRating = 'L/240 Roof Live Load Compliant (Fails L/360 floor standard)';

    primaryLabel = 'Maximum Center Beam Deflection (δ)';
    primaryValue = `${deflectionInches.toFixed(3)} Inches`;
    secondaryMetrics = [
      { label: 'Span-to-Deflection Ratio', value: `L / ${Math.round(lOverDelta)}` },
      { label: 'Building Code Limit (L/360 Floor Max)', value: `${(spanInches / 360).toFixed(3)} in max allowable` },
      { label: 'Building Code Limit (L/240 Roof Max)', value: `${(spanInches / 240).toFixed(3)} in max allowable` },
      { label: 'Structural Serviceability Tier', value: codeRating },
    ];
    formulaText = 'δ_max = (P × L³) ÷ (48 × E × I) for simple support center point load';
  }
  // 3. Roof Pitch, Slope & Rafter Length (`roof-pitch-slope-rafter`)
  else if (id === 'roof-pitch-slope-rafter') {
    const pitchRatio = numPitch / 12;
    const slopeAngleDeg = Math.atan(pitchRatio) * (180 / Math.PI);
    const totalRiseFeet = numRun * pitchRatio;
    const rafterLengthFeet = Math.sqrt(Math.pow(numRun, 2) + Math.pow(totalRiseFeet, 2));
    const overhangFeet = 1.0; // Standard 12-inch eave
    const fullRafterWithOverhang = rafterLengthFeet + overhangFeet;

    primaryLabel = 'Common Rafter Cut Length';
    primaryValue = `${fullRafterWithOverhang.toFixed(2)} Feet (${Math.floor(fullRafterWithOverhang)}' ${Math.round((fullRafterWithOverhang % 1) * 12)}")`;
    secondaryMetrics = [
      { label: 'Roof Pitch & Slope', value: `${numPitch} / 12 (${slopeAngleDeg.toFixed(1)}° Slope Angle)` },
      { label: 'Total Vertical Rise', value: `${totalRiseFeet.toFixed(2)} ft (${(totalRiseFeet * 12).toFixed(0)} inches)` },
      { label: 'Horizontal Building Run', value: `${numRun} ft` },
      { label: 'Rafter Line Length (No Overhang)', value: `${rafterLengthFeet.toFixed(2)} ft` },
    ];
    formulaText = 'Rafter Length = √(Run² + Rise²) + Overhang | Slope (°) = arctan(Pitch / 12)';
  }
  // 4. HVAC Cooling Load BTU (`hvac-btu-room-cooling`)
  else if (id === 'hvac-btu-room-cooling') {
    let btu = numSqFt * 20; // 20 BTU per sq ft baseline
    btu += numPeople > 2 ? (numPeople - 2) * 600 : 0;
    if (sunExposure === 'sunny') btu *= 1.10;
    else if (sunExposure === 'shaded') btu *= 0.90;

    const tons = btu / 12000;

    primaryLabel = 'Required Cooling Capacity';
    primaryValue = `${Math.ceil(btu / 500) * 500} BTU / hr`;
    secondaryMetrics = [
      { label: 'A/C Tonnage Equivalent', value: `${tons.toFixed(2)} Tons (12,000 BTU/Ton)` },
      { label: 'Floor Space Area', value: `${numSqFt} sq ft (${(numSqFt * 0.0929).toFixed(1)} m²)` },
      { label: 'Occupant Heat Compensation', value: `+${(numPeople * 600)} BTU/hr (${numPeople} people)` },
      { label: 'Sun Exposure Adjustment', value: `${sunExposure.toUpperCase()} orientation factor applied` },
    ];
    formulaText = 'BTU/hr = [Area(sq ft) × 20 + Extra_Occupants × 600] × Sun_Modifier';
  }
  // 5. Retaining Wall Block Estimator (`retaining-wall-block-estimator`)
  else if (id === 'retaining-wall-block-estimator') {
    const wallAreaSqFt = numWallL * numWallH;
    // Standard modular retaining wall block: 16" wide × 6" tall (0.667 sq ft per block face)
    const blockFaceSqFt = (16 * 6) / 144;
    const blocksNeeded = Math.ceil((wallAreaSqFt / blockFaceSqFt) * 1.05); // +5% cut waste
    const baseTrenchGravelTons = (numWallL * 1.5 * 0.5 * 105) / 2000; // 6" deep × 18" wide trench gravel

    primaryLabel = 'Total Retaining Wall Blocks';
    primaryValue = `${blocksNeeded} Blocks`;
    secondaryMetrics = [
      { label: 'Wall Face Surface Area', value: `${wallAreaSqFt.toFixed(1)} sq ft` },
      { label: 'Standard Block Dimension', value: '16" W × 6" H × 12" D (0.67 sq ft/face)' },
      { label: 'Drainage Base Gravel Required', value: `${baseTrenchGravelTons.toFixed(2)} Tons (3/4" crushed aggregate)` },
      { label: 'Geogrid Reinforcement Note', value: numWallH > 4.0 ? 'Required: Wall height exceeds 4ft' : 'Not required (< 4ft height)' },
    ];
    formulaText = 'Blocks = [Wall Length(ft) × Height(ft) ÷ Block Face Area(sq ft)] × 1.05';
  }
  // 6. Stair Stringer Riser & Tread (`stair-stringer-riser-tread`)
  else {
    const stepCount = Math.round(numRise / numTargetRiser);
    const actualRiserHeight = numRise / stepCount;
    const standardTreadDepth = 10.5; // Standard 10.5 inch tread depth
    const totalRunInches = (stepCount - 1) * standardTreadDepth;
    const stairAngleDeg = Math.atan(actualRiserHeight / standardTreadDepth) * (180 / Math.PI);

    // Blondel's Rule (2R + T = 24 to 25 inches)
    const blondelSum = 2 * actualRiserHeight + standardTreadDepth;

    primaryLabel = `Calculated Risers (${stepCount} Steps)`;
    primaryValue = `${actualRiserHeight.toFixed(2)} Inches per Riser`;
    secondaryMetrics = [
      { label: 'Number of Risers / Steps', value: `${stepCount} Risers (${stepCount - 1} Treads)` },
      { label: 'Total Horizontal Stair Run', value: `${(totalRunInches / 12).toFixed(2)} ft (${totalRunInches.toFixed(1)} inches)` },
      { label: 'Stair Incline Angle', value: `${stairAngleDeg.toFixed(1)}° (Standard: 30°–37°)` },
      { label: 'Blondel Comfort Formula (2R + T)', value: `${blondelSum.toFixed(2)}" (IBC Ideal Range: 24"–25")` },
    ];
    formulaText = 'Riser Height = Total Rise ÷ Round(Total Rise ÷ Target Riser) | Steps = Total Rise ÷ Riser';
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
          {id === 'concrete-slab-volume-bags' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('struct_length_ft', 'Slab Length (Feet)')}
                </label>
                <input
                  type="number"
                  value={lengthFeet}
                  onChange={(e) => setLengthFeet(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('struct_width_ft', 'Slab Width (Feet)')}
                </label>
                <input
                  type="number"
                  value={widthFeet}
                  onChange={(e) => setWidthFeet(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('struct_depth_in', 'Slab Thickness / Depth (Inches)')}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={depthInches}
                  onChange={(e) => setDepthInches(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
            </>
          )}

          {id === 'beam-deflection-load' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('struct_point_load', 'Center Point Load (P, lbs)')}
                </label>
                <input
                  type="number"
                  value={pointLoadLbs}
                  onChange={(e) => setPointLoadLbs(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('struct_beam_span', 'Clear Span Length (Feet)')}
                </label>
                <input
                  type="number"
                  value={beamSpanFeet}
                  onChange={(e) => setBeamSpanFeet(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('struct_moment_inertia', 'Moment of Inertia (I, in⁴)')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={momentInertiaIn4}
                  onChange={(e) => setMomentInertiaIn4(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
            </>
          )}

          {id === 'roof-pitch-slope-rafter' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('struct_roof_run', 'Building Half-Span / Run (Feet)')}
                </label>
                <input
                  type="number"
                  value={roofSpanRunFeet}
                  onChange={(e) => setRoofSpanRunFeet(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('struct_roof_pitch', 'Pitch Slope (Inches per 12" Run)')}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={roofPitchInches}
                  onChange={(e) => setRoofPitchInches(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
            </>
          )}

          {id === 'hvac-btu-room-cooling' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('struct_room_sqft', 'Floor Area (Square Feet)')}
                </label>
                <input
                  type="number"
                  value={roomAreaSqFt}
                  onChange={(e) => setRoomAreaSqFt(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('struct_occupants', 'Room Occupants')}
                </label>
                <input
                  type="number"
                  value={roomOccupants}
                  onChange={(e) => setRoomOccupants(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('struct_sun_exp', 'Solar Exposure Level')}
                </label>
                <select
                  value={sunExposure}
                  onChange={(e) => setSunExposure(e.target.value as any)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base"
                >
                  <option value="normal">Average / Moderate Sun</option>
                  <option value="sunny">High Sun / South-Facing (+10% BTU)</option>
                  <option value="shaded">Heavily Shaded (-10% BTU)</option>
                </select>
              </div>
            </>
          )}

          {id === 'retaining-wall-block-estimator' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('struct_wall_len', 'Total Wall Length (Feet)')}
                </label>
                <input
                  type="number"
                  value={wallLengthFeet}
                  onChange={(e) => setWallLengthFeet(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('struct_wall_ht', 'Wall Exposed Height (Feet)')}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={wallHeightFeet}
                  onChange={(e) => setWallHeightFeet(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
            </>
          )}

          {id === 'stair-stringer-riser-tread' && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('struct_total_rise', 'Total Vertical Rise Floor-to-Floor (Inches)')}
                </label>
                <input
                  type="number"
                  value={totalStairRiseInches}
                  onChange={(e) => setTotalStairRiseInches(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  {t('struct_target_riser', 'Target Riser Height (Inches, IBC ~7.5")')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={targetRiserInches}
                  onChange={(e) => setTargetRiserInches(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
                />
              </div>
            </>
          )}
        </div>

        {/* Primary Banner */}
        <div className="p-6 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              {primaryLabel}
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-amber-600 dark:text-amber-400 mt-1">
              {primaryValue}
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 self-start sm:self-center"
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
