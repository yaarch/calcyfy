import { ToolContentDetails } from './types';
import { ToolDef, Language } from '../../types';

// 1. CONCRETE CALCULATOR
export const CONCRETE_KNOWLEDGE: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails> = {
  en: (tool, name, relatedTools) => ({
    toolName: name,
    intro: `The ${name} calculates the exact volume of concrete required for slabs, footings, patios, columns, and driveways in cubic yards, cubic feet, and standard pre-mixed bags.`,
    whoUsesIt: 'General contractors, civil engineers, DIY homeowners, and construction cost estimators.',
    whatItCalculates: 'Total concrete volume (cubic yards, cubic feet, cubic meters) and required pre-mixed bags (60 lb and 80 lb) with adjustable waste contingency.',
    howToUse: [
      'Enter the length and width of the pour area in feet or meters.',
      'Enter the slab thickness or pour depth in inches or centimeters.',
      'Select a waste contingency percentage (5% to 10% recommended for ground grade variations).',
      'Review total ready-mix volume in cubic yards and equivalent pre-mixed bag quantities.',
    ],
    formula: 'Volume (cu yd) = [Length (ft) × Width (ft) × (Thickness (in) / 12)] ÷ 27 × (1 + Waste %)',
    formulaVariables: [
      { symbol: 'Length & Width', explanation: 'Surface dimensions of the slab in feet' },
      { symbol: 'Thickness', explanation: 'Depth of pour in inches converted to feet by dividing by 12' },
      { symbol: '27', explanation: 'Conversion constant from cubic feet to cubic yards (3 ft × 3 ft × 3 ft)' },
      { symbol: 'Waste %', explanation: 'Contingency factor for excavation irregularities and form deflection' },
    ],
    inputs: [
      { name: 'Length', description: 'Total linear length of the pour area.', unit: 'Feet (ft) or Meters (m)', optional: false },
      { name: 'Width', description: 'Total linear width of the pour area.', unit: 'Feet (ft) or Meters (m)', optional: false },
      { name: 'Thickness / Depth', description: 'Slab depth (typically 4 inches for sidewalks/patios, 6 inches for driveways).', unit: 'Inches (in) or cm', optional: false },
      { name: 'Waste Allowance', description: 'Recommended 5% to 10% buffer to account for grade variations, spillage, and form deflection.', unit: 'Percentage (%)', optional: true },
    ],
    unitsAndConversions: '1 cubic yard equals 27 cubic feet. One 80 lb bag yields approximately 0.60 cu ft; one 60 lb bag yields approximately 0.45 cu ft.',
    workedExample: {
      scenario: 'Pouring a 10 ft by 20 ft patio slab at 4 inches (0.333 ft) thick with 10% waste allowance.',
      stepByStep: [
        'Calculate base volume: 10 ft × 20 ft × (4 ÷ 12 ft) = 66.67 cubic feet.',
        'Convert to cubic yards: 66.67 ÷ 27 = 2.47 cubic yards.',
        'Add 10% waste buffer: 2.47 × 1.10 = 2.72 cubic yards.',
        'Calculate pre-mixed 80-lb bags: 2.72 cu yd × 45 bags/yd = ~122 bags.',
      ],
      result: '2.72 cubic yards of ready-mix concrete required (or ~122 eighty-pound bags).',
    },
    understandingResults: 'The output provides both ready-mix truck volume and bagged concrete counts. For orders exceeding 1 to 2 cubic yards, ready-mix truck delivery is typically more economical than hand-mixing individual bags.',
    assumptions: 'Assumes uniform sub-base compaction and plumb formwork along the perimeter.',
    limitations: 'Calculations assume an even sub-base. Uneven ground, settlement, or deeper thickened edges will require additional concrete volume.',
    faqs: [
      {
        question: 'How thick should a residential concrete slab be?',
        answer: 'Standard walkways and patios require a minimum thickness of 4 inches (10 cm). Heavy vehicle driveways or hot tub pads should be 5 to 6 inches thick with rebar reinforcement.',
      },
      {
        question: 'How many 80 lb bags of concrete make 1 cubic yard?',
        answer: 'It takes 45 bags of 80 lb concrete (or 60 bags of 60 lb concrete) to yield exactly 1 cubic yard of poured material.',
      },
      {
        question: 'Why is adding a 10% waste margin important?',
        answer: 'Ground imperfections, formwork bowing, and excavation variances almost always cause the actual volume needed to exceed mathematical blueprints. Ordering exact amounts risks cold joints.',
      },
    ],
    relatedTools,
  }),
  ar: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'حاسبة الخرسانة تحسب الحجم الدقيق للخرسانة المطلوبة للأسقف والقواعد والممرات والأرضيات بالأمتار المكعبة والياردات المكعبة وأكياس الإسمنت الجاهز.',
    whoUsesIt: 'المقاولون، المهندسون المدنيون، وأصحاب المشاريع الذاتية لتقدير تكاليف البناء.',
    whatItCalculates: 'حجم الخرسانة الكلي بالأمتار والياردات المكعبة، وعدد الأكياس الجاهزة مع احتساب نسبة الهدر.',
    howToUse: [
      'أدخل طول وعرض المنطقة المراد صبها بالأمتار أو الأقدام.',
      'أدخل سُمك أو عمق الصبة الخرسانية بالسنتيمتر أو البوصة.',
      'حدد نسبة الهدر الاحتياطية (يوصى بـ 5% إلى 10%).',
      'راجع الحجم الإجمالي المكعب وعدد الأكياس المطلوب شراؤها.',
    ],
    formula: 'الحجم المكعب = الطول × العرض × السُمك × (1 + نسبة الهدر)',
    inputs: [
      { name: 'الطول', description: 'الطول الكلي لمساحة الصب.', unit: 'متر / قدم', optional: false },
      { name: 'العرض', description: 'العرض الكلي لمساحة الصب.', unit: 'متر / قدم', optional: false },
      { name: 'السُمك', description: 'سُمك الصبة الخرسانية.', unit: 'سم / بوصة', optional: false },
    ],
    workedExample: {
      scenario: 'صب أرضية بمساحة 10 أقدام × 20 قدماً وبسُمك 4 بوصات مع هامش هدر 10%.',
      stepByStep: [
        'حساب الحجم الأساسي: 10 × 20 × (4 ÷ 12) = 66.67 قدماً مكعباً.',
        'التحويل للياردة المكعبة: 66.67 ÷ 27 = 2.47 ياردة مكعبة.',
        'إضافة 10% هدر: 2.47 × 1.10 = 2.72 ياردة مكعبة (أو ما يعادل 122 كيساً من فئة 80 رطلاً).',
      ],
      result: 'الحجم المطلوب: 2.72 ياردة مكعبة من الخرسانة الجاهزة.',
    },
    faqs: [
      { question: 'ما هو السُمك القياسي للأرضيات الخرسانية المنزلية؟', answer: 'السُمك الشائع للأرصفة والممرات هو 10 سم (4 بوصات)، بينما مواقف السيارات تتطلب 15 سم (6 بوصات).' },
    ],
    relatedTools,
  }),
  es: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'La calculadora de hormigón estima el volumen exacto necesario para losas, cimientos y aceras en metros cúbicos, yardas cúbicas y sacos premezclados.',
    whoUsesIt: 'Constructores, contratistas y particulares en reformas y obras civiles.',
    whatItCalculates: 'Volumen total de hormigón y número de sacos comerciales requeridos incluyendo margen de merma.',
    howToUse: [
      'Introduzca la longitud y anchura de la superficie a hormigonar.',
      'Indique el espesor o profundidad de la losa.',
      'Seleccione el porcentaje de merma preventiva (5% a 10%).',
      'Consulte el volumen cúbico y la cantidad de sacos recomendada.',
    ],
    formula: 'Volumen = Longitud × Anchura × Espesor × (1 + % Merma)',
    inputs: [
      { name: 'Longitud y Anchura', description: 'Dimensiones superficiales del área.', unit: 'Metros / Pies', optional: false },
      { name: 'Espesor', description: 'Grosor de la losa de hormigón.', unit: 'Centímetros / Pulgadas', optional: false },
    ],
    workedExample: {
      scenario: 'Losa de 10 pies × 20 pies con 4 pulgadas de espesor y 10% de merma.',
      stepByStep: [
        'Volumen base: 10 × 20 × 0,333 = 66,67 pies cúbicos.',
        'Conversión a yardas cúbicas: 66,67 ÷ 27 = 2,47 yardas cúbicas.',
        'Con 10% de margen: 2,47 × 1,10 = 2,72 yardas cúbicas.',
      ],
      result: '2,72 yardas cúbicas de hormigón (aprox. 122 sacos de 80 lb).',
    },
    faqs: [
      { question: '¿Por qué se debe añadir un margen de merma?', answer: 'Las irregularidades del terreno y la deformación del encofrado aumentan el volumen real necesario.' },
    ],
    relatedTools,
  }),
  fr: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Le calculateur de béton détermine le volume exact nécessaire pour les dalles, fondations, allées et piliers en mètres cubes et en sacs de béton prêt à l’emploi.',
    whoUsesIt: 'Maçons, maîtres d’œuvre et particuliers pour dimensionner leurs approvisionnements de chantier.',
    whatItCalculates: 'Volume total de béton (m³ ou verge³) et nombre de sacs prêts à l’emploi avec marge de perte.',
    howToUse: [
      'Indiquez la longueur et la largeur de la surface à couler.',
      'Saisissez l’épaisseur ou la profondeur de la dalle.',
      'Ajoutez un coefficient de marge ou perte (5 % à 10 % conseillé).',
      'Visualisez le volume total et le nombre de sacs correspondants.',
    ],
    formula: 'Volume = Longueur × Largeur × Épaisseur × (1 + % Perte)',
    inputs: [
      { name: 'Longueur et Largeur', description: 'Dimensions au sol de la dalle.', unit: 'Mètres / Pieds', optional: false },
      { name: 'Épaisseur', description: 'Profondeur de coulage.', unit: 'Centimètres / Pouces', optional: false },
    ],
    workedExample: {
      scenario: 'Dalle de 10 pi × 20 pi sur 4 pouces d’épaisseur avec 10 % de marge.',
      stepByStep: [
        'Volume brut : 10 × 20 × (4 / 12) = 66,67 pieds cubes.',
        'Conversion en verges cubes : 66,67 ÷ 27 = 2,47 verges cubes.',
        'Avec 10 % de marge : 2,47 × 1,10 = 2,72 verges cubes.',
      ],
      result: '2,72 verges cubes de béton nécessaire.',
    },
    faqs: [
      { question: 'Quelle épaisseur pour une dalle de terrasse ?', answer: 'Une épaisseur minimale de 10 à 12 cm est généralement recommandée pour une dalle piétonne extérieure.' },
    ],
    relatedTools,
  }),
  de: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Der Betonrechner ermittelt das exakte Betonvolumen für Bodenplatten, Fundamente, Terrassen und Einfahrten in Kubikmetern und handelsüblichen Sackmengen.',
    whoUsesIt: 'Bauunternehmer, Handwerker und Heimwerker zur exakten Materialbedarfsplanung.',
    whatItCalculates: 'Gesamtvolumen an Transportbeton (m³ / yd³) und Sackware inklusive Verschnittreserve.',
    howToUse: [
      'Geben Sie Länge und Breite der Bauteilfläche ein.',
      'Tragen Sie die Plattenstärke bzw. Einbautiefe ein.',
      'Wählen Sie einen Sicherheitszuschlag für Verschnitt (5 % bis 10 %).',
      'Entnehmen Sie das benötigte Betonvolumen und die entsprechende Sackanzahl.',
    ],
    formula: 'Volumen = Länge × Breite × Stärke × (1 + Verschnitt %)',
    inputs: [
      { name: 'Länge und Breite', description: 'Oberflächenmaße der zu betonierenden Fläche.', unit: 'Meter / Fuß', optional: false },
      { name: 'Stärke / Dicke', description: 'Einbautiefe der Betonplatte.', unit: 'Zentimeter / Zoll', optional: false },
    ],
    workedExample: {
      scenario: 'Terrassenplatte mit 10 ft × 20 ft bei 4 Zoll Dicke und 10 % Verschnitt.',
      stepByStep: [
        'Basisvolumen: 10 × 20 × (4 ÷ 12) = 66,67 Kubikfuß.',
        'Umrechnung in Kubikyard: 66,67 ÷ 27 = 2,47 yd³.',
        'Mit 10 % Reserve: 2,47 × 1,10 = 2,72 Kubikyard.',
      ],
      result: '2,72 Kubikyard Fertigbeton (ca. 122 Sack à 80 lb).',
    },
    faqs: [
      { question: 'Warum sollte ein Verschnittzuschlag eingeplant werden?', answer: 'Unebenheiten im Untergrund und Auslenkungen der Schalung führen in der Praxis stets zu erhöhtem Betonbedarf.' },
    ],
    relatedTools,
  }),
};

