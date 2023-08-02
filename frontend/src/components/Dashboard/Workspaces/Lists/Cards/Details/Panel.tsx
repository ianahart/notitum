import { Box } from '@chakra-ui/react';
import { IActiveLabel, ICard, IWorkspaceContext } from '../../../../../../interfaces';
import Members from './Members';
import Labels from './Labels';
import CardButton from './CardButton';
import { AiOutlineClose } from 'react-icons/ai';
import { Client } from '../../../../../../util/client';
import { useContext } from 'react';
import { WorkspaceContext } from '../../../../../../context/workspace';
import AddCheckList from './AddCheckList';
import Dates from './Dates';

type ValuePiece = Date | null;
type DateValue = ValuePiece | [ValuePiece, ValuePiece];

interface IPanelProps {
  createChecklistError: string;
  card: ICard;
  workspaceListId: number;
  handleActiveLabel: (labelId: number, checked: boolean) => void;
  activeLabels: IActiveLabel[];
  updateDates: (action: string, values: DateValue) => void;
  createChecklist: (title: string) => void;
}

const Panel = ({
  createChecklistError,
  card,
  workspaceListId,
  handleActiveLabel,
  activeLabels,
  createChecklist,
  updateDates,
}: IPanelProps) => {
  const { lists, setLists } = useContext(WorkspaceContext) as IWorkspaceContext;
  const { workspace } = useContext(WorkspaceContext) as IWorkspaceContext;

  const removeLocalCard = () => {
    const newLists = [...lists];
    const workspaceListIndex = lists.findIndex((list) => list.id === workspaceListId);

    newLists[workspaceListIndex].cards = newLists[workspaceListIndex].cards.filter(
      (c) => c.id !== card.id
    );
    setLists(newLists);
  };

  const removeCard = () => {
    Client.removeCard(card.id, workspace.userId)
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
      <AddCheckList
        createChecklistError={createChecklistError}
        createChecklist={createChecklist}
      />
      <Dates
        startDate={card.startDate}
        endDate={card.endDate}
        updateDates={updateDates}
      />
      <Box onClick={removeCard}>
        <CardButton title="Remove card" icon={<AiOutlineClose />} />
      </Box>
    </Box>
  );
};

export default Panel;
