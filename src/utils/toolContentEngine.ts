import { Language, ToolDef } from '../types';
import { TOOLS } from '../data/tools';
import { getToolName } from './toolMetadata';
import { ToolContentDetails } from '../data/calculatorKnowledge/types';
import { MORTGAGE_KNOWLEDGE } from '../data/calculatorKnowledge/mortgage';
import { LOAN_KNOWLEDGE, COMPOUND_INTEREST_KNOWLEDGE, SALARY_KNOWLEDGE } from '../data/calculatorKnowledge/financial';
import { PERCENTAGE_KNOWLEDGE, BMI_KNOWLEDGE, AGE_KNOWLEDGE } from '../data/calculatorKnowledge/general';
import { CALORIE_KNOWLEDGE, TIP_KNOWLEDGE, DISCOUNT_KNOWLEDGE, BODY_FAT_KNOWLEDGE } from '../data/calculatorKnowledge/lifestyle';
import { GPA_KNOWLEDGE, CONVERTER_KNOWLEDGE } from '../data/calculatorKnowledge/academic';
import { CONCRETE_KNOWLEDGE, RC_FILTER_KNOWLEDGE, AWG_WIRE_KNOWLEDGE, DATE_KNOWLEDGE } from '../data/calculatorKnowledge/technical';
import { BATCH1_FINANCE_HANDLERS } from '../data/calculatorKnowledge/batch1Finance';
import { BATCH1_FINANCE2_HANDLERS } from '../data/calculatorKnowledge/batch1Finance2';
import { BATCH1_HEALTH_HANDLERS } from '../data/calculatorKnowledge/batch1Health';
import { BATCH1_HEALTH2_HANDLERS } from '../data/calculatorKnowledge/batch1Health2';
import { BATCH1_MATH_HANDLERS } from '../data/calculatorKnowledge/batch1Math';
import { BATCH1_MATH2_HANDLERS } from '../data/calculatorKnowledge/batch1Math2';
import { BATCH1_CONVERTER_HANDLERS } from '../data/calculatorKnowledge/batch1Converters';
import { BATCH1_EVERYDAY_HANDLERS } from '../data/calculatorKnowledge/batch1Everyday';
import { BATCH2_DEDICATED_HANDLERS } from '../data/calculatorKnowledge/batch2Dedicated';
import { BATCH2_DEVTEXT_HANDLERS } from '../data/calculatorKnowledge/batch2DeveloperText';
import { BATCH2_CONVERTERS_HANDLERS } from '../data/calculatorKnowledge/batch2Converters';
import { BATCH2_MATH_HEALTH_HANDLERS } from '../data/calculatorKnowledge/batch2MathHealth';
import { BATCH2_FINANCE_HANDLERS } from '../data/calculatorKnowledge/batch2Finance';
import { BATCH3_FINANCE_HANDLERS } from '../data/calculatorKnowledge/batch3Finance';
import { BATCH3_HEALTH_HANDLERS } from '../data/calculatorKnowledge/batch3Health';
import { BATCH3_HEALTH2_HANDLERS } from '../data/calculatorKnowledge/batch3Health2';
import { BATCH3_MATH_HANDLERS } from '../data/calculatorKnowledge/batch3Math';
import { BATCH3_PRACTICAL_HANDLERS } from '../data/calculatorKnowledge/batch3Practical';
import { MASTER_FINANCE_SPECIALIZED_HANDLERS } from '../data/calculatorKnowledge/specializedFinanceContent/masterFinanceSpecializedContent';
import { CORPORATE_FINANCE_SPECIALIZED_HANDLERS } from '../data/calculatorKnowledge/corporateFinanceKnowledge';
import { CLINICAL_HEALTH_SPECIALIZED_HANDLERS } from '../data/calculatorKnowledge/clinicalHealthKnowledge';
import { ADVANCED_MATH_SPECIALIZED_HANDLERS } from '../data/calculatorKnowledge/advancedMathKnowledge';
import { getStructuredFallbackDetails } from '../data/calculatorKnowledge/fallback';

export type { ToolContentDetails, ToolFaq, ToolInputExplanation, ToolWorkedExample } from '../data/calculatorKnowledge/types';

