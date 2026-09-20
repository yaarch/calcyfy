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
  subcategoryId?: string;
  tags?: string[];
  defaultInputs?: Record<string, number | string>;
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

export interface HreflangLink {
  lang: string;
  href: string;
}

export interface SeoMetadata {
  title: string;
  metaDescription: string;
  keywords: string;
  canonical: string;
  hreflang: HreflangLink[];
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogType: string;
  ogLocale: string;
  twitterTitle: string;
  twitterDescription: string;
  structuredData?: Record<string, any>[];
}

export type ViewType = 'home' | 'tools' | 'category' | 'tool' | 'about' | 'privacy' | 'terms' | 'contact' | 'sitemap' | 'not-found';

export interface RouteInfo {
  view: ViewType;
  lang: Language;
  toolId?: string;
  toolSlug?: string;
  categoryId?: CategoryId;
  categorySlug?: string;
  staticPage?: string;
  path: string;
}

