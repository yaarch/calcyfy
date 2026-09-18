import * as fs from 'fs';
import * as path from 'path';

const matrixContent = fs.readFileSync(path.join(process.cwd(), 'scripts/387_REMEDIATION_MATRIX.md'), 'utf-8');

const lines = matrixContent.split('\n');
const p0Tools: { id: string; name: string; category: string; oldComponent: string; classification: string; engine: string }[] = [];

lines.forEach(line => {
  if (line.includes('|') && line.includes('**P0**')) {
    const parts = line.split('|').map(p => p.trim());
    if (parts.length >= 10) {
      const rawId = parts[1].replace(/`/g, '');
      const name = parts[2];
      const category = parts[3];
      const classification = parts[4].replace(/\*\*/g, '');
      const oldComponent = parts[5];
      const engine = parts[7].replace(/\*\*/g, '');

      p0Tools.push({
        id: rawId,
        name,
        category,
        classification,
        oldComponent,
        engine
      });
    }
  }
});

console.log(`Extracted ${p0Tools.length} P0 tools from 387_REMEDIATION_MATRIX.md`);
fs.writeFileSync(
  path.join(process.cwd(), 'scripts/p0_extracted_from_matrix.json'),
  JSON.stringify(p0Tools, null, 2)
);
