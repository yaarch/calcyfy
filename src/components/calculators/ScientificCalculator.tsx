import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tool } from '../../types';
import { Copy, Check, Delete, RotateCcw } from 'lucide-react';

interface ScientificCalculatorProps {
  tool?: Tool;
}

export const ScientificCalculator: React.FC<ScientificCalculatorProps> = () => {
  const { t, addHistory } = useApp();
  const [display, setDisplay] = useState<string>('0');
  const [memory, setMemory] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const handleNum = (num: string) => {
    if (display === '0' || display === 'Error') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOp = (op: string) => {
    if (display === 'Error') return;
    const lastChar = display.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
      setDisplay(display.slice(0, -1) + op);
    } else {
      setDisplay(display + op);
    }
  };

  const handleClear = () => {
    setDisplay('0');
  };

  const handleBackspace = () => {
    if (display.length <= 1 || display === 'Error') {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handleFunc = (fnName: string) => {
    try {
      const val = parseFloat(evalSafe(display));
      if (isNaN(val)) return;
      let res = 0;
      switch (fnName) {
        case 'sin':
          res = Math.sin((val * Math.PI) / 180);
          break;
        case 'cos':
          res = Math.cos((val * Math.PI) / 180);
          break;
        case 'tan':
          res = Math.tan((val * Math.PI) / 180);
          break;
        case 'sqrt':
          res = Math.sqrt(val);
          break;
        case 'sqr':
          res = Math.pow(val, 2);
          break;
        case 'log':
          res = Math.log10(val);
          break;
        case 'ln':
          res = Math.log(val);
          break;
        case 'inv':
          res = 1 / val;
          break;
        default:
          break;
      }
      setDisplay(res.toString());
    } catch {
      setDisplay('Error');
    }
  };

  const evalSafe = (expr: string): string => {
    // Replace visual tokens
    const sanitized = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/π/g, 'Math.PI').replace(/e/g, 'Math.E');
    try {
      // Basic evaluator for standard math expressions
      const result = Function(`"use strict"; return (${sanitized})`)();
      return Number.isFinite(result) ? result.toString() : 'Error';
    } catch {
      return 'Error';
    }
  };

  const handleEquals = () => {
    const res = evalSafe(display);
    setDisplay(res);
    if (res !== 'Error') {
      addHistory('scientific', display, res);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(display);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs max-w-xl mx-auto space-y-4">
        {/* Display screen */}
        <div className="p-4 bg-slate-900 text-white rounded-xl text-end shadow-inner space-y-1">
          <div className="text-xs text-slate-400 font-mono min-h-[16px]">
            {memory !== 0 ? `M: ${memory}` : ''}
          </div>
          <div className="text-3xl font-bold font-mono overflow-x-auto tracking-wide">
            {display}
          </div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-5 gap-2 text-xs md:text-sm font-semibold">
          {/* Scientific Functions */}
          <button onClick={() => handleFunc('sin')} className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200">sin</button>
          <button onClick={() => handleFunc('cos')} className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200">cos</button>
          <button onClick={() => handleFunc('tan')} className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200">tan</button>
          <button onClick={handleClear} className="p-3 bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 rounded-xl hover:bg-rose-200 font-bold">C</button>
          <button onClick={handleBackspace} className="p-3 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl flex items-center justify-center"><Delete className="w-4 h-4" /></button>

          <button onClick={() => handleFunc('sqr')} className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200">x²</button>
          <button onClick={() => handleFunc('sqrt')} className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200">√x</button>
          <button onClick={() => handleFunc('log')} className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200">log</button>
          <button onClick={() => handleFunc('ln')} className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200">ln</button>
          <button onClick={() => handleOp('/')} className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-xl hover:bg-emerald-200 font-bold">÷</button>

          <button onClick={() => handleNum('7')} className="p-3 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white rounded-xl hover:bg-slate-100 text-base">7</button>
          <button onClick={() => handleNum('8')} className="p-3 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white rounded-xl hover:bg-slate-100 text-base">8</button>
          <button onClick={() => handleNum('9')} className="p-3 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white rounded-xl hover:bg-slate-100 text-base">9</button>
          <button onClick={() => handleNum('(')} className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200">(</button>
          <button onClick={() => handleOp('*')} className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-xl hover:bg-emerald-200 font-bold">×</button>

          <button onClick={() => handleNum('4')} className="p-3 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white rounded-xl hover:bg-slate-100 text-base">4</button>
          <button onClick={() => handleNum('5')} className="p-3 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white rounded-xl hover:bg-slate-100 text-base">5</button>
          <button onClick={() => handleNum('6')} className="p-3 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white rounded-xl hover:bg-slate-100 text-base">6</button>
          <button onClick={() => handleNum(')')} className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200">)</button>
          <button onClick={() => handleOp('-')} className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-xl hover:bg-emerald-200 font-bold">-</button>

          <button onClick={() => handleNum('1')} className="p-3 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white rounded-xl hover:bg-slate-100 text-base">1</button>
          <button onClick={() => handleNum('2')} className="p-3 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white rounded-xl hover:bg-slate-100 text-base">2</button>
          <button onClick={() => handleNum('3')} className="p-3 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white rounded-xl hover:bg-slate-100 text-base">3</button>
          <button onClick={() => handleNum('π')} className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200">π</button>
          <button onClick={() => handleOp('+')} className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-xl hover:bg-emerald-200 font-bold">+</button>

          <button onClick={() => handleNum('0')} className="p-3 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white rounded-xl hover:bg-slate-100 text-base col-span-2">0</button>
          <button onClick={() => handleNum('.')} className="p-3 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white rounded-xl hover:bg-slate-100 font-bold text-base">.</button>
          <button onClick={handleEquals} className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-base col-span-2 shadow-xs">=</button>
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-200 dark:border-slate-800">
          <button
            id="sci-copy-btn"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? t('btn_copied', 'Copied!') : t('btn_copy', 'Copy Display')}
          </button>
        </div>
      </div>
    </div>
  );
};
