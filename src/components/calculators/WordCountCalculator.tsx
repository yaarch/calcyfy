import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tool } from '../../types';
import { Copy, Check, FileText, Trash2 } from 'lucide-react';

interface WordCountCalculatorProps {
  tool?: Tool;
}

export const WordCountCalculator: React.FC<WordCountCalculatorProps> = () => {
  const { t } = useApp();
  const [text, setText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Analysis logic
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\s+/g, '').length;
  const sentences = trimmed ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
  const paragraphs = trimmed ? text.split(/\n+/).filter(p => p.trim().length > 0).length : 0;

  // Average reading speed: 200 words per minute
  const readingTimeMinutes = Math.ceil(words / 200);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t('word_input_label', 'Paste or Type Text Below')}
            </label>
            {text && (
              <button
                onClick={() => setText('')}
                className="text-xs text-rose-500 hover:text-rose-600 inline-flex items-center gap-1 font-semibold"
              >
                <Trash2 className="w-3.5 h-3.5" />
                {t('word_clear', 'Clear Text')}
              </button>
            )}
          </div>
          <textarea
            id="word-counter-input"
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm leading-relaxed focus:ring-2 focus:ring-emerald-500"
            placeholder="Type or paste your document, blog post, or essay here..."
          />
        </div>

        {/* Live Metrics Grid */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase">
                {t('word_words', 'Words')}
              </span>
              <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                {words.toLocaleString()}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                {t('word_chars', 'Characters')}
              </span>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                {charsWithSpaces.toLocaleString()}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                {t('word_no_spaces', 'No Spaces')}
              </span>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                {charsNoSpaces.toLocaleString()}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                {t('word_sentences', 'Sentences')}
              </span>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                {sentences.toLocaleString()}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                {t('word_paragraphs', 'Paragraphs')}
              </span>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                {paragraphs.toLocaleString()}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                {t('word_read_time', 'Read Time')}
              </span>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                ~{readingTimeMinutes} min
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-200 dark:border-slate-700">
            <button
              id="word-copy-btn"
              onClick={handleCopy}
              disabled={!text}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all disabled:opacity-50"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy Text')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
