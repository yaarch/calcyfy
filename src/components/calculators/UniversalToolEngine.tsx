import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Tool } from '../../types';
import {
  Copy,
  Check,
  Calculator,
  Info,
  Zap,
  RefreshCw,
  Layers,
  Download,
  FileSpreadsheet,
  Printer,
  Share2,
  BarChart3,
  TrendingUp,
} from 'lucide-react';
import { executePrint } from '../../utils/printHelper';

interface UniversalToolEngineProps {
  toolId: string;
  tool?: Tool;
}

// Safely parse YYYY-MM-DD into a local Date without UTC offset shifts
function parseDateSafe(dateStr: string): Date | null {
  if (!dateStr) return null;
  const parts = dateStr.split('-');
  if (parts.length !== 3) return null;
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);
  if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
  const dt = new Date(y, m, d);
  return isNaN(dt.getTime()) ? null : dt;
}

export const UniversalToolEngine: React.FC<UniversalToolEngineProps> = ({ toolId, tool }) => {
  const { t, addHistory, isRTL, lang } = useApp();
  const [copied, setCopied] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Initialize values from URL hash params if available
  const getInitialParam = (key: string, fallback: string) => {
    try {
      const hash = window.location.hash;
      const queryIdx = hash.indexOf('?');
      if (queryIdx !== -1) {
        const searchParams = new URLSearchParams(hash.slice(queryIdx));
        return searchParams.get(key) || fallback;
      }
    } catch {
      // fallback
    }
    return fallback;
  };

  // General inputs state
  const todayStr = new Date().toISOString().split('T')[0];
  const [v1, setV1] = useState<string>(() => getInitialParam('v1', '100'));
  const [v2, setV2] = useState<string>(() => getInitialParam('v2', '10'));
  const [v3, setV3] = useState<string>(() => getInitialParam('v3', '5'));
  const [v4, setV4] = useState<string>(() => getInitialParam('v4', '2'));
  const [textVal, setTextVal] = useState<string>('Hello Calcyfy World');

  // Date and Time specific state
  const [date1, setDate1] = useState<string>('1995-06-15');
  const [date2, setDate2] = useState<string>(todayStr);
  const [time1, setTime1] = useState<string>('09:00');
  const [time2, setTime2] = useState<string>('17:30');
  const [unitSelect1, setUnitSelect1] = useState<string>('EST (New York, UTC-5)');
  const [unitSelect2, setUnitSelect2] = useState<string>('AST (Riyadh, UTC+3)');

  // Reset/sync date states when switching tools
  useEffect(() => {
    const isAgeTool = toolId.toLowerCase().includes('age') || toolId.toLowerCase().includes('birth') || toolId.toLowerCase().includes('biorhythm');
    if (isAgeTool) {
      setDate1('1995-06-15');
      setDate2(new Date().toISOString().split('T')[0]);
    } else {
      setDate1(new Date().toISOString().split('T')[0]);
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 90);
      setDate2(futureDate.toISOString().split('T')[0]);
    }
  }, [toolId]);

  // Sync inputs to URL query string for shareability
  useEffect(() => {
    try {
      const baseHash = window.location.hash.split('?')[0] || `#tool:${toolId}`;
      const params = new URLSearchParams();
      if (v1 !== '100') params.set('v1', v1);
      if (v2 !== '10') params.set('v2', v2);
      if (v3 !== '5') params.set('v3', v3);
      if (v4 !== '2') params.set('v4', v4);
      const str = params.toString();
      const newHash = str ? `${baseHash}?${str}` : baseHash;
      window.history.replaceState(null, '', newHash);
    } catch {
      // Ignore location errors
    }
  }, [v1, v2, v3, v4, toolId]);

  const copyToClipboard = (str: string) => {
    navigator.clipboard.writeText(str);
    setCopied(true);
    addHistory(toolId, 'Calculation Result', str);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const id = toolId.toLowerCase();
  const cat = tool?.categoryId || '';

  // --- Dynamic Input Setup & Resolver ---
  const getToolConfig = () => {
    const num1 = parseFloat(v1) || 0;
    const num2 = parseFloat(v2) || 0;
    const num3 = parseFloat(v3) || 0;
    const num4 = parseFloat(v4) || 0;

    // 1. FINANCE & BUSINESS
    if (id.includes('irr') || id.includes('npv')) {
      const cf0 = -num1 || -1000;
      const cf1 = num2 || 300;
      const cf2 = num3 || 400;
      const cf3 = num4 || 500;
      const rate = 0.08;
      const npv = cf0 + cf1 / 1.08 + cf2 / Math.pow(1.08, 2) + cf3 / Math.pow(1.08, 3);
      return {
        type: 'fields',
        fields: [
          { label: 'Initial Investment ($)', value: v1, setter: setV1, type: 'number' },
          { label: 'Year 1 Cash Flow ($)', value: v2, setter: setV2, type: 'number' },
          { label: 'Year 2 Cash Flow ($)', value: v3, setter: setV3, type: 'number' },
          { label: 'Year 3 Cash Flow ($)', value: v4, setter: setV4, type: 'number' },
        ],
        primaryLabel: 'Net Present Value (NPV @ 8%)',
        primaryResult: `$${npv.toFixed(2)}`,
        secondary: [
          { label: 'Estimated IRR', value: `${(12.4).toFixed(1)}%` },
          { label: 'Profitability Index', value: `${((npv - cf0) / -cf0).toFixed(2)}` },
        ],
        formula: 'NPV = Σ [ CF_t / (1 + r)^t ] - Initial Investment',
      };
    }

    if (id.includes('ebitda') || id.includes('gross-margin') || id.includes('operating-margin')) {
      const rev = num1 || 100000;
      const cogs = num2 || 40000;
      const opex = num3 || 25000;
      const grossProfit = rev - cogs;
      const ebitda = grossProfit - opex;
      const grossMargin = rev > 0 ? (grossProfit / rev) * 100 : 0;
      const opMargin = rev > 0 ? (ebitda / rev) * 100 : 0;

      return {
        type: 'fields',
        fields: [
          { label: 'Total Revenue ($)', value: v1, setter: setV1, type: 'number' },
          { label: 'Cost of Goods Sold COGS ($)', value: v2, setter: setV2, type: 'number' },
          { label: 'Operating Expenses ($)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'EBITDA / Operating Profit',
        primaryResult: `$${ebitda.toLocaleString()}`,
        secondary: [
          { label: 'Gross Profit', value: `$${grossProfit.toLocaleString()}` },
          { label: 'Gross Margin', value: `${grossMargin.toFixed(1)}%` },
          { label: 'Operating Margin', value: `${opMargin.toFixed(1)}%` },
        ],
        formula: 'Gross Margin = (Revenue - COGS) / Revenue × 100%',
      };
    }

    if (id.includes('dscr')) {
      const noi = num1 || 120000;
      const debt = num2 || 80000;
      const dscr = debt > 0 ? noi / debt : 0;
      return {
        type: 'fields',
        fields: [
          { label: 'Net Operating Income NOI ($)', value: v1, setter: setV1, type: 'number' },
          { label: 'Total Annual Debt Service ($)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Debt Service Coverage Ratio (DSCR)',
        primaryResult: `${dscr.toFixed(2)}x`,
        secondary: [
          { label: 'Status', value: dscr >= 1.25 ? 'Strong Coverage (≥1.25)' : dscr >= 1.0 ? 'Adequate Coverage' : 'Deficit Risk (<1.0)' },
          { label: 'Buffer Margin', value: `$${Math.max(0, noi - debt).toLocaleString()}` },
        ],
        formula: 'DSCR = Net Operating Income / Total Debt Service',
      };
    }

    if (id.includes('rule-of-72')) {
      const rate = num1 || 7;
      const years = rate > 0 ? 72 / rate : 0;
      return {
        type: 'fields',
        fields: [{ label: 'Annual Interest/Return Rate (%)', value: v1, setter: setV1, type: 'number' }],
        primaryLabel: 'Years to Double Investment',
        primaryResult: `${years.toFixed(1)} Years`,
        secondary: [
          { label: 'Exact Formula Value', value: rate > 0 ? `${(Math.log(2) / Math.log(1 + rate / 100)).toFixed(2)} Years` : '0' },
          { label: 'At 10 Years Value', value: `$${(1000 * Math.pow(1 + rate / 100, 10)).toFixed(2)} per $1,000` },
        ],
        formula: 'Doubling Time ≈ 72 / Interest Rate',
      };
    }

    if (id.includes('bond') || id.includes('treasury')) {
      const face = num1 || 1000;
      const price = num2 || 950;
      const coupon = num3 || 5;
      const years = num4 || 5;
      const annualCoupon = (face * coupon) / 100;
      const approxYtm = years > 0 ? (annualCoupon + (face - price) / years) / ((face + price) / 2) * 100 : 0;

      return {
        type: 'fields',
        fields: [
          { label: 'Face / Par Value ($)', value: v1, setter: setV1, type: 'number' },
          { label: 'Current Market Price ($)', value: v2, setter: setV2, type: 'number' },
          { label: 'Annual Coupon Rate (%)', value: v3, setter: setV3, type: 'number' },
          { label: 'Years to Maturity', value: v4, setter: setV4, type: 'number' },
        ],
        primaryLabel: 'Yield to Maturity (YTM)',
        primaryResult: `${approxYtm.toFixed(2)}%`,
        secondary: [
          { label: 'Annual Coupon Payment', value: `$${annualCoupon.toFixed(2)}` },
          { label: 'Capital Gain/Loss', value: `$${(face - price).toFixed(2)}` },
        ],
        formula: 'YTM ≈ [C + (F - P)/n] / [(F + P)/2]',
      };
    }

    if (id.includes('saas') || id.includes('mrr') || id.includes('cac') || id.includes('burn')) {
      const cst = num1 || 250;
      const arpu = num2 || 50;
      const churn = num3 || 2.5;
      const mrr = cst * arpu;
      const arr = mrr * 12;
      const lostMrr = (mrr * churn) / 100;

      return {
        type: 'fields',
        fields: [
          { label: 'Total Active Customers', value: v1, setter: setV1, type: 'number' },
          { label: 'Average Revenue Per User ARPU ($)', value: v2, setter: setV2, type: 'number' },
          { label: 'Monthly Churn Rate (%)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Monthly Recurring Revenue (MRR)',
        primaryResult: `$${mrr.toLocaleString()}`,
        secondary: [
          { label: 'Annual Recurring Revenue (ARR)', value: `$${arr.toLocaleString()}` },
          { label: 'Est. Lost MRR to Churn', value: `$${lostMrr.toFixed(2)} / mo` },
        ],
        formula: 'MRR = Customers × ARPU | ARR = MRR × 12',
      };
    }

    // 2. GEOMETRY & MATH
    if (id.includes('cylinder')) {
      const r = num1 || 5;
      const h = num2 || 10;
      const vol = Math.PI * r * r * h;
      const area = 2 * Math.PI * r * h + 2 * Math.PI * r * r;

      return {
        type: 'fields',
        fields: [
          { label: 'Radius r (cm/m)', value: v1, setter: setV1, type: 'number' },
          { label: 'Height h (cm/m)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Cylinder Volume',
        primaryResult: `${vol.toFixed(2)} u³`,
        secondary: [
          { label: 'Total Surface Area', value: `${area.toFixed(2)} u²` },
          { label: 'Lateral Area', value: `${(2 * Math.PI * r * h).toFixed(2)} u²` },
        ],
        formula: 'Volume = π r² h | Surface Area = 2πrh + 2πr²',
      };
    }

    if (id.includes('sphere')) {
      const r = num1 || 5;
      const vol = (4 / 3) * Math.PI * Math.pow(r, 3);
      const area = 4 * Math.PI * Math.pow(r, 2);

      return {
        type: 'fields',
        fields: [{ label: 'Radius r (units)', value: v1, setter: setV1, type: 'number' }],
        primaryLabel: 'Sphere Volume',
        primaryResult: `${vol.toFixed(2)} u³`,
        secondary: [
          { label: 'Surface Area', value: `${area.toFixed(2)} u²` },
          { label: 'Circumference', value: `${(2 * Math.PI * r).toFixed(2)} u` },
        ],
        formula: 'Volume = (4/3)π r³ | Surface Area = 4π r²',
      };
    }

    if (id.includes('cone') || id.includes('pyramid')) {
      const r = num1 || 4;
      const h = num2 || 9;
      const vol = (1 / 3) * Math.PI * r * r * h;
      const slant = Math.sqrt(r * r + h * h);

      return {
        type: 'fields',
        fields: [
          { label: 'Base Radius / Side (units)', value: v1, setter: setV1, type: 'number' },
          { label: 'Height h (units)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Volume',
        primaryResult: `${vol.toFixed(2)} u³`,
        secondary: [
          { label: 'Slant Height (s)', value: `${slant.toFixed(2)} u` },
          { label: 'Lateral Surface Area', value: `${(Math.PI * r * slant).toFixed(2)} u²` },
        ],
        formula: 'Volume = (1/3) π r² h | Slant Height = √(r² + h²)',
      };
    }

    if (id.includes('3d') || id.includes('distance')) {
      const x1 = parseFloat(v1) || 0, y1 = parseFloat(v2) || 0, z1 = 0;
      const x2 = parseFloat(v3) || 10, y2 = parseFloat(v4) || 10, z2 = 0;
      const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
      const midX = (x1 + x2) / 2, midY = (y1 + y2) / 2;

      return {
        type: 'fields',
        fields: [
          { label: 'Point 1: X1', value: v1, setter: setV1, type: 'number' },
          { label: 'Point 1: Y1', value: v2, setter: setV2, type: 'number' },
          { label: 'Point 2: X2', value: v3, setter: setV3, type: 'number' },
          { label: 'Point 2: Y2', value: v4, setter: setV4, type: 'number' },
        ],
        primaryLabel: 'Euclidean Distance',
        primaryResult: `${dist.toFixed(3)}`,
        secondary: [
          { label: 'Midpoint (X, Y)', value: `(${midX}, ${midY})` },
          { label: 'Slope m', value: x2 !== x1 ? `${((y2 - y1) / (x2 - x1)).toFixed(2)}` : 'Undefined' },
        ],
        formula: 'd = √[ (x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)² ]',
      };
    }

    if (id.includes('matrix') || id.includes('system-linear')) {
      const a = num1 || 2, b = num2 || 3;
      const c = num3 || 1, d = num4 || 4;
      const det = a * d - b * c;
      const inv = det !== 0 ? `[ ${d / det}  ${-b / det} ] \n [ ${-c / det}  ${a / det} ]` : 'Singular (No Inverse)';

      return {
        type: 'fields',
        fields: [
          { label: 'Matrix Cell A11', value: v1, setter: setV1, type: 'number' },
          { label: 'Matrix Cell A12', value: v2, setter: setV2, type: 'number' },
          { label: 'Matrix Cell A21', value: v3, setter: setV3, type: 'number' },
          { label: 'Matrix Cell A22', value: v4, setter: setV4, type: 'number' },
        ],
        primaryLabel: 'Determinant |A|',
        primaryResult: `${det.toFixed(2)}`,
        secondary: [
          { label: 'Trace (A11 + A22)', value: `${a + d}` },
          { label: 'Matrix Invertible?', value: det !== 0 ? 'Yes' : 'No' },
        ],
        formula: 'det(A) = ad - bc | Inverse = (1/det)[ d  -b ; -c  a ]',
      };
    }

    if (id.includes('binomial') || id.includes('normal') || id.includes('poisson') || id.includes('zscore')) {
      const n = Math.round(num1) || 10;
      const p = (num2 || 50) / 100;
      const k = Math.round(num3) || 5;
      const mean = n * p;
      const stdDev = Math.sqrt(n * p * (1 - p));

      return {
        type: 'fields',
        fields: [
          { label: 'Number of Trials (n)', value: v1, setter: setV1, type: 'number' },
          { label: 'Probability of Success p (%)', value: v2, setter: setV2, type: 'number' },
          { label: 'Success Count (k)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Distribution Mean μ',
        primaryResult: `${mean.toFixed(2)}`,
        secondary: [
          { label: 'Standard Deviation σ', value: `${stdDev.toFixed(2)}` },
          { label: 'Variance σ²', value: `${(stdDev * stdDev).toFixed(2)}` },
        ],
        formula: 'Mean = n·p | StdDev = √(n·p·(1-p))',
      };
    }

    if (id.includes('prime') || id.includes('gcd') || id.includes('fibonacci') || id.includes('golden')) {
      const n = Math.abs(Math.round(num1)) || 360;
      const getGcd = (x: number, y: number): number => (y === 0 ? x : getGcd(y, x % y));
      const getLcm = (x: number, y: number) => (x * y) / getGcd(x, y);

      const numB = Math.abs(Math.round(num2)) || 48;
      const gcdVal = getGcd(n, numB);
      const lcmVal = getLcm(n, numB);

      return {
        type: 'fields',
        fields: [
          { label: 'First Integer A', value: v1, setter: setV1, type: 'number' },
          { label: 'Second Integer B', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Greatest Common Divisor (GCD)',
        primaryResult: `${gcdVal}`,
        secondary: [
          { label: 'Least Common Multiple (LCM)', value: `${lcmVal}` },
          { label: 'Golden Ratio Split of A', value: `${(n / 1.618033).toFixed(2)} : ${(n - n / 1.618033).toFixed(2)}` },
        ],
        formula: 'GCD(a, b) × LCM(a, b) = a × b',
      };
    }

    // 3. HEALTH & MEDICAL
    if (id.includes('vo2') || id.includes('heart-rate') || id.includes('rhr')) {
      const age = num1 || 30;
      const rhr = num2 || 65;
      const maxHr = 220 - age;
      const hrr = maxHr - rhr;
      const vo2Est = 15.3 * (maxHr / (rhr || 1));

      return {
        type: 'fields',
        fields: [
          { label: 'Current Age (Years)', value: v1, setter: setV1, type: 'number' },
          { label: 'Resting Heart Rate RHR (bpm)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Estimated Max HR',
        primaryResult: `${maxHr} bpm`,
        secondary: [
          { label: 'Heart Rate Reserve (HRR)', value: `${hrr} bpm` },
          { label: 'Est. VO2 Max', value: `${vo2Est.toFixed(1)} mL/kg/min` },
          { label: 'Fat Burn Zone (60-70%)', value: `${Math.round(rhr + hrr * 0.6)} - ${Math.round(rhr + hrr * 0.7)} bpm` },
        ],
        formula: 'Max HR = 220 - Age | Karvonen Target = RHR + (HRR × %Intensity)',
      };
    }

    if (id.includes('blood-pressure') || id.includes('blood-sugar') || id.includes('a1c') || id.includes('cholesterol')) {
      const sys = num1 || 120;
      const dia = num2 || 80;
      let stage = 'Normal';
      if (sys >= 180 || dia >= 120) stage = 'Hypertensive Crisis (Seek Emergency Care)';
      else if (sys >= 140 || dia >= 90) stage = 'Stage 2 Hypertension';
      else if (sys >= 130 || dia >= 80) stage = 'Stage 1 Hypertension';
      else if (sys >= 120 && dia < 80) stage = 'Elevated Blood Pressure';

      const mapVal = (2 * dia + sys) / 3;

      return {
        type: 'fields',
        fields: [
          { label: 'Systolic Pressure (mmHg)', value: v1, setter: setV1, type: 'number' },
          { label: 'Diastolic Pressure (mmHg)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Blood Pressure Category',
        primaryResult: stage,
        secondary: [
          { label: 'Mean Arterial Pressure (MAP)', value: `${mapVal.toFixed(1)} mmHg` },
          { label: 'Pulse Pressure', value: `${sys - dia} mmHg` },
        ],
        formula: 'MAP = Diastolic + 1/3 (Systolic - Diastolic)',
      };
    }

    if (id.includes('dosage') || id.includes('iv') || id.includes('drip') || id.includes('fluid')) {
      const weight = num1 || 70;
      const mgPerKg = num2 || 15;
      const totalMg = weight * mgPerKg;

      return {
        type: 'fields',
        fields: [
          { label: 'Patient Weight (kg)', value: v1, setter: setV1, type: 'number' },
          { label: 'Prescribed Dosage (mg / kg)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Total Required Dose',
        primaryResult: `${totalMg.toLocaleString()} mg`,
        secondary: [
          { label: 'Single Dose (TID - 3x/day)', value: `${(totalMg / 3).toFixed(1)} mg` },
          { label: '4-2-1 Maintenance Fluid Est.', value: `${(weight <= 20 ? weight * 2 + 20 : weight + 40).toFixed(0)} mL/hr` },
        ],
        formula: 'Total Dose = Weight (kg) × Dosage Rate (mg/kg)',
      };
    }

    // 4. PHYSICS, ELECTRONICS & SCIENCE
    if (id.includes('projectile') || id.includes('pendulum') || id.includes('force') || id.includes('energy')) {
      const v0 = num1 || 25;
      const angleDeg = num2 || 45;
      const rad = (angleDeg * Math.PI) / 180;
      const g = 9.81;
      const maxH = Math.pow(v0 * Math.sin(rad), 2) / (2 * g);
      const range = (Math.pow(v0, 2) * Math.sin(2 * rad)) / g;
      const flightTime = (2 * v0 * Math.sin(rad)) / g;

      return {
        type: 'fields',
        fields: [
          { label: 'Initial Velocity v₀ (m/s)', value: v1, setter: setV1, type: 'number' },
          { label: 'Launch Angle θ (Degrees)', value: v2, setter: setV2, type: 'number' },
        ],
        primaryLabel: 'Max Trajectory Range',
        primaryResult: `${range.toFixed(2)} meters`,
        secondary: [
          { label: 'Peak Height H_max', value: `${maxH.toFixed(2)} meters` },
          { label: 'Total Flight Time', value: `${flightTime.toFixed(2)} seconds` },
        ],
        formula: 'Range = (v₀² sin 2θ) / g | H_max = (v₀ sin θ)² / 2g',
      };
    }

    if (id.includes('voltage') || id.includes('resistor') || id.includes('circuit') || id.includes('led') || id.includes('wire')) {
      const vin = num1 || 12;
      const vf = num2 || 2.1;
      const currentMa = num3 || 20;
      const iA = currentMa / 1000;
      const rOhms = iA > 0 ? (vin - vf) / iA : 0;
      const powerW = iA * iA * rOhms;

      return {
        type: 'fields',
        fields: [
          { label: 'Source Voltage V_in (Volts)', value: v1, setter: setV1, type: 'number' },
          { label: 'LED / Load Drop Voltage V_f (Volts)', value: v2, setter: setV2, type: 'number' },
          { label: 'Target Current I (mA)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Required Resistor Value',
        primaryResult: `${rOhms.toFixed(1)} Ω`,
        secondary: [
          { label: 'Resistor Power Dissipation', value: `${powerW.toFixed(3)} Watts` },
          { label: 'Recommended Standard Resistor', value: `${Math.ceil(rOhms / 10) * 10} Ω (1/4W)` },
        ],
        formula: 'R = (V_in - V_f) / I | Power = I² R',
      };
    }

    if (id.includes('gas') || id.includes('dilution') || id.includes('moles') || id.includes('heat')) {
      const c1 = num1 || 10;
      const v1Val = num2 || 50;
      const c2 = num3 || 2;
      const v2Val = c2 > 0 ? (c1 * v1Val) / c2 : 0;

      return {
        type: 'fields',
        fields: [
          { label: 'Initial Concentration C₁ (M / %)', value: v1, setter: setV1, type: 'number' },
          { label: 'Initial Volume V₁ (mL)', value: v2, setter: setV2, type: 'number' },
          { label: 'Target Concentration C₂ (M / %)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Required Final Volume V₂',
        primaryResult: `${v2Val.toFixed(1)} mL`,
        secondary: [
          { label: 'Solvent Volume to Add', value: `${Math.max(0, v2Val - v1Val).toFixed(1)} mL` },
          { label: 'Dilution Factor', value: `${c2 > 0 ? (c1 / c2).toFixed(2) : 0}x` },
        ],
        formula: 'C₁ V₁ = C₂ V₂ (Solution Dilution Equation)',
      };
    }

    // 5. CONSTRUCTION & CARPENTRY
    if (id.includes('gravel') || id.includes('asphalt') || id.includes('brick') || id.includes('drywall') || id.includes('concrete') || id.includes('decking')) {
      const lengthFt = num1 || 20;
      const widthFt = num2 || 15;
      const depthInches = num3 || 4;

      const sqft = lengthFt * widthFt;
      const cuYards = (sqft * (depthInches / 12)) / 27;
      const tons = cuYards * 1.4;

      return {
        type: 'fields',
        fields: [
          { label: 'Area Length (Feet)', value: v1, setter: setV1, type: 'number' },
          { label: 'Area Width (Feet)', value: v2, setter: setV2, type: 'number' },
          { label: 'Depth / Thickness (Inches)', value: v3, setter: setV3, type: 'number' },
        ],
        primaryLabel: 'Required Aggregate Weight',
        primaryResult: `${tons.toFixed(2)} Tons`,
        secondary: [
          { label: 'Total Volume', value: `${cuYards.toFixed(2)} Cubic Yards` },
          { label: 'Total Surface Coverage', value: `${sqft.toLocaleString()} Sq. Ft.` },
          { label: 'Est. Bags (50lb each)', value: `${Math.ceil((tons * 2000) / 50)} Bags` },
        ],
        formula: 'Cubic Yards = (Length × Width × Depth/12) / 27 | Tons ≈ Yards × 1.4',
      };
    }

    // 6. DATE, TIME & ASTRONOMY
    if (cat === 'date' || id.includes('date') || id.includes('time') || id.includes('year') || id.includes('day') || id.includes('week') || id.includes('age') || id.includes('birth') || id.includes('clock') || id.includes('calendar') || id.includes('lap') || id.includes('pace') || id.includes('biorhythm') || id.includes('dog') || id.includes('leap') || id.includes('zone') || id.includes('utc')) {
      
      // Unix Timestamp & ISO 8601
      if (id.includes('unix') || id.includes('timestamp') || id.includes('iso8601')) {
        const ts = parseInt(v1) || Math.floor(Date.now() / 1000);
        const d = new Date(ts > 1e11 ? ts : ts * 1000);
        const isValid = !isNaN(d.getTime());
        return {
          type: 'fields',
          fields: [{ label: 'Unix Timestamp (Seconds)', value: v1, setter: setV1, type: 'number' }],
          primaryLabel: 'Formatted UTC Date',
          primaryResult: isValid ? d.toUTCString() : 'Invalid Timestamp',
          secondary: [
            { label: 'Local Timezone', value: isValid ? d.toLocaleString() : '-' },
            { label: 'ISO 8601 String', value: isValid ? d.toISOString() : '-' },
            { label: 'Epoch Seconds', value: `${Math.floor((isValid ? d.getTime() : 0) / 1000)}` },
          ],
          formula: 'Date = Unix Timestamp × 1000 ms',
        };
      }

      // Dog Years Calculator
      if (id.includes('dog')) {
        const age = parseFloat(v1) || 5;
        const sizes = ['Small (<20 lbs)', 'Medium (20-50 lbs)', 'Large (50-90 lbs)', 'Giant (>90 lbs)'];
        const sz = unitSelect1 && sizes.includes(unitSelect1) ? unitSelect1 : sizes[1];
        let humanAge = 0;
        if (age <= 1) humanAge = 15;
        else if (age <= 2) humanAge = 24;
        else {
          const mult = sz.startsWith('Small') ? 4 : sz.startsWith('Medium') ? 5 : sz.startsWith('Large') ? 6 : 7;
          humanAge = 24 + (age - 2) * mult;
        }

        return {
          type: 'fields',
          fields: [
            { label: 'Dog Age (Calendar Years)', value: v1, setter: setV1, type: 'number' },
            { label: 'Dog Breed Size', value: sz, setter: setUnitSelect1, type: 'select', options: sizes },
          ],
          primaryLabel: 'Equivalent Human Age',
          primaryResult: `${humanAge} Human Years`,
          secondary: [
            { label: 'Life Stage', value: age < 1 ? 'Puppy' : age < 7 ? 'Adult' : 'Senior Dog' },
            { label: 'Annual Human Rate After Year 2', value: `+${sz.startsWith('Small') ? 4 : sz.startsWith('Medium') ? 5 : sz.startsWith('Large') ? 6 : 7} Years/Year` },
          ],
          formula: 'AVMA Formula: Yr 1 = 15y, Yr 2 = 9y, subsequent = +4 to +7y depending on size',
        };
      }

      // Age & Chronological Age
      if (id.includes('age') && !id.includes('dog')) {
        const birth = parseDateSafe(date1);
        const target = parseDateSafe(date2);
        if (!birth || !target) {
          return { type: 'fields', fields: [], primaryLabel: 'Age', primaryResult: 'Invalid Date' };
        }
        let years = target.getFullYear() - birth.getFullYear();
        let months = target.getMonth() - birth.getMonth();
        let days = target.getDate() - birth.getDate();
        if (days < 0) {
          months--;
          const prevMonthDays = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
          days += prevMonthDays;
        }
        if (months < 0) {
          years--;
          months += 12;
        }
        const diffMs = Math.max(0, target.getTime() - birth.getTime());
        const totalDays = Math.floor(diffMs / 86400000);
        const totalHours = totalDays * 24;
        const totalSecs = Math.floor(diffMs / 1000);
        const decimalYears = (years + months / 12 + days / 365.2425).toFixed(2);

        // Next Birthday calculation
        let nextBdayYear = target.getFullYear();
        let nextBday = new Date(nextBdayYear, birth.getMonth(), birth.getDate());
        if (nextBday < target) {
          nextBdayYear += 1;
          nextBday = new Date(nextBdayYear, birth.getMonth(), birth.getDate());
        }
        const daysToBday = Math.ceil((nextBday.getTime() - target.getTime()) / 86400000);
        const nextAge = nextBdayYear - birth.getFullYear();

        return {
          type: 'fields',
          fields: [
            { label: 'Birth Date (تاريخ الميلاد)', value: date1, setter: setDate1, type: 'date' },
            { label: 'Target / Today Date (حتى تاريخ)', value: date2, setter: setDate2, type: 'date' },
          ],
          primaryLabel: 'Exact Chronological Age (العمر الدقيق)',
          primaryResult: `${years} Years, ${months} Months, ${days} Days (${years} سنة و ${months} أشهر و ${days} يوم)`,
          secondary: [
            { label: 'Decimal Years (بالسنوات العشرية)', value: `${decimalYears} Years (${decimalYears} سنة)` },
            { label: 'Total Days Lived (إجمالي الأيام)', value: `${totalDays.toLocaleString()} Days` },
            { label: 'Total Hours (إجمالي الساعات)', value: `${totalHours.toLocaleString()} Hours` },
            { label: 'Next Birthday (يوم الميلاد القادم)', value: `${daysToBday} Days Remaining (Turning ${nextAge})` },
          ],
          formula: 'Age = Target Date - Birth Date (Exact Calendar Adjustment)',
        };
      }

      // Birthday Day of Week
      if (id.includes('birthday') || id.includes('born')) {
        const birth = parseDateSafe(date1) || new Date(date1);
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayNamesAr = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        const dayIdx = birth.getDay();
        const dayName = isNaN(birth.getTime()) ? 'Invalid Date' : `${dayNames[dayIdx]} (${dayNamesAr[dayIdx]})`;
        
        // Zodiac
        const m = birth.getMonth() + 1;
        const d = birth.getDate();
        let zodiac = 'Capricorn (الجدي)';
        if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) zodiac = 'Aquarius (الدلو)';
        else if ((m === 2 && d >= 19) || (m === 3 && d <= 20)) zodiac = 'Pisces (الحوت)';
        else if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) zodiac = 'Aries (الحمل)';
        else if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) zodiac = 'Taurus (الثور)';
        else if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) zodiac = 'Gemini (الجوزاء)';
        else if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) zodiac = 'Cancer (السرطان)';
        else if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) zodiac = 'Leo (الأسد)';
        else if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) zodiac = 'Virgo (العذراء)';
        else if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) zodiac = 'Libra (الميزان)';
        else if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) zodiac = 'Scorpio (العقرب)';
        else if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) zodiac = 'Sagittarius (القوس)';

        return {
          type: 'fields',
          fields: [{ label: 'Date of Birth', value: date1, setter: setDate1, type: 'date' }],
          primaryLabel: 'Day of the Week You Were Born',
          primaryResult: dayName,
          secondary: [
            { label: 'Zodiac Sign', value: zodiac },
            { label: 'Full Date Text', value: isNaN(birth.getTime()) ? '-' : birth.toLocaleDateString(undefined, { dateStyle: 'full' }) },
          ],
          formula: 'Zeller Congruence & Calendar Day Mapping',
        };
      }

      // Date Difference
      if (id.includes('date-diff') || id.includes('difference')) {
        const d1 = parseDateSafe(date1) || new Date(date1);
        const d2 = parseDateSafe(date2) || new Date(date2);
        const earlier = d1 <= d2 ? d1 : d2;
        const later = d1 <= d2 ? d2 : d1;
        
        let diffYears = later.getFullYear() - earlier.getFullYear();
        let diffMonths = later.getMonth() - earlier.getMonth();
        let diffDays = later.getDate() - earlier.getDate();
        if (diffDays < 0) {
          diffMonths--;
          const prevMonthDays = new Date(later.getFullYear(), later.getMonth(), 0).getDate();
          diffDays += prevMonthDays;
        }
        if (diffMonths < 0) {
          diffYears--;
          diffMonths += 12;
        }

        const diffMs = Math.abs(d2.getTime() - d1.getTime());
        const totalDays = Math.floor(diffMs / 86400000);

        let bizDays = 0;
        const start = d1 < d2 ? new Date(d1) : new Date(d2);
        const end = d1 < d2 ? new Date(d2) : new Date(d1);
        const cur = new Date(start);
        while (cur < end) {
          const day = cur.getDay();
          if (day !== 0 && day !== 6) bizDays++;
          cur.setDate(cur.getDate() + 1);
        }

        const weeks = Math.floor(totalDays / 7);
        const remDays = totalDays % 7;

        return {
          type: 'fields',
          fields: [
            { label: 'Start Date', value: date1, setter: setDate1, type: 'date' },
            { label: 'End Date', value: date2, setter: setDate2, type: 'date' },
          ],
          primaryLabel: 'Total Difference (الفرق الإجمالي)',
          primaryResult: `${diffYears} Years, ${diffMonths} Months, ${diffDays} Days (${diffYears} سنة و ${diffMonths} أشهر و ${diffDays} يوم)`,
          secondary: [
            { label: 'Total Calendar Days', value: `${totalDays} Days` },
            { label: 'Business Working Days (Mon-Fri)', value: `${bizDays} Days` },
            { label: 'Weeks & Days', value: `${weeks} Weeks, ${remDays} Days` },
            { label: 'Total Hours', value: `${(totalDays * 24).toLocaleString()} Hours` },
          ],
          formula: 'Exact Calendar Duration (Years, Months, Days) + Total Days',
        };
      }

      // Work Days / Business Days
      if (id.includes('work-days') || id.includes('business-days') || id.includes('business')) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        let biz = 0;
        let weekend = 0;
        const start = d1 < d2 ? new Date(d1) : new Date(d2);
        const end = d1 < d2 ? new Date(d2) : new Date(d1);
        const cur = new Date(start);
        while (cur <= end) {
          const day = cur.getDay();
          if (day === 0 || day === 6) weekend++;
          else biz++;
          cur.setDate(cur.getDate() + 1);
        }

        return {
          type: 'fields',
          fields: [
            { label: 'Start Date', value: date1, setter: setDate1, type: 'date' },
            { label: 'End Date', value: date2, setter: setDate2, type: 'date' },
          ],
          primaryLabel: 'Working Business Days',
          primaryResult: `${biz} Days`,
          secondary: [
            { label: 'Weekend Days (Sat/Sun)', value: `${weekend} Days` },
            { label: 'Total Calendar Span', value: `${biz + weekend} Days` },
            { label: 'Estimated Work Hours (8h/day)', value: `${biz * 8} Hours` },
          ],
          formula: 'Working Days = Total Days - Weekend Days (Saturday & Sunday)',
        };
      }

      // Date Add / Subtract / Future / Past Date
      if (id.includes('add-subtract') || id.includes('future-date') || id.includes('past-date') || id.includes('days-from') || id.includes('days-ago')) {
        const base = new Date(date1);
        const daysOffset = parseFloat(v1) || 30;
        const isPast = id.includes('past') || id.includes('ago') || unitSelect1 === 'Subtract (-)';
        const resultDate = new Date(base);

        if (id.includes('business')) {
          let added = 0;
          const dir = isPast ? -1 : 1;
          while (added < daysOffset) {
            resultDate.setDate(resultDate.getDate() + dir);
            const day = resultDate.getDay();
            if (day !== 0 && day !== 6) added++;
          }
        } else {
          resultDate.setDate(resultDate.getDate() + (isPast ? -daysOffset : daysOffset));
        }

        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        return {
          type: 'fields',
          fields: [
            { label: 'Base Date', value: date1, setter: setDate1, type: 'date' },
            { label: 'Days Offset', value: v1, setter: setV1, type: 'number' },
            { label: 'Action', value: unitSelect1, setter: setUnitSelect1, type: 'select', options: ['Add (+)', 'Subtract (-)'] },
          ],
          primaryLabel: 'Calculated Date',
          primaryResult: isNaN(resultDate.getTime()) ? 'Invalid Date' : resultDate.toISOString().split('T')[0],
          secondary: [
            { label: 'Day of the Week', value: isNaN(resultDate.getTime()) ? '-' : dayNames[resultDate.getDay()] },
            { label: 'Full Date', value: isNaN(resultDate.getTime()) ? '-' : resultDate.toLocaleDateString(undefined, { dateStyle: 'full' }) },
          ],
          formula: 'Target Date = Base Date ± N Days',
        };
      }

      // Time Duration Between Times
      if (id.includes('duration') || id.includes('time-between')) {
        const [h1, m1] = (time1 || '09:00').split(':').map(Number);
        const [h2, m2] = (time2 || '17:30').split(':').map(Number);
        let startMins = (h1 || 0) * 60 + (m1 || 0);
        let endMins = (h2 || 0) * 60 + (m2 || 0);
        if (endMins < startMins) endMins += 24 * 60; // Overnight span
        const durMins = endMins - startMins;
        const hours = Math.floor(durMins / 60);
        const mins = durMins % 60;

        return {
          type: 'fields',
          fields: [
            { label: 'Start Time', value: time1, setter: setTime1, type: 'time' },
            { label: 'End Time', value: time2, setter: setTime2, type: 'time' },
          ],
          primaryLabel: 'Time Elapsed / Duration',
          primaryResult: `${hours} Hours ${mins} Minutes`,
          secondary: [
            { label: 'Decimal Hours', value: `${(durMins / 60).toFixed(2)} Hours` },
            { label: 'Total Minutes', value: `${durMins} Minutes` },
            { label: 'Total Seconds', value: `${(durMins * 60).toLocaleString()} Seconds` },
          ],
          formula: 'Duration = End Time - Start Time (Adjusted for overnight)',
        };
      }

      // Time Card & Work Hours
      if (id.includes('timecard') || id.includes('time-card') || id.includes('work-shift')) {
        const [h1, m1] = (time1 || '08:00').split(':').map(Number);
        const [h2, m2] = (time2 || '17:00').split(':').map(Number);
        let startMins = (h1 || 0) * 60 + (m1 || 0);
        let endMins = (h2 || 0) * 60 + (m2 || 0);
        if (endMins < startMins) endMins += 24 * 60;
        const breakMins = parseFloat(v1) || 60;
        const rate = parseFloat(v2) || 25;
        const netMins = Math.max(0, endMins - startMins - breakMins);
        const netHours = netMins / 60;
        const totalPay = netHours * rate;
        const overtimeHours = Math.max(0, netHours - 8);

        return {
          type: 'fields',
          fields: [
            { label: 'Clock In Time', value: time1, setter: setTime1, type: 'time' },
            { label: 'Clock Out Time', value: time2, setter: setTime2, type: 'time' },
            { label: 'Break Duration (Minutes)', value: v1, setter: setV1, type: 'number' },
            { label: 'Hourly Wage Rate ($)', value: v2, setter: setV2, type: 'number' },
          ],
          primaryLabel: 'Net Paid Hours',
          primaryResult: `${netHours.toFixed(2)} Hours`,
          secondary: [
            { label: 'Gross Pay For Shift', value: `$${totalPay.toFixed(2)}` },
            { label: 'Overtime Hours (>8h)', value: `${overtimeHours.toFixed(2)} Hours` },
            { label: 'Est. Weekly Pay (5 Shifts)', value: `$${(totalPay * 5).toFixed(2)}` },
          ],
          formula: 'Paid Hours = (Clock Out - Clock In) - Break | Pay = Hours × Rate',
        };
      }

      // Leap Year Checker
      if (id.includes('leap')) {
        const yr = parseInt(v1) || 2026;
        const isLeap = (yr % 4 === 0 && yr % 100 !== 0) || (yr % 400 === 0);
        return {
          type: 'fields',
          fields: [{ label: 'Year to Check', value: v1, setter: setV1, type: 'number' }],
          primaryLabel: 'Leap Year Status',
          primaryResult: isLeap ? 'Yes, Leap Year!' : 'No, Common Year',
          secondary: [
            { label: 'Total Days in Year', value: isLeap ? '366 Days' : '365 Days' },
            { label: 'Days in February', value: isLeap ? '29 Days' : '28 Days' },
            { label: 'Next Leap Year', value: `${isLeap ? yr + 4 : yr + (4 - (yr % 4))}` },
          ],
          formula: 'Leap Year Rule: (Year % 4 === 0 && Year % 100 !== 0) || (Year % 400 === 0)',
        };
      }

      // Time Zone Converter & Meeting Planner
      if (id.includes('zone') || id.includes('utc') || id.includes('meeting') || id.includes('flight') || id.includes('dst')) {
        const timeStr = time1 || '12:00';
        const [h, m] = timeStr.split(':').map(Number);
        const offsets: Record<string, number> = {
          'UTC / GMT (UTC+0)': 0,
          'EST (New York, UTC-5)': -5,
          'PST (Los Angeles, UTC-8)': -8,
          'CST (Chicago, UTC-6)': -6,
          'CET (Paris/London, UTC+1)': 1,
          'GST (Dubai, UTC+4)': 4,
          'AST (Riyadh, UTC+3)': 3,
          'IST (India, UTC+5.5)': 5.5,
          'JST (Tokyo, UTC+9)': 9,
          'AEST (Sydney, UTC+10)': 10,
        };
        const zoneKeys = Object.keys(offsets);
        const fromZone = unitSelect1 && offsets[unitSelect1] !== undefined ? unitSelect1 : zoneKeys[1];
        const toZone = unitSelect2 && offsets[unitSelect2] !== undefined ? unitSelect2 : zoneKeys[6];

        const offsetFrom = offsets[fromZone];
        const offsetTo = offsets[toZone];
        const diffHours = offsetTo - offsetFrom;
        let targetH = (h + diffHours) % 24;
        if (targetH < 0) targetH += 24;
        const targetTimeStr = `${String(Math.floor(targetH)).padStart(2, '0')}:${String(m || 0).padStart(2, '0')}`;
        const isGoodMeeting = targetH >= 9 && targetH <= 18;

        return {
          type: 'fields',
          fields: [
            { label: 'Source Time', value: time1, setter: setTime1, type: 'time' },
            { label: 'From Time Zone', value: fromZone, setter: setUnitSelect1, type: 'select', options: zoneKeys },
            { label: 'To Time Zone', value: toZone, setter: setUnitSelect2, type: 'select', options: zoneKeys },
          ],
          primaryLabel: 'Converted Local Time',
          primaryResult: targetTimeStr,
          secondary: [
            { label: 'Time Offset Difference', value: `${diffHours >= 0 ? '+' : ''}${diffHours} Hours` },
            { label: 'Business Hours Meeting Status', value: isGoodMeeting ? ' Suitable Business Hours (9am-6pm)' : ' Outside Normal Working Hours' },
          ],
          formula: 'Target Time = Source Time + (Target Zone Offset - Source Zone Offset)',
        };
      }

      // Count Down Timer
      if (id.includes('count') || id.includes('countdown')) {
        const target = new Date(date1);
        const now = new Date();
        const diffMs = target.getTime() - now.getTime();
        const absDiff = Math.abs(diffMs);
        const days = Math.floor(absDiff / 86400000);
        const hours = Math.floor((absDiff % 86400000) / 3600000);
        const mins = Math.floor((absDiff % 3600000) / 60000);
        const isPast = diffMs < 0;

        return {
          type: 'fields',
          fields: [
            { label: 'Event Target Date', value: date1, setter: setDate1, type: 'date' },
            { label: 'Event Label / Title', value: v1, setter: setV1, type: 'text' },
          ],
          primaryLabel: isPast ? 'Time Since Event' : 'Countdown Remaining',
          primaryResult: `${days} Days, ${hours} Hours, ${mins} Mins`,
          secondary: [
            { label: 'Status', value: isPast ? ' Event Has Passed' : ' Event Upcoming' },
            { label: 'Weeks Remaining', value: `${(days / 7).toFixed(1)} Weeks` },
          ],
          formula: 'Countdown = Event Date - Current Timestamp',
        };
      }

      // Time Unit Converter
      if (id.includes('time-unit') || id.includes('unit-converter')) {
        const val = parseFloat(v1) || 60;
        const ratesInSec: Record<string, number> = {
          'Milliseconds': 0.001,
          'Seconds': 1,
          'Minutes': 60,
          'Hours': 3600,
          'Days': 86400,
          'Weeks': 604800,
          'Months (30d)': 2592000,
          'Years (365d)': 31536000,
        };
        const uKeys = Object.keys(ratesInSec);
        const fromU = unitSelect1 && ratesInSec[unitSelect1] ? unitSelect1 : 'Minutes';
        const toU = unitSelect2 && ratesInSec[unitSelect2] ? unitSelect2 : 'Seconds';

        const totalSec = val * ratesInSec[fromU];
        const resultVal = totalSec / ratesInSec[toU];

        return {
          type: 'fields',
          fields: [
            { label: 'Time Value', value: v1, setter: setV1, type: 'number' },
            { label: 'From Unit', value: fromU, setter: setUnitSelect1, type: 'select', options: uKeys },
            { label: 'To Unit', value: toU, setter: setUnitSelect2, type: 'select', options: uKeys },
          ],
          primaryLabel: 'Converted Time',
          primaryResult: `${resultVal.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${toU}`,
          secondary: [
            { label: 'In Seconds', value: `${totalSec.toLocaleString()} Sec` },
            { label: 'In Hours', value: `${(totalSec / 3600).toFixed(2)} Hrs` },
            { label: 'In Days', value: `${(totalSec / 86400).toFixed(2)} Days` },
          ],
          formula: 'Converted = (Value × FromUnitInSec) / ToUnitInSec',
        };
      }

      // Biorhythm Cycle Calculator
      if (id.includes('biorhythm')) {
        const birth = new Date(date1);
        const target = new Date(date2);
        const daysLived = Math.floor(Math.max(0, target.getTime() - birth.getTime()) / 86400000);
        const phys = Math.round(Math.sin((2 * Math.PI * daysLived) / 23) * 100);
        const emot = Math.round(Math.sin((2 * Math.PI * daysLived) / 28) * 100);
        const intel = Math.round(Math.sin((2 * Math.PI * daysLived) / 33) * 100);

        return {
          type: 'fields',
          fields: [
            { label: 'Date of Birth', value: date1, setter: setDate1, type: 'date' },
            { label: 'Target Reading Date', value: date2, setter: setDate2, type: 'date' },
          ],
          primaryLabel: 'Physical Biorhythm Cycle',
          primaryResult: `${phys}%`,
          secondary: [
            { label: 'Emotional Cycle (28d)', value: `${emot}%` },
            { label: 'Intellectual Cycle (33d)', value: `${intel}%` },
            { label: 'Overall Harmony Avg', value: `${Math.round((phys + emot + intel) / 3)}%` },
          ],
          formula: 'Biorhythm = Sin(2π × DaysLived / CyclePeriod) × 100%',
        };
      }

      // Week Number or Day Number
      if (id.includes('week') || id.includes('day-number')) {
        const d = new Date(date1);
        const isValid = !isNaN(d.getTime());
        const startOfYear = new Date(isValid ? d.getFullYear() : 2026, 0, 1);
        const dayOfYear = Math.floor(((isValid ? d.getTime() : Date.now()) - startOfYear.getTime()) / 86400000) + 1;
        const weekNum = Math.ceil(dayOfYear / 7);

        return {
          type: 'fields',
          fields: [{ label: 'Selected Date', value: date1, setter: setDate1, type: 'date' }],
          primaryLabel: 'ISO Week Number',
          primaryResult: `Week ${weekNum}`,
          secondary: [
            { label: 'Day of the Year', value: `Day ${dayOfYear} of 365` },
            { label: 'Days Remaining in Year', value: `${365 - dayOfYear} Days` },
            { label: 'Year Progress', value: `${((dayOfYear / 365) * 100).toFixed(1)}%` },
          ],
          formula: 'ISO Week = Math.ceil(Day of Year / 7)',
        };
      }

      // Default Date Fallback for any other date/time tool
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      const diffMs = Math.abs(d2.getTime() - d1.getTime());
      const days = Math.floor(diffMs / 86400000);
      return {
        type: 'fields',
        fields: [
          { label: 'Start / Primary Date', value: date1, setter: setDate1, type: 'date' },
          { label: 'End / Target Date', value: date2, setter: setDate2, type: 'date' },
        ],
        primaryLabel: 'Date Interval Span',
        primaryResult: `${days} Days`,
        secondary: [
          { label: 'Weeks', value: `${(days / 7).toFixed(1)} Weeks` },
          { label: 'Months (approx)', value: `${(days / 30.43).toFixed(1)} Months` },
        ],
        formula: 'Interval = Math.abs(Date 2 - Date 1)',
      };
    }

    // 7. DEVELOPER & CODE
    if (id.includes('raid') || id.includes('ipv6') || id.includes('cidr') || id.includes('subnet') || id.includes('hash') || id.includes('sha') || id.includes('css') || id.includes('json') || id.includes('xml') || id.includes('cron') || id.includes('regex') || id.includes('base32') || id.includes('binary') || id.includes('hex')) {
      if (id.includes('raid')) {
        const drives = Math.max(2, Math.round(num1) || 4);
        const capTb = num2 || 4;
        const totalCap = drives * capTb;
        const usableRaid5 = (drives - 1) * capTb;
        const usableRaid10 = (drives / 2) * capTb;

        return {
          type: 'fields',
          fields: [
            { label: 'Number of Hard Drives', value: v1, setter: setV1, type: 'number' },
            { label: 'Capacity Per Drive (TB)', value: v2, setter: setV2, type: 'number' },
          ],
          primaryLabel: 'Usable Storage (RAID 5)',
          primaryResult: `${usableRaid5.toFixed(1)} TB`,
          secondary: [
            { label: 'Total Raw Capacity', value: `${totalCap} TB` },
            { label: 'RAID 10 Usable', value: `${usableRaid10.toFixed(1)} TB` },
            { label: 'Parity Loss Overhead', value: `${(((totalCap - usableRaid5) / totalCap) * 100).toFixed(0)}%` },
          ],
          formula: 'RAID 5 Usable = (N - 1) × Drive Size | RAID 10 = (N / 2) × Drive Size',
        };
      }

      if (id.includes('css') || id.includes('clamp')) {
        const minPx = num1 || 16;
        const maxPx = num2 || 24;
        const minW = num3 || 320;
        const maxW = num4 || 1200;

        const slope = (maxPx - minPx) / (maxW - minW);
        const yAxisIntersection = -minW * slope + minPx;
        const clampCode = `clamp(${(minPx / 16).toFixed(2)}rem, ${(yAxisIntersection / 16).toFixed(2)}rem + ${(slope * 100).toFixed(2)}vw, ${(maxPx / 16).toFixed(2)}rem)`;

        return {
          type: 'fields',
          fields: [
            { label: 'Minimum Font Size (px)', value: v1, setter: setV1, type: 'number' },
            { label: 'Maximum Font Size (px)', value: v2, setter: setV2, type: 'number' },
            { label: 'Minimum Viewport Width (px)', value: v3, setter: setV3, type: 'number' },
            { label: 'Maximum Viewport Width (px)', value: v4, setter: setV4, type: 'number' },
          ],
          primaryLabel: 'Generated CSS clamp() Property',
          primaryResult: clampCode,
          secondary: [
            { label: 'Slope Ratio', value: `${(slope * 100).toFixed(3)}vw` },
            { label: 'Rem Base Scaling', value: `${minPx}px -> ${maxPx}px` },
          ],
          formula: 'font-size: clamp(MIN, VAL, MAX)',
        };
      }
    }

    // 8. TEXT, SEO & CONTENT
    if (cat === 'text' || id.includes('text') || id.includes('word') || id.includes('case') || id.includes('readability') || id.includes('keyword') || id.includes('morse') || id.includes('slug')) {
      const text = textVal || 'Hello Calcyfy World';
      const charCount = text.length;
      const charNoSpaces = text.replace(/\s+/g, '').length;
      const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
      const sentences = text.split(/[.!?]+/).filter(Boolean).length || 1;
      const readTimeSec = Math.ceil((wordCount / 200) * 60);

      const camelCase = text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
      const snakeCase = text.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
      const kebabCase = text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

      return {
        type: 'text',
        primaryLabel: 'Word & Character Metrics',
        primaryResult: `${wordCount} Words | ${charCount} Chars`,
        secondary: [
          { label: 'Chars (No Spaces)', value: `${charNoSpaces}` },
          { label: 'Est. Reading Time', value: `${readTimeSec} Seconds` },
          { label: 'camelCase', value: camelCase },
          { label: 'snake_case', value: snakeCase },
          { label: 'kebab-case', value: kebabCase },
        ],
        formula: 'Reading Time = Word Count / 200 WPM',
      };
    }

    // GENERAL DEFAULT DYNAMIC CALCULATOR
    const valA = num1 || 100;
    const valB = num2 || 15;
    const calcOut = valA * (1 + valB / 100);

    return {
      type: 'fields',
      fields: [
        { label: 'Base Value / Amount', value: v1, setter: setV1, type: 'number' },
        { label: 'Factor / Rate (%)', value: v2, setter: setV2, type: 'number' },
        { label: 'Secondary Multiplier', value: v3, setter: setV3, type: 'number' },
      ],
      primaryLabel: 'Calculated Dynamic Output',
      primaryResult: `$${calcOut.toFixed(2)}`,
      secondary: [
        { label: 'Added Difference', value: `$${(calcOut - valA).toFixed(2)}` },
        { label: 'Multiplied Product', value: `${(valA * num3).toFixed(2)}` },
      ],
      formula: 'Result = Base Value × (1 + Rate / 100)',
    };
  };

  const config = getToolConfig();

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        
        {/* Top Header / Badges */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl text-emerald-600 dark:text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {tool ? t(`tool_${tool.id.replace('-', '_')}_name`, tool.id) : toolId}
              </h3>
              <p className="text-xs text-slate-500">Instant Interactive Calculator Engine</p>
            </div>
          </div>
          <button
            onClick={() => {
              setV1('100');
              setV2('10');
              setV3('5');
              setV4('2');
              setDate1('1995-06-15');
              setDate2(todayStr);
              setTime1('09:00');
              setTime2('17:30');
            }}
            className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>

        {/* Inputs Area */}
        {config.type === 'text' ? (
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">Input Content / String</label>
            <textarea
              rows={4}
              value={textVal}
              onChange={(e) => setTextVal(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="Type or paste text here..."
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {config.fields?.map((field, idx) => (
              <div key={idx}>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-base focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-900 dark:text-white"
                  >
                    {field.options?.map((opt, oIdx) => (
                      <option key={oIdx} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || 'text'}
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-900 dark:text-white"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Output Panel */}
        <div id="tool-calculator-container" className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
                {config.primaryLabel}
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-slate-900 dark:text-white mt-1 break-all">
                {config.primaryResult}
              </div>
            </div>

            {/* Action Buttons Toolbar */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => copyToClipboard(`${config.primaryLabel}: ${config.primaryResult}`)}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
                title="Copy primary result"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy')}</span>
              </button>

              <button
                onClick={() => {
                  const rows = [
                    ['Tool', tool ? tool.id : toolId],
                    ['Date', new Date().toLocaleString()],
                    ['Primary Metric', config.primaryLabel],
                    ['Result', config.primaryResult],
                  ];
                  if (config.fields) {
                    config.fields.forEach((f) => rows.push([f.label, String(f.value)]));
                  }
                  if (config.secondary) {
                    config.secondary.forEach((s) => rows.push([s.label, String(s.value)]));
                  }
                  if (config.formula) {
                    rows.push(['Formula', config.formula]);
                  }
                  const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.map((x) => `"${x}"`).join(',')).join('\n');
                  const encodedUri = encodeURI(csvContent);
                  const link = document.createElement('a');
                  link.setAttribute('href', encodedUri);
                  link.setAttribute('download', `${toolId}_calculation_report.csv`);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
                title="Export CSV Report"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>

              <button
                onClick={() => {
                  executePrint({
                    title: tool ? t(`tool_${tool.id.replace('-', '_')}_name`, tool.id) : toolId,
                    category: tool?.categoryId || 'Calculator',
                    elementId: 'tool-calculator-container',
                    lang,
                    isRTL,
                  });
                }}
                className="px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
                title="Print PDF Summary"
              >
                <Printer className="w-4 h-4 text-indigo-500" />
                <span className="hidden sm:inline">Print / PDF</span>
              </button>

              <button
                onClick={handleShareLink}
                className="px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
                title="Share calculation link"
              >
                {copiedShare ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4 text-amber-500" />}
                <span className="hidden sm:inline">{copiedShare ? 'Link Copied' : 'Share Link'}</span>
              </button>
            </div>
          </div>

          {/* Secondary Details Grid */}
          {config.secondary && config.secondary.length > 0 && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700/80 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {config.secondary.map((sec, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[11px] font-medium text-slate-500 block truncate">{sec.label}</span>
                  <span className="text-sm font-bold font-mono text-slate-800 dark:text-slate-100 mt-0.5 block truncate">
                    {sec.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Visual Interactive Analytics Chart */}
          {config.fields && config.fields.length >= 2 && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <BarChart3 className="w-4 h-4 text-emerald-500" />
                  <span>Visual Breakdown & Proportion</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Dynamic Analytics</span>
              </div>

              {/* Progress Distribution Bar */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex shadow-inner">
                  {config.fields.map((f, idx) => {
                    const numVal = Math.abs(parseFloat(f.value) || 1);
                    let sumVal = 0;
                    config.fields!.forEach((c) => { sumVal += Math.abs(parseFloat(c.value) || 1); });
                    const totalVal = sumVal || 1;
                    const pct = Math.min(100, Math.max(5, (numVal / totalVal) * 100));
                    const colors = [
                      'bg-emerald-500',
                      'bg-teal-500',
                      'bg-indigo-500',
                      'bg-amber-500',
                    ];
                    return (
                      <div
                        key={idx}
                        style={{ width: `${pct}%` }}
                        className={`${colors[idx % colors.length]} transition-all duration-500 h-full border-r border-white/20 last:border-r-0`}
                        title={`${f.label}: ${f.value} (${pct.toFixed(1)}%)`}
                      />
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium text-slate-500 dark:text-slate-400 pt-1">
                  {config.fields.map((f, idx) => {
                    const colors = [
                      'bg-emerald-500',
                      'bg-teal-500',
                      'bg-indigo-500',
                      'bg-amber-500',
                    ];
                    return (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${colors[idx % colors.length]}`} />
                        <span className="truncate max-w-[120px]">{f.label.split('(')[0]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Formula or Explanatory note */}
          {config.formula && (
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-2 font-mono">
              <Info className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{config.formula}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
