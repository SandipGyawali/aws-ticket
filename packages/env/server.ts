import * as z from "zod";

const envSchema = z.object({
  PORT: z.string(),
  DATABASE_URL: z.string(),
  APP_BASE_DOMAIN: z.string(),
  NODE_ENV: z.string(),
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
});

const ENVIRONMENT = envSchema.parse(process.env);
export { ENVIRONMENT };
