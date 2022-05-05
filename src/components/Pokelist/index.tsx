import { FC, useState } from "react";
import { useQuery } from "react-query";
import {
  Button,
  Container,
  Divider,
  Flex,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";

import PokeCard from "../PokeCard";
import { AllPokemonsResponse, PokecardProps } from "../../types";

const DEFAULT_OFFSET = 20;
const Pokelist: FC = () => {
  const [offset, setOffset] = useState<number>(0);
  const fetchProjects = (offset = 0) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`).then(
      (res) => res.json()
    );
  const { isLoading, error, data, isFetching } = useQuery<
    AllPokemonsResponse,
    Error
  >(["allPokemons", offset], () => fetchProjects(offset), {
    keepPreviousData: true,
  });

  if (isLoading || isFetching) return <Spinner />;

  if (error) return <p>"An error has occurred: " + error.message</p>;

  return (
    <Container maxW="container.xl">
      <Divider></Divider>
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
        <Text>Current Page: {Math.floor(offset / 20)}</Text>
        <Button
          marginLeft={10}
          marginRight={10}
          onClick={() => setOffset((old) => Math.max(old - 1, 0))}
          disabled={Math.floor(offset / 20) === 0}
        >
          Previous Page
        </Button>
        <Button
          onClick={() => {
            setOffset((old) => old + DEFAULT_OFFSET);
          }}
        >
          Next Page
        </Button>
      </Flex>
    </Container>
  );
};

export default Pokelist;
