import React, { useState } from 'react';
import { ToolDef } from '../../../../types';
import { BookOpen, Copy, Check, FileText, Search, Type, BarChart2 } from 'lucide-react';

interface TextAnalyticsEngineProps {
  tool: ToolDef;
}

export const TextAnalyticsEngine: React.FC<TextAnalyticsEngineProps> = ({ tool }) => {
  const [copied, setCopied] = useState(false);

  // Common Text Input
  const [sampleText, setSampleText] = useState<string>(
    'Calcyfy provides powerful, domain-specific calculators for finance, health, science, engineering, and web development. Our team designs pristine mathematical interfaces to make quantitative analysis effortless.'
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper counting functions
  const getWordCount = (str: string) => {
    const trimmed = str.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  };

  const getCharCount = (str: string) => str.length;

  // 1. Reading Time Logic
  const calcReadingTime = () => {
    const words = getWordCount(sampleText);
    const silentReadMin = words / 200;
    const slowReadMin = words / 130;
    const speechMin = words / 150;

    const formatTime = (min: number) => {
      const totalSec = Math.round(min * 60);
      const m = Math.floor(totalSec / 60);
      const s = totalSec % 60;
      if (m === 0) return `${s} seconds`;
      return `${m} min ${s} sec`;
    };

    return { words, silentRead: formatTime(silentReadMin), slowRead: formatTime(slowReadMin), speech: formatTime(speechMin) };
  };

  // 2. Keyword Density Logic
  const calcKeywordDensity = () => {
    const words = sampleText
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2);

    const totalWords = words.length;
    const freqMap: Record<string, number> = {};

    words.forEach(w => {
      freqMap[w] = (freqMap[w] || 0) + 1;
    });

    const sorted = Object.entries(freqMap)
      .map(([word, count]) => ({
        word,
        count,
        density: totalWords > 0 ? ((count / totalWords) * 100).toFixed(2) : '0'
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return { totalWords, topKeywords: sorted };
  };

  // 3. Meta Description Length Logic
  const calcMetaDescLength = () => {
    const chars = getCharCount(sampleText);
    // Average pixel width estimation (~8.2px per character in Arial/Roboto)
    const estimatedPx = Math.round(chars * 8.2);
    const maxChars = 160;
    const maxPx = 960;
    const isTruncated = chars > maxChars || estimatedPx > maxPx;

    return { chars, estimatedPx, isTruncated };
  };

  // 4. Case Converter Logic
  const calcCaseConversions = () => {
    const clean = sampleText.trim();
    const words = clean.split(/\s+/);

    const camelCase = words.map((w, i) => {
      const lower = w.toLowerCase().replace(/[^\w]/g, '');
      return i === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
    }).join('');

    const snakeCase = words.map(w => w.toLowerCase().replace(/[^\w]/g, '')).join('_');
    const kebabCase = words.map(w => w.toLowerCase().replace(/[^\w]/g, '')).join('-');
    const pascalCase = words.map(w => {
      const lower = w.toLowerCase().replace(/[^\w]/g, '');
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    }).join('');
    const upperCase = clean.toUpperCase();

    return { camelCase, snakeCase, kebabCase, pascalCase, upperCase };
  };

  // 5. Flesch Kincaid Readability
  const countSyllablesInWord = (word: string) => {
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const m = word.match(/[aeiouy]{1,2}/g);
    return m ? m.length : 1;
  };

  const calcFleschKincaid = () => {
    const text = sampleText.trim();
    if (!text) return { words: 0, sentences: 0, syllables: 0, readingEase: 0, gradeLevel: 0 };

    const sentences = text.split(/[.!?]+/).filter(Boolean).length || 1;
    const words = text.split(/\s+/).filter(Boolean);
    const wordCount = words.length || 1;
    let syllableCount = 0;

    words.forEach(w => {
      syllableCount += countSyllablesInWord(w);
    });

    // Flesch Reading Ease formula = 206.835 - 1.015*(words/sentences) - 84.6*(syllables/words)
    const readingEase = 206.835 - 1.015 * (wordCount / sentences) - 84.6 * (syllableCount / wordCount);

    // Flesch-Kincaid Grade Level = 0.39*(words/sentences) + 11.8*(syllables/words) - 15.59
    const gradeLevel = 0.39 * (wordCount / sentences) + 11.8 * (syllableCount / wordCount) - 15.59;

    return {
      words: wordCount,
      sentences,
      syllables: syllableCount,
      readingEase: Math.max(0, Math.min(100, Math.round(readingEase))),
      gradeLevel: Math.max(0, Math.round(gradeLevel * 10) / 10)
    };
  };

  return (
    <div id={`text-analytics-engine-${tool.id}`} className="max-w-4xl mx-auto space-y-6">
      {/* Header Card */}
      <div id="text-analytics-header" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 px-2.5 py-1 rounded-md">
          Text & Linguistic Analytics Engine
        </span>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{tool.name}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{tool.description}</p>
      </div>

      {/* Main Text Area */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold uppercase text-slate-500">
            <span>Input Article / Snippet Text</span>
            <span className="font-mono text-purple-600 dark:text-purple-400">
              {getWordCount(sampleText)} Words | {getCharCount(sampleText)} Chars
            </span>
          </div>
          <textarea
            rows={5}
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* READING TIME TOOL */}
        {tool.id === 'reading-time' && (() => {
          const { words, silentRead, slowRead, speech } = calcReadingTime();
          return (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="p-4 bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block uppercase">Silent Reading (200 WPM)</span>
                <span className="text-xl font-bold text-purple-900 dark:text-purple-200 mt-1 block">{silentRead}</span>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block uppercase">Speaking / Speech (150 WPM)</span>
                <span className="text-xl font-bold text-purple-900 dark:text-purple-200 mt-1 block">{speech}</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block uppercase">Slow Reading (130 WPM)</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">{slowRead}</span>
              </div>
            </div>
          );
        })()}

        {/* KEYWORD DENSITY TOOL */}
        {tool.id === 'keyword-density-checker' && (() => {
          const { totalWords, topKeywords } = calcKeywordDensity();
          return (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-semibold uppercase text-slate-500">Top Keyword Density Breakdown</h4>
              <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono uppercase border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="p-2.5">Keyword</th>
                      <th className="p-2.5">Count</th>
                      <th className="p-2.5">Density Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                    {topKeywords.map((k) => (
                      <tr key={k.word} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                        <td className="p-2.5 font-bold text-purple-600 dark:text-purple-400">{k.word}</td>
                        <td className="p-2.5">{k.count}</td>
                        <td className="p-2.5 font-bold">{k.density}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })()}

        {/* META DESCRIPTION LENGTH TOOL */}
        {tool.id === 'meta-description-length' && (() => {
          const { chars, estimatedPx, isTruncated } = calcMetaDescLength();
          return (
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-[11px] text-slate-500 uppercase block font-semibold">Character Count</span>
                  <span className={`text-lg font-bold mt-0.5 block ${chars > 160 ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {chars} / 160
                  </span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-[11px] text-slate-500 uppercase block font-semibold">Estimated Pixel Width</span>
                  <span className={`text-lg font-bold mt-0.5 block ${estimatedPx > 960 ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {estimatedPx}px / 960px
                  </span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-[11px] text-slate-500 uppercase block font-semibold">SERP Status</span>
                  <span className={`text-sm font-bold mt-1 block ${isTruncated ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {isTruncated ? '⚠ Truncated (...) ' : '✓ Optimal Length'}
                  </span>
                </div>
              </div>

              {/* Google SERP Preview Box */}
              <div className="p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
                <span className="text-[11px] text-slate-400 font-mono block">calcyfy.pages.dev › tool › meta-description-length</span>
                <span className="text-base text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer block">
                  {tool.name} — Free Online Utility
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-sans">
                  {isTruncated ? sampleText.substring(0, 155) + '...' : sampleText}
                </p>
              </div>
            </div>
          );
        })()}

        {/* CASE CONVERTER TOOL */}
        {tool.id === 'case-converter-camel-snake' && (() => {
          const cases = calcCaseConversions();
          return (
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 font-mono text-xs">
              <h4 className="text-xs font-semibold uppercase text-slate-500">Transformed Text Cases</h4>

              <div className="space-y-1">
                <span className="text-[11px] text-slate-500 uppercase font-semibold">camelCase</span>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg flex justify-between items-center">
                  <span className="text-purple-600 dark:text-purple-400 font-bold truncate">{cases.camelCase}</span>
                  <button onClick={() => copyToClipboard(cases.camelCase)} className="text-[10px] text-slate-500 hover:text-slate-900">Copy</button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-slate-500 uppercase font-semibold">snake_case</span>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg flex justify-between items-center">
                  <span className="text-purple-600 dark:text-purple-400 font-bold truncate">{cases.snakeCase}</span>
                  <button onClick={() => copyToClipboard(cases.snakeCase)} className="text-[10px] text-slate-500 hover:text-slate-900">Copy</button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-slate-500 uppercase font-semibold">kebab-case</span>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg flex justify-between items-center">
                  <span className="text-purple-600 dark:text-purple-400 font-bold truncate">{cases.kebabCase}</span>
                  <button onClick={() => copyToClipboard(cases.kebabCase)} className="text-[10px] text-slate-500 hover:text-slate-900">Copy</button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* FLESCH KINCAID TOOL */}
        {tool.id === 'flesch-kincaid-readability' && (() => {
          const { words, sentences, syllables, readingEase, gradeLevel } = calcFleschKincaid();
          return (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 font-mono text-xs">
              <div className="p-3 bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 rounded-lg text-center">
                <span className="text-[11px] text-slate-500 uppercase block font-semibold">Flesch Reading Ease</span>
                <span className="text-2xl font-bold text-purple-900 dark:text-purple-200 mt-1 block">{readingEase} / 100</span>
              </div>

              <div className="p-3 bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 rounded-lg text-center">
                <span className="text-[11px] text-slate-500 uppercase block font-semibold">Flesch-Kincaid Grade</span>
                <span className="text-2xl font-bold text-purple-900 dark:text-purple-200 mt-1 block">Grade {gradeLevel}</span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                <span className="text-[11px] text-slate-500 uppercase block font-semibold">Total Sentences</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white mt-1 block">{sentences}</span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                <span className="text-[11px] text-slate-500 uppercase block font-semibold">Total Syllables</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white mt-1 block">{syllables}</span>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
