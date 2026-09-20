import { ToolContentDetails } from './types';
import { ToolDef, Language } from '../../types';

// 1. CALORIE CALCULATOR (Mifflin-St Jeor)
export const CALORIE_KNOWLEDGE: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails> = {
  en: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'A calorie calculator calculates your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) based on the clinically validated Mifflin-St Jeor equation, age, gender, height, weight, and daily physical activity level.',
    whoUsesIt: 'Individuals planning fat loss or muscle gain, nutritionists calculating baseline caloric needs, and athletes structuring meal plans.',
    whatItCalculates: 'BMR (calories burned at rest), TDEE (maintenance calories), and adjusted caloric targets for weight loss (-500 kcal/day) or surplus weight gain (+500 kcal/day).',
    howToUse: [
      'Select your biological sex and enter your current age in years.',
      'Enter your standing height and current body weight.',
      'Select your average weekly physical activity level from sedentary to highly active.',
      'Review your Basal Metabolic Rate (BMR) and daily maintenance calories (TDEE).',
      'Follow the adjusted calorie guidelines for fat loss or lean mass gain.',
    ],
    formula: 'BMR (Men) = (10 × wt kg) + (6.25 × ht cm) - (5 × age) + 5  |  BMR (Women) = (10 × wt kg) + (6.25 × ht cm) - (5 × age) - 161',
    inputs: [
      { name: 'Biological Sex', description: 'Used to adjust basal metabolic equations for biological differences in lean body tissue.', unit: 'Male / Female', optional: false },
      { name: 'Age', description: 'Age in years (metabolic rate gradually declines with age).', unit: 'Years', optional: false },
      { name: 'Height', description: 'Stature in centimeters or inches.', unit: 'cm or in', optional: false },
      { name: 'Weight', description: 'Current body weight in kilograms or pounds.', unit: 'kg or lb', optional: false },
      { name: 'Activity Level', description: 'Multiplier ranging from 1.2 (sedentary desk job) to 1.9 (intense daily athletic training).', unit: 'PAL Multiplier', optional: false },
    ],
    workedExample: {
      scenario: 'A 30-year-old male weighing 80 kg, 180 cm tall, with moderate physical activity (exercise 3-5 days/week; multiplier 1.55).',
      stepByStep: [
        'Calculate BMR: (10 × 80) + (6.25 × 180) - (5 × 30) + 5 = 800 + 1,125 - 150 + 5 = 1,780 kcal.',
        'Multiply by physical activity factor: 1,780 × 1.55 = 2,759 kcal/day.',
        'Target for steady 0.5 kg/week fat loss: 2,759 - 500 = 2,259 kcal/day.',
      ],
      result: 'Maintenance TDEE = 2,759 kcal/day; Fat loss intake = 2,259 kcal/day.',
    },
    assumptions: 'Assumes typical body fat percentages for general populations using Mifflin-St Jeor parameters.',
    limitations: 'Metabolic rates vary based on thyroid function, genetics, and lean muscle mass. Caloric counts should serve as an initial guideline adjusted by real-world progress over 2 to 4 weeks.',
    faqs: [
      {
        question: 'How many calories are in one pound of body fat?',
        answer: 'One pound of human adipose tissue corresponds to approximately 3,500 calories. A daily caloric deficit of 500 calories typically produces about 1 pound (~0.45 kg) of fat loss per week.',
      },
    ],
    relatedTools,
  }),
  ar: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'حاسبة السعرات الحرارية تحسب معدل الأيض الأساسي (BMR) وإجمالي استهلاك الطاقة اليومي (TDEE) بالاعتماد على معادلة ميفلين سانت جيور المعتمدة طبياً.',
    whoUsesIt: 'الراغبون في إنقاص الوزن أو بناء العضلات، وأخصائيو التغذية لتصميم الحميات الغذائية.',
    whatItCalculates: 'معدل الحرق أثناء الراحة (BMR)، سعرات ثبات الوزن (TDEE)، وسعرات التنشيف أو التضخيم.',
    howToUse: [
      'حدد الجنس والعمر بالسنوات.',
      'أدخل الوزن بالكيلوجرام والطول بالسنتيمتر.',
      'اختر مستوى نشاطك البدني الأسبوعي المعتاد.',
      'استعرض معدل الحرق الأساسي وسعرات المحافظة على الوزن وخطة التنشيف أو التضخيم.',
    ],
    formula: 'معادلة ميفلين سانت جيور: BMR = (10 × الوزن كجم) + (6.25 × الطول سم) - (5 × العمر) + ثابت الجنس',
    inputs: [
      { name: 'الجنس', description: 'ذكر أو أنثى لضبط الفروق البيولوجية في الكتلة العضلية.', unit: 'نوع', optional: false },
      { name: 'الوزن', description: 'الوزن بالكيلوجرام.', unit: 'كجم', optional: false },
      { name: 'الطول', description: 'الطول بالسنتيمتر.', unit: 'سم', optional: false },
      { name: 'العمر', description: 'العمر بالسنوات.', unit: 'سنة', optional: false },
      { name: 'مستوى النشاط البدني', description: 'معامل النشاط الحركي والرياضي الأسبوعي.', unit: 'مستوى', optional: false },
    ],
    workedExample: {
      scenario: 'رجل عمره 30 سنة، وزنه 80 كجم، طوله 180 سم، يمارس نشاطاً متوسطاً (معامل 1.55).',
      stepByStep: ['حساب BMR: ينتج 1,780 سعرة حرارية.', 'الضرب في معامل النشاط: 1,780 × 1.55 = 2,759 سعرة يومياً لثبات الوزن.'],
      result: 'سعرات الثبات: 2,759 سعرة/يوم؛ سعرات إنقاص الوزن: 2,259 سعرة/يوم.',
    },
    faqs: [
      { question: 'كم سعرة حرارية تلزم لخسارة كيلوجرام من الدهون؟', answer: 'خسارة 1 كجم من دهون الجسم تتطلب عجزاً يقارب 7,700 سعرة حرارية موزعة على مدار عدة أسابيع.' },
    ],
    relatedTools,
  }),
  es: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'La calculadora de calorías estima la Tasa Metabólica Basal (TMB) y el Gasto Energético Diario Total (TDEE) mediante la fórmula clínica de Mifflin-St Jeor.',
    whoUsesIt: 'Deportistas, personas en proceso de pérdida de grasa o aumento de masa muscular y nutricionistas.',
    whatItCalculates: 'Calorías basales de reposo, calorías de mantenimiento y objetivos calóricos ajustados.',
    howToUse: [
      'Seleccione su sexo biológico e introduzca su edad.',
      'Indique su peso y altura actuales.',
      'Elija su nivel de actividad física semanal.',
      'Consulte su Tasa Metabólica Basal (TMB), gasto diario de mantenimiento (TDEE) y déficit recomendado.',
    ],
    formula: 'TDEE = TMB × Factor de actividad física',
    inputs: [
      { name: 'Sexo, Edad, Altura y Peso', description: 'Parámetros antropométricos básicos.', unit: 'Métrico / Imperial', optional: false },
      { name: 'Nivel de actividad', description: 'Desde sedentario (1,2) hasta muy activo (1,9).', unit: 'Factor', optional: false },
    ],
    workedExample: {
      scenario: 'Varón de 30 años, 80 kg y 180 cm con actividad moderada (1,55).',
      stepByStep: ['TMB: 1.780 kcal.', 'TDEE de mantenimiento: 1.780 × 1,55 = 2.759 kcal/día.'],
      result: 'Mantenimiento: 2.759 kcal/día; Déficit para perder peso: 2.259 kcal/día.',
    },
    faqs: [{ question: '¿Qué es el déficit calórico?', answer: 'Consumir menos calorías de las que el cuerpo gasta al día para obligarlo a recurrir a las reservas de grasa.' }],
    relatedTools,
  }),
  fr: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Le calculateur de calories estime le métabolisme de base (MB) et la dépense énergétique journalière totale (DEJ) selon l’équation de Mifflin-St Jeor.',
    whoUsesIt: 'Pratiquants de musculation, personnes en rééquilibrage alimentaire et diététiciens.',
    whatItCalculates: 'Métabolisme au repos, besoin calorique de maintien et apport pour perte ou prise de poids.',
    howToUse: [
      'Indiquez votre sexe biologique et votre âge.',
      'Saisissez votre taille et votre poids.',
      'Choisissez votre fréquence et intensité d’activité physique.',
      'Consultez votre Métabolisme de Base (MB), votre dépense de maintien (DEJ) et l’ajustement calorique conseillé.',
    ],
    formula: 'DEJ = Métabolisme de Base × Facteur d’activité',
    inputs: [
      { name: 'Sexe, Âge, Taille et Poids', description: 'Données corporelles nécessaires au calcul du métabolisme.', unit: 'Métriques', optional: false },
      { name: 'Niveau d’activité', description: 'Fréquence et intensité des entraînements hebdomadaires.', unit: 'Facteur', optional: false },
    ],
    workedExample: {
      scenario: 'Homme de 30 ans, 80 kg, 180 cm avec activité modérée (1,55).',
      stepByStep: ['MB : 1 780 kcal.', 'DEJ : 1 780 × 1,55 = 2 759 kcal/jour.'],
      result: 'Maintien : 2 759 kcal/jour ; Perte de poids : 2 259 kcal/jour.',
    },
    faqs: [{ question: 'Comment perdre du gras durablement ?', answer: 'En instaurant un déficit calorique modéré de 300 à 500 kcal par jour associé à un apport suffisant en protéines.' }],
    relatedTools,
  }),
  de: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Der Kalorienrechner berechnet den Grundumsatz (BMR) und den täglichen Gesamtenergiebedarf (TDEE) nach der wissenschaftlichen Mifflin-St-Jeor-Formel.',
    whoUsesIt: 'Personen zur Gewichtsreduktion, Muskelaufbau oder Sporternährung.',
    whatItCalculates: 'Grundumsatz in Ruhe, Erhaltungskalorien und empfohlene Kalorienzufuhr zum Zu- oder Abnehmen.',
    howToUse: [
      'Wählen Sie Ihr biologisches Geschlecht und tragen Sie Ihr Alter ein.',
      'Geben Sie Ihre Körpergröße und Ihr Körpergewicht ein.',
      'Wählen Sie Ihr typisches wöchentliches Aktivitätsniveau aus.',
      'Erhalten Sie Ihren Grundumsatz (BMR), Erhaltungskalorien (TDEE) und Zielkalorien für Ihren Trainingsplan.',
    ],
    formula: 'Gesamtumsatz = Grundumsatz × Aktivitätsfaktor (PAL)',
    inputs: [
      { name: 'Geschlecht, Alter, Größe und Gewicht', description: 'Biometrische Basisdaten zur Ermittlung des Grundumsatzes.', unit: 'Metrisch', optional: false },
      { name: 'Aktivitätsgrad', description: 'Einstufung der täglichen körperlichen Bewegung.', unit: 'Faktor', optional: false },
    ],
    workedExample: {
      scenario: 'Mann, 30 Jahre, 80 kg, 180 cm bei moderater Bewegung (1,55).',
      stepByStep: ['Grundumsatz: 1.780 kcal.', 'Gesamtumsatz: 1.780 × 1,55 = 2.759 kcal/Tag.'],
      result: 'Erhaltungskalorien: 2.759 kcal/Tag; Kaloriendefizit: 2.259 kcal/Tag.',
    },
    faqs: [{ question: 'Wie groß sollte das Kaloriendefizit sein?', answer: 'Ein moderates Defizit von 300 bis 500 kcal pro Tag sorgt für nachhaltigen Fettabbau ohne Muskelverlust.' }],
    relatedTools,
  }),
};

// 2. TIP CALCULATOR
export const TIP_KNOWLEDGE: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails> = {
  en: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'The Tip Calculator quickly computes restaurant tips, divides bills evenly among any number of diners, and includes optional round-up features to make splitting dining expenses completely hassle-free.',
    whoUsesIt: 'Restaurant diners, groups splitting bills, travelers, and anyone looking for a fast, accurate way to calculate gratuities and individual shares.',
    whatItCalculates: 'Total tip amount, overall bill including gratuity, exact per-person share, and rounded totals.',
    howToUse: [
      'Enter the pre-tax bill subtotal before tips or gratuities.',
      'Select a tip percentage (e.g., 10%, 15%, 18%, 20%, 25%) or enter a custom rate.',
      'Specify the number of diners sharing the bill.',
      'Optionally toggle "Round up" to round the total bill to the nearest whole dollar.',
      'Review the total tip, overall bill, and each person\'s exact share in real time.'
    ],
    formula: 'Tip Amount = Bill Amount × (Tip Percentage / 100)  |  Total Per Person = (Bill Amount + Tip Amount) / Number of People',
    formulaVariables: [
      { symbol: 'Bill Amount ($)', name: 'Bill Amount ($)', explanation: 'The total cost of the meal or service before tips.' },
      { symbol: 'Tip Percentage (%)', name: 'Tip Percentage (%)', explanation: 'The selected rate of gratuity (e.g., 15%, 18%, 20%).' },
      { symbol: 'Split Between People', name: 'Split Between People', explanation: 'The number of guests sharing the total bill.' },
      { symbol: 'Tip Amount ($)', name: 'Tip Amount ($)', explanation: 'Total gratuity added to the check.' },
      { symbol: 'Total Per Person ($)', name: 'Total Per Person ($)', explanation: 'The exact amount owed by each diner including their tip share.' }
    ],
    inputs: [
      { name: 'Bill Amount ($)', description: 'The total cost of the meal or service before tips.', unit: 'USD ($)', optional: false },
      { name: 'Tip Percentage (%)', description: 'The selected rate of gratuity (e.g., 15%, 18%, 20%).', unit: 'Percentage (%)', optional: false },
      { name: 'Split Between People', description: 'The number of guests sharing the total bill.', unit: 'People (Count)', optional: true },
    ],
    unitsAndConversions: 'Calculations are displayed in standard currency units rounded to two decimal places (cents).',
    workedExample: {
      scenario: 'Splitting an $85.50 restaurant bill between 2 people with an 18% gratuity tip.',
      stepByStep: [
        'Identify bill parameters: Bill Amount = $85.50, Tip Percentage = 18%, Split = 2 people.',
        'Calculate total tip amount: $85.50 × 0.18 = $15.39.',
        'Calculate overall total bill: $85.50 + $15.39 = $100.89.',
        'Divide evenly across 2 diners: $100.89 ÷ 2 = $50.45 per person (Tip per person: $7.70).'
      ],
      result: 'Total Tip: $15.39 | Total Bill: $100.89 | Per Person Share: $50.45 (Tip share: $7.70 each)'
    },
    understandingResults: 'The calculator delivers an instant breakdown of the gratuity owed, overall bill, and equal individual contributions, eliminating manual payment confusion.',
    assumptions: 'Assumes equal bill splitting across all dining participants and standard percentage gratuity calculation.',
    limitations: 'Does not account for individual itemized drink or food splits unless calculated separately.',
    faqs: [
      {
        question: 'What is standard dining tip etiquette?',
        answer: 'In the United States and Canada, standard gratuity ranges from 15% for adequate service to 18%-20% for good service, and 20%+ for exceptional service.'
      },
      {
        question: 'Should you calculate tips before or after sales tax?',
        answer: 'Standard etiquette recommends tipping on the pre-tax food and beverage subtotal, although tipping on the post-tax total is also very common.'
      },
      {
        question: 'How does the round-up total bill option work?',
        answer: 'Toggling "Round up" rounds the overall bill to the next whole dollar, adding the minor rounding difference directly to the server\'s tip.'
      }
    ],
    relatedTools,
  }),
  ar: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'تحسب حاسبة الإكرامية (البقشيش) وتقسيم الفاتورة قيمة الإكرامية للمطاعم والخدمات، وتقسم الفاتورة بالتساوي بين أي عدد من الأشخاص مع ميزة تقريب المبلغ لأقرب رقم صحيح لجعل مشاركة النفقات سهلة وخالية من التعقيد.',
    whoUsesIt: 'رواد المطاعم، والمجموعات التي تتقاسم الفواتير، والمسافرون، وكل من يبحث عن وسيلة سريعة ودقيقة لحساب الإكراميات وحصة كل فرد.',
    whatItCalculates: 'مبلغ الإكرامية الإجمالي، والفاتورة الكلية مع الإكرامية، وحصة الفرد الواحد بالتساوي، وتقريب الحساب للأرقام الصحيحة.',
    howToUse: [
      'أدخل مبلغ الفاتورة الإجمالي قبل الإكرامية.',
      'اختر نسبة الإكرامية المطلوبة (مثل 10%، 15%، 18%، 20%، 25%) أو أدخل نسبة مخصصة.',
      'حدد عدد الأشخاص الذين يتقاسمون الفاتورة.',
      'يمكنك تفعيل خيار "تقريب المبلغ" لجبر الكسور إلى أقرب دولار صحيح.',
      'اطلع فورياً على إجمالي الإكرامية، والمبلغ الكلي، وحصة كل شخص بدقة.'
    ],
    formula: 'قيمة الإكرامية = مبلغ الفاتورة × (نسبة الإكرامية ÷ 100)  |  نصيب الفرد = (مبلغ الفاتورة + قيمة الإكرامية) ÷ عدد الأشخاص',
    formulaVariables: [
      { symbol: 'مبلغ الفاتورة ($)', name: 'مبلغ الفاتورة ($)', explanation: 'التكلفة الإجمالية للوجبة أو الخدمة قبل إضافة الإكرامية.' },
      { symbol: 'نسبة الإكرامية (%)', name: 'نسبة الإكرامية (%)', explanation: 'النسبة المئوية المختارة للإكرامية (مثل 15%، 18%، 20%).' },
      { symbol: 'عدد الأشخاص', name: 'عدد الأشخاص', explanation: 'عدد الأفراد المشتركين في دفع وتقاسم الفاتورة.' },
      { symbol: 'إجمالي الإكرامية ($)', name: 'إجمالي الإكرامية ($)', explanation: 'مبلغ البقشيش المضاف إلى الفاتورة.' },
      { symbol: 'نصيب الفرد ($)', name: 'نصيب الفرد ($)', explanation: 'المبلغ الدقيق المستحق على كل شخص شاملاً حصته من الإكرامية.' }
    ],
    inputs: [
      { name: 'مبلغ الفاتورة ($)', description: 'التكلفة الإجمالية للوجبة أو الخدمة قبل إضافة الإكرامية.', unit: 'دولار ($)', optional: false },
      { name: 'نسبة الإكرامية (%)', description: 'النسبة المئوية المختارة للإكرامية (مثل 15%، 18%، 20%).', unit: '%', optional: false },
      { name: 'تقسيم بين أفراد', description: 'عدد الضيوف المشاركين في تقاسم الحساب.', unit: 'أشخاص', optional: true }
    ],
    unitsAndConversions: 'تُعرض المبالغ المالية بالعملة القياسية مقربة لمنزلتين عشريتين (السنتات).',
    workedExample: {
      scenario: 'تقاسم فاتورة مطعم بقيمة 85.50 دولار بين شخصين بإكرامية نسبتها 18%.',
      stepByStep: [
        'تحديد معطيات الفاتورة: المبلغ = 85.50 دولار، نسبة الإكرامية = 18%، عدد الأشخاص = 2.',
        'حساب إجمالي قيمة الإكرامية: 85.50 × 0.18 = 15.39 دولار.',
        'حساب الإجمالي النهائي للفاتورة: 85.50 + 15.39 = 100.89 دولار.',
        'تقسيم الحساب بالتساوي بين شخصين: 100.89 ÷ 2 = 50.45 دولار لكل شخص (مع تفصيل الإكرامية بـ 7.70 دولار لكل شخص).'
      ],
      result: 'إجمالي الإكرامية: 15.39$ | الفاتورة الإجمالية: 100.89$ | نصيب كل شخص: 50.45$ (الإكرامية للفرد: 7.70$)'
    },
    understandingResults: 'تمنحك الحاسبة تفصيلاً فورياً لقيمة الإكرامية والمبلغ الكلي وحصة كل فرد، مما يقضي على أي حرج أو التباس عند دفع الحساب في المطاعم.',
    assumptions: 'تفترض تقاسم الفاتورة بالتساوي بين جميع الأفراد وتطبيق النسبة المئوية المحددة للإكرامية.',
    limitations: 'لا تفصل الحساب للأطباق الفردية أو المشروبات الخاصة إلا إذا تم حسابها بشكل منفصل.',
    faqs: [
      {
        question: 'ما هي النسبة المعتادة للإكرامية في المطاعم؟',
        answer: 'في الولايات المتحدة وكندا، تتراوح النسبة المعتادة بين 15% للخدمة العادية، و18% إلى 20% للخدمة الجيدة، وأكثر من 20% للخدمة الممتازة.'
      },
      {
        question: 'هل تُحسب الإكرامية قبل أم بعد الضرائب؟',
        answer: 'العرف المعتاد يقترح حساب الإكرامية على المبلغ الإجمالي للأطعمة والمشروبات قبل الضريبة، مع أن الكثيرين يفضلون الحساب على الإجمالي النهائي.'
      },
      {
        question: 'كيف تعمل ميزة تقريب المبلغ الإجمالي؟',
        answer: 'تقوم ميزة التقريب برفع الإجمالي النهائي إلى أقرب دولار صحيح تلقائياً، مع إضافة الفارق البسيط مباشرة إلى إكرامية النادل.'
      }
    ],
    relatedTools,
  }),
  es: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'La calculadora de propinas calcula rápidamente las propinas de restaurantes, divide la cuenta en partes iguales entre comensales e incluye opciones de redondeo para simplificar los gastos compartidos.',
    whoUsesIt: 'Comensales de restaurantes, grupos que dividen cuentas, viajeros y clientes de servicios que desean calcular propinas exactas.',
    whatItCalculates: 'Importe de la propina, cuenta total con propina, cuota exacta por comensal y redondeos.',
    howToUse: [
      'Introduzca el importe subtotal de la cuenta.',
      'Elija el porcentaje de propina deseado (10%, 15%, 18%, 20%, 25%) o introduzca un porcentaje personalizado.',
      'Indique el número de personas que comparten el pago.',
      'Active opcionalmente el redondeo al entero superior.',
      'Compruebe la propina, el total y la parte de cada persona en tiempo real.'
    ],
    formula: 'Propina = Cuenta × (Porcentaje / 100)  |  Por persona = (Cuenta + Propina) / Número de comensales',
    formulaVariables: [
      { symbol: 'Importe de la cuenta ($)', name: 'Importe de la cuenta ($)', explanation: 'Total de la consumición antes de propinas.' },
      { symbol: 'Porcentaje de propina (%)', name: 'Porcentaje de propina (%)', explanation: 'Porcentaje de gratificación aplicado.' },
      { symbol: 'Número de comensales', name: 'Número de comensales', explanation: 'Cantidad de personas que comparten la cuenta.' }
    ],
    inputs: [
      { name: 'Importe de la cuenta ($)', description: 'Total antes de propina.', unit: 'Moneda ($)', optional: false },
      { name: 'Porcentaje de propina (%)', description: 'Porcentaje seleccionado.', unit: '%', optional: false },
      { name: 'Número de comensales', description: 'Personas que comparten.', unit: 'Personas', optional: true },
    ],
    unitsAndConversions: 'Moneda local con precisión de dos decimales.',
    workedExample: {
      scenario: 'Dividir una cuenta de 85,50 $ entre 2 personas con un 18% de propina.',
      stepByStep: [
        'Parámetros: Cuenta = 85,50 $, Propina = 18%, Comensales = 2.',
        'Calcular propina: 85,50 $ × 0,18 = 15,39 $.',
        'Calcular total con propina: 85,50 $ + 15,39 $ = 100,89 $.',
        'Dividir entre 2 personas: 100,89 $ ÷ 2 = 50,45 $ por persona (con 7,70 $ de propina cada uno).'
      ],
      result: 'Propina: 15,39 $ | Total: 100,89 $ | Por persona: 50,45 $ (Propina por comensal: 7,70 $)'
    },
    understandingResults: 'Muestra la descomposición exacta del pago individual para evitar confusiones en restaurantes.',
    assumptions: 'División equitativa entre todos los participantes.',
    limitations: 'No desglosa consumiciones individuales específicas.',
    faqs: [
      { question: '¿Cuál es el porcentaje habitual de propina?', answer: 'En EE. UU. oscila entre el 15% (servicio estándar) y el 18-20% (buen servicio).' },
      { question: '¿Se calcula antes o después de impuestos?', answer: 'La costumbre estándar recomienda calcular sobre el subtotal antes de impuestos.' }
    ],
    relatedTools,
  }),
  fr: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Le calculateur de pourboire calcule rapidement les gratifications de restaurant, partage équitablement l’addition entre convives et propose l\'arrondi supérieur.',
    whoUsesIt: 'Clients de restaurants, groupes d’amis partageant une note et voyageurs.',
    whatItCalculates: 'Montant du pourboire, total général avec service, et montant individuel par personne.',
    howToUse: [
      'Indiquez le montant hors pourboire de la note.',
      'Sélectionnez le pourcentage de pourboire (10 %, 15 %, 18 %, 20 %, 25 %) ou un taux personnalisé.',
      'Renseignez le nombre de convives.',
      'Activez éventuellement l’arrondi au dollar supérieur.',
      'Consultez le pourboire, le total général et la part par personne instantanément.'
    ],
    formula: 'Pourboire = Addition × (Pourcentage / 100)  |  Par personne = (Addition + Pourboire) / Nombre de convives',
    formulaVariables: [
      { symbol: 'Montant de l’addition ($)', name: 'Montant de l’addition ($)', explanation: 'Total de la commande avant pourboire.' },
      { symbol: 'Pourcentage de pourboire (%)', name: 'Pourcentage de pourboire (%)', explanation: 'Taux de gratification appliqué.' },
      { symbol: 'Nombre de convives', name: 'Nombre de convives', explanation: 'Nombre de personnes qui partagent.' }
    ],
    inputs: [
      { name: 'Montant de l’addition ($)', description: 'Note avant pourboire.', unit: 'Devise ($)', optional: false },
      { name: 'Pourcentage de pourboire (%)', description: 'Taux choisi.', unit: '%', optional: false },
      { name: 'Nombre de convives', description: 'Nombre de personnes payantes.', unit: 'Personnes', optional: true },
    ],
    unitsAndConversions: 'Devise monétaire avec deux décimales.',
    workedExample: {
      scenario: 'Partage d\'une addition de 85,50 $ entre 2 personnes avec 18 % de pourboire.',
      stepByStep: [
        'Données : Addition = 85,50 $, Pourboire = 18 %, Convives = 2.',
        'Calcul du pourboire : 85,50 $ × 0,18 = 15,39 $.',
        'Calcul du montant total : 85,50 $ + 15,39 $ = 100,89 $.',
        'Partage entre 2 personnes : 100,89 $ ÷ 2 = 50,45 $ par personne (soit 7,70 $ de pourboire chacun).'
      ],
      result: 'Pourboire : 15,39 $ | Total : 100,89 $ | Par personne : 50,45 $ (Pourboire par convive : 7,70 $)'
    },
    understandingResults: 'Offre une répartition transparente et sans ambiguïté des frais de repas entre amis.',
    assumptions: 'Partage égalitaire de la facture globale.',
    limitations: 'Ne détaille pas les consommations individuelles.',
    faqs: [
      { question: 'Quel est le pourboire d\'usage ?', answer: 'En Amérique du Nord, il est d\'usage de laisser entre 15 % et 20 % selon la qualité du service.' }
    ],
    relatedTools,
  }),
  de: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Der Trinkgeldrechner berechnet Trinkgeldbeträge, teilt Restaurantrechnungen gleichmäßig auf jede Personengruppe auf und bietet eine praktische Aufrundungsfunktion.',
    whoUsesIt: 'Restaurantbesucher, Gruppen zur Rechnungsaufteilung und Reisende.',
    whatItCalculates: 'Trinkgeldbetrag, Gesamtrechnung inklusive Trinkgeld und Pro-Kopf-Betrag.',
    howToUse: [
      'Geben Sie den Rechnungsbetrag vor Trinkgeld ein.',
      'Wählen Sie den gewünschten Trinkgeldsatz (z. B. 10 %, 15 %, 18 %, 20 %) oder einen individuellen Satz.',
      'Tragen Sie die Anzahl der Personen ein.',
      'Aktivieren Sie optional das Aufrunden auf volle Beträge.',
      'Sehen Sie Trinkgeld, Endsumme und den Pro-Kopf-Anteil in Echtzeit.'
    ],
    formula: 'Trinkgeld = Rechnungsbetrag × (Satz / 100)  |  Pro Person = (Rechnungsbetrag + Trinkgeld) / Anzahl Personen',
    formulaVariables: [
      { symbol: 'Rechnungsbetrag ($)', name: 'Rechnungsbetrag ($)', explanation: 'Gesamtbetrag vor Trinkgeld.' },
      { symbol: 'Trinkgeldsatz (%)', name: 'Trinkgeldsatz (%)', explanation: 'Ausgewählter Prozentsatz.' },
      { symbol: 'Anzahl Personen', name: 'Anzahl Personen', explanation: 'Anzahl der zahlenden Personen.' }
    ],
    inputs: [
      { name: 'Rechnungsbetrag ($)', description: 'Rechnungssumme vor Trinkgeld.', unit: 'Währung ($)', optional: false },
      { name: 'Trinkgeld in %', description: 'Gewünschter Prozentsatz.', unit: '%', optional: false },
      { name: 'Personenanzahl', description: 'Anzahl der beteiligten Gäste.', unit: 'Personen', optional: true },
    ],
    unitsAndConversions: 'Währungsbeträge mit kaufmännischer Rundung auf zwei Dezimalstellen.',
    workedExample: {
      scenario: 'Aufteilung einer Restaurantrechnung von 85,50 $ auf 2 Personen mit 18 % Trinkgeld.',
      stepByStep: [
        'Eingaben: Rechnungsbetrag = 85,50 $, Trinkgeld = 18 %, Personen = 2.',
        'Trinkgeld berechnen: 85,50 $ × 0,18 = 15,39 $.',
        'Gesamtrechnung berechnen: 85,50 $ + 15,39 $ = 100,89 $.',
        'Auf 2 Personen aufteilen: 100,89 $ ÷ 2 = 50,45 $ pro Person (Trinkgeldanteil: 7,70 $).'
      ],
      result: 'Trinkgeld: 15,39 $ | Gesamtrechnung: 100,89 $ | Pro Person: 50,45 $ (Trinkgeldanteil: 7,70 $)'
    },
    understandingResults: 'Liefert eine übersichtliche Kostenaufteilung ohne lästiges Kopfrechnen am Tisch.',
    assumptions: 'Gleichmäßige Aufteilung der Gesamtsumme.',
    limitations: 'Keine getrennte Einzelpostenabrechnung.',
    faqs: [
      { question: 'Wie viel Trinkgeld ist üblich?', answer: 'In den USA 15–20 %, in Europa sind 5–10 % als freiwillige Anerkennung üblich.' }
    ],
    relatedTools,
  }),
};

