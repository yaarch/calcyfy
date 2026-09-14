import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tool } from '../../types';
import { Copy, Check, Monitor } from 'lucide-react';

interface AspectRatioCalculatorProps {
  tool?: Tool;
}

export const AspectRatioCalculator: React.FC<AspectRatioCalculatorProps> = () => {
  const { t } = useApp();
  const [width, setWidth] = useState<string>('1920');
  const [height, setHeight] = useState<string>('1080');
  const [copied, setCopied] = useState(false);

  const w = parseFloat(width) || 0;
  const h = parseFloat(height) || 0;

  // GCD algorithm for ratio simplification
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const divisor = w > 0 && h > 0 ? gcd(w, h) : 1;
  const ratioW = w > 0 && h > 0 ? w / divisor : 16;
  const ratioH = w > 0 && h > 0 ? h / divisor : 9;

  const decimalRatio = h > 0 ? (w / h).toFixed(2) : '1.78';

  const handleCopy = () => {
    const summary = `${ratioW}:${ratioH} (${w}x${h} px, ${decimalRatio}:1)`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('ar_width', 'Width (Pixels / Units)')}
            </label>
            <input
              id="ar-width-input"
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
              placeholder="1920"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              {t('ar_height', 'Height (Pixels / Units)')}
            </label>
            <input
              id="ar-height-input"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base"
              placeholder="1080"
            />
          </div>
        </div>

        {/* Preset Ratios */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium me-1">{t('lbl_presets', 'Presets:')}</span>
          {[
            { label: '16:9 (HD/4K)', w: '1920', h: '1080' },
            { label: '9:16 (Stories/Reels)', w: '1080', h: '1920' },
            { label: '4:3 (Classic)', w: '1024', h: '768' },
            { label: '1:1 (Square)', w: '1080', h: '1080' },
            { label: '21:9 (Ultrawide)', w: '3440', h: '1440' },
          ].map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setWidth(preset.w);
                setHeight(preset.h);
              }}
              className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 border border-slate-200 dark:border-slate-700"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase text-emerald-600 dark:text-emerald-400">
                {t('ar_simplified', 'Simplified Aspect Ratio')}
              </span>
              <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                {ratioW}:{ratioH}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                {t('ar_decimal', 'Decimal Ratio')}
              </span>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                {decimalRatio}:1
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                {t('ar_total_pixels', 'Total Pixels')}
              </span>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                {((w * h) / 1000000).toFixed(2)} MP
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-200 dark:border-slate-700">
            <button
              id="ar-copy-btn"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy Ratio')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
