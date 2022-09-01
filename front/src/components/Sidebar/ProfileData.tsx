import { Box, HStack, Icon, IconButton, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { RiLogoutBoxRLine } from "react-icons/ri";

type PropsType = {
  name: string;
};

function ProfileData({ name }: PropsType) {
  const router = useRouter();

  function handleLogout() {
    destroyCookie(undefined, "mente_sa.token");
    destroyCookie(undefined, "mente_sa.refreshToken");

    router.push({ pathname: "/" });
  }

  return (
    <>
      <Box pl={"0.5rem"}>
        <Text fontSize={"sm"} color={"gray.50"}>
          Bem vindo(a),
        </Text>
        <HStack spacing={"1rem"}>
          <Text fontSize={"md"} fontWeight={"bold"} color={"gray.50"}>
            {name}
          </Text>
          <IconButton
            h={"2.5rem"}
            w={"2.5rem"}
            aria-label="botão sair"
            color={"red.400"}
            icon={<Icon as={RiLogoutBoxRLine} w={4} h={4} />}
            onClick={handleLogout}
          />
        </HStack>
      </Box>
    </>
  );
}

export { ProfileData };
