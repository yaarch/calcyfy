import { TOOLS } from './src/data/tools';
import { getToolContentDetails } from './src/utils/toolContentEngine';
import { Language } from './src/types';

const targetTools = [
  { id: 'wacc-calculator', label: 'WACC' },
  { id: 'dscr-calculator', label: 'DSCR' },
  { id: 'options-black-scholes', label: 'Black-Scholes' },
  { id: 'cap-rate', label: 'Cap Rate' },
  { id: 'debt-payoff', label: 'Debt-to-Income / Debt Payoff' },
  { id: 'kidney-gfr-calculator', label: 'eGFR / GFR' },
  { id: 'mean-arterial-pressure', label: 'MAP' },
  { id: 'target-heart-rate', label: 'Target Heart Rate' },
  { id: 'matrix-inverse-calc', label: 'Matrix Inverse' },
  { id: 'matrix-determinant', label: 'Matrix Determinant' },
  { id: 'unit-vector-calculator', label: 'Vector Calculator' },
  { id: 'exponential-decay-growth', label: 'Differential Equation' },
  { id: 'unit-converter', label: 'Length / Unit Converter' },
  { id: 'temperature', label: 'Temperature Converter' },
  { id: 'currency', label: 'Currency Converter' }
];

console.log('====================================================');
console.log('CALCYFY CONTENT ARCHITECTURE RENDERED EVIDENCE CHECK');
console.log('====================================================\n');

targetTools.forEach((item, index) => {
  const tool = TOOLS.find(t => t.id === item.id);
  if (!tool) {
    console.log(`[ERROR] Tool ID not found: ${item.id}`);
    return;
  }
  const content = getToolContentDetails(tool, 'en');
  console.log(`\n### TOOL #${index + 1}: ${item.label} (${content.toolName})`);
  console.log(`* **ID**: \`${tool.id}\``);
  console.log(`* **Slug**: \`${tool.slug}\``);
  console.log(`* **Category / Subcategory**: \`${tool.categoryId}\` / \`${tool.subcategoryId || 'N/A'}\``);
  console.log(`\n**Introduction**:`);
  console.log(content.intro);
  console.log(`\n**Formula**:`);
  console.log(content.formula || 'N/A');
  console.log(`\n**Variables**:`);
  if (content.formulaVariables && content.formulaVariables.length > 0) {
    content.formulaVariables.forEach(v => {
      console.log(`  - \`${v.symbol}\`: ${v.name} -> ${v.explanation}`);
    });
  } else {
    console.log(`  (No specific formula variables structured)`);
  }
  console.log(`\n**Worked Example**:`);
  console.log(`  - **Scenario**: ${content.workedExample.scenario}`);
  console.log(`  - **Steps**:`);
  content.workedExample.stepByStep.forEach((s, idx) => console.log(`    ${idx + 1}. ${s}`));
  console.log(`  - **Final Result**: ${content.workedExample.result}`);
  console.log(`\n**Assumptions**:`);
  console.log(content.assumptions || 'N/A');
  console.log(`\n**Limitations**:`);
  console.log(content.limitations || 'N/A');
  console.log(`\n**FAQs**:`);
  content.faqs.forEach((faq, fIdx) => {
    console.log(`  Q${fIdx + 1}: ${faq.question}`);
    console.log(`  A${fIdx + 1}: ${faq.answer}`);
  });
  console.log(`\n**Related Tools**:`);
  content.relatedTools.forEach(r => console.log(`  - \`${r.id}\` (\`${r.slug}\`)`));
});
