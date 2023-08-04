import { Box, Heading } from '@chakra-ui/react';
import ManageAccountHeader from './ManageAccountHeader';
import Banner from './Banner';
import AboutForm from './AboutForm';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';
import ContactForm from './ContactForm';

const Profile = () => {
  const { user } = useContext(UserContext) as IUserContext;
  return (
    <>
      <Box mt="4rem">
        <ManageAccountHeader />
      </Box>
      <Box my="2rem">
        <Banner showInfo={true} userInitials={user.abbreviation} />
      </Box>
      <Box my="2rem">
        <AboutForm />
      </Box>
      <Box>
        <Heading my="0.25rem" color="black.primary" fontSize="1.3rem">
          Contact
        </Heading>
        <ContactForm />
      </Box>
    </>
  );
};

export default Profile;
