import { Flex, Box, Heading, Text, Button } from '@chakra-ui/react';
import { registerFormState } from '../../../state/initialState';
import { useNavigate } from 'react-router-dom';
import { IRegisterForm } from '../../../interfaces';
import { useState } from 'react';
import BasicSpinner from '../../Shared/BasicSpinner';
import FormInput from '../../Shared/FormInput';
import { Client } from '../../../util/client';

interface IRegisterFormProps {
  heading: string;
  subHeading: string;
}

const RegisterForm = ({ heading, subHeading }: IRegisterFormProps) => {
  const [form, setForm] = useState(registerFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formStyles = {
    width: '95%',
    margin: '0 auto',
  };

  const updateField = (name: string, value: string, attribute: string) => {
    console.log(name, value, attribute);
    setForm((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name as keyof IRegisterForm], [attribute]: value },
    }));
  };

  const checkForErrors = () => {
    let errors = false;
    for (const [_, val] of Object.entries(form)) {
      const { value, error } = val;
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
    setError('');
    checkForErrors();
    if (checkForErrors()) {
      return;
    }
    register();
  };

  const register = () => {
    setIsLoading(true);
    Client.register(form, 'USER')
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        setError(err.response.data.message);
        throw new Error(err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Box>
      <Heading mb="0.5rem" textAlign="center" color="black.primary" as="h1">
        {heading}
      </Heading>
      <Text textAlign="center" color="text.primary">
        {subHeading}
      </Text>

      {error.length > 0 && (
        <Text fontSize="0.85rem" textAlign="center" color="red.400">
          {error}
        </Text>
      )}
      {isLoading && (
        <Flex mt="10rem" justify="center" alignItems="center" flexDir="column">
          <BasicSpinner />
        </Flex>
      )}
      <Flex
        margin="0 auto"
        className="registerFormContainer"
        width={['100%', '95%', '550px']}
        minH="500px"
      >
        {!isLoading && (
          <form style={formStyles} onSubmit={handleOnSubmit}>
            <FormInput
              updateField={updateField}
              value={form.firstName.value}
              error={form.firstName.error}
              name={form.firstName.name}
              type={form.firstName.type}
              errorField="First name"
              width="100%"
              htmlFor="firstName"
              label="First Name"
            />
            <FormInput
              updateField={updateField}
              value={form.lastName.value}
              error={form.lastName.error}
              name={form.lastName.name}
              type={form.lastName.type}
              errorField="Last name"
              width="100%"
              htmlFor="lastName"
              label="Last Name"
            />
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
            <FormInput
              updateField={updateField}
              value={form.password.value}
              error={form.password.error}
              name={form.password.name}
              type={form.password.type}
              errorField="Password"
              width="100%"
              htmlFor="password"
              label="Password"
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
            <Flex justify="center">
              <Button type="submit" colorScheme="blue" width="100%">
                Create Account
              </Button>
            </Flex>
          </form>
        )}
      </Flex>
    </Box>
  );
};

export default RegisterForm;
