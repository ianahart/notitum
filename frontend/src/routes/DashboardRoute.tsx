import { Box } from '@chakra-ui/react';
import { Client } from '../util/client';
import RecentlyViewed from '../components/Dashboard/RecentlyViewed';
import YourWorkspaces from '../components/Dashboard/YourWorkspaces';

const DashboardRoute = () => {
  const heartbeat = () => {
    Client.heartbeat()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
