import React, { useState } from 'react';
import { projectsData } from '../data/experiences';
import { translations } from '../data/translations';

// Interfaccia per le Props del repository
interface TestRepositoryProps {
  lang: 'it' | 'en';
}

// Interfaccia per le Props della singola Card
interface TestCardProps {
  project: any; 
  t: any; // Traduzioni specifiche per la sezione experience
}

const TestCard: React.FC<TestCardProps> = ({ project, t }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-xl transition-all duration-300 hover:border-blue-500 hover:shadow-2xl font-mono flex flex-col min-h-[520px]"
    >
      {/* 1. HEADER: ID & SYSTEM STATUS */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 tracking-tighter">
            REF_ID: {project.id}
          </span>
        </div>
        <div className={`text-[10px] font-black px-2 py-1 rounded border ${
          project.status === 'PASSED' 
          ? 'border-green-500/50 text-green-600 bg-green-50 dark:bg-green-900/20' 
          : 'border-blue-500/50 text-blue-600 bg-blue-50 dark:bg-blue-900/20'
        }`}>
          {isHovered ? t.runningMsg : `${t.statusLabel}: ${project.status}`}
        </div>
      </div>

      {/* 2. TITOLO (RUOLO) */}
      <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-8 leading-tight group-hover:text-blue-600 transition-colors">
        {project.title}
      </h3>

      {/* 3. INFO GRID: COMPANY, ACTIVITY, PERIOD */}
      <div className="space-y-4 mb-8">
        {/* Azienda */}
        <div className="flex flex-col border-l-2 border-blue-600 pl-4 bg-gray-50 dark:bg-gray-800/30 py-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            {t.employer}
          </span>
          <span className="text-sm font-black text-gray-800 dark:text-gray-100 uppercase">
            {project.company}
          </span>
        </div>

        {/* Attività */}
        <div className="flex flex-col border-l-2 border-gray-200 dark:border-gray-700 pl-4 py-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            {t.activity}
          </span>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
            {project.type}
          </span>
        </div>

        {/* Periodo */}
        <div className="flex flex-col border-l-2 border-gray-200 dark:border-gray-700 pl-4 py-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            {t.period}
          </span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 italic">
            {project.date}
          </span>
        </div>
      </div>
      
      {/* 4. DESCRIPTION (EXECUTIVE SUMMARY) */}
      <div className="mb-8">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3 border-b border-gray-100 dark:border-gray-800 pb-1 text-center">
          {t.summary}
        </span>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
          {project.description}
        </p>
      </div>

      {/* 5. FOOTER: DYNAMIC LOGS OR TOOLS */}
      <div className="mt-auto">
        <div className={`transition-all duration-500 overflow-hidden rounded-lg bg-gray-950 border border-gray-800 ${
          isHovered ? 'max-h-48 opacity-100 p-4 shadow-inner' : 'max-h-0 opacity-0'
        }`}>
          <div className="flex justify-between items-center mb-3 opacity-50">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            </div>
            <span className="text-[8px] text-gray-500">{t.consoleHeader}</span>
          </div>
          <div className="space-y-1.5">
            {project.logs.map((log: string, i: number) => (
              <p key={i} className="text-[10px] text-gray-400 font-mono flex gap-2">
                <span className="text-blue-500 font-bold tracking-tighter">[{i}]</span> {log}
              </p>
            ))}
          </div>
        </div>

        {!isHovered && (
          <div className="flex flex-wrap gap-2 animate-fadeIn py-2">
            {project.tools.map((tool: string) => (
              <span key={tool} className="text-[9px] font-bold bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-1 rounded border border-gray-200 dark:border-gray-700 uppercase tracking-tighter group-hover:border-blue-500/30 transition-colors">
                #{tool}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Hover visual accent */}
      <div className="absolute top-0 right-0 w-1 h-0 bg-blue-600 transition-all duration-500 group-hover:h-full rounded-tr-xl"></div>
    </div>
  );
};

const TestRepository: React.FC<TestRepositoryProps> = ({ lang }) => {
  // Carichiamo le traduzioni della sezione e l'array di dati corretto
  const t = translations[lang].experience;
  const currentExperiences = (projectsData as any)[lang]; 

  return (
    <section className="w-full py-24 bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300 font-mono relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:30px_30px]"></div>

      <div className="w-[92%] max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="border-l-8 border-blue-600 pl-8">
            <h2 className="text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
              ./{t.sectionTitle}
            </h2>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-[0.3em] mt-3">
              {t.sectionSub}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded shadow-sm text-right">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">System_Snapshot</p>
            <p className="text-xs text-blue-600 font-black">ENTRIES: 0{currentExperiences.length}</p>
            <p className="text-xs text-green-500 font-black">DB_STATUS: SYNCED</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {currentExperiences.map((project: any) => (
            <TestCard key={project.id} project={project} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestRepository;