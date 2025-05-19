import { useState, useEffect } from "react";

interface StreamCounterProps {
  startCount: number;
  incrementIntervalSec: number;
}

const StreamCounter = ({ startCount, incrementIntervalSec }: StreamCounterProps) => {
  const [streamCount, setStreamCount] = useState(startCount);
  
  useEffect(() => {
    // Calculate the increment interval in milliseconds
    const intervalMs = incrementIntervalSec * 1000;
    
    // Set up the interval to increment the counter
    const interval = setInterval(() => {
      setStreamCount(prevCount => prevCount + 1);
    }, intervalMs);
    
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [incrementIntervalSec]);
  
  // Format the number with commas
  const formattedCount = streamCount.toLocaleString();
  
  return (
    <div className="stream-counter">
      <div className="flex flex-col items-center">
        <div className="text-xl md:text-2xl font-semibold text-white/90">Total Streams</div>
        <div className="text-3xl md:text-4xl font-bold text-amber-500 mt-2">
          {formattedCount}
        </div>
        <div className="text-sm text-white/60 mt-1">Across All Platforms</div>
      </div>
    </div>
  );
};

export default StreamCounter;