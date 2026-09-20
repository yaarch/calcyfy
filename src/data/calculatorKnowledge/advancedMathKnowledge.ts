import { ToolDef, Language } from '../../types';
import { ToolContentDetails } from './types';

export const ADVANCED_MATH_SPECIALIZED_HANDLERS: Record<
  string,
  Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails>
> = {
  // 1. MATRIX INVERSE CALCULATOR
  'matrix-inverse': {
    en: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'The Matrix Inverse calculator computes the inverse matrix A⁻¹ for square matrices (2x2, 3x3, 4x4) such that A × A⁻¹ = I, where I is the identity matrix.',
      whoUsesIt: 'Linear algebra students, physics researchers, graphics engineers, data scientists, and systems control engineers.',
      whatItCalculates: 'Calculates matrix determinant det(A), adjugate matrix adj(A), and inverse matrix elements.',
      howToUse: [
        'Select matrix dimensions (e.g., 2x2 or 3x3).',
        'Enter numerical coefficients into the matrix cells.',
        'Click calculate to derive determinant, cofactor matrix, adjugate, and inverted matrix.'
      ],
      formula: 'A⁻¹ = (1 / det(A)) × adj(A)',
      formulaVariables: [
        { symbol: 'A', name: 'Input Matrix', explanation: 'Square coefficient matrix.' },
        { symbol: 'det(A)', name: 'Determinant', explanation: 'Scalar value computed from matrix entries. Matrix is invertible if det(A) ≠ 0.' },
        { symbol: 'adj(A)', name: 'Adjugate Matrix', explanation: 'Transpose of the cofactor matrix Cᵀ.' }
      ],
      inputs: [
        { name: 'Matrix Elements (aᵢⱼ)', description: 'Real numerical values for matrix entries.', unit: 'Real Number', optional: false }
      ],
      unitsAndConversions: 'Matrix elements are dimensionless real numbers or complex scalar coefficients.',
      workedExample: {
        scenario: 'Find the inverse of 2x2 matrix A = [[4, 7], [2, 6]].',
        stepByStep: [
          'Compute determinant det(A) = (4 × 6) - (7 × 2) = 24 - 14 = 10.',
          'Check invertibility: det(A) = 10 ≠ 0 (matrix is invertible).',
          'Swap main diagonal entries [4, 6] → [6, 4].',
          'Negate off-diagonal entries [7, 2] → [-7, -2].',
          'Adjugate matrix adj(A) = [[6, -7], [-2, 4]].',
          'Multiply by 1/det(A): A⁻¹ = [[0.6, -0.7], [-0.2, 0.4]].'
        ],
        result: 'Inverted Matrix A⁻¹ = [[0.6, -0.7], [-0.2, 0.4]]'
      },
      understandingResults: 'Multiplying matrix A by A⁻¹ yields the identity matrix [[1, 0], [0, 1]], verifying the algebraic solution.',
      assumptions: 'Assumes non-singular square matrix where det(A) ≠ 0.',
      limitations: 'Singular or degenerate matrices (det(A) = 0) do not possess an inverse. Rectangular matrices require pseudoinverse (Moore-Penrose).',
      faqs: [
        { question: 'When is a matrix not invertible?', answer: 'A matrix cannot be inverted if its determinant is zero (det(A) = 0), indicating linearly dependent rows or columns.' },
        { question: 'What is the inverse used for?', answer: 'Matrix inverses are used to solve linear systems of equations (Ax = b → x = A⁻¹b), in 3D computer graphics transformations, and in signal processing algorithms.' }
      ],
      relatedTools
    }),
    ar: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'تحسب حاسبة معكوس المصفوفة (Matrix Inverse) المصفوفة العكسية A⁻¹ للمصفوفات المربعة (2x2, 3x3, 4x4) بحيث يحقق الجداء A × A⁻¹ = I (مصفوفة الوحدة).',
      whoUsesIt: 'طلاب الجبر الخطي، مهندسو الرسوميات الحاسوبية، علماء البيانات، ومهندسو أنظمة التحكم.',
      whatItCalculates: 'تحسب محدد المصفوفة det(A)، المصفوفة المرافقة adj(A)، وعناصر المصفوفة العكسية.',
      howToUse: [
        'حدد أبعاد المصفوفة المربعة (مثل 2x2 أو 3x3).',
        'أدخل الأرقام والمعاملات في خلايا المصفوفة.',
        'اضغط حساب لاستخراج المحدد والمصفوفة العكسية الخطوة بخطوة.'
      ],
      formula: 'A⁻¹ = (1 / det(A)) × adj(A)',
      formulaVariables: [
        { symbol: 'A', name: 'المصفوفة الأصلية', explanation: 'المصفوفة المربعة القابلة للعكس.' },
        { symbol: 'det(A)', name: 'محدد المصفوفة', explanation: 'قيمة سلمية. تكون المصفوفة قابلة للعكس إذا كان det(A) ≠ 0.' },
        { symbol: 'adj(A)', name: 'المصفوفة المرافقة', explanation: 'مدورة مصفوفة العوامل المرافقة.' }
      ],
      inputs: [
        { name: 'عناصر المصفوفة', description: 'قيم رقمية حقيقية.', unit: 'رقم حقيقي', optional: false }
      ],
      unitsAndConversions: 'قيم قياسية حقيقية بدون وحدات.',
      workedExample: {
        scenario: 'إيجاد معكوس المصفوفة A = [[4, 7], [2, 6]].',
        stepByStep: [
          'حساب المحدد det(A) = (4 × 6) - (7 × 2) = 24 - 14 = 10.',
          'التحقق من إمكانية العكس: det(A) = 10 ≠ 0 (المصفوفة قابلة للعكس).',
          'تبديل القطر الرئيسي وتعكيس إشارات القطر الثانوي.',
          'المصفوفة المرافقة adj(A) = [[6, -7], [-2, 4]].',
          'الضرب في 1/10: A⁻¹ = [[0.6, -0.7], [-0.2, 0.4]].'
        ],
        result: 'المصفوفة العكسية A⁻¹ = [[0.6, -0.7], [-0.2, 0.4]]'
      },
      understandingResults: 'ضرب المصفوفة A في معكوسها A⁻¹ ينتج مصفوفة الوحدة [[1, 0], [0, 1]].',
      assumptions: 'تفترض مصفوفة مربعة غير منفردة (محددها لا يساوي الصفر).',
      limitations: 'المصفوفات المنفردة (det = 0) لا تملك معكوساً.',
      faqs: [
        { question: 'متى تكون المصفوفة غير قابلة للعكس؟', answer: 'تكون المصفوفة غير قابلة للعكس إذا كان محددها يساوي صفراً det(A) = 0.' }
      ],
      relatedTools
    }),
    es: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'La calculadora de la Matriz Inversa determina la matriz A⁻¹ para matrices cuadradas cumpliendo A × A⁻¹ = I.',
      whoUsesIt: 'Estudiantes de álgebra lineal, ingenieros de gráficos 3D y científicos de datos.',
      whatItCalculates: 'Calcula el determinante det(A), la matriz adjunta adj(A) y la matriz inversa.',
      howToUse: [
        'Seleccione las dimensiones de la matriz.',
        'Introduzca los coeficientes numéricos.',
        'Haga clic en calcular.'
      ],
      formula: 'A⁻¹ = (1 / det(A)) × adj(A)',
      formulaVariables: [
        { symbol: 'A', name: 'Matriz de entrada', explanation: 'Matriz cuadrada.' }
      ],
      inputs: [
        { name: 'Elementos de matriz', description: 'Valores reales.', unit: 'Número Real', optional: false }
      ],
      unitsAndConversions: 'Adimensional.',
      workedExample: {
        scenario: 'Inversa de A = [[4, 7], [2, 6]].',
        stepByStep: [
          'Determinante det(A) = 24 - 14 = 10.',
          'Matriz adjunta adj(A) = [[6, -7], [-2, 4]].',
          'Inversa A⁻¹ = [[0,6, -0,7], [-0,2, 0,4]].'
        ],
        result: 'Matriz Inversa A⁻¹ = [[0,6, -0,7], [-0,2, 0,4]]'
      },
      understandingResults: 'El producto A × A⁻¹ devuelve la matriz identidad.',
      assumptions: 'Requiere det(A) ≠ 0.',
      limitations: 'Las matrices con determinante cero no tienen inversa.',
      faqs: [
        { question: '¿Cuándo no se puede invertir?', answer: 'Cuando el determinante es cero (matriz singular).' }
      ],
      relatedTools
    }),
    fr: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'La calculatrice d’Inverse de Matrice détermine A⁻¹ telle que A × A⁻¹ = I pour les matrices carrées.',
      whoUsesIt: 'Étudiants en algèbre linéaire, ingénieurs 3D et data scientists.',
      whatItCalculates: 'Déterminant, comatrice transposée et coefficients inversés.',
      howToUse: ['Choisissez la dimension.', 'Saisissez les coefficients.', 'Obtenez la matrice inverse.'],
      formula: 'A⁻¹ = (1 / det(A)) × adj(A)',
      inputs: [{ name: 'Coefficients', description: 'Valeurs réelles.', unit: 'Scalaire', optional: false }],
      workedExample: {
        scenario: 'Inversion de A = [[4, 7], [2, 6]].',
        stepByStep: ['det(A) = 10.', 'adj(A) = [[6, -7], [-2, 4]].', 'A⁻¹ = [[0,6, -0,7], [-0,2, 0,4]].'],
        result: 'Matrice Inverse A⁻¹ = [[0,6, -0,7], [-0,2, 0,4]]'
      },
      understandingResults: 'Le produit matriciel avec l’inverse donne la matrice identité.',
      assumptions: 'Hypothèse d’un déterminant non nul det(A) ≠ 0.',
      limitations: 'Les matrices singulières (det = 0) ne sont pas inversibles.',
      faqs: [{ question: 'Quand une matrice n’est-elle pas inversible ?', answer: 'Lorsque son déterminant est égal à zéro.' }],
      relatedTools
    }),
    de: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Der Inverse Matrix-Rechner berechnet die inverse Matrix A⁻¹ für quadratische Matrizen mit A × A⁻¹ = I.',
      whoUsesIt: 'Studenten der linearen Algebra, Entwickler für 3D-Grafik und Datenwissenschaftler.',
      whatItCalculates: 'Ermittelt die Determinante det(A), die Adjunkte adj(A) und die inverse Matrix.',
      howToUse: ['Wählen Sie die Dimensionen der Matrix.', 'Geben Sie die Koeffizienten ein.', 'Klicken Sie auf Berechnen.'],
      formula: 'A⁻¹ = (1 / det(A)) × adj(A)',
      inputs: [{ name: 'Matrixelemente', description: 'Reelle Zahlenwerte.', unit: 'Zahl', optional: false }],
      workedExample: {
        scenario: 'Invertierung von A = [[4, 7], [2, 6]].',
        stepByStep: ['Determinante det(A) = 24 - 14 = 10.', 'Adjunkte adj(A) = [[6, -7], [-2, 4]].', 'Inverse Matrix A⁻¹ = [[0,6, -0,7], [-0,2, 0,4]].'],
        result: 'Inverse Matrix A⁻¹ = [[0,6, -0,7], [-0,2, 0,4]]'
      },
      understandingResults: 'Das Produkt aus Matrix und Inverser ergibt die Einheitsmatrix.',
      assumptions: 'Voraussetzung ist det(A) ≠ 0.',
      limitations: 'Singuläre Matrizen (det = 0) besitzen keine Inverse.',
      faqs: [{ question: 'Wann ist eine Matrix nicht invertierbar?', answer: 'Wenn ihre Determinante gleich null ist.' }],
      relatedTools
    })
  },

  // 2. MATRIX DETERMINANT CALCULATOR
  'matrix-determinant': {
    en: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'The Matrix Determinant calculator computes scalar determinants for 2x2, 3x3, and n×n square matrices using cofactor Laplace expansion and diagonal elimination.',
      whoUsesIt: 'Mathematicians, physicists, structural engineers, computer graphics programmers, and econometrics modelers.',
      whatItCalculates: 'Calculates the scalar determinant value, geometric volume scaling factor, and tests for matrix non-singularity.',
      howToUse: [
        'Select the square matrix dimension (2x2, 3x3, or 4x4).',
        'Input the scalar coefficients across row and column coordinates.',
        'View the determinant computation with step-by-step cofactor minors.'
      ],
      formula: '2×2: det(A) = ad - bc | 3×3: det(A) = a(ei − fh) − b(di − fg) + c(dh − eg)',
      formulaVariables: [
        { symbol: 'det(A)', name: 'Determinant', explanation: 'Scalar value characterizing the linear transformation volume and invertibility.' },
        { symbol: 'a, b, c...', name: 'Matrix Elements', explanation: 'Individual numerical row-column coefficients.' }
      ],
      inputs: [
        { name: 'Matrix Cells', description: 'Numerical coefficients of the square matrix.', unit: 'Real Number', optional: false }
      ],
      unitsAndConversions: 'Determinants are unitless scalar magnitudes representing hypervolume scaling factors.',
      workedExample: {
        scenario: 'Evaluate determinant of 2x2 matrix A = [[5, 3], [2, 4]].',
        stepByStep: [
          'Identify diagonal products: Main diagonal = 5 × 4 = 20.',
          'Identify anti-diagonal: Secondary diagonal = 3 × 2 = 6.',
          'Subtract anti-diagonal from main diagonal: det(A) = 20 - 6 = 14.'
        ],
        result: 'det(A) = 14 (Positive, non-zero: matrix is invertible and preserves orientation)'
      },
      understandingResults: 'A non-zero determinant indicates linearly independent rows/columns and the existence of a unique inverse.',
      assumptions: 'Operates exclusively on square matrices (equal number of rows and columns).',
      limitations: 'Rectangular matrices do not possess a standard determinant.',
      faqs: [
        { question: 'What does a zero determinant mean?', answer: 'A determinant of zero (det = 0) indicates linearly dependent vectors, zero geometric volume, and lack of an inverse matrix.' },
        { question: 'What is the geometric meaning of a determinant?', answer: 'In 2D it represents the signed area of the parallelogram formed by row vectors; in 3D it represents the signed volume of the parallelepiped.' }
      ],
      relatedTools
    }),
    ar: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'تحسب حاسبة محدد المصفوفة (Matrix Determinant) القيمة السلمية للمصفوفات المربعة (2x2، 3x3، 4x4) باستخدام نشر لابلاس ومعاملات المرافقات.',
      whoUsesIt: 'طلاب الرياضيات، مهندسو الهياكل، ومبرمجو الرسوميات ثلاثية الأبعاد.',
      whatItCalculates: 'قيمة المحدد السلمي، عامل قياس الحجم الهندسي، والتحقق من قابلية العكس.',
      howToUse: [
        'حدد أبعاد المصفوفة المربعة (2×2 أو 3×3).',
        'أدخل الأعداد في خلايا المصفوفة.',
        'احصل على المحدد مع تفصيل خطوات الحساب بالقطرين أو بطريقة لابلاس.'
      ],
      formula: '2×2: det(A) = ad - bc | 3×3: det(A) = a(ei − fh) − b(di − fg) + c(dh − eg)',
      inputs: [
        { name: 'عناصر المصفوفة', description: 'المعاملات الرقمية للمصفوفة.', unit: 'رقم حقيقي', optional: false }
      ],
      workedExample: {
        scenario: 'حساب محدد المصفوفة [[5، 3]، [2، 4]].',
        stepByStep: [
          'حاصل ضرب القطر الرئيسي: 5 × 4 = 20.',
          'حاصل ضرب القطر الثانوي: 3 × 2 = 6.',
          'طرح القطر الثانوي من الرئيسي: 20 - 6 = 14.'
        ],
        result: 'المحدد det(A) = 14'
      },
      understandingResults: 'المحدد غير الصفري يثبت استقلالية الصفوف ووجود حل وحيد لنظام المعادلات.',
      assumptions: 'يشترط مصفوفة مربعة حصراً.',
      limitations: 'المصفوفات غير المربعة لا تملك محدداً.',
      faqs: [
        { question: 'ماذا يعني محدد يساوي صفراً؟', answer: 'يعني أن المصفوفة منفردة، وأن الصفوف مرتبطة خطياً ولا يوجد معكوس للمصفوفة.' }
      ],
      relatedTools
    }),
    es: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Calcula el determinante escalar de matrices cuadradas 2x2, 3x3 y n×n mediante la regla de Laplace y diagonales.',
      whoUsesIt: 'Estudiantes de ingeniería, física y matemáticas aplicadas.',
      whatItCalculates: 'Determinante escalar y factor de escala de volumen geométrico.',
      howToUse: ['Seleccione dimensión.', 'Introduzca coeficientes.', 'Consulte el determinante calculado.'],
      formula: '2×2: det(A) = ad - bc',
      inputs: [{ name: 'Elementos', description: 'Coeficientes.', unit: 'Escalar', optional: false }],
      workedExample: {
        scenario: 'Matriz [[5, 3], [2, 4]].',
        stepByStep: ['5 × 4 = 20.', '3 × 2 = 6.', 'det = 20 - 6 = 14.'],
        result: 'det(A) = 14'
      },
      understandingResults: 'Determinante no nulo indica matriz invertible.',
      assumptions: 'Matriz cuadrada.',
      limitations: 'Matrices rectangulares no tienen determinante.',
      faqs: [{ question: '¿Qué significa determinante nulo?', answer: 'Indica dependencia lineal y matriz no invertible.' }],
      relatedTools
    }),
    fr: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Calcule le déterminant scalaire d’une matrice carrée 2x2 ou 3x3 par la méthode des cofacteurs.',
      whoUsesIt: 'Étudiants en sciences, physiciens et ingénieurs calcul.',
      whatItCalculates: 'Déterminant scalaire et test d’inversibilité.',
      howToUse: ['Sélectionnez la taille.', 'Entrez les valeurs.', 'Obtenez le déterminant.'],
      formula: '2×2: det(A) = ad - bc',
      inputs: [{ name: 'Coefficients', description: 'Valeurs réelles.', unit: 'Scalaire', optional: false }],
      workedExample: {
        scenario: 'Matrice [[5, 3], [2, 4]].',
        stepByStep: ['20 - 6 = 14.'],
        result: 'det(A) = 14'
      },
      understandingResults: 'Un déterminant non nul garantit l’unicité des solutions d’un système linéaire.',
      assumptions: 'Matrice carrée obligatoire.',
      limitations: 'Non défini pour les matrices rectangulaires.',
      faqs: [{ question: 'Que signifie un déterminant nul ?', answer: 'La matrice est singulière et non inversible.' }],
      relatedTools
    }),
    de: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Ermittelt die Determinante quadratischer Matrizen (2x2, 3x3) nach dem Laplaceschen Entwicklungssatz.',
      whoUsesIt: 'Mathematiker, Ingenieure und Physikstudenten.',
      whatItCalculates: 'Skalare Determinante und geometrischer Volumenfaktor.',
      howToUse: ['Dimension wählen.', 'Werte eintragen.', 'Determinante ablesen.'],
      formula: '2×2: det(A) = ad - bc',
      inputs: [{ name: 'Koeffizienten', description: 'Zahlenwerte.', unit: 'Skalar', optional: false }],
      workedExample: {
        scenario: 'Matrix [[5, 3], [2, 4]].',
        stepByStep: ['5 × 4 = 20.', '3 × 2 = 6.', 'det = 20 - 6 = 14.'],
        result: 'det(A) = 14'
      },
      understandingResults: 'Eine Determinante ungleich null beweist die Invertierbarkeit der Matrix.',
      assumptions: 'Quadratische Matrix vorausgesetzt.',
      limitations: 'Für rechteckige Matrizen nicht definiert.',
      faqs: [{ question: 'Was bedeutet det = 0?', answer: 'Lineare Abhängigkeit und keine Existenz einer Inversen.' }],
      relatedTools
    })
  },

  // 3. VECTOR CALCULATOR (Magnitude, Cross Product, Dot Product)
  'vector-calculator': {
    en: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'The Vector Calculator solves 2D and 3D vector operations including Euclidean magnitude, dot product, cross product, unit normalization, and spatial angle between vectors.',
      whoUsesIt: 'Physics students, mechanical engineers, 3D graphics developers, robotics programmers, and aerospace analysts.',
      whatItCalculates: 'Vector magnitude ||v||, scalar dot product (u · v), vector cross product (u × v), and angular separation θ.',
      howToUse: [
        'Select coordinate space dimension (2D or 3D).',
        'Enter vector components [x, y, z] for Vector U and Vector V.',
        'Choose desired operation (Magnitude, Dot Product, Cross Product, or Angle).'
      ],
      formula: '||v|| = √(x² + y² + z²) | u · v = ux·vx + uy·vy + uz·vz | u × v = [uy·vz - uz·vy, uz·vx - ux·vz, ux·vy - uy·vx]',
      formulaVariables: [
        { symbol: '||v||', name: 'Magnitude', explanation: 'Euclidean spatial length of the vector.' },
        { symbol: 'u · v', name: 'Dot Product', explanation: 'Scalar projection product proportional to cos(θ).' },
        { symbol: 'u × v', name: 'Cross Product', explanation: 'Orthogonal pseudovector whose magnitude equals area of parallelogram.' }
      ],
      inputs: [
        { name: 'Vector Components (x, y, z)', description: 'Cartesian coordinate projections.', unit: 'Real Units', optional: false }
      ],
      unitsAndConversions: 'Components take units of physical quantities (meters, Newtons, m/s). Dot products take units squared.',
      workedExample: {
        scenario: 'Find magnitude and dot product for 3D vectors u = [3, 4, 0] and v = [1, 2, 2].',
        stepByStep: [
          'Calculate magnitude of u: ||u|| = √(3² + 4² + 0²) = √(9 + 16) = √25 = 5.0.',
          'Calculate magnitude of v: ||v|| = √(1² + 2² + 2²) = √(1 + 4 + 4) = √9 = 3.0.',
          'Calculate dot product: u · v = (3 × 1) + (4 × 2) + (0 × 2) = 3 + 8 + 0 = 11.0.',
          'Calculate angle θ: cos(θ) = 11 / (5 × 3) = 11 / 15 ≈ 0.7333 → θ = arccos(0.7333) ≈ 42.83°.'
        ],
        result: '||u|| = 5.00 | ||v|| = 3.00 | Dot Product = 11.00 | Angle θ = 42.83°'
      },
      understandingResults: 'A dot product of zero indicates perpendicular orthogonal vectors (θ = 90°).',
      assumptions: 'Assumes Euclidean flat space with Cartesian orthogonal coordinate axes.',
      limitations: 'Cross product is uniquely defined only in 3-dimensional and 7-dimensional vector spaces.',
      faqs: [
        { question: 'What is the physical meaning of the dot product?', answer: 'Work done by a force vector along a displacement vector (W = F · d), or directional alignment.' },
        { question: 'What is the direction of the cross product vector?', answer: 'It is perpendicular to both original vectors, determined by the right-hand coordinate rule.' }
      ],
      relatedTools
    }),
    ar: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'حاسبة المتجهات تحسب العمليات المتجهية في الفضاء الثنائي والثلاثي الأبعاد: الطول الإقليدي، الجداء النقطي (القياسي)، الجداء الشعاعي (المتجهي)، والزاوية بين متجهين.',
      whoUsesIt: 'طلاب الفيزياء والهندسة، مطورو محركات الألعاب ثلاثية الأبعاد، ومهندسو الميكانيكا والروبوتات.',
      whatItCalculates: 'مقدار المتجه ||v||، الجداء النقطي u · v، الجداء الشعاعي u × v، والزاوية بينهما.',
      howToUse: [
        'حدد أبعاد المتجه (ثنائي أو ثلاثي الأبعاد).',
        'أدخل مركبات المتجه الأول والمتجه الثاني [س، ص، ع].',
        'اختر العملية المطلوبة لعرض النتائج مع الخطوات الرياضية.'
      ],
      formula: '||v|| = √(x² + y² + z²) | u · v = ux·vx + uy·vy + uz·vz | u × v = مصفوفة محددات متجهات الوحدة',
      inputs: [
        { name: 'مركبات المتجه', description: 'الإحداثيات الكارتيزية على المحاور.', unit: 'وحدة طول أو قوة', optional: false }
      ],
      workedExample: {
        scenario: 'حساب طول والجداء القياسي للمتجهين u = [3، 4، 0] و v = [1، 2، 2].',
        stepByStep: [
          'طول u: جذر(9 + 16) = 5.0.',
          'طول v: جذر(1 + 4 + 4) = 3.0.',
          'الجداء القياسي: (3×1) + (4×2) + (0×2) = 11.0.',
          'الزاوية: جيب التمام = 11 / 15 ≈ 0.7333 → الزاوية = 42.83 درجة.'
        ],
        result: 'طول u = 5.00 | طول v = 3.00 | الجداء = 11.00 | الزاوية = 42.83°'
      },
      understandingResults: 'الجداء القياسي الصفري يعني أن المتجهين متعامدان بزاوية 90 درجة.',
      assumptions: 'الفضاء الإقليدي الكارتيزي المسطح.',
      limitations: 'الجداء المتجهي معرف في الفضاء ثلاثي الأبعاد.',
      faqs: [
        { question: 'ما هو التطبيق الفيزيائي للجداء النقطي؟', answer: 'حساب الشغل الميكانيكي (الشغل = القوة · الإزاحة).' }
      ],
      relatedTools
    }),
    es: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Calculadora de vectores para magnitud 2D/3D, producto escalar, producto vectorial y ángulo entre vectores.',
      whoUsesIt: 'Estudiantes de física, robótica y desarrollo de videojuegos.',
      whatItCalculates: 'Módulo, producto punto, producto cruz y ángulo.',
      howToUse: ['Introduzca componentes de los vectores.', 'Seleccione la operación.'],
      formula: '||v|| = √(x² + y² + z²) | u · v = Σ ui·vi',
      inputs: [{ name: 'Componentes', description: 'Coordenadas cartesianas.', unit: 'Unidades', optional: false }],
      workedExample: {
        scenario: 'Vectores u = [3, 4, 0] y v = [1, 2, 2].',
        stepByStep: ['||u|| = 5.', '||v|| = 3.', 'u · v = 11.', 'Ángulo = 42,83°.'],
        result: 'Módulo u = 5 | Producto punto = 11 | Ángulo = 42,83°'
      },
      understandingResults: 'Producto punto 0 indica perpendicularidad.',
      assumptions: 'Espacio euclídeo.',
      limitations: 'Producto vectorial en 3D.',
      faqs: [{ question: '¿Para qué sirve el producto punto?', answer: 'Cálculo de trabajo mecánico y proyecciones.' }],
      relatedTools
    }),
    fr: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Calculateur vectoriel 2D/3D : norme euclidienne, produit scalaire, produit vectoriel et angle.',
      whoUsesIt: 'Étudiants en physique, robotique et infographie.',
      whatItCalculates: 'Norme, produit scalaire, produit vectoriel.',
      howToUse: ['Entrez les coordonnées.', 'Visualisez les résultats.'],
      formula: '||v|| = √(x² + y² + z²)',
      inputs: [{ name: 'Composantes', description: 'Coordonnées.', unit: 'Unités', optional: false }],
      workedExample: {
        scenario: 'u = [3, 4, 0], v = [1, 2, 2].',
        stepByStep: ['||u|| = 5.', 'u · v = 11.', 'Angle = 42,83°.'],
        result: 'Norme = 5 | Produit scalaire = 11 | Angle = 42,83°'
      },
      understandingResults: 'Produit scalaire nul = orthogonalité.',
      assumptions: 'Repère orthonormé.',
      limitations: 'Produit vectoriel défini dans R³.',
      faqs: [{ question: 'Que signifie un produit scalaire nul ?', answer: 'Les vecteurs sont orthogonaux.' }],
      relatedTools
    }),
    de: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Vektorrechner für 2D- und 3D-Vektoren: Betrag, Skalarprodukt, Kreuzprodukt und Winkel.',
      whoUsesIt: 'Physiker, Maschinenbauer und Spieleentwickler.',
      whatItCalculates: 'Vektorbetrag, Skalarprodukt, Kreuzprodukt.',
      howToUse: ['Vektorkomponenten eintragen.', 'Ergebnisse berechnen.'],
      formula: '||v|| = √(x² + y² + z²)',
      inputs: [{ name: 'Komponenten', description: 'Kartesische Koordinaten.', unit: 'Einheit', optional: false }],
      workedExample: {
        scenario: 'u = [3, 4, 0], v = [1, 2, 2].',
        stepByStep: ['||u|| = 5.', 'Skalarprodukt = 11.', 'Winkel = 42,83°.'],
        result: 'Betrag = 5 | Skalarprodukt = 11 | Winkel = 42,83°'
      },
      understandingResults: 'Skalarprodukt 0 bedeutet Orthogonalität (90° Winkel).',
      assumptions: 'Euklidischer Raum.',
      limitations: 'Kreuzprodukt im 3D-Raum.',
      faqs: [{ question: 'Wofür wird das Skalarprodukt genutzt?', answer: 'Zur Berechnung mechanischer Arbeit und Winkel.' }],
      relatedTools
    })
  },

  // 4. DIFFERENTIAL EQUATION CALCULATOR
  'differential-equation': {
    en: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'The Differential Equation calculator solves first and second-order ordinary differential equations (ODEs), initial value problems (IVPs), and systems of linear differential equations using analytic integration and numerical approximations.',
      whoUsesIt: 'Applied mathematicians, physics researchers, electrical circuit modelers, and biomedical engineers.',
      whatItCalculates: 'General solutions y(x), particular solutions with boundary conditions y(x₀) = y₀, characteristic roots, and phase curves.',
      howToUse: [
        'Select the equation order (1st Order dy/dx or 2nd Order d²y/dx²).',
        'Enter differential coefficients and driving function f(x).',
        'Specify initial conditions if solving a boundary value problem.',
        'View the general homogeneous solution and particular integral.'
      ],
      formula: '1st Order: dy/dx + P(x)y = Q(x) | 2nd Order: a(d²y/dx²) + b(dy/dx) + cy = 0',
      formulaVariables: [
        { symbol: 'dy/dx', name: 'Derivative', explanation: 'Rate of change of dependent variable y with respect to x.' },
        { symbol: 'P(x), Q(x)', name: 'Coefficients', explanation: 'Continuous coefficient functions along the integration domain.' },
        { symbol: 'C₁, C₂', name: 'Integration Constants', explanation: 'Arbitrary constants determined by initial conditions.' }
      ],
      inputs: [
        { name: 'Equation Terms', description: 'Coefficients of differential terms and forcing function.', unit: 'Function / Constant', optional: false },
        { name: 'Initial Conditions y(x₀)', description: 'Known boundary values at reference points.', unit: 'Real Number', optional: true }
      ],
      unitsAndConversions: 'Variables correspond to physical parameters such as time (seconds), displacement (meters), or charge (Coulombs).',
      workedExample: {
        scenario: 'Solve the initial value problem dy/dx = 3y with initial condition y(0) = 5.',
        stepByStep: [
          'Separate variables: dy / y = 3 dx.',
          'Integrate both sides: ∫(1/y) dy = ∫ 3 dx → ln|y| = 3x + C.',
          'Exponentiate: y(x) = A · e^(3x) where A = e^C.',
          'Apply initial condition: y(0) = 5 → A · e^(0) = 5 → A = 5.',
          'Final particular solution: y(x) = 5 · e^(3x).'
        ],
        result: 'Particular Solution: y(x) = 5 · e^(3x) (Exponential growth model)'
      },
      understandingResults: 'The exponential response illustrates characteristic growth or damping dictated by the ODE’s eigenvalue roots.',
      assumptions: 'Assumes continuous coefficient functions satisfying the Picard–Lindelöf existence and uniqueness theorem.',
      limitations: 'Nonlinear differential equations without closed-form analytic solutions require numerical runge-kutta integration.',
      faqs: [
        { question: 'What is the difference between general and particular solutions?', answer: 'A general solution contains arbitrary constants (C) representing an entire family of curves. A particular solution solves for specific constants using known initial boundary conditions.' },
        { question: 'Where are differential equations applied in real life?', answer: 'In Newton’s law of cooling, radioactive decay, population growth, harmonic oscillators, RLC electrical circuits, and aerodynamic trajectory modeling.' }
      ],
      relatedTools
    }),
    ar: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'حاسبة المعادلات التفاضلية تحل المعادلات التفاضلية العادية (ODEs) من الرتبة الأولى والثانية ومسائل القيمة الابتدائية بالطرق التحليلية والتكاملية.',
      whoUsesIt: 'طلاب الرياضيات التطبيقية، باحثو الفيزياء، مهندسو الكهرباء، ومصممو نماذج الديناميكا الهوائية.',
      whatItCalculates: 'الحل العام y(x)، الحل الخاص وفق الشروط الابتدائية، والجذور المميزة.',
      howToUse: [
        'حدد رتبة المعادلة (الرتبة الأولى أو الثانية).',
        'أدخل معاملات المعادلة والدالة المؤثرة f(x).',
        'أدخل الشروط الابتدائية لاستخراج الحل الخاص بدقة.'
      ],
      formula: 'dy/dx + P(x)y = Q(x) | a(d²y/dx²) + b(dy/dx) + cy = 0',
      inputs: [
        { name: 'معاملات المعادلة', description: 'معاملات المشتقات والدالة.', unit: 'دالة رياضية', optional: false }
      ],
      workedExample: {
        scenario: 'حل مسألة القيمة الابتدائية dy/dx = 3y بشرط y(0) = 5.',
        stepByStep: [
          'فصل المتغيرات: dy / y = 3 dx.',
          'مكاملة الطرفين: ln(y) = 3x + C.',
          'أخذ الدالة الأسية: y(x) = A · e^(3x).',
          'التعويض بالشرط الابتدائي: y(0) = 5 → A = 5.',
          'الحل الخاص النهائي: y(x) = 5 · e^(3x).'
        ],
        result: 'الحل الخاص: y(x) = 5 · e^(3x)'
      },
      understandingResults: 'يمثل الحل سلوك التغير الديناميكي للنظام، مثل النمو الأسي أو التضاؤل التوافقي.',
      assumptions: 'استمرارية الدوال وتوفر شروط نظرية بيكارد للوجود والوحدانية.',
      limitations: 'المعادلات غير الخطية المعقدة تتطلب حلولاً عددية تقريبية مثل طريقة رونج-كوتا.',
      faqs: [
        { question: 'ما الفرق بين الحل العام والحل الخاص؟', answer: 'الحل العام يحتوي على ثوابت اختيارية (C)، بينما الحل الخاص يحدد قيمة هذه الثوابت باستخدام الشروط الابتدائية.' }
      ],
      relatedTools
    }),
    es: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Calculadora de ecuaciones diferenciales ordinarias (EDO) de primer y segundo orden y problemas de valor inicial.',
      whoUsesIt: 'Estudiantes de ciencias, ingenieros de control y modeladores matemáticos.',
      whatItCalculates: 'Solución general y particular con condiciones de contorno.',
      howToUse: ['Seleccione orden.', 'Introduzca coeficientes.', 'Añada condiciones iniciales.'],
      formula: 'dy/dx + P(x)y = Q(x)',
      inputs: [{ name: 'Términos', description: 'Coeficientes.', unit: 'Función', optional: false }],
      workedExample: {
        scenario: 'dy/dx = 3y, con y(0) = 5.',
        stepByStep: ['Separación de variables.', 'Integración.', 'Aplicar condición y(0) = 5.'],
        result: 'Solución: y(x) = 5 · e^(3x)'
      },
      understandingResults: 'La solución describe el comportamiento dinámico del sistema.',
      assumptions: 'Funciones continuas.',
      limitations: 'EDO no lineales requieren métodos numéricos.',
      faqs: [{ question: '¿Qué es una solución particular?', answer: 'Es la solución específica cuando se conocen condiciones iniciales.' }],
      relatedTools
    }),
    fr: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Calculateur d’équations différentielles ordinaires (EDO) du 1er et 2nd ordre avec conditions initiales.',
      whoUsesIt: 'Étudiants en mathématiques, physiciens et ingénieurs.',
      whatItCalculates: 'Solution générale et solution particulière.',
      howToUse: ['Sélectionnez l’ordre.', 'Entrez les termes.', 'Consultez la solution.'],
      formula: 'dy/dx + P(x)y = Q(x)',
      inputs: [{ name: 'Termes', description: 'Coefficients.', unit: 'Fonction', optional: false }],
      workedExample: {
        scenario: 'dy/dx = 3y, y(0) = 5.',
        stepByStep: ['Séparation des variables.', 'Intégration.', 'y(0) = 5 donne constante = 5.'],
        result: 'Solution particulière : y(x) = 5 · e^(3x)'
      },
      understandingResults: 'Exprime l’évolution dynamique et temporelle du modèle physique.',
      assumptions: 'Conditions du théorème d’existence de Cauchy-Lipschitz vérifiées.',
      limitations: 'Les équations fortement non linéaires requièrent une intégration numérique.',
      faqs: [{ question: 'Qu’est-ce qu’une condition initiale ?', answer: 'Une valeur connue permettant de fixer les constantes d’intégration.' }],
      relatedTools
    }),
    de: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Löser für gewöhnliche Differentialgleichungen (DGL) 1. und 2. Ordnung sowie Anfangswertprobleme.',
      whoUsesIt: 'Mathematiker, Physiker und Regelungstechniker.',
      whatItCalculates: 'Allgemeine und spezielle Lösung mit Anfangsbedingungen.',
      howToUse: ['Ordnung wählen.', 'Koeffizienten eingeben.', 'Anfangsbedingungen ergänzen.'],
      formula: 'dy/dx + P(x)y = Q(x)',
      inputs: [{ name: 'Gleichungsterme', description: 'Koeffizienten.', unit: 'Funktion', optional: false }],
      workedExample: {
        scenario: 'dy/dx = 3y mit y(0) = 5.',
        stepByStep: ['Trennung der Variablen.', 'Integration beider Seiten.', 'Anfangsbedingung einsetzen.'],
        result: 'Spezielle Lösung: y(x) = 5 · e^(3x)'
      },
      understandingResults: 'Beschreibt exponentielle Wachstumsprozesse oder Schwingungen.',
      assumptions: 'Stetige Koeffizientenfunktionen vorausgesetzt.',
      limitations: 'Nichtlineare DGL erfordern numerische Runge-Kutta-Verfahren.',
      faqs: [{ question: 'Was ist eine Anfangsbedingung?', answer: 'Ein gegebener Startwert zur Festlegung der Integrationskonstante.' }],
      relatedTools
    })
  },

  // 10. COMBINATORICS & PERMUTATIONS (nCr & nPr)
  'combinatorics-ncr': {
    en: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'The Combinations (nCr) & Permutations (nPr) Calculator computes subsets (combinations where order does not matter) and ordered sequences (permutations where order matters) from a collection of items, complete with step-by-step factorial breakdowns.',
      whoUsesIt: 'Students of discrete mathematics and probability, researchers in statistics, data analysts, lottery and game theorists, and software engineers designing algorithmic permutations.',
      whatItCalculates: 'Calculates combinations C(n, r), permutations P(n, r), permutations with repetition n^r, combinations with replacement (n+r-1)Cr, and full factorial expansions (n!, r!, (n-r)!).',
      howToUse: [
        'Enter the total number of items in the set (n).',
        'Enter the number of items to select or arrange (r).',
        'Inspect the unordered combinations C(n, r) and ordered permutations P(n, r).',
        'Review the complete factorial values and step-by-step algebraic breakdown.'
      ],
      formula: 'C(n, r) = n! / (r! × (n - r)!)   |   P(n, r) = n! / (n - r)!',
      formulaVariables: [
        { symbol: 'n', name: 'Total Set Items', explanation: 'The total number of distinct elements in the original pool (n ≥ 0).' },
        { symbol: 'r', name: 'Sample / Subset Size', explanation: 'The number of elements chosen or arranged from the pool (0 ≤ r ≤ n).' },
        { symbol: 'n!', name: 'Factorial of n', explanation: 'The product of all positive integers up to n (n × (n-1) × ... × 1).' },
        { symbol: 'C(n, r)', name: 'Combinations (nCr)', explanation: 'Number of distinct unordered groups chosen from n items.' },
        { symbol: 'P(n, r)', name: 'Permutations (nPr)', explanation: 'Number of distinct ordered sequences formed from n items.' }
      ],
      inputs: [
        { name: 'Total Items (n)', description: 'Total elements available in the set.', unit: 'Integer', optional: false },
        { name: 'Selected Items (r)', description: 'Elements selected or arranged.', unit: 'Integer', optional: false }
      ],
      unitsAndConversions: 'Dimensionless integer counts of possible groupings and arrangements.',
      workedExample: {
        scenario: 'Choose a committee of 3 members from a group of 8 candidates (n = 8, r = 3), and calculate ordered rankings for 1st, 2nd, and 3rd place.',
        stepByStep: [
          'Identify parameters: Total items n = 8, selected subset r = 3.',
          'Compute factorials: 8! = 40,320; 3! = 6; (8 - 3)! = 5! = 120.',
          'Calculate Combinations (nCr): C(8, 3) = 8! / (3! × 5!) = 40,320 / (6 × 120) = 40,320 / 720 = 56.',
          'Calculate Permutations (nPr): P(8, 3) = 8! / 5! = 40,320 / 120 = 336.'
        ],
        result: 'Combinations C(8, 3) = 56 unordered groups | Permutations P(8, 3) = 336 ordered rankings'
      },
      understandingResults: 'Combinations represent unordered groups (order does not matter), while permutations represent ordered sequences (order matters).',
      assumptions: 'Assumes discrete distinct items sampled without replacement by default.',
      limitations: 'Values of n > 100 produce astronomically large numbers handled via scientific notation.',
      faqs: [
        {
          question: 'What is the core difference between combinations and permutations?',
          answer: 'Order is the distinguishing factor: in permutations, the sequence order matters (e.g., [A, B] ≠ [B, A] like a passcode), whereas in combinations, order does not matter (e.g., [A, B] = [B, A] like a fruit salad).'
        },
        {
          question: 'What happens if r is greater than n?',
          answer: 'Without repetition, you cannot select more items than exist in the set, resulting in 0 possible combinations or permutations. With replacement, selections of any size are valid.'
        },
        {
          question: 'Why does 0! equal 1?',
          answer: 'By mathematical definition and the empty product rule, there is exactly one way to arrange zero items, ensuring algebraic consistency across combinatorial formulas.'
        }
      ],
      relatedTools
    }),
    ar: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'تحسب حاسبة التوافيق (nCr) والتباديل (nPr) عدد المجموعات غير المرتبة (التوافيق) والترتيبات التسلسلية (التباديل) لعينة من العناصر مع توضيح خطوات فك المضروب الرياضي بالتفصيل.',
      whoUsesIt: 'طلاب الرياضيات والإحصاء ونظرية الاحتمالات، باحثو علوم البيانات، مبرمجو الخوارزميات، ومصممو نماذج التشفير والألعاب.',
      whatItCalculates: 'تحسب التوافيق C(n, r) والتباديل P(n, r) وحسابات التكرار وفك قيم المضروب (n! و r! و (n-r)!).',
      howToUse: [
        'أدخل إجمالي عدد عناصر المجموعة الكلية (n).',
        'أدخل عدد العناصر المراد اختيارها أو ترتيبها (r).',
        'اطلع على التوافيق (دون اعتبار للترتيب) والتباديل (مع مراعاة الترتيب).',
        'راجع خطوات الفك الحسابي وقيم المضروب والمعادلة الرياضية فورياً.'
      ],
      formula: 'C(n, r) = n! / (r! × (n - r)!)   |   P(n, r) = n! / (n - r)!',
      formulaVariables: [
        { symbol: 'n', name: 'إجمالي عناصر المجموعة', explanation: 'العدد الكلي للعناصر المتاحة للاختيار (n ≥ 0).' },
        { symbol: 'r', name: 'حجم العينة المختارة', explanation: 'عدد العناصر المطلوب اختيارها أو ترتيبها (0 ≤ r ≤ n).' },
        { symbol: 'n!', name: 'مضروب n', explanation: 'حاصل ضرب جميع الأعداد الصحيحة الموجبة حتى n.' },
        { symbol: 'C(n, r)', name: 'التوافيق (nCr)', explanation: 'عدد التجميعات غير المرتبة الممكنة.' },
        { symbol: 'P(n, r)', name: 'التباديل (nPr)', explanation: 'عدد الترتيبات التسلسلية الممكنة.' }
      ],
      inputs: [
        { name: 'إجمالي العناصر (n)', description: 'العدد الكلي للعناصر المتاحة.', unit: 'عدد صحيح', optional: false },
        { name: 'العناصر المختارة (r)', description: 'عدد العناصر المراد اختيارها.', unit: 'عدد صحيح', optional: false }
      ],
      unitsAndConversions: 'أعداد صحيحة مجردة من الوحدات تعبر عن عدد الاحتمالات والترتيبات.',
      workedExample: {
        scenario: 'اختيار لجنة من 3 أشخاص من بين 8 مرشحين (n = 8, r = 3)، وحساب عدد الترتيبات إذا كانت المناصب محددة.',
        stepByStep: [
          'تحديد المعطيات: إجمالي العناصر n = 8، حجم العينة r = 3.',
          'حساب المضاريب: 8! = 40,320 و 3! = 6 و (8 - 3)! = 5! = 120.',
          'حساب التوافيق C(8, 3) = 40,320 / (6 × 120) = 56 طريقة لاختيار اللجنة دون اعتبار للترتيب.',
          'حساب التباديل P(8, 3) = 40,320 / 120 = 336 طريقة مختلفة لشغل المناصب المحددة.'
        ],
        result: 'التوافيق C(8, 3) = 56 مجموعة | التباديل P(8, 3) = 336 ترتيباً'
      },
      understandingResults: 'التوافيق تعبر عن اختيار مجموعات لا يهم فيها الترتيب، بينما التباديل تعبر عن ترتيبات تسلسلية يمثل الترتيب فيها عاملاً أساسياً.',
      assumptions: 'تفترض عناصر مميزة يتم سحبها بدون إرجاع افتراضياً.',
      limitations: 'القيم الكبيرة جداً لـ n (> 100) يتم التعبير عنها بالترميز العلمي للأسس.',
      faqs: [
        {
          question: 'ما هو الفرق الجوهري بين التوافيق والتباديل؟',
          answer: 'الترتيب هو الفيصل: في التباديل الترتيب مهم جداً (مثل كلمة المرور أو المراكز الأولى والثانية)، أما في التوافيق فالترتيب غير مهم (مثل اختيار فريق أو سلة فواكه).'
        },
        {
          question: 'ماذا يحدث إذا كانت r أكبر من n؟',
          answer: 'في السحب بدون إرجاع، لا يمكن اختيار عناصر أكثر من المتوفرة في المجموعة وتكون النتيجة 0. أما مع التكرار فيمكن اختيار أي عدد.'
        },
        {
          question: 'لماذا مضروب الصفر 0! يساوي 1؟',
          answer: 'بحسب التعريف الرياضي وقاعدة الجداء الفارغ، توجد طريقة واحدة فقط لترتيب صفر من العناصر، مما يحافظ على التناسق الجبري لمعادلات التوافيق والتباديل.'
        }
      ],
      relatedTools
    }),
    es: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'La calculadora de Combinaciones (nCr) y Permutaciones (nPr) calcula el número de subconjuntos sin orden y ordenaciones posibles a partir de un conjunto de elementos con desglose factorial paso a paso.',
      whoUsesIt: 'Estudiantes de matemáticas discretas, probabilidad, analistas de datos e ingenieros.',
      whatItCalculates: 'Combinaciones C(n, r), permutaciones P(n, r), con y sin reemplazo, y factoriales (n!, r!, (n-r)!).',
      howToUse: ['Introduce el total de elementos (n).', 'Introduce el número de elementos a elegir (r).', 'Visualiza resultados inmediatos y desglose de fórmulas.'],
      formula: 'C(n, r) = n! / (r! × (n - r)!)   |   P(n, r) = n! / (n - r)!',
      inputs: [
        { name: 'Total de elementos (n)', description: 'Tamaño del conjunto original.', unit: 'Entero', optional: false },
        { name: 'Elementos seleccionados (r)', description: 'Muestra a seleccionar o ordenar.', unit: 'Entero', optional: false }
      ],
      workedExample: {
        scenario: 'Elegir un comité de 3 personas entre 8 candidatos (n = 8, r = 3).',
        stepByStep: ['8! = 40.320, 3! = 6, 5! = 120.', 'Combinaciones C(8, 3) = 40.320 / (6 × 120) = 56.', 'Permutaciones P(8, 3) = 40.320 / 120 = 336.'],
        result: 'Combinaciones C(8, 3) = 56 | Permutaciones P(8, 3) = 336'
      },
      understandingResults: 'Las combinaciones no toman en cuenta el orden; las permutaciones sí.',
      assumptions: 'Elementos discretos sin repetición por defecto.',
      limitations: 'Valores muy altos se representan en notación científica.',
      faqs: [{ question: '¿Cuál es la diferencia clave?', answer: 'El orden: en las permutaciones el orden importa; en las combinaciones no.' }],
      relatedTools
    }),
    fr: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'La calculatrice de Combinaisons (nCr) et Permutations (nPr) détermine le nombre de tirages sans ordre et d’arrangements ordonnés avec factorielles détaillées étape par étape.',
      whoUsesIt: 'Étudiants en probabilités, mathématiciens, data scientists et développeurs.',
      whatItCalculates: 'Combinaisons C(n, r), arrangements P(n, r), avec et sans remise, et factorielles (n!, r!, (n-r)!).',
      howToUse: ['Entrez le nombre total d’éléments (n).', 'Entrez le nombre d’éléments à choisir (r).', 'Consultez les combinaisons et permutations détaillées.'],
      formula: 'C(n, r) = n! / (r! × (n - r)!)   |   P(n, r) = n! / (n - r)!',
      inputs: [
        { name: 'Éléments totaux (n)', description: 'Taille de l’ensemble.', unit: 'Entier', optional: false },
        { name: 'Éléments choisis (r)', description: 'Taille de l’échantillon.', unit: 'Entier', optional: false }
      ],
      workedExample: {
        scenario: 'Sélection d’un comité de 3 personnes parmi 8 candidats (n = 8, r = 3).',
        stepByStep: ['8! = 40 320, 3! = 6, 5! = 120.', 'Combinaisons C(8, 3) = 40 320 / 720 = 56.', 'Permutations P(8, 3) = 40 320 / 120 = 336.'],
        result: 'Combinaisons C(8, 3) = 56 | Permutations P(8, 3) = 336'
      },
      understandingResults: 'Les combinaisons ne tiennent pas compte de l’ordre, contrairement aux permutations.',
      assumptions: 'Éléments distincts sans remise par défaut.',
      limitations: 'Les très grands nombres utilisent la notation scientifique.',
      faqs: [{ question: 'Quelle est la différence essentielle ?', answer: 'L’ordre : il compte pour les permutations (arrangements) mais pas pour les combinaisons.' }],
      relatedTools
    }),
    de: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Der Rechner für Kombinationen (nCr) und Permutationen (nPr) berechnet ungeordnete Teilmengen und geordnete Reihenfolgen mit schrittweisen Fakultätsberechnungen.',
      whoUsesIt: 'Studenten der Stochastik, Statistiker, Datenanalysten und Softwareentwickler.',
      whatItCalculates: 'Kombinationen C(n, r), Permutationen P(n, r), mit/ohne Wiederholung und Fakultäten (n!, r!, (n-r)!).',
      howToUse: ['Gesamtzahl der Elemente (n) eingeben.', 'Anzahl der auszuwählenden Elemente (r) eingeben.', 'Ergebnisse und Rechenschritte ansehen.'],
      formula: 'C(n, r) = n! / (r! × (n - r)!)   |   P(n, r) = n! / (n - r)!',
      inputs: [
        { name: 'Gesamtelemente (n)', description: 'Mächtigkeit der Grundmenge.', unit: 'Ganzzahl', optional: false },
        { name: 'Auswahl (r)', description: 'Anzahl der gezogenen Elemente.', unit: 'Ganzzahl', optional: false }
      ],
      workedExample: {
        scenario: 'Auswahl eines 3-köpfigen Komitees aus 8 Kandidaten (n = 8, r = 3).',
        stepByStep: ['8! = 40.320, 3! = 6, 5! = 120.', 'Kombinationen C(8, 3) = 40.320 / 720 = 56.', 'Permutationen P(8, 3) = 40.320 / 120 = 336.'],
        result: 'Kombinationen C(8, 3) = 56 | Permutationen P(8, 3) = 336'
      },
      understandingResults: 'Kombinationen berücksichtigen die Reihenfolge nicht; Permutationen beachten die Reihenfolge.',
      assumptions: 'Diskrete unterscheidbare Elemente ohne Zurücklegen.',
      limitations: 'Große Zahlenwerte werden in wissenschaftlicher Exponentialschreibweise ausgegeben.',
      faqs: [{ question: 'Was ist der Hauptunterschied?', answer: 'Die Reihenfolge: Bei Permutationen ist die Reihenfolge entscheidend, bei Kombinationen unwichtig.' }],
      relatedTools
    })
  },

  // 6. KINETIC ENERGY CALCULATOR
  'kinetic-energy': {
    en: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'The Kinetic Energy Calculator computes the energy an object possesses due to its motion, using its mass and velocity to deliver instant results in Joules.',
      whoUsesIt: 'Physics students, mechanical engineers, automotive safety researchers, ballistics experts, sports biomechanists, and educators.',
      whatItCalculates: 'Total Kinetic Energy (E_k) in Joules (J), Kilojoules (kJ), Megajoules (MJ), linear momentum (p = mv), and equivalent work energy units (kcal, Wh).',
      howToUse: [
        'Enter the mass (m) of the moving object and select the unit (kg, g, lb, tonnes).',
        'Enter the velocity or speed (v) of the object and select the unit (m/s, km/h, mph, ft/s).',
        'Explore preset real-world scenarios (passenger vehicles, athletes, projectiles) for fast benchmarks.',
        'Review computed Kinetic Energy, linear momentum, and step-by-step mathematical verification.'
      ],
      formula: 'E_k = ½ × m × v²  |  p = m × v',
      formulaVariables: [
        { symbol: 'm', name: 'Mass (m)', explanation: 'The mass of the moving object in kilograms (kg).' },
        { symbol: 'v', name: 'Velocity (v)', explanation: 'The velocity or speed of the object in meters per second (m/s).' },
        { symbol: 'E_k', name: 'Kinetic Energy (E_k)', explanation: 'The resulting motion energy measured in Joules (J), where 1 J = 1 kg·m²/s².' },
        { symbol: 'p', name: 'Linear Momentum (p)', explanation: 'The product of mass and velocity measured in kilogram-meters per second (kg·m/s).' }
      ],
      inputs: [
        { name: 'Mass (m)', description: 'Total mass or weight of the object in motion.', unit: 'kg (or g, lb, t)', optional: false },
        { name: 'Velocity (v)', description: 'Rate of motion and speed of the object.', unit: 'm/s (or km/h, mph, ft/s)', optional: false }
      ],
      unitsAndConversions: '1 Joule (J) = 0.001 kJ = 1 N·m = 1 kg·m²/s² | 1 kcal = 4,184 J | 1 Watt-hour = 3,600 J.',
      workedExample: {
        scenario: 'Evaluating a 1,500 kg passenger vehicle cruising at a velocity of 20 m/s (72 km/h or ~45 mph).',
        stepByStep: [
          'Identify given parameters: Mass m = 1,500 kg, Velocity v = 20 m/s.',
          'Square the velocity: v² = (20 m/s)² = 400 m²/s².',
          'Compute Kinetic Energy: E_k = ½ × m × v² = 0.5 × 1,500 kg × 400 m²/s² = 300,000 Joules (300 kJ).',
          'Compute Linear Momentum: p = m × v = 1,500 kg × 20 m/s = 30,000 kg·m/s.'
        ],
        result: 'Kinetic Energy E_k = 300,000 J (300.00 kJ / 0.30 MJ) | Linear Momentum = 30,000 kg·m/s'
      },
      understandingResults: 'Kinetic energy scales linearly with mass (m) but quadratically with velocity (v²). Doubling speed quadruples the kinetic energy (2² = 4), requiring 4 times the braking work and stopping distance.',
      assumptions: 'Assumes classical Newtonian mechanics where object speed is significantly below relativistic thresholds (v ≪ c).',
      limitations: 'At near-light speeds (v > 0.1c), relativistic kinetic energy E_k = (γ - 1)mc² must be applied instead of classical mechanics.',
      faqs: [
        {
          question: 'What is kinetic energy?',
          answer: 'Kinetic energy is the form of energy that an object or particle possesses by reason of its motion, defined as the work needed to accelerate a body of a given mass from rest to its stated velocity.'
        },
        {
          question: 'What happens to kinetic energy when speed doubles?',
          answer: 'Because velocity is squared in the formula (E_k = ½mv²), doubling the speed multiplies kinetic energy by 4 (2² = 4). Tripling the speed multiplies kinetic energy by 9 (3² = 9).'
        },
        {
          question: 'What is the difference between kinetic energy and momentum?',
          answer: 'Momentum (p = mv) is a directional vector quantity conserved in all collisions, whereas Kinetic Energy (E_k = ½mv²) is a scalar measure of mechanical work potential conserved only in perfectly elastic collisions.'
        }
      ],
      relatedTools
    }),
    ar: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'تحسب حاسبة الطاقة الحركية (Kinetic Energy Calculator) الطاقة التي يمتلكها الجسم بسبب حركته، معتمدة على كتلته وسرعته لتقديم نتائج دقيقة وفورية بالجول ووحدات الطاقة المختلفة.',
      whoUsesIt: 'طلاب ومعلمو الفيزياء، ومهندسو الميكانيكا، وباحثو أمان السيارات والمركبات، وخبراء المقذوفات، والميكانيكا الحيوية الرياضية.',
      whatItCalculates: 'طاقة الحركة الإجمالية (E_k) بالجول والكيلوجول والميجاجول، وكمية الحركة الخطية (الزخم p = mv)، ومكافئ الطاقة بالحريرات والواط/ساعة.',
      howToUse: [
        'أدخل كتلة الجسم المتحرك (m) واختر الوحدة المناسبة (كجم، جرام، باوند، طن).',
        'أدخل سرعة الجسم (v) واختر الوحدة (م/ث، كم/ساعة، ميل/ساعة، قدم/ث).',
        'استكشف السيناريوهات الفيزيائية الجاهزة (سيارة، رياضي عداء، مقذوف) للمقارنة السريعة.',
        'اطلع على الطاقة الحركية والزخم الخطي وخطوات البرهان الرياضي التفصيلية.'
      ],
      formula: 'طاقة الحركة E_k = ½ × m × v²  |  الزخم الخطي p = m × v',
      formulaVariables: [
        { symbol: 'm', name: 'الكتلة (m)', explanation: 'كتلة الجسم المتحرك مقاسة بالكيلوجرام (kg).' },
        { symbol: 'v', name: 'السرعة (v)', explanation: 'سرعة تحرك الجسم مقاسة بالمتر في الثانية (m/s).' },
        { symbol: 'E_k', name: 'الطاقة الحركية (E_k)', explanation: 'الطاقة الحركية الناتجة مقاسة بالجول (J)، حيث 1 جول = 1 كجم·م²/ث².' },
        { symbol: 'p', name: 'الزخم الخطي (p)', explanation: 'كمية الحركة الخطية مقاسة بالكيلوجرام·متر/ثانية (kg·m/s).' }
      ],
      inputs: [
        { name: 'الكتلة (m)', description: 'الكتلة الإجمالية للجسم المتحرك.', unit: 'كجم (أو جم، باوند، طن)', optional: false },
        { name: 'السرعة (v)', description: 'معدل سرعة واتجاه حركة الجسم.', unit: 'م/ث (أو كم/س، ميل/س)', optional: false }
      ],
      unitsAndConversions: '1 جول = 0.001 كيلو جول = 1 نيوتن·متر | 1 سعرة حرارية غذائية = 4,184 جول | 1 واط·ساعة = 3,600 جول.',
      workedExample: {
        scenario: 'حساب الطاقة الحركية لمركبة ركاب كتلتها 1,500 كجم تسير بسرعة 20 م/ث (72 كم/ساعة).',
        stepByStep: [
          'تحديد المعطيات: الكتلة m = 1,500 كجم، السرعة v = 20 م/ث.',
          'تربيع السرعة: v² = (20 م/ث)² = 400 م²/ث².',
          'تطبيق معادلة الطاقة الحركية: E_k = 0.5 × 1,500 كجم × 400 م²/ث² = 300,000 جول (300 كيلو جول).',
          'حساب الزخم الخطي: p = 1,500 كجم × 20 م/ث = 30,000 كجم·م/ث.'
        ],
        result: 'الطاقة الحركية = 300,000 جول (300.00 كيلو جول / 0.30 ميجاجول) | الزخم الخطي = 30,000 كجم·م/ث'
      },
      understandingResults: 'تتناسب الطاقة الحركية طردياً مع الكتلة ومربع السرعة. مضاعفة السرعة مرتين يضاعف الطاقة الحركية 4 مرات (2² = 4)، مما يتطلب جهداً كبحياً ومسافة توقف أكبر بأربع أضعاف.',
      assumptions: 'تعتمد الميكانيكا الكلاسيكية لنيوتن للأجسام ذات السرعات الاعتيادية (أقل بكثير من سرعة الضوء).',
      limitations: 'عند السرعات القريبة من الضوء (v > 0.1c)، يجب تطبيق معادلة آينشتاين للنسبية الخاصة.',
      faqs: [
        {
          question: 'ما هي الطاقة الحركية؟',
          answer: 'هي الطاقة التي يمتلكها الجسم بسبب حركته، وتساوي الشغل اللازم لتسريع جسم من السكون إلى سرعته الحالية.'
        },
        {
          question: 'ماذا يحدث للطاقة الحركية عند مضاعفة السرعة؟',
          answer: 'نظراً لأن السرعة مربعة في القانون (E_k = ½mv²)، فإن مضاعفة السرعة تزيد الطاقة الحركية بمقدار 4 أضعاف (2² = 4)، ومضاعفتها 3 مرات يزيدها 9 أضعاف.'
        },
        {
          question: 'ما الفرق بين الطاقة الحركية والزخم (كمية الحركة)؟',
          answer: 'الزخم (p = mv) كمية متجهة محفوظة في جميع التصادمات، بينما الطاقة الحركية (E_k = ½mv²) كمية قياسية تمثل قدرة الشغل ولا تُحفظ إلا في التصادمات المرنة تماماً.'
        }
      ],
      relatedTools
    }),
    es: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'La calculadora de Energía Cinética determina la energía que posee un objeto debido a su movimiento a partir de su masa y velocidad, expresando el resultado en Julios (J).',
      whoUsesIt: 'Estudiantes de física, ingenieros mecánicos, peritos de tráfico y biomecánicos.',
      whatItCalculates: 'Energía Cinética (E_k) en Julios (J), Kilojulios (kJ), Megajulios (MJ) y momento lineal (p = mv).',
      howToUse: [
        'Introduzca la masa (m) del objeto y seleccione la unidad (kg, g, lb, t).',
        'Introduzca la velocidad (v) y seleccione la unidad (m/s, km/h, mph).',
        'Consulte los resultados instantáneos de energía cinética y momento lineal.'
      ],
      formula: 'E_k = ½ × m × v²  |  p = m × v',
      formulaVariables: [
        { symbol: 'm', name: 'Masa (m)', explanation: 'Masa del cuerpo en kilogramos (kg).' },
        { symbol: 'v', name: 'Velocidad (v)', explanation: 'Velocidad del cuerpo en metros por segundo (m/s).' },
        { symbol: 'E_k', name: 'Energía Cinética (E_k)', explanation: 'Energía mecánica de movimiento en Julios (J).' }
      ],
      inputs: [
        { name: 'Masa (m)', description: 'Masa del objeto en movimiento.', unit: 'kg (o g, lb, t)', optional: false },
        { name: 'Velocidad (v)', description: 'Velocidad de desplazamiento.', unit: 'm/s (o km/h, mph)', optional: false }
      ],
      unitsAndConversions: '1 Julio (J) = 0,001 kJ = 1 kg·m²/s² | 1 kcal = 4.184 J.',
      workedExample: {
        scenario: 'Vehículo de 1.500 kg que circula a 20 m/s (72 km/h).',
        stepByStep: [
          'Datos: masa m = 1.500 kg, velocidad v = 20 m/s.',
          'Cuadrado de la velocidad: v² = (20 m/s)² = 400 m²/s².',
          'Cálculo: E_k = 0,5 × 1.500 kg × 400 m²/s² = 300.000 Julios (300 kJ).'
        ],
        result: 'Energía Cinética E_k = 300.000 J (300 kJ) | Momento lineal = 30.000 kg·m/s'
      },
      understandingResults: 'La energía cinética aumenta con el cuadrado de la velocidad: duplicar la velocidad cuadruplica la energía cinética.',
      assumptions: 'Mecánica clásica no relativista.',
      limitations: 'Para velocidades cercanas a la de la luz rige la teoría de la relatividad.',
      faqs: [
        { question: '¿Qué ocurre al duplicar la velocidad?', answer: 'La energía cinética se multiplica por 4 debido al término cuadrático (v²).' }
      ],
      relatedTools
    }),
    fr: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Le calculateur d\'Énergie Cinétique calcule l\'énergie d\'un corps liée à son mouvement en fonction de sa masse et de sa vitesse, avec des résultats instantanés en Joules (J).',
      whoUsesIt: 'Étudiants en physique, ingénieurs mécaniciens, experts en sécurité routière et biomécaniciens.',
      whatItCalculates: 'Énergie cinétique (E_k) en Joules (J), Kilojoules (kJ), Mégajoules (MJ) et quantité de mouvement (p = mv).',
      howToUse: [
        'Saisissez la masse (m) de l\'objet et choisissez l\'unité (kg, g, lb, t).',
        'Saisissez la vitesse (v) de l\'objet et choisissez l\'unité (m/s, km/h, mph).',
        'Consultez l\'énergie cinétique calculée et la quantité de mouvement.'
      ],
      formula: 'E_k = ½ × m × v²  |  p = m × v',
      formulaVariables: [
        { symbol: 'm', name: 'Masse (m)', explanation: 'Masse du corps en kilogrammes (kg).' },
        { symbol: 'v', name: 'Vitesse (v)', explanation: 'Vitesse du corps en mètres par seconde (m/s).' },
        { symbol: 'E_k', name: 'Énergie Cinétique (E_k)', explanation: 'Énergie du mouvement en Joules (J).' }
      ],
      inputs: [
        { name: 'Masse (m)', description: 'Masse du corps en déplacement.', unit: 'kg (ou g, lb, t)', optional: false },
        { name: 'Vitesse (v)', description: 'Vitesse de déplacement.', unit: 'm/s (ou km/h, mph)', optional: false }
      ],
      unitsAndConversions: '1 Joule (J) = 0,001 kJ = 1 kg·m²/s² | 1 kcal = 4 184 J.',
      workedExample: {
        scenario: 'Véhicule de 1 500 kg roulant à 20 m/s (72 km/h).',
        stepByStep: [
          'Données : masse m = 1 500 kg, vitesse v = 20 m/s.',
          'Carré de la vitesse : v² = (20 m/s)² = 400 m²/s².',
          'Calcul : E_k = 0,5 × 1 500 kg × 400 m²/s² = 300 000 Joules (300 kJ).'
        ],
        result: 'Énergie Cinétique E_k = 300 000 J (300 kJ) | Quantité de mouvement = 30 000 kg·m/s'
      },
      understandingResults: 'L\'énergie cinétique croît avec le carré de la vitesse : doubler la vitesse quadruple l\'énergie cinétique.',
      assumptions: 'Mécanique classique newtonienne.',
      limitations: 'Aux vitesses relativistes proches de la lumière, la relativité restreinte s\'applique.',
      faqs: [
        { question: 'Que se passe-t-il si la vitesse double ?', answer: 'L\'énergie cinétique est multipliée par 4 en raison du terme v².' }
      ],
      relatedTools
    }),
    de: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Der Kinetische Energie Rechner berechnet die Bewegungsenergie eines Körpers anhand seiner Masse und Geschwindigkeit mit sofortigen Ergebnissen in Joule (J).',
      whoUsesIt: 'Physikstudenten, Maschinenbauingenieure, Unfallanalytiker und Sportwissenschaftler.',
      whatItCalculates: 'Kinetische Energie (E_k) in Joule (J), Kilojoule (kJ), Megajoule (MJ) und linearen Impuls (p = mv).',
      howToUse: [
        'Masse (m) des Objekts eingeben und Einheit wählen (kg, g, lb, t).',
        'Geschwindigkeit (v) eingeben und Einheit wählen (m/s, km/h, mph).',
        'Berechnete kinetische Energie und Impuls ablesen.'
      ],
      formula: 'E_k = ½ × m × v²  |  p = m × v',
      formulaVariables: [
        { symbol: 'm', name: 'Masse (m)', explanation: 'Masse des bewegten Körpers in Kilogramm (kg).' },
        { symbol: 'v', name: 'Geschwindigkeit (v)', explanation: 'Geschwindigkeit in Metern pro Sekunde (m/s).' },
        { symbol: 'E_k', name: 'Kinetische Energie (E_k)', explanation: 'Bewegungsenergie in Joule (J).' }
      ],
      inputs: [
        { name: 'Masse (m)', description: 'Masse des bewegten Körpers.', unit: 'kg (oder g, lb, t)', optional: false },
        { name: 'Geschwindigkeit (v)', description: 'Geschwindigkeit des Objekts.', unit: 'm/s (oder km/h, mph)', optional: false }
      ],
      unitsAndConversions: '1 Joule (J) = 0,001 kJ = 1 kg·m²/s² | 1 kcal = 4.184 J.',
      workedExample: {
        scenario: 'Pkw mit 1.500 kg Masse bei 20 m/s (72 km/h).',
        stepByStep: [
          'Gegeben: Masse m = 1.500 kg, Geschwindigkeit v = 20 m/s.',
          'Geschwindigkeit im Quadrat: v² = (20 m/s)² = 400 m²/s².',
          'Berechnung: E_k = 0,5 × 1.500 kg × 400 m²/s² = 300.000 Joule (300 kJ).'
        ],
        result: 'Kinetische Energie E_k = 300.000 J (300 kJ) | Impuls = 30.000 kg·m/s'
      },
      understandingResults: 'Kinetische Energie skaliert quadratisch mit der Geschwindigkeit: Eine Verdoppelung der Geschwindigkeit vervierfacht die Energie.',
      assumptions: 'Klassische Newtonsche Mechanik.',
      limitations: 'Bei relativistischen Geschwindigkeiten greift die spezielle Relativitätstheorie.',
      faqs: [
        { question: 'Was passiert bei doppelter Geschwindigkeit?', answer: 'Die kinetische Energie vervierfacht sich (2² = 4).' }
      ],
      relatedTools
    })
  },

  // 7. HEX CALCULATOR (hex-calculator)
  'hex-calculator': {
    en: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'The Hex Calculator performs hexadecimal arithmetic (addition, subtraction, multiplication, division, modulo, and bitwise operations) with instant base conversions to Decimal, Binary, Octal, and ASCII.',
      whoUsesIt: 'Software engineers, computer science students, embedded systems developers, reverse engineers, cryptographers, and digital electronics designers.',
      whatItCalculates: 'Hexadecimal arithmetic results, Decimal equivalent values, formatted Binary representations, Octal conversions, 32-bit Two\'s Complement, and ASCII character conversions.',
      howToUse: [
        'Enter Hex Value A (e.g., 1A3F or 2F) using digits 0-9 and letters A-F.',
        'Select the desired arithmetic or bitwise operation (+, -, ×, ÷, %, AND, OR, XOR).',
        'Enter Hex Value B (e.g., 0B4 or 1A).',
        'Explore instant conversions across Hex (0x), Decimal, Binary (nibbles), Octal, and ASCII.'
      ],
      formula: 'Hex Arithmetic: Base-16 (0-9, A=10, B=11, C=12, D=13, E=14, F=15) | Value = Σ (d_i × 16^i)',
      formulaVariables: [
        { symbol: 'Hex A', name: 'Hex Value A', explanation: 'First hexadecimal operand in base-16.' },
        { symbol: 'Hex B', name: 'Hex Value B', explanation: 'Second hexadecimal operand in base-16.' },
        { symbol: 'Result', name: 'Hex Result', explanation: 'The computed base-16 value resulting from the selected operation.' },
        { symbol: 'Dec', name: 'Decimal Equivalent', explanation: 'The base-10 integer representation of the result.' },
        { symbol: 'Bin', name: 'Binary Equivalent', explanation: 'The base-2 binary bit representation grouped in 4-bit nibbles.' }
      ],
      inputs: [
        { name: 'Hex Value A', description: 'First base-16 hexadecimal operand (e.g., 1A3F or 2F).', unit: 'Hex string (0-9, A-F)', optional: false },
        { name: 'Hex Value B', description: 'Second base-16 hexadecimal operand (e.g., 0B4 or 1A).', unit: 'Hex string (0-9, A-F)', optional: false },
        { name: 'Operation', description: 'Mathematical or bitwise operator (+, -, ×, ÷, %, AND, OR, XOR).', unit: 'Operator', optional: false }
      ],
      unitsAndConversions: '1 Hex digit = 4 Bits (1 Nibble) | 2 Hex digits = 8 Bits (1 Byte: 0x00 to 0xFF = 0 to 255) | 4 Hex digits = 16 Bits (1 Word: 0x0000 to 0xFFFF = 0 to 65,535).',
      workedExample: {
        scenario: 'Add 0x2F and 0x1A.',
        stepByStep: [
          'Convert Hex A to Decimal: 0x2F = (2 × 16¹) + (15 × 16⁰) = 32 + 15 = 47.',
          'Convert Hex B to Decimal: 0x1A = (1 × 16¹) + (10 × 16⁰) = 16 + 10 = 26.',
          'Execute Addition in Decimal: 47 + 26 = 73.',
          'Convert back to Hexadecimal: 73 ÷ 16 = 4 remainder 9 -> 0x49.',
          'Convert to Binary: 0x4 (0100) and 0x9 (1001) -> 0100 1001₂.'
        ],
        result: 'Hex Result = 0x49 | Decimal = 73 | Binary = 0100 1001₂ | Octal = 111₈'
      },
      understandingResults: 'Hexadecimal provides a compact, human-readable representation of binary data. Because each hex digit directly corresponds to 4 binary bits (one nibble), conversion between binary and hex requires no complex base math.',
      assumptions: 'Assumes standard base-16 positional numeral representation with valid characters 0-9 and A-F.',
      limitations: 'Division operations truncate to integer quotients and provide remainder; floating-point hex values require IEEE-754 representation.',
      faqs: [
        { question: 'Why is hexadecimal used so heavily in computing and programming?', answer: 'Hexadecimal simplifies binary readability: 1 hex digit represents exactly 4 binary bits (one nibble), and 2 hex digits represent exactly one 8-bit byte (0x00 to 0xFF).' },
        { question: 'What does the "0x" prefix signify?', answer: 'The "0x" prefix is a standard programming notation in C, C++, Java, Python, and JavaScript indicating that the following number is in hexadecimal (base-16) format.' },
        { question: 'How do you perform hexadecimal addition when the sum exceeds 15?', answer: 'Whenever the sum of two digits reaches 16 or greater, you subtract 16 from the current position and carry 1 to the next higher power of 16 (e.g., 0x9 + 0x8 = 17 = 0x11).' }
      ],
      relatedTools
    }),
    ar: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'تقوم حاسبة الهيكس (Hex Calculator) بإجراء كافة العمليات الحسابية والمنطقية على الأعداد السداسية عشرية (Hexadecimal) مع التحويل الفوري للأنظمة العشري، الثنائي، الثماني، وترميز ASCII.',
      whoUsesIt: 'مهندسو البرمجيات، وطلاب علوم الحاسب، ومطورو النظم المدمجة والمعالجات الدقيقة، وخبراء الأمن السيبراني.',
      whatItCalculates: 'نتائج العمليات الحسابية السداسية عشرية، المكافئ العشري (Decimal)، التمثيل الثنائي بالبتات والمجموعات (Nibbles)، النظام الثماني (Octal)، والمتمم الثنائي 32-bit.',
      howToUse: [
        'أدخل القيمة السداسية عشرية الأولى Hex Value A (مثل 1A3F أو 2F).',
        'اختر العملية الحسابية أو المنطقية المطلوبة (+, -, ×, ÷, %, AND, OR, XOR).',
        'أدخل القيمة السداسية عشرية الثانية Hex Value B (مثل 0B4 أو 1A).',
        'شاهد النتائج والتحويلات الفورية مع خطوات الحل التفصيلية.'
      ],
      formula: 'الحساب السداسي عشري: الأساس 16 (0-9، A=10، B=11، C=12، D=13، E=14، F=15) | القيمة = Σ (الخانة × 16^الأس)',
      formulaVariables: [
        { symbol: 'Hex A', name: 'القيمة السداسية عشرية A', explanation: 'العدد الأول بالنظام السداسي عشر (الأساس 16).' },
        { symbol: 'Hex B', name: 'القيمة السداسية عشرية B', explanation: 'العدد الثاني بالنظام السداسي عشر (الأساس 16).' },
        { symbol: 'النتيجة', name: 'ناتج الهيكس', explanation: 'القيمة الناتجة بنظام الأساس 16.' },
        { symbol: 'Dec', name: 'المكافئ العشري', explanation: 'القيمة العددية المقابلة بنظام الأساس 10.' },
        { symbol: 'Bin', name: 'المكافئ الثنائي', explanation: 'التمثيل الثنائي بالأصفار والآحاد (الأساس 2).' }
      ],
      inputs: [
        { name: 'Hex Value A', description: 'العدد السداسي عشري الأول (أرقام 0-9 وحروف A-F).', unit: 'Hex string', optional: false },
        { name: 'Hex Value B', description: 'العدد السداسي عشري الثاني (أرقام 0-9 وحروف A-F).', unit: 'Hex string', optional: false },
        { name: 'العملية', description: 'العملية الحسابية أو المنطقية المراد تنفيذها.', unit: 'رمز العملية', optional: false }
      ],
      unitsAndConversions: 'خانة سداسية عشرية واحدة = 4 بت (Nibble) | خانتان = 8 بت (Byte من 0x00 إلى 0xFF = من 0 إلى 255) | 4 خانات = 16 بت (Word).',
      workedExample: {
        scenario: 'جمع 0x2F مع 0x1A.',
        stepByStep: [
          'تحويل القيمة A للعشري: 0x2F = (2 × 16) + 15 = 32 + 15 = 47.',
          'تحويل القيمة B للعشري: 0x1A = (1 × 16) + 10 = 16 + 10 = 26.',
          'تنفيذ الجمع بالنظام العشري: 47 + 26 = 73.',
          'إعادة التحويل للسداسي عشر: 73 ÷ 16 = 4 والباقي 9 -> 0x49.',
          'التحويل للثنائي: 0x4 تمثل (0100) و 0x9 تمثل (1001) -> 0100 1001₂.'
        ],
        result: 'ناتج الهيكس = 0x49 | العشري = 73 | الثنائي = 0100 1001₂ | الثماني = 111₈'
      },
      understandingResults: 'يمثل النظام السداسي عشري اختصاراً مثالياً للبيانات الثنائية في الحواسيب، حيث تختصر كل خانة 4 بتات ثنائية بدقة مما يسهل قراءة عناوين الذاكرة وألوان الويب (HEX Colors).',
      assumptions: 'صحة الخانات المدخلة ومطابقتها للمجال [0-9, A-F].',
      limitations: 'القسمة تعطي ناتج القسمة الصحيح والباقي، بينما تمثيل الفواصل العائمة يتطلب معيار IEEE-754.',
      faqs: [
        { question: 'لماذا يستخدم النظام السداسي عشر في البرمجة وهندسة الحاسوب؟', answer: 'لأن كل خانة سداسية عشرية تمثل بدقة 4 بتات ثنائية (Nibble)، وكل خانتين تمثلان بايتاً كاملاً (Byte)، مما يجعل قراءة عناوين الذاكرة وبيانات الشبكات مريحة ودقيقة.' },
        { question: 'ماذا تعني البادئة "0x" قبل الرقم؟', answer: 'البادئة "0x" هي اصطلاح قياسي في لغات البرمجة (مثل C, C++, Python, JavaScript) للدلالة على أن الرقم المكتوب هو بنظام الأساس 16 وليس بالنظام العشري.' },
        { question: 'كيف يتم ترحيل الخانات (Carry) في جمع الهيكس؟', answer: 'عندما يتجاوز ناتج جمع خانتين الرقم 15 (F)، نطرح 16 من الناتج ونرحل 1 إلى الخانة الأعلى التالية.' }
      ],
      relatedTools
    }),
    es: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'La Calculadora Hexadecimal realiza operaciones aritméticas (suma, resta, multiplicación, división, módulo y lógicas) con conversiones instantáneas a Decimal, Binario, Octal y ASCII.',
      whoUsesIt: 'Ingenieros de software, estudiantes de ciencias de la computación, desarrolladores de sistemas embebidos y especialistas en ciberseguridad.',
      whatItCalculates: 'Resultados aritméticos hexadecimales, equivalentes decimales, representaciones binarias en nibbles, octales y caracteres ASCII.',
      howToUse: [
        'Ingrese el valor hexadecimal A (ej. 1A3F o 2F).',
        'Seleccione la operación deseada (+, -, ×, ÷, %, AND, OR, XOR).',
        'Ingrese el valor hexadecimal B (ej. 0B4 o 1A).',
        'Revise los resultados y conversiones automáticas paso a paso.'
      ],
      formula: 'Aritmética Hexadecimal: Base 16 (0-9, A=10, B=11, C=12, D=13, E=14, F=15)',
      formulaVariables: [
        { symbol: 'Hex A', name: 'Valor Hexadecimal A', explanation: 'Primer operando en base 16.' },
        { symbol: 'Hex B', name: 'Valor Hexadecimal B', explanation: 'Segundo operando en base 16.' },
        { symbol: 'Resultado', name: 'Resultado Hexadecimal', explanation: 'Valor resultante en base 16.' }
      ],
      inputs: [
        { name: 'Hex Value A', description: 'Primer valor hexadecimal.', unit: 'Hex string', optional: false },
        { name: 'Hex Value B', description: 'Segundo valor hexadecimal.', unit: 'Hex string', optional: false }
      ],
      unitsAndConversions: '1 dígito hex = 4 bits (1 Nibble) | 2 dígitos hex = 8 bits (1 Byte: 0x00 a 0xFF = 0 a 255).',
      workedExample: {
        scenario: 'Sumar 0x2F y 0x1A.',
        stepByStep: ['0x2F = 47 en decimal.', '0x1A = 26 en decimal.', '47 + 26 = 73 en decimal.', '73 en hexadecimal = 0x49.'],
        result: 'Resultado Hex = 0x49 | Decimal = 73 | Binario = 0100 1001₂ | Octal = 111₈'
      },
      understandingResults: 'La representación hexadecimal simplifica la lectura de flujos binarios y direcciones de memoria.',
      assumptions: 'Caracteres válidos en base 16 [0-9, A-F].',
      limitations: 'La división entera proporciona cociente y resto.',
      faqs: [
        { question: '¿Por qué se usa el sistema hexadecimal en informática?', answer: 'Porque cada dígito hexadecimal representa exactamente 4 bits binarios (un nibble), permitiendo representar bytes en sólo 2 caracteres.' }
      ],
      relatedTools
    }),
    fr: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'La Calculatrice Hexadécimale effectue les opérations arithmétiques et logiques en base 16 avec conversions automatiques vers Décimal, Binaire, Octal et ASCII.',
      whoUsesIt: 'Développeurs logiciels, étudiants en informatique, concepteurs de systèmes embarqués et ingénieurs réseau.',
      whatItCalculates: 'Calculs arithmétiques hexadécimaux, équivalents décimaux, représentations binaires par quartets (nibbles) et codes ASCII.',
      howToUse: [
        'Entrez la valeur hexadécimale A (ex. 1A3F ou 2F).',
        'Choisissez l\'opération (+, -, ×, ÷, %, AND, OR, XOR).',
        'Entrez la valeur hexadécimale B (ex. 0B4 ou 1A).',
        'Consultez le résultat calculé et les étapes de conversion détaillées.'
      ],
      formula: 'Arithmétique en base 16 : 0-9, A=10, B=11, C=12, D=13, E=14, F=15',
      formulaVariables: [
        { symbol: 'Hex A', name: 'Valeur Hex A', explanation: 'Premier opérande en base 16.' },
        { symbol: 'Hex B', name: 'Valeur Hex B', explanation: 'Second opérande en base 16.' }
      ],
      inputs: [
        { name: 'Hex Value A', description: 'Premier nombre hexadécimal.', unit: 'Chaîne hex', optional: false },
        { name: 'Hex Value B', description: 'Second nombre hexadécimal.', unit: 'Chaîne hex', optional: false }
      ],
      unitsAndConversions: '1 chiffre hex = 4 bits (1 quartet/nibble) | 2 chiffres hex = 8 bits (1 octet/byte : 0x00 à 0xFF = 0 à 255).',
      workedExample: {
        scenario: 'Additionner 0x2F et 0x1A.',
        stepByStep: ['0x2F = 47 en décimal.', '0x1A = 26 en décimal.', '47 + 26 = 73 en décimal.', '73 en hexadécimal = 0x49.'],
        result: 'Résultat Hex = 0x49 | Décimal = 73 | Binaire = 0100 1001₂ | Octal = 111₈'
      },
      understandingResults: 'L\'hexadécimal offre une lecture compacte et claire des adresses mémoire et des séquences binaires.',
      assumptions: 'Caractères hexadécimaux valides [0-9, A-F].',
      limitations: 'Division entière avec quotient et reste.',
      faqs: [
        { question: 'Pourquoi l\'hexadécimal est-il prépondérant en informatique ?', answer: 'Chaque chiffre hexadécimal correspond rigoureusement à 4 bits binaires, simplifiant l\'adressage mémoire et le codage des couleurs web.' }
      ],
      relatedTools
    }),
    de: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Der Hexadezimal-Rechner führt hexadezimale Rechenoperationen (Addition, Subtraktion, Multiplikation, Division, Modulo, Bitweise Operationen) mit Umrechnung in Dezimal, Binär, Oktal und ASCII durch.',
      whoUsesIt: 'Softwareentwickler, Informatik-Studenten, Embedded-Systems-Ingenieure und IT-Sicherheitsexperten.',
      whatItCalculates: 'Hexadezimale Ergebnisse, Dezimalwerte, binäre Bitmuster in 4-Bit-Nibbles, Oktalwerte und ASCII-Zeichen.',
      howToUse: [
        'Geben Sie den Hex-Wert A ein (z. B. 1A3F oder 2F).',
        'Wählen Sie die Rechenoperation aus (+, -, ×, ÷, %, AND, OR, XOR).',
        'Geben Sie den Hex-Wert B ein (z. B. 0B4 oder 1A).',
        'Sehen Sie das berechnete Ergebnis mit Zwischenschritten ein.'
      ],
      formula: 'Hexadezimalrechnung: Basis 16 (0-9, A=10, B=11, C=12, D=13, E=14, F=15)',
      formulaVariables: [
        { symbol: 'Hex A', name: 'Hex-Wert A', explanation: 'Erster Operand zur Basis 16.' },
        { symbol: 'Hex B', name: 'Hex-Wert B', explanation: 'Zweiter Operand zur Basis 16.' }
      ],
      inputs: [
        { name: 'Hex Value A', description: 'Erster hexadezimaler Wert.', unit: 'Hex-String', optional: false },
        { name: 'Hex Value B', description: 'Zweiter hexadezimaler Wert.', unit: 'Hex-String', optional: false }
      ],
      unitsAndConversions: '1 Hex-Ziffer = 4 Bits (1 Nibble) | 2 Hex-Ziffern = 8 Bits (1 Byte: 0x00 bis 0xFF = 0 bis 255).',
      workedExample: {
        scenario: 'Addition von 0x2F und 0x1A.',
        stepByStep: ['0x2F = 47 dezimal.', '0x1A = 26 dezimal.', '47 + 26 = 73 dezimal.', '73 hexadezimal = 0x49.'],
        result: 'Hex-Ergebnis = 0x49 | Dezimal = 73 | Binär = 0100 1001₂ | Oktal = 111₈'
      },
      understandingResults: 'Hexadezimalzahlen komprimieren Binärzahlen perfekt für Adressräume und Webfarben.',
      assumptions: 'Gültige Hex-Zeichen [0-9, A-F].',
      limitations: 'Ganzzahldivision liefert Quotient und Rest.',
      faqs: [
        { question: 'Warum wird Hexadezimal in der Informatik verwendet?', answer: 'Weil 1 Hex-Ziffer exakt 4 Binärbits (ein Nibble) abbildet und 2 Ziffern genau ein Byte darstellen.' }
      ],
      relatedTools
    })
  }
};

