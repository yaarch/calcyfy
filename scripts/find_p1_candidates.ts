import * as fs from 'fs';
import * as path from 'path';

const matrixContent = fs.readFileSync(path.join(process.cwd(), 'scripts/387_REMEDIATION_MATRIX.md'), 'utf-8');
const toolPageContent = fs.readFileSync(path.join(process.cwd(), 'src/components/ToolPage.tsx'), 'utf-8');

const lines = matrixContent.split('\n');
const p1Tools: { id: string; name: string; category: string; oldComponent: string; engine: string }[] = [];

lines.forEach(line => {
  if (line.includes('|') && line.includes('**P1**')) {
    const parts = line.split('|').map(p => p.trim());
    if (parts.length >= 10) {
      const rawId = parts[1].replace(/`/g, '');
      const name = parts[2];
      const category = parts[3];
      const oldComponent = parts[5];
      const engine = parts[7].replace(/\*\*/g, '');

      p1Tools.push({
        id: rawId,
        name,
        category,
        oldComponent,
        engine
      });
    }
  }
});

// Deduplicate by ID
const uniqueP1Map = new Map<string, typeof p1Tools[0]>();
p1Tools.forEach(t => {
  if (!uniqueP1Map.has(t.id)) {
    uniqueP1Map.set(t.id, t);
  }
});

const uniqueP1 = Array.from(uniqueP1Map.values());

// Filter out tools that are ALREADY routed to a specialized engine in ToolPage.tsx
const unmigratedP1 = uniqueP1.filter(t => {
  const caseRegex = new RegExp(`case\\s+['"]${t.id}['"]`, 'g');
  return !caseRegex.test(toolPageContent);
});

console.log(`Total Unique P1 Tools in Matrix: ${uniqueP1.length}`);
console.log(`Unmigrated P1 Tools (routing to fallback): ${unmigratedP1.length}\n`);

unmigratedP1.forEach((t, i) => {
  console.log(`${i+1}. [${t.id}] | ${t.name} | ${t.category} | ${t.engine}`);
});
