import { Box, Text, Flex } from '@chakra-ui/react';
import { IActiveLabel, ICard } from '../../../../../../interfaces';
import Description from './Description';
import Panel from './Panel';

interface ICardDetailsProps {
  workspaceListId: number;
  card: ICard;
  handleActiveLabel: (labelId: number, checked: boolean) => void;
  activeLabels: IActiveLabel[];
}

const CardDetails = ({
  card,
  workspaceListId,
  activeLabels,
  handleActiveLabel,
}: ICardDetailsProps) => {
  return (
    <Box color="light.primary">
      <Flex flexDir={['column', 'column', 'row']}>
        <Box minH="700px" flexGrow="2">
          <Flex my="0.5rem" flexWrap="wrap">
            {activeLabels.map((activeLabel) => {
              return (
                <Box
                  p="0.5rem"
                  borderRadius={4}
                  mx="0.5rem"
                  bg={activeLabel.color}
                  key={activeLabel.id}
                >
                  <Text fontSize="0.85rem">{activeLabel.title}</Text>
                </Box>
              );
            })}
          </Flex>
          <Description card={card} workspaceListId={workspaceListId} />
        </Box>
        <Box minH="700px" minW="200px" flexGrow="1">
          <Box>
            <Text fontSize="0.8rem" fontWeight="bold">
              Add to card
            </Text>
            <Panel
              handleActiveLabel={handleActiveLabel}
              activeLabels={activeLabels}
              workspaceListId={workspaceListId}
              card={card}
            />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default CardDetails;
