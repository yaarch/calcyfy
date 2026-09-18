import { ToolDef, Language } from '../../types';
import { ToolContentDetails } from './types';

type KnowledgeHandler = (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails;

function createKnowledge(dataByLang: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails>): Record<Language, KnowledgeHandler> {
  return dataByLang;
}

// 1. PRESSURE UNIT CONVERTER (pressure-unit)
export const PRESSURE_UNIT_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} converts physical pressure values across scientific and engineering units including Pascals (Pa), Kilopascals (kPa), Bar, Pounds per Square Inch (PSI), Standard Atmospheres (atm), and Millimeters of Mercury (mmHg / Torr).`,
    howToUse: [
      'Enter the numerical pressure measurement.',
      'Select the source pressure unit (e.g., PSI, Bar, kPa, atm).',
      'Select the target destination unit.',
      'Review converted pressure values across all major international systems.'
    ],
    formula: 'Base Pascals (Pa) = Value × Unit Factor | Target = Base Pascals / Target Unit Factor (e.g., 1 bar = 100,000 Pa; 1 atm = 101,325 Pa; 1 PSI ≈ 6,894.76 Pa)',
    formulaVariables: [
      { name: 'Pressure Value', description: 'Magnitude of pressure force per unit area.', unit: 'Pressure units', optional: false }
    ],
    workedExample: {
      scenario: 'Converting 32.0 PSI (typical passenger car tire pressure) to Bar and Kilopascals (kPa).',
      stepByStep: [
        'Convert PSI to Pascals: 32.0 PSI × 6,894.757 Pa/PSI = 220,632.2 Pa.',
        'Convert to Bar: 220,632.2 Pa / 100,000 = 2.206 Bar (~2.21 Bar).',
        'Convert to kPa: 220,632.2 Pa / 1,000 = 220.63 kPa.'
      ],
      result: '32.0 PSI = 2.21 Bar = 220.63 kPa'
    },
    interpretation: 'Essential for automotive tire inflation, HVAC systems, SCUBA diving pressure gauges, and industrial hydraulics.',
    assumptions: 'Exact standard IUPAC and NIST physical conversion factors.',
    limitations: 'Distinguishes absolute pressure (psia) from gauge pressure (psig) relative to atmospheric pressure.',
    faqs: [
      { question: 'What is standard atmospheric pressure at sea level?', answer: 'Standard sea-level atmospheric pressure is defined as 1.0 atm, equal to 101,325 Pa, 1.01325 bar, or 14.696 PSI.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحويل وحدات الضغط الفيزيائية والهندسية بدقة بين الباسكال (Pa)، والبار (Bar)، والرطل لكل بوصة مربعة (PSI)، والضغط الجوي (atm)، والمليمتر زئبق (mmHg / Torr).`,
    howToUse: [
      'أدخل قيمة الضغط المراد تحويلها.',
      'اختر وحدة القياس الأصلية (مثل PSI أو Bar أو كغم/سم²).',
      'اختر وحدة القياس المستهدفة.',
      'اطلع على القيمة المحولة في جميع أنظمة القياس العالمية.'
    ],
    formula: 'التحويل للباسكال = القيمة × معامل الوحدة | القيمة المستهدفة = باسكال ÷ معامل الوحدة الجديدة (1 بار = 100,000 باسكال؛ 1 ضغط جوي = 101,325 باسكال)',
    formulaVariables: [
      { name: 'قيمة الضغط', description: 'القوة المؤثرة عمودياً على وحدة المساحة.', unit: 'وحدات ضغط', optional: false }
    ],
    workedExample: {
      scenario: 'تحويل 32.0 PSI (ضغط إطار سيارة نموذجي) إلى بار وكيلوباسكال.',
      stepByStep: [
        'التحويل إلى باسكال: 32.0 × 6894.76 = 220,632.2 باسكال.',
        'التحويل إلى بار: 220,632.2 ÷ 100,000 = 2.21 بار.',
        'التحويل إلى كيلوباسكال: 220,632.2 ÷ 1,000 = 220.63 كيلو باسكال.'
      ],
      result: '32.0 PSI = 2.21 بار = 220.63 كيلوباسكال'
    },
    interpretation: 'ضرورية لضبط ضغط إطارات السيارات، وأنظمة التكييف والتبريد، وأنابيب الغاز والضغط الهيدروليكي.',
    assumptions: 'معايير التحويل الفيزيائية الدولية المعتمدة من NIST.',
    limitations: 'يجب التمييز بين الضغط المطلق والضغط القياسي النسبي للغلاف الجوي.',
    faqs: [
      { question: 'كم يعادل الضغط الجوي القياسي عند مستوى سطح البحر؟', answer: 'يعادل 1 ضغط جوي معياري (atm) = 101.325 كيلوباسكال أو 1.01325 بار أو 14.7 PSI تقريباً.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} convierte valores de presión entre unidades de ingeniería y física: pascales (Pa), kilopascales (kPa), bares (bar), PSI (libras por pulgada cuadrada), atmósferas (atm) y mmHg (Torr).`,
    howToUse: [
      'Introduzca el valor de presión.',
      'Seleccione la unidad de origen (ej. PSI, Bar, kPa, atm).',
      'Seleccione la unidad de destino.',
      'Consulte la equivalencia instantánea en todos los sistemas métricos e imperiales.'
    ],
    formula: 'Pascales base (Pa) = Valor × Factor | Destino = Pascales / Factor destino (1 bar = 100.000 Pa, 1 atm = 101.325 Pa, 1 PSI ≈ 6.894,76 Pa)',
    formulaVariables: [
      { name: 'Presión', description: 'Magnitud de fuerza por unidad de superficie.', unit: 'Unidades de presión', optional: false }
    ],
    workedExample: {
      scenario: 'Convertir 32,0 PSI (presión típica de neumático) a Bares y kPa.',
      stepByStep: [
        'Paso a pascales: 32,0 PSI × 6.894,76 = 220.632,2 Pa.',
        'Paso a bares: 220.632,2 Pa / 100.000 = 2,21 Bar.',
        'Paso a kPa: 220.632,2 Pa / 1.000 = 220,63 kPa.'
      ],
      result: '32,0 PSI = 2,21 Bar = 220,63 kPa'
    },
    interpretation: 'Imprescindible para el inflado de neumáticos, climatización, buceo y circuitos hidráulicos.',
    assumptions: 'Constantes de conversión oficiales NIST/IUPAC.',
    limitations: 'Distingue entre presión absoluta y presión manométrica relativa.',
    faqs: [
      { question: '¿A cuántos bares equivale una atmósfera?', answer: '1 atmósfera estándar (atm) equivale exactamente a 1,01325 bar.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} convertit les grandeurs de pression entre unités scientifiques et industrielles : Pascals (Pa), Kilopascals (kPa), Bars, PSI, Atmosphères (atm) et Millimètres de mercure (mmHg).`,
    howToUse: [
      'Saisissez la valeur de pression.',
      'Sélectionnez l\'unité initiale (ex. Bar, PSI, kPa, atm).',
      'Sélectionnez l\'unité finale souhaitée.',
      'Consultez la table de conversion complète.'
    ],
    formula: 'Pascals (Pa) = Valeur × Facteur | Unité cible = Pascals / Facteur cible (1 bar = 100 000 Pa ; 1 atm = 101 325 Pa ; 1 PSI ≈ 6 894,76 Pa)',
    formulaVariables: [
      { name: 'Pression', description: 'Force par unité de surface.', unit: 'Unités de pression', optional: false }
    ],
    workedExample: {
      scenario: 'Conversion de 32,0 PSI (pression de gonflage auto) en Bar et en kPa.',
      stepByStep: [
        'En pascals : 32,0 PSI × 6 894,76 = 220 632,2 Pa.',
        'En bars : 220 632,2 / 100 000 = 2,21 Bar.',
        'En kilopascals : 220 632,2 / 1 000 = 220,63 kPa.'
      ],
      result: '32,0 PSI = 2,21 Bar = 220,63 kPa'
    },
    interpretation: 'Outil clé pour le gonflage automobile, la tuyauterie industrielle et les manomètres de plongée.',
    assumptions: 'Facteurs de conversion physiques normalisés.',
    limitations: 'Prend en compte la pression relative par rapport à la pression atmosphérique ambiante.',
    faqs: [
      { question: 'Pourquoi la pression des pneus s\'exprime en Bar ou en PSI ?', answer: 'Le Bar est l\'unité métrique courante en Europe, tandis que le PSI (livre par pouce carré) est le standard anglo-saxon.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} rechnet physikalische und technische Druckwerte zwischen Pascal (Pa), Kilopascal (kPa), Bar, PSI (Pound-force per square inch), Atmosphären (atm) und Torr (mmHg) um.`,
    howToUse: [
      'Geben Sie den Druckwert ein.',
      'Wählen Sie die Ausgangseinheit (z. B. PSI, Bar, kPa, atm).',
      'Wählen Sie die Zieleinheit.',
      'Lesen Sie die exakten Vergleichswerte in allen Systemen ab.'
    ],
    formula: 'Basis-Pascal (Pa) = Wert × Faktor | Zielwert = Pascal / Zielfaktor (1 bar = 100.000 Pa; 1 atm = 101.325 Pa; 1 PSI ≈ 6.894,76 Pa)',
    formulaVariables: [
      { name: 'Druckwert', description: 'Kraft pro Flächeneinheit.', unit: 'Druckeinheit', optional: false }
    ],
    workedExample: {
      scenario: 'Umrechnung von 32,0 PSI (Reifendruck) in Bar und Kilopascal.',
      stepByStep: [
        'In Pascal: 32,0 PSI × 6.894,76 = 220.632,2 Pa.',
        'In Bar: 220.632,2 Pa / 100.000 = 2,21 Bar.',
        'In kPa: 220.632,2 Pa / 1.000 = 220,63 kPa.'
      ],
      result: '32,0 PSI = 2,21 Bar = 220,63 kPa'
    },
    interpretation: 'Unentbehrlich für Kfz-Reifendruckkontrollen, Kältetechnik, Tauchsport und industrielle Hydrauliksysteme.',
    assumptions: 'Offizielle NIST- und IUPAC-Umrechnungsfaktoren.',
    limitations: 'Unterscheidung zwischen absolutem Druck und relativem Überdruck (Manometerdruck).',
    faqs: [
      { question: 'Wie viel bar ist 1 Atmosphäre?', answer: '1 physikalische Standard-Atmosphäre (atm) entspricht exakt 1,01325 bar.' }
    ],
    relatedTools
  })
});

// 2. ENERGY & POWER UNIT CONVERTER (energy-power)
export const ENERGY_POWER_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} converts energy metrics (Joules, Kilojoules, Calories, Kilocalories, Watt-hours, kWh, BTU) and power metrics (Watts, Kilowatts, Horsepower hp, Foot-pounds/sec).`,
    howToUse: [
      'Choose whether to convert Energy (J, kWh, BTU, kcal) or Power (Watts, kW, HP).',
      'Enter the numerical quantity to convert.',
      'Select original source and target destination units.',
      'Review converted values across engineering and thermodynamic standards.'
    ],
    formula: 'Energy: 1 kWh = 3,600,000 Joules = 860.42 kcal = 3,412.14 BTU | Power: 1 Metric HP = 735.498 W; 1 Mechanical HP = 745.70 W',
    formulaVariables: [
      { name: 'Magnitude', description: 'Quantity of energy capacity or power rate.', unit: 'Energy/Power units', optional: false }
    ],
    workedExample: {
      scenario: 'Converting 1.0 Kilowatt-hour (kWh) of electrical energy into Joules and Kilocalories (kcal).',
      stepByStep: [
        '1 kWh = 1,000 Watts × 3,600 seconds = 3,600,000 Joules (3.60 MJ).',
        'Convert to dietary kcal: 3,600,000 J / 4,184 J/kcal = 860.42 kcal.',
        'Convert to BTU: 3,600,000 J / 1,055.06 J/BTU = 3,412.14 BTU.'
      ],
      result: '1.0 kWh = 3.60 MJ = 860.42 kcal = 3,412.14 BTU'
    },
    interpretation: 'Facilitates energy billing analysis, engine horsepower comparisons, and thermal HVAC equipment sizing.',
    assumptions: 'Standard international thermodynamic Joule definitions.',
    limitations: 'Mechanical Imperial horsepower (550 ft-lb/s ≈ 745.7 W) differs slightly from metric DIN horsepower (735.5 W).',
    faqs: [
      { question: 'How many Watts are in one Horsepower?', answer: 'One standard mechanical horsepower equals approximately 745.7 Watts (0.746 kW).' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحويل مقاييس الطاقة (الجول، الكيلوجول، السعرات الحرارية، الكيلوواط/ساعة، BTU) والقدرة الميكانيكية والكهربائية (الواط، الكيلوواط، الحصان الميكانيكي HP).`,
    howToUse: [
      'اختر نوع التحويل: وحدات الطاقة أو وحدات القدرة الحركية والكهربائية.',
      'أدخل القيمة العددية المراد تحويلها.',
      'حدد وحدة القياس الأصلية ووحدة القياس الهدف.',
      'راجع النتائج المحولة وفق المعايير الهندسية والفيزيائية.'
    ],
    formula: 'الطاقة: 1 كيلوواط.ساعة = 3,600,000 جول = 860.42 سعرة كبرى | القدرة: 1 حصان ميكانيكي = 745.7 واط',
    formulaVariables: [
      { name: 'القيمة المدخلة', description: 'كمية الطاقة أو معدل القدرة.', unit: 'وحدات طاقة/قدرة', optional: false }
    ],
    workedExample: {
      scenario: 'تحويل 1.0 كيلوواط/ساعة (kWh) من الطاقة الكهربائية إلى جول وسعرات حرارية (kcal).',
      stepByStep: [
        '1 كيلوواط.ساعة = 1000 واط × 3600 ثانية = 3,600,000 جول (3.6 ميغاجول).',
        'التحويل إلى سعرات حرارية: 3,600,000 ÷ 4184 = 860.42 سعرة حرارية كبرى.',
        'التحويل إلى وحدة حرارية بريطانية: 3,600,000 ÷ 1055.06 = 3,412.14 BTU.'
      ],
      result: '1.0 كيلوواط/ساعة = 3.6 ميغاجول = 860.42 سعرة كبرى'
    },
    interpretation: 'تساعد في تدقيق فواتير الكهرباء، ومقارنة قوة محركات السيارات، وتحديد سعات أجهزة التكييف.',
    assumptions: 'معايير الديناميكا الحرارية الدولية.',
    limitations: 'يوجد فارق بسيط بين الحصان الميكانيكي البريطاني (745.7 واط) والحصان المتري (735.5 واط).',
    faqs: [
      { question: 'كم واط في الحصان الميكانيكي الواحد؟', answer: 'يعادل الحصان الميكانيكي المعياري 745.7 واط تقريباً (أو 0.746 كيلوواط).' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} convierte medidas de energía (julios, calorías, kilovatios-hora kWh, BTU) y potencia mecánica/eléctrica (vatios, kilovatios, caballos de fuerza CV/HP).`,
    howToUse: [
      'Seleccione si desea convertir Energía o Potencia.',
      'Introduzca la cantidad numérica.',
      'Seleccione las unidades de origen y destino.',
      'Consulte la equivalencia termodinámica e industrial.'
    ],
    formula: 'Energía: 1 kWh = 3.600.000 J = 860,42 kcal = 3.412,14 BTU | Potencia: 1 CV = 735,5 W ; 1 HP = 745,7 W',
    formulaVariables: [
      { name: 'Magnitud', description: 'Capacidad energética o tasa de potencia.', unit: 'Unidades', optional: false }
    ],
    workedExample: {
      scenario: 'Convertir 1,0 kWh de electricidad a Julios y Kilocalorías.',
      stepByStep: [
        '1 kWh = 1.000 W × 3.600 s = 3.600.000 Julios (3,6 MJ).',
        'A kilocalorías: 3.600.000 / 4.184 = 860,42 kcal.',
        'A BTU: 3.600.000 / 1.055,06 = 3.412,14 BTU.'
      ],
      result: '1,0 kWh = 3,60 MJ = 860,42 kcal = 3.412,14 BTU'
    },
    interpretation: 'Útil para calcular consumos en facturas eléctricas, potencia de motores y climatización.',
    assumptions: 'Factores estándar de física y termodinámica.',
    limitations: 'El caballo de vapor métrico (CV = 735,5 W) difiere del Horsepower imperial (HP = 745,7 W).',
    faqs: [
      { question: '¿Cuál es la diferencia entre kW y kWh?', answer: 'El kW (kilovatio) mide la potencia instantánea, mientras que el kWh (kilovatio-hora) mide la energía total consumida a lo largo del tiempo.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} convertit les unités d'énergie (Joules, Calories, kWh, BTU) et de puissance mécanique et électrique (Watts, kW, Chevaux-vapeur ch / HP).`,
    howToUse: [
      'Sélectionnez la catégorie (Énergie ou Puissance).',
      'Indiquez la valeur numérique à convertir.',
      'Sélectionnez l\'unité de départ et l\'unité cible.',
      'Consultez les équivalences instantanées.'
    ],
    formula: 'Énergie : 1 kWh = 3 600 000 J = 860,42 kcal | Puissance : 1 ch (métrique) = 735,5 W ; 1 HP = 745,7 W',
    formulaVariables: [
      { name: 'Valeur', description: 'Quantité d\'énergie ou puissance.', unit: 'Unités', optional: false }
    ],
    workedExample: {
      scenario: 'Conversion de 1,0 kWh en Joules et en Kilocalories.',
      stepByStep: [
        '1 kWh = 1 000 W × 3 600 s = 3 600 000 Joules (3,6 MJ).',
        'En kcal : 3 600 000 / 4 184 = 860,42 kcal.',
        'En BTU : 3 600 000 / 1 055,06 = 3 412,14 BTU.'
      ],
      result: '1,0 kWh = 3,60 MJ = 860,42 kcal = 3 412,14 BTU'
    },
    interpretation: 'Indispensable pour décrypter vos factures d\'énergie, dimensionner un radiateur ou comparer la puissance d\'un véhicule.',
    assumptions: 'Constantes physiques thermodynamiques.',
    limitations: 'Le cheval-vapeur métrique (ch = 735,5 W) diffère légèrement du cheval mécanique anglo-saxon (HP = 745,7 W).',
    faqs: [
      { question: 'Combien de Watts représente 1 cheval-vapeur (ch) ?', answer: 'Un cheval-vapeur métrique (ch) correspond exactement à 735,498 Watts.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} rechnet physikalische Energieeinheiten (Joule, Kalorien, Kilowattstunden kWh, BTU) sowie mechanische und elektrische Leistung (Watt, Kilowatt, PS / Horsepower) um.`,
    howToUse: [
      'Wählen Sie Energie oder Leistung als Umrechnungskategorie.',
      'Geben Sie den numerischen Wert ein.',
      'Wählen Sie Ausgangs- und Zieleinheit.',
      'Lesen Sie die Umrechnungswerte nach internationalen Normen ab.'
    ],
    formula: 'Energie: 1 kWh = 3.600.000 Joule = 860,42 kcal | Leistung: 1 DIN-PS = 735,498 W; 1 HP = 745,70 W',
    formulaVariables: [
      { name: 'Messwert', description: 'Energiemenge oder Leistungsrate.', unit: 'Einheit', optional: false }
    ],
    workedExample: {
      scenario: 'Umrechnung von 1,0 kWh Stromenergie in Joule und Kilokalorien.',
      stepByStep: [
        '1 kWh = 1.000 W × 3.600 s = 3.600.000 Joule (3,60 MJ).',
        'In Kilokalorien: 3.600.000 / 4.184 = 860,42 kcal.',
        'In BTU: 3.600.000 / 1.055,06 = 3.412,14 BTU.'
      ],
      result: '1,0 kWh = 3,60 MJ = 860,42 kcal = 3.412,14 BTU'
    },
    interpretation: 'Erleichtert Stromkostenanalysen, Heizungsdimensionierungen und Motorleistungsvergleiche.',
    assumptions: 'Internationale thermodynamische Standarddefinitionen.',
    limitations: 'Deutsche DIN-Pferdestärken (PS = 735,5 W) weichen leicht von angloamerikanischen Horsepower (HP = 745,7 W) ab.',
    faqs: [
      { question: 'Wie rechnet man kW in PS um?', answer: 'Multiplizieren Sie den kW-Wert mit 1,35962 (z. B. 100 kW × 1,35962 ≈ 136 PS).' }
    ],
    relatedTools
  })
});

