import { Queue } from "quirrel/next";
import SendSMS from "../../../helpers/twilio";

export default Queue(
  "api/queues/jobs", // 👈 the route it's reachable on
  async (number: string) => {
    await SendSMS(number, "you are bawty mon");
  }
);
// RUN THIS IN PACKAGE JSON WHEN YOU WANT TO PUSH TO PROD
// "dev": "concurrently 'next dev' 'quirrel'",
