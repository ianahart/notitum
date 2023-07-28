import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  ButtonGroup,
  Button,
  Text,
} from '@chakra-ui/react';

import { Box } from '@chakra-ui/react';
import CardButton from './CardButton';
import { AiOutlineCheckSquare } from 'react-icons/ai';
import { useState } from 'react';

interface IAddCheckListProps {
  createChecklistError: string;
  createChecklist: (title: string) => void;
}

const AddCheckList = ({ createChecklistError, createChecklist }: IAddCheckListProps) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleOnBlur = () => {
    if (title.trim().length === 0) {
      setError('Please provide a title');
    }
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error.length || title.trim().length === 0) {
      return;
    }
    createChecklist(title);
    setTitle('');
  };

  return (
    <Box>
      <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <PopoverTrigger>
          <Box>
            <CardButton title="Add checklist" icon={<AiOutlineCheckSquare />} />
          </Box>
        </PopoverTrigger>
        <PopoverContent borderColor="black.tertiary" bg="black.tertiary">
          <PopoverCloseButton />
          <PopoverHeader borderColor="black.tertiary" textAlign="center">
            Add Checklist
          </PopoverHeader>
          <PopoverBody>
            <form onSubmit={handleOnSubmit}>
              <FormControl>
                <FormLabel fontSize="0.85rem" fontWeight="bold">
                  Title
                </FormLabel>
                <Input
                  autoComplete="off"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={handleOnBlur}
                  onFocus={() => setError('')}
                  _hover={{ borderColor: 'black.primary' }}
                  borderColor="black.primary"
                  placeholder="Enter title..."
                  _placeholder={{ color: 'light.primary', fontSize: '0.8rem' }}
                />
              </FormControl>
              {createChecklistError.length > 0 && (
                <Text color="red.500" fontSize="0.8rem">
                  {createChecklistError}
                </Text>
              )}
              {error.length > 0 && (
                <Text color="red.500" fontSize="0.8rem">
                  {error}
                </Text>
              )}
              <ButtonGroup my="1rem">
                <Button type="submit" colorScheme="blue">
                  Create
                </Button>
                <Button onClick={() => onClose()}>Cancel</Button>
              </ButtonGroup>
            </form>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default AddCheckList;
