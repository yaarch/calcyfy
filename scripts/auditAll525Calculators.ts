import { TOOLS } from '../src/data/tools.js';
import { getDefaultsForTool } from '../src/components/calculators/UniversalToolEngine.js';

// We can also extract which tools have cases in SuiteCalculators, or dedicated components in ToolPage, or handled in UniversalToolEngine.
// Let's analyze how UniversalToolEngine behaves for each tool.

// Let's read UniversalToolEngine.tsx source to find which toolIds are specifically matched.
import fs from 'fs';
import path from 'path';

const universalSource = fs.readFileSync(path.join(process.cwd(), 'src/components/calculators/UniversalToolEngine.tsx'), 'utf-8');
const suiteSource = fs.readFileSync(path.join(process.cwd(), 'src/components/calculators/SuiteCalculators.tsx'), 'utf-8');
const toolPageSource = fs.readFileSync(path.join(process.cwd(), 'src/components/ToolPage.tsx'), 'utf-8');

// Find all tool IDs handled in ToolPage standalone components
const standaloneTools = new Set<string>();
const toolPageMatches = toolPageSource.matchAll(/case\s+'([^']+)':\s*\n\s*return\s+<([A-Z][A-Za-z0-9]+)/g);
for (const m of toolPageMatches) {
  if (m[2] !== 'SuiteCalculators') {
    standaloneTools.add(m[1]);
  }
}

// Find all tool IDs handled in SuiteCalculators
const suiteTools = new Set<string>();
const suiteMatches = suiteSource.matchAll(/case\s+'([^']+)':/g);
for (const m of suiteMatches) {
  suiteTools.add(m[1]);
}

console.log('Standalone tools in ToolPage:', standaloneTools.size, Array.from(standaloneTools));
console.log('SuiteCalculators handled tools:', suiteTools.size, Array.from(suiteTools));

// Now let's check UniversalToolEngine
// UniversalToolEngine matches toolId or tool.slug
// Let's see which tools hit the generic fallback:
// The generic fallback has fields: "Base Value / Amount", "Factor / Rate (%)", "Secondary Multiplier"
// and formula: "Result = Base Value × (1 + Rate / 100)"

// Let's write a simulator or regex extractor for UniversalToolEngine
