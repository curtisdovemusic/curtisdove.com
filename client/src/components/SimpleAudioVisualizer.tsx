import { useEffect, useRef } from 'react';

interface SimpleAudioVisualizerProps {
  className?: string;
  barCount?: number;
  minHeight?: number;
  maxHeight?: number;
  baseColor?: string;
  accentColor?: string;
}

const SimpleAudioVisualizer = ({
  className = '',
  barCount = 50,
  minHeight = 5,
  maxHeight = 100,
  baseColor = 'rgba(255, 165, 0, 0.2)',
  accentColor = 'rgba(255, 165, 0, 0.8)'
}: SimpleAudioVisualizerProps) => {
  const bars = Array.from({ length: barCount }, (_, i) => ({
    id: i,
    // Staggered pattern for fluid movement
    delay: (i % 4) * 0.1, 
    duration: 0.8 + (i % 3) * 0.3 // Faster animation
  }));
  
  return (
    <div className={`simple-audio-visualizer w-full h-full flex items-end justify-center gap-1 ${className}`}>
      {bars.map(bar => (
        <div
          key={bar.id}
          className="bar-wrapper h-full flex-1"
          style={{ 
            maxWidth: '12px',
            animation: `pulse ${bar.duration}s ease-in-out ${bar.delay}s infinite alternate`
          }}
        >
          <div 
            className="bar w-full rounded-t-md"
            style={{ 
              height: `${minHeight + (15 + bar.id % 4 * 5)}%`, // Much shorter bars
              backgroundColor: (bar.id % 7 === 0) ? accentColor : baseColor,
              transformOrigin: 'bottom'
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default SimpleAudioVisualizer;