import * as fs from 'fs';
import * as path from 'path';
import { TOOLS } from '../src/data/tools';

const selectedP1Ids = [
  // Unit Converters (5)
  'pressure-unit',
  'energy-power',
  'angle-unit',
  'force-unit',
  'torque-unit',

  // Math (5)
  'matrix-mult',
  'matrix-determinant',
  'combination-permutation',
  'velocity-acceleration',
  'kinetic-energy',

  // Finance (6)
  'payback-period',
  'vat-reverse',
  'commission-calc',
  'appreciation-calc',
  'depreciation-straight',
  'debt-snowball',

  // Developer / Utilities (6)
  'hash-generator',
  'html-entity',
  'resistor-color',
  'ohms-law',
  'json-minify',
  'url-parser'
];

console.log(`Checking ${selectedP1Ids.length} selected P1 Wave 1 tools...`);

const toolPageContent = fs.readFileSync(path.join(process.cwd(), 'src/components/ToolPage.tsx'), 'utf-8');

const report: any[] = [];

selectedP1Ids.forEach(id => {
  const toolObj = TOOLS.find(t => t.id === id);
  const caseRegex = new RegExp(`case\\s+['"]${id}['"]`, 'g');
  const isRouted = caseRegex.test(toolPageContent);

  report.push({
    id,
    foundInToolsTs: !!toolObj,
    title: toolObj?.id,
    categoryId: toolObj?.categoryId,
    currentlyRoutedInToolPage: isRouted
  });
});

console.table(report);
