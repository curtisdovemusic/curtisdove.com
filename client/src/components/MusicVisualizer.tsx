import { useEffect, useRef, useState } from 'react';

interface MusicVisualizerProps {
  className?: string;
  audioSrc: string;
  barCount?: number;
  minHeight?: number;
  maxHeight?: number;
  baseColor?: string;
  accentColor?: string;
}

const MusicVisualizer = ({
  className = '',
  audioSrc,
  barCount = 60,
  minHeight = 5,
  maxHeight = 50,
  baseColor = 'rgba(255, 165, 0, 0.2)',
  accentColor = 'rgba(255, 165, 0, 0.8)'
}: MusicVisualizerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [freqData, setFreqData] = useState<number[]>(Array(barCount).fill(minHeight));
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);

  // Initialize audio context and analyzer on component mount
  useEffect(() => {
    return () => {
      // Cleanup
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Function to initialize audio context and connect analyzer
  const setupAudio = () => {
    // Only set up once
    if (audioContextRef.current) return;
    
    try {
      // Create audio context
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      
      // Create analyser node
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256; // Must be a power of 2
      const bufferLength = analyser.frequencyBinCount; // Half of fftSize
      const dataArray = new Uint8Array(bufferLength);
      
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
      
      // Connect audio element to the analyser
      if (audioRef.current) {
        const source = audioContext.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        sourceNodeRef.current = source;
      }
    } catch (error) {
      console.error('Error setting up audio analyser:', error);
    }
  };

  // Animation function to update frequency data
  const updateFrequencyData = () => {
    if (!analyserRef.current || !dataArrayRef.current) return;
    
    // Get current frequency data
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    
    // Calculate bars from frequency data
    const bars: number[] = [];
    const step = Math.floor(dataArrayRef.current.length / barCount);
    
    for (let i = 0; i < barCount; i++) {
      const index = i * step;
      // Convert from 0-255 range to minHeight-maxHeight range
      const value = dataArrayRef.current[index] || 0;
      const height = minHeight + ((value / 255) * (maxHeight - minHeight));
      bars.push(height);
    }
    
    setFreqData(bars);
    
    // Continue animation loop
    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateFrequencyData);
    }
  };

  // Handle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    // Setup audio only on first play (needs user interaction)
    if (!audioContextRef.current) {
      setupAudio();
    }
    
    // Resume audio context if necessary (browser policy)
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
    
    if (isPlaying) {
      // Pause
      audioRef.current.pause();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      setIsPlaying(false);
    } else {
      // Play
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          // Start visualization
          animationFrameRef.current = requestAnimationFrame(updateFrequencyData);
        })
        .catch(err => console.error('Error playing audio:', err));
    }
  };

  return (
    <div className={`visualizer-container relative ${className}`}>
      {/* Play/Pause Button - Positioned prominently */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={togglePlay}
          className="bg-amber-600 hover:bg-amber-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl transition-all"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </button>
      </div>

      {/* Audio bars */}
      <div className="bars-container w-full h-full flex items-end justify-center gap-[2px]">
        {freqData.map((height, index) => (
          <div
            key={index}
            className="bar-wrapper flex-1"
            style={{ maxWidth: '10px' }}
          >
            <div
              className="bar w-full rounded-t-md"
              style={{
                height: `${height}%`,
                backgroundColor: height > maxHeight * 0.7 ? accentColor : baseColor,
                transition: 'height 0.05s ease-out'
              }}
            />
          </div>
        ))}
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} src={audioSrc} preload="auto" />
    </div>
  );
};

export default MusicVisualizer;