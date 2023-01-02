import React from "react";
import { HStack, Spacer, Text } from '@chakra-ui/react';
import { useProvider } from "../context";
import { Addresses, buildTransaciont } from "../web3/funcs";
import { ChangeValue } from '../components/change_value';

export const Value = () => {
    // Attributes
    const { value, ContractEvents, wallet } = useProvider();
    // Methods
    const incrementParams = async () => {
        const data = await ContractEvents.methods.increment().encodeABI();
        const params = await buildTransaciont(wallet, Addresses.events, data);
        return params;
    }
    const decrementParams = async () => {
        const data = await ContractEvents.methods.decrement().encodeABI();
        const params = await buildTransaciont(wallet, Addresses.events, data);
        return params;
    };
    // Component
    return(
        <HStack w='250px' bg='blue.300' borderRadius={6}>
            <ChangeValue func={decrementParams} increment={false} />
            <Spacer />
            <Text fontSize='xl' fontWeight='bold'>Value: {value}</Text>
            <Spacer />
            <ChangeValue func={incrementParams} increment={true} />
        </HStack>
    );
};