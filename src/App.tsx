import { createContext, useState } from "react";

import Pokelist from "./components/Pokelist";
import PokeDetail from "./components/PokeDetail";
import { ListContextProps, PokemonProps } from "./types";
import AddPokemon from "./components/AddPokemon";
import { Button, Container, Flex, Heading } from "@chakra-ui/react";

export const ListContext = createContext<ListContextProps | null>(null);

function App() {
  const [selected, setSelected] = useState<PokemonProps | null>(null);
  const [addNewPokemonModal, setAddNewPokemon] = useState(false);
  const detailOpen = Boolean(selected);

  const handleOpenAddModal = () => setAddNewPokemon(true);
  const handleCloseAddModal = () => setAddNewPokemon(false);

  return (
    <ListContext.Provider
      value={{ selectedPokemon: selected, setSelectedPokemon: setSelected }}
    >
      <Container maxW="container.xl">
        <Flex justifyContent="space-around" alignItems="center">
          <Heading as="h1" textAlign="center" paddingBottom={5} paddingTop={5}>
            Welcome to Pokedex
          </Heading>
          <Button colorScheme="blue" mr={3} onClick={handleOpenAddModal}>
            Add Pokemon
          </Button>
        </Flex>

        <Pokelist />
        {detailOpen && <PokeDetail open />}
        {addNewPokemonModal && (
          <AddPokemon open onClose={handleCloseAddModal} />
        )}
      </Container>
    </ListContext.Provider>
  );
}

export default App;
