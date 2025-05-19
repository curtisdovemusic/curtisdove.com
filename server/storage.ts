import { 
  users, 
  streamCounter, 
  type User, 
  type InsertUser, 
  type StreamCounter, 
  type InsertStreamCounter 
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getStreamCount(): Promise<number>;
  updateStreamCount(increment: number): Promise<number>;
  initializeStreamCount(initialCount: number): Promise<number>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        createdAt: new Date()
      })
      .returning();
    return user;
  }

  async getStreamCount(): Promise<number> {
    const [counter] = await db.select().from(streamCounter);
    return counter ? counter.count : 0;
  }

  async updateStreamCount(increment: number): Promise<number> {
    // Get current count
    const [counter] = await db.select().from(streamCounter);
    
    if (!counter) {
      // Initialize if doesn't exist
      const [newCounter] = await db
        .insert(streamCounter)
        .values({
          count: increment,
          lastUpdated: new Date()
        })
        .returning();
      return newCounter.count;
    }
    
    // Update existing counter
    const [updatedCounter] = await db
      .update(streamCounter)
      .set({ 
        count: counter.count + increment,
        lastUpdated: new Date()
      })
      .where(eq(streamCounter.id, counter.id))
      .returning();
    
    return updatedCounter.count;
  }

  async initializeStreamCount(initialCount: number): Promise<number> {
    // Check if counter exists
    const [counter] = await db.select().from(streamCounter);
    
    if (counter) {
      // Update existing counter
      const [updatedCounter] = await db
        .update(streamCounter)
        .set({ 
          count: initialCount,
          lastUpdated: new Date()
        })
        .where(eq(streamCounter.id, counter.id))
        .returning();
      
      return updatedCounter.count;
    } else {
      // Initialize new counter
      const [newCounter] = await db
        .insert(streamCounter)
        .values({
          count: initialCount,
          lastUpdated: new Date()
        })
        .returning();
      
      return newCounter.count;
    }
  }
}

export const storage = new DatabaseStorage();
