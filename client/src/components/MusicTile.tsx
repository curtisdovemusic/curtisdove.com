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
    <div className={`music-tile bg-black/40 backdrop-blur-md rounded-lg p-4 flex overflow-hidden shadow-lg hover:shadow-amber-900/20 transition-all ${className}`}>
      <div className="flex-shrink-0 relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-md overflow-hidden">
        <img 
          src={coverImage} 
          alt={`${title} cover`} 
          className="w-full h-full object-cover"
        />
        
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-all"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" fill="white"></polygon>
            </svg>
          )}
        </button>
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