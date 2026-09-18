import { ToolDef, Language } from '../../types';
import { ToolContentDetails } from './types';

type KnowledgeHandler = (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails;

function createKnowledge(dataByLang: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails>): Record<Language, KnowledgeHandler> {
  return dataByLang;
}

// 1. WATER FASTING CALCULATOR (water-fasting)
export const WATER_FASTING_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} estimates metabolic fasting timelines, glycogen depletion hours, ketosis onset, autophagy markers, and caloric deficit calculations during water-only fasting protocols.`,
    howToUse: [
      'Enter planned fasting duration in hours or days.',
      'Enter current body weight and baseline activity level.',
      'Review projected metabolic stages (ketosis, cellular autophagy, and fat oxidation).',
      'Consult the hydration and electrolyte guidance guidelines.'
    ],
    formula: 'Total Caloric Deficit = Baseline TDEE × (Fasting Hours / 24)',
    formulaVariables: [
      { name: 'Fasting Duration', description: 'Continuous elapsed hours without caloric intake.', unit: 'Hours', optional: false },
      { name: 'Daily TDEE', description: 'Total daily energy expenditure.', unit: 'kcal/day', optional: false }
    ],
    workedExample: {
      scenario: 'A healthy adult with a 2,200 kcal/day TDEE undergoes a 48-hour water fast.',
      stepByStep: [
        'Hours 0-14: Blood glucose drops, insulin declines.',
        'Hours 14-24: Hepatic liver glycogen depletion, onset of mild ketosis.',
        'Hours 24-48: Accelerated fat oxidation and upregulated cellular autophagy.',
        'Total Caloric Deficit = 2,200 kcal/day × (48 / 24) = 4,400 kcal (~1.25 lbs fat equivalent).'
      ],
      result: 'Total Caloric Deficit = 4,400 kcal | Fasting Stage = Deep Ketosis & Autophagy Peak'
    },
    interpretation: 'Provides metabolic timeline estimates for informational fasting tracking.',
    assumptions: 'Assumes complete absence of caloric macronutrients and adequate baseline hydration.',
    limitations: 'Extended fasting beyond 24-48 hours carries medical risks of electrolyte imbalance, hypotension, and refeeding syndrome. Not medical advice; always consult a licensed physician.',
    faqs: [
      { question: 'Do electrolytes break a water fast?', answer: 'Pure minerals (sodium, potassium, magnesium) without sugars or caloric additives do not break a fast and help prevent electrolyte deficiency.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتقدير المراحل الأيضية للصيام المائي، وساعات استنفاد الجليكوجين، وبدء الحالة الكيتونية، والالتهام الذاتي (Autophagy)، وحرق السعرات الحرارية.`,
    howToUse: [
      'أدخل مدة الصيام المائي بالساعات أو الأيام.',
      'أدخل وزن الجسم ومستوى النشاط اليومي.',
      'اطلع على الجدول الزمني للمراحل الأيضية (الكيتوزية، الالتهام الذاتي، أكسدة الدهون).',
      'راجع إرشادات شرب الماء والأملاح المعدنية.'
    ],
    formula: 'عجز السعرات الإجمالي = الاحتياج اليومي (TDEE) × (ساعات الصيام ÷ 24)',
    formulaVariables: [
      { name: 'مدة الصيام', description: 'الساعات المتواصلة دون طعام.', unit: 'ساعة', optional: false },
      { name: 'الاحتياج اليومي من السعرات', description: 'معدل الحرق اليومي الأساسي.', unit: 'سعرة/يوم', optional: false }
    ],
    workedExample: {
      scenario: 'صيام مائي لمدة 48 ساعة لشخص باحتياج يومي 2,200 سعرة حرارية.',
      stepByStep: [
        'الساعات 0-14: انخفاض سكر الدم وهبوط الأنسولين.',
        'الساعات 14-24: استنفاد جليكوجين الكبد وبدء الحالة الكيتونية.',
        'الساعات 24-48: تحفيز الالتهام الذاتي وزيادة حرق الدهون.',
        'إجمالي العجز من السعرات = 2,200 × 2 = 4,400 سعرة حرارية.'
      ],
      result: 'عجز السعرات = 4,400 سعرة | المرحلة = الكيتوزية العميقة والالتهام الذاتي'
    },
    interpretation: 'توضح التغيرات الأيضية المتوقعة خلال ساعات الصيام المختلفة لأغراض تعليمية.',
    assumptions: 'تفترض الامتناع الكامل عن الأطعمة ذات السعرات مع شرب كميات كافية من الماء.',
    limitations: 'الصيام المائي لفترات طويلة يحمل مخاطر هبوط الضغط واختلال الأملاح. يجب استشارة الطبيب المختص دائماً.',
    faqs: [
      { question: 'هل تكسر الأملاح المعدنية الصيام؟', answer: 'الأملاح النقية (الصوديوم، البوتاسيوم، المغنيسيوم) الخالية من السكر لا تكسر الصيام وتمنع الجفاف والصداع.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} estima las etapas metabólicas del ayuno de agua, el agotamiento del glucógeno hepático, la cetosis, la autofagia celular y el déficit calórico.`,
    howToUse: [
      'Ingrese la duración prevista del ayuno en horas.',
      'Ingrese su gasto energético diario (TDEE).',
      'Consulte la cronología metabólica y las pautas de hidratación y electrolitos.'
    ],
    formula: 'Déficit Calórico = TDEE × (Horas de Ayuno / 24)',
    formulaVariables: [
      { name: 'Horas de Ayuno', description: 'Tiempo continuo sin ingesta calórica.', unit: 'Horas', optional: false },
      { name: 'Gasto Energético (TDEE)', description: 'Calorías quemadas al día.', unit: 'kcal/día', optional: false }
    ],
    workedExample: {
      scenario: 'Ayuno de 48 horas con un TDEE de 2,200 kcal/día.',
      stepByStep: [
        '0-14 h: Reducción de glucosa e insulina en sangre.',
        '14-24 h: Vaciado de glucógeno y entrada en cetosis.',
        '24-48 h: Máxima oxidación de grasas y autofagia celular.',
        'Déficit total = 2,200 × (48 / 24) = 4,400 kcal.'
      ],
      result: 'Déficit Calórico = 4,400 kcal | Estado = Cetosis Profunda y Autofagia'
    },
    interpretation: 'Guía informativa sobre la progresión metabólica del ayuno.',
    assumptions: 'Ingesta exclusiva de agua y electrolitos sin calorías.',
    limitations: 'No es asesoramiento médico. Ayunos prolongados requieren supervisión facultativa.',
    faqs: [
      { question: '¿Qué es la autofagia?', answer: 'Un proceso natural de limpieza y reciclaje celular activado durante el ayuno prolongado.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} estime les phases métaboliques du jeûne hydrique, l'épuisement des réserves de glycogène, la cétogenèse, l'autophagie et le déficit énergétique.`,
    howToUse: [
      'Indiquez la durée prévue du jeûne en heures.',
      'Saisissez votre dépense énergétique journalière (TDEE).',
      'Consultez les paliers physiologiques et les besoins en électrolytes.'
    ],
    formula: 'Déficit Calorique = TDEE × (Heures de Jeûne / 24)',
    formulaVariables: [
      { name: 'Durée du Jeûne', description: 'Nombre d’heures consécutives sans calories.', unit: 'Heures', optional: false },
      { name: 'Dépense Journalière (TDEE)', description: 'Total des calories consommées par jour.', unit: 'kcal/jour', optional: false }
    ],
    workedExample: {
      scenario: 'Jeûne hydrique de 48 heures avec un métabolisme à 2 200 kcal/jour.',
      stepByStep: [
        '0-14 h : Chute de la glycémie et baisse de l’insuline.',
        '14-24 h : Déplétion du glycogène hépatique et cétose débutante.',
        '24-48 h : Oxydation lipidique accrue et stimulation de l’autophagie.',
        'Déficit cumulé = 2 200 × (48 / 24) = 4 400 kcal.'
      ],
      result: 'Déficit Calorique = 4 400 kcal | Phase = Cétose Profonde & Autophagie'
    },
    interpretation: 'Aperçu éducatif de la chronologie métabolique lors d’une privation calorique hydrique.',
    assumptions: 'Consommation exclusive d’eau pure et de sels minéraux.',
    limitations: 'Un jeûne prolongé présente des risques médicaux. Consultez un médecin au préalable.',
    faqs: [
      { question: 'Pourquoi les électrolytes sont-ils indispensables ?', answer: 'Ils maintiennent l’équilibre osmotique et préviennent les maux de tête et chutes de tension.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die metabolischen Phasen des Wasserfastens, den Glykogenabbau, den Beginn der Ketose, die Zell-Autophagie und das Kaloriendefizit.`,
    howToUse: [
      'Geben Sie die geplante Fastendauer in Stunden ein.',
      'Geben Sie Ihren täglichen Gesamtenergieumsatz (TDEE) ein.',
      'Prüfen Sie die zeitlichen Phasen und Empfehlungen zur Mineralstoffzufuhr.'
    ],
    formula: 'Gesamtes Kaloriendefizit = TDEE × (Fastenstunden / 24)',
    formulaVariables: [
      { name: 'Fastendauer', description: 'Stunden ohne Kalorienzufuhr.', unit: 'Stunden', optional: false },
      { name: 'Tagesumsatz (TDEE)', description: 'Täglicher Gesamtenergieverbrauch.', unit: 'kcal/Tag', optional: false }
    ],
    workedExample: {
      scenario: '48-stündiges Wasserfasten bei einem täglichen TDEE von 2.200 kcal.',
      stepByStep: [
        '0-14 Std.: Absinken des Blutzuckers und Insulins.',
        '14-24 Std.: Leberglykogenspeicher leeren sich, Beginn der Ketose.',
        '24-48 Std.: Gesteigerte Fettverbrennung und Einsetzen der Autophagie.',
        'Gesamtdefizit = 2.200 × (48 / 24) = 4.400 kcal.'
      ],
      result: 'Kaloriendefizit = 4.400 kcal | Status = Tiefe Ketose & Autophagie-Aktivierung'
    },
    interpretation: 'Veranschaulicht die physiologischen Anpassungen des Körpers während einer Fastenperiode.',
    assumptions: 'Ausschließlich kalorienfreie Flüssigkeiten und Elektrolyte.',
    limitations: 'Keine medizinische Beratung. Längeres Fasten erfordert ärztliche Begleitung.',
    faqs: [
      { question: 'Was bedeutet Autophagie?', answer: 'Ein zellulärer Selbstreinigungsprozess, bei dem beschädigte Zellbestandteile abgebaut und recycelt werden.' }
    ],
    relatedTools
  })
});

// 2. DAILY PROTEIN INTAKE (protein-intake)
export const PROTEIN_INTAKE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates personalized daily dietary protein targets in grams based on body weight, fitness goal (muscle hypertrophy, fat loss, maintenance, or endurance), and activity level.`,
    howToUse: [
      'Enter your body weight in kilograms or pounds.',
      'Select your primary fitness goal (e.g., muscle building, cutting, endurance, or general health).',
      'Select your weekly physical activity frequency.',
      'Review the recommended daily protein target in grams and grams per kilogram.'
    ],
    formula: 'Daily Protein (g) = Body Weight (kg) × Target Ratio (g/kg)',
    formulaVariables: [
      { name: 'Body Weight', description: 'Current body mass.', unit: 'kg or lbs', optional: false },
      { name: 'Protein Ratio', description: '0.8 g/kg (sedentary RDA) to 1.6-2.2 g/kg (hypertrophy/cutting).', unit: 'g/kg/day', optional: false }
    ],
    workedExample: {
      scenario: 'An 80 kg individual seeking muscle hypertrophy with resistance training (target: 2.0 g/kg).',
      stepByStep: [
        'Body Weight = 80 kg.',
        'Selected Hypertrophy Multiplier = 2.0 g/kg.',
        'Daily Protein Target = 80 kg × 2.0 g/kg = 160 grams/day.',
        'Per Meal Split (4 meals) = 160 g / 4 = 40 grams of protein per meal.'
      ],
      result: 'Target Protein = 160 g/day (640 kcal from protein) | Per-Meal Target = 40 g'
    },
    interpretation: 'Adequate protein supports muscle protein synthesis (MPS), nitrogen balance, satiety, and lean mass preservation during weight loss.',
    assumptions: 'Assumes healthy kidney and liver function without pre-existing renal disease.',
    limitations: 'In individuals with high body fat percentages, calculating protein based on Lean Body Mass (LBM) may be more appropriate.',
    faqs: [
      { question: 'What is the optimal protein per meal for muscle synthesis?', answer: 'Research indicates 20 to 40 grams of high-quality protein per meal triggers maximal muscle protein synthesis in most adults.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب الاحتياج اليومي الموصى به من البروتين بالجرام بناءً على وزن الجسم، والهدف التدريبي (بناء العضلات، التنشيف، التحمل، أو المحافظة)، ومستوى النشاط الرياضي.`,
    howToUse: [
      'أدخل وزن جسمك بالكيلوجرام أو الرطل.',
      'حدد هدفك الرياضي (تضخيم وبناء عضلات، تنشيف وخسارة دهون، رياضة تحمل، صحة عامة).',
      'حدد شدة التمارين الرياضية الأسبوعية.',
      'اطلع على الجرامات اليومية المستهدفة وتقسيمها على الوجبات.'
    ],
    formula: 'البروتين اليومي (جرام) = وزن الجسم (كجم) × معامل البروتين (جرام/كجم)',
    formulaVariables: [
      { name: 'وزن الجسم', description: 'كتلة الجسم الحالية.', unit: 'كجم', optional: false },
      { name: 'معامل البروتين', description: 'من 0.8 جم/كجم (الحد الأدنى) إلى 1.6 - 2.2 جم/كجم (لبناء العضلات).', unit: 'جرام/كجم/يوم', optional: false }
    ],
    workedExample: {
      scenario: 'شخص وزنه 80 كجم يمارس تمارين المقاومة لبناء العضلات (المعامل 2.0 جم/كجم).',
      stepByStep: [
        'الوزن = 80 كجم.',
        'معامل البناء العضلي = 2.0 جم/كجم.',
        'البروتين اليومي = 80 × 2.0 = 160 جرام بروتين يومياً.',
        'توزيع الوجبات (4 وجبات) = 160 ÷ 4 = 40 جرام بروتين لكل وجبة.'
      ],
      result: 'البروتين المستهدف = 160 جم/يوم | لكل وجبة (4 وجبات) = 40 جم'
    },
    interpretation: 'يضمن تلبية الاحتياج العضلي للحفاظ على الكتلة الخالية من الدهون وتحفيز التخليق البروتيني.',
    assumptions: 'يفترض سلامة وظائف الكلى والكبد.',
    limitations: 'للأشخاص الذين يعانون من سمنة مفرطة، يفضل الحساب بناءً على الكتلة العضلية الصافية.',
    faqs: [
      { question: 'كم جرام بروتين يحتاجه الجسم في الوجبة الواحدة؟', answer: 'توضح الدراسات أن 25 إلى 40 جراماً من البروتين عالي الجودة تكفي لتحفيز البناء العضلي بأقصى كفاءة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la cantidad diaria recomendada de proteínas en gramos según peso, objetivo deportivo y nivel de entrenamiento.`,
    howToUse: [
      'Ingrese su peso corporal en kilogramos.',
      'Seleccione su meta (hipertrofia, definición, mantenimiento, resistencia).',
      'Consulte la cantidad total en gramos y la distribución por comida.'
    ],
    formula: 'Proteína Diaria (g) = Peso (kg) × Ratio (g/kg)',
    formulaVariables: [
      { name: 'Peso Corporal', description: 'Peso actual.', unit: 'kg', optional: false },
      { name: 'Ratio de Proteína', description: 'Entre 0.8 g/kg y 2.2 g/kg según objetivo.', unit: 'g/kg/día', optional: false }
    ],
    workedExample: {
      scenario: 'Persona de 80 kg buscando hipertrofia con entrenamiento de fuerza (2.0 g/kg).',
      stepByStep: [
        'Proteína diaria = 80 kg × 2.0 g/kg = 160 gramos/día.',
        'Reparto en 4 comidas = 160 / 4 = 40 g/comida.'
      ],
      result: 'Proteína Diaria = 160 g/día | Por Comida (4 tomas) = 40 g'
    },
    interpretation: 'Optimiza la síntesis de proteína muscular y la recuperación física.',
    assumptions: 'Función renal y hepática en rango normal.',
    limitations: 'En casos de sobrepeso notable, es preferible calcular sobre la masa libre de grasa.',
    faqs: [
      { question: '¿Cuánta proteína se necesita para ganar músculo?', answer: 'Entre 1.6 y 2.2 gramos por kilo de peso corporal al día según el consenso científico internacional.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule vos besoins journaliers en protéines en fonction de votre poids, de vos objectifs physiques et de votre niveau d'activité sportive.`,
    howToUse: [
      'Indiquez votre poids corporel en kg.',
      'Sélectionnez votre objectif (prise de muscle, sèche, endurance, santé générale).',
      'Découvrez votre apport cible en grammes et la répartition par repas.'
    ],
    formula: 'Protéines Totales (g) = Poids (kg) × Coefficient (g/kg)',
    formulaVariables: [
      { name: 'Poids Corporel', description: 'Masse corporelle en kilogrammes.', unit: 'kg', optional: false },
      { name: 'Coefficient', description: 'De 0,8 g/kg (sédentaire) à 2,0 g/kg (musculation).', unit: 'g/kg/jour', optional: false }
    ],
    workedExample: {
      scenario: 'Sportif de 80 kg visant le développement musculaire (2,0 g/kg).',
      stepByStep: [
        'Apport cible = 80 kg × 2,0 g/kg = 160 g de protéines/jour.',
        'Répartition sur 4 repas = 160 / 4 = 40 g par repas.'
      ],
      result: 'Objectif Protéines = 160 g/jour | Par Repas = 40 g'
    },
    interpretation: 'Soutient la synthèse protéique musculaire et préserve la masse maigre en période de restriction calorique.',
    assumptions: 'Fonction rénale saine.',
    limitations: 'En cas de forte adiposité, privilégier un calcul basé sur la masse maigre.',
    faqs: [
      { question: 'Quand consommer ses protéines ?', answer: 'Il est conseillé de répartir les apports de façon homogène toutes les 3 à 5 heures.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet den optimalen täglichen Eiweißbedarf in Gramm basierend auf Körpergewicht, Trainingsziel und Aktivitätslevel.`,
    howToUse: [
      'Geben Sie Ihr Körpergewicht in Kilogramm ein.',
      'Wählen Sie Ihr Ziel (Muskelaufbau, Diät/Fettabbau, Ausdauer, Erhaltung).',
      'Lesen Sie die tägliche Proteinmenge und die Aufteilung pro Mahlzeit ab.'
    ],
    formula: 'Tagesbedarf Protein (g) = Körpergewicht (kg) × Faktor (g/kg)',
    formulaVariables: [
      { name: 'Körpergewicht', description: 'Aktuelles Gewicht.', unit: 'kg', optional: false },
      { name: 'Proteinfaktor', description: '0,8 g/kg (Basis) bis 1,6 - 2,2 g/kg (Kraftsport).', unit: 'g/kg/Tag', optional: false }
    ],
    workedExample: {
      scenario: '80 kg schwerer Kraftsportler mit Ziel Muskelaufbau (2,0 g/kg).',
      stepByStep: [
        'Tagesbedarf = 80 kg × 2,0 g/kg = 160 g Eiweiß/Tag.',
        'Aufteilung auf 4 Mahlzeiten = 160 / 4 = 40 g pro Mahlzeit.'
      ],
      result: 'Ziel-Eiweiß = 160 g/Tag | Pro Mahlzeit = 40 g'
    },
    interpretation: 'Unterstützt die Muskelproteinsynthese und Regeneration nach dem Training.',
    assumptions: 'Normale Nieren- und Lebergesundheit.',
    limitations: 'Bei hohem Körperfettanteil sollte die fettfreie Masse als Berechnungsgrundlage dienen.',
    faqs: [
      { question: 'Wie viel Protein ist für Muskelaufbau optimal?', answer: 'In der Sportwissenschaft gelten 1,6 bis 2,2 g pro Kilogramm Körpergewicht als optimaler Bereich.' }
    ],
    relatedTools
  })
});

// 3. CREATINE DOSING (creatine-dosing)
export const CREATINE_DOSING_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates personalized creatine monohydrate loading protocols (5-7 days) and long-term daily maintenance dosages based on body weight.`,
    howToUse: [
      'Enter your current body weight in kilograms or pounds.',
      'Select dosing strategy: Fast Loading Protocol (5-7 days) or Steady Daily Maintenance.',
      'Review daily dose schedule, split servings, and hydration recommendations.'
    ],
    formula: 'Loading Dose (g/day) = Weight (kg) × 0.3 g/kg | Maintenance Dose (g/day) = Weight (kg) × 0.03-0.05 g/kg',
    formulaVariables: [
      { name: 'Body Weight', description: 'Body mass in kg.', unit: 'kg', optional: false },
      { name: 'Loading Multiplier', description: 'Standard 0.3 g/kg/day split across 4 daily servings.', unit: 'g/kg', optional: false },
      { name: 'Maintenance Multiplier', description: 'Standard 0.03 to 0.05 g/kg/day (or flat 3-5g).', unit: 'g/kg', optional: false }
    ],
    workedExample: {
      scenario: 'An 80 kg athlete starting creatine monohydrate supplementation.',
      stepByStep: [
        'Loading Phase (Days 1-5): 80 kg × 0.3 g/kg = 24 g/day (split into 4 doses of 6g each).',
        'Maintenance Phase (Day 6+): 80 kg × 0.04 g/kg = 3.2 g to 5.0 g/day as a single daily dose.',
        'Recommended Water Intake: Add 500 mL of water daily to support intramuscular water retention.'
      ],
      result: 'Loading Protocol = 20-24 g/day (4 × 5-6g) for 5-7 days | Maintenance = 3-5 g/day indefinitely'
    },
    interpretation: 'Creatine saturates intramuscular phosphocreatine stores, boosting ATP regeneration for explosive strength and high-intensity power output.',
    assumptions: 'Applies to 100% pure Creatine Monohydrate powder.',
    limitations: 'A loading phase is optional; taking 3-5g daily achieves identical muscle saturation after 3 to 4 weeks.',
    faqs: [
      { question: 'Is a loading phase strictly necessary?', answer: 'No. A loading phase saturates muscles in 5 to 7 days, but taking 3-5 grams daily reaches full saturation in 28 days with less potential for gastrointestinal discomfort.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب جرعات الكرياتين مونوهيدرات لفترة التحميل (5-7 أيام) والجرعة اليومية المستمرة للمحافظة بناءً على وزن الجسم.`,
    howToUse: [
      'أدخل وزن جسمك بالكيلوجرام.',
      'اختر أسلوب التناول: بروتوكول التحميل السريع أو الجرعة اليومية الثابتة.',
      'اطلع على جدول الجرامات اليومية وتقسيم الحصص وكمية السوائل المطلوبة.'
    ],
    formula: 'جرعة التحميل (جم/يوم) = الوزن (كجم) × 0.3 جم/كجم | جرعة المحافظة = 3 إلى 5 جم/يوم',
    formulaVariables: [
      { name: 'وزن الجسم', description: 'كتلة الجسم الحالية.', unit: 'كجم', optional: false },
      { name: 'معامل التحميل', description: '0.3 جم لكل كجم مقسمة على 4 حصص.', unit: 'جم/كجم', optional: false }
    ],
    workedExample: {
      scenario: 'رياضي وزنه 80 كجم يبدأ في تناول مكمل الكرياتين مونوهيدرات.',
      stepByStep: [
        'مرحلة التحميل (الأيام 1-5): 80 × 0.3 = 24 جرام يومياً (4 جرعات كل منها 6 جم).',
        'مرحلة المحافظة (من اليوم السادس): 3 إلى 5 جرام يومياً كجرعة واحدة.',
        'الترطيب: شرب 500 مل إضافية من الماء يومياً.'
      ],
      result: 'فترة التحميل = 20-24 جم/يوم لمدة 5-7 أيام | فترة الاستمرار = 3-5 جم/يوم'
    },
    interpretation: 'يعزز الكرياتين مخزون الفوسفوكرياتين في العضلات لتوليد طاقة ATP لزيادة القوة البدنية.',
    assumptions: 'خاص بمكمل الكرياتين مونوهيدرات النقي.',
    limitations: 'فترة التحميل اختيارية تماماً؛ تناول 5 جم يومياً يحقق نفس التشبع العضلي خلال 4 أسابيع.',
    faqs: [
      { question: 'هل مرحلة التحميل ضرورية؟', answer: 'ليست ضرورية، بل تسرع التشبع خلال أسبوع فقط، بينما الجرعة الثابتة (5 جم) تحقق نفس النتيجة في شهر.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la dosis de creatina monohidrato en fase de carga rápida y la dosis de mantenimiento diaria según el peso.`,
    howToUse: [
      'Ingrese su peso en kilogramos.',
      'Elija entre fase de carga rápida o dosis constante de mantenimiento.',
      'Revise las tomas diarias recomendadas e ingesta de líquidos.'
    ],
    formula: 'Fase de Carga = Peso (kg) × 0.3 g/kg | Mantenimiento = 3 - 5 g/día',
    formulaVariables: [
      { name: 'Peso', description: 'Peso corporal en kg.', unit: 'kg', optional: false }
    ],
    workedExample: {
      scenario: 'Deportista de 80 kg.',
      stepByStep: [
        'Fase de carga (5-7 días): 80 × 0.3 = 24 g/día repartidos en 4 tomas de 6 g.',
        'Mantenimiento: 3 a 5 gramos diarios en una sola toma.'
      ],
      result: 'Carga = 20-24 g/día (5-7 días) | Mantenimiento = 3-5 g/día'
    },
    interpretation: 'Aumenta las reservas intramusculares de fosfocreatina para potenciar la fuerza máxima.',
    assumptions: 'Creatina monohidrato de alta pureza.',
    limitations: 'La fase de carga no es obligatoria.',
    faqs: [
      { question: '¿Cuándo tomar la creatina?', answer: 'Cualquier momento del día es válido gracias a su efecto acumulativo por saturación.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule les protocoles de charge et de maintenance de la créatine monohydrate selon le poids corporel.`,
    howToUse: [
      'Saisissez votre poids de corps en kg.',
      'Choisissez la phase de charge rapide ou la prise continue.',
      'Consultez les doses journalières et les consignes d’hydratation.'
    ],
    formula: 'Phase de Charge = Poids (kg) × 0,3 g/kg | Maintenance = 3 à 5 g/jour',
    formulaVariables: [
      { name: 'Poids', description: 'Poids en kilogrammes.', unit: 'kg', optional: false }
    ],
    workedExample: {
      scenario: 'Sportif de 80 kg débutant la supplémentation.',
      stepByStep: [
        'Phase de charge (5-7 jours) : 80 × 0,3 = 24 g/jour (4 prises de 6 g).',
        'Phase d’entretien : 3 à 5 g par jour en une prise.'
      ],
      result: 'Charge = 20-24 g/jour | Entretien = 3-5 g/jour'
    },
    interpretation: 'Optimise les réserves d’énergie ATP pour les efforts courts et intenses.',
    assumptions: 'Créatine monohydrate pure.',
    limitations: 'La phase de charge est facultative.',
    faqs: [
      { question: 'Faut-il faire des pauses de créatine ?', answer: 'Non, les études montrent qu’une supplémentation continue à dose d’entretien est sûre chez les personnes en bonne santé.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die Ladephase und dauerhafte Erhaltungsdosis von Kreatin-Monohydrat bezogen auf das Körpergewicht.`,
    howToUse: [
      'Geben Sie Ihr Körpergewicht in kg ein.',
      'Wählen Sie zwischen schneller Ladephase oder konstanter Dauereinnahme.',
      'Beachten Sie die Dosisempfehlungen und Trinkmengen.'
    ],
    formula: 'Ladephase = Körpergewicht × 0,3 g/kg | Erhaltung = 3 - 5 g/Tag',
    formulaVariables: [
      { name: 'Körpergewicht', description: 'Gewicht in kg.', unit: 'kg', optional: false }
    ],
    workedExample: {
      scenario: '80 kg schwerer Athlet.',
      stepByStep: [
        'Ladephase (5-7 Tage): 80 × 0,3 = 24 g/Tag (aufgeteilt auf 4 Portionen à 6 g).',
        'Erhaltungsphase: 3 bis 5 g täglich dauerhaft.'
      ],
      result: 'Ladephase = 20-24 g/Tag | Erhaltungsdosis = 3-5 g/Tag'
    },
    interpretation: 'Füllt die Phosphokreatinspeicher im Muskel zur Steigerung der Schnellkraft.',
    assumptions: 'Reines Kreatin-Monohydrat-Pulver.',
    limitations: 'Ladephase ist optional; 3-5 g täglich sättigen die Muskeln in 4 Wochen gleichermaßen.',
    faqs: [
      { question: 'Wann sollte Kreatin eingenommen werden?', answer: 'Der genaue Einnahmezeitpunkt ist zweitrangig, entscheidend ist die tägliche Regelmäßigkeit.' }
    ],
    relatedTools
  })
});

// 4. CAFFEINE HALF-LIFE (caffeine-halflife)
export const CAFFEINE_HALFLIFE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates caffeine elimination kinetics, exponential decay curves, and estimated blood plasma caffeine levels at bedtime based on dosage and consumption timing.`,
    howToUse: [
      'Enter total caffeine intake in milligrams (e.g., 95mg for coffee, 150mg for energy drink, 200mg for pre-workout).',
      'Enter time of consumption and planned bedtime.',
      'Optionally adjust biological elimination half-life (standard default is 5.0 hours).',
      'Review the remaining caffeine dose active in your bloodstream at sleep time.'
    ],
    formula: 'Remaining Caffeine (mg) = Initial Dose × (0.5)^(Elapsed Hours / Half-Life)',
    formulaVariables: [
      { name: 'Initial Caffeine Dose', description: 'Total milligrams ingested.', unit: 'mg', optional: false },
      { name: 'Elapsed Hours (t)', description: 'Time passed between ingestion and bedtime.', unit: 'Hours', optional: false },
      { name: 'Elimination Half-Life (t₁/₂)', description: 'Average 5.0 hours in healthy adults (range 3-7h).', unit: 'Hours', optional: true }
    ],
    workedExample: {
      scenario: 'An individual drinks a 200 mg pre-workout drink at 4:00 PM and plans to sleep at 11:00 PM (7 hours elapsed, 5.0h half-life).',
      stepByStep: [
        'Half-Life Cycles = 7 hours / 5.0 hours = 1.40 cycles.',
        'Decay Factor = (0.5)^1.40 = 0.3789.',
        'Remaining Active Caffeine = 200 mg × 0.3789 = 75.78 mg at bedtime.'
      ],
      result: 'Active Caffeine at 11:00 PM = 75.78 mg (~equivalent to drinking an espresso right before bed)'
    },
    interpretation: 'Helps optimize sleep architecture, deep slow-wave sleep, and adenosine receptor clearance by timing caffeine cutoff hours.',
    assumptions: 'Assumes typical hepatic CYP1A2 enzyme clearance kinetics.',
    limitations: 'Caffeine metabolism varies with genetics, pregnancy, oral contraceptives, and smoking status.',
    faqs: [
      { question: 'How much caffeine at bedtime disrupts sleep quality?', answer: 'Even 25 to 50 mg of active caffeine at bedtime can reduce deep slow-wave sleep and increase sleep latency.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب نصف العمر الحيوي للكافيين، ومعدل تخلصه من مجرى الدم، وكمية الكافيين المتبقية النشطة في الجسم عند النوم.`,
    howToUse: [
      'أدخل كمية الكافيين المستهلكة بالمليجرام (مثلاً 95 ملجم للقهوة، 200 ملجم لمشروبات الطاقة).',
      'أدخل وقت تناول المشروب ووقت النوم المستهدف.',
      'حدد نصف العمر الحيوي (المتوسط الطبيعي 5 ساعات).',
      'اطلع على كمية الكافيين المتبقية وتأثيرها على جودة النوم العميق.'
    ],
    formula: 'الكافيين المتبقي = الجرعة الأولية × (0.5)^(الساعات المنقضية ÷ نصف العمر)',
    formulaVariables: [
      { name: 'الجرعة الأولية', description: 'كمية الكافيين بالمليجرام.', unit: 'ملجم', optional: false },
      { name: 'الساعات المنقضية', description: 'الوقت بين الشرب وموعد النوم.', unit: 'ساعات', optional: false },
      { name: 'نصف العمر الحيوي', description: 'متوسط بقاء الكافيين (5 ساعات).', unit: 'ساعات', optional: true }
    ],
    workedExample: {
      scenario: 'تناول مشروب طاقة يحتوي على 200 ملجم كافيين الساعة 4:00 عصراً وموعد النوم 11:00 مساءً (7 ساعات).',
      stepByStep: [
        'دورات نصف العمر = 7 ÷ 5 = 1.40 دورة.',
        'معامل التحلل = (0.5)^1.40 = 0.3789.',
        'الكافيين المتبقي في الدم = 200 × 0.3789 = 75.78 ملجم.'
      ],
      result: 'الكافيين المتبقي عند النوم = 75.78 ملجم (يعادل فنجان قهوة كامل)'
    },
    interpretation: 'تساعد في ضبط مواعيد إيقاف الكافيين لحماية جودة النوم العميق ومستقبلات الأدينوزين.',
    assumptions: 'تفترض معدل استقلاب طبيعي في الكبد عبر إنزيم CYP1A2.',
    limitations: 'تتأثر سرعة التخلص بالجينات الفردية والأدوية والتدخين.',
    faqs: [
      { question: 'متى يجب التوقف عن شرب القهوة قبل النوم؟', answer: 'يوصى بالتوقف عن الكافيين قبل 8 إلى 10 ساعات على الأقل من موعد النوم لتفادي اضطرابات النوم.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la vida media de eliminación de la cafeína y la cantidad activa en sangre a la hora de dormir.`,
    howToUse: [
      'Ingrese los miligramos de cafeína consumidos.',
      'Ingrese la hora de consumo y la hora prevista para acostarse.',
      'Revise los miligramos restantes que impactan la calidad del sueño.'
    ],
    formula: 'Cafeína Restante = Dosis Inicial × (0.5)^(Horas Transcurridas / Vida Media)',
    formulaVariables: [
      { name: 'Dosis Inicial', description: 'Miligramos de cafeína.', unit: 'mg', optional: false },
      { name: 'Horas Transcurridas', description: 'Tiempo hasta dormir.', unit: 'Horas', optional: false }
    ],
    workedExample: {
      scenario: 'Toma de 200 mg a las 16:00 y descanso a las 23:00 (7 horas transcurridas, vida media de 5h).',
      stepByStep: [
        'Ciclos = 7 / 5 = 1.40.',
        'Cafeína restante = 200 × (0.5)^1.40 = 75.78 mg.'
      ],
      result: 'Cafeína Activa al Acostarse = 75.78 mg'
    },
    interpretation: 'Permite regular la ingesta para preservar la fase de sueño profundo.',
    assumptions: 'Vida media estándar de 5 horas.',
    limitations: 'La velocidad metabólica individual varía genéticamente.',
    faqs: [
      { question: '¿Cuánta cafeína tiene una taza de café?', answer: 'Un café espresso suele tener 60-80 mg y un café de filtro entre 95 y 150 mg.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} modélise la demi-vie d'élimination de la caféine et la concentration résiduelle dans l'organisme au coucher.`,
    howToUse: [
      'Indiquez la dose de caféine ingérée en milligrammes.',
      'Renseignez l’heure de consommation et l’heure du coucher.',
      'Analysez la quantité active susceptible d’altérer le sommeil profond.'
    ],
    formula: 'Caféine Résiduelle = Dose Initiale × (0,5)^(Heures Écoulées / Demi-Vie)',
    formulaVariables: [
      { name: 'Dose Initiale', description: 'Caféine totale en mg.', unit: 'mg', optional: false },
      { name: 'Heures Écoulées', description: 'Délai avant le coucher.', unit: 'Heures', optional: false }
    ],
    workedExample: {
      scenario: 'Prise de 200 mg à 16h00, coucher à 23h00 (7 h écoulées, demi-vie de 5 h).',
      stepByStep: [
        'Facteur de décroissance = (0,5)^(7 / 5) = 0,3789.',
        'Caféine active résiduelle = 200 × 0,3789 = 75,78 mg.'
      ],
      result: 'Caféine Active au Coucher = 75,78 mg'
    },
    interpretation: 'Aide à fixer une heure limite pour la caféine afin de préserver le sommeil réparateur.',
    assumptions: 'Métabolisme hépatique moyen de 5 heures de demi-vie.',
    limitations: 'La vitesse d’élimination varie selon les individus.',
    faqs: [
      { question: 'À quelle heure arrêter le café ?', answer: 'Idéalement 8 à 10 heures avant l’endormissement.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die biologische Halbwertszeit von Koffein und die verbleibende Restmenge im Blut zur Schlafenszeit.`,
    howToUse: [
      'Geben Sie die aufgenommene Koffeinmenge in Milligramm ein.',
      'Geben Sie Einnahmezeit und geplante Schlafenszeit ein.',
      'Lesen Sie die noch aktive Restdosis im Blut ab.'
    ],
    formula: 'Restkoffein (mg) = Anfangsdosis × (0,5)^(Vergangene Stunden / Halbwertszeit)',
    formulaVariables: [
      { name: 'Koffeindosis', description: 'Aufgenommene Menge in mg.', unit: 'mg', optional: false },
      { name: 'Vergangene Stunden', description: 'Zeit bis zum Schlafen.', unit: 'Stunden', optional: false }
    ],
    workedExample: {
      scenario: '200 mg Koffein um 16:00 Uhr, Schlafenszeit um 23:00 Uhr (7 Stunden später, 5 Std. Halbwertszeit).',
      stepByStep: [
        'Abbaufaktor = (0,5)^(7 / 5) = 0,3789.',
        'Restkoffein = 200 × 0,3789 = 75,78 mg.'
      ],
      result: 'Restkoffein um 23:00 Uhr = 75,78 mg'
    },
    interpretation: 'Hilft bei der Optimierung der Schlafqualität und Tiefschlafphasen.',
    assumptions: 'Durchschnittliche Eliminationshalbwertszeit von 5 Stunden.',
    limitations: 'Individuelle Enzymaktivität führt zu unterschiedlichen Abbaugeschwindigkeiten.',
    faqs: [
      { question: 'Stört Restkoffein den Schlaf?', answer: 'Bereits 50 mg Restkoffein können die Einschlafzeit verlängern und Tiefschlafphasen verkürzen.' }
    ],
    relatedTools
  })
});

// 5. STEPS TO CALORIES (steps-to-calories)
export const STEPS_TO_CALORIES_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} converts daily step counts into calories burned, walking distance, and active minutes based on body weight, height, and walking cadence.`,
    howToUse: [
      'Enter total daily step count from your pedometer or smartwatch.',
      'Enter your body weight in kg or lbs.',
      'Enter height (or estimated stride length, average 0.75 meters).',
      'Review total estimated calories burned and distance traveled in km/miles.'
    ],
    formula: 'Calories Burned = Steps × Distance per Step (miles) × Weight (lbs) × 0.57',
    formulaVariables: [
      { name: 'Step Count', description: 'Total recorded footsteps.', unit: 'Steps', optional: false },
      { name: 'Body Weight', description: 'Weight in kg or lbs.', unit: 'Weight', optional: false },
      { name: 'Walking Pace', description: 'Casual, moderate, or brisk walking cadence.', unit: 'MET Factor', optional: true }
    ],
    workedExample: {
      scenario: 'A 70 kg (154 lb) individual takes 10,000 steps at an average stride length of 0.75 meters (7.5 km / 4.66 miles).',
      stepByStep: [
        'Distance = 10,000 × 0.75 m = 7,500 meters (7.50 km / 4.66 miles).',
        'Calories Burned = 10,000 steps × ~0.040 kcal/step for a 70 kg person = 400 kcal.',
        'Estimated Walking Time (100 steps/min) = 100 minutes (1h 40m).'
      ],
      result: 'Calories Burned = 400.0 kcal | Distance = 7.50 km (4.66 mi) | Active Time = 100 min'
    },
    interpretation: 'Converts everyday non-exercise activity thermogenesis (NEAT) step metrics into tangible energy expenditure values.',
    assumptions: 'Assumes flat terrain and consistent walking stride.',
    limitations: 'Incline, terrain resistance, and running speed increase energy expenditure per step.',
    faqs: [
      { question: 'How many calories are burned per 1,000 steps?', answer: 'On average, a person burns 35 to 50 calories per 1,000 steps depending on their body weight and walking pace.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحويل عدد الخطوات اليومية إلى سعرات حرارية محروقة ومسافة مقطوعة بالكيلومتر والميل بناءً على وزن الجسم وطول الخطوة.`,
    howToUse: [
      'أدخل عدد الخطوات اليومية المسجلة في الهاتف أو الساعة الذكية.',
      'أدخل وزن الجسم بالكيلوجرام.',
      'أدخل الطول لتقدير طول الخطوة (المتوسط 0.75 متر).',
      'اطلع على السعرات المحروقة والمسافة الإجمالية المقطوعة.'
    ],
    formula: 'السعرات المحروقة = الخطوات × المسافة لكل خطوة × وزن الجسم × معامل الحرق',
    formulaVariables: [
      { name: 'عدد الخطوات', description: 'إجمالي خطوات المشي.', unit: 'خطوة', optional: false },
      { name: 'وزن الجسم', description: 'الوزن بالكيلوجرام.', unit: 'كجم', optional: false }
    ],
    workedExample: {
      scenario: 'شخص وزنه 70 كجم مشى 10,000 خطوة بمتوسط طول خطوة 0.75 متر (7.5 كم).',
      stepByStep: [
        'المسافة المقطوعة = 10,000 × 0.75 = 7,500 متر (7.5 كم).',
        'السعرات المحروقة = 10,000 × 0.040 سعرة = 400 سعرة حرارية.',
        'مدة المشي التقديرية = 100 دقيقة.'
      ],
      result: 'السعرات المحروقة = 400.0 سعرة | المسافة = 7.50 كم | مدة المشي = 100 دقيقة'
    },
    interpretation: 'تحول النشاط الحركي اليومي (NEAT) إلى أرقام طاقة دقيقة لحساب عجز السعرات.',
    assumptions: 'تفترض المشي على أرض مستوية بخطى منتظمة.',
    limitations: 'صعود المرتفعات أو الركض السريع يرفع معدل الحرق لكل خطوة.',
    faqs: [
      { question: 'كم سعرة يحرقها المشي 10,000 خطوة؟', answer: 'يحرق الشخص المتوسط ما بين 350 إلى 500 سعرة حرارية لكل 10,000 خطوة حسب الوزن والسرعة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} convierte el número de pasos diarios en calorías quemadas, distancia recorrida en km y tiempo activo según peso corporal.`,
    howToUse: [
      'Ingrese los pasos totales registrados.',
      'Ingrese su peso corporal en kilogramos.',
      'Consulte las calorías consumidas y la distancia recorrida.'
    ],
    formula: 'Calorías = Pasos × Distancia por Paso × Factor de Peso',
    formulaVariables: [
      { name: 'Pasos', description: 'Pasos caminados.', unit: 'Pasos', optional: false },
      { name: 'Peso', description: 'Peso en kg.', unit: 'kg', optional: false }
    ],
    workedExample: {
      scenario: 'Persona de 70 kg con 10,000 pasos (paso de 0.75 m = 7.5 km).',
      stepByStep: [
        'Distancia = 7.50 km.',
        'Calorías = 10,000 × 0.04 kcal/paso = 400 kcal.'
      ],
      result: 'Calorías = 400.0 kcal | Distancia = 7.50 km | Tiempo = 100 min'
    },
    interpretation: 'Mide el gasto energético por actividad física no estructurada (NEAT).',
    assumptions: 'Caminata en terreno llano.',
    limitations: 'Caminar en pendiente o correr incrementa el gasto calórico.',
    faqs: [
      { question: '¿Cuántos km son 10,000 pasos?', answer: 'Aproximadamente 7 a 8 kilómetros para la mayoría de adultos.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} convertit le nombre de pas en calories brûlées, distance parcourue en kilomètres et durée de marche selon le poids.`,
    howToUse: [
      'Indiquez le nombre de pas enregistrés.',
      'Saisissez votre poids en kilogrammes.',
      'Consultez les calories dépensées et la distance équivalente.'
    ],
    formula: 'Calories Dépensées = Pas × Longueur de Foulée × Coefficient Poids',
    formulaVariables: [
      { name: 'Nombre de Pas', description: 'Total des pas.', unit: 'Pas', optional: false },
      { name: 'Poids', description: 'Poids corporel en kg.', unit: 'kg', optional: false }
    ],
    workedExample: {
      scenario: 'Personne de 70 kg marchant 10 000 pas (foulée de 0,75 m).',
      stepByStep: [
        'Distance = 7,50 km.',
        'Calories = 10 000 × 0,04 = 400 kcal.'
      ],
      result: 'Calories Brûlées = 400,0 kcal | Distance = 7,50 km | Durée = 100 min'
    },
    interpretation: 'Permet d’évaluer la dépense énergétique de la marche quotidienne.',
    assumptions: 'Marche sur terrain plat à rythme régulier.',
    limitations: 'Les dénivelés et la course augmentent la dépense unitaire.',
    faqs: [
      { question: 'Combien de calories brûlent 10 000 pas ?', answer: 'Entre 350 et 500 kcal selon le poids et la cadence.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet den Kalorienverbrauch, die zurückgelegte Gehstrecke in Kilometern und die Aktivitätsdauer aus der täglichen Schrittzahl.`,
    howToUse: [
      'Geben Sie die gezählte Schrittanzahl ein.',
      'Geben Sie Ihr Körpergewicht in Kilogramm ein.',
      'Lesen Sie die verbrannten Kalorien und die Kilometerdistanz ab.'
    ],
    formula: 'Verbrannte Kalorien = Schritte × Schrittlänge × Gewichtsfaktor',
    formulaVariables: [
      { name: 'Schrittzahl', description: 'Gezählte Schritte.', unit: 'Schritte', optional: false },
      { name: 'Körpergewicht', description: 'Gewicht in kg.', unit: 'kg', optional: false }
    ],
    workedExample: {
      scenario: '70 kg schwere Person mit 10.000 Schritten (Schrittlänge 0,75 m).',
      stepByStep: [
        'Distanz = 10.000 × 0,75 m = 7,50 km.',
        'Kalorien = 10.000 × 0,04 = 400 kcal.'
      ],
      result: 'Verbrannte Kalorien = 400,0 kcal | Distanz = 7,50 km | Zeit = 100 Min.'
    },
    interpretation: 'Quantifiziert die Alltagsaktivität (NEAT) für das persönliche Gewichtsmanagement.',
    assumptions: 'Ebene Strecke bei normalem Schritttempo.',
    limitations: 'Steigungen oder Joggen erhöhen den Kalorienverbrauch pro Schritt.',
    faqs: [
      { question: 'Wie viele Kilometer entsprechen 10.000 Schritte?', answer: 'In der Regel etwa 7 bis 8 Kilometer je nach Körpergröße.' }
    ],
    relatedTools
  })
});

// 6. RUNNING PACE SPLIT (running-pace-split)
export const RUNNING_PACE_SPLIT_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates race split times, per-kilometer and per-mile running paces, speed in km/h or mph, and projected finish times for 5K, 10K, half-marathon, and marathon distances.`,
    howToUse: [
      'Select a standard race distance (5K, 10K, Half Marathon 21.1 km, Marathon 42.2 km) or custom distance.',
      'Enter your target finish time in hours, minutes, and seconds.',
      'Review required average pace per km/mile and intermediate milestone split times.'
    ],
    formula: 'Pace (min/km) = Total Time (minutes) / Distance (km) | Speed (km/h) = 60 / Pace',
    formulaVariables: [
      { name: 'Total Time', description: 'Target duration in hours, minutes, seconds.', unit: 'Time', optional: false },
      { name: 'Distance', description: 'Race distance in kilometers or miles.', unit: 'km or miles', optional: false }
    ],
    workedExample: {
      scenario: 'Runner targeting a sub-4:00:00 marathon (42.195 km in 240 minutes).',
      stepByStep: [
        'Pace per km = 240 minutes / 42.195 km = 5.688 min/km = 5 minutes and 41 seconds per km (5:41/km).',
        'Pace per mile = 240 minutes / 26.219 miles = 9.153 min/mile = 9 minutes and 9 seconds per mile (9:09/mi).',
        'Speed = 60 / 5.688 = 10.55 km/h (6.55 mph).',
        'Half Marathon Split (21.0975 km) = 1 hour 59 minutes 59 seconds.'
      ],
      result: 'Target Pace = 5:41 /km (9:09 /mi) | Average Speed = 10.55 km/h | Halfway Split = 1:59:59'
    },
    interpretation: 'Enables runners to structure pacing strategies to avoid early fatigue and negative-split endurance races.',
    assumptions: 'Assumes even pacing across flat running courses.',
    limitations: 'Course elevation, heat, humidity, and wind resistance affect actual race day pacing.',
    faqs: [
      { question: 'What is a negative split strategy?', answer: 'Running the second half of a race faster than the first half, proven to conserve glycogen and maximize endurance performance.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب وتيرة الركض (Pace) لكل كيلومتر وميل، والسرعة، وأزمنة تقسيم المسافات (Splits) لسباقات 5K و 10K ونصف الماراثون والماراثون الكامل.`,
    howToUse: [
      'اختر مسافة السباق (5 كم، 10 كم، نصف ماراثون 21.1 كم، ماراثون 42.2 كم) أو مسافة مخصصة.',
      'أدخل زمن النهاية المستهدف بالساعات والدقائق والثواني.',
      'اطلع على متوسط السرعة ومعدل الوتيرة اللازم لكل كيلومتر وأزمنة المرور في المحطات.'
    ],
    formula: 'الوتيرة (دقيقة/كم) = إجمالي الوقت (بالدقائق) ÷ المسافة (كم) | السرعة = 60 ÷ الوتيرة',
    formulaVariables: [
      { name: 'إجمالي الوقت', description: 'الزمن المستهدف للسباق.', unit: 'ساعات:دقائق:ثواني', optional: false },
      { name: 'المسافة', description: 'مسافة الجري بالكيلومتر.', unit: 'كم', optional: false }
    ],
    workedExample: {
      scenario: 'عداء يستهدف إنهاء ماراثون كامل (42.195 كم) في أقل من 4 ساعات (240 دقيقة).',
      stepByStep: [
        'الوتيرة لكل كم = 240 ÷ 42.195 = 5.688 دقيقة/كم = 5 دقائق و 41 ثانية/كم (5:41/كم).',
        'الوتيرة لكل ميل = 9 دقائق و 9 ثوانٍ/ميل (9:09/mi).',
        'السرعة = 10.55 كم/ساعة.',
        'زمن نصف الماراثون (21.1 كم) = 1 ساعة و 59 دقيقة و 59 ثانية.'
      ],
      result: 'الوتيرة المطلوبة = 5:41 /كم (9:09 /ميل) | السرعة = 10.55 كم/ساعة | منتصف السباق = 1:59:59'
    },
    interpretation: 'تساعد العدائين في تنظيم استراتيجية السرعة وتوزيع الجهد طوال مسار السباق.',
    assumptions: 'تفترض وتيرة ثابتة على مسار مستوٍ.',
    limitations: 'تؤثر التضاريس والرياح والحرارة على الوتيرة الواقعية يوم السباق.',
    faqs: [
      { question: 'ما هي استراتيجية Negative Split؟', answer: 'أن يكون النصف الثاني من السباق أسرع من النصف الأول للحفاظ على الطاقة وتحقيق أفضل زمن.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el ritmo de carrera (pace) por km y milla, velocidad media y parciales para 5K, 10K, Media Maratón y Maratón.`,
    howToUse: [
      'Seleccione la distancia de carrera.',
      'Ingrese su tiempo objetivo en horas, minutos y segundos.',
      'Consulte el ritmo exacto por kilómetro y los tiempos de paso parciales.'
    ],
    formula: 'Ritmo (min/km) = Tiempo Total (min) / Distancia (km)',
    formulaVariables: [
      { name: 'Tiempo Objetivo', description: 'Duración total.', unit: 'Tiempo', optional: false },
      { name: 'Distancia', description: 'Distancia en km.', unit: 'km', optional: false }
    ],
    workedExample: {
      scenario: 'Maratón (42.195 km) en 4 horas exactas (240 minutos).',
      stepByStep: [
        'Ritmo por km = 240 / 42.195 = 5:41 min/km.',
        'Ritmo por milla = 9:09 min/mi.',
        'Velocidad media = 10.55 km/h.'
      ],
      result: 'Ritmo Objetivo = 5:41 /km | Velocidad = 10.55 km/h | Parcial Media Maratón = 1:59:59'
    },
    interpretation: 'Permite regular el esfuerzo para evitar desfallecimientos en competición.',
    assumptions: 'Ritmo constante en trazado llano.',
    limitations: 'El desnivel y la meteorología exigen ajustes en carrera.',
    faqs: [
      { question: '¿Cómo convertir velocidad en km/h a ritmo en min/km?', answer: 'Divida 60 entre la velocidad en km/h (ejemplo: 60 / 12 km/h = 5:00 min/km).' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule l'allure de course (min/km et min/mile), la vitesse moyenne et les temps de passage pour 5 km, 10 km, semi-marathon et marathon.`,
    howToUse: [
      'Sélectionnez la distance de course.',
      'Indiquez votre temps cible en heures, minutes et secondes.',
      'Consultez l’allure requise et les temps intermédiaires.'
    ],
    formula: 'Allure (min/km) = Temps Total (min) / Distance (km)',
    formulaVariables: [
      { name: 'Temps Cible', description: 'Objectif chronométrique.', unit: 'Temps', optional: false },
      { name: 'Distance', description: 'Distance en km.', unit: 'km', optional: false }
    ],
    workedExample: {
      scenario: 'Marathon (42,195 km) en 4h00 (240 minutes).',
      stepByStep: [
        'Allure = 240 / 42,195 = 5:41 min/km.',
        'Vitesse moyenne = 10,55 km/h.',
        'Passage semi-marathon = 1h59m59s.'
      ],
      result: 'Allure Cible = 5:41 /km | Vitesse = 10,55 km/h | Passage Semi = 1:59:59'
    },
    interpretation: 'Indispensable pour calibrer les séances de fractionné et gérer son allure en compétition.',
    assumptions: 'Allure régulière sur parcours plat.',
    limitations: 'Les côtes et le vent modifient l’allure réelle.',
    faqs: [
      { question: 'Qu’est-ce qu’un negative split ?', answer: 'Courir la deuxième moitié de course plus rapidement que la première pour optimiser l’endurance.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die Lauf-Pace (Min/km und Min/Meile), Durchschnittsgeschwindigkeit und Zwischenzeiten für 5 km, 10 km, Halbmarathon und Marathon.`,
    howToUse: [
      'Wählen Sie die Wettkampfdistanz aus.',
      'Geben Sie Ihre Zielzeit in Stunden, Minuten und Sekunden ein.',
      'Lesen Sie die erforderliche Kilometer-Pace und Durchgangszeiten ab.'
    ],
    formula: 'Pace (Min/km) = Gesamtzeit (Min) / Distanz (km)',
    formulaVariables: [
      { name: 'Zielzeit', description: 'Gesamtzeitdauer.', unit: 'Zeit', optional: false },
      { name: 'Distanz', description: 'Strecke in Kilometern.', unit: 'km', optional: false }
    ],
    workedExample: {
      scenario: 'Marathon (42,195 km) in 4:00:00 Stunden (240 Minuten).',
      stepByStep: [
        'Pace = 240 / 42,195 = 5:41 Min/km.',
        'Pace Meile = 9:09 Min/mi.',
        'Geschwindigkeit = 10,55 km/h.'
      ],
      result: 'Ziel-Pace = 5:41 /km | Geschwindigkeit = 10,55 km/h | Halbmarathon-Split = 1:59:59'
    },
    interpretation: 'Strukturiert das Renntempo zur Vermeidung von verfrühtem Krafteinbruch.',
    assumptions: 'Gleichmäßige Geschwindigkeit auf ebener Strecke.',
    limitations: 'Höhenmeter und Wetterbedingungen beeinflussen die Zielpace.',
    faqs: [
      { question: 'Wie rechnet man km/h in Pace um?', answer: 'Teilen Sie 60 durch die Geschwindigkeit in km/h (z. B. 60 / 10 km/h = 6:00 Min/km).' }
    ],
    relatedTools
  })
});

// 7. BENCH PRESS ONE-REP MAX (bench-press-max)
export const BENCH_PRESS_MAX_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates estimated Bench Press One-Repetition Maximum (1RM), relative strength ratios, and training percentage loads using the Brzycki and Epley equations.`,
    howToUse: [
      'Enter the weight lifted in kilograms or pounds.',
      'Enter the number of successful repetitions performed to technical failure (best between 1 and 10 reps).',
      'Optionally enter your body weight to compute relative strength score.',
      'Review your estimated 1RM and percentage load training table (90%, 80%, 70%, etc.).'
    ],
    formula: '1RM (Brzycki) = Weight / (1.0278 - 0.0278 × Reps) | 1RM (Epley) = Weight × (1 + Reps / 30)',
    formulaVariables: [
      { name: 'Weight Lifted', description: 'Barbell load used during set.', unit: 'kg or lbs', optional: false },
      { name: 'Repetitions', description: 'Clean repetitions performed (1 to 10 recommended).', unit: 'Reps', optional: false },
      { name: 'Body Weight', description: 'User weight for relative strength multiplier.', unit: 'kg or lbs', optional: true }
    ],
    workedExample: {
      scenario: 'An 80 kg lifter benches 100 kg for 6 clean repetitions.',
      stepByStep: [
        'Epley Formula: 100 kg × (1 + 6 / 30) = 100 × 1.20 = 120.0 kg.',
        'Brzycki Formula: 100 kg / (1.0278 - 0.0278 × 6) = 100 / 0.861 = 116.14 kg.',
        'Standard Average 1RM = 118.0 kg.',
        'Relative Strength Ratio = 118 kg / 80 kg = 1.48× bodyweight.'
      ],
      result: 'Estimated 1RM = 118.0 kg (260 lbs) | Relative Strength = 1.48× Bodyweight | 80% 1RM (Hypertrophy) = 94.4 kg'
    },
    interpretation: 'Enables lifters to calculate strength targets and program training blocks without risking injury on true maximum singles.',
    assumptions: 'Assumes strict full-range barbell bench press technique.',
    limitations: 'Equations become less accurate when repetitions exceed 10-12 reps.',
    faqs: [
      { question: 'Why is testing submaximal reps safer than true 1RM?', answer: 'Testing a 3-to-5 rep max poses significantly less joint stress and risk of muscular strain or shoulder injury than an all-out 1-rep maximum attempt.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتقدير أقصى وزن للتكرار الواحد (1RM) في تمرين البنش برس، والنسب التدريبية، ونسبة القوة النسبية للوزن باستخدام معادلات Epley و Brzycki.`,
    howToUse: [
      'أدخل الوزن المرفوع في المجموعة بالكيلوجرام أو الرطل.',
      'أدخل عدد التكرارات الصحيحة المنجزة (يفضل بين 1 إلى 10 تكرارات).',
      'أدخل وزن جسمك لحساب نسبة القوة بالنسبة لكتلة الجسم.',
      'اطلع على جدول أوزان التكرارات لنسب 90% و 80% و 70% للبرامج التدريبية.'
    ],
    formula: 'أقصى وزن (Epley) = الوزن × (1 + التكرارات ÷ 30) | (Brzycki) = الوزن ÷ (1.0278 - 0.0278 × التكرارات)',
    formulaVariables: [
      { name: 'الوزن المرفوع', description: 'وزن البار بالأقراص.', unit: 'كجم', optional: false },
      { name: 'عدد التكرارات', description: 'التكرارات المكتملة بأداء سليم.', unit: 'تكرار', optional: false },
      { name: 'وزن الجسم', description: 'وزن المتدرب.', unit: 'كجم', optional: true }
    ],
    workedExample: {
      scenario: 'شخص وزنه 80 كجم قام برفع 100 كجم لـ 6 تكرارات صحيحة.',
      stepByStep: [
        'معادلة Epley = 100 × (1 + 6 ÷ 30) = 120.0 كجم.',
        'معادلة Brzycki = 100 ÷ (1.0278 - 0.0278 × 6) = 116.14 كجم.',
        'المتوسط التقديري = 118.0 كجم.',
        'القوة النسبية = 118 ÷ 80 = 1.48 ضعف وزن الجسم.'
      ],
      result: 'أقصى تكرار تقديري (1RM) = 118.0 كجم | القوة النسبية = 1.48× وزن الجسم | وزن 80% = 94.4 كجم'
    },
    interpretation: 'تتيح للاعبي كمال الأجسام والقوة البدنية برمجة أحمال التدريب بدقة وتجنب الإصابات.',
    assumptions: 'تفترض الأداء الحركي الكامل والصحيح للبنش برس.',
    limitations: 'تقل دقة المعادلات إذا تجاوزت التكرارات 10 إلى 12 تكراراً.',
    faqs: [
      { question: 'لماذا يفضل حساب 1RM عبر التكرارات الفرعية؟', answer: 'لأنه يقلل من إجهاد المفاصل وخطر إصابات الكتف والصدر مقارنة برفع أقصى وزن ممكن مباشرة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la Repetición Máxima (1RM) en press de banca, fuerza relativa y cargas de entrenamiento según fórmulas de Epley y Brzycki.`,
    howToUse: [
      'Ingrese el peso levantado en kilogramos.',
      'Ingrese las repeticiones completadas al fallo técnico (1-10 reps).',
      'Consulte su 1RM estimado y la tabla de porcentajes de carga.'
    ],
    formula: '1RM (Epley) = Peso × (1 + Repeticiones / 30)',
    formulaVariables: [
      { name: 'Peso', description: 'Carga en barra.', unit: 'kg', optional: false },
      { name: 'Repeticiones', description: 'Reps completadas.', unit: 'Reps', optional: false }
    ],
    workedExample: {
      scenario: 'Atleta de 80 kg que levanta 100 kg para 6 repeticiones.',
      stepByStep: [
        'Fórmula Epley = 100 × 1.20 = 120.0 kg.',
        'Fórmula Brzycki = 116.14 kg.',
        'Promedio estimado = 118.0 kg.',
        'Fuerza relativa = 1.48× peso corporal.'
      ],
      result: '1RM Estimado = 118.0 kg | Fuerza Relativa = 1.48× Peso | Carga 80% = 94.4 kg'
    },
    interpretation: 'Permite periodizar las rutinas de fuerza de forma segura.',
    assumptions: 'Rango de movimiento completo y técnica estricta.',
    limitations: 'Menor precisión en series superiores a 10 repeticiones.',
    faqs: [
      { question: '¿Qué es el 1RM?', answer: 'El peso máximo que una persona puede levantar en un ejercicio para una sola repetición completa.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} estime le 1RM (Répétition Maximale) au développé couché, la force relative et la grille des pourcentages de charge.`,
    howToUse: [
      'Indiquez la charge soulevée en kg.',
      'Saisissez le nombre de répétitions réussies (idéalement 1 à 10 reps).',
      'Consultez votre maxi estimé et les pourcentages d’entraînement.'
    ],
    formula: '1RM (Epley) = Charge × (1 + Répétitions / 30)',
    formulaVariables: [
      { name: 'Charge', description: 'Poids sur la barre en kg.', unit: 'kg', optional: false },
      { name: 'Répétitions', description: 'Nombre de répétitions.', unit: 'Reps', optional: false }
    ],
    workedExample: {
      scenario: 'Pratiquant de 80 kg soulevant 100 kg sur 6 répétitions.',
      stepByStep: [
        'Formule Epley = 100 × (1 + 6 / 30) = 120,0 kg.',
        'Formule Brzycki = 116,14 kg.',
        '1RM moyen estimé = 118,0 kg.',
        'Ratio de force = 1,48× le poids de corps.'
      ],
      result: '1RM Estimé = 118,0 kg | Force Relative = 1,48× Poids | Charge 80 % = 94,4 kg'
    },
    interpretation: 'Permet de planifier les cycles de force sans risque de blessure lié aux tests de charges maximales réelles.',
    assumptions: 'Mouvement exécuté avec amplitude complète.',
    limitations: 'Fiabilité réduite au-delà de 10 à 12 répétitions.',
    faqs: [
      { question: 'Pourquoi utiliser des sous-maxima ?', answer: 'Tester une série de 3 à 6 répétitions préserve les épaules et les articulations par rapport à un essai à 100 %.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} schätzt das Maximalgewicht für eine Wiederholung (1RM) beim Bankdrücken sowie Trainingslasten nach den Formeln von Epley und Brzycki.`,
    howToUse: [
      'Geben Sie das bewegte Gewicht in kg ein.',
      'Geben Sie die geschafften Wiederholungen ein (empfohlen 1-10 Wdh.).',
      'Lesen Sie Ihr 1RM und die Lasttabelle für Trainingssätze ab.'
    ],
    formula: '1RM (Epley) = Gewicht × (1 + Wdh. / 30)',
    formulaVariables: [
      { name: 'Hantelgewicht', description: 'Bewältigte Last.', unit: 'kg', optional: false },
      { name: 'Wiederholungen', description: 'Saubere Wiederholungen.', unit: 'Wdh.', optional: false }
    ],
    workedExample: {
      scenario: '80 kg Athlet drückt 100 kg für 6 Wiederholungen.',
      stepByStep: [
        'Epley-Formel = 100 × 1,20 = 120,0 kg.',
        'Brzycki-Formel = 116,14 kg.',
        'Geschätztes 1RM = 118,0 kg.',
        'Relative Stärke = 1,48× Körpergewicht.'
      ],
      result: 'Geschätztes 1RM = 118,0 kg | Relative Kraft = 1,48× Körpergewicht | 80 % Last = 94,4 kg'
    },
    interpretation: 'Erleichtert die Trainingssteuerung im Hypertrophie- und Maximalkraftbereich.',
    assumptions: 'Voller Bewegungsumfang mit korrekter Technik.',
    limitations: 'Ungenaue Schätzungen bei mehr als 10 Wiederholungen.',
    faqs: [
      { question: 'Was ist 1RM?', answer: 'One Repetition Maximum bezeichnet das maximale Gewicht, das für genau eine Wiederholung bewältigt werden kann.' }
    ],
    relatedTools
  })
});

// 8. ADVANCED TDEE BREAKDOWN (tdee-advanced)
export const TDEE_ADVANCED_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates Total Daily Energy Expenditure (TDEE) broken down into Basal Metabolic Rate (BMR), Non-Exercise Activity Thermogenesis (NEAT), Exercise Activity Thermogenesis (EAT), and Thermic Effect of Food (TEF).`,
    howToUse: [
      'Enter gender, age, height in cm/inches, and body weight in kg/lbs.',
      'Select occupational activity level (sedentary, standing, active labor).',
      'Enter weekly exercise frequency and intensity.',
      'Review complete component breakdown (BMR, NEAT, EAT, TEF) and caloric maintenance baseline.'
    ],
    formula: 'TDEE = BMR + NEAT + EAT + TEF (~10% of total calories)',
    formulaVariables: [
      { name: 'Basal Metabolic Rate (BMR)', description: 'Energy spent at rest via Mifflin-St Jeor formula.', unit: 'kcal/day', optional: false },
      { name: 'NEAT', description: 'Non-exercise daily movement (fidgeting, walking, chores).', unit: 'kcal/day', optional: false },
      { name: 'EAT', description: 'Structured exercise and workout energy expenditure.', unit: 'kcal/day', optional: false },
      { name: 'TEF', description: 'Thermic effect of digesting macronutrients (~10%).', unit: 'kcal/day', optional: false }
    ],
    workedExample: {
      scenario: 'A 30-year-old male, 180 cm, 80 kg, office job (sedentary NEAT), training 4 days/week (moderate EAT).',
      stepByStep: [
        'BMR (Mifflin-St Jeor) = (10 × 80) + (6.25 × 180) - (5 × 30) + 5 = 800 + 1,125 - 150 + 5 = 1,780 kcal.',
        'NEAT (Daily walking & desk posture) = ~300 kcal.',
        'EAT (Averaged 4 gym sessions/week) = ~350 kcal/day.',
        'TEF (10% of intake) = ~270 kcal.',
        'Total TDEE = 1,780 + 300 + 350 + 270 = 2,700 kcal/day.'
      ],
      result: 'Total TDEE = 2,700 kcal/day (BMR: 66% | NEAT: 11% | EAT: 13% | TEF: 10%)'
    },
    interpretation: 'Demystifies daily metabolism by isolating metabolic components rather than applying a blanket multiplier.',
    assumptions: 'Assumes typical metabolic efficiency and normal body composition.',
    limitations: 'Metabolic adaptation during prolonged caloric deficits can downregulate NEAT and BMR.',
    faqs: [
      { question: 'What is NEAT?', answer: 'Non-Exercise Activity Thermogenesis: all movement that is not sleeping, eating, or sports (e.g., walking, taking stairs, moving around).' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب إجمالي استهلاك الطاقة اليومي (TDEE) مع تفصيل دقيق لكل مكون: الأيض الأساسي (BMR)، والنشاط غير الرياضي (NEAT)، والتمارين الرياضية (EAT)، والتأثير الحراري للطعام (TEF).`,
    howToUse: [
      'أدخل الجنس والعمر والطول والوزن.',
      'حدد طبيعة العمل اليومي (مكتبي، وقوف، عمل بدني شاق).',
      'أدخل عدد أيام وشدة التمارين الرياضية أسبوعياً.',
      'اطلع على تفصيل حرق السعرات ومستوى سعرات الثبات اليومي.'
    ],
    formula: 'مجموع الطاقة (TDEE) = الأيض الأساسي (BMR) + النشاط اليومي (NEAT) + الرياضة (EAT) + هضم الطعام (TEF)',
    formulaVariables: [
      { name: 'معدل الأيض الأساسي (BMR)', description: 'السعرات المستهلكة للبقاء على قيد الحياة.', unit: 'سعرة/يوم', optional: false },
      { name: 'النشاط غير الرياضي (NEAT)', description: 'الحركة اليومية والمشي والأعمال المنزلية.', unit: 'سعرة/يوم', optional: false },
      { name: 'النشاط الرياضي (EAT)', description: 'تمارين الجري والمقاومة.', unit: 'سعرة/يوم', optional: false },
      { name: 'التأثير الحراري للطعام (TEF)', description: 'طاقة هضم وامتصاص الغذاء (~10%).', unit: 'سعرة/يوم', optional: false }
    ],
    workedExample: {
      scenario: 'رجل عمره 30 سنة، طول 180 سم، وزن 80 كجم، عمل مكتبي ويتدرب 4 أيام أسبوعياً.',
      stepByStep: [
        'معدل الأيض الأساسي (BMR) = 1,780 سعرة حرارية.',
        'النشاط غير الرياضي (NEAT) = 300 سعرة.',
        'التمارين الرياضية (EAT) = 350 سعرة/يوم.',
        'التأثير الحراري للهضم (TEF) = 270 سعرة.',
        'إجمالي الحرق اليومي (TDEE) = 1,780 + 300 + 350 + 270 = 2,700 سعرة/يوم.'
      ],
      result: 'إجمالي الحرق اليومي = 2,700 سعرة/يوم (الأيض الأساسي يشكل 66%)'
    },
    interpretation: 'توضح للمتدرب كيفية توزيع حرق السعرات اليومي لتحديد خطة التنشيف أو التضخيم.',
    assumptions: 'تفترض كفاءة استقلابية طبيعية.',
    limitations: 'قد ينخفض النشاط العفوي (NEAT) تلقائياً عند اتباع حميات قاسية لفترات طويلة.',
    faqs: [
      { question: 'ما هو نشاط NEAT؟', answer: 'هو السعرات المحروقة في الحركة اليومية الطبيعية كالمشي وصعود الدرج والأعمال المنزلية بخلاف الرياضة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} desglosa el Gasto Energético Total Diario (TDEE) en Metabolismo Basal (BMR), NEAT, ejercicio (EAT) y efecto termogénico de los alimentos (TEF).`,
    howToUse: [
      'Ingrese sexo, edad, estatura y peso.',
      'Seleccione su nivel de actividad laboral cotidiana.',
      'Indique la frecuencia e intensidad del entrenamiento.',
      'Analice el desglose de calorías de mantenimiento.'
    ],
    formula: 'TDEE = BMR + NEAT + EAT + TEF (~10%)',
    formulaVariables: [
      { name: 'BMR', description: 'Gasto basal en reposo.', unit: 'kcal/día', optional: false },
      { name: 'NEAT', description: 'Actividad cotidiana no deportiva.', unit: 'kcal/día', optional: false }
    ],
    workedExample: {
      scenario: 'Varón de 30 años, 180 cm, 80 kg, trabajo de oficina y 4 entrenamientos/semana.',
      stepByStep: [
        'BMR = 1,780 kcal.',
        'NEAT = 300 kcal | EAT = 350 kcal | TEF = 270 kcal.',
        'TDEE total = 1,780 + 300 + 350 + 270 = 2,700 kcal/día.'
      ],
      result: 'TDEE = 2,700 kcal/día (BMR representa el 66%)'
    },
    interpretation: 'Permite comprender de forma transparente dónde se queman las calorías diarias.',
    assumptions: 'Composición corporal y tiroides estándar.',
    limitations: 'La adaptación metabólica reduce el NEAT en dietas hipocalóricas prolongadas.',
    faqs: [
      { question: '¿Por qué el NEAT es tan importante?', answer: 'Porque representa una porción variable crucial para perder peso mediante el movimiento diario.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} détaille la Dépense Énergétique Journalière Totale (TDEE) en Métabolisme de Base (BMR), NEAT, sport (EAT) et thermogenèse alimentaire (TEF).`,
    howToUse: [
      'Indiquez âge, sexe, taille et poids.',
      'Précisez le niveau d’activité professionnelle quotidienne.',
      'Indiquez la fréquence hebdomadaire des entraînements.',
      'Consultez le bilan calorique de maintien.'
    ],
    formula: 'TDEE = BMR + NEAT + EAT + TEF',
    formulaVariables: [
      { name: 'BMR', description: 'Métabolisme de base au repos.', unit: 'kcal/jour', optional: false },
      { name: 'NEAT', description: 'Dépense liée aux mouvements du quotidien.', unit: 'kcal/jour', optional: false }
    ],
    workedExample: {
      scenario: 'Homme de 30 ans, 180 cm, 80 kg, travail sédentaire, 4 séances de sport/semaine.',
      stepByStep: [
        'BMR = 1 780 kcal.',
        'NEAT = 300 kcal | EAT = 350 kcal | TEF = 270 kcal.',
        'TDEE total = 2 700 kcal/jour.'
      ],
      result: 'TDEE = 2 700 kcal/jour (BMR : 66 % du total)'
    },
    interpretation: 'Isole chaque poste de dépense pour adapter précisément les apports nutritionnels.',
    assumptions: 'Rendement métabolique standard.',
    limitations: 'L’adaptation métabolique peut diminuer le NEAT lors de déficits prolongés.',
    faqs: [
      { question: 'Qu’est-ce que le TEF ?', answer: 'L’énergie dépensée par l’organisme pour digérer, absorber et métaboliser les aliments (environ 10 % des calories totales).' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} schlüsselt den Gesamtenergiebedarf (TDEE) detailliert in Grundumsatz (BMR), Alltagsbewegung (NEAT), Sport (EAT) und nahrungsinduzierte Thermogenese (TEF) auf.`,
    howToUse: [
      'Geben Sie Geschlecht, Alter, Größe und Gewicht ein.',
      'Wählen Sie Ihr berufliches Aktivitätsniveau.',
      'Geben Sie die wöchentliche Trainingshäufigkeit an.',
      'Lesen Sie Ihre Erhaltungskalorien und die Verteilung ab.'
    ],
    formula: 'TDEE = BMR + NEAT + EAT + TEF (~10 %)',
    formulaVariables: [
      { name: 'Grundumsatz (BMR)', description: 'Energieverbrauch in völliger Ruhe.', unit: 'kcal/Tag', optional: false },
      { name: 'NEAT', description: 'Alltägliche Bewegung ohne gezielten Sport.', unit: 'kcal/Tag', optional: false }
    ],
    workedExample: {
      scenario: '30-jähriger Mann, 180 cm, 80 kg, Bürojob, 4 Trainingseinheiten pro Woche.',
      stepByStep: [
        'BMR = 1.780 kcal.',
        'NEAT = 300 kcal | EAT = 350 kcal | TEF = 270 kcal.',
        'Gesamtumsatz = 1.780 + 300 + 350 + 270 = 2.700 kcal/Tag.'
      ],
      result: 'Gesamtumsatz (TDEE) = 2.700 kcal/Tag (BMR: 66 %)'
    },
    interpretation: 'Ermöglicht eine präzise Kaloriensteuerung für Muskelaufbau oder Fettabbau.',
    assumptions: 'Normaler Stoffwechsel und Hormonstatus.',
    limitations: 'Bei längeren Diäten passt sich der Körper durch reduziertes NEAT an.',
    faqs: [
      { question: 'Was ist der Unterschied zwischen BMR und TDEE?', answer: 'BMR ist der reine Ruheumsatz; TDEE umfasst den gesamten Kalorienverbrauch inklusive aller Aktivitäten.' }
    ],
    relatedTools
  })
});

// 9. KETO MACROS CALCULATOR (keto-macros)
export const KETO_MACROS_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates ketogenic diet macronutrient targets (fat, protein, and net carbohydrates in grams and calories) for nutritional ketosis and fat adaptation.`,
    howToUse: [
      'Enter your daily target calories (or compute from baseline TDEE with deficit/surplus).',
      'Specify net carb ceiling (typically 20g to 30g net carbs for nutritional ketosis).',
      'Select protein ratio (typically 1.6g to 2.2g per kg of lean mass).',
      'Review remaining caloric balance allocated to healthy dietary fats (70% to 75% of total calories).'
    ],
    formula: 'Fat (g) = [Total Calories - (Protein g × 4) - (Net Carbs g × 4)] / 9',
    formulaVariables: [
      { name: 'Total Calories', description: 'Target daily energy intake.', unit: 'kcal/day', optional: false },
      { name: 'Net Carbs', description: 'Total Carbohydrates minus Dietary Fiber.', unit: 'Grams (20-30g)', optional: false },
      { name: 'Protein Target', description: 'Target protein grams.', unit: 'Grams', optional: false }
    ],
    workedExample: {
      scenario: 'A 2,000 kcal ketogenic diet plan with 25g net carbs and 125g protein.',
      stepByStep: [
        'Calories from Net Carbs = 25 g × 4 kcal/g = 100 kcal (5.0% of total).',
        'Calories from Protein = 125 g × 4 kcal/g = 500 kcal (25.0% of total).',
        'Remaining Calories for Fat = 2,000 - 100 - 500 = 1,400 kcal (70.0% of total).',
        'Fat in Grams = 1,400 kcal / 9 kcal/g = 155.6 grams of fat.'
      ],
      result: 'Fats: 155.6 g (70.0%) | Protein: 125.0 g (25.0%) | Net Carbs: 25.0 g (5.0%)'
    },
    interpretation: 'Maintains blood ketone levels (0.5 to 3.0 mmol/L beta-hydroxybutyrate) by keeping insulin low and stimulating hepatic ketone production.',
    assumptions: 'Calculates based on net carbohydrates (Total Carbs - Fiber).',
    limitations: 'Excessive protein intake in some individuals can increase gluconeogenesis; monitor personal blood ketone response.',
    faqs: [
      { question: 'What is the difference between total carbs and net carbs?', answer: 'Net carbs equal total carbohydrates minus non-digestible dietary fiber and sugar alcohols that do not spike blood glucose or insulin.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب الماكروز الدقيقة للحمية الكيتونية (الدهون، البروتين، وصافي الكربوهيدرات بالجرام والنسب المئوية) لتحقيق الكيتوزية الغذائية.`,
    howToUse: [
      'أدخل إجمالي السعرات الحرارية اليومية المستهدفة.',
      'حدد الحد الأقصى لصافي الكربوهيدرات (عادة 20 إلى 30 جم net carbs).',
      'حدد كمية البروتين المستهدفة بالجرام.',
      'اطلع على كمية الدهون الصحية المطلوبة بالجرام ونسب الماكروز الكلية.'
    ],
    formula: 'الدهون (جم) = [إجمالي السعرات - (البروتين × 4) - (الكارب الصافي × 4)] ÷ 9',
    formulaVariables: [
      { name: 'إجمالي السعرات', description: 'السعرات اليومية المستهدفة.', unit: 'سعرة', optional: false },
      { name: 'صافي الكربوهيدرات', description: 'إجمالي الكربوهيدرات مطروحاً منها الألياف.', unit: 'جرام', optional: false },
      { name: 'البروتين', description: 'البروتين اليومي بالجرام.', unit: 'جرام', optional: false }
    ],
    workedExample: {
      scenario: 'حمية كيتو باستهداف 2,000 سعرة حرارية مع 25 جم كارب صافي و 125 جم بروتين.',
      stepByStep: [
        'سعرات الكارب الصافي = 25 × 4 = 100 سعرة (5%).',
        'سعرات البروتين = 125 × 4 = 500 سعرة (25%).',
        'سعرات الدهون المتبقية = 2,000 - 600 = 1,400 سعرة (70%).',
        'جرامات الدهون = 1,400 ÷ 9 = 155.6 جرام دهون.'
      ],
      result: 'الدهون: 155.6 جم (70%) | البروتين: 125.0 جم (25%) | الكارب الصافي: 25.0 جم (5%)'
    },
    interpretation: 'تحافظ على إنتاج أجسام الكيتون كمصدر طاقة رئيسي للدماغ والعضلات.',
    assumptions: 'تعتمد على حساب الكربوهيدرات الصافية.',
    limitations: 'تتطلب مراقبة استجابة الأجسام الكيتونية بالدم وتناول كميات كافية من الأملاح.',
    faqs: [
      { question: 'ما هو صافي الكربوهيدرات (Net Carbs)؟', answer: 'هو إجمالي الكربوهيدرات مطروحاً منها الألياف الغذائية غير القابلة للهضم والتي لا ترفع سكر الدم.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula los macronutrientes para la dieta cetogénica (grasas, proteínas y carbohidratos netos en gramos) para inducir cetosis nutricional.`,
    howToUse: [
      'Ingrese las calorías diarias objetivo.',
      'Defina el límite de carbohidratos netos (20-30 g).',
      'Indique los gramos de proteína.',
      'Consulte los gramos de grasas saludables requeridos.'
    ],
    formula: 'Grasas (g) = [Calorías - (Proteína × 4) - (Carbs Netos × 4)] / 9',
    formulaVariables: [
      { name: 'Calorías Totales', description: 'Ingesta energética diaria.', unit: 'kcal', optional: false },
      { name: 'Carbohidratos Netos', description: 'Carbohidratos totales menos fibra.', unit: 'Gramos', optional: false }
    ],
    workedExample: {
      scenario: 'Plan de 2,000 kcal con 25 g de carbohidratos netos y 125 g de proteína.',
      stepByStep: [
        'Calorías de carbohidratos = 100 kcal (5%).',
        'Calorías de proteína = 500 kcal (25%).',
        'Calorías de grasa = 1,400 kcal (70%).',
        'Gramos de grasa = 1,400 / 9 = 155.6 g.'
      ],
      result: 'Grasas: 155.6 g (70%) | Proteínas: 125.0 g (25%) | Carbs Netos: 25.0 g (5%)'
    },
    interpretation: 'Facilita la transición metabólica hacia la utilización de cuerpos cetónicos.',
    assumptions: 'Cómputo en base a carbohidratos absorbibles (netos).',
    limitations: 'Requiere adecuada suplementación de electrolitos.',
    faqs: [
      { question: '¿Por qué las grasas representan el 70-75%?', answer: 'Porque al restringir los carbohidratos, las grasas se convierten en la fuente primaria de combustible celular.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule la répartition des macronutriments du régime cétogène (lipides, protéines et glucides nets) pour atteindre la cétose nutritionnelle.`,
    howToUse: [
      'Saisissez votre apport calorique journalier cible.',
      'Fixez la limite de glucides nets (20 à 30 g).',
      'Indiquez votre quota de protéines.',
      'Consultez la quantité de lipides nécessaire en grammes.'
    ],
    formula: 'Lipides (g) = [Calories - (Protéines × 4) - (Glucides Nets × 4)] / 9',
    formulaVariables: [
      { name: 'Calories Totales', description: 'Apport énergétique visé.', unit: 'kcal', optional: false },
      { name: 'Glucides Nets', description: 'Glucides totaux moins les fibres.', unit: 'Grammes', optional: false }
    ],
    workedExample: {
      scenario: 'Régime cétogène à 2 000 kcal avec 25 g de glucides nets et 125 g de protéines.',
      stepByStep: [
        'Glucides = 100 kcal (5 %).',
        'Protéines = 500 kcal (25 %).',
        'Lipides = 1 400 kcal / 9 = 155,6 g (70 %).'
      ],
      result: 'Lipides : 155,6 g (70 %) | Protéines : 125,0 g (25 %) | Glucides Nets : 25,0 g (5 %)'
    },
    interpretation: 'Favorise la production hépatique de corps cétoniques pour alimenter le cerveau et les muscles.',
    assumptions: 'Calcul sur les glucides nets assimilables.',
    limitations: 'Une bonne hydratation en sodium, potassium et magnésium est essentielle.',
    faqs: [
      { question: 'Que sont les glucides nets ?', answer: 'Les glucides totaux dont on soustrait les fibres alimentaires non assimilées par l’organisme.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} ermittelt die Nährstoffverteilung der ketogenen Ernährung (Fette, Eiweiß und Netto-Kohlenhydrate in Gramm) für die ernährungsbedingte Ketose.`,
    howToUse: [
      'Geben Sie Ihre tägliche Zielkalorienmenge ein.',
      'Legen Sie das Netto-Kohlenhydratlimit fest (meist 20-30 g).',
      'Bestimmen Sie die tägliche Eiweißmenge.',
      'Lesen Sie den benötigten Fettanteil in Gramm ab.'
    ],
    formula: 'Fett (g) = [Gesamtkalorien - (Protein × 4) - (Netto-KH × 4)] / 9',
    formulaVariables: [
      { name: 'Gesamtkalorien', description: 'Tägliche Zielzufuhr.', unit: 'kcal', optional: false },
      { name: 'Netto-Kohlenhydrate', description: 'Gesamtkohlenhydrate minus Ballaststoffe.', unit: 'Gramm', optional: false }
    ],
    workedExample: {
      scenario: '2.000 kcal Keto-Plan mit 25 g Netto-KH und 125 g Protein.',
      stepByStep: [
        'Kohlenhydrate = 100 kcal (5 %).',
        'Protein = 500 kcal (25 %).',
        'Fettbedarf = 1.400 kcal / 9 = 155,6 g (70 %).'
      ],
      result: 'Fett: 155,6 g (70 %) | Eiweiß: 125,0 g (25 %) | Netto-KH: 25,0 g (5 %)'
    },
    interpretation: 'Hält den Blutzucker- und Insulinspiegel niedrig, um Ketonkörper als Hauptenergiequelle zu nutzen.',
    assumptions: 'Berechnung auf Basis der anrechenbaren Netto-Kohlenhydrate.',
    limitations: 'Ausreichende Elektrolytzufuhr ist für das Wohlbefinden unverzichtbar.',
    faqs: [
      { question: 'Was sind Netto-Kohlenhydrate?', answer: 'Gesamtkohlenhydrate abzüglich unverdaulicher Ballaststoffe.' }
    ],
    relatedTools
  })
});

// 10. INTERMITTENT FASTING WINDOW (intermittent-fasting)
export const INTERMITTENT_FASTING_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} plans daily intermittent fasting schedules (16:8, 18:6, 20:4 Warrior, or OMAD 23:1), displaying exact meal eating windows, fasting start/stop clocks, and hydration reminders.`,
    howToUse: [
      'Select your preferred fasting protocol (e.g., 16:8 Leangains, 18:6, 20:4, or 23:1 OMAD).',
      'Enter your preferred first meal time (e.g., 12:00 PM).',
      'Review your exact eating window closing time (e.g., 8:00 PM) and fasting duration clock.'
    ],
    formula: 'Eating Window End = First Meal Time + Eating Window Hours',
    formulaVariables: [
      { name: 'First Meal Time', description: 'Clock time when daily feeding window opens.', unit: 'Time', optional: false },
      { name: 'Protocol Hours', description: 'Ratio of Fasting to Eating hours (e.g., 16:8 = 8h eating).', unit: 'Hours', optional: false }
    ],
    workedExample: {
      scenario: '16:8 protocol starting first meal at 12:00 PM (noon).',
      stepByStep: [
        'Eating Window Duration = 8 hours.',
        'Eating Window End Time = 12:00 PM + 8 hours = 8:00 PM (20:00).',
        'Fasting Window = 8:00 PM to 12:00 PM the following day (16 continuous hours).'
      ],
      result: 'Eating Window = 12:00 PM to 8:00 PM (8 hours) | Fasting Window = 8:00 PM to 12:00 PM (16 hours)'
    },
    interpretation: 'Restricts daily feeding time to improve insulin sensitivity, lipid oxidation, and spontaneous caloric restriction.',
    assumptions: 'Zero caloric beverages or snacks consumed during the 16-hour fasting window.',
    limitations: 'Does not replace balanced micronutrient and macronutrient meal quality during the eating window.',
    faqs: [
      { question: 'What can I drink during the fasting window?', answer: 'Water, black coffee, and unsweetened plain tea without milk, sugar, or caloric creamers.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتنظيم وتخطيط جدول الصيام المتقطع (بروتوكولات 16:8، 18:6، 20:4، ووجبة واحدة باليوم OMAD)، وتحديد ساعات نافذة الأكل وفترة الصيام بدقة.`,
    howToUse: [
      'اختر بروتوكول الصيام المفضل (مثلاً 16:8، 18:6، 20:4، أو OMAD 23:1).',
      'أدخل موعد تناول أول وجبة (مثلاً 12:00 ظهراً).',
      'اطلع على موعد إغلاق نافذة الأكل وموعد بدء الصيام وساعاته المتبقية.'
    ],
    formula: 'نهاية نافذة الأكل = موعد الوجبة الأولى + ساعات نافذة الطعام',
    formulaVariables: [
      { name: 'موعد الوجبة الأولى', description: 'وقت فتح نافذة الطعام.', unit: 'ساعة:دقيقة', optional: false },
      { name: 'ساعات الأكل', description: 'المدة المتاحة للأكل (8 ساعات في نظام 16:8).', unit: 'ساعات', optional: false }
    ],
    workedExample: {
      scenario: 'نظام 16:8 مع تناول الوجبة الأولى الساعة 12:00 ظهراً.',
      stepByStep: [
        'مدة نافذة الطعام = 8 ساعات.',
        'موعد الوجبة الأخيرة = 12:00 ظهراً + 8 ساعات = 8:00 مساءً (20:00).',
        'فترة الصيام = من 8:00 مساءً حتى 12:00 ظهراً في اليوم التالي (16 ساعة).'
      ],
      result: 'نافذة الأكل = 12:00 ظهراً إلى 8:00 مساءً (8 ساعات) | فترة الصيام = 16 ساعة متواصلة'
    },
    interpretation: 'تنظم مواعيد تناول الطعام لتحسين حساسية الأنسولين وحرق الدهون وضبط الشهية.',
    assumptions: 'الامتناع عن أي سعرات حرارية خلال ساعات الصيام.',
    limitations: 'يجب الاهتمام بجودة وتنوع الوجبات داخل نافذة الأكل.',
    faqs: [
      { question: 'ما المشروبات المسموحة أثناء الصيام؟', answer: 'الماء، القهوة السادة بدون سكر أو حليب، والشاي غير المحلى.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} organiza los horarios del ayuno intermitente (16:8, 18:6, 20:4 o 23:1 OMAD), calculando la ventana de alimentación y horas de ayuno.`,
    howToUse: [
      'Seleccione el protocolo de ayuno (16:8, 18:6, 20:4, etc.).',
      'Ingrese la hora de la primera comida.',
      'Consulte la hora exacta de cierre de la ventana de ingesta.'
    ],
    formula: 'Fin de Ventana = Hora Primera Comida + Horas de Ingesta',
    formulaVariables: [
      { name: 'Primera Comida', description: 'Hora de apertura.', unit: 'Hora', optional: false }
    ],
    workedExample: {
      scenario: 'Protocolo 16:8 con primera comida a las 12:00.',
      stepByStep: [
        'Ventana de comida = 8 horas.',
        'Fin de ventana = 12:00 + 8h = 20:00.',
        'Ayuno = 20:00 a 12:00 del día siguiente (16h).'
      ],
      result: 'Ventana de Comida = 12:00 a 20:00 (8h) | Ventana de Ayuno = 16 horas'
    },
    interpretation: 'Mejora la sensibilidad a la insulina y simplifica la restricción calórica diaria.',
    assumptions: 'Sin calorías en horas de ayuno.',
    limitations: 'No compensa una dieta desequilibrada en la ventana de ingesta.',
    faqs: [
      { question: '¿Rompe el café solo el ayuno?', answer: 'No, el café solo o infusiones sin azúcar ni leche son compatibles con el ayuno.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} planifie les créneaux du jeûne intermittent (16:8, 18:6, 20:4 ou OMAD), en fixant les heures de repas et la période de jeûne.`,
    howToUse: [
      'Sélectionnez votre protocole (ex. 16:8 ou 18:6).',
      'Indiquez l’heure de votre premier repas.',
      'Consultez l’heure de clôture de votre fenêtre alimentaire.'
    ],
    formula: 'Fin de Fenêtre = Heure Premier Repas + Heures d’Alimentation',
    formulaVariables: [
      { name: 'Premier Repas', description: 'Heure de rupture du jeûne.', unit: 'Heure', optional: false }
    ],
    workedExample: {
      scenario: 'Protocole 16:8 avec premier repas à 12h00.',
      stepByStep: [
        'Fenêtre de repas = 8 heures.',
        'Dernier repas = 12h00 + 8 h = 20h00.',
        'Période de jeûne = 20h00 à 12h00 le lendemain (16 heures).'
      ],
      result: 'Fenêtre de Repas = 12h00 à 20h00 (8 h) | Période de Jeûne = 16 heures'
    },
    interpretation: 'Optimise la régulation de l’insuline et facilite la gestion du poids.',
    assumptions: 'Zéro calorie liquide ou solide pendant le jeûne.',
    limitations: 'La qualité nutritionnelle des repas reste primordiale.',
    faqs: [
      { question: 'Que boire pendant le jeûne ?', answer: 'Eau, thé et café noir non sucrés.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} plant die Zeitfenster für intermittierendes Fasten (16:8, 18:6, 20:4 oder OMAD) und zeigt Essens- und Fastenzeiten an.`,
    howToUse: [
      'Wählen Sie Ihr Fastenprotokoll (z. B. 16:8).',
      'Geben Sie die Uhrzeit der ersten Mahlzeit ein.',
      'Lesen Sie das Ende des Essensfensters und die Fastendauer ab.'
    ],
    formula: 'Essensfenster Ende = Erste Mahlzeit + Essensstunden',
    formulaVariables: [
      { name: 'Erste Mahlzeit', description: 'Startzeit des Essensfensters.', unit: 'Uhrzeit', optional: false }
    ],
    workedExample: {
      scenario: '16:8 Fasten mit erster Mahlzeit um 12:00 Uhr mittags.',
      stepByStep: [
        'Essensfenster = 8 Stunden.',
        'Letzte Mahlzeit = 12:00 + 8 Std. = 20:00 Uhr.',
        'Fastenphase = 20:00 bis 12:00 Uhr am Folgetag (16 Stunden).'
      ],
      result: 'Essensfenster = 12:00 bis 20:00 Uhr (8 Std.) | Fastenzeit = 16 Stunden'
    },
    interpretation: 'Unterstützt die Insulinsensitivität und Fettverbrennung durch strukturierte Essenspausen.',
    assumptions: 'Keine Kalorienaufnahme während des Fastenfensters.',
    limitations: 'Ausgewogene Mahlzeiten im Essensfenster sind weiterhin erforderlich.',
    faqs: [
      { question: 'Ist schwarzer Kaffee erlaubt?', answer: 'Ja, Wasser, ungesüßter Tee und schwarzer Kaffee ohne Milch brechen das Fasten nicht.' }
    ],
    relatedTools
  })
});

export const BATCH3_HEALTH_HANDLERS: Record<string, Record<Language, KnowledgeHandler>> = {
  'water-fasting': WATER_FASTING_KNOWLEDGE,
  'protein-intake': PROTEIN_INTAKE_KNOWLEDGE,
  'creatine-dosing': CREATINE_DOSING_KNOWLEDGE,
  'caffeine-halflife': CAFFEINE_HALFLIFE_KNOWLEDGE,
  'steps-to-calories': STEPS_TO_CALORIES_KNOWLEDGE,
  'running-pace-split': RUNNING_PACE_SPLIT_KNOWLEDGE,
  'bench-press-max': BENCH_PRESS_MAX_KNOWLEDGE,
  'tdee-advanced': TDEE_ADVANCED_KNOWLEDGE,
  'keto-macros': KETO_MACROS_KNOWLEDGE,
  'macronutrient-keto-highcarb': KETO_MACROS_KNOWLEDGE,
  'keto-ketogenic-diet-macro-split': KETO_MACROS_KNOWLEDGE,
  'custom-macro-split-carb-cycling': KETO_MACROS_KNOWLEDGE,
  'intermittent-fasting': INTERMITTENT_FASTING_KNOWLEDGE,
};
