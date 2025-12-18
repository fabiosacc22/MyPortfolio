import React, { useState, useEffect, useRef, memo } from 'react';
import { projectsData } from '../data/experiences';
import { translations } from '../data/translations';

interface TestRepositoryProps { lang: 'it' | 'en'; }

// --- 1. COMPONENTE TYPEWRITER BLINDATO ---
const TypewriterText = memo(({ text, speed = 15, onComplete }: { text: string; speed?: number; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indexRef = useRef(0);

  // Reset totale solo se cambia il testo (es. cambio lingua)
  useEffect(() => {
    setDisplayedText('');
    setIsFinished(false);
    indexRef.current = 0;
  }, [text]);

  useEffect(() => {
    if (isFinished || !text) return;

    timerRef.current = setInterval(() => {
      const nextChar = text.slice(0, indexRef.current + 1);
      setDisplayedText(nextChar);
      indexRef.current += 1;

      if (indexRef.current >= text.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsFinished(true);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [text, speed, isFinished]); // Rimosso onComplete dalle dipendenze per evitare loop

  return <>{displayedText}</>;
});

// --- 2. GESTORE LOG ---
const LogTerminal = memo(({ logs, active }: { logs: string[]; active: boolean }) => {
  const [currentLine, setCurrentLine] = useState(0);
  useEffect(() => { if (!active) setCurrentLine(0); }, [active]);

  return (
    <div className="space-y-1.5 p-4 bg-gray-950 rounded-lg border border-gray-800">
      {logs.map((log, i) => (
        <p key={i} className={`text-[10px] font-mono flex gap-2 ${i <= currentLine ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-blue-500 font-bold">[{i}]</span>
          <span className="text-gray-400">
            {i === currentLine && active ? (
              <TypewriterText text={log} speed={10} onComplete={() => {
                if (i < logs.length - 1) setCurrentLine(prev => prev + 1);
              }} />
            ) : i < currentLine ? log : null}
          </span>
        </p>
      ))}
    </div>
  );
});

// --- 3. COMPONENTE CARD ---
const TestCard = memo(({ project, t, isActive, isVisible, onAllTextComplete }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const [phase, setPhase] = useState(0); 
  const isCompleteRef = useRef(false);

  useEffect(() => {
    if (isActive && phase === 0) setPhase(1);
    if (!isVisible) {
      setPhase(0);
      isCompleteRef.current = false;
    }
  }, [isActive, isVisible, phase]);

  const handlePhaseComplete = (nextPhase: number) => {
    setPhase(nextPhase);
  };

  const handleFinalComplete = () => {
    if (!isCompleteRef.current) {
      isCompleteRef.current = true;
      onAllTextComplete();
    }
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative p-8 rounded-xl transition-all duration-1000 font-mono flex flex-col min-h-[550px]
        bg-white border border-gray-200 dark:bg-gray-800/40 dark:border-gray-700/50
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}
    >
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-blue-600 animate-pulse' : 'bg-gray-400'}`} />
          <span className="text-[10px] font-black text-blue-600 dark:text-blue-400">REF_ID: {isVisible && project.id}</span>
        </div>
      </div>

      <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase mb-8 h-14">
        {phase >= 1 ? <TypewriterText text={project.title} speed={20} onComplete={() => handlePhaseComplete(2)} /> : null}
      </h3>

      <div className="space-y-4 mb-8">
        <div className="flex flex-col border-l-2 border-blue-600 pl-4 bg-gray-50 dark:bg-gray-700/30 py-2">
          <span className="text-[10px] text-gray-400 uppercase">{t.employer}</span>
          <span className="text-sm font-black">{phase >= 2 ? <TypewriterText text={project.company} speed={15} /> : null}</span>
        </div>
        <div className="flex flex-col border-l-2 border-gray-200 pl-4 py-1">
          <span className="text-[10px] text-gray-400 uppercase">{t.activity}</span>
          <span className="text-sm font-bold text-blue-600">
            {phase >= 2 ? <TypewriterText text={project.type} speed={15} onComplete={() => handlePhaseComplete(3)} /> : null}
          </span>
        </div>
      </div>
      
      <div className="mb-8 flex-grow">
        <span className="text-[10px] font-bold text-gray-400 uppercase block mb-3 border-b text-center">{t.summary}</span>
        <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed min-h-[120px]">
          {phase >= 3 ? <TypewriterText text={project.description} speed={8} onComplete={handleFinalComplete} /> : null}
        </div>
      </div>

      <div className="mt-auto">
        <div className={`transition-all duration-500 overflow-hidden ${isHovered ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <LogTerminal logs={project.logs} active={isHovered} />
        </div>
        {!isHovered && phase >= 3 && (
          <div className="flex flex-wrap gap-2 py-2">
            {project.tools.map((tool: string) => (
              <span key={tool} className="text-[9px] font-bold bg-gray-100 dark:bg-gray-800/50 text-gray-500 px-2 py-1 rounded border uppercase">#{tool}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

// --- 4. REPOSITORY PRINCIPALE ---
const TestRepository: React.FC<TestRepositoryProps> = ({ lang }) => {
  const t = translations[lang].experience;
  const currentExperiences = (projectsData as any)[lang];
  const sectionRef = useRef<HTMLElement>(null);
  
  const [heroFinished, setHeroFinished] = useState(false);
  const [hasScrolledIn, setHasScrolledIn] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(-1);
  const [typingSubtitle, setTypingSubtitle] = useState(false);
  const [isPronto, setIsPronto] = useState(false);

  // Reset al cambio lingua
  useEffect(() => {
    setActiveCardIndex(-1);
    setTypingSubtitle(false);
    setIsPronto(false);
  }, [lang]);

  useEffect(() => {
    const handleHero = () => setHeroFinished(true);
    window.addEventListener('hero-animations-complete', handleHero);
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHasScrolledIn(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      window.removeEventListener('hero-animations-complete', handleHero);
      observer.disconnect();
    };
  }, []);

  // Avvio sequenza sottotitolo
  useEffect(() => {
    if (heroFinished && hasScrolledIn && activeCardIndex === -1 && !typingSubtitle) {
      setTypingSubtitle(true);
    }
  }, [heroFinished, hasScrolledIn, activeCardIndex, typingSubtitle]);

  return (
    <section ref={sectionRef} className="w-full py-24 bg-white dark:bg-gray-900 font-mono">
      <div className={`w-[92%] max-w-7xl mx-auto transition-opacity duration-1000 ${heroFinished && hasScrolledIn ? 'opacity-100' : 'opacity-0'}`}>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="border-l-8 border-blue-600 pl-8">
            <h2 className="text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic italic">./{t.sectionTitle}</h2>
            <div className="mt-3 min-h-[24px] text-sm text-gray-500 font-bold uppercase tracking-[0.3em]">
              {!isPronto ? (
                typingSubtitle && (
                  <div className="flex items-center">
                    <TypewriterText text={t.sectionSub.split('...')[0]} onComplete={() => setTimeout(() => setActiveCardIndex(0), 1000)} />
                    <span className="animate-pulse ml-1">...</span>
                  </div>
                )
              ) : (
                <div className="text-blue-600 animate-in fade-in">
                  background_professionale.sh <span className="text-green-500 font-black">{lang === 'it' ? 'CARICATO' : 'LOADED'}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 rounded text-right">
            <p className="text-[10px] text-gray-400 font-bold uppercase">{t.snapshotTitle}</p>
            <p className="text-xs text-blue-600 font-black">{t.snapshotEntries}: 0{currentExperiences.length}</p>
            <p className="text-xs text-green-500 font-black">{t.snapshotStatus}: {t.snapshotSynced}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {currentExperiences.map((project: any, index: number) => (
            <TestCard 
              key={`${lang}-${project.id}`} 
              project={project} 
              t={t} 
              isActive={index === activeCardIndex}
              isVisible={index <= activeCardIndex && activeCardIndex !== -1}
              onAllTextComplete={() => {
                if (index < currentExperiences.length - 1) {
                  setActiveCardIndex(index + 1);
                } else {
                  setIsPronto(true);
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestRepository;