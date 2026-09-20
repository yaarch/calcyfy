import { MortgageEducationalData } from './types';

export const MORTGAGE_EDUCATIONAL_ES: MortgageEducationalData = {
  title: 'Guía y Cálculo del Préstamo Hipotecario',
  subtitle: 'Referencia educativa completa sobre variables hipotecarias, fórmulas de amortización y desglose de cuotas mensuales.',

  // 1. About Mortgage Calculators
  aboutTitle: 'Acerca de las calculadoras de hipotecas',
  aboutText: 'Una calculadora de hipotecas estima el coste mensual periódico derivado de la financiación para la adquisición de una vivienda. Al introducir variables esenciales —como el precio de compraventa, el porcentaje de pago inicial, el tipo de interés, el plazo de amortización, los impuestos sobre bienes inmuebles, el seguro de hogar y los gastos de comunidad—, la herramienta calcula la cuota periódica estimada.',
  aboutQuoteDistinction: 'Es fundamental distinguir entre una estimación matemática calculada y una oferta vinculante o presupuesto formal emitido por una entidad bancaria. Esta calculadora ofrece una simulación numérica basada exclusivamente en los datos que usted introduce; no constituye una oferta contractual ni una garantía de concesión. Las condiciones bancarias definitivas dependen de su historial crediticio, ratio de endeudamiento (DTI), tasación oficial del inmueble y criterios de suscripción del prestamista.',

  // 2. How to Use This Mortgage Calculator
  howToUseTitle: 'Cómo usar esta calculadora de hipotecas',
  howToUseIntro: 'Siga estas instrucciones paso a paso utilizando únicamente los siete campos de entrada disponibles en la calculadora:',
  howToUseSteps: [
    'Introduzca el precio acordado de compraventa en el campo "Precio de compraventa ($)".',
    'Indique el porcentaje del precio total que aportará en efectivo al inicio en el campo "Pago inicial o entrada (%)".',
    'Introduzca el tipo de interés nominal anual fijado o estimado en el campo "Tipo de interés anual (%)".',
    'Seleccione el periodo total de amortización en el campo "Plazo del préstamo (Años)" (por ejemplo, 30, 20, 15 o 10 años).',
    'Indique la estimación del impuesto local sobre bienes inmuebles anual en "Impuesto predial / IBI anual ($)" (o introduzca 0 si no lo incluye).',
    'Indique la prima anual del seguro de hogar en "Seguro de hogar anual ($)" (o introduzca 0 si no lo incluye).',
    'Añada la cuota mensual de mantenimiento o comunidad de propietarios en "Gastos mensuales de comunidad ($)".',
    'Revise la cuota mensual total calculada, el capital del préstamo, la aportación inicial, la barra de distribución de pagos y el desglose mensual detallado (capital e intereses, impuestos, seguro y comunidad).',
  ],

  // 3. What Each Input Means
  inputMeaningsTitle: 'Qué significa cada campo de entrada',
  inputMeaningsIntro: 'Comprender cada parámetro le permite evaluar cómo las decisiones financieras y las características del inmueble influyen en su cuota mensual:',
  inputs: [
    {
      name: 'Precio de compraventa ($)',
      represents: 'El importe total acordado para la adquisición del inmueble residencial antes de deducir el pago inicial.',
      whyItMatters: 'Constituye la base económica de la operación sobre la cual se calculan tanto la entrada necesaria como el capital prestado.',
      howItAffects: 'Un precio de compraventa más alto incrementa generalmente el capital prestado necesario, lo que genera una cuota mensual mayor de capital e intereses salvo que se aporte una entrada superior.',
    },
    {
      name: 'Pago inicial o entrada (%)',
      represents: 'El porcentaje del precio de compra que el comprador paga al contado en el momento del cierre o firma de la escritura.',
      whyItMatters: 'Establece su capital inicial en la vivienda y determina el principal neto financiado.',
      howItAffects: 'Aumentar el pago inicial reduce el importe del préstamo, lo que generalmente disminuye la cuota mensual de capital e intereses y reduce los intereses totales pagados durante el préstamo cuando los demás factores permanecen constantes.',
    },
    {
      name: 'Tipo de interés anual (%)',
      represents: 'El porcentaje anual que cobra la entidad bancaria por prestarle el dinero.',
      whyItMatters: 'Determina el coste financiero aplicado sobre el saldo de capital pendiente en cada mensualidad.',
      howItAffects: 'Un tipo de interés más alto generalmente incrementa la cuota mensual de capital e intereses para un capital y plazo determinados, elevando el coste financiero acumulado con el tiempo.',
    },
    {
      name: 'Plazo del préstamo (Años)',
      represents: 'El tiempo acordado en años para reintegrar la totalidad de la deuda.',
      whyItMatters: 'Fija el número total de pagos mensuales programados (años × 12 mensualidades).',
      howItAffects: 'Un plazo más prolongado genera generalmente una cuota mensual inferior de capital e intereses al distribuir la devolución en más pagos, pero supone un mayor número total de pagos y puede derivar en un mayor pago total de intereses si las condiciones no varían. Un plazo más corto exige cuotas mensuales mayores, pero liquida la deuda con mayor rapidez y menor interés total.',
    },
    {
      name: 'Impuesto predial / IBI anual ($)',
      represents: 'Los tributos sobre la propiedad inmobiliaria devengados anualmente por las autoridades locales.',
      whyItMatters: 'Los impuestos sobre bienes inmuebles varían según la jurisdicción y la propiedad. Al incluirse, la cuantía anual se divide en 12 pagos mensuales iguales.',
      howItAffects: 'La calculadora divide el importe anual entre 12 y lo suma íntegramente a la cuota mensual total estimada cuando se incluye.',
    },
    {
      name: 'Seguro de hogar anual ($)',
      represents: 'La prima anual de la póliza de seguro que protege el inmueble frente a daños y siniestros.',
      whyItMatters: 'En muchos mercados, las entidades o propietarios mantienen un seguro para proteger la vivienda ante siniestros. Al incluirse, la prima anual se divide en 12 pagos mensuales iguales.',
      howItAffects: 'La calculadora divide la prima anual entre 12 y la añade al coste mensual total de la vivienda.',
    },
    {
      name: 'Gastos mensuales de comunidad ($)',
      represents: 'Las cuotas mensuales abonadas a la comunidad de propietarios o consorcio para el mantenimiento de zonas comunes y servicios compartidos.',
      whyItMatters: 'Las cuotas comunitarias son pagos periódicos destinados al mantenimiento de zonas comunes o servicios compartidos cuando procedan.',
      howItAffects: 'Se añade de manera directa a la estimación de gasto mensual total sin amortizar capital del préstamo.',
    },
  ],

  // 4. How the Mortgage Payment Is Calculated
  formulaTitle: 'Cómo se calcula la cuota del préstamo hipotecario',
  formulaSubtitle: 'Fórmula estándar de amortización a tipo fijo',
  formulaExpression: 'M = P × [r(1 + r)^n] / [(1 + r)^n − 1]',
  formulaDefinitions: [
    { symbol: 'M', meaning: 'Cuota mensual de capital e intereses' },
    { symbol: 'P', meaning: 'Capital prestado neto (Precio de compraventa menos Pago inicial)' },
    { symbol: 'r', meaning: 'Tipo de interés periódico mensual en formato decimal (Tipo anual ÷ 12)' },
    { symbol: 'n', meaning: 'Número total de mensualidades de pago (Plazo en años × 12)' },
  ],
  formulaNotes: [
    'El tipo de interés anual se divide entre 12 para obtener la tasa mensual periódica (por ejemplo, un 6,8 % anual equivale a r = 0,068 ÷ 12 ≈ 0,0056667 al mes).',
    'El plazo del préstamo en años se multiplica por 12 para determinar el total de pagos (por ejemplo, 30 años representan n = 30 × 12 = 360 cuotas).',
    'El pago inicial se descuenta del precio de compra para determinar el principal financiado (por ejemplo, 400.000 $ con un 20 % de entrada deja P = 320.000 $).',
    'Esta fórmula se aplica a hipotecas amortizables con interés fijo y cuotas periódicas uniformes de capital e intereses durante toda la vida de la operación.',
  ],

  // 5. Worked Example
  workedExample: {
    title: 'Ejemplo numérico hipotético',
    label: 'Ejemplo hipotético (Adquisición de vivienda)',
    homePrice: '400.000 $',
    downPayment: '20 % (80.000 $)',
    loanAmount: '320.000 $',
    interestRate: '6,8 % anual',
    loanTerm: '30 años (360 mensualidades)',
    annualTax: '4.800 $ / año',
    annualInsurance: '1.200 $ / año',
    monthlyHoa: '0 $ / mes',
    stepByStep: [
      'Calcular el capital del préstamo: precio de 400.000 $ − entrada de 80.000 $ (20 %) = 320.000 $ de principal neto (P).',
      'Convertir el tipo de interés a tasa decimal mensual: r = 0,068 ÷ 12 ≈ 0,0056667.',
      'Calcular el número total de pagos: n = 30 años × 12 = 360 mensualidades.',
      'Calcular el factor de capitalización: (1 + 0,0056667)^360 ≈ 7,606782.',
      'Aplicar la fórmula de la cuota mensual (M): 320.000 $ × [0,0056667 × 7,606782] ÷ [7,606782 − 1] = 320.000 $ × 0,043105 ÷ 6,606782 ≈ 2.086,16 $.',
      'Prorratear los impuestos anuales al mes: 4.800 $ ÷ 12 = 400,00 $ mensuales.',
      'Prorratear el seguro anual al mes: 1.200 $ ÷ 12 = 100,00 $ mensuales.',
      'Añadir los gastos mensuales de comunidad: 0,00 $ mensuales.',
      'Sumar todos los conceptos mensuales: 2.086,16 $ (capital e intereses) + 400,00 $ (impuestos) + 100,00 $ (seguro) + 0,00 $ (comunidad) = 2.586,16 $ de cuota mensual total estimada.',
    ],
    monthlyPi: '2.086,16 $',
    monthlyTax: '400,00 $',
    monthlyInsurance: '100,00 $',
    monthlyHoaResult: '0,00 $',
    totalMonthly: '2.586,16 $',
  },

  // 6. Principal vs. Interest
  piTitle: 'Capital frente a intereses: cómo evoluciona la cuota con el tiempo',
  principalDefinition: 'El capital es el importe monetario efectivamente prestado por el banco que se devuelve progresivamente para saldar la deuda.',
  interestDefinition: 'Los intereses constituyen el coste financiero que cobra la entidad prestamista por facilitarle el capital, calculados mensualmente sobre el saldo pendiente.',
  amortizationDynamic: 'En un préstamo con cuota constante de capital e intereses, la mensualidad pactada para el préstamo se mantiene inalterada, pero su estructura interna cambia mes a mes. En los primeros años, al ser máximo el saldo deudor pendiente, la mayor parte de la cuota se destina a pagar intereses. A medida que las amortizaciones regulares reducen el capital adeudado, el coste mensual de intereses disminuye y una porción cada vez mayor de cada cuota se aplica directamente a cancelar capital.',

  // 7. Understanding Total Monthly Payment
  totalPaymentTitle: 'Cómo interpretar la cuota mensual total',
  totalPaymentIntro: 'Al presupuestar la compra de una vivienda, es conveniente distinguir entre la cuota de devolución del préstamo y el coste mensual integral. Esta calculadora engloba cuatro componentes mensuales:',
  totalPaymentComponents: [
    { label: 'Capital e intereses', description: 'El pago programado para devolver el préstamo más el interés de la entidad, calculado mediante la fórmula de amortización (2.086,16 $ en este ejemplo).' },
    { label: 'Impuestos sobre bienes inmuebles', description: 'La doceava parte de los impuestos anuales sobre la propiedad introducidos (400,00 $ en este ejemplo).' },
    { label: 'Seguro de hogar', description: 'La doceava parte de la prima anual de seguro introducida (100,00 $ en este ejemplo).' },
    { label: 'Gastos de comunidad', description: 'Cuotas mensuales de mantenimiento comunitario cuando procedan (0,00 $ en este ejemplo).' },
  ],
  totalPaymentClarification: 'En esta calculadora, la cuota mensual total es la suma de todos los conceptos habitacionales introducidos: Capital e intereses (2.086,16 $) + Impuestos (400,00 $) + Seguro (100,00 $) + Gastos de comunidad (0,00 $) = 2.586,16 $ al mes.',

  // 8. How Main Inputs Affect Payment
  inputImpactTitle: 'Cómo afectan las variables principales al pago',
  downPaymentImpact: {
    title: 'Efecto del pago inicial',
    description: 'Aportar un mayor pago inicial reduce el importe del préstamo, lo que generalmente disminuye la cuota mensual de capital e intereses cuando los demás datos no varían, y reduce los intereses totales pagados a lo largo del crédito.',
  },
  interestRateImpact: {
    title: 'Efecto del tipo de interés',
    description: 'Un tipo de interés más alto incrementa generalmente la cuota mensual de capital e intereses para un importe y plazo dados, elevando el coste financiero total acumulado a lo largo del tiempo.',
  },
  loanTermImpact: {
    title: 'Efecto del plazo de amortización',
    description: 'Un plazo más amplio distribuye el principal en un mayor número de cuotas mensuales, lo que generalmente produce una mensualidad de capital e intereses más baja, aunque implica más mensualidades y puede conllevar un mayor pago total de intereses si las condiciones no varían. Un plazo más breve exige pagos mensuales mayores, pero cancela la deuda con mayor rapidez con menor interés total.',
  },

  // 9. What This Calculator Includes
  includedTitle: 'Qué incluye esta calculadora',
  includedItems: [
    'Amortización mensual del capital del préstamo según el precio y el porcentaje de entrada indicados.',
    'Cálculo mensual de intereses mediante la fórmula estándar de amortización a tipo fijo.',
    'Prorrateo mensual de los impuestos sobre la propiedad anuales (impuesto anual ÷ 12).',
    'Prorrateo mensual de la prima del seguro de hogar (prima anual ÷ 12).',
    'Adición directa de las cuotas mensuales de comunidad de propietarios o HOA.',
    'Cálculo de la cuota mensual total y desglose detallado en capital e intereses, impuestos, seguro de hogar y gastos de comunidad.',
  ],

  // 10. What This Calculator Does Not Include
  notIncludedTitle: 'Costes que no incluye esta calculadora',
  notIncludedItems: [
    'Gastos de formalización y cierre de hipoteca (comisiones bancarias de apertura, tasación oficial, aranceles notariales, registro y tributos de transmisiones).',
    'Seguro hipotecario privado o primas de aval, salvo que el usuario las introduzca de forma manual en el campo de cuota mensual.',
    'Mantenimiento continuo de la vivienda y fondos de reserva para reparaciones.',
    'Suministros del hogar mensuales (electricidad, gas, agua, saneamiento, conexión a internet y recogida de residuos).',
    'Revisiones tributarias futuras o aumentos venideros en las primas de seguros.',
    'Puntos de descuento hipotecario pagados al inicio para reducir el tipo de interés nominal.',
  ],

  // 11. Assumptions and Limitations
  assumptionsTitle: 'Supuestos y limitaciones del cálculo',
  assumptionsIntro: 'Los resultados facilitados son simulaciones numéricas fundamentadas en supuestos teóricos estándar:',
  assumptionsList: [
    'Tipo de interés constante: Se asume que el tipo de interés se mantiene invariable a lo largo de todo el periodo pactado.',
    'Pagos regulares a tiempo: Se presupone el abono puntual de las mensualidades según el calendario regular sin prepagos ni penalizaciones.',
    'Distribución mensual uniforme: Se dividen los impuestos anuales y el seguro en doce cuotas mensuales homogéneas.',
    'Dependencia de los datos del usuario: La precisión del cálculo depende directamente de los valores introducidos; el coste real del préstamo puede variar si existen comisiones o condiciones adicionales.',
  ],
  disclaimer: 'Esta herramienta se ofrece con fines exclusivamente didácticos y de estimación orientativa. No constituye asesoramiento financiero formal, compromiso de crédito ni oferta contractual de entidad alguna. Consulte a un profesional hipotecario para obtener presupuestos personalizados y documentación contractual oficial.',

  // 12. Frequently Asked Questions
  faqTitle: 'Preguntas frecuentes sobre la hipoteca',
  faqs: [
    {
      q: '¿Qué es la cuota de una hipoteca?',
      a: 'Es el pago regular periódico que realiza el prestatario a la entidad financiera. Comprende el reembolso del capital prestado más los intereses correspondientes al coste de la financiación. En la práctica, suele incluir también partidas mensuales para atender tributos locales, seguro de hogar y cuotas de mantenimiento.',
    },
    {
      q: '¿Cómo se calcula la cuota mensual de la hipoteca?',
      a: 'La parte correspondiente a capital e intereses se calcula con la fórmula de amortización constante: M = P × [r(1 + r)^n] ÷ [(1 + r)^n − 1], donde P es el capital financiado, r el interés mensual y n el número de pagos. A esta suma se añaden los impuestos anuales y el seguro divididos entre 12, más las cuotas de comunidad.',
    },
    {
      q: '¿Cómo influye el pago inicial en la cuota hipotecaria?',
      a: 'El pago inicial o entrada es el dinero aportado de fondos propios. Aportar una mayor entrada reduce el principal prestado (P), lo que disminuye de forma inmediata la cuota mensual a pagar y reduce notablemente los intereses acumulados a lo largo de los años.',
    },
    {
      q: '¿Un plazo de hipoteca más largo reduce la mensualidad?',
      a: 'Sí. Al ampliar el plazo (por ejemplo, de 15 a 30 años), la devolución del capital se distribuye en más mensualidades, reduciendo la cuota obligatoria de cada mes. No obstante, al generarse intereses durante el doble de tiempo, el importe total de intereses abonados al banco será muy superior.',
    },
    {
      q: '¿Incluye la mensualidad los impuestos y el seguro?',
      a: 'En esta calculadora, los impuestos y el seguro se incorporan en la cuota mensual total estimada siempre que introduzca sus importes anuales; la herramienta los prorratea entre 12 y los añade a la amortización de capital, intereses y cuotas comunitarias.',
    },
    {
      q: '¿Cuál es la diferencia entre capital e intereses?',
      a: 'El capital es el importe de deuda efectivamente dispuesto que disminuye con cada devolución; los intereses son la retribución que cobra la entidad bancaria por prestarle ese dinero. Con el paso del tiempo, la porción de cuota destinada a capital crece y la de intereses decrece.',
    },
    {
      q: '¿Es el resultado de la calculadora una oferta hipotecaria exacta?',
      a: 'No. Se trata de una estimación matemática basada en los datos indicados. La oferta vinculante final dependerá del análisis de solvencia bancario, nivel de ingresos, tasación del inmueble, gastos de apertura y pólizas específicas requeridas.',
    },
    {
      q: '¿Qué costes no están incluidos en esta calculadora?',
      a: 'No incluye gastos iniciales de escrituración (notaría, tasación, registro, impuestos de actos jurídicos o transmisiones), seguro de protección de pagos o PMI, facturas de suministros del hogar, gastos de reformas ni subidas futuras de tributos locales.',
    },
  ],
};
