import { useRef, useEffect, useState } from 'react';

interface AudioVisualizerProps {
  audioUrl?: string;
  autoPlay?: boolean;
  className?: string;
  barCount?: number;
  barSpacing?: number;
  barColor?: string;
  barColorActive?: string;
  minBarHeight?: number;
  maxBarHeight?: number;
}

const AudioVisualizer = ({
  audioUrl,
  autoPlay = false,
  className = '',
  barCount = 64,
  barSpacing = 2,
  barColor = 'rgba(255, 165, 0, 0.2)',
  barColorActive = 'rgba(255, 165, 0, 0.8)',
  minBarHeight = 5,
  maxBarHeight = 100
}: AudioVisualizerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Set up audio context and analyser
  useEffect(() => {
    if (!audioRef.current) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const audioSource = audioContext.createMediaElementSource(audioRef.current);
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    
    analyserRef.current = analyser;
    dataArrayRef.current = dataArray;
    
    // Auto-play if enabled
    if (autoPlay) {
      // We need user interaction before autoplay will work
      // This is just a fallback - actual autoplay needs user interaction
      const attemptPlay = () => {
        audioRef.current?.play().catch(e => console.log("Autoplay prevented:", e));
      };
      
      window.addEventListener('click', attemptPlay, { once: true });
      
      return () => {
        window.removeEventListener('click', attemptPlay);
      };
    }
    
    return () => {
      if (audioSource) {
        audioSource.disconnect();
      }
      if (analyser) {
        analyser.disconnect();
      }
      audioContext.close();
    };
  }, [autoPlay]);
  
  // Visualizer animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !analyserRef.current || !dataArrayRef.current) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Handle resize to keep canvas crisp
    const handleResize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Animation function
    const animate = () => {
      if (!ctx || !analyserRef.current || !dataArrayRef.current) return;
      
      animationRef.current = requestAnimationFrame(animate);
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Get frequency data
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      
      // Determine bar width and spacing
      const totalBars = Math.min(barCount, dataArrayRef.current.length);
      const barWidth = (canvas.width - (totalBars * barSpacing)) / totalBars;
      
      // Set bar properties
      ctx.fillStyle = barColor;
      
      // Draw bars
      for (let i = 0; i < totalBars; i++) {
        // Use a subset of the frequency data
        const frequencyIndex = Math.floor(i * (dataArrayRef.current.length / totalBars));
        
        // Extract and normalize the data value
        let value = dataArrayRef.current[frequencyIndex];
        value = value || (isPlaying ? (Math.random() * 128) + minBarHeight : minBarHeight);
        
        // Calculate bar height as percentage of the canvas height
        const barHeight = (value / 255) * maxBarHeight;
        
        // Position the bar centrally at the bottom of the canvas
        const x = i * (barWidth + barSpacing);
        const y = canvas.height - barHeight;
        
        // Active bars have brighter color
        if (isPlaying && value > 128) {
          ctx.fillStyle = barColorActive;
        } else {
          ctx.fillStyle = barColor;
        }
        
        // Draw the bar
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, [barWidth / 2, barWidth / 2, 0, 0]);
        ctx.fill();
      }
      
      // Return to default color
      ctx.fillStyle = barColor;
    };
    
    // Start animation
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [barColor, barColorActive, barCount, barSpacing, isPlaying, maxBarHeight, minBarHeight]);
  
  // Play state management
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Play prevented:", e));
    }
  };
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    
    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);
  
  return (
    <div className={`audio-visualizer relative ${className}`}>
      {audioUrl && (
        <audio 
          ref={audioRef} 
          src={audioUrl} 
          loop 
          preload="auto"
          className="hidden"
        />
      )}
      
      <canvas 
        ref={canvasRef} 
        className="w-full h-full absolute inset-0 z-10"
        onClick={togglePlay}
      />
      
      {audioUrl && (
        <button 
          className="absolute bottom-4 right-4 z-20 bg-black/40 hover:bg-black/60 text-amber-500 p-2 rounded-full backdrop-blur-sm transition-all"
          onClick={togglePlay}
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
      )}
    </div>
  );
};

export default AudioVisualizer;