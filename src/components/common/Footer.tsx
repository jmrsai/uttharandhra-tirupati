
import { Facebook, Twitter, Instagram, MapPin, Mail, Phone } from 'lucide-react';

const Footer = ({ lang }: { lang: string }) => {
  const quickLinks = {
    en: [
      { name: 'History', href: '#history' },
      { name: 'Timings', href: '#timings' },
      { name: 'Festivals', href: '#festivals' },
      { name: 'Contact', href: '#contact' },
    ],
    te: [
      { name: 'చరిత్ర', href: '#history' },
      { name: 'సమయాలు', href: '#timings' },
      { name: 'పండుగలు', href: '#festivals' },
      { name: 'సంప్రదించండి', href: '#contact' },
    ],
  };

  const links = quickLinks[lang] || quickLinks.en;

  return (
    <footer className="bg-[#1a0000] text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold mb-4">{lang === 'te' ? 'శ్రీవారి ఆలయం' : 'Srivari Temple'}</h3>
            <p className="text-gray-400">{lang === 'te' ? 'ఉత్తరాంధ్ర తిరుమలగా ప్రసిద్ధి చెందిన శ్రీ వెంకటేశ్వర స్వామి దేవస్థానం, ఈ ప్రాంతంలో అత్యంత గౌరవనీయమైన పుణ్యక్షేత్రాలలో ఒకటి.' : 'The Sri Venkateswara Swamy Devastanam, popularly known as Utthandhra Tirumala, is one of the most revered pilgrimage sites in the region.'}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul>
              {links.map(link => (
                <li key={link.name} className="mb-2">
                  <a href={link.href} className="text-gray-400 hover:text-[#FF9933] transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="flex items-center justify-center md:justify-start mb-2">
              <MapPin size={18} className="mr-2 text-[#FF9933]" />
              <p className="text-gray-400">Srikakulam District, Andhra Pradesh</p>
            </div>
            <div className="flex items-center justify-center md:justify-start mb-2">
              <Mail size={18} className="mr-2 text-[#FF9933]" />
              <p className="text-gray-400">info@utthandhratirumala.com</p>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <Phone size={18} className="mr-2 text-[#FF9933]" />
              <p className="text-gray-400">+91 123 456 7890</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} {lang === 'te' ? 'శ్రీ వెంకటేశ్వర స్వామి దేవస్థానం. అన్ని హక్కులు ప్రత్యేకించబడ్డాయి.' : 'Sri Venkateswara Swamy Devastanam. All Rights Reserved.'}</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-[#FF9933] transition-colors"><Facebook size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-[#FF9933] transition-colors"><Twitter size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-[#FF9933] transition-colors"><Instagram size={24} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
