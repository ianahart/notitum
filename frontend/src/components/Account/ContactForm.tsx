import { Box, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';
import { Link as RouterLink } from 'react-router-dom';
import { slugify } from '../../util';

const ContactForm = () => {
  const { user, setActiveAccountLink } = useContext(UserContext) as IUserContext;
  const [infoShowing, setInfoShowing] = useState(false);
  return (
    <Box
      position="relative"
      onMouseEnter={() => setInfoShowing(true)}
      onMouseLeave={() => setInfoShowing(false)}
      cursor="not-allowed"
      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
      borderTopRadius={8}
      minH="100px"
      p="0.5rem"
    >
      <Box m="1rem">
        <Text fontSize="0.85rem" color="text.primary">
          Email address
        </Text>
        <Text mt="1.5rem" color="black.primary">
          {user.email}
        </Text>
      </Box>
      {infoShowing && (
        <Box
          width={['95%', '95%', '500px']}
          minH="100px"
          borderRadius={8}
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          bg="#fff"
          position="absolute"
          zIndex={2}
          top="-100px"
          display="flex"
          justifyContent="center"
          flexDir="column"
          alignItems="center"
          left={['15px', '20px', '50px']}
        >
          <Text color="text.primary" fontSize="0.85rem">
            Go to the email tab to manage your email address.
          </Text>
          <Box color="primary.blue" fontSize="0.9rem">
            <RouterLink
              onClick={() => setActiveAccountLink('email')}
              to={`/${slugify(user.firstName, user.lastName)}/account/email`}
            >
              Manage your email address
            </RouterLink>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ContactForm;
