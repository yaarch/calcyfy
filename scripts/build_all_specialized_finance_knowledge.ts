import * as fs from 'fs';
import * as path from 'path';
import { TOOLS } from '../src/data/tools';

const financeAndCurrencyTools = TOOLS.filter(t => t.categoryId === 'finance' || t.categoryId === 'currency' || t.id.includes('loan') || t.id.includes('interest') || t.id.includes('savings') || t.id.includes('mortgage') || t.id.includes('tax') || t.id.includes('discount') || t.id.includes('markup') || t.id.includes('compound') || t.id.includes('salary') || t.id.includes('currency') || t.id.includes('crypto'));

console.log(`Building specialized knowledge for ${financeAndCurrencyTools.length} tools...`);

// Let's create helper function to build robust specialized knowledge definitions for each tool
const buildToolKnowledgeCode = (id: string, slug: string) => {
  let title = id.replace(/-/g, ' ').toUpperCase();
  
  // Specific custom inputs/formulas/examples per tool family
  let introEN = `The ${title} calculator evaluates financial parameters with precise mathematical formulas and real-time updates.`;
  let introAR = `تقدم حاسبة ${title} تقييماً مالياً دقيقاً باستخدام المعادلات المعتمدة مع تحديث فوري للنتائج.`;
  let introES = `La calculadora de ${title} proporciona evaluaciones financieras precisas según modelos matemáticos estandarizados.`;
  let introFR = `Le calculateur de ${title} fournit des évaluations financières précises selon des modèles mathématiques établis.`;
  let introDE = `Der ${title}-Rechner bietet präzise finanzielle Auswertungen basierend auf etablierten mathematischen Modellen.`;

  let formula = `Result = FinancialModel(Inputs)`;
  let workedScenario = `Calculating ${title} using representative market values.`;
  let workedStep1 = `Input primary financial variables into the designated fields.`;
  let workedStep2 = `Apply the specialized financial formula.`;
  let workedStep3 = `Review the computed outputs and ratio breakdowns.`;
  let workedResult = `Final computed value aligns with standard mathematical standards.`;

  let input1Name = "Primary Value ($)";
  let input1Desc = "Main financial amount or capital input.";
  let input2Name = "Rate / Factor (%)";
  let input2Desc = "Applicable percentage rate, yield, or ratio.";

  // Tailor per specific tool IDs
  if (id === 'npv-calculator') {
    formula = 'NPV = ∑ [CF_t / (1 + r)^t] - Initial Outlay';
    workedScenario = 'Evaluating a $100,000 project with 8% discount rate and $30k, $35k, $40k, $45k, $50k annual cash flows over 5 years.';
    workedStep1 = 'Calculate Present Value (PV) of each year cash inflow at 8% discount rate.';
    workedStep2 = 'Sum present values: $27,777.78 + $29,990.40 + $31,753.29 + $33,075.89 + $34,029.16 = $156,626.52.';
    workedStep3 = 'Subtract Initial Outlay: $156,626.52 - $100,000 = $56,626.52.';
    workedResult = 'Net Present Value (NPV) = $56,626.52. Recommendation: Accept Project (NPV > 0).';
    input1Name = 'Initial Outlay ($)';
    input1Desc = 'Upfront capital investment required.';
    input2Name = 'Discount Rate (%)';
    input2Desc = 'Annual hurdle rate or cost of capital.';
  } else if (id === 'irr-calculator') {
    formula = '0 = ∑ [CF_t / (1 + IRR)^t] - Initial Outlay';
    workedScenario = 'Finding the internal rate of return for $100,000 investment generating $30k, $35k, $40k, $45k, $50k cash flows.';
    workedStep1 = 'Set NPV equation equal to zero.';
    workedStep2 = 'Iteratively solve for rate r (IRR).';
    workedStep3 = 'At r = 24.44%, NPV equals exactly $0.';
    workedResult = 'IRR = 24.44%. Exceeds standard discount rates.';
    input1Name = 'Initial Outlay ($)';
    input1Desc = 'Initial capital required.';
    input2Name = 'Annual Cash Inflows ($)';
    input2Desc = 'Expected cash returns per year.';
  } else if (id === 'ebitda-calculator') {
    formula = 'EBITDA = Revenue - COGS - OpEx (excl. D&A)';
    workedScenario = 'Calculating EBITDA for Revenue $5,000,000, COGS $2,000,000, OpEx $1,500,000, D&A $400,000.';
    workedStep1 = 'Gross Profit = $5,000,000 - $2,000,000 = $3,000,000.';
    workedStep2 = 'EBITDA = $3,000,000 - $1,500,000 = $1,500,000.';
    workedStep3 = 'EBITDA Margin = ($1,500,000 / $5,000,000) × 100 = 30.0%.';
    workedResult = 'EBITDA = $1,500,000 | EBITDA Margin = 30.0%.';
    input1Name = 'Revenue ($)';
    input1Desc = 'Total gross revenue.';
    input2Name = 'COGS ($)';
    input2Desc = 'Cost of goods sold.';
  } else if (id === 'roi-calculator' || id === 'cagr-calculator') {
    formula = 'ROI = (Final - Initial) / Initial | CAGR = (Final / Initial)^(1 / Years) - 1';
    workedScenario = 'Investing $10,000 that grows to $15,000 over 3 years.';
    workedStep1 = 'Calculate Total Gain: $15,000 - $10,000 = $5,000.';
    workedStep2 = 'Calculate Total ROI: ($5,000 / $10,000) × 100 = 50.00%.';
    workedStep3 = 'Calculate CAGR: (15,000 / 10,000)^(1/3) - 1 = 14.47%.';
    workedResult = 'Total ROI = 50.00% | Annualized CAGR = 14.47%.';
    input1Name = 'Initial Investment ($)';
    input1Desc = 'Starting capital invested.';
    input2Name = 'Final Value ($)';
    input2Desc = 'Current or ending value.';
  } else if (id === 'cap-rate' || id === 'rental-yield' || id === 'rental-property-yield') {
    formula = 'Cap Rate = Net Operating Income (NOI) / Property Value';
    workedScenario = 'Analyzing a $350,000 property with $2,800 monthly rent ($33,600/yr) and $8,000 annual expenses.';
    workedStep1 = 'Calculate NOI: $33,600 gross rent - $8,000 expenses = $25,600 NOI.';
    workedStep2 = 'Calculate Cap Rate: ($25,600 / $350,000) × 100 = 7.31%.';
    workedStep3 = 'Calculate Gross Rental Yield: ($33,600 / $350,000) × 100 = 9.60%.';
    workedResult = 'Cap Rate = 7.31% | Gross Rental Yield = 9.60%.';
    input1Name = 'Property Price ($)';
    input1Desc = 'Purchase price or market value.';
    input2Name = 'Monthly Rent ($)';
    input2Desc = 'Expected monthly rental income.';
  } else if (id === 'freelance-rate' || id === 'freelance-rate-calc') {
    formula = 'Hourly Rate = (Target Income + Annual Overhead) / (Billable Hours/Wk × Working Weeks)';
    workedScenario = 'Target income $85,000, overhead $12,000, 30 billable hrs/week, 4 vacation weeks (48 working weeks).';
    workedStep1 = 'Total gross revenue needed: $85,000 + $12,000 = $97,000.';
    workedStep2 = 'Total annual billable hours: 48 weeks × 30 hours = 1,440 hours.';
    workedStep3 = 'Calculate hourly rate: $97,000 / 1,440 hours = $67.36/hour.';
    workedResult = 'Minimum Required Hourly Rate = $67.36/hour.';
    input1Name = 'Target Annual Income ($)';
    input1Desc = 'Desired net take-home income.';
    input2Name = 'Annual Overhead ($)';
    input2Desc = 'Software, hardware, insurance, tax overhead.';
  } else if (id === 'crypto-profit-loss-calc' || id === 'crypto-profit') {
    formula = 'Net PnL = [Sell Price × Qty × (1 - Fee)] - [Buy Price × Qty × (1 + Fee)]';
    workedScenario = 'Buying 0.5 BTC at $60,000 and selling at $68,000 with 0.1% fee.';
    workedStep1 = 'Total buy cost with fee: $30,000 × 1.001 = $30,030.00.';
    workedStep2 = 'Total sell proceeds after fee: $34,000 × 0.999 = $33,966.00.';
    workedStep3 = 'Calculate Net Profit: $33,966.00 - $30,030.00 = $3,936.00.';
    workedResult = 'Net Profit = $3,936.00 | ROI = 13.11%.';
    input1Name = 'Buy Price ($)';
    input1Desc = 'Purchase entry price per coin.';
    input2Name = 'Sell Price ($)';
    input2Desc = 'Target exit price per coin.';
  } else if (id === 'ethereum-gas-fee-converter') {
    formula = 'Gas Fee (ETH) = (Gas Limit × Gas Price in Gwei) / 10^9';
    workedScenario = 'ETH transfer using 21,000 gas units at 25 Gwei gas price with ETH at $2,600 USD.';
    workedStep1 = 'Calculate gas in Gwei: 21,000 × 25 = 525,000 Gwei.';
    workedStep2 = 'Convert Gwei to ETH: 525,000 / 1,000,000,000 = 0.000525 ETH.';
    workedStep3 = 'Convert ETH to USD: 0.000525 × $2,600 = $1.365 USD.';
    workedResult = 'Gas Fee = 0.000525 ETH ($1.37 USD).';
    input1Name = 'Gas Limit (Units)';
    input1Desc = 'Gas units required for transaction.';
    input2Name = 'Gas Price (Gwei)';
    input2Desc = 'Network base fee plus priority tip.';
  } else if (id === 'zakat-calculator-islamic') {
    formula = 'Zakat Due = (Cash + Gold/Silver + Investments - Short-Term Debts) × 2.5%';
    workedScenario = 'Calculating Zakat for $15,000 cash, $8,000 gold, $10,000 investments, $3,000 debts.';
    workedStep1 = 'Net Zakatable Wealth: $15,000 + $8,000 + $10,000 - $3,000 = $30,000.';
    workedStep2 = 'Check Nisab threshold (~$6,000 USD): $30,000 ≥ Nisab (Eligible).';
    workedStep3 = 'Calculate Zakat: $30,000 × 0.025 = $750.00.';
    workedResult = 'Net Wealth = $30,000 | Zakat Due = $750.00.';
    input1Name = 'Cash & Savings ($)';
    input1Desc = 'Bank savings and liquid funds held for one lunar year.';
    input2Name = 'Gold & Silver ($)';
    input2Desc = 'Market value of gold/silver assets.';
  }

  return `
export const KNOWLEDGE_${id.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails> = {
  en: (tool, name, relatedTools) => ({
    toolName: name,
    intro: \`${introEN}\`,
    whoUsesIt: 'Financial professionals, corporate managers, individual investors, and analysts.',
    whatItCalculates: 'Precise financial metrics, ratios, and breakdown values based on standard formulas.',
    howToUse: [
      'Enter your verified financial inputs in the corresponding fields above.',
      'The calculation engine evaluates results instantly in real time.',
      'Review summary metrics, formulas, and worked examples below.'
    ],
    formula: \`${formula}\`,
    formulaVariables: [
      { symbol: 'Input1', explanation: \`${input1Desc}\` },
      { symbol: 'Input2', explanation: \`${input2Desc}\` }
    ],
    inputs: [
      { name: \`${input1Name}\`, description: \`${input1Desc}\`, unit: 'USD ($)', optional: false },
      { name: \`${input2Name}\`, description: \`${input2Desc}\`, unit: 'Unit / %', optional: false }
    ],
    unitsAndConversions: 'All calculations execute in local client memory using floating-point precision.',
    workedExample: {
      scenario: \`${workedScenario}\`,
      stepByStep: [
        \`${workedStep1}\`,
        \`${workedStep2}\`,
        \`${workedStep3}\`
      ],
      result: \`${workedResult}\`
    },
    understandingResults: 'Results provide mathematical estimates derived directly from the supplied input values.',
    assumptions: 'Assumes standard financial accounting conventions and fixed rates over the evaluation period.',
    limitations: 'Calculations serve informational and educational planning purposes.',
    faqs: [
      { question: \`How is ${title} calculated?\`, answer: \`It uses standard financial formulas applied directly to your input parameters.\` },
      { question: \`Are my inputs saved?\`, answer: \`No, all calculations run client-side in your browser for privacy.\` }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    toolName: name,
    intro: \`${introAR}\`,
    whoUsesIt: 'المحللون الماليون والمستثمرون والأفراد الراغبون في حسابات دقيقة.',
    whatItCalculates: 'قيم مالية ومؤشرات دقيقة بناءً على المعايير المعتمدة.',
    howToUse: [
      'أدخل البيانات المالية المطلوبة في الحقول أعلاه.',
      'يعالج المحرك الحسابي البيانات بشكل فوري.',
      'استعرض النتائج والخطوات والمثال التوضيحي.'
    ],
    formula: \`${formula}\`,
    formulaVariables: [
      { symbol: 'المتغير الأول', explanation: \`${input1Desc}\` },
      { symbol: 'المتغير الثاني', explanation: \`${input2Desc}\` }
    ],
    inputs: [
      { name: \`${input1Name}\`, description: \`${input1Desc}\`, unit: 'دولار ($)', optional: false },
      { name: \`${input2Name}\`, description: \`${input2Desc}\`, unit: 'نسبة / وحدة', optional: false }
    ],
    unitsAndConversions: 'تجري جميع الحسابات بدقة عالية داخل متصفحك.',
    workedExample: {
      scenario: \`${workedScenario}\`,
      stepByStep: [
        \`${workedStep1}\`,
        \`${workedStep2}\`,
        \`${workedStep3}\`
      ],
      result: \`${workedResult}\`
    },
    understandingResults: 'توضح النتائج القيم الرياضية الدقيقة للبيانات المدخلة.',
    assumptions: 'تفترض ثبات المعايير والنسب المالية خلال فترة التقييم.',
    limitations: 'النتائج لأغراض التخطيط والدراسة الماليين.',
    faqs: [
      { question: \`كيف تعمل هذه الحاسبة؟\`, answer: \`تطبق المعادلات المالية المعيارية بشكل مباشر وفوري.\` }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    toolName: name,
    intro: \`${introES}\`,
    whoUsesIt: 'Analistas financieros, inversores y profesionales.',
    whatItCalculates: 'Métricas e indicadores financieros exactos.',
    howToUse: ['Introduzca los datos.', 'El sistema calcula en tiempo real.', 'Examine los resultados.'],
    formula: \`${formula}\`,
    inputs: [
      { name: \`${input1Name}\`, description: \`${input1Desc}\`, unit: 'USD ($)', optional: false }
    ],
    workedExample: {
      scenario: \`${workedScenario}\`,
      stepByStep: [\`${workedStep1}\`, \`${workedStep2}\`, \`${workedStep3}\`],
      result: \`${workedResult}\`
    },
    understandingResults: 'Valores numéricos derivados de los datos introducidos.',
    assumptions: 'Condiciones financieras estándar.',
    limitations: 'Fines de orientación e información.',
    faqs: [{ question: '¿Cómo funciona?', answer: 'Aplica fórmulas estándar instantáneamente.' }],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    toolName: name,
    intro: \`${introFR}\`,
    whoUsesIt: 'Analystes financiers, investisseurs et professionnels.',
    whatItCalculates: 'Métrique et ratios financiers précis.',
    howToUse: ['Saisissez les données.', 'Calcul instantané.', 'Consultez les résultats.'],
    formula: \`${formula}\`,
    inputs: [
      { name: \`${input1Name}\`, description: \`${input1Desc}\`, unit: 'USD ($)', optional: false }
    ],
    workedExample: {
      scenario: \`${workedScenario}\`,
      stepByStep: [\`${workedStep1}\`, \`${workedStep2}\`, \`${workedStep3}\`],
      result: \`${workedResult}\`
    },
    understandingResults: 'Résultats dérivés directement de vos saisies.',
    assumptions: 'Hypothèses comptables standard.',
    limitations: 'À des fins d’information et d’analyse.',
    faqs: [{ question: 'Comment ça marche ?', answer: 'Applique les formules financières établies.' }],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    toolName: name,
    intro: \`${introDE}\`,
    whoUsesIt: 'Finanzanalysten, Investoren und Fachleute.',
    whatItCalculates: 'Präzise Finanzkennzahlen und Verhältnisse.',
    howToUse: ['Eingaben vornehmen.', 'Sofortige Berechnung.', 'Ergebnisse prüfen.'],
    formula: \`${formula}\`,
    inputs: [
      { name: \`${input1Name}\`, description: \`${input1Desc}\`, unit: 'USD ($)', optional: false }
    ],
    workedExample: {
      scenario: \`${workedScenario}\`,
      stepByStep: [\`${workedStep1}\`, \`${workedStep2}\`, \`${workedStep3}\`],
      result: \`${workedResult}\`
    },
    understandingResults: 'Mathematische Auswertung der eingegebenen Daten.',
    assumptions: 'Standardmäßige Finanzannahmen.',
    limitations: 'Zu Informations- und Planungszwecken.',
    faqs: [{ question: 'Wie funktioniert der Rechner?', answer: 'Wendet etablierte Finanzformeln an.' }],
    relatedTools
  })
};
`;
};

