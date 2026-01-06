
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Menu, X, Sun, Moon, Volume2, Search, ChevronDown } from 'lucide-react';
import Home from './components/Home';

// AI Chatbot component
const AIChatbot = () => {
  // ... (Your AI Chatbot implementation)
};

// Placeholder components for different sections
const Temple = () => <div className="h-screen bg-spiritual-cream">Temple Content</div>;
const Sevas = () => <div className="h-screen bg-spiritual-cream">Sevas Content</div>;
const Multimedia = () => <div className="h-screen bg-spiritual-cream">Multimedia Content</div>;
const Donations = () => <div className="h-screen bg-spiritual-cream">Donations Content</div>;
const Contact = () => <div className="h-screen bg-spiritual-cream">Contact Content</div>;

// App component
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Temple', path: '/temple' },
    { name: 'Sevas', path: '/sevas' },
    { name: 'Multimedia', path: '/multimedia' },
    { name: 'Donations', path: '/donations' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <Router>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Temple Logo" className="h-10" />
            <span className={`font-header text-lg font-semibold ${isScrolled ? 'text-spiritual-maroon' : 'text-white'}`}>Tirupati</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            {navLinks.map(link => (
              <NavLink key={link.name} to={link.path} className={({ isActive }) => `font-semibold transition-colors ${isScrolled ? (isActive ? 'text-spiritual-gold' : 'text-spiritual-maroon') : (isActive ? 'text-spiritual-gold' : 'text-white')}`}>
                {link.name}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center space-x-3">
            <button className={`${isScrolled ? 'text-spiritual-maroon' : 'text-white'}`}><Search size={20} /></button>
            <button className={`${isScrolled ? 'text-spiritual-maroon' : 'text-white'}`}><Sun size={20} /></button>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} className={`${isScrolled ? 'text-spiritual-maroon' : 'text-white'}`} /> : <Menu size={24} className={`${isScrolled ? 'text-spiritual-maroon' : 'text-white'}`} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-spiritual-maroon/95 z-40 pt-20 p-4 md:hidden">
          <nav className="flex flex-col space-y-4">
            {navLinks.map(link => (
              <NavLink key={link.name} to={link.path} className="text-white font-semibold text-lg" onClick={() => setIsMenuOpen(false)}>{link.name}</NavLink>
            ))}
          </nav>
        </div>
      )}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/temple" element={<Temple />} />
          <Route path="/sevas" element={<Sevas />} />
          <Route path="/multimedia" element={<Multimedia />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <AIChatbot />
    </Router>
  );
};

export default App;
