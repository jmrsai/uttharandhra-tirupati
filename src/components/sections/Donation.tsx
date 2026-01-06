
import { Heart } from 'lucide-react';

const Donation = ({ lang }: { lang: string }) => {
  return (
    <section id="donation" className="py-20 spiritual-gradient text-white">
      <div className="container mx-auto px-4 text-center reveal-on-scroll">
        <h2 className="text-4xl font-bold mb-4">
          {lang === 'te' ? 'మీ సహాయం అందించండి' : 'Lend Your Support'}
        </h2>
        <p className="text-xl text-[#FF9933] mb-8">
          {lang === 'te' ? 'ఈ పవిత్ర స్థలాన్ని నిర్వహించడానికి మరియు అభివృద్ధి చేయడానికి మీ విరాళాలు మాకు సహాయపడతాయి.' : 'Your donations help us maintain and develop this sacred space.'}
        </p>
        <button className="bg-[#FF9933] text-[#800000] px-10 py-4 rounded-full font-black text-lg hover:bg-white transition-all shadow-[0_15px_30px_rgba(255,153,51,0.3)] transform hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto">
          <Heart size={24} />
          {lang === 'te' ? 'ఇప్పుడే విరాళం ఇవ్వండి' : 'Donate Now'}
        </button>
      </div>
    </section>
  );
};

export default Donation;
