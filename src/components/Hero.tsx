import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/config';
import { translations } from '../data/translations';
import TerminalOverlay from './TerminalOverlay';

interface HeroProps {
  lang: 'it' | 'en';
  setLang: React.Dispatch<React.SetStateAction<'it' | 'en'>>;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = translations[lang].hero;
  const { techStack, hero: heroConfig } = siteConfig;

  const [bootStep, setBootStep] = useState(0); 
  const [, setCommandText] = useState('');
  const [progress, setProgress] = useState(0);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  
  const [titlePart1, setTitlePart1] = useState('');
  const [titlePart2, setTitlePart2] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  
  const [isDescriptionDone, setIsDescriptionDone] = useState(false);
  const [animationsComplete, setAnimationsComplete] = useState(false);

  // 1. GESTIONE DESCRIZIONE E SBLOCCO FINALE
  useEffect(() => {
    if (bootStep === 4) {
      let i = 0;
      setIsDescriptionDone(false);
      setAnimationsComplete(false);
      setDescriptionText(''); 
      const timer = setInterval(() => {
        const fullText = t.description;
        setDescriptionText(fullText.slice(0, i + 1));
        i++;
        if (i === fullText.length) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDescriptionDone(true);
            // Calcolo tempo basato sulle skills
            const totalDelay = (techStack.length * 150) + 600;
            setTimeout(() => setAnimationsComplete(true), totalDelay);
          }, 400);
        }
      }, 15);
      return () => clearInterval(timer);
    }
  }, [lang, bootStep, t.description, techStack.length]);

  // 2. LOGICA DI BOOT (0-4)
  useEffect(() => {
    let timer: any;
    if (bootStep === 0) {
      let i = 0;
      timer = setInterval(() => {
        setCommandText(t.command.slice(0, i + 1));
        if (++i === t.command.length) { 
          clearInterval(timer); 
          setTimeout(() => setBootStep(1), 500); 
        }
      }, 60);
    } else if (bootStep === 1) {
      timer = setInterval(() => {
        setProgress(p => { 
          if (p >= 100) { clearInterval(timer); setTimeout(() => setBootStep(2), 300); return 100; } 
          return p + 10; 
        });
      }, 30);
    } else if (bootStep === 2) {
      let i = 0;
      timer = setInterval(() => {
        setTitlePart1(heroConfig.titlePart1.slice(0, i + 1));
        if (++i === heroConfig.titlePart1.length) { clearInterval(timer); setBootStep(3); }
      }, 50);
    } else if (bootStep === 3) {
      let i = 0;
      timer = setInterval(() => {
        setTitlePart2(heroConfig.titlePart2.slice(0, i + 1));
        if (++i === heroConfig.titlePart2.length) { clearInterval(timer); setBootStep(4); }
      }, 50);
    }
    return () => clearInterval(timer);
  }, [bootStep, lang, t.command, heroConfig]);

  return (
    <>
      <section className="relative w-full min-h-[85vh] flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden font-mono">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] -z-10"></div>

        <div className="w-[92%] max-w-7xl mx-auto flex flex-col items-center text-center py-20">
          
          {/* TERMINALE SINCRONIZZATO */}
          <div className="mb-10 w-full max-w-sm text-left">
            <div className={`text-sm font-bold mb-2 transition-all duration-500 ${
              animationsComplete ? 'text-green-500' : 'text-blue-600'
            }`}>
              {animationsComplete && <span className="mr-2 animate-fadeIn">✔</span>}
              {/* FIX: Mostra il comando di init finché non è tutto completo */}
              {animationsComplete ? t.successMsg : t.command}
              {!animationsComplete && bootStep === 0 && <span className="animate-pulse">_</span>}
            </div>
            
            {bootStep >= 1 && (
              <div className="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    animationsComplete ? 'bg-green-500' : 'bg-blue-600'
                  }`} 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center w-full">
            {bootStep >= 2 && (
              <>
                <div className="relative mb-8 animate-fadeIn">
                  <div className="absolute -inset-2 border border-blue-500/30 rounded-full animate-pulse"></div>
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gray-900 dark:border-white overflow-hidden shadow-2xl relative z-10">
                    <img src={siteConfig.profileImage} alt={siteConfig.name} className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 mb-8 rounded border border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-widest animate-fadeIn">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  {t.status}
                </div>

                <h1 className="text-4xl md:text-8xl font-black tracking-tighter text-gray-900 dark:text-white mb-6 uppercase">
                  {titlePart1}<br />
                  {titlePart2 && <span className="bg-black dark:bg-white text-white dark:text-black px-4 py-1 inline-block mt-2">{titlePart2}.</span>}
                </h1>

                <p className="max-w-2xl text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-12 min-h-[60px] whitespace-pre-line">
                  {descriptionText}
                  {!animationsComplete && bootStep === 4 && <span className="animate-pulse ml-1 inline-block h-5 w-1 bg-blue-600"></span>}
                </p>

                <div className={`w-full flex flex-col items-center transition-all duration-700 ${isDescriptionDone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  
                  <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full">
                    <button 
                      onClick={() => setIsScannerOpen(true)} 
                      style={{ transitionDelay: animationsComplete ? '0ms' : '100ms' }}
                      className={`px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all font-bold uppercase text-sm 
                        ${isDescriptionDone ? 'opacity-100' : 'opacity-0'}`}
                    >
                      {t.ctaMain}
                    </button>
                    <button 
                      style={{ transitionDelay: animationsComplete ? '0ms' : '300ms' }}
                      className={`px-8 py-3 bg-transparent border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded font-bold uppercase text-sm hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all
                        ${isDescriptionDone ? 'opacity-100' : 'opacity-0'}`}
                    >
                      {t.ctaCv}
                    </button>
                  </div>

                  <div className="mt-20 w-full max-w-4xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-500 justify-items-center">
                      {techStack.map((item, index) => (
                        <div 
                          key={index} 
                          style={{ transitionDelay: animationsComplete ? '0ms' : `${(index + 2) * 150}ms` }}
                          className={`w-full border border-gray-200 dark:border-gray-800 p-4 rounded flex items-center justify-center cursor-default
                            hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/10 transition-all duration-200
                            ${isDescriptionDone ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                        >
                          [ {item} ]
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <TerminalOverlay isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} lang={lang} />
    </>
  );
};

export default Hero;