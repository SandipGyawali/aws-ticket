import { ENVIRONMENT } from "@aws-ticket/env/server";

export const redis = new Bun.RedisClient(
  `redis://${ENVIRONMENT.REDIS_HOST}:${ENVIRONMENT.REDIS_PORT}`,
  { autoReconnect: true, enableAutoPipelining: true, maxRetries: 10 }
);