
import SevaCard from '../SevaCard';

const Sevas = ({ lang, onBook }: { lang: string, onBook: (s: any) => void }) => (
  <section id="sevas" className="py-32 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-20 reveal-on-scroll opacity-0 translate-y-10">
        <div className="w-16 h-1 bg-[#FF9933] mx-auto mb-4 rounded-full"></div>
        <h2 className="text-4xl md:text-5xl font-bold text-[#800000] mb-4">{lang === 'te' ? 'పూజా సేవలు' : 'Sacred Offerings'}</h2>
        <p className="text-gray-500 font-medium tracking-wide uppercase text-sm">Choose your path of devotion</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[
          { name: lang === 'te' ? 'నిత్య కళ్యాణం' : 'Nitya Kalyanotsavam', time: '10:00 AM', price: '₹501', desc: 'The celestial wedding of Lord Venkateswara and his consorts.' },
          { name: lang === 'te' ? 'సుప్రభాత సేవ' : 'Suprabhata Seva', time: '05:30 AM', price: '₹100', desc: 'Waking up the deity with sacred hymns and early morning prayers.' },
          { name: lang === 'te' ? 'అర్చన' : 'Sahasranama Archana', time: '07:30 AM', price: '₹50', desc: 'Reciting the thousand names of the Lord for prosperity.' },
          { name: lang === 'te' ? 'తమల సేవ' : 'Tomala Seva', time: '06:30 AM', price: '₹150', desc: 'Decoration of the Lord with fresh flower garlands.' },
          { name: lang === 'te' ? 'అన్న ప్రసాదం' : 'Anna Prasadam', time: '12:00 PM', price: 'Free', desc: 'Partaking in the holy meal served to all devotees daily.' },
          { name: lang === 'te' ? 'లడ్డు ప్రసాదం' : 'Laddu Prasadam', time: 'All Day', price: '₹50', desc: 'The world-famous divine sweet offering from the temple.' },
        ].map((seva, idx) => (
          <SevaCard key={idx} seva={seva} lang={lang} onBook={onBook} />
        ))}
      </div>
    </div>
  </section>
);

export default Sevas;
