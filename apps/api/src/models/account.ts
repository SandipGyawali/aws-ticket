import { uuid } from "drizzle-orm/pg-core";
import { createTable } from "../helpers/create-table";
import { user } from "./user";
import type { ExtractSchema } from "../../@types/db.type";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const account = createTable("account", (t) => ({
  account_id: uuid()
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  user_id: uuid()
    .notNull()
    .references(() => user.user_id, { onDelete: "cascade" }),
  access_token: t.text(),
  refresh_token: t.text(),
  password: t.text(),
  create_at: t.timestamp().defaultNow(),
  updated_at: t
    .timestamp()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
}));

export type AccountSchema = ExtractSchema<typeof account>;

const accountInsertSchema = createInsertSchema(account);
const accountSelectSchema = createSelectSchema(account);

export { account, accountInsertSchema, accountSelectSchema };
