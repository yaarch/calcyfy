import { ToolDef, Language } from '../../types';
import { ToolContentDetails } from './types';

type KnowledgeHandler = (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails;

function createKnowledge(dataByLang: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails>): Record<Language, KnowledgeHandler> {
  return dataByLang;
}

// 1. FRACTION CALCULATOR (fraction)
export const FRACTION_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} performs exact rational fraction addition, finding common denominators and producing reduced fractions alongside their decimal equivalents.`,
    howToUse: [
      'Enter the numerator and denominator for Fraction 1.',
      'Enter the numerator and denominator for Fraction 2.',
      'Review the combined sum as an improper fraction and its exact decimal equivalent.'
    ],
    formula: '(a/b) + (c/d) = (a·d + b·c) / (b·d) | Decimal = Sum_Numerator / Sum_Denominator',
    formulaVariables: [
      { name: 'Numerator 1 (a)', description: 'Top number of the first fraction.', unit: 'Integer', optional: false },
      { name: 'Denominator 1 (b)', description: 'Bottom number of first fraction (cannot be 0).', unit: 'Non-zero Integer', optional: false },
      { name: 'Numerator 2 (c)', description: 'Top number of the second fraction.', unit: 'Integer', optional: false },
      { name: 'Denominator 2 (d)', description: 'Bottom number of second fraction (cannot be 0).', unit: 'Non-zero Integer', optional: false }
    ],
    workedExample: {
      scenario: 'Adding 3/4 and 1/2.',
      stepByStep: [
        'Numerator calculation: (3 × 2) + (1 × 4) = 6 + 4 = 10.',
        'Common denominator: 4 × 2 = 8.',
        'Resulting fraction: 10/8.',
        'Decimal value: 10 / 8 = 1.25.'
      ],
      result: 'Fraction Result: 10/8 | Decimal Value: 1.25'
    },
    interpretation: 'Fraction arithmetic provides precision in baking, woodworking, and engineering where rounding decimals introduces cumulative tolerance errors.',
    assumptions: 'Denominators must be non-zero.',
    limitations: 'Limited to two-fraction arithmetic.',
    faqs: [
      { question: 'Why can denominators never be zero?', answer: 'Division by zero is mathematically undefined because no finite number multiplied by 0 can equal a non-zero value.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بجمع الكسور الاعتيادية بدقة وإيجاد المقام المشترك وتوفير النتيجة ككسر اعتيادي وقيمة عشرية متطابقة.`,
    howToUse: [
      'أدخل بسط ومقام الكسر الأول.',
      'أدخل بسط ومقام الكسر الثاني.',
      'راجع ناتج الجمع في صورة كسرية وقيمته العشرية الدقيقة.'
    ],
    formula: '(أ/ب) + (ج/د) = (أ×د + ب×ج) / (ب×د) | القيمة العشرية = البسط الناتج / المقام الناتج',
    formulaVariables: [
      { name: 'بسط الكسر الأول', description: 'العدد العلوي للكسر الأول.', unit: 'عدد صحيح', optional: false },
      { name: 'مقام الكسر الأول', description: 'العدد السفلي (لا يمكن أن يساوي صفراً).', unit: 'عدد غير صفري', optional: false },
      { name: 'بسط الكسر الثاني', description: 'العدد العلوي للكسر الثاني.', unit: 'عدد صحيح', optional: false },
      { name: 'مقام الكسر الثاني', description: 'العدد السفلي الثاني.', unit: 'عدد غير صفري', optional: false }
    ],
    workedExample: {
      scenario: 'جمع الكسر 3/4 مع الكسر 1/2.',
      stepByStep: [
        'حساب البسط: (3 × 2) + (1 × 4) = 6 + 4 = 10.',
        'حساب المقام المشترك: 4 × 2 = 8.',
        'الكسر الناتج: 10/8.',
        'القيمة العشرية: 10 ÷ 8 = 1.25.'
      ],
      result: 'ناتج الكسر: 10/8 | القيمة العشرية: 1.25'
    },
    interpretation: 'يمنع استخدام الكسور الاعتيادية أخطاء التقريب التراكمية الشائعة في القياسات الهندسية وأعمال النجارة.',
    assumptions: 'يجب ألا تساوي المقامات صفراً.',
    limitations: 'تقتصر هذه الواجهة على عملية الجمع بين كسرين اثنين.',
    faqs: [
      { question: 'لماذا لا يجوز القسمة على الصفر؟', answer: 'لأن القسمة على صفر غير معرفة رياضياً ولا تعطي قيمة عددية منطقية.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} realiza la suma exacta de fracciones algebraicas buscando el denominador común y calculando su equivalencia decimal.`,
    howToUse: [
      'Introduzca el numerador y denominador de la Fracción 1.',
      'Introduzca el numerador y denominador de la Fracción 2.',
      'Consulte la fracción resultante y su valor en formato decimal.'
    ],
    formula: '(a/b) + (c/d) = (a·d + b·c) / (b·d) | Decimal = Numerador / Denominador',
    formulaVariables: [
      { name: 'Numerador 1', description: 'Término superior de la primera fracción.', unit: 'Entero', optional: false },
      { name: 'Denominador 1', description: 'Término inferior (distinto de cero).', unit: 'Entero ≠ 0', optional: false },
      { name: 'Numerador 2', description: 'Término superior de la segunda fracción.', unit: 'Entero', optional: false },
      { name: 'Denominador 2', description: 'Término inferior segundo.', unit: 'Entero ≠ 0', optional: false }
    ],
    workedExample: {
      scenario: 'Suma de las fracciones 3/4 y 1/2.',
      stepByStep: [
        'Cálculo del numerador: (3 × 2) + (1 × 4) = 6 + 4 = 10.',
        'Denominador común: 4 × 2 = 8.',
        'Fracción resultante: 10/8.',
        'Conversión a decimal: 10 / 8 = 1,25.'
      ],
      result: 'Resultado fraccionario: 10/8 | Valor decimal: 1,25'
    },
    interpretation: 'El cálculo con fracciones garantiza la máxima exactitud en mediciones donde los decimales redondearían cifras críticas.',
    assumptions: 'Los denominadores deben ser siempre distintos de cero.',
    limitations: 'Suma binaria de dos fracciones.',
    faqs: [
      { question: '¿Por qué no se pueden dividir números por cero?', answer: 'Porque la división por cero no tiene solución definida dentro del conjunto de los números reales.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} effectue l'addition rigoureuse de fractions ordinaires en établissant un dénominateur commun et affiche l'équivalent décimal précis.`,
    howToUse: [
      'Renseignez le numérateur et le dénominateur de la première fraction.',
      'Renseignez le numérateur et le dénominateur de la seconde fraction.',
      'Consultez la fraction résultante et sa valeur décimale exacte.'
    ],
    formula: '(a/b) + (c/d) = (a·d + b·c) / (b·d) | Décimal = Numérateur / Dénominateur',
    formulaVariables: [
      { name: 'Numérateur 1', description: 'Terme supérieur de la fraction 1.', unit: 'Entier', optional: false },
      { name: 'Dénominateur 1', description: 'Terme inférieur non nul.', unit: 'Entier ≠ 0', optional: false },
      { name: 'Numérateur 2', description: 'Terme supérieur de la fraction 2.', unit: 'Entier', optional: false },
      { name: 'Dénominateur 2', description: 'Terme inférieur non nul.', unit: 'Entier ≠ 0', optional: false }
    ],
    workedExample: {
      scenario: 'Addition de 3/4 et 1/2.',
      stepByStep: [
        'Calcul du numérateur : (3 × 2) + (1 × 4) = 6 + 4 = 10.',
        'Dénominateur commun : 4 × 2 = 8.',
        'Fraction obtenue : 10/8.',
        'Valeur décimale : 10 / 8 = 1,25.'
      ],
      result: 'Fraction résultante : 10/8 | Valeur décimale : 1,25'
    },
    interpretation: 'Le calcul fractionnaire évite les erreurs de troncature décimale dans les métiers d\'ingénierie et d\'artisanat.',
    assumptions: 'Les dénominateurs ne doivent pas être nuls.',
    limitations: 'Calcul direct portant sur deux fractions.',
    faqs: [
      { question: 'Pourquoi le dénominateur ne peut-il pas être zéro ?', answer: 'La division par zéro est une opération indéfinie en arithmétique.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} addiert Brüche unter Bestimmung des gemeinsamen Nenners und gibt das Ergebnis sowohl als Bruch als auch als Dezimalzahl aus.`,
    howToUse: [
      'Geben Sie Zähler und Nenner des ersten Bruchs ein.',
      'Geben Sie Zähler und Nenner des zweiten Bruchs ein.',
      'Lesen Sie den Summenbruch und den Dezimalwert ab.'
    ],
    formula: '(a/b) + (c/d) = (a·d + b·c) / (b·d) | Dezimalwert = Zähler / Nenner',
    formulaVariables: [
      { name: 'Zähler 1', description: 'Oberer Wert des ersten Bruchs.', unit: 'Ganzzahl', optional: false },
      { name: 'Nenner 1', description: 'Unterer Wert (darf nicht 0 sein).', unit: 'Ganzzahl ≠ 0', optional: false },
      { name: 'Zähler 2', description: 'Oberer Wert des zweiten Bruchs.', unit: 'Ganzzahl', optional: false },
      { name: 'Nenner 2', description: 'Unterer Wert des zweiten Bruchs.', unit: 'Ganzzahl ≠ 0', optional: false }
    ],
    workedExample: {
      scenario: 'Addition von 3/4 und 1/2.',
      stepByStep: [
        'Berechnung des Zählers: (3 × 2) + (1 × 4) = 6 + 4 = 10.',
        'Gemeinsamer Nenner: 4 × 2 = 8.',
        'Ergebnisbruch: 10/8.',
        'Dezimalwert: 10 / 8 = 1,25.'
      ],
      result: 'Bruch: 10/8 | Dezimalzahl: 1,25'
    },
    interpretation: 'Exakte Bruchrechnung verhindert Rundungsfehler bei Zuschnitt- und Mischverhältnissen.',
    assumptions: 'Nenner ungleich null.',
    limitations: 'Berechnet die Summe von zwei Brüchen.',
    faqs: [
      { question: 'Warum ist Division durch null verboten?', answer: 'Da keine Zahl multipliziert mit null ein Ergebnis ungleich null hervorbringen kann.' }
    ],
    relatedTools
  })
});

// 2. RATIO & PROPORTION (ratio)
export const RATIO_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} solves proportional ratios (A : B = C : D) to calculate scaling dimensions, aspect ratios, and mixture proportions.`,
    howToUse: [
      'Enter Ratio antecedent A and consequent B.',
      'Enter target proportional value C.',
      'Review the solved fourth term D satisfying the proportion A : B = C : D.'
    ],
    formula: 'D = (B × C) / A | Cross-multiplication: A × D = B × C',
    formulaVariables: [
      { name: 'Ratio A', description: 'First term of original ratio.', unit: 'Value', optional: false },
      { name: 'Ratio B', description: 'Second term of original ratio.', unit: 'Value', optional: false },
      { name: 'Value C', description: 'Known term of the target ratio.', unit: 'Value', optional: false }
    ],
    workedExample: {
      scenario: 'Determining the height D of a 16:9 widescreen video with width C = 1920 pixels.',
      stepByStep: [
        'Establish ratio: 16 / 9 = 1920 / D.',
        'Cross-multiply: 16 × D = 9 × 1920.',
        'Calculate: 9 × 1920 = 17,280.',
        'Solve for D: 17,280 / 16 = 1,080 pixels.'
      ],
      result: 'Solved Proportion D: 1080 (Matches standard 1920×1080 Full HD resolution)'
    },
    interpretation: 'Fundamental in photography, video production, responsive web scaling, and chemical solution preparation.',
    assumptions: 'Value A must be greater than zero.',
    limitations: 'Solves direct linear proportions.',
    faqs: [
      { question: 'What is a common aspect ratio?', answer: '16:9 is the universal standard for modern displays, monitors, and high-definition video.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحل التناسب الرياضي (أ : ب = ج : د) لحساب أبعاد الشاشات ونسب الخلط والتكبير والتصغير الهندسي.`,
    howToUse: [
      'أدخل حدي النسبة الأصلية (أ و ب).',
      'أدخل القيمة المستهدفة المعروفة (ج).',
      'راجع القيمة الرابعة الناتجة (د) التي تحقق التناسب التام.'
    ],
    formula: 'د = (ب × ج) / أ | الضرب التبادلي: أ × د = ب × ج',
    formulaVariables: [
      { name: 'النسبة أ', description: 'الحد الأول في النسبة الأصلية.', unit: 'قيمة', optional: false },
      { name: 'النسبة ب', description: 'الحد الثاني في النسبة الأصلية.', unit: 'قيمة', optional: false },
      { name: 'القيمة ج', description: 'الحد المعروف في النسبة الجديدة.', unit: 'قيمة', optional: false }
    ],
    workedExample: {
      scenario: 'حساب ارتفاع شاشة (د) بنسبة عرض 16:9 عندما يكون العرض (ج) 1920 بكسل.',
      stepByStep: [
        'صيغة التناسب: 16 / 9 = 1920 / د.',
        'الضرب التبادلي: 16 × د = 9 × 1920.',
        'الناتج: 9 × 1920 = 17,280.',
        'إيجاد د: 17,280 ÷ 16 = 1,080 بكسل.'
      ],
      result: 'القيمة المحسوبة (د): 1080 (أبعاد Full HD القياسية: 1920×1080)'
    },
    interpretation: 'أداة حيوية لمصممي الجرافيك والمطورين لضبط أبعاد الفيديو والصور دون تشويه نسب العرض إلى الارتفاع.',
    assumptions: 'يجب أن تكون القيمة أ أكبر من صفر.',
    limitations: 'تحسب التناسب الطردي الخطي المباشر.',
    faqs: [
      { question: 'ما هي أشهر نسبة أبعاد في الشاشات؟', answer: 'نسبة 16:9 هي المعيار العالمي لشاشات التلفاز والهواتف والحواسيب عالية الدقة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} resuelve proporciones matemáticas directas (A : B = C : D) para calcular relaciones de aspecto, escalas y mezclas homogéneas.`,
    howToUse: [
      'Introduzca los valores de la proporción original A y B.',
      'Introduzca el valor de escala conocido C.',
      'Consulte el cuarto término D que equilibra la igualdad proporcional.'
    ],
    formula: 'D = (B × C) / A | Regla de tres: A · D = B · C',
    formulaVariables: [
      { name: 'Proporción A', description: 'Primer término de la razón base.', unit: 'Valor', optional: false },
      { name: 'Proporción B', description: 'Segundo término de la razón base.', unit: 'Valor', optional: false },
      { name: 'Valor C', description: 'Magnitud conocida a escalar.', unit: 'Valor', optional: false }
    ],
    workedExample: {
      scenario: 'Calcular la altura D de una pantalla 16:9 con ancho C = 1920 píxeles.',
      stepByStep: [
        'Planteamiento: 16 / 9 = 1920 / D.',
        'Multiplicación cruzada: 16 × D = 9 × 1920.',
        'Producto: 9 × 1920 = 17.280.',
        'Despeje de D: 17.280 / 16 = 1.080 píxeles.'
      ],
      result: 'Valor resuelto D: 1080 (Resolución Full HD estándar 1920×1080)'
    },
    interpretation: 'Imprescindible en edición audiovisual y diseño web responsivo para redimensionar imágenes sin deformación.',
    assumptions: 'El término A debe ser superior a cero.',
    limitations: 'Proporcionalidad matemática lineal.',
    faqs: [
      { question: '¿Qué es la relación de aspecto?', answer: 'Es la proporción entre la anchura y la altura de una pantalla o imagen.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule la quatrième proportionnelle (A : B = C : D) pour dimensionner des formats d'image, des maquettes ou des dosages.`,
    howToUse: [
      'Indiquez les deux termes du ratio de référence (A et B).',
      'Indiquez la dimension connue (C).',
      'Consultez la valeur proportionnelle résultante (D).'
    ],
    formula: 'D = (B × C) / A | Produit en croix : A × D = B × C',
    formulaVariables: [
      { name: 'Terme A', description: 'Premier membre du ratio.', unit: 'Valeur', optional: false },
      { name: 'Terme B', description: 'Second membre du ratio.', unit: 'Valeur', optional: false },
      { name: 'Valeur C', description: 'Valeur connue à mettre à l\'échelle.', unit: 'Valeur', optional: false }
    ],
    workedExample: {
      scenario: 'Calcul de la hauteur D d\'une vidéo au format 16:9 de 1920 pixels de large.',
      stepByStep: [
        'Équation du ratio : 16 / 9 = 1920 / D.',
        'Produit en croix : 16 × D = 9 × 1920.',
        'Calcul : 9 × 1920 = 17 280.',
        'Résolution : 17 280 / 16 = 1 080 pixels.'
      ],
      result: 'Dimension D calculée : 1080 (Format Full HD 1920×1080)'
    },
    interpretation: 'Indispensable en infographie et production vidéo pour préserver l\'intégrité visuelle lors du redimensionnement.',
    assumptions: 'Le terme A doit être strictement supérieur à zéro.',
    limitations: 'Repose sur une relation de proportionnalité directe.',
    faqs: [
      { question: 'Qu\'est-ce que le produit en croix ?', answer: 'Une méthode mathématique permettant de déduire une quatrième grandeur proportionnelle à partir de trois grandeurs connues.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} löst Verhältnisgleichungen (A : B = C : D) und berechnet Seitenverhältnisse, Skalierungen und Mischungsverhältnisse im Dreisatz.`,
    howToUse: [
      'Geben Sie das Basisverhältnis A und B ein.',
      'Geben Sie den Skalierungswert C ein.',
      'Lesen Sie den errechneten Wert D ab.'
    ],
    formula: 'D = (B × C) / A | Kreuzmultiplikation: A × D = B × C',
    formulaVariables: [
      { name: 'Verhältnis A', description: 'Erster Wert des Ausgangsverhältnisses.', unit: 'Wert', optional: false },
      { name: 'Verhältnis B', description: 'Zweiter Wert des Ausgangsverhältnisses.', unit: 'Wert', optional: false },
      { name: 'Zielwert C', description: 'Bekannter Wert für die Neuberechnung.', unit: 'Wert', optional: false }
    ],
    workedExample: {
      scenario: 'Höhe D eines 16:9-Monitors bei einer Breite C von 1920 Pixeln.',
      stepByStep: [
        'Verhältnisansatz: 16 / 9 = 1920 / D.',
        'Überkreuz multiplizieren: 16 × D = 9 × 1920.',
        'Zwischensumme: 17.280.',
        'Auflösung nach D: 17.280 / 16 = 1.080 Pixel.'
      ],
      result: 'Berechneter Wert D: 1080 (Full-HD-Auflösung 1920×1080)'
    },
    interpretation: 'Elementar für Webdesign, Videoproduktion und Fotografie zur verzerrungsfreien Bildskalierung.',
    assumptions: 'Wert A muss größer als null sein.',
    limitations: 'Löst lineare proportionale Zusammenhänge.',
    faqs: [
      { question: 'Was bedeutet das Seitenverhältnis 16:9?', answer: 'Es bedeutet, dass auf 16 Breiteneinheiten exakt 9 Höheneinheiten entfallen.' }
    ],
    relatedTools
  })
});

// 3. PERCENTAGE CHANGE (percentage-change)
export const PERCENTAGE_CHANGE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates the exact relative percentage increase or decrease between an original starting value and a final value.`,
    howToUse: [
      'Enter the original starting baseline value.',
      'Enter the new or final value.',
      'Review the relative percentage difference with signed positive or negative indicators.'
    ],
    formula: 'Percentage Change (%) = [(Final Value - Original Value) / Original Value] × 100',
    formulaVariables: [
      { name: 'Original Value', description: 'Baseline starting amount.', unit: 'Number', optional: false },
      { name: 'Final Value', description: 'Subsequent or current amount.', unit: 'Number', optional: false }
    ],
    workedExample: {
      scenario: 'A product price increasing from $80 to $100.',
      stepByStep: [
        'Absolute difference: 100 - 80 = +20.',
        'Relative fraction: 20 / 80 = 0.25.',
        'Multiply by 100: 0.25 × 100 = +25.00%.'
      ],
      result: 'Percentage Change: +25.00% (An increase of $20 relative to baseline)'
    },
    interpretation: 'Assesses financial growth, quarterly sales trajectories, weight variations, and inflation dynamics relative to the initial baseline.',
    assumptions: 'Original starting baseline cannot be zero.',
    limitations: 'Percentage changes are asymmetric; a 50% loss requires a 100% gain to break even.',
    faqs: [
      { question: 'Why does a 50% decrease require a 100% increase to recover?', answer: 'Because the percentage drop is based on the larger starting amount, while recovery begins from the smaller depleted base.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب نسبة الزيادة أو الانخفاض المئوية بين القيمة الأصلية الابتدائية والقيمة النهائية بدقة متناهية.`,
    howToUse: [
      'أدخل القيمة الأصلية الأساسية.',
      'أدخل القيمة النهائية أو الحالية.',
      'راجع التغير المئوي النسبي مع الإشارة الموجبة أو السالبة.'
    ],
    formula: 'التغير المئوي (%) = [(القيمة النهائية - القيمة الأصلية) / القيمة الأصلية] × 100',
    formulaVariables: [
      { name: 'القيمة الأصلية', description: 'نقطة الانطلاق أو الأساس.', unit: 'رقم', optional: false },
      { name: 'القيمة النهائية', description: 'القيمة الجديدة بعد التغير.', unit: 'رقم', optional: false }
    ],
    workedExample: {
      scenario: 'ارتفاع سعر سلعة من 80 دولار إلى 100 دولار.',
      stepByStep: [
        'الفارق المطلق: 100 - 80 = +20 دولار.',
        'النسبة للأساس: 20 ÷ 80 = 0.25.',
        'الضرب في 100: 0.25 × 100 = +25.00%.'
      ],
      result: 'التغير المئوي: +25.00% زيادة'
    },
    interpretation: 'تفيد في تتبع مؤشرات المبيعات، ومعدلات التضخم، والنمو الاقتصادي ومقارنة الأداء المالي بدقة.',
    assumptions: 'يجب ألا تكون القيمة الأصلية صفراً.',
    limitations: 'النسب غير متناظرة، فالخسارة بنسبة 50% تتطلب ربحاً بنسبة 100% لتعويضها.',
    faqs: [
      { question: 'لماذا تتطلب خسارة 50% ربحاً بنسبة 100% للتعويض؟', answer: 'لأن حساب الخسارة اعتمد على المبلغ الأصلي الأكبر، بينما يتم حساب التعويض بناءً على المبلغ المتبقي الأصغر.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la variación porcentual exacta (incremento o decremento) entre un valor inicial y un valor final.`,
    howToUse: [
      'Introduzca el valor original de referencia.',
      'Introduzca el valor final o actual.',
      'Consulte la variación porcentual relativa con su signo positivo o negativo.'
    ],
    formula: 'Variación (%) = [(Valor Final - Valor Inicial) / Valor Inicial] × 100',
    formulaVariables: [
      { name: 'Valor Inicial', description: 'Cifra de partida.', unit: 'Número', optional: false },
      { name: 'Valor Final', description: 'Cifra de llegada o actual.', unit: 'Número', optional: false }
    ],
    workedExample: {
      scenario: 'Subida de precio de un artículo de 80 € a 100 €.',
      stepByStep: [
        'Diferencia absoluta: 100 - 80 = +20 €.',
        'Fracción relativa: 20 / 80 = 0,25.',
        'Porcentaje: 0,25 × 100 = +25,00 %.'
      ],
      result: 'Variación porcentual: +25,00 % (Incremento de 20 € respecto al original)'
    },
    interpretation: 'Mide la evolución de precios, márgenes de ventas y métricas empresariales.',
    assumptions: 'El valor inicial no puede ser cero.',
    limitations: 'Asimetría en subidas y bajadas porcentuales.',
    faqs: [
      { question: '¿Qué significa un porcentaje negativo?', answer: 'Indica una reducción o descuento respecto al punto de partida original.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} détermine le taux d'évolution en pourcentage (hausse ou baisse) entre une valeur initiale de départ et une valeur finale.`,
    howToUse: [
      'Indiquez la valeur initiale de base.',
      'Indiquez la valeur finale constatée.',
      'Consultez le pourcentage de variation signé (+ ou -).'
    ],
    formula: 'Variation (%) = [(Valeur Finale - Valeur Initiale) / Valeur Initiale] × 100',
    formulaVariables: [
      { name: 'Valeur Initiale', description: 'Point de départ de référence.', unit: 'Nombre', optional: false },
      { name: 'Valeur Finale', description: 'Montant d\'arrivée.', unit: 'Nombre', optional: false }
    ],
    workedExample: {
      scenario: 'Un tarif passant de 80 € à 100 €.',
      stepByStep: [
        'Écart absolu : 100 - 80 = +20 €.',
        'Rapport relatif : 20 / 80 = 0,25.',
        'Multiplication par 100 : 0,25 × 100 = +25,00 %.'
      ],
      result: 'Variation : +25,00 % (Hausse relative de 25 %)'
    },
    interpretation: 'Outil clé d\'analyse financière, d\'évolution du chiffre d\'affaires et de suivi des cours boursiers.',
    assumptions: 'La valeur initiale doit être non nulle.',
    limitations: 'Les pourcentages d\'augmentation et de diminution ne s\'annulent pas directement.',
    faqs: [
      { question: 'Pourquoi une baisse de 20 % suivie d\'une hausse de 20 % ne revient pas au point de départ ?', answer: 'Car la seconde variation s\'applique à une base de calcul diminuée.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die prozentuale Veränderung (Zunahme oder Abnahme) zwischen einem Ausgangs- und einem Endwert.`,
    howToUse: [
      'Geben Sie den ursprünglichen Ausgangswert ein.',
      'Geben Sie den neuen Endwert ein.',
      'Lesen Sie die prozentuale Steigerung oder Minderung mit Vorzeichen ab.'
    ],
    formula: 'Prozentuale Änderung (%) = [(Endwert - Ausgangswert) / Ausgangswert] × 100',
    formulaVariables: [
      { name: 'Ausgangswert', description: 'Basiswert zu Beginn.', unit: 'Zahl', optional: false },
      { name: 'Endwert', description: 'Neuer Vergleichswert.', unit: 'Zahl', optional: false }
    ],
    workedExample: {
      scenario: 'Preisanstieg von 80 € auf 100 €.',
      stepByStep: [
        'Absolute Differenz: 100 - 80 = +20 €.',
        'Relativer Anteil: 20 / 80 = 0,25.',
        'Prozentwert: 0,25 × 100 = +25,00 %.'
      ],
      result: 'Prozentuale Änderung: +25,00 %'
    },
    interpretation: 'Dient der Analyse von Umsatzwachstum, Teuerungsraten und Bestandsveränderungen.',
    assumptions: 'Ausgangswert ungleich null.',
    limitations: 'Prozentrechnungen sind asymmetrisch.',
    faqs: [
      { question: 'Was sagt ein negatives Vorzeichen aus?', answer: 'Ein Minus vor dem Ergebnis signalisiert einen prozentualen Rückgang.' }
    ],
    relatedTools
  })
});

// 4. STANDARD DEVIATION & VARIANCE (standard-deviation)
export const STANDARD_DEVIATION_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} computes the mean, sample standard deviation (s), population standard deviation (σ), and variance for any comma-delimited statistical dataset.`,
    howToUse: [
      'Enter numbers separated by commas or spaces into the dataset field.',
      'Review the calculated sample count (n), arithmetic mean (μ), sample standard deviation (N-1), and population standard deviation (N).'
    ],
    formula: 'Sample SD (s) = √[ Σ(x - x̄)² / (n - 1) ] | Population SD (σ) = √[ Σ(x - μ)² / n ] | Mean (x̄) = Σx / n',
    formulaVariables: [
      { name: 'Dataset', description: 'Numeric values separated by commas or spaces.', unit: 'List of numbers', optional: false }
    ],
    workedExample: {
      scenario: 'Analyzing the statistical dataset: 10, 12, 23, 23, 16, 23, 21, 16.',
      stepByStep: [
        'Sample size (n): 8 values; Sum: 144.',
        'Arithmetic mean (x̄): 144 / 8 = 18.00.',
        'Sum of squared deviations: (10-18)² + (12-18)² + (23-18)² + ... = 64 + 36 + 25 + 25 + 4 + 25 + 9 + 4 = 186.',
        'Sample Variance: 186 / (8 - 1) = 26.5714 -> Sample SD (s): √26.5714 = 5.1547.',
        'Population Variance: 186 / 8 = 23.2500 -> Population SD (σ): √23.2500 = 4.8218.'
      ],
      result: 'Mean: 18.00 | Sample SD (s): 5.15 | Population SD (σ): 4.82 | Sample Variance: 26.57'
    },
    interpretation: 'Measures data dispersion: a low standard deviation indicates values cluster near the mean, while a high standard deviation indicates wide volatility.',
    assumptions: 'Requires at least 2 data points for sample variance calculation.',
    limitations: 'Highly sensitive to extreme outliers.',
    faqs: [
      { question: 'When should I use Sample vs Population SD?', answer: 'Use Sample SD (n-1) when analyzing a sample to infer properties about a larger population; use Population SD (n) when your data contains every individual in the entire population.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب المتوسط الحسابي والانحراف المعياري للعينة (s) والانحراف المعياري للمجتمع (σ) والتباين الإحصائي لأي مجموعة بيانات رقمية.`,
    howToUse: [
      'أدخل الأرقام مفصولة بفواصل أو مسافات في حقل البيانات.',
      'راجع عدد العناصر (n)، والمتوسط الحسابي، والانحراف المعياري للعينة (N-1)، وانحراف المجتمع (N).'
    ],
    formula: 'انحراف العينة (s) = جذر[ مجموع(س - س̄)² / (ن - 1) ] | انحراف المجتمع (σ) = جذر[ مجموع(س - م)² / ن ]',
    formulaVariables: [
      { name: 'مجموعة البيانات', description: 'أرقام مفصولة بفواصل.', unit: 'سلسلة أرقام', optional: false }
    ],
    workedExample: {
      scenario: 'تحليل مجموعة البيانات التالية: 10، 12، 23، 23، 16، 23، 21، 16.',
      stepByStep: [
        'عدد القيم (n): 8 عناصر، مجموعها: 144.',
        'المتوسط الحسابي: 144 ÷ 8 = 18.00.',
        'مجموع مربعات الفروق: 186.',
        'تباين العينة: 186 ÷ 7 = 26.57 -> الانحراف المعياري للعينة (s): 5.15.',
        'تباين المجتمع: 186 ÷ 8 = 23.25 -> الانحراف المعياري للمجتمع (σ): 4.82.'
      ],
      result: 'المتوسط: 18.00 | انحراف العينة (s): 5.15 | انحراف المجتمع (σ): 4.82'
    },
    interpretation: 'يقيس مدى تشتت القيم حول متوسطها الحسابي، حيث يشير الانحراف المنخفض إلى تجانس واستقرار البيانات.',
    assumptions: 'يتطلب عنصرين على الأقل لحساب انحراف العينة الإحصائي.',
    limitations: 'يتأثر بشدة بالقيم المتطرفة والشاذة إحصائياً.',
    faqs: [
      { question: 'متى أستخدم انحراف العينة ومتى أستخدم انحراف المجتمع؟', answer: 'استخدم انحراف العينة (ن-1) عند أخذ عينة ممثلة لمجتمع أكبر، واستخدم انحراف المجتمع (ن) عندما تشمل بياناتك جميع أفراد المجتمع بالكامل.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la media aritmética, la desviación estándar muestral (s), la desviación poblacional (σ) y la varianza para cualquier conjunto numérico.`,
    howToUse: [
      'Introduzca los valores numéricos separados por comas o espacios.',
      'Revise el número de elementos (n), la media, la desviación muestral (N-1) y la poblacional (N).'
    ],
    formula: 'Desv. Muestral (s) = √[ Σ(x - x̄)² / (n - 1) ] | Desv. Poblacional (σ) = √[ Σ(x - μ)² / n ]',
    formulaVariables: [
      { name: 'Datos', description: 'Valores numéricos separados por comas.', unit: 'Conjunto de datos', optional: false }
    ],
    workedExample: {
      scenario: 'Análisis de la muestra: 10, 12, 23, 23, 16, 23, 21, 16.',
      stepByStep: [
        'Tamaño muestral (n): 8 elementos; Suma: 144.',
        'Media (x̄): 144 / 8 = 18,00.',
        'Suma de desviaciones cuadradas: 186.',
        'Varianza muestral: 186 / 7 = 26,57 -> Desviación estándar (s): 5,15.',
        'Varianza poblacional: 186 / 8 = 23,25 -> Desviación estándar (σ): 4,82.'
      ],
      result: 'Media: 18,00 | Desv. Muestral (s): 5,15 | Desv. Poblacional (σ): 4,82'
    },
    interpretation: 'Cuantifica la dispersión o variabilidad respecto al promedio central.',
    assumptions: 'Requiere al menos 2 valores numéricos.',
    limitations: 'Sensible a valores atípicos extremos.',
    faqs: [
      { question: '¿Por qué se divide por (n - 1) en la muestra?', answer: 'Es la corrección de Bessel, que elimina el sesgo en la estimación de la varianza poblacional a partir de una muestra reducida.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule la moyenne, l'écart-type d'échantillon (s), l'écart-type de population (σ) et la variance d'une série statistique de nombres.`,
    howToUse: [
      'Saisissez vos nombres séparés par des virgules ou des espaces.',
      'Consultez l\'effectif total (n), la moyenne arithmétique, l\'écart-type d\'échantillon et l\'écart-type global.'
    ],
    formula: 'Écart-type échantillon (s) = √[ Σ(x - x̄)² / (n - 1) ] | Écart-type population (σ) = √[ Σ(x - μ)² / n ]',
    formulaVariables: [
      { name: 'Série de données', description: 'Suite de valeurs numériques.', unit: 'Liste de nombres', optional: false }
    ],
    workedExample: {
      scenario: 'Série de données : 10, 12, 23, 23, 16, 23, 21, 16.',
      stepByStep: [
        'Effectif (n) : 8 ; Somme : 144.',
        'Moyenne : 144 / 8 = 18,00.',
        'Somme des carrés des écarts : 186.',
        'Variance échantillon : 186 / 7 = 26,57 -> Écart-type (s) : 5,15.',
        'Variance population : 186 / 8 = 23,25 -> Écart-type (σ) : 4,82.'
      ],
      result: 'Moyenne : 18,00 | Écart-type échantillon (s) : 5,15 | Écart-type population (σ) : 4,82'
    },
    interpretation: 'Mesure la dispersion des valeurs : un faible écart-type indique que les observations sont très resserrées autour de la moyenne.',
    assumptions: 'Nécessite au moins 2 données valides.',
    limitations: 'Vulnérable aux valeurs aberrantes.',
    faqs: [
      { question: 'Qu\'est-ce que la correction de Bessel ?', answer: 'La division par n-1 permet d\'obtenir un estimateur sans biais de la variance d\'une population.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} ermittelt den Mittelwert, die Stichproben-Standardabweichung (s), die Populations-Standardabweichung (σ) und die Varianz einer Datenreihe.`,
    howToUse: [
      'Geben Sie Zahlen getrennt durch Kommas oder Leerzeichen ein.',
      'Prüfen Sie Stichprobenumfang (n), arithmetisches Mittel, Stichproben- und Populations-Standardabweichung.'
    ],
    formula: 'Stichprobe (s) = √[ Σ(x - x̄)² / (n - 1) ] | Population (σ) = √[ Σ(x - μ)² / n ]',
    formulaVariables: [
      { name: 'Datenreihe', description: 'Kommagetrennte Zahlenfolge.', unit: 'Zahlenreihe', optional: false }
    ],
    workedExample: {
      scenario: 'Datenreihe: 10, 12, 23, 23, 16, 23, 21, 16.',
      stepByStep: [
        'Stichprobenumfang (n): 8 Werte; Summe: 144.',
        'Mittelwert (x̄): 144 / 8 = 18,00.',
        'Quadratsumme der Abweichungen: 186.',
        'Stichprobenvarianz: 186 / 7 = 26,57 -> Standardabweichung (s): 5,15.',
        'Populationsvarianz: 186 / 8 = 23,25 -> Standardabweichung (σ): 4,82.'
      ],
      result: 'Mittelwert: 18,00 | Stichproben-SD (s): 5,15 | Populations-SD (σ): 4,82'
    },
    interpretation: 'Gibt Aufschluss über die Streuung von Messwerten um den gemeinsamen Mittelwert.',
    assumptions: 'Mindestens zwei Messpunkte erforderlich.',
    limitations: 'Empfindlich gegenüber extremen statistischen Ausreißern.',
    faqs: [
      { question: 'Wann nutze ich s und wann σ?', answer: 'Nutzen Sie s (n-1) bei Stichproben und σ (n), wenn alle Elemente der Gesamtheit erfasst wurden.' }
    ],
    relatedTools
  })
});

// 5. PYTHAGOREAN THEOREM (pythagoras)
export const PYTHAGORAS_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates the exact hypotenuse length (c) of a right-angled triangle given the lengths of legs a and b using the Pythagorean theorem.`,
    howToUse: [
      'Enter the length of perpendicular leg A.',
      'Enter the length of perpendicular leg B.',
      'Review the calculated length of the hypotenuse C.'
    ],
    formula: 'c = √(a² + b²)',
    formulaVariables: [
      { name: 'Leg A', description: 'Length of the first side adjacent to the right angle.', unit: 'Units', optional: false },
      { name: 'Leg B', description: 'Length of the second side adjacent to the right angle.', unit: 'Units', optional: false }
    ],
    workedExample: {
      scenario: 'A right triangle with leg a = 3 and leg b = 4.',
      stepByStep: [
        'Square of leg a: 3² = 9.',
        'Square of leg b: 4² = 16.',
        'Sum of squares: 9 + 16 = 25.',
        'Square root of sum: √25 = 5.0.'
      ],
      result: 'Hypotenuse (c): 5.0 (Classic 3-4-5 Pythagorean triple)'
    },
    interpretation: 'Fundamental geometric tool for construction squaring, roof framing, surveying, and vector displacement.',
    assumptions: 'Triangle must contain an exact 90-degree right angle.',
    limitations: 'Not applicable to non-right triangles (which require the Law of Cosines).',
    faqs: [
      { question: 'What is a Pythagorean triple?', answer: 'A set of three positive integers a, b, and c that perfectly satisfy a² + b² = c², such as (3, 4, 5) or (5, 12, 13).' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب طول الوتر (ج) في المثلث قائم الزاوية بدقة متناهية بناءً على طولي الضلعين المتعامدين (أ و ب) باستخدام نظرية فيثاغورس.`,
    howToUse: [
      'أدخل طول الضلع القائم الأول (أ).',
      'أدخل طول الضلع القائم الثاني (ب).',
      'راجع طول الوتر المقابل للزاوية القائمة (ج).'
    ],
    formula: 'ج = جذر(أ² + ب²)',
    formulaVariables: [
      { name: 'الضلع أ', description: 'طول الضلع القائم الأول.', unit: 'وحدة طول', optional: false },
      { name: 'الضلع ب', description: 'طول الضلع القائم الثاني.', unit: 'وحدة طول', optional: false }
    ],
    workedExample: {
      scenario: 'مثلث قائم الزاوية بضلعين أ = 3 و ب = 4.',
      stepByStep: [
        'مربع الضلع أ: 3² = 9.',
        'مربع الضلع ب: 4² = 16.',
        'مجموع المربعين: 9 + 16 = 25.',
        'الجذر التربيعي: جذر(25) = 5.0.'
      ],
      result: 'طول الوتر (ج): 5.0 (ثلاثية فيثاغورس القياسية 3-4-5)'
    },
    interpretation: 'أداة هندسية أساسية في ضبط زوايا البناء وتصميم الأسقف والمساحة الطبوغرافية.',
    assumptions: 'يجب أن يحتوي المثلث على زاوية قائمة تماماً (90 درجة).',
    limitations: 'لا تنطبق على المثلثات غير قائمة الزاوية (التي تتطلب قانون جيب التمام).',
    faqs: [
      { question: 'ما هي ثلاثية فيثاغورس الشهيرة؟', answer: 'هي أعداد صحيحة تحقق المعادلة تماماً دون كسور، أشهرها (3، 4، 5) و (5، 12، 13).' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la longitud de la hipotenusa (c) en un triángulo rectángulo a partir de los catetos a y b mediante el Teorema de Pitágoras.`,
    howToUse: [
      'Introduzca la longitud del cateto A.',
      'Introduzca la longitud del cateto B.',
      'Consulte la hipotenusa C resultante.'
    ],
    formula: 'c = √(a² + b²)',
    formulaVariables: [
      { name: 'Cateto A', description: 'Primer lado adyacente al ángulo recto.', unit: 'Unidades', optional: false },
      { name: 'Cateto B', description: 'Segundo lado adyacente al ángulo recto.', unit: 'Unidades', optional: false }
    ],
    workedExample: {
      scenario: 'Triángulo rectángulo con catetos a = 3 y b = 4.',
      stepByStep: [
        'Cuadrado de a: 3² = 9.',
        'Cuadrado de b: 4² = 16.',
        'Suma de cuadrados: 9 + 16 = 25.',
        'Raíz cuadrada: √25 = 5,0.'
      ],
      result: 'Hipotenusa (c): 5,0 (Terna pitagórica clásica 3-4-5)'
    },
    interpretation: 'Imprescindible en replanteos de obra, carpintería y topografía para comprobar escuadras perfectas de 90 grados.',
    assumptions: 'El triángulo debe ser estrictamente rectángulo (90°).',
    limitations: 'No es aplicable a triángulos oblicuángulos.',
    faqs: [
      { question: '¿Cómo comprobar una escuadra en construcción?', answer: 'Midiendo 3 metros en una pared y 4 metros en la perpendicular; si la diagonal mide exactamente 5 metros, la esquina es un ángulo recto perfecto.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule l'hypoténuse (c) d'un triangle rectangle à partir des côtés de l'angle droit (a et b) selon le théorème de Pythagore.`,
    howToUse: [
      'Indiquez la longueur du premier côté de l\'angle droit (a).',
      'Indiquez la longueur du second côté de l\'angle droit (b).',
      'Visualisez la longueur calculée de l\'hypoténuse (c).'
    ],
    formula: 'c = √(a² + b²)',
    formulaVariables: [
      { name: 'Côté a', description: 'Longueur du premier côté adjacent.', unit: 'Unités', optional: false },
      { name: 'Côté b', description: 'Longueur du second côté adjacent.', unit: 'Unités', optional: false }
    ],
    workedExample: {
      scenario: 'Triangle rectangle de côtés a = 3 et b = 4.',
      stepByStep: [
        'Carré du côté a : 3² = 9.',
        'Carré du côté b : 4² = 16.',
        'Somme des carrés : 9 + 16 = 25.',
        'Racine carrée : √25 = 5,0.'
      ],
      result: 'Hypoténuse (c) : 5,0 (Triplet pythagoricien 3-4-5)'
    },
    interpretation: 'Théorème pilier de la géométrie euclidienne appliqué à la menuiserie, la charpente et la navigation.',
    assumptions: 'Angle droit strict de 90 degrés.',
    limitations: 'Ne s\'applique pas aux triangles non rectangles.',
    faqs: [
      { question: 'Quelle est la règle des 3-4-5 ?', answer: 'Une astuce géométrique ancestrale pour vérifier l\'équerrage parfait d\'un angle sur un chantier.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die Länge der Hypotenuse (c) im rechtwinkligen Dreieck aus den Katheten a und b mit dem Satz des Pythagoras.`,
    howToUse: [
      'Geben Sie die Länge der Kathete A ein.',
      'Geben Sie die Länge der Kathete B ein.',
      'Lesen Sie die Hypotenuse C ab.'
    ],
    formula: 'c = √(a² + b²)',
    formulaVariables: [
      { name: 'Kathete a', description: 'Erste Seite am rechten Winkel.', unit: 'Einheiten', optional: false },
      { name: 'Kathete b', description: 'Zweite Seite am rechten Winkel.', unit: 'Einheiten', optional: false }
    ],
    workedExample: {
      scenario: 'Rechtwinkliges Dreieck mit den Katheten a = 3 und b = 4.',
      stepByStep: [
        'Quadrat von a: 3² = 9.',
        'Quadrat von b: 4² = 16.',
        'Summe der Kathetenquadrate: 9 + 16 = 25.',
        'Quadratwurzel: √25 = 5,0.'
      ],
      result: 'Hypotenuse (c): 5,0 (Klassisches pythagoreisches Tripel 3-4-5)'
    },
    interpretation: 'Grundlegende geometrische Formel für Bauwesen, Holzbau und Vermessungstechnik zur Prüfung rechter Winkel.',
    assumptions: 'Genau ein 90-Grad-Winkel im Dreieck.',
    limitations: 'Gilt nur für rechtwinklige Dreiecke.',
    faqs: [
      { question: 'Was ist ein pythagoreisches Tripel?', answer: 'Drei ganzzahlige Werte, die a² + b² = c² erfüllen, wie etwa (3, 4, 5) oder (5, 12, 13).' }
    ],
    relatedTools
  })
});

// 6. QUADRATIC EQUATION SOLVER (quadratic-solver)
export const QUADRATIC_SOLVER_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} solves second-degree polynomial equations (ax² + bx + c = 0), determining the discriminant (Δ) and finding real roots.`,
    howToUse: [
      'Enter quadratic coefficient a (cannot be 0).',
      'Enter linear coefficient b.',
      'Enter constant term c.',
      'Review the discriminant (b² - 4ac) and the resulting real solutions (Root 1 and Root 2).'
    ],
    formula: 'x = [-b ± √(b² - 4ac)] / (2a) | Discriminant (Δ) = b² - 4ac',
    formulaVariables: [
      { name: 'Coefficient a', description: 'Quadratic term multiplier (a ≠ 0).', unit: 'Coefficient', optional: false },
      { name: 'Coefficient b', description: 'Linear term multiplier.', unit: 'Coefficient', optional: false },
      { name: 'Constant c', description: 'Constant term.', unit: 'Constant', optional: false }
    ],
    workedExample: {
      scenario: 'Solving the quadratic equation: x² - 5x + 6 = 0 (a=1, b=-5, c=6).',
      stepByStep: [
        'Calculate discriminant: (-5)² - 4(1)(6) = 25 - 24 = 1.',
        'Square root of discriminant: √1 = 1.',
        'Root 1: [-(-5) + 1] / [2(1)] = (5 + 1) / 2 = 6 / 2 = 3.00.',
        'Root 2: [-(-5) - 1] / [2(1)] = (5 - 1) / 2 = 4 / 2 = 2.00.'
      ],
      result: 'Roots: x₁ = 3.00, x₂ = 2.00 | Discriminant (Δ): 1.00 (Two distinct real roots)'
    },
    interpretation: 'Identifies parabolic x-axis intersections in projectile physics, revenue optimization curves, and engineering mechanics.',
    assumptions: 'Coefficient a must be non-zero.',
    limitations: 'Calculates real roots; flags when roots are complex/imaginary (Δ < 0).',
    faqs: [
      { question: 'What does a negative discriminant mean?', answer: 'A discriminant less than zero means the parabola does not cross the x-axis, resulting in complex conjugate roots.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحل المعادلات التربيعية من الدرجة الثانية (أ س² + ب س + ج = 0) وحساب المميز (Δ) وإيجاد الجذور الحقيقية بدقة.`,
    howToUse: [
      'أدخل معامل س² (أ) (لا يمكن أن يساوي صفراً).',
      'أدخل معامل س (ب).',
      'أدخل الحد الثابت (ج).',
      'راجع المميز (ب² - 4 أ ج) والجذرين الحقيقيين الناتجين (س₁ و س₂).'
    ],
    formula: 'س = [-ب ± جذر(ب² - 4 أ ج)] / (2 أ) | المميز (Δ) = ب² - 4 أ ج',
    formulaVariables: [
      { name: 'المعامل أ', description: 'معامل الحد التربيعي (أ ≠ 0).', unit: 'معامل', optional: false },
      { name: 'المعامل ب', description: 'معامل الحد الخطي.', unit: 'معامل', optional: false },
      { name: 'الحد الثابت ج', description: 'القيمة الثابتة.', unit: 'ثابت', optional: false }
    ],
    workedExample: {
      scenario: 'حل المعادلة التربيعية: س² - 5 س + 6 = 0 (أ=1، ب=-5، ج=6).',
      stepByStep: [
        'حساب المميز: (-5)² - 4(1)(6) = 25 - 24 = 1.',
        'جذر المميز: جذر(1) = 1.',
        'الجذر الأول (س₁): [5 + 1] ÷ 2 = 6 ÷ 2 = 3.00.',
        'الجذر الثاني (س₂): [5 - 1] ÷ 2 = 4 ÷ 2 = 2.00.'
      ],
      result: 'الجذور الحقيقية: س₁ = 3.00، س₂ = 2.00 | المميز: 1.00'
    },
    interpretation: 'تحدد نقاط تقاطع المنحنى المكافئ مع المحور السيني في فيزياء المقذوفات ومنحنيات الأرباح.',
    assumptions: 'يجب ألا يساوي المعامل أ صفراً.',
    limitations: 'تعرض الجذور الحقيقية فقط؛ وتنبه في حال كانت الجذور مركبة تخيلية (المميز سالب).',
    faqs: [
      { question: 'ماذا يعني إذا كان المميز سالباً؟', answer: 'يعني أن المنحنى لا يقطع محور السينات في أي نقطة حقيقية، وأن الجذور أعداد مركبة تخيلية.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} resuelve ecuaciones algebraicas de segundo grado (ax² + bx + c = 0), evaluando el discriminante (Δ) y hallando las soluciones reales.`,
    howToUse: [
      'Introduzca el coeficiente cuadrático a (distinto de 0).',
      'Introduzca el coeficiente lineal b.',
      'Introduzca el término independiente c.',
      'Consulte el discriminante (b² - 4ac) y las raíces resultantes x₁ y x₂.'
    ],
    formula: 'x = [-b ± √(b² - 4ac)] / (2a) | Discriminante (Δ) = b² - 4ac',
    formulaVariables: [
      { name: 'Coeficiente a', description: 'Multiplicador de x² (a ≠ 0).', unit: 'Coeficiente', optional: false },
      { name: 'Coeficiente b', description: 'Multiplicador de x.', unit: 'Coeficiente', optional: false },
      { name: 'Constante c', description: 'Término numérico independiente.', unit: 'Constante', optional: false }
    ],
    workedExample: {
      scenario: 'Resolver x² - 5x + 6 = 0 (a=1, b=-5, c=6).',
      stepByStep: [
        'Cálculo del discriminante: (-5)² - 4(1)(6) = 25 - 24 = 1.',
        'Raíz del discriminante: √1 = 1.',
        'Raíz 1 (x₁): (5 + 1) / 2 = 6 / 2 = 3,00.',
        'Raíz 2 (x₂): (5 - 1) / 2 = 4 / 2 = 2,00.'
      ],
      result: 'Soluciones: x₁ = 3,00, x₂ = 2,00 | Discriminante: 1,00 (Dos raíces reales distintas)'
    },
    interpretation: 'Calcula los puntos de corte con el eje X de trayectorias parabólicas en física e ingeniería.',
    assumptions: 'El coeficiente a no puede ser cero.',
    limitations: 'Especializada en soluciones dentro de los números reales.',
    faqs: [
      { question: '¿Qué ocurre cuando el discriminante es igual a cero?', answer: 'Existe una única solución real doble, lo que indica que el vértice de la parábola es tangente al eje X.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} résout les équations polynomiales du second degré (ax² + bx + c = 0) en déterminant le discriminant (Δ) et les racines réelles.`,
    howToUse: [
      'Indiquez le coefficient quadratique a (différent de 0).',
      'Indiquez le coefficient linéaire b.',
      'Indiquez la constante indépendante c.',
      'Consultez la valeur du discriminant et les racines réelles associées.'
    ],
    formula: 'x = [-b ± √(b² - 4ac)] / (2a) | Discriminant (Δ) = b² - 4ac',
    formulaVariables: [
      { name: 'Coefficient a', description: 'Multiplicateur de x² (a ≠ 0).', unit: 'Coefficient', optional: false },
      { name: 'Coefficient b', description: 'Multiplicateur de x.', unit: 'Coefficient', optional: false },
      { name: 'Constante c', description: 'Terme constant.', unit: 'Constante', optional: false }
    ],
    workedExample: {
      scenario: 'Résolution de x² - 5x + 6 = 0 (a=1, b=-5, c=6).',
      stepByStep: [
        'Calcul du discriminant : (-5)² - 4(1)(6) = 25 - 24 = 1.',
        'Racine de delta : √1 = 1.',
        'Racine 1 (x₁) : (5 + 1) / 2 = 3,00.',
        'Racine 2 (x₂) : (5 - 1) / 2 = 2,00.'
      ],
      result: 'Racines : x₁ = 3,00, x₂ = 2,00 | Discriminant : 1,00'
    },
    interpretation: 'Détermine les intersections d\'une parabole avec l\'axe des abscisses en balistique et modélisation physique.',
    assumptions: 'Le coefficient a doit être strictement différent de zéro.',
    limitations: 'Résolution dans le corps des nombres réels.',
    faqs: [
      { question: 'Que signifie un discriminant strictement négatif ?', answer: 'L\'équation ne possède aucune racine réelle ; les solutions sont deux nombres complexes conjugués.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} löst quadratische Gleichungen (ax² + bx + c = 0) über die Mitternachtsformel und berechnet die Diskriminante sowie reelle Nullstellen.`,
    howToUse: [
      'Geben Sie den Koeffizienten a ein (darf nicht 0 sein).',
      'Geben Sie den Koeffizienten b ein.',
      'Geben Sie das konstante Glied c ein.',
      'Lesen Sie die Diskriminante und die reellen Lösungen x₁ und x₂ ab.'
    ],
    formula: 'x = [-b ± √(b² - 4ac)] / (2a) | Diskriminante (Δ) = b² - 4ac',
    formulaVariables: [
      { name: 'Koeffizient a', description: 'Faktor vor x² (a ≠ 0).', unit: 'Koeffizient', optional: false },
      { name: 'Koeffizient b', description: 'Faktor vor x.', unit: 'Koeffizient', optional: false },
      { name: 'Konstante c', description: 'Absolutes Glied.', unit: 'Konstante', optional: false }
    ],
    workedExample: {
      scenario: 'Gleichung x² - 5x + 6 = 0 (a=1, b=-5, c=6).',
      stepByStep: [
        'Diskriminante berechnen: (-5)² - 4(1)(6) = 25 - 24 = 1.',
        'Wurzel aus der Diskriminante: √1 = 1.',
        'Lösung 1 (x₁): (5 + 1) / 2 = 3,00.',
        'Lösung 2 (x₂): (5 - 1) / 2 = 2,00.'
      ],
      result: 'Nullstellen: x₁ = 3,00, x₂ = 2,00 | Diskriminante: 1,00'
    },
    interpretation: 'Berechnet die Nullstellen parabelförmiger Flugbahnen in Physik und Statik.',
    assumptions: 'Koeffizient a ungleich null.',
    limitations: 'Bestimmt reelle Nullstellen.',
    faqs: [
      { question: 'Was bedeutet eine Diskriminante von null?', answer: 'Die Parabel berührt die x-Achse in genau einem Punkt (doppelte reelle Nullstelle).' }
    ],
    relatedTools
  })
});

// Map of first 6 Batch 1 math tools
export const BATCH1_MATH_HANDLERS: Record<string, Record<Language, KnowledgeHandler>> = {
  fraction: FRACTION_KNOWLEDGE,
  ratio: RATIO_KNOWLEDGE,
  'percentage-change': PERCENTAGE_CHANGE_KNOWLEDGE,
  'standard-deviation': STANDARD_DEVIATION_KNOWLEDGE,
  pythagoras: PYTHAGORAS_KNOWLEDGE,
  'quadratic-solver': QUADRATIC_SOLVER_KNOWLEDGE,
};
