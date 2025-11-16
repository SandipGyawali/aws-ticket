import { pgEnum } from "drizzle-orm/pg-core";
import { createTable } from "../helpers/create-table";
import type { ExtractSchema } from "../../@types/db.type";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const foodPreferenceEnum = pgEnum("food_preference", ["Veg", "NonVeg"]);
export const sessionChoiceEnum = pgEnum("session_choice", [
  "Conference",
  "Workshop",
]);

const attendees = createTable("attendees", (t) => ({
  user_id: t
    .uuid()
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  first_name: t.text().notNull(),
  last_name: t.text().notNull(),
  email: t.text().notNull().unique(),
  phone: t.text(),
  food_preference: t.text(),
  session_choice: t.text(),
  checked_in: t.boolean().notNull().default(false),
  check_in_time: t.timestamp(),
  lunch: t.boolean().default(false),
  lunch2: t.boolean().default(false),
  created_at: t.timestamp().defaultNow(),
  updated_at: t
    .timestamp()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
}));

export type AttendeesSchema = ExtractSchema<typeof attendees>;

const attendeesInsertSchema = createInsertSchema(attendees);
const attendeesSelectSchema = createSelectSchema(attendees);


export { attendees, attendeesInsertSchema, attendeesSelectSchema };
