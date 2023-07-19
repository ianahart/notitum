import { Box, Flex, Text } from '@chakra-ui/react';
import { ICard } from '../../../../../interfaces';
import { AiOutlineEdit } from 'react-icons/ai';
import { useState } from 'react';
import { RiDraggable } from 'react-icons/ri';
import { DraggableProvided } from 'react-beautiful-dnd';

interface ICardProps {
  card: ICard;
  provided: DraggableProvided;
}

const SingleCard = ({ card, provided }: ICardProps) => {
  const [isEditShowing, setIsEditShowing] = useState(false);

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
    </Box>
  );
};

export default SingleCard;
