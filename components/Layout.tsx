
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { 
  Menu, X, MessageCircle, HeartHandshake, Bell, MapPin, 
  Languages, Settings, MessageSquare, UserCircle, Sparkles,
  ChevronRight, Trash2, CheckCheck
} from 'lucide-react';
import { NAV_ITEMS, SCROLL_NEWS } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { useNotifications } from '../context/NotificationContext';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const location = useLocation();
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(false);
    setIsNotifOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav className="bg-saffron-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl md:text-2xl font-bold font-header tracking-wide text-white drop-shadow-md flex items-center gap-3 group">
                <Logo className="w-10 h-10 ring-2 ring-white/30 group-hover:scale-110 transition-transform duration-300" size={40} />
                <span className="leading-tight">
                  {t('hero.title')}
                </span>
              </Link>
            </div>
            
            <div className="hidden lg:flex items-center space-x-1">
              {NAV_ITEMS(t).map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-saffron-800 text-gold-500 shadow-inner scale-105'
                        : 'hover:bg-saffron-500 text-white hover:scale-105'
                    }`
                  }
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
              
              <div className="ml-4 pl-4 border-l border-saffron-500 flex items-center gap-3">
                <div className="relative" ref={notifRef}>
                  <button 
                    onClick={() => setIsNotifOpen(!isNotifOpen)}
                    className="p-2 rounded-xl hover:bg-saffron-500 transition-colors relative group"
                  >
                    <Bell className={`w-6 h-6 ${unreadCount > 0 ? 'animate-bounce text-gold-300' : ''}`} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-saffron-600 shadow-lg">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {isNotifOpen && (
                    <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden animate-in fade-in zoom-in duration-200">
                      <div className="p-4 bg-saffron-50 border-b border-saffron-100 flex justify-between items-center">
                        <h4 className="font-bold text-saffron-900 flex items-center gap-2">
                          <Bell className="w-4 h-4" /> Divine Alerts
                        </h4>
                        {unreadCount > 0 && (
                          <button 
                            onClick={markAllAsRead}
                            className="text-[10px] font-bold text-saffron-600 hover:underline flex items-center gap-1"
                          >
                            <CheckCheck className="w-3 h-3" /> Mark all read
                          </button>
                        )}
                      </div>
                      <div className="max-h-[400px] overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-10 text-center">
                            <Bell className="w-10 h-10 text-stone-100 mx-auto mb-3" />
                            <p className="text-stone-400 text-xs font-bold uppercase tracking-widest">No alerts yet</p>
                          </div>
                        ) : (
                          notifications.map((notif) => (
                            <div 
                              key={notif.id}
                              className={`p-4 border-b border-stone-50 hover:bg-stone-50 transition-colors relative group ${!notif.isRead ? 'bg-saffron-50/30' : ''}`}
                              onClick={() => markAsRead(notif.id)}
                            >
                              {!notif.isRead && (
                                <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-saffron-600 rounded-full"></div>
                              )}
                              <div className="flex justify-between items-start mb-1">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border uppercase tracking-widest ${
                                  notif.category === 'Festival' ? 'bg-purple-100 border-purple-200 text-purple-700' :
                                  notif.category === 'Seva' ? 'bg-orange-100 border-orange-200 text-orange-700' :
                                  'bg-stone-100 border-stone-200 text-stone-700'
                                }`}>
                                  {notif.category}
                                </span>
                                <span className="text-[10px] text-stone-400 font-medium">
                                  {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <h5 className="text-sm font-bold text-stone-800 mb-1">{notif.title}</h5>
                              <p className="text-xs text-stone-500 line-clamp-2">{notif.message}</p>
                            </div>
                          ))
                        )}
                      </div>
                      <Link to="/news" className="block p-3 text-center text-xs font-bold text-saffron-600 hover:bg-saffron-50 transition-colors border-t border-stone-100">
                        View All News & Updates
                      </Link>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 bg-saffron-700/50 p-1 rounded-lg border border-saffron-500/30">
                  <button 
                    onClick={() => setLanguage('en')}
                    className={`px-2 py-1 text-[10px] font-bold rounded transition-colors ${language === 'en' ? 'bg-gold-500 text-saffron-900 shadow-sm' : 'text-saffron-100 hover:text-white'}`}
                  >
                    EN
                  </button>
                  <button 
                    onClick={() => setLanguage('te')}
                    className={`px-2 py-1 text-[10px] font-bold rounded font-telugu transition-colors ${language === 'te' ? 'bg-gold-500 text-saffron-900 shadow-sm' : 'text-saffron-100 hover:text-white'}`}
                  >
                    తెలుగు
                  </button>
                </div>

                <Link 
                  to="/login"
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                    location.pathname === '/login' 
                      ? 'bg-white text-saffron-600 shadow-lg' 
                      : 'bg-saffron-700 hover:bg-white hover:text-saffron-600 border border-saffron-500'
                  }`}
                >
                  <UserCircle className="w-5 h-5" />
                  {language === 'en' ? 'Login' : 'లాగిన్'}
                </Link>
              </div>
            </div>

            <div className="flex items-center lg:hidden gap-3">
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2 bg-saffron-700 rounded-lg text-white relative"
              >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>}
              </button>
              <Link to="/login" className="p-2 bg-saffron-700 rounded-lg text-white">
                <UserCircle className="w-6 h-6" />
              </Link>
              <button 
                onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
                className="p-2 bg-saffron-700 rounded-lg flex items-center gap-1 text-[10px] font-bold border border-saffron-500"
              >
                <Languages className="w-4 h-4" />
                {language === 'en' ? 'తెలుగు' : 'EN'}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-saffron-500 focus:outline-none"
              >
                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-saffron-700 shadow-xl border-t border-saffron-500">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {NAV_ITEMS(t).map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${
                      isActive
                        ? 'bg-saffron-900 text-white pl-4 border-l-4 border-gold-500'
                        : 'text-white hover:bg-saffron-500'
                    }`
                  }
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
              <NavLink
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 text-gold-400 bg-saffron-800"
              >
                <UserCircle className="w-5 h-5" />
                {language === 'en' ? 'Devotee Login' : 'భక్తుల లాగిన్'}
              </NavLink>
            </div>
          </div>
        )}
      </nav>
      
      <div className="bg-saffron-900 text-gold-500 text-sm py-2 overflow-hidden relative shadow-md">
         <div className="max-w-7xl mx-auto px-4 flex items-center">
            <span className="bg-saffron-800 px-2 py-0.5 rounded text-white text-[10px] font-bold mr-2 flex items-center flex-shrink-0 z-10 border border-saffron-700">
              <Bell className="w-3 h-3 mr-1" /> Updates
            </span>
            <div className="overflow-hidden whitespace-nowrap flex-grow mask-gradient-right">
              <div className="animate-marquee inline-block">
                {SCROLL_NEWS(language).map((news, i) => (
                  <span key={i} className="mx-8 inline-flex items-center font-medium">
                    <Sparkles className="w-3 h-3 mr-2 opacity-50" /> {news}
                  </span>
                ))}
              </div>
            </div>
         </div>
      </div>
    </>
  );
};

