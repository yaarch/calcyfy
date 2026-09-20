import React, { useState, useEffect } from 'react';
import { ToolDef } from '../../../../types';
import { Code, Check, Copy, Terminal, Shield, Zap, BookOpen } from 'lucide-react';

interface DeveloperDomainEngineProps {
  tool: ToolDef;
}

export const DeveloperDomainEngine: React.FC<DeveloperDomainEngineProps> = ({ tool }) => {
  const [copied, setCopied] = useState(false);

  // Hash Generator State
  const [hashInput, setHashInput] = useState<string>('Calcyfy Developer Suite 2026');
  const [hashSha256, setHashSha256] = useState<string>('');
  const [hashSha1, setHashSha1] = useState<string>('');

  // HTML Entity State
  const [htmlText, setHtmlText] = useState<string>('<div class="header">Hello & Welcome "2026"!</div>');
  const [htmlMode, setHtmlMode] = useState<'encode' | 'decode'>('encode');

  // Resistor Color State
  const [bandCount, setBandCount] = useState<4 | 5>(4);
  const [band1, setBand1] = useState<number>(1); // Brown (1)
  const [band2, setBand2] = useState<number>(0); // Black (0)
  const [band3, setBand3] = useState<number>(2); // Red (2)
  const [multiplier, setMultiplier] = useState<number>(100); // Red (100)
  const [tolerance, setTolerance] = useState<number>(5); // Gold (5%)

  // Ohm's Law State
  const [voltage, setVoltage] = useState<number>(12);
  const [current, setCurrent] = useState<number>(2);
  const [resistance, setResistance] = useState<number>(6);
  const [power, setPower] = useState<number>(24);
  const [knownPair, setKnownPair] = useState<'VI' | 'VR' | 'IR' | 'VP'>('VI');

  // JSON Minify State
  const [jsonInput, setJsonInput] = useState<string>('{\n  "status": "success",\n  "tools": 525,\n  "version": "2.0.0"\n}');

  // URL Parser State
  const [urlInput, setUrlInput] = useState<string>('https://calcyfy.pages.dev/en/json-minify?utm_source=search&ref=dev#overview');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Async Hash computation using Web Crypto API
  useEffect(() => {
    if (tool.id === 'hash-generator' && typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(hashInput);

      window.crypto.subtle.digest('SHA-256', data).then((buf) => {
        const hashArray = Array.from(new Uint8Array(buf));
        setHashSha256(hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''));
      });

      window.crypto.subtle.digest('SHA-1', data).then((buf) => {
        const hashArray = Array.from(new Uint8Array(buf));
        setHashSha1(hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''));
      });
    }
  }, [hashInput, tool.id]);

  // 1. HTML Entity Conversion
  const calcHtmlEntity = () => {
    if (htmlMode === 'encode') {
      return htmlText
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    } else {
      return htmlText
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
    }
  };

  // 2. Resistor Color Code Calculations
  const RESISTOR_COLOR_TABLE: Array<{ color: string; value: number; mult: number; tol: number; hex: string }> = [
    { color: 'Black', value: 0, mult: 1, tol: 0, hex: '#000000' },
    { color: 'Brown', value: 1, mult: 10, tol: 1, hex: '#8B4513' },
    { color: 'Red', value: 2, mult: 100, tol: 2, hex: '#FF0000' },
    { color: 'Orange', value: 3, mult: 1000, tol: 0, hex: '#FFA500' },
    { color: 'Yellow', value: 4, mult: 10000, tol: 0, hex: '#FFFF00' },
    { color: 'Green', value: 5, mult: 100000, tol: 0.5, hex: '#008000' },
    { color: 'Blue', value: 6, mult: 1000000, tol: 0.25, hex: '#0000FF' },
    { color: 'Violet', value: 7, mult: 10000000, tol: 0.1, hex: '#EE82EE' },
    { color: 'Grey', value: 8, mult: 100000000, tol: 0.05, hex: '#808080' },
    { color: 'White', value: 9, mult: 1000000000, tol: 0, hex: '#FFFFFF' },
    { color: 'Gold', value: -1, mult: 0.1, tol: 5, hex: '#FFD700' },
    { color: 'Silver', value: -1, mult: 0.01, tol: 10, hex: '#C0C0C0' }
  ];

  const calcResistorValue = () => {
    let digitsVal = 0;
    if (bandCount === 4) {
      digitsVal = band1 * 10 + band2;
    } else {
      digitsVal = band1 * 100 + band2 * 10 + band3;
    }
    const resistanceOhms = digitsVal * multiplier;
    const minRes = resistanceOhms * (1 - tolerance / 100);
    const maxRes = resistanceOhms * (1 + tolerance / 100);

    let formattedOhms = `${resistanceOhms} Ω`;
    if (resistanceOhms >= 1000000) {
      formattedOhms = `${(resistanceOhms / 1000000).toFixed(2)} MΩ`;
    } else if (resistanceOhms >= 1000) {
      formattedOhms = `${(resistanceOhms / 1000).toFixed(2)} kΩ`;
    }

    return { resistanceOhms, formattedOhms, minRes, maxRes };
  };

  // 3. Ohm's Law Calculations
  const calcOhmsLaw = () => {
    let v = voltage, i = current, r = resistance, p = power;

    if (knownPair === 'VI') {
      r = i > 0 ? v / i : 0;
      p = v * i;
    } else if (knownPair === 'VR') {
      i = r > 0 ? v / r : 0;
      p = r > 0 ? (v * v) / r : 0;
    } else if (knownPair === 'IR') {
      v = i * r;
      p = i * i * r;
    } else if (knownPair === 'VP') {
      i = v > 0 ? p / v : 0;
      r = p > 0 ? (v * v) / p : 0;
    }

    return { v, i, r, p };
  };

  // 4. JSON Formatting & Minifying
  const calcJsonMinify = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const minified = JSON.stringify(parsed);
      const formatted = JSON.stringify(parsed, null, 2);
      const origSize = new Blob([jsonInput]).size;
      const minSize = new Blob([minified]).size;
      const compressionPct = origSize > 0 ? ((1 - minSize / origSize) * 100).toFixed(1) : '0';

      return { valid: true, minified, formatted, origSize, minSize, compressionPct, error: null };
    } catch (err: any) {
      return { valid: false, minified: '', formatted: '', origSize: 0, minSize: 0, compressionPct: '0', error: err.message };
    }
  };

  // 5. URL Parsing
  const calcUrlParser = () => {
    try {
      const parsed = new URL(urlInput);
      const queryParams: Array<{ key: string; value: string }> = [];
      parsed.searchParams.forEach((v, k) => {
        queryParams.push({ key: k, value: v });
      });

      return {
        valid: true,
        protocol: parsed.protocol,
        hostname: parsed.hostname,
        port: parsed.port || '(Default)',
        pathname: parsed.pathname,
        search: parsed.search,
        hash: parsed.hash || '(None)',
        queryParams,
        error: null
      };
    } catch (err: any) {
      return { valid: false, protocol: '', hostname: '', port: '', pathname: '', search: '', hash: '', queryParams: [], error: 'Invalid URL string' };
    }
  };

  return (
    <div id={`developer-domain-engine-${tool.id}`} className="max-w-4xl mx-auto space-y-6">
      {/* Tool Header Card */}
      <div id="developer-header-card" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
            Developer & Data Utility Engine
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{tool.name}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{tool.description}</p>
      </div>

      {/* HASH GENERATOR TOOL */}
      {tool.id === 'hash-generator' && (() => {
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Input Raw Text String</label>
                <textarea
                  rows={3}
                  value={hashInput}
                  onChange={(e) => setHashInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-slate-500"
                />
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                {/* SHA-256 Output */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase text-slate-500">
                    <span>SHA-256 Digest</span>
                    <button
                      onClick={() => copyToClipboard(hashSha256)}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" /> Copy
                    </button>
                  </div>
                  <div className="p-3 bg-slate-900 text-emerald-400 rounded-lg font-mono text-xs break-all">
                    {hashSha256 || 'Computing SHA-256...'}
                  </div>
                </div>

                {/* SHA-1 Output */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase text-slate-500">
                    <span>SHA-1 Digest</span>
                    <button
                      onClick={() => copyToClipboard(hashSha1)}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" /> Copy
                    </button>
                  </div>
                  <div className="p-3 bg-slate-900 text-emerald-400 rounded-lg font-mono text-xs break-all">
                    {hashSha1 || 'Computing SHA-1...'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* HTML ENTITY TOOL */}
      {tool.id === 'html-entity' && (() => {
        const output = calcHtmlEntity();
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase text-slate-500">Conversion Direction</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setHtmlMode('encode')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      htmlMode === 'encode'
                        ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Encode to Entities
                  </button>
                  <button
                    onClick={() => setHtmlMode('decode')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      htmlMode === 'decode'
                        ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Decode Entities
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
                  {htmlMode === 'encode' ? 'Raw HTML Input' : 'Encoded Entities Input'}
                </label>
                <textarea
                  rows={4}
                  value={htmlText}
                  onChange={(e) => setHtmlText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-slate-500"
                />
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase text-slate-500">Converted Output</span>
                  <button
                    onClick={() => copyToClipboard(output)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy Result'}
                  </button>
                </div>
                <div className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-lg break-all">
                  {output}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* RESISTOR COLOR CODE TOOL */}
      {tool.id === 'resistor-color' && (() => {
        const { resistanceOhms, formattedOhms, minRes, maxRes } = calcResistorValue();
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 dark:text-white text-base">Select Band Configuration</h3>
                <div className="flex gap-2">
                  {[4, 5].map((b) => (
                    <button
                      key={b}
                      onClick={() => setBandCount(b as 4 | 5)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                        bandCount === b
                          ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {b}-Band Resistor
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selectors */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Band 1 (Digit 1)</label>
                  <select
                    value={band1}
                    onChange={(e) => setBand1(parseInt(e.target.value))}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
                  >
                    {RESISTOR_COLOR_TABLE.filter(c => c.value >= 0).map(c => (
                      <option key={c.color} value={c.value}>{c.color} ({c.value})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Band 2 (Digit 2)</label>
                  <select
                    value={band2}
                    onChange={(e) => setBand2(parseInt(e.target.value))}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
                  >
                    {RESISTOR_COLOR_TABLE.filter(c => c.value >= 0).map(c => (
                      <option key={c.color} value={c.value}>{c.color} ({c.value})</option>
                    ))}
                  </select>
                </div>

                {bandCount === 5 && (
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Band 3 (Digit 3)</label>
                    <select
                      value={band3}
                      onChange={(e) => setBand3(parseInt(e.target.value))}
                      className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
                    >
                      {RESISTOR_COLOR_TABLE.filter(c => c.value >= 0).map(c => (
                        <option key={c.color} value={c.value}>{c.color} ({c.value})</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Multiplier Band</label>
                  <select
                    value={multiplier}
                    onChange={(e) => setMultiplier(parseFloat(e.target.value))}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
                  >
                    {RESISTOR_COLOR_TABLE.map(c => (
                      <option key={c.color} value={c.mult}>{c.color} (×{c.mult})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Tolerance Band</label>
                  <select
                    value={tolerance}
                    onChange={(e) => setTolerance(parseFloat(e.target.value))}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
                  >
                    {RESISTOR_COLOR_TABLE.filter(c => c.tol > 0).map(c => (
                      <option key={c.color} value={c.tol}>{c.color} (±{c.tol}%)</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Output Results */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="p-4 bg-slate-900 text-white rounded-xl">
                  <span className="text-xs text-slate-400 uppercase font-semibold block">Calculated Resistance</span>
                  <span className="text-2xl font-mono font-bold text-emerald-400 mt-1 block">{formattedOhms}</span>
                  <span className="text-xs text-slate-400 font-mono mt-0.5 block">Tolerance: ±{tolerance}%</span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold block">Tolerance Range (Min - Max)</span>
                  <span className="text-sm font-mono font-semibold text-slate-900 dark:text-white mt-1 block">
                    {minRes.toFixed(1)} Ω — {maxRes.toFixed(1)} Ω
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* OHM'S LAW TOOL */}
      {tool.id === 'ohms-law' && (() => {
        const { v, i, r, p } = calcOhmsLaw();
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase text-slate-500">Known Variables Pair</span>
                <select
                  value={knownPair}
                  onChange={(e) => setKnownPair(e.target.value as any)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
                >
                  <option value="VI">Voltage (V) & Current (I)</option>
                  <option value="VR">Voltage (V) & Resistance (R)</option>
                  <option value="IR">Current (I) & Resistance (R)</option>
                  <option value="VP">Voltage (V) & Power (P)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(knownPair === 'VI' || knownPair === 'VR' || knownPair === 'VP') && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Voltage V (Volts)</label>
                    <input
                      type="number"
                      min="0"
                      value={voltage}
                      onChange={(e) => setVoltage(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                )}

                {(knownPair === 'VI' || knownPair === 'IR') && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Current I (Amperes)</label>
                    <input
                      type="number"
                      min="0"
                      value={current}
                      onChange={(e) => setCurrent(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                )}

                {(knownPair === 'VR' || knownPair === 'IR') && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Resistance R (Ohms Ω)</label>
                    <input
                      type="number"
                      min="0"
                      value={resistance}
                      onChange={(e) => setResistance(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                )}

                {knownPair === 'VP' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Power P (Watts)</label>
                    <input
                      type="number"
                      min="0"
                      value={power}
                      onChange={(e) => setPower(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <span className="text-[11px] text-slate-500 font-semibold uppercase block">Voltage (V)</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-base mt-0.5 block">{v.toFixed(2)} V</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <span className="text-[11px] text-slate-500 font-semibold uppercase block">Current (I)</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-base mt-0.5 block">{i.toFixed(2)} A</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <span className="text-[11px] text-slate-500 font-semibold uppercase block">Resistance (R)</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-base mt-0.5 block">{r.toFixed(2)} Ω</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <span className="text-[11px] text-slate-500 font-semibold uppercase block">Power (P)</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-base mt-0.5 block">{p.toFixed(2)} W</span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* JSON MINIFY TOOL */}
      {tool.id === 'json-minify' && (() => {
        const { valid, minified, formatted, origSize, minSize, compressionPct, error } = calcJsonMinify();
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Raw JSON Input</label>
                <textarea
                  rows={6}
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-slate-500"
                />
              </div>

              {!valid ? (
                <div className="p-3 bg-red-50 text-red-800 dark:bg-red-950/50 dark:text-red-300 border border-red-200 dark:border-red-800 rounded-lg text-xs font-mono">
                  Syntax Error: {error}
                </div>
              ) : (
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                      <span className="text-[11px] text-slate-500 uppercase block font-semibold">Original Size</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white text-sm mt-0.5 block">{origSize} Bytes</span>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                      <span className="text-[11px] text-slate-500 uppercase block font-semibold">Minified Size</span>
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm mt-0.5 block">{minSize} Bytes</span>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                      <span className="text-[11px] text-slate-500 uppercase block font-semibold">Reduction</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white text-sm mt-0.5 block">{compressionPct}% Saved</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase text-slate-500">
                      <span>Minified JSON Output</span>
                      <button
                        onClick={() => copyToClipboard(minified)}
                        className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" /> Copy
                      </button>
                    </div>
                    <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-xs rounded-lg break-all max-h-40 overflow-y-auto">
                      {minified}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* URL PARSER TOOL */}
      {tool.id === 'url-parser' && (() => {
        const { valid, protocol, hostname, port, pathname, search, hash, queryParams, error } = calcUrlParser();
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Target URL String</label>
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-slate-500"
                />
              </div>

              {!valid ? (
                <div className="p-3 bg-red-50 text-red-800 dark:bg-red-950/50 dark:text-red-300 border border-red-200 dark:border-red-800 rounded-lg text-xs font-mono">
                  {error}
                </div>
              ) : (
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                      <span className="text-[11px] text-slate-500 uppercase block font-semibold">Protocol</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white text-xs mt-0.5 block">{protocol}</span>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                      <span className="text-[11px] text-slate-500 uppercase block font-semibold">Hostname</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white text-xs mt-0.5 block">{hostname}</span>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                      <span className="text-[11px] text-slate-500 uppercase block font-semibold">Pathname</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white text-xs mt-0.5 block truncate">{pathname}</span>
                    </div>
                  </div>

                  {queryParams.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold uppercase text-slate-500">Query Parameters Table</h4>
                      <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono uppercase border-b border-slate-200 dark:border-slate-700">
                            <tr>
                              <th className="p-2">Key</th>
                              <th className="p-2">Value</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-slate-900 dark:text-slate-200">
                            {queryParams.map((q, idx) => (
                              <tr key={idx}>
                                <td className="p-2 font-bold text-indigo-600 dark:text-indigo-400">{q.key}</td>
                                <td className="p-2">{q.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
};
