import React from 'react';

interface LanguageSwitcherProps {
  lang: 'it' | 'en';
  setLang: (lang: 'it' | 'en') => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ lang, setLang }) => {
  return (
    <div className="fixed top-6 right-20 z-50 font-mono text-[10px] flex gap-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur p-1 border border-gray-200 dark:border-gray-800 rounded shadow-sm">
      <button 
        onClick={() => setLang('it')}
        className={`px-2 py-1 rounded ${lang === 'it' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
      >
        IT
      </button>
      <button 
        onClick={() => setLang('en')}
        className={`px-2 py-1 rounded ${lang === 'en' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;