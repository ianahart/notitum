import {
  Box,
  Text,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  Select,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import CardButton from './CardButton';
import { useContext, useEffect, useRef, useState } from 'react';
import { WorkspaceContext } from '../../../../../../context/workspace';
import { ICard, IList, IWorkspaceContext } from '../../../../../../interfaces';
import { cardState, listState } from '../../../../../../state/initialState';
import { Client } from '../../../../../../util/client';

interface IMoveCardProps {
  workspaceListId: number;
  cardId: number;
}

const MoveCard = ({ workspaceListId, cardId }: IMoveCardProps) => {
  const { lists, workspace, setLists } = useContext(
    WorkspaceContext
  ) as IWorkspaceContext;
  const [list, setList] = useState<IList>(listState);
  const [card, setCard] = useState<ICard>(cardState);
  const shouldRun = useRef(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getList = (value: string) => {
    return lists.find((list) => list.id === parseInt(value));
  };

  const getCard = (list: IList, cardId: string) => {
    return list.cards.find((card) => card.id === parseInt(cardId));
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      const list = getList(workspaceListId.toString());
      if (list) {
        setList(list);
        const c = getCard(list, cardId.toString());
        if (c) {
          setCard(c);
        }
      }
    }
  }, [shouldRun.current, getList, getCard]);

  const handleOnListChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const foundList = getList(value);
    if (foundList !== undefined) {
      setList(foundList);
    }
  };

  const handleOnCardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const foundCard = getCard(list, value);
    if (foundCard !== undefined) {
      setCard(foundCard);
    }
  };

  const reorderCards = () => {
    const reorderLists = [...lists];
    const workspaceListSourceIndex = lists.findIndex((l) => l.id === workspaceListId);
    const workspaceListDestinationIndex = lists.findIndex((l) => l.id === list.id);

    const newSourceCards = reorderLists[workspaceListSourceIndex].cards;
    const newDestinationCards = reorderLists[workspaceListDestinationIndex].cards;

    const cardDestinationIndex = newDestinationCards.findIndex(
      (_, index) => index === card.index
    );
    const newSourceCardIndex = newSourceCards.findIndex((card) => card.id === cardId);

    const [deletedCard] = newSourceCards.splice(newSourceCardIndex, 1);
    newDestinationCards.splice(cardDestinationIndex, 0, deletedCard);

    reorderLists[workspaceListDestinationIndex].cards = [
      ...newDestinationCards.map((card, index) => {
        card.index = index;
        return card;
      }),
    ];

    const updatedLists = reorderLists.map((list) => {
      return list.cards.map(({ id, index }) => {
        return { workspaceListId: list.id, id, index };
      });
    });

    setLists(reorderLists);

    Client.reorderCards(updatedLists.flat(1), workspace.userId).then(() => {
      onClose();
    });
  };

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <Box>
          <CardButton title="Move" icon={<AiOutlineArrowRight />} />
        </Box>
      </PopoverTrigger>
      <PopoverContent borderColor="black.tertiary" bg="black.tertiary">
        <PopoverCloseButton />
        <PopoverHeader borderColor="black.tertiary" textAlign="center">
          Move Card
        </PopoverHeader>
        <PopoverBody>
          <Text mb="0.25rem" fontWeight="bold" fontSize="0.75rem">
            Select a destination
          </Text>
          <Box p="0.25rem" borderRadius={4} bg="black.primary">
            <Text>{workspace.title}</Text>
          </Box>
          <Flex justify="space-between">
            <Flex flexDir="column">
              <Text my="0.25rem" fontSize="0.75rem">
                Move To
              </Text>
              <Select
                value={list.id}
                mx="0.1rem"
                my="0.5rem"
                onChange={handleOnListChange}
                borderColor="black.primary"
              >
                {lists.map((l) => {
                  return (
                    <option key={l.id} value={l.id}>
                      {l.title}
                    </option>
                  );
                })}
              </Select>
            </Flex>
            <Flex flexDir="column">
              <Text my="0.25rem" fontSize="0.75rem">
                Position
              </Text>

              <Select
                mx="0.1rem"
                borderColor="black.primary"
                value={card.id}
                onChange={handleOnCardChange}
                my="0.5rem"
              >
                {list.cards.map((card, index) => {
                  return (
                    <option key={card.id} value={card.id}>
                      {index}
                    </option>
                  );
                })}
              </Select>
            </Flex>
          </Flex>
          <Flex>
            <Button
              onClick={reorderCards}
              fontSize="0.8rem"
              colorScheme="blue"
              width="100%"
            >
              Save
            </Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default MoveCard;
