import { Language, ToolDef } from '../../types';
import {
  ToolContentDetails,
  ToolFaq,
  ToolInputExplanation,
  ToolWorkedExample,
} from './types';
import {
  detectToolDomain,
  DOMAIN_STRATEGIES,
  DomainKey,
} from './fallbackDomainData';

interface FallbackWorkedExampleSpec {
  scenario: Record<Language, string>;
  stepByStep: Record<Language, string[]>;
  result: Record<Language, string>;
}

function generateDeterministicWorkedExample(
  tool: ToolDef,
  name: string,
  domain: DomainKey,
  lang: Language
): ToolWorkedExample {
  const s = (tool.id + ' ' + (tool.slug || '')).toLowerCase();

  // 1. Temperature converter
  if (s.includes('temperature')) {
    const examples: FallbackWorkedExampleSpec = {
      scenario: {
        en: 'Converting 100°C (water boiling point at standard pressure) to Fahrenheit and Kelvin.',
        ar: 'تحويل 100 درجة مئوية (درجة غليان الماء عند الضغط القياسي) إلى فهرنهايت وكلفن.',
        es: 'Conversión de 100 °C (punto de ebullición del agua) a Fahrenheit y Kelvin.',
        fr: 'Conversion de 100 °C (point d’ébullition de l’eau) en Fahrenheit et Kelvin.',
        de: 'Umrechnung von 100 °C (Siedepunkt von Wasser) in Fahrenheit und Kelvin.',
      },
      stepByStep: {
        en: [
          'Given source temperature: T_Celsius = 100 °C.',
          'Apply the affine Fahrenheit formula: °F = (100 × 9/5) + 32 = 180 + 32 = 212 °F.',
          'Apply absolute thermodynamic offset for Kelvin: K = 100 + 273.15 = 373.15 K.',
        ],
        ar: [
          'القيمة الأصلية: درجة الحرارة = 100 مئوية.',
          'تطبيق معادلة الفهرنهايت: ف = (100 × 9/5) + 32 = 180 + 32 = 212 فهرنهايت.',
          'تطبيق إزاحة كلفن المطلقة: كلفن = 100 + 273.15 = 373.15 كلفن.',
        ],
        es: [
          'Temperatura de origen: T_Celsius = 100 °C.',
          'Fórmula de Fahrenheit: °F = (100 × 9/5) + 32 = 180 + 32 = 212 °F.',
          'Escala absoluta Kelvin: K = 100 + 273,15 = 373,15 K.',
        ],
        fr: [
          'Température initiale : T_Celsius = 100 °C.',
          'Formule Fahrenheit : °F = (100 × 9/5) + 32 = 180 + 32 = 212 °F.',
          'Échelle thermodynamique Kelvin : K = 100 + 273,15 = 373,15 K.',
        ],
        de: [
          'Ausgangstemperatur: T_Celsius = 100 °C.',
          'Fahrenheit-Formel: °F = (100 × 9/5) + 32 = 180 + 32 = 212 °F.',
          'Thermodynamische Kelvin-Skala: K = 100 + 273,15 = 373,15 K.',
        ],
      },
      result: {
        en: '100 °C = 212.00 °F = 373.15 K',
        ar: '100 مئوية = 212.00 فهرنهايت = 373.15 كلفن',
        es: '100 °C = 212,00 °F = 373,15 K',
        fr: '100 °C = 212,00 °F = 373,15 K',
        de: '100 °C = 212,00 °F = 373,15 K',
      },
    };
    return {
      scenario: examples.scenario[lang] || examples.scenario.en,
      stepByStep: examples.stepByStep[lang] || examples.stepByStep.en,
      result: examples.result[lang] || examples.result.en,
    };
  }

  // 2. Ohm's Law
  if (s.includes('ohms-law') || s.includes('resistor')) {
    const examples: FallbackWorkedExampleSpec = {
      scenario: {
        en: 'A DC circuit operates with a 12 V potential across a 4 Ω resistive load.',
        ar: 'دائرة تيار مستمر تعمل بجهد 12 فولت عبر حمل مقاومته 4 أوم.',
        es: 'Un circuito de corriente continua opera con 12 V aplicados a una resistencia de 4 Ω.',
        fr: 'Un circuit à courant continu sous une tension de 12 V alimente une résistance de 4 Ω.',
        de: 'Ein Gleichstromkreis arbeitet mit 12 V Spannung an einem 4-Ω-Widerstand.',
      },
      stepByStep: {
        en: [
          'Given Voltage V = 12 V and Resistance R = 4 Ω.',
          'Calculate Current using Ohm’s Law: I = V / R = 12 / 4 = 3.0 A.',
          'Calculate Power Dissipation: P = V × I = 12 × 3.0 = 36.0 W.',
        ],
        ar: [
          'المعطيات: الجهد = 12 فولت، المقاومة = 4 أوم.',
          'حساب شدة التيار بقانون أوم: ت = ج / م = 12 / 4 = 3.0 أمبير.',
          'حساب القدرة الكهربائية المبددة: ق = ج × ت = 12 × 3.0 = 36.0 واط.',
        ],
        es: [
          'Datos: Voltaje V = 12 V y Resistencia R = 4 Ω.',
          'Cálculo de corriente (Ley de Ohm): I = V / R = 12 / 4 = 3,0 A.',
          'Potencia eléctrica disipada: P = V × I = 12 × 3,0 = 36,0 W.',
        ],
        fr: [
          'Données : Tension V = 12 V et Résistance R = 4 Ω.',
          'Calcul du courant (Loi d’Ohm) : I = V / R = 12 / 4 = 3,0 A.',
          'Dissipation de puissance : P = V × I = 12 × 3,0 = 36,0 W.',
        ],
        de: [
          'Gegeben: Spannung V = 12 V und Widerstand R = 4 Ω.',
          'Stromstärke nach dem Ohmschen Gesetz: I = V / R = 12 / 4 = 3,0 A.',
          'Elektrische Verlustleistung: P = V × I = 12 × 3,0 = 36,0 W.',
        ],
      },
      result: {
        en: 'Current I = 3.00 A | Power P = 36.00 W',
        ar: 'شدة التيار = 3.00 أمبير | القدرة = 36.00 واط',
        es: 'Corriente I = 3,00 A | Potencia P = 36,00 W',
        fr: 'Courant I = 3,00 A | Puissance P = 36,00 W',
        de: 'Stromstärke I = 3,00 A | Leistung P = 36,00 W',
      },
    };
    return {
      scenario: examples.scenario[lang] || examples.scenario.en,
      stepByStep: examples.stepByStep[lang] || examples.stepByStep.en,
      result: examples.result[lang] || examples.result.en,
    };
  }

  // 3. Kinetic Energy / Physics
  if (s.includes('kinetic') || s.includes('velocity-acceleration')) {
    const examples: FallbackWorkedExampleSpec = {
      scenario: {
        en: 'A 1,500 kg vehicle accelerates from rest to 20 m/s (72 km/h).',
        ar: 'مركبة كتلتها 1,500 كجم تتسارع من السكون إلى سرعة 20 م/ث (72 كم/ساعة).',
        es: 'Un vehículo de 1.500 kg acelera desde el reposo hasta 20 m/s (72 km/h).',
        fr: 'Un véhicule de 1 500 kg accélère de l’arrêt jusqu’à 20 m/s (72 km/h).',
        de: 'Ein 1.500 kg schweres Fahrzeug beschleunigt aus dem Stand auf 20 m/s (72 km/h).',
      },
      stepByStep: {
        en: [
          'Given mass m = 1,500 kg and velocity v = 20 m/s.',
          'Square the velocity: v² = (20 m/s)² = 400 m²/s².',
          'Compute kinetic energy: E_k = 0.5 × m × v² = 0.5 × 1,500 × 400 = 300,000 J (300 kJ).',
        ],
        ar: [
          'المعطيات: الكتلة ك = 1,500 كجم، والسرعة ع = 20 م/ث.',
          'تربيع السرعة: ع² = (20)² = 400 م²/ث².',
          'حساب طاقة الحركة: ط_ح = 0.5 × ك × ع² = 0.5 × 1,500 × 400 = 300,000 جول (300 كيلو جول).',
        ],
        es: [
          'Datos: masa m = 1.500 kg y velocidad v = 20 m/s.',
          'Cuadrado de la velocidad: v² = (20 m/s)² = 400 m²/s².',
          'Cálculo de energía cinética: E_c = 0,5 × m × v² = 0,5 × 1.500 × 400 = 300.000 J (300 kJ).',
        ],
        fr: [
          'Données : masse m = 1 500 kg et vitesse v = 20 m/s.',
          'Carré de la vitesse : v² = (20 m/s)² = 400 m²/s².',
          'Énergie cinétique : E_c = 0,5 × m × v² = 0,5 × 1 500 × 400 = 300 000 J (300 kJ).',
        ],
        de: [
          'Gegeben: Masse m = 1.500 kg und Geschwindigkeit v = 20 m/s.',
          'Quadrat der Geschwindigkeit: v² = (20 m/s)² = 400 m²/s².',
          'Kinetische Energie: E_kin = 0,5 × m × v² = 0,5 × 1.500 × 400 = 300.000 J (300 kJ).',
        ],
      },
      result: {
        en: 'Kinetic Energy E_k = 300,000 J (300.00 kJ)',
        ar: 'طاقة الحركة = 300,000 جول (300.00 كيلو جول)',
        es: 'Energía Cinética E_c = 300.000 J (300,00 kJ)',
        fr: 'Énergie Cinétique E_c = 300 000 J (300,00 kJ)',
        de: 'Kinetische Energie E_kin = 300.000 J (300,00 kJ)',
      },
    };
    return {
      scenario: examples.scenario[lang] || examples.scenario.en,
      stepByStep: examples.stepByStep[lang] || examples.stepByStep.en,
      result: examples.result[lang] || examples.result.en,
    };
  }

  // 4. Default Domain-Specific Realistic Example
  const domainExamples: Record<DomainKey, FallbackWorkedExampleSpec> = {
    'personal-finance': {
      scenario: {
        en: `Evaluating savings growth with a $5,000 principal at a 6% annual rate over 5 years.`,
        ar: `تقييم نمو مدخرات برأس مال 5,000 دولار بمعدل سنوي 6% لمدة 5 سنوات.`,
        es: `Evaluación del crecimiento de 5.000 $ al 6% anual durante 5 años.`,
        fr: `Évaluation d’une épargne de 5 000 $ au taux annuel de 6 % sur 5 ans.`,
        de: `Berechnung eines Sparbetrags von 5.000 € bei 6 % Jahreszins über 5 Jahre.`,
      },
      stepByStep: {
        en: [
          'Starting balance P = $5,000, annual interest rate r = 0.06, time t = 5 years.',
          'Apply the compounding multiplier: (1 + 0.06)^5 ≈ 1.3382.',
          'Multiply principal: A = $5,000 × 1.3382 = $6,691.13 total balance ($1,691.13 net interest).',
        ],
        ar: [
          'المبلغ الأولي = 5,000 دولار، معدل الفائدة = 0.06، المدة = 5 سنوات.',
          'حساب معامل التراكم: (1 + 0.06)^5 ≈ 1.3382.',
          'الرصيد الإجمالي = 5,000 × 1.3382 = 6,691.13 دولار (فوائد صافية: 1,691.13 دولار).',
        ],
        es: [
          'Saldo inicial P = 5.000 $, tasa r = 0,06, plazo t = 5 años.',
          'Factor compuesto: (1 + 0,06)^5 ≈ 1,3382.',
          'Capital final: 5.000 $ × 1,3382 = 6.691,13 $ (intereses generados: 1.691,13 $).',
        ],
        fr: [
          'Capital initial P = 5 000 $, taux r = 0,06, durée t = 5 ans.',
          'Facteur de capitalisation : (1 + 0,06)^5 ≈ 1,3382.',
          'Montant final : 5 000 $ × 1,3382 = 6 691,13 $ (intérêts acquis : 1 691,13 $).',
        ],
        de: [
          'Anfangskapital P = 5.000 €, Zinssatz r = 0,06, Laufzeit t = 5 Jahre.',
          'Zinseszinsfaktor: (1 + 0,06)^5 ≈ 1,3382.',
          'Endguthaben: 5.000 € × 1,3382 = 6.691,13 € (Zinsgewinn: 1.691,13 €).',
        ],
      },
      result: {
        en: 'Ending Balance = $6,691.13 | Earned Interest = $1,691.13',
        ar: 'الرصيد النهائي = 6,691.13 دولار | الفوائد المكتسبة = 1,691.13 دولار',
        es: 'Saldo Final = 6.691,13 $ | Intereses = 1.691,13 $',
        fr: 'Solde Final = 6 691,13 $ | Intérêts = 1 691,13 $',
        de: 'Endstand = 6.691,13 € | Zinsertrag = 1.691,13 €',
      },
    },

    'corporate-finance': {
      scenario: {
        en: `Computing corporate debt coverage with $150,000 Net Operating Income and $100,000 annual debt service.`,
        ar: `احتساب تغطية ديون الشركة بدخل تشغيلي قدره 150,000 دولار وخدمة دين سنوية قدرها 100,000 دولار.`,
        es: `Cálculo de cobertura de deuda con 150.000 $ de ingreso operativo y 100.000 $ de servicio de deuda.`,
        fr: `Calcul de couverture de la dette avec 150 000 $ d’EBITDA et 100 000 $ d’annuité de remboursement.`,
        de: `Berechnung des Schuldendienstdeckungsgrads bei 150.000 € Betriebsergebnis und 100.000 € Annuität.`,
      },
      stepByStep: {
        en: [
          'Net Operating Income (NOI) = $150,000.',
          'Total Annual Debt Service = $100,000.',
          'Coverage Multiple = $150,000 / $100,000 = 1.50x.',
        ],
        ar: [
          'صافي الدخل التشغيلي = 150,000 دولار.',
          'إجمالي خدمة الدين السنوية = 100,000 دولار.',
          'مضاعف التغطية = 150,000 / 100,000 = 1.50 مرة.',
        ],
        es: [
          'Ingreso Operativo Neto (NOI) = 150.000 $.',
          'Servicio Anual de la Deuda = 100.000 $.',
          'Ratio de Cobertura = 150.000 $ / 100.000 $ = 1,50x.',
        ],
        fr: [
          'Résultat d’exploitation (NOI) = 150 000 $.',
          'Service annuel de la dette = 100 000 $.',
          'Ratio de couverture = 150 000 $ / 100 000 $ = 1,50x.',
        ],
        de: [
          'Betriebsergebnis (NOI) = 150.000 €.',
          'Jährlicher Schuldendienst = 100.000 €.',
          'Deckungsgrad = 150.000 € / 100.000 € = 1,50x.',
        ],
      },
      result: {
        en: 'Coverage Ratio = 1.50x (Adequate corporate solvency margin)',
        ar: 'معدل التغطية = 1.50 مرة (هامش ملاءة مالية مناسب)',
        es: 'Ratio de Cobertura = 1,50x (Margen de solvencia adecuado)',
        fr: 'Ratio de Cobertura = 1,50x (Marge de solvabilité saine)',
        de: 'Deckungsgrad = 1,50x (Solide Bonitätsmarge)',
      },
    },

    'converters': {
      scenario: {
        en: `Standard conversion of 50.0 kilometers to statute miles and nautical miles.`,
        ar: `تحويل قياسي لمسافة 50.0 كيلومتر إلى أميال أرضية وأميال بحرية.`,
        es: `Conversión estándar de 50,0 km a millas terrestres y millas náuticas.`,
        fr: `Conversion métrologique de 50,0 kilomètres en milles terrestres et nautiques.`,
        de: `Standardumrechnung von 50,0 Kilometern in Meilen und Seemeilen.`,
      },
      stepByStep: {
        en: [
          'Source value: 50.0 km.',
          'Multiply by international statute mile factor (1 km ≈ 0.621371 mi): 50.0 × 0.621371 = 31.0686 mi.',
          'Multiply by international nautical mile factor (1 km ≈ 0.539957 NM): 50.0 × 0.539957 = 26.9978 NM.',
        ],
        ar: [
          'القيمة المدخلة: 50.0 كم.',
          'الضرب في معامل الميل الأرضي (1 كم ≈ 0.621371 ميل): 50.0 × 0.621371 = 31.0686 ميل.',
          'الضرب في معامل الميل البحري (1 كم ≈ 0.539957 ميل بحري): 50.0 × 0.539957 = 26.9978 ميل بحري.',
        ],
        es: [
          'Valor origen: 50,0 km.',
          'Multiplicar por factor de milla terrestre (0,621371): 50,0 × 0,621371 = 31,0686 mi.',
          'Multiplicar por factor de milla náutica (0,539957): 50,0 × 0,539957 = 26,9978 NM.',
        ],
        fr: [
          'Valeur de départ : 50,0 km.',
          'Multiplication par le facteur de mille terrestre (0,621371) : 50,0 × 0,621371 = 31,0686 mi.',
          'Multiplication par le facteur de mille marin (0,539957) : 50,0 × 0,539957 = 26,9978 NM.',
        ],
        de: [
          'Ausgangswert: 50,0 km.',
          'Multiplikation mit Meilen-Faktor (0,621371): 50,0 × 0,621371 = 31,0686 mi.',
          'Multiplikation mit Seemeilen-Faktor (0,539957): 50,0 × 0,539957 = 26,9978 NM.',
        ],
      },
      result: {
        en: '50.00 km = 31.07 mi = 27.00 Nautical Miles',
        ar: '50.00 كم = 31.07 ميل أرضي = 27.00 ميل بحري',
        es: '50,00 km = 31,07 mi = 27,00 Millas Náuticas',
        fr: '50,00 km = 31,07 mi = 27,00 Milles Marins',
        de: '50,00 km = 31,07 mi = 27,00 Seemeilen',
      },
    },

    'mathematics': {
      scenario: {
        en: `Calculating percentage proportion: finding what percentage 45 is of 225.`,
        ar: `حساب النسبة المئوية: إيجاد النسبة التي يمثلها الرقم 45 من إجمالي 225.`,
        es: `Cálculo de proporción: qué porcentaje representa 45 respecto a 225.`,
        fr: `Calcul de proportion : pourcentage représenté par 45 sur un total de 225.`,
        de: `Prozentrechnung: Welcher Prozentsatz entspricht 45 von 225.`,
      },
      stepByStep: {
        en: [
          'Part value = 45, Base total = 225.',
          'Compute relative ratio: 45 / 225 = 0.20.',
          'Multiply by 100%: 0.20 × 100% = 20.00%.',
        ],
        ar: [
          'القيمة الجزئية = 45، الإجمالي الكلي = 225.',
          'حساب النسبة الرياضية: 45 / 225 = 0.20.',
          'الضرب في 100%: 0.20 × 100% = 20.00%.',
        ],
        es: [
          'Valor parcial = 45, Base total = 225.',
          'División de cociente: 45 / 225 = 0,20.',
          'Multiplicación por 100%: 0,20 × 100% = 20,00%.',
        ],
        fr: [
          'Valeur partielle = 45, Valeur totale de référence = 225.',
          'Rapport de proportion : 45 / 225 = 0,20.',
          'Conversion en pourcentage : 0,20 × 100 % = 20,00 %.',
        ],
        de: [
          'Teilwert = 45, Grundwert = 225.',
          'Verhältnisbildung: 45 / 225 = 0,20.',
          'Prozentumrechnung: 0,20 × 100 % = 20,00 %.',
        ],
      },
      result: {
        en: 'Result = 20.00% (45 is exactly one-fifth of 225)',
        ar: 'النتيجة = 20.00% (يمثل 45 بالضبط خُمس العدد 225)',
        es: 'Resultado = 20,00% (45 es exactamente un quinto de 225)',
        fr: 'Résultat = 20,00 % (45 représente exactement un cinquième de 225)',
        de: 'Ergebnis = 20,00 % (45 entspricht genau einem Fünftel von 225)',
      },
    },

    'accounting': {
      scenario: {
        en: `Straight-line depreciation of a $25,000 commercial equipment asset with $5,000 salvage value over 5 years.`,
        ar: `إهلاك بالقسط الثابت لمعدة تجارية قيمتها 25,000 دولار بقيمة تخريدية 5,000 دولار على مدار 5 سنوات.`,
        es: `Amortización lineal de un activo de 25.000 $ con valor residual de 5.000 $ en 5 años.`,
        fr: `Amortissement linéaire d’un équipement de 25 000 $ avec valeur résiduelle de 5 000 $ sur 5 ans.`,
        de: `Lineare Abschreibung einer Maschine von 25.000 € mit 5.000 € Restwert über 5 Jahre.`,
      },
      stepByStep: {
        en: [
          'Initial cost = $25,000, Salvage value = $5,000.',
          'Depreciable base = $25,000 - $5,000 = $20,000.',
          'Annual depreciation expense = $20,000 / 5 years = $4,000.00 per year.',
        ],
        ar: [
          'التكلفة الأولية = 25,000 دولار، القيمة التخريدية = 5,000 دولار.',
          'الوعاء الخاضع للإهلاك = 25,000 - 5,000 = 20,000 دولار.',
          'قسط الإهلاك السنوي = 20,000 / 5 سنوات = 4,000.00 دولار سنوياً.',
        ],
        es: [
          'Coste inicial = 25.000 $, Valor residual = 5.000 $.',
          'Base amortizable = 25.000 $ - 5.000 $ = 20.000 $.',
          'Dotación anual de amortización = 20.000 $ / 5 = 4.000,00 $ al año.',
        ],
        fr: [
          'Coût initial = 25 000 $, Valeur résiduelle = 5 000 $.',
          'Base amortissable = 25 000 $ - 5 000 $ = 20 000 $.',
          'Amortissement annuel = 20 000 $ / 5 ans = 4 000,00 $ par an.',
        ],
        de: [
          'Anschaffungskosten = 25.000 €, Restwert = 5.000 €.',
          'Abschreibungsvolumen = 25.000 € - 5.000 € = 20.000 €.',
          'Jährliche AfA = 20.000 € / 5 Jahre = 4.000,00 € pro Jahr.',
        ],
      },
      result: {
        en: 'Annual Depreciation = $4,000.00 / year (Book Value at Year 5 = $5,000.00)',
        ar: 'قسط الإهلاك السنوي = 4,000.00 دولار سنوياً (القيمة الدفترية عند نهاية السنة الخامسة = 5,000.00 دولار)',
        es: 'Amortización Anual = 4.000,00 $/año (Valor contable al año 5 = 5.000,00 $)',
        fr: 'Amortissement Annuel = 4 000,00 $/an (Valeur nette comptable à l’an 5 = 5 000,00 $)',
        de: 'Jährliche AfA = 4.000,00 €/Jahr (Buchwert nach 5 Jahren = 5.000,00 €)',
      },
    },

    'investing': {
      scenario: {
        en: `Computing CAGR for an investment growing from $10,000 to $20,000 over 7 years.`,
        ar: `حساب معدل النمو السنوي المركب (CAGR) لاستثمار نما من 10,000 إلى 20,000 دولار خلال 7 سنوات.`,
        es: `Cálculo de CAGR para una inversión que crece de 10.000 $ a 20.000 $ en 7 años.`,
        fr: `Calcul du CAGR pour un placement passant de 10 000 $ à 20 000 $ en 7 ans.`,
        de: `Berechnung der CAGR für eine Anlage, die von 10.000 € auf 20.000 € in 7 Jahren anwächst.`,
      },
      stepByStep: {
        en: [
          'Beginning value = $10,000, Ending value = $20,000, Period = 7 years.',
          'Growth ratio = 20,000 / 10,000 = 2.0 (total return 100%).',
          'Annualized compound rate: (2.0)^(1/7) - 1 ≈ 1.10409 - 1 = 10.41% per year.',
        ],
        ar: [
          'القيمة الابتدائية = 10,000 دولار، القيمة النهائية = 20,000 دولار، المدة = 7 سنوات.',
          'نسبة النمو = 20,000 / 10,000 = 2.0 (عائد إجمالي 100%).',
          'معدل النمو السنوي المركب: (2.0)^(1/7) - 1 ≈ 10.41% سنوياً.',
        ],
        es: [
          'Valor inicial = 10.000 $, Valor final = 20.000 $, Plazo = 7 años.',
          'Razón de crecimiento = 20.000 $ / 10.000 $ = 2,0.',
          'Tasa anualizada: (2,0)^(1/7) - 1 ≈ 10,41% anual.',
        ],
        fr: [
          'Valeur initiale = 10 000 $, Valeur finale = 20 000 $, Durée = 7 ans.',
          'Coefficient multiplicateur = 20 000 $ / 10 000 $ = 2,0.',
          'Taux annualisé composé : (2,0)^(1/7) - 1 ≈ 10,41 % par an.',
        ],
        de: [
          'Anfangswert = 10.000 €, Endwert = 20.000 €, Zeitraum = 7 Jahre.',
          'Gesamtwachstumsfaktor = 20.000 € / 10.000 € = 2,0.',
          'Annualisierte Wachstumsrate: (2,0)^(1/7) - 1 ≈ 10,41 % p.a.',
        ],
      },
      result: {
        en: 'CAGR = 10.41% per year (Rule of 72 doubles capital in ~6.9 years)',
        ar: 'معدل النمو المركب = 10.41% سنوياً (تضاعف رأس المال وفق قاعدة 72 في نحو 6.9 سنوات)',
        es: 'CAGR = 10,41% anual (Duplica el capital en aprox. 6,9 años)',
        fr: 'CAGR = 10,41 % par an (Doublement du capital en environ 6,9 ans)',
        de: 'CAGR = 10,41 % p.a. (Kapitalverdopplung nach ca. 6,9 Jahren)',
      },
    },

    'loans': {
      scenario: {
        en: `Amortizing a $20,000 vehicle loan at 5.0% annual interest over 4 years (48 monthly payments).`,
        ar: `إهلاك قرض سيارة بقيمة 20,000 دولار بفائدة سنوية 5.0% لمدة 4 سنوات (48 قسطاً شهرياً).`,
        es: `Amortización de un préstamo de 20.000 $ al 5,0% anual a 4 años (48 cuotas).`,
        fr: `Amortissement d’un crédit auto de 20 000 $ à 5,0 % sur 4 ans (48 mensualités).`,
        de: `Tilgung eines Autokredits über 20.000 € zu 5,0 % Jahreszins auf 4 Jahre (48 Raten).`,
      },
      stepByStep: {
        en: [
          'Principal = $20,000, monthly rate = 0.05 / 12 ≈ 0.004167, periods = 48 months.',
          'Apply standard annuity formula: M = P × [r(1+r)^n] / [(1+r)^n - 1].',
          'Monthly payment = $460.59; total repayment = $22,108.13 ($2,108.13 total interest).',
        ],
        ar: [
          'أصل القرض = 20,000 دولار، الفائدة الشهرية = 0.05 / 12 ≈ 0.004167، عدد الأشهر = 48.',
          'تطبيق معادلة الأقساط الثابتة المركبة.',
          'القسط الشهري = 460.59 دولار؛ إجمالي المبلغ المسدد = 22,108.13 دولار (فوائد: 2,108.13 دولار).',
        ],
        es: [
          'Capital = 20.000 $, tipo mensual = 0,05 / 12, plazo = 48 meses.',
          'Aplicación de la fórmula francesa de cuota constante.',
          'Cuota mensual = 460,59 $; desembolso total = 22.108,13 $ (intereses: 2.108,13 $).',
        ],
        fr: [
          'Capital = 20 000 $, taux mensuel = 0,05 / 12, durée = 48 mois.',
          'Application de la formule d’annuité constante standard.',
          'Mensualité = 460,59 $; coût total = 22 108,13 $ (intérêts : 2 108,13 $).',
        ],
        de: [
          'Kreditbetrag = 20.000 €, Monatszins = 0,05 / 12, Laufzeit = 48 Monate.',
          'Berechnung nach der Annuitätenformel.',
          'Monatsrate = 460,59 €; Gesamtzahlung = 22.108,13 € (Gesamtzins: 2.108,13 €).',
        ],
      },
      result: {
        en: 'Monthly Payment = $460.59 | Total Interest = $2,108.13',
        ar: 'القسط الشهري = 460.59 دولار | إجمالي الفوائد = 2,108.13 دولار',
        es: 'Cuota Mensual = 460,59 $ | Interés Total = 2.108,13 $',
        fr: 'Mensualité = 460,59 $ | Intérêts Totaux = 2 108,13 $',
        de: 'Monatliche Rate = 460,59 € | Gesamtzinsen = 2.108,13 €',
      },
    },

    'real-estate': {
      scenario: {
        en: `Cap rate assessment for a rental property purchased for $400,000 producing $32,000 annual net operating income (NOI).`,
        ar: `تقييم معدل الرسملة (Cap Rate) لعقار تم شراؤه بمبلغ 400,000 دولار بدخل تشغيلي سنوي صافٍ قدره 32,000 دولار.`,
        es: `Cálculo de Cap Rate para un inmueble adquirido por 400.000 $ con 32.000 $ de ingreso operativo neto (NOI).`,
        fr: `Calcul du taux de capitalisation d’un bien acquis 400 000 $ générant 32 000 $ de revenu net annuel (NOI).`,
        de: `Berechnung der Cap Rate für ein Mietshaus für 400.000 € mit 32.000 € Netto-Mietertrag (NOI).`,
      },
      stepByStep: {
        en: [
          'Net Operating Income (NOI) = $32,000.',
          'Purchase Asset Price = $400,000.',
          'Cap Rate = (NOI / Asset Price) × 100 = ($32,000 / $400,000) × 100 = 8.00%.',
        ],
        ar: [
          'صافي الدخل التشغيلي السنوي = 32,000 دولار.',
          'سعر شراء العقار = 400,000 دولار.',
          'معدل الرسملة = (32,000 / 400,000) × 100 = 8.00%.',
        ],
        es: [
          'Ingreso Operativo Neto (NOI) = 32.000 $.',
          'Precio de adquisición = 400.000 $.',
          'Cap Rate = (32.000 $ / 400.000 $) × 100 = 8,00%.',
        ],
        fr: [
          'Revenu net d’exploitation (NOI) = 32 000 $.',
          'Prix d’acquisition = 400 000 $.',
          'Cap Rate = (32 000 $ / 400 000 $) × 100 = 8,00 %.',
        ],
        de: [
          'Nettobetriebsergebnis (NOI) = 32.000 €.',
          'Kaufpreis = 400.000 €.',
          'Cap Rate = (32.000 € / 400.000 €) × 100 = 8,00 %.',
        ],
      },
      result: {
        en: 'Capitalization Rate (Cap Rate) = 8.00%',
        ar: 'معدل الرسملة (Cap Rate) = 8.00%',
        es: 'Tasa de Capitalización (Cap Rate) = 8,00%',
        fr: 'Taux de Capitalisation (Cap Rate) = 8,00 %',
        de: 'Kapitalisierungsrate (Cap Rate) = 8,00 %',
      },
    },

    'health': {
      scenario: {
        en: `Evaluating adult Mean Arterial Pressure (MAP) with blood pressure 120/80 mmHg.`,
        ar: `تقييم متوسط الضغط الشرياني (MAP) لشخص بضغط دم 120/80 ملم زئبق.`,
        es: `Evaluación de la Presión Arterial Media (PAM) con tensión 120/80 mmHg.`,
        fr: `Calcul de la Pression Artérielle Moyenne (PAM) pour une tension de 120/80 mmHg.`,
        de: `Berechnung des mittleren arteriellen Drucks (MAP) bei Blutdruck 120/80 mmHg.`,
      },
      stepByStep: {
        en: [
          'Systolic Blood Pressure (SBP) = 120 mmHg, Diastolic Blood Pressure (DBP) = 80 mmHg.',
          'Pulse Pressure = 120 - 80 = 40 mmHg.',
          'Calculate MAP: DBP + (Pulse Pressure / 3) = 80 + (40 / 3) = 80 + 13.33 = 93.33 mmHg.',
        ],
        ar: [
          'الضغط الانقباضي = 120 ملم زئبق، الضغط الانبساطي = 80 ملم زئبق.',
          'ضغط النبض = 120 - 80 = 40 ملم زئبق.',
          'حساب متوسط الضغط: 80 + (40 / 3) = 80 + 13.33 = 93.33 ملم زئبق.',
        ],
        es: [
          'Presión sistólica (PAS) = 120 mmHg, Presión diastólica (PAD) = 80 mmHg.',
          'Presión de pulso = 120 - 80 = 40 mmHg.',
          'Cálculo de PAM: 80 + (40 / 3) = 80 + 13,33 = 93,33 mmHg.',
        ],
        fr: [
          'Pression systolique (PAS) = 120 mmHg, Pression diastolique (PAD) = 80 mmHg.',
          'Pression différentielle = 120 - 80 = 40 mmHg.',
          'Calcul de la PAM : 80 + (40 / 3) = 80 + 13,33 = 93,33 mmHg.',
        ],
        de: [
          'Systolischer Blutdruck (SBP) = 120 mmHg, Diastolischer Blutdruck (DBP) = 80 mmHg.',
          'Pulsdruck = 120 - 80 = 40 mmHg.',
          'Berechnung des MAP: 80 + (40 / 3) = 80 + 13,33 = 93,33 mmHg.',
        ],
      },
      result: {
        en: 'Mean Arterial Pressure (MAP) = 93.33 mmHg (Standard normal perfusion: 70–100 mmHg)',
        ar: 'متوسط الضغط الشرياني = 93.33 ملم زئبق (المعدل الطبيعي للتروية: 70–100 ملم زئبق)',
        es: 'Presión Arterial Media (PAM) = 93,33 mmHg (Rango normal: 70–100 mmHg)',
        fr: 'Pression Artérielle Moyenne (PAM) = 93,33 mmHg (Norme de perfusion : 70–100 mmHg)',
        de: 'Mittlerer arterieller Druck (MAP) = 93,33 mmHg (Normalbereich: 70–100 mmHg)',
      },
    },

    'fitness': {
      scenario: {
        en: `Estimating Basal Metabolic Rate (BMR) for a 30-year-old individual weighing 70 kg and 175 cm tall using Mifflin-St Jeor.`,
        ar: `تقدير معدل الأيض الأساسي (BMR) لشخص بعمر 30 سنة ووزن 70 كجم وطول 175 سم بمعادلة ميفلين-سانت جور.`,
        es: `Estimación de la Tasa Metabólica Basal (TMB) para un adulto de 30 años, 70 kg y 175 cm (Mifflin-St Jeor).`,
        fr: `Estimation du métabolisme de base (MB) d’un individu de 30 ans, 70 kg et 175 cm (Mifflin-St Jeor).`,
        de: `Ermittlung des Grundumsatzes (BMR) für eine 30-jährige Person mit 70 kg und 175 cm (Mifflin-St-Jeor).`,
      },
      stepByStep: {
        en: [
          'Weight = 70 kg, Height = 175 cm, Age = 30 years.',
          'Apply base coefficients: (10 × 70) + (6.25 × 175) - (5 × 30) = 700 + 1093.75 - 150.',
          'Sum base energy: BMR ≈ 1,644 kcal/day (prior to physical activity multiplier).',
        ],
        ar: [
          'الوزن = 70 كجم، الطول = 175 سم، العمر = 30 سنة.',
          'تطبيق المعاملات: (10 × 70) + (6.25 × 175) - (5 × 30) = 700 + 1093.75 - 150.',
          'الناتج الأساسي: معدل الحرق الأساسي ≈ 1,644 سعرة حرارية/يوم (قبل مضاعف النشاط البدني).',
        ],
        es: [
          'Peso = 70 kg, Altura = 175 cm, Edad = 30 años.',
          'Coeficientes: (10 × 70) + (6,25 × 175) - (5 × 30) = 700 + 1.093,75 - 150.',
          'Gasto basal estimado: TMB ≈ 1.644 kcal/día.',
        ],
        fr: [
          'Poids = 70 kg, Taille = 175 cm, Âge = 30 ans.',
          'Application des constantes : (10 × 70) + (6,25 × 175) - (5 × 30) = 700 + 1 093,75 - 150.',
          'Dépense basale : MB ≈ 1 644 kcal/jour.',
        ],
        de: [
          'Gewicht = 70 kg, Größe = 175 cm, Alter = 30 Jahre.',
          'Formelansatz: (10 × 70) + (6,25 × 175) - (5 × 30) = 700 + 1093,75 - 150.',
          'Grundumsatz: BMR ≈ 1.644 kcal/Tag (vor Aktivitätsfaktor).',
        ],
      },
      result: {
        en: 'Basal Metabolic Rate = 1,644 kcal / day',
        ar: 'معدل الحرق الأساسي = 1,644 سعرة حرارية / يوم',
        es: 'Tasa Metabólica Basal = 1.644 kcal / día',
        fr: 'Métabolisme de Base = 1 644 kcal / jour',
        de: 'Grundumsatz (BMR) = 1.644 kcal / Tag',
      },
    },

    'linear-algebra': {
      scenario: {
        en: `Computing the determinant of a 2x2 matrix A = [[4, 7], [2, 6]].`,
        ar: `حساب محدد مصفوفة ثنائية 2×2: أ = [[4، 7]، [2، 6]].`,
        es: `Cálculo del determinante de una matriz 2x2 A = [[4, 7], [2, 6]].`,
        fr: `Calcul du déterminant d’une matrice 2x2 A = [[4, 7], [2, 6]].`,
        de: `Berechnung der Determinante einer 2x2-Matrix A = [[4, 7], [2, 6]].`,
      },
      stepByStep: {
        en: [
          'Matrix elements: a11 = 4, a12 = 7, a21 = 2, a22 = 6.',
          'Compute main diagonal product: 4 × 6 = 24.',
          'Subtract anti-diagonal product: 24 - (7 × 2) = 24 - 14 = 10.',
        ],
        ar: [
          'عناصر المصفوفة: أ11 = 4، أ12 = 7، أ21 = 2، أ22 = 6.',
          'حاصل ضرب القطر الرئيسي: 4 × 6 = 24.',
          'طرح حاصل ضرب القطر الثانوي: 24 - (7 × 2) = 24 - 14 = 10.',
        ],
        es: [
          'Elementos: a11 = 4, a12 = 7, a21 = 2, a22 = 6.',
          'Producto diagonal principal: 4 × 6 = 24.',
          'Resta de la diagonal secundaria: 24 - (7 × 2) = 24 - 14 = 10.',
        ],
        fr: [
          'Éléments : a11 = 4, a12 = 7, a21 = 2, a22 = 6.',
          'Produit de la diagonale principale : 4 × 6 = 24.',
          'Soustraction de la diagonale secondaire : 24 - (7 × 2) = 24 - 14 = 10.',
        ],
        de: [
          'Matrizenelemente: a11 = 4, a12 = 7, a21 = 2, a22 = 6.',
          'Hauptdiagonale: 4 × 6 = 24.',
          'Nebendiagonale abziehen: 24 - (7 × 2) = 24 - 14 = 10.',
        ],
      },
      result: {
        en: 'Determinant det(A) = 10 (Non-zero, matrix is invertible)',
        ar: 'المحدد det(A) = 10 (غير صفري، المصفوفة قابلة للعكس)',
        es: 'Determinante det(A) = 10 (No nulo, matriz invertible)',
        fr: 'Déterminant det(A) = 10 (Non nul, matrice inversible)',
        de: 'Determinante det(A) = 10 (Ungleich null, Matrix ist invertierbar)',
      },
    },

    'calculus': {
      scenario: {
        en: `Differentiating the polynomial function f(x) = 3x³ + 5x² - 7x + 12.`,
        ar: `اشتقاق دالة كثيرة الحدود f(x) = 3x³ + 5x² - 7x + 12.`,
        es: `Derivación del polinomio f(x) = 3x³ + 5x² - 7x + 12.`,
        fr: `Dérivation du polynôme f(x) = 3x³ + 5x² - 7x + 12.`,
        de: `Ableitung des Polynoms f(x) = 3x³ + 5x² - 7x + 12.`,
      },
      stepByStep: {
        en: [
          'Given function f(x) = 3x³ + 5x² - 7x + 12.',
          'Apply power rule d/dx[a*x^n] = a*n*x^(n-1) to each term individually.',
          'First term: 3(3)x² = 9x²; Second term: 5(2)x = 10x; Third term: -7; Constant: 0.',
        ],
        ar: [
          'الدالة المعطاة: f(x) = 3x³ + 5x² - 7x + 12.',
          'تطبيق قاعدة القوى في الاشتقاق على كل حد من الحدود.',
          'الحد الأول: 9x²؛ الحد الثاني: 10x؛ الحد الثالث: -7؛ ومشتقة الثابت = 0.',
        ],
        es: [
          'Función: f(x) = 3x³ + 5x² - 7x + 12.',
          'Aplicar regla de la potencia a cada término.',
          'Resultado por términos: 9x² + 10x - 7.',
        ],
        fr: [
          'Fonction : f(x) = 3x³ + 5x² - 7x + 12.',
          'Application de la règle des puissances terme à terme.',
          'Dérivée : 9x² + 10x - 7.',
        ],
        de: [
          'Funktion: f(x) = 3x³ + 5x² - 7x + 12.',
          'Potenzregel gliedweise anwenden.',
          'Ergebnis: f’(x) = 9x² + 10x - 7.',
        ],
      },
      result: {
        en: 'Derivative f’(x) = 9x² + 10x - 7',
        ar: 'المشتقة الأولى f’(x) = 9x² + 10x - 7',
        es: 'Derivada f’(x) = 9x² + 10x - 7',
        fr: 'Dérivée f’(x) = 9x² + 10x - 7',
        de: 'Erste Ableitung f’(x) = 9x² + 10x - 7',
      },
    },

    'statistics': {
      scenario: {
        en: `Computing the mean and standard deviation for sample data: [10, 14, 16, 18, 22].`,
        ar: `حساب المتوسط الحسابي والانحراف المعياري لعينة بيانات: [10، 14، 16، 18، 22].`,
        es: `Cálculo de la media y desviación típica para la muestra: [10, 14, 16, 18, 22].`,
        fr: `Calcul de la moyenne et de l’écart-type de la série : [10, 14, 16, 18, 22].`,
        de: `Berechnung von Mittelwert und Standardabweichung für die Stichprobe: [10, 14, 16, 18, 22].`,
      },
      stepByStep: {
        en: [
          'Sum data values: 10 + 14 + 16 + 18 + 22 = 80; Sample size n = 5.',
          'Sample mean μ = 80 / 5 = 16.0.',
          'Sum squared deviations: (10-16)² + (14-16)² + (16-16)² + (18-16)² + (22-16)² = 36 + 4 + 0 + 4 + 36 = 80.',
          'Sample variance s² = 80 / (5 - 1) = 20; Standard deviation s = √20 ≈ 4.47.',
        ],
        ar: [
          'مجموع القيم: 10 + 14 + 16 + 18 + 22 = 80؛ حجم العينة n = 5.',
          'المتوسط الحسابي = 80 / 5 = 16.0.',
          'مجموع مربعات الانحرافات عن المتوسط: 36 + 4 + 0 + 4 + 36 = 80.',
          'تباين العينة = 80 / 4 = 20؛ الانحراف المعياري = جذر(20) ≈ 4.47.',
        ],
        es: [
          'Suma de valores: 80; Tamaño muestral n = 5; Media = 16,0.',
          'Suma de diferencias al cuadrado = 36 + 4 + 0 + 4 + 36 = 80.',
          'Varianza muestral s² = 80 / (5 - 1) = 20; Desviación típica s = √20 ≈ 4,47.',
        ],
        fr: [
          'Somme des valeurs : 80; Taille n = 5; Moyenne = 16,0.',
          'Somme des carrés des écarts = 36 + 4 + 0 + 4 + 36 = 80.',
          'Variance s² = 80 / (5 - 1) = 20; Écart-type s = √20 ≈ 4,47.',
        ],
        de: [
          'Summe: 80; Stichprobenumfang n = 5; Mittelwert = 16,0.',
          'Summe der quadrierten Abweichungen = 80.',
          'Stichprobenvarianz s² = 80 / 4 = 20; Standardabweichung s = √20 ≈ 4,47.',
        ],
      },
      result: {
        en: 'Sample Mean = 16.00 | Sample Standard Deviation = 4.47',
        ar: 'المتوسط الحسابي = 16.00 | الانحراف المعياري = 4.47',
        es: 'Media = 16,00 | Desviación Estándar = 4,47',
        fr: 'Moyenne = 16,00 | Écart-type = 4,47',
        de: 'Mittelwert = 16,00 | Standardabweichung = 4,47',
      },
    },

    'science': {
      scenario: {
        en: `Computing the gravitational potential energy of a 25 kg mass lifted 8 meters on Earth (g = 9.81 m/s²).`,
        ar: `حساب طاقة الوضع الثقالية لجسم كتلته 25 كجم رُفع مسافة 8 أمتار على سطح الأرض (عجلة الجاذبية = 9.81 م/ث²).`,
        es: `Cálculo de la energía potencial gravitatoria de una masa de 25 kg elevada 8 m (g = 9,81 m/s²).`,
        fr: `Calcul de l’énergie potentielle de pesanteur d’une masse de 25 kg élevée de 8 m (g = 9,81 m/s²).`,
        de: `Berechnung der potenziellen Energie einer Masse von 25 kg in 8 m Höhe (g = 9,81 m/s²).`,
      },
      stepByStep: {
        en: [
          'Mass m = 25 kg, Acceleration of gravity g = 9.81 m/s², Height h = 8.0 m.',
          'Apply potential energy formula: E_p = m × g × h.',
          'Multiply terms: 25 × 9.81 × 8.0 = 1,962.00 Joules.',
        ],
        ar: [
          'الكتلة = 25 كجم، تسارع الجاذبية = 9.81 م/ث²، الارتفاع = 8.0 أمتار.',
          'تطبيق معادلة طاقة الوضع: ط_و = ك × ج × ف.',
          'حساب الناتج: 25 × 9.81 × 8.0 = 1,962.00 جول.',
        ],
        es: [
          'Masa m = 25 kg, Gravedad g = 9,81 m/s², Altura h = 8,0 m.',
          'Fórmula de energía potencial: E_p = m × g × h.',
          'Cálculo: 25 × 9,81 × 8,0 = 1.962,00 J.',
        ],
        fr: [
          'Masse m = 25 kg, Gravité g = 9,81 m/s², Hauteur h = 8,0 m.',
          'Formule : E_p = m × g × h.',
          'Calcul : 25 × 9,81 × 8,0 = 1 962,00 J.',
        ],
        de: [
          'Masse m = 25 kg, Erdbeschleunigung g = 9,81 m/s², Höhe h = 8,0 m.',
          'Formel für potenzielle Energie: E_pot = m × g × h.',
          'Berechnung: 25 × 9,81 × 8,0 = 1.962,00 J.',
        ],
      },
      result: {
        en: 'Gravitational Potential Energy = 1,962.00 Joules (1.96 kJ)',
        ar: 'طاقة الوضع الثقالية = 1,962.00 جول (1.96 كيلو جول)',
        es: 'Energía Potencial Gravitatoria = 1.962,00 J (1,96 kJ)',
        fr: 'Énergie Potentielle = 1 962,00 J (1,96 kJ)',
        de: 'Potenzielle Energie = 1.962,00 Joule (1,96 kJ)',
      },
    },

    'engineering': {
      scenario: {
        en: `Estimating concrete volume required for a foundation slab measuring 6.0 m length × 4.0 m width × 0.15 m thickness.`,
        ar: `تقدير حجم الخرسانة لقاعدة أرضية بأبعاد 6.0 أمتار طولاً × 4.0 أمتار عرضاً × 0.15 متر سمكاً.`,
        es: `Cálculo del volumen de hormigón para una solera de 6,0 m × 4,0 m con espesor de 0,15 m.`,
        fr: `Calcul du volume de béton pour une dalle de 6,0 m × 4,0 m sur une épaisseur de 0,15 m.`,
        de: `Berechnung des Betonvolumens für eine Bodenplatte von 6,0 m × 4,0 m bei 0,15 m Stärke.`,
      },
      stepByStep: {
        en: [
          'Dimensions: Length = 6.0 m, Width = 4.0 m, Thickness = 0.15 m.',
          'Calculate base volume: 6.0 × 4.0 × 0.15 = 3.60 m³.',
          'Add standard 10% jobsite waste factor: 3.60 × 1.10 = 3.96 m³.',
        ],
        ar: [
          'الأبعاد: الطول = 6.0 م، العرض = 4.0 م، السمك = 0.15 م.',
          'حساب الحجم الهندسي: 6.0 × 4.0 × 0.15 = 3.60 متر مكعب.',
          'إضافة نسبة هدر معيارية 10%: 3.60 × 1.10 = 3.96 متر مكعب خرسانة جاهزة.',
        ],
        es: [
          'Dimensiones: 6,0 m × 4,0 m × 0,15 m.',
          'Volumen teórico: 6,0 × 4,0 × 0,15 = 3,60 m³.',
          'Añadir 10% de merma en obra: 3,60 × 1,10 = 3,96 m³.',
        ],
        fr: [
          'Dimensions : 6,0 m × 4,0 m × 0,15 m.',
          'Volume géométrique : 6,0 × 4,0 × 0,15 = 3,60 m³.',
          'Ajout de 10 % de marge de sécurité : 3,60 × 1,10 = 3,96 m³.',
        ],
        de: [
          'Abmessungen: 6,0 m × 4,0 m × 0,15 m.',
          'Reines Bauteilvolumen: 6,0 × 4,0 × 0,15 = 3,60 m³.',
          'Zuschlag von 10 % Einbauverlust: 3,60 × 1,10 = 3,96 m³.',
        ],
      },
      result: {
        en: 'Required Concrete = 3.96 m³ (Includes 10% waste buffer)',
        ar: 'الخرسانة المطلوبة = 3.96 متر مكعب (شاملة 10% احتياطي هدر)',
        es: 'Hormigón necesario = 3,96 m³ (Incluye 10% de merma)',
        fr: 'Béton à commander = 3,96 m³ (Avec marge de 10 %)',
        de: 'Bestellmenge Beton = 3,96 m³ (Inklusive 10 % Einbauschwund)',
      },
    },

    'developer-tools': {
      scenario: {
        en: `Generating SHA-256 cryptographic hash digest for the test string "Hello World".`,
        ar: `توليد بصمة هاش التشفير SHA-256 للنص التجريبي "Hello World".`,
        es: `Generación de hash criptográfico SHA-256 para la cadena de prueba "Hello World".`,
        fr: `Génération de l’empreinte cryptographique SHA-256 pour la chaîne "Hello World".`,
        de: `Berechnung des SHA-256-Prüfwerts für den Teststring "Hello World".`,
      },
      stepByStep: {
        en: [
          'Input string: "Hello World" serialized into UTF-8 binary byte array [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100].',
          'Execute NIST FIPS 180-4 64-round transformation compression pipeline.',
          'Format 256-bit binary digest output into 64-character hexadecimal representation.',
        ],
        ar: [
          'النص المدخل: "Hello World" يتم تحويله إلى تسلسل بايتات UTF-8 القياسي.',
          'تنفيذ دورات ضغط خوارزمية التشفير FIPS 180-4.',
          'تحويل البصمة الرقمية (256 بت) إلى تمثيل ست عشري قياسي بطول 64 حرفاً.',
        ],
        es: [
          'Cadena de entrada serializada en búfer binario UTF-8.',
          'Procesamiento en rondas de compresión SHA-256 conforme a NIST FIPS 180-4.',
          'Salida en representación hexadecimal de 64 caracteres.',
        ],
        fr: [
          'Encodage de la chaîne d’entrée en octets binaires UTF-8.',
          'Exécution des cycles de compression de hachage selon la norme NIST FIPS 180-4.',
          'Conversion de l’empreinte 256 bits en chaîne hexadécimale de 64 caractères.',
        ],
        de: [
          'Eingabestring als UTF-8-Byte-Array serialisiert.',
          'Durchlauf der SHA-256-Kompressionsrunden nach NIST FIPS 180-4.',
          'Hexadezimale Ausgabe des 256-Bit-Hashes mit 64 Zeichen.',
        ],
      },
      result: {
        en: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e',
        ar: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e',
        es: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e',
        fr: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e',
        de: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e',
      },
    },

    'text-tools': {
      scenario: {
        en: `Analyzing a 450-word editorial article for reading duration and character metrics.`,
        ar: `تحليل مقال صحفي بطول 450 كلمة لحساب وقت القراءة وإحصائيات الأحرف.`,
        es: `Análisis de un artículo de 450 palabras para estimar tiempo de lectura y caracteres.`,
        fr: `Analyse d’un texte de 450 mots pour évaluer la vitesse de lecture et le calibrage.`,
        de: `Analyse eines Textes mit 450 Wörtern zur Ermittlung von Zeichen und Lesezeit.`,
      },
      stepByStep: {
        en: [
          'Word count = 450 words, average characters per word = 5.2.',
          'Total characters (with whitespace) = 2,820 characters.',
          'Reading time at 225 wpm benchmark: 450 / 225 = 2.00 minutes.',
        ],
        ar: [
          'عدد الكلمات = 450 كلمة، متوسط طول الكلمة = 5.2 أحرف.',
          'إجمالي الأحرف (مع المسافات) = 2,820 حرفاً.',
          'وقت القراءة المقدر بسرعة 225 كلمة في الدقيقة: 450 / 225 = دقيقتان.',
        ],
        es: [
          'Recuento: 450 palabras, promedio de 5,2 caracteres por palabra.',
          'Total caracteres: 2.820 caracteres.',
          'Tiempo de lectura a 225 ppm: 450 / 225 = 2,00 minutos.',
        ],
        fr: [
          'Volume : 450 mots, moyenne de 5,2 caractères par mot.',
          'Nombre de caractères : 2 820 caractères.',
          'Temps de lecture à 225 mots/min : 450 / 225 = 2,00 minutes.',
        ],
        de: [
          'Textumfang: 450 Wörter, durchschnittlich 5,2 Zeichen pro Wort.',
          'Gesamtzahl Zeichen: 2.820 Zeichen.',
          'Geschätzte Lesezeit bei 225 Wörtern/Min: 450 / 225 = 2,00 Minuten.',
        ],
      },
      result: {
        en: 'Word Count: 450 words | Reading Duration: ~2.0 minutes',
        ar: 'عدد الكلمات: 450 كلمة | وقت القراءة: دقيقتان تقريباً',
        es: 'Palabras: 450 | Tiempo de lectura: ~2,0 minutos',
        fr: 'Mots : 450 | Temps de lecture estimé : ~2,0 minutes',
        de: 'Wortanzahl: 450 Wörter | Lesezeit: ~2,0 Minuten',
      },
    },

    'currency': {
      scenario: {
        en: `Converting 1,000 USD to EUR at a sample reference market rate of 0.9200 EUR per USD.`,
        ar: `تحويل 1,000 دولار أمريكي إلى يورو بسعر صرف مرجعي قدره 0.9200 يورو لكل دولار.`,
        es: `Conversión de 1.000 USD a EUR con un tipo de cambio de referencia de 0,9200 EUR/USD.`,
        fr: `Conversion de 1 000 USD en EUR au cours de référence de 0,9200 EUR par USD.`,
        de: `Umrechnung von 1.000 USD in EUR zu einem Referenzkurs von 0,9200 EUR je USD.`,
      },
      stepByStep: {
        en: [
          'Principal amount = 1,000.00 USD.',
          'Reference exchange rate: 1 USD = 0.9200 EUR.',
          'Compute converted sum: 1,000.00 × 0.9200 = 920.00 EUR.',
        ],
        ar: [
          'المبلغ الأساسي = 1,000.00 دولار أمريكي.',
          'سعر الصرف المرجعي: 1 دولار = 0.9200 يورو.',
          'القيمة المحولة: 1,000.00 × 0.9200 = 920.00 يورو.',
        ],
        es: [
          'Importe origen = 1.000,00 USD.',
          'Tipo de cambio de referencia: 1 USD = 0,9200 EUR.',
          'Cálculo: 1.000,00 × 0,9200 = 920,00 EUR.',
        ],
        fr: [
          'Montant de base = 1 000,00 USD.',
          'Taux de change de référence : 1 USD = 0,9200 EUR.',
          'Montant obtenu : 1 000,00 × 0,9200 = 920,00 EUR.',
        ],
        de: [
          'Ausgangsbetrag = 1.000,00 USD.',
          'Referenzkurs: 1 USD = 0,9200 EUR.',
          'Gegenwert: 1.000,00 × 0,9200 = 920,00 EUR.',
        ],
      },
      result: {
        en: '1,000.00 USD = 920.00 EUR (Interbank reference rate)',
        ar: '1,000.00 دولار = 920.00 يورو (سعر الصرف المرجعي)',
        es: '1.000,00 USD = 920,00 EUR (Tipo de cambio interbancario de referencia)',
        fr: '1 000,00 USD = 920,00 EUR (Cours indicatif interbancaire)',
        de: '1.000,00 USD = 920,00 EUR (Interbanken-Referenzkurs)',
      },
    },

    'date-time': {
      scenario: {
        en: `Calculating the precise elapsed calendar interval between January 15 and September 20.`,
        ar: `حساب الفترة الزمنية الدقيقة المنقضية بين 15 يناير و20 سبتمبر.`,
        es: `Cálculo del intervalo exacto entre el 15 de enero y el 20 de septiembre.`,
        fr: `Calcul de la durée exacte écoulée entre le 15 janvier et le 20 septembre.`,
        de: `Berechnung des genauen Zeitraums zwischen dem 15. Januar und dem 20. September.`,
      },
      stepByStep: {
        en: [
          'Start date: January 15 | End date: September 20.',
          'Calculate full calendar months: 8 complete months (243 days).',
          'Add remaining residual days: 5 days. Total interval = 248 calendar days.',
        ],
        ar: [
          'تاريخ البداية: 15 يناير | تاريخ النهاية: 20 سبتمبر.',
          'الأشهر الكاملة: 8 أشهر كاملة (243 يوماً).',
          'إضافة الأيام المتبقية: 5 أيام. إجمالي المدة = 248 يوماً تقويمياً.',
        ],
        es: [
          'Fecha inicio: 15 de enero | Fecha fin: 20 de septiembre.',
          'Meses naturales transcurridos: 8 meses completos (243 días).',
          'Días restantes: 5 días. Total = 248 días naturales.',
        ],
        fr: [
          'Date de début : 15 janvier | Date de fin : 20 septembre.',
          'Mois complets écoulés : 8 mois entiers (243 jours).',
          'Jours résiduels : 5 jours. Durée totale = 248 jours calendaires.',
        ],
        de: [
          'Startdatum: 15. Januar | Enddatum: 20. September.',
          'Volle Kalendermonate: 8 Monate (243 Tage).',
          'Resttage: 5 Tage. Gesamtdauer = 248 Kalendertage.',
        ],
      },
      result: {
        en: 'Total Duration = 248 days (8 months, 5 days)',
        ar: 'المدة الإجمالية = 248 يوماً (8 أشهر و5 أيام)',
        es: 'Duración total = 248 días (8 meses y 5 días)',
        fr: 'Durée totale = 248 jours (8 mois et 5 jours)',
        de: 'Gesamtdauer = 248 Tage (8 Monate und 5 Tage)',
      },
    },

    'everyday-tools': {
      scenario: {
        en: `Splitting a $120.00 restaurant bill among 4 people with an 18% gratuity tip.`,
        ar: `تقسيم فاتورة مطعم بقيمة 120.00 دولاراً بين 4 أشخاص مع إضافة 18% بقشيش.`,
        es: `División de una cuenta de restaurante de 120,00 $ entre 4 comensales con un 18% de propina.`,
        fr: `Partage d’une addition de 120,00 $ entre 4 personnes avec 18 % de pourboire.`,
        de: `Aufteilung einer Restaurantrechnung von 120,00 € auf 4 Personen mit 18 % Trinkgeld.`,
      },
      stepByStep: {
        en: [
          'Base bill total = $120.00, Tip percentage = 18%.',
          'Calculate total tip: $120.00 × 0.18 = $21.60. Total bill = $141.60.',
          'Split among 4 diners: $141.60 / 4 = $35.40 per person.',
        ],
        ar: [
          'قيمة الفاتورة الأساسية = 120.00 دولار، نسبة البقشيش = 18%.',
          'قيمة البقشيش الإجمالية: 120.00 × 0.18 = 21.60 دولار. الإجمالي الكلي = 141.60 دولار.',
          'التقسيم على 4 أفراد: 141.60 / 4 = 35.40 دولار للشخص الواحد.',
        ],
        es: [
          'Cuenta base = 120,00 $, Propina = 18%.',
          'Importe de propina: 120,00 $ × 0,18 = 21,60 $. Total = 141,60 $.',
          'Reparto entre 4 personas: 141,60 $ / 4 = 35,40 $ por comensal.',
        ],
        fr: [
          'Montant de l’addition = 120,00 $, Pourboire = 18 %.',
          'Pourboire total : 120,00 $ × 0,18 = 21,60 $. Montant global = 141,60 $.',
          'Part par convive : 141,60 $ / 4 = 35,40 $ par personne.',
        ],
        de: [
          'Rechnungsbetrag = 120,00 €, Trinkgeld = 18 %.',
          'Trinkgeldbetrag: 120,00 € × 0,18 = 21,60 €. Gesamtbetrag = 141,60 €.',
          'Anteil pro Person (bei 4 Personen): 141,60 € / 4 = 35,40 €.',
        ],
      },
      result: {
        en: 'Total = $141.60 ($21.60 tip) | Each Person Pays = $35.40',
        ar: 'الإجمالي = 141.60 دولار (بقشيش: 21.60 دولار) | نصيب الفرد = 35.40 دولار',
        es: 'Total = 141,60 $ (21,60 $ de propina) | Por persona = 35,40 $',
        fr: 'Total = 141,60 $ (dont 21,60 $ de pourboire) | Par personne = 35,40 $',
        de: 'Gesamtbetrag = 141,60 € (inkl. 21,60 € Trinkgeld) | Pro Kopf = 35,40 €',
      },
    },
  };

  const chosen = domainExamples[domain] || domainExamples.mathematics;
  return {
    scenario: chosen.scenario[lang] || chosen.scenario.en,
    stepByStep: chosen.stepByStep[lang] || chosen.stepByStep.en,
    result: chosen.result[lang] || chosen.result.en,
  };
}

