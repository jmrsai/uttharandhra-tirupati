
const History = ({ lang }: { lang: string }) => {
  return (
    <section id="history" className="py-20 bg-[#fdfaf3] pattern-overlay">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal-on-scroll">
            <img src="https://images.unsplash.com/photo-1605285749964-388a78a63375?auto=format&fit=crop&q=80&w=800" alt="Temple Gopuram" className="rounded-lg shadow-2xl w-full h-auto object-cover" />
          </div>
          <div className="reveal-on-scroll">
            <h2 className="text-4xl font-bold text-[#800000] mb-4">
              {lang === 'te' ? 'చరిత్ర & ప్రాముఖ్యత' : 'History & Significance'}
            </h2>
            <div className="w-24 h-1 bg-[#FF9933] mb-6"></div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {lang === 'te' 
                ? 'ఉత్తరాంధ్ర తిరుమలగా ప్రసిద్ధి చెందిన శ్రీ వెంకటేశ్వర స్వామి దేవస్థానం, ఈ ప్రాంతంలో అత్యంత గౌరవనీయమైన పుణ్యక్షేత్రాలలో ఒకటి. ఈ ఆలయం శతాబ్దాల చరిత్రను కలిగి ఉంది, దీని మూలాలు ప్రాచీన గ్రంథాలు మరియు స్థానిక ఇతిహాసాలలో ఉన్నాయి.' 
                : 'The Sri Venkateswara Swamy Devastanam, popularly known as Utthandhra Tirumala, is one of the most revered pilgrimage sites in the region. The temple has a history that spans several centuries, with its origins traced back to ancient scriptures and local legends.'}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {lang === 'te'
                ? 'ప్రశాంతమైన కొండపై ఉన్న ఈ ఆలయం చుట్టూ పచ్చని పరిసరాలు ఉన్నాయి, ఇది ఆధ్యాత్మిక సాధన మరియు ధ్యానానికి అనువైన ప్రశాంతమైన వాతావరణాన్ని అందిస్తుంది. ఆలయ వాస్తుశిల్పం సాంప్రదాయ దక్షిణ భారత ఆలయ డిజైన్ యొక్క అద్భుతమైన ఉదాహరణ, ఇందులో క్లిష్టమైన శిల్పాలు మరియు ఎత్తైన గోపురాలు ఉన్నాయి.' 
                : 'Nestled atop a serene hill, the temple is surrounded by lush greenery, offering a tranquil atmosphere for spiritual seekers and devotees. The temple\'s architecture is a stunning example of traditional South Indian temple design, featuring intricate carvings and a towering gopuram.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
