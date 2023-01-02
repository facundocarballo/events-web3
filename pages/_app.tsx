import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { DappProvider } from "../src/context";
import { theme } from '../styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DappProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </DappProvider>
  );
}
