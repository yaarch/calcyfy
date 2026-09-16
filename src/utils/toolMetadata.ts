import { Language, ToolDef } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

// Common technical acronyms and domain terms to preserve uppercase
const ACRONYMS: Record<string, string> = {
  bmi: 'BMI',
  bmr: 'BMR',
  tdee: 'TDEE',
  gpa: 'GPA',
  roi: 'ROI',
  cagr: 'CAGR',
  irr: 'IRR',
  npv: 'NPV',
  ebitda: 'EBITDA',
  dscr: 'DSCR',
  wacc: 'WACC',
  apr: 'APR',
  apy: 'APY',
  emi: 'EMI',
  cd: 'CD',
  '401k': '401(k)',
  ira: 'IRA',
  vat: 'VAT',
  gst: 'GST',
  awg: 'AWG',
  rc: 'RC',
  rlc: 'RLC',
  led: 'LED',
  ac: 'AC',
  dc: 'DC',
  dbm: 'dBm',
  db: 'dB',
  rf: 'RF',
  pcb: 'PCB',
  ip: 'IP',
  cidr: 'CIDR',
  dns: 'DNS',
  mac: 'MAC',
  tcp: 'TCP',
  udp: 'UDP',
  ssl: 'SSL',
  tls: 'TLS',
  jwt: 'JWT',
  url: 'URL',
  uri: 'URI',
  uuid: 'UUID',
  guid: 'GUID',
  json: 'JSON',
  xml: 'XML',
  yaml: 'YAML',
  csv: 'CSV',
  sql: 'SQL',
  html: 'HTML',
  css: 'CSS',
  svg: 'SVG',
  png: 'PNG',
  jpg: 'JPG',
  jpeg: 'JPEG',
  webp: 'WebP',
  pdf: 'PDF',
  dpi: 'DPI',
  ppi: 'PPI',
  fps: 'FPS',
  wh: 'Watt-Hour',
  ah: 'Amp-Hour',
  kw: 'kW',
  kwh: 'kWh',
  btu: 'BTU',
  psi: 'PSI',
  bar: 'Bar',
  mpa: 'MPa',
  kpa: 'kPa',
  ppm: 'PPM',
  us: 'US',
  uk: 'UK',
  eu: 'EU',
  who: 'WHO',
  flesch: 'Flesch',
  kincaid: 'Kincaid',
  fibonacci: 'Fibonacci',
  pythagorean: 'Pythagorean',
  boyles: "Boyle's",
  charles: "Charles's",
  ohm: "Ohm's",
  ohms: "Ohm's",
  calc: 'Calculator',
};

const LOWERCASE_WORDS = new Set(['and', 'or', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'a', 'an', 'the', 'per', 'vs']);

/**
 * Derives a clean human-readable name from a calculator slug.
 * Example: "concrete-slab-volume-yardage-calculator" -> "Concrete Slab Volume Yardage Calculator"
 * Example: "rc-low-pass-high-pass-cutoff-frequency" -> "RC Low Pass & High Pass Cutoff Frequency Calculator"
 */
export function formatSlugToName(slug: string): string {
  if (!slug) return 'Calculator';

  const parts = slug.split('-').filter(Boolean);
  const formattedWords: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].toLowerCase();

    if (ACRONYMS[part]) {
      formattedWords.push(ACRONYMS[part]);
    } else if (i > 0 && i < parts.length - 1 && LOWERCASE_WORDS.has(part)) {
      formattedWords.push(part);
    } else {
      // Capitalize first letter
      formattedWords.push(part.charAt(0).toUpperCase() + part.slice(1));
    }
  }

  let result = formattedWords.join(' ');

  // Ensure title ends with a clear descriptor if missing
  const hasSuffix = /calculator|converter|generator|tester|checker|counter|translator|estimator|planner|simplifier|solver|analyzer/i.test(
    result
  );

  if (!hasSuffix) {
    result += ' Calculator';
  }

  return result;
}

/**
 * Checks if a string is a raw translation key or untranslated placeholder.
 */
export function isRawTranslationKey(str: string | undefined | null): boolean {
  if (!str) return true;
  const trimmed = str.trim();
  if (trimmed.length === 0) return true;
  if (/^tool_[a-z0-9_]+_(name|desc)$/i.test(trimmed)) return true;
  if (/^cat_[a-z0-9_]+$/i.test(trimmed)) return true;
  if (/^lbl_[a-z0-9_]+$/i.test(trimmed)) return true;
  return false;
}

