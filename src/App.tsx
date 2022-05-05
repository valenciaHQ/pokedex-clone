import { createContext, useState } from "react";

import Pokelist from "./components/Pokelist";
import PokeDetail from "./components/PokeDetail";
import { ListContextProps, NewContextProps, PokemonProps } from "./types";
import AddPokemon from "./components/AddPokemon";
import { Container, Heading } from "@chakra-ui/react";

export const ListContext = createContext<ListContextProps | null>(null);
export const AddPokemonContext = createContext<NewContextProps | null>(null);

function App() {
  const [selected, setSelected] = useState<PokemonProps | null>(null);
  const [addNewPokemonModal, setAddNewPokemon] = useState(false);
  const detailOpen = Boolean(selected);
  return (
    <ListContext.Provider
      value={{ selectedPokemon: selected, setSelectedPokemon: setSelected }}
    >
      <AddPokemonContext.Provider
        value={{ addNewModal: addNewPokemonModal, setAddNew: setAddNewPokemon }}
      >
        <Container maxW="container.xl">
          <Heading as="h1" textAlign="center" paddingBottom={5} paddingTop={5}>
            Welcome to Pokedex
          </Heading>
          <Pokelist />
          {detailOpen && <PokeDetail open />}
          {addNewPokemonModal && <AddPokemon open />}
        </Container>
      </AddPokemonContext.Provider>
    </ListContext.Provider>
  );
}

export default App;
