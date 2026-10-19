import React, { useCallback, useEffect, useRef, useState } from 'react';
import { translations } from '../data/translations';

type Kind = 'cmd' | 'out' | 'pass' | 'fail' | 'info' | 'sum';
interface Line { text: string; kind: Kind; delay: number; }
type ScenarioId = 'api' | 'ui';

// Scenari simulati: il bug viene trovato, segnalato e poi verificato con un retest
const SCENARIOS: Record<ScenarioId, Line[]> = {
  api: [
    { kind: 'cmd', text: '$ newman run orders-api.postman_collection.json -e staging', delay: 0 },
    { kind: 'out', text: '→ Orders API', delay: 500 },
    { kind: 'pass', text: '  GET  /orders/1042   ✓ status 200 OK', delay: 400 },
    { kind: 'pass', text: '  GET  /orders/1042   ✓ response matches JSON schema', delay: 350 },
    { kind: 'pass', text: '  POST /orders        ✓ returns 201 + Location header', delay: 350 },
    { kind: 'fail', text: '  POST /orders        ✗ negative amount accepted (expected 400, got 201)', delay: 450 },
    { kind: 'info', text: '  ⚠ BUG-101 logged in Jira · severity: HIGH', delay: 500 },
    { kind: 'pass', text: '  DB   orders.id=1042 ✓ status matches API response', delay: 450 },
    { kind: 'sum', text: '  5 passed · 1 failed', delay: 500 },
    { kind: 'cmd', text: '$ # fix deployed → retest BUG-101', delay: 1100 },
    { kind: 'cmd', text: '$ newman run orders-api.postman_collection.json -e staging', delay: 600 },
    { kind: 'pass', text: '  POST /orders        ✓ negative amount rejected with 400', delay: 600 },
    { kind: 'pass', text: '  DB   orders         ✓ no invalid rows persisted', delay: 450 },
    { kind: 'sum', text: '  ALL TESTS PASSED ✔  6/6', delay: 600 },
  ],
  ui: [
    { kind: 'cmd', text: '$ pytest tests/ui -v --browser=chrome', delay: 0 },
    { kind: 'out', text: 'collected 4 items', delay: 500 },
    { kind: 'pass', text: 'test_login_valid_user ........... PASSED', delay: 500 },
    { kind: 'pass', text: 'test_login_wrong_password ....... PASSED', delay: 500 },
    { kind: 'fail', text: 'test_cart_total_updates ......... FAILED', delay: 600 },
    { kind: 'fail', text: '  AssertionError: expected 59.90, got 49.90', delay: 350 },
    { kind: 'info', text: '  ⚠ screenshot saved · BUG-102 logged in Jira', delay: 500 },
    { kind: 'pass', text: 'test_checkout_confirmation ...... PASSED', delay: 500 },
    { kind: 'sum', text: '=== 3 passed, 1 failed in 8.2s ===', delay: 500 },
    { kind: 'cmd', text: '$ # fix deployed → retest BUG-102', delay: 1100 },
    { kind: 'cmd', text: '$ pytest tests/ui/test_cart.py -v', delay: 600 },
    { kind: 'pass', text: 'test_cart_total_updates ......... PASSED', delay: 700 },
    { kind: 'sum', text: '=== ALL TESTS PASSED ✔ ===', delay: 600 },
  ],
};

const KIND_STYLE: Record<Kind, string> = {
  cmd: 'text-blue-400',
  out: 'text-gray-400',
  pass: 'text-green-400',
  fail: 'text-red-400',
  info: 'text-yellow-400',
  sum: 'text-white font-bold',
};

interface TestInActionProps { lang: 'it' | 'en'; }

const TestInAction: React.FC<TestInActionProps> = ({ lang }) => {
  const t = translations[lang].action;
  const [scenario, setScenario] = useState<ScenarioId>('api');
  const [lines, setLines] = useState<Line[]>([]);
  const [running, setRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const run = useCallback((id: ScenarioId) => {
    clearTimers();
    setScenario(id);
    setLines([]);
    setRunning(true);
    setHasRun(true);
    let elapsed = 0;
    SCENARIOS[id].forEach((line, i, all) => {
      elapsed += line.delay;
      timers.current.push(setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (i === all.length - 1) setRunning(false);
      }, elapsed));
    });
  }, []);

  // Parte da sola la prima volta che la sezione entra nello schermo
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        run('api');
        observer.disconnect();
      }
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimers();
    };
  }, [run]);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [lines]);

  const tab = (id: ScenarioId, label: string) => (
    <button
      key={id}
      onClick={() => run(id)}
      disabled={running}
      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all disabled:cursor-not-allowed ${
        scenario === id
          ? 'bg-blue-600 text-white border-blue-600'
          : 'text-gray-500 border-gray-300 dark:border-gray-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400'
      }`}
    >
      {label}
    </button>
  );

  return (
    <section id="test-in-action" ref={sectionRef} className="w-full py-24 bg-white dark:bg-gray-900 font-mono">
      <div className="w-[92%] max-w-5xl mx-auto">
        <div className="border-l-8 border-blue-600 pl-8 mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic">./{t.sectionTitle}</h2>
          <p className="mt-3 text-sm text-gray-500 font-bold uppercase tracking-[0.2em]">{t.sub}</p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-gray-800 bg-gray-950 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-gray-800 bg-gray-900">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest ml-2">qa_runner — {scenario}</span>
            </div>
            <div className="flex items-center gap-2">
              {tab('api', t.api)}
              {tab('ui', t.ui)}
              <button
                onClick={() => run(scenario)}
                disabled={running}
                className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-green-600 hover:bg-green-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {running ? t.running : hasRun ? `↻ ${t.rerun}` : `▶ ${t.run}`}
              </button>
            </div>
          </div>

          <div ref={bodyRef} className="p-5 h-[360px] overflow-auto text-xs md:text-sm leading-relaxed" aria-live="polite">
            {lines.map((line, i) => (
              <div key={i} className={`whitespace-pre animate-log ${KIND_STYLE[line.kind]}`}>{line.text}</div>
            ))}
            {running && <span className="inline-block w-2 h-4 bg-green-400 animate-blink align-middle"></span>}
          </div>
        </div>
        <p className="mt-4 text-[10px] text-gray-400 uppercase tracking-widest text-right">{t.note}</p>
      </div>
    </section>
  );
};

export default TestInAction;
