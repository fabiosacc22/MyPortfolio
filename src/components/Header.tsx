import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle'; 
import { useEffect } from 'react';
import ProfileDropdown from './ProfileDropdown';

// 1. Definiamo l'interfaccia per ricevere la lingua
interface HeaderProps {
  lang: 'it' | 'en';
}

// 2. Aggiungiamo { lang } alle props del componente
const Header: React.FC<HeaderProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  
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
        
        {/* LOGO - Resta a sinistra con ProfileDropdown integrato */}
        <div className="flex items-center z-50">
          {/* Ora 'lang' è correttamente definita e passata */}
          <ProfileDropdown lang={lang}>
            <div className="flex items-center cursor-pointer group">
              {/* Icona quadrata opzionale (stile cartella o file) */}
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

        {/* DESTRA - Solo il ThemeToggle */}
        <div className="z-20">
          <ThemeToggle />
        </div>

      </div>
    </header>
  );
};

export default Header;