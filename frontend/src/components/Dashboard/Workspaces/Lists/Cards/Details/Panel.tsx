import { Box } from '@chakra-ui/react';
import { ICard } from '../../../../../../interfaces';
import Members from './Members';

interface IPanelProps {
  card: ICard;
  workspaceListId: number;
}

const Panel = ({ card, workspaceListId }: IPanelProps) => {
  return (
    <Box>
      <Members />
    </Box>
  );
};

export default Panel;
