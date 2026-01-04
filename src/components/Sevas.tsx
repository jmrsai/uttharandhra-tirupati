
import React, { useState, useEffect } from 'react';
import { Flower, Clock, CalendarCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { SEVAS } from '../constants/constants';
import { useLanguage } from '../context/LanguageContext';

const Sevas: React.FC = () => {
  const { language, t } = useLanguage();
  const [dynamicSevas, setDynamicSevas] = useState<any[]>([]);

  const loadData = () => {
    const stored = localStorage.getItem('temple_sevas');
    setDynamicSevas(stored ? JSON.parse(stored) : SEVAS(language));
  };

  useEffect(() => {
    loadData();
    window.addEventListener('storage_update', loadData);
    return () => window.removeEventListener('storage_update', loadData);
  }, [language]);

  const handleBookNow = (sevaName: string) => {
    console.log(`Booking seva: ${sevaName}`);
    // In a real application, you might navigate to a booking page or open a modal here.
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-secondary font-header mb-6"
        >
          {t('sevas.title')}
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 100 }}
          className="h-1.5 bg-accent mx-auto mb-6 rounded-full"
        ></motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-neutral-content max-w-2xl mx-auto text-xl font-light"
        >
          {t('sevas.subtitle')}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dynamicSevas.map((seva, index) => (
          <motion.div
            key={seva.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2.5rem] shadow-lg overflow-hidden border border-neutral/10 hover:shadow-2xl transition-all group"
          >
            <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 border-b border-neutral/10 flex justify-between items-start">
              <h3 className="text-2xl font-bold text-secondary group-hover:text-primary transition-colors">{seva.name}</h3>
              <div className="bg-accent/20 p-2 rounded-xl text-accent group-hover:rotate-12 transition-transform">
                <Flower className="w-6 h-6" />
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center text-neutral-content bg-base-100 p-3 rounded-2xl border border-neutral/10">
                <Clock className="w-5 h-5 mr-4 text-primary" />
                <span className="font-bold text-secondary">{seva.time}</span>
              </div>
              <div className="flex items-center text-neutral-content bg-base-100 p-3 rounded-2xl border border-neutral/10">
                <CalendarCheck className="w-5 h-5 mr-4 text-primary" />
                <span className="font-bold text-secondary">{seva.availability}</span>
              </div>
              <p className="text-neutral-content text-md leading-relaxed font-light line-clamp-3">{seva.description}</p>
              <button
                onClick={() => handleBookNow(seva.name)}
                className="w-full relative overflow-hidden px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-secondary focus:ring-4 focus:ring-primary/20 transition-all transform hover:-translate-y-1 active:scale-95 shadow-lg flex items-center justify-center gap-3"
              >
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 shimmer-bg"></div>
                <Sparkles className="w-5 h-5 text-accent" />
                {t('hero.book_sevas')}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Sevas;