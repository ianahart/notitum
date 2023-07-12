import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Client } from '../util/client';

const WorkspaceRoute = () => {
  const location = useLocation();
  const { workspaceId, userId } = location.state;
  const shouldRun = useRef(true);

  const getWorkspace = (workspaceId: number, userId: number) => {
    Client.getWorkspace(workspaceId, userId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getWorkspace(workspaceId, userId);
    }
  }, [workspaceId, userId]);

  return (
    <Box bg="bg.primary" minH="100vh">
      {' '}
      Work space route
    </Box>
  );
};

export default WorkspaceRoute;
