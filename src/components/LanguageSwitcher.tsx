import React from 'react';

interface LanguageSwitcherProps {
  lang: 'it' | 'en';
  setLang: (lang: 'it' | 'en') => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ lang, setLang }) => {
  return (
    <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-[10px]">
      <button 
        onClick={() => setLang('it')}
        className={`px-2 py-1 rounded transition-all ${
          lang === 'it' 
            ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm font-bold' 
            : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
      >
        IT
      </button>
      <button 
        onClick={() => setLang('en')}
        className={`px-2 py-1 rounded transition-all ${
          lang === 'en' 
            ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm font-bold' 
            : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;