import { Flex, Icon, InputLeftElement, Text, Wrap } from "@chakra-ui/react";
import Head from "next/head";
import { RiSearch2Line } from "react-icons/ri";

import { Input } from "../../components/Form/Input";
import { NewPacientModal } from "../../components/Modal/NewPacient";
import { Sidebar } from "../../components/Sidebar";

export default function Pacients() {
  return (
    <>
      <Head>
        <title>Pacientes | Mente Sã</title>
      </Head>
      <main>
        <main>
          <Flex>
            <Sidebar />
            <Flex m={"4rem"} h={"fit-content"} flex={1}>
              <Flex
                flex={1}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Text
                  as={"h1"}
                  fontSize={"3xl"}
                  fontWeight={"bold"}
                  color={"blackAlpha.700"}
                >
                  Meus Pacientes
                </Text>
                <Wrap w={"50%"}>
                  <Input
                    placeholder="Pesquisar"
                    name="search"
                    inputElement={
                      <InputLeftElement pt={"0.5rem"}>
                        <Icon
                          as={RiSearch2Line}
                          w={5}
                          h={5}
                          color={"blackAlpha.500"}
                        />
                      </InputLeftElement>
                    }
                  />
                </Wrap>
                <NewPacientModal />
              </Flex>
            </Flex>
          </Flex>
        </main>
      </main>
    </>
  );
}
