
import { BookOpen, Download, Headphones, Pause, Play, Youtube } from 'lucide-react';
import { useRef, useState } from 'react';
import { AUDIO_TRACKS, BOOKS, VIDEOS } from '../../data/multimedia';

const MultimediaSection = ({ lang }: { lang: string }) => {
  const [activeTab, setActiveTab] = useState<'audio' | 'video' | 'books'>('audio');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = (track: any) => {
    if (playingId === track.id) {
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = track.src;
        audioRef.current.play();
      }
      setPlayingId(track.id);
    }
  };

  return (
    <section id="media" className="py-24 bg-[#fdfaf3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-10">
          <div className="w-16 h-1 bg-[#FF9933] mx-auto mb-4 rounded-full"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#800000] mb-4">
            {lang === 'te' ? 'డిజిటల్ ఆధ్యాత్మికత' : 'Divine Digital Library'}
          </h2>
          <p className="text-gray-500 font-medium tracking-wide uppercase text-sm">Sacred Media for the Digital Soul</p>
        </div>

        <div className="flex justify-center gap-3 md:gap-6 mb-12 reveal-on-scroll opacity-0 translate-y-10">
          {[
            { id: 'audio', label: lang === 'te' ? 'కీర్తనలు' : 'Audio', icon: Headphones },
            { id: 'video', label: lang === 'te' ? 'వీడియోలు' : 'Videos', icon: Youtube },
            { id: 'books', label: lang === 'te' ? 'పుస్తకాలు' : 'Books', icon: BookOpen },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-8 md:px-12 py-4 rounded-3xl font-black transition-all shadow-md ${activeTab === tab.id 
                  ? 'bg-[#800000] text-white scale-105 shadow-[0_20px_40px_rgba(128,0,0,0.3)]' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}>
              <tab.icon size={22} /> {tab.label}
            </button>
          ))}
        </div>

        <div className="reveal-on-scroll opacity-0 translate-y-10 min-h-[450px]">
          {activeTab === 'audio' && (
            <div className="grid gap-6 max-w-4xl mx-auto">
              <audio ref={audioRef} onEnded={() => setPlayingId(null)} />
              {AUDIO_TRACKS(lang).map(track => (
                <div key={track.id} className="flex items-center justify-between p-6 bg-white rounded-[40px] border border-gray-100 hover:shadow-2xl hover:border-[#FF9933]/40 transition-all group">
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => toggleAudio(track)}
                      className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all shadow-lg ${playingId === track.id ? 'bg-[#FF9933] text-white animate-pulse scale-110' : 'bg-gray-50 text-[#800000] group-hover:bg-[#800000] group-hover:text-white'
                        }`}>
                      {playingId === track.id ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
                    </button>
                    <div>
                      <h4 className="font-black text-[#800000] text-xl mb-1">{track.title}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#FF9933] font-black uppercase tracking-widest bg-[#FF9933]/10 px-2 py-0.5 rounded-lg">{track.category}</span>
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">{track.duration}</span>
                      </div>
                    </div>
                  </div>
                  <a href={track.src} target="_blank" className="w-12 h-12 flex items-center justify-center text-gray-300 hover:text-[#800000] hover:bg-[#800000]/5 rounded-2xl transition-all">
                    <Download size={22} />
                  </a>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'video' && (
            <div className="grid md:grid-cols-2 gap-12">
              {VIDEOS.map(video => (
                <div key={video.id} className="rounded-[60px] overflow-hidden shadow-2xl bg-white border-[12px] border-white group transition-all hover:-translate-y-3">
                  <div className="aspect-video relative">
                    <iframe 
                      src={video.url} 
                      className="w-full h-full border-0" 
                      allowFullScreen
                      title={video.title}
                    ></iframe>
                  </div>
                  <div className="p-10">
                    <div className="flex items-center gap-3 text-[#FF9933] mb-4 font-black text-xs uppercase tracking-[0.2em]">
                      <div className="w-2 h-2 bg-[#FF9933] rounded-full animate-ping"></div>
                      Official Ritual Stream
                    </div>
                    <h4 className="font-black text-[#800000] text-2xl leading-tight mb-2">{video.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'books' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {BOOKS(lang).map(book => (
                <div key={book.id} className="bg-white p-10 rounded-[56px] shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-2xl hover:border-[#800000]/20 transition-all group">
                  <div className="relative mb-8 transform group-hover:-translate-y-4 transition-all">
                    <img src={book.coverImage} alt={book.title} className="w-40 h-56 object-cover rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]" />
                    <div className="absolute inset-0 ring-1 ring-white/20 rounded-2xl"></div>
                  </div>
                  <h4 className="font-black text-[#800000] text-2xl mb-2">{book.title}</h4>
                  <p className="text-sm text-gray-400 font-black uppercase tracking-widest mb-8">{book.author}</p>
                  <a 
                    href={book.pdfUrl} 
                    target="_blank" 
                    className="w-full flex items-center justify-center gap-3 bg-gray-50 text-[#800000] font-black py-4 rounded-3xl hover:bg-[#800000] hover:text-white transition-all shadow-inner"
                  >
                    <Download size={20} /> {lang === 'te' ? 'చదవండి' : 'Read E-Book'}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MultimediaSection;
