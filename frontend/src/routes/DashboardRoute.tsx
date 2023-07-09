import { Box } from '@chakra-ui/react';
import { Client } from '../util/client';

const DashboardRoute = () => {
  const heartbeat = () => {
    Client.heartbeat().then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <Box>
      Dashboard Route
      <button onClick={heartbeat}>Heartbeat</button>
    </Box>
  );
};

export default DashboardRoute;
