import { Box, Flex } from "@chakra-ui/react";
import Head from "next/head";

import { Sidebar } from "../../components/Sidebar";

export default function Pacients() {
  return (
    <>
      <Head>
        <title>Pacientes | Mente Sã</title>
      </Head>
      <main>
        <Box>
          <Sidebar />
          <Flex w="100%" my={6} maxW={1480} mx="auto" px={[6, 8]}></Flex>
        </Box>
      </main>
    </>
  );
}
