import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";

import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { Logo } from "./Logo";
import { NotificationsNav } from "./NotificationsNav";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

export function Header() {
  const { onOpen } = useSidebarDrawer();

  const isWideView = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      w="100%"
      as="header"
      maxW={1480}
      h="20"
      mx="auto"
      mt="6"
      px="6"
      align="center"
    >
      {!isWideView && (
        <IconButton
          icon={<Icon as={RiMenuLine} />}
          aria-label={"Open navigation"}
          fontSize="xl"
          variant={"unstyled"}
          onClick={onOpen}
          mr="2"
        />
      )}

      <Logo />

      {isWideView && <SearchBox />}
      <Flex align="center" ml="auto">
        <NotificationsNav />
        <Profile showProfileData={isWideView} />
      </Flex>
    </Flex>
  );
}
