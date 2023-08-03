import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { aboutForm } from '../../state/initialState';
import { IAboutForm, IUserContext } from '../../interfaces';
import AboutField from './AboutField';
import { UserContext } from '../../context/user';

const AboutForm = () => {
  const [form, setForm] = useState<IAboutForm>(aboutForm);
  const { user } = useContext(UserContext) as IUserContext;
  const [locationVisible, setLocationVisible] = useState(false);
  const shouldRun = useRef(true);

  const syncForm = () => {
    setForm((prevState) => ({
      ...prevState,
      fullName: {
        ...prevState['fullName'],
        value: `${user.firstName} ${user.lastName}`,
      },
    }));
  };

  const handleLocationVisible = (visibility: boolean) => {
    setLocationVisible(visibility);
  };

  const syncUpdateField = (name: string) => {
    const field = { ...form[name as keyof IAboutForm] };
    console.log(field.value, name);
  };

  useEffect(() => {
    if (shouldRun.current && user.id !== 0) {
      shouldRun.current = false;
      syncForm();
    }
  }, [shouldRun.current, syncForm, user.id]);

  const updateField = (name: string, value: string, attribute: string) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name as keyof IAboutForm], [attribute]: value },
    }));
  };

  return (
    <Box>
      <Heading mb="0.25rem" fontSize="1.3rem" color="black.primary">
        About you
      </Heading>
      <Box
        borderRadius={8}
        border="1px solid"
        borderColor="light.primary"
        padding="1.5rem"
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        minH="500px"
      >
        <form>
          <Flex mr="-1rem" my="2rem" justify="flex-end" textAlign="left">
            <Text fontSize="0.7rem" color="text.primary">
              Who can see this?
            </Text>
          </Flex>
          <AboutField
            syncUpdateField={syncUpdateField}
            updateField={updateField}
            name={form.fullName.name}
            error={form.fullName.error}
            type={form.fullName.type}
            label={form.fullName.label}
            value={form.fullName.value}
            placeholder={form.fullName.placeholder}
          />
          <AboutField
            syncUpdateField={syncUpdateField}
            updateField={updateField}
            name={form.publicName.name}
            error={form.publicName.error}
            type={form.publicName.type}
            label={form.publicName.label}
            value={form.publicName.value}
            placeholder={form.publicName.placeholder}
          />
          <AboutField
            syncUpdateField={syncUpdateField}
            updateField={updateField}
            name={form.jobTitle.name}
            error={form.jobTitle.error}
            type={form.jobTitle.type}
            label={form.jobTitle.label}
            value={form.jobTitle.value}
            placeholder={form.jobTitle.placeholder}
          />

          <AboutField
            syncUpdateField={syncUpdateField}
            updateField={updateField}
            name={form.department.name}
            error={form.department.error}
            type={form.department.type}
            label={form.department.label}
            value={form.department.value}
            placeholder={form.department.placeholder}
          />

          <AboutField
            syncUpdateField={syncUpdateField}
            updateField={updateField}
            name={form.organization.name}
            error={form.organization.error}
            type={form.organization.type}
            label={form.organization.label}
            value={form.organization.value}
            placeholder={form.organization.placeholder}
          />

          <AboutField
            syncUpdateField={syncUpdateField}
            updateField={updateField}
            name={form.location.name}
            error={form.location.error}
            type={form.location.type}
            label={form.location.label}
            value={form.location.value}
            placeholder={form.location.placeholder}
            locationVisible={locationVisible}
            handleLocationVisible={handleLocationVisible}
          />
        </form>
      </Box>
    </Box>
  );
};

export default AboutForm;
