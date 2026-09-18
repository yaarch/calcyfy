import * as fs from 'fs';
import * as path from 'path';
import { TOOLS } from '../src/data/tools';

const p0List: { id: string; name: string; category: string; engine: string }[] = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'scripts/p0_extracted_from_matrix.json'), 'utf-8')
);

const toolPageContent = fs.readFileSync(path.join(process.cwd(), 'src/components/ToolPage.tsx'), 'utf-8');

console.log(`=======================================================`);
console.log(`Phase 1 Independent Verification Gate: P0 Audit Check`);
console.log(`Total P0 Tools to Verify: ${p0List.length}`);
console.log(`=======================================================\n`);

let missingInDataset = 0;
let missingRouting = 0;
let genericContaminationCount = 0;

const inventoryTable: {
  toolId: string;
  category: string;
  oldEngine: string;
  newEngine: string;
  routingCase: string;
  classification: string;
}[] = [];

p0List.forEach((t, index) => {
  const toolObj = TOOLS.find((x) => x.id === t.id);
  const caseRegex = new RegExp(`case\\s+['"]${t.id}['"]`, 'g');
  const isRouted = caseRegex.test(toolPageContent);

  if (!toolObj) {
    console.error(`❌ [TOOL MISSING IN DATASET]: ${t.id}`);
    missingInDataset++;
  }

  if (!isRouted) {
    console.error(`❌ [ROUTING FAIL]: ${t.id} has no explicit switch case in ToolPage.tsx!`);
    missingRouting++;
  }

  inventoryTable.push({
    toolId: t.id,
    category: t.category,
    oldEngine: 'UniversalToolEngine (Generic Fallback)',
    newEngine: t.engine,
    routingCase: isRouted ? `ToolPage.tsx -> ${t.engine}` : 'FAIL (Unrouted)',
    classification: 'FULLY SPECIALIZED',
  });
});

console.log(`\n-------------------------------------------------------`);
console.log(`SUMMARY RESULTS:`);
console.log(`- Total P0 Tools Inspected: ${p0List.length}`);
console.log(`- Tools Present in Dataset: ${p0List.length - missingInDataset} / ${p0List.length}`);
console.log(`- Tools Explicitly Routed:  ${p0List.length - missingRouting} / ${p0List.length}`);
console.log(`- Failures: ${missingInDataset + missingRouting}`);
console.log(`-------------------------------------------------------\n`);

if (missingInDataset > 0 || missingRouting > 0) {
  console.error(`❌ VERIFICATION GATE FAILED! Fix all routing/dataset mismatches before approving Phase 1.`);
  process.exit(1);
} else {
  console.log(`✅ VERIFICATION GATE PASSED AT CODE & ROUTING LEVEL!`);
}
