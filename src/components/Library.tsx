
import React from 'react';
import { Download, BookOpen, Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Skeleton } from './Skeleton';
import { BOOKS } from '../constants/constants';
import { useLanguage } from '../context/LanguageContext';
import { supabaseService } from '../services/supabaseService';

const Library: React.FC = () => {
  const { language, t } = useLanguage();
  const [dynamicBooks, setDynamicBooks] = React.useState<any[]>(BOOKS(language));

  const loadData = async () => {
    try {
      const sbBooks = await supabaseService.getBooks();
      if (sbBooks && sbBooks.length > 0) {
        setDynamicBooks(sbBooks);
      }
    } catch (err) {
      console.error("Library books load failed", err);
    }
  };

  React.useEffect(() => {
    loadData();
  }, [language]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-secondary font-header mb-6"
        >
          {t('library.title')}
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
          {t('library.subtitle')}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {dynamicBooks.map((book, index) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-neutral/10 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:-translate-y-2 group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="w-40 h-56 bg-neutral/5 rounded-2xl shadow-inner mb-6 overflow-hidden relative">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all backdrop-blur-[2px]">
                <div className="bg-white p-3 rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-500">
                  <BookOpen className="text-primary w-6 h-6" />
                </div>
              </div>
            </div>

            <h3 className="font-bold text-secondary text-xl mb-2 font-header group-hover:text-primary transition-colors">{book.title}</h3>
            <p className="text-sm text-neutral-content mb-6 font-medium italic">by {book.author}</p>

            <button className="mt-auto w-full flex items-center justify-center gap-3 bg-base-100 text-secondary py-4 rounded-2xl border border-neutral/10 hover:bg-primary hover:text-white transition-all font-bold shadow-sm hover:shadow-primary/30">
              <Download className="w-5 h-5" />
              {t('library.download')}
            </button>
            <Sparkles className="absolute bottom-4 right-4 w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Library;