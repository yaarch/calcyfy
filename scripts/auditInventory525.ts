import { TOOLS } from '../src/data/tools.js';
import fs from 'fs';
import path from 'path';

// Load UniversalToolEngine to extract getToolConfig logic
// Or we can import or simulate the exact resolution logic that ToolPage + SuiteCalculators + UniversalToolEngine use.

// Let's create an evaluation harness that simulates the exact component tree.
// Standalone components in ToolPage:
const standaloneSet = new Set([
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

// Let's inspect UniversalToolEngine getToolConfig:
const universalSource = fs.readFileSync(path.join(process.cwd(), 'src/components/calculators/UniversalToolEngine.tsx'), 'utf-8');

// Let's extract all condition blocks in UniversalToolEngine getToolConfig
// A tool hits UniversalToolEngine if it is not in standaloneSet and not in suiteCases (or if suiteCases delegates to UniversalToolEngine)
// Let's write a small runtime simulator for getToolConfig from UniversalToolEngine

console.log('Standalone components count:', standaloneSet.size);
console.log('SuiteCalculators cases count:', suiteCases.size);
