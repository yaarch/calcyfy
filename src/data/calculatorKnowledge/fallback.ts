import { ToolDef, Language } from '../../types';
import { ToolContentDetails, ToolInputExplanation, ToolFaq } from './types';

// Multilingual labels for generic fallback engine
interface FallbackI18n {
  whoUsesIt: string;
  whatItCalculatesPrefix: string;
  whatItCalculatesSuffix: string;
  formulaLabel: string;
  unitsAndConversions: string;
  understandingResults: string;
  assumptions: string;
  limitations: string;
  exampleScenarioPrefix: string;
  step1: string;
  step2: string;
  step3: string;
  exampleResult: string;
  faq1Q: string;
  faq1A: string;
  faq2Q: string;
  faq2A: string;
  faq3Q: string;
  faq3A: string;
  primaryInputName: string;
  primaryInputDesc: string;
  secondaryInputName: string;
  secondaryInputDesc: string;
}

const FALLBACK_I18N: Record<Language, FallbackI18n> = {
  en: {
    whoUsesIt: 'Students, professionals, analysts, and individuals seeking accurate, transparent mathematical evaluations for everyday decisions.',
    whatItCalculatesPrefix: 'Computes verified quantitative results for',
    whatItCalculatesSuffix: 'including instant metric evaluations, breakdown steps, and contextual comparisons.',
    formulaLabel: 'Calculations adhere to established mathematical definitions and standard physical and financial relationships.',
    unitsAndConversions: 'Supports standard metric and customary measurement units with precise mathematical ratios.',
    understandingResults: 'The primary calculation output reflects standard numerical values derived from your specific inputs. Changing input values updates all dependent results and breakdown metrics immediately.',
    assumptions: 'Assumes standard baseline conditions, positive real numbers where required by domain logic, and direct arithmetic relationships.',
    limitations: 'Calculations are mathematical approximations designed for educational, informational, and general planning purposes. For safety-critical, legal, medical, or contractual matters, verify with qualified domain professionals.',
    exampleScenarioPrefix: 'Typical calculation scenario for',
    step1: 'Enter your verified numerical inputs into the designated calculator fields above.',
    step2: 'The calculation engine applies the established mathematical model instantaneously in your browser.',
    step3: 'Review the primary highlighted output and examine the detailed breakdown values.',
    exampleResult: 'Instant quantitative result displayed in the primary result indicator above.',
    faq1Q: 'How accurate are the results provided by this calculator?',
    faq1A: 'Calculations use double-precision floating-point arithmetic following standard formulas. All results update in real time directly within your web browser.',
    faq2Q: 'Is my data stored or sent to an external server?',
    faq2A: 'No. All calculations run strictly on your device using client-side execution. Your inputs and outputs remain completely private and are never sent to remote databases.',
    faq3Q: 'Can I copy, save, or share my calculation results?',
    faq3A: 'Yes. You can copy results to your clipboard, use the Print tool for formatted paper or PDF records, or share a pre-filled link with others.',
    primaryInputName: 'Primary Parameter',
    primaryInputDesc: 'The primary numeric value or quantity required for this calculation.',
    secondaryInputName: 'Secondary Variable / Modifier',
    secondaryInputDesc: 'Additional setting, modifier, or comparison rate affecting the calculation outcome.',
  },
  ar: {
    whoUsesIt: 'الطلاب والمهنيون والباحثون والأفراد الراغبون في حسابات دقيقة وموثوقة لاتخاذ قرارات مدروسة.',
    whatItCalculatesPrefix: 'يقدم نتائج حسابية دقيقة ومحققة لـ',
    whatItCalculatesSuffix: 'مع توضيح خطوات الحل والمؤشرات المرتبطة بدقة عالية.',
    formulaLabel: 'تعتمد الحسابات على القواعد الرياضية والعلمية المعتمدة والمعايير القياسية.',
    unitsAndConversions: 'يدعم الوحدات الدولية القياسية والنظام المتري مع نسب تحويل دقيقة.',
    understandingResults: 'توضح النتيجة المحسوبة القيمة الرقمية المباشرة بناءً على مدخلاتك. يتم تحديث كافة النتائج والمؤشرات الفرعية لحظياً بمجرد تعديل أي مدخل.',
    assumptions: 'يفترض صحة ودقة الأرقام المدخلة وتوافقها مع الشروط الرياضية.',
    limitations: 'النتائج هي تقديرات رياضية دقيقة مخصصة لأغراض التخطيط والتعليم. في القرارات الطبية أو الهندسية أو المالية الملزمة، يُنصح بمراجعة المختصين.',
    exampleScenarioPrefix: 'مثال حسابي توضيحي لـ',
    step1: 'أدخل القيم والأرقام المطلوبة في حقول الآلة الحاسبة المخصصة أعلاه.',
    step2: 'يعالج المحرك الرياضي المعادلة بشكل فوري ومباشر في متصفحك.',
    step3: 'اطّلع على النتيجة الإجمالية الرئيسية واستعرض تفاصيل الحسابات.',
    exampleResult: 'نتيجة فورية دقيقة تظهر مباشرة في بطاقة النتائج بالأعلى.',
    faq1Q: 'ما مدى دقة الحسابات في هذه الأداة؟',
    faq1A: 'تعتمد الأداة على محرك حسابي عالي الدقة يطبق المعادلات الرياضية المعتمدة وتحدث النتائج فورياً دون أي تأخير.',
    faq2Q: 'هل يتم حفظ أو إرسال أرقامي وبياناتي إلى خوادم خارجية؟',
    faq2A: 'لا على الإطلاق. تعمل جميع أدوات الموقع بالكامل على جهازك عبر المتصفح دون إرسال أو تخزين أي بيانات في خوادم سحابية.',
    faq3Q: 'هل يمكنني حفظ أو مشاركة نتيجة الحساب؟',
    faq3A: 'نعم، يمكنك نسخ النتيجة بضغطة زر، أو طباعتها كملف PDF، أو مشاركة الرابط مع الاحتفاظ بالقيم المدخلة.',
    primaryInputName: 'المتغير الرئيسي',
    primaryInputDesc: 'القيمة الرقمية الأساسية المطلوبة لإتمام هذه العملية الحسابية.',
    secondaryInputName: 'المتغير الإضافي',
    secondaryInputDesc: 'عامل تعديل أو نسبة مرجعية إضافية تؤثر على النتيجة النهائية.',
  },
  es: {
    whoUsesIt: 'Estudiantes, profesionales y usuarios particulares que buscan cálculos fiables y transparentes para la toma de decisiones cotidianas.',
    whatItCalculatesPrefix: 'Calcula resultados numéricos exactos para',
    whatItCalculatesSuffix: 'proporcionando desglose paso a paso y valores contextuales.',
    formulaLabel: 'Los cálculos se basan en principios matemáticos y científicos estandarizados.',
    unitsAndConversions: 'Compatible con sistemas métrico e imperial con factores de conversión exactos.',
    understandingResults: 'El resultado principal refleja el valor numérico derivado de los datos introducidos. Al modificar cualquier campo, todos los cálculos dependientes se actualizan en tiempo real.',
    assumptions: 'Se presupone la introducción de valores reales válidos y condiciones operativas normales.',
    limitations: 'Los resultados son aproximaciones matemáticas útiles para orientación y estudio. Para decisiones legales, médicas o financieras vinculantes, consulte a un profesional acreditado.',
    exampleScenarioPrefix: 'Ejemplo de cálculo práctico para',
    step1: 'Introduzca los valores numéricos en los campos correspondientes de la calculadora.',
    step2: 'El motor de cálculo aplica la formulación matemática de forma instantánea en su navegador.',
    step3: 'Examine el resultado destacado y la información complementaria de desglose.',
    exampleResult: 'Resultado numérico instantáneo mostrado en el panel superior.',
    faq1Q: '¿Qué precisión tienen los resultados de esta calculadora?',
    faq1A: 'El sistema emplea aritmética de punto flotante de doble precisión según estándares matemáticos rigurosos.',
    faq2Q: '¿Se guardan o transmiten mis datos a servidores externos?',
    faq2A: 'No. El cálculo se procesa al 100% de forma local en su navegador garantizando total privacidad.',
    faq3Q: '¿Puedo copiar o compartir mis resultados?',
    faq3A: 'Sí, dispone de funciones para copiar al portapapeles, imprimir en PDF o compartir un enlace con los datos precargados.',
    primaryInputName: 'Parámetro principal',
    primaryInputDesc: 'Magnitud o cantidad numérica primordial para efectuar el cálculo.',
    secondaryInputName: 'Variable secundaria',
    secondaryInputDesc: 'Factor o tasa de ajuste complementaria que influye en el cálculo.',
  },
  fr: {
    whoUsesIt: 'Étudiants, professionnels et particuliers recherchant des calculs rapides, clairs et fiables pour leurs projets et décisions du quotidien.',
    whatItCalculatesPrefix: 'Détermine avec précision les résultats chiffrés pour',
    whatItCalculatesSuffix: 'avec décomposition détaillée des valeurs et repères d’analyse.',
    formulaLabel: 'Calculs conformes aux règles et définitions mathématiques et scientifiques établies.',
    unitsAndConversions: 'Prise en charge des unités métriques et internationales avec coefficients de conversion exacts.',
    understandingResults: 'Le résultat principal synthétise la valeur calculée d’après vos données. Toute modification des paramètres réactualise instantanément l’ensemble des indicateurs.',
    assumptions: 'Hypothèse de valeurs réelles positives et de conditions opérationnelles courantes.',
    limitations: 'Ces résultats constituent une aide à la décision et un outil pédagogique. Pour des enjeux médicaux, juridiques ou d’ingénierie certifiée, référez-vous aux normes en vigueur.',
    exampleScenarioPrefix: 'Exemple concret d’utilisation pour',
    step1: 'Renseignez vos données chiffrées dans les champs prévus à cet effet ci-dessus.',
    step2: 'Le moteur mathématique traite la formule en temps réel directement dans votre navigateur.',
    step3: 'Consultez la réponse principale mise en évidence ainsi que les détails d’analyse.',
    exampleResult: 'Résultat immédiat affiché dans l’encart de résultat en haut de page.',
    faq1Q: 'Quelle est la précision des calculs fournis ?',
    faq1A: 'L’outil applique les formules mathématiques exactes avec précision en virgule flottante pour un affichage immédiat.',
    faq2Q: 'Mes données sont-elles conservées sur un serveur ?',
    faq2A: 'Non. Tous les calculs s’effectuent exclusivement en local dans votre navigateur. Aucune donnée n’est transmise sur un serveur distant.',
    faq3Q: 'Puis-je imprimer ou partager mon calcul ?',
    faq3A: 'Oui, vous pouvez copier le résultat, imprimer une synthèse ou générer un lien partageable conservant vos données saisies.',
    primaryInputName: 'Paramètre principal',
    primaryInputDesc: 'Valeur numérique de référence indispensable au calcul.',
    secondaryInputName: 'Variable secondaire',
    secondaryInputDesc: 'Coefficient d’ajustement ou variable complémentaire.',
  },
  de: {
    whoUsesIt: 'Schüler, Studenten, Fachleute und Verbraucher zur schnellen und verlässlichen Orientierung bei alltäglichen mathematischen Fragestellungen.',
    whatItCalculatesPrefix: 'Berechnet zuverlässige quantitative Ergebnisse für',
    whatItCalculatesSuffix: 'inklusive transparenter Einzelschritte und aussagekräftiger Kennzahlen.',
    formulaLabel: 'Die Berechnungen beruhen auf anerkannten mathematischen Standards und wissenschaftlichen Modellen.',
    unitsAndConversions: 'Unterstützt gängige metrische Einheiten mit normierten Umrechnungsfaktoren.',
    understandingResults: 'Das Hauptergebnis zeigt die auf Basis Ihrer Eingaben ermittelte Kennzahl. Änderungen an den Parametern wirken sich in Echtzeit auf alle Folgewerte aus.',
    assumptions: 'Unterstellt standardmäßige mathematische Gültigkeitsbereiche und realistische Ausgangsdaten.',
    limitations: 'Die Berechnung dient als rechnerisches Orientierungsmodell für Ausbildung und Planung. Verbindliche rechtliche, medizinische oder finanzielle Auskünfte erfordern qualifizierte Fachberatung.',
    exampleScenarioPrefix: 'Typisches Rechenbeispiel für',
    step1: 'Geben Sie die bekannten Ausgangswerte in die dafür vorgesehenen Eingabefelder ein.',
    step2: 'Das mathematische Rechenmodell verarbeitet die Formel unverzüglich in Ihrem Browser.',
    step3: 'Lesen Sie das hervorgehobene Gesamtergebnis und die aufgeschlüsselten Werte ab.',
    exampleResult: 'Unmittelbares Rechenergebnis in der Ergebnisanzeige oberhalb.',
    faq1Q: 'Wie exakt arbeitet dieser Online-Rechner?',
    faq1A: 'Das System rechnet mit doppelter Gleitkommapräzision nach anerkannten mathematischen Algorithmen ohne Verzögerung.',
    faq2Q: 'Werden persönliche Daten auf externen Servern gespeichert?',
    faq2A: 'Nein. Sämtliche Rechenoperationen laufen zu 100 % lokal in Ihrem Browser ab. Ihre Eingaben werden niemals an fremde Server übermittelt.',
    faq3Q: 'Können die Ergebnisse kopiert oder ausgedruckt werden?',
    faq3A: 'Ja. Nutzen Sie die Funktionen zum Kopieren, die Druckansicht für saubere PDF-Exporte oder die Teilen-Funktion für voreingestellte Links.',
    primaryInputName: 'Hauptparameter',
    primaryInputDesc: 'Primärer numerischer Ausgangswert für den Rechenvorgang.',
    secondaryInputName: 'Sekundärvariable',
    secondaryInputDesc: 'Ergänzende Variable oder Anpassungsfaktor zur Feinabstimmung.',
  },
};