// Aliases matching canonical tool IDs and slugs in tools.ts
ADVANCED_MATH_SPECIALIZED_HANDLERS['hexadecimal-calculator'] = ADVANCED_MATH_SPECIALIZED_HANDLERS['hex-calculator'];
ADVANCED_MATH_SPECIALIZED_HANDLERS['hexadecimal-math-calculator'] = ADVANCED_MATH_SPECIALIZED_HANDLERS['hex-calculator'];
ADVANCED_MATH_SPECIALIZED_HANDLERS['hex-calc'] = ADVANCED_MATH_SPECIALIZED_HANDLERS['hex-calculator'];

// Aliases matching canonical tool IDs and slugs in tools.ts
ADVANCED_MATH_SPECIALIZED_HANDLERS['kinetic-energy-mass-velocity'] = ADVANCED_MATH_SPECIALIZED_HANDLERS['kinetic-energy'];
ADVANCED_MATH_SPECIALIZED_HANDLERS['kinetic-energy-calculator'] = ADVANCED_MATH_SPECIALIZED_HANDLERS['kinetic-energy'];

// Aliases matching canonical tool IDs and slugs in tools.ts
ADVANCED_MATH_SPECIALIZED_HANDLERS['combinations-ncr-permutations-npr'] = ADVANCED_MATH_SPECIALIZED_HANDLERS['combinatorics-ncr'];
ADVANCED_MATH_SPECIALIZED_HANDLERS['combination-permutation'] = ADVANCED_MATH_SPECIALIZED_HANDLERS['combinatorics-ncr'];
ADVANCED_MATH_SPECIALIZED_HANDLERS['permutations-combinations'] = ADVANCED_MATH_SPECIALIZED_HANDLERS['combinatorics-ncr'];
ADVANCED_MATH_SPECIALIZED_HANDLERS['combinations-permutations'] = ADVANCED_MATH_SPECIALIZED_HANDLERS['combinatorics-ncr'];
ADVANCED_MATH_SPECIALIZED_HANDLERS['matrix-inverse-calc'] = ADVANCED_MATH_SPECIALIZED_HANDLERS['matrix-inverse'];
ADVANCED_MATH_SPECIALIZED_HANDLERS['2x2-3x3-inverse-matrix-calculator'] = ADVANCED_MATH_SPECIALIZED_HANDLERS['matrix-inverse'];
ADVANCED_MATH_SPECIALIZED_HANDLERS['matrix-inverse-calculator'] = ADVANCED_MATH_SPECIALIZED_HANDLERS['matrix-inverse'];

