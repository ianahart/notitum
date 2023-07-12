import { Box } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

const WorkspaceRoute = () => {
  const location = useLocation();

  console.log(location.state);
  return (
    <Box bg="bg.primary" minH="100vh">
      {' '}
      Work space route
    </Box>
  );
};

export default WorkspaceRoute;
