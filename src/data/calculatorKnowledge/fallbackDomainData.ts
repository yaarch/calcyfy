import { Language, ToolDef } from '../../types';
import { ToolFaq } from './types';

export type DomainKey =
  | 'personal-finance'
  | 'corporate-finance'
  | 'accounting'
  | 'investing'
  | 'loans'
  | 'real-estate'
  | 'health'
  | 'fitness'
  | 'mathematics'
  | 'statistics'
  | 'linear-algebra'
  | 'calculus'
  | 'science'
  | 'engineering'
  | 'converters'
  | 'currency'
  | 'date-time'
  | 'developer-tools'
  | 'text-tools'
  | 'everyday-tools';

export function detectToolDomain(tool: ToolDef): DomainKey {
  const s = (tool.id + ' ' + (tool.slug || '')).toLowerCase();
  const cat = tool.categoryId || '';

  // Linear Algebra
  if (s.includes('matrix') || s.includes('eigen') || s.includes('vector') || s.includes('determinant') || s.includes('cramer')) {
    return 'linear-algebra';
  }
  // Calculus
  if (s.includes('derivative') || s.includes('integral') || s.includes('calculus') || s.includes('differential') || s.includes('limit') || s.includes('taylor') || s.includes('series')) {
    return 'calculus';
  }
  // Statistics & Probability
  if (s.includes('statistic') || s.includes('deviation') || s.includes('percentile') || s.includes('probability') || s.includes('poisson') || s.includes('binomial') || s.includes('z-score') || s.includes('variance') || s.includes('combinatorics') || s.includes('ncr') || s.includes('median') || s.includes('mode') || s.includes('distribution')) {
    return 'statistics';
  }
  // Engineering & Construction
  if (s.includes('concrete') || s.includes('stair') || s.includes('roof') || s.includes('hvac') || s.includes('btu') || s.includes('wire') || s.includes('awg') || s.includes('flooring') || s.includes('tile') || s.includes('paint') || s.includes('mulch') || s.includes('lumber') || s.includes('torque') || s.includes('pipe') || s.includes('solar') || s.includes('structural')) {
    return 'engineering';
  }
  // Science & Physics
  if (s.includes('physics') || s.includes('kinetic') || s.includes('velocity') || s.includes('acceleration') || s.includes('gravity') || s.includes('gravitational') || s.includes('ohms-law') || s.includes('resistor') || s.includes('capacitor') || s.includes('molarity') || s.includes('gas-law') || s.includes('density') || s.includes('photon') || s.includes('thermodynamic') || s.includes('wavelength') || s.includes('half-life')) {
    return 'science';
  }
  // Currency & Forex
  if (cat === 'currency' || s.includes('currency') || s.includes('forex') || s.includes('exchange-rate') || s.includes('pip-')) {
    return 'currency';
  }
  // Converters
  if (cat === 'converters' || s.includes('converter') || s.includes('px-rem') || s.includes('aspect-ratio') || s.includes('temperature') || s.includes('unit')) {
    return 'converters';
  }
  // Date & Time
  if (cat === 'date' || s.includes('date') || s.includes('age') || s.includes('calendar') || s.includes('time-zone') || s.includes('duration') || s.includes('hours-minutes') || s.includes('biorhythm')) {
    return 'date-time';
  }
  // Developer Tools
  if (cat === 'developer' || s.includes('json') || s.includes('regex') || s.includes('base64') || s.includes('hash') || s.includes('sha') || s.includes('md5') || s.includes('jwt') || s.includes('chmod') || s.includes('subnet') || s.includes('cidr') || s.includes('uuid') || s.includes('binary-hex') || s.includes('sql') || s.includes('cron')) {
    return 'developer-tools';
  }
  // Text Tools
  if (cat === 'text' || s.includes('word-count') || s.includes('case-converter') || s.includes('character-count') || s.includes('slug-gen') || s.includes('diff') || s.includes('lorem') || s.includes('text')) {
    return 'text-tools';
  }
  // Corporate Finance
  if (s.includes('wacc') || s.includes('dscr') || s.includes('ebitda') || s.includes('enterprise-value') || s.includes('working-capital') || s.includes('dupont') || s.includes('dcf') || s.includes('corporate') || s.includes('cost-of-equity')) {
    return 'corporate-finance';
  }
  // Accounting
  if (s.includes('depreciation') || s.includes('amortization') || s.includes('cogs') || s.includes('margin') || s.includes('markup') || s.includes('break-even') || s.includes('inventory') || s.includes('cash-flow') || s.includes('acid-test') || s.includes('quick-ratio') || s.includes('current-ratio') || s.includes('profit-margin')) {
    return 'accounting';
  }
  // Real Estate
  if (s.includes('cap-rate') || s.includes('rental-property') || s.includes('rental-yield') || s.includes('property-tax') || s.includes('real-estate') || s.includes('mortgage') || s.includes('home-equity') || s.includes('rent-vs-buy')) {
    return 'real-estate';
  }
  // Loans & Credit
  if (s.includes('loan') || s.includes('debt') || s.includes('credit-card') || s.includes('interest-only') || s.includes('apr') || s.includes('refinance') || s.includes('balloon-loan') || s.includes('auto-loan')) {
    return 'loans';
  }
  // Investing
  if (s.includes('invest') || s.includes('cagr') || s.includes('roi') || s.includes('dividend') || s.includes('stock') || s.includes('crypto') || s.includes('options') || s.includes('black-scholes') || s.includes('yield') || s.includes('401k') || s.includes('ira') || s.includes('payback') || s.includes('annuity')) {
    return 'investing';
  }
  // Personal Finance
  if (cat === 'finance' || s.includes('salary') || s.includes('tax') || s.includes('budget') || s.includes('savings') || s.includes('net-worth') || s.includes('inflation') || s.includes('freelance') || s.includes('emergency-fund') || s.includes('compound-interest') || s.includes('simple-interest') || s.includes('vat')) {
    return 'personal-finance';
  }
  // Health (Clinical)
  if (s.includes('gfr') || s.includes('creatinine') || s.includes('arterial-pressure') || s.includes('blood-pressure') || s.includes('a1c') || s.includes('glucose') || s.includes('dosage') || s.includes('pediatric') || s.includes('infusion') || s.includes('iv-drip') || s.includes('cholesterol') || s.includes('anion-gap') || s.includes('insulin') || s.includes('fluid-maintenance') || s.includes('pregnancy') || s.includes('ovulation') || s.includes('due-date')) {
    return 'health';
  }
  // Fitness
  if (cat === 'health' || s.includes('bmi') || s.includes('calorie') || s.includes('body-fat') || s.includes('weight') || s.includes('tdee') || s.includes('bmr') || s.includes('heart-rate') || s.includes('vo2') || s.includes('pace') || s.includes('1rm') || s.includes('bench-press') || s.includes('keto') || s.includes('protein') || s.includes('macro') || s.includes('fasting') || s.includes('sleep') || s.includes('workout')) {
    return 'fitness';
  }
  // Everyday tools
  if (cat === 'everyday' || s.includes('tip') || s.includes('discount') || s.includes('fuel') || s.includes('gas-mileage') || s.includes('trip') || s.includes('split-bill') || s.includes('cooking') || s.includes('carbon-footprint')) {
    return 'everyday-tools';
  }
  // Mathematics default
  return 'mathematics';
}

export interface DomainContentStrategy {
  audience: Record<Language, string>;
  introSummary: Record<Language, (name: string) => string>;
  howToSteps: Record<Language, string[]>;
  faqs: Record<Language, ToolFaq[]>;
  disclaimer?: Record<Language, string>;
}

