import { ToolDef, Language } from '../../types';
import { ToolContentDetails } from './types';

type KnowledgeHandler = (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails;

function createKnowledge(dataByLang: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails>): Record<Language, KnowledgeHandler> {
  return dataByLang;
}

// 1. CAGR CALCULATOR (cagr-calculator)
export const CAGR_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates the Compound Annual Growth Rate (CAGR), representing the smoothed annualized geometric growth rate of an investment or business metric over multiple years.`,
    howToUse: [
      'Enter the starting beginning investment or revenue value.',
      'Enter the ending final value.',
      'Enter the total time period in years (or fractional years).',
      'Review the calculated compound annual growth rate percentage and absolute wealth gain.'
    ],
    formula: 'CAGR = [(Ending Value / Beginning Value)^(1 / Number of Years) - 1] × 100',
    formulaVariables: [
      { name: 'Beginning Value (BV)', description: 'Initial balance or base year revenue.', unit: 'Currency', optional: false },
      { name: 'Ending Value (EV)', description: 'Final balance or ending year revenue.', unit: 'Currency', optional: false },
      { name: 'Number of Years (n)', description: 'Duration of the investment period.', unit: 'Years (n > 0)', optional: false }
    ],
    workedExample: {
      scenario: 'An investment portfolio grows from $10,000 to $25,000 over a 5-year holding period.',
      stepByStep: [
        'Total return ratio: $25,000 / $10,000 = 2.50.',
        'Apply exponent: (2.50)^(1 / 5) = (2.50)^0.20 = 1.20112.',
        'Subtract 1 and multiply by 100: (1.20112 - 1) × 100 = 20.11%.'
      ],
      result: 'CAGR = 20.11% per year (Total Gain: +$15,000 / +150.0%)'
    },
    interpretation: 'Provides the standard benchmark for comparing the true historical annualized performance of mutual funds, stocks, real estate, and company revenues.',
    assumptions: 'Constant geometric rate of compounding without intermediate cash withdrawals.',
    limitations: 'Smooths over interim year-to-year volatility and does not reflect market drawdowns.',
    faqs: [
      { question: 'What is the difference between average annual return and CAGR?', answer: 'Average annual return uses simple arithmetic mean, which distorts compounding. CAGR accurately reflects geometric compounding over time.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب معدل النمو السنوي المركب (CAGR)، الذي يمثل العائد الهندسي السنوي الحقيقي للمحفظة الاستثمارية أو إيرادات الشركات على مدى عدة سنوات.`,
    howToUse: [
      'أدخل القيمة الابتدائية للاستثمار أو الإيراد في سنة الأساس.',
      'أدخل القيمة النهائية للاستثمار.',
      'حدد الفترة الزمنية الإجمالية بالسنوات.',
      'اطلع على النسبة المئوية لمعدل النمو السنوي المركب وإجمالي العائد المحقق.'
    ],
    formula: 'معدل النمو السنوي المركب = [(القيمة النهائية ÷ القيمة الابتدائية)^(1 ÷ عدد السنوات) - 1] × 100',
    formulaVariables: [
      { name: 'القيمة الابتدائية', description: 'رأس المال الأولي.', unit: 'عملة', optional: false },
      { name: 'القيمة النهائية', description: 'الرصيد في نهاية المدة.', unit: 'عملة', optional: false },
      { name: 'عدد السنوات', description: 'مدة الاستثمار بالسنوات.', unit: 'سنوات', optional: false }
    ],
    workedExample: {
      scenario: 'نمو محفظة استثمارية من 10,000 دولار إلى 25,000 دولار على مدار 5 سنوات.',
      stepByStep: [
        'نسبة العائد الإجمالي: 25,000 ÷ 10,000 = 2.50.',
        'تطبيق الأس: (2.50)^(1 ÷ 5) = 1.20112.',
        'حساب النسبة: (1.20112 - 1) × 100 = 20.11%.'
      ],
      result: 'معدل CAGR = 20.11% سنوياً (إجمالي العائد: +15,000$ / +150%)'
    },
    interpretation: 'المعيار المالي الأساسي لتقييم أداء الأسهم وصناديق الاستثمار المشتركة ومقارنة نمو مبيعات الشركات.',
    assumptions: 'نمو هندسي منتظم دون سحوبات أو إيداعات وسيطة.',
    limitations: 'يفترض استقرار وتيرة النمو ولا يظهر التقلبات السنوية الصعودية والهبوطية.',
    faqs: [
      { question: 'ما الفرق بين المتوسط الحسابي ومعدل CAGR؟', answer: 'المتوسط الحسابي يضخم العوائد ولا يأخذ تراكم الأرباح بالحسبان، بينما CAGR يقيس النمو الهندسي المركب الفعلي.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la Tasa de Crecimiento Anual Compuesto (CAGR), que representa el rendimiento geométrico anualizado constante de una inversión o negocio a lo largo de varios años.`,
    howToUse: [
      'Introduzca el valor inicial de la inversión o ingresos.',
      'Introduzca el valor final acumulado.',
      'Indique el período total en años.',
      'Consulte la tasa anualizada CAGR y la ganancia porcentual global.'
    ],
    formula: 'CAGR = [(Valor Final / Valor Inicial)^(1 / Años) - 1] × 100',
    formulaVariables: [
      { name: 'Valor Inicial', description: 'Capital o ingresos base.', unit: 'Moneda', optional: false },
      { name: 'Valor Final', description: 'Capital de cierre.', unit: 'Moneda', optional: false },
      { name: 'Años', description: 'Horizonte temporal.', unit: 'Años', optional: false }
    ],
    workedExample: {
      scenario: 'Cartera que pasa de 10.000 € a 25.000 € en 5 años.',
      stepByStep: [
        'Ratio de crecimiento: 25.000 / 10.000 = 2,50.',
        'Potencia anual: (2,50)^(1/5) = 1,20112.',
        'Resta de unidad: (1,20112 - 1) × 100 = 20,11%.'
      ],
      result: 'CAGR = 20,11% anual (Rentabilidad total: +15.000 € / +150%)'
    },
    interpretation: 'Métrica de referencia en finanzas para comparar fondos de inversión, acciones y crecimiento empresarial.',
    assumptions: 'Reinversión constante de ganancias sin aportaciones intermedias.',
    limitations: 'Oculta la volatilidad y las caídas intermedias entre el primer y último año.',
    faqs: [
      { question: '¿Por qué es preferible el CAGR sobre la rentabilidad media?', answer: 'Porque el CAGR tiene en cuenta el efecto acumulativo del interés compuesto, mientras que la media aritmética sobreestima el rendimiento real.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule le Taux de Croissance Annuel Composé (TCAC / CAGR), mesurant le taux de rendement géométrique annualisé lissé d'un placement ou du chiffre d'affaires d'une entreprise.`,
    howToUse: [
      'Saisissez la valeur initiale de départ.',
      'Saisissez la valeur finale obtenue.',
      'Indiquez la durée globale en années.',
      'Consultez le taux de rendement annuel moyen composé (TCAC).'
    ],
    formula: 'TCAC / CAGR = [(Valeur Finale / Valeur Initiale)^(1 / Années) - 1] × 100',
    formulaVariables: [
      { name: 'Valeur Initiale', description: 'Capital de départ.', unit: 'Devise', optional: false },
      { name: 'Valeur Finale', description: 'Montant à l\'échéance.', unit: 'Devise', optional: false },
      { name: 'Durée (Années)', description: 'Nombre d\'années.', unit: 'Années', optional: false }
    ],
    workedExample: {
      scenario: 'Portefeuille passant de 10 000 € à 25 000 € en 5 ans.',
      stepByStep: [
        'Ratio global : 25 000 / 10 000 = 2,50.',
        'Racine 5e : (2,50)^(0,20) = 1,20112.',
        'Calcul du taux : (1,20112 - 1) × 100 = 20,11%.'
      ],
      result: 'TCAC = 20,11 % par an (Gain net : +15 000 € / +150 %)'
    },
    interpretation: 'Indicateur clé pour benchmarker des actions, des fonds OPCVM ou le chiffre d\'affaires de filiales.',
    assumptions: 'Capitalisation géométrique sans flux intermédiaires.',
    limitations: 'Ne reflète pas les fluctuations et la volatilité intra-annuelle.',
    faqs: [
      { question: 'Quelle est la différence entre rentabilité moyenne et TCAC ?', answer: 'La moyenne arithmétique ignore l\'effet des intérêts composés, alors que le TCAC reflète la croissance réelle d\'une année sur l\'autre.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die durchschnittliche jährliche Wachstumsrate (CAGR - Compound Annual Growth Rate) für Investitionen, Unternehmensumsätze und Vermögensportfolios.`,
    howToUse: [
      'Geben Sie den Anfangswert des Kapitals oder Umsatzes ein.',
      'Geben Sie den Endwert ein.',
      'Tragen Sie den Anlagezeitraum in Jahren ein.',
      'Lesen Sie die annualisierte CAGR-Wachstumsrate und den Gesamtgewinn ab.'
    ],
    formula: 'CAGR = [(Endwert / Anfangswert)^(1 / Jahre) - 1] × 100',
    formulaVariables: [
      { name: 'Anfangswert', description: 'Startkapital.', unit: 'Währung', optional: false },
      { name: 'Endwert', description: 'Kapitalstand am Ende.', unit: 'Währung', optional: false },
      { name: 'Jahre', description: 'Laufzeit.', unit: 'Jahre', optional: false }
    ],
    workedExample: {
      scenario: 'Wachstum eines Aktiendepots von 10.000 € auf 25.000 € über 5 Jahre.',
      stepByStep: [
        'Gesamtfaktor: 25.000 / 10.000 = 2,50.',
        '5. Wurzel ziehen: (2,50)^(0,20) = 1,20112.',
        'Prozentsatz ermitteln: (1,20112 - 1) × 100 = 20,11%.'
      ],
      result: 'CAGR = 20,11% p.a. (Gesamtertrag: +15.000 € / +150%)'
    },
    interpretation: 'Standardkennzahl für den objektiven Vergleich von Aktienfonds, ETFs, Immobilienrenditen und Geschäftskennzahlen.',
    assumptions: 'Gleichmäßiges geometrisches Wachstum ohne zwischenzeitliche Ein- oder Auszahlungen.',
    limitations: 'Glättet zwischenzeitliche Marktschwankungen und Kursrückgänge.',
    faqs: [
      { question: 'Warum ist CAGR genauer als das arithmetische Mittel?', answer: 'Weil CAGR den Zinseszinseffekt exakt abbildet, während einfache Durchschnitte die tatsächliche Rendite verzerren.' }
    ],
    relatedTools
  })
});

// 2. PAYBACK PERIOD CALCULATOR (payback-period)
export const PAYBACK_PERIOD_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates the payback period of a capital investment project, determining the exact number of years and months required to recover the initial cash outlay from operational cash inflows.`,
    howToUse: [
      'Enter the initial capital investment outlay (CapEx).',
      'Enter either expected constant annual cash inflows or individual yearly cash flow forecasts.',
      'Review the calculated payback period in exact years, months, and cumulative break-even trajectory.'
    ],
    formula: 'Even Cash Flows: Payback Period = Initial Investment / Annual Cash Inflow | Uneven Cash Flows: Years before full recovery + (Unrecovered Cost at Start of Year / Cash Flow during Year)',
    formulaVariables: [
      { name: 'Initial Outlay', description: 'Upfront capital expenditure.', unit: 'Currency', optional: false },
      { name: 'Annual Cash Inflows', description: 'Net periodic cash receipts.', unit: 'Currency/Year', optional: false }
    ],
    workedExample: {
      scenario: 'A company invests $50,000 in energy-efficient machinery generating $15,000 in net annual energy savings.',
      stepByStep: [
        'Initial investment: $50,000.',
        'Annual cash inflow: $15,000/year.',
        'Calculate payback: $50,000 / $15,000 = 3.333 years.',
        'Convert fractional years to months: 0.333 × 12 = 4 months.'
      ],
      result: 'Payback Period: 3 Years and 4 Months (3.33 Years)'
    },
    interpretation: 'Assesses investment liquidity risk; projects with shorter payback periods reduce capital exposure and financial risk.',
    assumptions: 'Nominal undiscounted cash flows.',
    limitations: 'Does not account for the time value of money (unlike Discounted Payback Period or NPV) or cash flows generated after the payback cutoff.',
    faqs: [
      { question: 'Why is payback period widely used by businesses?', answer: 'It provides an intuitive, easy-to-understand metric for capital risk and liquidity management.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب فترة الاسترداد (Payback Period) للمشاريع الرأسمالية، لتحديد عدد السنوات والشهور المطلوبة لاستعادة رأس المال المستثمر من التدفقات النقدية التشغيلية.`,
    howToUse: [
      'أدخل التكلفة الاستثمارية الأولية للمشروع (رأس المال).',
      'أدخل التدفق النقدي السنوي المتوقع (ثابت أو تدفقات متغيرة).',
      'اطلع على فترة الاسترداد المحددة بالسنوات والأشهر ونقطة التعادل المالي.'
    ],
    formula: 'فترة الاسترداد (للتدفق الثابت) = التكلفة الاستثمارية المبدئية ÷ التدفق النقدي السنوي',
    formulaVariables: [
      { name: 'تكلفة الاستثمار', description: 'المبلغ الأولي المستثمر.', unit: 'عملة', optional: false },
      { name: 'التدفق السنوي', description: 'صافي العائد النقدي السنوي.', unit: 'عملة/سنة', optional: false }
    ],
    workedExample: {
      scenario: 'شراء آلات صناعية بقيمة 50,000 دولار تحقق وفراً نقدياً سنوياً يبلغ 15,000 دولار.',
      stepByStep: [
        'رأس المال الأولي: 50,000 دولار.',
        'العائد السنوي: 15,000 دولار/سنة.',
        'حساب فترة الاسترداد: 50,000 ÷ 15,000 = 3.33 سنوات.',
        'تحويل الكسور إلى أشهر: 0.33 × 12 = 4 أشهر.'
      ],
      result: 'فترة الاسترداد: 3 سنوات و 4 أشهر (3.33 سنة)'
    },
    interpretation: 'تحدد درجة مخاطر السيولة في المشاريع الاستثمارية وتفضيل المشاريع الأسرع في استرداد رأس المال.',
    assumptions: 'تدفقات نقدية فعلية بدون خصم القيمة الزمنية للنقود.',
    limitations: 'تتجاهل القيمة الزمنية للنقود والأرباح التي يحققها المشروع بعد استرداد كامل التكلفة.',
    faqs: [
      { question: 'ما هو عيب طريقة فترة الاسترداد البسيطة؟', answer: 'عيبها الرئيسي هو تجاهل القيمة الزمنية للنقود وعدم احتساب الأرباح المحققة بعد نقطة الاسترداد.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el Plazo de Recuperación (Payback Period) de un proyecto de inversión, determinando el número de años y meses necesarios para recuperar el desembolso inicial.`,
    howToUse: [
      'Introduzca el desembolso inicial de la inversión.',
      'Introduzca los flujos de caja netos anuales esperados.',
      'Consulte el plazo exacto de amortización en años y meses.'
    ],
    formula: 'Plazo de Recuperación = Desembolso Inicial / Flujo de Caja Anual',
    formulaVariables: [
      { name: 'Inversión Inicial', description: 'Coste del proyecto.', unit: 'Moneda', optional: false },
      { name: 'Flujo Anual', description: 'Entradas netas de tesorería.', unit: 'Moneda/Año', optional: false }
    ],
    workedExample: {
      scenario: 'Inversión de 50.000 € que genera flujos anuales de 15.000 €.',
      stepByStep: [
        'Desembolso: 50.000 €.',
        'Flujo anual: 15.000 €/año.',
        'Cálculo: 50.000 / 15.000 = 3,33 años.',
        'Meses: 0,33 × 12 = 4 meses.'
      ],
      result: 'Plazo de Recuperación: 3 años y 4 meses (3,33 años)'
    },
    interpretation: 'Mide el riesgo de liquidez; proyectos con menor payback reducen la exposición financiera.',
    assumptions: 'Flujos de caja nominales constantes.',
    limitations: 'No considera el valor temporal del dinero ni los flujos posteriores a la recuperación.',
    faqs: [
      { question: '¿Qué es el Payback Descontado?', answer: 'Es una variante que descuenta los flujos de caja a una tasa de interés para reflejar el valor temporal del dinero.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule le Délai de Récupération du Capital Investi (DRCI / Payback), déterminant le temps en années et mois nécessaire pour amortir la mise de fonds initiale.`,
    howToUse: [
      'Indiquez le montant de l\'investissement initial.',
      'Saisissez les flux de trésorerie (cash-flows) annuels générés.',
      'Consultez la durée exacte d\'amortissement en années et mois.'
    ],
    formula: 'Délai de Récupération = Investissement Initial / Cash-flow Annuel',
    formulaVariables: [
      { name: 'Investissement', description: 'Dépense d\'investissement.', unit: 'Devise', optional: false },
      { name: 'Cash-flow annuel', description: 'Flux de trésorerie net annuel.', unit: 'Devise/An', optional: false }
    ],
    workedExample: {
      scenario: 'Investissement de 50 000 € rapportant 15 000 € d\'économies par an.',
      stepByStep: [
        'Mise initiale : 50 000 €.',
        'Cash-flow : 15 000 €/an.',
        'Calcul : 50 000 / 15 000 = 3,33 ans.',
        'En mois : 0,33 × 12 = 4 mois.'
      ],
      result: 'Délai de Récupération : 3 ans et 4 mois (3,33 ans)'
    },
    interpretation: 'Indicateur clé pour évaluer la liquidité et la rapidité de rentabilisation d\'un actif professionnel.',
    assumptions: 'Flux monétaires constants.',
    limitations: 'Ignore l\'actualisation financière du temps et les gains au-delà du seuil de rentabilité.',
    faqs: [
      { question: 'Pourquoi combiner le délai de récupération avec la VAN ?', answer: 'La VAN (Valeur Actuelle Nette) mesure la création de richesse absolue alors que le Payback mesure le temps d\'exposition au risque.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die Amortisationszeit (Payback Period) für Investitionsprojekte und ermittelt die exakte Dauer in Jahren und Monaten bis zur vollen Rückzahlung des investierten Kapitals.`,
    howToUse: [
      'Geben Sie die Anschaffungskosten (Investitionssumme) ein.',
      'Geben Sie die jährlichen Netto-Rückflüsse (Cashflows) ein.',
      'Lesen Sie die Amortisationsdauer in Jahren und Monaten ab.'
    ],
    formula: 'Amortisationszeit = Anschaffungsauszahlung / Jährlicher Cashflow',
    formulaVariables: [
      { name: 'Investition', description: 'Anfängliche Auszahlung.', unit: 'Währung', optional: false },
      { name: 'Jährlicher Cashflow', description: 'Netto-Einzahlungsüberschuss.', unit: 'Währung/Jahr', optional: false }
    ],
    workedExample: {
      scenario: 'Investition von 50.000 € in Photovoltaik mit 15.000 € jährlicher Ersparnis/Erlös.',
      stepByStep: [
        'Investitionsbetrag: 50.000 €.',
        'Jährlicher Cashflow: 15.000 €/Jahr.',
        'Berechnung: 50.000 / 15.000 = 3,33 Jahre.',
        'Monate umrechnen: 0,33 × 12 = 4 Monate.'
      ],
      result: 'Amortisationsdauer: 3 Jahre und 4 Monate (3,33 Jahre)'
    },
    interpretation: 'Dient der Liquiditäts- und Risikobeurteilung bei unternehmerischen Investitionsentscheidungen.',
    assumptions: 'Gleichmäßige nominale Cashflow-Rückflüsse.',
    limitations: 'Berücksichtigt nicht den Zeitwert des Geldes (Zinseszins) und spätere Gewinne nach Erreichen des Breakeven.',
    faqs: [
      { question: 'Was ist die dynamische Amortisationsrechnung?', answer: 'Im Gegensatz zur statischen Rechnung werden bei der dynamischen Amortisationsrechnung künftige Cashflows abgezinst.' }
    ],
    relatedTools
  })
});

// 3. LOAN REFINANCE COMPARISON CALCULATOR (loan-refinance)
export const LOAN_REFINANCE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} compares existing mortgage and loan terms against new refinancing offers to calculate monthly payment savings, total lifetime interest savings, closing costs, and the break-even payback horizon.`,
    howToUse: [
      'Enter current loan balance, current interest rate %, and remaining loan term in months or years.',
      'Enter the new proposed loan interest rate % and new loan term.',
      'Enter estimated refinancing closing costs and fees.',
      'Review monthly savings, net lifetime savings, and the break-even period in months.'
    ],
    formula: 'Monthly Savings = Old Monthly Payment - New Monthly Payment | Break-Even Months = Closing Costs / Monthly Savings | Net Lifetime Savings = Total Old Remaining Payments - Total New Payments - Closing Costs',
    formulaVariables: [
      { name: 'Current Loan Balance', description: 'Remaining principal.', unit: 'Currency', optional: false },
      { name: 'Old Rate % / New Rate %', description: 'Annual interest rates.', unit: 'Percentage %', optional: false },
      { name: 'Closing Costs', description: 'Origination, appraisal, and title fees.', unit: 'Currency', optional: false }
    ],
    workedExample: {
      scenario: 'Refinancing a $300,000 mortgage from 6.5% to 5.0% on a 30-year term with $4,500 in closing costs.',
      stepByStep: [
        'Current payment at 6.5%: $1,896.20/month.',
        'New payment at 5.0%: $1,610.46/month.',
        'Monthly payment savings: $1,896.20 - $1,610.46 = $285.74/month.',
        'Calculate break-even: $4,500 / $285.74 ≈ 15.7 months (~16 months).'
      ],
      result: 'Monthly Savings: $285.74 | Break-Even: 16 Months | 30-Year Lifetime Savings: $98,366'
    },
    interpretation: 'Shows whether refinancing justifies upfront closing costs based on how long you plan to remain in the property.',
    assumptions: 'Fixed-rate amortizing mortgages.',
    limitations: 'Resetting a 30-year clock on a loan already held for many years can increase total lifetime interest paid despite lower monthly payments.',
    faqs: [
      { question: 'What is a good rule of thumb for refinancing a mortgage?', answer: 'A common rule of thumb is that refinancing makes financial sense if you can lower your interest rate by 0.75% to 1.0% and plan to stay in the home longer than the break-even period.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بمقارنة القرض أو التمويل العقاري الحالي بعروض إعادة التمويل الجديدة لحساب الوفر في القسط الشهري، وإجمالي الفائدة الموفرة، وتكاليف ورسوم المعاملة، وفترة استرداد المصاريف (Break-even).`,
    howToUse: [
      'أدخل الرصيد المتبقي من القرض الحالي، ونسبة الفائدة، والمدة المتبقية.',
      'أدخل نسبة الفائدة للتمويل الجديد والمدة المقترحة.',
      'أدخل الرسوم الإدارية وتكاليف إعادة التمويل.',
      'اطلع على الوفر الشهري في القسط، وصافي التوفير الإجمالي، وفترة استرداد الرسوم بالأشهر.'
    ],
    formula: 'الوفر الشهري = القسط القديم - القسط الجديد | فترة التعادل (شهور) = تكاليف إعادة التمويل ÷ الوفر الشهري',
    formulaVariables: [
      { name: 'رصيد القرض المتبقي', description: 'أصل الدين المتبقي.', unit: 'عملة', optional: false },
      { name: 'الفائدة القديمة والجديدة', description: 'معدل الفائدة السنوي.', unit: '%', optional: false },
      { name: 'تكاليف المعاملة', description: 'الرسوم الإدارية والتثمين.', unit: 'عملة', optional: false }
    ],
    workedExample: {
      scenario: 'إعادة تمويل قرض عقاري بقيمة 300,000 دولار من فائدة 6.5% إلى 5.0% لمدة 30 سنة مع تكاليف 4,500 دولار.',
      stepByStep: [
        'القسط الحالي عند 6.5%: 1,896.20 دولار/شهر.',
        'القسط الجديد عند 5.0%: 1,610.46 دولار/شهر.',
        'الوفر الشهري: 1,896.20 - 1,610.46 = 285.74 دولار/شهر.',
        'فترة استرداد المصاريف: 4,500 ÷ 285.74 ≈ 15.7 شهراً (16 شهراً).'
      ],
      result: 'الوفر الشهري: 285.74$ | نقطة التعادل: 16 شهراً | صافي الوفر الإجمالي: 98,366$'
    },
    interpretation: 'تحدد بوضوح ما إذا كانت إعادة التمويل مجدية اقتصادياً بناءً على مدة إقامتك المخططة في العقار.',
    assumptions: 'قروض ذات فائدة ثابتة وجدول سداد منتظم.',
    limitations: 'تمديد فترة السداد لسنوات أطول قد يزيد من إجمالي الفوائد المدفوعة على المدى البعيد.',
    faqs: [
      { question: 'متى تكون إعادة التمويل العقاري مجدية؟', answer: 'تكون مجدية عندما ينخفض سعر الفائدة بنسبة 0.75% إلى 1% على الأقل وتكون فترة إقامتك أطول من فترة استرداد رسوم الإغلاق.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} compara las condiciones de su hipoteca o préstamo actual con nuevas ofertas de refinanciación, calculando el ahorro en la cuota mensual, intereses totales y el punto de equilibrio.`,
    howToUse: [
      'Introduzca el capital pendiente, el tipo de interés actual y el plazo restante.',
      'Introduzca el nuevo tipo de interés ofrecido y el nuevo plazo.',
      'Introduzca los gastos de novación o subrogación hipotecaria (comisiones, notaría).',
      'Consulte el ahorro mensual en la cuota y los meses necesarios para amortizar los gastos.'
    ],
    formula: 'Ahorro mensual = Cuota antigua - Cuota nueva | Meses punto de equilibrio = Gastos / Ahorro mensual',
    formulaVariables: [
      { name: 'Capital pendiente', description: 'Saldo deudor de la hipoteca.', unit: 'Moneda', optional: false },
      { name: 'Tipo actual y nuevo', description: 'Interés nominal anual.', unit: '%', optional: false },
      { name: 'Costes refinanciación', description: 'Gastos de formalización.', unit: 'Moneda', optional: false }
    ],
    workedExample: {
      scenario: 'Refinanciar 300.000 € del 6,5% al 5,0% a 30 años con 4.500 € de gastos.',
      stepByStep: [
        'Cuota actual al 6,5%: 1.896,20 €/mes.',
        'Nueva cuota al 5,0%: 1.610,46 €/mes.',
        'Ahorro mensual: 285,74 €/mes.',
        'Punto de equilibrio: 4.500 € / 285,74 € = 15,7 meses (~16 meses).'
      ],
      result: 'Ahorro mensual: 285,74 € | Amortización gastos: 16 meses | Ahorro neto: 98.366 €'
    },
    interpretation: 'Ayuda a decidir si el cambio de banco o novación de hipoteca compensa los costes notariales y registrales.',
    assumptions: 'Hipotecas a tipo fijo con cuotas constantes.',
    limitations: 'Ampliar el plazo de amortización puede abaratar la cuota pero incrementar los intereses totales acumulados.',
    faqs: [
      { question: '¿Qué es el punto de equilibrio en refinanciación?', answer: 'Es el número de meses que tardará el ahorro de la cuota mensual en cubrir íntegramente los gastos de formalización del nuevo préstamo.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} compare votre crédit immobilier actuel avec une offre de rachat de prêt, calculant l'économie mensuelle sur les mensualités, les intérêts économisés et le point mort.`,
    howToUse: [
      'Indiquez le capital restant dû, le taux d\'intérêt actuel et la durée restante.',
      'Saisissez le nouveau taux d\'intérêt proposé et la nouvelle durée.',
      'Indiquez les frais de rachat de crédit (IRA, frais de dossier, garantie).',
      'Consultez l\'économie mensuelle et le délai d\'amortissement des frais en mois.'
    ],
    formula: 'Économie mensuelle = Ancienne mensualité - Nouvelle mensualité | Délai d\'amortissement = Frais totaux / Économie mensuelle',
    formulaVariables: [
      { name: 'Capital restant dû', description: 'Montant à refinancer.', unit: 'Devise', optional: false },
      { name: 'Taux ancien et nouveau', description: 'Taux nominal annuel.', unit: '%', optional: false },
      { name: 'Frais de rachat', description: 'Indemnités et frais de garantie.', unit: 'Devise', optional: false }
    ],
    workedExample: {
      scenario: 'Renégociation de 300 000 € de 6,5 % à 5,0 % sur 30 ans avec 4 500 € de frais.',
      stepByStep: [
        'Mensualité actuelle : 1 896,20 €/mois.',
        'Nouvelle mensualité : 1 610,46 €/mois.',
        'Gain mensuel : 285,74 €/mois.',
        'Point mort : 4 500 € / 285,74 € ≈ 16 mois.'
      ],
      result: 'Gain par mois : 285,74 € | Rentabilité des frais : 16 mois | Économie totale : 98 366 €'
    },
    interpretation: 'Permet de vérifier si le rachat de prêt est rentable avant de changer d\'établissement bancaire.',
    assumptions: 'Prêts amortissables à taux fixe.',
    limitations: 'L\'allongement de la durée de remboursement peut augmenter le coût global du crédit.',
    faqs: [
      { question: 'Quand un rachat de crédit immobilier est-il opportun ?', answer: 'On estime généralement qu\'un écart de taux d\'au moins 0,70 % à 1,00 % est nécessaire pour amortir rapidement les pénalités de remboursement anticipé (IRA).' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} vergleicht ein bestehendes Darlehen mit einem neuen Umschuldungsangebot, um monatliche Ratenersparnisse, Zinsersparnis und den Break-Even-Zeitpunkt zu berechnen.`,
    howToUse: [
      'Geben Sie die aktuelle Restschuld, den bisherigen Sollzins und die Restlaufzeit ein.',
      'Geben Sie den neuen Zinssatz und die gewünschte neue Laufzeit ein.',
      'Tragen Sie Nebenkosten für die Umschuldung ein (Notar, Grundbuch, Bearbeitungsgebühr).',
      'Lesen Sie die monatliche Ersparnis und die Break-Even-Dauer in Monaten ab.'
    ],
    formula: 'Monatliche Ersparnis = Alte Rate - Neue Rate | Break-Even-Monate = Umschuldungskosten / Monatliche Ersparnis',
    formulaVariables: [
      { name: 'Restschuld', description: 'Verbleibende Kreditsumme.', unit: 'Währung', optional: false },
      { name: 'Altzins & Neuzins', description: 'Sollzinssatz p.a.', unit: '%', optional: false },
      { name: 'Nebenkosten', description: 'Gebühren für Umschuldung.', unit: 'Währung', optional: false }
    ],
    workedExample: {
      scenario: 'Umschuldung einer 300.000 € Baufinanzierung von 6,5% auf 5,0% mit 4.500 € Nebenkosten.',
      stepByStep: [
        'Bisherige Monatsrate (6,5%): 1.896,20 €.',
        'Neue Monatsrate (5,0%): 1.610,46 €.',
        'Monatliche Ersparnis: 285,74 €/Monat.',
        'Break-Even-Dauer: 4.500 € / 285,74 € ≈ 15,7 Monate (~16 Monate).'
      ],
      result: 'Ersparnis: 285,74 €/Monat | Break-Even: 16 Monate | Gesamte Zinsersparnis: 98.366 €'
    },
    interpretation: 'Zeigt Immobilienbesitzern, ob sich eine Anschlussfinanzierung oder Vorfälligkeitsentschädigung wirtschaftlich lohnt.',
    assumptions: 'Festzinsdarlehen mit gleichbleibender Annuität.',
    limitations: 'Eine Verlängerung der Darlehenslaufzeit kann trotz geringerer Monatsrate die absolute Zinslast erhöhen.',
    faqs: [
      { question: 'Wann lohnt sich eine Umschuldung der Baufinanzierung?', answer: 'Eine Umschuldung lohnt sich in der Regel, wenn der Zinsunterschied mindestens 0,5% bis 1,0% beträgt und die Immobilie länger als die Break-Even-Zeit gehalten wird.' }
    ],
    relatedTools
  })
});

// 4. REVERSE VAT & TAX CALCULATOR (vat-reverse)
export const VAT_REVERSE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates net price, gross price, and Value-Added Tax (VAT / Sales Tax) amounts in both directions (extracting tax from gross totals or adding tax to net totals).`,
    howToUse: [
      'Select calculation mode: "Extract VAT from Gross (Reverse VAT)" or "Add VAT to Net".',
      'Enter the known monetary price amount.',
      'Enter or select the applicable VAT rate percentage (e.g., 5%, 19%, 20%, 21%).',
      'Review the itemized breakdown of Net Price, VAT Tax Amount, and Gross Price.'
    ],
    formula: 'Reverse VAT: Net = Gross / (1 + Rate/100) | VAT Amount = Gross - Net | Forward VAT: Gross = Net × (1 + Rate/100)',
    formulaVariables: [
      { name: 'Price Amount', description: 'Gross or Net price input.', unit: 'Currency', optional: false },
      { name: 'VAT Rate', description: 'Statutory tax rate percentage.', unit: 'Percentage %', optional: false }
    ],
    workedExample: {
      scenario: 'Extracting 20.0% VAT from a gross store receipt total of $120.00.',
      stepByStep: [
        'Gross price: $120.00.',
        'Calculate Net Price: $120.00 / (1 + 0.20) = $120.00 / 1.20 = $100.00.',
        'Calculate VAT Tax Amount: $120.00 - $100.00 = $20.00.'
      ],
      result: 'Net Price: $100.00 | VAT Tax (20%): $20.00 | Gross Total: $120.00'
    },
    interpretation: 'Crucial for commercial bookkeeping, invoicing, B2B expense reporting, and claiming input tax credits.',
    assumptions: 'Standard single-tier ad valorem VAT rate.',
    limitations: 'Does not account for reduced-rate mixed baskets (e.g., groceries + luxury goods) unless computed individually.',
    faqs: [
      { question: 'Why can\'t I just calculate 20% of the gross price to find the VAT?', answer: 'Taking 20% of $120 would yield $24, which is mathematically incorrect because tax is levied on the net base ($100 × 20% = $20).' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب ضريبة القيمة المضافة العكسية واستخراج السعر الصافي غير الشامل للضريبة من السعر الإجمالي، أو إضافة الضريبة إلى السعر الصافي بكل دقة.`,
    howToUse: [
      'اختر طريقة الحساب: "استخراج الضريبة من السعر الإجمالي" أو "إضافة الضريبة للسعر الصافي".',
      'أدخل المبلغ المالي المتوفر لديك.',
      'حدد نسبة ضريبة القيمة المضافة (مثل 5% أو 15%).',
      'اطلع على تفصيل السعر قبل الضريبة، وقيمة الضريبة المستحقة، والسعر الإجمالي النهائي.'
    ],
    formula: 'السعر الصافي = السعر الإجمالي ÷ (1 + نسبة الضريبة ÷ 100) | قيمة الضريبة = الإجمالي - الصافي',
    formulaVariables: [
      { name: 'المبلغ المالي', description: 'السعر الإجمالي أو الصافي.', unit: 'عملة', optional: false },
      { name: 'نسبة الضريبة', description: 'النسبة المئوية لضريبة القيمة المضافة.', unit: '%', optional: false }
    ],
    workedExample: {
      scenario: 'استخراج ضريبة 15% من فاتورة إجمالية قدرها 115 دولاراً.',
      stepByStep: [
        'السعر الإجمالي: 115 دولاراً.',
        'حساب السعر الصافي: 115 ÷ 1.15 = 100 دولار.',
        'قيمة ضريبة القيمة المضافة: 115 - 100 = 15 دولاراً.'
      ],
      result: 'السعر قبل الضريبة: 100$ | قيمة الضريبة (15%): 15$ | الإجمالي: 115$'
    },
    interpretation: 'ضرورية لإعداد الفواتير التجارية، والإقرارات الضريبية للشركات، وتدقيق فواتير المشتريات.',
    assumptions: 'نسبة ضريبة قيمة مضافة موحدة للمنتج.',
    limitations: 'الفواتير التي تحتوي على بنود متعددة بنسب ضريبية متباينة تتطلب حساب كل بند على حدة.',
    faqs: [
      { question: 'لماذا لا يمكن خصم 15% مباشرة من السعر الإجمالي؟', answer: 'لأن الضريبة تُحسب كنسبة من السعر الأساسي الصافي وليس من السعر الإجمالي بعد الضريبة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el IVA inverso (desglosando el precio neto sin impuestos a partir del total con IVA) o añade el tipo impositivo correspondiente a una base imponible.`,
    howToUse: [
      'Seleccione el modo: "Desglosar IVA (IVA Inverso)" o "Añadir IVA a Base Imponible".',
      'Introduzca el importe.',
      'Indique el tipo de IVA aplicable (ej. 4%, 10%, 21%).',
      'Consulte el desglose de Base Imponible, Cuota de IVA e Importe Total.'
    ],
    formula: 'Base Imponible = Total / (1 + IVA/100) | Cuota IVA = Total - Base Imponible',
    formulaVariables: [
      { name: 'Importe', description: 'Precio bruto o neto.', unit: 'Moneda', optional: false },
      { name: 'Tipo IVA', description: 'Porcentaje de IVA.', unit: '%', optional: false }
    ],
    workedExample: {
      scenario: 'Desglosar el 21% de IVA de una factura total de 121,00 €.',
      stepByStep: [
        'Importe total: 121,00 €.',
        'Base imponible: 121,00 / 1,21 = 100,00 €.',
        'Cuota de IVA: 121,00 - 100,00 = 21,00 €.'
      ],
      result: 'Base Imponible: 100,00 € | Cuota IVA (21%): 21,00 € | Total: 121,00 €'
    },
    interpretation: 'Imprescindible para contabilidad de autónomos y empresas, emisión de facturas y deducción de IVA soportado.',
    assumptions: 'Tipo de gravamen impositivo único.',
    limitations: 'No aplica a facturas con tipos mixtos sin desglosar línea por línea.',
    faqs: [
      { question: '¿Cómo se desglosa el IVA del 21%?', answer: 'Se divide el precio total entre 1,21 para obtener la base imponible y la diferencia es el IVA.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule la TVA inversée (calcul du montant Hors Taxes HT à partir du Toutes Taxes Comprises TTC) et permet d'ajouter la TVA sur un montant net.`,
    howToUse: [
      'Choisissez le mode (Calculer le HT depuis le TTC ou ajouter la TVA au HT).',
      'Saisissez le montant.',
      'Sélectionnez le taux de TVA applicable (ex. 5,5 %, 10 %, 20 %).',
      'Consultez le récapitulatif HT, montant de TVA et TTC.'
    ],
    formula: 'Montant HT = Montant TTC / (1 + Taux TVA/100) | Montant TVA = TTC - HT',
    formulaVariables: [
      { name: 'Montant', description: 'Prix TTC ou HT.', unit: 'Devise', optional: false },
      { name: 'Taux TVA', description: 'Pourcentage de TVA.', unit: '%', optional: false }
    ],
    workedExample: {
      scenario: 'Extraction d\'une TVA à 20 % sur un montant TTC de 120,00 €.',
      stepByStep: [
        'Prix TTC : 120,00 €.',
        'Montant HT : 120,00 / 1,20 = 100,00 €.',
        'Part de TVA : 120,00 - 100,00 = 20,00 €.'
      ],
      result: 'Montant HT : 100,00 € | TVA (20 %) : 20,00 € | Total TTC : 120,00 €'
    },
    interpretation: 'Outil de référence pour les déclarations de TVA des entreprises et la facturation commerciale.',
    assumptions: 'Taux légal unique appliqué.',
    limitations: 'Les tickets de caisse multi-taux nécessitent une saisie poste par poste.',
    faqs: [
      { question: 'Pourquoi ne faut-il pas faire TTC × 0,20 pour trouver la TVA ?', answer: 'Parce que le taux de TVA s\'applique sur le montant Hors Taxes (HT) et non sur le TTC.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die Mehrwertsteuer rückwärts (Nettobetrag aus Bruttobetrag herausrechnen) oder schlägt die gesetzliche Mehrwertsteuer auf den Nettobetrag auf.`,
    howToUse: [
      'Wählen Sie den Modus: "MwSt herausrechnen (Brutto zu Netto)" oder "MwSt aufschlagen (Netto zu Brutto)".',
      'Geben Sie den Geldbetrag ein.',
      'Wählen Sie den Mehrwertsteuersatz (z. B. 7% oder 19%).',
      'Lesen Sie Nettobetrag, enthaltene Mehrwertsteuer und Bruttobetrag ab.'
    ],
    formula: 'Nettobetrag = Bruttobetrag / (1 + MwSt-Satz/100) | MwSt-Betrag = Bruttobetrag - Nettobetrag',
    formulaVariables: [
      { name: 'Geldbetrag', description: 'Brutto- oder Nettobetrag.', unit: 'Währung', optional: false },
      { name: 'MwSt-Satz', description: 'Umsatzsteuersatz in Prozent.', unit: '%', optional: false }
    ],
    workedExample: {
      scenario: 'Herausrechnen von 19% MwSt aus einem Rechnungs-Bruttobetrag von 119,00 €.',
      stepByStep: [
        'Bruttobetrag: 119,00 €.',
        'Nettobetrag berechnen: 119,00 / 1,19 = 100,00 €.',
        'MwSt-Betrag ermitteln: 119,00 - 100,00 = 19,00 €.'
      ],
      result: 'Netto: 100,00 € | MwSt (19%): 19,00 € | Brutto: 119,00 €'
    },
    interpretation: 'Unentbehrlich für Buchhaltung, Vorsteuerabzug bei Unternehmen und Rechnungserstellung.',
    assumptions: 'Einheitlicher Steuersatz.',
    limitations: 'Mischbelege mit unterschiedlichen Steuersätzen (z. B. 7% und 19%) müssen postenweise aufgeteilt werden.',
    faqs: [
      { question: 'Wie rechnet man 19% Mehrwertsteuer aus einem Bruttobetrag heraus?', answer: 'Teilen Sie den Bruttobetrag durch 1,19. Das Ergebnis ist der reine Nettobetrag.' }
    ],
    relatedTools
  })
});

// 5. SALARY TO HOURLY WAGE CONVERTER (salary-hourly)
export const SALARY_HOURLY_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} converts annual, monthly, bi-weekly, or weekly salary compensation into equivalent hourly wage rates (and vice versa) based on standard working hours and paid weeks per year.`,
    howToUse: [
      'Choose conversion direction (Annual Salary to Hourly Wage, or Hourly Wage to Annual Salary).',
      'Enter the compensation pay amount.',
      'Specify weekly working hours (standard: 40 hours/week) and working weeks per year (standard: 52 weeks).',
      'Review equivalent hourly, daily, weekly, bi-weekly, monthly, and annual earnings.'
    ],
    formula: 'Hourly Wage = Annual Salary / (Hours per Week × Weeks per Year) | Annual Salary = Hourly Wage × Hours per Week × Weeks per Year',
    formulaVariables: [
      { name: 'Pay Amount', description: 'Salary or hourly rate.', unit: 'Currency', optional: false },
      { name: 'Hours / Week', description: 'Working hours per week.', unit: 'Hours (default 40)', optional: true },
      { name: 'Weeks / Year', description: 'Paid working weeks per year.', unit: 'Weeks (default 52)', optional: true }
    ],
    workedExample: {
      scenario: 'Converting a $75,000 annual salary to an hourly wage based on a standard 40-hour work week (2,080 annual work hours).',
      stepByStep: [
        'Total annual working hours: 40 hours/week × 52 weeks = 2,080 hours.',
        'Calculate hourly wage: $75,000 / 2,080 hours = $36.0577 per hour (~$36.06/hr).',
        'Calculate monthly gross: $75,000 / 12 = $6,250.00/month.'
      ],
      result: 'Hourly Wage: $36.06/hour (Monthly: $6,250.00 | Bi-Weekly: $2,884.62)'
    },
    interpretation: 'Allows job seekers and contractors to compare salaried corporate employment offers against hourly freelance contracts accurately.',
    assumptions: 'Full-time standard 2,080 working hours per year.',
    limitations: 'Calculates gross pretax compensation and does not deduct employee income taxes or health insurance benefits.',
    faqs: [
      { question: 'How many work hours are in a year for full-time employees?', answer: 'A standard full-time employee working 40 hours per week for 52 weeks works 2,080 hours per year.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحويل الراتب السنوي أو الشهري إلى أجر الساعة المكافئ (والعكس صحيح) بناءً على عدد ساعات العمل الأسبوعية وأسابيع العمل السنوية.`,
    howToUse: [
      'اختر نوع التحويل (من راتب سنوي/شهري إلى أجر الساعة، أو من أجر الساعة إلى راتب سنوي).',
      'أدخل قيمة الراتب أو الأجر بالساعة.',
      'حدد عدد ساعات العمل الأسبوعية (الافتراضي 40 ساعة) والأسابيع السنوية (52 أسبوعاً).',
      'اطلع على جدول الدخل الشامل بالساعة واليوم والأسبوع والشهر والسنة.'
    ],
    formula: 'أجر الساعة = الراتب السنوي ÷ (ساعات العمل بالأسبوع × 52 أسبوعاً)',
    formulaVariables: [
      { name: 'قيمة الراتب', description: 'الراتب الإجمالي أو الأجر بالساعة.', unit: 'عملة', optional: false },
      { name: 'ساعات الأسبوع', description: 'ساعات الدوام الأسبوعية.', unit: 'ساعات (40)', optional: true }
    ],
    workedExample: {
      scenario: 'تحويل راتب سنوي قدره 75,000 دولار إلى أجر بالساعة بدوام 40 ساعة أسبوعياً.',
      stepByStep: [
        'إجمالي ساعات العمل السنوية: 40 × 52 = 2080 ساعة.',
        'أجر الساعة: 75,000 ÷ 2080 = 36.06 دولار/ساعة.',
        'الراتب الشهري الإجمالي: 75,000 ÷ 12 = 6,250 دولار/شهر.'
      ],
      result: 'أجر الساعة: 36.06$ (الشهري: 6,250$ | الأسبوعي: 1,442.31$)'
    },
    interpretation: 'تساعد الباحثين عن عمل والمستقلين (Freelancers) في مقارنة عروض التوظيف الثابتة بعقود الساعات.',
    assumptions: 'دوام كامل يعادل 2080 ساعة عمل سنوياً.',
    limitations: 'الحسابات تمثل الدخل الإجمالي قبل استقطاع الضرائب والتأمينات الاجتماعية.',
    faqs: [
      { question: 'كم عدد ساعات العمل السنوية للدوام الكامل؟', answer: 'الدوام الكامل القياسي (40 ساعة أسبوعياً × 52 أسبوعاً) يعادل 2080 ساعة عمل سنوياً.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} convierte salarios anuales o mensuales en su tarifa horaria equivalente (y viceversa) en función de las horas semanales y semanas trabajadas al año.`,
    howToUse: [
      'Elija la dirección de la conversión (Salario Anual a Tarifa Horaria o viceversa).',
      'Introduzca el importe de la remuneración.',
      'Indique las horas de trabajo semanales (estándar: 40 h) y semanas al año (52 semanas).',
      'Consulte la retribución equivalente por hora, día, semana, mes y año.'
    ],
    formula: 'Tarifa Horaria = Salario Anual / (Horas semanales × 52 semanas)',
    formulaVariables: [
      { name: 'Retribución', description: 'Sueldo o tarifa por hora.', unit: 'Moneda', optional: false },
      { name: 'Horas/semana', description: 'Jornada laboral.', unit: 'Horas', optional: true }
    ],
    workedExample: {
      scenario: 'Convertir un salario anual de 75.000 € a precio/hora (jornada de 40 h semanales).',
      stepByStep: [
        'Horas anuales: 40 h × 52 = 2.080 horas.',
        'Tarifa por hora: 75.000 / 2.080 = 36,06 €/hora.',
        'Salario bruto mensual: 75.000 / 12 = 6.250,00 €/mes.'
      ],
      result: 'Tarifa horaria: 36,06 €/h | Salario mensual: 6.250,00 €'
    },
    interpretation: 'Útil para negociar contratos freelance o comparar ofertas laborales por cuenta ajena y propia.',
    assumptions: 'Jornada completa estándar de 2.080 horas anuales.',
    limitations: 'Calcula importes brutos antes de impuestos (IRPF) y cotizaciones.',
    faqs: [
      { question: '¿Cómo calcular el sueldo neto a partir de la tarifa horaria?', answer: 'Debe deducir los impuestos sobre la renta y cotizaciones a la seguridad social correspondientes a su tramo fiscal.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} convertit un salaire annuel ou mensuel brut en taux horaire équivalent (et inversement) selon la durée hebdomadaire de travail (35h ou 40h).`,
    howToUse: [
      'Sélectionnez le sens de conversion (Salaire annuel vers Taux horaire ou Taux horaire vers Salaire).',
      'Indiquez le montant de la rémunération.',
      'Ajustez le volume horaire hebdomadaire (ex. 35h ou 40h par semaine).',
      'Consultez la ventilation horaire, mensuelle et annuelle.'
    ],
    formula: 'Taux horaire = Salaire annuel / (Heures hebdo × 52 semaines)',
    formulaVariables: [
      { name: 'Rémunération', description: 'Salaire brut ou taux horaire.', unit: 'Devise', optional: false },
      { name: 'Heures / semaine', description: 'Temps de travail.', unit: 'Heures', optional: true }
    ],
    workedExample: {
      scenario: 'Conversion d\'un salaire de 75 000 € bruts annuels sur une base de 40h/semaine.',
      stepByStep: [
        'Heures annuelles : 40 h × 52 = 2 080 heures.',
        'Taux horaire : 75 000 / 2 080 = 36,06 €/h.',
        'Salaire mensuel brut : 75 000 / 12 = 6 250,00 €/mois.'
      ],
      result: 'Taux horaire brut : 36,06 €/h | Salaire mensuel : 6 250,00 €'
    },
    interpretation: 'Idéal pour comparer un statut de salarié avec une proposition de consultant ou freelance.',
    assumptions: 'Base brute temps plein standard.',
    limitations: 'Calcul brut hors charges sociales salariales et impôt sur le revenu.',
    faqs: [
      { question: 'Combien d\'heures compte une année à 35h par semaine ?', answer: 'Une année complète à 35h par semaine correspond à 1 820 heures de travail (35 × 52).' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} rechnet Jahres- und Monatsgehälter in den äquivalenten Stundenlohn um (und umgekehrt) auf Basis der wöchentlichen Arbeitszeit und bezahlten Arbeitswochen.`,
    howToUse: [
      'Wählen Sie die Umrechnungsrichtung (Jahresgehalt zu Stundenlohn oder Stundenlohn zu Jahresgehalt).',
      'Geben Sie das Gehalt bzw. den Stundenlohn ein.',
      'Geben Sie die Wochenarbeitsstunden (Standard: 40 Std.) und Jahreswochen (52 Wochen) an.',
      'Lesen Sie Stundenlohn, Tagesgehalt, Monats- und Jahresbrutto ab.'
    ],
    formula: 'Stundenlohn = Jahresgehalt / (Wochenstunden × 52 Wochen)',
    formulaVariables: [
      { name: 'Vergütung', description: 'Gehaltsbetrag oder Stundenlohn.', unit: 'Währung', optional: false },
      { name: 'Wochenstunden', description: 'Arbeitsstunden pro Woche.', unit: 'Stunden', optional: true }
    ],
    workedExample: {
      scenario: 'Umrechnung von 75.000 € Jahresbrutto bei einer 40-Stunden-Woche (2.080 Jahresstunden).',
      stepByStep: [
        'Jahresarbeitsstunden: 40 Std. × 52 Wochen = 2.080 Stunden.',
        'Stundenlohn ermitteln: 75.000 € / 2.080 = 36,06 €/Stunde.',
        'Monatsbrutto: 75.000 € / 12 = 6.250,00 €/Monat.'
      ],
      result: 'Brutto-Stundenlohn: 36,06 €/Std. | Monatsbrutto: 6.250,00 €'
    },
    interpretation: 'Erleichtert Freelancern und Angestellten den objektiven Gehaltsvergleich bei Jobangeboten.',
    assumptions: 'Vollzeitanstellung mit 52 bezahlten Wochen p.a.',
    limitations: 'Reine Bruttorechnung ohne Abzug von Lohnsteuer und Sozialversicherungsbeiträgen.',
    faqs: [
      { question: 'Wie viele Arbeitsstunden hat ein Vollzeit-Arbeitsjahr?', answer: 'Bei einer 40-Stunden-Woche umfasst ein Arbeitsjahr 2.080 bezahlte Arbeitsstunden.' }
    ],
    relatedTools
  })
});

// 6. SALES COMMISSION CALCULATOR (commission-calc)
export const COMMISSION_CALC_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates sales representative commission compensation, combining base salaries with flat or tiered commission percentages on total sales revenue or gross margin profits.`,
    howToUse: [
      'Enter base salary (if applicable, or set to $0 for commission-only).',
      'Enter total sales revenue volume.',
      'Enter the commission rate percentage (or configure tiered quota thresholds).',
      'Review total commission earned, combined gross compensation, and effective commission rate.'
    ],
    formula: 'Commission Amount = Sales Volume × (Commission Rate % / 100) | Total Earnings = Base Salary + Commission Amount',
    formulaVariables: [
      { name: 'Base Salary', description: 'Guaranteed base pay.', unit: 'Currency', optional: true },
      { name: 'Sales Volume', description: 'Total revenue closed.', unit: 'Currency', optional: false },
      { name: 'Commission Rate', description: 'Payout percentage.', unit: 'Percentage %', optional: false }
    ],
    workedExample: {
      scenario: 'A sales account executive with a $4,000/month base salary closes $80,000 in monthly sales at an 8.5% commission rate.',
      stepByStep: [
        'Calculate commission payout: $80,000 × 0.085 = $6,800.00.',
        'Add base salary: $4,000 + $6,800 = $10,800.00.'
      ],
      result: 'Commission Payout: $6,800.00 | Total Monthly Pay: $10,800.00'
    },
    interpretation: 'Assists sales managers in structuring quota compensation plans and helps reps project monthly take-home earnings.',
    assumptions: 'Realized revenue without customer returns or payment defaults.',
    limitations: 'Tiered accelerators or clawback clauses must be configured if compensation plans alter payout rates after meeting quota.',
    faqs: [
      { question: 'What is the difference between revenue commission and profit commission?', answer: 'Revenue commission pays a percentage of the total selling price, while profit commission pays a percentage of the net gross profit margin after product costs.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب عمولات المبيعات لمندوبي ومسؤولي المبيعات، مع دمج الراتب الأساسي مع نسب العمولات المباشرة أو المتدرجة على إجمالي الإيرادات أو هوامش الربح.`,
    howToUse: [
      'أدخل الراتب الأساسي الثابت (أو 0 إذا كان العمل بعمولة فقط).',
      'أدخل إجمالي حجم المبيعات المحققة.',
      'حدد نسبة العمولة المئوية.',
      'اطلع على قيمة العمولة المستحقة، وإجمالي الدخل الشهري، ومتوسط نسبة التحصيل.'
    ],
    formula: 'قيمة العمولة = حجم المبيعات × (نسبة العمولة ÷ 100) | إجمالي الدخل = الراتب الأساسي + العمولة',
    formulaVariables: [
      { name: 'الراتب الأساسي', description: 'الأجر الثابت المضمون.', unit: 'عملة', optional: true },
      { name: 'حجم المبيعات', description: 'إجمالي المبيعات المغلقة.', unit: 'عملة', optional: false },
      { name: 'نسبة العمولة', description: 'النسبة المئوية المخصصة.', unit: '%', optional: false }
    ],
    workedExample: {
      scenario: 'مندوب مبيعات براتب أساسي 4,000 دولار حقق مبيعات بقيمة 80,000 دولار بنسبة عمولة 8.5%.',
      stepByStep: [
        'حساب قيمة العمولة: 80,000 × 0.085 = 6,800 دولار.',
        'إضافة الراتب الأساسي: 4,000 + 6,800 = 10,800 دولار.'
      ],
      result: 'العمولة: 6,800$ | إجمالي الدخل الشهري: 10,800$'
    },
    interpretation: 'تساعد مديري المبيعات في صياغة خطط الحوافز والمكافآت، وتمكّن الموظفين من تقدير دخولهم الشهرية.',
    assumptions: 'مبيعات محققة ومحصلة بالكامل.',
    limitations: 'خطط العمولات المعقدة التي تحتوي على شرائح متعددة تتطلب حساب كل شريحة بشكل مستقل.',
    faqs: [
      { question: 'ما هو الفرق بين العمولة على المبيعات والعمولة على الأرباح؟', answer: 'عمولة المبيعات تُحسب كنسبة من السعر الإجمالي، بينما عمولة الأرباح تُحسب من صافي هامش الربح بعد خصم التكاليف.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula las comisiones de ventas de agentes comerciales, combinando el salario base con porcentajes fijos o escalonados sobre el volumen de ventas o margen bruto.`,
    howToUse: [
      'Introduzca el sueldo base fijo (o 0 si es a comisión pura).',
      'Introduzca el volumen total de ventas cerrado.',
      'Indique el porcentaje de comisión pactado.',
      'Consulte el importe de la comisión devengada y la remuneración mensual total.'
    ],
    formula: 'Comisión = Ventas × (% Comisión / 100) | Retribución Total = Sueldo Base + Comisión',
    formulaVariables: [
      { name: 'Sueldo Base', description: 'Salario fijo garantizado.', unit: 'Moneda', optional: true },
      { name: 'Volumen Ventas', description: 'Facturación conseguida.', unit: 'Moneda', optional: false },
      { name: 'Porcentaje Comisión', description: 'Tasa de incentivo.', unit: '%', optional: false }
    ],
    workedExample: {
      scenario: 'Comercial con 4.000 € de sueldo base y 80.000 € en ventas con comisión del 8,5%.',
      stepByStep: [
        'Cálculo comisión: 80.000 € × 0,085 = 6.800 €.',
        'Suma retribución: 4.000 € + 6.800 € = 10.800 €.'
      ],
      result: 'Comisión: 6.800 € | Retribución Total: 10.800 €'
    },
    interpretation: 'Herramienta clave para directores de ventas y comerciales para proyectar incentivos por objetivos.',
    assumptions: 'Ventas efectivas sin cancelaciones.',
    limitations: 'Planes con comisiones por tramos requieren desglosar cada escalón.',
    faqs: [
      { question: '¿Qué es una comisión escalonada?', answer: 'Es un esquema donde el porcentaje de comisión aumenta a medida que el comercial supera diferentes metas de facturación.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule les commissions sur les ventes des commerciaux, associant salaire fixe et pourcentages d'intéressement sur le chiffre d'affaires ou la marge brute.`,
    howToUse: [
      'Indiquez le salaire fixe de base (ou 0 pour un statut 100 % commission).',
      'Indiquez le montant total des ventes réalisées.',
      'Précisez le pourcentage de commission.',
      'Consultez le montant des commissions et la rémunération brute globale.'
    ],
    formula: 'Commission = Ventes × (Taux % / 100) | Rémunération Globale = Salaire Fixe + Commission',
    formulaVariables: [
      { name: 'Salaire fixe', description: 'Fixe mensuel garanti.', unit: 'Devise', optional: true },
      { name: 'Volume de ventes', description: 'Chiffre d\'affaires généré.', unit: 'Devise', optional: false },
      { name: 'Taux commission', description: 'Pourcentage de prime.', unit: '%', optional: false }
    ],
    workedExample: {
      scenario: 'Commercial avec 4 000 € de fixe réalisant 80 000 € de ventes à 8,5 % de commission.',
      stepByStep: [
        'Prime de commission : 80 000 € × 0,085 = 6 800 €.',
        'Rémunération totale : 4 000 € + 6 800 € = 10 800 €.'
      ],
      result: 'Commissions : 6 800 € | Salaire brut total : 10 800 €'
    },
    interpretation: 'Aide à la définition des plans de rémunération variable des forces de vente.',
    assumptions: 'Chiffre d\'affaires encaissé sans impayés.',
    limitations: 'Les systèmes de commissions progressives par paliers nécessitent un calcul par tranche.',
    faqs: [
      { question: 'Vaut-il mieux commissionner sur le chiffre d\'affaires ou sur la marge ?', answer: 'La commission sur la marge préserve la rentabilité de l\'entreprise en évitant les remises excessives accordées par les vendeurs.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet Verkaufsprovisionen für Vertriebsmitarbeiter und kombiniert Grundgehalt mit festen oder gestaffelten Provisionssätzen auf Umsatz oder Rohertrag.`,
    howToUse: [
      'Geben Sie das monatliche Grundgehalt ein (oder 0 bei reiner Provisionsbasis).',
      'Geben Sie den erzielten Gesamtumsatz ein.',
      'Tragen Sie den Provisionssatz in Prozent ein.',
      'Lesen Sie die ermittelte Provisionshöhe und das gesamte Bruttomonatseinkommen ab.'
    ],
    formula: 'Provisionsbetrag = Umsatz × (Provisionssatz / 100) | Gesamtvergütung = Grundgehalt + Provisionsbetrag',
    formulaVariables: [
      { name: 'Grundgehalt', description: 'Garantiertes Fixum.', unit: 'Währung', optional: true },
      { name: 'Umsatz', description: 'Abgeschlossenes Verkaufsvolumen.', unit: 'Währung', optional: false },
      { name: 'Provisionssatz', description: 'Vergütungssatz in Prozent.', unit: '%', optional: false }
    ],
    workedExample: {
      scenario: 'Vertriebler mit 4.000 € Fixum erzielt 80.000 € Monatsumsatz bei 8,5 % Provision.',
      stepByStep: [
        'Provision berechnen: 80.000 € × 0,085 = 6.800 €.',
        'Gesamtgehalt berechnen: 4.000 € + 6.800 € = 10.800 €.'
      ],
      result: 'Provision: 6.800 € | Monatliches Gesamtbrutto: 10.800 €'
    },
    interpretation: 'Unterstützt Vertriebsleiter bei der Gestaltung von Vergütungsmodellen und Vertriebler bei der Provisionskontrolle.',
    assumptions: 'Realisierter Netto-Umsatz ohne Retouren.',
    limitations: 'Gestaffelte Provisionsmodelle erfordern eine stufenweise Erfassung.',
    faqs: [
      { question: 'Was ist eine Deckungsbeitragsprovision?', answer: 'Dabei wird die Provision nicht vom Bruttoumsatz, sondern vom erwirtschafteten Rohgewinn nach Abzug der Wareneinstandskosten berechnet.' }
    ],
    relatedTools
  })
});

// 7. ASSET & REAL ESTATE APPRECIATION CALCULATOR (appreciation-calc)
export const APPRECIATION_CALC_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} forecasts future asset valuation and equity growth for real estate, collectibles, and investment assets based on compound annual appreciation rates over customizable holding periods.`,
    howToUse: [
      'Enter the initial current asset purchase price or property valuation.',
      'Enter the expected annual appreciation rate percentage (e.g., 4.0% per year).',
      'Select the projection time horizon in years.',
      'Review future projected valuation, total capital gain, and cumulative growth percentage.'
    ],
    formula: 'Future Value FV = Initial Value × (1 + Appreciation Rate / 100)^Years | Total Gain = FV - Initial Value',
    formulaVariables: [
      { name: 'Initial Value', description: 'Current asset valuation.', unit: 'Currency', optional: false },
      { name: 'Annual Rate', description: 'Expected yearly appreciation.', unit: 'Percentage %', optional: false },
      { name: 'Years', description: 'Holding period horizon.', unit: 'Years', optional: false }
    ],
    workedExample: {
      scenario: 'A residential home purchased for $400,000 appreciating at an average rate of 4.5% annually over 10 years.',
      stepByStep: [
        'Initial value: $400,000.',
        'Appreciation factor: (1 + 0.045)^10 = (1.045)^10 = 1.55297.',
        'Future property value: $400,000 × 1.55297 = $621,188.00.',
        'Capital gain: $621,188.00 - $400,000 = $221,188.00 (+55.30%).'
      ],
      result: 'Future Value: $621,188.00 (Total Gain: +$221,188.00 / +55.30%)'
    },
    interpretation: 'Guides long-term real estate investment analysis, property equity forecasting, and portfolio asset allocation.',
    assumptions: 'Steady geometric annual appreciation rate.',
    limitations: 'Real estate markets experience regional cyclical price corrections and do not include ongoing maintenance costs or property taxes.',
    faqs: [
      { question: 'What is the historical average real estate appreciation rate?', answer: 'In the United States, historical residential real estate has appreciated at an average long-term rate of 3.5% to 5.0% annually, roughly pacing inflation plus modest real growth.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتقدير القيمة المستقبلية ونمو حقوق الملكية للعقارات والأصول الاستثمارية بناءً على معدل النمو والزيادة السنوية المركبة عبر فترات زمنية مختلفة.`,
    howToUse: [
      'أدخل القيمة الحالية للأصل أو سعر شراء العقار.',
      'أدخل معدل الزيادة السنوية المتوقع في القيمة (%).',
      'حدد عدد سنوات التملك والاستثمار.',
      'اطلع على القيمة المستقبلية التقديرية، وصافي الأرباح الرأسمالية المتراكمة.'
    ],
    formula: 'القيمة المستقبلية = القيمة الحالية × (1 + نسبة الزيادة ÷ 100)^السنوات | الأرباح = القيمة المستقبلية - القيمة الحالية',
    formulaVariables: [
      { name: 'القيمة الحالية', description: 'سعر الأصل الأولي.', unit: 'عملة', optional: false },
      { name: 'معدل الزيادة السنوي', description: 'نسبة الارتفاع السنوي المتوقع.', unit: '%', optional: false },
      { name: 'السنوات', description: 'مدة الاستثمار.', unit: 'سنوات', optional: false }
    ],
    workedExample: {
      scenario: 'عقار تم شراؤه بمبلغ 400,000 دولار بمعدل نمو سنوي 4.5% لمدة 10 سنوات.',
      stepByStep: [
        'معامل النمو: (1 + 0.045)^10 = 1.55297.',
        'القيمة المستقبلية: 400,000 × 1.55297 = 621,188 دولاراً.',
        'الأرباح الرأسمالية: 621,188 - 400,000 = 221,188 دولاراً (+55.30%).'
      ],
      result: 'القيمة المستقبلية: 621,188$ (إجمالي الربح: +221,188$ / +55.30%)'
    },
    interpretation: 'تساعد المستثمرين العقاريين في تخطيط المحافظ الاستثمارية وتقدير نمو الثروة على المدى الطويل.',
    assumptions: 'نمو مركب سنوي ثابت.',
    limitations: 'تخضع أسواق العقارات لتقلبات الدورات الاقتصادية ولا تشمل الحسبة تكاليف الصيانة الدورية أو الضرائب العقارية.',
    faqs: [
      { question: 'ما هو متوسط الارتفاع السنوي لأسعار العقارات تاريخياً؟', answer: 'تاريخياً، يتراوح متوسط نمو أسعار العقارات السكنية بين 3.5% إلى 5% سنوياً متفوقاً بشكل طفيف على معدلات التضخم.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} proyecta la revalorización futura y el incremento patrimonial de inmuebles y activos de inversión a partir de tasas de apreciación anual compuestas.`,
    howToUse: [
      'Introduzca el valor actual o precio de compra del inmueble/activo.',
      'Indique la tasa de apreciación anual esperada (%).',
      'Seleccione el plazo de proyección en años.',
      'Consulte la valoración futura estimada y la plusvalía total generada.'
    ],
    formula: 'Valor Futuro = Valor Inicial × (1 + Tasa / 100)^Años | Plusvalía = Valor Futuro - Valor Inicial',
    formulaVariables: [
      { name: 'Valor Inicial', description: 'Precio actual del bien.', unit: 'Moneda', optional: false },
      { name: 'Tasa Anual', description: 'Porcentaje de revalorización.', unit: '%', optional: false },
      { name: 'Años', description: 'Horizonte temporal.', unit: 'Años', optional: false }
    ],
    workedExample: {
      scenario: 'Inmueble de 400.000 € con revalorización del 4,5% anual durante 10 años.',
      stepByStep: [
        'Factor acumulado: (1,045)^10 = 1,55297.',
        'Valor futuro: 400.000 € × 1,55297 = 621.188 €.',
        'Plusvalía generada: 621.188 € - 400.000 € = 221.188 € (+55,30%).'
      ],
      result: 'Valor Futuro: 621.188 € | Plusvalía: +221.188 € (+55,30%)'
    },
    interpretation: 'Fundamental para evaluar inversiones inmobiliarias y estimar el patrimonio a largo plazo.',
    assumptions: 'Apreciación geométrica constante.',
    limitations: 'No incluye costes de mantenimiento, IBI ni impuestos sobre plusvalías.',
    faqs: [
      { question: '¿Cuál es la revalorización inmobiliaria media histórica?', answer: 'Históricamente la vivienda suele revalorizarse entre un 3% y un 5% anual a largo plazo.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} projette l'appréciation future et la plus-value d'un bien immobilier ou d'un actif financier sur la base d'un taux de revalorisation annuel composé.`,
    howToUse: [
      'Indiquez le prix d\'achat ou la valeur actuelle du bien.',
      'Saisissez le taux de plus-value annuel estimé (%).',
      'Indiquez la durée de détention en années.',
      'Consultez la valeur vénale future et la plus-value brute estimée.'
    ],
    formula: 'Valeur Future = Valeur Initiale × (1 + Taux / 100)^Années | Plus-value = Valeur Future - Valeur Initiale',
    formulaVariables: [
      { name: 'Valeur Initiale', description: 'Prix d\'acquisition.', unit: 'Devise', optional: false },
      { name: 'Taux annuel', description: 'Taux de revalorisation.', unit: '%', optional: false },
      { name: 'Années', description: 'Période de détention.', unit: 'Années', optional: false }
    ],
    workedExample: {
      scenario: 'Bien immobilier acquis 400 000 € avec une appréciation annuelle de 4,5 % sur 10 ans.',
      stepByStep: [
        'Coefficient multiplicateur : (1,045)^10 = 1,55297.',
        'Valeur future : 400 000 € × 1,55297 = 621 188 €.',
        'Plus-value : 621 188 € - 400 000 € = 221 188 € (+55,30 %).'
      ],
      result: 'Valeur future estimée : 621 188 € | Plus-value : +221 188 € (+55,30 %)'
    },
    interpretation: 'Aide les investisseurs immobiliers à estimer leur enrichissement patrimonial et planifier leur sortie d\'investissement.',
    assumptions: 'Croissance annuelle moyenne constante.',
    limitations: 'Ne prend pas en compte les travaux d\'entretien, charges de copropriété ou la fiscalité des plus-values.',
    faqs: [
      { question: 'L\'immobilier s\'apprécie-t-il toujours ?', answer: 'Sur le long terme l\'immobilier suit généralement une tendance haussière, mais les marchés locaux connaissent des cycles de correction.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} prognostiziert die künftige Wertsteigerung und den Vermögenszuwachs von Immobilien und Sachwerten basierend auf jährlichen Zinseszins-Wertsteigerungsraten.`,
    howToUse: [
      'Geben Sie den Anschaffungspreis bzw. aktuellen Verkehrswert der Immobilie ein.',
      'Geben Sie die erwartete jährliche Wertsteigerungsrate in Prozent ein.',
      'Wählen Sie den Prognosezeitraum in Jahren.',
      'Lesen Sie den zukünftigen Immobilienwert und den Wertzuwachs ab.'
    ],
    formula: 'Zukunftswert = Anfangswert × (1 + Wertsteigerungsrate / 100)^Jahre | Wertzuwachs = Zukunftswert - Anfangswert',
    formulaVariables: [
      { name: 'Anfangswert', description: 'Kaufpreis/Verkehrswert.', unit: 'Währung', optional: false },
      { name: 'Steigerungsrate', description: 'Jährliche Wertsteigerung.', unit: '%', optional: false },
      { name: 'Jahre', description: 'Haltedauer.', unit: 'Jahre', optional: false }
    ],
    workedExample: {
      scenario: 'Wohnimmobilie für 400.000 € mit 4,5 % Wertsteigerung pro Jahr über 10 Jahre.',
      stepByStep: [
        'Zinsfaktor: (1,045)^10 = 1,55297.',
        'Zukünftiger Wert: 400.000 € × 1,55297 = 621.188 €.',
        'Wertzuwachs: 621.188 € - 400.000 € = 221.188 € (+55,30%).'
      ],
      result: 'Zukunftswert: 621.188 € | Reiner Wertzuwachs: +221.188 € (+55,30%)'
    },
    interpretation: 'Dient Immobilieninvestoren zur langfristigen Vermögensplanung und Renditebeurteilung von Sachwertanlagen.',
    assumptions: 'Stetige geometrische Wertentwicklung.',
    limitations: 'Laufende Instandhaltungskosten, Grundsteuern oder regionale Marktkorrekturen sind gesondert zu berücksichtigen.',
    faqs: [
      { question: 'Wie hoch ist die historische Wertsteigerung von Wohnimmobilien?', answer: 'Langfristig liegt die Wertsteigerung von Wohnimmobilien in guten Lagen meist bei 3% bis 5% pro Jahr.' }
    ],
    relatedTools
  })
});

// 8. STRAIGHT-LINE DEPRECIATION CALCULATOR (depreciation-straight)
export const DEPRECIATION_STRAIGHT_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates annual straight-line depreciation expense, accumulated depreciation schedules, and declining asset book values over the asset's useful service life.`,
    howToUse: [
      'Enter the initial asset acquisition cost basis.',
      'Enter the estimated residual salvage (scrap) value at the end of life.',
      'Enter the useful service lifespan in years.',
      'Review annual depreciation expense and the year-by-year asset book value schedule.'
    ],
    formula: 'Annual Depreciation Expense = (Initial Cost Basis - Salvage Value) / Useful Lifespan in Years | Book Value Year t = Initial Cost - (Annual Depreciation × t)',
    formulaVariables: [
      { name: 'Initial Cost', description: 'Asset purchase price.', unit: 'Currency', optional: false },
      { name: 'Salvage Value', description: 'Residual scrap value.', unit: 'Currency', optional: false },
      { name: 'Useful Life', description: 'Operational life of asset.', unit: 'Years', optional: false }
    ],
    workedExample: {
      scenario: 'A company buys commercial delivery equipment for $35,000 with a 5-year useful life and an estimated $5,000 salvage value.',
      stepByStep: [
        'Depreciable base: $35,000 - $5,000 = $30,000.',
        'Annual straight-line depreciation: $30,000 / 5 years = $6,000/year.',
        'Book value after Year 3: $35,000 - ($6,000 × 3) = $17,000.'
      ],
      result: 'Annual Depreciation: $6,000/year (Book Value Year 5: $5,000 Salvage Value)'
    },
    interpretation: 'Ensures compliance with GAAP/IFRS accounting standards for spreading capital asset costs evenly over their productive operating periods.',
    assumptions: 'Uniform straight-line asset wear and productivity.',
    limitations: 'Does not reflect accelerated initial wear (unlike MACRS or Double Declining Balance methods).',
    faqs: [
      { question: 'What is salvage value?', answer: 'Salvage (residual) value is the estimated resale or scrap value of an asset at the end of its useful service life.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب قسط الإهلاك السنوي الثابت (Straight-Line Depreciation)، وجدول الإهلاك المتراكم، والقيمة الدفترية للأصول الثابتة على مدار عمرها الإنتاجي.`,
    howToUse: [
      'أدخل تكلفة شراء الأصل الأولية.',
      'أدخل القيمة التخريدية المتوقعة (الخردة) للأصل في نهاية عمره.',
      'حدد العمر الإنتاجي للأصل بالسنوات.',
      'اطلع على قسط الإهلاك السنوي الثابت وجدول القيمة الدفترية سنة بسنة.'
    ],
    formula: 'قسط الإهلاك السنوي = (تكلفة الأصل - القيمة التخريدية) ÷ العمر الإنتاجي بالسنوات',
    formulaVariables: [
      { name: 'تكلفة الأصل', description: 'سعر الشراء الأولي.', unit: 'عملة', optional: false },
      { name: 'قيمة الخردة', description: 'القيمة التخريدية المتبقية.', unit: 'عملة', optional: false },
      { name: 'العمر الإنتاجي', description: 'السنوات التشغيلية.', unit: 'سنوات', optional: false }
    ],
    workedExample: {
      scenario: 'شراء معدات نقل بقيمة 35,000 دولار بعمر إنتاجي 5 سنوات وقيمة خردة 5,000 دولار.',
      stepByStep: [
        'المبلغ القابل للإهلاك: 35,000 - 5,000 = 30,000 دولار.',
        'قسط الإهلاك السنوي: 30,000 ÷ 5 سنوات = 6,000 دولار/سنة.',
        'القيمة الدفترية بعد 3 سنوات: 35,000 - (6,000 × 3) = 17,000 دولار.'
      ],
      result: 'الإهلاك السنوي: 6,000$/سنة (القيمة الدفترية في نهاية السنة الخامسة: 5,000$)'
    },
    interpretation: 'تتوافق مع المعايير المحاسبية الدولية (IFRS/GAAP) لتوزيع تكاليف الأصول الرأسمالية بعدالة على الفترات المالية.',
    assumptions: 'استهلاك منتظم ومتساوٍ للأصل طوال فترة خدمته.',
    limitations: 'لا تعكس التآكل السريع في السنوات الأولى مقارنة بطرق الإهلاك المتسارع.',
    faqs: [
      { question: 'ما هي القيمة التخريدية (الخردة)؟', answer: 'هي القيمة التقديرية المقدر بيع الأصل بها بعد انتهاء عمره الإنتاجي وخروجه من الخدمة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la amortización contable lineal anual, la amortización acumulada y el valor neto contable residual de los activos fijos durante su vida útil.`,
    howToUse: [
      'Introduzca el coste de adquisición del activo.',
      'Introduzca el valor residual estimado al final de su vida útil.',
      'Indique la vida útil en años.',
      'Consulte la cuota anual de amortización y la tabla de valores contables año a año.'
    ],
    formula: 'Cuota de Amortización Anual = (Coste de Adquisición - Valor Residual) / Vida Útil en Años',
    formulaVariables: [
      { name: 'Coste Activo', description: 'Precio de adquisición.', unit: 'Moneda', optional: false },
      { name: 'Valor Residual', description: 'Valor de desecho/recuperación.', unit: 'Moneda', optional: false },
      { name: 'Vida Útil', description: 'Años de servicio.', unit: 'Años', optional: false }
    ],
    workedExample: {
      scenario: 'Vehículo comercial de 35.000 € con 5 años de vida útil y 5.000 € de valor residual.',
      stepByStep: [
        'Base amortizable: 35.000 € - 5.000 € = 30.000 €.',
        'Cuota anual: 30.000 € / 5 años = 6.000 €/año.',
        'Valor contable tras 3 años: 35.000 € - (6.000 € × 3) = 17.000 €.'
      ],
      result: 'Amortización anual: 6.000 €/año | Valor final año 5: 5.000 €'
    },
    interpretation: 'Método contable estándar según el Plan General Contable para imputar el gasto de desgaste de activos.',
    assumptions: 'Depreciación constante y homogénea en el tiempo.',
    limitations: 'No aplica depreciación acelerada ni degresiva.',
    faqs: [
      { question: '¿Qué es el valor residual?', answer: 'Es el importe que la empresa espera obtener por la venta del activo al final de su vida útil, una vez deducidos los costes de venta.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule l'amortissement linéaire annuel, le tableau d'amortissement cumulé et la valeur nette comptable (VNC) d'une immobilisation sur sa durée d'utilité.`,
    howToUse: [
      'Indiquez le coût d\'acquisition de l\'immobilisation.',
      'Saisissez la valeur résiduelle estimée en fin de vie.',
      'Indiquez la durée d\'amortissement en années.',
      'Consultez l\'annuité d\'amortissement et le tableau de VNC année par année.'
    ],
    formula: 'Annuité d\'Amortissement = (Base Amortissable - Valeur Résiduelle) / Durée en Années',
    formulaVariables: [
      { name: 'Coût d\'achat', description: 'Prix d\'acquisition HT.', unit: 'Devise', optional: false },
      { name: 'Valeur résiduelle', description: 'Valeur en fin d\'usage.', unit: 'Devise', optional: false },
      { name: 'Durée', description: 'Années d\'utilisation.', unit: 'Années', optional: false }
    ],
    workedExample: {
      scenario: 'Matériel industriel acheté 35 000 € avec une durée de 5 ans et 5 000 € de valeur résiduelle.',
      stepByStep: [
        'Base amortissable : 35 000 € - 5 000 € = 30 000 €.',
        'Annuité constante : 30 000 € / 5 ans = 6 000 €/an.',
        'VNC après 3 ans : 35 000 € - (6 000 € × 3) = 17 000 €.'
      ],
      result: 'Annuité d\'amortissement : 6 000 €/an (VNC finale : 5 000 €)'
    },
    interpretation: 'Conforme aux règles comptables pour constater la dépréciation des actifs corporels de l\'entreprise.',
    assumptions: 'Consommation constante des avantages économiques.',
    limitations: 'L\'amortissement dégressif peut être plus avantageux fiscalement pour certains équipements.',
    faqs: [
      { question: 'Qu\'est-ce que la Valeur Nette Comptable (VNC) ?', answer: 'La VNC est la valeur brute d\'un actif diminuée du total des amortissements cumulés pratiqués jusqu\'à ce jour.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die lineare jährliche Abschreibung (AfA), den kumulierten Abschreibungsverlauf und den Restbuchwert von Anlagegütern über deren betriebsgewöhnliche Nutzungsdauer.`,
    howToUse: [
      'Geben Sie die Anschaffungskosten des Wirtschaftsguts ein.',
      'Geben Sie den geschätzten Restwert (Schrottwert) am Ende der Nutzung ein.',
      'Tragen Sie die Nutzungsdauer in Jahren (nach AfA-Tabelle) ein.',
      'Lesen Sie den jährlichen AfA-Betrag und den Buchwertverlauf ab.'
    ],
    formula: 'Jährliche AfA = (Anschaffungskosten - Restwert) / Nutzungsdauer in Jahren',
    formulaVariables: [
      { name: 'Anschaffungskosten', description: 'Kaufpreis ohne Vorsteuer.', unit: 'Währung', optional: false },
      { name: 'Restwert', description: 'Verbleibender Schrottwert.', unit: 'Währung', optional: false },
      { name: 'Nutzungsdauer', description: 'Jahre laut AfA-Tabelle.', unit: 'Jahre', optional: false }
    ],
    workedExample: {
      scenario: 'Lieferfahrzeug für 35.000 € mit 5 Jahren Nutzungsdauer und 5.000 € Restwert.',
      stepByStep: [
        'Abschreibungsbasis: 35.000 € - 5.000 € = 30.000 €.',
        'Jährlicher AfA-Betrag: 30.000 € / 5 Jahre = 6.000 €/Jahr.',
        'Buchwert nach 3 Jahren: 35.000 € - (6.000 € × 3) = 17.000 €.'
      ],
      result: 'Jährliche lineare AfA: 6.000 €/Jahr (Restbuchwert nach Jahr 5: 5.000 €)'
    },
    interpretation: 'Grundlegend für die steuerliche Gewinnermittlung und handelsrechtliche Bilanzierung im Betriebsvermögen.',
    assumptions: 'Gleichmäßige lineare Wertminderung über die Nutzungszeit.',
    limitations: 'Bildet keine degressive Abschreibung oder Sonder-AfA ab.',
    faqs: [
      { question: 'Was ist die amtliche AfA-Tabelle?', answer: 'Eine vom Bundesfinanzministerium herausgegebene Tabelle, die die steuerlich anerkannte Nutzungsdauer für Anlagegüter festlegt.' }
    ],
    relatedTools
  })
});

// 9. EARLY MORTGAGE PAYOFF CALCULATOR (mortgage-payoff)
export const MORTGAGE_PAYOFF_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates how making extra principal mortgage payments (monthly, annual, or one-time lump sums) accelerates loan payoff, shortens total mortgage duration, and saves tens of thousands in interest costs.`,
    howToUse: [
      'Enter current mortgage balance, annual interest rate %, and standard loan term.',
      'Enter the extra principal payment amount and frequency (Monthly, Annually, or Lump Sum).',
      'Review the new accelerated payoff date, total years saved, and total interest dollars saved.'
    ],
    formula: 'Monthly payment: Standard Amortization PMT | Extra payments directly reduce remaining loan principal P, accelerating loan maturity: New Months = ln[1 - (r/12 · P) / (PMT + Extra PMT)] / ln(1 + r/12)',
    formulaVariables: [
      { name: 'Loan Balance', description: 'Remaining principal.', unit: 'Currency', optional: false },
      { name: 'Interest Rate', description: 'Annual mortgage rate.', unit: 'Percentage %', optional: false },
      { name: 'Extra Payment', description: 'Additional principal contribution.', unit: 'Currency/Month', optional: false }
    ],
    workedExample: {
      scenario: 'A $300,000 30-year mortgage at 6.0% interest ($1,798.65/mo) with an extra $200/month principal payment.',
      stepByStep: [
        'Standard 30-year total interest: $347,515.00.',
        'New payment with extra principal: $1,798.65 + $200 = $1,998.65/month.',
        'Accelerated payoff term: 23.8 years (6.2 years shaved off).',
        'New total interest: $264,888.00. Total interest saved: $347,515 - $264,888 = $82,627.00.'
      ],
      result: 'Paid Off 6.2 Years Early | Total Interest Saved: $82,627.00'
    },
    interpretation: 'Demonstrates how modest extra principal contributions generate substantial long-term wealth by eliminating compound debt interest.',
    assumptions: 'Extra payments applied 100% directly to reducing loan principal without prepayment penalty fees.',
    limitations: 'Opportunity cost of paying down mortgage early vs investing excess cash in higher-yielding market assets.',
    faqs: [
      { question: 'Do extra mortgage payments go directly to principal?', answer: 'Yes, as long as you designate the extra amount as "Principal-Only Payment" on your lender portal.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب تأثير السداد المبكر للتمويل العقاري عبر دفع مبالغ إضافية لأصل الدين (شهرياً أو سنوياً أو دفعة واحدة) لتسريع سداد القرض وتوفير مبالغ ضخمة من الفوائد التراكمية.`,
    howToUse: [
      'أدخل الرصيد المتبقي من القرض العقاري، ومعدل الفائدة السنوي، ومدة القرض الأصلية.',
      'أدخل مبلغ السداد الإضافي ودورية دفعه (شهرياً، سنوياً، أو دفعة واحدة مقطوعة).',
      'اطلع على موعد السداد الجديد المختصر، وعدد السنوات الموفرة، وإجمالي مبالغ الفائدة الموفرة.'
    ],
    formula: 'المبالغ الإضافية تخفض أصل القرض مباشرة، مما يقلص الفائدة المحتسبة شهرياً ويختصر المدة الزمنية لسداد التمويل',
    formulaVariables: [
      { name: 'رصيد القرض', description: 'أصل التمويل المتبقي.', unit: 'عملة', optional: false },
      { name: 'معدل الفائدة', description: 'النسبة السنوية.', unit: '%', optional: false },
      { name: 'الدفعة الإضافية', description: 'المبلغ الإضافي الشهري.', unit: 'عملة', optional: false }
    ],
    workedExample: {
      scenario: 'قرض عقاري بقيمة 300,000 دولار لمدة 30 سنة بفائدة 6.0% مع إضافة 200 دولار شهرياً لأصل الدين.',
      stepByStep: [
        'إجمالي الفائدة الأصلية لمدة 30 سنة: 347,515 دولاراً.',
        'القسط الجديد بعد الزيادة: 1,798.65 + 200 = 1,998.65 دولار/شهر.',
        'فترة السداد الجديدة: 23.8 سنة (اختصار 6.2 سنوات كاملة من مدة القرض).',
        'إجمالي الفوائد الموفرة: 82,627 دولاراً.'
      ],
      result: 'سداد مبكر قبل الموعد بـ 6.2 سنوات | إجمالي الفوائد الموفرة: 82,627$'
    },
    interpretation: 'توضح القوة المالية لسداد دفعات إضافية بسيطة في تحرير العقار من الديون وتوفير ثروة مالية طائلة.',
    assumptions: 'توجيه كامل الدفعة الإضافية لخصم أصل الدين دون غرامات سداد مبكر.',
    limitations: 'يجب مقارنة السداد المبكر بفرص استثمار الفائض النقدي في أصول ذات عوائد أعلى.',
    faqs: [
      { question: 'هل الدفعة الإضافية تخصم من الفائدة أم من أصل الدين؟', answer: 'تخصم مباشرة من أصل الدين (Principal) مما يقلل من الفوائد المحسوبة على الأشهر اللاحقة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula cómo amortizar anticipadamente una hipoteca mediante pagos extraordinarios periódicos o puntuales, reduciendo años de plazo y miles de euros en intereses bancarios.`,
    howToUse: [
      'Introduzca el capital pendiente de la hipoteca, el tipo de interés y el plazo restante.',
      'Introduzca la aportación extraordinaria y su frecuencia (mensual, anual o pago único).',
      'Consulte cuántos años antes cancelará su hipoteca y el total de intereses ahorrados.'
    ],
    formula: 'La amortización anticipada reduce directamente el capital principal pendiente, recalculando el plazo total restante',
    formulaVariables: [
      { name: 'Capital pendiente', description: 'Saldo deudor.', unit: 'Moneda', optional: false },
      { name: 'Tipo de interés', description: 'Interés nominal anual.', unit: '%', optional: false },
      { name: 'Aportación extra', description: 'Pago extraordinario.', unit: 'Moneda', optional: false }
    ],
    workedExample: {
      scenario: 'Hipoteca de 300.000 € a 30 años al 6,0% con aportación extra de 200 € al mes.',
      stepByStep: [
        'Intereses totales originales: 347.515 €.',
        'Nueva cuota mensual: 1.798,65 € + 200 € = 1.998,65 €/mes.',
        'Plazo reducido a 23,8 años (se acortan 6,2 años de hipoteca).',
        'Ahorro total de intereses: 82.627 €.'
      ],
      result: 'Cancelación 6,2 años antes | Ahorro total en intereses: 82.627 €'
    },
    interpretation: 'Demuestra el beneficio financiero de la amortización anticipada para librarse de deudas hipotecarias.',
    assumptions: 'Amortización destinada a reducción de plazo sin comisiones por amortización anticipada.',
    limitations: 'Debe valorarse el coste de oportunidad frente a rentabilidades de inversión alternativas.',
    faqs: [
      { question: '¿Es mejor amortizar cuota o amortizar plazo?', answer: 'Amortizar plazo ahorra significativamente más dinero en intereses totales a largo plazo que reducir cuota.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule l'impact d'un remboursement anticipé de prêt immobilier (mensuel ou ponctuel) sur la réduction de la durée du crédit et le montant total des intérêts économisés.`,
    howToUse: [
      'Saisissez le capital restant dû, le taux d\'intérêt et la durée initiale.',
      'Indiquez le montant du versement complémentaire (mensuel, annuel ou ponctuel).',
      'Consultez le nombre d\'années gagnées et le total des intérêts bancaires économisés.'
    ],
    formula: 'Les remboursements anticipés diminuent le capital restant dû, ce qui réduit la base de calcul des intérêts futurs et raccourcit la maturité du prêt',
    formulaVariables: [
      { name: 'Capital restant', description: 'Montant du prêt.', unit: 'Devise', optional: false },
      { name: 'Taux nominal', description: 'Taux annuel.', unit: '%', optional: false },
      { name: 'Versement extra', description: 'Apport supplémentaire.', unit: 'Devise', optional: false }
    ],
    workedExample: {
      scenario: 'Prêt de 300 000 € sur 30 ans à 6,0 % avec 200 €/mois de remboursement supplémentaire.',
      stepByStep: [
        'Intérêts initiaux totaux : 347 515 €.',
        'Nouvelle mensualité : 1 998,65 €/mois.',
        'Nouvelle durée du crédit : 23,8 ans (gain de 6,2 ans).',
        'Total d\'intérêts économisés : 82 627 €.'
      ],
      result: 'Crédit soldé 6,2 ans plus tôt | Économie d\'intérêts : 82 627 €'
    },
    interpretation: 'Met en évidence l\'effet spectaculaire des versements anticipés pour effacer ses dettes plus rapidement.',
    assumptions: 'Option réduction de durée sans pénalités de remboursement anticipé (IRA).',
    limitations: 'À comparer avec le rendement potentiel de placements financiers.',
    faqs: [
      { question: 'Faut-il réduire la durée ou la mensualité ?', answer: 'Réduire la durée du prêt génère une économie d\'intérêts globale bien plus importante que la réduction du montant de la mensualité.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet, wie Sondertilgungen und erhöhte Tilgungsraten die Restlaufzeit einer Baufinanzierung drastisch verkürzen und tausende Euro an Zinskosten einsparen.`,
    howToUse: [
      'Geben Sie die aktuelle Darlehenssumme, den Sollzins und die Regellaufzeit ein.',
      'Tragen Sie den Betrag für regelmäßige oder einmalige Sondertilgungen ein.',
      'Lesen Sie die verkürzte Gesamtlaufzeit und die gesamte Zinsersparnis in Euro ab.'
    ],
    formula: 'Sondertilgungen reduzieren die Restschuld unmittelbar und verringern den Zinsanteil künftiger Annuitäten, was zu einer vorzeitigen Volltilgung führt',
    formulaVariables: [
      { name: 'Restschuld', description: 'Aktuelles Darlehen.', unit: 'Währung', optional: false },
      { name: 'Sollzins', description: 'Zinssatz p.a.', unit: '%', optional: false },
      { name: 'Sondertilgung', description: 'Zusätzlicher Tilgungsbetrag.', unit: 'Währung', optional: false }
    ],
    workedExample: {
      scenario: '300.000 € Darlehen mit 30 Jahren Laufzeit bei 6,0 % Zins und 200 € monatlicher Sondertilgung.',
      stepByStep: [
        'Ursprüngliche Zinslast: 347.515 €.',
        'Neue monatliche Rate: 1.798,65 € + 200 € = 1.998,65 €/Monat.',
        'Neue Gesamtlaufzeit: 23,8 Jahre (6,2 Jahre vorzeitige Schuldenfreiheit).',
        'Zinsersparnis: 82.627 €.'
      ],
      result: '6,2 Jahre früher schuldenfrei | Gesamte Zinsersparnis: 82.627 €'
    },
    interpretation: 'Macht den immensen Hebel von regelmäßigen Sondertilgungen für private Eigenheimbesitzer transparent.',
    assumptions: 'Vertraglich vereinbarte kostenfreie Sondertilgungsoption.',
    limitations: 'Opportunitätskosten alternativer Kapitalmarktinvestments sollten gegengerechnet werden.',
    faqs: [
      { question: 'Was ist das Recht auf Sondertilgung?', answer: 'Die vertragliche Möglichkeit, neben der regulären Monatsrate einmal jährlich bis zu einem vereinbarten Prozentsatz (z. B. 5%) gebührenfrei extra zu tilgen.' }
    ],
    relatedTools
  })
});

// 10. DEBT SNOWBALL VS AVALANCHE CALCULATOR (debt-snowball)
export const DEBT_SNOWBALL_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} compares the Debt Snowball method (paying off smallest balances first for psychological momentum) against the Debt Avalanche method (targeting highest interest rates first for mathematical savings) to design optimal debt-free plans.`,
    howToUse: [
      'Enter each debt balance, minimum monthly payment, and interest rate % (credit cards, personal loans, car loans).',
      'Enter your monthly extra debt payoff budget.',
      'Compare side-by-side payoff timelines, total interest paid, and debt-free target dates between Snowball and Avalanche.'
    ],
    formula: 'Snowball: Order debts ascending by Balance; roll payments forward as debts clear | Avalanche: Order debts descending by APR %; roll payments forward as debts clear',
    formulaVariables: [
      { name: 'Debt Balances', description: 'Principal of each loan.', unit: 'Currency', optional: false },
      { name: 'Interest Rates', description: 'Annual percentage rate (APR).', unit: 'Percentage %', optional: false },
      { name: 'Extra Budget', description: 'Monthly funds above minimums.', unit: 'Currency/Month', optional: false }
    ],
    workedExample: {
      scenario: 'Comparing Debt Snowball vs Avalanche on 3 debts: Card A ($2,000 at 22%), Loan B ($5,000 at 12%), Card C ($8,000 at 18%) with $300 extra monthly budget.',
      stepByStep: [
        'Snowball priority: Card A ($2k) → Loan B ($5k) → Card C ($8k). Rapid early psychological wins.',
        'Avalanche priority: Card A (22% APR) → Card C (18% APR) → Loan B (12% APR).',
        'Avalanche saves more interest ($450+ saved) and finishes ~1 month sooner.',
        'Snowball delivers first fully paid debt in 5 months, boosting motivation.'
      ],
      result: 'Avalanche: Saves maximum interest | Snowball: Fastest psychological wins (First debt cleared in 5 months)'
    },
    interpretation: 'Helps individuals choose between mathematical optimization (Avalanche) and behavioral motivation (Snowball) to achieve complete debt freedom.',
    assumptions: 'Consistent monthly payment discipline without adding new debt charges.',
    limitations: 'Variable interest rates or teaser introductory rates require updating APR assumptions.',
    faqs: [
      { question: 'Which is better: Debt Snowball or Debt Avalanche?', answer: 'Mathematically, the Debt Avalanche always saves the most money in interest. However, studies show the Debt Snowball has higher real-world completion rates due to psychological momentum from early wins.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بمقارنة استراتيجية كرة الثلج (سداد أصغر الديون أولاً للتحفيز النفسي) مقابل استراتيجية الانهيار الجليدي (استهداف الديون ذات الفائدة الأعلى أولاً لتوفير المال) للتخلص من الديون.`,
    howToUse: [
      'أدخل بيانات كل دين: الرصيد المتبقي، والحد الأدنى للقسط الشهري، ومعدل الفائدة (بطاقات ائتمان، قروض شخصية).',
      'حدد الميزانية الشهرية الإضافية المخصصة لتسريع السداد.',
      'قارن بين الجدولين جنباً إلى جنب من حيث تاريخ التحرر من الديون وإجمالي الفوائد المدفوعة.'
    ],
    formula: 'كرة الثلج: ترتيب الديون تصاعدياً حسب حجم الرصيد | الانهيار الجليدي: ترتيب الديون تنازلياً حسب أعلى نسبة فائدة',
    formulaVariables: [
      { name: 'أرصدة الديون', description: 'المبالغ المتبقية لكل دين.', unit: 'عملة', optional: false },
      { name: 'أسعار الفائدة', description: 'معدل الفائدة السنوي.', unit: '%', optional: false },
      { name: 'الميزانية الإضافية', description: 'المبلغ المخصص فوق الحد الأدنى.', unit: 'عملة', optional: false }
    ],
    workedExample: {
      scenario: 'مقارنة كرة الثلج والانهيار الجليدي لـ 3 ديون: بطاقة أ (2000$ بفائدة 22%)، قرض ب (5000$ بفائدة 12%)، بطاقة ج (8000$ بفائدة 18%).',
      stepByStep: [
        'أولوية كرة الثلج: بطاقة أ (2000$) ثم قرض ب (5000$) ثم بطاقة ج (8000$). انتصار معنوي سريع.',
        'أولوية الانهيار الجليدي: بطاقة أ (22%) ثم بطاقة ج (18%) ثم قرض ب (12%). توفير مالي أكبر.',
        'الانهيار الجليدي يوفر أكثر من 450$ من إجمالي الفوائد.',
        'كرة الثلج تحقق التخلص من أول دين خلال 5 أشهر فقط.'
      ],
      result: 'الانهيار الجليدي: توفير مالي أقصى | كرة الثلج: تحفيز نفسي وسرعة التخلص من أول دين'
    },
    interpretation: 'ترشد الأفراد لاختيار الاستراتيجية الأنسب لشخصيتهم المالية بين المنطق الحسابي والتحفيز السلوكي للخروج من الديون.',
    assumptions: 'الالتزام بدفع الأقساط الشهرية بانتظام والتوقف عن استخدام البطاقات الائتمانية.',
    limitations: 'تغير أسعار الفائدة المتغيرة يتطلب تحديث نسب الفائدة في الحاسبة.',
    faqs: [
      { question: 'أيهما أفضل: طريقة كرة الثلج أم الانهيار الجليدي؟', answer: 'رياضياً، طريقة الانهيار الجليدي توفر أكبر قدر من الفوائد، بينما سلوكياً تُظهر الدراسات أن كرة الثلج ترفع نسبة الالتزام بفضل الإنجازات السريعة في البداية.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} compara el método de Bola de Nieve (pagar primero las deudas más pequeñas para motivación psicológica) frente a la Avalancha de Deudas (liquidar primero las de mayor interés para ahorro matemático).`,
    howToUse: [
      'Introduzca los datos de cada deuda: saldo pendiente, cuota mínima mensual y tipo de interés (tarjetas, créditos).',
      'Indique el importe mensual extra destinado a amortizar deuda.',
      'Compare los calendarios de liquidación, intereses totales y la fecha de libertad financiera.'
    ],
    formula: 'Bola de Nieve: Ordenar deudas de menor a mayor saldo | Avalancha: Ordenar deudas de mayor a menor tipo de interés (TAE)',
    formulaVariables: [
      { name: 'Saldos de Deuda', description: 'Capital pendiente de cada deuda.', unit: 'Moneda', optional: false },
      { name: 'Tipo de interés', description: 'TAE de cada préstamo.', unit: '%', optional: false },
      { name: 'Presupuesto extra', description: 'Aportación adicional mensual.', unit: 'Moneda', optional: false }
    ],
    workedExample: {
      scenario: 'Comparar 3 deudas: Tarjeta A (2.000 € al 22%), Crédito B (5.000 € al 12%), Tarjeta C (8.000 € al 18%) con 300 € extra al mes.',
      stepByStep: [
        'Orden Bola de Nieve: Tarjeta A (2.000 €) → Crédito B (5.000 €) → Tarjeta C (8.000 €).',
        'Orden Avalancha: Tarjeta A (22%) → Tarjeta C (18%) → Crédito B (12%).',
        'Avalancha ahorra más de 450 € en intereses totales.',
        'Bola de Nieve cancela la primera deuda en solo 5 meses aumentando la motivación.'
      ],
      result: 'Avalancha: Mayor ahorro en intereses | Bola de Nieve: Mayor motivación psicológica'
    },
    interpretation: 'Permite elegir el plan de desendeudamiento que mejor se adapte a su perfil financiero y disciplina de ahorro.',
    assumptions: 'Pago ininterrumpido de las cuotas mínimas y no contraer nuevas deudas.',
    limitations: 'Los tipos de interés variables requieren reajustes periódicos.',
    faqs: [
      { question: '¿Por qué el método de Bola de Nieve es tan popular?', answer: 'Porque liquidar deudas pequeñas rápidamente aporta victorias psicológicas tempranas que motivan a mantener el plan de pagos.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} compare la méthode Boule de Neige (rembourser les plus petits soldes en premier pour booster la motivation) et l'Avalanche de Dettes (rembourser les taux d'intérêt les plus élevés d'abord).`,
    howToUse: [
      'Saisissez chaque dette : capital restant, mensualité minimale et taux d\'intérêt annuel.',
      'Indiquez votre capacité d\'épargne mensuelle supplémentaire dédiée au désendettement.',
      'Comparez la durée totale de remboursement et les intérêts payés entre les deux stratégies.'
    ],
    formula: 'Boule de Neige : Tri des dettes par solde croissant | Avalanche : Tri des dettes par taux d\'intérêt (TAEG) décroissant',
    formulaVariables: [
      { name: 'Soldes', description: 'Montant de chaque emprunt.', unit: 'Devise', optional: false },
      { name: 'Taux TAEG', description: 'Taux annuel de la dette.', unit: '%', optional: false },
      { name: 'Budget extra', description: 'Capacité de remboursement mensuelle.', unit: 'Devise', optional: false }
    ],
    workedExample: {
      scenario: 'Comparaison sur 3 dettes : Carte A (2 000 € à 22 %), Prêt B (5 000 € à 12 %), Carte C (8 000 € à 18 %) avec 300 €/mois supplémentaires.',
      stepByStep: [
        'Ordre Boule de Neige : Carte A (2 000 €) puis Prêt B (5 000 €) puis Carte C (8 000 €).',
        'Ordre Avalanche : Carte A (22 %) puis Carte C (18 %) puis Prêt B (12 %).',
        'L\'Avalanche permet d\'économiser plus de 450 € d\'intérêts.',
        'La Boule de Neige efface la première dette en seulement 5 mois.'
      ],
      result: 'Avalanche : Économie maximale d\'intérêts | Boule de Neige : Victoires psychologiques rapides'
    },
    interpretation: 'Aide à concevoir un plan d\'assainissement financier personnalisé pour retrouver la liberté financière.',
    assumptions: 'Discipline stricte sans recours à de nouveaux crédits à la consommation.',
    limitations: 'Les crédits renouvelables à taux variables nécessitent d\'actualiser les taux périodiquement.',
    faqs: [
      { question: 'Quelle méthode de désendettement choisir ?', answer: 'Si vous privilégiez l\'économie financière stricte, choisissez l\'Avalanche. Si vous avez besoin d\'encouragements rapides pour tenir sur la durée, choisissez la Boule de Neige.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} vergleicht die Schneeball-Methode (kleinste Kredite zuerst tilgen für psychologische Erfolgserlebnisse) mit der Lawinen-Methode (höchste Zinssätze zuerst tilgen für maximale Ersparnis).`,
    howToUse: [
      'Tragen Sie für jede Schuld den Restbetrag, die monatliche Mindestrate und den Zinssatz ein (Dispo, Kreditkarten, Ratenkredite).',
      'Geben Sie Ihr monatliches Extra-Budget für die Tilgung ein.',
      'Vergleichen Sie die Entschuldungsdauer und die gesamten Zinskosten beider Methoden nebeneinander.'
    ],
    formula: 'Schneeball: Sortierung nach Kredithöhe aufsteigend | Lawine: Sortierung nach Effektivzins absteigend',
    formulaVariables: [
      { name: 'Kreditbeträge', description: 'Restsumme je Schuld.', unit: 'Währung', optional: false },
      { name: 'Zinssätze', description: 'Effektiver Jahreszins.', unit: '%', optional: false },
      { name: 'Extra-Budget', description: 'Monatliche Sondertilgung.', unit: 'Währung', optional: false }
    ],
    workedExample: {
      scenario: 'Vergleich für 3 Kredite: Kreditkarte A (2.000 € zu 22%), Ratenkredit B (5.000 € zu 12%), Kreditkarte C (8.000 € zu 18%) mit 300 € monatlichem Zusatzbudget.',
      stepByStep: [
        'Schneeball-Reihenfolge: Karte A (2.000 €) → Kredit B (5.000 €) → Karte C (8.000 €).',
        'Lawinen-Reihenfolge: Karte A (22%) → Karte C (18%) → Kredit B (12%).',
        'Lawine spart über 450 € an Gesamtzinsen.',
        'Schneeball führt bereits nach 5 Monaten zur ersten vollständigen Schuldenbefreiung.'
      ],
      result: 'Lawinen-Methode: Größte Zinsersparnis | Schneeball-Methode: Schnelle psychologische Motivationserfolge'
    },
    interpretation: 'Hilft Privatpersonen bei der strukturierten und nachhaltigen Tilgung von Konsumschulden.',
    assumptions: 'Keine Aufnahme neuer Kredite während der Tilgungsphase.',
    limitations: 'Variable Zinssätze erfordern bei Zinsänderungen eine Neuberechnung.',
    faqs: [
      { question: 'Welche Entschuldungsmethode ist erfolgreicher?', answer: 'Mathematisch spart die Lawinen-Methode am meisten Zinsen. Studien zeigen jedoch, dass die Schneeball-Methode wegen früher Erfolgserlebnisse seltener abgebrochen wird.' }
    ],
    relatedTools
  })
});

// Map of Batch 2 Finance tools
export const BATCH2_FINANCE_HANDLERS: Record<string, Record<Language, KnowledgeHandler>> = {
  'cagr-calculator': CAGR_KNOWLEDGE,
  'payback-period': PAYBACK_PERIOD_KNOWLEDGE,
  'loan-refinance': LOAN_REFINANCE_KNOWLEDGE,
  'vat-reverse': VAT_REVERSE_KNOWLEDGE,
  'salary-hourly': SALARY_HOURLY_KNOWLEDGE,
  'commission-calc': COMMISSION_CALC_KNOWLEDGE,
  'appreciation-calc': APPRECIATION_CALC_KNOWLEDGE,
  'depreciation-straight': DEPRECIATION_STRAIGHT_KNOWLEDGE,
  'mortgage-payoff': MORTGAGE_PAYOFF_KNOWLEDGE,
  'debt-snowball': DEBT_SNOWBALL_KNOWLEDGE,
};
