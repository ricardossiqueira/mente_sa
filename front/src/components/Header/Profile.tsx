import { Avatar, Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const isWideView = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <>
      <Flex align="center">
        {showProfileData && (
          <Box mr="4" textAlign="right">
            <Text>Ricardo Siqueira</Text>
            <Text color="gray.300" fontSize="sm">
              ricardosantossiqueira@poli.ufrj.br
            </Text>
          </Box>
        )}
        <Avatar
          size={isWideView ? "md" : "sm"}
          name="Ricardo Siqueira"
          src="https://github.com/ricardossiqueira.png"
        />
      </Flex>
    </>
  );
}
