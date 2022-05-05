export type ListContextProps = {
  selectedPokemon: PokemonProps | null;
  setSelectedPokemon: (pokemon: PokemonProps | null) => void;
};

export type NewContextProps = {
  addNewModal: boolean;
  setAddNew: (value: boolean) => void;
};

export interface PokecardProps {
  name: string;
  url: string;
}

export interface AllPokemonsResponse {
  count: number;
  next: null;
  previous: string;
  results: { name: string; url: string }[];
  hasMore: boolean;
}

export interface PokemonProps {
  name: string;
  height: number;
  order: number;
  weight: number;
  types: {
    type: { name: PokemonTypes };
  }[];
  abilities: {
    ability: { name: string };
  }[];
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

export enum PokemonTypes {
  GRASS = "grass",
  BUG = "bug",
  WATER = "water",
  NORMAL = "normal",
}

export type PokemonToAdd = Pick<PokemonProps, "name" | "weight">;
