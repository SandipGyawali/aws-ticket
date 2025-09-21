import { createTable } from "../helpers/create-table";
import type { ExtractSchema } from "../../@types/db.type";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import crypto from "crypto";

const user = createTable("user", (t) => ({
  user_id: t
    .uuid()
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  first_name: t.text().notNull(),
  last_name: t.text().notNull(),
  email: t.text().notNull(),
  created_at: t.timestamp().defaultNow(),
  updated_at: t
    .timestamp()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
}));

export type UserSchema = ExtractSchema<typeof user>;

const userInsertSchema = createInsertSchema(user);
const userSelectSchema = createSelectSchema(user);

export { user, userSelectSchema, userInsertSchema };
