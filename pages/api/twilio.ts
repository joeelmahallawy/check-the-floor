import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import JobQueue from "../api/queues/jobs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const x = 1800;
    // auth for only developer to call this (THIS IS TO BE CALLED ONCE)
    // this calls a job every x seconds (x=10)
    // whenever a job gets called, we loop thru our database and send messages
    if (
      // can find this in .env.local
      req.headers.authorization == process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      // checks every 30 minutes
      await JobQueue.enqueue({}, { repeat: { every: x * 1000 } });
    }

    res.send({});
    res.end();
  } catch (error) {
    res.json({ err: error.message });
  }
};
export default handler;