import * as fs from 'fs';
import * as path from 'path';
import { TOOLS } from '../src/data/tools';

const toolPageContent = fs.readFileSync(path.join(process.cwd(), 'src/components/ToolPage.tsx'), 'utf-8');

// Find all tools in TOOLS array that do NOT currently have an explicit switch case in ToolPage.tsx
const unroutedTools = TOOLS.filter(t => {
  const caseRegex = new RegExp(`case\\s+['"]${t.id}['"]`, 'g');
  return !caseRegex.test(toolPageContent);
});

console.log(`Total Unrouted / Fallback Tools: ${unroutedTools.length}`);

// Group by category
const byCat: Record<string, typeof unroutedTools> = {};
unroutedTools.forEach(t => {
  if (!byCat[t.categoryId]) byCat[t.categoryId] = [];
  byCat[t.categoryId].push(t);
});

Object.keys(byCat).forEach(cat => {
  console.log(`\n--- Category: ${cat.toUpperCase()} (${byCat[cat].length} tools) ---`);
  byCat[cat].slice(0, 15).forEach(t => console.log(`  - ${t.id} (slug: ${t.slug})`));
});
