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
    // More rhythmic, music-like patterns with less randomness
    delay: (i % 4) * 0.3, // Creates a wave-like pattern based on position
    duration: 2.5 + (i % 3) * 0.8 // Slower animation with slight variations
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
            className="bar w-full rounded-t-md transition-all duration-700"
            style={{ 
              height: `${minHeight + Math.sin(bar.id * 0.2) * (maxHeight - minHeight) * 0.5 + (maxHeight - minHeight) * 0.3}%`,
              backgroundColor: (bar.id % 7 === 0) ? accentColor : baseColor,
              transform: `scaleY(${0.7 + Math.sin(bar.id) * 0.3})`,
              transformOrigin: 'bottom',
              transition: 'transform 1.2s ease-out, background-color 1.2s ease'
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default SimpleAudioVisualizer;