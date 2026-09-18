import fs from 'fs';
import path from 'path';
import { TOOLS } from '../src/data/tools.js';

// Search files in src/
function searchFiles(dir: string, pattern: RegExp): { file: string; matches: string[] }[] {
  let results: { file: string; matches: string[] }[] = [];
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const fullPath = path.join(dir, f);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(searchFiles(fullPath, pattern));
    } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const matches = content.match(pattern);
      if (matches) {
        results.push({ file: fullPath, matches });
      }
    }
  }
  return results;
}

console.log('=== GENERIC ENGINE CODEBASE SCAN ===');

// 1. Check UniversalToolEngine fallback
const universalPath = path.join(process.cwd(), 'src/components/calculators/UniversalToolEngine.tsx');
const universalContent = fs.readFileSync(universalPath, 'utf-8');

console.log('UniversalToolEngine file size:', universalContent.length);

// 2. Generic labels search
const genericLabels = [
  'Base Value / Amount',
  'Factor / Rate',
  'Secondary Multiplier',
  'Calculated Dynamic Output',
  'Added Difference',
  'Multiplied Product',
  'Dynamic Analytics',
  'Result = Base Value × (1 + Rate / 100)'
];

for (const label of genericLabels) {
  const occ = (universalContent.match(new RegExp(label.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g')) || []).length;
  console.log(`Generic string "${label}": ${occ} occurrences in UniversalToolEngine.tsx`);
}

// 3. Fallback lines in UniversalToolEngine.tsx
const fallbackIndex = universalContent.indexOf('// Default fallback for any remaining long-tail tools');
console.log('Fallback section exists:', fallbackIndex !== -1);
