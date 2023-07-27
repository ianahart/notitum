import { Box, Flex } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Client } from '../util/client';
import BasicSpinner from '../components/Shared/BasicSpinner';
import Navbar from '../components/Dashboard/Workspaces/Nav/Navbar';
import { IWorkspaceContext } from '../interfaces';
import { WorkspaceContext } from '../context/workspace';
import CreateList from '../components/Dashboard/Workspaces/Lists/CreateList';
import Lists from '../components/Dashboard/Workspaces/Lists/Lists';

const WorkspaceRoute = () => {
  const location = useLocation();
  const { title } = useParams();
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
    getWorkspace(workspaceId, userId);
  }, [workspaceId, userId, title]);

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
        <Box>
          <Navbar />
        </Box>
        <Box minH="100vh" overflowX="auto" className="overflow-scroll">
          <Flex my="4rem" mx="1rem">
            <Box>
              <Lists />
            </Box>
            <CreateList />
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default WorkspaceRoute;
