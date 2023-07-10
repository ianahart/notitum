import { Box, Flex, Image } from '@chakra-ui/react';
import logo from '../../assets/logo.png';
import AccountMenu from '../Navbar/AccountMenu';
import NavMenus from '../Navbar/NavMenus';
import MobileNavMenus from '../Navbar/MobileNavMenus';

const Navbar = () => {
  const navMenuStyles = {
    justifyContent: 'space-evenly',
  };

  const mobileNavMenuStyles = {
    flexDirection: 'column',
    alignItems: 'flex-end',
        display: 'flex'
  };

  return (
    <Box minH="50px" bg="cover.primary">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
          <Image width="120px" height="50px" src={logo} alt="notitum logo" />
          <Box display={['none', 'none', 'block']}>
            <NavMenus styles={navMenuStyles} />
          </Box>
          <Box display={['block', 'block', 'none']}>
            <MobileNavMenus styles={mobileNavMenuStyles} />
          </Box>
        </Flex>
        <AccountMenu />
      </Flex>
    </Box>
  );
};

export default Navbar;
