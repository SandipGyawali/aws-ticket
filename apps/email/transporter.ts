import { createTransport } from "nodemailer";
import { ENVIRONMENT as ENV } from "@aws-ticket/env/server";

const transporter = createTransport({
  host: ENV.SMTP_HOST,
  port: ENV.SMTP_PORT,
  secure: ENV.SMTP_SECURE, // true for 465, false for other ports
  auth: {
    user: ENV.SMTP_USER,
    pass: ENV.SMTP_PASS,
  },
  from: ENV.SMTP_DEFAULT_FROM,
  socketTimeout: 10_000,
  dnsTimeout: 10_000,
});

export { transporter };
