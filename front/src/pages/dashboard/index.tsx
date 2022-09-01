import { Box, Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Sidebar } from "../../components/Sidebar";
import { useRouter } from "next/router";
import Head from "next/head";

type CreateUserFormSchema = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const yupCreateUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("Email obrigatório").email("Email inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "Mínimo de 6 caracteres"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas devem ser iguais"),
});

export default function CreateUser() {
  const router = useRouter();

  //   const createUser = useMutation(
  //     async (user: CreateUserFormSchema) => {
  //       const response = await api.post("users", {
  //         user: {
  //           ...user,
  //           created_at: new Date(),
  //         },
  //       });

  //       return response.data.user;
  //     },
  //     {
  //       onSuccess: () => {
  //         queryClient.invalidateQueries("users");
  //       },
  //     }
  //   );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(yupCreateUserFormSchema) });

  // const handleCreateUser: SubmitHandler<CreateUserFormSchema> = async (
  //   values
  // ) => {
  //   await createUser.mutateAsync(values);
  //   router.push("/users");
  // };

  return (
    <>
      <Head>
        <title>Dashboard | Mente Sã</title>
      </Head>
      <main>
        <Box>
          {/* <Header /> */}
          <Sidebar />
          <Flex w="100%" my={6} maxW={1480} mx="auto" px={[6, 8]}></Flex>
        </Box>
      </main>
    </>
  );
}
