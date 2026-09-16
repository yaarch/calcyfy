import { TOOLS } from '../src/data/tools.js';
import { TRANSLATIONS } from '../src/i18n/translations.js';

let countWithTranslation = 0;
let countWithoutTranslation = 0;

for (const tool of TOOLS) {
  const key = `tool_${tool.id.replace(/-/g, '_')}_name`;
  if ((TRANSLATIONS.en as any)[key]) {
    countWithTranslation++;
  } else {
    countWithoutTranslation++;
  }
}

console.log(`Total tools: ${TOOLS.length}`);
console.log(`Tools with i18n translation key in English: ${countWithTranslation}`);
console.log(`Tools without explicit translation key in English: ${countWithoutTranslation}`);

