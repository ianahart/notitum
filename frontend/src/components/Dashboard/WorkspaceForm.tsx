import {
  Input,
  FormControl,
  FormLabel,
  Text,
  Flex,
  Button,
  Select,
} from '@chakra-ui/react';
import { useState } from 'react';

interface IWorkspaceFormProps {
  handleCreateWorkspace: (title: string) => void;
}

const WorkspaceForm = ({ handleCreateWorkspace }: IWorkspaceFormProps) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const inputBorderColor = title.length > 0 ? '#068FFF' : '#ff5349';

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');
    console.log(title.trim().length);
    if (title.trim().length === 0) {
      setError('Please provide a title');
      return;
    }
    handleCreateWorkspace(title);
  };

  const formStyles = {
    width: '95%',
    margin: '0 auto',
  };

  return (
    <form onSubmit={handleOnSubmit} style={formStyles}>
      <FormControl>
        <FormLabel
          htmlFor="title"
          color="light.primary"
          fontWeight="bold"
          fontSize="0.8rem"
        >
          Workspace title*
        </FormLabel>
        <Input
          _hover={{ borderColor: inputBorderColor }}
          onFocus={() => setError('')}
          onChange={handleOnChange}
          color="light.primary"
          fontSize="0.85rem"
          value={title}
          id="title"
          name="title"
          border="1px solid"
          borderColor={inputBorderColor}
          height="30px"
        />
        {error.length > 0 ? (
          <Text fontSize="0.8rem" color="red.500" textAlign="center">
            {error}
          </Text>
        ) : (
          <Text my="0.25rem" color="#ababb2" fontSize="0.7rem">
            A workspace title is required
          </Text>
        )}
      </FormControl>

      {title.trim().length > 0 && (
        <Flex mt="2rem">
          <Button type="submit" height="25px" colorScheme="blue" width="100%">
            Create
          </Button>
        </Flex>
      )}
    </form>
  );
};

export default WorkspaceForm;
