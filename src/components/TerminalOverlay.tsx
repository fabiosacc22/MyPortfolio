import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/config';
import { translations } from '../data/translations';

// Aggiungiamo lang alle props
interface TerminalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'it' | 'en';
}

const TerminalOverlay: React.FC<TerminalOverlayProps> = ({ isOpen, onClose, lang }) => {
  const [logs, setLogs] = useState<string[]>([]);
  
  // Recuperiamo le traduzioni dell'overlay
  const t = translations[lang].overlay;
  const fullLogs = t.logs;

  useEffect(() => {
    if (isOpen) {
      setLogs([]);
      fullLogs.forEach((log: string, index: number) => {
        setTimeout(() => {
          setLogs(prev => [...prev, log]);
        }, index * 450); 
      });
    }
  }, [isOpen, fullLogs]); // Aggiunto fullLogs alle dipendenze

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] bg-black text-green-500 font-mono p-6 md:p-20 flex flex-col justify-center items-start overflow-hidden">
      {/* Effetto Scanline */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
      
      <div className="max-w-4xl w-full space-y-2 z-10">
        {logs.map((log, i) => (
          <div key={i} className={`text-sm md:text-xl tracking-tight ${
            log.includes('CRITICAL') || log.includes('WARNING') ? 'text-yellow-400 font-bold' : 
            log.includes('SOLUZIONE') || log.includes('SOLUTION') ? 'text-blue-400 font-black' : 'text-green-500'
          }`}>
            {log}
          </div>
        ))}

        {/* Pulsanti finali */}
        {logs.length === fullLogs.length && (
          <div className="mt-12 flex flex-col sm:flex-row gap-6 animate-fadeIn">
            <a 
              href={`mailto:${siteConfig.email}`}
              className="px-8 py-3 bg-green-600 text-black font-black uppercase hover:bg-green-400 transition-colors rounded text-center"
            >
              {t.ctaHire}
            </a>
            <button 
              onClick={onClose}
              className="px-8 py-3 border border-green-600 text-green-600 font-bold uppercase hover:bg-green-900/30 transition-colors rounded"
            >
              {t.ctaClose}
            </button>
          </div>
        )}
      </div>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://media.giphy.com/media/oEI9uWUicKgS6oWp91/giphy.gif')]"></div>
    </div>
  );
};

export default TerminalOverlay;