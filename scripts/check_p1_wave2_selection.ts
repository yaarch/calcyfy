import * as fs from 'fs';
import * as path from 'path';
import { TOOLS } from '../src/data/tools';

export const selectedP1Wave2Ids = [
  // Developer & Network Tools (6)
  'uuid-generator',
  'chmod-permissions',
  'ip-subnet-calc',
  'color-contrast-ratio',
  'jwt-decoder',
  'csv-to-json',

  // Text & SEO Tools (5)
  'reading-time',
  'keyword-density-checker',
  'meta-description-length',
  'case-converter-camel-snake',
  'flesch-kincaid-readability',

  // Health & Fitness Tools (5)
  'one-rep-max',
  'pace-runner',
  'macro-split',
  'blood-alcohol',
  'protein-intake',

  // Date & Time Tools (6)
  'time-duration-between',
  'date-add-subtract',
  'unix-timestamp-converter',
  'work-days-count',
  'leap-year-checker',
  'age-in-days-hours-seconds'
];

const toolPageContent = fs.readFileSync(path.join(process.cwd(), 'src/components/ToolPage.tsx'), 'utf-8');

console.log(`Checking Wave 2 Selection (${selectedP1Wave2Ids.length} tools)...`);

let missingInTools = 0;
let alreadyRouted = 0;

selectedP1Wave2Ids.forEach(id => {
  const toolObj = TOOLS.find(t => t.id === id);
  const caseRegex = new RegExp(`case\\s+['"]${id}['"]`, 'g');
  const isRouted = caseRegex.test(toolPageContent);

  if (!toolObj) {
    console.error(`❌ Missing in TOOLS array: ${id}`);
    missingInTools++;
  }
  if (isRouted) {
    console.warn(`⚠️ Already explicitly routed in ToolPage.tsx: ${id}`);
    alreadyRouted++;
  }
  console.log(`  ✓ Tool: ${id} | Found: ${!!toolObj} | Currently Routed: ${isRouted}`);
});

if (missingInTools === 0 && alreadyRouted === 0) {
  console.log(`\n✅ All ${selectedP1Wave2Ids.length} candidate tools are valid and ready for Wave 2!`);
} else {
  console.log(`\nCheck results: Missing: ${missingInTools}, Already Routed: ${alreadyRouted}`);
}
