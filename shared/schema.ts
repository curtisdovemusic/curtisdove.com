import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Stream Counter Table
export const streamCounter = pgTable("stream_counter", {
  id: serial("id").primaryKey(),
  count: integer("count").notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

// Insert Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  passwordHash: true,
});

export const insertStreamCounterSchema = createInsertSchema(streamCounter).pick({
  count: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertStreamCounter = z.infer<typeof insertStreamCounterSchema>;
export type StreamCounter = typeof streamCounter.$inferSelect;