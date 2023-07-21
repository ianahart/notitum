import { Box, Text, Flex } from '@chakra-ui/react';
import { ICard } from '../../../../../../interfaces';
import Header from './Header';
import Description from './Description';

interface ICardDetailsProps {
  workspaceListId: number;
  workspaceListTitle: string;
  card: ICard;
}

const CardDetails = ({
  workspaceListId,
  workspaceListTitle,
  card,
}: ICardDetailsProps) => {
  return (
    <Box color="light.primary">
      <Flex flexDir={['column', 'column', 'row']}>
        <Box minH="700px" flexGrow="2">
          <Description card={card} workspaceListId={workspaceListId} />
        </Box>
        <Box minH="700px" minW="200px" flexGrow="1" border="1px solid green"></Box>
      </Flex>
    </Box>
  );
};

export default CardDetails;
