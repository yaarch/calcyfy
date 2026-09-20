import { ToolDef, Language } from '../../types';
import { ToolContentDetails } from './types';

export const CLINICAL_HEALTH_SPECIALIZED_HANDLERS: Record<string, Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails>> = {
  // 1. GFR / eGFR CALCULATOR
  'gfr-calculator': {
    en: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'The Estimated Glomerular Filtration Rate (eGFR) calculator evaluates kidney filtration performance using serum creatinine levels, age, and biological sex based on the CKD-EPI (Chronic Kidney Disease Epidemiology Collaboration) equation.',
      whoUsesIt: 'Nephrologists, primary care physicians, nurses, clinical lab technicians, and patients monitoring kidney health.',
      whatItCalculates: 'Estimates kidney filtration rate in mL/min/1.73m² of body surface area to screen for chronic kidney disease (CKD) stages.',
      howToUse: [
        'Enter serum creatinine level in mg/dL or µmol/L.',
        'Select age in years.',
        'Specify biological sex (male or female).'
      ],
      formula: 'eGFR = 142 × min(Scr/κ, 1)^α × max(Scr/κ, 1)^(-1.200) × 0.9938^Age [× 1.012 if Female]',
      formulaVariables: [
        { symbol: 'Scr', name: 'Serum Creatinine', explanation: 'Blood serum creatinine concentration (mg/dL).' },
        { symbol: 'κ', name: 'Kappa', explanation: '0.7 for females, 0.9 for males.' },
        { symbol: 'α', name: 'Alpha', explanation: '-0.241 for females, -0.302 for males.' },
        { symbol: 'Age', name: 'Patient Age', explanation: 'Age in years.' }
      ],
      inputs: [
        { name: 'Serum Creatinine', description: 'Lab blood creatinine measurement.', unit: 'mg/dL', optional: false },
        { name: 'Age', description: 'Patient age in years.', unit: 'Years', optional: false },
        { name: 'Biological Sex', description: 'Biological sex at birth.', unit: 'Select', optional: false }
      ],
      unitsAndConversions: 'Creatinine in mg/dL (1 mg/dL = 88.4 µmol/L). eGFR is normalized to standard body surface area (1.73 m²).',
      workedExample: {
        scenario: 'A 50-year-old female patient with a serum creatinine level of 0.9 mg/dL.',
        stepByStep: [
          'Identify constants for female: κ = 0.7, α = -0.241, multiplier = 1.012.',
          'Calculate ratio Scr/κ = 0.9 / 0.7 = 1.2867.',
          'Apply power exponent max(1.2867, 1)^(-1.200) = 0.7381.',
          'Multiply age decay factor 0.9938^50 = 0.7328.',
          'Combine factors: 142 × 0.7381 × 0.7328 × 1.012 = 77.8 mL/min/1.73m².'
        ],
        result: 'Estimated GFR (eGFR) = 78 mL/min/1.73m² (Normal / Stage 1-2 borderline)'
      },
      understandingResults: 'An eGFR above 90 is considered normal unless kidney damage markers (e.g., proteinuria) exist. An eGFR between 60 and 89 warrants observation, while an eGFR below 60 persistent over 3 months indicates Chronic Kidney Disease (CKD).',
      assumptions: 'Assumes stable renal function without acute kidney injury (AKI), normal muscle mass, and standard dietary intake.',
      limitations: 'Screening estimate only. Not valid during acute renal failure, pregnancy, extreme muscle mass (bodybuilders/amputees), or rapidly changing creatinine levels. Clinical diagnosis requires physician evaluation.',
      faqs: [
        { question: 'What does eGFR measure?', answer: 'eGFR estimates how many milliliters of blood your kidneys filter per minute, normalized to standard body surface area.' },
        { question: 'Is eGFR a definitive diagnostic test?', answer: 'No. eGFR is a clinical screening calculation. Diagnosis of chronic kidney disease requires medical history, urine tests (albuminuria), imaging, and medical evaluation.' }
      ],
      relatedTools
    }),
    ar: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'تقوم حاسبة معدل الترشيح الكبيبي التقديري (eGFR) بتقييم كفاءة عمل الكليتين في تنقية الدم بناءً على مستوى الكرياتينين في المصل، العمر، والجنس باستخدام معادلة CKD-EPI الطبية.',
      whoUsesIt: 'أطباء أ any وأطباء الكلى، الممرضون، والفنيون الطبيون والأفراد المتابعون لصحة الكلى.',
      whatItCalculates: 'تقدير حجم الدم الذي تصفيه الكليتان بالمليلتر في الدقيقة لكل 1.73 متر مربع من مساحة سطح الجسم.',
      howToUse: [
        'أدخل مستوى الكرياتينين في الدم (mg/dL).',
        'حدد العمر بالسنوات.',
        'اختر الجنس البيولوجي (ذكر أو أنثى).'
      ],
      formula: 'eGFR = 142 × min(Scr/κ, 1)^α × max(Scr/κ, 1)^(-1.200) × 0.9938^Age [× 1.012 للأنثى]',
      formulaVariables: [
        { symbol: 'Scr', name: 'الكرياتينين في المصل', explanation: 'تركيز الكرياتينين في الدم (mg/dL).' },
        { symbol: 'κ', name: 'كابا', explanation: '0.7 للإناث، 0.9 للذكور.' },
        { symbol: 'Age', name: 'العمر', explanation: 'العمر بالسنوات.' }
      ],
      inputs: [
        { name: 'الكرياتينين في الدم', description: 'تركيز الكرياتينين المخبري.', unit: 'mg/dL', optional: false },
        { name: 'العمر', description: 'العمر بالسنوات.', unit: 'سنة', optional: false },
        { name: 'الجنس البيولوجي', description: 'ذكر أو أنثى.', unit: 'تحديد', optional: false }
      ],
      unitsAndConversions: 'وحدة الكرياتينين mg/dL (1 mg/dL = 88.4 µmol/L). النتيجة مقيسة بـ mL/min/1.73m².',
      workedExample: {
        scenario: 'مريضة عمرها 50 سنة ومستوى الكرياتينين لديها 0.9 mg/dL.',
        stepByStep: [
          'تطبيق معاملات الإناث: κ = 0.7، α = -0.241.',
          'نسبة الكرياتينينScr/κ = 0.9 / 0.7 = 1.2867.',
          'تطبيق الأس والعمر ومعامل الجنس.',
          'النتيجة الحسابية = 77.8 mL/min/1.73m².'
        ],
        result: 'معدل الترشيح الكبيبي التقديري (eGFR) = 78 mL/min/1.73m²'
      },
      understandingResults: 'النتيجة التي تزيد عن 90 تعتبر طبيعية بوجه عام. النتيجة بين 60 و 89 تحتاج للمتابعة، والنتيجة أقل من 60 المستمرة لأكثر من 3 أشهر قد تشير لأمراض الكلى المزمنة.',
      assumptions: 'تفترض ثبات الوظائف الكلوية والكتلة العضلية الطبيعية.',
      limitations: 'هذه الحسابات تقديرية للاسترشاد فقط وليست تشخيصاً طبياً. لا تنطبق في حالات الفشل الكلوي الحاد أو الحمل أو الضمور العضلي. يجب مراجعة الطبيب المختص دائماً.',
      faqs: [
        { question: 'هل تعتبر نتيجة eGFR تشخيصاً نهائياً؟', answer: 'لا، النتيجة هي مؤشر استرشادي أولي. التشخيص الطبي يتطلب فحص البول ومراجعة أخصائي أمراض الكلى.' }
      ],
      relatedTools
    }),
    es: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'La calculadora de la Tasa de Filtración Glomerular Estimada (eGFR) evalúa la función renal mediante la creatinina en suero, la edad y el sexo según la ecuación CKD-EPI.',
      whoUsesIt: 'Nefrólogos, médicos de atención primaria, enfermeros y pacientes.',
      whatItCalculates: 'Estima la capacidad de filtración de los riñones en mL/min/1.73m².',
      howToUse: [
        'Introduzca la creatinina sérica en mg/dL.',
        'Seleccione la edad en años.',
        'Especifique el sexo biológico.'
      ],
      formula: 'eGFR = 142 × min(Scr/κ, 1)^α × max(Scr/κ, 1)^(-1.200) × 0.9938^Age [× 1.012 si es mujer]',
      formulaVariables: [
        { symbol: 'Scr', name: 'Creatinina sérica', explanation: 'Nivel de creatinina analizado (mg/dL).' }
      ],
      inputs: [
        { name: 'Creatinina sérica', description: 'Valor analítico.', unit: 'mg/dL', optional: false },
        { name: 'Edad', description: 'Edad del paciente.', unit: 'Años', optional: false },
        { name: 'Sexo', description: 'Sexo biológico.', unit: 'Selección', optional: false }
      ],
      unitsAndConversions: 'Creatinina en mg/dL. El filtrado se expresa en mL/min/1.73m².',
      workedExample: {
        scenario: 'Mujer de 50 años con creatinina sérica de 0.9 mg/dL.',
        stepByStep: [
          'Aplicación de la fórmula médica CKD-EPI.',
          'Cálculo de eGFR = 78 mL/min/1.73m².'
        ],
        result: 'Filtrado Glomerular Estimado (eGFR) = 78 mL/min/1.73m²'
      },
      understandingResults: 'Valores >90 indican función normal. Valores <60 persistentes sugieren enfermedad renal crónica.',
      assumptions: 'Presupone masa muscular media y función renal estable.',
      limitations: 'Cálculo orientativo no diagnóstico. Consulte siempre a su médico.',
      faqs: [
        { question: '¿Sustituye la eGFR a la valoración médica?', answer: 'No, es una estimación de cribado analítico.' }
      ],
      relatedTools
    }),
    fr: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Le calculateur du Débit de Filtration Glomérulaire Estimé (DFG / eGFR) évalue la fonction rénale à partir de la créatininémie, de l’âge et du sexe (équation CKD-EPI).',
      whoUsesIt: 'Néphrologues, médecins généralistes et personnels soignants.',
      whatItCalculates: 'Estime le débit de filtration rénale en mL/min/1,73m².',
      howToUse: [
        'Saisissez la créatinine sérique en mg/dL ou µmol/L.',
        'Précisez l’âge du patient.',
        'Indiquez le sexe biologique.'
      ],
      formula: 'eGFR = 142 × min(Scr/κ, 1)^α × max(Scr/κ, 1)^(-1.200) × 0.9938^Age [× 1.012 si femme]',
      formulaVariables: [
        { symbol: 'Scr', name: 'Créatininémie', explanation: 'Créatinine dans le sang (mg/dL).' }
      ],
      inputs: [
        { name: 'Créatinine sérique', description: 'Résultat de laboratoire.', unit: 'mg/dL', optional: false },
        { name: 'Âge', description: 'Âge du patient.', unit: 'Ans', optional: false },
        { name: 'Sexe', description: 'Sexe biologique.', unit: 'Sélection', optional: false }
      ],
      unitsAndConversions: 'Créatinine en mg/dL ou µmol/L. DFG en mL/min/1,73m².',
      workedExample: {
        scenario: 'Femme de 50 ans avec créatinine sérique de 0,9 mg/dL.',
        stepByStep: [
          'Application de la formule CKD-EPI.',
          'DFG calculé = 78 mL/min/1,73m².'
        ],
        result: 'Débit de Filtration Glomérulaire (DFG) = 78 mL/min/1,73m²'
      },
      understandingResults: 'Un DFG > 90 témoigne d’une fonction rénale préservée. Un DFG < 60 nécessite un suivi médical.',
      assumptions: 'Hypothèse de fonction rénale stable hors insuffisance rénale aiguë.',
      limitations: 'Outil d’information. Ne constitue pas un diagnostic médical.',
      faqs: [
        { question: 'Le DFG constitue-t-il un diagnostic ?', answer: 'Non, c’est un indicateur biologique nécessitant une interprétation médicale.' }
      ],
      relatedTools
    }),
    de: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Der eGFR-Rechner (Geschätzte Glomeruläre Filtrationsrate) ermittelt die Nierenfunktion anhand von Serum-Kreatinin, Alter und Geschlecht nach der CKD-EPI-Formel.',
      whoUsesIt: 'Nephrologen, Allgemeinmediziner und Pflegepersonal.',
      whatItCalculates: 'Schätzt die Filterleistung der Nieren in mL/min/1,73m².',
      howToUse: [
        'Tragen Sie den Serum-Kreatinin-Wert ein.',
        'Geben Sie das Alter in Jahren an.',
        'Wählen Sie das biologische Geschlecht aus.'
      ],
      formula: 'eGFR = 142 × min(Scr/κ, 1)^α × max(Scr/κ, 1)^(-1.200) × 0.9938^Age [× 1,012 bei Frauen]',
      formulaVariables: [
        { symbol: 'Scr', name: 'Serum-Kreatinin', explanation: 'Kreatinin-Laborwert im Blut (mg/dL).' }
      ],
      inputs: [
        { name: 'Serum-Kreatinin', description: 'Laborwert im Blut.', unit: 'mg/dL', optional: false },
        { name: 'Alter', description: 'Alter in Jahren.', unit: 'Jahre', optional: false },
        { name: 'Geschlecht', description: 'Biologisches Geschlecht.', unit: 'Auswahl', optional: false }
      ],
      unitsAndConversions: 'Kreatinin in mg/dL (oder µmol/L). eGFR in mL/min/1,73m².',
      workedExample: {
        scenario: '50-jährige Frau mit Serum-Kreatinin von 0,9 mg/dL.',
        stepByStep: [
          'Berechnung nach CKD-EPI-Formel.',
          'Ergebnis eGFR = 78 mL/min/1,73m².'
        ],
        result: 'Geschätzte eGFR = 78 mL/min/1,73m²'
      },
      understandingResults: 'Werte über 90 gelten als normal. Werte unter 60 sollten ärztlich abgeklärt werden.',
      assumptions: 'Unterstellt normale Muskelmasse und stabile Nierenfunktion.',
      limitations: 'Reiner Orientierungswert. Ersetzt keine ärztliche Diagnose.',
      faqs: [
        { question: 'Ist die eGFR eine finale Diagnose?', answer: 'Nein, sie dient als Screening-Wert für klinische Untersuchungen.' }
      ],
      relatedTools
    })
  },

  // 2. MEAN ARTERIAL PRESSURE (MAP) CALCULATOR
  'map-calculator': {
    en: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'The Mean Arterial Pressure (MAP) calculator computes the average blood pressure within a patient’s arterial system during a single cardiac cycle, serving as a critical indicator of organ perfusion pressure.',
      whoUsesIt: 'Critical care physicians, anesthesiologists, emergency medical staff, and intensive care nurses.',
      whatItCalculates: 'Computes MAP in mmHg based on Systolic Blood Pressure (SBP) and Diastolic Blood Pressure (DBP).',
      howToUse: [
        'Enter Systolic Blood Pressure (SBP) in mmHg.',
        'Enter Diastolic Blood Pressure (DBP) in mmHg.'
      ],
      formula: 'MAP = DBP + ⅓(SBP - DBP)  or  MAP = (SBP + 2 × DBP) / 3',
      formulaVariables: [
        { symbol: 'SBP', name: 'Systolic Blood Pressure', explanation: 'Peak pressure during heart contraction (mmHg).' },
        { symbol: 'DBP', name: 'Diastolic Blood Pressure', explanation: 'Resting pressure between heartbeats (mmHg).' }
      ],
      inputs: [
        { name: 'Systolic Pressure (SBP)', description: 'Peak arterial pressure.', unit: 'mmHg', optional: false },
        { name: 'Diastolic Pressure (DBP)', description: 'Resting arterial pressure.', unit: 'mmHg', optional: false }
      ],
      unitsAndConversions: 'Blood pressure is measured in millimeters of mercury (mmHg).',
      workedExample: {
        scenario: 'A patient has a blood pressure reading of 120/80 mmHg.',
        stepByStep: [
          'Identify SBP = 120 mmHg and DBP = 80 mmHg.',
          'Calculate pulse pressure: 120 - 80 = 40 mmHg.',
          'Add ⅓ pulse pressure to DBP: 80 + (40 / 3) = 80 + 13.33 = 93.33 mmHg.'
        ],
        result: 'Mean Arterial Pressure (MAP) = 93 mmHg'
      },
      understandingResults: 'A normal MAP range is between 70 and 100 mmHg. A minimum MAP of 60 to 65 mmHg is necessary to maintain adequate coronary, cerebral, and renal tissue perfusion.',
      assumptions: 'Assumes resting heart rate where cardiac diastole occupies approximately two-thirds of the total cardiac cycle duration.',
      limitations: 'Calculations are estimates. During severe tachycardia or invasive arterial monitoring, invasive sensor measurements supersede standard non-invasive MAP estimates.',
      faqs: [
        { question: 'Why is MAP clinically important?', answer: 'MAP reflects perfusion pressure delivered to vital organs (brain, kidneys, heart). An MAP below 60 mmHg can lead to organ ischemia or shock.' }
      ],
      relatedTools
    }),
    ar: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'تحسب حاسبة متوسط الضغط الشرياني (MAP) متوسط ضغط الدم داخل النظام الشرياني للمريض خلال الدورة القلبية، وهي مؤشر طبي رئيسي لمستوى تروية الأعضاء الحيوية بالدم.',
      whoUsesIt: 'أطباء العناية المركزة، التخدير، الطوارئ، والممرضون.',
      whatItCalculates: 'تحسب متوسط الضغط الشرياني بمقاس mmHg بناءً على الضغط الانقباضي والانبساطي.',
      howToUse: [
        'أدخل ضغط الدم الانقباضي (SBP) بـ mmHg.',
        'أدخل ضغط الدم الانبساطي (DBP) بـ mmHg.'
      ],
      formula: 'MAP = DBP + ⅓(SBP - DBP)  أو  MAP = (SBP + 2 × DBP) / 3',
      formulaVariables: [
        { symbol: 'SBP', name: 'الضغط الانقباضي', explanation: 'الضغط الأقصى أثناء انقباض القلب (mmHg).' },
        { symbol: 'DBP', name: 'الضغط الانبساطي', explanation: 'الضغط أثناء انبساط القلب (mmHg).' }
      ],
      inputs: [
        { name: 'الضغط الانقباضي (SBP)', description: 'أعلى ضغط شرياني.', unit: 'mmHg', optional: false },
        { name: 'الضغط الانبساطي (DBP)', description: 'أدنى ضغط شرياني.', unit: 'mmHg', optional: false }
      ],
      unitsAndConversions: 'يقاس ضغط الدم بمليمتر زئبق (mmHg).',
      workedExample: {
        scenario: 'مريض يبلغ قراءة ضغط دمه 120/80 mmHg.',
        stepByStep: [
          'الضغط الانقباضي = 120، الانبساطي = 80.',
          'الفرق (ضغط النبض) = 120 - 80 = 40 mmHg.',
          'الحساب: 80 + (40 / 3) = 93.33 mmHg.'
        ],
        result: 'متوسط الضغط الشرياني (MAP) = 93 mmHg'
      },
      understandingResults: 'المعدل الطبيعي لـ MAP بين 70 و 100 mmHg. الحد الأدنى المطلوب لضمان تروية الأعضاء الحيوية هو 60 إلى 65 mmHg.',
      assumptions: 'تفترض أن مرحلة الانبساط تستغرق ثلثي مدة الدورة القلبية في حالة الراحة.',
      limitations: 'هذه الحسابات استرشادية فقط وليست بديلاً عن التقييم الطبي. في حالات الطوارئ الشديدة، تعتمد القراءات الشريانية المباشرة.',
      faqs: [
        { question: 'ما هي الأهمية الطبية لـ MAP؟', answer: 'يعكس MAP كفاءة وصول الدم والأكسجين للأعضاء الحيوية مثل الدماغ والكليتين والقلب.' }
      ],
      relatedTools
    }),
    es: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'La calculadora de Presión Arterial Media (MAP) evalúa la presión media en el sistema arterial del paciente durante un ciclo cardíaco completo.',
      whoUsesIt: 'Médicos intensivistas, anestesiólogos y personal de urgencias.',
      whatItCalculates: 'Calcula la PAM en mmHg a partir de la presión sistólica y diastólica.',
      howToUse: [
        'Introduzca la presión sistólica (PAS) en mmHg.',
        'Introduzca la presión diastólica (PAD) en mmHg.'
      ],
      formula: 'MAP = DBP + ⅓(SBP - DBP)',
      formulaVariables: [
        { symbol: 'SBP', name: 'Presión Sistólica', explanation: 'Presión máxima en sístole.' }
      ],
      inputs: [
        { name: 'Presión Sistólica (PAS)', description: 'Tensión alta.', unit: 'mmHg', optional: false },
        { name: 'Presión Diastólica (PAD)', description: 'Tensión baja.', unit: 'mmHg', optional: false }
      ],
      unitsAndConversions: 'Medida en milímetros de mercurio (mmHg).',
      workedExample: {
        scenario: 'Paciente con tensión arterial de 120/80 mmHg.',
        stepByStep: [
          'PAS = 120, PAD = 80.',
          'Presión de pulso = 40.',
          'MAP = 80 + (40 / 3) = 93.3 mmHg.'
        ],
        result: 'Presión Arterial Media (PAM) = 93 mmHg'
      },
      understandingResults: 'Valores normales entre 70 y 100 mmHg. Se requiere al menos 60-65 mmHg para una perfusión tisular adecuada.',
      assumptions: 'Presupone frecuencia cardíaca en reposo.',
      limitations: 'Cálculo estimativo. Consulte al personal sanitario.',
      faqs: [
        { question: '¿Por qué es crucial la PAM?', answer: 'Garantiza la llegada de sangre a órganos vitales como riñón y cerebro.' }
      ],
      relatedTools
    }),
    fr: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Le calculateur de Pression Artérielle Moyenne (PAM / MAP) détermine la pression moyenne régnant dans les artères au cours d’un cycle cardiaque.',
      whoUsesIt: 'Médecins réanimateurs, urgentistes et infirmiers.',
      whatItCalculates: 'Calcule la PAM en mmHg à partir des pressions systolique et diastolique.',
      howToUse: [
        'Entrez la pression systolique (PAS) en mmHg.',
        'Entrez la pression diastolique (PAD) en mmHg.'
      ],
      formula: 'MAP = DBP + ⅓(SBP - DBP)',
      formulaVariables: [
        { symbol: 'SBP', name: 'Pression Systolique', explanation: 'Pression maximale en mmHg.' }
      ],
      inputs: [
        { name: 'Pression Systolique', description: 'PAS en mmHg.', unit: 'mmHg', optional: false },
        { name: 'Pression Diastolique', description: 'PAD en mmHg.', unit: 'mmHg', optional: false }
      ],
      unitsAndConversions: 'Pression mesurée en millimètres de mercure (mmHg).',
      workedExample: {
        scenario: 'Pression artérielle de 120/80 mmHg.',
        stepByStep: [
          'PAS = 120, PAD = 80.',
          'Différence = 40.',
          'PAM = 80 + 13,3 = 93,3 mmHg.'
        ],
        result: 'Pression Artérielle Moyenne (PAM) = 93 mmHg'
      },
      understandingResults: 'Valeur normale entre 70 et 100 mmHg. Une PAM minimale de 60 à 65 mmHg est nécessaire à la perfusion des organes.',
      assumptions: 'Hypothèse d’un rythme cardiaque au repos.',
      limitations: 'Indicateur indicatif nécessitant un suivi médical.',
      faqs: [
        { question: 'Quel est l’intérêt clinique de la PAM ?', answer: 'Elle évalue la bonne perfusion sanguine des organes vitaux.' }
      ],
      relatedTools
    }),
    de: (tool, name, relatedTools) => ({
      toolName: name,
      intro: 'Der MAP-Rechner (Mittlerer Arterieller Blutdruck) berechnet den durchschnittlichen Druck im Arteriensystem während eines Herzzyklus zur Beurteilung der Organperfusion.',
      whoUsesIt: 'Intensivmediziner, Anästhesisten und Notfallmediziner.',
      whatItCalculates: 'Ermittelt den MAP-Wert in mmHg aus systolischem und diastolischem Blutdruck.',
      howToUse: [
        'Tragen Sie den systolischen Blutdruck (RR sys) ein.',
        'Tragen Sie den diastolischen Blutdruck (RR dia) ein.'
      ],
      formula: 'MAP = DBP + ⅓(SBP - DBP)',
      formulaVariables: [
        { symbol: 'SBP', name: 'Systolisch', explanation: 'Systolischer Blutdruck (mmHg).' }
      ],
      inputs: [
        { name: 'Systolischer Druck', description: 'Systole in mmHg.', unit: 'mmHg', optional: false },
        { name: 'Diastolischer Druck', description: 'Diastole in mmHg.', unit: 'mmHg', optional: false }
      ],
      unitsAndConversions: 'Blutdruck in Millimeter Quecksilbersäule (mmHg).',
      workedExample: {
        scenario: 'Blutdruckwert von 120/80 mmHg.',
        stepByStep: [
          'Systole = 120, Diastole = 80.',
          'Pulsdruck = 40.',
          'MAP = 80 + 13,3 = 93,3 mmHg.'
        ],
        result: 'Mittlerer Arterieller Blutdruck (MAP) = 93 mmHg'
      },
      understandingResults: 'Normbereich zwischen 70 und 100 mmHg. Mindestens 60-65 mmHg sind für die Nieren- und Gehirndurchblutung erforderlich.',
      assumptions: 'Unterstellt normalen Ruhepuls.',
      limitations: 'Reiner Schätzwert für die klinische Orientierung.',
      faqs: [
        { question: 'Warum ist der MAP-Wert wichtig?', answer: 'Er zeigt die tatsächliche Durchblutung lebenswichtiger Organe an.' }
      ],
      relatedTools
    })
  }
};

// Aliases matching canonical tool IDs and slugs in tools.ts
CLINICAL_HEALTH_SPECIALIZED_HANDLERS['kidney-gfr-calculator'] = CLINICAL_HEALTH_SPECIALIZED_HANDLERS['gfr-calculator'];
CLINICAL_HEALTH_SPECIALIZED_HANDLERS['egfr-ckd-epi-kidney-function'] = CLINICAL_HEALTH_SPECIALIZED_HANDLERS['gfr-calculator'];
CLINICAL_HEALTH_SPECIALIZED_HANDLERS['mean-arterial-pressure'] = CLINICAL_HEALTH_SPECIALIZED_HANDLERS['map-calculator'];
CLINICAL_HEALTH_SPECIALIZED_HANDLERS['mean-arterial-pressure-map-calculator'] = CLINICAL_HEALTH_SPECIALIZED_HANDLERS['map-calculator'];

