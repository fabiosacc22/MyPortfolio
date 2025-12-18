import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/config';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [timestamp, setTimestamp] = useState(new Date().toLocaleString('it-IT'));
  const [copied, setCopied] = useState(false);
  
  // Stato per gli errori
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    // Timer per l'orario
    const timer = setInterval(() => {
      setTimestamp(new Date().toLocaleString('it-IT'));
    }, 60000);

    // ASCOLTATORE PER IL BOTTONE NELL'HERO
    const handleErrorSignal = () => {
      setErrorCount(prev => prev + 1);
    };

    window.addEventListener('run-test-suite', handleErrorSignal);

    return () => {
      clearInterval(timer);
      window.removeEventListener('run-test-suite', handleErrorSignal);
    };
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    // Ho aggiunto pt-20 per distanziarlo bene dalla sezione superiore
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-20 pb-12"> 
      <div className="w-[92%] max-w-7xl mx-auto">
        
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-8">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
          </div>
          <span className="text-[10px] text-gray-400 uppercase tracking-widest ml-2">
            Terminal_Output — System.Log
          </span>
        </div>

        {/* Grid Layout */}
        <div className="flex flex-col md:flex-row md:justify-between gap-10 text-sm">
          
          <div className="space-y-2 min-w-[250px]">
            <p className="text-gray-400 text-xs mb-3 uppercase tracking-tighter">// System_Info</p>
            <p className="text-gray-500 dark:text-gray-400">
              <span className="text-blue-600 dark:text-blue-400">➜</span> Last_Build: <span className="text-gray-900 dark:text-gray-100">{timestamp}</span>
            </p>
            
            {/* STATUS DINAMICO: reagisce al click dell'Hero */}
            <p className="text-gray-500 dark:text-gray-400">
              <span className="text-blue-600 dark:text-blue-400">➜</span> Status: {errorCount === 0 ? (
                <span className="text-green-500 font-bold">Success [0 Errors]</span>
              ) : (
                <span className="text-red-500 font-bold animate-pulse">Critical [{errorCount} Errors]</span>
              )}
            </p>
            
            <p className="text-gray-500 dark:text-gray-400">
              <span className="text-blue-600 dark:text-blue-400">➜</span> Environment: <span className="text-gray-900 dark:text-gray-100 uppercase">Production</span>
            </p>
          </div>

          <div className="space-y-2 min-w-[350px]">
            <p className="text-gray-400 text-xs mb-3 uppercase tracking-tighter">// Social_Connections</p>
            <div className="flex flex-col gap-2">
              <a href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer" 
                 className="group text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                const <span className="text-purple-600 dark:text-purple-400 uppercase">Linkedin</span> = "<u>{siteConfig.linkedinUsername}</u>";
              </a>
              <a href={siteConfig.socials.github} target="_blank" rel="noreferrer" 
                 className="group text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                const <span className="text-purple-600 dark:text-purple-400 uppercase">Github</span> = "<u>{siteConfig.githubUsername}</u>";
              </a>
              <div className="flex items-center gap-4">
                <button onClick={handleCopyEmail}
                   className="group text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors text-left">
                  const <span className="text-purple-600 dark:text-purple-400 uppercase">Email</span> = "<u>{siteConfig.email}</u>";
                </button>
                {copied && (
                  <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded animate-pulse">
                    COPIED!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-100 dark:border-gray-900">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            © {currentYear} {siteConfig.name.toUpperCase()} — {siteConfig.role.toUpperCase()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;