import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { PgTableWithColumns } from "drizzle-orm/pg-core";
import * as schema from "../src/models/index";

export type ExtractSchema<T extends PgTableWithColumns<any>> = {
  select: T["$inferSelect"];
  insert: T["$inferInsert"];
};

export type ExtractUnionFromTuple<T extends readonly unknown[]> = T[number];

// database connection pool type
export type PgDatabase = NodePgDatabase<typeof schema>;