const BATCH1_HANDLERS: Record<string, any> = {
  ...BATCH1_FINANCE_HANDLERS,
  ...BATCH1_FINANCE2_HANDLERS,
  ...BATCH1_HEALTH_HANDLERS,
  ...BATCH1_HEALTH2_HANDLERS,
  ...BATCH1_MATH_HANDLERS,
  ...BATCH1_MATH2_HANDLERS,
  ...BATCH1_CONVERTER_HANDLERS,
  ...BATCH1_EVERYDAY_HANDLERS,
};

const BATCH2_HANDLERS: Record<string, any> = {
  ...BATCH2_DEDICATED_HANDLERS,
  ...BATCH2_DEVTEXT_HANDLERS,
  ...BATCH2_CONVERTERS_HANDLERS,
  ...BATCH2_MATH_HEALTH_HANDLERS,
  ...BATCH2_FINANCE_HANDLERS,
};

const BATCH3_HANDLERS: Record<string, any> = {
  ...BATCH3_FINANCE_HANDLERS,
  ...BATCH3_HEALTH_HANDLERS,
  ...BATCH3_HEALTH2_HANDLERS,
  ...BATCH3_MATH_HANDLERS,
  ...BATCH3_PRACTICAL_HANDLERS,
};

const COMBINED_UPGRADED_HANDLERS: Record<string, any> = {
  ...MASTER_FINANCE_SPECIALIZED_HANDLERS,
  ...CORPORATE_FINANCE_SPECIALIZED_HANDLERS,
  ...CLINICAL_HEALTH_SPECIALIZED_HANDLERS,
  ...ADVANCED_MATH_SPECIALIZED_HANDLERS,
  ...BATCH1_HANDLERS,
  ...BATCH2_HANDLERS,
  ...BATCH3_HANDLERS,
};

const COMPLEMENTARY_TOOL_MAP: Record<string, string[]> = {
  // Finance
  'mortgage': ['loan', 'amortization-schedule-calculator', 'down-payment', 'property-tax'],
  'wacc-calculator': ['dscr-calculator', 'cap-rate', 'irr-calculator', 'ebitda-calculator'],
  'dscr-calculator': ['wacc-calculator', 'cap-rate', 'debt-payoff', 'commercial-loan'],
  'options-black-scholes': ['roi-cagr', 'dividend-yield', 'crypto-profit', 'stock-dividend-yield'],
  'cap-rate': ['rental-property-yield', 'dscr-calculator', 'mortgage', 'wacc-calculator'],
  'debt-to-income': ['mortgage', 'loan', 'dscr-calculator', 'debt-payoff'],
  'debt-to-income-ratio': ['mortgage', 'loan', 'dscr-calculator', 'debt-payoff'],
  'debt-payoff': ['debt-snowball-payoff-calculator', 'loan', 'compound-interest', 'salary'],

  // Health
  'kidney-gfr-calculator': ['mean-arterial-pressure', 'body-surface-area', 'bmi', 'calorie'],
  'gfr-calculator': ['mean-arterial-pressure', 'body-surface-area', 'bmi', 'calorie'],
  'mean-arterial-pressure': ['target-heart-rate', 'kidney-gfr-calculator', 'blood-pressure-cat', 'cardiac-output-map'],
  'map-calculator': ['target-heart-rate', 'kidney-gfr-calculator', 'blood-pressure-cat', 'cardiac-output-map'],
  'target-heart-rate': ['mean-arterial-pressure', 'calorie-burn', 'bmi', 'ideal-weight'],
  'bmi': ['body-fat', 'ideal-weight', 'calorie', 'target-heart-rate'],
  'body-fat': ['bmi', 'ideal-weight', 'calorie-burn', 'macro'],

  // Math & Physics
  'hex-calculator': ['binary-addition', 'binary-hex', 'hex-to-ascii-string', 'modulo-calc'],
  'hexadecimal-math-calculator': ['binary-addition', 'binary-hex', 'hex-to-ascii-string', 'modulo-calc'],
  'binary-addition': ['hex-calculator', 'binary-hex', 'modulo-calc', 'bitwise-calc'],
  'kinetic-energy': ['velocity-acceleration', 'potential-energy-grav', 'gravitational-force', 'torque-calculator'],
  'kinetic-energy-mass-velocity': ['velocity-acceleration', 'potential-energy-grav', 'gravitational-force', 'torque-calculator'],
  'velocity-acceleration': ['kinetic-energy', 'gravitational-force', 'torque-calculator', 'speed-distance'],
  'matrix-inverse': ['matrix-determinant', 'matrix-transpose-calc', 'eigenvalues-2x2', 'system-linear-2vars'],
  'matrix-inverse-calc': ['matrix-determinant', 'matrix-transpose-calc', 'eigenvalues-2x2', 'system-linear-2vars'],
  'matrix-determinant': ['matrix-inverse-calc', 'matrix-transpose-calc', 'system-linear-3vars', 'cross-product-vectors'],
  'vector-calculator': ['cross-product-vectors', 'dot-product-vectors', 'unit-vector-calculator', 'distance-3d-points'],
  'vector-magnitude': ['cross-product-vectors', 'dot-product-vectors', 'unit-vector-calculator', 'distance-3d-points'],
  'cross-product-vectors': ['dot-product-vectors', 'vector-magnitude', 'unit-vector-calculator', 'matrix-determinant'],
  'dot-product-vectors': ['cross-product-vectors', 'vector-magnitude', 'unit-vector-calculator', 'matrix-determinant'],
  'differential-equation': ['system-linear-2vars', 'system-linear-3vars', 'quadratic', 'integral'],

  // Converters & Everyday
  'temperature': ['unit-converter', 'heat-capacity-specific', 'speed-distance', 'pressure-unit'],
  'unit-converter': ['temperature', 'speed-distance', 'data-size', 'fuel-consumption'],
  'currency': ['currency-crypto', 'inflation-impact', 'vat-tax', 'salary'],
  'currency-converter': ['currency-crypto', 'inflation-impact', 'vat-tax', 'salary']
};

