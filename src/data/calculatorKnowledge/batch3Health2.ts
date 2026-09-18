import { ToolDef, Language } from '../../types';
import { ToolContentDetails } from './types';

type KnowledgeHandler = (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails;

function createKnowledge(dataByLang: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails>): Record<Language, KnowledgeHandler> {
  return dataByLang;
}

// 1. LEAN BODY MASS (lean-body-mass)
export const LEAN_BODY_MASS_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates estimated Lean Body Mass (LBM), fat mass, and skeletal muscle weight using the validated Boer, James, and Hume formulas.`,
    howToUse: [
      'Select gender (male or female).',
      'Enter total body weight in kilograms or pounds.',
      'Enter height in centimeters or inches.',
      'Review LBM across Boer, James, and Hume formulas along with fat mass.'
    ],
    formula: 'Boer (Men): LBM = 0.407 × W + 0.267 × H - 19.2 | Boer (Women): LBM = 0.252 × W + 0.473 × H - 48.3',
    formulaVariables: [
      { name: 'Weight (W)', description: 'Total body mass.', unit: 'kg', optional: false },
      { name: 'Height (H)', description: 'Stature in centimeters.', unit: 'cm', optional: false }
    ],
    workedExample: {
      scenario: 'A male with 80 kg body weight and 180 cm height.',
      stepByStep: [
        'Boer Formula: (0.407 × 80) + (0.267 × 180) - 19.2 = 32.56 + 48.06 - 19.2 = 61.42 kg.',
        'Fat Mass = 80 kg - 61.42 kg = 18.58 kg (23.2% Body Fat).',
        'James Formula Result = 62.15 kg | Hume Formula Result = 60.88 kg.'
      ],
      result: 'Lean Body Mass (Boer) = 61.42 kg | Fat Mass = 18.58 kg | Estimated Body Fat = 23.23%'
    },
    interpretation: 'Lean body mass represents vital organs, bones, water, and skeletal muscle free of adipose tissue.',
    assumptions: 'Formulas apply to non-athlete general adult populations.',
    limitations: 'Heavily muscled bodybuilders or athletes with extreme musculature may exceed anthropometric formula ceilings; DEXA scans offer clinical precision.',
    faqs: [
      { question: 'Why is Lean Body Mass important for nutrition?', answer: 'Basal metabolic rate and optimal daily protein targets correlate directly with lean body mass rather than total body weight.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب كتلة الجسم اللادهنية الصافية (LBM)، وكتلة الدهون، والوزن الخالي من الشحوم باستخدام معادلات Boer و James و Hume.`,
    howToUse: [
      'حدد الجنس (ذكر أو أنثى).',
      'أدخل الوزن الإجمالي بالكيلوجرام أو الرطل.',
      'أدخل الطول بالسنتيمتر أو البوصة.',
      'اطلع على كتلة الجسم الصافية ونسبة الدهون المقدرة.'
    ],
    formula: 'معادلة Boer للرجال = 0.407 × الوزن + 0.267 × الطول - 19.2',
    formulaVariables: [
      { name: 'الوزن', description: 'وزن الجسم بالكيلوجرام.', unit: 'كجم', optional: false },
      { name: 'الطول', description: 'طول القامة بالسنتيمتر.', unit: 'سم', optional: false }
    ],
    workedExample: {
      scenario: 'رجل وزنه 80 كجم وطوله 180 سم.',
      stepByStep: [
        'معادلة Boer: (0.407 × 80) + (0.267 × 180) - 19.2 = 61.42 كجم.',
        'كتلة الدهون = 80 - 61.42 = 18.58 كجم (23.2%).'
      ],
      result: 'الكتلة العضلية واللادهنية = 61.42 كجم | كتلة الدهون = 18.58 كجم (23.23%)'
    },
    interpretation: 'تحدد كتلة العضلات والعظام والأعضاء الحيوية الخالية تماماً من الدهون.',
    assumptions: 'تعتمد على القياسات الجسمانية المعيارية للبالغين.',
    limitations: 'قد تعطي قياسات أقل دقة للرياضيين ذوي الكتل العضلية الضخمة جداً.',
    faqs: [
      { question: 'لماذا تعتبر الكتلة الصافية مهمة للرجيم؟', answer: 'لأنها تحدد معدل الحرق الحقيقي واحتياج البروتين اليومي المناسب.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la Masa Corporal Magra (LBM), masa grasa y peso libre de tejido adiposo mediante las fórmulas de Boer, James y Hume.`,
    howToUse: [
      'Seleccione sexo, peso corporal en kg y estatura en cm.',
      'Consulte la masa magra resultante y el porcentaje estimado de grasa.'
    ],
    formula: 'Boer (Hombres) = 0.407 × Peso + 0.267 × Altura - 19.2',
    formulaVariables: [
      { name: 'Peso', description: 'Masa corporal en kg.', unit: 'kg', optional: false },
      { name: 'Altura', description: 'Estatura en cm.', unit: 'cm', optional: false }
    ],
    workedExample: {
      scenario: 'Hombre de 80 kg y 180 cm de estatura.',
      stepByStep: [
        'Masa magra Boer = (0.407 × 80) + (0.267 × 180) - 19.2 = 61.42 kg.',
        'Masa grasa = 80 - 61.42 = 18.58 kg.'
      ],
      result: 'Masa Magra = 61.42 kg | Masa Grasa = 18.58 kg (23.23%)'
    },
    interpretation: 'Permite individualizar la ingesta proteica según el tejido metabólicamente activo.',
    assumptions: 'Población adulta estándar.',
    limitations: 'Atletas de fuerza de élite pueden requerir análisis DEXA.',
    faqs: [
      { question: '¿Qué compone la masa magra?', answer: 'Músculo esquelético, órganos, agua corporal y huesos.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule la Masse Maigre (LBM), la masse grasse et le poids sans tissu adipeux selon les formules de Boer, James et Hume.`,
    howToUse: [
      'Sélectionnez le sexe, saisissez le poids en kg et la taille en cm.',
      'Consultez la masse musculaire et maigre estimée.'
    ],
    formula: 'Boer (Hommes) = 0,407 × Poids + 0,267 × Taille - 19,2',
    formulaVariables: [
      { name: 'Poids', description: 'Poids en kg.', unit: 'kg', optional: false },
      { name: 'Taille', description: 'Taille en cm.', unit: 'cm', optional: false }
    ],
    workedExample: {
      scenario: 'Homme de 80 kg mesurant 180 cm.',
      stepByStep: [
        'Masse maigre = (0,407 × 80) + (0,267 × 180) - 19,2 = 61,42 kg.',
        'Masse grasse = 80 - 61,42 = 18,58 kg.'
      ],
      result: 'Masse Maigre = 61,42 kg | Masse Grasse = 18,58 kg (23,23 %)'
    },
    interpretation: 'Représente le compartiment corporel actif déterminant le métabolisme de repos.',
    assumptions: 'Adultes non athlètes de haut niveau.',
    limitations: 'Les sportifs très musclés sous-estiment parfois leur masse maigre avec les équations anthropométriques.',
    faqs: [
      { question: 'Pourquoi calculer sa masse maigre ?', answer: 'Pour fixer ses besoins caloriques et protéiques sur les tissus actifs.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} ermittelt die fettfreie Magermasse (Lean Body Mass - LBM), Fettmasse und Muskelmasse nach Boer, James und Hume.`,
    howToUse: [
      'Wählen Sie das Geschlecht und geben Sie Gewicht (kg) und Größe (cm) ein.',
      'Lesen Sie die Magermasse und den Fettanteil ab.'
    ],
    formula: 'Boer (Männer) = 0,407 × Gewicht + 0,267 × Größe - 19,2',
    formulaVariables: [
      { name: 'Gewicht', description: 'Körpergewicht in kg.', unit: 'kg', optional: false },
      { name: 'Größe', description: 'Körpergröße in cm.', unit: 'cm', optional: false }
    ],
    workedExample: {
      scenario: '80 kg schwerer Mann bei 180 cm Körpergröße.',
      stepByStep: [
        'Magermasse (Boer) = (0,407 × 80) + (0,267 × 180) - 19,2 = 61,42 kg.',
        'Fettmasse = 80 - 61,42 = 18,58 kg.'
      ],
      result: 'Magermasse = 61,42 kg | Fettmasse = 18,58 kg (23,23 %)'
    },
    interpretation: 'Zeigt den stoffwechselaktiven Anteil des Körpers ohne Fettgewebe.',
    assumptions: 'Standard-Körperproportionen.',
    limitations: 'Für Bodybuilder bieten DEXA-Scans höhere Messgenauigkeit.',
    faqs: [
      { question: 'Warum ist LBM wichtig?', answer: 'Sie bestimmt den Grundumsatz und den optimalen täglichen Eiweißbedarf.' }
    ],
    relatedTools
  })
});

// 2. BODY FRAME SIZE (body-frame-size)
export const BODY_FRAME_SIZE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} determines skeletal bone structure classification (small, medium, or large body frame) using wrist circumference and height ratios.`,
    howToUse: [
      'Select your gender.',
      'Enter height in centimeters or inches.',
      'Measure wrist circumference at the narrowest point just above the wrist bone and enter the value.',
      'Review your calculated frame size category (Small, Medium, or Large Frame).'
    ],
    formula: 'Ratio (r) = Height (cm) / Wrist Circumference (cm)',
    formulaVariables: [
      { name: 'Height', description: 'Total standing height.', unit: 'cm', optional: false },
      { name: 'Wrist Circumference', description: 'Perimeter of wrist bone.', unit: 'cm', optional: false }
    ],
    workedExample: {
      scenario: 'A male measuring 180 cm with a 17.5 cm wrist circumference.',
      stepByStep: [
        'Calculate Ratio (r) = 180 cm / 17.5 cm = 10.29.',
        'Male Classification: r > 10.4 (Small), 9.6 ≤ r ≤ 10.4 (Medium), r < 9.6 (Large).',
        'Result: 10.29 falls within the 9.6 to 10.4 range.'
      ],
      result: 'Body Frame Classification = Medium Skeletal Frame (Ratio: 10.29)'
    },
    interpretation: 'Helps calibrate realistic healthy ideal weight ranges adjusted for individual skeletal bone density and breadth.',
    assumptions: 'Assumes standard wrist bone circumference measurement technique.',
    limitations: 'Adipose tissue on the wrist can slightly distort ratio in severe obesity.',
    faqs: [
      { question: 'Why does frame size matter for ideal weight tables?', answer: 'A person with a large skeletal frame naturally carries 10% to 15% more bone and structural mass than someone with a small frame of the same height.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحديد تصنيف الهيكل العظمي للجسم (صغير، متوسط، أو عريض) باستخدام نسبة محيط المعصم إلى الطول.`,
    howToUse: [
      'حدد الجنس.',
      'أدخل الطول بالسنتيمتر.',
      'قس محيط معصم اليد بالسنتيمتر فوق عظمة الرسغ وأدخل القيمة.',
      'اطلع على تصنيف حجم الهيكل العظمي وتأثيره على الوزن المثالي.'
    ],
    formula: 'النسبة (r) = الطول (سم) ÷ محيط المعصم (سم)',
    formulaVariables: [
      { name: 'الطول', description: 'الطول الكلي بالسنتيمتر.', unit: 'سم', optional: false },
      { name: 'محيط المعصم', description: 'محيط الرسغ بالسنتيمتر.', unit: 'سم', optional: false }
    ],
    workedExample: {
      scenario: 'رجل طوله 180 سم ومحيط معصمه 17.5 سم.',
      stepByStep: [
        'النسبة = 180 ÷ 17.5 = 10.29.',
        'تصنيف الرجال: المتوسط بين 9.6 و 10.4.'
      ],
      result: 'تصنيف الهيكل العظمي = هيكل متوسط (النسبة: 10.29)'
    },
    interpretation: 'تساعد في تخصيص الوزن المثالي بما يتناسب مع حجم العظام الطبيعي.',
    assumptions: 'قياس دقيق للمعصم فوق العظم مباشرة.',
    limitations: 'قد تؤثر السمنة الشديدة قليلاً على قياس محيط المعصم.',
    faqs: [
      { question: 'كيف يؤثر حجم الهيكل على الوزن؟', answer: 'أصحاب الهياكل العريضة يحملون كتلة عظمية أكبر بنسبة 10-15% مقارنة بالهياكل الصغيرة بنفس الطول.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} clasifica la estructura ósea corporal (pequeña, mediana o grande) según la relación entre estatura y perímetro de la muñeca.`,
    howToUse: [
      'Seleccione sexo, ingrese estatura en cm y perímetro de muñeca en cm.',
      'Consulte la categoría de complexión ósea.'
    ],
    formula: 'Ratio = Estatura (cm) / Perímetro de Muñeca (cm)',
    formulaVariables: [
      { name: 'Estatura', description: 'Altura en cm.', unit: 'cm', optional: false },
      { name: 'Muñeca', description: 'Circunferencia de muñeca.', unit: 'cm', optional: false }
    ],
    workedExample: {
      scenario: 'Hombre de 180 cm con muñeca de 17.5 cm.',
      stepByStep: [
        'Ratio = 180 / 17.5 = 10.29 (Rango medio: 9.6 - 10.4).'
      ],
      result: 'Estructura Corporal = Complexión Mediana (Ratio: 10.29)'
    },
    interpretation: 'Permite ajustar las tablas de peso ideal a la constitución esquelética.',
    assumptions: 'Medición precisa sobre el hueso de la muñeca.',
    limitations: 'Acumulación de grasa en muñeca puede variar ligeramente el valor.',
    faqs: [
      { question: '¿Por qué influye la complexión ósea?', answer: 'Porque la masa del esqueleto varía entre personas de la misma estatura.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} détermine la corpulence et morphologie osseuse (ossature fine, moyenne ou large) par le ratio taille/tour de poignet.`,
    howToUse: [
      'Indiquez le sexe, la taille en cm et la circonférence du poignet en cm.',
      'Découvrez votre catégorie d’ossature.'
    ],
    formula: 'Ratio = Taille (cm) / Tour de Poignet (cm)',
    formulaVariables: [
      { name: 'Taille', description: 'Taille en cm.', unit: 'cm', optional: false },
      { name: 'Tour de Poignet', description: 'Mesure au-dessus de l’os.', unit: 'cm', optional: false }
    ],
    workedExample: {
      scenario: 'Homme de 180 cm avec un poignet de 17,5 cm.',
      stepByStep: [
        'Ratio = 180 / 17,5 = 10,29 (Ossature moyenne : 9,6 à 10,4).'
      ],
      result: 'Morphologie Osseuse = Ossature Moyenne (Ratio : 10,29)'
    },
    interpretation: 'Ajuste les grilles de poids de forme en fonction de la constitution squelettique.',
    assumptions: 'Mesure directe au niveau de l’articulation.',
    limitations: 'L’adiposité peut majorer légèrement le tour de poignet.',
    faqs: [
      { question: 'Quel est l’intérêt de connaître son ossature ?', answer: 'Cela évite de viser des objectifs de poids irréalistes ou inadaptés à sa morphologie naturelle.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} bestimmt den Knochenbau- und Körperbautyp (zierlich, mittel oder kräftig) über das Verhältnis von Körpergröße zu Handgelenksumfang.`,
    howToUse: [
      'Wählen Sie das Geschlecht, geben Sie Körpergröße (cm) und Handgelenksumfang (cm) ein.',
      'Lesen Sie Ihren Knochenbautyp ab.'
    ],
    formula: 'Verhältnis = Körpergröße (cm) / Handgelenksumfang (cm)',
    formulaVariables: [
      { name: 'Körpergröße', description: 'Größe in cm.', unit: 'cm', optional: false },
      { name: 'Handgelenksumfang', description: 'Umfang am Gelenkknochen.', unit: 'cm', optional: false }
    ],
    workedExample: {
      scenario: 'Mann mit 180 cm Größe und 17,5 cm Handgelenk.',
      stepByStep: [
        'Verhältnis = 180 / 17,5 = 10,29 (Mittelgroßer Knochenbau: 9,6 - 10,4).'
      ],
      result: 'Körperbautyp = Mittlerer Knochenbau (Ratio: 10,29)'
    },
    interpretation: 'Präzisiert das persönliche Idealgewicht anhand der Skelettmasse.',
    assumptions: 'Genaue Messung am Handgelenksknochen.',
    limitations: 'Starke Fetteinlagerungen am Handgelenk können das Ergebnis verfälschen.',
    faqs: [
      { question: 'Beeinflusst der Knochenbau das Idealgewicht?', answer: 'Ja, Menschen mit kräftigem Knochenbau wiegen bei gleicher Größe naturgemäß mehr.' }
    ],
    relatedTools
  })
});

// 3. GLYCEMIC LOAD (glycemic-load)
export const GLYCEMIC_LOAD_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates Glycemic Load (GL) for food servings based on Glycemic Index (GI) and available carbohydrate content, categorizing meals into Low (≤10), Medium (11-19), and High (≥20) blood glucose impact.`,
    howToUse: [
      'Enter the Glycemic Index (GI) of the food item (0 to 100).',
      'Enter available carbohydrates per serving in grams (Total Carbs - Fiber).',
      'Review calculated Glycemic Load and glycemic impact classification.'
    ],
    formula: 'Glycemic Load (GL) = [Glycemic Index (GI) × Available Carbs (g)] / 100',
    formulaVariables: [
      { name: 'Glycemic Index (GI)', description: 'Speed of glucose entry into blood (0-100).', unit: 'Index', optional: false },
      { name: 'Available Carbs', description: 'Total Carbohydrates minus Fiber per serving.', unit: 'Grams', optional: false }
    ],
    workedExample: {
      scenario: 'Watermelon serving with high GI (72) but only 6 grams of available carbs per 120g slice.',
      stepByStep: [
        'Glycemic Load = (72 × 6 g) / 100 = 432 / 100 = 4.32.',
        'Classification: GL ≤ 10 is Low, 11-19 is Medium, ≥ 20 is High.',
        'Result: Despite high GI (72), watermelon has a Low Glycemic Load (4.3) due to low carbohydrate density.'
      ],
      result: 'Glycemic Load = 4.32 | Category = Low Glycemic Impact (GL ≤ 10)'
    },
    interpretation: 'Glycemic Load provides a far more accurate representation of postprandial blood sugar response than Glycemic Index alone by incorporating portion size.',
    assumptions: 'Assumes isolated ingestion; co-ingestion with fats, protein, or acid slows gastric emptying.',
    limitations: 'Individual insulin resistance and microbiome affect individual glycemic response.',
    faqs: [
      { question: 'Why is Glycemic Load better than Glycemic Index?', answer: 'GI only measures speed of carb absorption, whereas GL measures both the speed and the actual amount of carbs in a realistic serving.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب الحمل الجلايسيمي (Glycemic Load - GL) للأطعمة بالاعتماد على المؤشر الجلايسيمي (GI) وكمية الكربوهيدرات الصافية لكل حصة غذائية.`,
    howToUse: [
      'أدخل المؤشر الجلايسيمي للغذاء (GI من 0 إلى 100).',
      'أدخل كمية الكربوهيدرات المتاحة بالجرام (الكربوهيدرات مطروحاً منها الألياف).',
      'اطلع على قيمة الحمل الجلايسيمي وتصنيفه (منخفض ≤10، متوسط 11-19، مرتفع ≥20).'
    ],
    formula: 'الحمل الجلايسيمي = [المؤشر الجلايسيمي (GI) × الكربوهيدرات (جرام)] ÷ 100',
    formulaVariables: [
      { name: 'المؤشر الجلايسيمي', description: 'سرعة رفع سكر الدم (0-100).', unit: 'مؤشر', optional: false },
      { name: 'الكربوهيدرات المتاحة', description: 'جرامات الكارب الصافي في الحصة.', unit: 'جرام', optional: false }
    ],
    workedExample: {
      scenario: 'شريحة بطيخ مؤشرها الجلايسيمي مرتفع (72) ولكنها تحتوي على 6 جرامات كارب فقط.',
      stepByStep: [
        'الحمل الجلايسيمي = (72 × 6) ÷ 100 = 4.32.',
        'التصنيف: أقل من 10 يعتبر منخفض التأثير على سكر الدم.'
      ],
      result: 'الحمل الجلايسيمي = 4.32 | التصنيف = تأثير منخفض على سكر الدم'
    },
    interpretation: 'يقيس التأثير الفعلي لحصة الطعام على ارتفاع سكر الدم والأنسولين بدقة أكبر من المؤشر الجلايسيمي بمفرده.',
    assumptions: 'يفترض تناول الطعام بشكل منفرد دون دهون أو بروتين إضافي.',
    limitations: 'تتفاوت استجابة سكر الدم حسب حساسية الأنسولين الفردية.',
    faqs: [
      { question: 'ما الفرق بين المؤشر الجلايسيمي والحمل الجلايسيمي؟', answer: 'المؤشر يقيس سرعة الامتصاص فقط، بينما الحمل يقيس السرعة مع حجم الحصة الفعلي.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la Carga Glucémica (GL) de los alimentos considerando el Índice Glucémico (IG) y los carbohidratos netos por ración.`,
    howToUse: [
      'Ingrese el Índice Glucémico del alimento (0-100).',
      'Ingrese los gramos de carbohidratos netos de la porción.',
      'Consulte la Carga Glucémica (Baja ≤10, Media 11-19, Alta ≥20).'
    ],
    formula: 'Carga Glucémica = (Índice Glucémico × Carbohidratos en g) / 100',
    formulaVariables: [
      { name: 'Índice Glucémico', description: 'Velocidad de absorción de glucosa.', unit: 'Índice', optional: false },
      { name: 'Carbohidratos', description: 'Carbohidratos netos en gramos.', unit: 'Gramos', optional: false }
    ],
    workedExample: {
      scenario: 'Porción de sandía con IG alto (72) pero solo 6 g de carbohidratos.',
      stepByStep: [
        'Carga Glucémica = (72 × 6) / 100 = 4.32 (Baja).'
      ],
      result: 'Carga Glucémica = 4.32 | Clasificación = Impacto Bajo (GL ≤ 10)'
    },
    interpretation: 'Mide el impacto glucémico real de una comida en función de la cantidad consumida.',
    assumptions: 'Consumo aislado del alimento.',
    limitations: 'La presencia de grasas o proteínas ralentiza la absorción.',
    faqs: [
      { question: '¿Qué es una carga glucémica baja?', answer: 'Un valor igual o inferior a 10 genera poca elevación de glucosa e insulina.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule la Charge Glycémique (CG) d'une portion d'aliment à partir de son Index Glycémique (IG) et de sa teneur en glucides nets.`,
    howToUse: [
      'Indiquez l’Index Glycémique (IG) de l’aliment.',
      'Saisissez les glucides disponibles par portion en grammes.',
      'Consultez la Charge Glycémique (Faible ≤10, Modérée 11-19, Élevée ≥20).'
    ],
    formula: 'Charge Glycémique = (Index Glycémique × Glucides en g) / 100',
    formulaVariables: [
      { name: 'Index Glycémique', description: 'Vitesse de montée de la glycémie.', unit: 'Indice', optional: false },
      { name: 'Glucides Nets', description: 'Glucides assimilables par portion.', unit: 'Grammes', optional: false }
    ],
    workedExample: {
      scenario: 'Portion de pastèque avec un IG de 72 et 6 g de glucides.',
      stepByStep: [
        'Charge Glycémique = (72 × 6) / 100 = 4,32.'
      ],
      result: 'Charge Glycémique = 4,32 | Impact = Faible (CG ≤ 10)'
    },
    interpretation: 'Permet d’évaluer la réponse insulinique réelle en tenant compte de la taille de la portion.',
    assumptions: 'Aliment consommé seul.',
    limitations: 'Les lipides et fibres du repas modulent l’absorption globale.',
    faqs: [
      { question: 'Pourquoi la charge glycémique est-elle plus utile que l’IG ?', answer: 'Parce qu’elle intègre la quantité de glucides réellement ingérée dans une portion standard.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die Glykämische Last (GL) von Lebensmitteln aus dem Glykämischen Index (GI) und den verfügbaren Kohlenhydraten pro Portion.`,
    howToUse: [
      'Geben Sie den Glykämischen Index (GI) des Lebensmittels ein.',
      'Geben Sie die anrechenbaren Kohlenhydrate pro Portion in Gramm ein.',
      'Lesen Sie die Glykämische Last ab (Niedrig ≤10, Mittel 11-19, Hoch ≥20).'
    ],
    formula: 'Glykämische Last = (Glykämischer Index × Kohlenhydrate in g) / 100',
    formulaVariables: [
      { name: 'Glykämischer Index', description: 'Blutzuckeranstiegsgeschwindigkeit.', unit: 'Index', optional: false },
      { name: 'Kohlenhydrate', description: 'Netto-Kohlenhydrate der Portion.', unit: 'Gramm', optional: false }
    ],
    workedExample: {
      scenario: 'Wassermelone mit hohem GI (72), aber nur 6 g Kohlenhydraten.',
      stepByStep: [
        'Glykämische Last = (72 × 6) / 100 = 4,32.'
      ],
      result: 'Glykämische Last = 4,32 | Kategorie = Niedrige Blutzuckerwirkung (GL ≤ 10)'
    },
    interpretation: 'Zeigt den tatsächlichen Blutzuckeranstieg unter Berücksichtigung der Portionsgröße.',
    assumptions: 'Einzelverzehr ohne begleitende Fette.',
    limitations: 'Gleichzeitige Proteine oder Fette verlangsamen die Magenentleerung.',
    faqs: [
      { question: 'Was ist eine niedrige Glykämische Last?', answer: 'Werte unter 10 schonen die Bauchspeicheldrüse und halten den Insulinspiegel stabil.' }
    ],
    relatedTools
  })
});

// 4. SLEEP DEBT CALCULATOR (sleep-debt)
export const SLEEP_DEBT_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates cumulative weekly sleep debt, sleep deficit hours, recovery timelines, and optimal catch-up sleep strategies.`,
    howToUse: [
      'Enter your personal target sleep need (e.g., 8.0 hours/night).',
      'Enter actual sleep duration logged for each of the past 7 days.',
      'Review total accumulated sleep debt hours and recommended weekend recovery schedule.'
    ],
    formula: 'Weekly Sleep Debt = Σ (Daily Target - Actual Sleep) over 7 days',
    formulaVariables: [
      { name: 'Sleep Need', description: 'Target nightly sleep requirement.', unit: 'Hours/Night', optional: false },
      { name: 'Daily Sleep Logs', description: 'Actual hours slept across Monday-Sunday.', unit: 'Hours/Day', optional: false }
    ],
    workedExample: {
      scenario: 'An individual needing 8.0h/night sleeps 6.0h on 5 weekdays (Mon-Fri) and 8.0h on Saturday/Sunday.',
      stepByStep: [
        'Weekday Deficit = 5 days × (8.0h - 6.0h) = 5 × 2.0h = 10.0 hours.',
        'Weekend Deficit = 2 days × (8.0h - 8.0h) = 0.0 hours.',
        'Total Weekly Sleep Debt = 10.0 hours.',
        'Safe Recovery Protocol: Add 1.0 to 1.5 hours per night over the next 7-10 days rather than extreme 12-hour weekend sleep bingeing.'
      ],
      result: 'Accumulated Sleep Debt = 10.0 hours | Recovery Pace = +1.25 hrs/night over 8 days'
    },
    interpretation: 'Quantifies chronic sleep deprivation which impairs executive cognition, reaction time, and hormonal regulation.',
    assumptions: 'Assumes consistent baseline sleep architecture and sleep efficiency.',
    limitations: 'Acute weekend oversleeping can cause circadian phase shift (social jetlag).',
    faqs: [
      { question: 'Can you completely erase years of chronic sleep debt in one weekend?', answer: 'No, research shows neurobehavioral recovery from chronic debt requires multiple consecutive nights of consistent 8-9 hour sleep.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب دين النوم التراكمي الأسبوعي، وساعات العجز في النوم، وخطة التعافي التدريجية للحفاظ على صحة الدماغ والهرمونات.`,
    howToUse: [
      'أدخل الاحتياج اليومي المستهدف من النوم (مثلاً 8 ساعات).',
      'أدخل ساعات النوم الفعلية لكل يوم من أيام الأسبوع الماضي.',
      'اطلع على إجمالي ساعات دين النوم المتراكمة واستراتيجية التعويض الآمنة.'
    ],
    formula: 'دين النوم الأسبوعي = مجموع (الهدف اليومي - ساعات النوم الفعلية) على مدار 7 أيام',
    formulaVariables: [
      { name: 'الاحتياج اليومي', description: 'ساعات النوم الكافية للشخص.', unit: 'ساعة/ليلة', optional: false },
      { name: 'النوم الفعلي', description: 'الساعات المسجلة يومياً.', unit: 'ساعة/يوم', optional: false }
    ],
    workedExample: {
      scenario: 'شخص يحتاج 8 ساعات وينام 6 ساعات فقط خلال 5 أيام عمل (عجز ساعتين يومياً).',
      stepByStep: [
        'عجز أيام العمل = 5 × 2 = 10 ساعات.',
        'عجز عطلة نهاية الأسبوع = 0.',
        'إجمالي دين النوم = 10.0 ساعات.',
        'خطة التعافي: زيادة ساعة وربع إضافية كل ليلة على مدار أسبوع.'
      ],
      result: 'دين النوم التراكمي = 10.0 ساعات | معدل التعافي = +1.25 ساعة/ليلة'
    },
    interpretation: 'توضح حجم الحرمان من النوم وتأثيره على التركيز والإرهاق والذاكرة.',
    assumptions: 'تفترض جودة نوم طبيعية دون اضطرابات تنفسية.',
    limitations: 'النوم المفرط المفاجئ في عطلة نهاية الأسبوع قد يربك الساعة البيولوجية.',
    faqs: [
      { question: 'هل يمكن تعويض النوم المتأخر بنوم طويل في عطلة نهاية الأسبوع؟', answer: 'الأفضل تعويضه تدريجياً بإضافة ساعة إضافية يومياً لتفادي اضطراب الساعة البيولوجية.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la deuda de sueño acumulada durante la semana y propone un plan de recuperación gradual.`,
    howToUse: [
      'Ingrese las horas ideales de sueño por noche.',
      'Ingrese las horas reales dormidas durante los últimos 7 días.',
      'Consulte la deuda total y las pautas de recuperación.'
    ],
    formula: 'Deuda de Sueño = Σ (Objetivo Diario - Sueño Real)',
    formulaVariables: [
      { name: 'Objetivo de Sueño', description: 'Horas necesarias al día.', unit: 'Horas', optional: false }
    ],
    workedExample: {
      scenario: 'Necesidad de 8h/noche, durmiendo 6h de lunes a viernes (déficit de 2h/día).',
      stepByStep: [
        'Deuda semanal = 5 días × 2h = 10.0 horas acumuladas.'
      ],
      result: 'Deuda de Sueño = 10.0 horas | Recuperación = +1.25 h/noche durante 8 días'
    },
    interpretation: 'Alerta sobre el déficit crónico de descanso y su efecto sobre el rendimiento.',
    assumptions: 'Eficiencia y calidad del sueño homogéneas.',
    limitations: 'Dormir en exceso un solo día puede alterar los ritmos circadianos.',
    faqs: [
      { question: '¿Cómo recuperar la deuda de sueño?', answer: 'Añadiendo entre 60 y 90 minutos de sueño por noche de forma constante.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule la dette de sommeil hebdomadaire accumulée et planifie une récupération progressive du déficit nocturne.`,
    howToUse: [
      'Indiquez votre besoin quotidien de sommeil.',
      'Renseignez la durée réelle de vos nuits sur les 7 derniers jours.',
      'Consultez votre dette totale et les conseils de régulation.'
    ],
    formula: 'Dette de Sommeil = Σ (Besoin Quotidien - Sommeil Réel)',
    formulaVariables: [
      { name: 'Besoin Quotidien', description: 'Heures de sommeil recommandées.', unit: 'Heures', optional: false }
    ],
    workedExample: {
      scenario: 'Besoin de 8 h par nuit avec 6 h dormies du lundi au vendredi.',
      stepByStep: [
        'Dette totale = 5 jours × 2 h = 10,0 heures de déficit.'
      ],
      result: 'Dette de Sommeil = 10,0 heures | Plan = +1h15 par nuit pendant 8 jours'
    },
    interpretation: 'Quantifie la fatigue cumulée altérant la vigilance cognitive et l’immunité.',
    assumptions: 'Sommeil continu sans insomnie majeure.',
    limitations: 'Les grasses matinées excessives décalent l’horloge biologique.',
    faqs: [
      { question: 'Peut-on rattraper 10 h de dette de sommeil en une nuit ?', answer: 'Non, le cerveau récupère de façon plus efficace et stable en étalant les nuits plus longues sur plusieurs jours.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet das wöchentlich aufgelaufene Schlafdefizit (Schlafschulden) und empfiehlt ein nachhaltiges Erholungsschema.`,
    howToUse: [
      'Geben Sie Ihren täglichen Schlafbedarf ein (z. B. 8 Stunden).',
      'Geben Sie die tatsächliche Schlafdauer der letzten 7 Tage ein.',
      'Lesen Sie das aufgelaufene Schlafkonto ab.'
    ],
    formula: 'Schlafschuld = Σ (Täglicher Bedarf - Tatsächlicher Schlaf)',
    formulaVariables: [
      { name: 'Schlafbedarf', description: 'Erforderliche Nachtruhe.', unit: 'Stunden', optional: false }
    ],
    workedExample: {
      scenario: '8 Std. Bedarf, 6 Std. Schlaf an 5 Wochentagen (2 Std. Defizit/Tag).',
      stepByStep: [
        'Wöchentliches Schlafkonto = 5 × 2 Std. = 10,0 Stunden Defizit.'
      ],
      result: 'Schlafschulden = 10,0 Stunden | Erholung = +1,25 Std./Nacht über 8 Tage'
    },
    interpretation: 'Verhindert chronische Übermüdung und Konzentrationsschwächen.',
    assumptions: 'Gleichbleibende Schlafqualität.',
    limitations: 'Extremes Ausschlafen am Wochenende kann den Biorhythmus stören.',
    faqs: [
      { question: 'Wie baut man Schlafschulden optimal ab?', answer: 'Indem man in den folgenden Tagen jeweils 1 bis 1,5 Stunden früher zu Bett geht.' }
    ],
    relatedTools
  })
});

// 5. MENSTRUAL CYCLE CALCULATOR (menstrual-cycle)
export const MENSTRUAL_CYCLE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} predicts future menstrual periods, ovulation day, follicular/luteal phases, and fertile conception windows based on cycle length history.`,
    howToUse: [
      'Enter the start date of your last menstrual period (LMP).',
      'Enter your average menstrual cycle length in days (typical range 21 to 35 days, default 28 days).',
      'Optionally adjust luteal phase length (standard default is 14 days).',
      'Review predicted next period dates, estimated ovulation day, and the 6-day fertile window.'
    ],
    formula: 'Ovulation Day = Cycle Length - Luteal Phase Length (typically Day 14 of a 28-day cycle)',
    formulaVariables: [
      { name: 'Last Period Date', description: 'Calendar start of last bleeding.', unit: 'Date', optional: false },
      { name: 'Cycle Length', description: 'Days from start of one period to the start of next.', unit: 'Days', optional: false },
      { name: 'Luteal Phase', description: 'Days between ovulation and next period (~14 days).', unit: 'Days', optional: true }
    ],
    workedExample: {
      scenario: 'Last period began on May 1st with a regular 28-day cycle.',
      stepByStep: [
        'Ovulation Day = Day 28 - 14 = Day 14 (May 14th).',
        'Fertile Window = 5 days before ovulation plus ovulation day (May 9th to May 14th).',
        'Peak Fertility = May 13th and May 14th.',
        'Next Menstrual Period Expected = May 1st + 28 days = May 29th.'
      ],
      result: 'Estimated Ovulation: May 14 | Fertile Window: May 9 - May 14 | Next Period: May 29'
    },
    interpretation: 'Helps women track reproductive health, understand cycle phases, and plan or avoid pregnancy with calendar awareness.',
    assumptions: 'Assumes regular menstrual cycles without hormonal contraceptive suppression.',
    limitations: 'Calendar prediction is an estimate; stress, illness, or hormonal fluctuations can shift ovulation. Not a standalone contraceptive method.',
    faqs: [
      { question: 'How long is the fertile window?', answer: 'Approximately 6 days: sperm can survive up to 5 days in cervical fluid, and the released ovum remains viable for 12 to 24 hours.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتقدير مواعيد الدورة الشهرية القادمة، ويوم الإباضة المتوقع، ونافذة الخصوبة العالية، ومراحل الدورة الهرمونية.`,
    howToUse: [
      'أدخلي تاريخ أول يوم لآخر دورة شهرية.',
      'أدخلي متوسط طول الدورة بالأيام (المتوسط الطبيعي 28 يوماً، بين 21 و 35 يوماً).',
      'حددي طول المرحلة اللوتينية (الافتراضي 14 يوماً).',
      'اطلعي على المواعيد المتوقعة للتبويض وفترة الخصوبة وبداية الدورة التالية.'
    ],
    formula: 'يوم التبويض = طول الدورة - 14 يوماً (اليوم 14 في الدورة المنتظمة)',
    formulaVariables: [
      { name: 'تاريخ آخر دورة', description: 'أول يوم لنزول الدورة.', unit: 'تاريخ', optional: false },
      { name: 'طول الدورة', description: 'الأيام بين بداية كل دورتين.', unit: 'أيام', optional: false }
    ],
    workedExample: {
      scenario: 'آخر دورة بدأت في 1 مايو مع دورة منتظمة مدتها 28 يوماً.',
      stepByStep: [
        'يوم الإباضة المتوقع = 14 مايو.',
        'نافذة الخصوبة = من 9 مايو إلى 14 مايو (6 أيام).',
        'تاريخ الدورة القادمة = 29 مايو.'
      ],
      result: 'يوم التبويض = 14 مايو | نافذة الخصوبة = 9 إلى 14 مايو | الدورة القادمة = 29 مايو'
    },
    interpretation: 'تساعد في متابعة الصحة الإنجابية والتخطيط للحمل بمعرفة الأيام الأعلى خصوبة.',
    assumptions: 'تفترض انتظام الدورة الشهرية.',
    limitations: 'الحسابات تقريبية ولا تغني عن الاستشارة الطبية أو الفحوصات الهرمونية.',
    faqs: [
      { question: 'كم يوماً تستمر فترة الخصوبة؟', answer: 'تستمر حوالي 6 أيام لأن الحيوانات المنوية تعيش حتى 5 أيام بينما تعيش البويضة من 12 إلى 24 ساعة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} pronostica las fechas del ciclo menstrual, día estimado de ovulación y la ventana fértil de concepción.`,
    howToUse: [
      'Ingrese la fecha de inicio del último periodo.',
      'Ingrese la duración media del ciclo en días (ej. 28 días).',
      'Consulte el día de ovulación y la ventana de mayor fertilidad.'
    ],
    formula: 'Día de Ovulación = Duración del Ciclo - 14 días',
    formulaVariables: [
      { name: 'Última Regla', description: 'Fecha de inicio del sangrado.', unit: 'Fecha', optional: false },
      { name: 'Duración Ciclo', description: 'Días promedio entre periodos.', unit: 'Días', optional: false }
    ],
    workedExample: {
      scenario: 'Último periodo el 1 de mayo con ciclo de 28 días.',
      stepByStep: [
        'Ovulación estimada = 14 de mayo.',
        'Ventana fértil = 9 al 14 de mayo.',
        'Próximo periodo = 29 de mayo.'
      ],
      result: 'Ovulación: 14 Mayo | Ventana Fértil: 9-14 Mayo | Próximo Periodo: 29 Mayo'
    },
    interpretation: 'Facilita el seguimiento de la salud reproductiva femenina.',
    assumptions: 'Ciclos menstruales regulares.',
    limitations: 'Estimación matemática; no sustituye métodos anticonceptivos seguros.',
    faqs: [
      { question: '¿Por qué la ventana fértil dura 6 días?', answer: 'Debido a la supervivencia de los espermatozoides (hasta 5 días) y la vida útil del óvulo (24 horas).' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} prévoit les prochaines règles, la date d'ovulation et la fenêtre de fertilité en fonction de la durée moyenne du cycle.`,
    howToUse: [
      'Indiquez la date du premier jour des dernières règles.',
      'Saisissez la durée moyenne du cycle en jours (standard 28 jours).',
      'Consultez la date d’ovulation et la période féconde.'
    ],
    formula: 'Jour d’Ovulation = Durée du Cycle - 14 jours',
    formulaVariables: [
      { name: 'Dernières Règles', description: 'Date de début.', unit: 'Date', optional: false },
      { name: 'Durée du Cycle', description: 'Nombre de jours entre deux cycles.', unit: 'Jours', optional: false }
    ],
    workedExample: {
      scenario: 'Début des règles le 1er mai avec un cycle régulier de 28 jours.',
      stepByStep: [
        'Date d’ovulation = 14 mai.',
        'Fenêtre fertile = du 9 au 14 mai.',
        'Prochaines règles = 29 mai.'
      ],
      result: 'Ovulation : 14 Mai | Fenêtre Fertile : 9 au 14 Mai | Prochaines Règles : 29 Mai'
    },
    interpretation: 'Aide à comprendre les phases hormonales pour le suivi de la fertilité.',
    assumptions: 'Cycles naturels sans contraception hormonale.',
    limitations: 'Ne constitue pas une méthode contraceptive infaillible.',
    faqs: [
      { question: 'Combien de temps vit l’ovocyte ?', answer: 'Entre 12 et 24 heures après son expulsion folliculaire.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die nächsten Menstruationstermine, den Eisprungtag (Ovulation) und das fruchtbare Zeitfenster.`,
    howToUse: [
      'Geben Sie das Datum des ersten Tages der letzten Periode ein.',
      'Geben Sie die durchschnittliche Zykluslänge in Tagen ein (z. B. 28 Tage).',
      'Lesen Sie den Eisprung und die fruchtbaren Tage ab.'
    ],
    formula: 'Eisprung = Zykluslänge - 14 Tage',
    formulaVariables: [
      { name: 'Letzte Periode', description: 'Startdatum der Blutung.', unit: 'Datum', optional: false },
      { name: 'Zykluslänge', description: 'Tage zwischen zwei Perioden.', unit: 'Tage', optional: false }
    ],
    workedExample: {
      scenario: 'Periodenbeginn am 1. Mai bei 28-tägigem Zyklus.',
      stepByStep: [
        'Voraussichtlicher Eisprung = 14. Mai.',
        'Fruchtbare Tage = 9. bis 14. Mai.',
        'Nächste Periode = 29. Mai.'
      ],
      result: 'Eisprung: 14. Mai | Fruchtbare Phase: 9.-14. Mai | Nächste Periode: 29. Mai'
    },
    interpretation: 'Unterstützt die Zyklusbeobachtung bei Kinderwunsch oder natürlicher Familienplanung.',
    assumptions: 'Regelmäßiger Zyklusverlauf.',
    limitations: 'Dient nur zur Orientierung und ist kein Verhütungsmittel.',
    faqs: [
      { question: 'Wann ist die Fruchtbarkeit am höchsten?', answer: 'In den zwei Tagen direkt vor dem Eisprung sowie am Tag des Eisprungs selbst.' }
    ],
    relatedTools
  })
});

// 6. COMBINATORICS nCr & nPr (combinatorics-ncr)
export const COMBINATORICS_NCR_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates mathematical combinations (nCr: order does not matter) and permutations (nPr: order matters), factorials (n!), and Pascal triangle coefficients.`,
    howToUse: [
      'Enter total number of items in the set (n ≥ 0).',
      'Enter number of items chosen in each subset (0 ≤ r ≤ n).',
      'Select calculation type: Combination (nCr) or Permutation (nPr).',
      'Review computed permutations, combinations, and factorial expansion steps.'
    ],
    formula: 'nCr = n! / [r! × (n - r)!] | nPr = n! / (n - r)!',
    formulaVariables: [
      { name: 'Total Set Size (n)', description: 'Total distinct elements available.', unit: 'Integer (n ≥ 0)', optional: false },
      { name: 'Selection Size (r)', description: 'Number of elements chosen.', unit: 'Integer (0 ≤ r ≤ n)', optional: false }
    ],
    workedExample: {
      scenario: 'Choosing a committee of 3 members from a group of 8 candidates (n = 8, r = 3).',
      stepByStep: [
        '8! = 40,320.',
        '3! = 6.',
        '(8 - 3)! = 5! = 120.',
        'nCr = 40,320 / (6 × 120) = 40,320 / 720 = 56 combinations.',
        'nPr = 40,320 / 120 = 336 permutations (ordered arrangements).'
      ],
      result: 'Combinations (nCr) = 56 | Permutations (nPr) = 336 | Factorial (8!) = 40,320'
    },
    interpretation: 'Essential for discrete mathematics, probability theory, lottery odds, and statistical sampling designs.',
    assumptions: 'Elements are distinct and sampling is without replacement.',
    limitations: 'Extremely large inputs (n > 170) exceed standard 64-bit IEEE floating-point limits and require arbitrary-precision arithmetic.',
    faqs: [
      { question: 'What is the main difference between combinations and permutations?', answer: 'Permutations account for ordering (e.g., gold/silver/bronze podium positions), whereas combinations treat different orders of the same members as identical.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب التوافيق الرياضية (nCr حيث الترتيب غير مهم) والتباديل (nPr حيث الترتيب مهم) والمضروب الرياضي (n!) ونظرية ذات الحدين.`,
    howToUse: [
      'أدخل العدد الكلي للعناصر (n).',
      'أدخل عدد العناصر المختارة (r).',
      'اختر نوع العملية: توافيق (nCr) أو تباديل (nPr).',
      'اطلع على النتيجة الرياضية والخطوات التفصيلية للمضروب.'
    ],
    formula: 'التوافيق nCr = !n ÷ [!r × !(n - r)] | التباديل nPr = !n ÷ !(n - r)',
    formulaVariables: [
      { name: 'العدد الكلي (n)', description: 'إجمالي العناصر المتاحة.', unit: 'عدد صحيح', optional: false },
      { name: 'عدد الاختيارات (r)', description: 'العناصر المراد اختيارها.', unit: 'عدد صحيح', optional: false }
    ],
    workedExample: {
      scenario: 'اختيار لجنة من 3 أشخاص من بين 8 مرشحين (n = 8, r = 3).',
      stepByStep: [
        'مضروب 8! = 40,320.',
        'مضروب 3! = 6 ومضروب 5! = 120.',
        'التوافيق nCr = 40,320 ÷ (6 × 120) = 56 طريقة.',
        'التباديل nPr = 40,320 ÷ 120 = 336 ترتيباً.'
      ],
      result: 'التوافيق (nCr) = 56 طريقة | التباديل (nPr) = 336 ترتيباً'
    },
    interpretation: 'تستخدم في حساب الاحتمالات الإحصائية ونظريات الألعاب وتوزيع العينات.',
    assumptions: 'عناصر متمايزة دون تكرار.',
    limitations: 'الأعداد الكبيرة جداً (n > 170) تتجاوز دقة الأعداد العشرية القياسية.',
    faqs: [
      { question: 'متى نستخدم التوافيق ومتى نستخدم التباديل؟', answer: 'نستخدم التباديل إذا كان ترتيب العناصر مهماً (مثل المناصب أو كلمات السر)، والتوافيق إذا كان الترتيب غير مهم (مثل اختيار مجموعات العمل).' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula combinaciones (nCr sin orden), permutaciones (nPr con orden) y factoriales (n!) para análisis probabilístico.`,
    howToUse: [
      'Ingrese el número total de elementos (n) y los elementos a elegir (r).',
      'Seleccione combinaciones o permutaciones para ver el resultado.'
    ],
    formula: 'nCr = n! / [r! × (n - r)!] | nPr = n! / (n - r)!',
    formulaVariables: [
      { name: 'Total (n)', description: 'Elementos del conjunto.', unit: 'Entero', optional: false },
      { name: 'Selección (r)', description: 'Muestra elegida.', unit: 'Entero', optional: false }
    ],
    workedExample: {
      scenario: 'Elegir 3 miembros de un grupo de 8 personas (n = 8, r = 3).',
      stepByStep: [
        'Combinaciones (nCr) = 40,320 / (6 × 120) = 56.',
        'Permutaciones (nPr) = 40,320 / 120 = 336.'
      ],
      result: 'Combinaciones = 56 | Permutaciones = 336 | Factorial (8!) = 40,320'
    },
    interpretation: 'Fundamental en cálculo de probabilidades y muestreo estadístico.',
    assumptions: 'Elementos distintos sin repetición.',
    limitations: 'Valores superiores a n=170 requieren aritmética de precisión arbitraria.',
    faqs: [
      { question: '¿Cuál es la diferencia entre nCr y nPr?', answer: 'En las permutaciones el orden de selección altera el resultado; en las combinaciones no importa.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule les combinaisons (nCr), permutations (nPr) et factorielles (n!) pour les calculs de dénombrement et probabilités.`,
    howToUse: [
      'Saisissez le nombre total d’éléments (n) et le nombre d’éléments choisis (r).',
      'Consultez les résultats de combinaisons et d’arrangements.'
    ],
    formula: 'nCr = n! / [r! × (n - r)!] | nPr = n! / (n - r)!',
    formulaVariables: [
      { name: 'Taille de l’ensemble (n)', description: 'Total d’éléments.', unit: 'Entier', optional: false },
      { name: 'Éléments choisis (r)', description: 'Sous-ensemble.', unit: 'Entier', optional: false }
    ],
    workedExample: {
      scenario: 'Former un comité de 3 personnes parmi 8 candidats (n = 8, r = 3).',
      stepByStep: [
        'Combinaisons = 40 320 / (6 × 120) = 56.',
        'Arrangements (nPr) = 40 320 / 120 = 336.'
      ],
      result: 'Combinaisons (nCr) = 56 | Arrangements (nPr) = 336'
    },
    interpretation: 'Outil clé pour le calcul combinatoire, les tirages de loterie et les probabilités.',
    assumptions: 'Tirage sans remise et éléments distincts.',
    limitations: 'Les grands entiers nécessitent une gestion de grands nombres.',
    faqs: [
      { question: 'Quand utiliser nCr ?', answer: 'Quand l’ordre des éléments n’a pas d’importance (ex. une main de cartes à jouer).' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet mathematische Kombinationen (nCr ohne Reihenfolge), Permutationen (nPr mit Reihenfolge) und Fakultäten (n!).`,
    howToUse: [
      'Geben Sie die Gesamtanzahl der Elemente (n) und die Auswahl (r) ein.',
      'Lesen Sie Kombinationen und Permutationen ab.'
    ],
    formula: 'nCr = n! / [r! × (n - r)!] | nPr = n! / (n - r)!',
    formulaVariables: [
      { name: 'Gesamtmenge (n)', description: 'Verfügbare Elemente.', unit: 'Ganzzahl', optional: false },
      { name: 'Auswahl (r)', description: 'Gewählte Teilmenge.', unit: 'Ganzzahl', optional: false }
    ],
    workedExample: {
      scenario: 'Auswahl von 3 Personen aus einer Gruppe von 8 (n = 8, r = 3).',
      stepByStep: [
        'Kombinationen (nCr) = 40.320 / (6 × 120) = 56.',
        'Permutationen (nPr) = 40.320 / 120 = 336.'
      ],
      result: 'Kombinationen = 56 | Permutationen = 336 | Fakultät (8!) = 40.320'
    },
    interpretation: 'Unverzichtbar für Stochastik, Wahrscheinlichkeitsrechnung und Kombinatorik.',
    assumptions: 'Unterscheidbare Elemente ohne Zurücklegen.',
    limitations: 'Werte n > 170 überschreiten Standard-Zahlengrenzen.',
    faqs: [
      { question: 'Was unterscheidet Kombination und Permutation?', answer: 'Bei Permutationen spielt die Reihenfolge eine Rolle, bei Kombinationen nicht.' }
    ],
    relatedTools
  })
});

// 7. MATRIX DETERMINANT (matrix-determinant)
export const MATRIX_DETERMINANT_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates the determinant, trace, and singularity status of 2×2, 3×3, and 4×4 square numerical matrices using Laplace cofactor expansion.`,
    howToUse: [
      'Select matrix dimension (2×2, 3×3, or 4×4).',
      'Enter numerical values into each matrix grid cell.',
      'Review the calculated determinant value, invertible matrix status (det ≠ 0), and step-by-step cofactor expansion.'
    ],
    formula: '2×2: det(A) = ad - bc | 3×3: det(A) = a(ei - fh) - b(di - fg) + c(dh - eg)',
    formulaVariables: [
      { name: 'Matrix Cells', description: 'Real numerical values of matrix elements.', unit: 'Real Numbers', optional: false }
    ],
    workedExample: {
      scenario: 'A 3×3 matrix with rows: [1, 2, 3], [0, 4, 5], [1, 0, 6].',
      stepByStep: [
        'Expand along Row 1: 1 × det([4, 5; 0, 6]) - 2 × det([0, 5; 1, 6]) + 3 × det([0, 4; 1, 0]).',
        'Cofactor 1: 1 × (24 - 0) = 24.',
        'Cofactor 2: -2 × (0 - 5) = +10.',
        'Cofactor 3: 3 × (0 - 4) = -12.',
        'Determinant = 24 + 10 - 12 = 22.'
      ],
      result: 'Determinant = 22 | Matrix Status = Invertible (Non-Singular, det ≠ 0)'
    },
    interpretation: 'Determinants characterize matrix scaling factor, orientation change, and determine whether a linear system of equations has a unique solution.',
    assumptions: 'Applies to square n×n matrices.',
    limitations: 'Singular matrices (det = 0) cannot be inverted and indicate linear dependency among rows/columns.',
    faqs: [
      { question: 'What does a determinant of zero mean?', answer: 'A determinant of zero means the matrix is singular and cannot be inverted, meaning the linear system does not have a single unique solution.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب محدد المصفوفة (Determinant)، والأثر (Trace)، وقابلية العكس لمصفوفات 2×2 و 3×3 و 4×4 باستخدام مفكوك لابلاس.`,
    howToUse: [
      'اختر حجم المصفوفة (2×2 أو 3×3 أو 4×4).',
      'أدخل الأرقام في خلايا المصفوفة.',
      'اطلع على قيمة المحدد وما إذا كانت المصفوفة قابلة للعكس (det ≠ 0) مع خطوات الحل.'
    ],
    formula: 'المحدد 2×2: ad - bc | المحدد 3×3: a(ei - fh) - b(di - fg) + c(dh - eg)',
    formulaVariables: [
      { name: 'عناصر المصفوفة', description: 'الأرقام الحقيقية في الصفوف والأعمدة.', unit: 'أعداد', optional: false }
    ],
    workedExample: {
      scenario: 'مصفوفة 3×3 بصفوف: [1, 2, 3] و [0, 4, 5] و [1, 0, 6].',
      stepByStep: [
        'المفكوك عبر الصف الأول = 1×(24-0) - 2×(0-5) + 3×(0-4).',
        'الناتج = 24 + 10 - 12 = 22.'
      ],
      result: 'المحدد = 22 | حالة المصفوفة = قابلة للعكس (غير شاذة)'
    },
    interpretation: 'يحدد قابلية حل المعادلات الخطية وحجم التحويل الهندسي للمصفوفة في الجبر الخطي.',
    assumptions: 'تطبق على المصفوفات المربعة فقط.',
    limitations: 'المصفوفة ذات المحدد الصفري تكون شاذة ولا يمكن إيجاد معكوس لها.',
    faqs: [
      { question: 'ماذا يعني إذا كان المحدد صفراً؟', answer: 'يعني أن المصفوفة شاذة (Singular) وغير قابلة للعكس وأن الصفوف غير مستقلة خطياً.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el determinante, traza e invertibilidad de matrices cuadradas 2×2, 3×3 y 4×4 mediante expansión por cofactores.`,
    howToUse: [
      'Seleccione la dimensión de la matriz e introduzca los coeficientes numéricos.',
      'Consulte el determinante y si la matriz es invertible (det ≠ 0).'
    ],
    formula: 'det(A) = ad - bc (2×2) | Expansión de Laplace (3×3 y 4×4)',
    formulaVariables: [
      { name: 'Elementos', description: 'Valores numéricos de la matriz.', unit: 'Reales', optional: false }
    ],
    workedExample: {
      scenario: 'Matriz 3×3: [1, 2, 3; 0, 4, 5; 1, 0, 6].',
      stepByStep: [
        'Expansión fila 1: 1×(24) - 2×(-5) + 3×(-4) = 24 + 10 - 12 = 22.'
      ],
      result: 'Determinante = 22 | Estado = Invertible (det ≠ 0)'
    },
    interpretation: 'Indica si un sistema de ecuaciones lineales tiene solución única.',
    assumptions: 'Matrices cuadradas n×n.',
    limitations: 'Matrices con det=0 no poseen matriz inversa.',
    faqs: [
      { question: '¿Para qué sirve el determinante?', answer: 'Para resolver sistemas por la Regla de Cramer y calcular transformaciones lineales y áreas.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule le déterminant, la trace et l'inversibilité de matrices carrées 2×2, 3×3 et 4×4 par développement selon les cofacteurs.`,
    howToUse: [
      'Sélectionnez la taille de la matrice et renseignez les valeurs.',
      'Consultez le déterminant et la régularité de la matrice.'
    ],
    formula: 'det(A) = ad - bc (2×2) | Formule de Laplace (3×3 et 4×4)',
    formulaVariables: [
      { name: 'Coefficients', description: 'Nombres réels de la matrice.', unit: 'Réels', optional: false }
    ],
    workedExample: {
      scenario: 'Matrice 3×3 : [1, 2, 3; 0, 4, 5; 1, 0, 6].',
      stepByStep: [
        'Développement ligne 1 = 1×(24) - 2×(-5) + 3×(-4) = 22.'
      ],
      result: 'Déterminant = 22 | Matrice Inversible (non singulière)'
    },
    interpretation: 'Mesure le facteur d’échelle géométrique d’une transformation linéaire en algèbre.',
    assumptions: 'Matrice carrée.',
    limitations: 'Un déterminant nul implique l’absence d’inverse.',
    faqs: [
      { question: 'Que signifie un déterminant non nul ?', answer: 'La matrice est inversible et le système linéaire associé admet une solution unique.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die Determinante, Spur und Invertierbarkeit von quadratischen 2×2, 3×3 und 4×4 Matrizen mit dem Laplaceschen Entwicklungssatz.`,
    howToUse: [
      'Wählen Sie das Format (2×2, 3×3, 4×4) und tragen Sie die Matrixelemente ein.',
      'Lesen Sie die Determinante und Invertierbarkeit ab.'
    ],
    formula: 'det(A) = ad - bc | Laplace-Entwicklung',
    formulaVariables: [
      { name: 'Matrixelemente', description: 'Reelle Zahlenwerte.', unit: 'Reell', optional: false }
    ],
    workedExample: {
      scenario: '3×3 Matrix: [1, 2, 3; 0, 4, 5; 1, 0, 6].',
      stepByStep: [
        'Entwicklung nach Zeile 1: 1×(24) - 2×(-5) + 3×(-4) = 22.'
      ],
      result: 'Determinante = 22 | Status = Invertierbar (det ≠ 0)'
    },
    interpretation: 'Grundlegende Kennzahl der linearen Algebra zur Lösbarkeit von Gleichungssystemen.',
    assumptions: 'Quadratische Matrizen.',
    limitations: 'Matrizen mit det = 0 sind singulär und nicht invertierbar.',
    faqs: [
      { question: 'Was bedeutet det = 0?', answer: 'Die Matrix ist singulär, Zeilenvektoren sind linear abhängig und es existiert keine inverse Matrix.' }
    ],
    relatedTools
  })
});

// 8. CIRCLE PROPERTIES (circle-properties)
export const CIRCLE_PROPERTIES_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} solves geometric circle properties including radius, diameter, circumference, area, sector area, and arc length from any single given input.`,
    howToUse: [
      'Enter any one known parameter: Radius (r), Diameter (d), Circumference (C), or Area (A).',
      'Optionally enter a central angle (θ) in degrees to calculate arc length and sector area.',
      'Review all computed circle metrics and exact π representations.'
    ],
    formula: 'Area = π × r² | Circumference = 2 × π × r | Arc Length = (θ / 360) × 2πr | Sector Area = (θ / 360) × πr²',
    formulaVariables: [
      { name: 'Radius (r)', description: 'Distance from circle center to boundary.', unit: 'Length', optional: true },
      { name: 'Central Angle (θ)', description: 'Angle of sector in degrees.', unit: 'Degrees', optional: true }
    ],
    workedExample: {
      scenario: 'A circle with a radius of 5.0 cm and a central sector angle of 60 degrees.',
      stepByStep: [
        'Diameter = 2 × 5.0 = 10.0 cm.',
        'Circumference = 2 × π × 5.0 = 10π ≈ 31.4159 cm.',
        'Total Area = π × (5.0)² = 25π ≈ 78.5398 cm².',
        'Arc Length (60°) = (60 / 360) × 31.4159 = (1/6) × 31.4159 = 5.236 cm.',
        'Sector Area (60°) = (60 / 360) × 78.5398 = (1/6) × 78.5398 = 13.090 cm².'
      ],
      result: 'Circumference = 31.42 cm | Area = 78.54 cm² | Arc Length = 5.24 cm | Sector Area = 13.09 cm²'
    },
    interpretation: 'Provides rapid 2D planar circular geometry calculations for engineering, machining, and mathematical problem-solving.',
    assumptions: 'Euclidean flat geometry with standard constant π ≈ 3.14159265359.',
    limitations: 'Central angles must be entered in degrees (0° to 360°).',
    faqs: [
      { question: 'How is radius calculated from area?', answer: 'Radius is the square root of the Area divided by Pi: r = √(Area / π).' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب كافة الخصائص الهندسية للدائرة: نصف القطر، القطر، المحيط، المساحة، طول القوس، ومساحة القطاع الدائري من أي مدخل معلوم.`,
    howToUse: [
      'أدخل أي قيمة معلومة: نصف القطر (r)، القطر (d)، المحيط (C)، أو المساحة (A).',
      'أدخل الزاوية المركزية بالدرجات لحساب طول القوس ومساحة القطاع الدائري.',
      'اطلع على كافة النتائج الهندسية الدقيقة بدلالة الثابت باي (π).'
    ],
    formula: 'المساحة = π × نق² | المحيط = 2 × π × نق | طول القوس = (الزاوية ÷ 360) × المحيط',
    formulaVariables: [
      { name: 'نصف القطر (نق)', description: 'المسافة من المركز إلى المحيط.', unit: 'وحدة طول', optional: true },
      { name: 'الزاوية المركزية (θ)', description: 'زاوية القطاع بالدرجات.', unit: 'درجة', optional: true }
    ],
    workedExample: {
      scenario: 'دائرة نصف قطرها 5 سم وزاوية القطاع 60 درجة.',
      stepByStep: [
        'القطر = 2 × 5 = 10 سم.',
        'المحيط = 2 × π × 5 = 31.42 سم.',
        'المساحة الكلية = π × 25 = 78.54 سم².',
        'طول القوس (60°) = (60 ÷ 360) × 31.42 = 5.24 سم.',
        'مساحة القطاع = (60 ÷ 360) × 78.54 = 13.09 سم².'
      ],
      result: 'المحيط = 31.42 سم | المساحة = 78.54 سم² | طول القوس = 5.24 سم | مساحة القطاع = 13.09 سم²'
    },
    interpretation: 'تفيد في الهندسة المدنية والميكانيكية وحسابات التصميم والتصنيع.',
    assumptions: 'الهندسة الإقليدية المستوية مع الثابت π = 3.14159.',
    limitations: 'الزوايا بين 0 و 360 درجة.',
    faqs: [
      { question: 'كيف نحسب نصف القطر من المساحة؟', answer: 'نصف القطر = الجذر التربيعي لـ (المساحة ÷ π).' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula radio, diámetro, perímetro, área total, longitud de arco y área del sector circular a partir de cualquier dato conocido.`,
    howToUse: [
      'Ingrese radio, diámetro, perímetro o área.',
      'Opcionalmente introduzca un ángulo central en grados.',
      'Consulte todas las dimensiones geométricas resultantes.'
    ],
    formula: 'Área = π × r² | Perímetro = 2πr | Arco = (θ / 360) × 2πr',
    formulaVariables: [
      { name: 'Radio (r)', description: 'Radio del círculo.', unit: 'Longitud', optional: true },
      { name: 'Ángulo (θ)', description: 'Ángulo en grados.', unit: 'Grados', optional: true }
    ],
    workedExample: {
      scenario: 'Círculo con radio de 5 cm y sector de 60 grados.',
      stepByStep: [
        'Perímetro = 2 × π × 5 = 31.42 cm.',
        'Área = π × 25 = 78.54 cm².',
        'Longitud de arco = 5.24 cm | Área del sector = 13.09 cm².'
      ],
      result: 'Perímetro = 31.42 cm | Área = 78.54 cm² | Arco = 5.24 cm'
    },
    interpretation: 'Herramienta de geometría euclidiana plana para diseño e ingeniería.',
    assumptions: 'Geometría circular plana estándar.',
    limitations: 'Ángulo central entre 0° y 360°.',
    faqs: [
      { question: '¿Cómo obtener el diámetro desde el perímetro?', answer: 'Dividiendo el perímetro entre Pi: d = C / π.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} détermine le rayon, diamètre, périmètre, aire, longueur d'arc et aire de secteur circulaire à partir d'une seule valeur connue.`,
    howToUse: [
      'Saisissez le rayon, diamètre, périmètre ou l’aire du cercle.',
      'Indiquez un angle au centre éventuel en degrés.',
      'Consultez toutes les métriques géométriques.'
    ],
    formula: 'Aire = π × r² | Circonférence = 2πr | Longueur d’arc = (θ / 360) × 2πr',
    formulaVariables: [
      { name: 'Rayon (r)', description: 'Rayon du cercle.', unit: 'Longueur', optional: true },
      { name: 'Angle (θ)', description: 'Angle au centre en degrés.', unit: 'Degrés', optional: true }
    ],
    workedExample: {
      scenario: 'Cercle de rayon 5 cm avec angle de 60°.',
      stepByStep: [
        'Circonférence = 31,42 cm.',
        'Aire = 78,54 cm².',
        'Longueur d’arc (60°) = 5,24 cm | Aire secteur = 13,09 cm².'
      ],
      result: 'Circonférence = 31,42 cm | Aire = 78,54 cm² | Arc = 5,24 cm'
    },
    interpretation: 'Calculs géométriques instantanés pour l’ingénierie et le dessin technique.',
    assumptions: 'Géométrie euclidienne dans le plan.',
    limitations: 'Angle compris entre 0 et 360 degrés.',
    faqs: [
      { question: 'Comment trouver le rayon à partir de l’aire ?', answer: 'r = √(Aire / π).' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet Radius, Durchmesser, Kreisumfang, Kreisfläche, Bogenlänge und Kreissektoren aus einer beliebigen Eingabegröße.`,
    howToUse: [
      'Geben Sie Radius, Durchmesser, Umfang oder Fläche ein.',
      'Fügen Sie optional einen Mittelpunktswinkel in Grad hinzu.',
      'Lesen Sie alle Kreiswerte ab.'
    ],
    formula: 'Fläche = π × r² | Umfang = 2πr | Bogenlänge = (θ / 360) × 2πr',
    formulaVariables: [
      { name: 'Radius (r)', description: 'Kreisradius.', unit: 'Länge', optional: true },
      { name: 'Winkel (θ)', description: 'Mittelpunktswinkel.', unit: 'Grad', optional: true }
    ],
    workedExample: {
      scenario: 'Kreis mit Radius 5 cm und Sektorwinkel 60 Grad.',
      stepByStep: [
        'Umfang = 2 × π × 5 = 31,42 cm.',
        'Fläche = π × 25 = 78,54 cm².',
        'Bogenlänge = 5,24 cm | Sektorfläche = 13,09 cm².'
      ],
      result: 'Umfang = 31,42 cm | Fläche = 78,54 cm² | Bogenlänge = 5,24 cm'
    },
    interpretation: 'Grundlegende Planimetrie für Konstruktion und Handwerk.',
    assumptions: 'Ebene euklidische Geometrie.',
    limitations: 'Winkel im Bereich 0° bis 360°.',
    faqs: [
      { question: 'Wie berechnet man den Durchmesser aus dem Umfang?', answer: 'Durchmesser = Umfang / π.' }
    ],
    relatedTools
  })
});

// 9. TRIANGLE SOLVER (triangle-solver)
export const TRIANGLE_SOLVER_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} solves all unknown sides, angles, perimeter, and area of any oblique or right triangle using Law of Sines, Law of Cosines, and Heron's formula (SSS, SAS, ASA, AAS, and SSA).`,
    howToUse: [
      'Select known parameters configuration (e.g., Side-Side-Side SSS, Side-Angle-Side SAS, or Angle-Side-Angle ASA).',
      'Enter the 3 known values (sides a, b, c and angles A, B, C in degrees).',
      'Review computed remaining sides, angles, triangle perimeter, and total area.'
    ],
    formula: 'Law of Cosines: c² = a² + b² - 2ab cos(C) | Heron’s Area: A = √[s(s - a)(s - b)(s - c)] where s = (a + b + c) / 2',
    formulaVariables: [
      { name: 'Sides (a, b, c)', description: 'Lengths of triangle edges.', unit: 'Length', optional: true },
      { name: 'Angles (A, B, C)', description: 'Interior vertex angles.', unit: 'Degrees', optional: true }
    ],
    workedExample: {
      scenario: 'A triangle with known sides a = 7.0, b = 8.0, and included angle C = 60 degrees (SAS).',
      stepByStep: [
        'Apply Law of Cosines: c² = 7² + 8² - 2(7)(8)cos(60°) = 49 + 64 - 112(0.5) = 113 - 56 = 57.',
        'Side c = √57 ≈ 7.550.',
        'Angle A = arccos[(8² + 7.55² - 7²) / (2 × 8 × 7.55)] ≈ 53.48°.',
        'Angle B = 180° - 60° - 53.48° = 66.52°.',
        'Area = 0.5 × a × b × sin(C) = 0.5 × 7 × 8 × sin(60°) = 28 × 0.8660 = 24.25 units².'
      ],
      result: 'Side c = 7.55 | Angle A = 53.48° | Angle B = 66.52° | Area = 24.25 sq units | Perimeter = 22.55'
    },
    interpretation: 'Solves arbitrary triangles for navigation, civil engineering, land surveying, and structural mechanics.',
    assumptions: 'Triangles satisfy triangle inequality (a + b > c) and sum of angles equals 180° in planar space.',
    limitations: 'The SSA (Side-Side-Angle) case may produce two valid solutions (ambiguous case) or no valid triangle.',
    faqs: [
      { question: 'What is Heron’s formula?', answer: 'Heron’s formula calculates the area of any triangle given only the lengths of all three sides without requiring height or angle calculations.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحل وحساب كافة أضلاع وزوايا ومحيط ومساحة المثلثات (قائمة أو مائلة) باستخدام قانون الجيب وقانون جيب التمام وصيغة هيرون.`,
    howToUse: [
      'اختر الحالة المعطاة (ثلاثة أضلاع SSS، ضلعان وزاوية محصورة SAS، زاويتان وضلع ASA).',
      'أدخل القيم الثلاث المعلومة (الأضلاع a, b, c والزوايا بالدرجات).',
      'اطلع على الأضلاع والزوايا المتبقية والمحيط والمساحة.'
    ],
    formula: 'قانون جيب التمام: c² = a² + b² - 2ab cos(C) | صيغة هيرون للمساحة: A = √[s(s-a)(s-b)(s-c)]',
    formulaVariables: [
      { name: 'الأضلاع (a, b, c)', description: 'أطوال أضلاع المثلث.', unit: 'وحدة طول', optional: true },
      { name: 'الزوايا (A, B, C)', description: 'الزوايا الداخلية بالدرجات.', unit: 'درجة', optional: true }
    ],
    workedExample: {
      scenario: 'مثلث فيه الضلع a = 7 و الضلع b = 8 والزاوية المحصورة C = 60 درجة (SAS).',
      stepByStep: [
        'حساب الضلع c: جيب التمام c² = 49 + 64 - 56 = 57، إذن c = 7.55.',
        'الزاوية A = 53.48° والزاوية B = 66.52°.',
        'المساحة = 0.5 × 7 × 8 × sin(60°) = 24.25 وحدة مربعة.'
      ],
      result: 'الضلع c = 7.55 | الزاوية A = 53.48° | الزاوية B = 66.52° | المساحة = 24.25'
    },
    interpretation: 'تفيد في أعمال المساحة والهندسة المعمارية والملاحة الفضائية والبحرية.',
    assumptions: 'مجموع زوايا المثلث 180 درجة ومتباينة المثلث محققة.',
    limitations: 'حالة ضلعين وزاوية غير محصورة (SSA) قد تنتج حلين مختلفين.',
    faqs: [
      { question: 'ما هي صيغة هيرون؟', answer: 'صيغة لحساب مساحة المثلث مباشرة بمعلومية أطوال أضلاعه الثلاثة دون الحاجة لمعرفة الارتفاع.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} resuelve todos los lados, ángulos, perímetro y área de triángulos oblicuángulos y rectángulos mediante el Teorema del Seno y Coseno y la fórmula de Herón.`,
    howToUse: [
      'Seleccione la combinación de datos conocidos (SSS, SAS, ASA, etc.).',
      'Ingrese 3 valores y consulte los lados y ángulos restantes junto al área.'
    ],
    formula: 'Ley del Coseno: c² = a² + b² - 2ab cos(C) | Fórmula de Herón',
    formulaVariables: [
      { name: 'Lados', description: 'Longitud de los lados a, b, c.', unit: 'Longitud', optional: true },
      { name: 'Ángulos', description: 'Ángulos A, B, C en grados.', unit: 'Grados', optional: true }
    ],
    workedExample: {
      scenario: 'Lados a = 7, b = 8 y ángulo C = 60° (SAS).',
      stepByStep: [
        'Lado c = √(49 + 64 - 56) = √57 = 7.55.',
        'Ángulo A = 53.48° | Ángulo B = 66.52°.',
        'Área = 24.25 unidades cuadradas.'
      ],
      result: 'Lado c = 7.55 | A = 53.48° | B = 66.52° | Área = 24.25'
    },
    interpretation: 'Imprescindible en topografía, navegación y cálculo de estructuras.',
    assumptions: 'Geometría euclidiana (suma de ángulos = 180°).',
    limitations: 'El caso Lado-Lado-Ángulo (SSA) puede tener doble solución ambigua.',
    faqs: [
      { question: '¿Qué es la fórmula de Herón?', answer: 'Calcula el área de cualquier triángulo a partir únicamente de la longitud de sus tres lados.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} résout tous les côtés, angles, périmètre et aire d'un triangle quelconque à l'aide des lois des sinus, des cosinus et de la formule de Héron.`,
    howToUse: [
      'Choisissez le cas géométrique (ex. SSS, SAS, ASA).',
      'Saisissez les 3 valeurs connues et consultez la résolution complète.'
    ],
    formula: 'Loi des Cosinus : c² = a² + b² - 2ab cos(C) | Formule de Héron',
    formulaVariables: [
      { name: 'Côtés', description: 'Longueurs a, b, c.', unit: 'Longueur', optional: true },
      { name: 'Angles', description: 'Angles en degrés.', unit: 'Degrés', optional: true }
    ],
    workedExample: {
      scenario: 'Triangle avec a = 7, b = 8 et angle C = 60°.',
      stepByStep: [
        'Côté c = √57 ≈ 7,55.',
        'Angle A = 53,48° | Angle B = 66,52°.',
        'Aire = 24,25 unités².'
      ],
      result: 'Côté c = 7,55 | Angle A = 53,48° | Angle B = 66,52° | Aire = 24,25'
    },
    interpretation: 'Résout tous les cas de trigonométrie pour la topographie et la navigation.',
    assumptions: 'Plan euclidien avec somme des angles égale à 180°.',
    limitations: 'Le cas côté-côté-angle non compris peut présenter deux solutions.',
    faqs: [
      { question: 'Comment s’applique la loi des sinus ?', answer: 'a / sin(A) = b / sin(B) = c / sin(C).' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet alle unbekannten Seiten, Winkel, Umfang und Fläche beliebiger Dreiecke mit Sinussatz, Kosinussatz und der Heronschen Formel.`,
    howToUse: [
      'Wählen Sie die bekannte Konfiguration (SSS, SWS, WSW).',
      'Geben Sie 3 bekannte Werte ein und lesen Sie Seiten, Winkel und Fläche ab.'
    ],
    formula: 'Kosinussatz: c² = a² + b² - 2ab cos(C) | Heronsche Formel',
    formulaVariables: [
      { name: 'Seiten', description: 'Seitenlängen a, b, c.', unit: 'Länge', optional: true },
      { name: 'Winkel', description: 'Innenwinkel in Grad.', unit: 'Grad', optional: true }
    ],
    workedExample: {
      scenario: 'Dreieck mit a = 7, b = 8 und eingeschlossenem Winkel C = 60°.',
      stepByStep: [
        'Seite c = √57 ≈ 7,55.',
        'Winkel A = 53,48° | Winkel B = 66,52°.',
        'Fläche = 24,25 FE.'
      ],
      result: 'Seite c = 7,55 | Winkel A = 53,48° | Winkel B = 66,52° | Fläche = 24,25'
    },
    interpretation: 'Unverzichtbar für Vermessungswesen, Maschinenbau und Geometrie.',
    assumptions: 'Ebene Dreiecksgeometrie mit 180° Winkelsumme.',
    limitations: 'Der SsW-Fall kann zwei mathematisch gültige Lösungen besitzen.',
    faqs: [
      { question: 'Was ist die Heronsche Formel?', answer: 'Sie berechnet die Dreiecksfläche allein aus den drei Seitenlängen ohne Höhenberechnung.' }
    ],
    relatedTools
  })
});

// 10. VECTOR MAGNITUDE & DIRECTION (vector-magnitude)
export const VECTOR_MAGNITUDE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates vector Euclidean magnitude (norm), unit vectors, direction angles, and dot products in 2D and 3D coordinate space.`,
    howToUse: [
      'Select vector dimension: 2D (x, y) or 3D (x, y, z).',
      'Enter component coordinates for Vector A (and optionally Vector B for dot product / angle).',
      'Review Euclidean magnitude ||v||, normalized unit vector, and polar/spherical direction angles.'
    ],
    formula: '2D Magnitude: ||v|| = √(x² + y²) | 3D Magnitude: ||v|| = √(x² + y² + z²)',
    formulaVariables: [
      { name: 'Component x', description: 'Horizontal coordinate value.', unit: 'Real Number', optional: false },
      { name: 'Component y', description: 'Vertical coordinate value.', unit: 'Real Number', optional: false },
      { name: 'Component z', description: 'Depth coordinate value for 3D vectors.', unit: 'Real Number', optional: true }
    ],
    workedExample: {
      scenario: 'A 3D spatial vector v = (3, -4, 12).',
      stepByStep: [
        'Sum of squares = (3)² + (-4)² + (12)² = 9 + 16 + 144 = 169.',
        'Magnitude ||v|| = √169 = 13.00.',
        'Unit Vector u = v / ||v|| = (3/13, -4/13, 12/13) ≈ (0.2308, -0.3077, 0.9231).'
      ],
      result: 'Vector Magnitude ||v|| = 13.00 | Unit Vector = (0.231, -0.308, 0.923)'
    },
    interpretation: 'Calculates physical vector quantities such as displacement, velocity, force vectors, and mechanical moments.',
    assumptions: 'Euclidean orthogonal Cartesian coordinate system.',
    limitations: 'Zero vectors (0, 0, 0) have a magnitude of zero and an undefined unit vector direction.',
    faqs: [
      { question: 'What is a unit vector?', answer: 'A vector of length exactly 1 that points in the exact same direction as the original vector, obtained by dividing components by magnitude.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب معيار المتجه الإقليدي (طول المتجه)، ومتجه الوحدة، وزوايا الاتجاه، والضرب النقطي في الفضاء ثنائي وثلاثي الأبعاد (2D و 3D).`,
    howToUse: [
      'اختر أبعاد المتجه (2D أو 3D).',
      'أدخل إحداثيات المتجه (x, y, z).',
      'اطلع على طول المتجه ومتجه الوحدة المقابل والزاوية القطبية.'
    ],
    formula: 'المعيار ثنائي الأبعاد: ||v|| = √(x² + y²) | المعيار ثلاثي الأبعاد: ||v|| = √(x² + y² + z²)',
    formulaVariables: [
      { name: 'المركبة x', description: 'الإحداثي السيني.', unit: 'عدد حقيقي', optional: false },
      { name: 'المركبة y', description: 'الإحداثي الصادي.', unit: 'عدد حقيقي', optional: false },
      { name: 'المركبة z', description: 'الإحداثي العيني للفضاء 3D.', unit: 'عدد حقيقي', optional: true }
    ],
    workedExample: {
      scenario: 'متجه ثلاثي الأبعاد v = (3, -4, 12).',
      stepByStep: [
        'مجموع المربعات = 9 + 16 + 144 = 169.',
        'طول المتجه = √169 = 13.00.',
        'متجه الوحدة = (3/13, -4/13, 12/13).'
      ],
      result: 'طول المتجه = 13.00 | متجه الوحدة = (0.231, -0.308, 0.923)'
    },
    interpretation: 'تفيد في حساب متجهات القوة والسرعة والتسارع والميكانيكا الكلاسيكية.',
    assumptions: 'نظام إحداثيات ديكارتي متعامد.',
    limitations: 'المتجه الصفري ليس له اتجاه معرف لمتجه الوحدة.',
    faqs: [
      { question: 'ما هو متجه الوحدة؟', answer: 'هو متجه طوله يساوي 1 تماماً ويشير إلى نفس اتجاه المتجه الأصلي.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la magnitud euclidiana (módulo), vector unitario y ángulos de dirección en espacios vectoriales 2D y 3D.`,
    howToUse: [
      'Seleccione 2D o 3D e introduzca las componentes (x, y, z).',
      'Consulte el módulo del vector y el vector normalizado.'
    ],
    formula: 'Módulo: ||v|| = √(x² + y² + z²)',
    formulaVariables: [
      { name: 'Componentes', description: 'Valores x, y, z.', unit: 'Reales', optional: false }
    ],
    workedExample: {
      scenario: 'Vector v = (3, -4, 12).',
      stepByStep: [
        'Suma de cuadrados = 9 + 16 + 144 = 169.',
        'Módulo = √169 = 13.00.',
        'Vector unitario = (3/13, -4/13, 12/13).'
      ],
      result: 'Magnitud = 13.00 | Vector Unitario = (0.231, -0.308, 0.923)'
    },
    interpretation: 'Aplica a cálculos de fuerzas, velocidades y dinámica en física e ingeniería.',
    assumptions: 'Sistema cartesiano ortogonal.',
    limitations: 'El vector nulo no define una dirección unitaria.',
    faqs: [
      { question: '¿Cómo normalizar un vector?', answer: 'Dividiendo cada una de sus componentes entre su módulo o magnitud total.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule la norme euclidienne (longueur), le vecteur unitaire et les angles directeurs d'un vecteur dans l'espace 2D et 3D.`,
    howToUse: [
      'Choisissez le mode 2D ou 3D et saisissez les coordonnées x, y, z.',
      'Consultez la norme et le vecteur unitaire.'
    ],
    formula: 'Norme : ||v|| = √(x² + y² + z²)',
    formulaVariables: [
      { name: 'Coordonnées', description: 'Valeurs scalaires x, y, z.', unit: 'Réels', optional: false }
    ],
    workedExample: {
      scenario: 'Vecteur 3D v = (3, -4, 12).',
      stepByStep: [
        'Somme des carrés = 9 + 16 + 144 = 169.',
        'Norme = √169 = 13,00.',
        'Vecteur unitaire = (3/13, -4/13, 12/13).'
      ],
      result: 'Norme ||v|| = 13,00 | Vecteur Unitaire = (0,231 ; -0,308 ; 0,923)'
    },
    interpretation: 'Indispensable en cinématique, mécanique des solides et modélisation 3D.',
    assumptions: 'Repère orthonormé direct.',
    limitations: 'Le vecteur nul possède une norme nulle et une direction indéterminée.',
    faqs: [
      { question: 'Qu’est-ce qu’un vecteur unitaire ?', answer: 'Un vecteur de norme égale à 1 ayant la même direction et le même sens que le vecteur de départ.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die euklidische Vektornorm (Betrag/Länge), Einheitsvektoren und Richtungswinkel im 2D- und 3D-Koordinatenraum.`,
    howToUse: [
      'Wählen Sie 2D oder 3D und geben Sie die Vektorkomponenten ein.',
      'Lesen Sie Vektorbetrag und normierten Einheitsvektor ab.'
    ],
    formula: 'Vektorbetrag: ||v|| = √(x² + y² + z²)',
    formulaVariables: [
      { name: 'Komponenten', description: 'Koordinaten x, y, z.', unit: 'Reell', optional: false }
    ],
    workedExample: {
      scenario: '3D-Vektor v = (3, -4, 12).',
      stepByStep: [
        'Summe der Quadrate = 9 + 16 + 144 = 169.',
        'Betrag = √169 = 13,00.',
        'Einheitsvektor = (3/13, -4/13, 12/13).'
      ],
      result: 'Vektorbetrag = 13,00 | Einheitsvektor = (0,231; -0,308; 0,923)'
    },
    interpretation: 'Grundoperation für Physik (Kräfte, Geschwindigkeiten) und 3D-Grafikprogrammierung.',
    assumptions: 'Kartesisches Koordinatensystem.',
    limitations: 'Der Nullvektor besitzt keine definierte Richtung.',
    faqs: [
      { question: 'Was ist ein Einheitsvektor?', answer: 'Ein Vektor mit der exakten Länge 1, der die reine Richtung eines Vektors angibt.' }
    ],
    relatedTools
  })
});

export const BATCH3_HEALTH2_HANDLERS: Record<string, Record<Language, KnowledgeHandler>> = {
  'lean-body-mass': LEAN_BODY_MASS_KNOWLEDGE,
  'body-frame-size': BODY_FRAME_SIZE_KNOWLEDGE,
  'glycemic-load': GLYCEMIC_LOAD_KNOWLEDGE,
  'sleep-debt': SLEEP_DEBT_KNOWLEDGE,
  'menstrual-cycle': MENSTRUAL_CYCLE_KNOWLEDGE,
  'combinatorics-ncr': COMBINATORICS_NCR_KNOWLEDGE,
  'matrix-determinant': MATRIX_DETERMINANT_KNOWLEDGE,
  'circle-properties': CIRCLE_PROPERTIES_KNOWLEDGE,
  'triangle-solver': TRIANGLE_SOLVER_KNOWLEDGE,
  'vector-magnitude': VECTOR_MAGNITUDE_KNOWLEDGE,
};