export const DOMAIN_STRATEGIES: Record<DomainKey, DomainContentStrategy> = {
  'personal-finance': {
    audience: {
      en: 'Individuals, households, freelance contractors, and financial planners managing personal cash flow and savings.',
      ar: 'الأفراد والأسر والمستقلون والمخططون الماليون لإدارة الميزانيات والمدخرات الشخصية.',
      es: 'Particulares, familias y asesores financieros que gestionan presupuestos, ahorros e ingresos personales.',
      fr: 'Particuliers, foyers et conseillers financiers pour la gestion du budget et de l’épargne.',
      de: 'Privatpersonen, Haushalte und Finanzplaner zur Budget- und Vermögensverwaltung.',
    },
    introSummary: {
      en: (n) => `The ${n} provides quantitative modeling for personal cash flows, compound wealth generation, and budgetary allocations, enabling informed household financial decisions.`,
      ar: (n) => `توفر ${n} نماذج كمية لإدارة التدفقات النقدية الشخصية وبناء الثروة وتوزيع الميزانية لدعم القرارات المالية الرشيدة.`,
      es: (n) => `La calculadora ${n} modela flujos de efectivo personales, ahorro y asignación presupuestaria para decisiones domésticas rigurosas.`,
      fr: (n) => `Le calculateur ${n} modélise les flux de trésorerie personnels et la progression de l’épargne pour optimiser votre budget.`,
      de: (n) => `Der ${n} unterstützt bei der quantitativen Modellierung persönlicher Finanzen, Ersparnisse und Haushaltsbudgets.`,
    },
    howToSteps: {
      en: [
        'Input your base income, initial balance, or primary financial parameter.',
        'Enter applicable rates (interest, savings target, or expense ratio) and durations.',
        'Review the projected balances, cumulative interest, and net cash flow summary.',
      ],
      ar: [
        'أدخل الدخل الأساسي أو الرصيد الأولي أو المعامل المالي المحدد.',
        'حدد المعدلات المطلوبة (نسبة الفائدة، هدف الادخار، أو نسبة النفقات) والفترة الزمنية.',
        'استعرض النتائج المتوقعة وإجمالي الفوائد وصافي التدفق النقدي في ملخص الحساب.',
      ],
      es: [
        'Introduzca su saldo o ingreso inicial y el parámetro financiero clave.',
        'Especifique las tasas de interés o ahorro y el horizonte temporal.',
        'Revise el desglose de saldos finales, intereses acumulados y flujos netos.',
      ],
      fr: [
        'Renseignez votre solde ou revenu initial et le paramètre financier clé.',
        'Indiquez les taux d’intérêt ou d’épargne ainsi que la durée d’évaluation.',
        'Consultez le solde projeté, les intérêts cumulés et l’échéancier détaillé.',
      ],
      de: [
        'Geben Sie das Ausgangseinkommen, Startguthaben oder den Primärwert ein.',
        'Definieren Sie relevante Zinssätze, Sparziele und Zeiträume.',
        'Analysieren Sie das Endkapital, aufgelaufene Zinsen und den Zahlungsplan.',
      ],
    },
    faqs: {
      en: [
        { question: 'What does this personal finance metric evaluate?', answer: 'It calculates net monetary values, required savings rates, or compounding balances over specified periods.' },
        { question: 'What assumptions are made regarding rates and inflation?', answer: 'Calculations assume constant nominal rates unless specific inflation-adjustment parameters are supplied.' },
        { question: 'Which variables have the largest effect on long-term results?', answer: 'The compounding duration and periodic contribution frequency typically exert the greatest geometric impact on final totals.' },
      ],
      ar: [
        { question: 'ماذا يقيس هذا المؤشر المالي الشخصي؟', answer: 'يحسب القيمة الصافية ومعدل الادخار المطلوب أو العائد المركب عبر الفترات الزمنية المحددة.' },
        { question: 'ما هي الفرضيات المعتمدة بشأن الفائدة والتضخم؟', answer: 'تفترض الحسابات ثبات المعدلات الاسمية ما لم يتم إدخال معامل تعديل التضخم بشكل صريح.' },
        { question: 'ما هو المتغير الأكثر تأثيراً على النتائج المستقبلية؟', answer: 'تعتبر المدة الزمنية ودورية المساهمات من العوامل ذات الأثر الأكبر هندسياً على الرصيد النهائي.' },
      ],
      es: [
        { question: '¿Qué mide esta métrica de finanzas personales?', answer: 'Evalúa saldos netos, tasas de ahorro requeridas y crecimiento compuesto en plazos definidos.' },
        { question: '¿Qué supuestos se aplican sobre intereses e inflación?', answer: 'Se asumen tasas nominales constantes a menos que se introduzca ajuste explícito por inflación.' },
        { question: '¿Qué variable tiene mayor impacto a largo plazo?', answer: 'El horizonte temporal y la constancia de las aportaciones periódicas tienen el mayor efecto multiplicador.' },
      ],
      fr: [
        { question: 'Que mesure cet indicateur financier personnel ?', answer: 'Il calcule les montants nets, l’épargne nécessaire ou la capitalisation composée sur la période choisie.' },
        { question: 'Quelles hypothèses sont faites sur l’inflation ?', answer: 'Les calculs reposent sur des taux nominaux fixes sauf indication contraire.' },
        { question: 'Quel paramètre a le plus d’impact à terme ?', answer: 'La durée de capitalisation et la régularité des versements sont les facteurs les plus déterminants.' },
      ],
      de: [
        { question: 'Was misst diese persönliche Finanzkennzahl?', answer: 'Sie ermittelt Nettoerträge, Sparraten und Zinseszinseffekte über definierte Anlagezeiträume.' },
        { question: 'Welche Annahmen gelten für Zinssatz und Inflation?', answer: 'Standardmäßig wird von konstanten Nominalwerten ohne unterjährige Schwankungen ausgegangen.' },
        { question: 'Welcher Faktor beeinflusst das Gesamtergebnis am stärksten?', answer: 'Die Laufzeit und die Regelmäßigkeit der Sparbeiträge haben den größten mathematischen Hebel.' },
      ],
    },
  },

  'corporate-finance': {
    audience: {
      en: 'Chief financial officers, investment bankers, corporate treasurers, and financial analysts evaluating capital structure and debt coverage.',
      ar: 'المديرون الماليون والمصرفيون الاستثماريون ومحللو تمويل الشركات لتقييم هيكل رأس المال والقدرة على تغطية الديون.',
      es: 'Directores financieros, analistas de banca de inversión y tesoreros corporativos para la evaluación de estructura de capital.',
      fr: 'Directeurs financiers, analystes en fusions-acquisitions et trésoriers d’entreprise.',
      de: 'CFOs, Investmentbanker und Corporate-Finance-Analysten zur Analyse von Kapitalstruktur und Schuldentragfähigkeit.',
    },
    introSummary: {
      en: (n) => `The ${n} evaluates corporate capitalization, cost of financing, or debt coverage ratios to establish the financial feasibility and operational leverage of commercial enterprises.`,
      ar: (n) => `تقوم ${n} بتقييم هيكل تمويل الشركات وتكلفة رأس المال ومعدلات تغطية الديون لتحديد الكفاءة التشغيلية والجدوى الاستثمارية.`,
      es: (n) => `La herramienta ${n} evalúa la estructura de capital, el coste financiero y los ratios de cobertura de deuda corporativa.`,
      fr: (n) => `Le calculateur ${n} évalue la structure du capital, le coût de financement et la couverture de la dette d’entreprise.`,
      de: (n) => `Der ${n} analysiert Kapitalstrukturen, Finanzierungskosten und Schuldendeckungsgrade von Unternehmen.`,
    },
    howToSteps: {
      en: [
        'Enter enterprise operating figures (EBITDA, Net Operating Income, or debt service payments).',
        'Specify equity and debt market values, corporate tax rates, or borrowing costs.',
        'Examine the resulting coverage multiples, blended cost percentages, or hurdle rates.',
      ],
      ar: [
        'أدخل الأرقام التشغيلية للشركة (الأرباح التشغيلية، الأرباح قبل الفوائد والضرائب، أو خدمة الدين).',
        'حدد القيم السوقية للديون والملكية ومعدل الضريبة وتكلفة الاقتراض.',
        'استعرض مضاعفات التغطية ونسب تكلفة التمويل في بطاقة النتائج.',
      ],
      es: [
        'Introduzca métricas operativas (EBITDA, ingresos operativos o servicio de la deuda).',
        'Defina los valores de deuda, capital propio, coste fiscal y coste financiero.',
        'Examine los ratios de cobertura y el coste ponderado resultante.',
      ],
      fr: [
        'Renseignez les indicateurs opérationnels (EBITDA, résultat d’exploitation ou service de dette).',
        'Indiquez la valeur des dettes, des capitaux propres et le taux d’impôt sur les sociétés.',
        'Consultez les ratios de couverture et le coût global de financement.',
      ],
      de: [
        'Geben Sie betriebswirtschaftliche Kennzahlen (EBITDA, Zinsaufwand, Schuldendienst) ein.',
        'Erfassen Sie Eigen- und Fremdkapitalwerte sowie den Unternehmenssteuersatz.',
        'Prüfen Sie die berechneten Deckungsquoten und Kapitalkostensätze.',
      ],
    },
    faqs: {
      en: [
        { question: 'What does this corporate metric indicate?', answer: 'It measures the solvency, operating risk, or blended cost of capital necessary to fund corporate operations.' },
        { question: 'What industry benchmarks apply?', answer: 'Healthy coverage ratios typically require metrics safely above 1.25x–1.5x, though capital-intensive sectors vary.' },
        { question: 'How do tax rates impact the calculation?', answer: 'Corporate interest deductibility creates a tax shield that directly lowers the after-tax cost of debt.' },
      ],
      ar: [
        { question: 'ماذا يعكس هذا المؤشر المالي للشركات؟', answer: 'يقيس الجدارة الائتمانية والرافعة التشغيلية والتكلفة المرجحة لرأس المال اللازم للعمليات.' },
        { question: 'ما هي الحدود المعيارية المقبولة في السوق؟', answer: 'تتطلب معدلات التغطية السليمة عادةً قيماً تتجاوز 1.25 إلى 1.5 مرة وفقاً للقطاع التشغيلي.' },
        { question: 'كيف تؤثر الضرائب على الحساب؟', answer: 'توفر الخصومات الضريبية على الفوائد درعاً ضريبياً يخفض التكلفة الفعلية للديون بعد الضريبة.' },
      ],
      es: [
        { question: '¿Qué indica esta métrica corporativa?', answer: 'Determina la solvencia, el apalancamiento y el coste financiero medio de la empresa.' },
        { question: '¿Cuáles son los niveles de referencia estándar?', answer: 'Ratios de cobertura superiores a 1,25x–1,5x son habitualmente requeridos por entidades bancarias.' },
        { question: '¿Cómo influye la tasa impositiva?', answer: 'La deducibilidad del gasto financiero genera un escudo fiscal que abarata el coste neto de la deuda.' },
      ],
      fr: [
        { question: 'Que traduit ce ratio d’entreprise ?', answer: 'Il mesure la solvabilité, le levier financier et le coût moyen des financements mobilisés.' },
        { question: 'Quels sont les seuils d’alerte bancaires ?', answer: 'Un ratio de couverture supérieur à 1,25x–1,50x est généralement exigé par les créanciers.' },
        { question: 'Quel est l’impact de la fiscalité ?', answer: 'La déductibilité des intérêts d’emprunt réduit le coût net effectif de la dette d’entreprise.' },
      ],
      de: [
        { question: 'Welche Aussagekraft besitzt diese Kennzahl?', answer: 'Sie quantifiziert Zahlungsfähigkeit, Kapitalrisiko und die Gesamtkapitalkosten des Betriebs.' },
        { question: 'Welche Orientierungswerte gelten in der Praxis?', answer: 'Deckungsgrade von mindestens 1,25x bis 1,5x gelten im Bankensektor als solide Basis.' },
        { question: 'Wie wirkt sich der Ertragsteuersatz aus?', answer: 'Die steuerliche Abzugsfähigkeit von Zinsaufwendungen erzeugt einen Tax Shield für Fremdkapital.' },
      ],
    },
  },

  'accounting': {
    audience: {
      en: 'Accountants, auditors, bookkeepers, and entrepreneurs monitoring operational margins and asset depreciation schedules.',
      ar: 'المحاسبون والمدققون وأصحاب الأعمال لمتابعة هوامش الربحية وجداول إهلاك الأصول.',
      es: 'Contables, auditores y gestores de empresas que calculan amortizaciones y márgenes comerciales.',
      fr: 'Comptables, commissaires aux comptes et gestionnaires pour l’analyse des marges et des amortissements.',
      de: 'Buchhalter, Wirtschaftsprüfer und Unternehmer zur Margen- und Abschreibungsermittlung.',
    },
    introSummary: {
      en: (n) => `The ${n} applies recognized accounting frameworks (GAAP/IFRS) to calculate depreciation schedules, operating profit margins, or financial statement ratios.`,
      ar: (n) => `تطبق ${n} المعايير المحاسبية المعتمدة لاحتساب جداول الإهلاك أو هوامش الربحية التشغيلية أو نسب القوائم المالية.`,
      es: (n) => `La calculadora ${n} implementa principios contables estándar para determinar tablas de amortización, márgenes brutos y ratios operativas.`,
      fr: (n) => `Le calculateur ${n} applique les normes comptables pour déterminer les dotations aux amortissements et les marges opérationnelles.`,
      de: (n) => `Der ${n} wendet Standard-Rechnungslegungsgrundsätze zur Ermittlung von Abschreibungsplänen und operativen Margen an.`,
    },
    howToSteps: {
      en: [
        'Enter original asset cost, revenue totals, or cost of goods sold (COGS).',
        'Input salvage value, useful lifespan in years, or markup percentages.',
        'Review the resulting depreciation table, break-even unit threshold, or gross margin percentage.',
      ],
      ar: [
        'أدخل تكلفة الأصل الأصلية، أو إجمالي الإيرادات، أو تكلفة البضاعة المباعة.',
        'حدد القيمة التخريدية والعمر الإنتاجي بالسنوات أو نسب الإضافة.',
        'استعرض جدول الإهلاك ونقطة التعادل وهوامش الربح المحسوبة بدقة.',
      ],
      es: [
        'Introduzca el coste inicial del activo, ventas totales o coste de ventas (COGS).',
        'Indique el valor residual, vida útil estimada o porcentaje de margen comercial.',
        'Consulte la tabla de amortización periódica y los márgenes resultantes.',
      ],
      fr: [
        'Saisissez le coût initial de l’actif, le chiffre d’affaires ou le coût de revient.',
        'Précisez la valeur résiduelle, la durée d’amortissement ou le taux de marge.',
        'Examinez le tableau d’amortissement et les seuils de rentabilité calculés.',
      ],
      de: [
        'Tragen Sie Anschaffungskosten, Umsatzerlöse oder Wareneinsatz ein.',
        'Geben Sie Restwert, Nutzungsdauer in Jahren oder Kalkulationsaufschläge an.',
        'Prüfen Sie den periodischen Abschreibungsplan und die Gewinnschwellen.',
      ],
    },
    faqs: {
      en: [
        { question: 'What accounting convention is used for depreciation?', answer: 'Standard linear straight-line or accelerated declining-balance algorithms are computed based on selection.' },
        { question: 'What is the difference between markup and profit margin?', answer: 'Markup measures profit relative to cost, whereas margin calculates profit as a fraction of selling price.' },
        { question: 'How is salvage value treated at the end of asset life?', answer: 'Salvage value is subtracted from cost basis before computing straight-line depreciation, preserving asset floor value.' },
      ],
      ar: [
        { question: 'ما هي الطريقة المحاسبية المتبعة في الإهلاك؟', answer: 'تعتمد الحسابات على طريقة القسط الثابت أو القسط المتناقص وفقاً للاختيار المحدد.' },
        { question: 'ما الفرق بين هامش الربح ونسبة الإضافة؟', answer: 'تقيس نسبة الإضافة الربح منسوباً إلى التكلفة، بينما يقيس هامش الربح النسبة من سعر البيع الإجمالي.' },
        { question: 'كيف يتم التعامل مع القيمة التخريدية؟', answer: 'تُخصم القيمة التخريدية من التكلفة الأولية لتحديد الوعاء الخاضع للإهلاك على مدار سنوات الاستخدام.' },
      ],
      es: [
        { question: '¿Qué método de amortización se aplica?', answer: 'Se calculan métodos lineales constantes o decrecientes según la configuración elegida.' },
        { question: '¿Cuál es la diferencia entre margen y markup?', answer: 'El markup calcula el beneficio sobre el coste; el margen lo calcula sobre el precio de venta final.' },
        { question: '¿Cómo afecta el valor residual?', answer: 'El valor residual se descuenta de la base amortizable para proteger el valor contable mínimo.' },
      ],
      fr: [
        { question: 'Quelle méthode d’amortissement est retenue ?', answer: 'Le calcul propose l’amortissement linéaire ou dégressif conforme aux normes comptables.' },
        { question: 'Quelle différence entre marge et taux de marque ?', answer: 'La marge est rapportée au prix de vente tandis que le taux de marque s’applique au coût d’achat.' },
        { question: 'Comment la valeur résiduelle est-elle intégrée ?', answer: 'Elle est déduite de la base amortissable pour déterminer la dépréciation annuelle.' },
      ],
      de: [
        { question: 'Welche Abschreibungsmethode kommt zum Einsatz?', answer: 'Berechnet wird wahlweise die lineare AfA oder degressive Abschreibungsmethodik.' },
        { question: 'Was unterscheidet Aufschlag und Gewinnmarge?', answer: 'Kalkulationsaufschlag bezieht sich auf die Kosten; die Marge misst den Gewinnanteil am Verkaufspreis.' },
        { question: 'Wie wird der Restwert berücksichtigt?', answer: 'Der geschätzte Restwert mindert das Abschreibungsvolumen über die Nutzungsdauer.' },
      ],
    },
  },

  'investing': {
    audience: {
      en: 'Retail investors, wealth managers, stock traders, and retirement planners evaluating portfolio returns and equity yields.',
      ar: 'المستثمرون الأفراد ومديرو الثروات ومحللو الأسهم لحساب عوائد المحافظ الاستثمارية ونسب التوزيعات.',
      es: 'Inversores particulares, gestores de patrimonios y analistas bursátiles para el cálculo de rentabilidades y dividendos.',
      fr: 'Investisseurs individuels, gestionnaires de patrimoine et traders pour l’analyse des rendements de portefeuille.',
      de: 'Privatanleger, Vermögensverwalter und Aktionäre zur Renditeberechnung und Dividendenbewertung.',
    },
    introSummary: {
      en: (n) => `The ${n} computes annualized growth rates (CAGR), dividend yields, total return on investment (ROI), or option valuation metrics to support disciplined portfolio allocation.`,
      ar: (n) => `تحسب ${n} معدل النمو السنوي المركب وعوائد التوزيعات النقدية وإجمالي العائد على الاستثمار لدعم استراتيجيات الاستثمار الناجحة.`,
      es: (n) => `La calculadora ${n} determina rentabilidades anualizadas (CAGR), dividendos y retorno total (ROI) para la gestión patrimonial.`,
      fr: (n) => `Le calculateur ${n} évalue le taux de croissance annuel composé (TCAC/CAGR), le rendement du dividende et le retour sur investissement (ROI).`,
      de: (n) => `Der ${n} berechnet annualisierte Wachstumsraten (CAGR), Dividendenrenditen und den Gesamtertrag (ROI) von Wertpapieranlagen.`,
    },
    howToSteps: {
      en: [
        'Enter starting capital, initial share purchase price, or opening portfolio value.',
        'Input ending balance, dividend cash flows, and elapsed investment duration.',
        'Review the annualized compound growth rate (CAGR), cumulative capital gains, and total percentage yield.',
      ],
      ar: [
        'أدخل رأس المال المستثمر، أو سعر الشراء الأولي، أو قيمة المحفظة عند البدء.',
        'أدخل القيمة الحالية للأصل والتوزيعات النقدية المستلمة وفترة الاستثمار بالسنوات.',
        'استعرض معدل النمو المركب السنوي وصافي الأرباح الرأسمالية والعائد الكلي.',
      ],
      es: [
        'Introduzca el capital invertido inicial o precio de compra de las acciones.',
        'Indique el valor liquidativo final, dividendos cobrados y plazo en años.',
        'Consulte la tasa compuesta anualizada (CAGR) y la ganancia neta acumulada.',
      ],
      fr: [
        'Indiquez le capital investi de départ ou le cours d’achat initial.',
        'Renseignez la valeur finale du placement, les dividendes perçus et le nombre d’années.',
        'Examinez le taux de rendement annualisé (CAGR) et la plus-value globale.',
      ],
      de: [
        'Geben Sie das Anfangsinvestment, den Kaufkurs oder den Portfoliostartwert ein.',
        'Erfassen Sie den Endwert, Dividendenzahlungen und die Haltedauer in Jahren.',
        'Analysieren Sie die jährliche Wachstumsrate (CAGR) und den Gesamtertrag.',
      ],
    },
    faqs: {
      en: [
        { question: 'How does CAGR differ from average annual return?', answer: 'CAGR smooths geometric progression over time, eliminating the volatility distortion of arithmetic averages.' },
        { question: 'Are dividend reinvestments (DRIP) accounted for?', answer: 'Reinvested dividends compound alongside capital gains, materially accelerating exponential portfolio accumulation.' },
        { question: 'What does a high valuation multiple imply?', answer: 'High valuation ratios (P/E, EV/EBITDA) imply high market expectations for future earnings growth or margin expansion.' },
      ],
      ar: [
        { question: 'ما الفرق بين معدل النمو السنوي المركب ومتوسط العائد الحسابي؟', answer: 'يعكس النمو المركب التراكم الهندسي الفعلي للأرباح ويزيل التشوهات الناتجة عن التقلبات الحسابية البسيطة.' },
        { question: 'كيف تؤثر إعادة استثمار التوزيعات النقدية؟', answer: 'تساهم إعادة الاستثمار في تسريع نمو رأس المال عبر الاستفادة من مضاعفة العائد التراكمي.' },
        { question: 'ماذا يعني ارتفاع مضاعف التقييم؟', answer: 'يشير ارتفاع مكرر الربحية أو مضاعف القيمة إلى توقعات سوقية متفائلة بنمو أرباح الشركة المستقبلي.' },
      ],
      es: [
        { question: '¿En qué se diferencia el CAGR de la media simple?', answer: 'El CAGR mide el crecimiento geométrico exacto reflejando la realidad de la reinversión de beneficios.' },
        { question: '¿Cómo impacta la reinversión de dividendos?', answer: 'La reinversión potencia el interés compuesto acelerando sensiblemente el crecimiento del capital final.' },
        { question: '¿Qué significa un múltiplo de valoración elevado?', answer: 'Indica que el mercado descuenta un fuerte crecimiento futuro de beneficios o cuota de mercado.' },
      ],
      fr: [
        { question: 'Pourquoi privilégier le CAGR par rapport au rendement moyen ?', answer: 'Le CAGR mesure la progression géométrique réelle et neutralise la distorsion liée à la volatilité.' },
        { question: 'Quel est l’effet du réinvestissement des dividendes ?', answer: 'Il amplifie considérablement la capitalisation des gains grâce aux intérêts composés.' },
        { question: 'Que traduit un multiple de valorisation élevé ?', answer: 'Il reflète des anticipations élevées du marché quant à la croissance future des résultats.' },
      ],
      de: [
        { question: 'Warum ist die CAGR aussagekräftiger als der arithmetische Mittelwert?', answer: 'Die CAGR spiegelt das tatsächliche geometrische Wachstum unter Berücksichtigung von Zinseszinseffekten wider.' },
        { question: 'Welche Auswirkung hat die Dividenden-Reinvestition?', answer: 'Wiederangelegte Ausschüttungen beschleunigen den Vermögenszuwachs exponentiell.' },
        { question: 'Was signalisiert ein hohes Bewertungsmultiple?', answer: 'Ein hohes KGV oder EV/EBITDA spiegelt hohe Markterwartungen an zukünftige Gewinnsteigerungen wider.' },
      ],
    },
  },

  'loans': {
    audience: {
      en: 'Homebuyers, car buyers, credit borrowers, and mortgage brokers modeling amortization schedules and interest charges.',
      ar: 'المقترضون ومشتري المنازل والسيارات ووسطاء التمويل لحساب أقساط القروض وجداول السداد.',
      es: 'Compradores de vivienda, vehículos y prestatarios que calculan cuotas mensuales y amortización de préstamos.',
      fr: 'Emprunteurs, acquéreurs immobiliers et courtiers en crédit pour le calcul des mensualités.',
      de: 'Kreditnehmer, Immobilienkäufer und Finanzberater zur Berechnung von Tilgungsplänen und Zinslasten.',
    },
    introSummary: {
      en: (n) => `The ${n} applies French standard amortization formulas to calculate periodic debt payments, total borrowing costs, and principal-interest repayment splits.`,
      ar: (n) => `تطبق ${n} معادلات الإهلاك التمويلي المعتمدة لحساب الأقساط الدورية وتكلفة الفائدة الإجمالية وجدول سداد أصل القرض.`,
      es: (n) => `La calculadora ${n} utiliza fórmulas estándar de amortización para calcular cuotas periódicas, coste total del préstamo y desgloses de capital e intereses.`,
      fr: (n) => `Le calculateur ${n} applique les formules actuarielles standard pour déterminer vos mensualités et le coût total du crédit.`,
      de: (n) => `Der ${n} berechnet periodische Raten, Zinsbelastung und den vollständigen Tilgungsverlauf von Krediten und Darlehen.`,
    },
    howToSteps: {
      en: [
        'Enter total borrowed principal balance (loan amount).',
        'Input annual percentage interest rate (APR) and repayment duration in years or months.',
        'Review the required monthly payment, total interest payable, and amortization breakdown.',
      ],
      ar: [
        'أدخل أصل مبلغ القرض أو التمويل المطلوب.',
        'حدد نسبة الفائدة السنوية وفترة السداد بالسنوات أو الأشهر.',
        'استعرض القسط الشهري المستحق وإجمالي الفوائد وجدول السداد التفصيلي.',
      ],
      es: [
        'Introduzca el importe total del préstamo (capital solicitado).',
        'Indique el tipo de interés nominal o TAE y el plazo de amortización.',
        'Consulte la cuota mensual resultante, intereses totales y tabla de amortización.',
      ],
      fr: [
        'Renseignez le montant total emprunté (capital initial).',
        'Indiquez le taux d’intérêt annuel (TAEG) et la durée de remboursement.',
        'Consultez votre mensualité, le coût global des intérêts et le tableau d’amortissement.',
      ],
      de: [
        'Geben Sie den Darlehensbetrag (Kreditvolumen) ein.',
        'Erfassen Sie den Sollzinssatz oder Effektivzins (APR) und die Laufzeit.',
        'Prüfen Sie die monatliche Rate, die Zinskosten und den Tilgungsplan.',
      ],
    },
    faqs: {
      en: [
        { question: 'How is the monthly loan payment derived?', answer: 'It applies standard fixed annuity formulas where monthly interest is charged against remaining principal.' },
        { question: 'What is the impact of extra principal payments?', answer: 'Direct principal prepayments reduce compounding balance, significantly lowering total interest and shortening term.' },
        { question: 'What is the difference between APR and nominal interest?', answer: 'APR incorporates upfront lender fees, points, and compounding frequency, reflecting true annual borrowing cost.' },
      ],
      ar: [
        { question: 'كيف يتم حساب القسط الشهري للقرض؟', answer: 'يُحسب باستخدام معادلة الأقساط الثابتة حيث تُحسب الفائدة الشهرية على الرصيد المتبقي من أصل القرض.' },
        { question: 'ما أثر سداد مبالغ إضافية من أصل القرض؟', answer: 'يؤدي السداد المبكر إلى تقليص رصيد الدين مباشرة، مما يخفض الفوائد الإجمالية ويقصر مدة القرض.' },
        { question: 'ما الفرق بين نسبة الفائدة الاسمية والنسبة السنوية الفعلية (APR)؟', answer: 'تشمل النسبة الفعلية الرسوم الإدارية وتكاليف التمويل ودورية الحساب لتعكس التكلفة الحقيقية للاقتراض.' },
      ],
      es: [
        { question: '¿Cómo se calcula la cuota mensual?', answer: 'Aplica el sistema de amortización francés con cuotas constantes compuestas de capital decreciente e intereses.' },
        { question: '¿Qué ventaja tienen las amortizaciones anticipadas?', answer: 'Reducen directamente el capital pendiente, ahorrando intereses futuros y acortando la vida del préstamo.' },
        { question: '¿Qué diferencia hay entre TIN y TAE?', answer: 'La TAE incluye comisiones bancarias y gastos obligatorios, reflejando el coste real efectivo del crédito.' },
      ],
      fr: [
        { question: 'Comment est calculée la mensualité ?', answer: 'Elle applique la formule d’annuité constante où la part d’intérêts décroît au profit du capital remboursé.' },
        { question: 'Quel est l’impact des remboursements anticipés ?', answer: 'Chaque euro remboursé par anticipation réduit le capital restant dû et diminue le coût total des intérêts.' },
        { question: 'Quelle est la différence entre taux nominal et TAEG ?', answer: 'Le TAEG englobe les frais de dossier, garanties et assurance obligatoire pour refléter le coût total réel.' },
      ],
      de: [
        { question: 'Wie berechnet sich die Kreditrate?', answer: 'Nach der Annuitätenmethode, bei der die Zinslast sinkt und der Tilgungsanteil kontinuierlich steigt.' },
        { question: 'Welchen Effekt haben Sondertilgungen?', answer: 'Sondertilgungen reduzieren die Restschuld sofort und sparen erhebliche Zinskosten über die Gesamtlaufzeit.' },
        { question: 'Was unterscheidet Sollzins und Effektivzins?', answer: 'Der effektive Jahreszins enthält alle anfallenden Nebenkosten und Gebühren der Kreditaufnahme.' },
      ],
    },
  },

  'real-estate': {
    audience: {
      en: 'Real estate investors, property managers, landlords, and commercial appraisers evaluating rental yields and property cash flows.',
      ar: 'المستثمرون العقاريون ومديرو الأملاك والمقيمون لحساب عوائد الإيجار ومعدلات الرسملة للوحدات العقارية.',
      es: 'Inversores inmobiliarios, propietarios y administradores de fincas para el cálculo de rentabilidad de alquileres.',
      fr: 'Investisseurs immobiliers, gestionnaires locatifs et bailleurs pour l’évaluation des rendements locatifs.',
      de: 'Immobilieninvestoren, Vermieter und Makler zur Berechnung von Mietrenditen und Cashflows.',
    },
    introSummary: {
      en: (n) => `The ${n} calculates capitalization rates, gross and net rental yields, and cash-on-cash returns to assess property investment performance.`,
      ar: (n) => `تحسب ${n} معدل الرسملة (Cap Rate) والعائد الإيجاري الصافي والإجمالي لتقييم الجدوى الاستثمارية للعقارات.`,
      es: (n) => `La calculadora ${n} determina la tasa de capitalización (Cap Rate), rentabilidad bruta y neta del alquiler de activos inmobiliarios.`,
      fr: (n) => `Le calculateur ${n} détermine le taux de capitalisation (Cap Rate), le rendement locatif brut et net de charges.`,
      de: (n) => `Der ${n} ermittelt Brutto- und Nettomietrenditen sowie die Gesamtkapitalrentabilität (Cap Rate) von Immobilien.`,
    },
    howToSteps: {
      en: [
        'Enter property acquisition price (or current market valuation).',
        'Input gross annual rental income and operating expenses (taxes, insurance, maintenance, vacancy).',
        'Examine the net operating income (NOI), cap rate percentage, and rental yield.',
      ],
      ar: [
        'أدخل سعر شراء العقار (أو قيمته السوقية الحالية).',
        'حدد إجمالي الدخل الإيجاري السنوي والتكاليف التشغيلية (الضرائب، الصيانة، التأمين، ونسبة الشغور).',
        'استعرض صافي الدخل التشغيلي (NOI) ونسبة العائد الإيجاري ومعدل الرسملة.',
      ],
      es: [
        'Introduzca el precio de compra del inmueble o tasación actual.',
        'Indique los ingresos brutos por alquiler y los gastos de explotación (IBI, comunidad, seguro, mantenimiento).',
        'Consulte el ingreso operativo neto (NOI) y el porcentaje de rentabilidad resultante.',
      ],
      fr: [
        'Indiquez le prix d’acquisition du bien ou sa valeur vénale.',
        'Renseignez les loyers annuels bruts et les charges d’exploitation (taxe foncière, assurance, entretien, vacance).',
        'Examinez le revenu net d’exploitation et le rendement locatif calculé.',
      ],
      de: [
        'Geben Sie den Kaufpreis oder aktuellen Marktwert der Immobilie ein.',
        'Erfassen Sie die jährlichen Kaltmieteinnahmen und die nicht umlegbaren Bewirtschaftungskosten.',
        'Prüfen Sie den Nettoertrag (NOI) und die berechnete Mietrendite.',
      ],
    },
    faqs: {
      en: [
        { question: 'What is the difference between Gross Yield and Cap Rate?', answer: 'Gross yield compares raw rent to purchase price; Cap Rate evaluates Net Operating Income after deducting expenses.' },
        { question: 'How is a vacancy reserve accounted for?', answer: 'Prudent underwriting subtracts a 5%–10% economic vacancy allowance from potential gross rental revenue.' },
        { question: 'What is a typical healthy cap rate?', answer: 'Cap rates vary from 4%–6% in prime tier-1 metropolitan markets to 7%–10% in higher-yield secondary areas.' },
      ],
      ar: [
        { question: 'ما الفرق بين العائد الإجمالي ومعدل الرسملة (Cap Rate)؟', answer: 'يقارن العائد الإجمالي الإيجار بسعر العقار، بينما يقيس معدل الرسملة صافي الدخل التشغيلي بعد خصم النفقات.' },
        { question: 'كيف يُحتسب مخصص الشغور الإيجاري؟', answer: 'تقتطع النماذج الاستثمارية المحافظة نسبة 5% إلى 10% كاحتياطي لتغطية فترات خلو العقار من المستأجرين.' },
        { question: 'ما هو معدل الرسملة الجيد في السوق العقاري؟', answer: 'تتراوح المعدلات الصحية عادة بين 4% و6% في المدن الكبرى، وتصل إلى 7% إلى 10% في الأسواق ذات العوائد المرتفعة.' },
      ],
      es: [
        { question: '¿Cuál es la diferencia entre rentabilidad bruta y Cap Rate?', answer: 'La rentabilidad bruta compara alquiler y precio de compra; el Cap Rate deduce gastos reales de explotación.' },
        { question: '¿Por qué debe incluirse una provisión de desocupación?', answer: 'Permite modelar con prudencia los meses sin inquilino descontando típicamente entre un 5% y un 10% anual.' },
        { question: '¿Qué se considera un Cap Rate atractivo?', answer: 'Oscila entre un 4% y 6% en zonas céntricas consolidadas y entre un 7% y 10% en mercados secundarios.' },
      ],
      fr: [
        { question: 'Quelle est la différence entre rendement brut et Cap Rate ?', answer: 'Le rendement brut compare loyers et prix d’achat; le Cap Rate prend en compte le revenu net après charges.' },
        { question: 'Comment provisionner la vacance locative ?', answer: 'Il est conseillé de déduire 5 % à 10 % des loyers annuels pour tenir compte des rotations de locataires.' },
        { question: 'Quel est le taux de capitalisation moyen du marché ?', answer: 'Il se situe généralement entre 4 % et 6 % dans les grandes métropoles et de 7 % à 9 % en région.' },
      ],
      de: [
        { question: 'Was unterscheidet Bruttorendite und Cap Rate?', answer: 'Die Bruttorendite setzt Miete und Kaufpreis ins Verhältnis; die Cap Rate zieht alle Bewirtschaftungskosten ab.' },
        { question: 'Warum ist ein Mietausfallwagnis wichtig?', answer: 'Konservative Planungen kalkulieren mit 5–10 % Leerstand, um realistische Einnahmen zu sichern.' },
        { question: 'Welche Mietrendite gilt als marktgerecht?', answer: 'In A-Lagen liegen Cap Rates meist bei 3,5–5 %, während B- und C-Lagen 6–8 % erzielen können.' },
      ],
    },
  },

  'health': {
    audience: {
      en: 'Physicians, nurses, clinicians, pharmacologists, and patients reviewing physiological laboratory estimates and clinical benchmarks.',
      ar: 'الأطباء والممرضون والصيادلة والمرضى لمراجعة التقديرات المعملية الفسيولوجية والمؤشرات السريرية.',
      es: 'Médicos, enfermeros, farmacéuticos y pacientes para la consulta de estimaciones clínicas y analíticas.',
      fr: 'Médecins, soignants, pharmaciens et patients pour le suivi d’indicateurs cliniques et biologiques.',
      de: 'Ärzte, Pflegepersonal, Pharmazeuten und Patienten zur Orientierung über physiologische Labor- und Vitalwerte.',
    },
    introSummary: {
      en: (n) => `The ${n} provides quantitative clinical estimates based on validated physiological equations, laboratory thresholds, and medical guidelines.`,
      ar: (n) => `توفر ${n} تقديرات سريرية كمية قائمة على معادلات فسيولوجية محققة ومراجع معملية طبية موثوقة.`,
      es: (n) => `La herramienta ${n} proporciona estimaciones clínicas cuantitativas basadas en ecuaciones fisiológicas validadas y guías médicas.`,
      fr: (n) => `Le calculateur ${n} fournit des estimations cliniques quantitatives fondées sur des équations médicales validées.`,
      de: (n) => `Der ${n} liefert quantitative klinische Schätzwerte auf Basis medizinisch validierter Formeln und Laborparameter.`,
    },
    howToSteps: {
      en: [
        'Enter patient demographic and laboratory parameters (creatinine, blood pressure, weight, or age).',
        'Select standardized clinical measurement units (e.g., mg/dL vs. µmol/L, mmHg, or kg).',
        'Review the calculated clinical index, guideline category, and reference interval.',
      ],
      ar: [
        'أدخل بيانات المريض المعملية والشخصية (الكرياتينين، ضغط الدم، الوزن، أو العمر).',
        'حدد الوحدات القياسية المعملية المناسبة (مثل ملغ/ديسيلتر أو ميكرومول/لتر).',
        'استعرض المؤشر السريري المحسوب والمرحلة المرجعية المعتمدة.',
      ],
      es: [
        'Introduzca los valores analíticos y datos del paciente (creatinina, presión arterial, peso, edad).',
        'Seleccione las unidades de medida estandarizadas pertinentes.',
        'Examine el índice clínico obtenido y su clasificación según las guías médicas.',
      ],
      fr: [
        'Renseignez les données biologiques et cliniques du patient (créatinine, pression artérielle, poids, âge).',
        'Sélectionnez les unités de mesure conventionnelles correspondantes.',
        'Consultez l’indice clinique calculé et son positionnement selon les recommandations médicales.',
      ],
      de: [
        'Geben Sie Patientendaten und Laborwerte (z. B. Kreatinin, Blutdruck, Gewicht, Alter) ein.',
        'Wählen Sie die korrekte Maßeinheit (z. B. mg/dl oder µmol/l, mmHg, kg).',
        'Vergleichen Sie den errechneten Richtwert mit klinischen Standardtabellen.',
      ],
    },
    faqs: {
      en: [
        { question: 'What does this clinical calculation estimate?', answer: 'It calculates physiological filtration, organ perfusion, or metabolic clearance based on standard empirical equations.' },
        { question: 'When should this calculation NOT be used as a diagnosis?', answer: 'This tool provides reference estimates only and cannot diagnose illness without comprehensive clinical evaluation by a licensed physician.' },
        { question: 'What variables introduce variance in clinical outcomes?', answer: 'Acute illness, hydration status, extreme body composition, pregnancy, and medications can alter laboratory serum levels.' },
      ],
      ar: [
        { question: 'ماذا يقدّر هذا الحساب السريري؟', answer: 'يقدّر معدل التروية العضوية أو وظائف الترشيح أو التصفية الحيوية بناءً على معادلات فسيولوجية تجريبية.' },
        { question: 'متى لا يجوز الاعتماد على هذه النتيجة كتشخيص؟', answer: 'الأداة تقدم مؤشرات توجيهية عامة ولا تُغني عن الفحص السريري والتشخيص الطبي المتكامل من قبل طبيب مرخص.' },
        { question: 'ما هي العوامل التي تسبب تفاوتاً في القيم المحسوبة؟', answer: 'تتأثر النتائج بحالات الجفاف والكتلة العضلية والأمراض الحادة والأدوية والحمل.' },
      ],
      es: [
        { question: '¿Qué estima este cálculo clínico?', answer: 'Evalúa la tasa de filtración o perfusión de órganos mediante fórmulas fisiológicas de referencia.' },
        { question: '¿Cuándo no debe interpretarse como diagnóstico médico?', answer: 'Es una herramienta puramente informativa que no sustituye el criterio diagnóstico de un profesional sanitario.' },
        { question: '¿Qué factores pueden alterar los resultados?', answer: 'La deshidratación, masa muscular extrema, enfermedades agudas y tratamientos farmacológicos influyen en las analíticas.' },
      ],
      fr: [
        { question: 'Que mesure cette estimation clinique ?', answer: 'Elle évalue la clairance ou la perfusion d’organes d’après des équations validées par les sociétés savantes.' },
        { question: 'Peut-on utiliser ce résultat pour poser un diagnostic ?', answer: 'Non. Cet outil fournit une estimation indicative et ne remplace en aucun cas une consultation médicale qualifiée.' },
        { question: 'Quelles variables peuvent modifier la valeur obtenue ?', answer: 'L’état d’hydratation, la masse musculaire, les médicaments ou une pathologie aiguë peuvent fausser les dosages.' },
      ],
      de: [
        { question: 'Welchen physiologischen Wert schätzt diese Berechnung?', answer: 'Sie berechnet Organfiltrationsraten oder Clearance-Werte auf Basis standardisierter medizinischer Modelle.' },
        { question: 'Warum ersetzt dieser Rechner keine ärztliche Diagnose?', answer: 'Er liefert rein rechnerische Näherungswerte und ersetzt keine ärztliche Untersuchung oder Fachberatung.' },
        { question: 'Welche Einflussfaktoren können das Ergebnis verfälschen?', answer: 'Hydratationszustand, extreme Muskelmasse, Schwangerschaft und Medikamente beeinflussen Laborparameter.' },
      ],
    },
    disclaimer: {
      en: 'This tool provides educational and screening estimations only. It is not intended as medical advice, diagnosis, or treatment. Always consult a qualified physician regarding medical conditions.',
      ar: 'توفر هذه الأداة تقديرات استرشادية وتثقيفية فقط. وليست بديلاً عن الاستشارة الطبية أو التشخيص أو العلاج. يُرجى مراجعة الطبيب المختص.',
      es: 'Esta herramienta proporciona estimaciones orientativas y educativas. No constituye asesoramiento ni diagnóstico médico. Consulte a un médico cualificado.',
      fr: 'Cet outil fournit des estimations éducatives uniquement. Il ne remplace pas un avis, un diagnostic ou un traitement médical. Consultez un professionnel de santé.',
      de: 'Dieses Werkzeug dient ausschließlich informativen Zwecken. Es ersetzt keine ärztliche Diagnose, Beratung oder Therapie. Wenden Sie sich an qualifiziertes medizinisches Fachpersonal.',
    },
  },

  'fitness': {
    audience: {
      en: 'Athletes, fitness coaches, dietitians, and active individuals tracking macronutrients, energy expenditure, and training performance.',
      ar: 'الرياضيون ومدربو اللياقة البدنية وأخصائيو التغذية لتتبع استهلاك الطاقة والماكروز ومستوى الأداء البدني.',
      es: 'Deportistas, entrenadores personales, nutricionistas y usuarios activos que monitorizan gasto energético y macronutrientes.',
      fr: 'Sportifs, préparateurs physiques, diététiciens et passionnés de fitness suivant leurs dépenses énergétiques.',
      de: 'Sportler, Fitnesstrainer, Ernährungsberater und Aktive zur Trainingssteuerung und Kalorienbedarfsanalyse.',
    },
    introSummary: {
      en: (n) => `The ${n} calculates biometric markers, basal and active metabolic rates, or training load metrics to guide nutrition and athletic conditioning.`,
      ar: (n) => `تحسب ${n} المؤشرات الحيوية ومعدلات الحرق الغذائي أو أحمال التدريب لتوجيه التغذية واللياقة البدنية بشكل علمي.`,
      es: (n) => `La calculadora ${n} determina índices biométricos, gasto metabólico y zonas de entrenamiento para optimizar la nutrición y el rendimiento.`,
      fr: (n) => `Le calculateur ${n} évalue les métabolismes de base et actif, les besoins nutritionnels et les charges d’entraînement.`,
      de: (n) => `Der ${n} berechnet biometrische Richtwerte, Grundumsatz, Kalorienbedarf und Trainingszonen zur Leistungsoptimierung.`,
    },
    howToSteps: {
      en: [
        'Enter body dimensions (weight, height, age, biological sex, or body fat percentage).',
        'Select daily physical activity tier or exercise intensity factor.',
        'Review total daily energy expenditure (TDEE), target heart rate zones, or macro gram targets.',
      ],
      ar: [
        'أدخل القياسات البدنية (الوزن، الطول، العمر، الجنس، أو نسبة الدهون).',
        'حدد مستوى النشاط البدني اليومي أو شدة التمرين الرياضي.',
        'استعرض إجمالي استهلاك الطاقة اليومي (TDEE) ومعدل نبضات القلب المستهدف وتوزيع المغذيات.',
      ],
      es: [
        'Introduzca sus datos antropométricos (peso, altura, edad, sexo, grasa corporal).',
        'Seleccione su nivel de actividad física diaria o factor de intensidad deportiva.',
        'Revise el gasto energético total diario (TDEE) y la distribución de macronutrientes.',
      ],
      fr: [
        'Saisissez vos données morphologiques (poids, taille, âge, sexe, taux de masse grasse).',
        'Précisez votre niveau d’activité physique quotidienne ou intensité d’entraînement.',
        'Consultez votre dépense énergétique journalière (TDEE) et vos cibles en macronutriments.',
      ],
      de: [
        'Erfassen Sie Körpermaße (Gewicht, Größe, Alter, Geschlecht, Körperfettanteil).',
        'Wählen Sie Ihr tägliches Aktivitätsniveau oder den Trainingsfaktor.',
        'Analysieren Sie den Gesamtenergiebedarf (TDEE), Zielherzfrequenzzonen und Makronährstoffe.',
      ],
    },
    faqs: {
      en: [
        { question: 'What does this fitness metric measure?', answer: 'It evaluates daily calorie balance, cardiovascular training zones, or strength thresholds based on validated exercise physiology formulas.' },
        { question: 'Which formula provides the highest metabolic accuracy?', answer: 'Mifflin-St Jeor and Katch-McArdle (when body fat is known) provide empirical standard accuracy for metabolic energy expenditure.' },
        { question: 'How frequently should inputs be recalibrated?', answer: 'Recalculate every 2–4 weeks as body weight, muscle mass, or training volume changes to maintain progressive nutritional alignment.' },
      ],
      ar: [
        { question: 'ماذا يقيس هذا المؤشر الرياضي؟', answer: 'يقيس توازن السعرات اليومي أو مناطق نبض القلب التدريبية أو حدود القوة العضلية وفق أسس فسيولوجية رياضية.' },
        { question: 'ما هي المعادلة الأكثر دقة لحساب الاحتياج اليومي؟', answer: 'تعتبر معادلة ميفلين-سانت جور (أو كاتش-ماكاردل عند معرفة نسبة الدهون) الأكثر موثوقية سريرياً لحساب الطاقة.' },
        { question: 'كم مرة ينبغي تحديث المدخلات؟', answer: 'يُنصح بإعادة التقييم كل أسبوعين إلى 4 أسابيع مع تغير الوزن والكتلة العضلية لضمان توازن التغذية.' },
      ],
      es: [
        { question: '¿Qué mide este parámetro de entrenamiento?', answer: 'Evalúa el balance calórico diario, zonas de pulsaciones o umbrales de fuerza según la fisiología del ejercicio.' },
        { question: '¿Qué fórmula metabólica es más precisa?', answer: 'Mifflin-St Jeor y Katch-McArdle (si se conoce el % de grasa) son los estándares más avalados científicamente.' },
        { question: '¿Con qué frecuencia deben actualizarse los datos?', answer: 'Se recomienda recalcular cada 2–4 semanas conforme varíen el peso corporal o volumen de entrenamiento.' },
      ],
      fr: [
        { question: 'Que mesure cet indicateur de condition physique ?', answer: 'Il évalue la balance calorique journalière, les zones cibles de fréquence cardiaque ou la force musculaire.' },
        { question: 'Quelle formule offre la meilleure précision métabolique ?', answer: 'Les équations de Mifflin-St Jeor et Katch-McArdle sont les plus reconnues par les diététiciens sportifs.' },
        { question: 'À quelle fréquence ajuster les données saisies ?', answer: 'Tous les 15 à 30 jours au fur et à mesure des fluctuations de poids ou d’intensité d’entraînement.' },
      ],
      de: [
        { question: 'Was quantifiziert diese Fitnesskennzahl?', answer: 'Sie ermittelt Kalorienbedarf, Herzfrequenztrainingsbereiche oder Maximalkraftwerte auf sportwissenschaftlicher Basis.' },
        { question: 'Welche Formel liefert die höchste Genauigkeit beim Grundumsatz?', answer: 'Die Mifflin-St-Jeor-Formel sowie Katch-McArdle gelten in Studien als verlässlichste Schätzmodelle.' },
        { question: 'Wie oft sollten die Parameter aktualisiert werden?', answer: 'Eine Anpassung alle 2 bis 4 Wochen sichert die kontinuierliche Ausrichtung an verändertes Körpergewicht.' },
      ],
    },
  },

  'converters': {
    audience: {
      en: 'Engineers, scientists, students, architects, and international travelers converting quantities across global measurement systems.',
      ar: 'المهندسون والعلماء والطلاب والمسافرون لتحويل المقادير والوحدات بين الأنظمة القياسية الدولية.',
      es: 'Ingenieros, científicos, estudiantes y técnicos que realizan conversiones entre sistemas métrico e imperial.',
      fr: 'Ingénieurs, scientifiques, étudiants et techniciens convertissant des grandeurs physiques internationales.',
      de: 'Ingenieure, Naturwissenschaftler, Handwerker und Studenten zur exakten Umrechnung internationaler Maßeinheiten.',
    },
    introSummary: {
      en: (n) => `The ${n} provides high-precision unit transformations across international metric (SI) and customary systems adhering to NIST and ISO metrology standards.`,
      ar: (n) => `توفر ${n} تحويلاً عالي الدقة للوحدات والقياسات بين النظام المتري الدولي والأنظمة العرفية وفق معايير القياس المعتمدة عالمياً.`,
      es: (n) => `La herramienta ${n} realiza conversiones de unidades de alta precisión entre los sistemas métrico internacional (SI) e imperial según normas NIST e ISO.`,
      fr: (n) => `Le calculateur ${n} assure des conversions d’unités de haute précision conformes aux normes internationales métrologiques ISO et SI.`,
      de: (n) => `Der ${n} führt hochpräzise Maßeinheiten-Umrechnungen zwischen metrischem (SI) und angloamerikanischem Maßsystem nach ISO-Standards durch.`,
    },
    howToSteps: {
      en: [
        'Enter the numeric magnitude you wish to convert.',
        'Choose the origin source unit from the available measurement scale.',
        'Select the target conversion unit to view the exact converted quantity instantly.',
      ],
      ar: [
        'أدخل القيمة الرقمية المراد تحويلها.',
        'اختر وحدة القياس الأصلية من القائمة المتاحة.',
        'حدد وحدة القياس المستهدفة للاطلاع على النتيجة المحولة فورياً بدقة متناهية.',
      ],
      es: [
        'Introduzca el valor numérico que desea transformar.',
        'Seleccione la unidad de origen en el selector correspondiente.',
        'Elija la unidad de destino para visualizar la equivalencia exacta de forma inmediata.',
      ],
      fr: [
        'Saisissez la valeur numérique à convertir.',
        'Sélectionnez l’unité de départ dans la liste déroulante.',
        'Choisissez l’unité d’arrivée pour afficher instantanément la conversion exacte.',
      ],
      de: [
        'Geben Sie den umzurechnenden Zahlenwert ein.',
        'Wählen Sie die Ausgangseinheit aus der Einheitenliste aus.',
        'Bestimmen Sie die Zieleinheit, um den umgerechneten Wert unverzüglich abzulesen.',
      ],
    },
    faqs: {
      en: [
        { question: 'What conversion standards are implemented?', answer: 'Calculations adhere strictly to BIPM, NIST, and ISO definitions using exact rational conversion ratios.' },
        { question: 'How are nonlinear scale offsets handled (e.g., Temperature)?', answer: 'Nonlinear scales apply full affine transformations (e.g., °F = °C × 1.8 + 32) rather than scalar multiplication alone.' },
        { question: 'How is precision maintained during floating-point conversion?', answer: 'Values are transformed via standardized base-SI intermediate representations with floating-point guard digits.' },
      ],
      ar: [
        { question: 'ما هي معايير القياس الدولية المتبعة؟', answer: 'تعتمد الحسابات على تعريفات المعهد الدولي للأوزان والمقاييس (BIPM) وNIST وISO باستخدام نسب تحويل قطعية.' },
        { question: 'كيف يتم التعامل مع مقاييس الحرارة غير الخطية؟', answer: 'تطبق معادلات التحويل الكاملة متضمنة الإزاحة الصفرية (مثل ف = س × 1.8 + 32) بدلاً من الضرب البسيط.' },
        { question: 'كيف تضمن الأداة الدقة وتفادي أخطاء التقريب؟', answer: 'تُحول القيم أولاً إلى الوحدة الدولية المرجعية (SI) بدقة مضاعفة ثم إلى الوحدة المطلوبة بأقل نسبة خطأ رقمي.' },
      ],
      es: [
        { question: '¿Qué normativas de metrología se aplican?', answer: 'Se emplean las definiciones oficiales del NIST, BIPM e ISO con coeficientes de conversión rigurosos.' },
        { question: '¿Cómo se procesan escalas no lineales como la temperatura?', answer: 'Se aplican transformaciones algebraicas completas con origen desplazado (°F = °C × 1,8 + 32).' },
        { question: '¿Cómo se preserva la precisión decimal?', answer: 'El motor convierte a través de la unidad base SI central utilizando aritmética de punto flotante de 64 bits.' },
      ],
      fr: [
        { question: 'Quelles sont les normes métrologiques appliquées ?', answer: 'Les calculs appliquent rigoureusement les rapports de conversion du Système International (BIPM, ISO).' },
        { question: 'Comment sont traitées les échelles non linéaires (températures) ?', answer: 'Elles intègrent les constantes de décalage d’origine zéro (°F = °C × 1,8 + 32, K = °C + 273,15).' },
        { question: 'Comment est assurée la précision des calculs ?', answer: 'Toutes les grandeurs passent par l’unité SI de référence en virgule flottante double précision.' },
      ],
      de: [
        { question: 'Welche Umrechnungsnormen liegen zugrunde?', answer: 'Die Faktoren basieren auf verbindlichen Definitionen des BIPM, NIST und der DIN/ISO-Normung.' },
        { question: 'Wie werden nichtlineare Skalen (z. B. Temperatur) berechnet?', answer: 'Über vollständige affine Formeln inklusive Nullpunktverschiebung (°F = °C × 1,8 + 32, K = °C + 273,15).' },
        { question: 'Wie wird die Rechengenauigkeit garantiert?', answer: 'Die Umrechnung erfolgt über die jeweilige SI-Basiseinheit mit doppelter Gleitkommapräzision.' },
      ],
    },
  },

  'linear-algebra': {
    audience: {
      en: 'Mathematicians, data scientists, computer graphics engineers, physics researchers, and linear algebra students.',
      ar: 'علماء البيانات ومهندسو الرسوميات والفيزيائيون وطلاب الجبر الخطي لحساب المصفوفات والمتجهات.',
      es: 'Matemáticos, científicos de datos, ingenieros de gráficos 3D y estudiantes de álgebra lineal.',
      fr: 'Mathématiciens, data scientists, ingénieurs en imagerie 3D et étudiants en algèbre linéaire.',
      de: 'Mathematiker, Data Scientists, Computergrafik-Entwickler und Studenten der linearen Algebra.',
    },
    introSummary: {
      en: (n) => `The ${n} evaluates matrix transformations, determinants, inverses, eigenvalues, or vector operations essential for multidimensional coordinate math and system modeling.`,
      ar: (n) => `تقوم ${n} بحساب تحويلات المصفوفات والمحددات والمصفوفات المعكوسة والقيم الذاتية اللازمة للهندسة الرياضية ونظم المعادلات.`,
      es: (n) => `La calculadora ${n} calcula operaciones matriciales, determinantes, matrices inversas y vectores para sistemas multivariantes.`,
      fr: (n) => `Le calculateur ${n} traite les opérations matricielles, déterminants, inverses et valeurs propres pour l’algèbre multidimensionnelle.`,
      de: (n) => `Der ${n} berechnet Matrizenoperationen, Determinanten, inverse Matrizen und Vektoren für lineare Gleichungssysteme.`,
    },
    howToSteps: {
      en: [
        'Set matrix dimensions (e.g., 2x2, 3x3, or vector components).',
        'Enter numerical coefficients into the matrix cells.',
        'Review the calculated determinant, inverted matrix, trace, or transformed vector output.',
      ],
      ar: [
        'حدد أبعاد المصفوفة (مثل 2×2 أو 3×3 أو عناصر المتجه).',
        'أدخل المعاملات والأرقام في خانات المصفوفة المخصصة.',
        'استعرض المحدد المحسوب أو معكوس المصفوفة أو المتجه الناتج مع خطوات الحل.',
      ],
      es: [
        'Seleccione las dimensiones de la matriz (2x2, 3x3 o componentes de vectores).',
        'Introduzca los coeficientes numéricos en las celdas de la matriz.',
        'Consulte el determinante resultante, matriz inversa o producto vectorial.',
      ],
      fr: [
        'Définissez les dimensions de la matrice (2x2, 3x3 ou coordonnées de vecteurs).',
        'Renseignez les coefficients réels dans les cases correspondantes.',
        'Examinez le déterminant, la matrice inverse ou les valeurs propres calculées.',
      ],
      de: [
        'Wählen Sie die Dimensionen der Matrix (z. B. 2x2, 3x3 oder Vektorkomponenten).',
        'Tragen Sie die Zahlenwerte in die Matrizenfelder ein.',
        'Lesen Sie Determinante, inverse Matrix oder Eigenwerte unmittelbar ab.',
      ],
    },
    faqs: {
      en: [
        { question: 'What does a zero determinant signify?', answer: 'A matrix with det(A) = 0 is singular and non-invertible, indicating linearly dependent row or column vectors.' },
        { question: 'What algebraic condition ensures matrix invertibility?', answer: 'A square matrix A is invertible if and only if its determinant is non-zero (det(A) ≠ 0).' },
        { question: 'How is matrix multiplication non-commutative?', answer: 'In general, A × B ≠ B × A; matrix multiplication order determines the sequence of linear geometric transformations.' },
      ],
      ar: [
        { question: 'ماذا يعني إذا كان محدد المصفوفة صفراً؟', answer: 'المصفوفة التي محددها صفر تكون مصفوفة شاذة (منفردة) وغير قابلة للعكس، مما يدل على ارتباط خطي بين صفوفها أو أعمدتها.' },
        { question: 'ما هو شرط وجود معكوس للمصفوفة؟', answer: 'تكون المصفوفة المربعة قابلة للعكس إذا وفقط إذا كان محددها لا يساوي صفراً (det(A) ≠ 0).' },
        { question: 'لماذا لا تكون عملية ضرب المصفوفات تبادلية؟', answer: 'بوجه عام A × B لا يساوي B × A؛ حيث يعبر ترتيب الضرب عن تسلسل التحويلات الهندسية المكانية.' },
      ],
      es: [
        { question: '¿Qué significa que un determinante sea cero?', answer: 'Indica una matriz singular no invertible, cuyas filas o columnas son linealmente dependientes.' },
        { question: '¿Cuál es la condición para que exista matriz inversa?', answer: 'Una matriz cuadrada es invertible si y solo si su determinante es estrictamente distinto de cero.' },
        { question: '¿Por qué el producto matricial no es conmutativo?', answer: 'Porque en álgebra lineal A × B ≠ B × A; el orden define la composición sucesiva de transformaciones.' },
      ],
      fr: [
        { question: 'Que signifie un déterminant nul ?', answer: 'Une matrice de déterminant nul est singulière (non inversible), signifiant des vecteurs liés.' },
        { question: 'Quelle condition garantit l’inversibilité d’une matrice ?', answer: 'Une matrice carrée est inversible si et seulement si son déterminant est non nul (det(A) ≠ 0).' },
        { question: 'Pourquoi le produit de matrices n’est-il pas commutatif ?', answer: 'En règle générale A × B ≠ B × A; l’ordre détermine l’enchaînement des applications linéaires dans l’espace.' },
      ],
      de: [
        { question: 'Was bedeutet eine Determinante von null?', answer: 'Eine Matrix mit det(A) = 0 ist singulär und nicht invertierbar; ihre Zeilenvektoren sind linear abhängig.' },
        { question: 'Wann besitzt eine Matrix eine Inverse?', answer: 'Eine quadratische Matrix ist genau dann invertierbar, wenn ihre Determinante ungleich null ist.' },
        { question: 'Warum ist die Matrizenmultiplikation nicht kommutativ?', answer: 'Im Allgemeinen gilt A × B ≠ B × A; die Reihenfolge bestimmt die Abfolge geometrischer Abbildungen.' },
      ],
    },
  },

  'calculus': {
    audience: {
      en: 'Calculus students, physicists, mechanical engineers, and quantitative analysts evaluating derivatives, integrals, and dynamic rate changes.',
      ar: 'طلاب التفاضل والتكامل والفيزيائيون والمهندسون لحساب المشتقات والتكاملات ومعدلات التغير اللحظية.',
      es: 'Estudiantes de cálculo, físicos e ingenieros que resuelven derivadas, integrales y tasas de cambio.',
      fr: 'Étudiants en analyse mathématique, physiciens et ingénieurs pour le calcul différentiel et intégral.',
      de: 'Studenten, Physiker und Ingenieure zur Berechnung von Ableitungen, Integralen und Grenzwerten.',
    },
    introSummary: {
      en: (n) => `The ${n} applies fundamental theorems of calculus to compute analytical derivatives, definite/indefinite integrals, limits, or differential equation trajectories.`,
      ar: (n) => `تطبق ${n} النظريات الأساسية للتفاضل والتكامل لحساب المشتقات الدقيقة والتكاملات المحددة ومعادلات التغير المستمر.`,
      es: (n) => `La calculadora ${n} aplica los teoremas fundamentales del cálculo para resolver derivadas, integrales definidas y ecuaciones diferenciales.`,
      fr: (n) => `Le calculateur ${n} applique le théorème fondamental de l’analyse pour résoudre dérivées, intégrales et équations différentielles.`,
      de: (n) => `Der ${n} wendet die Grundsätze der Analysis an, um Ableitungen, bestimmte Integrale und Grenzwerte analytisch zu berechnen.`,
    },
    howToSteps: {
      en: [
        'Enter the mathematical function f(x) or differential equation expression.',
        'Specify evaluation bounds (for definite integrals) or the target variable of differentiation.',
        'Review the resulting symbolic expression, area under curve, or instantaneous slope value.',
      ],
      ar: [
        'أدخل الدالة الرياضية f(x) أو معادلة التغير المطلوب حلها.',
        'حدد حدود التكامل (في التكامل المحدد) أو متغير الاشتقاق المستهدف.',
        'استعرض المشتقة الناتجة أو المساحة تحت المنحنى ومعدل التغير اللحظي.',
      ],
      es: [
        'Introduzca la función matemática f(x) o ecuación correspondiente.',
        'Defina los límites de integración o la variable respecto a la cual diferenciar.',
        'Examine la expresión algebraica resultante y el valor numérico calculado.',
      ],
      fr: [
        'Saisissez la fonction f(x) ou l’expression différentielle à traiter.',
        'Indiquez les bornes d’intégration ou la variable de dérivation.',
        'Consultez la dérivée obtenue, l’aire sous la courbe ou la trajectoire intégrée.',
      ],
      de: [
        'Geben Sie die mathematische Funktion f(x) oder Differenzialgleichung ein.',
        'Legen Sie Integrationsgrenzen oder die Differenziationsvariable fest.',
        'Prüfen Sie die abgeleitete Funktion, das Integral oder die Steigung an der Stelle x.',
      ],
    },
    faqs: {
      en: [
        { question: 'What does a derivative geometrically represent?', answer: 'A derivative represents the exact slope of the tangent line to a curve at an infinitesimal point, indicating rate of change.' },
        { question: 'What is the relationship between derivatives and integrals?', answer: 'By the Fundamental Theorem of Calculus, differentiation and integration are inverse mathematical operations.' },
        { question: 'How are boundary limits evaluated near asymptotes?', answer: 'Limits near vertical asymptotes or indeterminate forms (0/0, ∞/∞) are resolved using algebraic factorization or L’Hôpital’s rule.' },
      ],
      ar: [
        { question: 'ما هو المعنى الهندسي للمشتقة؟', answer: 'تمثل المشتقة ميل المماس الدقيق لمنحنى الدالة عند نقطة متناهية الصغر، معبرة عن معدل التغير اللحظي.' },
        { question: 'ما هي العلاقة بين التفاضل والتكامل؟', answer: 'وفق النظرية الأساسية للتفاضل والتكامل، يعتبر التكامل العملية العكسية للاشتقاق الرياضي.' },
        { question: 'كيف يتم تقييم النهايات عند القيم غير المعرفة؟', answer: 'تُعالج النهايات عند صيغ عدم التعيين (مثل 0/0) باستخدام التحليل الجبري أو قاعدة لوبيتال.' },
      ],
      es: [
        { question: '¿Qué representa geométricamente una derivada?', answer: 'Es la pendiente de la recta tangente a la función en un punto concreto, indicando la tasa instantánea de cambio.' },
        { question: '¿Qué relación existe entre derivación e integración?', answer: 'Según el Teorema Fundamental del Cálculo, la integración es la operación matemática inversa a la derivación.' },
        { question: '¿Cómo se resuelven indeterminaciones en límites?', answer: 'Las indeterminaciones de tipo 0/0 o ∞/∞ se resuelven mediante factorización algebraica o la regla de L’Hôpital.' },
      ],
      fr: [
        { question: 'Que représente géométriquement la dérivée ?', answer: 'Elle correspond à la pente de la tangente à la courbe en un point donné, mesurant la vitesse de variation.' },
        { question: 'Quel lien unit dérivée et intégrale ?', answer: 'Le théorème fondamental de l’analyse établit que l’intégration est l’opération réciproque de la dérivation.' },
        { question: 'Comment sont traitées les formes indéterminées de limites ?', answer: 'Les formes indéterminées (0/0, ∞/∞) sont résolues par factorisation ou par la règle de L’Hôpital.' },
      ],
      de: [
        { question: 'Was bedeutet die Ableitung geometrisch?', answer: 'Sie beschreibt die Steigung der Tangente an den Funktionsgraphen an einer Stelle und damit die momentane Änderungsrate.' },
        { question: 'Welche Verbindung besteht zwischen Ableitung und Integral?', answer: 'Nach dem Hauptsatz der Differential- und Integralrechnung sind Differenzieren und Integrieren zueinander inverse Operationen.' },
        { question: 'Wie werden unbestimmte Grenzwerte aufgelöst?', answer: 'Ausdrücke wie 0/0 oder ∞/∞ werden analytisch über Faktorisierung oder die Regel von de L’Hôpital berechnet.' },
      ],
    },
  },

  'statistics': {
    audience: {
      en: 'Statisticians, researchers, data analysts, psychologists, and quality control engineers analyzing datasets and distributions.',
      ar: 'الإحصائيون والباحثون ومحللو البيانات ومسؤولو الجودة لتحليل العينات والبيانات الإحصائية والتوزيعات.',
      es: 'Estadísticos, investigadores científicos, analistas de datos y responsables de control de calidad.',
      fr: 'Statisticiens, chercheurs, data analysts et qualiticiens analysant des échantillons et séries de données.',
      de: 'Statistiker, Forscher, Datenanalysten und Qualitätsprüfer zur Auswertung von Stichproben und Kennwerten.',
    },
    introSummary: {
      en: (n) => `The ${n} calculates descriptive and inferential parameters including mean, median, standard deviation, z-scores, and probability density functions for empirical datasets.`,
      ar: (n) => `تحسب ${n} المعالم الإحصائية الوصفية والاستدلالية كالمتوسط والوسيط والانحراف المعياري ودرجات z والتوزيعات الاحتمالية.`,
      es: (n) => `La calculadora ${n} calcula parámetros descriptivos e inferenciales (media, mediana, desviación típica, z-score) para series de datos.`,
      fr: (n) => `Le calculateur ${n} détermine les indicateurs statistiques descriptifs et inférentiels (moyenne, écart-type, médiane, scores z).`,
      de: (n) => `Der ${n} ermittelt statistische Kennwerte wie Mittelwert, Median, Standardabweichung, Varianz und Z-Werte für Datensätze.`,
    },
    howToSteps: {
      en: [
        'Enter your dataset numbers (comma or space separated) or sample distribution parameters.',
        'Select whether the data represents a sample (n - 1) or complete population (N).',
        'Review the calculated sample mean, variance, standard deviation, and interquartile range.',
      ],
      ar: [
        'أدخل أرقام العينة أو البيانات الإحصائية (مفصولة بفواصل أو مسافات).',
        'حدد ما إذا كانت البيانات تمثل عينة إحصائية (n - 1) أو مجتمعاً كلياً (N).',
        'استعرض المتوسط الحسابي والتباين والانحراف المعياري والمدى الربيعي في لوحة النتائج.',
      ],
      es: [
        'Introduzca los valores de la muestra separados por comas o espacios.',
        'Indique si los datos corresponden a una muestra muestral (n - 1) o a una población completa (N).',
        'Consulte la media, varianza, desviación estándar y percentiles resultantes.',
      ],
      fr: [
        'Saisissez les valeurs de votre série de données séparées par des espaces ou des virgules.',
        'Précisez s’il s’agit d’un échantillon (degrés de liberté n - 1) ou d’une population entière (N).',
        'Examinez la moyenne, la variance, l’écart-type et les quartiles obtenus.',
      ],
      de: [
        'Tragen Sie Ihre Messwerte getrennt durch Kommas oder Leerzeichen ein.',
        'Wählen Sie, ob es sich um eine Stichprobe (n - 1) oder die Grundgesamtheit (N) handelt.',
        'Analysieren Sie Mittelwert, Varianz, Standardabweichung und Quartilsabstand.',
      ],
    },
    faqs: {
      en: [
        { question: 'Why is sample standard deviation divided by (n - 1)?', answer: 'Bessel’s correction (n - 1) corrects for downward bias, providing an unbiased estimator of true population variance.' },
        { question: 'How does the median resist extreme outliers?', answer: 'The median represents positional ranking rather than magnitude summation, making it robust against extreme skewness.' },
        { question: 'What does a Z-score quantify?', answer: 'A Z-score measures exactly how many standard deviations a raw data point lies above or below the distribution mean.' },
      ],
      ar: [
        { question: 'لماذا يُقسم انحراف العينة المعياري على (n - 1)؟', answer: 'يُطبق تصحيح بيسل (n - 1) لمعادلة الانحياز الإحصائي وتقديم تقدير غير متحيز لتباين المجتمع الأصلي.' },
        { question: 'لماذا يعتبر الوسيط مقاوماً للقيم المتطرفة؟', answer: 'يعتمد الوسيط على الرتبة الموضعية للبيانات بدلاً من مجموع القيم العددية، مما يجعله محصناً ضد الشذوذ.' },
        { question: 'ماذا تقيس الدرجة المعيارية (Z-score)؟', answer: 'تقيس عدد الانحرافات المعيارية التي تبعدها القيمة عن المتوسط الحسابي للتوزيع.' },
      ],
      es: [
        { question: '¿Por qué la desviación muestral divide por (n - 1)?', answer: 'Aplica la corrección de Bessel para eliminar el sesgo sistemático y estimar con exactitud la varianza poblacional.' },
        { question: '¿Por qué la mediana no se ve afectada por valores atípicos?', answer: 'Porque es una medida posicional que no depende de la magnitud numérica de los extremos.' },
        { question: '¿Qué cuantifica una puntuación Z?', answer: 'Mide cuántas desviaciones estándar dista un dato respecto a la media aritmética de su distribución.' },
      ],
      fr: [
        { question: 'Pourquoi la variance d’un échantillon utilise-t-elle (n - 1) ?', answer: 'La correction de Bessel (n - 1) compense le biais d’estimation pour approcher la variance réelle de la population.' },
        { question: 'Pourquoi la médiane est-elle insensible aux valeurs extrêmes ?', answer: 'La médiane est un indicateur de position qui dépend du rang et non de la somme des valeurs extrêmes.' },
        { question: 'Que mesure une note Z (score Z) ?', answer: 'Elle quantifie l’écart d’une observation par rapport à la moyenne en nombre d’écarts-types.' },
      ],
      de: [
        { question: 'Warum wird die Stichprobenvarianz durch (n - 1) geteilt?', answer: 'Die Bessel-Korrektur (n - 1) beseitigt die systematische Unterschätzung der wahren Varianz der Grundgesamtheit.' },
        { question: 'Warum ist der Median unempfindlich gegenüber Ausreißern?', answer: 'Der Median ist ein lagestabiler Wert, der von der Reihenfolge und nicht von den Extremwerten abhängt.' },
        { question: 'Was drückt ein Z-Wert (Standardwert) aus?', answer: 'Er gibt an, wie viele Standardabweichungen ein einzelner Messwert über oder unter dem Mittelwert liegt.' },
      ],
    },
  },

  'science': {
    audience: {
      en: 'Physicists, chemistry students, laboratory researchers, and STEM educators modeling scientific equations and physical principles.',
      ar: 'علماء الفيزياء والباحثون في الكيمياء وطلاب العلوم والهندسة لنمذجة القوانين والمعادلات العلمية.',
      es: 'Físicos, químicos, estudiantes de ciencias y docentes que aplican leyes físicas y químicas.',
      fr: 'Physiciens, chimistes, chercheurs et étudiants en sciences appliquant les lois physiques et stœchiométriques.',
      de: 'Physiker, Chemiker, Naturwissenschaftler und Studenten zur Berechnung physikalischer und chemischer Gesetze.',
    },
    introSummary: {
      en: (n) => `The ${n} evaluates physical, thermodynamic, or chemical equations according to standard SI physical laws, conservation principles, and empirical formulas.`,
      ar: (n) => `تطبق ${n} القوانين الفيزيائية والديناميكية الحرارية والكيميائية وفق النظام الدولي للوحدات ومبادئ حفظ الطاقة.`,
      es: (n) => `La calculadora ${n} modela principios de física, termodinámica y química conforme al Sistema Internacional (SI) y leyes de conservación.`,
      fr: (n) => `Le calculateur ${n} applique les lois de la physique, de la thermodynamique et de la chimie conformément aux normes du Système International.`,
      de: (n) => `Der ${n} berechnet physikalische, thermodynamische und chemische Zusammenhänge nach den standardisierten SI-Einheiten.`,
    },
    howToSteps: {
      en: [
        'Input known physical constants and measured experimental variables (mass, velocity, voltage, resistance, or temperature).',
        'Verify consistent SI measurement units across all input parameters.',
        'Review the calculated force, energy in Joules, kinetic power, or chemical concentration.',
      ],
      ar: [
        'أدخل الثوابت الفيزيائية والمتغيرات المقاسة (الكتلة، السرعة، الجهد، المقاومة، أو درجة الحرارة).',
        'تأكد من توافق الوحدات الدولية المستخدمة عبر جميع الحقول.',
        'استعرض القوة المحسوبة، أو الطاقة بالجول، أو القدرة الكهربائية، أو التركيز الكيميائي.',
      ],
      es: [
        'Introduzca las variables experimentales conocidas (masa, velocidad, voltaje, temperatura, concentración).',
        'Verifique la concordancia de unidades dentro del Sistema Internacional.',
        'Consulte la energía resultante en julios, fuerza en newtons o potencia calculada.',
      ],
      fr: [
        'Renseignez les variables physiques mesurées (masse, vitesse, tension, résistance, température).',
        'Vérifiez la cohérence des unités dans le Système International.',
        'Examinez l’énergie calculée en Joules, la force en Newtons ou la puissance électrique.',
      ],
      de: [
        'Geben Sie die bekannten Messwerte (Masse, Geschwindigkeit, Spannung, Widerstand, Temperatur) ein.',
        'Achten Sie auf konsistente SI-Einheiten bei allen Parametern.',
        'Prüfen Sie die berechnete Kraft in Newton, Energie in Joule oder Leistung in Watt.',
      ],
    },
    faqs: {
      en: [
        { question: 'What physical laws govern this equation?', answer: 'Calculations adhere strictly to foundational laws of conservation of energy, momentum, and standard SI relationships.' },
        { question: 'Why is unit consistency mandatory in physics equations?', answer: 'Dimensional analysis requires base units (kg, m, s, A, K) to balance across equations without scale distortion.' },
        { question: 'Are relativistic or quantum corrections applied?', answer: 'Classical Newtonian and thermodynamic models are assumed unless relativistic velocities or quantum scales are specified.' },
      ],
      ar: [
        { question: 'ما هي القوانين الفيزيائية الحاكمة لهذه العملية؟', answer: 'تعتمد الحسابات على مبادئ حفظ الطاقة والكتلة والزخم وقوانين نيوتن والمعادلات الكهرومغناطيسية.' },
        { question: 'لماذا يعتبر تجانس الوحدات أمراً إلزامياً؟', answer: 'يشترط التحليل البعدي الفيزيائي استخدام وحدات النظام الدولي الأساسية لمنع أخطاء المقاييس الرياضية.' },
        { question: 'هل تشمل الحسابات تأثيرات النسبية أو الكم؟', answer: 'تعتمد الحسابات على النماذج الكلاسيكية لنيوتن والديناميكا الحرارية في السرعات والظروف الطبيعية.' },
      ],
      es: [
        { question: '¿Qué leyes físicas sustentan este cálculo?', answer: 'Se basa en principios de conservación de la energía, momento lineal y formulaciones newtonianas y electromagnéticas.' },
        { question: '¿Por qué es indispensable la coherencia de unidades?', answer: 'El análisis dimensional exige trabajar en unidades fundamentales (kg, m, s) para evitar distorsiones.' },
        { question: '¿Se aplican efectos relativistas?', answer: 'Se asumen condiciones clásicas newtonianas salvo especificación explícita de velocidades relativistas.' },
      ],
      fr: [
        { question: 'Quelles lois physiques régissent ce calcul ?', answer: 'Les calculs appliquent les principes de conservation de l’énergie, de la masse et les lois de Newton ou d’Ohm.' },
        { question: 'Pourquoi la cohérence dimensionnelle est-elle essentielle ?', answer: 'L’analyse dimensionnelle requiert des unités cohérentes du Système International pour garantir la validité du résultat.' },
        { question: 'Les effets relativistes sont-ils pris en compte ?', answer: 'Les modèles appliquent la mécanique classique newtonienne valable aux vitesses non relativistes.' },
      ],
      de: [
        { question: 'Welche physikalischen Gesetze liegen der Formel zugrunde?', answer: 'Die Berechnungen folgen den Erhaltungssätzen für Energie und Impuls sowie den Newtonschen Axiomen.' },
        { question: 'Warum ist Einheitenkonsistenz in der Physik unverzichtbar?', answer: 'Die Dimensionsanalyse erfordert zwingend konsistente Basiseinheiten (kg, m, s), um fehlerfreie Ergebnisse zu liefern.' },
        { question: 'Werden relativistische Effekte berücksichtigt?', answer: 'Standardmäßig gelten die Gesetze der klassischen Mechanik für subrelativistische Geschwindigkeiten.' },
      ],
    },
  },

  'engineering': {
    audience: {
      en: 'Civil engineers, electrical contractors, trade carpenters, HVAC technicians, and builders sizing structural and utility components.',
      ar: 'المهندسون المدنيون والكهربائيون والفنيون والمقاولون لحساب الأحمال الإنشائية والتمديدات وأجهزة التكييف.',
      es: 'Ingenieros, arquitectos técnicos, electricistas y constructores que dimensionan estructuras e instalaciones.',
      fr: 'Ingénieurs du BTP, artisans, électriciens et chauffagistes dimensionnant des ouvrages et réseaux.',
      de: 'Bauingenieure, Elektriker, Handwerker und Klimatechniker zur Dimensionierung von Bau- und Haustechnik.',
    },
    introSummary: {
      en: (n) => `The ${n} applies engineering design codes, material capacities, and load equations to size structural framing, electrical circuits, HVAC BTU requirements, or construction materials.`,
      ar: (n) => `تطبق ${n} المعايير الهندسية وأكواد البناء لحساب قدرات التحمل الإنشائي والأحمال الكهربائية واحتياجات التكييف والتبريد.`,
      es: (n) => `La calculadora ${n} aplica códigos de edificación y resistencia de materiales para dimensionar estructuras, instalaciones eléctricas y climatización.`,
      fr: (n) => `Le calculateur ${n} applique les règles de l’art et les normes de construction pour dimensionner structures, réseaux et puissance thermique.`,
      de: (n) => `Der ${n} dimensioniert Bauteile, Leitungsquerschnitte, Heiz-/Kühllasten und Baumaterialien nach bautechnischen Standards.`,
    },
    howToSteps: {
      en: [
        'Enter dimensional spans, square footage, design loads, or electrical amperage ratings.',
        'Select material specifications (e.g., concrete strength, lumber grade, copper wire gauge).',
        'Review the required structural dimensions, material quantities, or circuit capacity recommendations.',
      ],
      ar: [
        'أدخل الأبعاد أو المساحة أو الأحمال التصميمية أو سعة التيار الكهربائي بالأمبير.',
        'حدد مواصفات المواد (مقاومة الخرسانة، نوع الخشب، أو قطر أسلاك النحاس).',
        'استعرض الأبعاد الإنشائية الموصى بها وكميات المواد المطلوبة بدقة.',
      ],
      es: [
        'Introduzca dimensiones, superficies, cargas de diseño o amperaje eléctrico.',
        'Seleccione las especificaciones de materiales (resistencia de hormigón, tipo de madera, calibre de cable).',
        'Consulte las cantidades de material recomendadas y los márgenes de seguridad calculados.',
      ],
      fr: [
        'Renseignez les dimensions, surfaces, charges d’exploitation ou intensités électriques.',
        'Précisez les caractéristiques des matériaux (classe de béton, section de câble, essence de bois).',
        'Consultez les quantités de matériaux nécessaires et les tolérances recommandées.',
      ],
      de: [
        'Geben Sie Abmessungen, Flächen, Lastannahmen oder elektrische Stromstärken ein.',
        'Wählen Sie Materialkennwerte (Betongüte, Holzklasse, Leitungsquerschnitt).',
        'Prüfen Sie die erforderlichen Dimensionen, Materialmengen und Sicherheitsbeiwerte.',
      ],
    },
    faqs: {
      en: [
        { question: 'How do safety factors affect these engineering values?', answer: 'Real-world structural and electrical design incorporates building code safety factors (typically 1.25x–2.0x) over theoretical minimums.' },
        { question: 'Why must material waste allowances be added?', answer: 'Construction ordering requires an extra 5%–15% allowance to accommodate jobsite cutting waste, overlaps, and site breakage.' },
        { question: 'Are these calculations sufficient for stamped permits?', answer: 'They provide preliminary estimation; stamped engineering permits require verification by a licensed professional engineer (PE).' },
      ],
      ar: [
        { question: 'كيف تؤثر معاملات الأمان الهندسية على النتائج؟', answer: 'تدمج التصاميم الهندسية الواقعية معاملات أمان وفق كود البناء (تتراوح بين 1.25 إلى 2.0 ضعف) فوق الحدود النظرية.' },
        { question: 'لماذا يجب إضافة نسبة هدر للمواد؟', answer: 'تتطلب مشتريات البناء إضافة 5% إلى 15% لتغطية الهدر الناتج عن القص والتركيب أثناء التنفيذ.' },
        { question: 'هل هذه الحسابات كافية لاعتماد المخططات الرسمية؟', answer: 'تعتبر تقديرات أولية ممتازة، بينما تتطلب الرخص والتصاريح الرسمية مصادقة مهندس نقابي معتمد.' },
      ],
      es: [
        { question: '¿Cómo influyen los coeficientes de seguridad?', answer: 'El cálculo profesional aplica factores de seguridad (1,25x a 2,0x) sobre los límites teóricos según normativa.' },
        { question: '¿Por qué se debe añadir porcentaje de merma?', answer: 'Es indispensable sumar entre un 5% y un 15% para absorber cortes, solapes y desperdicios de obra.' },
        { question: '¿Son vinculantes para proyectos visados?', answer: 'Sirven para predimensionamiento; un proyecto visado exige la firma de un arquitecto o ingeniero colegiado.' },
      ],
      fr: [
        { question: 'Comment interviennent les coefficients de sécurité ?', answer: 'Les normes de construction imposent des coefficients de sécurité (1,25 à 2,0) au-delà des minima théoriques.' },
        { question: 'Pourquoi prévoir une marge de chute ou de perte ?', answer: 'Il convient d’ajouter 5 % à 15 % lors des commandes pour compenser les découpes et aléas de chantier.' },
        { question: 'Ces calculs valent-ils note de calcul officielle ?', answer: 'Ils constituent une aide au pré-dimensionnement mais ne remplacent pas l’étude validée par un bureau de contrôle.' },
      ],
      de: [
        { question: 'Welche Rolle spielen Sicherheitsbeiwerte?', answer: 'Baunormen fordern Sicherheitsfaktoren von 1,25x bis 2,0x über den rein rechnerischen Mindestwerten.' },
        { question: 'Warum sollte Verschnitt eingeplant werden?', answer: 'Bei Materialbestellungen empfiehlt sich ein Zuschlag von 5–15 % für Zuschnitt, Fugen und Bruch.' },
        { question: 'Genügen die Ergebnisse für statische Nachweise?', answer: 'Sie dienen der Vorbemessung; behördliche Genehmigungen erfordern einen geprüften Standsicherheitsnachweis.' },
      ],
    },
  },

  'developer-tools': {
    audience: {
      en: 'Software developers, DevOps engineers, system administrators, and security specialists processing structured data, encodings, and network protocols.',
      ar: 'مطورو البرمجيات ومهندسو الأنظمة والشبكات والمتخصصون في أمن المعلومات لمعالجة البيانات والتشفير والترميز.',
      es: 'Desarrolladores de software, administradores de sistemas y DevOps para formateo de datos, codificación y redes.',
      fr: 'Développeurs informatiques, administrateurs système et ingénieurs DevOps traitant formats, encodages et réseaux.',
      de: 'Softwareentwickler, Systemadministratoren und DevOps-Engineers zur Datenverarbeitung, Kodierung und Netzwerkprüfung.',
    },
    introSummary: {
      en: (n) => `The ${n} executes deterministic client-side transformations, cryptographic hashing, regular expression matching, or network subnet partitioning adhering to official RFC specifications.`,
      ar: (n) => `تنفذ ${n} معالجة فورية وتشفير وتحويلات برمجية للبيانات والشبكات داخل المتصفح بالكامل وفق معايير RFC المعتمدة.`,
      es: (n) => `La herramienta ${n} realiza transformaciones deterministas en el navegador (hashing, regex, subnetting) cumpliendo especificaciones RFC oficiales.`,
      fr: (n) => `Le calculateur ${n} traite en local les encodages, hachages cryptographiques, expressions régulières et calculs de sous-réseaux (RFC).`,
      de: (n) => `Der ${n} führt clientseitige Datenumwandlungen, kryptografische Hashes, Regex-Prüfungen und Subnetzberechnungen nach RFC-Standards aus.`,
    },
    howToSteps: {
      en: [
        'Paste your input string, cryptographic key, IP network CIDR, or raw JSON payload.',
        'Configure transformation settings, hash algorithms, or subnet masking parameters.',
        'Copy the formatted syntax, validated token, or network address range with one click.',
      ],
      ar: [
        'الصق النص أو المفتاح أو كود JSON أو عنوان IP والشبكة المراد معالجتها.',
        'حدد خوارزمية التشفير أو التنسيق أو قناع الشبكة المطلوب.',
        'انسخ النتيجة المنسقة أو نطاق العناوين المحسوب بنقرة واحدة إلى الحافظة.',
      ],
      es: [
        'Pegue la cadena de texto, clave, dirección IP/CIDR o JSON en el editor.',
        'Seleccione el algoritmo de hash, formato o máscara de subred.',
        'Copie el resultado transformado o rango de direcciones con un solo clic.',
      ],
      fr: [
        'Collez votre chaîne de caractères, clé, bloc CIDR ou structure JSON.',
        'Sélectionnez l’algorithme de hachage, le formatage ou le masque de réseau.',
        'Copiez le résultat formaté ou la plage d’adresses IP directement dans votre presse-papiers.',
      ],
      de: [
        'Fügen Sie Ihren Text, Hash-Wert, JSON-Code oder IP/CIDR-Block in das Eingabefeld ein.',
        'Wählen Sie den gewünschten Algorithmus, Maskierung oder Formatierungsoption.',
        'Kopieren Sie das transformierte Ergebnis oder den Adressbereich mit einem Klick.',
      ],
    },
    faqs: {
      en: [
        { question: 'Are payloads or keys transmitted to a server?', answer: 'No. All processing, hashing, and regex evaluations run 100% locally in your web browser via client-side JavaScript.' },
        { question: 'Which cryptographic hash specifications are applied?', answer: 'Hashing complies with FIPS PUB 180-4 (SHA family) and RFC 1321 (MD5) standard byte implementations.' },
        { question: 'How are Unicode characters and UTF-8 multi-byte glyphs handled?', answer: 'Text encodings serialize strings into UTF-8 binary buffers before evaluating hashes or Base64 streams.' },
      ],
      ar: [
        { question: 'هل يتم إرسال نصوصي أو مفاتيحي البرمجية إلى أي خادم خارجي؟', answer: 'لا على الإطلاق. تتم جميع عمليات المعالجة والترميز والتشفير محلياً بنسبة 100% داخل متصفحك عبر جافا سكريبت.' },
        { question: 'ما هي معايير التشفير والهاش المعتمدة؟', answer: 'تتوافق الخوارزميات تماماً مع المعايير الفيدرالية FIPS ومعايير RFC المعتمدة دولياً لضمان تطابق البايتات.' },
        { question: 'كيف يتعامل المحرك مع الحروف العربية والرموز الخاصة؟', answer: 'تُحول النصوص بالكامل إلى تسلسل بايتات UTF-8 قياسي قبل التشفير لضمان مطابقة الهاش عبر جميع المنصات.' },
      ],
      es: [
        { question: '¿Se transmiten datos o credenciales a servidores externos?', answer: 'No. Todo el procesamiento se realiza localmente en su navegador sin enviar ningún dato por red.' },
        { question: '¿Qué estándares de cifrado se aplican?', answer: 'Cumple rigurosamente las normas FIPS 180-4 (familia SHA) y RFC estándar para compatibilidad universal.' },
        { question: '¿Cómo procesa caracteres Unicode y tildes?', answer: 'Los textos se codifican a nivel binario en búferes UTF-8 antes de aplicar hashes o codificaciones.' },
      ],
      fr: [
        { question: 'Mes données ou clés secrètes sont-elles envoyées sur un serveur ?', answer: 'Non. L’ensemble des opérations s’exécute localement dans votre navigateur sans aucune requête réseau.' },
        { question: 'Quelles normes de hachage sont respectées ?', answer: 'Les fonctions respectent les spécifications officielles FIPS 180-4 (famille SHA) et RFC en vigueur.' },
        { question: 'Comment sont traités les caractères accentués et Unicode ?', answer: 'Le texte est d’abord encodé en UTF-8 binaire avant tout hachage pour une compatibilité parfaite.' },
      ],
      de: [
        { question: 'Werden sensible Eingaben oder Keys an externe Server übermittelt?', answer: 'Nein. Sämtliche Parsing-, Hash- und Encoding-Prozesse laufen zu 100 % lokal im Browser ab.' },
        { question: 'Welche kryptografischen Standards werden eingehalten?', answer: 'Die Berechnungen entsprechen den FIPS-180-4-Vorgaben (SHA) und RFC-Normen für konsistente Byte-Ergebnisse.' },
        { question: 'Wie werden Sonderzeichen und Umlaute verarbeitet?', answer: 'Texte werden vor der Hash-Berechnung in standardisierte UTF-8-Bytefolgen konvertiert.' },
      ],
    },
  },

  'text-tools': {
    audience: {
      en: 'Copywriters, editors, digital marketers, content creators, and authors analyzing typography, readability, and text lengths.',
      ar: 'الكتاب والمحررون وصناع المحتوى والمسوقون الرقميون لتحليل النصوص والكلمات ومستوى المقروئية.',
      es: 'Redactores, correctores de estilo, especialistas en SEO y creadores de contenido digital.',
      fr: 'Rédacteurs web, éditeurs, référenceurs SEO et créateurs de contenu analysant textes et typographies.',
      de: 'Texter, Redakteure, SEO-Spezialisten und Autoren zur Analyse von Zeichen, Lesbarkeit und Formatierung.',
    },
    introSummary: {
      en: (n) => `The ${n} provides instantaneous lexical text analytics, character counting, word frequency statistics, and typographical case transformations.`,
      ar: (n) => `تقدم ${n} تحليلاً لغوياً فورياً للنصوص وإحصاء الكلمات والأحرف والفقرات وتحويلات التنسيق الطباعي.`,
      es: (n) => `La calculadora ${n} analiza la longitud de textos, densidad léxica, número de palabras y transformaciones tipográficas en tiempo real.`,
      fr: (n) => `Le calculateur ${n} analyse les statistiques de texte (mots, caractères, lisibilité) et effectue les conversions de casse instantanément.`,
      de: (n) => `Der ${n} analysiert Wortanzahl, Zeichenlängen, Lesbarkeitsindizes und führt typografische Textumwandlungen durch.`,
    },
    howToSteps: {
      en: [
        'Paste or type your text directly into the processing field.',
        'View real-time metric updates for word count, characters, sentences, and estimated reading time.',
        'Apply case transformations (title case, lowercase, uppercase, slug) and copy with one click.',
      ],
      ar: [
        'الصق النص أو اكتبه مباشرة داخل حقل المعالجة.',
        'شاهد التحديث اللحظي لعدد الكلمات والأحرف والجمل والوقت المقدر للقراءة.',
        'طبق تحويلات الأحرف (حروف كبيرة، صغيرة، أو عناوين) وانسخ النص النهائي بضغطة زر.',
      ],
      es: [
        'Pegue o escriba su texto en el área de trabajo.',
        'Observe el recuento instantáneo de palabras, caracteres sin espacios y tiempo estimado de lectura.',
        'Aplique conversiones de mayúsculas/minúsculas y copie el resultado al portapapeles.',
      ],
      fr: [
        'Collez ou saisissez votre texte dans la zone dédiée.',
        'Consultez en temps réel le nombre de mots, caractères, phrases et temps de lecture estimé.',
        'Appliquez les changements de casse souhaités et copiez le texte formaté.',
      ],
      de: [
        'Fügen Sie Ihren Text in das Bearbeitungsfeld ein.',
        'Verfolgen Sie die Echtzeit-Statistiken zu Wörtern, Zeichen und geschätzter Lesezeit.',
        'Wählen Sie gewünschte Groß-/Kleinschreibungen und kopieren Sie das Ergebnis.',
      ],
    },
    faqs: {
      en: [
        { question: 'How is word count computed across multiple languages?', answer: 'Words are partitioned using Unicode-aware whitespace and punctuation boundaries, ensuring accurate counts for international text.' },
        { question: 'How is estimated reading time determined?', answer: 'Reading duration assumes an international adult average benchmark of 200–250 words per minute (wpm).' },
        { question: 'Is my text stored or reviewed remotely?', answer: 'No. The entire text analytics engine operates strictly client-side inside your local browser memory for complete privacy.' },
      ],
      ar: [
        { question: 'كيف يتم حساب عدد الكلمات بدقة في اللغة العربية واللغات الأخرى؟', answer: 'تُفصل الكلمات بالاعتماد على معايير يونيكود للمسافات وعلامات الترقيم لضمان دقة الإحصاء.' },
        { question: 'كيف يُقدر وقت القراءة المتوقع للنص؟', answer: 'يعتمد التقدير على متوسط القراءة الطبيعي للبالغين وهو 200 إلى 250 كلمة في الدقيقة.' },
        { question: 'هل يتم حفظ أو إرسال نصوصي إلى أي خادم خارجي؟', answer: 'لا على الإطلاق، تتم كافة التحليلات النصية محلياً في ذاكرة متصفحك دون حفظ أو مشاركة.' },
      ],
      es: [
        { question: '¿Cómo se contabilizan las palabras en diferentes idiomas?', answer: 'Se identifican mediante delimitadores de puntuación y espacios compatibles con Unicode universal.' },
        { question: '¿Cómo se calcula el tiempo estimado de lectura?', answer: 'Se basa en la velocidad lectora media internacional de un adulto (entre 200 y 250 palabras por minuto).' },
        { question: '¿Se almacena mi texto en algún servidor?', answer: 'No. El análisis se procesa de forma 100% local en su navegador garantizando confidencialidad.' },
      ],
      fr: [
        { question: 'Comment sont comptés les mots dans différentes langues ?', answer: 'L’outil utilise les séparateurs d’espaces et de ponctuation conformes aux spécifications Unicode.' },
        { question: 'Comment est calculé le temps de lecture estimé ?', answer: 'Il se base sur une vitesse de lecture adulte moyenne de 200 à 250 mots par minute.' },
        { question: 'Mon texte est-il transmis sur un serveur distant ?', answer: 'Non. Toutes les analyses textuelles s’exécutent strictement en local dans votre navigateur.' },
      ],
      de: [
        { question: 'Wie werden Wörter sprachübergreifend gezählt?', answer: 'Die Erkennung trennt Wörter anhand von standardisierten Unicode-Wortgrenzen und Leerzeichen.' },
        { question: 'Wie wird die Lesezeit berechnet?', answer: 'Es wird von einer durchschnittlichen Lesegeschwindigkeit von 200–250 Wörtern pro Minute ausgegangen.' },
        { question: 'Wird der Text auf fremden Servern gespeichert?', answer: 'Nein. Die gesamte Textanalyse erfolgt rein lokal im Speicher Ihres Browsers für vollste Privatsphäre.' },
      ],
    },
  },

  'currency': {
    audience: {
      en: 'Forex traders, international travelers, cross-border businesses, and expatriates converting foreign exchange values.',
      ar: 'المتداولون والمسافرون والشركات الدولية والمغتربون لتحويل أسعار صرف العملات العالمية.',
      es: 'Operadores de divisas, viajeros internacionales y empresas que realizan transacciones multimoneda.',
      fr: 'Traders sur le Forex, voyageurs internationaux et entreprises gérant des transactions multidevises.',
      de: 'Devisenhändler, Reisende, Import-Export-Unternehmen und Grenzgänger zur Währungsumrechnung.',
    },
    introSummary: {
      en: (n) => `The ${n} provides currency conversion based on open reference market exchange rates and benchmark tables for global fiat currencies, metals, and digital assets.`,
      ar: (n) => `توفر ${n} أسعار صرف العملات بناءً على أسعار السوق المرجعية وقواعد البيانات المعيارية لكافة العملات العالمية والمعادن.`,
      es: (n) => `La calculadora ${n} realiza conversiones de divisas basadas en tipos de cambio de referencia de mercados abiertos para monedas fiduciarias y metales.`,
      fr: (n) => `Le calculateur ${n} effectue des conversions de devises basées sur les cours de référence du marché interbancaire ouvert.`,
      de: (n) => `Der ${n} berechnet Währungsumrechnungen auf Basis von Referenzkursen des offenen Devisenmarktes für internationale Währungen.`,
    },
    howToSteps: {
      en: [
        'Enter the monetary amount to convert.',
        'Choose the origin currency from the global currency database.',
        'Select the target counter-currency to view the converted reference amount instantly.',
      ],
      ar: [
        'أدخل المبلغ المالي المراد تحويله.',
        'اختر العملة الأساسية من قائمة العملات العالمية المتاحة.',
        'حدد العملة المقابلة المستهدفة للاطلاع على القيمة المعيارية المحولة فورياً.',
      ],
      es: [
        'Introduzca la cantidad monetaria a convertir.',
        'Seleccione la divisa de origen en el desplegable.',
        'Elija la divisa de destino para consultar el importe convertido de referencia.',
      ],
      fr: [
        'Saisissez le montant à convertir.',
        'Sélectionnez la devise de départ dans le menu des monnaies.',
        'Choisissez la devise de contrepartie pour voir le montant de référence calculé.',
      ],
      de: [
        'Geben Sie den umzurechnenden Geldbetrag ein.',
        'Wählen Sie die Ausgangswährung aus der globalen Währungsliste.',
        'Bestimmen Sie die Zielwährung, um den Gegenwert auf Referenzkursbasis anzuzeigen.',
      ],
    },
    faqs: {
      en: [
        { question: 'What exchange rates are shown?', answer: 'Rates reflect open reference interbank mid-market feeds and benchmark standard tables without retail banking markups.' },
        { question: 'Do commercial banks apply different rates?', answer: 'Yes. Retail banks and credit card issuers add foreign transaction spreads (typically 1.5%–3.5%) to wholesale rates.' },
        { question: 'How frequently are reference rates updated?', answer: 'Rates are retrieved from periodically updated open market feeds and cached in-memory for optimal stability.' },
      ],
      ar: [
        { question: 'ما هو نوع أسعار الصرف المعروضة في الأداة؟', answer: 'تعكس الأسعار متوسط السوق المرجعي المفتوح دون إضافة هوامش الربح والعمولات التي تفرضها البنوك التجارية.' },
        { question: 'هل تختلف أسعار البنوك ومكاتب الصرافة؟', answer: 'نعم. تفرض البنوك وشركات البطاقات الائتمانية هوامش تحويل وفروق أسعار تتراوح عادة بين 1.5% و3.5%.' },
        { question: 'كم مرة يتم تحديث أسعار الصرف المرجعية؟', answer: 'تُحدث الأسعار دورياً من مزودي بيانات السوق المفتوحة وتُحفظ مؤقتاً لضمان سرعة وتجاوب الأداة.' },
      ],
      es: [
        { question: '¿Qué tipo de cotizaciones se muestran?', answer: 'Son tipos de cambio medios de referencia del mercado interbancario sin comisiones de banca minorista.' },
        { question: '¿Aplican los bancos comerciales tipos diferentes?', answer: 'Sí. Las entidades bancarias y tarjetas de crédito aplican márgenes comerciales (habitualmente del 1,5% al 3,5%).' },
        { question: '¿Con qué frecuencia se actualizan las tasas?', answer: 'Se sincronizan periódicamente con fuentes abiertas de mercado y se almacenan en caché para mayor rapidez.' },
      ],
      fr: [
        { question: 'De quel type de taux de change s’agit-il ?', answer: 'Ce sont des cours moyens indicatifs de référence du marché interbancaire sans marge bancaire commerciale.' },
        { question: 'Les banques appliquent-elles ces mêmes taux ?', answer: 'Non. Les banques de détail et émetteurs de cartes ajoutent des commissions de change (souvent 1,5 % à 3,5 %).' },
        { question: 'À quelle fréquence les cours sont-ils réactualisés ?', answer: 'Les données proviennent de flux de marché ouverts mis à jour régulièrement et mis en cache.' },
      ],
      de: [
        { question: 'Welche Wechselkurse werden herangezogen?', answer: 'Es handelt sich um indikative Devisen-Mittelkurse des Interbankenmarktes ohne Bankenaufschläge.' },
        { question: 'Verwenden Geschäftsbanken abweichende Kurse?', answer: 'Ja. Hausbanken und Kreditkartenanbieter erheben Devisenmargen von meist 1,5 bis 3,5 %.' },
        { question: 'Wie oft werden die Kurse aktualisiert?', answer: 'Die Kurse stammen aus regelmäßig aktualisierten offenen Marktdaten und werden zwischengespeichert.' },
      ],
    },
  },

  'date-time': {
    audience: {
      en: 'Project managers, legal teams, payroll specialists, and individuals calculating date intervals, age, and business days.',
      ar: 'مديرو المشاريع والمحامون وأخصائيو الرواتب والأفراد لحساب الفترات الزمنية وفرق التواريخ وأيام العمل.',
      es: 'Gestores de proyectos, departamentos de RRHH, abogados y usuarios que calculan días laborables y plazos.',
      fr: 'Chefs de projet, services RH, juristes et particuliers calculant délais calendaires et jours ouvrés.',
      de: 'Projektleiter, Personalabteilungen, Juristen und Privatpersonen zur Berechnung von Fristen und Werktagen.',
    },
    introSummary: {
      en: (n) => `The ${n} computes exact calendar spans, business days, age milestones, and time zone differentials adhering to the standard Gregorian calendar.`,
      ar: (n) => `تحسب ${n} الفترات الزمنية الدقيقة وأيام العمل وتفاصيل العمر وفروق التوقيت وفق قواعد التقويم الميلادي المعتمد.`,
      es: (n) => `La calculadora ${n} calcula plazos en días naturales, jornadas laborables, edad exacta y diferencias horarias según el calendario gregoriano.`,
      fr: (n) => `Le calculateur ${n} détermine les durées calendaires, jours ouvrés, anniversaires et décalages horaires d’après le calendrier grégorien.`,
      de: (n) => `Der ${n} berechnet exakte Zeitspannen, Arbeitstage, Fristen und Zeitzonendifferenzen nach dem gregorianischen Kalender.`,
    },
    howToSteps: {
      en: [
        'Select the starting reference date (or birthdate).',
        'Choose the ending target date or duration interval.',
        'Review total elapsed days, breakdown in years/months/days, and total business days.',
      ],
      ar: [
        'اختر تاريخ البداية أو تاريخ الميلاد المرجعي.',
        'حدد تاريخ النهاية المستهدف أو الفترة المطلوبة.',
        'استعرض إجمالي الأيام المحسوبة والتقسيم الدقيق بالسنوات والأشهر والأيام وأيام العمل.',
      ],
      es: [
        'Seleccione la fecha inicial o fecha de nacimiento de referencia.',
        'Elija la fecha final del intervalo.',
        'Consulte el cómputo total de días, desglose en años, meses y días, y jornadas laborables.',
      ],
      fr: [
        'Sélectionnez la date initiale de référence (ou date de naissance).',
        'Indiquez la date d’échéance finale.',
        'Examinez le total de jours écoulés, le décompte en années/mois/jours et les jours ouvrés.',
      ],
      de: [
        'Wählen Sie das Startdatum oder das Geburtsdatum aus.',
        'Bestimmen Sie das Enddatum des Zeitraums.',
        'Lesen Sie die Gesamttage, die Aufschlüsselung in Jahre, Monate und Tage sowie Werktage ab.',
      ],
    },
    faqs: {
      en: [
        { question: 'How are leap years and February day counts handled?', answer: 'The engine applies exact Gregorian leap year rules (years divisible by 4, except century years unless divisible by 400).' },
        { question: 'Are public holidays included in business day calculations?', answer: 'Standard calculations exclude Saturdays and Sundays; regional statutory holidays require local jurisdiction adjustments.' },
        { question: 'How does time zone calculation prevent UTC drift?', answer: 'Calculations evaluate local calendar component dates directly, avoiding off-by-one UTC day shifts.' },
      ],
      ar: [
        { question: 'كيف يتم التعامل مع السنوات الكبيسة وشهر فبراير؟', answer: 'تطبق الأداة القواعد الفلكية الدقيقة للتقويم الميلادي للسنوات الكبيسة لضمان مطابقة عدد أيام فبراير بدقة.' },
        { question: 'هل تشمل حسابات أيام العمل الإجازات الرسمية؟', answer: 'تستثني الحسابات عطلات نهاية الأسبوع، بينما تتفاوت العطلات الرسمية حسب الأنظمة الحكومية المحلية.' },
        { question: 'كيف تتفادى الأداة أخطاء فروق التوقيت العالمي (UTC)؟', answer: 'تعتمد الحسابات على الأيام والتواريخ المحلية المباشرة دون إزاحات توقيت لتفادي أي خطأ في الأيام.' },
      ],
      es: [
        { question: '¿Cómo se procesan los años bisiestos?', answer: 'Se aplican las reglas gregorianas exactas asignando 29 días a febrero en los años bisiestos pertinentes.' },
        { question: '¿Incluyen los días laborables festivos oficiales?', answer: 'Se descuentan sábados y domingos; los festivos nacionales y locales requieren calibración por país.' },
        { question: '¿Cómo se evitan errores de desfase UTC?', answer: 'Las operaciones se realizan sobre fechas de calendario locales sin conversiones horarias intermedias.' },
      ],
      fr: [
        { question: 'Comment sont gérées les années bissextiles ?', answer: 'Les règles grégoriennes officielles sont intégrées (29 jours pour février tous les 4 ans sauf exceptions de siècle).' },
        { question: 'Les jours ouvrés incluent-ils les jours fériés ?', answer: 'Le calcul exclut systématiquement samedis et dimanches; les fériés dépendent des législations nationales.' },
        { question: 'Comment éviter les décalages de date liés aux fuseaux horaires ?', answer: 'Les calculs portent directement sur les composantes de date locale sans passage par le fuseau UTC.' },
      ],
      de: [
        { question: 'Wie werden Schaltjahre und der 29. Februar berücksichtigt?', answer: 'Der Rechner implementiert die exakte gregorianische Schaltjahrregel für alle historischen und zukünftigen Jahre.' },
        { question: 'Werden gesetzliche Feiertage bei Werktagen berücksichtigt?', answer: 'Standardmäßig werden Samstage und Sonntage herausgerechnet; regionale Feiertage variieren je nach Bundesland.' },
        { question: 'Wie werden UTC-Datumsverschiebungen verhindert?', answer: 'Berechnungen basieren auf lokalen Kalenderkomponenten, um Verschiebungen durch Zeitzonen zu verhindern.' },
      ],
    },
  },

  'everyday-tools': {
    audience: {
      en: 'Everyday consumers, diners, travelers, and shoppers managing retail discounts, restaurant gratuities, and vehicle fuel costs.',
      ar: 'المستهلكون والمتسوقون والمسافرون لحساب الخصومات التجارية والبقشيش وتكاليف وقود الرحلات.',
      es: 'Consumidores, comensales, conductores y compradores que calculan propinas, descuentos comerciales y combustible.',
      fr: 'Consommateurs, automobilistes et acheteurs calculant pourboires, remises en magasin et budget carburant.',
      de: 'Verbraucher, Autofahrer und Kunden zur Berechnung von Rabatten, Trinkgeldern und Kraftstoffkosten.',
    },
    introSummary: {
      en: (n) => `The ${n} provides fast, practical solutions for everyday arithmetic including restaurant gratuity splits, merchant discounts, sales tax additions, and travel fuel expenses.`,
      ar: (n) => `توفر ${n} حلولاً عملية سريعة للحسابات اليومية مثل تقسيم فواتير المطاعم والخصومات التجارية وتكاليف الوقود للرحلات.`,
      es: (n) => `La calculadora ${n} facilita cálculos prácticos cotidianos como propinas compartidas, rebajas comerciales y coste de combustible.`,
      fr: (n) => `Le calculateur ${n} simplifie les calculs de tous les jours : partage d’addition, pourboire, remises et budget essence.`,
      de: (n) => `Der ${n} löst alltägliche Rechenaufgaben wie Rabattabzüge, Trinkgeldaufteilungen und Reise-Benzinkosten schnell und zuverlässig.`,
    },
    howToSteps: {
      en: [
        'Enter the primary cost, bill total, travel distance, or original retail price.',
        'Specify secondary modifiers (percentage tip, discount rate, vehicle mileage MPG/L, or number of people).',
        'Review the final discounted price, individual split bill amount, or total trip expense.',
      ],
      ar: [
        'أدخل المبلغ الأساسي، أو إجمالي الفاتورة، أو مسافة الرحلة، أو السعر الأصلي.',
        'حدد النسبة الإضافية (نسبة الخصم، البقشيش، استهلاك الوقود، أو عدد الأشخاص).',
        'استعرض السعر النهائي بعد التخفيض أو نصيب كل فرد من الفاتورة بدقة.',
      ],
      es: [
        'Introduzca el importe de la cuenta, precio original o distancia del viaje.',
        'Indique el porcentaje de descuento, propina, consumo de combustible o número de personas.',
        'Consulte el precio final rebajado, importe por persona o gasto total del trayecto.',
      ],
      fr: [
        'Saisissez le montant de la facture, le prix initial ou la distance à parcourir.',
        'Indiquez le taux de remise, le pourcentage de pourboire ou la consommation du véhicule.',
        'Consultez le prix net remisé, la part par personne ou le coût global du trajet.',
      ],
      de: [
        'Geben Sie den Rechnungsbetrag, Originalpreis oder die Fahrtstrecke ein.',
        'Definieren Sie Rabattsatz, Trinkgeldprozent, Durchschnittsverbrauch oder Personenanzahl.',
        'Prüfen Sie den reduzierten Endpreis, den Betrag pro Kopf oder die Gesamtspritkosten.',
      ],
    },
    faqs: {
      en: [
        { question: 'How is a percentage discount calculated?', answer: 'The discount amount is found by multiplying original price by discount rate, then subtracted from the original to yield net price.' },
        { question: 'Is sales tax applied before or after a discount?', answer: 'In most consumer jurisdictions, sales tax is legally applied to the post-discount sale price.' },
        { question: 'How does bill splitting handle uneven divisions?', answer: 'Splits distribute total charges equally per person with cent-level roundoff preservation.' },
      ],
      ar: [
        { question: 'كيف يُحسب الخصم المئوي؟', answer: 'تُضرب القيمة الأصلية في نسبة الخصم لمعرفة قيمة التوفير، ثم تُطرح من السعر الأصلي للحصول على السعر النهائي.' },
        { question: 'هل تُطبق الضريبة قبل الخصم أم بعده؟', answer: 'تُطبق ضريبة القيمة المضافة عادة على السعر الفعلي بعد خصم التخفيضات التجارية.' },
        { question: 'كيف يتم توزيع الفاتورة عند القسمة بين الأفراد؟', answer: 'تُقسم الفاتورة بالتساوي على عدد الأفراد مع ضبط الكسور والهللات بدقة تامة.' },
      ],
      es: [
        { question: '¿Cómo se calcula el descuento porcentual?', answer: 'Se multiplica el precio original por el porcentaje de rebaja y se resta del importe inicial.' },
        { question: '¿Se aplica el IVA antes o después del descuento?', answer: 'Con carácter general, los impuestos se aplican sobre el precio neto efectivamente rebajado.' },
        { question: '¿Cómo se divide la cuenta entre varias personas?', answer: 'El total se reparte a partes iguales por comensal manteniendo precisión de céntimos.' },
      ],
      fr: [
        { question: 'Comment calcule-t-on une remise en pourcentage ?', answer: 'Le montant de la remise est soustrait du prix d’origine pour obtenir le prix net payé.' },
        { question: 'La TVA s’applique-t-elle avant ou après remise ?', answer: 'La TVA s’applique légalement sur le prix effectivement consenti après déduction du rabais.' },
        { question: 'Comment est répartie l’addition entre convives ?', answer: 'Le montant global est divisé équitablement par le nombre de personnes avec arrondi au centime.' },
      ],
      de: [
        { question: 'Wie wird ein prozentualer Rabatt abgezogen?', answer: 'Der Rabattbetrag wird vom Ursprungspreis subtrahiert, um den ermäßigten Zahlbetrag zu erhalten.' },
        { question: 'Wird die Mehrwertsteuer vor oder nach Rabattabzug berechnet?', answer: 'Die gesetzliche Mehrwertsteuer bezieht sich immer auf den tatsächlich rabattierten Rechnungsbetrag.' },
        { question: 'Wie erfolgt die Trinkgeldaufteilung auf mehrere Personen?', answer: 'Der Gesamtbetrag inklusive Trinkgeld wird gleichmäßig auf die Anzahl der Personen aufgeteilt.' },
      ],
    },
  },

  'mathematics': {
    audience: {
      en: 'Students, educators, engineers, and analysts applying pure arithmetic, algebra, percentages, and proportions.',
      ar: 'الطلاب والمعلمون والمهندسون والمحللون لحساب العمليات الحسابية والنسب المئوية والجبر والتناسب.',
      es: 'Estudiantes, docentes y profesionales que resuelven operaciones aritméticas, porcentajes y álgebra.',
      fr: 'Élèves, enseignants et professionnels effectuant calculs arithmétiques, pourcentages et proportions.',
      de: 'Schüler, Lehrkräfte, Studenten und Anwender für Arithmetik, Prozentrechnung und Algebra.',
    },
    introSummary: {
      en: (n) => `The ${n} applies established mathematical theorems, algebraic rules, and arithmetic relationships to solve numerical equations with deterministic precision.`,
      ar: (n) => `تطبق ${n} القواعد الرياضية والجبرية المعتمدة لحل العمليات والمعادلات الحسابية بدقة متناهية.`,
      es: (n) => `La calculadora ${n} aplica teoremas matemáticos universales y reglas algebraicas para resolver operaciones numéricas exactas.`,
      fr: (n) => `Le calculateur ${n} applique les théorèmes et règles algébriques fondamentales pour résoudre vos équations avec rigueur.`,
      de: (n) => `Der ${n} wendet anerkannte mathematische Theoreme und Rechengesetze zur präzisen Lösung numerischer Aufgaben an.`,
    },
    howToSteps: {
      en: [
        'Enter primary numeric values, fractions, or coefficients into the input fields.',
        'Choose the specific algebraic operation or proportion relationship.',
        'Review the simplified numerical result, exact decimal value, and fractional representation.',
      ],
      ar: [
        'أدخل الأرقام أو الكسور أو المعاملات في الحقول المخصصة.',
        'اختر العملية الحسابية أو العلاقة التناسبية المراد إيجادها.',
        'استعرض النتيجة الحسابية المبسطة والقيمة العشرية وتمثيل الكسور الدقيق.',
      ],
      es: [
        'Introduzca los valores numéricos, fracciones o coeficientes en los campos.',
        'Seleccione la operación algebraica o fórmula a resolver.',
        'Consulte el resultado numérico simplificado y su valor decimal exacto.',
      ],
      fr: [
        'Saisissez les valeurs numériques, fractions ou coefficients requis.',
        'Sélectionnez l’opération arithmétique ou la proportion à déterminer.',
        'Examinez le résultat simplifié et sa valeur décimale exacte.',
      ],
      de: [
        'Geben Sie die Zahlenwerte, Brüche oder Variablen in die Felder ein.',
        'Wählen Sie die gewünschte Rechenoperation oder Verhältnisrechnung.',
        'Prüfen Sie das vereinfachte mathematische Ergebnis und den Dezimalwert.',
      ],
    },
    faqs: {
      en: [
        { question: 'What mathematical principle governs this calculation?', answer: 'Operations follow standard order of operations (PEMDAS/BODMAS) and universal algebraic identity axioms.' },
        { question: 'How are zero and negative numbers handled?', answer: 'Computations adhere to rigorous boundary handling; division by zero is flagged as undefined according to mathematical law.' },
        { question: 'How is precision maintained with repeating decimals?', answer: 'Values are calculated in 64-bit double precision floating point, minimizing cumulative rounding inaccuracies.' },
      ],
      ar: [
        { question: 'ما هي القاعدة الرياضية الحاكمة لهذه العملية؟', answer: 'تتبع الحسابات ترتيب العمليات الرياضية المعتمد (PEMDAS) والقواعد الجبرية القياسية.' },
        { question: 'كيف تتعامل الأداة مع الصفر والأرقام السالبة؟', answer: 'تلتزم الأداة بالقواعد الصارمة؛ حيث تُصنف القسمة على صفر كعملية غير معرفة رياضياً.' },
        { question: 'كيف تحافظ الأداة على دقة الكسور العشرية المتكررة؟', answer: 'تعتمد المعالجة على نظام الدقة المضاعفة (64-بت) للحد التام من أخطاء التقريب التراكمي.' },
      ],
      es: [
        { question: '¿Qué principio matemático rige el cálculo?', answer: 'Cumple la jerarquía de operaciones estándar (PEMDAS) y axiomas algebraicos universales.' },
        { question: '¿Cómo se gestionan ceros y valores negativos?', answer: 'Se aplican controles rigurosos; la división por cero se identifica como operación no definida.' },
        { question: '¿Cómo se preserva la precisión en decimales periódicos?', answer: 'Se emplean números de punto flotante de 64 bits para minimizar imprecisiones de redondeo.' },
      ],
      fr: [
        { question: 'Quelle règle de priorité opératoire est appliquée ?', answer: 'Le moteur respecte l’ordre des opérations conventionnel (PEMDAS/BODMAS) et les axiomes algébriques.' },
        { question: 'Comment sont traités le zéro et les négatifs ?', answer: 'La division par zéro est strictement neutralisée comme indéfinie selon les lois mathématiques.' },
        { question: 'Comment est garantie la précision des décimales ?', answer: 'Les valeurs sont évaluées en double précision 64 bits pour éviter les erreurs d’arrondi.' },
      ],
      de: [
        { question: 'Welche Rechenregeln werden angewendet?', answer: 'Die Berechnung befolgt die mathematische Operatorrangfolge (Punkt vor Strich) und algebraische Axiome.' },
        { question: 'Wie werden Null und negative Zahlen behandelt?', answer: 'Ungültige Operationen wie Divisionen durch null werden mathematisch korrekt als nicht definiert abgefangen.' },
        { question: 'Wie wird die Genauigkeit bei periodischen Dezimalzahlen gesichert?', answer: 'Berechnungen erfolgen in 64-Bit-Gleitkommapräzision, um Rundungsfehler zu minimieren.' },
      ],
    },
  },
};
