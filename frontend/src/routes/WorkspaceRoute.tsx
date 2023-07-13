import { Box, Flex } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Client } from '../util/client';
import { workspaceState } from '../state/initialState';
import BasicSpinner from '../components/Shared/BasicSpinner';
import Navbar from '../components/Dashboard/Workspaces/Nav/Navbar';
import { IWorkspace, IWorkspaceContext } from '../interfaces';
import { WorkspaceContext } from '../context/workspace';

const WorkspaceRoute = () => {
  const location = useLocation();
  const { workspaceId, userId } = location.state;
  const { workspace, setWorkspace } = useContext(WorkspaceContext) as IWorkspaceContext;
  const [isLoading, setIsLoading] = useState(false);
  const shouldRun = useRef(true);

  const backgroundImage = !workspace.background.startsWith('#')
    ? workspace.background
    : 'unset';

  const getWorkspace = (workspaceId: number, userId: number) => {
    setIsLoading(true);
    Client.getWorkspace(workspaceId, userId)
      .then((res) => {
        setWorkspace(res.data.workspace);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getWorkspace(workspaceId, userId);
    }
  }, [workspaceId, userId]);

  return (
    <>
      {isLoading && (
        <Flex flexDir="column" minH="100vh" justify="center" alignItems="center">
          <BasicSpinner />
        </Flex>
      )}
      <Box
        bg={workspace.background.startsWith('#') ? workspace.background : 'unset'}
        minH="100vh"
        backgroundImage={backgroundImage}
        backgroundPosition="center"
        backgroundSize="cover"
      >
        <Navbar />
      </Box>
    </>
  );
};

export default WorkspaceRoute;
