import { Box, Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import { UserContext } from '../context/user';
import { IUserContext } from '../interfaces';
const AccountRoute = () => {
  const { activeAccountLink, setActiveAccountLink } = useContext(
    UserContext
  ) as IUserContext;

  return (
    <Box minH="100vh">
      <Box minH="40px" borderBottom="1px solid" borderColor="light.primary">
        <Flex p="1rem">
          <Box mx="0.5rem" color="text.primary">
            <RouterLink onClick={() => setActiveAccountLink('profile')} to="profile">
              Password and visibility
            </RouterLink>
            {activeAccountLink === 'profile' && <Box minH="3px" bg="primary.blue"></Box>}
          </Box>
          <Box mx="0.5rem" color="text.primary">
            <RouterLink onClick={() => setActiveAccountLink('email')} to="email">
              Email
            </RouterLink>
            {activeAccountLink === 'email' && <Box minH="3px" bg="primary.blue"></Box>}
          </Box>
        </Flex>
      </Box>
      <Box
        p="0.25rem"
        mx="auto"
        minH="100vh"
        maxW="600px"
        width={['95%', '95%', '600px']}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AccountRoute;
