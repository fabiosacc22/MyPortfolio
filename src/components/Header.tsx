import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle'; 
import ProfileDropdown from './ProfileDropdown';
import LanguageSwitcher from './LanguageSwitcher';

// 1. Definiamo l'interfaccia includendo setLang
interface HeaderProps {
  lang: 'it' | 'en';
  setLang: (lang: 'it' | 'en') => void; // <--- AGGIUNTO
}

// 2. Aggiungiamo lang e setLang alle props del componente
const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
 
  
  // --- LOGICA TYPING ---
  const fullText = "<fabio.saccone>";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayText(""); // Reset all'avvio
    
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); // Velocità di scrittura (100ms a lettera)

    return () => clearInterval(typingInterval);
  }, []);
  // ---------------------

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 w-full sticky top-0 z-50 h-20 transition-colors duration-300">
      <div className="w-[92%] max-w-7xl mx-auto h-full flex items-center justify-between relative">
        
        {/* SINISTRA - Logo con ProfileDropdown */}
        <div className="flex items-center z-50">
          <ProfileDropdown lang={lang}>
            <div className="flex items-center cursor-pointer group">
              <div className="mr-3 w-8 h-8 bg-gray-900 dark:bg-white flex items-center justify-center rounded shadow-[2px_2px_0px_0px_rgba(59,130,246,1)]">
                <span className="text-white dark:text-black font-black text-xs">JS</span>
              </div>
              
              <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-white whitespace-nowrap font-mono group-hover:text-blue-600 transition-colors">
                {displayText}
                <span className="animate-blink ml-1 inline-block w-[2px] h-5 bg-black dark:bg-white align-middle"></span>
              </span>
            </div>
          </ProfileDropdown>
        </div>

        {/* DESTRA - Switcher + ThemeToggle */}
        <div className="flex items-center gap-4">
          {/* Ora setLang è disponibile e può essere passato */}
          <LanguageSwitcher lang={lang} setLang={setLang} />
          
          <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-800 mx-1"></div>
          
          <div className="z-20">
            <ThemeToggle />
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;