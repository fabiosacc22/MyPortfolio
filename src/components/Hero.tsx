import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/config';
import TerminalOverlay from './TerminalOverlay';

const Hero: React.FC = () => {
  const [bootStep, setBootStep] = useState(0); 
  const [commandText, setCommandText] = useState('');
  const [progress, setProgress] = useState(0);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  
  const [titlePart1, setTitlePart1] = useState('');
  const [titlePart2, setTitlePart2] = useState('');
  const [descriptionText, setDescriptionText] = useState('');

  // Recuperiamo i dati dal file config
  const { hero, techStack } = siteConfig;

  const fullCommand = hero.command;
  const fullTitle1 = hero.titlePart1;
  const fullTitle2 = hero.titlePart2;
  const fullDescription = hero.description;
  useEffect(() => {
    if (bootStep === 0) {
      let i = 0;
      const timer = setInterval(() => {
        setCommandText(fullCommand.slice(0, i + 1));
        i++;
        if (i === fullCommand.length) {
          clearInterval(timer);
          setTimeout(() => setBootStep(1), 500);
        }
      }, 60);
      return () => clearInterval(timer);
    }

    if (bootStep === 1) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => setBootStep(2), 300);
            return 100;
          }
          return prev + 10; 
        });
      }, 30);
      return () => clearInterval(timer);
    }

    if (bootStep === 2) {
      let i = 0;
      const timer = setInterval(() => {
        setTitlePart1(fullTitle1.slice(0, i + 1));
        i++;
        if (i === fullTitle1.length) {
          clearInterval(timer);
          setBootStep(3);
        }
      }, 50);
      return () => clearInterval(timer);
    }

    if (bootStep === 3) {
      let i = 0;
      const timer = setInterval(() => {
        setTitlePart2(fullTitle2.slice(0, i + 1));
        i++;
        if (i === fullTitle2.length) {
          clearInterval(timer);
          setBootStep(4);
        }
      }, 50);
      return () => clearInterval(timer);
    }

    if (bootStep === 4) {
      let i = 0;
      const timer = setInterval(() => {
        setDescriptionText(fullDescription.slice(0, i + 1));
        i++;
        if (i === fullDescription.length) clearInterval(timer);
      }, 15);
      return () => clearInterval(timer);
    }
  }, [bootStep]);

  return (
    <><section className="relative w-full min-h-[85vh] flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden font-mono">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] -z-10"></div>

      <div className="w-[92%] max-w-7xl mx-auto flex flex-col items-center text-center py-20">

        {/* TERMINALE DI AVVIO */}
        <div className={`mb-10 w-full max-w-sm text-left transition-opacity duration-500 ${bootStep === 4 ? 'opacity-40' : 'opacity-100'}`}>
          <div className="text-blue-600 dark:text-blue-400 text-sm font-bold mb-2">
            {commandText}<span className={bootStep === 0 ? "animate-pulse" : "hidden"}>_</span>
          </div>
          {bootStep >= 1 && (
            <div className="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded overflow-hidden">
              <div className="h-full bg-blue-600 transition-all duration-75" style={{ width: `${progress}%` }}></div>
            </div>
          )}
        </div>

        {/* CONTENUTO IN SEQUENZA */}
        <div className="flex flex-col items-center w-full">

          {bootStep >= 2 && (
            <div className="flex items-center gap-2 px-3 py-1 mb-8 rounded border border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-widest animate-fadeIn">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              QA_System: Active
            </div>
          )}

          {/* Titolo con Cursore Nero */}
          <h1 className="text-4xl md:text-8xl font-black tracking-tighter text-gray-900 dark:text-white mb-6 uppercase min-h-[100px] md:min-h-[160px]">
            {titlePart1}
            <br />
            {titlePart2 && (
              <span className="bg-black dark:bg-white text-white dark:text-black px-4 py-1 inline-block mt-2">
                {titlePart2}.
              </span>
            )}
            {(bootStep === 2 || bootStep === 3) && <span className="animate-pulse ml-2 text-gray-900 dark:text-white">_</span>}
          </h1>

          {/* Descrizione dinamica */}
          <p className="max-w-2xl text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-12 min-h-[60px]">
            {descriptionText}
            {bootStep === 4 && descriptionText.length < fullDescription.length && (
              <span className="animate-cursor ml-1 inline-block h-5 w-1 bg-gray-900 dark:bg-white"></span>
            )}
          </p>

          {bootStep === 4 && (
            <div className="w-full flex flex-col items-center animate-fadeIn">
              {/* Bottoni */}
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                <button onClick={() => setIsScannerOpen(true)} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none font-bold uppercase text-sm">
                  esegui_test_suite.exe
                </button>
                <button className="px-8 py-3 bg-transparent border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded font-bold uppercase text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                  curriculum_vitae.pdf
                </button>
              </div>

              {/* Tech Stack dinamico */}
              <div className="mt-20 w-full max-w-4xl opacity-60">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">
                  {techStack.map((item, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-800 p-4 rounded hover:border-blue-500 transition-colors">
                      [ {item} ]
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section><TerminalOverlay isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} /></>
  );
};

export default Hero;