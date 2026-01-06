
const festivalsData = {
  en: {
    title: 'Major Festivals',
    festivals: [
      { img: 'https://images.unsplash.com/photo-1594771804886-b054ce245458?auto=format&fit=crop&q=80&w=600', name: 'Brahmotsavam', description: 'A grand 9-day festival celebrated annually with great fervor.' },
      { img: 'https://images.unsplash.com/photo-1605285749964-388a78a63375?auto=format&fit=crop&q=80&w=600', name: 'Vaikuntha Ekadasi', description: 'A special event that attracts thousands of devotees.' },
      { img: 'https://images.unsplash.com/photo-1594771804886-b054ce245458?auto=format&fit=crop&q=80&w=600', name: 'Rathasapthami', description: 'The Sun God is worshipped on this auspicious day.' },
    ],
  },
  te: {
    title: 'ముఖ్యమైన పండుగలు',
    festivals: [
      { img: 'https://images.unsplash.com/photo-1594771804886-b054ce245458?auto=format&fit=crop&q=80&w=600', name: 'బ్రహ్మోత్సవం', description: 'ప్రతి సంవత్సరం 9 రోజుల పాటు ఎంతో వైభవంగా జరిగే ఉత్సవం.' },
      { img: 'https://images.unsplash.com/photo-1605285749964-388a78a63375?auto=format&fit=crop&q=80&w=600', name: 'వైకుంఠ ఏకాదశి', description: 'వేలాది మంది భక్తులను ఆకర్షించే ఒక ప్రత్యేక కార్యక్రమం.' },
      { img: 'https://images.unsplash.com/photo-1594771804886-b054ce245458?auto=format&fit=crop&q=80&w=600', name: 'రథసప్తమి', description: 'ఈ పవిత్రమైన రోజున సూర్య భగవానుడిని పూజిస్తారు.' },
    ],
  },
};

const Festivals = ({ lang }: { lang: string }) => {
  const { title, festivals } = festivalsData[lang] || festivalsData.en;

  return (
    <section id="festivals" className="py-20 bg-[#fdfaf3]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 reveal-on-scroll">
          <h2 className="text-4xl font-bold text-[#800000]">{title}</h2>
          <div className="w-24 h-1 bg-[#FF9933] mx-auto mt-4"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {festivals.map((festival, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden reveal-on-scroll transform hover:scale-105 transition-transform duration-300">
              <img src={festival.img} alt={festival.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#800000] mb-2">{festival.name}</h3>
                <p className="text-gray-600">{festival.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Festivals;
