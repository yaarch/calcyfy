import { ToolDef, Language } from '../../types';
import { ToolContentDetails } from './types';

type KnowledgeHandler = (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails;

function createKnowledge(dataByLang: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails>): Record<Language, KnowledgeHandler> {
  return dataByLang;
}

// 1. STANDARD DEVIATION (standard-deviation-calc)
export const STANDARD_DEVIATION_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates sample and population standard deviation (s and σ), variance, mean (average), sum of squares, and margin of error for any numerical dataset.`,
    howToUse: [
      'Enter numbers separated by commas, spaces, or line breaks (e.g., 10, 12, 23, 23, 16, 23, 21, 16).',
      'Select whether data represents a Sample (divide by n-1) or an entire Population (divide by N).',
      'Review computed standard deviation, variance, mean, and step-by-step deviations from mean.'
    ],
    formula: 'Sample: s = √[ Σ(x - x̄)² / (n - 1) ] | Population: σ = √[ Σ(x - μ)² / N ]',
    formulaVariables: [
      { name: 'Data Points (x)', description: 'Set of numerical sample observations.', unit: 'Real Numbers', optional: false },
      { name: 'Sample Size (n)', description: 'Total count of data items.', unit: 'Integer', optional: false }
    ],
    workedExample: {
      scenario: 'A sample dataset of 5 values: [10, 12, 14, 15, 19].',
      stepByStep: [
        'Calculate Sample Mean: x̄ = (10 + 12 + 14 + 15 + 19) / 5 = 70 / 5 = 14.0.',
        'Compute squared deviations from mean: (10-14)²=16, (12-14)²=4, (14-14)²=0, (15-14)²=1, (19-14)²=25.',
        'Sum of Squared Deviations = 16 + 4 + 0 + 1 + 25 = 46.',
        'Sample Variance (s²) = 46 / (5 - 1) = 46 / 4 = 11.5.',
        'Sample Standard Deviation (s) = √11.5 ≈ 3.3912.'
      ],
      result: 'Mean = 14.00 | Sample SD (s) = 3.39 | Population SD (σ) = 3.03 | Variance = 11.50'
    },
    interpretation: 'Measures dispersion: a low standard deviation indicates data points cluster tightly near the mean; high SD indicates wide dispersion.',
    assumptions: 'Assumes continuous or discrete numerical values with at least 2 observations for sample variance.',
    limitations: 'Susceptible to skewing by extreme outliers.',
    faqs: [
      { question: 'Why divide by n - 1 for a sample?', answer: 'Bessel’s correction (n - 1) corrects for the downward bias in estimating population variance from a finite sample.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب الانحراف المعياري للعينة والمجتمع (s و σ)، والتباين، والوسط الحسابي، ومجموع المربعات لأي مجموعة بيانات إحصائية.`,
    howToUse: [
      'أدخل الأرقام مفصولة بفواصل أو مسافات (مثال: 10, 12, 14, 15, 19).',
      'اختر نوع البيانات: عينة (القسمة على n-1) أو مجتمع كامل (القسمة على N).',
      'اطلع على الانحراف المعياري والتباين والوسط الحسابي.'
    ],
    formula: 'انحراف العينة = √[ مجموع (س - س̄)² ÷ (n - 1) ]',
    formulaVariables: [
      { name: 'البيانات', description: 'القيم الرقمية المدخلة.', unit: 'أرقام', optional: false }
    ],
    workedExample: {
      scenario: 'عينة من 5 أرقام: [10, 12, 14, 15, 19].',
      stepByStep: [
        'الوسط الحسابي = 70 ÷ 5 = 14.0.',
        'مجموع مربعات الانحرافات = 16 + 4 + 0 + 1 + 25 = 46.',
        'تباين العينة = 46 ÷ 4 = 11.5.',
        'الانحراف المعياري = √11.5 = 3.39.'
      ],
      result: 'الوسط = 14.00 | الانحراف المعياري = 3.39 | التباين = 11.50'
    },
    interpretation: 'يقيس مدى تشتت البيانات أو تقاربها حول المتوسط الحسابي.',
    assumptions: 'قيم عددية حقيقية لا تقل عن عنصرين للعينة.',
    limitations: 'يتأثر بشدة بالقيم المتطرفة والشاذة.',
    faqs: [
      { question: 'لماذا نقسم على n-1 في العينة؟', answer: 'لتصحيح التحيز الإحصائي (تصحيح بيسيل) لتقدير تباين المجتمع بدقة أكبر.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la desviación estándar muestral y poblacional (s y σ), varianza y media aritmética para conjuntos de datos.`,
    howToUse: [
      'Introduzca los números separados por comas o espacios.',
      'Seleccione si los datos corresponden a una Muestra (n-1) o Población (N).',
      'Consulte la desviación estándar y varianza.'
    ],
    formula: 'Muestral: s = √[ Σ(x - x̄)² / (n - 1) ]',
    formulaVariables: [
      { name: 'Datos', description: 'Conjunto de valores.', unit: 'Reales', optional: false }
    ],
    workedExample: {
      scenario: 'Muestra de 5 valores: [10, 12, 14, 15, 19].',
      stepByStep: [
        'Media = 14.0 | Suma de cuadrados = 46.',
        'Varianza = 46 / 4 = 11.5 | Desviación Estándar = √11.5 = 3.39.'
      ],
      result: 'Media = 14.00 | Desviación Estándar = 3.39 | Varianza = 11.50'
    },
    interpretation: 'Cuantifica el grado de dispersión respecto a la media.',
    assumptions: 'Muestra mínima de 2 observaciones.',
    limitations: 'Sensible a valores atípicos extremos.',
    faqs: [
      { question: '¿Qué indica una desviación estándar baja?', answer: 'Indica que la mayoría de los datos se concentran muy cerca de la media.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule l'écart-type échantillonnal et populationnel (s et σ), la variance et la moyenne arithmétique d'une série statistique.`,
    howToUse: [
      'Saisissez les nombres séparés par des virgules ou espaces.',
      'Choisissez Échantillon (n-1) ou Population (N).',
      'Consultez l’écart-type et la variance.'
    ],
    formula: 'Écart-type échantillon : s = √[ Σ(x - x̄)² / (n - 1) ]',
    formulaVariables: [
      { name: 'Données', description: 'Valeurs numériques.', unit: 'Réels', optional: false }
    ],
    workedExample: {
      scenario: 'Échantillon de 5 valeurs : [10, 12, 14, 15, 19].',
      stepByStep: [
        'Moyenne = 14,0 | Somme des carrés = 46.',
        'Variance = 11,5 | Écart-type = √11,5 = 3,39.'
      ],
      result: 'Moyenne = 14,00 | Écart-type = 3,39 | Variance = 11,50'
    },
    interpretation: 'Mesure la dispersion des observations autour de la tendance centrale.',
    assumptions: 'Données quantitatives (n ≥ 2).',
    limitations: 'Sensible aux valeurs aberrantes.',
    faqs: [
      { question: 'Pourquoi diviser par n - 1 ?', answer: 'La correction de Bessel élimine le biais d’estimation de la variance de la population.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet Stichproben- und Populations-Standardabweichung (s und σ), Varianz und arithmetisches Mittel für Zahlenreihen.`,
    howToUse: [
      'Geben Sie Zahlen getrennt durch Kommas oder Leerzeichen ein.',
      'Wählen Sie Stichprobe (n-1) oder Grundgesamtheit (N).',
      'Lesen Sie Standardabweichung und Varianz ab.'
    ],
    formula: 'Stichprobe: s = √[ Σ(x - x̄)² / (n - 1) ]',
    formulaVariables: [
      { name: 'Messwerte', description: 'Reelle Zahlen.', unit: 'Reell', optional: false }
    ],
    workedExample: {
      scenario: '5 Stichprobenwerte: [10, 12, 14, 15, 19].',
      stepByStep: [
        'Mittelwert = 14,0 | Quadratsumme = 46.',
        'Varianz = 46 / 4 = 11,5 | Standardabweichung = √11,5 = 3,39.'
      ],
      result: 'Mittelwert = 14,00 | Standardabweichung = 3,39 | Varianz = 11,50'
    },
    interpretation: 'Gibt die durchschnittliche Streuung der Messwerte um den Mittelwert an.',
    assumptions: 'Mindestens 2 Werte für Stichprobenvarianz.',
    limitations: 'Empfindlich gegenüber extremen Ausreißern.',
    faqs: [
      { question: 'Was bedeutet eine hohe Standardabweichung?', answer: 'Dass die Werte weit um den Mittelwert gestreut sind.' }
    ],
    relatedTools
  })
});

// 2. PERCENTILE CALCULATOR (percentile-calc)
export const PERCENTILE_CALC_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates k-th percentiles, quartiles (Q1, Q2/Median, Q3), and interquartile range (IQR) for sorted datasets using linear rank interpolation.`,
    howToUse: [
      'Enter numerical dataset values separated by commas or spaces.',
      'Enter target percentile rank k (0 to 100, e.g., 25th, 75th, 90th, or 99th).',
      'Review computed percentile value, quartiles (Q1, Q2, Q3), and IQR.'
    ],
    formula: 'Rank Position: R = (k / 100) × (n - 1) + 1 | Interpolated Value: V = X_lower + frac × (X_upper - X_lower)',
    formulaVariables: [
      { name: 'Dataset Values', description: 'List of numbers.', unit: 'Real Numbers', optional: false },
      { name: 'Percentile Rank (k)', description: 'Target percentile between 0 and 100.', unit: '%', optional: false }
    ],
    workedExample: {
      scenario: 'Find the 80th percentile for dataset [15, 20, 35, 40, 50, 60, 70, 80, 90, 100] (n = 10).',
      stepByStep: [
        'Sort data in ascending order (already sorted).',
        'Calculate rank index: R = (80 / 100) × (10 - 1) + 1 = 0.8 × 9 + 1 = 8.2.',
        'Interpolate between 8th value (80) and 9th value (90): 80 + 0.2 × (90 - 80) = 80 + 2.0 = 82.0.'
      ],
      result: '80th Percentile = 82.00 | Q1 (25th) = 36.25 | Median (50th) = 55.00 | Q3 (75th) = 77.50'
    },
    interpretation: 'Indicates the value below which a given percentage of observations falls in a frequency distribution.',
    assumptions: 'Assumes continuous linear interpolation between adjacent ordered ranks.',
    limitations: 'Small datasets (n < 5) provide low statistical resolution.',
    faqs: [
      { question: 'What is the 50th percentile?', answer: 'The 50th percentile is exactly identical to the median of the dataset.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب المئينيات (Percentiles) والربيعات (Q1 و Q2 الوسيط و Q3) والمدى الربيعي (IQR) لمجموعات البيانات الإحصائية.`,
    howToUse: [
      'أدخل البيانات مفصولة بفواصل أو مسافات.',
      'أدخل الرتبة المئينية المستهدفة (من 0 إلى 100، مثل المئين 90).',
      'اطلع على القيمة المحسوبة والربيعات والوسيط الإحصائي.'
    ],
    formula: 'موقع الرتبة = (k ÷ 100) × (n - 1) + 1',
    formulaVariables: [
      { name: 'البيانات', description: 'قائمة الأرقام.', unit: 'أرقام', optional: false },
      { name: 'الرتبة المئينية (k)', description: 'النسبة المئوية المطلوبة.', unit: '%', optional: false }
    ],
    workedExample: {
      scenario: 'حساب المئين 80 لمجموعة من 10 أرقام من 15 إلى 100.',
      stepByStep: [
        'ترتيب البيانات تصاعدياً.',
        'موقع الرتبة = 0.8 × 9 + 1 = 8.2.',
        'القيمة المقابلة = 80 + 0.2 × 10 = 82.0.'
      ],
      result: 'المئين 80 = 82.00 | الوسيط (المئين 50) = 55.00'
    },
    interpretation: 'تحدد القيمة التي تقع تحتها نسبة معينة من بيانات العينة.',
    assumptions: 'استيفاء خطي بين القيم المرتبة.',
    limitations: 'العينات الصغيرة جداً تعطي تقديراً تقريبياً.',
    faqs: [
      { question: 'ما هو المئين 50؟', answer: 'هو نفسه الوسيط الإحصائي للبيانات تماماً.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula percentiles, cuartiles (Q1, Q2, Q3) y rango intercuartílico (IQR) mediante interpolación lineal de rangos.`,
    howToUse: [
      'Ingrese los números separados por comas o espacios.',
      'Ingrese el percentil deseado k (0-100) y consulte el resultado.'
    ],
    formula: 'Posición de Rango: R = (k / 100) × (n - 1) + 1',
    formulaVariables: [
      { name: 'Datos', description: 'Valores numéricos.', unit: 'Reales', optional: false },
      { name: 'Percentil k', description: 'Rango objetivo.', unit: '%', optional: false }
    ],
    workedExample: {
      scenario: 'Percentil 80 de 10 valores ordenados [15, 20... 100].',
      stepByStep: [
        'Rango = 8.2 | Interpolación = 80 + 0.2(10) = 82.0.'
      ],
      result: 'Percentil 80 = 82.00 | Mediana = 55.00'
    },
    interpretation: 'Determina el umbral por debajo del cual se sitúa un porcentaje de la muestra.',
    assumptions: 'Interpolación continua.',
    limitations: 'Poco representativo en muestras menores a 5 elementos.',
    faqs: [
      { question: '¿Qué es el percentil 90?', answer: 'El valor por encima del cual sólo se encuentra el 10% superior de los datos.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} détermine les centiles (percentiles), quartiles et écart interquartile (IQR) d'une série ordonnée par interpolation linéaire.`,
    howToUse: [
      'Saisissez les données et le rang centile souhaité k (0 à 100).',
      'Consultez la valeur du centile et les quartiles.'
    ],
    formula: 'Position du rang : R = (k / 100) × (n - 1) + 1',
    formulaVariables: [
      { name: 'Série', description: 'Ensemble de valeurs.', unit: 'Réels', optional: false },
      { name: 'Centile (k)', description: 'Pourcentage cible.', unit: '%', optional: false }
    ],
    workedExample: {
      scenario: '80e centile sur une série de 10 valeurs.',
      stepByStep: [
        'Position = 8,2 | Valeur interpolée = 82,0.'
      ],
      result: '80e Centile = 82,00 | Médiane = 55,00'
    },
    interpretation: 'Indique le seuil sous lequel se trouve une proportion donnée de la population.',
    assumptions: 'Distribution ordonnée continue.',
    limitations: 'Exige un effectif suffisant.',
    faqs: [
      { question: 'Quelle est la relation entre médiane et centile ?', answer: 'La médiane correspond exactement au 50e centile (Q2).' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet k-te Perzentile, Quartile (Q1, Q2/Median, Q3) und Interquartilsabstände (IQR) über lineare Ranginterpolation.`,
    howToUse: [
      'Geben Sie Zahlen und das gewünschte Perzentil k (0 bis 100) ein.',
      'Lesen Sie den Perzentilwert und die Quartile ab.'
    ],
    formula: 'Rangposition: R = (k / 100) × (n - 1) + 1',
    formulaVariables: [
      { name: 'Datenreihe', description: 'Reelle Zahlenwerte.', unit: 'Reell', optional: false },
      { name: 'Perzentil (k)', description: 'Gesuchter Prozentrang.', unit: '%', optional: false }
    ],
    workedExample: {
      scenario: '80. Perzentil einer 10er-Reihe [15...100].',
      stepByStep: [
        'Rang = 8,2 | Interpolierter Wert = 80 + 0,2×10 = 82,0.'
      ],
      result: '80. Perzentil = 82,00 | Median = 55,00'
    },
    interpretation: 'Zeigt den Schwellenwert, unter dem ein bestimmter Prozentsatz der Daten liegt.',
    assumptions: 'Lineare Interpolation sortierter Werte.',
    limitations: 'Weniger aussagekräftig bei sehr kleinen Stichproben (n < 5).',
    faqs: [
      { question: 'Was ist das 75. Perzentil?', answer: 'Das 3. Quartil (Q3), unter dem 75 % aller Beobachtungen liegen.' }
    ],
    relatedTools
  })
});

// 3. FRACTION TO PERCENT (fraction-to-percent)
export const FRACTION_TO_PERCENT_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} converts any numerator and denominator fraction into an exact percentage, simplified fraction, decimal equivalent, and parts-per-thousand.`,
    howToUse: [
      'Enter the numerator (top number).',
      'Enter the denominator (bottom number, cannot be zero).',
      'Review converted percentage, decimal value, and greatest common divisor (GCD) simplified fraction.'
    ],
    formula: 'Percentage (%) = (Numerator / Denominator) × 100',
    formulaVariables: [
      { name: 'Numerator', description: 'Top integer or decimal.', unit: 'Real Number', optional: false },
      { name: 'Denominator', description: 'Bottom non-zero number.', unit: 'Real Number (≠ 0)', optional: false }
    ],
    workedExample: {
      scenario: 'Convert the fraction 7/8 into a percentage.',
      stepByStep: [
        'Divide numerator by denominator: 7 / 8 = 0.875.',
        'Multiply by 100: 0.875 × 100 = 87.5%.'
      ],
      result: 'Percentage = 87.5% | Decimal = 0.875 | Simplified Fraction = 7/8'
    },
    interpretation: 'Transforms fractional ratios into intuitive percentages for math, financial yields, and grading.',
    assumptions: 'Denominator must not equal zero.',
    limitations: 'Repeating decimals (e.g., 1/3 = 33.333...%) are rounded to user-specified decimal precision.',
    faqs: [
      { question: 'How do you convert a mixed fraction like 1 3/4 to a percent?', answer: 'Convert to improper fraction: 1 3/4 = 7/4. Then (7/4) × 100 = 175%.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحويل أي كسر اعتيادي (بسط ومقام) إلى نسبة مئوية مئوية (%)، وكسر عشري، وكسر مبسط بأبسط صورة.`,
    howToUse: [
      'أدخل البسط (الرقم العلوي).',
      'أدخل المقام (الرقم السفلي ولا يساوي صفراً).',
      'اطلع على النسبة المئوية والكسر العشري والصورة المبسطة للكسر.'
    ],
    formula: 'النسبة المئوية = (البسط ÷ المقام) × 100',
    formulaVariables: [
      { name: 'البسط', description: 'العدد العلوي للكسر.', unit: 'عدد', optional: false },
      { name: 'المقام', description: 'العدد السفلي (غير صفري).', unit: 'عدد', optional: false }
    ],
    workedExample: {
      scenario: 'تحويل الكسر 7/8 إلى نسبة مئوية.',
      stepByStep: [
        'القسمة: 7 ÷ 8 = 0.875.',
        'الضرب في 100 = 87.5%.'
      ],
      result: 'النسبة المئوية = 87.5% | القيمة العشرية = 0.875'
    },
    interpretation: 'تسهل قراءة النسب والمعدلات الرياضية والمالية بدلالة النسبة المئوية.',
    assumptions: 'المقام لا يساوي الصفر.',
    limitations: 'الكسور الدورية مثل 1/3 يتم تقريبها إلى منازل عشرية مناسبة.',
    faqs: [
      { question: 'كيف نحول الكسر المركب إلى نسبة؟', answer: 'تحويله لكسر غير حقيقي ثم الضرب في 100 (مثال: 1 و 1/2 = 3/2 = 150%).' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} convierte fracciones (numerador/denominador) a porcentaje exacto, decimal y fracción simplificada.`,
    howToUse: [
      'Ingrese el numerador y denominador (distinto de cero).',
      'Consulte el porcentaje y su equivalente decimal.'
    ],
    formula: 'Porcentaje (%) = (Numerador / Denominador) × 100',
    formulaVariables: [
      { name: 'Numerador', description: 'Número superior.', unit: 'Número', optional: false },
      { name: 'Denominador', description: 'Número inferior (≠ 0).', unit: 'Número', optional: false }
    ],
    workedExample: {
      scenario: 'Convertir 7/8 a porcentaje.',
      stepByStep: [
        '7 / 8 = 0.875 × 100 = 87.5%.'
      ],
      result: 'Porcentaje = 87.5% | Decimal = 0.875'
    },
    interpretation: 'Facilita la conversión rápida de proporciones matemáticas.',
    assumptions: 'Denominador distinto de cero.',
    limitations: 'Decimales periódicos se redondean según precisión.',
    faqs: [
      { question: '¿Cómo convertir 3/5 a %?', answer: '(3 / 5) × 100 = 0.6 × 100 = 60%.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} convertit toute fraction en pourcentage exact, valeur décimale et fraction irréductible simplifiée.`,
    howToUse: [
      'Saisissez le numérateur et le dénominateur non nul.',
      'Consultez le pourcentage et la valeur décimale.'
    ],
    formula: 'Pourcentage (%) = (Numérateur / Dénominateur) × 100',
    formulaVariables: [
      { name: 'Numérateur', description: 'Valeur du haut.', unit: 'Nombre', optional: false },
      { name: 'Dénominateur', description: 'Valeur du bas (≠ 0).', unit: 'Nombre', optional: false }
    ],
    workedExample: {
      scenario: 'Convertir 7/8 en pourcentage.',
      stepByStep: [
        '7 / 8 = 0,875 × 100 = 87,5 %.'
      ],
      result: 'Pourcentage = 87,5 % | Décimal = 0,875'
    },
    interpretation: 'Traduit instantanément des rapports de proportion en pourcentages lisibles.',
    assumptions: 'Dénominateur non nul.',
    limitations: 'Arrondi standard pour les décimales périodiques.',
    faqs: [
      { question: 'Comment convertir 1/4 ?', answer: '(1 / 4) × 100 = 25 %.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} wandelt Brüche (Zähler und Nenner) in exakte Prozentwerte, Dezimalbrüche und gekürzte Brüche um.`,
    howToUse: [
      'Geben Sie Zähler und Nenner (ungleich 0) ein.',
      'Lesen Sie den Prozentwert und die Dezimalzahl ab.'
    ],
    formula: 'Prozentwert (%) = (Zähler / Nenner) × 100',
    formulaVariables: [
      { name: 'Zähler', description: 'Obere Zahl.', unit: 'Zahl', optional: false },
      { name: 'Nenner', description: 'Untere Zahl (≠ 0).', unit: 'Zahl', optional: false }
    ],
    workedExample: {
      scenario: 'Bruch 7/8 in Prozent umrechnen.',
      stepByStep: [
        '7 / 8 = 0,875 × 100 = 87,5 %.'
      ],
      result: 'Prozentsatz = 87,5 % | Dezimalzahl = 0,875'
    },
    interpretation: 'Wandelt mathematische Verhältnisse in anschauliche Prozentangaben um.',
    assumptions: 'Nenner ungleich null.',
    limitations: 'Periodische Dezimalbrüche werden gerundet dargestellt.',
    faqs: [
      { question: 'Wie viel Prozent sind 3/4?', answer: '(3 / 4) × 100 = 75 %.' }
    ],
    relatedTools
  })
});

// 4. MODULO CALCULATOR (modulo-calc)
export const MODULO_CALC_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates the remainder (modulo: a mod b), integer quotient, and Euclidean division congruence for any pair of numbers.`,
    howToUse: [
      'Enter dividend (a).',
      'Enter divisor/modulus (b, must not be zero).',
      'Review the modulo remainder, integer quotient (floor division), and mathematical congruence equation.'
    ],
    formula: 'a mod b = a - b × floor(a / b)',
    formulaVariables: [
      { name: 'Dividend (a)', description: 'Number being divided.', unit: 'Real/Integer', optional: false },
      { name: 'Divisor / Modulus (b)', description: 'Modulus divisor (b ≠ 0).', unit: 'Real/Integer', optional: false }
    ],
    workedExample: {
      scenario: 'Calculate 29 mod 6.',
      stepByStep: [
        'Integer Division: 29 / 6 = 4 with remainder 5.',
        'Formula: 29 - (6 × 4) = 29 - 24 = 5.',
        'Congruence: 29 ≡ 5 (mod 6).'
      ],
      result: 'Modulo (29 mod 6) = 5 | Quotient = 4 | Division: 29 = (6 × 4) + 5'
    },
    interpretation: 'Fundamental in modular arithmetic, cryptography (RSA, Diffie-Hellman), clock arithmetic, and computer programming.',
    assumptions: 'Modulus b ≠ 0. Uses standard mathematical floored modulo definition.',
    limitations: 'For negative dividends, mathematical modulo yields non-negative residues [0, b-1], differing from truncated remainder operators in C/C++.',
    faqs: [
      { question: 'What is -7 mod 5 in mathematics?', answer: '-7 mod 5 = 3 (since -7 = 5 × (-2) + 3).' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب باقي القسمة (Modulo: a mod b)، وناتج القسمة الصحيح، ومعادلة التطابق الحسابي في الحساب النمطي والتشفير.`,
    howToUse: [
      'أدخل المقسوم (a).',
      'أدخل القاسم أو الموديل (b لا يساوي صفراً).',
      'اطلع على باقي القسمة، والناتج الصحيح، وصيغة التطابق الرياضي.'
    ],
    formula: 'باقي القسمة = a - b × floor(a ÷ b)',
    formulaVariables: [
      { name: 'المقسوم (a)', description: 'العدد المراد قسمته.', unit: 'عدد', optional: false },
      { name: 'القاسم (b)', description: 'العدد المقسوم عليه.', unit: 'عدد', optional: false }
    ],
    workedExample: {
      scenario: 'حساب 29 mod 6.',
      stepByStep: [
        'القسمة الصحيحة: 29 ÷ 6 = 4 والباقي 5.',
        '29 - (6 × 4) = 29 - 24 = 5.'
      ],
      result: 'باقي القسمة = 5 | الناتج الصحيح = 4'
    },
    interpretation: 'تستخدم في التشفير الرقمي وبرمجة الحاسوب وعلم الحساب النمطي.',
    assumptions: 'القاسم لا يساوي الصفر.',
    limitations: 'الأعداد السالبة تتبع التعريف الرياضي المعياري لباقي القسمة الإقليدي.',
    faqs: [
      { question: 'أين يستخدم باقي القسمة برمجياً؟', answer: 'في معرفة الأعداد الزوجية والفردية (n mod 2) وتدوير المؤشرات وفترات الساعات.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el residuo de la división entera (módulo: a mod b), cociente entero y congruencia modular.`,
    howToUse: [
      'Ingrese el dividendo (a) y el divisor (b ≠ 0).',
      'Consulte el resto de la división y el cociente entero.'
    ],
    formula: 'a mod b = a - b × floor(a / b)',
    formulaVariables: [
      { name: 'Dividendo (a)', description: 'Número a dividir.', unit: 'Número', optional: false },
      { name: 'Divisor (b)', description: 'Módulo divisor.', unit: 'Número', optional: false }
    ],
    workedExample: {
      scenario: 'Calcular 29 mod 6.',
      stepByStep: [
        'Cociente = 4 | Residuo = 29 - 24 = 5.'
      ],
      result: 'Módulo (29 mod 6) = 5 | Cociente = 4'
    },
    interpretation: 'Base de la aritmética modular y algoritmos criptográficos.',
    assumptions: 'Divisor distinto de cero.',
    limitations: 'Con números negativos se aplica el módulo matemático no negativo.',
    faqs: [
      { question: '¿Qué es una relación de congruencia?', answer: 'Dos números son congruentes módulo m si tienen el mismo resto al dividirse entre m.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule le reste de la division euclidienne (modulo : a mod b), le quotient entier et la congruence arithmétique.`,
    howToUse: [
      'Saisissez le dividende (a) et le diviseur (b non nul).',
      'Consultez le reste (modulo) et le quotient.'
    ],
    formula: 'a mod b = a - b × floor(a / b)',
    formulaVariables: [
      { name: 'Dividende (a)', description: 'Nombre à diviser.', unit: 'Nombre', optional: false },
      { name: 'Diviseur (b)', description: 'Modulo (≠ 0).', unit: 'Nombre', optional: false }
    ],
    workedExample: {
      scenario: 'Calculer 29 mod 6.',
      stepByStep: [
        '29 = (6 × 4) + 5 | Reste = 5.'
      ],
      result: 'Modulo = 5 | Quotient Entier = 4'
    },
    interpretation: 'Essentiel en cryptographie, informatique et arithmétique modulaire.',
    assumptions: 'Diviseur non nul.',
    limitations: 'Utilise la convention euclidienne à reste positif pour les négatifs.',
    faqs: [
      { question: 'À quoi sert le modulo ?', answer: 'À créer des cycles réguliers (comme les 24h d’une horloge) et tester la parité.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet den Divisionsrest (Modulo: a mod b), ganzzahligen Quotienten und Kongruenzen der modularen Arithmetik.`,
    howToUse: [
      'Geben Sie Dividend (a) und Teiler/Divisor (b ≠ 0) ein.',
      'Lesen Sie den Rest und den ganzzahligen Quotienten ab.'
    ],
    formula: 'a mod b = a - b × floor(a / b)',
    formulaVariables: [
      { name: 'Dividend (a)', description: 'Zu teilende Zahl.', unit: 'Zahl', optional: false },
      { name: 'Divisor (b)', description: 'Modul-Teiler (≠ 0).', unit: 'Zahl', optional: false }
    ],
    workedExample: {
      scenario: '29 mod 6 berechnen.',
      stepByStep: [
        '29 geteilt durch 6 = 4 Rest 5.'
      ],
      result: 'Modulo = 5 | Ganzzahliger Quotient = 4'
    },
    interpretation: 'Kernoperation in Kryptographie (RSA), Programmierung und Uhrzeit-Arithmetik.',
    assumptions: 'Teiler ungleich null.',
    limitations: 'Für negative Zahlen gilt die mathematische Euklidische Modulo-Definition.',
    faqs: [
      { question: 'Wofür wird Modulo in der IT genutzt?', answer: 'Für Ringpuffer, Prüfsummen und zur Prüfung auf gerade/ungerade Zahlen.' }
    ],
    relatedTools
  })
});

// 5. BINARY ADDITION (binary-addition)
export const BINARY_ADDITION_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} performs binary arithmetic addition, subtraction, multiplication, bitwise logic (AND, OR, XOR), carry tracking, and two's complement conversions.`,
    howToUse: [
      'Enter Binary Number 1 (composed strictly of 0s and 1s, e.g., 10110).',
      'Enter Binary Number 2 (e.g., 01101).',
      'Select operation (Addition, Subtraction, Multiplication, OR, AND, XOR).',
      'Review binary sum, decimal equivalent, hexadecimal conversion, and bitwise carry steps.'
    ],
    formula: 'Binary Addition Rules: 0+0=0, 0+1=1, 1+0=1, 1+1=10 (0 carry 1), 1+1+1=11 (1 carry 1)',
    formulaVariables: [
      { name: 'Binary A', description: 'First binary bit sequence (Base-2).', unit: 'Bits', optional: false },
      { name: 'Binary B', description: 'Second binary bit sequence (Base-2).', unit: 'Bits', optional: false }
    ],
    workedExample: {
      scenario: 'Add binary numbers 1011₂ (11 in decimal) and 1101₂ (13 in decimal).',
      stepByStep: [
        'Column 1 (LSB): 1 + 1 = 0 (carry 1).',
        'Column 2: 1 + 0 + (carry 1) = 0 (carry 1).',
        'Column 3: 0 + 1 + (carry 1) = 0 (carry 1).',
        'Column 4: 1 + 1 + (carry 1) = 1 (carry 1).',
        'Column 5: carry 1 = 1.',
        'Result: 11000₂ = (16 + 8) = 24 in decimal.'
      ],
      result: 'Binary Sum = 11000₂ | Decimal Sum = 24 | Hexadecimal = 0x18'
    },
    interpretation: 'Simulates digital logic full-adder circuits in computer CPUs and ALU hardware architecture.',
    assumptions: 'Inputs contain valid base-2 binary digits (0 and 1 only).',
    limitations: 'Arbitrary-length inputs supported; fixed word bit-depths (8-bit, 16-bit) may show integer overflow flags.',
    faqs: [
      { question: 'What happens when you add 1 + 1 in binary?', answer: 'In binary, 1 + 1 equals 10 (which is 0 written down with a carry of 1 to the next higher power of 2).' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بإجراء الجمع الثنائي (Binary Addition)، والطرح، والضرب، والعمليات المنطقية البتية (AND, OR, XOR) مع تتبع خانات الحمل (Carries).`,
    howToUse: [
      'أدخل الرقم الثنائي الأول (أصفار وواحدات فقط مثل 10110).',
      'أدخل الرقم الثنائي الثاني (مثل 01101).',
      'اختر العملية الحسابية واطلع على الناتج بالنظام الثنائي والعشري والست عشري.'
    ],
    formula: 'قواعد الجمع الثنائي: 0+0=0 ، 1+0=1 ، 1+1=10 (0 مع حمل 1) ، 1+1+1=11',
    formulaVariables: [
      { name: 'الرقم الثنائي A', description: 'سلسلة البتات الأولى.', unit: 'بت', optional: false },
      { name: 'الرقم الثنائي B', description: 'سلسلة البتات الثانية.', unit: 'بت', optional: false }
    ],
    workedExample: {
      scenario: 'جمع 1011 (11 عشري) مع 1101 (13 عشري).',
      stepByStep: [
        'الجمع مع تتبع الحمل خطوة بخطوة من اليمين إلى اليسار.',
        'الناتج = 11000 بالثنائي (يعادل 24 بالنظام العشري).'
      ],
      result: 'الناتج الثنائي = 11000 | الناتج العشري = 24 | الست عشري = 0x18'
    },
    interpretation: 'تحاكي دوائر الجمع المنطقية (Full Adder) في معالجات الحواسيب الإلكترونية.',
    assumptions: 'المدخلات أرقام ثنائية صحيحة (0 و 1 فقط).',
    limitations: 'تظهر علامات التجاوز الحسابي في المعالجات محددة البتات.',
    faqs: [
      { question: 'كم ناتج 1 + 1 في النظام الثنائي؟', answer: 'يساوي 10 بالثنائي (أي 0 مع حمل 1 للخانة التالية).' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} suma y resta números binarios con seguimiento de acarreo (carry), conversión a decimal y hexadecimal y lógica binaria.`,
    howToUse: [
      'Ingrese dos números binarios (base 2: solo 0 y 1).',
      'Seleccione la operación y consulte la suma binaria y decimal.'
    ],
    formula: 'Reglas: 0+0=0, 0+1=1, 1+1=10 (acarreo 1), 1+1+1=11',
    formulaVariables: [
      { name: 'Binario A', description: 'Primer número binario.', unit: 'Bits', optional: false },
      { name: 'Binario B', description: 'Segundo número binario.', unit: 'Bits', optional: false }
    ],
    workedExample: {
      scenario: 'Sumar 1011₂ (11) + 1101₂ (13).',
      stepByStep: [
        'Suma columna a columna con acarreos: 1011 + 1101 = 11000₂ (24 decimal).'
      ],
      result: 'Suma Binaria = 11000₂ | Decimal = 24 | Hex = 0x18'
    },
    interpretation: 'Modela el funcionamiento de sumadores digitales en circuitos integrados y CPUs.',
    assumptions: 'Dígitos en base 2 válidos.',
    limitations: 'Rango de bits según arquitectura.',
    faqs: [
      { question: '¿Por qué 1 + 1 es 10 en binario?', answer: 'Porque la base 2 solo tiene dígitos 0 y 1; al llegar a 2 se traslada 1 a la siguiente potencia.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} réalise l'addition, la soustraction et la multiplication binaire avec suivi des retenues et conversion décimale/hexadécimale.`,
    howToUse: [
      'Saisissez deux nombres en base 2 (uniquement des 0 et 1).',
      'Consultez la somme binaire, décimale et le détail des retenues.'
    ],
    formula: 'Règles d’addition binaire : 1+1=10 (0 et retenue 1) ; 1+1+1=11',
    formulaVariables: [
      { name: 'Binaire A', description: 'Premier opérande.', unit: 'Bits', optional: false },
      { name: 'Binaire B', description: 'Second opérande.', unit: 'Bits', optional: false }
    ],
    workedExample: {
      scenario: 'Addition de 1011₂ (11) et 1101₂ (13).',
      stepByStep: [
        'Addition bit par bit avec propagation des retenues = 11000₂ (24 en base 10).'
      ],
      result: 'Somme Binaire = 11000₂ | Décimal = 24 | Hexadécimal = 0x18'
    },
    interpretation: 'Simule les circuits additionneurs arithmétiques des microprocesseurs.',
    assumptions: 'Chiffres valides en base 2.',
    limitations: 'Gestion des dépassements de capacité sur les formats fixes.',
    faqs: [
      { question: 'Comment fonctionne la retenue en binaire ?', answer: 'Dès que la somme d’une colonne atteint 2 (10₂), un 1 est reporté sur la colonne de gauche.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} führt binäre Additionen, Subtraktionen und Bit-Operationen (AND, OR, XOR) mit Übertragstracking und Hexadezimal-Konvertierung durch.`,
    howToUse: [
      'Geben Sie zwei Dualzahlen (nur 0 und 1) ein.',
      'Lesen Sie die binäre und dezimale Summe ab.'
    ],
    formula: 'Binärregeln: 0+0=0, 0+1=1, 1+1=10 (Übertrag 1), 1+1+1=11',
    formulaVariables: [
      { name: 'Binär A', description: 'Erste Dualzahl.', unit: 'Bits', optional: false },
      { name: 'Binär B', description: 'Zweite Dualzahl.', unit: 'Bits', optional: false }
    ],
    workedExample: {
      scenario: 'Addition von 1011₂ (11) und 1101₂ (13).',
      stepByStep: [
        'Bitweise Addition mit Übertrag: 1011 + 1101 = 11000₂ (24 dezimal).'
      ],
      result: 'Binäre Summe = 11000₂ | Dezimal = 24 | Hexadezimal = 0x18'
    },
    interpretation: 'Simuliert Volladdierer digitaler Rechenwerke (ALU) in Prozessoren.',
    assumptions: 'Gültige Dualziffern (0 und 1).',
    limitations: 'Überläufe bei festen Wortlängen beachten.',
    faqs: [
      { question: 'Was ergibt 1 + 1 im Binärsystem?', answer: '10₂ (Dualzahl 10, entspricht dezimal 2) mit 0 als Ziffer und 1 als Übertrag.' }
    ],
    relatedTools
  })
});

// 6. HEX CALCULATOR (hex-calculator)
export const HEX_CALCULATOR_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} performs hexadecimal arithmetic (addition, subtraction, multiplication, division), base conversions (Hex, Decimal, Binary, Octal), and ASCII text encoding.`,
    howToUse: [
      'Enter Hexadecimal Value 1 (digits 0-9 and letters A-F, e.g., 1A3F).',
      'Enter Hexadecimal Value 2 (e.g., 0B24).',
      'Select mathematical operation (+, -, ×, ÷).',
      'Review computed hex result, decimal equivalent, binary representation, and bitwise steps.'
    ],
    formula: 'Hex Addition: Base-16 values (0-15 per nibble; A=10, B=11, C=12, D=13, E=14, F=15) with carry base 16',
    formulaVariables: [
      { name: 'Hex Value A', description: 'First base-16 number.', unit: 'Hex String', optional: false },
      { name: 'Hex Value B', description: 'Second base-16 number.', unit: 'Hex String', optional: false }
    ],
    workedExample: {
      scenario: 'Add 0x2F and 0x1A.',
      stepByStep: [
        'Convert to decimal: 0x2F = (2 × 16) + 15 = 47. 0x1A = (1 × 16) + 10 = 26.',
        'Decimal Sum = 47 + 26 = 73.',
        'Convert back to Hex: 73 / 16 = 4 with remainder 9 = 0x49.'
      ],
      result: 'Hex Sum = 0x49 | Decimal = 73 | Binary = 01001001₂ | Octal = 111₈'
    },
    interpretation: 'Essential for low-level software engineering, memory addressing, color code manipulation, and network packet analysis.',
    assumptions: 'Inputs contain valid hexadecimal characters [0-9, a-f, A-F].',
    limitations: 'Floating-point hex division rounds to decimal fractions unless integer truncation is selected.',
    faqs: [
      { question: 'Why is hexadecimal used in computing?', answer: 'Because 1 hexadecimal digit represents exactly 4 binary bits (one nibble), making byte memory addresses clean and compact to read.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بإجراء العمليات الحسابية الست عشرية (Hex: جمع، طرح، ضرب، قسمة) والتحويل بين الأنظمة (ست عشري، عشري، ثنائي، ثماني).`,
    howToUse: [
      'أدخل القيمة الست عشرية الأولى (الأرقام 0-9 والحروف A-F مثل 2F).',
      'أدخل القيمة الثانية (مثل 1A).',
      'اختر العملية واطلع على الناتج بالأنظمة العددية المختلفة.'
    ],
    formula: 'النظام الست عشري: الأساس 16 حيث A=10 و B=11 و C=12 و D=13 و E=14 و F=15',
    formulaVariables: [
      { name: 'القيمة A', description: 'العدد الأول بالنظام الست عشري.', unit: 'Hex', optional: false },
      { name: 'القيمة B', description: 'العدد الثاني بالنظام الست عشري.', unit: 'Hex', optional: false }
    ],
    workedExample: {
      scenario: 'جمع 0x2F مع 0x1A.',
      stepByStep: [
        'بالنظام العشري: 47 + 26 = 73.',
        'التحويل للست عشري = 0x49.'
      ],
      result: 'الناتج الست عشري = 0x49 | العشري = 73 | الثنائي = 01001001'
    },
    interpretation: 'تفيد في هندسة البرمجيات المنخفضة، وعناوين الذاكرة RAM، وأكواد ألوان الويب.',
    assumptions: 'الحروف المدخلة صحيحة في النظام الست عشري.',
    limitations: 'القسمة غير الصحيحة يتم تقريبها عشرياً.',
    faqs: [
      { question: 'لماذا يستخدم النظام الست عشري في البرمجة؟', answer: 'لأن كل خانة ست عشرية تمثل 4 بتات ثنائية بدقة، مما يسهل قراءة عناوين الذاكرة والبيانات الثنائية.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula operaciones aritméticas en hexadecimal (+, -, ×, ÷) y convierte entre bases Hex, Decimal, Binario y Octal.`,
    howToUse: [
      'Ingrese valores en hexadecimal (0-9, A-F).',
      'Seleccione la operación y consulte la solución en múltiples bases.'
    ],
    formula: 'Aritmética en base 16: dígitos 0-9 y A(10) a F(15)',
    formulaVariables: [
      { name: 'Hex A', description: 'Primer valor base 16.', unit: 'Hex', optional: false },
      { name: 'Hex B', description: 'Segundo valor base 16.', unit: 'Hex', optional: false }
    ],
    workedExample: {
      scenario: 'Sumar 0x2F + 0x1A.',
      stepByStep: [
        'Decimal = 47 + 26 = 73 | Hexadecimal = 0x49.'
      ],
      result: 'Hex = 0x49 | Decimal = 73 | Binario = 01001001₂'
    },
    interpretation: 'Útil en programación de sistemas, direcciones de memoria y colores CSS.',
    assumptions: 'Caracteres hexadecimales válidos.',
    limitations: 'División fraccionaria sujeta a precisión decimal.',
    faqs: [
      { question: '¿Qué representa un byte en hexadecimal?', answer: 'Exactamente dos dígitos hexadecimales (de 0x00 a 0xFF, o 0 a 255).' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} effectue les calculs arithmétiques en hexadécimal et convertit instantanément entre Hex, Décimal, Binaire et Octal.`,
    howToUse: [
      'Saisissez les valeurs hexadécimales (0-9, A-F).',
      'Consultez le résultat calculé dans toutes les bases numériques.'
    ],
    formula: 'Base 16 : Chiffres 0 à 9 et lettres A(10) à F(15)',
    formulaVariables: [
      { name: 'Hex A', description: 'Premier nombre en base 16.', unit: 'Hex', optional: false },
      { name: 'Hex B', description: 'Second nombre en base 16.', unit: 'Hex', optional: false }
    ],
    workedExample: {
      scenario: 'Additionner 0x2F et 0x1A.',
      stepByStep: [
        'En décimal : 47 + 26 = 73 | En hexadécimal : 0x49.'
      ],
      result: 'Somme Hex = 0x49 | Décimal = 73 | Binaire = 01001001₂'
    },
    interpretation: 'Outil indispensable pour l’adressage mémoire, les codes couleurs et les trames réseau.',
    assumptions: 'Caractères valides en base 16.',
    limitations: 'Précision sur la division flottante.',
    faqs: [
      { question: 'Pourquoi 0xFF vaut 255 ?', answer: 'Car (15 × 16) + 15 = 240 + 15 = 255.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet hexadezimale Grundrechenarten (+, -, ×, ÷) und konvertiert zwischen Hexadezimal, Dezimal, Binär und Oktal.`,
    howToUse: [
      'Geben Sie Hex-Werte (0-9, A-F) ein.',
      'Wählen Sie die Rechenart und lesen Sie das Ergebnis in allen Zahlensystemen ab.'
    ],
    formula: 'Hexadezimalsystem: Basis 16 (0-9, A=10 bis F=15)',
    formulaVariables: [
      { name: 'Hex A', description: 'Erster Hex-Wert.', unit: 'Hex', optional: false },
      { name: 'Hex B', description: 'Zweiter Hex-Wert.', unit: 'Hex', optional: false }
    ],
    workedExample: {
      scenario: '0x2F + 0x1A addieren.',
      stepByStep: [
        'Dezimal: 47 + 26 = 73 | Hexadezimal = 0x49.'
      ],
      result: 'Hex-Summe = 0x49 | Dezimal = 73 | Binär = 01001001₂'
    },
    interpretation: 'Grundwerkzeug für Speicheradressen, Farbwerte (HTML/CSS) und Assembler.',
    assumptions: 'Gültige Hexadezimalzeichen.',
    limitations: 'Rundung bei Nachkommastellen.',
    faqs: [
      { question: 'Wie viele Bits hat eine Hex-Ziffer?', answer: 'Genau 4 Bits (ein Nibble oder Halbbyte).' }
    ],
    relatedTools
  })
});

