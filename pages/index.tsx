import {
  Text,
  Center,
  Flex,
  useToast,
  Button,
  Box,
  Heading,
  Divider,
  useForceUpdate,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Form from "../components/form";
import Header from "../components/header";
import { regExs } from "../utilts";
import { supabase } from "../lib/supabaseClient";
import Footer from "../components/footer";
import ListOfSubscriptions from "../components/subscriptions";

const IndexPage = () => {
  const toast = useToast();
  const [state, setState] = useState({
    collectionURL: "",
    TriggerPrice: "",
    phoneNumber: "",
    collectionStats: {},
  });

  return (
    <Flex flexDir="column" h="100vh">
      <Header />
      <Center
        flexDir="column"
        m="0 auto"
        w={["85%", "75%", "60%", "50%", "35%", "25%"]}
      >
        <form
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          onSubmit={async (e) => {
            e.preventDefault();
            if (
              //  check if info is valid
              regExs.phoneNumber.test(
                state.phoneNumber.replaceAll("+", "").replaceAll("-", "")
              ) &&
              regExs.url.test(state.collectionURL) &&
              Number.parseFloat(state.TriggerPrice) > 0
            ) {
              // gets collection data
              const collectionName = state.collectionURL.slice(
                state.collectionURL.lastIndexOf("/") + 1
              );
              return fetch(
                // ensure that this collection exists
                `https://api.opensea.io/api/v1/collection/${collectionName}/stats`
              )
                .then(async (res) => {
                  if (res.ok) {
                    // console.log(state);
                    const { stats } = await res.json();
                    // console.log(stats);
                    const subscribe = await fetch(`/api/subscribe`, {
                      method: "POST",
                      body: JSON.stringify({
                        ...state,
                        // remove any + or - from phone input
                        phoneNumber: state.phoneNumber
                          .replaceAll("+", "")
                          .replaceAll("-", ""),
                      }),
                    });
                    // set phone number in local storage so that we can display all the subscriptions
                    localStorage.setItem("phoneNumber", state.phoneNumber);

                    // handle any errors
                    if (!subscribe.ok) throw new Error(subscribe.statusText);
                    // if sucess is true, display that to the user
                    const subscribeData = await subscribe.json();
                    if (!subscribeData.success) alert(subscribeData.error);
                    // console.log(subscribeData);
                    if (subscribeData.success) {
                      return toast({
                        title: "Subscribed!",
                        description: `We'll send a message to ${state.phoneNumber
                          .replaceAll("+", "")
                          .replaceAll(
                            "-",
                            ""
                          )} when ${collectionName}'s floor price falls under ${
                          state.TriggerPrice
                        } ETH.`,
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                      });
                    }

                    setState({
                      ...state,
                      collectionStats: { ...stats },
                    });
                  } else {
                    throw new Error("Could not get collection");
                  }
                })
                .catch((err) => alert(err.message));
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
          <Form state={state} setState={setState} />
        </form>
      </Center>

      {typeof window !== "undefined" && localStorage.getItem("phoneNumber") && (
        <ListOfSubscriptions />
      )}
      <Footer />
    </Flex>
  );
};

export default IndexPage;
