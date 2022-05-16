import { FC, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";

import PokeCard from "../PokeCard";
import { PokecardProps } from "../../types";
import CenteredWrapper from "../CenteredWrapper";
import useFetchPokemons from "../../hooks/useFetchPokemons";

const DEFAULT_OFFSET = 20;
const Pokelist: FC = () => {
  const [offset, setOffset] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { isLoading, error, data, isFetching, isPreviousData } =
    useFetchPokemons(offset);

  const handlePreviousPage = () => {
    setCurrentPage((old) => old - 1);
    setOffset((old) => old - DEFAULT_OFFSET);
  };

  const handleNextpage = () => {
    setCurrentPage((old) => old + 1);
    setOffset((old) => old + DEFAULT_OFFSET);
  };

  if (isLoading || isFetching)
    return (
      <CenteredWrapper>
        <Spinner data-testid="loading-spinner" />
      </CenteredWrapper>
    );

  if (error)
    return (
      <CenteredWrapper>
        <Box>Ups! Something bad ocurred, please try again later...</Box>
        <Button
          variant="solid"
          marginTop={5}
          backgroundColor="red.200"
          borderRadius="md"
          border={"1px"}
          onClick={() => window.location.reload()}
        >
          Refresh
        </Button>
      </CenteredWrapper>
    );

  return (
    <Container maxW="container.xl">
      <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing={10}>
        {data?.results.map(({ name, url }: PokecardProps) => (
          <PokeCard key={url} name={name} url={url} />
        ))}
      </SimpleGrid>
      <Flex
        flex={1}
        justifyContent="center"
        alignItems="center"
        marginTop={5}
        marginBottom={5}
      >
        <Text>Current Page: {currentPage}</Text>
        <Button
          marginLeft={10}
          marginRight={10}
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
        >
          Previous Page
        </Button>
        <Button
          onClick={handleNextpage}
          disabled={isFetching || isPreviousData}
        >
          Next Page
        </Button>
      </Flex>
    </Container>
  );
};

export default Pokelist;
