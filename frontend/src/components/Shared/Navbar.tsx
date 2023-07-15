import { Box, Flex, Image } from '@chakra-ui/react';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import AccountMenu from '../Navbar/AccountMenu';
import NavMenus from '../Navbar/NavMenus';
import MobileNavMenus from '../Navbar/MobileNavMenus';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';
import { slugify } from '../../util';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext) as IUserContext;
  const navMenuStyles = {
    justifyContent: 'space-evenly',
  };

  const mobileNavMenuStyles = {
    flexDirection: 'column',
    alignItems: 'flex-end',
    display: 'flex',
  };

  const handleGoHome = () => {
    if (user.loggedIn) {
      navigate(`/${slugify(user.firstName, user.lastName)}/dashboard`, {
        state: { userId: user.id },
      });
    } else {
      navigate('/');
    }
  };

  return (
    <Box minH="50px" bg="cover.primary">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
          <Image
            cursor="pointer"
            onClick={handleGoHome}
            width="120px"
            height="50px"
            src={logo}
            alt="notitum logo"
          />
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
