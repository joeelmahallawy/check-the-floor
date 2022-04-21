import { Center, Text, Heading } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Center
      mt="auto"
      bg="gray.100"
      gap={3}
      p={["7.5%", "5%", "3%", "2%", "1.5%"]}
      fontFamily="Arial"
      flexDir="column"
    >
      &copy; Copyright 2022
    </Center>
  );
};
export default Footer;
