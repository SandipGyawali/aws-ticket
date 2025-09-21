import * as z from "zod";

const envSchema = z.object({});

const CLIENT_ENVIRONMENT = envSchema.parse(import.meta.env);

export { CLIENT_ENVIRONMENT };
