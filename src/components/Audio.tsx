
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AudioItem } from '../types/types';
import { rtdb } from '../firebase/firebase';
import { ref, onValue } from 'firebase/database';
import { supabaseService } from '../services/supabaseService';

const Audio: React.FC = () => {
  const { language, t } = useLanguage();
  const [tracks, setTracks] = useState<AudioItem[]>([]);

  const [currentTrack, setCurrentTrack] = useState<AudioItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const loadTracks = async () => {
    try {
      // Try Supabase first
      const sbTracks = await supabaseService.getAudioTracks(language);
      if (sbTracks && sbTracks.length > 0) {
        setTracks(sbTracks);
        return;
      }

      // Fallback to RTDB
      const tracksRef = ref(rtdb, `audio_tracks/${language}`);
      onValue(tracksRef, (snapshot) => {
        const data = snapshot.val();
        setTracks(data ? Object.values(data) : []);
      }, { onlyOnce: true });

    } catch (err) {
      console.error("Audio tracks load failed", err);
    }
  };

  useEffect(() => {
    loadTracks();
  }, [language]);

  useEffect(() => {
    audioRef.current = new window.Audio();

    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  const handleTrackSelect = (track: AudioItem) => {
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      setCurrentTrack(track);
      if (audioRef.current) {
        audioRef.current.src = track.src;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentTrack) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 pb-32">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-primary font-header mb-2">{t('audio.title')}</h1>
        <p className="text-secondary text-lg">{t('audio.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tracks.map((track) => (
          <div
            key={track.id}
            onClick={() => handleTrackSelect(track)}
            className={`flex items-center p-5 rounded-2xl transition-all duration-300 border cursor-pointer group ${currentTrack?.id === track.id
              ? 'bg-accent/20 border-accent/80 shadow-lg scale-[1.02]'
              : 'bg-base-100 border-neutral/20 hover:bg-neutral/10 hover:shadow-md'
              }`}
          >
            <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${currentTrack?.id === track.id ? 'bg-primary text-white' : 'bg-accent/50 text-primary group-hover:bg-accent/70'
              }`}>
              {currentTrack?.id === track.id && isPlaying ? (
                <Pause className="w-7 h-7" />
              ) : (
                <Play className="w-7 h-7 ml-1" />
              )}
            </div>

            <div className="ml-5 flex-grow">
              <div className="flex items-center gap-3 mb-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-widest ${track.category === 'Sloka' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-orange-100 text-orange-700 border border-orange-200'
                  }`}>
                  {track.category}
                </span>
                <span className="text-xs text-neutral font-medium">{track.duration}</span>
              </div>
              <h3 className={`font-bold text-lg ${currentTrack?.id === track.id ? 'text-primary' : 'text-secondary'}`}>
                {track.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-full duration-500">
          <div className="bg-base-100/95 backdrop-blur-xl border-t border-neutral/20 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-4 md:p-6">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <div className="flex items-center gap-4 w-full md:w-1/3">
                  <div className="bg-primary p-3 rounded-xl text-white shadow-lg animate-pulse-glow">
                    <Music className="w-6 h-6" />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-secondary truncate">{currentTrack.title}</h4>
                    <p className="text-xs text-primary font-bold uppercase tracking-widest">{currentTrack.category}</p>
                  </div>
                </div>

                <div className="flex-grow w-full flex flex-col gap-2">
                  <div className="flex items-center justify-center gap-6">
                    <button className="text-neutral hover:text-primary transition-colors"><SkipBack className="w-6 h-6" /></button>
                    <button
                      onClick={togglePlay}
                      className="bg-primary text-white p-3 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all"
                    >
                      {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                    </button>
                    <button className="text-neutral hover:text-primary transition-colors"><SkipForward className="w-6 h-6" /></button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-neutral w-10 text-right">{formatTime(currentTime)}</span>
                    <div className="flex-grow relative group h-6 flex items-center">
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1.5 bg-neutral/20 rounded-lg appearance-none cursor-pointer accent-primary group-hover:h-2 transition-all"
                      />
                    </div>
                    <span className="text-xs font-bold text-neutral w-10">{formatTime(duration)}</span>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-end gap-3 w-1/3">
                  <Volume2 className="w-5 h-5 text-neutral" />
                  <div className="w-24 h-1 bg-neutral/20 rounded-full">
                    <div className="w-2/3 h-full bg-accent rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-16 bg-gradient-to-br from-primary to-secondary text-white p-10 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <Music className="w-40 h-40" />
        </div>
        <h3 className="text-3xl font-bold mb-4 relative z-10">{t('audio.more')}</h3>
        <p className="mb-8 opacity-90 max-w-xl mx-auto relative z-10 leading-relaxed">{t('audio.more_desc')}</p>
        <button className="bg-accent text-primary px-10 py-4 rounded-2xl font-bold hover:bg-white hover:text-primary transition-all shadow-xl relative z-10 transform hover:-translate-y-1">
          {t('audio.notify')}
        </button>
      </div>
    </div>
  );
};

export default Audio;
