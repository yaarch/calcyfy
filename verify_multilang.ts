import { TOOLS } from './src/data/tools';
import { getToolContentDetails } from './src/utils/toolContentEngine';
import { Language } from './src/types';

const selectedToolIds = [
  'wacc-calculator',
  'kidney-gfr-calculator',
  'matrix-inverse-calc',
  'currency',
  'unit-converter'
];

const languages: Language[] = ['en', 'ar', 'es', 'fr', 'de'];

console.log('====================================================');
console.log('MULTI-LANGUAGE RENDERED CONTENT AUDIT (5 LANGUAGES)');
console.log('====================================================\n');

selectedToolIds.forEach((toolId) => {
  const tool = TOOLS.find(t => t.id === toolId);
  if (!tool) return;

  console.log(`\n====================================================`);
  console.log(`TOOL: ${tool.id} (${tool.slug})`);
  console.log(`====================================================`);

  languages.forEach((lang) => {
    const content = getToolContentDetails(tool, lang);
    console.log(`\n--- LANGUAGE: [${lang.toUpperCase()}] ---`);
    console.log(`Tool Name: ${content.toolName}`);
    console.log(`Intro: ${content.intro}`);
    console.log(`Formula: ${content.formula || 'N/A'}`);
    console.log(`Worked Example Scenario: ${content.workedExample.scenario}`);
    console.log(`Worked Example Result: ${content.workedExample.result}`);
    console.log(`Assumptions: ${content.assumptions || 'N/A'}`);
    console.log(`Limitations: ${content.limitations || 'N/A'}`);
    console.log(`FAQs (${content.faqs.length}):`);
    content.faqs.forEach((faq, idx) => {
      console.log(`  [Q${idx + 1}] ${faq.question}`);
      console.log(`  [A${idx + 1}] ${faq.answer}`);
    });
  });
});
