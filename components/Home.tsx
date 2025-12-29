
import React, { useEffect, useState } from 'react';
import { 
  Clock, Calendar, ChevronRight, Sun, Moon, Flower, Gift, 
  MapPin, Phone, Mail, ScrollText, ExternalLink, Sparkles, 
  ArrowDown, BellRing 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DARSHAN_TIMINGS, NEWS_ITEMS } from '../constants';
import { calculatePanchangam } from '../utils/panchangam';
import { useLanguage } from '../context/LanguageContext';
import { useNotifications } from '../context/NotificationContext';
import Logo from './Logo';

const Home: React.FC = () => {
  const [panchangam, setPanchangam] = useState<any>(null);
  const [greeting, setGreeting] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [dynamicNews, setDynamicNews] = useState<any[]>([]);
  const { language, t } = useLanguage();
  const { permission, requestPermission } = useNotifications();

  const loadData = () => {
    const storedNews = localStorage.getItem('temple_news');
    setDynamicNews(storedNews ? JSON.parse(storedNews) : NEWS_ITEMS(language));
  };

  useEffect(() => {
    loadData();
    window.addEventListener('storage_update', loadData);
    
    setPanchangam(calculatePanchangam(new Date(), language));

    const now = new Date();
    const hour = now.getHours();
    
    if (hour >= 5 && hour < 12) setGreeting(t('greeting.morning'));
    else if (hour >= 12 && hour < 16) setGreeting(t('greeting.afternoon'));
    else if (hour >= 16 && hour < 20) setGreeting(t('greeting.evening'));
    else setGreeting(t('greeting.night'));

    setIsOpen(hour >= 7 && hour < 20);

    const createPetal = () => {
      const container = document.getElementById('hero-container');
      if (!container) return;
      const petal = document.createElement('div');
      petal.classList.add('flower-petal');
      petal.style.left = Math.random() * 100 + 'vw';
      petal.style.animationDuration = Math.random() * 5 + 3 + 's';
      petal.style.opacity = (Math.random() * 0.7 + 0.3).toString();
      petal.style.width = (Math.random() * 10 + 5) + 'px';
      petal.style.height = petal.style.width;
      container.appendChild(petal);
      setTimeout(() => petal.remove(), 8000);
    };

    const interval = setInterval(createPetal, 400);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage_update', loadData);
    };
  }, [language, t]);

  return (
    <div className="flex flex-col w-full relative">
      <div id="hero-container" className="relative h-[800px] w-full overflow-hidden group">
        {/* God Rays Layer */}
        <div className="god-rays">
          <div className="ray ray-1" style={{'--rot': '15deg'} as any}></div>
          <div className="ray ray-2" style={{'--rot': '-10deg'} as any}></div>
          <div className="ray ray-3" style={{'--rot': '5deg'} as any}></div>
        </div>

        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] group-hover:scale-105" style={{ backgroundImage: 'url("https://yt3.googleusercontent.com/7y8KChJI_huixiWRFJGfK9-t5E3d7LMvZQN7QdJ2VHdTn8MIwFIH9Mohj0mKmaSGzWlns_ujRQ=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj")' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-saffron-500/10 to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-20 text-white z-10 text-center md:text-left max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-10">
          <div className="animate-in fade-in slide-in-from-left-8 duration-1000 w-full md:w-auto">
            <div className="flex flex-col items-center md:items-start">
               {/* Hero Logo */}
               <div className="mb-8 animate-float relative">
                  <div className="absolute inset-0 bg-saffron-500 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                  <Logo className="w-32 h-32 md:w-48 md:h-48 relative z-10 border-4 border-gold-400/50 shadow-[0_0_50px_rgba(234,179,8,0.5)]" size={192} />
               </div>

               <div className="flex flex-wrap items-center gap-3 mb-6 justify-center md:justify-start">
                  <span className="bg-gradient-to-r from-saffron-600 to-gold-600 text-white px-4 py-1.5 rounded-full text-xs font-bold border border-gold-400/50 shadow-[0_0_20px_rgba(234,179,8,0.4)] flex items-center gap-2">
                    <Sparkles className="w-3 h-3" /> {t('hero.badge')}
                  </span>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold border flex items-center gap-2 backdrop-blur-md ${isOpen ? 'bg-green-600/30 border-green-500 text-green-300' : 'bg-red-600/30 border-red-500 text-red-300'}`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${isOpen ? 'bg-green-400 animate-pulse shadow-[0_0_10px_#4ade80]' : 'bg-red-500'}`}></div>
                    {isOpen ? t('status.open') : t('status.closed')}
                  </span>
               </div>
               
               <p className="text-gold-400 font-bold mb-3 flex items-center gap-3 justify-center md:justify-start tracking-wide uppercase text-sm">
                  <Sun className="w-5 h-5 animate-spin-slow" /> {greeting}
               </p>
               
               <h1 className="text-5xl md:text-8xl font-bold mb-6 font-header text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-white to-gold-300 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] leading-tight tracking-tight">
                 {t('hero.title')}
               </h1>
               
               <p className="text-xl md:text-2xl max-w-2xl drop-shadow-lg text-stone-100/90 leading-relaxed font-light italic text-center md:text-left">
                 {t('hero.subtitle')}
               </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto animate-in fade-in slide-in-from-right-8 duration-1000 pb-10">
             <Link to="/sevas" className="relative group bg-gradient-to-r from-saffron-600 to-saffron-800 text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-xl hover:shadow-saffron-500/40 flex items-center justify-center gap-3 transform hover:-translate-y-1 overflow-hidden">
               <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 shimmer-bg"></div>
               <Flower className="w-6 h-6 animate-spin-slow" /> {t('hero.book_sevas')}
             </Link>
             <Link to="/donation" className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-xl hover:bg-white/20 flex items-center justify-center gap-3 transform hover:-translate-y-1">
               <Gift className="w-6 h-6" /> {t('hero.e_hundi')}
             </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 animate-bounce">
           <span className="text-[10px] uppercase font-bold tracking-[0.3em]">Scroll</span>
           <ArrowDown className="w-4 h-4" />
        </div>
      </div>

      {/* Notification Prompt */}
      {permission !== 'granted' && (
        <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
          <div className="bg-gradient-to-r from-saffron-600 to-saffron-800 p-1 rounded-3xl shadow-2xl">
            <div className="bg-white/10 backdrop-blur-md rounded-[1.4rem] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-gold-500 p-4 rounded-2xl shadow-lg animate-pulse">
                  <BellRing className="w-8 h-8 text-saffron-900" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Enable Divine Alerts</h3>
                  <p className="text-saffron-100 text-sm">Receive instant notifications for Seva timings and Festival events.</p>
                </div>
              </div>
              <button 
                onClick={requestPermission}
                className="bg-white text-saffron-700 font-bold px-8 py-3 rounded-2xl hover:bg-gold-500 hover:text-white transition-all shadow-xl flex items-center gap-2"
              >
                Enable Notifications
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-16 w-full grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Panchangam Card */}
          <div className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-saffron-100 overflow-hidden transform hover:scale-[1.01] transition-all duration-500">
             <div className="bg-gradient-to-r from-saffron-50 via-white to-saffron-50 p-6 border-b border-saffron-100 flex justify-between items-center">
                <h3 className="font-bold text-saffron-800 flex items-center gap-3 text-lg">
                  <div className="bg-saffron-600 p-1.5 rounded-lg text-white">
                    <Sun className="w-5 h-5 animate-spin-slow" /> 
                  </div>
                  {t('panchangam.title')}
                </h3>
                <span className="text-sm font-bold text-stone-600 bg-white px-5 py-2 rounded-full border border-stone-100 shadow-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-saffron-500" />
                  {panchangam ? panchangam.date : 'Loading...'}
                </span>
             </div>
             {panchangam ? (
                <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div className="space-y-2 p-4 rounded-3xl bg-stone-50/50 border border-stone-100/50">
                     <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] block">{t('panchangam.tithi')}</span>
                     <span className="font-bold text-stone-800 block text-xl">{panchangam.tithi}</span>
                  </div>
                  <div className="space-y-2 p-4 rounded-3xl bg-stone-50/50 border border-stone-100/50">
                     <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] block">{t('panchangam.nakshatra')}</span>
                     <span className="font-bold text-stone-800 block text-xl">{panchangam.nakshatra}</span>
                  </div>
                  <div className="space-y-2 p-4 rounded-3xl bg-red-50/30 border border-red-100/50">
                     <span className="text-[10px] font-bold text-red-400 uppercase tracking-[0.2em] block">{t('panchangam.rahu')}</span>
                     <span className="font-bold text-red-600 block text-xl">{panchangam.rahuKalam}</span>
                  </div>
                  <div className="space-y-2 p-4 rounded-3xl bg-saffron-50/50 border border-saffron-100/50">
                     <span className="text-[10px] font-bold text-saffron-400 uppercase tracking-[0.2em] block">{t('panchangam.day')}</span>
                     <span className="font-bold text-saffron-600 block text-xl">{panchangam.weekday}</span>
                  </div>
               </div>
             ) : (
               <div className="p-12 text-center text-stone-300">
                 <div className="animate-spin w-8 h-8 border-4 border-saffron-200 border-t-saffron-600 rounded-full mx-auto"></div>
               </div>
             )}
          </div>

          <section className="bg-white p-10 rounded-[2.5rem] shadow-2xl border-t-8 border-saffron-600 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-saffron-50 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
            <h2 className="text-4xl font-bold text-saffron-800 mb-8 flex items-center gap-4 font-header">
              <Logo className="w-12 h-12" size={48} />
              <span className="relative">
                {t('history.summary_title')}
                <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gold-400 rounded-full"></div>
              </span>
            </h2>
            <div className="space-y-6 text-stone-700 leading-relaxed text-xl text-justify font-light">
              <p>
                {language === 'en' 
                  ? 'Lord Venkateswara, the Lord of the Universe, manifested as Venkateswara Swamy in this Kali Yuga for the sake of His devotees. This sacred hill in Pendurthi is known as "Uttharandhra Tirupati".'
                  : 'అఖిలాండ కోటి బ్రహ్మాండనాయకుడు భక్తుల కోసం కలియుగంలో వేంకటేశ్వరస్వామిగా అవతరించాడు. పెందుర్తి క్షేత్రం "ఉత్తరాంధ్ర తిరుపతి"గా విరాజిల్లుతోంది.'}
              </p>
              <div className="pt-6">
                <Link to="/history" className="inline-flex items-center gap-3 bg-saffron-50 text-saffron-700 px-8 py-3 rounded-2xl font-bold hover:bg-saffron-600 hover:text-white transition-all shadow-sm hover:shadow-xl transform hover:-translate-y-1">
                  <ScrollText className="w-6 h-6" /> {t('history.read_more')}
                </Link>
              </div>
            </div>
          </section>

          <section>
             <h2 className="text-3xl font-bold text-saffron-800 mb-8 flex items-center gap-3">
              <div className="bg-saffron-100 p-2 rounded-xl text-saffron-600">
                <Calendar className="w-7 h-7" /> 
              </div>
              {t('news.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {dynamicNews.map((news) => (
                <div key={news.id} className="bg-white rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-stone-100 flex flex-col h-full group transform hover:-translate-y-2">
                  <div className="h-64 overflow-hidden relative">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">{news.date}</span>
                    </div>
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <h3 className="text-2xl font-bold text-stone-800 mb-4 group-hover:text-saffron-700 transition-colors leading-snug">{news.title}</h3>
                    <p className="text-stone-500 text-base line-clamp-3 mb-8 leading-relaxed font-light">{news.description}</p>
                    <button className="mt-auto text-saffron-600 text-sm font-bold flex items-center hover:gap-3 transition-all self-start group/btn">
                      {t('news.read_more')} <ChevronRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-10">
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-stone-100 ring-1 ring-black/5 animate-in fade-in zoom-in duration-700">
            <div className="bg-gradient-to-br from-saffron-800 to-saffron-600 p-8 text-white shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
               <h2 className="text-2xl font-bold flex items-center gap-3 relative z-10">
                 <Clock className="w-7 h-7 text-gold-400" /> {t('timings.title')}
               </h2>
            </div>
            <div className="p-4 space-y-2">
              {DARSHAN_TIMINGS(language).map((timing, idx) => (
                <div key={idx} className="p-5 hover:bg-saffron-50/50 transition-all group rounded-[1.5rem] border border-transparent hover:border-saffron-100">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-stone-800 group-hover:text-saffron-800 transition-colors text-lg">{timing.period}</h4>
                    <span className="text-xs font-bold bg-white px-3 py-1.5 rounded-xl text-saffron-600 border border-saffron-100 shadow-sm">{timing.time}</span>
                  </div>
                  <p className="text-sm text-stone-500 italic font-light group-hover:text-stone-700 transition-colors">{timing.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
             <Link to="/gallery" className="bg-gradient-to-br from-purple-600 to-indigo-800 text-white p-8 rounded-[2rem] shadow-xl hover:shadow-purple-300 transition-all group hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/20">
                   <Moon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold mb-2">{t('nav.gallery')}</h4>
                <p className="text-white/70 text-sm font-light">View divine darshan images of the Lord.</p>
             </Link>
             <Link to="/audio" className="bg-gradient-to-br from-rose-500 to-red-800 text-white p-8 rounded-[2rem] shadow-xl hover:shadow-rose-300 transition-all group hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/20">
                   <Flower className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold mb-2">{t('nav.audio')}</h4>
                <p className="text-white/70 text-sm font-light">Listen to holy slokas and devotional songs.</p>
             </Link>
          </div>
        </div>
      </div>
      
      <div className="w-full bg-gradient-to-b from-stone-50 to-white py-24 mt-16 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-saffron-800 font-header mb-6">{t('address.title')}</h2>
            <div className="h-2 w-48 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
             <div className="bg-white p-4 rounded-[3rem] shadow-2xl border border-saffron-100 h-[500px] w-full relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.243542288005!2d83.1979683148816!3d17.82717098781622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3968b3f2f0b4b3%3A0x5f5f5f5f5f5f5f5f!2sSri%20Venkateswara%20Swamy%20Devasthanam%2C%20Pendurthi!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                  width="100%" height="100%" style={{border:0, borderRadius: '2.5rem'}} allowFullScreen={true} loading="lazy" title="Location"
                ></iframe>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full -mt-4 pointer-events-none z-10 flex flex-col items-center group-hover:scale-125 transition-all duration-500">
                  <div className="bg-saffron-600 text-white p-6 rounded-full shadow-2xl border-8 border-white flex items-center justify-center animate-bounce">
                    <Logo className="w-16 h-16" size={64} />
                  </div>
                </div>
             </div>

             <div className="bg-white rounded-[3rem] shadow-2xl border border-saffron-50 p-12 flex flex-col justify-center h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                   <Sparkles className="text-gold-300 w-12 h-12 opacity-30 animate-pulse" />
                </div>
                <div className="flex items-center gap-4 mb-10 border-b border-saffron-100 pb-6">
                   <Logo className="w-14 h-14" size={56} />
                   <h3 className="text-3xl md:text-4xl font-bold text-stone-800 font-header">
                      {t('hero.title')}
                   </h3>
                </div>
                <div className="space-y-10">
                   <div className="flex items-start gap-6 group">
                      <div className="bg-saffron-100 p-5 rounded-3xl text-saffron-600 group-hover:bg-saffron-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        <MapPin className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-800 text-xl mb-1">{language === 'en' ? 'Address' : 'చిరునామా'}</h4>
                        <p className="text-stone-500 leading-relaxed text-lg font-light">
                          {language === 'en' ? 'Main Road, Pendurthi,' : 'మెయిన్ రోడ్, పెందుర్తి,'}<br/>
                          {language === 'en' ? 'Visakhapatnam District,' : 'విశాఖపట్నం జిల్లా,'}<br/>
                          {language === 'en' ? 'Andhra Pradesh - 531173' : 'ఆంధ్రప్రదేశ్ - 531173'}
                        </p>
                      </div>
                   </div>
                   <div className="flex items-start gap-6 group">
                      <div className="bg-saffron-100 p-5 rounded-3xl text-saffron-600 group-hover:bg-saffron-600 group-hover:text-white transition-all duration-300 shadow-sm"><Phone className="w-8 h-8" /></div>
                      <div>
                        <h4 className="font-bold text-stone-800 text-xl mb-1">Phone</h4>
                        <p className="text-stone-600 font-bold text-lg">+91 98480 12345</p>
                      </div>
                   </div>
                </div>
                <div className="mt-12 pt-10 border-t border-stone-100">
                   <a href="https://maps.app.goo.gl/FDAGKe21hb2nYG9x5" target="_blank" className="relative group overflow-hidden flex items-center justify-center gap-4 w-full bg-gradient-to-r from-stone-800 to-stone-900 text-white font-bold py-5 rounded-2xl transition-all transform hover:-translate-y-1 shadow-xl">
                     <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 shimmer-bg"></div>
                     <MapPin className="w-6 h-6 text-gold-400" /> {t('address.get_directions')}
                   </a>
                   <p className="text-sm text-stone-400 italic text-center mt-6 font-light">
                     {t('address.parking_note')}
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
