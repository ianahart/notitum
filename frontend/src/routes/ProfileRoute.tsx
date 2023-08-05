import { Box, Heading } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Client } from '../util/client';
import { profileState } from '../state/initialState';
import { abbreviate } from '../util';
import Banner from '../components/Account/Banner';
import ProfileField from '../components/Profile/ProfileField';

const ProfileRoute = () => {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(profileState);
  const shouldRun = useRef(true);

  const getProfile = () => {
    if (profileId === undefined) return;
    Client.getProfile(parseInt(profileId))
      .then((res) => {
        setProfile(res.data.data);
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getProfile();
    }
  }, [shouldRun.current, getProfile]);

  return (
    <Box minH="100vh">
      <Box
        p="0.25rem"
        mx="auto"
        minH="100vh"
        maxW="600px"
        width={['95%', '95%', '600px']}
      >
        <Box mt="4rem"></Box>
        <Box my="2rem">
          <Banner
            showInfo={false}
            userInitials={abbreviate(profile.firstName, profile.lastName)}
          />
        </Box>
        <Box my="2rem">
          <Heading my="0.25rem" fontSize="1.3rem" color="black.primary">
            About {profile.firstName}
          </Heading>
          <Box
            borderRadius={8}
            border="1px solid"
            borderColor="light.primary"
            padding="1.5rem"
            boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            minH="500px"
          >
            <ProfileField
              value={`${profile.firstName} ${profile.lastName}`}
              label="Full Name"
              errorName="full name"
            />
            <ProfileField
              value={profile.publicName}
              label="Public Name"
              errorName="public name"
            />
            <ProfileField
              value={profile.jobTitle}
              label="Job Title"
              errorName="job title"
            />
            <ProfileField
              value={profile.department}
              label="Department"
              errorName="department"
            />
            <ProfileField
              value={profile.organization}
              label="Organization"
              errorName="organization"
            />

            <ProfileField
              value={profile.location}
              label="Based in"
              errorName="location"
            />
            <ProfileField value={profile.bio} label="Bio" errorName="bio" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileRoute;
