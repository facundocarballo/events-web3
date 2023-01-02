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

export const AllEventsTable = ({ all, erc20 }) => {
  // Attributes
  const { Events, ERC20_Events } = useProvider();

  // Methods
  // Components
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          {!erc20 ? (
            <Tr>
              <Th>Date</Th>
              <Th>Wallet</Th>
              <Th>Amount</Th>
              <Th>Type</Th>
            </Tr>
          ) : (
            <Tr>
              <Th>Date</Th>
              <Th>From</Th>
              <Th>To</Th>
              <Th>Amount</Th>
              <Th>Type</Th>
            </Tr>
          )}
        </Thead>
        <Tbody>
          {!erc20
            ? all
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
                ))
            : all
            ? ERC20_Events.all.map((e, idx) => (
                <Tr key={idx}>
                  <Td>{e.date}</Td>
                  <Td>{e.from}</Td>
                  <Td>{e.to}</Td>
                  <Td>{e.value}</Td>
                  <Td>{e.msg}</Td>
                </Tr>
              ))
            : ERC20_Events.filtered.map((e, idx) => (
                <Tr key={idx}>
                  <Td>{e.date}</Td>
                  <Td>{e.from}</Td>
                  <Td>{e.to}</Td>
                  <Td>{e.value}</Td>
                  <Td>{e.msg}</Td>
                </Tr>
              ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
