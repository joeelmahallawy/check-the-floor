import { NextApiRequest, NextApiResponse } from "next";

import twilio from "twilio";
import prisma from "../../lib/prisma";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let { collectionURL, TriggerPrice, phoneNumber } = JSON.parse(req.body);
    phoneNumber = phoneNumber.replaceAll("+", "").replaceAll("-", "");
    const collectionName = collectionURL.slice(
      collectionURL.lastIndexOf("/") + 1
    );
    // create random ID
    const collectionID = Math.floor(Math.random() * 999999999);
    const subscriberID = Math.floor(Math.random() * 999999999);

    // check if collection exists
    const collection = await prisma.collection.findFirst({
      where: {
        collectionName,
      },
    });
    // check if subscriber already exists
    const subscriber = await prisma.subscriber.findFirst({
      where: {
        phoneNumber: Number(phoneNumber),
      },
    });
    // check if this combination already exists
    const combination = await prisma.subscribersAndCollections.findFirst({
      where: {
        Subscriber: {
          phoneNumber: Number(phoneNumber),
        },
        AND: {
          Collection: {
            collectionName: collectionName,
          },
        },
      },
    });

    if (!collection) {
      // if doesn't exist, create new collection entry
      await prisma.collection.create({
        data: {
          id: collectionID,
          collectionName,
        },
      });
    }
    if (!subscriber) {
      // if doesn't exist create new subscriber entry
      await prisma.subscriber.create({
        data: {
          id: subscriberID,
          phoneNumber: Number(phoneNumber),
        },
      });
    }
    if (!combination) {
      // if this combination doesn't exist, subscribe
      await prisma.subscribersAndCollections.create({
        data: {
          // if collection does exist, then use old id, otherwise new id
          collectionID: collection ? collection.id : collectionID,
          // if subscriber does exist, then use old id, otherwise new id
          subscriberID: subscriber ? subscriber.id : subscriberID,
          // new price that the subscriber has set
          triggerPrice: Number(TriggerPrice),
        },
      });
    } else {
      // update to new trigger price
      await prisma.subscribersAndCollections.update({
        where: {
          collectionID_subscriberID: {
            collectionID: combination.collectionID,
            subscriberID: combination.subscriberID,
          },
        },
        data: {
          triggerPrice: Number(TriggerPrice),
        },
      });
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ error: error.message });
  }
};

export default handler;
