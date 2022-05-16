import {
  Badge,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { memo, useContext } from "react";
import { ListContext } from "../../App";
import { ListContextProps, PokemonProps } from "../../types";

const PokeDetail = ({ open }: { open: boolean }) => {
  const { isOpen } = useDisclosure({ isOpen: open });
  const context = useContext<ListContextProps | null>(ListContext);

  const handleClose = () => context?.setSelectedPokemon(null);

  const { name, sprites, abilities, stats } =
    context?.selectedPokemon as PokemonProps;
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{name.toLocaleUpperCase()}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack display="flex" flexFlow="column" alignItems="center">
            <Image src={sprites.front_default} alt={name} h={200} width={200} />
            <Flex>
              {abilities.map((entry, i) => (
                <Badge key={i}>{entry.ability.name}</Badge>
              ))}
            </Flex>
            <Flex>
              {stats.map((entry, i) => (
                <Flex
                  key={i}
                  display="flex"
                  flexFlow="column"
                  alignItems="center"
                >
                  <Badge>{entry.stat.name}</Badge>
                  <Badge>{entry.base_stat}</Badge>
                </Flex>
              ))}
            </Flex>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(PokeDetail);
