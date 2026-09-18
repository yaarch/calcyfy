import { TOOLS } from '../src/data/tools.js';
import fs from 'fs';
import path from 'path';

// Read existing audit inventory
const auditJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'scripts/525_TOOL_INVENTORY_AUDIT.json'), 'utf-8'));

// Filter for the 387 non-fully-specialized tools
const nonSpecialized = auditJson.filter((row: any) => row.classification !== 'FULLY SPECIALIZED');

console.log(`Found ${nonSpecialized.length} non-fully-specialized tools.`);

// Engine family classification logic
function determineEngineFamily(tool: any) {
  const id = tool.toolId.toLowerCase();
  const cat = tool.category.toLowerCase();

  // Developer & Text tools
  if (cat === 'developer') {
    if (id.includes('json') || id.includes('yaml') || id.includes('xml') || id.includes('csv')) return 'Developer — Code & Data Formatters';
    if (id.includes('base64') || id.includes('hash') || id.includes('md5') || id.includes('sha') || id.includes('jwt') || id.includes('encode') || id.includes('decode') || id.includes('escape') || id.includes('url')) return 'Developer — Encoders, Hashes & Cryptography';
    if (id.includes('regex') || id.includes('uuid') || id.includes('cron') || id.includes('chmod') || id.includes('subnet') || id.includes('ip') || id.includes('cidr') || id.includes('color') || id.includes('css')) return 'Developer — Web, Network & Code Utilities';
    if (id.includes('binary') || id.includes('hex') || id.includes('octal') || id.includes('ascii') || id.includes('base')) return 'Developer — Radix & Number Systems';
    return 'Developer — Utilities';
  }

  if (cat === 'text') {
    return 'Text — Word, String & Analysis Engine';
  }

  // Converters
  if (cat === 'converters') {
    if (id.includes('length') || id.includes('distance') || id.includes('meter') || id.includes('feet') || id.includes('inch') || id.includes('mile')) return 'Converters — Length & Distance';
    if (id.includes('weight') || id.includes('mass') || id.includes('kg') || id.includes('pound') || id.includes('gram') || id.includes('ounce')) return 'Converters — Mass & Weight';
    if (id.includes('volume') || id.includes('liquid') || id.includes('liter') || id.includes('gallon') || id.includes('cup')) return 'Converters — Volume & Capacity';
    if (id.includes('area') || id.includes('sq') || id.includes('acre') || id.includes('hectare')) return 'Converters — Area';
    if (id.includes('temp') || id.includes('celsius') || id.includes('fahrenheit') || id.includes('kelvin')) return 'Converters — Temperature';
    if (id.includes('speed') || id.includes('velocity') || id.includes('mph') || id.includes('kph') || id.includes('knot')) return 'Converters — Speed & Acceleration';
    if (id.includes('pressure') || id.includes('psi') || id.includes('bar') || id.includes('pascal')) return 'Converters — Pressure';
    if (id.includes('energy') || id.includes('power') || id.includes('joule') || id.includes('watt') || id.includes('btu') || id.includes('kwh')) return 'Converters — Energy & Power';
    if (id.includes('data') || id.includes('byte') || id.includes('bit') || id.includes('mb') || id.includes('gb') || id.includes('bandwidth')) return 'Converters — Digital Data & Storage';
    return 'Converters — General Units Engine';
  }

  if (cat === 'currency') {
    return 'Finance — Currency & Precious Metals';
  }

  // Date & Time
  if (cat === 'date') {
    if (id.includes('age') || id.includes('birthday') || id.includes('chronological')) return 'Date & Time — Age & Chronology';
    if (id.includes('time') || id.includes('duration') || id.includes('hours') || id.includes('minutes') || id.includes('seconds') || id.includes('work') || id.includes('timesheet')) return 'Date & Time — Duration & Time Tracking';
    if (id.includes('zone') || id.includes('utc') || id.includes('gmt') || id.includes('offset')) return 'Date & Time — Timezones & World Clock';
    if (id.includes('countdown') || id.includes('calendar') || id.includes('date') || id.includes('easter') || id.includes('leap')) return 'Date & Time — Calendar & Event Interval';
    return 'Date & Time — Chrono Engine';
  }

  // Health
  if (cat === 'health') {
    if (id.includes('calorie') || id.includes('tdee') || id.includes('bmr') || id.includes('energy') || id.includes('metabolic') || id.includes('expenditure')) return 'Health — Metabolism, Calories & TDEE';
    if (id.includes('macro') || id.includes('carb') || id.includes('protein') || id.includes('fat') || id.includes('keto') || id.includes('diet') || id.includes('nutrition')) return 'Health — Macronutrients & Diet Nutrition';
    if (id.includes('bmi') || id.includes('body-fat') || id.includes('weight') || id.includes('lean') || id.includes('frame') || id.includes('ideal-weight') || id.includes('waist')) return 'Health — Anthropometry & Body Composition';
    if (id.includes('pace') || id.includes('running') || id.includes('1rm') || id.includes('strength') || id.includes('bench') || id.includes('heart') || id.includes('target-hr') || id.includes('vo2') || id.includes('wilks') || id.includes('swolf') || id.includes('step')) return 'Health — Fitness, Exercise & Cardiovascular';
    if (id.includes('sleep') || id.includes('caffeine') || id.includes('water') || id.includes('hydration') || id.includes('fasting') || id.includes('period') || id.includes('ovulation') || id.includes('pregnancy') || id.includes('blood') || id.includes('alcohol') || id.includes('pack-year')) return 'Health — Physiology & Wellness Indicators';
    return 'Health — Medical & Physiology Engine';
  }

  // Finance
  if (cat === 'finance') {
    if (id.includes('loan') || id.includes('mortgage') || id.includes('amortization') || id.includes('auto-loan') || id.includes('interest') || id.includes('refinance') || id.includes('apr')) return 'Finance — Debt, Loans & Amortization';
    if (id.includes('cagr') || id.includes('roi') || id.includes('investment') || id.includes('dividend') || id.includes('stock') || id.includes('compound') || id.includes('annuity') || id.includes('yield') || id.includes('cap-rate') || id.includes('dscr') || id.includes('wacc') || id.includes('npv') || id.includes('irr') || id.includes('fcf')) return 'Finance — Investment Valuation & Capital Markets';
    if (id.includes('retire') || id.includes('401k') || id.includes('pension') || id.includes('social-security') || id.includes('fire') || id.includes('savings') || id.includes('college')) return 'Finance — Retirement, Wealth & Financial Planning';
    if (id.includes('salary') || id.includes('tax') || id.includes('paycheck') || id.includes('hourly') || id.includes('overtime') || id.includes('bonus') || id.includes('freelance') || id.includes('vat') || id.includes('sales-tax') || id.includes('capital-gain')) return 'Finance — Compensation, Payroll & Taxation';
    if (id.includes('depreciation') || id.includes('inflation') || id.includes('discount') || id.includes('markup') || id.includes('margin') || id.includes('break-even') || id.includes('commission') || id.includes('mrr') || id.includes('ebitda')) return 'Finance — Commercial & Business Accounting';
    return 'Finance — Core Financial Engine';
  }

  // Math
  if (cat === 'math') {
    if (id.includes('percent') || id.includes('fraction') || id.includes('ratio') || id.includes('proportion') || id.includes('modulo') || id.includes('gcd') || id.includes('lcm') || id.includes('prime') || id.includes('factor')) return 'Mathematics — Arithmetic, Number Theory & Fractions';
    if (id.includes('algebra') || id.includes('quadratic') || id.includes('linear') || id.includes('equation') || id.includes('polynomial') || id.includes('log') || id.includes('exponent')) return 'Mathematics — Algebra & Equation Solvers';
    if (id.includes('geometry') || id.includes('circle') || id.includes('triangle') || id.includes('pythagorean') || id.includes('area') || id.includes('perimeter') || id.includes('volume') || id.includes('cylinder') || id.includes('sphere') || id.includes('cone') || id.includes('slope') || id.includes('angle') || id.includes('trig') || id.includes('sine') || id.includes('cosine')) return 'Mathematics — Geometry & Trigonometry';
    if (id.includes('stat') || id.includes('mean') || id.includes('median') || id.includes('mode') || id.includes('deviation') || id.includes('variance') || id.includes('z-score') || id.includes('percentile') || id.includes('probability') || id.includes('combinatorics') || id.includes('ncr') || id.includes('npr') || id.includes('permutation')) return 'Mathematics — Statistics & Probability';
    if (id.includes('matrix') || id.includes('vector') || id.includes('series') || id.includes('sequence') || id.includes('arithmetic-series') || id.includes('geometric-series') || id.includes('complex') || id.includes('binary') || id.includes('hex')) return 'Mathematics — Advanced Linear & Discrete Math';
    return 'Mathematics — Pure Math Engine';
  }

  // Everyday
  if (cat === 'everyday') {
    if (id.includes('paint') || id.includes('tile') || id.includes('floor') || id.includes('wallpaper') || id.includes('mulch') || id.includes('concrete') || id.includes('roof') || id.includes('stair') || id.includes('btu') || id.includes('solar') || id.includes('lumber') || id.includes('drywall') || id.includes('gravel') || id.includes('asphalt') || id.includes('insulation') || id.includes('wire') || id.includes('filter') || id.includes('resistor') || id.includes('ohm')) return 'Everyday — Home Improvement & Engineering Trade';
    if (id.includes('fuel') || id.includes('mileage') || id.includes('trip') || id.includes('car') || id.includes('ev') || id.includes('mpg') || id.includes('charging') || id.includes('speed') || id.includes('drive')) return 'Everyday — Automotive & Transport';
    if (id.includes('cooking') || id.includes('recipe') || id.includes('baking') || id.includes('pizza') || id.includes('coffee') || id.includes('brew') || id.includes('alcohol') || id.includes('turkey') || id.includes('meat') || id.includes('yeast') || id.includes('sourdough')) return 'Everyday — Culinary & Kitchen Ratios';
    if (id.includes('tip') || id.includes('bill') || id.includes('split') || id.includes('discount') || id.includes('shopping') || id.includes('unit-price') || id.includes('dog') || id.includes('cat') || id.includes('pet') || id.includes('plant') || id.includes('aquarium') || id.includes('pool') || id.includes('lawn') || id.includes('carbon') || id.includes('water-footprint')) return 'Everyday — Lifestyle, Pets, Shopping & Household';
    return 'Everyday — Practical Utilities Engine';
  }

  return 'General Utility Engine';
}