export function getStructuredFallbackDetails(
  tool: ToolDef,
  name: string,
  lang: Language,
  relatedTools: ToolDef[]
): ToolContentDetails {
  const domain = detectToolDomain(tool);
  const strategy = DOMAIN_STRATEGIES[domain] || DOMAIN_STRATEGIES.mathematics;

  // Domain-Aware Introduction
  const introGenerator = strategy.introSummary[lang] || strategy.introSummary.en;
  const intro = introGenerator(name);

  // Audience
  const whoUsesIt = strategy.audience[lang] || strategy.audience.en;

  // Steps
  const howToUse = strategy.howToSteps[lang] || strategy.howToSteps.en;

  // Domain FAQs
  const faqs: ToolFaq[] = strategy.faqs[lang] || strategy.faqs.en;

  // Worked Example
  const workedExample = generateDeterministicWorkedExample(tool, name, domain, lang);

  // Health Disclaimer
  let limitations = '';
  if (strategy.disclaimer) {
    limitations = strategy.disclaimer[lang] || strategy.disclaimer.en;
  }

  const inputs: ToolInputExplanation[] = [
    {
      name: lang === 'ar' ? 'المعامل الأساسي' : lang === 'es' ? 'Parámetro Principal' : lang === 'fr' ? 'Paramètre Principal' : lang === 'de' ? 'Primärer Eingabewert' : 'Primary Input Value',
      description: lang === 'ar'
        ? `القيمة العددية الأساسية المدخلة لحساب ${name}.`
        : lang === 'es'
        ? `Valor numérico inicial para el cálculo de ${name}.`
        : lang === 'fr'
        ? `Grandeur numérique de départ pour le calcul de ${name}.`
        : lang === 'de'
        ? `Ausgangs-Zahlenwert für die Berechnung von ${name}.`
        : `Primary numerical magnitude entered for evaluating ${name}.`,
      unit: 'Standard',
      optional: false,
    },
    {
      name: lang === 'ar' ? 'المعامل الثانوي' : lang === 'es' ? 'Parámetro Secundario' : lang === 'fr' ? 'Paramètre Secondaire' : lang === 'de' ? 'Sekundärer Eingabewert' : 'Secondary Modifier',
      description: lang === 'ar'
        ? 'المعامل الرياضي أو نسبة التحويل أو الفترة المحددة.'
        : lang === 'es'
        ? 'Tasa, factor de escala o parámetro temporal complementario.'
        : lang === 'fr'
        ? 'Taux, facteur d’échelle ou intervalle temporel associé.'
        : lang === 'de'
        ? 'Zinssatz, Skalierungsfaktor oder Zeitparameter.'
        : 'Rate, scale factor, or temporal duration applied to the calculation.',
      unit: 'Standard',
      optional: true,
    },
  ];

  const whatItCalculates = lang === 'ar'
    ? `يقوم هذا المحرك بحساب النتائج بدقة وفق المعادلات الرياضية والمعايير المعتمدة لـ ${name}.`
    : lang === 'es'
    ? `Este motor calcula resultados precisos según las fórmulas algebraicas y estándares de ${name}.`
    : lang === 'fr'
    ? `Ce moteur évalue les résultats avec précision selon les équations algébriques et normes de ${name}.`
    : lang === 'de'
    ? `Diese Recheneinheit berechnet Ergebnisse präzise nach den mathematischen Formeln für ${name}.`
    : `This computation engine evaluates precise outputs according to standardized mathematical equations for ${name}.`;

  const understandingResults = lang === 'ar'
    ? 'توضح النتائج القيم المحسوبة فورياً مع التدرج الحسابي والوحدات المعتمدة لاتخاذ قرارات مدروسة.'
    : lang === 'es'
    ? 'Los resultados muestran valores calculados al instante con desglose paso a paso para decisiones fundamentadas.'
    : lang === 'fr'
    ? 'Les résultats présentent les valeurs calculées instantanément avec détail des étapes pour vos analyses.'
    : lang === 'de'
    ? 'Die Ergebnisse zeigen die exakt berechneten Werte mit Rechenschritten zur verlässlichen Beurteilung.'
    : 'Results indicate precise values with mathematical step-by-step resolution for rigorous evaluation.';

  const assumptions = lang === 'ar'
    ? 'تفترض الحسابات صحة وتجانس المدخلات الرقمية وفق المعايير القياسية المحددة.'
    : lang === 'es'
    ? 'Los cálculos asumen valores válidos y coherencia de unidades según la normativa del sector.'
    : lang === 'fr'
    ? 'Les calculs reposent sur des données valides et une cohérence d’unités conforme aux standards.'
    : lang === 'de'
    ? 'Berechnungen setzen gültige Eingabewerte und einheitliche Maßeinheiten voraus.'
    : 'Calculations assume valid numerical inputs and dimensional consistency across all parameters.';

  return {
    toolName: name,
    intro,
    whoUsesIt,
    whatItCalculates,
    howToUse,
    formula: `${name} = f(inputs)`,
    inputs,
    unitsAndConversions: lang === 'ar' ? 'الوحدات الدولية المعتمدة' : 'Standard Metric (SI) / Customary Units',
    workedExample,
    understandingResults,
    assumptions,
    limitations: limitations || (lang === 'ar' ? 'النتائج لأغراض التحليل والدراسة والاسترشاد.' : 'Results are provided for quantitative modeling, educational, and screening purposes.'),
    faqs,
    relatedTools,
  };
}
