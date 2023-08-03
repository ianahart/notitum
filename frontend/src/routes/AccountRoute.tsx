import { Box } from '@chakra-ui/react';
import ManageAccountHeader from '../components/Account/ManageAccountHeader';
import Banner from '../components/Account/Banner';
import { useContext } from 'react';
import { UserContext } from '../context/user';
import { IUserContext } from '../interfaces';
import AboutForm from '../components/Account/AboutForm';
const AccountRoute = () => {
  const { user } = useContext(UserContext) as IUserContext;
  return (
    <Box minH="100vh">
      <Box
        p="0.25rem"
        mx="auto"
        minH="100vh"
        maxW="600px"
        width={['95%', '95%', '600px']}
      >
        <Box mt="4rem">
          <ManageAccountHeader />
        </Box>
        <Box my="2rem">
          <Banner userInitials={user.abbreviation} />
        </Box>
        <Box my="2rem">
          <AboutForm />
        </Box>
      </Box>
    </Box>
  );
};

export default AccountRoute;
