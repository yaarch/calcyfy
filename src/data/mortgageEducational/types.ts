export interface MortgageInputExplanation {
  name: string;
  represents: string;
  whyItMatters: string;
  howItAffects: string;
}

export interface MortgageWorkedExample {
  title: string;
  label: string;
  homePrice: string;
  downPayment: string;
  loanAmount: string;
  interestRate: string;
  loanTerm: string;
  annualTax: string;
  annualInsurance: string;
  monthlyHoa: string;
  stepByStep: string[];
  monthlyPi: string;
  monthlyTax: string;
  monthlyInsurance: string;
  monthlyHoaResult: string;
  totalMonthly: string;
  totalPayments?: string;
  totalInterest?: string;
}

export interface MortgageFaq {
  q: string;
  a: string;
}

export interface MortgageEducationalData {
  title: string;
  subtitle: string;
  // 1. About
  aboutTitle: string;
  aboutText: string;
  aboutQuoteDistinction: string;
  // 2. How to Use
  howToUseTitle: string;
  howToUseIntro: string;
  howToUseSteps: string[];
  // 3. What Each Input Means
  inputMeaningsTitle: string;
  inputMeaningsIntro: string;
  inputs: MortgageInputExplanation[];
  // 4. Formula & Calculation
  formulaTitle: string;
  formulaSubtitle: string;
  formulaExpression: string;
  formulaDefinitions: { symbol: string; meaning: string }[];
  formulaNotes: string[];
  // 5. Worked Example
  workedExample: MortgageWorkedExample;
  // 6. Principal vs Interest
  piTitle: string;
  principalDefinition: string;
  interestDefinition: string;
  amortizationDynamic: string;
  // 7. Understanding Total Payment
  totalPaymentTitle: string;
  totalPaymentIntro: string;
  totalPaymentComponents: { label: string; description: string }[];
  totalPaymentClarification: string;
  // 8. How Main Inputs Affect Payment
  inputImpactTitle: string;
  downPaymentImpact: { title: string; description: string };
  interestRateImpact: { title: string; description: string };
  loanTermImpact: { title: string; description: string };
  // 9. What is Included
  includedTitle: string;
  includedItems: string[];
  // 10. What is Not Included
  notIncludedTitle: string;
  notIncludedItems: string[];
  // 11. Assumptions & Limitations
  assumptionsTitle: string;
  assumptionsIntro: string;
  assumptionsList: string[];
  disclaimer: string;
  // 12. FAQ
  faqTitle: string;
  faqs: MortgageFaq[];
}
