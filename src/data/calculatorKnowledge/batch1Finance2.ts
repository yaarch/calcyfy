import { ToolDef, Language } from '../../types';
import { ToolContentDetails } from './types';

type KnowledgeHandler = (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails;

function createKnowledge(dataByLang: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails>): Record<Language, KnowledgeHandler> {
  return dataByLang;
}

// 1. MARKUP & PROFIT MARGIN (markup)
export const MARKUP_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates gross profit, profit margin percentage on selling price, and markup percentage on cost price.`,
    howToUse: [
      'Enter the unit cost of the item or service.',
      'Enter the selling price charged to the customer.',
      'Review the monetary gross profit, profit margin percentage, and markup percentage.'
    ],
    formula: 'Profit = Selling - Cost | Profit Margin (%) = (Profit / Selling) × 100 | Markup (%) = (Profit / Cost) × 100',
    formulaVariables: [
      { name: 'Cost Price', description: 'Total cost incurred to acquire or produce the item.', unit: 'Currency ($)', optional: false },
      { name: 'Selling Price', description: 'Price at which the item is sold to the consumer.', unit: 'Currency ($)', optional: false }
    ],
    workedExample: {
      scenario: 'An item costing $50.00 is sold at a retail price of $80.00.',
      stepByStep: [
        'Gross Profit: $80.00 - $50.00 = $30.00.',
        'Profit Margin: ($30.00 / $80.00) × 100 = 37.50%.',
        'Markup Percentage: ($30.00 / $50.00) × 100 = 60.00%.'
      ],
      result: 'Gross Profit: $30.00 | Profit Margin: 37.50% | Markup: 60.00%'
    },
    interpretation: 'Profit margin measures what percentage of the selling price is profit, whereas markup indicates how much the cost was increased to arrive at the selling price.',
    assumptions: 'Assumes direct unit sales without deferred volume rebates or unallocated overhead.',
    limitations: 'Does not account for indirect fixed operating overhead (rent, utilities, salaries).',
    faqs: [
      { question: 'Why is markup always higher than profit margin?', answer: 'Because markup is divided by the smaller cost figure, while profit margin is divided by the larger retail selling price.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب إجمالي الربح النقدي، وهامش الربح كنسبة من سعر البيع، ونسبة التكلفة المضافة (Markup) كنسبة من سعر التكلفة.`,
    howToUse: [
      'أدخل سعر تكلفة السلعة أو الخدمة.',
      'أدخل سعر بيع السلعة للعميل.',
      'راجع إجمالي الربح النقدي، وهامش الربح، ونسبة التكلفة المضافة.'
    ],
    formula: 'الربح = البيع - التكلفة | هامش الربح = (الربح / البيع) × 100 | نسبة الإضافة = (الربح / التكلفة) × 100',
    formulaVariables: [
      { name: 'سعر التكلفة', description: 'المبلغ المدفوع لإنتاج أو شراء السلعة.', unit: 'عملة ($)', optional: false },
      { name: 'سعر البيع', description: 'السعر النهائي للبيع في السوق.', unit: 'عملة ($)', optional: false }
    ],
    workedExample: {
      scenario: 'سلعة تكلفتها 50.00 دولار وتُباع بسعر 80.00 دولار.',
      stepByStep: [
        'إجمالي الربح: 80.00 - 50.00 = 30.00 دولار.',
        'هامش الربح (Margin): (30.00 / 80.00) × 100 = 37.50%.',
        'نسبة الزيادة على التكلفة (Markup): (30.00 / 50.00) × 100 = 60.00%.'
      ],
      result: 'إجمالي الربح: $30.00 | هامش الربح: 37.50% | نسبة الإضافة: 60.00%'
    },
    interpretation: 'يوضح هامش الربح نسبة الأرباح من إجمالي الإيرادات، بينما توضح نسبة الإضافة نسبة الزيادة المطبقة فوق التكلفة.',
    assumptions: 'تفترض بيع وحدات فردية بأسعار ثابتة دون خصومات كمية.',
    limitations: 'لا تشمل التكاليف التشغيلية الثابتة للمنشأة كالإيجار والرواتب.',
    faqs: [
      { question: 'لماذا تكون نسبة الإضافة أعلى دائماً من هامش الربح؟', answer: 'لأن نسبة الإضافة تُنسب إلى التكلفة الأقل، بينما يُنسب هامش الربح إلى سعر البيع الأعلى.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el beneficio bruto monetario, el margen de beneficio sobre ventas y el porcentaje de recargo sobre el coste.`,
    howToUse: [
      'Introduzca el coste unitario del producto o servicio.',
      'Introduzca el precio de venta final al público.',
      'Revise el beneficio bruto en euros, el margen sobre ventas y el margen sobre coste.'
    ],
    formula: 'Beneficio = Venta - Coste | Margen (%) = (Beneficio / Venta) × 100 | Recargo (%) = (Beneficio / Coste) × 100',
    formulaVariables: [
      { name: 'Precio de coste', description: 'Coste total de adquisición o fabricación.', unit: 'Moneda ($ / €)', optional: false },
      { name: 'Precio de venta', description: 'Precio final facturado al cliente.', unit: 'Moneda ($ / €)', optional: false }
    ],
    workedExample: {
      scenario: 'Un producto con coste de 50,00 € se vende a 80,00 €.',
      stepByStep: [
        'Beneficio bruto: 80,00 € - 50,00 € = 30,00 €.',
        'Margen de beneficio: (30,00 / 80,00) × 100 = 37,50 %.',
        'Recargo (Markup): (30,00 / 50,00) × 100 = 60,00 %.'
      ],
      result: 'Beneficio: 30,00 € | Margen: 37,50 % | Recargo: 60,00 %'
    },
    interpretation: 'El margen indica qué porción del ingreso es ganancia, mientras que el recargo indica cuánto se incrementó el coste original.',
    assumptions: 'Venta unitaria directa sin descuentos por volumen diferidos.',
    limitations: 'No incluye costes fijos indirectos de estructura comercial.',
    faqs: [
      { question: '¿Cuál es la diferencia entre margen y markup?', answer: 'El margen se calcula respecto al precio de venta y el markup respecto al precio de coste.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule le bénéfice brut, le taux de marge commerciale sur le prix de vente et le taux de marque sur le prix d'achat.`,
    howToUse: [
      'Indiquez le coût d\'achat ou de revient du produit.',
      'Indiquez le prix de vente facturé au client.',
      'Consultez le gain brut, la marge commerciale et le taux de marque.'
    ],
    formula: 'Bénéfice = Vente - Coût | Marge (%) = (Bénéfice / Vente) × 100 | Taux de marque (%) = (Bénéfice / Coût) × 100',
    formulaVariables: [
      { name: 'Prix de revient', description: 'Coût d\'achat ou de fabrication hors taxes.', unit: 'Devise (€ / $)', optional: false },
      { name: 'Prix de vente', description: 'Prix de vente facturé au client hors taxes.', unit: 'Devise (€ / $)', optional: false }
    ],
    workedExample: {
      scenario: 'Un produit au coût de 50,00 € vendu au prix de 80,00 €.',
      stepByStep: [
        'Bénéfice brut : 80,00 € - 50,00 € = 30,00 €.',
        'Marge commerciale : (30,00 / 80,00) × 100 = 37,50 %.',
        'Taux de marque (Markup) : (30,00 / 50,00) × 100 = 60,00 %.'
      ],
      result: 'Bénéfice brut : 30,00 € | Marge : 37,50 % | Taux de marque : 60,00 %'
    },
    interpretation: 'Permet d\'établir des barèmes tarifaires cohérents en fonction des objectifs de rentabilité commerciale.',
    assumptions: 'Vente unitaire directe sans escompte ou remise de fin d\'année.',
    limitations: 'N\'intègre pas les charges de structure générales.',
    faqs: [
      { question: 'Comment fixer son coefficient multiplicateur ?', answer: 'Le coefficient multiplicateur est égal à 1 + (Taux de marque / 100), permettant de convertir directement le coût en prix de vente.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet den Bruttogewinn, die Handelsmarge bezogen auf den Verkaufspreis und den Aufschlagsatz bezogen auf die Selbstkosten.`,
    howToUse: [
      'Geben Sie die Einstandskosten des Artikels ein.',
      'Geben Sie den Netto-Verkaufspreis ein.',
      'Prüfen Sie den Bruttogewinn, die Gewinnmarge und den prozentualen Aufschlag.'
    ],
    formula: 'Gewinn = Verkauf - Kosten | Marge (%) = (Gewinn / Verkauf) × 100 | Aufschlag (%) = (Gewinn / Kosten) × 100',
    formulaVariables: [
      { name: 'Einstandspreis', description: 'Herstellungs- oder Beschaffungskosten.', unit: 'Währung (€ / $)', optional: false },
      { name: 'Verkaufspreis', description: 'Verkaufserlös an den Kunden.', unit: 'Währung (€ / $)', optional: false }
    ],
    workedExample: {
      scenario: 'Ein Artikel mit 50,00 € Selbstkosten wird für 80,00 € verkauft.',
      stepByStep: [
        'Bruttogewinn: 80,00 € - 50,00 € = 30,00 €.',
        'Handelsspanne / Marge: (30,00 / 80,00) × 100 = 37,50 %.',
        'Kalkulationsaufschlag: (30,00 / 50,00) × 100 = 60,00 %.'
      ],
      result: 'Rohgewinn: 30,00 € | Marge: 37,50 % | Aufschlag: 60,00 %'
    },
    interpretation: 'Die Marge zeigt den Gewinnanteil am Umsatz, während der Aufschlag den prozentualen Preiszuschlag auf den Einkaufswert angibt.',
    assumptions: 'Direkter Einzelverkauf ohne Skonti oder nachträgliche Rabatte.',
    limitations: 'Gemeinkosten für Verwaltung und Vertrieb sind nicht eingerechnet.',
    faqs: [
      { question: 'Warum ist der Aufschlag stets höher als die Marge?', answer: 'Weil der Aufschlag durch die kleineren Anschaffungskosten dividiert wird, die Marge hingegen durch den höheren Verkaufspreis.' }
    ],
    relatedTools
  })
});

// 2. NET WORTH (net-worth)
export const NET_WORTH_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates personal net worth by subtracting total liabilities and debts from total assets.`,
    howToUse: [
      'Enter the combined monetary value of all your assets (savings, investments, real estate, vehicles).',
      'Enter the total balance of all your debts (mortgages, personal loans, credit cards).',
      'Review your calculated net worth balance.'
    ],
    formula: 'Net Worth = Total Assets - Total Liabilities',
    formulaVariables: [
      { name: 'Total Assets', description: 'Sum total of cash, investments, property, and physical assets.', unit: 'Currency ($)', optional: false },
      { name: 'Total Liabilities', description: 'Outstanding balance of all loans and obligations.', unit: 'Currency ($)', optional: false }
    ],
    workedExample: {
      scenario: 'Evaluating a portfolio with $250,000 in total assets and $80,000 in debt obligations.',
      stepByStep: [
        'Total Assets: $250,000.00.',
        'Total Debts: $80,000.00.',
        'Calculate Net Worth: $250,000.00 - $80,000.00 = $170,000.00.'
      ],
      result: 'Calculated Net Worth: $170,000.00'
    },
    interpretation: 'A positive net worth indicates solvency and wealth accumulation, while a negative net worth signifies that debt obligations exceed current assets.',
    assumptions: 'Assumes realistic fair market valuation for illiquid physical assets.',
    limitations: 'Does not model future tax liabilities on unrealized capital gains or pension payouts.',
    faqs: [
      { question: 'How often should I calculate my net worth?', answer: 'Most financial advisors recommend tracking net worth quarterly or annually to gauge long-term trajectory.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب صافي الثروة المالية الشخصية عن طريق طرح إجمالي الالتزامات والديون من إجمالي الأصول والممتلكات.`,
    howToUse: [
      'أدخل القيمة الإجمالية لجميع أصولك (مدخرات، استثمارات، عقارات، سيارات).',
      'أدخل إجمالي الديون والالتزامات المستحقة عليك (قروض، بطاقات ائتمان، تمويل عقاري).',
      'راجع رصيد صافي الثروة المحسوب.'
    ],
    formula: 'صافي الثروة = إجمالي الأصول - إجمالي الالتزامات',
    formulaVariables: [
      { name: 'إجمالي الأصول', description: 'مجموع السيولة النقدية والمحفظة الاستثمارية والعقارات.', unit: 'عملة ($)', optional: false },
      { name: 'إجمالي الالتزامات', description: 'إجمالي أرصدة الديون والقروض المستحقة.', unit: 'عملة ($)', optional: false }
    ],
    workedExample: {
      scenario: 'تقييم محفظة بقيمة أصول 250,000 دولار وإجمالي ديون 80,000 دولار.',
      stepByStep: [
        'إجمالي الأصول: 250,000 دولار.',
        'إجمالي الالتزامات: 80,000 دولار.',
        'حساب صافي الثروة: 250,000 - 80,000 = 170,000 دولار.'
      ],
      result: 'صافي الثروة: $170,000.00'
    },
    interpretation: 'يعكس صافي الثروة الإيجابي الاستقرار المالي والقدرة على مواجهة الأزمات، بينما يتطلب الصافي السلبي خطة لتقليص الديون.',
    assumptions: 'تفترض دقة تقدير القيمة السوقية العادلة للأصول غير السائلة.',
    limitations: 'لا تخصم الضرائب المستقبلية المؤجلة على أرباح رأس المال غير المحققة.',
    faqs: [
      { question: 'كم مرة يجب علي مراجعة صافي ثروتي؟', answer: 'يُنصح بحساب صافي الثروة ربع سنوياً أو سنوياً لقياس التقدم المالي طويل الأجل.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} determina el patrimonio neto personal deduciendo el total de deudas y obligaciones financieras del total de activos.`,
    howToUse: [
      'Introduzca el valor total de sus activos (cuentas, inmuebles, inversiones).',
      'Introduzca el pasivo o deudas totales pendientes.',
      'Revise el resultado de su patrimonio neto personal.'
    ],
    formula: 'Patrimonio Neto = Activos Totales - Pasivos Totales',
    formulaVariables: [
      { name: 'Activos totales', description: 'Valor de mercado de bienes y ahorros.', unit: 'Moneda ($ / €)', optional: false },
      { name: 'Pasivos totales', description: 'Saldo pendiente de préstamos e hipotecas.', unit: 'Moneda ($ / €)', optional: false }
    ],
    workedExample: {
      scenario: 'Balance con 250.000 € en activos y 80.000 € en deudas.',
      stepByStep: [
        'Activos: 250.000 €.',
        'Pasivos: 80.000 €.',
        'Patrimonio Neto: 250.000 € - 80.000 € = 170.000 €.'
      ],
      result: 'Patrimonio neto: 170.000,00 €'
    },
    interpretation: 'Mide la solvencia financiera global y el progreso en la acumulación de riqueza a lo largo del tiempo.',
    assumptions: 'Valoración a precios de mercado actuales de los activos no líquidos.',
    limitations: 'No incluye costes fiscales futuros de rescate de fondos de pensiones.',
    faqs: [
      { question: '¿Qué hacer si el patrimonio neto es negativo?', answer: 'Se debe priorizar el pago de deudas con altos tipos de interés y crear un presupuesto de control de gastos.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} évalue la valeur nette patrimoniale en soustrayant le passif exigible de l'actif brut total.`,
    howToUse: [
      'Indiquez la valorisation de l\'ensemble de vos actifs (épargne, immobilier, titres).',
      'Indiquez le montant cumulé de vos dettes et emprunts.',
      'Découvrez votre valeur patrimoniale nette.'
    ],
    formula: 'Valeur Nette = Total des Actifs - Total des Dettes',
    formulaVariables: [
      { name: 'Actifs totaux', description: 'Somme de la valeur des biens, comptes et placements.', unit: 'Devise (€ / $)', optional: false },
      { name: 'Dettes totales', description: 'Encours restant dû des crédits et dettes.', unit: 'Devise (€ / $)', optional: false }
    ],
    workedExample: {
      scenario: 'Bilan d\'un patrimoine composé de 250 000 € d\'actifs et 80 000 € de dettes.',
      stepByStep: [
        'Actifs bruts : 250 000 €.',
        'Passif : 80 000 €.',
        'Valeur nette : 250 000 € - 80 000 € = 170 000 €.'
      ],
      result: 'Patrimoine net calculé : 170 000,00 €'
    },
    interpretation: 'Permet de mesurer l\'enrichissement réel au-delà des apparences de train de vie.',
    assumptions: 'Estimation prudente de la valeur vénale des actifs physiques.',
    limitations: 'Ne prend pas en compte la fiscalité latente en cas de cession d\'actifs.',
    faqs: [
      { question: 'Pourquoi la valeur nette est-elle essentielle ?', answer: 'C\'est l\'indicateur de référence pour évaluer la solidité financière et la préparation de la retraite.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} ermittelt das persönliche Reinvermögen durch Gegenüberstellung von Gesamtvermögen und Verbindlichkeiten.`,
    howToUse: [
      'Geben Sie den Gesamtwert aller Vermögenswerte ein.',
      'Geben Sie die Summe aller offenen Kredite und Schulden ein.',
      'Lesen Sie Ihr persönliches Nettovermögen ab.'
    ],
    formula: 'Nettovermögen = Gesamtvermögen - Verbindlichkeiten',
    formulaVariables: [
      { name: 'Gesamtvermögen', description: 'Wert aller Sach- und Finanzanlagen.', unit: 'Währung (€ / $)', optional: false },
      { name: 'Verbindlichkeiten', description: 'Restschuld aller Kredite und Verpflichtungen.', unit: 'Währung (€ / $)', optional: false }
    ],
    workedExample: {
      scenario: 'Vermögensbilanz mit 250.000 € Aktiva und 80.000 € Verbindlichkeiten.',
      stepByStep: [
        'Aktiva: 250.000 €.',
        'Passiva: 80.000 €.',
        'Nettovermögen: 250.000 € - 80.000 € = 170.000 €.'
      ],
      result: 'Nettovermögen: 170.000,00 €'
    },
    interpretation: 'Ein positives Nettovermögen belegt Eigenkapitalbildung und finanzielle Widerstandskraft.',
    assumptions: 'Angemessene Marktbewertung von Immobilien und Sachwerten.',
    limitations: 'Zukünftige Abgeltungs- oder Veräußerungssteuern sind nicht subtrahiert.',
    faqs: [
      { question: 'Wie verbessere ich mein Nettovermögen kontinuierlich?', answer: 'Durch Tilgung hochverzinslicher Kredite und kontinuierlichen Vermögensaufbau mit disziplinierten Sparraten.' }
    ],
    relatedTools
  })
});

// 3. DEBT PAYOFF TIMELINE (debt-payoff)
export const DEBT_PAYOFF_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} simulates loan amortization month by month to project the exact number of months and years required to become completely debt-free.`,
    howToUse: [
      'Enter the outstanding total debt balance.',
      'Enter the annual interest rate APR percentage.',
      'Enter your fixed monthly payment amount.',
      'Verify that your monthly payment exceeds the monthly interest accrued to view the payoff duration.'
    ],
    formula: 'Monthly Interest = Balance × (APR / 1200) | New Balance = Balance + Monthly Interest - Payment (Iterated until Balance ≤ 0)',
    formulaVariables: [
      { name: 'Total Balance', description: 'Current outstanding debt principal.', unit: 'Currency ($)', optional: false },
      { name: 'Interest Rate APR', description: 'Nominal annual percentage rate.', unit: 'Percentage (%)', optional: false },
      { name: 'Monthly Payment', description: 'Fixed amount paid toward the debt every month.', unit: 'Currency ($ / month)', optional: false }
    ],
    workedExample: {
      scenario: 'A $15,000 credit card balance at 18% APR with a fixed monthly payment of $400.',
      stepByStep: [
        'Monthly interest rate: 18% / 12 = 1.5% per month.',
        'Initial monthly interest: $15,000 × 0.015 = $225.00 (less than $400 payment).',
        'Amortize month by month with $400 contributions.',
        'Full repayment is achieved at month 56 (4.7 years).'
      ],
      result: 'Estimated Debt Payoff Timeline: 56 Months (4.7 Yrs)'
    },
    interpretation: 'Demonstrates the power of aggressive repayment; payments above the monthly interest threshold accelerate principal reduction exponentially.',
    assumptions: 'Assumes a fixed payment amount, no new charges added to the debt, and a constant APR.',
    limitations: 'If the monthly payment is lower than monthly accrued interest, the balance will grow infinitely.',
    faqs: [
      { question: 'What happens if I increase my monthly payment by $50?', answer: 'Even small payment increases directly reduce principal, eliminating months of compounding interest.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بمحاكاة سداد الديون شهراً بشهر لتحديد الجدول الزمني الدقيق بالشهور والسنوات للتخلص الكامل من المديونية.`,
    howToUse: [
      'أدخل رصيد الدين القائم حالياً.',
      'أدخل معدل الفائدة السنوي (APR) كنسبة مئوية.',
      'أدخل الدفعة الشهرية الثابتة المخصصة للسداد.',
      'تأكد من أن الدفعة الشهرية تتجاوز الفائدة المستحقة شهرياً لعرض المدة.'
    ],
    formula: 'الفائدة الشهرية = الرصيد × (النسبة / 1200) | الرصيد الجديد = الرصيد + الفائدة - الدفعة (تكرار شهري حتى تصفير الدين)',
    formulaVariables: [
      { name: 'رصيد الدين', description: 'أصل الدين المتبقي للسداد.', unit: 'عملة ($)', optional: false },
      { name: 'معدل الفائدة APR', description: 'النسبة المئوية السنوية للفائدة.', unit: 'نسبة مئوية (%)', optional: false },
      { name: 'الدفعة الشهرية', description: 'المبلغ المسدد كل شهر.', unit: 'عملة ($ / شهر)', optional: false }
    ],
    workedExample: {
      scenario: 'دين بقيمة 15,000 دولار بفائدة 18% سنوياً وقسط شهري 400 دولار.',
      stepByStep: [
        'الفائدة الشهرية: 18% ÷ 12 = 1.5% شهرياً.',
        'فائدة الشهر الأول: 15,000 × 0.015 = 225.00 دولار (أقل من القسط 400$).',
        'محاكاة السداد التنازلي للرصيد شهرياً.',
        'يتم سداد كامل الدين خلال 56 شهراً (4.7 سنوات).'
      ],
      result: 'المدة المقدرة لسداد الدين: 56 شهراً (4.7 سنوات)'
    },
    interpretation: 'توضح الأداة أهمية زيادة القسط فوق الفائدة الشهرية لتسريع التخلص من أصل الدين.',
    assumptions: 'تفترض ثبات معدل الفائدة وعدم إضافة ديون جديدة للبطاقة.',
    limitations: 'إذا كان القسط الشهري أقل من الفائدة الشهرية فلن ينتهي الدين أبداً.',
    faqs: [
      { question: 'ما الفرق بين طريقتي كرة الثلج والانهيار الجليدي؟', answer: 'طريقة كرة الثلج تبدأ بأصغر رصيد ديون لرفع المعنويات، بينما تركز طريقة الانهيار الجليدي على أعلى فائدة لتوفير المال.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} simula la amortización progresiva para proyectar el número exacto de meses y años necesarios para liquidar una deuda por completo.`,
    howToUse: [
      'Introduzca el saldo total pendiente de la deuda.',
      'Introduzca la tasa de interés nominal anual (TAE / APR).',
      'Introduzca el importe de pago mensual constante.',
      'Compruebe el plazo estimado de amortización total.'
    ],
    formula: 'Interés mensual = Saldo × (Tasa / 1200) | Saldo amortizado = Saldo + Interés - Pago',
    formulaVariables: [
      { name: 'Saldo total', description: 'Importe adeudado actual.', unit: 'Moneda ($ / €)', optional: false },
      { name: 'Tasa APR (%)', description: 'Porcentaje de interés anual.', unit: 'Porcentaje (%)', optional: false },
      { name: 'Pago mensual', description: 'Cuota destinada a la deuda cada mes.', unit: 'Moneda ($ / mes)', optional: false }
    ],
    workedExample: {
      scenario: 'Deuda de 15.000 € al 18 % TAE con un pago mensual de 400 €.',
      stepByStep: [
        'Interés mensual inicial: 15.000 € × 1,5 % = 225,00 €.',
        'Amortización neta inicial: 400 € - 225 € = 175,00 € al principal.',
        'Simulación iterativa mes a mes.',
        'Cancelación total alcanzada en el mes 56 (4,7 años).'
      ],
      result: 'Plazo estimado de liquidación: 56 meses (4,7 años)'
    },
    interpretation: 'Permite visualizar cómo cada euro adicional por encima de los intereses reduce drásticamente el tiempo de endeudamiento.',
    assumptions: 'Cuotas periódicas continuas sin gastos de comisión adicionales ni nuevos cargos.',
    limitations: 'La cuota mensual debe superar el interés generado para que la deuda se amortice.',
    faqs: [
      { question: '¿Por qué pagar más del mínimo mensual?', answer: 'El pago mínimo de las tarjetas se destina casi en su totalidad a intereses, prolongando la deuda durante décadas.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule le tableau d'amortissement prévisionnel pour déterminer le nombre de mois nécessaires au remboursement intégral d'une dette.`,
    howToUse: [
      'Saisissez le capital restant dû.',
      'Saisissez le taux d\'intérêt annuel effectif global (TAEG).',
      'Indiquez votre mensualité de remboursement.',
      'Visualisez le délai nécessaire pour solder la créance.'
    ],
    formula: 'Intérêts mensuels = Capital × (Taux / 1200) | Capital amorti = Capital + Intérêts - Mensualité',
    formulaVariables: [
      { name: 'Capital restant', description: 'Solde actuel de la dette.', unit: 'Devise (€ / $)', optional: false },
      { name: 'Taux TAEG', description: 'Taux annuel effectif global.', unit: 'Pourcentage (%)', optional: false },
      { name: 'Mensualité', description: 'Montant versé chaque mois.', unit: 'Devise (€ / mois)', optional: false }
    ],
    workedExample: {
      scenario: 'Dette de 15 000 € à 18 % avec une mensualité fixe de 400 €.',
      stepByStep: [
        'Intérêt du premier mois : 15 000 € × 1,5 % = 225,00 €.',
        'Amortissement du capital : 400 € - 225 € = 175,00 €.',
        'Calcul itératif sur chaque mensualité.',
        'Remboursement total obtenu en 56 mois (4,7 ans).'
      ],
      result: 'Délai d\'apurement estimé : 56 mois (4,7 ans)'
    },
    interpretation: 'Illustre l\'intérêt majeur d\'augmenter sa mensualité pour éteindre plus vite le capital productif d\'intérêts.',
    assumptions: 'Taux fixe et absence de nouveaux déblocages de fonds.',
    limitations: 'La mensualité doit être supérieure aux intérêts mensuels échus.',
    faqs: [
      { question: 'Comment réduire le coût total d\'un crédit ?', answer: 'Effectuer des remboursements anticipés permet de diminuer directement le capital restant dû et les intérêts futurs.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die genaue Schuldentilgungsdauer in Monaten und Jahren bei fester monatlicher Tilgungsrate.`,
    howToUse: [
      'Geben Sie den offenen Schuldenstand ein.',
      'Geben Sie den effektiven Jahreszins in Prozent ein.',
      'Geben Sie Ihre feste monatliche Rückzahlungsrate ein.',
      'Lesen Sie die voraussichtliche Tilgungsdauer ab.'
    ],
    formula: 'Monatszins = Restschuld × (Zins / 1200) | Neue Restschuld = Restschuld + Zins - Rate',
    formulaVariables: [
      { name: 'Restschuld', description: 'Aktuell offener Kreditbetrag.', unit: 'Währung (€ / $)', optional: false },
      { name: 'Zinssatz (APR)', description: 'Nominaler Jahreszinssatz.', unit: 'Prozent (%)', optional: false },
      { name: 'Monatsrate', description: 'Monatlich geleisteter Tilgungsbetrag.', unit: 'Währung (€ / Monat)', optional: false }
    ],
    workedExample: {
      scenario: 'Schulden von 15.000 € zu 18 % Zinsen bei einer Monatsrate von 400 €.',
      stepByStep: [
        'Monatlicher Zinssatz: 18 % / 12 = 1,5 %.',
        'Zinsanteil im 1. Monat: 15.000 € × 1,5 % = 225,00 €.',
        'Monatliche Simulation bis zum vollständigen Schuldenabbau.',
        'Schuldenfreiheit erreicht nach 56 Monaten (4,7 Jahren).'
      ],
      result: 'Geschätzte Entschuldungsdauer: 56 Monate (4,7 Jahre)'
    },
    interpretation: 'Veranschaulicht, wie Tilgungsanteile oberhalb des reinen Zinsdienstes die Laufzeit drastisch verkürzen.',
    assumptions: 'Konstante Rate ohne Neuverschuldung oder Zinssatzänderungen.',
    limitations: 'Die Monatsrate muss höher sein als der monatliche Zinsaufwand.',
    faqs: [
      { question: 'Was ist die Schneeballmethode?', answer: 'Man tilgt zuerst den kleinsten Schuldenbetrag voll ab, um schnelle motivationale Erfolge zu erzielen.' }
    ],
    relatedTools
  })
});

// 4. BREAK-EVEN (break-even)
export const BREAK_EVEN_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates unit contribution margin and the minimum sales volume required to cover fixed operating costs without making a profit or loss.`,
    howToUse: [
      'Enter total fixed costs (rent, salaries, insurance).',
      'Enter the selling price per unit.',
      'Enter the variable cost per unit.',
      'Review the contribution margin per unit and total units required to break even.'
    ],
    formula: 'Unit Margin = Price - Cost | Break-Even Units = ⌈Fixed Costs / Unit Margin⌉',
    formulaVariables: [
      { name: 'Fixed Costs', description: 'Total baseline operating expenses independent of sales volume.', unit: 'Currency ($)', optional: false },
      { name: 'Unit Price', description: 'Revenue received per unit sold.', unit: 'Currency ($ / unit)', optional: false },
      { name: 'Unit Variable Cost', description: 'Direct materials and labor cost per unit.', unit: 'Currency ($ / unit)', optional: false }
    ],
    workedExample: {
      scenario: 'A business with $20,000 in monthly fixed overhead selling widgets at $50 each with $20 variable costs.',
      stepByStep: [
        'Calculate unit contribution margin: $50.00 - $20.00 = $30.00 per unit.',
        'Calculate break-even units: $20,000 / $30.00 = 666.67 units.',
        'Round up to whole units: 667 units.'
      ],
      result: 'Unit Contribution Margin: $30.00 | Break-Even Volume: 667 Units'
    },
    interpretation: 'Selling 667 units generates $20,010 in contribution margin, fully covering the $20,000 fixed overhead. Every unit sold beyond 667 produces pure operating profit.',
    assumptions: 'Assumes constant variable costs per unit and constant sales prices regardless of volume.',
    limitations: 'Does not account for non-linear volume discounts or capacity constraints.',
    faqs: [
      { question: 'What is contribution margin?', answer: 'It is the dollar amount each unit sale contributes toward paying off fixed costs and generating net profit.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب هامش المساهمة للوحدة والحد الأدنى من حجم المبيعات المطلوب لتغطية التكاليف الثابتة بالكامل دون تحقيق ربح أو خسارة (نقطة التعادل).`,
    howToUse: [
      'أدخل إجمالي التكاليف الثابتة (الإيجار، الرواتب، التأمين).',
      'أدخل سعر بيع الوحدة الواحدة.',
      'أدخل التكلفة المتغيرة لإنتاج الوحدة.',
      'راجع هامش المساهمة للوحدة وعدد الوحدات المطلوب بيعها للوصول لنقطة التعادل.'
    ],
    formula: 'هامش مساهمة الوحدة = سعر البيع - التكلفة المتغيرة | وحدات التعادل = ⌈التكاليف الثابتة / هامش المساهمة⌉',
    formulaVariables: [
      { name: 'التكاليف الثابتة', description: 'المصاريف التشغيلية الثابتة غير المرتبطة بحجم المبيعات.', unit: 'عملة ($)', optional: false },
      { name: 'سعر الوحدة', description: 'سعر بيع السلعة في السوق.', unit: 'عملة ($ / وحدة)', optional: false },
      { name: 'التكلفة المتغيرة', description: 'تكلفة المواد المباشرة والإنتاج للوحدة.', unit: 'عملة ($ / وحدة)', optional: false }
    ],
    workedExample: {
      scenario: 'مشروع بتكاليف ثابتة 20,000 دولار، يبيع منتجاً بسعر 50 دولاراً بتكلفة متغيرة 20 دولاراً.',
      stepByStep: [
        'هامش المساهمة للوحدة: 50.00 - 20.00 = 30.00 دولار.',
        'حساب وحدات التعادل: 20,000 ÷ 30.00 = 666.67 وحدة.',
        'تقريب لأقرب وحدة كاملة: 667 وحدة.'
      ],
      result: 'هامش مساهمة الوحدة: $30.00 | حجم مبيعات التعادل: 667 وحدة'
    },
    interpretation: 'بيع 667 وحدة يغطي بالضبط تكاليف المشروع الثابتة، وأي وحدة إضافية تباع بعدها تمثل ربحاً صافياً للمشروع.',
    assumptions: 'تفترض ثبات أسعار البيع والتكاليف المتغيرة مع زيادة الإنتاج.',
    limitations: 'لا تراعي وفورات الحجم أو التغيرات في الطلب الموسمي.',
    faqs: [
      { question: 'ما هو هامش المساهمة؟', answer: 'هو المبلغ المالي الذي تسهم به كل وحدة مباعة لتغطية التكاليف الثابتة وتحقيق أرباح.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el margen de contribución por unidad y el volumen mínimo de ventas necesario para alcanzar el umbral de rentabilidad o punto de equilibrio.`,
    howToUse: [
      'Introduzca los costes fijos totales de explotación.',
      'Introduzca el precio de venta unitario.',
      'Introduzca el coste variable unitario.',
      'Revise el margen de contribución unitario y las unidades necesarias para el punto muerto.'
    ],
    formula: 'Margen Unitario = Precio - CosteVariable | Unidades = ⌈Costes Fijos / Margen Unitario⌉',
    formulaVariables: [
      { name: 'Costes fijos', description: 'Gastos de estructura independientes del volumen.', unit: 'Moneda ($ / €)', optional: false },
      { name: 'Precio unitario', description: 'Ingreso unitario por venta.', unit: 'Moneda ($ / ud)', optional: false },
      { name: 'Coste variable', description: 'Coste directo de fabricación por unidad.', unit: 'Moneda ($ / ud)', optional: false }
    ],
    workedExample: {
      scenario: 'Empresa con costes fijos de 20.000 €, precio de 50 € y coste variable de 20 €.',
      stepByStep: [
        'Margen de contribución: 50,00 € - 20,00 € = 30,00 € por unidad.',
        'Cálculo de unidades: 20.000 € / 30,00 € = 666,67 unidades.',
        'Unidades requeridas redondeadas: 667 unidades.'
      ],
      result: 'Margen unitario: 30,00 € | Umbral de rentabilidad: 667 unidades'
    },
    interpretation: 'A partir de la unidad 668, cada venta genera un beneficio neto directo equivalente al margen de contribución.',
    assumptions: 'Precios y costes directos unitarios constantes.',
    limitations: 'No modela fluctuaciones de precios derivadas de la elasticidad de la demanda.',
    faqs: [
      { question: '¿Por qué es fundamental el punto de equilibrio?', answer: 'Permite definir metas mínimas de ventas comerciales para garantizar la viabilidad del negocio.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} détermine la marge sur coût variable unitaire et le seuil de rentabilité en volume nécessaire pour couvrir les charges fixes d'exploitation.`,
    howToUse: [
      'Indiquez le montant total de vos charges fixes.',
      'Indiquez le prix de vente unitaire hors taxes.',
      'Indiquez le coût variable unitaire.',
      'Découvrez la marge sur coût variable et le nombre d\'unités à vendre pour atteindre le point mort.'
    ],
    formula: 'Marge Unitaire = Prix - Coût Variable | Quantité Seuil = ⌈Charges Fixes / Marge Unitaire⌉',
    formulaVariables: [
      { name: 'Charges fixes', description: 'Frais d\'exploitation indépendants de la production.', unit: 'Devise (€ / $)', optional: false },
      { name: 'Prix unitaire', description: 'Prix de vente facturé par unité.', unit: 'Devise (€ / unité)', optional: false },
      { name: 'Coût variable', description: 'Coût direct de revient unitaire.', unit: 'Devise (€ / unité)', optional: false }
    ],
    workedExample: {
      scenario: 'Activité avec 20 000 € de charges fixes, prix de 50 € et coût variable de 20 €.',
      stepByStep: [
        'Marge sur coût variable : 50,00 € - 20,00 € = 30,00 € par unité.',
        'Calcul du seuil : 20 000 € / 30,00 € = 666,67 unités.',
        'Nombre d\'unités nécessaires : 667 unités.'
      ],
      result: 'Marge unitaire : 30,00 € | Seuil de rentabilité : 667 unités'
    },
    interpretation: 'Au-delà de 667 unités vendues, l\'entreprise commence à générer un résultat d\'exploitation positif.',
    assumptions: 'Hypothèse de proportionnalité parfaite des coûts variables.',
    limitations: 'Ne prend pas en compte les paliers d\'investissement liés à une augmentation de capacité.',
    faqs: [
      { question: 'Qu\'est-ce que le point mort ?', answer: 'C\'est la date ou le niveau d\'activité précis à partir duquel l\'ensemble des coûts est couvert par le chiffre d\'affaires.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet den Deckungsbeitrag pro Stück und die Gewinnschwelle (Break-Even-Point) in abgesetzten Einheiten.`,
    howToUse: [
      'Geben Sie die gesamten Fixkosten des Unternehmens ein.',
      'Geben Sie den Netto-Verkaufspreis pro Stück ein.',
      'Geben Sie die variablen Stückkosten ein.',
      'Lesen Sie den Stückdeckungsbeitrag und die Mindestabsatzmenge ab.'
    ],
    formula: 'Stückdeckungsbeitrag = Preis - Variable Kosten | Break-Even-Menge = ⌈Fixkosten / Stückdeckungsbeitrag⌉',
    formulaVariables: [
      { name: 'Fixkosten', description: 'Beschäftigungsunabhängige Betriebskosten.', unit: 'Währung (€ / $)', optional: false },
      { name: 'Stückpreis', description: 'Erzielter Verkaufserlös je Einheit.', unit: 'Währung (€ / Stück)', optional: false },
      { name: 'Variable Kosten', description: 'Direkte Fertigungskosten je Einheit.', unit: 'Währung (€ / Stück)', optional: false }
    ],
    workedExample: {
      scenario: 'Betrieb mit 20.000 € Fixkosten, 50 € Verkaufspreis und 20 € variablen Stückkosten.',
      stepByStep: [
        'Deckungsbeitrag: 50,00 € - 20,00 € = 30,00 € je Stück.',
        'Break-Even-Berechnung: 20.000 € / 30,00 € = 666,67 Stück.',
        'Erforderliche Absatzmenge: 667 Stück.'
      ],
      result: 'Deckungsbeitrag: 30,00 € | Gewinnschwelle: 667 Stück'
    },
    interpretation: 'Erst ab der 668. verkauften Einheit erwirtschaftet das Unternehmen einen echten operativen Betriebsgewinn.',
    assumptions: 'Konstante Preise und Kostenstruktur über das gesamte Absatzvolumen.',
    limitations: 'Kapazitätsgrenzen und degressive Mengenrabatte bleiben unberücksichtigt.',
    faqs: [
      { question: 'Was bedeutet der Deckungsbeitrag?', answer: 'Der Betrag, der nach Abzug der variablen Kosten übrig bleibt, um die Fixkosten des Betriebs zu decken.' }
    ],
    relatedTools
  })
});

// 5. DIVIDEND YIELD (dividend-yield)
export const DIVIDEND_YIELD_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates annual dividend yield percentage based on current stock share price, and computes total annual cash dividend income across your shareholdings.`,
    howToUse: [
      'Enter the current market price per share.',
      'Enter the annual dividend paid per share.',
      'Enter the total number of shares owned in your portfolio.',
      'Review the dividend yield percentage and expected total annual cash payout.'
    ],
    formula: 'Dividend Yield (%) = (Annual Dividend Per Share / Share Price) × 100 | Annual Payout = Annual Dividend Per Share × Shares Count',
    formulaVariables: [
      { name: 'Share Price', description: 'Current trading market quote per share.', unit: 'Currency ($)', optional: false },
      { name: 'Annual Dividend Per Share', description: 'Total annualized cash dividend paid per share.', unit: 'Currency ($ / share)', optional: false },
      { name: 'Shares Count', description: 'Total quantity of shares held.', unit: 'Shares', optional: false }
    ],
    workedExample: {
      scenario: 'Holding 100 shares of stock priced at $120.00 paying an annual dividend of $4.80 per share.',
      stepByStep: [
        'Dividend Yield: ($4.80 / $120.00) × 100 = 4.00%.',
        'Annual Cash Income: $4.80 × 100 shares = $480.00.'
      ],
      result: 'Dividend Yield: 4.00% | Total Annual Payout: $480.00'
    },
    interpretation: 'A 4% dividend yield means the stock generates 4 cents of annual cash return for every dollar currently invested, independent of capital gains.',
    assumptions: 'Assumes dividend payments remain constant and are not reduced by the board of directors.',
    limitations: 'Does not account for dividend withholding taxes or stock price fluctuations.',
    faqs: [
      { question: 'What is a good dividend yield?', answer: 'Typically 2% to 5% is considered healthy; yields exceeding 8% to 10% often signal elevated risk of dividend cuts.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب نسبة عائد التوزيعات النقدية السنوية للسهم بناءً على سعره السوقي، وإجمالي الدخل السنوي من الأرباح الموزعة لمحفظتك.`,
    howToUse: [
      'أدخل سعر السهم السوقي الحالي.',
      'أدخل التوزيع النقدي السنوي الموزع لكل سهم.',
      'أدخل عدد الأسهم المملوكة في محفظتك.',
      'راجع نسبة عائد التوزيع السنوي وإجمالي التدفق النقدي المتوقع.'
    ],
    formula: 'عائد التوزيع = (توزيع السهم السنوي / سعر السهم) × 100 | إجمالي التوزيعات = توزيع السهم × عدد الأسهم',
    formulaVariables: [
      { name: 'سعر السهم', description: 'السعر السوقي الحالي للسهم.', unit: 'عملة ($)', optional: false },
      { name: 'توزيع السهم السنوي', description: 'إجمالي الأرباح النقدية الموزعة للسهم في السنة.', unit: 'عملة ($ / سهم)', optional: false },
      { name: 'عدد الأسهم', description: 'عدد الأسهم المملوكة في الشركة.', unit: 'سهم', optional: false }
    ],
    workedExample: {
      scenario: 'امتلاك 100 سهم بسعر 120.00 دولاراً للسهم مع توزيع سنوي 4.80 دولار.',
      stepByStep: [
        'عائد التوزيعات: (4.80 ÷ 120.00) × 100 = 4.00%.',
        'إجمالي الدخل السنوي: 4.80 × 100 سهم = 480.00 دولار.'
      ],
      result: 'عائد التوزيع: 4.00% | إجمالي التوزيعات السنوية: $480.00'
    },
    interpretation: 'يمثل عائد 4% دخلاً سنوياً قدره 4 سنتات لكل دولار مستثمر، بغض النظر عن تغير سعر السهم صعوداً أو هبوطاً.',
    assumptions: 'تفترض استمرار الشركة في توزيع الأرباح دون تخفيض من مجلس الإدارة.',
    limitations: 'لا تخصم الضرائب المقتطعة من المنبع على التوزيعات النقدية.',
    faqs: [
      { question: 'ما هو مصيد عائد التوزيعات (Yield Trap)؟', answer: 'هو سهم يقدم عائداً مرتفعاً بصورة مصطنعة نتيجة انهيار سعره السوقي بسبب مشاكل مالية تواجه الشركة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la rentabilidad por dividendo anual y la renta total periódica en efectivo según el número de acciones de su cartera.`,
    howToUse: [
      'Introduzca la cotización actual por acción.',
      'Introduzca el dividendo anual abonado por acción.',
      'Introduzca el número total de acciones en su poder.',
      'Consulte la rentabilidad por dividendo porcentual y el cobro anual total.'
    ],
    formula: 'Rentabilidad (%) = (Dividendo / Precio) × 100 | Cobro Anual = Dividendo × Acciones',
    formulaVariables: [
      { name: 'Precio por acción', description: 'Cotización en bolsa de la acción.', unit: 'Moneda ($ / €)', optional: false },
      { name: 'Dividendo anual', description: 'Importe del dividendo anual por acción.', unit: 'Moneda ($ / acción)', optional: false },
      { name: 'Número de acciones', description: 'Cantidad de títulos en posesión.', unit: 'Acciones', optional: false }
    ],
    workedExample: {
      scenario: 'Posición de 100 acciones a 120,00 € con un dividendo de 4,80 € por acción.',
      stepByStep: [
        'Rentabilidad por dividendo: (4,80 / 120,00) × 100 = 4,00 %.',
        'Cobro anual bruto: 4,80 € × 100 títulos = 480,00 €.'
      ],
      result: 'Rentabilidad por dividendo: 4,00 % | Dividendo anual total: 480,00 €'
    },
    interpretation: 'Mide el flujo de caja pasivo generado por la inversión con independencia de la revalorización del título.',
    assumptions: 'Mantenimiento de la política de dividendos de la sociedad.',
    limitations: 'No incluye retenciones fiscales sobre rendimientos del capital mobiliario.',
    faqs: [
      { question: '¿Qué es una estrategia DGI (Dividend Growth Investing)?', answer: 'Consiste en invertir en empresas que incrementan sistemáticamente sus dividendos año tras año.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} évalue le rendement du dividende par rapport au cours de l'action et calcule le montant annuel total des dividendes perçus.`,
    howToUse: [
      'Indiquez le cours de bourse actuel de l\'action.',
      'Indiquez le montant du dividende annuel distribué par titre.',
      'Précisez le nombre de titres détenus.',
      'Visualisez le taux de rendement brut et le versement annuel prévisionnel.'
    ],
    formula: 'Rendement (%) = (Dividende / Cours) × 100 | Dividende total = Dividende unitaire × Nombre d\'actions',
    formulaVariables: [
      { name: 'Cours de l\'action', description: 'Prix de marché actuel de l\'action.', unit: 'Devise (€ / $)', optional: false },
      { name: 'Dividende par action', description: 'Montant annuel du dividende par titre.', unit: 'Devise (€ / action)', optional: false },
      { name: 'Nombre d\'actions', description: 'Quantité d\'actions détenues.', unit: 'Actions', optional: false }
    ],
    workedExample: {
      scenario: 'Détention de 100 actions cotées à 120,00 € versant 4,80 € de dividende par action.',
      stepByStep: [
        'Rendement du dividende : (4,80 / 120,00) × 100 = 4,00 %.',
        'Revenu brut perçu : 4,80 € × 100 actions = 480,00 €.'
      ],
      result: 'Rendement brut : 4,00 % | Dividendes annuels perçus : 480,00 €'
    },
    interpretation: 'Indicateur clé pour les investisseurs axés sur les flux de revenus passifs récurrents.',
    assumptions: 'Hypothèse de reconduction du dividende sans réduction votée en assemblée générale.',
    limitations: 'Ne prend pas en compte le prélèvement forfaitaire unique (flat tax).',
    faqs: [
      { question: 'Un dividende élevé est-il toujours synonyme de bon investissement ?', answer: 'Pas nécessairement : un rendement artificiellement élevé peut résulter d\'une forte chute du cours signalant des difficultés financières.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die prozentuale Dividendenrendite bezogen auf den aktuellen Aktienkurs und ermittelt die jährliche Gesamtausschüttung Ihres Depots.`,
    howToUse: [
      'Geben Sie den aktuellen Börsenkurs der Aktie ein.',
      'Geben Sie die jährliche Dividende pro Aktie ein.',
      'Geben Sie die Anzahl der im Depot gehaltenen Aktien ein.',
      'Sehen Sie sofort die Dividendenrendite und die jährliche Bruttoausschüttung.'
    ],
    formula: 'Dividendenrendite (%) = (Dividende je Aktie / Aktienkurs) × 100 | Ausschüttung = Dividende je Aktie × Stückzahl',
    formulaVariables: [
      { name: 'Aktienkurs', description: 'Aktueller Börsenkurs der Aktie.', unit: 'Währung (€ / $)', optional: false },
      { name: 'Dividende je Aktie', description: 'Jährlich ausgeschüttete Dividende pro Anteil.', unit: 'Währung (€ / Aktie)', optional: false },
      { name: 'Stückzahl', description: 'Anzahl der gehaltenen Wertpapiere.', unit: 'Stück', optional: false }
    ],
    workedExample: {
      scenario: 'Depotbestand von 100 Aktien zu einem Kurs von 120,00 € mit 4,80 € Dividende pro Aktie.',
      stepByStep: [
        'Dividendenrendite: (4,80 / 120,00) × 100 = 4,00 %.',
        'Gesamte Ausschüttung: 4,80 € × 100 Anteile = 480,00 €.'
      ],
      result: 'Dividendenrendite: 4,00 % | Jährliche Ausschüttung: 480,00 €'
    },
    interpretation: 'Die Dividendenrendite zeigt den laufenden Cashflow der Anlage unabhängig von zwischenzeitlichen Kursgewinnen.',
    assumptions: 'Gleichbleibende Ausschüttungspolitik der Aktiengesellschaft.',
    limitations: 'Kapitalertragsteuer und Solidaritätszuschlag sind nicht abgezogen.',
    faqs: [
      { question: 'Was ist die Dividendenrendite auf das eingesetzte Kapital (Yield on Cost)?', answer: 'Sie setzt die aktuelle Dividende ins Verhältnis zum ursprünglichen Kaufkurs der Aktie.' }
    ],
    relatedTools
  })
});

// 6. INFLATION IMPACT (inflation-impact)
export const INFLATION_IMPACT_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates the future real purchasing power of today's money under sustained compound inflation over time.`,
    howToUse: [
      'Enter the starting monetary sum.',
      'Enter the expected average annual inflation rate percentage.',
      'Specify the time duration in years.',
      'Review the projected real purchasing power of that capital.'
    ],
    formula: 'Future Purchasing Power = Initial Amount / (1 + InflationRate)^Years',
    formulaVariables: [
      { name: 'Initial Amount', description: 'Present nominal monetary amount.', unit: 'Currency ($)', optional: false },
      { name: 'Inflation Rate', description: 'Average annual inflation rate percentage.', unit: 'Percentage (%)', optional: false },
      { name: 'Years', description: 'Holding period in years.', unit: 'Years', optional: false }
    ],
    workedExample: {
      scenario: 'Evaluating how $10,000 in cash maintains its purchasing power over 10 years at 3.5% inflation.',
      stepByStep: [
        'Initial amount: $10,000.00, Inflation: 3.5% (0.035), Duration: 10 years.',
        'Compounding factor: (1 + 0.035)^10 = (1.035)^10 = 1.4106.',
        'Future purchasing power: $10,000.00 / 1.4106 = $7,089.19.'
      ],
      result: 'Projected Purchasing Power: $7,089.19'
    },
    interpretation: 'In 10 years at 3.5% inflation, a $10,000 nominal cash reserve will buy only as many goods as $7,089.19 buys today, losing nearly 29% of its real purchasing value.',
    assumptions: 'Assumes a constant geometric compound inflation rate annually.',
    limitations: 'Personal inflation may diverge significantly depending on individual consumption baskets (housing, healthcare, food).',
    faqs: [
      { question: 'How can investors protect their capital against inflation?', answer: 'Assets with real pricing power like equities, productive real estate, and inflation-indexed government bonds typically hedge purchasing power.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب القوة الشرائية الحقيقية المستقبلية للمال في ظل معدلات التضخم النقدي المركب بمرور الوقت.`,
    howToUse: [
      'أدخل المبلغ المالي الأساسي اليوم.',
      'أدخل معدل التضخم السنوي المتوقع كنسبة مئوية.',
      'حدد عدد السنوات في المستقبل.',
      'راجع القوة الشرائية الحقيقية المتبقية للمبلغ.'
    ],
    formula: 'القوة الشرائية المستقبلية = المبلغ الأولي / (1 + نسبة التضخم)^السنوات',
    formulaVariables: [
      { name: 'المبلغ الأولي', description: 'المبلغ النقدي الاسمي الحالي.', unit: 'عملة ($)', optional: false },
      { name: 'معدل التضخم', description: 'متوسط نسبة التضخم السنوية.', unit: 'نسبة مئوية (%)', optional: false },
      { name: 'السنوات', description: 'الفترة الزمنية بالسنوات.', unit: 'سنوات', optional: false }
    ],
    workedExample: {
      scenario: 'حساب القوة الشرائية لمبلغ 10,000 دولار بعد 10 سنوات بمعدل تضخم 3.5% سنوياً.',
      stepByStep: [
        'المبلغ الأولي: 10,000 دولار، معدل التضخم: 3.5%، المدة: 10 سنوات.',
        'معامل التضخم المركب: (1 + 0.035)^10 = 1.4106.',
        'القوة الشرائية الحقيقية: 10,000 ÷ 1.4106 = 7,089.19 دولار.'
      ],
      result: 'القوة الشرائية المستقبلية: $7,089.19'
    },
    interpretation: 'بعد 10 سنوات بمعدل تضخم 3.5%، سيشتري مبلغ 10,000 دولار ما قيمته 7,089.19 دولار فقط بأسعار اليوم (فقدان نحو 29% من قيمته الحقيقية).',
    assumptions: 'تفترض ثبات معدل التضخم المركب السنوي على مدار كامل المدة.',
    limitations: 'يختلف معدل التضخم الفعلي للأفراد وفقاً لنمط الاستهلاك وسلة المشتريات الشخصية.',
    faqs: [
      { question: 'كيف يمكن حماية المدخرات من التضخم؟', answer: 'عبر استثمار الأموال في أصول منتجة مثل الأسهم والعقارات وسندات الخزانة المحمية من التضخم.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el poder adquisitivo real futuro del dinero bajo el impacto acumulado de la inflación sostenida.`,
    howToUse: [
      'Introduzca el importe monetario actual.',
      'Introduzca la tasa media anual estimada de inflación.',
      'Especifique el plazo en años.',
      'Compruebe el poder de compra real resultante.'
    ],
    formula: 'Poder Adquisitivo Futuro = Importe Inicial / (1 + Inflación)^Años',
    formulaVariables: [
      { name: 'Importe inicial', description: 'Capital nominal disponible hoy.', unit: 'Moneda ($ / €)', optional: false },
      { name: 'Tasa de inflación', description: 'Porcentaje de inflación anual media.', unit: 'Porcentaje (%)', optional: false },
      { name: 'Años', description: 'Horizonte temporal de cálculo.', unit: 'Años', optional: false }
    ],
    workedExample: {
      scenario: 'Pérdida de poder adquisitivo de 10.000 € tras 10 años con un 3,5 % de inflación anual.',
      stepByStep: [
        'Capital: 10.000 €, Inflación: 3,5 %, Años: 10.',
        'Factor acumulado: (1 + 0,035)^10 = 1,4106.',
        'Poder adquisitivo: 10.000 € / 1,4106 = 7.089,19 €.'
      ],
      result: 'Poder adquisitivo real futuro: 7.089,19 €'
    },
    interpretation: 'Refleja la erosión silenciosa del ahorro en efectivo que no genera rendimientos superiores a la tasa de inflación.',
    assumptions: 'Tasa constante de inflación compuesta interanual.',
    limitations: 'No refleja variaciones en la cesta de la compra personal de cada individuo.',
    faqs: [
      { question: '¿Por qué mantener dinero en efectivo pierde valor?', answer: 'El aumento generalizado de los precios encarece bienes y servicios, reduciendo lo que se puede comprar con la misma cantidad nominal de dinero.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} mesure l'érosion du pouvoir d'achat d'un capital nominal sous l'effet de l'inflation composée au fil du temps.`,
    howToUse: [
      'Indiquez le capital de départ.',
      'Indiquez le taux moyen d\'inflation annuelle anticipé.',
      'Précisez l\'horizon de placement en années.',
      'Consultez le pouvoir d\'achat réel restant à terme.'
    ],
    formula: 'Pouvoir d\'achat futur = Montant initial / (1 + Taux inflation)^Années',
    formulaVariables: [
      { name: 'Montant initial', description: 'Capital nominal de référence.', unit: 'Devise (€ / $)', optional: false },
      { name: 'Taux d\'inflation', description: 'Taux moyen d\'inflation par an.', unit: 'Pourcentage (%)', optional: false },
      { name: 'Années', description: 'Nombre d\'années écoulées.', unit: 'Années', optional: false }
    ],
    workedExample: {
      scenario: 'Évolution du pouvoir d\'achat de 10 000 € après 10 ans avec une inflation de 3,5 % par an.',
      stepByStep: [
        'Montant : 10 000 €, Taux : 3,5 %, Durée : 10 ans.',
        'Coefficient d\'érosion : (1,035)^10 = 1,4106.',
        'Pouvoir d\'achat restant : 10 000 € / 1,4106 = 7 089,19 €.'
      ],
      result: 'Pouvoir d\'achat réel résiduel : 7 089,19 €'
    },
    interpretation: 'Démontre la nécessité d\'investir dans des actifs dynamiques pour préserver la valeur réelle de son patrimoine.',
    assumptions: 'Taux d\'inflation uniforme et constant sur toute la période.',
    limitations: 'L\'inflation ressentie peut être supérieure selon les postes de dépenses (logement, énergie).',
    faqs: [
      { question: 'Comment battre l\'inflation ?', answer: 'En plaçant son épargne sur des supports dont le rendement net dépasse le taux d\'inflation (actions, obligations indexées).' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} ermittelt die reale zukünftige Kaufkraft von Barvermögen unter dem Einfluss einer anhaltenden Zinseszins-Inflation.`,
    howToUse: [
      'Geben Sie den heutigen Geldbetrag ein.',
      'Geben Sie die geschätzte jährliche Inflationsrate ein.',
      'Geben Sie den Betrachtungszeitraum in Jahren ein.',
      'Erfahren Sie die verbleibende reale Kaufkraft des Geldes.'
    ],
    formula: 'Zukünftige Kaufkraft = Ausgangsbetrag / (1 + Inflationsrate)^Jahre',
    formulaVariables: [
      { name: 'Ausgangsbetrag', description: 'Heutiger nominaler Geldbetrag.', unit: 'Währung (€ / $)', optional: false },
      { name: 'Inflationsrate', description: 'Durchschnittliche jährliche Teuerungsrate.', unit: 'Prozent (%)', optional: false },
      { name: 'Jahre', description: 'Zeitraum in Jahren.', unit: 'Jahre', optional: false }
    ],
    workedExample: {
      scenario: 'Kaufkraftverlust von 10.000 € Barvermögen über 10 Jahre bei 3,5 % jährlicher Inflation.',
      stepByStep: [
        'Anfangsbetrag: 10.000 €, Inflationsrate: 3,5 %, Dauer: 10 Jahre.',
        'Aufzinsungsfaktor: (1,035)^10 = 1,4106.',
        'Reale Kaufkraft: 10.000 € / 1,4106 = 7.089,19 €.'
      ],
      result: 'Reale zukünftige Kaufkraft: 7.089,19 €'
    },
    interpretation: 'Nach 10 Jahren bei 3,5 % Inflation entspricht die Kaufkraft von 10.000 € nur noch heutigen 7.089,19 € (fast 29 % Kaufkraftverlust).',
    assumptions: 'Gleichbleibender jährlicher Teuerungsverlauf.',
    limitations: 'Die persönliche Inflationsrate weicht je nach Warenkorb und Wohnsituation vom Gesamtindex ab.',
    faqs: [
      { question: 'Welche Geldanlagen bieten Schutz vor Inflation?', answer: 'Sachwerte wie Aktien, ertragsstarke Immobilien und inflationsgeschützte Staatsanleihen.' }
    ],
    relatedTools
  })
});

// 7. FREELANCE RATE (freelance-rate)
export const FREELANCE_RATE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates the minimum billable hourly rate needed to achieve a net target income after accounting for business operating expenses and unbillable overhead hours.`,
    howToUse: [
      'Enter your desired net annual take-home income.',
      'Enter your total estimated annual business expenses (software, equipment, insurance, taxes).',
      'Enter your weekly billable hours (based on a standard 48 working weeks per year).',
      'Review the required minimum billable hourly rate.'
    ],
    formula: 'Total Billable Hours = Billable Hours Per Week × 48 | Minimum Hourly Rate = (Target Income + Expenses) / Total Billable Hours',
    formulaVariables: [
      { name: 'Target Annual Income', description: 'Desired personal compensation before taxes.', unit: 'Currency ($ / year)', optional: false },
      { name: 'Annual Business Expenses', description: 'Annual professional tools, hardware, accounting, and overhead.', unit: 'Currency ($ / year)', optional: false },
      { name: 'Billable Hours / Week', description: 'Actual hours spent on direct billable client deliverables.', unit: 'Hours / week', optional: false }
    ],
    workedExample: {
      scenario: 'A consultant targeting $60,000 net income with $12,000 in expenses working 25 billable hours per week over 48 weeks.',
      stepByStep: [
        'Total billable hours: 25 hours/week × 48 weeks = 1,200 billable hours/year.',
        'Total revenue required: $60,000 + $12,000 = $72,000.',
        'Minimum hourly rate: $72,000 / 1,200 hours = $60.00 per hour.'
      ],
      result: 'Total Billable Hours: 1,200 | Minimum Hourly Rate: $60.00/hr'
    },
    interpretation: 'Shows that charging $60/hour on 25 billable hours/week guarantees $72,000 gross billing, leaving exactly $60,000 after $12,000 business costs.',
    assumptions: 'Assumes 4 weeks of unpaid vacation, sick leave, or administrative downtime annually (48 working weeks).',
    limitations: 'Does not model complex progressive income tax brackets or client non-payment bad debt risks.',
    faqs: [
      { question: 'Why are billable hours only 20-30 hours per week?', answer: 'Freelancers must spend 10-20 hours weekly on unbilled administrative tasks, marketing, invoicing, and client prospecting.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب الحد الأدنى لسعر الساعة للعمل الحر (Freelance) اللازم لتحقيق الدخل السنوي المستهدف بعد تغطية نفقات العمل وساعات الإجازات.`,
    howToUse: [
      'أدخل الدخل الشخصي السنوي الصافي الذي ترغب في تحقيقه.',
      'أدخل إجمالي النفقات المهنية السنوية (برمجيات، أجهزة، محاسبة، تسويق).',
      'أدخل عدد ساعات العمل المدفوعة أسبوعياً (بناءً على 48 أسبوع عمل سنوياً).',
      'راجع الحد الأدنى لسعر الساعة الواحدة المستحق على العميل.'
    ],
    formula: 'إجمالي الساعات المدفوعة = الساعات الأسبوعية × 48 | سعر الساعة = (الدخل المستهدف + النفقات) / إجمالي الساعات',
    formulaVariables: [
      { name: 'الدخل السنوي المستهدف', description: 'المبلغ الصافي المرغوب سنوياً.', unit: 'عملة ($)', optional: false },
      { name: 'النفقات السنوية', description: 'تكاليف تشغيل العمل الحر سنوياً.', unit: 'عملة ($)', optional: false },
      { name: 'الساعات المدفوعة أسبوعياً', description: 'الساعات المفوترة للعملاء مباشرة.', unit: 'ساعة / أسبوع', optional: false }
    ],
    workedExample: {
      scenario: 'مستقل يستهدف دخلاً قدره 60,000 دولار مع نفقات 12,000 دولار ويعمل 25 ساعة مدفوعة أسبوعياً.',
      stepByStep: [
        'إجمالي الساعات المفوترة: 25 × 48 أسبوعاً = 1,200 ساعة سنوياً.',
        'إجمالي الدخل المطلوب تحصيله: 60,000 + 12,000 = 72,000 دولار.',
        'الحد الأدنى لسعر الساعة: 72,000 ÷ 1,200 = 60.00 دولاراً للساعة.'
      ],
      result: 'ساعات العمل السنوية: 1,200 ساعة | الحد الأدنى لسعر الساعة: $60.00/ساعة'
    },
    interpretation: 'يضمن تحصيل 60 دولاراً للساعة تغطية النفقات التشغيلية وتحقيق الدخل الشخصي المستهدف مع تخصيص 4 أسابيع للإجازات.',
    assumptions: 'تفترض 48 أسبوع عمل فعلي سنوياً مع خصم 4 أسابيع للإجازات والمناسبات.',
    limitations: 'لا تحسب الشرائح الضريبية التصاعدية المعقدة للدخل الفردي.',
    faqs: [
      { question: 'لماذا تقل ساعات الفوترة عن 40 ساعة أسبوعياً؟', answer: 'لأن المستقل يقضي جزءاً كبيراً من وقته في التواصل مع العملاء، المحاسبة، وتطوير المهارات دون مقابل مالي مباشر.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la tarifa mínima por hora facturable necesaria para alcanzar un ingreso neto objetivo cubriendo costes operativos y períodos no facturables.`,
    howToUse: [
      'Introduzca el ingreso neto anual personal deseado.',
      'Introduzca los gastos operativos anuales del negocio.',
      'Indique las horas facturables estimadas por semana (calculado sobre 48 semanas laborales).',
      'Consulte la tarifa horaria mínima necesaria a facturar a sus clientes.'
    ],
    formula: 'Horas Facturables = Horas/Semana × 48 | Tarifa/Hora = (Ingreso Objetivo + Gastos) / Horas Facturables',
    formulaVariables: [
      { name: 'Ingreso anual deseado', description: 'Compensación personal neta objetivo.', unit: 'Moneda ($ / €)', optional: false },
      { name: 'Gastos anuales', description: 'Software, equipos, gestoría y suministros.', unit: 'Moneda ($ / €)', optional: false },
      { name: 'Horas facturables/semana', description: 'Horas dedicadas a proyectos de clientes.', unit: 'Horas / semana', optional: false }
    ],
    workedExample: {
      scenario: 'Profesional que busca 60.000 € netos con 12.000 € de gastos y 25 horas facturables por semana.',
      stepByStep: [
        'Horas facturables totales: 25 horas × 48 semanas = 1.200 horas/año.',
        'Facturación bruta requerida: 60.000 € + 12.000 € = 72.000 €.',
        'Tarifa horaria mínima: 72.000 € / 1.200 horas = 60,00 €/hora.'
      ],
      result: 'Horas anuales: 1.200 | Tarifa horaria mínima: 60,00 €/h'
    },
    interpretation: 'Garantiza que la tarifa cobrada cubra los costes estructurales del autónomo y permita remunerar las vacaciones y el tiempo comercial.',
    assumptions: 'Considera 48 semanas anuales de trabajo y 4 semanas de vacaciones o inactividad.',
    limitations: 'No incluye el régimen de impuestos sobre la renta de personas físicas (IRPF).',
    faqs: [
      { question: '¿Cómo presupuestar proyectos a precio cerrado?', answer: 'Multiplique la estimación de horas del proyecto por su tarifa horaria mínima más un 15-20% de margen de contingencia.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} détermine le taux journalier ou horaire facturable minimal pour couvrir vos charges et atteindre votre rémunération nette cible en indépendant.`,
    howToUse: [
      'Indiquez votre rémunération nette annuelle visée.',
      'Indiquez vos frais professionnels annuels (assurances, matériel, abonnements).',
      'Indiquez vos heures facturables par semaine (sur une base de 48 semaines ouvrées).',
      'Visualisez le tarif horaire plancher à appliquer à vos clients.'
    ],
    formula: 'Heures Facturables = Heures/Semaine × 48 | Taux Horaire = (Rémunération + Frais) / Heures Facturables',
    formulaVariables: [
      { name: 'Revenu net cible', description: 'Rémunération nette souhaitée.', unit: 'Devise (€ / $)', optional: false },
      { name: 'Frais d\'activité', description: 'Dépenses professionnelles déductibles annuelles.', unit: 'Devise (€ / an)', optional: false },
      { name: 'Heures facturables/semaine', description: 'Volume hebdomadaire dédié aux clients.', unit: 'Heures / semaine', optional: false }
    ],
    workedExample: {
      scenario: 'Freelance visant 60 000 € avec 12 000 € de frais pour 25 heures facturées par semaine.',
      stepByStep: [
        'Heures facturables annuelles : 25 h × 48 semaines = 1 200 heures.',
        'Chiffre d\'affaires requis : 60 000 € + 12 000 € = 72 000 €.',
        'Taux horaire minimum : 72 000 € / 1 200 h = 60,00 € par heure.'
      ],
      result: 'Volume annuel : 1 200 h | Taux horaire plancher : 60,00 €/h'
    },
    interpretation: 'Évite la sous-évaluation tarifaire fréquente en intégrant les périodes non productives indispensables.',
    assumptions: 'Base de calcul sur 48 semaines travaillées et 4 semaines de congés ou formation.',
    limitations: 'Ne simule pas les cotisations sociales URSSAF ou charges de gérance de société.',
    faqs: [
      { question: 'Comment convertir ce tarif horaire en TJM (Taux Journalier Moyen) ?', answer: 'Multipliez le taux horaire par le nombre d\'heures de votre journée type (ex. 60 € × 7 h = 420 € de TJM).' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} ermittelt den kalkulatorischen Mindeststundensatz für Freiberufler zur Erreichung des Ziel-Jahreseinkommens nach Abzug von Betriebsausgaben.`,
    howToUse: [
      'Geben Sie Ihr angestrebtes persönliches Netto-Jahreseinkommen ein.',
      'Geben Sie Ihre jährlichen Betriebsausgaben (Software, Hardware, Versicherungen) ein.',
      'Geben Sie die wöchentlich abrechenbaren Projektstunden ein (Basis 48 Arbeitswochen).',
      'Lesen Sie den erforderlichen Mindeststundensatz ab.'
    ],
    formula: 'Fakturierbare Stunden = Stunden/Woche × 48 | Stundensatz = (Zieleinkommen + Ausgaben) / Fakturierbare Stunden',
    formulaVariables: [
      { name: 'Zieleinkommen', description: 'Angestrebtes Jahresnettoeinkommen.', unit: 'Währung (€ / $)', optional: false },
      { name: 'Betriebsausgaben', description: 'Laufende jährliche Geschäftskosten.', unit: 'Währung (€ / Jahr)', optional: false },
      { name: 'Abrechenbare Stunden/Woche', description: 'Tatsächlich an Kunden verrechenbare Arbeitszeit.', unit: 'Stunden / Woche', optional: false }
    ],
    workedExample: {
      scenario: 'Freelancer mit 60.000 € Zieleinkommen, 12.000 € Kosten und 25 fakturierbaren Wochenstunden.',
      stepByStep: [
        'Abrechenbare Jahresstunden: 25 Stunden × 48 Wochen = 1.200 Stunden.',
        'Erforderlicher Gesamtumsatz: 60.000 € + 12.000 € = 72.000 €.',
        'Mindeststundensatz: 72.000 € / 1.200 Stunden = 60,00 € pro Stunde.'
      ],
      result: 'Abrechenbare Stunden: 1.200 h | Mindeststundensatz: 60,00 €/h'
    },
    interpretation: 'Sichert das Auskommen des Selbstständigen ab und berücksichtigt unbezahlte Urlaubs- und Akquisezeiten.',
    assumptions: 'Kalkulation mit 48 Arbeitswochen und 4 Wochen Urlaub/Krankheit.',
    limitations: 'Einkommensteuer und Sozialabgaben müssen im Zieleinkommen berücksichtigt werden.',
    faqs: [
      { question: 'Warum kann man nicht 40 Stunden pro Woche abrechnen?', answer: 'Weil Administration, Buchhaltung und Kundenakquise erhebliche unbezahlte Arbeitszeit in Anspruch nehmen.' }
    ],
    relatedTools
  })
});

// 8. RENTAL YIELD (rental-yield)
export const RENTAL_YIELD_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates gross and net rental yields on investment real estate properties to evaluate income generation relative to capital value.`,
    howToUse: [
      'Enter the property purchase price or current market valuation.',
      'Enter the expected monthly rental income.',
      'Enter total annual recurring operating expenses (property taxes, insurance, maintenance, HOA).',
      'Review both the gross rental yield and net rental yield percentages.'
    ],
    formula: 'Annual Rent = Monthly Rent × 12 | Gross Yield (%) = (Annual Rent / Property Value) × 100 | Net Yield (%) = [(Annual Rent - Expenses) / Property Value] × 100',
    formulaVariables: [
      { name: 'Property Value', description: 'Total purchase cost or market appraisal of the property.', unit: 'Currency ($)', optional: false },
      { name: 'Monthly Rent', description: 'Gross rental payment received from tenants each month.', unit: 'Currency ($ / month)', optional: false },
      { name: 'Annual Expenses', description: 'Annual property taxes, insurance, HOA fees, and maintenance.', unit: 'Currency ($ / year)', optional: false }
    ],
    workedExample: {
      scenario: 'A $350,000 rental property rented for $2,200/month with $4,500 in annual operating expenses.',
      stepByStep: [
        'Calculate annual rent: $2,200.00 × 12 = $26,400.00.',
        'Calculate Gross Yield: ($26,400.00 / $350,000.00) × 100 = 7.54%.',
        'Net annual income: $26,400.00 - $4,500.00 = $21,900.00.',
        'Calculate Net Yield: ($21,900.00 / $350,000.00) × 100 = 6.26%.'
      ],
      result: 'Gross Rental Yield: 7.54% | Net Rental Yield: 6.26%'
    },
    interpretation: 'While gross yield offers a rapid comparison metric, net yield reflects real bottom-line profitability after property ownership costs.',
    assumptions: 'Assumes 100% occupancy without vacancy downtime during the year.',
    limitations: 'Does not account for mortgage interest payments (cash-on-cash return) or future capital appreciation.',
    faqs: [
      { question: 'What is the difference between rental yield and cap rate?', answer: 'In residential real estate they are largely synonymous; capitalization rate is the net operating income divided by asset value.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب العائد الإجمالي والصافي للإيجار العقاري لمقارنة الجدوى الاستثمارية للعقار نسبةً إلى قيمته السوقية.`,
    howToUse: [
      'أدخل سعر شراء العقار أو قيمته السوقية الحالية.',
      'أدخل الإيجار الشهري المحصل من المستأجر.',
      'أدخل المصاريف التشغيلية السنوية (صيانة، تأمين، رسوم إدارة).',
      'راجع نسبة العائد الإجمالي ونسبة العائد الصافي السنوي.'
    ],
    formula: 'الإيجار السنوي = الشهري × 12 | العائد الإجمالي = (السنوي / قيمة العقار) × 100 | العائد الصافي = [(السنوي - المصاريف) / قيمة العقار] × 100',
    formulaVariables: [
      { name: 'قيمة العقار', description: 'سعر شراء العقار أو تقييمه الحالي.', unit: 'عملة ($)', optional: false },
      { name: 'الإيجار الشهري', description: 'قيمة الإيجار الشهري المحصل.', unit: 'عملة ($ / شهر)', optional: false },
      { name: 'المصاريف السنوية', description: 'تكاليف الصيانة والضرائب والخدمات سنوياً.', unit: 'عملة ($ / سنة)', optional: false }
    ],
    workedExample: {
      scenario: 'عقار بقيمة 350,000 دولار يُؤجر بمبلغ 2,200 دولار شهرياً مع مصاريف سنوية 4,500 دولار.',
      stepByStep: [
        'إجمالي الإيجار السنوي: 2,200 × 12 = 26,400 دولار.',
        'العائد الإجمالي: (26,400 ÷ 350,000) × 100 = 7.54%.',
        'صافي الدخل السنوي: 26,400 - 4,500 = 21,900 دولار.',
        'العائد الصافي: (21,900 ÷ 350,000) × 100 = 6.26%.'
      ],
      result: 'العائد الإجمالي: 7.54% | العائد الصافي: 6.26%'
    },
    interpretation: 'يوفر العائد الصافي المقياس الحقيقي للربحية الاستثمارية بعد خصم أعباء ملكية وإدارة العقار.',
    assumptions: 'يفترض إشغال العقار بنسبة 100% طوال أشهر العام دون فترات شغور.',
    limitations: 'لا يخصم أقساط القرض العقاري أو فوائد التمويل البنكي.',
    faqs: [
      { question: 'ما هو العائد الإيجاري الجيد للعقارات؟', answer: 'يتراوح العائد الصافي المقبول عادة بين 5% إلى 8% اعتماداً على موقع العقار ومستوى المخاطرة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la rentabilidad bruta y neta del alquiler de inmuebles de inversión para evaluar su rendimiento patrimonial.`,
    howToUse: [
      'Introduzca el valor de compra o cotización del inmueble.',
      'Introduzca el alquiler mensual percibido.',
      'Introduzca los gastos operativos anuales (comunidad, IBI, seguros, mantenimiento).',
      'Consulte los porcentajes de rentabilidad bruta y neta por alquiler.'
    ],
    formula: 'Renta Anual = Renta Mensual × 12 | Rentabilidad Bruta (%) = (Renta Anual / Valor) × 100 | Neta (%) = [(Renta - Gastos) / Valor] × 100',
    formulaVariables: [
      { name: 'Valor del inmueble', description: 'Precio de adquisición o tasación actual.', unit: 'Moneda ($ / €)', optional: false },
      { name: 'Alquiler mensual', description: 'Renta mensual satisfecha por el inquilino.', unit: 'Moneda ($ / mes)', optional: false },
      { name: 'Gastos anuales', description: 'Gastos recurrentes de conservación e impuestos.', unit: 'Moneda ($ / año)', optional: false }
    ],
    workedExample: {
      scenario: 'Inmueble de 350.000 € alquilado por 2.200 € al mes con 4.500 € de gastos anuales.',
      stepByStep: [
        'Renta anual: 2.200 € × 12 = 26.400 €.',
        'Rentabilidad bruta: (26.400 / 350.000) × 100 = 7,54 %.',
        'Renta neta: 26.400 € - 4.500 € = 21.900 €.',
        'Rentabilidad neta: (21.900 / 350.000) × 100 = 6,26 %.'
      ],
      result: 'Rentabilidad bruta: 7,54 % | Rentabilidad neta: 6,26 %'
    },
    interpretation: 'La rentabilidad neta refleja el verdadero flujo de caja libre generado tras cubrir los costes de mantenimiento del inmueble.',
    assumptions: 'Ocupación completa durante los 12 meses del ejercicio sin impagos.',
    limitations: 'No incluye el coste financiero de amortización de hipoteca ni la revalorización de la vivienda.',
    faqs: [
      { question: '¿Qué diferencia hay entre rentabilidad bruta y neta?', answer: 'La bruta solo relaciona ingresos con precio de compra; la neta descuenta todos los costes operativos reales.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} évalue la rentabilité locative brute et nette d'un investissement immobilier pour mesurer la performance des loyers par rapport au prix d'achat.`,
    howToUse: [
      'Indiquez le prix d\'acquisition du bien immobilier.',
      'Indiquez le montant du loyer mensuel hors charges.',
      'Indiquez les charges annuelles non récupérables (taxe foncière, assurance PNO, copropriété).',
      'Analysez les taux de rendement locatif brut et net.'
    ],
    formula: 'Loyers Annuels = Loyer Mensuel × 12 | Rendement Brut (%) = (Loyers / Prix) × 100 | Rendement Net (%) = [(Loyers - Charges) / Prix] × 100',
    formulaVariables: [
      { name: 'Valeur du bien', description: 'Coût total d\'acquisition du bien.', unit: 'Devise (€ / $)', optional: false },
      { name: 'Loyer mensuel', description: 'Montant du loyer perçu chaque mois.', unit: 'Devise (€ / mois)', optional: false },
      { name: 'Charges annuelles', description: 'Charges et taxes foncières restant à la charge du bailleur.', unit: 'Devise (€ / an)', optional: false }
    ],
    workedExample: {
      scenario: 'Bien de 350 000 € loué 2 200 € par mois avec 4 500 € de charges annuelles.',
      stepByStep: [
        'Loyers annuels : 2 200 € × 12 = 26 400 €.',
        'Rendement brut : (26 400 / 350 000) × 100 = 7,54 %.',
        'Revenu net d\'exploitation : 26 400 € - 4 500 € = 21 900 €.',
        'Rendement net : (21 900 / 350 000) × 100 = 6,26 %.'
      ],
      result: 'Rendement locatif brut : 7,54 % | Rendement net : 6,26 %'
    },
    interpretation: 'Le rendement net offre une vision réaliste du revenu effectif produit par l\'actif immobilier.',
    assumptions: 'Hypothèse d\'une absence totale de vacance locative au cours de l\'année.',
    limitations: 'Ne prend pas en compte les mensualités d\'emprunt immobilier ni la fiscalité foncière des revenus locatifs.',
    faqs: [
      { question: 'Quel est le bon niveau de rentabilité locative ?', answer: 'Un rendement net supérieur à 5 % est généralement considéré comme attractif dans l\'immobilier d\'habitation.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die Brutto- und Nettomietrendite von Kapitalanlageimmobilien zur Beurteilung der Ertragskraft bezogen auf den Kaufpreis.`,
    howToUse: [
      'Geben Sie den Kaufpreis oder den Marktwert der Immobilie ein.',
      'Geben Sie die monatliche Kaltmiete ein.',
      'Geben Sie die jährlichen nicht umlagefähigen Bewirtschaftungskosten ein.',
      'Prüfen Sie Bruttomietrendite und Nettomietrendite in Prozent.'
    ],
    formula: 'Jahreskaltmiete = Monatsmiete × 12 | Bruttorendite (%) = (Jahresmiete / Kaufpreis) × 100 | Nettorendite (%) = [(Jahresmiete - Kosten) / Kaufpreis] × 100',
    formulaVariables: [
      { name: 'Kaufpreis', description: 'Gesamtinvestitionskosten der Immobilie.', unit: 'Währung (€ / $)', optional: false },
      { name: 'Monatliche Kaltmiete', description: 'Monatlich vereinnahmter Mietzins ohne Nebenkosten.', unit: 'Währung (€ / Monat)', optional: false },
      { name: 'Jahresnebenkosten', description: 'Nicht umlegbare Verwaltungskosten und Instandhaltungsrücklage.', unit: 'Währung (€ / Jahr)', optional: false }
    ],
    workedExample: {
      scenario: 'Immobilie für 350.000 € mit 2.200 € Kaltmiete/Monat und 4.500 € jährlichen nicht umlagefähigen Kosten.',
      stepByStep: [
        'Jahreskaltmiete: 2.200 € × 12 = 26.400 €.',
        'Bruttomietrendite: (26.400 / 350.000) × 100 = 7,54 %.',
        'Reiner Nettoertrag: 26.400 € - 4.500 € = 21.900 €.',
        'Nettomietrendite: (21.900 / 350.000) × 100 = 6,26 %.'
      ],
      result: 'Bruttomietrendite: 7,54 % | Nettomietrendite: 6,26 %'
    },
    interpretation: 'Die Nettorendite beziffert die reale Verzinsung des Kapitals nach Abzug aller laufenden Eigentümerlasten.',
    assumptions: 'Vollvermietung über 12 Monate ohne Leerstandszeiten.',
    limitations: 'Darlehenszinsen, Tilgung und individuelle Einkommensteuer sind nicht einberechnet.',
    faqs: [
      { question: 'Was ist der Unterschied zwischen Brutto- und Nettomietrendite?', answer: 'Die Bruttorendite lässt Instandhaltungs- und Verwaltungskosten unberücksichtigt, die Nettorendite zieht diese ab.' }
    ],
    relatedTools
  })
});

// 9. VAT TAX (vat-tax)
export const VAT_TAX_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates the exact Value Added Tax (VAT) amount and gross price including tax for any net transaction amount.`,
    howToUse: [
      'Enter the base net monetary amount before tax.',
      'Enter the applicable statutory VAT percentage rate.',
      'Review the calculated VAT tax amount and the total gross amount with VAT included.'
    ],
    formula: 'VAT Amount = (Net Amount × VAT Rate) / 100 | Total with VAT = Net Amount + VAT Amount',
    formulaVariables: [
      { name: 'Net Amount', description: 'Pre-tax transaction or invoice amount.', unit: 'Currency ($)', optional: false },
      { name: 'VAT Rate', description: 'Statutory VAT rate percentage.', unit: 'Percentage (%)', optional: false }
    ],
    workedExample: {
      scenario: 'Applying a 15% standard VAT rate to a $100.00 net commercial invoice.',
      stepByStep: [
        'Net amount: $100.00, VAT rate: 15%.',
        'Calculate VAT amount: ($100.00 × 15) / 100 = $15.00.',
        'Calculate total with VAT: $100.00 + $15.00 = $115.00.'
      ],
      result: 'VAT Amount (15%): $15.00 | Total Amount with VAT: $115.00'
    },
    interpretation: 'Separates pre-tax business revenue from indirect tax remittances collected on behalf of revenue authorities.',
    assumptions: 'Assumes standard single-rate VAT taxation applies uniformly without reverse-charge mechanisms.',
    limitations: 'Does not apply cross-border EU OSS (One Stop Shop) rules or specialized reduced tax exemptions.',
    faqs: [
      { question: 'Who pays the VAT?', answer: 'VAT is ultimately borne by the final consumer, while registered businesses collect and remit the net tax difference to the government.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب قيمة ضريبة القيمة المضافة (VAT) بدقة وإجمالي المبلغ المستحق شاملاً الضريبة على المعاملات التجارية.`,
    howToUse: [
      'أدخل المبلغ الأساسي الصافي قبل احتساب الضريبة.',
      'أدخل نسبة ضريبة القيمة المضافة القانونية المطبقة.',
      'راجع مبلغ الضريبة المحسوب والمبلغ الإجمالي النهائي شاملاً الضريبة.'
    ],
    formula: 'قيمة الضريبة = (المبلغ الصافي × النسبة) / 100 | الإجمالي مع الضريبة = المبلغ الصافي + قيمة الضريبة',
    formulaVariables: [
      { name: 'المبلغ الصافي', description: 'قيمة الفاتورة أو السلعة قبل الضريبة.', unit: 'عملة ($)', optional: false },
      { name: 'نسبة الضريبة', description: 'النسبة المئوية لضريبة القيمة المضافة.', unit: 'نسبة مئوية (%)', optional: false }
    ],
    workedExample: {
      scenario: 'تطبيق ضريبة قيمة مضافة بنسبة 15% على فاتورة صافية بقيمة 100.00 ريال.',
      stepByStep: [
        'المبلغ الصافي: 100.00 ريال، نسبة الضريبة: 15%.',
        'حساب مبلغ الضريبة: (100.00 × 15) ÷ 100 = 15.00 ريال.',
        'حساب الإجمالي النهائي: 100.00 + 15.00 = 115.00 ريال.'
      ],
      result: 'مبلغ الضريبة (15%): 15.00 | الإجمالي شامل الضريبة: 115.00'
    },
    interpretation: 'تحدد بدقة المبالغ الواجب توريدها لهيئة الزكاة والضريبة والجمارك وتفصلها عن الإيرادات الفعلية.',
    assumptions: 'تفترض خضوع المعاملة للنسبة الضريبية الأساسية دون إعفاءات خاصة.',
    limitations: 'لا تطبق آليات الاحتساب العكسي للشركات في التجارة الدولية البينية.',
    faqs: [
      { question: 'من يتحمل ضريبة القيمة المضافة؟', answer: 'يتحملها المستهلك النهائي في نهاية سلسلة التوريد، بينما تقوم المنشآت بتحصيلها وتوريدها للجهات الحكومية.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el importe exacto de la cuota de IVA y el precio total bruto para cualquier importe base facturado.`,
    howToUse: [
      'Introduzca la base imponible o importe neto.',
      'Introduzca el tipo de IVA aplicable en porcentaje.',
      'Revise el desglose de la cuota de IVA y el total final con IVA incluido.'
    ],
    formula: 'Cuota IVA = (Neto × Tasa) / 100 | Total con IVA = Neto + Cuota IVA',
    formulaVariables: [
      { name: 'Base imponible', description: 'Importe de la factura antes de impuestos.', unit: 'Moneda ($ / €)', optional: false },
      { name: 'Tipo de IVA', description: 'Porcentaje oficial de IVA aplicable.', unit: 'Porcentaje (%)', optional: false }
    ],
    workedExample: {
      scenario: 'Aplicación de un tipo del 15% de IVA a una base imponible de 100,00 €.',
      stepByStep: [
        'Base imponible: 100,00 €, Tipo de IVA: 15 %.',
        'Cuota tributaria: (100,00 × 15) / 100 = 15,00 €.',
        'Total con IVA: 100,00 € + 15,00 € = 115,00 €.'
      ],
      result: 'Cuota de IVA: 15,00 € | Total con IVA: 115,00 €'
    },
    interpretation: 'Permite desglosar las obligaciones fiscales comerciales y separar los ingresos propios del tributo a ingresar.',
    assumptions: 'Aplica un tipo único sin recargo de equivalencia adicional.',
    limitations: 'No gestiona operaciones intracomunitarias exentas con inversión del sujeto pasivo.',
    faqs: [
      { question: '¿Qué es el IVA soportado y repercutido?', answer: 'El IVA repercutido es el cobrado a clientes y el soportado es el pagado a proveedores; la diferencia se liquida ante Hacienda.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule le montant de la TVA et le total TTC pour tout montant de facture hors taxes.`,
    howToUse: [
      'Indiquez le montant hors taxes (HT) de base.',
      'Indiquez le taux légal de TVA applicable.',
      'Visualisez le montant de la TVA calculée et le montant final toutes taxes comprises (TTC).'
    ],
    formula: 'Montant TVA = (Montant HT × Taux) / 100 | Montant TTC = Montant HT + Montant TVA',
    formulaVariables: [
      { name: 'Montant HT', description: 'Base imposable de la transaction commerciale.', unit: 'Devise (€ / $)', optional: false },
      { name: 'Taux de TVA', description: 'Taux légal de taxe sur la valeur ajoutée.', unit: 'Pourcentage (%)', optional: false }
    ],
    workedExample: {
      scenario: 'Application d\'un taux de TVA de 15% sur une facture nette de 100,00 € HT.',
      stepByStep: [
        'Montant HT : 100,00 €, Taux : 15 %.',
        'Montant de TVA : (100,00 × 15) / 100 = 15,00 €.',
        'Montant total TTC : 100,00 € + 15,00 € = 115,00 €.'
      ],
      result: 'Montant de TVA (15%) : 15,00 € | Total TTC : 115,00 €'
    },
    interpretation: 'Isole la part collectée pour le Trésor public des recettes réelles de l\'entreprise.',
    assumptions: 'Régime de droit commun sans franchise en base de TVA.',
    limitations: 'Ne gère pas l\'autoliquidation de la TVA intracommunautaire.',
    faqs: [
      { question: 'Comment s\'effectue la déduction de TVA ?', answer: 'Les entreprises déduisent la TVA acquittée sur leurs achats de la TVA collectée sur leurs ventes avant versement du solde.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die exakte Mehrwertsteuer und den Bruttorechnungsbetrag für jeden vorgegebenen Nettowarenwert.`,
    howToUse: [
      'Geben Sie den Nettobetrag ohne Umsatzsteuer ein.',
      'Geben Sie den maßgeblichen Mehrwertsteuersatz in Prozent ein.',
      'Prüfen Sie den Steuerbetrag und den resultierenden Rechnungs-Bruttobetrag.'
    ],
    formula: 'Umsatzsteuer = (Nettobetrag × Steuersatz) / 100 | Bruttobetrag = Nettobetrag + Umsatzsteuer',
    formulaVariables: [
      { name: 'Nettobetrag', description: 'Rechnungswert vor Umsatzsteuer.', unit: 'Währung (€ / $)', optional: false },
      { name: 'Steuersatz', description: 'Gültiger Umsatzsteuersatz in Prozent.', unit: 'Prozent (%)', optional: false }
    ],
    workedExample: {
      scenario: 'Berechnung von 15 % Mehrwertsteuer auf einen Nettobetrag von 100,00 €.',
      stepByStep: [
        'Nettobetrag: 100,00 €, Steuersatz: 15 %.',
        'Steuerbetrag: (100,00 × 15) / 100 = 15,00 €.',
        'Brutto-Gesamtbetrag: 100,00 € + 15,00 € = 115,00 €.'
      ],
      result: 'Mehrwertsteuer (15%): 15,00 € | Rechnungsbetrag brutto: 115,00 €'
    },
    interpretation: 'Trennt den betrieblichen Umsatz sauber von der treuhänderisch für das Finanzamt vereinnahmten Vorsteuer.',
    assumptions: 'Regelbesteuerung ohne Anwendung der Kleinunternehmerregelung.',
    limitations: 'Keine automatische Prüfung von Reverse-Charge-Verfahren im grenzüberschreitenden B2B-Verkehr.',
    faqs: [
      { question: 'Wer zahlt die Mehrwertsteuer?', answer: 'Die Steuer zahlt der Endverbraucher; Unternehmen leiten die Differenz aus vereinnahmter Umsatzsteuer und gezahlter Vorsteuer an das Finanzamt weiter.' }
    ],
    relatedTools
  })
});

// Map of all 9 Batch 1 finance group 2 tools
export const BATCH1_FINANCE2_HANDLERS: Record<string, Record<Language, KnowledgeHandler>> = {
  markup: MARKUP_KNOWLEDGE,
  'net-worth': NET_WORTH_KNOWLEDGE,
  'debt-payoff': DEBT_PAYOFF_KNOWLEDGE,
  'break-even': BREAK_EVEN_KNOWLEDGE,
  'dividend-yield': DIVIDEND_YIELD_KNOWLEDGE,
  'inflation-impact': INFLATION_IMPACT_KNOWLEDGE,
  'freelance-rate': FREELANCE_RATE_KNOWLEDGE,
  'rental-yield': RENTAL_YIELD_KNOWLEDGE,
  'vat-tax': VAT_TAX_KNOWLEDGE,
};
