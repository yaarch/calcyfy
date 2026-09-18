import { ToolContentDetails } from './types';
import { ToolDef, Language } from '../../types';

// 1. GPA CALCULATOR
export const GPA_KNOWLEDGE: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails> = {
  en: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'A GPA (Grade Point Average) calculator converts course letter grades and credit hour weights into a standardized cumulative GPA on the standard 4.0 academic scale.',
    whoUsesIt: 'High school and university students tracking honors eligibility, scholarship standing, and graduate school admission profiles.',
    whatItCalculates: 'Term GPA, cumulative GPA, total credits earned, and total quality honor points.',
    howToUse: [
      'Enter the course grade (or select letter grade) for each completed class.',
      'Enter the assigned credit hours or semester unit weighting.',
      'Add rows for each course in your semester or academic program.',
      'Review your calculated semester GPA and cumulative quality points.',
    ],
    formula: 'GPA = Total Quality Points / Total Credit Hours = Σ(Grade Points × Credit Hours) / Σ(Credit Hours)',
    inputs: [
      { name: 'Course Grade', description: 'Letter grade achieved (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0).', unit: 'Grade Point', optional: false },
      { name: 'Credit Hours', description: 'Course academic weight or units (e.g. 3 or 4 credit semester hours).', unit: 'Credit Hours', optional: false },
    ],
    workedExample: {
      scenario: 'Calculating semester GPA for four courses: Math (4 credits, A), English (3 credits, B), Chemistry (4 credits, A), History (3 credits, C).',
      stepByStep: [
        'Calculate Quality Points: (4 × 4.0) + (3 × 3.0) + (4 × 4.0) + (3 × 2.0) = 16.0 + 9.0 + 16.0 + 6.0 = 47.0 points.',
        'Calculate Total Credits: 4 + 3 + 4 + 3 = 14 credit hours.',
        'Divide Quality Points by Credits: 47.0 ÷ 14 = 3.36 GPA.',
      ],
      result: 'Semester GPA = 3.36 out of 4.0 scale across 14 credit hours.',
    },
    assumptions: 'Assumes standard unweighted 4.0 academic grading scale where an A equals 4.0 points.',
    faqs: [
      {
        question: 'What is the difference between weighted and unweighted GPA?',
        answer: 'An unweighted GPA measures academic achievement on a 4.0 scale regardless of class difficulty. A weighted GPA awards extra points (up to 5.0) for rigorous honors, Advanced Placement (AP), or International Baccalaureate (IB) courses.',
      },
    ],
    relatedTools,
  }),
  ar: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'حاسبة المعدل التراكمي (GPA) تحول الدرجات المكتسبة وساعات المقررات الدراسية إلى معدل تراكمي موحد على مقياس 4.0 أو 5.0.',
    whoUsesIt: 'طلاب الجامعات والمدارس الثانوية لمتابعة أدائهم الأكاديمي وشروط التخرج والمنح الدراسية.',
    whatItCalculates: 'المعدل الفصلي، المعدل التراكمي، إجمالي الساعات المجتازة، ونقاط الشرف الأكاديمية.',
    howToUse: [
      'أدخل الدرجة أو التقدير المحقق لكل مادة دراسية.',
      'أدخل عدد الساعات المعتمدة لكل مقرر.',
      'أضف المقررات الدراسية للفصل بالكامل.',
      'احصل على المعدل الفصلي ونقاط الجودة الأكاديمية الإجمالية.',
    ],
    formula: 'المعدل = مجموع (نقاط المادة × ساعاتها) ÷ إجمالي الساعات المعتمدة',
    inputs: [
      { name: 'درجة المادة', description: 'التقدير الأكاديمي الحاصل عليه الطالب (أ، ب، ج، د، هـ).', unit: 'نقاط التقدير', optional: false },
      { name: 'الساعات المعتمدة', description: 'وزن المادة الأكاديمية وعدد ساعاتها المعتمدة.', unit: 'ساعات', optional: false },
    ],
    workedExample: {
      scenario: 'حساب معدل 4 مواد بإجمالي 14 ساعة ونقاط مجمعة 47.',
      stepByStep: ['قسمة إجمالي النقاط (47) على إجمالي الساعات (14).'],
      result: 'المعدل الفصلي = 3.36 من 4.0.',
    },
    faqs: [{ question: 'ما هو المعدل الممتاز من 4.0؟', answer: 'يعتبر المعدل 3.5 فما فوق من 4.0 مرتبة شرف وامتيازاً في معظم الأنظمة الجامعية.' }],
    relatedTools,
  }),
  es: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'La calculadora de promedio académico (GPA) pondera las calificaciones obtenidas según los créditos cursados en una escala estándar de 4.0.',
    whoUsesIt: 'Estudiantes universitarios para controlar su expediente y postular a becas.',
    whatItCalculates: 'Promedio del semestre, promedio acumulado y créditos totales.',
    howToUse: [
      'Introduzca la calificación obtenida en cada asignatura.',
      'Indique el número de créditos o carga horaria de cada curso.',
      'Añada todas las materias cursadas.',
      'Consulte su promedio GPA ponderado y los créditos totales aprobados.',
    ],
    formula: 'GPA = Σ(Puntos × Créditos) / Total Créditos',
    inputs: [{ name: 'Calificación y Créditos', description: 'Nota y peso de cada asignatura.', unit: 'Puntos / Créditos', optional: false }],
    workedExample: {
      scenario: '14 créditos con 47 puntos de calidad.',
      stepByStep: ['47 / 14 = 3,36.'],
      result: 'GPA = 3,36 sobre 4,0.',
    },
    faqs: [{ question: '¿Qué escala se utiliza habitualmente?', answer: 'La escala de 4.0 puntos donde A equivale a 4.0, B a 3.0, C a 2.0 y D a 1.0.' }],
    relatedTools,
  }),
  fr: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Le calculateur de moyenne pondérée (GPA) convertit vos notes en fonction des coefficients ou crédits ECTS sur une échelle standardisée.',
    whoUsesIt: 'Étudiants préparant une candidature internationale ou suivant leurs semestres.',
    whatItCalculates: 'Moyenne semestrielle et cumulative pondérée par les crédits.',
    howToUse: [
      'Indiquez la note obtenue pour chaque cours ou module.',
      'Renseignez les coefficients ou crédits ECTS associés.',
      'Ajoutez l’ensemble des matières du cursus.',
      'Obtenez votre moyenne semestrielle pondérée sur l’échelle standard.',
    ],
    formula: 'Moyenne = Σ(Note × Crédits) / Total Crédits',
    inputs: [{ name: 'Notes et Crédits', description: 'Évaluation et pondération par cours.', unit: 'Notes / ECTS', optional: false }],
    workedExample: {
      scenario: '47 points accumulés sur 14 crédits.',
      stepByStep: ['47 ÷ 14 = 3,36.'],
      result: 'Moyenne GPA = 3,36 sur 4,0.',
    },
    faqs: [{ question: 'Comment convertir les notes françaises en GPA ?', answer: 'Une mention Très Bien (16+/20) correspond généralement à 4.0, Bien (14-15.9) à 3.5, et Assez Bien (12-13.9) à 3.0.' }],
    relatedTools,
  }),
  de: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Der Notendurchschnitts- und GPA-Rechner berechnet den gewichteten Notendurchschnitt nach Leistungspunkten (ECTS) auf der 4.0-Skala oder im deutschen System.',
    whoUsesIt: 'Studierende zur Überprüfung der Studienleistungen und Bewerbung für Masterstudiengänge.',
    whatItCalculates: 'Gewichteter Notendurchschnitt, Gesamt-ECTS und Leistungspunkte.',
    howToUse: [
      'Tragen Sie die erzielte Modulnote ein.',
      'Geben Sie die zugehörigen ECTS-Leistungspunkte an.',
      'Fügen Sie alle Module Ihres Semesters oder Studiengangs hinzu.',
      'Sehen Sie Ihren gewichteten Notendurchschnitt und die Gesamt-Credits.',
    ],
    formula: 'GPA = Summe (Note × Credits) / Gesamt-Credits',
    inputs: [{ name: 'Noten und Credits', description: 'Modulnote und ECTS-Punkte je Fach.', unit: 'Note / ECTS', optional: false }],
    workedExample: {
      scenario: '14 Leistungspunkte mit 47 Qualitätspunkten.',
      stepByStep: ['47 ÷ 14 = 3,36.'],
      result: 'GPA = 3,36 auf der 4.0-Skala.',
    },
    faqs: [{ question: 'Wie wird der Notendurchschnitt gewichtet?', answer: 'Jede Modulnote wird mit ihren ECTS-Punkten multipliziert, aufsummiert und durch die Summe der ECTS geteilt.' }],
    relatedTools,
  }),
};

// 2. UNIT CONVERTER
export const CONVERTER_KNOWLEDGE: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails> = {
  en: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'A unit converter translates quantitative measurements accurately across metric (SI), imperial, and US customary measurement systems for length, area, volume, mass, and temperature.',
    whoUsesIt: 'Engineers, science students, international travelers, and cooks converting recipe volumes.',
    whatItCalculates: 'Exact converted value, scientific conversion factor, and cross-system equivalent measurements.',
    howToUse: [
      'Enter the numerical value you want to convert.',
      'Select your starting measurement unit from the source dropdown.',
      'Select your desired target measurement unit.',
      'Instantly view the precise converted value alongside conversion factors.',
    ],
    formula: 'Output Value = Input Value × Conversion Factor  (Temperature: °C = (°F - 32) × 5/9)',
    inputs: [
      { name: 'Measurement Value', description: 'The numeric quantity to convert.', unit: 'Numeric', optional: false },
      { name: 'Source Unit', description: 'The current unit of measurement.', unit: 'Unit', optional: false },
      { name: 'Target Unit', description: 'The desired destination unit of measurement.', unit: 'Unit', optional: false },
    ],
    workedExample: {
      scenario: 'Converting 10 miles into kilometers.',
      stepByStep: [
        'Identify exact conversion factor: 1 statute mile = 1.609344 kilometers.',
        'Multiply input quantity: 10 × 1.609344 = 16.09344 km.',
      ],
      result: '10 miles equals 16.09344 kilometers (16.09 km rounded).',
    },
    assumptions: 'Based on internationally ratified standards definitions (such as the 1959 International Yard and Pound agreement).',
    faqs: [
      {
        question: 'Why does temperature conversion use an offset rather than a simple multiplication?',
        answer: 'Because the Fahrenheit and Celsius temperature scales have different zero points (0°C is 32°F). Linear conversion requires subtracting or adding 32 before applying the 5/9 ratio.',
      },
    ],
    relatedTools,
  }),
  ar: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'محول الوحدات يحول القياسات بدقة بين النظام المتري الدولي (SI) والنظام الإمبراطوري للمسافات والأوزان ودرجات الحرارة والمساحات.',
    whoUsesIt: 'المهندسون، والطلاب، والمسافرون لتحويل الوحدات في حياتهم اليومية والعملية.',
    whatItCalculates: 'القيمة المحولة بدقة متناهية، ومعامل التحويل الرياضي، والوحدات المكافئة.',
    howToUse: [
      'أدخل القيمة الرقمية المراد تحويلها.',
      'اختر وحدة القياس الأصلية من القائمة.',
      'حدد وحدة القياس الهدف المرغوب التحويل إليها.',
      'احصل مباشرة على النتيجة المحولة بدقة ومعامل التحويل.',
    ],
    formula: 'القيمة الهدف = القيمة الأصلية × معامل التحويل الدولي',
    inputs: [
      { name: 'القيمة المراد تحويلها', description: 'الكمية الرقمية المدخلة.', unit: 'رقم', optional: false },
      { name: 'الوحدة الأصلية والوحدة الهدف', description: 'اختيار وحدتي القياس بين المتري والإمبراطوري.', unit: 'وحدات', optional: false },
    ],
    workedExample: {
      scenario: 'تحويل 10 أميال إلى كيلومترات.',
      stepByStep: ['معامل التحويل: 1 ميل = 1.609344 كم.', '10 × 1.609344 = 16.09344 كم.'],
      result: '10 أميال تعادل 16.09 كم.',
    },
    faqs: [{ question: 'ما هو النظام الأكثر استخداماً في العالم؟', answer: 'النظام المتري الدولي هو النظام القياسي المعتمد في كل دول العالم باستثناء الولايات المتحدة ودولتين أخريين.' }],
    relatedTools,
  }),
  es: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'El conversor de unidades transforma medidas con exactitud entre los sistemas métrico internacional e imperial para longitud, masa, volumen y temperatura.',
    whoUsesIt: 'Estudiantes, ingenieros y personas en viajes internacionales.',
    whatItCalculates: 'Valor transformado y factores de conversión universales.',
    howToUse: [
      'Introduzca el valor numérico a convertir.',
      'Seleccione la unidad de origen en el desplegable.',
      'Elija la unidad de destino deseada.',
      'Consulte al instante el valor convertido exacto y los factores de equivalencia.',
    ],
    formula: 'Valor final = Valor inicial × Factor de conversión',
    inputs: [{ name: 'Cantidad y Unidades', description: 'Magnitud original y unidad de destino.', unit: 'Unidades', optional: false }],
    workedExample: {
      scenario: 'Convertir 10 millas a kilómetros.',
      stepByStep: ['10 × 1,609344 = 16,09344 km.'],
      result: '10 millas equivalen a 16,09 km.',
    },
    faqs: [{ question: '¿Cómo convertir de Celsius a Fahrenheit?', answer: 'Multiplique la temperatura en °C por 9/5 y sume 32.' }],
    relatedTools,
  }),
  fr: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Le convertisseur d’unités assure la conversion rigoureuse entre le système métrique (SI) et le système impérial pour toutes les grandeurs physiques courantes.',
    whoUsesIt: 'Ingénieurs, scientifiques, voyageurs et cuisiniers.',
    whatItCalculates: 'Valeur convertie exacte et unités équivalentes.',
    howToUse: [
      'Indiquez la valeur numérique à convertir.',
      'Sélectionnez l’unité de mesure de départ.',
      'Choisissez l’unité de mesure d’arrivée souhaitée.',
      'Visualisez immédiatement le résultat converti précis et les équivalences.',
    ],
    formula: 'Valeur cible = Valeur source × Facteur de conversion',
    inputs: [{ name: 'Quantité et Unités', description: 'Mesure de départ et unité d’arrivée.', unit: 'Unités', optional: false }],
    workedExample: {
      scenario: 'Convertir 10 miles en kilomètres.',
      stepByStep: ['10 × 1,609344 = 16,09344 km.'],
      result: '10 miles = 16,09 km.',
    },
    faqs: [{ question: 'Quelle est la relation entre livre (lb) et kilogramme ?', answer: '1 livre équivaut exactement à 0,45359237 kilogramme.' }],
    relatedTools,
  }),
  de: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Der Einheitenrechner konvertiert physikalische Maßeinheiten präzise zwischen dem metrischen SI-System und dem angloamerikanischen Maßsystem.',
    whoUsesIt: 'Ingenieure, Handwerker, Schüler und Reisende.',
    whatItCalculates: 'Exakter Zielwert und genauer Umrechnungsfaktor.',
    howToUse: [
      'Tragen Sie den umzurechnenden Zahlenwert ein.',
      'Wählen Sie die Ausgangseinheit aus.',
      'Wählen Sie die gewünschte Zieleinheit aus.',
      'Erhalten Sie in Echtzeit das exakte Umrechnungsergebnis.',
    ],
    formula: 'Zielwert = Ausgangswert × Umrechnungsfaktor',
    inputs: [{ name: 'Messwert und Einheiten', description: 'Eingabewert sowie Ausgangs- und Zieleinheit.', unit: 'Einheiten', optional: false }],
    workedExample: {
      scenario: 'Umrechnung von 10 Meilen in Kilometer.',
      stepByStep: ['10 × 1,609344 = 16,09344 km.'],
      result: '10 Meilen entsprechen 16,09 km.',
    },
    faqs: [{ question: 'Wie rechnet man Fahrenheit in Celsius um?', answer: '32 abziehen und das Ergebnis mit 5/9 multiplizieren.' }],
    relatedTools,
  }),
};
