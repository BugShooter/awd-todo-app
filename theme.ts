import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    cssVarPrefix: "ck",
    initialColorMode: "light",
    useSystemColorMode: true,
  },
  colors: {
    transparent: "transparent",
    black: "#000",
    white: "#fff",
    gray: {
      50: "#f7fafc",
      900: "#171923",
    },

    orange: {
      50: "#FFFAF0",
      100: "#FEEBC8",
      200: "#FBD38D",
      300: "#F6AD55",
      400: "#ED8936",
      500: "#DD6B20",
      600: "#C05621",
      700: "#9C4221",
      800: "#7B341E",
      900: "#652B19",
    },
  },
  fonts: {
    heading: "var(--font-rubik)",
    body: "var(--font-rubik)",
  },
  borderRadius: {
    radii: {
      none: "0",
      sm: "0.125rem",
      base: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      "3xl": "1.5rem",
      full: "9999px",
    },
  },
});
