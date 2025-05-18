import { useEffect, useState } from 'react';

interface AudioVisualizerProps {
  className?: string;
  barCount?: number;
  minHeight?: number;
  maxHeight?: number;
  baseColor?: string;
  accentColor?: string;
}

const AudioVisualizer = ({
  className = '',
  barCount = 60,
  minHeight = 5,
  maxHeight = 50,
  baseColor = 'rgba(255, 165, 0, 0.3)',
  accentColor = 'rgba(255, 165, 0, 0.8)'
}: AudioVisualizerProps) => {
  const [bars, setBars] = useState<number[]>([]);

  // Generate animated bars
  useEffect(() => {
    // Initialize bars with random heights
    const initialBars = Array(barCount).fill(0).map(() => 
      minHeight + Math.random() * (maxHeight - minHeight)
    );
    setBars(initialBars);
    
    // Create animation interval
    const interval = setInterval(() => {
      setBars(prev => 
        prev.map(() => {
          // Create more natural-looking distribution
          const random = Math.random();
          if (random > 0.85) {
            // High peaks (15% chance)
            return minHeight + (maxHeight - minHeight) * (0.7 + Math.random() * 0.3);
          } else if (random > 0.6) {
            // Medium-high (25% chance)
            return minHeight + (maxHeight - minHeight) * (0.4 + Math.random() * 0.3);
          } else {
            // Low-medium (60% chance)
            return minHeight + (maxHeight - minHeight) * (Math.random() * 0.4);
          }
        })
      );
    }, 1000); // Update every second for consistent timing
    
    return () => clearInterval(interval);
  }, [barCount, minHeight, maxHeight]);

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
              backgroundColor: height > (minHeight + (maxHeight - minHeight) * 0.7) 
                ? accentColor 
                : baseColor,
              transition: 'height 1s ease-in-out'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AudioVisualizer;