/**
 * Derives genuinely relevant related tools using a strict 5-tier semantic hierarchy:
 * 1. Explicit complementary domain map
 * 2. Shared specialized subcategory
 * 3. Tag overlap count
 * 4. Conceptual semantic token matching
 * 5. Broad category fallback
 */
export function getRelatedTools(tool: ToolDef, limit = 4): ToolDef[] {
  const result: ToolDef[] = [];
  const added = new Set<string>([tool.id]);

  // 1. Explicit Complementary Domain Map
  const directSlugs = COMPLEMENTARY_TOOL_MAP[tool.id] || COMPLEMENTARY_TOOL_MAP[tool.slug] || [];
  for (const slugOrId of directSlugs) {
    if (result.length >= limit) break;
    const match = TOOLS.find((t) => (t.id === slugOrId || t.slug === slugOrId) && !added.has(t.id));
    if (match) {
      result.push(match);
      added.add(match.id);
    }
  }

  // 2. Specialized Subcategory Match
  if (result.length < limit && tool.subcategoryId) {
    const subMatches = TOOLS.filter((t) => !added.has(t.id) && t.subcategoryId === tool.subcategoryId);
    for (const m of subMatches) {
      if (result.length >= limit) break;
      result.push(m);
      added.add(m.id);
    }
  }

  // 3. High Tag Overlap
  if (result.length < limit && tool.tags && tool.tags.length > 0) {
    const tagMatches = TOOLS
      .filter((t) => !added.has(t.id) && t.tags && t.tags.length > 0)
      .map((t) => ({
        tool: t,
        overlap: t.tags!.filter((tag) => tool.tags!.includes(tag)).length
      }))
      .filter((x) => x.overlap > 0)
      .sort((a, b) => b.overlap - a.overlap);

    for (const item of tagMatches) {
      if (result.length >= limit) break;
      result.push(item.tool);
      added.add(item.tool.id);
    }
  }

  // 4. Conceptual Token Match
  if (result.length < limit) {
    const tokens = tool.slug.split('-').filter((w) => w.length > 3 && !['calculator', 'calc'].includes(w));
    if (tokens.length > 0) {
      const conceptMatches = TOOLS.filter(
        (t) => !added.has(t.id) && tokens.some((token) => t.slug.includes(token) || t.id.includes(token))
      );
      for (const m of conceptMatches) {
        if (result.length >= limit) break;
        result.push(m);
        added.add(m.id);
      }
    }
  }

  // 5. Category Fallback
  if (result.length < limit) {
    const catMatches = TOOLS.filter((t) => !added.has(t.id) && t.categoryId === tool.categoryId);
    for (const m of catMatches) {
      if (result.length >= limit) break;
      result.push(m);
      added.add(m.id);
    }
  }

  return result.slice(0, limit);
}

