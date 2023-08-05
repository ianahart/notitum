import {
  Box,
  Button,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Flex,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../context/user';
import { IMinimalUserForm, IUserContext } from '../../interfaces';
import { Link as RouterLink } from 'react-router-dom';
import { Client } from '../../util/client';
import { minimalUserForm } from '../../state/initialState';
import { slugify } from '../../util';
import { RiEarthFill } from 'react-icons/ri';

const ProfileAndVisiblity = () => {
  const toast = useToast();
  const { user, updateUser: update } = useContext(UserContext) as IUserContext;
  const [form, setForm] = useState<IMinimalUserForm>(minimalUserForm);
  const [error, setError] = useState('');
  const shouldRun = useRef(true);

  const updateField = (name: string, value: string, attribute: string) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name as keyof IMinimalUserForm], [attribute]: value },
    }));
  };

  const getMinimalUserDetails = () => {
    Client.getMinimalUserDetails(user.id)
      .then((res) => {
        const { data } = res.data;
        for (let prop in data) {
          updateField(prop, data[prop] == null ? '' : data[prop], 'value');
        }
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current && user.id !== 0) {
      shouldRun.current = false;
      getMinimalUserDetails();
    }
  }, [shouldRun.current, user.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateField(name, value, 'value');
  };

  const handleOnTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateField('bio', e.target.value, 'value');
  };

  const validate = () => {
    const { value: firstName } = form.firstName;
    const { value: lastName } = form.lastName;
    const { value: bio } = form.bio;
    if (firstName.trim().length === 0 || lastName.trim().length === 0) {
      setError('First name and last name are required');
      return true;
    }
    if (firstName.length > 100 || lastName.length > 100) {
      setError('First name and last name cannot exceed 100 characters');
      return true;
    }
    if (bio.length > 300) {
      setError('Bio cannot exceed 300 characters');
      return true;
    }
    return false;
  };

  const updateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (validate()) return;
    Client.updateUser(user.id, form.firstName.value, form.lastName.value, form.bio.value)
      .then(() => {
        const updatedUser = {
          ...user,
          firstName: form.firstName.value,
          lastName: form.lastName.value,
        };
        update(updatedUser);

        toast({
          title: 'Details updated',
          description: 'Your user details have been successfully updated',
          status: 'success',
          duration: 6000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
        throw new Error(err.response.data.message);
      });
  };

  return (
    <Box mx="auto" width={['95%', '95%', '600px']}>
      <Heading mb="1.5rem" color="black.primary" fontSize="1.4rem">
        Manage your personal information
      </Heading>
      <Box bg="#f1ecec" p="1rem" borderRadius={4}>
        <Text color="text.primary" lineHeight="1.6">
          This is your main account information. You can edit your profile information on
          your{' '}
          <Box as="span" color="primary.blue" fontWeight="bold">
            <RouterLink to={`/${slugify(user.firstName, user.lastName)}/account/profile`}>
              About you{' '}
            </RouterLink>
          </Box>
          section.
        </Text>
      </Box>
      <Heading mt="2rem" as="h3" fontSize="1.2rem" color="black.primary">
        About
      </Heading>
      <Box minH="1px" bg="#f1ecec" width="100%" mt="0.25rem"></Box>
      <Box mt="3rem" mb="1rem">
        <form onSubmit={updateUser}>
          {error.length > 0 && (
            <Text fontSize="0.8rem" mb="0.5rem" textAlign="center" color="red.500">
              {error}
            </Text>
          )}
          <FormControl
            display="flex"
            flexDir={['column', 'column', 'row']}
            justifyContent="space-evenly"
          >
            <Flex flexDir="column">
              <FormLabel
                htmlFor="firstName"
                fontSize="0.8rem"
                fontWeight="bold"
                color="text.primary"
              >
                First Name
              </FormLabel>
              <Input
                fontSize="0.85rem"
                color="text.primary"
                value={form.firstName.value}
                onChange={handleInputChange}
                id="firstName"
                name="firstName"
              />
            </Flex>

            <Flex flexDir="column">
              <FormLabel
                htmlFor="lastName"
                fontSize="0.8rem"
                fontWeight="bold"
                color="text.primary"
              >
                Last Name
              </FormLabel>
              <Input
                fontSize="0.85rem"
                color="text.primary"
                value={form.lastName.value}
                onChange={handleInputChange}
                id="lastName"
                name="lastName"
              />
            </Flex>
          </FormControl>
          <Flex
            mt="2.5rem"
            width="100%"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <FormControl width="100%">
              <Flex
                mx="auto"
                width={['100%', '100%', '50%']}
                justifyContent="space-between"
                alignItems="center"
              >
                <FormLabel m="0" fontSize="0.8rem" fontWeight="bold" color="text.primary">
                  Bio
                </FormLabel>
                <Flex justifyContent="center" alignItems="center">
                  <Text fontSize="0.75rem" color="text.primary">
                    Always public
                  </Text>
                  <Box color="text.primary">
                    <RiEarthFill />
                  </Box>
                </Flex>
              </Flex>
              <Flex mb="1.5rem" mt="0.25rem">
                <Textarea
                  value={form.bio.value}
                  onChange={handleOnTextareaChange}
                  fontSize="0.85rem"
                  color="text.primary"
                  width={['100%', '100%', '50%']}
                  mx="auto"
                />
              </Flex>
            </FormControl>
          </Flex>
          <Flex justifyContent="center">
            <Button type="submit" colorScheme="blue" maxW="300px" w="300px">
              Save
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default ProfileAndVisiblity;
