import React, { useState } from 'react';
import { siteConfig } from '../data/config';
import { translations } from '../data/translations';

interface ContactProps { lang: 'it' | 'en'; }

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const t = translations[lang].contact;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const primary = 'px-6 py-3 rounded-lg font-bold uppercase text-xs transition-all hover:-translate-y-0.5';

  return (
    <section id="contact" className="w-full py-24 bg-white dark:bg-gray-900 font-mono">
      <div className="w-[92%] max-w-4xl mx-auto">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/40 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-200 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-900/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest ml-2">./contact.sh</span>
          </div>

          <div className="p-8 md:p-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic border-l-8 border-blue-600 pl-6">
              ./{t.sectionTitle}
            </h2>
            <p className="mt-6 text-sm text-blue-600 dark:text-blue-400 font-bold uppercase tracking-[0.2em]">{t.sub}</p>
            <p className="mt-4 text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">{t.intro}</p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href={`mailto:${siteConfig.email}`}
                 className={`${primary} bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30`}>
                {t.emailCta}
              </a>
              <a href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer"
                 className={`${primary} border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400`}>
                {t.linkedinCta}
              </a>
              <a href={siteConfig.socials.github} target="_blank" rel="noreferrer"
                 className={`${primary} border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400`}>
                {t.githubCta}
              </a>
              <a href={`/cv/${lang}`} target="_blank" rel="noreferrer"
                 className={`${primary} border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400`}>
                {t.cvCta}
              </a>
            </div>

            <div className="mt-8 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="text-blue-600 dark:text-blue-400">➜</span>
              <span>{siteConfig.email}</span>
              <button onClick={handleCopy} className="underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t.copy}
              </button>
              {copied && <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded animate-pulse">{t.copied}</span>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
