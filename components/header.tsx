import { Center, Text, Heading } from "@chakra-ui/react";
import React from "react";

const Header = () => {
  return (
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
  );
};
export default Header;
