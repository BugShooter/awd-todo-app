import React from "react";
import { Container, Heading, Box, Badge } from "@chakra-ui/react";

export default function MainContainer({ mainTitle, children }) {
  return (
    <Box
      p="6"
      width={["100%", 500]}
      height={["88%", "500px"]}
      border="2px"
      borderColor="gray.300"
      borderRadius={["0", "50px"]}
      overflowY="auto"
      pt={["10","auto"]}
    >
      <Container>
        <Heading
         
          pb={8}
          as="h3"
          size="3xl"
          
          
        >
          {mainTitle}
        </Heading>
        {children}
      </Container>
    </Box>
  );
}
