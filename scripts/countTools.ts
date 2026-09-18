import { TOOLS } from '../src/data/tools.js';

console.log('Total tools count in TOOLS:', TOOLS.length);

// Check categories
const catCounts: Record<string, number> = {};
for (const t of TOOLS) {
  catCounts[t.categoryId] = (catCounts[t.categoryId] || 0) + 1;
}
console.log('Category breakdown:', catCounts);
