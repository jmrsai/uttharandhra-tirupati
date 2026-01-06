
import { Sparkles, Star } from 'lucide-react';

const Testimonials = ({ lang }: { lang: string }) => {
  const reviews = [
    { name: 'Ravi Kumar', text: lang === 'te' ? 'పెందుర్తిలో తిరుమల దర్శనం లభించినట్లు ఉంది. చాలా ప్రశాంతమైన ప్రదేశం.' : 'Feels like visiting Tirumala in Pendurthi. Very peaceful and well-maintained.', rating: 5 },
    { name: 'Anitha Reddy', text: lang === 'te' ? 'వైకుంఠ ఏకాదశి వేడుకలు అద్భుతం. ఆధ్యాత్మిక అనుభవం గొప్పది.' : 'Vaikuntha Ekadashi celebrations were grand. An amazing spiritual experience.', rating: 5 },
    { name: 'Srinivas', text: lang === 'te' ? 'పిల్లల కోసం అన్న ప్రసాదం సేవ బాగుంది. తప్పక సందర్శించాల్సిన గుడి.' : 'Anna Prasadam service is excellent. A must-visit temple for families.', rating: 5 },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-10">
          <div className="w-16 h-1 bg-[#FF9933] mx-auto mb-4 rounded-full"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#800000] mb-4">{lang === 'te' ? 'భక్తుల అనుభవాలు' : 'Devotee Experiences'}</h2>
          <p className="text-gray-500 font-medium tracking-wide uppercase text-sm">Words from our pilgrims</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <div key={i} className="reveal-on-scroll opacity-0 translate-y-10 p-10 bg-gray-50 rounded-[40px] border border-gray-100 hover:shadow-xl transition-all relative">
              <div className="absolute top-8 right-8 text-[#FF9933]/20"><Sparkles size={40} /></div>
              <div className="flex gap-1 mb-6 text-[#FF9933]">
                {[...Array(rev.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
              </div>
              <p className="text-gray-700 font-medium text-lg leading-relaxed mb-8 italic">"{rev.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#800000] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {rev.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-[#800000]">{rev.name}</h4>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Pilgrim</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
