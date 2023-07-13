import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Client } from '../util/client';
import { workspaceState } from '../state/initialState';
import BasicSpinner from '../components/Shared/BasicSpinner';
import Navbar from '../components/Dashboard/Workspaces/Navbar';
import { IWorkspace } from '../interfaces';

const WorkspaceRoute = () => {
  const location = useLocation();
  const { workspaceId, userId } = location.state;
  const [workspace, setWorkspace] = useState(workspaceState);
  const [isLoading, setIsLoading] = useState(false);
  const shouldRun = useRef(true);

  const handleUpdateStarred = () => {
    const isStarred = workspace.isStarred ? !workspace.isStarred : true;
    const updatedWorkspace = { ...workspace, isStarred };
    setWorkspace(updatedWorkspace);
    updateWorkspace(updatedWorkspace);
  };

  const updateWorkspace = (updatedWorkspace: IWorkspace) => {
    Client.updateWorkspace(updatedWorkspace)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err.response.data.message);
      });
  };

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
        <Navbar workspace={workspace} handleUpdateStarred={handleUpdateStarred} />
      </Box>
    </>
  );
};

export default WorkspaceRoute;
