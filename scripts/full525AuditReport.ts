import { TOOLS } from '../src/data/tools.js';
import { getToolContentDetails } from '../src/utils/toolContentEngine.js';
import fs from 'fs';
import path from 'path';

// Standalone tools in ToolPage:
const standaloneTools = new Set([
  'percentage', 'bmi', 'age', 'loan', 'mortgage', 'compound-interest', 'tip', 'discount',
  'unit-converter', 'currency', 'currency-converter-live', 'gold-price-per-gram-ounce',
  'silver-price-per-ounce', 'platinum-metal-price', 'gpa', 'calorie', 'tax', 'salary',
  'scientific', 'date-diff', 'word-count', 'password', 'roi-cagr', 'crypto-profit',
  'time-zone', 'fuel-cost', 'body-fat', 'aspect-ratio', 'carbon-footprint'
]);

// SuiteCalculators explicit cases:
const suiteSource = fs.readFileSync(path.join(process.cwd(), 'src/components/calculators/SuiteCalculators.tsx'), 'utf-8');
const suiteCases = new Set<string>();
for (const match of suiteSource.matchAll(/case\s+'([^']+)':/g)) {
  suiteCases.add(match[1]);
}

// UniversalToolEngine explicit conditions:
const universalSource = fs.readFileSync(path.join(process.cwd(), 'src/components/calculators/UniversalToolEngine.tsx'), 'utf-8');

// Read all upgraded knowledge handler IDs
import { BATCH1_FINANCE_HANDLERS } from '../src/data/calculatorKnowledge/batch1Finance.js';
import { BATCH1_FINANCE2_HANDLERS } from '../src/data/calculatorKnowledge/batch1Finance2.js';
import { BATCH1_HEALTH_HANDLERS } from '../src/data/calculatorKnowledge/batch1Health.js';
import { BATCH1_HEALTH2_HANDLERS } from '../src/data/calculatorKnowledge/batch1Health2.js';
import { BATCH1_MATH_HANDLERS } from '../src/data/calculatorKnowledge/batch1Math.js';
import { BATCH1_MATH2_HANDLERS } from '../src/data/calculatorKnowledge/batch1Math2.js';
import { BATCH1_CONVERTER_HANDLERS } from '../src/data/calculatorKnowledge/batch1Converters.js';
import { BATCH1_EVERYDAY_HANDLERS } from '../src/data/calculatorKnowledge/batch1Everyday.js';
import { BATCH2_DEDICATED_HANDLERS } from '../src/data/calculatorKnowledge/batch2Dedicated.js';
import { BATCH2_DEVTEXT_HANDLERS } from '../src/data/calculatorKnowledge/batch2DeveloperText.js';
import { BATCH2_CONVERTERS_HANDLERS } from '../src/data/calculatorKnowledge/batch2Converters.js';
import { BATCH2_MATH_HEALTH_HANDLERS } from '../src/data/calculatorKnowledge/batch2MathHealth.js';
import { BATCH2_FINANCE_HANDLERS } from '../src/data/calculatorKnowledge/batch2Finance.js';
import { BATCH3_FINANCE_HANDLERS } from '../src/data/calculatorKnowledge/batch3Finance.js';
import { BATCH3_HEALTH_HANDLERS } from '../src/data/calculatorKnowledge/batch3Health.js';
import { BATCH3_HEALTH2_HANDLERS } from '../src/data/calculatorKnowledge/batch3Health2.js';
import { BATCH3_MATH_HANDLERS } from '../src/data/calculatorKnowledge/batch3Math.js';
import { BATCH3_PRACTICAL_HANDLERS } from '../src/data/calculatorKnowledge/batch3Practical.js';

