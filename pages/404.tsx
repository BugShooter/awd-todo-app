// pages/404.js
import React from "react";
import Head from "next/head";
import { Box, Button, Link } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import errorImage from "../lib/images/svg/404-Teal.svg";

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <Box
        backgroundColor="#FFF2D7"
        backgroundImage={`url(${errorImage})`}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <h1 style={{ color: "black" }}>404 - Page Not Found</h1>
        <p style={{ color: "black" }}>Lost? There's no place like home! </p>

        <Link href="/">
          <Button
            leftIcon={<ArrowBackIcon />}
            colorScheme="teal"
            variant="solid"
          >
            Home
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default NotFoundPage;
