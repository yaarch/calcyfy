import { TOOLS } from './src/data/tools';
import { getToolContentDetails } from './src/utils/toolContentEngine';
import { Language } from './src/types';

const targetTools = [
  'wacc-calculator',
  'dscr-calculator',
  'options-black-scholes',
  'cap-rate',
  'debt-payoff',
  'kidney-gfr-calculator',
  'mean-arterial-pressure',
  'target-heart-rate',
  'matrix-inverse-calc',
  'matrix-determinant',
  'unit-vector-calculator',
  'exponential-decay-growth',
  'unit-converter',
  'temperature',
  'currency'
];

console.log('=== PART 1: RENDERED CONTENT EVIDENCE ===');

targetTools.forEach((toolId, index) => {
  const tool = TOOLS.find(t => t.id === toolId);
  if (!tool) {
    console.log(`Tool ${toolId} not found`);
    return;
  }
  const content = getToolContentDetails(tool, 'en');
  console.log(`\n========================================`);
  console.log(`TOOL #${index + 1}: ${content.toolName} (ID: ${tool.id} | SLUG: ${tool.slug})`);
  console.log(`========================================`);
  console.log(`[INTRODUCTION]\n${content.intro}`);
  console.log(`\n[FORMULA]\n${content.formula}`);
  console.log(`\n[VARIABLES]`);
  if (content.formulaVariables && content.formulaVariables.length > 0) {
    content.formulaVariables.forEach(v => console.log(`  - ${v.symbol}: ${v.name} -> ${v.explanation}`));
  } else {
    console.log('  (No variables listed)');
  }
  console.log(`\n[WORKED EXAMPLE]`);
  console.log(`  Scenario: ${content.workedExample.scenario}`);
  console.log(`  Steps:`);
  content.workedExample.stepByStep.forEach((step, i) => console.log(`    Step ${i+1}: ${step}`));
  console.log(`  Result: ${content.workedExample.result}`);
  console.log(`\n[ASSUMPTIONS]\n${content.assumptions}`);
  console.log(`\n[LIMITATIONS]\n${content.limitations}`);
  console.log(`\n[FAQs]`);
  content.faqs.forEach(f => console.log(`  Q: ${f.question}\n  A: ${f.answer}`));
  console.log(`\n[RELATED TOOLS]`);
  content.relatedTools.forEach(r => console.log(`  - ${r.id} (${r.slug})`));
});
