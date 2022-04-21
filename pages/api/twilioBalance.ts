import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = twilio(
    process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID,
    process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN
  );
  const balance = await client.balance.fetch();
  res.json({ balance });
};
export default handler;
