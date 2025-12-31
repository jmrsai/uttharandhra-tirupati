
import React, { useState, useEffect, useRef } from 'react';
import { Music, Pause } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Updated background mantra to Govinda Namalu
    audioRef.current = new Audio('https://www.tirumala.org/OtherSankeertans/00%20GOVINDA%20NAMALU/00%20GOVINDA%20NAMALU.mp3'); 
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    return () => { if (audioRef.current) audioRef.current.pause(); };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(e => console.log("Autoplay blocked"));
    setIsPlaying(!isPlaying);
    setHasInteracted(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      {!hasInteracted && !isPlaying && (
        <div className="bg-white px-3 py-1 rounded-lg shadow-lg border border-gold-500 text-xs text-saffron-800 font-bold animate-bounce">
          Play background music
        </div>
      )}
      <button
        onClick={togglePlay}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl border-2 border-gold-500 group ${
          isPlaying ? 'bg-gradient-to-br from-saffron-500 to-saffron-700 animate-spin-slow' : 'bg-white'
        }`}
      >
        {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Music className="w-6 h-6 text-saffron-600" />}
      </button>
    </div>
  );
};

export default MusicPlayer;
