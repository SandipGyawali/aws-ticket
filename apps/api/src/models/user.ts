import { createTable } from "../helpers/create-table";
import type { ExtractSchema } from "../../@types/db.type";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import crypto from "crypto";

/**
 * -> The above part is for the attendees
 */
// export enum FoodPreference {
//   veg = "Veg",
//   nonVeg = "NonVeg",
// }

// export enum SessionChoice {
//   conference = "Conference",
//   workshop = "Workshop",
// }

// const user = createTable("user", (t) => ({
//   user_id: t
//     .uuid()
//     .$defaultFn(() => crypto.randomUUID())
//     .primaryKey(),
//   first_name: t.text().notNull(),
//   last_name: t.text().notNull(),
//   phone: t.text(),
//   foodPreference: t.text().notNull(),
//   sessionChoice: t.text().notNull(),
//   checkedIn: t.boolean().notNull().default(false),
//   lunch: t.boolean().notNull(),
//   email: t.text().notNull(),
//   created_at: t.timestamp().defaultNow(),
//   updated_at: t
//     .timestamp()
//     .defaultNow()
//     .$onUpdateFn(() => new Date()),
// }));

const user = createTable("user", (t) => ({
  user_id: t
    .uuid()
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  username: t.text().notNull(),
  email: t.text().unique().notNull(),
  email_verified: t.text().notNull(),
  create_at: t.timestamp().defaultNow(),
  updated_at: t
    .timestamp()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
}));

export type UserSchema = ExtractSchema<typeof user>;

const userInsertSchema = createInsertSchema(user);
const userSelectSchema = createSelectSchema(user);

export { user, userSelectSchema, userInsertSchema };
