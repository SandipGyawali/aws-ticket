import z from "zod";

const sortItemSchema = z.object({
  id: z.union([z.enum(["name", "created_at", "email", "slug"]), z.string()]),
  desc: z.boolean(),
});

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  perPage: z.coerce.number().default(10),
  search: z.string().default(""),
  createdAt: z
    .preprocess(
      (val) => (Array.isArray(val) ? val : val ? [val] : []),
      z.array(z.coerce.number())
    )
    .default([]),
  sort: z
    .preprocess((val) => {
      try {
        // handle URL-encoded JSON strings (e.g., '[{"id":"createdAt","desc":true}]')
        if (typeof val === "string") return JSON.parse(val);
        return val;
      } catch {
        return [];
      }
    }, z.array(sortItemSchema))
    .default([{ id: "created_at", desc: true }]),
});

export type ZSearchParamsSchema = z.infer<typeof searchParamsSchema>;
