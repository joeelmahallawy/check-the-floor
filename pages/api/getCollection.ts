import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { collection } = req.query;
    const response = await fetch(
      `https://api.opensea.io/api/v1/collection/${collection}/stats`
    );
    const { stats } = await response.json();
    res.status(200).send(stats);
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
};
export default handler;
