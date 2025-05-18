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
    // Randomized animation delay and duration for natural movement
    delay: Math.random() * 2,
    duration: 1 + Math.random() * 1.5
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
            className="bar w-full rounded-t-md transition-all duration-200"
            style={{ 
              height: `${minHeight + Math.random() * (maxHeight - minHeight)}%`,
              backgroundColor: Math.random() > 0.7 ? accentColor : baseColor,
              transform: `scaleY(${0.2 + Math.random() * 0.8})`,
              transformOrigin: 'bottom',
              transition: 'transform 0.5s ease-out, background-color 0.5s ease'
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default SimpleAudioVisualizer;