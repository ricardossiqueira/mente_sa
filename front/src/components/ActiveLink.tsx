import { Box, Flex } from "@chakra-ui/react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();

  let isActive = false;

  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as))
    isActive = true;

  if (
    !shouldMatchExactHref &&
    (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))
  )
    isActive = true;

  return (
    <>
      <Flex
        backgroundColor={isActive ? "gray.50" : "purple.600"}
        p={"0.5rem"}
        borderRadius={"0 1rem 1rem  0"}
      >
        <Link {...rest}>
          {cloneElement(children, {
            color: isActive ? "purple.600" : "gray.50",
            fontWeight: isActive ? "bold" : "normal",
          })}
        </Link>
      </Flex>
    </>
  );
}
