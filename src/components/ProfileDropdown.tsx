import React, { useState } from 'react';
import { translations } from '../data/translations';

interface ProfileDropdownProps {
  lang: 'it' | 'en';
  children: React.ReactNode;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ lang, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[lang].profileDropdown;

  const userData = lang === 'en' ? {
    "age": t.age,
    "location": t.location,
    "system_status": t.status,
    "interest_tags": t.hobbies,
    "active_field": t.current_focus
  } : {
    "età": t.age,
    "residenza": t.location,
    "stato": t.status,
    "interessi": t.hobbies,
    "attività": t.current_focus
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)} 
    >
      <div className="relative z-10">
        {children}
      </div>

      <div className={`absolute top-full left-0 mt-4 w-72 transition-all duration-300 z-[100] ${
        isOpen 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
      }`}>
        {/* LOGICA INVERTITA: 
            LIGHT MODE -> Sfondo scuro (Gray-900)
            DARK MODE  -> Sfondo chiaro/vetro (Gray-50 o White)
        */}
        <div className="font-mono text-[10px] text-left p-5 rounded border-2 transition-colors duration-300
          bg-gray-900 border-gray-800 text-gray-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)]
          dark:bg-gray-50 dark:border-gray-200 dark:text-gray-800 dark:shadow-[8px_8px_0px_0px_rgba(59,130,246,0.1)]">
          
          {/* HEADER DELLA FINESTRA */}
          <div className="flex items-center gap-2 mb-4 border-b pb-2 border-gray-800 dark:border-gray-200">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            </div>
            <span className="font-bold ml-2 text-gray-500 dark:text-gray-400">inspect_identity.json</span>
          </div>

          {/* RENDERING JSON CON COLORI INVERTITI */}
          <div className="leading-relaxed">
            <span className="text-yellow-400 dark:text-yellow-600 font-bold">{"{"}</span>
            <div className="pl-4">
              {Object.entries(userData).map(([key, value], index, array) => (
                <div key={key}>
                  {/* Chiavi JSON: Viola su scuro, Indaco su chiaro */}
                  <span className="text-purple-400 dark:text-indigo-600">"{key}"</span>:{" "}
                  
                  {Array.isArray(value) ? (
                    <>
                      <span className="text-blue-400 dark:text-blue-600">{"["}</span>
                      <span className="text-green-400 dark:text-green-600 font-medium">
                        "{value.join('", "')}"
                      </span>
                      <span className="text-blue-400 dark:text-blue-600">{"]"}</span>
                    </>
                  ) : (
                    <span className={`font-medium ${
                      typeof value === 'number' 
                        ? 'text-orange-400 dark:text-orange-600' 
                        : 'text-green-400 dark:text-green-700'
                    }`}>
                      {typeof value === 'number' ? value : `"${value}"`}
                    </span>
                  )}
                  {index < array.length - 1 && <span className="opacity-50">,</span>}
                </div>
              ))}
            </div>
            <span className="text-yellow-400 dark:text-yellow-600 font-bold">{"}"}</span>
          </div>

          {/* FOOTER */}
          <div className="mt-4 pt-2 border-t flex justify-between items-center text-[8px] uppercase tracking-widest
            border-gray-800 dark:border-gray-200 text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
              <span>Auth_Level: Admin</span>
            </div>
            <span className="text-blue-500 dark:text-blue-600 font-black">GET 200 OK</span>
          </div>
        </div>
      </div>
    </div>
  );

};

export default ProfileDropdown;