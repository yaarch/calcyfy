import { TOOLS } from '../src/data/tools.js';
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

// UniversalToolEngine source analysis:
const universalSource = fs.readFileSync(path.join(process.cwd(), 'src/components/calculators/UniversalToolEngine.tsx'), 'utf-8');

// Let's find all `if (id === ...)` or `if (id.includes(...)` or `if (cat === ...)` in UniversalToolEngine getToolConfig
console.log(`Auditing 525 tools across the platform...`);
