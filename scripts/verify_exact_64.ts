import { TOOLS } from '../src/data/tools';
import * as fs from 'fs';
import * as path from 'path';

const p0List = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'scripts/p0_extracted_from_matrix.json'), 'utf-8'));
const toolPageContent = fs.readFileSync(path.join(process.cwd(), 'src/components/ToolPage.tsx'), 'utf-8');

console.log(`Checking ${p0List.length} P0 tools...`);

let okCount = 0;
let failCount = 0;

p0List.forEach((t: any) => {
  const toolObj = TOOLS.find(x => x.id === t.id);
  const caseRegex = new RegExp(`case\\s+['"]${t.id}['"]`, 'g');
  const routed = caseRegex.test(toolPageContent);

  if (!toolObj) {
    console.error(`MISSING IN TOOLS.TS: ${t.id}`);
    failCount++;
  } else if (!routed) {
    console.error(`NOT ROUTED IN TOOLPAGE: ${t.id}`);
    failCount++;
  } else {
    okCount++;
  }
});

console.log(`RESULT: ${okCount} OK, ${failCount} FAILED.`);
