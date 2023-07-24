import { Box, Text, Flex } from '@chakra-ui/react';
import { ICard } from '../../../../../../interfaces';
import Header from './Header';
import Description from './Description';
import Panel from './Panel';

interface ICardDetailsProps {
  workspaceListId: number;
  workspaceListTitle: string;
  card: ICard;
}

const CardDetails = ({ workspaceListId, card }: ICardDetailsProps) => {
  return (
    <Box color="light.primary">
      <Flex flexDir={['column', 'column', 'row']}>
        <Box minH="700px" flexGrow="2">
          <Description card={card} workspaceListId={workspaceListId} />
        </Box>
        <Box minH="700px" minW="200px" flexGrow="1">
          <Box>
            <Text fontSize="0.8rem" fontWeight="bold">
              Add to card
            </Text>
            <Panel workspaceListId={workspaceListId} card={card} />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default CardDetails;
