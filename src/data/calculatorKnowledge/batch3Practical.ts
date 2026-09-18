import { ToolDef, Language } from '../../types';
import { ToolContentDetails } from './types';

type KnowledgeHandler = (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails;

function createKnowledge(dataByLang: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails>): Record<Language, KnowledgeHandler> {
  return dataByLang;
}

// 1. CAR DEPRECIATION (car-depreciation)
export const CAR_DEPRECIATION_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates estimated vehicle market depreciation, annual residual resale value, total cost of ownership depreciation loss, and monthly depreciation rates over 1 to 10 years.`,
    howToUse: [
      'Enter the initial purchase price of the vehicle.',
      'Enter ownership duration in years.',
      'Select depreciation rate curve (Standard average: ~20% year 1, 15%/yr thereafter; Low luxury; High reliability).',
      'Review remaining vehicle resale value and total cumulative loss.'
    ],
    formula: 'Year 1: Value₁ = Price × (1 - r₁); Year t: Value_t = Value_{t-1} × (1 - r_t)',
    formulaVariables: [
      { name: 'Purchase Price', description: 'Original sticker or transaction price.', unit: 'Currency ($)', optional: false },
      { name: 'Ownership Years', description: 'Holding period in years.', unit: 'Years', optional: false },
      { name: 'Depreciation Rates', description: 'Year 1 drop (~20%) and annual ongoing drop (~15%).', unit: '% / Year', optional: true }
    ],
    workedExample: {
      scenario: 'A new car purchased for $35,000 held for 5 years with standard depreciation (20% year 1, 15% years 2-5).',
      stepByStep: [
        'End of Year 1: $35,000 × (1 - 0.20) = $28,000.',
        'End of Year 2: $28,000 × (1 - 0.15) = $23,800.',
        'End of Year 3: $23,800 × (1 - 0.15) = $20,230.',
        'End of Year 4: $20,230 × (1 - 0.15) = $17,196.',
        'End of Year 5: $17,196 × (1 - 0.15) = $14,616.',
        'Total 5-Year Depreciation Loss = $35,000 - $14,616 = $20,384 ($339.73/month).'
      ],
      result: 'Estimated Resale Value (Year 5) = $14,616 | Total Depreciation Loss = $20,384 (58.2%)'
    },
    interpretation: 'Depreciation is the largest hidden expense of vehicle ownership, exceeding fuel and insurance costs during the first 3 years.',
    assumptions: 'Assumes average annual mileage (12,000 - 15,000 miles/yr) and clean vehicle condition.',
    limitations: 'Market supply anomalies, accident history, brand prestige, and fuel economy shifts alter real-world used car values.',
    faqs: [
      { question: 'Why do new cars lose so much value in the first year?', answer: 'The immediate shift from "brand new" to "pre-owned" dealer wholesale margins causes an immediate 15% to 25% depreciation drop in year one.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب معدل استهلاك وانخفاض قيمة السيارات (Depreciation)، والقيمة المتبقية عند إعادة البيع، وخسارة الاستهلاك السنوية والشهرية على مدار 1 إلى 10 سنوات.`,
    howToUse: [
      'أدخل سعر شراء السيارة الأصلي.',
      'أدخل عدد سنوات التملك والاستخدام.',
      'اختر معدل الاستهلاك السنوي (المعدل القياسي ~20% في السنة الأولى ثم ~15% سنوياً).',
      'اطلع على القيمة السوقية المتبقية وإجمالي مبلغ الانخفاض في السعر.'
    ],
    formula: 'القيمة بعد سنة = السعر × (1 - نسبة الانخفاض)',
    formulaVariables: [
      { name: 'سعر الشراء', description: 'سعر شراء السيارة الأصلي.', unit: 'عملة', optional: false },
      { name: 'سنوات التملك', description: 'فترة الاحتفاظ بالسيارة.', unit: 'سنوات', optional: false }
    ],
    workedExample: {
      scenario: 'سيارة جديدة بسعر 35,000 دولار بعد 5 سنوات من الاستخدام.',
      stepByStep: [
        'السنة الأولى (انخفاض 20%): تصبح 28,000 دولار.',
        'السنة الخامسة (انخفاض تراكمي 15% سنوياً): تصبح القيمة 14,616 دولار.',
        'إجمالي خسارة الاستهلاك = 20,384 دولار (58.2%).'
      ],
      result: 'قيمة إعادة البيع بعد 5 سنوات = 14,616 دولار | إجمالي خسارة الاستهلاك = 20,384 دولار'
    },
    interpretation: 'يعتبر استهلاك القيمة أكبر تكلفة غير مرئية لامتلاك السيارات متجاوزاً الوقود والتأمين.',
    assumptions: 'متوسط مسافة سنوية طبيعية (15,000 كم إلى 20,000 كم) وحالة صيانة جيدة.',
    limitations: 'الحوادث والطلب على علامات تجارية محددة يغيران القيمة السوقية الفعلية.',
    faqs: [
      { question: 'لماذا تفقد السيارات الجديدة ربع قيمتها في السنة الأولى؟', answer: 'بسبب انتقال تصنيف السيارة فور خروجها من المعرض إلى سيارة مستعملة وتكاليف هوامش الوكالات.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la depreciación del valor de un vehículo y su precio de reventa residual año a año de 1 a 10 años.`,
    howToUse: [
      'Ingrese el precio de compra del coche y los años de posesión.',
      'Consulte el valor residual de mercado y la pérdida económica acumulada.'
    ],
    formula: 'Valor_t = Valor_{t-1} × (1 - tasa_t)',
    formulaVariables: [
      { name: 'Precio de Compra', description: 'Valor inicial de compra.', unit: 'Moneda', optional: false },
      { name: 'Años', description: 'Periodo de uso.', unit: 'Años', optional: false }
    ],
    workedExample: {
      scenario: 'Vehículo de 35.000€ mantenido 5 años.',
      stepByStep: [
        'Año 1 (-20%): 28.000€ | Año 5: 14.616€ | Pérdida total = 20.384€.'
      ],
      result: 'Valor Residual (Año 5) = 14.616€ | Depreciación Total = 20.384€ (58.2%)'
    },
    interpretation: 'Principal coste del ciclo de vida del automóvil.',
    assumptions: 'Kilometraje anual estándar y buen estado mecánico.',
    limitations: 'Marcas con alta fiabilidad conservan mayor valor residual.',
    faqs: [
      { question: '¿Cuál es el año de mayor depreciación?', answer: 'El primer año, donde suele perderse entre el 15% y el 25% del valor.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} évalue la dépréciation et décote annuelle d'un véhicule ainsi que sa valeur résiduelle de revente sur 1 à 10 ans.`,
    howToUse: [
      'Saisissez le prix d’achat et la durée de détention en années.',
      'Consultez la valeur de revente estimée et la perte cumulée.'
    ],
    formula: 'Valeur_t = Valeur_{t-1} × (1 - taux_t)',
    formulaVariables: [
      { name: 'Prix d’Achat', description: 'Montant initial.', unit: 'Devise', optional: false },
      { name: 'Années', description: 'Durée.', unit: 'Années', optional: false }
    ],
    workedExample: {
      scenario: 'Voiture neuve de 35 000 € conservée 5 ans.',
      stepByStep: [
        'Année 1 (-20 %) : 28 000 € | Année 5 : 14 616 € | Perte = 20 384 €.'
      ],
      result: 'Valeur Résiduelle = 14 616 € | Décote Totale = 20 384 € (58,2 %)'
    },
    interpretation: 'Premier poste de dépense globale d’un véhicule neuf.',
    assumptions: 'Kilométrage moyen (15 000 km/an) et entretien régulier.',
    limitations: 'Varie selon la marque, la motorisation et l’état du marché.',
    faqs: [
      { question: 'Combien perd une voiture neuve en 3 ans ?', answer: 'Généralement entre 40 % et 50 % de son prix initial.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet den jährlichen Wertverlust (Abschreibung) und Restwert von Fahrzeugen über 1 bis 10 Jahre Haltedauer.`,
    howToUse: [
      'Geben Sie den Kaufpreis und die Haltedauer in Jahren ein.',
      'Lesen Sie den verbleibenden Wiederverkaufswert und den Gesamtverlust ab.'
    ],
    formula: 'Restwert_t = Restwert_{t-1} × (1 - Rate_t)',
    formulaVariables: [
      { name: 'Kaufpreis', description: 'Ursprünglicher Anschaffungspreis.', unit: 'Währung', optional: false },
      { name: 'Jahre', description: 'Nutzungsdauer in Jahren.', unit: 'Jahre', optional: false }
    ],
    workedExample: {
      scenario: 'Neuwagen für 35.000 € über 5 Jahre Haltedauer.',
      stepByStep: [
        'Jahr 1 (-20%): 28.000 € | Jahr 5: 14.616 € | Gesamtwertverlust = 20.384 €.'
      ],
      result: 'Restwert (Jahr 5) = 14.616 € | Wertverlust = 20.384 € (58,2 %)'
    },
    interpretation: 'Der Wertverlust ist der größte Kostenfaktor bei Neuwagen.',
    assumptions: 'Durchschnittliche Fahrleistung (15.000 km/Jahr).',
    limitations: 'Markenimage, Zustand und Antriebsart beeinflussen den realen Marktwert.',
    faqs: [
      { question: 'Wann verliert ein Auto am meisten an Wert?', answer: 'Im ersten Jahr verliert ein Neuwagen typischerweise etwa 20 % bis 25 % seines Listenpreises.' }
    ],
    relatedTools
  })
});

// 2. EV CHARGING TIME (ev-charging-time)
export const EV_CHARGING_TIME_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} estimates electric vehicle (EV) battery charging duration, added driving range per hour, charging costs, and power output across Level 1, Level 2, and DC Fast chargers.`,
    howToUse: [
      'Enter EV usable battery capacity in kilowatt-hours (kWh, e.g., 75 kWh).',
      'Enter starting battery state of charge (SoC %) and target charge % (e.g., 20% to 80%).',
      'Enter charger power output in kW (e.g., 1.4 kW for L1, 7.4-11 kW for L2 AC, or 50-250 kW for DC Fast).',
      'Optionally set charging efficiency (standard 88% - 92% AC, 95% DC) and electricity rate ($/kWh).',
      'Review computed charging time in hours and minutes.'
    ],
    formula: 'Time (hours) = [Battery Capacity (kWh) × (Target % - Start %) / 100] / [Charger Power (kW) × Efficiency]',
    formulaVariables: [
      { name: 'Battery Capacity', description: 'Total usable battery energy.', unit: 'kWh', optional: false },
      { name: 'Start SoC & Target SoC', description: 'Initial and target battery charge percentages.', unit: '%', optional: false },
      { name: 'Charger Power', description: 'Charging station delivery power rating.', unit: 'kW', optional: false },
      { name: 'Efficiency', description: 'Charging power conversion efficiency (~0.90).', unit: 'Decimal (0-1)', optional: true }
    ],
    workedExample: {
      scenario: 'Charging a 75 kWh battery from 20% to 80% on an 11 kW Level 2 home AC wallbox (90% efficiency).',
      stepByStep: [
        'Energy Needed = 75 kWh × (80% - 20%) = 75 × 0.60 = 45.0 kWh.',
        'Effective Charging Power = 11 kW × 0.90 = 9.9 kW.',
        'Charging Time = 45.0 kWh / 9.9 kW = 4.545 hours (4 hours and 33 minutes).'
      ],
      result: 'Charging Duration = 4 hrs 33 mins | Energy Delivered = 45 kWh | Added Range (~3.5 mi/kWh) = 157.5 miles'
    },
    interpretation: 'Enables EV owners to schedule overnight charging and optimize DC fast-charging stop intervals on road trips.',
    assumptions: 'Assumes linear power delivery for AC charging; DC fast charging assumes average taper rate between 20% and 80% SoC.',
    limitations: 'Cold ambient battery temperatures and extreme charge levels (>80% SoC on DC fast) cause thermal throttling.',
    faqs: [
      { question: 'Why is it recommended to charge only up to 80% on DC fast chargers?', answer: 'Above 80% SoC, battery chemistry requires severe power tapering to prevent lithium plating and thermal stress, making charging significantly slower.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب مدة شحن بطارية السيارات الكهربائية (EV)، والمسافة المكتسبة لكل ساعة، وتكلفة الشحن للشواحن المنزلية والسريعة (Level 1, Level 2, DC Fast).`,
    howToUse: [
      'أدخل سعة البطارية بالكيلوواط ساعة (kWh مثل 75 kWh).',
      'أدخل نسبة الشحن الحالية والنسبة المستهدفة (مثلاً من 20% إلى 80%).',
      'أدخل قدرة الشاحن بالكيلوواط (kW مثل 11 kW للشاحن المنزلي أو 150 kW للشاحن السريع).',
      'اطلع على وقت الشحن بالساعات والدقائق والتكلفة التقديرية.'
    ],
    formula: 'الوقت (ساعات) = [سعة البطارية × نسبة الشحن المطلوبة] ÷ [قدرة الشاحن × الكفاءة]',
    formulaVariables: [
      { name: 'سعة البطارية', description: 'السعة الصافية للبطارية.', unit: 'كيلوواط ساعة (kWh)', optional: false },
      { name: 'قدرة الشاحن', description: 'طاقة الشاحن.', unit: 'كيلوواط (kW)', optional: false }
    ],
    workedExample: {
      scenario: 'شحن بطارية 75 kWh من 20% إلى 80% بشاحن منزلي 11 kW (كفاءة 90%).',
      stepByStep: [
        'الطاقة المطلوبة = 75 × 0.60 = 45 kWh.',
        'القدرة الفعلية = 11 × 0.90 = 9.9 kW.',
        'الوقت = 45 ÷ 9.9 = 4.55 ساعات (4 ساعات و 33 دقيقة).'
      ],
      result: 'مدة الشحن = 4 ساعات و 33 دقيقة | الطاقة المشحونة = 45 kWh'
    },
    interpretation: 'تساعد مالكي السيارات الكهربائية في تخطيط الشحن الليلي ورحلات السفر الطويلة.',
    assumptions: 'كفاءة نقل الطاقة 90% للشواحن المنزلية.',
    limitations: 'تقل سرعة الشحن في الأجواء شديدة البرودة وعند تجاوز نسبة 80% في الشواحن السريعة.',
    faqs: [
      { question: 'لماذا يبطئ الشحن السريع بعد 80%؟', answer: 'لحماية خلايا البطارية من الحرارة المرتفعة وإطالة عمرها الافتراضي.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el tiempo de recarga de coches eléctricos (VE), coste de la energía y autonomía añadida para cargadores lentos y rápidos.`,
    howToUse: [
      'Ingrese la capacidad de la batería en kWh (ej. 75 kWh).',
      'Indique el % inicial, % deseado y la potencia del cargador en kW.',
      'Consulte las horas y minutos necesarios para completar la carga.'
    ],
    formula: 'Tiempo = [Capacidad (kWh) × (SoC_fin - SoC_ini)/100] / (Potencia kW × Eficiencia)',
    formulaVariables: [
      { name: 'Capacidad', description: 'Batería en kWh.', unit: 'kWh', optional: false },
      { name: 'Potencia', description: 'Potencia de carga.', unit: 'kW', optional: false }
    ],
    workedExample: {
      scenario: 'Batería de 75 kWh de 20% a 80% con cargador de 11 kW (90% eficiencia).',
      stepByStep: [
        'Energía = 45 kWh | Potencia neta = 9.9 kW | Tiempo = 45 / 9.9 = 4.55 h.'
      ],
      result: 'Tiempo de Carga = 4 h 33 min | Energía = 45 kWh'
    },
    interpretation: 'Optimiza la carga doméstica nocturna y paradas en viajes.',
    assumptions: 'Eficiencia media del 90%.',
    limitations: 'La potencia en carga rápida DC se reduce tras el 80% de batería.',
    faqs: [
      { question: '¿Cuánto tarda cargar en un enchufe doméstico convencional (L1)?', answer: 'A 2.3 kW, una carga completa puede tardar entre 24 y 36 horas.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} estime le temps de charge d'un véhicule électrique, le coût en électricité et l'autonomie récupérée par heure de charge.`,
    howToUse: [
      'Saisissez la capacité de la batterie (kWh), le niveau initial et le niveau visé (%).',
      'Indiquez la puissance de la borne (kW) et consultez la durée estimée.'
    ],
    formula: 'Temps (h) = [Capacité (kWh) × Δ% / 100] / (Puissance kW × Rendement)',
    formulaVariables: [
      { name: 'Capacité', description: 'Énergie utile de la batterie.', unit: 'kWh', optional: false },
      { name: 'Puissance', description: 'Puissance de la borne.', unit: 'kW', optional: false }
    ],
    workedExample: {
      scenario: 'Batterie 75 kWh de 20 % à 80 % sur borne 11 kW (rendement 90 %).',
      stepByStep: [
        'Énergie requise = 45 kWh | Puissance utile = 9,9 kW | Durée = 4,55 h.'
      ],
      result: 'Temps de Charge = 4 h 33 min | Énergie Reçue = 45 kWh'
    },
    interpretation: 'Permet de planifier les recharges à domicile et les arrêts sur autoroute.',
    assumptions: 'Rendement moyen de 90 % en courant alternatif.',
    limitations: 'La courbe de charge chute au-delà de 80 % sur les bornes de recharge ultra-rapides DC.',
    faqs: [
      { question: 'Pourquoi privilégier la plage 20 % - 80 % ?', answer: 'C’est la zone optimale pour préserver la longévité de la batterie et charger au débit maximal.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet Ladezeit, Ladekosten und Reichweitengewinn für Elektroautos (E-Autos) an Schuko, Wallbox und DC-Schnellladern.`,
    howToUse: [
      'Geben Sie Batteriekapazität (kWh), Start- und Ziel-Ladestand (%) ein.',
      'Tragen Sie die Ladeleistung (kW) ein und lesen Sie Ladedauer und Kosten ab.'
    ],
    formula: 'Ladezeit = [Kapazität (kWh) × Δ% / 100] / (Ladeleistung kW × Wirkungsgrad)',
    formulaVariables: [
      { name: 'Batteriegröße', description: 'Nettokapazität in kWh.', unit: 'kWh', optional: false },
      { name: 'Ladeleistung', description: 'Leistung der Ladestation.', unit: 'kW', optional: false }
    ],
    workedExample: {
      scenario: '75 kWh Akku von 20% auf 80% an einer 11 kW Wallbox (90% Wirkungsgrad).',
      stepByStep: [
        'Benötigte Energie = 45 kWh | Reale Ladeleistung = 9,9 kW | Zeit = 45 / 9,9 = 4,55 h.'
      ],
      result: 'Ladezeit = 4 Std. 33 Min. | Geladene Energie = 45 kWh'
    },
    interpretation: 'Erleichtert die Planung nächtlicher Wallbox-Ladungen und Schnellladestopps.',
    assumptions: '90 % Ladeeffizienz bei Wechselstrom.',
    limitations: 'DC-Ladekurven drosseln die Leistung ab 80 % Ladestand deutlich.',
    faqs: [
      { question: 'Wie viel Ladeverlust entsteht an einer Wallbox?', answer: 'Typischerweise betragen die Umwandlungs- und Leitungsverluste etwa 8 % bis 12 %.' }
    ],
    relatedTools
  })
});

// 3. PAINT COVERAGE (paint-coverage)
export const PAINT_COVERAGE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates total room surface area, paint gallon or liter requirements, number of coats, and subtractions for windows and doors.`,
    howToUse: [
      'Enter room dimensions: length, width, and ceiling height.',
      'Enter number of standard doors (default 21 sq ft / 2 m² each) and windows (default 15 sq ft / 1.4 m² each).',
      'Select number of coats (default 2 coats) and paint coverage rating (standard ~350-400 sq ft per gallon / 10 m² per liter).',
      'Review total paintable area and total cans/gallons needed with recommended 10% buffer.'
    ],
    formula: 'Net Area = [2 × (Length + Width) × Height] - (Doors × Area_door + Windows × Area_win) | Paint = (Net Area × Coats) / Coverage_per_can',
    formulaVariables: [
      { name: 'Room Dimensions', description: 'Length, Width, and Wall Height.', unit: 'Feet / Meters', optional: false },
      { name: 'Doors & Windows', description: 'Count of openings to subtract.', unit: 'Units', optional: false },
      { name: 'Number of Coats', description: 'Layers of paint applied (typically 2).', unit: 'Coats', optional: false }
    ],
    workedExample: {
      scenario: 'A room 15 ft long by 12 ft wide with 9 ft ceiling height, 1 door, 2 windows, requiring 2 coats of paint (350 sq ft/gal).',
      stepByStep: [
        'Gross Wall Area = 2 × (15 + 12) × 9 = 2 × 27 × 9 = 486 sq ft.',
        'Deductions = (1 door × 21 sq ft) + (2 windows × 15 sq ft) = 21 + 30 = 51 sq ft.',
        'Net Paintable Wall Area = 486 - 51 = 435 sq ft.',
        'Total Coverage Needed (2 coats) = 435 × 2 = 870 sq ft.',
        'Gallons Required = 870 / 350 = 2.49 gallons (Purchase 3 one-gallon cans).'
      ],
      result: 'Net Area = 435 sq ft | Paint Needed (2 coats) = 2.49 Gallons (Round to 3 Gallons)'
    },
    interpretation: 'Prevents mid-project paint shortages and minimizes costly paint waste.',
    assumptions: 'Standard smooth drywall walls. Textured walls or unprimed surfaces require 20% to 30% more paint.',
    limitations: 'Ceiling painting is excluded unless specifically selected.',
    faqs: [
      { question: 'Why are two coats of paint recommended?', answer: 'Two coats ensure uniform color opacity, prevent patchy light bleeding, and provide maximum washability and durability.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب مساحة الجدران الصافية للغرف، وكمية الدهان المطلوبة باللتر أو الجالون، وعدد الأوجه (الطبقات)، مع خصم مساحات النوافذ والأبواب.`,
    howToUse: [
      'أدخل أبعاد الغرفة: الطول والعرض والارتفاع.',
      'أدخل عدد الأبواب والنوافذ لخصم مساحتها.',
      'حدد عدد طبقات الدهان (الافتراضي 2 وجه) ومعدل فرد الدهان (حوالي 10-12 م² لكل لتر).',
      'اطلع على المساحة الصافية وكمية علب الدهان المطلوبة مع نسبة الهالك.'
    ],
    formula: 'المساحة الصافية = مساحة الجدران الكلية - (مساحة الأبواب + النوافذ) | الدهان = (المساحة × عدد الطبقات) ÷ معدل التغطية',
    formulaVariables: [
      { name: 'أبعاد الغرفة', description: 'الطول والعرض والارتفاع.', unit: 'متر', optional: false },
      { name: 'الأبواب والنوافذ', description: 'الفتحات المراد خصمها.', unit: 'عدد', optional: false }
    ],
    workedExample: {
      scenario: 'غرفة 5م × 4م بارتفاع 3م مع باب واحد ونافذتين ووجهين دهان.',
      stepByStep: [
        'المساحة الكلية = 2 × (5 + 4) × 3 = 54 م².',
        'خصم الفتحات = 2 م² (باب) + 3 م² (نافذتان) = 5 م².',
        'المساحة الصافية = 49 م².',
        'المساحة لوجهين = 49 × 2 = 98 م².',
        'اللترات المطلوبة (بمعدل 10 م²/لتر) = 9.8 لتر (تقريباً 10 لترات).'
      ],
      result: 'المساحة الصافية = 49 م² | كمية الدهان = 9.8 لتر (عبوة 10 لتر)'
    },
    interpretation: 'تمنع نقص الدهان أثناء العمل أو الشراء الزائد عن الحاجة.',
    assumptions: 'جدران ملساء مهيأة بطبقة أساس.',
    limitations: 'الجدران الخشنة أو الجبس غير المؤسس يستهلك دهاناً إضافياً بنسبة 20-30%.',
    faqs: [
      { question: 'لماذا يفضل دهان طبقتين (وجهين)؟', answer: 'لضمان تجانس اللون تماماً وإخفاء عيوب الجدار وزيادة مقاومة الدهان للغسيل.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula los metros cuadrados de pared, litros o galones de pintura necesarios y resta huecos de puertas y ventanas.`,
    howToUse: [
      'Ingrese largo, ancho y alto de la habitación.',
      'Indique número de puertas y ventanas y capas de pintura (ej. 2 manos).',
      'Consulte la superficie neta y los botes de pintura a comprar.'
    ],
    formula: 'Área Neta = Área Paredes - Huecos | Pintura = (Área Neta × Manos) / Rendimiento',
    formulaVariables: [
      { name: 'Dimensiones', description: 'Largo, ancho y altura.', unit: 'Metros', optional: false }
    ],
    workedExample: {
      scenario: 'Habitación de 5m × 4m con 3m de alto, 1 puerta, 2 ventanas y 2 capas.',
      stepByStep: [
        'Paredes = 54 m² - 5 m² (huecos) = 49 m² netos × 2 manos = 98 m² a cubrir = 9.8 Litros.'
      ],
      result: 'Superficie Neta = 49 m² | Pintura (2 manos) = 9.8 Litros (Comprar 10L)'
    },
    interpretation: 'Optimiza el presupuesto de pintura en reformas del hogar.',
    assumptions: 'Pared lisa con imprimación previa.',
    limitations: 'Paredes rugosas o gotelé requieren un 25% más de pintura.',
    faqs: [
      { question: '¿Cuál es el rendimiento habitual de la pintura plástica?', answer: 'Entre 10 y 12 m² por litro y mano sobre superficies lisas.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule la surface nette des murs, les litres de peinture nécessaires en déduisant portes et fenêtres pour 1 ou 2 couches.`,
    howToUse: [
      'Saisissez les dimensions de la pièce (longueur, largeur, hauteur).',
      'Indiquez le nombre d’ouvertures et de couches de peinture.',
      'Consultez la surface à peindre et le nombre de pots nécessaires.'
    ],
    formula: 'Surface Nette = Surface Brute - Ouvertures | Peinture = (Surface × Couches) / Pouvoir Couvrant',
    formulaVariables: [
      { name: 'Dimensions', description: 'Longueur, largeur et hauteur.', unit: 'Mètres', optional: false }
    ],
    workedExample: {
      scenario: 'Pièce 5m × 4m, hauteur 3m, 1 porte, 2 fenêtres, 2 couches.',
      stepByStep: [
        'Surface brute = 54 m² - 5 m² d’ouvertures = 49 m² nets. Pour 2 couches = 98 m² = 9,8 L.'
      ],
      result: 'Surface Nette = 49 m² | Volume de Peinture = 9,8 Litres (Prévoir 10 L)'
    },
    interpretation: 'Évite les ruptures de stock pendant les travaux de rénovation.',
    assumptions: 'Murs lisses et apprêtés.',
    limitations: 'Les enduits bruts ou crépis nécessitent 20 à 30 % de peinture supplémentaire.',
    faqs: [
      { question: 'Faut-il appliquer une sous-couche ?', answer: 'Oui, elle bloque le fond et réduit la consommation de peinture de finition.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die Wandfläche, benötigte Farbmenge in Litern unter Abzug von Fenstern und Türen für 1 bis 3 Anstriche.`,
    howToUse: [
      'Geben Sie Raumlänge, -breite und Deckenhöhe ein.',
      'Geben Sie Türen, Fenster und gewünschte Anstriche an.',
      'Lesen Sie die Nettofläche und benötigte Farbeimer ab.'
    ],
    formula: 'Nettofläche = Wandfläche - Öffnungen | Farbbedarf = (Fläche × Anstriche) / Ergiebigkeit',
    formulaVariables: [
      { name: 'Raummaße', description: 'Länge, Breite, Höhe.', unit: 'Meter', optional: false }
    ],
    workedExample: {
      scenario: '5m × 4m Raum, 3m Höhe, 1 Tür, 2 Fenster, 2 Anstriche.',
      stepByStep: [
        'Bruttofläche = 54 m² - 5 m² Öffnungen = 49 m² Netto × 2 = 98 m² = 9,8 Liter.'
      ],
      result: 'Nettofläche = 49 m² | Farbmenge (2 Anstriche) = 9,8 Liter (10-Liter-Eimer)'
    },
    interpretation: 'Sorgt für exakte Materialbedarfsplanung beim Streichen.',
    assumptions: 'Glatte, grundierte Wände.',
    limitations: 'Raufaser oder strukturierter Putz verbraucht bis zu 25 % mehr Farbe.',
    faqs: [
      { question: 'Wie viel Farbe braucht man pro m²?', answer: 'Typische Wandfarbe reicht für ca. 6 bis 8 m² pro Liter (bzw. 10 bis 12 m² bei hochdeckenden Qualitätsfarben).' }
    ],
    relatedTools
  })
});

// 4. FLOORING & TILE (flooring-tile)
export const FLOORING_TILE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates floor area, total square footage/meters, tile box counts, individual tile piece counts, and recommended 10% to 15% waste allowance.`,
    howToUse: [
      'Enter room length and width in feet or meters.',
      'Enter tile dimensions (length and width in inches or cm).',
      'Enter square footage per box from the manufacturer packaging.',
      'Select waste factor (10% standard straight lay, 15% diagonal/herringbone patterns).',
      'Review total tiles, total boxes to order, and exact layout square footage.'
    ],
    formula: 'Area = Length × Width | Total Area with Waste = Area × (1 + Waste%) | Boxes = ceil(Total Area / Box Coverage)',
    formulaVariables: [
      { name: 'Room Area', description: 'Floor surface length and width.', unit: 'Sq Ft / m²', optional: false },
      { name: 'Tile Dimensions', description: 'Individual tile size (e.g., 12x12 or 12x24 inches).', unit: 'Inches / cm', optional: false },
      { name: 'Waste Allowance', description: 'Cutting allowance (10% straight, 15% diagonal).', unit: '%', optional: false }
    ],
    workedExample: {
      scenario: 'A room 12 ft by 14 ft tiled with 12x24 inch tiles (2 sq ft each), 10% waste, sold in 16 sq ft boxes.',
      stepByStep: [
        'Base Room Area = 12 × 14 = 168 sq ft.',
        'With 10% Waste Factor = 168 × 1.10 = 184.8 sq ft.',
        'Tile Pieces Needed = 184.8 / 2 = 92.4 tiles (Round to 93 tiles).',
        'Boxes to Order = ceil(184.8 / 16) = ceil(11.55) = 12 boxes (192 sq ft total).'
      ],
      result: 'Room Area = 168 sq ft | Total to Purchase = 184.8 sq ft | Boxes to Order = 12 Boxes (96 tiles)'
    },
    interpretation: 'Ensures adequate tile quantities accounting for edge cuts, corner trimming, and future replacement stock.',
    assumptions: 'Assumes rectangular or combined rectangular room zones.',
    limitations: 'Complex diagonal or herringbone patterns produce higher cut-off scrap requiring 15% to 20% waste buffer.',
    faqs: [
      { question: 'Why should you keep 1 extra box of tiles after installation?', answer: 'Different manufacturing dye lots vary slightly in color; keeping spare tiles ensures seamless future plumbing or tile repair matches.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب مساحة الأرضيات، وعدد كراتين السيراميك أو البورسلين والباركيه، وعدد البلاطات الفردية، مع احتساب نسبة الهالك للقص والتطابق (10% - 15%).`,
    howToUse: [
      'أدخل طول وعرض الغرفة بالمتر أو القدم.',
      'أدخل أبعاد البلاطة الواحدة بالسنتيمتر (مثل 60×60 سم أو 60×120 سم).',
      'أدخل مساحة الكرتونة الواحدة من عبوة المصنع.',
      'حدد نسبة الهالك للقص (10% للتركيب المستقيم، 15% للتركيب المائل أو الهيرنجبون).',
      'اطلع على إجمالي الأمتار المطلوبة وعدد الكراتين الواجب شراؤها.'
    ],
    formula: 'المساحة الكلية بالهالك = (الطول × العرض) × (1 + نسبة الهالك) | عدد الكراتين = سقف(المساحة ÷ مساحة الكرتونة)',
    formulaVariables: [
      { name: 'أبعاد الغرفة', description: 'الطول والعرض بالمتر.', unit: 'متر', optional: false },
      { name: 'أبعاد البلاطة', description: 'مقاس الحبة بالسنتيمتر.', unit: 'سم', optional: false }
    ],
    workedExample: {
      scenario: 'غرفة 4م × 5م (20 م²) مع سيراميك 60×60 سم وهالك 10% وكرتونة تحتوي 1.44 م².',
      stepByStep: [
        'المساحة الصافية = 20 م².',
        'مع هالك 10% = 20 × 1.10 = 22 م².',
        'عدد الكراتين = 22 ÷ 1.44 = 15.28 كرتونة (يتم شراء 16 كرتونة).'
      ],
      result: 'المساحة المطلوبة = 22 م² | عدد الكراتين = 16 كرتونة (58 بلاطة)'
    },
    interpretation: 'تمنع توقف أعمال التشطيب بسبب نقص بلاط السيراميك واختلاف درجات ألوان الصبغة (Dye Lot).',
    assumptions: 'غرفة مستطيلة أو مقسمة إلى أشكال هندسية منتظمة.',
    limitations: 'التركيب المائل والزوايا غير المنتظمة تتطلب هالكاً يصل إلى 15%.',
    faqs: [
      { question: 'لماذا يجب الاحتفاظ بكرتونة إضافية بعد انتهاء التركيب؟', answer: 'لأنه يستحيل تطابق درجة لون البلاط (Dye Lot) تماماً عند الشراء مستقبلاً في حال حدوث كسر أو صيانة للسباكة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula metros cuadrados de suelo, número de cajas de azulejos/baldosas y piezas con margen de merma por cortes (10%-15%).`,
    howToUse: [
      'Ingrese largo y ancho de la estancia.',
      'Indique medidas del azulejo y m² por caja.',
      'Consulte los m² totales a comprar y las cajas necesarias.'
    ],
    formula: 'm² con Merma = (Largo × Ancho) × 1.10 | Cajas = ceil(m²_totales / m²_caja)',
    formulaVariables: [
      { name: 'Dimensiones', description: 'Largo y ancho en metros.', unit: 'Metros', optional: false }
    ],
    workedExample: {
      scenario: 'Estancia de 4m × 5m (20 m²), baldosas 60x60cm, cajas de 1.44 m², merma 10%.',
      stepByStep: [
        'Superficie con merma = 22 m² | Cajas = 22 / 1.44 = 15.28 -> 16 cajas.'
      ],
      result: 'Total m² = 22.0 m² | Cajas a Comprar = 16 Cajas'
    },
    interpretation: 'Evita problemas de stock y diferencias de tonalidad en alicatados.',
    assumptions: 'Colocación recta estándar.',
    limitations: 'Diseños en espiga requieren hasta un 15% de merma.',
    faqs: [
      { question: '¿Por qué añadir un 10% de merma?', answer: 'Para compensar los cortes perimetrales, esquinas y posibles roturas durante la colocación.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule la surface au sol, le nombre de carreaux de carrelage et de cartons nécessaires avec une marge de coupe de 10 % à 15 %.`,
    howToUse: [
      'Saisissez la longueur et la largeur de la pièce.',
      'Indiquez les dimensions des carreaux et la contenance d’un carton.',
      'Consultez la surface majorée et le nombre de cartons à commander.'
    ],
    formula: 'Surface avec Chutes = (Longueur × Largeur) × 1,10 | Cartons = Arrondi.Sup(Surface / m²_carton)',
    formulaVariables: [
      { name: 'Dimensions', description: 'Longueur et largeur.', unit: 'Mètres', optional: false }
    ],
    workedExample: {
      scenario: 'Pièce de 4m × 5m (20 m²), carrelage 60x60 cm, carton de 1,44 m², chutes 10 %.',
      stepByStep: [
        'Surface avec 10 % de chutes = 22 m² | Cartons = 22 / 1,44 = 15,28 -> 16 cartons.'
      ],
      result: 'Surface à Acheter = 22,0 m² | Cartons à Commander = 16 Cartons'
    },
    interpretation: 'Planification précise pour pose de carrelage, parquet ou faïence.',
    assumptions: 'Pose droite conventionnelle.',
    limitations: 'La pose en diagonale nécessite 15 % de marge.',
    faqs: [
      { question: 'Pourquoi garder des carreaux en réserve ?', answer: 'Les bains de cuisson des carrelages changent de teinte d’une production à l’autre.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet Bodenfläche, Fliesenbedarf in Stück und Paketen inklusive 10 % bis 15 % Verschnittzugabe für Fliesenlegerarbeiten.`,
    howToUse: [
      'Geben Sie Raumlänge und -breite ein.',
      'Tragen Sie Fliesengröße und m² pro Paket ein.',
      'Lesen Sie Gesamtfläche und Paketanzahl ab.'
    ],
    formula: 'Fläche mit Verschnitt = (Länge × Breite) × 1,10 | Pakete = ceil(Gesamtfläche / m²_Paket)',
    formulaVariables: [
      { name: 'Raummaße', description: 'Länge und Breite in Metern.', unit: 'Meter', optional: false }
    ],
    workedExample: {
      scenario: '4m × 5m Raum (20 m²), Fliesen 60x60 cm, 1,44 m²/Paket, 10 % Verschnitt.',
      stepByStep: [
        'Fläche inkl. Verschnitt = 22 m² | Pakete = 22 / 1,44 = 15,28 -> 16 Pakete.'
      ],
      result: 'Bedarfsfläche = 22,0 m² | Zu bestellende Pakete = 16 Pakete'
    },
    interpretation: 'Verhindert Materialengpässe und Farbtonabweichungen (Brandfarben).',
    assumptions: 'Standard-Kreuzverband.',
    limitations: 'Diagonale Verlegung oder Fischgrät erfordert 15 % Verschnitt.',
    faqs: [
      { question: 'Warum 10 % Verschnitt einplanen?', answer: 'Für Randschnitte, Sockelleisten und unvorhersehbaren Bruch beim Zuschneiden.' }
    ],
    relatedTools
  })
});

// 5. WALLPAPER ROLLS (wallpaper-rolls)
export const WALLPAPER_ROLLS_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates exact wallpaper roll requirements, pattern repeat match waste, total drops/strips, and deductions for doors and windows.`,
    howToUse: [
      'Enter room perimeter (or length and width) and ceiling height.',
      'Enter wallpaper roll dimensions (standard width: 20.5 in / 53 cm, standard length: 33 ft / 10 m).',
      'Enter pattern repeat drop in inches/cm (0 for plain/free match, e.g., 21 in / 53 cm for repeat patterns).',
      'Review total strips needed, usable strips per roll, and total rolls to order.'
    ],
    formula: 'Usable Cut Length = Wall Height + Pattern Repeat | Strips per Roll = floor(Roll Length / Cut Length) | Total Rolls = ceil(Total Strips / Strips per Roll)',
    formulaVariables: [
      { name: 'Room Perimeter', description: 'Total linear wall perimeter.', unit: 'Feet / Meters', optional: false },
      { name: 'Wall Height', description: 'Ceiling height.', unit: 'Feet / Meters', optional: false },
      { name: 'Pattern Repeat', description: 'Vertical repeat match distance.', unit: 'Inches / cm', optional: false }
    ],
    workedExample: {
      scenario: 'A room with 40 ft perimeter and 8 ft ceiling, using standard 20.5 in wide × 33 ft long rolls with a 12-inch pattern repeat.',
      stepByStep: [
        'Total Strips Required = (40 ft × 12 in/ft) / 20.5 in = 480 / 20.5 = 23.4 strips (Round up to 24 strips).',
        'Cut Length per Strip = 8 ft (96 in) + 12 in repeat = 108 in (9 ft).',
        'Strips per 33 ft Roll = floor(33 ft / 9 ft) = 3 strips per roll.',
        'Total Rolls to Order = ceil(24 strips / 3 strips/roll) = 8 rolls.'
      ],
      result: 'Total Strips = 24 | Strips per Roll = 3 | Rolls to Order = 8 Standard Rolls'
    },
    interpretation: 'Calculates wallpaper requirements accounting for unavoidable vertical pattern repeat alignment waste.',
    assumptions: 'Straight vertical drops with standard butt-joint seams.',
    limitations: 'Large half-drop pattern repeats increase cutting scrap.',
    faqs: [
      { question: 'What is pattern repeat in wallpaper?', answer: 'The vertical distance between identical decorative elements on the wallpaper that must be matched seamlessly side-by-side across adjacent strips.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب عدد لفات أو رولات ورق الحائط (ورق الجدران) المطلوبة، وعدد الأشرطة، وهالك تكرار النقشة (Pattern Repeat)، مع خصم الفتحات.`,
    howToUse: [
      'أدخل محيط الغرفة أو أبعادها وارتفاع السقف.',
      'أدخل أبعاد لفة ورق الجدران (المقاس القياسي: عرض 53 سم وطول 10 متر).',
      'أدخل مسافة تكرار النقشة بالسنتيمتر (0 للورق السادة، أو مثلاً 53 سم للنقشات المتكررة).',
      'اطلع على عدد الأشرطة المطلوبة وعدد الرولات الواجب شراؤها.'
    ],
    formula: 'طول الشريط بالنقشة = الارتفاع + مسافة تكرار النقشة | عدد الرولات = سقف(إجمالي الأشرطة ÷ الأشرطة لكل لفة)',
    formulaVariables: [
      { name: 'محيط الغرفة', description: 'إجمالي طول الجدران.', unit: 'متر', optional: false },
      { name: 'ارتفاع السقف', description: 'ارتفاع الجدار.', unit: 'متر', optional: false }
    ],
    workedExample: {
      scenario: 'غرفة محيطها 12 متراً بارتفاع 2.6 متر باستخدام رولات 0.53م × 10م بتكرار نقشة 30 سم.',
      stepByStep: [
        'عدد الأشرطة = 12 ÷ 0.53 = 23 شريطاً.',
        'طول القص لكل شريط = 2.6 + 0.3 = 2.9 متر.',
        'الأشرطة من اللفة الواحدة = أرضية(10 ÷ 2.9) = 3 أشرطة.',
        'الرولات المطلوبة = سقف(23 ÷ 3) = 8 رولات.'
      ],
      result: 'الأشرطة المطلوبة = 23 | الرولات الواجب شراؤها = 8 رولات'
    },
    interpretation: 'تضمن تطابق النقشات الديكورية وتفادي نقص الرولات أثناء التركيب.',
    assumptions: 'تركيب عمودي قياسي للورق.',
    limitations: 'النقشات المعقدة ذات الإزاحة النصفية تزيد من هالك القص.',
    faqs: [
      { question: 'ما هو تكرار النقشة (Pattern Repeat)؟', answer: 'هو المسافة الرأسية بين تكرار الرسومات الديكورية على الورق والتي يجب محاذاتها أفقياً بين كل شريطين متجاورين.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula los rollos de papel pintado necesarios, número de tiras y merma por rapport o repetición de dibujo.`,
    howToUse: [
      'Ingrese el perímetro de la estancia y la altura del techo.',
      'Indique medidas del rollo y el rapport o repetición del patrón en cm.',
      'Consulte las tiras totales y los rollos necesarios.'
    ],
    formula: 'Tiras por Rollo = floor(Largo Rollo / (Altura + Rapport)) | Rollos = ceil(Tiras Totales / Tiras Rollo)',
    formulaVariables: [
      { name: 'Perímetro', description: 'Suma de paredes.', unit: 'Metros', optional: false }
    ],
    workedExample: {
      scenario: 'Perímetro 12m, altura 2.6m, rollo 0.53×10m, rapport 30cm.',
      stepByStep: [
        'Tiras = 23 | Corte = 2.9m | Tiras/rollo = 3 | Rollos = 23/3 = 8 rollos.'
      ],
      result: 'Tiras = 23 | Rollos a Comprar = 8 Rollos'
    },
    interpretation: 'Asegura la continuidad del diseño mural sin faltas de material.',
    assumptions: 'Papel colocado a tope.',
    limitations: 'Rapport salteado genera mayor desperdicio de corte.',
    faqs: [
      { question: '¿Qué es el rapport en papel pintado?', answer: 'La distancia vertical de repetición del dibujo que obliga a cortar sobrante para casar las figuras.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule le nombre de rouleaux de papier peint, le nombre de lés et la perte liée au raccord de motif (rapport).`,
    howToUse: [
      'Indiquez le périmètre de la pièce et la hauteur sous plafond.',
      'Saisissez les dimensions du rouleau et la hauteur de raccord.',
      'Consultez le nombre de lés et de rouleaux à commander.'
    ],
    formula: 'Lés par Rouleau = floor(Longueur / (Hauteur + Raccord)) | Rouleaux = ceil(Total Lés / Lés par Rouleau)',
    formulaVariables: [
      { name: 'Périmètre', description: 'Longueur totale des murs.', unit: 'Mètres', optional: false }
    ],
    workedExample: {
      scenario: 'Périmètre 12m, hauteur 2,6m, rouleau 0,53×10m, raccord 30cm.',
      stepByStep: [
        'Total lés = 23 | Coupe = 2,9m | 3 lés/rouleau | Rouleaux = 8.'
      ],
      result: 'Total Lés = 23 | Rouleaux à Commander = 8 Rouleaux'
    },
    interpretation: 'Permet d’acheter la quantité exacte de rouleaux du même bain.',
    assumptions: 'Pose bord à bord classique.',
    limitations: 'Les raccords sautés augmentent la chute.',
    faqs: [
      { question: 'Qu’est-ce qu’un raccord sauté ?', answer: 'Un motif qui se décale d’un demi-rapport d’un lé sur l’autre.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die Anzahl benötigter Tapetenrollen, Bahnenanzahl und Verschnitt durch Musterversatz (Rapport).`,
    howToUse: [
      'Geben Sie Raumumfang und Deckenhöhe ein.',
      'Tragen Sie Rollenmaße und Rapportversatz in cm ein.',
      'Lesen Sie die Anzahl der Bahnen und Rollen ab.'
    ],
    formula: 'Bahnen pro Rolle = floor(Rollenlänge / (Höhe + Rapport)) | Rollen = ceil(Bahnen / Bahnen pro Rolle)',
    formulaVariables: [
      { name: 'Raumumfang', description: 'Wandumfang in Metern.', unit: 'Meter', optional: false }
    ],
    workedExample: {
      scenario: '12m Umfang, 2,6m Höhe, Eurorolle 0,53×10m, 30cm Rapport.',
      stepByStep: [
        'Bahnen = 23 | Zuschnitt = 2,9m | 3 Bahnen/Rolle | Rollen = 8.'
      ],
      result: 'Bahnen = 23 | Zu bestellende Rollen = 8 Rollen'
    },
    interpretation: 'Garantiert passgenaue Wandgestaltung ohne Tapetenmangel.',
    assumptions: 'Stoß-auf-Stoß Tapezierung.',
    limitations: 'Versetzter Ansatz erfordert mehr Rollen als ansatzfreie Tapete.',
    faqs: [
      { question: 'Was bedeutet Rapport bei Tapeten?', answer: 'Der Höhenabstand, nach dem sich das Tapetenmuster wiederholt und passgenau angesetzt werden muss.' }
    ],
    relatedTools
  })
});

// 6. MULCH & TOPSOIL (mulch-topsoil)
export const MULCH_TOPSOIL_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates garden landscape mulch, topsoil, and gravel volume in cubic yards, cubic meters, and individual 2 or 3 cubic-foot retail bags.`,
    howToUse: [
      'Enter garden bed surface area (length × width or square footage/meters).',
      'Select desired depth of mulch or soil layer (typically 2 to 4 inches / 5 to 10 cm).',
      'Review computed volume in cubic yards, cubic meters, and number of retail bags (2 cu ft / 3 cu ft bags).'
    ],
    formula: 'Cubic Yards = [Area (sq ft) × Depth (inches)] / 324 | Bags (2 cu ft) = (Cubic Yards × 27) / 2',
    formulaVariables: [
      { name: 'Bed Area', description: 'Total garden ground surface area.', unit: 'Sq Ft / m²', optional: false },
      { name: 'Mulch Depth', description: 'Thickness of ground cover layer.', unit: 'Inches / cm', optional: false }
    ],
    workedExample: {
      scenario: 'A landscaping garden bed measuring 30 ft by 10 ft (300 sq ft) mulched to a depth of 3 inches.',
      stepByStep: [
        'Cubic Feet Required = 300 sq ft × (3 / 12 ft) = 300 × 0.25 = 75 cubic feet.',
        'Convert to Cubic Yards = 75 / 27 = 2.778 cubic yards (Order 3 cubic yards for bulk delivery).',
        'If buying 2 cu ft Bags = ceil(75 / 2) = 38 bags.'
      ],
      result: 'Bulk Volume = 2.78 Cubic Yards | Retail Bags (2 cu ft) = 38 Bags | Total Weight (~1,000 lb/yd³) ≈ 2,780 lbs'
    },
    interpretation: 'Prevents weed germination, moderates soil temperature, and retains moisture when applied at optimal depth.',
    assumptions: 'Uniform settled depth across the garden bed surface.',
    limitations: 'Soil and compost compress by approximately 15% to 20% after watering and tamping.',
    faqs: [
      { question: 'What is the ideal depth for garden mulch?', answer: 'A 2 to 3 inch (5 to 7.5 cm) layer is optimal; mulch piled deeper than 4 inches can suffocate plant root oxygen exchange.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب حجم نشارة الخشب الزراعية (Mulch)، والتربة الزراعية (Topsoil)، والحصى بالمتر المكعب أو الياردة المكعبة وعدد الأكياس الجاهزة.`,
    howToUse: [
      'أدخل مساحة الحديقة أو حوض الزراعة (الطول × العرض).',
      'حدد سمك أو عمق طبقة النشارة أو التربة (السمك المثالي 5 إلى 8 سم / 2-3 بوصات).',
      'اطلع على الحجم الكلي بالمتر المكعب والياردة وعدد الأكياس المطلوبة.'
    ],
    formula: 'الحجم (م³) = المساحة (م²) × العمق (متر) | الأكياس = الحجم ÷ حجم الكيس',
    formulaVariables: [
      { name: 'مساحة الحوض', description: 'المساحة السطحية للحديقة.', unit: 'م²', optional: false },
      { name: 'عمق الطبقة', description: 'سماكة النشارة أو التربة.', unit: 'سم', optional: false }
    ],
    workedExample: {
      scenario: 'حوض زراعي مساحته 30 م² بعمق نشارة 7.5 سم (0.075 م).',
      stepByStep: [
        'الحجم = 30 × 0.075 = 2.25 متر مكعب.',
        'عدد أكياس 50 لتر (0.05 م³) = 2.25 ÷ 0.05 = 45 كيساً.'
      ],
      result: 'الحجم الكلي = 2.25 م³ | عدد الأكياس (50 لتر) = 45 كيساً'
    },
    interpretation: 'تحافظ النشارة على رطوبة التربة وتمنع نمو الحشائش الضارة وتنظم حرارة الجذور.',
    assumptions: 'توزيع متساوٍ على كامل مساحة الحوض.',
    limitations: 'تنكمش التربة والكمبوست بنسبة 15% بعد الري والاستقرار.',
    faqs: [
      { question: 'ما هو العمق المثالي للنشارة الزراعية؟', answer: 'بين 5 و 8 سم؛ زيادة العمق عن 10 سم تمنع وصول الأكسجين لجذور النباتات.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el volumen de mantillo (mulch), tierra vegetal y grava en metros cúbicos, yardas cúbicas y sacos comerciales.`,
    howToUse: [
      'Ingrese la superficie del jardín y el espesor deseado (ej. 5-8 cm).',
      'Consulte el volumen en m³ y los sacos a comprar.'
    ],
    formula: 'Volumen (m³) = Superficie (m²) × Espesor (m)',
    formulaVariables: [
      { name: 'Superficie', description: 'Área en m².', unit: 'm²', optional: false },
      { name: 'Espesor', description: 'Grosor en cm.', unit: 'cm', optional: false }
    ],
    workedExample: {
      scenario: 'Jardín de 30 m² con 7.5 cm de espesor de mantillo.',
      stepByStep: [
        'Volumen = 30 × 0.075 = 2.25 m³ | Sacos de 50L = 45 sacos.'
      ],
      result: 'Volumen = 2.25 m³ | Sacos (50 Litros) = 45 Sacos'
    },
    interpretation: 'Optimiza la compra a granel o en sacos para paisajismo.',
    assumptions: 'Capa uniforme.',
    limitations: 'La tierra se compacta un 15% tras el riego.',
    faqs: [
      { question: '¿Para qué sirve el mantillo o mulch?', answer: 'Retiene la humedad del suelo, evita malas hierbas y protege las raíces de heladas.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} détermine le volume de paillage (mulch), terreau ou gravier en mètres cubes et en sacs pour l'aménagement paysager.`,
    howToUse: [
      'Indiquez la surface du massif et l’épaisseur de paillage (ex. 7 cm).',
      'Consultez le volume en m³ et le nombre de sacs.'
    ],
    formula: 'Volume (m³) = Surface (m²) × Épaisseur (m)',
    formulaVariables: [
      { name: 'Surface', description: 'Aire en m².', unit: 'm²', optional: false },
      { name: 'Épaisseur', description: 'Hauteur en cm.', unit: 'cm', optional: false }
    ],
    workedExample: {
      scenario: 'Massif de 30 m² avec 7,5 cm de paillage.',
      stepByStep: [
        'Volume = 30 × 0,075 = 2,25 m³ | Sacs de 50 L = 45 sacs.'
      ],
      result: 'Volume = 2,25 m³ | Sacs (50 L) = 45 Sacs'
    },
    interpretation: 'Permet de doser le paillage pour préserver l’humidité et nourrir le sol.',
    assumptions: 'Épaisseur constante.',
    limitations: 'Prévoir un tassement de 10 à 15 % pour la terre végétale.',
    faqs: [
      { question: 'Quelle est la bonne épaisseur de paillage ?', answer: 'Entre 5 et 8 cm pour bloquer les adventices sans étouffer les racines.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet Rindenmulch-, Mutterboden- und Kiesvolumen in Kubikmetern (m³), Kubik-Yards und handelsüblichen Säcken.`,
    howToUse: [
      'Geben Sie die Beetfläche (m²) und die Schichthöhe in cm ein.',
      'Lesen Sie das Volumen in m³ und die benötigten Säcke ab.'
    ],
    formula: 'Volumen (m³) = Fläche (m²) × Dicke (m)',
    formulaVariables: [
      { name: 'Fläche', description: 'Gartenfläche in m².', unit: 'm²', optional: false },
      { name: 'Schichtdicke', description: 'Höhe in cm.', unit: 'cm', optional: false }
    ],
    workedExample: {
      scenario: '30 m² Beetfläche mit 7,5 cm Rindenmulch-Schicht.',
      stepByStep: [
        'Volumen = 30 × 0,075 = 2,25 m³ | 50-Liter-Säcke = 45 Säcke.'
      ],
      result: 'Volumen = 2,25 m³ | 50L-Säcke = 45 Säcke'
    },
    interpretation: 'Grundlage für Schüttgut-Bestellungen im Garten- und Landschaftsbau.',
    assumptions: 'Gleichmäßige Schüttung.',
    limitations: 'Boden sackt nach Wässerung um ca. 15 % ein.',
    faqs: [
      { question: 'Wie dick sollte Rindenmulch aufgetragen werden?', answer: 'Empfohlen sind 5 bis 8 cm zur effektiven Unkrautunterdrückung und Feuchtigkeitsspeicherung.' }
    ],
    relatedTools
  })
});

// 7. AIR CONDITIONER BTU (air-conditioner-btu)
export const AC_BTU_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} sizes residential air conditioning cooling capacity in British Thermal Units (BTU/hr) and kilowatts (kW) based on room square footage, sun exposure, occupancy, and kitchen heat loads.`,
    howToUse: [
      'Enter room length and width (or total square footage).',
      'Select sun exposure level (heavily shaded, standard, or heavily sunny: +10%).',
      'Enter number of regular room occupants (+600 BTU per person over 2 people).',
      'Select if room is a kitchen (+4,000 BTU kitchen heat load).',
      'Review recommended AC cooling capacity in BTUs, refrigeration tons, and electrical kW.'
    ],
    formula: 'Base BTU = Area (sq ft) × 20 + Sun Adj + Occupancy Adj + Kitchen Adj (4000 BTU)',
    formulaVariables: [
      { name: 'Room Area', description: 'Floor square footage.', unit: 'Sq Ft', optional: false },
      { name: 'Sun Exposure', description: 'Sunlight intensity modifier (-10% to +10%).', unit: 'Factor', optional: true },
      { name: 'Occupants', description: 'People regularly in the room.', unit: 'Count', optional: true }
    ],
    workedExample: {
      scenario: 'A 350 sq ft sunny living room with 4 occupants and standard 8 ft ceilings.',
      stepByStep: [
        'Base Capacity = 350 sq ft × 20 BTU/sq ft = 7,000 BTU/hr (Energy Star baseline = 8,000 BTU).',
        'Sunny Exposure Adjustment (+10%) = 8,000 × 1.10 = 8,800 BTU.',
        'Occupancy Adjustment (2 extra people × 600 BTU) = +1,200 BTU.',
        'Total Recommended AC Size = 8,800 + 1,200 = 10,000 BTU/hr (approx. 0.83 Tons / 2.93 kW).'
      ],
      result: 'Recommended AC Size = 10,000 BTU/hr | Cooling Tons = 0.83 Tons | Electrical Output = 2.93 kW'
    },
    interpretation: 'Proper sizing prevents short-cycling (oversized units leave high humidity) and continuous straining (undersized units fail to cool on hot days).',
    assumptions: 'Standard 8 ft (2.4 m) ceiling height with typical residential insulation.',
    limitations: 'Rooms with vaulted high ceilings (>10 ft) or poor double-pane window seals require Manual J HVAC load calculations.',
    faqs: [
      { question: 'Why is an oversized air conditioner bad?', answer: 'An oversized AC cools the room too quickly before running long enough to remove air moisture, resulting in a cold, clammy, humid room.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب سعة التكييف المطلوبة بوحدة التبريد البريطانية (BTU/hr) والطن التبريدي بناءً على مساحة الغرفة والتعرض للشمس وعدد الأشخاص وحرارة المطبخ.`,
    howToUse: [
      'أدخل مساحة الغرفة (الطول × العرض).',
      'حدد درجة التعرض لأشعة الشمس (مظللة، عادية، أو مشمسة جداً +10%).',
      'أدخل عدد الأشخاص المقيمين في الغرفة (+600 وحدة لكل شخص إضافي فوق 2).',
      'حدد ما إذا كانت الغرفة مطبخاً (+4000 BTU للحرارة).',
      'اطلع على السعة المناسبة بالـ BTU والطن التبريدي وقدرة الحصان الموصى بها.'
    ],
    formula: 'السعة = المساحة (م²) × 250 إلى 300 واط/م² + إضافات الشمس والأشخاص',
    formulaVariables: [
      { name: 'مساحة الغرفة', description: 'مساحة الأرضية بالمتر المربع.', unit: 'م²', optional: false }
    ],
    workedExample: {
      scenario: 'غرفة معيشة 25 م² معرضة للشمس وفيها 4 أشخاص.',
      stepByStep: [
        'السعة الأساسية = 25 × 300 = 7500 واط ≈ 10,000 BTU.',
        'إضافة الشمس والأشخاص = +2,000 BTU.',
        'الإجمالي = 12,000 BTU (مكيف 1 طن تبريد أو 1.5 حصان).'
      ],
      result: 'السعة الموصى بها = 12,000 BTU/hr (1.0 طن تبريد / مكيف 1.5 حصان)'
    },
    interpretation: 'اختيار السعة المناسبة يضمن كفاءة التبريد وسحب الرطوبة وتوفير استهلاك الكهرباء.',
    assumptions: 'ارتفاع سقف قياسي (2.7 إلى 3 أمتار) مع عزل حراري جيد.',
    limitations: 'الأسقف المرتفعة جداً أو الواجهات الزجاجية الضخمة تتطلب سعة تبريد إضافية.',
    faqs: [
      { question: 'لماذا لا يفضل شراء مكيف بحجم أكبر بكثير من المطلوب؟', answer: 'لأن المكيف الضخم يبرد الغرفة بسرعة ويفصل قبل سحب الرطوبة من الهواء مما يجعل الجو رطباً وغير مريح.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} dimensiona la potencia frigorífica necesaria para aire acondicionado en BTU/h, frigorías y kilovatios (kW) según superficie y exposición solar.`,
    howToUse: [
      'Ingrese los metros cuadrados o dimensiones de la habitación.',
      'Indique la orientación solar y ocupantes.',
      'Consulte las BTU/h y frigorías/hora recomendadas.'
    ],
    formula: 'Frigorías = Superficie (m²) × 100 a 140 frig/m² | BTU = Frigorías × 4',
    formulaVariables: [
      { name: 'Superficie', description: 'Metros cuadrados de la estancia.', unit: 'm²', optional: false }
    ],
    workedExample: {
      scenario: 'Habitación de 25 m² soleada con 4 personas.',
      stepByStep: [
        '25 m² × 120 frig/m² = 3.000 frigorías/h ≈ 12.000 BTU/h (1 tonelada refrigeración).'
      ],
      result: 'Potencia = 12.000 BTU/h (3.000 Frigorías/h / 3.5 kW)'
    },
    interpretation: 'Garantiza confort térmico y deshumidificación sin sobreconsumo.',
    assumptions: 'Aislamiento estándar y techos de 2.5m.',
    limitations: 'Áticos bajo tejado precisan un 20% adicional de potencia.',
    faqs: [
      { question: '¿Cuántas BTU son 3.000 frigorías?', answer: 'Aproximadamente 12.000 BTU/h (1 frigoría ≈ 3.97 BTU).' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} dimensionne la puissance de climatisation nécessaire en BTU/h et kW selon la superficie, l'ensoleillement et l'occupation.`,
    howToUse: [
      'Indiquez la surface de la pièce en m² et l’exposition.',
      'Renseignez le nombre de personnes et consultez la puissance en BTU et kW.'
    ],
    formula: 'Puissance (W) = Surface (m²) × 100 à 130 W/m² | BTU = Watts × 3,412',
    formulaVariables: [
      { name: 'Surface', description: 'Surface au sol en m².', unit: 'm²', optional: false }
    ],
    workedExample: {
      scenario: 'Pièce de 25 m² ensoleillée.',
      stepByStep: [
        'Puissance = 25 m² × 120 W/m² = 3 000 W = 3,0 kW ≈ 10 200 BTU/h.'
      ],
      result: 'Puissance Recommandée = 12 000 BTU/h (3,5 kW froid)'
    },
    interpretation: 'Assure un rafraîchissement rapide et une déshumidification efficace.',
    assumptions: 'Isolation thermique standard.',
    limitations: 'Les combles ou baies vitrées sud nécessitent un bilan thermique renforcé.',
    faqs: [
      { question: 'Pourquoi un climatiseur surdimensionné est-il néfaste ?', answer: 'Il régule par cycles trop courts sans assécher convenablement l’air ambiant.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die erforderliche Klimaanlagen-Kühlleistung in BTU/h und Kilowatt (kW) anhand von Raumgröße, Sonnenlage und Personenanzahl.`,
    howToUse: [
      'Geben Sie die Raumfläche (m²) und Sonneneinstrahlung an.',
      'Tragen Sie die Anzahl Personen ein und lesen Sie die Kühlleistung ab.'
    ],
    formula: 'Kühlleistung (Watt) = Raumfläche (m²) × 80 bis 120 W/m² | BTU = Watt × 3,412',
    formulaVariables: [
      { name: 'Raumfläche', description: 'Fläche in m².', unit: 'm²', optional: false }
    ],
    workedExample: {
      scenario: '25 m² Wohnraum mit starker Sonneneinstrahlung.',
      stepByStep: [
        '25 m² × 120 W/m² = 3.000 Watt = 3,0 kW (entspricht ca. 10.500 bis 12.000 BTU/h).'
      ],
      result: 'Empfohlene Kühlleistung = 12.000 BTU/h (3,5 kW)'
    },
    interpretation: 'Optimale Auslegung für angenehmes Raumklima und niedrige Stromkosten.',
    assumptions: 'Standard-Raumhöhe (2,5 m) und normale Dämmung.',
    limitations: 'Dachgeschosswohnungen erfordern ca. 20-30 % Mehrleistung.',
    faqs: [
      { question: 'Wie rechnet man Watt in BTU/h um?', answer: '1 kW Kühlleistung entspricht ca. 3.412 BTU/h.' }
    ],
    relatedTools
  })
});

// 8. SOLAR PANEL PAYBACK (solar-panel-payback)
export const SOLAR_PANEL_PAYBACK_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates solar photovoltaic (PV) system payback period, 25-year net savings, Return on Investment (ROI), levelized cost of solar electricity, and federal/state tax credit subsidies.`,
    howToUse: [
      'Enter total gross turnkey solar installation cost ($).',
      'Enter tax credits and rebates percentage (e.g., 30% US Federal ITC).',
      'Enter system size in kW (e.g., 8 kW) and average annual sun hours.',
      'Enter current electricity utility rate ($/kWh) and annual grid inflation rate (~3%).',
      'Review simple payback period in years, break-even year, and 25-year lifetime net financial savings.'
    ],
    formula: 'Net Cost = Gross Cost × (1 - ITC Tax Credit) | Annual Savings = System Size (kW) × Peak Sun Hours × 365 × Rate ($/kWh) | Payback = Net Cost / Annual Savings',
    formulaVariables: [
      { name: 'Gross System Cost', description: 'Total cost before incentives.', unit: 'Currency ($)', optional: false },
      { name: 'Solar Tax Credit', description: 'Government rebate / ITC incentive (~30%).', unit: '%', optional: false },
      { name: 'System Size', description: 'PV array capacity.', unit: 'kW', optional: false },
      { name: 'Electricity Rate', description: 'Utility cost per kilowatt-hour.', unit: '$/kWh', optional: false }
    ],
    workedExample: {
      scenario: 'An 8 kW solar PV system costing $22,000 gross with a 30% federal tax credit in an area with 1,400 kWh/kW/yr generation and $0.18/kWh electricity rate.',
      stepByStep: [
        'Net Upfront Cost = $22,000 × (1 - 0.30) = $15,400.',
        'Annual Solar Generation = 8 kW × 1,400 kWh/kW = 11,200 kWh/year.',
        'Year 1 Utility Bill Savings = 11,200 kWh × $0.18/kWh = $2,016/year.',
        'Simple Payback Period = $15,400 / $2,016 = 7.64 years.',
        '25-Year Cumulative Savings (with 3% utility inflation) ≈ $48,500.'
      ],
      result: 'Net Cost = $15,400 | Payback Period = 7.6 Years | 25-Year Net Profit = $48,500 | ROI = 315%'
    },
    interpretation: 'Solar PV transforms a recurring monthly utility liability into an appreciating clean-energy home asset.',
    assumptions: 'Assumes 0.5%/year standard photovoltaic module degradation and net metering grid interconnection.',
    limitations: 'Inverter replacement typically required around year 12-15 (~$1,500 - $2,500 expense).',
    faqs: [
      { question: 'What is the average solar payback period?', answer: 'In most developed solar markets with federal tax incentives, typical residential solar systems pay for themselves in 6 to 9 years.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب فترة استرداد تكلفة منظومة الطاقة الشمسية (Solar Payback Period)، وصافي التوفير على مدار 25 سنة، والعائد على الاستثمار (ROI).`,
    howToUse: [
      'أدخل التكلفة الإجمالية لتركيب الألواح والمحولات.',
      'أدخل نسبة الدعم أو الحوافز الحكومية إن وجدت.',
      'أدخل حجم المنظومة بالكيلوواط (kW) وإنتاجية الكهرباء السنوية.',
      'أدخل سعر الكيلوواط ساعة لشركة الكهرباء.',
      'اطلع على فترة الاسترداد بالسنوات وإجمالي الأرباح بعد 25 سنة.'
    ],
    formula: 'التكلفة الصافية = التكلفة الإجمالية - الدعم | فترة الاسترداد = التكلفة الصافية ÷ التوفير السنوي في الفاتورة',
    formulaVariables: [
      { name: 'تكلفة النظام', description: 'إجمالي مبلغ الشراء والتركيب.', unit: 'عملة', optional: false },
      { name: 'حجم النظام', description: 'قدرة الألواح بالكيلوواط.', unit: 'kW', optional: false },
      { name: 'تعرفة الكهرباء', description: 'سعر الكهرباء للوحدة.', unit: 'عملة/kWh', optional: false }
    ],
    workedExample: {
      scenario: 'منظومة 8 كيلوواط بتكلفة صافية 15,400 دولار توفر 2,016 دولار سنوياً من فاتورة الكهرباء.',
      stepByStep: [
        'فترة الاسترداد = 15,400 ÷ 2,016 = 7.64 سنوات.',
        'بعد السنة الثامنة تصبح الكهرباء المولدة مجانية بالكامل لأكثر من 17 سنة إضافية.'
      ],
      result: 'فترة الاسترداد = 7.6 سنوات | التوفير الصافي خلال 25 سنة = 48,500 دولار'
    },
    interpretation: 'تحول فاتورة الكهرباء الشهرية المستمرة إلى استثمار يولد طاقة نظيفة وأرباحاً طويلة الأجل.',
    assumptions: 'عمر افتراضي 25 سنة للألواح مع تراجع كفاءة طفيف 0.5% سنوياً.',
    limitations: 'قد يحتاج الإنفرتر (المحول) إلى استبدال بعد 12 إلى 15 سنة.',
    faqs: [
      { question: 'كم يبلغ العمر الافتراضي لألواح الطاقة الشمسية؟', answer: 'تضمن معظم الشركات المصنعة كفاءة الألواح لمدة 25 سنة بنسبة كفاءة لا تقل عن 80%.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el periodo de amortización de paneles solares fotovoltaicos, ahorro a 25 años y retorno de inversión (ROI).`,
    howToUse: [
      'Ingrese coste de instalación, subvenciones y potencia del sistema en kW.',
      'Indique el precio actual de la luz (€/kWh).',
      'Consulte los años de retorno y el ahorro total en 25 años.'
    ],
    formula: 'Amortización (Años) = Coste Neto / Ahorro Anual en Factura',
    formulaVariables: [
      { name: 'Coste Instalación', description: 'Precio total.', unit: 'Moneda', optional: false },
      { name: 'Potencia', description: 'Tamaño en kW.', unit: 'kW', optional: false }
    ],
    workedExample: {
      scenario: 'Sistema de 8 kW con coste neto de 15.400€ y ahorro de 2.016€/año.',
      stepByStep: [
        'Plazo de amortización = 15.400 / 2.016 = 7.64 años.'
      ],
      result: 'Periodo de Retorno = 7.6 Años | Ahorro a 25 Años = 48.500€'
    },
    interpretation: 'Rentabilidad asegurada a medio y largo plazo en energía limpia.',
    assumptions: 'Degradación del 0.5%/año en paneles.',
    limitations: 'Sustitución de inversor estimada a los 12-15 años.',
    faqs: [
      { question: '¿En cuántos años se amortiza una instalación solar?', answer: 'Entre 6 y 8 años de media en la mayoría de zonas con buena radiación solar.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule le temps de retour sur investissement (TRI) de panneaux solaires photovoltaïques et les gains nets sur 25 ans.`,
    howToUse: [
      'Indiquez le coût d’installation, les primes et la puissance (kWc).',
      'Renseignez le tarif du kWh électrique et consultez la rentabilité.'
    ],
    formula: 'Temps de Retour = Coût Net / Économies Annuelles',
    formulaVariables: [
      { name: 'Coût Net', description: 'Montant après aides.', unit: 'Devise', optional: false },
      { name: 'Puissance', description: 'Puissance en kWc.', unit: 'kWc', optional: false }
    ],
    workedExample: {
      scenario: 'Installation 8 kWc à 15 400 € économisant 2 016 €/an.',
      stepByStep: [
        'Retour sur investissement = 15 400 / 2 016 = 7,64 ans.'
      ],
      result: 'Temps de Retour = 7,6 Ans | Gain Net sur 25 Ans = 48 500 €'
    },
    interpretation: 'Permet de valoriser l’autoconsommation et la revente du surplus.',
    assumptions: 'Garantie de production 25 ans.',
    limitations: 'Remplacement de l’onduleur à mi-vie.',
    faqs: [
      { question: 'Quel est l’impact de l’inflation de l’électricité ?', answer: 'Chaque hausse du tarif réseau accélère le temps d’amortissement des panneaux solaires.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die Amortisationszeit (Payback) von Photovoltaik-Anlagen (PV), 25-Jahre-Nettoersparnis und die Rendite (ROI).`,
    howToUse: [
      'Geben Sie Anschaffungskosten, Förderung und PV-Leistung in kWp ein.',
      'Tragen Sie Strompreis (€/kWh) und Eigenverbrauchsquote ein.',
      'Lesen Sie die Amortisationsdauer in Jahren und den Gesamtgewinn ab.'
    ],
    formula: 'Amortisation (Jahre) = Netto-Investition / Jährliche Stromkostenersparnis',
    formulaVariables: [
      { name: 'Investitionskosten', description: 'Gesamtkosten netto.', unit: 'Währung', optional: false },
      { name: 'Anlagengröße', description: 'Leistung in kWp.', unit: 'kWp', optional: false }
    ],
    workedExample: {
      scenario: '8 kWp Anlage für 15.400 € netto mit 2.016 € jährlicher Ersparnis.',
      stepByStep: [
        'Amortisationsdauer = 15.400 / 2.016 = 7,64 Jahre.'
      ],
      result: 'Amortisationszeit = 7,6 Jahre | 25-Jahre-Reingewinn = 48.500 €'
    },
    interpretation: 'Macht unabhängiger von steigenden Netzstrompreisen und erzeugt sauberen Strom.',
    assumptions: '0,5 %/Jahr Leistungsdegradation der PV-Module.',
    limitations: 'Wechselrichtertausch nach 12-15 Jahren einplanen.',
    faqs: [
      { question: 'Wann hat sich eine PV-Anlage amortisiert?', answer: 'Im Durchschnitt nach etwa 7 bis 10 Jahren; danach produziert sie noch mindestens 15 Jahre fast kostenlosen Strom.' }
    ],
    relatedTools
  })
});

// 9. STAIR STRINGER (stair-stringer)
export const STAIR_STRINGER_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates building code-compliant staircase framing geometry: total rise, total run, individual step riser height, tread depth, stringer board length, and incline angle.`,
    howToUse: [
      'Enter total staircase vertical rise (floor-to-floor height in inches or cm).',
      'Enter target individual riser height (standard building code target is ~7.0 to 7.75 inches / 17-19 cm).',
      'Enter target tread depth (standard code minimum is 10.0 to 11.0 inches / 25-28 cm).',
      'Review exact number of risers, exact step riser height, total horizontal run, stringer length, and incline angle.'
    ],
    formula: 'Number of Risers = round(Total Rise / Target Rise) | Exact Riser = Total Rise / Number of Risers | Total Run = (Number of Risers - 1) × Tread Depth | Stringer = √(Total Rise² + Total Run²)',
    formulaVariables: [
      { name: 'Total Rise', description: 'Vertical height between finished lower and upper floors.', unit: 'Inches / cm', optional: false },
      { name: 'Tread Depth', description: 'Step walking surface depth.', unit: 'Inches / cm', optional: false }
    ],
    workedExample: {
      scenario: 'A total floor-to-floor vertical rise of 108 inches with standard 10.5 inch tread depth.',
      stepByStep: [
        'Number of Risers = round(108 / 7.5) = round(14.4) = 14 risers.',
        'Exact Individual Riser Height = 108 in / 14 = 7.714 inches (7 11/16 in).',
        'Number of Treads = 14 - 1 = 13 treads.',
        'Total Horizontal Run = 13 treads × 10.5 in = 136.5 inches (11 ft 4.5 in).',
        'Stringer Diagonal Length = √(108² + 136.5²) = √(11,664 + 18,632.25) = √30,296.25 ≈ 174.06 inches (14 ft 6 in 2x12 lumber board).'
      ],
      result: '14 Risers at 7.71" each | 13 Treads at 10.5" | Total Run = 136.5" | Stringer Length = 174.1" (Use 16 ft 2x12)'
    },
    interpretation: 'Conforms to International Residential Code (IRC) safety guidelines (Blondel’s rule: 2 × Rise + Tread ≈ 24-25 inches).',
    assumptions: 'Uniform rise and run for every step across the flight.',
    limitations: 'Top and bottom riser must account for finished floor and tread board thickness.',
    faqs: [
      { question: 'What is Blondel’s staircase rule?', answer: 'A safe, ergonomic walking stride requires that 2 × (Riser Height) + Tread Depth equals between 24 and 25 inches (60 to 64 cm).' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب أبعاد الدرج والسلالم المتوافقة مع كود البناء: الارتفاع الكلي (Rise)، الامتداد الأفقي (Run)، ارتفاع القائمة (الدرجة)، عمق النائمة، وطول فخذ الدرج وزاوية الميل.`,
    howToUse: [
      'أدخل الارتفاع الرأسي الكلي بين الطابقين (بالسنتيمتر أو البوصة).',
      'أدخل ارتفاع القائمة المستهدف (المعيار الهندسي 15 إلى 17.5 سم).',
      'أدخل عمق النائمة (المعيار الهندسي 28 إلى 30 سم).',
      'اطلع على عدد الدرجات، والارتفاع الدقيق لكل قائمة، والطول الكلي لفخذ الدرج الخشبي أو الخرساني.'
    ],
    formula: 'عدد القوائم = تقريب(الارتفاع الكلي ÷ الارتفاع المستهدف) | طول الفخذ = √(الارتفاع² + الامتداد²)',
    formulaVariables: [
      { name: 'الارتفاع الكلي', description: 'المسافة الرأسية بين التشطيبين.', unit: 'سم', optional: false },
      { name: 'عمق النائمة', description: 'عرض موضع القدم.', unit: 'سم', optional: false }
    ],
    workedExample: {
      scenario: 'ارتفاع كلي 270 سم مع عمق نائمة 28 سم.',
      stepByStep: [
        'عدد القوائم = 270 ÷ 17 = 16 قائمة.',
        'ارتفاع القائمة الدقيق = 270 ÷ 16 = 16.88 سم.',
        'عدد النوائم = 15 نائمة.',
        'الامتداد الأفقي = 15 × 28 = 420 سم.',
        'طول فخذ السلم = √(270² + 420²) = 499.3 سم (حوالي 5 أمتار).'
      ],
      result: '16 قائمة بارتفاع 16.9 سم | 15 نائمة بعمق 28 سم | طول الفخذ = 5.0 أمتار'
    },
    interpretation: 'تضمن راحة وسلامة الصعود وتوافق الدرج مع كود البناء وقاعدة بلونديل (2 ق + ن = 62-64 سم).',
    assumptions: 'تساوي جميع الدرجات في الارتفاع والعمق.',
    limitations: 'يجب خصم سمك خشب الدرج أو الرخام عند نقطة البداية والنهاية.',
    faqs: [
      { question: 'ما هي قاعدة بلونديل للسلالم المريحة؟', answer: '2 × ارتفاع القائمة + عمق النائمة = بين 62 و 64 سم لتوفير خطوة صعود طبيعية ومريحة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula las dimensiones de escaleras según normativa: número de peldaños, altura de contrahuella, huella, longitud de zanca y pendiente.`,
    howToUse: [
      'Ingrese la altura total suelo a suelo (cm o pulgadas).',
      'Indique la huella deseada (ej. 28 cm) y consulte el desglose completo.'
    ],
    formula: 'Contrahuella = Altura Total / Nº Peldaños | Ley de Blondel: 2CH + H = 62-64 cm',
    formulaVariables: [
      { name: 'Altura Total', description: 'Desnivel vertical.', unit: 'cm', optional: false },
      { name: 'Huella', description: 'Profundidad del escalón.', unit: 'cm', optional: false }
    ],
    workedExample: {
      scenario: 'Desnivel de 270 cm con huella de 28 cm.',
      stepByStep: [
        'Peldaños = 16 contrahuellas de 16.88 cm | Longitud de zanca = 4.99 m.'
      ],
      result: '16 Contrahuellas (16.9 cm) | 15 Huellas (28 cm) | Longitud Zanca = 5.0 m'
    },
    interpretation: 'Cumple la normativa técnica de edificación y ergonomía del paso.',
    assumptions: 'Peldaños uniformes en todo el tramo.',
    limitations: 'Ajustar grosor de revestimiento final en primer y último peldaño.',
    faqs: [
      { question: '¿Cuál es la altura ideal de una contrahuella?', answer: 'Entre 16 y 18 cm para escaleras residenciales cómodas.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule le limon et la géométrie d'un escalier : hauteur de marche, giron, reculement et pente selon la loi de Blondel.`,
    howToUse: [
      'Saisissez la hauteur à franchir d’étage à étage.',
      'Indiquez le giron souhaité (ex. 28 cm) et visualisez le tracé.'
    ],
    formula: 'Loi de Blondel : 2H + G = 60 à 64 cm | Longueur Limon = √(Hauteur² + Reculement²)',
    formulaVariables: [
      { name: 'Hauteur', description: 'Dénivelé total.', unit: 'cm', optional: false },
      { name: 'Giron', description: 'Profondeur de marche.', unit: 'cm', optional: false }
    ],
    workedExample: {
      scenario: 'Hauteur 270 cm, giron 28 cm.',
      stepByStep: [
        '16 marches | Hauteur unitaire = 16,88 cm | Reculement = 420 cm | Limon = 4,99 m.'
      ],
      result: '16 Hauteurs de 16,9 cm | 15 Girons de 28 cm | Limon = 5,0 m'
    },
    interpretation: 'Garantit un escalier confortable, sécurisé et conforme aux normes de construction.',
    assumptions: 'Hauteur et giron constants.',
    limitations: 'Penser à l’échappée de tête (hauteur sous plafond ≥ 2,00 m).',
    faqs: [
      { question: 'Qu’est-ce que le giron ?', answer: 'La distance horizontale mesurée d’un nez de marche au nez de marche suivant.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet Treppenwangen und Treppenmaße nach DIN 18065: Steigungshöhe, Auftritt, Lauflänge, Wangenlänge und Schrittmaßregel.`,
    howToUse: [
      'Geben Sie die Geschosshöhe (cm) ein.',
      'Tragen Sie den gewünschten Auftritt (z. B. 28 cm) ein und lesen Sie das Treppenmaß ab.'
    ],
    formula: 'Schrittmaßformel: 2s + a = 63 cm (60-65 cm) | Wangenlänge = √(Höhe² + Lauflänge²)',
    formulaVariables: [
      { name: 'Geschosshöhe', description: 'Gesamthöhe Boden zu Boden.', unit: 'cm', optional: false },
      { name: 'Auftritt', description: 'Trittstufentiefe.', unit: 'cm', optional: false }
    ],
    workedExample: {
      scenario: 'Geschosshöhe 270 cm mit 28 cm Auftritt.',
      stepByStep: [
        '16 Steigungen à 16,88 cm | 15 Auftritte à 28 cm | Wangenlänge = 4,99 m.'
      ],
      result: '16 Steigungen à 16,9 cm | 15 Auftritte à 28 cm | Wangenmaß = 5,0 m'
    },
    interpretation: 'Sichert normgerechte, ergonomische und sturzsichere Treppenkonstruktionen.',
    assumptions: 'Gleichmäßige Stufenmaße.',
    limitations: 'Mindest-Kopffreiheit von 2,00 m beachten.',
    faqs: [
      { question: 'Was besagt die Schrittmaßregel?', answer: '2 × Steigung + Auftritt = 63 cm (für einen natürlichen menschlichen Schritt).' }
    ],
    relatedTools
  })
});

// 10. ROOF PITCH & SLOPE (roof-pitch-slope)
export const ROOF_PITCH_SLOPE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates roof pitch ratio (rise over 12" run), slope angle in degrees, slope grade percentage (%), rafter length, and surface area multiplier.`,
    howToUse: [
      'Enter known pitch ratio (e.g., 6/12) OR enter vertical rise and horizontal run.',
      'Review slope angle in degrees, pitch percentage, rafter hypotenuse length, and roof area multiplier.'
    ],
    formula: 'Angle = arctan(Rise / Run) | Area Multiplier = √(1 + (Rise/Run)²) = 1 / cos(Angle)',
    formulaVariables: [
      { name: 'Roof Rise', description: 'Vertical roof elevation.', unit: 'Inches / cm', optional: false },
      { name: 'Roof Run', description: 'Horizontal roof span (typically 12 inches baseline).', unit: 'Inches / cm', optional: false }
    ],
    workedExample: {
      scenario: 'A common 6/12 pitch roof (6 inches of vertical rise per 12 inches of horizontal run).',
      stepByStep: [
        'Calculate Slope Ratio = 6 / 12 = 0.50 (50% slope grade).',
        'Pitch Angle = arctan(6 / 12) = arctan(0.50) ≈ 26.57 degrees.',
        'Roof Area Multiplier = √(1 + 0.50²) = √(1.25) ≈ 1.118 (Add 11.8% to flat footprint area for actual sloped roof decking).'
      ],
      result: 'Pitch = 6/12 | Slope Angle = 26.57° | Grade = 50.0% | Area Multiplier = 1.118'
    },
    interpretation: 'Determines roofing material compatibility (e.g., asphalt shingles require minimum 2:12 or 4:12 pitch) and accurate shingle bundle counts.',
    assumptions: 'Uniform planar roof facet slope.',
    limitations: 'Does not include eave and gable roof overhang dimensions unless entered into total span.',
    faqs: [
      { question: 'What is a 4:12 roof pitch?', answer: 'It means the roof rises 4 vertical inches for every 12 horizontal inches of run, representing a slope angle of approximately 18.4 degrees.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب ميل السقف (Roof Pitch)، وزاوية الانحدار بالدرجات، ونسبة الميل المئوية، وطول العوارض الخشبية (Rafters)، ومعامل مساحة السقف المائل.`,
    howToUse: [
      'أدخل نسبة الميل (مثلاً 6/12) أو أدخل الارتفاع والامتداد الأفقي.',
      'اطلع على زاوية الميل بالدرجات، وطول الضلع المائل، ومعامل ضرب المساحة لتحديد كميات القرميد أو الشينغل.'
    ],
    formula: 'الزاوية = arctan(الارتفاع ÷ الامتداد) | معامل المساحة = √(1 + (الارتفاع ÷ الامتداد)²)',
    formulaVariables: [
      { name: 'ارتفاع السقف', description: 'الارتفاع الرأسي.', unit: 'بوصة/سم', optional: false },
      { name: 'الامتداد الأفقي', description: 'المسافة الأفقية.', unit: 'بوصة/سم', optional: false }
    ],
    workedExample: {
      scenario: 'سقف بميل قياسي 6/12 (ارتفاع 6 بوصات لكل 12 بوصة أفقية).',
      stepByStep: [
        'نسبة الميل = 6 ÷ 12 = 0.50 (50%).',
        'زاوية الانحدار = arctan(0.50) = 26.57 درجة.',
        'معامل مساحة السقف = 1.118 (زيادة 11.8% عن مساحة المسقط الأفقي).'
      ],
      result: 'الميل = 6/12 | زاوية السقف = 26.57° | معامل المساحة = 1.118'
    },
    interpretation: 'يحدد نوع العزل والقرميد المناسب (مثل القرميد الإسفلتي الذي يتطلب حداً أدنى من الميل لتصريف المياه).',
    assumptions: 'أسطح مائلة مستوية.',
    limitations: 'يجب إضافة بروز السقف (Overhang) لحساب المساحة الإجمالية بدقة.',
    faqs: [
      { question: 'ما هو الحد الأدنى لميل السقف لتركيب القرميد؟', answer: 'يتطلب قرميد الشينغل حداً أدنى لميل السقف يعادل 2:12 إلى 4:12 لضمان تصريف مياه الأمطار دون تسريب.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la pendiente del tejado (pitch), ángulo en grados, porcentaje de inclinación, longitud de viga y multiplicador de superficie.`,
    howToUse: [
      'Ingrese la relación de pendiente (ej. 6/12) o elevación y avance.',
      'Consulte el ángulo en grados y el factor de superficie para tejas.'
    ],
    formula: 'Ángulo = arctan(Elevación / Avance) | Factor Superficie = √(1 + Pendiente²)',
    formulaVariables: [
      { name: 'Elevación', description: 'Altura vertical.', unit: 'cm / in', optional: false },
      { name: 'Avance', description: 'Tramo horizontal.', unit: 'cm / in', optional: false }
    ],
    workedExample: {
      scenario: 'Tejado con pendiente 6/12.',
      stepByStep: [
        'Pendiente = 50% | Ángulo = 26.57° | Multiplicador de área = 1.118.'
      ],
      result: 'Inclinación = 6/12 | Ángulo = 26.57° | Factor Área = 1.118'
    },
    interpretation: 'Determina el tipo de teja admisible y el material total de cubierta.',
    assumptions: 'Plano de cubierta regular.',
    limitations: 'Añadir voladizos perimetrales para compra final de material.',
    faqs: [
      { question: '¿Qué es una pendiente 4:12?', answer: 'Una elevación de 4 unidades por cada 12 de avance horizontal (aprox. 18.4 grados).' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule la pente de toiture en degrés et pourcentage, la longueur des chevrons et le coefficient multiplicateur de surface.`,
    howToUse: [
      'Indiquez la pente (ex. 6/12 ou hauteur et base).',
      'Consultez l’angle en degrés et le coefficient de surface pour tuiles.'
    ],
    formula: 'Angle = arctan(Hauteur / Base) | Coefficient = 1 / cos(Angle)',
    formulaVariables: [
      { name: 'Hauteur', description: 'Dénivelé vertical.', unit: 'cm / in', optional: false },
      { name: 'Base', description: 'Projection horizontale.', unit: 'cm / in', optional: false }
    ],
    workedExample: {
      scenario: 'Pente de toit 6/12 (50 %).',
      stepByStep: [
        'Angle = 26,57° | Coefficient multiplicateur = 1,118 (+11,8 % de surface).'
      ],
      result: 'Pente = 6/12 | Angle = 26,57° | Multiplicateur = 1,118'
    },
    interpretation: 'Indispensable pour le choix des tuiles, ardoises et le dimensionnement des chevrons.',
    assumptions: 'Pan de toiture plan.',
    limitations: 'Prévoir les débords de toit dans le calcul final.',
    faqs: [
      { question: 'Comment convertir un pourcentage de pente en degrés ?', answer: 'Degrés = arctan(Pente % / 100) × (180 / π).' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet Dachneigung in Grad und Prozent, Sparrenlänge und den Flächenmultiplikator für Dachdeckerarbeiten.`,
    howToUse: [
      'Geben Sie Dachsteigung oder Höhe und Grundmaß ein.',
      'Lesen Sie Dachneigungswinkel, Sparrenmaß und Flächenfaktor ab.'
    ],
    formula: 'Winkel = arctan(Höhe / Grundmaß) | Flächenfaktor = 1 / cos(Winkel)',
    formulaVariables: [
      { name: 'Dachhöhe', description: 'Vertikale Höhe.', unit: 'cm', optional: false },
      { name: 'Grundmaß', description: 'Horizontale Länge.', unit: 'cm', optional: false }
    ],
    workedExample: {
      scenario: 'Dach mit 6/12 Steigung (50 % Neigung).',
      stepByStep: [
        'Neigungswinkel = 26,57° | Dachflächenfaktor = 1,118.'
      ],
      result: 'Dachneigung = 26,57° | Steigung = 50,0 % | Faktor = 1,118'
    },
    interpretation: 'Entscheidend für Regeldachneigung von Ziegeln und Materialmengen.',
    assumptions: 'Ebene Dachfläche.',
    limitations: 'Dachüberstände müssen gesondert hinzugerechnet werden.',
    faqs: [
      { question: 'Was ist die Regeldachneigung?', answer: 'Die Mindestneigung, bei der ein Dachziegel ohne Zusatzmaßnahmen regensicher ist.' }
    ],
    relatedTools
  })
});

export const BATCH3_PRACTICAL_HANDLERS: Record<string, Record<Language, KnowledgeHandler>> = {
  'car-depreciation': CAR_DEPRECIATION_KNOWLEDGE,
  'ev-charging-time': EV_CHARGING_TIME_KNOWLEDGE,
  'paint-coverage': PAINT_COVERAGE_KNOWLEDGE,
  'flooring-tile': FLOORING_TILE_KNOWLEDGE,
  'wallpaper-rolls': WALLPAPER_ROLLS_KNOWLEDGE,
  'mulch-topsoil': MULCH_TOPSOIL_KNOWLEDGE,
  'air-conditioner-btu': AC_BTU_KNOWLEDGE,
  'solar-panel-payback': SOLAR_PANEL_PAYBACK_KNOWLEDGE,
  'stair-stringer': STAIR_STRINGER_KNOWLEDGE,
  'roof-pitch-slope': ROOF_PITCH_SLOPE_KNOWLEDGE,
};