function determinePriority(tool: any, engineFamily: string) {
  const cat = tool.category.toLowerCase();
  const id = tool.toolId.toLowerCase();

  // P0 - Critical: Health, Clinical/Physiology, Core Financial, Engineering Load/Safety
  if (cat === 'health') return { priority: 'P0', risk: 'High (Medical/Physiology calculation accuracy)' };
  if (cat === 'finance' && (id.includes('loan') || id.includes('mortgage') || id.includes('tax') || id.includes('interest') || id.includes('retire') || id.includes('401k') || id.includes('cagr') || id.includes('roi') || id.includes('val') || id.includes('cap') || id.includes('dscr') || id.includes('fcf'))) {
    return { priority: 'P0', risk: 'High (Financial valuation and fiscal planning accuracy)' };
  }
  if (cat === 'everyday' && (id.includes('concrete') || id.includes('stair') || id.includes('roof') || id.includes('solar') || id.includes('wire') || id.includes('btu'))) {
    return { priority: 'P0', risk: 'High (Structural and electrical safety specs)' };
  }

  // P1 - High: Math solvers, Core Converters, Developers
  if (cat === 'math') return { priority: 'P1', risk: 'Medium (Educational / STEM mathematical rigor)' };
  if (cat === 'converters') return { priority: 'P1', risk: 'Medium (Unit precision & conversion factors)' };
  if (cat === 'finance') return { priority: 'P1', risk: 'Medium (Commercial & business calculations)' };
  if (cat === 'developer') return { priority: 'P1', risk: 'Medium (Data formatting, hashes, encodings)' };

  // P2 - Medium: Date, Everyday lifestyle, Text
  if (cat === 'date') return { priority: 'P2', risk: 'Low-Medium (Calendar arithmetic & timezone accuracy)' };
  if (cat === 'everyday') return { priority: 'P2', risk: 'Low-Medium (Domestic recipes, household estimates)' };
  if (cat === 'text') return { priority: 'P2', risk: 'Low (String transformations & character counts)' };

  return { priority: 'P3', risk: 'Low (General minor utility)' };
}

