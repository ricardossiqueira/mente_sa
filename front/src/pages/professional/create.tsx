import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Spacer,
  Text,
  VStack,
  Link as ChakraLink,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Head from "next/head";
import { useRouter } from "next/router";

import { Input } from "../../components/Form/Input";
import Link from "next/link";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";

type SignInFormDataType = {
  name: string;
  email: string;
  password: string;
};

const yupSignInFormSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome obrigatório")
    .min(5, "Mínimo de 5 caracteres"),
  email: yup.string().required("Email obrigatório").email("Email inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "Mínimo de 6 caracteres"),
  password_confirmation: yup
    .string()
    .required("Confirmação de senha obrigatória")
    .min(6, "Mínimo de 6 caracteres")
    .oneOf([yup.ref("password"), null], "As senhas devem ser iguais"),
});

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({ resolver: yupResolver(yupSignInFormSchema) });

  const signIn = useMutation(
    async (signInData: SignInFormDataType) => {
      const response = await api.post("/professional", { ...signInData });
      return response.data;
    },
    {
      onSuccess: () => {
        console.log("success");
      },
    }
  );

  const handleSignIn: SubmitHandler<SignInFormDataType> = async (values) => {
    await signIn.mutate(values);
  };

  return (
    <>
      <Head>
        <title>Criar conta | Mente Sã</title>
      </Head>
      <main id="main">
        <Flex w="100vw" h="100vh" align="center" justify="center">
          <Flex
            as="form"
            w="100%"
            maxW={400}
            bg="whiteAlpha.900"
            padding={8}
            borderRadius={8}
            flexDir="column"
            onSubmit={handleSubmit(handleSignIn)}
            boxShadow={"xl"}
          >
            <VStack spacing={4}>
              <Text color={"purple.600"} fontSize={"3xl"} fontWeight="bold">
                Mente Sã
              </Text>
              <Box width={"100%"}>
                <Text color={"purple.600"} fontSize={"xl"} fontWeight="bold">
                  Cadastro do profissional
                </Text>
                <Spacer height={"0.5rem"} />
                <Text fontSize={"sm"} color={"gray.400"}>
                  Crie sua conta e comece a desfrutar do nosso sistema
                </Text>
              </Box>
              <Input
                name="name"
                placeholder="Nome"
                error={errors.name}
                {...register("name")}
              />
              <Input
                name="email"
                placeholder="E-mail"
                error={errors.email}
                {...register("email")}
              />
              <Input
                name="password"
                placeholder="Senha"
                type="password"
                error={errors.password}
                {...register("password")}
              />
              <Input
                name="password_confirmation"
                placeholder="Confirmar Senha"
                type="password"
                error={errors.password_confirmation}
                {...register("password_confirmation")}
              />
              <HStack justifyContent={"space-between"} w={"100%"}>
                <HStack>
                  <Checkbox
                    name="terms"
                    id="terms"
                    mr={"0.2rem"}
                    colorScheme={"purple"}
                  />
                  <Text fontSize={"sm"} color={"gray.400"}>
                    Aceito os{" "}
                    <Link href="">
                      <ChakraLink color={"purple.400"} fontWeight={"bold"}>
                        termos
                      </ChakraLink>
                    </Link>{" "}
                    e{" "}
                    <Link href="">
                      <ChakraLink color={"purple.400"} fontWeight={"bold"}>
                        políticas de privacidade
                      </ChakraLink>
                    </Link>
                  </Text>
                </HStack>
              </HStack>
              <Button
                alignSelf={"flex-end"}
                type="submit"
                width={"fit-content"}
                colorScheme="purple"
                isLoading={isSubmitting}
              >
                Criar conta
              </Button>
            </VStack>
          </Flex>
        </Flex>
      </main>
    </>
  );
}