ADVANCED_MATH_SPECIALIZED_HANDLERS['matrix-determinant-calculator'] = ADVANCED_MATH_SPECIALIZED_HANDLERS['matrix-determinant'];

ADVANCED_MATH_SPECIALIZED_HANDLERS['vector-magnitude'] = ADVANCED_MATH_SPECIALIZED_HANDLERS['vector-calculator'];
ADVANCED_MATH_SPECIALIZED_HANDLERS['vector-magnitude-dot-product'] = ADVANCED_MATH_SPECIALIZED_HANDLERS['vector-calculator'];
ADVANCED_MATH_SPECIALIZED_HANDLERS['cross-product-vectors'] = ADVANCED_MATH_SPECIALIZED_HANDLERS['vector-calculator'];
ADVANCED_MATH_SPECIALIZED_HANDLERS['3d-vector-cross-product-calculator'] = ADVANCED_MATH_SPECIALIZED_HANDLERS['vector-calculator'];
ADVANCED_MATH_SPECIALIZED_HANDLERS['dot-product-vectors'] = ADVANCED_MATH_SPECIALIZED_HANDLERS['vector-calculator'];
ADVANCED_MATH_SPECIALIZED_HANDLERS['vector-dot-product-angle-between'] = ADVANCED_MATH_SPECIALIZED_HANDLERS['vector-calculator'];
ADVANCED_MATH_SPECIALIZED_HANDLERS['unit-vector-calculator'] = ADVANCED_MATH_SPECIALIZED_HANDLERS['vector-calculator'];
ADVANCED_MATH_SPECIALIZED_HANDLERS['unit-vector-normalization-calculator'] = ADVANCED_MATH_SPECIALIZED_HANDLERS['vector-calculator'];

ADVANCED_MATH_SPECIALIZED_HANDLERS['differential-equations'] = ADVANCED_MATH_SPECIALIZED_HANDLERS['differential-equation'];
ADVANCED_MATH_SPECIALIZED_HANDLERS['system-linear-2vars'] = ADVANCED_MATH_SPECIALIZED_HANDLERS['differential-equation'];
ADVANCED_MATH_SPECIALIZED_HANDLERS['system-linear-3vars'] = ADVANCED_MATH_SPECIALIZED_HANDLERS['differential-equation'];
