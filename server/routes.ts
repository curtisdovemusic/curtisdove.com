import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { initializeStreamCounter, startStreamCounter, getStreamCount } from "./streamCounter";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize stream counter with starting value
  await initializeStreamCounter(637000);
  
  // Start the continuous counter that increments by 1 every 32.5 seconds
  const counterInterval = startStreamCounter();
  
  // API route to get current stream count
  app.get("/api/stream-count", async (_req, res) => {
    try {
      const count = await getStreamCount();
      res.json({ count, timestamp: new Date() });
    } catch (error) {
      console.error("Error fetching stream count:", error);
      res.status(500).json({ error: "Failed to fetch stream count" });
    }
  });

  // Simple API to handle contact form submissions if needed
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate submission fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: "All fields are required" });
      }
      
      // In a real implementation, you'd store this in a database
      // or send it via email using a service like Nodemailer
      
      // For now, just return success
      return res.status(200).json({ 
        success: true,
        message: "Message received successfully" 
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
