import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box textAlign="center" p="0.25rem" className="footer" as="footer">
      <Text color="text.primary">&copy; {year} Ian Hart</Text>
    </Box>
  );
};

export default Footer;
