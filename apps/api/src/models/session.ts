import { createTable } from "../helpers/create-table";
import { uuid } from "drizzle-orm/pg-core";
import type { ExtractSchema } from "../../@types/db.type";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { user } from "./user";

const session = createTable("session", (t) => ({
  session_id: uuid()
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  title: t.text().notNull(), // e.g. "AI Workshop"
  description: t.text(),
  start_time: t.timestamp().notNull(),
  end_time: t.timestamp().notNull(),
  room: t.text(), // optional: room/hall name
  capacity: t.integer(), // max participants
  created_at: t.timestamp().defaultNow(),
  updated_at: t
    .timestamp()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
}));

export type SessionSchema = ExtractSchema<typeof session>;

const sessionInsertSchema = createInsertSchema(session);
const sessionUpdateSchema = createSelectSchema(session);

export { session, sessionInsertSchema, sessionUpdateSchema };

const userSession = createTable("user_session", (t) => ({
  id: uuid()
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  user_id: uuid()
    .notNull()
    .references(() => user.user_id, { onDelete: "cascade" }),
  session_id: uuid()
    .notNull()
    .references(() => session.session_id, { onDelete: "cascade" }),
  created_at: t.timestamp().defaultNow(),
}));

export { userSession };
