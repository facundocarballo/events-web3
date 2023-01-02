import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./buttons";

const components = { Button };
const values = { components };

export const theme = extendTheme(values);