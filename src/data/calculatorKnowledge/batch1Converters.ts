import { ToolDef, Language } from '../../types';
import { ToolContentDetails } from './types';

type KnowledgeHandler = (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails;

function createKnowledge(dataByLang: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails>): Record<Language, KnowledgeHandler> {
  return dataByLang;
}

// 1. BINARY & HEXADECIMAL CONVERTER (binary-hex)
export const BINARY_HEX_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} converts decimal integers (base 10) into binary bit strings (base 2) and uppercase hexadecimal notation (base 16).`,
    howToUse: [
      'Enter a non-negative decimal integer.',
      'Review the converted binary equivalent (0s and 1s) and uppercase hexadecimal representation (0-9, A-F).'
    ],
    formula: 'Decimal -> Base 2 (Repeated division by 2) | Decimal -> Base 16 (Repeated division by 16)',
    formulaVariables: [
      { name: 'Decimal Integer', description: 'Base 10 whole number.', unit: 'Integer', optional: false }
    ],
    workedExample: {
      scenario: 'Converting decimal number 255.',
      stepByStep: [
        'Convert to binary: 255 = 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 11111111₂ (8 ones, a full byte).',
        'Convert to hexadecimal: 255 / 16 = 15 remainder 15 -> (15=F, 15=F) = FF₁₆.'
      ],
      result: 'Decimal 255 = Binary: 11111111 | Hexadecimal: FF'
    },
    interpretation: 'Fundamental in low-level embedded software, network subnetting, and digital microprocessor register debugging.',
    assumptions: 'Non-negative integers.',
    limitations: 'Converts positive integers; two\'s complement signed notation is not represented.',
    faqs: [
      { question: 'Why is hexadecimal so popular in computing?', answer: 'One hexadecimal digit represents exactly 4 binary bits (a nibble), allowing a full 8-bit byte to be written cleanly in just 2 characters (e.g., 0xFF).' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحويل الأرقام العشرية (الأساس 10) إلى سلاسل ثنائية (الأساس 2) ونظام العد الست عشري (الأساس 16).`,
    howToUse: [
      'أدخل عدداً صحيحاً بالنظام العشري.',
      'راجع القيمة المكافئة بالنظام الثنائي (أصفار وآحاد) وبالنظام الست عشري (من 0 إلى F).'
    ],
    formula: 'عشري -> ثنائي (قسمة متكررة على 2) | عشري -> ست عشري (قسمة متكررة على 16)',
    formulaVariables: [
      { name: 'العدد العشري', description: 'عدد صحيح بالنظام العشري.', unit: 'عدد صحيح', optional: false }
    ],
    workedExample: {
      scenario: 'تحويل الرقم العشري 255.',
      stepByStep: [
        'التحويل إلى ثنائي: 255 = 11111111 (بايت كامل من الآحاد).',
        'التحويل إلى ست عشري: 255 ÷ 16 = 15 والباقي 15 -> الرمز FF.'
      ],
      result: 'الرقم 255: ثنائي = 11111111 | ست عشري = FF'
    },
    interpretation: 'أداة حيوية لمهندسي البرمجيات والشبكات لمعاينة سجلات المعالجات وعناوين الذاكرة الرقمية.',
    assumptions: 'أعداد صحيحة غير سالبة.',
    limitations: 'مخصصة للأعداد الموجبة دون تمثيل الإشارة السلبية (المتمم الثنائي).',
    faqs: [
      { question: 'لماذا يفضل المبرمجون النظام الست عشري؟', answer: 'لأن كل خانة ست عشرية تختصر 4 خانات ثنائية بدقة، مما يسهل كتابة وقراءة البايت في حرفين فقط.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} convierte números enteros decimales (base 10) en secuencias binarias (base 2) y notación hexadecimal en mayúsculas (base 16).`,
    howToUse: [
      'Introduzca un número entero decimal.',
      'Consulte la representación binaria (ceros y unos) y hexadecimal (0-9, A-F).'
    ],
    formula: 'Decimal -> Base 2 | Decimal -> Base 16',
    formulaVariables: [
      { name: 'Entero Decimal', description: 'Número en base 10.', unit: 'Entero', optional: false }
    ],
    workedExample: {
      scenario: 'Conversión del número decimal 255.',
      stepByStep: [
        'Conversión a binario: 255 = 11111111₂ (1 byte completo).',
        'Conversión a hexadecimal: 255 = FF₁₆.'
      ],
      result: 'Decimal 255 = Binario: 11111111 | Hexadecimal: FF'
    },
    interpretation: 'Esencial en arquitectura de ordenadores, direccionamiento IP y programación de bajo nivel.',
    assumptions: 'Enteros no negativos.',
    limitations: 'No incluye notación con signo en complemento a dos.',
    faqs: [
      { question: '¿Por qué se usa el sistema hexadecimal?', answer: 'Permite condensar un byte de 8 bits en únicamente dos caracteres alfanuméricos.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} convertit les entiers décimaux (base 10) en binaire (base 2) et en notation hexadécimale (base 16).`,
    howToUse: [
      'Indiquez un entier décimal positif.',
      'Consultez sa valeur binaire et son code hexadécimal équivalent.'
    ],
    formula: 'Décimal -> Binaire | Décimal -> Hexadécimal',
    formulaVariables: [
      { name: 'Entier décimal', description: 'Nombre entier en base 10.', unit: 'Entier', optional: false }
    ],
    workedExample: {
      scenario: 'Conversion du nombre décimal 255.',
      stepByStep: [
        'Binaire : 255 = 11111111₂ (8 bits à 1).',
        'Hexadécimal : 255 = FF₁₆.'
      ],
      result: 'Décimal 255 = Binaire : 11111111 | Hexadécimal : FF'
    },
    interpretation: 'Indispensable pour l\'analyse de trames réseau et la programmation des microcontrôleurs.',
    assumptions: 'Entiers positifs ou nuls.',
    limitations: 'Ne prend pas en compte le complément à deux pour les nombres négatifs.',
    faqs: [
      { question: 'Combien de bits représente un chiffre hexadécimal ?', answer: 'Exactement 4 bits (soit un demi-octet ou quartet).' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} wandelt dezimale Ganzzahlen (Basis 10) in binäre Bitfolgen (Basis 2) und hexadezimale Schreibweise (Basis 16) um.`,
    howToUse: [
      'Geben Sie eine dezimale Ganzzahl ein.',
      'Lesen Sie den Binärcode und den Hexadezimalwert ab.'
    ],
    formula: 'Dezimal -> Binär | Dezimal -> Hexadezimal',
    formulaVariables: [
      { name: 'Dezimalzahl', description: 'Ganzzahl im Zehnersystem.', unit: 'Ganzzahl', optional: false }
    ],
    workedExample: {
      scenario: 'Umwandlung der Dezimalzahl 255.',
      stepByStep: [
        'Binärdarstellung: 255 = 11111111₂ (1 vollständiges Byte).',
        'Hexadezimaldarstellung: 255 = FF₁₆.'
      ],
      result: 'Dezimal 255 = Binär: 11111111 | Hexadezimal: FF'
    },
    interpretation: 'Grundlegend für hardwarenahe Entwicklung, Speicheradressierung und Netzwerktechnik.',
    assumptions: 'Nicht-negative ganze Zahlen.',
    limitations: 'Zeigt keine vorzeichenbehaftete Zweierkomplementdarstellung an.',
    faqs: [
      { question: 'Warum nutzt man Hexadezimalzahlen?', answer: 'Weil sich damit 8-Bit-Bytes übersichtlich mit genau zwei Ziffern darstellen lassen.' }
    ],
    relatedTools
  })
});

// 2. ROMAN NUMERAL CONVERTER (roman-numeral)
export const ROMAN_NUMERAL_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} converts standard Arabic integers into classical Roman numerals using subtractive notation conventions (M, D, C, L, X, V, I).`,
    howToUse: [
      'Enter an integer between 1 and 3999.',
      'Review the classical Roman numeral string representation.'
    ],
    formula: 'Greedy subtractive lookup: M (1000), CM (900), D (500), CD (400), C (100), XC (90), L (50), XL (40), X (10), IX (9), V (5), IV (4), I (1)',
    formulaVariables: [
      { name: 'Integer', description: 'Whole number (1 to 3999).', unit: '1-3999', optional: false }
    ],
    workedExample: {
      scenario: 'Converting the calendar year 2026.',
      stepByStep: [
        'Thousands: 2000 -> MM (1000 + 1000).',
        'Hundreds: 0 -> None.',
        'Tens: 20 -> XX (10 + 10).',
        'Units: 6 -> VI (5 + 1).'
      ],
      result: '2026 = MMXXVI'
    },
    interpretation: 'Used for clock dials, book preface numbering, monument inscriptions, and movie copyright year titles.',
    assumptions: 'Valid for numbers from 1 through 3999.',
    limitations: 'Classical Roman numerals do not include a symbol for zero or negative numbers.',
    faqs: [
      { question: 'Why is 4 written as IV instead of IIII?', answer: 'The subtractive principle places smaller numerals before larger ones to represent subtraction (5 - 1 = 4), saving space on inscriptions.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحويل الأرقام العربية القياسية إلى الأرقام الرومانية الكلاسيكية باستخدام قواعد الطرح والتجميع التقليدية.`,
    howToUse: [
      'أدخل عدداً صحيحاً من 1 إلى 3999.',
      'راجع النص المكتوب بالأرقام الرومانية (مثل MMXXVI).'
    ],
    formula: 'جدول الرموز: M=1000, CM=900, D=500, CD=400, C=100, XC=90, L=50, XL=40, X=10, IX=9, V=5, IV=4, I=1',
    formulaVariables: [
      { name: 'الرقم', description: 'عدد صحيح بين 1 و 3999.', unit: 'رقم', optional: false }
    ],
    workedExample: {
      scenario: 'تحويل السنة الميلادية 2026 إلى أرقام رومانية.',
      stepByStep: [
        'الآلاف: 2000 تعادل MM.',
        'العشرات: 20 تعادل XX.',
        'الآحاد: 6 تعادل VI.',
        'دمج السلسلة: MM + XX + VI.'
      ],
      result: '2026 = MMXXVI'
    },
    interpretation: 'تستخدم في ساعات الحائط الكلاسيكية، ومقدمات الكتب، والنقوش التذكارية التاريخية.',
    assumptions: 'أعداد صحيحة موجبة من 1 حتى 3999.',
    limitations: 'لا يحتوي النظام الروماني على رمز للصفر أو الأعداد السالبة.',
    faqs: [
      { question: 'لماذا يكتب الرقم 4 في صورة IV وليس IIII؟', answer: 'لتطبيق قاعدة الطرح الرومانية باختصار الرموز، حيث يعني وضع I قبل V طرح 1 من 5.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} convierte números enteros arábigos en numeración romana tradicional aplicando el principio sustractivo estándar.`,
    howToUse: [
      'Introduzca un número entero entre 1 y 3999.',
      'Consulte la cadena en números romanos resultante.'
    ],
    formula: 'Descomposición sustractiva en símbolos: M (1000), D (500), C (100), L (50), X (10), V (5), I (1)',
    formulaVariables: [
      { name: 'Entero', description: 'Número de 1 a 3999.', unit: 'Entero', optional: false }
    ],
    workedExample: {
      scenario: 'Conversión del año 2026.',
      stepByStep: [
        'Millares: 2000 = MM.',
        'Decenas: 20 = XX.',
        'Unidades: 6 = VI.',
        'Composición: MMXXVI.'
      ],
      result: '2026 = MMXXVI'
    },
    interpretation: 'Empleada en esferas de relojes, siglos históricos y dinastías monárquicas.',
    assumptions: 'Rango de 1 a 3999.',
    limitations: 'No existe el concepto de cero en la numeración romana.',
    faqs: [
      { question: '¿Cuál es el valor del símbolo M?', answer: 'El símbolo M representa el valor 1.000 (del latín mille).' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} convertit les nombres entiers arabes en chiffres romains selon la notation soustractive classique.`,
    howToUse: [
      'Indiquez un entier compris entre 1 et 3999.',
      'Consultez la transcription en chiffres romains.'
    ],
    formula: 'Règles de soustraction : M (1000), D (500), C (100), L (50), X (10), V (5), I (1)',
    formulaVariables: [
      { name: 'Entier', description: 'Nombre entre 1 et 3999.', unit: 'Entier', optional: false }
    ],
    workedExample: {
      scenario: 'Conversion de l\'année 2026.',
      stepByStep: [
        'Milliers : 2000 -> MM.',
        'Dizaines : 20 -> XX.',
        'Unités : 6 -> VI.'
      ],
      result: '2026 = MMXXVI'
    },
    interpretation: 'Utilisé pour la numérotation des siècles, cadrans d\'horloge et titres cinématographiques.',
    assumptions: 'Intervalle 1 à 3999.',
    limitations: 'Pas de représentation du zéro ni des nombres négatifs.',
    faqs: [
      { question: 'Pourquoi la numérotation romaine s\'arrête-t-elle souvent à 3999 ?', answer: 'Parce que 4000 nécessiterait d\'écrire MMMM, ce qui enfreint la règle des trois répétitions maximales sans surlignage vinculum.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} wandelt arabische Zahlen in klassische römische Ziffern nach den Regeln der Subtraktionsschreibweise um.`,
    howToUse: [
      'Geben Sie eine Zahl zwischen 1 und 3999 ein.',
      'Lesen Sie die römische Ziffernkombination ab.'
    ],
    formula: 'Symbolhierarchie: M (1000), D (500), C (100), L (50), X (10), V (5), I (1)',
    formulaVariables: [
      { name: 'Ganzzahl', description: 'Wert zwischen 1 und 3999.', unit: 'Zahl', optional: false }
    ],
    workedExample: {
      scenario: 'Umwandlung des Jahres 2026.',
      stepByStep: [
        'Tausender: 2000 -> MM.',
        'Zehner: 20 -> XX.',
        'Einer: 6 -> VI.'
      ],
      result: '2026 = MMXXVI'
    },
    interpretation: 'Gebräuchlich auf Zifferblättern, für Jahrestitel und Denkmäler.',
    assumptions: 'Wertebereich 1 bis 3999.',
    limitations: 'Das römische Zahlensystem kennt keine Null.',
    faqs: [
      { question: 'Wie schreibt man 900 in römischen Ziffern?', answer: '900 wird als CM geschrieben (100 vor 1000 abgezogen).' }
    ],
    relatedTools
  })
});

// 3. TEMPERATURE CONVERTER (temperature)
export const TEMPERATURE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} converts Celsius temperatures to Fahrenheit and absolute thermodynamic Kelvin scales simultaneously.`,
    howToUse: [
      'Enter temperature in degrees Celsius (°C).',
      'Review converted values in degrees Fahrenheit (°F) and Kelvin (K).'
    ],
    formula: 'Fahrenheit (°F) = (°C × 9/5) + 32 | Kelvin (K) = °C + 273.15',
    formulaVariables: [
      { name: 'Celsius (°C)', description: 'Temperature on metric Celsius scale.', unit: '°C', optional: false }
    ],
    workedExample: {
      scenario: 'Converting standard room temperature 25 °C.',
      stepByStep: [
        'Fahrenheit: (25 × 9) / 5 + 32 = 45 + 32 = 77.0 °F.',
        'Kelvin: 25 + 273.15 = 298.15 K.'
      ],
      result: '25.0 °C = 77.0 °F = 298.15 K'
    },
    interpretation: 'Ensures accurate translation between international culinary recipes, scientific laboratories, and meteorology.',
    assumptions: 'Standard atmospheric pressure.',
    limitations: 'Temperatures cannot fall below absolute zero (-273.15 °C / 0 K).',
    faqs: [
      { question: 'At what temperature are Celsius and Fahrenheit equal?', answer: 'At exactly -40°: -40 °C is equal to -40 °F.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحويل درجات الحرارة المئوية (سلزيوس) إلى مقياسي الفهرنهايت والكلفن الديناميكي الحراري المطلق.`,
    howToUse: [
      'أدخل درجة الحرارة بالدرجة المئوية (°C).',
      'راجع القيمة بالفهرنهايت (°F) وبالكلفن (K).'
    ],
    formula: 'فهرنهايت = (سلزيوس × 9/5) + 32 | كلفن = سلزيوس + 273.15',
    formulaVariables: [
      { name: 'سلزيوس (°C)', description: 'درجة الحرارة المئوية.', unit: '°C', optional: false }
    ],
    workedExample: {
      scenario: 'تحويل درجة حرارة الغرفة العادية 25 درجة مئوية.',
      stepByStep: [
        'فهرنهايت: (25 × 9 ÷ 5) + 32 = 45 + 32 = 77.0 فهرنهايت.',
        'كلفن: 25 + 273.15 = 298.15 كلفن.'
      ],
      result: '25.0 °C = 77.0 °F = 298.15 K'
    },
    interpretation: 'أداة لا غنى عنها في الأرصاد الجوية، والطبخ العالمي، والتجارب المعملية الفيزيائية.',
    assumptions: 'الضغط الجوي القياسي.',
    limitations: 'لا يمكن أن تنخفض درجات الحرارة عن الصفر المطلق (-273.15 درجة مئوية).',
    faqs: [
      { question: 'عند أي درجة تتساوى مقاييس سلزيوس وفهرنهايت؟', answer: 'تتساوى الدرجتان تماماً عند -40 درجة (-40 مئوية = -40 فهرنهايت).' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} convierte temperaturas de grados Celsius a grados Fahrenheit y a la escala Kelvin absoluta.`,
    howToUse: [
      'Introduzca la temperatura en grados Celsius (°C).',
      'Consulte la equivalencia en Fahrenheit (°F) y Kelvin (K).'
    ],
    formula: 'Fahrenheit = (°C × 9/5) + 32 | Kelvin = °C + 273,15',
    formulaVariables: [
      { name: 'Celsius (°C)', description: 'Temperatura métrica.', unit: '°C', optional: false }
    ],
    workedExample: {
      scenario: 'Conversión de la temperatura ambiente estándar de 25 °C.',
      stepByStep: [
        'Fahrenheit: (25 × 9) / 5 + 32 = 45 + 32 = 77,0 °F.',
        'Kelvin: 25 + 273,15 = 298,15 K.'
      ],
      result: '25,0 °C = 77,0 °F = 298,15 K'
    },
    interpretation: 'Permite conciliar especificaciones técnicas en meteorología, cocina y química aplicada.',
    assumptions: 'Presión atmosférica a nivel del mar.',
    limitations: 'Límite físico en el cero absoluto (-273,15 °C).',
    faqs: [
      { question: '¿Qué es el cero absoluto?', answer: 'La temperatura teórica en la que las partículas carecen de energía térmica y movimiento cinético (0 Kelvin).' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} convertit les températures Celsius en degrés Fahrenheit et en Kelvins thermodynamiques.`,
    howToUse: [
      'Indiquez la température en degrés Celsius (°C).',
      'Consultez les conversions en Fahrenheit (°F) et en Kelvin (K).'
    ],
    formula: 'Fahrenheit = (°C × 9/5) + 32 | Kelvin = °C + 273,15',
    formulaVariables: [
      { name: 'Celsius (°C)', description: 'Échelle thermométrique centigrade.', unit: '°C', optional: false }
    ],
    workedExample: {
      scenario: 'Température ambiante de 25 °C.',
      stepByStep: [
        'Fahrenheit : (25 × 9) / 5 + 32 = 77,0 °F.',
        'Kelvin : 25 + 273,15 = 298,15 K.'
      ],
      result: '25,0 °C = 77,0 °F = 298,15 K'
    },
    interpretation: 'Nécessaire pour adapter les recettes de cuisine internationales et les mesures en physique.',
    assumptions: 'Conditions normales de température et de pression.',
    limitations: 'Borne inférieure absolue à -273,15 °C.',
    faqs: [
      { question: 'Pourquoi n\'y a-t-il pas de degré devant le symbole Kelvin ?', answer: 'Le kelvin est une unité absolue et non une échelle relative graduée.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} rechnet Celsius-Temperaturen in Fahrenheit und die absolute Kelvin-Skala um.`,
    howToUse: [
      'Geben Sie die Temperatur in Grad Celsius (°C) ein.',
      'Lesen Sie die Werte in Fahrenheit (°F) und Kelvin (K) ab.'
    ],
    formula: 'Fahrenheit = (°C × 9/5) + 32 | Kelvin = °C + 273,15',
    formulaVariables: [
      { name: 'Celsius (°C)', description: 'Temperatur auf der Celsius-Skala.', unit: '°C', optional: false }
    ],
    workedExample: {
      scenario: 'Zimmertemperatur von 25 °C.',
      stepByStep: [
        'Fahrenheit: (25 × 9) / 5 + 32 = 77,0 °F.',
        'Kelvin: 25 + 273,15 = 298,15 K.'
      ],
      result: '25,0 °C = 77,0 °F = 298,15 K'
    },
    interpretation: 'Wichtig für internationale Wetterberichte, Backanleitungen und naturwissenschaftliche Berechnungen.',
    assumptions: 'Normaldruck.',
    limitations: 'Physikalischer Tiefstwert ist der absolute Nullpunkt (0 K / -273,15 °C).',
    faqs: [
      { question: 'Was ist der Gefrierpunkt von Wasser in Fahrenheit?', answer: 'Reines Wasser gefriert bei genau 32 °F (entspricht 0 °C).' }
    ],
    relatedTools
  })
});

// 4. SPEED, DISTANCE & TIME (speed-distance)
export const SPEED_DISTANCE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates average travel velocity in kilometers per hour (km/h) and miles per hour (mph) from total distance and travel duration.`,
    howToUse: [
      'Enter total trip distance in kilometers (km).',
      'Enter travel time duration in hours.',
      'Review your average velocity in km/h and mph.'
    ],
    formula: 'Speed (km/h) = Distance_km / Time_hours | Speed (mph) = Speed_kmh × 0.621371',
    formulaVariables: [
      { name: 'Distance', description: 'Route length traveled.', unit: 'Kilometers (km)', optional: false },
      { name: 'Time', description: 'Duration in decimal hours.', unit: 'Hours', optional: false }
    ],
    workedExample: {
      scenario: 'Driving 120 km in 1.5 hours (90 minutes).',
      stepByStep: [
        'Calculate km/h: 120 km / 1.5 h = 80.00 km/h.',
        'Convert to mph: 80.00 × 0.621371 = 49.71 mph.'
      ],
      result: 'Average Speed: 80.00 km/h (49.71 mph)'
    },
    interpretation: 'Calculates mean transit speeds for road trip planning, logistics fleet monitoring, and fuel efficiency analysis.',
    assumptions: 'Time duration must be greater than zero.',
    limitations: 'Calculates overall average velocity across the trip without detailing instantaneous traffic slowdowns.',
    faqs: [
      { question: 'How do you convert minutes to decimal hours?', answer: 'Divide the minutes by 60 (e.g., 90 minutes / 60 = 1.5 hours).' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب متوسط سرعة السفر بالكيلومتر في الساعة (كم/س) والميل في الساعة (ميل/س) بناءً على المسافة المقطوعة وزمن الرحلة.`,
    howToUse: [
      'أدخل مسافة الرحلة بالكيلومتر (كم).',
      'أدخل وقت السفر بالساعات.',
      'راجع متوسط السرعة بالكيلومتر/ساعة وبالميل/ساعة.'
    ],
    formula: 'السرعة (كم/س) = المسافة / الوقت | السرعة (ميل/س) = السرعة بالكيلومتر × 0.621371',
    formulaVariables: [
      { name: 'المسافة', description: 'طول مسار الرحلة.', unit: 'كيلومتر (كم)', optional: false },
      { name: 'الوقت', description: 'الزمن المستغرق بالساعات.', unit: 'ساعة', optional: false }
    ],
    workedExample: {
      scenario: 'قطع مسافة 120 كم بالسيارة في 1.5 ساعة (90 دقيقة).',
      stepByStep: [
        'حساب كم/ساعة: 120 ÷ 1.5 = 80.00 كم/ساعة.',
        'التحويل لميل/ساعة: 80 × 0.621371 = 49.71 ميل/ساعة.'
      ],
      result: 'متوسط السرعة: 80.00 كم/ساعة (49.71 ميل/ساعة)'
    },
    interpretation: 'مفيدة لتخطيط مواعيد الوصول في السفر الطويل ومراقبة كفاءة أساطيل الشحن البري.',
    assumptions: 'يجب أن يكون زمن السفر أكبر من صفر.',
    limitations: 'تعطي متوسط السرعة الإجمالي للرحلة دون عكس التوقفات المؤقتة وإشارات المرور.',
    faqs: [
      { question: 'كيف أحول الدقائق إلى ساعات عشرية؟', answer: 'اقسم عدد الدقائق على 60 (مثلاً 90 دقيقة ÷ 60 = 1.5 ساعة).' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la velocidad media del trayecto en kilómetros por hora (km/h) y millas por hora (mph) según la distancia y el tiempo.`,
    howToUse: [
      'Introduzca la distancia en kilómetros (km).',
      'Introduzca el tiempo de viaje en horas.',
      'Consulte la velocidad media en km/h y mph.'
    ],
    formula: 'Velocidad (km/h) = Distancia / Horas | mph = km/h × 0,621371',
    formulaVariables: [
      { name: 'Distancia', description: 'Longitud del trayecto.', unit: 'Kilómetros (km)', optional: false },
      { name: 'Tiempo', description: 'Horas transcurridas.', unit: 'Horas', optional: false }
    ],
    workedExample: {
      scenario: 'Recorrido de 120 km en 1,5 horas (90 minutos).',
      stepByStep: [
        'Cálculo km/h: 120 / 1,5 = 80,00 km/h.',
        'Conversión a mph: 80,00 × 0,621371 = 49,71 mph.'
      ],
      result: 'Velocidad media: 80,00 km/h (49,71 mph)'
    },
    interpretation: 'Planificación de itinerarios por carretera y estimación de tiempos de entrega en transporte.',
    assumptions: 'Tiempo superior a cero.',
    limitations: 'Promedio global; no desglosa aceleraciones o paradas puntuales.',
    faqs: [
      { question: '¿Cómo convertir 45 minutos a horas?', answer: '45 dividido entre 60 da 0,75 horas.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule la vitesse moyenne de déplacement en kilomètres par heure (km/h) et milles par heure (mph) à partir de la distance et de la durée.`,
    howToUse: [
      'Indiquez la distance parcourue en kilomètres (km).',
      'Indiquez le temps de trajet en heures décimales.',
      'Consultez la vitesse moyenne en km/h et en mph.'
    ],
    formula: 'Vitesse (km/h) = Distance / Heures | Vitesse (mph) = km/h × 0,621371',
    formulaVariables: [
      { name: 'Distance', description: 'Longueur de trajet.', unit: 'Kilomètres (km)', optional: false },
      { name: 'Durée', description: 'Temps en heures.', unit: 'Heures', optional: false }
    ],
    workedExample: {
      scenario: 'Trajet de 120 km bouclé en 1,5 heure (1h30).',
      stepByStep: [
        'Vitesse en km/h : 120 / 1,5 = 80,00 km/h.',
        'Conversion en mph : 80,00 × 0,621371 = 49,71 mph.'
      ],
      result: 'Vitesse moyenne : 80,00 km/h (49,71 mph)'
    },
    interpretation: 'Sert à estimer les heures d\'arrivée et optimiser les flux logistiques.',
    assumptions: 'Durée non nulle.',
    limitations: 'Vitesse moyenne globale.',
    faqs: [
      { question: 'Comment convertir 30 minutes en décimal ?', answer: '30 / 60 = 0,5 heure.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die durchschnittliche Reisegeschwindigkeit in km/h und mph aus Strecke und Fahrtdauer.`,
    howToUse: [
      'Geben Sie die zurückgelegte Strecke in Kilometern (km) ein.',
      'Geben Sie die Fahrzeit in Dezimalstunden ein.',
      'Lesen Sie die Durchschnittsgeschwindigkeit in km/h und mph ab.'
    ],
    formula: 'Geschwindigkeit (km/h) = Strecke / Stunden | mph = km/h × 0,621371',
    formulaVariables: [
      { name: 'Strecke', description: 'Distanz in Kilometern.', unit: 'Kilometer (km)', optional: false },
      { name: 'Fahrzeit', description: 'Dauer in Stunden.', unit: 'Stunden', optional: false }
    ],
    workedExample: {
      scenario: 'Eine Fahrt über 120 km in 1,5 Stunden (90 Minuten).',
      stepByStep: [
        'Berechnung km/h: 120 / 1,5 = 80,00 km/h.',
        'Umrechnung in mph: 80,00 × 0,621371 = 49,71 mph.'
      ],
      result: 'Durchschnittsgeschwindigkeit: 80,00 km/h (49,71 mph)'
    },
    interpretation: 'Grundlage für Reisezeitplanung, Flottenmanagement und Kraftstoffverbrauchsanalysen.',
    assumptions: 'Fahrzeit größer als null.',
    limitations: 'Gibt die Durchschnittsgeschwindigkeit ohne Berücksichtigung von Ampeln oder Pausen an.',
    faqs: [
      { question: 'Wie rechne ich Minuten in Stunden um?', answer: 'Teilen Sie die Minutenzahl durch 60 (z. B. 45 min / 60 = 0,75 h).' }
    ],
    relatedTools
  })
});

// 5. DATA STORAGE SIZE CONVERTER (data-size)
export const DATA_SIZE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} converts digital data storage capacity from Gigabytes (GB) into Megabytes (MB), Kilobytes (KB), and Terabytes (TB) using standard binary 1024 prefixes.`,
    howToUse: [
      'Enter data storage size in Gigabytes (GB).',
      'Review converted capacities in Megabytes (MB), Kilobytes (KB), and Terabytes (TB).'
    ],
    formula: 'MB = GB × 1024 | KB = MB × 1024 | TB = GB / 1024',
    formulaVariables: [
      { name: 'Gigabytes (GB)', description: 'Storage capacity in binary gigabytes (GiB).', unit: 'GB', optional: false }
    ],
    workedExample: {
      scenario: 'Converting a 16 GB flash storage drive.',
      stepByStep: [
        'Megabytes: 16 × 1024 = 16,384 MB.',
        'Kilobytes: 16,384 × 1024 = 16,777,216 KB.',
        'Terabytes: 16 / 1024 = 0.015625 TB.'
      ],
      result: '16 GB = 16,384 MB = 16,777,216 KB = 0.0156 TB'
    },
    interpretation: 'Used by software engineers, system administrators, and cloud architects to calculate database storage, RAM allocations, and backup quotas.',
    assumptions: 'Uses the standard computing binary multiplier 1024 (2¹⁰).',
    limitations: 'Hard drive manufacturers often market decimal units (1 GB = 1,000 MB), which yields slightly different advertised numbers.',
    faqs: [
      { question: 'Why is 1 GB equal to 1024 MB instead of 1000 MB?', answer: 'Computers operate in binary (base 2), where 2¹⁰ = 1024 is the natural power of two closest to 1,000.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحويل سعات التخزين الرقمية من الجيجابايت (GB) إلى الميجابايت والكيلوبايت والتيرابايت باستخدام الأساس الثنائي 1024.`,
    howToUse: [
      'أدخل حجم البيانات بالجيجابايت (GB).',
      'راجع السعات المحولة بالميجابايت والكيلوبايت والتيرابايت.'
    ],
    formula: 'ميجابايت = جيجابايت × 1024 | كيلوبايت = ميجابايت × 1024 | تيرابايت = جيجابايت / 1024',
    formulaVariables: [
      { name: 'جيجابايت (GB)', description: 'سعة التخزين الرقمية.', unit: 'جيجابايت', optional: false }
    ],
    workedExample: {
      scenario: 'تحويل سعة ذاكرة فلاش 16 جيجابايت.',
      stepByStep: [
        'ميجابايت: 16 × 1024 = 16,384 ميجابايت.',
        'كيلوبايت: 16,384 × 1024 = 16,777,216 كيلوبايت.',
        'تيرابايت: 16 ÷ 1024 = 0.0156 تيرابايت.'
      ],
      result: '16 جيجابايت = 16,384 ميجابايت = 0.0156 تيرابايت'
    },
    interpretation: 'ضرورية لمهندسي البرمجيات ومديري قواعد البيانات لحساب سعات الخوادم واستهلاك السحب الإلكترونية.',
    assumptions: 'تعتمد المضاعف الثنائي الحاسوبي القياسي 1024 (2¹⁰).',
    limitations: 'تستخدم بعض شركات الأقراص الصلبة النظام العشري التجاري (1000) مما يسبب فرقاً طفيفاً في السعة المعلنة.',
    faqs: [
      { question: 'لماذا يساوي الجيجابايت 1024 ميجابايت وليس 1000؟', answer: 'لأن معمارية الحواسيب مبنية على النظام الثنائي (2 أس 10 = 1024).' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} convierte capacidades de almacenamiento digital desde Gigabytes (GB) a Megabytes (MB), Kilobytes (KB) y Terabytes (TB) con factor binario 1024.`,
    howToUse: [
      'Introduzca el tamaño en Gigabytes (GB).',
      'Consulte la equivalencia en MB, KB y TB.'
    ],
    formula: 'MB = GB × 1024 | KB = MB × 1024 | TB = GB / 1024',
    formulaVariables: [
      { name: 'Gigabytes (GB)', description: 'Almacenamiento binario.', unit: 'GB', optional: false }
    ],
    workedExample: {
      scenario: 'Conversión de una memoria de 16 GB.',
      stepByStep: [
        'Megabytes: 16 × 1024 = 16.384 MB.',
        'Kilobytes: 16.384 × 1024 = 16.777.216 KB.',
        'Terabytes: 16 / 1024 = 0,0156 TB.'
      ],
      result: '16 GB = 16.384 MB = 16.777.216 KB = 0,0156 TB'
    },
    interpretation: 'Vital para administradores de sistemas y configuración de servidores en la nube.',
    assumptions: 'Múltiplos binarios basados en potencias de dos (2¹⁰ = 1024).',
    limitations: 'Los fabricantes comerciales a veces usan base decimal 1000.',
    faqs: [
      { question: '¿Qué diferencia hay entre GB y GiB?', answer: 'GiB usa estrictamente base 1024 (binario), mientras que GB a menudo se etiqueta en base decimal 1000 en marketing comercial.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} convertit la taille de stockage informatique de Gigaoctets (Go/GB) en Mégaoctets (Mo), Kilooctets (Ko) et Téraoctets (To) en base binaire 1024.`,
    howToUse: [
      'Indiquez la capacité en Gigaoctets (GB).',
      'Consultez les équivalences en MB, KB et TB.'
    ],
    formula: 'Mo = Go × 1024 | Ko = Mo × 1024 | To = Go / 1024',
    formulaVariables: [
      { name: 'Gigaoctets (GB)', description: 'Capacité de stockage.', unit: 'GB', optional: false }
    ],
    workedExample: {
      scenario: 'Clé USB de 16 GB.',
      stepByStep: [
        'Mégaoctets : 16 × 1024 = 16 384 MB.',
        'Kilooctets : 16 384 × 1024 = 16 777 216 KB.',
        'Téraoctets : 16 / 1024 = 0,0156 TB.'
      ],
      result: '16 GB = 16 384 MB = 16 777 216 KB = 0,0156 TB'
    },
    interpretation: 'Permet d\'évaluer la place mémoire nécessaire pour des sauvegardes ou des bases de données.',
    assumptions: 'Facteur de conversion binaire 1024.',
    limitations: 'Diffère des capacités commerciales en base décimale 1000.',
    faqs: [
      { question: 'Pourquoi un disque dur de 500 Go affiche-t-il moins d\'espace dans l\'ordinateur ?', answer: 'Le fabricant compte 1 Go = 1 000 Mo, tandis que le système d\'exploitation calcule en base 1024.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} wandelt digitale Speicherkapazitäten von Gigabyte (GB) in Megabyte (MB), Kilobyte (KB) und Terabyte (TB) nach dem Binärstandard 1024 um.`,
    howToUse: [
      'Geben Sie die Speichergröße in Gigabyte (GB) ein.',
      'Lesen Sie die Werte in MB, KB und TB ab.'
    ],
    formula: 'MB = GB × 1024 | KB = MB × 1024 | TB = GB / 1024',
    formulaVariables: [
      { name: 'Gigabyte (GB)', description: 'Speichergröße in GB.', unit: 'GB', optional: false }
    ],
    workedExample: {
      scenario: 'Speicherkarte mit 16 GB.',
      stepByStep: [
        'Megabyte: 16 × 1024 = 16.384 MB.',
        'Kilobyte: 16.384 × 1024 = 16.777.216 KB.',
        'Terabyte: 16 / 1024 = 0,0156 TB.'
      ],
      result: '16 GB = 16.384 MB = 16.777.216 KB = 0,0156 TB'
    },
    interpretation: 'Grundlegend für Systemadministratoren bei der Partitionierung von Festplatten und Cloud-Speicher.',
    assumptions: 'Binärer Umrechnungsfaktor 1024 (2¹⁰).',
    limitations: 'Herstellerangaben auf Verpackungen nutzen oft dezimale Faktoren (1000).',
    faqs: [
      { question: 'Wie viele Bytes hat ein Kilobyte?', answer: 'Im Binärsystem hat ein Kilobyte (KiB) exakt 1.024 Bytes.' }
    ],
    relatedTools
  })
});

// 6. HEX COLOR TO RGB CONVERTER (color-hex-rgb)
export const COLOR_HEX_RGB_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} converts 6-character hexadecimal web color codes into decimal Red, Green, and Blue (RGB) color channel intensity values (0 to 255).`,
    howToUse: [
      'Enter a 6-character hexadecimal color code (with or without leading #).',
      'Review the parsed Red (R), Green (G), and Blue (B) decimal values and composite CSS rgb() string.'
    ],
    formula: 'R = Hex[1:2] -> Dec | G = Hex[3:4] -> Dec | B = Hex[5:6] -> Dec',
    formulaVariables: [
      { name: 'Hex Color', description: '6-digit hexadecimal color string (e.g., #10B981).', unit: 'Hex string', optional: false }
    ],
    workedExample: {
      scenario: 'Converting emerald web brand color #10B981.',
      stepByStep: [
        'Red channel: "10" in base 16 = (1 × 16) + 0 = 16.',
        'Green channel: "B9" in base 16 = (11 × 16) + 9 = 176 + 9 = 185.',
        'Blue channel: "81" in base 16 = (8 × 16) + 1 = 128 + 1 = 129.'
      ],
      result: '#10B981 = rgb(16, 185, 129)'
    },
    interpretation: 'Enables seamless translation between CSS color formats for digital graphic artists, UI designers, and frontend web developers.',
    assumptions: 'Standard 24-bit sRGB color space.',
    limitations: 'Does not compute alpha transparency channels (RGBA).',
    faqs: [
      { question: 'What does #FFFFFF represent?', answer: 'Full intensity across all three channels: rgb(255, 255, 255), representing pure white in additive color models.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحويل أكواد الألوان الست عشرية (Hex) إلى قيم قنوات الألوان الأساسية العشرية (أحمر، أخضر، أزرق / RGB) من 0 إلى 255.`,
    howToUse: [
      'أدخل كود اللون المكون من 6 خانات (مع علامة # أو بدونها).',
      'راجع قيم القنوات الثلاث (الأحمر، الأخضر، الأزرق) وصيغة CSS rgb() الجاهزة.'
    ],
    formula: 'الأحمر = تحويل أول خانتين | الأخضر = تحويل الخانتين التاليتين | الأزرق = تحويل آخر خانتين',
    formulaVariables: [
      { name: 'كود اللون (Hex)', description: 'رمز ست عشري مكون من 6 خانات (مثل #10B981).', unit: 'رمز ست عشري', optional: false }
    ],
    workedExample: {
      scenario: 'تحويل لون الزمرد الأخضر #10B981.',
      stepByStep: [
        'قناة الأحمر "10": تعادل 16 بالعشري.',
        'قناة الأخضر "B9": (11 × 16) + 9 = 185 بالعشري.',
        'قناة الأزرق "81": (8 × 16) + 1 = 129 بالعشري.'
      ],
      result: '#10B981 = rgb(16, 185, 129)'
    },
    interpretation: 'تساعد مصممي ومطوري واجهات الويب في مطابقة ألوان التصاميم مع تنسيقات أوراق الأنماط CSS.',
    assumptions: 'نظام ألوان sRGB ذو 24 بت.',
    limitations: 'لا تحسب قناة الشفافية ألفا (Alpha).',
    faqs: [
      { question: 'إلى ماذا يشير الكود #000000؟', answer: 'يمثل غياب الضوء تماماً في القنوات الثلاث، أي اللون الأسود الخالص rgb(0, 0, 0).' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} traduce códigos de color hexadecimales web en valores decimales para los canales Rojo, Verde y Azul (RGB de 0 a 255).`,
    howToUse: [
      'Introduzca el código hexadecimal de 6 dígitos (ej. #10B981).',
      'Consulte los canales R, G, B desglosados y la regla CSS rgb().'
    ],
    formula: 'R = Hex[1:2] | G = Hex[3:4] | B = Hex[5:6]',
    formulaVariables: [
      { name: 'Color Hex', description: 'Código alfanumérico de color.', unit: 'Hex', optional: false }
    ],
    workedExample: {
      scenario: 'Conversión del color esmeralda #10B981.',
      stepByStep: [
        'Canal Rojo ("10"): (1 × 16) + 0 = 16.',
        'Canal Verde ("B9"): (11 × 16) + 9 = 185.',
        'Canal Azul ("81"): (8 × 16) + 1 = 129.'
      ],
      result: '#10B981 = rgb(16, 185, 129)'
    },
    interpretation: 'Imprescindible para diseño de interfaces de usuario (UI/UX) y desarrollo web CSS.',
    assumptions: 'Espacio de color sRGB.',
    limitations: 'No incluye canal alfa de opacidad.',
    faqs: [
      { question: '¿Por qué las letras van de la A a la F en hexadecimal?', answer: 'Porque en base 16, después del 9 se usan las letras A (10), B (11), C (12), D (13), E (14) y F (15).' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} convertit les codes couleurs hexadécimaux du web en valeurs décimales RVB (Rouge, Vert, Bleu de 0 à 255).`,
    howToUse: [
      'Indiquez le code couleur hexadécimal à 6 caractères.',
      'Consultez les composantes Rouge, Vert, Bleu et la chaîne CSS rgb().'
    ],
    formula: 'R = Hex[1:2] -> Décimal | V = Hex[3:4] -> Décimal | B = Hex[5:6] -> Décimal',
    formulaVariables: [
      { name: 'Code Hex', description: 'Chaîne hexadécimale à 6 caractères.', unit: 'Hex', optional: false }
    ],
    workedExample: {
      scenario: 'Couleur vert émeraude #10B981.',
      stepByStep: [
        'Rouge ("10") : 16.',
        'Vert ("B9") : (11 × 16) + 9 = 185.',
        'Bleu ("81") : (8 × 16) + 1 = 129.'
      ],
      result: '#10B981 = rgb(16, 185, 129)'
    },
    interpretation: 'Facilite l\'intégration graphique des maquettes Figma ou Photoshop vers les feuilles de style CSS.',
    assumptions: 'Espace colorimétrique sRGB 24 bits.',
    limitations: 'Ne gère pas la transparence alpha.',
    faqs: [
      { question: 'Que signifie le code #000000 ?', answer: 'Le noir pur, absence totale d\'intensité lumineuse sur les trois canaux.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} wandelt sechsstellige hexadezimale Web-Farbcodes in dezimale RGB-Farbkanalwerte (Rot, Grün, Blau von 0 bis 255) um.`,
    howToUse: [
      'Geben Sie den Hex-Code mit oder ohne Raute (#) ein.',
      'Lesen Sie die Rot-, Grün- und Blau-Werte sowie die CSS-rgb()-Regel ab.'
    ],
    formula: 'R = Hex[1:2] | G = Hex[3:4] | B = Hex[5:6]',
    formulaVariables: [
      { name: 'Hex-Farbcode', description: 'Sechsstelliger hexadezimaler Farbwert.', unit: 'Hex', optional: false }
    ],
    workedExample: {
      scenario: 'Umwandlung der Farbe Smaragdgrün #10B981.',
      stepByStep: [
        'Rot-Kanal ("10"): 16.',
        'Grün-Kanal ("B9"): (11 × 16) + 9 = 185.',
        'Blau-Kanal ("81"): (8 × 16) + 1 = 129.'
      ],
      result: '#10B981 = rgb(16, 185, 129)'
    },
    interpretation: 'Erleichtert Webdesignern und Frontend-Entwicklern die präzise Farbabstimmung in CSS.',
    assumptions: 'Standard-sRGB-Farbraum.',
    limitations: 'Transparenzwerte (Alpha) werden nicht berücksichtigt.',
    faqs: [
      { question: 'Was bedeutet #FFFFFF?', answer: 'Reines Weiß mit voller Intensität auf allen drei Farbkanälen: rgb(255, 255, 255).' }
    ],
    relatedTools
  })
});

// 7. PIXELS TO REM CONVERTER (px-rem)
export const PX_REM_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} converts fixed pixel values (px) to scalable root-relative rem units based on root typography font sizing.`,
    howToUse: [
      'Enter target size in pixels (px).',
      'Enter root font size in pixels (default web standard is 16px).',
      'Review converted scalable value in rem units.'
    ],
    formula: 'rem = Target_Pixels / Root_Base_Pixels',
    formulaVariables: [
      { name: 'Target Pixels (px)', description: 'Size value to convert.', unit: 'px', optional: false },
      { name: 'Base Root Pixels', description: 'Root HTML document font-size (default: 16px).', unit: 'px', optional: false }
    ],
    workedExample: {
      scenario: 'Converting 24px padding with a standard 16px root font size.',
      stepByStep: [
        'Target pixels: 24 px.',
        'Base root size: 16 px.',
        'Calculation: 24 / 16 = 1.5 rem.'
      ],
      result: '24 px = 1.5 rem (Based on 16px root)'
    },
    interpretation: 'Ensures fluid web accessibility by allowing text and spacing to scale dynamically when users adjust browser zoom or system font size preferences.',
    assumptions: 'Assumes standard browser root font-size baseline of 16px.',
    limitations: 'Parent element font sizes do not influence rem units (unlike em units).',
    faqs: [
      { question: 'What is the difference between rem and em?', answer: 'rem is relative exclusively to the root <html> element, whereas em is relative to its immediate parent container.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحويل قيم البكسل الثابتة (px) إلى وحدات rem النسبية القابلة للتكيف بناءً على حجم خط جذر المستند (Root Font Size).`,
    howToUse: [
      'أدخل القيمة بالبكسل (px).',
      'أدخل حجم خط الأساس لجذر المستند (المعيار الافتراضي للويب هو 16px).',
      'راجع القيمة النسبية بوحدات rem.'
    ],
    formula: 'rem = البكسل المطلوب / بكسل خط الأساس',
    formulaVariables: [
      { name: 'البكسل (px)', description: 'الحجم المراد تحويله.', unit: 'بكسل', optional: false },
      { name: 'بكسل الأساس', description: 'حجم الخط الافتراضي لصفحة الويب (16px عادة).', unit: 'بكسل', optional: false }
    ],
    workedExample: {
      scenario: 'تحويل مسافة هامش 24 بكسل مع حجم أساسي 16 بكسل.',
      stepByStep: [
        'البكسل المطلوب: 24 بكسل.',
        'حجم الأساس: 16 بكسل.',
        'الحساب: 24 ÷ 16 = 1.5 rem.'
      ],
      result: '24 px = 1.5 rem'
    },
    interpretation: 'تضمن تجربة استخدام ميسرة ومتجاوبة عند تغيير المستخدمين لإعدادات تكبير الخط في متصفحاتهم.',
    assumptions: 'حجم خط جذر المستند الافتراضي 16 بكسل.',
    limitations: 'تتأثر فقط بعنصر الجذر وليس بالعناصر الأبوية المباشرة.',
    faqs: [
      { question: 'ما الفرق بين rem و em؟', answer: 'تعتمد وحدة rem دائماً على عنصر الجذر <html>، بينما تعتمد وحدة em على حجم خط العنصر الأب المباشر.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} convierte medidas fijas en píxeles (px) a unidades relativas y escalables rem según el tamaño de fuente base de la raíz.`,
    howToUse: [
      'Introduzca el valor en píxeles (px).',
      'Introduzca el tamaño de fuente raíz (estándar web: 16px).',
      'Consulte la equivalencia en unidades rem.'
    ],
    formula: 'rem = Píxeles / Tamaño_Base_Raíz',
    formulaVariables: [
      { name: 'Píxeles (px)', description: 'Valor de diseño a convertir.', unit: 'px', optional: false },
      { name: 'Base Raíz (px)', description: 'Tamaño del elemento html (16px).', unit: 'px', optional: false }
    ],
    workedExample: {
      scenario: 'Conversión de 24px con fuente raíz estándar de 16px.',
      stepByStep: [
        'Píxeles objetivo: 24 px.',
        'Base de referencia: 16 px.',
        'Cálculo: 24 / 16 = 1,5 rem.'
      ],
      result: '24 px = 1,5 rem'
    },
    interpretation: 'Fundamental para accesibilidad y diseño web responsivo que respeta las preferencias de zoom del usuario.',
    assumptions: 'Base de 16px estándar en navegadores.',
    limitations: 'Afectado solo por la raíz html.',
    faqs: [
      { question: '¿Por qué se recomienda usar rem en lugar de px en CSS?', answer: 'Porque permite que la web se adapte de forma proporcional cuando los usuarios con dificultades visuales amplían el tamaño de texto del sistema.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} convertit les pixels fixes (px) en unités rem relatives à la racine pour garantir l'accessibilité web.`,
    howToUse: [
      'Indiquez la dimension en pixels (px).',
      'Indiquez la taille de police racine (16px par défaut).',
      'Consultez la valeur équivalente en rem.'
    ],
    formula: 'rem = Pixels / Taille_Racine',
    formulaVariables: [
      { name: 'Pixels (px)', description: 'Valeur à convertir.', unit: 'px', optional: false },
      { name: 'Base racine (px)', description: 'Taille racine du document (16px).', unit: 'px', optional: false }
    ],
    workedExample: {
      scenario: 'Conversion de 24px avec une base de 16px.',
      stepByStep: [
        'Pixels cibles : 24 px.',
        'Base racine : 16 px.',
        'Calcul : 24 / 16 = 1,5 rem.'
      ],
      result: '24 px = 1,5 rem'
    },
    interpretation: 'Garantit l\'accessibilité numérique en respectant les paramètres d\'affichage personnalisés de l\'utilisateur.',
    assumptions: 'Base de 16px standardisée.',
    limitations: 'Dépendant uniquement de la racine <html>.',
    faqs: [
      { question: 'Quelle est la différence entre rem et em ?', answer: 'Le rem prend pour référence l\'élément racine html, tandis que l\'em se réfère au parent direct.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} rechnet feste Pixelangaben (px) in skalierbare rem-Einheiten für barrierefreies und responsives Webdesign um.`,
    howToUse: [
      'Geben Sie den Pixelwert (px) ein.',
      'Geben Sie die Basis-Schriftgröße des Wurzelelements ein (Standard: 16px).',
      'Lesen Sie den rem-Wert ab.'
    ],
    formula: 'rem = Pixel / Basis-Schriftgröße',
    formulaVariables: [
      { name: 'Ziel-Pixel (px)', description: 'Zu konvertierende Pixelgröße.', unit: 'px', optional: false },
      { name: 'Basis-Schriftgröße', description: 'Schriftgröße des html-Elements (16px).', unit: 'px', optional: false }
    ],
    workedExample: {
      scenario: 'Umrechnung von 24px bei standardmäßigen 16px Basisschrift.',
      stepByStep: [
        'Zielwert: 24 px.',
        'Basisgröße: 16 px.',
        'Berechnung: 24 / 16 = 1,5 rem.'
      ],
      result: '24 px = 1,5 rem'
    },
    interpretation: 'Ermöglicht dynamisches Skalieren von Abständen und Textgrößen bei geänderten Browser-Einstellungen.',
    assumptions: 'Standard-Wurzelschriftgröße von 16px.',
    limitations: 'Gilt bezogen auf das Wurzelelement.',
    faqs: [
      { question: 'Warum bevorzugen Entwickler rem gegenüber px?', answer: 'Weil rem-Einheiten das proportionale Mitwachsen der gesamten Benutzeroberfläche bei Sehbehinderungen sicherstellen.' }
    ],
    relatedTools
  })
});

// 8. FUEL CONSUMPTION & TRIP COST (fuel-consumption)
export const FUEL_CONSUMPTION_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates total fuel volume required and estimated expenditure for a vehicle journey based on route distance, vehicle fuel economy (L/100km), and fuel unit price.`,
    howToUse: [
      'Enter planned journey distance in kilometers (km).',
      'Enter vehicle fuel consumption rating in liters per 100 km (L/100km).',
      'Enter fuel price per liter in your local currency.',
      'Review the total volume of fuel needed in liters and the total estimated trip fuel cost.'
    ],
    formula: 'Liters Needed = (Distance_km / 100) × (L / 100km) | Trip Cost = Liters Needed × Fuel Price',
    formulaVariables: [
      { name: 'Distance', description: 'Total trip travel distance.', unit: 'Kilometers (km)', optional: false },
      { name: 'Fuel Consumption', description: 'Vehicle fuel efficiency rating.', unit: 'L / 100km', optional: false },
      { name: 'Fuel Price', description: 'Price per liter of petrol/diesel.', unit: 'Currency / L', optional: false }
    ],
    workedExample: {
      scenario: 'A 350 km road trip in a vehicle consuming 8.5 L/100km with fuel priced at $1.85 per liter.',
      stepByStep: [
        'Calculate fuel volume: (350 / 100) × 8.5 = 3.5 × 8.5 = 29.75 Liters.',
        'Calculate fuel cost: 29.75 L × $1.85 / L = $55.0375 (rounded to $55.04).'
      ],
      result: 'Fuel Volume Needed: 29.75 Liters | Estimated Trip Cost: $55.04'
    },
    interpretation: 'Enables budget planning for road trips, vehicle sharing cost splits, and comparison between highway transit and rail alternatives.',
    assumptions: 'Assumes average driving consumption across combined highway and urban terrain.',
    limitations: 'Aggressive acceleration, heavy air conditioning, roof cargo, and steep mountain inclines increase actual fuel burn.',
    faqs: [
      { question: 'How can I reduce fuel consumption on highway trips?', answer: 'Maintaining a steady 90-100 km/h speed with cruise control reduces aerodynamic drag significantly compared to driving at 130 km/h.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب كمية الوقود المستهلكة باللتر وتكلفة الرحلة التقديرية بالسيارة بناءً على مسافة السفر ومعدل استهلاك المحرك وسعر لتر الوقود.`,
    howToUse: [
      'أدخل مسافة الرحلة بالكيلومتر (كم).',
      'أدخل معدل استهلاك السيارة (لتر لكل 100 كم).',
      'أدخل سعر لتر الوقود بعملتك المحلية.',
      'راجع إجمالي اللترات المطلوبة والتكلفة المالية التقديرية للرحلة.'
    ],
    formula: 'اللترات المطلوبة = (المسافة / 100) × معدل الاستهلاك | تكلفة الرحلة = اللترات × سعر اللتر',
    formulaVariables: [
      { name: 'المسافة', description: 'مسافة السفر الإجمالية.', unit: 'كيلومتر (كم)', optional: false },
      { name: 'معدل الاستهلاك', description: 'كفاءة استهلاك وقود السيارة.', unit: 'لتر / 100 كم', optional: false },
      { name: 'سعر الوقود', description: 'سعر لتر البنزين أو الديزل.', unit: 'عملة / لتر', optional: false }
    ],
    workedExample: {
      scenario: 'رحلة بطول 350 كم بسيارة تستهلك 8.5 لتر/100 كم بسعر وقود 1.85 دولار للتر.',
      stepByStep: [
        'حساب كمية الوقود: (350 ÷ 100) × 8.5 = 29.75 لتر.',
        'حساب التكلفة الإجمالية: 29.75 × 1.85 = 55.04 دولار.'
      ],
      result: 'الوقود المطلوب: 29.75 لتر | تكلفة الرحلة: 55.04 دولار'
    },
    interpretation: 'تساعد في ضبط ميزانية السفر العائلي وتقاسم تكاليف الوقود مع الأصدقاء بدقة.',
    assumptions: 'تفترض متوسط استهلاك مختلط ومستوى سرعة معتدل.',
    limitations: 'يزيد التكييف المستمر والقيادة في المرتفعات والازدحام من الاستهلاك الفعلي.',
    faqs: [
      { question: 'كيف أخفض استهلاك الوقود على الطرق السريعة؟', answer: 'تثبيت السرعة عند 90-100 كم/ساعة يقلل مقاومة الهواء بشكل ملحوظ ويوفر استهلاك الوقود مقارنة بالسرعات العالية.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula los litros de combustible requeridos y el gasto total estimado de un viaje a partir de la distancia, el consumo medio (L/100km) y el precio por litro.`,
    howToUse: [
      'Introduzca la distancia del trayecto en kilómetros (km).',
      'Introduzca el consumo medio del vehículo (L/100km).',
      'Introduzca el precio del combustible por litro.',
      'Consulte el combustible necesario en litros y el coste total estimado.'
    ],
    formula: 'Litros = (Distancia / 100) × Consumo_L100 | Coste = Litros × Precio_Litro',
    formulaVariables: [
      { name: 'Distancia', description: 'Kilómetros del itinerario.', unit: 'Kilómetros (km)', optional: false },
      { name: 'Consumo medio', description: 'Eficiencia energética.', unit: 'L / 100km', optional: false },
      { name: 'Precio carburante', description: 'Coste por litro.', unit: 'Moneda / L', optional: false }
    ],
    workedExample: {
      scenario: 'Viaje de 350 km en coche con consumo de 8,5 L/100km y gasolina a 1,85 €/L.',
      stepByStep: [
        'Litros requeridos: (350 / 100) × 8,5 = 29,75 litros.',
        'Coste total: 29,75 L × 1,85 €/L = 55,04 €.'
      ],
      result: 'Combustible necesario: 29,75 Litros | Coste del viaje: 55,04 €'
    },
    interpretation: 'Permite presupuestar viajes por carretera y repartir gastos de gasolina en vehículos compartidos.',
    assumptions: 'Consumo mixto estándar en condiciones de circulación normales.',
    limitations: 'El peso de la carga, la climatización y atascos elevan el gasto real.',
    faqs: [
      { question: '¿Cómo influye la presión de los neumáticos en el consumo?', answer: 'Llevar los neumáticos con presión baja incrementa la resistencia a la rodadura y eleva el consumo hasta un 4%.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} détermine le volume de carburant nécessaire et le budget prévisionnel d'un trajet en fonction de la distance, de la consommation moyenne (L/100km) et du prix au litre.`,
    howToUse: [
      'Indiquez la distance du trajet en kilomètres (km).',
      'Indiquez la consommation de votre véhicule en L/100km.',
      'Indiquez le prix du litre de carburant.',
      'Consultez le volume requis en litres et le coût total prévisionnel.'
    ],
    formula: 'Litres = (Distance / 100) × Consommation | Coût = Litres × Prix_Litre',
    formulaVariables: [
      { name: 'Distance', description: 'Distance à parcourir.', unit: 'Kilomètres (km)', optional: false },
      { name: 'Consommation', description: 'Moyenne aux 100 km.', unit: 'L / 100km', optional: false },
      { name: 'Prix du carburant', description: 'Tarif unitaire à la pompe.', unit: 'Devise / L', optional: false }
    ],
    workedExample: {
      scenario: 'Trajet de 350 km avec une voiture consommant 8,5 L/100km et carburant à 1,85 € le litre.',
      stepByStep: [
        'Calcul des litres : (350 / 100) × 8,5 = 29,75 litres.',
        'Budget carburant : 29,75 L × 1,85 € = 55,04 €.'
      ],
      result: 'Carburant nécessaire : 29,75 Litres | Budget prévisionnel : 55,04 €'
    },
    interpretation: 'Idéal pour le covoiturage, les notes de frais et la planification des départs en vacances.',
    assumptions: 'Conduite souple en conditions réelles combinées.',
    limitations: 'Les coffres de toit et la climatisation augmentent la consommation effective.',
    faqs: [
      { question: 'Comment réduire sa consommation sur autoroute ?', answer: 'Rouler à 110 km/h au lieu de 130 km/h permet d\'économiser jusqu\'à 20 % de carburant.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} ermittelt den benötigten Kraftstoffbedarf in Litern und die Fahrtkosten anhand von Distanz, Durchschnittsverbrauch (L/100km) und Kraftstoffpreis.`,
    howToUse: [
      'Geben Sie die Fahrstrecke in Kilometern (km) ein.',
      'Geben Sie den Durchschnittsverbrauch in Litern pro 100 km ein.',
      'Geben Sie den Spritpreis pro Liter ein.',
      'Lesen Sie die benötigte Kraftstoffmenge und die geschätzten Gesamtkosten ab.'
    ],
    formula: 'Liter = (Strecke / 100) × Verbrauch | Fahrtkosten = Liter × Preis_pro_Liter',
    formulaVariables: [
      { name: 'Strecke', description: 'Geplante Reisedistanz.', unit: 'Kilometer (km)', optional: false },
      { name: 'Verbrauch', description: 'Kraftstoffeffizienz.', unit: 'L / 100km', optional: false },
      { name: 'Spritpreis', description: 'Preis pro Liter Benzin/Diesel.', unit: 'Währung / L', optional: false }
    ],
    workedExample: {
      scenario: 'Fahrt über 350 km mit einem Verbrauch von 8,5 L/100km bei einem Benzinpreis von 1,85 €/L.',
      stepByStep: [
        'Kraftstoffbedarf: (350 / 100) × 8,5 = 29,75 Liter.',
        'Fahrtkosten: 29,75 L × 1,85 €/L = 55,04 €.'
      ],
      result: 'Kraftstoffmenge: 29,75 Liter | Geschätzte Spritkosten: 55,04 €'
    },
    interpretation: 'Ermöglicht eine exakte Reisekostenkalkulation und faire Kostenaufteilung bei Fahrgemeinschaften.',
    assumptions: 'Kombinierter Durchschnittsverbrauch auf Landstraße und Autobahn.',
    limitations: 'Dachboxen, aggressive Fahrweise und Staus erhöhen den Realverbrauch.',
    faqs: [
      { question: 'Wie wirkt sich vorausschauendes Fahren aus?', answer: 'Frühzeitiges Schalten und gleichmäßiges Gleiten senken den Spritverbrauch im Schnitt um 10 bis 15 Prozent.' }
    ],
    relatedTools
  })
});

// Map of Batch 1 converter tools
export const BATCH1_CONVERTER_HANDLERS: Record<string, Record<Language, KnowledgeHandler>> = {
  'binary-hex': BINARY_HEX_KNOWLEDGE,
  'roman-numeral': ROMAN_NUMERAL_KNOWLEDGE,
  temperature: TEMPERATURE_KNOWLEDGE,
  'speed-distance': SPEED_DISTANCE_KNOWLEDGE,
  'data-size': DATA_SIZE_KNOWLEDGE,
  'color-hex-rgb': COLOR_HEX_RGB_KNOWLEDGE,
  'px-rem': PX_REM_KNOWLEDGE,
  'fuel-consumption': FUEL_CONSUMPTION_KNOWLEDGE,
};
