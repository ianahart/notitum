import { UnorderedList, Box } from '@chakra-ui/react';
import { useState } from 'react';
import SettingsLink from './SettingsLink';

const SettingsLinks = () => {
  const [activeLink, setActiveLink] = useState('profile');

  const handleSetActiveLink = (activeLink: string) => {
    setActiveLink(activeLink);
  };

  return (
    <Box position="relative">
      <UnorderedList display="flex" m="0" listStyleType="none" color="text.primary">
        <SettingsLink
          className="settingsLink"
          to="profile-visibility"
          text="Profile and visiblity"
          link="profile"
          activeLink={activeLink}
          handleSetActiveLink={handleSetActiveLink}
        />
        <SettingsLink
          className="settingsLink"
          to="activity"
          text="Activity"
          link="activity"
          activeLink={activeLink}
          handleSetActiveLink={handleSetActiveLink}
        />
        <SettingsLink
          className="settingsLink"
          to="cards"
          text="Cards"
          link="cards"
          activeLink={activeLink}
          handleSetActiveLink={handleSetActiveLink}
        />
      </UnorderedList>
      <Box
        borderRadius={20}
        position="absolute"
        top="24px"
        zIndex={-1}
        width="100%"
        minH="3px"
        bg="gray.300"
      ></Box>
    </Box>
  );
};

export default SettingsLinks;
