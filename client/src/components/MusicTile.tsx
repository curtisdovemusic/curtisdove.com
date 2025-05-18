import { useState, useRef, useEffect } from 'react';

interface MusicTileProps {
  title: string;
  artist: string;
  coverImage: string;
  audioSrc: string;
  className?: string;
}

const MusicTile = ({ title, artist, coverImage, audioSrc, className = '' }: MusicTileProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Handle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play()
        .catch(err => console.error('Error playing audio:', err));
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Update state when audio ends
  useEffect(() => {
    const audioElement = audioRef.current;
    
    const handleEnded = () => {
      setIsPlaying(false);
    };
    
    if (audioElement) {
      audioElement.addEventListener('ended', handleEnded);
    }
    
    return () => {
      if (audioElement) {
        audioElement.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  return (
    <div className={`music-tile bg-black/60 backdrop-blur-md rounded-lg p-5 flex overflow-hidden shadow-xl border border-amber-900/30 hover:border-amber-500/50 transition-all ${className}`}>
      <div className="flex-shrink-0 relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-md overflow-hidden border-2 border-amber-500/30">
        <img 
          src={coverImage} 
          alt={`${title} cover`} 
          className="w-full h-full object-cover"
        />
        
        <div
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/40 cursor-pointer transition-all"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          <div className="bg-amber-500 rounded-full p-2 shadow-lg">
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </div>
        </div>
      </div>
      
      <div className="ml-4 flex flex-col justify-center">
        <h3 className="text-white font-semibold text-lg md:text-xl truncate">{title}</h3>
        <p className="text-amber-400 text-sm md:text-base">{artist}</p>
        
        {/* Animated Sound Wave when playing */}
        {isPlaying && (
          <div className="sound-wave flex items-center space-x-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i}
                className="h-3 w-1 bg-amber-500 rounded-full animate-soundwave"
                style={{ animationDelay: `${i * 0.15}s` }}
              ></div>
            ))}
          </div>
        )}
      </div>
      
      {/* Hidden audio element */}
      <audio ref={audioRef} src={audioSrc} preload="auto" />
    </div>
  );
};

export default MusicTile;