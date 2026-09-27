import { TOOLS } from '../src/data/tools.js';
import { SUPPORTED_LANGUAGES } from '../src/utils/seoEngine.js';
import { getToolContentDetails } from '../src/utils/toolContentEngine.js';
import { Language, ToolDef } from '../src/types.js';

// Specific disallowed "Ghost Outputs" by tool
// (Content must NEVER claim an output that the calculator component does not render)
const GHOST_OUTPUT_DISALLOW_LIST: Record<string, string[]> = {
  mortgage: ['pmi', 'private mortgage insurance', 'early payoff', 'extra payments schedule', 'bi-weekly acceleration'],
  loan: ['origination fee breakdown', 'credit score impact', 'prepayment penalty calculator'],
  'compound-interest': ['inflation-adjusted real return', 'capital gains tax deduction', 'wealth tax'],
  salary: ['net take-home pay after federal tax brackets', 'state tax withholding breakdown', 'fica tax deduction table'],
  percentage: ['tax bracket calculation', 'standard deviation', 'confidence interval'],
  bmi: ['body fat percentage', 'visceral fat level', 'skeletal muscle mass', 'metabolic age'],
  calorie: ['macronutrient gram distribution', 'glycemic load index', 'keto ratio'],
  'body-fat': ['visceral fat level', 'bone mineral density', 'intracellular water'],
  age: ['astrological chart', 'zodiac horoscope', 'life expectancy prediction'],
  date: ['lunar phases', 'tide tables', 'solar equinox'],
  tip: ['merchant credit card fee', 'restaurant revenue share'],
  discount: ['rebate tracking', 'coupon stacking engine'],
  gpa: ['class percentile rank', 'pell grant eligibility'],
  converter: ['live forex currency exchange rates', 'cryptocurrency conversion'],
  concrete: ['rebar tensile yield strength', 'concrete compressive curing schedule psi'],
  'rc-filter': ['op-amp gain bandwidth product', 'bode plot phase margin'],
  'awg-wire': ['skin effect at gigahertz frequencies', 'three-phase delta power factor'],
};

// Forbidden AI slop / generic filler words
const FORBIDDEN_CLICHES = [
  'supercharge',
  'empower your',
  'cutting-edge',
  'trusted by millions',
  'peer-reviewed algorithms',
  'game-changer',
  'dive deep',
  'seamlessly blend',
  'unleash',
  'lorem ipsum',
  'todo:',
  ': undefined',
  '"undefined"',
  'null,',
  '[insert',
];

interface ValidationResult {
  toolId: string;
  lang: Language;
  passed: boolean;
  errors: string[];
  warnings: string[];
}

