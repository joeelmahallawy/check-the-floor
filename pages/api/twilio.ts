import { NextApiRequest, NextApiResponse } from "next";
import { QuirrelClient } from "quirrel/dist/esm/src/client";
import notify from "../../helpers/notify";
import SendSMS from "../../helpers/twilio";
import prisma from "../../lib/prisma";
import JobQueue from "../api/queues/jobs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Checks every 10 minutes
    const x = 600;
    // auth for developer to call this (THIS IS TO BE CALLED ONCE)
    // this queues a job every x seconds
    // whenever a job gets queued, we loop thru our database and send messages
    if (
      // can find this in .env.local
      req.headers.authorization == process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      setInterval(async () => {
        // checks every 30 minutes
        await JobQueue.enqueue({});
      }, x * 1000);
      // const not = await notify();
      res.send({});
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    res.json({ err: error.message });
  }
};
export default handler;
