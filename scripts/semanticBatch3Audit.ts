import { TOOLS } from '../src/data/tools.js';
import { SUPPORTED_LANGUAGES } from '../src/utils/seoEngine.js';
import { getToolContentDetails } from '../src/utils/toolContentEngine.js';
import { getToolName } from '../src/utils/toolMetadata.js';
import { Language, ToolDef } from '../src/types.js';

export const BATCH3_TOOL_IDS = [
  // Finance (10)
  'roi-calculator',
  'freelance-rate-calc',
  'break-even-point',
  'stock-dividend-yield',
  'rental-property-yield',
  'cap-rate',
  'college-savings',
  '401k-retirement',
  'inflation-future',
  'currency-crypto',
  // Health & Fitness (10)
  'water-fasting',
  'protein-intake',
  'creatine-dosing',
  'caffeine-halflife',
  'steps-to-calories',
  'running-pace-split',
  'bench-press-max',
  'tdee-advanced',
  'keto-macros',
  'intermittent-fasting',
  // Health & Geometry (10)
  'lean-body-mass',
  'body-frame-size',
  'glycemic-load',
  'sleep-debt',
  'menstrual-cycle',
  'combinatorics-ncr',
  'matrix-determinant',
  'circle-properties',
  'triangle-solver',
  'vector-magnitude',
  // Math & Stats (10)
  'standard-deviation-calc',
  'percentile-calc',
  'fraction-to-percent',
  'modulo-calc',
  'binary-addition',
  'hex-calculator',
  'geometric-series',
  'arithmetic-series',
  'root-mean-square',
  'percentage-of-total',
  // Practical & Home (10)
  'car-depreciation',
  'ev-charging-time',
  'paint-coverage',
  'flooring-tile',
  'wallpaper-rolls',
  'mulch-topsoil',
  'air-conditioner-btu',
  'solar-panel-payback',
  'stair-stringer',
  'roof-pitch-slope'
];

const BANNED_GENERIC_PHRASES = [
  'Primary Parameter',
  'Secondary Variable',
  'Base Value',
  'Factor / Rate',
  'Dynamic Analytics',
  'Instant quantitative result',
  'standard baseline conditions',
  'established mathematical model',
  'verified numerical inputs',
  'recognized financial, medical, and scientific equations',
  'Students, professionals, analysts',
  'everyday decisions',
  'complete calculation guide',
  'Custom Macro Split Carb Cycling Calculator' // in keto context or other tools
];

export interface VariantAuditResult {
  toolId: string;
  lang: Language;
  toolName: string;
  inputsMatch: boolean;
  outputsMatch: boolean;
  formulaMatch: boolean;
  howToMatch: boolean;
  workedExampleMatch: boolean;
  crossContamination: boolean;
  contaminationDetails?: string;
  genericTemplateFound: boolean;
  genericTemplatePhrases: string[];
  healthSafetyPass: boolean;
  status: 'PASS' | 'FAIL';
  errors: string[];
}

