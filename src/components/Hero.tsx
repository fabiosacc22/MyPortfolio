import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden font-mono">
      
      {/* Background Decor: Linee di griglia sottili stile blueprint */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] -z-10"></div>

      <div className="w-[92%] max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Status Badge stile Terminale */}
        <div className="flex items-center gap-2 px-3 py-1 mb-8 rounded border border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-widest">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          System Status: Stable / Quality Guaranteed
        </div>

        {/* Titolo Principale */}
        <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white mb-6 uppercase">
          Prevenire i Bug <br />
          <span className="bg-black dark:bg-white text-white dark:text-black px-4 py-1">
            prima del deploy.
          </span>
        </h1>

        {/* Descrizione con focus sul Testing */}
        <p className="max-w-2xl text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-12">
          Software Tester & QA Automation Engineer. <br />
          Analizzo, rompo e fortifico il codice per assicurarmi che ogni rilascio sia 
          esente da errori e pronto per l'utente finale.
        </p>

        {/* Bottoni stile "Command Line" */}
<div className="flex flex-col sm:flex-row gap-6 items-center">
  <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none font-bold uppercase text-sm">
    esegui_test_suite.exe
  </button>
  
  <button className="px-8 py-3 bg-transparent border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded font-bold uppercase text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
    curriculum_vitae.pdf
  </button>
</div>

{/* QA Tech Stack - AGGIORNATO CON I TUOI TOOL */}
<div className="mt-20 w-full max-w-4xl opacity-60">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">
    <div className="border border-gray-200 dark:border-gray-800 p-4 rounded hover:border-blue-500 transition-colors">
      [ Manual Testing ]
    </div>
    <div className="border border-gray-200 dark:border-gray-800 p-4 rounded hover:border-blue-500 transition-colors">
      [ Bug Reporting / Jira ]
    </div>
    <div className="border border-gray-200 dark:border-gray-800 p-4 rounded hover:border-blue-500 transition-colors">
      [ Regression Testing ]
    </div>
    <div className="border border-gray-200 dark:border-gray-800 p-4 rounded hover:border-blue-500 transition-colors">
      [ API Testing / Postman ]
    </div>
  </div>
</div>

      </div>
    </section>
  );
};

export default Hero;