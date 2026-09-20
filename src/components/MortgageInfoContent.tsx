import React from 'react';
import {
  Calculator,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  Scale,
  ShieldAlert,
  DollarSign,
  Clock,
  TrendingUp,
  Percent,
  Home,
  FileText,
  Layers,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MORTGAGE_EDUCATIONAL_CONTENT } from '../data/mortgageEducational';

interface MortgageInfoContentProps {
  toolName?: string;
}

export const MortgageInfoContent: React.FC<MortgageInfoContentProps> = ({ toolName }) => {
  const { lang, isRTL } = useApp();
  const content = MORTGAGE_EDUCATIONAL_CONTENT[lang] || MORTGAGE_EDUCATIONAL_CONTENT.en;

  return (
    <article
      className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-10 shadow-xs ${
        isRTL ? 'rtl' : 'ltr'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Header Banner */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-emerald-600 dark:text-emerald-400">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {content.title} {toolName ? `— ${toolName}` : ''}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {content.subtitle}
          </p>
        </div>
      </div>

      {/* 1. About Mortgage Calculators */}
      <section className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Home className="w-5 h-5 text-emerald-500" />
          {content.aboutTitle}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {content.aboutText}
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-3">
          <Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-semibold text-slate-900 dark:text-white">
              {content.aboutQuoteDistinction.split('.')[0]}.
            </strong>{' '}
            {content.aboutQuoteDistinction.split('.').slice(1).join('.')}
          </p>
        </div>
      </section>

      {/* 2. How to Use This Mortgage Calculator */}
      <section className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-500" />
          {content.howToUseTitle}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          {content.howToUseIntro}
        </p>
        <ol className="space-y-2.5">
          {content.howToUseSteps.map((step, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center">
                {idx + 1}
              </span>
              <span className="pt-0.5 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* 3. What Each Input Means */}
      <section className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-500" />
          {content.inputMeaningsTitle}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          {content.inputMeaningsIntro}
        </p>
        <div className="grid grid-cols-1 gap-3.5">
          {content.inputs.map((inp, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {inp.name}
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-0.5">
                    What it represents:
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {inp.represents}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Why it matters:
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {inp.whyItMatters}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-0.5">
                    How it affects payment:
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {inp.howItAffects}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. How the Mortgage Payment Is Calculated */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            {content.formulaTitle}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {content.formulaSubtitle}
          </p>
        </div>

        {/* Formula Display Box */}
        <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800/60 font-mono text-sm sm:text-base text-emerald-900 dark:text-emerald-200 text-center select-all">
          <code>{content.formulaExpression}</code>
        </div>

        {/* Variable Definitions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {content.formulaDefinitions.map((def, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 text-xs flex items-start gap-2.5"
            >
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0 w-5">
                {def.symbol}:
              </span>
              <span className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {def.meaning}
              </span>
            </div>
          ))}
        </div>

        {/* Conversion & Application Notes */}
        <div className="space-y-1.5 pt-1">
          {content.formulaNotes.map((note, idx) => (
            <p
              key={idx}
              className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed ps-3 border-s-2 border-emerald-400 dark:border-emerald-600"
            >
              {note}
            </p>
          ))}
        </div>
      </section>

      {/* 5. Worked Example */}
      <section className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-500" />
            {content.workedExample.title}
          </h3>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {content.workedExample.label}
          </span>
        </div>

        {/* Input Parameters Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Home Price</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
              {content.workedExample.homePrice}
            </span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Down Payment</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
              {content.workedExample.downPayment}
            </span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Interest Rate</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
              {content.workedExample.interestRate}
            </span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Loan Term</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
              {content.workedExample.loanTerm}
            </span>
          </div>
        </div>

        {/* Step-by-Step Calculation */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Step-by-Step Mathematical Walkthrough
          </h4>
          <ol className="space-y-2">
            {content.workedExample.stepByStep.map((step, idx) => (
              <li
                key={idx}
                className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2.5"
              >
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                  {idx + 1}.
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Result Breakdown Card */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
            <span className="text-xs text-emerald-700 dark:text-emerald-300 block">Monthly P&I</span>
            <span className="text-base font-black text-emerald-900 dark:text-emerald-100 font-mono">
              {content.workedExample.monthlyPi}
            </span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Monthly Taxes</span>
            <span className="text-base font-bold text-slate-900 dark:text-white font-mono">
              {content.workedExample.monthlyTax}
            </span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Monthly Insurance</span>
            <span className="text-base font-bold text-slate-900 dark:text-white font-mono">
              {content.workedExample.monthlyInsurance}
            </span>
          </div>
          <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-xs">
            <span className="text-xs text-emerald-100 block">Total Monthly Payment</span>
            <span className="text-base font-black font-mono">
              {content.workedExample.totalMonthly}
            </span>
          </div>
        </div>

        {/* Lifetime Totals */}
        <div className="flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-800/30 rounded-lg border border-slate-200 dark:border-slate-800">
          <div>
            <span className="font-semibold text-slate-800 dark:text-slate-200">Total Payments: </span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">
              {content.workedExample.totalPayments}
            </span>
          </div>
          <div>
            <span className="font-semibold text-slate-800 dark:text-slate-200">Total Interest Paid: </span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">
              {content.workedExample.totalInterest}
            </span>
          </div>
        </div>
      </section>

      {/* 6. Principal vs. Interest */}
      <section className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-500" />
          {content.piTitle}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-500" />
              Principal (Loan Balance)
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {content.principalDefinition}
            </p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <Percent className="w-4 h-4 text-emerald-500" />
              Interest (Cost of Borrowing)
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {content.interestDefinition}
            </p>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
          {content.amortizationDynamic}
        </p>
      </section>

      {/* 7. Understanding Total Monthly Payment */}
      <section className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          {content.totalPaymentTitle}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          {content.totalPaymentIntro}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {content.totalPaymentComponents.map((comp, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1"
            >
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                {comp.label}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {comp.description}
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic ps-3 border-s-2 border-emerald-500">
          {content.totalPaymentClarification}
        </p>
      </section>

      {/* 8. How Main Inputs Affect Payment */}
      <section className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-500" />
          {content.inputImpactTitle}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-500" />
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                {content.downPaymentImpact.title}
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {content.downPaymentImpact.description}
            </p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-emerald-500" />
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                {content.interestRateImpact.title}
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {content.interestRateImpact.description}
            </p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-500" />
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                {content.loanTermImpact.title}
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {content.loanTermImpact.description}
            </p>
          </div>
        </div>
      </section>

      {/* 9 & 10. Included vs. Not Included */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 9. What This Calculator Includes */}
        <section className="p-5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-emerald-950 dark:text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            {content.includedTitle}
          </h3>
          <ul className="space-y-2 text-xs text-emerald-900 dark:text-emerald-200/90 leading-relaxed">
            {content.includedItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 shrink-0 font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 10. What This Calculator Does Not Include */}
        <section className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
            {content.notIncludedTitle}
          </h3>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {content.notIncludedItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-500 shrink-0 font-bold">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* 11. Assumptions & Limitations */}
      <section className="p-5 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 rounded-2xl space-y-3 text-xs sm:text-sm text-amber-900 dark:text-amber-300">
        <div className="flex items-center gap-2 font-bold text-amber-950 dark:text-amber-200">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>{content.assumptionsTitle}</span>
        </div>
        <p className="text-xs text-amber-800 dark:text-amber-300/90 leading-relaxed">
          {content.assumptionsIntro}
        </p>
        <ul className="text-xs text-amber-800 dark:text-amber-300/90 space-y-1.5 list-disc ps-5 leading-relaxed">
          {content.assumptionsList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <p className="text-xs text-amber-900/80 dark:text-amber-300/80 leading-relaxed pt-1 border-t border-amber-200/80 dark:border-amber-800/60 italic">
          {content.disclaimer}
        </p>
      </section>

      {/* 12. Frequently Asked Questions */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {content.faqTitle}
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {content.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5"
            >
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {faq.q}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};
