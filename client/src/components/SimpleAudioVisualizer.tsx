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
    // Fixed delay and duration for consistent animation
    delay: (i % 5) * 0.15, // Small staggered delay for visual interest
    duration: 1 + (i % 2) * 0.2 // Back to original faster speed
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
              height: `${minHeight + (30 + bar.id % 5 * 10)}%`,
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