// 2. RC CUTOFF FREQUENCY CALCULATOR
export const RC_FILTER_KNOWLEDGE: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails> = {
  en: (tool, name, relatedTools) => ({
    toolName: name,
    intro: `The ${name} determines the -3 dB corner cutoff frequency (fc) and RC time constant (τ) of passive resistor-capacitor (RC) low-pass and high-pass analog filter networks.`,
    whoUsesIt: 'Electrical engineers, audio technicians, hardware developers, and electronics students.',
    whatItCalculates: 'Half-power cutoff frequency (Hz, kHz, MHz), angular frequency (rad/s), and circuit charging time constant (seconds / milliseconds).',
    howToUse: [
      'Enter the series resistance value and select the resistance unit (Ω, kΩ, or MΩ).',
      'Enter the filter capacitance value and select the capacitance unit (F, µF, nF, or pF).',
      'Review the calculated -3 dB corner cutoff frequency (fc).',
      'Inspect the RC time constant (τ) representing the time required to charge the capacitor to 63.2% of supply voltage.',
    ],
    formula: 'fc = 1 / (2 × π × R × C)  |  τ (tau) = R × C',
    formulaVariables: [
      { symbol: 'fc', explanation: 'Cutoff frequency at which signal power drops by half (-3 dB)' },
      { symbol: 'R', explanation: 'Series resistance in Ohms' },
      { symbol: 'C', explanation: 'Capacitance in Farads' },
      { symbol: 'τ', explanation: 'Time constant required to charge capacitor to 63.2% of supply voltage' },
    ],
    inputs: [
      { name: 'Resistance (R)', description: 'Series resistance of the filter resistor.', unit: 'Ohms (Ω), kΩ, or MΩ', optional: false },
      { name: 'Capacitance (C)', description: 'Shunt or coupling capacitance.', unit: 'Farads (F), µF, nF, or pF', optional: false },
    ],
    unitsAndConversions: '1 kHz = 1,000 Hz; 1 MHz = 1,000,000 Hz; 1 µF = 10⁻⁶ F; 1 nF = 10⁻⁹ F; 1 pF = 10⁻¹² F.',
    workedExample: {
      scenario: 'Audio low-pass filter using a 10 kΩ resistor (10,000 Ω) and a 10 nF capacitor (10 × 10⁻⁹ F).',
      stepByStep: [
        'Calculate 2πRC: 2 × 3.14159 × 10,000 × (10 × 10⁻⁹) = 0.0006283.',
        'Invert to find fc: 1 ÷ 0.0006283 = 1,591.55 Hz (1.59 kHz).',
        'Calculate time constant τ: 10,000 × (10 × 10⁻⁹) = 0.0001 s = 0.1 ms.',
      ],
      result: 'Cutoff frequency fc = 1.59 kHz; Time constant τ = 0.1 ms.',
    },
    understandingResults: 'Frequencies below the cutoff frequency pass through with minimal attenuation (< 3 dB loss). Frequencies significantly higher than fc are rolled off at an attenuation slope of -20 dB per decade.',
    assumptions: 'Assumes linear, ideal passive components with negligible parasitic inductance.',
    limitations: 'Real-world capacitor dielectric losses, component tolerances (typically ±5% to ±20%), and source/load impedance alter practical response curves.',
    faqs: [
      {
        question: 'What is the physical significance of the -3 dB cutoff point?',
        answer: 'At the cutoff frequency fc, the output voltage signal drops to 70.7% of its input amplitude (Vout = Vin / √2), representing exactly half output power (-3 dB).',
      },
      {
        question: 'What is the difference between an RC low-pass and high-pass filter?',
        answer: 'A low-pass filter passes frequencies below fc and attenuates higher frequencies (capacitor to ground). A high-pass filter passes frequencies above fc and blocks DC/low frequencies (capacitor in series).',
      },
    ],
    relatedTools,
  }),
  ar: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'حاسبة تردد القطع لمرشح RC تحدد تردد القطع عند نقطة -3 ديسيبل وثابت الوقت لدوائر المقاومة والمكثف المارة للترددات المنخفضة أو العالية.',
    whoUsesIt: 'مهندسو الإلكترونيات والاتصالات وهواة الدوائر الصوتية.',
    whatItCalculates: 'تردد القطع (هرتز، كيلوهرتز)، التردد الزاوي، وثابت الوقت الكهربائي للشحن والتفريغ.',
    howToUse: [
      'أدخل قيمة المقاومة الكهربائية مع اختيار الوحدة (أوم، كيلو أوم).',
      'أدخل قيمة سعة المكثف مع اختيار الوحدة (ميكروفاراد، نانوفاراد).',
      'راجع قيمة تردد القطع المحسوب عند نصف القدرة (-3 dB).',
      'اطّلع على ثابت الشحن الزمني τ للدارة.',
    ],
    formula: 'fc = 1 ÷ (2 × π × R × C)',
    inputs: [
      { name: 'المقاومة (R)', description: 'قيمة المقاومة في الدائرة.', unit: 'أوم / كيلو أوم', optional: false },
      { name: 'السعة (C)', description: 'قيمة سعة المكثف.', unit: 'ميكروفاراد / نانوفاراد', optional: false },
    ],
    workedExample: {
      scenario: 'مرشح صوتي بمقاومة 10 كيلو أوم (10,000 أوم) ومكثف 10 نانوفاراد.',
      stepByStep: [
        'المقام: 2 × 3.14159 × 10,000 × (10 × 10^-9) = 0.0006283.',
        'التردد: 1 ÷ 0.0006283 = 1,591.55 هرتز (1.59 كيلوهرتز).',
        'ثابت الوقت τ = 10,000 × 10^-8 = 0.1 مللي ثانية.',
      ],
      result: 'تردد القطع fc = 1.59 كيلوهرتز؛ ثابت الوقت τ = 0.1 مللي ثانية.',
    },
    faqs: [
      { question: 'ماذا يعني هبوط الإشارة بمقدار -3 ديسيبل؟', answer: 'يعني انخفاض قدرة الإشارة الكهربائية الخارجة إلى النصف مقارنة بالإشارة الداخلة.' },
    ],
    relatedTools,
  }),
  es: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'La calculadora de frecuencia de corte RC determina el punto de corte a -3 dB y la constante de tiempo tau en filtros pasivos RC paso bajo y paso alto.',
    whoUsesIt: 'Ingenieros electrónicos, técnicos de audio y estudiantes de telecomunicaciones.',
    whatItCalculates: 'Frecuencia de corte (-3 dB) en Hz/kHz y constante de tiempo de carga/descarga.',
    howToUse: [
      'Introduzca el valor de la resistencia y su escala (Ω, kΩ).',
      'Introduzca el valor del condensador y su escala (µF, nF, pF).',
      'Consulte la frecuencia de corte angular y en hercios.',
      'Compruebe la constante de tiempo τ del circuito.',
    ],
    formula: 'fc = 1 / (2 × π × R × C)',
    inputs: [
      { name: 'Resistencia (R)', description: 'Valor resistivo del circuito.', unit: 'Ohmios (Ω)', optional: false },
      { name: 'Capacidad (C)', description: 'Capacidad del condensador.', unit: 'Faradios (F)', optional: false },
    ],
    workedExample: {
      scenario: 'Filtro RC con resistencia de 10 kΩ y condensador de 10 nF.',
      stepByStep: [
        'Cálculo 2πRC: 2 × 3,1416 × 10.000 × 10⁻⁸ = 0,0006283.',
        'Inversión: 1 ÷ 0,0006283 = 1.591,55 Hz (1,59 kHz).',
        'Constante τ = 10.000 × 10⁻⁸ = 0,1 ms.',
      ],
      result: 'Frecuencia de corte fc = 1,59 kHz; Constante de tiempo τ = 0,1 ms.',
    },
    faqs: [
      { question: '¿Qué ocurre con las frecuencias por encima de fc en un filtro paso bajo?', answer: 'Se atenúan progresivamente a razón de -20 dB por década.' },
    ],
    relatedTools,
  }),
  fr: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Le calculateur de fréquence de coupure RC calcule la fréquence de coupure à -3 dB et la constante de temps d’un filtre passif résistance-condensateur.',
    whoUsesIt: 'Ingénieurs électroniciens, acousticiens et concepteurs de circuits analogiques.',
    whatItCalculates: 'Fréquence de coupure à mi-puissance (Hz, kHz) et constante de temps τ.',
    howToUse: [
      'Entrez la valeur de la résistance et son unité (Ω, kΩ).',
      'Entrez la valeur de la capacité et son unité (µF, nF).',
      'Consultez la fréquence de coupure fc calculée.',
      'Vérifiez la constante de temps τ de charge du condensateur.',
    ],
    formula: 'fc = 1 / (2 × π × R × C)',
    inputs: [
      { name: 'Résistance (R)', description: 'Résistance série du filtre.', unit: 'Ohms (Ω)', optional: false },
      { name: 'Capacité (C)', description: 'Capacité du condensateur de filtrage.', unit: 'Farads (F)', optional: false },
    ],
    workedExample: {
      scenario: 'Filtre passe-bas avec R = 10 kΩ et C = 10 nF.',
      stepByStep: [
        'Dénominateur : 2 × 3,14159 × 10 000 × (10 × 10⁻⁹) = 0,0006283.',
        'Fréquence fc : 1 ÷ 0,0006283 = 1 591,55 Hz (1,59 kHz).',
        'Constante τ = 10 000 × 10⁻⁸ = 0,1 ms.',
      ],
      result: 'Fréquence de coupure fc = 1,59 kHz ; Constante de temps τ = 0,1 ms.',
    },
    faqs: [
      { question: 'Pourquoi parle-t-on de coupure à -3 dB ?', answer: 'À cette fréquence précise, la puissance du signal est divisée par deux par rapport à l’entrée.' },
    ],
    relatedTools,
  }),
  de: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Der RC-Grenzfrequenzrechner ermittelt die -3-dB-Grenzfrequenz (fc) und die Zeitkonstante (τ) passiver RC-Tiefpass- und Hochpassfilter.',
    whoUsesIt: 'Elektroniker, Schaltungsentwickler, Audiotechniker und Studierende der Elektrotechnik.',
    whatItCalculates: 'Grenzfrequenz bei halber Leistung (Hz, kHz) und kapazitive Ladezeitkonstante.',
    howToUse: [
      'Widerstandswert eingeben und Einheit (Ω, kΩ) wählen.',
      'Kondensatorkapazität eingeben und Einheit (µF, nF) wählen.',
      'Die ermittelte -3-dB-Grenzfrequenz fc ablesen.',
      'Die RC-Zeitkonstante τ zur Bewertung des Einschwingverhaltens prüfen.',
    ],
    formula: 'fc = 1 / (2 × π × R × C)  |  τ = R × C',
    inputs: [
      { name: 'Widerstand (R)', description: 'Serienwiderstand des Filters.', unit: 'Ohm (Ω)', optional: false },
      { name: 'Kapazität (C)', description: 'Filterkapazität.', unit: 'Farad (F)', optional: false },
    ],
    workedExample: {
      scenario: 'Tiefpassfilter mit 10 kΩ Widerstand und 10 nF Kondensator.',
      stepByStep: [
        'Berechnung 2πRC: 2 × 3,14159 × 10.000 × 10⁻⁸ = 0,0006283.',
        'Kehrwert für fc: 1 ÷ 0,0006283 = 1.591,55 Hz (1,59 kHz).',
        'Zeitkonstante τ: 10.000 × 10⁻⁸ = 0,1 ms.',
      ],
      result: 'Grenzfrequenz fc = 1,59 kHz; Zeitkonstante τ = 0,1 ms.',
    },
    faqs: [
      { question: 'Was bedeutet die Grenzfrequenz in der Praxis?', answer: 'Bei dieser Frequenz fällt die Ausgangsspannung auf ca. 70,7 % der Eingangsspannung ab (-3 dB).' },
    ],
    relatedTools,
  }),
};

