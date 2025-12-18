import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TestRepository from './components/TestRepository';
import Footer from './components/Footer';
import { Analytics } from '@vercel/analytics/react';


const App: React.FC = () => {
  const [lang, setLang] = useState<'it' | 'en'>('en');
  return (
    
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      
      <main>
        <Header lang={lang} setLang={setLang} />
       {/* Passa setLang all'Hero per il selettore */}
       <Hero lang={lang} setLang={setLang} /> 
       
       {/* Passa lang al TestRepository per i contenuti */}
       <TestRepository lang={lang} />
       
    </main>
      <Footer />
      <Analytics />
    </div>
  );
};

export default App;