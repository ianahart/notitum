import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  Input,
  Text,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { WorkspaceContext } from '../../../../../../context/workspace';
import { IMember, IWorkspaceContext } from '../../../../../../interfaces';
import { Client } from '../../../../../../util/client';

interface IAddMemberProps {
  addMember: (member: IMember) => void;
}

const AddMember = ({ addMember }: IAddMemberProps) => {
  const { workspace } = useContext(WorkspaceContext) as IWorkspaceContext;
  const [isFormShowing, setIsFormShowing] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const createMember = () => {
    setError('');
    Client.createMember(email, workspace.workspaceId)
      .then((res) => {
        setEmail('');
        addMember(res.data.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
        throw new Error(err.response.data.message);
      });
  };

  const cancelCreateMember = () => {
    setIsFormShowing(false);
    setEmail('');
  };

  return (
    <Box mt="2rem">
      {!isFormShowing && (
        <Flex
          onClick={() => setIsFormShowing(true)}
          cursor="pointer"
          _hover={{ opacity: '0.8' }}
          width="50%"
          alignItems="center"
          bg="black.primary"
          borderRadius={4}
          p="0.5rem"
        >
          <Box mr="0.25rem">
            <AiOutlinePlus />
          </Box>
          <Text fontSize="0.85rem">Add Member</Text>
        </Flex>
      )}
      {isFormShowing && (
        <Box>
          <FormControl>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter email..."
              fontSize="0.85rem"
              _placeholder={{ color: 'light.primary', fontSize: '0.85rem' }}
              color="light.primary"
              borderColor="black.primary"
            />
          </FormControl>
          {error.length > 0 && (
            <Box>
              <Text textAlign="center" fontSize="0.8rem" color="red.500" my="0.25rem">
                {error}
              </Text>
            </Box>
          )}
          <ButtonGroup my="0.5rem">
            <Button onClick={createMember} colorScheme="blue">
              Add
            </Button>
            <Button onClick={cancelCreateMember}>Cancel</Button>
          </ButtonGroup>
        </Box>
      )}
    </Box>
  );
};

export default AddMember;
