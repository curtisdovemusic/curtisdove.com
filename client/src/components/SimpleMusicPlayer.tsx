import { useState, useRef } from 'react';

interface SimpleMusicPlayerProps {
  title: string;
  artist: string;
  coverImage: string;
  audioSrc: string;
  className?: string;
}

const SimpleMusicPlayer = ({ 
  title, 
  artist, 
  coverImage, 
  audioSrc,
  className = '' 
}: SimpleMusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Create audio element when component mounts
  if (!audioRef.current) {
    audioRef.current = new Audio(audioSrc);
    
    audioRef.current.onended = () => {
      setIsPlaying(false);
    };
  }
  
  // Handle play/pause toggle
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(err => {
          console.error('Error playing audio:', err);
        });
    }
  };

  return (
    <div className={`player-card bg-black/70 backdrop-blur-lg rounded-xl shadow-2xl border border-amber-500/20 ${className}`}>
      <div className="flex items-center p-4">
        {/* Album Cover with Play Button Overlay */}
        <div className="relative rounded-lg overflow-hidden w-20 h-20 flex-shrink-0 border-2 border-amber-500/30">
          <img
            src={coverImage}
            alt={`${title} album cover`}
            className="w-full h-full object-cover"
          />
          
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer hover:bg-black/30 transition-colors"
            onClick={togglePlay}
          >
            <div className="bg-amber-500 rounded-full p-2 shadow-lg">
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}
            </div>
          </div>
        </div>
        
        {/* Track Info */}
        <div className="ml-4">
          <h3 className="text-white font-semibold text-lg md:text-xl">{title}</h3>
          <p className="text-amber-400 text-sm md:text-base">{artist}</p>
          
          {/* Animated Sound Wave when playing */}
          {isPlaying && (
            <div className="flex items-center gap-1 mt-2">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i}
                  className="h-3 w-1 bg-amber-500 rounded-full"
                  style={{ 
                    animation: `soundwave 1s ease-in-out infinite`,
                    animationDelay: `${i * 0.15}s` 
                  }}
                ></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleMusicPlayer;