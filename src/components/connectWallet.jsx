import React from "react";
import { Button, Spinner, HStack, Spacer, useColorModeValue} from "@chakra-ui/react";
import { useProvider } from "../context";

export const ConnectWallet = () => {
  // Attributes
  const [loading, setLoading] = React.useState(false);
  const { wallet, setAllValues } = useProvider();
  const bg = useColorModeValue('blue.300', 'blue.400');
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
          <HStack w="150px" h='40px' borderRadius={6} bg={bg}>
            <Spacer />
            <Spinner />
            <Spacer />
          </HStack>
        ) : (
          <Button
            w="150px"
            variant='callToAction'
            onClick={handleConnect}
          >
            Connect Wallet
          </Button>
        )
      ) : (
        <Button w="150px" variant='callToAction'>
          {getShortAddressWallet(wallet)}
        </Button>
      )}
    </>
  );
};
