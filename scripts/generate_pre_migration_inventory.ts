import * as fs from 'fs';
import * as path from 'path';
import { TOOLS } from '../src/data/tools';
import { selectedP1Wave2Ids } from './check_p1_wave2_selection';

console.log(`=== STEP 2: PRE-MIGRATION INVENTORY REPORT FOR P1 WAVE 2 (${selectedP1Wave2Ids.length} TOOLS) ===\n`);

const preInventory = selectedP1Wave2Ids.map(id => {
  const t = TOOLS.find(x => x.id === id);
  return {
    id,
    slug: t?.slug || '',
    category: t?.categoryId || '',
    oldClassification: 'GENERIC ENGINE',
    oldComponent: 'UniversalToolEngine.tsx',
    oldCalculationEngine: 'Generic Arithmetic Fallback (ValA * (1 + ValB/100))',
    genericUiPresent: 'YES (Base Value, Factor %, Secondary Multiplier, Dynamic Analytics)',
    routes: `EN: /en/tool/${t?.slug}, AR: /ar/tool/${t?.slug}, ES: /es/tool/${t?.slug}, FR: /fr/tool/${t?.slug}, DE: /de/tool/${t?.slug}`,
    knownProblems: 'Unspecialized fallback controls, generic inputs/outputs, non-domain calculation logic'
  };
});

console.table(preInventory);
