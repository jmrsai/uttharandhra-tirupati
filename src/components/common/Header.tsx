
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = ({ lang, setLang }: { lang: string, setLang: (lang: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = {
    en: [
      { name: 'Home', href: '#home' },
      { name: 'History', href: '#history' },
      { name: 'Timings', href: '#timings' },
      { name: 'Festivals', href: '#festivals' },
      { name: 'Contact', href: '#contact' },
    ],
    te: [
      { name: 'హోమ్', href: '#home' },
      { name: 'చరిత్ర', href: '#history' },
      { name: 'సమయాలు', href: '#timings' },
      { name: 'పండుగలు', href: '#festivals' },
      { name: 'సంప్రదించండి', href: '#contact' },
    ],
  };

  const links = navLinks[lang] || navLinks.en;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <a href="#home" className="text-2xl font-bold text-white">{lang === 'te' ? 'శ్రీవారి ఆలయం' : 'Srivari Temple'}</a>
          <nav className="hidden md:flex items-center space-x-6">
            {links.map(link => (
              <a key={link.name} href={link.href} className="text-white font-semibold hover:text-[#FF9933] transition-colors">{link.name}</a>
            ))}
            <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
              <button onClick={() => setLang('en')} className={`text-sm font-bold ${lang === 'en' ? 'text-[#FF9933]' : 'text-white'}`}>EN</button>
              <span className="text-white">|</span>
              <button onClick={() => setLang('te')} className={`text-sm font-bold ${lang === 'te' ? 'text-[#FF9933]' : 'text-white'}`}>TE</button>
            </div>
          </nav>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-sm">
          <nav className="flex flex-col items-center py-4">
            {links.map(link => (
              <a key={link.name} href={link.href} className="text-white py-2" onClick={() => setIsOpen(false)}>{link.name}</a>
            ))}
            <div className="flex items-center space-x-2 mt-4">
              <button onClick={() => setLang('en')} className={`text-sm font-bold ${lang === 'en' ? 'text-[#FF9933]' : 'text-white'}`}>EN</button>
              <span className="text-white">|</span>
              <button onClick={() => setLang('te')} className={`text-sm font-bold ${lang === 'te' ? 'text-[#FF9933]' : 'text-white'}`}>TE</button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
