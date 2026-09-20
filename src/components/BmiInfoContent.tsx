import React from 'react';
import { BookOpen, HelpCircle, Scale, AlertTriangle, CheckCircle2, Calculator } from 'lucide-react';
import { Language } from '../types';
import { useApp } from '../context/AppContext';

interface BmiInfoContentProps {
  toolName?: string;
}

interface BmiCategoryItem {
  name: string;
  range: string;
  color: string;
}

interface BmiFaqItem {
  q: string;
  a: string;
}

interface BmiContentData {
  title: string;
  subtitle: string;
  aboutTitle: string;
  aboutText: string;
  howToUseTitle: string;
  howToUseSteps: string[];
  formulaTitle: string;
  formulaMetric: string;
  formulaImperial: string;
  formulaNote: string;
  categoriesTitle: string;
  categoriesNote: string;
  categoriesHeaderCategory: string;
  categoriesHeaderRange: string;
  categories: BmiCategoryItem[];
  understandingTitle: string;
  understandingText: string;
  referenceWeightTitle: string;
  referenceWeightText: string;
  limitationsTitle: string;
  limitationsIntro: string;
  limitationsList: string[];
  faqTitle: string;
  faqs: BmiFaqItem[];
}

const BMI_CONTENT_MAP: Record<Language, BmiContentData> = {
  en: {
    title: 'About Body Mass Index (BMI)',
    subtitle: 'Essential guide to understanding your BMI calculation, categories, and limitations.',
    aboutTitle: 'About BMI',
    aboutText: 'Body Mass Index (BMI) is a screening metric that compares an individual\'s weight relative to their height. Widely utilized in public health and clinical settings, it provides an initial, non-invasive method to classify whether an adult falls into an underweight, normal, overweight, or obese weight category.',
    howToUseTitle: 'How to Use',
    howToUseSteps: [
      'Choose your preferred unit system using the Metric (cm, kg) or Imperial (ft, lbs) toggle at the top of the calculator.',
      'Enter your standing height and current body weight into the designated input fields.',
      'The calculator computes your BMI immediately as you type, updating your score, weight category, visual gauge indicator, and reference weight range.'
    ],
    formulaTitle: 'BMI Formula',
    formulaMetric: 'BMI = weight (kg) ÷ height² (m)',
    formulaImperial: 'BMI = 703 × weight (lb) ÷ height² (in)',
    formulaNote: 'In the metric system, height in centimeters is divided by 100 to convert to meters before squaring (height in m = height in cm ÷ 100). In the imperial system, height in feet and inches is converted to total inches, squared, and multiplied by the conversion factor 703.',
    categoriesTitle: 'BMI Categories',
    categoriesNote: 'These standard categories apply to adults aged 20 and older. They should not be applied to children or adolescents in the same way, as growing bodies require interpretation through age-and-sex-specific growth percentiles.',
    categoriesHeaderCategory: 'Category',
    categoriesHeaderRange: 'BMI Range (kg/m²)',
    categories: [
      { name: 'Underweight', range: 'Below 18.5', color: 'text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800' },
      { name: 'Normal weight', range: '18.5 – 24.9', color: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' },
      { name: 'Overweight', range: '25.0 – 29.9', color: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800' },
      { name: 'Obesity', range: '30.0 or higher', color: 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800' }
    ],
    understandingTitle: 'Understanding Your Result',
    understandingText: 'Your calculated BMI score is an initial screening measure, not a medical diagnosis. BMI does not directly measure body fat, nor does it distinguish between lean muscle mass, bone density, and adipose fat tissue. A score outside the normal weight range is an informative signal to discuss with a healthcare professional, rather than a definitive determination of your overall health.',
    referenceWeightTitle: 'Reference Weight Range',
    referenceWeightText: 'The reference weight range provided by the calculator is mathematically derived from the adult normal BMI boundaries (18.5 to 24.9 kg/m²) for your specific height. It serves as a general statistical reference, not a personalized medical recommendation or individual target weight.',
    limitationsTitle: 'Limitations of BMI',
    limitationsIntro: 'While convenient for population-level screening, BMI has recognized limitations and can be less informative for:',
    limitationsList: [
      'Muscular athletes and bodybuilders, whose dense muscle mass may result in an overweight or obese BMI despite very low body fat.',
      'Older adults, where age-related loss of muscle mass (sarcopenia) can mask higher body fat within a mathematically normal BMI.',
      'Pregnancy and breastfeeding, where weight changes reflect fetal growth, the placenta, amniotic fluid, and natural fluid expansion.',
      'Specific medical situations, including edema, fluid retention, and chronic wasting illnesses.'
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'What is a normal BMI?',
        a: 'For adults aged 20 and older, a normal BMI falls between 18.5 and 24.9 kg/m².'
      },
      {
        q: 'Is BMI accurate for everyone?',
        a: 'No. BMI is a screening metric that only evaluates total weight relative to height. It cannot assess body composition or differentiate between muscle, bone, and fat.'
      },
      {
        q: 'Does BMI measure body fat?',
        a: 'No. BMI does not measure body fat percentage or body fat distribution. It only reflects total weight proportionality.'
      },
      {
        q: 'Is BMI different for men and women?',
        a: 'The calculation and adult classification ranges (18.5–24.9) are identical for men and women, although women typically have a higher percentage of body fat than men at the same BMI score.'
      },
      {
        q: 'Can I use adult BMI for children?',
        a: 'No. For children and adolescents (ages 2 to 19), BMI must be interpreted using pediatric growth charts with age-and-sex-specific percentiles, not adult thresholds.'
      }
    ]
  },
  ar: {
    title: 'حول مؤشر كتلة الجسم (BMI)',
    subtitle: 'دليل شامل ومبسط لفهم نتيجة الحساب، والمعادلة، والتصنيفات، والمحددات الصحية.',
    aboutTitle: 'نبذة عن مؤشر كتلة الجسم',
    aboutText: 'مؤشر كتلة الجسم (BMI) هو مقياس رقمي استرشادي يُستخدم لمقارنة وزن الشخص بطوله. يُعد أداة فحص أولية سريعة وشائعة لتقييم ما إذا كان البالغ يقع ضمن فئة نقص الوزن، أو الوزن الطبيعي، أو زيادة الوزن، أو السمنة.',
    howToUseTitle: 'طريقة الاستخدام',
    howToUseSteps: [
      'اختر نظام القياس المفضل باستخدام زر التبديل بين النظام المتري (سم، كجم) أو الإمبراطوري (قدم، رطل).',
      'أدخل طولك ووزنك الحالي في الخانات المخصصة.',
      'يتم حساب المؤشر فوراً مع عرض القيمة الرقمية، والفئة الوزنية، وشريط المقياس البصري، ونطاق الوزن المرجعي المقترح.'
    ],
    formulaTitle: 'معادلة حساب مؤشر كتلة الجسم',
    formulaMetric: 'مؤشر كتلة الجسم = الوزن (كجم) ÷ [الطول (م)]²',
    formulaImperial: 'مؤشر كتلة الجسم = 703 × الوزن (رطل) ÷ [الطول (بوصة)]²',
    formulaNote: 'في النظام المتري، يتم تحويل الطول بالسنتيمتر إلى أمتار بالقسمة على 100 قبل تربيعه (الطول بالمتر = الطول بالسم ÷ 100). وفي النظام الإمبراطوري، يُحول الطول إلى إجمالي البوصات، ثم يُربّع ويُضرب في المعامل 703.',
    categoriesTitle: 'تصنيفات مؤشر كتلة الجسم',
    categoriesNote: 'هذه الفئات مخصصة للبالغين بعمر 20 عاماً فأكثر، ولا يجوز تطبيقها على الأطفال أو المراهقين بنفس الطريقة؛ حيث يُقيّم نمو الأطفال باستخدام مخططات النسب المئوية المخصصة للعمر والجنس.',
    categoriesHeaderCategory: 'التصنيف',
    categoriesHeaderRange: 'نطاق المؤشر (كجم/م²)',
    categories: [
      { name: 'نقص الوزن', range: 'أقل من 18.5', color: 'text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800' },
      { name: 'وزن طبيعي', range: '18.5 – 24.9', color: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' },
      { name: 'زيادة وزن', range: '25.0 – 29.9', color: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800' },
      { name: 'سمنة', range: '30.0 أو أكثر', color: 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800' }
    ],
    understandingTitle: 'فهم نتيجتك',
    understandingText: 'توضح النتيجة تصنيفاً استرشادياً لوزنك بالنسبة لطولك، لكنها لا تُعد تشخيصاً طبياً بأي حال. لا يقيس المؤشر نسبة الدهون بشكل مباشر، ولا يفرق بين الكتلة العضلية وكثافة العظام والدهون المتراكمة. تُعد النتيجة خارج النطاق الطبيعي مؤشراً أولياً لمناقشته مع الطبيب وليست حكماً نهائياً على صحتك.',
    referenceWeightTitle: 'نطاق الوزن المرجعي',
    referenceWeightText: 'يُشتق نطاق الوزن المرجعي المعروض في الحاسبة من الحدود القياسية للوزن الطبيعي لدى البالغين (18.5 إلى 24.9 كجم/م²) بالنسبة لطولك المحدد. وهو مؤشر إحصائي عام وليس هدفاً طبياً أو تدريبياً مخصصاً لك.',
    limitationsTitle: 'محددات مؤشر كتلة الجسم',
    limitationsIntro: 'على الرغم من فائدته كأداة مسح عامة، إلا أن مؤشر كتلة الجسم له محددات وقد يكون أقل دقة في الحالات التالية:',
    limitationsList: [
      'الرياضيون وأصحاب الكتلة العضلية العالية: حيث تزيد كثافة العضلات من الوزن الكلي، مما قد يظهرهم في فئة زيادة الوزن رغم انخفاض نسبة الدهون.',
      'كبار السن: قد يُخفي فقدان الكتلة العضلية الطبيعي مع التقدم في العمر ارتفاع نسبة الدهون بالرغم من ظهور قراءة طبيعية.',
      'الحمل والرضاعة: يشمل الوزن الزائد الجنين والمشيمة والسوائل الطبيعية المصاحبة للحمل.',
      'الحالات الطبية الخاصة: مثل احتباس السوائل أو بعض الأمراض المزمنة.'
    ],
    faqTitle: 'الأسئلة الشائعة',
    faqs: [
      {
        q: 'ما هو مؤشر كتلة الجسم الطبيعي؟',
        a: 'للبالغين، يقع المعدل الطبيعي بين 18.5 و 24.9 كجم/م².'
      },
      {
        q: 'هل مؤشر كتلة الجسم دقيق للجميع؟',
        a: 'كلا، هو أداة مسح عامة ولا يفرق بين كتلة العضلات والدهون، مما يجعله أقل دقة لدى الرياضيين وكبار السن.'
      },
      {
        q: 'هل يقيس مؤشر كتلة الجسم نسبة الدهون؟',
        a: 'كلا، يقيس التناسب الرياضي بين الوزن الكلي والطول فقط، ولا يقيس كمية الدهون أو توزيعها في الجسم.'
      },
      {
        q: 'هل يختلف مؤشر كتلة الجسم بين الرجال والنساء؟',
        a: 'المعادلة والحدود المرجعية (18.5–24.9) متطابقة للبالغين من الجنسين، مع العلم أن النساء يمتلكن عادة نسبة دهون أعلى من الرجال عند نفس قيمة المؤشر.'
      },
      {
        q: 'هل يمكن استخدام تصنيفات البالغين للأطفال؟',
        a: 'كلا، بالنسبة للأطفال واليافعين (من عمر 2 إلى 19 عاماً)، يُفسر المؤشر عبر مخططات النمو المئوية المخصصة للعمر والجنس.'
      }
    ]
  },
  es: {
    title: 'Acerca del Índice de Masa Corporal (IMC)',
    subtitle: 'Guía clara y concisa para comprender su cálculo de IMC, categorías y limitaciones.',
    aboutTitle: 'Acerca del IMC',
    aboutText: 'El Índice de Masa Corporal (IMC) es un indicador de detección ampliamente utilizado que evalúa la relación entre el peso y la estatura de una persona. Proporciona un método inicial y no invasivo para clasificar si un adulto se sitúa en bajo peso, peso normal, sobrepeso u obesidad.',
    howToUseTitle: 'Cómo usar la calculadora',
    howToUseSteps: [
      'Seleccione su sistema de medición con el selector Métrico (cm, kg) o Imperial (ft, lbs).',
      'Introduzca su estatura y su peso actual en los campos correspondientes.',
      'La calculadora calcula su IMC en tiempo real mientras escribe, mostrando su categoría, indicador visual y rango de peso saludable.'
    ],
    formulaTitle: 'Fórmula del IMC',
    formulaMetric: 'IMC = peso (kg) ÷ estatura² (m)',
    formulaImperial: 'IMC = 703 × peso (lb) ÷ estatura² (in)',
    formulaNote: 'En el sistema métrico, la estatura en centímetros se divide entre 100 para convertirla a metros antes de elevarla al cuadrado (m = cm ÷ 100). En el sistema imperial, la estatura se convierte a pulgadas totales, se eleva al cuadrado y se multiplica por el factor 703.',
    categoriesTitle: 'Categorías de IMC para adultos',
    categoriesNote: 'Estas categorías estándar corresponden a adultos a partir de 20 años. No deben aplicarse a niños ni adolescentes, cuyo crecimiento se evalúa mediante percentiles específicos por edad y sexo.',
    categoriesHeaderCategory: 'Categoría',
    categoriesHeaderRange: 'Rango de IMC (kg/m²)',
    categories: [
      { name: 'Bajo peso', range: 'Menor a 18.5', color: 'text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800' },
      { name: 'Peso normal', range: '18.5 – 24.9', color: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' },
      { name: 'Sobrepeso', range: '25.0 – 29.9', color: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800' },
      { name: 'Obesidad', range: '30.0 o superior', color: 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800' }
    ],
    understandingTitle: 'Cómo interpretar su resultado',
    understandingText: 'Su puntuación de IMC es una herramienta de cribado preliminar, no un diagnóstico médico. El IMC no mide directamente la grasa corporal ni distingue entre masa muscular magra, densidad ósea y tejido adiposo. Un resultado fuera del rango normal constituye un indicador orientativo para consultar con un profesional de la salud.',
    referenceWeightTitle: 'Rango de peso de referencia',
    referenceWeightText: 'El rango de peso saludable indicado se deriva matemáticamente de los límites de peso normal para adultos (18.5 a 24.9 kg/m²) según su estatura. Es una referencia estadística general y no un objetivo médico personalizado.',
    limitationsTitle: 'Limitaciones del IMC',
    limitationsIntro: 'Aunque es útil para evaluaciones poblacionales, el IMC presenta limitaciones reconocidas en:',
    limitationsList: [
      'Atletas y personas con alta masa muscular, donde el músculo denso puede elevar el IMC a sobrepeso u obesidad sin exceso de grasa.',
      'Adultos mayores, donde la pérdida de masa muscular (sarcopenia) puede enmascarar un porcentaje alto de grasa corporal en un IMC normal.',
      'Embarazo y lactancia, donde el peso incluye el feto, la placenta y la retención natural de líquidos.',
      'Condiciones médicas especiales, como edemas, retención de líquidos o ciertas enfermedades crónicas.'
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Cuál es un IMC normal?',
        a: 'Para adultos de 20 años o más, un IMC normal se sitúa entre 18.5 y 24.9 kg/m².'
      },
      {
        q: '¿Es el IMC exacto para todo el mundo?',
        a: 'No. El IMC es una herramienta estadística poblacional. No evalúa la composición corporal ni diferencia entre músculo, hueso y grasa.'
      },
      {
        q: '¿Mide el IMC la grasa corporal?',
        a: 'No. El IMC evalúa únicamente la relación entre peso y estatura, sin cuantificar directamente el porcentaje o distribución de grasa.'
      },
      {
        q: '¿Es diferente el IMC para hombres y mujeres?',
        a: 'La fórmula y los rangos estándar (18.5–24.9) son idénticos para hombres y mujeres adultos, aunque las mujeres suelen tener un mayor porcentaje de grasa corporal que los hombres con el mismo IMC.'
      },
      {
        q: '¿Se puede usar el IMC de adultos en niños?',
        a: 'No. En niños y adolescentes (de 2 a 19 años), el IMC debe interpretarse con tablas de percentiles de crecimiento por edad y sexo.'
      }
    ]
  },
  fr: {
    title: 'À propos de l\'Indice de Masse Corporelle (IMC)',
    subtitle: 'Guide essentiel pour comprendre votre calcul d\'IMC, ses catégories et ses limites.',
    aboutTitle: 'Qu\'est-ce que l\'IMC ?',
    aboutText: 'L\'indice de masse corporelle (IMC) est un indicateur de dépistage largement utilisé qui met en relation le poids et la taille d\'une personne. Il offre une méthode simple et non invasive pour évaluer si un adulte se situe dans une corpulence maigre, normale, en surpoids ou en obésité.',
    howToUseTitle: 'Comment utiliser le calculateur',
    howToUseSteps: [
      'Sélectionnez votre système d\'unités à l\'aide du bouton Métrique (cm, kg) ou Impérial (ft, lbs).',
      'Indiquez votre taille et votre poids actuel dans les champs prévus.',
      'Le calculateur calcule immédiatement votre IMC, votre catégorie de corpulence, votre jauge visuelle et votre fourchette de poids de référence.'
    ],
    formulaTitle: 'Formule de l\'IMC',
    formulaMetric: 'IMC = poids (kg) ÷ taille² (m)',
    formulaImperial: 'IMC = 703 × poids (lb) ÷ taille² (in)',
    formulaNote: 'Dans le système métrique, la taille en centimètres est divisée par 100 pour obtenir des mètres avant d\'être élevée au carré (taille en m = taille en cm ÷ 100). Dans le système impérial, la taille en pouces est élevée au carré puis multipliée par 703.',
    categoriesTitle: 'Catégories d\'IMC chez l\'adulte',
    categoriesNote: 'Ces catégories standards s\'appliquent aux adultes à partir de 20 ans. Elles ne doivent pas être appliquées aux enfants ou adolescents, dont la corpulence s\'évalue par des courbes de percentiles selon l\'âge et le sexe.',
    categoriesHeaderCategory: 'Catégorie',
    categoriesHeaderRange: 'Plage d\'IMC (kg/m²)',
    categories: [
      { name: 'Insuffisance pondérale', range: 'Moins de 18.5', color: 'text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800' },
      { name: 'Corpulence normale', range: '18.5 – 24.9', color: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' },
      { name: 'Surpoids', range: '25.0 – 29.9', color: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800' },
      { name: 'Obésité', range: '30.0 ou plus', color: 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800' }
    ],
    understandingTitle: 'Comprendre votre résultat',
    understandingText: 'Votre résultat d\'IMC constitue un repère de dépistage et non un diagnostic médical. L\'IMC ne mesure pas directement la masse grasse et ne distingue pas le muscle de la graisse ou de la densité osseuse. Un résultat en dehors de la plage normale est une information utile à aborder avec un professionnel de santé.',
    referenceWeightTitle: 'Fourchette de poids de référence',
    referenceWeightText: 'La fourchette de poids sain indiquée est dérivée mathématiquement des seuils normaux de l\'IMC adulte (18.5 à 24.9 kg/m²) pour votre taille. Il s\'agit d\'un repère statistique général et non d\'un objectif médical personnalisé.',
    limitationsTitle: 'Limites de l\'IMC',
    limitationsIntro: 'Bien qu\'utile pour le suivi en population générale, l\'IMC présente des limites reconnues pour :',
    limitationsList: [
      'Les athlètes et personnes très musclées, dont la masse musculaire dense peut fausser le résultat vers le surpoids sans excès de graisse.',
      'Les personnes âgées, chez qui la perte musculaire liée à l\'âge (sarcopénie) peut masquer un taux de graisse élevé malgré un IMC normal.',
      'La grossesse et l\'allaitement, où la prise de poids intègre le fœtus, le placenta et les réserves liquidiennes.',
      'Certaines situations médicales spécifiques, comme les œdèmes et la rétention d\'eau.'
    ],
    faqTitle: 'Foire aux questions',
    faqs: [
      {
        q: 'Quel est l\'IMC normal ?',
        a: 'Chez l\'adulte de 20 ans et plus, un IMC normal se situe entre 18.5 et 24.9 kg/m².'
      },
      {
        q: 'L\'IMC est-il fiable pour tout le monde ?',
        a: 'Non. L\'IMC est un outil statistique de dépistage. Il ne mesure pas la composition corporelle et ne distingue pas le muscle de la graisse.'
      },
      {
        q: 'L\'IMC mesure-t-il la graisse corporelle ?',
        a: 'Non. L\'IMC évalue uniquement le rapport entre le poids et la taille, sans quantifier directement le pourcentage de masse grasse.'
      },
      {
        q: 'L\'IMC est-il différent pour les hommes et les femmes ?',
        a: 'La formule et les seuils de référence (18.5–24.9) sont identiques pour les deux sexes chez l\'adulte, même si les femmes présentent naturellement un taux de graisse plus élevé à IMC égal.'
      },
      {
        q: 'Peut-on utiliser l\'IMC adulte pour un enfant ?',
        a: 'Non. Chez l\'enfant et l\'adolescent (de 2 à 19 ans), l\'IMC s\'interprète obligatoirement sur des courbes de percentiles adaptées à l\'âge et au sexe.'
      }
    ]
  },
  de: {
    title: 'Über den Body-Mass-Index (BMI)',
    subtitle: 'Kompakter Leitfaden zur Berechnung, Gewichtskategorien und Aussagekraft des BMI.',
    aboutTitle: 'Was ist der BMI?',
    aboutText: 'Der Body-Mass-Index (BMI) ist ein weltweit gebräuchlicher Richtwert, der das Körpergewicht zur Körpergröße ins Verhältnis setzt. Er dient als unkomplizierte, orientierende Methode, um bei Erwachsenen zwischen Untergewicht, Normalgewicht, Übergewicht und Adipositas zu differenzieren.',
    howToUseTitle: 'Bedienung des Rechners',
    howToUseSteps: [
      'Wählen Sie Ihr Einheitensystem über die Schaltfläche Metrisch (cm, kg) oder Imperial (ft, lbs).',
      'Geben Sie Ihre Körpergröße und Ihr aktuelles Körpergewicht in die Felder ein.',
      'Der Rechner ermittelt Ihren BMI-Wert sofort bei der Eingabe und zeigt Ihre Gewichtskategorie, die Skala und den Referenz-Gewichtsbereich an.'
    ],
    formulaTitle: 'BMI-Formel',
    formulaMetric: 'BMI = Gewicht (kg) ÷ Körpergröße² (m)',
    formulaImperial: 'BMI = 703 × Gewicht (lb) ÷ Körpergröße² (in)',
    formulaNote: 'Im metrischen System wird die Körpergröße in Zentimetern zunächst durch 100 geteilt, um Meter zu erhalten, bevor sie quadriert wird (m = cm ÷ 100). Im imperialen System wird die Größe in Zoll quadriert und mit dem Faktor 703 multipliziert.',
    categoriesTitle: 'BMI-Kategorien für Erwachsene',
    categoriesNote: 'Diese Standardwerte gelten für Erwachsene ab 20 Jahren. Sie sind nicht direkt auf Kinder oder Jugendliche übertragbar, da deren Entwicklung anhand alters- und geschlechtsspezifischer Perzentilkurven bewertet wird.',
    categoriesHeaderCategory: 'Kategorie',
    categoriesHeaderRange: 'BMI-Bereich (kg/m²)',
    categories: [
      { name: 'Untergewicht', range: 'Unter 18.5', color: 'text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800' },
      { name: 'Normalgewicht', range: '18.5 – 24.9', color: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' },
      { name: 'Übergewicht', range: '25.0 – 29.9', color: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800' },
      { name: 'Adipositas', range: '30.0 oder höher', color: 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800' }
    ],
    understandingTitle: 'Ergebnis verstehen',
    understandingText: 'Der errechnete BMI ist ein orientierender Richtwert und keine medizinische Diagnose. Der Index misst weder den Körperfettanteil direkt, noch unterscheidet er zwischen Muskelmasse, Knochendichte und Fettgewebe. Ein Wert außerhalb des Normalbereichs ist ein Anlass für ein ärztliches Gespräch, keine endgültige Krankheitsfeststellung.',
    referenceWeightTitle: 'Referenz-Gewichtsbereich',
    referenceWeightText: 'Der im Rechner angezeigte Normalgewichtsbereich basiert auf den Standard-BMI-Grenzen für Erwachsene (18.5 bis 24.9 kg/m²) für Ihre Körpergröße. Er dient als mathematischer Richtwert und nicht als individuelles Therapieziel.',
    limitationsTitle: 'Grenzen des BMI',
    limitationsIntro: 'Trotz seines Nutzens als schnelles Screening-Instrument hat der BMI bekannte Einschränkungen bei:',
    limitationsList: [
      'Sportlern und muskulösen Personen, deren dichte Muskelmasse zu einem Übergewichts-BMI führen kann, obwohl der Körperfettanteil gering ist.',
      'Älteren Menschen, bei denen ein altersbedingter Muskelabbau (Sarkopenie) einen erhöhten Fettanteil trotz normalen BMIs überdecken kann.',
      'Schwangerschaft und Stillzeit, da das Gewicht Fötus, Plazenta und Flüssigkeitsreserven einschließt.',
      'Bestimmten medizinischen Situationen wie Ödemen, Wassereinlagerungen oder chronischen Erkrankungen.'
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      {
        q: 'Was ist ein normaler BMI?',
        a: 'Für Erwachsene ab 20 Jahren gilt ein BMI zwischen 18.5 und 24.9 kg/m² als Normalgewicht.'
      },
      {
        q: 'Ist der BMI für jeden Menschen aussagekräftig?',
        a: 'Nein. Der BMI ist ein statistisches Instrument für Bevölkerungsgruppen. Er erfasst weder die Körperzusammensetzung noch das Verhältnis von Muskeln zu Fett.'
      },
      {
        q: 'Misst der BMI das Körperfett?',
        a: 'Nein. Der BMI setzt lediglich Gewicht und Größe ins Verhältnis und misst weder Körperfettanteil noch Fettverteilung.'
      },
      {
        q: 'Gilt für Männer und Frauen derselbe BMI?',
        a: 'Die Formel und die Einstufungen (18.5–24.9) sind für erwachsene Männer und Frauen gleich, auch wenn Frauen bei gleichem BMI biologisch einen höheren Fettanteil aufweisen.'
      },
      {
        q: 'Kann der Erwachsenen-BMI für Kinder verwendet werden?',
        a: 'Nein. Bei Kindern und Jugendlichen (2 bis 19 Jahre) muss der BMI stets anhand von Perzentilkurven nach Alter und Geschlecht beurteilt werden.'
      }
    ]
  }
};

export const BmiInfoContent: React.FC<BmiInfoContentProps> = () => {
  const { lang } = useApp();
  const content = BMI_CONTENT_MAP[lang] || BMI_CONTENT_MAP.en;

  return (
    <article className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-8 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-emerald-600 dark:text-emerald-400">
          <Scale className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {content.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {content.subtitle}
          </p>
        </div>
      </div>

      {/* 1. About BMI */}
      <section className="space-y-2">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-500" />
          {content.aboutTitle}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {content.aboutText}
        </p>
      </section>

      {/* 2. How to Use */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calculator className="w-4 h-4 text-emerald-500" />
          {content.howToUseTitle}
        </h3>
        <ol className="space-y-2">
          {content.howToUseSteps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* 3. BMI Formula */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          {content.formulaTitle}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800/60 font-mono text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider block text-emerald-700 dark:text-emerald-400 mb-1">
              Metric
            </span>
            <code>{content.formulaMetric}</code>
          </div>
          <div className="p-3.5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800/60 font-mono text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider block text-emerald-700 dark:text-emerald-400 mb-1">
              Imperial
            </span>
            <code>{content.formulaImperial}</code>
          </div>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          {content.formulaNote}
        </p>
      </section>

      {/* 4. BMI Categories */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Scale className="w-4 h-4 text-emerald-500" />
          {content.categoriesTitle}
        </h3>
        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-xs sm:text-sm text-left rtl:text-right">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-2.5">{content.categoriesHeaderCategory}</th>
                <th className="px-4 py-2.5">{content.categoriesHeaderRange}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
              {content.categories.map((cat, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-2.5 font-medium text-slate-900 dark:text-white">
                    <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-semibold border ${cat.color}`}>
                      {cat.name}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 font-mono text-slate-600 dark:text-slate-300">
                    {cat.range}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          {content.categoriesNote}
        </p>
      </section>

      {/* 5. Understanding Your Result */}
      <section className="space-y-2">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          {content.understandingTitle}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60">
          {content.understandingText}
        </p>
      </section>

      {/* 6. Reference Weight Range */}
      <section className="space-y-2">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Scale className="w-4 h-4 text-emerald-500" />
          {content.referenceWeightTitle}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {content.referenceWeightText}
        </p>
      </section>

      {/* 7. Limitations */}
      <section className="p-4 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 rounded-xl space-y-2 text-xs sm:text-sm text-amber-900 dark:text-amber-300">
        <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>{content.limitationsTitle}</span>
        </div>
        <p className="text-xs text-amber-800 dark:text-amber-300/90 leading-relaxed">
          {content.limitationsIntro}
        </p>
        <ul className="text-xs text-amber-800 dark:text-amber-300/90 space-y-1.5 list-disc ps-5 leading-relaxed">
          {content.limitationsList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* 8. FAQ */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {content.faqTitle}
          </h3>
        </div>
        <div className="space-y-3">
          {content.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5"
            >
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {faq.q}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};
