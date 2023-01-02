import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
  Text,
  Spacer,
  Box,
  useColorModeValue
} from "@chakra-ui/react";
import { AllEventsTable } from "../components/all_events_table.jsx";
import { useProvider } from "../context.jsx";

export const AllEvents = ({title}) => {
  // Attributes
  const { isContractEvents } = useProvider();
  const colorText = useColorModeValue('gray.700', 'gray.200');
  // Methods
  // Component
  return (
    <Accordion w="90%" allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <HStack w="full">
              <Box w="10px" />
              <Text color={colorText}>{title}</Text>
              <Spacer />
              <AccordionIcon color={colorText} />
            </HStack>
          </AccordionButton>
        </h2>
        <AccordionPanel>
            <AllEventsTable all={title == "ALL EVENTS"} erc20={!isContractEvents} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
