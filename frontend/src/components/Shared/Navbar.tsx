import { Box, Flex, Image } from '@chakra-ui/react';
import logo from '../../assets/logo.png';
import AccountMenu from '../Navbar/AccountMenu';

const Navbar = () => {
  return (
    <Box minH="50px" bg="cover.primary">
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Image width="120px" height="50px" src={logo} alt="notitum logo" />
        </Box>
        <AccountMenu />
      </Flex>
    </Box>
  );
};

export default Navbar;
