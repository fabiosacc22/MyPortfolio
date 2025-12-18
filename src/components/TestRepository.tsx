import React, { useState, useEffect } from 'react';
import { projectsData } from '../data/experiences';
import { translations } from '../data/translations';

interface TestRepositoryProps { lang: 'it' | 'en'; }
interface TestCardProps { project: any; t: any; index: number; show: boolean; }

const TestCard: React.FC<TestCardProps> = ({ project, t, index, show }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transitionDelay: show ? `${index * 200}ms` : '0ms' }}
      className={`group relative p-8 rounded-xl transition-all duration-700 font-mono flex flex-col min-h-[520px]
        /* LIGHT MODE */
        bg-white border border-gray-200 
        /* DARK MODE - Colore più chiaro dello sfondo per dare profondità */
        dark:bg-gray-800/50 dark:border-gray-700/50 dark:backdrop-blur-sm
        dark:hover:bg-gray-800/80 dark:hover:border-blue-500/50
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      {/* 1. HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 tracking-tighter">REF_ID: {project.id}</span>
        </div>
        <div className={`text-[10px] font-black px-2 py-1 rounded border transition-colors ${
          project.status === 'PASSED' 
          ? 'border-green-500/50 text-green-600 bg-green-50 dark:bg-green-900/20' 
          : 'border-blue-500/50 text-blue-600 bg-blue-50 dark:bg-blue-900/20'
        }`}>
          {isHovered ? t.runningMsg : `${t.statusLabel}: ${project.status}`}
        </div>
      </div>

      {/* 2. TITOLO */}
      <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-8 leading-tight group-hover:text-blue-600 transition-colors">
        {project.title}
      </h3>

      {/* 3. INFO GRID */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col border-l-2 border-blue-600 pl-4 bg-gray-50 dark:bg-gray-700/30 py-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{t.employer}</span>
          <span className="text-sm font-black text-gray-800 dark:text-gray-100 uppercase">{project.company}</span>
        </div>
        <div className="flex flex-col border-l-2 border-gray-200 dark:border-gray-700 pl-4 py-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{t.activity}</span>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{project.type}</span>
        </div>
        <div className="flex flex-col border-l-2 border-gray-200 dark:border-gray-700 pl-4 py-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{t.period}</span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 italic">{project.date}</span>
        </div>
      </div>
      
      {/* 4. SUMMARY */}
      <div className="mb-8">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3 border-b border-gray-100 dark:border-gray-800 pb-1 text-center">{t.summary}</span>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-justify">{project.description}</p>
      </div>

      {/* 5. FOOTER / CONSOLE */}
      <div className="mt-auto">
        <div className={`transition-all duration-500 overflow-hidden rounded-lg bg-gray-950 border border-gray-800 ${isHovered ? 'max-h-48 opacity-100 shadow-inner' : 'max-h-0 opacity-0'}`}>
          <div className="space-y-1.5 p-4">
            {project.logs.map((log: string, i: number) => (
              <p key={i} className="text-[10px] text-gray-400 font-mono flex gap-2">
                <span className="text-blue-500 font-bold tracking-tighter">[{i}]</span> {log}
              </p>
            ))}
          </div>
        </div>
        {!isHovered && (
          <div className="flex flex-wrap gap-2 py-2">
            {project.tools.map((tool: string) => (
              <span key={tool} className="text-[9px] font-bold bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-1 rounded border border-gray-200 dark:border-gray-700 uppercase tracking-tighter group-hover:border-blue-500/30 transition-colors">#{tool}</span>
            ))}
          </div>
        )}
      </div>
      <div className="absolute top-0 right-0 w-1 h-0 bg-blue-600 transition-all duration-500 group-hover:h-full rounded-tr-xl"></div>
    </div>
  );
};

const TestRepository: React.FC<TestRepositoryProps> = ({ lang }) => {
  const t = translations[lang].experience;
  const currentExperiences = (projectsData as any)[lang];

  const [typingPart, setTypingPart] = useState(''); 
  const [dotsCount, setDotsCount] = useState(0);    
  const [isPronto, setIsPronto] = useState(false);  
  const [showCards, setShowCards] = useState(false);

  const fullSubText = t.sectionSub; 
  const baseText = fullSubText.split('...')[0]; 
  const lastWord = fullSubText.split(' ').pop(); 

  useEffect(() => {
    let i = 0;
    setTypingPart('');
    setDotsCount(0);
    setIsPronto(false);
    setShowCards(false);

    const typingTimer = setInterval(() => {
      setTypingPart(baseText.slice(0, i + 1));
      i++;
      if (i === baseText.length) {
        clearInterval(typingTimer);
        startSequence();
      }
    }, 30);

    const startSequence = () => {
      let dotsInterval = setInterval(() => {
        setDotsCount(prev => (prev + 1) % 4);
      }, 400);

      setTimeout(() => {
        setShowCards(true);
        const totalCascadeTime = (currentExperiences.length * 200) + 800;
        
        setTimeout(() => {
          clearInterval(dotsInterval);
          setDotsCount(3); 
          setIsPronto(true); 
        }, totalCascadeTime);
      }, 1000);
    };

    return () => clearInterval(typingTimer);
  }, [lang, baseText, currentExperiences.length]);

  return (
    <section className="w-full py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-mono relative">
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:30px_30px]"></div>

      <div className="w-[92%] max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="border-l-8 border-blue-600 pl-8">
            <h2 className="text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
              ./{t.sectionTitle}
            </h2>
            
            <div className="mt-3 flex items-center min-h-[24px]">
              <div className="text-sm text-gray-500 font-bold uppercase tracking-[0.3em] flex items-center">
                <span>{typingPart}</span>
                <span className="inline-block min-w-[1.5em]">{'.'.repeat(dotsCount)}</span>
                {!isPronto && <span className="w-2 h-4 bg-blue-600 animate-pulse ml-1 inline-block"></span>}
                <span className={`ml-4 transition-all duration-700 transform ${
                  isPronto ? 'text-green-500 animate-pulse font-black opacity-100 scale-100' : 'opacity-0 scale-90 w-0 overflow-hidden'
                }`}>
                   {lastWord}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded shadow-sm text-right">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{t.snapshotTitle}</p>
            <p className="text-xs text-blue-600 font-black">{t.snapshotEntries}: 0{currentExperiences.length}</p>
            <p className="text-xs text-green-500 font-black">{t.snapshotStatus}: {t.snapshotSynced}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {currentExperiences.map((project: any, index: number) => (
            <TestCard key={project.id} project={project} t={t} index={index} show={showCards} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestRepository;