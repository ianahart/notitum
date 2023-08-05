import { Box, ListItem } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

interface ISettingsLink {
  className: string;
  to: string;
  text: string;
  link: string;
  activeLink: string;
  handleSetActiveLink: (activeLink: string) => void;
}

const SettingsLink = ({
  className,
  to,
  text,
  link,
  activeLink,
  handleSetActiveLink,
}: ISettingsLink) => {
  return (
    <ListItem mr="1.5rem" justifySelf="flex-start">
      <RouterLink onClick={() => handleSetActiveLink(link)} className={className} to={to}>
        {text}
      </RouterLink>
      {activeLink === link && (
        <Box borderRadius={20} minH="3px" bg="primary.blue" width="100%"></Box>
      )}
    </ListItem>
  );
};

export default SettingsLink;
