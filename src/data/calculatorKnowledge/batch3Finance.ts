import { ToolDef, Language } from '../../types';
import { ToolContentDetails } from './types';

type KnowledgeHandler = (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails;

function createKnowledge(dataByLang: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails>): Record<Language, KnowledgeHandler> {
  return dataByLang;
}

// 1. ROI CALCULATOR (roi-calculator)
export const ROI_CALCULATOR_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates total Return on Investment (ROI) percentage, net profit, and annualized return across investment horizons.`,
    howToUse: [
      'Enter the initial investment amount invested at inception.',
      'Enter the final returned value or selling proceeds.',
      'Specify any additional dividends, yields, or maintenance costs.',
      'Enter the holding period in years to compute the annualized rate of return.'
    ],
    formula: 'ROI (%) = [(Final Value - Initial Cost) / Initial Cost] × 100',
    formulaVariables: [
      { name: 'Initial Cost', description: 'Total capital invested initially.', unit: 'Currency', optional: false },
      { name: 'Final Value', description: 'Total ending proceeds or portfolio value.', unit: 'Currency', optional: false },
      { name: 'Holding Period (t)', description: 'Investment duration for annualized ROI calculation.', unit: 'Years', optional: true }
    ],
    workedExample: {
      scenario: 'An asset purchased for $12,000 is sold after 3 years for $18,000.',
      stepByStep: [
        'Net Profit = $18,000 - $12,000 = $6,000.',
        'Total ROI = ($6,000 / $12,000) × 100 = 50.0%.',
        'Annualized ROI = [(1 + 0.50)^(1 / 3) - 1] × 100 = (1.1447 - 1) × 100 = 14.47% per year.'
      ],
      result: 'Total ROI = 50.00% | Net Profit = $6,000.00 | Annualized ROI = 14.47%/yr'
    },
    interpretation: 'A positive ROI reflects net capital growth, whereas an annualized rate allows standardized comparisons between investments held for different timeframes.',
    assumptions: 'Assumes immediate reinvestment and does not account for capital gains taxes or broker commissions unless deducted from the final value.',
    limitations: 'Does not quantify downside volatility, drawdown risk, or liquidity constraints.',
    faqs: [
      { question: 'What is the difference between simple ROI and annualized ROI?', answer: 'Simple ROI measures total cumulative return regardless of holding time, while annualized ROI expresses compound annual growth rate per 12-month period.' },
      { question: 'Can ROI be negative?', answer: 'Yes, if the final value is less than the initial purchase price, resulting in a capital loss.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب النسبة المئوية للعائد على الاستثمار (ROI)، وصافي الربح المحقق، ومعدل العائد السنوي المركب على رأس المال.`,
    howToUse: [
      'أدخل قيمة رأس المال المستثمر في البداية.',
      'أدخل القيمة الإجمالية عند التخارج أو البيع.',
      'أدخل تكاليف الصيانة أو التوزيعات المستلمة إن وجدت.',
      'حدد فترة الاحتفاظ بالسنوات لحساب العائد السنوي.'
    ],
    formula: 'العائد على الاستثمار (%) = [(القيمة النهائية - تكلفة الاستثمار) ÷ تكلفة الاستثمار] × 100',
    formulaVariables: [
      { name: 'تكلفة الاستثمار', description: 'رأس المال الأولي المستثمر.', unit: 'عملة', optional: false },
      { name: 'القيمة النهائية', description: 'القيمة الإجمالية عند البيع أو التقييم الحالي.', unit: 'عملة', optional: false },
      { name: 'مدة الاستثمار', description: 'فترة الاحتفاظ بالسنوات.', unit: 'سنوات', optional: true }
    ],
    workedExample: {
      scenario: 'شراء أصل بمبلغ 12,000 دولار وبيعه بعد 3 سنوات بمبلغ 18,000 دولار.',
      stepByStep: [
        'صافي الربح = 18,000 - 12,000 = 6,000 دولار.',
        'العائد الإجمالي = (6,000 ÷ 12,000) × 100 = 50.0%.',
        'العائد السنوي = [(1 + 0.50)^(1 ÷ 3) - 1] × 100 = 14.47% سنوياً.'
      ],
      result: 'العائد الإجمالي = 50.00% | صافي الربح = 6,000.00 دولار | العائد السنوي = 14.47%/سنة'
    },
    interpretation: 'يعبر العائد الموجب عن نمو رأس المال، بينما يتيح العائد السنوي المقارنة العادلة بين أصول ذات فترات زمنية متفاوتة.',
    assumptions: 'يفترض ثبات معدل التراكم ولا يخصم الضرائب أو العمولات تلقائياً ما لم يتم إدراجها.',
    limitations: 'لا يقيس حجم المخاطر أو تقلبات الأسعار خلال فترة الاحتفاظ.',
    faqs: [
      { question: 'ما الفرق بين العائد البسيط والعائد السنوي؟', answer: 'العائد البسيط يقيس النسبة التراكمية الكلية، بينما يقيس العائد السنوي معدل النمو المركب لكل سنة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el porcentaje de Retorno de Inversión (ROI), la ganancia neta y el rendimiento anualizado de cualquier activo financiero o proyecto.`,
    howToUse: [
      'Ingrese el monto de la inversión inicial desembolsada.',
      'Ingrese el valor final de venta o tasación actual.',
      'Especifique costos operativos o dividendos adicionales.',
      'Defina el plazo en años para calcular el ROI anualizado.'
    ],
    formula: 'ROI (%) = [(Valor Final - Inversión Inicial) / Inversión Inicial] × 100',
    formulaVariables: [
      { name: 'Inversión Inicial', description: 'Capital inicial invertido.', unit: 'Moneda', optional: false },
      { name: 'Valor Final', description: 'Importe obtenido al liquidar el activo.', unit: 'Moneda', optional: false },
      { name: 'Plazo (años)', description: 'Período de tenencia.', unit: 'Años', optional: true }
    ],
    workedExample: {
      scenario: 'Inversión inicial de $12,000 vendida tras 3 años por $18,000.',
      stepByStep: [
        'Beneficio neto = $18,000 - $12,000 = $6,000.',
        'ROI total = ($6,000 / $12,000) × 100 = 50.0%.',
        'ROI anualizado = [(1 + 0.50)^(1 / 3) - 1] × 100 = 14.47% anual.'
      ],
      result: 'ROI Total = 50.00% | Beneficio Neto = $6,000.00 | ROI Anualizado = 14.47%/año'
    },
    interpretation: 'Un ROI positivo indica creación de valor y el ROI anualizado normaliza los resultados para comparar inversiones con duraciones distintas.',
    assumptions: 'No deduce impuestos sobre plusvalías salvo que se descuenten del valor final.',
    limitations: 'No evalúa la volatilidad del activo ni los riesgos de iliquidez.',
    faqs: [
      { question: '¿Puede el ROI ser negativo?', answer: 'Sí, cuando el valor de liquidación es inferior al capital invertido original.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule le retour sur investissement (ROI), le bénéfice net réalisé et le taux de rendement annualisé d'un placement ou projet commercial.`,
    howToUse: [
      'Indiquez le montant du capital initialement investi.',
      'Indiquez la valeur finale de revente ou d’évaluation.',
      'Intégrez les coûts d’entretien ou dividendes perçus.',
      'Précisez la durée de détention en années pour le calcul annualisé.'
    ],
    formula: 'ROI (%) = [(Valeur Finale - Coût Initial) / Coût Initial] × 100',
    formulaVariables: [
      { name: 'Coût Initial', description: 'Montant du capital initial.', unit: 'Devise', optional: false },
      { name: 'Valeur Finale', description: 'Valeur totale de sortie ou de revente.', unit: 'Devise', optional: false },
      { name: 'Durée (années)', description: 'Période de détention.', unit: 'Années', optional: true }
    ],
    workedExample: {
      scenario: 'Un investissement de 12 000 $ revendu au bout de 3 ans pour 18 000 $.',
      stepByStep: [
        'Gain net = 18 000 $ - 12 000 $ = 6 000 $.',
        'ROI cumulé = (6 000 $ / 12 000 $) × 100 = 50,0 %.',
        'ROI annualisé = [(1 + 0,50)^(1 / 3) - 1] × 100 = 14,47 % par an.'
      ],
      result: 'ROI Total = 50,00 % | Gain Net = 6 000,00 $ | ROI Annualisé = 14,47 %/an'
    },
    interpretation: 'Un ROI positif indique une plus-value financière, permettant d’évaluer la rentabilité d’un actif face à d’autres opportunités.',
    assumptions: 'Suppose une conservation intégrale sans prise en compte des impôts sur les plus-values.',
    limitations: 'N’intègre pas le niveau de risque ni les fluctuations de marché intermédiaires.',
    faqs: [
      { question: 'Pourquoi calculer le ROI annualisé ?', answer: 'Il permet de comparer rigoureusement des investissements détenus sur des durées différentes.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die Gesamtkapitalrendite (ROI), den Nettogewinn sowie die annualisierte Rendite für Investitionen und Geschäftsprojekte.`,
    howToUse: [
      'Geben Sie das anfänglich eingesetzte Investitionskapital ein.',
      'Geben Sie den Verkaufserlös oder Endwert der Anlage ein.',
      'Berücksichtigen Sie etwaige Dividenden oder Betriebskosten.',
      'Geben Sie die Haltedauer in Jahren für die annualisierte Rendite ein.'
    ],
    formula: 'ROI (%) = [(Endwert - Anfangsinvestition) / Anfangsinvestition] × 100',
    formulaVariables: [
      { name: 'Anfangsinvestition', description: 'Ursprünglich eingesetztes Kapital.', unit: 'Währung', optional: false },
      { name: 'Endwert', description: 'Gesamtertrag bei Veräußerung.', unit: 'Währung', optional: false },
      { name: 'Haltedauer', description: 'Anlagehorizont in Jahren.', unit: 'Jahre', optional: true }
    ],
    workedExample: {
      scenario: 'Kauf eines Vermögenswerts für 12.000 $ und Verkauf nach 3 Jahren für 18.000 $.',
      stepByStep: [
        'Nettogewinn = 18.000 $ - 12.000 $ = 6.000 $.',
        'Gesamter ROI = (6.000 $ / 12.000 $) × 100 = 50,0 %.',
        'Annualisierter ROI = [(1 + 0,50)^(1 / 3) - 1] × 100 = 14,47 % pro Jahr.'
      ],
      result: 'Gesamt-ROI = 50,00 % | Nettogewinn = 6.000,00 $ | Annualisierter ROI = 14,47 %/Jahr'
    },
    interpretation: 'Ein positiver ROI kennzeichnet Kapitalzuwachs und der annualisierte Wert schafft Vergleichbarkeit über unterschiedliche Zeiträume.',
    assumptions: 'Zinserträge oder Reinvestitionen ohne steuerliche Abzüge.',
    limitations: 'Spiegelt keine Zwischenrisiken oder Liquiditätsengpässe wider.',
    faqs: [
      { question: 'Was bedeutet ein negativer ROI?', answer: 'Ein negativer ROI bedeutet, dass die Anlage mit einem Kapitalverlust geendet hat.' }
    ],
    relatedTools
  })
});

// 2. FREELANCE RATE CALCULATOR (freelance-rate-calc)
export const FREELANCE_RATE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates the minimum billable hourly rate required for freelancers to achieve target net income after business expenses, non-billable hours, and taxes.`,
    howToUse: [
      'Enter your desired annual personal take-home income.',
      'Enter your estimated annual business operating expenses (software, equipment, insurance).',
      'Specify self-employment tax and health insurance allowance percentages.',
      'Input billable hours per week and planned vacation weeks per year.'
    ],
    formula: 'Hourly Rate = (Target Net Income + Annual Expenses + Taxes) / Annual Billable Hours',
    formulaVariables: [
      { name: 'Target Income', description: 'Annual desired personal salary.', unit: 'Currency', optional: false },
      { name: 'Business Expenses', description: 'Annual overhead and subscriptions.', unit: 'Currency', optional: false },
      { name: 'Billable Hours/Week', description: 'Client-facing billable working hours.', unit: 'Hours/Week', optional: false },
      { name: 'Work Weeks/Year', description: '52 weeks minus planned vacation/holidays.', unit: 'Weeks', optional: false }
    ],
    workedExample: {
      scenario: 'Freelancer wants $80,000 personal income with $12,000 expenses, 25% tax buffer, working 25 billable hours/week across 48 weeks.',
      stepByStep: [
        'Total Gross Target = ($80,000 + $12,000) / (1 - 0.25) = $92,000 / 0.75 = $122,667.',
        'Annual Billable Hours = 25 hours/week × 48 weeks = 1,200 hours.',
        'Required Hourly Rate = $122,667 / 1,200 hours = $102.22/hour.'
      ],
      result: 'Target Hourly Rate = $102.22/hr | Day Rate (8h) = $817.78 | Gross Revenue = $122,667/yr'
    },
    interpretation: 'Ensures freelancers do not undercharge by accounting for unbillable admin time, paid time off, and business overhead.',
    assumptions: 'Assumes consistent client utilization throughout the 48 active working weeks.',
    limitations: 'Market rates and client price sensitivity may require adjustments based on niche expertise.',
    faqs: [
      { question: 'Why are billable hours usually lower than 40 hours per week?', answer: 'Freelancers spend 25% to 40% of their workweek on non-billable tasks such as marketing, invoicing, client communication, and administration.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب سعر الساعة المستهدف للعمل الحر والمستقلين لتحقيق الدخل السنوي المنشود بعد احتساب النفقات التشغيلية والضرائب وساعات العمل غير المدفوعة.`,
    howToUse: [
      'أدخل صافي الدخل السنوي المطلوب تحقيقه.',
      'أدخل التكاليف السنوية للعمل (برمجيات، أجهزة، اشتراكات، تأمين).',
      'حدد نسبة الضرائب المتوقعة والتأمين الصحي.',
      'حدد ساعات العمل الفعلية القابلة للفوترة أسبوعياً وأسابيع الإجازات السنوية.'
    ],
    formula: 'سعر الساعة = (الدخل المستهدف + النفقات السنوية + الضرائب) ÷ إجمالي الساعات القابلة للفوترة',
    formulaVariables: [
      { name: 'الدخل المستهدف', description: 'الراتب السنوي الشخصي المطلوب.', unit: 'عملة', optional: false },
      { name: 'النفقات التشغيلية', description: 'مصاريف العمل والاشتراكات السنوية.', unit: 'عملة', optional: false },
      { name: 'ساعات العمل المفوترة', description: 'ساعات العمل المباشرة للعملاء أسبوعياً.', unit: 'ساعة/أسبوع', optional: false },
      { name: 'أسابيع العمل الفعلية', description: '52 أسبوعاً مطروحاً منها الإجازات.', unit: 'أسبوع', optional: false }
    ],
    workedExample: {
      scenario: 'مستقل يستهدف 80,000 دولار كدخل صافٍ، مع 12,000 دولار نفقات، ومعدل ضريبي 25%، ويعمل 25 ساعة مفوترة أسبوعياً على مدار 48 أسبوعاً.',
      stepByStep: [
        'الإيراد الإجمالي المطلوب = (80,000 + 12,000) ÷ 0.75 = 122,667 دولار.',
        'إجمالي الساعات السنوية = 25 × 48 = 1,200 ساعة.',
        'سعر الساعة المطلوب = 122,667 ÷ 1,200 = 102.22 دولار/ساعة.'
      ],
      result: 'سعر الساعة المستهدف = 102.22 دولار/ساعة | اليومية (8 ساعات) = 817.78 دولار'
    },
    interpretation: 'يحمي المستقل من تسعير خدماته بأقل من قيمتها عبر تضمين تكاليف الإجازات والمهام الإدارية.',
    assumptions: 'يفترض استقرار الطلب وتدفق المشاريع طوال أسابيع العمل المحددة.',
    limitations: 'قد تتطلب الأسعار مواءمة مع متوسطات السوق التنافسية.',
    faqs: [
      { question: 'لماذا تقل ساعات الفوترة عن 40 ساعة أسبوعياً؟', answer: 'يقضي المستقل جزءاً كبيراً من وقته في التسويق والتواصل مع العملاء والمحاسبة غير المدفوعة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la tarifa por hora mínima facturable para freelancers, cubriendo ingresos netos deseados, gastos operativos e impuestos.`,
    howToUse: [
      'Ingrese el ingreso neto anual que desea ganar.',
      'Añada los gastos comerciales anuales estimados (software, seguro, equipos).',
      'Defina el porcentaje estimado para impuestos.',
      'Indique las horas facturables semanales y semanas de vacaciones previstas.'
    ],
    formula: 'Tarifa Horaria = (Ingreso Objetivo + Gastos + Impuestos) / Horas Facturables Anuales',
    formulaVariables: [
      { name: 'Ingreso Neto', description: 'Salario personal deseado.', unit: 'Moneda', optional: false },
      { name: 'Gastos Comerciales', description: 'Costos fijos anuales del negocio.', unit: 'Moneda', optional: false },
      { name: 'Horas Facturables/Semana', description: 'Horas dedicadas a proyectos de clientes.', unit: 'Horas/Semana', optional: false }
    ],
    workedExample: {
      scenario: 'Ingreso objetivo de $80,000, gastos de $12,000, 25% impuestos, 25 horas facturables/semana durante 48 semanas.',
      stepByStep: [
        'Ingresos brutos necesarios = ($80,000 + $12,000) / 0.75 = $122,667.',
        'Horas facturables anuales = 25 × 48 = 1,200 horas.',
        'Tarifa horaria = $122,667 / 1,200 = $102.22/hora.'
      ],
      result: 'Tarifa por Hora = $102.22/h | Tarifa Diaria = $817.78 | Facturación Bruta = $122,667/año'
    },
    interpretation: 'Asegura la sostenibilidad económica del profesional independiente cubriendo tiempos no facturables.',
    assumptions: 'Asume captación regular de clientes durante las semanas activas.',
    limitations: 'Debe contrastarse con la demanda del sector y la experiencia.',
    faqs: [
      { question: '¿Qué porcentaje del tiempo suele ser facturable?', answer: 'Normalmente entre el 50% y el 70% del tiempo laboral total de un freelancer.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} détermine le taux horaire minimum et le taux journalier moyen (TJM) d'un travailleur indépendant pour atteindre ses objectifs financiers.`,
    howToUse: [
      'Indiquez le revenu net annuel souhaité.',
      'Saisissez vos frais professionnels annuels (abonnements, matériel, assurances).',
      'Précisez la provision pour charges sociales et fiscales.',
      'Renseignez les heures facturables par semaine et semaines de congés.'
    ],
    formula: 'Taux Horaire = (Revenu Cible + Frais + Charges) / Heures Facturables Annuelles',
    formulaVariables: [
      { name: 'Revenu Cible', description: 'Rémunération nette personnelle annuelle.', unit: 'Devise', optional: false },
      { name: 'Frais Professionnels', description: 'Dépenses annuelles de fonctionnement.', unit: 'Devise', optional: false },
      { name: 'Heures Facturables', description: 'Temps hebdomadaire facturé aux clients.', unit: 'Heures/Semaine', optional: false }
    ],
    workedExample: {
      scenario: 'Objectif de 80 000 $ nets, 12 000 $ de charges fixes, 25 % d’impôts, 25 h facturables/semaine sur 48 semaines.',
      stepByStep: [
        'Chiffre d’affaires brut requis = (80 000 $ + 12 000 $) / 0,75 = 122 667 $.',
        'Heures facturables annuelles = 25 × 48 = 1 200 h.',
        'Taux horaire = 122 667 $ / 1 200 h = 102,22 $/heure.'
      ],
      result: 'Taux Horaire = 102,22 $/h | TJM (8 h) = 817,78 $ | CA Annuel = 122 667 $'
    },
    interpretation: 'Permet de fixer des devis rentables intégrant la prospection, l’administratif et les congés payés.',
    assumptions: 'Suppose une facturation continue sur 48 semaines effectives.',
    limitations: 'Doit être ajusté selon la pression concurrentielle du marché.',
    faqs: [
      { question: 'Comment passer du taux horaire au TJM ?', answer: 'Multipliez le taux horaire par le nombre d’heures standard d’une journée de travail (généralement 7 ou 8 heures).' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} kalkuliert den erforderlichen Netto- und Brutto-Stundensatz für Freiberufler unter Berücksichtigung von Betriebsausgaben, Steuern und unbezahlten Zeiten.`,
    howToUse: [
      'Geben Sie Ihr gewünschtes jährliches Nettoeinkommen ein.',
      'Geben Sie die geschätzten geschäftlichen Jahresausgaben ein.',
      'Legen Sie den Steuer- und Vorsorgesatz fest.',
      'Bestimmen Sie die abrechenbaren Wochenstunden und Urlaubswochen.'
    ],
    formula: 'Stundensatz = (Wunscheinkommen + Ausgaben + Steuern) / Abrechenbare Jahresstunden',
    formulaVariables: [
      { name: 'Wunscheinkommen', description: 'Angestrebtes persönliches Jahresgehalt.', unit: 'Währung', optional: false },
      { name: 'Betriebsausgaben', description: 'Laufende Geschäftskosten.', unit: 'Währung', optional: false },
      { name: 'Abrechenbare Stunden', description: 'Kundenprojekte pro Woche.', unit: 'Stunden/Woche', optional: false }
    ],
    workedExample: {
      scenario: '80.000 $ Nettoeinkommen, 12.000 $ Ausgaben, 25 % Steuerabzug, 25 abrechenbare Std./Woche bei 48 Arbeitswochen.',
      stepByStep: [
        'Erforderlicher Bruttoumsatz = (80.000 $ + 12.000 $) / 0,75 = 122.667 $.',
        'Abrechenbare Jahresstunden = 25 × 48 = 1.200 Stunden.',
        'Stundensatz = 122.667 $ / 1.200 Std. = 102,22 $/Stunde.'
      ],
      result: 'Stundensatz = 102,22 $/Std. | Tagessatz (8 Std.) = 817,78 $ | Jahresumsatz = 122.667 $'
    },
    interpretation: 'Verhindert Unterdeckung durch Einbeziehung von Akquise, Buchhaltung und Urlaubszeiten.',
    assumptions: 'Gleichmäßige Auslastung über die 48 aktiven Wochen.',
    limitations: 'Branchenübliche Höchstsätze müssen beachtet werden.',
    faqs: [
      { question: 'Warum sind nicht alle 40 Wochenstunden abrechenbar?', answer: 'Freiberufler verwenden 30-40 % ihrer Arbeitszeit für administrative Aufgaben und Vertrieb.' }
    ],
    relatedTools
  })
});

// 3. BREAK-EVEN POINT (break-even-point)
export const BREAK_EVEN_POINT_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates the exact sales volume in units and total revenue required for a business to cover all fixed and variable costs with zero profit/loss.`,
    howToUse: [
      'Enter total recurring fixed costs (rent, salaries, software).',
      'Enter the selling price per individual unit.',
      'Enter the variable cost incurred to produce or deliver one unit.',
      'Review the break-even unit threshold and total break-even revenue.'
    ],
    formula: 'Break-Even Units = Fixed Costs / (Price per Unit - Variable Cost per Unit)',
    formulaVariables: [
      { name: 'Fixed Costs (FC)', description: 'Total baseline operating expenses independent of output.', unit: 'Currency', optional: false },
      { name: 'Selling Price (P)', description: 'Revenue received per unit sold.', unit: 'Currency/Unit', optional: false },
      { name: 'Variable Cost (VC)', description: 'Direct cost to produce each unit.', unit: 'Currency/Unit', optional: false }
    ],
    workedExample: {
      scenario: 'A company has $30,000 monthly fixed costs, sells product for $50/unit with $20/unit variable cost.',
      stepByStep: [
        'Contribution Margin per Unit = $50 - $20 = $30/unit.',
        'Contribution Margin Ratio = $30 / $50 = 60.0%.',
        'Break-Even Units = $30,000 / $30 = 1,000 units.',
        'Break-Even Revenue = 1,000 units × $50 = $50,000.'
      ],
      result: 'Break-Even Units = 1,000 units | Break-Even Revenue = $50,000.00 | Contribution Margin = 60.00%'
    },
    interpretation: 'Identifies the minimum commercial milestone needed before a product or business model becomes profitable.',
    assumptions: 'Assumes linear cost curves and constant selling prices across production volume.',
    limitations: 'Does not account for bulk purchase supplier discounts or tiered pricing structures.',
    faqs: [
      { question: 'What is the contribution margin?', answer: 'The contribution margin represents the remaining revenue per unit sold after covering variable costs, which goes toward paying fixed expenses.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب نقطة التعادل بالوحدات وقيمة المبيعات الإجمالية المطلوبة لتغطية كافة التكاليف الثابتة والمتغيرة دون تحقيق ربح أو خسارة.`,
    howToUse: [
      'أدخل إجمالي التكاليف الثابتة (الإيجار، الرواتب، التراخيص).',
      'أدخل سعر بيع الوحدة الواحدة.',
      'أدخل التكلفة المتغيرة لإنتاج الوحدة.',
      'اطلع على عدد الوحدات وحجم الإيرادات اللازم لبدء تحقيق الأرباح.'
    ],
    formula: 'نقطة التعادل بالوحدات = التكاليف الثابتة ÷ (سعر بيع الوحدة - التكلفة المتغيرة للوحدة)',
    formulaVariables: [
      { name: 'التكاليف الثابتة', description: 'المصاريف التشغيلية الثابتة.', unit: 'عملة', optional: false },
      { name: 'سعر بيع الوحدة', description: 'إيراد بيع الوحدة.', unit: 'عملة/وحدة', optional: false },
      { name: 'التكلفة المتغيرة', description: 'تكلفة المواد المباشرة للوحدة.', unit: 'عملة/وحدة', optional: false }
    ],
    workedExample: {
      scenario: 'تكاليف ثابتة 30,000 دولار شهرياً، سعر بيع 50 دولار، وتكلفة متغيرة 20 دولار للوحدة.',
      stepByStep: [
        'هامش المساهمة للوحدة = 50 - 20 = 30 دولار/وحدة.',
        'نسبة هامش المساهمة = 30 ÷ 50 = 60%.',
        'وحدات التعادل = 30,000 ÷ 30 = 1,000 وحدة.',
        'إيراد التعادل = 1,000 × 50 = 50,000 دولار.'
      ],
      result: 'وحدات التعادل = 1,000 وحدة | إيرادات التعادل = 50,000.00 دولار'
    },
    interpretation: 'تحدد الحد الأدنى من النشاط التجاري المطلوب لتفادي الخسائر المالية.',
    assumptions: 'تفترض ثبات الأسعار والتكاليف مع زيادة كميات الإنتاج.',
    limitations: 'لا تراعي الخصومات الكمية على المشتريات الضخمة.',
    faqs: [
      { question: 'ما هو هامش المساهمة؟', answer: 'هو الجزء المتبقي من سعر بيع الوحدة بعد تغطية تكاليفها المتغيرة للمساهمة في تغطية المصاريف الثابتة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el punto de equilibrio en unidades e ingresos necesarios para cubrir todos los costos fijos y variables sin generar pérdidas.`,
    howToUse: [
      'Ingrese los costos fijos totales periódicos.',
      'Ingrese el precio de venta unitario.',
      'Ingrese el costo variable unitario de fabricación o servicio.',
      'Analice las unidades requeridas y la facturación de equilibrio.'
    ],
    formula: 'Punto de Equilibrio = Costos Fijos / (Precio Unitario - Costo Variable Unitario)',
    formulaVariables: [
      { name: 'Costos Fijos', description: 'Gastos estructurales periódicos.', unit: 'Moneda', optional: false },
      { name: 'Precio Unitario', description: 'Precio de venta al público.', unit: 'Moneda/Unidad', optional: false },
      { name: 'Costo Variable', description: 'Costo marginal por unidad producida.', unit: 'Moneda/Unidad', optional: false }
    ],
    workedExample: {
      scenario: 'Costos fijos de $30,000, precio de $50/unidad, costo variable de $20/unidad.',
      stepByStep: [
        'Margen de contribución = $50 - $20 = $30/unidad.',
        'Unidades de equilibrio = $30,000 / $30 = 1,000 unidades.',
        'Ingreso de equilibrio = 1,000 × $50 = $50,000.'
      ],
      result: 'Unidades de Equilibrio = 1,000 unidades | Facturación = $50,000.00'
    },
    interpretation: 'Muestra la meta operativa mínima indispensable antes de obtener beneficios netos.',
    assumptions: 'Comportamiento de costos lineal y precios fijos.',
    limitations: 'No incluye descuentos escalonados por volumen.',
    faqs: [
      { question: '¿Qué es el margen de contribución?', answer: 'Es el beneficio por unidad que contribuye a amortizar los gastos fijos del negocio.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule le seuil de rentabilité en volume (unités) et en valeur (chiffre d'affaires) pour atteindre l'équilibre financier.`,
    howToUse: [
      'Saisissez l’ensemble des charges fixes de l’entreprise.',
      'Indiquez le prix de vente unitaire du produit ou service.',
      'Indiquez le coût de revient variable unitaire.',
      'Consultez le nombre d’unités et le chiffre d’affaires du point mort.'
    ],
    formula: 'Seuil (Unités) = Charges Fixes / (Prix Unitaire - Coût Variable Unitaire)',
    formulaVariables: [
      { name: 'Charges Fixes', description: 'Dépenses indépendantes du volume d’activité.', unit: 'Devise', optional: false },
      { name: 'Prix Unitaire', description: 'Prix de vente facturé.', unit: 'Devise/Unité', optional: false },
      { name: 'Coût Variable', description: 'Coût direct par unité vendue.', unit: 'Devise/Unité', optional: false }
    ],
    workedExample: {
      scenario: '30 000 $ de charges fixes, prix de 50 $/unité, coût variable de 20 $/unité.',
      stepByStep: [
        'Marge sur coût variable = 50 $ - 20 $ = 30 $/unité.',
        'Point mort en volume = 30 000 $ / 30 $ = 1 000 unités.',
        'Seuil de rentabilité en CA = 1 000 × 50 $ = 50 000 $.'
      ],
      result: 'Seuil de Rentabilité = 1 000 unités | CA Point Mort = 50 000,00 $'
    },
    interpretation: 'Indique le palier exact où l’entreprise cesse de perdre de l’argent et commence à dégager des bénéfices.',
    assumptions: 'Structure de coûts constante et prix de vente stables.',
    limitations: 'Ne prend pas en compte les économies d’échelle progressives.',
    faqs: [
      { question: 'Quelle est la différence entre seuil de rentabilité et point mort ?', answer: 'Le seuil de rentabilité s’exprime en montant de chiffre d’affaires, tandis que le point mort s’exprime souvent en jours ou dates calendaires.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} ermittelt den Break-Even-Point (Gewinnschwelle) in Absatzmenge und Umsatzerlös zur vollständigen Kostendeckung.`,
    howToUse: [
      'Geben Sie die gesamten periodischen Fixkosten ein.',
      'Geben Sie den Netto-Verkaufspreis pro Stück ein.',
      'Geben Sie die variablen Stückkosten ein.',
      'Lesen Sie die Gewinnschwelle in Einheiten und den Mindestumsatz ab.'
    ],
    formula: 'Break-Even (Menge) = Fixkosten / (Verkaufspreis - Variable Stückkosten)',
    formulaVariables: [
      { name: 'Fixkosten', description: 'Periodenbezogene Gemeinkosten.', unit: 'Währung', optional: false },
      { name: 'Verkaufspreis', description: 'Erlös pro verkaufter Einheit.', unit: 'Währung/Einheit', optional: false },
      { name: 'Variable Kosten', description: 'Direkte Grenzkosten je Einheit.', unit: 'Währung/Einheit', optional: false }
    ],
    workedExample: {
      scenario: '30.000 $ Fixkosten, 50 $ Verkaufspreis, 20 $ variable Kosten je Stück.',
      stepByStep: [
        'Deckungsbeitrag pro Stück = 50 $ - 20 $ = 30 $/Stück.',
        'Break-Even-Menge = 30.000 $ / 30 $ = 1.000 Stück.',
        'Break-Even-Umsatz = 1.000 × 50 $ = 50.000 $.'
      ],
      result: 'Break-Even-Absatz = 1.000 Stück | Mindestumsatz = 50.000,00 $'
    },
    interpretation: 'Bestimmt die betriebswirtschaftliche Mindestkapazität zur Vermeidung von Verlusten.',
    assumptions: 'Konstante Stückkosten und proportionale Kostenverläufe.',
    limitations: 'Ignoriert Mengendegressionen bei Massenproduktion.',
    faqs: [
      { question: 'Was zeigt der Deckungsbeitrag an?', answer: 'Der Deckungsbeitrag zeigt, welcher Betrag nach Abzug der variablen Kosten zur Deckung der Fixkosten verbleibt.' }
    ],
    relatedTools
  })
});

// 4. STOCK DIVIDEND YIELD (stock-dividend-yield)
export const STOCK_DIVIDEND_YIELD_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates the annual dividend yield percentage, projected annual cash flow income, and payout ratio for dividend-paying equity investments.`,
    howToUse: [
      'Enter the current stock price per share.',
      'Enter the annual dividend paid per share (or quarterly dividend multiplied by 4).',
      'Optionally enter total shares owned to compute annual portfolio dividend income.'
    ],
    formula: 'Dividend Yield (%) = (Annual Dividend per Share / Stock Price) × 100',
    formulaVariables: [
      { name: 'Stock Price', description: 'Current market quotation per share.', unit: 'Currency/Share', optional: false },
      { name: 'Annual Dividend', description: 'Total 12-month dividend distribution per share.', unit: 'Currency/Share', optional: false },
      { name: 'Shares Owned', description: 'Number of equity shares held in portfolio.', unit: 'Shares', optional: true }
    ],
    workedExample: {
      scenario: 'An investor holds 200 shares of a stock trading at $60.00 paying $2.40 annual dividend per share.',
      stepByStep: [
        'Dividend Yield = ($2.40 / $60.00) × 100 = 4.00%.',
        'Total Portfolio Value = 200 shares × $60.00 = $12,000.00.',
        'Annual Dividend Income = 200 shares × $2.40 = $480.00/year ($40.00/month).'
      ],
      result: 'Dividend Yield = 4.00% | Annual Dividend Income = $480.00 | Monthly Income = $40.00'
    },
    interpretation: 'Enables income investors to assess the cash flow productivity of dividend shares relative to bonds, savings accounts, and market averages.',
    assumptions: 'Assumes dividend payments remain constant and are not reduced by board action.',
    limitations: 'A very high dividend yield may signal a declining share price or an unsustainable corporate payout ratio.',
    faqs: [
      { question: 'Does dividend yield change when stock prices fluctuate?', answer: 'Yes, because stock prices move continuously, the yield moves inversely with market price changes.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب نسبة توزيعات الأرباح السنوية (Dividend Yield) وإجمالي الدخل الدوري المتوقع من الأسهم المدرجة.`,
    howToUse: [
      'أدخل سعر السهم الحالي في السوق.',
      'أدخل التوزيع النقدي السنوي للسهم الواحد.',
      'أدخل عدد الأسهم المملوكة لحساب إجمالي التدفق النقدي.'
    ],
    formula: 'عائد التوزيعات (%) = (التوزيع النقدي السنوي للسهم ÷ سعر السهم) × 100',
    formulaVariables: [
      { name: 'سعر السهم', description: 'القيمة السوقية الحالية للسهم.', unit: 'عملة/سهم', optional: false },
      { name: 'التوزيع السنوي', description: 'الأرباح الموزعة سنوياً لكل سهم.', unit: 'عملة/سهم', optional: false },
      { name: 'عدد الأسهم', description: 'حجم المحفظة المملوكة.', unit: 'أسهم', optional: true }
    ],
    workedExample: {
      scenario: 'امتلاك 200 سهم بسعر سوقي 60 دولار وتوزيعات سنوية 2.40 دولار للسهم.',
      stepByStep: [
        'عائد التوزيعات = (2.40 ÷ 60.00) × 100 = 4.00%.',
        'قيمة المحفظة = 200 × 60 = 12,000 دولار.',
        'الدخل السنوي = 200 × 2.40 = 480.00 دولار (40.00 دولار شهرياً).'
      ],
      result: 'عائد التوزيعات = 4.00% | الدخل السنوي = 480.00 دولار | الدخل الشهري = 40.00 دولار'
    },
    interpretation: 'يقيم كفاءة السهم في توليد تدفقات نقدية مقارنة بالأدوات الاستثمارية الأخرى.',
    assumptions: 'يفترض استمرار الشركة في سياسة التوزيعات دون تخفيض.',
    limitations: 'النسب المرتفعة جداً قد تدل على مخاطر مالية أو هبوط حاد في سعر السهم.',
    faqs: [
      { question: 'هل يتغير عائد التوزيعات يومياً؟', answer: 'نعم، يتغير عائده عكسياً مع تغير السعر السوقي اللحظي للسهم.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el rendimiento por dividendo (dividend yield), el flujo de caja anual proyectado y el ingreso pasivo generado por acciones.`,
    howToUse: [
      'Ingrese el precio actual de la acción en el mercado.',
      'Ingrese el dividendo anual pagado por acción.',
      'Ingrese el número de títulos en cartera para ver el flujo total.'
    ],
    formula: 'Rentabilidad por Dividendo (%) = (Dividendo Anual por Acción / Precio de la Acción) × 100',
    formulaVariables: [
      { name: 'Precio de la Acción', description: 'Cotización de mercado.', unit: 'Moneda/Acción', optional: false },
      { name: 'Dividendo Anual', description: 'Pago anual por título.', unit: 'Moneda/Acción', optional: false }
    ],
    workedExample: {
      scenario: '200 acciones a $60.00 con dividendo de $2.40 por acción.',
      stepByStep: [
        'Yield = ($2.40 / $60.00) × 100 = 4.00%.',
        'Ingreso anual = 200 × $2.40 = $480.00.'
      ],
      result: 'Yield = 4.00% | Ingreso Anual = $480.00 | Ingreso Mensual = $40.00'
    },
    interpretation: 'Mide la rentabilidad directa por flujo de efectivo independientemente de la revalorización del precio.',
    assumptions: 'Mantenimiento del reparto de dividendos por parte de la empresa.',
    limitations: 'Un dividendo excesivamente alto puede ser insostenible.',
    faqs: [
      { question: '¿Cómo afecta la caída del precio al yield?', answer: 'Si el precio cae y el dividendo se mantiene, el yield porcentual aumenta.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule le rendement du dividende (dividend yield) et le revenu passif annuel généré par un portefeuille d'actions.`,
    howToUse: [
      'Saisissez le cours actuel de l’action.',
      'Indiquez le dividende annuel distribué par action.',
      'Précisez le nombre de titres détenus.'
    ],
    formula: 'Rendement du Dividende (%) = (Dividende Annuel / Cours de l’Action) × 100',
    formulaVariables: [
      { name: 'Cours de l’Action', description: 'Prix unitaire sur le marché.', unit: 'Devise/Action', optional: false },
      { name: 'Dividende Annuel', description: 'Versement annuel par action.', unit: 'Devise/Action', optional: false }
    ],
    workedExample: {
      scenario: '200 actions à 60,00 $ avec un dividende annuel de 2,40 $ par titre.',
      stepByStep: [
        'Rendement = (2,40 $ / 60,00 $) × 100 = 4,00 %.',
        'Revenu annuel = 200 × 2,40 $ = 480,00 $.'
      ],
      result: 'Rendement = 4,00 % | Revenu Annuel = 480,00 $ | Revenu Mensuel = 40,00 $'
    },
    interpretation: 'Permet d’évaluer la rentabilité immédiate en liquidités d’un investissement boursier.',
    assumptions: 'Distribution inchangée décidée lors de l’assemblée générale.',
    limitations: 'Ne garantit pas la pérennité du versement futur.',
    faqs: [
      { question: 'Le rendement inclut-il la plus-value ?', answer: 'Non, il mesure uniquement le versement des dividendes par rapport au cours d’achat ou de marché.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} ermittelt die Dividendenrendite und das jährliche passive Einkommen aus Aktienanlagen und Dividenden-ETFs.`,
    howToUse: [
      'Geben Sie den aktuellen Aktienkurs ein.',
      'Geben Sie die jährliche Dividende pro Aktie ein.',
      'Fügen Sie optional die Anzahl der gehaltenen Aktien hinzu.'
    ],
    formula: 'Dividendenrendite (%) = (Dividende pro Aktie / Aktienkurs) × 100',
    formulaVariables: [
      { name: 'Aktienkurs', description: 'Aktueller Börsenkurs.', unit: 'Währung/Aktie', optional: false },
      { name: 'Jahresdividende', description: 'Ausschüttung je Aktie.', unit: 'Währung/Aktie', optional: false }
    ],
    workedExample: {
      scenario: '200 Aktien zum Kurs von 60,00 $ mit 2,40 $ Dividende je Aktie.',
      stepByStep: [
        'Rendite = (2,40 $ / 60,00 $) × 100 = 4,00 %.',
        'Jahresertrag = 200 × 2,40 $ = 480,00 $.'
      ],
      result: 'Dividendenrendite = 4,00 % | Jahresertrag = 480,00 $ | Monatlicher Ertrag = 40,00 $'
    },
    interpretation: 'Dient Einkommensinvestoren zur Bewertung des laufenden Cashflows.',
    assumptions: 'Konstante Ausschüttungspolitik des Unternehmens.',
    limitations: 'Hohe Renditen können ein Warnsignal für fundamentale Unternehmensprobleme sein.',
    faqs: [
      { question: 'Ist die Dividende garantiert?', answer: 'Nein, der Vorstand kann Dividenden je nach Geschäftslage kürzen oder streichen.' }
    ],
    relatedTools
  })
});

// 5. RENTAL PROPERTY YIELD (rental-property-yield)
export const RENTAL_PROPERTY_YIELD_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates gross and net rental yields, Net Operating Income (NOI), and cash flow return for residential and commercial real estate investments.`,
    howToUse: [
      'Enter the total property purchase price (including closing and acquisition fees).',
      'Enter expected monthly rental income.',
      'Enter annual operating expenses (property taxes, insurance, maintenance, management fees, vacancy allowance).',
      'Analyze the resulting gross and net yield percentages.'
    ],
    formula: 'Net Rental Yield (%) = [(Annual Rent - Annual Operating Expenses) / Total Property Cost] × 100',
    formulaVariables: [
      { name: 'Property Cost', description: 'Total acquisition cost including closing fees.', unit: 'Currency', optional: false },
      { name: 'Monthly Rent', description: 'Gross rental income collected per month.', unit: 'Currency/Month', optional: false },
      { name: 'Annual Expenses', description: 'Taxes, HOA, insurance, repairs, and vacancy costs.', unit: 'Currency/Year', optional: false }
    ],
    workedExample: {
      scenario: 'A real estate asset purchased for $250,000 rents for $2,000/month with $6,000 in annual operating expenses.',
      stepByStep: [
        'Annual Gross Rent = $2,000 × 12 = $24,000.',
        'Gross Rental Yield = ($24,000 / $250,000) × 100 = 9.60%.',
        'Net Operating Income (NOI) = $24,000 - $6,000 = $18,000.',
        'Net Rental Yield = ($18,000 / $250,000) × 100 = 7.20%.'
      ],
      result: 'Gross Yield = 9.60% | Net Yield = 7.20% | Annual Net Operating Income = $18,000.00'
    },
    interpretation: 'Net yield represents the true unleveraged operating return of the physical asset after carrying expenses.',
    assumptions: 'Assumes consistent occupancy based on estimated vacancy reserves.',
    limitations: 'Does not include mortgage debt service (mortgage principal and interest) or future capital expenditures.',
    faqs: [
      { question: 'Why is Net Rental Yield more accurate than Gross Yield?', answer: 'Gross yield ignores property taxes, insurance, maintenance, and vacancy, overstating true returns by 20% to 40%.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب عائد الإيجار الإجمالي والصافي، وصافي الدخل التشغيلي (NOI)، والعائد الاستثماري للعقارات السكنية والتجارية.`,
    howToUse: [
      'أدخل سعر شراء العقار شاملاً رسوم التسجيل والتأثيث.',
      'أدخل قيمة الإيجار الشهري المتوقع.',
      'أدخل المصاريف التشغيلية السنوية (صيانة، إدارة، ضرائب، شاغر).',
      'قارن بين العائد الإجمالي والصافي لاختيار العقار الأنسب.'
    ],
    formula: 'عائد الإيجار الصافي (%) = [(الإيجار السنوي - المصاريف السنوية) ÷ تكلفة العقار] × 100',
    formulaVariables: [
      { name: 'تكلفة العقار', description: 'تكلفة الشراء الإجمالية.', unit: 'عملة', optional: false },
      { name: 'الإيجار الشهري', description: 'الدخل الإيجاري الشهري.', unit: 'عملة/شهر', optional: false },
      { name: 'المصاريف السنوية', description: 'تكاليف الصيانة والضرائب والإدارة.', unit: 'عملة/سنة', optional: false }
    ],
    workedExample: {
      scenario: 'شراء عقار بمبلغ 250,000 دولار بإيجار 2,000 دولار شهرياً ومصاريف سنوية 6,000 دولار.',
      stepByStep: [
        'الإيجار السنوي الإجمالي = 2,000 × 12 = 24,000 دولار.',
        'العائد الإجمالي = (24,000 ÷ 250,000) × 100 = 9.60%.',
        'صافي الدخل التشغيلي = 24,000 - 6,000 = 18,000 دولار.',
        'العائد الصافي = (18,000 ÷ 250,000) × 100 = 7.20%.'
      ],
      result: 'العائد الإجمالي = 9.60% | العائد الصافي = 7.20% | صافي الدخل التشغيلي = 18,000.00 دولار'
    },
    interpretation: 'يعبر العائد الصافي عن الكفاءة التشغيلية الحقيقية للعقار بعد اقتطاع تكاليف الملكية.',
    assumptions: 'يفترض ثبات معدلات الإشغال وفق مخصص الشواغر.',
    limitations: 'لا يخصم أقساط التمويل العقاري أو الفوائد البنكية.',
    faqs: [
      { question: 'لماذا يفضل الاعتماد على العائد الصافي؟', answer: 'لأن العائد الإجمالي يهمل مصاريف الصيانة والإدارة والضرائب مما يعطي انطباعاً مضللاً عن الأرباح الفعلية.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la rentabilidad bruta y neta del alquiler, el Ingreso Operativo Neto (NOI) y el rendimiento inmobiliario.`,
    howToUse: [
      'Ingrese el costo total de adquisición del inmueble.',
      'Ingrese el alquiler mensual esperado.',
      'Ingrese los gastos operativos anuales (IBI, comunidad, seguros, reparaciones).',
      'Compare la rentabilidad bruta frente a la rentabilidad neta.'
    ],
    formula: 'Rentabilidad Neta (%) = [(Renta Anual - Gastos Operativos) / Costo Inmueble] × 100',
    formulaVariables: [
      { name: 'Costo Inmueble', description: 'Precio de compra más gastos.', unit: 'Moneda', optional: false },
      { name: 'Alquiler Mensual', description: 'Renta mensual bruta.', unit: 'Moneda/Mes', optional: false },
      { name: 'Gastos Anuales', description: 'Gastos de mantenimiento e impuestos.', unit: 'Moneda/Año', optional: false }
    ],
    workedExample: {
      scenario: 'Inmueble de $250,000 con renta de $2,000/mes y gastos anuales de $6,000.',
      stepByStep: [
        'Renta bruta anual = $2,000 × 12 = $24,000.',
        'Rentabilidad bruta = ($24,000 / $250,000) × 100 = 9.60%.',
        'NOI = $24,000 - $6,000 = $18,000.',
        'Rentabilidad neta = ($18,000 / $250,000) × 100 = 7.20%.'
      ],
      result: 'Rentabilidad Bruta = 9.60% | Rentabilidad Neta = 7.20% | NOI = $18,000.00'
    },
    interpretation: 'La rentabilidad neta refleja el verdadero retorno del activo inmobiliario antes de apalancamiento hipotecario.',
    assumptions: 'Ocupación normalizada durante todo el año.',
    limitations: 'No incluye el servicio de la deuda hipotecaria.',
    faqs: [
      { question: '¿Qué gastos deben incluirse?', answer: 'Comunidad, seguros, impuestos municipales, reparaciones y provisión por desocupación.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} évalue la rentabilité locative brute et nette ainsi que le résultat opérationnel net (NOI) d'un investissement immobilier.`,
    howToUse: [
      'Indiquez le prix d’achat total du bien (frais de notaire et travaux inclus).',
      'Saisissez le loyer mensuel prévisionnel.',
      'Renseignez les charges annuelles non récupérables (taxe foncière, assurance, gestion, vacance).',
      'Analysez le taux de rendement locatif net.'
    ],
    formula: 'Rendement Locatif Net (%) = [(Loyers Annuels - Charges Annuelles) / Coût Total] × 100',
    formulaVariables: [
      { name: 'Coût Total', description: 'Prix d’achat et frais annexes.', unit: 'Devise', optional: false },
      { name: 'Loyer Mensuel', description: 'Revenu locatif brut par mois.', unit: 'Devise/Mois', optional: false },
      { name: 'Charges Annuelles', description: 'Frais de gestion, taxes et réparations.', unit: 'Devise/An', optional: false }
    ],
    workedExample: {
      scenario: 'Bien acquis pour 250 000 $, loué 2 000 $/mois avec 6 000 $ de charges annuelles.',
      stepByStep: [
        'Loyers bruts annuels = 2 000 $ × 12 = 24 000 $.',
        'Rendement brut = (24 000 $ / 250 000 $) × 100 = 9,60 %.',
        'Revenu opérationnel net = 24 000 $ - 6 000 $ = 18 000 $.',
        'Rendement net = (18 000 $ / 250 000 $) × 100 = 7,20 %.'
      ],
      result: 'Rendement Brut = 9,60 % | Rendement Net = 7,20 % | Résultat Net = 18 000,00 $'
    },
    interpretation: 'Le rendement net permet de comparer la performance intrinsèque de l’immeuble face à d’autres actifs financiers.',
    assumptions: 'Suppose une estimation réaliste de la vacance locative.',
    limitations: 'Ne prend pas en compte les mensualités d’emprunt bancaire.',
    faqs: [
      { question: 'Pourquoi le rendement net est-il inférieur au brut ?', answer: 'Parce qu’il déduit les impôts fonciers, les assurances, les frais d’agence et l’entretien courant.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet Brutto- und Nettomietrendite sowie das Nettobetriebsergebnis (NOI) für Immobilieninvestitionen.`,
    howToUse: [
      'Geben Sie den Gesamtkaufpreis inklusive Nebenkosten ein.',
      'Geben Sie die monatliche Kaltmiete ein.',
      'Geben Sie die nicht umlagefähigen Betriebskosten und Instandhaltungsrücklagen pro Jahr ein.',
      'Vergleichen Sie die Brutto- und Nettorendite.'
    ],
    formula: 'Nettomietrendite (%) = [(Jahreskaltmiete - Nicht umlagefähige Kosten) / Gesamtkaufpreis] × 100',
    formulaVariables: [
      { name: 'Gesamtkaufpreis', description: 'Kaufpreis inklusive Grunderwerbsteuer und Notar.', unit: 'Währung', optional: false },
      { name: 'Monatsmiete', description: 'Monatliche Kaltmiete.', unit: 'Währung/Monat', optional: false },
      { name: 'Betriebsausgaben', description: 'Instandhaltung, Verwaltung, Leerstandsrisiko.', unit: 'Währung/Jahr', optional: false }
    ],
    workedExample: {
      scenario: 'Immobilie für 250.000 $ mit 2.000 $/Monat Miete und 6.000 $ Jahreskosten.',
      stepByStep: [
        'Jahreskaltmiete = 2.000 $ × 12 = 24.000 $.',
        'Bruttomietrendite = (24.000 $ / 250.000 $) × 100 = 9,60 %.',
        'Nettobetriebsergebnis = 24.000 $ - 6.000 $ = 18.000 $.',
        'Nettomietrendite = (18.000 $ / 250.000 $) × 100 = 7,20 %.'
      ],
      result: 'Bruttorendite = 9,60 % | Nettorendite = 7,20 % | Jahres-NOI = 18.000,00 $'
    },
    interpretation: 'Die Nettomietrendite zeigt die unverfälschte operative Ertragskraft der Immobilie.',
    assumptions: 'Kalkulierte Leerstandsquote im Normalbereich.',
    limitations: 'Zins- und Tilgungsleistungen eines Bankdarlehens sind nicht enthalten.',
    faqs: [
      { question: 'Was ist der Unterschied zwischen Brutto- und Nettorendite?', answer: 'Die Bruttorendite ignoriert laufende Kosten, während die Nettorendite alle Instandhaltungs- und Verwaltungskosten berücksichtigt.' }
    ],
    relatedTools
  })
});

// 6. CAP RATE (cap-rate)
export const CAP_RATE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates the Capitalization Rate (Cap Rate), property valuation, and Net Operating Income (NOI) for commercial and multi-family real estate.`,
    howToUse: [
      'Enter the Net Operating Income (NOI) generated by the property.',
      'Enter the current market purchase price or asset valuation.',
      'Review the capitalization rate to evaluate yield relative to market benchmarks.'
    ],
    formula: 'Cap Rate (%) = (Net Operating Income / Property Value) × 100',
    formulaVariables: [
      { name: 'Net Operating Income (NOI)', description: 'Gross revenue minus all operating expenses (before debt service).', unit: 'Currency/Year', optional: false },
      { name: 'Property Value', description: 'Current market value or acquisition price.', unit: 'Currency', optional: false }
    ],
    workedExample: {
      scenario: 'An apartment building generates $64,000 in annual NOI and is priced at $800,000.',
      stepByStep: [
        'Cap Rate = ($64,000 / $800,000) × 100.',
        'Cap Rate = 0.08 × 100 = 8.00%.'
      ],
      result: 'Cap Rate = 8.00% | Annual NOI = $64,000.00 | Property Value = $800,000.00'
    },
    interpretation: 'Cap rate indicates unleveraged property yield. Lower cap rates reflect lower risk/prime assets, while higher cap rates indicate higher cash flow with greater operational risk.',
    assumptions: 'Assumes all-cash acquisition without financing leverage distortions.',
    limitations: 'Does not account for mortgage interest, income taxes, or individual investor depreciation benefits.',
    faqs: [
      { question: 'What is a good cap rate?', answer: 'Typically 4% to 6% in prime high-demand metropolitan areas, and 7% to 10%+ in tertiary or higher-yield value-add markets.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب معدل الرسملة (Cap Rate) وصافي الدخل التشغيلي لتقييم الأصول العقارية والتجارية.`,
    howToUse: [
      'أدخل صافي الدخل التشغيلي السنوي (NOI).',
      'أدخل القيمة السوقية أو سعر شراء العقار.',
      'اطلع على معدل الرسملة لمقارنة العقار بمتوسطات السوق.'
    ],
    formula: 'معدل الرسملة (%) = (صافي الدخل التشغيلي ÷ قيمة العقار) × 100',
    formulaVariables: [
      { name: 'صافي الدخل التشغيلي', description: 'الإيرادات السنوية بعد خصم مصاريف التشغيل وقبل خدمة الدين.', unit: 'عملة/سنة', optional: false },
      { name: 'قيمة العقار', description: 'سعر الشراء أو التقييم السوقي.', unit: 'عملة', optional: false }
    ],
    workedExample: {
      scenario: 'عقار تجاري يحقق 64,000 دولار صافي دخل تشغيلي سنوي وسعره 800,000 دولار.',
      stepByStep: [
        'معدل الرسملة = (64,000 ÷ 800,000) × 100 = 8.00%.'
      ],
      result: 'معدل الرسملة = 8.00% | صافي الدخل = 64,000.00 دولار'
    },
    interpretation: 'يقيس العائد التشغيلي للأصل دون احتساب القروض البنكية.',
    assumptions: 'يفترض الشراء النقدي الكامل دون رافعة مالية.',
    limitations: 'لا يراعي خدمة الدين أو الفوائد التمويلية.',
    faqs: [
      { question: 'ماذا يعني انخفاض معدل الرسملة؟', answer: 'يعني أن العقار يقع في منطقة ممتازة ذات مخاطر منخفضة وقيمة أصول مرتفعة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la Tasa de Capitalización (Cap Rate) y la valoración de inmuebles comerciales y residenciales.`,
    howToUse: [
      'Ingrese el Ingreso Operativo Neto (NOI) anual del inmueble.',
      'Ingrese el valor de mercado o precio de compra.',
      'Consulte la tasa de capitalización resultante.'
    ],
    formula: 'Cap Rate (%) = (Ingreso Operativo Neto / Valor del Inmueble) × 100',
    formulaVariables: [
      { name: 'NOI', description: 'Ingresos brutos menos gastos operativos.', unit: 'Moneda/Año', optional: false },
      { name: 'Valor del Inmueble', description: 'Precio de adquisición.', unit: 'Moneda', optional: false }
    ],
    workedExample: {
      scenario: 'Inmueble con NOI de $64,000 y valor de mercado de $800,000.',
      stepByStep: [
        'Cap Rate = ($64,000 / $800,000) × 100 = 8.00%.'
      ],
      result: 'Cap Rate = 8.00% | NOI Anual = $64,000.00'
    },
    interpretation: 'Mide la rentabilidad intrínseca del activo libre de deuda.',
    assumptions: 'Transacción 100% al contado sin financiación.',
    limitations: 'No computa cuotas hipotecarias ni impuestos personales.',
    faqs: [
      { question: '¿Cómo se utiliza el Cap Rate para tasar un inmueble?', answer: 'Dividiendo el NOI estimado entre el Cap Rate medio de la zona se obtiene el valor de mercado teórico.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule le taux de capitalisation (Cap Rate) et la valorisation financière des actifs immobiliers d'investissement.`,
    howToUse: [
      'Saisissez le Résultat Opérationnel Net (NOI) annuel.',
      'Indiquez la valeur d’acquisition ou prix de vente.',
      'Évaluez le Cap Rate obtenu par rapport au marché local.'
    ],
    formula: 'Cap Rate (%) = (Résultat Opérationnel Net / Valeur du Bien) × 100',
    formulaVariables: [
      { name: 'Résultat Opérationnel Net (NOI)', description: 'Loyers nets de charges d’exploitation.', unit: 'Devise/An', optional: false },
      { name: 'Valeur du Bien', description: 'Prix du marché ou coût d’achat.', unit: 'Devise', optional: false }
    ],
    workedExample: {
      scenario: 'Immeuble générant 64 000 $ de NOI annuel pour un prix de 800 000 $.',
      stepByStep: [
        'Cap Rate = (64 000 $ / 800 000 $) × 100 = 8,00 %.'
      ],
      result: 'Cap Rate = 8,00 % | NOI Annuel = 64 000,00 $'
    },
    interpretation: 'Indicateur de référence pour comparer des immeubles de rapport indépendamment de leur structure de financement.',
    assumptions: 'Acquisition sans recours au crédit bancaire.',
    limitations: 'Ne prend pas en compte le service de la dette ni la fiscalité individuelle.',
    faqs: [
      { question: 'Qu’est-ce qu’un bon Cap Rate ?', answer: 'Un Cap Rate compris entre 4 % et 6 % caractérise souvent les emplacements premium, tandis que 8 % à 10 % correspond à des actifs à plus fort rendement mais risque plus élevé.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die Liegenschaftszins- und Kapitalisierungsrate (Cap Rate) für Gewerbe- und Anlageimmobilien.`,
    howToUse: [
      'Geben Sie den jährlichen Nettoertrag (NOI) ein.',
      'Geben Sie den Kaufpreis oder Verkehrswert der Immobilie ein.',
      'Lesen Sie die Kapitalisierungsrate ab.'
    ],
    formula: 'Cap Rate (%) = (Netto-Betriebsergebnis / Immobilienwert) × 100',
    formulaVariables: [
      { name: 'Netto-Betriebsergebnis (NOI)', description: 'Mieteinnahmen abzüglich Bewirtschaftungskosten.', unit: 'Währung/Jahr', optional: false },
      { name: 'Immobilienwert', description: 'Kaufpreis oder Verkehrswert.', unit: 'Währung', optional: false }
    ],
    workedExample: {
      scenario: 'Wohnanlage mit 64.000 $ Jahres-NOI bei 800.000 $ Kaufpreis.',
      stepByStep: [
        'Cap Rate = (64.000 $ / 800.000 $) × 100 = 8,00 %.'
      ],
      result: 'Cap Rate = 8,00 % | Jahres-NOI = 64.000,00 $'
    },
    interpretation: 'Liefert den unverschuldeten Ertragssatz zur objektiven Bewertung.',
    assumptions: 'Reine Eigenkapitalbetrachtung ohne Fremdfinanzierung.',
    limitations: 'Kredithebel und individuelle Steuervorteile werden nicht abgebildet.',
    faqs: [
      { question: 'Was signalisiert eine niedrige Cap Rate?', answer: 'Eine niedrige Cap Rate steht für hohe Immobilienpreise in begehrten Top-Lagen mit geringem Risiko.' }
    ],
    relatedTools
  })
});

// 7. COLLEGE SAVINGS (college-savings)
export const COLLEGE_SAVINGS_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates monthly savings requirements, 529 education fund growth, and tuition inflation projections for future university costs.`,
    howToUse: [
      'Enter current child age and projected college entry age (typically 18).',
      'Enter current annual tuition and room/board costs.',
      'Enter expected annual college inflation rate (e.g., 4% to 5%).',
      'Specify expected investment return rate on education savings.'
    ],
    formula: 'Future Cost = Current Annual Cost × (1 + Inflation)^Years × 4 Years',
    formulaVariables: [
      { name: 'Years to College', description: 'Years until enrollment.', unit: 'Years', optional: false },
      { name: 'Current Cost/Year', description: 'Today’s annual tuition, room and board.', unit: 'Currency', optional: false },
      { name: 'Tuition Inflation Rate', description: 'Expected annual increase in education costs.', unit: '%/Year', optional: false },
      { name: 'Investment Return', description: 'Expected annual portfolio compound growth.', unit: '%/Year', optional: false }
    ],
    workedExample: {
      scenario: 'Child is 3 years old (15 years until college). Current annual tuition is $25,000, inflation is 4%, expected portfolio growth is 7%.',
      stepByStep: [
        'Future Year 1 Cost = $25,000 × (1.04)^15 = $25,000 × 1.8009 = $45,023/yr.',
        'Estimated 4-Year Total = ~$190,000.',
        'Required Monthly Contribution = ~$590/month over 15 years at 7% return.'
      ],
      result: 'Total Projected 4-Year Cost = $190,000.00 | Target Monthly Savings = $590.00/mo'
    },
    interpretation: 'Quantifies the compound savings pace needed early in a child’s life to avoid burdensome student loan obligations.',
    assumptions: 'Assumes steady monthly deposits and stable geometric investment returns.',
    limitations: 'Does not model potential academic scholarships, financial aid, or work-study programs.',
    faqs: [
      { question: 'Why does college tuition inflate faster than general CPI?', answer: 'Higher education costs historically grow 1.5x to 2x faster than general consumer inflation due to technology, campus facilities, and administrative expansion.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب خطة الادخار الجامعي للأبناء، ومعدل نمو صناديق التعليم، والتضخم المتوقع في الرسوم الدراسية الجامعية.`,
    howToUse: [
      'أدخل عمر الطفل الحالي والعمر المتوقع لبدء الدراسة الجامعية.',
      'أدخل الرسوم السنوية الحالية للجامعة وتكاليف المعيشة.',
      'حدد نسبة التضخم المتوقعة في التعليم.',
      'حدد معدل العائد الاستثماري لمحفظة الادخار.'
    ],
    formula: 'التكلفة المستقبلية = التكلفة الحالية × (1 + معدل التضخم)^السنوات × 4 سنوات',
    formulaVariables: [
      { name: 'السنوات حتى الجامعة', description: 'الفترة الزمنية المتبقية.', unit: 'سنوات', optional: false },
      { name: 'التكلفة السنوية الحالية', description: 'الرسوم والمعيشة بالسعر الحالي.', unit: 'عملة', optional: false },
      { name: 'تضخم التعليم', description: 'الزيادة السنوية في رسوم الجامعات.', unit: '%/سنة', optional: false }
    ],
    workedExample: {
      scenario: 'عمر الطفل 3 سنوات (متبقي 15 سنة)، الرسوم الحالية 25,000 دولار/سنة، تضخم 4%، عائد استثماري 7%.',
      stepByStep: [
        'تكلفة السنة الأولى مستقبلاً = 25,000 × (1.04)^15 = 45,023 دولار/سنة.',
        'إجمالي الـ 4 سنوات = حوالي 190,000 دولار.',
        'الادخار الشهري المطلوب = حوالي 590 دولار/شهرياً.'
      ],
      result: 'التكلفة الإجمالية = 190,000.00 دولار | الادخار الشهري = 590.00 دولار/شهر'
    },
    interpretation: 'تحدد المبلغ الشهري الواجب استثماره مبكراً لتغطية تكاليف التعليم وتجنب القروض الطلابية.',
    assumptions: 'يفترض استمرارية الإيداع الشهري وثبات متوسط العائد.',
    limitations: 'لا تحسب المنح الدراسية أو المساعدات المالية المحتملة.',
    faqs: [
      { question: 'لماذا ترتفع رسوم الجامعات بمعدل أعلى من التضخم العام؟', answer: 'بسبب ارتفاع تكاليف التقنيات والبحوث والكوادر الأكاديمية والبنية التحتية للجامعات.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el ahorro mensual necesario para financiar los estudios universitarios futuros considerando la inflación educativa.`,
    howToUse: [
      'Ingrese la edad actual del hijo y la edad de ingreso universitario.',
      'Ingrese el costo anual actual de matrícula y estancia.',
      'Defina la inflación educativa prevista.',
      'Indique la rentabilidad anual esperada de los ahorros.'
    ],
    formula: 'Costo Futuro = Costo Actual × (1 + Inflación)^Años × 4 Años',
    formulaVariables: [
      { name: 'Años Restantes', description: 'Tiempo hasta iniciar la universidad.', unit: 'Años', optional: false },
      { name: 'Costo Anual Actual', description: 'Matrícula y manutención actual.', unit: 'Moneda', optional: false }
    ],
    workedExample: {
      scenario: 'Hijo de 3 años (15 años restantes), costo actual $25,000/año, inflación 4%, rentabilidad 7%.',
      stepByStep: [
        'Costo anual futuro = $25,000 × (1.04)^15 = $45,023/año.',
        'Costo total 4 años = ~$190,000.',
        'Ahorro mensual necesario = ~$590/mes.'
      ],
      result: 'Costo Total 4 Años = $190,000.00 | Ahorro Mensual = $590.00/mes'
    },
    interpretation: 'Permite planificar las cuotas mensuales de inversión para evitar deudas estudiantiles futuras.',
    assumptions: 'Aportaciones regulares y rentabilidad compuesta constante.',
    limitations: 'No incluye becas ni ayudas estatales.',
    faqs: [
      { question: '¿Por qué conviene empezar a ahorrar desde edades tempranas?', answer: 'El interés compuesto maximiza los rendimientos a 15-18 años reduciendo la aportación mensual necesaria.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule le plan d'épargne mensuel nécessaire pour financer les études supérieures d'un enfant en tenant compte de l'inflation universitaire.`,
    howToUse: [
      'Saisissez l’âge actuel de l’enfant et l’âge d’entrée aux études supérieures.',
      'Indiquez le coût annuel actuel de scolarité et de logement.',
      'Précisez le taux d’inflation des frais d’études.',
      'Définissez le rendement annuel attendu de l’épargne.'
    ],
    formula: 'Coût Futur = Coût Annuel × (1 + Inflation)^Années × 4 Ans',
    formulaVariables: [
      { name: 'Années d’Épargne', description: 'Durée restante jusqu’à l’entrée en université.', unit: 'Années', optional: false },
      { name: 'Coût Annuel Actuel', description: 'Frais de scolarité et vie étudiante.', unit: 'Devise', optional: false }
    ],
    workedExample: {
      scenario: 'Enfant de 3 ans (15 ans d’épargne), coût actuel de 25 000 $/an, inflation de 4 %, rendement de 7 %.',
      stepByStep: [
        'Coût annuel futur = 25 000 $ × (1,04)^15 = 45 023 $/an.',
        'Coût total estimé sur 4 ans = ~190 000 $.',
        'Épargne mensuelle nécessaire = ~590 $/mois.'
      ],
      result: 'Coût Total Projeté = 190 000,00 $ | Épargne Mensuelle = 590,00 $/mois'
    },
    interpretation: 'Chiffre l’effort d’épargne progressif pour financer sereinement un cursus complet sans endettement.',
    assumptions: 'Versements constants et rendement moyen régulier.',
    limitations: 'Ne prend pas en compte les bourses d’excellence ou aides sociales.',
    faqs: [
      { question: 'Quel est l’impact de l’inflation sur les études ?', answer: 'Les frais universitaires progressent souvent plus rapidement que l’inflation générale des prix.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die monatliche Sparrate für die zukünftige Ausbildung und das Studium von Kindern unter Berücksichtigung der Teuerung.`,
    howToUse: [
      'Geben Sie das aktuelle Alter des Kindes und das Alter bei Studienbeginn ein.',
      'Geben Sie die heutigen jährlichen Studien- und Lebenshaltungskosten ein.',
      'Geben Sie die erwartete Bildungs-Inflationsrate ein.',
      'Legen Sie die erwartete jährliche Rendite des Sparplans fest.'
    ],
    formula: 'Zukunftskosten = Heutige Jahreskosten × (1 + Inflation)^Jahre × 4 Jahre',
    formulaVariables: [
      { name: 'Jahre bis Studienbeginn', description: 'Verbleibende Ansparzeit.', unit: 'Jahre', optional: false },
      { name: 'Heutige Jahreskosten', description: 'Gebühren und Lebensunterhalt.', unit: 'Währung', optional: false }
    ],
    workedExample: {
      scenario: '3-jähriges Kind (15 Jahre Sparzeit), heutige Kosten 25.000 $/Jahr, 4 % Inflation, 7 % Portfoliorendite.',
      stepByStep: [
        'Zukünftige Jahreskosten = 25.000 $ × (1,04)^15 = 45.023 $/Jahr.',
        'Gesamtkosten für 4 Jahre = ~190.000 $.',
        'Erforderliche Monatssparrate = ~590 $/Monat.'
      ],
      result: 'Gesamtkosten = 190.000,00 $ | Monatliche Sparrate = 590,00 $/Monat'
    },
    interpretation: 'Erleichtert die vorausschauende Finanzplanung zur Vermeidung von Studienkrediten.',
    assumptions: 'Regelmäßige Einzahlungen und Zinseszinseffekt.',
    limitations: 'Eventuelle Stipendien oder staatliche Förderungen sind nicht enthalten.',
    faqs: [
      { question: 'Warum ist ein früher Beginn entscheidend?', answer: 'Über 15 Jahre erwirtschaftet der Zinseszins einen Großteil des benötigten Gesamtkapitals.' }
    ],
    relatedTools
  })
});

// 8. 401K RETIREMENT (401k-retirement)
export const RETIREMENT_401K_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} forecasts retirement wealth accumulation, employer matching contributions, tax-advantaged compound growth, and projected annual retirement drawdowns.`,
    howToUse: [
      'Enter your current age and planned retirement age.',
      'Enter your current annual salary and employee contribution percentage.',
      'Enter your employer 401(k) matching formula (e.g., 50% match up to 6%).',
      'Enter existing retirement balance and expected annual investment return.'
    ],
    formula: 'Total Annual Contribution = Employee Contribution + Employer Match Contribution',
    formulaVariables: [
      { name: 'Current Salary', description: 'Gross annual compensation.', unit: 'Currency', optional: false },
      { name: 'Employee Contribution', description: 'Percentage of salary deferred into retirement account.', unit: '%', optional: false },
      { name: 'Employer Match', description: 'Company matching contribution percentage.', unit: '%', optional: false },
      { name: 'Annual Return', description: 'Expected portfolio growth rate.', unit: '%/Year', optional: false }
    ],
    workedExample: {
      scenario: 'Age 30, retiring at 65 (35 years). Salary $70,000, saving 8% with a 4% company match ($8,400/yr total), current balance $20,000, 7% annual return.',
      stepByStep: [
        'Total Annual Contribution = 12% of $70,000 = $8,400/year.',
        'Compound Future Value of Existing $20,000 = $20,000 × (1.07)^35 = $213,530.',
        'Future Value of $8,400 Annual Annuity = $8,400 × [((1.07)^35 - 1) / 0.07] = $1,161,240.',
        'Total 401(k) Balance at Age 65 = $213,530 + $1,161,240 = $1,374,770.'
      ],
      result: 'Projected 401(k) Nest Egg = $1,374,770.00 | Estimated Safe Annual Drawdown (4%) = $54,990.80/yr'
    },
    interpretation: 'Visualizes the exponential impact of long-term tax-deferred compounding and employer matching contributions on retirement security.',
    assumptions: 'Assumes consistent annual contributions, full vesting of employer match, and no early penalty withdrawals.',
    limitations: 'Does not account for future legislative changes to statutory contribution caps or required minimum distributions (RMDs).',
    faqs: [
      { question: 'Why should I always contribute at least enough to get the full employer match?', answer: 'The employer match is an immediate 100% or 50% guaranteed return on your contributed funds before any market gains.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب تراكم مدخرات التقاعد، ومساهمة جهة العمل (Employer Match)، ونمو المحفظة المعفاة ضريبياً حتى سن التقاعد.`,
    howToUse: [
      'أدخل عمرك الحالي وعمر التقاعد المخطط له.',
      'أدخل راتبك السنوي ونسبة استقطاعك للتقاعد.',
      'أدخل نسبة مساهمة جهة العمل الإضافية.',
      'أدخل رصيدك الحالي ومعدل العائد الاستثماري السنوي المتوقع.'
    ],
    formula: 'إجمالي الاستقطاع السنوي = استقطاع الموظف + مساهمة الشركة',
    formulaVariables: [
      { name: 'الراتب السنوي', description: 'إجمالي الدخل السنوي.', unit: 'عملة', optional: false },
      { name: 'استقطاع الموظف', description: 'النسبة المئوية المدخرة.', unit: '%', optional: false },
      { name: 'مساهمة الشركة', description: 'المساهمة المماثلة من جهة العمل.', unit: '%', optional: false }
    ],
    workedExample: {
      scenario: 'العمر 30، التقاعد عند 65 (35 سنة)، راتب 70,000 دولار، ادخار 8% ومساهمة شركة 4% (إجمالي 8,400 دولار سنوياً)، رصيد حالي 20,000 دولار، عائد 7%.',
      stepByStep: [
        'المساهمة السنوية الإجمالية = 12% من 70,000 = 8,400 دولار/سنة.',
        'القيمة المستقبلية للرصيد الحالي = 213,530 دولار.',
        'القيمة المستقبلية للمساهمات = 1,161,240 دولار.',
        'الرصيد الإجمالي عند التقاعد = 1,374,770 دولار.'
      ],
      result: 'رصيد التقاعد المتوقع = 1,374,770.00 دولار | السحب السنوي الآمن (4%) = 54,990.80 دولار/سنة'
    },
    interpretation: 'توضح القوة المضاعفة للفائدة المركبة ومساهمات أصحاب العمل في بناء الثروة التقاعدية.',
    assumptions: 'يفترض استمرارية الاستقطاع والاستثمار دون سحب مبكر.',
    limitations: 'لا تراعي الضرائب المستقبلية عند السحب في سن التقاعد.',
    faqs: [
      { question: 'ما فائدة مساهمة جهة العمل؟', answer: 'تعتبر عائداً مجانياً ومباشراً يضاعف قيمة مدخراتك قبل أي أرباح سوقية.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} proyecta el fondo de jubilación, aportaciones de la empresa y crecimiento compuesto exento de impuestos.`,
    howToUse: [
      'Ingrese su edad actual y la edad prevista de jubilación.',
      'Ingrese su salario anual y el porcentaje de aportación propia.',
      'Ingrese la aportación complementaria de su empleador.',
      'Ingrese el saldo acumulado y la rentabilidad esperada.'
    ],
    formula: 'Aportación Anual = Aportación Empleado + Match Empleador',
    formulaVariables: [
      { name: 'Salario Anual', description: 'Ingresos brutos anuales.', unit: 'Moneda', optional: false },
      { name: 'Aportación Personal', description: '% ahorrado para jubilación.', unit: '%', optional: false }
    ],
    workedExample: {
      scenario: 'Edad 30 a 65 años (35 años), salario $70,000, 8% propio + 4% empresa ($8,400/año), saldo inicial $20,000, 7% retorno.',
      stepByStep: [
        'Aportación anual = $8,400/año.',
        'Valor acumulado a los 65 años = $1,374,770.'
      ],
      result: 'Fondo de Jubilación = $1,374,770.00 | Retiro Anual Seguro (4%) = $54,990.80/año'
    },
    interpretation: 'Demuestra el beneficio del interés compuesto a largo plazo en planes de pensiones.',
    assumptions: 'Aportaciones ininterrumpidas sin rescates anticipados.',
    limitations: 'No descuenta retenciones fiscales al momento de la retirada.',
    faqs: [
      { question: '¿Qué es la regla del 4% en jubilación?', answer: 'Es una pauta histórica para retirar el 4% del fondo el primer año y ajustarlo por inflación sin agotar el capital en 30 años.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} simule l'accumulation du capital retraite, l'abondement employeur et la rente annuelle disponible au départ en retraite.`,
    howToUse: [
      'Indiquez votre âge actuel et l’âge de départ à la retraite.',
      'Saisissez votre rémunération annuelle brute et votre taux de cotisation.',
      'Indiquez l’abondement éventuel de votre entreprise.',
      'Renseignez le capital initial et le taux de rendement estimé.'
    ],
    formula: 'Cotisation Totale = Cotisation Salarié + Abondement Entreprise',
    formulaVariables: [
      { name: 'Salaire Annuel', description: 'Revenu brut annuel.', unit: 'Devise', optional: false },
      { name: 'Cotisation', description: '% du salaire épargné.', unit: '%', optional: false }
    ],
    workedExample: {
      scenario: 'De 30 à 65 ans (35 ans), salaire 70 000 $, épargne 8 % + 4 % employeur (8 400 $/an), capital 20 000 $, rendement 7 %.',
      stepByStep: [
        'Épargne annuelle = 8 400 $/an.',
        'Capital total accumulé à 65 ans = 1 374 770 $.'
      ],
      result: 'Capital Retraite = 1 374 770,00 $ | Rente Annuelle Sûre (4 %) = 54 990,80 $/an'
    },
    interpretation: 'Met en évidence l’effet de levier de l’abondement employeur et la capitalisation financière à long terme.',
    assumptions: 'Versements continus et réinvestissement systématique.',
    limitations: 'Ne prend pas en compte la fiscalité applicable aux rentes futures.',
    faqs: [
      { question: 'Pourquoi maximiser l’abondement employeur ?', answer: 'Il s’agit d’un supplément de rémunération immédiat qui dope considérablement le capital final.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} prognostiziert das Altersvorsorgevermögen, Arbeitgeberzuschüsse und die mögliche jährliche Rentenauszahlung.`,
    howToUse: [
      'Geben Sie Ihr aktuelles Alter und das gewünschte Renteneintrittsalter ein.',
      'Geben Sie Ihr Jahresgehalt und Ihre Sparquote ein.',
      'Geben Sie den Arbeitgeberzuschuss (Matching) ein.',
      'Geben Sie das bestehende Guthaben und die Renditeerwartung ein.'
    ],
    formula: 'Gesamteinzahlung = Eigene Sparrate + Arbeitgeberzuschuss',
    formulaVariables: [
      { name: 'Jahresgehalt', description: 'Bruttojahresgehalt.', unit: 'Währung', optional: false },
      { name: 'Sparquote', description: 'Prozentualer Gehaltsanteil für die Altersvorsorge.', unit: '%', optional: false }
    ],
    workedExample: {
      scenario: 'Alter 30 bis 65 (35 Jahre), Gehalt 70.000 $, 8 % Eigenanteil + 4 % Arbeitgeber (8.400 $/Jahr), Startkapital 20.000 $, 7 % Rendite.',
      stepByStep: [
        'Jährliche Einzahlung = 8.400 $/Jahr.',
        'Endvermögen mit 65 Jahren = 1.374.770 $.'
      ],
      result: 'Altersvorsorgekapital = 1.374.770,00 $ | Sichere Jahresauszahlung (4 %) = 54.990,80 $/Jahr'
    },
    interpretation: 'Visualisiert den exponentiellen Vermögensaufbau durch Zinseszins und Arbeitgeberförderung.',
    assumptions: 'Kontinuierliche Einzahlungen ohne vorzeitige Entnahmen.',
    limitations: 'Spätere Besteuerung der Auszahlungen ist nicht eingerechnet.',
    faqs: [
      { question: 'Was ist die 4-Prozent-Regel?', answer: 'Eine Faustformel, wonach jährlich 4 % des Kapitals inflationsbereinigt entnommen werden können, ohne das Depot vorzeitig aufzubrauchen.' }
    ],
    relatedTools
  })
});

// 9. INFLATION FUTURE (inflation-future)
export const INFLATION_FUTURE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates the future equivalent purchasing cost of money and purchasing power degradation over time based on compound inflation rates.`,
    howToUse: [
      'Enter the current monetary amount or living expense.',
      'Enter the expected annual inflation rate percentage.',
      'Enter the future time horizon in years.',
      'Review future equivalent cost and purchasing power retention.'
    ],
    formula: 'Future Cost = Current Value × (1 + Inflation Rate)^Years',
    formulaVariables: [
      { name: 'Current Value', description: 'Present baseline monetary value.', unit: 'Currency', optional: false },
      { name: 'Inflation Rate (i)', description: 'Average annual inflation percentage.', unit: '%/Year', optional: false },
      { name: 'Years (n)', description: 'Number of years into the future.', unit: 'Years', optional: false }
    ],
    workedExample: {
      scenario: 'A family with $5,000 monthly living expenses projects costs 20 years into the future at 3.5% average annual inflation.',
      stepByStep: [
        'Inflation Multiplier = (1 + 0.035)^20 = (1.035)^20 = 1.9898.',
        'Future Monthly Cost = $5,000 × 1.9898 = $9,948.94.',
        'Purchasing Power of Today’s $5,000 in 20 Years = $5,000 / 1.9898 = $2,512.83 (49.7% loss of purchasing power).'
      ],
      result: 'Future Equivalent Cost = $9,948.94 | Purchasing Power Retained = 50.26%'
    },
    interpretation: 'Highlights the eroding effect of inflation on uninvested cash reserves and helps calibrate long-term retirement budgets.',
    assumptions: 'Assumes a constant annualized inflation rate across the entire period.',
    limitations: 'Actual basket-of-goods inflation fluctuates yearly across distinct economic sectors.',
    faqs: [
      { question: 'What is purchasing power risk?', answer: 'The risk that cash or fixed-income returns fail to keep pace with inflation, eroding real standard of living over time.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب القيمة المستقبلية المعادلة للأموال وتآكل القوة الشرائية بمرور الزمن بناءً على معدلات التضخم التراكمية.`,
    howToUse: [
      'أدخل المبلغ المالي أو المصروف الحالي.',
      'أدخل معدل التضخم السنوي المتوقع.',
      'حدد عدد السنوات المستقبلية.',
      'اطلع على التكلفة المستقبلية المعادلة ونسبة القوة الشرائية المتبقية.'
    ],
    formula: 'التكلفة المستقبلية = القيمة الحالية × (1 + معدل التضخم)^السنوات',
    formulaVariables: [
      { name: 'القيمة الحالية', description: 'المبلغ الحالي.', unit: 'عملة', optional: false },
      { name: 'معدل التضخم', description: 'النسبة المئوية السنوية للتضخم.', unit: '%/سنة', optional: false },
      { name: 'السنوات', description: 'الأفق الزمني المستقبلي.', unit: 'سنوات', optional: false }
    ],
    workedExample: {
      scenario: 'مصروف شهري بقيمة 5,000 دولار بعد 20 سنة بمعدل تضخم سنوي 3.5%.',
      stepByStep: [
        'معامل التضخم = (1 + 0.035)^20 = 1.9898.',
        'المصروف المستقبلي المطلوب = 5,000 × 1.9898 = 9,948.94 دولار.',
        'القوة الشرائية لمبلغ 5,000 دولار بعد 20 سنة = 2,512.83 دولار.'
      ],
      result: 'التكلفة المستقبلية = 9,948.94 دولار | القوة الشرائية المتبقية = 50.26%'
    },
    interpretation: 'توضح خطورة الاحتفاظ بالسيولة النقدية دون استثمار في مواجهة تآكل الأسعار.',
    assumptions: 'يفترض ثبات معدل التضخم على مدار الفترة.',
    limitations: 'تتفاوت معدلات التضخم الفعلية بين السلع والخدمات المختلفة.',
    faqs: [
      { question: 'ما هو خطر القوة الشرائية؟', answer: 'هو تراجع كمية السلع والخدمات التي يمكن شراؤها بنفس المبلغ المالي بسبب التضخم.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el costo equivalente futuro del dinero y la pérdida de poder adquisitivo por efecto de la inflación acumulada.`,
    howToUse: [
      'Ingrese la cantidad monetaria o gasto actual.',
      'Ingrese la tasa de inflación anual estimada.',
      'Ingrese el horizonte temporal en años.',
      'Consulte el importe futuro necesario y el poder de compra restante.'
    ],
    formula: 'Costo Futuro = Valor Actual × (1 + Inflación)^Años',
    formulaVariables: [
      { name: 'Valor Actual', description: 'Importe presente.', unit: 'Moneda', optional: false },
      { name: 'Tasa de Inflación', description: 'Inflación media anual.', unit: '%/Año', optional: false }
    ],
    workedExample: {
      scenario: 'Gasto de $5,000 al mes dentro de 20 años con inflación del 3.5% anual.',
      stepByStep: [
        'Multiplicador = (1.035)^20 = 1.9898.',
        'Costo futuro = $5,000 × 1.9898 = $9,948.94.'
      ],
      result: 'Costo Futuro Equivalente = $9,948.94 | Poder Adquisitivo = 50.26%'
    },
    interpretation: 'Evidencia la necesidad de rentabilizar los ahorros por encima de la inflación.',
    assumptions: 'Inflación constante durante todo el período.',
    limitations: 'El IPC real varía según los hábitos de consumo individuales.',
    faqs: [
      { question: '¿Cómo protegerse de la inflación?', answer: 'Invirtiendo en activos productivos como acciones, bienes inmuebles y bonos indexados a la inflación.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule le coût futur équivalent d'un bien ou service et la perte de pouvoir d'achat sous l'effet de l'inflation cumulée.`,
    howToUse: [
      'Saisissez le montant ou le budget mensuel actuel.',
      'Indiquez le taux moyen d’inflation annuel anticipé.',
      'Précisez l’horizon en années.',
      'Consultez le coût futur et la valeur réelle résiduelle.'
    ],
    formula: 'Coût Futur = Valeur Actuelle × (1 + Inflation)^Années',
    formulaVariables: [
      { name: 'Valeur Actuelle', description: 'Montant de référence aujourd’hui.', unit: 'Devise', optional: false },
      { name: 'Taux d’Inflation', description: 'Hausse annuelle moyenne des prix.', unit: '%/An', optional: false }
    ],
    workedExample: {
      scenario: 'Dépense de 5 000 $/mois dans 20 ans avec une inflation moyenne de 3,5 % par an.',
      stepByStep: [
        'Facteur d’inflation = (1,035)^20 = 1,9898.',
        'Coût futur équivalent = 5 000 $ × 1,9898 = 9 948,94 $.'
      ],
      result: 'Coût Futur = 9 948,94 $ | Pouvoir d’Achat Résiduel = 50,26 %'
    },
    interpretation: 'Indispensable pour ajuster les objectifs de rente et de prévoyance à long terme.',
    assumptions: 'Taux d’inflation stable sur l’ensemble de la période.',
    limitations: 'L’inflation réelle fluctue selon les postes budgétaires (énergie, santé, logement).',
    faqs: [
      { question: 'Qu’est-ce que l’érosion monétaire ?', answer: 'La diminution progressive de la quantité de biens que l’on peut acheter avec une même somme d’argent au fil du temps.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die zukünftigen Lebenshaltungskosten und den Kaufkraftverlust von Ersparnissen durch die Inflationsrate.`,
    howToUse: [
      'Geben Sie den heutigen Geldbetrag oder monatlichen Bedarf ein.',
      'Geben Sie die geschätzte jährliche Inflationsrate ein.',
      'Geben Sie den Zeithorizont in Jahren ein.',
      'Lesen Sie die künftigen Kosten und die verbleibende Kaufkraft ab.'
    ],
    formula: 'Zukunftskosten = Heutiger Betrag × (1 + Inflationsrate)^Jahre',
    formulaVariables: [
      { name: 'Heutiger Betrag', description: 'Gegenwärtiger Referenzwert.', unit: 'Währung', optional: false },
      { name: 'Inflationsrate', description: 'Jährliche Teuerungsrate.', unit: '%/Jahr', optional: false }
    ],
    workedExample: {
      scenario: 'Monatlicher Bedarf von 5.000 $ in 20 Jahren bei 3,5 % durchschnittlicher Jahresinflation.',
      stepByStep: [
        'Inflationsfaktor = (1,035)^20 = 1,9898.',
        'Künftiger Betrag = 5.000 $ × 1,9898 = 9.948,94 $.'
      ],
      result: 'Zukünftige Kosten = 9.948,94 $ | Verbleibende Kaufkraft = 50,26 %'
    },
    interpretation: 'Veranschaulicht den realen Kaufkraftverlust von unverzinsten Barmitteln.',
    assumptions: 'Gleichbleibende Teuerungsrate über den gesamten Zeitraum.',
    limitations: 'Persönliche Inflationsraten weichen je nach Konsumprofil ab.',
    faqs: [
      { question: 'Warum ist Reinvestition wichtig?', answer: 'Nur Erträge oberhalb der Inflationsrate schützen das reale Vermögen vor schleichender Entwertung.' }
    ],
    relatedTools
  })
});

// 10. CRYPTO MARKET CAP & UNIT PRICE (currency-crypto)
export const CURRENCY_CRYPTO_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates cryptocurrency market capitalization, unit token prices, circulating vs. fully diluted valuations (FDV), and required market cap for target coin prices.`,
    howToUse: [
      'Enter the current circulating supply of tokens or coins.',
      'Enter the current or target unit price per coin.',
      'Enter the total maximum supply to calculate Fully Diluted Valuation (FDV).',
      'Analyze the resulting market cap and compare with historical crypto benchmarks.'
    ],
    formula: 'Market Cap = Circulating Supply × Unit Price | FDV = Total Max Supply × Unit Price',
    formulaVariables: [
      { name: 'Circulating Supply', description: 'Number of coins publicly circulating in the market.', unit: 'Tokens', optional: false },
      { name: 'Unit Price', description: 'Current trading price per individual token.', unit: 'Currency/Token', optional: false },
      { name: 'Total Max Supply', description: 'Hard-coded maximum lifetime token emission.', unit: 'Tokens', optional: true }
    ],
    workedExample: {
      scenario: 'A cryptocurrency has 19,500,000 circulating coins (max 21,000,000) trading at $60,000.00 each.',
      stepByStep: [
        'Circulating Market Cap = 19,500,000 × $60,000 = $1,170,000,000,000 ($1.17 Trillion).',
        'Fully Diluted Valuation (FDV) = 21,000,000 × $60,000 = $1,260,000,000,000 ($1.26 Trillion).'
      ],
      result: 'Market Cap = $1.17 Trillion | Fully Diluted Valuation (FDV) = $1.26 Trillion'
    },
    interpretation: 'Demonstrates that token unit price alone is meaningless without circulating supply context when evaluating valuation.',
    assumptions: 'Assumes current circulating tokens are liquid on public exchanges.',
    limitations: 'Does not account for locked vesting schedules, liquidity pool depths, or token emission inflation schedules.',
    faqs: [
      { question: 'What is the difference between Market Cap and Fully Diluted Valuation (FDV)?', answer: 'Market Cap reflects only currently circulating unlocked coins, whereas FDV calculates theoretical valuation if all future tokens were unlocked today at current prices.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب القيمة السوقية للعملات الرقمية المشفرة، وسعر الوحدة، والتقييم المخفف بالكامل (FDV)، والقيمة السوقية المستهدفة.`,
    howToUse: [
      'أدخل عدد العملات المتداولة حالياً في السوق (Circulating Supply).',
      'أدخل السعر الحالي أو المستهدف للقطعة الواحدة.',
      'أدخل الحد الأقصى الإجمالي للعملات لحساب التقييم المخفف بالكامل (FDV).'
    ],
    formula: 'القيمة السوقية = العرض المتداول × سعر العملة | التقييم المخفف = العرض الإجمالي × سعر العملة',
    formulaVariables: [
      { name: 'العرض المتداول', description: 'عدد العملات المتاحة للتداول الفعلي.', unit: 'عملات', optional: false },
      { name: 'سعر الوحدة', description: 'سعر تداول القطعة الواحدة.', unit: 'عملة/قطعة', optional: false },
      { name: 'الحد الأقصى للعرض', description: 'العدد الكلي الأقصى للإصدار.', unit: 'عملات', optional: true }
    ],
    workedExample: {
      scenario: 'عملة رقمية متداول منها 19,500,000 قطعة (الحد الأقصى 21 مليون) وسعرها 60,000 دولار.',
      stepByStep: [
        'القيمة السوقية المتداولة = 19,500,000 × 60,000 = 1.17 تريليون دولار.',
        'التقييم المخفف بالكامل = 21,000,000 × 60,000 = 1.26 تريليون دولار.'
      ],
      result: 'القيمة السوقية = 1.17 تريليون دولار | التقييم المخفف = 1.26 تريليون دولار'
    },
    interpretation: 'تؤكد أن سعر القطعة بمفردها لا يعبر عن حجم المشروع دون النظر إلى كمية العملات المصدرة.',
    assumptions: 'يفترض سيولة تداول كافية في المنصات.',
    limitations: 'لا تراعي جداول فتح قفل العملات (Vesting) المستقبلية.',
    faqs: [
      { question: 'ما هو التقييم المخفف بالكامل (FDV)؟', answer: 'هو القيمة السوقية النظرية للمشروع إذا تم إصدار وتداول كافة العملات المخططة مستقبلاً بالسعر الحالي.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la capitalización de mercado de criptomonedas, precio unitario y valoración totalmente diluida (FDV).`,
    howToUse: [
      'Ingrese el suministro circulante actual de tokens.',
      'Ingrese el precio unitario de cotización.',
      'Ingrese el suministro máximo para calcular el FDV.'
    ],
    formula: 'Capitalización = Suministro Circulante × Precio Unitario',
    formulaVariables: [
      { name: 'Suministro Circulante', description: 'Monedas en circulación pública.', unit: 'Tokens', optional: false },
      { name: 'Precio Unitario', description: 'Cotización por token.', unit: 'Moneda/Token', optional: false }
    ],
    workedExample: {
      scenario: '19,500,000 tokens en circulación (máximo 21,000,000) a $60,000 cada uno.',
      stepByStep: [
        'Market Cap = 19,500,000 × $60,000 = $1.17 Billones.',
        'FDV = 21,000,000 × $60,000 = $1.26 Billones.'
      ],
      result: 'Market Cap = $1.17 Billones | FDV = $1.26 Billones'
    },
    interpretation: 'Demuestra que el precio por unidad no indica por sí solo la valoración global de un criptoactivo.',
    assumptions: 'Liquidez de mercado suficiente.',
    limitations: 'No incluye desbloqueos de tokens bloqueados ni calendarios de vesting.',
    faqs: [
      { question: '¿Por qué el FDV es relevante?', answer: 'Porque anticipa la presión vendedora por la futura emisión de nuevos tokens.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule la capitalisation boursière (Market Cap) des cryptomonnaies, le prix unitaire et la valorisation entièrement diluée (FDV).`,
    howToUse: [
      'Indiquez l’offre en circulation (Circulating Supply).',
      'Saisissez le cours unitaire du jeton.',
      'Indiquez l’offre maximale totale pour calculer le FDV.'
    ],
    formula: 'Capitalisation = Offre en Circulation × Prix Unitaire | FDV = Offre Totale × Prix Unitaire',
    formulaVariables: [
      { name: 'Offre en Circulation', description: 'Nombre de jetons disponibles sur le marché.', unit: 'Jetons', optional: false },
      { name: 'Prix Unitaire', description: 'Cours actuel du jeton.', unit: 'Devise/Jeton', optional: false }
    ],
    workedExample: {
      scenario: '19 500 000 jetons en circulation (max 21 000 000) au prix de 60 000 $ par unité.',
      stepByStep: [
        'Market Cap = 19 500 000 × 60 000 $ = 1,17 billion de dollars.',
        'FDV = 21 000 000 × 60 000 $ = 1,26 billion de dollars.'
      ],
      result: 'Capitalisation = 1,17 billion $ | Valorisation Diluée (FDV) = 1,26 billion $'
    },
    interpretation: 'Permet d’évaluer la taille réelle d’un protocole indépendamment de son prix facial unitaire.',
    assumptions: 'Liquidité de marché suffisante sur les plateformes d’échange.',
    limitations: 'N’intègre pas le calendrier de déblocage progressif des jetons réservés.',
    faqs: [
      { question: 'Pourquoi un jeton à 1 $ peut-il être plus valorisé qu’un jeton à 100 $ ?', answer: 'Si le jeton à 1 $ a 1 milliard d’unités, sa capitalisation est de 1 Md $, contre 10 M $ pour un jeton à 100 $ avec 100 000 unités.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die Marktkapitalisierung von Kryptowährungen, Einzelpreise und die voll verwässerte Gesamtbewertung (FDV).`,
    howToUse: [
      'Geben Sie die aktuell zirkulierende Umlaufmenge ein.',
      'Geben Sie den aktuellen Tokenpreis ein.',
      'Geben Sie die Maximalmenge zur Ermittlung des FDV ein.'
    ],
    formula: 'Marktkapitalisierung = Umlaufmenge × Tokenpreis | FDV = Maximalmenge × Tokenpreis',
    formulaVariables: [
      { name: 'Umlaufmenge', description: 'Aktuell frei handelbare Token.', unit: 'Token', optional: false },
      { name: 'Tokenpreis', description: 'Aktueller Börsenkurs je Token.', unit: 'Währung/Token', optional: false }
    ],
    workedExample: {
      scenario: '19.500.000 Token im Umlauf (maximal 21.000.000) bei einem Kurs von 60.000 $ je Token.',
      stepByStep: [
        'Marktkapitalisierung = 19.500.000 × 60.000 $ = 1,17 Billionen $ ($1,170 Mrd.).',
        'FDV = 21.000.000 × 60.000 $ = 1,26 Billionen $ ($1,260 Mrd.).'
      ],
      result: 'Marktkapitalisierung = 1,17 Bio. $ | Verwässerte Bewertung (FDV) = 1,26 Bio. $'
    },
    interpretation: 'Zeigt die tatsächliche relative Größe eines Projekts im Vergleich zum Gesamtmarkt.',
    assumptions: 'Ausreichende Marktliquidität im Orderbuch.',
    limitations: 'Zukünftige Freischaltungszeitpläne (Vesting) können Verkaufsdruck erzeugen.',
    faqs: [
      { question: 'Was bedeutet Fully Diluted Valuation (FDV)?', answer: 'Der theoretische Gesamtwert, wenn alle jemals existierenden Token zum heutigen Marktpreis im Umlauf wären.' }
    ],
    relatedTools
  })
});

export const STOCK_SPLIT_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} computes the exact share quantity, post-split price, and total portfolio valuation following forward and reverse stock splits.`,
    howToUse: [
      'Enter the number of shares owned before the split occurred.',
      'Enter the pre-split market price per share in dollars.',
      'Enter the split ratio (e.g. 2 for a 2:1 split, 3 for 3:1, or 0.5 for a 1:2 reverse split).',
      'Review your new post-split share count, adjusted per-share cost basis, and total capital position.'
    ],
    formula: 'Shares_post = Shares_pre × Ratio | Price_post = Price_pre / Ratio | Total Value = Shares × Price',
    formulaVariables: [
      { name: 'Shares Owned (Pre-Split)', description: 'Quantity of equity shares held before corporate split execution.', unit: 'Shares', optional: false },
      { name: 'Share Price (Pre-Split)', description: 'Closing or current market price per share before the split.', unit: 'Currency ($)', optional: false },
      { name: 'Split Ratio (New : Old)', description: 'Multiplier of new shares issued per existing share held (e.g. 2 for 2:1).', unit: 'Ratio', optional: false }
    ],
    workedExample: {
      scenario: 'An investor owns 100 shares of a stock priced at $200.00/share undergoing a 2:1 forward split.',
      stepByStep: [
        'Post-Split Shares = 100 shares × 2 = 200 shares.',
        'Post-Split Price = $200.00 / 2 = $100.00 per share.',
        'Position Value Before = 100 × $200.00 = $20,000.00.',
        'Position Value After = 200 × $100.00 = $20,000.00 (Total equity value remains constant).'
      ],
      result: 'Post-Split: 200 Shares @ $100.00/share | Total Position Value: $20,000.00'
    },
    interpretation: 'A stock split increases liquidity and share availability without diluting an investor\'s proportional ownership or total dollar value of the holding.',
    assumptions: 'Assumes whole share execution with cash-in-lieu for any fractional shares according to broker policy.',
    limitations: 'Does not predict post-split market volatility, subsequent earnings performance, or bid-ask spread variations.',
    faqs: [
      { question: 'Does a stock split make me richer or increase my total money?', answer: 'No. The total value of your position remains exactly the same immediately after the split. You hold more shares, but each share is priced proportionally lower.' },
      { question: 'What is the difference between a forward split and a reverse split?', answer: 'In a forward split (e.g., 2:1), share count increases and price drops. In a reverse split (e.g., 1:10), share count decreases and price increases proportionally.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب عدد الأسهم الجديد، وسعر السهم المعدل بعد التجزئة، وإجمالي القيمة السوقية للمحفظة في حالات تجزئة الأسهم العادية أو العكسية.`,
    howToUse: [
      'أدخل عدد الأسهم المملوكة قبل تنفيذ التجزئة.',
      'أدخل سعر السهم السوقي قبل التجزئة بالدولار أو العملة المحلية.',
      'أدخل نسبة التجزئة (مثلاً 2 لتجزئة 2:1، أو 0.5 للتجزئة العكسية 1:2).',
      'اطّلع على عدد الأسهم الجديد وسعر التكلفة المعدل وإجمالي قيمة المحفظة.'
    ],
    formula: 'الأسهم بعد التجزئة = الأسهم قبل التجزئة × النسبة | السعر بعد التجزئة = السعر قبل التجزئة ÷ النسبة',
    formulaVariables: [
      { name: 'الأسهم قبل التجزئة', description: 'عدد الأسهم المملوكة قبل قرار الشركة.', unit: 'سهم', optional: false },
      { name: 'سعر السهم قبل التجزئة', description: 'سعر إغلاق السهم قبل نفاذ التجزئة.', unit: 'عملة', optional: false },
      { name: 'نسبة التجزئة', description: 'معدل الأسهم الجديدة لكل سهم قديم (مثل 2 لتجزئة 2:1).', unit: 'نسبة', optional: false }
    ],
    workedExample: {
      scenario: 'مستثمر يمتلك 100 سهم بسعر 200 دولار للسهم وتمت تجزئة السهم بنسبة 2:1.',
      stepByStep: [
        'عدد الأسهم بعد التجزئة = 100 × 2 = 200 سهم.',
        'سعر السهم بعد التجزئة = 200 ÷ 2 = 100.00 دولار للسهم.',
        'القيمة الإجمالية قبل = 100 × 200 = 20,000.00 دولار.',
        'القيمة الإجمالية بعد = 200 × 100 = 20,000.00 دولار (القيمة الإجمالية للمحفظة ثابتة تماماً).'
      ],
      result: 'بعد التجزئة: 200 سهم بسعر 100.00 دولار/سهم | القيمة الإجمالية: 20,000.00 دولار'
    },
    interpretation: 'تزيد تجزئة الأسهم من سيولة التداول دون التأثير على نسبة ملكية المستثمر أو القيمة النقدية لمحفظته.',
    assumptions: 'تفترض تنفيذ التجزئة بدقة مع تسوية الكسور نقداً وفق سياسة الوسيط المالي.',
    limitations: 'لا تتنبأ بحركة السعر السوقية أو تقلبات التداول بعد التجزئة.',
    faqs: [
      { question: 'هل تجزئة الأسهم تزيد من ثروتي أو أرباحي مباشرة؟', answer: 'لا، تظل القيمة الإجمالية لاستثمارك كما هي تماماً. يزداد عدد الأسهم وينخفض سعر كل سهم بنفس النسبة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la cantidad exacta de acciones, el precio ajustado y la valoración total de la cartera tras un desdoblamiento de acciones (stock split directo o inverso).`,
    howToUse: [
      'Ingrese el número de acciones poseídas antes del split.',
      'Ingrese el precio de mercado por acción antes del split.',
      'Indique el ratio de división (ej. 2 para un split 2:1, o 0.5 para un contra-split 1:2).',
      'Revise el nuevo volumen de acciones, el precio ajustado y la posición total.'
    ],
    formula: 'Acciones_post = Acciones_pre × Ratio | Precio_post = Precio_pre / Ratio',
    formulaVariables: [
      { name: 'Acciones Previas', description: 'Número de títulos en cartera antes del split.', unit: 'Acciones', optional: false },
      { name: 'Precio Previo', description: 'Cotización de la acción antes del ajuste corporativo.', unit: 'Moneda', optional: false },
      { name: 'Ratio del Split', description: 'Multiplicador de acciones nuevas por acción existente.', unit: 'Ratio', optional: false }
    ],
    workedExample: {
      scenario: '100 acciones a $200.00/acción con un stock split 2:1.',
      stepByStep: [
        'Acciones tras el split = 100 × 2 = 200 acciones.',
        'Precio tras el split = $200.00 / 2 = $100.00 por acción.',
        'Valor antes = 100 × $200.00 = $20,000.00.',
        'Valor después = 200 × $100.00 = $20,000.00 (El capital total se mantiene idéntico).'
      ],
      result: 'Post-Split: 200 Acciones a $100.00/acción | Valor Total: $20,000.00'
    },
    interpretation: 'Un split aumenta la liquidez del valor sin diluir la participación porcentual del inversor.',
    assumptions: 'Supone ejecución completa y liquidación en efectivo de fracciones según el bróker.',
    limitations: 'No predice la volatilidad bursátil posterior al split.',
    faqs: [
      { question: '¿Un stock split genera ganancias automáticas?', answer: 'No. El valor total de su inversión no cambia en el momento del split; simplemente posee más acciones a un precio proporcionalmente menor.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule le nombre d'actions ajusté, le nouveau cours unitaire et la valorisation globale du portefeuille après division ou regroupement d'actions (stock split).`,
    howToUse: [
      "Saisissez le nombre d'actions détenues avant l'opération.",
      "Saisissez le cours de l'action avant le split.",
      "Indiquez le ratio de split (ex. 2 pour un split 2:1, ou 0,5 pour un regroupement 1:2).",
      "Consultez votre nouveau nombre de titres et le cours ajusté."
    ],
    formula: 'Actions_post = Actions_pre × Ratio | Cours_post = Cours_pre / Ratio',
    formulaVariables: [
      { name: "Actions avant split", description: "Nombre d'actions détenues.", unit: 'Actions', optional: false },
      { name: 'Cours avant split', description: 'Prix de marché avant la division.', unit: 'Devise', optional: false },
      { name: 'Ratio de split', description: 'Facteur de multiplication des actions.', unit: 'Ratio', optional: false }
    ],
    workedExample: {
      scenario: '100 actions à 200,00 $ avec un split 2:1.',
      stepByStep: [
        "Nombre d'actions post-split = 100 × 2 = 200 actions.",
        'Cours post-split = 200,00 $ / 2 = 100,00 $ par action.',
        'Valeur totale avant = 100 × 200,00 $ = 20 000,00 $.',
        'Valeur totale après = 200 × 100,00 $ = 20 000,00 $ (Capital inchangé).'
      ],
      result: 'Post-Split : 200 Actions à 100,00 $/action | Valeur Totale : 20 000,00 $'
    },
    interpretation: "La division d'actions améliore la liquidité sans modifier la part proportionnelle de l'actionnaire.",
    assumptions: "Hypothèse d'exécution intégrale des ordres.",
    limitations: 'Ne préjuge pas des mouvements de marché futurs.',
    faqs: [
      { question: 'Un stock split me rend-il plus riche ?', answer: 'Non. La valeur totale de votre ligne boursière reste rigoureusement identique lors du split.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die exakte Aktienanzahl, den bereinigten Aktienkurs und den Gesamtwert des Portfolios nach einem Aktiensplit oder Reverse-Split.`,
    howToUse: [
      'Geben Sie die Anzahl der vor dem Split gehaltenen Aktien ein.',
      'Geben Sie den Aktienkurs vor dem Split ein.',
      'Geben Sie das Split-Verhältnis ein (z. B. 2 für einen 2:1-Split oder 0,5 für einen 1:2-Reverse-Split).',
      'Überprüfen Sie Ihren neuen Aktienbestand und den angepassten Kurswert.'
    ],
    formula: 'Aktien_neu = Aktien_alt × Verhältnis | Kurs_neu = Kurs_alt / Verhältnis',
    formulaVariables: [
      { name: 'Aktienbestand (vor Split)', description: 'Anzahl der gehaltenen Wertpapiere.', unit: 'Aktien', optional: false },
      { name: 'Aktienkurs (vor Split)', description: 'Börsenkurs vor der Kapitalmaßnahme.', unit: 'Währung', optional: false },
      { name: 'Split-Verhältnis', description: 'Faktor für die Ausgabe neuer Aktien.', unit: 'Verhältnis', optional: false }
    ],
    workedExample: {
      scenario: '100 Aktien zu je 200,00 $ bei einem 2:1-Aktiensplit.',
      stepByStep: [
        'Aktien nach Split = 100 × 2 = 200 Aktien.',
        'Kurs nach Split = 200,00 $ / 2 = 100,00 $ je Aktie.',
        'Gesamtwert vor Split = 100 × 200,00 $ = 20.000,00 $.',
        'Gesamtwert nach Split = 200 × 100,00 $ = 20.000,00 $ (Gesamtkapital bleibt exakt identisch).'
      ],
      result: 'Nach Split: 200 Aktien zu 100,00 $/Aktie | Gesamtwert: 20.000,00 $'
    },
    interpretation: 'Ein Aktiensplit erhöht die Marktliquidität, ohne den prozentualen Anteil oder den Gesamtwert des Anlegers zu verändern.',
    assumptions: 'Vollständige Einbuchung durch die Depotbank.',
    limitations: 'Keine Aussage über nachfolgende Kursschwankungen.',
    faqs: [
      { question: 'Erhöht ein Aktiensplit direkt mein Vermögen?', answer: 'Nein. Der Gesamtwert Ihrer Position bleibt unverändert. Sie besitzen mehr Aktien zu einem proportional geringeren Einzelkurs.' }
    ],
    relatedTools
  })
});

export const BATCH3_FINANCE_HANDLERS: Record<string, Record<Language, KnowledgeHandler>> = {
  'roi-calculator': ROI_CALCULATOR_KNOWLEDGE,
  'freelance-rate-calc': FREELANCE_RATE_KNOWLEDGE,
  'break-even-point': BREAK_EVEN_POINT_KNOWLEDGE,
  'stock-dividend-yield': STOCK_DIVIDEND_YIELD_KNOWLEDGE,
  'rental-property-yield': RENTAL_PROPERTY_YIELD_KNOWLEDGE,
  'cap-rate': CAP_RATE_KNOWLEDGE,
  'college-savings': COLLEGE_SAVINGS_KNOWLEDGE,
  '401k-retirement': RETIREMENT_401K_KNOWLEDGE,
  'inflation-future': INFLATION_FUTURE_KNOWLEDGE,
  'currency-crypto': CURRENCY_CRYPTO_KNOWLEDGE,
  'stock-split-calculator': STOCK_SPLIT_KNOWLEDGE,
  'stock-split-shares-price-adjustment': STOCK_SPLIT_KNOWLEDGE,
};
