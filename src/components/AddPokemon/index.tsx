import { useState } from "react";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { PokemonToAdd } from "../../types";

const AddPokemon = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { isOpen } = useDisclosure({ isOpen: open });
  const [pokemon, setPokemon] = useState<PokemonToAdd>({
    name: "New pokemon! ",
    weight: 1,
  });
  const toast = useToast();
  const handeAddPokemon = () => {
    toast({
      title: "Pokemon has been created.",
      description: `${pokemon.name}has been created in your account for you.`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Pokemon</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack display="flex" flexFlow="column" alignItems="center">
            <Input
              placeholder="Give me a name"
              type="text"
              onChange={(e) =>
                setPokemon((prevState: PokemonToAdd) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
              value={pokemon.name}
            />
            <Input
              placeholder="Give me a weight"
              type="number"
              onChange={(e) =>
                setPokemon((prevState: PokemonToAdd) => ({
                  ...prevState,
                  weight: Number(e.target.value),
                }))
              }
              value={pokemon.weight}
            />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handeAddPokemon}>
            Add Pokemon
          </Button>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPokemon;
