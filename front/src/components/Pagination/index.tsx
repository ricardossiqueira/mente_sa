import { HStack, Box, Stack, Text } from "@chakra-ui/react";

import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
  onMouseOver: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
  onMouseOver,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  return (
    <>
      <Stack
        direction={["column", "row"]}
        mt={8}
        spacing={6}
        justifyContent="space-between"
        align="center"
      >
        <Box>
          <strong>{(currentPage - 1) * registersPerPage}</strong> -{" "}
          <strong> {currentPage * registersPerPage} </strong> de{" "}
          {totalCountOfRegisters}
        </Box>
        <HStack spacing={2}>
          {currentPage > 1 + siblingsCount && (
            <>
              <PaginationItem
                prefetchPage={onMouseOver}
                onPageChange={onPageChange}
                index={1}
              />
              {1 + siblingsCount + 1 !== currentPage && (
                <Text
                  color={"gray.300"}
                  w={8}
                  textAlign={"center"}
                  letterSpacing={"widest"}
                >
                  ...
                </Text>
              )}
            </>
          )}

          {previousPages.length > 0 &&
            previousPages.map((page) => {
              return (
                <PaginationItem
                  prefetchPage={onMouseOver}
                  onPageChange={onPageChange}
                  key={page}
                  index={page}
                />
              );
            })}

          <PaginationItem
            prefetchPage={onMouseOver}
            onPageChange={onPageChange}
            isCurrent
            index={currentPage}
          />

          {nextPages.length > 0 &&
            nextPages.map((page) => {
              return (
                <PaginationItem
                  prefetchPage={onMouseOver}
                  onPageChange={onPageChange}
                  key={page}
                  index={page}
                />
              );
            })}

          {currentPage + siblingsCount < lastPage && (
            <>
              {lastPage - siblingsCount !== currentPage && (
                <Text
                  color={"gray.300"}
                  w={8}
                  textAlign={"center"}
                  letterSpacing={"widest"}
                >
                  ...
                </Text>
              )}
              <PaginationItem
                prefetchPage={onMouseOver}
                onPageChange={onPageChange}
                index={lastPage}
              />
            </>
          )}
        </HStack>
      </Stack>
    </>
  );
}
