
import React, { useState, useEffect } from 'react';
import { X, Download, ZoomIn } from 'lucide-react';
import { GALLERY_IMAGES } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [dynamicGallery, setDynamicGallery] = useState<any[]>([]);
  const { t } = useLanguage();

  const loadData = () => {
    const stored = localStorage.getItem('temple_gallery');
    setDynamicGallery(stored ? JSON.parse(stored) : GALLERY_IMAGES);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('storage_update', loadData);
    return () => window.removeEventListener('storage_update', loadData);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-saffron-700 font-header mb-8 text-center">{t('gallery.title')}</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dynamicGallery.map((img) => (
          <div 
            key={img.id} 
            className="relative group aspect-square bg-stone-200 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all"
            onClick={() => setSelectedImage(img.src)}
          >
            <img 
              src={img.src} 
              alt={img.alt} 
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
              <p className="text-white font-medium text-sm">{img.alt}</p>
              <span className="text-xs text-stone-300">{img.category}</span>
            </div>
            <div className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-saffron-500 transition-colors p-2"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="max-w-4xl max-h-[90vh] relative">
            <img 
              src={selectedImage} 
              alt="Full view" 
              className="max-w-full max-h-[85vh] rounded-md shadow-2xl"
            />
            <div className="mt-4 flex justify-center">
              <a 
                href={selectedImage} 
                download
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-saffron-600 text-white px-6 py-2 rounded-full hover:bg-saffron-700 transition-colors"
              >
                <Download className="w-4 h-4" /> {t('gallery.download_wallpaper')}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
