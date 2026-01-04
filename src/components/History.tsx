
import React from 'react';
import { Calendar, Info, ScrollText, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const History: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="w-full">
      <div className="relative h-[500px] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[url('https://yt3.googleusercontent.com/7y8KChJI_huixiWRFJGfK9-t5E3d7LMvZQN7QdJ2VHdTn8MIwFIH9Mohj0mKmaSGzWlns_ujRQ=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj')] bg-cover bg-center bg-fixed"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-base-100"></div>
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center text-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-accent font-header drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] mb-6">
              {t('history.page_title')}
            </h1>
            <p className="text-white/90 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
              {t('history.page_subtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        <motion.section
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white p-10 rounded-[2.5rem] shadow-xl border-l-[6px] border-primary transform transition-all duration-500 hover:shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-secondary mb-6 font-header flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-2xl text-primary"><Info className="w-7 h-7" /></div>
            {t('history.legend_title')}
          </h2>
          <div className="space-y-4 text-neutral-content text-lg leading-relaxed text-justify font-light">
            <p>{t('history.legend_desc1')}</p>
            <p>{t('history.legend_desc2')}</p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white p-10 rounded-[2.5rem] shadow-xl border-r-[6px] border-primary transform transition-all duration-500 hover:shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-secondary mb-6 font-header flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-2xl text-primary"><Calendar className="w-7 h-7" /></div>
            {t('history.construct_title')}
          </h2>
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-1 space-y-4">
              <p className="text-lg text-neutral-content leading-relaxed text-justify font-light">
                {t('history.construct_desc')}
              </p>
              <ul className="mt-4 space-y-3">
                <li className="flex gap-4 items-center bg-base-100 p-3 rounded-xl border border-neutral/10">
                  <div className="bg-primary text-white p-1 rounded-full"><Sparkles className="w-4 h-4" /></div>
                  <span className="text-secondary font-medium">{t('history.year1')}</span>
                </li>
                <li className="flex gap-4 items-center bg-base-100 p-3 rounded-xl border border-neutral/10">
                  <div className="bg-primary text-white p-1 rounded-full"><Sparkles className="w-4 h-4" /></div>
                  <span className="text-secondary font-medium">{t('history.year2')}</span>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-2/5 group">
              <div className="relative overflow-hidden rounded-[2rem] shadow-lg border-4 border-white">
                <img src="https://yt3.googleusercontent.com/7y8KChJI_huixiWRFJGfK9-t5E3d7LMvZQN7QdJ2VHdTn8MIwFIH9Mohj0mKmaSGzWlns_ujRQ=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj" alt="Temple" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary/5 to-secondary/5 p-10 rounded-[2.5rem] shadow-xl border-t-[6px] border-primary"
        >
          <h2 className="text-3xl font-bold text-secondary mb-6 font-header flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-2xl text-primary"><ScrollText className="w-7 h-7" /></div>
            {t('history.significance_title')}
          </h2>
          <div className="space-y-6 text-neutral-content text-lg leading-relaxed text-justify font-light">
            <p>{t('history.significance_desc')}</p>
            <div className="p-8 bg-white/50 backdrop-blur-md rounded-[2rem] border border-primary/20 shadow-inner group transition-all hover:bg-white/80">
              <span className="text-primary font-bold text-2xl block mb-3 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-accent animate-pulse" />
                {t('history.dhanur_title')}
              </span>
              <p className="text-secondary/80 italic">{t('history.dhanur_desc')}</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default History;
