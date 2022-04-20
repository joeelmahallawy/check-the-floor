import { Queue } from "quirrel/next";
import { CronJob } from "quirrel/blitz";
import SendSMS from "../../../helpers/twilio";
import prisma from "../../../lib/prisma";
import notify from "../../../helpers/notify";

export default Queue(
  "api/queues/jobs", // 👈 the route it's reachable on
  async () => {
    // FIXME: NOT EXECUTING
    // await SendSMS("6478958647", "Hi test");
    await notify();
  }
);
