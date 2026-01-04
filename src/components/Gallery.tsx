
import React, { useState, useEffect } from 'react';
import { X, Download, ZoomIn, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from './Skeleton';
import { GALLERY_IMAGES } from '../constants/constants';
import { useLanguage } from '../context/LanguageContext';
import { supabaseService } from '../services/supabaseService';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [dynamicGallery, setDynamicGallery] = useState<any[]>(GALLERY_IMAGES);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  const loadData = async () => {
    try {
      const sbGallery = await supabaseService.getGallery();
      if (sbGallery && sbGallery.length > 0) {
        setDynamicGallery(sbGallery);
      } else {
        const stored = localStorage.getItem('temple_gallery');
        setDynamicGallery(stored ? JSON.parse(stored) : GALLERY_IMAGES);
      }
    } catch (err) {
      console.error("Gallery supabased load failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener('storage_update', loadData);
    return () => {
      window.removeEventListener('storage_update', loadData);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-primary font-header mb-8 text-center">{t('gallery.title')}</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array(8).fill(0).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-3xl" />
          ))
          : dynamicGallery.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="relative group aspect-square bg-neutral/5 rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all border border-neutral/10"
              onClick={() => setSelectedImage(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <p className="text-white font-bold text-lg mb-1">{img.alt}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-accent font-bold uppercase tracking-widest bg-accent/20 px-2 py-0.5 rounded-md backdrop-blur-md">{img.category}</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-xl text-white opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100">
                <ZoomIn className="w-5 h-5" />
              </div>
            </motion.div>
          ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-8 right-8 text-white hover:text-accent transition-colors p-3 bg-white/10 rounded-full backdrop-blur-md"
            >
              <X className="w-8 h-8" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-5xl max-h-[90vh] relative"
            >
              <img
                src={selectedImage}
                alt="Full view"
                className="max-w-full max-h-[80vh] rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-white/10"
              />
              <div className="mt-8 flex justify-center">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={selectedImage}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-2xl hover:bg-secondary transition-all shadow-xl font-bold text-lg"
                >
                  <Download className="w-5 h-5" /> {t('gallery.download_wallpaper')}
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
