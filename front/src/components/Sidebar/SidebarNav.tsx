import { Stack } from "@chakra-ui/react";
import { RiCalendarEventFill } from "react-icons/ri";
import { TiHome } from "react-icons/ti";
import { FaUser } from "react-icons/fa";

import { Logo } from "./Logo";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";
import { ProfileData } from "./ProfileData";

export function SidebarNav() {
  return (
    <>
      <Stack
        spacing="12"
        backgroundColor={"purple.600"}
        h={"100vh"}
        pt={"0.5rem"}
      >
        <Logo />
        <ProfileData name={"Dr. Estranho"} />
        <NavSection title="">
          <NavLink icon={TiHome} href="/dashboard">
            Dashboard
          </NavLink>
          <NavLink icon={FaUser} href="/pacients">
            Pacientes
          </NavLink>
          <NavLink icon={RiCalendarEventFill} href="/sessions">
            Sessões
          </NavLink>
        </NavSection>
      </Stack>
    </>
  );
}
