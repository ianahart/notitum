import { Box, Text, Flex } from '@chakra-ui/react';
import { IActiveLabel, ICard } from '../../../../../../interfaces';
import Header from './Header';
import Description from './Description';
import Panel from './Panel';
import { Client } from '../../../../../../util/client';
import { useEffect, useRef, useState } from 'react';

interface ICardDetailsProps {
  workspaceListId: number;
  workspaceListTitle: string;
  card: ICard;
}

const CardDetails = ({ workspaceListId, card }: ICardDetailsProps) => {
  const shouldRun = useRef(true);
  const [activeLabels, setActiveLabels] = useState<IActiveLabel[]>([]);

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getActiveLabels();
    }
  }, [shouldRun.current]);

  const getActiveLabels = () => {
    Client.getActiveLabels(card.id)
      .then((res) => {
        setActiveLabels(res.data.data);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const handleActiveLabel = (labelId: number, checked: boolean) => {
    checked ? addActiveLabel(labelId, checked) : removeActiveLabel(labelId);
  };

  const addActiveLabel = (labelId: number, checked: boolean) => {
    Client.createActiveLabel(labelId, checked, card.id)
      .then((res) => {
        setActiveLabels((prevState) => [...prevState, res.data.data]);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const removeActiveLabel = (labelId: number) => {
    const activeLabel = activeLabels.find(
      (activeLabel) => activeLabel.labelId === labelId
    );
    if (!activeLabel) return;
    Client.removeActiveLabel(activeLabel.id)
      .then(() => {
        const filteredActiveLabels = activeLabels.filter(
          (activeLabel) => activeLabel.labelId !== labelId
        );
        setActiveLabels(filteredActiveLabels);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

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
