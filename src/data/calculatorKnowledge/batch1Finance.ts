import { ToolDef, Language } from '../../types';
import { ToolContentDetails } from './types';

type KnowledgeHandler = (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails;

// Helper to assemble standardized knowledge across languages
function createFinanceKnowledge(dataByLang: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails>): Record<Language, KnowledgeHandler> {
  return dataByLang;
}

// 1. SALES TAX / VAT (tax)
export const TAX_KNOWLEDGE = createFinanceKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates total sales tax or value-added tax (VAT) added to a net price, or extracts net price and tax amounts from a gross total.`,
    howToUse: [
      'Choose the calculation mode: "Add Tax" (standard calculation) or "Remove Tax" (reverse tax calculation).',
      'Enter the base monetary amount (net price or gross price depending on mode).',
      'Enter the applicable sales tax or VAT percentage rate.',
      'Review the calculated tax amount and resulting net or total amounts.',
      'Use the copy button to copy the calculation summary to your clipboard.'
    ],
    formula: 'Add Tax: Tax = Net × (Rate / 100), Total = Net + Tax | Remove Tax: Net = Total / (1 + Rate / 100), Tax = Total - Net',
    formulaVariables: [
      { name: 'Base Amount', description: 'The net or gross transaction amount entered into the calculator.', unit: 'Currency ($ / € / £)', optional: false },
      { name: 'Tax Rate', description: 'The statutory sales tax, goods and services tax (GST), or VAT percentage.', unit: 'Percentage (%)', optional: false }
    ],
    workedExample: {
      scenario: 'Purchasing $100.00 worth of taxable merchandise with a 15% sales tax rate in "Add Tax" mode.',
      stepByStep: [
        'Set calculation mode to "Add Tax".',
        'Enter base amount: $100.00.',
        'Enter tax rate: 15.0%.',
        'Calculate tax amount: $100.00 × (15 / 100) = $15.00.',
        'Calculate total gross amount: $100.00 + $15.00 = $115.00.'
      ],
      result: 'Net Amount: $100.00 | Tax (15%): $15.00 | Total Amount: $115.00'
    },
    interpretation: 'The calculation indicates the precise tax liability accrued on taxable transactions. When using reverse mode ("Remove Tax"), it isolates the pre-tax revenue from tax-inclusive retail figures.',
    assumptions: 'Assumes a uniform, single tax tier applies without municipal luxury surcharges, compound duties, or selective item exemptions.',
    limitations: 'This calculator does not determine regional tax jurisdiction rules, tiered product classifications, or multi-jurisdictional destination tax rates.',
    faqs: [
      { question: 'What is the difference between sales tax and VAT?', answer: 'Sales tax is generally collected only at the final point of sale to the consumer, whereas VAT (Value Added Tax) is levied incrementally on the value added at each stage of production and distribution.' },
      { question: 'How do I extract tax from a tax-inclusive price?', answer: 'Switch the calculator mode to "Remove Tax", enter the final receipt total, and enter the tax rate. The calculator divides by (1 + rate/100) to isolate the original pre-tax price.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب ضريبة المبيعات أو ضريبة القيمة المضافة (VAT) المضافة إلى المبلغ الصافي، أو استخراج السعر الصافي وقيمة الضريبة من الإجمالي الشامل.`,
    howToUse: [
      'اختر وضع الحساب: "إضافة الضريبة" أو "خصم الضريبة" (الحساب العكسي).',
      'أدخل المبلغ الأساسي (السعر الصافي أو الإجمالي وفقاً للوضع المختار).',
      'أدخل النسبة المئوية المطبقة لضريبة المبيعات أو القيمة المضافة.',
      'راجع قيمة الضريبة المحسوبة والمبلغ الصافي والإجمالي النهائي.',
      'انقر على زر النسخ لحفظ ملخص الحساب في الحافظة.'
    ],
    formula: 'إضافة الضريبة: الضريبة = الصافي × (النسبة / 100)، الإجمالي = الصافي + الضريبة | خصم الضريبة: الصافي = الإجمالي / (1 + النسبة / 100)',
    formulaVariables: [
      { name: 'المبلغ الأساسي', description: 'المبلغ النقدي الصافي أو الإجمالي المُدخل.', unit: 'عملة ($ / ر.س / د.إ)', optional: false },
      { name: 'نسبة الضريبة', description: 'نسبة ضريبة القيمة المضافة أو ضريبة المبيعات القانونية.', unit: 'نسبة مئوية (%)', optional: false }
    ],
    workedExample: {
      scenario: 'شراء بضائع بقيمة 100.00 ريال مع تطبيق ضريبة قيمة مضافة بنسبة 15% في وضع إضافة الضريبة.',
      stepByStep: [
        'تحديد وضع الحساب على "إضافة الضريبة".',
        'إدخال المبلغ الصافي: 100.00 ريال.',
        'إدخال نسبة الضريبة: 15.0%.',
        'حساب مبلغ الضريبة: 100.00 × (15 / 100) = 15.00 ريال.',
        'حساب الإجمالي النهائي: 100.00 + 15.00 = 115.00 ريال.'
      ],
      result: 'المبلغ الصافي: 100.00 | الضريبة (15%): 15.00 | الإجمالي النهائي: 115.00'
    },
    interpretation: 'توضح النتائج بدقة الالتزام الضريبي على المعاملة، وتفصل بين العائد الفعلي للمبيعات والمبلغ المستحق سداده للجهات الضريبية.',
    assumptions: 'تفترض العملية تطبيق نسبة ضريبية موحدة دون احتساب إعفاءات لسلع محددة أو رسوم جمركية إضافية.',
    limitations: 'لا تقدم هذه الأداة استشارات ضريبية قانونية ولا تحدد التبعية الضريبية الإقليمية تلقائياً.',
    faqs: [
      { question: 'كيف يمكنني معرفة السعر قبل الضريبة من فاتورة شاملة؟', answer: 'اختر وضع "خصم الضريبة"، ثم أدخل إجمالي الفاتورة ونسبة الضريبة، وستقوم الأداة بقسمة الإجمالي على (1 + النسبة/100) لاستخراج السعر الأساسي.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el impuesto sobre las ventas o IVA añadido a un precio neto, o deduce el importe neto y el impuesto a partir de un total con impuestos incluidos.`,
    howToUse: [
      'Seleccione el modo: "Añadir impuesto" o "Quitar impuesto" (cálculo inverso).',
      'Introduzca el importe monetario base.',
      'Introduzca el porcentaje de IVA o impuesto aplicable.',
      'Revise el desglose del impuesto calculado y el total resultante.',
      'Haga clic en copiar para guardar el resumen en el portapapeles.'
    ],
    formula: 'Añadir: Impuesto = Neto × (Tasa / 100), Total = Neto + Impuesto | Quitar: Neto = Total / (1 + Tasa / 100)',
    formulaVariables: [
      { name: 'Importe base', description: 'El importe monetario sobre el que se calcula el impuesto.', unit: 'Moneda ($ / €)', optional: false },
      { name: 'Tasa impositiva', description: 'Porcentaje del impuesto aplicable.', unit: 'Porcentaje (%)', optional: false }
    ],
    workedExample: {
      scenario: 'Compra de 100,00 € con un tipo impositivo de IVA del 15% en modo añadir impuesto.',
      stepByStep: [
        'Modo: Añadir impuesto.',
        'Importe base: 100,00 €.',
        'Tipo impositivo: 15%.',
        'Cálculo de cuota: 100,00 € × 0,15 = 15,00 €.',
        'Total final: 100,00 € + 15,00 € = 115,00 €.'
      ],
      result: 'Neto: 100,00 € | IVA (15%): 15,00 € | Total: 115,00 €'
    },
    interpretation: 'Muestra con exactitud la carga tributaria devengada en la transacción y separa el ingreso neto del importe tributario.',
    assumptions: 'Aplica una tasa porcentual uniforme sin retenciones adicionales ni exenciones específicas.',
    limitations: 'No contempla regímenes fiscales especiales ni deducciones por gastos deducibles.',
    faqs: [
      { question: '¿Cómo desglosar el IVA de un precio final?', answer: 'Seleccione "Quitar impuesto", ingrese el total final de la factura y la tasa de IVA para obtener la base imponible y la cuota tributaria.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule le montant de la taxe de vente ou TVA à ajouter à un prix hors taxes, ou extrait la base hors taxes et la taxe à partir d'un total TTC.`,
    howToUse: [
      'Sélectionnez le mode : "Ajouter la taxe" ou "Retirer la taxe" (calcul inversé).',
      'Saisissez le montant de base (HT ou TTC selon le mode).',
      'Indiquez le taux de taxe ou TVA en pourcentage.',
      'Consultez le montant de taxe calculé ainsi que le montant net et le total.',
      'Copiez le récapitulatif dans votre presse-papiers si nécessaire.'
    ],
    formula: 'Ajouter : Taxe = HT × (Taux / 100), TTC = HT + Taxe | Retirer : HT = TTC / (1 + Taux / 100)',
    formulaVariables: [
      { name: 'Montant de base', description: 'Montant financier hors taxe ou TTC.', unit: 'Devise (€ / $)', optional: false },
      { name: 'Taux de taxe', description: 'Taux légal de taxe sur la valeur ajoutée ou taxe de vente.', unit: 'Pourcentage (%)', optional: false }
    ],
    workedExample: {
      scenario: 'Calcul d\'un achat de 100,00 € soumis à un taux de TVA de 15 % en mode ajout.',
      stepByStep: [
        'Mode sélectionné : Ajouter la taxe.',
        'Montant HT : 100,00 €.',
        'Taux de taxe : 15 %.',
        'Calcul de la TVA : 100,00 € × 0,15 = 15,00 €.',
        'Montant total TTC : 100,00 € + 15,00 € = 115,00 €.'
      ],
      result: 'Montant HT : 100,00 € | Taxe (15 %) : 15,00 € | Montant TTC : 115,00 €'
    },
    interpretation: 'Isole avec rigueur la part fiscale de la valeur marchande, facilitant la facturation et la déclaration comptable.',
    assumptions: 'Suppose un taux unique sans prise en compte des exonérations partielles ou taxes parafiscales.',
    limitations: 'Ne valide pas l\'éligibilité aux taux réduits spécifiques de votre juridiction.',
    faqs: [
      { question: 'Comment retrouver le montant hors taxes d\'une facture ?', answer: 'Choisissez l\'option "Retirer la taxe", saisissez le montant TTC et le taux applicable pour retrouver instantanément la base HT.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet den Mehrwertsteuer- oder Umsatzsteuerbetrag für Nettopreise oder ermittelt den Nettobetrag und die Steuer aus einem Bruttobetrag.`,
    howToUse: [
      'Wählen Sie den Modus: "Steuer hinzufügen" (Netto zu Brutto) oder "Steuer abziehen" (Brutto zu Netto).',
      'Geben Sie den Basisbetrag ein.',
      'Geben Sie den Steuersatz in Prozent ein.',
      'Prüfen Sie den Steuerbetrag sowie den resultierenden Netto- oder Bruttobetrag.',
      'Kopieren Sie das Berechnungsergebnis bei Bedarf in die Zwischenablage.'
    ],
    formula: 'Hinzufügen: Steuer = Netto × (Satz / 100), Brutto = Netto + Steuer | Abziehen: Netto = Brutto / (1 + Satz / 100)',
    formulaVariables: [
      { name: 'Basisbetrag', description: 'Geldbetrag vor oder nach Steuer.', unit: 'Währung (€ / $ / CHF)', optional: false },
      { name: 'Steuersatz', description: 'Gültiger Umsatzsteuersatz in Prozent.', unit: 'Prozent (%)', optional: false }
    ],
    workedExample: {
      scenario: 'Berechnung eines Nettobetrags von 100,00 € mit 15 % Steuersatz im Hinzufügemodus.',
      stepByStep: [
        'Modus: Steuer hinzufügen.',
        'Nettobetrag: 100,00 €.',
        'Steuersatz: 15,0 %.',
        'Steuerbetrag: 100,00 € × 0,15 = 15,00 €.',
        'Bruttobetrag: 100,00 € + 15,00 € = 115,00 €.'
      ],
      result: 'Nettobetrag: 100,00 € | Steuer (15 %): 15,00 € | Bruttobetrag: 115,00 €'
    },
    interpretation: 'Liefert eine transparente Aufschlüsselung von Vorsteuer, Umsatzsteuer und Endrechnungsbetrag für buchhalterische Zwecke.',
    assumptions: 'Geht von einem einheitlichen Steuersatz ohne zusätzliche Abgaben oder Sondersteuern aus.',
    limitations: 'Ersetzt keine formelle steuerrechtliche Beratung und prüft keine regionalen Ausnahmeregelungen.',
    faqs: [
      { question: 'Wie errechne ich den Nettobetrag aus einem Bruttorechnungsbetrag?', answer: 'Wählen Sie den Modus "Steuer abziehen" und geben Sie den Bruttobetrag sowie den Steuersatz ein. Der Rechner dividiert durch (1 + Satz/100).' }
    ],
    relatedTools
  })
});

// 2. ROI & CAGR CALCULATOR (roi-cagr)
export const ROI_CAGR_KNOWLEDGE = createFinanceKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} computes total Return on Investment (ROI) and Compound Annual Growth Rate (CAGR) across a specified holding period.`,
    howToUse: [
      'Enter the initial investment amount (starting capital).',
      'Enter the final value of the investment at the end of the holding period.',
      'Specify the investment timeframe in years.',
      'Examine the total monetary gain, overall ROI percentage, and annualized CAGR percentage.'
    ],
    formula: 'Total Gain = Final - Initial | ROI (%) = (Total Gain / Initial) × 100 | CAGR (%) = [(Final / Initial)^(1 / Years) - 1] × 100',
    formulaVariables: [
      { name: 'Initial Investment', description: 'Starting capital deployed into the asset.', unit: 'Currency ($)', optional: false },
      { name: 'Final Value', description: 'Total asset value at liquidation or current valuation.', unit: 'Currency ($)', optional: false },
      { name: 'Years', description: 'Total investment duration in years.', unit: 'Years', optional: false }
    ],
    workedExample: {
      scenario: 'An investment of $10,000 grows to $25,000 over a 5-year period.',
      stepByStep: [
        'Total Gain: $25,000 - $10,000 = $15,000.',
        'Total ROI: ($15,000 / $10,000) × 100 = 150.00%.',
        'CAGR: ($25,000 / $10,000)^(1/5) - 1 = (2.5)^0.2 - 1 = 1.2011 - 1 = 20.11%.'
      ],
      result: 'Total Gain: $15,000.00 | Total ROI: 150.00% | CAGR: 20.11% per year'
    },
    interpretation: 'Total ROI reflects nominal multi-year returns, while CAGR smooths out volatility to reveal the equivalent constant annual growth rate needed to produce that outcome.',
    assumptions: 'Assumes no intermediate capital additions, dividend withdrawals, or management fee drag during the holding period.',
    limitations: 'CAGR does not measure year-to-year portfolio volatility, maximum drawdown, or sequence-of-returns risk.',
    faqs: [
      { question: 'Why is CAGR more informative than average annual return?', answer: 'Simple average returns distort reality due to compounding effects. CAGR provides the actual geometric growth rate earned annually.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب إجمالي العائد على الاستثمار (ROI) ومعدل النمو السنوي المركب (CAGR) عبر فترة استثمارية محددة.`,
    howToUse: [
      'أدخل مبلغ الاستثمار الأولي (رأس المال الابتدائي).',
      'أدخل القيمة النهائية للاستثمار عند التصفية أو التقييم الحالي.',
      'حدد مدة الاستثمار بالسنوات.',
      'راجع إجمالي الربح المحقق، ونسبة العائد الإجمالي، ومعدل النمو السنوي المركب.'
    ],
    formula: 'إجمالي الربح = القيمة النهائية - الأولية | العائد على الاستثمار = (الربح / الأولية) × 100 | النمو المركب = [(النهائية / الأولية)^(1 / السنوات) - 1] × 100',
    formulaVariables: [
      { name: 'الاستثمار الأولي', description: 'المبلغ الأصلي المستثمر.', unit: 'عملة ($)', optional: false },
      { name: 'القيمة النهائية', description: 'قيمة المحفظة أو الأصل بعد انتهاء المدة.', unit: 'عملة ($)', optional: false },
      { name: 'المدة الزمنية', description: 'عدد سنوات الاستثمار.', unit: 'سنوات', optional: false }
    ],
    workedExample: {
      scenario: 'استثمار مبلغ 10,000 دولار ينمو إلى 25,000 دولار على مدار 5 سنوات.',
      stepByStep: [
        'إجمالي الربح: 25,000 - 10,000 = 15,000 دولار.',
        'إجمالي العائد (ROI): (15,000 / 10,000) × 100 = 150.00%.',
        'معدل النمو السنوي المركب (CAGR): (25,000 / 10,000)^(1/5) - 1 = 20.11% سنوياً.'
      ],
      result: 'إجمالي الربح: $15,000.00 | العائد الكلي: 150.00% | النمو السنوي المركب: 20.11%'
    },
    interpretation: 'يوضح معدل النمو السنوي المركب العائد السنوي الحقيقي بافتراض نمو ثابت، مما يسمح بمقارنة أداء الأصول المختلفة بشكل عادل.',
    assumptions: 'يفترض عدم سحب أرباح مرحلية أو إضافة تدفقات نقدية جديدة خلال فترة الاستثمار.',
    limitations: 'لا يعكس المقياس تقلبات الأسعار اليومية أو المخاطر القصوى للهبوط خلال المدة.',
    faqs: [
      { question: 'ما الفرق بين العائد الإجمالي والنمو السنوي المركب؟', answer: 'العائد الإجمالي يقيس الربح التراكمي على كامل الفترة، بينما يوزع معدل النمو السنوي المركب العائد هندسياً على كل سنة على حدة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el retorno total de la inversión (ROI) y la tasa de crecimiento anual compuesta (CAGR) para evaluar el rendimiento financiero a lo largo del tiempo.`,
    howToUse: [
      'Introduzca el importe de la inversión inicial.',
      'Introduzca el valor final alcanzado por la inversión.',
      'Indique el período de inversión en años.',
      'Consulte la ganancia total, el porcentaje de ROI global y el CAGR anualizado.'
    ],
    formula: 'Ganancia = Final - Inicial | ROI (%) = (Ganancia / Inicial) × 100 | CAGR (%) = [(Final / Inicial)^(1 / Años) - 1] × 100',
    formulaVariables: [
      { name: 'Inversión inicial', description: 'Capital inicial invertido.', unit: 'Moneda ($ / €)', optional: false },
      { name: 'Valor final', description: 'Valor del activo al término del período.', unit: 'Moneda ($ / €)', optional: false },
      { name: 'Años', description: 'Duración total de la inversión en años.', unit: 'Años', optional: false }
    ],
    workedExample: {
      scenario: 'Una inversión de 10.000 € alcanza los 25.000 € tras 5 años.',
      stepByStep: [
        'Ganancia total: 25.000 € - 10.000 € = 15.000 €.',
        'ROI total: (15.000 / 10.000) × 100 = 150,00 %.',
        'CAGR: (25.000 / 10.000)^(1/5) - 1 = 20,11 % anual.'
      ],
      result: 'Ganancia: 15.000,00 € | ROI total: 150,00 % | CAGR: 20,11 % anual'
    },
    interpretation: 'El CAGR permite comparar activos con volatilidades distintas al representar el crecimiento geométrico anual constante.',
    assumptions: 'No considera aportaciones o retiradas intermedias de capital.',
    limitations: 'No mide la volatilidad intermedia ni el riesgo de liquidez.',
    faqs: [
      { question: '¿Por qué utilizar CAGR en lugar del promedio aritmético?', answer: 'El promedio aritmético suele sobrestimar los rendimientos compuestos al ignorar la reinversión acumulada.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} détermine le retour sur investissement total (ROI) et le taux de croissance annuel composé (TCAC / CAGR) sur une durée d'investissement définie.`,
    howToUse: [
      'Indiquez le capital investi initialement.',
      'Indiquez la valeur finale obtenue à l\'échéance.',
      'Précisez la durée de détention en années.',
      'Analysez le gain monétaire net, le pourcentage de ROI global et le TCAC annualisé.'
    ],
    formula: 'Gain = Valeur finale - Investissement | ROI (%) = (Gain / Investissement) × 100 | TCAC (%) = [(Finale / Initiale)^(1 / Années) - 1] × 100',
    formulaVariables: [
      { name: 'Investissement initial', description: 'Montant du capital investi au départ.', unit: 'Devise (€ / $)', optional: false },
      { name: 'Valeur finale', description: 'Montant de l\'actif à la fin de la période.', unit: 'Devise (€ / $)', optional: false },
      { name: 'Années', description: 'Durée de placement en années.', unit: 'Années', optional: false }
    ],
    workedExample: {
      scenario: 'Un investissement de 10 000 € atteint 25 000 € sur une période de 5 ans.',
      stepByStep: [
        'Gain total : 25 000 € - 10 000 € = 15 000 €.',
        'ROI total : (15 000 / 10 000) × 100 = 150,00 %.',
        'TCAC (CAGR) : (25 000 / 10 000)^(1/5) - 1 = 20,11 % par an.'
      ],
      result: 'Gain net : 15 000,00 € | ROI total : 150,00 % | TCAC annualisé : 20,11 %'
    },
    interpretation: 'Le TCAC lisse les variations annuelles pour exprimer le taux de rendement annuel régulier équivalent.',
    assumptions: 'Hypothèse d\'une détention continue sans retraits ni apports intermédiaires de liquidités.',
    limitations: 'Ne reflète pas les fluctuations de marché ou les phases de baisse temporaire subies par le portefeuille.',
    faqs: [
      { question: 'Pourquoi le TCAC est-il important en gestion de patrimoine ?', answer: 'Il permet de comparer rigoureusement des placements sur des durées différentes en neutralisant l\'effet de distorsion des rendements bruts cumulés.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die Gesamtkapitalrendite (ROI) und die durchschnittliche jährliche Wachstumsrate (CAGR) über einen gewählten Anlagezeitraum.`,
    howToUse: [
      'Geben Sie den anfänglichen Anlagebetrag (Startkapital) ein.',
      'Geben Sie den Endwert der Anlage am Ende des Betrachtungszeitraums ein.',
      'Bestimmen Sie die Anlagedauer in Jahren.',
      'Lesen Sie den Gesamtgewinn, den prozentualen ROI sowie den jährlichen CAGR-Wert ab.'
    ],
    formula: 'Gewinn = Endwert - Anfangswert | ROI (%) = (Gewinn / Anfangswert) × 100 | CAGR (%) = [(Endwert / Anfangswert)^(1 / Jahre) - 1] × 100',
    formulaVariables: [
      { name: 'Anfangsinvestition', description: 'Eingesetztes Startkapital.', unit: 'Währung (€ / $)', optional: false },
      { name: 'Endwert', description: 'Gesamtwert des Vermögenswerts am Laufzeitende.', unit: 'Währung (€ / $)', optional: false },
      { name: 'Jahre', description: 'Investitionszeitraum in Jahren.', unit: 'Jahre', optional: false }
    ],
    workedExample: {
      scenario: 'Ein Investment von 10.000 € wächst über 5 Jahre auf 25.000 € an.',
      stepByStep: [
        'Gesamtgewinn: 25.000 € - 10.000 € = 15.000 €.',
        'Gesamtrendite (ROI): (15.000 / 10.000) × 100 = 150,00 %.',
        'Jährliche Wachstumsrate (CAGR): (25.000 / 10.000)^(1/5) - 1 = 20,11 % p.a.'
      ],
      result: 'Gesamtgewinn: 15.000,00 € | ROI: 150,00 % | CAGR: 20,11 % p.a.'
    },
    interpretation: 'Der CAGR eliminiert zwischenzeitliche Schwankungen und gibt die fiktive konstante jährliche Verzinsung an.',
    assumptions: 'Unterstellt keine unterjährigen Zu- oder Abflüsse von Anlagegeldern.',
    limitations: 'Zeigt nicht das Kursrisiko oder die zwischenzeitliche Volatilität während der Haltedauer.',
    faqs: [
      { question: 'Was unterscheidet den CAGR vom arithmetischen Durchschnitt?', answer: 'Der arithmetische Durchschnitt ignoriert den Zinseszinseffekt, während der CAGR die tatsächliche geometrische Jahresrendite beziffert.' }
    ],
    relatedTools
  })
});

