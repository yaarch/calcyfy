import { ToolDef, Language } from '../../types';
import { ToolContentDetails } from './types';

type KnowledgeHandler = (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails;

function createKnowledge(dataByLang: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails>): Record<Language, KnowledgeHandler> {
  return dataByLang;
}

// 1. CURRENCY CONVERTER (currency)
export const CURRENCY_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} converts monetary amounts between world currencies based on real-time foreign exchange (Forex) midpoint rates.`,
    howToUse: [
      'Enter the base monetary amount to convert.',
      'Select the source currency (e.g., USD, EUR, GBP, JPY).',
      'Select the target destination currency.',
      'View the converted amount and the live exchange conversion rate.'
    ],
    formula: 'Target Amount = Base Amount × Exchange Rate',
    formulaVariables: [
      { name: 'Base Amount', description: 'Monetary sum in source currency.', unit: 'Currency units', optional: false },
      { name: 'Exchange Rate', description: 'Conversion multiplier between currencies.', unit: 'Target / Base', optional: false }
    ],
    workedExample: {
      scenario: 'Converting 100.00 USD to Euros (EUR) at an exchange rate of 0.9200 EUR per USD.',
      stepByStep: [
        'Base amount: $100.00 USD.',
        'Exchange rate: 0.92 EUR / USD.',
        'Calculation: 100.00 × 0.9200 = 92.00 EUR.'
      ],
      result: '100.00 USD = 92.00 EUR (at 1 USD = 0.92 EUR)'
    },
    interpretation: 'Calculates the exact foreign currency value before retail exchange spreads, credit card foreign transaction fees, or wire commissions.',
    assumptions: 'Midpoint interbank forex exchange market rate.',
    limitations: 'Commercial banks and retail airport exchanges apply buy/sell bid-ask spreads of 1% to 5%.',
    faqs: [
      { question: 'What is the midpoint exchange rate?', answer: 'The midpoint rate is the average between the buying (bid) and selling (ask) prices on global interbank currency markets.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحويل المبالغ المالية بين مختلف العملات العالمية بالاعتماد على أسعار الصرف المباشرة في أسواق الصرف الأجنبي (فوركس).`,
    howToUse: [
      'أدخل المبلغ المراد تحويله بالعملة المصدر.',
      'حدد العملة الأساسية (مثل الدولار أو اليورو أو الريال).',
      'حدد العملة المستهدفة للتحويل إليها.',
      'راجع المبلغ المحول وسعر الصرف المعتمد في التحويل.'
    ],
    formula: 'المبلغ المحول = المبلغ الأساسي × سعر الصرف',
    formulaVariables: [
      { name: 'المبلغ الأساسي', description: 'القيمة المالية بالعملة الأصلية.', unit: 'وحدة نقدية', optional: false },
      { name: 'سعر الصرف', description: 'معدل التحويل بين العملتين.', unit: 'سعر التحويل', optional: false }
    ],
    workedExample: {
      scenario: 'تحويل 100.00 دولار أمريكي (USD) إلى يورو (EUR) بسعر صرف 0.92 يورو لكل دولار.',
      stepByStep: [
        'المبلغ الأساسي: 100.00 دولار.',
        'سعر الصرف: 0.92 يورو لكل دولار.',
        'العملية الحسابية: 100.00 × 0.92 = 92.00 يورو.'
      ],
      result: '100.00 دولار أمريكي = 92.00 يورو'
    },
    interpretation: 'تحدد القيمة الدقيقة للأموال في التعاملات الدولية والسياحة والتجارة الإلكترونية.',
    assumptions: 'أسعار الصرف المباشرة بين البنوك دون هوامش وسيطة.',
    limitations: 'تفرض البنوك ومكاتب الصرافة التجارية عمولات وهوامش ربحية إضافية على أسعار الصرف.',
    faqs: [
      { question: 'ما هو سعر الصرف الوسطي؟', answer: 'هو متوسط سعر الشراء وسعر البيع المعلن في أسواق التداول المصرفية العالمية.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} convierte sumas de dinero entre monedas internacionales utilizando tipos de cambio interbancarios en tiempo real.`,
    howToUse: [
      'Introduzca la cantidad que desea convertir.',
      'Seleccione la divisa de origen (ej. USD, EUR, GBP).',
      'Seleccione la divisa de destino.',
      'Consulte la cantidad resultante y el tipo de cambio aplicado.'
    ],
    formula: 'Cantidad final = Cantidad inicial × Tipo de cambio',
    formulaVariables: [
      { name: 'Cantidad base', description: 'Importe en divisa inicial.', unit: 'Moneda origen', optional: false },
      { name: 'Tipo de cambio', description: 'Multiplicador entre divisas.', unit: 'Ratio', optional: false }
    ],
    workedExample: {
      scenario: 'Conversión de 100,00 USD a Euros (EUR) a una tasa de 0,92 EUR por USD.',
      stepByStep: [
        'Importe base: 100,00 USD.',
        'Tipo de cambio: 0,92 EUR / USD.',
        'Cálculo: 100,00 × 0,92 = 92,00 EUR.'
      ],
      result: '100,00 USD = 92,00 EUR'
    },
    interpretation: 'Permite conocer el valor nominal exacto en operaciones de comercio exterior, viajes e inversiones.',
    assumptions: 'Tipos medios del mercado de divisas interbancario.',
    limitations: 'Las entidades financieras aplican comisiones y márgenes sobre el tipo oficial.',
    faqs: [
      { question: '¿Qué es el tipo de cambio interbancario?', answer: 'Es el precio al que los grandes bancos e instituciones financieras negocian divisas entre sí.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} convertit les montants monétaires entre devises internationales sur la base des cours de change interbancaires en direct.`,
    howToUse: [
      'Saisissez le montant à convertir.',
      'Sélectionnez la devise source (ex. USD, EUR, CHF).',
      'Sélectionnez la devise cible.',
      'Consultez le montant converti et le cours de change en vigueur.'
    ],
    formula: 'Montant converti = Montant initial × Taux de change',
    formulaVariables: [
      { name: 'Montant source', description: 'Somme en monnaie de départ.', unit: 'Devise initiale', optional: false },
      { name: 'Taux de change', description: 'Multiplicateur de conversion.', unit: 'Taux', optional: false }
    ],
    workedExample: {
      scenario: 'Conversion de 100,00 USD en Euros (EUR) au taux de 0,92 EUR/USD.',
      stepByStep: [
        'Montant initial : 100,00 USD.',
        'Taux de change : 0,92 EUR / USD.',
        'Calcul : 100,00 × 0,92 = 92,00 EUR.'
      ],
      result: '100,00 USD = 92,00 EUR'
    },
    interpretation: 'Permet d\'évaluer la valeur réelle des devises pour les voyages, les achats en ligne ou les transferts internationaux.',
    assumptions: 'Taux moyen officiel du marché des changes (Forex).',
    limitations: 'Les bureaux de change et banques appliquent des frais de commission et des marges de change.',
    faqs: [
      { question: 'Pourquoi le taux appliqué par ma banque est-il différent ?', answer: 'Les banques ajoutent une marge commerciale ou des frais de transaction internationale au cours officiel.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} rechnet Geldbeträge zwischen internationalen Währungen anhand von Devisenmittelkursen in Echtzeit um.`,
    howToUse: [
      'Geben Sie den umzurechnenden Ausgangsbetrag ein.',
      'Wählen Sie die Ausgangswährung (z. B. USD, EUR, CHF).',
      'Wählen Sie die Zielwährung.',
      'Lesen Sie den Zielbetrag und den aktuellen Wechselkurs ab.'
    ],
    formula: 'Zielbetrag = Ausgangsbetrag × Wechselkurs',
    formulaVariables: [
      { name: 'Ausgangsbetrag', description: 'Geldsumme in Basiswährung.', unit: 'Währung', optional: false },
      { name: 'Wechselkurs', description: 'Umrechnungsfaktor.', unit: 'Kurs', optional: false }
    ],
    workedExample: {
      scenario: 'Umrechnung von 100,00 USD in Euro (EUR) bei einem Kurs von 0,92 EUR pro USD.',
      stepByStep: [
        'Ausgangsbetrag: 100,00 USD.',
        'Wechselkurs: 0,92 EUR/USD.',
        'Berechnung: 100,00 × 0,92 = 92,00 EUR.'
      ],
      result: '100,00 USD = 92,00 EUR'
    },
    interpretation: 'Liefert den rechnerischen Referenzwert für internationale Überweisungen, Urlaubsreisen und Fremdwährungsanlagen.',
    assumptions: 'Offizieller Interbanken-Mittelkurs.',
    limitations: 'Kreditinstitute und Wechselstuben erheben Aufschläge (Geld-Brief-Spanne) sowie Bearbeitungsgebühren.',
    faqs: [
      { question: 'Was ist der Devisenmittelkurs?', answer: 'Der rechnerische Mittelwert zwischen dem Kauf- und Verkaufspreis im weltweiten Devisenhandel.' }
    ],
    relatedTools
  })
});

// 2. SCIENTIFIC CALCULATOR (scientific)
export const SCIENTIFIC_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} performs advanced arithmetic, trigonometry (sin, cos, tan), logarithmic functions (log10, ln), roots, and exponential powers.`,
    howToUse: [
      'Input numerical values and scientific operations using standard mathematical notation.',
      'Use trigonometric functions in degree or radian modes as appropriate.',
      'Execute algebraic exponentiation (xʸ), square roots (√), or factorial (n!).',
      'Press equals (=) to view the calculated high-precision result.'
    ],
    formula: 'Evaluates standard algebraic expressions following strict operator precedence (PEMDAS/BODMAS)',
    formulaVariables: [
      { name: 'Input Expression', description: 'Mathematical formula or numerical statement.', unit: 'Algebraic terms', optional: false }
    ],
    workedExample: {
      scenario: 'Calculating the square root of (3² + 4²) to find a hypotenuse.',
      stepByStep: [
        'Evaluate powers: 3² = 9, 4² = 16.',
        'Add terms: 9 + 16 = 25.',
        'Evaluate square root: √25 = 5.0.'
      ],
      result: '√(3² + 4²) = 5.0'
    },
    interpretation: 'Provides precision scientific computations for STEM students, researchers, and practicing engineers.',
    assumptions: 'Standard IEEE 754 floating-point arithmetic.',
    limitations: 'Trigonometric inputs must respect selected Angle Mode (Degrees vs Radians).',
    faqs: [
      { question: 'What operator precedence does this calculator follow?', answer: 'It strictly follows PEMDAS: Parentheses, Exponents, Multiplication & Division, Addition & Subtraction.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتنفيذ العمليات الحسابية المتقدمة والدوال المثلثية (جا، جتا، ظا) واللوغاريتمات والجذور والأسس الحسابية بدقة عالية.`,
    howToUse: [
      'أدخل الأرقام والعمليات الحسابية بالرموز الرياضية المعتادة.',
      'اختر نظام الزوايا المناسب (درجات أو راديان) عند استخدام الدوال المثلثية.',
      'استخدم الأسس والجذور التربيعية والمضروب الرياضي.',
      'اضغط على زر النتيجة (=) لعرض الناتج الرياضي الدقيق.'
    ],
    formula: 'تقييم التعبيرات الجبرية وفق أولويات العمليات الحسابية الرياضية المعيارية (PEMDAS)',
    formulaVariables: [
      { name: 'التعبير الرياضي', description: 'المعادلة أو المسألة الحسابية المدخلة.', unit: 'تعبير جبري', optional: false }
    ],
    workedExample: {
      scenario: 'حساب الجذر التربيعي للمقدار (3² + 4²).',
      stepByStep: [
        'حساب الأسس: 3² = 9، 4² = 16.',
        'جمع القيم: 9 + 16 = 25.',
        'حساب الجذر التربيعي: √25 = 5.0.'
      ],
      result: '√(3² + 4²) = 5.0'
    },
    interpretation: 'أداة حسابية موثوقة لطلاب العلوم والهندسة والباحثين لحل المسائل المعقدة.',
    assumptions: 'الحساب العشري عالي الدقة وفق المعايير الرياضية.',
    limitations: 'يجب التأكد من ضبط وحدة قياس الزوايا (درجات أو راديان) قبل حساب الدوال المثلثية.',
    faqs: [
      { question: 'ما هو ترتيب العمليات الحسابية المعتمد؟', answer: 'الأقواس أولاً، ثم الأسس، تليها الضرب والقسمة، وأخيراً الجمع والطرح.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} realiza operaciones aritméticas avanzadas, trigonometría (sen, cos, tan), logaritmos (log, ln), raíces y potencias.`,
    howToUse: [
      'Introduzca los números y operadores en el teclado científico.',
      'Seleccione grados (DEG) o radianes (RAD) para cálculos trigonométricos.',
      'Aplique funciones como potencias (xʸ), raíces cuadradas (√) o factoriales.',
      'Pulse el botón igual (=) para obtener el resultado exacto.'
    ],
    formula: 'Evaluación de expresiones según la jerarquía matemática estándar (PEMDAS)',
    formulaVariables: [
      { name: 'Expresión', description: 'Ecuación o cálculo a resolver.', unit: 'Términos algebraicos', optional: false }
    ],
    workedExample: {
      scenario: 'Cálculo de √(3² + 4²).',
      stepByStep: [
        'Potencias: 3² = 9, 4² = 16.',
        'Suma: 9 + 16 = 25.',
        'Raíz cuadrada: √25 = 5,0.'
      ],
      result: '√(3² + 4²) = 5,0'
    },
    interpretation: 'Herramienta fundamental para estudiantes universitarios, técnicos e ingenieros.',
    assumptions: 'Aritmética de coma flotante estándar IEEE 754.',
    limitations: 'Compruebe el modo angular seleccionado antes de evaluar funciones trigonométricas.',
    faqs: [
      { question: '¿Cómo calcula la jerarquía de operaciones?', answer: 'Respeta el orden: Paréntesis, Exponentes, Multiplicación/División, Suma/Resta.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} effectue des calculs arithmétiques avancés, de la trigonométrie (sin, cos, tan), des logarithmes (log, ln), des racines et des puissances.`,
    howToUse: [
      'Saisissez les termes et opérateurs mathématiques.',
      'Sélectionnez le mode degrés (DEG) ou radians (RAD) selon vos besoins.',
      'Utilisez les puissances (xʸ), racines (√) ou factorielles (n!).',
      'Appuyez sur égal (=) pour afficher le résultat.'
    ],
    formula: 'Évaluation algébrique selon la priorité des opérateurs (PEMDAS)',
    formulaVariables: [
      { name: 'Expression', description: 'Formule ou expression mathématique.', unit: 'Termes', optional: false }
    ],
    workedExample: {
      scenario: 'Calcul de la racine carrée de (3² + 4²).',
      stepByStep: [
        'Puissances : 3² = 9, 4² = 16.',
        'Addition : 9 + 16 = 25.',
        'Racine carrée : √25 = 5,0.'
      ],
      result: '√(3² + 4²) = 5,0'
    },
    interpretation: 'Outil de référence pour les étudiants en sciences, ingénieurs et chercheurs.',
    assumptions: 'Norme arithmétique IEEE 754.',
    limitations: 'Veillez à choisir le bon mode d\'angle (degrés ou radians).',
    faqs: [
      { question: 'Quel est l\'ordre de priorité des calculs ?', answer: 'Parenthèses, Exposants, Multiplications/Divisions, puis Additions/Soustractions.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet erweiterte arithmetische Ausdrücke, trigonometrische Funktionen (sin, cos, tan), Logarithmen (log, ln), Wurzeln und Potenzen.`,
    howToUse: [
      'Geben Sie Zahlen und mathematische Operatoren ein.',
      'Wählen Sie Grad (DEG) oder Radiant (RAD) für trigonometrische Berechnungen.',
      'Nutzen Sie Potenzen (xʸ), Quadratwurzeln (√) oder Fakultäten (n!).',
      'Drücken Sie auf Gleich (=), um das exakte Ergebnis zu erhalten.'
    ],
    formula: 'Auswertung nach mathematischer Operatorrangfolge (Klammern vor Potenzen vor Punkt vor Strich)',
    formulaVariables: [
      { name: 'Ausdruck', description: 'Eingegebene mathematische Formel.', unit: 'Algebraische Terme', optional: false }
    ],
    workedExample: {
      scenario: 'Berechnung der Quadratwurzel aus (3² + 4²).',
      stepByStep: [
        'Potenzen berechnen: 3² = 9, 4² = 16.',
        'Summe bilden: 9 + 16 = 25.',
        'Wurzel ziehen: √25 = 5,0.'
      ],
      result: '√(3² + 4²) = 5,0'
    },
    interpretation: 'Unentbehrliches Rechenwerkzeug für Naturwissenschaften, Schule, Studium und Ingenieurwesen.',
    assumptions: 'Standard IEEE 754 Gleitkomma-Präzision.',
    limitations: 'Überprüfen Sie den Winkelmodus (Grad oder Radiant) bei Winkelfunktionen.',
    faqs: [
      { question: 'Welche Operatorreihenfolge gilt?', answer: 'Klammern, Potenzen/Wurzeln, Multiplikation/Division und abschließend Addition/Subtraktion.' }
    ],
    relatedTools
  })
});

// 3. WORD & CHARACTER COUNTER (word-count)
export const WORD_COUNT_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} analyzes text passages in real time to calculate total word count, character count (with and without spaces), sentence count, paragraph count, and estimated reading time.`,
    howToUse: [
      'Type or paste your text into the editor area.',
      'Review the live metrics: total words, characters, sentences, and paragraphs.',
      'Check estimated speaking and reading durations based on standard pace metrics.'
    ],
    formula: 'Words = count(tokens separated by whitespace) | Reading Time = Words / 200 words per minute',
    formulaVariables: [
      { name: 'Text Content', description: 'Input text string or document content.', unit: 'Characters/Words', optional: false }
    ],
    workedExample: {
      scenario: 'Analyzing a paragraph containing 400 words.',
      stepByStep: [
        'Word count: 400 words detected.',
        'Reading time calculation: 400 words / 200 wpm = 2.0 minutes.',
        'Speaking time calculation: 400 words / 130 wpm = 3.08 minutes.'
      ],
      result: 'Word Count: 400 words | Estimated Silent Reading Time: 2.0 minutes'
    },
    interpretation: 'Ensures compliance with essay length limits, social media post constraints, and presentation speech timings.',
    assumptions: 'Standard adult silent reading speed of 200 words per minute (wpm).',
    limitations: 'Hyphenated words and special symbols are counted according to standard whitespace delimiter rules.',
    faqs: [
      { question: 'How is reading time estimated?', answer: 'Reading time is calculated assuming an average adult reading speed of 200 to 250 words per minute.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحليل النصوص المكتوبة لحظياً لحساب عدد الكلمات، وعدد الحروف (مع المسافات وبدونها)، وعدد الجمل والفقرات، والوقت المقدر للقراءة.`,
    howToUse: [
      'اكتب النص أو الصقه داخل مربع التحرير.',
      'تابع الإحصائيات المباشرة لعدد الكلمات والحروف والفقرات.',
      'اطلع على وقت القراءة ووقت الإلقاء الصوتي المتوقع للنص.'
    ],
    formula: 'عدد الكلمات = عدد المفردات المفصولة بمسافات | وقت القراءة = عدد الكلمات ÷ 200 كلمة/دقيقة',
    formulaVariables: [
      { name: 'النص المكتوب', description: 'المحتوى النصي المراد تحليله.', unit: 'كلمات / حروف', optional: false }
    ],
    workedExample: {
      scenario: 'تحليل مقال يحتوي على 400 كلمة.',
      stepByStep: [
        'عدد الكلمات: 400 كلمة.',
        'وقت القراءة الصامتة: 400 ÷ 200 = 2.0 دقيقة.',
        'وقت الإلقاء الصوتي: 400 ÷ 130 ≈ 3.1 دقائق.'
      ],
      result: 'عدد الكلمات: 400 كلمة | وقت القراءة المقدر: دقيقتان'
    },
    interpretation: 'تساعد الكتاب والطلاب وصناع المحتوى على الالتزام بالحدود المسموحة في المقالات والمنشورات.',
    assumptions: 'متوسط سرعة القراءة الطبيعية للبالغين بمعدل 200 كلمة في الدقيقة.',
    limitations: 'الكلمات المركبة والرموز الخاصة تعامل وفق فواصل المسافات المعيارية.',
    faqs: [
      { question: 'كيف يُحسب وقت قراءة المقال؟', answer: 'يُحسب بقسمة إجمالي عدد الكلمات على معدل القراءة المعتاد وهو 200 كلمة في الدقيقة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} analiza textos en tiempo real para contabilizar palabras, caracteres (con y sin espacios), oraciones, párrafos y tiempo estimado de lectura.`,
    howToUse: [
      'Escriba o pegue el texto en el recuadro.',
      'Consulte el contador automático de palabras, caracteres y párrafos.',
      'Verifique el tiempo estimado de lectura y locución.'
    ],
    formula: 'Palabras = Recuento por espacios | Tiempo lectura = Palabras / 200 ppm',
    formulaVariables: [
      { name: 'Texto', description: 'Cadena de texto o documento.', unit: 'Caracteres / Palabras', optional: false }
    ],
    workedExample: {
      scenario: 'Texto con 400 palabras.',
      stepByStep: [
        'Total de palabras: 400 palabras.',
        'Tiempo de lectura: 400 / 200 ppm = 2,0 minutos.',
        'Tiempo de locución: 400 / 130 ppm = 3,08 minutos.'
      ],
      result: 'Palabras: 400 | Tiempo de lectura: 2,0 minutos'
    },
    interpretation: 'Imprescindible para redactores, estudiantes y profesionales que deben ajustarse a límites editoriales.',
    assumptions: 'Velocidad de lectura estándar de 200 palabras por minuto.',
    limitations: 'Palabras con guiones se contabilizan según delimitadores de espacio.',
    faqs: [
      { question: '¿A qué velocidad lee un adulto promedio?', answer: 'Un adulto promedio lee en silencio a una velocidad de entre 200 y 250 palabras por minuto.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} analyse vos textes en direct pour compter les mots, caractères (avec et sans espaces), phrases, paragraphes et temps de lecture estimé.`,
    howToUse: [
      'Collez ou saisissez votre texte dans l\'éditeur.',
      'Consultez les statistiques détaillées (mots, signes, paragraphes).',
      'Vérifiez la durée estimée de lecture et de prise de parole.'
    ],
    formula: 'Nombre de mots = Séparateurs d\'espace | Temps de lecture = Mots / 200 mots par minute',
    formulaVariables: [
      { name: 'Texte', description: 'Contenu textuel.', unit: 'Caractères / Mots', optional: false }
    ],
    workedExample: {
      scenario: 'Analyse d\'un texte de 400 mots.',
      stepByStep: [
        'Mots détectés : 400 mots.',
        'Temps de lecture silencieuse : 400 / 200 = 2,0 minutes.',
        'Temps de diction : 400 / 130 = 3,08 minutes.'
      ],
      result: 'Compte : 400 mots | Temps de lecture estimé : 2,0 minutes'
    },
    interpretation: 'Idéal pour respecter les contraintes de rédaction web, mémoires universitaires et discours minutés.',
    assumptions: 'Vitesse de lecture moyenne de 200 mots par minute.',
    limitations: 'Les mots composés avec tiret sont comptabilisés selon les règles de segmentation standard.',
    faqs: [
      { question: 'Comment est calculée la durée de lecture ?', answer: 'Elle est calculée sur la base d\'une vitesse de lecture adulte de 200 mots par minute.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} zählt in Echtzeit Wörter, Zeichen (mit und ohne Leerzeichen), Sätze, Absätze und berechnet die geschätzte Lesezeit von Texten.`,
    howToUse: [
      'Fügen Sie Ihren Text in das Textfeld ein oder tippen Sie direkt los.',
      'Lesen Sie die Wort-, Zeichen- und Absatzanzahl sofort ab.',
      'Prüfen Sie die kalkulierte Lese- und Sprechdauer.'
    ],
    formula: 'Wortanzahl = Trennung nach Leerzeichen | Lesezeit = Wörter / 200 Wörter pro Minute',
    formulaVariables: [
      { name: 'Text', description: 'Eingegebener Text.', unit: 'Zeichen / Wörter', optional: false }
    ],
    workedExample: {
      scenario: 'Textanalyse eines Beitrags mit 400 Wörtern.',
      stepByStep: [
        'Erfasste Wörter: 400 Wörter.',
        'Lesezeit: 400 / 200 = 2,0 Minuten.',
        'Sprechzeit: 400 / 130 = 3,08 Minuten.'
      ],
      result: 'Wörter: 400 | Geschätzte Lesezeit: 2,0 Minuten'
    },
    interpretation: 'Praktisch für Autoren, Journalisten und Studenten zur Einhaltung von Textvorgaben und Zeichenlimits.',
    assumptions: 'Durchschnittliche Lesegeschwindigkeit von 200 Wörtern pro Minute.',
    limitations: 'Bindestrich-Wörter werden anhand von Standard-Trennzeichen erfasst.',
    faqs: [
      { question: 'Wie schnell liest ein Erwachsener?', answer: 'Ein durchschnittlicher Erwachsener liest etwa 200 bis 250 Wörter pro Minute im Stillen.' }
    ],
    relatedTools
  })
});

// 4. STRONG PASSWORD GENERATOR (password)
export const PASSWORD_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} creates secure, cryptographically random passwords utilizing customizable character sets (uppercase, lowercase, numbers, and symbols) to protect online accounts.`,
    howToUse: [
      'Select desired password length (minimum 12–16 characters recommended).',
      'Toggle character options: uppercase (A-Z), lowercase (a-z), numbers (0-9), and symbols (!@#$%).',
      'Click Generate to produce a new strong random credential.',
      'Copy the generated password to your secure password manager.'
    ],
    formula: 'Entropy (bits) = Length × log₂(Character Pool Size)',
    formulaVariables: [
      { name: 'Password Length', description: 'Total character count.', unit: 'Characters', optional: false },
      { name: 'Character Pool', description: 'Variety of character classes selected.', unit: 'Unique glyphs', optional: false }
    ],
    workedExample: {
      scenario: 'Generating a 16-character password with all character classes (pool size = 94 printable ASCII characters).',
      stepByStep: [
        'Pool size: 26 uppercase + 26 lowercase + 10 digits + 32 symbols = 94.',
        'Entropy calculation: 16 × log₂(94) = 16 × 6.55 = 104.8 bits.',
        'Resistance level: Over 100 bits of entropy is immune to offline brute-force attacks.'
      ],
      result: '16-Character Password Entropy: ~105 bits (Ultra Secure)'
    },
    interpretation: 'High entropy passwords defend against credential stuffing, dictionary attacks, and GPU-accelerated hash cracking.',
    assumptions: 'Client-side cryptographic pseudo-random number generator (crypto.getRandomValues).',
    limitations: 'Never reuse the same generated password across multiple different websites.',
    faqs: [
      { question: 'What makes a password strong?', answer: 'Sufficient length (16+ characters) combined with high entropy from mixed character sets makes cracking mathematically infeasible.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بإنشاء كلمات مرور عشوائية قوية وآمنة ومشفرة باستخدام مجموعات مخصصة من الحروف الكبيرة والصغيرة والأرقام والرموز لحماية الحسابات.`,
    howToUse: [
      'حدد طول كلمة المرور المطلوبة (يوصى بـ 12 إلى 16 حرفاً على الأقل).',
      'اختر أنواع الخانات: أحرف كبيرة، أحرف صغيرة، أرقام، رموز خاصة.',
      'اضغط على توليد لإنشاء كلمة مرور عشوائية جديدة.',
      'انسخ كلمة المرور واحفظها في تطبيق إدارة كلمات المرور الخاص بك.'
    ],
    formula: 'الإنتروبيا (مقياس القوة) = الطول × لوغاريتم₂(حجم مجموعة الرموز)',
    formulaVariables: [
      { name: 'طول كلمة المرور', description: 'عدد خانات كلمة المرور.', unit: 'خانة / حرف', optional: false },
      { name: 'مجموعة الرموز', description: 'أنواع الأحرف والأرقام المختارة.', unit: 'رمز متاح', optional: false }
    ],
    workedExample: {
      scenario: 'توليد كلمة مرور بطول 16 خانة تجمع الأحرف والأرقام والرموز (مجموع الرموز = 94).',
      stepByStep: [
        'حجم مجموعة الخيارات: 26 حرف كبير + 26 صغير + 10 أرقام + 32 رمز = 94.',
        'قوة التشفير (الإنتروبيا): 16 × 6.55 = 104.8 بت.',
        'مستوى الأمان: أكثر من 100 بت يوفر حماية فائقة ضد هجمات التخمين.'
      ],
      result: 'قوة كلمة المرور (16 خانة): ~105 بت (حماية فائقة)'
    },
    interpretation: 'تمنع اختراق الحسابات عبر هجمات القوة الغاشمة (Brute Force) وقواميس التخمين.',
    assumptions: 'توليد عشوائي آمن عبر المتصفح محلياً دون إرسال البيانات عبر الإنترنت.',
    limitations: 'يجب تجنب تكرار استخدام نفس كلمة المرور لأكثر من حساب مختلف.',
    faqs: [
      { question: 'ما هو الطول الموصى به لكلمة المرور القوية؟', answer: 'يوصي خبراء الأمن السيبراني بألا يقل طول كلمة المرور عن 16 خانة متنوعة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} genera contraseñas seguras y criptográficamente aleatorias mediante combinaciones de mayúsculas, minúsculas, números y caracteres especiales.`,
    howToUse: [
      'Seleccione la longitud de la clave (se recomiendan al menos 16 caracteres).',
      'Active las opciones deseadas: mayúsculas, minúsculas, dígitos y símbolos.',
      'Haga clic en Generar para obtener una clave segura al instante.',
      'Copie la clave en su gestor de contraseñas de confianza.'
    ],
    formula: 'Entropía (bits) = Longitud × log₂(Tamaño del conjunto de caracteres)',
    formulaVariables: [
      { name: 'Longitud', description: 'Número total de caracteres.', unit: 'Caracteres', optional: false },
      { name: 'Conjunto de caracteres', description: 'Variedad de tipos incluidos.', unit: 'Símbolos', optional: false }
    ],
    workedExample: {
      scenario: 'Generación de una clave de 16 caracteres con todas las opciones activas (94 caracteres).',
      stepByStep: [
        'Conjunto: 26 mayúsculas + 26 minúsculas + 10 números + 32 símbolos = 94.',
        'Cálculo de entropía: 16 × log₂(94) = 16 × 6,55 = 104,8 bits.',
        'Nivel de seguridad: Inmune a ataques de fuerza bruta.'
      ],
      result: 'Entropía: ~105 bits (Máxima Seguridad)'
    },
    interpretation: 'Protege cuentas frente a ataques de diccionario y descifrado automatizado por fuerza bruta.',
    assumptions: 'Generación local mediante criptografía del navegador (crypto.getRandomValues).',
    limitations: 'Nunca reutilice la misma contraseña en diferentes plataformas web.',
    faqs: [
      { question: '¿Por qué es importante la longitud de la contraseña?', answer: 'Cada carácter adicional multiplica exponencialmente las combinaciones posibles, haciendo inviable el descifrado.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} produit des mots de passe robustes et hautement sécurisés générés aléatoirement avec majuscules, minuscules, chiffres et symboles.`,
    howToUse: [
      'Choisissez la longueur souhaitée (minimum 16 caractères conseillé).',
      'Cochez les types de caractères (majuscules, minuscules, chiffres, symboles).',
      'Cliquez sur Générer pour créer un mot de passe sécurisé.',
      'Copiez-le dans votre gestionnaire de mots de passe.'
    ],
    formula: 'Entropie (bits) = Longueur × log₂(Nombre de caractères disponibles)',
    formulaVariables: [
      { name: 'Longueur', description: 'Nombre total de signes.', unit: 'Caractères', optional: false },
      { name: 'Types de caractères', description: 'Ensemble des symboles permis.', unit: 'Symboles', optional: false }
    ],
    workedExample: {
      scenario: 'Mot de passe de 16 caractères avec tous les jeux de caractères (94 symboles).',
      stepByStep: [
        'Ensemble de caractères : 26 + 26 + 10 + 32 = 94.',
        'Calcul de l\'entropie : 16 × log₂(94) = 16 × 6,55 = 104,8 bits.',
        'Résistance : Sécurité maximale contre les attaques par force brute.'
      ],
      result: 'Entropie : ~105 bits (Ultra-Sécurisé)'
    },
    interpretation: 'Assure une protection robuste contre le piratage par dictionnaire et l\'usurpation d\'identité.',
    assumptions: 'Génération cryptographique locale sécurisée dans le navigateur.',
    limitations: 'Ne réutilisez jamais un même mot de passe sur plusieurs services distincts.',
    faqs: [
      { question: 'Qu\'est-ce que l\'entropie d\'un mot de passe ?', answer: 'C\'est la mesure mathématique en bits de son imprévisibilité et de sa résistance au piratage.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} generiert kryptografisch sichere, zufällige Passwörter aus Groß- und Kleinbuchstaben, Ziffern und Sonderzeichen zum Schutz Ihrer Online-Konten.`,
    howToUse: [
      'Wählen Sie die gewünschte Passwortlänge (empfohlen: mind. 16 Zeichen).',
      'Aktivieren Sie Großbuchstaben, Kleinbuchstaben, Zahlen und Sonderzeichen.',
      'Klicken Sie auf Generieren, um ein neues sicheres Passwort zu erstellen.',
      'Kopieren Sie das Passwort in Ihren Passwort-Manager.'
    ],
    formula: 'Entropie (Bits) = Länge × log₂(Zeichenvorrat)',
    formulaVariables: [
      { name: 'Passwortlänge', description: 'Anzahl der Zeichen.', unit: 'Zeichen', optional: false },
      { name: 'Zeichenauswahl', description: 'Umfang der Zeichenklassen.', unit: 'Zeichenpool', optional: false }
    ],
    workedExample: {
      scenario: 'Generierung eines 16-stelligen Passworts mit allen Zeichentypen (94 Zeichen im Pool).',
      stepByStep: [
        'Zeichenpool: 26 Groß- + 26 Kleinbuchstaben + 10 Ziffern + 32 Sonderzeichen = 94.',
        'Entropieberechnung: 16 × log₂(94) = 16 × 6,55 = 104,8 Bits.',
        'Sicherheitsniveau: Sicher gegen Offline-Brute-Force-Angriffe.'
      ],
      result: 'Entropie (16 Zeichen): ~105 Bits (Höchste Sicherheitsstufe)'
    },
    interpretation: 'Verhindert unbefugte Kontozugriffe durch Wörterbuch- und Brute-Force-Angriffe.',
    assumptions: 'Clientseitige Generierung über crypto.getRandomValues().',
    limitations: 'Verwenden Sie niemals dasselbe Passwort für mehrere verschiedene Konten.',
    faqs: [
      { question: 'Ab welcher Länge gilt ein Passwort als sicher?', answer: 'Sicherheitsexperten empfehlen heute mindestens 16 Zeichen mit gemischten Zeichentypen.' }
    ],
    relatedTools
  })
});

// 5. WORLD TIME ZONE PLANNER (time-zone)
export const TIME_ZONE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} coordinates global meeting times and converts timestamps across international time zones relative to Coordinated Universal Time (UTC).`,
    howToUse: [
      'Select your origin home time zone and base meeting time.',
      'Select destination time zones across Americas, Europe, Asia, or Pacific.',
      'Compare synchronized local times to schedule overlapping work hours.'
    ],
    formula: 'Target Local Time = Base Time - Origin UTC Offset + Target UTC Offset',
    formulaVariables: [
      { name: 'Base Time', description: 'Scheduled local timestamp.', unit: 'HH:MM', optional: false },
      { name: 'UTC Offsets', description: 'Standard time difference from UTC.', unit: '±Hours', optional: false }
    ],
    workedExample: {
      scenario: 'Converting a 14:00 (2:00 PM) New York time (UTC-5 / EST) to London (UTC+0 / GMT) and Tokyo (UTC+9 / JST).',
      stepByStep: [
        'Convert to UTC: 14:00 - (-5 hrs) = 19:00 UTC.',
        'London time (UTC+0): 19:00 + 0 = 19:00 (7:00 PM GMT).',
        'Tokyo time (UTC+9): 19:00 + 9 hrs = 04:00 (4:00 AM JST, next day).'
      ],
      result: 'New York 14:00 = London 19:00 (same day) = Tokyo 04:00 (next day)'
    },
    interpretation: 'Simplifies remote team collaboration and prevents missed transatlantic client calls.',
    assumptions: 'Calculations account for standard timezone offsets.',
    limitations: 'Daylight Saving Time (DST) transition dates differ across countries and hemispheres.',
    faqs: [
      { question: 'What does UTC stand for?', answer: 'UTC stands for Coordinated Universal Time, the primary global time standard by which the world regulates clocks.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحويل الأوقات بين المناطق الزمنية العالمية وتنسيق مواعيد الاجتماعات الدولية نسبة إلى التوقيت العالمي المنسق (UTC).`,
    howToUse: [
      'حدد منطقتك الزمنية الحالية ووقت الاجتماع المطلوب.',
      'اختر المناطق الزمنية للمشاركين في مختلف قارات العالم.',
      'قارن الأوقات المحلية المتزامنة لاختيار الموعد الأنسب للجميع.'
    ],
    formula: 'الوقت المستهدف = وقت الأساس - فارق منطقتك عن UTC + فارق المنطقة المستهدفة',
    formulaVariables: [
      { name: 'الوقت الأساسي', description: 'توقيت الموعد المحلي.', unit: 'ساعة:دقيقة', optional: false },
      { name: 'فارق التوقيت', description: 'عدد الساعات المضافة أو المخصومة عن UTC.', unit: '±ساعة', optional: false }
    ],
    workedExample: {
      scenario: 'تحويل موعد الساعة 14:00 بتوقيت نيويورك (UTC-5) إلى لندن (UTC+0) وطوكيو (UTC+9).',
      stepByStep: [
        'التحويل للتوقيت العالمي (UTC): 14:00 + 5 = 19:00 UTC.',
        'توقيت لندن (UTC+0): 19:00 (السابعة مساءً).',
        'توقيت طوكيو (UTC+9): 19:00 + 9 ساعات = 04:00 صباح اليوم التالي.'
      ],
      result: 'نيويورك 14:00 = لندن 19:00 = طوكيو 04:00 (اليوم التالي)'
    },
    interpretation: 'أداة حيوية للشركات وفرق العمل عن بعد لتنسيق المكالمات والمؤتمرات العالمية.',
    assumptions: 'تعتمد فروق التوقيت المعيارية الدولية.',
    limitations: 'تختلف تواريخ بدء وانتهاء التوقيت الصيفي بين الدول والمناطق.',
    faqs: [
      { question: 'ما هو التوقيت العالمي المنسق (UTC)؟', answer: 'هو المرجع الزمني المعياري الأساسي الذي تضبط عليه ساعات العالم وفروق التوقيت.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} coordina horarios de reuniones internacionales y convierte horas entre zonas horarias del mundo en relación con el Tiempo Universal Coordinado (UTC).`,
    howToUse: [
      'Seleccione su zona horaria local y la hora de la reunión.',
      'Añada las zonas horarias de los demás participantes.',
      'Compruebe los horarios simultáneos para fijar una reunión sin solapamientos.'
    ],
    formula: 'Hora local destino = Hora base - Diferencia origen UTC + Diferencia destino UTC',
    formulaVariables: [
      { name: 'Hora base', description: 'Hora programada local.', unit: 'HH:MM', optional: false },
      { name: 'Desfase UTC', description: 'Diferencia horaria respecto a UTC.', unit: '±Horas', optional: false }
    ],
    workedExample: {
      scenario: 'Conversión de las 14:00 de Nueva York (UTC-5) a Londres (UTC+0) y Tokio (UTC+9).',
      stepByStep: [
        'Paso a UTC: 14:00 + 5 h = 19:00 UTC.',
        'Hora en Londres (UTC+0): 19:00 (7:00 PM).',
        'Hora en Tokio (UTC+9): 19:00 + 9 h = 04:00 (4:00 AM del día siguiente).'
      ],
      result: 'Nueva York 14:00 = Londres 19:00 = Tokio 04:00 (+1 día)'
    },
    interpretation: 'Facilita la coordinación de equipos de trabajo deslocalizados y conferencias globales.',
    assumptions: 'Desfases estándar oficiales.',
    limitations: 'Los cambios de horario de verano e invierno varían según el país.',
    faqs: [
      { question: '¿Qué significa UTC?', answer: 'Significa Universal Time Coordinated y es el estándar de tiempo oficial a nivel mundial.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} planifie des réunions internationales et convertit les horaires entre fuseaux horaires mondiaux par rapport au temps universel coordonné (UTC).`,
    howToUse: [
      'Sélectionnez votre fuseau horaire de départ et l\'heure prévue.',
      'Ajoutez les fuseaux horaires des interlocuteurs internationaux.',
      'Comparez les heures locales correspondantes.'
    ],
    formula: 'Heure cible = Heure source - Décalage source UTC + Décalage cible UTC',
    formulaVariables: [
      { name: 'Heure initiale', description: 'Heure locale programmée.', unit: 'HH:MM', optional: false },
      { name: 'Décalage UTC', description: 'Écart horaire par rapport à UTC.', unit: '±Heures', optional: false }
    ],
    workedExample: {
      scenario: 'Conversion de 14h00 à New York (UTC-5) pour Londres (UTC+0) et Tokyo (UTC+9).',
      stepByStep: [
        'Conversion UTC : 14h00 + 5h = 19h00 UTC.',
        'Londres (UTC+0) : 19h00 (19h00 GMT).',
        'Tokyo (UTC+9) : 19h00 + 9h = 04h00 (le lendemain matin).'
      ],
      result: 'New York 14h00 = Londres 19h00 = Tokyo 04h00 (jour suivant)'
    },
    interpretation: 'Évite les erreurs de planning lors de conférences et réunions d\'équipes distribuées.',
    assumptions: 'Décalages horaires standards.',
    limitations: 'Les dates de passage à l\'heure d\'été/hiver peuvent différer selon les législations nationales.',
    faqs: [
      { question: 'Quelle est la différence entre GMT et UTC ?', answer: 'UTC est la norme atomique internationale moderne, tandis que GMT est un fuseau horaire astronomique historique.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} plant weltweite Telefonkonferenzen und rechnet Uhrzeiten zwischen internationalen Zeitzonen relativ zur koordinierten Weltzeit (UTC) um.`,
    howToUse: [
      'Wählen Sie Ihre lokale Zeitzone und die gewünschte Uhrzeit aus.',
      'Fügen Sie die Zielzeitzonen der Gesprächspartner hinzu.',
      'Vergleichen Sie die synchronisierten Uhrzeiten auf einen Blick.'
    ],
    formula: 'Zielzeit = Ausgangszeit - Ausgangs-UTC-Offset + Ziel-UTC-Offset',
    formulaVariables: [
      { name: 'Uhrzeit', description: 'Geplante lokale Startzeit.', unit: 'HH:MM', optional: false },
      { name: 'UTC-Offset', description: 'Zeitverschiebung zu UTC.', unit: '±Stunden', optional: false }
    ],
    workedExample: {
      scenario: 'Umrechnung von 14:00 Uhr New York (UTC-5) nach London (UTC+0) und Tokio (UTC+9).',
      stepByStep: [
        'Umrechnung in UTC: 14:00 + 5 h = 19:00 Uhr UTC.',
        'London (UTC+0): 19:00 Uhr.',
        'Tokio (UTC+9): 19:00 + 9 h = 04:00 Uhr morgens (am Folgetag).'
      ],
      result: 'New York 14:00 = London 19:00 = Tokio 04:00 (Folgetag)'
    },
    interpretation: 'Verhindert Terminkonflikte bei der Zusammenarbeit in internationalen Unternehmen und Remote-Teams.',
    assumptions: 'Berechnung auf Basis offizieller Standard-Zeitzonendefinitionen.',
    limitations: 'Sommerzeit-Umstellungen (DST) erfolgen länderspezifisch an unterschiedlichen Kalendertagen.',
    faqs: [
      { question: 'Was bedeutet UTC?', answer: 'UTC steht für Universal Time Coordinated (koordinierte Weltzeit), der globale Referenzzeitstandard.' }
    ],
    relatedTools
  })
});

// 6. TRIP FUEL & GAS COST CALCULATOR (fuel-cost)
export const FUEL_COST_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} estimates total fuel consumption and monetary fuel expenses for road trips based on driving distance, vehicle fuel economy, and gas prices.`,
    howToUse: [
      'Enter total trip driving distance (miles or kilometers).',
      'Enter vehicle fuel efficiency rating (MPG or liters per 100 km).',
      'Enter current fuel price per gallon or liter.',
      'Review total required fuel volume and estimated overall trip travel cost.'
    ],
    formula: 'Fuel Needed = Distance / Fuel Efficiency | Trip Cost = Fuel Needed × Price per Unit',
    formulaVariables: [
      { name: 'Distance', description: 'Total one-way or round-trip driving distance.', unit: 'Miles or km', optional: false },
      { name: 'Fuel Efficiency', description: 'Vehicle fuel consumption economy.', unit: 'MPG or L/100km', optional: false },
      { name: 'Fuel Price', description: 'Local gasoline or diesel price.', unit: 'Cost per gal or L', optional: false }
    ],
    workedExample: {
      scenario: 'Driving a 300-mile trip with a car achieving 30 MPG and gas priced at $3.50 per gallon.',
      stepByStep: [
        'Calculate required fuel volume: 300 miles / 30 MPG = 10.0 gallons.',
        'Calculate total fuel expenditure: 10.0 gallons × $3.50 / gallon = $35.00.'
      ],
      result: 'Fuel Volume: 10.0 gallons | Total Trip Fuel Cost: $35.00'
    },
    interpretation: 'Allows drivers and traveling companions to budget vehicle operating costs and split road trip gas expenses fairly.',
    assumptions: 'Steady-state average driving speed and standard traffic conditions.',
    limitations: 'Urban stop-and-go traffic, towing trailers, or steep mountain grades reduce actual fuel economy.',
    faqs: [
      { question: 'How do I convert MPG to L/100km?', answer: 'Divide 235.215 by the MPG rating (e.g., 235.215 / 30 MPG ≈ 7.84 L/100km).' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتقدير كمية الوقود المستهلكة وتكلفة البنزين الإجمالية لرحلات السفر بالسيارة بناءً على المسافة ومعدل استهلاك المحرك وسعر لتر الوقود.`,
    howToUse: [
      'أدخل مسافة الرحلة المقطوعة (بالكيلومتر أو الميل).',
      'أدخل معدل استهلاك سيارتك للوقود (كم/لتر أو لتر/100كم).',
      'أدخل سعر لتر الوقود الحالي.',
      'اطلع على كمية الوقود المطلوبة والتكلفة الإجمالية للرحلة.'
    ],
    formula: 'الوقود المطلوب = المسافة ÷ كفاءة الاستهلاك | التكلفة = كمية الوقود × سعر اللتر',
    formulaVariables: [
      { name: 'المسافة', description: 'المسافة الكلية المقطوعة بالسيارة.', unit: 'كم أو ميل', optional: false },
      { name: 'كفاءة الوقود', description: 'معدل استهلاك المحرك.', unit: 'لتر/100كم أو كم/لتر', optional: false },
      { name: 'سعر الوقود', description: 'تكلفة لتر البنزين أو الديزل.', unit: 'سعر / لتر', optional: false }
    ],
    workedExample: {
      scenario: 'قيادة مسافة 300 كم بسيارة تستهلك 10 كم/لتر وسعر لتر الوقود 0.70 دولار.',
      stepByStep: [
        'حساب كمية الوقود المطلوبة: 300 ÷ 10 = 30.0 لتراً.',
        'حساب تكلفة الوقود الإجمالية: 30.0 × 0.70 دولار = 21.00 دولار.'
      ],
      result: 'كمية الوقود: 30 لتراً | تكلفة وقود الرحلة: 21.00 دولار'
    },
    interpretation: 'تمكن المسافرين من تخطيط ميزانية التنقل وتقاسم تكاليف الوقود مع الركاب بدقة.',
    assumptions: 'قيادة عادية في ظروف طريق معتادة دون توقفات مفرطة.',
    limitations: 'الازدحام المروري وتشغيل التكييف وحمولات الوزن الزائدة تزيد من معدل الاستهلاك الفعلي.',
    faqs: [
      { question: 'ما هو معدل الاستهلاك المثالي للسيارات الحديثة؟', answer: 'تستهلك السيارات الاقتصادية الحديثة ما بين 5 إلى 7 لترات لكل 100 كيلومتر في الطرق السريعة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} estima el consumo de combustible y el gasto total en gasolina o diésel para un trayecto según la distancia, el consumo del vehículo y el precio del carburante.`,
    howToUse: [
      'Introduzca la distancia total del viaje en kilómetros o millas.',
      'Introduzca el consumo medio de su vehículo (L/100km o MPG).',
      'Introduzca el precio actual por litro o galón.',
      'Consulte los litros necesarios y el coste económico total del viaje.'
    ],
    formula: 'Litros necesarios = (Distancia × Consumo L/100km) / 100 | Coste = Litros × Precio',
    formulaVariables: [
      { name: 'Distancia', description: 'Kilómetros recorridos.', unit: 'km', optional: false },
      { name: 'Consumo medio', description: 'Eficiencia del motor.', unit: 'L/100km', optional: false },
      { name: 'Precio carburante', description: 'Precio del litro.', unit: '€/L o $/L', optional: false }
    ],
    workedExample: {
      scenario: 'Viaje de 300 km con un coche de 6,0 L/100km y gasolina a 1,60 €/L.',
      stepByStep: [
        'Cálculo de combustible: (300 × 6,0) / 100 = 18,0 litros.',
        'Coste total: 18,0 litros × 1,60 €/L = 28,80 €.'
      ],
      result: 'Combustible: 18,0 L | Coste del trayecto: 28,80 €'
    },
    interpretation: 'Ideal para planificar presupuestos de vacaciones o calcular gastos compartidos en coche.',
    assumptions: 'Condiciones medias de circulación en carretera.',
    limitations: 'Tráfico urbano denso o conducción agresiva incrementan el consumo real.',
    faqs: [
      { question: '¿Cómo calcular el consumo exacto de mi coche?', answer: 'Llene el depósito, ponga el cuentakilómetros a cero, y al volver a llenar divida los litros repostados entre los kilómetros y multiplique por 100.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} évalue la consommation de carburant et le coût total en essence ou diesel pour vos trajets routiers selon la distance, le véhicule et le prix au litre.`,
    howToUse: [
      'Saisissez la distance du trajet en kilomètres.',
      'Indiquez la consommation moyenne du véhicule (L/100 km).',
      'Indiquez le prix du carburant au litre.',
      'Consultez le volume de carburant nécessaire et le budget transport total.'
    ],
    formula: 'Carburant (L) = (Distance × L/100km) / 100 | Coût total = Volume × Prix au litre',
    formulaVariables: [
      { name: 'Distance', description: 'Longueur du parcours.', unit: 'km', optional: false },
      { name: 'Consommation', description: 'Consommation moyenne.', unit: 'L/100km', optional: false },
      { name: 'Prix du litre', description: 'Prix à la pompe.', unit: '€ / L', optional: false }
    ],
    workedExample: {
      scenario: 'Trajet de 300 km avec une voiture consommant 6,0 L/100km et un carburant à 1,60 €/L.',
      stepByStep: [
        'Volume requis : (300 × 6,0) / 100 = 18,0 litres.',
        'Montant du carburant : 18,0 L × 1,60 €/L = 28,80 €.'
      ],
      result: 'Carburant requis : 18,0 L | Coût estimé du trajet : 28,80 €'
    },
    interpretation: 'Permet de budgétiser les déplacements professionnels ou de partager les frais de covoiturage équitablement.',
    assumptions: 'Vitesse de croisière standard sans embouteillages majeurs.',
    limitations: 'L\'usage de la climatisation et les dénivelés augmentent la consommation réelle.',
    faqs: [
      { question: 'Comment réduire sa consommation d\'essence ?', answer: 'Adoptez une conduite souple, vérifiez la pression des pneus et évitez les surcharges inutiles.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet den Spritverbrauch und die gesamten Treibstoffkosten für Autofahrten basierend auf Fahrtstrecke, Durchschnittsverbrauch und Kraftstoffpreis.`,
    howToUse: [
      'Geben Sie die Fahrstrecke in Kilometern ein.',
      'Geben Sie den Durchschnittsverbrauch Ihres Fahrzeugs (L/100 km) ein.',
      'Geben Sie den aktuellen Benzin- oder Dieselpreis pro Liter ein.',
      'Lesen Sie den benötigten Kraftstoffbedarf und die Gesamtkosten ab.'
    ],
    formula: 'Kraftstoff (Liter) = (Strecke × Verbrauch L/100km) / 100 | Gesamtkosten = Liter × Literpreis',
    formulaVariables: [
      { name: 'Fahrstrecke', description: 'Gefahrene Distanz.', unit: 'km', optional: false },
      { name: 'Verbrauch', description: 'Durchschnittsverbrauch auf 100 km.', unit: 'L/100km', optional: false },
      { name: 'Spritpreis', description: 'Preis an der Zapfsäule.', unit: '€ / Liter', optional: false }
    ],
    workedExample: {
      scenario: 'Fahrt über 300 km bei einem Verbrauch von 6,0 L/100km und einem Spritpreis von 1,60 €/L.',
      stepByStep: [
        'Spritbedarf berechnen: (300 × 6,0) / 100 = 18,0 Liter.',
        'Gesamtkosten berechnen: 18,0 Liter × 1,60 €/L = 28,80 €.'
      ],
      result: 'Kraftstoffbedarf: 18,0 Liter | Gesamtkosten: 28,80 €'
    },
    interpretation: 'Ermöglicht eine präzise Reisekostenkalkulation und faire Abrechnung bei Fahrgemeinschaften.',
    assumptions: 'Gleichmäßige Fahrweise bei durchschnittlichen Verkehrsbedingungen.',
    limitations: 'Stadtverkehr, Stau und Zuladung erhöhen den realen Kraftstoffverbrauch.',
    faqs: [
      { question: 'Wie rechne ich MPG in Liter pro 100 km um?', answer: 'Teilen Sie 235,215 durch den MPG-Wert (z. B. 235,215 / 30 MPG ≈ 7,84 L/100km).' }
    ],
    relatedTools
  })
});

// 7. IMAGE & VIDEO ASPECT RATIO CALCULATOR (aspect-ratio)
export const ASPECT_RATIO_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates proportional display dimensions (width and height) and determines simplified aspect ratios (e.g., 16:9, 4:3, 21:9, 1:1) for digital images and video formats.`,
    howToUse: [
      'Enter original source width and height in pixels.',
      'Enter a new target width or target height.',
      'Review the calculated proportional dimension and the simplified aspect ratio.'
    ],
    formula: 'New Height = New Width × (Original Height / Original Width) | Ratio = (W / GCD) : (H / GCD)',
    formulaVariables: [
      { name: 'Width', description: 'Horizontal pixel resolution.', unit: 'Pixels (px)', optional: false },
      { name: 'Height', description: 'Vertical pixel resolution.', unit: 'Pixels (px)', optional: false },
      { name: 'Target Dimension', description: 'Rescaled width or height.', unit: 'Pixels (px)', optional: false }
    ],
    workedExample: {
      scenario: 'Rescaling a 1920×1080 (16:9 Full HD) video to a target width of 1280 pixels.',
      stepByStep: [
        'Calculate aspect ratio multiplier: 1080 / 1920 = 0.5625.',
        'Calculate new height: 1280 × 0.5625 = 720 pixels.',
        'Determine simplified ratio: GCD(1920, 1080) = 120 -> 16:9.'
      ],
      result: 'New Dimensions: 1280 × 720 px (Maintains 16:9 Aspect Ratio)'
    },
    interpretation: 'Prevents image distortion, stretching, and black pillarboxing in graphic design, photography, and video editing.',
    assumptions: 'Square pixel geometry (1.0 pixel aspect ratio).',
    limitations: 'Anamorphic film lenses with non-square pixel aspect ratios require separate desqueeze factors.',
    faqs: [
      { question: 'What is the most common widescreen aspect ratio?', answer: '16:9 (1.78:1) is the universal international standard for HDTV, YouTube, computer monitors, and mobile displays.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب الأبعاد التناسبية (العرض والارتفاع) وتحديد نسب العرض إلى الارتفاع القياسية (مثل 16:9، 4:3، 1:1) للصور ومقاطع الفيديو الرقمية.`,
    howToUse: [
      'أدخل العرض والارتفاع الأصليين بالبكسل.',
      'أدخل العرض الجديد أو الارتفاع الجديد المستهدف.',
      'اطلع على البعد المتناسب التلقائي ونسبة العرض إلى الارتفاع المبسطة.'
    ],
    formula: 'الارتفاع الجديد = العرض الجديد × (الارتفاع الأصلي ÷ العرض الأصلي)',
    formulaVariables: [
      { name: 'العرض', description: 'الدقة الأفقية بالبكسل.', unit: 'بكسل (px)', optional: false },
      { name: 'الارتفاع', description: 'الدقة الرأسية بالبكسل.', unit: 'بكسل (px)', optional: false },
      { name: 'البعد المستهدف', description: 'المقاس الجديد المراد تعديله.', unit: 'بكسل', optional: false }
    ],
    workedExample: {
      scenario: 'تعديل مقاس فيديو 1920×1080 (بنسبة 16:9) ليصبح العرض 1280 بكسل.',
      stepByStep: [
        'معامل التناسب: 1080 ÷ 1920 = 0.5625.',
        'الارتفاع الجديد: 1280 × 0.5625 = 720 بكسل.',
        'النسبة المبسطة: 16:9.'
      ],
      result: 'الأبعاد الجديدة: 1280 × 720 بكسل (نسبة 16:9)'
    },
    interpretation: 'تمنع تشوه الصور وتمطيطها أثناء التصميم الجرافيكي والمونتاج وصناعة المحتوى.',
    assumptions: 'بكسلات مربعة متناسبة.',
    limitations: 'تتطلب العدسات السينمائية المشوهة (Anamorphic) معاملات تعديل إضافية.',
    faqs: [
      { question: 'ما هي أشهر نسبة عرض إلى ارتفاع اليوم؟', answer: 'نسبة 16:9 هي المعيار العالمي المعتمد لشاشات التلفزيون واليوتيوب وشاشات الحواسيب.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula dimensiones proporcionales (ancho y alto) y ratios de aspecto estándar (16:9, 4:3, 21:9, 1:1) para imágenes y vídeo digital.`,
    howToUse: [
      'Introduzca el ancho y alto originales en píxeles.',
      'Introduzca el nuevo ancho o nuevo alto deseado.',
      'Consulte la dimensión proporcional resultante y el ratio simplificado.'
    ],
    formula: 'Nuevo alto = Nuevo ancho × (Alto original / Ancho original)',
    formulaVariables: [
      { name: 'Ancho', description: 'Resolución horizontal.', unit: 'Píxeles (px)', optional: false },
      { name: 'Alto', description: 'Resolución vertical.', unit: 'Píxeles (px)', optional: false },
      { name: 'Dimensión objetivo', description: 'Nuevo valor escalado.', unit: 'Píxeles', optional: false }
    ],
    workedExample: {
      scenario: 'Redimensionar un vídeo 1920×1080 (16:9) a un ancho de 1280 px.',
      stepByStep: [
        'Proporción: 1080 / 1920 = 0,5625.',
        'Nuevo alto: 1280 × 0,5625 = 720 px.',
        'Ratio simplificado: 16:9.'
      ],
      result: 'Dimensiones resultantes: 1280 × 720 px (Ratio 16:9)'
    },
    interpretation: 'Evita distorsiones, deformaciones y franjas negras en diseño gráfico y producción audiovisual.',
    assumptions: 'Píxeles cuadrados estándar.',
    limitations: 'Formatos anamórficos requieren factores de descompresión específicos.',
    faqs: [
      { question: '¿Qué significa un ratio 16:9?', answer: 'Significa que por cada 16 unidades de anchura de pantalla, hay 9 unidades de altura.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule les dimensions proportionnelles (largeur et hauteur) et détermine le ratio d'aspect (16:9, 4:3, 21:9, 1:1) pour vos images et vidéos.`,
    howToUse: [
      'Saisissez la largeur et la hauteur d\'origine en pixels.',
      'Indiquez la nouvelle largeur ou hauteur cible.',
      'Consultez la dimension proportionnelle calculée et le ratio d\'image.'
    ],
    formula: 'Nouvelle hauteur = Nouvelle largeur × (Hauteur origine / Largeur origine)',
    formulaVariables: [
      { name: 'Largeur', description: 'Définition horizontale.', unit: 'Pixels (px)', optional: false },
      { name: 'Hauteur', description: 'Définition verticale.', unit: 'Pixels (px)', optional: false },
      { name: 'Dimension cible', description: 'Valeur redimensionnée.', unit: 'Pixels', optional: false }
    ],
    workedExample: {
      scenario: 'Redimensionnement d\'une vidéo 1920×1080 à 1280 px de large.',
      stepByStep: [
        'Facteur de forme : 1080 / 1920 = 0,5625.',
        'Nouvelle hauteur : 1280 × 0,5625 = 720 px.',
        'Ratio d\'aspect : 16:9.'
      ],
      result: 'Nouvelle résolution : 1280 × 720 px (Format 16:9)'
    },
    interpretation: 'Essentiel pour adapter des visuels aux réseaux sociaux sans déformation ni recadrage intempestif.',
    assumptions: 'Píxels carrés standards.',
    limitations: 'Les formats anamorphiques nécessitent un ratio de pixel spécifique.',
    faqs: [
      { question: 'Quel est le ratio pour Instagram ?', answer: 'Le format carré standard est 1:1 (1080×1080 px) et le format vertical Stories/Reels est 9:16 (1080×1920 px).' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet proportionale Bildauflösungen (Breite und Höhe) und ermittelt das exakte Seitenverhältnis (z. B. 16:9, 4:3, 21:9, 1:1) für Bilder und Videos.`,
    howToUse: [
      'Geben Sie Originalbreite und Originalhöhe in Pixeln ein.',
      'Geben Sie die gewünschte Zielbreite oder Zielhöhe ein.',
      'Lesen Sie die proportionale Gegenabmessung und das Seitenverhältnis ab.'
    ],
    formula: 'Neue Höhe = Neue Breite × (Originalhöhe / Originalbreite)',
    formulaVariables: [
      { name: 'Breite', description: 'Horizontale Auflösung.', unit: 'Pixel (px)', optional: false },
      { name: 'Höhe', description: 'Vertikale Auflösung.', unit: 'Pixel (px)', optional: false },
      { name: 'Zielabmessung', description: 'Skalierter Zielwert.', unit: 'Pixel', optional: false }
    ],
    workedExample: {
      scenario: 'Skalierung eines Full-HD-Videos (1920×1080 px, 16:9) auf 1280 px Breite.',
      stepByStep: [
        'Verhältnisfaktor: 1080 / 1920 = 0,5625.',
        'Neue Höhe: 1280 × 0,5625 = 720 Pixel.',
        'Seitenverhältnis: 16:9.'
      ],
      result: 'Neue Auflösung: 1280 × 720 px (Seitenverhältnis 16:9)'
    },
    interpretation: 'Verhindert Bildverzerrungen und unerwünschte schwarze Balken im Grafikdesign und Videoschnitt.',
    assumptions: 'Quadratische Standardpixel (PAR 1:1).',
    limitations: 'Anamorphe Filmaufnahmen erfordern gesonderte Entzerrungsfaktoren.',
    faqs: [
      { question: 'Was ist das gebräuchlichste Breitbildformat?', answer: '16:9 ist der weltweite Standard für Fernseher, Monitore und Online-Videoplattformen.' }
    ],
    relatedTools
  })
});

// 8. CARBON FOOTPRINT CALCULATOR (carbon-footprint)
export const CARBON_FOOTPRINT_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} estimates personal and household greenhouse gas emissions (in kg of CO₂ equivalent) across transport, home electricity, and air travel.`,
    howToUse: [
      'Enter weekly vehicle driving distance in kilometers or miles.',
      'Enter monthly home electricity consumption in kilowatt-hours (kWh).',
      'Enter annual flight travel hours.',
      'Review total estimated annual CO₂ emissions in metric tons alongside reduction insights.'
    ],
    formula: 'Annual CO₂ (kg) = (Weekly km × 52 × 0.12) + (Monthly kWh × 12 × 0.40) + (Flight Hours × 90)',
    formulaVariables: [
      { name: 'Driving Distance', description: 'Vehicle transit distance.', unit: 'km/week', optional: false },
      { name: 'Electricity Use', description: 'Household grid energy.', unit: 'kWh/month', optional: false },
      { name: 'Flight Hours', description: 'Total commercial air travel.', unit: 'Hours/year', optional: false }
    ],
    workedExample: {
      scenario: 'Driving 200 km/week, consuming 300 kWh/month of electricity, and flying 10 hours per year.',
      stepByStep: [
        'Vehicle emissions: 200 km × 52 weeks × 0.12 kg/km = 1,248 kg CO₂.',
        'Electricity emissions: 300 kWh × 12 months × 0.40 kg/kWh = 1,440 kg CO₂.',
        'Flight emissions: 10 hours × 90 kg/hour = 900 kg CO₂.',
        'Total annual carbon footprint: 1,248 + 1,440 + 900 = 3,588 kg (3.59 metric tons CO₂e).'
      ],
      result: 'Total Annual Carbon Footprint: 3,588 kg CO₂e (3.59 metric tons / year)'
    },
    interpretation: 'Identifies individual lifestyle emission drivers to benchmark against global climate targets (<2 tons/person/year).',
    assumptions: 'Average global grid carbon intensity and passenger vehicle averages.',
    limitations: 'Does not account for dietary variations, embodied goods manufacturing, or renewable energy tariffs.',
    faqs: [
      { question: 'What is the global average carbon footprint per person?', answer: 'The global average is approximately 4 to 5 metric tons of CO₂ per person per year, though developed nations average 10 to 15 tons.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتقدير انبعاثات الغازات الدفيئة والبصمة الكربونية الشخصية (بالكيلوغرام من مكافئ ثاني أكسيد الكربون) الناتجة عن قيادة السيارات واستهلاك الكهرباء والسفر الجوي.`,
    howToUse: [
      'أدخل المسافة المقطوعة بالسيارة أسبوعياً بالكيلومترات.',
      'أدخل استهلاك الكهرباء المنزلي الشهري بالكيلوواط/ساعة.',
      'أدخل عدد ساعات السفر بالطائرة سنوياً.',
      'اطلع على إجمالي انبعاثات الكربون السنوية بالطن المتري وسبل ترشيدها.'
    ],
    formula: 'إجمالي الانبعاثات السنوية (كغ CO₂) = (كم أسبوعي × 52 × 0.12) + (كيلوواط شهري × 12 × 0.40) + (ساعات الطيران × 90)',
    formulaVariables: [
      { name: 'مسافة القيادة', description: 'المسافة المقطوعة أسبوعياً بالسيارة.', unit: 'كم / أسبوع', optional: false },
      { name: 'استهلاك الكهرباء', description: 'استهلاك الشبكة الكهربائية شهرياً.', unit: 'كيلوواط.ساعة / شهر', optional: false },
      { name: 'ساعات الطيران', description: 'إجمالي ساعات الرحلات الجوية سنوياً.', unit: 'ساعة / سنة', optional: false }
    ],
    workedExample: {
      scenario: 'قيادة 200 كم أسبوعياً، واستهلاك 300 كيلوواط/ساعة كهرباء شهرياً، والسفر 10 ساعات طيران سنوياً.',
      stepByStep: [
        'انبعاثات السيارة: 200 × 52 × 0.12 = 1,248 كغ CO₂.',
        'انبعاثات الكهرباء: 300 × 12 × 0.40 = 1,440 كغ CO₂.',
        'انبعاثات الطيران: 10 × 90 = 900 كغ CO₂.',
        'الإجمالي السنوي: 1,248 + 1,440 + 900 = 3,588 كغ (3.59 طن متري).'
      ],
      result: 'إجمالي البصمة الكربونية: 3,588 كغ CO₂ (3.59 طن سنوياً)'
    },
    interpretation: 'تساعد الأفراد على تقييم أثر نمط حياتهم البيئي ومقارنته بالمستهدفات المناخية العالمية.',
    assumptions: 'معاملات الانبعاثات القياسية للطاقة والمواصلات العامة.',
    limitations: 'لا تشمل البصمة الكربونية للمنتجات الغذائية والسلع الاستهلاكية.',
    faqs: [
      { question: 'ما هو المعدل المستهدف للبصمة الكربونية للفرد؟', answer: 'تستهدف اتفاقية باريس للمناخ خفض بصمة الفرد الكربونية إلى أقل من 2 طن متري سنوياً بحلول عام 2050.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} estima las emisiones individuales de gases de efecto invernadero (en kg de CO₂ equivalente) asociadas al transporte en vehículo, electricidad del hogar y vuelos.`,
    howToUse: [
      'Introduzca los kilómetros conducidos por semana.',
      'Introduzca el consumo mensual de electricidad en kWh.',
      'Introduzca las horas de vuelo comerciales al año.',
      'Consulte la huella de carbono anual total en toneladas de CO₂.'
    ],
    formula: 'CO₂ anual (kg) = (km/sem × 52 × 0,12) + (kWh/mes × 12 × 0,40) + (Horas vuelo × 90)',
    formulaVariables: [
      { name: 'Conducción', description: 'Kilómetros semanales en coche.', unit: 'km / semana', optional: false },
      { name: 'Electricidad', description: 'Consumo de luz mensual.', unit: 'kWh / mes', optional: false },
      { name: 'Vuelos', description: 'Horas de vuelo al año.', unit: 'Horas / año', optional: false }
    ],
    workedExample: {
      scenario: '200 km/semana en coche, 300 kWh/mes de luz y 10 horas de vuelo al año.',
      stepByStep: [
        'Coche: 200 × 52 × 0,12 = 1.248 kg CO₂.',
        'Electricidad: 300 × 12 × 0,40 = 1.440 kg CO₂.',
        'Vuelos: 10 × 90 = 900 kg CO₂.',
        'Total anual: 1.248 + 1.440 + 900 = 3.588 kg (3,59 toneladas).'
      ],
      result: 'Huella de carbono total: 3.588 kg CO₂e (3,59 toneladas/año)'
    },
    interpretation: 'Permite identificar áreas prioritarias de reducción para avanzar hacia la neutralidad climática.',
    assumptions: 'Factores medios de emisión del mix energético convencional.',
    limitations: 'No incluye el impacto de la alimentación ni de compras de bienes materiales.',
    faqs: [
      { question: '¿Cuál es la huella de carbono media de un ciudadano?', answer: 'La media mundial es de unas 4 a 5 toneladas de CO₂ por persona y año.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} évalue vos émissions personnelles de gaz à effet de serre (en kg d'équivalent CO₂) liées à l'usage de la voiture, l'électricité domestique et les voyages en avion.`,
    howToUse: [
      'Indiquez les kilomètres parcourus en voiture par semaine.',
      'Indiquez votre consommation électrique mensuelle en kWh.',
      'Indiquez le nombre d\'heures de vol par an.',
      'Consultez votre bilan carbone annuel total en tonnes de CO₂.'
    ],
    formula: 'CO₂ annuel (kg) = (km/sem × 52 × 0,12) + (kWh/mois × 12 × 0,40) + (Heures avion × 90)',
    formulaVariables: [
      { name: 'Trajet voiture', description: 'Kilométrage hebdomadaire.', unit: 'km / semaine', optional: false },
      { name: 'Électricité', description: 'Consommation d\'énergie.', unit: 'kWh / mois', optional: false },
      { name: 'Vols aériens', description: 'Heures de vol annuelles.', unit: 'Heures / an', optional: false }
    ],
    workedExample: {
      scenario: '200 km/semaine en voiture, 300 kWh/mois d\'électricité et 10 heures d\'avion par an.',
      stepByStep: [
        'Émissions voiture : 200 × 52 × 0,12 = 1 248 kg CO₂.',
        'Émissions électricité : 300 × 12 × 0,40 = 1 440 kg CO₂.',
        'Émissions avion : 10 × 90 = 900 kg CO₂.',
        'Empreinte annuelle : 1 248 + 1 440 + 900 = 3 588 kg (3,59 tonnes).'
      ],
      result: 'Empreinte carbone annuelle : 3 588 kg CO₂e (3,59 tonnes / an)'
    },
    interpretation: 'Aide à situer son impact écologique par rapport à l\'objectif climatique de 2 tonnes par personne et par an.',
    assumptions: 'Facteurs d\'émission moyens de référence.',
    limitations: 'N\'intègre pas l\'empreinte liée au régime alimentaire ou aux biens d\'équipement.',
    faqs: [
      { question: 'Quel est l\'objectif d\'émissions par personne d\'ici 2050 ?', answer: 'L\'accord de Paris préconise de limiter l\'empreinte à moins de 2 tonnes de CO₂ par personne et par an.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die persönlichen Treibhausgasemissionen (in kg CO₂-Äquivalent) aus Autofahrten, Haushaltsstrom und Flugreisen.`,
    howToUse: [
      'Geben Sie die wöchentliche Fahrleistung mit dem Pkw in Kilometern ein.',
      'Geben Sie den monatlichen Stromverbrauch in kWh ein.',
      'Geben Sie die jährlichen Flugstunden ein.',
      'Lesen Sie Ihren jährlichen CO₂-Fußabdruck in Tonnen ab.'
    ],
    formula: 'Jährliches CO₂ (kg) = (Wochen-km × 52 × 0,12) + (Monats-kWh × 12 × 0,40) + (Flugstunden × 90)',
    formulaVariables: [
      { name: 'Fahrleistung', description: 'Kilometer pro Woche.', unit: 'km / Woche', optional: false },
      { name: 'Stromverbrauch', description: 'Monatlicher Strombezug.', unit: 'kWh / Monat', optional: false },
      { name: 'Flugstunden', description: 'Jährliche Flugzeit.', unit: 'Stunden / Jahr', optional: false }
    ],
    workedExample: {
      scenario: '200 km Pkw pro Woche, 300 kWh Strom monatlich und 10 Flugstunden pro Jahr.',
      stepByStep: [
        'Pkw-Emissionen: 200 × 52 × 0,12 = 1.248 kg CO₂.',
        'Strom-Emissionen: 300 × 12 × 0,40 = 1.440 kg CO₂.',
        'Flug-Emissionen: 10 × 90 = 900 kg CO₂.',
        'Gesamt-CO₂-Fußabdruck: 1.248 + 1.440 + 900 = 3.588 kg (3,59 Tonnen).'
      ],
      result: 'Jährlicher CO₂-Fußabdruck: 3.588 kg CO₂e (3,59 Tonnen / Jahr)'
    },
    interpretation: 'Macht die Hauptverursacher persönlicher Emissionen sichtbar und unterstützt bei der nachhaltigen Lebensplanung.',
    assumptions: 'Durchschnittliche Emissionsfaktoren für Strom- und Pkw-Nutzung.',
    limitations: 'Ernährungsgewohnheiten und Konsumgüterkäufe sind nicht in diesem Rechner enthalten.',
    faqs: [
      { question: 'Wie hoch ist der durchschnittliche CO₂-Fußabdruck in Deutschland?', answer: 'In Deutschland liegt der Pro-Kopf-Ausstoß bei durchschnittlich etwa 10 bis 11 Tonnen CO₂ pro Jahr.' }
    ],
    relatedTools
  })
});

// 9. AUTO & CAR LOAN CALCULATOR (auto-loan)
export const AUTO_LOAN_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates monthly car loan payments, total interest costs, and amortization schedules based on vehicle purchase price, down payment, trade-in value, interest rate, and financing loan term.`,
    howToUse: [
      'Enter total vehicle purchase price.',
      'Enter upfront cash down payment and trade-in value allowance.',
      'Enter annual loan interest rate (APR).',
      'Select financing loan term in months (e.g., 36, 48, 60, or 72 months).',
      'Review monthly auto payment and total financing interest charges.'
    ],
    formula: 'Monthly Payment (M) = P × [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ] where P = Price - Down Payment - Trade-in',
    formulaVariables: [
      { name: 'Financed Principal (P)', description: 'Net auto loan borrowing amount.', unit: 'Currency', optional: false },
      { name: 'Monthly Interest (r)', description: 'Annual interest rate divided by 12.', unit: 'Decimal / month', optional: false },
      { name: 'Loan Term (n)', description: 'Total financing duration.', unit: 'Months', optional: false }
    ],
    workedExample: {
      scenario: 'Financing a $25,000 car with a $5,000 down payment at 6.0% APR over 60 months (5 years).',
      stepByStep: [
        'Net financed principal: $25,000 - $5,000 = $20,000.00.',
        'Monthly interest rate: 6.0% / 12 = 0.5% (0.005).',
        'Calculate monthly payment: 20000 × [0.005(1.005)⁶⁰] / [(1.005)⁶⁰ - 1] = $386.66 per month.',
        'Total payments over 60 months: $386.66 × 60 = $23,199.60.',
        'Total loan interest paid: $23,199.60 - $20,000.00 = $3,199.60.'
      ],
      result: 'Monthly Payment: $386.66 | Total Interest: $3,199.60 | Total Cost: $28,199.60'
    },
    interpretation: 'Assists car buyers in evaluating affordable monthly payments and understanding how loan terms affect total vehicle financing costs.',
    assumptions: 'Fixed interest rate with fixed monthly principal and interest amortization.',
    limitations: 'Does not include local sales taxes, vehicle title/registration fees, or dealer documentation charges unless added into purchase price.',
    faqs: [
      { question: 'Why does a longer auto loan term cost more?', answer: 'While longer loan terms (e.g., 72 or 84 months) lower your monthly payment, interest accrues over a longer period, significantly increasing total loan interest paid.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب القسط الشهري لقرض تمويل وشراء السيارات، وإجمالي الفوائد المترتبة، وجدول السداد بناءً على سعر السيارة، والدفعة المقدمة، وقيمة الاستبدال، ومعدل الفائدة، وفترة التمويل.`,
    howToUse: [
      'أدخل السعر الإجمالي لشراء السيارة.',
      'أدخل الدفعة المقدمة وقيمة السيارة المستبدلة إن وجدت.',
      'أدخل معدل الفائدة السنوي للقرض (APR).',
      'حدد مدة سداد القرض بالأشهر (مثل 36 أو 48 أو 60 شهراً).',
      'اطلع على القسط الشهري وإجمالي الفوائد المدفوعة.'
    ],
    formula: 'القسط الشهري = المبلغ الممول × [ ر(1 + ر)ⁿ ] ÷ [ (1 + ر)ⁿ - 1 ]',
    formulaVariables: [
      { name: 'المبلغ الممول', description: 'صافي قيمة القرض بعد خصم الدفعة المقدمة.', unit: 'عملة', optional: false },
      { name: 'الفائدة الشهرية', description: 'معدل الفائدة السنوي مقسوماً على 12.', unit: 'كسر عشري', optional: false },
      { name: 'مدة القرض', description: 'عدد أشهر السداد.', unit: 'شهر', optional: false }
    ],
    workedExample: {
      scenario: 'شراء سيارة بقيمة 25,000 دولار مع دفعة أولى 5,000 دولار وفائدة 6.0% على 60 شهراً.',
      stepByStep: [
        'المبلغ الممول: 25,000 - 5,000 = 20,000 دولار.',
        'الفائدة الشهرية: 6.0% ÷ 12 = 0.5% (0.005).',
        'حساب القسط الشهري: 20000 × [0.005(1.005)⁶⁰] ÷ [(1.005)⁶⁰ - 1] = 386.66 دولار/شهر.',
        'إجمالي المدفوعات: 386.66 × 60 = 23,199.60 دولار.',
        'إجمالي الفائدة: 23,199.60 - 20,000 = 3,199.60 دولار.'
      ],
      result: 'القسط الشهري: 386.66 دولار | إجمالي الفوائد: 3,199.60 دولار'
    },
    interpretation: 'تساعد مشتري السيارات على تحديد القسط الشهري المناسب لميزانيتهم وحساب التكلفة الحقيقية للتمويل.',
    assumptions: 'قرض ذو فائدة ثابتة وأقساط شهرية متساوية.',
    limitations: 'لا تتضمن رسوم التسجيل والتأمين والضرائب ما لم يتم إضافتها لسعر الشراء.',
    faqs: [
      { question: 'هل تزيد فترات التمويل الطويلة من تكلفة السيارة؟', answer: 'نعم، على الرغم من أن الأقساط الشهرية تنخفض مع زيادة المدة، إلا أن إجمالي الفوائد المدفوعة للبنك يرتفع بشكل ملحوظ.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la cuota mensual para la financiación y compra de vehículos, los intereses totales y el cuadro de amortización según el precio, entrada inicial, tipo de interés y plazo.`,
    howToUse: [
      'Introduzca el precio total del vehículo.',
      'Introduzca la entrada en efectivo y valor del coche entregado.',
      'Introduzca el tipo de interés anual (TIN / TAE).',
      'Seleccione el plazo de financiación en meses (ej. 36, 48 o 60 meses).',
      'Consulte la cuota mensual y el coste total de intereses.'
    ],
    formula: 'Cuota mensual = Capital financiado × [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]',
    formulaVariables: [
      { name: 'Capital financiado', description: 'Precio menos entrada inicial.', unit: 'Moneda', optional: false },
      { name: 'Tipo mensual (r)', description: 'Interés anual dividido por 12.', unit: 'Decimal', optional: false },
      { name: 'Plazo (n)', description: 'Número total de meses.', unit: 'Meses', optional: false }
    ],
    workedExample: {
      scenario: 'Financiación de un coche de 25.000 € con 5.000 € de entrada al 6,0% anual a 60 meses.',
      stepByStep: [
        'Capital neto financiado: 25.000 € - 5.000 € = 20.000 €.',
        'Interés mensual: 6,0% / 12 = 0,5% (0,005).',
        'Cuota mensual: 20000 × [0,005(1,005)⁶⁰] / [(1,005)⁶⁰ - 1] = 386,66 €/mes.',
        'Total abonado: 386,66 € × 60 = 23.199,60 €.',
        'Intereses totales: 23.199,60 € - 20.000 € = 3.199,60 €.'
      ],
      result: 'Cuota mensual: 386,66 € | Intereses totales: 3.199,60 € | Coste total: 28.199,60 €'
    },
    interpretation: 'Permite comparar ofertas de financiación bancaria y concesionarios con total transparencia.',
    assumptions: 'Tipo de interés fijo con amortización mensual francesa.',
    limitations: 'Gastos de matriculación y seguro del coche no incluidos.',
    faqs: [
      { question: '¿Por qué encarece el préstamo elegir un plazo más largo?', answer: 'Aunque reduce la cuota mensual, se pagan intereses durante más tiempo, incrementando el coste total financiado.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule les mensualités d'un crédit auto, le montant total des intérêts et le tableau d'amortissement selon le prix du véhicule, l'apport personnel, le taux et la durée du prêt.`,
    howToUse: [
      'Indiquez le prix d\'achat du véhicule.',
      'Indiquez votre apport personnel ou reprise de l\'ancien véhicule.',
      'Indiquez le taux d\'intérêt annuel (TAEG).',
      'Sélectionnez la durée de remboursement en mois (ex. 36, 48 ou 60 mois).',
      'Consultez la mensualité et le coût global du crédit.'
    ],
    formula: 'Mensualité = Capital emprunté × [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]',
    formulaVariables: [
      { name: 'Capital emprunté', description: 'Prix net après déduction de l\'apport.', unit: 'Devise', optional: false },
      { name: 'Taux mensuel (r)', description: 'Taux annuel divisé par 12.', unit: 'Décimal', optional: false },
      { name: 'Durée (n)', description: 'Nombre de mensualités.', unit: 'Mois', optional: false }
    ],
    workedExample: {
      scenario: 'Crédit auto de 20 000 € (véhicule à 25 000 € avec 5 000 € d\'apport) à 6,0% sur 60 mois.',
      stepByStep: [
        'Capital emprunté : 25 000 € - 5 000 € = 20 000 €.',
        'Taux mensuel : 6,0% / 12 = 0,5% (0,005).',
        'Mensualité : 20000 × [0,005(1,005)⁶⁰] / [(1,005)⁶⁰ - 1] = 386,66 € par mois.',
        'Total remboursé : 386,66 € × 60 = 23 199,60 €.',
        'Coût total des intérêts : 23 199,60 € - 20 000 € = 3 199,60 €.'
      ],
      result: 'Mensualité : 386,66 € | Intérêts totaux : 3 199,60 € | Coût total : 28 199,60 €'
    },
    interpretation: 'Aide à maîtriser son budget automobile et à négocier les conditions de prêt avec les organismes financiers.',
    assumptions: 'Taux fixe avec amortissement classique constant.',
    limitations: 'Les frais de carte grise et d\'assurance emprunteur facultative ne sont pas inclus.',
    faqs: [
      { question: 'Est-il préférable d\'emprunter sur une durée plus courte ?', answer: 'Oui, une durée plus courte augmente légèrement la mensualité mais réduit considérablement le montant total des intérêts payés.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die monatliche Kreditrate für Autokredite, die Gesamtzinsen und den Tilgungsverlauf auf Basis von Kaufpreis, Anzahlung, Zinssatz und Kreditlaufzeit.`,
    howToUse: [
      'Geben Sie den Fahrzeugkaufpreis ein.',
      'Geben Sie Anzahlung und Inzahlungnahmewert ein.',
      'Geben Sie den effektiven Jahreszins ein.',
      'Wählen Sie die Laufzeit in Monaten (z. B. 36, 48, 60 Monate).',
      'Lesen Sie die monatliche Rate und die Gesamtkreditkosten ab.'
    ],
    formula: 'Monatsrate = Nettodarlehensbetrag × [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]',
    formulaVariables: [
      { name: 'Nettodarlehen', description: 'Kaufpreis abzüglich Anzahlung.', unit: 'Währung', optional: false },
      { name: 'Monatszins (r)', description: 'Jahreszins geteilt durch 12.', unit: 'Dezimal', optional: false },
      { name: 'Laufzeit (n)', description: 'Gesamtzahl der Monatsraten.', unit: 'Monate', optional: false }
    ],
    workedExample: {
      scenario: 'Autokauf über 25.000 € mit 5.000 € Anzahlung bei 6,0% Jahreszins über 60 Monate.',
      stepByStep: [
        'Finanzierter Nettobetrag: 25.000 € - 5.000 € = 20.000 €.',
        'Monatlicher Zinssatz: 6,0% / 12 = 0,5% (0,005).',
        'Monatsrate: 20000 × [0,005(1,005)⁶⁰] / [(1,005)⁶⁰ - 1] = 386,66 €/Monat.',
        'Gesamtzahlung über 60 Monate: 386,66 € × 60 = 23.199,60 €.',
        'Gesamte Zinskosten: 23.199,60 € - 20.000 € = 3.199,60 €.'
      ],
      result: 'Monatliche Rate: 386,66 € | Gesamtzinsen: 3.199,60 € | Gesamtkosten: 28.199,60 €'
    },
    interpretation: 'Verschafft Transparenz über die tatsächlichen Finanzierungskosten beim Neu- und Gebrauchtwagenkauf.',
    assumptions: 'Fester Sollzinssatz und gleichbleibende monatliche Annuitätenrate.',
    limitations: 'Fahrzeugzulassung, Kfz-Steuer und Versicherung sind nicht enthalten.',
    faqs: [
      { question: 'Warum führt eine längere Laufzeit zu höheren Gesamtkosten?', answer: 'Weil die Restschuld über einen längeren Zeitraum verzinst wird, wodurch die Summe der bezahlten Zinsen steigt.' }
    ],
    relatedTools
  })
});

// 10. RANDOM NUMBER & DICE GENERATOR (random-number)
export const RANDOM_NUMBER_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} generates unbiased, cryptographically strong random integers within a defined minimum and maximum numerical range.`,
    howToUse: [
      'Enter the minimum boundary value (e.g., 1).',
      'Enter the maximum boundary value (e.g., 100).',
      'Specify the number of random values to generate.',
      'Click Generate to produce fair, non-deterministic random integers.'
    ],
    formula: 'Random Integer = ⌊Random() × (Max - Min + 1)⌋ + Min',
    formulaVariables: [
      { name: 'Min Value', description: 'Inclusive lower numerical bound.', unit: 'Integer', optional: false },
      { name: 'Max Value', description: 'Inclusive upper numerical bound.', unit: 'Integer', optional: false },
      { name: 'Quantity', description: 'Count of random numbers to draw.', unit: 'Count', optional: false }
    ],
    workedExample: {
      scenario: 'Drawing a random integer between 1 and 6 (simulating a standard 6-sided die roll).',
      stepByStep: [
        'Define range: Min = 1, Max = 6 (Span = 6 - 1 + 1 = 6 possible outcomes).',
        'Generate uniform pseudo-random decimal in [0, 1).',
        'Scale and floor to integer: ⌊0.724 × 6⌋ + 1 = 4 + 1 = 5.'
      ],
      result: 'Generated Random Result: 5 (Simulated Die Roll)'
    },
    interpretation: 'Ideal for raffle drawings, board games, statistical sampling, and fair contest winner selection.',
    assumptions: 'Uniform probability distribution across all integer outcomes.',
    limitations: 'Minimum must be strictly less than or equal to the maximum boundary value.',
    faqs: [
      { question: 'Are all numbers equally likely to be picked?', answer: 'Yes, the generator uses a uniform probability distribution where every discrete integer has an identical mathematical chance of being drawn.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتوليد أرقام عشوائية غير منحازة وعالية الدقة ضمن نطاق رقمي محدد بين قيمة دنيا وقيمة قصوى.`,
    howToUse: [
      'أدخل الحد الأدنى للنطاق (مثل 1).',
      'أدخل الحد الأقصى للنطاق (مثل 100).',
      'حدد عدد الأرقام العشوائية المطلوب توليدها.',
      'اضغط على توليد للحصول على الأرقام العشوائية.'
    ],
    formula: 'الرقم العشوائي = [ عشوائي() × (الحد الأقصى - الحد الأدنى + 1) ] + الحد الأدنى',
    formulaVariables: [
      { name: 'الحد الأدنى', description: 'أصغر رقم مسموح به.', unit: 'عدد صحيح', optional: false },
      { name: 'الحد الأقصى', description: 'أكبر رقم مسموح به.', unit: 'عدد صحيح', optional: false },
      { name: 'الكمية', description: 'عدد الأرقام المطلوب استخراجها.', unit: 'عدد', optional: false }
    ],
    workedExample: {
      scenario: 'توليد رقم عشوائي بين 1 و 6 (محاكاة رمي حجر النرد).',
      stepByStep: [
        'تحديد النطاق: الحد الأدنى = 1، الحد الأقصى = 6 (6 احتمالات متساوية).',
        'توليد كسر عشوائي متجانس في النطاق [0، 1).',
        'تحويل الكسر إلى عدد صحيح ضمن النطاق: الناتج = 5.'
      ],
      result: 'الرقم العشوائي المولد: 5 (محاكاة حجر النرد)'
    },
    interpretation: 'مثالية لإجراء القرعة، والسحوبات والمسابقات، والألعاب اللوحية، وأخذ العينات الإحصائية العادلة.',
    assumptions: 'توزيع احتمالي متساوي وعادل لجميع الأرقام.',
    limitations: 'يجب أن يكون الحد الأدنى أصغر من الحد الأقصى أو مساوياً له.',
    faqs: [
      { question: 'هل فرصة ظهور كل رقم متساوية؟', answer: 'نعم، تعتمد الأداة على التوزيع الاحتمالي المتساوي الذي يمنح كل رقم نفس فرصة الظهور الرياضية بالضبط.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} genera números enteros aleatorios imparciales dentro de un rango numérico configurable entre un mínimo y un máximo.`,
    howToUse: [
      'Introduzca el valor límite mínimo (ej. 1).',
      'Introduzca el valor límite máximo (ej. 100).',
      'Indique cuántos números aleatorios desea generar.',
      'Haga clic en Generar para obtener resultados equiprobables.'
    ],
    formula: 'Entero aleatorio = ⌊Random() × (Máx - Mín + 1)⌋ + Mín',
    formulaVariables: [
      { name: 'Valor mínimo', description: 'Límite inferior inclusivo.', unit: 'Entero', optional: false },
      { name: 'Valor máximo', description: 'Límite superior inclusivo.', unit: 'Entero', optional: false },
      { name: 'Cantidad', description: 'Número de valores a extraer.', unit: 'Entero', optional: false }
    ],
    workedExample: {
      scenario: 'Generación de un número aleatorio entre 1 y 6 (simulación de dado).',
      stepByStep: [
        'Rango: Mín = 1, Máx = 6 (6 resultados posibles).',
        'Generación de valor uniforme.',
        'Escalado a entero: Resultado = 5.'
      ],
      result: 'Número aleatorio generado: 5'
    },
    interpretation: 'Útil para sorteos, rifas, juegos de mesa, muestreos estadísticos y asignaciones justas.',
    assumptions: 'Distribución de probabilidad uniforme.',
    limitations: 'El mínimo debe ser menor o igual que el máximo.',
    faqs: [
      { question: '¿Tienen todos los números la misma probabilidad de salir?', answer: 'Sí, el algoritmo garantiza una distribución uniforme donde cada número tiene idéntica probabilidad matemática.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} génère des nombres entiers aléatoires équitables et non biaisés dans une plage personnalisée entre une valeur minimale et maximale.`,
    howToUse: [
      'Indiquez la valeur minimale de l\'intervalle (ex. 1).',
      'Indiquez la valeur maximale de l\'intervalle (ex. 100).',
      'Précisez le nombre de tirages souhaité.',
      'Cliquez sur Générer pour obtenir vos nombres aléatoires.'
    ],
    formula: 'Entier aléatoire = ⌊Random() × (Max - Min + 1)⌋ + Min',
    formulaVariables: [
      { name: 'Valeur minimale', description: 'Borne inférieure.', unit: 'Entier', optional: false },
      { name: 'Valeur maximale', description: 'Borne supérieure.', unit: 'Entier', optional: false },
      { name: 'Nombre de tirages', description: 'Quantité de nombres.', unit: 'Nombre', optional: false }
    ],
    workedExample: {
      scenario: 'Tirage d\'un nombre entre 1 et 6 (lancer de dé standard).',
      stepByStep: [
        'Intervalle : de 1 à 6 (6 issues possibles).',
        'Génération aléatoire uniforme.',
        'Calcul du résultat entier : 5.'
      ],
      result: 'Nombre aléatoire obtenu : 5'
    },
    interpretation: 'Parfait pour les tirages au sort, les tombolas, les jeux de société et l\'échantillonnage statistique.',
    assumptions: 'Distribution uniforme équiprobable.',
    limitations: 'La valeur minimale doit être inférieure ou égale au maximum.',
    faqs: [
      { question: 'Le tirage est-il réellement équitable ?', answer: 'Oui, chaque entier possède strictement la même probabilité d\'apparition.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} erzeugt echte, gleichverteilte ganzzahlige Zufallszahlen innerhalb eines frei wählbaren Bereichs zwischen Minimum und Maximum.`,
    howToUse: [
      'Geben Sie den Minimalwert des Zahlenbereichs ein (z. B. 1).',
      'Geben Sie den Maximalwert des Zahlenbereichs ein (z. B. 100).',
      'Legen Sie fest, wie viele Zufallszahlen generiert werden sollen.',
      'Klicken Sie auf Generieren, um faire Zufallsergebnisse zu erhalten.'
    ],
    formula: 'Zufallszahl = ⌊Random() × (Max - Min + 1)⌋ + Min',
    formulaVariables: [
      { name: 'Minimum', description: 'Untere Grenze des Zahlenbereichs.', unit: 'Ganzzahl', optional: false },
      { name: 'Maximum', description: 'Obere Grenze des Zahlenbereichs.', unit: 'Ganzzahl', optional: false },
      { name: 'Anzahl', description: 'Menge der zu ziehenden Zahlen.', unit: 'Anzahl', optional: false }
    ],
    workedExample: {
      scenario: 'Ziehung einer Zufallszahl zwischen 1 und 6 (Simulation eines Würfelwurfs).',
      stepByStep: [
        'Bereich definieren: Min = 1, Max = 6 (6 gleichwahrscheinliche Ergebnisse).',
        'Gleichverteilten Pseudozufallswert generieren.',
        'Auf Ganzzahl skalieren: Ergebnis = 5.'
      ],
      result: 'Generierte Zufallszahl: 5 (Würfelergebnis)'
    },
    interpretation: 'Ideal für Verlosungen, Gewinnspiele, Gesellschaftsspiele und statistische Stichproben.',
    assumptions: 'Gleichmäßige Wahrscheinlichkeitsverteilung über alle möglichen Werte.',
    limitations: 'Das Minimum muss kleiner oder gleich dem Maximum sein.',
    faqs: [
      { question: 'Hat jede Zahl dieselbe Gewinnchance?', answer: 'Ja, der Zufallszahlengenerator gewährleistet mathematisch identische Wahrscheinlichkeiten für jede Zahl.' }
    ],
    relatedTools
  })
});

// Map of Batch 2 Dedicated tools
export const BATCH2_DEDICATED_HANDLERS: Record<string, Record<Language, KnowledgeHandler>> = {
  'currency': CURRENCY_KNOWLEDGE,
  'scientific': SCIENTIFIC_KNOWLEDGE,
  'word-count': WORD_COUNT_KNOWLEDGE,
  'password': PASSWORD_KNOWLEDGE,
  'time-zone': TIME_ZONE_KNOWLEDGE,
  'fuel-cost': FUEL_COST_KNOWLEDGE,
  'aspect-ratio': ASPECT_RATIO_KNOWLEDGE,
  'carbon-footprint': CARBON_FOOTPRINT_KNOWLEDGE,
  'auto-loan': AUTO_LOAN_KNOWLEDGE,
  'random-number': RANDOM_NUMBER_KNOWLEDGE,
};