// 3. AWG WIRE GAUGE CALCULATOR
export const AWG_WIRE_KNOWLEDGE: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails> = {
  en: (tool, name, relatedTools) => ({
    toolName: name,
    intro: `The ${name} evaluates standard American Wire Gauge (AWG) copper and aluminum conductors for allowable ampacity, cross-sectional area, diameter, resistance, and safe voltage drop under continuous electrical loads.`,
    whoUsesIt: 'Electricians, electrical contractors, solar panel installers, and RV/marine wiring specialists.',
    whatItCalculates: 'Allowable current rating (Amps), conductor cross-sectional area, wire resistance (Ω/1000ft), and voltage drop percentage.',
    howToUse: [
      'Select the American Wire Gauge (AWG) size.',
      'Enter the continuous circuit current load in Amperes.',
      'Enter the one-way conductor run distance from the source panel.',
      'Enter the nominal system operating voltage (e.g. 120V or 240V).',
      'Review the calculated voltage drop percentage against the recommended National Electrical Code (NEC) 3% threshold.',
    ],
    formula: 'Voltage Drop (V) = 2 × Length (ft) × Current (A) × Conductor Resistance (Ω/ft)',
    formulaVariables: [
      { symbol: 'Length', explanation: 'One-way circuit distance in feet (multiplied by 2 for round-trip return)' },
      { symbol: 'Current', explanation: 'Circuit load amperage in Amperes' },
      { symbol: 'Resistance', explanation: 'Standard conductor resistance per foot based on AWG wire gauge and material' },
    ],
    inputs: [
      { name: 'Wire Gauge (AWG)', description: 'Conductor thickness gauge (e.g. 14 AWG for 15A, 12 AWG for 20A, 10 AWG for 30A).', unit: 'AWG', optional: false },
      { name: 'Circuit Current', description: 'Continuous operating current of the connected appliance or branch circuit.', unit: 'Amperes (A)', optional: false },
      { name: 'Conductor Length', description: 'One-way distance from the breaker panel to the electrical load.', unit: 'Feet (ft) or Meters (m)', optional: false },
      { name: 'System Voltage', description: 'Nominal circuit voltage (e.g. 120V single-phase or 240V split-phase).', unit: 'Volts (V)', optional: false },
    ],
    unitsAndConversions: 'National Electrical Code (NEC) guidelines recommend limiting branch circuit voltage drop to under 3% for optimal equipment efficiency.',
    workedExample: {
      scenario: 'Running a 16A continuous load at 120V over 100 feet using 12 AWG copper wire (resistance ~1.93 Ω/1000 ft).',
      stepByStep: [
        'Calculate total round-trip wire length: 2 × 100 ft = 200 ft.',
        'Calculate wire resistance: 200 ft × (1.93 Ω / 1000 ft) = 0.386 Ω.',
        'Calculate voltage drop: 16A × 0.386 Ω = 6.18 Volts.',
        'Percentage drop: (6.18V ÷ 120V) × 100% = 5.15% (exceeds 3% limit; upsizing to 10 AWG recommended).',
      ],
      result: '6.18V (5.15%) voltage drop. Conductor upsize to 10 AWG advised for runs exceeding 75 ft.',
    },
    understandingResults: 'Voltage drop over 3% causes motors to run hotter, lights to dim, and sensitive electronics to underperform. Upsizing conductor gauge compensates for long distance resistance.',
    assumptions: 'Assumes 75°C conductor termination ratings under normal ambient room temperatures.',
    limitations: 'Ampacity ratings depend on insulation temperature rating (60°C, 75°C, 90°C), ambient temperature derating, and conduit fill adjustments per NEC Table 310.16.',
    faqs: [
      {
        question: 'What gauge wire is required for a 20-amp household circuit?',
        answer: 'Under NEC rules, a 20-amp residential circuit requires minimum 12 AWG copper wire. A 15-amp circuit requires 14 AWG wire.',
      },
      {
        question: 'When should I upsize electrical wire for long distances?',
        answer: 'Upsize your conductor gauge whenever the one-way circuit run exceeds 50–75 feet to keep voltage drop below the recommended 3% threshold.',
      },
    ],
    relatedTools,
  }),
  ar: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'حاسبة قياس الأسلاك (AWG) تقيّم قدرة تحمل التيار وانخفاض الجهد والمقاومة الكهربائية للأسلاك النحاسية والألمنيوم وفق المعايير القياسية الأمريكية.',
    whoUsesIt: 'الكهربائيون، مهندسو الطاقة الشمسية، والمقاولون لضمان سلامة التمديدات الكهربائية.',
    whatItCalculates: 'التيار المسموح به، انخفاض الجهد بالفولت والنسبة المئوية، ومقاومة السلك.',
    howToUse: [
      'اختر رقم مقياس السلك الأمريكي (AWG).',
      'أدخل شدة التيار الكهربائي بالأمبير.',
      'أدخل المسافة بين لوحة القواطع والحمل الكهربائي.',
      'أدخل فرق الجهد الكهربائي للنظام (مثل 120 أو 220 فولت).',
      'تأكد من ألا يتجاوز هبوط الجهد النسبة الموصى بها (أقل من 3%).',
    ],
    formula: 'هبوط الجهد = 2 × المسافة × شدة التيار × مقاومة السلك',
    inputs: [
      { name: 'مقياس السلك (AWG)', description: 'سُمك السلك الكهربائي.', unit: 'AWG', optional: false },
      { name: 'شدة التيار', description: 'التيار المار في الدائرة.', unit: 'أمبير', optional: false },
      { name: 'المسافة', description: 'المسافة في اتجاه واحد من لوحة التوزيع.', unit: 'قدم / متر', optional: false },
    ],
    workedExample: {
      scenario: 'تشغيل حمل بقوة 16 أمبير على 120 فولت بمسافة 100 قدم بسلك 12 AWG (مقاومة 1.93 أوم/1000 قدم).',
      stepByStep: [
        'المسافة ذهاباً وإياباً: 2 × 100 = 200 قدم.',
        'مقاومة السلك: 200 × (1.93 ÷ 1000) = 0.386 أوم.',
        'انخفاض الجهد: 16 × 0.386 = 6.18 فولت.',
        'نسبة الانخفاض: (6.18 ÷ 120) × 100% = 5.15% (يوصى بترقية السلك إلى 10 AWG).',
      ],
      result: 'انخفاض جهد بمقدار 6.18 فولت (5.15%). يوصى بزيادة سُمك السلك.',
    },
    faqs: [
      { question: 'ما هو السلك المناسب لقاطع 20 أمبير؟', answer: 'يتطلب قاطع 20 أمبير سلكاً نحاسياً بمقياس 12 AWG على الأقل.' },
    ],
    relatedTools,
  }),
  es: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'La calculadora de calibre de cable AWG determina la caída de tensión, ampacidad admisible y resistencia de conductores según la normativa eléctrica.',
    whoUsesIt: 'Electricistas, instaladores solares e ingenieros de instalaciones.',
    whatItCalculates: 'Caída de tensión (V y %), corriente máxima admisible y sección del conductor.',
    howToUse: [
      'Seleccione el calibre de cable AWG correspondiente.',
      'Introduzca la intensidad de corriente en amperios.',
      'Indique la distancia unidireccional hasta el receptor.',
      'Indique la tensión nominal del circuito (120V o 230V).',
      'Verifique que la caída de tensión calculada sea inferior al 3%.',
    ],
    formula: 'Caída de Tensión = 2 × Longitud × Intensidad × Resistencia',
    inputs: [
      { name: 'Calibre (AWG)', description: 'Grosor nominal del conductor.', unit: 'AWG', optional: false },
      { name: 'Intensidad', description: 'Carga continua en amperios.', unit: 'Amperios (A)', optional: false },
    ],
    workedExample: {
      scenario: 'Circuito de 16 A a 120 V con 100 pies de distancia y cable 12 AWG.',
      stepByStep: [
        'Recorrido total: 2 × 100 = 200 pies.',
        'Resistencia: 200 × 0,00193 = 0,386 Ω.',
        'Caída de tensión: 16 × 0,386 = 6,18 V (5,15 %).',
      ],
      result: '6,18 V (5,15 %) de caída de tensión. Se recomienda subir a 10 AWG.',
    },
    faqs: [
      { question: '¿Cuál es el límite recomendado de caída de tensión?', answer: 'El código NEC recomienda no superar el 3% en circuitos ramales para evitar sobrecalentamientos.' },
    ],
    relatedTools,
  }),
  fr: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Le calculateur de calibre de fil AWG évalue la chute de tension admissible, le courant maximal et la résistance linéique des conducteurs en cuivre ou aluminium.',
    whoUsesIt: 'Électriciens, installateurs photovoltaïques et techniciens de maintenance.',
    whatItCalculates: 'Chute de tension en volts et en pourcentage, ampérage admissible et section de câble.',
    howToUse: [
      'Sélectionnez la section ou calibre AWG du conducteur.',
      'Entrez l’intensité du courant en ampères.',
      'Indiquez la longueur aller du câble jusqu’à la charge.',
      'Précisez la tension d’alimentation du réseau.',
      'Contrôlez que la chute de tension reste inférieure au seuil normatif de 3 %.',
    ],
    formula: 'Chute de tension (V) = 2 × Longueur × Courant × Résistance',
    inputs: [
      { name: 'Calibre AWG', description: 'Taille normalisée du conducteur.', unit: 'AWG', optional: false },
      { name: 'Courant (A)', description: 'Intensité circulant dans le circuit.', unit: 'Ampères (A)', optional: false },
    ],
    workedExample: {
      scenario: 'Circuit 16 A en 120 V sur 100 pieds avec conducteur 12 AWG.',
      stepByStep: [
        'Longueur totale aller-retour : 200 pi.',
        'Résistance : 200 × 0,00193 = 0,386 Ω.',
        'Chute de tension : 16 × 0,386 = 6,18 V (5,15 %).',
      ],
      result: 'Chute de tension de 6,18 V (5,15 %). Passage en 10 AWG recommandé.',
    },
    faqs: [
      { question: 'Quel câble pour une ligne 20 ampères ?', answer: 'La norme prescrit au minimum un conducteur 12 AWG en cuivre pour un disjoncteur 20 A.' },
    ],
    relatedTools,
  }),
  de: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Der AWG-Kabelrechner berechnet Spannungsabfall, Strombelastbarkeit und Leiterwiderstand nach dem American Wire Gauge Standard für Kupfer- und Aluminiumleitungen.',
    whoUsesIt: 'Elektriker, Solaranlagenbauer, Ingenieure und Veranstaltungstechniker.',
    whatItCalculates: 'Spannungsabfall in Volt und Prozent, zulässige Stromstärke und Leiterwiderstand.',
    howToUse: [
      'Wählen Sie den AWG-Kabelquerschnitt aus.',
      'Geben Sie den Betriebsstrom in Ampere ein.',
      'Geben Sie die einfache Leitungslänge bis zum Verbraucher an.',
      'Tragen Sie die Nennspannung des Netzes ein (z. B. 120 V oder 230 V).',
      'Überprüfen Sie, ob der berechnete Spannungsabfall unter dem Grenzwert von 3 % liegt.',
    ],
    formula: 'Spannungsabfall = 2 × Länge × Strom × Widerstand',
    inputs: [
      { name: 'Kabelquerschnitt (AWG)', description: 'Leitergröße nach US-Standard.', unit: 'AWG', optional: false },
      { name: 'Stromstärke', description: 'Dauerstromstärke des Stromkreises.', unit: 'Ampere (A)', optional: false },
    ],
    workedExample: {
      scenario: 'Stromkreis mit 16 A bei 120 V über 100 ft mit 12 AWG Kupferdraht.',
      stepByStep: [
        'Hin- und Rückleiter: 2 × 100 ft = 200 ft.',
        'Leitungswiderstand: 200 × 0,00193 = 0,386 Ω.',
        'Spannungsabfall: 16 × 0,386 = 6,18 V (5,15 %).',
      ],
      result: '6,18 V (5,15 %) Spannungsabfall. Vergrößerung auf 10 AWG angeraten.',
    },
    faqs: [
      { question: 'Warum sollte der Spannungsabfall unter 3 % liegen?', answer: 'Ein höherer Spannungsabfall führt zu Leistungsverlusten, Erwärmung der Leitungen und Fehlfunktionen empfindlicher Verbraucher.' },
    ],
    relatedTools,
  }),
};

