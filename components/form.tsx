import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";

const Form = ({ state, setState }) => {
  return (
    <>
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
              onClick={async () => {}}
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
    </>
  );
};
export default Form;
