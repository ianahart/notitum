import { Box, Flex, FormLabel, Checkbox, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Client } from '../../../../../../util/client';
import { IActiveLabel, ILabel } from '../../../../../../interfaces';

interface IListLabelsProps {
  cardId: number;
  workspaceId: number;
  handleActiveLabel: (labelId: number, checked: boolean) => void;
  activeLabels: IActiveLabel[];
}

const ListLabels = ({
  cardId,
  workspaceId,
  handleActiveLabel,
  activeLabels,
}: IListLabelsProps) => {
  const shouldRun = useRef(true);
  const [labels, setLabels] = useState<ILabel[]>([]);

  useEffect(() => {
    if (activeLabels.length) {
      activeLabels.forEach((activeLabel) => {
        const updatedLabels = labels.map((label) => {
          if (activeLabel.labelId === label.id) {
            label.isChecked = true;
          }
          return label;
        });
        setLabels(updatedLabels);
      });
    }
  }, [labels.length, activeLabels.length]);

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getLabels();
    }
  }, [shouldRun.current]);

  const getLabels = () => {
    Client.getLabels(workspaceId, cardId)
      .then((res) => {
        setLabels(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err.response.data.message);
      });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, labelId: number) => {
    setLabels(
      labels.map((label) => {
        if (label.id === labelId) {
          label.isChecked = e.target.checked;
        }
        return label;
      })
    );
    handleActiveLabel(labelId, e.target.checked);
  };

  return (
    <Box>
      <FormLabel my="1rem" fontSize="0.8rem" fontWeight="bold" color="light.primary">
        {' '}
        Labels
      </FormLabel>

      <Box className="overflow-scroll" height="250px" overflowY="auto">
        {labels.map((label) => {
          return (
            <Flex my="0.5rem" alignItems="center" key={label.id}>
              <Checkbox
                onChange={(e) => handleOnChange(e, label.id)}
                mr="0.5rem"
                isChecked={label.isChecked}
              />
              <Box borderRadius={4} width="100%" bg={label.color}>
                <Text fontSize="0.9rem" fontWeight="bold" p="0.5rem" textAlign="center">
                  {label.title}
                </Text>
              </Box>
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
};

export default ListLabels;
