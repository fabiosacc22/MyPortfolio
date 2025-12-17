import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/config';

const TerminalOverlay: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState<string[]>([]);
  
  const fullLogs = [
    "> STARTING_FULL_SYSTEM_AUDIT...",
    "> Checking UI/UX integrity... [ OK ]",
    "> Analyzing backend endpoints... [ OK ]",
    "> Running security_vulnerability_scan...",
    "> [ WARNING ] 14 Unresolved bugs found in production",
    "> [ CRITICAL ] Quality Assurance gap detected",
    "> [ ANALYSIS ] Risk of user churn: HIGH",
    "> ------------------------------------------------",
    `> SOLUTION FOUND: ${siteConfig.name} (${siteConfig.role})`,
    "> Action: Fortify_Codebase_And_Automate_Tests",
    "> Status: WAITING_FOR_YOUR_COMMAND",
    "> [ MESSAGE ] Hai bisogno di qualcuno che rompa il tuo codice prima che lo facciano gli utenti?",
  ];

  useEffect(() => {
    if (isOpen) {
      setLogs([]);
      fullLogs.forEach((log, index) => {
        setTimeout(() => {
          setLogs(prev => [...prev, log]);
        }, index * 450); 
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black text-green-500 font-mono p-6 md:p-20 flex flex-col justify-center items-start overflow-hidden">
      {/* Effetto Scanline */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
      
      <div className="max-w-4xl w-full space-y-2 z-10">
        {logs.map((log, i) => (
          <div key={i} className={`text-sm md:text-xl tracking-tight ${
  log.includes('CRITICAL') || log.includes('WARNING') ? 'text-yellow-400 font-bold' : 
  log.includes('SOLUTION') ? 'text-blue-400 font-black' : 'text-green-500'
}`}>
  {log}
</div>
        ))}

        {/* Pulsanti finali che appaiono solo alla fine dei log */}
        {logs.length === fullLogs.length && (
          <div className="mt-12 flex flex-col sm:flex-row gap-6 animate-fadeIn">
            <a 
              href={`mailto:${siteConfig.email}`}
              className="px-8 py-3 bg-green-600 text-black font-black uppercase hover:bg-green-400 transition-colors rounded"
            >
              Assumi_Tester.now()
            </a>
            <button 
              onClick={onClose}
              className="px-8 py-3 border border-green-600 text-green-600 font-bold uppercase hover:bg-green-900/30 transition-colors rounded"
            >
              Torna_al_sito
            </button>
          </div>
        )}
      </div>

      {/* Effetto disturbo statico tipico dei monitor CRT */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://media.giphy.com/media/oEI9uWUicKgS6oWp91/giphy.gif')]"></div>
    </div>
  );
};

export default TerminalOverlay;