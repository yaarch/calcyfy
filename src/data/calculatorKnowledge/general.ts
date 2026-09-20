import { ToolContentDetails } from './types';
import { ToolDef, Language } from '../../types';

// 1. PERCENTAGE CALCULATOR
export const PERCENTAGE_KNOWLEDGE: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails> = {
  en: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'A percentage calculator solves three fundamental proportion questions: finding a percentage of a number, determining what percentage one number is of another, and calculating percentage increase or decrease between two values.',
    whoUsesIt: 'Students, shoppers calculating sale discounts, accountants evaluating margins, and analysts comparing statistical shifts.',
    whatItCalculates: 'Direct percentage value, ratio percentage, and relative change (increase or decrease) between baseline and final figures.',
    howToUse: [
      'Enter the percentage rate or primary numerator quantity.',
      'Enter the base reference number.',
      'Review the calculated percentage share, ratio, and relative change.',
    ],
    formula: 'P% of X = (P / 100) × X  |  Change % = ((New - Old) / Old) × 100%',
    inputs: [
      { name: 'Percentage (%) or Value A', description: 'The rate per hundred or primary numerator value.', unit: 'Number / %', optional: false },
      { name: 'Base Number (Value B)', description: 'The reference denominator or baseline comparison number.', unit: 'Number', optional: false },
    ],
    workedExample: {
      scenario: 'Calculating 15% tip or discount on an $80 purchase.',
      stepByStep: [
        'Divide the percentage by 100: 15 ÷ 100 = 0.15.',
        'Multiply by the base amount: 0.15 × 80 = 12.',
        'Final percentage value: $12.',
      ],
      result: '15% of $80 equals $12.',
    },
    assumptions: 'Calculations use exact decimal proportions where 100% corresponds to 1.0.',
    limitations: 'Percentages cannot be calculated with a baseline denominator of zero (division by zero is undefined).',
    faqs: [
      {
        question: 'How do you calculate percentage increase or decrease?',
        answer: 'Subtract the original value from the new value, divide the difference by the original value, and multiply by 100. A positive result is an increase; a negative result is a decrease.',
      },
      {
        question: 'Why does a 50% increase followed by a 50% decrease not return to the original number?',
        answer: 'Because the base changes. If you increase $100 by 50%, you get $150. A subsequent 50% decrease applies to $150, reducing it by $75 to $75.',
      },
    ],
    relatedTools,
  }),
  ar: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'حاسبة النسبة المئوية تحل العمليات الرياضية الشائعة للنسب المئوية: حساب نسبة معينة من رقم، معرفة نسبة عدد من عدد آخر، ومعدل الزيادة أو النقصان المئوي.',
    whoUsesIt: 'الطلاب، المتسوقون لمعرفة الخصومات، والمحاسبون لحساب الهوامش والضرائب.',
    whatItCalculates: 'قيمة النسبة، النسبة المئوية بين رقمين، ونسبة التغير بالزيادة أو النقصان.',
    howToUse: [
      'أدخل النسبة المئوية أو القيمة الجزئية.',
      'أدخل الرقم الأساسي (المرجعي).',
      'استعرض النتيجة المحسوبة ونسبة التغير.',
    ],
    formula: 'النسبة = (الجزء ÷ الكل) × 100%  |  نسبة التغير = ((القيمة الجديدة - القديمة) ÷ القديمة) × 100%',
    inputs: [
      { name: 'النسبة أو القيمة الجزئية', description: 'الرقم المراد حساب نسبته أو النسبة المطلوبة.', unit: 'رقم / %', optional: false },
      { name: 'الرقم الأساسي (الإجمالي)', description: 'القيمة المرجعية الكلية للعملية.', unit: 'رقم', optional: false },
    ],
    workedExample: {
      scenario: 'حساب 15% من فاتورة بقيمة 80.',
      stepByStep: ['تحويل النسبة إلى كسر عشري: 15 ÷ 100 = 0.15.', 'الضرب في الأساس: 0.15 × 80 = 12.'],
      result: '15% من 80 تساوي 12.',
    },
    faqs: [
      { question: 'كيف تحسب نسبة الخصم؟', answer: 'اضرب السعر الأصلي في نسبة الخصم مقسومة على 100، ثم اطرح الناتج من السعر الأصلي.' },
    ],
    relatedTools,
  }),
  es: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'La calculadora de porcentajes resuelve rápidamente el porcentaje de una cantidad, la proporción relativa entre dos números y el porcentaje de aumento o disminución.',
    whoUsesIt: 'Estudiantes, compradores para calcular rebajas y profesionales para analizar márgenes.',
    whatItCalculates: 'Valor porcentual, proporción sobre el total y tasa de variación porcentual.',
    howToUse: [
      'Introduzca el porcentaje o valor a calcular.',
      'Indique la cantidad de base o referencia.',
      'Consulte el resultado porcentual obtenido y la variación.',
    ],
    formula: 'P% de X = (P / 100) × X  |  Variación % = ((Nuevo - Original) / Original) × 100%',
    inputs: [
      { name: 'Porcentaje (%) o Valor', description: 'Tasa o valor que se desea calcular.', unit: 'Número o %', optional: false },
      { name: 'Cantidad base', description: 'Número de referencia sobre el que se aplica el cálculo.', unit: 'Número', optional: false },
    ],
    workedExample: {
      scenario: 'Calcular el 15% de 80.',
      stepByStep: ['15 / 100 = 0,15.', '0,15 × 80 = 12.'],
      result: 'El 15% de 80 es 12.',
    },
    faqs: [
      { question: '¿Cómo calcular el porcentaje de incremento?', answer: 'Reste el valor inicial al valor final, divida el resultado entre el valor inicial y multiplique por 100.' },
    ],
    relatedTools,
  }),
  fr: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Le calculateur de pourcentage permet de calculer rapidement la fraction d’un montant, la part relative entre deux nombres et le taux de variation (hausse ou baisse).',
    whoUsesIt: 'Étudiants, consommateurs pendant les soldes, et gestionnaires évaluant des marges commerciales.',
    whatItCalculates: 'Valeur du pourcentage, ratio proportionnel et taux d’évolution.',
    howToUse: [
      'Indiquez le pourcentage ou le montant partiel.',
      'Saisissez le nombre ou montant de base.',
      'Obtenez immédiatement la valeur calculée et l’évolution.',
    ],
    formula: 'P% de X = (P / 100) × X  |  Variation % = ((Nouveau - Ancien) / Ancien) × 100%',
    inputs: [
      { name: 'Pourcentage (%) ou Valeur', description: 'Taux ou valeur à appliquer.', unit: 'Nombre / %', optional: false },
      { name: 'Nombre de référence', description: 'Montant de base sur lequel s’applique le calcul.', unit: 'Nombre', optional: false },
    ],
    workedExample: {
      scenario: 'Calculer 15 % de 80.',
      stepByStep: ['15 ÷ 100 = 0,15.', '0,15 × 80 = 12.'],
      result: '15 % de 80 équivaut à 12.',
    },
    faqs: [
      { question: 'Comment calculer une hausse en pourcentage ?', answer: 'Soustrayez la valeur initiale de la valeur finale, divisez par la valeur initiale et multipliez par 100.' },
    ],
    relatedTools,
  }),
  de: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Der Prozentrechner berechnet prozentuale Anteile von Zahlen, den prozentualen Zusammenhang zweier Werte sowie prozentuale Steigerungen und Nachlässe.',
    whoUsesIt: 'Schüler, Schnäppchenjäger beim Einkaufen und Kaufleute zur Margenberechnung.',
    whatItCalculates: 'Prozentwert, Prozentsatz und prozentuale Veränderung.',
    howToUse: [
      'Tragen Sie den Prozentsatz oder Teilwert ein.',
      'Geben Sie den Bezugs- oder Grundwert ein.',
      'Lesen Sie den berechneten Prozentwert und die Steigerung bzw. Minderung ab.',
    ],
    formula: 'Prozentwert = (Prozentsatz / 100) × Grundwert',
    inputs: [
      { name: 'Prozentsatz (%) oder Wert', description: 'Gewünschter Prozentsatz oder Teilwert.', unit: 'Zahl / %', optional: false },
      { name: 'Grundwert', description: 'Basiswert, auf den sich die Berechnung bezieht.', unit: 'Zahl', optional: false },
    ],
    workedExample: {
      scenario: 'Berechnung von 15 % auf einen Betrag von 80.',
      stepByStep: ['15 ÷ 100 = 0,15.', '0,15 × 80 = 12.'],
      result: '15 % von 80 ergeben 12.',
    },
    faqs: [
      { question: 'Wie berechnet man eine prozentuale Erhöhung?', answer: 'Differenz aus neuem und altem Wert berechnen, durch den alten Wert teilen und mit 100 multiplizieren.' },
    ],
    relatedTools,
  }),
};

