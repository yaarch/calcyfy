import { TOOLS } from '../src/data/tools.js';

const cagrTools = TOOLS.filter(t => t.id.includes('cagr') || t.id.includes('roi') || t.slug.includes('cagr') || t.slug.includes('roi'));
console.log('CAGR / ROI related tools in TOOLS:', cagrTools);
