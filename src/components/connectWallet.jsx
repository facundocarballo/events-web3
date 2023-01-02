import React from "react";
import { Button, Spinner, HStack } from "@chakra-ui/react";
import { useProvider } from "../context";

export const ConnectWallet = () => {
  // Attributes
  const [loading, setLoading] = React.useState(false);
  const { wallet, setAllValues } = useProvider();
  // Methods
  const handleConnect = async () => {
    setLoading(true);
    await setAllValues();
    setLoading(false);
  };
  const getShortAddressWallet = (str) => {
    const firstPart = str.substring(0, 5);
    const secondPart = str.substring(str.length - 5, str.length);
    return firstPart + "..." + secondPart;
  };
  // Component
  return (
    <>
      {wallet == null ? (
        loading ? (
          <HStack w="150px" borderRadius={6} bg="blue.300">
            <Spinner />
          </HStack>
        ) : (
          <Button
            w="150px"
            borderRadius={6}
            bg="blue.300"
            onClick={handleConnect}
          >
            Connect Wallet
          </Button>
        )
      ) : (
        <Button w="150px" borderRadius={6} bg="blue.300">
          {getShortAddressWallet(wallet)}
        </Button>
      )}
    </>
  );
};
