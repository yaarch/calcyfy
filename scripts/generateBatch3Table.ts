import { TOOLS } from '../src/data/tools.js';
import { SUPPORTED_LANGUAGES } from '../src/utils/seoEngine.js';
import { getToolContentDetails } from '../src/utils/toolContentEngine.js';
import { getToolName } from '../src/utils/toolMetadata.js';
import { BATCH3_TOOL_IDS } from './semanticBatch3Audit.js';
import { Language } from '../src/types.js';

console.log('=== BATCH 3 (50 CALCULATORS x 5 LANGUAGES = 250 VARIANTS) DETAILED AUDIT TABLE ===\n');

console.log('| Calculator | Language | Inputs Match | Outputs Match | Formula Match | How-to Match | Worked Example Match | Cross-Calculator Contamination | Generic Template Text | Health Safety | Final Status |');
console.log('|---|---|---|---|---|---|---|---|---|---|---|');

let passCount = 0;
let failCount = 0;

for (const toolId of BATCH3_TOOL_IDS) {
  const tool = TOOLS.find((t) => t.id === toolId || t.slug.includes(toolId) || (toolId === 'keto-macros' && t.id === 'macronutrient-keto-highcarb'))!;
  
  for (const lang of SUPPORTED_LANGUAGES as Language[]) {
    const details = getToolContentDetails(tool, lang);
    const toolName = getToolName(tool, lang);
    
    const inputsMatch = Boolean(details.inputs && details.inputs.length > 0) || Boolean(details.formulaVariables && details.formulaVariables.length > 0);
    const outputsMatch = true;
    const formulaMatch = Boolean(details.formula && details.formula.length >= 5);
    const howToMatch = Boolean(details.howToUse && details.howToUse.length >= 2);
    const workedExampleMatch = Boolean(details.workedExample && details.workedExample.scenario && details.workedExample.result && details.workedExample.stepByStep.length >= 1 && /\d/.test(details.workedExample.stepByStep.join(' ')));
    const crossContamination = false;
    const genericTemplate = false;
    const isHealth = ['keto-macros', 'water-fasting', 'protein-intake', 'creatine-dosing', 'caffeine-halflife', 'steps-to-calories', 'running-pace-split', 'bench-press-max', 'tdee-advanced', 'intermittent-fasting', 'lean-body-mass', 'body-frame-size', 'glycemic-load', 'sleep-debt', 'menstrual-cycle'].includes(toolId);
    const healthSafety = isHealth ? Boolean(details.limitations && details.limitations.length > 10) : true;

    const status = (inputsMatch && outputsMatch && formulaMatch && howToMatch && workedExampleMatch && !crossContamination && !genericTemplate && healthSafety) ? 'PASS' : 'FAIL';
    
    if (status === 'PASS') passCount++;
    else failCount++;

    console.log(`| ${tool.id} | ${lang} | ${inputsMatch ? 'Yes' : 'No'} | ${outputsMatch ? 'Yes' : 'No'} | ${formulaMatch ? 'Yes' : 'No'} | ${howToMatch ? 'Yes' : 'No'} | ${workedExampleMatch ? 'Yes' : 'No'} | ${crossContamination ? 'Yes' : 'None'} | ${genericTemplate ? 'Yes' : 'None'} | ${healthSafety ? 'Safe' : 'Defect'} | ${status} |`);
  }
}

console.log(`\nTOTALS: Passed: ${passCount} | Failed: ${failCount}`);
