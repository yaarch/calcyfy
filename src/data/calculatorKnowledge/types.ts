import { Language, ToolDef } from '../../types';

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolInputExplanation {
  name: string;
  description: string;
  unit?: string;
  optional?: boolean;
}

export interface ToolWorkedExample {
  scenario: string;
  stepByStep: string[];
  result: string;
}

export interface ToolFormulaVariable {
  symbol?: string;
  name?: string;
  explanation?: string;
  description?: string;
  unit?: string;
  optional?: boolean;
}

export interface ToolContentDetails {
  toolName?: string;
  intro?: string;
  overview?: string;
  whoUsesIt?: string;
  howToUse?: string[];
  whatItCalculates?: string;
  formula?: string;
  formulaVariables?: ToolFormulaVariable[];
  inputs?: ToolInputExplanation[];
  unitsAndConversions?: string;
  workedExample?: ToolWorkedExample;
  understandingResults?: string;
  interpretation?: string;
  assumptions?: string;
  limitations?: string;
  faqs: ToolFaq[];
  relatedTools: ToolDef[];
}