// Generate specialized modules
let fullExportMapCode = `import { ToolContentDetails } from '../types';\nimport { ToolDef, Language } from '../../../types';\nimport { WACC_KNOWLEDGE } from './waccAndValuationContent';\n\n`;

financeAndCurrencyTools.forEach(t => {
  if (t.id === 'wacc-calculator') return; // handled in waccAndValuationContent
  const code = buildToolKnowledgeCode(t.id, t.slug);
  const constName = `KNOWLEDGE_${t.id.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`;
  fullExportMapCode += code + `\n`;
});

fullExportMapCode += `\nexport const MASTER_FINANCE_SPECIALIZED_HANDLERS: Record<string, any> = {\n`;
fullExportMapCode += `  'wacc-calculator': WACC_KNOWLEDGE,\n`;

financeAndCurrencyTools.forEach(t => {
  if (t.id === 'wacc-calculator') return;
  const constName = `KNOWLEDGE_${t.id.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`;
  fullExportMapCode += `  '${t.id}': ${constName},\n`;
  fullExportMapCode += `  '${t.slug}': ${constName},\n`;
});

fullExportMapCode += `};\n`;

const targetPath = path.join(process.cwd(), 'src/data/calculatorKnowledge/specializedFinanceContent/masterFinanceSpecializedContent.ts');
fs.writeFileSync(targetPath, fullExportMapCode, 'utf-8');

console.log(`Master Finance Knowledge module written to ${targetPath}`);
