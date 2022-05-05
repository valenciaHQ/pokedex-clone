import { createContext, useState } from "react";

import Pokelist from "./components/Pokelist";
import PokeDetail from "./components/PokeDetail";
import { ListContextProps, NewContextProps, PokemonProps } from "./types";
import AddPokemon from "./components/AddPokemon";

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
        <Pokelist />
        {detailOpen && <PokeDetail open />}
        {addNewPokemonModal && <AddPokemon open />}
      </AddPokemonContext.Provider>
    </ListContext.Provider>
  );
}

export default App;
