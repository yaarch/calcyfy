import { Language, ToolDef } from '../types';
import { TOOLS } from '../data/tools';
import { getToolName } from './toolMetadata';

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolInputExplanation {
  name: string;
  description: string;
  unit?: string;
}

export interface ToolContentDetails {
  toolName: string;
  intro: string;
  whatItCalculates: string;
  formula?: string;
  inputs: ToolInputExplanation[];
  unitsAndConversions?: string;
  workedExample?: {
    scenario: string;
    stepByStep: string[];
    result: string;
  };
  limitations?: string;
  faqs: ToolFaq[];
  relatedTools: ToolDef[];
}

// Domain-specific keyword matching to provide precise mathematical formulas and explanations
export function getToolContentDetails(
  tool: ToolDef,
  lang: Language = 'en'
): ToolContentDetails {
  const name = getToolName(tool, lang);
  const id = tool.id.toLowerCase();
  const slug = tool.slug.toLowerCase();

  // Find 3 genuinely related tools in the same or complementary category
  const relatedTools = TOOLS.filter(
    (t) => t.id !== tool.id && (t.categoryId === tool.categoryId || t.slug.includes(id.split('-')[0]))
  ).slice(0, 4);

  // 1. CONCRETE & CONSTRUCTION
  if (slug.includes('concrete') || slug.includes('slab') || slug.includes('yardage')) {
    return {
      toolName: name,
      intro: `The ${name} calculates the total volume of concrete required for slabs, footings, patios, columns, and driveways in cubic yards, cubic feet, and standard pre-mixed bags.`,
      whatItCalculates: 'Total required volume (cubic yards, cubic feet, cubic meters) and required pre-mixed bags (60 lb and 80 lb) with adjustable waste contingency.',
      formula: 'Volume (cu yd) = [Length (ft) × Width (ft) × (Thickness (in) / 12)] ÷ 27 × (1 + Waste %)',
      inputs: [
        { name: 'Length', description: 'Total linear length of the pour area.', unit: 'Feet (ft) or Meters (m)' },
        { name: 'Width', description: 'Total linear width of the pour area.', unit: 'Feet (ft) or Meters (m)' },
        { name: 'Thickness / Depth', description: 'Slab depth (typically 4 inches for sidewalks/patios, 6 inches for driveways).', unit: 'Inches (in) or cm' },
        { name: 'Waste Allowance', description: 'Recommended 5% to 10% buffer to account for grade variations, spillage, and form deflection.', unit: 'Percentage (%)' },
      ],
      unitsAndConversions: '1 cubic yard equals 27 cubic feet. One 80 lb bag yields approximately 0.60 cu ft; one 60 lb bag yields approximately 0.45 cu ft.',
      workedExample: {
        scenario: 'Pouring a 10 ft by 20 ft patio slab at 4 inches (0.333 ft) thick with 10% waste allowance.',
        stepByStep: [
          'Calculate base volume: 10 ft × 20 ft × 0.333 ft = 66.67 cubic feet.',
          'Convert to cubic yards: 66.67 ÷ 27 = 2.47 cubic yards.',
          'Add 10% waste buffer: 2.47 × 1.10 = 2.72 cubic yards (or ~122 eighty-pound bags).',
        ],
        result: '2.72 cubic yards of ready-mix concrete required.',
      },
      limitations: 'Calculations assume an even sub-base. Uneven ground, settlement, or deeper thickened edges will require additional concrete volume.',
      faqs: [
        {
          question: 'How thick should a residential concrete slab be?',
          answer: 'Standard walkways and patios require a minimum thickness of 4 inches (10 cm). Heavy vehicle driveways or hot tub pads should be 5 to 6 inches thick with rebar reinforcement.',
        },
        {
          question: 'How many 80 lb bags of concrete make 1 cubic yard?',
          answer: 'It takes 45 bags of 80 lb concrete (or 60 bags of 60 lb concrete) to yield exactly 1 cubic yard of poured material.',
        },
        {
          question: 'Why is adding a 10% waste margin important?',
          answer: 'Ground imperfections, formwork bowing, and excavation variances almost always cause the actual volume needed to exceed mathematical blueprints. Ordering exact amounts risks cold joints.',
        },
      ],
      relatedTools,
    };
  }

  // 2. RC CUTOFF FREQUENCY & ELECTRONICS
  if (slug.includes('rc-low-pass') || slug.includes('cutoff-frequency') || id.includes('cutoff')) {
    return {
      toolName: name,
      intro: `The ${name} determines the -3 dB corner cutoff frequency (fc) and time constant (τ) of passive resistor-capacitor (RC) low-pass and high-pass analog filter networks.`,
      whatItCalculates: 'Half-power cutoff frequency (Hz, kHz, MHz), angular frequency (rad/s), and circuit charging time constant (seconds / milliseconds).',
      formula: 'fc = 1 / (2 × π × R × C)  |  τ (tau) = R × C',
      inputs: [
        { name: 'Resistance (R)', description: 'Series resistance of the filter resistor.', unit: 'Ohms (Ω), kΩ, or MΩ' },
        { name: 'Capacitance (C)', description: 'Shunt or coupling capacitance.', unit: 'Farads (F), µF, nF, or pF' },
      ],
      unitsAndConversions: '1 kHz = 1,000 Hz; 1 MHz = 1,000,000 Hz; 1 µF = 10⁻⁶ F; 1 nF = 10⁻⁹ F; 1 pF = 10⁻¹² F.',
      workedExample: {
        scenario: 'Audio low-pass filter using a 10 kΩ resistor (10,000 Ω) and a 10 nF capacitor (10 × 10⁻⁹ F).',
        stepByStep: [
          'Calculate 2πRC: 2 × 3.14159 × 10,000 × (10 × 10⁻⁹) = 0.0006283.',
          'Invert to find fc: 1 ÷ 0.0006283 = 1,591.55 Hz (1.59 kHz).',
          'Calculate time constant τ: 10,000 × (10 × 10⁻⁹) = 0.1 ms (reaches 63.2% charge in 0.1 ms).',
        ],
        result: 'Cutoff frequency fc = 1.59 kHz.',
      },
      limitations: 'Assumes ideal components. Real-world capacitor dielectric losses, component tolerances (typically ±5% to ±20%), and source/load impedance alter practical response curves.',
      faqs: [
        {
          question: 'What is the physical significance of the -3 dB cutoff point?',
          answer: 'At the cutoff frequency fc, the output voltage signal drops to 70.7% of its input amplitude (Vout = Vin / √2), representing exactly half output power (-3 dB).',
        },
        {
          question: 'What is the difference between an RC low-pass and high-pass filter?',
          answer: 'A low-pass filter passes frequencies below fc and attenuates higher frequencies (capacitor to ground). A high-pass filter passes frequencies above fc and blocks DC/low frequencies (capacitor in series).',
        },
        {
          question: 'What rolloff attenuation slope does a first-order RC filter provide?',
          answer: 'A single-stage RC filter provides an attenuation slope of -20 dB per decade (-6 dB per octave) beyond the cutoff frequency.',
        },
      ],
      relatedTools,
    };
  }

  // 3. WIRE GAUGE & AMPACITY (AWG)
  if (slug.includes('awg') || slug.includes('wire-gauge') || slug.includes('ampacity')) {
    return {
      toolName: name,
      intro: `The ${name} evaluates standard American Wire Gauge (AWG) copper and aluminum conductors for allowable ampacity, cross-sectional area, diameter, resistance per 1000 ft, and safe voltage drop under continuous electrical loads.`,
      whatItCalculates: 'Maximum continuous current rating (Amps), conductor cross-sectional area (mm² and kcmil), wire diameter, resistance (Ω/1000ft), and voltage drop percentage.',
      formula: 'Voltage Drop (V) = 2 × Length (ft) × Current (A) × Conductor Resistance (Ω/ft)',
      inputs: [
        { name: 'Wire Gauge (AWG)', description: 'Conductor thickness gauge (e.g. 14 AWG for 15A, 12 AWG for 20A, 10 AWG for 30A).', unit: 'AWG' },
        { name: 'Circuit Current', description: 'Continuous operating current of the connected appliance or branch circuit.', unit: 'Amperes (A)' },
        { name: 'Conductor Length', description: 'One-way distance from the breaker panel to the electrical load.', unit: 'Feet (ft) or Meters (m)' },
        { name: 'Conductor Material', description: 'Solid/stranded copper (Cu) or aluminum (Al).', unit: 'Copper / Aluminum' },
      ],
      unitsAndConversions: 'National Electrical Code (NEC) guidelines recommend limiting branch circuit voltage drop to under 3% for optimal equipment efficiency.',
      workedExample: {
        scenario: 'Running a 16A continuous load at 120V over 100 feet using 12 AWG copper wire (resistance ~1.93 Ω/1000 ft).',
        stepByStep: [
          'Calculate total round-trip wire length: 2 × 100 ft = 200 ft.',
          'Calculate wire resistance: 200 ft × (1.93 Ω / 1000 ft) = 0.386 Ω.',
          'Calculate voltage drop: 16A × 0.386 Ω = 6.18 Volts.',
          'Percentage drop: (6.18V ÷ 120V) × 100% = 5.15% (exceeds 3% limit; upsizing to 10 AWG recommended).',
        ],
        result: '6.18V (5.15%) voltage drop. Conductor upsize to 10 AWG advised for runs exceeding 75 ft.',
      },
      limitations: 'Ampacity ratings depend on insulation temperature rating (60°C, 75°C, 90°C), ambient temperature derating, and conduit fill adjustments per NEC Table 310.16.',
      faqs: [
        {
          question: 'What gauge wire is required for a 20-amp household circuit?',
          answer: 'Under NEC rules, a 20-amp residential circuit requires minimum 12 AWG copper wire. A 15-amp circuit requires 14 AWG wire.',
        },
        {
          question: 'Why does wire gauge number decrease as wire size increases?',
          answer: 'The AWG system originates from traditional wire drawing operations: the gauge number originally represented the number of successive drawing dies the wire had to be pulled through.',
        },
        {
          question: 'When should I upsize electrical wire for long distances?',
          answer: 'Upsize your conductor gauge whenever the one-way circuit run exceeds 50–75 feet to keep voltage drop below the recommended 3% threshold.',
        },
      ],
      relatedTools,
    };
  }

  // 4. GAS DENSITY & MOLAR MASS (IDEAL GAS LAW)
  if (slug.includes('gas-density') || slug.includes('molar-mass') || id.includes('ideal-gas')) {
    return {
      toolName: name,
      intro: `The ${name} calculates the mass density (ρ) of an ideal or real gas based on its molecular weight (molar mass M), pressure (P), and temperature (T) using the ideal gas equation of state.`,
      whatItCalculates: 'Gas density in g/L (kg/m³), specific volume, and molar concentration at specified pressure and temperature states.',
      formula: 'ρ (density) = (P × M) / (R × T)  |  Where R = 0.082057 L·atm/(mol·K) = 8.314 J/(mol·K)',
      inputs: [
        { name: 'Molar Mass (M)', description: 'Molecular weight of the gas compound (e.g. 28.97 g/mol for dry air, 44.01 g/mol for CO₂).', unit: 'g/mol' },
        { name: 'Pressure (P)', description: 'Absolute pressure of the gas.', unit: 'atm, kPa, bar, or psi' },
        { name: 'Temperature (T)', description: 'Absolute thermodynamic temperature.', unit: 'Kelvin (K), Celsius (°C), or Fahrenheit (°F)' },
      ],
      unitsAndConversions: 'T(K) = T(°C) + 273.15. At Standard Temperature and Pressure (STP: 0°C, 1 atm), one mole of any ideal gas occupies 22.414 Liters.',
      workedExample: {
        scenario: 'Calculating the density of carbon dioxide (CO₂, M = 44.01 g/mol) at 1 atm and 25°C (298.15 K).',
        stepByStep: [
          'Convert temperature: 25°C + 273.15 = 298.15 K.',
          'Apply equation: ρ = (1 atm × 44.01 g/mol) ÷ (0.08206 L·atm/(mol·K) × 298.15 K).',
          'Calculate denominator: 0.08206 × 298.15 = 24.466.',
          'Divide numerator: 44.01 ÷ 24.466 = 1.7988 g/L.',
        ],
        result: 'CO₂ density = 1.80 g/L (1.80 kg/m³) at room temperature and standard pressure.',
      },
      limitations: 'Valid for gases operating at low to moderate pressures and high relative temperatures where intermolecular forces and molecular volume are negligible.',
      faqs: [
        {
          question: 'What is the density of ambient dry air at standard sea level?',
          answer: 'At standard sea-level temperature (15°C / 288.15 K) and standard pressure (101.325 kPa), the density of dry air is approximately 1.225 kg/m³ (1.225 g/L).',
        },
        {
          question: 'Why does gas density decrease as temperature rises?',
          answer: 'At constant pressure, heating a gas increases the kinetic energy of its molecules, causing expansion and increasing volume, which lowers mass per unit volume (density).',
        },
        {
          question: 'How does molar mass influence gas density?',
          answer: 'Density is directly proportional to molar mass. Heavier gas molecules (like SF₆ at 146 g/mol) settle to the floor, while lighter gases (like Helium at 4 g/mol) rise rapidly.',
        },
      ],
      relatedTools,
    };
  }

  // 5. GENERAL / FALLBACK STRUCTURED CONTENT (Tailored to specific tool category and properties)
  const categoryTerms: Record<string, { verb: string; units: string; standard: string }> = {
    finance: { verb: 'financial evaluations and returns', units: 'monetary currency and annual percentages', standard: 'standard banking and amortization math' },
    math: { verb: 'mathematical operations and solutions', units: 'exact numeric values and ratios', standard: 'algebraic and arithmetic principles' },
    health: { verb: 'biometric and nutritional benchmarks', units: 'metric and imperial body measurements', standard: 'clinical and physiological wellness equations' },
    date: { verb: 'chronological spans and calendar intervals', units: 'years, days, hours, and minutes', standard: 'Gregorian calendar and leap-year rules' },
    converters: { verb: 'unit and dimensional conversions', units: 'international metric and imperial units', standard: 'NIST and ISO dimensional standards' },
    developer: { verb: 'computational and engineering conversions', units: 'binary, decimal, and protocol units', standard: 'standard IEEE and IETF specifications' },
    text: { verb: 'textual metrics and formatting transformations', units: 'words, characters, and reading grade scores', standard: 'computational linguistics rules' },
    everyday: { verb: 'practical daily calculations', units: 'household and workshop measurements', standard: 'everyday empirical formulas' },
    currency: { verb: 'foreign exchange and valuation calculations', units: 'fiat currencies and bullion weights', standard: 'live market exchange parameters' },
    'pdf-image': { verb: 'document and image dimension processing', units: 'pixels, inches, DPI, and file bytes', standard: 'digital media resolution standards' },
  };

  const domain = categoryTerms[tool.categoryId] || categoryTerms.math;

  return {
    toolName: name,
    intro: `The ${name} is a dedicated online calculation utility engineered for fast, accurate ${domain.verb}. Designed with client-side execution, all computations update dynamically as you type without transmitting sensitive data across external servers.`,
    whatItCalculates: `Provides instant calculations for ${name.toLowerCase()} with high-precision outputs, unit flexibility, and clear mathematical formulas.`,
    formula: `Calculations adhere to ${domain.standard} with transparent variable inputs and step-by-step logic.`,
    inputs: [
      { name: 'Primary Parameter', description: `Main quantitative value for ${name.toLowerCase()}.`, unit: domain.units },
      { name: 'Secondary Variable', description: 'Adjustment or baseline factor for the calculation equation.', unit: 'Configurable' },
    ],
    unitsAndConversions: `Supports dual metric and imperial measurement systems with instant bidirectional conversions.`,
    workedExample: {
      scenario: `Standard baseline calculation using typical values for ${name.toLowerCase()}.`,
      stepByStep: [
        'Input standard verified parameters into the interactive calculator fields above.',
        'The mathematical engine processes the formula deterministically in real-time.',
        'View the primary output along with breakdown metrics and graphical visualizations.',
      ],
      result: `Instant, verified result displayed directly in the primary result badge above.`,
    },
    limitations: `Results provide mathematical estimates based on verified formulas. For legal, medical, or contractual engineering applications, review specific site-specific regulations.`,
    faqs: [
      {
        question: `How accurate is the ${name}?`,
        answer: `The ${name} executes precision floating-point arithmetic verified against standard ${domain.standard}. Calculations are processed instantaneously inside your browser.`,
      },
      {
        question: `Is my calculation data saved or transmitted to a server?`,
        answer: `No. Calcyfy operates with strict client-side privacy. None of your numbers, inputs, or outputs are uploaded or saved to remote databases.`,
      },
      {
        question: `Can I export or print my calculation results?`,
        answer: `Yes. Use the built-in Print and Share buttons in the action toolbar to export high-resolution summaries or copy permanent shareable links with your inputs preserved.`,
      },
    ],
    relatedTools,
  };
}