// 7. GEOMETRIC SERIES (geometric-series)
export const GEOMETRIC_SERIES_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates the n-th term (a_n), finite partial sum (S_n), and infinite sum of convergence (S_∞) for geometric progressions.`,
    howToUse: [
      'Enter the initial first term (a₁).',
      'Enter the common ratio (r).',
      'Enter the number of terms (n) for finite series.',
      'Review computed n-th term, finite sum S_n, and infinite convergence sum if |r| < 1.'
    ],
    formula: 'n-th Term: a_n = a₁ × r^(n-1) | Finite Sum: S_n = a₁ × (1 - r^n) / (1 - r) | Infinite Sum: S_∞ = a₁ / (1 - r) for |r| < 1',
    formulaVariables: [
      { name: 'First Term (a₁)', description: 'Initial sequence value.', unit: 'Real Number', optional: false },
      { name: 'Common Ratio (r)', description: 'Multiplication factor between terms (r ≠ 1).', unit: 'Real Number', optional: false },
      { name: 'Number of Terms (n)', description: 'Total terms evaluated.', unit: 'Integer (n ≥ 1)', optional: false }
    ],
    workedExample: {
      scenario: 'A geometric series with first term a₁ = 3, common ratio r = 0.5, for n = 6 terms.',
      stepByStep: [
        'Calculate 6th Term: a₆ = 3 × (0.5)⁵ = 3 × 0.03125 = 0.09375.',
        'Finite Sum (S₆): 3 × (1 - 0.5⁶) / (1 - 0.5) = 3 × (1 - 0.015625) / 0.5 = 3 × 0.984375 / 0.5 = 5.90625.',
        'Infinite Sum (S_∞): Since |r| = 0.5 < 1, S_∞ = 3 / (1 - 0.5) = 3 / 0.5 = 6.000.'
      ],
      result: '6th Term = 0.09375 | Finite Sum (S₆) = 5.906 | Infinite Sum (S_∞) = 6.000 (Convergent)'
    },
    interpretation: 'Models compound financial growth, radioactive half-life decay, bouncing ball physics, and fractal geometry.',
    assumptions: 'Ratio r ≠ 1 for standard sum formula; infinite sum requires strict convergence condition |r| < 1.',
    limitations: 'If |r| ≥ 1, the infinite series diverges toward ±infinity.',
    faqs: [
      { question: 'When does an infinite geometric series converge?', answer: 'An infinite geometric series converges to a finite number if and only if the absolute value of the common ratio is strictly less than 1 (|r| < 1).' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب الحد النوني (a_n)، ومجموع المتتابعة الهندسية المنتهية (S_n)، ومجموع المتسلسلة الهندسية اللانهائية التقاربية (S_∞).`,
    howToUse: [
      'أدخل الحد الأول (a₁).',
      'أدخل أساس المتتالية الهندسية (r).',
      'أدخل عدد الحدود (n).',
      'اطلع على قيمة الحد الأخير ومجموع الحدود والمجموع اللانهائي عند التقارب.'
    ],
    formula: 'الحد النوني = a₁ × r^(n-1) | المجموع = a₁ × (1 - r^n) ÷ (1 - r) | اللانهائي = a₁ ÷ (1 - r)',
    formulaVariables: [
      { name: 'الحد الأول (a₁)', description: 'قيمة بداية المتتالية.', unit: 'عدد', optional: false },
      { name: 'الأساس (r)', description: 'معامل الضرب بين الحدود.', unit: 'عدد', optional: false },
      { name: 'عدد الحدود (n)', description: 'إجمالي الحدود.', unit: 'عدد صحيح', optional: false }
    ],
    workedExample: {
      scenario: 'متتالية هندسية حدها الأول 3 وأساسها 0.5 لعدد 6 حدود.',
      stepByStep: [
        'الحد السادس = 3 × (0.5)⁵ = 0.09375.',
        'مجموع 6 حدود = 3 × (1 - 0.5⁶) ÷ 0.5 = 5.90625.',
        'المجموع اللانهائي = 3 ÷ 0.5 = 6.0.'
      ],
      result: 'الحد السادس = 0.09375 | مجموع 6 حدود = 5.91 | المجموع اللانهائي = 6.00'
    },
    interpretation: 'تستخدم في حساب الفوائد المركبة وتلاشي الإشعاع ونظريات التقارب الرياضي.',
    assumptions: 'الأساس r ≠ 1؛ المتسلسلة تتقارب إذا كان |r| < 1.',
    limitations: 'إذا كان |r| ≥ 1 فإن المتسلسلة اللانهائية تتباعد.',
    faqs: [
      { question: 'متى تتقارب المتسلسلة الهندسية اللانهائية؟', answer: 'تتقارب المتسلسلة إذا كانت القيمة المطلقة لأساسها أقل تماماً من 1 (|r| < 1).' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el término n-ésimo, suma finita y suma infinita convergente de una progresión geométrica.`,
    howToUse: [
      'Ingrese el primer término (a₁), la razón común (r) y el número de términos (n).',
      'Consulte el término n-ésimo y las sumas parciales e infinitas.'
    ],
    formula: 'Término n: a_n = a₁ × r^(n-1) | Suma finita: S_n = a₁(1 - r^n)/(1 - r) | Suma infinita: a₁/(1 - r)',
    formulaVariables: [
      { name: 'Primer Término', description: 'Valor inicial.', unit: 'Real', optional: false },
      { name: 'Razón (r)', description: 'Factor multiplicador.', unit: 'Real', optional: false },
      { name: 'Términos (n)', description: 'Cantidad de términos.', unit: 'Entero', optional: false }
    ],
    workedExample: {
      scenario: 'Primer término 3, razón 0.5, n = 6 términos.',
      stepByStep: [
        'Término 6 = 0.09375 | Suma finita = 5.906 | Suma infinita = 6.00.'
      ],
      result: 'Término 6 = 0.09375 | Suma (S₆) = 5.906 | Suma Infinita = 6.000'
    },
    interpretation: 'Modela crecimiento compuesto, decaimiento radiactivo y fractales.',
    assumptions: 'Razón r ≠ 1; convergencia requiere |r| < 1.',
    limitations: 'Diverge hacia infinito si |r| ≥ 1.',
    faqs: [
      { question: '¿Qué es la razón geométrica?', answer: 'El cociente constante entre dos términos consecutivos de la serie.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} détermine le n-ième terme, la somme finie et la somme infinie convergente d'une suite géométrique.`,
    howToUse: [
      'Indiquez le premier terme (a₁), la raison géométrique (r) et le nombre de termes (n).',
      'Consultez les termes et sommes calculés.'
    ],
    formula: 'Terme n : a_n = a₁ × r^(n-1) | Somme finie : S_n = a₁(1 - r^n)/(1 - r) | Somme infinie : a₁/(1 - r)',
    formulaVariables: [
      { name: 'Premier terme (a₁)', description: 'Valeur initiale.', unit: 'Réel', optional: false },
      { name: 'Raison (r)', description: 'Facteur multiplicatif.', unit: 'Réel', optional: false },
      { name: 'Nombre de termes (n)', description: 'Nombre d’éléments.', unit: 'Entier', optional: false }
    ],
    workedExample: {
      scenario: 'Premier terme 3, raison 0,5, n = 6 termes.',
      stepByStep: [
        'Terme 6 = 0,09375 | Somme finie = 5,906 | Somme infinie = 6,00.'
      ],
      result: 'Terme 6 = 0,09375 | Somme = 5,906 | Somme Infinie = 6,000'
    },
    interpretation: 'Indispensable pour l’analyse des intérêts composés et les processus d’atténuation physique.',
    assumptions: 'Raison r ≠ 1 ; convergence si |r| < 1.',
    limitations: 'La série diverge si la raison est supérieure ou égale à 1.',
    faqs: [
      { question: 'Quand une suite géométrique converge-t-elle ?', answer: 'Lorsque la valeur absolue de sa raison est strictement inférieure à 1.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet das n-te Glied, die endliche Partialsumme und den Grenzwert (Reihensumme) einer geometrischen Folge.`,
    howToUse: [
      'Geben Sie das Anfangsglied (a₁), den Quotienten (r) und die Anzahl der Glieder (n) ein.',
      'Lesen Sie das n-te Glied und die Summen ab.'
    ],
    formula: 'n-tes Glied: a_n = a₁ × r^(n-1) | Endliche Summe: S_n = a₁(1 - r^n)/(1 - r) | Grenzwert: a₁/(1 - r)',
    formulaVariables: [
      { name: 'Anfangsglied (a₁)', description: 'Startwert.', unit: 'Reell', optional: false },
      { name: 'Quotient (r)', description: 'Multiplikationsfaktor.', unit: 'Reell', optional: false },
      { name: 'Glieder (n)', description: 'Anzahl Terme.', unit: 'Ganzzahl', optional: false }
    ],
    workedExample: {
      scenario: 'Anfangsglied 3, Quotient 0,5, n = 6 Glieder.',
      stepByStep: [
        '6. Glied = 0,09375 | Endliche Summe = 5,906 | Grenzwert = 6,00.'
      ],
      result: '6. Glied = 0,09375 | Summe (S₆) = 5,906 | Reihenwert = 6,000'
    },
    interpretation: 'Modelliert Zinseszinswachstum, radioaktiven Zerfall und Dämpfungsvorgänge.',
    assumptions: 'Quotient r ≠ 1; Konvergenz nur für |r| < 1.',
    limitations: 'Für |r| ≥ 1 divergiert die unendliche Reihe.',
    faqs: [
      { question: 'Was ist der Quotient einer geometrischen Reihe?', answer: 'Der konstante Faktor, mit dem jedes Glied multipliziert wird, um das nächste zu erhalten.' }
    ],
    relatedTools
  })
});

