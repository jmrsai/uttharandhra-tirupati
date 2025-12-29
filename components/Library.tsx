
import React from 'react';
import { Download, BookOpen } from 'lucide-react';
import { BOOKS } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const Library: React.FC = () => {
  const { language, t } = useLanguage();
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-saffron-700 font-header">{t('library.title')}</h1>
        <p className="text-stone-600 mt-2 max-w-2xl mx-auto">
          {t('library.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {BOOKS(language).map((book) => (
          <div key={book.id} className="bg-white p-4 rounded-xl shadow-md border border-stone-100 flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:shadow-xl">
            <div className="w-32 h-48 bg-stone-200 rounded shadow-inner mb-4 overflow-hidden relative group">
              <img 
                src={book.coverImage} 
                alt={book.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <BookOpen className="text-white w-8 h-8" />
              </div>
            </div>
            
            <h3 className="font-bold text-stone-800 text-lg mb-1">{book.title}</h3>
            <p className="text-sm text-stone-500 mb-4">{book.author}</p>
            
            <button className="mt-auto w-full flex items-center justify-center gap-2 bg-saffron-50 text-saffron-700 py-2 rounded-lg border border-saffron-200 hover:bg-saffron-600 hover:text-white transition-all">
              <Download className="w-4 h-4" />
              {t('library.download')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;