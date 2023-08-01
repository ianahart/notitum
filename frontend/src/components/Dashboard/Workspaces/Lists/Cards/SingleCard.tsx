import {
  Box,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { IActiveLabel, ICard, IWorkspaceContext } from '../../../../../interfaces';
import { AiOutlineEdit } from 'react-icons/ai';
import { useContext, useEffect, useRef, useState } from 'react';
import { RiDraggable } from 'react-icons/ri';
import { DraggableProvided } from 'react-beautiful-dnd';
import CardDetails from './Details/CardDetails';
import Header from './Details/Header';
import { Client } from '../../../../../util/client';
import Workspace from '../../../../Navbar/Workspace';
import { WorkspaceContext } from '../../../../../context/workspace';

interface ICardProps {
  card: ICard;
  provided: DraggableProvided;
  workspaceListId: number;
  workspaceListTitle: string;
}

const SingleCard = ({
  card,
  provided,
  workspaceListId,
  workspaceListTitle,
}: ICardProps) => {
  const [isEditShowing, setIsEditShowing] = useState(false);
  const { lists, setLists } = useContext(WorkspaceContext) as IWorkspaceContext;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleActiveLabel = (labelId: number, checked: boolean) => {
    checked ? addActiveLabel(labelId, checked) : removeActiveLabel(labelId);
  };

  const addActiveLabel = (labelId: number, checked: boolean) => {
    Client.createActiveLabel(labelId, checked, card.id)
      .then((res) => {
        const updatedLists = [...lists];
        const workspaceListIndex = updatedLists.findIndex(
          (l) => l.id === workspaceListId
        );
        const updatedCards = updatedLists[workspaceListIndex].cards.map((c) => {
          if (c.id === card.id) {
            c.activeLabels = [...c.activeLabels, res.data.data];
          }
          return c;
        });

        updatedLists[workspaceListIndex].cards = [...updatedCards];

        setLists(updatedLists);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const removeActiveLabel = (labelId: number) => {
    const activeLabel = card.activeLabels.find(
      (activeLabel) => activeLabel.labelId === labelId
    );
    if (!activeLabel) return;
    Client.removeActiveLabel(activeLabel.id, card.id)
      .then(() => {
        const updatedLists = [...lists];
        const workspaceListIndex = updatedLists.findIndex(
          (l) => l.id === workspaceListId
        );

        const updatedCards = updatedLists[workspaceListIndex].cards.map((c) => {
          if (c.id === card.id) {
            c.activeLabels = card.activeLabels.filter((l) => {
              return l.labelId !== labelId;
            });
          }
          return c;
        });

        updatedLists[workspaceListIndex].cards = updatedCards;
        setLists(updatedLists);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const handleOnMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isEditShowing) {
      setIsEditShowing(true);
    }
  };

  const handleOnMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (isEditShowing) {
      setIsEditShowing(false);
    }
  };

  const goToCardDetails = (id: number) => {
    console.log(`Going to card details: ${id}`);
  };

  return (
    <Box
      minH="50px"
      cursor="pointer"
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onClick={onOpen}
      my="1rem"
      p="0.5rem"
      borderRadius={8}
      _hover={{ background: '#3f3f44' }}
      bg="#38383c"
    >
      <Flex justify={card.activeLabels.length > 0 ? 'space-between' : 'flex-end'}>
        {card.activeLabels.length > 0 && (
          <Box bg={card.activeLabels[0].color} p="0.25rem" borderRadius={8}>
            <Text color="light.primary" fontWeight="bold" fontSize="0.8rem">
              {card.activeLabels[0].title}
            </Text>
          </Box>
        )}
        <Box {...provided.dragHandleProps} color="light.primary" fontSize="1.2rem">
          <RiDraggable />
        </Box>
      </Flex>
      <Flex justify="space-between">
        <Text wordBreak="break-all" color="light.primary">
          {card.title}
        </Text>
        <Box
          opacity={isEditShowing ? '1' : '0'}
          onClick={() => goToCardDetails(card.id)}
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          borderRadius={8}
          height="32px"
          width="32px"
          _hover={{ background: 'rgba(188, 188, 188, 0.2)' }}
          cursor="pointer"
          color="light.primary"
        >
          <AiOutlineEdit />
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          className="card-modal-content"
          m="0 auto"
          minH="400px"
          bg="black.primary"
        >
          <ModalHeader color="light.primary">
            <Header
              workspaceListId={workspaceListId}
              card={card}
              workspaceListTitle={workspaceListTitle}
            />
          </ModalHeader>
          <ModalCloseButton color="light.primary" />
          <ModalBody>
            <CardDetails
              handleActiveLabel={handleActiveLabel}
              activeLabels={card.activeLabels}
              workspaceListId={workspaceListId}
              card={card}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SingleCard;
