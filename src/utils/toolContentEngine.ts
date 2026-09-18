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
  ...BATCH1_HANDLERS,
  ...BATCH2_HANDLERS,
  ...BATCH3_HANDLERS,
};

export function getToolContentDetails(
  tool: ToolDef,
  lang: Language = 'en'
): ToolContentDetails {
  const name = getToolName(tool, lang);
  const id = tool.id.toLowerCase();
  const slug = tool.slug.toLowerCase();

  // Find 4 genuinely related tools in the same or complementary category
  const relatedTools = TOOLS.filter(
    (t) => t.id !== tool.id && (t.categoryId === tool.categoryId || t.slug.includes(id.split('-')[0]))
  ).slice(0, 4);

  // Check Batch 1 and Batch 2 upgraded tool implementations
  const customHandlerGroup = COMBINED_UPGRADED_HANDLERS[id] || COMBINED_UPGRADED_HANDLERS[slug];
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

  // 13. COMPREHENSIVE MULTILINGUAL STRUCTURED FALLBACK
  return getStructuredFallbackDetails(tool, name, lang, relatedTools);
}
