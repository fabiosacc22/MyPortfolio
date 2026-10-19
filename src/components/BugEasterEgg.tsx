import React, { useEffect, useState } from 'react';
import { translations } from '../data/translations';

interface BugEasterEggProps { lang: 'it' | 'en'; }

const STORAGE_KEY = 'bugs-found';

const readFound = () => {
  try { return Number(localStorage.getItem(STORAGE_KEY)) || 0; } catch { return 0; }
};

const BugEasterEgg: React.FC<BugEasterEggProps> = ({ lang }) => {
  const t = translations[lang].bug;
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [crawling, setCrawling] = useState(false);
  const [open, setOpen] = useState(false);
  const [found, setFound] = useState(readFound);

  // Ogni tanto un bug attraversa la pagina; se non lo prendi, ricompare dopo un po'
  useEffect(() => {
    if (reduced || crawling) return;
    const timer = setTimeout(() => setCrawling(true), 25000 + Math.random() * 40000);
    return () => clearTimeout(timer);
  }, [reduced, crawling]);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener('open-bug-report', show);
    return () => window.removeEventListener('open-bug-report', show);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const squash = () => {
    setCrawling(false);
    const next = found + 1;
    setFound(next);
    try { localStorage.setItem(STORAGE_KEY, String(next)); } catch { /* storage non disponibile */ }
    setOpen(true);
  };

  const hire = () => {
    setOpen(false);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const row = (label: string, value: React.ReactNode) => (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-2 border-b border-gray-200 dark:border-gray-700/50">
      <span className="sm:w-32 shrink-0 text-[10px] text-gray-400 uppercase tracking-widest">{label}</span>
      <span className="text-sm text-gray-900 dark:text-gray-100">{value}</span>
    </div>
  );

  return (
    <>
      {crawling && (
        <button
          className="bug-crawler"
          onClick={squash}
          onAnimationEnd={() => setCrawling(false)}
          aria-label="Bug"
        >
          <span>🐞</span>
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t.title}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl font-mono overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 bg-red-500/10 border-b border-red-500/30">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🐞</span>
                <div>
                  <p className="text-[10px] text-red-500 font-black tracking-widest">BUG-404</p>
                  <p className="text-sm font-black text-gray-900 dark:text-white uppercase">{t.title}</p>
                </div>
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400">CLOSED</span>
            </div>

            <div className="px-6 py-4">
              {row(t.summaryLabel, t.summary)}
              {row(t.severityLabel, t.severity)}
              {row(t.statusLabel, t.status)}
              {row(t.reporterLabel, t.reporter)}
              <p className="mt-4 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{t.description}</p>
              <p className="mt-4 text-[10px] text-gray-400 uppercase tracking-widest">{t.found} <span className="text-blue-600 dark:text-blue-400 font-black">{Math.max(found, 1)}</span></p>
            </div>

            <div className="flex flex-wrap justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-800/40">
              <button onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-xs font-bold uppercase hover:border-blue-500 transition-colors">
                {t.close}
              </button>
              <button onClick={hire}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase shadow-lg shadow-blue-600/30 transition-colors">
                {t.hire}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BugEasterEgg;
