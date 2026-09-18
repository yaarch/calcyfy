import { TOOLS } from '../src/data/tools.js';
import { getToolContentDetails } from '../src/utils/toolContentEngine.js';

const langs = ['en', 'ar', 'es', 'fr', 'de'] as const;

console.log('=== 5-LANGUAGE VERIFICATION FOR CAGR & STOCK SPLIT ===\n');

const testTools = [
  { id: 'cagr-calculator', name: 'CAGR' },
  { id: 'stock-split-calculator', name: 'Stock Split' }
];

for (const t of testTools) {
  const tool = TOOLS.find(item => item.id === t.id);
  console.log(`\n================= TOOL: ${t.name} (ID: ${t.id}) =================`);
  if (!tool) {
    console.error('TOOL NOT FOUND:', t.id);
    continue;
  }

  for (const lang of langs) {
    const details = getToolContentDetails(tool, lang);
    console.log(`\n--- [${lang.toUpperCase()}] ---`);
    console.log('Formula:', details.formula);
    console.log('Variables Count:', details.formulaVariables?.length);
    console.log('Variables Names:', details.formulaVariables?.map(v => v.symbol || v.name));
    console.log('Worked Example Scenario:', details.workedExample?.scenario);
    console.log('Worked Example Result:', details.workedExample?.result);
    console.log('FAQs Count:', details.faqs?.length);
  }
}