// 2. BMI CALCULATOR
export const BMI_KNOWLEDGE: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails> = {
  en: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Body Mass Index (BMI) is a screening metric that evaluates weight relative to height, categorizing adult weight status into underweight, normal weight, overweight, and obesity.',
    whoUsesIt: 'Adults assessing weight status, fitness trainers tracking client baseline metrics, and healthcare providers conducting initial anthropometric screenings.',
    whatItCalculates: 'Calculated BMI value (kg/m²), standard adult weight category, and the reference healthy weight range for the specified height.',
    howToUse: [
      'Select metric (cm, kg) or imperial (ft, lbs) measurement units.',
      'Enter your standing height and current body weight.',
      'Review your calculated BMI value, adult weight category, visual gauge, and reference weight range.',
    ],
    formula: 'BMI = weight (kg) ÷ height² (m)  |  Imperial: [703 × weight (lb)] ÷ height² (in)',
    formulaVariables: [
      { symbol: 'weight', explanation: 'Body mass measured in kilograms (kg) or pounds (lb)' },
      { symbol: 'height', explanation: 'Standing height measured in meters (m) or inches (in)' },
    ],
    inputs: [
      { name: 'Weight', description: 'Current body mass in kilograms (kg) or pounds (lb).', unit: 'kg or lb', optional: false },
      { name: 'Height', description: 'Standing height in centimeters (cm) or feet/inches.', unit: 'cm or ft/in', optional: false },
    ],
    workedExample: {
      scenario: 'An adult weighing 70 kg with a height of 175 cm (1.75 m).',
      stepByStep: [
        'Square the height in meters: 1.75 × 1.75 = 3.0625 m².',
        'Divide body weight by height squared: 70 ÷ 3.0625 = 22.86 kg/m².',
        'Compare to adult weight categories: 18.5 to 24.9 is classified as Normal Weight.',
      ],
      result: 'BMI = 22.9 kg/m² (Normal weight category; reference weight range: 56.7 kg to 76.3 kg).',
    },
    understandingResults: 'Standard categories for adults: Underweight (< 18.5), Normal weight (18.5 – 24.9), Overweight (25.0 – 29.9), and Obesity (≥ 30.0). These do not apply to children or teens.',
    assumptions: 'Applicable to non-pregnant adults aged 20 and older. The formula does not directly differentiate between muscle mass, bone density, and adipose tissue.',
    limitations: 'BMI is a statistical screening measure, not a clinical diagnostic tool. It can misclassify muscular athletes as overweight and older adults with sarcopenia as normal weight. Consult a physician for individualized health assessment.',
    faqs: [
      {
        question: 'What is a normal BMI?',
        answer: 'For adults aged 20 and older, a normal BMI is between 18.5 and 24.9 kg/m².',
      },
      {
        question: 'Does BMI measure body fat?',
        answer: 'No. BMI only evaluates weight relative to height and does not directly measure body fat percentage or fat distribution.',
      },
      {
        question: 'Is BMI accurate for everyone?',
        answer: 'No. BMI is a screening metric and does not distinguish between lean muscle, bone density, and fat, making it less informative for muscular athletes and older adults.',
      },
      {
        question: 'Is BMI different for men and women?',
        answer: 'The standard formula and category thresholds (18.5–24.9) are the same for adult men and women, though women typically have a higher percentage of body fat at the same BMI.',
      },
      {
        question: 'Can I use adult BMI for children?',
        answer: 'No. For children and adolescents (ages 2–19), BMI must be interpreted using age-and-sex-specific growth percentiles rather than adult cutoff thresholds.',
      },
    ],
    relatedTools,
  }),
  ar: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'حاسبة مؤشر كتلة الجسم (BMI) تقيّم التناسب بين الطول والوزن وتصنف الحالة الوزنية وفق معايير منظمة الصحة العالمية (WHO) للبالغين.',
    whoUsesIt: 'الأفراد لمتابعة أوزانهم الصحية، والرياضيون، ومختصو التغذية في الفحوص الأولية.',
    whatItCalculates: 'قيمة مؤشر كتلة الجسم (كجم/م²)، التصنيف الصحي (نقص وزن، وزن طبيعي، زيادة وزن، سمنة)، ونطاق الوزن المثالي المقترح.',
    howToUse: [
      'أدخل وزنك الحالي بالكيلوجرام.',
      'أدخل طولك بالسنتيمتر.',
      'راجع نتيجة مؤشر كتلة الجسم والتصنيف المعتمد من منظمة الصحة العالمية.',
      'اطلع على نطاق الوزن الصحي الموصى به لطولك.',
    ],
    formula: 'مؤشر كتلة الجسم = الوزن (كجم) ÷ [الطول (م)]²',
    inputs: [
      { name: 'الوزن', description: 'الوزن الحالي بالكيلوجرام (كجم).', unit: 'كجم', optional: false },
      { name: 'الطول', description: 'الطول الكلي بالسنتيمتر (سم).', unit: 'سم', optional: false },
    ],
    workedExample: {
      scenario: 'شخص وزنه 70 كجم وطوله 175 سم (1.75 م).',
      stepByStep: ['مربع الطول: 1.75 × 1.75 = 3.0625.', 'قسمة الوزن على مربع الطول: 70 ÷ 3.0625 = 22.86.'],
      result: 'مؤشر كتلة الجسم = 22.9 (وزن طبيعي وصحي).',
    },
    assumptions: 'ينطبق على البالغين فوق سن 18 عاماً ولا يطبق على النساء الحوامل أو الأطفال.',
    limitations: 'المؤشر وسيلة مسح عامة استرشادية ولا يفرق بين الكتلة العضلية والدهون. الرياضيون أصحاب العضلات قد يسجلون مؤشراً مرتفعاً رغم رشاقتهم.',
    faqs: [
      { question: 'ما هو المعدل الطبيعي لمؤشر كتلة الجسم؟', answer: 'المعدل الطبيعي الصحي وفق منظمة الصحة العالمية يتراوح بين 18.5 و 24.9.' },
    ],
    relatedTools,
  }),
  es: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'La calculadora de IMC (Índice de Masa Corporal) evalúa la relación entre peso y altura para categorizar el estado nutricional según la OMS.',
    whoUsesIt: 'Adultos que desean comprobar su peso saludable y profesionales del fitness.',
    whatItCalculates: 'Puntuación de IMC (kg/m²), clasificación corporal y rango de peso saludable recomendado.',
    howToUse: [
      'Introduzca su peso actual en kilogramos o libras.',
      'Indique su estatura en centímetros o pies y pulgadas.',
      'Compruebe su valor de IMC y categoría ponderal según la OMS.',
      'Revise la estimación de peso saludable adaptada a su altura.',
    ],
    formula: 'IMC = Peso (kg) / [Altura (m)]²',
    inputs: [
      { name: 'Peso', description: 'Peso corporal en kilogramos o libras.', unit: 'kg / lb', optional: false },
      { name: 'Altura', description: 'Estatura en centímetros o pies/pulgadas.', unit: 'cm / ft', optional: false },
    ],
    workedExample: {
      scenario: 'Persona con 70 kg y 175 cm de estatura.',
      stepByStep: ['1,75 × 1,75 = 3,0625 m².', '70 / 3,0625 = 22,86 kg/m².'],
      result: 'IMC = 22,9 (Peso normal).',
    },
    limitations: 'No distingue entre masa magra muscular y grasa corporal. Consulte con un médico para diagnósticos individuales.',
    faqs: [
      { question: '¿Cuál es el rango de peso normal según el IMC?', answer: 'Se considera peso normal un resultado comprendido entre 18,5 y 24,9 kg/m².' },
    ],
    relatedTools,
  }),
  fr: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Le calculateur d’IMC (Indice de Masse Corporelle) estime la corpulence d’une personne selon les repères officiels de l’Organisation Mondiale de la Santé (OMS).',
    whoUsesIt: 'Toute personne souhaitant évaluer son poids de forme et les professionnels de santé en consultation préventive.',
    whatItCalculates: 'Indice IMC (kg/m²), catégorie de corpulence et fourchette de poids idéal.',
    howToUse: [
      'Entrez votre poids actuel en kilogrammes.',
      'Renseignez votre taille en centimètres.',
      'Consultez votre score IMC et la classification de l’OMS.',
      'Découvrez votre fourchette de poids idéal estimée.',
    ],
    formula: 'IMC = Poids (kg) / [Taille (m)]²',
    inputs: [
      { name: 'Poids', description: 'Masse corporelle en kilogrammes.', unit: 'kg', optional: false },
      { name: 'Taille', description: 'Taille debout en centimètres.', unit: 'cm', optional: false },
    ],
    workedExample: {
      scenario: 'Adulte pesant 70 kg pour 1,75 m.',
      stepByStep: ['1,75 × 1,75 = 3,0625 m².', '70 ÷ 3,0625 = 22,86 kg/m².'],
      result: 'IMC = 22,9 (Corpulence normale).',
    },
    limitations: 'L’IMC est un indicateur statistique. Il ne mesure pas la masse graisseuse réelle et ne s’applique pas directement aux athlètes de haut niveau.',
    faqs: [
      { question: 'Quelle est la zone d’IMC considérée comme saine ?', answer: 'Entre 18,5 et 24,9 kg/m² pour un adulte de corpulence moyenne.' },
    ],
    relatedTools,
  }),
  de: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Der BMI-Rechner (Body-Mass-Index) berechnet das Verhältnis von Körpergewicht zu Körpergröße gemäß den Kriterien der Weltgesundheitsorganisation (WHO).',
    whoUsesIt: 'Erwachsene zur Orientierung über das eigene Normalgewicht sowie Fitnesstrainer.',
    whatItCalculates: 'BMI-Wert (kg/m²), WHO-Gewichtskategorie und individuelles Normalgewichtsspektrum.',
    howToUse: [
      'Geben Sie Ihr Körpergewicht in Kilogramm ein.',
      'Tragen Sie Ihre Körpergröße in Zentimetern ein.',
      'Lesen Sie Ihren BMI-Wert und die WHO-Einstufung ab.',
      'Informieren Sie sich über Ihren individuellen Normalgewichtsbereich.',
    ],
    formula: 'BMI = Gewicht (kg) / [Körpergröße (m)]²',
    inputs: [
      { name: 'Gewicht', description: 'Aktuelles Körpergewicht in Kilogramm.', unit: 'kg', optional: false },
      { name: 'Körpergröße', description: 'Körpergröße in Zentimetern.', unit: 'cm', optional: false },
    ],
    workedExample: {
      scenario: 'Erwachsene Person mit 70 kg und 1,75 m Größe.',
      stepByStep: ['1,75 × 1,75 = 3,0625 m².', '70 ÷ 3,0625 = 22,86 kg/m².'],
      result: 'BMI = 22,9 (Normalgewicht).',
    },
    limitations: 'Der BMI unterscheidet nicht zwischen Muskel- und Fettmasse. Für Sportler mit hohem Muskelanteil ist der Wert nur bedingt aussagekräftig.',
    faqs: [
      { question: 'Was gilt als normales BMI-Intervall?', answer: 'Ein Wert zwischen 18,5 und 24,9 kg/m² gilt bei Erwachsenen als Normalgewicht.' },
    ],
    relatedTools,
  }),
};

