import React from 'react';
import { BookOpen, HelpCircle, Lightbulb, Calculator, CheckCircle2, ArrowRight, AlertTriangle, Layers } from 'lucide-react';
import { Tool, Language } from '../types';
import { getToolContentDetails } from '../utils/toolContentEngine';
import { getToolName, getToolDescription } from '../utils/toolMetadata';
import { AppLink } from './common/AppLink';
import { useApp } from '../context/AppContext';

interface ToolSeoContentProps {
  tool: Tool;
  toolName: string;
  toolDesc: string;
  categoryName: string;
}

export const ToolSeoContent: React.FC<ToolSeoContentProps> = ({
  tool,
  toolName,
  categoryName,
}) => {
  const { lang, getToolUrl, t } = useApp();
  const details = getToolContentDetails(tool, lang);

  return (
    <div className="space-y-8 pt-8 border-t border-slate-200 dark:border-slate-800">
      {/* Comprehensive SEO Editorial & Knowledge Section */}
      <article className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-8 shadow-xs">
        {/* Section Header */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-emerald-600 dark:text-emerald-400">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              About the {toolName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Complete calculation guide, methodology, and formula breakdown
            </p>
          </div>
        </div>

        {/* Introduction & What It Calculates */}
        <div className="prose dark:prose-invert max-w-none text-sm text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
          <p className="text-base text-slate-700 dark:text-slate-200 font-medium">
            {details.intro}
          </p>
          {details.whoUsesIt && (
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/80">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Who Uses This Calculator
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {details.whoUsesIt}
              </p>
            </div>
          )}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/80">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              What This Calculator Calculates
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {details.whatItCalculates}
            </p>
          </div>
        </div>

        {/* How to Use This Calculator */}
        {details.howToUse && details.howToUse.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              How to Use This Calculator
            </h3>
            <ol className="space-y-2.5">
              {details.howToUse.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Formula & Mathematical Methodology */}
        {details.formula && (
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-emerald-500" />
              Formula & Methodology
            </h3>
            <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800/60 font-mono text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
              <code>{details.formula}</code>
            </div>
            {details.formulaVariables && details.formulaVariables.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {details.formulaVariables.map((v, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 text-xs">
                    <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300">{v.symbol}: </span>
                    <span className="text-slate-600 dark:text-slate-400">{v.explanation}</span>
                  </div>
                ))}
              </div>
            )}
            {details.unitsAndConversions && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Units & Standards: </span>
                {details.unitsAndConversions}
              </p>
            )}
          </div>
        )}

        {/* Explanation of Important Inputs */}
        {details.inputs && details.inputs.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-500" />
              Key Inputs Explained
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {details.inputs.map((inp, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                    <span>{inp.name}</span>
                    {inp.unit && (
                      <span className="px-1.5 py-0.5 text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                        {inp.unit}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {inp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Practical Worked Example */}
        {details.workedExample && (
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              Worked Calculation Example
            </h3>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-3">
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                {details.workedExample.scenario}
              </p>
              <ol className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-decimal ps-4">
                {details.workedExample.stepByStep.map((step, sIdx) => (
                  <li key={sIdx}>{step}</li>
                ))}
              </ol>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                Result: {details.workedExample.result}
              </div>
            </div>
          </div>
        )}

        {/* Understanding Results */}
        {details.understandingResults && (
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Understanding Your Results
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60">
              {details.understandingResults}
            </p>
          </div>
        )}

        {/* Technical Limitations & Assumptions */}
        {(details.assumptions || details.limitations) && (
          <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 rounded-xl flex items-start gap-3 text-xs text-amber-900 dark:text-amber-300">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              {details.assumptions && (
                <div>
                  <span className="font-bold">Assumptions: </span>
                  {details.assumptions}
                </div>
              )}
              {details.limitations && (
                <div>
                  <span className="font-bold">Limitations: </span>
                  {details.limitations}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Frequently Asked Questions */}
        {details.faqs && details.faqs.length > 0 && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-500" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h3>
            </div>
            <div className="space-y-3">
              {details.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5"
                >
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {faq.question}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Genuinely Related Tools with Semantic HTML5 Links */}
      {details.relatedTools && details.relatedTools.length > 0 && (
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Related {categoryName} Calculators
            </h3>
            <AppLink
              href={`/${lang}/category/${tool.categoryId}`}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </AppLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {details.relatedTools.map((relTool) => (
              <AppLink
                key={relTool.id}
                href={getToolUrl(relTool.slug)}
                className="group p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {getToolName(relTool, lang, t)}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                    {getToolDescription(relTool, lang, t)}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </AppLink>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
