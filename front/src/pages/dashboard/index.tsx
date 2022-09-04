import {
  Box,
  Center,
  Flex,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { GridItem } from "../../components/Dashboard/GridItem";

import { Sidebar } from "../../components/Sidebar";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard | Mente Sã</title>
      </Head>
      <main>
        <Flex>
          <Sidebar />
          <Flex m={"4rem"} h={"fit-content"} flex={1}>
            <SimpleGrid columns={4} spacing={"2rem"}>
              <GridItem title={"Sessões agendadas (dia)"} value={5} />
              <GridItem title={"Sessões agendadas (mês)"} value={5} />
              <GridItem title={"Sessões canceladas (mês)"} value={5} />
              <GridItem title={"Total de pacientes cadastrados"} value={5} />
              <GridItem title={"Total de sessões (individuais)"} value={5} />
              <GridItem title={"Total de sessões (dupla)"} value={5} />
              <GridItem title={"Total de sessões (grupo)"} value={5} />
            </SimpleGrid>
          </Flex>
        </Flex>
      </main>
    </>
  );
}
