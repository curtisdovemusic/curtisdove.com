import { useEffect, useState } from 'react';

interface AudioVisualizerProps {
  className?: string;
  barCount?: number;
  minHeight?: number;
  maxHeight?: number;
  baseColor?: string;
  accentColor?: string;
  speed?: number; // Animation speed in ms (lower = faster)
}

const AudioVisualizer = ({
  className = '',
  barCount = 60,
  minHeight = 5,
  maxHeight = 50,
  baseColor = 'rgba(255, 165, 0, 0.3)',
  accentColor = 'rgba(255, 165, 0, 0.8)',
  speed = 700 // Medium speed animation
}: AudioVisualizerProps) => {
  const [bars, setBars] = useState<number[]>([]);
  
  // Function to create a pattern with more tall bars
  const generatePattern = () => {
    return Array(barCount).fill(0).map((_, index) => {
      // Create wave-like pattern with some randomness
      const position = index / barCount;
      const wave = Math.sin(position * Math.PI * 4) * 0.4 + 0.5; // Wave pattern
      
      // Add randomness for natural look
      const random = Math.random() * 0.3;
      
      // Calculate height with more medium-high bars
      const heightPercent = 0.3 + (wave * 0.5) + random;
      
      // Apply to min-max range
      return minHeight + ((maxHeight - minHeight) * heightPercent);
    });
  };

  // Generate animated bars
  useEffect(() => {
    // Initialize bars with pattern
    setBars(generatePattern());
    
    // Create animation interval with medium speed
    const interval = setInterval(() => {
      setBars(generatePattern());
    }, speed);
    
    return () => clearInterval(interval);
  }, [barCount, minHeight, maxHeight, speed]);

  return (
    <div className={`audio-visualizer ${className}`}>
      <div className="flex items-end justify-center h-full gap-[2px]">
        {bars.map((height, index) => (
          <div 
            key={index}
            className="bar flex-1"
            style={{
              height: `${height}px`,
              maxWidth: '6px',
              backgroundColor: height > (minHeight + ((maxHeight - minHeight) * 0.7)) 
                ? accentColor 
                : baseColor,
              transition: `height ${speed * 0.8}ms ease-in-out`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AudioVisualizer;