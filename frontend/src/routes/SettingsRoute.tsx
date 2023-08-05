import { Box } from '@chakra-ui/react';
import Header from '../components/Settings/Header';
import { Outlet } from 'react-router-dom';
import SettingsLinks from '../components/Settings/SettingsLinks';

const SettingsRoute = () => {
  return (
    <Box p="1.5rem" minH="100vh">
      <Box my="1.5rem">
        <Header />
      </Box>
      <SettingsLinks />
      <Box p="1rem" minH="400px" m="5rem auto 2rem auto">
        <Outlet />
      </Box>
    </Box>
  );
};

export default SettingsRoute;
