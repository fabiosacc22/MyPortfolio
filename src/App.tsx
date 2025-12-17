import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TestRepository from './components/TestRepository';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main className="flex-grow">
      <Hero />
      <TestRepository />
      </main>
      <Footer />
    </div>
  );
};

export default App;