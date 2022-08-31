import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  isCurrent?: boolean;
  index: number;
  onPageChange: (page: number) => void;
  prefetchPage: (page: number) => void;
}

export function PaginationItem({
  isCurrent = false,
  index,
  onPageChange,
  prefetchPage,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <>
        <Button
          size={"sm"}
          fontSize="xs"
          w={4}
          colorScheme="pink"
          disabled
          _disabled={{
            bgColor: "pink.500",
            cursor: "default",
          }}
        >
          {index}
        </Button>
      </>
    );
  }

  return (
    <>
      <Button
        size={"sm"}
        fontSize="xs"
        w={4}
        colorScheme="pink"
        bg={"gray.700"}
        _hover={{ color: "gray.500" }}
        onClick={() => onPageChange(index)}
        onMouseEnter={() => prefetchPage(index)}
      >
        {index}
      </Button>
    </>
  );
}
