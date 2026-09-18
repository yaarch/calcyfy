import * as fs from 'fs';
import * as path from 'path';
import { TOOLS } from '../src/data/tools';

const toolPageContent = fs.readFileSync(path.join(process.cwd(), 'src/components/ToolPage.tsx'), 'utf-8');

let specializedCount = 0;
let genericFallbackCount = 0;

TOOLS.forEach(t => {
  const caseRegex = new RegExp(`case\\s+['"]${t.id}['"]`, 'g');
  if (caseRegex.test(toolPageContent)) {
    specializedCount++;
  } else {
    genericFallbackCount++;
  }
});

const total = TOOLS.length;
const contaminationPct = ((genericFallbackCount / total) * 100).toFixed(2);

console.log(`=== GLOBAL BASELINE METRICS AFTER P1 WAVE 2 ===`);
console.log(`Total Tools Inventory:      ${total}`);
console.log(`Fully Specialized Tools:     ${specializedCount}`);
console.log(`Generic Engine / Fallback:   ${genericFallbackCount}`);
console.log(`Contamination Rate:          ${contaminationPct}%\n`);
