import { TOOLS } from '../src/data/tools';

const financeAndCurrencyTools = TOOLS.filter(t => t.categoryId === 'finance' || t.categoryId === 'currency' || t.id.includes('loan') || t.id.includes('interest') || t.id.includes('savings') || t.id.includes('mortgage') || t.id.includes('tax') || t.id.includes('discount') || t.id.includes('markup') || t.id.includes('compound') || t.id.includes('salary') || t.id.includes('currency') || t.id.includes('crypto'));

console.log(`Total Tools: ${financeAndCurrencyTools.length}\n`);

financeAndCurrencyTools.forEach((t, i) => {
  console.log(`${i + 1}. ${t.id} (${t.slug})`);
});
