import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./apps/api/src/models/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: process.env.NODE_ENV === "development",
});
