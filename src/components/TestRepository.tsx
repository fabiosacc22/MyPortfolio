import React, { useState } from 'react';
import { projectsData, type ProjectLog } from '../data/experiences'; // Importa i dati e l'interfaccia

const TestCard = ({ project }: { project: ProjectLog }) => {
  const [showLogs, setShowLogs] = useState(false);

  return (
    <div 
      onClick={() => setShowLogs(!showLogs)}
      className="group relative bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 p-6 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-all cursor-pointer hover:shadow-xl overflow-hidden font-mono"
    >
      {/* Header, Titolo e Metadati rimangono invariati... */}
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
          {project.id}
        </span>
        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
          project.status === 'PASSED' 
            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
            : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
        }`}>
          [{showLogs ? 'RUNNING' : project.status}]
        </span>
      </div>

      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 uppercase truncate">
        {project.title}
      </h3>
      
      {showLogs ? (
        <div className="mb-6 p-3 bg-black rounded border border-gray-700 text-[10px] leading-relaxed">
          <div className="flex gap-1 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500/40"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/40"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/40"></div>
          </div>
          {project.logs.map((log, i) => (
            <p key={i} className="text-gray-400 animate-log opacity-0 fill-mode-forwards" style={{ animationDelay: `${i * 0.15}s` }}>
              <span className="text-green-500">➜</span> {log}
            </p>
          ))}
          <p className="text-blue-400 mt-2 font-bold animate-pulse" style={{ animationDelay: `${project.logs.length * 0.15}s` }}>
            _ EXECUTION_COMPLETE
          </p>
        </div>
      ) : (
        <>
          <p className="text-xs text-gray-500 mb-4 italic">
            {project.type} • {project.date}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
            {project.description}
          </p>
        </>
      )}

      {/* Tools e Hover Effect... */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tools.map((tool) => (
          <span key={tool} className="text-[10px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-2 py-1 text-gray-500 dark:text-gray-400 rounded">
            #{tool}
          </span>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-600 transition-all group-hover:w-full rounded-b-lg"></div>
    </div>
  );
};

const TestRepository: React.FC = () => {
  return (
    <section className="w-full py-20 bg-white dark:bg-gray-900 transition-colors duration-300 font-mono">
      <div className="w-[92%] max-w-7xl mx-auto">
        <div className="mb-12 border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
            ./work_experiences.log
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project) => (
            <TestCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestRepository;