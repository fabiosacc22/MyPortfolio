import React, { useState, useEffect, useRef, memo, useSyncExternalStore } from 'react';
import { projectsData, type ProjectLog } from '../data/experiences';
import { translations } from '../data/translations';

interface TestRepositoryProps { lang: 'it' | 'en'; }

// Schermi stretti (mobile): le card diventano un carosello a scorrimento laterale
const MOBILE_QUERY = '(max-width: 767px)';
const subscribeMobile = (cb: () => void) => {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const useIsMobile = () => useSyncExternalStore(subscribeMobile, () => window.matchMedia(MOBILE_QUERY).matches);

// --- 1. COMPONENTE TYPEWRITER BLINDATO ---
const TypewriterText = memo(({ text, speed = 15, onComplete }: { text: string; speed?: number; onComplete?: () => void }) => {
  // Il progresso è legato al testo: cambiando testo (es. cambio lingua) riparte da zero
  const [progress, setProgress] = useState({ text: '', count: 0 });
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    if (!text) return;
    let count = 0;
    const timer = setInterval(() => {
      count += 1;
      setProgress({ text, count });
      if (count >= text.length) {
        clearInterval(timer);
        onCompleteRef.current?.();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  const count = progress.text === text ? progress.count : 0;
  return <>{text.slice(0, count)}</>;
});

// --- 2. GESTORE LOG ---
const LogTerminal = memo(({ logs, active }: { logs: string[]; active: boolean }) => {
  const [currentLine, setCurrentLine] = useState(0);
  // Dopo il primo typing completo i log vengono mostrati subito, senza ripetere l'effetto
  const [played, setPlayed] = useState(false);
  const [prevActive, setPrevActive] = useState(active);
  if (prevActive !== active) {
    setPrevActive(active);
    if (!active) setCurrentLine(0);
  }

  return (
    <div className="space-y-1.5 p-4 bg-gray-950 rounded-lg border border-gray-800">
      {logs.map((log, i) => (
        <p key={i} className={`text-[10px] font-mono flex gap-2 ${played || i <= currentLine ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-blue-500 font-bold">[{i}]</span>
          <span className="text-gray-400">
            {played ? log : i === currentLine && active ? (
              <TypewriterText text={log} speed={10} onComplete={() => {
                if (i < logs.length - 1) setCurrentLine(prev => prev + 1);
                else setPlayed(true);
              }} />
            ) : i < currentLine ? log : null}
          </span>
        </p>
      ))}
    </div>
  );
});

// --- 2b. CONTATORE ANIMATO ---
// Sale da 0 a target in modo graduale quando `start` diventa true; riparte se cambia il target
const useCountUp = (target: number, start: boolean, stepMs = 220) => {
  const [state, setState] = useState({ target, value: 0 });

  useEffect(() => {
    if (!start) return;
    let value = 0;
    const timer = setInterval(() => {
      value += 1;
      setState({ target, value });
      if (value >= target) clearInterval(timer);
    }, stepMs);
    return () => clearInterval(timer);
  }, [target, start, stepMs]);

  return start && state.target === target ? state.value : 0;
};

// --- 3. COMPONENTE CARD ---
interface TestCardProps {
  project: ProjectLog;
  t: Record<string, string>;
  isActive: boolean;
  isVisible: boolean;
  onAllTextComplete: () => void;
}

const TestCard = memo(({ project, t, isActive, isVisible, onAllTextComplete }: TestCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [phase, setPhase] = useState(0); 
  const isCompleteRef = useRef(false);

  if (isActive && phase === 0) setPhase(1);
  if (!isVisible && phase !== 0) setPhase(0);

  useEffect(() => {
    if (!isVisible) isCompleteRef.current = false;
  }, [isVisible]);

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
      className={`group relative overflow-hidden p-8 rounded-2xl transition-all duration-700 font-mono flex flex-col min-h-[480px]
        bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/50 hover:-translate-y-1
        dark:bg-gray-800/40 dark:border-gray-700/50 dark:hover:border-blue-500/50
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex justify-between items-center mb-8 gap-3">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-blue-600 animate-pulse' : 'bg-gray-400'}`} />
          <span className="text-[10px] font-black text-blue-600 dark:text-blue-400">REF_ID: {isVisible && project.id}</span>
        </div>
        {phase >= 1 && (
          <div className="flex items-center gap-2 animate-fadeIn">
            <span className="hidden sm:inline text-[10px] text-gray-400 font-bold uppercase">{project.date}</span>
            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${project.status === 'RUNNING'
              ? 'text-green-600 dark:text-green-400 border-green-500/40 bg-green-500/10'
              : 'text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600'}`}>
              {project.status === 'RUNNING' && <span className="inline-block w-1.5 h-1.5 mr-1 rounded-full bg-green-500 animate-pulse" />}
              {project.status}
            </span>
          </div>
        )}
      </div>

      <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase mb-8 h-14">
        {phase >= 1 ? <TypewriterText text={project.title} speed={20} onComplete={() => handlePhaseComplete(2)} /> : null}
      </h3>

      <div className="space-y-4 mb-8">
        <div className="flex flex-col border-l-2 border-blue-600 pl-4 bg-gray-50 dark:bg-gray-700/30 py-2 rounded-r-lg">
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
              <span key={tool} className="text-[9px] font-bold bg-gray-100 dark:bg-gray-800/50 text-gray-500 px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700 uppercase">#{tool}</span>
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
  const currentExperiences = projectsData[lang];
  const sectionRef = useRef<HTMLElement>(null);
  
  const [heroFinished, setHeroFinished] = useState(false);
  const [hasScrolledIn, setHasScrolledIn] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(-1);
  const [isPronto, setIsPronto] = useState(false);

  // Carosello (solo mobile): card già mostrate all'utente e slide corrente
  const isMobile = useIsMobile();
  const carouselRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(new Set<string>());
  const [seen, setSeen] = useState<Set<number>>(new Set());
  const [currentSlide, setCurrentSlide] = useState(0);

  // Reset al cambio lingua
  const [prevLang, setPrevLang] = useState(lang);
  if (prevLang !== lang) {
    setPrevLang(lang);
    setActiveCardIndex(-1);
    setIsPronto(false);
    setSeen(new Set());
    setCurrentSlide(0);
  }

  // Avvio sequenza sottotitolo
  const typingSubtitle = heroFinished && hasScrolledIn;

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

  // Su mobile ogni card si "scrive" quando entra nel carosello (almeno il 60% visibile)
  useEffect(() => {
    const el = carouselRef.current;
    if (!isMobile || !el) return;
    const observer = new IntersectionObserver(entries => {
      const entered = entries.filter(e => e.isIntersecting).map(e => Number((e.target as HTMLElement).dataset.index));
      if (entered.length) setSeen(prev => new Set([...prev, ...entered]));
    }, { root: el, threshold: 0.6 });
    Array.from(el.children).forEach(child => observer.observe(child));
    return () => observer.disconnect();
  }, [isMobile, lang, currentExperiences.length]);

  const handleCarouselScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const first = el.children[0] as HTMLElement | undefined;
    if (!first) return;
    const step = first.offsetWidth + 16;
    setCurrentSlide(Math.min(Math.max(Math.round(el.scrollLeft / step), 0), currentExperiences.length - 1));
  };

  const goToSlide = (index: number) => {
    const el = carouselRef.current;
    const target = el?.children[index] as HTMLElement | undefined;
    if (el && target) el.scrollTo({ left: target.offsetLeft - el.offsetLeft - (el.clientWidth - target.offsetWidth) / 2, behavior: 'smooth' });
  };

  const handleCardComplete = (index: number) => {
    if (isMobile) {
      completedRef.current.add(`${lang}-${index}`);
      const done = currentExperiences.filter((_, i) => completedRef.current.has(`${lang}-${i}`)).length;
      if (done === currentExperiences.length) setIsPronto(true);
    } else if (index < currentExperiences.length - 1) {
      setActiveCardIndex(index + 1);
    } else {
      setIsPronto(true);
    }
  };

  const snapshotVisible = heroFinished && hasScrolledIn;
  const entriesCount = useCountUp(currentExperiences.length, snapshotVisible);
  const isSynced = entriesCount >= currentExperiences.length;
  const syncPercent = Math.round((entriesCount / currentExperiences.length) * 100);

  return (
    <section id="experience" ref={sectionRef} className="w-full py-24 bg-white dark:bg-gray-900 font-mono">
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
          
          <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm text-right">
            <p className="text-[10px] text-gray-400 font-bold uppercase">{t.snapshotTitle}</p>
            <p className="text-xs text-blue-600 font-black">{t.snapshotEntries}: {String(entriesCount).padStart(2, '0')}</p>
            <p className={`text-xs font-black ${isSynced ? 'text-green-500' : 'text-yellow-500'}`}>
              {t.snapshotStatus}: {isSynced ? t.snapshotSynced : `${t.snapshotSyncing} ${syncPercent}%`}
              {!isSynced && <span className="animate-pulse">...</span>}
            </p>
          </div>
        </div>

        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-10 md:overflow-visible md:pb-0"
        >
          {currentExperiences.map((project, index) => (
            <div key={`${lang}-${project.id}`} data-index={index} className="w-[88%] shrink-0 snap-center md:w-auto md:shrink">
              <TestCard
                project={project}
                t={t}
                isActive={isMobile ? activeCardIndex >= 0 && seen.has(index) : index === activeCardIndex}
                isVisible={isMobile ? true : index <= activeCardIndex && activeCardIndex !== -1}
                onAllTextComplete={() => handleCardComplete(index)}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-2 md:hidden" role="tablist" aria-label="Carousel">
          {currentExperiences.map((project, index) => (
            <button
              key={project.id}
              role="tab"
              aria-selected={index === currentSlide}
              aria-label={`${index + 1} / ${currentExperiences.length}`}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-6 bg-blue-600' : 'w-2 bg-gray-300 dark:bg-gray-600'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestRepository;