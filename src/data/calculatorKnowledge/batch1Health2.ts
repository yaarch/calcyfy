import { ToolDef, Language } from '../../types';
import { ToolContentDetails } from './types';

type KnowledgeHandler = (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails;

function createKnowledge(dataByLang: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails>): Record<Language, KnowledgeHandler> {
  return dataByLang;
}

// 6. OVULATION DATE & FERTILE WINDOW (ovulation-date)
export const OVULATION_DATE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates estimated ovulation timing, the 6-day fertile window, and the projected date of the next menstrual cycle using calendar-based luteal phase clinical guidelines.`,
    howToUse: [
      'Enter average menstrual cycle length in days (typical range: 21 to 35 days).',
      'Select the first date of your last menstrual period (LMP).',
      'View the estimated ovulation date, peak 6-day fertile conception window, and expected start of your next period.'
    ],
    formula: 'Ovulation Date = LMP + (Cycle Length - 14 days) | Fertile Window: 5 days prior to ovulation through 1 day post-ovulation',
    formulaVariables: [
      { name: 'Cycle Length', description: 'Average number of days between the start of one period and the next.', unit: 'Days', optional: false },
      { name: 'Last Menstrual Period (LMP)', description: 'First day of bleeding of the most recent cycle.', unit: 'Calendar Date', optional: false }
    ],
    workedExample: {
      scenario: 'A 28-day cycle with last period beginning on September 1, 2026.',
      stepByStep: [
        'Days until ovulation: 28 - 14 = 14 days after LMP.',
        'Estimated Ovulation Date: Sep 1 + 14 days = September 15, 2026.',
        'Fertile Window (6 days): 5 days before (Sep 10) through 1 day after (Sep 16).',
        'Next Period Expected: Sep 1 + 28 days = September 29, 2026.'
      ],
      result: 'Estimated Ovulation: Sep 15, 2026 | Fertile Window: Sep 10 - Sep 16, 2026 | Next Period: Sep 29, 2026'
    },
    interpretation: 'Conception probability is highest during the 48 hours immediately preceding ovulation due to the multi-day viability of sperm.',
    assumptions: 'Assumes a regular menstrual cycle with a consistent 14-day post-ovulatory luteal phase.',
    limitations: 'Not intended as an absolute contraceptive method. Illness, stress, and hormonal variations can shift ovulation timing.',
    faqs: [
      { question: 'How long can sperm survive in the reproductive tract?', answer: 'Healthy sperm can survive up to 5 days in fertile cervical mucus, which is why the fertile window begins before actual ovulation.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب الموعد المتوقع للتبويض وأيام نافذة الخصوبة الستة وتاريخ الدورة الشهرية القادمة بدقة بناءً على طول الدورة المنتظمة.`,
    howToUse: [
      'أدخلي متوسط طول الدورة الشهرية بالأيام (المعدل الطبيعي 21 - 35 يوماً).',
      'حددي تاريخ اليوم الأول من آخر دورة شهرية.',
      'راجعي يوم التبويض المتوقع، ونافذة الخصوبة المؤاتية للحمل، وتاريخ الدورة القادمة.'
    ],
    formula: 'تاريخ التبويض = تاريخ آخر دورة + (طول الدورة - 14 يوماً) | نافذة الخصوبة: 5 أيام قبل التبويض ويوم بعده',
    formulaVariables: [
      { name: 'طول الدورة', description: 'عدد الأيام بين بداية دورتين متتاليتين.', unit: 'يوم', optional: false },
      { name: 'تاريخ آخر دورة', description: 'أول يوم لنزول الدورة الشهرية الأخيرة.', unit: 'تاريخ ميلادي', optional: false }
    ],
    workedExample: {
      scenario: 'دورة منتظمة مدتها 28 يوماً بدأت في 1 سبتمبر 2026.',
      stepByStep: [
        'موعد التبويض: 28 - 14 = 14 يوماً بعد أول يوم.',
        'تاريخ التبويض المقدر: 15 سبتمبر 2026.',
        'نافذة الخصوبة (6 أيام): من 10 سبتمبر إلى 16 سبتمبر 2026.',
        'تاريخ الدورة القادمة المتوقع: 29 سبتمبر 2026.'
      ],
      result: 'يوم التبويض: 15 سبتمبر 2026 | نافذة الخصوبة: 10 - 16 سبتمبر 2026 | الدورة القادمة: 29 سبتمبر 2026'
    },
    interpretation: 'تكون فرصة حدوث الحمل في أعلى مستوياتها خلال الـ 48 ساعة السابقة للتبويض مباشرة بفضل قدرة الحيوانات المنوية على البقاء لعدة أيام.',
    assumptions: 'تفترض انتظام الدورة الشهرية واستقرار المرحلة الأصفرية عند 14 يوماً تقريباً.',
    limitations: 'لا تستخدم كوسيلة مانعة للحمل، حيث يمكن للتوتر والهرمونات تغيير موعد التبويض الفعلي.',
    faqs: [
      { question: 'كم تدوم قدرة الحيوان المنوي على الإخصاب؟', answer: 'تستطيع الحيوانات المنوية العيش داخل الجهاز التناسلي الأنثوي حتى 5 أيام في بيئة الإفرازات الخصبة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} estima el día de ovulación, la ventana fértil de seis días y la fecha de inicio del próximo periodo menstrual con base en la fase lútea clínica.`,
    howToUse: [
      'Introduzca la duración media de su ciclo menstrual en días.',
      'Seleccione la fecha de inicio de su última menstruación.',
      'Consulte la fecha estimada de ovulación, los días fértiles y el próximo ciclo.'
    ],
    formula: 'Ovulación = Última regla + (Ciclo - 14 días) | Ventana fértil: 5 días previos a la ovulación hasta 1 día posterior',
    formulaVariables: [
      { name: 'Duración ciclo', description: 'Días promedio de ciclo.', unit: 'Días', optional: false },
      { name: 'Última regla', description: 'Primer día de sangrado del último periodo.', unit: 'Fecha', optional: false }
    ],
    workedExample: {
      scenario: 'Ciclo regular de 28 días con inicio de última regla el 1 de septiembre de 2026.',
      stepByStep: [
        'Días hasta la ovulación: 28 - 14 = 14 días tras la última regla.',
        'Fecha estimada de ovulación: 15 de septiembre de 2026.',
        'Ventana fértil (6 días): del 10 al 16 de septiembre de 2026.',
        'Próxima menstruación: 29 de septiembre de 2026.'
      ],
      result: 'Ovulación: 15 sept 2026 | Ventana fértil: 10 - 16 sept 2026 | Próximo periodo: 29 sept 2026'
    },
    interpretation: 'La mayor probabilidad de concepción se concentra en los 2 días previos a la ovulación.',
    assumptions: 'Fase lútea constante de 14 días y ciclos regulares.',
    limitations: 'No debe emplearse como método anticonceptivo absoluto.',
    faqs: [
      { question: '¿Por qué la ventana fértil empieza antes de la ovulación?', answer: 'Porque los espermatozoides pueden sobrevivir hasta 5 días en el moco cervical fértil.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} détermine la date théorique de l'ovulation, la période de fertilité maximale de 6 jours et la date présumée des prochaines règles.`,
    howToUse: [
      'Indiquez la durée moyenne de votre cycle en jours (usuellement 28 jours).',
      'Sélectionnez la date du premier jour des dernières règles.',
      'Consultez le jour d\'ovulation estimé, la fenêtre de fertilité et l\'échéance du cycle suivant.'
    ],
    formula: 'Ovulation = Début dernières règles + (Durée du cycle - 14 jours) | Fenêtre fértile : J-5 à J+1',
    formulaVariables: [
      { name: 'Durée du cycle', description: 'Nombre de jours moyen du cycle.', unit: 'Jours', optional: false },
      { name: 'Dernières règles', description: 'Date de début du dernier saignement.', unit: 'Date', optional: false }
    ],
    workedExample: {
      scenario: 'Cycle de 28 jours ayant débuté le 1er septembre 2026.',
      stepByStep: [
        'Intervalle post-règles : 28 - 14 = 14 jours.',
        'Ovulation présumée : 15 septembre 2026.',
        'Période de fécondité optimale : du 10 au 16 septembre 2026.',
        'Date des prochaines règles : 29 septembre 2026.'
      ],
      result: 'Ovulation : 15 sept. 2026 | Fenêtre de fertilité : 10 - 16 sept. 2026 | Règles suivantes : 29 sept. 2026'
    },
    interpretation: 'Les rapports sexuels ayant lieu 24 à 48 heures avant l\'ovulation offrent les probabilités de fécondation les plus élevées.',
    assumptions: 'Fase lutéale physiologique stable d\'environ 14 jours.',
    limitations: 'Ne remplace en aucun cas une méthode de contraception médicale.',
    faqs: [
      { question: 'Combien de temps l\'ovule est-il fécondable ?', answer: 'L\'ovocyte expulsé ne reste fécondable que pendant 12 à 24 heures après la rupture folliculaire.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet den voraussichtlichen Eisprungtag (Ovulation), das 6-tägige fruchtbare Zeitfenster und den Beginn der nächsten Menstruation.`,
    howToUse: [
      'Geben Sie die durchschnittliche Zykluslänge in Tagen ein (z. B. 28 Tage).',
      'Wählen Sie das Startdatum Ihrer letzten Periode.',
      'Lesen Sie den Eisprung, die fruchtbare Phase und das Datum der nächsten Periode ab.'
    ],
    formula: 'Eisprung = Letzte Periode + (Zykluslänge - 14 Tage) | Fruchtbare Tage: 5 Tage vor bis 1 Tag nach dem Eisprung',
    formulaVariables: [
      { name: 'Zykluslänge', description: 'Tage zwischen zwei Perioden.', unit: 'Tage', optional: false },
      { name: 'Letzte Periode', description: 'Erster Tag der letzten Regelblutung.', unit: 'Datum', optional: false }
    ],
    workedExample: {
      scenario: 'Ein 28-Tage-Zyklus mit Beginn der letzten Periode am 1. September 2026.',
      stepByStep: [
        'Tage bis zum Eisprung: 28 - 14 = 14 Tage nach Periodenbeginn.',
        'Geschätzter Eisprung: 15. September 2026.',
        'Fruchtbare Tage (6 Tage): 10. September bis 16. September 2026.',
        'Nächste Periode: 29. September 2026.'
      ],
      result: 'Eisprung: 15. Sep 2026 | Fruchtbares Fenster: 10. - 16. Sep 2026 | Nächste Periode: 29. Sep 2026'
    },
    interpretation: 'Die Chance auf eine Schwangerschaft ist in den 48 Stunden vor dem Eisprung am höchsten.',
    assumptions: 'Konstante Lutealphase von ca. 14 Tagen bei regelmäßigem Zyklus.',
    limitations: 'Nicht als Verhütungsmethode geeignet, da hormonelle Schwankungen den Eisprung verschieben können.',
    faqs: [
      { question: 'Wie lange überleben Samenzellen?', answer: 'Im fruchtbaren Zervixschleim können Spermien bis zu 5 Tage auf die Befruchtung warten.' }
    ],
    relatedTools
  })
});

// 7. ONE REP MAX (one-rep-max)
export const ONE_REP_MAX_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates your estimated One-Repetition Maximum (1RM) using the proven Epley and Brzycki strength equations and generates multi-rep training percentages.`,
    howToUse: [
      'Enter the weight lifted in kilograms or pounds.',
      'Enter the number of completed repetitions performed with good form (1 to 30 reps).',
      'Review your estimated 1RM benchmark and load percentages from 1 rep (100%) down to 12 reps (70%).'
    ],
    formula: 'Epley: 1RM = Weight × (1 + Reps/30) | Brzycki: 1RM = Weight / (1.0278 - 0.0278 × Reps) | Average 1RM = (Epley + Brzycki) / 2',
    formulaVariables: [
      { name: 'Weight Lifted', description: 'Mass moved during the test set.', unit: 'kg or lbs', optional: false },
      { name: 'Reps Completed', description: 'Strict repetitions to technical failure.', unit: 'Repetitions', optional: false }
    ],
    workedExample: {
      scenario: 'Bench pressing 100 kg for 5 completed repetitions.',
      stepByStep: [
        'Epley formula: 100 × (1 + 5/30) = 100 × 1.1667 = 116.67 kg.',
        'Brzycki formula: 100 / (1.0278 - 0.0278 × 5) = 100 / 0.8888 = 112.51 kg.',
        'Average combined 1RM estimate: (116.67 + 112.51) / 2 = 114.59 kg (rounded to 115 kg).',
        'Working loads: 2 Reps (95%): 109 kg; 5 Reps (87%): 100 kg; 10 Reps (75%): 86 kg.'
      ],
      result: 'Estimated 1RM: 115 kg (Average of Epley 117 kg and Brzycki 113 kg)'
    },
    interpretation: 'Allows powerlifters and athletes to calibrate training percentages safely without the injury risk of lifting a true 1RM to failure.',
    assumptions: 'Equations are most accurate for sets between 2 and 10 repetitions performed with strict technical cadence.',
    limitations: 'Accuracy declines significantly beyond 10-12 repetitions due to localized muscular endurance variations.',
    faqs: [
      { question: 'Which formula is more conservative?', answer: 'The Brzycki formula generally produces a slightly more conservative estimate than the Epley equation.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب أقصى وزن لتكرار واحد (1RM) باستخدام معادلتي إيبلي وبرزيكي المعتمدتين رياضياً، وجدولة أوزان التدريب من تكرار إلى 12 تكراراً.`,
    howToUse: [
      'أدخل الوزن المرفوع بالكيلوجرام أو الرطل.',
      'أدخل عدد التكرارات المنفذة بأداء سليم (من 1 إلى 30 تكراراً).',
      'راجع تقدير 1RM ومتوسط أوزان التدريب للنسب المئوية المختلفة (من 100% إلى 70%).'
    ],
    formula: 'إيبلي: الوزن × (1 + التكرار/30) | برزيكي: الوزن / (1.0278 - 0.0278 × التكرار) | المتوسط = (إيبلي + برزيكي) / 2',
    formulaVariables: [
      { name: 'الوزن المرفوع', description: 'الوزن المستخدم في المجموعة.', unit: 'كجم أو رطل', optional: false },
      { name: 'عدد التكرارات', description: 'التكرارات المكتملة حتى الإجهاد التام.', unit: 'تكرار', optional: false }
    ],
    workedExample: {
      scenario: 'رفع وزن 100 كجم في تمرين بنش برس لـ 5 تكرارات متتالية.',
      stepByStep: [
        'معادلة إيبلي: 100 × (1 + 5/30) = 116.67 كجم.',
        'معادلة برزيكي: 100 ÷ (1.0278 - 0.0278 × 5) = 112.51 كجم.',
        'متوسط أقصى وزن لتكرار واحد: (116.67 + 112.51) ÷ 2 = 114.59 كجم (تقريباً 115 كجم).',
        'أوزان التدريب: تكرارين (95%): 109 كجم | 10 تكرارات (75%): 86 كجم.'
      ],
      result: 'أقصى وزن لتكرار واحد (1RM): 115 كجم تقريباً'
    },
    interpretation: 'تمكن الرياضيين من تخطيط أحمال برامج القوة بدقة دون التعرض لخطر الإصابات المرافقة لاختبار الوزن الأقصى الحقيقي.',
    assumptions: 'تكون المعادلات في أعلى درجات دقتها عند اختبار مجموعات تتراوح بين تكرارين إلى 10 تكرارات.',
    limitations: 'تقل دقة المعادلة إذا تجاوزت التكرارات 12 تكراراً بسبب تدخل التحمل العضلي.',
    faqs: [
      { question: 'أي المعادلتين أكثر أماناً وحيطة؟', answer: 'تميل معادلة برزيكي لإعطاء تقديرات أكثر تحفظاً بقليل مقارنة بمعادلة إيبلي.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula la repetición máxima estimada (1RM) mediante las fórmulas de Epley y Brzycki, generando la tabla porcentual de cargas de entrenamiento.`,
    howToUse: [
      'Introduzca el peso levantado en kilogramos o libras.',
      'Introduzca el número de repeticiones completas realizadas con técnica estricta (1 a 30).',
      'Revise su 1RM estimada y las cargas correspondientes para 2, 4, 6, 8, 10 y 12 repeticiones.'
    ],
    formula: 'Epley: Peso × (1 + Reps/30) | Brzycki: Peso / (1,0278 - 0,0278 × Reps) | Promedio 1RM = (Epley + Brzycki) / 2',
    formulaVariables: [
      { name: 'Peso levantado', description: 'Carga levantada en la serie.', unit: 'kg o lbs', optional: false },
      { name: 'Repeticiones', description: 'Número de repeticiones completadas.', unit: 'Repeticiones', optional: false }
    ],
    workedExample: {
      scenario: 'Press de banca con 100 kg para 5 repeticiones completas.',
      stepByStep: [
        'Fórmula de Epley: 100 × (1 + 5/30) = 116,67 kg.',
        'Fórmula de Brzycki: 100 / (1,0278 - 0,0278 × 5) = 112,51 kg.',
        'Promedio estimado: (116,67 + 112,51) / 2 = 114,59 kg (aprox. 115 kg).',
        'Pesos de trabajo: 2 reps (95%): 109 kg; 10 reps (75%): 86 kg.'
      ],
      result: '1RM Estimada: 115 kg (Media Epley 117 kg y Brzycki 113 kg)'
    },
    interpretation: 'Permite periodizar las rutinas de fuerza sin necesidad de exponerse al riesgo de lesión de un levantamiento máximo real.',
    assumptions: 'Máxima precisión en series de 2 a 10 repeticiones.',
    limitations: 'Series por encima de 10-12 repeticiones pierden fiabilidad por fatiga metabólica.',
    faqs: [
      { question: '¿Por qué se promedian ambas fórmulas?', answer: 'Epley y Brzycki tienen pequeñas variaciones matemáticas; su media ofrece un valor de referencia más robusto.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} évalue la charge maximale sur une répétition (1RM) à l'aide des équations validées d'Epley et de Brzycki et décline les pourcentages d'effort.`,
    howToUse: [
      'Indiquez la charge soulevée en kg ou lbs.',
      'Indiquez le nombre de répétitions réussies jusqu\'à l\'échec technique (1 à 30).',
      'Visualisez votre 1RM estimée et la grille de charges de travail de 70% à 100%.'
    ],
    formula: 'Epley : Poids × (1 + Rép/30) | Brzycki : Poids / (1,0278 - 0,0278 × Rép) | Moyenne 1RM = (Epley + Brzycki) / 2',
    formulaVariables: [
      { name: 'Charge soulevée', description: 'Poids total de la barre ou des haltères.', unit: 'kg ou lbs', optional: false },
      { name: 'Répétitions', description: 'Nombre de répétitions effectuées.', unit: 'Répétitions', optional: false }
    ],
    workedExample: {
      scenario: 'Développé couché à 100 kg pour 5 répétitions strictes.',
      stepByStep: [
        'Formule d\'Epley : 100 × (1 + 5/30) = 116,67 kg.',
        'Formule de Brzycki : 100 / (1,0278 - 0,0278 × 5) = 112,51 kg.',
        'Moyenne des deux méthodes : (116,67 + 112,51) / 2 = 114,59 kg (arrondi à 115 kg).',
        'Charges d\'entraînement : 2 rép. (95%) = 109 kg ; 10 rép. (75%) = 86 kg.'
      ],
      result: '1RM théorique : 115 kg (Epley 117 kg, Brzycki 113 kg)'
    },
    interpretation: 'Outil fondamental en musculation et préparation physique pour calibrer les cycles de force en toute sécurité.',
    assumptions: 'Optimal pour les séries comprises entre 2 et 10 répétitions.',
    limitations: 'Au-delà de 10 répétitions, l\'endurance musculaire fausse l\'estimation de la force pure.',
    faqs: [
      { question: 'Est-il dangereux de tester son vrai 1RM ?', answer: 'Oui, soulever son poids maximal sans assistance présente un risque élevé de blessure tendineuse ou articulaire.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet das geschätzte Maximalgewicht für eine Wiederholung (1RM) nach den Formeln von Epley und Brzycki inklusive prozentualer Trainingslasten.`,
    howToUse: [
      'Geben Sie das bewegte Gewicht in kg oder lbs ein.',
      'Geben Sie die Anzahl der sauber ausgeführten Wiederholungen ein (1 bis 30).',
      'Lesen Sie Ihr geschätztes 1RM sowie die Trainingsgewichte für 1 bis 12 Wiederholungen ab.'
    ],
    formula: 'Epley: Gewicht × (1 + Wdh/30) | Brzycki: Gewicht / (1,0278 - 0,0278 × Wdh) | Mittelwert = (Epley + Brzycki) / 2',
    formulaVariables: [
      { name: 'Trainingsgewicht', description: 'Last auf der Hantelstange.', unit: 'kg oder lbs', optional: false },
      { name: 'Wiederholungen', description: 'Sauber bewältigte Wiederholungszahl.', unit: 'Wiederholungen', optional: false }
    ],
    workedExample: {
      scenario: 'Bankdrücken mit 100 kg bei 5 sauberen Wiederholungen.',
      stepByStep: [
        'Epley-Formel: 100 × (1 + 5/30) = 116,67 kg.',
        'Brzycki-Formel: 100 / (1,0278 - 0,0278 × 5) = 112,51 kg.',
        'Mittelwert: (116,67 + 112,51) / 2 = 114,59 kg (gerundet 115 kg).',
        'Lastabstufungen: 2 Wdh (95%): 109 kg; 10 Wdh (75%): 86 kg.'
      ],
      result: 'Geschätztes 1RM: 115 kg (Epley: 117 kg, Brzycki: 113 kg)'
    },
    interpretation: 'Erlaubt Athleten die präzise Steuerung von Krafttrainingszyklen ohne Verletzungsrisiko durch echte Maximalversuche.',
    assumptions: 'Höchste Zuverlässigkeit bei Sätzen im Bereich von 2 bis 10 Wiederholungen.',
    limitations: 'Über 10 Wiederholungen verfälscht die Kraftausdauer das Ergebnis.',
    faqs: [
      { question: 'Welche Formel ist genauer?', answer: 'Beide Formeln sind wissenschaftlich etabliert; ihr Mittelwert gleicht methodische Varianzen optimal aus.' }
    ],
    relatedTools
  })
});

// 8. RUNNING PACE & RACE SPLITS (pace-runner)
export const PACE_RUNNER_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} converts running distance and total elapsed time into exact minute-per-kilometer and minute-per-mile pace, running speed, and race split projections.`,
    howToUse: [
      'Enter total distance in kilometers (km).',
      'Enter total duration in minutes.',
      'Review your pace per kilometer (min:sec/km), pace per mile (min:sec/mi), speed in km/h and mph, and projected finish times for 5K, 10K, Half Marathon, and Marathon.'
    ],
    formula: 'Pace (min/km) = Time_minutes / Distance_km | Pace (min/mi) = Pace_km × 1.60934 | Speed (km/h) = Distance / (Minutes / 60)',
    formulaVariables: [
      { name: 'Distance', description: 'Length of the run.', unit: 'Kilometers (km)', optional: false },
      { name: 'Duration', description: 'Total time elapsed.', unit: 'Minutes', optional: false }
    ],
    workedExample: {
      scenario: 'Running a 10 km training run in 50 minutes.',
      stepByStep: [
        'Pace per km: 50 min / 10 km = 5.00 min/km (5 min 0 sec per km).',
        'Pace per mile: 5.00 × 1.60934 = 8.047 min/mi (8 min 3 sec per mile).',
        'Speed in km/h: 10 km / (50/60 h) = 12.00 km/h (7.46 mph).',
        'Race splits: 5K: 25 min 0 sec; 10K: 50 min 0 sec; Half Marathon (21.0975 km): 1h 45m 29s; Marathon: 3h 30m 59s.'
      ],
      result: 'Pace: 5:00 min/km (8:03 min/mi) | Speed: 12.00 km/h (7.46 mph) | Marathon Finish Projection: 3h 30m 59s'
    },
    interpretation: 'Pacing precision enables runners to target specific marathon or 10K finishing goals while avoiding premature lactic acid accumulation.',
    assumptions: 'Assumes even pacing across flat terrain.',
    limitations: 'Projections assume identical aerobic conditioning across extended distances without accounting for marathon cardiac drift or glycogen depletion.',
    faqs: [
      { question: 'What is negative splitting?', answer: 'Running the second half of a race faster than the first half to conserve glycogen stores and finish strong.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحويل مسافة وزمن الجري إلى وتيرة دقيقة لكل كيلومتر ولكل ميل، وسرعة الجري بالساعة، وتوقعات أزمنة السباقات المعتمدة.`,
    howToUse: [
      'أدخل المسافة الإجمالية المقطوعة بالكيلومتر (كم).',
      'أدخل إجمالي الوقت المستغرق بالدقائق.',
      'راجع الوتيرة لكل كم ولكل ميل، والسرعة (كم/ساعة وميل/ساعة)، وأزمنة الإنهاء المتوقعة لسباقات 5K و 10K ونصف الماراثون والماراثون.'
    ],
    formula: 'الوتيرة (دقيقة/كم) = الوقت بالدقائق / المسافة بالكيلومتر | السرعة = المسافة / (الوقت / 60)',
    formulaVariables: [
      { name: 'المسافة', description: 'طول مسار الجري.', unit: 'كيلومتر (كم)', optional: false },
      { name: 'المدة الزمنية', description: 'إجمالي وقت الجري المستغرق.', unit: 'دقيقة', optional: false }
    ],
    workedExample: {
      scenario: 'قطع مسافة 10 كم في زمن قدره 50 دقيقة.',
      stepByStep: [
        'الوتيرة لكل كم: 50 دقيقة ÷ 10 كم = 5:00 دقائق/كم (5 دقائق بالضبط).',
        'الوتيرة لكل ميل: 5.00 × 1.60934 = 8:03 دقائق/ميل.',
        'السرعة: 10 ÷ (50/60) = 12.00 كم/ساعة (7.46 ميل/ساعة).',
        'توقعات السباقات: 5 كم في 25 دقيقة | نصف الماراثون في 1 ساعة و 45 دقيقة و 29 ثانية | الماراثون في 3 ساعات و 30 دقيقة و 59 ثانية.'
      ],
      result: 'الوتيرة: 5:00 د/كم (8:03 د/ميل) | السرعة: 12.00 كم/ساعة | إنهاء الماراثون المتوقع: 3 ساعات و 30 دقيقة و 59 ثانية'
    },
    interpretation: 'تساعدك الوتيرة المنتظمة في إدارة مجهودك البدني واستهلاك طاقة الجليكوجين العضلي لتفادي الإرهاق المبكر.',
    assumptions: 'تفترض وتيرة جري ثابتة ومساراً مستوياً بدون مرتفعات حادة.',
    limitations: 'لا تأخذ في الاعتبار الإجهاد القلبي والحراري التراكمي في المسافات الطويلة جداً مثل الماراثون الكامل.',
    faqs: [
      { question: 'ما هو التوزيع السلبي للوتيرة (Negative Split)؟', answer: 'استراتيجية سباق تعتمد على إنهاء النصف الثاني من المسافة بسرعة أعلى من النصف الأول لتوفير الطاقة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula el ritmo de carrera exacto por kilómetro y por milla, la velocidad media y las proyecciones de tiempo para distancias populares (5K a Maratón).`,
    howToUse: [
      'Introduzca la distancia total en kilómetros (km).',
      'Introduzca el tiempo invertido en minutos.',
      'Consulte su ritmo en min/km y min/milla, la velocidad en km/h y las marcas estimadas en carrera.'
    ],
    formula: 'Ritmo (min/km) = Minutos / Distancia_km | Ritmo (min/mi) = Ritmo_km × 1,60934 | Velocidad (km/h) = km / (Minutos/60)',
    formulaVariables: [
      { name: 'Distancia', description: 'Longitud recorrida.', unit: 'Kilómetros (km)', optional: false },
      { name: 'Tiempo', description: 'Duración total del recorrido.', unit: 'Minutos', optional: false }
    ],
    workedExample: {
      scenario: 'Carrera de 10 km completada en 50 minutos exactos.',
      stepByStep: [
        'Ritmo por km: 50 / 10 = 5:00 min/km.',
        'Ritmo por milla: 5,00 × 1,60934 = 8:03 min/milla.',
        'Velocidad media: 10 / (50/60) = 12,00 km/h (7,46 mph).',
        'Estimación de carrera: Media Maratón en 1h 45m 29s; Maratón en 3h 30m 59s.'
      ],
      result: 'Ritmo: 5:00 min/km (8:03 min/mi) | Velocidad: 12,00 km/h | Marca proyectada Maratón: 3h 30m 59s'
    },
    interpretation: 'Mide la eficiencia aeróbica y permite planificar la estrategia de carrera evitando ritmos iniciales excesivamente rápidos.',
    assumptions: 'Ritmo constante en terreno llano y condiciones óptimas.',
    limitations: 'En distancias largas no contempla la deriva cardíaca ni el agotamiento de glucógeno muscular.',
    faqs: [
      { question: '¿Qué es el "muro" del maratón?', answer: 'Es el agotamiento casi total de las reservas de glucógeno hepático y muscular, típicamente sobre el kilómetro 30-32.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} convertit la distance et la durée de course en allure précise par kilomètre et par mille, vitesse horaire et projections de temps sur les distances classiques.`,
    howToUse: [
      'Indiquez la distance parcourue en kilomètres (km).',
      'Indiquez la durée de votre sortie en minutes.',
      'Consultez votre allure (min/km et min/mi), votre vitesse (km/h) et vos temps prévisionnels du 5 km au marathon.'
    ],
    formula: 'Allure (min/km) = Durée_min / Distance_km | Vitesse (km/h) = Distance / (Durée/60)',
    formulaVariables: [
      { name: 'Distance', description: 'Distance totale courue.', unit: 'Kilomètres (km)', optional: false },
      { name: 'Durée', description: 'Temps total écoulé.', unit: 'Minutes', optional: false }
    ],
    workedExample: {
      scenario: 'Sortie de 10 km bouclée en 50 minutes.',
      stepByStep: [
        'Allure au kilomètre : 50 / 10 = 5 min 00 s / km.',
        'Allure au mille : 5,00 × 1,60934 = 8 min 03 s / mi.',
        'Vitesse moyenne : 10 / (50/60) = 12,00 km/h.',
        'Projections : 5 km en 25m 00s ; Semi-marathon en 1h 45m 29s ; Marathon en 3h 30m 59s.'
      ],
      result: 'Allure : 5:00 min/km (8:03 min/mi) | Vitesse : 12,00 km/h | Prévision marathon : 3h 30m 59s'
    },
    interpretation: 'Permet de gérer son effort sur la durée et de cibler des chronos précis en compétition.',
    assumptions: 'Allure régulière sur parcours plat sans dénivelé significatif.',
    limitations: 'Une extrapolation linéaire sur marathon ignore la baisse d\'endurance au-delà de 30 km.',
    faqs: [
      { question: 'Comment progresser en course à pied ?', answer: 'Alterner séances d\'endurance fondamentale à allure lente et séances de fractionné à VMA.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet die exakte Laufpace pro Kilometer und Meile, die Durchschnittsgeschwindigkeit sowie Zielzeitprognosen für 5K, 10K, Halbmarathon und Marathon.`,
    howToUse: [
      'Geben Sie die gelaufene Distanz in Kilometern (km) ein.',
      'Geben Sie die benötigte Gesamtlaufzeit in Minuten ein.',
      'Lesen Sie Ihre Pace (min/km und min/mi), Geschwindigkeit in km/h und Rennzeitprognosen ab.'
    ],
    formula: 'Pace (min/km) = Zeit_min / Distanz_km | Pace (min/mi) = Pace_km × 1,60934 | km/h = Distanz / (Minuten/60)',
    formulaVariables: [
      { name: 'Distanz', description: 'Gesamte Laufstrecke.', unit: 'Kilometer (km)', optional: false },
      { name: 'Zeit', description: 'Gesamtdauer des Laufs.', unit: 'Minuten', optional: false }
    ],
    workedExample: {
      scenario: 'Ein 10-km-Trainingslauf in 50 Minuten.',
      stepByStep: [
        'Pace pro Kilometer: 50 / 10 = 5:00 min/km.',
        'Pace pro Meile: 5,00 × 1,60934 = 8:03 min/mi.',
        'Geschwindigkeit: 10 / (50/60) = 12,00 km/h (7,46 mph).',
        'Rennzeitprognosen: 5 km in 25:00 min; Halbmarathon in 1h 45m 29s; Marathon in 3h 30m 59s.'
      ],
      result: 'Pace: 5:00 min/km (8:03 min/mi) | Tempo: 12,00 km/h | Marathon-Zielzeit: 3h 30m 59s'
    },
    interpretation: 'Pace-Rechner verhindern zu schnelles Loslaufen zu Beginn eines Rennens und sichern konstante Energieeinsparung.',
    assumptions: 'Gleichmäßige Renneinteilung auf ebener Strecke.',
    limitations: 'Ermüdungseffekte und Glykogenspeicherentleerung bei Marathondistanzen werden nicht dynamisch simuliert.',
    faqs: [
      { question: 'Was bedeutet "Pace"?', answer: 'Pace beschreibt die benötigte Zeit pro Kilometer oder Meile im Gegensatz zur Geschwindigkeit (km/h).' }
    ],
    relatedTools
  })
});

// 9. BLOOD ALCOHOL CONCENTRATION (blood-alcohol)
export const BLOOD_ALCOHOL_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} estimates Blood Alcohol Concentration (BAC) and time to complete sobriety using the clinically validated Widmark equation based on standard drinks, body mass, gender body water, and hours elapsed.`,
    howToUse: [
      'Select biological sex (Male or Female).',
      'Enter the number of standard alcoholic drinks consumed (1 standard drink = 14 grams pure ethanol).',
      'Enter body weight in kilograms (kg).',
      'Enter hours elapsed since the first drink began.',
      'Review your estimated BAC percentage, legal driving limit indicator (0.08%), and hours remaining to zero BAC.'
    ],
    formula: 'Widmark Formula: BAC = [(Grams Ethanol / (Weight_grams × r)) × 100] - (β × Hours) | Male r = 0.68, Female r = 0.55 | β = 0.015% per hour',
    formulaVariables: [
      { name: 'Standard Drinks', description: 'Units of alcohol (14g ethanol per drink, e.g., 350ml 5% beer, 150ml 12% wine, 45ml 40% spirit).', unit: 'Drinks', optional: false },
      { name: 'Body Weight', description: 'Body mass in kilograms.', unit: 'Kilograms (kg)', optional: false },
      { name: 'Hours Elapsed', description: 'Time since consumption started.', unit: 'Hours', optional: false },
      { name: 'Biological Sex', description: 'Determines total body water distribution factor (r = 0.68 for males, 0.55 for females).', unit: 'Sex', optional: false }
    ],
    workedExample: {
      scenario: 'A 75 kg male who consumed 2 standard drinks over a 2-hour period.',
      stepByStep: [
        'Total ethanol consumed: 2 drinks × 14 grams = 28 grams pure ethanol.',
        'Body water distribution mass: 75,000 g × 0.68 = 51,000 g.',
        'Peak BAC before elimination: (28 / 51,000) × 100 = 0.0549%.',
        'Metabolic liver elimination over 2 hours: 2 × 0.015% = 0.030%.',
        'Estimated Current BAC: 0.0549% - 0.030% = 0.025% BAC.',
        'Hours until 0.00% sober: 0.025 / 0.015 = 1.67 hours.'
      ],
      result: 'Estimated BAC: 0.025% (Below 0.08% limit) | Estimated Time to Sober: ~1.7 hours'
    },
    interpretation: 'Quantifies physiological ethanol absorption and hepatic clearance rates for responsible decision-making.',
    assumptions: 'Assumes average hepatic alcohol dehydrogenase metabolic breakdown rate of 0.015% BAC per hour.',
    limitations: 'Metabolic rates vary by individual genetics, stomach food content, liver enzymes, and medication. NEVER rely on this calculator to legally assess driving ability.',
    faqs: [
      { question: 'Does coffee or a cold shower sober you up faster?', answer: 'No. Only time allows the liver to metabolize ethanol; caffeine merely produces an alert drunk state.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتقدير نسبة الكحول في الدم (BAC) والوقت اللازم للوصول لدرجة الصفر باستخدام معادلة ويدمارك المعتمدة طبياً وفق عدد المشروبات والوزن والوقت المنقضي.`,
    howToUse: [
      'حدد الجنس البيولوجي (ذكر أو أنثى).',
      'أدخل عدد المشروبات القياسية (المشروب القياسي = 14 جرام إيثانول نقي).',
      'أدخل وزن الجسم بالكيلوجرام (كجم).',
      'أدخل عدد الساعات المنقضية منذ بدء الشرب.',
      'راجع نسبة BAC المقدرة، ومؤشر الحد القانوني للقيادة (0.08%)، والوقت المتبقي للأيض التام.'
    ],
    formula: 'معادلة ويدمارك: BAC = [(جرامات الإيثانول / (الوزن بالجرام × معامل الماء)) × 100] - (0.015 × الساعات)',
    formulaVariables: [
      { name: 'عدد المشروبات', description: 'المشروبات القياسية (14 جرام إيثانول نقي لكل مشروب).', unit: 'مشروب', optional: false },
      { name: 'الوزن', description: 'وزن الجسم بالكيلوجرام.', unit: 'كيلوجرام (كجم)', optional: false },
      { name: 'الساعات', description: 'الوقت منذ أول رشفة.', unit: 'ساعة', optional: false },
      { name: 'الجنس', description: 'معامل توزيع سوائل الجسم (0.68 للذكور، 0.55 للإناث).', unit: 'ذكر / أنثى', optional: false }
    ],
    workedExample: {
      scenario: 'شخص ذكر يزن 75 كجم استهلك مشروبين قياسيين وانقضت ساعتان.',
      stepByStep: [
        'إجمالي الإيثانول: 2 × 14 = 28 جراماً.',
        'كتلة سوائل الجسم الموزعة: 75,000 × 0.68 = 51,000 جرام.',
        'ذروة التركيز قبل الأيض: (28 ÷ 51,000) × 100 = 0.0549%.',
        'تكسير الكبد خلال ساعتين: 2 × 0.015% = 0.030%.',
        'النسبة الحالية المقدرة: 0.0549% - 0.030% = 0.025%.',
        'الوقت المتبقي لليقظة التامة (0.00%): 0.025 ÷ 0.015 = 1.67 ساعة.'
      ],
      result: 'نسبة الكحول المقدرة: 0.025% (أقل من الحد القانوني 0.08%) | وقت اليقظة التامة: 1.7 ساعة'
    },
    interpretation: 'تقيس المعادلة معدل التخلص الكبدي الفسيولوجي من الإيثانول لتوعية الأفراد وتجنب مخاطر القيادة.',
    assumptions: 'تعتمد معدل تكسير كبدي وسطي قدره 0.015% لكل ساعة.',
    limitations: 'تختلف الاستجابة حسب الوراثة ووجود الطعام في المعدة وأنزيمات الكبد؛ لا يجوز الاعتماد عليها كبديل لجهاز فحص النفخ القانوني.',
    faqs: [
      { question: 'هل يسرع شرب القهوة عملية زوال تأثير الكحول؟', answer: 'كلا، الوقت وحده يسمح للكبد بأكسدة الإيثانول؛ القهوة تزيد التيقظ فقط دون خفض نسبة الكحول في الدم.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} estima la concentración de alcohol en sangre (BAC / Alcoholemia) y las horas requeridas para la sobriedad total mediante la fórmula clínica de Widmark.`,
    howToUse: [
      'Seleccione su sexo biológico (hombre o mujer).',
      'Introduzca el número de consumiciones estándar (1 consumición = 14 g de etanol puro).',
      'Introduzca su peso corporal en kilogramos (kg).',
      'Introduzca las horas transcurridas desde la primera copa.',
      'Revise el nivel de alcoholemia estimado, el límite legal de 0,08% y el tiempo hasta 0,00%.'
    ],
    formula: 'Fórmula Widmark: BAC = [(Gramos etanol / (Peso_gramos × r)) × 100] - (0,015 × Horas) | r = 0,68 (hombres) / 0,55 (mujeres)',
    formulaVariables: [
      { name: 'Bebidas estándar', description: 'Unidades de 14 g de alcohol puro.', unit: 'Consumiciones', optional: false },
      { name: 'Peso', description: 'Masa corporal en kg.', unit: 'Kilogramos (kg)', optional: false },
      { name: 'Horas', description: 'Tiempo desde el inicio de la ingesta.', unit: 'Horas', optional: false }
    ],
    workedExample: {
      scenario: 'Hombre de 75 kg que consumió 2 bebidas estándar hace 2 horas.',
      stepByStep: [
        'Etanol puro ingerido: 2 × 14 g = 28 g.',
        'Masa de agua corporal: 75.000 g × 0,68 = 51.000 g.',
        'Tasa máxima teórica: (28 / 51.000) × 100 = 0,0549%.',
        'Eliminación hepática en 2 horas: 2 × 0,015% = 0,030%.',
        'Alcoholemia actual: 0,0549% - 0,030% = 0,025% BAC.',
        'Horas hasta 0,00%: 0,025 / 0,015 = 1,67 horas.'
      ],
      result: 'Alcoholemia estimada: 0,025% (Por debajo de 0,08%) | Horas hasta sobriedad: ~1,7 horas'
    },
    interpretation: 'Aproximación científica basada en la farmacocinética de absorción y depuración del alcohol por el hígado.',
    assumptions: 'Tasa media de metabolización hepática de 0,015% por hora.',
    limitations: 'La presencia de alimentos en el estómago y la variabilidad enzimática alteran el valor real. No usar como autorización legal para conducir.',
    faqs: [
      { question: '¿Afecta la comida a la absorción del alcohol?', answer: 'Sí, tener comida en el estómago retrasa el vaciamiento gástrico y reduce el pico máximo de alcohol en sangre.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} estime l'alcoolémie (taux d'alcool dans le sang) et le délai d'élimination complète selon la formule médicale de Widmark.`,
    howToUse: [
      'Sélectionnez le sexe biologique (homme ou femme).',
      'Indiquez le nombre de verres standard consommés (1 verre standard = 14 g d\'éthanol pur).',
      'Indiquez votre poids corporel en kilogrammes (kg).',
      'Indiquez le nombre d\'heures écoulées depuis la première gorgée.',
      'Consultez votre taux d\'alcool estimé, le seuil légal et le temps d\'élimination restant.'
    ],
    formula: 'Formule de Widmark : BAC = [(Grammes d\'éthanol / (Poids_g × r)) × 100] - (0,015 × Heures) | r = 0,68 (H) / 0,55 (F)',
    formulaVariables: [
      { name: 'Verres consommés', description: 'Doses standard de 14 g d\'alcool pur.', unit: 'Verres', optional: false },
      { name: 'Poids corporel', description: 'Masse corporelle en kg.', unit: 'Kilogrammes (kg)', optional: false },
      { name: 'Heures écoulées', description: 'Durée depuis le premier verre.', unit: 'Heures', optional: false }
    ],
    workedExample: {
      scenario: 'Homme de 75 kg ayant bu 2 verres d\'alcool il y a 2 heures.',
      stepByStep: [
        'Éthanol ingéré : 2 × 14 g = 28 grammes d\'alcool pur.',
        'Masse hydrique de diffusion : 75 000 g × 0,68 = 51 000 g.',
        'Taux maximal théorique : (28 / 51 000) × 100 = 0,0549 % (soit 0,55 g/l).',
        'Élimination hépatique sur 2 h : 2 × 0,015 % = 0,030 %.',
        'Alcoolémie actuelle résiduelle : 0,0549 % - 0,030 % = 0,025 % BAC.',
        'Temps avant élimination complète : 0,025 / 0,015 = 1,67 heure.'
      ],
      result: 'Alcoolémie estimée : 0,025 % BAC (~0,25 g/L) | Retour à zéro : ~1,7 heure'
    },
    interpretation: 'Modélise la cinétique d\'élimination de l\'alcool par les enzymes hépatiques pour prévenir les conduites à risque.',
    assumptions: 'Taux moyen d\'élimination par le foie de 0,15 g/l (0,015 %) par heure.',
    limitations: 'Ne remplace en aucun cas un éthylotest réglementaire homologué.',
    faqs: [
      { question: 'Peut-on accélérer l\'élimination de l\'alcool ?', answer: 'Non, aucune méthode (café, douche froide, exercice) ne peut accélérer l\'activité enzymatique du foie.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} schätzt die Blutalkoholkonzentration (Promille / BAC) und die Dauer des Alkoholabbaus mit der klinischen Widmark-Formel.`,
    howToUse: [
      'Wählen Sie das biologische Geschlecht (männlich oder weiblich).',
      'Geben Sie die Anzahl der Standardgetränke ein (1 Getränk = 14 g reiner Ethanol).',
      'Geben Sie Ihr Körpergewicht in Kilogramm (kg) ein.',
      'Geben Sie die vergangenen Stunden seit Beginn des Konsums ein.',
      'Lesen Sie den aktuellen Alkoholspiegel und die verbleibende Abbauzeit bis 0,00 ‰ ab.'
    ],
    formula: 'Widmark-Formel: BAC = [(Gramm Ethanol / (Gewicht_g × r)) × 100] - (0,015 × Stunden) | r = 0,68 (Männer) / 0,55 (Frauen)',
    formulaVariables: [
      { name: 'Standardgetränke', description: 'Portionen à 14 g reinem Alkohol.', unit: 'Getränke', optional: false },
      { name: 'Körpergewicht', description: 'Gewicht in kg.', unit: 'Kilogramm (kg)', optional: false },
      { name: 'Vergangene Zeit', description: 'Stunden seit Trinkbeginn.', unit: 'Stunden', optional: false }
    ],
    workedExample: {
      scenario: 'Ein 75 kg schwerer Mann trank vor 2 Stunden 2 Standard-Alkoholgetränke.',
      stepByStep: [
        'Menge reiner Ethanol: 2 × 14 g = 28 g.',
        'Körperflüssigkeitsfaktor: 75.000 g × 0,68 = 51.000 g.',
        'Maximaler theoretischer Pegel: (28 / 51.000) × 100 = 0,0549 % (ca. 0,55 ‰).',
        'Leberabbau in 2 Stunden: 2 × 0,015 % = 0,030 %.',
        'Aktueller Restalkohol: 0,0549 % - 0,030 % = 0,025 % (ca. 0,25 ‰).',
        'Dauer bis 0,00 ‰: 0,025 / 0,015 = 1,67 Stunden.'
      ],
      result: 'Geschätzter Alkoholspiegel: 0,025 % BAC (ca. 0,25 ‰) | Zeit bis zur Nüchternheit: ~1,7 Stunden'
    },
    interpretation: 'Veranschaulicht den natürlichen Abbauprozess im Körper zur Vermeidung von Gefahren im Straßenverkehr.',
    assumptions: 'Durchschnittliche Leberabbaugeschwindigkeit von ca. 0,1 bis 0,15 Promille pro Stunde.',
    limitations: 'Essen im Magen und individuelle Enzymaktivität variieren stark; ersetzt keinen gerichtsverwertbaren Atemtest.',
    faqs: [
      { question: 'Kann man den Alkoholabbau durch Sport beschleunigen?', answer: 'Nein, über 90 % des Alkohols werden ausschließlich über die Leber abgebaut; dies lässt sich nicht beschleunigen.' }
    ],
    relatedTools
  })
});

// 10. SLEEP CYCLE CALCULATOR (sleep-cycle)
export const SLEEP_CYCLE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} calculates optimal wake-up times based on the human ultradian 90-minute sleep cycle architecture, accounting for a 14-minute average sleep latency window.`,
    howToUse: [
      'Enter your planned bedtime hour (0-23) and minute (0-59).',
      'Review optimal wake-up alarm times across 3 cycles (4.5 hours), 4 cycles (6.0 hours), 5 cycles (7.5 hours, clinically recommended), and 6 cycles (9.0 hours).'
    ],
    formula: 'Wake Time = Bedtime + (N × 90 minutes) + 14 minutes sleep latency | Recommended = 5 complete cycles (7.5 hours of sleep)',
    formulaVariables: [
      { name: 'Bedtime Hour', description: 'Hour when you get into bed.', unit: '0 to 23', optional: false },
      { name: 'Bedtime Minute', description: 'Minute when you get into bed.', unit: '0 to 59', optional: false }
    ],
    workedExample: {
      scenario: 'Going to bed at 23:00 (11:00 PM).',
      stepByStep: [
        'Include average 14 minutes sleep latency to fall asleep.',
        '3 cycles (4.5 hours sleep + 14m latency): Wake at 03:44.',
        '4 cycles (6.0 hours sleep + 14m latency): Wake at 05:14.',
        '5 cycles (7.5 hours sleep + 14m latency, recommended): Wake at 06:44.',
        '6 cycles (9.0 hours sleep + 14m latency): Wake at 08:14.'
      ],
      result: 'Recommended Wake-Up Time: 06:44 (5 complete 90-minute sleep cycles, 7h 30m sleep)'
    },
    interpretation: 'Waking up at the end of a 90-minute REM sleep cycle prevents sleep inertia, leaving you feeling refreshed rather than groggy.',
    assumptions: 'Assumes typical adult ultradian sleep architecture (90-minute NREM-REM cycles) and 14-minute average onset latency.',
    limitations: 'Sleep cycle duration can naturally fluctuate between 80 and 110 minutes depending on individual sleep stages.',
    faqs: [
      { question: 'What causes morning sleep inertia (grogginess)?', answer: 'Being awakened in the middle of deep slow-wave sleep (Stage 3 NREM) rather than during light Stage 1 or REM sleep.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب أوقات الاستيقاظ المثالية وفق دورات النوم الطبيعية البالغة 90 دقيقة لكل دورة، مع احتساب 14 دقيقة للاستغراق في النوم.`,
    howToUse: [
      'أدخل ساعة النوم المخططة (من 0 إلى 23) والدقائق (من 0 إلى 59).',
      'راجع مواعيد ضبط المنبه المثالية بعد 3 دورات (4.5 ساعة)، 4 دورات (6 ساعات)، 5 دورات (7.5 ساعة موصى بها طبياً)، و 6 دورات (9 ساعات).'
    ],
    formula: 'وقت الاستيقاظ = وقت النوم + (عدد الدورات × 90 دقيقة) + 14 دقيقة استغراق | الموصى به: 5 دورات كاملة',
    formulaVariables: [
      { name: 'ساعة النوم', description: 'الساعة عند الذهاب للفراش.', unit: 'ساعة (0-23)', optional: false },
      { name: 'دقيقة النوم', description: 'الدقيقة عند النوم.', unit: 'دقيقة (0-59)', optional: false }
    ],
    workedExample: {
      scenario: 'الذهاب إلى الفراش في تمام الساعة 23:00 (11:00 مساءً).',
      stepByStep: [
        'احتساب 14 دقيقة كمتوسط للنعاس وبدء النوم الفعلي.',
        '3 دورات (4.5 ساعات نوم): الاستيقاظ الساعة 03:44 صباحاً.',
        '4 دورات (6.0 ساعات نوم): الاستيقاظ الساعة 05:14 صباحاً.',
        '5 دورات (7.5 ساعات نوم - موصى بها): الاستيقاظ الساعة 06:44 صباحاً.',
        '6 دورات (9.0 ساعات نوم): الاستيقاظ الساعة 08:14 صباحاً.'
      ],
      result: 'موعد الاستيقاظ الموصى به: 06:44 صباحاً (5 دورات نوم كاملة)'
    },
    interpretation: 'يمنع الاستيقاظ في نهاية دورة النوم الشعور بالخمول والصداع الصباحي الناجم عن قطع مرحلة النوم العميق فجأة.',
    assumptions: 'تعتمد دورة النوم القياسية للبالغين المقدرة بـ 90 دقيقة ومتوسط وقت استغراق 14 دقيقة.',
    limitations: 'قد تتراوح مدة الدورة الفردية بين 80 إلى 110 دقائق لدى بعض الأشخاص.',
    faqs: [
      { question: 'ما هو قصور النوم (خمول الصباح)؟', answer: 'هو الشعور بالترنح والكسل عند استيقاظ الشخص في منتصف مرحلة النوم العميق (الموجات البطيئة) بدلاً من النوم الخفيف.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} calcula las horas de despertar idóneas respetando los ciclos de sueño de 90 minutos y sumando 14 minutos promedio para conciliar el sueño.`,
    howToUse: [
      'Introduzca la hora de acostarse (0 a 23) y los minutos (0 a 59).',
      'Revise las alarmas óptimas tras 3 ciclos (4,5 h), 4 ciclos (6 h), 5 ciclos (7,5 h recomendada) y 6 ciclos (9 h).'
    ],
    formula: 'Hora de despertar = Hora de acostarse + (Ciclos × 90 min) + 14 min latencia | Recomendado: 5 ciclos completos (7,5 horas)',
    formulaVariables: [
      { name: 'Hora acostarse', description: 'Hora en formato 24 horas.', unit: '0 a 23', optional: false },
      { name: 'Minuto acostarse', description: 'Minutos al ir a la cama.', unit: '0 a 59', optional: false }
    ],
    workedExample: {
      scenario: 'Irse a dormir a las 23:00 horas.',
      stepByStep: [
        'Suma de 14 minutos de latencia normal hasta conciliar el sueño.',
        '3 ciclos (4,5 horas): Despertar a las 03:44.',
        '4 ciclos (6,0 horas): Despertar a las 05:14.',
        '5 ciclos (7,5 horas, recomendado): Despertar a las 06:44.',
        '6 ciclos (9,0 horas): Despertar a las 08:14.'
      ],
      result: 'Despertar recomendado: 06:44 (5 ciclos completos de 90 minutos)'
    },
    interpretation: 'Despertarse al final de un ciclo REM previene la inercia del sueño y asegura un despertar despejado y enérgico.',
    assumptions: 'Ciclos ultradianos de 90 minutos y latencia media de 14 minutos.',
    limitations: 'La duración real de los ciclos fluctúa de 80 a 110 minutos según cada fisiología.',
    faqs: [
      { question: '¿Por qué me siento cansado al dormir 8 horas?', answer: 'Dormir 8 horas a menudo interrumpe un ciclo a la mitad (entre los ciclos 5 y 6), causando aturdimiento matinal.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule les heures de réveil optimales en fonction des cycles de sommeil de 90 minutes et d'un temps d'endormissement physiologique moyen de 14 minutes.`,
    howToUse: [
      'Indiquez l\'heure (0-23) et les minutes (0-59) de votre coucher.',
      'Consultez les réveils suggérés après 3 cycles (4,5 h), 4 cycles (6 h), 5 cycles (7,5 h recommandé) et 6 cycles (9 h).'
    ],
    formula: 'Heure de réveil = Heure du coucher + (Cycles × 90 min) + 14 min d\'endormissement | Recommandé : 5 cycles (7,5 heures)',
    formulaVariables: [
      { name: 'Heure coucher', description: 'Heure d\'extinction des feux.', unit: '0 à 23', optional: false },
      { name: 'Minute coucher', description: 'Minute du coucher.', unit: '0 à 59', optional: false }
    ],
    workedExample: {
      scenario: 'Se coucher à 23h00 précises.',
      stepByStep: [
        'Ajout de 14 minutes de latence d\'endormissement.',
        '3 cycles (4,5 h) : Réveil à 03h44.',
        '4 cycles (6,0 h) : Réveil à 05h14.',
        '5 cycles (7,5 h - recommandé) : Réveil à 06h44.',
        '6 cycles (9,0 h) : Réveil à 08h14.'
      ],
      result: 'Réveil recommandé : 06h44 (5 cycles complets de 90 minutes)'
    },
    interpretation: 'Évite de se réveiller en plein sommeil profond, réduisant ainsi l\'inertie du sommeil au réveil.',
    assumptions: 'Architecture du sommeil standard en cycles de 90 minutes.',
    limitations: 'La durée des cycles varie individuellement de 80 à 110 minutes.',
    faqs: [
      { question: 'Qu\'est-ce que l\'inertie du sommeil ?', answer: 'La sensation de brouillard cérébral provoquée par une sonnerie de réveil qui intervient en plein sommeil profond.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} ermittelt optimale Weckzeiten basierend auf dem natürlichen 90-Minuten-Schlafzyklus und einer durchschnittlichen Einschlafzeit von 14 Minuten.`,
    howToUse: [
      'Geben Sie die geplante Schlafenszeit (Stunde 0-23 und Minute 0-59) ein.',
      'Wählen Sie aus den Weckzeiten nach 3 Zyklen (4,5 h), 4 Zyklen (6 h), 5 Zyklen (7,5 h empfohlen) oder 6 Zyklen (9 h).'
    ],
    formula: 'Aufwachzeit = Zubettgehzeit + (Zyklen × 90 min) + 14 min Einschlafdauer | Empfohlen: 5 Zyklen (7,5 Stunden)',
    formulaVariables: [
      { name: 'Stunde', description: 'Stunde beim Zubettgehen.', unit: '0 bis 23', optional: false },
      { name: 'Minute', description: 'Minute beim Zubettgehen.', unit: '0 bis 59', optional: false }
    ],
    workedExample: {
      scenario: 'Zubettgehen um 23:00 Uhr.',
      stepByStep: [
        'Kalkulation mit 14 Minuten durchschnittlicher Einschlaflatenz.',
        '3 Zyklen (4,5 h): Aufwachen um 03:44 Uhr.',
        '4 Zyklen (6,0 h): Aufwachen um 05:14 Uhr.',
        '5 Zyklen (7,5 h - empfohlen): Aufwachen um 06:44 Uhr.',
        '6 Zyklen (9,0 h): Aufwachen um 08:14 Uhr.'
      ],
      result: 'Empfohlene Aufwachzeit: 06:44 Uhr (5 komplette 90-Minuten-Zyklen)'
    },
    interpretation: 'Das Aufwachen am Ende eines Zyklus verhindert Schlaftrunkenheit und sorgt für sofortige Frische am Morgen.',
    assumptions: 'Klassische 90-minütige Schlafarchitektur bei gesunden Erwachsenen.',
    limitations: 'Individuelle Zyklen schwanken physiologisch zwischen 80 und 110 Minuten.',
    faqs: [
      { question: 'Warum fühlt man sich nach 8 Stunden Schlaf oft müde?', answer: '8 Stunden entsprechen 5,3 Zyklen; der Wecker klingelt häufig mitten in einer Tiefschlafphase.' }
    ],
    relatedTools
  })
});

// Map of second 5 Batch 1 health tools
export const BATCH1_HEALTH2_HANDLERS: Record<string, Record<Language, KnowledgeHandler>> = {
  'ovulation-date': OVULATION_DATE_KNOWLEDGE,
  'one-rep-max': ONE_REP_MAX_KNOWLEDGE,
  'pace-runner': PACE_RUNNER_KNOWLEDGE,
  'blood-alcohol': BLOOD_ALCOHOL_KNOWLEDGE,
  'sleep-cycle': SLEEP_CYCLE_KNOWLEDGE,
};
