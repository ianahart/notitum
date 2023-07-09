import { Box, Flex, Image } from '@chakra-ui/react';
import logo from '../../assets/logo.png';
import AccountMenu from '../Navbar/AccountMenu';
import NavMenus from '../Navbar/NavMenus';

const Navbar = () => {
  return (
    <Box minH="50px" bg="cover.primary">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
          <Image width="120px" height="50px" src={logo} alt="notitum logo" />
          <NavMenus />
        </Flex>
        <AccountMenu />
      </Flex>
    </Box>
  );
};

export default Navbar;