const remediationMatrix = nonSpecialized.map((tool: any) => {
  const engineFamily = determineEngineFamily(tool);
  const { priority, risk } = determinePriority(tool, engineFamily);

  let proposedEngine = '';
  let sharedPattern = '';

  if (engineFamily.startsWith('Finance')) {
    proposedEngine = 'FinanceDomainEngine';
    sharedPattern = 'Parameterized Financial Flow (Present/Future Value, Rates, Periods, Yields)';
  } else if (engineFamily.startsWith('Health')) {
    proposedEngine = 'HealthDomainEngine';
    sharedPattern = 'Anthropometric & Metabolic Flow (Biometrics, Target Splits, Coefficients)';
  } else if (engineFamily.startsWith('Mathematics')) {
    proposedEngine = 'MathDomainEngine';
    sharedPattern = 'Analytical Math Flow (Symbolic/Numeric Operands, Precision Formats)';
  } else if (engineFamily.startsWith('Converters')) {
    proposedEngine = 'UnitConverterDomainEngine';
    sharedPattern = 'Bidirectional Unit Scale (Source, Target, Scale Factor, Offset)';
  } else if (engineFamily.startsWith('Developer')) {
    proposedEngine = 'DeveloperDomainEngine';
    sharedPattern = 'String/Buffer/Radix Pipeline (Input Text/Code, Encoder/Parser, Structured Output)';
  } else if (engineFamily.startsWith('Date')) {
    proposedEngine = 'ChronoDomainEngine';
    sharedPattern = 'Temporal Arithmetic Pipeline (Timestamps, Durations, Calendrical Offsets)';
  } else if (engineFamily.startsWith('Text')) {
    proposedEngine = 'TextAnalysisDomainEngine';
    sharedPattern = 'Live Text Metrics Pipeline (Word/Char Counts, Density, Case Transforms)';
  } else {
    proposedEngine = 'EverydayPracticalEngine';
    sharedPattern = 'Dimensional Trade Ratios (Dimensions, Quantities, Waste Factors, Rates)';
  }

  return {
    toolId: tool.toolId,
    name: tool.name,
    category: tool.category,
    currentClassification: tool.classification,
    currentComponent: tool.actualComponent,
    genericDependency: tool.genericUiPresent ? 'UniversalToolEngine Generic Multiplier Fallback' : 'Partial / Mismatched Layout',
    proposedEngine,
    sharedPattern,
    priority,
    risk
  };
});

