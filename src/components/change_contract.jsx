import React from "react";
import { Button } from '@chakra-ui/react';
import { useProvider } from "../context";

export const ChangeContract = () => {
    // Attributes
    const { isContractEvents, setIsContractEvents } = useProvider();
    // Methods
    const handleChangeContract = () => {
        setIsContractEvents(!isContractEvents);
    };
    // Component
    return(
        <Button w='250px' bg='blue.300' borderRadius={6} onClick={handleChangeContract}>
            {isContractEvents ? "USDT Events" : "Smart Contract Events"}
        </Button>
    );
};