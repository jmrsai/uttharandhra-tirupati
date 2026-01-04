
import React, { useEffect, useState } from 'react';
import { Youtube, PlayCircle, Loader2, Radio, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Skeleton } from './Skeleton';
import { VIDEOS, YOUTUBE_CONFIG } from '../constants/constants';
import { VideoItem } from '../types/types';
import { useLanguage } from '../context/LanguageContext';

const Videos: React.FC = () => {
  const [liveVideo, setLiveVideo] = useState<VideoItem | null>(null);
  const [videos, setVideos] = useState<VideoItem[]>(VIDEOS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useLanguage();

  const fetchYoutubeData = async () => {
    if (!YOUTUBE_CONFIG.API_KEY) {
      console.warn("YouTube API Key is missing. Using static fallback data.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let channelId = YOUTUBE_CONFIG.CHANNEL_ID;

      // Step 1: Resolve Channel ID if missing, using Handle
      if (!channelId && YOUTUBE_CONFIG.CHANNEL_HANDLE) {
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(YOUTUBE_CONFIG.CHANNEL_HANDLE)}&key=${YOUTUBE_CONFIG.API_KEY}`;
        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();

        if (searchData.items && searchData.items.length > 0) {
          channelId = searchData.items[0].id.channelId;
        }
      }

      if (!channelId) {
        throw new Error("Could not resolve Channel ID");
      }

      // Step 2: Fetch Live Video
      const liveUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${YOUTUBE_CONFIG.API_KEY}`;
      const liveRes = await fetch(liveUrl);
      const liveData = await liveRes.json();

      if (liveData.items && liveData.items.length > 0) {
        const item = liveData.items[0];
        setLiveVideo({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          url: `https://www.youtube.com/embed/${item.id.videoId}`
        });
      } else {
        setLiveVideo(null);
      }

      // Step 3: Fetch Recent Uploads
      const videosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=9&key=${YOUTUBE_CONFIG.API_KEY}`;
      const videosRes = await fetch(videosUrl);
      const videosData = await videosRes.json();

      if (videosData.items) {
        const fetchedVideos = videosData.items.map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          url: `https://www.youtube.com/embed/${item.id.videoId}`
        }));
        // Filter out the live video if it appears in the recent list to avoid duplication (optional, but good UX)
        const filteredVideos = liveData.items && liveData.items.length > 0
          ? fetchedVideos.filter((v: VideoItem) => v.id !== liveData.items[0].id.videoId)
          : fetchedVideos;

        setVideos(filteredVideos);
      }

    } catch (err) {
      console.error("Failed to fetch YouTube data", err);
      setError(language === 'en' ? "Unable to load latest videos from YouTube. Showing archived collection." : "YouTube నుండి తాజా వీడియోలను లోడ్ చేయడం సాధ్యం కాలేదు. ఆర్కైవ్ చేసిన సేకరణను చూపిస్తున్నాము.");
      // Fallback is already set in initial state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYoutubeData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-b border-neutral/10 pb-8">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold text-secondary font-header"
          >
            {language === 'en' ? 'Divine Video Gallery' : 'దైవిక వీడియో గ్యాలరీ'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-content mt-2 text-lg font-light"
          >
            {language === 'en' ? 'Exclusive coverage of rituals and festival celebrations.' : 'స్వామివారి సేవలు మరియు ఉత్సవాల ప్రత్యేక వీడియోలు'}
          </motion.p>
        </div>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://youtube.com/@ramanujampendurthi1012?si=WP3h_YCcE4tArZJA"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-red-600 text-white px-8 py-3 rounded-2xl hover:bg-red-700 transition-all shadow-lg hover:shadow-red-200"
        >
          <Youtube className="w-6 h-6" />
          <span className="font-bold">{language === 'en' ? 'Subscribe' : 'సబ్స్క్రైబ్ చేయండి'}</span>
        </motion.a>
      </div>

      {loading && (
        <div className="flex justify-center py-10">
          <Loader2 className="w-10 h-10 text-saffron-600 animate-spin" />
        </div>
      )}

      {/* Live Stream Section */}
      {liveVideo && (
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <h2 className="text-xl font-bold text-red-600 flex items-center gap-2 uppercase tracking-wider">
              <Radio className="w-5 h-5" /> {language === 'en' ? 'Live Now' : 'లైవ్'}: {liveVideo.title}
            </h2>
          </div>
          <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-red-500">
            <iframe
              className="w-full h-full"
              src={`${liveVideo.url}?autoplay=1&mute=1`}
              title={liveVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Featured/Latest Video (if not live) */}
      {!liveVideo && !loading && videos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-3">
            <PlayCircle className="text-primary w-7 h-7" /> {language === 'en' ? 'Latest Uplifts' : 'తాజా వీడియో'}
          </h2>
          <div className="w-full aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border border-neutral/10">
            <iframe
              className="w-full h-full"
              src={videos[0].url}
              title="Featured Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <h3 className="mt-6 text-2xl font-bold text-secondary font-header">{videos[0].title}</h3>
        </motion.div>
      )}

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-video rounded-[2rem]" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          ))}
        </div>
      )}

      {/* Video Grid */}
      <h2 className="text-xl font-bold text-stone-800 mb-6">
        {language === 'en' ? 'Other Videos' : 'ఇతర వీడియోలు'}
      </h2>

      {error && (
        <div className="bg-orange-50 border border-orange-200 text-orange-800 px-4 py-3 rounded mb-6 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(!liveVideo && videos.length > 0 ? videos.slice(1) : videos).map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] shadow-lg overflow-hidden hover:shadow-2xl transition-all group flex flex-col h-full border border-neutral/10"
          >
            <div className="relative aspect-video">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/30 backdrop-blur-md p-4 rounded-full">
                  <PlayCircle className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-bold text-secondary line-clamp-2 mb-4 text-lg leading-tight group-hover:text-primary transition-colors">{video.title}</h3>
              <div className="mt-auto pt-4 flex items-center justify-between border-t border-neutral/5">
                <a
                  href={video.url.replace('embed/', 'watch?v=')}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-primary hover:text-secondary uppercase tracking-widest flex items-center gap-2 transition-colors"
                >
                  <Youtube className="w-5 h-5 text-red-600" /> {language === 'en' ? 'Watch on YouTube' : 'యూట్యూబ్‌లో చూడండి'}
                </a>
                <Sparkles className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
