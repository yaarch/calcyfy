import React from 'react';
import { BookOpen, HelpCircle, Lightbulb, Calculator, CheckCircle2 } from 'lucide-react';
import { Tool } from '../types';

interface ToolSeoContentProps {
  tool: Tool;
  toolName: string;
  toolDesc: string;
  categoryName: string;
}

export const ToolSeoContent: React.FC<ToolSeoContentProps> = ({
  tool,
  toolName,
  toolDesc,
  categoryName,
}) => {
  // Generate tailored content based on category and tool id
  const getCategoryDetails = () => {
    switch (tool.categoryId) {
      case 'finance':
        return {
          intro: `The ${toolName} is an advanced financial calculation utility engineered to provide precise estimates for budgeting, investments, loans, and wealth planning. Whether you are managing personal finances or evaluating business expenses, accurate financial planning helps prevent costly mistakes and optimizes cash flow.`,
          formula: 'Calculations utilize standard compounding interest, amortization schedules, and present/future value formulas used by global financial institutions.',
          faqs: [
            {
              q: `How accurate is the ${toolName}?`,
              a: 'Our engine uses rigorous financial math equations identical to banking standards. Results are calculated instantly in real-time.',
            },
            {
              q: 'Is my financial data secure?',
              a: 'Yes! All calculations run entirely inside your browser (client-side). No financial inputs or personal data are ever transmitted to external servers.',
            },
            {
              q: 'Can I use this for professional financial planning?',
              a: 'Yes, this tool provides precise mathematical estimations suitable for preliminary budgeting, loan comparisons, and investment forecasting.',
            },
          ],
        };
      case 'currency':
        return {
          intro: `The ${toolName} provides up-to-the-minute conversions and valuation tools across global fiat currencies (USD, EUR, GBP, SAR, AED, JPY), major cryptocurrencies (Bitcoin, Ethereum, Solana), and precious bullion metals (Gold, Silver, Platinum).`,
          formula: 'Exchange computations are calculated using international standard mid-market exchange rates and live financial market pricing feeds.',
          faqs: [
            {
              q: `Are the exchange rates in the ${toolName} live?`,
              a: 'Yes! When connected to the internet, rates synchronize with global central bank feeds and live market liquidity providers.',
            },
            {
              q: 'How are crypto and precious metal prices calculated?',
              a: 'Crypto metrics utilize 24h market liquidity and staking APY compounding formulas, while gold and silver valuations use per-gram and per-troy-ounce spot market rates across 24k, 21k, 18k, and 925 sterling grades.',
            },
            {
              q: 'Can I calculate bank markup or credit card FX foreign transaction fees?',
              a: 'Yes, our currency tools include dedicated spread and markup modules so you can see exactly how much extra your bank charges compared to the mid-market rate.',
            },
          ],
        };
      case 'health':
        return {
          intro: `The ${toolName} is designed to help you track vital health metrics, body composition, and nutritional requirements. Maintaining awareness of your physiological benchmarks is an essential pillar of long-term wellness and fitness success.`,
          formula: 'Formulas are grounded in peer-reviewed clinical research, including the Mifflin-St Jeor equation, WHO body mass guidelines, and established metabolic standards.',
          faqs: [
            {
              q: `What does the ${toolName} measure?`,
              a: 'It evaluates specific biometric inputs against clinical health benchmarks to give you immediate actionable health feedback.',
            },
            {
              q: 'Should I consult a physician based on these results?',
              a: 'Calcyfy calculators provide educational estimates. Always consult a certified healthcare professional before making major diet or fitness changes.',
            },
            {
              q: 'Are these formulas tailored for both men and women?',
              a: 'Yes, our health engines factor in biological variables such as age, gender, height, weight, and activity levels where applicable.',
            },
          ],
        };
      case 'math':
        return {
          intro: `The ${toolName} provides instant, error-free mathematical computations for students, engineers, educators, and everyday problem-solvers. Complex mathematical operations are simplified into clean, responsive inputs with transparent formulas.`,
          formula: 'Grounded in fundamental arithmetic, algebraic identities, and statistical principles.',
          faqs: [
            {
              q: `How do I use the ${toolName}?`,
              a: 'Simply enter your numbers into the designated fields. Results update instantly as you type with zero page reloads.',
            },
            {
              q: 'Are intermediate calculation steps shown?',
              a: 'Yes, each calculation breakdown includes the formula and step-by-step logic for educational and verification purposes.',
            },
          ],
        };
      case 'date':
        return {
          intro: `The ${toolName} simplifies complex calendar math, time zone conversions, and chronological intervals. Perfect for project planning, event countdowns, and historical age tracking.`,
          formula: 'Calculations account for Gregorian calendar leap years, exact month lengths, and standard UTC/GMT offset intervals.',
          faqs: [
            {
              q: 'Does this account for leap years?',
              a: 'Yes, our date engines fully account for Gregorian leap year rules (divisible by 4, not 100 unless also divisible by 400).',
            },
            {
              q: 'Can I calculate business workdays?',
              a: 'Yes, dedicated work day calculators automatically exclude weekends (Saturdays and Sundays) for accurate scheduling.',
            },
          ],
        };
      case 'converters':
        return {
          intro: `The ${toolName} provides lightning-fast and precise unit conversions across metric, imperial, and international standard dimensions. Eliminate conversion errors with instant multi-unit outputs.`,
          formula: 'Conversions use NIST-traceable conversion factors and precise dimensional multiplier ratios.',
          faqs: [
            {
              q: `How do I convert between units using the ${toolName}?`,
              a: 'Select your source unit and target unit, enter your value, and view converted results across all related units instantly.',
            },
            {
              q: 'Are conversion ratios exact?',
              a: 'Yes, we use standard international conversion constants to ensure maximum scientific and engineering precision.',
            },
          ],
        };
      default:
        return {
          intro: `The ${toolName} is a 100% free, fast, and user-friendly online utility part of Calcyfy's ${categoryName} suite. Designed for instant answers and maximum productivity without sign-up friction.`,
          formula: 'Engineered using verified algorithmic models and standardized calculation methodologies.',
          faqs: [
            {
              q: `Is the ${toolName} completely free?`,
              a: 'Yes, all Calcyfy tools are 100% free with no subscriptions, paywalls, or registrations required.',
            },
            {
              q: 'Can I share or embed this tool?',
              a: 'Yes! Click the Share button to copy a shareable link with your custom inputs, or use the Embed Widget feature to add this calculator to your own website or blog.',
            },
          ],
        };
    }
  };

  const details = getCategoryDetails();

  return (
    <div className="space-y-8 pt-8 border-t border-slate-200 dark:border-slate-800">
      {/* Comprehensive SEO Editorial Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-emerald-600 dark:text-emerald-400">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              About the {toolName}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Comprehensive guide, methodology, and formula breakdown
            </p>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none text-sm text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
          <p>{details.intro}</p>
          
          <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-emerald-500" />
            Calculation Formula & Methodology
          </h3>
          <p>{details.formula}</p>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Key Benefits of Using Calcyfy {toolName}
            </h4>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc ps-4">
              <li>Instant real-time calculations as you type with zero lag.</li>
              <li>100% private and secure client-side execution in your browser.</li>
              <li>Mobile-friendly responsive design optimized for phones, tablets, and desktops.</li>
              <li>Free shareable link generator and website embed widget support.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-emerald-600 dark:text-emerald-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Common questions regarding accuracy, usage, and formulas
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {details.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-1.5"
            >
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-xs">Q{idx + 1}.</span>
                {faq.q}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 ps-5 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