export function getToolContentDetails(
  tool: ToolDef,
  lang: Language = 'en'
): ToolContentDetails {
  const name = getToolName(tool, lang);
  const id = tool.id.toLowerCase();
  const slug = tool.slug.toLowerCase();

  // Find 4 genuinely related tools using the strict 5-tier semantic hierarchy
  const relatedTools = getRelatedTools(tool, 4);

  // 1. MORTGAGE CALCULATOR (Gold Standard Target)
  if (id === 'mortgage' || slug === 'mortgage-calculator' || slug.includes('mortgage-payment') || slug.includes('fixed-mortgage')) {
    const handler = MORTGAGE_KNOWLEDGE[lang] || MORTGAGE_KNOWLEDGE.en;
    return handler(tool, name, relatedTools);
  }

  // 2. LOAN CALCULATOR
  if (id === 'loan' || slug === 'loan-calculator' || slug === 'auto-loan-calculator' || slug === 'car-loan-calculator') {
    const handler = LOAN_KNOWLEDGE[lang] || LOAN_KNOWLEDGE.en;
    return handler(tool, name, relatedTools);
  }

  // 3. COMPOUND INTEREST CALCULATOR
  if (id === 'compound-interest' || slug === 'compound-interest-calculator' || slug.includes('investment-interest')) {
    const handler = COMPOUND_INTEREST_KNOWLEDGE[lang] || COMPOUND_INTEREST_KNOWLEDGE.en;
    return handler(tool, name, relatedTools);
  }

  // 4. PERCENTAGE CALCULATOR
  if (id === 'percentage' || slug === 'percentage-calculator' || slug.includes('percentage-increase')) {
    const handler = PERCENTAGE_KNOWLEDGE[lang] || PERCENTAGE_KNOWLEDGE.en;
    return handler(tool, name, relatedTools);
  }

  // 5. BMI CALCULATOR
  if (id === 'bmi' || slug === 'bmi-calculator' || slug.includes('body-mass-index')) {
    const handler = BMI_KNOWLEDGE[lang] || BMI_KNOWLEDGE.en;
    return handler(tool, name, relatedTools);
  }

  // 6. AGE CALCULATOR
  if (id === 'age' || slug === 'age-calculator' || slug.includes('chronological-age')) {
    const handler = AGE_KNOWLEDGE[lang] || AGE_KNOWLEDGE.en;
    return handler(tool, name, relatedTools);
  }

  // 7. CALORIE CALCULATOR
  if (id === 'calorie' || slug === 'calorie-calculator' || slug === 'tdee-calculator' || slug === 'bmr-calculator') {
    const handler = CALORIE_KNOWLEDGE[lang] || CALORIE_KNOWLEDGE.en;
    return handler(tool, name, relatedTools);
  }

  // 8. TIP CALCULATOR
  if (id === 'tip' || slug === 'tip-calculator' || slug.includes('gratuity')) {
    const handler = TIP_KNOWLEDGE[lang] || TIP_KNOWLEDGE.en;
    return handler(tool, name, relatedTools);
  }

  // 9. DISCOUNT CALCULATOR
  if (id === 'discount' || slug === 'discount-calculator' || slug.includes('sale-discount')) {
    const handler = DISCOUNT_KNOWLEDGE[lang] || DISCOUNT_KNOWLEDGE.en;
    return handler(tool, name, relatedTools);
  }

  // 10. GPA CALCULATOR
  if (id === 'gpa' || slug === 'gpa-calculator' || slug.includes('grade-point-average')) {
    const handler = GPA_KNOWLEDGE[lang] || GPA_KNOWLEDGE.en;
    return handler(tool, name, relatedTools);
  }

  // 11. UNIT CONVERTER
  if (id === 'converter' || slug === 'unit-converter' || slug.includes('length-converter') || slug.includes('weight-converter')) {
    const handler = CONVERTER_KNOWLEDGE[lang] || CONVERTER_KNOWLEDGE.en;
    return handler(tool, name, relatedTools);
  }

  // 12. SALARY CALCULATOR
  if (id === 'salary' || slug === 'salary-calculator' || slug.includes('wage-calculator') || slug.includes('hourly-to-salary')) {
    const handler = SALARY_KNOWLEDGE[lang] || SALARY_KNOWLEDGE.en;
    return handler(tool, name, relatedTools);
  }

  // 13. BODY FAT CALCULATOR
  if (id === 'body-fat' || slug === 'body-fat-calculator' || slug.includes('body-composition')) {
    const handler = BODY_FAT_KNOWLEDGE[lang] || BODY_FAT_KNOWLEDGE.en;
    return handler(tool, name, relatedTools);
  }

  // 14. SPECIALIZED TECHNICAL & CONSTRUCTION DOMAINS
  // Concrete & Construction
  if (slug.includes('concrete') || slug.includes('slab') || slug.includes('yardage')) {
    const handler = CONCRETE_KNOWLEDGE[lang] || CONCRETE_KNOWLEDGE.en;
    return handler(tool, name, relatedTools);
  }

  // RC Cutoff Frequency & Electronics
  if (slug.includes('rc-low-pass') || slug.includes('cutoff-frequency') || id.includes('cutoff')) {
    const handler = RC_FILTER_KNOWLEDGE[lang] || RC_FILTER_KNOWLEDGE.en;
    return handler(tool, name, relatedTools);
  }

  // Wire Gauge (AWG)
  if (slug.includes('awg') || slug.includes('wire-gauge') || slug.includes('ampacity')) {
    const handler = AWG_WIRE_KNOWLEDGE[lang] || AWG_WIRE_KNOWLEDGE.en;
    return handler(tool, name, relatedTools);
  }

  // Date Interval & Duration
  if (id === 'date' || slug === 'date-calculator' || slug.includes('date-difference') || slug.includes('date-between')) {
    const handler = DATE_KNOWLEDGE[lang] || DATE_KNOWLEDGE.en;
    return handler(tool, name, relatedTools);
  }

  // Check Batch 1, 2, 3 and Domain-Specialized upgraded tool implementations
  const customHandlerGroup =
    COMBINED_UPGRADED_HANDLERS[id] ||
    COMBINED_UPGRADED_HANDLERS[slug] ||
    COMBINED_UPGRADED_HANDLERS[id.replace(/-calculator$/, '')] ||
    COMBINED_UPGRADED_HANDLERS[`${id}-calculator`] ||
    COMBINED_UPGRADED_HANDLERS[slug.replace(/-calculator$/, '')] ||
    COMBINED_UPGRADED_HANDLERS[`${slug}-calculator`];
  if (customHandlerGroup) {
    const handler = customHandlerGroup[lang] || customHandlerGroup.en;
    const res = handler(tool, name, relatedTools);
    return {
      toolName: res.toolName || name,
      intro: res.intro || res.overview || '',
      whoUsesIt: res.whoUsesIt,
      howToUse: res.howToUse || [],
      whatItCalculates: res.whatItCalculates || res.overview || '',
      formula: res.formula,
      formulaVariables: res.formulaVariables
        ? res.formulaVariables.map((v: any) => ({
            symbol: v.symbol || v.name || '',
            explanation: v.explanation || v.description || ''
          }))
        : undefined,
      inputs: res.inputs || (res.formulaVariables
        ? res.formulaVariables.map((v: any) => ({
            name: v.name || v.symbol || '',
            description: v.description || v.explanation || '',
            unit: v.unit,
            optional: v.optional
          }))
        : []),
      unitsAndConversions: res.unitsAndConversions,
      workedExample: res.workedExample,
      understandingResults: res.understandingResults || res.interpretation,
      assumptions: res.assumptions,
      limitations: res.limitations,
      faqs: res.faqs || [],
      relatedTools: res.relatedTools || relatedTools
    };
  }

  // 13. COMPREHENSIVE MULTILINGUAL STRUCTURED FALLBACK
  return getStructuredFallbackDetails(tool, name, lang, relatedTools);
}
