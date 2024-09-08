import { sql } from "drizzle-orm";
import { varchar, text, timestamp, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@/lib/utils";

export const participants = mysqlTable("participants", {
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  visitorId: varchar("visitorId", { length: 256 }).notNull(),
  data: text("data").notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for participants - used to validate API requests
const baseSchema = createSelectSchema(participants, {}).omit(timestamps);

export const insertParticipantSchema = createInsertSchema(
  participants,
  {}
).omit(timestamps);
export const insertParticipantParams = baseSchema.extend({}).omit({
  // id: true,
});

export const updateParticipantSchema = baseSchema;
export const updateParticipantParams = baseSchema.extend({});
export const participantIdSchema = baseSchema.pick({ id: true });

// Types for participants - used to type API request params and within Components
export type Participant = typeof participants.$inferSelect;
export type NewParticipant = z.infer<typeof insertParticipantSchema>;
export type NewParticipantParams = z.infer<typeof insertParticipantParams>;
export type UpdateParticipantParams = z.infer<typeof updateParticipantParams>;
export type ParticipantId = z.infer<typeof participantIdSchema>["id"];
