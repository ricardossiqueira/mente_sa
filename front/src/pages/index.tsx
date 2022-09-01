import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Spacer,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Head from "next/head";
import Link from "next/link";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

import { Input } from "../components/Form/Input";
import { IRequestError } from "../shared/interfaces/IRequestError";
import { AuthContext } from "../contexts/AuthContext";

type LoginFormDataType = {
  email: string;
  password: string;
};

const yupSignInFormSchema = yup.object().shape({
  email: yup.string().required("Email obrigatório").email("Email inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(8, "Senha muito curta (mínimo 8 caracteres)"),
});

export default function SignIn() {
  const [rememberMe, setRememberMe] = useState(false);

  const toast = useToast();
  const router = useRouter();
  const { signIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({ resolver: yupResolver(yupSignInFormSchema) });

  const login = useMutation(
    async (loginData: LoginFormDataType) => {
      const response = await signIn({ ...loginData });
      return response;
    },

    {
      onSuccess: () => {
        router.push("/professional");
        toast({
          title: "Login efetuado com sucesso",
          status: "success",
          isClosable: false,
        });
      },
      onError: (error: IRequestError) => {
        const { message } = error.response.data;
        toast({
          title: "Erro ao efetuar login",
          description: message,
          status: "error",
          isClosable: false,
        });
      },
    }
  );

  const handleSignIn: SubmitHandler<LoginFormDataType> = async (values) => {
    await login.mutateAsync(values);
  };

  const handleRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  return (
    <>
      <Head>
        <title>Login | Mente Sã</title>
      </Head>
      <main>
        <Flex w="100vw" h="100vh" align="center" justify="center">
          <Flex
            as="form"
            w="100%"
            maxW={400}
            bg="whiteAlpha.900"
            padding={5}
            borderRadius={6}
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
                  Bem-vindo ao sistema
                </Text>
                <Spacer height={"0.5rem"} />
                <Text fontSize={"sm"} color={"gray.400"}>
                  Por favor entre com sua conta
                </Text>
              </Box>
              <Input
                name="email"
                placeholder="E-mail"
                type="email"
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
              <HStack justifyContent={"space-between"} w={"100%"}>
                <HStack>
                  <Checkbox
                    name="remember"
                    mr={"0.2rem"}
                    colorScheme={"purple"}
                    checked={rememberMe}
                    onChange={handleRememberMe}
                  />
                  <Text fontSize={"sm"} color={"gray.400"}>
                    Lembrar usuário
                  </Text>
                </HStack>
                <Text fontSize={"sm"} color={"gray.400"}>
                  <Link href="">Esqueci minha senha?</Link>
                </Text>
              </HStack>
              <Text fontSize={"sm"} color={"gray.400"}>
                <Link href={"/professional/create"}>Criar conta</Link>
              </Text>
            </VStack>
            <Button
              alignSelf={"flex-end"}
              type="submit"
              width={"fit-content"}
              colorScheme="purple"
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </Flex>
        </Flex>
      </main>
    </>
  );
}
