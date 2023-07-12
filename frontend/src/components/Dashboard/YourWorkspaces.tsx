import { Box, Flex, Text } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext, IWorkspace } from '../../interfaces';
import FirstInitial from './WorkspaceCreation/FirstInitial';
import CreateWorkspace from './WorkspaceCreation/CreateWorkspace';
import { Client } from '../../util/client';
import BasicSpinner from '../Shared/BasicSpinner';
import Preview from './Workspaces/Preview';

const YourWorkspaces = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const shouldRun = useRef(true);

  useEffect(() => {
    if (shouldRun.current && user.id !== 0) {
      shouldRun.current = false;
      fetchYourWorkspaces(user.id);
    }
  }, [shouldRun.current, user.id]);

  const fetchYourWorkspaces = (userId: number) => {
    setIsLoading(true);
    Client.fetchYourWorkspaces(userId)
      .then((res) => {
        setWorkspaces((prevState) => [...prevState, ...res.data.workspaces]);
        if (res.data.workspaces.length === 0) {
          setMsg('You currently do not have any workspaces.');
        }
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Box maxWidth="960px" pt="10rem" ml={['1rem', '1rem', '10rem']}>
      <Flex color="light.primary" alignItems="center">
        <FirstInitial initial={user.firstName.slice(0, 1).toUpperCase()} />
        <Text fontWeight="bold">
          {user.firstName} {user.lastName}'s Workspaces
        </Text>
      </Flex>
      {msg.length > 0 && (
        <Box mt="2rem">
          <Text color="light.primary">{msg}</Text>
        </Box>
      )}

      {isLoading && (
        <Flex justifyContent="flex-start" my="2rem">
          <BasicSpinner />
        </Flex>
      )}
      <Flex flexWrap="wrap">
        {workspaces.map((workspace) => {
          return <Preview key={workspace.workspaceId} workspace={workspace} />;
        })}
      </Flex>
      <Flex my="1.5rem" justifyContent="flex-start">
        <CreateWorkspace remainingWorkspaces={10 - workspaces.length} />
      </Flex>
    </Box>
  );
};

export default YourWorkspaces;
