import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine } from "react-icons/ri";

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <>
      <Stack spacing="12" align="flex-start" backgroundColor={"purple"}>
        <NavSection title="">
          <NavLink icon={RiDashboardLine} href="/dashboard">
            Dashboard
          </NavLink>
          <NavLink icon={RiContactsLine} href="/users">
            Pacientes
          </NavLink>
          <NavLink icon={RiContactsLine} href="/users">
            Sessões
          </NavLink>
        </NavSection>
      </Stack>
    </>
  );
}
