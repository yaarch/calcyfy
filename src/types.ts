export type Language = 'en' | 'ar' | 'es' | 'fr' | 'de';

export type CategoryId =
  | 'finance'
  | 'math'
  | 'health'
  | 'date'
  | 'converters'
  | 'currency'
  | 'text'
  | 'pdf-image'
  | 'developer'
  | 'everyday';

export type ToolId = string;

export interface CategoryDef {
  id: CategoryId;
  iconName: string;
  slug: string;
  color: string;
  toolCount: number;
}

export interface ToolDef {
  id: ToolId;
  slug: string;
  categoryId: CategoryId;
  iconName: string;
  popular: boolean;
  implemented: boolean;
  badge?: string;
}

export interface HistoryItem {
  id: string;
  toolId: ToolId;
  timestamp: number;
  summary: string;
  result: string;
}

export type Tool = ToolDef;
export type Category = CategoryDef;
