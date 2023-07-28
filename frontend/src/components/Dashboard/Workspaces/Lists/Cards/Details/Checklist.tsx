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

interface IChecklistProps {
  checklist: IChecklist;
  removeChecklist: (id: number) => void;
  updateChecklist: (title: string, id: number) => void;
}

const Checklist = ({ checklist, removeChecklist, updateChecklist }: IChecklistProps) => {
  const [isFormShowing, setIsFormShowing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const shouldRun = useRef(true);

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      setInputValue(checklist.title);
    }
  }, [shouldRun.current, checklist.title]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue === checklist.title || inputValue.trim().length === 0) return;
    updateChecklist(inputValue, checklist.id);
    setIsFormShowing(false);
  };

  return (
    <Box my="1.5rem">
      {!isFormShowing && (
        <Flex justifyContent="space-between">
          <Flex alignItems="center">
            <Box mr="0.5rem" fontSize="1.2rem">
              <GoChecklist />
            </Box>
            <Text
              cursor="pointer"
              onClick={() => setIsFormShowing(true)}
              fontSize="1.2rem"
            >
              {checklist.title}
            </Text>
          </Flex>
          <Box>
            <Button
              onClick={() => removeChecklist(checklist.id)}
              color="light.primary"
              _hover={{ background: 'black.tertiary', opacity: '0.8' }}
              bg="black.tertiary"
            >
              Delete
            </Button>
          </Box>
        </Flex>
      )}
      {isFormShowing && (
        <form onSubmit={handleOnSubmit}>
          <FormControl>
            <Input
              autoComplete="off"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              bg="black.tertiary"
              borderColor="black.tertiary"
            />
          </FormControl>
          <ButtonGroup my="1rem">
            <Button colorScheme="blue" type="submit">
              Update
            </Button>
            <Button onClick={() => setIsFormShowing(false)}>Cancel</Button>
          </ButtonGroup>
        </form>
      )}
      <Flex my="0.5rem" alignItems="center">
        <Text mr="0.5rem">0%</Text>
        <Box height="10px" borderRadius="20px" width="100%" bg="black.tertiary">
          <Box height="10px" bg="green.500" borderRadius="20px" width="50%"></Box>
        </Box>
      </Flex>
      {/*LIST ITEMS HERE*/}
      <Flex>
        <Button
          color="light.primary"
          _hover={{ background: 'black.tertiary', opacity: '0.8' }}
          bg="black.tertiary"
        >
          Add item
        </Button>
      </Flex>
    </Box>
  );
};

export default Checklist;
