import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';
import { AiOutlineWarning } from 'react-icons/ai';
import { Client } from '../../util/client';

const Email = () => {
  const { user, logout, tokens } = useContext(UserContext) as IUserContext;
  const [input, setInput] = useState('');

  const updateEmail = () => {
    if (input.trim().length === 0) return;
    Client.updateEmailAddress(user.id, input)
      .then((res) => {
        console.log(res);
      })
      .then(() => {
        return Client.logout(tokens.refreshToken).then(() => {
          logout();
        });
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err.response.data.message);
      });
  };

  return (
    <Box mt="5rem" minH="500px" width={['95%', '95%', '600px']} maxW="600px">
      <Heading mb="3rem" fontSize="1.3rem" color="black.primary">
        Email
      </Heading>
      <Box>
        <Text mb="0.5rem" color="black.primary" fontSize="1.1rem" fontWeight="bold">
          Current email
        </Text>
        <Text color="black.primary">
          Your current email address is{' '}
          <Box as="span" fontWeight="bold">
            {user.email}
          </Box>
        </Text>
      </Box>
      <Box my="1.5rem" bg="rgba(218, 165, 32 , 0.3)" p="0.5rem">
        <Flex alignItems="center">
          <Box m="0.5rem">
            <AiOutlineWarning color="goldenrod" fontSize="1.3rem" />
          </Box>
          <Text ml="0.5rem" fontSize="1.1rem" color="black.primary">
            Connected Account
          </Text>
        </Flex>
        <Text color="black.primary" lineHeight="1.6" fontSize="0.9rem">
          Your email address is connected to your account. If you change your email
          address you will be logged out and will have to login again.
        </Text>
      </Box>

      <Box>
        <FormControl>
          <FormLabel
            htmlFor="email"
            fontSize="0.75rem"
            fontWeight="bold"
            color="text.primary"
          >
            New email address
          </FormLabel>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            name="email"
            id="email"
            type="email"
            fontSize="0.8rem"
            autoComplete="off"
            _placeholder={{ fontSize: '0.8rem' }}
            placeholder="Enter new email address"
          />
        </FormControl>
        <Box mt="1.5rem">
          <Button onClick={updateEmail} fontSize="0.9rem" colorScheme="blue">
            Save changes
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Email;
