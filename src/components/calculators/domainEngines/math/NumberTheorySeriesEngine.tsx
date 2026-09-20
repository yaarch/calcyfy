import React, { useState } from 'react';
import { ToolDef } from '../../../../types';
import { BookOpen, Copy, Check, Binary, Hash, Code, Sparkles, AlertCircle } from 'lucide-react';

interface NumberTheorySeriesEngineProps {
  tool: ToolDef;
}

export const NumberTheorySeriesEngine: React.FC<NumberTheorySeriesEngineProps> = ({ tool }) => {
  const [copied, setCopied] = useState(false);

  // General Numerical Inputs
  const [numA, setNumA] = useState<number>(120);
  const [numB, setNumB] = useState<number>(45);
  const [numN, setNumN] = useState<number>(10);
  const [baseA, setBaseA] = useState<number>(2);
  const [ratioR, setRatioR] = useState<number>(1.5);

  // Hex Calculator Specific State
  const [hexA, setHexA] = useState<string>('2F');
  const [hexB, setHexB] = useState<string>('1A');
  const [hexOp, setHexOp] = useState<'+' | '-' | '*' | '/' | '%' | 'AND' | 'OR' | 'XOR'>('+');
  const [prefix0x, setPrefix0x] = useState<boolean>(true);

  // Binary Addition State
  const [binA, setBinA] = useState<string>('101010');
  const [binB, setBinB] = useState<string>('010101');
  const [binOp, setBinOp] = useState<'+' | '-' | '*' | 'AND' | 'OR' | 'XOR'>('+');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isPrime = (n: number): boolean => {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  };

  const getPrimeFactors = (n: number): number[] => {
    let num = Math.abs(Math.floor(n));
    const factors: number[] = [];
    let d = 2;
    while (num >= 2) {
      if (num % d === 0) {
        factors.push(d);
        num /= d;
      } else {
        d++;
        if (d * d > num) {
          if (num > 1) factors.push(num);
          break;
        }
      }
    }
    return factors;
  };

  const gcd = (a: number, b: number): number => {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y) {
      const t = y;
      y = x % y;
      x = t;
    }
    return x;
  };

  const lcm = (a: number, b: number): number => {
    if (a === 0 || b === 0) return 0;
    return Math.abs((a * b) / gcd(a, b));
  };

  const numberToWords = (n: number): string => {
    if (n === 0) return 'zero';
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    const convert = (num: number): string => {
      if (num < 20) return ones[num];
      if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? '-' + ones[num % 10] : '');
      if (num < 1000) return ones[Math.floor(num / 100)] + ' hundred' + (num % 100 !== 0 ? ' ' + convert(num % 100) : '');
      if (num < 1000000) return convert(Math.floor(num / 1000)) + ' thousand' + (num % 1000 !== 0 ? ' ' + convert(num % 1000) : '');
      return num.toString();
    };

    return (n < 0 ? 'negative ' : '') + convert(Math.abs(Math.floor(n)));
  };

  const toRoman = (num: number): string => {
    let n = Math.floor(Math.abs(num));
    if (n <= 0 || n > 3999) return 'Out of Range (1-3999)';
    const lookup: Record<string, number> = {
      M: 1000, CM: 900, D: 500, CD: 400,
      C: 100, XC: 90, L: 50, XL: 40,
      X: 10, IX: 9, V: 5, IV: 4, I: 1
    };
    let roman = '';
    for (const i in lookup) {
      while (n >= lookup[i]) {
        roman += i;
        n -= lookup[i];
      }
    }
    return roman;
  };

  // Helper to format binary string into 4-bit nibbles
  const formatBinaryNibbles = (binStr: string): string => {
    const clean = binStr.replace(/\s+/g, '');
    const padLength = Math.ceil(clean.length / 4) * 4 || 4;
    const padded = clean.padStart(padLength, '0');
    return padded.match(/.{1,4}/g)?.join(' ') || padded;
  };

  const calculate = () => {
    switch (tool.id) {
      case 'hex-calculator': {
        const cleanA = hexA.trim().replace(/^0x/i, '');
        const cleanB = hexB.trim().replace(/^0x/i, '');

        const isValidA = cleanA.length > 0 && /^[0-9a-fA-F]+$/.test(cleanA);
        const isValidB = cleanB.length > 0 && /^[0-9a-fA-F]+$/.test(cleanB);

        if (!isValidA || !isValidB) {
          return {
            results: [
              { label: 'Hex Status', value: 'Invalid Hex Input', unit: 'Use digits 0-9 and letters A-F' },
              { label: 'Input A Status', value: isValidA ? `Valid (${cleanA.toUpperCase()})` : 'Invalid Hex Value', unit: '' },
              { label: 'Input B Status', value: isValidB ? `Valid (${cleanB.toUpperCase()})` : 'Invalid Hex Value', unit: '' }
            ],
            formula: 'Hex Arithmetic: Base-16 (0-9, A=10, B=11, C=12, D=13, E=14, F=15)',
            steps: ['Please enter valid hexadecimal values using characters 0-9 and A-F.']
          };
        }

        const decA = parseInt(cleanA, 16);
        const decB = parseInt(cleanB, 16);

        let resDec = 0;
        let opSymbol = '+';
        let isFloat = false;

        switch (hexOp) {
          case '+':
            resDec = decA + decB;
            opSymbol = '+';
            break;
          case '-':
            resDec = decA - decB;
            opSymbol = '-';
            break;
          case '*':
            resDec = decA * decB;
            opSymbol = '×';
            break;
          case '/':
            if (decB === 0) {
              return {
                results: [{ label: 'Division Error', value: 'Cannot divide by 0 (0x0)', unit: '' }],
                formula: `${cleanA.toUpperCase()} ÷ 0 = Undefined`,
                steps: ['Division by zero is undefined in mathematics and computing.']
              };
            }
            resDec = Math.floor(decA / decB);
            opSymbol = '÷';
            isFloat = decA % decB !== 0;
            break;
          case '%':
            if (decB === 0) {
              return {
                results: [{ label: 'Modulo Error', value: 'Cannot modulo by 0', unit: '' }],
                formula: `${cleanA.toUpperCase()} mod 0 = Undefined`,
                steps: ['Modulo by zero is undefined.']
              };
            }
            resDec = decA % decB;
            opSymbol = 'mod';
            break;
          case 'AND':
            resDec = decA & decB;
            opSymbol = '&';
            break;
          case 'OR':
            resDec = decA | decB;
            opSymbol = '|';
            break;
          case 'XOR':
            resDec = decA ^ decB;
            opSymbol = '^';
            break;
        }

        // Negative formatting
        const isNeg = resDec < 0;
        const absDec = Math.abs(resDec);
        const rawHex = absDec.toString(16).toUpperCase();
        const displayHex = (isNeg ? '-' : '') + (prefix0x ? '0x' : '') + rawHex;
        const displayBin = (isNeg ? '-' : '') + formatBinaryNibbles(absDec.toString(2));
        const displayOct = (isNeg ? '-' : '') + absDec.toString(8) + '₈';

        // 32-bit unsigned Two's complement representation
        const u32 = (resDec >>> 0).toString(16).toUpperCase().padStart(8, '0');

        // ASCII character if within printable range 32..126
        let asciiChar = 'Non-printable';
        if (resDec >= 32 && resDec <= 126) {
          asciiChar = `'${String.fromCharCode(resDec)}'`;
        }

        return {
          results: [
            { label: 'Hex Result', value: displayHex, unit: `Base-16` },
            { label: 'Decimal Equivalent', value: resDec.toLocaleString(), unit: `Base-10` },
            { label: 'Binary Equivalent', value: displayBin, unit: `Base-2 (Nibbles)` },
            { label: 'Octal Equivalent', value: displayOct, unit: `Base-8` },
            { label: '32-Bit Hex (2\'s Comp.)', value: `0x${u32}`, unit: 'UInt32' },
            { label: 'ASCII Character', value: asciiChar, unit: 'Text Char' }
          ],
          formula: `0x${cleanA.toUpperCase()} ${opSymbol} 0x${cleanB.toUpperCase()} = ${displayHex} (Decimal: ${decA.toLocaleString()} ${opSymbol} ${decB.toLocaleString()} = ${resDec.toLocaleString()})`,
          steps: [
            `Parse Hex Value A: 0x${cleanA.toUpperCase()} = ${cleanA.split('').map((c, i) => `${parseInt(c, 16)} × 16^${cleanA.length - 1 - i}`).join(' + ')} = ${decA.toLocaleString()} (Decimal)`,
            `Parse Hex Value B: 0x${cleanB.toUpperCase()} = ${cleanB.split('').map((c, i) => `${parseInt(c, 16)} × 16^${cleanB.length - 1 - i}`).join(' + ')} = ${decB.toLocaleString()} (Decimal)`,
            `Execute Operation: ${decA.toLocaleString()} ${opSymbol} ${decB.toLocaleString()} = ${resDec.toLocaleString()}${isFloat ? ` (Quotient: ${(decA / decB).toFixed(4)}, Remainder: ${decA % decB})` : ''}`,
            `Convert to Hexadecimal: ${absDec.toLocaleString()} in Base-16 = ${displayHex}`,
            `Binary Nibbles: ${displayBin}₂`
          ]
        };
      }

      case 'binary-addition': {
        const cleanA = binA.trim();
        const cleanB = binB.trim();
        const decA = parseInt(cleanA, 2) || 0;
        const decB = parseInt(cleanB, 2) || 0;
        let resDec = decA + decB;
        if (binOp === '-') resDec = decA - decB;
        else if (binOp === '*') resDec = decA * decB;
        else if (binOp === 'AND') resDec = decA & decB;
        else if (binOp === 'OR') resDec = decA | decB;
        else if (binOp === 'XOR') resDec = decA ^ decB;

        const binRes = (resDec < 0 ? '-' : '') + Math.abs(resDec).toString(2);
        const hexRes = (resDec < 0 ? '-' : '') + '0x' + Math.abs(resDec).toString(16).toUpperCase();

        return {
          results: [
            { label: 'Binary Result', value: formatBinaryNibbles(binRes), unit: 'Base-2' },
            { label: 'Decimal Equivalent', value: resDec.toLocaleString(), unit: 'Base-10' },
            { label: 'Hexadecimal Equivalent', value: hexRes, unit: 'Base-16' }
          ],
          formula: `${cleanA}₂ ${binOp} ${cleanB}₂ = ${binRes}₂ (Dec: ${decA} ${binOp} ${decB} = ${resDec})`,
          steps: [
            `Convert operand A to decimal: ${cleanA}₂ = ${decA}`,
            `Convert operand B to decimal: ${cleanB}₂ = ${decB}`,
            `Calculate result: ${decA} ${binOp} ${decB} = ${resDec}`,
            `Format binary output: ${formatBinaryNibbles(binRes)}₂`
          ]
        };
      }

      case 'gcd-lcm-multiple-numbers': {
        const g = gcd(numA, numB);
        const l = lcm(numA, numB);
        return {
          results: [
            { label: 'Greatest Common Divisor (GCD)', value: g.toLocaleString(), unit: `gcd(${numA}, ${numB})` },
            { label: 'Least Common Multiple (LCM)', value: l.toLocaleString(), unit: `lcm(${numA}, ${numB})` }
          ],
          formula: 'GCD(a,b) via Euclidean Algorithm | LCM(a,b) = |a × b| / GCD(a,b)',
          steps: [
            `Euclidean step: GCD of ${numA} and ${numB} = ${g}`,
            `LCM calculation: (${numA} × ${numB}) / ${g} = ${l}`
          ]
        };
      }

      case 'prime-checker':
      case 'prime-factorization-tree': {
        const val = Math.floor(numA);
        const check = isPrime(val);
        const factors = getPrimeFactors(val);
        return {
          results: [
            { label: `Is ${val} Prime?`, value: check ? 'YES (Prime Number)' : 'NO (Composite Number)', unit: '' },
            { label: 'Prime Factorization', value: factors.length > 0 ? factors.join(' × ') : 'None', unit: '' }
          ],
          formula: 'Prime status evaluated via Trial Division and Sieve algorithm',
          steps: [
            `Check divisibility up to √${val} (${Math.sqrt(val).toFixed(2)})`,
            `Prime factors breakdown: ${factors.join(' × ')} = ${val}`
          ]
        };
      }

      case 'fibonacci-sequence-generator': {
        const count = Math.min(50, Math.max(1, Math.floor(numN)));
        const fib: number[] = [0, 1];
        for (let i = 2; i < count; i++) {
          fib.push(fib[i - 1] + fib[i - 2]);
        }
        const fibSeq = fib.slice(0, count);
        return {
          results: [
            { label: `Nth Fibonacci Term F(${count})`, value: fibSeq[count - 1].toLocaleString(), unit: '' },
            { label: 'Sequence String', value: fibSeq.join(', '), unit: `First ${count} terms` }
          ],
          formula: 'F(n) = F(n-1) + F(n-2) with F(0)=0, F(1)=1',
          steps: [`Generated ${count} terms recursively using integer addition`]
        };
      }

      case 'golden-ratio-calculator': {
        const phi = (1 + Math.sqrt(5)) / 2; // ~1.6180339887
        const longSegment = numA * phi;
        const shortSegment = numA / phi;
        return {
          results: [
            { label: 'Golden Ratio φ (Phi)', value: phi.toFixed(8), unit: '(1 + √5) / 2' },
            { label: 'Longer Segment (A × φ)', value: longSegment.toFixed(4), unit: '' },
            { label: 'Shorter Segment (A / φ)', value: shortSegment.toFixed(4), unit: '' }
          ],
          formula: 'φ = (1 + √5) / 2 ≈ 1.6180339887...',
          steps: [`Given length ${numA}: Larger = ${longSegment.toFixed(4)}, Smaller = ${shortSegment.toFixed(4)}`]
        };
      }

      case 'roman-numeral': {
        const rom = toRoman(numA);
        return {
          results: [
            { label: `Roman Numeral for ${numA}`, value: rom, unit: '' },
          ],
          formula: 'Additive & Subtractive Roman Numeral Encoding',
          steps: [`Converted integer ${numA} to Roman numeral representation ${rom}`]
        };
      }

      case 'number-to-words': {
        const words = numberToWords(numA);
        return {
          results: [
            { label: 'Cardinal Word Representation', value: words, unit: '' },
            { label: 'Uppercase', value: words.toUpperCase(), unit: '' }
          ],
          formula: 'Linguistic Numeral Expansion Engine',
          steps: [`Converted integer ${numA} to English spoken words`]
        };
      }

      default: {
        const pctChange = numA > 0 ? ((numB - numA) / numA) * 100 : 0;
        return {
          results: [
            { label: 'Percentage Change', value: pctChange.toFixed(2) + '%', unit: `${numA} -> ${numB}` },
            { label: 'Absolute Difference', value: Math.abs(numB - numA).toLocaleString(), unit: '' }
          ],
          formula: 'Change % = ((New - Old) / Old) × 100',
          steps: [`Difference (${numB} - ${numA}) / ${numA} = ${pctChange.toFixed(2)}%`]
        };
      }
    }
  };

  const calc = calculate();

  return (
    <div id={`number-theory-engine-${tool.id}`} className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          {tool.id === 'hex-calculator' ? (
            <Code className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          ) : (
            <Binary className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          )}
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {tool.id === 'hex-calculator' ? 'Hexadecimal & Base-16 Arithmetic Engine' : 'Number Theory & Discrete Series Engine'}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{tool.name}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{tool.description}</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-semibold text-slate-900 dark:text-white text-base">
            {tool.id === 'hex-calculator' ? 'Hexadecimal Values & Operation' : 'Numerical Input Parameters'}
          </h3>
          {tool.id === 'hex-calculator' && (
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Base-16 Math (0-9, A-F)
            </span>
          )}
        </div>

        {/* Quick Scenarios for Hex Calculator */}
        {tool.id === 'hex-calculator' && (
          <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Quick Scenarios:</span>
            <button
              type="button"
              onClick={() => { setHexA('2F'); setHexB('1A'); setHexOp('+'); }}
              className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-200 hover:text-indigo-600 font-mono font-medium border border-slate-200 dark:border-slate-600 transition"
            >
              0x2F + 0x1A (= 0x49)
            </button>
            <button
              type="button"
              onClick={() => { setHexA('1A3F'); setHexB('0B4'); setHexOp('+'); }}
              className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-200 hover:text-indigo-600 font-mono font-medium border border-slate-200 dark:border-slate-600 transition"
            >
              0x1A3F + 0x0B4 (= 0x1AF3)
            </button>
            <button
              type="button"
              onClick={() => { setHexA('FF'); setHexB('01'); setHexOp('+'); }}
              className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-200 hover:text-indigo-600 font-mono font-medium border border-slate-200 dark:border-slate-600 transition"
            >
              0xFF + 0x01 (= 0x100)
            </button>
            <button
              type="button"
              onClick={() => { setHexA('ABCD'); setHexB('1234'); setHexOp('-'); }}
              className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-200 hover:text-indigo-600 font-mono font-medium border border-slate-200 dark:border-slate-600 transition"
            >
              0xABCD - 0x1234
            </button>
            <button
              type="button"
              onClick={() => { setHexA('C0'); setHexB('3F'); setHexOp('XOR'); }}
              className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-200 hover:text-indigo-600 font-mono font-medium border border-slate-200 dark:border-slate-600 transition"
            >
              0xC0 ^ 0x3F (XOR)
            </button>
          </div>
        )}

        {tool.id === 'hex-calculator' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Hex Value A
                </label>
                <div className="relative flex rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500">
                  <span className="px-3 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono text-sm border-r border-slate-300 dark:border-slate-700 select-none">
                    0x
                  </span>
                  <input
                    type="text"
                    value={hexA}
                    onChange={(e) => setHexA(e.target.value.replace(/[^0-9a-fA-F]/g, ''))}
                    placeholder="e.g. 1A3F or 2F"
                    className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm uppercase focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="md:col-span-2 flex flex-col justify-end">
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5 text-center">
                  Operation
                </label>
                <select
                  value={hexOp}
                  onChange={(e) => setHexOp(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold font-mono text-center rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                >
                  <option value="+">+ (Add)</option>
                  <option value="-">- (Subtract)</option>
                  <option value="*">× (Multiply)</option>
                  <option value="/">÷ (Divide)</option>
                  <option value="%">% (Modulo)</option>
                  <option value="AND">& (AND)</option>
                  <option value="OR">| (OR)</option>
                  <option value="XOR">^ (XOR)</option>
                </select>
              </div>

              <div className="md:col-span-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Hex Value B
                </label>
                <div className="relative flex rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500">
                  <span className="px-3 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono text-sm border-r border-slate-300 dark:border-slate-700 select-none">
                    0x
                  </span>
                  <input
                    type="text"
                    value={hexB}
                    onChange={(e) => setHexB(e.target.value.replace(/[^0-9a-fA-F]/g, ''))}
                    placeholder="e.g. 0B4 or 1A"
                    className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm uppercase focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={prefix0x}
                  onChange={(e) => setPrefix0x(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Include "0x" prefix in Hex result output</span>
              </label>
            </div>
          </div>
        ) : tool.id === 'binary-addition' ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Binary Number 1</label>
              <input
                type="text"
                value={binA}
                onChange={(e) => setBinA(e.target.value.replace(/[^01]/g, ''))}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Operation</label>
              <select
                value={binOp}
                onChange={(e) => setBinOp(e.target.value as any)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm"
              >
                <option value="+">+ (Add)</option>
                <option value="-">- (Subtract)</option>
                <option value="*">× (Multiply)</option>
                <option value="AND">AND</option>
                <option value="OR">OR</option>
                <option value="XOR">XOR</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Binary Number 2</label>
              <input
                type="text"
                value={binB}
                onChange={(e) => setBinB(e.target.value.replace(/[^01]/g, ''))}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                {tool.id.includes('fibonacci') ? 'Terms Count N' : 'First Number (A)'}
              </label>
              <input type="number" value={numA} onChange={(e) => setNumA(parseFloat(e.target.value) || 0)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm" />
            </div>

            {!tool.id.includes('fibonacci') && !tool.id.includes('words') && !tool.id.includes('golden') && (
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Second Number (B)</label>
                <input type="number" value={numB} onChange={(e) => setNumB(parseFloat(e.target.value) || 0)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-sm" />
              </div>
            )}
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Computed Output
            </h4>
            <button onClick={() => copyToClipboard(calc.results.map(r => `${r.label}: ${r.value}`).join(' | '))} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
              {copied ? <Check className="w-3.5 h-3.5 text-indigo-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {calc.results.map((res, i) => (
              <div key={i} className="p-4 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">{res.label}</span>
                <span className="text-lg font-mono font-bold text-indigo-900 dark:text-indigo-200 mt-1 block break-all">
                  {res.value} {res.unit && <span className="text-xs font-sans font-normal text-indigo-600 dark:text-indigo-400">({res.unit})</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold text-sm">
          <BookOpen className="w-4 h-4 text-indigo-500" />
          <span>Formula & Algorithm Steps</span>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg font-mono text-xs text-indigo-700 dark:text-indigo-300 font-bold">
          {calc.formula}
        </div>
        <div className="space-y-1 font-mono text-xs text-slate-700 dark:text-slate-300 pl-2">
          {calc.steps.map((st, i) => (
            <div key={i}>• {st}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
