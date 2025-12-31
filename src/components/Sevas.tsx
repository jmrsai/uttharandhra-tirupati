
import React, { useState, useEffect } from 'react';
import { Flower, Clock, CalendarCheck } from 'lucide-react';
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
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-saffron-700 font-header mb-4">
          {t('sevas.title')}
        </h1>
        <p className="text-stone-600 max-w-2xl mx-auto text-lg">
          {t('sevas.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dynamicSevas.map((seva) => (
          <div key={seva.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-stone-100 hover:shadow-xl transition-all">
            <div className="bg-saffron-50 p-4 border-b border-saffron-100 flex justify-between items-start">
              <h3 className="text-xl font-bold text-saffron-800">{seva.name}</h3>
              <Flower className="text-saffron-400 w-6 h-6" />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center text-stone-600">
                <Clock className="w-5 h-5 mr-3 text-saffron-500" />
                <span className="font-semibold">{seva.time}</span>
              </div>
              <div className="flex items-center text-stone-600">
                <CalendarCheck className="w-5 h-5 mr-3 text-saffron-500" />
                <span className="font-semibold">{seva.availability}</span>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">{seva.description}</p>
              <button
                onClick={() => handleBookNow(seva.name)}
                className="mt-4 px-6 py-2 bg-saffron-600 text-white font-semibold rounded-lg hover:bg-saffron-700 focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:ring-opacity-50 transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sevas;