import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { collectionID, subscriberID } = JSON.parse(req.body);
    await prisma.subscribersAndCollections.delete({
      where: {
        collectionID_subscriberID: {
          collectionID: BigInt(collectionID),
          subscriberID: BigInt(subscriberID),
        },
      },
    });

    res.send({ success: true });
  } catch (error) {
    res.json({ err: error.message });
  }
};
export default handler;
