import { Box } from '@chakra-ui/react';
import { IActiveLabel, ICard } from '../../../../../../interfaces';
import Members from './Members';
import Labels from './Labels';

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
  return (
    <Box>
      <Members />
      <Labels
        activeLabels={activeLabels}
        card={card}
        handleActiveLabel={handleActiveLabel}
      />
    </Box>
  );
};

export default Panel;
