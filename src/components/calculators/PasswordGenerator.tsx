import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Tool } from '../../types';
import { Copy, Check, RefreshCw, Key, ShieldCheck, ShieldAlert } from 'lucide-react';

interface PasswordGeneratorProps {
  tool?: Tool;
}

export const PasswordGenerator: React.FC<PasswordGeneratorProps> = () => {
  const { t } = useApp();
  const [length, setLength] = useState<number>(16);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeLower, setIncludeLower] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const generatePassword = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charset = '';
    if (includeUpper) charset += upper;
    if (includeLower) charset += lower;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (!charset) {
      setPassword('');
      return;
    }

    let result = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }
    setPassword(result);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  // Calculate password strength score (0 - 4)
  let score = 0;
  if (length >= 12) score++;
  if (length >= 16) score++;
  if (includeUpper && includeLower) score++;
  if (includeNumbers && includeSymbols) score++;

  const getStrengthLabel = () => {
    if (score <= 1) return { text: 'Weak', color: 'text-rose-500', bg: 'bg-rose-500' };
    if (score === 2) return { text: 'Fair', color: 'text-amber-500', bg: 'bg-amber-500' };
    if (score === 3) return { text: 'Strong', color: 'text-emerald-500', bg: 'bg-emerald-500' };
    return { text: 'Very Strong', color: 'text-emerald-600', bg: 'bg-emerald-600' };
  };

  const strength = getStrengthLabel();

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs max-w-xl mx-auto space-y-6">
        {/* Output Box */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-between gap-3">
          <div className="font-mono text-lg md:text-xl font-bold tracking-wider text-slate-900 dark:text-white truncate select-all">
            {password || 'Select at least one option'}
          </div>
          <div className="flex items-center gap-2">
            <button
              id="pass-regen-btn"
              onClick={generatePassword}
              className="p-2 text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all"
              title="Regenerate Password"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              id="pass-copy-btn"
              onClick={handleCopy}
              disabled={!password}
              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-all disabled:opacity-50"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Strength Meter Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-slate-500 dark:text-slate-400 uppercase">{t('pass_strength', 'Password Strength')}</span>
            <span className={`font-bold ${strength.color}`}>{strength.text}</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full ${strength.bg} transition-all duration-300`}
              style={{ width: `${(score / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4 pt-2">
          <div>
            <div className="flex justify-between items-center mb-1 text-xs font-semibold">
              <span className="text-slate-500 dark:text-slate-400 uppercase">{t('pass_length', 'Password Length')}</span>
              <span className="text-slate-900 dark:text-white font-mono font-bold text-sm">{length}</span>
            </div>
            <input
              id="pass-length-slider"
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                id="pass-opt-upper"
                type="checkbox"
                checked={includeUpper}
                onChange={(e) => setIncludeUpper(e.target.checked)}
                className="w-4 h-4 rounded-md text-emerald-600 focus:ring-emerald-500"
              />
              <span>{t('pass_upper', 'Uppercase (A-Z)')}</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                id="pass-opt-lower"
                type="checkbox"
                checked={includeLower}
                onChange={(e) => setIncludeLower(e.target.checked)}
                className="w-4 h-4 rounded-md text-emerald-600 focus:ring-emerald-500"
              />
              <span>{t('pass_lower', 'Lowercase (a-z)')}</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                id="pass-opt-numbers"
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 rounded-md text-emerald-600 focus:ring-emerald-500"
              />
              <span>{t('pass_numbers', 'Numbers (0-9)')}</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                id="pass-opt-symbols"
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 rounded-md text-emerald-600 focus:ring-emerald-500"
              />
              <span>{t('pass_symbols', 'Symbols (!@#$)')}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
