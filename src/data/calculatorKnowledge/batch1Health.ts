import { ToolDef, Language } from '../../types';
import { ToolContentDetails } from './types';

type KnowledgeHandler = (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails;

function createKnowledge(dataByLang: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails>): Record<Language, KnowledgeHandler> {
  return dataByLang;
}

// 1. IDEAL BODY WEIGHT (ideal-weight)
export const IDEAL_WEIGHT_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates estimated ideal body weight using validated clinical formulas (Devine, Robinson, Miller, and Hamwi) alongside the World Health Organization healthy BMI reference range.`,
    howToUse: [
      'Select biological sex (Male or Female).',
      'Enter your height in centimeters (cm).',
      'Review your target weight across Devine (clinical standard), Robinson, Miller, Hamwi, and the WHO healthy BMI range.'
    ],
    formula: 'Devine Male: 50.0 + 2.3 × (Inches - 60) | Devine Female: 45.5 + 2.3 × (Inches - 60) | WHO Healthy Range: 18.5 × (Height_m)² to 24.9 × (Height_m)²',
    formulaVariables: [
      { name: 'Height', description: 'Stature measured barefoot.', unit: 'Centimeters (cm)', optional: false },
      { name: 'Biological Sex', description: 'Male or Female physiological parameters for frame and body composition.', unit: 'Sex', optional: false }
    ],
    workedExample: {
      scenario: 'A male individual with a height of 175 cm (68.9 inches).',
      stepByStep: [
        'Height in inches: 175 cm / 2.54 = 68.90 inches.',
        'Inches over 5 feet (60 in): 68.90 - 60.0 = 8.90 inches.',
        'Devine formula: 50.0 + (2.3 × 8.90) = 70.47 kg (155.4 lbs).',
        'WHO healthy BMI (18.5 - 24.9) range: 56.66 kg to 76.26 kg.'
      ],
      result: 'Devine Ideal Weight: 70.47 kg (155.35 lbs) | Healthy BMI Range: 56.7 kg - 76.3 kg'
    },
    interpretation: 'The Devine formula is the benchmark standard utilized by pharmacologists for drug dosing. Your target weight should be considered alongside lean body mass and bone density.',
    assumptions: 'Assumes adult physical skeletal maturity (age 18+).',
    limitations: 'These empirical formulas do not differentiate between dense muscular tissue and adipose fat mass.',
    faqs: [
      { question: 'Why do the different formulas give slightly different results?', answer: 'Each equation was established during clinical trials on specific demographic study groups across different decades.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب الوزن المثالي التقديري بناءً على المعادلات الطبية السريرية المعتمدة (ديفاين، روبنسون، ميلر، وهاموي) إلى جانب النطاق الصحي المعتمد لمنظمة الصحة العالمية.`,
    howToUse: [
      'حدد الجنس البيولوجي (ذكر أو أنثى).',
      'أدخل طول القامة بالسنتيمتر (سم).',
      'راجع الوزن المثالي وفق معادلة ديفاين السريرية ومقارنتها بنطاق مؤشر كتلة الجسم الصحي.'
    ],
    formula: 'ديفاين للذكور: 50.0 + 2.3 × (البوصات فوق 60) | ديفاين للإناث: 45.5 + 2.3 × (البوصات فوق 60) | مؤشر الصحة العالمية: 18.5 إلى 24.9',
    formulaVariables: [
      { name: 'الطول', description: 'طول القامة بالسنتيمتر.', unit: 'سنتيمتر (سم)', optional: false },
      { name: 'الجنس', description: 'الخصائص الفسيولوجية لتركيب الجسم.', unit: 'ذكر / أنثى', optional: false }
    ],
    workedExample: {
      scenario: 'شخص ذكر يبلغ طوله 175 سم (68.9 بوصة).',
      stepByStep: [
        'تحويل الطول لبوصات: 175 ÷ 2.54 = 68.90 بوصة.',
        'الزيادة عن 5 أقدام (60 بوصة): 68.90 - 60 = 8.90 بوصة.',
        'معادلة ديفاين: 50.0 + (2.3 × 8.90) = 70.47 كجم (155.4 رطل).',
        'النطاق الصحي لمنظمة الصحة العالمية: 56.7 كجم إلى 76.3 كجم.'
      ],
      result: 'الوزن المثالي (ديفاين): 70.47 كجم | النطاق الصحي لمنظمة الصحة: 56.7 - 76.3 كجم'
    },
    interpretation: 'تعتبر معادلة ديفاين المعيار الصيدلاني المعتمد عالمياً لحساب جرعات الأدوية العلاجية ذات النطاق الضيق.',
    assumptions: 'تفترض البلوغ الجسدي واكتمال نمو الهيكل العظمي (18 سنة فما فوق).',
    limitations: 'لا تفصل المعادلات بين كثافة الكتلة العضلية والكتلة الدهنية للرياضيين.',
    faqs: [
      { question: 'لماذا تختلف نتائج المعادلات الطبية قليلاً؟', answer: 'لأن كل معادلة طُورت في دراسات سكانية مختلفة زمنياً وجغرافياً لتحديد الأوزان السريرية النموذجية.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el peso corporal ideal estimado mediante las fórmulas clínicas validadas (Devine, Robinson, Miller y Hamwi) y el rango saludable de la OMS.`,
    howToUse: [
      'Seleccione su sexo biológico (hombre o mujer).',
      'Introduzca su estatura en centímetros (cm).',
      'Revise el peso recomendado por la fórmula de Devine y el intervalo de IMC normal.'
    ],
    formula: 'Devine Hombre: 50,0 + 2,3 × (Pulgadas - 60) | Devine Mujer: 45,5 + 2,3 × (Pulgadas - 60) | Rango OMS: 18,5 a 24,9 IMC',
    formulaVariables: [
      { name: 'Estatura', description: 'Altura corporal descalzo.', unit: 'Centímetros (cm)', optional: false },
      { name: 'Sexo', description: 'Condición biológica para el ajuste de masa magra.', unit: 'Hombre / Mujer', optional: false }
    ],
    workedExample: {
      scenario: 'Hombre de 175 cm de altura (68,9 pulgadas).',
      stepByStep: [
        'Estatura en pulgadas: 175 / 2,54 = 68,90 pulgadas.',
        'Pulgadas por encima de 5 pies (60 pulgadas): 8,90 pulgadas.',
        'Fórmula de Devine: 50,0 + (2,3 × 8,90) = 70,47 kg (155,4 lbs).',
        'Rango saludable OMS (IMC 18,5 - 24,9): 56,7 kg a 76,3 kg.'
      ],
      result: 'Peso ideal Devine: 70,47 kg | Rango IMC saludable: 56,7 kg - 76,3 kg'
    },
    interpretation: 'La fórmula de Devine es el estándar de referencia clínica utilizado en farmacología para el cálculo de dosis terapéuticas.',
    assumptions: 'Aplicable a adultos con madurez ósea completa.',
    limitations: 'No distingue entre masa muscular magra y porcentaje de grasa corporal.',
    faqs: [
      { question: '¿Por qué existen varias fórmulas de peso ideal?', answer: 'Fueron desarrolladas en diferentes décadas por distintos equipos médicos con muestras poblacionales diversas.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} détermine le poids corporel idéal estimé selon les formules médicales classiques (Devine, Robinson, Miller, Hamwi) et la fourchette d'IMC sain de l'OMS.`,
    howToUse: [
      'Sélectionnez le sexe biologique (homme ou femme).',
      'Indiquez votre taille en centimètres (cm).',
      'Consultez votre poids théorique Devine et l\'intervalle de poids recommandé selon l\'OMS.'
    ],
    formula: 'Devine Homme : 50,0 + 2,3 × (Pouces - 60) | Devine Femme : 45,5 + 2,3 × (Pouces - 60) | Fourchette OMS : 18,5 à 24,9 d\'IMC',
    formulaVariables: [
      { name: 'Taille', description: 'Stature corporelle en centimètres.', unit: 'Centimètres (cm)', optional: false },
      { name: 'Sexe', description: 'Paramètre biologique de morphologie.', unit: 'Homme / Femme', optional: false }
    ],
    workedExample: {
      scenario: 'Homme mesurant 175 cm (68,9 pouces).',
      stepByStep: [
        'Conversion en pouces : 175 / 2,54 = 68,90 pouces.',
        'Excédent au-delà de 5 pieds (60 pouces) : 8,90 pouces.',
        'Formule de Devine : 50,0 + (2,3 × 8,90) = 70,47 kg (155,4 lbs).',
        'Poids normal OMS : 56,7 kg à 76,3 kg.'
      ],
      result: 'Poids idéal Devine : 70,47 kg | Plage de poids sain OMS : 56,7 kg - 76,3 kg'
    },
    interpretation: 'La formule de Devine constitue la référence internationale en pharmacocinétique hospitalière.',
    assumptions: 'Applicable aux adultes ayant achevé leur croissance squelettique.',
    limitations: 'Ne prend pas en compte le ratio masse musculaire/masse grasse des sportifs.',
    faqs: [
      { question: 'Quelle est la formule la plus utilisée en médecine ?', answer: 'La formule de Devine (1974) demeure la référence clinique standard pour les posologies médicamenteuses.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet das geschätzte Idealgewicht nach klinisch anerkannten Formeln (Devine, Robinson, Miller, Hamwi) und dem Normalgewichtsbereich der WHO.`,
    howToUse: [
      'Wählen Sie das biologische Geschlecht (männlich oder weiblich).',
      'Geben Sie Ihre Körpergröße in Zentimetern (cm) ein.',
      'Lesen Sie das Zielgewicht nach Devine sowie den gesunden BMI-Gewichtskorridor ab.'
    ],
    formula: 'Devine Männer: 50,0 + 2,3 × (Zoll - 60) | Devine Frauen: 45,5 + 2,3 × (Zoll - 60) | WHO-Bereich: BMI 18,5 bis 24,9',
    formulaVariables: [
      { name: 'Körpergröße', description: 'Körperlänge ohne Schuhe.', unit: 'Zentimeter (cm)', optional: false },
      { name: 'Geschlecht', description: 'Biologische Konstitution.', unit: 'Männlich / Weiblich', optional: false }
    ],
    workedExample: {
      scenario: 'Ein Mann mit 175 cm Körpergröße (68,9 Zoll).',
      stepByStep: [
        'Größe in Zoll: 175 / 2,54 = 68,90 Zoll.',
        'Zoll über 5 Fuß (60 Zoll): 8,90 Zoll.',
        'Devine-Formel: 50,0 + (2,3 × 8,90) = 70,47 kg (155,4 lbs).',
        'Gesunder WHO-Gewichtskorridor (BMI 18,5 - 24,9): 56,7 kg bis 76,3 kg.'
      ],
      result: 'Idealgewicht nach Devine: 70,47 kg | WHO-Normalbereich: 56,7 kg - 76,3 kg'
    },
    interpretation: 'Die Devine-Gleichung dient in der klinischen Pharmakologie weltweit als Richtwert für die Medikamentendosierung.',
    assumptions: 'Gültig für erwachsene Personen mit abgeschlossenem Knochenwachstum.',
    limitations: 'Unterscheidet nicht zwischen Muskelmasse und Körperfettanteil.',
    faqs: [
      { question: 'Warum weichen die verschiedenen Formeln voneinander ab?', answer: 'Weil jede Formel auf klinischen Studien unterschiedlicher Kohorten und Jahrzehnte beruht.' }
    ],
    relatedTools
  })
});

// 2. DAILY WATER INTAKE (water-intake)
export const WATER_INTAKE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates personalized daily fluid hydration requirements based on body mass and daily physical exercise duration.`,
    howToUse: [
      'Enter your body weight in kilograms (kg).',
      'Enter your planned daily physical exercise duration in minutes.',
      'Review your total daily water requirement in liters, fluid ounces, glasses (250 ml), and standard bottles (500 ml).'
    ],
    formula: 'Daily Water (L) = (Body Weight in kg × 0.033) + (Exercise Minutes / 30) × 0.35 | Fl Oz = Liters × 33.814',
    formulaVariables: [
      { name: 'Body Weight', description: 'Total body mass.', unit: 'Kilograms (kg)', optional: false },
      { name: 'Daily Exercise', description: 'Moderate-to-vigorous physical activity duration.', unit: 'Minutes / day', optional: false }
    ],
    workedExample: {
      scenario: 'A 70 kg individual performing 30 minutes of physical exercise daily.',
      stepByStep: [
        'Baseline hydration requirement: 70 kg × 0.033 L/kg = 2.31 Liters.',
        'Exercise hydration compensation: (30 / 30) × 0.35 L = 0.35 Liters.',
        'Total daily target: 2.31 L + 0.35 L = 2.66 Liters (89.95 fl oz).',
        'Standard 250 ml glasses: ~11 glasses; 500 ml bottles: 5.3 bottles.'
      ],
      result: 'Total Daily Fluid Requirement: 2.66 Liters (89.95 fl oz) | ~11 Glasses (250ml) | 5.3 Bottles (500ml)'
    },
    interpretation: 'Proper baseline hydration supports metabolic homeostasis, cognitive acuity, and electrolyte balance while replacing exercise sweat loss.',
    assumptions: 'Assumes temperate climate conditions and normal baseline metabolic rates.',
    limitations: 'Extreme heat, high altitude, fever, or breastfeeding require additional fluid intake beyond this baseline.',
    faqs: [
      { question: 'Does tea or coffee count toward daily hydration?', answer: 'Yes, moderate consumption of caffeinated beverages contributes to overall daily fluid intake, though plain water remains the gold standard.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب الاحتياج اليومي الدقيق من السوائل والماء بناءً على وزن الجسم وفترة النشاط الرياضي اليومي.`,
    howToUse: [
      'أدخل وزن الجسم بالكيلوجرام (كجم).',
      'أدخل مدة التمارين الرياضية اليومية بالدقائق.',
      'راجع إجمالي الماء المطلوب باللترات، والأونصة، وعدد الأكواب (250 مل) والعبوات (500 مل).'
    ],
    formula: 'الماء اليومي (لتر) = (الوزن × 0.033) + (دقائق الرياضة / 30) × 0.35 | أونصة = اللترات × 33.814',
    formulaVariables: [
      { name: 'وزن الجسم', description: 'الوزن الحالي بالكيلوجرام.', unit: 'كيلوجرام (كجم)', optional: false },
      { name: 'مدة الرياضة', description: 'وقت ممارسة النشاط البدني يومياً.', unit: 'دقيقة / يوم', optional: false }
    ],
    workedExample: {
      scenario: 'شخص وزنه 70 كجم يمارس الرياضة لمدة 30 دقيقة يومياً.',
      stepByStep: [
        'الاحتياج الأساسي: 70 × 0.033 = 2.31 لتر.',
        'تعويض السوائل للرياضة: (30 ÷ 30) × 0.35 = 0.35 لتر.',
        'إجمالي الاحتياج اليومي: 2.31 + 0.35 = 2.66 لتر (89.95 أونصة).',
        'عدد الأكواب (250 مل): 11 كوباً | عبوات المياه (500 مل): 5.3 عبوة.'
      ],
      result: 'الاحتياج اليومي: 2.66 لتر (89.95 أونصة) | 11 كوباً (250 مل) | 5.3 عبوة (500 مل)'
    },
    interpretation: 'يحافظ شرب الماء الكافي على كفاءة وظائف الكلى وتنظيم درجة حرارة الجسم وتجنب الإجهاد العضلي أثناء التمرين.',
    assumptions: 'تفترض ظروف مناخية معتدلة دون تعرق مفرط نتيجة حرارة الصيف الشديدة.',
    limitations: 'تتطلب البيئات الحارة جداً أو الرضاعة الطبيعية زيادة كميات السوائل الموصى بها.',
    faqs: [
      { question: 'هل تحتسب المشروبات الساخنة ضمن السوائل اليومية؟', answer: 'نعم، تسهم المشروبات مثل الشاي والقهوة باعتدال في إجمالي السوائل، إلا أن الماء النقي يظل الخيار الأمثل صحياً.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la cantidad óptima de agua diaria requerida en función del peso corporal y los minutos de ejercicio físico.`,
    howToUse: [
      'Introduzca su peso corporal en kilogramos (kg).',
      'Introduzca los minutos de ejercicio físico al día.',
      'Revise la ingesta hídrica recomendada en litros, onzas líquidas, vasos (250 ml) y botellas (500 ml).'
    ],
    formula: 'Agua (L) = (Peso en kg × 0,033) + (Minutos ejercicio / 30) × 0,35 | Fl Oz = Litros × 33,814',
    formulaVariables: [
      { name: 'Peso corporal', description: 'Masa corporal total.', unit: 'Kilogramos (kg)', optional: false },
      { name: 'Ejercicio diario', description: 'Duración del entrenamiento físico.', unit: 'Minutos / día', optional: false }
    ],
    workedExample: {
      scenario: 'Persona de 70 kg que realiza 30 minutos de ejercicio al día.',
      stepByStep: [
        'Hidratación base: 70 kg × 0,033 L/kg = 2,31 litros.',
        'Compensación por ejercicio: (30 / 30) × 0,35 L = 0,35 litros.',
        'Consumo total diario: 2,31 L + 0,35 L = 2,66 litros (89,95 fl oz).',
        'Equivalente en vasos de 250 ml: aprox. 11 vasos; botellas de 500 ml: 5,3 botellas.'
      ],
      result: 'Consumo hídrico diario: 2,66 Litros (89,95 fl oz) | ~11 Vasos (250 ml) | 5,3 Botellas (500 ml)'
    },
    interpretation: 'Asegura una reposición adecuada de electrolitos y agua para optimizar el rendimiento cognitivo y físico.',
    assumptions: 'Condiciones climáticas templadas y esfuerzo físico moderado.',
    limitations: 'Climas calurosos o estados febriles precisan aportes complementarios de líquidos.',
    faqs: [
      { question: '¿Cómo saber si estoy bien hidratado?', answer: 'El color de la orina es el mejor indicador visual: debe ser de un tono amarillo claro transparente.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} évalue la quantité d'eau quotidienne nécessaire pour maintenir une hydratation optimale selon le poids et l'activité sportive.`,
    howToUse: [
      'Indiquez votre poids corporel en kilogrammes (kg).',
      'Indiquez la durée moyenne de vos entraînements en minutes.',
      'Visualisez votre besoin hydrique en litres, verres (250 ml) et bouteilles (500 ml).'
    ],
    formula: 'Eau (L) = (Poids en kg × 0,033) + (Minutes sport / 30) × 0,35 | Fl Oz = Litres × 33,814',
    formulaVariables: [
      { name: 'Poids corporel', description: 'Masse corporelle en kilogrammes.', unit: 'Kilogrammes (kg)', optional: false },
      { name: 'Activité physique', description: 'Durée quotidienne d\'exercice.', unit: 'Minutes / jour', optional: false }
    ],
    workedExample: {
      scenario: 'Personne de 70 kg pratiquant 30 minutes de sport par jour.',
      stepByStep: [
        'Besoin de base : 70 kg × 0,033 L/kg = 2,31 litres.',
        'Majoration liée au sport : (30 / 30) × 0,35 L = 0,35 litre.',
        'Besoin total journalier : 2,31 L + 0,35 L = 2,66 litres (89,95 fl oz).',
        'Équivalence : environ 11 verres de 250 ml ou 5,3 bouteilles de 500 ml.'
      ],
      result: 'Volume d\'eau recommandé : 2,66 Litres (89,95 fl oz) | ~11 Verres (250 ml) | 5,3 Bouteilles (500 ml)'
    },
    interpretation: 'Une bonne hydratation soutient l\'élimination rénale, la régulation thermique et prévient les crampes musculaires.',
    assumptions: 'Conditions climatiques tempérées normales.',
    limitations: 'Les fortes chaleurs ou l\'altitude requièrent une consommation supérieure.',
    faqs: [
      { question: 'Les aliments hydratent-ils ?', answer: 'Oui, les fruits et légumes apportent environ 20 % de l\'hydratation quotidienne globale.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} ermittelt den täglichen Flüssigkeitsbedarf auf Basis des Körpergewichts und der täglichen Trainingsdauer.`,
    howToUse: [
      'Geben Sie Ihr Körpergewicht in Kilogramm (kg) ein.',
      'Geben Sie Ihre tägliche Trainingszeit in Minuten ein.',
      'Prüfen Sie den Gesamtbedarf in Litern, Gläsern (250 ml) und Halbliterflaschen (500 ml).'
    ],
    formula: 'Wasser (L) = (Körpergewicht in kg × 0,033) + (Sportminuten / 30) × 0,35 | Fl Oz = Liter × 33,814',
    formulaVariables: [
      { name: 'Körpergewicht', description: 'Aktuelles Gewicht in Kilogramm.', unit: 'Kilogramm (kg)', optional: false },
      { name: 'Sportdauer', description: 'Tägliche sportliche Aktivität in Minuten.', unit: 'Minuten / Tag', optional: false }
    ],
    workedExample: {
      scenario: 'Eine 70 kg schwere Person mit 30 Minuten täglicher sportlicher Betätigung.',
      stepByStep: [
        'Basisbedarf: 70 kg × 0,033 L/kg = 2,31 Liter.',
        'Mehraufwand durch Sport: (30 / 30) × 0,35 L = 0,35 Liter.',
        'Gesamtbedarf: 2,31 L + 0,35 L = 2,66 Liter (89,95 fl oz).',
        'Entspricht ca. 11 Gläsern à 250 ml oder 5,3 Flaschen à 500 ml.'
      ],
      result: 'Empfohlene Tagesmenge: 2,66 Liter (89,95 fl oz) | ~11 Gläser (250 ml) | 5,3 Flaschen (500 ml)'
    },
    interpretation: 'Ausreichende Flüssigkeitszufuhr sichert die Konzentrationsfähigkeit, den Stoffwechsel und gleicht Schweißverluste aus.',
    assumptions: 'Gemäßigte klimatische Bedingungen ohne extreme Hitze.',
    limitations: 'Bei Fieber, extremer Sommerhitze oder intensivem Leistungssport ist der Flüssigkeitsbedarf höher.',
    faqs: [
      { question: 'Wie erkenne ich eine Dehydration?', answer: 'Dunkler Urin, Kopfschmerzen und verminderte Leistungsfähigkeit sind typische Frühwarnzeichen.' }
    ],
    relatedTools
  })
});

// 3. TARGET HEART RATE ZONES (target-heart-rate)
export const TARGET_HEART_RATE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates your estimated maximum heart rate (HRmax) and defines the five scientific cardiovascular training zones (Zone 1 through Zone 5) based on age.`,
    howToUse: [
      'Enter your current age in years.',
      'Review your estimated maximum heart rate (220 - Age).',
      'Examine the beats-per-minute (BPM) boundaries for all five aerobic and anaerobic training zones.'
    ],
    formula: 'HRmax = 220 - Age | Zone 1: 50-60% | Zone 2: 60-70% | Zone 3: 70-80% | Zone 4: 80-90% | Zone 5: 90-100%',
    formulaVariables: [
      { name: 'Age', description: 'Chronological age in completed years.', unit: 'Years', optional: false }
    ],
    workedExample: {
      scenario: 'A 25-year-old athlete establishing heart rate training zones.',
      stepByStep: [
        'Maximum Heart Rate: 220 - 25 = 195 bpm.',
        'Zone 1 (Warm Up / Recovery, 50-60%): 98 - 117 bpm.',
        'Zone 2 (Fat Burn & Base, 60-70%): 117 - 137 bpm.',
        'Zone 3 (Aerobic Cardio, 70-80%): 137 - 156 bpm.',
        'Zone 4 (Anaerobic Threshold, 80-90%): 156 - 176 bpm.',
        'Zone 5 (VO2 Max / Maximum, 90-100%): 176 - 195 bpm.'
      ],
      result: 'Estimated HRmax: 195 BPM | Zone 2 Base: 117 - 137 BPM | Zone 5 VO2 Max: 176 - 195 BPM'
    },
    interpretation: 'Zone 2 builds mitochondrial density and aerobic endurance, while Zone 4 and 5 condition the lactate threshold and anaerobic capacity.',
    assumptions: 'Uses the standard Fox and Haskell baseline formula (220 - Age).',
    limitations: 'Individual maximum heart rate can vary by ±10-15 bpm based on genetic disposition and cardiac conditioning.',
    faqs: [
      { question: 'Why is Zone 2 training so popular in endurance sports?', answer: 'Zone 2 maximizes fat oxidation and builds capillary and mitochondrial density with minimal central nervous system fatigue.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب أقصى معدل لضربات القلب (HRmax) وتحديد نطاقات التدريب القلبي الوعائي الخمسة (من المنطقة 1 إلى 5) بدقة بناءً على العمر.`,
    howToUse: [
      'أدخل عمرك الحالي بالسنوات.',
      'راجع أقصى نبض للقلب متوقع (220 - العمر).',
      'اطلع على نطاق نبضات القلب بالدقيقة (BPM) لكل منطقة من مناطق اللياقة الخمس.'
    ],
    formula: 'أقصى نبض = 220 - العمر | المنطقة 1: 50-60% | المنطقة 2: 60-70% | المنطقة 3: 70-80% | المنطقة 4: 80-90% | المنطقة 5: 90-100%',
    formulaVariables: [
      { name: 'العمر', description: 'العمر الزمني بالسنوات.', unit: 'سنة', optional: false }
    ],
    workedExample: {
      scenario: 'شاب بعمر 25 سنة يحدد نطاقات ضربات القلب الرياضية.',
      stepByStep: [
        'أقصى معدل لنبض القلب: 220 - 25 = 195 نبضة/دقيقة.',
        'المنطقة 1 (التعافي والإحماء 50-60%): 98 - 117 نبضة/دقيقة.',
        'المنطقة 2 (حرق الدهون والبناء الهوائي 60-70%): 117 - 137 نبضة/دقيقة.',
        'المنطقة 3 (التحمل الهوائي والقلبي 70-80%): 137 - 156 نبضة/دقيقة.',
        'المنطقة 4 (العتبة اللاهوائية 80-90%): 156 - 176 نبضة/دقيقة.',
        'المنطقة 5 (الحد الأقصى VO2 Max 90-100%): 176 - 195 نبضة/دقيقة.'
      ],
      result: 'أقصى نبض: 195 نبضة/د | المنطقة 2: 117 - 137 نبضة/د | المنطقة 5: 176 - 195 نبضة/د'
    },
    interpretation: 'تعتبر المنطقة 2 مثالية لتعزيز حرق الدهون وبناء اللياقة الهوائية الأساسية دون إرهاق الجهاز العصبي.',
    assumptions: 'تعتمد معادلة فوكس وهاسكل القياسية الشائعة (220 - العمر).',
    limitations: 'قد يختلف أقصى نبض فعلي بمقدار ±10 إلى 15 نبضة حسب الوراثة ومستوى اللياقة الرياضية.',
    faqs: [
      { question: 'ما أهمية التدريب في المنطقة 2؟', answer: 'تزيد المنطقة 2 من كفاءة الميتوكوندريا في حرق الدهون كمصدر طاقة رئيسي للجسم خلال الأنشطة اليومية والرياضية.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la frecuencia cardíaca máxima estimada (FCmáx) y delimita las cinco zonas de entrenamiento cardiovascular según la edad.`,
    howToUse: [
      'Introduzca su edad actual en años.',
      'Revise su frecuencia cardíaca máxima estimada (220 - edad).',
      'Consulte los rangos de pulsaciones por minuto (PPM) para las cinco zonas de entrenamiento.'
    ],
    formula: 'FCmáx = 220 - Edad | Zona 1: 50-60% | Zona 2: 60-70% | Zona 3: 70-80% | Zona 4: 80-90% | Zona 5: 90-100%',
    formulaVariables: [
      { name: 'Edad', description: 'Años cumplidos del usuario.', unit: 'Años', optional: false }
    ],
    workedExample: {
      scenario: 'Deportista de 25 años que programa sus sesiones de entrenamiento.',
      stepByStep: [
        'FC máxima: 220 - 25 = 195 ppm.',
        'Zona 1 (Recuperación activa, 50-60%): 98 - 117 ppm.',
        'Zona 2 (Quema de grasa y base aeróbica, 60-70%): 117 - 137 ppm.',
        'Zona 3 (Capacidad aeróbica, 70-80%): 137 - 156 ppm.',
        'Zona 4 (Umbral anaeróbico, 80-90%): 156 - 176 ppm.',
        'Zona 5 (Potencia máxima / VO2 máx, 90-100%): 176 - 195 ppm.'
      ],
      result: 'FCmáx estimada: 195 PPM | Zona 2: 117 - 137 PPM | Zona 5: 176 - 195 PPM'
    },
    interpretation: 'La Zona 2 optimiza la base aeróbica y la oxidación lipídica, mientras que las Zonas 4 y 5 entrenan la tolerancia al lactato.',
    assumptions: 'Fórmula clásica de Fox y Haskell (220 - edad).',
    limitations: 'La frecuencia cardíaca máxima real puede diferir en deportistas de élite.',
    faqs: [
      { question: '¿Para qué sirve entrenar en Zona 2?', answer: 'Permite acumular gran volumen de entrenamiento mejorando la eficiencia mitocondrial sin generar excesiva fatiga.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} détermine la fréquence cardiaque maximale théorique (FCmax) et segmente les 5 zones d'intensité d'entraînement cardio-vasculaire selon l'âge.`,
    howToUse: [
      'Indiquez votre âge en années.',
      'Consultez votre fréquence cardiaque maximale estimée (220 - âge).',
      'Examinez les plages de battements par minute (BPM) pour chaque zone d\'effort.'
    ],
    formula: 'FCmax = 220 - Âge | Zone 1 : 50-60% | Zone 2 : 60-70% | Zone 3 : 70-80% | Zone 4 : 80-90% | Zone 5 : 90-100%',
    formulaVariables: [
      { name: 'Âge', description: 'Âge en années révolues.', unit: 'Années', optional: false }
    ],
    workedExample: {
      scenario: 'Sportif de 25 ans planifiant ses séances d\'endurance.',
      stepByStep: [
        'Fréquence cardiaque maximale : 220 - 25 = 195 bpm.',
        'Zone 1 (Récupération, 50-60%) : 98 - 117 bpm.',
        'Zone 2 (Endurance fondamentale, 60-70%) : 117 - 137 bpm.',
        'Zone 3 (Endurance active, 70-80%) : 137 - 156 bpm.',
        'Zone 4 (Seuil anaérobie, 80-90%) : 156 - 176 bpm.',
        'Zone 5 (VMA / VO2max, 90-100%) : 176 - 195 bpm.'
      ],
      result: 'FCmax : 195 BPM | Zone 2 fondamentale : 117 - 137 BPM | Zone 5 maximale : 176 - 195 BPM'
    },
    interpretation: 'La zone 2 développe l\'endurance aérobie de base, tandis que les zones supérieures améliorent la puissance maximale aérobie.',
    assumptions: 'Formule empirique standard de Fox et Haskell.',
    limitations: 'Une variabilité individuelle de ±10 à 15 bpm existe par rapport au test d\'effort sur tapis.',
    faqs: [
      { question: 'Pourquoi privilégier l\'endurance fondamentale (Zone 2) ?', answer: 'Elle habitue les fibres musculaires à utiliser les lipides comme carburant principal tout en limitant la fatigue nerveuse.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die geschätzte maximale Herzfrequenz (HFmax) und die fünf sportwissenschaftlichen Herzfrequenz-Trainingszonen nach Alter.`,
    howToUse: [
      'Geben Sie Ihr Alter in Jahren ein.',
      'Lesen Sie Ihre maximale Herzfrequenz ab (220 - Alter).',
      'Prüfen Sie die Zielzonen in Schlägen pro Minute (BPM) für Ihr Ausdauertraining.'
    ],
    formula: 'HFmax = 220 - Alter | Zone 1: 50-60% | Zone 2: 60-70% | Zone 3: 70-80% | Zone 4: 80-90% | Zone 5: 90-100%',
    formulaVariables: [
      { name: 'Alter', description: 'Lebensalter in Jahren.', unit: 'Jahre', optional: false }
    ],
    workedExample: {
      scenario: 'Ein 25-jähriger Athlet bestimmt seine Herzfrequenz-Trainingsbereiche.',
      stepByStep: [
        'Maximale Herzfrequenz: 220 - 25 = 195 bpm.',
        'Zone 1 (Aktive Erholung, 50-60%): 98 - 117 bpm.',
        'Zone 2 (Grundlagenausdauer 1, 60-70%): 117 - 137 bpm.',
        'Zone 3 (Aerobe Ausdauer, 70-80%): 137 - 156 bpm.',
        'Zone 4 (Anaerobe Schwelle, 80-90%): 156 - 176 bpm.',
        'Zone 5 (Spitzenbereich / VO2max, 90-100%): 176 - 195 bpm.'
      ],
      result: 'HFmax: 195 BPM | Zone 2 GA1: 117 - 137 BPM | Zone 5 Maximal: 176 - 195 BPM'
    },
    interpretation: 'Grundlagenausdauer im Zone-2-Bereich fördert die mitochondriale Dichte und Fettverbrennung.',
    assumptions: 'Klassische Faustformel nach Fox & Haskell (220 - Alter).',
    limitations: 'Individuelle Maximalwerte können je nach Trainingszustand um bis zu 15 Schläge abweichen.',
    faqs: [
      { question: 'Was bedeutet GA1-Training?', answer: 'Grundlagenausdauer 1 (Zone 2) schult den Fettstoffwechsel und bildet das Fundament für jedes Ausdauertraining.' }
    ],
    relatedTools
  })
});

// 4. BASAL METABOLIC RATE (bmr)
export const BMR_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates your Basal Metabolic Rate (BMR) using the clinically validated Mifflin-St Jeor equation and computes Total Daily Energy Expenditure (TDEE) across five activity tiers.`,
    howToUse: [
      'Select your biological sex (Male or Female).',
      'Enter your current weight in kilograms (kg).',
      'Enter your height in centimeters (cm).',
      'Enter your age in years.',
      'Review your baseline resting BMR calories and the corresponding TDEE calories for your activity level.'
    ],
    formula: 'Male BMR = 10W + 6.25H - 5A + 5 | Female BMR = 10W + 6.25H - 5A - 161 | Sedentary: BMR × 1.2, Moderate: BMR × 1.55, Heavy: BMR × 1.725',
    formulaVariables: [
      { name: 'Weight (W)', description: 'Body weight in kilograms.', unit: 'Kilograms (kg)', optional: false },
      { name: 'Height (H)', description: 'Body height in centimeters.', unit: 'Centimeters (cm)', optional: false },
      { name: 'Age (A)', description: 'Age in completed years.', unit: 'Years', optional: false }
    ],
    workedExample: {
      scenario: 'A 30-year-old male weighing 75 kg with a height of 178 cm.',
      stepByStep: [
        'Weight component: 10 × 75 kg = 750 kcal.',
        'Height component: 6.25 × 178 cm = 1,112.5 kcal.',
        'Age component: 5 × 30 years = 150 kcal.',
        'Apply Male constant (+5): 750 + 1,112.5 - 150 + 5 = 1,718 kcal/day.',
        'Sedentary TDEE (1.2×): 1,718 × 1.2 = 2,062 kcal; Moderate Exercise (1.55×): 1,718 × 1.55 = 2,663 kcal.'
      ],
      result: 'Basal Metabolic Rate: 1,718 kcal/day | Sedentary TDEE: 2,062 kcal | Moderate TDEE: 2,663 kcal'
    },
    interpretation: 'BMR represents the absolute minimum energy required to keep vital organs functioning at complete physical rest.',
    assumptions: 'The Mifflin-St Jeor equation assumes typical body composition and normal thyroid hormone balance.',
    limitations: 'Individuals with unusually high muscle mass (bodybuilders) will have a higher actual BMR than predicted.',
    faqs: [
      { question: 'What is the difference between BMR and TDEE?', answer: 'BMR is resting calorie burn at zero activity; TDEE includes daily movement, work, and exercise calories.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب معدل الأيض الأساسي (BMR) باستخدام معادلة ميفلين-سانت جور المعتمدة طبياً، وحساب إجمالي حرق السعرات اليومي (TDEE) لمختلف مستويات النشاط.`,
    howToUse: [
      'اختر الجنس البيولوجي (ذكر أو أنثى).',
      'أدخل وزن الجسم بالكيلوجرام (كجم).',
      'أدخل طول القامة بالسنتيمتر (سم).',
      'أدخل العمر بالسنوات.',
      'راجع السعرات الأساسية لـ BMR واحتياج السعرات اليومي وفق مستوى نشاطك الحركي.'
    ],
    formula: 'للذكور: (10×الوزن) + (6.25×الطول) - (5×العمر) + 5 | للإناث: (10×الوزن) + (6.25×الطول) - (5×العمر) - 161',
    formulaVariables: [
      { name: 'الوزن', description: 'وزن الجسم بالكيلوجرام.', unit: 'كيلوجرام (كجم)', optional: false },
      { name: 'الطول', description: 'طول القامة بالسنتيمتر.', unit: 'سنتيمتر (سم)', optional: false },
      { name: 'العمر', description: 'العمر بالسنوات.', unit: 'سنة', optional: false }
    ],
    workedExample: {
      scenario: 'شاب بعمر 30 سنة، وزنه 75 كجم وطوله 178 سم.',
      stepByStep: [
        'معامل الوزن: 10 × 75 = 750 سعرة.',
        'معامل الطول: 6.25 × 178 = 1,112.5 سعرة.',
        'معامل العمر: 5 × 30 = 150 سعرة.',
        'تطبيق معادلة الذكور (+5): 750 + 1,112.5 - 150 + 5 = 1,718 سعرة/يوم.',
        'الحرق مع نشاط معتدل (1.55×): 1,718 × 1.55 = 2,663 سعرة حرارية/يوم.'
      ],
      result: 'معدل الأيض الأساسي (BMR): 1,718 سعرة/يوم | استهلاك خامل: 2,062 سعرة | نشاط معتدل: 2,663 سعرة'
    },
    interpretation: 'يمثل BMR الطاقة الحيوية اللازمة لعمل القلب والرئتين والأعضاء في حالة الراحة التامة دون أي حركة.',
    assumptions: 'تفترض المعادلة نسب دهون وعضلات طبيعية ووظائف غدة درقية منتظمة.',
    limitations: 'قد يستهلك الرياضيون ذوو الكتلة العضلية الضخمة طاقة تفوق التقدير الحسابي.',
    faqs: [
      { question: 'ما الفرق بين BMR و TDEE؟', answer: 'BMR هو الحرق أثناء النوم والراحة التامة، بينما TDEE يشمل كافة الأنشطة الحركية والرياضية اليومية.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la Tasa Metabólica Basal (TMB / BMR) mediante la fórmula clínica de Mifflin-St Jeor y estima el gasto calórico total diario (TDEE).`,
    howToUse: [
      'Seleccione su sexo biológico (hombre o mujer).',
      'Introduzca su peso en kilogramos (kg).',
      'Introduzca su altura en centímetros (cm).',
      'Introduzca su edad en años.',
      'Consulte sus calorías basales en reposo y el gasto total diario con ejercicio.'
    ],
    formula: 'Hombre: 10P + 6,25A - 5E + 5 | Mujer: 10P + 6,25A - 5E - 161 | Sedentario: BMR × 1,2 | Moderado: BMR × 1,55',
    formulaVariables: [
      { name: 'Peso', description: 'Masa corporal en kilogramos.', unit: 'Kilogramos (kg)', optional: false },
      { name: 'Altura', description: 'Estatura en centímetros.', unit: 'Centímetros (cm)', optional: false },
      { name: 'Edad', description: 'Edad en años.', unit: 'Años', optional: false }
    ],
    workedExample: {
      scenario: 'Hombre de 30 años, 75 kg de peso y 178 cm de altura.',
      stepByStep: [
        'Factor peso: 10 × 75 = 750 kcal.',
        'Factor altura: 6,25 × 178 = 1.112,5 kcal.',
        'Factor edad: 5 × 30 = 150 kcal.',
        'Cálculo masculino: 750 + 1.112,5 - 150 + 5 = 1.718 kcal/día.',
        'Gasto moderado (1,55×): 1.718 × 1,55 = 2.663 kcal/día.'
      ],
      result: 'Tasa Metabólica Basal: 1.718 kcal/día | Gasto moderado (TDEE): 2.663 kcal/día'
    },
    interpretation: 'Es la energía calórica mínima necesaria para mantener las funciones celulares y vitales en reposo.',
    assumptions: 'Composición corporal y función tiroidea estándar.',
    limitations: 'Subestima el gasto en atletas con una densidad muscular muy superior a la media.',
    faqs: [
      { question: '¿Cómo usar el BMR para perder peso?', answer: 'Restar entre 300 y 500 kcal de su TDEE crea un déficit calórico saludable y sostenible.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} évalue le métabolisme de base (BMR) selon l'équation de référence de Mifflin-St Jeor et détermine la dépense énergétique journalière totale (TDEE).`,
    howToUse: [
      'Sélectionnez le sexe biologique (homme ou femme).',
      'Indiquez votre poids en kilogrammes (kg).',
      'Indiquez votre taille en centimètres (cm).',
      'Indiquez votre âge en années.',
      'Découvrez votre dépense calorique de repos et vos besoins totaux selon votre activité.'
    ],
    formula: 'Homme : 10P + 6,25T - 5A + 5 | Femme : 10P + 6,25T - 5A - 161 | Sédentaire : BMR × 1,2 | Modéré : BMR × 1,55',
    formulaVariables: [
      { name: 'Poids', description: 'Masse corporelle en kilogrammes.', unit: 'Kilogrammes (kg)', optional: false },
      { name: 'Taille', description: 'Taille en centimètres.', unit: 'Centimètres (cm)', optional: false },
      { name: 'Âge', description: 'Âge en années.', unit: 'Années', optional: false }
    ],
    workedExample: {
      scenario: 'Homme de 30 ans pesant 75 kg pour une taille de 178 cm.',
      stepByStep: [
        'Composante poids : 10 × 75 = 750 kcal.',
        'Composante taille : 6,25 × 178 = 1 112,5 kcal.',
        'Composante âge : 5 × 30 = 150 kcal.',
        'Formule homme (+5) : 750 + 1 112,5 - 150 + 5 = 1 718 kcal/jour.',
        'Dépense modérée (1,55×) : 1 718 × 1,55 = 2 663 kcal/jour.'
      ],
      result: 'Métabolisme de base : 1 718 kcal/jour | Dépense journalière modérée : 2 663 kcal/jour'
    },
    interpretation: 'Le BMR correspond aux dépenses incompressibles indispensables à la survie de l\'organisme au repos absolu.',
    assumptions: 'Équation scientifiquement validée pour les adultes ayant une masse grasse moyenne.',
    limitations: 'Ne reflète pas fidèlement le métabolisme d\'individus très musclés.',
    faqs: [
      { question: 'Pourquoi le BMR diminue-t-il avec l\'âge ?', answer: 'Le ralentissement métabolique physiologique et la perte progressive de masse musculaire entraînent une baisse des besoins de repos.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} ermittelt den Grundumsatz (BMR) anhand der klinischen Mifflin-St Jeor-Formel und berechnet den täglichen Gesamtenergiebedarf (TDEE).`,
    howToUse: [
      'Wählen Sie das biologische Geschlecht (männlich oder weiblich).',
      'Geben Sie Ihr Körpergewicht in Kilogramm (kg) ein.',
      'Geben Sie Ihre Körpergröße in Zentimetern (cm) ein.',
      'Geben Sie Ihr Alter in Jahren ein.',
      'Lesen Sie den Grundumsatz sowie den Gesamtbedarf für Ihr Aktivitätsniveau ab.'
    ],
    formula: 'Männer: 10G + 6,25H - 5A + 5 | Frauen: 10G + 6,25H - 5A - 161 | Sitzend: BMR × 1,2 | Moderat: BMR × 1,55',
    formulaVariables: [
      { name: 'Körpergewicht', description: 'Gewicht in Kilogramm.', unit: 'Kilogramm (kg)', optional: false },
      { name: 'Körpergröße', description: 'Größe in Zentimetern.', unit: 'Zentimeter (cm)', optional: false },
      { name: 'Alter', description: 'Alter in Jahren.', unit: 'Jahre', optional: false }
    ],
    workedExample: {
      scenario: 'Ein 30-jähriger Mann mit 75 kg Körpergewicht und 178 cm Körpergröße.',
      stepByStep: [
        'Gewichtsanteil: 10 × 75 = 750 kcal.',
        'Größenanteil: 6,25 × 178 = 1.112,5 kcal.',
        'Altersanteil: 5 × 30 = 150 kcal.',
        'Männer-Gleichung (+5): 750 + 1.112,5 - 150 + 5 = 1.718 kcal/Tag.',
        'Moderater Gesamtumsatz (1,55×): 1.718 × 1,55 = 2.663 kcal/Tag.'
      ],
      result: 'Grundumsatz (BMR): 1.718 kcal/Tag | Gesamtenergiebedarf (moderat): 2.663 kcal/Tag'
    },
    interpretation: 'Der Grundumsatz beziffert die Mindestenergiemenge zur Aufrechterhaltung lebenswichtiger Organfunktionen.',
    assumptions: 'Standardmäßige Körperzusammensetzung und gesunde Schilddrüsenfunktion.',
    limitations: 'Stark muskulöse Kraftsportler verbrennen mehr Energie als durch die Formel abgebildet.',
    faqs: [
      { question: 'Wie hilft mir der Grundumsatz beim Abnehmen?', answer: 'Wer sein tägliches Kalorienziel zwischen Grundumsatz und Gesamtumsatz ansetzt, nimmt gesund und ohne Heißhunger ab.' }
    ],
    relatedTools
  })
});

// 5. MACRONUTRIENT SPLIT (macro-split)
export const MACRO_SPLIT_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} divides total daily target calories into grams of protein, carbohydrates, and dietary fats based on your nutrition profile (Balanced, High-Protein, Keto, or Endurance).`,
    howToUse: [
      'Enter your daily target caloric intake in kilocalories (kcal).',
      'Select your diet distribution profile (Balanced 30P/40C/30F, High-Protein 40P/35C/25F, Keto 25P/5C/70F, or Endurance 20P/60C/20F).',
      'Review the calculated grams of protein (4 kcal/g), carbohydrates (4 kcal/g), and fats (9 kcal/g).'
    ],
    formula: 'Protein (g) = (Calories × Protein%) / 4 | Carbs (g) = (Calories × Carb%) / 4 | Fat (g) = (Calories × Fat%) / 9',
    formulaVariables: [
      { name: 'Daily Calories', description: 'Target caloric intake.', unit: 'kcal / day', optional: false },
      { name: 'Macro Distribution', description: 'Percentage breakdown of Protein, Carbohydrate, and Fat.', unit: 'Percentage ratio', optional: false }
    ],
    workedExample: {
      scenario: 'A 2,000 kcal diet utilizing the standard balanced profile (30% Protein, 40% Carbohydrates, 30% Fat).',
      stepByStep: [
        'Protein: (2,000 × 0.30) / 4 kcal/g = 600 / 4 = 150.0 grams.',
        'Carbohydrates: (2,000 × 0.40) / 4 kcal/g = 800 / 4 = 200.0 grams.',
        'Dietary Fat: (2,000 × 0.30) / 9 kcal/g = 600 / 9 = 66.7 grams.'
      ],
      result: 'Protein: 150.0 g (600 kcal) | Carbohydrates: 200.0 g (800 kcal) | Fat: 66.7 g (600 kcal)'
    },
    interpretation: 'Converts macro percentage guidelines into precise food weighing measurements in grams for daily meal prep.',
    assumptions: 'Uses physiological Atwater energy factors (4 kcal/g for protein and carbs; 9 kcal/g for lipids).',
    limitations: 'Does not measure micronutrients, fiber intake, or water content.',
    faqs: [
      { question: 'Why does fat provide more calories per gram?', answer: 'Fats are chemically denser hydrocarbons, yielding 9 kcal per gram compared to 4 kcal for carbohydrates and proteins.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتقسيم إجمالي السعرات الحرارية اليومية إلى جرامات دقيقة من البروتين والكربوهيدرات والدهون الصحية وفقاً للنظام الغذائي المختار.`,
    howToUse: [
      'أدخل السعرات الحرارية اليومية المستهدفة (كيلو سعرة).',
      'اختر نمط التوزيع الغذائي (متوازن 30% بروتين / 40% كربوهيدرات / 30% دهون، أو عالي البروتين، أو كيتو).',
      'راجع الجرامات المحسوبة للبروتين (4 سعرات/جم)، والكربوهيدرات (4 سعرات/جم)، والدهون (9 سعرات/جم).'
    ],
    formula: 'جرامات البروتين = (السعرات × نسبة البروتين) / 4 | الكربوهيدرات = (السعرات × النسبة) / 4 | الدهون = (السعرات × النسبة) / 9',
    formulaVariables: [
      { name: 'السعرات اليومية', description: 'إجمالي السعرات المحددة لليوم.', unit: 'سعرة / يوم', optional: false },
      { name: 'نمط التوزيع', description: 'النسب المئوية للماكروز.', unit: 'نسبة مئوية (%)', optional: false }
    ],
    workedExample: {
      scenario: 'نظام غذائي يحتوي على 2,000 سعرة حرارية بتوزيع متوازن (30% بروتين، 40% كربوهيدرات، 30% دهون).',
      stepByStep: [
        'البروتين: (2,000 × 0.30) ÷ 4 = 150.0 جراماً (600 سعرة).',
        'الكربوهيدرات: (2,000 × 0.40) ÷ 4 = 200.0 جراماً (800 سعرة).',
        'الدهون: (2,000 × 0.30) ÷ 9 = 66.7 جراماً (600 سعرة).'
      ],
      result: 'البروتين: 150.0 جم | الكربوهيدرات: 200.0 جم | الدهون: 66.7 جم'
    },
    interpretation: 'تحول الأداة النسب المئوية المجردة إلى أوزان فعلية بالجرام لمطابقتها في ميزان الطعام اليومي.',
    assumptions: 'تعتمد معاملات أتووتر الحرارية المعتمدة دولياً (4 سعرات للبروتين والنشويات، 9 سعرات للدهون).',
    limitations: 'لا تحسب الفيتامينات والمعادن الدقيقة أو الألياف الغذائية غير الذائبة.',
    faqs: [
      { question: 'لماذا تعطي الدهون 9 سعرات حرارية لكل جرام؟', answer: 'لأن تركيبتها الكيميائية تحتوي على سلاسل كربونية أكثر تركيزاً بالطاقة مقارنة بالبروتين والنشويات.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} distribuye el objetivo calórico diario en gramos exactos de proteínas, carbohidratos y grasas según su pauta nutricional.`,
    howToUse: [
      'Introduzca las calorías diarias totales objetivo (kcal).',
      'Elija el perfil de distribución (Equilibrado 30/40/30, Alto en proteína, Keto o Resistencia).',
      'Revise los gramos resultantes de proteínas (4 kcal/g), carbohidratos (4 kcal/g) y grasas (9 kcal/g).'
    ],
    formula: 'Proteína (g) = (Calorías × %Prot) / 4 | Carbohidratos (g) = (Calorías × %Carb) / 4 | Grasa (g) = (Calorías × %Grasa) / 9',
    formulaVariables: [
      { name: 'Calorías diarias', description: 'Meta calórica para mantenimiento o cambio de peso.', unit: 'kcal / día', optional: false },
      { name: 'Reparto macronutrientes', description: 'Proporción porcentual de nutrientes.', unit: 'Porcentaje (%)', optional: false }
    ],
    workedExample: {
      scenario: 'Dieta de 2.000 kcal con perfil equilibrado (30 % Proteína, 40 % Carbohidratos, 30 % Grasas).',
      stepByStep: [
        'Proteínas: (2.000 × 0,30) / 4 = 150,0 gramos.',
        'Carbohidratos: (2.000 × 0,40) / 4 = 200,0 gramos.',
        'Grasas: (2.000 × 0,30) / 9 = 66,7 gramos.'
      ],
      result: 'Proteínas: 150,0 g | Carbohidratos: 200,0 g | Grasas: 66,7 g'
    },
    interpretation: 'Facilita el pesaje de alimentos diario para ajustar la ingesta a los objetivos deportivos o de composición corporal.',
    assumptions: 'Factores Atwater estándar de biodisponibilidad energética.',
    limitations: 'No computa el aporte de fibra alimentaria o micronutrientes.',
    faqs: [
      { question: '¿Por qué las grasas aportan 9 kcal por gramo?', answer: 'Poseen una estructura molecular más reducida y concentrada en energía que los carbohidratos y proteínas.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} convertit votre objectif calorique journalier en grammes précis de protéines, glucides et lipides selon votre profil diététique.`,
    howToUse: [
      'Indiquez votre apport calorique journalier cible en kcal.',
      'Sélectionnez votre répartition (Équilibrée 30/40/30, Riche en protéines, Cétogène ou Endurance).',
      'Visualisez les quantités en grammes de protéines (4 kcal/g), glucides (4 kcal/g) et lipides (9 kcal/g).'
    ],
    formula: 'Protéines (g) = (Calories × %Prot) / 4 | Glucides (g) = (Calories × %Gluc) / 4 | Lipides (g) = (Calories × %Lip) / 9',
    formulaVariables: [
      { name: 'Calories cibles', description: 'Total énergétique journalier visé.', unit: 'kcal / jour', optional: false },
      { name: 'Répartition macro', description: 'Proportion relative des trois macronutriments.', unit: 'Pourcentage (%)', optional: false }
    ],
    workedExample: {
      scenario: 'Régime à 2 000 kcal selon le profil équilibré (30 % Protéines, 40 % Glucides, 30 % Lipides).',
      stepByStep: [
        'Protéines : (2 000 × 0,30) / 4 = 150,0 grammes.',
        'Glucides : (2 000 × 0,40) / 4 = 200,0 grammes.',
        'Lipides : (2 000 × 0,30) / 9 = 66,7 grammes.'
      ],
      result: 'Protéines : 150,0 g | Glucides : 200,0 g | Lipides : 66,7 g'
    },
    interpretation: 'Permet de calibrer précisément ses portions alimentaires lors de la préparation des repas.',
    assumptions: 'Facteurs de conversion d\'Atwater universellement admis.',
    limitations: 'Ne prend pas en compte les fibres alimentaires ni les micronutriments.',
    faqs: [
      { question: 'Quel est l\'intérêt du suivi des macronutriments ?', answer: 'Il garantit que la perte ou la prise de poids cible en priorité la masse grasse tout en préservant le tissu musculaire.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} schlüsselt das tägliche Kalorienziel in Gramm Protein, Kohlenhydrate und Fett auf, abgestimmt auf Ihr Ernährungsprofil.`,
    howToUse: [
      'Geben Sie Ihr tägliches Kalorienziel in kcal ein.',
      'Wählen Sie Ihr Makro-Profil (Ausgewogen 30/40/30, High-Protein, Keto oder Ausdauer).',
      'Prüfen Sie die Gramm-Werte für Eiweiß (4 kcal/g), Kohlenhydrate (4 kcal/g) und Fett (9 kcal/g).'
    ],
    formula: 'Protein (g) = (Kalorien × %Prot) / 4 | Kohlenhydrate (g) = (Kalorien × %KH) / 4 | Fett (g) = (Kalorien × %Fett) / 9',
    formulaVariables: [
      { name: 'Tageskalorien', description: 'Zielkalorienzufuhr.', unit: 'kcal / Tag', optional: false },
      { name: 'Nährstoffverteilung', description: 'Prozentuale Gewichtung der Makronährstoffe.', unit: 'Prozent (%)', optional: false }
    ],
    workedExample: {
      scenario: 'Ein Ernährungsplan von 2.000 kcal mit ausgewogener Verteilung (30 % Protein, 40 % Kohlenhydrate, 30 % Fett).',
      stepByStep: [
        'Protein: (2.000 × 0,30) / 4 = 150,0 Gramm.',
        'Kohlenhydrate: (2.000 × 0,40) / 4 = 200,0 Gramm.',
        'Fett: (2.000 × 0,30) / 9 = 66,7 Gramm.'
      ],
      result: 'Protein: 150,0 g | Kohlenhydrate: 200,0 g | Fett: 66,7 g'
    },
    interpretation: 'Ermöglicht das präzise Wiegen von Lebensmitteln zur gezielten Steuerung von Muskelaufbau oder Fettabbau.',
    assumptions: 'Physiologische Atwater-Brennwerte (4 kcal/g für Eiweiß/KH, 9 kcal/g für Fett).',
    limitations: 'Unberücksichtigt bleiben Ballaststoffe und Mikronährstoffe.',
    faqs: [
      { question: 'Warum haben Fette mehr Kalorien pro Gramm?', answer: 'Fette besitzen eine höhere Energiedichte und liefern mit 9 kcal mehr als doppelt so viel Energie wie Kohlenhydrate oder Eiweiß.' }
    ],
    relatedTools
  })
});

// Map of first 5 Batch 1 health tools
export const BATCH1_HEALTH_HANDLERS: Record<string, Record<Language, KnowledgeHandler>> = {
  'ideal-weight': IDEAL_WEIGHT_KNOWLEDGE,
  'water-intake': WATER_INTAKE_KNOWLEDGE,
  'target-heart-rate': TARGET_HEART_RATE_KNOWLEDGE,
  bmr: BMR_KNOWLEDGE,
  'macro-split': MACRO_SPLIT_KNOWLEDGE,
};
