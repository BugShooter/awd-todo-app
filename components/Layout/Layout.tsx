import React from "react";
import { SWRConfig } from "swr";
import Head from "next/head";
import MenuContainer from "../Navigation/MenuContainer";
import { ColorModeScript, Box, Wrap, HStack } from "@chakra-ui/react";
import { theme } from "../../theme";

const Layout = ({ children, title }) => {
  return (
    <SWRConfig>
      <Head>
        <title>{title || "TaskTango"}</title>
      </Head>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Box
        h="100%"
        w="100%"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        display={{ base: "flex", md: "flex" }} // flex layout on medium and larger screens
        flexDirection={{ base: "column-reverse", md: "row" }} // column layout on smaller screens
        gap={["0px", "8px"]}
      >
        <MenuContainer />
        {children}
      </Box>
    </SWRConfig>
  );
};

export default Layout;
