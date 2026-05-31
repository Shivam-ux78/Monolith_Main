import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';

export default function App() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#050505] overflow-x-hidden">
      <Navbar />
      <main className="flex-grow w-full pt-16 md:pt-0 md:pl-20 transition-all duration-300 relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}
