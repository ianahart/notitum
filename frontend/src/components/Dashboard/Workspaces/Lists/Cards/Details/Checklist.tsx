import {
  Box,
  Text,
  Flex,
  Button,
  FormControl,
  Input,
  ButtonGroup,
} from '@chakra-ui/react';
import { IChecklist } from '../../../../../../interfaces';
import { GoChecklist } from 'react-icons/go';
import { useEffect, useRef, useState } from 'react';
import ChecklistItem from './ChecklistItem';
import ChecklistItemMembers from './ChecklistItemMembers';

interface IChecklistProps {
  handleSetChecklistItemMembers: () => void;
  checklist: IChecklist;
  removeChecklist: (id: number) => void;
  updateChecklist: (title: string, id: number) => void;
  createChecklistItem: (checklistItem: string, checklistId: number) => void;
  createChecklistItemError: string;
  handleSetCreateChecklistItemError: () => void;
  updateChecklistItem: (
    checklistItemId: number,
    isComplete: boolean,
    checklistId: number
  ) => void;
  removeChecklistItem: (checklistId: number, checklistItemId: number) => void;
  addMemberToChecklistItem: (id: number, firstName: string, lastName: string) => void;
}

const Checklist = ({
  handleSetChecklistItemMembers,
  checklist,
  removeChecklist,
  updateChecklist,
  createChecklistItem,
  createChecklistItemError,
  handleSetCreateChecklistItemError,
  updateChecklistItem,
  removeChecklistItem,
  addMemberToChecklistItem,
}: IChecklistProps) => {
  const [checklistTitleFormShowing, setChecklistTitleFormShowing] = useState(false);
  const [checklistItemFormShowing, setChecklistItemFormShowing] = useState(false);
  const [hideCheckedItems, setHideCheckedItems] = useState(false);
  const [checklistTitle, setChecklistTitle] = useState('');
  const [checklistItem, setChecklistItem] = useState('');
  const shouldRun = useRef(true);

  const completedChecklistItems = checklist.checklistItems.filter(
    (cli) => cli.isComplete
  ).length;

  const progress =
    completedChecklistItems > 0
      ? Math.floor((completedChecklistItems / checklist.checklistItems.length) * 100)
      : 0;

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      setChecklistTitle(checklist.title);
    }
  }, [shouldRun.current, checklist.title]);

  const handleOnSubmitChecklistTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checklistTitle === checklist.title || checklistTitle.trim().length === 0) return;
    updateChecklist(checklistTitle, checklist.id);
    setChecklistTitleFormShowing(false);
  };

  const handleOnSubmitChecklistItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checklistItem.trim().length === 0 || checklistItem.length > 255) return;
    createChecklistItem(checklistItem, checklist.id);
    setChecklistItem('');
    if (!createChecklistItemError.length) {
      setChecklistItemFormShowing(false);
    }
  };

  useEffect(() => {
    if (createChecklistItemError.length) {
      setChecklistItemFormShowing(true);
    }
  }, [createChecklistItemError.length]);

  const handleChecklistItemFormClose = () => {
    setChecklistItemFormShowing(false);
    handleSetChecklistItemMembers();
    handleSetCreateChecklistItemError();
  };

  return (
    <Box my="1.5rem">
      {!checklistTitleFormShowing && (
        <Flex justifyContent="space-between">
          <Flex alignItems="center">
            <Box mr="0.5rem" fontSize="1.2rem">
              <GoChecklist />
            </Box>
            <Text
              cursor="pointer"
              onClick={() => setChecklistTitleFormShowing(true)}
              fontSize="1.2rem"
            >
              {checklist.title}
            </Text>
          </Flex>
          <Box>
            <ButtonGroup>
              {completedChecklistItems >= 1 && (
                <Button
                  onClick={() => setHideCheckedItems(hideCheckedItems ? false : true)}
                  fontSize="0.85rem"
                  color="light.primary"
                  _hover={{ background: 'black.tertiary', opacity: '0.8' }}
                  bg="black.tertiary"
                >
                  {hideCheckedItems ? 'Show checked items' : 'Hide checked items'}
                </Button>
              )}
              <Button
                fontSize="0.85rem"
                onClick={() => removeChecklist(checklist.id)}
                color="light.primary"
                _hover={{ background: 'black.tertiary', opacity: '0.8' }}
                bg="black.tertiary"
              >
                Delete
              </Button>
            </ButtonGroup>
          </Box>
        </Flex>
      )}
      {checklistTitleFormShowing && (
        <form onSubmit={handleOnSubmitChecklistTitle}>
          <FormControl>
            <Input
              autoComplete="off"
              value={checklistTitle}
              onChange={(e) => setChecklistTitle(e.target.value)}
              bg="black.tertiary"
              borderColor="black.tertiary"
            />
          </FormControl>
          <ButtonGroup my="1rem">
            <Button colorScheme="blue" type="submit">
              Update
            </Button>
            <Button onClick={() => setChecklistTitleFormShowing(false)}>Cancel</Button>
          </ButtonGroup>
        </form>
      )}
      <Flex my="0.5rem" alignItems="center">
        <Text mr="0.5rem">{progress}%</Text>
        <Box height="10px" borderRadius="20px" width="100%" bg="black.tertiary">
          <Box
            height="10px"
            bg="green.500"
            borderRadius="20px"
            width={`${progress}%`}
          ></Box>
        </Box>
      </Flex>
      <Box my="1rem">
        {checklist.checklistItems.map((cli) => {
          return (
            <Box key={cli.id}>
              {hideCheckedItems && cli.isComplete ? (
                <></>
              ) : (
                <ChecklistItem
                  checklistId={checklist.id}
                  checklistItem={cli}
                  updateChecklistItem={updateChecklistItem}
                  removeChecklistItem={removeChecklistItem}
                />
              )}
            </Box>
          );
        })}
      </Box>
      {!checklistItemFormShowing && (
        <Flex>
          <Button
            onClick={() => setChecklistItemFormShowing(true)}
            color="light.primary"
            _hover={{ background: 'black.tertiary', opacity: '0.8' }}
            fontSize="0.85rem"
            bg="black.tertiary"
          >
            Add item
          </Button>
        </Flex>
      )}
      {checklistItemFormShowing && (
        <form onSubmit={handleOnSubmitChecklistItem}>
          {createChecklistItemError.length > 0 && (
            <Text my="0.25rem" textAlign="center" fontSize="0.8rem" color="red.500">
              {createChecklistItemError}
            </Text>
          )}
          <FormControl>
            <Input
              autoComplete="off"
              value={checklistItem}
              onChange={(e) => setChecklistItem(e.target.value)}
              bg="black.tertiary"
              borderColor="black.tertiary"
            />
          </FormControl>
          <Flex alignItems="center" justify="space-between">
            <ButtonGroup my="1rem">
              <Button fontSize="0.85rem" colorScheme="blue" type="submit">
                Create
              </Button>
              <Button
                fontSize="0.85rem"
                color="light.primary"
                _hover={{ background: 'transparent' }}
                bg="transparent"
                onClick={handleChecklistItemFormClose}
              >
                Cancel
              </Button>
            </ButtonGroup>
            <ChecklistItemMembers addMemberToChecklistItem={addMemberToChecklistItem} />
          </Flex>
        </form>
      )}
    </Box>
  );
};

export default Checklist;
