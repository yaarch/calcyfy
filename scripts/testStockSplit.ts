import { TOOLS } from '../src/data/tools.js';
import { getToolContentDetails } from '../src/utils/toolContentEngine.js';
import { getDefaultsForTool } from '../src/components/calculators/UniversalToolEngine.js';

const tool = TOOLS.find(t => t.id === 'stock-split-calculator' || t.slug === 'stock-split-shares-price-adjustment');

console.log('Found tool in TOOLS:', tool);

if (tool) {
  const defs = getDefaultsForTool(tool.id);
  console.log('Defaults for tool:', defs);

  for (const lang of ['en', 'ar', 'es', 'fr', 'de'] as const) {
    const details = getToolContentDetails(tool, lang);
    console.log(`\n--- [${lang.toUpperCase()}] Content Details ---`);
    console.log('Overview:', details.overview);
    console.log('Formula:', details.formula);
    console.log('Formula variables:', details.formulaVariables);
    console.log('Worked example:', details.workedExample);
  }
}