// 3. DISCOUNT CALCULATOR
export const DISCOUNT_KNOWLEDGE: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails> = {
  en: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'A discount calculator determines the final checkout price after applying percentage reductions, store coupons, sales promotions, or additional stacked discounts.',
    whoUsesIt: 'Shoppers calculating promotional savings and retailers pricing markdown items.',
    whatItCalculates: 'Total money saved, final discounted price, and effective combined discount rate.',
    howToUse: [
      'Enter the original retail price before markdown.',
      'Enter the percentage discount or promotional rate.',
      'Review your total cash savings and the final discounted checkout price.',
    ],
    formula: 'Savings = Original Price × (Discount % / 100)  |  Final Price = Original Price - Savings',
    inputs: [
      { name: 'Original Price ($)', description: 'The sticker price before markdown.', unit: 'USD ($)', optional: false },
      { name: 'Discount Percentage (%)', description: 'The promotional reduction offered.', unit: 'Percentage (%)', optional: false },
    ],
    workedExample: {
      scenario: 'Buying a $120 jacket with a 25% sale discount.',
      stepByStep: [
        'Calculate discount amount: $120 × (25 / 100) = $30.00 saved.',
        'Subtract savings from original price: $120 - $30 = $90.00 final price.',
      ],
      result: 'You save $30.00; Final price to pay is $90.00.',
    },
    faqs: [
      {
        question: 'How do stacked discounts work (e.g. 20% off plus an extra 10% off)?',
        answer: 'Stacked discounts apply successively to the remaining balance, not additively. For example, 20% off $100 reduces the price to $80; an additional 10% off reduces $80 by $8, yielding a final price of $72 (a 28% total discount, not 30%).',
      },
    ],
    relatedTools,
  }),
  ar: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'حاسبة الخصم تحسب السعر النهائي بعد تطبيق التخفيضات ومقدار التوفير المالي المحقق.',
    whoUsesIt: 'المتسوقون أثناء مواسم العروض، وأصحاب المتاجر لتسعير البضائع المخفضة.',
    whatItCalculates: 'المبلغ الموفر بالنقود، والسعر الصافي بعد الخصم.',
    howToUse: [
      'أدخل السعر الأصلي قبل التخفيض.',
      'أدخل نسبة الخصم المئوية المعلنة.',
      'استعرض المبلغ الموفر وقيمة السعر النهائي للدفع.',
    ],
    formula: 'المبلغ الموفر = السعر الأصلي × (نسبة الخصم ÷ 100)  |  السعر النهائي = السعر الأصلي - التوفير',
    inputs: [
      { name: 'السعر الأصلي', description: 'السعر قبل تطبيق التخفيض.', unit: 'عملة', optional: false },
      { name: 'نسبة الخصم (%)', description: 'النسبة المئوية المعلنة للتخفيض.', unit: '%', optional: false },
    ],
    workedExample: {
      scenario: 'شراء معطف بسعر 120 مع تخفيض 25%.',
      stepByStep: ['حساب التوفير: 120 × 0.25 = 30.', 'طرح التوفير من السعر الأصلي: 120 - 30 = 90.'],
      result: 'التوفير: 30؛ السعر النهائي للدفع: 90.',
    },
    faqs: [{ question: 'هل الخصم الإضافي يجمع حسابياً؟', answer: 'كلا، إذا كان هناك خصم 20% ثم خصم 10% إضافي، يطبق الخصم الثاني على السعر المخفض بعد الخصم الأول.' }],
    relatedTools,
  }),
  es: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'La calculadora de descuentos calcula el precio final tras aplicar rebajas porcentuales y el ahorro económico exacto.',
    whoUsesIt: 'Compradores en rebajas y comercios que preparan promociones.',
    whatItCalculates: 'Dinero ahorrado y precio final tras la rebaja.',
    howToUse: [
      'Introduzca el precio original del producto antes del descuento.',
      'Indique el porcentaje de rebaja aplicado.',
      'Compruebe el ahorro conseguido y el precio final a pagar.',
    ],
    formula: 'Ahorro = Precio original × (% / 100)  |  Precio final = Original - Ahorro',
    inputs: [
      { name: 'Precio original', description: 'Precio de etiqueta antes del descuento.', unit: 'Moneda', optional: false },
      { name: 'Descuento (%)', description: 'Porcentaje de rebaja aplicado.', unit: '%', optional: false },
    ],
    workedExample: {
      scenario: 'Prenda de 120 con 25% de rebaja.',
      stepByStep: ['Ahorro: 120 × 0,25 = 30.', 'Precio final: 120 - 30 = 90.'],
      result: 'Ahorro: 30; Precio a pagar: 90.',
    },
    faqs: [{ question: '¿Cómo calcular descuentos acumulados?', answer: 'El segundo descuento se calcula sobre el precio ya rebajado, no sobre el importe inicial.' }],
    relatedTools,
  }),
  fr: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Le calculateur de remise détermine le prix payé après application d’un pourcentage de réduction et le montant économisé.',
    whoUsesIt: 'Consommateurs pendant les soldes et commerçants pour l’étiquetage promotionnel.',
    whatItCalculates: 'Montant de la remise et prix net après réduction.',
    howToUse: [
      'Indiquez le prix d’origine avant démarque.',
      'Saisissez le pourcentage de réduction offert.',
      'Découvrez l’économie financière réalisée et le montant net à régler.',
    ],
    formula: 'Remise = Prix initial × (% / 100)  |  Prix final = Prix initial - Remise',
    inputs: [
      { name: 'Prix initial', description: 'Prix affiché avant démarque.', unit: 'Devise', optional: false },
      { name: 'Taux de remise (%)', description: 'Pourcentage de réduction offert.', unit: '%', optional: false },
    ],
    workedExample: {
      scenario: 'Article à 120 avec une remise de 25 %.',
      stepByStep: ['Remise : 120 × 0,25 = 30.', 'Prix final : 120 - 30 = 90.'],
      result: 'Économie réalisée : 30 ; Prix final : 90.',
    },
    faqs: [{ question: 'Comment s’appliquent deux remises cumulées ?', answer: 'La seconde réduction s’applique sur le prix déjà remisé par la première démarque.' }],
    relatedTools,
  }),
  de: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Der Rabattrechner ermittelt den reduzierten Endpreis und die Ersparnis bei prozentualen Preisnachlässen und Aktionen.',
    whoUsesIt: 'Käufer beim Schlussverkauf und Einzelhändler zur Preisauszeichnung.',
    whatItCalculates: 'Ersparnis in Euro/Dollar und reduzierter Endpreis.',
    howToUse: [
      'Geben Sie den ursprünglichen Preis vor dem Rabatt ein.',
      'Tragen Sie den prozentualen Preisnachlass ein.',
      'Sehen Sie sofort Ihre Ersparnis und den reduzierten Endpreis.',
    ],
    formula: 'Ersparnis = Ursprungspreis × (% / 100)  |  Endpreis = Ursprungspreis - Ersparnis',
    inputs: [
      { name: 'Ursprungspreis', description: 'Preis vor dem Rabatt.', unit: 'Währung', optional: false },
      { name: 'Rabatt in %', description: 'Gewährter prozentualer Preisnachlass.', unit: '%', optional: false },
    ],
    workedExample: {
      scenario: 'Kleidungsstück für 120 mit 25 % Rabatt.',
      stepByStep: ['Rabattbetrag: 120 × 0,25 = 30.', 'Endpreis: 120 - 30 = 90.'],
      result: 'Ersparnis: 30; Zu zahlender Endpreis: 90.',
    },
    faqs: [{ question: 'Wie berechnet man Zusatzrabatte?', answer: 'Der Zusatzrabatt wird immer vom bereits reduzierten Zwischenbetrag abgezogen, nicht vom Ausgangspreis.' }],
    relatedTools,
  }),
};

