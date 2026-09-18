import { TOOLS } from '../src/data/tools';
import { getToolContentDetails } from '../src/utils/toolContentEngine';

const financeAndCurrencyTools = TOOLS.filter(t => t.categoryId === 'finance' || t.categoryId === 'currency' || t.id.includes('loan') || t.id.includes('interest') || t.id.includes('savings') || t.id.includes('mortgage') || t.id.includes('tax') || t.id.includes('discount') || t.id.includes('markup') || t.id.includes('compound') || t.id.includes('salary') || t.id.includes('currency') || t.id.includes('crypto'));

console.log(`Auditing content for ${financeAndCurrencyTools.length} Finance & Currency tools...\n`);

let genericFallbackCount = 0;
let customHandlerCount = 0;

const genericPhrases = [
  'financial, medical, and scientific',
  'Primary Parameter',
  'Secondary Variable',
  'verified numerical inputs',
  'standard physical and financial',
  'instant quantitative result',
  'baseline conditions'
];

financeAndCurrencyTools.forEach((t, i) => {
  const detailsEN = getToolContentDetails(t, 'en');
  const detailsAR = getToolContentDetails(t, 'ar');

  const enText = JSON.stringify(detailsEN);
  const arText = JSON.stringify(detailsAR);

  let hasGenericText = false;
  let matchedPhrases: string[] = [];

  genericPhrases.forEach(p => {
    if (enText.includes(p) || arText.includes(p)) {
      hasGenericText = true;
      matchedPhrases.push(p);
    }
  });

  if (hasGenericText) {
    genericFallbackCount++;
    console.log(`[GENERIC] ${i + 1}. ID: ${t.id} | Slug: ${t.slug} | Matches: ${matchedPhrases.join(', ')}`);
  } else {
    customHandlerCount++;
    console.log(`[SPECIALIZED CONTENT] ${i + 1}. ID: ${t.id} | Slug: ${t.slug} | Formula: ${detailsEN.formula ? 'YES' : 'NO'}`);
  }
});

console.log(`\nTotals: ${financeAndCurrencyTools.length} Tools | Specialized Content: ${customHandlerCount} | Generic Content: ${genericFallbackCount}`);
