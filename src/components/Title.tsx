import React from "react";
import { HStack, Image, Heading, Box } from "@chakra-ui/react";

export const Title = () => {
    // Attributes
    // Methods
    // Component
    return(
        <HStack>
            <Image 
            src='https://i.ibb.co/3kmQ59f/memoji-guino.webp'
            alt='facundo-carballo-image'
            boxSize='50px'
            />
            <Box w='15px' />
            <Heading>
                Events
            </Heading>
        </HStack>
    );
};