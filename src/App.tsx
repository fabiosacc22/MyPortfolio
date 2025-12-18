import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa il routing
import Header from './components/Header';
import Hero from './components/Hero';
import TestRepository from './components/TestRepository';
import Footer from './components/Footer';
import Curriculum from './components/Curriculum'; // Importa il nuovo componente
import MouseTorch from './components/MouseTorch';
import { Analytics } from '@vercel/analytics/react';

const App: React.FC = () => {
  const [lang, setLang] = useState<'it' | 'en'>('it'); // Impostato default it per coerenza

  return (
    <BrowserRouter>
      <Routes>
        {/* ROTTA HOME: Contiene tutto il tuo portfolio attuale */}
        <Route 
          path="/" 
          element={
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
              <main>
                <MouseTorch />
                <Header lang={lang} setLang={setLang} />
                <Hero lang={lang} setLang={setLang} /> 
                <TestRepository lang={lang} />
              </main>
              <Footer />
              <Analytics />
            </div>
          } 
        />

        {/* ROTTA CV: Carica solo la pagina del curriculum */}
        <Route path="/cv/:lang" element={<Curriculum />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;