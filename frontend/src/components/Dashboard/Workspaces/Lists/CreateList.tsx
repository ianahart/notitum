import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { UserContext } from '../../../../context/user';
import { IUserContext, IWorkspaceContext } from '../../../../interfaces';
import { WorkspaceContext } from '../../../../context/workspace';
import { Client } from '../../../../util/client';

const CreateList = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const { workspace, lists, setLists } = useContext(
    WorkspaceContext
  ) as IWorkspaceContext;
  const [isOpen, setIsOpen] = useState(false);
  const [listTitle, setListTitle] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => {
    setIsOpen(false);
  };

  const addToList = () => {
    setError('');
    if (listTitle.trim().length === 0) return;
    const index = lists.length - 1 === -1 ? 0 : lists.length;
    Client.createList(user.id, workspace.workspaceId, listTitle, index)
      .then((res) => {
        const { data } = res.data;
        setLists([...lists, data]);
        setListTitle('');
        handleClose();
      })
      .catch((err) => {
        setError(err.response.data.message);
        throw new Error(err.response.data.message);
      });
  };

  return (
    <Box position="relative">
      <Flex
        onClick={() => setIsOpen(true)}
        minWidth="250px"
        maxW="250px"
        p="0.5rem"
        align="center"
        cursor="pointer"
        borderRadius={8}
        bg="transparent.primary"
        _hover={{ background: 'rgba(188, 188, 188, 0.7)' }}
      >
        <Box color="light.primary" fontSize="1.1rem" mr="1rem">
          <AiOutlinePlus />
        </Box>
        <Text color="light.primary">Add a list</Text>
      </Flex>
      {isOpen && (
        <Box
          position="absolute"
          top="0"
          left="0"
          width="250px"
          borderRadius={8}
          p="0.5rem"
          bg="black.primary"
        >
          {error.length > 0 && (
            <Text p="0.25rem" color="red.500" fontSize="0.8rem">
              {error}
            </Text>
          )}
          <Input
            onChange={(e) => setListTitle(e.target.value)}
            value={listTitle}
            color="light.primary"
            _placeholder={{ color: 'light.primary' }}
            placeholder="Enter a list title..."
          />
          <Flex mt="2rem" align="center" justifyContent="space-between">
            <Button onClick={addToList} colorScheme="blue">
              Add list
            </Button>
            <Box
              onClick={handleClose}
              role="button"
              color="light.primary"
              ml="0.5rem"
              fontSize="1.3rem"
              cursor="pointer"
            >
              <AiOutlineClose />
            </Box>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default CreateList;
