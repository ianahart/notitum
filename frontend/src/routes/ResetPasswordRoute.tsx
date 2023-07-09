import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import BasicSpinner from '../components/Shared/BasicSpinner';
import forgotPasswordBG from '../assets/forgot-password.jpg';
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPasswordFormState } from '../state/initialState';
import { IResetPasswordForm } from '../interfaces';
import FormInput from '../components/Shared/FormInput';
import { Client } from '../util/client';

const ResetPasswordRoute = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(resetPasswordFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const id = searchParams.get('uid') as string;
  const token = searchParams.get('token') as string;

  const updateField = (name: string, value: string, attribute: string) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name as keyof IResetPasswordForm], [attribute]: value },
    }));
  };

  const formStyles = {
    margin: '0 auto',
    width: '95%',
    padding: '0.5rem',
  };

  const checkForErrors = () => {
    let errors = false;
    for (const [_, field] of Object.entries(form)) {
      const { value, error } = field;
      if (value.trim().length === 0 || error.length > 0) {
        errors = true;
      }
    }
    return errors;
  };

  const clearErrors = () => {
    for (const [key, _] of Object.entries(form)) {
      updateField(key, '', 'error');
    }
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearErrors();
    if (checkForErrors()) {
      return;
    }

    resetPassword();
  };

  const resetPassword = () => {
    setIsLoading(true);
    const [password, confirmPassword] = Object.entries(form).map(([_, val]) => {
      return val.value;
    });

    Client.resetPassword(id, token, password, confirmPassword)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        setError(err.response.data.message);
        throw new Error(err.response.data.message);
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
              Reset Password
            </Heading>
            <Text color="text.primary" my="1.5rem" fontSize="0.85rem" textAlign="center">
              Remember, your new password cannot be the same as your old password.
            </Text>
            {error.length > 0 && (
              <Text fontSize="0.85rem" color="red.500" textAlign="center">
                {error}
              </Text>
            )}
            <Box my="2rem">
              <FormInput
                updateField={updateField}
                value={form.password.value}
                error={form.password.error}
                name={form.password.name}
                type={form.password.type}
                errorField="New password"
                width="100%"
                htmlFor="password"
                label="New Password"
              />
              <FormInput
                updateField={updateField}
                value={form.confirmPassword.value}
                error={form.confirmPassword.error}
                name={form.confirmPassword.name}
                type={form.confirmPassword.type}
                errorField="Confirm password"
                width="100%"
                htmlFor="confirmPassword"
                label="Confirm Password"
              />
            </Box>
            <Flex>
              <Button colorScheme="blue" width="100%" type="submit">
                Reset Password
              </Button>
            </Flex>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default ResetPasswordRoute;
