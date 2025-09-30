import { Queue, Worker } from "bullmq";
import { sendEmail } from "../utils/mailer";
import IORedis from "ioredis";
const connection = new IORedis();

export const emailQueue = new Queue("emailQueue", { connection });

new Worker(
  "emailQueue",
  async (job) => {
    const { to, subject, template } = job.data;
    await sendEmail(to, subject, template);
  },
  { connection }
);