/**
 * Resolves a safe, localized calculator name.
 * Robust fallback hierarchy:
 * 1. Localized translation key in target language (if valid and not raw key)
 * 2. Dedicated translation in English (if target lang is English or missing)
 * 3. Human-readable name derived from canonical slug
 * NEVER returns a raw translation key.
 */
export function getToolName(
  tool: ToolDef,
  lang: Language = 'en',
  t?: (key: string, def?: string) => string
): string {
  if (!tool) return 'Calculator';

  const toolKey = tool.id.replace(/-/g, '_');
  const translationKey = `tool_${toolKey}_name`;

  // 1. Try provided t function if available
  if (t) {
    const candidate = t(translationKey, '');
    if (candidate && !isRawTranslationKey(candidate)) {
      return candidate;
    }
  }

  // 2. Check direct dictionary for the given language
  const langDict = TRANSLATIONS[lang] || {};
  if (langDict[translationKey] && !isRawTranslationKey(langDict[translationKey])) {
    return langDict[translationKey];
  }

  // 3. If target language has no key, check English dictionary
  if (TRANSLATIONS.en[translationKey] && !isRawTranslationKey(TRANSLATIONS.en[translationKey])) {
    const enName = TRANSLATIONS.en[translationKey];
    const enClean = enName.replace(/\s+Calculator$/i, '');
    // If target language is non-English, provide localized prefix wrapper
    if (lang === 'ar') return `حاسبة ${enClean}`;
    if (lang === 'es') return `Calculadora de ${enClean}`;
    if (lang === 'fr') return `Calculateur de ${enClean}`;
    if (lang === 'de') return `${enClean} Rechner`;
    return enName;
  }

  // 4. Derive clean human-readable name from the canonical slug
  const baseName = formatSlugToName(tool.slug || tool.id);
  const baseClean = baseName.replace(/\s+Calculator$/i, '');

  if (lang === 'ar') return `حاسبة ${baseClean}`;
  if (lang === 'es') return `Calculadora de ${baseClean}`;
  if (lang === 'fr') return `Calculateur de ${baseClean}`;
  if (lang === 'de') return `${baseClean} Rechner`;

  return baseName;
}

/**
 * Resolves a safe, localized calculator description.
 * Robust fallback hierarchy:
 * 1. Localized translation key in target language (if valid and not raw key)
 * 2. Dedicated translation in English (if target lang is English or missing)
 * 3. Human-readable localized description derived from tool name and category
 * NEVER returns a raw translation key.
 */
export function getToolDescription(
  tool: ToolDef,
  lang: Language = 'en',
  t?: (key: string, def?: string) => string
): string {
  if (!tool) return 'Free, accurate online calculator.';

  const toolKey = tool.id.replace(/-/g, '_');
  const translationKey = `tool_${toolKey}_desc`;

  // 1. Try provided t function if available
  if (t) {
    const candidate = t(translationKey, '');
    if (candidate && !isRawTranslationKey(candidate)) {
      return candidate;
    }
  }

  // 2. Check direct dictionary for the given language
  const langDict = TRANSLATIONS[lang] || {};
  if (langDict[translationKey] && !isRawTranslationKey(langDict[translationKey])) {
    return langDict[translationKey];
  }

  // 3. Check English dictionary if target is English
  if (lang === 'en' && TRANSLATIONS.en[translationKey] && !isRawTranslationKey(TRANSLATIONS.en[translationKey])) {
    return TRANSLATIONS.en[translationKey];
  }

  // 4. Construct language-specific descriptive fallback
  const toolName = getToolName(tool, lang, t);

  switch (lang) {
    case 'ar':
      return `احسب ${toolName} بسرعة ودقة عبر الإنترنت مع نتائج فورية وخطوات تفصيلية مجاناً دون الحاجة للتسجيل.`;
    case 'es':
      return `Calcula ${toolName.toLowerCase()} de forma rápida y precisa con nuestra herramienta gratuita en línea con fórmulas y pasos detallados.`;
    case 'fr':
      return `Calculez ${toolName.toLowerCase()} rapidement et précisément avec notre outil en ligne gratuit incluant formules et étapes détaillées.`;
    case 'de':
      return `Berechnen Sie ${toolName} schnell und präzise mit unserem kostenlosen Online-Rechner inklusive Formeln und Erklärungen.`;
    case 'en':
    default:
      return `Calculate ${toolName.toLowerCase()} quickly and accurately with our free online calculator. Get instant results, step-by-step formulas, and practical examples.`;
  }
}
