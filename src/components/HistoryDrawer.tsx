import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, Clock, ArrowRight, FileSpreadsheet } from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({ isOpen, onClose }) => {
  const { history, clearHistory, navigateTo, t, isRTL } = useApp();

  if (!isOpen) return null;

  const exportHistoryCSV = () => {
    if (history.length === 0) return;
    const rows = [
      ['ID', 'Tool ID', 'Tool Name', 'Date & Time', 'Summary', 'Result'],
      ...history.map((item) => [
        item.id,
        item.toolId,
        item.toolName,
        new Date(item.timestamp).toLocaleString(),
        item.summary,
        item.result,
      ]),
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.map((x) => `"${x}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `calcyfy_history_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className={`fixed inset-y-0 ${isRTL ? 'left-0' : 'right-0'} max-w-full flex`}>
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl border-s border-slate-200 dark:border-slate-800 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-500" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {t('recent_history', 'Calculation History')}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {history.length > 0 && (
                <>
                  <button
                    onClick={exportHistoryCSV}
                    className="p-1.5 text-slate-400 hover:text-emerald-500 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
                    title={t('lbl_export_csv', 'Export CSV')}
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  </button>
                  <button
                    onClick={clearHistory}
                    className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                    title={t('lbl_clear_history', 'Clear History')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* History Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {history.length === 0 ? (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <Clock className="w-8 h-8 mx-auto opacity-40" />
                <p className="text-xs">{t('lbl_no_history', 'No calculations saved yet.')}</p>
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {t(`tool_${item.toolId.replace('-', '_')}_name`, item.toolName)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(item.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {item.summary}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-700/40">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                      {item.result}
                    </span>
                    <button
                      onClick={() => {
                        navigateTo(`tool:${item.toolId}`);
                        onClose();
                      }}
                      className="text-[11px] font-semibold text-slate-500 hover:text-emerald-600 flex items-center gap-1 transition-colors"
                    >
                      <span>{t('lbl_open_tool', 'Open')}</span>
                      <ArrowRight className={`w-3 h-3 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
