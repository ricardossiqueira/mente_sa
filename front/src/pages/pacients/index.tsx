import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Icon,
  InputLeftElement,
  Skeleton,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Wrap,
} from "@chakra-ui/react";
import Head from "next/head";
import { RiPencilLine, RiSearch2Line } from "react-icons/ri";

import { Input } from "../../components/Form/Input";
import { NewPacientModal } from "../../components/Modal/NewPacient";
import { Sidebar } from "../../components/Sidebar";
import { IListPacientDTO, useListPacients } from "../../hooks/useListPacients";

export default function Pacients() {
  const { error, isLoading, isFetching, data, refetch } = useListPacients();

  return (
    <>
      <Head>
        <title>Pacientes | Mente Sã</title>
      </Head>
      <main>
        <main>
          <Flex>
            <Sidebar />
            <Flex m={"4rem"} h={"fit-content"} flex={1} flexDir={"column"}>
              <Wrap>
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
                  <NewPacientModal refetch={refetch} />
                </Flex>
              </Wrap>
              <Wrap mt={"2rem"}>
                {error ? (
                  <Center>
                    <Text>Falha ao carregar dados.</Text>
                  </Center>
                ) : (
                  <Skeleton isLoaded={!isLoading} w={"100%"}>
                    <TableContainer borderRadius={"8px"}>
                      <Table
                        colorScheme={"blackAlpha"}
                        boxShadow={"md"}
                        variant={"striped"}
                      >
                        <Thead bg={"purple.600"} borderRadius={"8px"}>
                          <Tr>
                            <Th color={"whiteAlpha.900"} fontSize={"md"}>
                              Nome
                            </Th>
                            <Th color={"whiteAlpha.900"} fontSize={"md"}>
                              Endereço
                            </Th>
                            <Th color={"whiteAlpha.900"} fontSize={"md"}>
                              E-mail
                            </Th>
                            <Th color={"whiteAlpha.900"} fontSize={"md"}>
                              Gênero
                            </Th>
                            <Th color={"whiteAlpha.900"} fontSize={"md"}>
                              Endereço
                            </Th>
                            <Th color={"whiteAlpha.900"} fontSize={"md"}>
                              Ações
                            </Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {!isLoading &&
                            data.data.map(
                              ({
                                id,
                                address,
                                email,
                                gender,
                                name,
                              }: IListPacientDTO) => (
                                <Tr key={id}>
                                  <Td>
                                    <Text>{name}</Text>
                                  </Td>
                                  <Td>
                                    <Text>{address}</Text>
                                  </Td>
                                  <Td>
                                    <Text>{email}</Text>
                                  </Td>
                                  <Td>
                                    <Text>{gender}</Text>
                                  </Td>
                                  <Td>
                                    <Text>{address}</Text>
                                  </Td>
                                  <Td>Actions</Td>
                                </Tr>
                              )
                            )}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Skeleton>
                )}
              </Wrap>
            </Flex>
          </Flex>
        </main>
      </main>
    </>
  );
}
