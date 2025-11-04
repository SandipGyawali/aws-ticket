import * as z from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string(),
});

const CLIENT_ENVIRONMENT = envSchema.parse(import.meta.env);

export { CLIENT_ENVIRONMENT };