export function getStructuredFallbackDetails(
  tool: ToolDef,
  name: string,
  lang: Language,
  relatedTools: ToolDef[]
): ToolContentDetails {
  const i18n = FALLBACK_I18N[lang] || FALLBACK_I18N.en;

  const categoryContext: Record<string, Record<Language, { desc: string; domain: string }>> = {
    finance: {
      en: { desc: 'financial calculations, lending comparisons, and investment estimates', domain: 'banking and amortization principles' },
      ar: { desc: 'الحسابات المالية وعوائد الاستثمار وتقديرات القروض', domain: 'المعايير المصرفية والمالية' },
      es: { desc: 'evaluaciones financieras, préstamos e inversiones', domain: 'principios bancarios y de amortización' },
      fr: { desc: 'évaluations financières, crédits et simulations de rentabilité', domain: 'normes bancaires et d’amortissement' },
      de: { desc: 'Finanzberechnungen, Darlehensvergleiche und Zinsanalysen', domain: 'Bank- und Tilgungsstandards' },
    },
    health: {
      en: { desc: 'biometric screenings, wellness benchmarks, and fitness targets', domain: 'physiological and clinical health formulas' },
      ar: { desc: 'المؤشرات الحيوية واللياقة البدنية والاحتياجات الغذائية', domain: 'المعادلات الصحية والفسيولوجية' },
      es: { desc: 'evaluaciones biométricas, nutricionales y de condición física', domain: 'fórmulas clínicas y de bienestar' },
      fr: { desc: 'indicateurs biométriques, forme physique et besoins nutritionnels', domain: 'équations physiologiques reconnues' },
      de: { desc: 'biometrische Kennzahlen, Fitness- und Ernährungsberechnungen', domain: 'sportmedizinische und ernährungswissenschaftliche Richtwerte' },
    },
    math: {
      en: { desc: 'algebraic operations, geometric quantities, and arithmetic functions', domain: 'rigorous mathematical theorems' },
      ar: { desc: 'العمليات الحسابية والمعادلات الجبرية والهندسية', domain: 'القواعد الرياضية الصارمة' },
      es: { desc: 'operaciones algebraicas, proporciones y fórmulas geométricas', domain: 'teoremas matemáticos universales' },
      fr: { desc: 'opérations algébriques, proportions et géométrie', domain: 'théorèmes mathématiques fondamentaux' },
      de: { desc: 'algebraische Berechnungen, Geometrie und Prozentrechnung', domain: 'mathematische Axiome und Rechengesetze' },
    },
    converters: {
      en: { desc: 'unit transformations between international metric and imperial standards', domain: 'NIST and ISO dimensional standards' },
      ar: { desc: 'تحويل الوحدات بين النظام المتري والأنظمة القياسية الأخرى', domain: 'المعايير الدولية للقياس' },
      es: { desc: 'conversión de unidades entre sistemas métrico e imperial', domain: 'estándares internacionales ISO y métricos' },
      fr: { desc: 'conversions d’unités entre systèmes métrique et anglo-saxon', domain: 'normes internationales ISO et métrologiques' },
      de: { desc: 'Einheitenumrechnungen zwischen metrischen und imperialen Maßen', domain: 'internationale ISO- und DIN-Normen' },
    },
    date: {
      en: { desc: 'calendar intervals, countdowns, and chronological duration spans', domain: 'Gregorian calendar and leap-year rules' },
      ar: { desc: 'الفترات الزمنية والتقويمية وحساب الأيام والسنوات', domain: 'قواعد التقويم الميلادي والسنوات الكبيسة' },
      es: { desc: 'cálculo de lapsos temporales, fechas y días naturales', domain: 'calendario gregoriano y años bisiestos' },
      fr: { desc: 'durées calendaires, échéances et décomptes de jours', domain: 'calendrier grégorien et années bissextiles' },
      de: { desc: 'Zeitspannen, Kalendertage und Fristenermittlung', domain: 'gregorianischer Kalender und Schaltjahre' },
    },
  };

  const catData = (categoryContext[tool.categoryId] && categoryContext[tool.categoryId][lang]) ||
    (categoryContext.math && categoryContext.math[lang]) ||
    categoryContext.math.en;

  const introText: Record<Language, string> = {
    en: `The ${name} is an interactive online utility designed to provide fast, reliable, and transparent calculations for ${catData.desc}. Built with client-side execution, results evaluate deterministically as you enter your numbers.`,
    ar: `تعتبر ${name} أداة رقمية متخصصة توفر حسابات سريعة ودقيقة وموثوقة لـ ${catData.desc}. تم تصميم الأداة لتعمل بالكامل في المتصفح مع تحديث فوري لكافة النتائج.`,
    es: `La herramienta ${name} es una calculadora en línea diseñada para ofrecer cálculos rápidos y rigurosos relativos a ${catData.desc}.`,
    fr: `Le calculateur ${name} est un outil en ligne conçu pour réaliser des calculs précis et transparents dans le domaine suivant : ${catData.desc}.`,
    de: `Der ${name} ist ein zuverlässiger Online-Rechner zur präzisen Durchführung von Berechnungen für ${catData.desc}.`,
  };

  const whatItCalculatesText = `${i18n.whatItCalculatesPrefix} ${name.toLowerCase()}, ${i18n.whatItCalculatesSuffix}`;

  const inputs: ToolInputExplanation[] = [
    {
      name: i18n.primaryInputName,
      description: `${i18n.primaryInputDesc} (${name}).`,
      unit: 'Numeric',
      optional: false,
    },
    {
      name: i18n.secondaryInputName,
      description: i18n.secondaryInputDesc,
      unit: 'Standard',
      optional: true,
    },
  ];

  const faqs: ToolFaq[] = [
    { question: i18n.faq1Q, answer: i18n.faq1A },
    { question: i18n.faq2Q, answer: i18n.faq2A },
    { question: i18n.faq3Q, answer: i18n.faq3A },
  ];

  return {
    toolName: name,
    intro: introText[lang] || introText.en,
    whoUsesIt: i18n.whoUsesIt,
    whatItCalculates: whatItCalculatesText,
    howToUse: [i18n.step1, i18n.step2, i18n.step3],
    formula: i18n.formulaLabel,
    inputs,
    unitsAndConversions: i18n.unitsAndConversions,
    workedExample: {
      scenario: `${i18n.exampleScenarioPrefix} ${name}.`,
      stepByStep: [i18n.step1, i18n.step2, i18n.step3],
      result: i18n.exampleResult,
    },
    understandingResults: i18n.understandingResults,
    assumptions: i18n.assumptions,
    limitations: i18n.limitations,
    faqs,
    relatedTools,
  };
}
