import * as fs from 'fs';
import * as path from 'path';
import { TOOLS } from '../src/data/tools';

const toolPageContent = fs.readFileSync(path.join(process.cwd(), 'src/components/ToolPage.tsx'), 'utf-8');

// Match all case '...': statements
const caseMatches = toolPageContent.match(/case\s+['"]([^'"]+)['"]:/g) || [];
const routedIds = new Set(caseMatches.map(m => m.replace(/case\s+['"]([^'"]+)['"]:/, '$1')));

console.log(`=== ROUTER SWITCH CASE ANALYZER ===`);
console.log(`Total Unique Routed Tool IDs in ToolPage.tsx: ${routedIds.size}`);

const totalTools = TOOLS.length;
const unroutedCount = totalTools - routedIds.size;
const contaminationRate = ((unroutedCount / totalTools) * 100).toFixed(2);

console.log(`Total Tools in Data Inventory: ${totalTools}`);
console.log(`Routed / Specialized Tools:   ${routedIds.size}`);
console.log(`Unrouted / Universal Fallback: ${unroutedCount}`);
console.log(`Contamination Rate:            ${contaminationRate}%`);