// 4. BODY FAT CALCULATOR (US Navy Method)
export const BODY_FAT_KNOWLEDGE: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails> = {
  en: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'A body fat calculator estimates body fat percentage and classifies physical fitness composition using the official US Navy circumference method based on height, neck, waist, and hip measurements.',
    whoUsesIt: 'Athletes tracking lean mass changes, military personnel verifying body composition compliance, and fitness enthusiasts monitoring body recomposition.',
    whatItCalculates: 'Estimated body fat percentage and body composition category (Essential Fat, Athletes, Fitness, Average, or Obese).',
    howToUse: [
      'Select your biological gender (male or female).',
      'Enter your height in centimeters.',
      'Measure and enter neck circumference just below the larynx.',
      'Measure and enter waist circumference (at navel level for men, narrowest point for women).',
      'For women, measure and enter hip circumference at the widest point.',
      'View your body fat percentage and fitness category classification.',
    ],
    formula: 'Men: %Fat = 86.010 × log10(waist - neck) - 70.041 × log10(height) + 36.76  |  Women: %Fat = 163.205 × log10(waist + hip - neck) - 97.684 × log10(height) - 78.387',
    inputs: [
      { name: 'Biological Sex', description: 'Used to select sex-specific US Navy circumference formulas and anatomical fat distribution models.', unit: 'Male / Female', optional: false },
      { name: 'Height (cm)', description: 'Stature measured barefoot without shoes.', unit: 'Centimeters (cm)', optional: false },
      { name: 'Neck Circumference (cm)', description: 'Measured around the neck immediately below the larynx (Adam\'s apple).', unit: 'Centimeters (cm)', optional: false },
      { name: 'Waist Circumference (cm)', description: 'Measured horizontally at the navel level for men, or narrowest natural waistline for women.', unit: 'Centimeters (cm)', optional: false },
      { name: 'Hip Circumference (cm)', description: 'Measured at the widest horizontal point across the buttocks (required for women).', unit: 'Centimeters (cm)', optional: true },
    ],
    workedExample: {
      scenario: 'A male with height 178 cm, neck circumference 38 cm, and waist circumference 85 cm.',
      stepByStep: [
        'Calculate waist minus neck: 85 - 38 = 47 cm.',
        'Calculate log10(47): 1.6721; multiplied by 86.010 = 143.82.',
        'Calculate log10(178): 2.2504; multiplied by 70.041 = 157.62.',
        'Apply formula: 143.82 - 157.62 + 36.76 = 22.96% (rounded to 23.0%).',
        'Compare against thresholds: 18% to 25% for men falls into the "Average" category.',
      ],
      result: 'Estimated Body Fat = 23.0% (Category: Average).',
    },
    assumptions: 'Assumes tape measurements are taken firmly against bare skin without compressing soft tissue.',
    limitations: 'The US Navy formula is an estimate with an average error margin of ±3% compared to DEXA scans or hydrostatic weighing. Extreme musculature or localized water retention can shift results.',
    faqs: [
      {
        question: 'What is considered an ideal body fat percentage?',
        answer: 'For men, general fitness is typically 14%–17% and average is 18%–24%. For women, fitness is typically 21%–24% and average is 25%–31%. Essential fat levels are 2%–5% for men and 10%–13% for women.',
      },
      {
        question: 'Why does the US Navy method require tape measurements rather than scale weight?',
        answer: 'Because tape measurements reflect physical dimensions and body shape rather than gravitational weight alone, allowing the formula to differentiate between dense muscle mass and adipose tissue.',
      },
    ],
    relatedTools,
  }),
  ar: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'حاسبة نسبة الدهون في الجسم تقدر النسبة المئوية لكتلة الدهون وتحدد فئة اللياقة البدنية باستخدام طريقة البحرية الأمريكية المعتمدة قياسياً.',
    whoUsesIt: 'الرياضيون، ومتابعو اللياقة البدنية، ومن يتبعون برامج التنشيف والتخسيس.',
    whatItCalculates: 'نسبة الدهون في الجسم وتصنيف التكوين البدني (دهون أساسية، رياضي، لياقة، متوسط، بدين).',
    howToUse: [
      'حدد الجنس (ذكر أو أنثى).',
      'أدخل الطول بالسنتيمتر.',
      'قس محيط الرقبة بالسنتيمتر تحت الحنجرة مباشرة.',
      'قس محيط الخصر بالسنتيمتر بمحاذاة السرة.',
      'للإناث: قس محيط الورك عند أعرض نقطة.',
      'استعرض نسبة الدهون المقدرة وفئة التكوين الجسدي.',
    ],
    formula: 'معادلة البحرية الأمريكية (US Navy Method) المعتمدة على لوغاريتمات محيطات الجسم والطول',
    inputs: [
      { name: 'الجنس والطول', description: 'النوع والقامة بالسنتيمتر.', unit: 'سم', optional: false },
      { name: 'محيط الرقبة والخصر', description: 'قياسات شريط القياس بالسنتيمتر بدقة.', unit: 'سم', optional: false },
    ],
    workedExample: {
      scenario: 'رجل بطول 178 سم، محيط الرقبة 38 سم، والخصر 85 سم.',
      stepByStep: ['تطبيق معادلة البحرية الأمريكية للرجال ينتج: 22.96% تقرب إلى 23.0%.'],
      result: 'نسبة الدهون: 23.0% (الفئة: متوسط).',
    },
    faqs: [{ question: 'ما هو المعدل الصحي للدهون عند الرجال والنساء؟', answer: 'المعدل الطبيعي الصحي للرجال بين 14% و 24%، وللنساء بين 21% و 31%.' }],
    relatedTools,
  }),
  es: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'La calculadora de grasa corporal estima el porcentaje de tejido adiposo según el método de la Marina de EE. UU. a partir del contorno corporal.',
    whoUsesIt: 'Deportistas y personas en proceso de recomposición corporal.',
    whatItCalculates: 'Porcentaje de grasa corporal estimado y categoría de composición corporal.',
    howToUse: [
      'Seleccione su sexo (hombre o mujer).',
      'Introduzca su estatura en centímetros.',
      'Mida e introduzca el perímetro del cuello y de la cintura.',
      'En mujeres, añada el perímetro de la cadera.',
      'Consulte su porcentaje graso y clasificación fitness.',
    ],
    formula: 'Método US Navy (medidas corporales y logaritmos de contornos)',
    inputs: [{ name: 'Sexo, Estatura y Contornos', description: 'Medidas antropométricas con cinta métrica.', unit: 'cm', optional: false }],
    workedExample: {
      scenario: 'Hombre de 178 cm de altura, cuello de 38 cm y cintura de 85 cm.',
      stepByStep: ['Cálculo de la fórmula US Navy: 22,96% (23,0% redondeado).'],
      result: 'Grasa corporal = 23,0% (Categoría: Promedio).',
    },
    faqs: [{ question: '¿Cuál es el margen de error?', answer: 'Suele situarse en un ±3% respecto a pruebas densitométricas DEXA.' }],
    relatedTools,
  }),
  fr: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Le calculateur de masse grasse estime votre taux de graisse corporelle selon la méthode officielle de l’US Navy basée sur les circonférences corporelles.',
    whoUsesIt: 'Sportifs, pratiquants de fitness et adeptes de la recomposition corporelle.',
    whatItCalculates: 'Pourcentage de masse grasse estimé et catégorie de composition corporelle.',
    howToUse: [
      'Sélectionnez votre sexe (homme ou femme).',
      'Indiquez votre taille en centimètres.',
      'Mesurez et saisissez le tour de cou et le tour de taille.',
      'Pour les femmes, renseignez le tour de hanches.',
      'Obtenez votre taux de masse grasse et votre catégorie.',
    ],
    formula: 'Méthode de la Navy américaine basée sur les circonférences et la taille',
    inputs: [{ name: 'Sexe, Taille et Mensurations', description: 'Taille, tour de cou, taille et hanches.', unit: 'cm', optional: false }],
    workedExample: {
      scenario: 'Homme de 178 cm, tour de cou 38 cm et tour de taille 85 cm.',
      stepByStep: ['Application de l’équation Navy : 22,96% (23,0% arrondi).'],
      result: 'Masse grasse = 23,0% (Catégorie : Moyenne).',
    },
    faqs: [{ question: 'Quel est le taux de masse grasse idéal ?', answer: 'Entre 14 % et 17 % pour les hommes sportifs, et entre 21 % et 24 % pour les femmes sportives.' }],
    relatedTools,
  }),
  de: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Der Körperfettrechner ermittelt den Körperfettanteil (KFA) nach der wissenschaftlich anerkannten US-Navy-Umfangsmethode.',
    whoUsesIt: 'Sportler zur Verfolgung der Körperzusammensetzung und Personen bei Diäten.',
    whatItCalculates: 'Geschätzter Körperfettanteil (KFA) in Prozent und Einstufung der Fitnesskategorie.',
    howToUse: [
      'Wählen Sie Ihr biologisches Geschlecht (männlich oder weiblich).',
      'Geben Sie Ihre Körpergröße in Zentimetern an.',
      'Messen Sie den Halsumfang und den Taillenumfang mit einem Maßband.',
      'Bei Frauen: Messen Sie den Hüftumfang an der breitesten Stelle.',
      'Sehen Sie Ihren berechneten KFA und die Einstufung.',
    ],
    formula: 'US-Navy-Formel anhand von Körpergröße und Umfangsmessungen',
    inputs: [{ name: 'Geschlecht, Größe und Umfänge', description: 'Körpermaße mit dem Maßband in cm.', unit: 'cm', optional: false }],
    workedExample: {
      scenario: 'Mann mit 178 cm Größe, 38 cm Halsumfang und 85 cm Taillenumfang.',
      stepByStep: ['Berechnung nach US-Navy-Formel: 22,96% (gerundet 23,0%).'],
      result: 'Körperfettanteil = 23,0% (Kategorie: Durchschnitt).',
    },
    faqs: [{ question: 'Wie genau ist die US-Navy-Methode?', answer: 'Die Methode weist gegenüber DEXA-Scans eine durchschnittliche Genauigkeit von ca. ±3 Prozentpunkten auf.' }],
    relatedTools,
  }),
};
