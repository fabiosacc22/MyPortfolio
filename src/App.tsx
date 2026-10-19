import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import TestRepository from './components/TestRepository';
import Footer from './components/Footer';
import Curriculum from './components/Curriculum';
import MouseTorch from './components/MouseTorch';
import TestInAction from './components/TestInAction';
import Contact from './components/Contact';
import CommandPalette from './components/CommandPalette';
import BugEasterEgg from './components/BugEasterEgg';
import Reveal from './components/Reveal';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import { Analytics } from '@vercel/analytics/react';

type Lang = 'it' | 'en';

const LANG_KEY = 'lang';

const getInitialLang = (): Lang => {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'it' || saved === 'en') return saved;
  } catch { /* storage non disponibile */ }
  return 'it';
};

const App = () => {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  // Mantiene la lingua dopo il refresh e la riflette sull'attributo lang del documento
  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem(LANG_KEY, lang); } catch { /* storage non disponibile */ }
  }, [lang]);

  // Segnala al loader iniziale (index.html) che l'app React è montata
  useEffect(() => {
    window.dispatchEvent(new Event('app-mounted'));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* ROTTA HOME */}
        <Route 
          path="/" 
          element={
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
              <main>
                <MouseTorch />
                <ScrollProgress />
                <Header lang={lang} setLang={setLang} />
                <Hero lang={lang} setLang={setLang} /> 
                <TestRepository lang={lang} />
                <Reveal><TestInAction lang={lang} /></Reveal>
                <Reveal><Contact lang={lang} /></Reveal>
              </main>
              <Footer />
              <CustomCursor />
              <CommandPalette lang={lang} setLang={setLang} />
              <BugEasterEgg lang={lang} />
              <Analytics />
            </div>
          } 
        />

        {/* ROTTA CV: solo la pagina del curriculum */}
        <Route path="/cv/:lang" element={<Curriculum />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;