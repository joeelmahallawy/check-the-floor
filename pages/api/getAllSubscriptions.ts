import prisma from "../../lib/prisma";
const handler = async (req, res) => {
  try {
    const { query } = req;
    const { phoneNumber } = query;

    const subscriptions = await prisma.subscribersAndCollections.findMany({
      where: {
        Subscriber: {
          phoneNumber: BigInt(phoneNumber),
        },
      },
      select: {
        collectionID: true,
        subscriberID: true,
        Collection: {
          select: {
            collectionName: true,
          },
        },
        triggerPrice: true,
      },
    });

    const collections = subscriptions.map((sub) => ({
      collectionName: sub.Collection.collectionName,
      triggerPrice: sub.triggerPrice,
      collectionID: BigInt(sub.collectionID).toString(),
      subscriberID: BigInt(sub.subscriberID).toString(),
    }));
    res.send(collections);
  } catch (error) {
    res.json({ err: error.message });
  }
};
export default handler;
