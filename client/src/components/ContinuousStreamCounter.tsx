import { useState, useEffect } from "react";

const ContinuousStreamCounter = () => {
  const [count, setCount] = useState<number | null>(null);
  const [localCount, setLocalCount] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Get the initial count from server
  useEffect(() => {
    const fetchInitialCount = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/stream-count');
        const data = await response.json();
        
        // Set the server count
        setCount(data.count);
        setLocalCount(data.count);
        setLastUpdated(new Date(data.timestamp));
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch stream count:', error);
        setLoading(false);
      }
    };
    
    fetchInitialCount();
  }, []);
  
  // Update local count based on time passed since last server update
  useEffect(() => {
    if (count === null || lastUpdated === null) return;
    
    // Update counter every second visually
    const interval = setInterval(() => {
      // Calculate how many increments should have happened (32.5s per increment)
      const elapsedMs = Date.now() - lastUpdated.getTime();
      const incrementsSinceLastUpdate = Math.floor(elapsedMs / (32.5 * 1000));
      
      // Update local count
      setLocalCount(count + incrementsSinceLastUpdate);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [count, lastUpdated]);
  
  // Re-fetch count from server every 5 minutes to stay synced
  useEffect(() => {
    const refreshInterval = setInterval(async () => {
      try {
        const response = await fetch('/api/stream-count');
        const data = await response.json();
        
        setCount(data.count);
        setLocalCount(data.count);
        setLastUpdated(new Date(data.timestamp));
      } catch (error) {
        console.error('Failed to refresh stream count:', error);
      }
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(refreshInterval);
  }, []);
  
  if (loading) {
    return (
      <div className="stream-counter-loading">
        <div className="text-xl md:text-2xl font-semibold text-white/90">Loading streams...</div>
      </div>
    );
  }
  
  // Format the number with commas
  const formattedCount = localCount ? localCount.toLocaleString() : "0";
  
  return (
    <div className="stream-counter">
      <div className="flex flex-col items-center">
        <div className="text-xl md:text-2xl font-semibold text-white/90">Total Streams</div>
        <div className="text-3xl md:text-4xl font-bold text-amber-500 mt-2 transition-all duration-700">
          {formattedCount}
        </div>
        <div className="text-sm text-white/60 mt-1">Across All Platforms</div>
      </div>
    </div>
  );
};

export default ContinuousStreamCounter;