
import { PlayCircle } from 'lucide-react';

const Hero = ({ lang }: { lang: string }) => {
  return (
    <section id="home" className="relative h-[100vh] min-h-[600px] flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0000] via-[#1a0000]/60 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-cover bg-center animate-kenburns" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1594771804886-b054ce245458?auto=format&fit=crop&q=80&w=1920&h=1080')" }}></div>
      
      <div className="relative z-20 text-center px-4 reveal-on-scroll">
        <h1 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tight mb-4" style={{ textShadow: '0 5px 20px rgba(0,0,0,0.5)' }}>
          {lang === 'te' ? 'ఉత్తరాంధ్ర తిరుమల' : 'Utthandhra Tirumala'}
        </h1>
        <p className="text-xl md:text-2xl font-bold text-[#FF9933] tracking-[0.2em] uppercase mb-12" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
          {lang === 'te' ? 'శ్రీ వెంకటేశ్వర స్వామి దేవస్థానం' : 'Sri Venkateswara Swamy Devastanam'}
        </p>
        <div className="flex justify-center items-center gap-4">
          <button className="bg-[#FF9933] text-[#800000] px-10 py-4 rounded-full font-black text-lg hover:bg-white transition-all shadow-[0_15px_30px_rgba(255,153,51,0.3)] transform hover:scale-105 active:scale-95 flex items-center gap-3">
            <PlayCircle size={24} />
            {lang === 'te' ? 'ప్రత్యక్ష దర్శనం' : 'Live Darshan'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
