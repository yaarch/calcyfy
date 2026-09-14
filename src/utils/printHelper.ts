/**
 * CALCYFY Print Utility
 * Handles cross-browser, iframe-resilient printing for all calculators and converters.
 */

export interface PrintOptions {
  title: string;
  category?: string;
  elementId?: string;
  lang?: string;
  isRTL?: boolean;
}

export const executePrint = (options: PrintOptions): void => {
  const { title, category = 'Calculator', elementId = 'calculator-container', lang = 'en', isRTL = false } = options;

  // 1. Try standard window.print() first
  try {
    const success = triggerWindowPrint();
    if (success) return;
  } catch (err) {
    console.warn('Standard window.print failed, initiating printable frame fallback:', err);
  }

  // 2. Fallback: Create dedicated printable iframe (essential for embedded iframes)
  triggerIframePrint(title, category, elementId, lang, isRTL);
};

const triggerWindowPrint = (): boolean => {
  if (typeof window !== 'undefined' && window.print) {
    window.print();
    return true;
  }
  return false;
};

const triggerIframePrint = (
  title: string,
  category: string,
  elementId: string,
  lang: string,
  isRTL: boolean
): void => {
  const targetElement = document.getElementById(elementId) || document.querySelector('main');
  const targetHtml = targetElement ? targetElement.innerHTML : '<p>Calculation Summary</p>';
  const currentDate = new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Remove existing print iframe if any
  const oldIframe = document.getElementById('calcyfy-print-iframe');
  if (oldIframe) {
    oldIframe.remove();
  }

  const iframe = document.createElement('iframe');
  iframe.id = 'calcyfy-print-iframe';
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0px';
  iframe.style.height = '0px';
  iframe.style.border = 'none';
  iframe.style.opacity = '0';
  iframe.style.pointerEvents = 'none';

  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document || iframe.contentDocument;
  if (!doc) {
    // If iframe document unavailable, open standard print window
    const printWin = window.open('', '_blank');
    if (printWin) {
      printWin.document.write(buildPrintHtml(title, category, targetHtml, currentDate, lang, isRTL));
      printWin.document.close();
      printWin.focus();
      setTimeout(() => {
        printWin.print();
        printWin.close();
      }, 300);
    }
    return;
  }

  doc.open();
  doc.write(buildPrintHtml(title, category, targetHtml, currentDate, lang, isRTL));
  doc.close();

  // Trigger print once styles and contents are ready
  setTimeout(() => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } catch (e) {
      console.warn('Iframe print error:', e);
      // Fallback to top-level print
      window.print();
    } finally {
      setTimeout(() => {
        iframe.remove();
      }, 2000);
    }
  }, 400);
};

const buildPrintHtml = (
  title: string,
  category: string,
  contentHtml: string,
  formattedDate: string,
  lang: string,
  isRTL: boolean
): string => {
  return `
<!DOCTYPE html>
<html lang="${lang}" dir="${isRTL ? 'rtl' : 'ltr'}">
<head>
  <meta charset="utf-8">
  <title>${title} - CALCYFY</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Tajawal:wght@400;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: ${isRTL ? "'Tajawal', 'Plus Jakarta Sans'" : "'Plus Jakarta Sans'"}, -apple-system, BlinkMacSystemFont, sans-serif;
      color: #0f172a;
      background: #ffffff;
      padding: 32px;
      font-size: 14px;
      line-height: 1.5;
    }
    .print-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    .brand-logo {
      font-size: 20px;
      font-weight: 800;
      color: #059669;
      letter-spacing: -0.5px;
    }
    .brand-tagline {
      font-size: 12px;
      color: #64748b;
      margin-top: 2px;
    }
    .print-meta {
      text-align: ${isRTL ? 'left' : 'right'};
      font-size: 11px;
      color: #64748b;
    }
    .category-badge {
      display: inline-block;
      padding: 2px 8px;
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      color: #047857;
      border-radius: 6px;
      font-weight: 700;
      font-size: 11px;
      margin-bottom: 6px;
    }
    .tool-title {
      font-size: 24px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 16px;
    }
    .print-content {
      margin-top: 16px;
    }
    /* Style form controls and display cards for paper */
    input, select, textarea {
      border: 1px solid #cbd5e1 !important;
      background: #f8fafc !important;
      color: #0f172a !important;
      padding: 8px 12px !important;
      border-radius: 8px !important;
      font-size: 14px !important;
      width: 100% !important;
    }
    .grid {
      display: grid;
      gap: 16px;
    }
    .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
    .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    
    .rounded-2xl, .rounded-xl {
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 16px;
      background: #ffffff;
      margin-bottom: 16px;
      page-break-inside: avoid;
    }
    .font-mono {
      font-family: 'JetBrains Mono', monospace;
    }
    button, .no-print, nav, [role="tablist"] button:not([aria-selected="true"]) {
      display: none !important;
    }
    .print-footer {
      margin-top: 40px;
      padding-top: 16px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: #94a3b8;
    }
    @media print {
      body {
        padding: 0;
      }
      @page {
        margin: 1.5cm;
      }
    }
  </style>
</head>
<body>
  <div class="print-header">
    <div>
      <div class="brand-logo">CALCYFY</div>
      <div class="brand-tagline">Free tools. Simple answers.</div>
    </div>
    <div class="print-meta">
      <div><strong>Date:</strong> ${formattedDate}</div>
      <div><strong>URL:</strong> ${typeof window !== 'undefined' ? window.location.href : 'calcyfy.com'}</div>
    </div>
  </div>

  <div>
    <span class="category-badge">${category}</span>
    <h1 class="tool-title">${title}</h1>
  </div>

  <div class="print-content">
    ${contentHtml}
  </div>

  <div class="print-footer">
    <span>CALCYFY — Privacy-first, client-side calculations.</span>
    <span>www.calcyfy.com</span>
  </div>
</body>
</html>
  `.trim();
};