// 4. DATE CALCULATOR
export const DATE_KNOWLEDGE: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails> = {
  en: (tool, name, relatedTools) => ({
    toolName: name,
    intro: `The ${name} calculates the exact duration between two calendar dates, counting total elapsed days, weeks, months, years, and business working days based on the Gregorian calendar.`,
    whoUsesIt: 'Project managers tracking deadlines, legal professionals calculating statutory notice periods, and individuals planning events.',
    whatItCalculates: 'Total elapsed days, calendar weeks, whole months, years, and remaining calendar days between any two dates.',
    howToUse: [
      'Select the starting calendar date.',
      'Select the ending target date.',
      'Choose whether to include the end date in the total day count.',
      'Review the comprehensive breakdown of elapsed days, weeks, months, and years.',
    ],
    formula: 'Total Days = Date2 - Date1 (adjusted for leap years where Feb has 29 days)',
    inputs: [
      { name: 'Start Date', description: 'The baseline commencement calendar date.', unit: 'Date (YYYY-MM-DD)', optional: false },
      { name: 'End Date', description: 'The target conclusion calendar date.', unit: 'Date (YYYY-MM-DD)', optional: false },
    ],
    unitsAndConversions: 'Standard calendar year = 365 days; leap year = 366 days. Average Gregorian month = 30.4375 days.',
    workedExample: {
      scenario: 'Calculating the elapsed time from January 1, 2024 to December 31, 2024 (a leap year).',
      stepByStep: [
        'Identify leap year status: 2024 is divisible by 4, so February has 29 days.',
        'Count total days: 366 calendar days inclusive (or 365 elapsed days exclusive).',
        'Convert to weeks: 366 ÷ 7 = 52 weeks and 2 days.',
        'Convert to months: 12 full calendar months.',
      ],
      result: '366 calendar days (inclusive); exactly 52 weeks and 2 days; 1 full calendar year.',
    },
    understandingResults: 'Results differentiate between inclusive counting (counting both starting and ending days) and exclusive interval elapsed time.',
    assumptions: 'Calculations adhere strictly to Gregorian calendar rules instituted in 1582.',
    limitations: 'Does not automatically deduct regional public bank holidays unless a specialized business day filter is enabled.',
    faqs: [
      {
        question: 'How is a leap year determined in the Gregorian calendar?',
        answer: 'A year is a leap year if it is evenly divisible by 4, except for end-of-century years which must also be evenly divisible by 400 (e.g. 2000 was a leap year, but 1900 was not).',
      },
      {
        question: 'What is the difference between inclusive and exclusive date counting?',
        answer: 'Exclusive counting measures the elapsed interval between dates (e.g. from Monday to Tuesday is 1 day). Inclusive counting includes both the first and last days (e.g. Monday through Tuesday is 2 days).',
      },
    ],
    relatedTools,
  }),
  ar: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'حاسبة التاريخ تحسب بدقة الفرق الزمني بين تاريخين بالأيام والأسابيع والشهور والسنوات وفق التقويم الميلادي وقواعد السنوات الكبيسة.',
    whoUsesIt: 'مديرو المشاريع، المحامون لحساب مدد التقادم، والأفراد لتتبع المواعيد الهامة.',
    whatItCalculates: 'عدد الأيام الإجمالية، الأسابيع، الشهور، والسنوات المنقضية بين تاريخين.',
    howToUse: [
      'حدد تاريخ البداية من التقويم.',
      'حدد تاريخ النهاية.',
      'حدد ما إذا كنت ترغب في تضمين اليوم الأخير في الحساب.',
      'استعرض إجمالي الأيام والفارق بالسنوات والشهور والأسابيع.',
    ],
    formula: 'الفارق الزمني = تاريخ النهاية - تاريخ البداية (مع مراعاة السنوات الكبيسة)',
    inputs: [
      { name: 'تاريخ البداية', description: 'تاريخ بدء الفترة الزمنية.', unit: 'تاريخ', optional: false },
      { name: 'تاريخ النهاية', description: 'تاريخ انتهاء الفترة الزمنية.', unit: 'تاريخ', optional: false },
    ],
    workedExample: {
      scenario: 'حساب المدة من 1 يناير 2024 إلى 31 ديسمبر 2024 (سنة كبيسة).',
      stepByStep: [
        'سنة 2024 تقبل القسمة على 4، فشهر فبراير يضم 29 يوماً.',
        'إجمالي الأيام: 366 يوماً (شاملاً يوم النهاية).',
        'بالأسابيع: 52 أسبوعاً ويومان.',
      ],
      result: '366 يوماً تقويمياً؛ 52 أسبوعاً ويومان؛ سنة ميلادية كاملة.',
    },
    faqs: [
      { question: 'كيف تُحدد السنة الكبيسة؟', answer: 'تكون السنة كبيسة إذا كانت تقبل القسمة على 4، وتستثنى السنوات المئوية ما لم تكن تقبل القسمة على 400.' },
    ],
    relatedTools,
  }),
  es: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'La calculadora de fechas determina con precisión los días, semanas, meses y años transcurridos entre dos fechas del calendario gregoriano.',
    whoUsesIt: 'Gestores de proyectos, departamentos de recursos humanos y usuarios particulares.',
    whatItCalculates: 'Días naturales totales, semanas completas, meses y desglose en años y días.',
    howToUse: [
      'Seleccione la fecha inicial en el calendario.',
      'Seleccione la fecha final.',
      'Indique si desea incluir el último día en el cómputo.',
      'Examine el desglose temporal completo.',
    ],
    formula: 'Diferencia = Fecha Final - Fecha Inicial',
    inputs: [
      { name: 'Fecha Inicial y Final', description: 'Límites temporales del intervalo.', unit: 'Fecha (AAAA-MM-DD)', optional: false },
    ],
    workedExample: {
      scenario: 'Tiempo transcurrido del 1 de enero de 2024 al 31 de diciembre de 2024 (año bisiesto).',
      stepByStep: [
        '2024 es año bisiesto (febrero tiene 29 días).',
        'Total de días: 366 días (inclusivo).',
        'Equivalente: 52 semanas y 2 días.',
      ],
      result: '366 días naturales; 52 semanas y 2 días; 1 año completo.',
    },
    faqs: [
      { question: '¿Cuál es la diferencia entre cómputo inclusivo y exclusivo?', answer: 'El cómputo exclusivo mide el intervalo transcurrido; el inclusivo cuenta también el día inicial y el final.' },
    ],
    relatedTools,
  }),
  fr: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Le calculateur de dates mesure la durée exacte entre deux dates calendaires en jours totaux, semaines, mois et années selon le calendrier grégorien.',
    whoUsesIt: 'Chefs de projet, juristes, services administratifs et organisateurs d’événements.',
    whatItCalculates: 'Nombre total de jours écoulés, semaines, mois entiers et années bissextiles.',
    howToUse: [
      'Sélectionnez la date de début.',
      'Sélectionnez la date de fin.',
      'Activez ou non l’inclusion du dernier jour.',
      'Consultez le décompte détaillé en jours, semaines et mois.',
    ],
    formula: 'Durée = Date de fin - Date de début',
    inputs: [
      { name: 'Date de début et Date de fin', description: 'Bornes de la période calendaire.', unit: 'Date', optional: false },
    ],
    workedExample: {
      scenario: 'Calcul entre le 1er janvier 2024 et le 31 décembre 2024 (année bissextile).',
      stepByStep: [
        '2024 est bissextile avec 29 jours en février.',
        'Nombre total de jours : 366 jours calendaires inclusifs.',
        'Décomposition : 52 semaines et 2 jours.',
      ],
      result: '366 jours calendaires ; 52 semaines et 2 jours ; 1 an complet.',
    },
    faqs: [
      { question: 'Qu’est-ce qu’une année bissextile ?', answer: 'Une année comptant 366 jours au lieu de 365, avec un 29 février ajouté pour synchroniser l’année astronomique.' },
    ],
    relatedTools,
  }),
  de: (tool, name, relatedTools) => ({
    toolName: name,
    intro: 'Der Datumsrechner berechnet die genaue Zeitspanne zwischen zwei Kalenderdaten in Tagen, Wochen, Monaten und Jahren nach dem gregorianischen Kalender.',
    whoUsesIt: 'Projektmanager, Juristen zur Fristenberechnung und Privatpersonen zur Terminplanung.',
    whatItCalculates: 'Gesamtzahl der Kalendertage, volle Wochen, Monate und Schaltjahreskorrekturen.',
    howToUse: [
      'Wählen Sie das Startdatum aus.',
      'Wählen Sie das Zieldatum aus.',
      'Legen Sie fest, ob der Endtag mitgezählt werden soll.',
      'Lesen Sie die ermittelten Kalendertage, Wochen und Monate ab.',
    ],
    formula: 'Zeitdauer = Enddatum - Startdatum',
    inputs: [
      { name: 'Start- und Enddatum', description: 'Eckdaten der Zeitspanne.', unit: 'Datum', optional: false },
    ],
    workedExample: {
      scenario: 'Berechnung vom 1. Januar 2024 bis 31. Dezember 2024 (Schaltjahr).',
      stepByStep: [
        '2024 ist durch 4 teilbar, der Februar hat 29 Tage.',
        'Gesamttage: 366 Kalendertage (inklusiv).',
        'Wochen: 52 Wochen und 2 Tage.',
      ],
      result: '366 Kalendertage (inklusiv); 52 Wochen und 2 Tage; 1 volles Kalenderjahr.',
    },
    faqs: [
      { question: 'Wann ist ein Jahr ein Schaltjahr?', answer: 'Ein Jahr ist ein Schaltjahr, wenn es durch 4 teilbar ist, außer bei vollen Jahrhunderten, die durch 400 teilbar sein müssen.' },
    ],
    relatedTools,
  }),
};
