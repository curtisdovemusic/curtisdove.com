import { useState, useEffect } from "react";

interface IncrementingCounterProps {
  startValue: number;
  incrementIntervalMs: number;
}

const IncrementingCounter = ({ 
  startValue = 637000, 
  incrementIntervalMs = 32500 // 32.5 seconds in milliseconds
}: IncrementingCounterProps) => {
  const [displayValue, setDisplayValue] = useState(startValue);
  
  useEffect(() => {
    // Calculate the initial timestamp and value based on a consistent starting point
    // This ensures the counter is synchronized regardless of when users visit
    const startDate = new Date('2025-05-19').getTime(); // May 19, 2025 as base date
    const currentDate = new Date().getTime();
    const elapsedMs = currentDate - startDate;
    const incrementsSinceStart = Math.floor(elapsedMs / incrementIntervalMs);
    const calculatedCurrentValue = startValue + incrementsSinceStart;
    
    // Set the initial display value
    setDisplayValue(calculatedCurrentValue);
    
    // Update the display value every second to make it look smooth
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const elapsedMsNow = now - startDate;
      const incrementsSinceStartNow = Math.floor(elapsedMsNow / incrementIntervalMs);
      const calculatedValueNow = startValue + incrementsSinceStartNow;
      
      setDisplayValue(calculatedValueNow);
    }, 1000); // Update display every second
    
    return () => clearInterval(intervalId);
  }, [startValue, incrementIntervalMs]);
  
  // Format the number with commas
  const formattedValue = displayValue.toLocaleString();
  
  return (
    <div className="stream-counter">
      <div className="text-white text-sm font-medium flex items-center">
        <span className="text-green-500 font-bold text-base">{formattedValue}</span>
        <span className="ml-1 text-white/70 text-xs">Total Spotify Streams</span>
      </div>
    </div>
  );
};

export default IncrementingCounter;