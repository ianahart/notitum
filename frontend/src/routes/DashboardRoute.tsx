import { Box } from '@chakra-ui/react';
import RecentlyViewed from '../components/Dashboard/RecentlyViewed';
import YourWorkspaces from '../components/Dashboard/YourWorkspaces';

const DashboardRoute = () => {
  return (
    <Box minH="100vh" bg="bg.primary">
      <Box>
        <RecentlyViewed />
        <YourWorkspaces />
      </Box>
    </Box>
  );
};

export default DashboardRoute;