const allUpgradedKnowledge = new Set([
  ...Object.keys(BATCH1_FINANCE_HANDLERS || {}),
  ...Object.keys(BATCH1_FINANCE2_HANDLERS || {}),
  ...Object.keys(BATCH1_HEALTH_HANDLERS || {}),
  ...Object.keys(BATCH1_HEALTH2_HANDLERS || {}),
  ...Object.keys(BATCH1_MATH_HANDLERS || {}),
  ...Object.keys(BATCH1_MATH2_HANDLERS || {}),
  ...Object.keys(BATCH1_CONVERTER_HANDLERS || {}),
  ...Object.keys(BATCH1_EVERYDAY_HANDLERS || {}),
  ...Object.keys(BATCH2_DEDICATED_HANDLERS || {}),
  ...Object.keys(BATCH2_DEVTEXT_HANDLERS || {}),
  ...Object.keys(BATCH2_CONVERTERS_HANDLERS || {}),
  ...Object.keys(BATCH2_MATH_HEALTH_HANDLERS || {}),
  ...Object.keys(BATCH2_FINANCE_HANDLERS || {}),
  ...Object.keys(BATCH3_FINANCE_HANDLERS || {}),
  ...Object.keys(BATCH3_HEALTH_HANDLERS || {}),
  ...Object.keys(BATCH3_HEALTH2_HANDLERS || {}),
  ...Object.keys(BATCH3_MATH_HANDLERS || {}),
  ...Object.keys(BATCH3_PRACTICAL_HANDLERS || {}),
  'mortgage', 'loan', 'compound-interest', 'salary', 'percentage', 'bmi', 'age',
  'calorie', 'tip', 'discount', 'body-fat', 'gpa', 'unit-converter', 'currency',
  'concrete-slab-volume-yardage-calculator', 'rc-low-pass-high-pass-cutoff-frequency',
  'awg-wire-gauge-resistance-ampacity', 'date-diff'
]);

interface ToolAuditResult {
  id: string;
  slug: string;
  category: string;
  hasStandaloneComponent: boolean;
  hasSuiteCase: boolean;
  hasKnowledgeHandler: boolean;
  isGenericContent: boolean;
  classification: 'FULLY SPECIALIZED' | 'GENERIC ENGINE' | 'PARTIALLY SPECIALIZED' | 'CONTENT/IMPLEMENTATION MISMATCH';
}

const auditResults: ToolAuditResult[] = [];

let specializedCount = 0;
let genericCount = 0;
let partialCount = 0;
let mismatchCount = 0;

for (const tool of TOOLS) {
  const id = tool.id.toLowerCase();
  const slug = tool.slug.toLowerCase();

  const hasStandaloneComponent = standaloneTools.has(id);
  const hasSuiteCase = suiteCases.has(id);
  const hasKnowledgeHandler = allUpgradedKnowledge.has(id) || allUpgradedKnowledge.has(slug);

  // Check if content is generic by calling getToolContentDetails
  const content = getToolContentDetails(tool, 'en');
  const isGenericContent = content.whoUsesIt?.includes('Students, professionals, analysts') ||
                           content.inputs?.[0]?.name === 'Primary Parameter' ||
                           content.formula?.includes('established mathematical definitions');

  let classification: 'FULLY SPECIALIZED' | 'GENERIC ENGINE' | 'PARTIALLY SPECIALIZED' | 'CONTENT/IMPLEMENTATION MISMATCH';

  const hasDedicatedUI = hasStandaloneComponent || hasSuiteCase;

  if (hasDedicatedUI && !isGenericContent) {
    classification = 'FULLY SPECIALIZED';
    specializedCount++;
  } else if (!hasDedicatedUI && isGenericContent) {
    classification = 'GENERIC ENGINE';
    genericCount++;
  } else if (hasDedicatedUI && isGenericContent) {
    classification = 'CONTENT/IMPLEMENTATION MISMATCH';
    mismatchCount++;
  } else {
    classification = 'PARTIALLY SPECIALIZED';
    partialCount++;
  }

  auditResults.push({
    id: tool.id,
    slug: tool.slug,
    category: tool.categoryId,
    hasStandaloneComponent,
    hasSuiteCase,
    hasKnowledgeHandler,
    isGenericContent,
    classification,
  });
}

console.log('\n=== COMPLETE 525 CALCULATOR AUDIT SUMMARY ===');
console.log('Total Tools:', TOOLS.length);
console.log('Fully Specialized:', specializedCount);
console.log('Generic Engine:', genericCount);
console.log('Partially Specialized:', partialCount);
console.log('Content / Implementation Mismatch:', mismatchCount);
const contaminationPct = (((genericCount + partialCount + mismatchCount) / TOOLS.length) * 100).toFixed(2);
console.log(`Generic Engine Contamination: ${contaminationPct}%`);

// Output categories of Generic / Partial
const genericByCategory: Record<string, number> = {};
const partialByCategory: Record<string, number> = {};
for (const r of auditResults) {
  if (r.classification === 'GENERIC ENGINE') {
    genericByCategory[r.category] = (genericByCategory[r.category] || 0) + 1;
  } else if (r.classification === 'PARTIALLY SPECIALIZED') {
    partialByCategory[r.category] = (partialByCategory[r.category] || 0) + 1;
  }
}

console.log('\nGeneric Engine Count by Category:', genericByCategory);
console.log('Partially Specialized Count by Category:', partialByCategory);
