import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle'; // Assicurati che il percorso sia corretto
import { useEffect } from 'react';

const Header: React.FC = () => {
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
    
    {/* LOGO - Resta a sinistra */}
    <div className="flex items-center z-20">
      <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-white whitespace-nowrap font-mono">
        {displayText}
        <span className="animate-blink ml-1 inline-block w-[2px] h-5 bg-black dark:bg-white align-middle"></span>
      </span>
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