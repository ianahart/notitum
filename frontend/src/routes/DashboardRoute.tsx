import { Box } from '@chakra-ui/react';
import RecentlyViewed from '../components/Dashboard/RecentlyViewed';
import YourWorkspaces from '../components/Dashboard/YourWorkspaces';
import MemberWorkspaces from '../components/Dashboard/MemberWorkspaces';

const DashboardRoute = () => {
  return (
    <Box minH="100vh" bg="bg.primary">
      <Box>
        <RecentlyViewed />
        <YourWorkspaces />
        <MemberWorkspaces />
      </Box>
    </Box>
  );
};

export default DashboardRoute;
