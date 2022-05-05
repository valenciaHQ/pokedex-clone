import {
  Image,
  Flex,
  GridItem,
  Heading,
  Button,
  Stack,
  SkeletonCircle,
  SkeletonText,
  Box,
} from "@chakra-ui/react";
import { FC, memo, useContext } from "react";
import { useQuery } from "react-query";
import { ListContext } from "../../App";
import {
  ListContextProps,
  PokecardProps,
  PokemonProps,
  PokemonTypes,
} from "../../types";

const getBackgroundColor = (type: PokemonTypes) => {
  switch (type) {
    case PokemonTypes.BUG:
      return "orange.200";
    case PokemonTypes.GRASS:
      return "green.400";
    case PokemonTypes.WATER:
      return "teal.100";
    case PokemonTypes.NORMAL:
      return "pink.50";
    default:
      return "pink.50";
  }
};

const capitalizeWord = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

const Pokecard: FC<PokecardProps> = ({ name, url }): JSX.Element => {
  const { isLoading, error, data } = useQuery(`${name}`, () =>
    fetch(url).then((res) => res.json())
  );
  const context = useContext<ListContextProps | null>(ListContext);

  if (isLoading)
    return (
      <GridItem height="150px" width="150px">
        <Stack>
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Stack>
      </GridItem>
    );

  if (error)
    return (
      <GridItem
        height="150px"
        width="150px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundColor="red.100"
        border={"1px"}
      >
        <Box
          textAlign={"center"}
        >{`Ups! an error ocurred fetching ${name} data :(`}</Box>
      </GridItem>
    );

  const pokemon = data as PokemonProps;

  return (
    <Box
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      padding="3"
      backgroundColor={getBackgroundColor(pokemon.types[0].type.name)}
    >
      <Flex flex="1" flexFlow="row" justifyContent="space-around">
        <Flex flexFlow="column" alignItems="center">
          <Image src={pokemon.sprites.front_default} alt={pokemon.name} />
          <Heading as="h2" size="l">
            {capitalizeWord(pokemon.name)}
          </Heading>
          {pokemon.types.map((entry, i) => (
            <p key={i}>{capitalizeWord(entry.type.name)}</p>
          ))}
        </Flex>
        <Flex flexFlow="column" alignItems="center">
          <Heading as="h2" size="l">
            Abilities
          </Heading>
          {pokemon.abilities.map((entry, i) => (
            <p key={i}>{capitalizeWord(entry.ability.name)}</p>
          ))}
          <Button
            variant="solid"
            marginTop="auto"
            onClick={() => context?.setSelectedPokemon(pokemon)}
          >
            Details
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default memo(Pokecard);
