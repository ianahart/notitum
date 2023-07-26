import { Box } from '@chakra-ui/react';
import { IActiveLabel, ICard, IWorkspaceContext } from '../../../../../../interfaces';
import Members from './Members';
import Labels from './Labels';
import CardButton from './CardButton';
import { AiOutlineClose } from 'react-icons/ai';
import { Client } from '../../../../../../util/client';
import { useContext } from 'react';
import { WorkspaceContext } from '../../../../../../context/workspace';

interface IPanelProps {
  card: ICard;
  workspaceListId: number;
  handleActiveLabel: (labelId: number, checked: boolean) => void;
  activeLabels: IActiveLabel[];
}

const Panel = ({
  card,
  workspaceListId,
  handleActiveLabel,
  activeLabels,
}: IPanelProps) => {
  const { lists, setLists } = useContext(WorkspaceContext) as IWorkspaceContext;

  const removeLocalCard = () => {
    const newLists = [...lists];
    const workspaceListIndex = lists.findIndex((list) => list.id === workspaceListId);

    newLists[workspaceListIndex].cards = newLists[workspaceListIndex].cards.filter(
      (c) => c.id !== card.id
    );
    setLists(newLists);
  };

  const removeCard = () => {
    Client.removeCard(card.id)
      .then(() => {
        removeLocalCard();
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  return (
    <Box>
      <Members />
      <Labels
        activeLabels={activeLabels}
        card={card}
        handleActiveLabel={handleActiveLabel}
      />
      <Box onClick={removeCard}>
        <CardButton title="Remove card" icon={<AiOutlineClose />} />
      </Box>
    </Box>
  );
};

export default Panel;
