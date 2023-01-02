import React from "react";
import { HStack, Box, Spacer } from "@chakra-ui/react";
import { ConnectWallet } from './connectWallet';
import { Title } from "./Title";

export const NavBar = () => {
    // Attributes
    // Methods
    // Component
    return(
        <HStack w='full'>
            <Box w='10px' />
            <Title />
            <Spacer />
            <ConnectWallet />
            <Box w='10px' />
        </HStack>
    );
};