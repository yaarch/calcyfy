import fs from 'fs';
import path from 'path';

const universal = fs.readFileSync(path.join(process.cwd(), 'src/components/calculators/UniversalToolEngine.tsx'), 'utf-8');
console.log('Contains cagr in UniversalToolEngine:', universal.includes('cagr'));
const matches = universal.match(/[^\n]*cagr[^\n]*/gi);
console.log('Matches for cagr in UniversalToolEngine:', matches);

const suite = fs.readFileSync(path.join(process.cwd(), 'src/components/calculators/SuiteCalculators.tsx'), 'utf-8');
console.log('Contains cagr in SuiteCalculators:', suite.includes('cagr'));
const suiteMatches = suite.match(/[^\n]*cagr[^\n]*/gi);
console.log('Matches for cagr in SuiteCalculators:', suiteMatches);
