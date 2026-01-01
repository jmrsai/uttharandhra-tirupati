
import React from 'react';
import { Calendar, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const History: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="w-full">
      <div className="relative h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://yt3.googleusercontent.com/7y8KChJI_huixiWRFJGfK9-t5E3d7LMvZQN7QdJ2VHdTn8MIwFIH9Mohj0mKmaSGzWlns_ujRQ=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj')] bg-cover bg-center bg-fixed">
           <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center p-4">
           <div>
             <h1 className="text-4xl md:text-6xl font-bold text-accent font-header drop-shadow-lg mb-4">
               {t('history.page_title')}
             </h1>
             <p className="text-neutral-content text-xl max-w-2xl mx-auto">
               {t('history.page_subtitle')}
             </p>
           </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        <section className="bg-base-100 p-8 rounded-2xl shadow-lg border-l-4 border-primary transform hover:-translate-y-1 transition-transform duration-300">
           <h2 className="text-2xl font-bold text-secondary mb-4 font-header flex items-center gap-2">
             <Info className="w-6 h-6" /> {t('history.legend_title')}
           </h2>
           <p className="text-lg text-neutral-content leading-relaxed text-justify">
             {t('history.legend_desc1')}
           </p>
           <p className="text-lg text-neutral-content leading-relaxed text-justify mt-4">
             {t('history.legend_desc2')}
           </p>
        </section>

        <section className="bg-base-100 p-8 rounded-2xl shadow-lg border-r-4 border-primary transform hover:-translate-y-1 transition-transform duration-300">
           <h2 className="text-2xl font-bold text-secondary mb-4 font-header flex items-center gap-2">
             <Calendar className="w-6 h-6" /> {t('history.construct_title')}
           </h2>
           <div className="flex flex-col md:flex-row gap-6 items-center">
             <div className="flex-1">
               <p className="text-lg text-neutral-content leading-relaxed text-justify">
                 {t('history.construct_desc')}
               </p>
               <ul className="mt-4 space-y-2 text-neutral-content">
                 <li className="flex gap-2">
                   <span className="text-primary font-bold">➢</span>
                   <span>{t('history.year1')}</span>
                 </li>
                 <li className="flex gap-2">
                   <span className="text-primary font-bold">➢</span>
                   <span>{t('history.year2')}</span>
                 </li>
               </ul>
             </div>
             <div className="w-full md:w-1/3">
                <img src="https://yt3.googleusercontent.com/7y8KChJI_huixiWRFJGfK9-t5E3d7LMvZQN7QdJ2VHdTn8MIwFIH9Mohj0mKmaSGzWlns_ujRQ=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj" alt="Temple" className="rounded-lg shadow-md border-2 border-neutral/20" />
             </div>
           </div>
        </section>

        <section className="bg-gradient-to-br from-neutral/10 to-base-100 p-8 rounded-2xl shadow-lg border-t-4 border-primary transform hover:-translate-y-1 transition-transform duration-300">
           <h2 className="text-2xl font-bold text-secondary mb-4 font-header">{t('history.significance_title')}</h2>
           <p className="text-lg text-neutral-content leading-relaxed text-justify">
             {t('history.significance_desc')}
           </p>
           <p className="text-lg text-neutral-content leading-relaxed text-justify mt-4 p-4 bg-base-100 rounded-lg border border-neutral/20 shadow-inner">
             <span className="text-primary font-bold text-xl block mb-2">{t('history.dhanur_title')}</span>
             {t('history.dhanur_desc')}
           </p>
        </section>
      </div>
    </div>
  );
};

export default History;