const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 mt-auto border-t-4 border-saffron-600 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Logo className="w-12 h-12" size={48} />
            <h3 className="text-2xl font-bold text-saffron-500 font-header">
              {t('hero.title')}
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-stone-400 text-justify">
            {language === 'en' 
              ? 'Known as Uttharandhra Tirupati, Pendurthi Sri Venkateswara Swamy Temple is a divine destination for all devotees seeking spiritual peace and divine blessings.' 
              : 'ఉత్తరాంధ్ర తిరుపతిగా ప్రసిద్ధి చెందిన పెందుర్తి శ్రీ వెంకటేశ్వర స్వామి వారి ఆలయం. భక్తులకు సకల శుభాలను ప్రసాదించే కలియుగ దైవం.'}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/admin" className="text-[10px] uppercase tracking-wider font-bold text-stone-500 hover:text-stone-300 flex items-center gap-1 bg-stone-800/50 px-3 py-1.5 rounded-lg border border-stone-700 transition-colors">
              <Settings className="w-3 h-3" /> Admin Portal
            </Link>
            <Link to="/feedback" className="text-[10px] uppercase tracking-wider font-bold text-stone-500 hover:text-stone-300 flex items-center gap-1 bg-stone-800/50 px-3 py-1.5 rounded-lg border border-stone-700 transition-colors">
              <MessageSquare className="w-3 h-3" /> Feedback
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-bold text-white mb-2 border-b border-stone-800 pb-2">{language === 'en' ? 'Quick Links' : 'ముఖ్యమైన లింకులు'}</h3>
          <a href="https://whatsapp.com/channel/0029Vap96ByFnSzG0KocMq1y" className="flex items-center gap-3 text-stone-400 hover:text-green-400 transition-all group">
            <div className="bg-stone-800 p-2 rounded-lg group-hover:bg-green-500 group-hover:text-white transition-all">
              <MessageCircle className="w-5 h-5" />
            </div>
            WhatsApp Channel
          </a>
          <a href="https://www.tirumala.org/" className="flex items-center gap-3 text-stone-400 hover:text-saffron-400 transition-all group">
            <div className="bg-stone-800 p-2 rounded-lg group-hover:bg-saffron-600 group-hover:text-white transition-all">
              <HeartHandshake className="w-5 h-5" />
            </div>
            TTD Official Website
          </a>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-4 border-b border-stone-800 pb-2">{language === 'en' ? 'Contact' : 'సంప్రదించండి'}</h3>
          <div className="space-y-3 text-stone-400">
            <p className="text-sm font-medium text-stone-300">{language === 'en' ? 'Sri Venkatadri Devasthanam,' : 'శ్రీ వెంకటాద్రి దేవస్థానం,'}</p>
            <p className="text-sm">{language === 'en' ? 'Pendurthi, Visakhapatnam,' : 'పెందుర్తి, విశాఖపట్నం,'}</p>
            <p className="text-sm">{language === 'en' ? 'Andhra Pradesh - 531173' : 'ఆంధ్రప్రదేశ్ - 531173'}</p>
            <div className="pt-4">
              <a href="https://maps.app.goo.gl/FDAGKe21hb2nYG9x5" target="_blank" className="inline-flex items-center gap-2 bg-saffron-900/50 text-saffron-400 hover:bg-saffron-600 hover:text-white px-5 py-2 rounded-xl transition-all text-sm font-bold border border-saffron-800">
                <MapPin className="w-4 h-4" /> Google Maps Location
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-stone-800 text-center text-[10px] text-stone-600 uppercase tracking-[0.2em] font-bold">
        © 2025 Sri Venkatadri Devasthanam • Pendurthi • Om Namo Venkatesaya
      </div>
    </footer>
  );
};

const Layout: React.FC = () => {
  const { language } = useLanguage();
  return (
    <div className={`min-h-screen flex flex-col bg-stone-50 selection:bg-saffron-200 selection:text-saffron-900 ${language === 'te' ? 'font-telugu' : 'font-sans'}`}>
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