// 3. CRYPTO & STOCK PROFIT CALCULATOR (crypto-profit)
export const CRYPTO_PROFIT_KNOWLEDGE = createFinanceKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates gross sales value, total exchange transaction fees, net profit or loss, and net percentage return for cryptocurrency and stock trades.`,
    howToUse: [
      'Enter the asset buy price per unit.',
      'Enter the target or executed sell price per unit.',
      'Enter the total capital investment amount.',
      'Specify the exchange trading fee percentage applicable per transaction.',
      'Review the acquired units, gross proceeds, total round-trip fees, and net profit.'
    ],
    formula: 'Units = Investment / BuyPrice | GrossValue = Units × SellPrice | TotalFees = (Investment + GrossValue) × (FeeRate / 100) | NetProfit = GrossValue - Investment - TotalFees',
    formulaVariables: [
      { name: 'Buy Price', description: 'Purchase price per coin or share.', unit: 'Currency ($)', optional: false },
      { name: 'Sell Price', description: 'Execution price per coin or share.', unit: 'Currency ($)', optional: false },
      { name: 'Investment', description: 'Total capital committed to the position.', unit: 'Currency ($)', optional: false },
      { name: 'Trading Fee', description: 'Exchange maker/taker commission rate.', unit: 'Percentage (%)', optional: false }
    ],
    workedExample: {
      scenario: 'Buying Bitcoin at $50,000 and selling at $68,000 with a $1,000 investment and 0.1% fee.',
      stepByStep: [
        'Acquired units: $1,000 / $50,000 = 0.02 units.',
        'Gross sales proceeds: 0.02 × $68,000 = $1,360.00.',
        'Buy fee: $1,000 × 0.001 = $1.00; Sell fee: $1,360 × 0.001 = $1.36; Total fees = $2.36.',
        'Net profit: $1,360.00 - $1,000.00 - $2.36 = $357.64.',
        'Net return percentage: ($357.64 / $1,000) × 100 = 35.76%.'
      ],
      result: 'Units: 0.02 | Gross Proceeds: $1,360.00 | Total Fees: $2.36 | Net Profit: $357.64 (+35.76%)'
    },
    interpretation: 'Highlights the critical impact of trading commissions and spreads on final net realized trading returns.',
    assumptions: 'Assumes identical maker/taker fee rates on both entry and exit trades without slippage.',
    limitations: 'Does not compute short-term vs. long-term capital gains taxes or network gas/withdrawal fees.',
    faqs: [
      { question: 'Why do small trading fees matter?', answer: 'Because fees are charged on the entire transaction volume at both buy and sell points, high turnover can significantly erode net trading profitability.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب القيمة الإجمالية للمبيعات، ورسوم التداول، وصافي الربح أو الخسارة، ونسبة العائد الصافي لتداولات العملات الرقمية والأسهم.`,
    howToUse: [
      'أدخل سعر شراء الوحدة أو السهم.',
      'أدخل سعر بيع الوحدة أو السهم المستهدف.',
      'أدخل إجمالي رأس المال المستثمر في الصفقة.',
      'حدد نسبة عمولة منصة التداول لكل عملية.',
      'راجع عدد الوحدات المشتراة، إجمالي قيمة البيع، الرسوم الكلية، وصافي الربح المحقق.'
    ],
    formula: 'الوحدات = الاستثمار / سعر الشراء | إجمالي البيع = الوحدات × سعر البيع | الرسوم = (الاستثمار + إجمالي البيع) × النسبة | صافي الربح = إجمالي البيع - الاستثمار - الرسوم',
    formulaVariables: [
      { name: 'سعر الشراء', description: 'سعر شراء العملة أو السهم.', unit: 'عملة ($)', optional: false },
      { name: 'سعر البيع', description: 'سعر بيع العملة أو السهم.', unit: 'عملة ($)', optional: false },
      { name: 'مبلغ الاستثمار', description: 'رأس المال المخصص للصفقة.', unit: 'عملة ($)', optional: false },
      { name: 'عمولة التداول', description: 'نسبة عمولة المنصة لكل عملية.', unit: 'نسبة مئوية (%)', optional: false }
    ],
    workedExample: {
      scenario: 'شراء بيتكوين بسعر 50,000$ وبيعه بسعر 68,000$ برأس مال 1,000$ وعمولة 0.1%.',
      stepByStep: [
        'الوحدات المشتراة: 1,000 ÷ 50,000 = 0.02 وحدة.',
        'إجمالي قيمة البيع: 0.02 × 68,000 = 1,360.00 دولار.',
        'عمولة الشراء: 1.00$، عمولة البيع: 1.36$، إجمالي الرسوم: 2.36$.',
        'صافي الربح: 1,360.00 - 1,000.00 - 2.36 = 357.64 دولار (عائد +35.76%).'
      ],
      result: 'الوحدات: 0.02 | إجمالي المبيعات: 1,360.00$ | الرسوم: 2.36$ | صافي الربح: 357.64$ (+35.76%)'
    },
    interpretation: 'تكشف الأداة عن العائد الحقيقي بعد خصم عمولات المنصات ذهاباً وإياباً لمنع الحسابات المضللة.',
    assumptions: 'تفترض تنفيذ الأوامر بالكامل عند الأسعار المحددة دون انزلاق سعري (Slippage).',
    limitations: 'لا تحسب الأداة ضرائب الأرباح الرأسمالية أو رسوم تحويل الشبكة (Gas Fees).',
    faqs: [
      { question: 'كيف تؤثر عمولة التداول على الأرباح؟', answer: 'يتم احتساب العمولة على حجم التداول الكلي عند الشراء والبيع، مما يقلل من صافي الأرباح المحققة للصفقة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el valor bruto de venta, las comisiones totales del exchange y la ganancia o pérdida neta en operaciones con criptomonedas o acciones.`,
    howToUse: [
      'Introduzca el precio de compra por unidad.',
      'Introduzca el precio de venta acordado.',
      'Indique el capital total invertido.',
      'Defina el porcentaje de comisión del broker o exchange.',
      'Consulte las unidades adquiridas, comisiones totales y el beneficio neto.'
    ],
    formula: 'Unidades = Inversión / PrecioCompra | ValorBruto = Unidades × PrecioVenta | BeneficioNeto = ValorBruto - Inversión - Comisiones',
    formulaVariables: [
      { name: 'Precio de compra', description: 'Cotización al momento de compra.', unit: 'Moneda ($ / €)', optional: false },
      { name: 'Precio de venta', description: 'Cotización al momento de venta.', unit: 'Moneda ($ / €)', optional: false },
      { name: 'Inversión', description: 'Capital total invertido en la operación.', unit: 'Moneda ($ / €)', optional: false },
      { name: 'Comisión', description: 'Porcentaje de tarifa aplicado por transacción.', unit: 'Porcentaje (%)', optional: false }
    ],
    workedExample: {
      scenario: 'Compra a 50.000 $ y venta a 68.000 $ con una inversión de 1.000 $ y 0,1 % de comisión.',
      stepByStep: [
        'Unidades obtenidas: 1.000 / 50.000 = 0,02 unidades.',
        'Valor bruto de venta: 0,02 × 68.000 = 1.360,00 $.',
        'Comisiones totales: 1,00 $ (compra) + 1,36 $ (venta) = 2,36 $.',
        'Beneficio neto: 1.360,00 $ - 1.000,00 $ - 2,36 $ = 357,64 $ (+35,76 %).'
      ],
      result: 'Unidades: 0,02 | Venta bruta: 1.360,00 $ | Tarifas: 2,36 $ | Beneficio neto: 357,64 $ (+35,76 %)'
    },
    interpretation: 'Muestra la rentabilidad real descontando el impacto directo de las tarifas de intermediación.',
    assumptions: 'Ejecución completa a los precios fijados sin deslizamiento de mercado.',
    limitations: 'No calcula retenciones de impuestos sobre ganancias patrimoniales ni tarifas de red blockchain.',
    faqs: [
      { question: '¿Qué es el deslizamiento en trading?', answer: 'Es la diferencia entre el precio esperado de una orden y el precio al que realmente se ejecuta en momentos de alta volatilidad.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule le produit brut, les frais de transaction et le profit net réalisé sur vos positions en cryptomonnaies ou en actions.`,
    howToUse: [
      'Indiquez le cours d\'achat unitaire.',
      'Indiquez le cours de vente visé.',
      'Saisissez le montant total investi.',
      'Précisez le taux de commission de la plateforme par transaction.',
      'Visualisez le volume d\'actifs détenu, les frais cumulés et le gain net réel.'
    ],
    formula: 'Unités = Investissement / CoursAchat | ProduitBrut = Unités × CoursVente | ProfitNet = ProduitBrut - Investissement - Frais',
    formulaVariables: [
      { name: 'Cours d\'achat', description: 'Prix d\'achat unitaire de l\'actif.', unit: 'Devise (€ / $)', optional: false },
      { name: 'Cours de vente', description: 'Prix de cession unitaire de l\'actif.', unit: 'Devise (€ / $)', optional: false },
      { name: 'Investissement', description: 'Montant total investi dans l\'opération.', unit: 'Devise (€ / $)', optional: false },
      { name: 'Commission', description: 'Taux de frais facturé par la plateforme.', unit: 'Pourcentage (%)', optional: false }
    ],
    workedExample: {
      scenario: 'Achat à 50 000 $ et vente à 68 000 $ avec 1 000 $ investis et 0,1 % de commission.',
      stepByStep: [
        'Unités acquises : 1 000 / 50 000 = 0,02 unité.',
        'Valeur brute de vente : 0,02 × 68 000 = 1 360,00 $.',
        'Frais totaux : 1,00 $ (achat) + 1,36 $ (vente) = 2,36 $.',
        'Profit net : 1 360,00 $ - 1 000,00 $ - 2,36 $ = 357,64 $ (+35,76 %).'
      ],
      result: 'Unités : 0,02 | Vente brute : 1 360,00 $ | Frais : 2,36 $ | Profit net : 357,64 $ (+35,76 %)'
    },
    interpretation: 'Fournit une vision transparente de la rentabilité réelle après déduction des frais de courtage.',
    assumptions: 'Exécution intégrale des ordres aux cours indiqués sans glissement de prix (slippage).',
    limitations: 'Ne comprend pas la fiscalité sur les plus-values mobilières ou les frais de retrait réseau.',
    faqs: [
      { question: 'Pourquoi prendre en compte les frais d\'aller-retour ?', answer: 'Les plateformes prélèvent des commissions aussi bien lors de l\'ordre d\'achat que de vente, ce qui réduit le bénéfice net final.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet den Bruttoverkaufserlös, die Handelsgebühren und den realisierten Nettogewinn für Krypto- und Aktientrades.`,
    howToUse: [
      'Geben Sie den Kaufkurs pro Einheit ein.',
      'Geben Sie den geplanten Verkaufskurs pro Einheit ein.',
      'Geben Sie das investierte Gesamtkapital ein.',
      'Tragen Sie den prozentualen Gebührensatz der Handelsplattform ein.',
      'Überprüfen Sie Einheitenanzahl, Bruttoerlös, Gesamtkosten und Nettogewinn.'
    ],
    formula: 'Einheiten = Investition / Kaufkurs | Bruttoerlös = Einheiten × Verkaufskurs | Nettogewinn = Bruttoerlös - Investition - Gebühren',
    formulaVariables: [
      { name: 'Kaufkurs', description: 'Einkaufspreis je Anlageeinheit.', unit: 'Währung (€ / $)', optional: false },
      { name: 'Verkaufskurs', description: 'Verkaufspreis je Anlageeinheit.', unit: 'Währung (€ / $)', optional: false },
      { name: 'Investition', description: 'Eingesetztes Gesamtkapital.', unit: 'Währung (€ / $)', optional: false },
      { name: 'Handelsgebühr', description: 'Börsen- oder Brokerprovision in Prozent.', unit: 'Prozent (%)', optional: false }
    ],
    workedExample: {
      scenario: 'Kauf zu 50.000 $ und Verkauf zu 68.000 $ bei 1.000 $ Einsatz und 0,1 % Börsengebühr.',
      stepByStep: [
        'Erworbene Einheiten: 1.000 / 50.000 = 0,02 Einheiten.',
        'Bruttoverkaufserlös: 0,02 × 68.000 = 1.360,00 $.',
        'Gesamtgebühren: 1,00 $ (Kauf) + 1,36 $ (Verkauf) = 2,36 $.',
        'Nettogewinn: 1.360,00 $ - 1.000,00 $ - 2,36 $ = 357,64 $ (+35,76 %).'
      ],
      result: 'Einheiten: 0,02 | Bruttoerlös: 1.360,00 $ | Gebühren: 2,36 $ | Nettogewinn: 357,64 $ (+35,76 %)'
    },
    interpretation: 'Zeigt unverfälscht auf, welcher Ertrag nach Abzug aller Kauf- und Verkaufsspesen tatsächlich verbleibt.',
    assumptions: 'Vollständige Ausführung ohne Slippage zu den angegebenen Preisen.',
    limitations: 'Berücksichtigt keine individuelle Abgeltungsteuer oder Netzwerküberweisungsgebühren.',
    faqs: [
      { question: 'Was bedeutet Round-Trip-Gebühr?', answer: 'Dies bezeichnet die Summe aller Transaktionsgebühren für den Einstieg (Kauf) und den anschließenden Ausstieg (Verkauf).' }
    ],
    relatedTools
  })
});

// 4. SIMPLE INTEREST (simple-interest)
export const SIMPLE_INTEREST_KNOWLEDGE = createFinanceKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates linear interest accrued on a principal sum over time without compounding.`,
    howToUse: [
      'Enter the principal amount deposited or borrowed.',
      'Enter the annual interest rate as a percentage.',
      'Enter the term duration in years.',
      'Examine the total interest accrued and the final maturity balance.'
    ],
    formula: 'Interest = (Principal × Rate × Time) / 100 | Total Balance = Principal + Interest',
    formulaVariables: [
      { name: 'Principal Amount', description: 'Original sum invested or borrowed.', unit: 'Currency ($)', optional: false },
      { name: 'Annual Rate', description: 'Nominal simple interest rate per year.', unit: 'Percentage (%)', optional: false },
      { name: 'Time', description: 'Duration of the deposit or loan.', unit: 'Years', optional: false }
    ],
    workedExample: {
      scenario: 'A $1,000 principal balance invested at 5% simple annual interest for 3 years.',
      stepByStep: [
        'Principal P = $1,000.00, Rate r = 5.0%, Time t = 3 years.',
        'Calculate accrued interest: (1,000 × 5 × 3) / 100 = $150.00.',
        'Calculate total balance: $1,000.00 + $150.00 = $1,150.00.'
      ],
      result: 'Interest Accrued: $150.00 | Total Final Balance: $1,150.00'
    },
    interpretation: 'Simple interest increases linearly every year by an identical monetary dollar amount, unlike compound interest which accelerates exponentially.',
    assumptions: 'Assumes the principal remains untouched and no compounding intervals apply.',
    limitations: 'Does not reflect compound growth standard in modern high-yield savings accounts or mutual funds.',
    faqs: [
      { question: 'When is simple interest typically used?', answer: 'It is commonly used for short-term promissory notes, auto title loans, and straightforward peer-to-peer lending contracts.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب الفائدة البسيطة الخطية المستحقة على أصل المبلغ المالي دون إعادة استثمار العوائد (بدون فوائد مركبة).`,
    howToUse: [
      'أدخل أصل المبلغ المالي المستثمر أو المقترض.',
      'أدخل معدل الفائدة السنوي البسيط كنسبة مئوية.',
      'أدخل عدد سنوات الاستحقاق.',
      'راجع إجمالي الفائدة المستحقة والمبلغ النهائي المستحق عند الاستحقاق.'
    ],
    formula: 'الفائدة = (المبلغ × النسبة × السنوات) / 100 | الرصيد النهائي = المبلغ + الفائدة',
    formulaVariables: [
      { name: 'أصل المبلغ', description: 'المبلغ الأساسي للوديعة أو القرض.', unit: 'عملة ($)', optional: false },
      { name: 'المعدل السنوي', description: 'نسبة الفائدة البسيطة سنوياً.', unit: 'نسبة مئوية (%)', optional: false },
      { name: 'المدة', description: 'فترة الاستثمار بالسنوات.', unit: 'سنوات', optional: false }
    ],
    workedExample: {
      scenario: 'إيداع 1,000 دولار بمعدل فائدة بسيطة 5% سنوياً لمدة 3 سنوات.',
      stepByStep: [
        'الأصل P = 1,000$، النسبة r = 5%، المدة t = 3 سنوات.',
        'حساب الفائدة: (1,000 × 5 × 3) / 100 = 150.00 دولار.',
        'حساب الإجمالي النهائي: 1,000 + 150 = 1,150.00 دولار.'
      ],
      result: 'الفائدة المكتسبة: $150.00 | الرصيد النهائي: $1,150.00'
    },
    interpretation: 'تنمو الفائدة البسيطة بمقدار ثابت سنوياً لأن الفوائد لا تضاف إلى الأصل لتوليد عوائد إضافية.',
    assumptions: 'يفترض ثبات معدل الفائدة وعدم سحب أجزاء من رأس المال قبل الاستحقاق.',
    limitations: 'لا تعكس حسابات التوفير البنكية المعاصرة التي تعتمد عادة على الفائدة المركبة.',
    faqs: [
      { question: 'ما الفرق بين الفائدة البسيطة والمركبة؟', answer: 'تحسب الفائدة البسيطة دائماً على أصل المبلغ فقط، بينما تحسب المركبة على الأصل مضافاً إليه الفوائد السابقة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el interés simple generado por un capital fijo a lo largo del tiempo sin reinversión de intereses.`,
    howToUse: [
      'Introduzca el capital principal inicial.',
      'Introduzca la tasa de interés anual en porcentaje.',
      'Especifique el tiempo de duración en años.',
      'Compruebe los intereses totales devengados y el saldo final acumulado.'
    ],
    formula: 'Interés = (Principal × Tasa × Tiempo) / 100 | Total = Principal + Interés',
    formulaVariables: [
      { name: 'Capital inicial', description: 'Suma inicial invertida o prestada.', unit: 'Moneda ($ / €)', optional: false },
      { name: 'Tasa anual', description: 'Porcentaje de interés nominal anual.', unit: 'Porcentaje (%)', optional: false },
      { name: 'Tiempo', description: 'Duración en años.', unit: 'Años', optional: false }
    ],
    workedExample: {
      scenario: 'Capital de 1.000 € colocado al 5 % de interés simple anual durante 3 años.',
      stepByStep: [
        'Principal: 1.000 €, Tasa: 5 %, Tiempo: 3 años.',
        'Intereses: (1.000 × 5 × 3) / 100 = 150,00 €.',
        'Saldo final: 1.000 € + 150 € = 1.150,00 €.'
      ],
      result: 'Intereses devengados: 150,00 € | Saldo total final: 1.150,00 €'
    },
    interpretation: 'El interés simple produce un rendimiento lineal idéntico en cada período anual.',
    assumptions: 'No existe capitalización periódica de intereses.',
    limitations: 'No es aplicable a productos bancarios de interés compuesto como depósitos a plazo renovables.',
    faqs: [
      { question: '¿Dónde se utiliza el interés simple?', answer: 'Suele utilizarse en operaciones de crédito comercial a corto plazo o préstamos personales entre particulares.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule les intérêts simples générés par un capital sans capitalisation des gains au cours de la période.`,
    howToUse: [
      'Indiquez le capital principal investi ou emprunté.',
      'Indiquez le taux d\'intérêt annuel simple en pourcentage.',
      'Précisez la durée en années.',
      'Consultez le montant total des intérêts et la valeur acquise finale.'
    ],
    formula: 'Intérêts = (Principal × Taux × Durée) / 100 | Valeur finale = Principal + Intérêts',
    formulaVariables: [
      { name: 'Capital principal', description: 'Montant initial du prêt ou du placement.', unit: 'Devise (€ / $)', optional: false },
      { name: 'Taux annuel', description: 'Taux d\'intérêt simple par an.', unit: 'Pourcentage (%)', optional: false },
      { name: 'Durée', description: 'Durée du contrat en années.', unit: 'Années', optional: false }
    ],
    workedExample: {
      scenario: 'Placement d\'un capital de 1 000 € à 5 % d\'intérêts simples par an pendant 3 ans.',
      stepByStep: [
        'Capital : 1 000 €, Taux : 5 %, Durée : 3 ans.',
        'Calcul des intérêts : (1 000 × 5 × 3) / 100 = 150,00 €.',
        'Valeur acquise : 1 000 € + 150 € = 1 150,00 €.'
      ],
      result: 'Intérêts acquis : 150,00 € | Valeur acquise finale : 1 150,00 €'
    },
    interpretation: 'Les intérêts simples évoluent de manière strictement linéaire car le capital de base demeure inchangé.',
    assumptions: 'Les intérêts produits ne sont pas réinvestis pour produire eux-mêmes des intérêts.',
    limitations: 'Ne modélise pas la capitalisation typique des comptes d\'épargne ou obligations à long terme.',
    faqs: [
      { question: 'Quelle est la différence fondamentale avec les intérêts composés ?', answer: 'Les intérêts simples ne rémunèrent que le capital d\'origine, sans effet boule de neige sur les intérêts échus.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet lineare Zinsen für einen festen Anlagebetrag ohne Berücksichtigung von Zinseszinsen.`,
    howToUse: [
      'Geben Sie das Anlagekapital (Grundbetrag) ein.',
      'Geben Sie den jährlichen Zinssatz in Prozent ein.',
      'Tragen Sie die Laufzeit in Jahren ein.',
      'Prüfen Sie die anfallenden Zinsen sowie das Endguthaben.'
    ],
    formula: 'Zinsen = (Kapital × Zinssatz × Zeit) / 100 | Endbetrag = Kapital + Zinsen',
    formulaVariables: [
      { name: 'Kapital', description: 'Ursprünglich geliehenes oder angelegtes Guthaben.', unit: 'Währung (€ / $)', optional: false },
      { name: 'Zinssatz', description: 'Nominaler einfacher Jahreszinssatz.', unit: 'Prozent (%)', optional: false },
      { name: 'Laufzeit', description: 'Anlagedauer in Jahren.', unit: 'Jahre', optional: false }
    ],
    workedExample: {
      scenario: 'Ein Grundkapital von 1.000 € wird über 3 Jahre zu 5 % einfacher Verzinsung angelegt.',
      stepByStep: [
        'Kapital P = 1.000 €, Zinssatz r = 5 %, Laufzeit t = 3 Jahre.',
        'Zinsberechnung: (1.000 × 5 × 3) / 100 = 150,00 €.',
        'Endbetrag: 1.000 € + 150 € = 1.150,00 €.'
      ],
      result: 'Zinsertrag: 150,00 € | Gesamtendbetrag: 1.150,00 €'
    },
    interpretation: 'Einfache Zinsen erbringen jedes Jahr exakt denselben linearen Geldbetrag.',
    assumptions: 'Erträge werden nicht thesauriert oder dem Grundkapital zugeschlagen.',
    limitations: 'Entspricht nicht modernen Sparplänen, die auf dem Zinseszinseffekt aufbauen.',
    faqs: [
      { question: 'Wann kommt die einfache Zinsrechnung zum Einsatz?', answer: 'Typischerweise bei kurzfristigen Handelskrediten, Wechseln oder privaten Darlehensvereinbarungen.' }
    ],
    relatedTools
  })
});

// 5. SAVINGS GOAL (savings-goal)
export const SAVINGS_GOAL_KNOWLEDGE = createFinanceKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates the exact remaining balance and number of months needed to reach a specific financial target based on a recurring monthly contribution.`,
    howToUse: [
      'Enter your desired savings goal target amount.',
      'Enter your current saved balance.',
      'Enter your planned monthly savings contribution.',
      'Review the remaining shortfall and the total months required to attain the goal.'
    ],
    formula: 'Shortfall Needed = max(0, Target - Current) | Months Needed = ⌈Shortfall / MonthlyContribution⌉',
    formulaVariables: [
      { name: 'Savings Target', description: 'Target financial milestone amount.', unit: 'Currency ($)', optional: false },
      { name: 'Current Balance', description: 'Funds already saved toward the milestone.', unit: 'Currency ($)', optional: false },
      { name: 'Monthly Contribution', description: 'Amount deposited into savings each month.', unit: 'Currency ($ / month)', optional: false }
    ],
    workedExample: {
      scenario: 'Targeting a $10,000 emergency fund with $2,000 already saved and saving $500 monthly.',
      stepByStep: [
        'Calculate remaining gap: $10,000 - $2,000 = $8,000 needed.',
        'Calculate months needed: $8,000 / $500 per month = 16.0 months.',
        'Round up to whole monthly contributions: 16 months.'
      ],
      result: 'Remaining Needed: $8,000.00 | Time to Goal: 16 Months (1.33 Years)'
    },
    interpretation: 'Converts abstract financial ambitions into a concrete, measurable monthly timeline.',
    assumptions: 'Assumes consistent monthly deposits without emergency withdrawals or market return compounding.',
    limitations: 'Does not account for inflation or bank interest earnings during the accumulation phase.',
    faqs: [
      { question: 'How can I speed up reaching my savings goal?', answer: 'Increasing monthly contributions or front-loading lump sums directly reduces the required duration.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب المبلغ المتبقي وعدد الأشهر اللازمة لتحقيق هدف مالي محدد بناءً على خطة ادخار شهرية منتظمة.`,
    howToUse: [
      'أدخل مبلغ الهدف المالي المطلوب الوصول إليه.',
      'أدخل الرصيد المالي المدخر حالياً.',
      'أدخل قيمة المبلغ المخصص للادخار شهرياً.',
      'راجع المبلغ المتبقي وعدد الأشهر اللازمة لبلوغ الهدف.'
    ],
    formula: 'المبلغ المطلوب = الهدف - الرصيد الحالي | الأشهر المطلوبة = ⌈المبلغ المطلوب / الادخار الشهري⌉',
    formulaVariables: [
      { name: 'هدف الادخار', description: 'المبلغ المستهدف النهائي.', unit: 'عملة ($)', optional: false },
      { name: 'الرصيد الحالي', description: 'المبلغ المتوفر حالياً.', unit: 'عملة ($)', optional: false },
      { name: 'الادخار الشهري', description: 'المبلغ المدخر كل شهر.', unit: 'عملة ($ / شهر)', optional: false }
    ],
    workedExample: {
      scenario: 'الهدف تجميع 10,000 دولار مع توفر 2,000 دولار حالياً وادخار 500 دولار شهرياً.',
      stepByStep: [
        'المبلغ المتبقي: 10,000 - 2,000 = 8,000 دولار.',
        'حساب الأشهر: 8,000 ÷ 500 = 16 شهراً.',
        'المدة الإجمالية: 16 شهراً (سنة و 4 أشهر).'
      ],
      result: 'المبلغ المطلوب: $8,000.00 | المدة للهدف: 16 شهراً'
    },
    interpretation: 'تحول الأداة الأهداف المالية إلى خطة زمنية عملية وقابلة للقياس والمتابعة الدورية.',
    assumptions: 'تفترض الالتزام الثابت بالإيداع الشهري دون سحب طارئ للأموال.',
    limitations: 'لا تحتسب عوائد الفوائد الاستثمارية أو تأثير التضخم النقدي.',
    faqs: [
      { question: 'كيف أتعامل مع المصاريف غير المتوقعة؟', answer: 'يُفضل بناء صندوق طوارئ منفصل قبل تخصيص الأموال بالكامل للأهداف الاستهلاكية أو الاستثمارية.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el tiempo en meses y el capital pendiente necesario para alcanzar un objetivo de ahorro mediante aportaciones periódicas.`,
    howToUse: [
      'Introduzca la meta de ahorro deseada.',
      'Indique sus ahorros actuales disponibles.',
      'Especifique su aportación mensual regular.',
      'Consulte el importe restante y los meses necesarios para alcanzar la meta.'
    ],
    formula: 'Déficit = Objetivo - SaldoActual | Meses = ⌈Déficit / AhorroMensual⌉',
    formulaVariables: [
      { name: 'Meta de ahorro', description: 'Objetivo de capital final.', unit: 'Moneda ($ / €)', optional: false },
      { name: 'Saldo actual', description: 'Ahorro acumulado hasta la fecha.', unit: 'Moneda ($ / €)', optional: false },
      { name: 'Ahorro mensual', description: 'Aportación recurrente al mes.', unit: 'Moneda ($ / mes)', optional: false }
    ],
    workedExample: {
      scenario: 'Meta de 10.000 € con 2.000 € iniciales y un ahorro de 500 € al mes.',
      stepByStep: [
        'Importe pendiente: 10.000 € - 2.000 € = 8.000 €.',
        'Meses necesarios: 8.000 / 500 = 16 meses.',
        'Duración total: 16 meses (1 año y 4 meses).'
      ],
      result: 'Pendiente: 8.000,00 € | Plazo estimado: 16 meses'
    },
    interpretation: 'Permite establecer una hoja de ruta financiera realista y medir la viabilidad temporal del objetivo.',
    assumptions: 'Aportaciones regulares sin interrupciones ni imprevistos.',
    limitations: 'No incluye el rendimiento por intereses bancarios generados durante el período.',
    faqs: [
      { question: '¿Cómo optimizar mi plan de ahorro?', answer: 'Automatizar las transferencias bancarias a principio de mes asegura una mayor tasa de éxito en el cumplimiento.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule le nombre de mensualités et le montant restant pour atteindre un objectif d'épargne précis en fonction de vos versements réguliers.`,
    howToUse: [
      'Indiquez le montant cible de votre projet.',
      'Indiquez l\'épargne déjà constituée.',
      'Précisez votre capacité d\'épargne mensuelle.',
      'Visualisez le montant restant à capitaliser et le nombre de mois nécessaires.'
    ],
    formula: 'Montant restant = Objectif - Épargne actuelle | Mois = ⌈Montant restant / Épargne mensuelle⌉',
    formulaVariables: [
      { name: 'Objectif d\'épargne', description: 'Capital cible à atteindre.', unit: 'Devise (€ / $)', optional: false },
      { name: 'Épargne actuelle', description: 'Montant déjà disponible.', unit: 'Devise (€ / $)', optional: false },
      { name: 'Versement mensuel', description: 'Montant versé chaque mois.', unit: 'Devise (€ / mois)', optional: false }
    ],
    workedExample: {
      scenario: 'Objectif de 10 000 € avec 2 000 € déjà épargnés et une contribution de 500 € par mois.',
      stepByStep: [
        'Calcul du reste à épargner : 10 000 € - 2 000 € = 8 000 €.',
        'Calcul de la durée : 8 000 / 500 = 16 mois.',
        'Durée totale requise : 16 mois.'
      ],
      result: 'Reste à financer : 8 000,00 € | Durée : 16 mois'
    },
    interpretation: 'Transforme un objectif patrimonial en une trajectoire budgétaire concrète et planifiée.',
    assumptions: 'Versements constants sans retraits imprévus au cours de la période.',
    limitations: 'Ne prend pas en compte la revalorisation par les intérêts servis sur les livrets bancaires.',
    faqs: [
      { question: 'Comment raccourcir la durée ?', answer: 'Augmenter le versement mensuel ou allouer des rentrées exceptionnelles (primes) permet d\'atteindre l\'objectif plus rapidement.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die verbleibende Sparsumme und die Anzahl der Monate, die bei einer festen monatlichen Sparrate zum Erreichen eines Sparziels nötig sind.`,
    howToUse: [
      'Geben Sie das finanzielle Sparziel ein.',
      'Geben Sie das bereits vorhandene Sparguthaben ein.',
      'Tragen Sie Ihre monatliche Sparrate ein.',
      'Sehen Sie sofort die verbleibende Summe und die benötigten Monate.'
    ],
    formula: 'Restbetrag = Sparziel - Istguthaben | Monate = ⌈Restbetrag / Monatsrate⌉',
    formulaVariables: [
      { name: 'Sparziel', description: 'Zielbetrag des Vorhabens.', unit: 'Währung (€ / $)', optional: false },
      { name: 'Istguthaben', description: 'Bereits angespartes Startkapital.', unit: 'Währung (€ / $)', optional: false },
      { name: 'Monatsrate', description: 'Regelmäßiger monatlicher Sparbetrag.', unit: 'Währung (€ / Monat)', optional: false }
    ],
    workedExample: {
      scenario: 'Sparziel von 10.000 € mit 2.000 € Startguthaben und einer Monatsrate von 500 €.',
      stepByStep: [
        'Noch benötigtes Guthaben: 10.000 € - 2.000 € = 8.000 €.',
        'Benötigte Monate: 8.000 € / 500 € = 16 Monate.',
        'Zeitbedarf: 16 Monate (1 Jahr und 4 Monate).'
      ],
      result: 'Verbleibender Betrag: 8.000,00 € | Zeit bis zum Ziel: 16 Monate'
    },
    interpretation: 'Bietet eine verlässliche Zeitachse für Budgetierung und Anschaffungspläne.',
    assumptions: 'Gleichbleibende Monatsraten ohne unvorhergesehene Auszahlungen.',
    limitations: 'Vernachlässigt Zinserträge und Inflationseffekte auf die Kaufkraft.',
    faqs: [
      { question: 'Wie bleibe ich bei meinem Sparziel diszipliniert?', answer: 'Daueraufträge direkt nach Gehaltseingang verhindern unbedachte Konsumausgaben.' }
    ],
    relatedTools
  })
});

// Map of all 14 Batch 1 finance tools
export const BATCH1_FINANCE_HANDLERS: Record<string, Record<Language, KnowledgeHandler>> = {
  tax: TAX_KNOWLEDGE,
  'roi-cagr': ROI_CAGR_KNOWLEDGE,
  'crypto-profit': CRYPTO_PROFIT_KNOWLEDGE,
  'simple-interest': SIMPLE_INTEREST_KNOWLEDGE,
  'savings-goal': SAVINGS_GOAL_KNOWLEDGE,
};