// 3. ANGLE UNIT CONVERTER (angle-unit)
export const ANGLE_UNIT_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} converts angular measurements between Degrees (°), Radians (rad), Gradians (grad), Arcminutes ('), Arcseconds (''), and Full Revolutions.`,
    howToUse: [
      'Enter the angular magnitude.',
      'Select the source unit (Degrees, Radians, Gradians, etc.).',
      'Select the target angular unit.',
      'Review exact mathematical conversion and π radian equivalents.'
    ],
    formula: 'Radians = Degrees × (π / 180) | Degrees = Radians × (180 / π) | 1 Full Circle = 360° = 2π rad = 400 grad',
    formulaVariables: [
      { name: 'Angle', description: 'Rotational arc measurement.', unit: 'Degrees / Radians', optional: false }
    ],
    workedExample: {
      scenario: 'Converting a 90° right angle to Radians and Gradians.',
      stepByStep: [
        'Convert to radians: 90° × (π / 180) = π / 2 ≈ 1.5708 radians.',
        'Convert to gradians: 90° × (400 / 360) = 100.0 grad.',
        'Convert to arcminutes: 90° × 60 = 5,400 arcminutes (\').'
      ],
      result: '90° = π/2 rad (1.5708 rad) = 100 grad = 5,400\''
    },
    interpretation: 'Vital for trigonometry, CAD mechanical modeling, navigation bearings, and astronomical coordinates.',
    assumptions: 'Euclidean geometric angles.',
    limitations: 'High-precision astronomy often relies on sexagesimal arcsecond representations.',
    faqs: [
      { question: 'How many degrees are in one radian?', answer: '1 radian equals exactly 180/π degrees, which is approximately 57.2958° (57° 17\' 45").' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحويل قياسات الزوايا الهندسية بدقة بين الدرجات (°)، والراديان (rad)، والجراد (grad)، ودقائق القوس (')، وثواني القوس ('')، والدورات الكاملة.`,
    howToUse: [
      'أدخل مقدار الزاوية المراد تحويلها.',
      'اختر وحدة القياس الأصلية (درجات، راديان، جراد).',
      'اختر الوحدة المستهدفة للتحويل.',
      'اطلع على القيمة الدقيقة ومكافئ الزاوية بدلالة النسبة التقريبية ط (π).'
    ],
    formula: 'الراديان = الدرجات × (π ÷ 180) | الدرجات = الراديان × (180 ÷ π) | الدورة الكاملة = 360° = 2π راديان = 400 جراد',
    formulaVariables: [
      { name: 'مقدار الزاوية', description: 'قياس الانفراج الدائري بين مستقيمين.', unit: 'درجات / راديان', optional: false }
    ],
    workedExample: {
      scenario: 'تحويل زاوية قائمة 90° إلى راديان وجراد.',
      stepByStep: [
        'التحويل إلى راديان: 90 × (π ÷ 180) = π/2 ≈ 1.5708 راديان.',
        'التحويل إلى جراد: 90 × (400 ÷ 360) = 100 جراد.',
        'التحويل إلى دقائق قوسية: 90 × 60 = 5,400 دقيقة قوسية.'
      ],
      result: '90° = π/2 راديان (1.5708 rad) = 100 جراد'
    },
    interpretation: 'أساسية لحل مسائل حساب المثلثات والهندسة المساحية والرسم الهندسي وبرمجة الرسوميات.',
    assumptions: 'الهندسة الإقليدية المستوية.',
    limitations: 'تتطلب الحسابات الفلكية دقة متناهية بأجزاء ثواني القوس.',
    faqs: [
      { question: 'كم درجة في الراديان الواحد؟', answer: 'يعادل الراديان الواحد (1 rad) تقريباً 57.2958 درجة (57 درجة و 17 دقيقة و 45 ثانية).' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} convierte medidas angulares entre Grados sexagesimales (°), Radianes (rad), Gradiantes centesimales (grad), Minutos de arco (') y Segundos de arco ('').`,
    howToUse: [
      'Introduzca el valor del ángulo.',
      'Seleccione la unidad original (grados, radianes, etc.).',
      'Seleccione la unidad de destino.',
      'Consulte la equivalencia exacta y el valor en función de π.'
    ],
    formula: 'Radianes = Grados × (π / 180) | Grados = Radianes × (180 / π) | Círculo = 360° = 2π rad = 400 grad',
    formulaVariables: [
      { name: 'Ángulo', description: 'Medida del arco rotacional.', unit: 'Grados / Radianes', optional: false }
    ],
    workedExample: {
      scenario: 'Convertir un ángulo recto de 90° a Radianes y Gradiantes.',
      stepByStep: [
        'A radianes: 90° × (π / 180) = π / 2 ≈ 1,5708 rad.',
        'A gradiantes: 90° × (400 / 360) = 100 grad.',
        'A minutos de arco: 90° × 60 = 5.400\'.'
      ],
      result: '90° = π/2 rad (1,5708 rad) = 100 grad'
    },
    interpretation: 'Crucial en trigonometría, topografía, robótica y diseño asistido por ordenador (CAD).',
    assumptions: 'Geometría euclidiana bidimensional.',
    limitations: 'Topografía utiliza habitualmente el sistema centesimal (gradiantes).',
    faqs: [
      { question: '¿Cuántos grados tiene un radián?', answer: 'Un radián equivale aproximadamente a 57,2958 grados sexagesimales.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} convertit les angles entre Degrés (°), Radians (rad), Grades (grad), Minutes d'arc (') et Secondes d'arc ('').`,
    howToUse: [
      'Saisissez la valeur de l\'angle.',
      'Sélectionnez l\'unité de départ (degrés, radians, grades).',
      'Sélectionnez l\'unité souhaitée.',
      'Consultez la conversion exacte en radians et multiples de π.'
    ],
    formula: 'Radians = Degrés × (π / 180) | Degrés = Radians × (180 / π) | Tour complet = 360° = 2π rad = 400 grad',
    formulaVariables: [
      { name: 'Angle', description: 'Valeur de rotation.', unit: 'Degrés / Radians', optional: false }
    ],
    workedExample: {
      scenario: 'Conversion d\'un angle droit de 90° en Radians et en Grades.',
      stepByStep: [
        'En radians : 90° × (π / 180) = π / 2 ≈ 1,5708 rad.',
        'En grades : 90° × (400 / 360) = 100 grad.',
        'En minutes d\'arc : 90° × 60 = 5 400\'.'
      ],
      result: '90° = π/2 rad (1,5708 rad) = 100 grad'
    },
    interpretation: 'Indispensable en trigonométrie, géométrie, topographie et modélisation 3D.',
    assumptions: 'Espace géométrique euclidien.',
    limitations: 'Les calculs balistiques et astronomiques requièrent une précision au centième de seconde d\'arc.',
    faqs: [
      { question: 'Combien de degrés contient 1 radian ?', answer: '1 radian correspond à environ 57,2958 degrés.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} rechnet Winkelmaße zwischen Grad (°), Bogenmaß/Radiant (rad), Neugrad/Gon (grad), Bogenminuten (') und Bogensekunden ('') um.`,
    howToUse: [
      'Geben Sie das Winkelmaß ein.',
      'Wählen Sie die Ausgangseinheit (z. B. Grad oder Radiant).',
      'Wählen Sie die Zieleinheit.',
      'Lesen Sie die exakte mathematische Umrechnung mit π-Werten ab.'
    ],
    formula: 'Radiant = Grad × (π / 180) | Grad = Radiant × (180 / π) | Vollkreis = 360° = 2π rad = 400 gon',
    formulaVariables: [
      { name: 'Winkel', description: 'Rotationsmaß.', unit: 'Grad / Radiant', optional: false }
    ],
    workedExample: {
      scenario: 'Umrechnung eines 90°-Rechtwinkels in Radiant und Neugrad (Gon).',
      stepByStep: [
        'In Radiant: 90° × (π / 180) = π / 2 ≈ 1,5708 rad.',
        'In Gon: 90° × (400 / 360) = 100 gon.',
        'In Bogenminuten: 90° × 60 = 5.400\'.'
      ],
      result: '90° = π/2 rad (1,5708 rad) = 100 gon'
    },
    interpretation: 'Grundlegend für Trigonometrie, Vermessungswesen (Geodäsie), Maschinenbau und Computergrafik.',
    assumptions: 'Euklidische Geometrie.',
    limitations: 'In der Geodäsie wird standardmäßig das 400-Gon-System genutzt.',
    faqs: [
      { question: 'Wie viel Grad ist 1 Radiant?', answer: '1 Radiant entspricht etwa 57,2958 Grad (57° 17\' 45").' }
    ],
    relatedTools
  })
});

// 4. FORCE UNIT CONVERTER (force-unit)
export const FORCE_UNIT_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} converts physical force values across SI metric and Imperial standards including Newtons (N), Kilonewtons (kN), Dynes (dyn), Pound-force (lbf), and Kilogram-force (kgf / kiloponds).`,
    howToUse: [
      'Enter the numerical force magnitude.',
      'Select source force unit (e.g., Newtons, Pound-force lbf, kN, kgf).',
      'Select target force unit.',
      'Review converted force values across international mechanical standards.'
    ],
    formula: 'Base Newtons (N) = Value × Unit Factor (1 lbf ≈ 4.44822 N; 1 kgf = 9.80665 N; 1 N = 10⁵ dynes)',
    formulaVariables: [
      { name: 'Force Value', description: 'Mass acceleration product (F = m · a).', unit: 'Force units', optional: false }
    ],
    workedExample: {
      scenario: 'Converting 100.0 Pound-force (lbf) to Newtons (N) and Kilogram-force (kgf).',
      stepByStep: [
        'Convert lbf to Newtons: 100.0 lbf × 4.448222 N/lbf = 444.82 N.',
        'Convert to Kilonewtons: 444.82 N / 1,000 = 0.4448 kN.',
        'Convert to kgf: 444.82 N / 9.80665 N/kgf = 45.36 kgf.'
      ],
      result: '100.0 lbf = 444.82 N = 0.445 kN = 45.36 kgf'
    },
    interpretation: 'Used in structural engineering load testing, aerospace thrust calculations, and material tensile strength testing.',
    assumptions: 'Standard terrestrial gravity constant g₀ = 9.80665 m/s².',
    limitations: 'Differentiates true force (mass × acceleration) from static gravitational mass.',
    faqs: [
      { question: 'How many Newtons are in one Pound-force (lbf)?', answer: 'One pound-force equals approximately 4.44822 Newtons.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحويل وحدات القوة الميكانيكية والفيزيائية بين النيوتن (N)، والكيلونيوتن (kN)، والداين (dyn)، والرطل القوة (lbf)، والكيلوغرام قوة (kgf / كيلوبوند).`,
    howToUse: [
      'أدخل مقدار القوة الميكانيكية.',
      'اختر وحدة القياس الأصلية (مثل نيوتن أو رطل قوة lbf أو كغ قوة).',
      'اختر الوحدة المستهدفة للتحويل.',
      'اطلع على القيمة المحولة وفق المعايير الهندسية الدولية.'
    ],
    formula: 'التحويل للنيوتن = القيمة × معامل الوحدة (1 رطل قوة ≈ 4.44822 نيوتن؛ 1 كغ قوة = 9.80665 نيوتن)',
    formulaVariables: [
      { name: 'مقدار القوة', description: 'حاصل ضرب الكتلة في التسارع (ق = ك × ت).', unit: 'وحدات قوة', optional: false }
    ],
    workedExample: {
      scenario: 'تحويل 100.0 رطل قوة (lbf) إلى نيوتن وكيلوغرام قوة.',
      stepByStep: [
        'التحويل إلى نيوتن: 100.0 × 4.44822 = 444.82 نيوتن.',
        'التحويل إلى كيلونيوتن: 444.82 ÷ 1000 = 0.4448 كيلونيوتن.',
        'التحويل إلى كغ قوة: 444.82 ÷ 9.80665 = 45.36 كغ قوة.'
      ],
      result: '100.0 رطل قوة = 444.82 نيوتن = 45.36 كغ قوة'
    },
    interpretation: 'تُستخدم في اختبارات الشد ومقاومة المواد، وحسابات الدفع الجوي، والهندسة الإنشائية للأبنية والجسور.',
    assumptions: 'تسارع الجاذبية الأرضية القياسي 9.80665 م/ث².',
    limitations: 'يجب التمييز بين القوة (النيوتن) والكتلة الساكنة (الكيلوغرام).',
    faqs: [
      { question: 'كم نيوتن في الكيلوغرام قوة الواحد؟', answer: 'يعادل الكيلوغرام قوة (kgf) بالضبط 9.80665 نيوتن (قوة جذب الأرض لكتلة 1 كغ).' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} convierte magnitudes de fuerza mecánica entre el Sistema Internacional e Imperial: Newtons (N), Kilonewtons (kN), Dínas (dyn), Libras-fuerza (lbf) y Kilogramos-fuerza (kgf).`,
    howToUse: [
      'Introduzca el valor de la fuerza.',
      'Seleccione la unidad original (N, lbf, kgf, kN).',
      'Seleccione la unidad de destino.',
      'Consulte la equivalencia de esfuerzo mecánico.'
    ],
    formula: 'Newtons base (N) = Valor × Factor (1 lbf ≈ 4,44822 N; 1 kgf = 9,80665 N; 1 N = 10⁵ dinas)',
    formulaVariables: [
      { name: 'Fuerza', description: 'Magnitud de esfuerzo físico (F = m · a).', unit: 'Unidades de fuerza', optional: false }
    ],
    workedExample: {
      scenario: 'Convertir 100,0 lbf a Newtons y Kilogramos-fuerza.',
      stepByStep: [
        'A Newtons: 100,0 lbf × 4,44822 = 444,82 N.',
        'A Kilonewtons: 444,82 / 1.000 = 0,4448 kN.',
        'A kgf: 444,82 / 9,80665 = 45,36 kgf.'
      ],
      result: '100,0 lbf = 444,82 N = 45,36 kgf'
    },
    interpretation: 'Fundamental para ensayos de tracción de materiales, cálculo estructural y aerodinámica.',
    assumptions: 'Gravedad estándar terrestre g₀ = 9,80665 m/s².',
    limitations: 'No confundir la fuerza (Newton) con la masa en reposo (Kilogramo).',
    faqs: [
      { question: '¿Cuánto es un Newton de fuerza?', answer: '1 Newton es la fuerza necesaria para acelerar una masa de 1 kg a 1 m/s².' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} convertit les forces mécaniques entre normes internationales et impériales : Newtons (N), Kilonewtons (kN), Dynes (dyn), Livres-force (lbf) et Kilogrammes-force (kgf).`,
    howToUse: [
      'Saisissez l\'intensité de la force.',
      'Sélectionnez l\'unité de départ (Newtons, lbf, kgf).',
      'Sélectionnez l\'unité de conversion.',
      'Consultez les résultats de contrainte mécanique.'
    ],
    formula: 'Newtons (N) = Valeur × Facteur (1 lbf ≈ 4,44822 N ; 1 kgf = 9,80665 N ; 1 N = 10⁵ dynes)',
    formulaVariables: [
      { name: 'Force', description: 'Action mécanique (F = m · a).', unit: 'Unités de force', optional: false }
    ],
    workedExample: {
      scenario: 'Conversion de 100,0 livres-force (lbf) en Newtons et kgf.',
      stepByStep: [
        'En Newtons : 100,0 lbf × 4,44822 = 444,82 N.',
        'En kilonewtons : 444,82 / 1 000 = 0,4448 kN.',
        'En kgf : 444,82 / 9,80665 = 45,36 kgf.'
      ],
      result: '100,0 lbf = 444,82 N = 45,36 kgf'
    },
    interpretation: 'Essentiel pour l\'ingénierie mécanique, la résistance des matériaux et le calcul des poussées réacteurs.',
    assumptions: 'Accélération de la pesanteur g₀ = 9,80665 m/s².',
    limitations: 'Distingue la force mécanique (Newton) de la masse gravitationnelle (kg).',
    faqs: [
      { question: 'Combien vaut 1 livre-force en Newtons ?', answer: 'Une livre-force (lbf) vaut environ 4,4482 Newtons.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} rechnet physikalische Kraftgrößen zwischen SI-Einheiten und angloamerikanischen Standards um: Newton (N), Kilonewton (kN), Dyn (dyn), Pound-force (lbf) und Kilopond (kp / kgf).`,
    howToUse: [
      'Geben Sie den Betrag der Kraft ein.',
      'Wählen Sie die Ausgangseinheit (z. B. Newton, lbf, kp).',
      'Wählen Sie die Zieleinheit.',
      'Lesen Sie die umgerechneten mechanischen Kraftwerte ab.'
    ],
    formula: 'Basis-Newton (N) = Wert × Faktor (1 lbf ≈ 4,44822 N; 1 kp/kgf = 9,80665 N; 1 N = 10⁵ dyn)',
    formulaVariables: [
      { name: 'Kraftwert', description: 'Masse mal Beschleunigung (F = m · a).', unit: 'Krafteinheiten', optional: false }
    ],
    workedExample: {
      scenario: 'Umrechnung von 100,0 Pound-force (lbf) in Newton und Kilopond (kp).',
      stepByStep: [
        'In Newton: 100,0 lbf × 4,44822 = 444,82 N.',
        'In Kilonewton: 444,82 / 1.000 = 0,4448 kN.',
        'In Kilopond (kgf): 444,82 / 9,80665 = 45,36 kp.'
      ],
      result: '100,0 lbf = 444,82 N = 45,36 kp (kgf)'
    },
    interpretation: 'Wichtig für statische Berechnungen im Bauwesen, Materialzugprüfungen und Triebwerksschubmessungen.',
    assumptions: 'Standard-Erdbeschleunigung g₀ = 9,80665 m/s².',
    limitations: 'Trennt physikalisch exakt zwischen dynamischer Kraft (Newton) und statischer Masse (kg).',
    faqs: [
      { question: 'Was ist 1 Newton?', answer: '1 Newton ist die Kraft, die einem Körper der Masse 1 kg eine Beschleunigung von 1 m/s² erteilt.' }
    ],
    relatedTools
  })
});

// 5. TORQUE UNIT CONVERTER (torque-unit)
export const TORQUE_UNIT_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} converts rotational torque and moment of force measurements across Newton-meters (N·m), Foot-pounds (lbf·ft), Inch-pounds (lbf·in), and Kilogram-force meters (kgf·m).`,
    howToUse: [
      'Enter the torque wrench or engine torque value.',
      'Select source unit (e.g., Newton-meters N·m, Foot-pounds ft-lbs, Inch-pounds in-lbs).',
      'Select destination torque unit.',
      'Review torque settings for automotive bolt tightening and machinery assembly.'
    ],
    formula: 'Base N·m = Value × Unit Factor (1 lbf·ft ≈ 1.355818 N·m; 1 lbf·in ≈ 0.112985 N·m; 1 kgf·m = 9.80665 N·m)',
    formulaVariables: [
      { name: 'Torque Value', description: 'Rotational moment (Force × Lever Arm Distance).', unit: 'Torque units', optional: false }
    ],
    workedExample: {
      scenario: 'Converting an engine torque specification of 250.0 lb-ft (foot-pounds) to Newton-meters (N·m).',
      stepByStep: [
        'Apply conversion factor: 1 lb-ft = 1.355818 N·m.',
        'Calculation: 250.0 lb-ft × 1.355818 N·m/lb-ft = 338.95 N·m.',
        'Convert to inch-pounds: 250.0 lb-ft × 12 = 3,000 in-lb.'
      ],
      result: '250.0 lb-ft = 338.95 N·m = 3,000 in-lb'
    },
    interpretation: 'Prevents stripped bolt threads, warped cylinder heads, and loose wheel lug nuts by ensuring exact wrench torque specification.',
    assumptions: 'Perpendicular lever arm force application.',
    limitations: 'Fastener thread lubrication (dry vs oiled) affects bolt clamping preload at identical torque settings.',
    faqs: [
      { question: 'What is the formula to convert lb-ft to N·m?', answer: 'Multiply the foot-pound (lb-ft) value by 1.35582 to obtain Newton-meters (N·m).' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحويل عزم الدوران وقوة التدوير الميكانيكية بين نيوتن.متر (N·m)، ورطل.قدم (lbf·ft)، ورطل.بوصة (lbf·in)، وكيلوغرام قوة.متر (kgf·m).`,
    howToUse: [
      'أدخل قيمة عزم الدوران المراد تحويلها.',
      'اختر وحدة القياس الأصلية (مثل نيوتن.متر N·m أو رطل.قدم lb-ft).',
      'اختر الوحدة المستهدفة.',
      'اطلع على إعدادات العزم الدقيقة لربط صواميل المحركات والسيارات.'
    ],
    formula: 'التحويل لنيوتن.متر = القيمة × معامل الوحدة (1 رطل.قدم ≈ 1.355818 نيوتن.متر؛ 1 كغ قوة.متر = 9.80665 نيوتن.متر)',
    formulaVariables: [
      { name: 'عزم الدوران', description: 'حاصل ضرب القوة في ذراع الدوران (العزم = ق × ف).', unit: 'وحدات عزم', optional: false }
    ],
    workedExample: {
      scenario: 'تحويل عزم محرك سيارة يبلغ 250.0 رطل.قدم (lb-ft) إلى نيوتن.متر.',
      stepByStep: [
        'معامل التحويل: 1 رطل.قدم = 1.355818 نيوتن.متر.',
        'العملية الحسابية: 250.0 × 1.355818 = 338.95 نيوتن.متر.',
        'التحويل إلى رطل.بوصة: 250.0 × 12 = 3000 رطل.بوصة.'
      ],
      result: '250.0 رطل.قدم = 338.95 نيوتن.متر'
    },
    interpretation: 'تمنع تلف براغي المحركات وجنوط عجلات السيارات عبر ضبط مفتاح العزم بالقيمة الصحيحة.',
    assumptions: 'تأثير القوة العمودية المنتظمة على ذراع الرافعة.',
    limitations: 'تزييت سن البراغي يؤثر على قوة الشد الفعلية عند نفس قيمة العزم.',
    faqs: [
      { question: 'كيف أحول من lb-ft إلى N·m؟', answer: 'اضرب قيمة رطل.قدم في 1.35582 لتحصل مباشرة على العزم بوحدة نيوتن.متر.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} convierte valores de par motor y momento de fuerza entre Newtons-metro (N·m), Libras-pie (lbf·ft), Libras-pulgada (lbf·in) y Kilopondios-metro (kgf·m).`,
    howToUse: [
      'Introduzca el valor de par de apriete o par motor.',
      'Seleccione la unidad original (N·m, lb-ft, in-lb).',
      'Seleccione la unidad de destino.',
      'Consulte la calibración para llaves dinamométricas y manuales de taller.'
    ],
    formula: 'N·m base = Valor × Factor (1 lbf·ft ≈ 1,355818 N·m; 1 lbf·in ≈ 0,112985 N·m; 1 kgf·m = 9,80665 N·m)',
    formulaVariables: [
      { name: 'Par de torsión', description: 'Momento de giro (Fuerza × Brazo de palanca).', unit: 'Unidades de par', optional: false }
    ],
    workedExample: {
      scenario: 'Convertir 250,0 lb-ft de par motor a Newtons-metro (N·m).',
      stepByStep: [
        'Factor: 1 lb-ft = 1,355818 N·m.',
        'Cálculo: 250,0 lb-ft × 1,355818 = 338,95 N·m.',
        'A pulgadas-libra: 250,0 × 12 = 3.000 in-lb.'
      ],
      result: '250,0 lb-ft = 338,95 N·m = 3.000 in-lb'
    },
    interpretation: 'Vital para mecánicos en el apriete de culatas de motor y tornillos de ruedas de coche.',
    assumptions: 'Fuerza aplicada perpendicularmente al brazo de palanca.',
    limitations: 'La lubricación de las roscas altera la precarga axial para un mismo par.',
    faqs: [
      { question: '¿Cómo convertir lb-ft a N·m?', answer: 'Multiplique los pies-libra por 1,35582 para obtener Newtons-metro.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} convertit les couples de serrage mécanique et moments de force entre Newtons-mètres (N·m), Livres-pieds (lbf·ft), Livres-pouces (lbf·in) et Kilogrammes-mètres (kgf·m).`,
    howToUse: [
      'Saisissez la valeur de couple mécanique.',
      'Sélectionnez l\'unité de départ (N·m, lb-ft, in-lb).',
      'Sélectionnez l\'unité de destination.',
      'Réglez votre clé dynamométrique aux valeurs constructeur exactes.'
    ],
    formula: 'N·m = Valeur × Facteur (1 lbf·ft ≈ 1,355818 N·m ; 1 lbf·in ≈ 0,112985 N·m ; 1 kgf·m = 9,80665 N·m)',
    formulaVariables: [
      { name: 'Couple de torsion', description: 'Moment de force (Force × Longueur de bras).', unit: 'Unités de couple', optional: false }
    ],
    workedExample: {
      scenario: 'Conversion d\'un couple moteur de 250,0 lb-ft en Newtons-mètres (N·m).',
      stepByStep: [
        'Facteur de conversion : 1 lb-ft = 1,355818 N·m.',
        'Calcul : 250,0 × 1,355818 = 338,95 N·m.',
        'En livres-pouces : 250,0 × 12 = 3 000 in-lb.'
      ],
      result: '250,0 lb-ft = 338,95 N·m = 3 000 in-lb'
    },
    interpretation: 'Évite les ruptures de boulons de culasse et le desserrage des écrous de jantes automobiles.',
    assumptions: 'Application d\'une force perpendiculaire au bras de levier.',
    limitations: 'L\'état de lubrification des filetages modifie la tension de serrage effective.',
    faqs: [
      { question: 'Quelle est la formule pour convertir lb-ft en N·m ?', answer: 'Multipliez la valeur en lb-ft par 1,35582 pour obtenir des Newtons-mètres.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} rechnet Drehmomentwerte und Anzugsmomente zwischen Newtonmeter (N·m), Foot-pounds (lbf·ft), Inch-pounds (lbf·in) und Kilopondmeter (kgf·m) um.`,
    howToUse: [
      'Geben Sie das Motordrehmoment oder den Anzugswert ein.',
      'Wählen Sie die Ausgangseinheit (z. B. N·m oder lb-ft).',
      'Wählen Sie die Zieleinheit.',
      'Stellen Sie Ihren Drehmomentschlüssel exakt nach Herstellervorgabe ein.'
    ],
    formula: 'Basis N·m = Wert × Faktor (1 lbf·ft ≈ 1,355818 N·m; 1 lbf·in ≈ 0,112985 N·m; 1 kgf·m = 9,80665 N·m)',
    formulaVariables: [
      { name: 'Drehmoment', description: 'Rotationsmoment (Kraft × Hebelarm).', unit: 'Drehmomenteinheit', optional: false }
    ],
    workedExample: {
      scenario: 'Umrechnung eines Motordrehmoments von 250,0 lb-ft in Newtonmeter (N·m).',
      stepByStep: [
        'Umrechnungsfaktor: 1 lb-ft = 1,355818 N·m.',
        'Berechnung: 250,0 lb-ft × 1,355818 = 338,95 N·m.',
        'In Inch-pounds: 250,0 × 12 = 3.000 in-lb.'
      ],
      result: '250,0 lb-ft = 338,95 N·m = 3.000 in-lb'
    },
    interpretation: 'Verhindert das Überdrehen von Gewinden und Verziehen von Zylinderköpfen in der Kfz-Werkstatt.',
    assumptions: 'Rechtwinkliger Kraftansatz am Hebelarm.',
    limitations: 'Geölte oder trockene Schraubengewinde verändern die tatsächliche Vorspannkraft bei gleichem Anzugsmoment.',
    faqs: [
      { question: 'Wie rechnet man lb-ft in Nm um?', answer: 'Multiplizieren Sie Foot-pounds (lb-ft) mit 1,35582, um Newtonmeter (N·m) zu erhalten.' }
    ],
    relatedTools
  })
});

// 6. INTERNATIONAL SHOE SIZE CONVERTER (shoe-size)
export const SHOE_SIZE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} converts footwear shoe sizes across international regional standards including US, UK, European (EU), and Japanese/Mondopoint (CM) sizing charts for men, women, and children.`,
    howToUse: [
      'Select category (Men, Women, or Kids).',
      'Enter or choose your known regional shoe size (e.g., US 10 Men).',
      'Review matching international shoe sizes in EU, UK, and foot length in centimeters.'
    ],
    formula: 'EU Size ≈ (Foot Length cm + 1.5) × 1.5 | US Men ≈ 3 × Foot Length (inches) - 22 | UK ≈ US Men - 1',
    formulaVariables: [
      { name: 'Shoe Size', description: 'Regional sizing number.', unit: 'Size code', optional: false },
      { name: 'Gender / Category', description: 'Target demographic scale.', unit: 'Category', optional: false }
    ],
    workedExample: {
      scenario: 'Converting a US Men\'s size 10.0 shoe to UK, EU, and Foot Length in cm.',
      stepByStep: [
        'US Men size: 10.0.',
        'UK conversion: US - 1.0 = UK 9.0 (or 9.5 depending on brand last).',
        'EU conversion: US 10 corresponds to EU 43–44 (approx. 43.5 / 44).',
        'Foot length (Mondopoint): ~28.0 cm (11.0 inches).'
      ],
      result: 'US Men 10.0 = UK 9.0 / 9.5 = EU 43 / 44 = 28.0 cm'
    },
    interpretation: 'Prevents footwear sizing errors when purchasing shoes from international brands and global online retailers.',
    assumptions: 'Standard international footwear conversion tables.',
    limitations: 'Shoe manufacturers and athletic brands use proprietary lasts with slight fit variations.',
    faqs: [
      { question: 'What is the Mondopoint shoe system?', answer: 'Mondopoint is the universal ISO standard (ISO 9407) based on actual foot length in millimeters or centimeters.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحويل مقاسات الأحذية بين مختلف المعايير الإقليمية العالمية (الأمريكي US، البريطاني UK، الأوروبي EU، والياباني/السنتيمتر CM) للرجال والنساء والأطفال.`,
    howToUse: [
      'اختر الفئة المطلوبة (رجال، نساء، أطفال).',
      'أدخل مقاس الحذاء المعتاد لديك بنظامه الإقليمي (مثل المقاس الأمريكي US 10).',
      'اطلع على المقاس المطابق في النظام الأوروبي والبريطاني وطول القدم بالسنتيمتر.'
    ],
    formula: 'المقاس الأوروبي EU ≈ (طول القدم سم + 1.5) × 1.5 | المقاس البريطاني UK ≈ المقاس الأمريكي - 1',
    formulaVariables: [
      { name: 'مقاس الحذاء', description: 'رقم المقاس الإقليمي.', unit: 'رقم المقاس', optional: false }
    ],
    workedExample: {
      scenario: 'تحويل مقاس حذاء رجالي أمريكي US 10.0 إلى المقاس الأوروبي والبريطاني.',
      stepByStep: [
        'المقاس الأمريكي للرجال: US 10.0.',
        'المقاس البريطاني: UK 9.0 / 9.5.',
        'المقاس الأوروبي المطابق: EU 43 / 44.',
        'طول القدم المقابل: حوالي 28.0 سم.'
      ],
      result: 'US 10 رجالي = UK 9.5 = EU 43.5 / 44 = 28.0 سم'
    },
    interpretation: 'تضمن اختيار المقاس المثالي عند شراء الأحذية عبر الإنترنت من المتاجر العالمية.',
    assumptions: 'جداول تحويل المقاسات القياسية المعتمدة عالمياً.',
    limitations: 'قد تختلف قوالب التصنيع بشكل طفيف بين الماركات الرياضية والمصنعين.',
    faqs: [
      { question: 'ما هو نظام موندوبوينت (Mondopoint)؟', answer: 'هو المعيار القياسي الدولي (ISO) الذي يعتمد على قياس طول القدم الفعلي بالسنتيمتر أو المليمتر.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} convierte tallas de calzado entre estándares internacionales: EE. UU. (US), Reino Unido (UK), Europa (EU) y centímetros (CM / Mondopoint) para hombre, mujer y niños.`,
    howToUse: [
      'Seleccione la categoría (Hombre, Mujer o Infantil).',
      'Introduzca su talla habitual (ej. US 10 de hombre).',
      'Consulte la talla equivalente en la tabla europea, británica y en centímetros.'
    ],
    formula: 'Talla EU ≈ (Longitud pie cm + 1,5) × 1,5 | Talla UK ≈ Talla US Hombre - 1',
    formulaVariables: [
      { name: 'Talla', description: 'Número de calzado regional.', unit: 'Talla', optional: false }
    ],
    workedExample: {
      scenario: 'Convertir talla US 10 de hombre a UK y EU.',
      stepByStep: [
        'Talla US Hombre: 10,0.',
        'Equivalencia UK: UK 9,0 - 9,5.',
        'Equivalencia EU: EU 43 - 44.',
        'Longitud del pie: 28,0 cm.'
      ],
      result: 'US 10 Hombre = UK 9,5 = EU 43,5/44 = 28,0 cm'
    },
    interpretation: 'Evita errores y devoluciones al comprar zapatos o zapatillas en tiendas online extranjeras.',
    assumptions: 'Tablas de equivalencias estándar.',
    limitations: 'El ancho de horma varía según el fabricante de calzado.',
    faqs: [
      { question: '¿Cómo medir el pie correctamente en casa?', answer: 'Pise sobre un papel pegado a la pared, marque el talón y el dedo más largo, y mida la distancia en centímetros.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} convertit les pointures de chaussures entre les normes internationales : USA (US), Royaume-Uni (UK), Europe (EU) et Mondopoint (CM) pour hommes, femmes et enfants.`,
    howToUse: [
      'Sélectionnez la catégorie (Homme, Femme, Enfant).',
      'Indiquez votre pointure de référence (ex. US 10 Homme).',
      'Consultez la pointure équivalente en taille européenne, UK et longueur en cm.'
    ],
    formula: 'Pointure EU ≈ (Longueur pied cm + 1,5) × 1,5 | Pointure UK ≈ US Homme - 1',
    formulaVariables: [
      { name: 'Pointure', description: 'Taille de chaussure.', unit: 'Taille', optional: false }
    ],
    workedExample: {
      scenario: 'Conversion d\'une pointure homme US 10 en taille UK et EU.',
      stepByStep: [
        'Pointure US Homme : 10,0.',
        'Équivalence UK : UK 9,0 - 9,5.',
        'Équivalence EU : EU 43,5 - 44.',
        'Longueur de pied : 28,0 cm.'
      ],
      result: 'US 10 Homme = UK 9,5 = EU 43,5/44 = 28,0 cm'
    },
    interpretation: 'Pratique pour commander des baskets et souliers sur des sites internationaux sans risque de mauvaise taille.',
    assumptions: 'Grilles de pointures officielles.',
    limitations: 'Certaines marques chaussent plus grand ou plus étroit selon la forme de la semelle.',
    faqs: [
      { question: 'Qu\'est-ce que le système Mondopoint ?', answer: 'C\'est la norme ISO 9407 universelle mesurant la longueur exacte du pied en centimètres ou millimètres.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} rechnet Schuhgrößen zwischen internationalen Größensystemen um: US, UK, Europa (EU) und Zentimeter (Mondopoint / CM) für Herren, Damen und Kinder.`,
    howToUse: [
      'Wählen Sie die Kategorie (Herren, Damen oder Kinder).',
      'Geben Sie Ihre bekannte Schuhgröße ein (z. B. US 10 Herren).',
      'Lesen Sie die passende EU- und UK-Größe sowie die Fußlänge in cm ab.'
    ],
    formula: 'EU-Größe ≈ (Fußlänge cm + 1,5) × 1,5 | UK ≈ US Herren - 1',
    formulaVariables: [
      { name: 'Schuhgröße', description: 'Regionale Schuhgröße.', unit: 'Größe', optional: false }
    ],
    workedExample: {
      scenario: 'Umrechnung einer US-Herrengröße 10,0 in EU- und UK-Größen.',
      stepByStep: [
        'US-Herrengröße: 10,0.',
        'UK-Größe: UK 9,0 bis 9,5.',
        'EU-Größe: EU 43,5 bis 44.',
        'Fußlänge in Zentimetern: 28,0 cm.'
      ],
      result: 'US 10 Herren = UK 9,5 = EU 43,5/44 = 28,0 cm'
    },
    interpretation: 'Verhindert Fehlkäufe und Rücksendungen beim Online-Kauf internationaler Schuh- und Sneakermarken.',
    assumptions: 'Internationale Standard-Größentabellen.',
    limitations: 'Herstellerspezifische Leistenformen können im Tragegefühl variieren.',
    faqs: [
      { question: 'Was ist das Mondopoint-System?', answer: 'Ein internationales ISO-System (ISO 9407), das Schuhgrößen direkt nach der Fußlänge in Millimetern bzw. Zentimetern bemisst.' }
    ],
    relatedTools
  })
});

// 7. RING FINGER SIZE CONVERTER (ring-size)
export const RING_SIZE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} converts ring finger sizes across international jewelry sizing standards including US/Canada, UK/Australia, European (ISO 8653), and millimeter inside diameter and circumference measurements.`,
    howToUse: [
      'Select your known measurement type (e.g., US Size, UK Letter, or Inside Diameter mm).',
      'Enter the numerical value or letter.',
      'Review matching ring sizes across global jewelry charts and exact finger circumferences.'
    ],
    formula: 'EU Ring Size = Inside Circumference in mm = π × Inside Diameter mm | US Size ≈ (Inside Circumference mm - 36.5) / 2.55',
    formulaVariables: [
      { name: 'Ring Measurement', description: 'Size code, inside diameter, or circumference.', unit: 'Size / mm', optional: false }
    ],
    workedExample: {
      scenario: 'Converting a US size 7.0 engagement ring to UK size, EU size, and millimeters.',
      stepByStep: [
        'US Ring Size: 7.0.',
        'Inside diameter: 17.32 mm.',
        'Inside circumference: 17.32 mm × π = 54.4 mm.',
        'EU Size (ISO standard): Size 54.',
        'UK / Australian letter size: Size N½.'
      ],
      result: 'US Size 7.0 = UK Size N½ = EU Size 54 = 17.32 mm Diameter (54.4 mm Circumference)'
    },
    interpretation: 'Crucial for secretly sizing engagement rings, wedding bands, and online jewelry purchases without sizing mistakes.',
    assumptions: 'Standard ISO 8653 jeweler scale.',
    limitations: 'Wider ring bands (over 6 mm width) fit tighter and typically require ordering a half-size larger.',
    faqs: [
      { question: 'How do I find my ring size at home?', answer: 'Wrap a non-stretching strip of paper or string around the base of your finger, mark the overlap, measure the length in mm to get the circumference, and look up your size.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحويل مقاسات خواتم الأصابع بين معايير المجوهرات العالمية (الأمريكي/الكندي، البريطاني/الأسترالي، والأوروبي ISO)، وحساب القطر الداخلي والمحيط بالمليمتر.`,
    howToUse: [
      'اختر نوع القياس المتوفر لديك (مقاس أمريكي، حرف بريطاني، أو القطر الداخلي بالمليمتر).',
      'أدخل القيمة أو الرمز.',
      'اطلع على جدول المقاسات المطابقة عالمياً والمحيط الدقيق لإصبعك بالمليمتر.'
    ],
    formula: 'المقاس الأوروبي = محيط القطر الداخلي بالمليمتر (π × القطر الداخلي بالمليمتر)',
    formulaVariables: [
      { name: 'قياس الخاتم', description: 'رقم المقاس أو القطر الداخلي.', unit: 'مقاس / ملم', optional: false }
    ],
    workedExample: {
      scenario: 'تحويل مقاس خاتم خطوبة أمريكي US 7.0 إلى المقاس الأوروبي والبريطاني والمليمترات.',
      stepByStep: [
        'المقاس الأمريكي: US 7.0.',
        'القطر الداخلي: 17.32 ملم.',
        'المحيط الداخلي: 17.32 × π = 54.4 ملم.',
        'المقاس الأوروبي (ISO): مقاس 54.',
        'المقاس البريطاني: الحرف N½.'
      ],
      result: 'US 7.0 = بريطاني N½ = أوروبي 54 = قطر 17.32 ملم'
    },
    interpretation: 'ضرورية لشراء خواتم الخطوبة والزواج عبر الإنترنت وضمان ملاءمتها للأصابع دون الحاجة لتعديل المقاس لاحقاً.',
    assumptions: 'معيار ISO 8653 القياسي لصياغة الذهب والمجوهرات.',
    limitations: 'الخواتم العريضة (أكثر من 6 ملم) تكون أضيق في الارتداء وتتطلب زيادة نصف مقاس.',
    faqs: [
      { question: 'كيف أقيس مقاس إصبعي في المنزل؟', answer: 'لف شريطاً ورقياً حول قاعدة إصبعك، وضع علامة عند نقطة الالتقاء، وقس طول الشريط بالمسطرة بالمليمتر لتحديد المحيط.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} convierte tallas de anillos de joyería entre sistemas internacionales (EE. UU., Reino Unido, Europa ISO 8653) y calcula el diámetro y circunferencia interior en milímetros.`,
    howToUse: [
      'Seleccione su estándar conocido (talla US, letra UK o diámetro en mm).',
      'Introduzca el valor.',
      'Consulte la tabla de equivalencias de joyería internacional.'
    ],
    formula: 'Talla europea (EU) = Circunferencia interior en mm = π × Diámetro interior mm',
    formulaVariables: [
      { name: 'Medida', description: 'Talla o diámetro interior.', unit: 'Talla / mm', optional: false }
    ],
    workedExample: {
      scenario: 'Convertir talla US 7,0 de anillo a medidas europeas y británicas.',
      stepByStep: [
        'Talla US: 7,0.',
        'Diámetro interior: 17,32 mm.',
        'Circunferencia: 17,32 mm × π = 54,4 mm.',
        'Talla europea ISO: 54.',
        'Talla británica: Letra N½.'
      ],
      result: 'Talla US 7,0 = Talla UK N½ = Talla EU 54 = 17,32 mm de diámetro'
    },
    interpretation: 'Imprescindible para elegir alianzas de boda y anillos de compromiso por internet con total precisión.',
    assumptions: 'Norma internacional ISO 8653 para joyería.',
    limitations: 'Los anillos de banda ancha (más de 6 mm) suelen requerir media talla más.',
    faqs: [
      { question: '¿Cuál es la mejor hora del día para medir el dedo?', answer: 'Al final de la tarde, cuando los dedos se encuentran a temperatura templada y tamaño normal.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} convertit la taille des bagues et alliances selon les standards internationaux (US, UK, Europe ISO 8653) et calcule le diamètre et la circonférence en millimètres.`,
    howToUse: [
      'Sélectionnez votre référence (taille US, lettre UK ou diamètre intérieur en mm).',
      'Indiquez la mesure.',
      'Consultez la taille exacte correspondante dans le baguier international.'
    ],
    formula: 'Taille française/EU = Circonférence intérieure en mm = π × Diamètre intérieur mm',
    formulaVariables: [
      { name: 'Taille de bague', description: 'Pointure ou diamètre.', unit: 'Taille / mm', optional: false }
    ],
    workedExample: {
      scenario: 'Conversion d\'une bague de fiançailles taille US 7,0 en taille française et millimètres.',
      stepByStep: [
        'Taille US : 7,0.',
        'Diamètre intérieur : 17,32 mm.',
        'Circonférence intérieure : 17,32 mm × π = 54,4 mm.',
        'Taille française (EU ISO) : 54.',
        'Taille UK : Lettre N½.'
      ],
      result: 'Taille US 7,0 = Taille UK N½ = Taille FR 54 = 17,32 mm de diamètre'
    },
    interpretation: 'Idéal pour commander des alliances et solitaires en ligne sans risque d\'erreur de diamètre.',
    assumptions: 'Norme de bijouterie ISO 8653.',
    limitations: 'Les anneaux très larges nécessitent généralement une demi-taille supérieure.',
    faqs: [
      { question: 'À quoi correspond la taille de bague en France ?', answer: 'La taille française correspond directement à la circonférence intérieure de la bague en millimètres (ex. taille 54 = 54 mm de tour).' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} rechnet Ringgrößen zwischen internationalen Schmuck-Standards um (US, UK, Europa ISO 8653) und ermittelt den exakten Innendurchmesser und Innenumfang in Millimetern.`,
    howToUse: [
      'Wählen Sie den Ihnen bekannten Maßstab (z. B. US-Größe, UK-Buchstabe oder Innendurchmesser in mm).',
      'Geben Sie den Wert ein.',
      'Lesen Sie die passende internationale Ringgröße und den Umfang in Millimetern ab.'
    ],
    formula: 'EU-Ringgröße = Innenumfang in mm = π × Innendurchmesser in mm',
    formulaVariables: [
      { name: 'Ringmaß', description: 'Größencode oder Durchmesser.', unit: 'Größe / mm', optional: false }
    ],
    workedExample: {
      scenario: 'Umrechnung eines Verlobungsrings der US-Größe 7,0 in deutsche/EU-Größen.',
      stepByStep: [
        'US-Größe: 7,0.',
        'Innendurchmesser: 17,32 mm.',
        'Innenumfang: 17,32 mm × π = 54,4 mm.',
        'Deutsche / EU-Größe: Ringgröße 54.',
        'UK-Buchstabengröße: N½.'
      ],
      result: 'US-Größe 7,0 = UK N½ = EU-Größe 54 = 17,32 mm Durchmesser (54,4 mm Umfang)'
    },
    interpretation: 'Unverzichtbar beim diskreten Kauf von Verlobungsringen und Trauringen im Online-Handel.',
    assumptions: 'ISO 8653 Juwelier-Standardnorm.',
    limitations: 'Breite Ringschienen (über 6 mm) sitzen enger und erfordern meist eine halbe Nummer größer.',
    faqs: [
      { question: 'Wie bestimmt man die Ringgröße in Deutschland?', answer: 'In Deutschland und Europa entspricht die Ringgröße dem Innenumfang des Rings in Millimetern (z. B. 54 mm Umfang = Größe 54).' }
    ],
    relatedTools
  })
});

// 8. TIRE SIZE & SPEEDOMETER ERROR CALCULATOR (tire-size)
export const TIRE_SIZE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} compares automotive tire dimensions (width, aspect ratio, wheel diameter) and calculates differences in overall tire diameter, sidewall height, circumference, and resulting speedometer error percentage.`,
    howToUse: [
      'Enter stock tire specifications (e.g., 225 / 45 R 17).',
      'Enter new proposed aftermarket tire specifications (e.g., 225 / 40 R 18).',
      'Compare diameter difference and review the corrected speedometer reading at 60 mph (100 km/h).'
    ],
    formula: 'Sidewall Height = Width × (Aspect Ratio / 100) | Overall Diameter = (Wheel Rim " × 25.4) + (2 × Sidewall Height) | Speedometer Error % = (New Diameter - Old Diameter) / Old Diameter × 100',
    formulaVariables: [
      { name: 'Tire Width', description: 'Tire cross-section width.', unit: 'Millimeters (mm)', optional: false },
      { name: 'Aspect Ratio', description: 'Sidewall height as percentage of width.', unit: 'Percentage %', optional: false },
      { name: 'Wheel Rim', description: 'Wheel rim diameter.', unit: 'Inches (")', optional: false }
    ],
    workedExample: {
      scenario: 'Comparing stock tire 205/55R16 against plus-sized replacement 225/45R17.',
      stepByStep: [
        'Stock tire diameter: (16 × 25.4) + (2 × 205 × 0.55) = 406.4 + 225.5 = 631.9 mm (24.88").',
        'New tire diameter: (17 × 25.4) + (2 × 225 × 0.45) = 431.8 + 202.5 = 634.3 mm (24.97").',
        'Diameter difference: +2.4 mm (+0.38% change).',
        'Speedometer reading at 60.0 mph: 60 × (634.3 / 631.9) = 60.23 mph.'
      ],
      result: 'Diameter: +2.4 mm (+0.38%) | Speedometer at 60 mph reads 60.2 mph (Well within safe ±3% tolerance)'
    },
    interpretation: 'Ensures custom aftermarket alloy wheels and tires remain within safe vehicle suspension clearance and speedometer calibration limits (±3%).',
    assumptions: 'New unworn tire tread depth.',
    limitations: 'Tire wear (tread loss) reduces actual diameter by 6–10 mm over tire lifespan.',
    faqs: [
      { question: 'What is the safe allowable diameter difference when upsizing wheels?', answer: 'Automotive engineers recommend keeping total tire diameter change within ±3% of the factory stock size to prevent ABS/ESP errors and speedometer distortion.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بمقارنة مقاسات إطارات السيارات (العرض، نسبة الارتفاع، قطر الجنط) وحساب الفارق في القطر الكلي، وارتفاع الجدار الجانبي، ومحيط الدوران، ونسبة خطأ عداد السرعة.`,
    howToUse: [
      'أدخل مقاس الإطار الأصلي للسيارة (مثل 205/55R16).',
      'أدخل مقاس الإطار الجديد المقترح (مثل 225/45R17).',
      'اطلع على فارق القطر الكلي ونسبة التغير وسرعة السيارة الحقيقية على العداد.'
    ],
    formula: 'ارتفاع الجدار = العرض × (نسبة الارتفاع ÷ 100) | القطر الكلي = (قطر الجنط × 25.4) + (2 × ارتفاع الجدار)',
    formulaVariables: [
      { name: 'عرض الإطار', description: 'عرض المداس بالمليمتر.', unit: 'ملم', optional: false },
      { name: 'نسبة الارتفاع', description: 'ارتفاع الجدار كنسبة مئوية من العرض.', unit: '%', optional: false },
      { name: 'قطر الجنط', description: 'مقاس الجنط المعدني.', unit: 'بوصة', optional: false }
    ],
    workedExample: {
      scenario: 'مقارنة إطار أصلي 205/55R16 بإطار معدل 225/45R17.',
      stepByStep: [
        'قطر الإطار الأصلي: (16 × 25.4) + (2 × 205 × 0.55) = 631.9 ملم.',
        'قطر الإطار الجديد: (17 × 25.4) + (2 × 225 × 0.45) = 634.3 ملم.',
        'فارق القطر: +2.4 ملم (زيادة بنسبة +0.38%).',
        'قراءة عداد السرعة عند 100 كم/س: تصبح 100.38 كم/س.'
      ],
      result: 'فارق القطر: +2.4 ملم (+0.38%) | قراءة العداد عند 100 كم/س: 100.4 كم/س (ضمن النطاق الآمن)'
    },
    interpretation: 'تضمن سلامة تعديل جنوط وإطارات السيارات وتفادي احتكاك العجلات بهيكل السيارة أو التأثير على أنظمة الفرامل ABS.',
    assumptions: 'إطارات جديدة بعمق مداس قياسي.',
    limitations: 'تآكل مداس الإطار مع الاستهلاك ينقص القطر بمقدار 6 إلى 10 ملم.',
    faqs: [
      { question: 'ما هو الفارق المسموح به عند تغيير مقاس جنوط السيارة؟', answer: 'يوصي خبراء السيارات بألا يتجاوز الفارق في القطر الكلي للإطار نسبة ±3% مقارنة بمقاس المصنع الأصلي.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} compara dimensiones de neumáticos (anchura, perfil, diámetro de llanta) y calcula la variación de diámetro exterior, altura de flanco y el error resultante en el velocímetro.`,
    howToUse: [
      'Introduzca la medida del neumático original (ej. 205/55 R16).',
      'Introduzca la medida del nuevo neumático (ej. 225/45 R17).',
      'Compruebe la variación de diámetro y la lectura corregida del velocímetro.'
    ],
    formula: 'Altura perfil = Ancho × (Perfil / 100) | Diámetro total = (Llanta " × 25,4) + (2 × Altura perfil)',
    formulaVariables: [
      { name: 'Anchura', description: 'Anchura de la banda de rodadura.', unit: 'mm', optional: false },
      { name: 'Perfil', description: 'Relación de aspecto.', unit: '%', optional: false },
      { name: 'Llanta', description: 'Diámetro de llanta.', unit: 'Pulgadas (")', optional: false }
    ],
    workedExample: {
      scenario: 'Comparar neumático de serie 205/55R16 con 225/45R17.',
      stepByStep: [
        'Diámetro original: (16 × 25,4) + (2 × 205 × 0,55) = 631,9 mm.',
        'Diámetro nuevo: (17 × 25,4) + (2 × 225 × 0,45) = 634,3 mm.',
        'Diferencia: +2,4 mm (+0,38% de incremento).',
        'Velocímetro a 100 km/h marcará 100,4 km/h.'
      ],
      result: 'Diferencia: +2,4 mm (+0,38%) | Velocímetro a 100 km/h: 100,4 km/h (Homologable, < 3%)'
    },
    interpretation: 'Fundamental para verificar equivalencias de neumáticos y pasar la ITV sin problemas de homologación.',
    assumptions: 'Neumático nuevo con banda de rodadura completa.',
    limitations: 'El desgaste del neumático reduce el diámetro real entre 6 y 10 mm a lo largo de su vida útil.',
    faqs: [
      { question: '¿Cuál es el margen de equivalencia legal para neumáticos?', answer: 'La normativa técnica permite habitualmente una variación máxima de ±3% respecto al diámetro original homologado.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} compare les dimensions de pneus (largeur, hauteur du flanc, diamètre de jante) et calcule l'écart de diamètre total, de circonférence et l'erreur de vitesse au compteur.`,
    howToUse: [
      'Indiquez la dimension du pneu d\'origine (ex. 205/55 R16).',
      'Indiquez la nouvelle dimension envisagée (ex. 225/45 R17).',
      'Vérifiez la différence de diamètre et la vitesse réelle affichée au compteur.'
    ],
    formula: 'Hauteur flanc = Largeur × (Série / 100) | Diamètre total = (Jante " × 25,4) + (2 × Hauteur flanc)',
    formulaVariables: [
      { name: 'Largeur', description: 'Largeur de bande en mm.', unit: 'mm', optional: false },
      { name: 'Hauteur / Série', description: 'Rapport d\'aspect.', unit: '%', optional: false },
      { name: 'Jante', description: 'Diamètre intérieur de la roue.', unit: 'Pouces (")', optional: false }
    ],
    workedExample: {
      scenario: 'Comparaison entre pneu d\'origine 205/55R16 et pneu 225/45R17.',
      stepByStep: [
        'Diamètre d\'origine : (16 × 25,4) + (2 × 205 × 0,55) = 631,9 mm.',
        'Nouveau diamètre : (17 × 25,4) + (2 × 225 × 0,45) = 634,3 mm.',
        'Écart : +2,4 mm (+0,38% de variation).',
        'Vitesse réelle à 100 km/h au compteur : 100,4 km/h.'
      ],
      result: 'Écart : +2,4 mm (+0,38%) | Vitesse à 100 km/h : 100,4 km/h (Conforme à la tolérance de 3%)'
    },
    interpretation: 'Permet de vérifier la compatibilité des jantes aluminium avec le contrôle technique et les systèmes ABS/ESP.',
    assumptions: 'Pneu neuf aux cotes manufacturier.',
    limitations: 'L\'usure normale de la gomme réduit la hauteur du pneu au fil des kilomètres.',
    faqs: [
      { question: 'Quelle est la tolérance autorisée pour changer de pneus ?', answer: 'La tolérance réglementaire est généralement de ±3% sur le diamètre extérieur du pneu.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} vergleicht Reifengrößen (Reifenbreite, Querschnittsverhältnis, Felgendurchmesser) und berechnet Abrollumfang, Gesamtdurchmesser und die Tachoabweichung.`,
    howToUse: [
      'Geben Sie die Original-Reifengröße ein (z. B. 205/55 R16).',
      'Geben Sie die gewünschte neue Reifengröße ein (z. B. 225/45 R17).',
      'Prüfen Sie Durchmesserdifferenz, Abrollumfang und die angezeigte Tachogeschwindigkeit.'
    ],
    formula: 'Flankenhöhe = Breite × (Querschnitt / 100) | Gesamtdurchmesser = (Felge " × 25,4) + (2 × Flankenhöhe)',
    formulaVariables: [
      { name: 'Reifenbreite', description: 'Breite der Lauffläche.', unit: 'mm', optional: false },
      { name: 'Querschnitt', description: 'Flankenhöhe in Prozent der Breite.', unit: '%', optional: false },
      { name: 'Felgengröße', description: 'Felgendurchmesser.', unit: 'Zoll (")', optional: false }
    ],
    workedExample: {
      scenario: 'Vergleich Serienbereifung 205/55R16 mit Tuning-Rad 225/45R17.',
      stepByStep: [
        'Original-Durchmesser: (16 × 25,4) + (2 × 205 × 0,55) = 631,9 mm.',
        'Neuer Durchmesser: (17 × 25,4) + (2 × 225 × 0,45) = 634,3 mm.',
        'Differenz: +2,4 mm (+0,38% Zuwachs).',
        'Tachoanzeige bei realen 100 km/h: 100,4 km/h.'
      ],
      result: 'Durchmesser-Differenz: +2,4 mm (+0,38%) | Tacho bei 100 km/h: 100,4 km/h (TÜV-konform, < ±3%)'
    },
    interpretation: 'Gewährleistet die Zulässigkeit beim Felgenkauf und verhindert Tachoangleichungen beim TÜV.',
    assumptions: 'Neureifenprofil ohne Abnutzung.',
    limitations: 'Profilabnutzung verringert den Reifendurchmesser über die Lebensdauer um bis zu 8 mm.',
    faqs: [
      { question: 'Wie viel Tachoabweichung ist beim Reifenkauf erlaubt?', answer: 'Der Tacho darf niemals zu wenig anzeigen. Der Durchmesser darf maximal um -2,5% bis +1,5% (bzw. ±3%) abweichen.' }
    ],
    relatedTools
  })
});

// 9. LOREM IPSUM PLACEHOLDER GENERATOR (lorem-ipsum)
export const LOREM_IPSUM_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} generates classic pseudo-Latin dummy placeholder text (Lorem ipsum dolor sit amet...) structured into paragraphs, sentences, or word counts for web design, UI layouts, and print mockups.`,
    howToUse: [
      'Select generation unit (Paragraphs, Sentences, or Words).',
      'Specify the required quantity count.',
      'Toggle options like "Start with Lorem ipsum dolor sit amet...".',
      'Copy the generated placeholder text directly into your design layout.'
    ],
    formula: 'Draws pseudo-Latin words from Cicero\'s classical philosophical treatise "De Finibus Bonorum et Malorum" (45 BC) to create balanced typographic text distributions',
    formulaVariables: [
      { name: 'Quantity', description: 'Count of units to generate.', unit: 'Count', optional: false },
      { name: 'Unit Type', description: 'Paragraphs, sentences, or individual words.', unit: 'Type', optional: false }
    ],
    workedExample: {
      scenario: 'Generating 1 paragraph of standard placeholder text starting with classical lead-in.',
      stepByStep: [
        'Select unit: 1 paragraph.',
        'Inject canonical lead-in: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...".',
        'Produce syntactically varied sentence lengths to simulate real human copy.'
      ],
      result: 'Generated 1 cohesive paragraph of formatted dummy text (~50-80 words)'
    },
    interpretation: 'Allows UI/UX designers and typesetters to showcase typography, visual balance, and grid spacing without client distraction from readable copy.',
    assumptions: 'Classical pseudo-Latin lexicon.',
    limitations: 'Intended purely as temporary visual dummy text and should never remain in published production websites.',
    faqs: [
      { question: 'Where does Lorem Ipsum come from?', answer: 'It is derived from sections 1.10.32 and 1.10.33 of Cicero\'s "De Finibus Bonorum et Malorum" written in 45 BC.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتوليد نصوص تجريبية وهمية نائبة (Lorem Ipsum) مقسمة إلى فقرات أو جمل أو كلمات لاستخدامها في تصميم المواقع والمطبوعات وتنسيق الخطوط.`,
    howToUse: [
      'اختر نوع الوحدة (فقرات، جمل، أو كلمات).',
      'حدد العدد المطلوب توليده.',
      'اختر البدء بالنص الكلاسيكي (Lorem ipsum dolor sit amet...).',
      'انسخ النص التجريبي وألصقه في تصميمك أو قالبك.'
    ],
    formula: 'توليد كلمات ونصوص تجريبية ذات توزيع بصري متوازن للحروف لمحاكاة النصوص الحقيقية',
    formulaVariables: [
      { name: 'الكمية', description: 'عدد الفقرات أو الكلمات المطلوبة.', unit: 'عدد', optional: false }
    ],
    workedExample: {
      scenario: 'توليد فقرة واحدة من النص التجريبي القياسي.',
      stepByStep: [
        'تحديد الوحدة: 1 فقرة.',
        'إدراج العبارة الكلاسيكية الافتتاحية.',
        'إنشاء جمل متباينة الأطوال لمحاكاة القراءة الطبيعية.'
      ],
      result: 'فقرة تجريبية متناسقة بطول 50 إلى 80 كلمة'
    },
    interpretation: 'تسمح للمصممين بالتركيز على التنسيق البصري وتوزيع الخطوط والمساحات دون تشتيت الانتباه بمحتوى النص.',
    assumptions: 'توزيع نصي محاكي للغة الطبيعية.',
    limitations: 'نصوص شكلية نائبة يجب استبدالها بالمحتوى الفعلي قبل إطلاق المواقع.',
    faqs: [
      { question: 'لماذا يستخدم المصممون نص لوريم إيبسوم؟', answer: 'لأنه يوفر توزيعاً بصرياً واقعياً ومتوازناً للأحرف والمسافات يماثل النصوص الحقيقية دون جذب انتباه العميل لقراءة المحتوى.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} genera texto de relleno ficticio clásico (Lorem ipsum dolor sit amet...) estructurado en párrafos, frases o palabras para diseño web, maquetación y pruebas de interfaz.`,
    howToUse: [
      'Seleccione la unidad (Párrafos, Frases o Palabras).',
      'Indique la cantidad deseada.',
      'Active o desactive el inicio clásico "Lorem ipsum...".',
      'Copie el texto simulado para su maqueta de diseño.'
    ],
    formula: 'Distribución equilibrada de palabras en pseudolatín basadas en el texto clásico de Cicerón (45 a.C.)',
    formulaVariables: [
      { name: 'Cantidad', description: 'Número de elementos a generar.', unit: 'Entero', optional: false }
    ],
    workedExample: {
      scenario: 'Generar 1 párrafo de texto de relleno.',
      stepByStep: [
        'Seleccionar 1 párrafo.',
        'Incluir encabezado canónico "Lorem ipsum dolor sit amet...".',
        'Componer frases de longitud variada.'
      ],
      result: 'Párrafo maquetado de 50 a 80 palabras'
    },
    interpretation: 'Permite a diseñadores UI/UX y maquetadores presentar composiciones visuales sin distracciones de contenido.',
    assumptions: 'Léxico latino tradicional.',
    limitations: 'Texto provisional que debe sustituirse por contenido real antes de publicar.',
    faqs: [
      { question: '¿Cuál es el origen de Lorem Ipsum?', answer: 'Proviene del tratado filosófico de Cicerón "De Finibus Bonorum et Malorum", escrito en el año 45 a.C.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} génère du faux-texte de remplissage (Lorem ipsum dolor sit amet...) calibré en paragraphes, phrases ou mots pour le webdesign et la mise en page PAO.`,
    howToUse: [
      'Choisissez le type d\'unité (Paragraphes, Phrases, Mots).',
      'Indiquez le nombre souhaité.',
      'Cochez l\'option de début standard "Lorem ipsum...".',
      'Copiez le faux-texte dans votre maquette.'
    ],
    formula: 'Assemblage de termes pseudo-latins issus du traité de Cicéron pour une distribution typographique naturelle',
    formulaVariables: [
      { name: 'Quantité', description: 'Nombre d\'unités.', unit: 'Nombre', optional: false }
    ],
    workedExample: {
      scenario: 'Génération d\'un paragraphe de faux-texte.',
      stepByStep: [
        'Sélection : 1 paragraphe.',
        'Ajout de l\'amorce classique "Lorem ipsum dolor sit amet...".',
        'Génération de phrases rythmées.'
      ],
      result: '1 paragraphe de texte factice (~60 mots)'
    },
    interpretation: 'Aide les graphistes à valider la hiérarchie visuelle et l\'espacement des polices de caractères.',
    assumptions: 'Corpus latin classique.',
    limitations: 'Texte d\'attente à remplacer impérativement avant la mise en ligne.',
    faqs: [
      { question: 'Pourquoi utiliser du faux-texte plutôt que du vrai texte ?', answer: 'Pour éviter que le lecteur ne se concentre sur le sens du texte plutôt que sur le design et la typographie.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} erzeugt klassischen pseudo-lateinischen Blindtext (Lorem ipsum dolor sit amet...) nach Absätzen, Sätzen oder Wörtern für Webdesign, Layouts und Druckvorlagen.`,
    howToUse: [
      'Wählen Sie die Einheit (Absätze, Sätze oder Wörter).',
      'Geben Sie die gewünschte Menge ein.',
      'Aktivieren Sie bei Bedarf die Einleitung "Lorem ipsum dolor sit amet...".',
      'Kopieren Sie den Blindtext direkt in Ihr Layout.'
    ],
    formula: 'Generierung von Textpassagen auf Basis von Ciceros klassischem Werk "De Finibus Bonorum et Malorum" (45 v. Chr.)',
    formulaVariables: [
      { name: 'Menge', description: 'Anzahl der Einheiten.', unit: 'Anzahl', optional: false }
    ],
    workedExample: {
      scenario: 'Erzeugung von 1 Absatz standardisiertem Blindtext.',
      stepByStep: [
        'Auswahl: 1 Absatz.',
        'Klassische Einleitung voranstellen.',
        'Satzstrukturen mit natürlicher Längenvariation erzeugen.'
      ],
      result: '1 typografisch harmonischer Blindtext-Absatz (~50-80 Wörter)'
    },
    interpretation: 'Ermöglicht Grafikern und Entwicklern die Beurteilung von Schriftbild und Weißraum ohne inhaltliche Ablenkung.',
    assumptions: 'Lateinisches Standardlexikon.',
    limitations: 'Reiner Platzhaltertext, der vor dem Produktivgang durch echte Inhalte ersetzt werden muss.',
    faqs: [
      { question: 'Woher stammt Lorem Ipsum?', answer: 'Aus Ciceros philosophischem Werk "De Finibus Bonorum et Malorum" aus dem Jahr 45 vor Christus.' }
    ],
    relatedTools
  })
});

// 10. WORD & KEYWORD FREQUENCY DENSITY ANALYZER (word-frequency)
export const WORD_FREQUENCY_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} analyzes text passages to calculate individual word frequencies, keyword occurrence counts, and density percentages with optional stop-word filtering for SEO content optimization.`,
    howToUse: [
      'Paste your article or copy into the text input area.',
      'Toggle stop-word exclusion (filtering out common words like "the", "and", "is").',
      'Inspect the ranked list of top keywords, occurrence counts, and density percentages.'
    ],
    formula: 'Keyword Density % = (Keyword Count / Total Words in Text) × 100',
    formulaVariables: [
      { name: 'Word Count', description: 'Number of occurrences of specific word.', unit: 'Count', optional: false },
      { name: 'Total Words', description: 'Total word count of document.', unit: 'Total words', optional: false }
    ],
    workedExample: {
      scenario: 'Analyzing an 800-word article where the keyword "calculator" appears 16 times.',
      stepByStep: [
        'Total document word count: 800 words.',
        'Target keyword occurrences: 16 times.',
        'Calculate density percentage: (16 / 800) × 100 = 2.00%.'
      ],
      result: 'Keyword "calculator": 16 Occurrences | Density: 2.00% (Optimal SEO Range: 1-3%)'
    },
    interpretation: 'Helps copywriters optimize on-page SEO keyword density while avoiding search engine keyword stuffing penalties.',
    assumptions: 'Case-insensitive word tokenization.',
    limitations: 'Stemming variations (e.g., "calculate" vs "calculating") are counted as distinct tokens unless lemmatized.',
    faqs: [
      { question: 'What is the ideal keyword density for SEO?', answer: 'Most SEO experts recommend a keyword density between 1% and 2.5% to maintain natural readability and avoid search engine penalties.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحليل النصوص لحساب تكرار الكلمات والمفردات المفتاحية، ونسبة الكثافة المئوية (Keyword Density) مع استبعاد الكلمات الشائعة لتحسين السيو ومحركات البحث.`,
    howToUse: [
      'ألصق المقال أو المحتوى في مربع التحليل.',
      'اختر تفعيل فلتر استبعاد حروف الجر والكلمات الشائعة.',
      'راجع جدول الكلمات الأكثر تكراراً، وعدد مرات ظهورها، ونسبة كثافتها المئوية.'
    ],
    formula: 'كثافة الكلمة المفتاحية % = (عدد مرات تكرار الكلمة ÷ إجمالي كلمات النص) × 100',
    formulaVariables: [
      { name: 'تكرار الكلمة', description: 'عدد مرات ظهور الكلمة المفتاحية.', unit: 'تكرار', optional: false },
      { name: 'إجمالي الكلمات', description: 'مجموع كلمات المقال الكلي.', unit: 'كلمة', optional: false }
    ],
    workedExample: {
      scenario: 'تحليل مقال يحتوي على 800 كلمة تكررت فيه كلمة "حاسبة" 16 مرة.',
      stepByStep: [
        'إجمالي كلمات المقال: 800 كلمة.',
        'تكرار الكلمة المستهدفة: 16 مرة.',
        'حساب نسبة الكثافة: (16 ÷ 800) × 100 = 2.00%.'
      ],
      result: 'كلمة "حاسبة": 16 تكراراً | الكثافة: 2.00% (معدل مثالي للسيو)'
    },
    interpretation: 'تساعد كتاب المحتوى على تحسين تصدر المقالات لمحركات البحث وتجنب الحشو الزائد للكلمات المفتاحية.',
    assumptions: 'معالجة الكلمات وتجزئتها بصورة غير حساسة لحالة الأحرف.',
    limitations: 'تُحسب مشتقات الكلمات المختلفة ككلمات منفصلة.',
    faqs: [
      { question: 'ما هي النسبة المثالية لكثافة الكلمات المفتاحية في السيو؟', answer: 'تتراوح النسبة المثالية بين 1% إلى 2.5% للحفاظ على سلاسة القراءة الطبيعية وتفادي عقوبات محركات البحث.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} analiza textos para calcular la frecuencia de repetición de palabras y el porcentaje de densidad de palabras clave con filtro de palabras vacías (stop words) para SEO.`,
    howToUse: [
      'Pegue su artículo o texto en el analizador.',
      'Active el filtro de palabras comunes (artículos, preposiciones).',
      'Consulte la tabla de palabras clave más frecuentes y su porcentaje de densidad.'
    ],
    formula: 'Densidad % = (Apariciones de la palabra / Total de palabras) × 100',
    formulaVariables: [
      { name: 'Apariciones', description: 'Número de veces que aparece el término.', unit: 'Recuento', optional: false },
      { name: 'Total palabras', description: 'Longitud del texto.', unit: 'Palabras', optional: false }
    ],
    workedExample: {
      scenario: 'Artículo de 800 palabras donde la palabra "calculadora" aparece 16 veces.',
      stepByStep: [
        'Total de palabras: 800.',
        'Apariciones de "calculadora": 16.',
        'Cálculo de densidad: (16 / 800) × 100 = 2,00%.'
      ],
      result: 'Palabra "calculadora": 16 veces | Densidad: 2,00% (Rango SEO óptimo)'
    },
    interpretation: 'Ayuda a redactores a optimizar contenidos web evitando penalizaciones por saturación de palabras clave (keyword stuffing).',
    assumptions: 'Conteo insensible a mayúsculas y minúsculas.',
    limitations: 'Palabras derivadas o plurales se contabilizan como términos independientes.',
    faqs: [
      { question: '¿Qué es el Keyword Stuffing?', answer: 'Es la práctica abusiva de repetir excesivamente una palabra clave, penalizada por los algoritmos de Google.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} analyse vos articles pour calculer la fréquence des mots et le pourcentage de densité des mots-clés avec exclusion des mots vides pour optimiser le SEO.`,
    howToUse: [
      'Collez votre texte dans l\'analyseur.',
      'Activez le filtrage des mots de liaison courants (le, la, de, et).',
      'Analysez le classement des mots-clés et leur taux de densité.'
    ],
    formula: 'Densité % = (Nombre d\'occurrences / Nombre total de mots) × 100',
    formulaVariables: [
      { name: 'Occurrences', description: 'Nombre de répétitions du mot.', unit: 'Nombre', optional: false },
      { name: 'Total mots', description: 'Nombre de mots du texte.', unit: 'Mots', optional: false }
    ],
    workedExample: {
      scenario: 'Analyse d\'un article de 800 mots où le mot "calculatrice" apparaît 16 fois.',
      stepByStep: [
        'Total des mots : 800.',
        'Occurrences du mot : 16.',
        'Calcul de densité : (16 / 800) × 100 = 2,00%.'
      ],
      result: 'Mot "calculatrice" : 16 occurrences | Densité : 2,00% (Idéal SEO)'
    },
    interpretation: 'Permet d\'optimiser la rédaction web sans risquer de pénalité algorithmique pour sur-optimisation.',
    assumptions: 'Analyse insensible à la casse.',
    limitations: 'Les formes fléchies et pluriels sont comptés séparément.',
    faqs: [
      { question: 'Quelle est la densité de mot-clé recommandée en SEO ?', answer: 'Une densité comprise entre 1 % et 2,5 % est généralement considérée comme idéale et naturelle.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} analysiert Texte auf die Häufigkeit einzelner Wörter und berechnet die Keyword-Dichte in Prozent mit Stoppwort-Filterung zur Suchmaschinenoptimierung (SEO).`,
    howToUse: [
      'Fügen Sie Ihren Text in das Analysefeld ein.',
      'Aktivieren Sie den Stoppwort-Filter für Füllwörter (der, die, das, und).',
      'Prüfen Sie die Rangliste der häufigsten Suchbegriffe und deren prozentuale Dichte.'
    ],
    formula: 'Keyword-Dichte % = (Anzahl des Suchbegriffs / Gesamtwortanzahl) × 100',
    formulaVariables: [
      { name: 'Häufigkeit', description: 'Vorkommen des Begriffs.', unit: 'Anzahl', optional: false },
      { name: 'Gesamtwörter', description: 'Gesamtlänge des Dokuments.', unit: 'Wörter', optional: false }
    ],
    workedExample: {
      scenario: 'Analyse eines 800-Wörter-Artikels mit 16 Vorkommen des Keywords "Rechner".',
      stepByStep: [
        'Gesamtwörter im Text: 800.',
        'Vorkommen von "Rechner": 16.',
        'Dichteberechnung: (16 / 800) × 100 = 2,00%.'
      ],
      result: 'Keyword "Rechner": 16 Vorkommen | Dichte: 2,00% (Optimaler SEO-Bereich)'
    },
    interpretation: 'Unterstützt Content-Autoren bei der perfekten Keyword-Gewichtung ohne Keyword-Stuffing-Abstrafungen.',
    assumptions: 'Groß- und Kleinschreibung wird vereinheitlicht.',
    limitations: 'Beugungsformen und Pluralformen werden separat erfasst.',
    faqs: [
      { question: 'Was ist eine gesunde Keyword-Dichte?', answer: 'Eine Dichte von 1% bis 2,5% gilt als suchmaschinenfreundlich und wahrt die natürliche Lesbarkeit.' }
    ],
    relatedTools
  })
});

// Map of Batch 2 Converters and Everyday tools
export const BATCH2_CONVERTERS_HANDLERS: Record<string, Record<Language, KnowledgeHandler>> = {
  'pressure-unit': PRESSURE_UNIT_KNOWLEDGE,
  'energy-power': ENERGY_POWER_KNOWLEDGE,
  'angle-unit': ANGLE_UNIT_KNOWLEDGE,
  'force-unit': FORCE_UNIT_KNOWLEDGE,
  'torque-unit': TORQUE_UNIT_KNOWLEDGE,
  'shoe-size': SHOE_SIZE_KNOWLEDGE,
  'ring-size': RING_SIZE_KNOWLEDGE,
  'tire-size': TIRE_SIZE_KNOWLEDGE,
  'lorem-ipsum': LOREM_IPSUM_KNOWLEDGE,
  'word-frequency': WORD_FREQUENCY_KNOWLEDGE,
};