export function runContentQualityValidation(): { passed: boolean; results: ValidationResult[] } {
  console.log('=== Calcyfy Phase 3 & 4 Content Quality & Ghost Output Validation ===\n');

  const sampleToolIds = [
    'mortgage',
    'loan',
    'compound-interest',
    'salary',
    'percentage',
    'bmi',
    'calorie',
    'body-fat',
    'age',
    'date',
    'tip',
    'discount',
    'gpa',
    'converter',
    'concrete-volume',
    'bode-plot-cutoff-freq',
    'wire-gauge-ampacity-awg',
  ];

  const results: ValidationResult[] = [];
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const sampleId of sampleToolIds) {
    const tool = TOOLS.find((t) => t.id === sampleId || t.slug.includes(sampleId));
    if (!tool) {
      console.warn(`⚠️ Could not locate tool definition for sample ID: ${sampleId}`);
      continue;
    }

    for (const lang of SUPPORTED_LANGUAGES) {
      const toolErrors: string[] = [];
      const toolWarnings: string[] = [];
      const details = getToolContentDetails(tool, lang);

      // 1. Structure & Completeness Checks
      if (!details.intro || details.intro.trim().length < 40) {
        toolErrors.push(`Intro too short (${details.intro?.length || 0} chars)`);
      }

      if (!details.whoUsesIt || details.whoUsesIt.trim().length < 15) {
        toolErrors.push(`whoUsesIt missing or too brief`);
      }

      if (!details.whatItCalculates || details.whatItCalculates.trim().length < 15) {
        toolErrors.push(`whatItCalculates missing or too brief`);
      }

      // Check howToUse presence and quality (Phase 2 & 5 requirement)
      if (!details.howToUse || !Array.isArray(details.howToUse) || details.howToUse.length < 3) {
        toolErrors.push(`howToUse must be an array with at least 3 actionable steps (found ${details.howToUse?.length || 0})`);
      }

      // Check formula presence
      if (!details.formula || details.formula.trim().length < 5) {
        toolErrors.push(`formula missing or invalid`);
      }

      // Check inputs definition
      if (!details.inputs || details.inputs.length === 0) {
        toolErrors.push(`No inputs defined in details`);
      } else {
        for (const input of details.inputs) {
          if (!input.name || !input.description || !input.unit) {
            toolErrors.push(`Input "${input.name || 'unnamed'}" is missing description or unit`);
          }
        }
      }

      // Check worked example
      if (!details.workedExample) {
        toolErrors.push(`workedExample missing`);
      } else {
        if (!details.workedExample.scenario || details.workedExample.scenario.length < 10) {
          toolErrors.push(`workedExample.scenario too brief`);
        }
        if (!details.workedExample.stepByStep || details.workedExample.stepByStep.length < 1) {
          toolErrors.push(`workedExample.stepByStep missing steps`);
        }
        if (!details.workedExample.result || details.workedExample.result.length < 5) {
          toolErrors.push(`workedExample.result missing`);
        }
      }

      // Check FAQs
      if (!details.faqs || details.faqs.length === 0) {
        toolErrors.push(`FAQs missing`);
      } else {
        for (const faq of details.faqs) {
          if (!faq.question || faq.question.length < 10 || !faq.answer || faq.answer.length < 15) {
            toolErrors.push(`FAQ entry too brief: "${faq.question}"`);
          }
        }
      }

      // 2. Ghost Output Detection (Phase 3)
      const contentCorpus = `
        ${details.whatItCalculates}
        ${details.intro}
        ${details.workedExample?.result || ''}
        ${details.workedExample?.stepByStep?.join(' ') || ''}
      `.toLowerCase();

      const matchedToolKey = Object.keys(GHOST_OUTPUT_DISALLOW_LIST).find((k) =>
        sampleId.toLowerCase().includes(k) || tool.slug.toLowerCase().includes(k)
      );

      if (matchedToolKey && lang === 'en') {
        const forbiddenGhostOutputs = GHOST_OUTPUT_DISALLOW_LIST[matchedToolKey] || [];
        for (const ghost of forbiddenGhostOutputs) {
          if (contentCorpus.includes(ghost)) {
            toolErrors.push(`GHOST OUTPUT VIOLATION: Content claims unsupported output "${ghost}"`);
          }
        }
      }

      // 3. Generic-Content & AI Slop Detection (Phase 4)
      const fullText = JSON.stringify(details).toLowerCase();
      for (const cliche of FORBIDDEN_CLICHES) {
        if (fullText.includes(cliche)) {
          toolErrors.push(`GENERIC SLOP VIOLATION: Contains forbidden phrase or placeholder "${cliche}"`);
        }
      }

      // Raw translation key detection
      if (fullText.includes('t(\'') || fullText.includes('calc_desc_') || fullText.includes('calc_title_')) {
        toolErrors.push(`RAW KEY VIOLATION: Unrendered translation key found`);
      }

      // 4. Exact Mathematical Verification for Sample Targets
      if (sampleId === 'mortgage' && lang === 'en') {
        if (!fullText.includes('1,918.56') && !fullText.includes('2,086.16')) {
          toolErrors.push(`MORTGAGE CALCULATION ERROR: Principal & Interest $1,918.56 not found in example`);
        }
        if (!fullText.includes('2,418.56') && !fullText.includes('2,586.16')) {
          toolErrors.push(`MORTGAGE CALCULATION ERROR: Total Monthly Payment $2,418.56 not found in example`);
        }
        if (!fullText.includes('370,682.20') && !fullText.includes('431,017.82')) {
          toolErrors.push(`MORTGAGE CALCULATION ERROR: Lifetime Interest $370,682.20 not found in example`);
        }
      }

      if (sampleId === 'loan' && lang === 'en') {
        if (!fullText.includes('477.53')) {
          toolErrors.push(`LOAN CALCULATION ERROR: Monthly payment $477.53 not found in example`);
        }
        if (!fullText.includes('3,651.80')) {
          toolErrors.push(`LOAN CALCULATION ERROR: Total interest $3,651.80 not found in example`);
        }
      }

      if (sampleId === 'salary' && lang === 'en') {
        if (!fullText.includes('28.85')) {
          toolErrors.push(`SALARY CALCULATION ERROR: Hourly rate $28.85 not found in example`);
        }
        if (!fullText.includes('5,000.00')) {
          toolErrors.push(`SALARY CALCULATION ERROR: Monthly $5,000.00 not found in example`);
        }
      }

      if (sampleId === 'body-fat' && lang === 'en') {
        if (!fullText.includes('23.0%') && !fullText.includes('22.96%')) {
          toolErrors.push(`BODY FAT CALCULATION ERROR: Expected 23.0% in example result`);
        }
      }

      if (sampleId === 'concrete-volume' && lang === 'en') {
        if (!fullText.includes('2.47') && !fullText.includes('2.72')) {
          toolErrors.push(`CONCRETE CALCULATION ERROR: Expected 2.47 net or 2.72 gross cubic yards`);
        }
      }

      if (sampleId === 'bode-plot-cutoff-freq' && lang === 'en') {
        if (!fullText.includes('1,591.55') && !fullText.includes('1.59 khz')) {
          toolErrors.push(`RC FILTER CALCULATION ERROR: Expected cutoff frequency 1,591.55 Hz (1.59 kHz)`);
        }
      }

      if (sampleId === 'wire-gauge-ampacity-awg' && lang === 'en') {
        if (!fullText.includes('12 awg')) {
          toolErrors.push(`AWG CALCULATION ERROR: Expected 12 AWG in example`);
        }
      }

      const passed = toolErrors.length === 0;
      if (!passed) totalErrors += toolErrors.length;
      totalWarnings += toolWarnings.length;

      results.push({
        toolId: tool.id,
        lang,
        passed,
        errors: toolErrors,
        warnings: toolWarnings,
      });
    }
  }

  // Summary Report
  console.log(`Validated ${results.length} calculator-language pairs across ${sampleToolIds.length} sample calculators.`);
  console.log(`Errors: ${totalErrors}`);
  console.log(`Warnings: ${totalWarnings}`);

  if (totalErrors > 0) {
    console.error('\n❌ Content Quality Validation Failed with Errors:');
    for (const r of results) {
      if (!r.passed) {
        console.error(`  [${r.lang.toUpperCase()}] ${r.toolId}:`);
        for (const err of r.errors) {
          console.error(`    - ${err}`);
        }
      }
    }
    return { passed: false, results };
  } else {
    console.log('\n✅ All Content Quality, Ghost Output, and Mathematical Checks Passed Flawlessly!');
    return { passed: true, results };
  }
}

// If run directly via CLI
if (import.meta.url.endsWith(process.argv[1]) || process.argv[1]?.includes('validateContentQuality')) {
  const result = runContentQualityValidation();
  process.exit(result.passed ? 0 : 1);
}
