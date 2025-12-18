import React, { useState, useEffect } from 'react';

const MouseTorch: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [opacity, setOpacity] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Controlliamo se la modalità dark è attiva all'avvio e ogni volta che cambia
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    // Observer per reagire al cambio tema senza ricaricare la pagina
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const handleMouseMove = (e: MouseEvent) => {
      setOpacity(1);
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => setOpacity(0);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  // Se non siamo in dark mode, non renderizziamo nulla per ottimizzare le performance
  if (!isDarkMode) return null;

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-500"
      style={{
        background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(253, 224, 71, 0.15), rgba(251, 191, 36, 0.05) 40%, transparent 80%)`,
        opacity: opacity // Ora questo valore viene applicato solo se isDarkMode è true
      }}
    />
  );
};

export default MouseTorch;