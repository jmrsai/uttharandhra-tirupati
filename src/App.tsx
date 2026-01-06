
import { useState, useEffect } from 'react';
import Header from './components/common/Header';
import Hero from './components/sections/Hero';
import History from './components/sections/History';
import Timings from './components/sections/Timings';
import Festivals from './components/sections/Festivals';
import Donation from './components/sections/Donation';
import Contact from './components/sections/Contact';
import Footer from './components/common/Footer';
import FlowerPetals from './components/common/FlowerPetals';
import { ArrowUp } from 'lucide-react';
import './Flower.css';

const App = () => {
  const [lang, setLang] = useState('en');
  const [showScroll, setShowScroll] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }

    const sections = document.querySelectorAll('.reveal-on-scroll');
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        section.classList.add('active');
        section.classList.remove('inactive');
      } else {
        section.classList.remove('active');
        section.classList.add('inactive');
      }
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <FlowerPetals />
      <Header lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <History lang={lang} />
        <Timings lang={lang} />
        <Festivals lang={lang} />
        <Donation lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
      {showScroll && (
        <button 
          onClick={scrollToTop} 
          className="fixed bottom-8 right-8 bg-[#FF9933] text-white p-3 rounded-full shadow-lg hover:bg-[#800000] transition-colors z-50"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default App;
