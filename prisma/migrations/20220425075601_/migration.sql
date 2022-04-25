-- CreateTable
CREATE TABLE "Collection" (
    "id" BIGINT NOT NULL,
    "collectionName" TEXT NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriber" (
    "id" BIGINT NOT NULL,
    "phoneNumber" BIGINT NOT NULL,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscribersAndCollections" (
    "subscriberID" BIGINT NOT NULL,
    "collectionID" BIGINT NOT NULL,
    "triggerPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SubscribersAndCollections_pkey" PRIMARY KEY ("collectionID","subscriberID")
);

-- AddForeignKey
ALTER TABLE "SubscribersAndCollections" ADD CONSTRAINT "SubscribersAndCollections_collectionID_fkey" FOREIGN KEY ("collectionID") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscribersAndCollections" ADD CONSTRAINT "SubscribersAndCollections_subscriberID_fkey" FOREIGN KEY ("subscriberID") REFERENCES "Subscriber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
