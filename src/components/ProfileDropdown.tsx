import React, { useState } from 'react';
import { translations } from '../data/translations';

// Definizione dell'interfaccia con children inclusi
interface ProfileDropdownProps {
  lang: 'it' | 'en';
  children: React.ReactNode;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ lang, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Recupero traduzioni (assicurati di avere la chiave profileDropdown in translations.ts)
  const t = translations[lang].profileDropdown;

// Dati strutturati per la visualizzazione JSON
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
      // Supporto per il tocco su dispositivi mobile
      onClick={() => setIsOpen(!isOpen)} 
    >
      {/* Rende il Logo o il testo passato come children */}
      <div className="relative z-10">
        {children}
      </div>

      {/* DROPDOWN IN STILE JSON CODE EDITOR */}
      <div className={`absolute top-full left-0 mt-4 w-72 transition-all duration-300 z-[100] ${
        isOpen 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
      }`}>
        <div className="bg-gray-900 border-2 border-gray-800 rounded shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] p-5 font-mono text-[10px] text-left">
          
          {/* HEADER DELLA FINESTRA DEL CODICE */}
          <div className="flex items-center gap-2 mb-4 border-b border-gray-700/50 pb-2">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            </div>
            <span className="text-gray-500 font-bold ml-2">inspect_identity.json</span>
          </div>

          {/* RENDERING DEL JSON CON SYNTAX HIGHLIGHTING */}
          <div className="text-gray-300 leading-relaxed">
            <span className="text-yellow-400">{"{"}</span>
            <div className="pl-4">
              {Object.entries(userData).map(([key, value], index, array) => (
                <div key={key}>
                  <span className="text-purple-400">"{key}"</span>:{" "}
                  {Array.isArray(value) ? (
                    <>
                      <span className="text-blue-400">{"["}</span>
                      <span className="text-green-400">
                        "{value.join('", "')}"
                      </span>
                      <span className="text-blue-400">{"]"}</span>
                    </>
                  ) : (
                    <span className={typeof value === 'number' ? 'text-orange-400' : 'text-green-400'}>
                      {typeof value === 'number' ? value : `"${value}"`}
                    </span>
                  )}
                  {index < array.length - 1 && <span className="text-white">,</span>}
                </div>
              ))}
            </div>
            <span className="text-yellow-400">{"}"}</span>
          </div>

          {/* FOOTER IN STILE TERMINALE */}
          <div className="mt-4 pt-2 border-t border-gray-800 flex justify-between items-center text-[8px] text-gray-500 uppercase">
            <div className="flex items-center gap-1">
              <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
              <span>Auth_Level: Admin</span>
            </div>
            <span className="text-blue-600 font-black">GET 200 OK</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;