// Group by priority
const p0 = remediationMatrix.filter((m: any) => m.priority === 'P0');
const p1 = remediationMatrix.filter((m: any) => m.priority === 'P1');
const p2 = remediationMatrix.filter((m: any) => m.priority === 'P2');
const p3 = remediationMatrix.filter((m: any) => m.priority === 'P3');

console.log('Priority breakdown:');
console.log('P0 (Critical):', p0.length);
console.log('P1 (High):', p1.length);
console.log('P2 (Medium):', p2.length);
console.log('P3 (Low):', p3.length);

// Group by Proposed Engine
const engineCounts: Record<string, number> = {};
for (const m of remediationMatrix) {
  engineCounts[m.proposedEngine] = (engineCounts[m.proposedEngine] || 0) + 1;
}
console.log('Engine Family breakdown:', engineCounts);

// Save JSON and Markdown matrix files
fs.writeFileSync(path.join(process.cwd(), 'scripts/387_REMEDIATION_MATRIX.json'), JSON.stringify(remediationMatrix, null, 2), 'utf-8');

let md = '# COMPLETE 387-TOOL REMEDIATION MATRIX\n\n';
md += '| Tool ID | Name | Category | Current Classification | Current Component | Generic Dependency | Proposed Engine | Shared Pattern | Priority | Risk |\n';
md += '| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |\n';

for (const r of remediationMatrix) {
  md += `| \`${r.toolId}\` | ${r.name} | ${r.category} | **${r.currentClassification}** | ${r.currentComponent} | ${r.genericDependency} | **${r.proposedEngine}** | ${r.sharedPattern} | **${r.priority}** | ${r.risk} |\n`;
}

fs.writeFileSync(path.join(process.cwd(), 'scripts/387_REMEDIATION_MATRIX.md'), md, 'utf-8');
console.log('Saved 387_REMEDIATION_MATRIX.json and 387_REMEDIATION_MATRIX.md successfully.');
