import { Box, Text, Flex, Checkbox, Tooltip } from '@chakra-ui/react';
import { IChecklistItem, IChecklistItemMember } from '../../../../../../interfaces';
import { AiOutlineClose } from 'react-icons/ai';
import Avatar from '../../../../../Shared/Avatar';
import { abbreviate } from '../../../../../../util';

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
  const handleOnCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    cli: IChecklistItem
  ) => {
    updateChecklistItem(cli.id, e.target.checked, checklistId);
  };
  const members = JSON.parse(checklistItem.assignees) as IChecklistItemMember[];

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
        <Flex alignItems="center">
          {members.map((member) => {
            return (
              <Tooltip label={`${member.firstName} ${member.lastName}`} key={member.id}>
                <span>
                  <Avatar abbreviation={abbreviate(member.firstName, member.lastName)} />
                </span>
              </Tooltip>
            );
          })}
          <Box
            onClick={handleRemoveChecklistItem}
            cursor="pointer"
            _hover={{ opacity: 0.8 }}
            color="light.primary"
          >
            <AiOutlineClose />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ChecklistItem;
