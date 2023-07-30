import { Box, Text, Flex, Checkbox } from '@chakra-ui/react';
import { IChecklistItem, IWorkspaceContext } from '../../../../../../interfaces';
import { AiOutlineClose } from 'react-icons/ai';
import { useContext } from 'react';
import { WorkspaceContext } from '../../../../../../context/workspace';

interface IChecklistItemProps {
  checklistId: number;
  checklistItem: IChecklistItem;
  updateChecklistItem: (
    checklistItemId: number,
    isComplete: boolean,
    checklistId: number
  ) => void;
  removeChecklistItem: (checklistId: number, checklistItemId: number) => void;
}

const ChecklistItem = ({
  checklistId,
  checklistItem,
  updateChecklistItem,
  removeChecklistItem,
}: IChecklistItemProps) => {
  const { workspace } = useContext(WorkspaceContext) as IWorkspaceContext;

  const handleOnCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    cli: IChecklistItem
  ) => {
    updateChecklistItem(cli.id, e.target.checked, checklistId);
  };

  const handleRemoveChecklistItem = () => {
    removeChecklistItem(checklistId, checklistItem.id);
  };

  return (
    <Box my="0.5rem">
      <Flex alignItems="center" justify="space-between">
        <Flex alignItems="center">
          <Checkbox
            onChange={(e) => handleOnCheckboxChange(e, checklistItem)}
            mr="1rem"
            isChecked={checklistItem.isComplete}
          />
          <Text
            textDecoration={checklistItem.isComplete ? 'line-through' : 'unset'}
            fontSize="0.85rem"
            color="light.primary"
          >
            {checklistItem.title}
          </Text>
        </Flex>
        <Box>
          <Box
            onClick={handleRemoveChecklistItem}
            cursor="pointer"
            _hover={{ opacity: 0.8 }}
            color="light.primary"
          >
            <AiOutlineClose />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default ChecklistItem;
