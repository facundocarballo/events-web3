import { useColorModeValue } from "@chakra-ui/react";

export const ButtonStyles = {
    variants: {
        callToAction: () => ({
            bg: useColorModeValue('blue.300', 'blue.400'),
            color: useColorModeValue('gray.700', 'gray.200'),
            margin: '2px',
            borderRadius: '6px',
            _hover: {
                boxShadow: 'md',
                transform: 'scale(1.12)',
                bg: useColorModeValue('blue.400', 'blue.500'),
                color: useColorModeValue('gray.700', 'gray.200'),
            }
        }),
        modifyValue: () => ({
            bg: useColorModeValue('gray.200', 'gray.600'),
            color: useColorModeValue('gray.700', 'gray.200'),
            borderRadius: '6px',
            _hover: {
                boxShadow: 'md',
                transform: 'scale(1.12)',
                bg: useColorModeValue('gray.300', 'gray.700'),
                color: useColorModeValue('gray.700', 'gray.200'),
            }
        }),
    }
}