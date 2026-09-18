import React, { useState, useEffect } from 'react';
import { ToolDef } from '../../../../types';
import { Code, Copy, Check, Terminal, Shield, Network, Eye, RefreshCw } from 'lucide-react';

interface DeveloperToolsEngineProps {
  tool: ToolDef;
}

export const DeveloperToolsEngine: React.FC<DeveloperToolsEngineProps> = ({ tool }) => {
  const [copied, setCopied] = useState(false);

  // UUID Generator State
  const [uuidCount, setUuidCount] = useState<number>(5);
  const [uuidUppercase, setUuidUppercase] = useState<boolean>(false);
  const [generatedUuids, setGeneratedUuids] = useState<string[]>([]);

  // Chmod Permissions State
  const [chmodOctal, setChmodOctal] = useState<string>('755');
  const [permMatrix, setPermMatrix] = useState({
    uRead: true, uWrite: true, uExec: true,
    gRead: true, gWrite: false, gExec: true,
    oRead: true, oWrite: false, oExec: true
  });

  // IP Subnet Calc State
  const [ipAddress, setIpAddress] = useState<string>('192.168.1.100');
  const [cidrMask, setCidrMask] = useState<number>(24);

  // Color Contrast State
  const [fgColor, setFgColor] = useState<string>('#0F172A');
  const [bgColor, setBgColor] = useState<string>('#F8FAFC');

  // JWT Decoder State
  const [jwtInput, setJwtInput] = useState<string>(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjI1Mjg2Mzg3Mjd9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  );

  // CSV to JSON State
  const [csvInput, setCsvInput] = useState<string>('id,name,role,salary\n1,Alice,Engineer,120000\n2,Bob,Designer,95000\n3,Charlie,Manager,135000');
  const [csvDelimiter, setCsvDelimiter] = useState<string>(',');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper UUID v4 generator
  const generateUuidV4 = (upper: boolean): string => {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    return upper ? uuid.toUpperCase() : uuid;
  };

  useEffect(() => {
    if (tool.id === 'uuid-generator') {
      const list: string[] = [];
      for (let i = 0; i < Math.min(50, Math.max(1, uuidCount)); i++) {
        list.push(generateUuidV4(uuidUppercase));
      }
      setGeneratedUuids(list);
    }
  }, [uuidCount, uuidUppercase, tool.id]);

  // 1. Chmod Perms Sync
  const octalFromMatrix = (m: typeof permMatrix): string => {
    const u = (m.uRead ? 4 : 0) + (m.uWrite ? 2 : 0) + (m.uExec ? 1 : 0);
    const g = (m.gRead ? 4 : 0) + (m.gWrite ? 2 : 0) + (m.gExec ? 1 : 0);
    const o = (m.oRead ? 4 : 0) + (m.oWrite ? 2 : 0) + (m.oExec ? 1 : 0);
    return `${u}${g}${o}`;
  };

  const symbolicFromMatrix = (m: typeof permMatrix): string => {
    const u = `${m.uRead ? 'r' : '-'}${m.uWrite ? 'w' : '-'}${m.uExec ? 'x' : '-'}`;
    const g = `${m.gRead ? 'r' : '-'}${m.gWrite ? 'w' : '-'}${m.gExec ? 'x' : '-'}`;
    const o = `${m.oRead ? 'r' : '-'}${m.oWrite ? 'w' : '-'}${m.oExec ? 'x' : '-'}`;
    return `${u}${g}${o}`;
  };

  const handleOctalChange = (val: string) => {
    setChmodOctal(val);
    if (/^[0-7]{3}$/.test(val)) {
      const u = parseInt(val[0], 10);
      const g = parseInt(val[1], 10);
      const o = parseInt(val[2], 10);
      setPermMatrix({
        uRead: (u & 4) !== 0, uWrite: (u & 2) !== 0, uExec: (u & 1) !== 0,
        gRead: (g & 4) !== 0, gWrite: (g & 2) !== 0, gExec: (g & 1) !== 0,
        oRead: (o & 4) !== 0, oWrite: (o & 2) !== 0, oExec: (o & 1) !== 0
      });
    }
  };

  const togglePerm = (key: keyof typeof permMatrix) => {
    const updated = { ...permMatrix, [key]: !permMatrix[key] };
    setPermMatrix(updated);
    setChmodOctal(octalFromMatrix(updated));
  };

  // 2. IPv4 Subnet Calculator
  const calcIpSubnet = () => {
    const parts = ipAddress.split('.').map(p => parseInt(p, 10));
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
      return { valid: false, error: 'Invalid IPv4 address format' };
    }
    const ipNum = (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
    const maskNum = cidrMask === 0 ? 0 : (~0 << (32 - cidrMask));

    const netNum = ipNum & maskNum;
    const bcastNum = netNum | ~maskNum;

    const numToIp = (n: number) => [
      (n >>> 24) & 255,
      (n >>> 16) & 255,
      (n >>> 8) & 255,
      n & 255
    ].join('.');

    const totalHosts = Math.pow(2, 32 - cidrMask);
    const usableHosts = cidrMask >= 31 ? (cidrMask === 31 ? 2 : 1) : Math.max(0, totalHosts - 2);

    return {
      valid: true,
      networkAddress: numToIp(netNum),
      broadcastAddress: numToIp(bcastNum),
      subnetMask: numToIp(maskNum),
      firstHost: numToIp(netNum + 1),
      lastHost: numToIp(bcastNum - 1),
      totalHosts,
      usableHosts,
      error: null
    };
  };

  // 3. WCAG Color Contrast
  const getLuminance = (hex: string) => {
    const clean = hex.replace('#', '');
    if (clean.length !== 6) return 0.5;
    const r = parseInt(clean.substring(0, 2), 16) / 255;
    const g = parseInt(clean.substring(2, 4), 16) / 255;
    const b = parseInt(clean.substring(4, 6), 16) / 255;

    const transform = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b);
  };

  const calcContrastRatio = () => {
    const l1 = getLuminance(fgColor);
    const l2 = getLuminance(bgColor);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    const ratio = (lighter + 0.05) / (darker + 0.05);

    return {
      ratio: ratio.toFixed(2),
      passAaNormal: ratio >= 4.5,
      passAaLarge: ratio >= 3.0,
      passAaaNormal: ratio >= 7.0,
      passAaaLarge: ratio >= 4.5
    };
  };

  // 4. JWT Decoder
  const calcJwtDecode = () => {
    try {
      const parts = jwtInput.trim().split('.');
      if (parts.length !== 3) {
        return { valid: false, error: 'JWT must consist of 3 dot-separated parts (Header.Payload.Signature)' };
      }
      const headerObj = JSON.parse(atob(parts[0]));
      const payloadObj = JSON.parse(atob(parts[1]));

      let expDate = null;
      let isExpired = false;
      if (payloadObj.exp) {
        expDate = new Date(payloadObj.exp * 1000).toLocaleString();
        isExpired = Date.now() > payloadObj.exp * 1000;
      }

      return {
        valid: true,
        header: JSON.stringify(headerObj, null, 2),
        payload: JSON.stringify(payloadObj, null, 2),
        expDate,
        isExpired,
        error: null
      };
    } catch (err: any) {
      return { valid: false, error: 'Failed to decode Base64 JSON payload' };
    }
  };

  // 5. CSV to JSON Parser
  const calcCsvToJson = () => {
    try {
      const lines = csvInput.trim().split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.length < 1) return { valid: true, jsonResult: '[]', count: 0 };

      const headers = lines[0].split(csvDelimiter).map(h => h.trim().replace(/^"|"$/g, ''));
      const result: any[] = [];

      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(csvDelimiter).map(cell => cell.trim().replace(/^"|"$/g, ''));
        const obj: Record<string, any> = {};
        headers.forEach((h, idx) => {
          const val = row[idx] !== undefined ? row[idx] : '';
          obj[h] = !isNaN(Number(val)) && val !== '' ? Number(val) : val;
        });
        result.push(obj);
      }

      return { valid: true, jsonResult: JSON.stringify(result, null, 2), count: result.length, error: null };
    } catch (err: any) {
      return { valid: false, jsonResult: '', count: 0, error: err.message };
    }
  };

  return (
    <div id={`developer-tools-engine-${tool.id}`} className="max-w-4xl mx-auto space-y-6">
      {/* Header Card */}
      <div id="developer-tools-header" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-md">
          Developer & Infrastructure Utilities
        </span>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{tool.name}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{tool.description}</p>
      </div>

      {/* UUID GENERATOR */}
      {tool.id === 'uuid-generator' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-slate-500">Batch Quantity</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={uuidCount}
                  onChange={(e) => setUuidCount(parseInt(e.target.value) || 1)}
                  className="w-24 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono font-bold"
                />
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer pt-4">
                <input
                  type="checkbox"
                  checked={uuidUppercase}
                  onChange={(e) => setUuidUppercase(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                Uppercase Format
              </label>
            </div>
            <button
              onClick={() => {
                const list: string[] = [];
                for (let i = 0; i < uuidCount; i++) list.push(generateUuidV4(uuidUppercase));
                setGeneratedUuids(list);
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white font-medium text-xs rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Regenerate UUIDs
            </button>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase text-slate-500">Generated UUID v4 List</span>
              <button
                onClick={() => copyToClipboard(generatedUuids.join('\n'))}
                className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied All' : 'Copy All'}
              </button>
            </div>
            <div className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-lg space-y-1.5 max-h-60 overflow-y-auto">
              {generatedUuids.map((u, i) => (
                <div key={i} className="flex justify-between items-center group">
                  <span>{u}</span>
                  <button
                    onClick={() => copyToClipboard(u)}
                    className="opacity-0 group-hover:opacity-100 text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CHMOD PERMISSIONS */}
      {tool.id === 'chmod-permissions' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase text-slate-500">Octal Notation (e.g. 755)</label>
              <input
                type="text"
                maxLength={3}
                value={chmodOctal}
                onChange={(e) => handleOctalChange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-lg font-bold text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase text-slate-500">Symbolic Notation</label>
              <div className="p-2.5 bg-slate-900 text-emerald-400 font-mono text-lg font-bold rounded-lg">
                {symbolicFromMatrix(permMatrix)}
              </div>
            </div>
          </div>

          {/* Interactive Matrix Checkboxes */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-semibold uppercase text-slate-500">Permission Scope Matrix</h4>
            <div className="grid grid-cols-3 gap-4 text-center text-xs font-semibold">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg space-y-2">
                <span className="block font-bold text-slate-900 dark:text-white uppercase">User (Owner)</span>
                <label className="flex items-center justify-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={permMatrix.uRead} onChange={() => togglePerm('uRead')} /> Read (4)
                </label>
                <label className="flex items-center justify-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={permMatrix.uWrite} onChange={() => togglePerm('uWrite')} /> Write (2)
                </label>
                <label className="flex items-center justify-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={permMatrix.uExec} onChange={() => togglePerm('uExec')} /> Execute (1)
                </label>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg space-y-2">
                <span className="block font-bold text-slate-900 dark:text-white uppercase">Group</span>
                <label className="flex items-center justify-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={permMatrix.gRead} onChange={() => togglePerm('gRead')} /> Read (4)
                </label>
                <label className="flex items-center justify-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={permMatrix.gWrite} onChange={() => togglePerm('gWrite')} /> Write (2)
                </label>
                <label className="flex items-center justify-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={permMatrix.gExec} onChange={() => togglePerm('gExec')} /> Execute (1)
                </label>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg space-y-2">
                <span className="block font-bold text-slate-900 dark:text-white uppercase">Others</span>
                <label className="flex items-center justify-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={permMatrix.oRead} onChange={() => togglePerm('oRead')} /> Read (4)
                </label>
                <label className="flex items-center justify-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={permMatrix.oWrite} onChange={() => togglePerm('oWrite')} /> Write (2)
                </label>
                <label className="flex items-center justify-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={permMatrix.oExec} onChange={() => togglePerm('oExec')} /> Execute (1)
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* IP SUBNET CALCULATOR */}
      {tool.id === 'ip-subnet-calc' && (() => {
        const sub = calcIpSubnet();
        return (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">IPv4 Address</label>
                <input
                  type="text"
                  value={ipAddress}
                  onChange={(e) => setIpAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">CIDR Mask (/{cidrMask})</label>
                <input
                  type="range"
                  min="8"
                  max="32"
                  value={cidrMask}
                  onChange={(e) => setCidrMask(parseInt(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>
            </div>

            {sub.valid && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 font-mono text-xs">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-[11px] text-slate-500 uppercase block font-semibold">Network Address</span>
                  <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{sub.networkAddress}</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-[11px] text-slate-500 uppercase block font-semibold">Broadcast Address</span>
                  <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{sub.broadcastAddress}</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-[11px] text-slate-500 uppercase block font-semibold">Subnet Mask</span>
                  <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{sub.subnetMask}</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-[11px] text-slate-500 uppercase block font-semibold">Usable Host Range</span>
                  <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{sub.firstHost} – {sub.lastHost}</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-[11px] text-slate-500 uppercase block font-semibold">Total IPv4 Addresses</span>
                  <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{sub.totalHosts.toLocaleString()}</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="text-[11px] text-slate-500 uppercase block font-semibold">Usable Host Count</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 mt-0.5 block">{sub.usableHosts.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* WCAG COLOR CONTRAST */}
      {tool.id === 'color-contrast-ratio' && (() => {
        const { ratio, passAaNormal, passAaLarge, passAaaNormal, passAaaLarge } = calcContrastRatio();
        return (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Foreground Text Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border"
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs uppercase"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Background Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs uppercase"
                  />
                </div>
              </div>
            </div>

            {/* Preview Box */}
            <div
              className="p-6 rounded-xl border flex flex-col justify-center items-center text-center transition-colors"
              style={{ backgroundColor: bgColor, color: fgColor, borderColor: fgColor }}
            >
              <span className="text-xl font-bold">Contrast Sample Text</span>
              <span className="text-xs mt-1">The quick brown fox jumps over the lazy dog (16px Normal Text)</span>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 font-mono text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                <span className="text-[11px] text-slate-500 uppercase block font-semibold">Contrast Ratio</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white mt-0.5 block">{ratio} : 1</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                <span className="text-[11px] text-slate-500 uppercase block font-semibold">AA Normal Text</span>
                <span className={`text-sm font-bold mt-1 block ${passAaNormal ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {passAaNormal ? '✓ PASS' : '✕ FAIL'}
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                <span className="text-[11px] text-slate-500 uppercase block font-semibold">AA Large Text</span>
                <span className={`text-sm font-bold mt-1 block ${passAaLarge ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {passAaLarge ? '✓ PASS' : '✕ FAIL'}
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                <span className="text-[11px] text-slate-500 uppercase block font-semibold">AAA Normal Text</span>
                <span className={`text-sm font-bold mt-1 block ${passAaaNormal ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {passAaaNormal ? '✓ PASS' : '✕ FAIL'}
                </span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* JWT DECODER */}
      {tool.id === 'jwt-decoder' && (() => {
        const jwt = calcJwtDecode();
        return (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Encoded JWT Token String</label>
              <textarea
                rows={3}
                value={jwtInput}
                onChange={(e) => setJwtInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs text-slate-900 dark:text-white break-all"
              />
            </div>

            {!jwt.valid ? (
              <div className="p-3 bg-rose-50 text-rose-800 border border-rose-200 rounded-lg text-xs font-mono">
                {jwt.error}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 font-mono text-xs">
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase text-slate-500 block">Header (Algorithm & Type)</span>
                  <pre className="p-3 bg-slate-900 text-rose-400 rounded-lg overflow-x-auto max-h-60">
                    {jwt.header}
                  </pre>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase text-slate-500 block">Payload (Claims & Expiry)</span>
                  <pre className="p-3 bg-slate-900 text-emerald-400 rounded-lg overflow-x-auto max-h-60">
                    {jwt.payload}
                  </pre>
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* CSV TO JSON */}
      {tool.id === 'csv-to-json' && (() => {
        const { valid, jsonResult, count, error } = calcCsvToJson();
        return (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Delimiter</label>
              <select
                value={csvDelimiter}
                onChange={(e) => setCsvDelimiter(e.target.value)}
                className="px-3 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono"
              >
                <option value=",">Comma (,)</option>
                <option value=";">Semicolon (;)</option>
                <option value="\t">Tab (\t)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">Raw CSV Text Input</label>
              <textarea
                rows={5}
                value={csvInput}
                onChange={(e) => setCsvInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs"
              />
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase text-slate-500">JSON Output ({count} Objects)</span>
                <button
                  onClick={() => copyToClipboard(jsonResult)}
                  className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy JSON'}
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-lg max-h-60 overflow-y-auto">
                {jsonResult}
              </pre>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
