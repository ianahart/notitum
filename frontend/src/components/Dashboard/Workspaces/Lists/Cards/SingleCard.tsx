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
import { ICard } from '../../../../../interfaces';
import { AiOutlineEdit } from 'react-icons/ai';
import { useState } from 'react';
import { RiDraggable } from 'react-icons/ri';
import { DraggableProvided } from 'react-beautiful-dnd';
import CardDetails from './Details/CardDetails';
import Header from './Details/Header';

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
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  //  const showCardDetails = () => {
  //    console.log('please go to the movioes');
  //  };
  //
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
      <Flex justify="flex-end">
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
            <Header cardTitle={card.title} workspaceListTitle={workspaceListTitle} />
          </ModalHeader>
          <ModalCloseButton color="light.primary" />
          <ModalBody>
            <CardDetails workspaceListId={workspaceListId} card={card} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SingleCard;
