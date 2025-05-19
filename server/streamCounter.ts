import { storage } from "./storage";

// Interval in milliseconds (32.5 seconds)
const STREAM_INCREMENT_INTERVAL = 32.5 * 1000;

// Initialize the counter with starting value
export async function initializeStreamCounter(initialCount: number = 637000) {
  try {
    const count = await storage.initializeStreamCount(initialCount);
    console.log(`Stream counter initialized with ${count} streams`);
    return count;
  } catch (error) {
    console.error("Failed to initialize stream counter:", error);
    throw error;
  }
}

// Get the current stream count
export async function getStreamCount() {
  try {
    return await storage.getStreamCount();
  } catch (error) {
    console.error("Failed to get stream count:", error);
    throw error;
  }
}

// Start the background increment process
export function startStreamCounter() {
  // Increment by 1 every interval
  const incrementInterval = setInterval(async () => {
    try {
      const newCount = await storage.updateStreamCount(1);
      console.log(`Stream count updated to: ${newCount}`);
    } catch (error) {
      console.error("Failed to update stream count:", error);
    }
  }, STREAM_INCREMENT_INTERVAL);

  // Return the interval so it can be cleared if needed
  return incrementInterval;
}

// Calculate what the count should be based on the initial value and elapsed time
export function calculateCurrentCount(initialCount: number, initialTimestamp: Date): number {
  const elapsedMs = Date.now() - initialTimestamp.getTime();
  const incrementsSinceStart = Math.floor(elapsedMs / STREAM_INCREMENT_INTERVAL);
  return initialCount + incrementsSinceStart;
}