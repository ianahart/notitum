import { Button, Box, Heading, Text, Flex } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicSpinner from '../Shared/BasicSpinner';
import FormInput from '../Shared/FormInput';
import { ILoginForm, IUserContext } from '../../interfaces';
import { loginFormState } from '../../state/initialState';
import { Client } from '../../util/client';
import { UserContext } from '../../context/user';
import { slugify } from '../../util';

interface ILoginFormProps {
  heading: string;
  subHeading: string;
}

const LoginForm = ({ heading, subHeading }: ILoginFormProps) => {
  const navigate = useNavigate();
  const { stowTokens, updateUser } = useContext(UserContext) as IUserContext;
  const [error, setError] = useState('');
  const [form, setForm] = useState(loginFormState);
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (name: string, value: string, attribute: string) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name as keyof ILoginForm], [attribute]: value },
    }));
  };
  const formStyles = {
    width: '95%',
    margin: '0 auto',
  };

  const checkForErrors = () => {
    let errors = false;
    for (const [_, field] of Object.entries(form)) {
      const { error, value } = field;
      if (error.length > 0 || value.trim().length === 0) {
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
    clearErrors();
    if (checkForErrors()) {
      return;
    }
    e.preventDefault();
    login();
  };

  const login = () => {
    const [email, password] = Object.entries(form).map(([_, field]) => {
      const { value } = field;
      return value;
    });
    setIsLoading(true);
    Client.login(email, password)
      .then((res) => {
        const { refreshToken, token, user } = res.data;
        stowTokens({ refreshToken, token });
        updateUser(user);
        navigate(`/${slugify(user.firstName, user.lastName)}/dashboard`);
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
      <Flex margin="0 auto" width={['100%', '95%', '550px']} minH="500px">
        {!isLoading && (
          <form style={formStyles} onSubmit={handleOnSubmit}>
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
            <Flex justify="center">
              <Button type="submit" colorScheme="blue" width="100%">
                Login
              </Button>
            </Flex>
          </form>
        )}
      </Flex>
    </Box>
  );
};

export default LoginForm;
