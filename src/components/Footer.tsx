import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/config';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Stato per la data e ora dinamica
  const [timestamp, setTimestamp] = useState(new Date().toLocaleString('it-IT'));

  // Variabili per i tuoi link reali
  const linkedinURL = "https://www.linkedin.com/in/fabio-antonio-saccone-42b94375";
  const githubURL = "https://github.com/fabiosacc22";
  const emailAddress = "fabiosaccone95@gmail.com";

  useEffect(() => {
    // Aggiorna l'orario ogni minuto
    const timer = setInterval(() => {
      setTimestamp(new Date().toLocaleString('it-IT'));
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="w-full py-12 bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-gray-800 font-mono transition-colors duration-300">
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

        {/* Grid Layout: Ora con justify-between per distanziarle al massimo */}
<div className="flex flex-col md:flex-row md:justify-between gap-10 text-sm">
  
  {/* Colonna Sinistra: System Info */}
  <div className="space-y-2 min-w-[250px]">
    <p className="text-gray-400 text-xs mb-3 uppercase tracking-tighter">// System_Info</p>
    <p className="text-gray-500 dark:text-gray-400">
      <span className="text-blue-600 dark:text-blue-400">➜</span> Last_Build: <span className="text-gray-900 dark:text-gray-100">{timestamp}</span>
    </p>
    <p className="text-gray-500 dark:text-gray-400">
      <span className="text-blue-600 dark:text-blue-400">➜</span> Status: <span className="text-green-500">Success [0 Errors]</span>
    </p>
    <p className="text-gray-500 dark:text-gray-400">
      <span className="text-blue-600 dark:text-blue-400">➜</span> Environment: <span className="text-gray-900 dark:text-gray-100 uppercase">Production</span>
    </p>
  </div>

  {/* Colonna Social Connections dinamica */}
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
              
              <a href={`mailto:${siteConfig.email}`} 
                 className="group text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                const <span className="text-purple-600 dark:text-purple-400 uppercase">Email</span> = "<u>{siteConfig.email}</u>";
              </a>
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