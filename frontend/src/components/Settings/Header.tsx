import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';
import { Box, Flex, Text } from '@chakra-ui/react';

const Header = () => {
  const { user } = useContext(UserContext) as IUserContext;

  return (
    <Flex>
      <Flex
        borderRadius="50%"
        width="50px"
        height="50px"
        flexDir="column"
        align="center"
        color="#fff"
        bg="primary.blue"
        justify="center"
      >
        {user.abbreviation}
      </Flex>
      <Box ml="1rem">
        <Text fontWeight="bold" color="black.primary">
          {user.firstName} {user.lastName}
        </Text>
        <Text fontSize="0.85rem" color="text.primary">
          {user.email}
        </Text>
      </Box>
    </Flex>
  );
};

export default Header;
