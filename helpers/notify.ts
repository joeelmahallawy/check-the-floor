import prisma from "../lib/prisma";
import SendSMS from "./twilio";

const notify = async () => {
  try {
    // get all subscriptions
    const subscriptions = await prisma.subscribersAndCollections.findMany({
      select: {
        triggerPrice: true,
        Collection: { select: { collectionName: true, id: true } },
        Subscriber: { select: { phoneNumber: true, id: true } },
      },
    });
    // get collection name and trigger price of subscribed users
    const subscriptionData = subscriptions.map((sub) => ({
      collectionID: sub.Collection.id.toString(),
      subscriberID: sub.Subscriber.id.toString(),
      triggerPrice: sub.triggerPrice,
      collectionName: sub.Collection.collectionName,
      phoneNumber: sub.Subscriber.phoneNumber.toString(),
    }));

    // look thru all subscriptions
    subscriptionData.forEach(async (sub) => {
      // check floor price
      const response = await fetch(
        `https://api.opensea.io/api/v1/collection/${sub.collectionName}/stats`
      );
      const { stats } = await response.json();
      // if it's less than their trigger price
      // console.log("Hello");

      if (stats.floor_price <= sub.triggerPrice) {
        // send them a message
        await SendSMS(
          sub.phoneNumber,
          `CheckTheFloor: ${sub.collectionName}'s floor price fell under your trigger price (${sub.triggerPrice}ETH), it's currently at ${stats.floor_price} ETH!`
        );
        // remove that subscription from the database so they receive message once and don't get spammed
        await prisma.subscribersAndCollections.delete({
          where: {
            collectionID_subscriberID: {
              collectionID: BigInt(sub.collectionID),
              subscriberID: BigInt(sub.subscriberID),
            },
          },
        });
      }
    });
    return {};
  } catch (error) {
    return error;
  }
};
export default notify;
