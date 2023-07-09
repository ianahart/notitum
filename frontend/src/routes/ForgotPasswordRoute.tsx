import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import BasicSpinner from '../components/Shared/BasicSpinner';
import forgotPasswordBG from '../assets/forgot-password.jpg';
import { useState } from 'react';
import { forgotPasswordState } from '../state/initialState';
import { IForgotPassword } from '../interfaces';
import FormInput from '../components/Shared/FormInput';
import { Client } from '../util/client';

const ForgotPasswordRoute = () => {
  const [form, setForm] = useState(forgotPasswordState);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');

  const updateField = (name: string, value: string, attribute: string) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name as keyof IForgotPassword], [attribute]: value },
    }));
  };

  const formStyles = {
    margin: '0 auto',
    width: '95%',
    padding: '0.5rem',
  };

  const checkForErrors = () => {
    if (form.email.value.trim().length === 0) {
      setError('Please provide a valid email address');
    }
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMsg('');
    updateField('email', '', 'error');
    checkForErrors();
    if (form.email.error.length) {
      return;
    }

    sendForgotPasswordEmail();
  };

  const sendForgotPasswordEmail = () => {
    setIsLoading(true);
    Client.sendForgotPasswordEmail(form.email.value)
      .then(() => {
        setSuccessMsg('Please check your inbox or spam folder four your reset link');
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Box
      minH="100vh"
      backgroundImage={`url(${forgotPasswordBG})`}
      backgroundPosition="center"
      backgroundSize="cover"
      display="flex"
      alignItems="center"
      flexDir="column"
      justifyContent="center"
    >
      <Box
        borderRadius={8}
        boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px;"
        mx="auto"
        minH="400px"
        bg="#fff"
        width={['100%', '100%', '500px']}
      >
        {isLoading && (
          <Flex mt="10rem" flexDir="column" alignItems="center" justifyContent="center">
            <BasicSpinner />
          </Flex>
        )}
        {!isLoading && (
          <form style={formStyles} onSubmit={handleOnSubmit}>
            <Heading mt="1rem" textAlign="center" color="black.primary">
              Forgot Password
            </Heading>
            <Text color="text.primary" my="1.5rem" fontSize="0.85rem" textAlign="center">
              Enter the email address associated with your account and we'll send you a
              link to reset your password.
            </Text>
            {error.length > 0 && (
              <Text fontSize="0.85rem" color="red.500" textAlign="center">
                {error}
              </Text>
            )}
            {successMsg.length > 0 && (
              <Text color="text.primary" fontSize="0.85rem" textAlign="center">
                {successMsg}
              </Text>
            )}
            <Box my="2rem">
              <FormInput
                updateField={updateField}
                value={form.email.value}
                error={form.email.error}
                name={form.email.name}
                type={form.email.type}
                errorField="Email"
                width="100%"
                htmlFor="email"
                label="Email"
              />
            </Box>
            <Flex>
              <Button colorScheme="blue" width="100%" type="submit">
                Send Email
              </Button>
            </Flex>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default ForgotPasswordRoute;
