import { Box, Flex, VStack, Text, Center } from "@chakra-ui/react";

type GridItemProps = {
  title: string;
  value: number;
};

export function GridItem({ title, value }: GridItemProps) {
  return (
    <>
      <Box
        bg="whiteAlpha.900"
        h={"12rem"}
        w={"15rem"}
        boxShadow={"md"}
        borderRadius={8}
      >
        <Flex
          flex={0}
          w={"100%"}
          h={"100%"}
          p={"1rem"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <VStack textAlign={"center"}>
            <Text fontWeight={"bold"} color={"blackAlpha.700"} fontSize={"xl"}>
              {title}
            </Text>
            <Text fontWeight={"bold"} color={"blackAlpha.700"} fontSize={"6xl"}>
              {value}
            </Text>
          </VStack>
        </Flex>
      </Box>
    </>
  );
}