// 8. ARITHMETIC SERIES (arithmetic-series)
export const ARITHMETIC_SERIES_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} solves arithmetic progressions, computing the n-th term (a_n), common difference (d), and total arithmetic series sum (S_n).`,
    howToUse: [
      'Enter the first initial term (a₁).',
      'Enter the common difference (d).',
      'Enter the total number of terms (n).',
      'Review computed n-th term and cumulative sum (S_n).'
    ],
    formula: 'n-th Term: a_n = a₁ + (n - 1) × d | Series Sum: S_n = (n / 2) × [2a₁ + (n - 1) × d] = (n / 2) × (a₁ + a_n)',
    formulaVariables: [
      { name: 'First Term (a₁)', description: 'Starting value of the progression.', unit: 'Real Number', optional: false },
      { name: 'Common Difference (d)', description: 'Constant step added between terms.', unit: 'Real Number', optional: false },
      { name: 'Number of Terms (n)', description: 'Total terms count.', unit: 'Integer (n ≥ 1)', optional: false }
    ],
    workedExample: {
      scenario: 'An arithmetic progression starting at a₁ = 5 with common difference d = 3 for n = 20 terms.',
      stepByStep: [
        'Calculate 20th Term: a₂₀ = 5 + (20 - 1) × 3 = 5 + (19 × 3) = 5 + 57 = 62.',
        'Calculate Total Sum (S₂₀): (20 / 2) × (5 + 62) = 10 × 67 = 670.'
      ],
      result: '20th Term (a₂₀) = 62 | Total Series Sum (S₂₀) = 670'
    },
    interpretation: 'Applicable to linear financial depreciation schedules, recurring installment repayments, and laddered inventory scheduling.',
    assumptions: 'Constant additive difference between all consecutive terms.',
    limitations: 'Calculates finite sequences; infinite arithmetic series always diverge unless a₁ = 0 and d = 0.',
    faqs: [
      { question: 'What is Gauss’s formula for arithmetic series sum?', answer: 'Sum = (n / 2) × (first term + last term).' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب الحد النوني (a_n)، وأساس المتتابعة الحسابية (d)، ومجموع حدود المتسلسلة الحسابية (S_n).`,
    howToUse: [
      'أدخل الحد الأول (a₁).',
      'أدخل أساس المتتالية الحسابية (d).',
      'أدخل عدد الحدود (n).',
      'اطلع على قيمة الحد الأخير والمجموع التراكمي لجميع الحدود.'
    ],
    formula: 'الحد النوني = a₁ + (n - 1) × d | المجموع = (n ÷ 2) × (الحد الأول + الحد الأخير)',
    formulaVariables: [
      { name: 'الحد الأول (a₁)', description: 'بداية المتتالية.', unit: 'عدد', optional: false },
      { name: 'الأساس (d)', description: 'الفرق الثابت المضاف بين كل حدين.', unit: 'عدد', optional: false },
      { name: 'عدد الحدود (n)', description: 'عدد الحدود المطلوب حسابها.', unit: 'عدد صحيح', optional: false }
    ],
    workedExample: {
      scenario: 'متتالية حسابية تبدأ من 5 بأساس 3 لعدد 20 حداً.',
      stepByStep: [
        'الحد العشرون = 5 + (19 × 3) = 62.',
        'مجموع 20 حداً = (20 ÷ 2) × (5 + 62) = 10 × 67 = 670.'
      ],
      result: 'الحد العشرون = 62 | مجموع المتسلسلة = 670'
    },
    interpretation: 'تفيد في جدولة الأقساط الدورية المنتظمة وحساب الاستهلاك الخطي.',
    assumptions: 'فرق حسابي ثابت ومستمر بين الحدود.',
    limitations: 'تطبق على المتتاليات المنتهية.',
    faqs: [
      { question: 'ما هي صيغة غاوس لحساب مجموع المتتالية الحسابية؟', answer: 'المجموع = (عدد الحدود ÷ 2) × (الحد الأول + الحد الأخير).' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} resuelve progresiones aritméticas, calculando el término n-ésimo (a_n), diferencia común (d) y la suma total (S_n).`,
    howToUse: [
      'Ingrese el primer término (a₁), la diferencia común (d) y el número de términos (n).',
      'Consulte el término n-ésimo y la suma acumulada.'
    ],
    formula: 'Término n: a_n = a₁ + (n - 1)d | Suma: S_n = (n/2)(a₁ + a_n)',
    formulaVariables: [
      { name: 'Primer Término', description: 'Valor inicial.', unit: 'Real', optional: false },
      { name: 'Diferencia (d)', description: 'Incremento constante.', unit: 'Real', optional: false },
      { name: 'Términos (n)', description: 'Total de términos.', unit: 'Entero', optional: false }
    ],
    workedExample: {
      scenario: 'Primer término 5, diferencia 3, n = 20 términos.',
      stepByStep: [
        'Término 20 = 5 + 19(3) = 62 | Suma = (20/2)(5 + 62) = 670.'
      ],
      result: 'Término 20 = 62 | Suma Total (S₂₀) = 670'
    },
    interpretation: 'Aplica a amortizaciones lineales y pagos periódicos fijos.',
    assumptions: 'Diferencia aditiva constante.',
    limitations: 'Series infinitas con d≠0 son divergentes.',
    faqs: [
      { question: '¿Cómo hallar la diferencia común?', answer: 'Restando cualquier término de su término posterior: d = a_{n} - a_{n-1}.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} résout les suites arithmétiques en calculant le n-ième terme (a_n), la raison arithmétique (d) et la somme totale (S_n).`,
    howToUse: [
      'Indiquez le premier terme (a₁), la raison (d) et le nombre de termes (n).',
      'Consultez le terme n-ième et la somme arithmétique.'
    ],
    formula: 'Terme n : a_n = a₁ + (n - 1)d | Somme : S_n = (n/2)(a₁ + a_n)',
    formulaVariables: [
      { name: 'Premier terme', description: 'Valeur de départ.', unit: 'Réel', optional: false },
      { name: 'Raison (d)', description: 'Incrément constant.', unit: 'Réel', optional: false },
      { name: 'Nombre de termes (n)', description: 'Effectif.', unit: 'Entier', optional: false }
    ],
    workedExample: {
      scenario: 'Premier terme 5, raison 3, n = 20 termes.',
      stepByStep: [
        'Terme 20 = 5 + 19(3) = 62 | Somme = 10 × (5 + 62) = 670.'
      ],
      result: 'Terme 20 = 62 | Somme (S₂₀) = 670'
    },
    interpretation: 'Utilisé pour planifier des échéances de paiement ou des progressions linéaires.',
    assumptions: 'Raison constante.',
    limitations: 'Les séries arithmétiques infinies divergent toujours (pour d ≠ 0).',
    faqs: [
      { question: 'Quelle est la formule de somme de Gauss ?', answer: 'Somme = (Nombre de termes / 2) × (Premier terme + Dernier terme).' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet das n-te Glied (a_n), die Differenz (d) und die Gesamtsumme (S_n) arithmetischer Zahlenfolgen.`,
    howToUse: [
      'Geben Sie das Anfangsglied (a₁), die Differenz (d) und die Gliederanzahl (n) ein.',
      'Lesen Sie das n-te Glied und die Gesamtsumme ab.'
    ],
    formula: 'n-tes Glied: a_n = a₁ + (n - 1)d | Summe: S_n = (n/2)(a₁ + a_n)',
    formulaVariables: [
      { name: 'Anfangsglied', description: 'Erster Wert.', unit: 'Reell', optional: false },
      { name: 'Differenz (d)', description: 'Konstante Schrittweite.', unit: 'Reell', optional: false },
      { name: 'Glieder (n)', description: 'Anzahl der Glieder.', unit: 'Ganzzahl', optional: false }
    ],
    workedExample: {
      scenario: 'Startwert 5, Differenz 3, n = 20 Glieder.',
      stepByStep: [
        '20. Glied = 5 + 19×3 = 62 | Summe = 10 × (5 + 62) = 670.'
      ],
      result: '20. Glied = 62 | Gesamtsumme (S₂₀) = 670'
    },
    interpretation: 'Grundlegend für lineare Ratenpläne, lineare Abschreibungen und Staffelungen.',
    assumptions: 'Konstanter additiver Abstand.',
    limitations: 'Gilt nur für endliche Folgen.',
    faqs: [
      { question: 'Wie lautet die Gaußsche Summenformel?', answer: 'Summe = (Anzahl / 2) × (erstes Glied + letztes Glied).' }
    ],
    relatedTools
  })
});

// 9. ROOT MEAN SQUARE (root-mean-square)
export const ROOT_MEAN_SQUARE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates the Root Mean Square (RMS / quadratic mean), peak-to-peak amplitude, and AC effective voltage/current for engineering datasets and waveforms.`,
    howToUse: [
      'Enter numerical dataset values separated by commas or spaces, OR enter peak amplitude for standard waveforms (sine, square, triangle).',
      'Review computed RMS value, arithmetic mean, and peak-to-RMS crest factor.'
    ],
    formula: 'Discrete RMS: x_rms = √[ (1 / n) × Σ (x_i)² ] | Sine Wave RMS: V_rms = V_peak / √2 ≈ 0.7071 × V_peak',
    formulaVariables: [
      { name: 'Values (x_i)', description: 'Numerical dataset elements or voltage samples.', unit: 'Real Numbers', optional: false }
    ],
    workedExample: {
      scenario: 'Calculate RMS for a sample dataset: [2, -4, 6, -8].',
      stepByStep: [
        'Square each value: 2²=4, (-4)²=16, 6²=36, (-8)²=64.',
        'Calculate Mean of Squares: (4 + 16 + 36 + 64) / 4 = 120 / 4 = 30.0.',
        'Take Square Root: √30.0 ≈ 5.4772.'
      ],
      result: 'RMS Value = 5.48 | Arithmetic Mean = -1.00 | Mean of Squares = 30.00'
    },
    interpretation: 'RMS measures the equivalent DC effective heating power of alternating electrical currents and signal strength in acoustics and vibration analysis.',
    assumptions: 'Equally weighted sample intervals.',
    limitations: 'Calculates discrete sample RMS; non-sinusoidal waveforms require true RMS integration.',
    faqs: [
      { question: 'Why is RMS used for AC electrical voltage?', answer: 'RMS voltage produces the exact same heating power in a resistor as a DC voltage of the identical numerical value.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب الجذر التربيعي لمتوسط المربعات (RMS أو المتوسط التربيعي)، والجهد الفعال للتيار المتردد (AC)، ومعامل الذروة للإشارات الهندسية.`,
    howToUse: [
      'أدخل الأرقام مفصولة بفواصل أو مسافات، أو أدخل سعة الذروة للموجة.',
      'اطلع على القيمة الفعالة RMS والوسط الحسابي ومتوسط المربعات.'
    ],
    formula: 'القيمة الفعالة RMS = √[ (1 ÷ n) × مجموع (س)² ]',
    formulaVariables: [
      { name: 'القيم', description: 'عينات الإشارة أو الأرقام.', unit: 'أرقام', optional: false }
    ],
    workedExample: {
      scenario: 'حساب RMS للقيم: [2, -4, 6, -8].',
      stepByStep: [
        'المربعات: 4 + 16 + 36 + 64 = 120.',
        'متوسط المربعات = 120 ÷ 4 = 30.0.',
        'الجذر التربيعي = √30.0 = 5.48.'
      ],
      result: 'قيمة RMS = 5.48 | متوسط المربعات = 30.00'
    },
    interpretation: 'تقيس القدرة الكهربائية الفعالة للتيار المتناوب وقوة الإشارات الصوتية والاهتزازات.',
    assumptions: 'عينات متساوية الوزن الزمني.',
    limitations: 'الموجات المعقدة تتطلب تكاملاً حقيقياً للقيمة الفعالة (True RMS).',
    faqs: [
      { question: 'لماذا نستخدم RMS في الكهرباء المنزلية؟', answer: 'لأن جهد 220V RMS المتردد يعطي نفس قدرة التسخين والإنارة تماماً لجهد 220V مستمر DC.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el Valor Eficaz o Media Cuadrática (RMS), factor de cresta y voltaje efectivo de señales y datos continuos.`,
    howToUse: [
      'Ingrese los valores numéricos separados por comas.',
      'Consulte el valor RMS eficaz y el promedio de cuadrados.'
    ],
    formula: 'RMS: x_rms = √[ (1 / n) × Σ (x_i)² ]',
    formulaVariables: [
      { name: 'Valores', description: 'Muestras de la señal.', unit: 'Reales', optional: false }
    ],
    workedExample: {
      scenario: 'Calcular RMS para [2, -4, 6, -8].',
      stepByStep: [
        'Suma de cuadrados = 4 + 16 + 36 + 64 = 120 | Media = 30.0 | RMS = √30.0 = 5.48.'
      ],
      result: 'Valor RMS = 5.48 | Media de Cuadrados = 30.00'
    },
    interpretation: 'Mide la potencia disipada equivalente en corriente alterna y vibraciones.',
    assumptions: 'Muestreo uniforme.',
    limitations: 'Ondas armónicas complejas requieren medición True RMS.',
    faqs: [
      { question: '¿Cómo se relaciona RMS con la tensión de red eléctrica?', answer: 'La tensión nominal doméstica (ej. 230V) es un valor RMS eficaz.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule la valeur efficace (RMS / moyenne quadratique), la tension efficace alternative et le facteur de crête pour séries et signaux.`,
    howToUse: [
      'Saisissez les valeurs numériques de l’échantillon.',
      'Consultez la valeur efficace RMS et la moyenne des carrés.'
    ],
    formula: 'Valeur efficace RMS : x_rms = √[ (1 / n) × Σ (x_i)² ]',
    formulaVariables: [
      { name: 'Échantillons', description: 'Valeurs scalaires.', unit: 'Réels', optional: false }
    ],
    workedExample: {
      scenario: 'Calculer le RMS de [2, -4, 6, -8].',
      stepByStep: [
        'Moyenne des carrés = 120 / 4 = 30,0 | Racine carrée = 5,48.'
      ],
      result: 'Valeur RMS = 5,48 | Moyenne des carrés = 30,00'
    },
    interpretation: 'Indicateur fondamental de la puissance thermique dissipée en électricité et acoustique.',
    assumptions: 'Échantillonnage équidistant.',
    limitations: 'Les signaux distordus exigent un calcul True-RMS intégral.',
    faqs: [
      { question: 'Pourquoi utiliser la valeur RMS ?', answer: 'Car elle traduit l’énergie thermique réelle d’un courant alternatif équivalent à un courant continu.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet den quadratischen Mittelwert (Effektivwert / Root Mean Square - RMS), Scheitelfaktor und Wechselstrom-Effektivspannung.`,
    howToUse: [
      'Geben Sie Messwerte ein oder wählen Sie eine Wellenform.',
      'Lesen Sie den RMS-Effektivwert ab.'
    ],
    formula: 'RMS: x_rms = √[ (1 / n) × Σ (x_i)² ]',
    formulaVariables: [
      { name: 'Messwerte', description: 'Reelle Zahlenwerte.', unit: 'Reell', optional: false }
    ],
    workedExample: {
      scenario: 'RMS für [2, -4, 6, -8] ermitteln.',
      stepByStep: [
        'Quadratsumme = 120 | Mittelwert = 30,0 | RMS = √30,0 = 5,48.'
      ],
      result: 'Effektivwert (RMS) = 5,48 | Quadratmittel = 30,00'
    },
    interpretation: 'Gibt die thermisch wirksame elektrische Leistung von Wechselspannungen und Schwingungen an.',
    assumptions: 'Gleichmäßige Abtastung.',
    limitations: 'Verzerrte Signale erfordern True-RMS-Integration.',
    faqs: [
      { question: 'Was ist die Netzspannung von 230V?', answer: 'Die 230 Volt aus der Haushaltssteckdose sind ein RMS-Effektivwert.' }
    ],
    relatedTools
  })
});

// 10. PERCENTAGE OF TOTAL (percentage-of-total)
export const PERCENTAGE_OF_TOTAL_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates the exact percentage share that a specific part represents relative to a whole total, solving percentage distribution breakdowns.`,
    howToUse: [
      'Enter the part / portion value.',
      'Enter the total / whole value (must not be zero).',
      'Review computed percentage share (%), remainder share, and ratio.'
    ],
    formula: 'Percentage of Total (%) = (Part / Total) × 100',
    formulaVariables: [
      { name: 'Part Value', description: 'Portion or component being measured.', unit: 'Real Number', optional: false },
      { name: 'Total Value', description: 'Complete whole reference value (Total ≠ 0).', unit: 'Real Number', optional: false }
    ],
    workedExample: {
      scenario: 'Find what percentage $450 represents out of a $1,800 monthly marketing budget.',
      stepByStep: [
        'Divide part by total: 450 / 1,800 = 0.25.',
        'Multiply by 100: 0.25 × 100 = 25.0%.'
      ],
      result: 'Share = 25.00% | Remainder = 75.00% | Fraction = 1/4'
    },
    interpretation: 'Fundamental tool for budget allocation, market share analysis, survey breakdowns, and portfolio weighting.',
    assumptions: 'Total reference value is non-zero.',
    limitations: 'Percentages exceeding 100% indicate the part is larger than the baseline total.',
    faqs: [
      { question: 'Can percentage of total exceed 100%?', answer: 'Yes, if the measured part exceeds the baseline reference total (e.g., $150 revenue against a $100 baseline target is 150%).' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب النسبة المئوية للجزء من الكل، وتوزيع الحصص النسبية للميزانيات والمبيعات والمؤشرات الإحصائية.`,
    howToUse: [
      'أدخل قيمة الجزء (الكمية المراد معرفة نسبتها).',
      'أدخل قيمة الإجمالي الكلي (غير صفري).',
      'اطلع على النسبة المئوية المحسوبة ونسبة المتبقي.'
    ],
    formula: 'النسبة المئوية = (الجزء ÷ الكل) × 100',
    formulaVariables: [
      { name: 'قيمة الجزء', description: 'المقدار الجزئي.', unit: 'عدد', optional: false },
      { name: 'الإجمالي الكلي', description: 'القيمة الكلية المرجعية.', unit: 'عدد', optional: false }
    ],
    workedExample: {
      scenario: 'حساب نسبة 450 دولار من ميزانية إجمالية قدرها 1,800 دولار.',
      stepByStep: [
        '450 ÷ 1,800 = 0.25.',
        '0.25 × 100 = 25.0%.'
      ],
      result: 'نسبة الجزء = 25.00% | المتبقي = 75.00%'
    },
    interpretation: 'تفيد في تحليل الحصص السوقية وتوزيع بنود الميزانية المالية.',
    assumptions: 'الإجمالي لا يساوي الصفر.',
    limitations: 'النسب فوق 100% تعني أن الجزء أكبر من القيمة المرجعية.',
    faqs: [
      { question: 'هل يمكن أن تتجاوز النسبة 100%؟', answer: 'نعم، إذا كانت القيمة الجزئية أكبر من الهدف أو الإجمالي الأساسي.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el porcentaje que representa una parte respecto al total general y la proporción restante.`,
    howToUse: [
      'Ingrese el valor de la parte y el total general.',
      'Consulte el porcentaje (%) resultante.'
    ],
    formula: 'Porcentaje (%) = (Parte / Total) × 100',
    formulaVariables: [
      { name: 'Parte', description: 'Cantidad parcial.', unit: 'Número', optional: false },
      { name: 'Total', description: 'Referencia total.', unit: 'Número', optional: false }
    ],
    workedExample: {
      scenario: 'Calcular qué porcentaje representan 450€ de 1.800€.',
      stepByStep: [
        '(450 / 1.800) × 100 = 0.25 × 100 = 25%.'
      ],
      result: 'Porcentaje = 25.00% | Resto = 75.00%'
    },
    interpretation: 'Herramienta clave para distribución de presupuestos y cuota de mercado.',
    assumptions: 'Total no nulo.',
    limitations: 'Valores >100% indican que la parte supera al total.',
    faqs: [
      { question: '¿Cómo calcular la cuota de mercado?', answer: 'Ventas de la empresa divididas entre las ventas totales del sector multiplicadas por 100.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} détermine la part en pourcentage d'une valeur partielle par rapport à un total global.`,
    howToUse: [
      'Indiquez la valeur de la partie et le total de référence.',
      'Consultez la part en pourcentage et le reliquat.'
    ],
    formula: 'Pourcentage (%) = (Partie / Total) × 100',
    formulaVariables: [
      { name: 'Partie', description: 'Valeur observée.', unit: 'Nombre', optional: false },
      { name: 'Total', description: 'Ensemble de référence (≠ 0).', unit: 'Nombre', optional: false }
    ],
    workedExample: {
      scenario: 'Calculer la part de 450 € sur un total de 1 800 €.',
      stepByStep: [
        '(450 / 1 800) × 100 = 25,0 %.'
      ],
      result: 'Part = 25,00 % | Reste = 75,00 %'
    },
    interpretation: 'Indispensable pour l’analyse budgétaire et la répartition des parts de marché.',
    assumptions: 'Total différent de zéro.',
    limitations: 'Peut dépasser 100 % si la partie dépasse la référence.',
    faqs: [
      { question: 'Comment calculer une proportion ?', answer: 'En divisant la sous-population par la population totale.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet den prozentualen Anteil eines Teilwerts am Gesamtwert sowie den verbleibenden Restanteil.`,
    howToUse: [
      'Geben Sie den Teilwert und den Gesamtwert ein.',
      'Lesen Sie den prozentualen Anteil ab.'
    ],
    formula: 'Prozentsatz (%) = (Teilwert / Gesamtwert) × 100',
    formulaVariables: [
      { name: 'Teilwert', description: 'Anteilige Größe.', unit: 'Zahl', optional: false },
      { name: 'Gesamtwert', description: 'Bezugsgröße (≠ 0).', unit: 'Zahl', optional: false }
    ],
    workedExample: {
      scenario: '450 € Anteil an 1.800 € Gesamtbudget berechnen.',
      stepByStep: [
        '(450 / 1.800) × 100 = 25,0 %.'
      ],
      result: 'Anteil = 25,00 % | Rest = 75,00 %'
    },
    interpretation: 'Grundoperation für Budgetverteilung, Marktanteile und Auswertungen.',
    assumptions: 'Gesamtwert ungleich null.',
    limitations: 'Werte über 100 % treten auf, wenn der Teilwert größer als die Basis ist.',
    faqs: [
      { question: 'Wie berechnet man den Marktanteil?', answer: 'Eigener Umsatz geteilt durch den Gesamtmarktumsatz mal 100.' }
    ],
    relatedTools
  })
});

export const BATCH3_MATH_HANDLERS: Record<string, Record<Language, KnowledgeHandler>> = {
  'standard-deviation-calc': STANDARD_DEVIATION_KNOWLEDGE,
  'percentile-calc': PERCENTILE_CALC_KNOWLEDGE,
  'fraction-to-percent': FRACTION_TO_PERCENT_KNOWLEDGE,
  'modulo-calc': MODULO_CALC_KNOWLEDGE,
  'binary-addition': BINARY_ADDITION_KNOWLEDGE,
  'hex-calculator': HEX_CALCULATOR_KNOWLEDGE,
  'geometric-series': GEOMETRIC_SERIES_KNOWLEDGE,
  'arithmetic-series': ARITHMETIC_SERIES_KNOWLEDGE,
  'root-mean-square': ROOT_MEAN_SQUARE_KNOWLEDGE,
  'percentage-of-total': PERCENTAGE_OF_TOTAL_KNOWLEDGE,
};
