import { NextApiRequest, NextApiResponse } from "next";
import { QuirrelClient } from "quirrel/dist/esm/src/client";
import SendSMS from "../../helpers/twilio";
import prisma from "../../lib/prisma";
import JobQueue from "../api/queues/jobs";

// const quirrelClient = new QuirrelClient({ config: {} });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const x = 1800;
    const x = 30;
    // auth for only developer to call this (THIS IS TO BE CALLED ONCE)
    // this calls a job every x seconds (x=10)
    // whenever a job gets called, we loop thru our database and send messages
    if (
      // can find this in .env.local
      req.headers.authorization == process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      // checks every 30 minutes
      const queueRes = await JobQueue.enqueue(
        {},
        { repeat: { every: x * 1000 } }
      );

      res.send(queueRes);
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    res.json({ err: error.message });
  }
};
export default handler;
