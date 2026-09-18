import { ToolDef, Language } from '../../types';
import { ToolContentDetails } from './types';

type KnowledgeHandler = (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails;

function createKnowledge(dataByLang: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails>): Record<Language, KnowledgeHandler> {
  return dataByLang;
}

// 1. SLOPE OF A LINE CALCULATOR (slope-line)
export const SLOPE_LINE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates the slope (gradient m), slope-intercept equation (y = mx + b), angle of inclination (θ), distance, and X/Y intercepts between two Cartesian coordinate points (x₁, y₁) and (x₂, y₂).`,
    howToUse: [
      'Enter the coordinates for Point 1 (x₁, y₁).',
      'Enter the coordinates for Point 2 (x₂, y₂).',
      'Review the calculated slope (m), full linear equation (y = mx + b), Euclidean distance, and angle of inclination in degrees.'
    ],
    formula: 'Slope m = (y₂ - y₁) / (x₂ - x₁) | y-Intercept b = y₁ - m · x₁ | Distance d = √[(x₂ - x₁)² + (y₂ - y₁)²] | Angle θ = arctan(m)',
    formulaVariables: [
      { name: 'Point 1 (x₁, y₁)', description: 'First coordinate pair.', unit: 'Coordinates', optional: false },
      { name: 'Point 2 (x₂, y₂)', description: 'Second coordinate pair.', unit: 'Coordinates', optional: false }
    ],
    workedExample: {
      scenario: 'Finding the slope, line equation, and distance between points (2, 3) and (6, 11).',
      stepByStep: [
        'Calculate slope m: (11 - 3) / (6 - 2) = 8 / 4 = 2.0.',
        'Calculate y-intercept b: 3 - (2.0 × 2) = 3 - 4 = -1.0.',
        'Line equation: y = 2x - 1.',
        'Distance d: √[(6 - 2)² + (11 - 3)²] = √[16 + 64] = √80 ≈ 8.944 units.',
        'Angle θ: arctan(2.0) = 63.43°.'
      ],
      result: 'Slope m = 2.0 | Equation: y = 2x - 1 | Distance: 8.94 units | Angle: 63.43°'
    },
    interpretation: 'Fundamental for algebra, coordinate geometry, civil engineering grade calculations, and computer graphics vector paths.',
    assumptions: 'Standard 2D Cartesian plane.',
    limitations: 'Vertical lines (x₁ = x₂) yield an undefined slope (infinite gradient) with an equation form x = constant.',
    faqs: [
      { question: 'What does a slope of 0 mean?', answer: 'A slope of 0 indicates a completely horizontal line parallel to the X-axis with constant Y values (y = b).' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب ميل الخط المستقيم (m)، ومعادلة المستقيم (y = mx + b)، وزاوية الميلان (θ)، والمسافة الإقليدية بين نقطتين في المستوى الإحداثي الديكارتي.`,
    howToUse: [
      'أدخل إحداثيات النقطة الأولى (x₁, y₁).',
      'أدخل إحداثيات النقطة الثانية (x₂, y₂).',
      'اطلع على قيمة الميل (m)، ومعادلة الخط المستقيم الكاملة، والمسافة بين النقطتين، وزاوية الانحدار.'
    ],
    formula: 'الميل m = (y₂ - y₁) ÷ (x₂ - x₁) | المقطع الصادي b = y₁ - m · x₁ | المسافة = √[(x₂ - x₁)² + (y₂ - y₁)²]',
    formulaVariables: [
      { name: 'النقطة الأولى (x₁, y₁)', description: 'إحداثيات النقطة الأولى.', unit: 'إحداثيات', optional: false },
      { name: 'النقطة الثانية (x₂, y₂)', description: 'إحداثيات النقطة الثانية.', unit: 'إحداثيات', optional: false }
    ],
    workedExample: {
      scenario: 'حساب الميل ومعادلة المستقيم والمسافة بين النقطتين (2, 3) و (6, 11).',
      stepByStep: [
        'حساب الميل m: (11 - 3) ÷ (6 - 2) = 8 ÷ 4 = 2.0.',
        'حساب المقطع الصادي b: 3 - (2 × 2) = -1.0.',
        'معادلة المستقيم: y = 2x - 1.',
        'المسافة: √[16 + 64] = √80 ≈ 8.944 وحدة.',
        'زاوية الميل: arctan(2.0) = 63.43 درجة.'
      ],
      result: 'الميل m = 2.0 | المعادلة: y = 2x - 1 | المسافة: 8.94 وحدة | زاوية الميل: 63.43°'
    },
    interpretation: 'أساسية لدروس الجبر والهندسة التحليلية، وحساب انحدار الطرق، والبرمجة الهندسية ثلاثية الأبعاد.',
    assumptions: 'مستوى ديكارتي ثنائي الأبعاد.',
    limitations: 'الخطوط الرأسية العمودية (x₁ = x₂) يكون ميلها غير معرّف (ميل لا نهائي).',
    faqs: [
      { question: 'ماذا يعني الميل المساوي للصفر؟', answer: 'يعني أن الخط المستقيم أفقي تماماً وموازٍ لمحور السينات (X).' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la pendiente (m), la ecuación explícita de la recta (y = mx + b), el ángulo de inclinación, la distancia euclídea y los puntos de corte entre dos coordenadas (x₁, y₁) y (x₂, y₂).`,
    howToUse: [
      'Introduzca las coordenadas del Punto 1 (x₁, y₁).',
      'Introduzca las coordenadas del Punto 2 (x₂, y₂).',
      'Consulte la pendiente resultante, la ecuación analítica de la recta y la distancia geométrica.'
    ],
    formula: 'Pendiente m = (y₂ - y₁) / (x₂ - x₁) | Corte y: b = y₁ - m · x₁ | Distancia d = √[(x₂ - x₁)² + (y₂ - y₁)²]',
    formulaVariables: [
      { name: 'Punto 1 (x₁, y₁)', description: 'Primera coordenada.', unit: 'Punto', optional: false },
      { name: 'Punto 2 (x₂, y₂)', description: 'Segunda coordenada.', unit: 'Punto', optional: false }
    ],
    workedExample: {
      scenario: 'Calcular pendiente y recta entre los puntos (2, 3) y (6, 11).',
      stepByStep: [
        'Pendiente m: (11 - 3) / (6 - 2) = 8 / 4 = 2,0.',
        'Ordenada en el origen b: 3 - (2,0 × 2) = -1,0.',
        'Ecuación: y = 2x - 1.',
        'Distancia d: √[(4)² + (8)²] = √80 ≈ 8,94 unidades.',
        'Ángulo: arctan(2,0) = 63,43°.'
      ],
      result: 'Pendiente m = 2,0 | Ecuación: y = 2x - 1 | Distancia: 8,94 | Ángulo: 63,43°'
    },
    interpretation: 'Herramienta clave en álgebra, geometría analítica y cálculo de pendientes en obras viales.',
    assumptions: 'Plano bidimensional euclidiano.',
    limitations: 'Las rectas verticales (x₁ = x₂) tienen pendiente indefinida (infinita).',
    faqs: [
      { question: '¿Cómo saber si dos rectas son perpendiculares?', answer: 'Dos rectas son perpendiculares si el producto de sus pendientes es igual a -1 (m₁ × m₂ = -1).' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule le coefficient directeur (pente m), l'équation réduite de droite (y = mx + b), l'angle d'inclinaison et la distance euclidienne entre deux points (x₁, y₁) et (x₂, y₂).`,
    howToUse: [
      'Entrez les coordonnées du Point 1 (x₁, y₁).',
      'Entrez les coordonnées du Point 2 (x₂, y₂).',
      'Obtenez le coefficient directeur m, l\'ordonnée à l\'origine b et la longueur du segment.'
    ],
    formula: 'Pente m = (y₂ - y₁) / (x₂ - x₁) | Ordonnée à l\'origine b = y₁ - m · x₁ | Distance d = √[(x₂ - x₁)² + (y₂ - y₁)²]',
    formulaVariables: [
      { name: 'Point 1 (x₁, y₁)', description: 'Coordonnées initiales.', unit: 'Coordonnées', optional: false },
      { name: 'Point 2 (x₂, y₂)', description: 'Coordonnées finales.', unit: 'Coordonnées', optional: false }
    ],
    workedExample: {
      scenario: 'Calcul de la droite passant par les points (2, 3) et (6, 11).',
      stepByStep: [
        'Coefficient directeur m : (11 - 3) / (6 - 2) = 8 / 4 = 2,0.',
        'Ordonnée à l\'origine b : 3 - (2,0 × 2) = -1,0.',
        'Équation réduite : y = 2x - 1.',
        'Distance : √[16 + 64] = √80 ≈ 8,94 unités.',
        'Angle : arctan(2,0) = 63,43°.'
      ],
      result: 'Pente m = 2,0 | Équation : y = 2x - 1 | Distance : 8,94 | Angle : 63,43°'
    },
    interpretation: 'Essentiel pour l\'analyse fonctionnelle, les mathématiques scolaires et le génie civil.',
    assumptions: 'Repère orthonormé cartésien à 2 dimensions.',
    limitations: 'Une droite verticale présente une pente indéfinie (division par zéro).',
    faqs: [
      { question: 'Que signifie une pente négative ?', answer: 'Une pente négative (m < 0) indique que la droite descend de gauche à droite.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die Steigung (m), die Geradengleichung (y = mx + b), den Steigungswinkel in Grad und den euklidischen Abstand zwischen zwei Koordinatenpunkten (x₁, y₁) und (x₂, y₂).`,
    howToUse: [
      'Geben Sie die Koordinaten von Punkt 1 (x₁, y₁) ein.',
      'Geben Sie die Koordinaten von Punkt 2 (x₂, y₂) ein.',
      'Lesen Sie Steigung m, Y-Achsenabschnitt b, Geradengleichung und Streckenlänge ab.'
    ],
    formula: 'Steigung m = (y₂ - y₁) / (x₂ - x₁) | Y-Achsenabschnitt b = y₁ - m · x₁ | Abstand d = √[(x₂ - x₁)² + (y₂ - y₁)²]',
    formulaVariables: [
      { name: 'Punkt 1 (x₁, y₁)', description: 'Erstes Koordinatenpaar.', unit: 'Koordinaten', optional: false },
      { name: 'Punkt 2 (x₂, y₂)', description: 'Zweites Koordinatenpaar.', unit: 'Koordinaten', optional: false }
    ],
    workedExample: {
      scenario: 'Bestimmung der Steigung und Geradengleichung für die Punkte (2, 3) und (6, 11).',
      stepByStep: [
        'Steigung berechnen: m = (11 - 3) / (6 - 2) = 8 / 4 = 2,0.',
        'Y-Achsenabschnitt: b = 3 - (2,0 × 2) = -1,0.',
        'Geradengleichung: y = 2x - 1.',
        'Abstand: d = √[16 + 64] = √80 ≈ 8,94 Längeneinheiten.',
        'Steigungswinkel: arctan(2,0) = 63,43°.'
      ],
      result: 'Steigung m = 2,0 | Gleichung: y = 2x - 1 | Abstand: 8,94 LE | Winkel: 63,43°'
    },
    interpretation: 'Grundwerkzeug für lineare Algebra, analytische Geometrie, Steigungsberechnungen im Straßenbau und Physik.',
    assumptions: 'Kartesisches 2D-Koordinatensystem.',
    limitations: 'Senkrechte Geraden (x₁ = x₂) besitzen eine nicht definierte (unendliche) Steigung.',
    faqs: [
      { question: 'Wann sind zwei Geraden parallel?', answer: 'Zwei Geraden sind genau dann parallel zueinander, wenn ihre Steigungen identisch sind (m₁ = m₂).' }
    ],
    relatedTools
  })
});

// 2. MATRIX MULTIPLICATION CALCULATOR (matrix-mult)
export const MATRIX_MULT_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} multiplies 2D matrices (A × B), verifying dimensional compatibility (columns of A must equal rows of B) and computing step-by-step dot products for linear algebra.`,
    howToUse: [
      'Select the dimensions (rows × columns) for Matrix A and Matrix B.',
      'Enter the numerical elements for each matrix cell.',
      'Verify that columns of Matrix A equal rows of Matrix B.',
      'Review the product matrix C and step-by-step vector dot product calculations.'
    ],
    formula: 'C[i, j] = ∑ (A[i, k] × B[k, j]) for k = 1 to n (where Matrix A is m×n and Matrix B is n×p)',
    formulaVariables: [
      { name: 'Matrix A (m × n)', description: 'First multiplicand matrix.', unit: 'Matrix', optional: false },
      { name: 'Matrix B (n × p)', description: 'Second multiplier matrix.', unit: 'Matrix', optional: false }
    ],
    workedExample: {
      scenario: 'Multiplying 2×2 Matrix A [[1, 2], [3, 4]] by 2×2 Matrix B [[5, 6], [7, 8]].',
      stepByStep: [
        'C[1,1] = (1×5) + (2×7) = 5 + 14 = 19.',
        'C[1,2] = (1×6) + (2×8) = 6 + 16 = 22.',
        'C[2,1] = (3×5) + (4×7) = 15 + 28 = 43.',
        'C[2,2] = (3×6) + (4×8) = 18 + 32 = 50.'
      ],
      result: 'Resulting Matrix C = [[19, 22], [43, 50]]'
    },
    interpretation: 'Core computational engine in linear transformations, 3D computer graphics shaders, neural network forward passes, and quantum physics.',
    assumptions: 'Standard linear algebra matrix operations.',
    limitations: 'Matrix multiplication is non-commutative in general (A × B ≠ B × A).',
    faqs: [
      { question: 'When can two matrices be multiplied?', answer: 'Matrix multiplication is only defined when the number of columns in the first matrix matches the number of rows in the second matrix.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بضرب المصفوفات الرياضية (A × B) والتحقق من توافق الأبعاد وحساب الجداء القياسي خطوة بخطوة في الجبر الخطي.`,
    howToUse: [
      'حدد أبعاد المصفوفة الأولى A (الصفوف × الأعمدة) والمصفوفة الثانية B.',
      'أدخل الأرقام في خلايا كل مصفوفة.',
      'تأكد من أن عدد أعمدة المصفوفة A يساوي عدد صفوف المصفوفة B.',
      'اطلع على مصفوفة الناتج C وخطوات الضرب التفصيلية.'
    ],
    formula: 'العنصر C[i, j] = مجموع (A[i, k] × B[k, j]) حيث k يتحرك عبر الأعمدة والصفوف المشتركة',
    formulaVariables: [
      { name: 'المصفوفة A', description: 'المصفوفة الأولى ذات الأبعاد m × n.', unit: 'مصفوفة', optional: false },
      { name: 'المصفوفة B', description: 'المصفوفة الثانية ذات الأبعاد n × p.', unit: 'مصفوفة', optional: false }
    ],
    workedExample: {
      scenario: 'ضرب مصفوفة 2×2 [[1, 2], [3, 4]] في مصفوفة 2×2 [[5, 6], [7, 8]].',
      stepByStep: [
        'الصف 1 العمود 1: (1×5) + (2×7) = 5 + 14 = 19.',
        'الصف 1 العمود 2: (1×6) + (2×8) = 6 + 16 = 22.',
        'الصف 2 العمود 1: (3×5) + (4×7) = 15 + 28 = 43.',
        'الصف 2 العمود 2: (3×6) + (4×8) = 18 + 32 = 50.'
      ],
      result: 'المصفوفة الناتجة C = [[19, 22], [43, 50]]'
    },
    interpretation: 'أساس حسابات التحويلات الهندسية، ومعالجة الصور والرسوميات ثلاثية الأبعاد، وتدريب الشبكات العصبية والذكاء الاصطناعي.',
    assumptions: 'عمليات الجبر الخطي القياسية.',
    limitations: 'ضرب المصفوفات عملية غير تبديلية بشكل عام (A × B ≠ B × A).',
    faqs: [
      { question: 'ما هو شرط إمكانية ضرب مصفوفتين؟', answer: 'يجب أن يكون عدد أعمدة المصفوفة الأولى مساوياً تماماً لعدد صفوف المصفوفة الثانية.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} multiplica matrices numéricas (A × B), comprobando la compatibilidad de dimensiones y calculando el producto escalar celda por celda para álgebra lineal.`,
    howToUse: [
      'Seleccione las dimensiones (filas × columnas) de la Matriz A y la Matriz B.',
      'Introduzca los valores en las celdas.',
      'Verifique que las columnas de A coincidan con las filas de B.',
      'Consulte la matriz resultante C y el desglose de productos.'
    ],
    formula: 'C[i, j] = ∑ (A[i, k] × B[k, j])',
    formulaVariables: [
      { name: 'Matriz A', description: 'Matriz de tamaño m × n.', unit: 'Matriz', optional: false },
      { name: 'Matriz B', description: 'Matriz de tamaño n × p.', unit: 'Matriz', optional: false }
    ],
    workedExample: {
      scenario: 'Multiplicación de matrices 2×2: [[1, 2], [3, 4]] por [[5, 6], [7, 8]].',
      stepByStep: [
        'C₁₁ = (1×5) + (2×7) = 19.',
        'C₁₂ = (1×6) + (2×8) = 22.',
        'C₂₁ = (3×5) + (4×7) = 43.',
        'C₂₂ = (3×6) + (4×8) = 50.'
      ],
      result: 'Matriz producto C = [[19, 22], [43, 50]]'
    },
    interpretation: 'Pilar fundamental de la computación gráfica 3D, transformaciones espaciales y redes neuronales.',
    assumptions: 'Álgebra lineal matricial estándar.',
    limitations: 'El producto de matrices no es conmutativo (A × B ≠ B × A).',
    faqs: [
      { question: '¿Qué dimensión tiene la matriz resultante?', answer: 'Si se multiplica una matriz de m×n por otra de n×p, la matriz resultante tendrá dimensiones m×p.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} effectue la multiplication de matrices (A × B), vérifie la compatibilité des dimensions et détaille le calcul du produit scalaire pas à pas.`,
    howToUse: [
      'Définissez les dimensions (lignes × colonnes) des matrices A et B.',
      'Remplissez les coefficients dans chaque cellule.',
      'Vérifiez que le nombre de colonnes de A est égal au nombre de lignes de B.',
      'Consultez la matrice résultat C.'
    ],
    formula: 'C[i, j] = ∑ (A[i, k] × B[k, j])',
    formulaVariables: [
      { name: 'Matrice A', description: 'Matrice de taille m × n.', unit: 'Matrice', optional: false },
      { name: 'Matrice B', description: 'Matrice de taille n × p.', unit: 'Matrice', optional: false }
    ],
    workedExample: {
      scenario: 'Multiplication de deux matrices 2×2 [[1, 2], [3, 4]] et [[5, 6], [7, 8]].',
      stepByStep: [
        'C₁₁ = (1×5) + (2×7) = 19.',
        'C₁₂ = (1×6) + (2×8) = 22.',
        'C₂₁ = (3×5) + (4×7) = 43.',
        'C₂₂ = (3×6) + (4×8) = 50.'
      ],
      result: 'Matrice produit C = [[19, 22], [43, 50]]'
    },
    interpretation: 'Moteur central des transformations 3D, du traitement du signal et des algorithmes d\'intelligence artificielle.',
    assumptions: 'Règles de l\'algèbre linéaire.',
    limitations: 'La multiplication matricielle n\'est généralement pas commutative.',
    faqs: [
      { question: 'Pourquoi le produit de deux matrices n\'est-il pas commutatif ?', answer: 'Car l\'ordre des lignes et colonnes change la correspondance des produits scalaires, ce qui donne un résultat différent.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} multipliziert Matrizen (A × B), prüft die Dimensionskompatibilität (Spalten von A = Zeilen von B) und zeigt die schrittweise Vektorberechnung.`,
    howToUse: [
      'Wählen Sie die Dimensionen (Zeilen × Spalten) für Matrix A und Matrix B.',
      'Tragen Sie die numerischen Zahlenwerte in die Matrizenfelder ein.',
      'Stellen Sie sicher, dass die Spaltenanzahl von A der Zeilenanzahl von B entspricht.',
      'Lesen Sie die Produktmatrix C und den Rechenweg ab.'
    ],
    formula: 'C[i, j] = ∑ (A[i, k] × B[k, j])',
    formulaVariables: [
      { name: 'Matrix A', description: 'Ausgangsmatrix der Größe m × n.', unit: 'Matrix', optional: false },
      { name: 'Matrix B', description: 'Zweite Matrix der Größe n × p.', unit: 'Matrix', optional: false }
    ],
    workedExample: {
      scenario: 'Multiplikation zweier 2×2-Matrizen [[1, 2], [3, 4]] und [[5, 6], [7, 8]].',
      stepByStep: [
        'C₁₁ = (1×5) + (2×7) = 19.',
        'C₁₂ = (1×6) + (2×8) = 22.',
        'C₂₁ = (3×5) + (4×7) = 43.',
        'C₂₂ = (3×6) + (4×8) = 50.'
      ],
      result: 'Ergebnismatrix C = [[19, 22], [43, 50]]'
    },
    interpretation: 'Grundbaustein für 3D-Computergrafik-Shader, physikalische Simulationen und neuronale Netze.',
    assumptions: 'Regeln der linearen Algebra.',
    limitations: 'Die Matrizenmultiplikation ist im Allgemeinen nicht kommutativ (A × B ≠ B × A).',
    faqs: [
      { question: 'Welche Dimension hat die Ergebnismatrix?', answer: 'Beim Multiplizieren einer m×n-Matrix mit einer n×p-Matrix entsteht immer eine m×p-Matrix.' }
    ],
    relatedTools
  })
});

// 3. COMBINATIONS & PERMUTATIONS CALCULATOR (combination-permutation)
export const COMBINATION_PERMUTATION_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates combinations (nCr, order does not matter) and permutations (nPr, order matters) for selecting r items from a set of n total items with factorial expansions.`,
    howToUse: [
      'Enter the total number of items in the set (n).',
      'Enter the number of items to select or arrange (r).',
      'Choose between Combinations (unordered nCr) or Permutations (ordered nPr).',
      'Review total calculated combinations, permutations, and full factorial mathematical breakdown.'
    ],
    formula: 'Combinations: nCr = n! / [r! · (n - r)!] | Permutations: nPr = n! / (n - r)!',
    formulaVariables: [
      { name: 'Total Items (n)', description: 'Size of total population set.', unit: 'Integer n ≥ 0', optional: false },
      { name: 'Selected Items (r)', description: 'Number of items chosen.', unit: 'Integer 0 ≤ r ≤ n', optional: false }
    ],
    workedExample: {
      scenario: 'Choosing a 4-person committee from a group of 10 people (Combinations nCr) versus assigning 4 distinct officer roles (Permutations nPr).',
      stepByStep: [
        'Combinations nCr: 10! / [4! × (10 - 4)!] = 10! / (24 × 720) = 3,628,800 / 17,280 = 210 unique committees.',
        'Permutations nPr: 10! / (10 - 4)! = 10! / 720 = 3,628,800 / 720 = 5,040 ordered role arrangements.'
      ],
      result: 'Combinations nCr = 210 | Permutations nPr = 5,040'
    },
    interpretation: 'Essential for probability theory, lottery jackpot odds calculations, roster scheduling, and cryptographic keyspace estimation.',
    assumptions: 'Sampling without replacement from discrete finite sets.',
    limitations: 'Calculations for very large n (n > 170) exceed standard 64-bit floating point limits without BigInt or Stirling approximation.',
    faqs: [
      { question: 'What is the main difference between combinations and permutations?', answer: 'In permutations, the order of selection matters (e.g., combination locks, race finishes). In combinations, the order does not matter (e.g., lottery tickets, card hands).' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب التوافيق (nCr - الترتيب غير مهم) والتباديل (nPr - الترتيب مهم) لاختيار r من العناصر من بين مجموعة كلية تتكون من n من العناصر مع تفصيل المضروب الرياضي (!n).`,
    howToUse: [
      'أدخل إجمالي عدد عناصر المجموعة (n).',
      'أدخل عدد العناصر المراد اختيارها أو ترتيبها (r).',
      'اختر نوع العملية (توافيق nCr أو تباديل nPr).',
      'اطلع على إجمالي الطرق الممكنة والمعادلة الرياضية المفصلة.'
    ],
    formula: 'التوافيق: nCr = !n ÷ [!r × !(n - r)] | التباديل: nPr = !n ÷ !(n - r)',
    formulaVariables: [
      { name: 'العدد الإجمالي (n)', description: 'إجمالي عناصر المجموعة.', unit: 'عدد صحيح موجب', optional: false },
      { name: 'العناصر المختارة (r)', description: 'عدد العناصر المطلوب سحبها.', unit: 'عدد صحيح', optional: false }
    ],
    workedExample: {
      scenario: 'اختيار لجنة مكونة من 4 أشخاص من بين 10 أشخاص (توافيق) مقابل تحديد 4 مناصب إدارية مختلفة (تباديل).',
      stepByStep: [
        'حساب التوافيق nCr: 10! ÷ [4! × 6!] = 3,628,800 ÷ 17,280 = 210 لجنة ممكنة.',
        'حساب التباديل nPr: 10! ÷ 6! = 3,628,800 ÷ 720 = 5,040 طريقة ترتيب.'
      ],
      result: 'التوافيق nCr = 210 طريقة | التباديل nPr = 5,040 طريقة'
    },
    interpretation: 'أساسية لحساب احتمالات ألعاب الحظ، وجداول التوزيع الإحصائي، وعلم التشفير والحماية.',
    assumptions: 'السحب بدون إرجاع من مجموعة محددة.',
    limitations: 'تتطلب الأعداد الكبيرة جداً دقة معالجة عالية للأرقام الفلكية.',
    faqs: [
      { question: 'ما الفرق الجوهري بين التباديل والتوافيق؟', answer: 'في التباديل، الترتيب جوهري ومهم (مثل ترتيب الفائزين بالمراكز الأولى)، بينما في التوافيق، الترتيب لا أهمية له (مثل اختيار فريق عمل).' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula combinaciones (nCr, el orden no importa) y permutaciones (nPr, el orden sí importa) para seleccionar r elementos de un conjunto total de n elementos con desglose factorial.`,
    howToUse: [
      'Introduzca el número total de elementos (n).',
      'Introduzca los elementos a seleccionar (r).',
      'Elija Combinaciones (sin orden) o Permutaciones (con orden).',
      'Consulte el total de posibilidades y el desarrollo con factoriales.'
    ],
    formula: 'Combinaciones: nCr = n! / [r! · (n - r)!] | Permutaciones: nPr = n! / (n - r)!',
    formulaVariables: [
      { name: 'Total elementos (n)', description: 'Tamaño del conjunto.', unit: 'Entero n ≥ 0', optional: false },
      { name: 'Seleccionados (r)', description: 'Elementos elegidos.', unit: 'Entero 0 ≤ r ≤ n', optional: false }
    ],
    workedExample: {
      scenario: 'Elegir un comité de 4 personas entre 10 candidatos (combinaciones) frente a asignar 4 cargos jerárquicos (permutaciones).',
      stepByStep: [
        'Combinaciones nCr: 10! / (4! × 6!) = 210 comités distintos.',
        'Permutaciones nPr: 10! / 6! = 5.040 asignaciones posibles.'
      ],
      result: 'Combinaciones: 210 | Permutaciones: 5.040'
    },
    interpretation: 'Indispensable en teoría de probabilidad, combinatoria, juegos de azar y criptografía.',
    assumptions: 'Muestreo sin reemplazo.',
    limitations: 'Valores muy altos de n requieren cálculos de precisión arbitraria para evitar desbordamientos.',
    faqs: [
      { question: '¿Por qué las permutaciones siempre son mayores o iguales que las combinaciones?', answer: 'Porque cada grupo de r elementos puede ordenarse internamente de r! formas distintas, multiplicando el número de posibilidades.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule les combinaisons (nCr, l'ordre n'importe pas) et les permutations (nPr, l'ordre compte) pour sélectionner r éléments parmi n avec décomposition factorielle.`,
    howToUse: [
      'Indiquez le nombre total d\'éléments de l\'ensemble (n).',
      'Indiquez le nombre d\'éléments à choisir (r).',
      'Sélectionnez Combinaisons (nCr) ou Permutations / Arrangements (nPr).',
      'Visualisez le résultat et le calcul factoriel détaillé.'
    ],
    formula: 'Combinaisons : nCr = n! / [r! · (n - r)!] | Arrangements / Permutations : nPr = n! / (n - r)!',
    formulaVariables: [
      { name: 'Total (n)', description: 'Taille du groupe.', unit: 'Entier n ≥ 0', optional: false },
      { name: 'Éléments (r)', description: 'Nombre sélectionné.', unit: 'Entier 0 ≤ r ≤ n', optional: false }
    ],
    workedExample: {
      scenario: 'Sélectionner 4 personnes dans un groupe de 10 (sans ordre vs avec ordre).',
      stepByStep: [
        'Combinaisons : 10! / (4! × 6!) = 210 groupes uniques.',
        'Arrangements : 10! / 6! = 5 040 configurations ordonnées.'
      ],
      result: 'Combinaisons nCr = 210 | Arrangements nPr = 5 040'
    },
    interpretation: 'Utilisé en calcul des probabilités (jeux de cartes, loteries), statistique et algorithmique.',
    assumptions: 'Tirage sans remise.',
    limitations: 'Les factorielles croissent extrêmement rapidement.',
    faqs: [
      { question: 'Quand utilise-t-on les combinaisons ?', answer: 'On utilise les combinaisons quand l\'ordre des éléments choisis ne crée pas de résultat différent (ex. tirage du loto).' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet Kombinationen (nCr, Reihenfolge egal) und Permutationen/Variationen (nPr, Reihenfolge entscheidend) bei der Auswahl von r Elementen aus n mit Fakultäten.`,
    howToUse: [
      'Geben Sie die Gesamtanzahl der Elemente (n) ein.',
      'Geben Sie die Anzahl der auszuwählenden Elemente (r) ein.',
      'Wählen Sie Kombinationen (nCr) oder Permutationen (nPr).',
      'Lesen Sie die Anzahl möglicher Anordnungen und den Rechenweg mit Fakultäten ab.'
    ],
    formula: 'Kombinationen: nCr = n! / [r! · (n - r)!] | Permutationen: nPr = n! / (n - r)!',
    formulaVariables: [
      { name: 'Gesamtmenge (n)', description: 'Menge aller Elemente.', unit: 'Ganzzahl n ≥ 0', optional: false },
      { name: 'Auswahl (r)', description: 'Ausgewählte Elemente.', unit: 'Ganzzahl 0 ≤ r ≤ n', optional: false }
    ],
    workedExample: {
      scenario: 'Auswahl eines 4-köpfigen Teams aus 10 Personen (Kombination) vs. Besetzung von 4 unterschiedlichen Vorstandsposten (Permutation).',
      stepByStep: [
        'Kombinationen nCr: 10! / [4! × 6!] = 210 verschiedene Teams.',
        'Permutationen nPr: 10! / 6! = 5.040 unterschiedliche Postenbesetzungen.'
      ],
      result: 'Kombinationen nCr = 210 | Permutationen nPr = 5.040'
    },
    interpretation: 'Grundlage für Stochastik, Wahrscheinlichkeitsrechnung bei Lotterien und Passwort-Komplexitätsanalysen.',
    assumptions: 'Ziehen ohne Zurücklegen.',
    limitations: 'Fakultäten wachsen exponentiell und erfordern bei sehr großen Zahlen BigInt-Berechnungen.',
    faqs: [
      { question: 'Was ist der Unterschied zwischen Permutation und Kombination?', answer: 'Bei Permutationen spielt die genaue Reihenfolge eine Rolle (z. B. Zahlenschloss), bei Kombinationen ist die Reihenfolge irrelevant (z. B. Lottoziehung).' }
    ],
    relatedTools
  })
});

// 4. CALORIE DEFICIT & WEIGHT LOSS PLANNER (calorie-deficit)
export const CALORIE_DEFICIT_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates daily calorie intake targets for healthy, sustainable weight loss by determining your Total Daily Energy Expenditure (TDEE) and applying safe daily calorie deficits (e.g., 500–750 kcal/day).`,
    howToUse: [
      'Enter your biological sex, age, height, current weight, and activity level to determine TDEE.',
      'Enter your goal weight target.',
      'Select your desired weight loss pace (e.g., 0.5 kg / 1.0 lb per week).',
      'Review target daily calorie intake, macronutrient splits, and estimated timeline to reach your goal.'
    ],
    formula: 'TDEE = BMR × Activity Multiplier | Target Calories = TDEE - Deficit (where 500 kcal deficit/day ≈ 0.45 kg / 1.0 lb fat loss per week)',
    formulaVariables: [
      { name: 'Current Weight', description: 'Starting body weight.', unit: 'kg / lbs', optional: false },
      { name: 'TDEE', description: 'Total daily energy expenditure maintenance calories.', unit: 'kcal/day', optional: false },
      { name: 'Deficit', description: 'Daily calorie reduction below maintenance.', unit: 'kcal/day', optional: false }
    ],
    workedExample: {
      scenario: 'A person with a maintenance TDEE of 2,400 kcal/day aiming to lose 1.0 lb (0.45 kg) per week.',
      stepByStep: [
        'Maintenance calories (TDEE): 2,400 kcal/day.',
        'Set daily deficit: 500 kcal/day (500 × 7 days = 3,500 kcal ≈ 1 lb fat).',
        'Target daily calorie intake: 2,400 - 500 = 1,900 kcal/day.'
      ],
      result: 'Daily Calorie Target: 1,900 kcal/day (Estimated Weight Loss: 0.45 kg / 1.0 lb per week)'
    },
    interpretation: 'Guides safe, sustainable body fat reduction while preserving lean muscle mass.',
    assumptions: '1 lb of adipose body fat tissue contains approximately 3,500 stored kilocalories.',
    limitations: 'Metabolic adaptation gradually lowers basal metabolic rate as body weight decreases, requiring periodic deficit recalibration.',
    faqs: [
      { question: 'Is a 1,000 calorie deficit safe?', answer: 'A 1,000 kcal deficit leads to aggressive weight loss (~2 lbs/week) but should only be undertaken under medical supervision to avoid muscle loss and nutritional deficiencies.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب السعرات الحرارية اليومية المستهدفة لخسارة الوزن بطريقة صحية ومستدامة عبر تحديد معدل الحرق اليومي الإجمالي (TDEE) وتطبيق عجز سعرات آمن (500 إلى 750 سعرة/يوم).`,
    howToUse: [
      'أدخل الجنس والعمر والطول والوزن الحالي ومستوى النشاط البدني لحساب معدل الحرق TDEE.',
      'حدد الوزن المستهدف الوصول إليه.',
      'اختر سرعة نزول الوزن المرغوبة (مثل 0.5 كغم أو 1 باوند أسبوعياً).',
      'اطلع على السعرات اليومية المقترحة والمدة المتوقعة للوصول للهدف.'
    ],
    formula: 'معدل الحرق TDEE = معدل الأيض الأساسي × معامل النشاط | السعرات المستهدفة = TDEE - عجز السعرات',
    formulaVariables: [
      { name: 'الوزن الحالي', description: 'الوزن الفعلي الحالي.', unit: 'كغم / باوند', optional: false },
      { name: 'معدل الحرق TDEE', description: 'سعرات الثبات اليومية.', unit: 'سعرة/يوم', optional: false },
      { name: 'عجز السعرات', description: 'مقدار التقليص اليومي من السعرات.', unit: 'سعرة', optional: false }
    ],
    workedExample: {
      scenario: 'شخص معدل حرقه للثبات 2,400 سعرة/يوم ويرغب في خسارة نصف كيلوغرام أسبوعياً.',
      stepByStep: [
        'سعرات الثبات: 2,400 سعرة حرارية/يوم.',
        'عجز السعرات اليومي: 500 سعرة (500 × 7 = 3500 سعرة تعادل نصف كغم دهون).',
        'السعرات اليومية المستهدفة: 2,400 - 500 = 1,900 سعرة/يوم.'
      ],
      result: 'السعرات المستهدفة: 1,900 سعرة/يوم (نزول متوقع بمعدل 0.5 كغم أسبوعياً)'
    },
    interpretation: 'تضمن خسارة الدهون الزائدة بطريقة علمية متوازنة مع الحفاظ على الكتلة العضلية والنشاط البدني.',
    assumptions: 'حرق 3,500 سعرة حرارية يعادل تقريباً خسارة باوند واحد (0.45 كغم) من الدهون.',
    limitations: 'يتكيف معدل الأيض تدريجياً مع نزول الوزن مما يتطلب إعادة تعديل السعرات لاحقاً.',
    faqs: [
      { question: 'ما هو العجز الآمن في السعرات الحرارية؟', answer: 'العجز الآمن والمستدام يتراوح بين 300 إلى 500 سعرة حرارية يومياً لتحقيق نزول صحي وتجنب التعب أو بطء الأيض.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula las calorías diarias para perder peso de forma saludable y sostenible, determinando tu Gasto Energético Total Diario (TDEE) y aplicando un déficit calórico adecuado.`,
    howToUse: [
      'Introduzca sexo, edad, altura, peso actual y nivel de actividad física para calcular el TDEE.',
      'Indique su peso objetivo.',
      'Seleccione el ritmo de pérdida deseado (ej. 0,5 kg por semana).',
      'Consulte la ingesta calórica diaria recomendada y el tiempo estimado.'
    ],
    formula: 'TDEE = TMB × Factor Actividad | Calorías objetivo = TDEE - Déficit (500 kcal/día ≈ 0,45 kg de grasa por semana)',
    formulaVariables: [
      { name: 'Peso actual', description: 'Peso inicial.', unit: 'kg', optional: false },
      { name: 'TDEE', description: 'Calorías de mantenimiento diario.', unit: 'kcal/día', optional: false },
      { name: 'Déficit', description: 'Reducción calórica.', unit: 'kcal/día', optional: false }
    ],
    workedExample: {
      scenario: 'Persona con TDEE de mantenimiento de 2.400 kcal/día que desea perder 0,5 kg por semana.',
      stepByStep: [
        'Mantenimiento: 2.400 kcal/día.',
        'Déficit diario: 500 kcal/día.',
        'Calorías diarias objetivo: 2.400 - 500 = 1.900 kcal/día.'
      ],
      result: 'Objetivo diario: 1.900 kcal/día (Pérdida estimada: 0,5 kg por semana)'
    },
    interpretation: 'Permite reducir porcentaje de grasa corporal manteniendo la masa muscular y niveles de energía.',
    assumptions: '3.500 kcal de déficit equivalen aproximadamente a 0,45 kg de grasa corporal.',
    limitations: 'El metabolismo se adapta con el tiempo y reduce el gasto basal a medida que se reduce el peso.',
    faqs: [
      { question: '¿Cuál es el mínimo de calorías recomendado al día?', answer: 'Por regla general no se recomienda bajar de 1.200 kcal/día en mujeres y 1.500 kcal/día en hombres sin supervisión médica.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule vos besoins caloriques journaliers pour une perte de poids durable en déterminant votre dépense énergétique totale (TDEE) et en appliquant un déficit calorique sain.`,
    howToUse: [
      'Renseignez votre sexe, âge, taille, poids et niveau d\'activité.',
      'Indiquez votre poids cible.',
      'Sélectionnez votre rythme de perte de poids (ex. 0,5 kg par semaine).',
      'Consultez votre apport calorique journalier cible et la date estimée d\'atteinte de l\'objectif.'
    ],
    formula: 'TDEE = Métabolisme de base × Facteur d\'activité | Calories cibles = TDEE - Déficit',
    formulaVariables: [
      { name: 'Poids actuel', description: 'Poids de départ.', unit: 'kg', optional: false },
      { name: 'TDEE', description: 'Dépense énergétique de maintien.', unit: 'kcal/jour', optional: false },
      { name: 'Déficit', description: 'Réduction énergétique journalière.', unit: 'kcal/jour', optional: false }
    ],
    workedExample: {
      scenario: 'Personne avec un TDEE de 2 400 kcal/jour visant une perte de 0,5 kg par semaine.',
      stepByStep: [
        'Maintenance TDEE : 2 400 kcal/jour.',
        'Déficit fixé : 500 kcal/jour (3 500 kcal par semaine).',
        'Apport cible : 2 400 - 500 = 1 900 kcal/jour.'
      ],
      result: 'Apport journalier cible : 1 900 kcal/jour (~0,5 kg perdu par semaine)'
    },
    interpretation: 'Aide à planifier un rééquilibrage alimentaire sans fonte musculaire ni carences.',
    assumptions: 'Un déficit hebdomadaire cumulé de 3 500 kcal équivaut à environ 0,45 kg de tissu adipeux.',
    limitations: 'Le métabolisme ralentit naturellement au fur et à mesure de l\'amaigrissement.',
    faqs: [
      { question: 'Pourquoi ne faut-il pas créer un déficit trop important ?', answer: 'Un déficit trop agressif entraîne fatigue, perte de masse musculaire et effet yoyo à l\'arrêt du régime.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet den optimalen täglichen Kalorienbedarf für eine gesunde, nachhaltige Gewichtsabnahme durch Ermittlung des Gesamtenergiebedarfs (TDEE) und eines moderaten Kaloriendefizits.`,
    howToUse: [
      'Geben Sie Geschlecht, Alter, Größe, Gewicht und Aktivitätslevel ein.',
      'Legen Sie Ihr Zielgewicht fest.',
      'Wählen Sie das gewünschte Abnehmtempo (z. B. 0,5 kg pro Woche).',
      'Lesen Sie die Ziel-Kalorienzufuhr und den geschätzten Zeitplan ab.'
    ],
    formula: 'TDEE = Grundumsatz (BMR) × Aktivitätsfaktor | Ziel-Kalorien = TDEE - Defizit (500 kcal Defizit/Tag ≈ 0,5 kg Fettverlust pro Woche)',
    formulaVariables: [
      { name: 'Aktuelles Gewicht', description: 'Ausgangsgewicht.', unit: 'kg', optional: false },
      { name: 'TDEE', description: 'Erhaltungskalorien.', unit: 'kcal/Tag', optional: false },
      { name: 'Defizit', description: 'Tägliche Kalorienreduktion.', unit: 'kcal/Tag', optional: false }
    ],
    workedExample: {
      scenario: 'Person mit 2.400 kcal Erhaltungskalorien und dem Ziel von 0,5 kg Abnahme pro Woche.',
      stepByStep: [
        'Erhaltungsbedarf (TDEE): 2.400 kcal/Tag.',
        'Tägliches Defizit: 500 kcal/Tag.',
        'Tägliche Zielzufuhr: 2.400 - 500 = 1.900 kcal/Tag.'
      ],
      result: 'Tägliches Kalorienziel: 1.900 kcal/Tag (Geschätzter Fettverlust: ca. 0,5 kg/Woche)'
    },
    interpretation: 'Ermöglicht gezielten Fettabbau bei maximalem Muskelerhalt und stabiler Leistungsfähigkeit.',
    assumptions: 'Rund 7.000 kcal Defizit entsprechen ca. 1 kg reinem Körperfett.',
    limitations: 'Bei fortschreitender Gewichtsreduktion sinkt der Grundumsatz (metabolische Anpassung).',
    faqs: [
      { question: 'Wie hoch sollte ein gesundes Kaloriendefizit sein?', answer: 'Ein tägliches Defizit von 300 bis 500 kcal gilt als ideal, sicher und langfristig durchhaltbar.' }
    ],
    relatedTools
  })
});

// 5. PREGNANCY DUE DATE CALCULATOR (due-date)
export const DUE_DATE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates estimated pregnancy due date (EDD), gestational age in weeks and days, and trimester milestones using Naegele's Rule based on the first day of the last menstrual period (LMP) or conception date.`,
    howToUse: [
      'Select calculation method: Last Menstrual Period (LMP), Conception Date, or Ultrasound Dating.',
      'Enter the date of the first day of your last period.',
      'Adjust average menstrual cycle length (default: 28 days).',
      'Review your estimated due date, current gestational week, and key pregnancy trimester milestones.'
    ],
    formula: 'Naegele\'s Rule: Due Date = LMP + 1 Year - 3 Months + 7 Days (Adjusted for cycle length: + [Cycle Days - 28]) | Gestational Age = Current Date - LMP',
    formulaVariables: [
      { name: 'LMP Date', description: 'First day of last menstrual period.', unit: 'Date', optional: false },
      { name: 'Cycle Length', description: 'Average menstrual cycle length.', unit: 'Days (default 28)', optional: true }
    ],
    workedExample: {
      scenario: 'LMP on May 10, 2026 with a regular 28-day menstrual cycle.',
      stepByStep: [
        'Add 1 year: May 10, 2027.',
        'Subtract 3 months: February 10, 2027.',
        'Add 7 days: February 17, 2027.',
        'Total expected gestation: 280 days (40 weeks 0 days).'
      ],
      result: 'Estimated Due Date (EDD): February 17, 2027 (40 Weeks Gestation)'
    },
    interpretation: 'Assists expectant parents and obstetricians in scheduling prenatal screenings, ultrasounds, and birth preparation.',
    assumptions: 'Standard 280-day human gestation period.',
    limitations: 'Only approximately 4–5% of babies are born precisely on their estimated due date; full-term birth normally spans 37 to 42 weeks.',
    faqs: [
      { question: 'What is Naegele\'s Rule?', answer: 'It is the standard obstetric calculation rule developed by German obstetrician Franz Karl Naegele that adds 280 days (40 weeks) to the first day of the last menstrual period.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب موعد الولادة المتوقع (EDD)، وعمر الحمل بالأسابيع والأيام، ومراحل الثلث الأول والثاني والثالث باستخدام قاعدة نيجيلي الطبية المعتمدة على تاريخ أول يوم لآخر دورة شهرية.`,
    howToUse: [
      'اختر طريقة الحساب (تاريخ آخر دورة شهرية LMP أو تاريخ التلقيح/الإخصاب).',
      'أدخل تاريخ أول يوم من آخر دورة شهرية.',
      'اضبط متوسط طول الدورة الشهرية (الافتراضي 28 يوماً).',
      'اطلع على موعد الولادة التقريبي، وأسبوع الحمل الحالي، ومراحل نمو الجنين.'
    ],
    formula: 'قاعدة نيجيلي: موعد الولادة = تاريخ آخر دورة + سنة كاملة - 3 أشهر + 7 أيام (280 يوماً / 40 أسبوعاً)',
    formulaVariables: [
      { name: 'تاريخ آخر دورة', description: 'أول يوم من آخر طمث.', unit: 'تاريخ', optional: false },
      { name: 'طول الدورة', description: 'متوسط عدد أيام الدورة الشهرية.', unit: 'أيام', optional: true }
    ],
    workedExample: {
      scenario: 'تاريخ أول يوم لآخر دورة شهرية هو 10 مايو مع دورة منتظمة 28 يوماً.',
      stepByStep: [
        'إضافة سنة كاملة: 10 مايو من العام التالي.',
        'طرح 3 أشهر: 10 فبراير.',
        'إضافة 7 أيام: 17 فبراير.',
        'إجمالي فترة الحمل المتوقعة: 280 يوماً (40 أسبوعاً).'
      ],
      result: 'تاريخ الولادة المتوقع: 17 فبراير (الأسبوع 40 من الحمل)'
    },
    interpretation: 'تساعد الأمهات وأطباء التوليد في جدولة الفحوصات الطبية، وتخطيط مراحل الحمل، ومتابعة نمو الجنين.',
    assumptions: 'فترة حمل بشرية نموذجية مدتها 280 يوماً.',
    limitations: 'تلد نحو 4% إلى 5% فقط من الأمهات في الموعد المحدد تماماً، حيث يعتبر الحمل مكتملاً بين الأسبوع 37 و 42.',
    faqs: [
      { question: 'متى يعتبر الحمل مكتملاً طبياً؟', answer: 'يعتبر الحمل مكتملاً (Full Term) بين الأسبوع 37 والأسبوع 40 و 6 أيام.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la fecha probable de parto (FPP), la edad gestacional en semanas y días y los trimestres de gestación aplicando la regla obstétrica de Naegele.`,
    howToUse: [
      'Seleccione el método (Fecha de Última Regla FUR o fecha de concepción).',
      'Introduzca el primer día de su última menstruación.',
      'Ajuste la duración de su ciclo si es distinta a 28 días.',
      'Consulte la fecha estimada de parto y la semana de embarazo actual.'
    ],
    formula: 'Regla de Naegele: FPP = FUR + 1 año - 3 meses + 7 días (280 días / 40 semanas de gestación)',
    formulaVariables: [
      { name: 'FUR', description: 'Primer día de la última regla.', unit: 'Fecha', optional: false },
      { name: 'Duración ciclo', description: 'Días promedio del ciclo menstrual.', unit: 'Días (28)', optional: true }
    ],
    workedExample: {
      scenario: 'FUR el 10 de mayo con ciclo regular de 28 días.',
      stepByStep: [
        'Sumar un año: 10 de mayo del año siguiente.',
        'Restar 3 meses: 10 de febrero.',
        'Sumar 7 días: 17 de febrero.'
      ],
      result: 'Fecha Probable de Parto: 17 de febrero (Semana 40)'
    },
    interpretation: 'Imprescindible para planificar ecografías, pruebas de cribado prenatal y la preparación para el parto.',
    assumptions: 'Embarazo normal de 280 días.',
    limitations: 'Solo entre el 4% y 5% de los bebés nacen el día exacto de la FPP; el parto a término abarca entre las semanas 37 y 42.',
    faqs: [
      { question: '¿Cuándo se considera un embarazo a término?', answer: 'Se considera a término completo a partir de la semana 37 cumplida de gestación.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule la date présumée d'accouchement (DPA), l'âge gestationnel en semaines d'aménorrhée (SA) et le calendrier des trimestres selon la règle de Naegele.`,
    howToUse: [
      'Choisissez la méthode (Date des dernières règles DDR ou date de fécondation).',
      'Indiquez le premier jour de vos dernières règles.',
      'Ajustez la durée moyenne du cycle si nécessaire.',
      'Consultez la DPA estimée et votre semaine d\'aménorrhée actuelle.'
    ],
    formula: 'Règle de Naegele : DPA = DDR + 1 an - 3 mois + 7 jours (40 à 41 SA / 280 jours)',
    formulaVariables: [
      { name: 'DDR', description: 'Date des dernières règles.', unit: 'Date', optional: false },
      { name: 'Durée du cycle', description: 'Durée moyenne du cycle.', unit: 'Jours', optional: true }
    ],
    workedExample: {
      scenario: 'DDR le 10 mai avec un cycle régulier de 28 jours.',
      stepByStep: [
        'Ajouter 1 an : 10 mai suivant.',
        'Soustraire 3 mois : 10 février.',
        'Ajouter 7 jours : 17 février.'
      ],
      result: 'Date Présumée d\'Accouchement : 17 février'
    },
    interpretation: 'Permet de planifier les échographies obligatoires et le congé maternité.',
    assumptions: 'Durée standard de 40 à 41 semaines d\'aménorrhée.',
    limitations: 'Seuls 5 % des naissances ont lieu le jour exact du terme.',
    faqs: [
      { question: 'Quelle est la différence entre semaines de grossesse (SG) et semaines d\'aménorrhée (SA) ?', answer: 'Les SA se comptent depuis le premier jour des dernières règles, soit environ 2 semaines de plus que les SG qui se comptent depuis la fécondation.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet den voraussichtlichen Entbindungstermin (ET), die aktuelle Schwangerschaftswoche (SSW) und Trimester-Meilensteine nach der Naegele-Regel.`,
    howToUse: [
      'Wählen Sie die Berechnungsmethode (Erster Tag der letzten Periode oder Empfängnisdatum).',
      'Geben Sie den ersten Tag der letzten Regelblutung ein.',
      'Passen Sie die durchschnittliche Zykluslänge an (Standard: 28 Tage).',
      'Lesen Sie den errechneten Geburtstermin und Ihre aktuelle SSW ab.'
    ],
    formula: 'Naegele-Regel: ET = Erster Tag der letzten Periode + 1 Jahr - 3 Monate + 7 Tage (280 Tage / 40 SSW)',
    formulaVariables: [
      { name: 'Letzte Periode', description: 'Erster Tag der letzten Regel.', unit: 'Datum', optional: false },
      { name: 'Zykluslänge', description: 'Zyklusdauer in Tagen.', unit: 'Tage (28)', optional: true }
    ],
    workedExample: {
      scenario: 'Erster Tag der letzten Periode am 10. Mai bei 28-tägigem Zyklus.',
      stepByStep: [
        'Ein Jahr addieren: 10. Mai Folgejahr.',
        'Drei Monate subtrahieren: 10. Februar.',
        'Sieben Tage addieren: 17. Februar.'
      ],
      result: 'Errechneter Geburtstermin (ET): 17. Februar (40. Schwangerschaftswoche)'
    },
    interpretation: 'Wichtig für die Planung von Vorsorgeuntersuchungen, Ultraschallterminen und Mutterschutzfristen.',
    assumptions: '280 Tage reguläre Schwangerschaftsdauer.',
    limitations: 'Nur rund 4 bis 5 % aller Babys kommen exakt am errechneten Entbindungstermin zur Welt.',
    faqs: [
      { question: 'Wann gilt eine Geburt als termingerecht?', answer: 'Eine Geburt zwischen der 37. und 42. Schwangerschaftswoche gilt medizinisch als termingerecht.' }
    ],
    relatedTools
  })
});

// 6. MONTHLY COMPOUND INTEREST CALCULATOR (compound-monthly)
export const COMPOUND_MONTHLY_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates long-term savings and investment growth with monthly compounding interest and ongoing monthly recurring contributions over customizable investment horizons.`,
    howToUse: [
      'Enter the starting initial principal balance.',
      'Enter the expected annual interest rate (APY / nominal rate %).',
      'Enter the monthly recurring deposit or contribution amount.',
      'Select the investment duration in years.',
      'Review future balance, total interest earned, and contributions breakdown.'
    ],
    formula: 'Future Value FV = P(1 + r/12)^(12t) + PMT × [((1 + r/12)^(12t) - 1) / (r/12)]',
    formulaVariables: [
      { name: 'Principal (P)', description: 'Initial deposit.', unit: 'Currency', optional: false },
      { name: 'Annual Rate (r)', description: 'Nominal annual interest rate.', unit: 'Decimal (e.g. 0.07 for 7%)', optional: false },
      { name: 'Monthly Deposit (PMT)', description: 'Regular monthly contribution.', unit: 'Currency', optional: true },
      { name: 'Time (t)', description: 'Investment period.', unit: 'Years', optional: false }
    ],
    workedExample: {
      scenario: 'Investing $10,000 initially with $500 monthly contributions at 7.0% annual interest compounded monthly for 10 years.',
      stepByStep: [
        'Initial principal growth: $10,000 × (1 + 0.07/12)^(120) = $20,096.61.',
        'Monthly deposits growth: $500 × [((1 + 0.07/12)^120 - 1) / (0.07/12)] = $86,542.40.',
        'Total Future Value: $20,096.61 + $86,542.40 = $106,639.01.',
        'Total contributions: $10,000 + ($500 × 120) = $70,000. Total interest earned: $36,639.01.'
      ],
      result: 'Future Balance: $106,639.01 (Principal & Deposits: $70,000 | Interest: $36,639.01)'
    },
    interpretation: 'Demonstrates the exponential power of compounding interest and disciplined monthly investing for retirement and wealth creation.',
    assumptions: 'Constant monthly compounding and steady annual return rate.',
    limitations: 'Real-world investments experience market volatility and variable returns.',
    faqs: [
      { question: 'Why does monthly compounding earn more than annual compounding?', answer: 'Monthly compounding calculates interest 12 times a year, meaning earned interest starts generating its own interest in subsequent months.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب نمو المدخرات والاستثمارات بالفائدة المركبة الشهرية مع إضافة مساهمات وإيداعات دورية شهرية عبر فترات زمنية محددة.`,
    howToUse: [
      'أدخل رأس المال المبدئي للاستثمار.',
      'أدخل معدل الفائدة أو العائد السنوي المتوقع (%).',
      'أدخل قيمة الإيداع الشهري المنتظم.',
      'حدد عدد سنوات الاستثمار.',
      'اطلع على الرصيد المستقبلي الكلي وإجمالي الأرباح المركبة المتراكمة.'
    ],
    formula: 'القيمة المستقبلية = المبلغ الأصلي × (1 + ع/12)^(12×ن) + الإيداع الشهري × [((1 + ع/12)^(12×ن) - 1) ÷ (ع/12)]',
    formulaVariables: [
      { name: 'رأس المال (P)', description: 'المبلغ الأساسي الأولي.', unit: 'عملة', optional: false },
      { name: 'العائد السنوي (r)', description: 'معدل الفائدة السنوي.', unit: 'نسبة %', optional: false },
      { name: 'الإيداع الشهري (PMT)', description: 'المساهمة الشهرية.', unit: 'عملة', optional: true },
      { name: 'المدة (t)', description: 'عدد سنوات الاستثمار.', unit: 'سنوات', optional: false }
    ],
    workedExample: {
      scenario: 'استثمار 10,000 دولار مع إيداع 500 دولار شهرياً بعائد سنوي 7% مركب شهرياً لمدة 10 سنوات.',
      stepByStep: [
        'نمو رأس المال المبدئي: 20,096.61 دولار.',
        'نمو الإيداعات الشهرية: 86,542.40 دولار.',
        'الرصيد الإجمالي النهائي: 106,639.01 دولار.',
        'إجمالي المبالغ المدفوعة: 70,000 دولار. إجمالي الأرباح المركبة: 36,639.01 دولار.'
      ],
      result: 'الرصيد المستقبلي: 106,639.01 دولار (المدخرات: 70,000$ | الأرباح: 36,639.01$)'
    },
    interpretation: 'توضح القوة التراكمية للفائدة المركبة وأهمية الالتزام بالادخار والاستثمار الشهري طويل الأجل.',
    assumptions: 'ثبات معدل العائد والتركيب الشهري المنتظم.',
    limitations: 'تخضع الأسواق المالية الحقيقية لتقلبات العوائد ومعدلات التضخم.',
    faqs: [
      { question: 'ما ميزة الفائدة المركبة الشهرية مقارنة بالسنوية؟', answer: 'التركيب الشهري يحسب الأرباح 12 مرة سنوياً، مما يجعل الأرباح الشهرية تولد أرباحاً جديدة بشكل أسرع.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el crecimiento de inversiones y ahorros con interés compuesto mensual y aportaciones periódicas a lo largo del tiempo.`,
    howToUse: [
      'Introduzca el capital inicial.',
      'Indique la tasa de interés anual esperada (%).',
      'Introduzca la aportación mensual periódica.',
      'Seleccione el plazo de la inversión en años.',
      'Consulte el capital final acumulado y el total de intereses generados.'
    ],
    formula: 'Valor Futuro FV = P(1 + r/12)^(12t) + PMT × [((1 + r/12)^(12t) - 1) / (r/12)]',
    formulaVariables: [
      { name: 'Capital inicial (P)', description: 'Depósito inicial.', unit: 'Moneda', optional: false },
      { name: 'Tasa anual (r)', description: 'Interés nominal anual.', unit: '%', optional: false },
      { name: 'Aportación mensual (PMT)', description: 'Ahorro regular.', unit: 'Moneda', optional: true },
      { name: 'Plazo (t)', description: 'Años.', unit: 'Años', optional: false }
    ],
    workedExample: {
      scenario: 'Inversión de 10.000 € con 500 €/mes al 7% anual compuesto mensualmente durante 10 años.',
      stepByStep: [
        'Crecimiento capital inicial: 20.096,61 €.',
        'Crecimiento aportaciones: 86.542,40 €.',
        'Valor total acumulado: 106.639,01 €.',
        'Capital aportado: 70.000 €. Intereses ganados: 36.639,01 €.'
      ],
      result: 'Capital final: 106.639,01 € (Aportado: 70.000 € | Intereses: 36.639,01 €)'
    },
    interpretation: 'Muestra el impacto del interés compuesto para planificar la jubilación y metas financieras.',
    assumptions: 'Capitalización mensual regular y rentabilidad constante.',
    limitations: 'No incluye el impacto fiscal de las plusvalías ni la inflación.',
    faqs: [
      { question: '¿Qué es el interés compuesto?', answer: 'Es el proceso por el cual los intereses generados se suman al capital inicial para generar nuevos intereses sucesivamente.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule la valorisation d'un capital et d'une épargne avec intérêts composés mensuels et versements programmés réguliers.`,
    howToUse: [
      'Indiquez le capital initial de départ.',
      'Saisissez le taux de rendement annuel espéré (%).',
      'Précisez le versement mensuel programmé.',
      'Indiquez la durée de placement en années.',
      'Consultez le montant final épargné et la part des intérêts acquis.'
    ],
    formula: 'Valeur Future FV = P(1 + r/12)^(12t) + PMT × [((1 + r/12)^(12t) - 1) / (r/12)]',
    formulaVariables: [
      { name: 'Capital initial (P)', description: 'Apport de départ.', unit: 'Devise', optional: false },
      { name: 'Taux annuel (r)', description: 'Rendement annuel.', unit: '%', optional: false },
      { name: 'Versement (PMT)', description: 'Épargne mensuelle.', unit: 'Devise', optional: true },
      { name: 'Durée (t)', description: 'Horizon de placement.', unit: 'Années', optional: false }
    ],
    workedExample: {
      scenario: 'Placement de 10 000 € avec 500 €/mois à 7 % d\'intérêt annuel composé mensuellement sur 10 ans.',
      stepByStep: [
        'Valeur du capital initial : 20 096,61 €.',
        'Valeur des versements mensuels : 86 542,40 €.',
        'Total final capitalisé : 106 639,01 €.',
        'Total versé : 70 000 €. Intérêts générés : 36 639,01 €.'
      ],
      result: 'Solde final : 106 639,01 € (Versements : 70 000 € | Intérêts : 36 639,01 €)'
    },
    interpretation: 'Illustre l\'effet boule de neige des intérêts composés pour préparer sa retraite ou faire fructifier son patrimoine.',
    assumptions: 'Capitalisation mensuelle sans retraits intermédiaires.',
    limitations: 'Les rendements réels des marchés financiers fluctuent selon les années.',
    faqs: [
      { question: 'Pourquoi commencer à épargner tôt ?', answer: 'Plus l\'horizon de placement est long, plus les intérêts composés démultiplient la croissance du capital sans effort d\'épargne supplémentaire.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet das Vermögenswachstum durch monatlichen Zinseszins und regelmäßige monatliche Sparraten über frei wählbare Anlagezeiträume.`,
    howToUse: [
      'Geben Sie das anfängliche Startkapital ein.',
      'Geben Sie den erwarteten jährlichen Zinssatz bzw. die Rendite (%) ein.',
      'Tragen Sie die monatliche Sparrate ein.',
      'Wählen Sie die Laufzeit in Jahren.',
      'Lesen Sie das Endkapital, die Summe aller Einzahlungen und die Zinsgewinne ab.'
    ],
    formula: 'Endwert FV = P(1 + r/12)^(12t) + Sparrate × [((1 + r/12)^(12t) - 1) / (r/12)]',
    formulaVariables: [
      { name: 'Startkapital (P)', description: 'Anfangsinvestition.', unit: 'Währung', optional: false },
      { name: 'Zinssatz (r)', description: 'Jährlicher Nominalzins.', unit: '%', optional: false },
      { name: 'Sparrate (PMT)', description: 'Monatlicher Sparbeitrag.', unit: 'Währung', optional: true },
      { name: 'Laufzeit (t)', description: 'Anlagejahre.', unit: 'Jahre', optional: false }
    ],
    workedExample: {
      scenario: 'Sparplan mit 10.000 € Startguthaben, 500 € Monatsrate bei 7,0 % Zinsen p.a. über 10 Jahre.',
      stepByStep: [
        'Wachstum Startkapital: 20.096,61 €.',
        'Wachstum Sparraten: 86.542,40 €.',
        'Gesamtes Endkapital: 106.639,01 €.',
        'Eigene Einzahlungen: 70.000 €. Reiner Zinseszinsgewinn: 36.639,01 €.'
      ],
      result: 'Endkapital: 106.639,01 € (Einzahlungen: 70.000 € | Zinsgewinn: 36.639,01 €)'
    },
    interpretation: 'Visualisiert den Zinseszinseffekt für den langfristigen Vermögensaufbau und die private Altersvorsorge.',
    assumptions: 'Monatliche unterjährige Zinsgutschrift und konstante Rendite.',
    limitations: 'Berücksichtigt keine Abgeltungsteuer oder Inflation.',
    faqs: [
      { question: 'Was bewirkt der Zinseszinseffekt?', answer: 'Erwirtschaftete Zinsen werden wieder angelegt und werfen in den Folgeperioden selbst wieder Zinsen ab, was zu exponentiellem Wachstum führt.' }
    ],
    relatedTools
  })
});

// 7. RESTAURANT TIP & BILL SPLIT CALCULATOR (tip-split)
export const TIP_SPLIT_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates tip amounts, total dining bills with gratuity, and fair per-person bill splits across any group size with optional custom tip percentages and rounding.`,
    howToUse: [
      'Enter the pre-tax or post-tax restaurant bill subtotal.',
      'Select a tip percentage (e.g., 15%, 18%, 20%, or custom %).',
      'Enter the number of people splitting the bill.',
      'Review total tip amount, combined total bill, and the exact cost per person.'
    ],
    formula: 'Tip Amount = Bill × (Tip % / 100) | Total Bill = Bill + Tip | Per Person Share = Total Bill / Number of People',
    formulaVariables: [
      { name: 'Bill Subtotal', description: 'Restaurant dining total.', unit: 'Currency', optional: false },
      { name: 'Tip Percentage', description: 'Gratuity percentage rate.', unit: 'Percentage %', optional: false },
      { name: 'Split Count', description: 'Number of people sharing.', unit: 'Integer ≥ 1', optional: false }
    ],
    workedExample: {
      scenario: 'Splitting a $120.00 restaurant dinner among 4 friends with an 18% gratuity tip.',
      stepByStep: [
        'Calculate tip: $120.00 × 0.18 = $21.60.',
        'Calculate total bill: $120.00 + $21.60 = $141.60.',
        'Split per person: $141.60 / 4 people = $35.40 each (Tip share: $5.40 each).'
      ],
      result: 'Tip: $21.60 | Total Bill: $141.60 | Per Person: $35.40'
    },
    interpretation: 'Eliminates awkward post-meal payment math and ensures dining staff receive appropriate gratuity.',
    assumptions: 'Even bill split among all diners.',
    limitations: 'Does not itemize individual alcoholic beverages or separate appetizers unless calculated individually.',
    faqs: [
      { question: 'What is standard dining tip etiquette?', answer: 'In the US and Canada, standard restaurant tip etiquette is 15% for acceptable service, 18–20% for good service, and 20%+ for exceptional service.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب قيمة إكرامية المطاعم (البقشيش)، وإجمالي الفاتورة مع الإكرامية، وتقسيم الحساب بعدالة وبالتساوي بين أفراد المجموعة.`,
    howToUse: [
      'أدخل قيمة فاتورة المطعم الإجمالية.',
      'اختر نسبة الإكرامية (مثل 10% أو 15% أو 20%).',
      'حدد عدد الأشخاص الذين يتقاسمون الفاتورة.',
      'اطلع على قيمة الإكرامية، وإجمالي المبلغ، وحصة كل فرد بالضبط.'
    ],
    formula: 'قيمة الإكرامية = الفاتورة × (نسبة الإكرامية ÷ 100) | الإجمالي = الفاتورة + الإكرامية | نصيب الفرد = الإجمالي ÷ عدد الأفراد',
    formulaVariables: [
      { name: 'قيمة الفاتورة', description: 'مبلغ حساب المطعم.', unit: 'عملة', optional: false },
      { name: 'نسبة الإكرامية', description: 'النسبة المئوية للبقشيش.', unit: '%', optional: false },
      { name: 'عدد الأفراد', description: 'عدد الأشخاص المشتركين.', unit: 'أفراد', optional: false }
    ],
    workedExample: {
      scenario: 'تقسيم فاتورة عشاء بقيمة 120 دولاراً بين 4 أصدقاء مع إكرامية بنسبة 18%.',
      stepByStep: [
        'حساب الإكرامية: 120 × 0.18 = 21.60 دولار.',
        'إجمالي الفاتورة: 120 + 21.60 = 141.60 دولار.',
        'نصيب كل شخص: 141.60 ÷ 4 = 35.40 دولار (حصة الإكرامية لكل فرد 5.40$).'
      ],
      result: 'الإكرامية: 21.60$ | الإجمالي: 141.60$ | نصيب كل فرد: 35.40$'
    },
    interpretation: 'تنهي حيرة تقسيم الحساب بعد الوجبات وتضمن دفع الإكرامية المستحقة لطاقم الخدمة بسهولة.',
    assumptions: 'التقسيم المتساوي بين جميع الحاضرين.',
    limitations: 'لا تقوم بتفصيل الطلبات الفردية إذا تفاوتت أسعار الأطباق المطلوبة.',
    faqs: [
      { question: 'هل الإكرامية إلزامية في المطاعم؟', answer: 'تختلف الأعراف حسب الدولة؛ ففي أمريكا الشمالية تعتبر شبه إلزامية بنسبة 15-20%، بينما في أغلب الدول الأوروبية والعربية تكون اختيارية أو مشمولة في الخدمة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la propina en restaurantes, el importe total de la cuenta y la división exacta a partes iguales entre los comensales.`,
    howToUse: [
      'Introduzca el subtotal de la cuenta del restaurante.',
      'Seleccione el porcentaje de propina deseado (ej. 10%, 15%, 20%).',
      'Indique el número de comensales a dividir.',
      'Consulte el importe de la propina, el total final y lo que debe pagar cada persona.'
    ],
    formula: 'Propina = Cuenta × (% / 100) | Total = Cuenta + Propina | Por Persona = Total / N° Personas',
    formulaVariables: [
      { name: 'Importe de la cuenta', description: 'Subtotal del consumo.', unit: 'Moneda', optional: false },
      { name: 'Porcentaje propina', description: 'Gratificación.', unit: '%', optional: false },
      { name: 'Comensales', description: 'Número de personas.', unit: 'Entero', optional: false }
    ],
    workedExample: {
      scenario: 'Dividir una cena de 120 € entre 4 amigos con un 18% de propina.',
      stepByStep: [
        'Cálculo de propina: 120 € × 0,18 = 21,60 €.',
        'Cuenta total: 120 € + 21,60 € = 141,60 €.',
        'Pago por persona: 141,60 € / 4 = 35,40 €.'
      ],
      result: 'Propina: 21,60 € | Total: 141,60 € | Por persona: 35,40 €'
    },
    interpretation: 'Facilita la división rápida de la cuenta al salir a cenar en grupo evitando discrepancias.',
    assumptions: 'Reparto equitativo entre todos los comensales.',
    limitations: 'No desglosa consumiciones individuales desiguales.',
    faqs: [
      { question: '¿Cuánto se suele dejar de propina?', answer: 'En Europa la propina habitual es del 5% al 10% por buen servicio; en EE. UU. se sitúa entre el 18% y el 20%.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule le pourboire au restaurant, l'addition totale et le partage équitable de la note par personne entre convives.`,
    howToUse: [
      'Saisissez le montant de l\'addition.',
      'Sélectionnez le pourcentage de pourboire souhaité.',
      'Indiquez le nombre de personnes à table.',
      'Consultez le montant du pourboire, le total général et la part individuelle.'
    ],
    formula: 'Pourboire = Addition × (Pourcentage / 100) | Total = Addition + Pourboire | Part par personne = Total / Nombre de convives',
    formulaVariables: [
      { name: 'Addition', description: 'Montant de la note.', unit: 'Devise', optional: false },
      { name: 'Pourboire %', description: 'Taux de gratification.', unit: '%', optional: false },
      { name: 'Nombre de personnes', description: 'Convives.', unit: 'Nombre', optional: false }
    ],
    workedExample: {
      scenario: 'Partage d\'une note de 120 € entre 4 amis avec 18 % de pourboire.',
      stepByStep: [
        'Montant du pourboire : 120 € × 0,18 = 21,60 €.',
        'Addition totale : 120 € + 21,60 € = 141,60 €.',
        'Part par personne : 141,60 € / 4 = 35,40 €.'
      ],
      result: 'Pourboire : 21,60 € | Total : 141,60 € | Par personne : 35,40 €'
    },
    interpretation: 'Pratique pour régler rapidement les additions de groupe au restaurant sans calculette.',
    assumptions: 'Division stricte à parts égales.',
    limitations: 'Ne prend pas en compte les écarts de prix entre plats individuels.',
    faqs: [
      { question: 'Le pourboire est-il obligatoire en France ?', answer: 'En France, le service est inclus dans le prix (15 %), le pourboire reste donc un geste d\'appréciation libre et volontaire.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet das Trinkgeld im Restaurant, die Gesamtrechnung und die faire Aufteilung des Rechnungsbetrags pro Person in der Gruppe.`,
    howToUse: [
      'Geben Sie den Rechnungsbetrag ein.',
      'Wählen Sie den gewünschten Trinkgeldsatz (z. B. 10%, 15% oder 20%).',
      'Geben Sie die Anzahl der zahlenden Personen ein.',
      'Lesen Sie Trinkgeldhöhe, Gesamtsumme und den Einzelbetrag pro Kopf ab.'
    ],
    formula: 'Trinkgeld = Rechnung × (Trinkgeld % / 100) | Gesamtsumme = Rechnung + Trinkgeld | Pro Person = Gesamtsumme / Personenanzahl',
    formulaVariables: [
      { name: 'Rechnungsbetrag', description: 'Nettobetrag der Bewirtung.', unit: 'Währung', optional: false },
      { name: 'Trinkgeld in %', description: 'Trinkgeldsatz.', unit: '%', optional: false },
      { name: 'Personen', description: 'Anzahl der Personen.', unit: 'Ganzzahl', optional: false }
    ],
    workedExample: {
      scenario: 'Aufteilung einer Restaurantrechnung über 120 € auf 4 Freunde mit 18 % Trinkgeld.',
      stepByStep: [
        'Trinkgeld berechnen: 120 € × 0,18 = 21,60 €.',
        'Gesamtrechnung: 120 € + 21,60 € = 141,60 €.',
        'Anteil pro Person: 141,60 € / 4 = 35,40 €.'
      ],
      result: 'Trinkgeld: 21,60 € | Gesamt: 141,60 € | Pro Person: 35,40 €'
    },
    interpretation: 'Erspart langes Kopfrechnen beim Restaurantbesuch mit Freunden oder Arbeitskollegen.',
    assumptions: 'Gleichmäßige Teilung auf alle Gäste.',
    limitations: 'Berücksichtigt keine individuellen Einzelbestellungen.',
    faqs: [
      { question: 'Wie viel Trinkgeld gibt man in Deutschland?', answer: 'In Deutschland sind 5% bis 10% des Rechnungsbetrags als Trinkgeld bei gutem Service üblich.' }
    ],
    relatedTools
  })
});

// 8. ARC LENGTH & SECTOR AREA CALCULATOR (arc-length-sector-area)
export const ARC_LENGTH_SECTOR_AREA_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates the arc length (s), sector area (A), chord length, and segment area of a circle given the circle's radius and central angle in degrees or radians.`,
    howToUse: [
      'Enter the circle radius (r).',
      'Enter the central angle (θ) and select degrees or radians.',
      'Review the calculated arc length, sector area, and circular segment dimensions.'
    ],
    formula: 'Arc Length s = r · θ (in rad) = 2πr · (θ° / 360°) | Sector Area A = ½ · r² · θ (in rad) = πr² · (θ° / 360°)',
    formulaVariables: [
      { name: 'Radius (r)', description: 'Circle radius distance.', unit: 'Length units', optional: false },
      { name: 'Central Angle (θ)', description: 'Subtended central angle.', unit: 'Degrees / Radians', optional: false }
    ],
    workedExample: {
      scenario: 'Finding the arc length and sector area for a circle of radius 10.0 cm with a central angle of 60.0°.',
      stepByStep: [
        'Convert angle to radians: 60° × (π / 180) = π / 3 ≈ 1.0472 rad.',
        'Arc length s: 10.0 cm × 1.0472 rad = 10.47 cm.',
        'Sector area A: 0.5 × (10.0 cm)² × 1.0472 rad = 0.5 × 100 × 1.0472 = 52.36 cm².'
      ],
      result: 'Arc Length s = 10.47 cm | Sector Area A = 52.36 cm²'
    },
    interpretation: 'Fundamental in circular geometry, mechanical gear tooth design, curved architecture, and highway curve transitions.',
    assumptions: 'Standard Euclidean circle geometry.',
    limitations: 'Central angle must be greater than 0° and typically less than or equal to 360° (2π rad).',
    faqs: [
      { question: 'What is the formula for sector area in degrees?', answer: 'Sector Area = (θ / 360) × π × r², where θ is the central angle in degrees and r is the radius.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب طول قوس الدائرة (s)، ومساحة القطاع الدائري (A)، وطول الوتر، ومساحة القطعة الدائرية بدلالة نصف القطر والزاوية المركزية بالدرجات أو الراديان.`,
    howToUse: [
      'أدخل نصف قطر الدائرة (r).',
      'أدخل قياس الزاوية المركزية (θ) بالدرجات أو الراديان.',
      'اطلع على طول القوس المحصور، ومساحة القطاع الدائري، وطول الوتر المقابل.'
    ],
    formula: 'طول القوس s = نق × الزاوية (بالراديان) = 2 × π × نق × (الزاوية° ÷ 360°) | مساحة القطاع = 0.5 × نق² × الزاوية (بالراديان)',
    formulaVariables: [
      { name: 'نصف القطر (r)', description: 'نصف قطر الدائرة.', unit: 'وحدات طول', optional: false },
      { name: 'الزاوية المركزية (θ)', description: 'انفراج الزاوية عند المركز.', unit: 'درجات / راديان', optional: false }
    ],
    workedExample: {
      scenario: 'حساب طول القوس ومساحة القطاع لدائرة نصف قطرها 10.0 سم بزاوية مركزية 60.0°.',
      stepByStep: [
        'تحويل الزاوية إلى راديان: 60 × (π ÷ 180) = 1.0472 راديان.',
        'طول القوس s: 10.0 × 1.0472 = 10.47 سم.',
        'مساحة القطاع A: 0.5 × (10)² × 1.0472 = 52.36 سم².'
      ],
      result: 'طول القوس = 10.47 سم | مساحة القطاع الدائري = 52.36 سم²'
    },
    interpretation: 'أساسية لحسابات الهندسة الميكانيكية للتروس والمسننات، وتصميم القباب المعمارية، ومنحنيات الطرق السريعة.',
    assumptions: 'هندسة الدائرة الإقليدية المستوية.',
    limitations: 'يجب أن تقع الزاوية المركزية بين 0 و 360 درجة.',
    faqs: [
      { question: 'ما هو قانون مساحة القطاع الدائري بالدرجات؟', answer: 'مساحة القطاع = (الزاوية المركزية ÷ 360) × π × نق².' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la longitud del arco (s), el área del sector circular (A) y la longitud de la cuerda a partir del radio y el ángulo central en grados o radianes.`,
    howToUse: [
      'Introduzca el radio de la circunferencia (r).',
      'Introduzca el ángulo central (θ) en grados o radianes.',
      'Consulte la longitud del arco curvo y la superficie del sector circular.'
    ],
    formula: 'Longitud de arco s = r · θ (rad) = 2πr · (θ° / 360°) | Área sector A = ½ · r² · θ (rad) = πr² · (θ° / 360°)',
    formulaVariables: [
      { name: 'Radio (r)', description: 'Radio de la circunferencia.', unit: 'Longitud', optional: false },
      { name: 'Ángulo central (θ)', description: 'Amplitud angular.', unit: 'Grados / Radianes', optional: false }
    ],
    workedExample: {
      scenario: 'Calcular longitud de arco y área de sector para r = 10,0 cm y θ = 60,0°.',
      stepByStep: [
        'Ángulo en radianes: 60° × (π / 180) ≈ 1,0472 rad.',
        'Longitud de arco s: 10,0 × 1,0472 = 10,47 cm.',
        'Área del sector A: 0,5 × 100 × 1,0472 = 52,36 cm².'
      ],
      result: 'Longitud de arco: 10,47 cm | Área del sector: 52,36 cm²'
    },
    interpretation: 'Imprescindible en diseño de engranajes, cálculo de curvas en carreteras y arquitectura abovedada.',
    assumptions: 'Geometría circular euclidiana plana.',
    limitations: 'El ángulo central debe situarse entre 0° y 360°.',
    faqs: [
      { question: '¿Cuál es la fórmula de la longitud de arco?', answer: 'La longitud de arco s es igual al radio multiplicado por el ángulo central en radianes (s = r · θ).' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule la longueur d'un arc de cercle (s), la surface d'un secteur circulaire (A) et la corde à partir du rayon et de l'angle au centre.`,
    howToUse: [
      'Saisissez le rayon du cercle (r).',
      'Indiquez l\'angle au centre (θ) en degrés ou radians.',
      'Consultez la longueur d\'arc et la surface du secteur angulaire.'
    ],
    formula: 'Longueur d\'arc s = r · θ (en rad) | Aire du secteur A = ½ · r² · θ (en rad)',
    formulaVariables: [
      { name: 'Rayon (r)', description: 'Rayon du cercle.', unit: 'Longueur', optional: false },
      { name: 'Angle au centre (θ)', description: 'Ouverture angulaire.', unit: 'Degrés / Radians', optional: false }
    ],
    workedExample: {
      scenario: 'Calcul pour un cercle de rayon 10,0 cm et d\'angle au centre 60,0°.',
      stepByStep: [
        'Conversion en radians : 60° × (π / 180) ≈ 1,0472 rad.',
        'Longueur d\'arc s : 10,0 × 1,0472 = 10,47 cm.',
        'Aire du secteur : 0,5 × 100 × 1,0472 = 52,36 cm².'
      ],
      result: 'Longueur d\'arc : 10,47 cm | Aire du secteur : 52,36 cm²'
    },
    interpretation: 'Utilisé en ingénierie mécanique, en usinage CNC et dans le traçage des virages routiers.',
    assumptions: 'Géométrie euclidienne classique.',
    limitations: 'L\'angle au centre est compris entre 0 et 360°.',
    faqs: [
      { question: 'Comment calculer l\'aire d\'un secteur en degrés ?', answer: 'Aire = (Angle en degrés / 360) × π × r².' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die Kreisbogenlänge (s), die Kreissektorfläche (A) und die Kreissehne aus Radius und Mittelpunktswinkel in Grad oder Bogenmaß.`,
    howToUse: [
      'Geben Sie den Kreisradius (r) ein.',
      'Geben Sie den Mittelpunktswinkel (θ) in Grad oder Radiant ein.',
      'Lesen Sie Bogenlänge, Sektorfläche und Kreissegmentwerte ab.'
    ],
    formula: 'Bogenlänge s = r · θ (in rad) = 2πr · (θ° / 360°) | Sektorfläche A = ½ · r² · θ (in rad) = πr² · (θ° / 360°)',
    formulaVariables: [
      { name: 'Radius (r)', description: 'Kreisradius.', unit: 'Längeneinheit', optional: false },
      { name: 'Winkel (θ)', description: 'Mittelpunktswinkel.', unit: 'Grad / Radiant', optional: false }
    ],
    workedExample: {
      scenario: 'Berechnung für einen Kreis mit Radius 10,0 cm und einem Winkel von 60,0°.',
      stepByStep: [
        'Winkel in Radiant: 60° × (π / 180) ≈ 1,0472 rad.',
        'Bogenlänge s: 10,0 cm × 1,0472 = 10,47 cm.',
        'Sektorfläche A: 0,5 × 100 × 1,0472 = 52,36 cm².'
      ],
      result: 'Bogenlänge s = 10,47 cm | Sektorfläche A = 52,36 cm²'
    },
    interpretation: 'Grundlegend für Maschinenbau (Zahnradberechnungen), Architektur und Kurvenradien im Straßenbau.',
    assumptions: 'Ebene euklidische Kreisgeometrie.',
    limitations: 'Der Mittelpunktswinkel muss im Bereich von 0° bis 360° liegen.',
    faqs: [
      { question: 'Wie lautet die Formel für die Kreisbogenlänge?', answer: 'Die Bogenlänge s beträgt s = 2 × π × r × (α / 360°).' }
    ],
    relatedTools
  })
});

// 9. DATE ADDITION & SUBTRACTION CALCULATOR (date-add-subtract)
export const DATE_ADD_SUBTRACT_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} adds or subtracts exact quantities of days, weeks, months, business working days, and years to or from any calendar start date with leap-year precision.`,
    howToUse: [
      'Select a starting calendar date.',
      'Choose whether to Add or Subtract time.',
      'Enter the quantities of days, weeks, months, or years.',
      'Toggle option to include or exclude weekend non-working days.',
      'Review the calculated resulting calendar date and day of the week.'
    ],
    formula: 'Result Date = Start Date ± (Years × Y + Months × M + Weeks × 7 + Days × 1) taking Gregorian calendar month lengths and leap years into account',
    formulaVariables: [
      { name: 'Start Date', description: 'Starting calendar date.', unit: 'Date', optional: false },
      { name: 'Time Units', description: 'Days, weeks, months, or years to shift.', unit: 'Integers', optional: false }
    ],
    workedExample: {
      scenario: 'Adding 90 calendar days to start date March 15, 2026.',
      stepByStep: [
        'Start date: March 15, 2026.',
        'Add 16 days in March: March 31, 2026 (74 days remaining).',
        'Add 30 days in April: April 30, 2026 (44 days remaining).',
        'Add 31 days in May: May 31, 2026 (13 days remaining).',
        'Add 13 days in June: June 13, 2026 (Saturday).'
      ],
      result: 'Resulting Date: June 13, 2026 (Saturday)'
    },
    interpretation: 'Crucial for project milestone scheduling, legal deadline compliance, contract warranty expiries, and passport validity checks.',
    assumptions: 'Proleptic Gregorian calendar.',
    limitations: 'Adding months to month-end dates (e.g., Jan 31 + 1 month) clamps to the last valid day of the target month (e.g., Feb 28/29).',
    faqs: [
      { question: 'How does adding months handle differing month lengths?', answer: 'When adding a month to a date like August 31, the result clamps to the last valid day of September (September 30).' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بإضافة أو طرح الأيام والأسابيع والشهور وأيام العمل والسنوات من وإلى أي تاريخ ميلادي بدقة متناهية تشمل السنوات الكبيسة.`,
    howToUse: [
      'حدد تاريخ البداية من التقويم.',
      'اختر العملية: إضافة أو طرح فترة زمنية.',
      'أدخل عدد الأيام، الأسابيع، الشهور أو السنوات.',
      'اختر استبعاد أو تضمين عطلات نهاية الأسبوع عند الحاجة.',
      'اطلع على التاريخ النهائي الناتج واسم اليوم المقابل.'
    ],
    formula: 'التاريخ الناتج = تاريخ البداية ± (السنوات + الشهور + الأسابيع + الأيام) وفق التقويم الغريغوري الشمسي',
    formulaVariables: [
      { name: 'تاريخ البداية', description: 'التاريخ الأصلي الأساسي.', unit: 'تاريخ', optional: false },
      { name: 'الوحدات الزمنية', description: 'الأيام أو الشهور المضافة أو المطروحة.', unit: 'أعداد صحيحة', optional: false }
    ],
    workedExample: {
      scenario: 'إضافة 90 يوماً تقويمياً إلى تاريخ 15 مارس 2026.',
      stepByStep: [
        'تاريخ البداية: 15 مارس 2026.',
        'إضافة 16 يوماً المتبقية من مارس: 31 مارس (يتبقى 74 يوماً).',
        'إضافة 30 يوماً من أبريل: 30 أبريل (يتبقى 44 يوماً).',
        'إضافة 31 يوماً من مايو: 31 مايو (يتبقى 13 يوماً).',
        'إضافة 13 يوماً من يونيو: 13 يونيو 2026 (السبت).'
      ],
      result: 'التاريخ الناتج: 13 يونيو 2026 (يوم السبت)'
    },
    interpretation: 'ضرورية لتحديد مواعيد تسليم المشاريع، والمهل القانونية والقضائية، وتواريخ انتهاء عقود الضمان والإيجار.',
    assumptions: 'التقويم الغريغوري المعتمد عالمياً.',
    limitations: 'عند إضافة شهر إلى نهايات الشهور (مثل 31 يناير) يتم تثبيت التاريخ على آخر يوم متاح في الشهر التالي (28 أو 29 فبراير).',
    faqs: [
      { question: 'كيف يتم التعامل مع اختلاف أطوال الشهور عند إضافة شهر؟', answer: 'إذا أضفت شهراً إلى تاريخ 31 أغسطس، ينتقل التاريخ إلى آخر يوم صالح في شهر سبتمبر وهو 30 سبتمبر.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} suma o resta días, semanas, meses, días laborables y años a cualquier fecha inicial del calendario gregoriano con precisión de bisiestos.`,
    howToUse: [
      'Seleccione la fecha de inicio en el calendario.',
      'Elija Sumar o Restar tiempo.',
      'Indique la cantidad de días, semanas, meses o años.',
      'Active la opción de excluir fines de semana si calcula días hábiles.',
      'Consulte la fecha resultante y el día de la semana correspondiente.'
    ],
    formula: 'Fecha resultante = Fecha inicio ± Desplazamiento temporal según el calendario gregoriano',
    formulaVariables: [
      { name: 'Fecha inicio', description: 'Punto de partida.', unit: 'Fecha', optional: false },
      { name: 'Intervalo', description: 'Días, meses o años a desplazar.', unit: 'Enteros', optional: false }
    ],
    workedExample: {
      scenario: 'Sumar 90 días naturales al 15 de marzo de 2026.',
      stepByStep: [
        'Inicio: 15 de marzo de 2026.',
        'Resto de marzo: 16 días (quedan 74 días).',
        'Mes de abril: 30 días (quedan 44 días).',
        'Mes de mayo: 31 días (quedan 13 días).',
        'Junio: 13 días.'
      ],
      result: 'Fecha resultante: 13 de junio de 2026 (Sábado)'
    },
    interpretation: 'Imprescindible para plazos administrativos, contratos legales, vencimientos de garantías y visados.',
    assumptions: 'Calendario gregoriano estándar.',
    limitations: 'Ajuste automático al último día del mes en meses con diferente número de días.',
    faqs: [
      { question: '¿Cómo se calculan los días hábiles?', answer: 'Se descuentan del cómputo los sábados y domingos (y festivos configurados) sumando solo los días de lunes a viernes.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} ajoute ou soustrait des jours, semaines, mois, jours ouvrés et années à une date de départ avec prise en compte des années bissextiles.`,
    howToUse: [
      'Sélectionnez la date de départ.',
      'Choisissez l\'opération (Ajouter ou Soustraire).',
      'Indiquez le nombre de jours, semaines, mois ou années.',
      'Cochez l\'option jours ouvrés pour exclure les week-ends.',
      'Consultez la date finale calculée et le jour de la semaine.'
    ],
    formula: 'Date finale = Date initiale ± Durée calendaire normalisée',
    formulaVariables: [
      { name: 'Date de départ', description: 'Date source.', unit: 'Date', optional: false },
      { name: 'Durée', description: 'Unités de temps à ajouter/soustraire.', unit: 'Entiers', optional: false }
    ],
    workedExample: {
      scenario: 'Ajout de 90 jours calendaires au 15 mars 2026.',
      stepByStep: [
        'Date de départ : 15 mars 2026.',
        'Fin mars : 16 jours (reste 74 jours).',
        'Avril : 30 jours (reste 44 jours).',
        'Mai : 31 jours (reste 13 jours).',
        'Juin : 13 jours.'
      ],
      result: 'Date finale : 13 juin 2026 (Samedi)'
    },
    interpretation: 'Indispensable pour le suivi des délais légaux, la gestion de projet et l\'expiration des préavis.',
    assumptions: 'Calendrier grégorien.',
    limitations: 'Ajustement de fin de mois automatique en cas de mois court.',
    faqs: [
      { question: 'Quelle est la différence entre jours ouvrés et jours ouvrables ?', answer: 'Les jours ouvrés correspondent aux jours travaillés (lundi au vendredi), les jours ouvrables incluent aussi le samedi.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} addiert oder subtrahiert Tage, Wochen, Monate, Arbeitstage und Jahre zu einem beliebigen Startdatum unter Berücksichtigung von Schaltjahren.`,
    howToUse: [
      'Wählen Sie das Startdatum im Kalender aus.',
      'Wählen Sie Addieren oder Subtrahieren.',
      'Geben Sie die Anzahl an Tagen, Wochen, Monaten oder Jahren ein.',
      'Aktivieren Sie bei Bedarf den Werktage-Modus (ohne Samstage/Sonntage).',
      'Lesen Sie das Zieldatum und den entsprechenden Wochentag ab.'
    ],
    formula: 'Zieldatum = Startdatum ± Zeitintervall unter Beachtung der gregorianischen Monatslängen und Schaltjahre',
    formulaVariables: [
      { name: 'Startdatum', description: 'Ausgangsdatum.', unit: 'Datum', optional: false },
      { name: 'Zeiteinheiten', description: 'Zu verschiebende Tage, Monate oder Jahre.', unit: 'Ganzzahlen', optional: false }
    ],
    workedExample: {
      scenario: 'Addition von 90 Kalendertagen zum 15. März 2026.',
      stepByStep: [
        'Startdatum: 15. März 2026.',
        'Resttage im März: 16 Tage (verbleiben 74 Tage).',
        'April: 30 Tage (verbleiben 44 Tage).',
        'Mai: 31 Tage (verbleiben 13 Tage).',
        'Juni: 13 Tage.'
      ],
      result: 'Zieldatum: 13. Juni 2026 (Samstag)'
    },
    interpretation: 'Unverzichtbar für behördliche Fristen, Kündigungstermine, Projektmeilensteine und Garantiezeiträume.',
    assumptions: 'Proleptischer Gregorianischer Kalender.',
    limitations: 'Monatsüberläufe (z. B. 31. Januar + 1 Monat) werden auf den letzten gültigen Tag des Zielmonats gerundet (28./29. Februar).',
    faqs: [
      { question: 'Wie werden Fristen rechtlich berechnet?', answer: 'Fällt das Fristende auf einen Samstag, Sonntag oder Feiertag, verschiebt sich die Frist in vielen Rechtsordnungen auf den nächsten Werktag.' }
    ],
    relatedTools
  })
});

// 10. PREGNANCY WEIGHT GAIN TRACKER (pregnancy-weight-gain)
export const PREGNANCY_WEIGHT_GAIN_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates healthy pregnancy weight gain targets across the 1st, 2nd, and 3rd trimesters based on pre-pregnancy Body Mass Index (BMI) aligned with official Institute of Medicine (IOM) clinical guidelines.`,
    howToUse: [
      'Enter your height and pre-pregnancy weight to determine baseline BMI category (Underweight, Normal, Overweight, Obese).',
      'Indicate single or twin pregnancy.',
      'Enter your current gestational week.',
      'Review the recommended total target weight gain range and expected week-by-week trajectory.'
    ],
    formula: 'Baseline BMI = Pre-pregnancy Weight (kg) / Height (m)² | Target Gain: Normal BMI (18.5–24.9) = 11.5–16.0 kg (25–35 lbs); Overweight (25–29.9) = 7.0–11.5 kg (15–25 lbs); Obese (≥30) = 5.0–9.0 kg (11–20 lbs)',
    formulaVariables: [
      { name: 'Pre-pregnancy Weight', description: 'Weight prior to conception.', unit: 'kg / lbs', optional: false },
      { name: 'Height', description: 'Maternal height.', unit: 'cm / inches', optional: false },
      { name: 'Gestational Week', description: 'Current week of pregnancy.', unit: 'Weeks 1–40', optional: false }
    ],
    workedExample: {
      scenario: 'A woman with normal pre-pregnancy BMI (22.0) at week 24 of pregnancy.',
      stepByStep: [
        'Pre-pregnancy BMI: Normal (18.5 - 24.9). Total recommended gain: 11.5 - 16.0 kg (25 - 35 lbs).',
        'Trimester 1 (weeks 1-13) gain: 0.5 - 2.0 kg total.',
        'Trimesters 2 & 3 rate: ~0.42 kg (0.9 lbs) per week.',
        'Expected gain by Week 24: 1.5 kg + (11 weeks × 0.42 kg) ≈ 6.1 kg (13.5 lbs).'
      ],
      result: 'Recommended Gain at Week 24: ~5.5 to 7.0 kg (Target Full-Term Gain: 11.5 - 16.0 kg)'
    },
    interpretation: 'Supports maternal health, reduces risks of gestational diabetes and preeclampsia, and promotes optimal fetal birth weight.',
    assumptions: 'Institute of Medicine (IOM) clinical pregnancy weight guidelines.',
    limitations: 'Individual medical conditions (such as hyperemesis gravidarum or gestational diabetes) require personalized obstetrician monitoring.',
    faqs: [
      { question: 'How much weight should I gain in the first trimester?', answer: 'Most women gain only 0.5 to 2.0 kg (1 to 4.5 lbs) during the entire first trimester (weeks 1–13).' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب الزيادة الصحية الموصى بها في وزن الحامل خلال الثلث الأول والثاني والثالث من الحمل بناءً على مؤشر كتلة الجسم (BMI) قبل الحمل ووفق معايير معهد الطب الأمريكي (IOM).`,
    howToUse: [
      'أدخلي طولك ووزنك قبل الحمل لتحديد فئة مؤشر كتلة الجسم.',
      'حددي نوع الحمل (جنين واحد أم توأم).',
      'أدخلي أسبوع الحمل الحالي (من الأسبوع 1 إلى 40).',
      'اطلعي على النطاق المستهدف للزيادة الصحية في الوزن ومعدل الزيادة الأسبوعي.'
    ],
    formula: 'مؤشر كتلة الجسم = الوزن ÷ الطول² | الوزن الطبيعي (BMI 18.5-24.9): زيادة موصى بها من 11.5 إلى 16 كغم طوال فترة الحمل',
    formulaVariables: [
      { name: 'الوزن قبل الحمل', description: 'وزن الأم قبل حدوث الإخصاب.', unit: 'كغم', optional: false },
      { name: 'الطول', description: 'طول الأم.', unit: 'سم', optional: false },
      { name: 'أسبوع الحمل', description: 'الأسبوع الحالي.', unit: 'أسابيع', optional: false }
    ],
    workedExample: {
      scenario: 'حامل بوزن طبيعي قبل الحمل (مؤشر كتلة 22) في الأسبوع 24 من الحمل.',
      stepByStep: [
        'الفئة: وزن طبيعي. إجمالي الزيادة الموصى بها حتى الولادة: 11.5 - 16 كغم.',
        'زيادة الثلث الأول (الأسابيع 1-13): 0.5 - 2 كغم.',
        'معدل الزيادة في الثلث الثاني والثالث: حوالي 0.42 كغم أسبوعياً.',
        'الزيادة المتوقعة عند الأسبوع 24: حوالي 6.1 كغم.'
      ],
      result: 'الزيادة الموصى بها عند الأسبوع 24: 5.5 إلى 7.0 كغم (الإجمالي حتى الولادة: 11.5 - 16 كغم)'
    },
    interpretation: 'تحمي صحة الأم وتقلل من مخاطر سكري الحمل وتسمم الحمل وتعزز النمو السليم للجنين.',
    assumptions: 'توصيات معهد الطب الأمريكي IOM لطب النساء والولادة.',
    limitations: 'الحالات الصحية الخاصة مثل الغثيان الحملي الشديد تتطلب متابعة طبية مباشرة.',
    faqs: [
      { question: 'كم يزداد وزن الحامل في الأشهر الثلاثة الأولى؟', answer: 'تتراوح الزيادة الطبيعية في الثلث الأول بين 0.5 إلى 2 كيلوغرام فقط.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el aumento de peso saludable durante el embarazo trimestre a trimestre a partir del Índice de Masa Corporal (IMC) previo a la gestación, según las guías del Instituto de Medicina (IOM).`,
    howToUse: [
      'Introduzca su altura y peso antes del embarazo para calcular el IMC base.',
      'Indique si es un embarazo simple o gemelar.',
      'Indique su semana de gestación actual.',
      'Consulte la curva de peso recomendada y la ganancia total sugerida hasta el parto.'
    ],
    formula: 'IMC base = Peso previo (kg) / Altura (m)² | IMC Normal: Aumento total de 11,5 a 16,0 kg | Sobrepeso: 7,0 a 11,5 kg',
    formulaVariables: [
      { name: 'Peso preconcepcional', description: 'Peso antes del embarazo.', unit: 'kg', optional: false },
      { name: 'Altura', description: 'Estatura.', unit: 'cm', optional: false },
      { name: 'Semana gestacional', description: 'Semana actual.', unit: 'Semanas', optional: false }
    ],
    workedExample: {
      scenario: 'Mujer con IMC normal (22,0) en la semana 24 de gestación.',
      stepByStep: [
        'Categoría: IMC Normal. Ganancia recomendada total: 11,5 a 16,0 kg.',
        'Primer trimestre: 0,5 a 2,0 kg en total.',
        'Segundo y tercer trimestre: ~0,42 kg por semana.',
        'Ganancia estimada en semana 24: ~6,1 kg.'
      ],
      result: 'Aumento recomendado en sem. 24: 5,5 a 7,0 kg (Total a término: 11,5 - 16,0 kg)'
    },
    interpretation: 'Reduce el riesgo de diabetes gestacional, preeclampsia y complicaciones en el parto.',
    assumptions: 'Directrices clínicas internacionales del IOM.',
    limitations: 'Cualquier condición médica específica debe ser supervisada por su obstetra.',
    faqs: [
      { question: '¿Cuánto peso se debe ganar con sobrepeso previo?', answer: 'Para mujeres con sobrepeso antes del embarazo, la ganancia recomendada se sitúa entre 7 y 11,5 kg en total.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule la prise de poids recommandée pendant la grossesse par trimestre en fonction de l'IMC pré-conceptionnel, selon les recommandations de l'Institut de Médecine (IOM).`,
    howToUse: [
      'Indiquez votre taille et votre poids avant la grossesse.',
      'Sélectionnez grossesse unique ou gémellaire.',
      'Indiquez votre semaine d\'aménorrhée actuelle.',
      'Consultez la fourchette de prise de poids recommandée et la courbe d\'évolution.'
    ],
    formula: 'IMC initial = Poids initial (kg) / Taille (m)² | IMC normal (18,5–24,9) : Prise recommandée de 11,5 à 16,0 kg au total',
    formulaVariables: [
      { name: 'Poids pré-grossesse', description: 'Poids avant la conception.', unit: 'kg', optional: false },
      { name: 'Taille', description: 'Stature.', unit: 'cm', optional: false },
      { name: 'Semaine', description: 'Semaine d\'aménorrhée.', unit: 'Semaines', optional: false }
    ],
    workedExample: {
      scenario: 'Femme à l\'IMC initial normal (22,0) à 24 SA.',
      stepByStep: [
        'IMC normal : objectif total de 11,5 à 16,0 kg.',
        '1er trimestre : 0,5 à 2,0 kg au total.',
        '2e et 3e trimestres : ~0,42 kg par semaine.',
        'Prise de poids attendue à 24 SA : ~6,1 kg.'
      ],
      result: 'Gain recommandé à 24 SA : 5,5 à 7,0 kg (Total à terme : 11,5 à 16,0 kg)'
    },
    interpretation: 'Préserve la santé de la future mère et favorise le développement harmonieux du bébé.',
    assumptions: 'Normes de l\'Institut de Médecine (IOM).',
    limitations: 'Les grossesses multiples ou les pathologies associées nécessitent un suivi individualisé.',
    faqs: [
      { question: 'Est-il normal de perdre du poids au premier trimestre ?', answer: 'Oui, en raison des nausées matinales, une légère perte de poids transitoire peut survenir au premier trimestre sans gravité.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die empfohlene gesunde Gewichtszunahme in der Schwangerschaft pro Trimester basierend auf dem Ausgangs-BMI vor der Empfängnis (nach IOM-Leitlinien).`,
    howToUse: [
      'Geben Sie Körpergröße und Ausgangsgewicht vor der Schwangerschaft ein.',
      'Wählen Sie Einlings- oder Zwillingsschwangerschaft.',
      'Tragen Sie Ihre aktuelle Schwangerschaftswoche (SSW) ein.',
      'Lesen Sie den empfohlenen Zunahmebereich und den Zielwert bis zur Geburt ab.'
    ],
    formula: 'Ausgangs-BMI = Gewicht (kg) / Größe (m)² | Normalgewicht (BMI 18,5–24,9): 11,5 bis 16,0 kg Gesamtzunahme',
    formulaVariables: [
      { name: 'Ausgangsgewicht', description: 'Gewicht vor der Empfängnis.', unit: 'kg', optional: false },
      { name: 'Körpergröße', description: 'Körpergröße in cm.', unit: 'cm', optional: false },
      { name: 'SSW', description: 'Aktuelle Schwangerschaftswoche.', unit: 'Wochen', optional: false }
    ],
    workedExample: {
      scenario: 'Schwangere mit normalem Ausgangs-BMI (22,0) in der 24. SSW.',
      stepByStep: [
        'BMI-Kategorie: Normalgewicht. Gesamtzunahme bis zur Geburt: 11,5 bis 16,0 kg.',
        '1. Trimester (Woche 1-13): 0,5 bis 2,0 kg insgesamt.',
        '2. & 3. Trimester: ca. 0,42 kg pro Woche.',
        'Erwartete Zunahme in der 24. SSW: ca. 6,1 kg.'
      ],
      result: 'Empfohlene Zunahme in der 24. SSW: 5,5 bis 7,0 kg (Gesamtziel: 11,5 - 16,0 kg)'
    },
    interpretation: 'Minimiert Risiken für Schwangerschaftsdiabetes und Gestose und unterstützt ein gesundes Geburtsgewicht des Kindes.',
    assumptions: 'Klinische Richtlinien des Institute of Medicine (IOM).',
    limitations: 'Individuelle Begleiterkrankungen erfordern stets die Abstimmung mit der gynäkologischen Praxis.',
    faqs: [
      { question: 'Wie viel sollte man im 1. Trimester zunehmen?', answer: 'Im gesamten ersten Trimester liegt die normale Gewichtszunahme bei lediglich 0,5 bis 2 Kilogramm.' }
    ],
    relatedTools
  })
});

// Map of Batch 2 Math and Health tools
export const BATCH2_MATH_HEALTH_HANDLERS: Record<string, Record<Language, KnowledgeHandler>> = {
  'slope-line': SLOPE_LINE_KNOWLEDGE,
  'matrix-mult': MATRIX_MULT_KNOWLEDGE,
  'combination-permutation': COMBINATION_PERMUTATION_KNOWLEDGE,
  'calorie-deficit': CALORIE_DEFICIT_KNOWLEDGE,
  'due-date': DUE_DATE_KNOWLEDGE,
  'compound-monthly': COMPOUND_MONTHLY_KNOWLEDGE,
  'tip-split': TIP_SPLIT_KNOWLEDGE,
  'arc-length-sector-area': ARC_LENGTH_SECTOR_AREA_KNOWLEDGE,
  'date-add-subtract': DATE_ADD_SUBTRACT_KNOWLEDGE,
  'pregnancy-weight-gain': PREGNANCY_WEIGHT_GAIN_KNOWLEDGE,
};
