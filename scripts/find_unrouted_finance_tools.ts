import * as fs from 'fs';
import * as path from 'path';
import { TOOLS } from '../src/data/tools';

const toolPageContent = fs.readFileSync(path.join(process.cwd(), 'src/components/ToolPage.tsx'), 'utf-8');

// Find all tools in TOOLS array where categoryId is 'finance' or 'currency' or related to financial investments
const unroutedFinanceTools = TOOLS.filter(t => {
  const caseRegex = new RegExp(`case\\s+['"]${t.id}['"]`, 'g');
  const isRouted = caseRegex.test(toolPageContent);
  return !isRouted && (t.categoryId === 'finance' || t.categoryId === 'currency' || t.id.includes('wacc') || t.id.includes('roi') || t.id.includes('stock') || t.id.includes('dividend') || t.id.includes('bond') || t.id.includes('capm') || t.id.includes('npv') || t.id.includes('irr') || t.id.includes('ebitda') || t.id.includes('dcf') || t.id.includes('yield') || t.id.includes('capital'));
});

console.log(`Total Unrouted Finance & Investment Tools: ${unroutedFinanceTools.length}`);

unroutedFinanceTools.forEach((t, i) => {
  console.log(`${i + 1}. ID: ${t.id} | Slug: ${t.slug} | Category: ${t.categoryId}`);
});
