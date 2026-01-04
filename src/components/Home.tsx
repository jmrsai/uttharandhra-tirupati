
import React, { useEffect, useState, useMemo } from 'react';
import {
  Clock, Calendar, ChevronRight, Sun, Moon, Flower, Gift,
  MapPin, Phone, Mail, ScrollText, ExternalLink, Sparkles,
  ArrowDown, BellRing, TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, AreaChart, Area
} from 'recharts';
import { DARSHAN_TIMINGS, NEWS_ITEMS } from '../constants/constants';
import { calculatePanchangam } from '../utils/panchangam';
import { useLanguage } from '../context/LanguageContext';
import { useNotifications } from '../context/NotificationContext';
import Logo from './Logo';

const Home: React.FC = () => {
  const [panchangam, setPanchangam] = useState<any>(null);
  const [greeting, setGreeting] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const { language, t } = useLanguage();
  const { permission, requestPermission } = useNotifications();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 900], [0, 300]);

  const statsData = useMemo(() => [
    { name: t('stats.mon'), value: 4000 },
    { name: t('stats.tue'), value: 3000 },
    { name: t('stats.wed'), value: 5000 },
    { name: t('stats.thu'), value: 2780 },
    { name: t('stats.fri'), value: 1890 },
    { name: t('stats.sat'), value: 2390 },
    { name: t('stats.sun'), value: 3490 },
  ], [t]);

  const loadData = () => {
    const storedNews = localStorage.getItem('temple_news');
    setDynamicNews(storedNews ? JSON.parse(storedNews) : NEWS_ITEMS(language));
  };

  const rays = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i,
    style: {
      '--angle-start': `${Math.random() * 360}deg`,
      '--angle-end': `${Math.random() * 360}deg`,
      animationDuration: `${Math.random() * 10 + 10}s`,
      animationDelay: `-${Math.random() * 20}s`,
    } as React.CSSProperties
  })), []);

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

    const particleContainer = document.getElementById('particle-container');
    if (particleContainer) {
      const createParticle = () => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        particle.style.animationDelay = `-${Math.random() * 15}s`;
        particle.style.backgroundColor = `rgba(234, 179, 8, ${Math.random() * 0.5 + 0.2})`;
        particleContainer.appendChild(particle);
        setTimeout(() => {
          particle.remove();
        }, 15000);
      };
      const interval = setInterval(createParticle, 200);
      return () => clearInterval(interval);
    }

    return () => {
      window.removeEventListener('storage_update', loadData);
    };
  }, [language, t]);

  return (
    <div className="flex flex-col w-full relative">
      <div id="hero-container" className="relative h-[900px] w-full overflow-hidden group">
        <div id="particle-container"></div>
        <div className="god-rays">
          {rays.map(ray => <div key={ray.id} className="ray" style={ray.style}></div>)}
        </div>

        <motion.div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-in-out group-hover:scale-105"
          style={{
            backgroundImage: 'url("https://yt3.googleusercontent.com/7y8KChJI_huixiWRFJGfK9-t5E3d7LMvZQN7QdJ2VHdTn8MIwFIH9Mohj0mKmaSGzWlns_ujRQ=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj")',
            y: y1
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-primary/50 to-transparent"></div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-20 text-white z-20 text-center md:text-left">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 w-full md:w-auto text-center md:text-left">
              <div className="relative inline-block mb-8 animate-float">
                <div className="absolute inset-0 bg-accent/50 rounded-full blur-3xl opacity-60 animate-pulse-glow"></div>
                <Logo className="w-40 h-40 md:w-56 md:h-56 relative z-10 border-4 border-accent/30 shadow-[0_0_80px_rgba(234,179,8,0.6)]" size={224} />
              </div>

              <h1 className="text-6xl md:text-8xl font-bold mb-4 font-header text-transparent bg-clip-text bg-gradient-to-r from-accent/80 via-white to-accent drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] leading-tight tracking-tight">
                {t('hero.title')}
              </h1>

              <p className="text-xl md:text-2xl max-w-3xl drop-shadow-lg text-neutral-content/90 leading-relaxed font-light">
                {t('hero.subtitle')}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8 justify-center md:justify-start">
                <span className={`px-5 py-2 rounded-full text-sm font-bold border flex items-center gap-2 backdrop-blur-md ${isOpen ? 'bg-success/20 border-success/50 text-success' : 'bg-error/20 border-error/50 text-error'}`}>
                  <div className={`w-3 h-3 rounded-full ${isOpen ? 'bg-success animate-pulse shadow-[0_0_10px_#4ade80]' : 'bg-error'}`}></div>
                  {isOpen ? t('status.open') : t('status.closed')}
                </span>
                <span className="bg-gradient-to-r from-primary/50 to-accent/50 text-white px-5 py-2 rounded-full text-sm font-bold border border-accent/30 shadow-[0_0_20px_rgba(234,179,8,0.3)] flex items-center gap-2 backdrop-blur-md">
                  <Sparkles className="w-4 h-4" /> {t('hero.badge')}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-5 w-full sm:w-auto mt-8 md:mt-0 animate-in fade-in slide-in-from-right-12 duration-1000 self-center md:self-end">
              <Link to="/sevas" className="relative group bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-primary/40 flex items-center justify-center gap-3 transform hover:-translate-y-1.5 overflow-hidden text-lg ring-2 ring-primary/50 hover:ring-accent">
                <div className="absolute -inset-0 bg-white/10 rotate-45 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 shimmer-bg"></div>
                <Flower className="w-6 h-6 transition-transform group-hover:rotate-180 duration-500" /> {t('hero.book_sevas')}
              </Link>
              <Link to="/donation" className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:bg-white/20 flex items-center justify-center gap-3 transform hover:-translate-y-1.5 text-lg ring-2 ring-white/20 hover:ring-white/40">
                <Gift className="w-6 h-6" /> {t('hero.e_hundi')}
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 animate-bounce z-20">
          <span className="text-[10px] uppercase font-bold tracking-[0.3em]">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </div>
      </div>

      {permission !== 'granted' && (
        <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-30">
          <div className="bg-gradient-to-r from-primary to-secondary p-1 rounded-3xl shadow-2xl">
            <div className="bg-primary/50 backdrop-blur-md rounded-[1.4rem] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="bg-accent/20 p-4 rounded-2xl shadow-lg border border-accent/30">
                  <BellRing className="w-8 h-8 text-accent animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Enable Divine Alerts</h3>
                  <p className="text-neutral-content text-sm">Receive instant notifications for Seva timings and Festival events.</p>
                </div>
              </div>
              <button
                onClick={requestPermission}
                className="bg-white text-primary font-bold px-8 py-3 rounded-xl hover:bg-accent/80 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 transform hover:-translate-y-1"
              >
                Enable Notifications
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 w-full grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
        <div className="lg:col-span-2 space-y-12">
          <div className="bg-base-100/80 backdrop-blur-3xl rounded-[2rem] shadow-xl border border-neutral/20 overflow-hidden transform hover:scale-[1.01] transition-all duration-500 ring-1 ring-black/5">
            <div className="bg-gradient-to-r from-neutral/10 to-base-100 p-6 border-b border-neutral/20 flex justify-between items-center">
              <h3 className="font-bold text-secondary flex items-center gap-3 text-xl">
                <div className="bg-primary p-2.5 rounded-lg text-white shadow-md">
                  <Sun className="w-5 h-5 animate-spin-slow" />
                </div>
                {t('panchangam.title')}
              </h3>
              <span className="text-sm font-bold text-secondary bg-base-100 px-5 py-2 rounded-full border border-neutral/20 shadow-sm flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                {panchangam ? panchangam.date : 'Loading...'}
              </span>
            </div>
            {panchangam ? (
              <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center space-y-2 p-4 rounded-2xl bg-neutral/10 border border-neutral/20 transition-all hover:bg-base-100 hover:shadow-lg hover:scale-105">
                  <span className="text-[10px] font-bold text-neutral uppercase tracking-widest block">{t('panchangam.tithi')}</span>
                  <span className="font-bold text-secondary block text-xl">{panchangam.tithi}</span>
                </div>
                <div className="text-center space-y-2 p-4 rounded-2xl bg-neutral/10 border border-neutral/20 transition-all hover:bg-base-100 hover:shadow-lg hover:scale-105">
                  <span className="text-[10px] font-bold text-neutral uppercase tracking-widest block">{t('panchangam.nakshatra')}</span>
                  <span className="font-bold text-secondary block text-xl">{panchangam.nakshatra}</span>
                </div>
                <div className="text-center space-y-2 p-4 rounded-2xl bg-error/10 border border-error/20 transition-all hover:bg-base-100 hover:shadow-lg hover:scale-105">
                  <span className="text-[10px] font-bold text-error uppercase tracking-widest block">{t('panchangam.rahu')}</span>
                  <span className="font-bold text-error block text-xl">{panchangam.rahuKalam}</span>
                </div>
                <div className="text-center space-y-2 p-4 rounded-2xl bg-accent/10 border border-accent/20 transition-all hover:bg-base-100 hover:shadow-lg hover:scale-105">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest block">{t('panchangam.day')}</span>
                  <span className="font-bold text-primary block text-xl">{panchangam.weekday}</span>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-neutral/50">
                <div className="animate-spin w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full mx-auto"></div>
              </div>
            )}
          </div>

          <section className="bg-gradient-to-br from-primary/10 to-secondary/10 p-10 rounded-[2rem] shadow-xl border-t-4 border-primary relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
            <h2 className="text-4xl font-bold text-secondary mb-8 flex items-center gap-4 font-header relative z-10">
              <Logo className="w-14 h-14" size={56} />
              <span className="relative">
                {t('history.summary_title')}
                <div className="absolute -bottom-2 left-0 w-2/3 h-1 bg-gradient-to-r from-accent to-primary rounded-full"></div>
              </span>
            </h2>
            <div className="space-y-6 text-neutral-content leading-relaxed text-lg text-justify font-light relative z-10">
              <p>
                {language === 'en'
                  ? 'Lord Venkateswara, the Lord of the Universe, manifested as Venkateswara Swamy in this Kali Yuga for the sake of His devotees. This sacred hill in Pendurthi is known as "Uttharandhra Tirupati".'
                  : 'అఖిలాండ కోటి బ్రహ్మాండనాయకుడు భక్తుల కోసం కలియుగంలో వేంకటేశ్వరస్వామిగా అవతరించాడు. పెందుర్తి క్షేత్రం "ఉత్తరాంధ్ర తిరుపతి"గా విరాజిల్లుతోంది.'}
              </p>
              <div className="pt-6">
                <Link to="/history" className="inline-flex items-center gap-3 bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-secondary transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
                  <ScrollText className="w-5 h-5" /> {t('history.read_more')}
                </Link>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-[2rem] shadow-xl border border-neutral/20 p-8 transform hover:scale-[1.01] transition-all duration-500">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-secondary flex items-center gap-3">
                <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
                  <TrendingUp className="w-6 h-6" />
                </div>
                {t('stats.title')}
              </h2>
              <span className="text-sm font-bold text-neutral">{t('stats.visitor_trend')}</span>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={statsData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1A202C" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#1A202C" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#718096', fontSize: 12 }} dy={10} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: '#1A202C', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#F6E05E" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-secondary mb-8 flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-xl text-primary shadow-sm">
                <Calendar className="w-6 h-6" />
              </div>
              {t('news.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {dynamicNews.map((news, index) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-base-100 rounded-[2rem] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral/20 flex flex-col h-full group transform hover:-translate-y-2"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">{news.date}</span>
                    </div>
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors leading-snug">{news.title}</h3>
                    <p className="text-neutral-content text-sm line-clamp-3 mb-6 leading-relaxed font-light flex-grow">{news.description}</p>
                    <button className="mt-auto text-primary text-sm font-bold flex items-center hover:gap-3 transition-all self-start group/btn">
                      {t('news.read_more')} <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-10">
          <div className="bg-base-100/80 backdrop-blur-3xl rounded-[2rem] shadow-xl overflow-hidden border border-neutral/20 ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-700">
            <div className="bg-gradient-to-br from-primary to-secondary p-8 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl opacity-50"></div>
              <h2 className="text-2xl font-bold flex items-center gap-3 relative z-10">
                <Clock className="w-7 h-7 text-accent" /> {t('timings.title')}
              </h2>
            </div>
            <div className="p-4 space-y-2">
              {DARSHAN_TIMINGS(language).map((timing, idx) => (
                <div key={idx} className="p-5 hover:bg-primary/10 transition-all group rounded-xl border border-transparent hover:border-primary/20 hover:shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-secondary group-hover:text-primary transition-colors text-md">{timing.period}</h4>
                    <span className="text-xs font-bold bg-base-100 px-3 py-1.5 rounded-lg text-primary border border-primary/20 shadow-sm">{timing.time}</span>
                  </div>
                  <p className="text-sm text-neutral-content font-light group-hover:text-secondary transition-colors">{timing.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Link to="/gallery" className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-8 rounded-[1.5rem] shadow-lg hover:shadow-purple-400/50 transition-all group hover:-translate-y-1.5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
              <div className="bg-white/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/20">
                <Moon className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-1">{t('nav.gallery')}</h4>
              <p className="text-white/70 text-sm font-light">View divine darshan images.</p>
            </Link>
            <Link to="/audio" className="bg-gradient-to-br from-rose-500 to-red-700 text-white p-8 rounded-[1.5rem] shadow-lg hover:shadow-rose-400/50 transition-all group hover:-translate-y-1.5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
              <div className="bg-white/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/20">
                <Flower className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-1">{t('nav.audio')}</h4>
              <p className="text-white/70 text-sm font-light">Listen to devotional songs.</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full bg-gradient-to-t from-neutral/10 to-base-100 py-24 mt-12 border-t-2 border-neutral/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-secondary font-header mb-4">{t('address.title')}</h2>
            <div className="h-1.5 w-40 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div className="bg-base-100 p-3 rounded-[2.5rem] shadow-2xl border border-neutral/20 h-[550px] w-full relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.243542288005!2d83.1979683148816!3d17.82717098781622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3968b3f2f0b4b3%3A0x5f5f5f5f5f5f5f5f!2sSri%20Venkateswara%20Swamy%20Devasthanam%2C%20Pendurthi!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%" height="100%" style={{ border: 0, borderRadius: '2rem' }} allowFullScreen={true} loading="lazy" title="Location"
                className="grayscale group-hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>

            <div className="bg-base-100 rounded-[2.5rem] shadow-2xl border border-neutral/20 p-10 flex flex-col justify-center h-full relative overflow-hidden">
              <div className="absolute -top-4 -right-4 p-8">
                <Sparkles className="text-accent w-16 h-16 opacity-20 animate-pulse" />
              </div>
              <div className="flex items-center gap-5 mb-8 border-b border-neutral/20 pb-8">
                <Logo className="w-16 h-16" size={64} />
                <h3 className="text-3xl font-bold text-secondary font-header">
                  {t('hero.title')}
                </h3>
              </div>
              <div className="space-y-8">
                <div className="flex items-start gap-5 group">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary text-lg mb-1">{language === 'en' ? 'Address' : 'చిరునామా'}</h4>
                    <p className="text-neutral-content leading-relaxed text-md font-light">
                      {language === 'en' ? 'Main Road, Pendurthi,' : 'మెయిన్ రోడ్, పెందుర్తి,'}<br />
                      {language === 'en' ? 'Visakhapatnam District,' : 'విశాఖపట్నం జిల్లా,'}<br />
                      {language === 'en' ? 'Andhra Pradesh - 531173' : 'ఆంధ్రప్రదేశ్ - 531173'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-5 group">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm"><Phone className="w-7 h-7" /></div>
                  <div>
                    <h4 className="font-bold text-secondary text-lg mb-1">Phone</h4>
                    <p className="text-secondary font-semibold text-md">+91 98480 12345</p>
                  </div>
                </div>
              </div>
              <div className="mt-10 pt-8 border-t border-neutral/20">
                <a href="https://maps.app.goo.gl/FDAGKe21hb2nYG9x5" target="_blank" className="relative group overflow-hidden flex items-center justify-center gap-3 w-full bg-gradient-to-r from-neutral-800 to-black text-white font-bold py-4 rounded-xl transition-all transform hover:-translate-y-1 shadow-lg">
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 shimmer-bg"></div>
                  <MapPin className="w-5 h-5 text-accent" /> {t('address.get_directions')}
                </a>
                <p className="text-xs text-neutral italic text-center mt-5 font-light">
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
