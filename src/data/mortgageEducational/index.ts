import { Language } from '../../types';
import { MortgageEducationalData } from './types';
import { MORTGAGE_EDUCATIONAL_EN } from './en';
import { MORTGAGE_EDUCATIONAL_AR } from './ar';
import { MORTGAGE_EDUCATIONAL_ES } from './es';
import { MORTGAGE_EDUCATIONAL_FR } from './fr';
import { MORTGAGE_EDUCATIONAL_DE } from './de';

export * from './types';

export const MORTGAGE_EDUCATIONAL_CONTENT: Record<Language, MortgageEducationalData> = {
  en: MORTGAGE_EDUCATIONAL_EN,
  ar: MORTGAGE_EDUCATIONAL_AR,
  es: MORTGAGE_EDUCATIONAL_ES,
  fr: MORTGAGE_EDUCATIONAL_FR,
  de: MORTGAGE_EDUCATIONAL_DE,
};
