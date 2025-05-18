import { useEffect, useRef, useState } from 'react';

interface AudioVisualizerProps {
  className?: string;
  audioUrl: string;
  barCount?: number;
  minHeight?: number;
  maxHeight?: number;
  baseColor?: string;
  accentColor?: string;
}

const AudioVisualizer = ({
  className = '',
  audioUrl,
  barCount = 50,
  minHeight = 5,
  maxHeight = 50,
  baseColor = 'rgba(255, 165, 0, 0.2)',
  accentColor = 'rgba(255, 165, 0, 0.8)'
}: AudioVisualizerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(barCount).fill(minHeight));
  const animationRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);

  // Setup audio element
  useEffect(() => {
    const audio = new Audio(audioUrl);
    audio.crossOrigin = 'anonymous';
    audioRef.current = audio;

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [audioUrl]);

  // Initialize audio context (must be called after user interaction)
  const initializeAudio = () => {
    if (isAudioInitialized || !audioRef.current) return;
    
    try {
      // Create audio context
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      
      // Create analyzer
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;
      
      // Connect audio to analyzer
      const source = audioContext.createMediaElementSource(audioRef.current);
      sourceRef.current = source;
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      
      setIsAudioInitialized(true);
    } catch (error) {
      console.error("Error initializing audio context:", error);
    }
  };

  // Animation function to update bars
  const updateBars = () => {
    if (!analyserRef.current || !audioRef.current) return;
    
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    analyser.getByteFrequencyData(dataArray);
    setAudioData(dataArray);
    
    animationRef.current = requestAnimationFrame(updateBars);
  };

  // Handle play/pause
  const togglePlayback = () => {
    // Initialize audio context on first play (must happen on user interaction)
    if (!isAudioInitialized) {
      initializeAudio();
    }
    
    if (!audioRef.current || !audioContextRef.current) return;
    
    // Resume audio context if suspended
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    
    if (isPlaying) {
      audioRef.current.pause();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    } else {
      audioRef.current.play()
        .then(() => {
          animationRef.current = requestAnimationFrame(updateBars);
        })
        .catch(err => console.error("Error playing audio:", err));
    }
    
    setIsPlaying(!isPlaying);
  };

  // Generate bars from audio data
  const getBars = () => {
    const bars = [];
    const step = Math.floor(audioData.length / barCount);
    
    for (let i = 0; i < barCount; i++) {
      const index = i * step;
      // Scale value from 0-255 to minHeight-maxHeight range
      const value = audioData[index] || 0;
      const height = minHeight + ((value / 255) * (maxHeight - minHeight));
      
      bars.push({
        id: i,
        height: height
      });
    }
    
    return bars;
  };

  return (
    <div className={`audio-visualizer w-full flex flex-col items-center ${className}`}>
      <div className="visualizer-container w-full flex items-end justify-center gap-[2px] h-28">
        {getBars().map(bar => (
          <div
            key={bar.id}
            className="bar-wrapper flex-1"
            style={{ maxWidth: '8px' }}
          >
            <div 
              className="bar w-full rounded-t-md"
              style={{ 
                height: `${bar.height}%`,
                backgroundColor: bar.height > maxHeight * 0.7 ? accentColor : baseColor,
                transition: 'height 0.05s ease-out, background-color 0.1s ease'
              }}
            />
          </div>
        ))}
      </div>
      
      <button 
        onClick={togglePlayback}
        className="mt-4 bg-amber-600 hover:bg-amber-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
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
      </button>
    </div>
  );
};

export default AudioVisualizer;