import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/config';
import { translations } from '../data/translations';
import TerminalOverlay from './TerminalOverlay';

// FIX: Definizione delle Props per TypeScript
interface HeroProps {
  lang: 'it' | 'en';
  setLang: React.Dispatch<React.SetStateAction<'it' | 'en'>>;
}

const Hero: React.FC<HeroProps> = ({ lang, setLang }) => {
  // --- LOGICA LINGUA ---
  // Rimosso lo stato locale: ora usiamo lang e setLang dalle props
  const t = translations[lang].hero;

  const [bootStep, setBootStep] = useState(0); 
  const [commandText, setCommandText] = useState('');
  const [progress, setProgress] = useState(0);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  
  const [titlePart1, setTitlePart1] = useState('');
  const [titlePart2, setTitlePart2] = useState('');
  const [descriptionText, setDescriptionText] = useState('');

  const { techStack, hero: heroConfig } = siteConfig;

  // Effetto per il reset della descrizione quando cambia la lingua
  useEffect(() => {
    if (bootStep === 4) {
      let i = 0;
      setDescriptionText(''); 
      const timer = setInterval(() => {
        setDescriptionText(t.description.slice(0, i + 1));
        i++;
        if (i === t.description.length) clearInterval(timer);
      }, 10);
      return () => clearInterval(timer);
    }
  }, [lang, bootStep, t.description]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (bootStep === 0) {
      let i = 0;
      timer = setInterval(() => {
        setCommandText(t.command.slice(0, i + 1));
        i++;
        if (i === t.command.length) {
          clearInterval(timer);
          setTimeout(() => setBootStep(1), 500);
        }
      }, 60);
    }

    if (bootStep === 1) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => setBootStep(2), 300);
            return 100;
          }
          return prev + 10; 
        });
      }, 30);
    }

    if (bootStep === 2) {
      let i = 0;
      timer = setInterval(() => {
        setTitlePart1(heroConfig.titlePart1.slice(0, i + 1));
        i++;
        if (i === heroConfig.titlePart1.length) {
          clearInterval(timer);
          setBootStep(3);
        }
      }, 50);
    }

    if (bootStep === 3) {
      let i = 0;
      timer = setInterval(() => {
        setTitlePart2(heroConfig.titlePart2.slice(0, i + 1));
        i++;
        if (i === heroConfig.titlePart2.length) {
          clearInterval(timer);
          setBootStep(4);
        }
      }, 50);
    }

    if (bootStep === 4) {
      setCommandText(t.successMsg);
    }

    return () => clearInterval(timer);
  }, [bootStep, lang, t.command, t.successMsg, heroConfig.titlePart1, heroConfig.titlePart2]);

  return (
    <>
      <section className="relative w-full min-h-[85vh] flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden font-mono">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] -z-10"></div>

       

        <div className="w-[92%] max-w-7xl mx-auto flex flex-col items-center text-center py-20">
          {/* TERMINALE DI AVVIO */}
          <div className={`mb-10 w-full max-w-sm text-left transition-all duration-700 ${bootStep === 4 ? 'opacity-100 scale-105' : 'opacity-100'}`}>
            <div className={`text-sm font-bold mb-2 transition-colors duration-500 ${
              bootStep === 4 ? 'text-green-500 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'
            }`}>
              {bootStep === 4 && <span className="mr-2">✔</span>}
              {commandText}
              <span className={bootStep === 0 ? "animate-pulse" : "hidden"}>_</span>
            </div>
            
            {bootStep >= 1 && (
              <div className="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded overflow-hidden">
                <div 
                  className={`h-full transition-all duration-75 ${bootStep === 4 ? 'bg-green-500' : 'bg-blue-600'}`} 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center w-full">
            {bootStep >= 2 && (
              <div className="relative mb-8 animate-fadeIn">
                <div className="absolute -inset-2 border border-blue-500/30 rounded-full animate-pulse"></div>
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gray-900 dark:border-white overflow-hidden shadow-2xl relative z-10">
                  <img src={siteConfig.profileImage} alt={siteConfig.name} className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            {bootStep >= 2 && (
              <div className="flex items-center gap-2 px-3 py-1 mb-8 rounded border border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-widest animate-fadeIn">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                {t.status}
              </div>
            )}

            <h1 className="text-4xl md:text-8xl font-black tracking-tighter text-gray-900 dark:text-white mb-6 uppercase min-h-[100px] md:min-h-[160px]">
              {titlePart1}
              <br />
              {titlePart2 && (
                <span className="bg-black dark:bg-white text-white dark:text-black px-4 py-1 inline-block mt-2">
                  {titlePart2}.
                </span>
              )}
            </h1>

            <p className="max-w-2xl text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-12 min-h-[60px] whitespace-pre-line">
              {descriptionText}
              {bootStep === 4 && (
                <span className="animate-pulse ml-1 inline-block h-5 w-1 bg-blue-600 dark:bg-blue-400"></span>
              )}
            </p>

            {bootStep === 4 && (
              <div className="w-full flex flex-col items-center animate-fadeIn">
                <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                  <button onClick={() => setIsScannerOpen(true)} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] transition-all active:translate-x-[0px] active:translate-y-[0px] active:shadow-none font-bold uppercase text-sm">
                    {t.ctaMain}
                  </button>
                  <button className="px-8 py-3 bg-transparent border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded font-bold uppercase text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                    {t.ctaCv}
                  </button>
                </div>

                <div className="mt-20 w-full max-w-4xl">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                    {techStack.map((item, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-800 p-4 rounded hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-default">
                        [ {item} ]
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <TerminalOverlay isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} lang={lang} />
    </>
  );
};

export default Hero;