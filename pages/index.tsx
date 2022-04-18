import {
  Text,
  Center,
  Heading,
  Box,
  Input,
  Flex,
  FormControl,
  FormLabel,
  NumberInput,
  FormHelperText,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  InputGroup,
  InputLeftAddon,
  Tooltip,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { regExs } from "../utilts";

const IndexPage = () => {
  const toast = useToast();
  const [state, setState] = useState({
    collectionURL: "",
    TriggerPrice: "",
    phoneNumber: "",
  });
  const [collectionStats, setCollectionStats] = useState({});

  return (
    <Flex flexDir="column">
      <Center
        bg="gray.100"
        mb={10}
        gap={3}
        p="1%"
        fontFamily="Arial"
        flexDir="column"
      >
        <Heading>Check the floor!</Heading>
        <Text color="gray.600">
          Get a text message whenever any of your subscribed collection's floor
          price falls under your trigger price
        </Text>
      </Center>

      <Center flexDir="column" m="0 auto">
        <form
          style={{ width: "150%", display: "flex", flexDirection: "column" }}
          onSubmit={async (e) => {
            e.preventDefault();
            if (
              //  check if info is valid
              regExs.phoneNumber.test(state.phoneNumber) &&
              regExs.url.test(state.collectionURL) &&
              Number(state.TriggerPrice) > 0
            ) {
              // gets collection data
              const collectionName = state.collectionURL.slice(
                state.collectionURL.lastIndexOf("/") + 1
              );
              try {
                const response = await fetch(
                  `/api/getCollection?collection=${collectionName}`
                );
                if (!response.ok) throw new Error(response.statusText);
                const responseData = await response.json();
                // TODO: Add subscription to Database
                // TODO: Use Twilio API to send text messages to subscribed users

                console.log(responseData);
                setCollectionStats({ ...responseData });
                return toast({
                  title: "Subscribed!",
                  description:
                    "We'll send you a message when this collection falls under your Trigger price.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              } catch (err) {
                alert(err.message);
              }
            } else {
              // show user which field they failed to input correctly
              if (!regExs.phoneNumber.test(state.phoneNumber))
                alert("Phone number isn't valid");
              if (!regExs.url.test(state.collectionURL))
                alert("Collection URL isn't valid");
              if (Number(state.TriggerPrice) <= 0)
                alert("Trigger price too low");
            }
          }}
        >
          <FormControl isRequired>
            <FormLabel>Collection URL</FormLabel>
            <Input
              onChange={(e) => {
                setState({ ...state, collectionURL: e.currentTarget.value });
              }}
              placeholder="https://opensea.io/collection/boredapeyachtclub"
            />
          </FormControl>

          <FormControl isRequired mt={5}>
            <FormLabel htmlFor="Trigger-price">
              Trigger price (in ETH)
              <Tooltip
                label="Once the floor price of this collection falls under this price, we'll send you a text message"
                fontSize="md"
              >
                <Button
                  _focus={{}}
                  _hover={{}}
                  _active={{}}
                  ml={3}
                  borderRadius={10}
                >
                  ?
                </Button>
              </Tooltip>
            </FormLabel>

            <NumberInput>
              <NumberInputField
                placeholder="50 ETH"
                onChange={(e) => {
                  setState({ ...state, TriggerPrice: e.currentTarget.value });
                }}
                id="Trigger-price"
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl isRequired mt={5}>
            <FormLabel>
              Please enter your phone number you'd like us to text
            </FormLabel>
            <InputGroup>
              <InputLeftAddon children="+1" />
              <NumberInput w="100%">
                <NumberInputField
                  onChange={(e) => {
                    setState({ ...state, phoneNumber: e.currentTarget.value });
                  }}
                  placeholder="415-123-456"
                  id="Trigger-price"
                />
              </NumberInput>
            </InputGroup>
          </FormControl>
          <Button ml="auto" mt={3} colorScheme="linkedin" type="submit">
            Sign me up!
          </Button>
        </form>
      </Center>
    </Flex>
  );
};

export default IndexPage;
