import React from 'react';
import { useParams } from 'react-router-dom';
import { translations } from '../data/translations';

const Curriculum: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = (lang === 'en' || lang === 'it') ? lang : 'it';
  const t = translations[currentLang].cv;

  const handlePrint = () => window.print();

  return (
    <div className="bg-gray-950 text-gray-300 p-4 md:p-10 font-mono min-h-screen">
      <style>{`@media print { .no-print { display: none !important; } body { background-color: #030712 !important; -webkit-print-color-adjust: exact; } }`}</style>

      {/* HEADER */}
      <div className="max-w-4xl mx-auto border border-gray-800 rounded-t-lg bg-gray-900 px-4 py-2 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-[10px] text-gray-500 font-bold uppercase italic">{t.terminalHeader}</div>
        <div className="w-10"></div>
      </div>

      <div className="max-w-4xl mx-auto border-x border-b border-gray-800 bg-gray-950/50 p-6 md:p-12 shadow-2xl relative">
        {/* INFO PERSONALI */}
        <section className="mb-12 border-b border-gray-800 pb-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-blue-600 p-1 overflow-hidden bg-gray-800">
              <img src="/profileImage.jpeg" alt="Fabio Saccone" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Fabio Antonio Saccone</h1>
              <p className="text-blue-500 font-bold text-sm uppercase tracking-widest">Software QA Tester Specialist</p>
            </div>
          </div>
          <div className="text-[11px] font-bold space-y-1 text-right">
            <p><span className="text-gray-600">EMAIL:</span> <span className="text-blue-400">fabiosaccone95@gmail.com</span></p>
            <p><span className="text-gray-600">{t.phoneLabel}</span> <span className="text-blue-400">{t.phoneValue}</span></p>
            <p><span className="text-gray-600 uppercase">{t.statusLabel}</span> <span className="text-green-500">{t.statusValue}</span></p>
          </div>
        </section>
        {/* COMPETENZE TECNICHE */}
<section className="mb-12">
  <h2 className="text-xs font-bold text-gray-600 mb-6 tracking-[0.3em] uppercase italic border-l-4 border-blue-600 pl-4">
    {t.techSkillsTitle}
  </h2>
  <div className="flex flex-wrap gap-2 pl-4">
    {t.skills.map((skill: string) => (
      <span key={skill} className="px-2 py-1 bg-gray-900 border border-gray-800 rounded text-[10px] font-bold text-blue-400 uppercase">
        {skill}
      </span>
    ))}
  </div>
</section>

        {/* ESPERIENZE CICLATE DALLE TRADUZIONI */}
        <section className="mb-12">
          <h2 className="text-xs font-bold text-gray-600 mb-8 tracking-widest uppercase italic border-l-4 border-blue-600 pl-4">{t.expLogTitle}</h2>
          <div className="pl-4 space-y-10 border-l border-gray-800">
            {t.experiences.map((exp: any, idx: number) => (
              <div key={idx} className="relative pl-8">
                <div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${idx === 0 ? 'bg-blue-600 shadow-[0_0_8px_#2563eb]' : 'bg-gray-700'}`}></div>
                <div className="flex justify-between mb-1">
                  <h3 className="text-lg font-bold text-white uppercase">{exp.role}</h3>
                  <span className="text-[10px] text-green-500 font-black">{exp.period}</span>
                </div>
                <p className="text-blue-500 text-xs font-bold mb-3 italic">{exp.company}</p>
                <div className="text-[11px] text-gray-400 space-y-2">
                  {exp.details.map((det: any, i: number) => (
                    <p key={i}><span className="text-gray-300 font-bold">{det.label}</span> {det.text}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <p className="text-[8px] text-gray-600 italic mt-10 border-t border-gray-800 pt-6 text-center">{t.privacy}</p>
      </div>

      {/* BOTTONE STAMPA */}
      <div className="max-w-4xl mx-auto mt-6 no-print flex justify-end">
        <button onClick={handlePrint} className="px-10 py-4 bg-white text-black font-black text-xs uppercase hover:bg-blue-600 hover:text-white transition-all">
          {t.generateBtn}
        </button>
      </div>
    </div>
  );
};

export default Curriculum;