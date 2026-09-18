import { ToolDef, Language } from '../../types';
import { ToolContentDetails } from './types';

type KnowledgeHandler = (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails;

function createKnowledge(dataByLang: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails>): Record<Language, KnowledgeHandler> {
  return dataByLang;
}

// 7. AREA & PERIMETER (area-perimeter)
export const AREA_PERIMETER_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates the total interior surface area and exterior perimeter boundary of a two-dimensional rectangular space from length and width.`,
    howToUse: [
      'Enter length dimension.',
      'Enter width dimension.',
      'Review total calculated area in square units and perimeter boundary in linear units.'
    ],
    formula: 'Area = Length × Width | Perimeter = 2 × (Length + Width)',
    formulaVariables: [
      { name: 'Length', description: 'Longer horizontal dimension.', unit: 'Linear units', optional: false },
      { name: 'Width', description: 'Perpendicular dimension.', unit: 'Linear units', optional: false }
    ],
    workedExample: {
      scenario: 'A room measuring 12 meters long by 8 meters wide.',
      stepByStep: [
        'Area calculation: 12 × 8 = 96 square meters.',
        'Perimeter calculation: 2 × (12 + 8) = 2 × 20 = 40 linear meters.'
      ],
      result: 'Surface Area: 96.0 sq units | Perimeter: 40.0 linear units'
    },
    interpretation: 'Area determines flooring, tile, or lawn turf material quantities, while perimeter determines baseboard trim or boundary fencing requirements.',
    assumptions: 'Assumes a flat Euclidean rectangular surface with four 90-degree corners.',
    limitations: 'Irregular or non-rectangular geometries require polygon triangulation.',
    faqs: [
      { question: 'Why does area scale quadratically while perimeter scales linearly?', answer: 'Area represents two-dimensional surface space (length × width), while perimeter is a one-dimensional linear boundary.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب مساحة السطح الداخلية ومحيط الإطار الخارجي للأشكال المستطيلة بدقة انطلاقاً من الطول والعرض.`,
    howToUse: [
      'أدخل بعد الطول.',
      'أدخل بعد العرض.',
      'راجع المساحة الإجمالية بالوحدات المربعة والمحيط بالوحدات الطولية.'
    ],
    formula: 'المساحة = الطول × العرض | المحيط = 2 × (الطول + العرض)',
    formulaVariables: [
      { name: 'الطول', description: 'البعد الطولي للمستطيل.', unit: 'وحدة طول', optional: false },
      { name: 'العرض', description: 'البعد العرضي المتعامد.', unit: 'وحدة طول', optional: false }
    ],
    workedExample: {
      scenario: 'غرفة بطول 12 متراً وعرض 8 أمتار.',
      stepByStep: [
        'حساب المساحة: 12 × 8 = 96 متراً مربعاً.',
        'حساب المحيط: 2 × (12 + 8) = 2 × 20 = 40 متراً طولياً.'
      ],
      result: 'المساحة: 96 وحدة مربعة | المحيط: 40 وحدة طولية'
    },
    interpretation: 'تحدد المساحة كميات السيراميك أو السجاد المطلوب، بينما يحدد المحيط أطوال ألواح الأرضيات أو أسوار الحدائق.',
    assumptions: 'تفترض مستطيلاً مستوياً بزوايا قائمة 90 درجة.',
    limitations: 'لا تنطبق على الأشكال غير المنتظمة دون تقسيمها إلى مثلثات ومستطيلات جزئية.',
    faqs: [
      { question: 'ما الفرق بين المساحة والمحيط؟', answer: 'المساحة تقيس السطح الداخلي كاملاً، بينما يقيس المحيط المسافة الخارجية المحيطة بالشكل فقط.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} determina la superficie total y el perímetro perimetral exterior de un rectángulo a partir de su longitud y anchura.`,
    howToUse: [
      'Introduzca la longitud.',
      'Introduzca la anchura.',
      'Consulte el área calculada en unidades cuadradas y el perímetro lineal.'
    ],
    formula: 'Área = Longitud × Anchura | Perímetro = 2 × (Longitud + Anchura)',
    formulaVariables: [
      { name: 'Longitud', description: 'Dimensión lineal principal.', unit: 'Unidades lineales', optional: false },
      { name: 'Anchura', description: 'Dimensión transversal.', unit: 'Unidades lineales', optional: false }
    ],
    workedExample: {
      scenario: 'Habitación de 12 metros de largo por 8 metros de ancho.',
      stepByStep: [
        'Cálculo del área: 12 × 8 = 96 metros cuadrados.',
        'Cálculo del perímetro: 2 × (12 + 8) = 40 metros lineales.'
      ],
      result: 'Superficie: 96,0 unidades² | Perímetro: 40,0 unidades'
    },
    interpretation: 'El área determina los metros de pintura o suelo; el perímetro indica los metros de rodapié o vallado necesarios.',
    assumptions: 'Superficie rectangular plana con cuatro vértices de 90°.',
    limitations: 'No apto para polígonos irregulares.',
    faqs: [
      { question: '¿Por qué las unidades de área van elevadas al cuadrado?', answer: 'Porque resultan de multiplicar dos dimensiones lineales independientes (longitud por anchura).' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule la surface intérieure totale et le périmètre extérieur d'un rectangle à partir de sa longueur et de sa largeur.`,
    howToUse: [
      'Indiquez la longueur.',
      'Indiquez la largeur.',
      'Consultez l\'aire en unités carrées et le périmètre en unités linéaires.'
    ],
    formula: 'Aire = Longueur × Largeur | Périmètre = 2 × (Longueur + Largeur)',
    formulaVariables: [
      { name: 'Longueur', description: 'Dimension la plus grande.', unit: 'Unités', optional: false },
      { name: 'Largeur', description: 'Dimension transversale.', unit: 'Unités', optional: false }
    ],
    workedExample: {
      scenario: 'Pièce de 12 mètres de long par 8 mètres de large.',
      stepByStep: [
        'Calcul de l\'aire : 12 × 8 = 96 m².',
        'Calcul du périmètre : 2 × (12 + 8) = 40 mètres linéaires.'
      ],
      result: 'Aire : 96,0 unités² | Périmètre : 40,0 unités'
    },
    interpretation: 'L\'aire chiffre les besoins en carrelage ou parquet, le périmètre quantifie les plinthes ou clôtures.',
    assumptions: 'Figure géométrique plane à quatre angles droits.',
    limitations: 'Réservé aux formes strictement rectangulaires.',
    faqs: [
      { question: 'Quelle est la différence entre aire et périmètre ?', answer: 'L\'aire mesure l\'étendue d\'une surface, le périmètre mesure la longueur de son contour.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die Innenfläche und den Außenumfang eines Rechtecks anhand von Länge und Breite.`,
    howToUse: [
      'Geben Sie die Länge ein.',
      'Geben Sie die Breite ein.',
      'Lesen Sie Fläche in Quadrateinheiten und Umfang in Längeneinheiten ab.'
    ],
    formula: 'Fläche = Länge × Breite | Umfang = 2 × (Länge + Breite)',
    formulaVariables: [
      { name: 'Länge', description: 'Längere Seite des Rechtecks.', unit: 'Längeneinheiten', optional: false },
      { name: 'Breite', description: 'Kürzere Seite des Rechtecks.', unit: 'Längeneinheiten', optional: false }
    ],
    workedExample: {
      scenario: 'Ein Raum mit 12 Metern Länge und 8 Metern Breite.',
      stepByStep: [
        'Fläche: 12 × 8 = 96 Quadratmeter.',
        'Umfang: 2 × (12 + 8) = 40 laufende Meter.'
      ],
      result: 'Flächeninhalt: 96,0 FE | Umfang: 40,0 LE'
    },
    interpretation: 'Die Fläche bestimmt den Materialbedarf für Bodenbeläge, der Umfang für Sockelleisten oder Zäune.',
    assumptions: 'Ebene rechtwinklige Geometrie.',
    limitations: 'Gilt nur für Rechtecke.',
    faqs: [
      { question: 'Warum sind Flächenangaben quadratisch?', answer: 'Weil zwei zueinander senkrechte Längenmaße miteinander multipliziert werden.' }
    ],
    relatedTools
  })
});

// 8. 3D VOLUME CALCULATOR (volume)
export const VOLUME_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates three-dimensional volumetric space capacity for rectangular prisms and enclosures from length, width, and height.`,
    howToUse: [
      'Enter length dimension.',
      'Enter width dimension.',
      'Enter height dimension.',
      'Review total calculated volumetric capacity in cubic units.'
    ],
    formula: 'Volume = Length × Width × Height',
    formulaVariables: [
      { name: 'Length', description: 'Base length.', unit: 'Units', optional: false },
      { name: 'Width', description: 'Base depth.', unit: 'Units', optional: false },
      { name: 'Height', description: 'Vertical height.', unit: 'Units', optional: false }
    ],
    workedExample: {
      scenario: 'A container with length = 5, width = 4, and height = 3 units.',
      stepByStep: [
        'Base surface area: 5 × 4 = 20 square units.',
        'Volumetric multiplication: 20 × 3 = 60 cubic units.'
      ],
      result: 'Calculated Volume: 60.0 cubic units'
    },
    interpretation: 'Essential for packaging logistics, cargo container capacity, water storage reservoirs, and HVAC air volume balancing.',
    assumptions: 'Rectangular prism geometry with orthogonal angles.',
    limitations: 'Curved volumes (cylinders, spheres, cones) require separate geometrical models.',
    faqs: [
      { question: 'How do cubic meters convert to liters?', answer: 'One cubic meter equals exactly 1,000 liters of liquid capacity.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب السعة الحجمية ثلاثية الأبعاد للصناديق والخزانات ومتوازي المستطيلات من الطول والعرض والارتفاع.`,
    howToUse: [
      'أدخل بعد الطول.',
      'أدخل بعد العرض.',
      'أدخل بعد الارتفاع.',
      'راجع الحجم الكلي المحسوب بالوحدات المكعبة.'
    ],
    formula: 'الحجم = الطول × العرض × الارتفاع',
    formulaVariables: [
      { name: 'الطول', description: 'طول القاعدة.', unit: 'وحدة طول', optional: false },
      { name: 'العرض', description: 'عرض القاعدة.', unit: 'وحدة طول', optional: false },
      { name: 'الارتفاع', description: 'الارتفاع العمودي.', unit: 'وحدة طول', optional: false }
    ],
    workedExample: {
      scenario: 'صندوق شحن بطول 5 وحدات وعرض 4 وحدات وارتفاع 3 وحدات.',
      stepByStep: [
        'مساحة القاعدة: 5 × 4 = 20 وحدة مربعة.',
        'ضرب الارتفاع: 20 × 3 = 60 وحدة مكعبة.'
      ],
      result: 'الحجم الكلي: 60.0 وحدة مكعبة'
    },
    interpretation: 'حاسم في تقدير سعات الشحن اللوجستي وخزانات المياه وحسابات تهوية التكييف والتبريد.',
    assumptions: 'شكل متوازي مستطيلات بزوايا قائمة.',
    limitations: 'الأشكال المنحنية كالأسطوانات والكرات تتطلب معادلات هندسية مختلفة.',
    faqs: [
      { question: 'كم لتراً في المتر المكعب الواحد؟', answer: 'يحتوي المتر المكعب الواحد بالضبط على 1,000 لتر من الماء.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la capacidad volumétrica tridimensional de prismas rectangulares y contenedores a partir de su largo, ancho y alto.`,
    howToUse: [
      'Introduzca la longitud.',
      'Introduzca la anchura.',
      'Introduzca la altura.',
      'Consulte la capacidad volumétrica en unidades cúbicas.'
    ],
    formula: 'Volumen = Longitud × Anchura × Altura',
    formulaVariables: [
      { name: 'Longitud', description: 'Largo de la base.', unit: 'Unidades', optional: false },
      { name: 'Anchura', description: 'Ancho de la base.', unit: 'Unidades', optional: false },
      { name: 'Altura', description: 'Cota vertical.', unit: 'Unidades', optional: false }
    ],
    workedExample: {
      scenario: 'Contenedor de 5 unidades de largo, 4 de ancho y 3 de alto.',
      stepByStep: [
        'Superficie de base: 5 × 4 = 20 unidades cuadradas.',
        'Cálculo de volumen: 20 × 3 = 60 unidades cúbicas.'
      ],
      result: 'Volumen: 60,0 unidades cúbicas'
    },
    interpretation: 'Fundamental para logística de transporte, cubicaje de mercancías y capacidad de depósitos de fluidos.',
    assumptions: 'Prisma recto ortogonal.',
    limitations: 'Cuerpos redondos requieren fórmulas específicas.',
    faqs: [
      { question: '¿A cuántos litros equivale un metro cúbico?', answer: 'Un metro cúbico (m³) equivale exactamente a 1.000 litros.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} détermine la contenance volumétrique 3D des prismes et conteneurs rectangulaires selon la longueur, la largeur et la hauteur.`,
    howToUse: [
      'Indiquez la longueur.',
      'Indiquez la largeur.',
      'Indiquez la hauteur.',
      'Consultez le volume calculé en unités cubiques.'
    ],
    formula: 'Volume = Longueur × Largeur × Hauteur',
    formulaVariables: [
      { name: 'Longueur', description: 'Longueur de base.', unit: 'Unités', optional: false },
      { name: 'Largeur', description: 'Largeur de base.', unit: 'Unités', optional: false },
      { name: 'Hauteur', description: 'Dimension verticale.', unit: 'Unités', optional: false }
    ],
    workedExample: {
      scenario: 'Conteneur mesurant 5 de long, 4 de large et 3 de haut.',
      stepByStep: [
        'Surface de base : 5 × 4 = 20 unités carrées.',
        'Volume : 20 × 3 = 60 unités cubiques.'
      ],
      result: 'Volume : 60,0 unités cubiques'
    },
    interpretation: 'Utile en fret maritime, logistique d\'emballage et calcul de cubage de béton.',
    assumptions: 'Prisme à base rectangulaire.',
    limitations: 'Ne s\'applique pas aux cylindres ou sphères.',
    faqs: [
      { question: 'Combien de litres compte un mètre cube ?', answer: 'Un mètre cube correspond exactement à 1 000 litres d\'eau.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet das dreidimensionale Fassungsvermögen von Quadern und Containern aus Länge, Breite und Höhe.`,
    howToUse: [
      'Geben Sie die Länge ein.',
      'Geben Sie die Breite ein.',
      'Geben Sie die Höhe ein.',
      'Lesen Sie das Volumen in Kubikeinheiten ab.'
    ],
    formula: 'Volumen = Länge × Breite × Höhe',
    formulaVariables: [
      { name: 'Länge', description: 'Grundflächenlänge.', unit: 'Einheiten', optional: false },
      { name: 'Breite', description: 'Grundflächenbreite.', unit: 'Einheiten', optional: false },
      { name: 'Höhe', description: 'Senkrechte Höhe.', unit: 'Einheiten', optional: false }
    ],
    workedExample: {
      scenario: 'Ein Behälter mit Länge = 5, Breite = 4 und Höhe = 3.',
      stepByStep: [
        'Grundfläche: 5 × 4 = 20 Quadrateinheiten.',
        'Volumen: 20 × 3 = 60 Kubikeinheiten.'
      ],
      result: 'Volumen: 60,0 Kubikeinheiten'
    },
    interpretation: 'Unverzichtbar für Frachtlogistik, Raumklimatisierung und Füllmengenbestimmung.',
    assumptions: 'Rechtwinkliger Quader.',
    limitations: 'Gilt nur für quaderförmige Körper.',
    faqs: [
      { question: 'Wie viel Liter fasst ein Kubikmeter?', answer: 'Ein Kubikmeter (m³) fasst exakt 1.000 Liter Flüssigkeit.' }
    ],
    relatedTools
  })
});

// 9. PRIME NUMBER CHECKER (prime-checker)
export const PRIME_CHECKER_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} verifies whether a given integer is a prime number (having exactly two distinct positive divisors: 1 and itself) using trial division up to √n.`,
    howToUse: [
      'Enter an integer to evaluate.',
      'Review the primality status (Prime or Composite) and primary factors.'
    ],
    formula: 'n is prime if n > 1 and ∀ d ∈ [2, ⌊√n⌋], n mod d ≠ 0',
    formulaVariables: [
      { name: 'Integer (n)', description: 'Positive whole number to test.', unit: 'Integer', optional: false }
    ],
    workedExample: {
      scenario: 'Testing whether the number 29 is prime.',
      stepByStep: [
        'Verify n > 1: 29 is greater than 1.',
        'Compute limit: √29 ≈ 5.385 -> Test potential divisors 2, 3, and 5.',
        '29 mod 2 = 1 (not divisible).',
        '29 mod 3 = 2 (not divisible).',
        '29 mod 5 = 4 (not divisible).',
        'No divisors found up to √n.'
      ],
      result: 'Status: Prime (29 has exactly two divisors: 1 and 29)'
    },
    interpretation: 'Prime numbers form the bedrock of asymmetric modern public-key cryptography (such as RSA key pair generation).',
    assumptions: 'Tests positive integers.',
    limitations: 'Uses deterministic trial division optimized for browser performance.',
    faqs: [
      { question: 'Why is 1 not considered a prime number?', answer: 'By fundamental algebraic theorem, primes must have exactly two distinct positive factors (1 and the number itself); 1 has only one.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بالتحقق مما إذا كان العدد الصحيح عدداً أولياً (يقبل القسمة فقط على 1 وعلى نفسه) باستخدام خوارزمية القسمة التجريبية حتى جذر(ن).`,
    howToUse: [
      'أدخل العدد الصحيح المراد اختباره.',
      'راجع حالة العدد (عدد أولي أم عدد مركب/غير أولي).'
    ],
    formula: 'العدد أولي إذا كان أكبر من 1 ولا يقبل القسمة على أي عدد صحيح بين 2 و جذر(ن)',
    formulaVariables: [
      { name: 'العدد الصحيح (ن)', description: 'العدد المراد فحصه.', unit: 'عدد صحيح', optional: false }
    ],
    workedExample: {
      scenario: 'اختبار العدد 29 للتأكد من أوليته.',
      stepByStep: [
        'العدد أكبر من 1: 29 > 1.',
        'حساب الحد الأقصى للاختبار: جذر(29) ≈ 5.38 -> اختبار القواسم 2 و 3 و 5.',
        '29 لا يقبل القسمة على 2 أو 3 أو 5.',
        'لم يتم العثور على أي قاسم مشترك.'
      ],
      result: 'الحالة: عدد أولي (قواسمه 1 و 29 فقط)'
    },
    interpretation: 'تشكل الأعداد الأولية حجر الأساس في علم التشفير وحماية البيانات وأنظمة المفاتيح العامة الرقمية.',
    assumptions: 'تختبر الأعداد الصحيحة الموجبة.',
    limitations: 'تعتمد القسمة التجريبية السريعة.',
    faqs: [
      { question: 'لماذا لا يعتبر الرقم 1 عدداً أولياً؟', answer: 'وفق المبرهنة الأساسية للحساب، يجب أن يكون للعدد الأولي عاملان موجبان متمايزان، بينما الرقم 1 له عامل واحد فقط.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} comprueba si un número entero es primo (divisible únicamente entre 1 y sí mismo) mediante divisiones sucesivas hasta √n.`,
    howToUse: [
      'Introduzca el número entero.',
      'Revise el diagnóstico de primalidad (Primo o Compuesto).'
    ],
    formula: 'n es primo si n > 1 y ∀ d ∈ [2, ⌊√n⌋], n mod d ≠ 0',
    formulaVariables: [
      { name: 'Número entero (n)', description: 'Cifra a evaluar.', unit: 'Entero', optional: false }
    ],
    workedExample: {
      scenario: 'Comprobar si el número 29 es primo.',
      stepByStep: [
        'Verificar n > 1: 29 es mayor que 1.',
        'Límite de prueba: √29 ≈ 5,38 -> Divisores a comprobar: 2, 3 y 5.',
        '29 no es divisible entre 2, ni 3, ni 5.',
        'No existen divisores enteros.'
      ],
      result: 'Resultado: Es número primo (Divisores: 1 y 29)'
    },
    interpretation: 'Pilar fundamental de la criptografía de clave pública moderna (algoritmo RSA).',
    assumptions: 'Enteros positivos.',
    limitations: 'División determinista por ensayo.',
    faqs: [
      { question: '¿Cuál es el único número primo par?', answer: 'El número 2 es el único número par que es primo.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} vérifie si un entier naturel est un nombre premier (admettant exactement deux diviseurs distincts : 1 et lui-même).`,
    howToUse: [
      'Indiquez le nombre entier à tester.',
      'Consultez le statut de primalité (Premier ou Composé).'
    ],
    formula: 'n est premier si n > 1 et aucun diviseur d ∈ [2, √n] ne divise n',
    formulaVariables: [
      { name: 'Entier (n)', description: 'Nombre entier positif.', unit: 'Entier', optional: false }
    ],
    workedExample: {
      scenario: 'Test de primalité du nombre 29.',
      stepByStep: [
        '29 est strictement supérieur à 1.',
        'Borne de vérification : √29 ≈ 5,38 -> Diviseurs potentiels : 2, 3, 5.',
        '29 n\'est divisible ni par 2, ni par 3, ni par 5.',
        'Aucun diviseur trouvé.'
      ],
      result: 'Statut : Nombre Premier (Diviseurs : 1 et 29)'
    },
    interpretation: 'Éléments constitutifs des clés de chiffrement asymétrique sur Internet.',
    assumptions: 'Entiers strictement positifs.',
    limitations: 'Algorithme par divisions successives optimisé.',
    faqs: [
      { question: 'Pourquoi 1 n\'est-il pas premier ?', answer: 'Pour préserver l\'unicité de la décomposition en facteurs premiers (théorème fondamental de l\'arithmétique).' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} prüft, ob eine ganze Zahl eine Primzahl ist (nur durch 1 und sich selbst ohne Rest teilbar).`,
    howToUse: [
      'Geben Sie eine ganze Zahl ein.',
      'Lesen Sie das Ergebnis (Primzahl oder zusammengesetzte Zahl) ab.'
    ],
    formula: 'n ist prim, wenn n > 1 und kein d ∈ [2, ⌊√n⌋] die Zahl n teilt',
    formulaVariables: [
      { name: 'Ganzzahl (n)', description: 'Zu prüfende positive Zahl.', unit: 'Ganzzahl', optional: false }
    ],
    workedExample: {
      scenario: 'Prüfung der Zahl 29.',
      stepByStep: [
        '29 ist größer als 1.',
        'Prüfgrenze: √29 ≈ 5,38 -> Zu prüfende Teiler: 2, 3 und 5.',
        '29 ist weder durch 2, noch 3 oder 5 teilbar.',
        'Kein Teiler gefunden.'
      ],
      result: 'Ergebnis: Primzahl (Teiler: 1 und 29)'
    },
    interpretation: 'Grundbaustein der modernen asymmetrischen Kryptographie und RSA-Verschlüsselung.',
    assumptions: 'Positive ganze Zahlen.',
    limitations: 'Verwendet Probedivision bis zur Quadratwurzel.',
    faqs: [
      { question: 'Gibt es unendlich viele Primzahlen?', answer: 'Ja, dies wurde bereits in der Antike von Euklid mathematisch bewiesen.' }
    ],
    relatedTools
  })
});

// 10. FACTORIAL CALCULATOR (factorial)
export const FACTORIAL_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates the factorial (n!) of a non-negative integer using arbitrary-precision BigInt arithmetic.`,
    howToUse: [
      'Enter a non-negative integer (0 to 100).',
      'Review the calculated factorial product.'
    ],
    formula: 'n! = n × (n - 1) × (n - 2) × ... × 2 × 1 | 0! = 1',
    formulaVariables: [
      { name: 'Integer (n)', description: 'Non-negative integer.', unit: '0 to 100', optional: false }
    ],
    workedExample: {
      scenario: 'Calculating the factorial of 5 (5!).',
      stepByStep: [
        'Factorial product: 5 × 4 × 3 × 2 × 1.',
        'Intermediate products: 5 × 4 = 20; 20 × 3 = 60; 60 × 2 = 120; 120 × 1 = 120.'
      ],
      result: '5! = 120'
    },
    interpretation: 'Measures permutation arrangements (e.g., the number of unique ways to sequence 5 items in a row).',
    assumptions: 'Input is a non-negative integer.',
    limitations: 'Capped at n = 100 for browser memory protection.',
    faqs: [
      { question: 'Why is 0! equal to 1?', answer: '0! = 1 is the empty product convention, reflecting that there is exactly 1 way to arrange zero objects.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب مضروب العدد (ن!) للأعداد الصحيحة غير السالبة بدقة رقمية متناهية.`,
    howToUse: [
      'أدخل عدداً صحيحاً غير سالب (من 0 إلى 100).',
      'راجع قيمة المضروب المحسوبة.'
    ],
    formula: 'ن! = ن × (ن - 1) × (ن - 2) × ... × 1 | 0! = 1',
    formulaVariables: [
      { name: 'العدد (ن)', description: 'عدد صحيح غير سالب.', unit: 'رقم', optional: false }
    ],
    workedExample: {
      scenario: 'حساب مضروب العدد 5 (5!).',
      stepByStep: [
        'تسلسل الضرب: 5 × 4 × 3 × 2 × 1.',
        'النتائج المرحلية: 5 × 4 = 20، ثم 20 × 3 = 60، ثم 60 × 2 = 120.'
      ],
      result: '5! = 120'
    },
    interpretation: 'يستخدم في حساب التباديل والتوافيق الرياضية والاحتمالات الإحصائية.',
    assumptions: 'أعداد صحيحة موجبة أو صفر.',
    limitations: 'محدد حتى 100 لحماية ذاكرة المتصفح.',
    faqs: [
      { question: 'لماذا مضروب الصفر (0!) يساوي 1؟', answer: 'لأنه يمثل عدد الطرق الممكنة لترتيب مجموعة خالية من العناصر، وهناك طريقة واحدة فقط للقيام بذلك.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el factorial (n!) de un número entero no negativo con soporte para enteros de gran precisión.`,
    howToUse: [
      'Introduzca un número entero entre 0 y 100.',
      'Consulte el producto factorial resultante.'
    ],
    formula: 'n! = n × (n - 1) × ... × 1 | 0! = 1',
    formulaVariables: [
      { name: 'Entero (n)', description: 'Número no negativo.', unit: 'Entero', optional: false }
    ],
    workedExample: {
      scenario: 'Cálculo del factorial de 5 (5!).',
      stepByStep: [
        'Producto: 5 × 4 × 3 × 2 × 1.',
        'Multiplicación acumulada: 5 × 4 = 20; 20 × 3 = 60; 60 × 2 = 120.'
      ],
      result: '5! = 120'
    },
    interpretation: 'Determina el número de permutaciones u ordenaciones posibles de un conjunto de elementos.',
    assumptions: 'Enteros no negativos.',
    limitations: 'Límite operativo de 100.',
    faqs: [
      { question: '¿Para qué se usa el factorial en estadística?', answer: 'Es la base para el cálculo de combinaciones y coeficientes binomiales en distribuciones probabilísticas.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule la factorielle (n!) d'un entier naturel en utilisant l'arithmétique de précision BigInt.`,
    howToUse: [
      'Indiquez un entier naturel entre 0 et 100.',
      'Consultez la factorielle résultante.'
    ],
    formula: 'n! = n × (n - 1) × ... × 1 | 0! = 1',
    formulaVariables: [
      { name: 'Entier (n)', description: 'Nombre entier positif ou nul.', unit: 'Entier', optional: false }
    ],
    workedExample: {
      scenario: 'Calcul de la factorielle de 5 (5!).',
      stepByStep: [
        'Décomposition : 5 × 4 × 3 × 2 × 1.',
        'Produit : 120.'
      ],
      result: '5! = 120'
    },
    interpretation: 'Chiffre le nombre d\'arrangements et de permutations possibles d\'une collection d\'objets.',
    assumptions: 'Entiers positifs ou nuls.',
    limitations: 'Plafonné à 100.',
    faqs: [
      { question: 'Pourquoi 0! = 1 ?', answer: 'C\'est la convention du produit vide en combinatoire.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die Fakultät (n!) einer nicht-negativen ganzen Zahl unter Verwendung präziser BigInt-Arithmetik.`,
    howToUse: [
      'Geben Sie eine ganze Zahl zwischen 0 und 100 ein.',
      'Lesen Sie das Fakultätsergebnis ab.'
    ],
    formula: 'n! = n × (n - 1) × ... × 1 | 0! = 1',
    formulaVariables: [
      { name: 'Ganzzahl (n)', description: 'Nicht-negative Zahl.', unit: 'Zahl', optional: false }
    ],
    workedExample: {
      scenario: 'Fakultät von 5 (5!).',
      stepByStep: [
        'Multiplikation: 5 × 4 × 3 × 2 × 1.',
        'Zwischenschritte: 20 × 3 = 60, 60 × 2 = 120.'
      ],
      result: '5! = 120'
    },
    interpretation: 'Berechnet die Anzahl möglicher Anordnungen (Permutationen) von Elementen.',
    assumptions: 'Ganzzahlige positive Werte oder null.',
    limitations: 'Begrenzt auf n = 100.',
    faqs: [
      { question: 'Was beschreibt die Fakultät in der Praxis?', answer: 'Wie viele verschiedene Reihenfolgen es gibt, um eine bestimmte Anzahl von Gegenständen aufzureihen.' }
    ],
    relatedTools
  })
});

// 11. EXPONENT & POWER (exponent-power)
export const EXPONENT_POWER_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates exponential powers (base^exponent) for integer and fractional bases.`,
    howToUse: [
      'Enter the base number.',
      'Enter the exponent (power) to raise the base to.',
      'Review the calculated power result.'
    ],
    formula: 'Result = Base^Exponent',
    formulaVariables: [
      { name: 'Base', description: 'Number being multiplied.', unit: 'Number', optional: false },
      { name: 'Exponent', description: 'Power indicating how many times base is multiplied.', unit: 'Power', optional: false }
    ],
    workedExample: {
      scenario: 'Computing 2 raised to the power of 8 (2^8).',
      stepByStep: [
        '2 × 2 × 2 × 2 × 2 × 2 × 2 × 2.',
        'Powers: 2²=4, 2³=8, 2⁴=16, 2⁵=32, 2⁶=64, 2⁷=128, 2⁸=256.'
      ],
      result: '2^8 = 256.0'
    },
    interpretation: 'Models exponential growth in computer science (binary byte addressing), microbiology bacterial cultures, and compound finance.',
    assumptions: 'Handles real numeric inputs.',
    limitations: 'Negative bases with fractional exponents produce complex numbers.',
    faqs: [
      { question: 'Why does any non-zero number to the power of 0 equal 1?', answer: 'Because a^0 = a^(n-n) = a^n / a^n = 1.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب القوى والأسس الرياضية (الأساس^الأس) للأعداد الصحيحة والكسرية.`,
    howToUse: [
      'أدخل عدد الأساس.',
      'أدخل قيمة الأس (القوة).',
      'راجع ناتج الرفع للأس المحسوب.'
    ],
    formula: 'النتيجة = الأساس ^ الأس',
    formulaVariables: [
      { name: 'الأساس', description: 'العدد المضروب في نفسه.', unit: 'رقم', optional: false },
      { name: 'الأس', description: 'عدد مرات تكرار الضرب.', unit: 'قوة', optional: false }
    ],
    workedExample: {
      scenario: 'حساب 2 أس 8 (2^8).',
      stepByStep: [
        'ضرب العدد 2 في نفسه 8 مرات.',
        'النواتج المتتالية: 2, 4, 8, 16, 32, 64, 128, 256.'
      ],
      result: '2^8 = 256'
    },
    interpretation: 'أساس حسابات علوم الحاسب وسعات الذاكرة (النظام الثنائي) والنمو الأسي المتسارع.',
    assumptions: 'مدخلات رقمية حقيقية.',
    limitations: 'الأساس السالب مع الأس الكسري يعطي أعداداً مركبة تخيلية.',
    faqs: [
      { question: 'لماذا أي عدد أس صفر يساوي 1؟', answer: 'لأن س^0 = س^(ن-ن) = س^ن ÷ س^ن = 1.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula potencias matemáticas (base^exponente) para bases enteras y fraccionarias.`,
    howToUse: [
      'Introduzca el número base.',
      'Introduzca el exponente al que elevarlo.',
      'Consulte la potencia resultante.'
    ],
    formula: 'Resultado = Base^Exponente',
    formulaVariables: [
      { name: 'Base', description: 'Número a multiplicar.', unit: 'Número', optional: false },
      { name: 'Exponente', description: 'Potencia de elevación.', unit: 'Exponente', optional: false }
    ],
    workedExample: {
      scenario: 'Calcular 2 elevado a la 8 (2^8).',
      stepByStep: [
        'Multiplicar 2 por sí mismo 8 veces.',
        'Secuencia: 2, 4, 8, 16, 32, 64, 128, 256.'
      ],
      result: '2^8 = 256,0'
    },
    interpretation: 'Modela el crecimiento exponencial en informática y física.',
    assumptions: 'Valores numéricos reales.',
    limitations: 'Bases negativas con exponentes no enteros generan soluciones complejas.',
    faqs: [
      { question: '¿Por qué cualquier número elevado a 0 es 1?', answer: 'Por la propiedad de cocientes de potencias de igual base: a^n / a^n = a^(n-n) = a^0 = 1.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule les puissances exponentielles (base^exposant) de nombres réels.`,
    howToUse: [
      'Indiquez le nombre de base.',
      'Indiquez l\'exposant.',
      'Consultez le résultat de la puissance.'
    ],
    formula: 'Résultat = Base^Exposant',
    formulaVariables: [
      { name: 'Base', description: 'Nombre à élever.', unit: 'Nombre', optional: false },
      { name: 'Exposant', description: 'Puissance appliquée.', unit: 'Exposant', optional: false }
    ],
    workedExample: {
      scenario: 'Calcul de 2 puissance 8 (2^8).',
      stepByStep: [
        'Multiplication répétée de 2 huit fois.',
        'Résultat final : 256.'
      ],
      result: '2^8 = 256,0'
    },
    interpretation: 'Indispensable en informatique pour l\'adressage mémoire en octets (puissances de 2).',
    assumptions: 'Nombres réels.',
    limitations: 'Bases négatives avec exposants décimaux non définies dans les réels.',
    faqs: [
      { question: 'Que signifie un exposant négatif ?', answer: 'Il représente l\'inverse de la puissance positive : a^(-n) = 1 / (a^n).' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet mathematische Potenzen (Basis^Exponent) für ganzzahlige und rationale Werte.`,
    howToUse: [
      'Geben Sie die Basis ein.',
      'Geben Sie den Exponenten ein.',
      'Lesen Sie das Potenzergebnis ab.'
    ],
    formula: 'Ergebnis = Basis^Exponent',
    formulaVariables: [
      { name: 'Basis', description: 'Zu potenzierende Zahl.', unit: 'Zahl', optional: false },
      { name: 'Exponent', description: 'Hochzahl.', unit: 'Exponent', optional: false }
    ],
    workedExample: {
      scenario: 'Berechnung von 2 hoch 8 (2^8).',
      stepByStep: [
        'Achtfache Multiplikation der Zahl 2 mit sich selbst.',
        'Ergebnis: 256.'
      ],
      result: '2^8 = 256,0'
    },
    interpretation: 'Grundlage für binäre Adressierungen im Byte-Format in der Informatik.',
    assumptions: 'Reelle Zahlenwerte.',
    limitations: 'Negative Basen mit gebrochenen Exponenten sind im Reellen nicht definiert.',
    faqs: [
      { question: 'Was bedeutet ein negativer Exponent?', answer: 'Ein negativer Exponent bedeutet den Kehrwert der Potenz: a^(-n) = 1 / (a^n).' }
    ],
    relatedTools
  })
});

// 12. LOGARITHMS (logarithm)
export const LOGARITHM_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates common logarithms (log₁₀), natural logarithms (ln / log_e), and binary logarithms (log₂) for positive real numbers.`,
    howToUse: [
      'Enter a positive real number (x > 0).',
      'Review the calculated common log (base 10), natural log (base e), and binary log (base 2).'
    ],
    formula: 'log₁₀(x) | ln(x) = log_e(x) | log₂(x) = ln(x) / ln(2)',
    formulaVariables: [
      { name: 'Number (x)', description: 'Positive real input.', unit: 'x > 0', optional: false }
    ],
    workedExample: {
      scenario: 'Calculating logarithms of x = 100.',
      stepByStep: [
        'Common log (base 10): 10² = 100 -> log₁₀(100) = 2.000.',
        'Natural log (base e ≈ 2.71828): ln(100) = 4.6052.',
        'Binary log (base 2): log₂(100) = 6.6439.'
      ],
      result: 'log₁₀(100) = 2.00 | ln(100) = 4.61 | log₂(100) = 6.64'
    },
    interpretation: 'Logarithmic scales represent acoustic loudness (decibels), chemical acidity (pH), earthquake intensity (Richter), and algorithmic computational complexity.',
    assumptions: 'Input x must be strictly positive (x > 0).',
    limitations: 'Logarithms of zero or negative numbers are undefined in real arithmetic.',
    faqs: [
      { question: 'What is the natural logarithm base e?', answer: 'Euler\'s number e (≈ 2.71828) is the natural base of continuous mathematical growth.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب اللوغاريتم العشري (أساس 10) واللوغاريتم الطبيعي (أساس هـ) واللوغاريتم الثنائي (أساس 2) للأعداد الحقيقية الموجبة.`,
    howToUse: [
      'أدخل عدداً حقيقياً موجباً (س > 0).',
      'راجع قيم اللوغاريتم العشري واللوغاريتم الطبيعي والثنائي المحسوبة.'
    ],
    formula: 'لو₁₀(س) | لو الطبيعي لن(س) | لو₂(س)',
    formulaVariables: [
      { name: 'العدد (س)', description: 'عدد حقيقي موجب أكبر من صفر.', unit: 'س > 0', optional: false }
    ],
    workedExample: {
      scenario: 'حساب لوغاريتمات العدد 100.',
      stepByStep: [
        'اللوغاريتم العشري: 10² = 100 -> لو₁₀(100) = 2.00.',
        'اللوغاريتم الطبيعي: لن(100) = 4.6052.',
        'اللوغاريتم الثنائي: لو₂(100) = 6.6439.'
      ],
      result: 'لو₁₀(100) = 2.00 | لن(100) = 4.61 | لو₂(100) = 6.64'
    },
    interpretation: 'تستخدم المقاييس اللوغاريتمية في قياس شدة الصوت (الديسيبل) والزلازل (ريختر) ودرجة الحموضة (pH).',
    assumptions: 'يجب أن يكون العدد المدخل موجباً قطعا (س > 0).',
    limitations: 'لوغاريتم الصفر والأعداد السالبة غير معرف في الأعداد الحقيقية.',
    faqs: [
      { question: 'ما هو الثابت الطبيعي e (هـ)؟', answer: 'عدد أويلر (≈ 2.71828) هو الأساس الطبيعي لمعدلات النمو والتضاؤل المستمر في الكون.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el logaritmo decimal (base 10), el logaritmo natural (base e) y el logaritmo binario (base 2) para números reales positivos.`,
    howToUse: [
      'Introduzca un número real positivo (x > 0).',
      'Consulte los resultados de log₁₀(x), ln(x) y log₂(x).'
    ],
    formula: 'log₁₀(x) | ln(x) | log₂(x) = ln(x) / ln(2)',
    formulaVariables: [
      { name: 'Número (x)', description: 'Valor positivo.', unit: 'x > 0', optional: false }
    ],
    workedExample: {
      scenario: 'Logaritmos de x = 100.',
      stepByStep: [
        'Logaritmo decimal: log₁₀(100) = 2,00.',
        'Logaritmo neperiano / natural: ln(100) = 4,6052.',
        'Logaritmo binario: log₂(100) = 6,6439.'
      ],
      result: 'log₁₀(100) = 2,00 | ln(100) = 4,61 | log₂(100) = 6,64'
    },
    interpretation: 'Escalas logarítmicas empleadas en acústica (decibelios), química (pH) y sismología (escala de Richter).',
    assumptions: 'Argumento estrictamente mayor que cero.',
    limitations: 'No definido para valores menores o iguales a cero.',
    faqs: [
      { question: '¿Por qué log₁₀(100) es 2?', answer: 'Porque el logaritmo responde a la pregunta: ¿A qué exponente debo elevar 10 para obtener 100? Y 10² = 100.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule le logarithme décimal (log₁₀), le logarithme népérien (ln) et le logarithme binaire (log₂) pour tout réel strictement positif.`,
    howToUse: [
      'Indiquez un nombre réel positif (x > 0).',
      'Consultez les valeurs respectives de log₁₀, ln et log₂.'
    ],
    formula: 'log₁₀(x) | ln(x) | log₂(x) = ln(x) / ln(2)',
    formulaVariables: [
      { name: 'Nombre (x)', description: 'Réel strictement positif.', unit: 'x > 0', optional: false }
    ],
    workedExample: {
      scenario: 'Logarithmes pour x = 100.',
      stepByStep: [
        'Logarithme décimal : log₁₀(100) = 2,00.',
        'Logarithme naturel : ln(100) = 4,6052.',
        'Logarithme binaire : log₂(100) = 6,6439.'
      ],
      result: 'log₁₀(100) = 2,00 | ln(100) = 4,61 | log₂(100) = 6,64'
    },
    interpretation: 'Modélisation des échelles compressives : acoustique, magnitude des séismes et complexité algorithmique.',
    assumptions: 'x > 0.',
    limitations: 'Indéfini pour zéro et les nombres négatifs.',
    faqs: [
      { question: 'Quelle est la constante e ?', answer: 'Le nombre d\'Euler (environ 2,71828), base des fonctions exponentielles et logarithmiques naturelles.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet den dekadischen Logarithmus (log₁₀), den natürlichen Logarithmus (ln) und den binären Logarithmus (log₂) für positive reelle Zahlen.`,
    howToUse: [
      'Geben Sie eine reelle Zahl größer null ein (x > 0).',
      'Lesen Sie log₁₀, ln und log₂ ab.'
    ],
    formula: 'log₁₀(x) | ln(x) | log₂(x) = ln(x) / ln(2)',
    formulaVariables: [
      { name: 'Zahl (x)', description: 'Reelle Zahl > 0.', unit: 'x > 0', optional: false }
    ],
    workedExample: {
      scenario: 'Logarithmen von x = 100.',
      stepByStep: [
        'Zehnerlogarithmus: log₁₀(100) = 2,00.',
        'Natürlicher Logarithmus: ln(100) = 4,6052.',
        'Zweierlogarithmus: log₂(100) = 6,6439.'
      ],
      result: 'log₁₀(100) = 2,00 | ln(100) = 4,61 | log₂(100) = 6,64'
    },
    interpretation: 'Grundlage für logarithmische Messskalen wie Dezibel (Lautstärke), pH-Wert und Erdbebenstärke (Richterskala).',
    assumptions: 'Zahl x muss strikt positiv sein.',
    limitations: 'Nicht definiert für Zahlen kleiner oder gleich null.',
    faqs: [
      { question: 'Wofür wird log₂ verwendet?', answer: 'In der Informationstheorie zur Bestimmung von Bit-Längen und Komplexitätsklassen von Algorithmen.' }
    ],
    relatedTools
  })
});

// Map of second 6 Batch 1 math tools
export const BATCH1_MATH2_HANDLERS: Record<string, Record<Language, KnowledgeHandler>> = {
  'area-perimeter': AREA_PERIMETER_KNOWLEDGE,
  volume: VOLUME_KNOWLEDGE,
  'prime-checker': PRIME_CHECKER_KNOWLEDGE,
  factorial: FACTORIAL_KNOWLEDGE,
  'exponent-power': EXPONENT_POWER_KNOWLEDGE,
  logarithm: LOGARITHM_KNOWLEDGE,
};
