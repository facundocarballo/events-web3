import React from "react";
import { useProvider } from "../context";
import { Button, HStack, Spacer, Spinner } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

export const ChangeValue = ({ func, increment }) => {
  // Attributes
  const [loading, setLoading] = React.useState(false);
  const { setAllValues } = useProvider();
  // Methods
  const handleChangeValue = async () => {
    setLoading(true);
    const params = await func();
    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        console.log("Transaction Hash: ", res);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (rec) {
              clearInterval(interval);
              setAllValues().then(() => {
                setLoading(false);
              });
            }

            if (err) {
              clearInterval(interval);
              setLoading(false);
              console.log("ERROR: ", err);
            }
          });
        }, 500);
      });
  };
  // Component
  return (
    <>
      {loading ? (
        <HStack w="30px" bg='gray.600' borderRadius={6}>
          <Spacer />
          <Spinner />
          <Spacer />
        </HStack>
      ) : (
        <Button w="30px" bg='gray.600' borderRadius={6} onClick={handleChangeValue} fontSize='xl' fontWeight='bold'>
            {increment ? <AddIcon />: <MinusIcon />}
        </Button>
      )}
    </>
  );
};
