import Head from "next/head";
import { Inter } from "@next/font/google";
import { NavBar } from "../src/components/navbar";
import { Box, VStack } from "@chakra-ui/react";
import { useProvider } from "../src/context";
import { AlertConnectWallet } from "../src/components/alertConnectWallet";
import { Value } from "../src/sub_pages/value";
import { AllEvents } from "../src/sub_pages/all_events";
import { ChangeContract } from "../src/components/change_contract";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // Attributes
  const { wallet, isContractEvents } = useProvider();
  // Methods

  // Component
  return (
    <>
      <Head>
        <title>Events - Facundo Carballo</title>
        <meta name="description" content="App to show Web3 Events." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box h="10px" />
      <NavBar />
      {wallet == null ? (
        <AlertConnectWallet />
      ) : (
        <VStack>
          <Value />
          <AllEvents title="ALL EVENTS" />
          <AllEvents title="FILTERED EVENTS" />
          <ChangeContract />
        </VStack>
      )}
    </>
  );
}