// 3. AGE CALCULATOR
export const AGE_KNOWLEDGE: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails> = {
  en: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'An age calculator determines the exact chronological span between a date of birth and a target reference date, accounting for varying calendar month lengths and leap years.',
    whoUsesIt: 'Individuals checking exact chronological age, HR managers verifying employment eligibility, and parents tracking developmental milestones.',
    whatItCalculates: 'Exact age in years, months, and days, total elapsed days, total hours, and countdown to the next birthday.',
    howToUse: [
      'Select or enter your exact date of birth.',
      'Optionally choose a custom comparison date (defaults to current date).',
      'Review your exact chronological age in completed years, months, and days.',
      'Check the total days lived and countdown to your next birthday.',
    ],
    formula: 'Chronological interval = Target Date - Birth Date (evaluated per Gregorian calendar rules)',
    inputs: [
      { name: 'Date of Birth', description: 'Day, month, and year of birth.', unit: 'Calendar Date', optional: false },
      { name: 'Target Date', description: 'Comparison point in time (defaults to today’s current date).', unit: 'Calendar Date', optional: true },
    ],
    workedExample: {
      scenario: 'Calculating age on September 15, 2026 for a person born on May 10, 1996.',
      stepByStep: [
        'Calculate completed years: 2026 - 1996 = 30 years.',
        'Calculate completed months since May 10: May to September = 4 months.',
        'Calculate remaining days: 15 - 10 = 5 days.',
      ],
      result: 'Exact age: 30 years, 4 months, and 5 days (11,085 total days lived).',
    },
    assumptions: 'Follows standard Gregorian calendar leap year rules where February has 29 days every four years.',
    faqs: [
      {
        question: 'How does the calculator handle leap years?',
        answer: 'The calculator accounts for leap years (including years divisible by 4, except century years not divisible by 400), ensuring exact day counts for people born in February or leap years.',
      },
    ],
    relatedTools,
  }),
  ar: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'حاسبة العمر تحسب العمر الزمني الدقيق بالسنوات والأشهر والأيام واللحظات، مع مراعاة السنوات الكبيسة واختلاف أيام الأشهر الميلادية.',
    whoUsesIt: 'الأفراد لمعرفة عمرهم الدقيق، والمؤسسات لتدقيق شروط القبول والتسجيل، وتتبع مراحل نمو الأطفال.',
    whatItCalculates: 'العمر الدقيق بالسنوات والشهور والأيام، إجمالي عدد الأيام المعاشة، والوقت المتبقي حتى تاريخ الميلاد القادم.',
    howToUse: [
      'حدد تاريخ ميلادك (اليوم، الشهر، السنة).',
      'حدد تاريخ المقارنة إذا كنت تريد حساب العمر في وقت معين (افتراضياً اليوم).',
      'استعرض عمرك بالتفصيل بالسنوات والأشهر والأيام.',
      'اطلع على إجمالي الأيام المعاشة والأيام المتبقية ليوم ميلادك القادم.',
    ],
    formula: 'العمر = تاريخ اليوم (أو التاريخ المستهدف) - تاريخ الميلاد',
    inputs: [
      { name: 'تاريخ الميلاد', description: 'اليوم والشهر والسنة التي وُلدت فيها.', unit: 'تاريخ', optional: false },
      { name: 'تاريخ الحساب المقارن', description: 'التاريخ المراد حساب العمر عنده (افتراضياً تاريخ اليوم).', unit: 'تاريخ', optional: true },
    ],
    workedExample: {
      scenario: 'حساب العمر لشخص مولود في 10 مايو 1996 حتى 15 سبتمبر 2026.',
      stepByStep: ['السنوات المكتملة: 30 سنة.', 'الأشهر: 4 أشهر.', 'الأيام: 5 أيام.'],
      result: 'العمر الدقيق: 30 سنة و 4 أشهر و 5 أيام.',
    },
    faqs: [
      { question: 'هل تحسب الأداة السنوات الكبيسة؟', answer: 'نعم، يتم حساب 29 يوماً لشهر فبراير في كل سنة كبيسة لضمان دقة عدد الأيام الإجمالي.' },
    ],
    relatedTools,
  }),
  es: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'La calculadora de edad determina el tiempo cronológico exacto en años, meses y días transcurridos desde una fecha de nacimiento hasta hoy.',
    whoUsesIt: 'Cualquier persona para conocer su edad exacta o verificar requisitos legales y administrativos.',
    whatItCalculates: 'Edad exacta (años, meses, días), días totales vividos y cuenta atrás para el próximo cumpleaños.',
    howToUse: [
      'Seleccione su fecha exacta de nacimiento.',
      'Opcionalmente indique una fecha de corte o cálculo (por defecto hoy).',
      'Compruebe su edad cronológica en años, meses y días.',
      'Consulte los días totales transcurridos y el tiempo hasta su próximo cumpleaños.',
    ],
    formula: 'Edad = Fecha objetivo - Fecha de nacimiento',
    inputs: [
      { name: 'Fecha de nacimiento', description: 'Día, mes y año de nacimiento.', unit: 'Fecha', optional: false },
    ],
    workedExample: {
      scenario: 'Persona nacida el 10 de mayo de 1996 calculada al 15 de septiembre de 2026.',
      stepByStep: ['30 años completos, 4 meses y 5 días transcurridos.'],
      result: '30 años, 4 meses y 5 días.',
    },
    faqs: [
      { question: '¿Tiene en cuenta los años bisiestos?', answer: 'Sí, computa con precisión los 366 días de los años bisiestos según el calendario gregoriano.' },
    ],
    relatedTools,
  }),
  fr: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Le calculateur d’âge détermine avec exactitude le nombre d’années, de mois et de jours écoulés depuis votre date de naissance.',
    whoUsesIt: 'Particuliers et gestionnaires administratifs vérifiant l’âge légal.',
    whatItCalculates: 'Âge précis en années, mois et jours, nombre total de jours vécus et décompte avant le prochain anniversaire.',
    howToUse: [
      'Sélectionnez votre date de naissance précise.',
      'Choisissez éventuellement une date de référence cible (la date du jour par défaut).',
      'Obtenez votre âge exact en années révolues, mois et jours.',
      'Découvrez le cumul des jours vécus et le compte à rebours du prochain anniversaire.',
    ],
    formula: 'Âge = Date de référence - Date de naissance',
    inputs: [
      { name: 'Date de naissance', description: 'Jour, mois et année de naissance.', unit: 'Date', optional: false },
    ],
    workedExample: {
      scenario: 'Calcul au 15 septembre 2026 pour une naissance le 10 mai 1996.',
      stepByStep: ['30 années révolues, 4 mois et 5 jours.'],
      result: '30 ans, 4 mois et 5 jours.',
    },
    faqs: [
      { question: 'Les années bissextiles sont-elles incluses ?', answer: 'Oui, l’algorithme intègre les 29 février des années bissextiles.' },
    ],
    relatedTools,
  }),
  de: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Der Altersrechner ermittelt das exakte Lebensalter in Jahren, Monaten und Tagen zwischen Geburtsdatum und Stichtag.',
    whoUsesIt: 'Personen zur exakten Altersbestimmung und Personalabteilungen zur Fristprüfung.',
    whatItCalculates: 'Exaktes Alter (Jahre, Monate, Tage), gelebte Gesamttage und Tage bis zum nächsten Geburtstag.',
    howToUse: [
      'Geben Sie Ihr genaues Geburtsdatum ein.',
      'Wählen Sie optional ein alternatives Vergleichsdatum (standardmäßig das heutige Datum).',
      'Lesen Sie Ihr exaktes Alter in Jahren, Monaten und Tagen ab.',
      'Sehen Sie die Gesamtzahl der gelebten Tage und die Resttage bis zum nächsten Geburtstag.',
    ],
    formula: 'Alter = Stichtag - Geburtsdatum',
    inputs: [
      { name: 'Geburtsdatum', description: 'Tag, Monat und Jahr der Geburt.', unit: 'Datum', optional: false },
    ],
    workedExample: {
      scenario: 'Geburtsdatum 10. Mai 1996 berechnet zum 15. September 2026.',
      stepByStep: ['30 vollendete Jahre, 4 Monate und 5 Tage.'],
      result: '30 Jahre, 4 Monate und 5 Tage.',
    },
    faqs: [
      { question: 'Werden Schaltjahre berücksichtigt?', answer: 'Ja, Schalttage werden im Kalender exakt mitgezählt.' },
    ],
    relatedTools,
  }),
};
