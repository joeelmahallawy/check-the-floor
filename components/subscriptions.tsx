import { useDisclosure } from "@chakra-ui/hooks";
import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import prisma from "../lib/prisma";

const listOfSubscriptions = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [phoneNumber, setPhoneNumber] = useState(
    localStorage.getItem("phoneNumber")
  );
  const [subscriptions, setSubscriptions] = useState([]);

  const [isSmallerThan900] = useMediaQuery("(max-width: 500px)");

  useEffect(() => {
    (async () => {
      // FIXME: Cannot serialize a big int
      const subscriptionsResponse = await fetch(
        `/api/getAllSubscriptions?phoneNumber=${localStorage.getItem(
          "phoneNumber"
        )}`
      );
      const subscriptionData = await subscriptionsResponse.json();
      // console.log(subscriptionData);
      setSubscriptions([...subscriptionData]);
    })();
  }, []);

  return (
    <>
      <Divider mt={5} w="100%" />
      <Button
        m="0 auto"
        mt={["5%", "2%", "2%", "2%", "2%"]}
        mb={["5%", "0%", "0%", "0%", "0%"]}
        pt={[5, 2, 0, 0, 0]}
        pb={[5, 2, 0, 0, 0]}
        onClick={onOpen}
      >
        Check subscriptions
      </Button>
      <Modal size="3xl" onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <span style={{ fontWeight: "normal" }}>Subscriptions for</span>{" "}
            {phoneNumber}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {subscriptions.map((sub, i) => (
              <Center
                fontSize={["8px", "10px", "medium", "medium", "medium"]}
                key={i}
                _hover={{ bg: "gray.200" }}
                borderRadius={5}
                justifyContent="space-between"
                p={3}
                pl={3}
                bg="gray.100"
                mt={2}
              >
                <Box>
                  Collection Name
                  <Heading
                    // fontSize="xl"
                    fontSize={["11px", "lg", "xl", "xl", "xl"]}
                  >
                    {sub.collectionName}
                  </Heading>
                </Box>
                <Box>
                  Trigger price
                  <Heading
                    // fontSize="xl"
                    fontSize={["11px", "lg", "xl", "xl", "xl"]}
                  >
                    {sub.triggerPrice} ETH
                  </Heading>
                </Box>
                <Button
                  //
                  size={isSmallerThan900 ? "xs" : "md"}
                  colorScheme="blue"
                  onClick={async () => {
                    // unsubscribe
                    const unsubscribe = await fetch("/api/unsubscribe", {
                      method: "DELETE",
                      body: JSON.stringify({
                        // by collection and subscriber ID
                        collectionID: sub.collectionID,
                        subscriberID: sub.subscriberID,
                      }),
                    });
                    const { success } = await unsubscribe.json();
                    // if successfully unsubscribed
                    if (success) {
                      // remove subscription
                      const indexToRemove = subscriptions.findIndex((subs) => {
                        return (subs.collectionName = sub.collectionName);
                      });
                      subscriptions.splice(indexToRemove, 1);
                      // and update list of subscriptions
                      setSubscriptions([...subscriptions]);
                      onClose();
                      // show success message to user
                      return toast({
                        title: "Unsubscribed!",
                        description: `You will no longer recieve a message even when ${sub.collectionName}'s floor price falls under ${sub.triggerPrice} ETH.`,
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                      });
                    }
                  }}
                >
                  Unsubscribe
                </Button>
              </Center>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default listOfSubscriptions;
