import { NextApiRequest, NextApiResponse } from "next";
import JobQueue from "../api/queues/jobs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await JobQueue.enqueue(
      "6478958647", // job to be enqueued
      { repeat: { every: 30000 } } // every 30 seconds
    );
    res.json({ areYouBawty: true });
  } catch (error) {
    res.json({ err: error.message });
  }
};
export default handler;
