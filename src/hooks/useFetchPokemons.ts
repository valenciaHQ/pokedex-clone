import { useQuery } from "react-query";
import { AllPokemonsResponse } from "../types";

const fetchData = (offset: number) =>
  fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`).then(
    (res) => res.json()
  );
const useFetchPokemons = (offset: number) => {
  const { isLoading, error, data, isFetching, isPreviousData } = useQuery<
    AllPokemonsResponse,
    Error
  >(["allPokemons", offset], () => fetchData(offset), {
    keepPreviousData: true,
  });

  return { isLoading, error, data, isFetching, isPreviousData };
};

export default useFetchPokemons;
