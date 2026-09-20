import { MortgageEducationalData } from './types';

export const MORTGAGE_EDUCATIONAL_FR: MortgageEducationalData = {
  title: 'Guide et Calcul du Prêt Immobilier',
  subtitle: 'Référence pédagogique détaillée sur les mécanismes du crédit immobilier, les variables de calcul et la décomposition des mensualités.',

  // 1. About Mortgage Calculators
  aboutTitle: 'À propos des calculateurs de prêt immobilier',
  aboutText: 'Un calculateur de prêt immobilier estime le coût mensuel périodique lié à l’emprunt nécessaire à l’acquisition d’un logement. En renseignant les paramètres clés — notamment le prix d’achat, le pourcentage d’apport personnel, le taux d’intérêt, la durée de remboursement, la taxe foncière, l’assurance et les charges de copropriété —, l’outil détermine l’échéance mensuelle globale estimée.',
  aboutQuoteDistinction: 'Il convient de bien distinguer une simulation chiffrée indicative d’une proposition ferme ou d’une offre de prêt émise par un établissement bancaire. Ce calculateur fournit une estimation mathématique fondée sur les valeurs saisies ; il ne constitue en aucun cas une promesse d’octroi de crédit. Les conditions définitives dépendent de votre profil d’emprunteur, de votre taux d’endettement, de votre reste à vivre et des règles d’octroi du prêteur.',

  // 2. How to Use This Mortgage Calculator
  howToUseTitle: 'Comment utiliser ce calculateur de prêt immobilier',
  howToUseIntro: 'Suivez ces étapes simples en utilisant exclusivement les sept champs disponibles sur le simulateur :',
  howToUseSteps: [
    'Saisissez le prix d’acquisition convenu du logement dans le champ "Prix d’achat du bien (€ / $)".',
    'Indiquez la part du prix total financée par vos fonds propres dans le champ "Apport personnel (%)".',
    'Renseignez le taux d’intérêt nominal annuel proposé ou anticipé dans le champ "Taux d’intérêt annuel (%)".',
    'Sélectionnez la durée de remboursement souhaitée dans le champ "Durée du crédit (Années)" (par exemple 30, 20, 15 ou 10 ans).',
    'Indiquez le montant estimé de l’impôt foncier annuel dans "Taxe foncière annuelle (€ / $)" (ou 0 si non applicable).',
    'Saisissez la prime annuelle d’assurance dommages dans "Assurance habitation annuelle (€ / $)" (ou 0 si non incluse).',
    'Renseignez les éventuelles charges courantes d’immeuble dans "Charges de copropriété mensuelles (€ / $)".',
    'Consultez l’échéance mensuelle totale calculée, le capital emprunté, l’apport personnel, la barre de répartition des paiements et le détail mensuel (capital et intérêts, taxes, assurance et charges).',
  ],

  // 3. What Each Input Means
  inputMeaningsTitle: 'Signification de chaque champ de saisie',
  inputMeaningsIntro: 'Comprendre ces composantes permet de mesurer avec clarté l’impact de vos choix financiers et des caractéristiques du bien sur votre budget mensuel :',
  inputs: [
    {
      name: 'Prix d’achat du bien (€ / $)',
      represents: 'Le prix net de vente convenu pour l’achat du bien immobilier avant déduction de votre apport.',
      whyItMatters: 'Il sert de base financière à toute la transaction, déterminant à la fois le besoin d’apport et le capital à emprunter.',
      howItAffects: 'Un prix d’achat plus élevé augmente généralement le capital emprunté nécessaire, ce qui entraîne une mensualité de capital et intérêts plus élevée à moins d’augmenter l’apport personnel.',
    },
    {
      name: 'Apport personnel (%)',
      represents: 'Le pourcentage du prix d’acquisition payé au comptant avec votre épargne lors de la signature de l’acte.',
      whyItMatters: 'L’apport constitue vos premiers fonds propres dans le logement et détermine le montant net du capital financé par la banque.',
      howItAffects: 'Augmenter l’apport personnel réduit le montant du prêt, ce qui diminue généralement l’échéance mensuelle de capital et intérêts et réduit le total des intérêts payés sur la durée du crédit lorsque les autres facteurs restent constants.',
    },
    {
      name: 'Taux d’intérêt annuel (%)',
      represents: 'Le taux nominal annuel appliqué par la banque pour rémunérer les fonds prêtés.',
      whyItMatters: 'Il fixe le coût du crédit appliqué chaque mois sur le capital restant dû.',
      howItAffects: 'Un taux d’intérêt plus élevé augmente généralement l’échéance mensuelle de capital et intérêts pour un montant et une durée donnés, élevant le coût cumulé du crédit au fil du temps.',
    },
    {
      name: 'Durée du crédit (Années)',
      represents: 'La période convenue en années sur laquelle le prêt sera intégralement remboursé.',
      whyItMatters: 'Elle détermine le nombre total d’échéances mensuelles de remboursement (années × 12 mois).',
      howItAffects: 'Une durée plus longue réduit généralement l’échéance mensuelle de capital et intérêts car le remboursement est réparti sur davantage de mois, mais elle implique un plus grand nombre d’échéances et peut augmenter le total des intérêts payés si les conditions restent inchangées. Une durée plus courte requiert des mensualités plus élevées, mais amortit la dette plus rapidement avec un coût total d’intérêts inférieur.',
    },
    {
      name: 'Taxe foncière annuelle (€ / $)',
      represents: 'L’impôt local annuel prélevé par les collectivités locales sur la propriété bâtie.',
      whyItMatters: 'Les taxes foncières varient selon la localisation et le type de bien. Lorsqu’elles sont incluses, le montant annuel est divisé en 12 mensualités égales.',
      howItAffects: 'Le calculateur divise ce montant annuel par 12 pour l’intégrer directement dans l’échéance mensuelle globale estimée lorsqu’il est renseigné.',
    },
    {
      name: 'Assurance habitation annuelle (€ / $)',
      represents: 'La prime annuelle de l’assurance dommages indispensable pour prémunir le logement contre les sinistres et dégradations.',
      whyItMatters: 'Sur de nombreux marchés, les prêteurs ou propriétaires maintiennent une assurance pour protéger le logement en cas de sinistre. Lorsqu’elle est renseignée, la prime annuelle est divisée en 12 mensualités égales.',
      howItAffects: 'Le montant annuel est divisé par 12 et ajouté au budget mensuel global d’occupation du logement.',
    },
    {
      name: 'Charges de copropriété mensuelles (€ / $)',
      represents: 'Les frais mensuels appelés par le syndic pour l’entretien des parties communes et le fonctionnement de l’immeuble.',
      whyItMatters: 'Les charges de copropriété correspondent aux frais réguliers d’entretien des parties communes ou services partagés le cas échéant.',
      howItAffects: 'Ce montant est additionné intégralement à votre dépense mensuelle sans pour autant réduire le capital emprunté.',
    },
  ],

  // 4. How Mortgage Payment Is Calculated
  formulaTitle: 'Comment est calculée la mensualité de prêt immobilier',
  formulaSubtitle: 'Formule standard d’amortissement à mensualités constantes',
  formulaExpression: 'M = P × [r(1 + r)^n] / [(1 + r)^n − 1]',
  formulaDefinitions: [
    { symbol: 'M', meaning: 'Échéance mensuelle (remboursement du capital et paiement des intérêts)' },
    { symbol: 'P', meaning: 'Capital net emprunté (Prix d’acquisition moins Apport personnel)' },
    { symbol: 'r', meaning: 'Taux d’intérêt périodique mensuel en format décimal (Taux nominal annuel ÷ 12)' },
    { symbol: 'n', meaning: 'Nombre total d’échéances mensuelles prévues (Durée en années × 12)' },
  ],
  formulaNotes: [
    'Le taux nominal annuel est divisé par 12 pour définir le taux mensuel (par exemple, 6,8 % annuel donne r = 0,068 ÷ 12 ≈ 0,0056667 par mois).',
    'La durée en années est multipliée par 12 pour déterminer le nombre d’échéances (par exemple, 30 ans correspondent à n = 30 × 12 = 360 mois).',
    'L’apport personnel est déduit du prix du logement pour fixer le capital emprunté net (par exemple, un bien de 400 000 avec 20 % d’apport laisse P = 320 000).',
    'Cette formule s’applique aux crédits immobiliers amortissables standards à taux fixe et échéances périodiques constantes durant toute la période contractuelle.',
  ],

  // 5. Worked Example
  workedExample: {
    title: 'Exemple chiffré hypothétique',
    label: 'Exemple hypothétique (Acquisition d’un logement)',
    homePrice: '400 000 € / $',
    downPayment: '20 % (80 000 € / $)',
    loanAmount: '320 000 € / $',
    interestRate: '6,8 % annuel',
    loanTerm: '30 ans (360 mensualités)',
    annualTax: '4 800 € / $ par an',
    annualInsurance: '1 200 € / $ par an',
    monthlyHoa: '0 € / $ par mois',
    stepByStep: [
      'Calcul du capital emprunté : prix de 400 000 − apport de 80 000 (20 %) = 320 000 de capital financé (P).',
      'Conversion du taux en base décimale mensuelle : r = 0,068 ÷ 12 ≈ 0,0056667.',
      'Calcul du nombre de mensualités : n = 30 ans × 12 = 360 mensualités.',
      'Calcul du coefficient de capitalisation : (1 + 0,0056667)^360 ≈ 7,606782.',
      'Application de la formule d’amortissement (M) : 320 000 × [0,0056667 × 7,606782] ÷ [7,606782 − 1] = 320 000 × 0,043105 ÷ 6,606782 ≈ 2 086,16.',
      'Calcul de la quote-part mensuelle de taxe foncière : 4 800 ÷ 12 = 400,00 par mois.',
      'Calcul de la quote-part mensuelle d’assurance : 1 200 ÷ 12 = 100,00 par mois.',
      'Prise en compte des charges de copropriété : 0,00 par mois.',
      'Somme globale des composantes : 2 086,16 (capital et intérêts) + 400,00 (taxe) + 100,00 (assurance) + 0,00 (charges) = 2 586,16 d’échéance mensuelle globale estimée.',
    ],
    monthlyPi: '2 086,16 € / $',
    monthlyTax: '400,00 € / $',
    monthlyInsurance: '100,00 € / $',
    monthlyHoaResult: '0,00 € / $',
    totalMonthly: '2 586,16 € / $',
  },

  // 6. Principal vs. Interest
  piTitle: 'Capital vs Intérêts : évolution de l’échéance au fil du temps',
  principalDefinition: 'Le capital emprunté représente la somme d’argent effectivement prêtée par la banque que vous remboursez progressivement pour effacer votre dette.',
  interestDefinition: 'Les intérêts constituent la rémunération perçue par l’établissement bancaire pour la mise à disposition des fonds, calculée chaque mois sur le capital restant dû.',
  amortizationDynamic: 'Dans un crédit amortissable standard à mensualités constantes, le montant prévu pour le remboursement du prêt reste identique chaque mois, mais sa répartition interne évolue constamment. Durant les premières années, le capital restant dû étant à son plus haut niveau, la majeure partie de la mensualité sert à payer les intérêts. Au fil des remboursements réguliers, la charge d’intérêts diminue chaque mois, permettant à une part de plus en plus large de l’échéance de rembourser directement le capital.',

  // 7. Understanding Total Payment
  totalPaymentTitle: 'Comprendre l’échéance mensuelle globale',
  totalPaymentIntro: 'Lors de l’élaboration d’un budget d’acquisition, il convient de distinguer la mensualité de remboursement du crédit des coûts mensuels globaux du logement. Ce calculateur prend en compte quatre composantes :',
  totalPaymentComponents: [
    { label: 'Capital et intérêts', description: 'Le versement programmé pour rembourser le capital emprunté et payer les intérêts selon la formule d’amortissement (2 086,16 dans cet exemple).' },
    { label: 'Taxe foncière', description: 'La quote-part mensuelle (un douzième) de la taxe foncière annuelle renseignée (400,00 dans cet exemple).' },
    { label: 'Assurance habitation', description: 'La quote-part mensuelle (un douzième) de la prime d’assurance annuelle renseignée (100,00 dans cet exemple).' },
    { label: 'Charges de copropriété', description: 'Les frais mensuels d’entretien pour les services partagés le cas échéant (0,00 dans cet exemple).' },
  ],
  totalPaymentClarification: 'Dans ce calculateur, l’échéance mensuelle totale est la somme de l’ensemble des composantes d’habitation saisies : Capital et intérêts (2 086,16) + Taxe foncière (400,00) + Assurance (100,00) + Charges (0,00) = 2 586,16 par mois.',

  // 8. How Main Inputs Affect Payment
  inputImpactTitle: 'Influence des variables clés sur la mensualité',
  downPaymentImpact: {
    title: 'Impact de l’apport personnel',
    description: 'Un apport personnel plus important réduit le montant emprunté, ce qui diminue généralement la mensualité de capital et intérêts lorsque les autres paramètres restent constants, et réduit le total des intérêts payés sur la durée du prêt.',
  },
  interestRateImpact: {
    title: 'Impact du taux d’intérêt',
    description: 'Un taux d’intérêt plus élevé augmente généralement l’échéance mensuelle de capital et intérêts pour un montant et une durée donnés, augmentant le coût financier total cumulé au fil du temps.',
  },
  loanTermImpact: {
    title: 'Impact de la durée d’emprunt',
    description: 'Une durée de remboursement plus longue étale le capital sur un plus grand nombre de mois, réduisant généralement la mensualité de capital et intérêts, mais elle implique davantage d’échéances et peut conduire à un total d’intérêts plus élevé si les conditions ne changent pas. Une durée plus courte demande des mensualités plus soutenues mais solde le prêt plus rapidement avec un total d’intérêts réduit.',
  },

  // 9. What This Calculator Includes
  includedTitle: 'Ce que prend en compte ce calculateur',
  includedItems: [
    'L’amortissement régulier du capital emprunté calculé à partir du prix du bien et de l’apport renseigné.',
    'Le calcul des intérêts bancaires mensuels selon la formule standard d’amortissement à taux fixe.',
    'La mensualisation de la taxe foncière annuelle (montant annuel ÷ 12).',
    'La mensualisation de la prime d’assurance habitation (prime annuelle ÷ 12).',
    'L’ajout direct des charges de copropriété ou de syndic mensuelles.',
    'Le calcul de l’échéance mensuelle totale et la décomposition détaillée entre capital et intérêts, impôts, assurance habitation et charges de copropriété.',
  ],

  // 10. What This Calculator Does Not Include
  notIncludedTitle: 'Ce que ne comprend pas ce calculateur',
  notIncludedItems: [
    'Les frais d’acquisition et de clôture du prêt (frais de notaire, droits d’enregistrement, émoluments et commissions d’ouverture de dossier).',
    'L’assurance prêt ou caution spécifique, à moins que l’utilisateur ne l’intègre manuellement dans les frais mensuels.',
    'Les dépenses régulières d’entretien et de réparations imprévues du logement.',
    'Les factures courantes d’énergie et de services (électricité, gaz, eau, assainissement, télécoms et gestion des déchets).',
    'Les évolutions fiscales futures des taux d’imposition locaux ou des primes d’assurance.',
    'Les points de décote payés initialement pour abaisser le taux d’intérêt nominal.',
  ],

  // 11. Assumptions and Limitations
  assumptionsTitle: 'Hypothèses et limites de la simulation',
  assumptionsIntro: 'Les calculs présentés reposent sur des hypothèses théoriques standardisées :',
  assumptionsList: [
    'Taux fixe immuable : Le calcul suppose que le taux d’intérêt demeure rigoureusement identique sur l’ensemble de la durée convenue.',
    'Remboursement régulier dans les délais : Les échéances sont réputées versées selon l’échéancier prévu sans remboursement anticipé ni pénalité de retard.',
    'Répartition mensuelle uniforme : Les impôts annuels et assurances sont divisés uniformément en douze fractions égales.',
    'Dépendance aux saisies de l’utilisateur : La précision du résultat dépend directement de l’exactitude des valeurs renseignées ; le coût réel peut différer en présence de frais ou conditions complémentaires.',
  ],
  disclaimer: 'Cet outil est mis à disposition à des fins strictement indicatives et pédagogiques. Il ne saurait valoir conseil financier personnalisé, accord de principe ou offre contractuelle de prêt émanant d’une banque. Rapprochez-vous d’un conseiller bancaire ou courtier pour obtenir des offres personnalisées et fiches d’information contractuelles.',

  // 12. Frequently Asked Questions
  faqTitle: 'Questions fréquentes sur le crédit immobilier',
  faqs: [
    {
      q: 'Qu’est-ce qu’une mensualité de crédit immobilier ?',
      a: 'Une mensualité est le versement périodique régulier effectué par l’emprunteur pour rembourser son prêt. Elle comprend l’amortissement du capital et le paiement des intérêts débiteurs. Dans la gestion courante d’un logement, elle est souvent complétée par des provisions pour la taxe foncière, l’assurance et les charges de copropriété.',
    },
    {
      q: 'Comment calcule-t-on l’échéance mensuelle d’un prêt ?',
      a: 'La part de capital et d’intérêts se calcule avec la formule classique : M = P × [r(1 + r)^n] ÷ [(1 + r)^n − 1], où P est le capital emprunté, r le taux mensuel et n le nombre de mensualités. On y ajoute le douzième de la taxe foncière et de l’assurance ainsi que les charges d’immeuble.',
    },
    {
      q: 'Comment l’apport personnel modifie-t-il la mensualité ?',
      a: 'L’apport personnel est la somme payée au comptant lors de l’achat. Plus votre apport est important, plus le montant emprunté (P) est faible, ce qui allège instantanément l’échéance mensuelle et réduit considérablement le coût total des intérêts supportés.',
    },
    {
      q: 'Une durée d’emprunt plus longue réduit-elle la mensualité ?',
      a: 'Oui. Allonger la durée (par exemple passer de 15 à 30 ans) permet de répartir le capital sur un nombre plus élevé de mensualités, ce qui rend l’échéance plus légère au quotidien. En contrepartie, les intérêts courant plus longtemps, le coût global du crédit sera nettement plus élevé.',
    },
    {
      q: 'La mensualité comprend-elle la taxe foncière et l’assurance ?',
      a: 'Dans cette calculatrice, la taxe foncière et l’assurance sont incorporées dans l’échéance globale estimée dès lors que vous saisissez leurs montants annuels ; l’outil les divise par 12 et les combine au remboursement bancaire et aux charges.',
    },
    {
      q: 'Quelle est la différence entre capital et intérêts ?',
      a: 'Le capital est la somme d’argent réellement mise à votre disposition dont le remboursement diminue votre dette ; les intérêts représentent le coût financier facturé par la banque. Avec le temps, la part d’intérêts diminue au profit de l’amortissement du capital.',
    },
    {
      q: 'Le résultat du simulateur constitue-t-il une offre ferme ?',
      a: 'Non. Il s’agit d’une projection mathématique basée sur vos indications. Une offre de prêt officielle exige une étude approfondie de vos relevés de compte, de votre taux d’effort, de la valeur du bien et des garanties requises.',
    },
    {
      q: 'Quels sont les frais non pris en compte par le simulateur ?',
      a: 'Le simulateur n’intègre pas les frais de notaire et d’enregistrement, les frais de garantie ou d’hypothèque, les éventuelles primes d’assurance emprunteur non saisies, l’entretien du bien ni les factures énergétiques courantes.',
    },
  ],
};
