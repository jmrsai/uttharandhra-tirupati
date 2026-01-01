
import React, { useEffect, useState } from 'react';
import { Youtube, PlayCircle, Loader2, Radio } from 'lucide-react';
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
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-stone-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-saffron-700 font-header">
            {language === 'en' ? 'Videos Section' : 'వీడియోల విభాగం'}
          </h1>
          <p className="text-stone-600 mt-2">
            {language === 'en' ? 'Divine rituals and festival celebrations videos.' : 'స్వామివారి సేవలు మరియు ఉత్సవాల వీడియోలు'}
          </p>
        </div>
        <a 
          href="https://youtube.com/@ramanujampendurthi1012?si=WP3h_YCcE4tArZJA" 
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 md:mt-0 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors shadow-md"
        >
          <Youtube className="w-5 h-5" />
          {language === 'en' ? 'Subscribe' : 'సబ్స్క్రైబ్ చేయండి'}
        </a>
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
        <div className="mb-12">
          <h2 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
            <PlayCircle className="text-saffron-500" /> {language === 'en' ? 'Latest Video' : 'తాజా వీడియో'}
          </h2>
          <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
            <iframe 
              className="w-full h-full"
              src={videos[0].url} 
              title="Featured Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
          <h3 className="mt-4 text-lg font-bold text-stone-800">{videos[0].title}</h3>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(!liveVideo && videos.length > 0 ? videos.slice(1) : videos).map((video) => (
          <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-stone-100">
            <div className="relative aspect-video">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayCircle className="w-12 h-12 text-white" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center lg:hidden opacity-70">
                 <PlayCircle className="w-10 h-10 text-white drop-shadow-lg" />
              </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-bold text-stone-800 line-clamp-2 mb-2 text-sm md:text-base leading-snug">{video.title}</h3>
              <div className="mt-auto pt-2">
                  <a 
                    href={video.url.replace('embed/', 'watch?v=')} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs font-bold text-saffron-600 hover:text-saffron-800 uppercase tracking-wide flex items-center gap-1"
                  >
                    <Youtube className="w-4 h-4" /> {language === 'en' ? 'Watch on YouTube' : 'యూట్యూబ్‌లో చూడండి'}
                  </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
