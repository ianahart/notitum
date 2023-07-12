import { Box } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

const WorkspaceRoute = () => {
  const location = useLocation();

  // Fetch a list of all workspaces by location.state.userId
  // Check on server if location.state.userId === securityContextHolder userId

  console.log(location.state);
  return (
    <Box bg="bg.primary" minH="100vh">
      {' '}
      Work space route
    </Box>
  );
};

export default WorkspaceRoute;
