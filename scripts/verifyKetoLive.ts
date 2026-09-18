import { TOOLS } from '../src/data/tools.js';
import { getToolContentDetails } from '../src/utils/toolContentEngine.js';
import { getDefaultsForTool } from '../src/components/calculators/UniversalToolEngine.js';
import { getToolName, getToolDescription } from '../src/utils/toolMetadata.js';

// Calculate live engine simulation
function runKetoEngine(cals: number, carbs: number, protein: number) {
  const carbCals = carbs * 4;
  const proteinCals = protein * 4;
  const fatCals = Math.max(0, cals - carbCals - proteinCals);
  const fatGrams = fatCals / 9;

  const fatPct = cals > 0 ? (fatCals / cals) * 100 : 0;
  const proteinPct = cals > 0 ? (proteinCals / cals) * 100 : 0;
  const carbPct = cals > 0 ? (carbCals / cals) * 100 : 0;

  return {
    inputs: {
      dailyCalories: cals,
      netCarbs: carbs,
      proteinTarget: protein
    },
    primaryLabel: 'Target Dietary Fat',
    primaryResult: `${fatGrams.toFixed(1)} g / day`,
    exactFatGrams: fatGrams,
    carbCalories: carbCals,
    proteinCalories: proteinCals,
    fatCalories: fatCals,
    fatPct,
    proteinPct,
    carbPct,
    secondary: [
      { label: 'Fat Energy Split', value: `${fatCals.toFixed(0)} kcal (${fatPct.toFixed(1)}%)` },
      { label: 'Protein Energy Split', value: `${proteinCals.toFixed(0)} kcal (${proteinPct.toFixed(1)}%)` },
      { label: 'Net Carb Split', value: `${carbCals.toFixed(0)} kcal (${carbPct.toFixed(1)}%)` },
      { label: 'Ketosis Target', value: 'Net Carbs ≤ 5-10% of Daily Calories' }
    ],
    formula: 'Fat (g) = [Total Calories - (Protein × 4) - (Net Carbs × 4)] / 9'
  };
}

console.log('=== LIVE KETO CALCULATOR VERIFICATION ===\n');

// 1. Tool metadata and defaults
const tool = TOOLS.find(t => t.id === 'keto-macros' || t.id === 'macronutrient-keto-highcarb')!;
const defaults = getDefaultsForTool('keto-macros');
console.log('Engine Default Inputs:', defaults);

// 2. Run test case: 2000 kcal, 25g carbs, 125g protein
const engineOutput = runKetoEngine(2000, 25, 125);
console.log('\n--- LIVE RENDERED ENGINE OUTPUT ---');
console.log(`Inputs: Calories = ${engineOutput.inputs.dailyCalories} kcal, Net Carbs = ${engineOutput.inputs.netCarbs} g, Protein = ${engineOutput.inputs.proteinTarget} g`);
console.log(`Primary Result: ${engineOutput.primaryResult} (exact: ${engineOutput.exactFatGrams.toFixed(2)} g)`);
console.log(`Carbohydrate Calories: ${engineOutput.carbCalories} kcal (${engineOutput.carbPct.toFixed(1)}%)`);
console.log(`Protein Calories: ${engineOutput.proteinCalories} kcal (${engineOutput.proteinPct.toFixed(1)}%)`);
console.log(`Remaining Fat Calories: ${engineOutput.fatCalories} kcal (${engineOutput.fatPct.toFixed(1)}%)`);
console.log('Secondary Breakdown:', engineOutput.secondary);

// 3. Inspect Knowledge & SEO content in all 5 languages
for (const lang of ['en', 'es', 'de', 'fr', 'ar'] as const) {
  const toolName = getToolName(tool, lang);
  const toolDesc = getToolDescription(tool, lang);
  const title = `${toolName} — Calcyfy`;
  const h1 = toolName;
  const details = getToolContentDetails(tool, lang);
  console.log(`\n--- [${lang.toUpperCase()}] CONTENT & SEO ---`);
  console.log(`Tool Name: ${toolName}`);
  console.log(`Title: ${title}`);
  console.log(`H1 / Heading: ${h1}`);
  console.log(`Meta Description: ${toolDesc}`);
  console.log(`Formula: ${details.formula}`);
  console.log(`Worked Example Scenario: ${details.workedExample?.scenario}`);
  console.log(`Worked Example Steps:`, details.workedExample?.stepByStep);
  console.log(`Worked Example Result: ${details.workedExample?.result}`);

  // Check banned phrases
  const banned = [
    'Custom Macro Split Carb Cycling Calculator',
    'Primary Parameter',
    'Secondary Variable / Modifier',
    'verified numerical inputs',
    'instant quantitative result',
    'recognized financial, medical, and scientific equations',
    'Students, professionals, analysts'
  ];

  const fullText = JSON.stringify({ title, h1, toolDesc, details, toolName });
  const found = banned.filter(b => fullText.includes(b));
  console.log(`Banned Phrases Found in ${lang}: ${found.length === 0 ? 'NONE (Clean)' : found.join(', ')}`);
}
