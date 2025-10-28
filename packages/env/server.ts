import * as z from "zod";

const envSchema = z.object({
  PORT: z.string(),
  DATABASE_URL: z.string(),
  APP_BASE_DOMAIN: z.string(),
  NODE_ENV: z.string(),

  // jwt
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),

  // smtp
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(), // convert from string to number
  SMTP_SECURE: z.coerce.boolean(),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  SMTP_DEFAULT_FROM: z.string(),

  // redis
  REDIS_HOST: z.string().default("localhost"),
  REDIS_PORT: z.coerce.number().default(6379),
});

const ENVIRONMENT = envSchema.parse(process.env);
export { ENVIRONMENT };
