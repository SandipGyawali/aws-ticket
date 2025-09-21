import type { PgTableWithColumns } from "drizzle-orm/pg-core";

export type ExtractSchema<T extends PgTableWithColumns<any>> = {
  select: T["$inferSelect"];
  insert: T["$inferInsert"];
};

export type ExtractUnionFromTuple<T extends readonly unknown[]> = T[number];
