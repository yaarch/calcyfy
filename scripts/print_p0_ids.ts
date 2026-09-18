import * as fs from 'fs';
import * as path from 'path';

const p0List = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'scripts/p0_extracted_from_matrix.json'), 'utf-8'));

console.log('=== EXACT 64 P0 TOOL IDs FROM REMEDIATION MATRIX ===');
p0List.forEach((t: any, idx: number) => {
  console.log(`${idx + 1}. [${t.id}] - ${t.name} (${t.category}) -> proposed: ${t.engine}`);
});
