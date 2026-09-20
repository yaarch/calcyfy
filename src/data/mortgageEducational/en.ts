import { MortgageEducationalData } from './types';

export const MORTGAGE_EDUCATIONAL_EN: MortgageEducationalData = {
  title: 'About Mortgage Calculations',
  subtitle: 'A comprehensive educational reference on mortgage mechanics, input variables, formulas, and payment breakdowns.',

  // 1. About Mortgage Calculators
  aboutTitle: 'About Mortgage Calculators',
  aboutText: 'A mortgage calculator estimates the recurring monthly cost of borrowing to finance residential property. By entering key variables—including the home purchase price, down payment, interest rate, repayment term, property taxes, insurance, and association fees—the calculator computes an estimated regular payment obligation.',
  aboutQuoteDistinction: 'It is important to understand that a calculator provides a mathematical estimate based on the values you supply. It is not an official loan estimate, binding commitment, or formal quote from a mortgage lender. Actual loan terms depend on your credit profile, debt-to-income ratio, property appraisal, specific loan programs, and lender underwriting criteria.',

  // 2. How to Use This Mortgage Calculator
  howToUseTitle: 'How to Use This Mortgage Calculator',
  howToUseIntro: 'Follow these step-by-step instructions using the seven input fields available in the calculator:',
  howToUseSteps: [
    'Enter the agreed purchase price of the property in the "Home Purchase Price ($)" field.',
    'Specify the portion of the purchase price you plan to pay upfront in cash in the "Down Payment (%)" field.',
    'Enter the annual interest rate quoted by lenders or current market benchmarks in the "Interest Rate (%)" field.',
    'Select the scheduled repayment duration in the "Loan Term (Years)" field (e.g., 30, 20, 15, or 10 years).',
    'Enter the estimated yearly municipal property tax in the "Annual Property Taxes ($)" field, or enter 0 if not including taxes.',
    'Enter the expected yearly hazard insurance premium in the "Annual Home Insurance ($)" field, or enter 0 if not including insurance.',
    'Enter any monthly homeowners association or condominium maintenance dues in the "Monthly HOA Fees ($)" field.',
    'Review the computed total monthly payment, loan principal, down payment amount, visual payment distribution bar, and itemized monthly breakdown (Principal & Interest, Taxes, Insurance, and HOA).',
  ],

  // 3. What Each Input Means
  inputMeaningsTitle: 'What Each Input Means',
  inputMeaningsIntro: 'Understanding each variable helps you interpret how financial decisions and property characteristics influence your monthly obligation:',
  inputs: [
    {
      name: 'Home Purchase Price ($)',
      represents: 'The total agreed purchase price of the residential property before deducting any down payment.',
      whyItMatters: 'It serves as the baseline transaction value from which your loan amount and down payment are derived.',
      howItAffects: 'A higher purchase price generally increases the required loan principal, leading to higher monthly payments unless offset by a larger down payment.',
    },
    {
      name: 'Down Payment (%)',
      represents: 'The percentage of the total home purchase price paid upfront in cash at closing.',
      whyItMatters: 'The down payment directly establishes initial home equity and determines the net loan principal borrowed.',
      howItAffects: 'Increasing your down payment reduces the borrowed loan amount, which generally reduces the monthly principal-and-interest payment and lowers total interest paid over the life of the loan.',
    },
    {
      name: 'Interest Rate (%)',
      represents: 'The annual percentage rate charged by the lender for borrowing the principal balance.',
      whyItMatters: 'It defines the borrowing cost applied to the outstanding principal balance each month.',
      howItAffects: 'A higher interest rate generally increases the monthly principal-and-interest payment for a given loan amount and term, resulting in higher cumulative borrowing costs over time.',
    },
    {
      name: 'Loan Term (Years)',
      represents: 'The agreed duration in years over which the loan must be completely repaid.',
      whyItMatters: 'It dictates the total number of monthly payment installments (years × 12).',
      howItAffects: 'A longer loan term generally results in a lower monthly principal-and-interest payment because repayment is spread over more payments, but it means more total payments and may result in paying more total interest overall if terms remain constant. A shorter term requires higher monthly payments but repays the debt faster with less total interest.',
    },
    {
      name: 'Annual Property Taxes ($)',
      represents: 'The yearly property taxes assessed on the real estate by local authorities.',
      whyItMatters: 'Property taxes vary by jurisdiction and property. When included, the annual amount is divided into 12 equal monthly installments.',
      howItAffects: 'The calculator divides this annual figure by 12 and adds it directly to your estimated total monthly payment.',
    },
    {
      name: 'Annual Home Insurance ($)',
      represents: 'The yearly property insurance premium to protect the home against damage and loss.',
      whyItMatters: 'In many markets, lenders or homeowners maintain property insurance to protect the home. When included, the annual premium is divided into 12 equal monthly installments.',
      howItAffects: 'The calculator divides this annual premium by 12 and adds it to your estimated total monthly payment.',
    },
    {
      name: 'Monthly HOA Fees ($)',
      represents: 'The monthly dues paid to a homeowners association or condominium board for shared building and community maintenance.',
      whyItMatters: 'HOA or condominium dues are recurring fees for shared community services or building maintenance when applicable.',
      howItAffects: 'This amount is added directly to your estimated total monthly housing payment.',
    },
  ],

  // 4. How the Mortgage Payment Is Calculated
  formulaTitle: 'How the Mortgage Payment Is Calculated',
  formulaSubtitle: 'Standard Fixed-Rate Amortization Formula',
  formulaExpression: 'M = P × [r(1 + r)^n] / [(1 + r)^n − 1]',
  formulaDefinitions: [
    { symbol: 'M', meaning: 'Monthly principal and interest payment' },
    { symbol: 'P', meaning: 'Loan principal amount (Home Purchase Price minus Down Payment)' },
    { symbol: 'r', meaning: 'Monthly periodic interest rate (Annual Interest Rate ÷ 12 as a decimal)' },
    { symbol: 'n', meaning: 'Total number of scheduled monthly payments (Loan Term in Years × 12)' },
  ],
  formulaNotes: [
    'The annual interest rate is divided by 12 to produce the monthly periodic rate (e.g., a 6.8% annual rate becomes r = 0.068 ÷ 12 ≈ 0.0056667 per month).',
    'The loan term in years is multiplied by 12 to determine total payments (e.g., a 30-year term equals n = 30 × 12 = 360 monthly payments).',
    'The down payment reduces the purchase price to determine the financed principal (e.g., a $400,000 price with 20% down leaves P = $320,000).',
    'This formula specifically applies to standard fixed-rate amortizing mortgages where each monthly principal-and-interest payment is uniform throughout the loan term.',
  ],

  // 5. Worked Example
  workedExample: {
    title: 'Hypothetical Calculation Example',
    label: 'Hypothetical Example (Single-Family Residential Purchase)',
    homePrice: '$400,000',
    downPayment: '20% ($80,000)',
    loanAmount: '$320,000',
    interestRate: '6.8% per annum',
    loanTerm: '30 years (360 months)',
    annualTax: '$4,800 / year',
    annualInsurance: '$1,200 / year',
    monthlyHoa: '$0 / month',
    stepByStep: [
      'Calculate loan principal: $400,000 purchase price − $80,000 down payment (20%) = $320,000 loan principal (P).',
      'Convert interest rate to monthly decimal: r = 0.068 ÷ 12 ≈ 0.0056667.',
      'Convert loan term to total monthly payments: n = 30 years × 12 = 360 payments.',
      'Compute compounding factor: (1 + 0.0056667)^360 ≈ 7.606782.',
      'Calculate monthly principal & interest (M): $320,000 × [0.0056667 × 7.606782] ÷ [7.606782 − 1] = $320,000 × 0.043105 ÷ 6.606782 ≈ $2,086.16.',
      'Prorate annual property taxes to monthly: $4,800 ÷ 12 = $400.00 per month.',
      'Prorate annual home insurance to monthly: $1,200 ÷ 12 = $100.00 per month.',
      'Add monthly HOA fees: $0.00 per month.',
      'Sum all monthly components: $2,086.16 (P&I) + $400.00 (Taxes) + $100.00 (Insurance) + $0.00 (HOA) = $2,586.16 total monthly payment.',
    ],
    monthlyPi: '$2,086.16',
    monthlyTax: '$400.00',
    monthlyInsurance: '$100.00',
    monthlyHoaResult: '$0.00',
    totalMonthly: '$2,586.16',
  },

  // 6. Principal vs. Interest
  piTitle: 'Principal vs. Interest: How Payment Composition Changes',
  principalDefinition: 'Principal is the actual cash amount borrowed from the lender that must be repaid over time.',
  interestDefinition: 'Interest is the finance charge assessed by the lender for the use of borrowed capital, calculated each month as a percentage of the remaining balance.',
  amortizationDynamic: 'With a standard fixed-rate amortizing mortgage, your total monthly principal-and-interest payment remains constant, but its internal composition changes every month. Early in the loan term, when the unpaid principal balance is largest, the vast majority of each payment goes toward interest charges. As regular payments gradually reduce the outstanding principal, the monthly interest charge decreases, allowing an increasingly larger share of each subsequent payment to pay down principal and build home equity.',

  // 7. Understanding the Total Monthly Payment
  totalPaymentTitle: 'Understanding the Total Monthly Payment',
  totalPaymentIntro: 'When budgeting for a home purchase, prospective buyers often distinguish between the loan repayment and the broader monthly housing payment. This calculator accounts for four primary monthly components:',
  totalPaymentComponents: [
    { label: 'Principal & Interest', description: 'The scheduled monthly repayment of borrowed debt plus the lender interest charge, calculated using the fixed amortization formula ($2,086.16 in this example).' },
    { label: 'Property Taxes', description: 'One-twelfth of the annual property taxes entered ($400.00 in this example).' },
    { label: 'Home Insurance', description: 'One-twelfth of the annual property insurance premium entered ($100.00 in this example).' },
    { label: 'HOA Fees', description: 'Monthly dues paid for shared building or community maintenance ($0.00 in this example).' },
  ],
  totalPaymentClarification: 'In this calculator, the Total Monthly Payment is the sum of all entered monthly housing components: Principal & Interest ($2,086.16) + Property Taxes ($400.00) + Home Insurance ($100.00) + HOA Fees ($0.00) = $2,586.16 per month.',

  // 8. How the Main Inputs Affect the Payment
  inputImpactTitle: 'How the Main Inputs Affect the Payment',
  downPaymentImpact: {
    title: 'Down Payment Impact',
    description: 'A larger down payment reduces the borrowed loan amount, which generally reduces the monthly principal-and-interest payment when other inputs remain unchanged, and lowers the total interest paid over the life of the loan.',
  },
  interestRateImpact: {
    title: 'Interest Rate Impact',
    description: 'A higher interest rate generally increases the monthly principal-and-interest payment for a given loan amount and term, resulting in higher cumulative borrowing costs over time.',
  },
  loanTermImpact: {
    title: 'Loan Term Impact',
    description: 'A longer loan term generally results in a lower monthly principal-and-interest payment because repayment is spread over more payments, but it means more total payments and may result in paying more total interest overall if terms remain constant. A shorter term requires higher monthly payments but repays the debt faster with less total interest.',
  },

  // 9. What This Calculator Includes
  includedTitle: 'What This Calculator Includes',
  includedItems: [
    'Monthly loan principal repayment based on the entered purchase price and down payment percentage.',
    'Monthly loan interest calculation using the fixed-rate amortization formula.',
    'Monthly proration of annual property taxes (annual tax ÷ 12).',
    'Monthly proration of annual property insurance (annual premium ÷ 12).',
    'Direct inclusion of monthly homeowners association (HOA) or condominium dues.',
    'Calculation of the total monthly payment and breakdown into principal & interest, property taxes, home insurance, and HOA dues.',
  ],

  // 10. What This Calculator Does Not Include
  notIncludedTitle: 'What This Calculator Does Not Include',
  notIncludedItems: [
    'One-time closing costs and loan origination fees, appraisal fees, or local property transfer taxes.',
    'Mortgage insurance (such as private mortgage insurance or equivalent local mortgage protection insurance), unless entered by the user into the monthly fee field.',
    'Routine property maintenance, structural repairs, and emergency replacement funds.',
    'Monthly utility costs (electricity, gas, water, and trash collection).',
    'Future adjustments or escalations in property tax rates or insurance premiums.',
    'Upfront discount points purchased to adjust the interest rate.',
  ],

  // 11. Assumptions and Limitations
  assumptionsTitle: 'Assumptions and Limitations',
  assumptionsIntro: 'The outputs provided by this calculator are mathematical simulations subject to specific baseline assumptions:',
  assumptionsList: [
    'Fixed Interest Rate: Assumes the interest rate remains constant throughout the entire loan term.',
    'Scheduled Repayment: Assumes standard monthly payments are made on time according to the regular schedule without prepayments or penalties.',
    'Equal Monthly Proration: Divides annual property taxes and annual insurance into 12 equal monthly amounts.',
    'User-Provided Inputs: Calculations depend directly on the values entered by the user; actual loan costs may vary if additional fees or terms apply.',
  ],
  disclaimer: 'This calculator is provided solely for educational and preliminary budgeting purposes. It does not constitute financial advice, credit pre-approval, or a binding loan commitment from any financial institution. Consult a qualified mortgage professional to obtain personalized quotes and verified disclosures.',

  // 12. Frequently Asked Questions
  faqTitle: 'Frequently Asked Questions',
  faqs: [
    {
      q: 'What is a mortgage payment?',
      a: 'A mortgage payment is the regular periodic payment made by a borrower to a mortgage lender. In its simplest form, it covers principal (repaying the borrowed debt) and interest (the cost of borrowing). In practical homeownership, it often also includes monthly escrow amounts for property taxes, homeowners insurance, and any applicable association fees.',
    },
    {
      q: 'How is a monthly mortgage payment calculated?',
      a: 'The principal-and-interest portion is calculated using the standard fixed amortization formula: M = P × [r(1 + r)^n] ÷ [(1 + r)^n − 1], where P is the loan principal, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of monthly payments (term in years × 12). Taxes and insurance are divided by 12 and added to this amount along with monthly HOA dues.',
    },
    {
      q: 'How does the down payment affect the mortgage payment?',
      a: 'The down payment is the cash paid upfront toward the purchase price. A larger down payment reduces the loan principal amount (P), which directly reduces both your monthly principal-and-interest obligation and the total interest accrued over the life of the loan.',
    },
    {
      q: 'Does a longer mortgage term reduce the monthly payment?',
      a: 'Yes. Extending the loan term (for example, from 15 years to 30 years) spreads principal repayment across twice as many payments, resulting in a lower required monthly payment. However, because interest accrues over a longer period, total lifetime interest paid will be significantly higher.',
    },
    {
      q: 'Does the monthly payment include property taxes and insurance?',
      a: 'In this calculator, property taxes and insurance are included in the estimated total monthly payment whenever you provide annual amounts. The calculator divides each annual figure by 12 and combines them with your principal, interest, and HOA fees.',
    },
    {
      q: 'What is the difference between principal and interest?',
      a: 'Principal is the actual sum of money borrowed from the lender that reduces your outstanding loan balance. Interest is the fee charged by the lender for lending you that capital. Over an amortizing loan term, the share of your monthly payment going toward principal increases while the interest portion decreases.',
    },
    {
      q: 'Is the calculator result an exact mortgage quote?',
      a: 'No. The calculator provides a mathematical estimate based strictly on the parameters you enter. Actual mortgage quotes depend on your credit score, employment history, debt-to-income ratio, property appraisal, lender-specific closing costs, discount points, and specific loan underwriting guidelines.',
    },
    {
      q: 'What costs are not included in the calculator?',
      a: 'The calculator does not include one-time closing costs (origination fees, title fees, appraisal, recording fees), private mortgage insurance (PMI), utility bills, home maintenance, moving expenses, or future increases in property tax rates and insurance premiums.',
    },
  ],
};
