import { ToolDef, Language } from '../../types';
import { ToolContentDetails } from './types';

export const CORPORATE_FINANCE_SPECIALIZED_HANDLERS: Record<string, Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails>> = {
  // 1. WACC CALCULATOR
  'wacc-calculator': {
    en: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'The Weighted Average Cost of Capital (WACC) calculator evaluates a company’s blended cost of financing across both equity and debt capital. WACC represents the minimum hurdle rate required by investors and lenders to fund corporate operations and growth projects.',
      whoUsesIt: 'Corporate financial analysts, CFOs, investment bankers, private equity associates, and valuation professionals.',
      whatItCalculates: 'Determines the overall weighted percentage cost of capital, reflecting tax shield benefits on corporate debt obligations.',
      howToUse: [
        'Enter the total market value of equity ($) and total market value of debt ($).',
        'Input the estimated cost of equity (%) and cost of debt (%).',
        'Specify the effective corporate tax rate (%) to compute the interest tax deduction benefit.'
      ],
      formula: 'WACC = (E / V) × Re + (D / V) × Rd × (1 - Tc)',
      formulaVariables: [
        { symbol: 'E', name: 'Market Value of Equity', explanation: 'Total market capitalization or market value of common and preferred equity ($).' },
        { symbol: 'D', name: 'Market Value of Debt', explanation: 'Total market value of interest-bearing corporate debt ($).' },
        { symbol: 'V', name: 'Total Capital Value', explanation: 'Total capital structure value equal to E + D ($).' },
        { symbol: 'Re', name: 'Cost of Equity', explanation: 'Required rate of return requested by equity investors (derived via CAPM).' },
        { symbol: 'Rd', name: 'Cost of Debt', explanation: 'Pre-tax yield to maturity or interest rate paid on corporate borrowings.' },
        { symbol: 'Tc', name: 'Corporate Tax Rate', explanation: 'Effective marginal corporate tax rate enabling tax-deductible interest expense.' }
      ],
      inputs: [
        { name: 'Equity Value (E)', description: 'Market value of equity in dollars.', unit: '$', optional: false },
        { name: 'Debt Value (D)', description: 'Market value of debt obligations.', unit: '$', optional: false },
        { name: 'Cost of Equity (Re)', description: 'Expected equity return rate.', unit: '%', optional: false },
        { name: 'Cost of Debt (Rd)', description: 'Average interest yield on debt.', unit: '%', optional: false },
        { name: 'Corporate Tax Rate (Tc)', description: 'Marginal tax rate.', unit: '%', optional: false }
      ],
      unitsAndConversions: 'Express capital amounts in consistent monetary units ($ or local currency) and interest/tax rates as percentages (%).',
      workedExample: {
        scenario: 'A company has $60,000,000 in equity and $40,000,000 in debt. Cost of equity is 10%, cost of debt is 5%, and corporate tax rate is 25%.',
        stepByStep: [
          'Calculate total capital structure V = $60M + $40M = $100M.',
          'Determine equity weight (E/V = 60%) and debt weight (D/V = 40%).',
          'Calculate post-tax cost of debt = 5% × (1 - 0.25) = 3.75%.',
          'Multiply weights: (60% × 10%) + (40% × 3.75%) = 6.0% + 1.5% = 7.50%.'
        ],
        result: 'Weighted Average Cost of Capital (WACC) = 7.50%'
      },
      understandingResults: 'A WACC of 7.50% means any capital investment or corporate acquisition must generate an Internal Rate of Return (IRR) greater than 7.50% to create net shareholder value (positive NPV).',
      assumptions: 'Assumes stable capital structure proportions, market-based equity/debt valuations, and predictable interest tax deductions.',
      limitations: 'Does not account for sudden changes in market interest rates, credit rating downgrades, or non-linear distress costs at high debt leverage levels.',
      faqs: [
        { question: 'What is WACC used for in corporate finance?', answer: 'WACC is primarily used as the discount rate in Discounted Cash Flow (DCF) models to calculate Enterprise Value, and as a benchmark hurdle rate for corporate capital budgeting.' },
        { question: 'Why is the cost of debt multiplied by (1 - Tax Rate)?', answer: 'Interest payments on corporate debt are tax-deductible in most tax jurisdictions, creating an "interest tax shield" that reduces the effective net cost of borrowing.' },
        { question: 'What happens to WACC if debt increases?', answer: 'Because debt is generally cheaper than equity and offers tax savings, adding moderate debt usually lowers WACC. However, excessive debt increases financial distress risk and raises both Rd and Re.' }
      ],
      relatedTools
    }),
    ar: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'تقوم حاسبة المتوسط المرجح لتكلفة رأس المال (WACC) بتقييم التكلفة الإجمالية المختلطة لتمويل الشركة عبر الأسهم والديون. يمثل WACC الحد الأدنى من العائد المطلوب من قبل المستثمرين والمقرضين لتمويل العمليات والمشاريع الاستثمارية.',
      whoUsesIt: 'المحللون الماليون للشركات، رؤساء الشؤون المالية (CFO)، المصرفيون الاستثماريون، ومقيمو الشركات.',
      whatItCalculates: 'تحسب النسبية المئوية المرجحة لتكلفة رأس المال مع مراعاة الوفر الضريبي المتحقق من الفوائد على الديون.',
      howToUse: [
        'أدخل القيمة السوقية لإجمالي حقوق الملكية ($) والقيمة السوقية لإجمالي الديون ($).',
        'أدخل تكلفة حقوق الملكية المتوقعة (%) وتكلفة الدين (%).',
        'حدد نسبة الضريبة الفعلية على الشركات (%) لحساب الوفر الضريبي.'
      ],
      formula: 'WACC = (E / V) × Re + (D / V) × Rd × (1 - Tc)',
      formulaVariables: [
        { symbol: 'E', name: 'القيمة السوقية لحقوق الملكية', explanation: 'القيمة السوقية الإجمالية لأسهم الشركة ($).' },
        { symbol: 'D', name: 'القيمة السوقية للديون', explanation: 'القيمة السوقية لجميع الديون والسندات الفائدة ($).' },
        { symbol: 'V', name: 'إجمالي رأس المال', explanation: 'مجموع حقوق الملكية والديون (E + D).' },
        { symbol: 'Re', name: 'تكلفة حقوق الملكية', explanation: 'معدل العائد المطلوب من قبل المساهمين.' },
        { symbol: 'Rd', name: 'تكلفة الدين', explanation: 'معدل الفائدة أو العائد حتى الاستحقاق للديون.' },
        { symbol: 'Tc', name: 'نسبة ضريبة الشركات', explanation: 'نسبة الضريبة الفعلية المطبقة على أرباح الشركات.' }
      ],
      inputs: [
        { name: 'قيمة حقوق الملكية (E)', description: 'القيمة السوقية للأسهم بالدولار.', unit: '$', optional: false },
        { name: 'قيمة الدين (D)', description: 'القيمة السوقية للديون.', unit: '$', optional: false },
        { name: 'تكلفة حقوق الملكية (Re)', description: 'العائد المطلوب من المساهمين.', unit: '%', optional: false },
        { name: 'تكلفة الدين (Rd)', description: 'معدل الفائدة على الديون.', unit: '%', optional: false },
        { name: 'نسبة الضريبة (Tc)', description: 'نسبة ضريبة الشركات.', unit: '%', optional: false }
      ],
      unitsAndConversions: 'يجب إدخال المبالغ بنسق مالي موحد والنسب في صورة مئوية (%).',
      workedExample: {
        scenario: 'شركة تمتلك 60,000,000 $ حقوق ملكية و 40,000,000 $ ديون. تكلفة الملكية 10%، تكلفة الدين 5%، ونسبة الضريبة 25%.',
        stepByStep: [
          'إجمالي رأس المال V = 60M$ + 40M$ = 100M$.',
          'وزن حقوق الملكية (60%) ووزن الدين (40%).',
          'تكلفة الدين بعد الضريبة = 5% × (1 - 0.25) = 3.75%.',
          'المتوسط المرجح = (60% × 10%) + (40% × 3.75%) = 6.0% + 1.5% = 7.50%.'
        ],
        result: 'المتوسط المرجح لتكلفة رأس المال (WACC) = 7.50%'
      },
      understandingResults: 'نتيجة WACC البالغة 7.50% تعني أن أي مشروع استثماري جديد يجب أن يحقق عائداً أعلى من 7.50% لإضافة قيمة حقيقية للمساهمين.',
      assumptions: 'تفترض ثبات هيكل رأس المال والقدرة على خصم الفوائد من الوعاء الضريبي.',
      limitations: 'لا تأخذ في الحسبان التغيرات المفاجئة في أسعار الفائدة أو تقلبات التصنيف الائتماني.',
      faqs: [
        { question: 'ما هو استخدام WACC الرئيسي؟', answer: 'يُستخدم WACC كمعدل خصم رئيسي في نماذج التدفقات النقدية المخصومة (DCF) لتقييم الشركات والمشاريع الاستثمارية.' },
        { question: 'لماذا تُضرب تكلفة الدين في (1 - نسبة الضريبة)؟', answer: 'لأن الفوائد المدفوعة على الديون تُخصم من الأرباح الخاضعة للضريبة، مما يخلق درعاً ضريبياً يقلل التكلفة الفعلية للدين.' },
        { question: 'كيف يؤثر زيادة الدين على WACC؟', answer: 'زيادة الدين المعتدلة تقلل WACC لأن الدين أرخص من الملكية، لكن الدين المفرط يرفع مخاطر الإفلاس ويزيد تكلفة التمويل.' }
      ],
      relatedTools
    }),
    es: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'La calculadora del Coste Medio Ponderado del Capital (WACC) evalúa el coste global de financiación de una empresa considerando tanto el capital propio como la deuda. El WACC representa la rentabilidad mínima exigida por inversores y acreedores.',
      whoUsesIt: 'Analistas financieros, directores financieros (CFO), banqueros de inversión y valoradores de empresas.',
      whatItCalculates: 'Calcula el porcentaje ponderado del coste de capital incorporando el beneficio fiscal de los intereses de la deuda.',
      howToUse: [
        'Introduzca el valor de mercado del patrimonio neto ($) y de la deuda ($).',
        'Especifique el coste del patrimonio neto (%) y el coste de la deuda (%).',
        'Indique la tasa impositiva corporativa (%) aplicable.'
      ],
      formula: 'WACC = (E / V) × Re + (D / V) × Rd × (1 - Tc)',
      formulaVariables: [
        { symbol: 'E', name: 'Valor de mercado del patrimonio', explanation: 'Capitalización bursátil o valor de mercado de las acciones ($).' },
        { symbol: 'D', name: 'Valor de mercado de la deuda', explanation: 'Valor total de mercado de la deuda con coste financiero ($).' },
        { symbol: 'V', name: 'Capital total (E + D)', explanation: 'Suma total del capital propio y la deuda.' },
        { symbol: 'Re', name: 'Coste del patrimonio', explanation: 'Rentabilidad exigida por los accionistas.' },
        { symbol: 'Rd', name: 'Coste de la deuda', explanation: 'Tipo de interés bruto pagado por la financiación ajena.' },
        { symbol: 'Tc', name: 'Tasa impositiva', explanation: 'Tipo impositivo efectivo sobre beneficios corporativos.' }
      ],
      inputs: [
        { name: 'Patrimonio (E)', description: 'Valor de mercado del capital propio.', unit: '$', optional: false },
        { name: 'Deuda (D)', description: 'Valor de mercado de la deuda.', unit: '$', optional: false },
        { name: 'Coste Patrimonio (Re)', description: 'Rentabilidad exigida por accionistas.', unit: '%', optional: false },
        { name: 'Coste Deuda (Rd)', description: 'Tipo de interés medio de la deuda.', unit: '%', optional: false },
        { name: 'Tipo Impositivo (Tc)', description: 'Impuesto de sociedades efectivo.', unit: '%', optional: false }
      ],
      unitsAndConversions: 'Introduzca los datos monetarios en la misma divisa ($) y los tipos en porcentaje (%).',
      workedExample: {
        scenario: 'Empresa con $60M en patrimonio y $40M en deuda. Re = 10%, Rd = 5%, Tc = 25%.',
        stepByStep: [
          'Capital total V = $60M + $40M = $100M.',
          'Ponderación: Patrimonio 60%, Deuda 40%.',
          'Coste de deuda tras impuestos = 5% × (1 - 0.25) = 3.75%.',
          'WACC = (60% × 10%) + (40% × 3.75%) = 7.50%.'
        ],
        result: 'Coste Medio Ponderado del Capital (WACC) = 7.50%'
      },
      understandingResults: 'Un WACC del 7.50% implica que cualquier inversión debe rentar más del 7.50% para generar valor neto a los accionistas.',
      assumptions: 'Asume una estructura de capital estable y deducción fiscal efectiva de intereses.',
      limitations: 'No refleja volatilidades bruscas en los tipos de interés de mercado ni costes de quiebra no lineales.',
      faqs: [
        { question: '¿Para qué se utiliza el WACC?', answer: 'Se utiliza como tasa de descuento en modelos de Flujos de Caja Descontados (DCF) para valorar empresas e inversiones.' },
        { question: '¿Por qué se multiplica la deuda por (1 - Impuestos)?', answer: 'Debido al escudo fiscal que proporcionan los gastos financieros deducibles.' },
        { question: '¿Cómo afecta más deuda al WACC?', answer: 'Una cantidad moderada reduce el WACC, pero un endeudamiento excesivo eleva el riesgo financiero y encarece todo el capital.' }
      ],
      relatedTools
    }),
    fr: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Le calculateur du Coût Moyen Pondéré du Capital (CMPC / WACC) évalue le coût global de financement d’une entreprise combinant fonds propres et dettes financières.',
      whoUsesIt: 'Analystes financiers, directeurs financiers (CFO), banquiers d’affaires et évaluateurs.',
      whatItCalculates: 'Détermine le taux de rendement minimal exigé par les investisseurs et prêteurs.',
      howToUse: [
        'Saisissez la valeur de marché des fonds propres ($) et de la dette ($).',
        'Indiquez le coût des fonds propres (%) et le coût de la dette (%).',
        'Précisez le taux d’imposition sur les sociétés (%).'
      ],
      formula: 'WACC = (E / V) × Re + (D / V) × Rd × (1 - Tc)',
      formulaVariables: [
        { symbol: 'E', name: 'Fonds propres', explanation: 'Capitalisation boursière ou valeur de marché des fonds propres ($).' },
        { symbol: 'D', name: 'Dette financière', explanation: 'Valeur de marché des dettes porteuses d’intérêts ($).' },
        { symbol: 'V', name: 'Capital total', explanation: 'Valeur totale de la structure de capital (E + D).' },
        { symbol: 'Re', name: 'Coût des fonds propres', explanation: 'Taux de rentabilité exigé par les actionnaires.' },
        { symbol: 'Rd', name: 'Coût de la dette', explanation: 'Taux d’intérêt brut sur les emprunts.' },
        { symbol: 'Tc', name: 'Taux d’imposition', explanation: 'Taux d’imposition effectif sur les sociétés.' }
      ],
      inputs: [
        { name: 'Fonds Propres (E)', description: 'Valeur de marché des capitaux propres.', unit: '$', optional: false },
        { name: 'Dette (D)', description: 'Valeur de marché des dettes.', unit: '$', optional: false },
        { name: 'Coût Fonds Propres (Re)', description: 'Rendement exigé par les actionnaires.', unit: '%', optional: false },
        { name: 'Coût Dette (Rd)', description: 'Taux d’intérêt moyen.', unit: '%', optional: false },
        { name: 'Taux d’imposition (Tc)', description: 'Impôt sur les sociétés.', unit: '%', optional: false }
      ],
      unitsAndConversions: 'Indiquez les montants dans la même devise ($) et les taux en pourcentage (%).',
      workedExample: {
        scenario: 'Entreprise avec 60 M$ de fonds propres et 40 M$ de dette. Re = 10 %, Rd = 5 %, Tc = 25 %.',
        stepByStep: [
          'Capital total V = 60 M$ + 40 M$ = 100 M$.',
          'Pondération : Fonds propres 60 %, Dette 40 %.',
          'Coût de la dette après impôt = 5 % × (1 - 0,25) = 3,75 %.',
          'WACC = (60 % × 10 %) + (40 % × 3,75 %) = 7,50 %.'
        ],
        result: 'Coût Moyen Pondéré du Capital (WACC) = 7,50 %'
      },
      understandingResults: 'Un WACC de 7,50 % signifie que tout projet doit rapporter plus de 7,50 % pour créer de la valeur pour les actionnaires.',
      assumptions: 'Suggère une structure financière stable et l’effectivité de la déductibilité fiscale des intérêts.',
      limitations: 'Ne prend pas en compte les chocs de taux d’intérêt ou la dégradation de notation financière.',
      faqs: [
        { question: 'À quoi sert le WACC ?', answer: 'Il sert de taux d’actualisation dans les modèles d’évaluation par les flux de trésorerie actualisés (DCF).' },
        { question: 'Pourquoi prendre en compte l’impôt ?', answer: 'Parce que les intérêts d’emprunt sont déductibles, créant un économie d’impôt.' },
        { question: 'Comment réduire le WACC ?', answer: 'En optimisant le ratio fonds propres/dette sans surendetter l’entreprise.' }
      ],
      relatedTools
    }),
    de: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Der WACC-Rechner (Weighted Average Cost of Capital) ermittelt die durchschnittlichen gewichteten Gesamtkapitalkosten eines Unternehmens unter Berücksichtigung von Eigen- und Fremdkapital.',
      whoUsesIt: 'Finanzanalysten, CFOs, Investmentbanker und Unternehmensbewertet.',
      whatItCalculates: 'Ermittelt die Mindestverzinsung für Investitionsprojekte unter Beachtung des Tax Shields.',
      howToUse: [
        'Geben Sie den Marktwert des Eigenkapitals ($) und Fremdkapitals ($) ein.',
        'Tragen Sie die Eigenkapitalkosten (%) und Fremdkapitalkosten (%) ein.',
        'Geben Sie den effektiven Ertragsteuersatz (%) an.'
      ],
      formula: 'WACC = (E / V) × Re + (D / V) × Rd × (1 - Tc)',
      formulaVariables: [
        { symbol: 'E', name: 'Eigenkapitalwert', explanation: 'Marktkapitalisierung bzw. Marktwert des Eigenkapitals ($).' },
        { symbol: 'D', name: 'Fremdkapitalwert', explanation: 'Marktwert des verzinslichen Fremdkapitals ($).' },
        { symbol: 'V', name: 'Gesamtkapital', explanation: 'Summe aus Eigen- und Fremdkapital (E + D).' },
        { symbol: 'Re', name: 'Eigenkapitalkosten', explanation: 'Renditeerwartung der Eigenkapitalgeber.' },
        { symbol: 'Rd', name: 'Fremdkapitalkosten', explanation: 'Zinssatz für Fremdkapital vor Steuern.' },
        { symbol: 'Tc', name: 'Ertragsteuersatz', explanation: 'Effektiver Unternehmenssteuersatz.' }
      ],
      inputs: [
        { name: 'Eigenkapital (E)', description: 'Marktwert des Eigenkapitals.', unit: '$', optional: false },
        { name: 'Fremdkapital (D)', description: 'Marktwert der Schulden.', unit: '$', optional: false },
        { name: 'Eigenkapitalkosten (Re)', description: 'Erwartete Rendite.', unit: '%', optional: false },
        { name: 'Fremdkapitalkosten (Rd)', description: 'Durchschnittlicher Fremdkapitalzins.', unit: '%', optional: false },
        { name: 'Steuersatz (Tc)', description: 'Unternehmenssteuersatz.', unit: '%', optional: false }
      ],
      unitsAndConversions: 'Kapitalwerte in gleicher Währung ($) und Zinssätze in Prozent (%).',
      workedExample: {
        scenario: 'Unternehmen mit $60M Eigenkapital und $40M Fremdkapital. Re = 10%, Rd = 5%, Tc = 25%.',
        stepByStep: [
          'Gesamtkapital V = $60M + $40M = $100M.',
          'Gewichtung: Eigenkapital 60%, Fremdkapital 40%.',
          'Fremdkapitalkosten nach Steuern = 5% × (1 - 0,25) = 3,75%.',
          'WACC = (60% × 10%) + (40% × 3,75%) = 7,50%.'
        ],
        result: 'Gewichtete Gesamtkapitalkosten (WACC) = 7,50%'
      },
      understandingResults: 'Ein WACC von 7,50% bedeutet, dass Investitionen mindestens 7,50% Rendite erwirtschaften müssen, um Wert zu schaffen.',
      assumptions: 'Unterstellt stabile Kapitalstruktur und wirksamen Zinsabzug.',
      limitations: 'Berücksichtigt keine plötzlichen Zinsänderungen oder Bonitätsabstufungen.',
      faqs: [
        { question: 'Wofür wird der WACC benötigt?', answer: 'Als Diskontierungssatz in DCF-Modellen zur Unternehmensbewertung.' },
        { question: 'Warum wird die Steuer berücksichtigt?', answer: 'Wegen der steuerlichen Abzugsfähigkeit von Fremdkapitalzinsen (Tax Shield).' },
        { question: 'Wie wirkt sich mehr Fremdkapital aus?', answer: 'Moderate Verschuldung senkt den WACC, hohe Verschuldung erhöht das Insolvenzrisiko.' }
      ],
      relatedTools
    })
  },

  // 2. DSCR CALCULATOR (Debt Service Coverage Ratio)
  'dscr-calculator': {
    en: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'The Debt Service Coverage Ratio (DSCR) calculator measures a commercial entity or real estate property’s ability to generate sufficient Net Operating Income (NOI) to cover annual debt service obligations including principal and interest.',
      whoUsesIt: 'Commercial lenders, real estate investors, mortgage underwriters, and credit analysts.',
      whatItCalculates: 'Computes the coverage multiple comparing available operating cash flow against total principal and interest obligations.',
      howToUse: [
        'Enter annual Net Operating Income (NOI) or EBITDA ($).',
        'Input total annual debt payments (principal + interest) ($).'
      ],
      formula: 'DSCR = Net Operating Income (NOI) / Total Debt Service',
      formulaVariables: [
        { symbol: 'NOI', name: 'Net Operating Income', explanation: 'Annual gross operating revenues minus operating expenses (before taxes and interest).' },
        { symbol: 'Debt Service', name: 'Total Debt Payment', explanation: 'Combined annual principal amortization and interest obligations due ($).' }
      ],
      inputs: [
        { name: 'Net Operating Income (NOI)', description: 'Annual operating cash flow before debt service.', unit: '$', optional: false },
        { name: 'Annual Debt Service', description: 'Total annual principal + interest payments.', unit: '$', optional: false }
      ],
      unitsAndConversions: 'Use annual monetary amounts in dollars ($) or local currency.',
      workedExample: {
        scenario: 'A commercial property generates $150,000 in annual Net Operating Income (NOI) and has an annual debt payment of $120,000.',
        stepByStep: [
          'Identify annual NOI = $150,000.',
          'Identify annual debt service = $120,000.',
          'Divide NOI by Debt Service: $150,000 / $120,000 = 1.25x.'
        ],
        result: 'Debt Service Coverage Ratio (DSCR) = 1.25x'
      },
      understandingResults: 'A DSCR of 1.25x indicates the property generates 25% more income than required to service debt. Lenders typically require a minimum DSCR of 1.20x to 1.25x for loan approval.',
      assumptions: 'Assumes stable property occupancy and predictable operating expenses without unexpected capital expenditures.',
      limitations: 'Does not account for future tenant vacancies, interest rate adjustments on variable loans, or major unbudgeted maintenance.',
      faqs: [
        { question: 'What is a good DSCR ratio for a commercial loan?', answer: 'Most commercial lenders look for a DSCR of 1.25x or higher. A ratio below 1.0x means net operating income is insufficient to cover debt service (negative cash flow).' },
        { question: 'What is the difference between DSCR and ICR (Interest Coverage Ratio)?', answer: 'ICR only measures ability to pay interest expenses, while DSCR measures ability to cover both principal amortization and interest payments.' }
      ],
      relatedTools
    }),
    ar: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'تقوم حاسبة نسبة تغطية خدمة الدين (DSCR) بتمحيص قدرة العقارات التجارية والشركات على توليد صافي دخل تشغيلي (NOI) يكفي لتغطية أقساط الديون السنوية (الأصل والفوائد).',
      whoUsesIt: 'المقرضون التجاريون، مستثمرو العقارات، ومحللو الائتمان في البنوك.',
      whatItCalculates: 'تحسب مضاعف التغطية بين التدفق النقدي التشغيلي المتاح وإجمالي أقساط القروض.',
      howToUse: [
        'أدخل صافي الدخل التشغيلي السنوي (NOI) بالدولار ($).',
        'أدخل إجمالي خدمة الدين السنوية (الأصل والفوائد) ($).'
      ],
      formula: 'DSCR = Net Operating Income (NOI) / Total Debt Service',
      formulaVariables: [
        { symbol: 'NOI', name: 'صافي الدخل التشغيلي', explanation: 'الإيرادات السنوية مطروحاً منها مصاريف التشغيل قبل الضرائب والفوائد.' },
        { symbol: 'Debt Service', name: 'خدمة الدين السنوية', explanation: 'إجمالي الأقساط والفوائد المستحقة سنوياً.' }
      ],
      inputs: [
        { name: 'صافي الدخل التشغيلي (NOI)', description: 'التدفق النقدي قبل أقساط الديون.', unit: '$', optional: false },
        { name: 'خدمة الدين السنوية', description: 'إجمالي الأقساط والفوائد السنوية.', unit: '$', optional: false }
      ],
      unitsAndConversions: 'يتم استخدام قيم مالية سنوية موحدة ($).',
      workedExample: {
        scenario: 'عقار تجاري يحقق 150,000 $ صافي دخل تشغيلي سنوياً وتبلغ أقساط دينه السنوية 120,000 $.',
        stepByStep: [
          'تحديد صافي الدخل التشغيلي = 150,000 $.',
          'تحديد إجمالي أقساط الدين = 120,000 $.',
          'القسمة: 150,000 $ / 120,000 $ = 1.25x.'
        ],
        result: 'نسبة تغطية خدمة الدين (DSCR) = 1.25x'
      },
      understandingResults: 'نسبة 1.25x تعني أن الدخل التشغيلي يزيد بنسبة 25% عن المبلع المطلوب لسداد الديون. تشترط البنوك عادة نسبة لا تقل عن 1.20x إلى 1.25x لمنح القروض.',
      assumptions: 'تفترض استقرار نسب الإشغال والمصاريف التشغيلية.',
      limitations: 'لا تأخذ في الحسبان الشواغر المفاجئة أو مصاريف الصيانة الرأسمالية غير المتوقعة.',
      faqs: [
        { question: 'ما هي نسبة DSCR الجيدة للموافقة على القروض؟', answer: 'تعتبر نسبة 1.25x أو أعلى ممتازة لدى البنوك التجارية. النسبة أقل من 1.0x تعني عجزاً في تغطية أقساط القرض.' }
      ],
      relatedTools
    }),
    es: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'La calculadora del Ratio de Cobertura del Servicio de la Deuda (DSCR) mide la capacidad de una empresa o inmueble para generar Ingresos Operativos Netos (NOI) suficientes para cubrir el pago anual de capital e intereses.',
      whoUsesIt: 'Prestamistas comerciales, inversores inmobiliarios y analistas de crédito.',
      whatItCalculates: 'Calcula el múltiplo de cobertura entre el flujo de caja operativo y el servicio total de la deuda.',
      howToUse: [
        'Introduzca los Ingresos Operativos Netos (NOI) anuales ($).',
        'Introduzca el servicio total de la deuda anual (principal + intereses) ($).'
      ],
      formula: 'DSCR = Net Operating Income (NOI) / Total Debt Service',
      formulaVariables: [
        { symbol: 'NOI', name: 'Ingreso Operativo Neto', explanation: 'Ingresos operativos menos gastos de explotación antes de impuestos e intereses.' },
        { symbol: 'Debt Service', name: 'Servicio de la deuda', explanation: 'Suma de amortización de principal e intereses anuales.' }
      ],
      inputs: [
        { name: 'Ingreso Operativo Neto (NOI)', description: 'Flujo operativo antes de deuda.', unit: '$', optional: false },
        { name: 'Servicio de la Deuda Anual', description: 'Pago anual de principal e intereses.', unit: '$', optional: false }
      ],
      unitsAndConversions: 'Utilice montos monetarios anuales ($).',
      workedExample: {
        scenario: 'Propiedad comercial con $150,000 de NOI anual y pagos de deuda de $120,000.',
        stepByStep: [
          'NOI = $150,000.',
          'Servicio de deuda = $120,000.',
          'Cálculo: $150,000 / $120,000 = 1.25x.'
        ],
        result: 'Ratio DSCR = 1.25x'
      },
      understandingResults: 'Un DSCR de 1.25x indica que el inmueble genera un 25% más de ingresos de los necesarios para pagar la deuda.',
      assumptions: 'Presupone ocupación e ingresos estables.',
      limitations: 'No incluye imprevistos de vacantes o subidas de tipos de interés variables.',
      faqs: [
        { question: '¿Qué ratio DSCR exigen los bancos?', answer: 'Habitualmente exigen un mínimo de 1.20x a 1.25x para aprobar operaciones bancarias.' }
      ],
      relatedTools
    }),
    fr: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Le calculateur du Ratio de Couverture du Service de la Dette (DSCR) mesure la capacité d’un actif immobilier ou d’une entreprise à rembourser ses annuités d’emprunt.',
      whoUsesIt: 'Banquiers d’affaires, investisseurs immobiliers et analystes crédit.',
      whatItCalculates: 'Détermine le multiple de couverture du résultat opérationnel net par rapport au remboursement du capital et des intérêts.',
      howToUse: [
        'Indiquez le Résultat Opérationnel Net (NOI) annuel ($).',
        'Renseignez le service total de la dette annuel ($).'
      ],
      formula: 'DSCR = Net Operating Income (NOI) / Total Debt Service',
      formulaVariables: [
        { symbol: 'NOI', name: 'Résultat Opérationnel Net', explanation: 'Chiffre d’affaires moins charges d’exploitation hors intérêts et impôts.' },
        { symbol: 'Debt Service', name: 'Service de la dette', explanation: 'Remboursement annuel du capital et des intérêts.' }
      ],
      inputs: [
        { name: 'Résultat Opérationnel Net (NOI)', description: 'Flux d’exploitation avant dette.', unit: '$', optional: false },
        { name: 'Service de la Dette', description: 'Remboursement annuel principal + intérêts.', unit: '$', optional: false }
      ],
      unitsAndConversions: 'Exprimé en valeurs monétaires annuelles ($).',
      workedExample: {
        scenario: 'Immeuble commercial avec 150 000 $ de NOI et 120 000 $ d’échéances de prêt.',
        stepByStep: [
          'NOI = 150 000 $.',
          'Service dette = 120 000 $.',
          'Ratio = 150 000 $ / 120 000 $ = 1,25x.'
        ],
        result: 'Ratio DSCR = 1,25x'
      },
      understandingResults: 'Un ratio de 1,25x montre que les revenus couvrent 125 % des échéances de prêt.',
      assumptions: 'Hypothèse de loyers stables et charges maîtrisées.',
      limitations: 'Ne prend pas en compte la vacance locative soudaine.',
      faqs: [
        { question: 'Quel DSCR minimum exigent les banques ?', answer: 'Généralement entre 1,20x et 1,25x pour accorder un prêt professionnel.' }
      ],
      relatedTools
    }),
    de: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Der DSCR-Rechner (Debt Service Coverage Ratio) misst die Fähigkeit eines Unternehmens oder einer Immobilie, Schuldendienstverpflichtungen aus dem operativen Ergebnis (NOI) zu decken.',
      whoUsesIt: 'Banken, Gewerbeimmobilieninvestoren und Kreditanalysten.',
      whatItCalculates: 'Ermittelt die Deckungsquote von Cashflow zu Zins- und Tilgungszahlungen.',
      howToUse: [
        'Geben Sie das jährliche Nettobetriebsergebnis (NOI) ($) ein.',
        'Tragen Sie den jährlichen Schuldendienst (Tilgung + Zins) ($) ein.'
      ],
      formula: 'DSCR = Net Operating Income (NOI) / Total Debt Service',
      formulaVariables: [
        { symbol: 'NOI', name: 'Nettobetriebsergebnis', explanation: 'Operativer Ertrag vor Zinsen und Steuern.' },
        { symbol: 'Debt Service', name: 'Schuldendienst', explanation: 'Jährliche Tilgungs- und Zinsleistungen.' }
      ],
      inputs: [
        { name: 'Nettobetriebsergebnis (NOI)', description: 'Operativer Cashflow.', unit: '$', optional: false },
        { name: 'Schuldendienst', description: 'Jährliche Kreditrate (Tilgung + Zins).', unit: '$', optional: false }
      ],
      unitsAndConversions: 'Jährliche Beträge in gleicher Währung ($).',
      workedExample: {
        scenario: 'Gewerbeimmobilie mit $150.000 NOI und $120.000 Jahreskreditrate.',
        stepByStep: [
          'NOI = $150.000.',
          'Schuldendienst = $120.000.',
          'Berechnung: $150.000 / $120.000 = 1,25x.'
        ],
        result: 'DSCR Deckungsbeitrag = 1,25x'
      },
      understandingResults: 'Ein DSCR von 1,25x bedeutet, dass die Erträge 25% höher sind als die Kreditverpflichtungen.',
      assumptions: 'Unterstellt stabile Mieteinnahmen.',
      limitations: 'Berücksichtigt keine unerwarteten Leerstände.',
      faqs: [
        { question: 'Welcher DSCR ist für Banken akzeptabel?', answer: 'In der Regel ein DSCR von mindestens 1,20x bis 1,25x.' }
      ],
      relatedTools
    })
  },

  // 3. BLACK-SCHOLES OPTIONS PRICING CALCULATOR
  'options-black-scholes': {
    en: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'The Black-Scholes Model calculator computes theoretical fair values for European call and put financial options based on underlying stock prices, strike price, time to expiration, risk-free interest rates, and implied volatility.',
      whoUsesIt: 'Options traders, quantitative analysts, portfolio managers, and risk managers.',
      whatItCalculates: 'Computes Call Price (C), Put Price (P), and option sensitivity Greeks (Delta, Gamma, Vega, Theta, Rho).',
      howToUse: [
        'Enter current stock spot price ($) and option strike price ($).',
        'Input annual risk-free interest rate (%) and time to expiration in years or days.',
        'Enter annualized volatility (%) of the underlying stock.'
      ],
      formula: 'Call = S₀ × N(d₁) - K × e^(-rT) × N(d₂)',
      formulaVariables: [
        { symbol: 'S₀', name: 'Spot Price', explanation: 'Current market price of the underlying asset ($).' },
        { symbol: 'K', name: 'Strike Price', explanation: 'Pre-agreed strike execution price ($).' },
        { symbol: 'r', name: 'Risk-free Rate', explanation: 'Annualized risk-free benchmark interest rate (%).' },
        { symbol: 'T', name: 'Time to Expiration', explanation: 'Remaining contract duration expressed in years.' },
        { symbol: 'σ', name: 'Volatility', explanation: 'Annualized standard deviation of stock returns.' },
        { symbol: 'N(d)', name: 'Cumulative Normal', explanation: 'Cumulative standard normal distribution function.' }
      ],
      inputs: [
        { name: 'Spot Price (S₀)', description: 'Current stock price.', unit: '$', optional: false },
        { name: 'Strike Price (K)', description: 'Option strike price.', unit: '$', optional: false },
        { name: 'Risk-free Rate (r)', description: 'Risk-free rate.', unit: '%', optional: false },
        { name: 'Time to Expiry (T)', description: 'Duration in years.', unit: 'Years', optional: false },
        { name: 'Volatility (σ)', description: 'Annualized volatility.', unit: '%', optional: false }
      ],
      unitsAndConversions: 'Stock prices in dollars ($), time in years (e.g., 6 months = 0.5 years), and volatility/rates in percent (%).',
      workedExample: {
        scenario: 'Stock at $100, Strike at $100, Time = 1 year, Risk-free rate = 5%, Volatility = 20%.',
        stepByStep: [
          'Calculate d₁ = [ln(100/100) + (0.05 + 0.5×0.20²)×1] / (0.20×√1) = 0.35.',
          'Calculate d₂ = 0.35 - 0.20 = 0.15.',
          'Find N(d₁) = 0.6368 and N(d₂) = 0.5596.',
          'Call Price C = 100 × 0.6368 - 100 × e^(-0.05) × 0.5596 = $10.45.'
        ],
        result: 'European Call Option Fair Value = $10.45'
      },
      understandingResults: 'The theoretical call value of $10.45 represents the fair risk-adjusted cost to buy option upside without downside obligation.',
      assumptions: 'Assumes log-normal distribution of returns, constant volatility, European exercise style (at expiration only), and frictionless markets without dividend payouts.',
      limitations: 'Does not support early exercise (American options) or discrete cash dividend distributions prior to expiration.',
      faqs: [
        { question: 'What is implied volatility in Black-Scholes?', answer: 'Implied volatility is the volatility value that, when plugged into Black-Scholes, yields the market’s current observable option price.' },
        { question: 'What are Option Greeks?', answer: 'Greeks measure option price sensitivities: Delta (stock price move), Vega (volatility change), Theta (time decay), Gamma (delta sensitivity), and Rho (interest rate sensitivity).' }
      ],
      relatedTools
    }),
    ar: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'تحسب حاسبة نموذج بلاك-شولز القيمة العادلة النظرية لعقود الخيارات المالية الأوروبية (Call & Put) استناداً إلى سعر السهم، سعر الإضراب، وقت الاستحقاق، سعر الفائدة الخالي من المخاطر، ونسبة التقلب.',
      whoUsesIt: 'متداولو الخيارات، المحللون الكميون، ومديرو المحافظ المالية.',
      whatItCalculates: 'تحسب سعر خيار الشراء (Call) وسعر خيار البيع (Put) ومؤشرات الحساسية (Greeks).',
      howToUse: [
        'أدخل سعر السهم الحالي ($) وسعر الإضراب ($).',
        'أدخل معدل الفائدة الخالي من المخاطر (%) ومدة العقد بالسنوات.',
        'أدخل نسبة التقلب السنوي (%).'
      ],
      formula: 'Call = S₀ × N(d₁) - K × e^(-rT) × N(d₂)',
      formulaVariables: [
        { symbol: 'S₀', name: 'سعر السهم الحالي', explanation: 'السعر السوقي المباشر للسهم ($).' },
        { symbol: 'K', name: 'سعر الإضراب', explanation: 'السعر المتفق عليه لتنفيذ الخيار ($).' },
        { symbol: 'r', name: 'معدل الفائدة الخالي من المخاطر', explanation: 'معدل العائد السنوي الخالي من المخاطر.' },
        { symbol: 'T', name: 'الوقت حتى الاستحقاق', explanation: 'المدة المتبقية للعقد مقاسه بالسنوات.' },
        { symbol: 'σ', name: 'التقلب', explanation: 'الانحراف المعياري السنوي لعوائد السهم.' }
      ],
      inputs: [
        { name: 'سعر السهم (S₀)', description: 'سعر السهم المباشر.', unit: '$', optional: false },
        { name: 'سعر التنفيذ (K)', description: 'سعر الإضراب.', unit: '$', optional: false },
        { name: 'معدل الفائدة (r)', description: 'الفائدة الخالية من المخاطر.', unit: '%', optional: false },
        { name: 'الوقت المتبقي (T)', description: 'المدة بالسنوات.', unit: 'سنة', optional: false },
        { name: 'التقلب (σ)', description: 'نسبة التذبذب السنوي.', unit: '%', optional: false }
      ],
      unitsAndConversions: 'الأسعار بالدولار ($)، المدة بالسنوات، والتقلب كنسبة مئوية (%).',
      workedExample: {
        scenario: 'سهم بسعر 100 $، سعر الإضراب 100 $، المدة سنة واحدة، الفائدة 5%، والتقلب 20%.',
        stepByStep: [
          'حساب d₁ = 0.35 و d₂ = 0.15.',
          'استخراج التوزيع الطبيعي N(d₁) = 0.6368 و N(d₂) = 0.5596.',
          'سعر خيار الشراء C = 100 × 0.6368 - 100 × e^(-0.05) × 0.5596 = 10.45 $.'
        ],
        result: 'القيمة العادلة لخيار الشراء (Call Option) = 10.45 $'
      },
      understandingResults: 'السعر 10.45 $ يمثل القيمة العادلة لشراء حق الاستفادة من صعود السهم دون الالتزام بالخسارة.',
      assumptions: 'يفترض ثبات التقلب، والتنفيذ الأوروبي عند الاستحقاق فقط، وعدم وجود توزيعات أرباح.',
      limitations: 'لا يطبق على الخيارات الأمريكية التي تسمح بالتنفيذ المبكر قبل الاستحقاق.',
      faqs: [
        { question: 'ما هو التقلب الضمني (Implied Volatility)؟', answer: 'هو نسبة التقلب المتوقعة التي تجعل القيمة النظرية للنموذج متطابقة مع سعر خيار السهم في السوق.' }
      ],
      relatedTools
    }),
    es: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'La calculadora del modelo Black-Scholes determina el precio teórico justo de opciones financieras europeas (Call y Put).',
      whoUsesIt: 'Operadores de opciones, analistas cuantitativos y gestores de fondos.',
      whatItCalculates: 'Calcula el precio de las opciones Call y Put así como las griegas de sensibilidad.',
      howToUse: [
        'Introduzca el precio actual de la acción ($) y el precio de ejercicio ($).',
        'Introduzca el tipo de interés sin riesgo (%) y el tiempo hasta el vencimiento.',
        'Especifique la volatilidad anualizada (%).'
      ],
      formula: 'Call = S₀ × N(d₁) - K × e^(-rT) × N(d₂)',
      formulaVariables: [
        { symbol: 'S₀', name: 'Precio de cotización', explanation: 'Precio actual de mercado ($).' },
        { symbol: 'K', name: 'Precio de ejercicio (Strike)', explanation: 'Precio pactado de la opción ($).' }
      ],
      inputs: [
        { name: 'Precio Acción (S₀)', description: 'Precio actual mercado.', unit: '$', optional: false },
        { name: 'Precio Ejercicio (K)', description: 'Strike price.', unit: '$', optional: false },
        { name: 'Tipo sin riesgo (r)', description: 'Tasa libre de riesgo.', unit: '%', optional: false },
        { name: 'Tiempo (T)', description: 'Años hasta vencimiento.', unit: 'Años', optional: false },
        { name: 'Volatilidad (σ)', description: 'Volatilidad anualizada.', unit: '%', optional: false }
      ],
      unitsAndConversions: 'Precios en dólares ($), tiempo en años y volatilidad en porcentaje (%).',
      workedExample: {
        scenario: 'Acción a $100, Strike $100, Vencimiento 1 año, Tipo sin riesgo 5%, Volatilidad 20%.',
        stepByStep: [
          'Cálculo de d₁ = 0.35 y d₂ = 0.15.',
          'Evaluación normal acumulada N(d₁) y N(d₂).',
          'Precio Call = $10.45.'
        ],
        result: 'Valor justo de la Opción Call = $10.45'
      },
      understandingResults: 'Representa el coste justo ajustado al riesgo para posicionarse al alza.',
      assumptions: 'Asume distribución log-normal y ejercicio únicamente al vencimiento (europea).',
      limitations: 'No aplica a opciones americanas con ejercicio anticipado.',
      faqs: [
        { question: '¿Qué son las griegas de una opción?', answer: 'Miden la sensibilidad del precio de la opción respecto al precio de la acción (Delta), volatilidad (Vega) o tiempo (Theta).' }
      ],
      relatedTools
    }),
    fr: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Le calculateur du modèle Black-Scholes évalue la valeur théorique des options financières européennes (Call et Put).',
      whoUsesIt: 'Traders d’options, analystes quantitatifs et gestionnaires de portefeuilles.',
      whatItCalculates: 'Calcule le prix des options d’achat et de vente ainsi que les grecs de sensibilité.',
      howToUse: [
        'Entrez le cours actuel de l’action ($) et le prix d’exercice ($).',
        'Renseignez le taux sans risque (%) et le temps restant avant échéance.',
        'Saisissez la volatilité annuelle (%).'
      ],
      formula: 'Call = S₀ × N(d₁) - K × e^(-rT) × N(d₂)',
      formulaVariables: [
        { symbol: 'S₀', name: 'Cours du sous-jacent', explanation: 'Prix actuel sur le marché ($).' },
        { symbol: 'K', name: 'Prix d’exercice', explanation: 'Prix de strike d’exécution ($).' }
      ],
      inputs: [
        { name: 'Cours de l’action (S₀)', description: 'Prix actuel du marché.', unit: '$', optional: false },
        { name: 'Prix d’exercice (K)', description: 'Strike d’exécution.', unit: '$', optional: false },
        { name: 'Taux sans risque (r)', description: 'Rendement sans risque.', unit: '%', optional: false },
        { name: 'Temps (T)', description: 'Durée en années.', unit: 'Années', optional: false },
        { name: 'Volatilité (σ)', description: 'Volatilité annualisée.', unit: '%', optional: false }
      ],
      unitsAndConversions: 'Montants en dollars ($), temps en années et volatilité en pourcentage (%).',
      workedExample: {
        scenario: 'Action à 100 $, Strike 100 $, Échéance 1 an, Taux sans risque 5 %, Volatilité 20 %.',
        stepByStep: [
          'Calcul de d₁ = 0,35 et d₂ = 0,15.',
          'Loi normale cumulée N(d₁) et N(d₂).',
          'Prix Call = 10,45 $.'
        ],
        result: 'Valeur théorique de l’Option Call = 10,45 $'
      },
      understandingResults: 'Reflète la valeur théorique du droit d’acheter le sous-jacent à échéance.',
      assumptions: 'Hypothèse de volatilité constante et d’exercice à l’échéance uniquement.',
      limitations: 'Incompatible avec les options américaines exercables à tout moment.',
      faqs: [
        { question: 'Que signifie la volatilité implicite ?', answer: 'C’est le niveau de volatilité déduit du prix de marché réel de l’option.' }
      ],
      relatedTools
    }),
    de: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Der Black-Scholes-Rechner ermittelt den theoretischen fairen Wert europäischen Finanzoptionen (Call und Put).',
      whoUsesIt: 'Optionstrader, Risiko-Analysten und Portfolio-Manager.',
      whatItCalculates: 'Berechnet Call- und Put-Preise sowie die Sensitivitätskennzahlen (Greeks).',
      howToUse: [
        'Geben Sie den aktuellen Aktienkurs ($) und den Ausübungspreis ($) ein.',
        'Tragen Sie den risikofreien Zinssatz (%) und die Restlaufzeit ein.',
        'Geben Sie die Volatilität (%) ein.'
      ],
      formula: 'Call = S₀ × N(d₁) - K × e^(-rT) × N(d₂)',
      formulaVariables: [
        { symbol: 'S₀', name: 'Aktienkurs', explanation: 'Aktueller Marktpreis der Aktie ($).' },
        { symbol: 'K', name: 'Basispreis', explanation: 'Vereinbarter Ausübungspreis ($).' }
      ],
      inputs: [
        { name: 'Aktienkurs (S₀)', description: 'Marktpreis der Aktie.', unit: '$', optional: false },
        { name: 'Basispreis (K)', description: 'Strike-Preis der Option.', unit: '$', optional: false },
        { name: 'Risikofreier Zins (r)', description: 'Zinssatz ohne Risiko.', unit: '%', optional: false },
        { name: 'Restlaufzeit (T)', description: 'Laufzeit in Jahren.', unit: 'Jahre', optional: false },
        { name: 'Volatilität (σ)', description: 'Jährliche Schwankungsbreite.', unit: '%', optional: false }
      ],
      unitsAndConversions: 'Kurse in Dollar ($), Laufzeit in Jahren, Volatilität in Prozent (%).',
      workedExample: {
        scenario: 'Aktie $100, Strike $100, Laufzeit 1 Jahr, Zins 5%, Volatilität 20%.',
        stepByStep: [
          'Berechnung von d₁ = 0,35 und d₂ = 0,15.',
          'Standardnormalverteilung N(d₁) und N(d₂).',
          'Call-Preis = $10,45.'
        ],
        result: 'Fairer Wert der Call-Option = $10,45'
      },
      understandingResults: 'Zeigt den theoretisch angemessenen Preis für die Kaufoption.',
      assumptions: 'Unterstellt europäische Ausübung am Laufzeitende und stetige Renditen.',
      limitations: 'Nicht geeignet für amerikanische Optionen mit vorzeitiger Ausübung.',
      faqs: [
        { question: 'Was bedeuten die Option Greeks?', answer: 'Greeks wie Delta, Vega und Theta messen die Kursempfindlichkeit der Option.' }
      ],
      relatedTools
    })
  },

  // 4. DEBT-TO-INCOME (DTI) CALCULATOR
  'debt-to-income': {
    en: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'The Debt-to-Income (DTI) ratio calculator evaluates consumer and borrower solvency by comparing monthly recurring debt obligations against gross monthly income. Mortgage lenders use DTI as a primary underwriting metric to assess creditworthiness and repayment capacity.',
      whoUsesIt: 'Prospective homebuyers, mortgage loan officers, underwriters, personal finance planners, and real estate buyers.',
      whatItCalculates: 'Calculates Front-End DTI (housing expenses ratio), Back-End DTI (total debt obligations ratio), and mortgage qualification eligibility.',
      howToUse: [
        'Enter gross pre-tax monthly household income ($).',
        'Input expected monthly housing payments (mortgage principal, interest, property taxes, home insurance).',
        'Add all other recurring monthly debt minimum payments (car loans, student loans, minimum credit card payments).',
        'Compare your calculated DTI against standard lending benchmarks (28/36 rule and 43% Qualified Mortgage ceiling).'
      ],
      formula: 'Front-End DTI = (Monthly Housing Costs / Gross Monthly Income) × 100% | Back-End DTI = (Total Monthly Debt Obligations / Gross Monthly Income) × 100%',
      formulaVariables: [
        { symbol: 'Housing Costs', name: 'Housing Expenses (PITI)', explanation: 'Principal, Interest, Property Taxes, and Hazard Insurance.' },
        { symbol: 'Total Debt', name: 'Total Monthly Debt Payments', explanation: 'Sum of housing costs plus student loans, auto loans, personal loans, and minimum card payments.' },
        { symbol: 'Gross Income', name: 'Gross Monthly Income', explanation: 'Total pre-tax monthly earned and investment income.' }
      ],
      inputs: [
        { name: 'Gross Monthly Income', description: 'Total household income before taxes and deductions.', unit: '$', optional: false },
        { name: 'Monthly Housing Costs', description: 'Anticipated mortgage or rent payment including taxes and insurance.', unit: '$', optional: false },
        { name: 'Non-Housing Debt Obligations', description: 'Student loans, auto loans, personal financing, and credit card minimums.', unit: '$', optional: false }
      ],
      unitsAndConversions: 'Monetary values in currency units ($), ratios displayed as percentages (%).',
      workedExample: {
        scenario: 'A borrower earns $7,500 gross monthly income, with a projected $1,500 mortgage payment and $600 in combined monthly student and auto loan payments.',
        stepByStep: [
          'Calculate Front-End DTI: ($1,500 / $7,500) × 100% = 20.00%.',
          'Calculate Total Debt: $1,500 + $600 = $2,100 per month.',
          'Calculate Back-End DTI: ($2,100 / $7,500) × 100% = 28.00%.',
          'Evaluate lending benchmarks: 20% front-end is well below the 28% threshold; 28% back-end is well below the standard 36% conforming benchmark.'
        ],
        result: 'Front-End DTI = 20.00% | Back-End DTI = 28.00% (Strong approval profile)'
      },
      understandingResults: 'DTI ratios below 36% represent strong borrower health. Ratios between 36% and 43% are standard for conventional approval. Above 43% typically requires FHA, VA, or compensating factors.',
      assumptions: 'Assumes verifiable pre-tax income and standard 28/36 conventional mortgage lending guidelines.',
      limitations: 'DTI does not measure household liquid savings, credit score (FICO), or post-tax cost of living fluctuations.',
      faqs: [
        { question: 'What is a good Debt-to-Income ratio for buying a house?', answer: 'Most conventional lenders prefer a front-end DTI of 28% or lower and a back-end DTI of 36% or lower. Qualified Mortgages (QM) cap back-end DTI at 43%, though FHA programs may accept up to 50% with high credit scores.' },
        { question: 'What debts are included in DTI calculations?', answer: 'Recurring monthly contractual payments: mortgages, car loans, student loans, personal loans, and minimum credit card payments. Groceries, utility bills, and insurance premiums are not included in standard DTI.' }
      ],
      relatedTools
    }),
    ar: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'تحسب حاسبة نسبة الدين إلى الدخل (Debt-to-Income / DTI) العبء الائتماني للمقترض بمقارنة إجمالي الالتزامات الشهرية بالدخل الشهري الإجمالي قبل الضرائب، وهو المعيار الأساسي للبنوك لتقييم أهلية التمويل العقاري والشخصي.',
      whoUsesIt: 'المقترضون، ومشتري العقارات، ومسؤولو الائتمان العقاري بالبنوك، والمخططون الماليون.',
      whatItCalculates: 'نسبة عبء السكن (Front-End DTI)، ونسبة إجمالي الديون (Back-End DTI)، وهامش الأمان الائتماني.',
      howToUse: [
        'أدخل الدخل الشهري الإجمالي (الراتب قبل الخصومات والضرائب).',
        'أدخل قسط السكن أو التمويل العقاري المتوقع.',
        'أدخل إجمالي الأقساط الشهرية الأخرى (قسط السيارة، تمويل شخصي، الحد الأدنى للبطاقات).',
        'قارن النسبة المحسوبة بالمعايير المصرفية (قاعدة 28/36 والحد الأقصى للتمويل).'
      ],
      formula: 'نسبة DTI الإجمالية = (إجمالي الأقساط والالتزامات الشهرية ÷ الدخل الشهري الإجمالي) × 100%',
      inputs: [
        { name: 'الدخل الشهري الإجمالي', description: 'الراتب الإجمالي قبل أي استقطاعات.', unit: 'عملة', optional: false },
        { name: 'قسط التمويل العقاري أو السكن', description: 'القسط الشهري للسكن شاملاً الفائدة والتأمين.', unit: 'عملة', optional: false },
        { name: 'الالتزامات الشهرية الأخرى', description: 'أقساط السيارات والبطاقات والتمويلات الشخصية.', unit: 'عملة', optional: false }
      ],
      workedExample: {
        scenario: 'دخل شهري 7,500 دولار، قسط عقاري 1,500 دولار، وأقساط أخرى 600 دولار.',
        stepByStep: [
          'نسبة قسط السكن (Front-End): (1,500 ÷ 7,500) × 100% = 20.00%.',
          'إجمالي الالتزامات: 1,500 + 600 = 2,100 دولار.',
          'نسبة إجمالي الديون (Back-End): (2,100 ÷ 7,500) × 100% = 28.00%.',
          'التقييم: النسبة ممتازة وتتوافق تماماً مع المعيار المصرفي الصارم (أقل من 36%).'
        ],
        result: 'نسبة عبء السكن = 20.00% | نسبة إجمالي الديون = 28.00% (أهلية ائتمانية عالية)'
      },
      understandingResults: 'النسبة الأقل من 36% تدل على ملاءة مالية ممتازة وتسهل الموافقة على القروض بأفضل معدلات فائدة.',
      assumptions: 'تعتمد على الدخل الموثق وقواعد الإقراض المصرفي القياسية.',
      limitations: 'لا تقيس النسبة حجم المدخرات النقدية أو التقييم الائتماني (سكور).',
      faqs: [
        { question: 'ما هي النسبة المثالية لنسبة الدين إلى الدخل؟', answer: 'تعتبر النسبة 36% أو أقل مثالية ومفضلة لدى معظم البنوك العالمية لمنح القروض العقارية.' }
      ],
      relatedTools
    }),
    es: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Calcula la relación entre deuda e ingresos (DTI) comparando cuotas mensuales y salario bruto para evaluar solvencia crediticia.',
      whoUsesIt: 'Compradores de vivienda, analistas hipotecarios y planificadores financieros.',
      whatItCalculates: 'DTI inicial (vivienda), DTI global (todas las deudas) y perfil de aprobación.',
      howToUse: ['Introduzca ingresos brutos mensuales.', 'Añada cuota hipotecaria.', 'Añada otras deudas mensuales.'],
      formula: 'DTI (%) = (Total Pagos de Deuda Mensuales / Ingresos Brutos Mensuales) × 100%',
      inputs: [{ name: 'Ingresos Brutos', description: 'Salario antes de impuestos.', unit: '$', optional: false }],
      workedExample: {
        scenario: 'Ingresos 7.500 $, hipoteca 1.500 $, otras cuotas 600 $.',
        stepByStep: ['Deuda total = 2.100 $.', 'DTI = (2.100 / 7.500) × 100 = 28,00%.'],
        result: 'DTI Global = 28,00% (Perfil de solvencia excelente)'
      },
      understandingResults: 'Un ratio inferior al 36% indica gran solvencia.',
      assumptions: 'Ingresos brutos estables.',
      limitations: 'No computa ahorros de emergencia ni puntuación de crédito.',
      faqs: [{ question: '¿Cuál es el DTI máximo para hipotecas?', answer: 'El estándar general recomienda un límite del 36% al 43%.' }],
      relatedTools
    }),
    fr: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Le calculateur du taux d’endettement (DTI) mesure la part des charges d’emprunt mensuelles par rapport aux revenus bruts.',
      whoUsesIt: 'Futurs emprunteurs immobiliers et courtiers en crédit.',
      whatItCalculates: 'Taux d’effort immobilier, taux d’endettement global et capacité d’emprunt.',
      howToUse: ['Renseignez vos revenus bruts mensuels.', 'Indiquez les mensualités de crédit.', 'Vérifiez le respect du seuil d’endettement.'],
      formula: 'Taux d’endettement (%) = (Total des mensualités de crédit / Revenus mensuels bruts) × 100%',
      inputs: [{ name: 'Revenus Bruts', description: 'Salaire mensuel avant prélèvements.', unit: 'Devise', optional: false }],
      workedExample: {
        scenario: 'Revenus 7 500 $, mensualité logement 1 500 $, autres crédits 600 $.',
        stepByStep: ['Charges totales = 2 100 $.', 'Taux = (2 100 ÷ 7 500) × 100 = 28,00 %.'],
        result: 'Taux d’endettement = 28,00 % (Conforme au seuil maximal de 35 %)'
      },
      understandingResults: 'Un taux inférieur à 33–35 % garantit une excellente acceptabilité bancaire.',
      assumptions: 'Revenus récurrents vérifiables.',
      limitations: 'Ne prend pas en compte le reste à vivre absolu.',
      faqs: [{ question: 'Quel est le taux d’endettement maximal autorisé ?', answer: 'Généralement 35 % assurance comprise selon les normes bancaires.' }],
      relatedTools
    }),
    de: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Der Schuldendienst-Einkommens-Rechner (DTI) ermittelt die monatliche Kreditbelastungsquote im Verhältnis zum Bruttoeinkommen.',
      whoUsesIt: 'Immobilienkäufer, Finanzierungsberater und Kreditsachbearbeiter.',
      whatItCalculates: 'Monatliche Belastungsquote, Gesamtschuldendienst und Bonitätsspielraum.',
      howToUse: ['Monatliches Bruttoeinkommen angeben.', 'Wohn- und Kreditraten eintragen.', 'Belastungsquote prüfen.'],
      formula: 'DTI (%) = (Monatliche Gesamtraten / Bruttoeinkommen) × 100%',
      inputs: [{ name: 'Bruttoeinkommen', description: 'Monatliche Einkünfte vor Steuern.', unit: '€', optional: false }],
      workedExample: {
        scenario: 'Einkommen 7.500 €, Wohnrate 1.500 €, Konsumentenkredite 600 €.',
        stepByStep: ['Gesamtrate = 2.100 €.', 'DTI = (2.100 / 7.500) × 100 = 28,00 %.'],
        result: 'Schuldenquote (DTI) = 28,00 % (Solide Bonität)'
      },
      understandingResults: 'Werte unter 36 % gelten als sehr sicher und banküblich.',
      assumptions: 'Regelmäßiges, nachweisbares Einkommen.',
      limitations: 'Erfasst nicht das verfügbare liquide Eigenkapital.',
      faqs: [{ question: 'Welche Quote gilt als sicher?', answer: 'Eine Gesamtschuldenquote von unter 36 % des Bruttoeinkommens.' }],
      relatedTools
    })
  }
};

// Canonical Aliases
CORPORATE_FINANCE_SPECIALIZED_HANDLERS['debt-to-income-ratio'] = CORPORATE_FINANCE_SPECIALIZED_HANDLERS['debt-to-income'];
CORPORATE_FINANCE_SPECIALIZED_HANDLERS['debt-to-income-calculator'] = CORPORATE_FINANCE_SPECIALIZED_HANDLERS['debt-to-income'];
CORPORATE_FINANCE_SPECIALIZED_HANDLERS['dti-calculator'] = CORPORATE_FINANCE_SPECIALIZED_HANDLERS['debt-to-income'];
CORPORATE_FINANCE_SPECIALIZED_HANDLERS['dti'] = CORPORATE_FINANCE_SPECIALIZED_HANDLERS['debt-to-income'];

