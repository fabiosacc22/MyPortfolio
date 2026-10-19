import React, { useEffect, useMemo, useRef, useState } from 'react';
import { siteConfig } from '../data/config';
import { translations } from '../data/translations';

interface CommandPaletteProps {
  lang: 'it' | 'en';
  setLang: (lang: 'it' | 'en') => void;
}

interface Command {
  id: string;
  label: string;
  keywords: string;
  run: () => void;
}

const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

// Il dialogo viene montato solo quando è aperto, così ogni apertura riparte da stato pulito
const PaletteDialog: React.FC<CommandPaletteProps & { onClose: () => void }> = ({ lang, setLang, onClose }) => {
  const t = translations[lang].palette;
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const [notice, setNotice] = useState('');
  const listRef = useRef<HTMLUListElement>(null);

  const commands: Command[] = useMemo(() => [
    { id: 'home', label: t.commands.home, keywords: 'home top inizio', run: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { id: 'experience', label: t.commands.experience, keywords: 'experience esperienze lavoro work', run: () => scrollToId('experience') },
    { id: 'action', label: t.commands.action, keywords: 'test action azione demo newman pytest', run: () => scrollToId('test-in-action') },
    { id: 'contact', label: t.commands.contact, keywords: 'contact contatti email scrivimi', run: () => scrollToId('contact') },
    { id: 'cv', label: t.commands.cv, keywords: 'cv curriculum resume pdf', run: () => window.open(`/cv/${lang}`, '_blank') },
    { id: 'theme', label: t.commands.theme, keywords: 'theme tema dark light chiaro scuro', run: () => window.dispatchEvent(new Event('toggle-theme')) },
    { id: 'langIt', label: t.commands.langIt, keywords: 'lang language lingua italiano it', run: () => setLang('it') },
    { id: 'langEn', label: t.commands.langEn, keywords: 'lang language lingua inglese english en', run: () => setLang('en') },
    { id: 'scanner', label: t.commands.scanner, keywords: 'run test suite scanner audit', run: () => window.dispatchEvent(new Event('open-scanner')) },
    { id: 'copyEmail', label: t.commands.copyEmail, keywords: 'copy copia email mail', run: () => {
      navigator.clipboard.writeText(siteConfig.email);
      setNotice(t.copied);
    } },
    { id: 'linkedin', label: t.commands.linkedin, keywords: 'linkedin social', run: () => window.open(siteConfig.socials.linkedin, '_blank') },
    { id: 'github', label: t.commands.github, keywords: 'github git code social', run: () => window.open(siteConfig.socials.github, '_blank') },
  ], [t, lang, setLang]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(c => `${c.label} ${c.keywords} ${c.id}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    listRef.current?.children[selected]?.scrollIntoView({ block: 'nearest' });
  }, [selected]);

  const execute = (cmd?: Command) => {
    if (!cmd) return;
    cmd.run();
    if (cmd.id !== 'copyEmail') onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected(s => Math.min(s + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected(s => Math.max(s - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      execute(results[selected]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[300] flex items-start justify-center pt-[15vh] px-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        className="w-full max-w-xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl font-mono overflow-hidden"
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <span className="text-blue-600 dark:text-blue-400 font-black">&gt;_</span>
          <input
            autoFocus
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(0); setNotice(''); }}
            placeholder={t.placeholder}
            aria-label={t.placeholder}
            className="flex-1 bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder:text-gray-400"
          />
          <kbd className="text-[10px] text-gray-400 border border-gray-300 dark:border-gray-700 rounded px-1.5 py-0.5">esc</kbd>
        </div>

        {results.length > 0 ? (
          <ul ref={listRef} role="listbox" className="max-h-80 overflow-auto py-2">
            {results.map((cmd, i) => (
              <li
                key={cmd.id}
                role="option"
                aria-selected={i === selected}
                onMouseEnter={() => setSelected(i)}
                onClick={() => execute(cmd)}
                className={`flex items-center justify-between gap-4 px-5 py-2.5 cursor-pointer text-sm transition-colors ${
                  i === selected
                    ? 'bg-blue-600/10 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span>{cmd.label}</span>
                {i === selected && <span className="text-[10px] text-gray-400">↵</span>}
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-5 py-6 text-sm text-red-500">{t.empty} <span className="font-bold">{query}</span></p>
        )}

        <div className="flex items-center justify-between px-5 py-2.5 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 text-[10px] text-gray-400">
          <span>{t.footer}</span>
          {notice && <span className="text-green-500 font-bold">{notice}</span>}
        </div>
      </div>
    </div>
  );
};

// Durante il caricamento iniziale e la sequenza della Hero la navigazione è bloccata: niente palette
const isNavigationLocked = () => {
  const cls = document.documentElement.classList;
  return cls.contains('is-loading') || cls.contains('hero-locked');
};

const CommandPalette: React.FC<CommandPaletteProps> = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isNavigationLocked()) return;
        setOpen(prev => !prev);
      }
    };
    const onOpen = () => { if (!isNavigationLocked()) setOpen(true); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-palette', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-palette', onOpen);
    };
  }, []);

  return open ? <PaletteDialog {...props} onClose={() => setOpen(false)} /> : null;
};

export default CommandPalette;
