import Head from "next/head";
import React from "react";
import { Inter } from "@next/font/google";
import { NavBar } from "../src/components/navbar";
import {
  Box,
  VStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button
} from "@chakra-ui/react";
import { useProvider } from "../src/context";
import { AlertConnectWallet } from "../src/components/alertConnectWallet";
import { Value } from "../src/sub_pages/value";
import { AllEvents } from "../src/sub_pages/all_events";
import { ChangeContract } from "../src/components/change_contract";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // Attributes
  const { wallet, chainID } = useProvider();
  const [openAlertChainID, setOpenAlertChainID] = React.useState(true);
  const cancelRef = React.useRef();
  // Methods
  const isOpen = ( chainID != null && chainID != 5 && openAlertChainID);
  const onClose = () => setOpenAlertChainID(false);
  // Component
  return (
    <>
      {/* Alert Dialog Connected to a Different Blockchain */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              You are in a different blockchain than Goerli
            </AlertDialogHeader>

            <AlertDialogBody>
              You have to connect to Goerli Testnet to use this dapp.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Ok
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Head>
        <title>Events - Facundo Carballo</title>
        <meta name="description" content="App to show Web3 Events." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box h="20px" />
      <NavBar />
      {wallet == null ? (
        <AlertConnectWallet />
      ) : (
        <VStack>
          <Value />
          <Box h="20px" />
          <AllEvents title="ALL EVENTS" />
          <Box h="10px" />
          <AllEvents title="FILTERED EVENTS" />
          <Box h="20px" />
          <ChangeContract />
        </VStack>
      )}
    </>
  );
}
