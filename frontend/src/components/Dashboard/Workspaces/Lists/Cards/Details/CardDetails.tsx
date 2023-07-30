import { Box, Text, Flex } from '@chakra-ui/react';
import {
  IActiveLabel,
  ICard,
  IChecklist,
  IChecklistItem,
  IWorkspaceContext,
} from '../../../../../../interfaces';
import Description from './Description';
import Panel from './Panel';
import { Client } from '../../../../../../util/client';
import { useContext, useEffect, useRef, useState } from 'react';
import Checklist from './Checklist';
import { WorkspaceContext } from '../../../../../../context/workspace';
import BasicSpinner from '../../../../../Shared/BasicSpinner';

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
  const { workspace } = useContext(WorkspaceContext) as IWorkspaceContext;
  const [createChecklistError, setCreateChecklistError] = useState('');
  const [createChecklistItemError, setCreateChecklistItemError] = useState('');
  const [checklists, setChecklists] = useState<IChecklist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const shouldRun = useRef(true);

  useEffect(() => {
    if (shouldRun.current && card.id !== 0) {
      shouldRun.current = false;
      getChecklists(card.id);
    }
  }, [shouldRun.current, card.id]);

  const getChecklists = (cardId: number) => {
    setIsLoading(true);
    Client.getChecklists(cardId)
      .then((res) => {
        setChecklists((prevState) => [...prevState, ...res.data.data]);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        throw new Error(err.response.data.message);
      });
  };

  const createChecklist = (title: string) => {
    setCreateChecklistError('');
    Client.createChecklist(title, card.id)
      .then((res) => {
        setChecklists((prevState) => [...prevState, res.data.data]);
      })
      .catch((err) => {
        setCreateChecklistError(err.response.data.message);
        throw new Error(err.response.data.message);
      });
  };

  const filterOutChecklist = (id: number) => {
    setChecklists(checklists.filter((cl) => cl.id !== id));
  };

  const removeChecklist = (id: number) => {
    Client.removeChecklist(id, workspace.workspaceId)
      .then(() => {
        filterOutChecklist(id);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const updateChecklist = (title: string, id: number) => {
    Client.updateChecklist(title, id, workspace.workspaceId)
      .then(() => {
        changeTitle(title, id);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const changeTitle = (title: string, id: number) => {
    setChecklists(
      checklists.map((cl) => {
        if (cl.id === id) {
          cl.title = title;
        }
        return cl;
      })
    );
  };

  const addChecklistItem = (checklistId: number, checklistItem: IChecklistItem) => {
    const newChecklists = [...checklists];
    const checklistIndex = newChecklists.findIndex((cl) => cl.id === checklistId);
    newChecklists[checklistIndex].checklistItems = [
      ...newChecklists[checklistIndex].checklistItems,
      checklistItem,
    ];
    setChecklists(newChecklists);
  };

  const createChecklistItem = (checklistItem: string, checklistId: number) => {
    setCreateChecklistItemError('');
    Client.createChecklistItem(checklistItem, checklistId, workspace.userId)
      .then((res) => {
        addChecklistItem(checklistId, res.data.data);
      })
      .catch((err) => {
        setCreateChecklistItemError(err.response.data.message);
        throw new Error(err.response.data.message);
      });
  };

  const handleSetCreateChecklistItemError = () => {
    setCreateChecklistItemError('');
  };

  const updateChecklistItem = (
    checklistItemId: number,
    isComplete: boolean,
    checklistId: number
  ) => {
    Client.updateChecklistItem(checklistItemId, isComplete, workspace.userId)
      .then(() => {
        toggleCheckListItemComplete(checklistItemId, isComplete, checklistId);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const toggleCheckListItemComplete = (
    checklistItemId: number,
    isComplete: boolean,
    checklistId: number
  ) => {
    const newChecklists = [...checklists];
    const checklistIndex = newChecklists.findIndex((cl) => cl.id === checklistId);
    const checklistItems = newChecklists[checklistIndex].checklistItems.map((cli) => {
      if (cli.id === checklistItemId) {
        cli.isComplete = isComplete;
      }
      return cli;
    });
    newChecklists[checklistIndex].checklistItems = [...checklistItems];

    setChecklists(newChecklists);
  };

  const removeChecklistItem = (checklistId: number, checklistItemId: number) => {
    Client.removeChecklistItem(checklistItemId, workspace.userId)
      .then(() => {
        const newChecklists = [...checklists];
        const checklistIndex = newChecklists.findIndex((cl) => cl.id === checklistId);
        const checklistItems = newChecklists[checklistIndex].checklistItems.filter(
          (cli) => cli.id !== checklistItemId
        );
        newChecklists[checklistIndex].checklistItems = [...checklistItems];

        setChecklists(newChecklists);
      })
      .catch((err) => {
        console.log(err);
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
          {isLoading && <BasicSpinner />}
          <Box className="checklists">
            {checklists.map((checklist) => {
              return (
                <Checklist
                  removeChecklistItem={removeChecklistItem}
                  updateChecklistItem={updateChecklistItem}
                  handleSetCreateChecklistItemError={handleSetCreateChecklistItemError}
                  createChecklistItemError={createChecklistItemError}
                  updateChecklist={updateChecklist}
                  removeChecklist={removeChecklist}
                  createChecklistItem={createChecklistItem}
                  checklist={checklist}
                  key={checklist.id}
                />
              );
            })}
          </Box>
        </Box>
        <Box minH="700px" minW="200px" flexGrow="1">
          <Box>
            <Text fontSize="0.8rem" fontWeight="bold">
              Add to card
            </Text>
            <Panel
              createChecklistError={createChecklistError}
              createChecklist={createChecklist}
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
