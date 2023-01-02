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
  Box
} from "@chakra-ui/react";
import { AllEventsTable } from "../components/all_events_table.jsx";

export const AllEvents = ({title}) => {
  // Attributes
  // Methods
  // Component
  return (
    <Accordion w="90%" allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <HStack w="full">
              <Box w="10px" />
              <Text color="white">{title}</Text>
              <Spacer />
              <AccordionIcon color="white" />
            </HStack>
          </AccordionButton>
        </h2>
        <AccordionPanel>
            <AllEventsTable all={title == "ALL EVENTS"} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
