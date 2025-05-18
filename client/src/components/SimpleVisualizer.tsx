import { useEffect, useState } from 'react';

interface SimpleVisualizerProps {
  className?: string;
  barCount?: number;
  minHeight?: number;
  maxHeight?: number;
  baseColor?: string;
  accentColor?: string;
  animationActive?: boolean;
}

const SimpleVisualizer = ({
  className = '',
  barCount = 60,
  minHeight = 5, 
  maxHeight = 50,
  baseColor = 'rgba(255, 165, 0, 0.2)',
  accentColor = 'rgba(255, 165, 0, 0.8)',
  animationActive = true
}: SimpleVisualizerProps) => {
  const [barHeights, setBarHeights] = useState<number[]>(Array(barCount).fill(minHeight));

  // Function to generate random bar heights
  const generateRandomBars = () => {
    const newBars = Array(barCount).fill(0).map(() => {
      // Generate random heights with weighted distribution
      // More likely to be medium height, with some peaks
      const random = Math.random();
      if (random > 0.9) {
        // High peak (10% chance)
        return minHeight + ((maxHeight - minHeight) * (0.8 + (Math.random() * 0.2)));
      } else if (random > 0.7) {
        // Medium-high (20% chance)
        return minHeight + ((maxHeight - minHeight) * (0.6 + (Math.random() * 0.2)));
      } else if (random > 0.4) {
        // Medium (30% chance)
        return minHeight + ((maxHeight - minHeight) * (0.3 + (Math.random() * 0.3)));
      } else {
        // Low (40% chance)
        return minHeight + ((maxHeight - minHeight) * (Math.random() * 0.3));
      }
    });
    
    return newBars;
  };

  useEffect(() => {
    if (!animationActive) return;
    
    // Initialize bars
    setBarHeights(generateRandomBars());
    
    // Update animation every 1 second
    const interval = setInterval(() => {
      setBarHeights(generateRandomBars());
    }, 1000);
    
    return () => clearInterval(interval);
  }, [animationActive, barCount, minHeight, maxHeight]);

  return (
    <div className={`visualizer-container ${className}`}>
      {/* Audio bars */}
      <div className="bars-container w-full h-full flex items-end justify-center gap-[2px]">
        {barHeights.map((height, index) => (
          <div
            key={index}
            className="bar-wrapper flex-1"
            style={{ maxWidth: '8px' }}
          >
            <div
              className="bar w-full rounded-t-md"
              style={{
                height: `${height}px`,
                backgroundColor: height > (minHeight + ((maxHeight - minHeight) * 0.7)) ? accentColor : baseColor,
                transition: 'height 1.0s ease-in-out'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleVisualizer;