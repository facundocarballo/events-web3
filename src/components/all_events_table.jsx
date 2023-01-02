import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useProvider } from "../context";

export const AllEventsTable = ({ all }) => {
  // Attributes
  const { Events } = useProvider();

  // Methods
  // Components
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Wallet</Th>
            <Th>Amount</Th>
            <Th>Type</Th>
          </Tr>
        </Thead>
        <Tbody>
          {all
            ? Events.all.map((e, idx) => (
                <Tr key={idx}>
                  <Td>{e.date}</Td>
                  <Td>{e.wallet}</Td>
                  <Td>{e.value}</Td>
                  <Td>{e.msg}</Td>
                </Tr>
              ))
            : Events.filtered.map((e, idx) => (
                <Tr key={idx}>
                  <Td>{e.date}</Td>
                  <Td>{e.wallet}</Td>
                  <Td>{e.value}</Td>
                  <Td>{e.msg}</Td>
                </Tr>
              ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
