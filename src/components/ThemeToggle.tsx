import React, { useEffect, useState } from 'react';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(
    () => localStorage.getItem('theme') === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-lg transition-all duration-300 group relative"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        /* LAMPADINA ACCESA (Tema Dark) */
        <div className="relative">
          {/* Effetto bagliore dietro la lampadina */}
          <div className="absolute inset-0 bg-yellow-400 blur-md opacity-40 rounded-full"></div>
          <svg 
            className="w-7 h-7 text-yellow-400 relative z-10" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 017 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1zM9 19h6v1H9v-1zm1 2h4v1h-4v-1z" />
          </svg>
        </div>
      ) : (
        /* LAMPADINA SPENTA (Tema Light) */
        <svg 
          className="w-7 h-7 text-gray-400 group-hover:text-gray-600 transition-colors" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 017 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1zM9 19h6v1H9v-1zm1 2h4v1h-4v-1z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;