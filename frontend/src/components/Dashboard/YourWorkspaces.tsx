import { Box, Flex, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';
import FirstInitial from './FirstInitial';
import CreateWorkspace from './CreateWorkspace';

const YourWorkspaces = () => {
  const { user } = useContext(UserContext) as IUserContext;

  return (
    <Box maxWidth="960px" pt="10rem" ml={['1rem', '1rem', '10rem']}>
      <Flex color="light.primary" alignItems="center">
        <FirstInitial initial={user.firstName.slice(0, 1).toUpperCase()} />
        <Text fontWeight="bold">
          {user.firstName} {user.lastName}'s Workspaces
        </Text>
      </Flex>
      <Flex my="1.5rem" justifyContent="flex-start">
        <CreateWorkspace />
      </Flex>
    </Box>
  );
};

export default YourWorkspaces;
