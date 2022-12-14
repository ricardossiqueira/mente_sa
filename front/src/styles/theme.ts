import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    purple: {
      600: "#6813D4",
    },
  },
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  styles: {
    global: {
      body: {
        bg: "#efefef",
        color: "gray.900",
      },
    },
  },
});