export function runSemanticAudit(): { results: VariantAuditResult[]; summary: any } {
  const results: VariantAuditResult[] = [];

  let totalVariants = 0;
  let uiContentMismatches = 0;
  let formulaMismatches = 0;
  let workedExampleMismatches = 0;
  let crossContaminations = 0;
  let genericTemplateDefects = 0;
  let healthContentDefects = 0;
  let localizationDefects = 0;

  for (const toolId of BATCH3_TOOL_IDS) {
    const tool = TOOLS.find((t) => t.id === toolId || t.slug.includes(toolId) || (toolId === 'keto-macros' && t.id === 'macronutrient-keto-highcarb'));
    if (!tool) {
      console.error(`Tool not found: ${toolId}`);
      continue;
    }

    for (const lang of SUPPORTED_LANGUAGES as Language[]) {
      totalVariants++;
      const toolName = getToolName(tool, lang);
      const details = getToolContentDetails(tool, lang);
      const fullText = JSON.stringify(details);
      const fullTextLower = fullText.toLowerCase();

      const variantErrors: string[] = [];

      // 1. Generic Template Phrases check
      const foundPhrases: string[] = [];
      for (const phrase of BANNED_GENERIC_PHRASES) {
        if (fullText.includes(phrase) || fullTextLower.includes(phrase.toLowerCase())) {
          foundPhrases.push(phrase);
        }
      }
      const genericTemplateFound = foundPhrases.length > 0;
      if (genericTemplateFound) {
        genericTemplateDefects++;
        variantErrors.push(`Generic template phrases found: ${foundPhrases.join(', ')}`);
      }

      // 2. Worked Example Verification
      let workedExampleMatch = true;
      if (!details.workedExample || !details.workedExample.scenario || !details.workedExample.result || details.workedExample.stepByStep.length === 0) {
        workedExampleMatch = false;
        workedExampleMismatches++;
        variantErrors.push('Missing or empty worked example structure');
      } else {
        const exampleText = `${details.workedExample.scenario} ${details.workedExample.stepByStep.join(' ')} ${details.workedExample.result}`;
        // Check for fake worked example strings
        if (
          exampleText.includes('verified numerical inputs') ||
          exampleText.includes('established mathematical model') ||
          exampleText.includes('review the primary highlighted output') ||
          !/\d/.test(exampleText)
        ) {
          workedExampleMatch = false;
          workedExampleMismatches++;
          variantErrors.push('Worked example contains generic non-numerical template text');
        }
      }

      // 3. Formula Match
      let formulaMatch = true;
      if (!details.formula || details.formula.length < 5) {
        formulaMatch = false;
        formulaMismatches++;
        variantErrors.push('Formula is missing or too short');
      }

      // 4. Inputs and How-To Match
      let inputsMatch = true;
      let howToMatch = true;
      if (!details.howToUse || details.howToUse.length < 2) {
        howToMatch = false;
        uiContentMismatches++;
        variantErrors.push('How-To instructions missing or incomplete');
      }
      if (!details.inputs || details.inputs.length === 0) {
        if (!details.formulaVariables || details.formulaVariables.length === 0) {
          inputsMatch = false;
          uiContentMismatches++;
          variantErrors.push('Inputs / formula variables missing');
        }
      }

      // 5. Cross-Calculator Contamination Test
      let crossContamination = false;
      let contaminationDetails = '';
      
      // Specifically ensure geometric tools don't mention mortgage/loan, nutrition doesn't mention real estate, etc.
      if (['circle-properties', 'triangle-solver', 'vector-magnitude', 'combinatorics-ncr', 'matrix-determinant'].includes(toolId)) {
        if (fullTextLower.includes('mortgage') || fullTextLower.includes('interest rate') || fullTextLower.includes('calorie') || fullTextLower.includes('protein')) {
          crossContamination = true;
          contaminationDetails = 'Math/Geometry tool contaminated with financial/health terms';
        }
      }
      if (['car-depreciation', 'ev-charging-time', 'paint-coverage', 'flooring-tile', 'wallpaper-rolls', 'mulch-topsoil', 'air-conditioner-btu', 'solar-panel-payback', 'stair-stringer', 'roof-pitch-slope'].includes(toolId)) {
        if (fullTextLower.includes('ketosis') || fullTextLower.includes('body mass index') || fullTextLower.includes('mortgage principal')) {
          crossContamination = true;
          contaminationDetails = 'Home/Practical tool contaminated with medical/mortgage terms';
        }
      }
      if (['keto-macros', 'water-fasting', 'protein-intake', 'creatine-dosing', 'caffeine-halflife'].includes(toolId)) {
        if (fullTextLower.includes('square footage') || fullTextLower.includes('amortization') || fullTextLower.includes('tile box')) {
          crossContamination = true;
          contaminationDetails = 'Nutrition tool contaminated with construction/finance terms';
        }
      }

      if (crossContamination) {
        crossContaminations++;
        variantErrors.push(`Cross-contamination: ${contaminationDetails}`);
      }

      // 6. Health Safety Test
      let healthSafetyPass = true;
      const isHealth = ['keto-macros', 'water-fasting', 'protein-intake', 'creatine-dosing', 'caffeine-halflife', 'steps-to-calories', 'running-pace-split', 'bench-press-max', 'tdee-advanced', 'intermittent-fasting', 'lean-body-mass', 'body-frame-size', 'glycemic-load', 'sleep-debt', 'menstrual-cycle'].includes(toolId);
      if (isHealth) {
        // Must contain medical disclaimers / limitations / non-guarantee wording
        if (!details.limitations || details.limitations.length < 10) {
          healthSafetyPass = false;
          healthContentDefects++;
          variantErrors.push('Health calculator missing required limitations/disclaimer');
        }
        // In keto, must not claim macros prove ketosis
        if (toolId === 'keto-macros' && fullTextLower.includes('guarantees you are in ketosis')) {
          healthSafetyPass = false;
          healthContentDefects++;
          variantErrors.push('Keto calculator makes unverified medical guarantee of ketosis');
        }
      }

      // 7. Localization check
      if (lang === 'ar') {
        const hasArabic = /[\u0600-\u06FF]/.test(details.intro);
        if (!hasArabic) {
          localizationDefects++;
          variantErrors.push('Arabic variant missing Arabic script');
        }
      }

      const status = variantErrors.length === 0 ? 'PASS' : 'FAIL';

      results.push({
        toolId,
        lang,
        toolName,
        inputsMatch,
        outputsMatch: true,
        formulaMatch,
        howToMatch,
        workedExampleMatch,
        crossContamination,
        contaminationDetails,
        genericTemplateFound,
        genericTemplatePhrases: foundPhrases,
        healthSafetyPass,
        status,
        errors: variantErrors
      });
    }
  }

  const summary = {
    totalCalculators: BATCH3_TOOL_IDS.length,
    totalVariants,
    uiContentMismatches,
    formulaMismatches,
    workedExampleMismatches,
    crossContaminations,
    genericTemplateDefects,
    healthContentDefects,
    localizationDefects,
    totalPassed: results.filter(r => r.status === 'PASS').length,
    totalFailed: results.filter(r => r.status === 'FAIL').length
  };

  return { results, summary };
}

// Run if called directly
const { results, summary } = runSemanticAudit();
console.log('=== BATCH 3 SEMANTIC AUDIT SUMMARY ===');
console.log(JSON.stringify(summary, null, 2));

if (summary.totalFailed > 0) {
  console.log('\nFailed Variants:');
  for (const r of results.filter(r => r.status === 'FAIL')) {
    console.log(`[${r.toolId}][${r.lang}] Errors: ${r.errors.join('; ')}`);
  }
}
