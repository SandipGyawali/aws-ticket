import { ENVIRONMENT } from "@aws-ticket/env/server";
import { Job, Queue, QueueOptions, Worker } from "bullmq";

export const createQueue = <T>(
  name: string,
  options: Omit<QueueOptions, "connection">,
  db: number,
  processJob: (arg: Job<T>) => Promise<void>
) => {
  const connection = {
    db,
    host: ENVIRONMENT.REDIS_HOST,
    port: ENVIRONMENT.REDIS_PORT,
  };

  const queue = new Queue(name, {
    ...options,
    connection,
  });

  const worker = new Worker<T>(
    name,
    async (job) => {
      console.log(
        `Running job for queue ${name} with data: ${JSON.stringify(job.data)}`
      );
      await processJob(job);
    },
    { connection }
  );

  return {
    addToQueue: async (data: T) => {
      return await queue.add("", data);
    },
  };
};
