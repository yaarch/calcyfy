import { ToolDef, Language } from '../../types';
import { ToolContentDetails } from './types';

type KnowledgeHandler = (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails;

function createKnowledge(dataByLang: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails>): Record<Language, KnowledgeHandler> {
  return dataByLang;
}

// 1. ELECTRICITY APPLIANCE COST (electricity-cost)
export const ELECTRICITY_COST_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates electrical energy consumption in kilowatt-hours (kWh) and predicts monthly and annual utility bill costs based on appliance wattage, daily runtime hours, and electricity rates.`,
    howToUse: [
      'Enter appliance power rating in watts (W).',
      'Enter average operating runtime in hours per day.',
      'Enter local electricity utility rate in cost per kWh (e.g., $0.15).',
      'Review daily power consumption in kWh alongside estimated monthly and yearly running costs.'
    ],
    formula: 'Daily kWh = (Watts × Hours) / 1000 | Monthly Cost = Daily kWh × 30 × Rate | Yearly Cost = Daily kWh × 365 × Rate',
    formulaVariables: [
      { name: 'Appliance Power', description: 'Electrical power rating.', unit: 'Watts (W)', optional: false },
      { name: 'Operating Time', description: 'Daily active usage duration.', unit: 'Hours / day', optional: false },
      { name: 'Utility Rate', description: 'Electricity price charged by utility.', unit: 'Cost per kWh', optional: false }
    ],
    workedExample: {
      scenario: 'Running a 1500W space heater for 8 hours daily with an electricity rate of $0.15 per kWh.',
      stepByStep: [
        'Daily energy consumption: (1500 W × 8 hours) / 1000 = 12.0 kWh per day.',
        'Monthly cost (30 days): 12.0 kWh × 30 days × $0.15 / kWh = $54.00.',
        'Yearly cost (365 days): 12.0 kWh × 365 days × $0.15 / kWh = $657.00.'
      ],
      result: 'Daily Energy: 12.0 kWh | Monthly Cost: $54.00 | Yearly Cost: $657.00'
    },
    interpretation: 'Identifies high-power domestic loads (heaters, air conditioners, dehumidifiers, mining rigs) to target household utility bill reductions.',
    assumptions: 'Assumes continuous operation at rated nameplate wattage during active hours.',
    limitations: 'Cycling compressor appliances (refrigerators, modern heat pumps) vary electrical draw rather than drawing peak nameplate wattage continuously.',
    faqs: [
      { question: 'What is a kilowatt-hour (kWh)?', answer: 'A kilowatt-hour is a standard unit of energy representing one thousand watts of electricity consumed continuously over one full hour.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب استهلاك الطاقة الكهربائية بالكيلوواط/ساعة وتوقع تكلفة فاتورة الكهرباء الشهرية والسنوية للأجهزة المنزلية بناءً على قدرتها وساعات تشغيلها وسعر التعرفة.`,
    howToUse: [
      'أدخل قدرة الجهاز الكهربائي بالواط (W).',
      'أدخل معدل ساعات التشغيل اليومية.',
      'أدخل سعر الكيلوواط/ساعة في منطقتك.',
      'راجع استهلاك الطاقة اليومي وتكلفة الفاتورة الشهرية والسنوية المتوقعة.'
    ],
    formula: 'الاستهلاك اليومي (كيلوواط/س) = (الواط × الساعات) / 1000 | التكلفة الشهرية = الاستهلاك اليومي × 30 × سعر الكيلوواط',
    formulaVariables: [
      { name: 'قدرة الجهاز', description: 'استهلاك الجهاز من الكهرباء.', unit: 'واط (W)', optional: false },
      { name: 'ساعات التشغيل', description: 'مدة الاستخدام اليومي.', unit: 'ساعة / يوم', optional: false },
      { name: 'سعر التعرفة', description: 'تكلفة الكيلوواط/ساعة.', unit: 'عملة / كيلوواط.ساعة', optional: false }
    ],
    workedExample: {
      scenario: 'تشغيل مدفأة كهربائية بقدرة 1500 واط لمدة 8 ساعات يومياً بسعر 0.15 دولار لكل كيلوواط/ساعة.',
      stepByStep: [
        'الاستهلاك اليومي: (1500 × 8) ÷ 1000 = 12.0 كيلوواط/ساعة.',
        'التكلفة الشهرية (30 يوماً): 12.0 × 30 × 0.15 = 54.00 دولار.',
        'التكلفة السنوية (365 يوماً): 12.0 × 365 × 0.15 = 657.00 دولار.'
      ],
      result: 'الاستهلاك اليومي: 12.0 كيلوواط/س | الفاتورة الشهرية: 54.00 دولار | الفاتورة السنوية: 657.00 دولار'
    },
    interpretation: 'تحدد الأجهزة الأكثر استهلاكاً للكهرباء لمساعدة الأسرة في خفض فواتير الطاقة الشهرية.',
    assumptions: 'تفترض تشغيل الجهاز بكامل طاقته الاسمية طوال ساعات الاستخدام.',
    limitations: 'الأجهزة ذات الضاغط (كالثلاجات والمكيفات الإنفرتر) تغير استهلاكها تلقائياً ولا تعمل بالحد الأقصى طوال الوقت.',
    faqs: [
      { question: 'ما هو الكيلوواط/ساعة؟', answer: 'هو وحدة قياس الطاقة الكهربائية المعيارية ويعادل تشغيل جهاز بقدرة 1,000 واط لمدة ساعة واحدة كاملة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el consumo eléctrico en kilovatios-hora (kWh) y estima el coste mensual y anual en la factura eléctrica según la potencia del electrodoméstico y su uso diario.`,
    howToUse: [
      'Introduzca la potencia del aparato en vatios (W).',
      'Introduzca las horas de funcionamiento al día.',
      'Introduzca el precio por kWh de su tarifa eléctrica.',
      'Consulte el consumo diario y el gasto estimado al mes y al año.'
    ],
    formula: 'kWh diarios = (Vatios × Horas) / 1000 | Coste mensual = kWh diarios × 30 × Tarifa',
    formulaVariables: [
      { name: 'Potencia', description: 'Consumo nominal.', unit: 'Vatios (W)', optional: false },
      { name: 'Horas de uso', description: 'Tiempo diario.', unit: 'Horas / día', optional: false },
      { name: 'Tarifa eléctrica', description: 'Coste del kWh.', unit: 'Moneda / kWh', optional: false }
    ],
    workedExample: {
      scenario: 'Radiador eléctrico de 1500 W encendido 8 horas al día con tarifa de 0,15 €/kWh.',
      stepByStep: [
        'Consumo diario: (1500 W × 8 h) / 1000 = 12,0 kWh/día.',
        'Coste mensual (30 días): 12,0 kWh × 30 días × 0,15 €/kWh = 54,00 €.',
        'Coste anual (365 días): 12,0 kWh × 365 días × 0,15 €/kWh = 657,00 €.'
      ],
      result: 'Consumo diario: 12,0 kWh | Coste mensual: 54,00 € | Coste anual: 657,00 €'
    },
    interpretation: 'Permite identificar los electrodomésticos con mayor impacto en el recibo de la luz para optimizar el ahorro del hogar.',
    assumptions: 'Consumo continuo a potencia nominal.',
    limitations: 'Equipos con termostato modulan su potencia reduciendo el consumo medio real.',
    faqs: [
      { question: '¿Qué es un kilovatio-hora (kWh)?', answer: 'Es la unidad con la que las compañías eléctricas facturan la energía, equivalente a 1.000 vatios consumidos durante una hora.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} évalue la consommation d'énergie en kilowattheures (kWh) et projette le montant de la facture électrique mensuelle et annuelle selon la puissance de l'appareil.`,
    howToUse: [
      'Indiquez la puissance de l\'appareil en watts (W).',
      'Indiquez la durée moyenne d\'utilisation par jour.',
      'Indiquez le prix du kWh de votre fournisseur.',
      'Consultez la consommation quotidienne et les coûts estimés par mois et par an.'
    ],
    formula: 'kWh par jour = (Watts × Heures) / 1000 | Coût mensuel = kWh par jour × 30 × Prix_kWh',
    formulaVariables: [
      { name: 'Puissance', description: 'Puissance absorbée.', unit: 'Watts (W)', optional: false },
      { name: 'Durée d\'usage', description: 'Heures de service par jour.', unit: 'Heures / jour', optional: false },
      { name: 'Tarif kWh', description: 'Prix unitaire de l\'électricité.', unit: 'Devise / kWh', optional: false }
    ],
    workedExample: {
      scenario: 'Radiateur de 1500 W fonctionnant 8 heures par jour avec un kWh à 0,15 €.',
      stepByStep: [
        'Consommation journalière : (1500 × 8) / 1000 = 12,0 kWh.',
        'Facture mensuelle (30 jours) : 12,0 × 30 × 0,15 € = 54,00 €.',
        'Facture annuelle (365 jours) : 12,0 × 365 × 0,15 € = 657,00 €.'
      ],
      result: 'Énergie journalière : 12,0 kWh | Facture mensuelle : 54,00 € | Facture annuelle : 657,00 €'
    },
    interpretation: 'Aide à cibler les appareils énergivores pour réduire l\'empreinte énergétique et les factures domestiques.',
    assumptions: 'Puissance constante pendant toute la période active.',
    limitations: 'Les appareils à compresseur (réfrigérateurs, pompes à chaleur) fonctionnent par cycles intermittents.',
    faqs: [
      { question: 'Combien de watts y a-t-il dans un kilowatt ?', answer: 'Un kilowatt (kW) correspond exactement à 1 000 watts.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet den Stromverbrauch in Kilowattstunden (kWh) sowie die monatlichen und jährlichen Stromkosten anhand von Wattzahl, Nutzungsdauer und Strompreis.`,
    howToUse: [
      'Geben Sie die Leistungsaufnahme des Geräts in Watt (W) ein.',
      'Geben Sie die tägliche Nutzungszeit in Stunden ein.',
      'Geben Sie Ihren Strompreis pro kWh ein.',
      'Lesen Sie den täglichen Stromverbrauch und die prognostizierten Monats- und Jahreskosten ab.'
    ],
    formula: 'Täglicher kWh-Verbrauch = (Watt × Stunden) / 1000 | Monatliche Kosten = kWh × 30 × Arbeitspreis',
    formulaVariables: [
      { name: 'Leistung', description: 'Geräteleistung in Watt.', unit: 'Watt (W)', optional: false },
      { name: 'Nutzungszeit', description: 'Betriebsstunden pro Tag.', unit: 'Stunden / Tag', optional: false },
      { name: 'Arbeitspreis', description: 'Kosten pro Kilowattstunde.', unit: 'Währung / kWh', optional: false }
    ],
    workedExample: {
      scenario: 'Ein Heizlüfter mit 1500 Watt läuft 8 Stunden täglich bei einem Strompreis von 0,15 €/kWh.',
      stepByStep: [
        'Täglicher Verbrauch: (1500 W × 8 h) / 1000 = 12,0 kWh/Tag.',
        'Monatskosten (30 Tage): 12,0 kWh × 30 Tage × 0,15 €/kWh = 54,00 €.',
        'Jahreskosten (365 Tage): 12,0 kWh × 365 Tage × 0,15 €/kWh = 657,00 €.'
      ],
      result: 'Tagesverbrauch: 12,0 kWh | Monatskosten: 54,00 € | Jahreskosten: 657,00 €'
    },
    interpretation: 'Hilft Stromfresser im Haushalt aufzuspüren und Sparpotenziale gezielt zu realisieren.',
    assumptions: 'Konstanter Betrieb unter Volllast während der angegebenen Betriebsstunden.',
    limitations: 'Taktende Geräte (z. B. Kühlschränke) schalten den Kompressor regelmäßig ab und verbrauchen im Schnitt weniger als die Nennleistung.',
    faqs: [
      { question: 'Was bedeutet eine Kilowattstunde (kWh)?', answer: 'Sie entspricht der Energiemenge, die ein Gerät mit einer Leistung von 1.000 Watt innerhalb einer Stunde verbraucht.' }
    ],
    relatedTools
  })
});

// 2. CULINARY COOKING CONVERTER (cooking-converter)
export const COOKING_CONVERTER_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} converts culinary volume measures from standard US cups into tablespoons (tbsp), teaspoons (tsp), and milliliters (ml).`,
    howToUse: [
      'Enter volume quantity in US cups.',
      'Review converted recipe equivalents in tablespoons, teaspoons, and metric milliliters.'
    ],
    formula: '1 US Cup = 16 Tablespoons = 48 Teaspoons = 236.588 Milliliters',
    formulaVariables: [
      { name: 'Cups', description: 'Volume in standard US cups.', unit: 'Cups', optional: false }
    ],
    workedExample: {
      scenario: 'Converting 1 standard US cup of cooking liquid.',
      stepByStep: [
        'Tablespoons: 1 cup × 16 = 16.0 tbsp.',
        'Teaspoons: 1 cup × 48 = 48.0 tsp.',
        'Metric volume: 1 cup × 236.588 ml = 236.59 ml.'
      ],
      result: '1.0 Cup = 16.0 tbsp = 48.0 tsp = 236.59 ml'
    },
    interpretation: 'Prevents recipe conversion failures when baking or preparing international culinary dishes that require precise fluid measures.',
    assumptions: 'Standard US Customary Cup (236.588 ml).',
    limitations: 'Volume conversion only; dry ingredient weight (grams) varies by ingredient density.',
    faqs: [
      { question: 'Is a US cup the same as a metric cup?', answer: 'No, a US customary cup is approximately 236.6 ml, while a Commonwealth metric cup is standardized at 250 ml.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحويل معايير الطبخ والمطبخ من الأكواب المعيارية إلى ملاعق طعام وملاعق صغيرة ومليلترات مترية.`,
    howToUse: [
      'أدخل الكمية بالأكواب المعيارية.',
      'راجع المقادير المحولة بملاعق الطعام والملاعق الصغيرة والمليلتر (مل).'
    ],
    formula: '1 كوب = 16 ملعقة طعام = 48 ملعقة صغيرة = 236.588 مليلتر',
    formulaVariables: [
      { name: 'الأكواب', description: 'الكمية بالأكواب المعيارية.', unit: 'كوب', optional: false }
    ],
    workedExample: {
      scenario: 'تحويل مقدار 1 كوب معياري لسائل طبخ.',
      stepByStep: [
        'ملاعق طعام: 1 × 16 = 16 ملعقة كبيرة.',
        'ملاعق صغيرة: 1 × 48 = 48 ملعقة صغيرة.',
        'مليلتر: 1 × 236.588 = 236.59 مل.'
      ],
      result: '1 كوب = 16 ملعقة طعام = 48 ملعقة صغيرة = 236.59 مل'
    },
    interpretation: 'ضرورية لنجاح وصفات الحلويات والمخبوزات التي تتطلب مقادير دقيقة جداً.',
    assumptions: 'الكوب المعياري الأمريكي المعتمد (236.588 مل).',
    limitations: 'تحويل للحجم السائل فقط؛ تختلف أوزان المواد الجافة (كالطحين والسكر) حسب كثافتها.',
    faqs: [
      { question: 'هل يزن كوب الطحين نفس وزن كوب الماء؟', answer: 'لا، لأن الماء أكثر كثافة؛ يزن كوب الماء حوالي 237 غراماً، بينما يزن كوب الطحين المنخول حوالي 120 إلى 125 غراماً فقط.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} convierte medidas culinarias de tazas estándar (cups) a cucharadas soperas (tbsp), cucharaditas (tsp) y mililitros métricos (ml).`,
    howToUse: [
      'Introduzca la cantidad en tazas (cups).',
      'Consulte la equivalencia en cucharadas, cucharaditas y mililitros.'
    ],
    formula: '1 Taza = 16 Cucharadas = 48 Cucharaditas = 236,588 ml',
    formulaVariables: [
      { name: 'Tazas', description: 'Volumen en tazas estadounidenses.', unit: 'Tazas', optional: false }
    ],
    workedExample: {
      scenario: 'Conversión de 1 taza estándar.',
      stepByStep: [
        'Cucharadas: 1 × 16 = 16 cucharadas.',
        'Cucharaditas: 1 × 48 = 48 cucharaditas.',
        'Mililitros: 1 × 236,588 = 236,59 ml.'
      ],
      result: '1 Taza = 16 Cucharadas = 48 Cucharaditas = 236,59 ml'
    },
    interpretation: 'Evita fallos en recetas internacionales de repostería que exigen proporciones rigurosas.',
    assumptions: 'Taza estándar estadounidense (236,588 ml).',
    limitations: 'Conversión de volumen; los ingredientes secos varían en peso según su densidad.',
    faqs: [
      { question: '¿Cuántos mililitros tiene una cucharada sopera?', answer: 'Una cucharada estándar (tablespoon) equivale aproximadamente a 14,8 ml (redondeado a 15 ml en cocina europea).' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} convertit les volumes culinaires de tasses (cups) en cuillères à soupe (c. à soupe), cuillères à café (c. à café) et millilitres (ml).`,
    howToUse: [
      'Indiquez la mesure en tasses (cups).',
      'Consultez les conversions en cuillères à soupe, cuillères à café et millilitres.'
    ],
    formula: '1 Cup = 16 cuillères à soupe = 48 cuillères à café = 236,588 ml',
    formulaVariables: [
      { name: 'Tasses (cups)', description: 'Volume culinaire.', unit: 'Tasses', optional: false }
    ],
    workedExample: {
      scenario: 'Conversion de 1 tasse (cup).',
      stepByStep: [
        'Cuillères à soupe : 1 × 16 = 16 c. à soupe.',
        'Cuillères à café : 1 × 48 = 48 c. à café.',
        'Millilitres : 1 × 236,588 = 236,59 ml.'
      ],
      result: '1 Cup = 16 c. à soupe = 48 c. à café = 236,59 ml'
    },
    interpretation: 'Essentiel pour adapter fidèlement les livres de cuisine et recettes de pâtisserie anglo-saxonnes.',
    assumptions: 'Tasse US (236,588 ml).',
    limitations: 'Conversion volumétrique ne tenant pas compte des densités des poudres sèches.',
    faqs: [
      { question: 'Quelle est la contenance d\'une cuillère à café ?', answer: 'Une cuillère à café standard contient environ 5 ml de liquide.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} rechnet Rezeptangaben in Tassen (Cups) in Esslöffel (EL), Teelöffel (TL) und Milliliter (ml) um.`,
    howToUse: [
      'Geben Sie die Menge in Tassen (Cups) ein.',
      'Lesen Sie die Werte in Esslöffeln, Teelöffeln und Millilitern ab.'
    ],
    formula: '1 Cup = 16 Esslöffel = 48 Teelöffel = 236,588 ml',
    formulaVariables: [
      { name: 'Cups', description: 'Amerikanische Maßeinheit Cup.', unit: 'Cups', optional: false }
    ],
    workedExample: {
      scenario: 'Umrechnung von 1 Standard-Cup.',
      stepByStep: [
        'Esslöffel: 1 × 16 = 16 EL.',
        'Teelöffel: 1 × 48 = 48 TL.',
        'Milliliter: 1 × 236,588 = 236,59 ml.'
      ],
      result: '1 Cup = 16 EL = 48 TL = 236,59 ml'
    },
    interpretation: 'Unentbehrlich beim Nachbacken internationaler Rezepte ohne Messbecher mit US-Skala.',
    assumptions: 'US Customary Cup (ca. 236,6 ml).',
    limitations: 'Gilt für Flüssigkeitsvolumina; Mehl und Zucker haben abweichende Dichten.',
    faqs: [
      { question: 'Wie viel Milliliter fasst ein Esslöffel?', answer: 'Ein Standard-Esslöffel fasst rund 15 ml Flüssigkeit.' }
    ],
    relatedTools
  })
});

// 3. DOG AND CAT AGE TO HUMAN YEARS (age-dog-cat)
export const AGE_DOG_CAT_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} estimates canine and feline biological age in equivalent human years using veterinary non-linear maturity curves.`,
    howToUse: [
      'Enter pet chronological age in calendar years.',
      'Review the calculated comparative human age equivalents for both dogs and cats.'
    ],
    formula: 'Dog: Year 1 = 15 yrs, Year 2 = +9 yrs (24), Each added year = +5 yrs | Cat: Year 1 = 15 yrs, Year 2 = +9 yrs (24), Each added year = +4 yrs',
    formulaVariables: [
      { name: 'Pet Age', description: 'Chronological age in years.', unit: 'Calendar years', optional: false }
    ],
    workedExample: {
      scenario: 'Calculating equivalent human age for a 3-year-old pet.',
      stepByStep: [
        'Dog calculation: 15 (year 1) + 9 (year 2) + 5 (year 3) = 24 + 5 = 29 human years.',
        'Cat calculation: 15 (year 1) + 9 (year 2) + 4 (year 3) = 24 + 4 = 28 human years.'
      ],
      result: 'Dog Human Age: 29 years | Cat Human Age: 28 years'
    },
    interpretation: 'Reflects the rapid biological juvenile maturity of pets during their first two years followed by steady linear adult senescence.',
    assumptions: 'Represents medium-sized dogs and domestic cats.',
    limitations: 'Large giant dog breeds age substantially faster than toy breeds in later adult years.',
    faqs: [
      { question: 'Is the old rule of "1 dog year = 7 human years" accurate?', answer: 'No, veterinary research proves dogs age much more rapidly in their first two years (reaching sexual and skeletal maturity) than a flat 7-year ratio suggests.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتقدير العمر البيولوجي للكلاب والقطط بما يعادله بسنوات عمر الإنسان باستخدام المنحنيات البيطرية الحديثة للنمو والتطور.`,
    howToUse: [
      'أدخل عمر الحيوان الأليف بالسنوات الفعلية.',
      'راجع العمر البشري المقابل لكل من الكلاب والقطط.'
    ],
    formula: 'الكلاب: السنة 1 = 15 سنة، السنة 2 = +9 (المجموع 24)، وكل سنة إضافية = +5 | القطط: السنة 1 = 15، السنة 2 = +9 (24)، وكل سنة إضافية = +4',
    formulaVariables: [
      { name: 'عمر الحيوان', description: 'العمر الفعلي بالسنوات الميلادية.', unit: 'سنة', optional: false }
    ],
    workedExample: {
      scenario: 'حساب العمر البشري المكافئ لحيوان أليف بعمر 3 سنوات.',
      stepByStep: [
        'عمر الكلب بالسنوات البشرية: 15 + 9 + 5 = 29 سنة بشرية.',
        'عمر القطة بالسنوات البشرية: 15 + 9 + 4 = 28 سنة بشرية.'
      ],
      result: 'عمر الكلب: 29 سنة بشرية | عمر القطة: 28 سنة بشرية'
    },
    interpretation: 'توضح سرعة النضج البيولوجي للحيوانات في أول عامين مقارنة بالبشر ثم تباطؤ وتيرة التقدم في السن.',
    assumptions: 'تمثل سلالات الكلاب متوسطة الحجم والقطط المنزلية.',
    limitations: 'الكلاب الضخمة تشيخ أسرع من السلالات الصغيرة بعد سن البلوغ.',
    faqs: [
      { question: 'هل قاعدة "سنة الحيوان تعادل 7 سنوات للإنسان" صحيحة؟', answer: 'أثبت الطب البيطري الحديث عدم دقتها؛ فالكلب يبلغ سن النضج خلال أول عامين بوتيرة أسرع بكثير من نسبة الـ 7 سنوات التقليدية.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} estima la edad biológica canina y felina en años humanos equivalentes mediante curvas de maduración veterinarias.`,
    howToUse: [
      'Introduzca la edad del animal en años naturales.',
      'Consulte la equivalencia en años humanos para perros y gatos.'
    ],
    formula: 'Perro: Año 1 = 15, Año 2 = +9 (24), Cada año extra = +5 | Gato: Año 1 = 15, Año 2 = +9 (24), Cada año extra = +4',
    formulaVariables: [
      { name: 'Edad del animal', description: 'Años cronológicos.', unit: 'Años', optional: false }
    ],
    workedExample: {
      scenario: 'Cálculo para un animal de 3 años.',
      stepByStep: [
        'Perro: 15 + 9 + 5 = 29 años humanos.',
        'Gato: 15 + 9 + 4 = 28 años humanos.'
      ],
      result: 'Edad canina: 29 años humanos | Edad felina: 28 años humanos'
    },
    interpretation: 'Muestra la acelerada madurez de cachorros en sus primeros 24 meses y su posterior envejecimiento gradual.',
    assumptions: 'Perros de tamaño mediano y gatos comunes.',
    limitations: 'Las razas caninas gigantes envejecen con mayor rapidez.',
    faqs: [
      { question: '¿Por qué la regla de multiplicar por 7 ya no es válida?', answer: 'Porque ignora la rápida maduración juvenil durante el primer y segundo año de vida del animal.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} estime l'âge physiologique réel des chiens et des chats en équivalent années humaines selon les barèmes vétérinaires modernes.`,
    howToUse: [
      'Indiquez l\'âge réel de l\'animal en années calendaires.',
      'Consultez la correspondance en âge humain pour chiens et chats.'
    ],
    formula: 'Chien : An 1 = 15, An 2 = +9 (24), Année suivante = +5 | Chat : An 1 = 15, An 2 = +9 (24), Année suivante = +4',
    formulaVariables: [
      { name: 'Âge réel', description: 'Années de vie de l\'animal.', unit: 'Années', optional: false }
    ],
    workedExample: {
      scenario: 'Animal âgé de 3 ans.',
      stepByStep: [
        'Équivalent canin : 15 + 9 + 5 = 29 ans humains.',
        'Équivalent félin : 15 + 9 + 4 = 28 ans humains.'
      ],
      result: 'Âge chien : 29 ans humains | Âge chat : 28 ans humains'
    },
    interpretation: 'Traduit la croissance pubertaire rapide lors des deux premières années de vie.',
    assumptions: 'Chiens de taille moyenne et chats domestiques européens.',
    limitations: 'Les très grands chiens connaissent une sénescence plus précoce.',
    faqs: [
      { question: 'Pourquoi ne faut-il plus multiplier par 7 ?', answer: 'Cette règle désuète ne reflète pas le fait qu\'un chien d\'un an a déjà atteint l\'adolescence humaine.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} ermittelt das biologische Alter von Hunden und Katzen in Menschenjahren nach tiermedizinischen Entwicklungsmodellen.`,
    howToUse: [
      'Geben Sie das tatsächliche Alter des Haustiers in Jahren ein.',
      'Lesen Sie das errechnete Menschenalter für Hunde und Katzen ab.'
    ],
    formula: 'Hund: Jahr 1 = 15, Jahr 2 = +9 (24), Jedes weitere Jahr = +5 | Katze: Jahr 1 = 15, Jahr 2 = +9 (24), Jedes weitere Jahr = +4',
    formulaVariables: [
      { name: 'Tieralter', description: 'Alter in Kalenderjahren.', unit: 'Jahre', optional: false }
    ],
    workedExample: {
      scenario: 'Haustier im Alter von 3 Jahren.',
      stepByStep: [
        'Hund: 15 + 9 + 5 = 29 Menschenjahre.',
        'Katze: 15 + 9 + 4 = 28 Menschenjahre.'
      ],
      result: 'Hundealter: 29 Menschenjahre | Katzenalter: 28 Menschenjahre'
    },
    interpretation: 'Berücksichtigt die rasante körperliche Reifung von Jungtieren in den ersten zwei Lebensjahren.',
    assumptions: 'Mittelgroße Hunde und Hauskatzen.',
    limitations: 'Große Hunderassen altern in späteren Jahren schneller als Zwergrassen.',
    faqs: [
      { question: 'Stimmt die Faustregel "1 Tierjahr = 7 Menschenjahre"?', answer: 'Nein, die moderne Veterinärmedizin stuft ein 2-jähriges Tier bereits als jungen Erwachsenen (ca. 24 Menschenjahre) ein.' }
    ],
    relatedTools
  })
});

// 4. WORK SHIFT HOURS (work-shift-hours)
export const WORK_SHIFT_HOURS_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates net billable or paid working shift hours by subtracting unpaid lunch and break periods from shift start and end timestamps.`,
    howToUse: [
      'Enter shift start time (HH:MM format).',
      'Enter shift end time (HH:MM format).',
      'Enter total unpaid break duration in minutes.',
      'Review total net worked hours in decimal format and total minutes.'
    ],
    formula: 'Net Hours = [ (End_Minutes - Start_Minutes) - Break_Minutes ] / 60 (Adjusted +24h for overnight shifts)',
    formulaVariables: [
      { name: 'Start Time', description: 'Shift start timestamp.', unit: 'HH:MM', optional: false },
      { name: 'End Time', description: 'Shift end timestamp.', unit: 'HH:MM', optional: false },
      { name: 'Break Time', description: 'Unpaid break or lunch period.', unit: 'Minutes', optional: false }
    ],
    workedExample: {
      scenario: 'Working from 09:00 to 17:00 with a 30-minute unpaid lunch break.',
      stepByStep: [
        'Start time: 09:00 = 540 minutes from midnight.',
        'End time: 17:00 = 1020 minutes from midnight.',
        'Gross shift duration: 1020 - 540 = 480 minutes (8 hours).',
        'Subtract unpaid break: 480 - 30 = 450 net minutes.',
        'Convert to decimal hours: 450 / 60 = 7.50 hours.'
      ],
      result: 'Net Shift Hours: 7.50 hours (450 net minutes worked)'
    },
    interpretation: 'Ensures accurate timesheet reporting, overtime tracking, and freelance client billing.',
    assumptions: 'Handles overnight shifts transitioning past midnight automatically.',
    limitations: 'Breaks cannot exceed total shift span.',
    faqs: [
      { question: 'Why are worked hours reported in decimal format (e.g., 7.5 instead of 7:30)?', answer: 'Payroll software multiplies decimal hours directly by hourly pay rates (e.g., 7.5 hrs × $20/hr = $150.00).' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب ساعات العمل الفعلية الصافية من خلال خصم فترات الاستراحة والغداء غير المدفوعة من وقت بدء وانتهاء الوردية.`,
    howToUse: [
      'أدخل وقت بدء الدوام (ساعة:دقيقة).',
      'أدخل وقت انتهاء الدوام (ساعة:دقيقة).',
      'أدخل مدة الاستراحة غير المدفوعة بالدقائق.',
      'راجع إجمالي ساعات العمل الصافية بالنظام العشري وبالدقائق.'
    ],
    formula: 'صافي الساعات = [ (دقائق الانتهاء - دقائق البدء) - دقائق الاستراحة ] / 60',
    formulaVariables: [
      { name: 'وقت البدء', description: 'توقيت انطلاق الوردية.', unit: 'ساعة:دقيقة', optional: false },
      { name: 'وقت الانتهاء', description: 'توقيت مغادرة العمل.', unit: 'ساعة:دقيقة', optional: false },
      { name: 'الاستراحة', description: 'فترات الراحة غير المدفوعة.', unit: 'دقيقة', optional: false }
    ],
    workedExample: {
      scenario: 'دوام من 09:00 إلى 17:00 مع استراحة غداء لمدة 30 دقيقة.',
      stepByStep: [
        'وقت البدء: 9:00 = 540 دقيقة.',
        'وقت الانتهاء: 17:00 = 1020 دقيقة.',
        'إجمالي الدوام: 1020 - 540 = 480 دقيقة (8 ساعات).',
        'خصم الاستراحة: 480 - 30 = 450 دقيقة صافية.',
        'التحويل لساعات عشرية: 450 ÷ 60 = 7.50 ساعة.'
      ],
      result: 'ساعات العمل الصافية: 7.50 ساعة (450 دقيقة)'
    },
    interpretation: 'ضرورية لتسجيل بطاقات الدوام وحساب مستحقات العمل الإضافي ومحاسبة المستقلين بالساعة.',
    assumptions: 'تدعم الورديات الليلية التي تتجاوز منتصف الليل تلقائياً.',
    limitations: 'لا يمكن أن تتجاوز مدة الاستراحة إجمالي ساعات الدوام.',
    faqs: [
      { question: 'لماذا تدون ساعات العمل بالنظام العشري (7.5 بدلاً من 7:30)؟', answer: 'لتسهيل ضرب عدد الساعات مباشرة في الأجر المالي للساعة دون الحاجة لتحويلات زمنية مركبة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula las horas laborales netas facturables deduciendo los descansos y pausas de comida del horario de entrada y salida.`,
    howToUse: [
      'Introduzca la hora de inicio de jornada (HH:MM).',
      'Introduzca la hora de fin de jornada (HH:MM).',
      'Introduzca los minutos de descanso no retribuidos.',
      'Consulte las horas netas trabajadas en formato decimal y minutos totales.'
    ],
    formula: 'Horas netas = [ (Minutos_Fin - Minutos_Inicio) - Minutos_Pausa ] / 60',
    formulaVariables: [
      { name: 'Hora inicio', description: 'Entrada al puesto.', unit: 'HH:MM', optional: false },
      { name: 'Hora fin', description: 'Salida de la jornada.', unit: 'HH:MM', optional: false },
      { name: 'Descanso', description: 'Pausa no retribuida.', unit: 'Minutos', optional: false }
    ],
    workedExample: {
      scenario: 'Jornada de 09:00 a 17:00 con 30 minutos de pausa para comer.',
      stepByStep: [
        'Inicio: 09:00 (540 min) | Fin: 17:00 (1020 min).',
        'Horas brutas: 1020 - 540 = 480 minutos (8 horas).',
        'Descuento de pausa: 480 - 30 = 450 minutos netos.',
        'Horas decimales: 450 / 60 = 7,50 horas.'
      ],
      result: 'Horas trabajadas: 7,50 horas (450 minutos netos)'
    },
    interpretation: 'Garantiza el control de fichajes, horas extraordinarias y facturación por horas.',
    assumptions: 'Gestiona turnos de noche que cruzan la medianoche.',
    limitations: 'El descanso no puede superar la duración del turno.',
    faqs: [
      { question: '¿Por qué se expresan las horas en decimales?', answer: 'Facilita la multiplicación directa por la tarifa salarial por hora (ej. 7,5 h × 20 €/h = 150 €).' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule le temps de travail effectif net en déduisant les temps de pause non rémunérés des horaires d'arrivée et de départ.`,
    howToUse: [
      'Indiquez l\'heure de début de poste (HH:MM).',
      'Indiquez l\'heure de fin de poste (HH:MM).',
      'Indiquez la durée des pauses non rémunérées en minutes.',
      'Consultez le total d\'heures effectives en décimal et en minutes.'
    ],
    formula: 'Heures nettes = [ (Minutes_Fin - Minutes_Début) - Minutes_Pause ] / 60',
    formulaVariables: [
      { name: 'Début', description: 'Prise de poste.', unit: 'HH:MM', optional: false },
      { name: 'Fin', description: 'Fin de service.', unit: 'HH:MM', optional: false },
      { name: 'Pause', description: 'Temps de repas / pause.', unit: 'Minutes', optional: false }
    ],
    workedExample: {
      scenario: 'Journée de 09:00 à 17:00 avec 30 minutes de pause déjeuner.',
      stepByStep: [
        'Durée brute : de 9h à 17h = 8 heures (480 minutes).',
        'Déduction de la pause : 480 - 30 = 450 minutes nettes.',
        'Conversion décimale : 450 / 60 = 7,50 heures.'
      ],
      result: 'Heures effectives : 7,50 heures (450 minutes travaillées)'
    },
    interpretation: 'Pratique pour la gestion des feuilles d\'heures, du contingent d\'heures supplémentaires et des prestations d\'indépendants.',
    assumptions: 'Prend en compte les services de nuit dépassant minuit.',
    limitations: 'Le temps de pause ne peut être supérieur à la plage horaire.',
    faqs: [
      { question: 'Comment convertir 30 minutes en centièmes d\'heure ?', answer: '30 minutes divisées par 60 équivalent à 0,50 heure.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die tatsächliche Nettoarbeitszeit durch Abzug unbezahlter Pausenzeiten vom Arbeitsbeginn und Arbeitsende.`,
    howToUse: [
      'Geben Sie den Arbeitsbeginn ein (HH:MM).',
      'Geben Sie das Arbeitsende ein (HH:MM).',
      'Geben Sie die unbezahlte Pausendauer in Minuten ein.',
      'Lesen Sie die Nettoarbeitsstunden als Dezimalzahl und in Minuten ab.'
    ],
    formula: 'Netto-Stunden = [ (Ende_Minuten - Beginn_Minuten) - Pausenminuten ] / 60',
    formulaVariables: [
      { name: 'Beginn', description: 'Uhrzeit Arbeitsbeginn.', unit: 'HH:MM', optional: false },
      { name: 'Ende', description: 'Uhrzeit Arbeitsende.', unit: 'HH:MM', optional: false },
      { name: 'Pause', description: 'Pausenzeit.', unit: 'Minuten', optional: false }
    ],
    workedExample: {
      scenario: 'Arbeitsschicht von 09:00 bis 17:00 Uhr mit 30 Minuten Mittagspause.',
      stepByStep: [
        'Bruttodauer: 09:00 bis 17:00 Uhr = 8 Stunden (480 Minuten).',
        'Pausenabzug: 480 - 30 = 450 Minuten Nettoarbeitszeit.',
        'Dezimalstunden: 450 / 60 = 7,50 Stunden.'
      ],
      result: 'Nettoarbeitszeit: 7,50 Stunden (450 Minuten)'
    },
    interpretation: 'Dient der Zeiterfassung, der Abrechnung von Überstunden und dem Nachweis von Stundenzetteln.',
    assumptions: 'Berücksichtigt auch Nachtschichten über Mitternacht hinaus.',
    limitations: 'Die Pause darf die Schichtzeit nicht überschreiten.',
    faqs: [
      { question: 'Warum rechnet die Lohnbuchhaltung mit Industriestunden (Dezimal)?', answer: 'Weil sich 7,5 Stunden direkt mit dem Stundensatz multiplizieren lassen (z. B. 7,5 h × 20 € = 150 €).' }
    ],
    relatedTools
  })
});

// 5. CHRONOMETER & STOPWATCH TIMER (chronometer-timer)
export const CHRONOMETER_TIMER_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} provides a precise digital chronometer and interval stopwatch displaying elapsed time in hours, minutes, and seconds.`,
    howToUse: [
      'Press Start to initiate real-time precision second-by-second timing.',
      'Press Pause to freeze the elapsed timer.',
      'Press Reset to restore the stopwatch to zero (00:00:00).'
    ],
    formula: 'Elapsed Time = Hours (⌊Seconds / 3600⌋) : Minutes (⌊(Seconds % 3600) / 60⌋) : Seconds (Seconds % 60)',
    formulaVariables: [
      { name: 'Timer Duration', description: 'Continuous elapsed time counter.', unit: 'Seconds', optional: false }
    ],
    workedExample: {
      scenario: 'Tracking an elapsed exercise session lasting exactly 3600 seconds.',
      stepByStep: [
        'Hours: ⌊3600 / 3600⌋ = 1 hour.',
        'Minutes: ⌊(3600 % 3600) / 60⌋ = 0 minutes.',
        'Seconds: 3600 % 60 = 0 seconds.'
      ],
      result: 'Formatted Display: 01:00:00 (1 hour elapsed)'
    },
    interpretation: 'Useful for sports sprint pacing, kitchen cooking intervals, speech rehearsal timing, and productivity Pomodoro blocks.',
    assumptions: 'Browser JavaScript window timer interval.',
    limitations: 'Background tab throttling in modern browsers may pause or slow low-priority timer execution.',
    faqs: [
      { question: 'What is the difference between a chronometer and a timer?', answer: 'A chronometer counts upward from zero to record elapsed duration, while a countdown timer counts downward from a preset time to zero.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `توفر ${name} ساعة توقيت رقمية عالية الدقة لقياس الوقت المنقضي بالساعات والدقائق والثواني.`,
    howToUse: [
      'اضغط على بدء (Start) لبدء حساب الوقت تصاعدياً ثانية بثانية.',
      'اضغط على إيقاف مؤقت (Pause) لتجميد قراءة العداد.',
      'اضغط على إعادة ضبط (Reset) لتصفير المؤقت إلى (00:00:00).'
    ],
    formula: 'الوقت المنقضي = ساعات (الثواني / 3600) : دقائق ((الثواني % 3600) / 60) : ثواني (الثواني % 60)',
    formulaVariables: [
      { name: 'مدة المؤقت', description: 'عداد الثواني المنقضية.', unit: 'ثانية', optional: false }
    ],
    workedExample: {
      scenario: 'توقيت تمرين رياضي استغرق 3600 ثانية بالضبط.',
      stepByStep: [
        'الساعات: 3600 ÷ 3600 = 1 ساعة.',
        'الدقائق: 0 دقيقة.',
        'الثواني: 0 ثانية.'
      ],
      result: 'عرض المؤقت: 01:00:00 (ساعة واحدة كاملة)'
    },
    interpretation: 'أداة مثالية لقياس أزمنة التمارين الرياضية، ومدة الطبخ، والعروض التقديمية وجلسات الإنتاجية.',
    assumptions: 'تعتمد مؤقت متصفح الويب المباشر.',
    limitations: 'قد يؤدي تشغيل المتصفح في الخلفية إلى إبطاء عداد الوقت للحفاظ على طاقة البطارية.',
    faqs: [
      { question: 'ما الفرق بين ساعة الإيقاف والمؤقت التنازلي؟', answer: 'ساعة الإيقاف تحسب الوقت تصاعدياً لمعرفة المدة المستغرقة، بينما يحسب المؤقت التنازلي من وقت محدد مسبقاً حتى الصفر.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} proporciona un cronómetro digital de precisión que registra el tiempo transcurrido en horas, minutos y segundos.`,
    howToUse: [
      'Pulse Iniciar para arrancar la medición de tiempo.',
      'Pulse Pausar para detener el cronómetro.',
      'Pulse Reiniciar para poner el marcador a cero (00:00:00).'
    ],
    formula: 'Formato HH:MM:SS = Horas : Minutos : Segundos',
    formulaVariables: [
      { name: 'Segundos', description: 'Contador de tiempo transcurrido.', unit: 'Segundos', optional: false }
    ],
    workedExample: {
      scenario: 'Cronometrar una sesión de entrenamiento de 3600 segundos.',
      stepByStep: [
        'Horas: 3600 / 3600 = 1 hora.',
        'Minutos: 0 minutos.',
        'Segundos: 0 segundos.'
      ],
      result: 'Tiempo visualizado: 01:00:00 (1 hora justa)'
    },
    interpretation: 'Ideal para deportes, intervalos culinarios y técnicas de estudio como Pomodoro.',
    assumptions: 'Temporizador en tiempo de ejecución del navegador.',
    limitations: 'Las pestañas en segundo plano pueden ralentizar el temporizador.',
    faqs: [
      { question: '¿Cuál es la función principal de un cronómetro?', answer: 'Medir intervalos de tiempo transcurridos con exactitud desde un punto de partida inicial.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} offre un chronomètre numérique affichant le temps écoulé en direct en heures, minutes et secondes.`,
    howToUse: [
      'Cliquez sur Démarrer pour lancer le chronométrage.',
      'Cliquez sur Pause pour figer l\'affichage.',
      'Cliquez sur Réinitialiser pour remettre le compteur à zéro (00:00:00).'
    ],
    formula: 'Temps écoulé = Heures : Minutes : Secondes',
    formulaVariables: [
      { name: 'Secondes', description: 'Compteur de secondes.', unit: 'Secondes', optional: false }
    ],
    workedExample: {
      scenario: 'Mesure d\'une séance sportive de 3600 secondes.',
      stepByStep: [
        'Heures : 1 heure.',
        'Minutes : 0 minute.',
        'Secondes : 0 seconde.'
      ],
      result: 'Affichage : 01:00:00 (1 heure écoulée)'
    },
    interpretation: 'Indispensable pour l\'entraînement sportif, les cuissons en cuisine et les présentations minutées.',
    assumptions: 'Exécution dans l\'environnement navigateur.',
    limitations: 'La mise en veille de l\'onglet peut suspendre le rafraîchissement visuel.',
    faqs: [
      { question: 'Quelle est la différence entre chronomètre et compte à rebours ?', answer: 'Le chronomètre compte vers le haut tandis que le compte à rebours décompte vers zéro.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} stellt eine digitale Stoppuhr zur präzisen Erfassung verstrichener Zeit in Stunden, Minuten und Sekunden bereit.`,
    howToUse: [
      'Klicken Sie auf Start, um die Zeitmessung zu beginnen.',
      'Klicken Sie auf Pause, um die Zeit anzuhalten.',
      'Klicken Sie auf Reset, um die Uhr auf 00:00:00 zurückzusetzen.'
    ],
    formula: 'Verstrichene Zeit = Stunden : Minuten : Sekunden',
    formulaVariables: [
      { name: 'Sekunden', description: 'Fortlaufender Sekundenzähler.', unit: 'Sekunden', optional: false }
    ],
    workedExample: {
      scenario: 'Zeiterfassung eines Trainings über 3600 Sekunden.',
      stepByStep: [
        'Stunden: 3600 / 3600 = 1 Stunde.',
        'Minuten: 0 Minuten.',
        'Sekunden: 0 Sekunden.'
      ],
      result: 'Zeitanzeige: 01:00:00 (Exakt 1 Stunde)'
    },
    interpretation: 'Praktisch für Sportläufe, Kochzeiten und Produktivitätsintervalle.',
    assumptions: 'Browser-Timer-Laufzeit.',
    limitations: 'Hintergrund-Tabs können durch Energiesparmodi gedrosselt werden.',
    faqs: [
      { question: 'Was misst ein Chronometer?', answer: 'Ein Chronometer misst präzise Zeitintervalle ab einem willkürlichen Startzeitpunkt.' }
    ],
    relatedTools
  })
});

// 6. JSON FORMATTER & VALIDATOR (json-formatter)
export const JSON_FORMATTER_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} parses, validates, and beautifies raw JSON strings with standard 2-space hierarchical indentation while flagging syntax syntax errors.`,
    howToUse: [
      'Paste raw, minified, or unformatted JSON text into the input field.',
      'Review the formatted, indented JSON structure.',
      'Verify syntax validity indicators to locate missing commas or mismatched brackets.'
    ],
    formula: 'Formatted Output = JSON.stringify(JSON.parse(input), null, 2)',
    formulaVariables: [
      { name: 'Raw JSON', description: 'JavaScript Object Notation string.', unit: 'Text string', optional: false }
    ],
    workedExample: {
      scenario: 'Formatting unformatted payload {"id":1,"name":"Alice","active":true}.',
      stepByStep: [
        'Parse string using strict JSON lexical grammar.',
        'Indent nested keys by 2 whitespace characters per hierarchy level.',
        'Insert line breaks after commas and opening/closing curly braces.'
      ],
      result: 'Valid JSON output with clean 2-space indentation hierarchy'
    },
    interpretation: 'Indispensable for web developers and API engineers inspecting REST/GraphQL network payloads.',
    assumptions: 'Complies with RFC 8259 JSON syntax (double quotes for keys and strings).',
    limitations: 'Does not permit JavaScript-specific syntax like trailing commas or unquoted keys.',
    faqs: [
      { question: 'Why does JSON require double quotes instead of single quotes?', answer: 'The JSON standard (RFC 8259) strictly mandates double quotes ("key") for string literals and object property names.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحليل نصوص JSON البرمجية وتنسيقها وترتيبها بمسافات بادئة معيارية والتحقق من صحتها البرمجية وخلوها من أخطاء بناء الجملة.`,
    howToUse: [
      'الصق نص JSON المضغوط أو غير المنسق في حقل الإدخال.',
      'راجع الهيكل المنسق والمنظم بمسافات بادئة.',
      'تحقق من سلامة بناء الجملة واكتشف الفواصل الناقصة أو الأقواس غير المغلقة.'
    ],
    formula: 'التنسيق القياسي = JSON.stringify(JSON.parse(نص), null, 2)',
    formulaVariables: [
      { name: 'نص JSON', description: 'سلسلة نصية بتنسيق JSON.', unit: 'نص', optional: false }
    ],
    workedExample: {
      scenario: 'تنسيق نص مضغوط {"id":1,"name":"Alice","active":true}.',
      stepByStep: [
        'تحليل النص وفق قواعد لغة JSON الصارمة.',
        'إضافة مسافتين بادئتين لكل مستوى تفريعي داخلي.',
        'إضافة فواصل أسطر بعد كل عنصر ومفتاح.'
      ],
      result: 'نص JSON صالح ومنسق بمسافات بادئة واضحة'
    },
    interpretation: 'أداة حيوية لمطوري البرمجيات لمعاينة استجابات واجهات البرمجة (APIs) وفحص البيانات.',
    assumptions: 'تلتزم بمعيار RFC 8259 القياسي لـ JSON.',
    limitations: 'لا تقبل الفواصل الأخيرة الزائدة أو المفاتيح بدون علامات اقتباس مزدوجة.',
    faqs: [
      { question: 'لماذا تشترط لغة JSON علامات الاقتباس المزدوجة دائماً؟', answer: 'لأن مواصفة JSON القياسية العالمية تشترط استخدام علامات الاقتباس المزدوجة حصراً للمفاتيح والنصوص لضمان التوافق بين اللغات البرمجية.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} valida y embellece cadenas JSON no formateadas con sangría estándar de 2 espacios, detectando errores de sintaxis y comas faltantes.`,
    howToUse: [
      'Pegue el texto JSON en bruto o minificado en el campo de entrada.',
      'Consulte la estructura jerárquica con sangría legible.',
      'Compruebe el indicador de validez sintáctica.'
    ],
    formula: 'JSON formateado = JSON.stringify(JSON.parse(texto), null, 2)',
    formulaVariables: [
      { name: 'JSON en bruto', description: 'Cadena de texto en formato JSON.', unit: 'Texto', optional: false }
    ],
    workedExample: {
      scenario: 'Formateo de la carga {"id":1,"name":"Alice","active":true}.',
      stepByStep: [
        'Validación léxica de claves y valores.',
        'Inserción de 2 espacios de sangría por nivel jerárquico.',
        'Salto de línea tras corchetes y llaves.'
      ],
      result: 'Estructura JSON válida y legible con sangría de 2 espacios'
    },
    interpretation: 'Herramienta diaria para desarrolladores frontend y backend en depuración de respuestas API.',
    assumptions: 'Estándar estricto RFC 8259.',
    limitations: 'No permite comentarios ni comas finales sobrantes.',
    faqs: [
      { question: '¿Por qué fallan las comillas simples en JSON?', answer: 'El estándar JSON no admite comillas simples (\'key\'); solo acepta comillas dobles ("key").' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} valide et indente le code JSON brut avec 2 espaces hiérarchiques tout en identifiant les erreurs de syntaxe.`,
    howToUse: [
      'Collez le code JSON minifié dans le champ texte.',
      'Consultez la structure indentée et aérée.',
      'Vérifiez la conformité syntaxique des accolades et guillemets.'
    ],
    formula: 'Formatage = JSON.stringify(JSON.parse(entrée), null, 2)',
    formulaVariables: [
      { name: 'Code JSON', description: 'Chaîne textuelle JSON.', unit: 'Texte', optional: false }
    ],
    workedExample: {
      scenario: 'Mise en forme de {"id":1,"name":"Alice","active":true}.',
      stepByStep: [
        'Analyse syntaxique de la structure.',
        'Indentation de 2 espaces pour chaque niveau.',
        'Retour à la ligne systématique.'
      ],
      result: 'Code JSON parfaitement valide et structuré'
    },
    interpretation: 'Essentiel pour inspecter et déboguer les requêtes d\'API REST et GraphQL.',
    assumptions: 'Conforme à la norme RFC 8259.',
    limitations: 'Refuse les virgules de fin orphelines.',
    faqs: [
      { question: 'Peut-on mettre des commentaires dans du JSON ?', answer: 'Non, la spécification officielle JSON interdit formellement les commentaires.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} formatiert, validiert und strukturiert unformatierte JSON-Daten mit 2 Leerzeichen Einrückung und prüft auf Syntaxfehler.`,
    howToUse: [
      'Fügen Sie Ihren unformatierten JSON-Text in das Eingabefeld ein.',
      'Lesen Sie die strukturierte, eingerückte Ansicht ab.',
      'Überprüfen Sie Fehlermeldungen bei ungültiger Syntax.'
    ],
    formula: 'Formatierte Ausgabe = JSON.stringify(JSON.parse(Text), null, 2)',
    formulaVariables: [
      { name: 'JSON-Eingabe', description: 'JSON-Zeichenkette.', unit: 'Text', optional: false }
    ],
    workedExample: {
      scenario: 'Formatierung von {"id":1,"name":"Alice","active":true}.',
      stepByStep: [
        'Parsen nach RFC 8259 Standard.',
        'Hierarchische Einrückung mit jeweils 2 Leerzeichen.',
        'Zeilenumbrüche nach Klammern und Kommas.'
      ],
      result: 'Gültiges JSON mit sauberer 2-Zeichen-Einrückung'
    },
    interpretation: 'Unentbehrlich für Software-Entwickler zur Analyse von Schnittstellen-Payloads (APIs).',
    assumptions: 'Streng nach RFC 8259 Standard.',
    limitations: 'Erlaubt keine nachgestellten Kommas (trailing commas) oder JavaScript-Objekt-Syntax.',
    faqs: [
      { question: 'Warum schlägt JSON mit einfachen Anführungszeichen fehl?', answer: 'Weil die JSON-Spezifikation zwingend doppelte Anführungszeichen für Zeichenketten und Schlüssel vorschreibt.' }
    ],
    relatedTools
  })
});

// Map of Batch 1 everyday tools
export const BATCH1_EVERYDAY_HANDLERS: Record<string, Record<Language, KnowledgeHandler>> = {
  'electricity-cost': ELECTRICITY_COST_KNOWLEDGE,
  'cooking-converter': COOKING_CONVERTER_KNOWLEDGE,
  'age-dog-cat': AGE_DOG_CAT_KNOWLEDGE,
  'work-shift-hours': WORK_SHIFT_HOURS_KNOWLEDGE,
  'chronometer-timer': CHRONOMETER_TIMER_KNOWLEDGE,
  'json-formatter': JSON_FORMATTER_KNOWLEDGE,
};
