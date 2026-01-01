
import React from 'react';
import { Wifi, Users, MessageCircle, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Live: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="aspect-video bg-black rounded-2xl shadow-lg overflow-hidden relative">
            {/* Replace with your actual live stream embed (e.g., YouTube, Vimeo) */}
            <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/live_stream?channel=UC-lHJZR3Gqxm24_Vd_AJ5Yw&autoplay=1&mute=1"
                title="Live Darshan"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold">
              <Wifi className="w-4 h-4 animate-pulse" /> LIVE
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 text-white px-3 py-1.5 rounded-lg text-sm font-bold backdrop-blur-sm">
              <Users className="w-4 h-4" /> 1,204 {t('live.viewers')}
            </div>
          </div>

          <div className="mt-8">
            <h1 className="text-3xl font-bold text-primary font-header mb-2">{t('live.title')}</h1>
            <p className="text-secondary text-lg">{t('live.subtitle')}</p>
          </div>
        </div>

        <div className="bg-base-100 rounded-2xl shadow-lg border border-neutral/20 flex flex-col">
          <div className="p-4 border-b border-neutral/20">
            <h2 className="font-bold text-secondary flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" /> {t('live.chat_title')}
            </h2>
          </div>

          <div className="flex-grow p-4 space-y-4 overflow-y-auto h-96">
            {/* Chat messages */}
            <div className="flex gap-2">
              <div className="font-bold text-primary">Govinda:</div>
              <div className="text-secondary">Om Namo Venkatesaya!</div>
            </div>
            <div className="flex gap-2">
              <div className="font-bold text-accent">Srinivasa:</div>
              <div className="text-secondary">Jai Balaji!</div>
            </div>
             <div className="flex gap-2">
              <div className="font-bold text-blue-500">Padmavati:</div>
              <div className="text-secondary">Dhanyavaadalu for this seva.</div>
            </div>
            <div className="flex gap-2">
              <div className="font-bold text-green-500">Gopala:</div>
              <div className="text-secondary">Watching from USA. Thanks for the stream.</div>
            </div>
          </div>

          <div className="p-4 border-t border-neutral/20 mt-auto">
            <div className="relative">
              <input 
                type="text"
                placeholder={t('live.chat_placeholder')}
                className="w-full bg-neutral/20 border border-neutral/30 rounded-lg pl-4 pr-12 py-2 focus:ring-2 focus:ring-primary outline-none"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:text-accent">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Live;
